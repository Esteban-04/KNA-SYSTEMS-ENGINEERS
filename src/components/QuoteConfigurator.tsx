import { useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Mail,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import {
  COMPANY_INFO,
  COVERAGE_ZONES,
  SCALES,
  SECTORS,
  SERVICES,
  buildWhatsAppUrl,
  type ScaleId,
  type SpecificSectorId,
} from '../data/knaData';

interface QuoteConfiguratorProps {
  sector: SpecificSectorId;
  onChangeSector: (sector: SpecificSectorId) => void;
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
  onResetServices: () => void;
}

type StepNumber = 1 | 2 | 3;

interface FormValues {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  services?: string;
}

const SELECTABLE_SECTORS = SECTORS.filter(
  (s): s is { id: SpecificSectorId; label: string } => s.id !== 'todos'
);

export default function QuoteConfigurator({
  sector,
  onChangeSector,
  selectedServices,
  onToggleService,
  onResetServices,
}: QuoteConfiguratorProps) {
  const [step, setStep] = useState<StepNumber>(1);
  const [scale, setScale] = useState<ScaleId>('mediana');
  const [city, setCity] = useState<string>('Bogotá D.C.');
  const [customCity, setCustomCity] = useState<string>('');
  const [form, setForm] = useState<FormValues>({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const resolvedCity =
    city === 'Otra ciudad' ? customCity.trim() || 'Otra ciudad de Colombia' : city;

  const selectedServiceNames = SERVICES.filter((s) => selectedServices.includes(s.id)).map(
    (s) => s.title
  );

  const sectorLabel = SELECTABLE_SECTORS.find((s) => s.id === sector)?.label ?? 'Comercial';
  const scaleLabel = SCALES.find((s) => s.id === scale)?.label ?? 'Oficina - Edificio - Bodega';

  const summaryText = [
    `Solicitud de Cotización — ${COMPANY_INFO.brandFull}`,
    submittedRef ? `Referencia: ${submittedRef}` : null,
    `Sector: ${sectorLabel}`,
    `Escala: ${scaleLabel}`,
    `Ciudad: ${resolvedCity}`,
    `Servicios: ${
      selectedServiceNames.length > 0 ? selectedServiceNames.join(', ') : 'Por definir en diagnóstico'
    }`,
    form.name.trim() ? `Contacto: ${form.name.trim()}` : null,
    form.phone.trim() ? `Teléfono: ${form.phone.trim()}` : null,
    form.email.trim() ? `Correo: ${form.email.trim()}` : null,
    form.notes.trim() ? `Detalles: ${form.notes.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappHref = buildWhatsAppUrl(
    `Hola ${COMPANY_INFO.brandFull}, deseo solicitar una cotización:\n\n${summaryText}`
  );

  const mailtoHref = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
    `Solicitud de Cotización (${sectorLabel} - ${resolvedCity})`
  )}&body=${encodeURIComponent(summaryText)}`;

  const validateStep3 = (): boolean => {
    const nextErrors: FormErrors = {};
    if (selectedServices.length === 0) {
      nextErrors.services = 'Selecciona al menos un servicio en el Paso 2.';
    }
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Ingresa tu nombre o el de tu empresa.';
    }
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 7) {
      nextErrors.phone = 'Ingresa un número de teléfono o WhatsApp válido.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Ingresa un correo electrónico válido.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setSubmittedRef(`KNA-2026-${randomCode}`);
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleStartOver = () => {
    setSubmittedRef(null);
    setStep(1);
    setErrors({});
    setForm({ name: '', phone: '', email: '', notes: '' });
    onResetServices();
  };

  const progressWidth = submittedRef ? '100%' : step === 1 ? '33%' : step === 2 ? '66%' : '100%';

  return (
    <section id="cotizador" className="bg-white border-b border-slate-200 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-bold text-red-700 mb-2">Cotizador Rápido</p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950"
            style={{ textWrap: 'balance' }}
          >
            Configura tu proyecto en 3 pasos y cotiza al instante.
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Sin trámites lentos. Selecciona lo que necesitas y envía tu requerimiento directo a nuestro equipo en Bogotá o a nivel nacional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Interactive Step-by-Step Configurator */}
          <div className="lg:col-span-7 bg-slate-50 rounded-xl border border-slate-200 p-6 sm:p-8">
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-red-600 transition-all duration-200"
                style={{ width: progressWidth }}
              />
            </div>

            {submittedRef ? (
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-mono font-semibold text-emerald-800">
                      Solicitud lista · Ref. {submittedRef}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-950 mt-1">
                      Tu resumen técnico fue generado con éxito
                    </h3>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                      Envía este resumen directamente por WhatsApp o correo para atención inmediata 24/7.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-5">
                  <pre className="font-sans text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {summaryText}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-11"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    Enviar por WhatsApp ahora
                  </a>

                  <a
                    href={mailtoHref}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-11"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    Enviar por correo
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-11"
                  >
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    {copied ? 'Copiado' : 'Copiar resumen'}
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={handleStartOver}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    Crear otra solicitud
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div
                  role="tablist"
                  aria-label="Pasos del cotizador"
                  className="grid grid-cols-3 gap-2 mb-8"
                >
                  {[
                    { num: 1 as StepNumber, title: '01. Sector' },
                    { num: 2 as StepNumber, title: '02. Servicios' },
                    { num: 3 as StepNumber, title: '03. Contacto' },
                  ].map((item) => {
                    const active = step === item.num;
                    const completed = step > item.num;
                    return (
                      <button
                        key={item.num}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setStep(item.num)}
                        className={`px-3 py-2.5 rounded-lg text-left border transition-colors cursor-pointer min-h-11 ${
                          active
                            ? 'bg-slate-950 text-white border-slate-950'
                            : completed
                            ? 'bg-white text-slate-900 border-slate-300 hover:border-slate-400'
                            : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
                        }`}
                      >
                        <span className="block text-xs sm:text-sm font-semibold whitespace-nowrap truncate">
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-950 mb-1">
                        ¿Para qué tipo de espacio es el proyecto?
                      </h3>
                      <p className="text-sm text-slate-600 mb-4">
                        Adaptamos los equipos y protocolos de instalación según tu sector.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {SELECTABLE_SECTORS.map((item) => {
                          const active = sector === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => onChangeSector(item.id)}
                              className={`p-4 rounded-lg border text-left transition-colors cursor-pointer min-h-12 ${
                                active
                                  ? 'bg-white border-red-600 ring-1 ring-red-600 text-slate-950'
                                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                              }`}
                            >
                              <span className="block text-sm font-bold">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-950 mb-3">
                        Tamaño estimado del inmueble o planta
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {SCALES.map((item) => {
                          const active = scale === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setScale(item.id)}
                              className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                                active
                                  ? 'bg-white border-red-600 ring-1 ring-red-600'
                                  : 'bg-white border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <span className="block text-sm font-semibold text-slate-950">
                                {item.label}
                              </span>
                              <span className="block text-xs text-slate-500 mt-1">{item.hint}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer min-h-11"
                      >
                        Continuar a Servicios
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-950 mb-1">
                        Selecciona uno o varios servicios
                      </h3>
                      <p className="text-sm text-slate-600 mb-4">
                        Puedes combinar seguridad electrónica con adecuación eléctrica o mantenimiento.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {SERVICES.map((service) => {
                          const checked = selectedServices.includes(service.id);
                          return (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => {
                                onToggleService(service.id);
                                if (errors.services) {
                                  setErrors((prev) => ({ ...prev, services: undefined }));
                                }
                              }}
                              aria-pressed={checked}
                              className={`p-4 rounded-lg border text-left transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                                checked
                                  ? 'bg-white border-red-600 ring-1 ring-red-600'
                                  : 'bg-white border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div>
                                <span className="font-mono text-xs font-semibold text-red-700">
                                  {service.number}.
                                </span>
                                <span className="block text-sm font-bold text-slate-950 mt-0.5">
                                  {service.shortTitle}
                                </span>
                                <span className="block text-xs text-slate-500 mt-1 line-clamp-2">
                                  {service.summary}
                                </span>
                              </div>
                              <span
                                className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                                  checked
                                    ? 'bg-red-600 border-red-600 text-white'
                                    : 'border-slate-300 bg-white'
                                }`}
                              >
                                {checked && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.services && (
                        <p role="alert" className="text-xs font-medium text-red-700 mt-2">
                          {errors.services}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="quote-city"
                        className="block text-sm font-bold text-slate-950 mb-2"
                      >
                        Ciudad o región del proyecto
                      </label>
                      <select
                        id="quote-city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 min-h-11"
                      >
                        <option value="Bogotá D.C.">Bogotá D.C. y Sabana</option>
                        <option value="Medellín">Medellín y Antioquia</option>
                        <option value="Cali">Cali y Valle del Cauca</option>
                        <option value="Barranquilla">Barranquilla y Costa Caribe</option>
                        <option value="Bucaramanga">Bucaramanga y Santanderes</option>
                        {COVERAGE_ZONES.length > 0 && (
                          <option value="Otra ciudad">Otra ciudad de Colombia</option>
                        )}
                      </select>

                      {city === 'Otra ciudad' && (
                        <input
                          type="text"
                          value={customCity}
                          onChange={(e) => setCustomCity(e.target.value)}
                          placeholder="Escribe tu ciudad o municipio"
                          className="mt-3 w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 min-h-11"
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950 cursor-pointer min-h-11"
                      >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        Atrás
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer min-h-11"
                      >
                        Continuar a Datos
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-slate-950 mb-1">
                        ¿A dónde te enviamos la propuesta?
                      </h3>
                      <p className="text-sm text-slate-600">
                        Completa tus datos para generar el resumen de tu solicitud.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="quote-name"
                          className="block text-sm font-semibold text-slate-800 mb-1.5"
                        >
                          Nombre o empresa *
                        </label>
                        <input
                          id="quote-name"
                          type="text"
                          value={form.name}
                          onChange={(e) => {
                            setForm((prev) => ({ ...prev, name: e.target.value }));
                            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                          }}
                          placeholder="Ej. Carlos Mendoza / Bodegas del Norte"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 min-h-11"
                        />
                        {errors.name && (
                          <p role="alert" className="text-xs font-medium text-red-700 mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="quote-phone"
                          className="block text-sm font-semibold text-slate-800 mb-1.5"
                        >
                          WhatsApp o teléfono *
                        </label>
                        <input
                          id="quote-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => {
                            setForm((prev) => ({ ...prev, phone: e.target.value }));
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                          }}
                          placeholder="Ej. 323 249 6764"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 min-h-11"
                        />
                        {errors.phone && (
                          <p role="alert" className="text-xs font-medium text-red-700 mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="quote-email"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Correo electrónico *
                      </label>
                      <input
                        id="quote-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="nombre@empresa.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 min-h-11"
                      />
                      {errors.email && (
                        <p role="alert" className="text-xs font-medium text-red-700 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="quote-notes"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Detalles adicionales (opcional)
                      </label>
                      <textarea
                        id="quote-notes"
                        rows={3}
                        value={form.notes}
                        onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                        placeholder="Ej. Necesitamos 8 cámaras exteriores, control biométrico en recepción y revisión de red eléctrica."
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    {errors.services && (
                      <p role="alert" className="text-xs font-medium text-red-700">
                        {errors.services}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950 cursor-pointer min-h-11"
                      >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        Atrás
                      </button>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer min-h-11"
                      >
                        Confirmar solicitud
                        <Check className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right 5 Columns: Live Dynamic Summary */}
          <aside className="lg:col-span-5 bg-slate-950 text-white rounded-xl border border-slate-800 p-6 sm:p-8">
            <p className="text-xs font-mono text-red-400">Resumen en tiempo real</p>
            <h3 className="text-xl font-bold mt-1 mb-5">Tu configuración de proyecto</h3>

            <dl className="space-y-4 text-sm border-t border-slate-800 pt-5">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Sector</dt>
                <dd className="font-semibold text-white text-right">{sectorLabel}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Escala</dt>
                <dd className="font-semibold text-white text-right">{scaleLabel}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Ubicación</dt>
                <dd className="font-semibold text-white text-right">{resolvedCity}</dd>
              </div>
              <div className="pt-3 border-t border-slate-800">
                <dt className="text-slate-400 mb-2">Servicios seleccionados</dt>
                {selectedServiceNames.length > 0 ? (
                  <dd>
                    <ul className="space-y-2">
                      {selectedServiceNames.map((name) => (
                        <li key={name} className="flex items-center gap-2 text-slate-100 font-medium">
                          <Check className="w-4 h-4 text-red-500 shrink-0" aria-hidden="true" />
                          <span>{name}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                ) : (
                  <dd className="text-slate-400 text-xs">
                    Aún no has marcado servicios. Puedes elegirlos en el Paso 2 o en el simulador.
                  </dd>
                )}
              </div>
            </dl>

            <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                ¿Prefieres hablar directo con un ingeniero ahora mismo? Envía esta configuración por WhatsApp.
              </p>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors min-h-11"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Cotizar por WhatsApp ({COMPANY_INFO.phoneDisplay})
              </a>

              <a
                href={COMPANY_INFO.phoneHref}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-slate-200 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg transition-colors min-h-11"
              >
                Llamar línea 24/7
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

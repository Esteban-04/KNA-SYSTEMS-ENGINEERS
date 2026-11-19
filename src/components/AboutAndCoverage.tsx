import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import {
  COMPANY_INFO,
  COVERAGE_ZONES,
  FAQ_ITEMS,
  PROCESS_STEPS,
  REASONS_TO_CHOOSE,
} from '../data/knaData';

export default function AboutAndCoverage() {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(COVERAGE_ZONES[0].id);
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);

  const activeZone =
    COVERAGE_ZONES.find((zone) => zone.id === selectedZoneId) ?? COVERAGE_ZONES[0];

  return (
    <>
      {/* Quiénes somos + Por qué elegirnos */}
      <section id="nosotros" className="bg-slate-50 border-b border-slate-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Quiénes Somos & Compromiso */}
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-red-700 mb-2">Quiénes somos</p>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-5"
                style={{ textWrap: 'balance' }}
              >
                Respaldo técnico e ingeniería colombiana de confianza.
              </h2>

              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>{COMPANY_INFO.aboutSummary}</p>
                <p>{COMPANY_INFO.aboutPurpose}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-950 mb-2">Nuestro compromiso</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {COMPANY_INFO.commitment}
                </p>
              </div>
            </div>

            {/* Right Column: Por qué elegirnos (Editorial Numbered List) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
              <p className="text-sm font-semibold text-slate-500 mb-1">Por qué elegirnos</p>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950 mb-6">
                Cinco garantías en cada proyecto
              </h3>

              <div className="divide-y divide-slate-200">
                {REASONS_TO_CHOOSE.map((reason) => (
                  <div key={reason.number} className="py-4 first:pt-0 last:pb-0 flex gap-4 sm:gap-6">
                    <span className="font-mono text-sm font-semibold text-red-700 tabular-nums pt-0.5 shrink-0">
                      {reason.number}.
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-950">{reason.title}</h4>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4-Step Execution Methodology */}
          <div className="mt-14 pt-12 border-t border-slate-200">
            <div className="mb-8">
              <p className="text-sm font-semibold text-red-700 mb-1">Proceso simple</p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                Cómo trabajamos de principio a fin
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((item) => (
                <div
                  key={item.number}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-sm font-semibold text-red-700 tabular-nums">
                      {item.number}.
                    </span>
                    <h4 className="text-lg font-bold text-slate-950 mt-2 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cobertura Nacional & Preguntas Frecuentes */}
      <section id="cobertura" className="bg-white border-b border-slate-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Interactive National Coverage Checker */}
          <div className="lg:col-span-6">
            <p className="text-sm font-semibold text-red-700 mb-2">Cobertura en todo el país</p>
            <h2
              className="text-3xl font-bold tracking-tight text-slate-950 mb-4"
              style={{ textWrap: 'balance' }}
            >
              No importa dónde se encuentre, lo tenemos cubierto.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Consulta nuestros tiempos de desplazamiento técnico desde Bogotá D.C. hacia las principales regiones de Colombia.
            </p>

            {/* Region Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
              {COVERAGE_ZONES.map((zone) => {
                const active = zone.id === activeZone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`px-4 py-3 rounded-lg border text-left text-sm font-semibold transition-colors cursor-pointer min-h-11 ${
                      active
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {zone.region}
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-950 mb-2">
                <MapPin className="w-4 h-4 text-red-700 shrink-0" aria-hidden="true" />
                <span>{activeZone.region}</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                <strong className="font-semibold text-slate-800">Ciudades principales:</strong>{' '}
                {activeZone.cities}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-sm">
                <div>
                  <span className="block text-xs text-slate-500">Tiempo de respuesta</span>
                  <span className="font-semibold text-slate-950">{activeZone.dispatch}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500">Modalidad</span>
                  <span className="font-semibold text-slate-950">{activeZone.serviceMode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive FAQ Accordion */}
          <div className="lg:col-span-6">
            <p className="text-sm font-semibold text-slate-500 mb-2">Preguntas frecuentes</p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mb-6">
              Respuestas claras antes de iniciar
            </h3>

            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              {FAQ_ITEMS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="w-full py-4 flex items-center justify-between gap-4 text-left cursor-pointer min-h-12"
                    >
                      <span className="text-base font-semibold text-slate-950">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-4 text-sm text-slate-600 leading-relaxed pr-6">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

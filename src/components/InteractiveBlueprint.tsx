import { useState } from 'react';
import { ArrowRight, Check, Cpu, Eye, Lock, Zap } from 'lucide-react';
import { motion } from 'motion/react';

type SpaceType = 'residencial' | 'comercial' | 'industrial';
type LayerKey = 'cctv' | 'acceso' | 'electrico' | 'automatizacion';

interface InteractiveBlueprintProps {
  onApplyPresetToQuote: (serviceIds: string[]) => void;
}

const SPACES: { id: SpaceType; label: string; subtitle: string }[] = [
  {
    id: 'residencial',
    label: 'Hogar - Conjunto',
    subtitle: 'Casas - Apartamentos - Copropiedades con control desde el celular.',
  },
  {
    id: 'comercial',
    label: 'Oficina - Local',
    subtitle: 'Comercios - Clínicas - Sedes empresariales con trazabilidad total.',
  },
  {
    id: 'industrial',
    label: 'Bodega - Planta',
    subtitle: 'Operación continua - Perímetros extensos - Potencia eléctrica certificada.',
  },
];

const LAYERS: {
  id: LayerKey;
  serviceId: string;
  label: string;
  shortDesc: string;
  benefit: Record<SpaceType, string>;
}[] = [
  {
    id: 'cctv',
    serviceId: 'seguridad-electronica',
    label: 'Videovigilancia IP',
    shortDesc: 'Cámaras HD con visión nocturna y acceso móvil 24/7.',
    benefit: {
      residencial: 'Monitoreo de accesos, parqueaderos y zonas comunes en tiempo real.',
      comercial: 'Cobertura en cajas, vitrinas, recepción y almacenamiento sin puntos ciegos.',
      industrial: 'Cámaras perimetrales de largo alcance y control de muelles de carga.',
    },
  },
  {
    id: 'acceso',
    serviceId: 'seguridad-electronica',
    label: 'Control de Acceso',
    shortDesc: 'Biometría, tarjetas RFID y registro automático de ingresos.',
    benefit: {
      residencial: 'Citofonía IP y apertura segura para residentes, visitantes y vehículos.',
      comercial: 'Control horario de personal y restricción de acceso a áreas privadas.',
      industrial: 'Torniquetes, esclusas y permisos por zona para contratistas y operarios.',
    },
  },
  {
    id: 'electrico',
    serviceId: 'sistema-electrico',
    label: 'Sistema Eléctrico RETIE',
    shortDesc: 'Redes reguladas, puesta a tierra y respaldo de energía.',
    benefit: {
      residencial: 'Protección contra sobrecargas, tomas reguladas e iluminación eficiente.',
      comercial: 'Circuitos independientes para cómputo, iluminación LED y UPS comercial.',
      industrial: 'Acometidas de potencia, protecciones diferenciales y continuidad operativa.',
    },
  },
  {
    id: 'automatizacion',
    serviceId: 'montaje-modernizacion',
    label: 'Automatización Integral',
    shortDesc: 'Portones, iluminación inteligente y alertas unificadas.',
    benefit: {
      residencial: 'Escenas automáticas de iluminación y apertura motorizada de garajes.',
      comercial: 'Programación de encendido eléctrico y cierre centralizado de sede.',
      industrial: 'Integración de sistemas de control, sensores y supervisión central.',
    },
  },
];

function LayerIcon({ id, className }: { id: LayerKey; className?: string }) {
  if (id === 'cctv') return <Eye className={className} aria-hidden="true" />;
  if (id === 'acceso') return <Lock className={className} aria-hidden="true" />;
  if (id === 'electrico') return <Zap className={className} aria-hidden="true" />;
  return <Cpu className={className} aria-hidden="true" />;
}

export default function InteractiveBlueprint({ onApplyPresetToQuote }: InteractiveBlueprintProps) {
  const [space, setSpace] = useState<SpaceType>('comercial');
  const [activeLayers, setActiveLayers] = useState<LayerKey[]>(['cctv', 'acceso', 'electrico']);

  const toggleLayer = (key: LayerKey) => {
    setActiveLayers((prev) =>
      prev.includes(key)
        ? prev.length > 1
          ? prev.filter((k) => k !== key)
          : prev
        : [...prev, key]
    );
  };

  const hasCctv = activeLayers.includes('cctv');
  const hasAcceso = activeLayers.includes('acceso');
  const hasElectrico = activeLayers.includes('electrico');
  const hasAuto = activeLayers.includes('automatizacion');

  const mappedServices = Array.from(
    new Set(
      LAYERS.filter((l) => activeLayers.includes(l.id)).map((l) => l.serviceId)
    )
  );

  const activeSpace = SPACES.find((s) => s.id === space) ?? SPACES[1];

  return (
    <section
      id="simulador"
      className="bg-slate-950 text-white border-b border-slate-800 py-16 lg:py-24 bg-architectural-grid"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-red-400 mb-2">
              Simulador interactivo de arquitectura
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Visualiza cómo integramos cada sistema en tu espacio.
            </h2>
          </div>

          {/* Space Selector */}
          <div
            role="group"
            aria-label="Seleccionar tipo de espacio"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-lg self-start lg:self-auto"
          >
            {SPACES.map((item) => {
              const active = space === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSpace(item.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-10 ${
                    active
                      ? 'bg-red-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Columns: Dynamic SVG Architectural Blueprint */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-7 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-mono text-slate-400">
                  Plano interactivo · {activeSpace.label}
                </p>
                <p className="text-sm font-medium text-slate-200 mt-0.5">{activeSpace.subtitle}</p>
              </div>
              <span className="font-mono text-xs text-red-400 tabular-nums">
                {activeLayers.length}/4 capas activas
              </span>
            </div>

            {/* Interactive SVG Schematic */}
            <div className="relative rounded-lg border border-slate-800 bg-slate-950 p-4 overflow-hidden">
              <svg
                viewBox="0 0 680 360"
                className="w-full h-auto"
                role="img"
                aria-label={`Esquema interactivo de seguridad y sistema eléctrico para ${activeSpace.label}`}
              >
                <defs>
                  <pattern id="blueprintGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path
                      d="M 24 0 L 0 0 0 24"
                      fill="none"
                      stroke="rgba(148,163,184,0.12)"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>

                {/* Blueprint Grid Background */}
                <rect width="680" height="360" fill="url(#blueprintGrid)" />

                {/* Main Building Perimeter Walls */}
                <rect
                  x="60"
                  y="48"
                  width="560"
                  height="264"
                  rx="8"
                  fill="rgba(15, 23, 42, 0.7)"
                  stroke="#475569"
                  strokeWidth="2.5"
                />

                {/* Interior Partitions depending on Space */}
                {space === 'residencial' && (
                  <>
                    <line x1="250" y1="48" x2="250" y2="210" stroke="#334155" strokeWidth="2" />
                    <line x1="60" y1="210" x2="430" y2="210" stroke="#334155" strokeWidth="2" />
                    <line x1="430" y1="48" x2="430" y2="312" stroke="#334155" strokeWidth="2" />
                    <text x="115" y="135" fill="#94a3b8" fontSize="13" fontWeight="600">
                      Sala / Interior
                    </text>
                    <text x="305" y="135" fill="#94a3b8" fontSize="13" fontWeight="600">
                      Habitaciones
                    </text>
                    <text x="485" y="175" fill="#94a3b8" fontSize="13" fontWeight="600">
                      Garaje / Acceso
                    </text>
                  </>
                )}

                {space === 'comercial' && (
                  <>
                    <line x1="230" y1="48" x2="230" y2="312" stroke="#334155" strokeWidth="2" />
                    <line x1="450" y1="48" x2="450" y2="205" stroke="#334155" strokeWidth="2" />
                    <line x1="230" y1="205" x2="620" y2="205" stroke="#334155" strokeWidth="2" />
                    <text x="95" y="178" fill="#94a3b8" fontSize="13" fontWeight="600">
                      Recepción
                    </text>
                    <text x="290" y="130" fill="#94a3b8" fontSize="13" fontWeight="600">
                      Área Operativa
                    </text>
                    <text x="488" y="130" fill="#94a3b8" fontSize="13" fontWeight="600">
                      Cuarto Técnico
                    </text>
                    <text x="365" y="266" fill="#94a3b8" fontSize="13" fontWeight="600">
                      Bodega / Archivo
                    </text>
                  </>
                )}

                {space === 'industrial' && (
                  <>
                    <line x1="190" y1="48" x2="190" y2="312" stroke="#334155" strokeWidth="2" />
                    <line x1="470" y1="48" x2="470" y2="312" stroke="#334155" strokeWidth="2" />
                    <text x="85" y="180" fill="#94a3b8" fontSize="13" fontWeight="600">
                      Muelle Carga
                    </text>
                    <text x="278" y="180" fill="#94a3b8" fontSize="13" fontWeight="600">
                      Nave de Producción
                    </text>
                    <text x="498" y="180" fill="#94a3b8" fontSize="13" fontWeight="600">
                      Subestación
                    </text>
                  </>
                )}

                {/* Layer 3: Electrical Network RETIE */}
                {hasElectrico && (
                  <g>
                    <path
                      d="M 555 95 L 555 280 L 125 280 L 125 90"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                    />
                    <rect
                      x="530"
                      y="72"
                      width="52"
                      height="34"
                      rx="5"
                      fill="#78350f"
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />
                    <text x="556" y="93" textAnchor="middle" fill="#fef3c7" fontSize="11" fontWeight="700">
                      RETIE
                    </text>
                    <circle cx="340" cy="280" r="6" fill="#fbbf24" />
                    <text x="340" y="300" textAnchor="middle" fill="#fcd34d" fontSize="10" fontWeight="600">
                      Red Regulada y Puesta a Tierra
                    </text>
                  </g>
                )}

                {/* Layer 1: CCTV Cameras & Sightlines */}
                {hasCctv && (
                  <g>
                    {/* Top-left camera cone */}
                    <path
                      d="M 76 64 L 210 105 L 145 190 Z"
                      fill="rgba(56, 189, 248, 0.16)"
                      stroke="rgba(56, 189, 248, 0.5)"
                      strokeWidth="1"
                    />
                    <circle cx="76" cy="64" r="9" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
                    <text x="92" y="68" fill="#bae6fd" fontSize="10" fontWeight="700">
                      CAM-01
                    </text>

                    {/* Top-right camera cone */}
                    <path
                      d="M 604 64 L 470 115 L 545 195 Z"
                      fill="rgba(56, 189, 248, 0.16)"
                      stroke="rgba(56, 189, 248, 0.5)"
                      strokeWidth="1"
                    />
                    <circle cx="604" cy="64" r="9" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
                    <text x="546" y="68" fill="#bae6fd" fontSize="10" fontWeight="700">
                      CAM-02
                    </text>

                    {/* Bottom-center NVR / Hub */}
                    <rect
                      x="282"
                      y="62"
                      width="116"
                      height="26"
                      rx="4"
                      fill="#0c4a6e"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                    />
                    <text x="340" y="79" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="700">
                      NVR / Nube Móvil
                    </text>
                  </g>
                )}

                {/* Layer 2: Biometric Access Control */}
                {hasAcceso && (
                  <g>
                    <rect
                      x="46"
                      y="150"
                      width="28"
                      height="56"
                      rx="4"
                      fill="#991b1b"
                      stroke="#f87171"
                      strokeWidth="2"
                    />
                    <text x="60" y="182" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">
                      ACC
                    </text>
                    <line
                      x1="74"
                      y1="178"
                      x2="132"
                      y2="178"
                      stroke="#f87171"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                    <rect
                      x="216"
                      y="236"
                      width="28"
                      height="36"
                      rx="4"
                      fill="#991b1b"
                      stroke="#f87171"
                      strokeWidth="2"
                    />
                    <text x="230" y="258" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">
                      BIO
                    </text>
                  </g>
                )}

                {/* Layer 4: Automation Nodes */}
                {hasAuto && (
                  <g>
                    <rect
                      x="442"
                      y="224"
                      width="136"
                      height="32"
                      rx="6"
                      fill="#064e3b"
                      stroke="#34d399"
                      strokeWidth="2"
                    />
                    <text x="510" y="244" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="700">
                      Control Automatizado
                    </text>
                    <line
                      x1="442"
                      y1="240"
                      x2="340"
                      y2="88"
                      stroke="#34d399"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Legend Row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
              <span>Azul: Videovigilancia IP</span>
              <span>Rojo: Control de Acceso</span>
              <span>Ámbar: Sistema Eléctrico</span>
              <span>Verde: Automatización</span>
            </div>
          </div>

          {/* Right 5 Columns: Toggle Layers & Instant Benefit Readout */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-200">
                Activa o desactiva capas para probar tu solución:
              </p>

              {LAYERS.map((layer) => {
                const enabled = activeLayers.includes(layer.id);
                return (
                  <motion.button
                    key={layer.id}
                    type="button"
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleLayer(layer.id)}
                    aria-pressed={enabled}
                    className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                      enabled
                        ? 'bg-slate-900 border-red-500/80 text-white'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          enabled ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <LayerIcon id={layer.id} className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-sm font-bold">{layer.label}</span>
                        <span className="block text-xs text-slate-300 mt-1 leading-relaxed">
                          {enabled ? layer.benefit[space] : layer.shortDesc}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-1 border ${
                        enabled
                          ? 'bg-red-600 border-red-600 text-white'
                          : 'border-slate-600 bg-slate-950'
                      }`}
                    >
                      {enabled && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => onApplyPresetToQuote(mappedServices)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-colors cursor-pointer min-h-12"
            >
              Cotizar esta configuración ({mappedServices.length}{' '}
              {mappedServices.length === 1 ? 'servicio' : 'servicios'})
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

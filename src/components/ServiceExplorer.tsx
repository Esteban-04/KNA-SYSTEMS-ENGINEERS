import { useMemo, useState } from 'react';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  SECTORS,
  SECTOR_PROFILES,
  SERVICES,
  type SectorId,
  type SpecificSectorId,
} from '../data/knaData';
import SafeImage from './SafeImage';

interface ServiceExplorerProps {
  activeSector: SectorId;
  onChangeSector: (sector: SectorId) => void;
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
  onGoToQuote: () => void;
}

const SECTOR_NAMES: Record<SpecificSectorId, string> = {
  residencial: 'Residencial',
  comercial: 'Comercial',
  empresarial: 'Empresarial',
  industrial: 'Industrial',
};

export default function ServiceExplorer({
  activeSector,
  onChangeSector,
  selectedServices,
  onToggleService,
  onGoToQuote,
}: ServiceExplorerProps) {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  const filteredServices = useMemo(() => {
    if (activeSector === 'todos') return SERVICES;
    return SERVICES.filter((s) => s.sectors.includes(activeSector));
  }, [activeSector]);

  const activeService =
    filteredServices.find((s) => s.id === activeServiceId) ?? filteredServices[0] ?? SERVICES[0];

  const isSelected = selectedServices.includes(activeService.id);
  const sectorProfile = SECTOR_PROFILES[activeSector];

  const handleSectorChange = (sector: SectorId) => {
    onChangeSector(sector);
    const matching =
      sector === 'todos' ? SERVICES : SERVICES.filter((s) => s.sectors.includes(sector));
    if (matching.length > 0 && !matching.some((s) => s.id === activeServiceId)) {
      setActiveServiceId(matching[0].id);
    }
  };

  const activeDeliverables =
    activeSector !== 'todos' && activeService.sectorDetails[activeSector]
      ? activeService.sectorDetails[activeSector]!.deliverables
      : activeService.deliverables;

  const activeDetailDescription =
    activeSector !== 'todos' && activeService.sectorDetails[activeSector]
      ? activeService.sectorDetails[activeSector]!.summary
      : activeService.description;

  const gridColsClass =
    filteredServices.length === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <section
      id="servicios"
      className="bg-slate-50 bg-light-grid border-b border-slate-200 py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header + Interactive Sector Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div className="max-w-lg">
            <p className="text-sm font-bold text-red-700 mb-2">Nuestros Servicios</p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950"
              style={{ textWrap: 'balance' }}
            >
              Servicios especializados, listos para tu proyecto.
            </h2>
          </div>

          {/* Interactive Sector Filter Menu */}
          <div
            role="group"
            aria-label="Filtrar servicios por sector"
            className="flex flex-wrap items-center gap-1 p-1.5 bg-white border border-slate-200 rounded-lg self-start lg:self-auto lg:shrink-0"
          >
            {SECTORS.map((sector) => {
              const active = activeSector === sector.id;
              return (
                <button
                  key={sector.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleSectorChange(sector.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-9 ${
                    active
                      ? 'bg-red-600 text-white'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {sector.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Sector Context Strip */}
        <div className="mb-8 p-4 sm:px-6 rounded-xl bg-white border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-950">{sectorProfile.title}</p>
            <p className="text-sm text-slate-600 mt-0.5 leading-relaxed break-words">
              {sectorProfile.subtitle}
            </p>
          </div>
          {sectorProfile.focus && (
            <div className="min-w-0 lg:max-w-sm lg:text-right">
              <p className="text-xs font-mono font-semibold text-red-700 leading-relaxed break-words">
                {sectorProfile.focus}
              </p>
            </div>
          )}
        </div>

        {/* Visual Bento Selector Cards (Adapts dynamically to sector) */}
        <div className={`grid ${gridColsClass} gap-4 mb-8`}>
          {filteredServices.map((service) => {
            const isCurrent = service.id === activeService.id;
            const isAdded = selectedServices.includes(service.id);
            const cardSummary =
              activeSector !== 'todos' && service.sectorDetails[activeSector]
                ? service.sectorDetails[activeSector]!.summary
                : service.summary;

            return (
              <motion.button
                key={service.id}
                type="button"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                onClick={() => setActiveServiceId(service.id)}
                aria-current={isCurrent ? 'true' : undefined}
                className={`group relative rounded-xl overflow-hidden border text-left cursor-pointer transition-colors flex flex-col bg-slate-950 ${
                  isCurrent
                    ? 'border-red-600 ring-2 ring-red-600/25'
                    : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <SafeImage
                    src={service.image}
                    alt={service.imageAlt}
                    fallbackTitle={service.title}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"
                  />
                </div>

                <div className="relative p-5 bg-slate-950 text-white flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-red-400 tabular-nums">
                        {service.number}.
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          isAdded ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {isAdded ? 'Incluido' : isCurrent ? 'Activo' : 'Ver detalle'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-2">
                      {cardSummary}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 mt-3 truncate">
                    {activeSector === 'todos'
                      ? service.sectors.map((sec) => SECTOR_NAMES[sec]).join(' · ')
                      : `Aplicado a sector ${SECTOR_NAMES[activeSector]}`}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Service Detailed Stage */}
        <AnimatePresence mode="wait">
          <motion.article
            key={`${activeService.id}-${activeSector}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
          >
            <div className="lg:col-span-5 relative min-h-[260px] bg-slate-900 overflow-hidden">
              <SafeImage
                src={activeService.image}
                alt={activeService.imageAlt}
                fallbackTitle={activeService.title}
                className="w-full h-full lg:h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-mono text-xs font-semibold text-red-400">
                  Servicio {activeService.number} · {activeService.responseTime}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
                  <span>
                    {activeSector === 'todos'
                      ? 'Todos los sectores'
                      : `Sector ${SECTOR_NAMES[activeSector]}`}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeService.standards}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mb-3">
                  {activeService.title}
                </h3>

                <p className="text-base text-slate-600 leading-relaxed mb-6">
                  {activeDetailDescription}
                </p>

                <div className="border-t border-slate-200 pt-5 mb-6">
                  <h4 className="text-sm font-bold text-slate-950 mb-3">
                    {activeSector === 'todos'
                      ? 'Alcance y entregables incluidos'
                      : `Soluciones recomendadas para sector ${SECTOR_NAMES[activeSector]}`}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeDeliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <Check
                          className="w-4 h-4 text-red-600 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs font-medium text-slate-500 max-w-sm">
                  {activeService.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleService(activeService.id)}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-11 ${
                      isSelected
                        ? 'bg-slate-950 text-white hover:bg-slate-800'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        Incluido en cotización
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        Agregar a mi cotización
                      </>
                    )}
                  </button>

                  {selectedServices.length > 0 && (
                    <button
                      type="button"
                      onClick={onGoToQuote}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-11"
                    >
                      Ir al cotizador ({selectedServices.length})
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}

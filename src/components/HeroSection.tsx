import { useState } from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { COMPANY_INFO, PILLARS, SERVICES, buildWhatsAppUrl } from '../data/knaData';
import SafeImage from './SafeImage';

interface HeroSectionProps {
  onStartQuote: () => void;
  onExploreServices: () => void;
  onSelectServiceAndQuote: (serviceId: string) => void;
}

export default function HeroSection({
  onStartQuote,
  onExploreServices,
  onSelectServiceAndQuote,
}: HeroSectionProps) {
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const currentService = SERVICES[spotlightIndex];

  const quickWhatsAppHref = buildWhatsAppUrl(
    'Hola KNA SYSTEMS ENGINEERS S.A.S., me gustaría recibir asesoría sobre sus soluciones de seguridad electrónica y sistemas eléctricos.'
  );

  return (
    <section
      id="inicio"
      className="relative bg-slate-950 text-white border-b border-slate-800 overflow-hidden bg-architectural-grid"
    >
      {/* Subtle architectural radial glow behind hero media */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 w-[640px] h-[640px] rounded-full bg-red-600/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 w-[520px] h-[520px] rounded-full bg-sky-500/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-14 lg:pt-16 lg:pb-20">
        {/* 2-Column Asymmetric Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between py-2"
          >
            <div>
              {/* Unboxed regional & corporate kicker */}
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-300 mb-6">
                <span className="text-white font-semibold tracking-wide">
                  {COMPANY_INFO.brandFull}
                </span>
                <span className="text-red-500" aria-hidden="true">
                  /
                </span>
                <span>
                  {COMPANY_INFO.city}, {COMPANY_INFO.country}
                </span>
                <span className="text-red-500" aria-hidden="true">
                  /
                </span>
                <span>Cobertura Nacional</span>
              </div>

              <h1
                className="font-extrabold tracking-tight text-white leading-[1.06] mb-6"
                style={{
                  fontSize: 'clamp(2.35rem, 4.2vw, 3.75rem)',
                  textWrap: 'balance',
                }}
              >
                Seguridad electrónica, automatización y{' '}
                <span className="text-red-500">sistemas eléctricos</span> a tu medida.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
                {COMPANY_INFO.heroSubheadline}
              </p>

              {/* Single Primary CTA + Secondary Action */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onStartQuote}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-12"
                >
                  Cotizar mi proyecto ahora
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onExploreServices}
                  className="inline-flex items-center justify-center px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-100 bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-12"
                >
                  Explorar soluciones
                </button>
              </div>
            </div>

            {/* Direct 24/7 line */}
            <div className="mt-10 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
              <a
                href={quickWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-white hover:text-red-400 transition-colors min-h-10"
              >
                <PhoneCall className="w-4 h-4 text-red-500" aria-hidden="true" />
                <span>Atención 24/7: {COMPANY_INFO.phoneDisplay}</span>
              </a>
              <span className="hidden sm:inline text-slate-700" aria-hidden="true">
                ·
              </span>
              <a
                href={COMPANY_INFO.emailHref}
                className="hover:text-white underline-offset-4 hover:underline transition-colors"
              >
                {COMPANY_INFO.email}
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Visual Showcase Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col rounded-xl overflow-hidden border border-slate-800 bg-slate-900"
          >
            {/* Interactive Solution Switcher Strip */}
            <div
              role="tablist"
              aria-label="Vista rápida de especialidades"
              className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-800 bg-slate-950/80"
            >
              {SERVICES.map((service, idx) => {
                const active = idx === spotlightIndex;
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSpotlightIndex(idx)}
                    className={`px-3 py-3 text-left transition-colors cursor-pointer border-b-2 ${
                      active
                        ? 'border-red-500 bg-slate-900 text-white'
                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                    }`}
                  >
                    <span className="block font-mono text-xs text-red-400">{service.number}.</span>
                    <span className="block text-xs font-semibold truncate mt-0.5">
                      {service.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Visual Stage */}
            <div className="relative flex-1 min-h-[310px] lg:min-h-[400px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <SafeImage
                    src={currentService.image}
                    alt={currentService.imageAlt}
                    fallbackTitle={currentService.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"
                    aria-hidden="true"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                <p className="text-xs font-medium text-red-400 mb-1">
                  Especialidad {currentService.number} · {currentService.responseTime}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-2">
                  {currentService.title}
                </h2>
                <p className="text-sm text-slate-200 max-w-lg leading-relaxed mb-4">
                  {currentService.summary}
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectServiceAndQuote(currentService.id)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <span>Cotizar {currentService.shortTitle}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Proof Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/90 flex flex-col"
            >
              <span className="font-mono text-xl font-bold text-red-500 tabular-nums tracking-tight">
                {pillar.metric}
              </span>
              <span className="text-sm font-bold text-white mt-1.5">{pillar.label}</span>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">{pillar.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

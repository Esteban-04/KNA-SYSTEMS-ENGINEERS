import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/knaData';

interface NavbarProps {
  onGoToQuote: () => void;
}

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#simulador', label: 'Simulador' },
  { href: '#cotizador', label: 'Cotizador' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#cobertura', label: 'Cobertura' },
];

export default function Navbar({ onGoToQuote }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#inicio"
          className="text-sm sm:text-base xl:text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-red-400 transition-colors truncate max-w-[210px] sm:max-w-none"
        >
          {COMPANY_INFO.brandShort}
        </a>

        {/* Zone 2: 5 single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-white underline-offset-8 hover:underline decoration-red-500 decoration-2 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA + responsive drawer trigger below lg */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onGoToQuote}
            className="hidden sm:inline-flex items-center justify-center px-3.5 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-10"
          >
            Solicitar Cotización
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-800 text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Drawer for Mobile and Tablet */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 sm:px-6 py-4 space-y-2">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 text-base font-medium text-slate-200 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-800 sm:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onGoToQuote();
              }}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors cursor-pointer"
            >
              Solicitar Cotización
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

import { COMPANY_INFO, buildWhatsAppUrl } from '../data/knaData';

export default function Footer() {
  const waHref = buildWhatsAppUrl(
    'Hola KNA SYSTEMS ENGINEERS S.A.S., quiero hablar con un asesor sobre un proyecto.'
  );

  return (
    <footer className="bg-slate-950 text-slate-300 py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          <div className="md:col-span-5">
            <p className="text-lg font-bold tracking-tight text-white">
              {COMPANY_INFO.brandFull}
            </p>
            <p className="text-sm text-slate-400 mt-3 max-w-sm leading-relaxed">
              Soluciones integrales en seguridad electrónica, automatización y sistemas eléctricos en {COMPANY_INFO.city} y todo el territorio nacional.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-slate-400 mb-3">Navegación</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Nuestros Servicios
                </a>
              </li>
              <li>
                <a href="#cotizador" className="hover:text-white transition-colors">
                  Cotizador Rápido
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-white transition-colors">
                  Quiénes Somos
                </a>
              </li>
              <li>
                <a href="#cobertura" className="hover:text-white transition-colors">
                  Cobertura Nacional
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold text-slate-400 mb-3">Contacto directo 24/7</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="font-mono font-semibold text-white hover:text-red-400 transition-colors"
                >
                  +57 {COMPANY_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  Escribir por WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.emailHref}
                  className="hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="text-slate-400">
                {COMPANY_INFO.city}, {COMPANY_INFO.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.brandFull}. Todos los derechos reservados.</p>
          <p>Seguridad Electrónica · Automatización · Sistemas Eléctricos</p>
        </div>
      </div>
    </footer>
  );
}

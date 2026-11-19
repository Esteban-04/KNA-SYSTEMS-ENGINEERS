export type SectorId = 'todos' | 'residencial' | 'comercial' | 'empresarial' | 'industrial';

export type ScaleId = 'pequena' | 'mediana' | 'gran_escala';

export type SpecificSectorId = Exclude<SectorId, 'todos'>;

export interface SectorDetail {
  summary: string;
  deliverables: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  sectors: SpecificSectorId[];
  deliverables: string[];
  sectorDetails: Partial<Record<SpecificSectorId, SectorDetail>>;
  standards: string;
  responseTime: string;
}

export interface CoverageZone {
  id: string;
  region: string;
  cities: string;
  dispatch: string;
  serviceMode: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const COMPANY_INFO = {
  brandShort: 'KNA SYSTEMS ENGINEERS',
  brandFull: 'KNA SYSTEMS ENGINEERS S.A.S.',
  city: 'Bogotá D.C.',
  country: 'Colombia',
  phoneDisplay: '323 249 6764',
  phoneHref: 'tel:+573232496764',
  whatsappNumber: '573232496764',
  email: 'knasystemsengineers@gmail.com',
  emailHref: 'mailto:knasystemsengineers@gmail.com',
  heroHeadline: 'Seguridad electrónica, automatización y sistemas eléctricos a tu medida.',
  heroSubheadline:
    'Transformamos la manera en que proteges tu hogar, empresa o planta industrial, combinando tecnología confiable, simplicidad operativa y respaldo técnico 24/7 en toda Colombia.',
  aboutSummary:
    'KNA SYSTEMS ENGINEERS S.A.S. es una compañía colombiana dedicada a ofrecer soluciones integrales en las áreas de seguridad electrónica, automatización y sistemas eléctricos, orientadas a sectores residenciales, comerciales, empresariales e industriales.',
  aboutPurpose:
    'Nuestro propósito es brindar confianza, eficiencia y respaldo técnico a través de servicios diseñados a la medida, con base en un enfoque de cumplimiento, normatividad vigente y excelencia operativa.',
  commitment:
    'Nos comprometemos a ejecutar cada proyecto bajo estándares técnicos, de calidad y seguridad industrial, respetando la normatividad vigente y asegurando el bienestar de nuestros colaboradores, clientes y usuarios finales.',
};

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_security_engineering_1795059104334.jpg',
  alt: 'Centro de control arquitectónico con monitoreo de seguridad electrónica y automatización de edificios',
};

export const PILLARS = [
  {
    id: 'cobertura',
    metric: '100% Nacional',
    label: 'Cobertura en todo el país',
    detail: 'Atención directa desde Bogotá D.C. hacia todas las regiones de Colombia.',
  },
  {
    id: 'atencion',
    metric: '24 / 7',
    label: 'Disponibilidad continua',
    detail: 'Hable con nosotros sobre cualquier inquietud técnica en todo momento.',
  },
  {
    id: 'normatividad',
    metric: 'RETIE · NTC',
    label: 'Cumplimiento normativo',
    detail: 'Proyectos ejecutados bajo estándares de seguridad industrial vigentes.',
  },
  {
    id: 'usabilidad',
    metric: '4 Sectores',
    label: 'Fácil de usar, difícil de igualar',
    detail: 'Soluciones residenciales, comerciales, empresariales e industriales.',
  },
];

export const SECTORS: { id: SectorId; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'residencial', label: 'Residencial' },
  { id: 'comercial', label: 'Comercial' },
  { id: 'empresarial', label: 'Empresarial' },
  { id: 'industrial', label: 'Industrial' },
];

export const SECTOR_PROFILES: Record<
  SectorId,
  { title: string; subtitle: string; focus: string }
> = {
  todos: {
    title: 'Portafolio completo para todos los sectores',
    subtitle: 'Selecciona un sector arriba para ver las soluciones adaptadas a tu tipo de propiedad.',
    focus: '',
  },
  residencial: {
    title: 'Soluciones para sector Residencial',
    subtitle: 'Casas - Apartamentos - Fincas - Conjuntos cerrados · Manejo fácil desde tu celular.',
    focus: 'Protección familiar - Accesos - Seguridad eléctrica del hogar',
  },
  comercial: {
    title: 'Soluciones para sector Comercial',
    subtitle: 'Locales - Restaurantes - Consultorios - Farmacias - Tiendas · Control continuo.',
    focus: 'Vigilancia en punto de venta - Alarmas - Redes eléctricas seguras',
  },
  empresarial: {
    title: 'Soluciones para sector Empresarial',
    subtitle: 'Oficinas - Edificios corporativos - Clínicas - Sedes administrativas.',
    focus: 'Control biométrico - Red regulada - Modernización',
  },
  industrial: {
    title: 'Soluciones para sector Industrial',
    subtitle: 'Bodegas - Parques logísticos - Plantas de producción · Alta exigencia.',
    focus: 'Perímetros extensos - Potencia RETIE - Continuidad 24/7',
  },
};

export const SCALES: { id: ScaleId; label: string; hint: string }[] = [
  { id: 'pequena', label: 'Hogar - Local', hint: '1 a 8 puntos / área compacta' },
  { id: 'mediana', label: 'Oficina - Edificio - Bodega', hint: 'Múltiples zonas y control central' },
  { id: 'gran_escala', label: 'Planta - Proyecto corporativo', hint: 'Ingeniería integral y alta capacidad' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'seguridad-electronica',
    number: '01',
    title: 'Seguridad Electrónica',
    shortTitle: 'Seguridad Electrónica',
    summary:
      'Videovigilancia inteligente, control de acceso biométrico y sistemas de intrusión fáciles de operar desde tu móvil o centro de monitoreo.',
    description:
      'Diseñamos e instalamos arquitecturas de protección adaptadas al riesgo real de cada espacio, integrando cámaras IP de alta definición, control de accesos y detección perimetral con manejo intuitivo para el usuario final.',
    image: '/src/assets/images/service_cctv_access_1795059103984.jpg',
    imageAlt: 'Lector biométrico RFID de control de acceso junto a cámara domo IP en acceso corporativo',
    sectors: ['residencial', 'comercial', 'empresarial', 'industrial'],
    deliverables: [
      'Circuito cerrado de televisión (CCTV IP y analógico HD) con acceso remoto',
      'Control de acceso biométrico, RFID, torniquetes y cerraduras electromagnéticas',
      'Sistemas de alarma contra intrusión, sensores perimetrales y cercos eléctricos',
      'Citofonía IP, automatización de portones y control vehicular',
    ],
    sectorDetails: {
      residencial: {
        summary:
          'Cámaras visibles desde tu teléfono, citofonía IP, alarmas y cercos eléctricos para hogares y conjuntos.',
        deliverables: [
          'Cámaras HD exteriores e interiores con alertas en tu celular',
          'Citofonía IP y videoporteros inteligentes para casas y porterías',
          'Cercos eléctricos perimetrales y sensores de apertura de puertas',
          'Automatización de portones de garaje y control remoto seguro',
        ],
      },
      comercial: {
        summary:
          'Vigilancia clara en cajas, vitrinas y bodegas con alarmas contra intrusión y control de puertas.',
        deliverables: [
          'Cámaras de alta nitidez en puntos de pago, pasillos y bodegas',
          'Alarmas monitoreables con sensores de movimiento y botones de pánico',
          'Cerraduras electromagnéticas y control de ingreso a zonas restringidas',
          'Visualización remota multisucursal desde celular o computador',
        ],
      },
      empresarial: {
        summary:
          'Control de acceso biométrico para empleados, torniquetes en recepción y monitoreo centralizado.',
        deliverables: [
          'Terminales biométricos (rostro/huella/RFID) con registro de horarios',
          'Torniquetes peatonales y control de acceso por pisos o áreas',
          'CCTV IP integrado en sala de monitoreo y respaldo NVR seguro',
          'Sistemas de intrusión por zonas para oficinas y cuartos técnicos',
        ],
      },
      industrial: {
        summary:
          'Cámaras perimetrales de largo alcance, control vehicular en muelles y seguridad de alto tráfico.',
        deliverables: [
          'Cámaras PTZ y térmicas/nocturnas para patios, muelles y perímetros',
          'Talanqueras vehiculares, control de contratistas y torniquetes pesados',
          'Detección perimetral temprana para bodegas y plantas de producción',
          'Centros locales de grabación con autonomía y respaldo eléctrico',
        ],
      },
    },
    standards: 'Buenas prácticas de videovigilancia y privacidad · Infraestructura cableada certificada',
    responseTime: 'Visita técnica en 24–48 h en Bogotá y programación nacional',
  },
  {
    id: 'sistema-electrico',
    number: '02',
    title: 'Sistema Eléctrico',
    shortTitle: 'Sistema Eléctrico',
    summary:
      'Instalaciones eléctricas seguras, sistemas de puesta a tierra, iluminación técnica y respaldo de energía bajo normativa vigente.',
    description:
      'Ejecutamos redes eléctricas internas, canalización certificada, iluminación eficiente y protección contra descargas para garantizar continuidad operativa sin fallas ni sobrecargas.',
    image: '/src/assets/images/service_electrical_systems_1795061256439.jpg',
    imageAlt: 'Infraestructura eléctrica moderna con tubería EMT en acero, iluminación LED arquitectónica y respaldo UPS',
    sectors: ['residencial', 'comercial', 'empresarial', 'industrial'],
    deliverables: [
      'Redes eléctricas reguladas y normales para hogares, oficinas, locales y plantas',
      'Sistemas de puesta a tierra, protección contra sobretensiones y respaldo UPS',
      'Canalización eléctrica en tubería EMT/IMC y cableado certificado',
      'Iluminación LED técnica, comercial, industrial y de emergencia',
    ],
    sectorDetails: {
      residencial: {
        summary:
          'Instalaciones eléctricas domiciliarias seguras, protecciones diferenciales e iluminación LED eficiente.',
        deliverables: [
          'Adecuación de circuitos eléctricos y protecciones contra cortocircuitos',
          'Instalación de tomas reguladas para equipos sensibles y home office',
          'Iluminación LED interior, exterior y sensores de presencia en pasillos',
          'Corrección de fallas eléctricas, sobrecargas y puesta a tierra',
        ],
      },
      comercial: {
        summary:
          'Circuitos dedicados para vitrinas, refrigeración, cajas registradoras e iluminación comercial.',
        deliverables: [
          'Redes independientes para equipos POS, cómputo y exhibición',
          'Iluminación comercial LED de bajo consumo y luces de emergencia',
          'Sistemas de respaldo UPS para evitar pérdida de ventas o datos',
          'Adecuaciones eléctricas bajo norma vigente para apertura de local',
        ],
      },
      empresarial: {
        summary:
          'Redes eléctricas reguladas para puestos de trabajo, cuartos de datos y edificios corporativos.',
        deliverables: [
          'Cableado eléctrico normal y regulado por estaciones de trabajo',
          'Bancos de UPS y protección contra sobretensiones para racks y servidores',
          'Sistemas de puesta a tierra certificados bajo norma RETIE y NTC 2050',
          'Iluminación eficiente y señalización de rutas de evacuación',
        ],
      },
      industrial: {
        summary:
          'Redes de potencia y control, acometidas de maquinaria y respaldo eléctrico industrial.',
        deliverables: [
          'Canalización industrial y acometidas eléctricas para equipos y maquinaria',
          'Redes de puesta a tierra, apantallamiento y supresores de picos',
          'Iluminación industrial LED de alta potencia para naves y bodegas',
          'Adecuaciones de carga y balanceo de fases bajo cumplimiento RETIE',
        ],
      },
    },
    standards: 'Cumplimiento RETIE · Norma NTC 2050 · Seguridad Industrial',
    responseTime: 'Diagnóstico eléctrico prioritario y ejecución por fases',
  },
  {
    id: 'servicios-tecnicos',
    number: '03',
    title: 'Servicios Técnicos Especializados',
    shortTitle: 'Servicios Técnicos',
    summary:
      'Mantenimiento preventivo y correctivo, diagnóstico de fallas críticas y soporte técnico 24/7 para mantener tus sistemas siempre operativos.',
    description:
      'Protegemos tu inversión tecnológica mediante planes de mantenimiento programado, revisión de conectividad, limpieza de equipos, calibración de sensores y atención inmediata ante incidencias.',
    image: '/src/assets/images/service_technical_team_1795059104355.jpg',
    imageAlt: 'Ingeniero de sistemas revisando gabinete de automatización industrial con tableta de diagnóstico',
    sectors: ['comercial', 'empresarial', 'industrial', 'residencial'],
    deliverables: [
      'Mantenimiento preventivo y correctivo de CCTV, alarmas y control de acceso',
      'Inspección de equipos y verificación de continuidad en redes eléctricas',
      'Recuperación de grabadores NVR/DVR, respaldos y optimización de red',
      'Mesa de acompañamiento y soporte técnico 24/7 para clientes',
    ],
    sectorDetails: {
      residencial: {
        summary:
          'Revisión de cámaras que dejaron de grabar, reparación de citófonos, motores y fallas eléctricas.',
        deliverables: [
          'Reconfiguración de acceso remoto en celular cuando cambias de router',
          'Limpieza, ajuste de enfoque y cambio de fuentes en cámaras existentes',
          'Mantenimiento de cercos eléctricos, alarmas y motores de portón',
          'Atención rápida ante cortos o disparos frecuentes de tacos eléctricos',
        ],
      },
      comercial: {
        summary:
          'Puesta a punto rápida de cámaras, alarmas y redes eléctricas para que tu negocio no se detenga.',
        deliverables: [
          'Diagnóstico y reparación de grabadores DVR/NVR y discos duros',
          'Pruebas periódicas de sensores, sirenas y baterías de respaldo',
          'Corrección de puntos de red, fuentes quemadas y cableado deteriorado',
          'Soporte técnico prioritario en caso de fallas críticas',
        ],
      },
      empresarial: {
        summary:
          'Planes mensuales o trimestrales de mantenimiento preventivo con informe técnico documentado.',
        deliverables: [
          'Mantenimiento integral de biométricos, torniquetes y CCTV corporativo',
          'Revisión técnica y ajuste de conexiones en redes eléctricas reguladas',
          'Auditoría de grabaciones, almacenamiento y salud de red',
          'Canal directo 24/7 para incidencias de sedes y oficinas',
        ],
      },
      industrial: {
        summary:
          'Mantenimiento programado de sistemas eléctricos, automatización y seguridad perimetral en planta.',
        deliverables: [
          'Inspección de equipos en sistemas de potencia y protecciones',
          'Mantenimiento preventivo de cámaras perimetrales y control de accesos',
          'Diagnóstico de fallas en lazos de control y sistemas automatizados',
          'Reportes técnicos de cumplimiento para auditorías de seguridad industrial',
        ],
      },
    },
    standards: 'Protocolos de seguridad en alturas y riesgo eléctrico · Reportes técnicos detallados',
    responseTime: 'Atención de contingencias 24/7 vía canal directo',
  },
  {
    id: 'montaje-modernizacion',
    number: '04',
    title: 'Montaje, Modernización y Suministro',
    shortTitle: 'Montaje y Modernización',
    summary:
      'Actualización de sistemas existentes, automatización integral y suministro de equipamiento profesional certificado.',
    description:
      'Si ya cuentas con infraestructura antigua o inicias una nueva obra, te acompañamos desde el suministro de equipos confiables hasta la puesta en marcha y capacitación de tu equipo.',
    image: '/src/assets/images/hero_security_engineering_1795059104334.jpg',
    imageAlt: 'Centro tecnológico moderno con integración de montaje, automatización y monitoreo',
    sectors: ['comercial', 'empresarial', 'industrial'],
    deliverables: [
      'Migración de sistemas analógicos antiguos a plataformas IP y automatizadas',
      'Suministro de cámaras, biométricos, cableado estructurado y equipos certificados',
      'Integración entre seguridad electrónica, control de energía y automatización',
      'Capacitación práctica de uso y entrega de manuales operativos',
    ],
    sectorDetails: {
      comercial: {
        summary:
          'Renovación de cámaras antiguas, cableado ordenado y suministro completo para apertura o remodelación.',
        deliverables: [
          'Cambio de cámaras borrosas antiguas por equipos HD/IP aprovechando ductos',
          'Suministro directo de NVR, discos de videovigilancia, UPS y cableado',
          'Adecuación integral al abrir un nuevo local o ampliar tu punto de venta',
          'Capacitación rápida para administradores y cajeros',
        ],
      },
      empresarial: {
        summary:
          'Modernización de sedes corporativas integrando control de acceso, video, red y potencia.',
        deliverables: [
          'Migración progresiva sin interrumpir la operación diaria de tu oficina',
          'Suministro certificado de equipos de control, racks y respaldo UPS',
          'Unificación de múltiples sistemas en una sola plataforma de gestión',
          'Entrega documentada de planos, manuales y capacitación al personal',
        ],
      },
      industrial: {
        summary:
          'Montaje de infraestructura nueva en bodegas y plantas, modernización eléctrica y automatización.',
        deliverables: [
          'Suministro e instalación integral de seguridad, redes eléctricas y automatización',
          'Modernización de redes eléctricas antiguas y sistemas de control de planta',
          'Tendido industrial en tubería EMT/IMC y canalización certificada',
          'Pruebas de puesta en marcha y capacitación al equipo de mantenimiento',
        ],
      },
    },
    standards: 'Equipos homologados con garantía directa · Instalación y puesta en marcha certificada',
    responseTime: 'Cronograma de obra cerrado con entregas verificables',
  },
];

export const REASONS_TO_CHOOSE = [
  {
    number: '01',
    title: 'Tecnología confiable y profesional',
    description:
      'Trabajamos exclusivamente con equipamiento certificado y arquitectura técnica pensada para durar sin fallas intermitentes.',
  },
  {
    number: '02',
    title: 'Fácil de usar, difícil de igualar',
    description:
      'Entregamos cada sistema configurado y con capacitación clara para que tú o tu personal puedan operarlo sin complicaciones.',
  },
  {
    number: '03',
    title: 'Valoramos a nuestros clientes',
    description:
      'Escuchamos tus requerimientos reales antes de cotizar, evitando sobrecostos innecesarios o equipos que no necesitas.',
  },
  {
    number: '04',
    title: 'Hable con nosotros 24/7',
    description:
      'Resolvemos dudas operativas o emergencias técnicas en cualquier horario por línea directa o WhatsApp.',
  },
  {
    number: '05',
    title: 'No importa dónde se encuentre, lo tenemos cubierto',
    description:
      'Base operativa en Bogotá D.C. con capacidad de desplazamiento y cobertura técnica en todo el territorio colombiano.',
  },
];

export const COVERAGE_ZONES: CoverageZone[] = [
  {
    id: 'bogota',
    region: 'Bogotá D.C. y Sabana',
    cities: 'Bogotá, Chía, Cajicá, Funza, Mosquera, Madrid, Soacha, Zipaquirá',
    dispatch: 'Visita técnica en 24 horas',
    serviceMode: 'Atención presencial inmediata y soporte 24/7',
  },
  {
    id: 'antioquia',
    region: 'Antioquia y Eje Cafetero',
    cities: 'Medellín, Rionegro, Envigado, Pereira, Manizales, Armenia',
    dispatch: 'Despliegue programado 48–72 horas',
    serviceMode: 'Proyectos corporativos, industriales y mantenimientos periódicos',
  },
  {
    id: 'valle',
    region: 'Suroccidente y Valle',
    cities: 'Cali, Palmira, Yumbo, Buga, Popayán',
    dispatch: 'Despliegue programado 48–72 horas',
    serviceMode: 'Montaje industrial, seguridad electrónica y redes eléctricas',
  },
  {
    id: 'caribe',
    region: 'Región Caribe y Santanderes',
    cities: 'Barranquilla, Cartagena, Santa Marta, Bucaramanga, Cúcuta',
    dispatch: 'Cobertura nacional bajo cronograma',
    serviceMode: 'Instalación de seguridad electrónica, automatización y soporte técnico en obra',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Diagnóstico sin costo',
    description: 'Nos cuentas qué necesitas o realizamos visita técnica para evaluar el espacio y los riesgos reales.',
  },
  {
    number: '02',
    title: 'Propuesta clara y a la medida',
    description: 'Recibes una cotización transparente con marcas, alcances, tiempos de entrega y cumplimiento normativo.',
  },
  {
    number: '03',
    title: 'Instalación limpia y segura',
    description: 'Nuestros ingenieros y técnicos ejecutan el montaje cumpliendo protocolos de seguridad industrial.',
  },
  {
    number: '04',
    title: 'Capacitación y respaldo 24/7',
    description: 'Probamos todo contigo, te enseñamos a usarlo fácilmente y quedamos disponibles para soporte continuo.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Cómo solicito una visita técnica o cotización?',
    answer:
      'Puedes usar el cotizador interactivo en esta misma página en menos de 1 minuto o escribirnos directamente al WhatsApp 323 249 6764. Coordinamos el diagnóstico según tu ciudad.',
  },
  {
    id: 'faq-2',
    question: '¿Atienden tanto hogares como empresas e industrias?',
    answer:
      'Sí. Diseñamos soluciones escalables para residencias y conjuntos, locales comerciales, oficinas empresariales y plantas industriales en todo el país.',
  },
  {
    id: 'faq-3',
    question: '¿Pueden modernizar cámaras o redes eléctricas que ya tengo instaladas?',
    answer:
      'Sí. Evaluamos tu infraestructura actual para aprovechar cableado o equipos en buen estado y actualizar únicamente lo necesario hacia tecnología IP o normativa eléctrica vigente.',
  },
  {
    id: 'faq-4',
    question: '¿Qué garantía y soporte ofrecen después de la instalación?',
    answer:
      'Todos los montajes incluyen capacitación de manejo, garantía sobre equipos e instalación, y acceso a nuestro canal de atención 24/7 para resolver cualquier inquietud.',
  },
];

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

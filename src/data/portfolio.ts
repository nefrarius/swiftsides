export interface PortfolioItem {
  id: string;
  title: string;
  sector: string;
  category: string;
  technologies: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'swiftsite',
    title: 'SwiftSite',
    sector: 'Agencia Digital',
    category: 'tecnologia',
    technologies: ['Astro', 'Tailwind', 'GSAP'],
    description: 'Nuestra propia web, el primer proyecto de SwiftSite.',
    challenge: 'Comenzar desde cero con una identidad digital propia que transmitiera rapidez y profesionalidad.',
    solution: 'Diseñamos y desarrollamos esta web con Astro y Tailwind, priorizando velocidad, diseño moderno y experiencia de usuario.',
    results: ['Web ultrarrápida', 'Diseño responsive', 'SEO optimizado'],
    image: '/images/portfolio-1.jpg',
  },
  {
    id: 'la-cuchara-de-oro',
    title: 'La Cuchara de Oro',
    sector: 'Restaurantes',
    category: 'restaurantes',
    technologies: ['Astro', 'Tailwind', 'GSAP'],
    description: 'Web moderna para restaurante tradicional español con reservas online.',
    challenge: 'Necesitaban una web que reflejara la calidez de su restaurante y permitiera reservas sin comisiones.',
    solution: 'Diseñamos una experiencia visual rica con fotografía gastronómica prominente e integración de reservas directas.',
    results: ['+45% reservas online', '-30% comisiones de terceros', '3.2s tiempo de carga'],
    image: '/images/portfolio-1.jpg',
  },
  {
    id: 'tech-zone',
    title: 'TechZone',
    sector: 'Tecnología',
    category: 'tecnologia',
    technologies: ['Astro', 'React', 'Stripe'],
    description: 'Tienda online de productos tecnológicos con catálogo de 40 productos.',
    challenge: 'Querían vender online sin depender de marketplaces que les cobraban altas comisiones.',
    solution: 'Ecommerce completo con pasarela de pago, gestión de stock y envíos automatizados.',
    results: ['+120% ventas online', '50 productos activos', '0% comisiones'],
    image: '/images/portfolio-2.jpg',
  },
  {
    id: 'estetica-rosa',
    title: 'Estética Rosa',
    sector: 'Belleza',
    category: 'belleza',
    technologies: ['Astro', 'Tailwind', 'Calendly'],
    description: 'Centro de estética con reservas de citas y galería de tratamientos.',
    challenge: 'La mayoría de sus clientes reservaban por teléfono, saturando la línea durante horas pico.',
    solution: 'Sistema de citas online sincronizado con su calendario y recordatorios automáticos.',
    results: ['+60% citas online', '-40% llamadas perdidas', '+25% ocupación'],
    image: '/images/portfolio-3.jpg',
  },
  {
    id: 'clinica-dental-sonrisa',
    title: 'Clínica Dental Sonrisa',
    sector: 'Salud',
    category: 'salud',
    technologies: ['Astro', 'Tailwind', 'GSAP'],
    description: 'Web corporativa para clínica dental con formulario de citas y blog.',
    challenge: 'Necesitaban transmitir confianza y profesionalidad online para atraer nuevos pacientes.',
    solution: 'Diseño limpio y confiable con testimonios de pacientes y contenido educativo sobre salud dental.',
    results: ['+80% consultas online', '+35% nuevos pacientes', 'Top 3 Google local'],
    image: '/images/portfolio-4.jpg',
  },
  {
    id: 'gym-iron',
    title: 'Gym Iron',
    sector: 'Fitness',
    category: 'servicios',
    technologies: ['Astro', 'React', 'Tailwind'],
    description: 'Web para gimnasio local con horarios, entrenadores y membership online.',
    challenge: 'Competían contra grandes cadenas de gimnasios con presencia digital muy fuerte.',
    solution: 'Web dinámica con sección de entrenadores personales, calculadora de IMC y registro de membresías.',
    results: ['+50% nuevas altas', '-20% abandonos', '+200% tráfico web'],
    image: '/images/portfolio-5.jpg',
  },
  {
    id: 'inmo-living',
    title: 'InmoLiving',
    sector: 'Inmobiliaria',
    category: 'servicios',
    technologies: ['Astro', 'Tailwind', 'Mapbox'],
    description: 'Portal inmobiliario local con mapa interactivo y filtros avanzados.',
    challenge: 'Sus propiedades no tenían visibilidad online fuera de los portales genéricos.',
    solution: 'Web propia con catálogo filtrable, mapa de ubicaciones y formulario de contacto por propiedad.',
    results: ['+90% visitas a propiedades', '+25% contactos directos', '2.8s LCP'],
    image: '/images/portfolio-6.jpg',
  },
  {
    id: 'panaderia-maria',
    title: 'Panadería María',
    sector: 'Alimentación',
    category: 'restaurantes',
    technologies: ['Astro', 'Tailwind'],
    description: 'Web sencilla para panadería artesanal con catálogo de productos y pedidos.',
    challenge: 'Durante la pandemia necesitaban vender online para sobrevivir sin conocimientos técnicos.',
    solution: 'Web ultra-sencilla de gestionar con catálogo de productos diarios y pedidos por WhatsApp.',
    results: ['+200% pedidos semanales', 'Web gestionada por ellos mismos', 'Coste cero mantenimiento'],
    image: '/images/portfolio-7.jpg',
  },
  {
    id: 'studio-tattoo',
    title: 'Studio Tattoo Ink',
    sector: 'Belleza',
    category: 'belleza',
    technologies: ['Astro', 'GSAP', 'Tailwind'],
    description: 'Portfolio visual para estudio de tatuajes con galería y reservas.',
    challenge: 'Necesitaban mostrar su portfolio de arte corporal de forma impactante y profesional.',
    solution: 'Galería inmersiva con lightbox, perfiles de artistas y sistema de citas con consulta previa.',
    results: ['+70% citas reservadas', 'Galería con 200+ fotos', 'Top 1 en su ciudad'],
    image: '/images/portfolio-8.jpg',
  },
];

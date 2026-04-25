export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  cta: string;
}

export const services: Service[] = [
  {
    id: 'diseno-web',
    title: 'Diseño Web desde Cero',
    description: 'Creamos tu página web única y profesional, diseñada a medida para reflejar la esencia de tu negocio local. Hosting y dominio incluidos.',
    icon: 'Brush',
    features: ['Diseño 100% personalizado', 'Responsive para todos los dispositivos', 'Optimización de velocidad', 'SEO técnico incluido', 'Hosting y dominio incluidos'],
    cta: 'Solicitar presupuesto',
  },
  {
    id: 'rediseno',
    title: 'Rediseño de Webs Existentes',
    description: '¿Tu web ya no representa tu marca? Le damos una nueva vida moderna, rápida y optimizada.',
    icon: 'RefreshCw',
    features: ['Análisis de la web actual', 'Mejora de UX/UI', 'Migración de contenidos', 'Sin pérdida de posicionamiento'],
    cta: 'Quiero renovar mi web',
  },
  {
    id: 'ecommerce',
    title: 'Tienda Online (Ecommerce)',
    description: 'Vende tus productos 24/7 con una tienda online sencilla, segura y fácil de gestionar.',
    icon: 'ShoppingCart',
    features: ['Hasta 50 productos', 'Pasarela de pago integrada', 'Gestión de pedidos intuitiva', 'Carrito y checkout optimizado'],
    cta: 'Empezar mi tienda',
  },
  {
    id: 'seo-local',
    title: 'SEO Local + Google My Business',
    description: 'Aparece en los primeros resultados cuando los clientes locales te buscan. Optimizamos tu presencia en Google.',
    icon: 'MapPin',
    features: ['Optimización Google My Business', 'Palabras clave locales', 'Backlinks de calidad', 'Informes mensuales'],
    cta: 'Mejorar mi visibilidad',
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento Mensual',
    description: 'Nos encargamos de mantener tu web actualizada, segura y funcionando a la perfección mientras tú trabajas.',
    icon: 'Settings',
    features: ['Actualizaciones de seguridad', 'Copias de seguridad diarias', 'Soporte técnico', 'Mejoras continuas'],
    cta: 'Contratar mantenimiento',
  },
  {
    id: 'reservas',
    title: 'Integración de Reservas/Citas',
    description: 'Permite a tus clientes reservar citas o mesas directamente desde tu web, sin comisiones.',
    icon: 'Calendar',
    features: ['Calendario integrado', 'Notificaciones automáticas', 'Sincronización con Google Calendar', 'Gestión de disponibilidad'],
    cta: 'Añadir reservas',
  },
];

export const sectors = [
  {
    id: 'restaurantes',
    name: 'Restaurantes',
    benefits: ['Carta digital interactiva', 'Reservas de mesa online', 'Pedidos para recoger'],
    example: 'restaurante',
  },
  {
    id: 'belleza',
    name: 'Salud y Belleza',
    benefits: ['Reserva de citas 24/7', 'Galería de trabajos', 'Catálogo de servicios'],
    example: 'peluqueria',
  },
  {
    id: 'tecnologia',
    name: 'Tecnología',
    benefits: ['Catálogo de productos', 'Soporte técnico integrado', 'Blog de noticias'],
    example: 'tienda-tech',
  },
  {
    id: 'retail',
    name: 'Retail',
    benefits: ['Tienda online completa', 'Gestión de inventario', 'Promociones y ofertas'],
    example: 'tienda-ropa',
  },
  {
    id: 'profesionales',
    name: 'Servicios Profesionales',
    benefits: ['Web corporativa elegante', 'Formulario de contacto avanzado', 'Testimonios de clientes'],
    example: 'clinica',
  },
];

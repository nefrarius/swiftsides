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
    id: 'swift-sides-primera',
    title: 'SwiftSides',
    sector: 'Agencia Digital',
    category: 'todos',
    technologies: ['Astro', 'Tailwind', 'GSAP'],
    description: 'Nuestra propia web, el primer proyecto de SwiftSides.',
    challenge: 'Comenzar desde cero con una identidad digital propia que transmitiera rapidez y profesionalidad.',
    solution: 'Diseñamos y desarrollamos esta web con Astro y Tailwind, priorizando velocidad, diseño moderno y experiencia de usuario.',
    results: ['Web ultrarrápida', 'Diseño responsive', 'SEO optimizado'],
    image: '/images/portfolio-1.jpg',
  },
];

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  type: string;
  text: string;
  initials: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Cliente Ejemplo',
    business: 'Bar El Rincón',
    type: 'Restaurante',
    text: 'SwiftSite nos montó la web en menos de 3 días. Todo muy profesional y el trato inmejorable.',
    initials: 'CE',
    rating: 5,
  },
  {
    id: '2',
    name: 'María López',
    business: 'Peluquería Estilo',
    type: 'Peluquería',
    text: 'Tenía una web antigua y desactualizada. Ellos la renovaron por completo y ahora recibo citas online constantemente.',
    initials: 'ML',
    rating: 5,
  },
  {
    id: '3',
    name: 'Carlos Ruiz',
    business: 'Café Central',
    type: 'Cafetería',
    text: 'Gran trabajo, rápido y sin complicaciones. El precio muy ajustado para lo que ofrecen.',
    initials: 'CR',
    rating: 5,
  },
];

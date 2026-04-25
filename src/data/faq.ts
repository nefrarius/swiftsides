export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: '¿Cuánto tarda en estar lista mi web?',
    answer: 'Entre 48 y 72 horas desde que nos proporcionas la información y el contenido necesario. Trabajamos con rapidez sin sacrificar calidad.',
  },
  {
    question: '¿Puedo editar yo la web?',
    answer: 'Nos encargamos nosotros de cualquier cambio que necesites. Solo dinos qué quieres modificar y lo haremos lo más rápido posible, sin coste adicional dentro de lo razonable.',
  },
  {
    question: '¿Incluye hosting y dominio?',
    answer: 'Sí, el hosting y el dominio están incluidos en el precio del plan. No hay aumentos ni costes extra por este concepto.',
  },
  {
    question: '¿Qué pasa si no tengo fotos profesionales?',
    answer: 'Con que nos envíes unas fotos del establecimiento para hacernos una idea, nosotros nos encargamos de la edición y adaptación para que queden profesionales en tu web.',
  },
  {
    question: '¿La web se verá bien en móviles?',
    answer: 'Sí, absolutamente. Todos nuestros diseños son 100% responsive y se adaptan perfectamente a móviles, tablets y ordenadores.',
  },
  {
    question: '¿Puedo cambiar de plan o cancelar más adelante?',
    answer: 'Puedes cambiar de plan o cancelar en cualquier momento. No obstante, no aceptamos devoluciones si ese mes ya se ha cobrado. Tendrás ese mes disponible, pero al finalizar la suscripción se acabará la disponibilidad de la página web.',
  },
];

export const pricingFaq: FAQItem[] = [
  {
    question: '¿Hay algún coste oculto?',
    answer: 'No. Solo pagas por lo que ves. El hosting y el dominio están incluidos en el precio del plan.',
  },
  {
    question: '¿Qué métodos de pago aceptáis?',
    answer: 'Aceptamos tarjetas (Visa, Mastercard, etc.) a través de Stripe y también PayPal.',
  },
  {
    question: '¿Puedo cancelar el plan mensual?',
    answer: 'Sí, puedes cancelar en cualquier momento. Si ese mes ya se ha pagado, no hay reembolsos, pero tendrás el servicio activo hasta que finalice el periodo contratado.',
  },
];

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s'-]{2,100}$/;
export const PHONE_REGEX = /^[\d\s\+\-\(\)]{9,20}$/;

const SQL_KEYWORDS = [
  '--', ';', "'", '"', 'xp_', 'UNION', 'SELECT', 'DROP',
  'INSERT', 'DELETE', 'UPDATE', 'OR 1=1', 'EXEC', 'CAST',
];

export function containsSqlInjection(input: string): boolean {
  const upper = input.toUpperCase();
  return SQL_KEYWORDS.some((kw) => upper.includes(kw.toUpperCase()));
}

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com',
  '10minutemail.com', 'yopmail.com', 'throwawaymail.com',
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}

export function validateContactForm(data: Record<string, string>) {
  const errors: Record<string, string> = {};

  const nombre = data.nombre?.trim() || '';
  const email = data.email?.trim() || '';
  const telefono = data.telefono?.trim() || '';
  const mensaje = data.mensaje?.trim() || '';

  if (!nombre || !NAME_REGEX.test(nombre)) {
    errors.nombre = 'Nombre inválido. Usa solo letras, espacios y apóstrofes (2-100 caracteres).';
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = 'Correo electrónico inválido.';
  } else if (isDisposableEmail(email)) {
    errors.email = 'No se permiten correos temporales.';
  }
  if (telefono && !PHONE_REGEX.test(telefono)) {
    errors.telefono = 'Teléfono inválido.';
  }
  if (!mensaje || mensaje.length < 10) {
    errors.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
  }
  if (mensaje.length > 2000) {
    errors.mensaje = 'El mensaje no puede superar 2000 caracteres.';
  }

  // Security check
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' && containsSqlInjection(value)) {
      errors[key] = 'Contenido no permitido detectado.';
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

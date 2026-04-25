import type { APIRoute } from 'astro';
import { sanitizeInput } from '../../utils/sanitize';
import { EMAIL_REGEX, isDisposableEmail } from '../../utils/validation';
import { checkRateLimit } from '../../utils/rateLimit';

export const prerender = false;

/**
 * Security helper: JSON response with security headers applied.
 */
function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Access-Control-Allow-Origin': 'https://swiftsides.es',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    },
  });
}

/**
 * Extracts the client IP from common proxy headers.
 */
function getClientIp(request: Request): string {
  const xfwd = request.headers.get('x-forwarded-for');
  if (xfwd) return xfwd.split(',')[0].trim();
  const xri = request.headers.get('x-real-ip');
  if (xri) return xri.trim();
  return 'unknown';
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // ============================================================
    // Security: validate Content-Type to ensure form data
    // ============================================================
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data') && !contentType.includes('application/x-www-form-urlencoded')) {
      return jsonResponse({ success: false, message: 'Tipo de contenido no válido.' }, 415);
    }

    // ============================================================
    // Security: rate limit by IP to prevent brute-force / abuse
    // ============================================================
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp, 3, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return jsonResponse(
        { success: false, message: 'Demasiadas solicitudes. Inténtalo más tarde.' },
        429
      );
    }

    // ============================================================
    // Security: read form data
    // ============================================================
    const formData = await request.formData();
    const rawEmail = formData.get('email');

    // ============================================================
    // Security: sanitize input to prevent XSS and injection
    // ============================================================
    const email = sanitizeInput(rawEmail ? String(rawEmail) : '').trim();

    // ============================================================
    // Security: validate maximum length (RFC 5321)
    // ============================================================
    if (email.length > 254) {
      return jsonResponse(
        { success: false, message: 'El correo es demasiado largo.' },
        400
      );
    }

    // ============================================================
    // Security: validate email format with strict regex
    // ============================================================
    if (!EMAIL_REGEX.test(email)) {
      return jsonResponse(
        { success: false, message: 'Correo electrónico inválido.' },
        400
      );
    }

    // ============================================================
    // Security: reject disposable / temporary email domains
    // ============================================================
    if (isDisposableEmail(email)) {
      return jsonResponse(
        { success: false, message: 'No se permiten correos temporales.' },
        400
      );
    }

    // TODO: persist email to newsletter provider or database
    return jsonResponse({ success: true }, 200);
  } catch (err) {
    console.error('Newsletter API error:', err);
    return jsonResponse(
      { success: false, message: 'Error interno del servidor.' },
      500
    );
  }
};

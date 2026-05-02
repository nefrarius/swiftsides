import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { sanitizeInput } from '../../utils/sanitize';
import { validateContactForm, containsSqlInjection } from '../../utils/validation';
import { checkRateLimit } from '../../utils/rateLimit';
import { validateCsrfToken } from '../../utils/csrf';

export const prerender = false;

/**
 * Security helper: JSON response with security headers applied.
 * Prevents MIME-type sniffing and adds CORS restrictions.
 */
function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Restrict CORS to same-origin only for API endpoints
      'Access-Control-Allow-Origin': 'https://swiftsite.es',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    },
  });
}

/**
 * Extracts the client IP from common proxy headers.
 * Falls back to 'unknown' if none are present.
 */
function getClientIp(request: Request): string {
  const xfwd = request.headers.get('x-forwarded-for');
  if (xfwd) return xfwd.split(',')[0].trim();
  const xri = request.headers.get('x-real-ip');
  if (xri) return xri.trim();
  return 'unknown';
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // ============================================================
    // Security: validate Content-Type to ensure form data
    // ============================================================
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data') && !contentType.includes('application/x-www-form-urlencoded')) {
      return jsonResponse({ success: false, message: 'Tipo de contenido no válido.' }, 415);
    }

    // ============================================================
    // Security step a) Rate limiting: max 3 requests per 15 min by IP
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
    // Security step b) Read form data from the request body
    // ============================================================
    const formData = await request.formData();

    // ============================================================
    // Security step c) Honeypot check: hidden field "website"
    // Bots usually fill it; humans don't. Return fake 200 success
    // to avoid revealing the trap.
    // ============================================================
    const honeypot = formData.get('website');
    if (honeypot && String(honeypot).trim() !== '') {
      return jsonResponse({ success: true }, 200);
    }

    // ============================================================
    // Security step d) CSRF validation: compare form token with
    // the token stored in the httpOnly/sameSite cookie.
    // ============================================================
    const csrfToken = formData.get('csrf_token');
    const cookieToken = cookies.get('csrf_token')?.value;
    if (!csrfToken || !cookieToken || !validateCsrfToken(String(csrfToken), cookieToken)) {
      return jsonResponse(
        { success: false, message: 'Token de seguridad inválido.' },
        403
      );
    }

    // Extract raw values before sanitization
    const rawNombre = formData.get('nombre');
    const rawEmail = formData.get('email');
    const rawTelefono = formData.get('telefono');
    const rawTipo = formData.get('tipo_negocio');
    const rawPlan = formData.get('plan_interes');
    const rawMensaje = formData.get('mensaje');
    const rawRgpd = formData.get('rgpd');

    // ============================================================
    // Security step e) Sanitize ALL fields with sanitizeInput
    // Strips HTML tags and null bytes to prevent XSS/injection.
    // ============================================================
    const nombre = sanitizeInput(rawNombre ? String(rawNombre) : '');
    const email = sanitizeInput(rawEmail ? String(rawEmail) : '');
    const telefono = sanitizeInput(rawTelefono ? String(rawTelefono) : '');
    const tipoNegocio = sanitizeInput(rawTipo ? String(rawTipo) : '');
    const planInteres = sanitizeInput(rawPlan ? String(rawPlan) : '');
    const mensaje = sanitizeInput(rawMensaje ? String(rawMensaje) : '');
    const rgpd = rawRgpd ? String(rawRgpd) : '';

    // ============================================================
    // Security step f) Validate field lengths before regex checks
    // ============================================================
    if (nombre.length > 100) {
      return jsonResponse(
        { success: false, errors: { nombre: 'El nombre no puede superar los 100 caracteres.' } },
        400
      );
    }
    if (email.length > 254) {
      return jsonResponse(
        { success: false, errors: { email: 'El correo no puede superar los 254 caracteres.' } },
        400
      );
    }
    if (mensaje.length > 2000) {
      return jsonResponse(
        { success: false, errors: { mensaje: 'El mensaje no puede superar los 2000 caracteres.' } },
        400
      );
    }

    // ============================================================
    // Security step g) Run validateContactForm().
    // Rejects invalid formats, disposable emails, short messages.
    // ============================================================
    const data = { nombre, email, telefono, mensaje };
    const validation = validateContactForm(data);
    if (!validation.valid) {
      return jsonResponse(
        { success: false, errors: validation.errors },
        400
      );
    }

    // ============================================================
    // Security step h) Explicit SQL injection check on each field.
    // Reject immediately if any field contains SQL keywords.
    // ============================================================
    const fieldsToCheck = [nombre, email, telefono, tipoNegocio, planInteres, mensaje];
    for (const field of fieldsToCheck) {
      if (containsSqlInjection(field)) {
        return jsonResponse(
          { success: false, message: 'Contenido no permitido detectado.' },
          400
        );
      }
    }

    // RGPD consent is mandatory
    if (rgpd !== 'on' && rgpd !== 'true') {
      return jsonResponse(
        { success: false, errors: { rgpd: 'Debes aceptar la política de privacidad.' } },
        400
      );
    }

    // ============================================================
    // Security step i) Verify reCAPTCHA v3 token with Google.
    // Reject if score is below 0.5 (high bot probability).
    // ============================================================
    const recaptchaToken = formData.get('recaptcha_token');
    const secretKey = import.meta.env.RECAPTCHA_SECRET_KEY || '';

    if (secretKey) {
      if (!recaptchaToken) {
        return jsonResponse(
          { success: false, message: 'Verificación de seguridad requerida.' },
          400
        );
      }

      const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
      const verifyBody = new URLSearchParams();
      verifyBody.append('secret', secretKey);
      verifyBody.append('response', String(recaptchaToken));
      verifyBody.append('remoteip', clientIp);

      const recaptchaRes = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: verifyBody.toString(),
      });

      const recaptchaData = await recaptchaRes.json();
      if (!recaptchaData.success || (typeof recaptchaData.score === 'number' && recaptchaData.score < 0.5)) {
        return jsonResponse(
          { success: false, message: 'Verificación de seguridad fallida.' },
          400
        );
      }
    } else if (import.meta.env.PROD) {
      // In production, a missing secret is a configuration error.
      return jsonResponse(
        { success: false, message: 'Configuración de seguridad incompleta.' },
        500
      );
    }

    // ============================================================
    // Send email via SMTP (Resend)
    // ============================================================
    const smtpHost = import.meta.env.SMTP_HOST || 'smtp.resend.com';
    const smtpPort = Number(import.meta.env.SMTP_PORT || 587);
    const smtpUser = import.meta.env.SMTP_USER || 'resend';
    const smtpPass = import.meta.env.SMTP_PASS || '';
    const contactEmailTo = import.meta.env.CONTACT_EMAIL_TO || '';

    if (!smtpPass || !contactEmailTo) {
      return jsonResponse(
        { success: false, message: 'Configuración de email incompleta.' },
        500
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = `Nuevo mensaje de contacto de ${nombre}`;
    const textBody = `Has recibido un nuevo mensaje desde el formulario de contacto:

Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono || 'No proporcionado'}
Tipo de negocio: ${tipoNegocio || 'No especificado'}
Plan de interés: ${planInteres || 'No especificado'}
Mensaje:
${mensaje}
`;

    const htmlBody = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
      <p><strong>Tipo de negocio:</strong> ${tipoNegocio || 'No especificado'}</p>
      <p><strong>Plan de interés:</strong> ${planInteres || 'No especificado'}</p>
      <hr/>
      <p><strong>Mensaje:</strong></p>
      <p style="white-space:pre-line">${mensaje}</p>
    `;

    try {
      await transporter.sendMail({
        from: `"SwiftSite Contacto" <${contactEmailTo}>`,
        to: contactEmailTo,
        replyTo: email,
        subject,
        text: textBody,
        html: htmlBody,
      });
    } catch (mailErr) {
      console.error('Error sending email:', mailErr);
      return jsonResponse(
        { success: false, message: 'No se pudo enviar el mensaje. Inténtalo más tarde.' },
        500
      );
    }

    return jsonResponse({ success: true }, 200);
  } catch (err) {
    // Log securely without leaking stack traces to the client.
    console.error('Contact API error:', err);
    return jsonResponse(
      { success: false, message: 'Error interno del servidor.' },
      500
    );
  }
};

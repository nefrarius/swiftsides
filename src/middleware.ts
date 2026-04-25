import { defineMiddleware } from 'astro:middleware';

function generateNonce() {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
}

export const onRequest = defineMiddleware(async (context, next) => {
  const nonce = generateNonce();
  context.locals.nonce = nonce;

  const response = await next();

  // Security headers
  const headers = new Headers(response.headers);
  headers.set('Content-Security-Policy',
    `default-src 'self'; ` +
    `script-src 'self' 'nonce-${nonce}' https://www.google.com https://www.gstatic.com; ` +
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; ` +
    `img-src 'self' data: https: blob:; ` +
    `font-src 'self' https://fonts.gstatic.com; ` +
    `connect-src 'self' https://www.google.com https://api.stripe.com; ` +
    `frame-src https://www.google.com https://js.stripe.com; ` +
    `base-uri 'self'; ` +
    `form-action 'self';`
  );
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});

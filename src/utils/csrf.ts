import { randomBytes } from 'crypto';

export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex');
}

export function validateCsrfToken(token: string, cookieToken: string): boolean {
  if (!token || !cookieToken) return false;
  // Timing-safe comparison to prevent timing attacks
  if (token.length !== cookieToken.length) return false;
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ cookieToken.charCodeAt(i);
  }
  return result === 0;
}

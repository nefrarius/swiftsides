import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  // Remove null bytes
  const cleaned = input.replace(/\x00/g, '');
  return DOMPurify.sanitize(cleaned, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') return '';
  const cleaned = input.replace(/\x00/g, '');
  return DOMPurify.sanitize(cleaned, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title'],
  });
}

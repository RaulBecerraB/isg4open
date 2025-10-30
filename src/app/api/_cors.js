// CORS and IP allowlist helper
const ALLOWED = (process.env.ALLOWED_IPS || '').split(',').map(s => s.trim()).filter(Boolean);

export function buildCorsHeaders(originAllowed = '*') {
  return {
    'Access-Control-Allow-Origin': originAllowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export function isIpAllowed(req) {
  if (ALLOWED.length === 0) return true; // no restriction
  // Try common headers that carry the client IP behind proxies
  const xfwd = req.headers.get('x-forwarded-for') || '';
  const remote = req.headers.get('x-real-ip') || '';
  const candidates = xfwd.split(',').map(s => s.trim()).concat(remote).filter(Boolean);
  for (const c of candidates) {
    if (ALLOWED.includes(c)) return true;
  }
  // If no header given, deny by default
  return false;
}

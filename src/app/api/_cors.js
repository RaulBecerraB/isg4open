// CORS and IP allowlist helper
// Use a single allowed IP taken from ALLOWED_IPS (first entry)
export const ALLOWED_IP = ((process.env.ALLOWED_IPS || '').split(',').map(function (s) { return s.trim(); }).filter(function (b) { return Boolean(b); })[0]) || '';

export function getClientIp(req) {
  if (!req || !req.headers) return '';
  var xfwd = req.headers.get('x-forwarded-for') || '';
  var remote = req.headers.get('x-real-ip') || '';
  var parts = xfwd.split(',').map(function (s) { return s.trim(); }).filter(function (b) { return Boolean(b); });
  if (remote) parts.push(remote);
  if (parts.length === 0) return '';
  // return the first candidate
  return parts[0];
}

export function buildCorsHeaders(req) {
  // Do not use wildcard. Only echo the incoming Origin header when the client IP is exactly in ALLOWED.
  var origin = '';
  if (req && req.headers) {
    origin = req.headers.get('origin') || '';
  }
  var headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  var clientIp = getClientIp(req);
  if (origin && clientIp && clientIp === ALLOWED_IP) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

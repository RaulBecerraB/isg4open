import { toggleState } from '../state';
import { isValidBasic } from '../_auth';
import { buildCorsHeaders, ALLOWED_IP, getClientIp } from '../_cors';

export async function OPTIONS(req) {
  return new Response(null, { status: 204, headers: buildCorsHeaders(req) });
}

export async function GET(req) {
  // IP allowlist - strict check (todo o nada)
  var clientIp = getClientIp(req);
  if (clientIp !== ALLOWED_IP) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { ...buildCorsHeaders(req), 'Content-Type': 'application/json' } });
  }

  // Basic auth required to toggle
  const auth = req.headers.get('authorization');
  if (!isValidBasic(auth)) {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...buildCorsHeaders(req), 'Content-Type': 'application/json' } });
  }

  const result = toggleState();
  return new Response(JSON.stringify(result), {
    status: 200,
  headers: { ...buildCorsHeaders(req), 'Content-Type': 'application/json' },
  });
}

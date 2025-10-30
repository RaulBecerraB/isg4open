import { getState } from '../state';
import { buildCorsHeaders, ALLOWED_IP, getClientIp } from '../_cors';

export async function OPTIONS(req) {
  return new Response(null, { status: 204, headers: buildCorsHeaders(req) });
}

export async function GET(req) {
  var clientIp = getClientIp(req);
  if (clientIp !== ALLOWED_IP) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { ...buildCorsHeaders(req), 'Content-Type': 'application/json' } });
  }

  const result = getState();
  return new Response(JSON.stringify(result), {
    status: 200,
  headers: { ...buildCorsHeaders(req), 'Content-Type': 'application/json' },
  });
}

import { getState } from '../state';
import { buildCorsHeaders, isIpAllowed } from '../_cors';

export async function OPTIONS(req) {
  return new Response(null, { status: 204, headers: buildCorsHeaders(req) });
}

export async function GET(req) {
  if (!isIpAllowed(req)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { ...buildCorsHeaders(req), 'Content-Type': 'application/json' } });
  }

  const result = getState();
  return new Response(JSON.stringify(result), {
    status: 200,
  headers: { ...buildCorsHeaders(req), 'Content-Type': 'application/json' },
  });
}

import { toggleState } from '../state';
import { isValidBasic } from '../_auth';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(req) {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(req) {
  // Basic auth required to toggle
  const auth = req.headers.get('authorization');
  if (!isValidBasic(auth)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } });
  }

  const result = toggleState();
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

import { getState } from '../state';

export async function GET(req) {
  const result = getState();
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

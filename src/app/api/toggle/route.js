import { toggleState } from '../state';

export async function GET(req) {
  const result = toggleState();
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

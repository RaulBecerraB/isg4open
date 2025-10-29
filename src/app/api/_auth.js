// Basic auth helper using module-level variables (no DB)
// Set AUTH_USER and AUTH_PASS here to secure the toggle endpoint.

export const AUTH_USER = process.env.G4_AUTH_USER;
export const AUTH_PASS = process.env.G4_AUTH_PASS;

export function parseBasicAuth(header) {
  if (!header) return null;
  const m = header.match(/^Basic\s+(.+)$/i);
  if (!m) return null;
  try {
    const decoded = Buffer.from(m[1], 'base64').toString('utf8');
    const idx = decoded.indexOf(':');
    if (idx === -1) return null;
    return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
  } catch (e) {
    return null;
  }
}

export function isValidBasic(header) {
  const creds = parseBasicAuth(header);
  if (!creds) return false;
  return creds.user === AUTH_USER && creds.pass === AUTH_PASS;
}

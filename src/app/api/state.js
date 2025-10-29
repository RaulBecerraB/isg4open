// Shared in-memory state for the G4 status.
// This module lives in the server environment and persists across lambda warm calls
// while the Vercel instance is warm. It's intentionally simple and uses no DB.

let isOpen = false;

// Return a frozen object so callers cannot mutate the returned `result`.
export function getState() {
  return Object.freeze({ isOpen });
}

export function toggleState() {
  isOpen = !isOpen;
  return Object.freeze({ isOpen });
}

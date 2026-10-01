/**
 * Picks a random item id from a pool while avoiding recently practised ones.
 * Recent history persists in localStorage per practice key, so returning later
 * does not restart from the same sentences.
 */
const KEY = (k: string) => `practice-recent:${k}`;

function loadRecent(k: string): string[] {
  try { const v = JSON.parse(localStorage.getItem(KEY(k)) || "[]"); return Array.isArray(v) ? v : []; } catch { return []; }
}

export function markPracticed(k: string, id: string, cap = 200) {
  try {
    const r = loadRecent(k).filter((x) => x !== id);
    r.push(id);
    localStorage.setItem(KEY(k), JSON.stringify(r.slice(-cap)));
  } catch { /* ignore */ }
}

/** Returns an index into `ids`, preferring items not seen recently (and never `currentId` when possible). */
export function pickRandomIndex(k: string, ids: string[], currentId?: string): number {
  if (!ids.length) return 0;
  if (ids.length === 1) return 0;
  const recent = loadRecent(k);
  const window = Math.min(recent.length, Math.max(0, ids.length - 1));
  const avoid = new Set(recent.slice(-window));
  if (currentId) avoid.add(currentId);
  let pool = ids.map((id, i) => ({ id, i })).filter((x) => !avoid.has(x.id));
  if (!pool.length) pool = ids.map((id, i) => ({ id, i })).filter((x) => x.id !== currentId);
  return pool[Math.floor(Math.random() * pool.length)].i;
}

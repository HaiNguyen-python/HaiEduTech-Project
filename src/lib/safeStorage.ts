/**
 * @file safeStorage.ts
 * @description Namespaced localStorage wrapper that refuses to persist obvious PII
 * (email, phone, JWT-shaped tokens) in cleartext. Use this for any user-generated
 * cache; framework-managed keys (e.g. the Supabase auth session) are exempt.
 */

const NS = "het:";

const PII_PATTERNS: RegExp[] = [
  // Email address anywhere in the value
  /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
  // Vietnamese / international phone (7+ consecutive digits, +country prefix ok)
  /(?:\+?\d[\s-]?){7,}/,
  // JWT-shaped token (three base64 segments)
  /\beyJ[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\b/,
];

const looksLikePII = (value: string) => PII_PATTERNS.some((rx) => rx.test(value));

const key = (k: string) => (k.startsWith(NS) ? k : NS + k);

export const safeStorage = {
  get<T = unknown>(k: string, fallback: T | null = null): T | null {
    try {
      const raw = localStorage.getItem(key(k));
      if (raw == null) return fallback;
      try { return JSON.parse(raw) as T; } catch { return raw as unknown as T; }
    } catch {
      return fallback;
    }
  },
  set(k: string, value: unknown): boolean {
    try {
      const serialized = typeof value === "string" ? value : JSON.stringify(value);
      if (looksLikePII(serialized)) {
        if (import.meta.env.DEV) {
          console.warn(`[safeStorage] Refused to persist PII-like value for key "${k}"`);
        }
        return false;
      }
      localStorage.setItem(key(k), serialized);
      return true;
    } catch {
      return false;
    }
  },
  remove(k: string) {
    try { localStorage.removeItem(key(k)); } catch { /* noop */ }
  },
};

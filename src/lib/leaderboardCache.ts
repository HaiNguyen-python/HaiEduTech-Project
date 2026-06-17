/**
 * Shared cache + in-flight dedup for leaderboard RPCs.
 *
 * Why: multiple leaderboard components mount on the same page (mobile + desktop
 * variants, overall + per-subject, etc). Without this layer, each one:
 *  - calls supabase.auth.getUser() (network round-trip)
 *  - fires the same RPC in parallel
 *  - opens its own realtime channel
 * That stacks to several seconds of "Loading..." even when the underlying
 * query is sub-millisecond.
 *
 * This module:
 *  - caches RPC results in memory + sessionStorage for `ttlMs`
 *  - shares one in-flight Promise per key so duplicate components piggy-back
 *  - serves cached data instantly while revalidating in background
 *  - shares one realtime channel per table among subscribers
 */
import { supabase } from "@/integrations/supabase/client";

type Fetcher<T> = () => Promise<T>;

interface CacheEntry<T> {
  data: T;
  ts: number;
}

const memCache = new Map<string, CacheEntry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

const SS_PREFIX = "lb-cache:";

function readSession<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = sessionStorage.getItem(SS_PREFIX + key);
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry<T>;
  } catch { return null; }
}

function writeSession<T>(key: string, entry: CacheEntry<T>) {
  try { sessionStorage.setItem(SS_PREFIX + key, JSON.stringify(entry)); } catch { /* noop */ }
}

export function getCached<T>(key: string, maxAgeMs: number): T | null {
  const mem = memCache.get(key) as CacheEntry<T> | undefined;
  const entry = mem || readSession<T>(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > maxAgeMs) return null;
  if (!mem) memCache.set(key, entry);
  return entry.data;
}

export async function fetchWithCache<T>(
  key: string,
  fetcher: Fetcher<T>,
  opts: { ttlMs?: number; timeoutMs?: number } = {},
): Promise<T> {
  const { timeoutMs = 9000 } = opts;
  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) return existing;

  const p = (async () => {
    const result = await Promise.race<T>([
      fetcher(),
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), timeoutMs)),
    ]);
    const entry: CacheEntry<T> = { data: result, ts: Date.now() };
    memCache.set(key, entry);
    writeSession(key, entry);
    return result;
  })().finally(() => { inflight.delete(key); });

  inflight.set(key, p);
  return p;
}

export function invalidateCache(keyPrefix?: string) {
  if (!keyPrefix) {
    memCache.clear();
    try {
      const toDel: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const k = sessionStorage.key(i);
        if (k && k.startsWith(SS_PREFIX)) toDel.push(k);
      }
      toDel.forEach(k => sessionStorage.removeItem(k));
    } catch { /* noop */ }
    return;
  }
  for (const k of [...memCache.keys()]) if (k.startsWith(keyPrefix)) memCache.delete(k);
  try {
    const toDel: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      if (k && k.startsWith(SS_PREFIX + keyPrefix)) toDel.push(k);
    }
    toDel.forEach(k => sessionStorage.removeItem(k));
  } catch { /* noop */ }
}

/**
 * Cached current-user lookup. Uses getSession() (local-only, no network)
 * and memoises for the page lifetime.
 */
let cachedUserIdPromise: Promise<string | null> | null = null;
export function getCurrentUserId(): Promise<string | null> {
  if (cachedUserIdPromise) return cachedUserIdPromise;
  cachedUserIdPromise = supabase.auth.getSession().then(
    ({ data }) => data.session?.user?.id || null,
  ).catch(() => null);
  // Reset when auth state changes so a fresh sign-in is picked up.
  supabase.auth.onAuthStateChange(() => { cachedUserIdPromise = null; });
  return cachedUserIdPromise;
}

/**
 * Shared realtime subscription per (table, filter). Returns an unsubscribe fn.
 */
type ChannelKey = string;
interface SharedChannel {
  channel: ReturnType<typeof supabase.channel>;
  listeners: Set<() => void>;
}
const sharedChannels = new Map<ChannelKey, SharedChannel>();

export function subscribeTable(
  table: string,
  filter: string | undefined,
  onChange: () => void,
): () => void {
  const key = `${table}::${filter || "*"}`;
  let entry = sharedChannels.get(key);
  if (!entry) {
    const ch = supabase
      .channel(`shared-${key}`)
      .on(
        "postgres_changes" as any,
        { event: "*", schema: "public", table, ...(filter ? { filter } : {}) } as any,
        () => { entry?.listeners.forEach(fn => { try { fn(); } catch { /* noop */ } }); },
      )
      .subscribe();
    entry = { channel: ch, listeners: new Set() };
    sharedChannels.set(key, entry);
  }
  entry.listeners.add(onChange);
  return () => {
    const e = sharedChannels.get(key);
    if (!e) return;
    e.listeners.delete(onChange);
    if (e.listeners.size === 0) {
      supabase.removeChannel(e.channel);
      sharedChannels.delete(key);
    }
  };
}

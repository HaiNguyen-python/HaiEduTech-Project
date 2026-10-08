import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "./useUserRole";
import { setPremiumCache } from "@/lib/aiQuota";

export const PREMIUM_CHANGED_EVENT = "haiedutech:premium-changed";
export const OPEN_UPGRADE_EVENT = "haiedutech:open-upgrade";
/** Number of lessons per course that every signed-in learner can open for free. */
export const FREE_LESSONS = 0;

export const openUpgradeModal = () => window.dispatchEvent(new Event(OPEN_UPGRADE_EVENT));

export interface PremiumState {
  status: string | null;
  source: string | null;
  expiresAt: string | null;
}

const EMPTY: PremiumState = { status: null, source: null, expiresAt: null };
const storageKey = (uid: string) => `haiedutech:premium:${uid}`;

// Shared across every usePremium() instance so pages never re-fetch or flash
// the lock screen while a slow request is in flight.
const memCache = new Map<string, PremiumState>();
const inflight = new Map<string, Promise<PremiumState | null>>();

const readCached = (uid: string): PremiumState | null => {
  const m = memCache.get(uid);
  if (m) return m;
  try {
    const raw = localStorage.getItem(storageKey(uid));
    if (raw) {
      const s = JSON.parse(raw) as PremiumState;
      memCache.set(uid, s);
      return s;
    }
  } catch { /* ignore */ }
  return null;
};

const writeCached = (uid: string, s: PremiumState) => {
  memCache.set(uid, s);
  try { localStorage.setItem(storageKey(uid), JSON.stringify(s)); } catch { /* ignore */ }
};

const fetchOnce = async (uid: string): Promise<PremiumState | null> => {
  const { data, error } = await supabase
    .from("user_subscriptions")
    .select("status, source, expires_at")
    .eq("user_id", uid)
    .order("expires_at", { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return { status: data?.status ?? null, source: data?.source ?? null, expiresAt: data?.expires_at ?? null };
};

/** Fetch with timeout + one retry. Returns null when the server could not be reached. */
const fetchPremium = (uid: string, force = false): Promise<PremiumState | null> => {
  const existing = inflight.get(uid);
  if (existing && !force) return existing;
  const p = (async () => {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await Promise.race([
          fetchOnce(uid),
          new Promise<"timeout">((r) => setTimeout(() => r("timeout"), 7000)),
        ]);
        if (res !== "timeout") { writeCached(uid, res); return res; }
      } catch { /* retry */ }
    }
    return null;
  })().finally(() => inflight.delete(uid));
  inflight.set(uid, p);
  return p;
};

export const isActivePremium = (s: PremiumState, now = new Date()) =>
  s.status === "active" && (!s.expiresAt || new Date(s.expiresAt) > now);

export const usePremium = () => {
  const { user, isTeacher, isAdmin, isAssistant, loading: roleLoading } = useUserRole();
  const uid: string | null = user?.id ?? null;
  const [state, setState] = useState<PremiumState>(() => (uid && readCached(uid)) || EMPTY);
  const [loading, setLoading] = useState(() => !(uid && readCached(uid)));

  const load = useCallback(async (force = false) => {
    if (!uid) { setState(EMPTY); setLoading(false); return; }
    const cached = readCached(uid);
    if (cached) { setState(cached); setLoading(false); }
    const fresh = await fetchPremium(uid, force);
    if (fresh) setState(fresh);
    setLoading(false);
  }, [uid]);

  useEffect(() => {
    if (roleLoading) return;
    load();
    const h = () => load(true);
    window.addEventListener(PREMIUM_CHANGED_EVENT, h);
    return () => window.removeEventListener(PREMIUM_CHANGED_EVENT, h);
  }, [load, roleLoading]);

  const isStaff = isTeacher || isAdmin || isAssistant;
  const isPremium = isStaff || isActivePremium(state);
  const daysLeft = state.expiresAt ? Math.ceil((new Date(state.expiresAt).getTime() - Date.now()) / 86400000) : null;
  const cachedReady = !!uid && !!readCached(uid);

  useEffect(() => {
    if (!loading && !roleLoading) setPremiumCache(uid, isPremium);
  }, [uid, isPremium, loading, roleLoading]);

  return {
    user, isStaff, isPremium,
    // Cached Premium users skip the loading state entirely.
    loading: cachedReady && isPremium ? false : loading || roleLoading,
    ...state, daysLeft, refresh: () => load(true),
  };
};

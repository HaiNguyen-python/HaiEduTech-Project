/**
 * @file usePetXP.ts
 * @description Unified XP source for the AI Study Pet.
 *
 * Every learning action across the platform (vocab mastery, lectures, quizzes,
 * mock exams, speaking shadowing, writing submissions, AI Academy &
 * Programming progress…) should call `awardPetXP(amount, source, opts?)`.
 *
 * Storage:
 *   - localStorage["haiedu_pet_xp_v1"] = { xp, log: [{source, amount, ts}, …50] }
 *   - Supabase "user_pet_xp" (one row per user) — synced opportunistically
 *
 * Events:
 *   - "pet:xp"   detail: { amount, source, total }   -> HUD / toast listeners
 *   - "pet:star" (fired when opts.celebrate !== false) -> Pet celebrates 60s
 */
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const PET_XP_KEY = "haiedu_pet_xp_v1";
export const PET_XP_MIGRATED_KEY = "haiedu_pet_xp_migrated_v1";
export const PET_XP_EVENT = "pet:xp";

export type PetXPSource =
  | "vocab"
  | "lecture"
  | "quiz"
  | "exam"
  | "speaking"
  | "writing"
  | "ai-academy"
  | "programming"
  | "daily-quest"
  | "manual";

export interface PetXPLogEntry {
  source: string;
  amount: number;
  ts: number;
}

export interface PetXPState {
  xp: number;
  log: PetXPLogEntry[];
}

const defaultState = (): PetXPState => ({ xp: 0, log: [] });

const load = (): PetXPState => {
  try {
    const raw = localStorage.getItem(PET_XP_KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw) as PetXPState;
    if (!s || typeof s.xp !== "number") return defaultState();
    return { xp: Math.max(0, s.xp), log: Array.isArray(s.log) ? s.log.slice(0, 50) : [] };
  } catch {
    return defaultState();
  }
};

const write = (s: PetXPState) => {
  try { localStorage.setItem(PET_XP_KEY, JSON.stringify(s)); } catch { /* ignore */ }
};

/** One-time migration: seed from old AI Academy + Programming XP keys. */
export const migratePetXpFromLegacy = () => {
  try {
    if (localStorage.getItem(PET_XP_MIGRATED_KEY)) return;
    const readJsonXP = (key: string): number => {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return 0;
        const parsed = JSON.parse(raw);
        return typeof parsed?.xp === "number" ? parsed.xp : 0;
      } catch { return 0; }
    };
    const seed = readJsonXP("ai_academy_xp_v1") + readJsonXP("haiedu_programming_xp_v1");
    const existing = load();
    if (seed > existing.xp) {
      write({
        xp: seed,
        log: [{ source: "legacy-migration", amount: seed, ts: Date.now() }],
      });
    }
    localStorage.setItem(PET_XP_MIGRATED_KEY, "1");
  } catch { /* ignore */ }
};

/**
 * Push the *new local total* to the DB. We deliberately do NOT re-read DB and
 * add `delta` here — when many awards fire in quick succession (e.g. mastering
 * 10 vocab in a row), parallel "fetch-then-write" calls all see the same stale
 * DB row and race each other, leaving the DB far below local. Pushing the
 * authoritative local total + `greatest()` semantics keeps both sides
 * monotonic and stops the Pet level from visibly bouncing across sessions.
 */
const pushDbXP = async (newLocalTotal: number, source: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: existing } = await (supabase as any)
      .from("user_pet_xp")
      .select("total_xp")
      .eq("user_id", user.id)
      .maybeSingle();
    // Never let the DB total go backwards — take max(db, local).
    const finalTotal = Math.max(existing?.total_xp ?? 0, newLocalTotal);
    await (supabase as any)
      .from("user_pet_xp")
      .upsert(
        { user_id: user.id, total_xp: finalTotal, last_source: source, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );
  } catch { /* offline / not signed in */ }
};

export interface AwardPetXPOptions {
  /** Whether to fire `pet:star` to make the Pet celebrate (default: true) */
  celebrate?: boolean;
  /** Skip DB sync (e.g. when called rapidly in a loop) */
  skipDbSync?: boolean;
}

/**
 * Award XP to the Study Pet from any place in the app.
 * @returns the new total XP after the award.
 */
export const awardPetXP = (
  amount: number,
  source: PetXPSource | string,
  opts: AwardPetXPOptions = {}
): number => {
  if (!Number.isFinite(amount) || amount <= 0) return load().xp;
  const current = load();
  const next: PetXPState = {
    xp: current.xp + amount,
    log: [{ source, amount, ts: Date.now() }, ...current.log].slice(0, 50),
  };
  write(next);

  // Fire UI events
  try {
    window.dispatchEvent(
      new CustomEvent(PET_XP_EVENT, { detail: { amount, source, total: next.xp } })
    );
    if (opts.celebrate !== false) {
      window.dispatchEvent(new CustomEvent("pet:star"));
    }
  } catch { /* SSR-safe */ }

  // Async DB sync — push the new authoritative local total, not the delta.
  if (!opts.skipDbSync) {
    void pushDbXP(next.xp, source);
  }
  return next.xp;
};

/** Pull DB total once on sign-in and reconcile with local (take MAX). */
export const reconcilePetXpFromDb = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await (supabase as any)
      .from("user_pet_xp")
      .select("total_xp")
      .eq("user_id", user.id)
      .maybeSingle();
    const dbXp = data?.total_xp ?? 0;
    const local = load();
    const merged = Math.max(local.xp, dbXp);
    if (merged !== local.xp) {
      write({ ...local, xp: merged });
      window.dispatchEvent(new CustomEvent(PET_XP_EVENT, { detail: { amount: 0, source: "db-sync", total: merged } }));
    }
    if (merged > dbXp) {
      // Push local-only progress up
      await (supabase as any)
        .from("user_pet_xp")
        .upsert(
          { user_id: user.id, total_xp: merged, last_source: "client-merge", updated_at: new Date().toISOString() },
          { onConflict: "user_id" }
        );
    }
  } catch { /* ignore */ }
};

/** React hook returning the current total + a reactive log. */
export const usePetXP = () => {
  const [state, setState] = useState<PetXPState>(() => {
    migratePetXpFromLegacy();
    return load();
  });

  useEffect(() => {
    const refresh = () => setState(load());
    const onStorage = (e: StorageEvent) => { if (e.key === PET_XP_KEY) refresh(); };
    window.addEventListener(PET_XP_EVENT, refresh);
    window.addEventListener("storage", onStorage);
    // Reconcile with DB on mount + when auth changes
    void reconcilePetXpFromDb();
    const { data: sub } = supabase.auth.onAuthStateChange((e) => {
      if (e === "SIGNED_IN" || e === "TOKEN_REFRESHED") void reconcilePetXpFromDb();
    });
    return () => {
      window.removeEventListener(PET_XP_EVENT, refresh);
      window.removeEventListener("storage", onStorage);
      sub.subscription.unsubscribe();
    };
  }, []);

  return { xp: state.xp, log: state.log, awardPetXP };
};

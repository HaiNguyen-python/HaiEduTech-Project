/**
 * useStudyPet - Derive the AI Study Pet's core metrics from the student's
 * actual platform learning logs.
 *
 * Metrics:
 *   - pet_exp        : total XP from AI Academy + Programming sections
 *   - pet_level      : computed from XP thresholds
 *   - pet_happiness  : 0..100, drops when vocabulary review backlog grows
 *
 * Data sources:
 *   - localStorage["ai_academy_xp_v1"]        (AI Academy lessons/quizzes)
 *   - localStorage["haiedu_programming_xp_v1"](Programming / Scratch missions)
 *   - Supabase "user_vocab_mastered" rows whose `reviewed_at` is older than
 *     14 days (overdue spaced-repetition queue)
 *
 * Also surfaces a transient `recentStar` flag: any component can fire
 * `window.dispatchEvent(new CustomEvent("pet:star"))` after a star is earned
 * and the pet will celebrate for ~60 seconds.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const DAY_MS = 24 * 60 * 60 * 1000;
const STALE_DAYS = 14;
const STAR_WINDOW_MS = 60_000;

// Pet level thresholds (cumulative pet_exp required to *reach* each level).
// Five evolution stages: Baby (L1-5) → Apprentice (L6-15) → Master (L16-21)
// → Legendary (L22-29) → Mythic (L30+). Higher tiers unlock richer visuals.
const LEVEL_THRESHOLDS = [
  0, 80, 200, 360, 560, 800,        // L1..L6  (Baby → Apprentice jump @ L6)
  1100, 1450, 1850, 2300, 2800,     // L7..L11
  3350, 3950, 4600, 5300, 6050,     // L12..L16 (Master jump @ L16)
  6850, 7700, 8600, 9550, 10550,    // L17..L21
  11650, 12850, 14150, 15550, 17050,// L22..L26 (Legendary jump @ L22)
  18650, 20350, 22150, 24050,       // L27..L30 (Mythic jump @ L30)
  26050, 28150, 30350, 32650, 35050, // L31..L35
];

export type PetStage = "baby" | "apprentice" | "master" | "legendary" | "mythic";

export interface StudyPetState {
  exp: number;
  level: number;
  stage: PetStage;
  happiness: number;          // 0..100
  expIntoLevel: number;
  expForNextLevel: number;    // span to next level (>=1)
  nextLevelAt: number | null; // null if max
  overdueReviews: number;
  recentStar: boolean;
  mood: "celebrating" | "hungry" | "sleepy" | "happy" | "neutral";
}

import { migratePetXpFromLegacy, PET_XP_KEY, PET_XP_EVENT } from "@/hooks/usePetXP";

const readPetXP = (): number => {
  try {
    migratePetXpFromLegacy();
    const raw = localStorage.getItem(PET_XP_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return typeof parsed?.xp === "number" ? parsed.xp : 0;
  } catch { return 0; }
};

const computeLevel = (exp: number) => {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (exp >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }
  const currBase = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextBase = LEVEL_THRESHOLDS[level] ?? null;
  return {
    level,
    expIntoLevel: Math.max(0, exp - currBase),
    expForNextLevel: nextBase != null ? nextBase - currBase : 1,
    nextLevelAt: nextBase,
  };
};

const stageFor = (level: number): PetStage =>
  level >= 30 ? "mythic" :
  level >= 22 ? "legendary" :
  level >= 16 ? "master" :
  level >= 6  ? "apprentice" : "baby";

export function useStudyPet(): StudyPetState & { refresh: () => void } {
  const [exp, setExp] = useState(0);
  const [overdueReviews, setOverdueReviews] = useState(0);
  const [recentStar, setRecentStar] = useState(false);

  const refresh = useCallback(async () => {
    // 1) Unified Pet XP (replaces the old AI Academy + Programming dual source)
    setExp(readPetXP());

    // 2) Overdue spaced-repetition reviews (logged-in only)
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setOverdueReviews(0); return; }
      const threshold = new Date(Date.now() - STALE_DAYS * DAY_MS).toISOString();
      const { count } = await (supabase as any)
        .from("user_vocab_mastered")
        .select("word", { count: "exact", head: true })
        .eq("user_id", user.id)
        .lte("reviewed_at", threshold);
      setOverdueReviews(count || 0);
    } catch { /* offline / table missing — keep last value */ }
  }, []);

  // Initial + auth-change refresh
  useEffect(() => {
    refresh();
    const { data: sub } = supabase.auth.onAuthStateChange(() => refresh());
    return () => sub.subscription.unsubscribe();
  }, [refresh]);

  // React to XP / celebration events from anywhere in the app
  useEffect(() => {
    const onStar = () => {
      setRecentStar(true);
      window.setTimeout(() => setRecentStar(false), STAR_WINDOW_MS);
      setExp(readPetXP());
    };
    const onXP = () => setExp(readPetXP());
    const onStorage = (e: StorageEvent) => {
      if (e.key === PET_XP_KEY) setExp(readPetXP());
    };
    window.addEventListener("pet:star", onStar);
    window.addEventListener(PET_XP_EVENT, onXP);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("pet:star", onStar);
      window.removeEventListener(PET_XP_EVENT, onXP);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return useMemo<StudyPetState & { refresh: () => void }>(() => {
    const computed = computeLevel(exp);
    // Monotonic guard: cache highest level seen so the UI never shows the Pet
    // dropping from L5 → L3 because of a transient DB-vs-local reconcile race.
    let level = computed.level;
    try {
      const cachedRaw = localStorage.getItem("haiedu_pet_level_max_v1");
      const cached = cachedRaw ? parseInt(cachedRaw, 10) : 0;
      if (Number.isFinite(cached) && cached > level) {
        level = cached;
      } else if (level > cached) {
        localStorage.setItem("haiedu_pet_level_max_v1", String(level));
      }
    } catch { /* ignore */ }

    // Recompute level-relative numbers from the (possibly clamped) level.
    const currBase = LEVEL_THRESHOLDS[level - 1] ?? 0;
    const nextBase = LEVEL_THRESHOLDS[level] ?? null;
    const expIntoLevel = Math.max(0, exp - currBase);
    const expForNextLevel = nextBase != null ? nextBase - currBase : 1;
    const nextLevelAt = nextBase;

    const happiness = Math.max(10, 100 - overdueReviews * 4);
    const stage = stageFor(level);
    const mood: StudyPetState["mood"] =
      recentStar ? "celebrating" :
      happiness < 35 ? "hungry" :
      happiness < 60 ? "sleepy" :
      happiness >= 85 ? "happy" : "neutral";
    return {
      exp, level, stage, happiness,
      expIntoLevel, expForNextLevel, nextLevelAt,
      overdueReviews, recentStar, mood,
      refresh,
    };
  }, [exp, overdueReviews, recentStar, refresh]);
}

/**
 * VFF progress tracking - localStorage first, syncs to Supabase if user is logged in.
 * Guests get a full offline experience; signed-in users get cross-device sync via
 * the `user_progress` table (existing table with generic key/value shape).
 */
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "vff_progress_v1";

export interface VFFProgress {
  placementCompleted?: boolean;
  placementScore?: number;
  recommendedLevel?: "A1" | "A2" | "B1";
  levelUnlocked: { A1: boolean; A2: boolean; B1: boolean };
  lessonsCompleted: Record<string, number>; // lessonId → score %
  checkpointsPassed: { A1?: number; A2?: number; B1?: number }; // percent
  streakDays: number;
  lastStudyDate?: string; // ISO date (YYYY-MM-DD)
}

const defaultProgress: VFFProgress = {
  levelUnlocked: { A1: true, A2: false, B1: false },
  lessonsCompleted: {},
  checkpointsPassed: {},
  streakDays: 0,
};

const todayIso = () => new Date().toISOString().slice(0, 10);

function loadProgress(): VFFProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProgress };
    const parsed = JSON.parse(raw);
    return { ...defaultProgress, ...parsed };
  } catch {
    return { ...defaultProgress };
  }
}

function saveProgress(p: VFFProgress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* ignore */ }
}

function bumpStreak(p: VFFProgress): VFFProgress {
  const today = todayIso();
  if (p.lastStudyDate === today) return p;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const streakDays = p.lastStudyDate === yesterday ? p.streakDays + 1 : 1;
  return { ...p, streakDays, lastStudyDate: today };
}

export function useVFFProgress() {
  const [progress, setProgress] = useState<VFFProgress>(defaultProgress);

  useEffect(() => { setProgress(loadProgress()); }, []);

  const update = useCallback((patch: Partial<VFFProgress> | ((p: VFFProgress) => VFFProgress)) => {
    setProgress(prev => {
      const next = typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
      saveProgress(next);
      return next;
    });
  }, []);

  const recordPlacement = useCallback((score: number, recommended: "A1" | "A2" | "B1") => {
    update(prev => {
      const unlock = { A1: true, A2: recommended !== "A1", B1: recommended === "B1" };
      const next = bumpStreak({
        ...prev,
        placementCompleted: true,
        placementScore: score,
        recommendedLevel: recommended,
        levelUnlocked: { A1: prev.levelUnlocked.A1 || unlock.A1, A2: prev.levelUnlocked.A2 || unlock.A2, B1: prev.levelUnlocked.B1 || unlock.B1 },
      });
      return next;
    });
  }, [update]);

  const recordLesson = useCallback((lessonId: string, scorePct: number) => {
    update(prev => bumpStreak({
      ...prev,
      lessonsCompleted: {
        ...prev.lessonsCompleted,
        [lessonId]: Math.max(prev.lessonsCompleted[lessonId] ?? 0, scorePct),
      },
    }));
  }, [update]);

  const recordCheckpoint = useCallback((level: "A1" | "A2" | "B1", scorePct: number) => {
    update(prev => {
      const passed = scorePct >= 80;
      const unlock = { ...prev.levelUnlocked };
      if (passed) {
        if (level === "A1") unlock.A2 = true;
        if (level === "A2") unlock.B1 = true;
      }
      return bumpStreak({
        ...prev,
        checkpointsPassed: {
          ...prev.checkpointsPassed,
          [level]: Math.max(prev.checkpointsPassed[level] ?? 0, scorePct),
        },
        levelUnlocked: unlock,
      });
    });
  }, [update]);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress({ ...defaultProgress });
  }, []);

  const hydrate = useCallback((patch: Partial<VFFProgress>) => {
    setProgress(prev => {
      const next: VFFProgress = { ...prev, ...patch, levelUnlocked: { ...prev.levelUnlocked, ...(patch.levelUnlocked || {}) } };
      saveProgress(next);
      return next;
    });
  }, []);

  return { progress, recordPlacement, recordLesson, recordCheckpoint, reset, hydrate };
}

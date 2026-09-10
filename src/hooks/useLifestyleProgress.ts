/**
 * @file useLifestyleProgress.ts
 * @description Tracks Lifestyle Academy quiz results. Signed-in students sync
 *              with the backend table; guests fall back to localStorage.
 *              Exposes per-pillar scores for the soft-skills radar.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LIFESTYLE_LESSONS, type LifestylePillarKey } from "@/data/lifestyleAcademyLessons";
import { safeStorage } from "@/lib/safeStorage";
import { LIFESTYLE_QUIZ_PASS_RATIO } from "@/lib/lifestyleQuizBuilder";


const STORAGE_KEY = "lifestyle-quiz-progress-v1";

export interface LifestyleLessonResult {
  lessonId: string;
  pillar: LifestylePillarKey;
  score: number;
  maxScore: number;
  completed: boolean;
}

export interface PillarScore {
  pillar: LifestylePillarKey;
  total: number;
  completed: number;
  /** 0-100: coverage of the pillar weighted by quiz accuracy. */
  value: number;
}

type ResultMap = Record<string, LifestyleLessonResult>;

/** A lesson only counts as passed when at least 75% of the quiz is correct. */
export const isPassed = (r?: LifestyleLessonResult) =>
  !!r && r.maxScore > 0 && r.score / r.maxScore >= LIFESTYLE_QUIZ_PASS_RATIO;

/** Re-derives `completed` from the score so legacy rows cannot sneak through. */
const normalize = (r: LifestyleLessonResult): LifestyleLessonResult => ({
  ...r,
  completed: isPassed(r),
});

const normalizeMap = (map: ResultMap): ResultMap => {
  const out: ResultMap = {};
  Object.entries(map).forEach(([k, v]) => {
    if (v && typeof v.score === "number") out[k] = normalize(v);
  });
  return out;
};

function readLocal(): ResultMap {
  return normalizeMap(safeStorage.get<ResultMap>(STORAGE_KEY, {}) ?? {});
}

function writeLocal(map: ResultMap) {
  safeStorage.set(STORAGE_KEY, map);
}

export function useLifestyleProgress() {
  const [results, setResults] = useState<ResultMap>(() => readLocal());
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load session + remote rows once.
  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      const uid = data.session?.user?.id ?? null;
      if (!alive) return;
      setUserId(uid);
      if (!uid) {
        setLoading(false);
        return;
      }
      const { data: rows } = await supabase
        .from("lifestyle_lesson_progress")
        .select("lesson_id, pillar, score, max_score, completed")
        .eq("user_id", uid);
      if (!alive) return;
      const merged: ResultMap = { ...readLocal() };
      (rows ?? []).forEach((r) => {
        const remote = normalize({
          lessonId: r.lesson_id,
          pillar: r.pillar as LifestylePillarKey,
          score: r.score,
          maxScore: r.max_score,
          completed: r.completed,
        });
        const local = merged[r.lesson_id];
        // Keep whichever attempt scored higher.
        merged[r.lesson_id] = local && local.score > remote.score ? local : remote;
      });
      setResults(merged);
      writeLocal(merged);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const saveResult = useCallback(
    async (result: LifestyleLessonResult) => {
      const incoming = normalize(result);
      let best = incoming;
      setResults((prev) => {
        const existing = prev[incoming.lessonId];
        // Keep the best attempt so the radar never regresses on a retry.
        best = existing && existing.score > incoming.score ? existing : incoming;
        const next = { ...prev, [incoming.lessonId]: best };
        writeLocal(next);
        return next;
      });

      if (!userId) return;
      await supabase.from("lifestyle_lesson_progress").upsert(
        {
          user_id: userId,
          lesson_id: best.lessonId,
          pillar: best.pillar,
          score: best.score,
          max_score: best.maxScore,
          completed: best.completed,
        },
        { onConflict: "user_id,lesson_id" },
      );
    },
    [userId],
  );

  const pillarScores = useMemo<PillarScore[]>(() => {
    const pillars = Array.from(new Set(LIFESTYLE_LESSONS.map((l) => l.pillar)));
    return pillars.map((pillar) => {
      const lessons = LIFESTYLE_LESSONS.filter((l) => l.pillar === pillar);
      // Only lessons passed at 75%+ contribute to the radar.
      const passed = lessons.filter((l) => isPassed(results[l.id])).length;
      const value = lessons.length ? Math.round((passed / lessons.length) * 100) : 0;
      return { pillar, total: lessons.length, completed: passed, value };
    });
  }, [results]);

  const stats = useMemo(() => {
    const all = Object.values(results);
    const attempted = all.length;
    const passedResults = all.filter((r) => isPassed(r));
    const completed = passedResults.length;
    // Average quiz score across passed lessons only.
    const accuracy = completed
      ? Math.round(
          (passedResults.reduce((sum, r) => sum + (r.maxScore ? r.score / r.maxScore : 0), 0) /
            completed) *
            100,
        )
      : 0;
    return { attempted, completed, accuracy, totalLessons: LIFESTYLE_LESSONS.length };
  }, [results]);

  return { results, pillarScores, stats, saveResult, loading, isGuest: !userId };
}


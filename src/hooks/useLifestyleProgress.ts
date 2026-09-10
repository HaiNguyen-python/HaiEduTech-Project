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
import { safeGetItem, safeSetItem } from "@/lib/safeStorage";

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

function readLocal(): ResultMap {
  try {
    const raw = safeGetItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ResultMap) : {};
  } catch {
    return {};
  }
}

function writeLocal(map: ResultMap) {
  safeSetItem(STORAGE_KEY, JSON.stringify(map));
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
        merged[r.lesson_id] = {
          lessonId: r.lesson_id,
          pillar: r.pillar as LifestylePillarKey,
          score: r.score,
          maxScore: r.max_score,
          completed: r.completed,
        };
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
      setResults((prev) => {
        const existing = prev[result.lessonId];
        // Keep the best attempt so the radar never regresses on a retry.
        const best =
          existing && existing.score > result.score
            ? existing
            : result;
        const next = { ...prev, [result.lessonId]: { ...best, completed: best.completed || result.completed } };
        writeLocal(next);
        return next;
      });

      if (!userId) return;
      await supabase.from("lifestyle_lesson_progress").upsert(
        {
          user_id: userId,
          lesson_id: result.lessonId,
          pillar: result.pillar,
          score: result.score,
          max_score: result.maxScore,
          completed: result.completed,
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
      let accuracySum = 0;
      let completed = 0;
      lessons.forEach((l) => {
        const r = results[l.id];
        if (!r) return;
        if (r.completed) completed += 1;
        accuracySum += r.maxScore > 0 ? r.score / r.maxScore : 0;
      });
      const value = lessons.length ? Math.round((accuracySum / lessons.length) * 100) : 0;
      return { pillar, total: lessons.length, completed, value };
    });
  }, [results]);

  const stats = useMemo(() => {
    const all = Object.values(results);
    const attempted = all.length;
    const completed = all.filter((r) => r.completed).length;
    const accuracy = attempted
      ? Math.round(
          (all.reduce((sum, r) => sum + (r.maxScore ? r.score / r.maxScore : 0), 0) / attempted) * 100,
        )
      : 0;
    return { attempted, completed, accuracy, totalLessons: LIFESTYLE_LESSONS.length };
  }, [results]);

  return { results, pillarScores, stats, saveResult, loading, isGuest: !userId };
}

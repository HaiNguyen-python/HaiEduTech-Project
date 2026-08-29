/**
 * @file useLearningPath.ts
 * @description Reads and writes personalized learning paths and their weekly
 *   steps. Guests keep their answers in localStorage and they are pushed to the
 *   cloud on the first sign-in.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SUBJECTS, type SubjectId } from "@/lib/personalization/subjectRegistry";
import {
  buildWeeklyPlan, currentWeekStart, estimateReadiness, inferLevel,
  masteryPct, progressPerWeek, rankWeaknesses, type PlanStep,
} from "@/lib/personalization/pathModel";
import { useLearningSignals } from "./useLearningSignals";

const GUEST_KEY = "haiedu-learning-paths-v1";

export interface LearningPathRow {
  id?: string;
  subject: SubjectId;
  goal_label: string | null;
  target_level: string | null;
  target_date: string | null;
  hours_per_week: number;
  available_days: string[];
  start_level: string | null;
  current_level: string | null;
  status: string;
}

export interface PathView {
  path: LearningPathRow;
  currentLevel: string;
  masteryPct: number;
  pacePerWeek: number;
  readiness: ReturnType<typeof estimateReadiness>;
  weaknesses: ReturnType<typeof rankWeaknesses>;
  plan: PlanStep[];
  vocabMastered: number;
  minutesLast7: number;
  activeDays30: number;
  dueReviews: number;
}

const readGuest = (): LearningPathRow[] => {
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    return raw ? (JSON.parse(raw) as LearningPathRow[]) : [];
  } catch {
    return [];
  }
};
const writeGuest = (rows: LearningPathRow[]) => {
  try {
    localStorage.setItem(GUEST_KEY, JSON.stringify(rows));
  } catch {
    /* storage full or blocked - guest data is best-effort only */
  }
};

export function useLearningPath() {
  const { userId, signals, loading: signalsLoading, reload: reloadSignals } = useLearningSignals();
  const [rows, setRows] = useState<LearningPathRow[]>([]);
  const [doneStepIds, setDoneStepIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const loadPaths = useCallback(async () => {
    if (!userId) {
      setRows(readGuest());
      setDoneStepIds(new Set());
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("learning_paths")
      .select("id, subject, goal_label, target_level, target_date, hours_per_week, available_days, start_level, current_level, status")
      .eq("user_id", userId);

    let cloud = (data ?? []) as LearningPathRow[];

    // First sign-in after a guest onboarding: push the local answers up once.
    const guest = readGuest();
    if (guest.length > 0) {
      const missing = guest.filter((g) => !cloud.some((c) => c.subject === g.subject));
      if (missing.length > 0) {
        await supabase.from("learning_paths").upsert(
          missing.map((m) => ({ ...m, id: undefined, user_id: userId })),
          { onConflict: "user_id,subject" },
        );
        const { data: again } = await supabase
          .from("learning_paths")
          .select("id, subject, goal_label, target_level, target_date, hours_per_week, available_days, start_level, current_level, status")
          .eq("user_id", userId);
        cloud = (again ?? []) as LearningPathRow[];
      }
      writeGuest([]);
    }

    setRows(cloud);

    const week = currentWeekStart();
    const { data: steps } = await supabase
      .from("learning_path_steps")
      .select("title_en, route, done_at, week_start")
      .eq("user_id", userId)
      .eq("week_start", week)
      .not("done_at", "is", null);
    setDoneStepIds(new Set((steps ?? []).map((s) => `${s.route}|${s.title_en}`)));
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    void loadPaths();
  }, [loadPaths]);

  const savePath = useCallback(
    async (row: LearningPathRow) => {
      if (!userId) {
        const next = [...readGuest().filter((r) => r.subject !== row.subject), row];
        writeGuest(next);
        setRows(next);
        return;
      }
      await supabase
        .from("learning_paths")
        .upsert({ ...row, id: undefined, user_id: userId }, { onConflict: "user_id,subject" });
      await loadPaths();
    },
    [userId, loadPaths],
  );

  const removePath = useCallback(
    async (subject: SubjectId) => {
      if (!userId) {
        const next = readGuest().filter((r) => r.subject !== subject);
        writeGuest(next);
        setRows(next);
        return;
      }
      await supabase.from("learning_paths").delete().eq("user_id", userId).eq("subject", subject);
      await loadPaths();
    },
    [userId, loadPaths],
  );

  const toggleStepDone = useCallback(
    async (subject: SubjectId, step: PlanStep, done: boolean) => {
      const key = `${step.route}|${step.titleEn}`;
      setDoneStepIds((prev) => {
        const next = new Set(prev);
        if (done) next.add(key);
        else next.delete(key);
        return next;
      });
      if (!userId) return;
      const path = rows.find((r) => r.subject === subject);
      if (!path?.id) return;
      const week = currentWeekStart();
      if (done) {
        await supabase.from("learning_path_steps").insert({
          path_id: path.id,
          user_id: userId,
          week_start: week,
          title_vi: step.titleVi,
          title_en: step.titleEn,
          route: step.route,
          est_minutes: step.minutes,
          kind: step.kind,
          priority: step.priority,
          done_at: new Date().toISOString(),
        });
      } else {
        await supabase
          .from("learning_path_steps")
          .delete()
          .eq("user_id", userId)
          .eq("week_start", week)
          .eq("title_en", step.titleEn)
          .eq("route", step.route);
      }
    },
    [userId, rows],
  );

  const views: PathView[] = useMemo(
    () =>
      rows.map((path) => {
        const def = SUBJECTS[path.subject];
        const sig = signals[path.subject];
        const level = inferLevel(sig, def);
        return {
          path,
          currentLevel: level,
          masteryPct: Math.round(masteryPct(sig)),
          pacePerWeek: Number(progressPerWeek(sig).toFixed(1)),
          readiness: estimateReadiness(sig, path.target_level, def),
          weaknesses: rankWeaknesses(sig, def),
          plan: buildWeeklyPlan(sig, path.hours_per_week, def),
          vocabMastered: sig.vocabMastered,
          minutesLast7: sig.minutesLast7,
          activeDays30: sig.activeDays30,
          dueReviews: sig.dueReviews,
        };
      }),
    [rows, signals],
  );

  const isStepDone = useCallback(
    (step: PlanStep) => doneStepIds.has(`${step.route}|${step.titleEn}`),
    [doneStepIds],
  );

  return {
    userId,
    views,
    rows,
    loading: loading || signalsLoading,
    savePath,
    removePath,
    toggleStepDone,
    isStepDone,
    reload: async () => {
      await reloadSignals();
      await loadPaths();
    },
  };
}

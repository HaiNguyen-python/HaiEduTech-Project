/**
 * @file useLearningPath.ts
 * @description Reads and writes personalized learning paths and their weekly
 *   steps. The week's plan is generated once and then persisted, so the list
 *   never reshuffles between visits. Guests keep everything in localStorage and
 *   it is pushed to the cloud on the first sign-in.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SUBJECTS, type SubjectId } from "@/lib/personalization/subjectRegistry";
import {
  buildWeeklyPlan, currentWeekStart, estimateReadiness, explainReadiness, hasEnoughData,
  inferLevel, masteryPct, progressPerWeek, rankWeaknesses, stepKey, type PlanStep,
} from "@/lib/personalization/pathModel";
import { useLearningSignals } from "./useLearningSignals";

const GUEST_KEY = "haiedu-learning-paths-v1";
const GUEST_WEEK_KEY = "haiedu-learning-path-week-v1";

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
  notes?: string | null;
}

export interface WeekPoint {
  week: string;
  doneSteps: number;
  doneMinutes: number;
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
  lessonsDone: number;
  enoughData: boolean;
  explain: { vi: string; en: string };
}

interface GuestWeek {
  week: string;
  plans: Record<string, PlanStep[]>;
  done: string[];
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

const readGuestWeek = (week: string): GuestWeek => {
  try {
    const raw = localStorage.getItem(GUEST_WEEK_KEY);
    const parsed = raw ? (JSON.parse(raw) as GuestWeek) : null;
    if (parsed && parsed.week === week) return parsed;
  } catch {
    /* ignore malformed guest cache */
  }
  return { week, plans: {}, done: [] };
};
const writeGuestWeek = (value: GuestWeek) => {
  try {
    localStorage.setItem(GUEST_WEEK_KEY, JSON.stringify(value));
  } catch {
    /* best effort */
  }
};

const rowToStep = (row: {
  title_vi: string; title_en: string; route: string | null;
  est_minutes: number; kind: string; priority: number;
}): PlanStep => ({
  trackId: `${row.route ?? ""}|${row.title_en}`,
  kind: row.kind as PlanStep["kind"],
  titleVi: row.title_vi,
  titleEn: row.title_en,
  route: row.route ?? "/",
  minutes: row.est_minutes,
  skill: "",
  priority: row.priority,
});

export function useLearningPath() {
  const { userId, signals, loading: signalsLoading, reload: reloadSignals } = useLearningSignals();
  const [rows, setRows] = useState<LearningPathRow[]>([]);
  const [plans, setPlans] = useState<Record<string, PlanStep[]>>({});
  const [doneStepIds, setDoneStepIds] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<WeekPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const week = currentWeekStart();

  const selectCols =
    "id, subject, goal_label, target_level, target_date, hours_per_week, available_days, start_level, current_level, status, notes";

  const loadPaths = useCallback(async () => {
    if (!userId) {
      const guestRows = readGuest();
      const cache = readGuestWeek(week);
      const nextPlans: Record<string, PlanStep[]> = {};
      for (const row of guestRows) {
        nextPlans[row.subject] = cache.plans[row.subject]
          ?? buildWeeklyPlan(signals[row.subject], row.hours_per_week, SUBJECTS[row.subject]);
      }
      writeGuestWeek({ week, plans: nextPlans, done: cache.done });
      setRows(guestRows);
      setPlans(nextPlans);
      setDoneStepIds(new Set(cache.done));
      setHistory([]);
      setLoading(false);
      return;
    }

    const { data } = await supabase.from("learning_paths").select(selectCols).eq("user_id", userId);
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
        const { data: again } = await supabase.from("learning_paths").select(selectCols).eq("user_id", userId);
        cloud = (again ?? []) as LearningPathRow[];
      }
      writeGuest([]);
    }
    setRows(cloud);

    // This week's persisted steps, generated once per subject per week.
    const { data: steps } = await supabase
      .from("learning_path_steps")
      .select("id, path_id, title_vi, title_en, route, est_minutes, kind, priority, done_at")
      .eq("user_id", userId)
      .eq("week_start", week)
      .order("priority", { ascending: true });

    const byPath = new Map<string, typeof steps>();
    for (const step of steps ?? []) {
      const list = byPath.get(step.path_id) ?? [];
      list.push(step);
      byPath.set(step.path_id, list);
    }

    const nextPlans: Record<string, PlanStep[]> = {};
    const inserts: {
      path_id: string; user_id: string; week_start: string; title_vi: string; title_en: string;
      route: string; est_minutes: number; kind: string; priority: number;
    }[] = [];
    for (const path of cloud) {
      const existing = byPath.get(path.id ?? "");
      if (existing && existing.length > 0) {
        nextPlans[path.subject] = existing.map(rowToStep);
        continue;
      }
      const generated = buildWeeklyPlan(signals[path.subject], path.hours_per_week, SUBJECTS[path.subject]);
      nextPlans[path.subject] = generated;
      for (const step of generated) {
        inserts.push({
          path_id: path.id ?? "",
          user_id: userId,
          week_start: week,
          title_vi: step.titleVi,
          title_en: step.titleEn,
          route: step.route,
          est_minutes: step.minutes,
          kind: step.kind,
          priority: step.priority,
        });
      }
    }
    if (inserts.length > 0) await supabase.from("learning_path_steps").insert(inserts);

    setPlans(nextPlans);
    setDoneStepIds(
      new Set((steps ?? []).filter((s) => s.done_at).map((s) => `${s.route}|${s.title_en}`)),
    );

    // Eight-week history for the progress chart.
    const from = new Date(Date.now() - 8 * 7 * 24 * 3600 * 1000).toISOString().slice(0, 10);
    const { data: past } = await supabase
      .from("learning_path_steps")
      .select("week_start, est_minutes, done_at")
      .eq("user_id", userId)
      .gte("week_start", from)
      .not("done_at", "is", null)
      .limit(2000);
    const agg = new Map<string, WeekPoint>();
    for (const row of past ?? []) {
      const point = agg.get(row.week_start) ?? { week: row.week_start, doneSteps: 0, doneMinutes: 0 };
      point.doneSteps += 1;
      point.doneMinutes += row.est_minutes ?? 0;
      agg.set(row.week_start, point);
    }
    setHistory([...agg.values()].sort((a, b) => a.week.localeCompare(b.week)));
    setLoading(false);
  }, [userId, week, signals, selectCols]);

  useEffect(() => {
    if (signalsLoading) return;
    void loadPaths();
  }, [loadPaths, signalsLoading]);

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
      const key = stepKey(step);
      setDoneStepIds((prev) => {
        const next = new Set(prev);
        if (done) next.add(key);
        else next.delete(key);
        return next;
      });
      if (!userId) {
        const cache = readGuestWeek(week);
        cache.done = done ? [...new Set([...cache.done, key])] : cache.done.filter((k) => k !== key);
        writeGuestWeek(cache);
        return;
      }
      await supabase
        .from("learning_path_steps")
        .update({ done_at: done ? new Date().toISOString() : null })
        .eq("user_id", userId)
        .eq("week_start", week)
        .eq("title_en", step.titleEn)
        .eq("route", step.route);
    },
    [userId, week],
  );

  /** Sends one plan step into the existing To-do & Study Goal module. */
  const pushToTodo = useCallback(
    async (subject: SubjectId, step: PlanStep) => {
      if (!userId) return false;
      const def = SUBJECTS[subject];
      const { error } = await supabase.from("study_tasks").insert({
        user_id: userId,
        title: `${def.emoji} ${step.titleEn}`,
        notes: step.route,
        priority: step.priority <= 2 ? "high" : "medium",
        difficulty: 2,
        due_date: week,
        is_ai_suggested: true,
        ai_rationale: `My Learning Path - ${def.labelEn}`,
      });
      return !error;
    },
    [userId, week],
  );

  /** Caches the AI note per subject and week inside learning_paths.notes. */
  const readCoachNote = useCallback(
    (subject: SubjectId): string => {
      const path = rows.find((r) => r.subject === subject);
      if (!path?.notes) return "";
      try {
        const parsed = JSON.parse(path.notes) as Record<string, string>;
        return parsed[week] ?? "";
      } catch {
        return "";
      }
    },
    [rows, week],
  );

  const saveCoachNote = useCallback(
    async (subject: SubjectId, note: string) => {
      setRows((prev) =>
        prev.map((r) => (r.subject === subject ? { ...r, notes: JSON.stringify({ [week]: note }) } : r)),
      );
      if (!userId) return;
      await supabase
        .from("learning_paths")
        .update({ notes: JSON.stringify({ [week]: note }) })
        .eq("user_id", userId)
        .eq("subject", subject);
    },
    [userId, week],
  );

  const views: PathView[] = useMemo(
    () =>
      rows.map((path) => {
        const def = SUBJECTS[path.subject];
        const sig = signals[path.subject];
        const pace = Number(progressPerWeek(sig).toFixed(1));
        const readiness = estimateReadiness(sig, path.target_level, def);
        return {
          path,
          currentLevel: inferLevel(sig, def),
          masteryPct: Math.round(masteryPct(sig)),
          pacePerWeek: pace,
          readiness,
          weaknesses: rankWeaknesses(sig, def),
          plan: plans[path.subject] ?? buildWeeklyPlan(sig, path.hours_per_week, def),
          vocabMastered: sig.vocabMastered,
          minutesLast7: sig.minutesLast7,
          activeDays30: sig.activeDays30,
          dueReviews: sig.dueReviews,
          lessonsDone: sig.lessonsDone,
          enoughData: hasEnoughData(sig),
          explain: explainReadiness(sig, readiness, pace),
        };
      }),
    [rows, signals, plans],
  );

  const isStepDone = useCallback(
    (step: PlanStep) => doneStepIds.has(stepKey(step)),
    [doneStepIds],
  );

  return {
    userId,
    views,
    rows,
    history,
    week,
    loading: loading || signalsLoading,
    savePath,
    removePath,
    toggleStepDone,
    isStepDone,
    pushToTodo,
    readCoachNote,
    saveCoachNote,
    reload: async () => {
      await reloadSignals();
      await loadPaths();
    },
  };
}

// React hook: load and mutate goals and tasks with Supabase + optimistic updates.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { StudyGoal, StudyTask } from "./types";

export function useStudyGoalsTasks(userId: string | null) {
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    setLoading(true);
    const [g, t] = await Promise.all([
      supabase.from("study_goals").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("study_tasks").select("*").eq("user_id", userId).order("due_date", { ascending: false }).limit(500),
    ]);
    setGoals((g.data ?? []) as StudyGoal[]);
    setTasks((t.data ?? []) as StudyTask[]);
    setLoading(false);
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const createGoal = async (input: Partial<StudyGoal>) => {
    if (!userId) return;
    const { data, error } = await supabase.from("study_goals").insert({
      user_id: userId,
      title: input.title ?? "Untitled",
      description: input.description ?? null,
      category: input.category ?? "other",
      target_date: input.target_date ?? null,
      target_metric: input.target_metric ?? null,
      progress_pct: input.progress_pct ?? 0,
      status: "active",
    }).select().single();
    if (!error && data) setGoals((prev) => [data as StudyGoal, ...prev]);
  };

  const updateGoal = async (id: string, patch: Partial<StudyGoal>) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...patch } as StudyGoal : g)));
    await supabase.from("study_goals").update(patch).eq("id", id);
  };

  const deleteGoal = async (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    // Unlink tasks from the goal instead of deleting them.
    setTasks((prev) => prev.map((t) => (t.goal_id === id ? { ...t, goal_id: null, contribution_pct: 0 } : t)));
    await supabase.from("study_tasks").update({ goal_id: null, contribution_pct: 0 }).eq("goal_id", id);
    await supabase.from("study_goals").delete().eq("id", id);
  };

  const patchTask = (id: string, patch: Partial<StudyTask>) => {
    setTasks((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } as StudyTask : x)));
    supabase.from("study_tasks").update(patch as any).eq("id", id);
  };

  const createTask = async (input: Partial<StudyTask>) => {
    if (!userId) return null;
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase.from("study_tasks").insert({
      user_id: userId,
      goal_id: input.goal_id ?? null,
      title: input.title ?? "Untitled",
      notes: input.notes ?? null,
      priority: input.priority ?? "medium",
      difficulty: input.difficulty ?? 3,
      contribution_pct: input.contribution_pct ?? 0,
      due_date: input.due_date ?? today,
      is_ai_suggested: input.is_ai_suggested ?? false,
      ai_rationale: input.ai_rationale ?? null,
    }).select().single();
    if (!error && data) {
      setTasks((prev) => [data as StudyTask, ...prev]);
      return data as StudyTask;
    }
    return null;
  };

  const toggleTask = async (id: string) => {
    const t = tasks.find((x) => x.id === id);
    if (!t) return;
    const wasCompleted = !!t.completed_at;
    const nextCompleted = wasCompleted ? null : new Date().toISOString();
    setTasks((prev) => prev.map((x) => (x.id === id ? { ...x, completed_at: nextCompleted } : x)));
    await supabase.from("study_tasks").update({ completed_at: nextCompleted }).eq("id", id);

    // Adjust linked goal progress: add on complete, subtract on uncheck.
    if (t.goal_id) {
      const g = goals.find((gg) => gg.id === t.goal_id);
      if (g) {
        const delta = Number(t.contribution_pct || 0);
        const raw = Number(g.progress_pct || 0) + (wasCompleted ? -delta : delta);
        const next = Math.max(0, Math.min(100, raw));
        await updateGoal(g.id, { progress_pct: next });
      }
    }
  };

  const deleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await supabase.from("study_tasks").delete().eq("id", id);
  };

  return { goals, tasks, loading, reload: load, createGoal, updateGoal, deleteGoal, createTask, patchTask, toggleTask, deleteTask };
}

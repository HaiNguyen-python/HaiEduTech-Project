// Math helpers for study goal analytics: velocity, ETA, weighted completion, heatmap.
import type { StudyGoal, StudyTask } from "./types";

const PRIORITY_WEIGHT: Record<string, number> = { high: 1.5, medium: 1, low: 0.7 };

export function weightForTask(t: StudyTask): number {
  const p = PRIORITY_WEIGHT[t.priority] ?? 1;
  const c = Math.max(0.1, Number(t.contribution_pct) || 0.3);
  return p * c;
}

export function todaysTasks(tasks: StudyTask[]): StudyTask[] {
  const today = new Date().toISOString().slice(0, 10);
  return tasks.filter((t) => (t.due_date ?? today) === today);
}

/** Weighted % of today's planned tasks completed. */
export function dailyCompletionPct(tasks: StudyTask[]): number {
  const todays = todaysTasks(tasks);
  if (todays.length === 0) return 0;
  const total = todays.reduce((s, t) => s + weightForTask(t), 0);
  const done = todays.filter((t) => !!t.completed_at).reduce((s, t) => s + weightForTask(t), 0);
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

/** Average daily progress % contributed to a goal over last N days. */
export function avgDailyGoalVelocity(goal: StudyGoal, tasks: StudyTask[], days = 14): number {
  const cutoff = Date.now() - days * 86400000;
  const relevant = tasks.filter(
    (t) => t.goal_id === goal.id && t.completed_at && new Date(t.completed_at).getTime() >= cutoff,
  );
  const total = relevant.reduce((s, t) => s + (Number(t.contribution_pct) || 0), 0);
  return total / days;
}

/** Estimated completion date given current velocity. Returns null if velocity is 0. */
export function estimatedCompletionDate(goal: StudyGoal, tasks: StudyTask[]): Date | null {
  const remaining = Math.max(0, 100 - Number(goal.progress_pct || 0));
  if (remaining === 0) return new Date();
  const v = avgDailyGoalVelocity(goal, tasks);
  if (v <= 0) return null;
  const daysNeeded = Math.ceil(remaining / v);
  const d = new Date();
  d.setDate(d.getDate() + daysNeeded);
  return d;
}

/** Whether goal is behind schedule (needed velocity > current velocity). */
export function isLagging(goal: StudyGoal, tasks: StudyTask[]): boolean {
  if (!goal.target_date) return false;
  const remaining = Math.max(0, 100 - Number(goal.progress_pct || 0));
  const daysLeft = Math.ceil((new Date(goal.target_date).getTime() - Date.now()) / 86400000);
  if (daysLeft <= 0) return remaining > 0;
  const needed = remaining / daysLeft;
  const current = avgDailyGoalVelocity(goal, tasks);
  return current < needed * 0.7;
}

/** 30-day completion heatmap. Returns array of { date, ratio 0..1, done, planned }. */
export function heatmap30(tasks: StudyTask[]): { date: string; ratio: number; done: number; planned: number }[] {
  const out: { date: string; ratio: number; done: number; planned: number }[] = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const dayTasks = tasks.filter((t) => (t.due_date ?? "") === iso);
    const done = dayTasks.filter((t) => !!t.completed_at).length;
    const planned = dayTasks.length;
    out.push({ date: iso, planned, done, ratio: planned === 0 ? 0 : done / planned });
  }
  return out;
}

/** Daily contribution + cumulative progress line for a specific goal, last 14 days. */
export function goalBridgeSeries(goal: StudyGoal, tasks: StudyTask[]): { date: string; contribution: number; cumulative: number }[] {
  const out: { date: string; contribution: number; cumulative: number }[] = [];
  const now = new Date();
  let running = 0;
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const contribution = tasks
      .filter((t) => t.goal_id === goal.id && t.completed_at?.slice(0, 10) === iso)
      .reduce((s, t) => s + (Number(t.contribution_pct) || 0), 0);
    running += contribution;
    out.push({ date: iso.slice(5), contribution: Number(contribution.toFixed(2)), cumulative: Number(running.toFixed(2)) });
  }
  return out;
}

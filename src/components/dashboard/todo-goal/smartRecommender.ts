// Client-side heuristic recommender. Used as an always-available fallback when
// the AI endpoint is offline or returns an error, and to compute goal health.
import type { StudyGoal, StudyTask } from "./types";
import { avgDailyGoalVelocity } from "./studyGoalMath";

export interface HealthInfo {
  onTrack: number;
  atRisk: number;
  overdue: number;
  minutesThisWeek: number;
}

/** Lag = expected linear progress at today - actual progress. Negative means ahead. */
export function goalLag(goal: StudyGoal): number {
  if (!goal.target_date) return Math.max(0, 100 - Number(goal.progress_pct || 0));
  const created = new Date(goal.created_at).getTime();
  const target = new Date(goal.target_date).getTime();
  const total = target - created;
  if (total <= 0) return 100 - Number(goal.progress_pct || 0);
  const elapsed = Date.now() - created;
  const expected = Math.max(0, Math.min(100, (elapsed / total) * 100));
  return expected - Number(goal.progress_pct || 0);
}

export function goalHealth(goal: StudyGoal): "on-track" | "at-risk" | "overdue" | "done" {
  if (Number(goal.progress_pct || 0) >= 100) return "done";
  if (goal.target_date && new Date(goal.target_date).getTime() < Date.now()) return "overdue";
  const lag = goalLag(goal);
  if (lag > 12) return "at-risk";
  return "on-track";
}

export function computeHealth(goals: StudyGoal[], weekMinutes: number): HealthInfo {
  let on = 0, risk = 0, over = 0;
  for (const g of goals) {
    if (g.status !== "active") continue;
    const h = goalHealth(g);
    if (h === "on-track" || h === "done") on++;
    else if (h === "at-risk") risk++;
    else if (h === "overdue") over++;
  }
  return { onTrack: on, atRisk: risk, overdue: over, minutesThisWeek: weekMinutes };
}

/** Forecast completion date if the user studies `minutesPerDay` on this goal. */
export function forecastCompletion(goal: StudyGoal, tasks: StudyTask[], minutesPerDay: number): Date | null {
  const remaining = Math.max(0, 100 - Number(goal.progress_pct || 0));
  if (remaining === 0) return new Date();
  // Baseline: 30 minutes/day -> velocity currently observed.
  const baselineVelocity = avgDailyGoalVelocity(goal, tasks) || 0.8;
  const scale = minutesPerDay / 30;
  const projected = Math.max(0.1, baselineVelocity * scale);
  const days = Math.ceil(remaining / projected);
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

// Helpers to compute aggregate metrics from assignments + submissions.
import type { Database } from "@/integrations/supabase/types";

export type Assignment = Database["public"]["Tables"]["assignments"]["Row"];
export type Submission = Database["public"]["Tables"]["student_submissions"]["Row"];

export type DerivedStatus = "in_progress" | "completed" | "overdue";

export interface AssignmentRow extends Assignment {
  submissions: Submission[];
  assigneesCount: number;
  completedCount: number;
  progressPct: number;
  averageAccuracy: number | null;
  derivedStatus: DerivedStatus;
}

export function buildAssignmentRows(
  assignments: Assignment[],
  submissions: Submission[],
): AssignmentRow[] {
  const byAssignment = new Map<string, Submission[]>();
  for (const s of submissions) {
    const arr = byAssignment.get(s.assignment_id) ?? [];
    arr.push(s);
    byAssignment.set(s.assignment_id, arr);
  }

  const now = Date.now();

  return assignments.map((a) => {
    const subs = byAssignment.get(a.id) ?? [];
    const assigneesCount = (a.target_student_ids?.length ?? 0) || subs.length;
    const completedCount = subs.filter((s) => s.status === "completed").length;
    const progressPct = assigneesCount > 0 ? (completedCount / assigneesCount) * 100 : 0;

    const accValues = subs
      .filter((s) => s.status === "completed" && typeof s.accuracy === "number")
      .map((s) => Number(s.accuracy));
    const averageAccuracy = accValues.length
      ? accValues.reduce((sum, v) => sum + v, 0) / accValues.length
      : null;

    const isOverdue = a.deadline ? new Date(a.deadline).getTime() < now : false;
    const derivedStatus: DerivedStatus =
      progressPct >= 100
        ? "completed"
        : isOverdue && progressPct < 100
        ? "overdue"
        : "in_progress";

    return {
      ...a,
      submissions: subs,
      assigneesCount,
      completedCount,
      progressPct,
      averageAccuracy,
      derivedStatus,
    };
  });
}

export function totalRuntimeHours(submissions: Submission[]): number {
  const seconds = submissions.reduce((sum, s) => sum + (s.time_spent_seconds ?? 0), 0);
  return seconds / 3600;
}

export function formatAssignedTime(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  return `${hh}:${mm} - ${dd}/${mo}/${d.getFullYear()}`;
}

export function formatDeadline(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mo}/${d.getFullYear()}`;
}

export const SUBJECT_LABELS: Record<string, string> = {
  ai_academy: "AI Academy",
  english: "English Hub",
  chinese: "Chinese Hub",
  scratch: "Scratch Coding",
  other: "Other",
};

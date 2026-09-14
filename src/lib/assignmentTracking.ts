/**
 * Student-facing assignment tracking: read the tasks assigned to me and flip
 * the "done" tick. Backed by `student_submissions` (one row per assignment +
 * student), the same table the teacher dashboard reads.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { supabase } from "@/integrations/supabase/client";

export interface StudentAssignmentItem {
  assignmentId: string;
  title: string;
  subject: string;
  level: string | null;
  route: string | null;
  deadline: string | null;
  assignedAt: string;
  teacherName: string | null;
  done: boolean;
  submittedAt: string | null;
  overdue: boolean;
}

interface AssignmentRow {
  id: string;
  title: string;
  subject: string;
  level: string | null;
  source_ref: string | null;
  deadline: string | null;
  assigned_at: string;
  teacher_name: string | null;
}

interface SubmissionRow {
  assignment_id: string;
  status: string;
  submitted_at: string | null;
}

/** Sort: not-done first (soonest deadline first), then done items by recency. */
function sortItems(items: StudentAssignmentItem[]): StudentAssignmentItem[] {
  return [...items].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (a.done) return (b.submittedAt ?? b.assignedAt).localeCompare(a.submittedAt ?? a.assignedAt);
    const da = a.deadline ? new Date(a.deadline).getTime() : Number.MAX_SAFE_INTEGER;
    const db = b.deadline ? new Date(b.deadline).getTime() : Number.MAX_SAFE_INTEGER;
    if (da !== db) return da - db;
    return b.assignedAt.localeCompare(a.assignedAt);
  });
}

export async function fetchMyAssignments(userId: string): Promise<StudentAssignmentItem[]> {
  const [{ data: assignments, error: aErr }, { data: subs, error: sErr }] = await Promise.all([
    supabase
      .from("assignments")
      .select("id, title, subject, level, source_ref, deadline, assigned_at, teacher_name")
      .contains("target_student_ids", [userId])
      .order("assigned_at", { ascending: false })
      .limit(200),
    supabase
      .from("student_submissions")
      .select("assignment_id, status, submitted_at")
      .eq("student_id", userId)
      .limit(1000),
  ]);

  if (aErr) throw aErr;
  if (sErr) throw sErr;

  const byAssignment = new Map<string, SubmissionRow>();
  ((subs ?? []) as SubmissionRow[]).forEach((s) => byAssignment.set(s.assignment_id, s));
  const now = Date.now();

  const items = ((assignments ?? []) as AssignmentRow[]).map((a) => {
    const sub = byAssignment.get(a.id);
    const done = sub?.status === "completed";
    return {
      assignmentId: a.id,
      title: a.title,
      subject: a.subject,
      level: a.level,
      route: a.source_ref,
      deadline: a.deadline,
      assignedAt: a.assigned_at,
      teacherName: a.teacher_name,
      done,
      submittedAt: sub?.submitted_at ?? null,
      overdue: !done && !!a.deadline && new Date(a.deadline).getTime() < now,
    } satisfies StudentAssignmentItem;
  });

  return sortItems(items);
}

/**
 * Flip the tick. Upserts so an older assignment that never got a progress row
 * still records the student's answer instead of failing silently.
 */
export async function setAssignmentDone(
  userId: string,
  assignmentId: string,
  done: boolean,
): Promise<void> {
  const { error } = await supabase
    .from("student_submissions")
    .upsert(
      {
        assignment_id: assignmentId,
        student_id: userId,
        status: done ? "completed" : "assigned",
        submitted_at: done ? new Date().toISOString() : null,
      },
      { onConflict: "assignment_id,student_id" },
    );
  if (error) throw error;
}

export const pendingCount = (items: StudentAssignmentItem[]) =>
  items.filter((i) => !i.done).length;

export function formatDeadlineShort(iso: string | null): string {
  if (!iso) return "Không có hạn";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

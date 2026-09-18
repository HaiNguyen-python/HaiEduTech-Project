/**
 * Shared teacher write-actions for classes and assignments.
 *
 * Single source of truth used by both the admin pages (/admin/classes,
 * /admin/assignments) and the teacher mode inside the floating notebook, so
 * the two surfaces can never drift apart.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { supabase } from "@/integrations/supabase/client";

export interface CreateAssignmentInput {
  title: string;
  subject: string;
  level?: string | null;
  assignmentType?: string;
  sourceRef?: string | null;
  deadline?: string | null; // ISO or datetime-local value
  teacherId: string;
  teacherName?: string;
  targetClassName?: string | null;
  studentIds: string[];
}

export interface CreateAssignmentResult {
  assignmentId: string;
  assigned: number;
  notified: number;
  /** Set when the task saved but the bell alerts failed. */
  notifyError: string | null;
}

/** Create a class. Throws with a readable message when the write fails. */
export async function createClass(input: {
  className: string;
  subject: string;
  createdBy: string;
}): Promise<void> {
  const name = input.className.trim();
  if (!name) throw new Error("Tên lớp không được để trống");
  const { error } = await supabase.from("classes").insert({
    class_name: name,
    subject_category: input.subject,
    created_by: input.createdBy,
  });
  if (error) throw new Error(error.message);
}

export async function deleteClass(classId: string): Promise<void> {
  const { error } = await supabase.from("classes").delete().eq("id", classId);
  if (error) throw new Error(error.message);
}

/**
 * Sync class membership to exactly `nextMemberIds`. Both the remove and the add
 * are verified: a silent failure used to leave a class empty while the UI said
 * it had saved.
 */
export async function updateClassMembers(
  classId: string,
  currentMemberIds: Iterable<string>,
  nextMemberIds: Iterable<string>,
): Promise<{ added: number; removed: number }> {
  const current = new Set(currentMemberIds);
  const next = new Set(nextMemberIds);
  const toAdd = Array.from(next).filter((id) => !current.has(id));
  const toRemove = Array.from(current).filter((id) => !next.has(id));

  if (toRemove.length > 0) {
    const { error } = await supabase
      .from("class_members")
      .delete()
      .eq("class_id", classId)
      .in("user_id", toRemove);
    if (error) throw new Error(error.message);
  }
  if (toAdd.length > 0) {
    const { error } = await supabase
      .from("class_members")
      .insert(toAdd.map((uid) => ({ class_id: classId, user_id: uid })));
    if (error) throw new Error(error.message);
  }
  return { added: toAdd.length, removed: toRemove.length };
}

/**
 * Create an assignment, seed one progress row per student and fire the bell
 * notifications. If the progress rows fail the assignment is rolled back - a
 * task nobody can tick is worse than no task at all.
 */
export async function createAssignment(
  input: CreateAssignmentInput,
): Promise<CreateAssignmentResult> {
  const title = input.title.trim();
  if (!title) throw new Error("Cần nhập tên bài tập");
  const studentIds = Array.from(new Set(input.studentIds));
  if (studentIds.length === 0) throw new Error("Chọn ít nhất một học viên");

  const deadlineIso = input.deadline ? new Date(input.deadline).toISOString() : null;

  const { data: created, error } = await supabase
    .from("assignments")
    .insert({
      title,
      subject: input.subject,
      level: input.level || null,
      assignment_type: input.assignmentType || "platform_exercise",
      source_ref: input.sourceRef || null,
      teacher_id: input.teacherId,
      teacher_name: input.teacherName || "Teacher Hai",
      target_class: input.targetClassName ?? null,
      target_student_ids: studentIds,
      deadline: deadlineIso,
    })
    .select("id")
    .single();

  if (error || !created) throw new Error(error?.message || "Không tạo được bài tập");

  const { error: subError } = await supabase.from("student_submissions").insert(
    studentIds.map((sid) => ({
      assignment_id: created.id,
      student_id: sid,
      status: "assigned" as const,
    })),
  );
  if (subError) {
    await supabase.from("assignments").delete().eq("id", created.id);
    throw new Error(`Không giao được bài - đã hoàn tác: ${subError.message}`);
  }

  const deadlineText = deadlineIso
    ? new Date(deadlineIso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "không có";
  const body = `🔔 Bài tập mới! Teacher Hai Nguyen vừa giao bài: ${title}. Hạn chót: ${deadlineText}.`;
  const { data: notified, error: notifError } = await supabase
    .from("assignment_notifications")
    .insert(
      studentIds.map((uid) => ({
        user_id: uid,
        assignment_id: created.id,
        title,
        body,
        route: input.sourceRef || null,
      })),
    )
    .select("id");

  return {
    assignmentId: created.id,
    assigned: studentIds.length,
    notified: notified?.length ?? 0,
    notifyError: notifError ? notifError.message : null,
  };
}

export async function deleteAssignment(assignmentId: string): Promise<void> {
  const { error } = await supabase.from("assignments").delete().eq("id", assignmentId);
  if (error) throw new Error(error.message);
}

/**
 * Lightweight data-integrity checks for the admin Health Monitor tab.
 * Read-only: flags duplicate students, empty classes and assignments whose
 * notifications did not reach every targeted student.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/adminData";
import { dedupeStudentProfiles, fetchAllProfiles } from "@/lib/adminStudents";

export type IntegrityStatus = "ok" | "warn" | "fail";

export interface IntegrityCheck {
  name: string;
  nameVi: string;
  status: IntegrityStatus;
  detail: string;
  detailVi: string;
}

interface ClassRow { id: string; class_name: string }
interface MemberRow { class_id: string }
interface AssignmentRow { id: string; title: string; target_student_ids: string[] | null }
interface NotifRow { assignment_id: string | null }

export async function runAdminIntegrityChecks(): Promise<IntegrityCheck[]> {
  const checks: IntegrityCheck[] = [];

  // 1) Duplicate student profiles
  try {
    const profiles = await fetchAllProfiles();
    const { mergedCount, duplicateNames, students } = dedupeStudentProfiles(profiles);
    checks.push({
      name: "Duplicate student profiles",
      nameVi: "Học viên bị trùng hồ sơ",
      status: mergedCount === 0 ? "ok" : "warn",
      detail: mergedCount === 0
        ? `${students.length} unique students, no duplicates`
        : `${mergedCount} duplicate profile(s) across ${duplicateNames.length} name(s) — merged in admin lists`,
      detailVi: mergedCount === 0
        ? `${students.length} học viên, không có hồ sơ trùng`
        : `${mergedCount} hồ sơ trùng thuộc ${duplicateNames.length} tên — đã gộp trong danh sách quản trị`,
    });
  } catch (e) {
    checks.push({
      name: "Duplicate student profiles", nameVi: "Học viên bị trùng hồ sơ",
      status: "fail", detail: "Could not read profiles", detailVi: "Không đọc được danh sách học viên",
    });
  }

  // 2) Classes with no members
  try {
    const [classes, members] = await Promise.all([
      fetchAllRows<ClassRow>((from, to) =>
        supabase.from("classes").select("id, class_name").order("class_name").range(from, to)),
      fetchAllRows<MemberRow>((from, to) =>
        supabase.from("class_members").select("class_id").range(from, to)),
    ]);
    const counted = new Set(members.map((m) => m.class_id));
    const empty = classes.filter((c) => !counted.has(c.id));
    checks.push({
      name: "Classes without students",
      nameVi: "Lớp chưa có học viên",
      status: empty.length === 0 ? "ok" : "warn",
      detail: empty.length === 0
        ? `${classes.length} class(es), all have members`
        : `${empty.length} empty class(es): ${empty.slice(0, 5).map((c) => c.class_name).join(", ")}`,
      detailVi: empty.length === 0
        ? `${classes.length} lớp, tất cả đều có học viên`
        : `${empty.length} lớp chưa có học viên: ${empty.slice(0, 5).map((c) => c.class_name).join(", ")}`,
    });
  } catch {
    checks.push({
      name: "Classes without students", nameVi: "Lớp chưa có học viên",
      status: "fail", detail: "Could not read classes", detailVi: "Không đọc được danh sách lớp",
    });
  }

  // 3) Assignments whose notifications did not reach every targeted student
  try {
    const [assignments, notifs] = await Promise.all([
      fetchAllRows<AssignmentRow>((from, to) =>
        supabase.from("assignments").select("id, title, target_student_ids")
          .order("assigned_at", { ascending: false }).range(from, to)),
      fetchAllRows<NotifRow>((from, to) =>
        supabase.from("assignment_notifications").select("assignment_id").range(from, to)),
    ]);
    const notifCount = new Map<string, number>();
    notifs.forEach((n) => {
      if (!n.assignment_id) return;
      notifCount.set(n.assignment_id, (notifCount.get(n.assignment_id) ?? 0) + 1);
    });
    const incomplete = assignments.filter((a) => {
      const targets = (a.target_student_ids ?? []).length;
      if (targets === 0) return false;
      return (notifCount.get(a.id) ?? 0) < targets;
    });
    checks.push({
      name: "Assignment notifications delivered",
      nameVi: "Thông báo bài tập đã gửi đủ",
      status: incomplete.length === 0 ? "ok" : "warn",
      detail: incomplete.length === 0
        ? `${assignments.length} assignment(s), all students notified`
        : `${incomplete.length} assignment(s) missing notifications: ${incomplete.slice(0, 3).map((a) => a.title).join(", ")}`,
      detailVi: incomplete.length === 0
        ? `${assignments.length} bài tập, tất cả học viên đã được thông báo`
        : `${incomplete.length} bài tập thiếu thông báo: ${incomplete.slice(0, 3).map((a) => a.title).join(", ")}`,
    });
  } catch {
    checks.push({
      name: "Assignment notifications delivered", nameVi: "Thông báo bài tập đã gửi đủ",
      status: "fail", detail: "Could not read assignments", detailVi: "Không đọc được danh sách bài tập",
    });
  }

  return checks;
}

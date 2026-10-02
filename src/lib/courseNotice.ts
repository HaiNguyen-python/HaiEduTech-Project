import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export const EUR_TO_VND = 31_000;

export type CourseNoticeData = {
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  courseKey: string;
  courseNameVi: string;
  courseNameEn: string;
  classType: "group" | "private";
  currency: "vnd" | "eur";
  level: string;
  objective: string;
  startDate: string;
  endDate: string;
  schedule: string;
  timezone: string;
  weeks: number;
  sessions: number;
  hours: number;
  modules: string[];
  benefits: string[];
  note: string;
  baseEur: number;
  baseVnd: number;
  discountType: "percent" | "amount";
  discountValue: number;
  discountReason: string;
  finalEur: number;
  finalVnd: number;
  paymentReference?: string;
  extraFeeLabel?: string;
  extraFeeVnd?: number;
  extraFeeEur?: number;
  paymentDeadline: string;
  paymentMethod: "vietnam" | "finland" | "both";
  instructorName: string;
  instructorCredentials: string;
  instructorExpertise: string;
  instructorPhone: string;
  instructorEmail: string;
  instructorWebsite: string;
  issuedAt: string;
};

export type CourseNoticeRecord = {
  id: string;
  notice_code: string;
  student_id: string | null;
  recipient_name: string;
  recipient_email: string;
  recipient_phone: string | null;
  status: "draft" | "sent";
  snapshot: CourseNoticeData;
  sent_at: string | null;
  send_count: number;
  last_send_status: string | null;
  last_send_error: string | null;
  created_at: string;
  updated_at: string;
};

export const buildNoticeCode = () => {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `HET-${stamp}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
};

export async function listCourseNotices(): Promise<CourseNoticeRecord[]> {
  const { data, error } = await supabase.from("course_notices").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => ({ ...row, snapshot: row.snapshot as CourseNoticeData })) as CourseNoticeRecord[];
}

export async function saveCourseNotice(input: {
  id?: string;
  code: string;
  studentId: string | null;
  data: CourseNoticeData;
}): Promise<CourseNoticeRecord> {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) throw new Error("Please sign in again");
  const payload = {
    notice_code: input.code,
    student_id: input.studentId,
    recipient_name: input.data.recipientName.trim(),
    recipient_email: input.data.recipientEmail.trim().toLowerCase(),
    recipient_phone: input.data.recipientPhone.trim() || null,
    snapshot: input.data as unknown as Json,
    updated_by: uid,
  };
  const query = input.id
    ? supabase.from("course_notices").update(payload).eq("id", input.id)
    : supabase.from("course_notices").insert({ ...payload, created_by: uid });
  const { data, error } = await query.select("*").single();
  if (error) throw error;
  return { ...data, snapshot: data.snapshot as unknown as CourseNoticeData } as CourseNoticeRecord;
}

export async function duplicateCourseNotice(record: CourseNoticeRecord) {
  return saveCourseNotice({
    code: buildNoticeCode(),
    studentId: record.student_id,
    data: { ...record.snapshot, issuedAt: new Date().toISOString().slice(0, 10) },
  });
}

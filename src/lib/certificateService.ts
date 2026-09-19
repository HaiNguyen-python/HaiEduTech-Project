/**
 * Certificate issuing helpers shared by the admin certificate centre and the
 * learner-facing certificate pages.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { supabase } from "@/integrations/supabase/client";

export type CertificateCourseKey = "business" | "academic" | "vff" | "ai-academy" | "custom";

export interface CertificateRecord {
  id: string;
  code: string;
  student_id: string | null;
  student_name: string;
  course_key: string;
  course_label_en: string | null;
  course_label_vi: string | null;
  level: string | null;
  score: number | null;
  max_score: number | null;
  note: string | null;
  issued_at: string;
  issued_by: string | null;
  revoked_at: string | null;
}

export interface IssueCertificateInput {
  code: string;
  studentId?: string | null;
  studentName: string;
  courseKey: CertificateCourseKey;
  courseLabelEn: string;
  courseLabelVi: string;
  level?: string | null;
  score?: number | null;
  maxScore?: number | null;
  note?: string | null;
  issuedAt: string;
}

const PREFIX: Record<CertificateCourseKey, string> = {
  business: "HET-BUS",
  academic: "HET-ACA",
  vff: "HET-VFF",
  "ai-academy": "HET-AI",
  custom: "HET-CRT",
};

/** Deterministic, readable certificate code. Same inputs -> same code. */
export const buildCertificateCode = (
  courseKey: CertificateCourseKey,
  name: string,
  issuedAt: string,
  level?: string | null,
): string => {
  const seed = `${courseKey}|${level ?? ""}|${name.trim().toLowerCase().replace(/\s+/g, " ")}|${issuedAt}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  const body = hash.toString(36).toUpperCase().padStart(7, "0").slice(0, 7);
  return `${PREFIX[courseKey]}-${body}`;
};

export const issueCertificate = async (input: IssueCertificateInput): Promise<CertificateRecord> => {
  const { data: auth } = await supabase.auth.getUser();
  const issuedBy = auth.user?.id ?? null;
  const { data, error } = await supabase
    .from("certificates")
    .upsert(
      {
        code: input.code,
        student_id: input.studentId ?? null,
        student_name: input.studentName.trim(),
        course_key: input.courseKey,
        course_label_en: input.courseLabelEn,
        course_label_vi: input.courseLabelVi,
        level: input.level ?? null,
        score: input.score ?? null,
        max_score: input.maxScore ?? null,
        note: input.note ?? null,
        issued_at: input.issuedAt,
        issued_by: issuedBy,
        revoked_at: null,
      },
      { onConflict: "code" },
    )
    .select("*")
    .single();
  if (error) throw error;
  return data as CertificateRecord;
};

export const listCertificates = async (): Promise<CertificateRecord[]> => {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("issued_at", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data ?? []) as CertificateRecord[];
};

export const revokeCertificate = async (id: string, revoke: boolean): Promise<void> => {
  const { error } = await supabase
    .from("certificates")
    .update({ revoked_at: revoke ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) throw error;
};

export interface VerifiedCertificate {
  code: string;
  student_name: string;
  course_key: string;
  course_label_en: string | null;
  course_label_vi: string | null;
  level: string | null;
  issued_at: string;
  revoked: boolean;
}

export const verifyCertificate = async (code: string): Promise<VerifiedCertificate | null> => {
  const { data, error } = await supabase.rpc("verify_certificate", { _code: code });
  if (error) throw error;
  const rows = (data ?? []) as VerifiedCertificate[];
  return rows[0] ?? null;
};

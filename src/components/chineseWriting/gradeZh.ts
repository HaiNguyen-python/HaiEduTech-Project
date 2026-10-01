import { supabase } from "@/integrations/supabase/client";
import { consumeAiGrade } from "@/lib/aiQuota";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import type { ZhGradeResult } from "./ZhGradePanel";

export type ZhMode = "essay" | "vocab" | "grammar" | "connector" | "translation" | "paraphrase";

export async function gradeZh(body: { mode: ZhMode; level: string; target: string; reference?: string; attempt: string }, activityId: string): Promise<ZhGradeResult | null> {
  if (!consumeAiGrade()) return null;
  const { data, error } = await supabase.functions.invoke("grade-chinese-writing", { body });
  if (error || !data || typeof data.overall !== "number") throw error || new Error(data?.error || "Grading failed");
  logStudentActivity({ activityType: `chinese_writing_${body.mode}`, activityId, score: data.overall, maxScore: 10, domain: "chinese", metadata: { level: body.level } });
  try {
    const k = "zh-writing-progress";
    const p = JSON.parse(localStorage.getItem(k) || "{}");
    const cur = p[body.mode] || { done: 0, total: 0 };
    p[body.mode] = { done: cur.done + 1, total: cur.total + data.overall };
    localStorage.setItem(k, JSON.stringify(p));
  } catch { /* ignore */ }
  return data as ZhGradeResult;
}

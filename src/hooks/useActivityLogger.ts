// Hook to log student learning activities to the database
// Use this hook in exam/writing/speaking components to track progress

import { supabase } from "@/integrations/supabase/client";

export type LearningDomain = "english" | "chinese" | "programming";

interface ActivityPayload {
  activityType: string; // 'thpt_exam', 'ielts_writing', 'ielts_speaking', 'python_challenge', 'conv_english', 'conv_chinese'
  activityId?: string;  // exam id, essay id, etc.
  score: number;
  maxScore?: number;
  timeSpentSeconds?: number;
  domain?: LearningDomain;
  metadata?: Record<string, any>; // category breakdown, mistakes, etc.
}

// Auto-detect domain from activity type
function inferDomain(activityType: string): LearningDomain {
  const t = activityType.toLowerCase();
  // Chinese
  if (
    t.startsWith("conv_chinese") || t.startsWith("hsk") || t.startsWith("hskk") ||
    t === "pinyin_drill" || t === "hanzi_recognition" || t === "speaking_coach_chinese" ||
    t.includes("chinese")
  ) return "chinese";
  // Programming
  if (
    t.startsWith("python") || t.startsWith("sql") || t === "coding_quiz" ||
    t.includes("programming") || t.includes("scratch") || t.includes("ml_") || t.includes("spark")
  ) return "programming";
  // English (default)
  return "english";
}

export async function logStudentActivity(payload: ActivityPayload) {
  try {
    const { data: { session } } = await supabase.auth.getSession(); const user = session?.user ?? null;
    if (!user) return; // Only log for authenticated users

    const domain = payload.domain || inferDomain(payload.activityType);

    const { error } = await supabase.from("student_activity_log").insert({
      user_id: user.id,
      activity_type: payload.activityType,
      activity_id: payload.activityId || null,
      score: payload.score,
      max_score: payload.maxScore ?? 10,
      time_spent_seconds: payload.timeSpentSeconds || null,
      domain,
      metadata: payload.metadata || {},
    });

    if (error) {
      console.error("Failed to log student activity:", error);
    }
  } catch (e) {
    console.error("Error logging student activity:", e);
  }
}

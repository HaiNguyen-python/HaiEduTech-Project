// Hook to log student learning activities to the database
// Use this hook in exam/writing/speaking components to track progress

import { supabase } from "@/integrations/supabase/client";

interface ActivityPayload {
  activityType: string; // 'thpt_exam', 'ielts_writing', 'ielts_speaking', 'python_challenge'
  activityId?: string;  // exam id, essay id, etc.
  score: number;
  maxScore?: number;
  timeSpentSeconds?: number;
  metadata?: Record<string, any>; // category breakdown, mistakes, etc.
}

export async function logStudentActivity(payload: ActivityPayload) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return; // Only log for authenticated users

    const { error } = await supabase.from("student_activity_log").insert({
      user_id: user.id,
      activity_type: payload.activityType,
      activity_id: payload.activityId || null,
      score: payload.score,
      max_score: payload.maxScore ?? 10,
      time_spent_seconds: payload.timeSpentSeconds || null,
      metadata: payload.metadata || {},
    });

    if (error) {
      console.error("Failed to log student activity:", error);
    }
  } catch (e) {
    console.error("Error logging student activity:", e);
  }
}

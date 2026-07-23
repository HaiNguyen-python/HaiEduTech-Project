// Hook: compute per-goal progress from real learning activity since the goal was created.
// Reads student_activity_log + user_vocab_mastered and returns a bounded percentage
// so that activity work contributes up to ACTIVITY_CAP toward the goal's total progress.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { StudyGoal } from "./types";

const ACTIVITY_CAP = 60; // activity alone can contribute at most 60% to a goal

// Category -> matcher for activity_type prefix / vocab subject.
function matches(category: string, activityType: string, subject: string | null): boolean {
  const t = (activityType || "").toLowerCase();
  const s = (subject || "").toLowerCase();
  switch (category) {
    case "ielts":
      return t.startsWith("ielts_") || s.includes("ielts");
    case "hsk":
      return t.startsWith("hsk") || t.startsWith("hskk") || t.startsWith("conv_chinese") || s.includes("hsk") || s.includes("chinese");
    case "yki":
      return t.startsWith("conv_finnish") || t === "speaking_coach_finnish" || s.includes("finnish") || s.includes("yki");
    case "programming":
      return t.startsWith("python") || t.startsWith("sql") || t === "coding_quiz" || t.includes("programming");
    default:
      return true;
  }
}

export interface GoalActivityInfo {
  activityCount: number;
  masteredCount: number;
  activityPct: number; // capped 0..ACTIVITY_CAP
}

export function useGoalActivityProgress(userId: string | null, goal: StudyGoal | null): GoalActivityInfo {
  const [info, setInfo] = useState<GoalActivityInfo>({ activityCount: 0, masteredCount: 0, activityPct: 0 });

  useEffect(() => {
    let cancelled = false;
    if (!userId || !goal) return;
    (async () => {
      const since = goal.created_at;
      const [actRes, vocabRes] = await Promise.all([
        supabase
          .from("student_activity_log")
          .select("activity_type")
          .eq("user_id", userId)
          .gte("created_at", since)
          .not("activity_type", "in", "(session_heartbeat,daily_login)")
          .limit(2000),
        supabase
          .from("user_vocab_mastered")
          .select("subject")
          .eq("user_id", userId)
          .gte("reviewed_at", since)
          .limit(2000),
      ]);
      if (cancelled) return;

      const acts = (actRes.data ?? []).filter((r: any) => matches(goal.category, r.activity_type, null)).length;
      const words = (vocabRes.data ?? []).filter((r: any) => matches(goal.category, "", r.subject)).length;

      // 0.5% per relevant activity, 0.3% per mastered word, capped.
      const raw = acts * 0.5 + words * 0.3;
      const activityPct = Math.max(0, Math.min(ACTIVITY_CAP, Number(raw.toFixed(1))));
      setInfo({ activityCount: acts, masteredCount: words, activityPct });
    })();
    return () => { cancelled = true; };
  }, [userId, goal?.id, goal?.category, goal?.created_at]);

  return info;
}

import { supabase } from "@/integrations/supabase/client";
import type { PteExamSkill } from "@/data/pteExamBlueprint";

export interface RecordPteAttemptInput {
  skill: PteExamSkill;
  taskType: string;
  itemId: string;
  score: number;
  accuracy?: number;
  timeSpentSeconds?: number;
  response?: string;
  mode?: "guided" | "timed" | "mock";
  traitScores?: Record<string, number>;
}

export const recordPteAttempt = async (input: RecordPteAttemptInput): Promise<boolean> => {
  const { data: authData } = await supabase.auth.getUser();
  const userId = authData.user?.id;
  if (!userId) return false;

  const { error } = await supabase.from("pte_attempts").insert({
    user_id: userId,
    skill: input.skill,
    task_type: input.taskType,
    score: Math.max(10, Math.min(90, input.score)),
    max_score: 90,
    accuracy: input.accuracy == null ? null : Math.max(0, Math.min(100, input.accuracy)),
    time_spent_seconds: Math.max(0, Math.round(input.timeSpentSeconds ?? 0)),
    metadata: {
      itemId: input.itemId,
      mode: input.mode ?? "guided",
      response: input.response?.slice(0, 5000),
      rubricVersion: "pte-2025-v1",
      traitScores: input.traitScores ?? {},
    },
  });

  return !error;
};

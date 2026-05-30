/**
 * @file useSatMistakes.ts
 * @description Hook to record and review SAT mistakes (Error Log).
 * Persists to `sat_mistakes` table when the user is signed in, otherwise
 * silently no-ops so guests don't error out.
 */
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SatMistake {
  id: string;
  source: string;
  module_id: string | null;
  lesson_id: string | null;
  section: "reading-writing" | "math";
  question_type: string | null;
  question: string;
  options: string[];
  chosen_index: number | null;
  correct_index: number;
  explanation: string | null;
  correct_streak: number;
  mastered_at: string | null;
  created_at: string;
}

export interface RecordMistakeInput {
  source?: "lesson" | "exercise" | "mock" | "daily";
  moduleId?: string;
  lessonId?: string;
  section?: "reading-writing" | "math";
  questionType?: string;
  question: string;
  options: string[];
  chosenIndex: number | null;
  correctIndex: number;
  explanation?: string;
}

const getUserId = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
};

export const recordSatMistake = async (input: RecordMistakeInput) => {
  const uid = await getUserId();
  if (!uid) return null;
  const { data, error } = await supabase
    .from("sat_mistakes")
    .insert({
      user_id: uid,
      source: input.source ?? "lesson",
      module_id: input.moduleId ?? null,
      lesson_id: input.lessonId ?? null,
      section: input.section ?? "reading-writing",
      question_type: input.questionType ?? null,
      question: input.question.slice(0, 4000),
      options: input.options,
      chosen_index: input.chosenIndex,
      correct_index: input.correctIndex,
      explanation: input.explanation?.slice(0, 4000) ?? null,
    })
    .select("id")
    .maybeSingle();
  if (error) return null;
  return data?.id ?? null;
};

export const useSatMistakes = () => {
  const [items, setItems] = useState<SatMistake[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const uid = await getUserId();
    if (!uid) {
      setItems([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("sat_mistakes")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false })
      .limit(500);
    setItems((data ?? []) as unknown as SatMistake[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const markReviewed = useCallback(
    async (id: string, wasCorrect: boolean) => {
      const target = items.find((m) => m.id === id);
      if (!target) return;
      const newStreak = wasCorrect ? target.correct_streak + 1 : 0;
      const mastered = newStreak >= 2;
      await supabase
        .from("sat_mistakes")
        .update({
          correct_streak: newStreak,
          mastered_at: mastered ? new Date().toISOString() : null,
        })
        .eq("id", id);
      await reload();
    },
    [items, reload]
  );

  const remove = useCallback(
    async (id: string) => {
      await supabase.from("sat_mistakes").delete().eq("id", id);
      await reload();
    },
    [reload]
  );

  return { items, loading, reload, markReviewed, remove };
};

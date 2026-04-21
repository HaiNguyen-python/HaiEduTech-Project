/**
 * @file usePteSkillStats.ts
 * @description Aggregates PTE progress per skill (Speaking/Writing/Reading/Listening)
 *              from Supabase tables and localStorage. Used by both Dashboard
 *              (compact summary) and PteHub (detailed view).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePteProgress } from "@/hooks/usePteProgress";
import {
  READ_ALOUD_ALL,
  REPEAT_SENTENCE_ALL,
  ESSAY_ALL,
  SUMMARIZE_TEXT_ALL,
  FILL_BLANK_ALL,
  REORDER_ALL,
  DICTATION_ALL,
  SUMMARIZE_SPOKEN_ALL,
} from "@/data/pteData";

export type PteSkill = "speaking" | "writing" | "reading" | "listening";

export interface PteSkillStat {
  skill: PteSkill;
  label: string;
  // Activity / lesson completion
  completed: number;
  total: number;
  completionPct: number;
  // Score metrics (0-90 PTE band scale)
  avgScore: number; // 0..90
  attempts: number;
  // Accuracy 0..100
  accuracy: number;
  // Time spent (seconds)
  timeSpentSeconds: number;
  // Vocab mastered (only relevant aggregate; we attribute it to reading)
  vocabMastered: number;
}

export interface PteSkillSummary {
  loading: boolean;
  skills: PteSkillStat[];
  totalAttempts: number;
  totalTimeMinutes: number;
  vocabMastered: number;
  overallCompletionPct: number;
  refresh: () => Promise<void>;
}

const SKILL_LABELS: Record<PteSkill, string> = {
  speaking: "Speaking",
  writing: "Writing",
  reading: "Reading",
  listening: "Listening",
};

// Total tasks per skill, derived from the bundled PTE dataset.
const SKILL_TOTALS: Record<PteSkill, number> = {
  speaking: READ_ALOUD_ALL.length + REPEAT_SENTENCE_ALL.length,
  writing: ESSAY_ALL.length + SUMMARIZE_TEXT_ALL.length,
  reading: FILL_BLANK_ALL.length + REORDER_ALL.length,
  listening: DICTATION_ALL.length + SUMMARIZE_SPOKEN_ALL.length,
};

// Map a localStorage taskId (e.g. "ra-001", "fib-005") to a skill bucket.
const taskIdToSkill = (id: string): PteSkill | null => {
  if (id.startsWith("ra-") || id.startsWith("rs-")) return "speaking";
  if (id.startsWith("ess-") || id.startsWith("swt-")) return "writing";
  if (id.startsWith("fib-") || id.startsWith("ro-")) return "reading";
  if (id.startsWith("dict-") || id.startsWith("sst-")) return "listening";
  return null;
};

const emptyStat = (skill: PteSkill): PteSkillStat => ({
  skill,
  label: SKILL_LABELS[skill],
  completed: 0,
  total: SKILL_TOTALS[skill],
  completionPct: 0,
  avgScore: 0,
  attempts: 0,
  accuracy: 0,
  timeSpentSeconds: 0,
  vocabMastered: 0,
});

export const usePteSkillStats = (): PteSkillSummary => {
  const { progress } = usePteProgress();
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<PteSkillStat[]>([
    emptyStat("speaking"),
    emptyStat("writing"),
    emptyStat("reading"),
    emptyStat("listening"),
  ]);
  const [vocabMastered, setVocabMastered] = useState(0);

  const compute = useCallback(async () => {
    setLoading(true);

    const buckets: Record<PteSkill, PteSkillStat> = {
      speaking: emptyStat("speaking"),
      writing: emptyStat("writing"),
      reading: emptyStat("reading"),
      listening: emptyStat("listening"),
    };

    // 1) Local completion counts from localStorage progress
    const completedSets: Record<PteSkill, Set<string>> = {
      speaking: new Set(),
      writing: new Set(),
      reading: new Set(),
      listening: new Set(),
    };
    for (const id of progress.completedIds) {
      const s = taskIdToSkill(id);
      if (s) completedSets[s].add(id);
    }
    // Local scores (band 10..90)
    const localScores: Record<PteSkill, number[]> = {
      speaking: [],
      writing: [],
      reading: [],
      listening: [],
    };
    for (const [taskId, band] of Object.entries(progress.scores)) {
      const s = taskIdToSkill(taskId);
      if (s && typeof band === "number") localScores[s].push(band);
    }

    // 2) Supabase: pte_attempts (logged in attempts)
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData?.user?.id ?? null;

    let vocabCount = 0;

    if (userId) {
      const { data: attempts } = await supabase
        .from("pte_attempts")
        .select("skill, score, max_score, accuracy, time_spent_seconds")
        .eq("user_id", userId);

      for (const a of attempts ?? []) {
        const s = a.skill as PteSkill;
        if (!buckets[s]) continue;
        const b = buckets[s];
        const max = Number(a.max_score) || 90;
        // Normalize all score values to PTE band 10..90
        const bandScore = (Number(a.score) / max) * 90;
        localScores[s].push(bandScore);
        b.attempts += 1;
        if (a.accuracy != null) b.accuracy += Number(a.accuracy);
        b.timeSpentSeconds += Number(a.time_spent_seconds) || 0;
      }

      // 3) Vocab mastery (attributed to Reading skill)
      const { count: vocabCnt } = await supabase
        .from("pte_vocab_mastery")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("mastered", true);
      vocabCount = vocabCnt ?? 0;
    }

    // 4) Finalize per-skill metrics
    const skillsArr: PteSkillStat[] = (Object.keys(buckets) as PteSkill[]).map((s) => {
      const b = buckets[s];
      const completed = completedSets[s].size;
      b.completed = Math.min(completed, b.total);
      b.completionPct = b.total > 0 ? Math.round((b.completed / b.total) * 100) : 0;

      const scores = localScores[s];
      const baseAttempts = b.attempts; // Supabase attempts already counted
      // Add local-task completions to total attempts (each completion = one attempt)
      b.attempts = baseAttempts + scores.length - baseAttempts; // scores already includes attempts
      // Recompute attempts safely: use scores length as full attempt list
      b.attempts = scores.length;

      b.avgScore = scores.length > 0
        ? Math.round((scores.reduce((sum, x) => sum + x, 0) / scores.length) * 10) / 10
        : 0;

      // Accuracy normalization: if we accumulated multiple, average it
      if (baseAttempts > 0) {
        b.accuracy = Math.round((b.accuracy / baseAttempts) * 10) / 10;
      } else {
        // Fallback: estimate accuracy from band score (band 90 = 100% accuracy)
        b.accuracy = b.avgScore > 0 ? Math.round((b.avgScore / 90) * 100) : 0;
      }

      return b;
    });

    // Attribute vocab to reading
    const readingIdx = skillsArr.findIndex((x) => x.skill === "reading");
    if (readingIdx >= 0) skillsArr[readingIdx].vocabMastered = vocabCount;

    setSkills(skillsArr);
    setVocabMastered(vocabCount);
    setLoading(false);
  }, [progress.completedIds, progress.scores]);

  useEffect(() => {
    compute();
  }, [compute]);

  const totalAttempts = skills.reduce((s, x) => s + x.attempts, 0);
  const totalTimeMinutes = Math.round(
    skills.reduce((s, x) => s + x.timeSpentSeconds, 0) / 60
  );
  const totalCompleted = skills.reduce((s, x) => s + x.completed, 0);
  const totalAll = skills.reduce((s, x) => s + x.total, 0);
  const overallCompletionPct = totalAll > 0
    ? Math.round((totalCompleted / totalAll) * 100)
    : 0;

  return {
    loading,
    skills,
    totalAttempts,
    totalTimeMinutes,
    vocabMastered,
    overallCompletionPct,
    refresh: compute,
  };
};

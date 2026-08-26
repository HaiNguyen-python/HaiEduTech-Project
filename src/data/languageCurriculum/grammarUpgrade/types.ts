/**
 * @file types.ts
 * @description Shared shape for English Grammar lesson content upgrades.
 *              Each entry is keyed by lesson id and merged into the base
 *              curriculum at runtime, so legacy data files stay untouched.
 */
import type { VocabEntry, InteractiveExercise } from "../types";

export interface GrammarLessonUpgrade {
  /** Vietnamese theory replacement (markdown). */
  theory?: string;
  /** English theory replacement (markdown). Target: >= 160 words. */
  theoryEn?: string;
  proTips?: string[];
  proTipsEn?: string[];
  vocabulary?: VocabEntry[];
  exercises?: InteractiveExercise[];
}

export type GrammarUpgradeMap = Record<string, GrammarLessonUpgrade>;

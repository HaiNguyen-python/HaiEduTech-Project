/**
 * @file purposeEnglishTypes.ts
 * @description Shared types for goal-oriented English tracks (Business English,
 *   Academic English). Content is fully bilingual (Vietnamese + English).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface PurposeVocabItem {
  /** English term or phrase. */
  term: string;
  /** Part of speech / phrase function, e.g. "verb", "phrase". */
  pos: string;
  /** Vietnamese meaning. */
  vi: string;
  /** Example sentence in English. */
  example: string;
  /** Vietnamese translation of the example. */
  exampleVi: string;
}

export interface PurposeQuestion {
  /** Question stem in English (may contain ___ for a gap). */
  question: string;
  /** Vietnamese hint or translation of the stem. */
  questionVi: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
  explanation: string;
  explanationVi: string;
}

export interface PurposeModel {
  /** Label of the model text, e.g. "Sample email". */
  label: string;
  labelVi: string;
  /** Lines of the model text (email, dialogue or paragraph). */
  lines: string[];
}

export interface PurposeLesson {
  id: string;
  title: string;
  titleVi: string;
  /** One-sentence gist. */
  gist: string;
  gistVi: string;
  /** Short teaching explanation with concrete examples. */
  teaching: string;
  teachingVi: string;
  vocab: PurposeVocabItem[];
  model: PurposeModel;
  questions: PurposeQuestion[];
}

export interface PurposeTopic {
  id: string;
  emoji: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  lessons: PurposeLesson[];
}

export interface PurposeTrack {
  /** Storage key suffix, e.g. "business-english". */
  key: string;
  topics: PurposeTopic[];
}

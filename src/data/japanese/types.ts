/**
 * @file types.ts
 * @description Shared types for the expanded Japanese curriculum (N5 -> N4).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface JaPhrase {
  jp: string;
  romaji: string;
  vi: string;
  en: string;
}

export interface JaVocabTopic {
  topic: string;
  level: "N5" | "N4";
  items: JaPhrase[];
}

export interface JaKanji {
  kanji: string;
  on: string;
  kun: string;
  strokes: number;
  meaning_vi: string;
  meaning_en: string;
  compounds: string[];
  example: string;
}

export interface JaKanjiGroup {
  group: string;
  level: "N5" | "N4";
  items: JaKanji[];
}

export interface JaGrammarPoint {
  id: string;
  level: "N5" | "N4";
  title: string;
  formula: string;
  explain_vi: string;
  explain_en: string;
  examples: JaPhrase[];
  mistakes_vi: string[];
  mistakes_en: string[];
}

export interface JaDialogueLine {
  speaker: string;
  jp: string;
  romaji: string;
  vi: string;
  en: string;
}

export interface JaDialogue {
  title: string;
  scene: string;
  level: "N5" | "N4";
  lines: JaDialogueLine[];
  notes_vi: string[];
  notes_en: string[];
}

export type JaQuizKind = "meaning" | "particle" | "order" | "kanji" | "listening";

export interface JaQuizItem {
  kind: JaQuizKind;
  level: "N5" | "N4";
  q: string;
  /** Text read aloud for listening questions. */
  audio?: string;
  options: string[];
  answer: number;
  explain_vi: string;
  explain_en: string;
}

export interface JaExamQuestion {
  section: "vocab" | "kanji" | "grammar" | "reading";
  q: string;
  /** Optional reading passage attached to this question block. */
  passage?: string;
  options: string[];
  answer: number;
  explain_vi: string;
  explain_en: string;
}

export interface JaExam {
  id: string;
  title: string;
  level: "N5" | "N4";
  minutes: number;
  questions: JaExamQuestion[];
}

export interface JaCultureTopic {
  icon: string;
  title_vi: string;
  title_en: string;
  body_vi: string[];
  body_en: string[];
}

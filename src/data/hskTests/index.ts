/**
 * @file hskTests/index.ts
 * @description Authentic HSK 1-6 mock test bank, structured to mirror the
 * real Hanban / Chinese Testing International exam format.
 *
 * Real exam structure reference:
 *   HSK 1: Listening 20 + Reading 20                    (35 min)
 *   HSK 2: Listening 35 + Reading 25                    (50 min)
 *   HSK 3: Listening 40 + Reading 30 + Writing 10       (85 min)
 *   HSK 4: Listening 45 + Reading 40 + Writing 15       (100 min)
 *   HSK 5: Listening 45 + Reading 45 + Writing 10       (120 min)
 *   HSK 6: Listening 50 + Reading 50 + Writing 1 essay  (135 min)
 *
 * For pedagogical value we ship trimmed but representative mocks
 * (each section ~15-20 Q) so students can rehearse the format end-to-end
 * without burning out. The TTS engine (zh-CN) reads the audio prompts.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type HskQuestionType =
  | "listen-pic"   // Hear sentence, choose matching emoji/picture
  | "listen-tf"    // Hear sentence + see prompt, decide True/False
  | "listen-mcq"   // Hear dialog/sentence, choose correct option (text)
  | "read-pic"     // See sentence, choose matching emoji/picture
  | "read-tf"      // See prompt, decide True/False
  | "read-match"   // Match question to best response
  | "read-mcq"     // Read passage/sentence, choose correct answer
  | "read-fill"    // Cloze - fill the blank
  | "write-order"  // Re-order scrambled words into a sentence
  | "write-char";  // Choose correct character to fill blank

export interface HskOption {
  label: string;            // visible text or emoji
  pinyin?: string;
  vi?: string;
}

export interface HskQuestion {
  id: string;
  section: "listening" | "reading" | "writing";
  type: HskQuestionType;
  audio?: string;           // Chinese text spoken via TTS (listening)
  audioPinyin?: string;     // shown only in review/explanation
  prompt?: string;          // Chinese text the student reads
  promptPinyin?: string;    // optional pinyin hint (HSK 1-2 always shown)
  promptVi?: string;        // optional Vietnamese gloss for review
  options: HskOption[];
  correct: number;          // 0-based index into options
  explanation?: string;     // Vietnamese explanation shown after submit
  scrambled?: string[];     // for write-order
  answerSentence?: string;  // for write-order
}

export interface HskTestSection {
  id: "listening" | "reading" | "writing";
  nameVi: string;
  nameEn: string;
  description: string;
  questions: HskQuestion[];
}

export interface HskTest {
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  code: string;             // e.g. "HSK1-MOCK-01"
  title: string;
  titleVi: string;
  durationMin: number;
  passScore: number;        // 0-100
  showPinyin: boolean;      // true for HSK 1-2
  intro: string;
  introVi: string;
  sections: HskTestSection[];
}

import { hsk1Test } from "./hsk1";
import { hsk2Test } from "./hsk2";
import { hsk3Test } from "./hsk3";
import { hsk4Test } from "./hsk4";
import { hsk5Test } from "./hsk5";
import { hsk6Test } from "./hsk6";
import { hsk7Test } from "./hsk7";
import { hsk8Test } from "./hsk8";
import { hsk9Test } from "./hsk9";

export const HSK_TESTS: Record<number, HskTest> = {
  1: hsk1Test,
  2: hsk2Test,
  3: hsk3Test,
  4: hsk4Test,
  5: hsk5Test,
  6: hsk6Test,
  7: hsk7Test,
  8: hsk8Test,
  9: hsk9Test,
};

export const totalQuestions = (test: HskTest) =>
  test.sections.reduce((sum, s) => sum + s.questions.length, 0);

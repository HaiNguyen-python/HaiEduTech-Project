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
import { hsk1Mock2 } from "./hsk1Mock2";
import { hsk2Mock2 } from "./hsk2Mock2";
import { hsk3Mock2 } from "./hsk3Mock2";
import { hsk4Mock2 } from "./hsk4Mock2";
import { hsk5Mock2 } from "./hsk5Mock2";
import { hsk6Mock2 } from "./hsk6Mock2";
import { hsk7Mock2 } from "./hsk7Mock2";
import { hsk8Mock2 } from "./hsk8Mock2";
import { hsk9Mock2 } from "./hsk9Mock2";
import { hsk1Mock3 } from "./hsk1Mock3";
import { hsk2Mock3 } from "./hsk2Mock3";
import { hsk3Mock3 } from "./hsk3Mock3";
import { hsk4Mock3 } from "./hsk4Mock3";
import { hsk5Mock3 } from "./hsk5Mock3";
import { hsk6Mock3 } from "./hsk6Mock3";
import { hsk7Mock3 } from "./hsk7Mock3";
import { hsk8Mock3 } from "./hsk8Mock3";
import { hsk9Mock3 } from "./hsk9Mock3";
import { hsk1Mock4 } from "./hsk1Mock4";
import { hsk2Mock4 } from "./hsk2Mock4";
import { hsk3Mock4 } from "./hsk3Mock4";
import { hsk4Mock4 } from "./hsk4Mock4";
import { hsk5Mock4 } from "./hsk5Mock4";
import { hsk6Mock4 } from "./hsk6Mock4";
import { hsk7Mock4 } from "./hsk7Mock4";
import { hsk8Mock4 } from "./hsk8Mock4";
import { hsk9Mock4 } from "./hsk9Mock4";

/** All mock tests grouped by level. Each level can have multiple variants. */
export const HSK_TESTS_BY_LEVEL: Record<number, HskTest[]> = {
  1: [hsk1Test, hsk1Mock2, hsk1Mock3, hsk1Mock4],
  2: [hsk2Test, hsk2Mock2, hsk2Mock3, hsk2Mock4],
  3: [hsk3Test, hsk3Mock2, hsk3Mock3, hsk3Mock4],
  4: [hsk4Test, hsk4Mock2, hsk4Mock3, hsk4Mock4],
  5: [hsk5Test, hsk5Mock2, hsk5Mock3, hsk5Mock4],
  6: [hsk6Test, hsk6Mock2, hsk6Mock3, hsk6Mock4],
  7: [hsk7Test, hsk7Mock2, hsk7Mock3, hsk7Mock4],
  8: [hsk8Test, hsk8Mock2, hsk8Mock3, hsk8Mock4],
  9: [hsk9Test, hsk9Mock2, hsk9Mock3, hsk9Mock4],
};

/** Backward-compatible: default to the first (canonical) mock per level. */
export const HSK_TESTS: Record<number, HskTest> = Object.fromEntries(
  Object.entries(HSK_TESTS_BY_LEVEL).map(([lv, list]) => [lv, list[0]]),
);

/** Lookup a test by its unique code (e.g. "HSK3-MOCK-02"). */
export const findHskTestByCode = (code: string): HskTest | undefined => {
  for (const list of Object.values(HSK_TESTS_BY_LEVEL)) {
    const found = list.find((t) => t.code === code);
    if (found) return found;
  }
  return undefined;
};

export const totalQuestions = (test: HskTest) =>
  test.sections.reduce((sum, s) => sum + s.questions.length, 0);


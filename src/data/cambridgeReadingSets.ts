/**
 * @file cambridgeReadingSets.ts
 * @description Reading texts (with comprehension questions) authored for the
 *              older Cambridge papers that shipped without any reading text.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
export interface CambridgeReadingSetQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationVi: string;
}

export interface CambridgeReadingSet {
  passage: string;
  questions: CambridgeReadingSetQuestion[];
}

export const CAMBRIDGE_READING_SETS: Record<string, CambridgeReadingSet[]> = {};

/**
 * @file cambridgeReadingSetInjector.ts
 * @description The oldest Cambridge papers were written as standalone one-line
 *              items, so their Reading & Writing section had no text to read.
 *              This module prepends the authored reading texts (each shared by a
 *              group of consecutive questions) and renumbers the paper.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";
import { CAMBRIDGE_READING_SETS } from "./cambridgeReadingSets";

/**
 * Insert the exam's reading-text groups at the start of Reading & Writing and
 * renumber every question so ids stay sequential.
 */
export const withCambridgeReadingSets = (exam: CambridgeMockExam): CambridgeMockExam => {
  const sets = CAMBRIDGE_READING_SETS[exam.id];
  if (!sets || sets.length === 0) return exam;

  // Skip papers that already ship at least two reading-text groups of their own.
  let existingGroups = 0;
  for (let i = 0; i < exam.questions.length; i++) {
    const q = exam.questions[i];
    if (q.section === "Reading & Writing" && q.passage && exam.questions[i + 1]?.passage === q.passage) {
      existingGroups++;
      while (i + 1 < exam.questions.length && exam.questions[i + 1].passage === q.passage) i++;
    }
  }
  if (existingGroups >= 2) return exam;

  const injected: CambridgeMockQuestion[] = sets.flatMap((set) =>
    set.questions.map((q) => ({
      id: 0,
      section: "Reading & Writing" as const,
      passage: set.passage,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      explanationVi: q.explanationVi,
    }))
  );

  const reading = exam.questions.filter((q) => q.section === "Reading & Writing");
  const rest = exam.questions.filter((q) => q.section !== "Reading & Writing");

  const questions = [...injected, ...reading, ...rest].map((q, i) => ({ ...q, id: i + 1 }));

  return { ...exam, questions, totalQuestions: questions.length };
};

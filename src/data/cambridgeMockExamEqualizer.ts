/**
 * @file cambridgeMockExamEqualizer.ts
 * @description Every paper inside one Cambridge level must have the same number
 *              of questions, otherwise best-score percentages are not comparable
 *              between papers. Older papers were authored with 33-55 questions
 *              while the newer ones follow the official shape, so this module
 *              trims each paper down to the level target while keeping reading
 *              passage groups intact.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";

type SectionTarget = { reading: number; listening: number; duration: number };

/** Official-shaped target per level: Reading & Writing + Listening items. */
export const CAMBRIDGE_LEVEL_TARGETS: Record<string, SectionTarget> = {
  starters: { reading: 15, listening: 10, duration: 20 },
  movers: { reading: 15, listening: 10, duration: 25 },
  flyers: { reading: 18, listening: 10, duration: 30 },
  ket: { reading: 20, listening: 10, duration: 40 },
  pet: { reading: 21, listening: 10, duration: 45 },
};

/** Group consecutive questions that share the same reading passage. */
const toBlocks = (questions: CambridgeMockQuestion[]): CambridgeMockQuestion[][] => {
  const blocks: CambridgeMockQuestion[][] = [];
  for (const q of questions) {
    const last = blocks[blocks.length - 1];
    if (last && q.passage && last[0].passage === q.passage) last.push(q);
    else blocks.push([q]);
  }
  return blocks;
};

/** Take exactly `limit` questions, preferring whole passage groups. */
const trimSection = (questions: CambridgeMockQuestion[], limit: number): CambridgeMockQuestion[] => {
  if (questions.length <= limit) return questions;
  const blocks = toBlocks(questions);
  const kept: CambridgeMockQuestion[] = [];
  const leftovers: CambridgeMockQuestion[] = [];

  for (const block of blocks) {
    if (kept.length + block.length <= limit) kept.push(...block);
    else leftovers.push(...block);
  }
  // Top up with single items if whole groups could not fill the target exactly.
  for (const q of leftovers) {
    if (kept.length >= limit) break;
    kept.push(q);
  }
  return kept.slice(0, limit);
};

export const equalizeCambridgeMockExam = (exam: CambridgeMockExam): CambridgeMockExam => {
  const target = CAMBRIDGE_LEVEL_TARGETS[exam.level];
  if (!target) return exam;

  const reading = trimSection(
    exam.questions.filter((q) => q.section === "Reading & Writing"),
    target.reading
  );
  const listening = trimSection(
    exam.questions.filter((q) => q.section === "Listening"),
    target.listening
  );

  const questions = [...reading, ...listening].map((q, i) => ({ ...q, id: i + 1 }));

  return {
    ...exam,
    duration: target.duration,
    questions,
    totalQuestions: questions.length,
  };
};

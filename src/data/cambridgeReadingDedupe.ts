/**
 * @file cambridgeReadingDedupe.ts
 * @description Rewrites the Reading & Writing stems that appeared word for word
 *              in more than one paper, so a student working through several tests
 *              never meets the same sentence twice. Only the wording changes:
 *              options, keys and question ids stay exactly as they were, so saved
 *              progress and the CEFR scale are unaffected.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam } from "./cambridgeMockExamData";

/** `examId:questionId` -> new stem for the repeated wording. */
const STEM_OVERRIDES: Record<string, string> = {
  "cambridge-starters-18:5": "Look at the cat. What colour is it?",
  "cambridge-starters-16:8": "Which thing does Tom like best?",
  "cambridge-starters-16:15": "When you eat ice cream, it feels ___.",
  "cambridge-pet-5:8": "Which environmental point does the writer make?",
  "cambridge-pet-16:12": "What is the main objection of the critics?",
  "cambridge-starters-12:1": "How is the weather today?",
  "cambridge-starters-17:1": "What can you say about the weather today?",
  "cambridge-starters-17:7": "Look at the coat. What colour is it?",
  "cambridge-starters-17:11": "In the daytime, the sun is ___.",
  "cambridge-starters-17:12": "When you touch snow, it is ___.",
  "cambridge-movers-20:6": "When do the music club members meet?",
  "cambridge-starters-18:10": "The mother of my mother is my ___.",
  "cambridge-starters-7:1": "We make hot food in the ___.",
  "cambridge-starters-18:12": "At night we sleep in the ___.",
  "cambridge-starters-20:11": "We look at things with our ___.",
  "cambridge-starters-20:10": "We listen to music with our ___.",
  "cambridge-ket-6:17": "The shop that sells fresh bread is a ___.",
  "cambridge-movers-15:2": "In autumn, what do the leaves do?",
  "cambridge-flyers-17:6": "What gives Mars its red colour?",
  "cambridge-starters-15:3": "Look at the ball. What colour is it?",
  "cambridge-starters-19:6": "Count the chairs in the classroom. How many are there?",
  "cambridge-starters-19:8": "Look at the board in the classroom. What colour is it?",
};

/** Give repeated reading stems a unique wording per paper. */
export const dedupeCambridgeReadingStems = (exam: CambridgeMockExam): CambridgeMockExam => {
  let changed = false;
  const questions = exam.questions.map(q => {
    if (q.section !== "Reading & Writing") return q;
    const next = STEM_OVERRIDES[`${exam.id}:${q.id}`];
    if (!next || next === q.question) return q;
    changed = true;
    return { ...q, question: next };
  });
  return changed ? { ...exam, questions } : exam;
};

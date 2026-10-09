/**
 * @file ieltsReadingShuffle.ts
 * @description Makes the reading papers behave like authentic Cambridge papers:
 *   1) Matching-headings questions share ONE list that always contains extra
 *      distractor headings, so students cannot solve by elimination.
 *   2) The correct label is de-biased (never always "i").
 *   3) Authored task order and source question identity are preserved.
 * All randomness is deterministic (seeded by exam id) so the paper is stable
 * across renders, reloads and review mode.
 */
import type { ReadingExam, ReadingQuestion } from "@/data/ieltsFullReadingExams";
import { READING_HEADING_DISTRACTORS, READING_HEADING_OVERRIDES } from "@/data/ieltsReadingHeadingDistractors";

// Small deterministic PRNG (mulberry32)
const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const hashString = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const LABELS = [
  "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x",
  "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "xix", "xx",
];

const shuffled = <T,>(arr: T[], rng: () => number): T[] => {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

/** Keep every correct heading and a compact selection of authored distractors.
 * Two or three extras is our practice-paper choice, not an IELTS-mandated count.
 * Never pad a paper with unrelated generic headings or shuffle task order.
 */
const rebuildHeadings = (exam: ReadingExam, rng: () => number): ReadingQuestion[] => {
  const hQs = exam.questions.filter((q) => q.type === "matching-headings" && q.headings?.length);
  if (!hQs.length) return exam.questions;

  // Correct heading text per question (by its current answer label).
  const correctText = new Map<number, string>();
  const pool = new Map<string, true>();
  const override = READING_HEADING_OVERRIDES[exam.id];
  for (const q of hQs) {
    if (!override) for (const h of q.headings ?? []) pool.set(h.text, true);
    const hit = q.headings?.find((h) => h.label === q.answer);
    const paragraph = q.prompt.match(/Paragraph\s+([A-Z])/i)?.[1];
    const text = (paragraph ? override?.byParagraph[paragraph] : undefined) ?? hit?.text;
    if (text) correctText.set(q.number, text);
  }
  for (const text of override?.distractors ?? []) pool.set(text, true);

  const correct = new Set(correctText.values());
  for (const text of READING_HEADING_DISTRACTORS[exam.id] ?? []) pool.set(text, true);
  const distractors = shuffled([...pool.keys()].filter(text => !correct.has(text)), rng).slice(0, 2 + (hashString(exam.id) % 2));
  const list = shuffled([...correct, ...distractors], rng)
    .map((text, idx) => ({ label: LABELS[idx] ?? String(idx + 1), text }));

  const labelOf = (text: string) => list.find((h) => h.text === text)?.label;

  return exam.questions.map((q) => {
    if (q.type !== "matching-headings" || !q.headings?.length) return q;
    const text = correctText.get(q.number);
    const answer = (text && labelOf(text)) || q.answer;
    return { ...q, headings: list, answer };
  });
};

export const shuffleHeadingsInExam = (exam: ReadingExam): ReadingExam => {
  const rng = mulberry32(hashString(exam.id));
  const questions = rebuildHeadings(exam, rng);
  return { ...exam, questions };
};

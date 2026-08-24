/**
 * @file ieltsReadingShuffle.ts
 * @description Makes the reading papers behave like authentic Cambridge papers:
 *   1) Matching-headings questions share ONE list that always contains extra
 *      distractor headings, so students cannot solve by elimination.
 *   2) The correct label is de-biased (never always "i").
 *   3) Question GROUPS are re-ordered per exam so answers no longer run in a
 *      predictable paragraph A -> B -> C -> D sequence.
 * All randomness is deterministic (seeded by exam id) so the paper is stable
 * across renders, reloads and review mode.
 */
import type { ReadingExam, ReadingQuestion, ReadingQuestionType } from "@/data/ieltsFullReadingExams";

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

/** Generic distractor headings: plausible academic phrasings that fit no paragraph. */
const DISTRACTOR_HEADINGS = [
  "An unexpected commercial application",
  "Comparisons with a neighbouring region",
  "A method that was later abandoned",
  "Conflicting interpretations of the same evidence",
  "The role of amateur enthusiasts",
  "Predictions that proved inaccurate",
  "A change in official terminology",
  "Funding difficulties in the early years",
  "Lessons drawn from an unrelated field",
  "Why the debate remains unresolved",
];

const shuffled = <T,>(arr: T[], rng: () => number): T[] => {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

/** Rebuild the shared heading list with >= 3 distractors and re-label everything. */
const rebuildHeadings = (exam: ReadingExam, rng: () => number): ReadingQuestion[] => {
  const hQs = exam.questions.filter((q) => q.type === "matching-headings" && q.headings?.length);
  if (!hQs.length) return exam.questions;

  // Correct heading text per question (by its current answer label).
  const correctText = new Map<number, string>();
  const pool = new Map<string, true>();
  for (const q of hQs) {
    for (const h of q.headings!) pool.set(h.text, true);
    const hit = q.headings!.find((h) => h.label === q.answer);
    if (hit) correctText.set(q.number, hit.text);
  }

  const needed = hQs.length + 3;
  const texts = [...pool.keys()];
  const extras = shuffled(DISTRACTOR_HEADINGS, rng).filter((d) => !pool.has(d));
  let i = 0;
  while (texts.length < needed && i < extras.length) texts.push(extras[i++]);

  const list = shuffled(texts, rng)
    .slice(0, Math.max(needed, texts.length))
    .map((text, idx) => ({ label: LABELS[idx] ?? String(idx + 1), text }));

  const labelOf = (text: string) => list.find((h) => h.text === text)?.label;

  return exam.questions.map((q) => {
    if (q.type !== "matching-headings" || !q.headings?.length) return q;
    const text = correctText.get(q.number);
    const answer = (text && labelOf(text)) || q.answer;
    return { ...q, headings: list, answer };
  });
};

/**
 * Re-order question groups (contiguous runs of the same type) so answers do not
 * appear in passage order, then renumber 1..N for the navigation matrix.
 */
const reorderGroups = (questions: ReadingQuestion[], rng: () => number): ReadingQuestion[] => {
  if (questions.length < 6) return questions;
  const groups: { type: ReadingQuestionType; items: ReadingQuestion[] }[] = [];
  for (const q of questions) {
    const last = groups[groups.length - 1];
    if (last && last.type === q.type) last.items.push(q);
    else groups.push({ type: q.type, items: [q] });
  }
  if (groups.length < 2) return questions;

  // Matching-headings must stay as one block, but it should not always be first.
  const order = shuffled(groups, rng);
  const flat = order.flatMap((g) => g.items);
  return flat.map((q, idx) => ({ ...q, number: idx + 1 }));
};

export const shuffleHeadingsInExam = (exam: ReadingExam): ReadingExam => {
  const rng = mulberry32(hashString(exam.id));
  let questions = rebuildHeadings(exam, rng);
  questions = reorderGroups(questions, rng);
  return { ...exam, questions };
};

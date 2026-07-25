/**
 * @file ieltsReadingShuffle.ts
 * @description De-biases matching-headings questions so the correct answer
 * label is not always "i". Uses a deterministic seeded shuffle keyed by
 * examId + question number so the order is stable across renders/reloads
 * but varies from question to question.
 */
import type { ReadingExam, ReadingQuestion } from "@/data/ieltsFullReadingExams";

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

const LABELS = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];

export const shuffleHeadingsInExam = (exam: ReadingExam): ReadingExam => {
  const questions: ReadingQuestion[] = exam.questions.map((q) => {
    if (q.type !== "matching-headings" || !q.headings || q.headings.length < 2) return q;
    // Find the correct heading text using current answer label
    const correct = q.headings.find((h) => h.label === q.answer);
    if (!correct) return q;
    const rng = mulberry32(hashString(`${exam.id}#${q.number}`));
    const shuffled = [...q.headings];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const relabelled = shuffled.map((h, idx) => ({
      label: LABELS[idx] ?? String(idx + 1),
      text: h.text,
    }));
    const newAnswerEntry = relabelled.find((h) => h.text === correct.text);
    return {
      ...q,
      headings: relabelled,
      answer: newAnswerEntry?.label ?? q.answer,
    };
  });
  return { ...exam, questions };
};

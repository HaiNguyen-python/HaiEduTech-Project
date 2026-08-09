/**
 * @file cambridgeMockExamNormalizer.ts
 * @description Quality pass over the Cambridge Test Prep mock exams.
 *              Two problems are fixed deterministically (no randomness, so a
 *              student always sees the same paper):
 *                1. Answer-key bias - 55% of correct answers sat on option B.
 *                   Options are rotated per question so keys spread across A-D.
 *                2. Thin feedback - many questions had a 1-3 word explanation and
 *                   no Vietnamese version, so after submitting students learned
 *                   nothing. Short explanations are expanded and a Vietnamese
 *                   explanation is always provided.
 * @copyright 2026 HaiEduTech, ILC.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";

const MIN_EXPLANATION = 40;

const hash = (value: string) => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

const SECTION_HINT: Record<CambridgeMockQuestion["section"], { en: string; vi: string }> = {
  Listening: {
    en: "In Listening, the answer is the exact word or number the speaker says - the other options are distractors mentioned nearby or that only sound similar.",
    vi: "Ở phần Nghe, đáp án là đúng từ hoặc số người nói phát âm - các lựa chọn khác là bẫy được nhắc gần đó hoặc nghe na ná.",
  },
  "Reading & Writing": {
    en: "In Reading & Writing, underline the words in the text that prove the answer; if you cannot point to them, you are guessing.",
    vi: "Ở phần Đọc - Viết, hãy gạch chân đúng những từ trong bài chứng minh đáp án; nếu không chỉ ra được thì bạn đang đoán.",
  },
  Speaking: {
    en: "In Speaking, the best answer is the one that is natural, on topic and gives a short reason instead of a single word.",
    vi: "Ở phần Nói, câu trả lời tốt nhất là câu tự nhiên, đúng chủ đề và có kèm lý do ngắn thay vì chỉ một từ.",
  },
};

/** Rotate the option list so the correct key is spread across A-D. */
const rebalance = (q: CambridgeMockQuestion, seed: string): CambridgeMockQuestion => {
  const n = q.options.length;
  if (n < 2 || q.correctAnswer < 0 || q.correctAnswer >= n) return q;
  const target = hash(`${seed}-${q.id}-${q.question}`) % n;
  if (target === q.correctAnswer) return q;
  const options = [...q.options];
  [options[q.correctAnswer], options[target]] = [options[target], options[q.correctAnswer]];
  return { ...q, options, correctAnswer: target };
};

/** Guarantee useful after-submit feedback in English and Vietnamese. */
const enrichExplanation = (q: CambridgeMockQuestion): CambridgeMockQuestion => {
  const correct = q.options[q.correctAnswer] ?? "";
  const hint = SECTION_HINT[q.section] ?? SECTION_HINT["Reading & Writing"];
  const base = (q.explanation || "").trim();

  const explanation =
    base.length >= MIN_EXPLANATION
      ? base
      : `${base ? `${base} ` : ""}The correct answer is "${correct}". ${hint.en}`;

  const explanationVi =
    q.explanationVi && q.explanationVi.trim().length >= 20
      ? q.explanationVi
      : `Đáp án đúng là "${correct}". ${hint.vi}`;

  return { ...q, explanation, explanationVi };
};

export const normalizeCambridgeMockExam = (exam: CambridgeMockExam): CambridgeMockExam => {
  const questions = exam.questions
    .filter(Boolean)
    .map((q) => enrichExplanation(rebalance(q, exam.id)));

  return { ...exam, questions, totalQuestions: questions.length };
};

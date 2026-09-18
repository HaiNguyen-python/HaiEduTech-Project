/**
 * @file cambridgeReadingLogicFix.ts
 * @description Logic pass over the Reading & Writing items of the Cambridge mock
 *              papers. A few legacy items could not be answered by reasoning from
 *              the item itself: the stem asked for outside world knowledge, the
 *              key was not actually true, or the stem did not match the wording of
 *              its own reading text. They are rewritten here, keyed by
 *              examId:questionId so ids, order and saved progress never change.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";

interface LogicFix {
  question?: string;
  options?: string[];
  /** Text of the correct option after the rewrite. */
  correct?: string;
  explanation?: string;
  explanationVi?: string;
}

const FIXES: Record<string, LogicFix> = {
  // "What is the biggest animal?" is not true of an elephant (a blue whale is
  // bigger), so the stem is limited to the four animals in the options.
  "cambridge-starters-1:15": {
    question: "Which of these animals is the biggest?",
    explanation: "Of a cat, an elephant, a dog and a mouse, the elephant is the biggest animal.",
    explanationVi: "Trong bốn con vật cho sẵn (mèo, voi, chó, chuột), voi là con to nhất.",
  },
  // Rainfall by season is not the same in every country, so the old key was not
  // safely true. The item now tests a fact the level does teach.
  "cambridge-movers-2:14": {
    question: "In which season do the leaves turn yellow and fall from the trees?",
    options: ["Summer", "Spring", "Winter", "Autumn"],
    correct: "Autumn",
    explanation: "In autumn the leaves turn yellow and brown and fall from the trees.",
    explanationVi: "Vào mùa thu, lá chuyển vàng, nâu rồi rụng khỏi cây.",
  },
  // The text says the children start school at 8 AM; the old stem asked about
  // leaving home, which the text puts at a different, unstated time.
  "cambridge-movers-1:9": {
    question: "What time do the children in the survey start school?",
    explanation: "The survey says: the children start school at 8 AM.",
    explanationVi: "Bài khảo sát cho biết các bạn học sinh bắt đầu vào học lúc 8 AM.",
  },
  // "Which one is good for you?" was too vague: several foods can be good.
  "cambridge-movers-23:15": {
    question: "Which of these is the healthiest food to eat every day?",
    explanation: "Fresh fruit is the healthy choice; cakes, sweets and fizzy drinks have a lot of sugar.",
    explanationVi: "Trái cây tươi là lựa chọn lành mạnh; bánh ngọt, kẹo và nước có ga chứa nhiều đường.",
  },
  // Hostels are cheaper accommodation; the other options are not places to stay,
  // so the stem now says that explicitly.
  "cambridge-ket-5:16": {
    question: "Which of these places can you sleep in for less money than a hotel?",
    explanation: "A hostel is a place to stay that costs less than a hotel; a station, an airport and a museum are not places to sleep.",
    explanationVi: "Hostel là nơi lưu trú rẻ hơn khách sạn; nhà ga, sân bay và viện bảo tàng không phải chỗ ngủ.",
  },
};

/** Rewrite the flagged items, keeping every id and the question order. */
export const fixCambridgeReadingLogic = (exam: CambridgeMockExam): CambridgeMockExam => {
  let changed = false;
  const questions: CambridgeMockQuestion[] = exam.questions.map((q) => {
    const fix = FIXES[`${exam.id}:${q.id}`];
    if (!fix) return q;
    changed = true;
    const options = fix.options ?? q.options;
    const correctAnswer = fix.correct ? Math.max(0, options.indexOf(fix.correct)) : q.correctAnswer;
    return {
      ...q,
      question: fix.question ?? q.question,
      options,
      correctAnswer,
      explanation: fix.explanation ?? q.explanation,
      explanationVi: fix.explanationVi ?? q.explanationVi,
    };
  });
  return changed ? { ...exam, questions } : exam;
};

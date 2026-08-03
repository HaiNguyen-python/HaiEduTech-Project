/**
 * @file swedishQuizShuffle.ts
 * @description Deterministic option shuffling for Swedish lesson quizzes.
 *              The authored data leans heavily on option B as the correct
 *              answer, which lets learners guess. A stable hash of the quiz
 *              key gives every question a fixed but evenly spread order, so
 *              the correct answer lands on A/B/C/D roughly equally while the
 *              rendered order never changes between renders.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

const hash = (key: string): number => {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export interface ShuffledQuiz<T> {
  options: T[];
  optionsEn?: T[];
  answer: number;
}

/**
 * Shuffle options (and their English mirror) with a seeded Fisher-Yates,
 * returning the new index of the correct answer.
 */
export const shuffleQuizOptions = <T>(
  key: string,
  options: T[],
  answer: number,
  optionsEn?: T[],
): ShuffledQuiz<T> => {
  const order = options.map((_, i) => i);
  let seed = hash(key) || 1;
  const next = () => {
    // xorshift32 keeps the sequence stable across browsers.
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    options: order.map((i) => options[i]),
    optionsEn: optionsEn && optionsEn.length === options.length ? order.map((i) => optionsEn[i]) : undefined,
    answer: order.indexOf(answer),
  };
};

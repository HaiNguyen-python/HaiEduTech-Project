export interface PteObjectiveResult {
  correct: number;
  incorrect: number;
  rawScore: number;
  maxScore: number;
  accuracy: number;
}

export const scoreSingleAnswer = (selected: number | null, correctIndex: number): PteObjectiveResult => {
  const correct = selected === correctIndex ? 1 : 0;
  return { correct, incorrect: correct ? 0 : 1, rawScore: correct, maxScore: 1, accuracy: correct * 100 };
};

export const scoreMultipleAnswers = (selected: number[], correctIndices: number[]): PteObjectiveResult => {
  const expected = new Set(correctIndices);
  const correct = selected.filter(index => expected.has(index)).length;
  const incorrect = selected.filter(index => !expected.has(index)).length;
  const rawScore = Math.max(0, correct - incorrect);
  const maxScore = correctIndices.length;
  return { correct, incorrect, rawScore, maxScore, accuracy: maxScore ? (rawScore / maxScore) * 100 : 0 };
};

export const scoreHighlightedWords = (selected: number[], incorrectIndices: number[]): PteObjectiveResult =>
  scoreMultipleAnswers(selected, incorrectIndices);

export const scoreReorderPairs = (order: number[], correctOrder: number[]): PteObjectiveResult => {
  const pairs = new Set(correctOrder.slice(0, -1).map((value, index) => `${value}:${correctOrder[index + 1]}`));
  const actual = new Set(order.slice(0, -1).map((value, index) => `${value}:${order[index + 1]}`));
  const correct = [...actual].filter(pair => pairs.has(pair)).length;
  const maxScore = pairs.size;
  return { correct, incorrect: actual.size - correct, rawScore: correct, maxScore, accuracy: maxScore ? correct / maxScore * 100 : 0 };
};

export const objectiveAccuracyToEstimate = (accuracy: number): number =>
  Math.round(10 + Math.max(0, Math.min(100, accuracy)) * 0.8);
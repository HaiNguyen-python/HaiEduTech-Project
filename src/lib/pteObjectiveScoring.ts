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

export const objectiveAccuracyToEstimate = (accuracy: number): number =>
  Math.round(10 + Math.max(0, Math.min(100, accuracy)) * 0.8);
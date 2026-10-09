import { describe, expect, it } from "vitest";
import { objectiveAccuracyToEstimate, scoreHighlightedWords, scoreMultipleAnswers, scoreSingleAnswer } from "@/lib/pteObjectiveScoring";

describe("PTE objective scoring", () => {
  it("awards one point only for the correct single answer", () => {
    expect(scoreSingleAnswer(2, 2)).toMatchObject({ rawScore: 1, maxScore: 1, accuracy: 100 });
    expect(scoreSingleAnswer(1, 2)).toMatchObject({ rawScore: 0, maxScore: 1, accuracy: 0 });
  });

  it("applies negative marking without allowing a score below zero", () => {
    expect(scoreMultipleAnswers([0, 1, 3], [0, 1])).toMatchObject({ correct: 2, incorrect: 1, rawScore: 1, maxScore: 2, accuracy: 50 });
    expect(scoreMultipleAnswers([2, 3], [0, 1])).toMatchObject({ rawScore: 0, accuracy: 0 });
  });

  it("uses the same partial-credit rule for highlighted incorrect words", () => {
    expect(scoreHighlightedWords([1, 4, 7], [1, 4, 6])).toMatchObject({ correct: 2, incorrect: 1, rawScore: 1, maxScore: 3 });
  });

  it("keeps practice estimates inside the 10-90 range", () => {
    expect(objectiveAccuracyToEstimate(0)).toBe(10);
    expect(objectiveAccuracyToEstimate(50)).toBe(50);
    expect(objectiveAccuracyToEstimate(100)).toBe(90);
  });
});
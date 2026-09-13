import { beforeEach, describe, expect, it } from "vitest";
import {
  getPhraseExample,
  normalizePhraseSpeakingGrade,
  phrasePracticeId,
  savePhraseSpeakingResult,
  PHRASE_SPEAKING_STORAGE_KEY,
} from "@/lib/ieltsSpeakingPhrasePractice";
import { safeStorage } from "@/lib/safeStorage";

describe("IELTS phrase speaking practice", () => {
  beforeEach(() => safeStorage.remove(PHRASE_SPEAKING_STORAGE_KEY));

  it("creates complete examples for phrase patterns", () => {
    expect(getPhraseExample("To pursue a career in...", "Work & Study", 1)).toContain("pursue a career in educational technology");
    expect(getPhraseExample("Broaden one's horizons", "Travel", 2)).not.toContain("one's");
    expect(getPhraseExample("In the long run", "Environment", 3)).toMatch(/[.!?]$/);
  });

  it("normalizes an AI grade and clamps scores", () => {
    const grade = normalizePhraseSpeakingGrade({
      overall: 108,
      phraseUsedCorrectly: true,
      criteria: [{ label: "Grammar", score: 76.4, feedback: "Clear sentence." }],
      feedback: "Good work.",
      correction: "",
      upgradedSentence: "I meet every deadline by planning ahead.",
    });
    expect(grade?.overall).toBe(100);
    expect(grade?.criteria[0].score).toBe(76);
  });

  it("stores attempts while preserving the best score", () => {
    const id = phrasePracticeId(1, "Work", "meet deadlines");
    expect(savePhraseSpeakingResult(id, 84)).toMatchObject({ bestScore: 84, attempts: 1 });
    expect(savePhraseSpeakingResult(id, 62)).toMatchObject({ bestScore: 84, attempts: 2 });
  });
});

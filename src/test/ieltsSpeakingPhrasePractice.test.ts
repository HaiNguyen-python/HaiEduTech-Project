import { beforeEach, describe, expect, it } from "vitest";
import {
  getPhraseExample,
  getHighlightedExampleParts,
  getStructureExample,
  normalizePhraseSpeakingGrade,
  phraseAppearsInTranscript,
  phrasePracticeId,
  structureAppearsInTranscript,
  structurePracticeId,
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
      criteria: ["Phrase use", "Grammar", "Naturalness", "Recognition clarity"].map((label) => ({ label, score: 76.4, feedback: "Clear sentence." })),
      feedback: "Good work.",
      correction: "",
      upgradedSentence: "I meet every deadline by planning ahead.",
    });
    expect(grade?.overall).toBe(100);
    expect(grade?.criteria[0].score).toBe(76);
  });

  it("requires all four grading criteria", () => {
    expect(normalizePhraseSpeakingGrade({ overall: 70, criteria: [], upgradedSentence: "A better sentence." })).toBeNull();
  });

  it("recognizes reasonable phrase variations without substring false positives", () => {
    expect(phraseAppearsInTranscript("To meet deadlines", "I always meet my deadlines by planning ahead")).toBe(true);
    expect(phraseAppearsInTranscript("A hands-on approach", "Our course takes a practical approach to science")).toBe(false);
    expect(phraseAppearsInTranscript("To broaden one's horizons", "Travelling has broadened my horizons")).toBe(true);
  });

  it("builds complete structure examples and identifies fixed language", () => {
    const structure = "What I enjoy most about... is the fact that...";
    const example = getStructureExample(structure, "Work & Study", 1);
    expect(example).not.toContain("...");
    expect(example).toContain("What I enjoy most about");
    expect(structureAppearsInTranscript(structure, "What I enjoy most about my course is the supportive environment")).toBe(true);
    expect(structurePracticeId(1, "Work", structure)).toContain("structure|1|work|");
  });

  it("returns safe highlighted text parts for phrase examples", () => {
    const parts = getHighlightedExampleParts("I hope to pursue a career in technology.", "To pursue a career in");
    expect(parts.some((part) => part.highlighted && part.text.toLowerCase().includes("pursue a career in"))).toBe(true);
    expect(parts.map((part) => part.text).join("")).toBe("I hope to pursue a career in technology.");
  });

  it("stores attempts while preserving the best score", () => {
    const id = phrasePracticeId(1, "Work", "meet deadlines");
    expect(savePhraseSpeakingResult(id, 84)).toMatchObject({ bestScore: 84, attempts: 1 });
    expect(savePhraseSpeakingResult(id, 62)).toMatchObject({ bestScore: 84, attempts: 2 });
  });
});

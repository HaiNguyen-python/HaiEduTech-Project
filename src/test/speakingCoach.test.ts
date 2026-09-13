import { describe, expect, it } from "vitest";
import { compareSentence, matchCandidate } from "@/lib/speakingModeShared";
import { normalizeFreeTalkReport } from "@/lib/freeTalkReport";
import { getSpeakingThemeIllustration } from "@/data/speakingCoachThemeIllustrations";

describe("Speaking Coach safeguards", () => {
  it("grades Nordic diacritics and CJK units consistently", () => {
    expect(compareSentence("hyvä päivä", "hyvä päivä", "finnish").accuracy).toBe(100);
    expect(compareSentence("你好世界", "你好世界", "chinese").accuracy).toBe(100);
  });

  it("matches a minimal-pair candidate", () => {
    expect(matchCandidate("ship", "ship", "sheep", "english")).toBe("a");
    expect(matchCandidate("sheep", "ship", "sheep", "english")).toBe("b");
  });

  it("normalizes partial AI reports without throwing", () => {
    expect(normalizeFreeTalkReport({ score: "84", strengths: ["Clear pace", null] })).toEqual({
      score: 84,
      fluency: "",
      vocabulary: "",
      grammarFixes: [],
      strengths: ["Clear pace"],
      modelAnswer: "",
      followUps: [],
    });
    expect(normalizeFreeTalkReport(null)).toBeNull();
  });

  it("provides a themed illustration with a safe default", () => {
    expect(getSpeakingThemeIllustration({ id: "en-travel", name: "Travel", nameVi: "Du lịch" }).altEn).toContain("traveller");
    expect(getSpeakingThemeIllustration({ id: "unknown", name: "Other", nameVi: "Khác" }).src).toBeTruthy();
  });
});
import { describe, expect, it } from "vitest";
import { compareSentence, matchCandidate } from "@/lib/speakingModeShared";
import { normalizeFreeTalkReport } from "@/lib/freeTalkReport";
import { getSpeakingThemeIllustration } from "@/data/speakingCoachThemeIllustrations";
import { classifySoundTip, shouldRecordWeakSound, splitWordDifference } from "@/lib/soundDrillCoach";
import { buildFreeTalkQuickReport, splitGrammarFix } from "@/lib/freeTalkPractice";
import { sortWeakWords } from "@/lib/weakWordCoach";

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

  it("highlights safe Latin minimal-pair differences", () => {
    expect(splitWordDifference("think", "sink")).toEqual({ prefix: "", focus: "th", suffix: "ink" });
    expect(splitWordDifference("是", "四")).toBeNull();
  });

  it("classifies coaching tips and records only unresolved weak sounds", () => {
    expect(classifySoundTip("/θ/ vs /s/", "Đặt lưỡi gần răng", "Put the tongue near the teeth")).toBe("tongue");
    expect(shouldRecordWeakSound(true)).toBe(false);
    expect(shouldRecordWeakSound(false)).toBe(true);
  });

  it("builds deterministic Free Talk feedback and parses actionable fixes", () => {
    const report = buildFreeTalkQuickReport("I enjoy learning because it is useful", "english", 6000, { english: ["um"] });
    expect(report.words).toBe(7);
    expect(report.durationSec).toBe(6);
    expect(splitGrammarFix("I go yesterday -> I went yesterday")).toEqual({ original: "I go yesterday", improved: "I went yesterday" });
  });

  it("prioritises due weak words and supports source filters", () => {
    const words = [
      { word: "ship", misses: 2, clean: 0, lastSeen: "2026-09-12", dueOn: "2026-09-13", source: "drill" as const },
      { word: "sheep", misses: 4, clean: 0, lastSeen: "2026-09-12", dueOn: "2026-09-12", source: "shadow" as const },
    ];
    expect(sortWeakWords(words)[0].word).toBe("sheep");
    expect(sortWeakWords(words, "drill")).toHaveLength(1);
  });
});
import { describe, expect, it } from "vitest";
import { compareSentence, matchCandidate } from "@/lib/speakingModeShared";
import { normalizeFreeTalkReport } from "@/lib/freeTalkReport";
import { getSpeakingThemeIllustration } from "@/data/speakingCoachThemeIllustrations";
import { classifySoundTip, shouldRecordWeakSound, splitWordDifference } from "@/lib/soundDrillCoach";
import { buildFreeTalkQuickReport, splitGrammarFix } from "@/lib/freeTalkPractice";
import { sortWeakWords } from "@/lib/weakWordCoach";
import { mergeSpeakingThemes } from "@/data/speakingCoachMerge";
import { speakingCoachLanguages } from "@/data/speakingCoachData";
import { DRILL_LEVELS, fillSentence, getPatterns, splitDrillFrame } from "@/data/patternDrills";

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

  it("merges duplicate themes and labels names shared across levels", () => {
    const merged = mergeSpeakingThemes([
      { id: "t-food", name: "Food", nameVi: "Ẩm thực", level: "A1", sentences: [{ id: "a1", text: "I like rice" }] },
      { id: "t-food-v2", name: "Food", nameVi: "Ẩm thực", level: "A1", sentences: [{ id: "a2", text: "I like rice" }, { id: "a3", text: "I cook at home" }] },
      { id: "t-food-b1", name: "Food", nameVi: "Ẩm thực", level: "B1", sentences: [{ id: "b1", text: "Street food shapes culture" }] },
    ]);
    expect(merged).toHaveLength(2);
    expect(merged[0].id).toBe("t-food");
    expect(merged[0].sentences.map((s) => s.id)).toEqual(["a1", "a3"]);
    expect(merged[0].nameVi).toBe("Ẩm thực (A1)");
    expect(merged[1].name).toBe("Food (B1)");
  });

  it("keeps every Speaking Coach theme name unique per language", () => {
    for (const cfg of Object.values(speakingCoachLanguages)) {
      const names = cfg.themes.map((t) => t.nameVi.toLocaleLowerCase().trim());
      expect(new Set(names).size).toBe(names.length);
    }
  });

  it("never repeats the same practice sentence within a language", () => {
    for (const [language, cfg] of Object.entries(speakingCoachLanguages)) {
      const seen = new Map<string, string>();
      for (const theme of cfg.themes) {
        for (const sentence of theme.sentences) {
          const key = sentence.text.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
          if (!key) continue;
          expect(seen.has(key), `${language}: ${seen.get(key)} / ${sentence.id} share text "${sentence.text}"`).toBe(false);
          seen.set(key, sentence.id);
        }
      }
    }
  });

  it("prioritises due weak words and supports source filters", () => {
    const words = [
      { word: "ship", misses: 2, clean: 0, lastSeen: "2026-09-12", dueOn: "2026-09-13", source: "drill" as const },
      { word: "sheep", misses: 4, clean: 0, lastSeen: "2026-09-12", dueOn: "2026-09-12", source: "shadow" as const },
    ];
    expect(sortWeakWords(words)[0].word).toBe("sheep");
    expect(sortWeakWords(words, "drill")).toHaveLength(1);
  });

  it("keeps Pattern Drilling balanced from Starter through C1", () => {
    expect(DRILL_LEVELS.map((level) => level.key)).toEqual(["starter", "a1", "a2", "b1", "b2", "c1"]);
    for (const language of ["english", "chinese"]) {
      const patterns = getPatterns(language);
      expect(patterns).toHaveLength(90);
      expect(new Set(patterns.map((pattern) => pattern.id)).size).toBe(90);
      const sentences = new Set<string>();
      for (const level of DRILL_LEVELS) {
        expect(patterns.filter((pattern) => pattern.level === level.key), `${language} ${level.key}`).toHaveLength(15);
      }
      for (const pattern of patterns) {
        expect(pattern.frame.match(/___/g), `${pattern.id} target frame`).toHaveLength(1);
        expect(pattern.frameVi.match(/___/g), `${pattern.id} Vietnamese frame`).toHaveLength(1);
        expect(pattern.fills, `${pattern.id} substitutions`).toHaveLength(5);
        if (language === "chinese") {
          expect(pattern.framePy?.match(/___/g), `${pattern.id} Pinyin frame`).toHaveLength(1);
        }
        for (const fill of pattern.fills) {
          expect(fill.vi.trim(), `${pattern.id} Vietnamese meaning`).not.toBe("");
          if (language === "chinese") expect(fill.py?.trim(), `${pattern.id} Pinyin fill`).not.toBe("");
          const sentence = fillSentence(pattern.frame, fill.w).toLocaleLowerCase().trim();
          expect(sentences.has(sentence), `${pattern.id} repeats ${sentence}`).toBe(false);
          sentences.add(sentence);
        }
      }
    }
  });

  it("preserves the active Pattern Drilling slot for green emphasis", () => {
    expect(splitDrillFrame("It takes me ___ to get to work.")).toEqual({ before: "It takes me ", after: " to get to work." });
    expect(splitDrillFrame("我想___。 ")).toEqual({ before: "我想", after: "。 " });
  });
});
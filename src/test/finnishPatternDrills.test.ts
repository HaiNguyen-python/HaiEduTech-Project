import { describe, expect, it } from "vitest";
import { DRILL_LEVELS, PATTERN_LANGUAGES, fillSentence, getPatterns } from "@/data/patternDrills";
import { speakingCoachLanguages } from "@/data/speakingCoachData";

describe("Finnish Pattern Drilling", () => {
  it("offers Finnish practice with Finnish recognition", () => {
    expect(PATTERN_LANGUAGES).toContain("finnish");
    expect(speakingCoachLanguages.finnish.speechLang).toBe("fi-FI");
    expect(getPatterns("finnish").length).toBeGreaterThan(0);
  });

  it("provides unique complete substitutions at every supported level", () => {
    const patterns = getPatterns("finnish");
    expect(patterns).toHaveLength(30);
    expect(new Set(patterns.map((p) => p.id)).size).toBe(30);
    for (const level of DRILL_LEVELS) {
      expect(patterns.filter((p) => p.level === level.key)).toHaveLength(5);
    }
    const sentences = new Set<string>();
    for (const p of patterns) {
      expect(p.frame.match(/___/g)).toHaveLength(1);
      expect(p.frameVi.match(/___/g)).toHaveLength(1);
      expect(p.fills).toHaveLength(5);
      expect(p.tipEn.trim().length).toBeGreaterThan(0);
      expect(p.tipVi.trim().length).toBeGreaterThan(0);
      for (const fill of p.fills) {
        const sentence = fillSentence(p.frame, fill.w);
        expect(sentence).toBe(sentence.normalize("NFC"));
        expect(sentence).not.toContain("___");
        expect(fill.vi.trim().length).toBeGreaterThan(0);
        expect(sentences.has(sentence)).toBe(false);
        sentences.add(sentence);
      }
    }
    expect(sentences.size).toBe(150);
  });

  it("keeps case-governed forms and conditional agreement intact", () => {
    const patterns = getPatterns("finnish");
    const likes = patterns.find((p) => p.id === "fi-a1-1");
    expect(likes?.fills.map((f) => fillSentence(likes.frame, f.w))).toEqual([
      "Pidän kahvista.", "Pidän teestä.", "Pidän musiikista.", "Pidän urheilusta.", "Pidän lukemisesta.",
    ]);
    const suggestion = patterns.find((p) => p.id === "fi-b2-2");
    expect(suggestion?.fills[4]?.w).toBe("sopisimme yhteisistä tavoitteista");
  });
});
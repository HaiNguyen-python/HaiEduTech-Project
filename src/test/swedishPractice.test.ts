import { describe, it, expect } from "vitest";
import { getPatterns, PATTERN_LANGUAGES, DRILL_LEVELS, fillSentence } from "@/data/patternDrills";
import { speakingCoachLanguages } from "@/data/speakingCoachData";
import { SWEDISH_WRITING_SENTENCES, SWEDISH_WRITING_SKILLS, scoreSwedishTyping, shuffledSwedishIndices } from "@/data/swedishWritingPractice";

describe("Swedish practice", () => {
  it("supports Swedish Pattern Drilling with Swedish recognition at every level", () => {
    expect(PATTERN_LANGUAGES).toContain("swedish");
    expect(speakingCoachLanguages.swedish.speechLang).toBe("sv-SE");
    const patterns = getPatterns("swedish");
    expect(patterns).toHaveLength(24);
    for (const level of DRILL_LEVELS) expect(patterns.filter(p => p.level === level.key)).toHaveLength(4);
    expect(new Set(patterns.map(p => p.id)).size).toBe(24);
    for (const p of patterns) {
      expect(p.frame.match(/___/g)).toHaveLength(1);
      expect(p.fills).toHaveLength(5);
      for (const f of p.fills) expect(fillSentence(p.frame, f.w)).not.toContain("___");
    }
    expect(getPatterns("swedish").find(p => p.id === "sv-a2-1")?.fills[0].w).toBe("arbetade");
  });
  it("provides typing, translation, paraphrase and three skill banks", () => {
    expect(SWEDISH_WRITING_SENTENCES).toHaveLength(90);
    for (const level of ["A1", "A2", "B1"]) expect(SWEDISH_WRITING_SENTENCES.filter(s => s.level === level)).toHaveLength(30);
    for (const s of SWEDISH_WRITING_SENTENCES) { expect(s.en.length).toBeGreaterThan(10); expect(s.alternativeSv).not.toBe(s.sv); }
    for (const bank of Object.values(SWEDISH_WRITING_SKILLS)) { expect(bank.length).toBeGreaterThan(0); for (const s of bank) expect(s.exampleEn.length).toBeGreaterThan(10); }
  });
  it("grades exact Swedish characters including punctuation without exceeding 100", () => {
    expect(scoreSwedishTyping("Jag bor här.", "Jag bor här.")).toBe(100);
    expect(scoreSwedishTyping("Jag bor har.", "Jag bor här.")).toBeLessThan(100);
    expect(scoreSwedishTyping("Jag bor här", "Jag bor här.")).toBeLessThan(100);
    expect(scoreSwedishTyping("Jag bor här. extra", "Jag bor här.")).toBeLessThan(100);
    expect(scoreSwedishTyping("", "Jag bor här.")).toBe(0);
    expect(scoreSwedishTyping("ha\u0308r", "här")).toBe(100);
  });
  it("selects each task once per practice round", () => {
    const ids = shuffledSwedishIndices(30);
    expect(ids).toHaveLength(30);
    expect([...ids].sort((a,b) => a-b)).toEqual(Array.from({ length: 30 }, (_,i) => i));
  });
});

import { SWEDISH_WRITING_SENTENCES as SV_BANK, SWEDISH_WRITING_SKILLS as SV_SKILLS } from "@/data/swedishWritingPractice";
describe("Swedish writing bank size", () => {
  it("has 30 unique typing sentences per level A1-B1", () => {
    for (const level of ["A1", "A2", "B1"]) expect(SV_BANK.filter(s => s.level === level)).toHaveLength(30);
    expect(new Set(SV_BANK.map(s => s.id)).size).toBe(90);
    expect(new Set(SV_BANK.map(s => s.sv)).size).toBe(90);
  });
  it("has expanded skill banks", () => {
    expect(SV_SKILLS.vocabulary).toHaveLength(18);
    expect(SV_SKILLS.grammar).toHaveLength(12);
    expect(SV_SKILLS.connectors).toHaveLength(12);
  });
});

import { SWEDISH_YKI_TYPING_SENTENCES } from "@/data/swedishYkiTyping";
import { SWEDISH_SAMPLE_ESSAYS } from "@/data/swedishSampleEssays";
describe("Swedish YKI typing bank", () => {
  it("uses only sentences from YKI Writing model answers, at every level", () => {
    const essays = SWEDISH_SAMPLE_ESSAYS.map(e => e.essaySv.replace(/\s+/g, " "));
    for (const s of SWEDISH_YKI_TYPING_SENTENCES) expect(essays.some(e => e.includes(s.sv))).toBe(true);
    for (const level of ["A1", "A2", "B1"]) expect(SWEDISH_YKI_TYPING_SENTENCES.filter(s => s.level === level).length).toBeGreaterThanOrEqual(70);
    expect(new Set(SWEDISH_YKI_TYPING_SENTENCES.map(s => s.id)).size).toBe(SWEDISH_YKI_TYPING_SENTENCES.length);
  });
});

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { DRILL_LEVELS, fillSentence, getPatterns } from "@/data/patternDrills";
import { patternDrillSentenceIpa } from "@/lib/patternDrillIpa";

const dictionary: Record<string, string> = JSON.parse(readFileSync("public/ipa/en-ipa.json", "utf8"));

describe("Pattern Drilling sentence IPA", () => {
  for (const level of DRILL_LEVELS) {
    it(`provides full IPA for every ${level.en} English sentence`, () => {
      const patterns = getPatterns("english").filter((pattern) => pattern.level === level.key);
      expect(patterns).toHaveLength(15);
      for (const pattern of patterns) {
        for (const fill of pattern.fills) {
          const sentence = fillSentence(pattern.frame, fill.w);
          const ipa = patternDrillSentenceIpa(sentence, dictionary);
          expect(ipa, sentence).toMatch(/^\/[^/]+\/$/u);
          expect(ipa, sentence).not.toMatch(/[A-Z]|___|null|undefined/);
        }
      }
    });
  }
  it("transcribes the complete sentence rather than just the substitution", () => {
    expect(patternDrillSentenceIpa("I like coffee.", dictionary)).toBe("/aɪ laɪk ˈkɑfi/");
  });
  it("covers compounds without guessed pronunciations", () => {
    expect(patternDrillSentenceIpa("free Wi-Fi", dictionary)).toBe("/fɹi ˈwaɪ faɪ/");
    expect(patternDrillSentenceIpa("scalability", dictionary)).toBe("/ˌskeɪləˈbɪləti/");
    expect(patternDrillSentenceIpa("zzzqq", dictionary)).toBeNull();
  });
});
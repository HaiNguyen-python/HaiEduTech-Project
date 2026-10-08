import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { DRILL_LEVELS, fillSentence, getPatterns } from "@/data/patternDrills";
import { patternDrillSentenceIpa } from "@/lib/patternDrillIpa";
import pronunciations from "@/data/patternDrillPronunciations.json";
import { cmuPhonemicIpa } from "../../scripts/lib/cmuPhonemicIpa";

const dictionary: Record<string, string> = JSON.parse(readFileSync("public/ipa/en-ipa.json", "utf8"));

describe("Pattern Drilling sentence IPA", () => {
  for (const level of DRILL_LEVELS) {
    it(`provides full IPA for every ${level.en} English sentence`, () => {
      const patterns = getPatterns("english").filter((pattern) => pattern.level === level.key);
      expect(patterns).toHaveLength(15);
      for (const pattern of patterns) {
        for (const fill of pattern.fills) {
          const sentence = fillSentence(pattern.frame, fill.w);
          for (const word of sentence.toLowerCase().split(/\s+/).map((w) => w.replace(/[^a-z'-]/g, ""))) {
            expect(pronunciations[word], `${sentence}: ${word}`).toBeTruthy();
          }
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
    expect(patternDrillSentenceIpa("free Wi-Fi", dictionary)).toBe("/fɹi ˈwaɪˌfaɪ/");
    expect(patternDrillSentenceIpa("scalability", dictionary)).toBe("/ˌskeɪləˈbɪləti/");
    expect(patternDrillSentenceIpa("zzzqq", dictionary)).toBeNull();
  });
  it.each([
    ["reading", "ˈɹidɪŋ"], ["live", "lɪv"], ["lived", "lɪvd"],
    ["around", "ɚˈaʊnd"], ["forever", "fɚˈɛvɚ"], ["create", "kɹiˈeɪt"],
    ["preparation", "ˌpɹɛpɚˈeɪʃən"], ["situation", "ˌsɪtʃuˈeɪʃən"],
    ["instructions", "ˌɪnˈstɹʌkʃənz"], ["constraints", "kənˈstɹeɪnts"],
    ["email", "ˈiˌmeɪl"], ["office", "ˈɔfɪs"], ["ticket", "ˈtɪkɪt"],
    ["tested", "ˈtɛstɪd"], ["prices", "ˈpɹaɪsɪz"], ["use", "juz"],
    ["reuse", "ˌɹiˈjuz"], ["misread", "ˌmɪsˈɹɛd"], ["address", "əˈdɹɛs"],
    ["addresses", "əˈdɹɛsɪz"], ["refund", "ˈɹiˌfʌnd"], ["transport", "ˈtɹænsˌpɔɹt"],
    ["teamwork", "ˈtimˌwɝk"], ["passport", "ˈpæsˌpɔɹt"], ["weekend", "ˈwikˌɛnd"],
    ["monday", "ˈmʌndeɪ"], ["suggest", "səɡˈdʒɛst"],
  ])("uses the reviewed curriculum pronunciation for %s", (word, expected) => {
    expect(patternDrillSentenceIpa(word, dictionary)).toBe(`/${expected}/`);
  });
  it("distinguishes habitual used to from the ordinary past verb", () => {
    expect(patternDrillSentenceIpa("I used to live", dictionary)).toBe("/aɪ just tu lɪv/");
    expect(patternDrillSentenceIpa("we used a larger sample", dictionary)).toBe("/wi juzd ə ˈlɑɹdʒɚ ˈsæmpəl/");
  });
  it("uses the present read but past misread required by the curriculum", () => {
    expect(patternDrillSentenceIpa("read the news", dictionary)).toBe("/ɹid ðə nuz/");
    expect(patternDrillSentenceIpa("have misread the message", dictionary)).toBe("/hæv ˌmɪsˈɹɛd ðə ˈmɛsɪdʒ/");
  });
  it("uses the vowel-sound article without mistaking a written vowel for a vowel sound", () => {
    expect(patternDrillSentenceIpa("the outcome", dictionary)).toBe("/ði ˈaʊtˌkʌm/");
    expect(patternDrillSentenceIpa("the funding gap", dictionary)).toBe("/ðə ˈfʌndɪŋ ɡæp/");
    expect(patternDrillSentenceIpa("the use", dictionary)).toBe("/ðə juz/");
  });
  it.each([
    ["K R IY0 EY1 T", "kɹiˈeɪt"],
    ["AH0 S AH1 M P SH AH0 N", "əˈsʌmpʃən"],
    ["S AH0 JH EH1 S T", "səˈdʒɛst"],
    ["K AH0 N S T R EY1 N T S", "kənˈstɹeɪnts"],
    ["T IY1 CH ER0", "ˈtitʃɚ"],
    ["AH1 P", "ʌp"],
    ["M AH1 N D IY0", "ˈmʌndi"],
  ])("converts lossless vowel and stress data: %s", (source, expected) => {
    expect(cmuPhonemicIpa(source)).toBe(expected);
  });
});
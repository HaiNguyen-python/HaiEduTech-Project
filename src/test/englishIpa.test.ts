import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { formatIpa, isIpaLike, phraseToIpa, resolveIpa } from "@/lib/englishIpa";

const dict: Record<string, string> = JSON.parse(readFileSync("public/ipa/en-ipa.json", "utf8"));

describe("english IPA dictionary", () => {
  it("transcribes business and legal terms with dictionary stress marks", () => {
    expect(phraseToIpa("retainer", dict)).toBe("ɹɪˈteɪnɚ");
    expect(phraseToIpa("liable", dict)).toBe("ˈlaɪəbəl");
    expect(phraseToIpa("settlement", dict)).toBe("ˈsɛtəlmənt");
  });

  it("omits stress on single-syllable words", () => {
    expect(phraseToIpa("claim", dict)).toBe("kleɪm");
  });

  it("handles phrases, compounds and derivations", () => {
    expect(phraseToIpa("follow up", dict)).toBe("ˈfɑloʊ ʌp");
    expect(phraseToIpa("onboarding", dict)).toBe("ˈɑnˌbɔɹdɪŋ");
    expect(phraseToIpa("upskilling", dict)).toBe("ʌpˈskɪlɪŋ");
    expect(phraseToIpa("deliverables", dict)).toBe("dɪˈlɪvɚəbəlz");
  });

  it("never produces respellings and returns null for unknown words", () => {
    expect(phraseToIpa("zzzqq", dict)).toBeNull();
    const values = ["retainer", "jurisdiction", "schedule", "clarify"].map((w) => phraseToIpa(w, dict) ?? "");
    for (const value of values) expect(value).not.toMatch(/[A-Z]/);
  });

  it("rejects respelled pronunciations from the model", () => {
    expect(isIpaLike("ri-TAY-ner")).toBe(false);
    expect(isIpaLike("SET-l-mənt")).toBe(false);
    expect(isIpaLike("KLAYM")).toBe(false);
    expect(isIpaLike("ɹɪˈteɪnɚ")).toBe(true);
    expect(isIpaLike("/ɹɪˈteɪnɚ/")).toBe(true);
  });

  it("prefers the dictionary and falls back only to real IPA", () => {
    expect(resolveIpa("retainer", "ri-TAY-ner", dict)).toBe("/ɹɪˈteɪnɚ/");
    expect(resolveIpa("zzzqq", "ˈzɪzkjuː", dict)).toBe("/ˈzɪzkjuː/");
    expect(resolveIpa("zzzqq", "ZIZ-kyoo", dict)).toBeNull();
    expect(formatIpa("kleɪm")).toBe("/kleɪm/");
  });
});

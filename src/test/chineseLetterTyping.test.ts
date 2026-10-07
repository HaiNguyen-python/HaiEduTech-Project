import { describe, expect, it } from "vitest";
import { loadLetters } from "../data/chineseLetters";
import { ZH_TYPING } from "../data/chineseWritingBank";
import { letterDisplayCharacters, normalizeLetterTyping } from "../lib/chineseLetterTyping";

describe("999 Letters punctuation", () => {
  it("preserves punctuation and scoring indices in every ordinary typing sentence", () => {
    expect(ZH_TYPING.length).toBeGreaterThan(0);
    for (const sentence of ZH_TYPING) {
      const characters = letterDisplayCharacters(sentence.zh);
      expect(characters.map((c) => c.character).join(""), sentence.id).toBe(sentence.zh);
      expect(/[。！？]$/.test(sentence.zh), sentence.id).toBe(true);
      const scored = characters.filter((c) => c.typingIndex !== null);
      expect(scored.map((c) => c.character).join(""), sentence.id).toBe(normalizeLetterTyping(sentence.zh));
      expect(scored.map((c) => c.typingIndex), sentence.id).toEqual(scored.map((_, i) => i));
    }
  });

  it("retains commas and periods without shifting the typing cursor", () => {
    const text = "除了你自己，没有人会明白。";
    const characters = letterDisplayCharacters(text);
    expect(characters.map((c) => c.character).join("")).toBe(text);
    expect(characters[5]).toEqual({ character: "，", typingIndex: null });
    expect(characters[6]).toEqual({ character: "没", typingIndex: 5 });
    expect(characters.at(-1)?.typingIndex).toBeNull();
    expect(normalizeLetterTyping(text)).toBe(normalizeLetterTyping("除了你自己没有人会明白"));
  });

  it("preserves every source character across the entire loaded bank", async () => {
    const letters = await loadLetters();
    expect(letters.length).toBe(235);
    for (const letter of letters) {
      const characters = letterDisplayCharacters(letter.zh);
      expect(characters.map((c) => c.character).join(""), letter.id).toBe(letter.zh);
      const scored = characters.filter((c) => c.typingIndex !== null);
      expect(scored.map((c) => c.character).join(""), letter.id).toBe(normalizeLetterTyping(letter.zh));
      expect(scored.map((c) => c.typingIndex), letter.id).toEqual(scored.map((_, i) => i));
      expect(/[，。！？；：、]/.test(letter.zh), letter.id).toBe(true);
    }
  });
});
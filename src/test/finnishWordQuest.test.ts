/**
 * Guards the Finnish Word Quest exercises: a gap sentence must always hide the
 * answer (Finnish consonant gradation included), must keep enough context, and
 * must never repeat the target word.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { describe, it, expect } from "vitest";
import { finnishVocabData } from "@/data/finnishVocabData";
import { finnishToQuest } from "@/lib/vocab/vocabAdapter";
import { gradationStems, maskAnswerForms, normForCompare } from "@/lib/vocab/questionQuality";

const BLANK = "______";
const items = finnishVocabData.map(finnishToQuest);
const mask = (text: string, word: string, typeAnswer: string) =>
  maskAnswerForms(text, [word, typeAnswer], BLANK, { gradation: true });

describe("Finnish Word Quest exercise quality", () => {
  it("derives consonant-gradation stems", () => {
    expect(gradationStems("pöytä")).toContain("pöyd");
    expect(gradationStems("matto")).toContain("mat");
    expect(gradationStems("lukko")).toContain("luk");
    expect(gradationStems("vesi")).toContain("vete");
  });

  it("hides inflected answers inside example sentences", () => {
    expect(mask("Ruoka on jo pöydällä.", "pöytä", "pöytä")).toContain(BLANK);
    expect(mask("Tämän maton kunto on hyvä.", "matto", "matto")).toContain(BLANK);
    expect(mask("Pidän tästä mökistä paljon.", "mökki", "mökki")).toContain(BLANK);
  });

  it("never leaves the answer stem visible in a gap sentence", () => {
    const leaks = items.filter(w => {
      const masked = mask(w.example || "", w.word, w.typeAnswer);
      if (!masked.includes(BLANK)) return false;
      const stem = w.word.toLowerCase().slice(0, Math.max(4, w.word.length - 2));
      return masked.toLowerCase().includes(stem);
    });
    expect(leaks.map(w => w.word)).toEqual([]);
  });

  it("keeps at least two context words whenever a gap is offered", () => {
    const tooBare = items.filter(w => {
      const masked = mask(w.example || "", w.word, w.typeAnswer);
      if (!masked.includes(BLANK)) return false;
      return masked.split(/\s+/).filter(tok => tok && !tok.includes(BLANK)).length < 2;
    });
    expect(tooBare.map(w => w.word)).toEqual([]);
  });

  it("always finds three options with clearly different meanings", () => {
    const same = (a: string, b: string) => {
      const x = normForCompare(a);
      const y = normForCompare(b);
      if (!x || !y) return true;
      return x === y || (x.length > 2 && (x.includes(y) || y.includes(x)));
    };
    const byCategory = new Map<string, typeof items>();
    for (const w of items) byCategory.set(w.category, [...(byCategory.get(w.category) || []), w]);

    const unfair: string[] = [];
    for (const [, arr] of byCategory) {
      for (const w of arr) {
        const fair = arr.filter(d =>
          d.key !== w.key &&
          !same(d.definition.vi, w.definition.vi) &&
          !same(d.definition.en, w.definition.en) &&
          !same(d.word, w.word));
        if (fair.length < 3) unfair.push(w.word);
      }
    }
    expect(unfair).toEqual([]);
  });
});


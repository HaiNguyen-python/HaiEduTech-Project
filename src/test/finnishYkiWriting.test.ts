import { YKI_TYPING_ENGLISH } from "@/data/finnishYkiTypingEnglish";
import { FINNISH_A2_TYPING_SENTENCES, FINNISH_A2_TYPING_LEVEL } from "@/data/finnishA2Typing";
import { formatModelLetter } from "@/lib/finnishModelLetter";
import { describe, expect, it } from "vitest";
import { getYkiWritingEnglish, YKI_SKILL_BANK, YKI_WRITING_SENTENCES, YKI_WRITING_TASKS } from "@/data/finnishYkiWriting";

describe("Finnish YKI writing bank", () => {
  it("offers a separate lower A2 typing pool with short everyday sentences", () => {
    expect(FINNISH_A2_TYPING_LEVEL.id).toBe(0);
    expect(FINNISH_A2_TYPING_SENTENCES).toHaveLength(60);
    const all = [...FINNISH_A2_TYPING_SENTENCES, ...YKI_WRITING_SENTENCES];
    expect(new Set(all.map((item) => item.id)).size).toBe(all.length);
    expect(new Set(all.map((item) => item.fi)).size).toBe(all.length);
    for (const item of FINNISH_A2_TYPING_SENTENCES) {
      expect(item.cefr).toBe("A2");
      expect(item.level).toBeLessThan(1);
      expect(item.fi.trim().split(/\s+/).length).toBeGreaterThanOrEqual(4);
      expect(item.fi.trim().split(/\s+/).length).toBeLessThanOrEqual(10);
      expect(item.en.trim().length).toBeGreaterThan(10);
      expect(item.fi).toBe(item.fi.normalize("NFC"));
    }
    expect(FINNISH_A2_TYPING_SENTENCES.find((item) => item.fi === "Lähden töihin puoli kahdeksalta.")?.en)
      .toBe("I leave for work at half past seven.");
  });
  it("separates closings from the body and puts retained signatures on the next line", () => {
    expect(formatModelLetter("Hei Anna! Tavataan pian. Terveisin\nMai"))
      .toBe("Hei Anna!\n\nTavataan pian.\n\nTerveisin\nMai");
    expect(formatModelLetter("Hi Anna! Let us meet soon. Best wishes, Mai"))
      .toBe("Hi Anna!\n\nLet us meet soon.\n\nBest wishes,\nMai");
    expect(formatModelLetter("Hei!\n\nKiitos avusta. Terveisin\nMai"))
      .toBe("Hei!\n\nKiitos avusta.\n\nTerveisin\nMai");
    for (const task of YKI_WRITING_TASKS) {
      for (const text of [task.modelFi, getYkiWritingEnglish(task.id)?.modelEn ?? ""]) {
        const formatted = formatModelLetter(text);
        expect(formatModelLetter(formatted)).toBe(formatted);
        expect(formatted.replace(/\s+/g, " ")).toBe(text.trim().replace(/\s+/g, " "));
        expect(formatted).not.toMatch(/[^\n] (?:Terveisin|Ystävällisin terveisin|Best wishes|Kind regards)/);
      }
    }
  });

  it("uses Finnish closing punctuation without importing English commas", () => {
    for (const task of YKI_WRITING_TASKS) {
      expect(task.modelFi).not.toMatch(/(?:Ystävällisin terveisin|Terveisin),/);
      if (task.kind === "email") {
        expect(task.modelFi).toMatch(/Ystävällisin terveisin$/);
      }
    }
    const closings = YKI_WRITING_SENTENCES.filter((sentence) => sentence.fi.startsWith("Ystävällisin terveisin"));
    expect(closings).toHaveLength(0);
  });

  it("keeps mielestänne as genuine plural address to the course group", () => {
    const task = YKI_WRITING_TASKS.find((item) => item.id === "yki-doc-7-1");
    expect(task?.promptFi).toContain("ryhmän jäsenille");
    expect(task?.modelFi).toContain("Hei kaikki!");
    const sentence = YKI_WRITING_SENTENCES.find((item) => item.id === "yki-doc-7-1-s6");
    expect(sentence?.fi).toBe("Kumpi vaihtoehto on mielestänne parempi?");
    expect(sentence?.en).toBe("Which option do you all think is better?");
    expect(YKI_WRITING_SENTENCES.filter((item) => item.fi.includes("mielestänne"))).toHaveLength(1);
  });

  it("contains nine complete three-task exam sets", () => {
    expect(YKI_WRITING_TASKS).toHaveLength(27);
    for (let set = 1; set <= 9; set += 1) {
      const tasks = YKI_WRITING_TASKS.filter((item) => item.set === set);
      expect(tasks.map((item) => item.task).sort()).toEqual([1, 2, 3]);
      expect(tasks.map((item) => item.kind)).toEqual(["message", "email", "opinion"]);
    }
  });

  it("keeps every task ready for guided YKI practice", () => {
    for (const item of YKI_WRITING_TASKS) {
      expect(item.pointsFi.length).toBeGreaterThanOrEqual(3);
      expect(item.pointsVi).toHaveLength(item.pointsFi.length);
      expect(getYkiWritingEnglish(item.id)?.pointsEn).toHaveLength(item.pointsFi.length);
      expect(getYkiWritingEnglish(item.id)?.promptEn.length).toBeGreaterThan(20);
      expect(getYkiWritingEnglish(item.id)?.modelEn.length).toBeGreaterThan(80);
      expect(item.keywords.length).toBeGreaterThanOrEqual(4);
      expect(item.starters.length).toBeGreaterThanOrEqual(2);
      expect(item.modelFi.length).toBeGreaterThan(120);
      expect(item.modelVi.length).toBeGreaterThan(80);
      expect(item.minWords).toBeLessThan(item.maxWords);
    }
  });

  it("provides Finnish examples with English meanings in every skill card", () => {
    for (const items of Object.values(YKI_SKILL_BANK)) {
      for (const item of items) {
        expect(item[2].length).toBeGreaterThan(2);
        expect(item[3].length).toBeGreaterThan(10);
        expect(item[4].length).toBeGreaterThan(10);
      }
    }
  });

  it("derives a substantial sentence bank from the same exam content", () => {
    expect(YKI_WRITING_SENTENCES.length).toBeGreaterThanOrEqual(100);
    expect(new Set(YKI_WRITING_SENTENCES.map((item) => item.id)).size).toBe(YKI_WRITING_SENTENCES.length);
    for (const sentence of YKI_WRITING_SENTENCES) {
      expect(sentence.fi.length, `${sentence.id} Finnish`).toBeGreaterThan(20);
      expect(sentence.en.length, `${sentence.id} English`).toBeGreaterThan(10);
    }
    expect(YKI_WRITING_SENTENCES.find((item) => item.fi === "Ensinnäkin puhelinta katsotaan jatkuvasti työssä, koulussa ja kotona.")?.en)
      .toBe("First, people constantly look at their phones at work, at school and at home.");
    expect(YKI_WRITING_SENTENCES.find((item) => item.fi === "Se vaikeuttaa keskittymistä.")?.en)
      .toBe("This makes it hard to concentrate.");
    const ids = new Set(YKI_WRITING_SENTENCES.map((item) => item.id));
    expect(Object.keys(YKI_TYPING_ENGLISH).filter((id) => !ids.has(id))).toEqual([]);
    for (const level of [1, 2, 3, 4]) {
      const count = YKI_WRITING_SENTENCES.filter((item) => item.level === level).length;
      expect(count).toBeGreaterThanOrEqual(35);
      expect(count).toBeLessThanOrEqual(45);
    }
  });
});
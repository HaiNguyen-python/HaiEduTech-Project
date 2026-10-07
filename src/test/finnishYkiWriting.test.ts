import { describe, expect, it } from "vitest";
import { getYkiWritingEnglish, YKI_SKILL_BANK, YKI_WRITING_SENTENCES, YKI_WRITING_TASKS } from "@/data/finnishYkiWriting";

describe("Finnish YKI writing bank", () => {
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
  });
});
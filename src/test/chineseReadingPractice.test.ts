import { describe, expect, it } from "vitest";
import { chineseReadingLevels } from "@/data/chineseReadingPractice";
import { chineseReadingQuestionsZh } from "@/data/chineseReadingQuestionsZh";
import { getChineseReadingIllustration } from "@/lib/chineseReadingVisuals";

describe("Chinese Reading Practice data", () => {
  const passages = chineseReadingLevels.flatMap((level) => level.passages);

  it("contains ten passages at every HSK level", () => {
    expect(chineseReadingLevels).toHaveLength(5);
    chineseReadingLevels.forEach((level) => expect(level.passages, `HSK ${level.level}`).toHaveLength(10));
    expect(passages).toHaveLength(50);
  });

  it("uses unique IDs and aligned reading lines", () => {
    expect(new Set(passages.map((passage) => passage.id)).size).toBe(passages.length);
    passages.forEach((passage) => {
      const lineCount = passage.hanzi.split("\n").length;
      expect(passage.pinyin.split("\n"), `${passage.id} pinyin`).toHaveLength(lineCount);
      expect(passage.vi.split("\n"), `${passage.id} Vietnamese`).toHaveLength(lineCount);
      expect(passage.newWords.length, `${passage.id} vocabulary`).toBeGreaterThanOrEqual(5);
    });
  });

  it("has three valid questions and complete Chinese variants", () => {
    passages.forEach((passage) => {
      expect(passage.questions, passage.id).toHaveLength(3);
      passage.questions.forEach((question, index) => {
        expect(question.options).toHaveLength(4);
        expect(question.optionsVi).toHaveLength(4);
        expect(question.answer).toBeGreaterThanOrEqual(0);
        expect(question.answer).toBeLessThan(4);
        const chinese = chineseReadingQuestionsZh[`${passage.id}#${index}`];
        expect(chinese, `${passage.id}#${index}`).toBeDefined();
        expect(chinese?.optionsZh).toHaveLength(4);
      });
    });
  });

  it("resolves a themed illustration for every passage", () => {
    passages.forEach((passage) => {
      const illustration = getChineseReadingIllustration(passage);
      expect(illustration.src, passage.id).toBeTruthy();
      expect(illustration.altEn).toContain(passage.title);
      expect(illustration.altVi).toContain(passage.titleVi);
    });
  });
});
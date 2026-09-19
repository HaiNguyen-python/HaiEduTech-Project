import { describe, expect, it } from "vitest";
import type { LanguageLesson } from "@/data/languageCurriculum/types";
import {
  applyIeltsReadingTheoryGuides,
  IELTS_READING_THEORY_GUIDE_IDS,
} from "@/data/languageCurriculum/ieltsReadingTheoryGuides";

const lesson = (id: string): LanguageLesson => ({
  id,
  title: id,
  titleEn: id,
  level: 1,
  difficulty: "beginner",
  theory: "original vi",
  theoryEn: "original en",
  exercises: [{
    type: "fill-in-blank",
    instruction: "Điền",
    instructionEn: "Fill",
    sentences: [{ text: "A ___", answer: "word" }],
  }],
  quiz: [{ question: "Question", options: ["A", "B"], answer: 0, explanation: "Because" }],
});

describe("IELTS Reading Theory guides", () => {
  it("covers every Reading Strategies lesson exactly once", () => {
    expect(IELTS_READING_THEORY_GUIDE_IDS).toHaveLength(24);
    expect(new Set(IELTS_READING_THEORY_GUIDE_IDS).size).toBe(24);
    expect(IELTS_READING_THEORY_GUIDE_IDS).toEqual(
      Array.from({ length: 24 }, (_, index) => `ielts-reading-${index + 1}`),
    );
  });

  it("adds complete bilingual sections without changing learning data", () => {
    const source = IELTS_READING_THEORY_GUIDE_IDS.map(lesson);
    const result = applyIeltsReadingTheoryGuides(source);

    result.forEach((updated, index) => {
      expect(updated.id).toBe(source[index].id);
      expect(updated.exercises).toBe(source[index].exercises);
      expect(updated.quiz).toBe(source[index].quiz);
      expect(updated.theory).toContain("### Mục tiêu");
      expect(updated.theory).toContain("### Checklist trước khi chốt");
      expect(updated.theoryEn).toContain("### What this skill tests");
      expect(updated.theoryEn).toContain("### Final checklist");
    });
  });

  it("leaves unrelated lessons unchanged", () => {
    const source = lesson("ielts-listening-1");
    expect(applyIeltsReadingTheoryGuides([source])[0]).toBe(source);
  });
});
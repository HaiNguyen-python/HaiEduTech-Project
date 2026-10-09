import { describe, expect, it } from "vitest";
import { pythonLessons, pythonModules, getLessonById, supplementaryPythonLessons, getPathwaySequence } from "@/data/curriculum/pythonPathway";
import { pythonBookChapters, getChapterForChallenge } from "@/data/curriculum/pythonBookTheory";
import { pythonLessons as legacy } from "@/data/curriculum/pythonPathwayLegacy";
import { pythonChallenges } from "@/data/pythonChallenges";

describe("book-aligned Introduction to Programming", () => {
  it("covers each of the 150 challenges exactly once in 19 book chapters", () => {
    expect(pythonLessons).toHaveLength(19);
    const numbers = pythonBookChapters.flatMap(chapter => Array.from({ length: chapter.last - chapter.first + 1 }, (_, index) => chapter.first + index));
    expect(numbers).toEqual(Array.from({ length: 150 }, (_, index) => index + 1));
    expect(getChapterForChallenge(104)?.title).toBe("2D Lists and Dictionaries");
    expect(getChapterForChallenge(150)?.title).toBe("Projects: Combine Your Skills");
  });
  it("preserves every old URL and excludes reference lessons from core progress", () => {
    for (const lesson of legacy) expect(getLessonById(lesson.id)?.id).toBe(lesson.id);
    expect(supplementaryPythonLessons.length + pythonLessons.filter(lesson => legacy.some(old => old.id === lesson.id)).length).toBe(legacy.length);
    expect(supplementaryPythonLessons.some(lesson => pythonLessons.some(core => core.id === lesson.id))).toBe(false);
    expect(getPathwaySequence(pythonLessons[3].id)[4].titleEn).toBe("For Loop");
  });
  it("gives every chapter five valid topic-specific questions and a populated module", () => {
    for (const lesson of pythonLessons) {
      expect(pythonModules.some(module => module.id === lesson.moduleId)).toBe(true);
      expect(lesson.quiz).toHaveLength(5);
      for (const question of lesson.quiz) {
        if (question.type === "mcq") {
          expect(question.answer).toBeGreaterThanOrEqual(0);
          expect(question.answer).toBeLessThan(question.optionsEn.length);
        } else expect(question.answer.length).toBeGreaterThan(0);
      }
    }
    expect(pythonModules).toHaveLength(6);
    expect(pythonModules.every(module => pythonLessons.some(lesson => lesson.moduleId === module.id))).toBe(true);
  });
  it("maps every actual challenge to exactly one accessible core lesson", () => {
    expect(pythonChallenges).toHaveLength(150);
    for (const challenge of pythonChallenges) {
      const chapters = pythonBookChapters.filter(chapter => challenge.number >= chapter.first && challenge.number <= chapter.last);
      expect(chapters).toHaveLength(1);
      expect(getLessonById(chapters[0].lessonId)?.id).toBe(chapters[0].lessonId);
      expect(pythonLessons.some(lesson => lesson.id === chapters[0].lessonId)).toBe(true);
    }
    expect(getChapterForChallenge(104)?.lessonId).toBe("book-2d");
    expect(getChapterForChallenge(116)?.lessonId).toBe("book-csv");
  });
});
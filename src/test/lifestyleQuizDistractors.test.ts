import { describe, it, expect } from "vitest";
import { LIFESTYLE_LESSONS } from "@/data/lifestyleAcademyLessons";
import { getLessonQuiz } from "@/lib/lifestyleQuizBuilder";

describe("Interpersonal quiz distractors", () => {
  it("framework distractors come from the same pillar", () => {
    for (const lesson of LIFESTYLE_LESSONS) {
      const q = getLessonQuiz(lesson)[0];
      const samePillar = new Set(
        LIFESTYLE_LESSONS.filter((l) => l.pillar === lesson.pillar && l.frameworkEn)
          .map((l) => l.frameworkEn.trim().replace(/\s+/g, " ").slice(0, 40).toLowerCase()),
      );
      q.options.forEach((o) => {
        expect(samePillar.has(o.en.slice(0, 40).toLowerCase())).toBe(true);
      });
    }
  });
});

import { describe, expect, it } from "vitest";
import { isCurriculumComplete, isCurriculumLessonUnlocked } from "@/lib/curriculumCompletion";
import { chineseConversationalPillars } from "@/data/chineseConversationalCurriculum";
import { flattenChineseLessons } from "@/lib/chineseCurriculumProgress";
import { interpersonalLessonIds, passedInterpersonalIds } from "@/lib/interpersonalCurriculum";

describe("Sequential curricula and certificates", () => {
  const chinese = flattenChineseLessons(chineseConversationalPillars).map(lesson => lesson.id);
  for (const [name, ids] of [["Chinese", chinese], ["Interpersonal", interpersonalLessonIds]] as const) {
    it(`${name} locks following lessons until predecessors are complete`, () => {
      expect(isCurriculumLessonUnlocked(ids, ids[0], [])).toBe(true);
      expect(isCurriculumLessonUnlocked(ids, ids[1], [])).toBe(false);
      expect(isCurriculumLessonUnlocked(ids, ids[1], [ids[0]])).toBe(true);
      expect(isCurriculumLessonUnlocked(ids, ids[2], [ids[1]])).toBe(false);
      expect(isCurriculumLessonUnlocked(ids, "unknown", ids)).toBe(false);
    });
    it(`${name} certificate requires every actual lesson`, () => {
      expect(isCurriculumComplete(ids, ids.slice(0, -1))).toBe(false);
      expect(isCurriculumComplete(ids, ids)).toBe(true);
      expect(isCurriculumComplete(ids, Array(ids.length).fill(ids[0]))).toBe(false);
    });
  }
  it("preserves completed legacy lessons for review without unlocking gaps", () => {
    expect(isCurriculumLessonUnlocked(chinese, chinese[2], [chinese[2]])).toBe(true);
    expect(isCurriculumLessonUnlocked(chinese, chinese[3], [chinese[2]])).toBe(false);
  });
  it("Interpersonal completion still requires 75 percent quiz accuracy", () => {
    const id = interpersonalLessonIds[0];
    expect(passedInterpersonalIds({ [id]: { lessonId: id, pillar: "finance", score: 2, maxScore: 4, completed: true } })).toEqual([]);
    expect(passedInterpersonalIds({ [id]: { lessonId: id, pillar: "finance", score: 3, maxScore: 4, completed: false } })).toEqual([id]);
  });
});
import { describe, expect, it } from "vitest";
import { chineseConversationalPillars } from "@/data/chineseConversationalCurriculum";
import {
  flattenChineseLessons,
  getNextChineseLesson,
  sanitizeChineseProgress,
} from "@/lib/chineseCurriculumProgress";

describe("Chinese curriculum progress", () => {
  const lessons = flattenChineseLessons(chineseConversationalPillars);

  it("keeps the 103-lesson curriculum structurally valid", () => {
    expect(lessons).toHaveLength(103);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
    expect(lessons.every((lesson) => lesson.title && lesson.titleZh && lesson.description)).toBe(true);
  });

  it("removes duplicate and unknown progress IDs", () => {
    expect(sanitizeChineseProgress([lessons[0].id, lessons[0].id, "missing", 42], lessons)).toEqual([lessons[0].id]);
  });

  it("returns the first unfinished lesson across all pillars", () => {
    expect(getNextChineseLesson(chineseConversationalPillars, [lessons[0].id])?.id).toBe(lessons[1].id);
  });
});
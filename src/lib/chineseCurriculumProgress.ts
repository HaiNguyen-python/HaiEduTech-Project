import type { ChineseConvLesson, ChineseConvPillar } from "@/data/chineseConversationalCurriculum";

export const CHINESE_CURRICULUM_PROGRESS_KEY = "conv-cn-progress";
export const CHINESE_CURRICULUM_PROGRESS_EVENT = "chinese-curriculum-progress";

export type ChineseLessonFilter = "all" | "current" | "complete" | "not-started";

export const flattenChineseLessons = (pillars: ChineseConvPillar[]): ChineseConvLesson[] =>
  pillars.flatMap((pillar) => pillar.lessons);

export const sanitizeChineseProgress = (value: unknown, lessons: ChineseConvLesson[]): string[] => {
  if (!Array.isArray(value)) return [];
  const validIds = new Set(lessons.map((lesson) => lesson.id));
  return [...new Set(value.filter((item): item is string => typeof item === "string" && validIds.has(item)))];
};

export const readChineseProgress = (lessons: ChineseConvLesson[]): string[] => {
  try {
    return sanitizeChineseProgress(JSON.parse(localStorage.getItem(CHINESE_CURRICULUM_PROGRESS_KEY) || "[]"), lessons);
  } catch {
    return [];
  }
};

export const writeChineseProgress = (completed: string[], lessons: ChineseConvLesson[]): string[] => {
  const clean = sanitizeChineseProgress(completed, lessons);
  localStorage.setItem(CHINESE_CURRICULUM_PROGRESS_KEY, JSON.stringify(clean));
  window.dispatchEvent(new CustomEvent(CHINESE_CURRICULUM_PROGRESS_EVENT));
  return clean;
};

export const getNextChineseLesson = (pillars: ChineseConvPillar[], completed: string[]) => {
  const allLessons = flattenChineseLessons(pillars);
  return allLessons.find((lesson) => !completed.includes(lesson.id)) ?? allLessons[0] ?? null;
};

export const estimateChineseLessonMinutes = (lesson: ChineseConvLesson): number => {
  const contentWeight = lesson.keySituations.length * 3
    + lesson.vocabulary.length
    + lesson.commonStructures.length * 2
    + lesson.listeningChallenge.questions.length * 2
    + (lesson.fillInBlankExercises?.length ?? 0);
  return Math.max(15, Math.min(35, Math.round(contentWeight / 5) * 5));
};

export const matchesChineseLessonFilter = (
  lesson: ChineseConvLesson,
  filter: ChineseLessonFilter,
  completed: string[],
  currentLessonId?: string,
) => {
  if (filter === "complete") return completed.includes(lesson.id);
  if (filter === "current") return lesson.id === currentLessonId;
  if (filter === "not-started") return !completed.includes(lesson.id) && lesson.id !== currentLessonId;
  return true;
};
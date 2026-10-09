import { pythonLessons, getBookChapter } from "@/data/curriculum/pythonPathway";

/** Book chapters unlock in order: a chapter opens only after every earlier chapter is complete. */
export const isPathwayLessonUnlocked = (lessonId: string, progress: Record<string, boolean>): boolean => {
  if (!getBookChapter(lessonId)) return true; // supplementary references stay open
  const index = pythonLessons.findIndex(l => l.id === lessonId);
  if (index < 0) return true;
  return pythonLessons.slice(0, index).every(l => progress[l.id]);
};

export const firstIncompletePathwayLesson = (progress: Record<string, boolean>) =>
  pythonLessons.find(l => !progress[l.id]);

export const PYTHON_CERT_CHALLENGES = 150;

export const isPythonProgramComplete = (progress: Record<string, boolean>, completedChallenges: number) =>
  pythonLessons.every(l => progress[l.id]) && completedChallenges >= PYTHON_CERT_CHALLENGES;

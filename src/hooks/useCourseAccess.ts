import { FREE_LESSONS, usePremium } from "./usePremium";

/**
 * Access check for a course. Lessons with index < FREE_LESSONS are a free trial;
 * later lessons require Premium (activation code, online payment or approved transfer).
 * Pass no lessonIndex to check course-overview pages (always open).
 */
export const useCourseAccess = (_courseId: string, lessonIndex?: number) => {
  const { user, isStaff, isPremium, loading } = usePremium();
  const isTrialLesson = lessonIndex === undefined || lessonIndex < 0 || lessonIndex < FREE_LESSONS;
  const hasAccess = isPremium || isTrialLesson;
  return { hasAccess, loading, user, isTeacher: isStaff, isPremium };
};

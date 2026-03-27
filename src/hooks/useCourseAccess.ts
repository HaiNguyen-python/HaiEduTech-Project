import { useUserRole } from "./useUserRole";

/**
 * Hook to check if the current user has access to a specific course.
 * Currently: all content is unlocked for everyone.
 */
export const useCourseAccess = (_courseId: string) => {
  const { user, isTeacher, loading: roleLoading } = useUserRole();

  return { hasAccess: true, loading: roleLoading, user, isTeacher };
};

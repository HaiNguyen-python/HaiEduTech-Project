import { useState, useEffect } from "react";
import { useUserRole } from "./useUserRole";

/**
 * Hook to check if the current user has access to a specific course.
 * Currently: all content is unlocked for everyone.
 */
export const useCourseAccess = (_courseId: string) => {
  const { user, isTeacher, isAdmin, loading: roleLoading } = useUserRole();
  const [hasAccess] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roleLoading) {
      setLoading(false);
    }
  }, [roleLoading]);

  return { hasAccess, loading, user, isTeacher };
};

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "./useUserRole";

/**
 * Hook to check if the current user has access to a specific course.
 * Teachers/admins always have access.
 */
export const useCourseAccess = (courseId: string) => {
  const { user, isTeacher, isAdmin, loading: roleLoading } = useUserRole();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roleLoading) return;

    // Teachers and admins always have access
    if (isTeacher || isAdmin) {
      setHasAccess(true);
      setLoading(false);
      return;
    }

    // No user = no access
    if (!user) {
      setHasAccess(false);
      setLoading(false);
      return;
    }

    // Check course_access table for this student
    const checkAccess = async () => {
      const { data } = await supabase
        .from("course_access" as any)
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .maybeSingle();

      setHasAccess(!!data);
      setLoading(false);
    };

    checkAccess();
  }, [user, isTeacher, isAdmin, roleLoading, courseId]);

  return { hasAccess, loading, user, isTeacher };
};


-- Index to speed up the 120-day window scan used by the admin dashboard
CREATE INDEX IF NOT EXISTS idx_student_activity_log_created_at
  ON public.student_activity_log (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_student_activity_log_user_created
  ON public.student_activity_log (user_id, created_at DESC);

-- Server-side aggregate: per-user last activity timestamp + total seconds
-- Replaces a ~17k-row download with a ~59-row aggregate result.
CREATE OR REPLACE FUNCTION public.get_admin_user_meta(_since timestamptz)
RETURNS TABLE(user_id uuid, last_login timestamptz, total_seconds bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    sal.user_id,
    MAX(sal.created_at) AS last_login,
    COALESCE(SUM(sal.time_spent_seconds), 0)::bigint AS total_seconds
  FROM public.student_activity_log sal
  WHERE sal.created_at >= _since
    AND public.is_staff(auth.uid())
  GROUP BY sal.user_id;
$$;

GRANT EXECUTE ON FUNCTION public.get_admin_user_meta(timestamptz) TO authenticated;

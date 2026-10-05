CREATE INDEX IF NOT EXISTS idx_student_activity_python_challenge_leaderboard
ON public.student_activity_log (user_id, activity_id)
WHERE activity_type = 'python_challenge' AND activity_id IS NOT NULL;

CREATE OR REPLACE FUNCTION public.get_python_challenge_leaderboard(_limit integer DEFAULT 10)
RETURNS TABLE (
  user_id uuid,
  display_name text,
  completed_count bigint,
  is_current_user boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH completed AS (
    SELECT
      sal.user_id,
      COUNT(DISTINCT sal.activity_id)::bigint AS completed_count
    FROM public.student_activity_log AS sal
    WHERE sal.activity_type = 'python_challenge'
      AND sal.activity_id IS NOT NULL
    GROUP BY sal.user_id
  )
  SELECT
    completed.user_id,
    COALESCE(NULLIF(BTRIM(profiles.full_name), ''), 'Student') AS display_name,
    completed.completed_count,
    completed.user_id = auth.uid() AS is_current_user
  FROM completed
  LEFT JOIN public.profiles ON profiles.id = completed.user_id
  WHERE auth.uid() IS NOT NULL
  ORDER BY completed.completed_count DESC, display_name ASC, completed.user_id ASC
  LIMIT LEAST(GREATEST(COALESCE(_limit, 10), 1), 50);
$$;

REVOKE ALL ON FUNCTION public.get_python_challenge_leaderboard(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_python_challenge_leaderboard(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_python_challenge_leaderboard(integer) TO service_role;

-- Security-definer function to compute study streaks from student_activity_log
-- Returns display_name + streak_days for all profiles, sorted by streak desc
-- Callable by anon and authenticated users (no raw data exposed)

CREATE OR REPLACE FUNCTION public.get_streak_leaderboard()
RETURNS TABLE(display_name text, streak_days integer, user_id uuid)
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH user_dates AS (
    SELECT sal.user_id AS uid, DATE(sal.created_at) AS activity_date
    FROM student_activity_log sal
    GROUP BY sal.user_id, DATE(sal.created_at)
  ),
  streak_calc AS (
    SELECT ud.uid,
      (
        SELECT COUNT(*)::integer
        FROM generate_series(0, 364) AS i(i)
        WHERE EXISTS (
          SELECT 1 FROM user_dates ud2
          WHERE ud2.uid = ud.uid
          AND ud2.activity_date = CURRENT_DATE - i.i
        )
        AND NOT EXISTS (
          SELECT 1 FROM generate_series(0, i.i - 1) AS j(j)
          WHERE NOT EXISTS (
            SELECT 1 FROM user_dates ud3
            WHERE ud3.uid = ud.uid
            AND ud3.activity_date = CURRENT_DATE - j.j
          )
        )
      ) AS days
    FROM (SELECT DISTINCT ud4.uid FROM user_dates ud4) ud
  )
  SELECT
    COALESCE(p.full_name, 'Student')::text AS display_name,
    COALESCE(sc.days, 0)::integer AS streak_days,
    p.id AS user_id
  FROM profiles p
  LEFT JOIN streak_calc sc ON sc.uid = p.id
  ORDER BY COALESCE(sc.days, 0) DESC, p.full_name
  LIMIT 50;
END;
$$;

-- Allow anon users to call this function (public leaderboard)
GRANT EXECUTE ON FUNCTION public.get_streak_leaderboard() TO anon;
GRANT EXECUTE ON FUNCTION public.get_streak_leaderboard() TO authenticated;

-- Also allow anon to read game_scores and profiles for the vocab mastery leaderboard (public)
CREATE POLICY "Anon can view all scores"
ON public.game_scores
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Anon can view profile names"
ON public.profiles
FOR SELECT
TO anon
USING (true);

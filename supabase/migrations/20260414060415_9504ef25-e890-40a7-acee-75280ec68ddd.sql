
CREATE OR REPLACE FUNCTION public.get_streak_leaderboard()
 RETURNS TABLE(display_name text, streak_days integer, user_id uuid)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  WITH user_dates AS (
    SELECT sal.user_id AS uid, DATE(sal.created_at) AS d
    FROM student_activity_log sal
    GROUP BY sal.user_id, DATE(sal.created_at)
  ),
  numbered AS (
    SELECT ud.uid, ud.d,
      ud.d - (ROW_NUMBER() OVER (PARTITION BY ud.uid ORDER BY ud.d))::int AS grp
    FROM user_dates ud
  ),
  streaks AS (
    SELECT n.uid, n.grp, COUNT(*)::int AS len, MAX(n.d) AS last_day
    FROM numbered n
    GROUP BY n.uid, n.grp
  ),
  current_streaks AS (
    SELECT s.uid, s.len
    FROM streaks s
    WHERE s.last_day >= CURRENT_DATE - 1
    AND s.len = (
      SELECT MAX(s2.len) FROM streaks s2
      WHERE s2.uid = s.uid AND s2.last_day >= CURRENT_DATE - 1
    )
  )
  SELECT
    COALESCE(p.full_name, 'Student')::text AS display_name,
    COALESCE(cs.len, 0)::integer AS streak_days,
    p.id AS user_id
  FROM profiles p
  LEFT JOIN current_streaks cs ON cs.uid = p.id
  ORDER BY COALESCE(cs.len, 0) DESC, p.full_name
  LIMIT 50;
END;
$function$;

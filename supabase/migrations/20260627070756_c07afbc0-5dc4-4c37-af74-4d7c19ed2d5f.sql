
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
    FROM public.student_activity_log sal
    WHERE sal.created_at >= (CURRENT_DATE - INTERVAL '60 days')
      AND sal.activity_type NOT IN ('session_heartbeat', 'daily_login')
    GROUP BY sal.user_id, DATE(sal.created_at)
  ),
  numbered AS (
    SELECT ud.uid, ud.d,
      ud.d - (ROW_NUMBER() OVER (PARTITION BY ud.uid ORDER BY ud.d))::int AS grp
    FROM user_dates ud
  ),
  streaks AS (
    SELECT n.uid, COUNT(*)::int AS len, MAX(n.d) AS last_day
    FROM numbered n
    GROUP BY n.uid, n.grp
  ),
  current_streaks AS (
    SELECT DISTINCT ON (s.uid) s.uid, s.len
    FROM streaks s
    WHERE s.last_day >= CURRENT_DATE - 1
    ORDER BY s.uid, s.len DESC
  )
  SELECT
    COALESCE(p.full_name, 'Student')::text AS display_name,
    cs.len::integer AS streak_days,
    p.id AS user_id
  FROM current_streaks cs
  JOIN public.profiles p ON p.id = cs.uid
  ORDER BY cs.len DESC, p.full_name
  LIMIT 50;
END;
$function$;

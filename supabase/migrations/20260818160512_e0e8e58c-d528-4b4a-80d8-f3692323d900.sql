CREATE OR REPLACE FUNCTION public.get_user_streak(_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer := 0;
  v_cursor date;
BEGIN
  IF _user_id IS NULL THEN RETURN 0; END IF;

  CREATE TEMP TABLE IF NOT EXISTS _tmp_streak_dates (d date primary key) ON COMMIT DROP;
  DELETE FROM _tmp_streak_dates;

  INSERT INTO _tmp_streak_dates (d)
  SELECT DISTINCT DATE(sal.created_at)
  FROM public.student_activity_log sal
  WHERE sal.user_id = _user_id
    AND sal.activity_type <> 'session_heartbeat'
    AND sal.created_at >= (CURRENT_DATE - INTERVAL '400 days');

  IF EXISTS (SELECT 1 FROM _tmp_streak_dates WHERE d = CURRENT_DATE) THEN
    v_cursor := CURRENT_DATE;
  ELSIF EXISTS (SELECT 1 FROM _tmp_streak_dates WHERE d = CURRENT_DATE - 1) THEN
    v_cursor := CURRENT_DATE - 1;
  ELSE
    RETURN 0;
  END IF;

  WHILE EXISTS (SELECT 1 FROM _tmp_streak_dates WHERE d = v_cursor) LOOP
    v_count := v_count + 1;
    v_cursor := v_cursor - 1;
  END LOOP;

  RETURN v_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_user_streak(uuid) TO authenticated, anon, service_role;

CREATE OR REPLACE FUNCTION public.get_streak_leaderboard()
RETURNS TABLE(display_name text, streak_days integer, user_id uuid)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH user_dates AS (
    SELECT sal.user_id AS uid, DATE(sal.created_at) AS d
    FROM public.student_activity_log sal
    WHERE sal.created_at >= (CURRENT_DATE - INTERVAL '400 days')
      AND sal.activity_type <> 'session_heartbeat'
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
    ORDER BY s.uid, s.last_day DESC, s.len DESC
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
$$;
CREATE TABLE IF NOT EXISTS public.streak_leaderboard_cache (
  user_id uuid PRIMARY KEY,
  display_name text NOT NULL,
  streak_days integer NOT NULL,
  refreshed_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.streak_leaderboard_cache TO service_role;
ALTER TABLE public.streak_leaderboard_cache ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.streak_leaderboard_meta (
  id int PRIMARY KEY DEFAULT 1,
  refreshed_at timestamptz NOT NULL DEFAULT 'epoch'
);
GRANT ALL ON public.streak_leaderboard_meta TO service_role;
ALTER TABLE public.streak_leaderboard_meta ENABLE ROW LEVEL SECURITY;
INSERT INTO public.streak_leaderboard_meta(id) VALUES (1) ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION public.get_streak_leaderboard()
RETURNS TABLE(display_name text, streak_days integer, user_id uuid)
LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_today date := (now() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date;
  v_last timestamptz;
BEGIN
  SELECT m.refreshed_at INTO v_last FROM public.streak_leaderboard_meta m WHERE m.id = 1;
  IF v_last IS NULL OR v_last < now() - interval '10 minutes' THEN
    IF pg_try_advisory_xact_lock(884201) THEN
      DELETE FROM public.streak_leaderboard_cache c WHERE c.user_id IS NOT NULL;
      INSERT INTO public.streak_leaderboard_cache(user_id, display_name, streak_days)
      WITH user_dates AS (
        SELECT sal.user_id AS uid, (sal.created_at AT TIME ZONE 'Asia/Ho_Chi_Minh')::date AS d
        FROM public.student_activity_log sal
        WHERE sal.created_at >= (now() - INTERVAL '400 days')
          AND sal.activity_type <> 'session_heartbeat'
        GROUP BY 1, 2
      ), numbered AS (
        SELECT ud.uid, ud.d, ud.d - (ROW_NUMBER() OVER (PARTITION BY ud.uid ORDER BY ud.d))::int AS grp
        FROM user_dates ud
      ), streaks AS (
        SELECT n.uid, COUNT(*)::int AS len, MAX(n.d) AS last_day FROM numbered n GROUP BY n.uid, n.grp
      ), cs AS (
        SELECT DISTINCT ON (s.uid) s.uid, s.len FROM streaks s
        WHERE s.last_day >= v_today - 1
        ORDER BY s.uid, s.last_day DESC, s.len DESC
      )
      SELECT p.id, COALESCE(p.full_name, 'Student'), cs.len
      FROM cs JOIN public.profiles p ON p.id = cs.uid
      ORDER BY cs.len DESC, p.full_name LIMIT 50;
      UPDATE public.streak_leaderboard_meta SET refreshed_at = now() WHERE id = 1;
    END IF;
  END IF;
  RETURN QUERY SELECT c.display_name, c.streak_days, c.user_id
    FROM public.streak_leaderboard_cache c
    ORDER BY c.streak_days DESC, c.display_name LIMIT 50;
END $$;
GRANT EXECUTE ON FUNCTION public.get_streak_leaderboard() TO anon, authenticated;

DROP INDEX IF EXISTS public.idx_student_activity_created;
DROP INDEX IF EXISTS public.idx_student_activity_log_created_at;
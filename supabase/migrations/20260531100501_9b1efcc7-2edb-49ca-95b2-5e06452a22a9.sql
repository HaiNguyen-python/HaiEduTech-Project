
-- ============================================================
-- get_monthly_top_students: Top N students of current month
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_monthly_top_students(_limit integer DEFAULT 3)
RETURNS TABLE (
  rank integer,
  user_id uuid,
  display_name text,
  avatar_url text,
  mastered_words bigint,
  activities bigint,
  online_minutes bigint,
  login_days bigint,
  total_score bigint
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  WITH month_start AS (
    SELECT date_trunc('month', now()) AS d
  ),
  acts AS (
    SELECT
      sal.user_id AS uid,
      COUNT(*) FILTER (WHERE sal.activity_type NOT IN ('session_heartbeat','daily_login')) AS activities_cnt,
      COALESCE(SUM(sal.time_spent_seconds) FILTER (WHERE sal.activity_type = 'session_heartbeat'), 0) AS heartbeat_seconds,
      COUNT(DISTINCT DATE(sal.created_at)) AS login_days_cnt
    FROM public.student_activity_log sal, month_start
    WHERE sal.created_at >= month_start.d
    GROUP BY sal.user_id
  ),
  words AS (
    SELECT uvm.user_id AS uid, COUNT(*) AS words_cnt
    FROM public.user_vocab_mastered uvm, month_start
    WHERE uvm.reviewed_at >= month_start.d
    GROUP BY uvm.user_id
  ),
  combined AS (
    SELECT
      p.id AS uid,
      COALESCE(NULLIF(TRIM(p.full_name), ''), 'Học viên') AS dname,
      p.avatar_url AS avatar,
      COALESCE(w.words_cnt, 0) AS w_cnt,
      COALESCE(a.activities_cnt, 0) AS a_cnt,
      (COALESCE(a.heartbeat_seconds, 0) / 60) AS mins,
      COALESCE(a.login_days_cnt, 0) AS l_days
    FROM public.profiles p
    LEFT JOIN acts a ON a.uid = p.id
    LEFT JOIN words w ON w.uid = p.id
    WHERE EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = p.id AND ur.role = 'student'
    )
    AND NOT EXISTS (
      SELECT 1 FROM public.user_roles ur2
      WHERE ur2.user_id = p.id AND ur2.role IN ('teacher','admin')
    )
  ),
  scored AS (
    SELECT
      uid, dname, avatar, w_cnt, a_cnt, mins, l_days,
      (w_cnt * 3 + a_cnt * 5 + mins * 1 + l_days * 10) AS score
    FROM combined
    WHERE (w_cnt + a_cnt + mins + l_days) > 0
  )
  SELECT
    (ROW_NUMBER() OVER (ORDER BY score DESC, dname))::integer AS rank,
    uid AS user_id,
    dname::text AS display_name,
    avatar AS avatar_url,
    w_cnt::bigint AS mastered_words,
    a_cnt::bigint AS activities,
    mins::bigint AS online_minutes,
    l_days::bigint AS login_days,
    score::bigint AS total_score
  FROM scored
  ORDER BY score DESC, dname
  LIMIT GREATEST(_limit, 1);
$$;

GRANT EXECUTE ON FUNCTION public.get_monthly_top_students(integer) TO anon, authenticated;

-- ============================================================
-- get_student_summary: aggregated personal stats
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_student_summary(_user_id uuid, _period text DEFAULT 'month')
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_start timestamptz;
  v_online_seconds bigint;
  v_login_days integer;
  v_mastered_total bigint;
  v_mastered_period bigint;
  v_by_subject jsonb;
  v_activities_total bigint;
  v_by_type jsonb;
  v_last_active timestamptz;
  v_rank integer;
BEGIN
  IF _user_id IS NULL THEN
    RETURN jsonb_build_object('error', 'no_user');
  END IF;

  v_start := CASE _period
    WHEN 'week' THEN date_trunc('week', now())
    WHEN 'all'  THEN '1970-01-01'::timestamptz
    ELSE date_trunc('month', now())
  END;

  SELECT
    COALESCE(SUM(time_spent_seconds) FILTER (WHERE activity_type = 'session_heartbeat'), 0),
    COUNT(DISTINCT DATE(created_at)),
    COUNT(*) FILTER (WHERE activity_type NOT IN ('session_heartbeat','daily_login')),
    MAX(created_at)
  INTO v_online_seconds, v_login_days, v_activities_total, v_last_active
  FROM public.student_activity_log
  WHERE user_id = _user_id AND created_at >= v_start;

  SELECT COALESCE(jsonb_object_agg(activity_type, cnt), '{}'::jsonb)
  INTO v_by_type
  FROM (
    SELECT activity_type, COUNT(*) AS cnt
    FROM public.student_activity_log
    WHERE user_id = _user_id AND created_at >= v_start
      AND activity_type NOT IN ('session_heartbeat','daily_login')
    GROUP BY activity_type
  ) t;

  SELECT COUNT(*) INTO v_mastered_total
  FROM public.user_vocab_mastered WHERE user_id = _user_id;

  SELECT COUNT(*) INTO v_mastered_period
  FROM public.user_vocab_mastered
  WHERE user_id = _user_id AND reviewed_at >= v_start;

  SELECT COALESCE(jsonb_object_agg(subject, cnt), '{}'::jsonb)
  INTO v_by_subject
  FROM (
    SELECT subject, COUNT(*) AS cnt
    FROM public.user_vocab_mastered
    WHERE user_id = _user_id
    GROUP BY subject
  ) s;

  -- monthly rank (only meaningful when period = 'month')
  IF _period = 'month' THEN
    SELECT r.rank INTO v_rank
    FROM public.get_monthly_top_students(200) r
    WHERE r.user_id = _user_id;
  END IF;

  RETURN jsonb_build_object(
    'period', _period,
    'period_start', v_start,
    'online_seconds', v_online_seconds,
    'online_minutes', (v_online_seconds / 60),
    'login_days', v_login_days,
    'mastered_words_total', v_mastered_total,
    'mastered_words_period', v_mastered_period,
    'mastered_by_subject', v_by_subject,
    'activities_total', v_activities_total,
    'activities_by_type', v_by_type,
    'last_active_at', v_last_active,
    'monthly_rank', v_rank
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_student_summary(uuid, text) TO authenticated;

-- Freeze monthly top students to the previous month's results until the last day of the current month.
-- On the last day of the month, switch to the current month so the new standings appear.
CREATE OR REPLACE FUNCTION public.get_monthly_top_students(_limit integer DEFAULT 3)
 RETURNS TABLE(rank integer, user_id uuid, display_name text, avatar_url text, mastered_words bigint, activities bigint, online_minutes bigint, login_days bigint, total_score bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  WITH month_window AS (
    SELECT
      CASE
        WHEN CURRENT_DATE = (date_trunc('month', now()) + interval '1 month - 1 day')::date
          THEN date_trunc('month', now())
        ELSE date_trunc('month', now() - interval '1 month')
      END AS m_start,
      CASE
        WHEN CURRENT_DATE = (date_trunc('month', now()) + interval '1 month - 1 day')::date
          THEN date_trunc('month', now()) + interval '1 month'
        ELSE date_trunc('month', now())
      END AS m_end
  ),
  acts AS (
    SELECT
      sal.user_id AS uid,
      COUNT(*) FILTER (WHERE sal.activity_type NOT IN ('session_heartbeat','daily_login')) AS activities_cnt,
      COALESCE(SUM(sal.time_spent_seconds) FILTER (WHERE sal.activity_type = 'session_heartbeat'), 0) AS heartbeat_seconds,
      COUNT(DISTINCT DATE(sal.created_at)) AS login_days_cnt
    FROM public.student_activity_log sal, month_window mw
    WHERE sal.created_at >= mw.m_start AND sal.created_at < mw.m_end
    GROUP BY sal.user_id
  ),
  words AS (
    SELECT uvm.user_id AS uid, COUNT(*) AS words_cnt
    FROM public.user_vocab_mastered uvm, month_window mw
    WHERE uvm.reviewed_at >= mw.m_start AND uvm.reviewed_at < mw.m_end
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
      (w_cnt * 3 + a_cnt * 5 + mins * 1 + l_days * 20) AS score
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
$function$;
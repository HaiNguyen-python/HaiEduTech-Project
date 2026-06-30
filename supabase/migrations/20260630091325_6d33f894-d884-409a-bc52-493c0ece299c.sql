
DROP FUNCTION IF EXISTS public.get_monthly_top_students(integer);

-- Anti-gaming: prevent burst inserts on user_vocab_mastered
CREATE OR REPLACE FUNCTION public.prevent_vocab_mastered_burst()
RETURNS trigger LANGUAGE plpgsql SET search_path = public
AS $$
DECLARE recent_cnt int;
BEGIN
  SELECT COUNT(*) INTO recent_cnt
  FROM public.user_vocab_mastered
  WHERE user_id = NEW.user_id
    AND reviewed_at >= now() - interval '60 seconds';
  IF recent_cnt >= 8 THEN
    RAISE EXCEPTION 'rate_limit: too many vocab marks in 60s (max 8)'
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_vocab_burst ON public.user_vocab_mastered;
CREATE TRIGGER trg_prevent_vocab_burst
BEFORE INSERT ON public.user_vocab_mastered
FOR EACH ROW EXECUTE FUNCTION public.prevent_vocab_mastered_burst();

CREATE OR REPLACE FUNCTION public.get_fair_mastered_count(
  _user_id uuid, _start timestamptz, _end timestamptz
)
RETURNS TABLE(fair_count bigint, raw_count bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH per_min AS (
    SELECT date_trunc('day', reviewed_at) AS d,
           date_trunc('minute', reviewed_at) AS m,
           COUNT(*) AS cnt
    FROM public.user_vocab_mastered
    WHERE user_id = _user_id AND reviewed_at >= _start AND reviewed_at < _end
    GROUP BY 1, 2
  ),
  capped_min AS (SELECT d, LEAST(cnt, 8) AS capped FROM per_min),
  capped_day AS (SELECT d, LEAST(SUM(capped), 200) AS day_capped FROM capped_min GROUP BY d)
  SELECT
    COALESCE((SELECT SUM(day_capped) FROM capped_day), 0)::bigint AS fair_count,
    COALESCE((SELECT SUM(cnt)        FROM per_min),  0)::bigint AS raw_count;
$$;

CREATE OR REPLACE FUNCTION public.get_monthly_top_students(_limit integer DEFAULT 3)
RETURNS TABLE(
  rank integer, user_id uuid, display_name text, avatar_url text,
  mastered_words bigint, activities bigint, online_minutes bigint, login_days bigint,
  total_score bigint, raw_words bigint, quality_bonus numeric
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH mw AS (
    SELECT
      CASE WHEN CURRENT_DATE = (date_trunc('month', now()) + interval '1 month - 1 day')::date
           THEN date_trunc('month', now())
           ELSE date_trunc('month', now() - interval '1 month') END AS m_start,
      CASE WHEN CURRENT_DATE = (date_trunc('month', now()) + interval '1 month - 1 day')::date
           THEN date_trunc('month', now()) + interval '1 month'
           ELSE date_trunc('month', now()) END AS m_end
  ),
  acts_raw AS (
    SELECT sal.user_id AS uid, sal.activity_type AS atype,
           DATE(sal.created_at) AS d
    FROM public.student_activity_log sal, mw
    WHERE sal.created_at >= mw.m_start AND sal.created_at < mw.m_end
      AND sal.activity_type NOT IN ('session_heartbeat','daily_login')
      AND (sal.time_spent_seconds IS NULL OR sal.time_spent_seconds >= 15
           OR sal.activity_type = 'vocab_mastered')
  ),
  acts_capped AS (
    SELECT uid, atype, d, LEAST(COUNT(*), 50) AS capped
    FROM acts_raw GROUP BY uid, atype, d
  ),
  acts AS (
    SELECT uid, SUM(capped)::bigint AS activities_cnt,
           COUNT(DISTINCT atype) AS atype_variety
    FROM acts_capped GROUP BY uid
  ),
  online_day AS (
    SELECT sal.user_id AS uid, DATE(sal.created_at) AS d,
           LEAST(SUM(sal.time_spent_seconds) / 60, 240) AS mins
    FROM public.student_activity_log sal, mw
    WHERE sal.created_at >= mw.m_start AND sal.created_at < mw.m_end
      AND sal.activity_type = 'session_heartbeat'
    GROUP BY sal.user_id, DATE(sal.created_at)
  ),
  online AS (SELECT uid, SUM(mins)::bigint AS online_mins FROM online_day GROUP BY uid),
  days AS (
    SELECT sal.user_id AS uid, COUNT(DISTINCT DATE(sal.created_at)) AS l_days
    FROM public.student_activity_log sal, mw
    WHERE sal.created_at >= mw.m_start AND sal.created_at < mw.m_end
    GROUP BY sal.user_id
  ),
  words_uids AS (
    SELECT DISTINCT uvm.user_id AS uid
    FROM public.user_vocab_mastered uvm, mw
    WHERE uvm.reviewed_at >= mw.m_start AND uvm.reviewed_at < mw.m_end
  ),
  words AS (
    SELECT w.uid,
           (SELECT fair_count FROM public.get_fair_mastered_count(w.uid, mw.m_start, mw.m_end)) AS w_cnt,
           (SELECT raw_count  FROM public.get_fair_mastered_count(w.uid, mw.m_start, mw.m_end)) AS w_raw
    FROM words_uids w, mw
  ),
  quality AS (
    SELECT sal.user_id AS uid, BOOL_OR(sal.score >= 5) AS has_scored
    FROM public.student_activity_log sal, mw
    WHERE sal.created_at >= mw.m_start AND sal.created_at < mw.m_end
      AND sal.activity_type IN ('ielts_writing','ielts_speaking','toeic_lecture_quiz',
        'language_lesson_quiz','speaking_coach_english','speaking_coach_chinese',
        'speaking_coach_finnish','python_pathway_lesson')
    GROUP BY sal.user_id
  ),
  combined AS (
    SELECT p.id AS uid,
      COALESCE(NULLIF(TRIM(p.full_name), ''), 'Học viên') AS dname,
      p.avatar_url AS avatar,
      COALESCE(words.w_cnt, 0) AS w_cnt,
      COALESCE(words.w_raw, 0) AS w_raw,
      COALESCE(a.activities_cnt, 0) AS a_cnt,
      COALESCE(a.atype_variety, 0) AS variety,
      COALESCE(o.online_mins, 0) AS mins,
      COALESCE(d.l_days, 0) AS l_days,
      COALESCE(q.has_scored, false) AS has_scored
    FROM public.profiles p
    LEFT JOIN acts a ON a.uid = p.id
    LEFT JOIN online o ON o.uid = p.id
    LEFT JOIN days d ON d.uid = p.id
    LEFT JOIN words ON words.uid = p.id
    LEFT JOIN quality q ON q.uid = p.id
    WHERE EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = p.id AND ur.role = 'student')
      AND NOT EXISTS (SELECT 1 FROM public.user_roles ur2 WHERE ur2.user_id = p.id AND ur2.role IN ('teacher','admin'))
  ),
  scored AS (
    SELECT uid, dname, avatar, w_cnt, w_raw, a_cnt, mins, l_days,
      (1.0
        + CASE WHEN variety >= 3 THEN 0.10 ELSE 0 END
        + CASE WHEN has_scored THEN 0.10 ELSE 0 END
        + CASE WHEN l_days >= 10 THEN 0.10 ELSE 0 END
      )::numeric AS bonus,
      ((w_cnt * 1 + a_cnt * 2 + mins * 3 + l_days * 4) *
       (1.0
        + CASE WHEN variety >= 3 THEN 0.10 ELSE 0 END
        + CASE WHEN has_scored THEN 0.10 ELSE 0 END
        + CASE WHEN l_days >= 10 THEN 0.10 ELSE 0 END
       )
      )::bigint AS score
    FROM combined
    WHERE (w_cnt + a_cnt + mins + l_days) > 0
  )
  SELECT (ROW_NUMBER() OVER (ORDER BY score DESC, dname))::integer AS rank,
    uid, dname::text, avatar,
    w_cnt::bigint, a_cnt::bigint, mins::bigint, l_days::bigint,
    score::bigint, w_raw::bigint, bonus
  FROM scored
  ORDER BY score DESC, dname
  LIMIT GREATEST(_limit, 1);
$$;

CREATE OR REPLACE FUNCTION public.get_suspicious_vocab_activity(_days integer DEFAULT 30, _limit integer DEFAULT 50)
RETURNS TABLE(
  user_id uuid, display_name text, raw_count bigint, fair_count bigint,
  inflation_ratio numeric, peak_per_minute bigint
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH wb AS (SELECT now() - make_interval(days => GREATEST(_days,1)) AS s, now() AS e),
  per_min AS (
    SELECT user_id AS uid, date_trunc('minute', reviewed_at) m, COUNT(*) AS cnt
    FROM public.user_vocab_mastered, wb
    WHERE reviewed_at >= wb.s AND reviewed_at < wb.e
    GROUP BY user_id, date_trunc('minute', reviewed_at)
  ),
  per_user AS (
    SELECT uid, SUM(cnt) AS raw_cnt, MAX(cnt) AS peak FROM per_min GROUP BY uid
  ),
  enriched AS (
    SELECT pu.uid, pu.raw_cnt, pu.peak,
           (SELECT fair_count FROM public.get_fair_mastered_count(pu.uid, wb.s, wb.e)) AS fair_cnt
    FROM per_user pu, wb
  )
  SELECT e.uid, COALESCE(NULLIF(TRIM(p.full_name),''),'Học viên')::text,
    e.raw_cnt::bigint, e.fair_cnt::bigint,
    ROUND((e.raw_cnt::numeric / NULLIF(e.fair_cnt,0)), 2),
    e.peak::bigint
  FROM enriched e LEFT JOIN public.profiles p ON p.id = e.uid
  WHERE public.is_staff(auth.uid())
    AND e.raw_cnt > GREATEST(e.fair_cnt * 2, 50)
  ORDER BY (e.raw_cnt::numeric / NULLIF(e.fair_cnt,0)) DESC NULLS LAST, e.raw_cnt DESC
  LIMIT GREATEST(_limit, 1);
$$;

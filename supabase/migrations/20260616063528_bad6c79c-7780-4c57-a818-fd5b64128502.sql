CREATE INDEX IF NOT EXISTS idx_student_activity_learning_created
ON public.student_activity_log (created_at ASC)
WHERE activity_type NOT IN ('session_heartbeat', 'daily_login');

CREATE OR REPLACE FUNCTION public.get_admin_dashboard_snapshot(_since timestamp with time zone)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  WITH staff_guard AS (
    SELECT public.is_staff(auth.uid()) AS allowed
  ),
  non_staff_profiles AS (
    SELECT p.id, p.full_name, p.created_at
    FROM public.profiles p, staff_guard sg
    WHERE sg.allowed
      AND NOT EXISTS (
        SELECT 1
        FROM public.user_roles ur
        WHERE ur.user_id = p.id
          AND ur.role IN ('teacher'::app_role, 'admin'::app_role)
      )
  ),
  named_profiles AS (
    SELECT
      nsp.*,
      lower(regexp_replace(trim(coalesce(nsp.full_name, '')), '\s+', ' ', 'g')) AS normalized_name
    FROM non_staff_profiles nsp
  ),
  profile_groups AS (
    SELECT
      np.*,
      CASE
        WHEN np.normalized_name = '' THEN np.id
        ELSE first_value(np.id) OVER (PARTITION BY np.normalized_name ORDER BY np.created_at ASC, np.id ASC)
      END AS primary_id,
      row_number() OVER (
        PARTITION BY CASE WHEN np.normalized_name = '' THEN np.id::text ELSE np.normalized_name END
        ORDER BY np.created_at ASC, np.id ASC
      ) AS rn
    FROM named_profiles np
  ),
  students AS (
    SELECT id, full_name, created_at
    FROM profile_groups
    WHERE rn = 1
  ),
  id_map AS (
    SELECT id, primary_id
    FROM profile_groups
  ),
  learning_activities AS (
    SELECT
      im.primary_id AS user_id,
      sal.activity_type,
      sal.domain,
      sal.score,
      sal.max_score,
      sal.time_spent_seconds,
      sal.created_at,
      sal.metadata
    FROM public.student_activity_log sal
    JOIN id_map im ON im.id = sal.user_id
    WHERE sal.created_at >= _since
      AND sal.activity_type NOT IN ('session_heartbeat', 'daily_login')
    ORDER BY sal.created_at ASC
  ),
  user_meta AS (
    SELECT
      im.primary_id AS user_id,
      MAX(sal.created_at) AS last_login,
      COALESCE(SUM(sal.time_spent_seconds), 0)::bigint AS total_seconds
    FROM public.student_activity_log sal
    JOIN id_map im ON im.id = sal.user_id
    WHERE sal.created_at >= _since
    GROUP BY im.primary_id
  )
  SELECT jsonb_build_object(
    'students', COALESCE((SELECT jsonb_agg(to_jsonb(s) ORDER BY s.created_at ASC) FROM students s), '[]'::jsonb),
    'activities', COALESCE((SELECT jsonb_agg(to_jsonb(a) ORDER BY a.created_at ASC) FROM learning_activities a), '[]'::jsonb),
    'userMeta', COALESCE((SELECT jsonb_agg(to_jsonb(m)) FROM user_meta m), '[]'::jsonb)
  )
  FROM staff_guard sg
  WHERE sg.allowed;
$function$;

GRANT EXECUTE ON FUNCTION public.get_admin_dashboard_snapshot(timestamp with time zone) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_dashboard_snapshot(timestamp with time zone) TO service_role;
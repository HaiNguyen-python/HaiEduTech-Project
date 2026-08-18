CREATE OR REPLACE FUNCTION public.get_user_streak(_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_days date[];
  v_count integer := 0;
  v_cursor date;
BEGIN
  IF _user_id IS NULL THEN RETURN 0; END IF;

  SELECT COALESCE(array_agg(DISTINCT DATE(sal.created_at)), '{}'::date[])
  INTO v_days
  FROM public.student_activity_log sal
  WHERE sal.user_id = _user_id
    AND sal.activity_type <> 'session_heartbeat'
    AND sal.created_at >= (CURRENT_DATE - INTERVAL '400 days');

  IF CURRENT_DATE = ANY (v_days) THEN
    v_cursor := CURRENT_DATE;
  ELSIF (CURRENT_DATE - 1) = ANY (v_days) THEN
    v_cursor := CURRENT_DATE - 1;
  ELSE
    RETURN 0;
  END IF;

  WHILE v_cursor = ANY (v_days) LOOP
    v_count := v_count + 1;
    v_cursor := v_cursor - 1;
  END LOOP;

  RETURN v_count;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.get_user_streak(uuid) FROM anon;
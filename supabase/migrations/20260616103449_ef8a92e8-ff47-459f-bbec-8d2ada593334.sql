CREATE OR REPLACE FUNCTION public.get_weekly_vocab_achievers(_subject text, _threshold int DEFAULT 20)
RETURNS TABLE(user_id uuid, display_name text, weekly_count bigint, total_count bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH weekly AS (
    SELECT uvm.user_id, COUNT(*)::bigint AS weekly_count
    FROM public.user_vocab_mastered uvm
    WHERE uvm.subject = _subject
      AND uvm.created_at >= (now() - interval '7 days')
    GROUP BY uvm.user_id
    HAVING COUNT(*) >= _threshold
  ),
  totals AS (
    SELECT uvm.user_id, COUNT(*)::bigint AS total_count
    FROM public.user_vocab_mastered uvm
    WHERE uvm.subject = _subject
    GROUP BY uvm.user_id
  )
  SELECT
    w.user_id,
    COALESCE(p.full_name, 'Student')::text AS display_name,
    w.weekly_count,
    COALESCE(t.total_count, 0)::bigint AS total_count
  FROM weekly w
  LEFT JOIN public.profiles p ON p.id = w.user_id
  LEFT JOIN totals t ON t.user_id = w.user_id
  ORDER BY w.weekly_count DESC, t.total_count DESC NULLS LAST
  LIMIT 50;
$$;

GRANT EXECUTE ON FUNCTION public.get_weekly_vocab_achievers(text, int) TO anon, authenticated;
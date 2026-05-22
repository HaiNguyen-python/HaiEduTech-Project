CREATE OR REPLACE FUNCTION public.get_overall_vocab_leaderboard()
RETURNS TABLE(user_id uuid, score bigint, display_name text, subjects text[])
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT
    p.id AS user_id,
    c.total::bigint AS score,
    COALESCE(NULLIF(TRIM(p.full_name), ''), 'Học viên')::text AS display_name,
    c.subjects AS subjects
  FROM public.profiles p
  JOIN (
    SELECT
      uvm.user_id AS uid,
      COUNT(*) AS total,
      ARRAY_AGG(DISTINCT uvm.subject ORDER BY uvm.subject) AS subjects
    FROM public.user_vocab_mastered uvm
    GROUP BY uvm.user_id
    HAVING COUNT(*) > 0
  ) c ON c.uid = p.id
  ORDER BY c.total DESC, p.full_name
  LIMIT 200;
$$;
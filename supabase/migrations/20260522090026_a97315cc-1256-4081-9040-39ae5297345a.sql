CREATE OR REPLACE FUNCTION public.get_mastery_leaderboard(_subject text)
 RETURNS TABLE(user_id uuid, score bigint, display_name text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    p.id AS user_id,
    c.cnt::bigint AS score,
    COALESCE(p.full_name, 'Student')::text AS display_name
  FROM public.profiles p
  JOIN (
    SELECT uvm.user_id AS uid, COUNT(*) AS cnt
    FROM public.user_vocab_mastered uvm
    WHERE uvm.subject = _subject
    GROUP BY uvm.user_id
    HAVING COUNT(*) > 0
  ) c ON c.uid = p.id
  ORDER BY c.cnt DESC, p.full_name
  LIMIT 200;
$function$;
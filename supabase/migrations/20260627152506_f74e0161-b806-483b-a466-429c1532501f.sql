
CREATE OR REPLACE FUNCTION public.get_your_corner_feed(_limit integer DEFAULT 15, _offset integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  WITH me AS (SELECT auth.uid() AS uid),
  base AS (
    SELECT p.*
    FROM public.your_corner_posts p
    ORDER BY p.created_at DESC
    OFFSET GREATEST(_offset, 0)
    LIMIT GREATEST(_limit, 1)
  ),
  rx AS (
    SELECT r.post_id,
           count(*)::bigint AS reaction_count,
           bool_or(r.user_id = (SELECT uid FROM me)) AS liked_by_me
    FROM public.your_corner_reactions r
    WHERE r.post_id IN (SELECT id FROM base)
    GROUP BY r.post_id
  ),
  cm AS (
    SELECT c.post_id, count(*)::bigint AS comment_count
    FROM public.your_corner_comments c
    WHERE c.post_id IN (SELECT id FROM base)
    GROUP BY c.post_id
  ),
  bk AS (
    SELECT b.post_id, bool_or(b.user_id = (SELECT uid FROM me)) AS bookmarked_by_me
    FROM public.your_corner_bookmarks b
    WHERE b.post_id IN (SELECT id FROM base)
    GROUP BY b.post_id
  ),
  pv AS (
    SELECT v.post_id,
           jsonb_object_agg(v.option_index::text, v.cnt) AS poll_votes,
           max(v.my_vote) AS my_vote
    FROM (
      SELECT
        post_id,
        option_index,
        count(*) AS cnt,
        max(CASE WHEN user_id = (SELECT uid FROM me) THEN option_index END) AS my_vote
      FROM public.your_corner_poll_votes
      WHERE post_id IN (SELECT id FROM base)
      GROUP BY post_id, option_index
    ) v
    GROUP BY v.post_id
  ),
  agg AS (
    SELECT
      b.id, b.user_id, b.content, b.image_url, b.subject, b.mood, b.visibility, b.created_at, b.poll,
      COALESCE(rx.reaction_count, 0) AS reaction_count,
      COALESCE(rx.liked_by_me, false) AS liked_by_me,
      COALESCE(cm.comment_count, 0) AS comment_count,
      COALESCE(bk.bookmarked_by_me, false) AS bookmarked_by_me,
      pv.poll_votes,
      pv.my_vote
    FROM base b
    LEFT JOIN rx ON rx.post_id = b.id
    LEFT JOIN cm ON cm.post_id = b.id
    LEFT JOIN bk ON bk.post_id = b.id
    LEFT JOIN pv ON pv.post_id = b.id
  ),
  authors AS (
    SELECT pr.id, pr.full_name, pr.avatar_url
    FROM public.profiles pr
    WHERE pr.id IN (SELECT user_id FROM base)
  )
  SELECT jsonb_build_object(
    'posts', COALESCE((SELECT jsonb_agg(to_jsonb(agg) ORDER BY agg.created_at DESC) FROM agg), '[]'::jsonb),
    'authors', COALESCE((SELECT jsonb_agg(to_jsonb(a)) FROM authors a), '[]'::jsonb)
  );
$function$;

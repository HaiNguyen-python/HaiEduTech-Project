
-- Add poll support
ALTER TABLE public.your_corner_posts
  ADD COLUMN IF NOT EXISTS poll jsonb;

-- Index for poll lookups
CREATE INDEX IF NOT EXISTS your_corner_posts_created_idx ON public.your_corner_posts(created_at DESC);

-- Poll votes table
CREATE TABLE IF NOT EXISTS public.your_corner_poll_votes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid NOT NULL REFERENCES public.your_corner_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  option_index smallint NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.your_corner_poll_votes TO authenticated;
GRANT ALL ON public.your_corner_poll_votes TO service_role;
ALTER TABLE public.your_corner_poll_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated read poll votes"
  ON public.your_corner_poll_votes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users insert own poll vote"
  ON public.your_corner_poll_votes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own poll vote"
  ON public.your_corner_poll_votes FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own poll vote"
  ON public.your_corner_poll_votes FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS your_corner_poll_votes_post_idx ON public.your_corner_poll_votes(post_id);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.your_corner_poll_votes;

-- One-shot feed RPC: aggregates posts + reactions + comments + bookmarks + poll vote counts
CREATE OR REPLACE FUNCTION public.get_your_corner_feed(_limit int DEFAULT 15)
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  WITH me AS (SELECT auth.uid() AS uid),
  base AS (
    SELECT p.*
    FROM public.your_corner_posts p
    ORDER BY p.created_at DESC
    LIMIT GREATEST(_limit, 1)
  ),
  agg AS (
    SELECT
      b.id,
      b.user_id, b.content, b.image_url, b.subject, b.mood, b.visibility, b.created_at, b.poll,
      (SELECT count(*) FROM public.your_corner_reactions r WHERE r.post_id = b.id) AS reaction_count,
      EXISTS (SELECT 1 FROM public.your_corner_reactions r, me WHERE r.post_id = b.id AND r.user_id = me.uid) AS liked_by_me,
      (SELECT count(*) FROM public.your_corner_comments c WHERE c.post_id = b.id) AS comment_count,
      EXISTS (SELECT 1 FROM public.your_corner_bookmarks bk, me WHERE bk.post_id = b.id AND bk.user_id = me.uid) AS bookmarked_by_me,
      (SELECT jsonb_object_agg(v.option_index::text, v.cnt) FROM (
        SELECT option_index, count(*) AS cnt FROM public.your_corner_poll_votes WHERE post_id = b.id GROUP BY option_index
      ) v) AS poll_votes,
      (SELECT option_index FROM public.your_corner_poll_votes pv, me WHERE pv.post_id = b.id AND pv.user_id = me.uid) AS my_vote
    FROM base b
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
$$;

GRANT EXECUTE ON FUNCTION public.get_your_corner_feed(int) TO authenticated;

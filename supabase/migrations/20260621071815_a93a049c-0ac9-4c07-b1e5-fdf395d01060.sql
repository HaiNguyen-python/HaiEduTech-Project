
-- Add subject and mood to posts
ALTER TABLE public.your_corner_posts
  ADD COLUMN IF NOT EXISTS subject text,
  ADD COLUMN IF NOT EXISTS mood text;

-- Bookmarks table
CREATE TABLE IF NOT EXISTS public.your_corner_bookmarks (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.your_corner_posts(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);

GRANT SELECT, INSERT, DELETE ON public.your_corner_bookmarks TO authenticated;
GRANT ALL ON public.your_corner_bookmarks TO service_role;

ALTER TABLE public.your_corner_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own bookmarks"
  ON public.your_corner_bookmarks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_your_corner_bookmarks_post ON public.your_corner_bookmarks(post_id);
CREATE INDEX IF NOT EXISTS idx_your_corner_posts_subject ON public.your_corner_posts(subject);

ALTER PUBLICATION supabase_realtime ADD TABLE public.your_corner_bookmarks;

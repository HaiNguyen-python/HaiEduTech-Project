
-- POSTS
CREATE TABLE public.your_corner_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL CHECK (char_length(content) BETWEEN 1 AND 5000),
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.your_corner_posts TO authenticated;
GRANT ALL ON public.your_corner_posts TO service_role;
ALTER TABLE public.your_corner_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "yc_posts_select_authed" ON public.your_corner_posts
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "yc_posts_insert_own" ON public.your_corner_posts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "yc_posts_update_own" ON public.your_corner_posts
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "yc_posts_delete_own_or_staff" ON public.your_corner_posts
  FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.is_staff(auth.uid()));

CREATE TRIGGER trg_yc_posts_updated_at
  BEFORE UPDATE ON public.your_corner_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_yc_posts_created_at ON public.your_corner_posts(created_at DESC);
CREATE INDEX idx_yc_posts_user_id ON public.your_corner_posts(user_id);

-- COMMENTS
CREATE TABLE public.your_corner_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.your_corner_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL CHECK (char_length(content) BETWEEN 1 AND 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.your_corner_comments TO authenticated;
GRANT ALL ON public.your_corner_comments TO service_role;
ALTER TABLE public.your_corner_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "yc_comments_select_authed" ON public.your_corner_comments
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "yc_comments_insert_own" ON public.your_corner_comments
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "yc_comments_delete_own_or_postowner_or_staff" ON public.your_corner_comments
  FOR DELETE TO authenticated USING (
    auth.uid() = user_id
    OR public.is_staff(auth.uid())
    OR EXISTS (SELECT 1 FROM public.your_corner_posts p WHERE p.id = post_id AND p.user_id = auth.uid())
  );

CREATE INDEX idx_yc_comments_post_id ON public.your_corner_comments(post_id);

-- REACTIONS
CREATE TABLE public.your_corner_reactions (
  post_id uuid NOT NULL REFERENCES public.your_corner_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);
GRANT SELECT, INSERT, DELETE ON public.your_corner_reactions TO authenticated;
GRANT ALL ON public.your_corner_reactions TO service_role;
ALTER TABLE public.your_corner_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "yc_reactions_select_authed" ON public.your_corner_reactions
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "yc_reactions_insert_own" ON public.your_corner_reactions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "yc_reactions_delete_own" ON public.your_corner_reactions
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.your_corner_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.your_corner_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.your_corner_reactions;

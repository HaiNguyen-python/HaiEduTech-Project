ALTER TABLE public.your_corner_comments
  ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES public.your_corner_comments(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_yc_comments_parent_id ON public.your_corner_comments(parent_id);

CREATE TABLE public.your_corner_comment_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id uuid NOT NULL REFERENCES public.your_corner_comments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (comment_id, user_id)
);

GRANT SELECT, INSERT, DELETE ON public.your_corner_comment_reactions TO authenticated;
GRANT ALL ON public.your_corner_comment_reactions TO service_role;

ALTER TABLE public.your_corner_comment_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "yc_comment_reactions_select_authed" ON public.your_corner_comment_reactions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "yc_comment_reactions_insert_own" ON public.your_corner_comment_reactions
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "yc_comment_reactions_delete_own" ON public.your_corner_comment_reactions
  FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE INDEX idx_yc_comment_reactions_comment_id ON public.your_corner_comment_reactions(comment_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.your_corner_comment_reactions;
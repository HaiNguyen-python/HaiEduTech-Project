
ALTER TABLE public.your_corner_posts
  ADD COLUMN IF NOT EXISTS visibility text NOT NULL DEFAULT 'public'
  CHECK (visibility IN ('public', 'teacher_only', 'private'));

-- Replace the broad SELECT policy with a visibility-aware one
DROP POLICY IF EXISTS yc_posts_select_authed ON public.your_corner_posts;

CREATE POLICY yc_posts_select_visible
  ON public.your_corner_posts
  FOR SELECT
  TO authenticated
  USING (
    visibility = 'public'
    OR user_id = auth.uid()
    OR (visibility = 'teacher_only' AND public.is_staff(auth.uid()))
  );

CREATE INDEX IF NOT EXISTS idx_your_corner_posts_visibility ON public.your_corner_posts(visibility);

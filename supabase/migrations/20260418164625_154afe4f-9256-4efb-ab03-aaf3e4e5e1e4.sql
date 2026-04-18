-- 1) player_badges: remove self-insert, restrict to teachers/admins/service_role
DROP POLICY IF EXISTS "Users can insert own badges" ON public.player_badges;

CREATE POLICY "Teachers and admins can insert badges"
ON public.player_badges
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'teacher'::app_role) OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role can insert badges"
ON public.player_badges
FOR INSERT
TO service_role
WITH CHECK (true);

-- 2) student_notebooks: rebind policies from public role to authenticated
DROP POLICY IF EXISTS "Users can view own notebooks" ON public.student_notebooks;
DROP POLICY IF EXISTS "Users can create own notebooks" ON public.student_notebooks;
DROP POLICY IF EXISTS "Users can update own notebooks" ON public.student_notebooks;
DROP POLICY IF EXISTS "Users can delete own notebooks" ON public.student_notebooks;
DROP POLICY IF EXISTS "Teachers can view all notebooks" ON public.student_notebooks;

CREATE POLICY "Users can view own notebooks"
ON public.student_notebooks
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own notebooks"
ON public.student_notebooks
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notebooks"
ON public.student_notebooks
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notebooks"
ON public.student_notebooks
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view all notebooks"
ON public.student_notebooks
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'teacher'::app_role) OR public.has_role(auth.uid(), 'admin'::app_role));

-- 3) game_scores: drop anon read access (authenticated read remains for leaderboards)
DROP POLICY IF EXISTS "Anon can view all scores" ON public.game_scores;

-- 4) contact_messages: add explicit admin-only SELECT policy (defense in depth)
CREATE POLICY "Admins can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));
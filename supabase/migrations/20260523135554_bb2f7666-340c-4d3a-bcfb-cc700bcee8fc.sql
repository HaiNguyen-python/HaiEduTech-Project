
-- 1. class_schedules: restrict public read to authenticated users
DROP POLICY IF EXISTS "Anyone can view class schedules" ON public.class_schedules;
CREATE POLICY "Authenticated users can view class schedules"
ON public.class_schedules FOR SELECT TO authenticated USING (true);

-- 2. game_participants: scope UPDATE to owning authenticated user
DROP POLICY IF EXISTS "Anyone can update participants" ON public.game_participants;
CREATE POLICY "Users can update own participant row"
ON public.game_participants FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 3. hsk_example_translations: restrict INSERT to authenticated
DROP POLICY IF EXISTS "Public insert hsk translations" ON public.hsk_example_translations;
CREATE POLICY "Authenticated insert hsk translations"
ON public.hsk_example_translations FOR INSERT TO authenticated
WITH CHECK (true);

-- 4. generated_lessons: restrict INSERT to teachers/admins
DROP POLICY IF EXISTS "Authenticated users can create lessons" ON public.generated_lessons;
CREATE POLICY "Teachers and admins can create lessons"
ON public.generated_lessons FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = created_by
  AND (public.has_role(auth.uid(), 'teacher'::app_role) OR public.has_role(auth.uid(), 'admin'::app_role))
);

-- 5. learning_materials: restrict INSERT to teachers/admins
DROP POLICY IF EXISTS "Authenticated users can create materials" ON public.learning_materials;
CREATE POLICY "Teachers and admins can create materials"
ON public.learning_materials FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = created_by
  AND (public.has_role(auth.uid(), 'teacher'::app_role) OR public.has_role(auth.uid(), 'admin'::app_role))
);

-- 6. profiles: drop broad SELECT, add safe public view
DROP POLICY IF EXISTS "All authenticated can view profile names" ON public.profiles;

CREATE OR REPLACE VIEW public.public_profiles
WITH (security_invoker = true) AS
SELECT id, full_name, avatar_url FROM public.profiles;

GRANT SELECT ON public.public_profiles TO anon, authenticated;

-- Allow public_profiles view to bypass row policy on profiles by adding a permissive SELECT for the safe-columns case.
-- The simplest approach: add a policy that allows any authenticated user to SELECT, but rely on application code to only
-- read non-sensitive columns from public_profiles. Since RLS can't restrict columns, we instead allow SELECT on profiles
-- only for owners/teachers (already covered) and serve safe data via a SECURITY DEFINER function.
CREATE OR REPLACE FUNCTION public.get_public_profiles(_ids uuid[])
RETURNS TABLE(id uuid, full_name text, avatar_url text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.full_name, p.avatar_url
  FROM public.profiles p
  WHERE p.id = ANY(_ids);
$$;

GRANT EXECUTE ON FUNCTION public.get_public_profiles(uuid[]) TO anon, authenticated;

-- 7. user_vocab_mastered: drop public read; keep owner-only access. Leaderboards use SECURITY DEFINER RPCs.
DROP POLICY IF EXISTS "Public can read mastered for leaderboard" ON public.user_vocab_mastered;
CREATE POLICY "Users can read own mastered"
ON public.user_vocab_mastered FOR SELECT TO authenticated
USING (auth.uid() = user_id);


-- 1. Fix is_super_admin: only admin role, not teacher
CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'admin'::app_role);
$$;

-- 2. Placement audio: drop public read, add owner+staff read
DROP POLICY IF EXISTS "Placement audio public read" ON storage.objects;
CREATE POLICY "Placement audio owner read" ON storage.objects FOR SELECT
USING (bucket_id = 'placement-audio' AND ((auth.uid())::text = (storage.foldername(name))[1] OR public.is_staff(auth.uid())));

-- 3. Restrict song-images / vocab-images uploads to staff
DROP POLICY IF EXISTS "Authenticated upload song-images" ON storage.objects;
CREATE POLICY "Staff upload song-images" ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'song-images' AND public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Authenticated users can upload vocab images" ON storage.objects;
CREATE POLICY "Staff upload vocab-images" ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'vocab-images' AND public.is_staff(auth.uid()));

-- 4. user_subscriptions: split update — users can't self-activate
DROP POLICY IF EXISTS "Users update own subscription" ON public.user_subscriptions;
CREATE POLICY "Staff update subscriptions" ON public.user_subscriptions FOR UPDATE
USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

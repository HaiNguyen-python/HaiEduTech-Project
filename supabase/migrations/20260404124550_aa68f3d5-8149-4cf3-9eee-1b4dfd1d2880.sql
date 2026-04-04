CREATE POLICY "All authenticated can view profile names"
ON public.profiles FOR SELECT TO authenticated
USING (true);
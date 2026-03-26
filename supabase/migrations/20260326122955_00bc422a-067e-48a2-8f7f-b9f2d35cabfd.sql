
-- Allow teachers/admins to view all profiles
CREATE POLICY "Teachers can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

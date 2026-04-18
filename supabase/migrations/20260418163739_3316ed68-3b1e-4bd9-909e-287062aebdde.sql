-- Block all non-admin INSERT/UPDATE/DELETE on user_roles to prevent privilege escalation
-- The handle_new_user_role trigger uses SECURITY DEFINER so it bypasses RLS and still works

-- INSERT: only admins can add roles (trigger bypasses via SECURITY DEFINER)
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- UPDATE: only admins
CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- DELETE: only admins
CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
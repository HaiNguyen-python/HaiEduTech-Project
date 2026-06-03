-- Allow assistants (and any authenticated user) to insert notifications
-- ONLY when the recipient is a super_admin (teacher/admin). This enables
-- daily-report submissions to ping the admin bell without exposing
-- general notification spam.
CREATE POLICY "Users notify super admins"
ON public.assignment_notifications
FOR INSERT
TO authenticated
WITH CHECK (public.is_super_admin(user_id));
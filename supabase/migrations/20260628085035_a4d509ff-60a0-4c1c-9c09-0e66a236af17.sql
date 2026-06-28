
-- agency_leads: replace is_staff with admin/teacher
DROP POLICY IF EXISTS "Staff can view leads" ON public.agency_leads;
DROP POLICY IF EXISTS "Staff can update leads" ON public.agency_leads;
DROP POLICY IF EXISTS "Staff can delete leads" ON public.agency_leads;
CREATE POLICY "Admin/teacher view leads" ON public.agency_leads FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role));
CREATE POLICY "Admin/teacher update leads" ON public.agency_leads FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role));
CREATE POLICY "Admin/teacher delete leads" ON public.agency_leads FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role));

-- service_requests: remove redundant is_staff update/delete (admin/teacher policies already exist)
DROP POLICY IF EXISTS "Staff can update service requests" ON public.service_requests;
DROP POLICY IF EXISTS "Staff can delete service requests" ON public.service_requests;

-- teacher_contact_requests: drop redundant is_staff select
DROP POLICY IF EXISTS "Staff view all teacher_contact_requests" ON public.teacher_contact_requests;

-- lesson_attendance, lesson_feedback, student_activity_log, user_vocab_mastered, user_roles
DROP POLICY IF EXISTS "Staff view all lesson_attendance" ON public.lesson_attendance;
DROP POLICY IF EXISTS "Staff view all lesson_feedback" ON public.lesson_feedback;
DROP POLICY IF EXISTS "Staff view all student_activity_log" ON public.student_activity_log;
DROP POLICY IF EXISTS "Staff view all user_vocab_mastered" ON public.user_vocab_mastered;
DROP POLICY IF EXISTS "Staff view all user_roles" ON public.user_roles;

-- Storage: placement-audio — replace is_staff with admin/teacher
DROP POLICY IF EXISTS "Placement audio owner read" ON storage.objects;
CREATE POLICY "Placement audio owner or admin/teacher read" ON storage.objects FOR SELECT
  USING (
    bucket_id = 'placement-audio'
    AND (
      (auth.uid())::text = (storage.foldername(name))[1]
      OR has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
    )
  );

-- Storage: report-attachments — give teachers/admins read access
CREATE POLICY "Admin/teacher read report attachments" ON storage.objects FOR SELECT
  USING (
    bucket_id = 'report-attachments'
    AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role))
  );

-- Fix mutable search_path on email queue helper functions
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;

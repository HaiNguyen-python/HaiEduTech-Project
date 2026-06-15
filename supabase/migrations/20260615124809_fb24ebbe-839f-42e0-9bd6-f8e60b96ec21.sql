
-- 1) contact_messages: admin-only read
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Admins can view contact messages"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2) course_registrations: admin-only read
DROP POLICY IF EXISTS "Teachers can view registrations" ON public.course_registrations;
DROP POLICY IF EXISTS "Admins can view registrations" ON public.course_registrations;
CREATE POLICY "Admins can view registrations"
  ON public.course_registrations FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3) edtech_research_insights: admin-only read
DROP POLICY IF EXISTS "Staff can read all insights" ON public.edtech_research_insights;
CREATE POLICY "Admins can read all insights"
  ON public.edtech_research_insights FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 4) monthly_report_logs: admin-only read
DROP POLICY IF EXISTS "Staff view all monthly_report_logs" ON public.monthly_report_logs;
DROP POLICY IF EXISTS "Admins and teachers can view report logs" ON public.monthly_report_logs;
CREATE POLICY "Admins can view monthly_report_logs"
  ON public.monthly_report_logs FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 5) service_requests: admin + teacher only (exclude assistant)
DROP POLICY IF EXISTS "Staff can view service requests" ON public.service_requests;
CREATE POLICY "Admins and teachers can view service requests"
  ON public.service_requests FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'teacher'::app_role)
  );

-- 6) profiles: admin + teacher only for cross-user reads (exclude assistant). Own-profile reads remain.
DROP POLICY IF EXISTS "Staff view all profiles" ON public.profiles;
CREATE POLICY "Admins and teachers view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'teacher'::app_role)
  );

-- 7) vocab-images bucket: explicit restrictive UPDATE/DELETE policies (staff only)
DROP POLICY IF EXISTS "Staff can update vocab-images" ON storage.objects;
CREATE POLICY "Staff can update vocab-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'vocab-images' AND public.is_staff(auth.uid()))
  WITH CHECK (bucket_id = 'vocab-images' AND public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff can delete vocab-images" ON storage.objects;
CREATE POLICY "Staff can delete vocab-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'vocab-images' AND public.is_staff(auth.uid()));

-- 8) Fix function search_path on pgmq wrapper functions
CREATE OR REPLACE FUNCTION public.enqueue_email(queue_name text, payload jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pgmq
AS $function$
BEGIN
  RETURN pgmq.send(queue_name, payload);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload);
END;
$function$;

CREATE OR REPLACE FUNCTION public.read_email_batch(queue_name text, batch_size integer, vt integer)
 RETURNS TABLE(msg_id bigint, read_ct integer, message jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pgmq
AS $function$
BEGIN
  RETURN QUERY SELECT r.msg_id, r.read_ct, r.message FROM pgmq.read(queue_name, vt, batch_size) r;
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN;
END;
$function$;

CREATE OR REPLACE FUNCTION public.delete_email(queue_name text, message_id bigint)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pgmq
AS $function$
BEGIN
  RETURN pgmq.delete(queue_name, message_id);
EXCEPTION WHEN undefined_table THEN
  RETURN FALSE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.move_to_dlq(source_queue text, dlq_name text, message_id bigint, payload jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pgmq
AS $function$
DECLARE new_id BIGINT;
BEGIN
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  PERFORM pgmq.delete(source_queue, message_id);
  RETURN new_id;
EXCEPTION WHEN undefined_table THEN
  BEGIN
    PERFORM pgmq.create(dlq_name);
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  BEGIN
    PERFORM pgmq.delete(source_queue, message_id);
  EXCEPTION WHEN undefined_table THEN
    NULL;
  END;
  RETURN new_id;
END;
$function$;

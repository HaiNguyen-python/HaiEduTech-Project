
-- contact_messages: admin only
DROP POLICY IF EXISTS "Staff view all contact_messages" ON public.contact_messages;
CREATE POLICY "Admins view all contact_messages" ON public.contact_messages
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- course_registrations: admin only
DROP POLICY IF EXISTS "Staff view all course_registrations" ON public.course_registrations;
CREATE POLICY "Admins view all course_registrations" ON public.course_registrations
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- placement_test_results: admin or teacher
DROP POLICY IF EXISTS "Staff view all placement_test_results" ON public.placement_test_results;
CREATE POLICY "Admin/teacher view all placement_test_results" ON public.placement_test_results
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));

-- edtech_research_insights: admin-only delete
DROP POLICY IF EXISTS "Staff can delete insights" ON public.edtech_research_insights;
CREATE POLICY "Admins can delete insights" ON public.edtech_research_insights
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- service_requests: admin/teacher write
DROP POLICY IF EXISTS "Staff update service_requests" ON public.service_requests;
DROP POLICY IF EXISTS "Staff delete service_requests" ON public.service_requests;
DROP POLICY IF EXISTS "Staff can update service_requests" ON public.service_requests;
DROP POLICY IF EXISTS "Staff can delete service_requests" ON public.service_requests;
CREATE POLICY "Admin/teacher update service_requests" ON public.service_requests
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));
CREATE POLICY "Admin/teacher delete service_requests" ON public.service_requests
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));

-- assistant_bonuses: admin-only cross-user view
DROP POLICY IF EXISTS "Staff view all assistant_bonuses" ON public.assistant_bonuses;
CREATE POLICY "Admins view all assistant_bonuses" ON public.assistant_bonuses
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- chatbot_conversations: admin/teacher
DROP POLICY IF EXISTS "Staff view all chatbot_conversations" ON public.chatbot_conversations;
CREATE POLICY "Admin/teacher view all chatbot_conversations" ON public.chatbot_conversations
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));

-- daily_reports: admin/teacher
DROP POLICY IF EXISTS "Staff view all daily_reports" ON public.daily_reports;
CREATE POLICY "Admin/teacher view all daily_reports" ON public.daily_reports
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));

-- time_logs: admin/teacher
DROP POLICY IF EXISTS "Staff view all time_logs" ON public.time_logs;
CREATE POLICY "Admin/teacher view all time_logs" ON public.time_logs
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));

-- monthly_report_logs: allow service_role to write
CREATE POLICY "Service role insert monthly_report_logs" ON public.monthly_report_logs
  FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Service role update monthly_report_logs" ON public.monthly_report_logs
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role delete monthly_report_logs" ON public.monthly_report_logs
  FOR DELETE TO service_role USING (true);

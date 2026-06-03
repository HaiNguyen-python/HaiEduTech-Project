CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin'::app_role, 'teacher'::app_role, 'assistant'::app_role)
  );
$$;

DO $$
DECLARE
  rec record;
  tables text[] := ARRAY[
    'profiles','user_roles','student_activity_log','user_vocab_mastered',
    'daily_reports','time_logs','assistant_bonuses','lesson_feedback',
    'chatbot_conversations','lesson_attendance','class_schedules','classes',
    'class_members','course_registrations','contact_messages',
    'teacher_contact_requests','placement_test_results','monthly_report_logs'
  ];
  tname text;
  pname text;
BEGIN
  FOREACH tname IN ARRAY tables LOOP
    pname := 'Staff view all ' || tname;
    -- Drop pre-existing variant if present, then recreate cleanly.
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pname, tname);
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR SELECT USING (public.is_staff(auth.uid()))',
      pname, tname
    );
  END LOOP;
END$$;
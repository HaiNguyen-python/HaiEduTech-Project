-- Classes: only staff or enrolled members
DROP POLICY IF EXISTS "Anyone authenticated can view classes" ON public.classes;
CREATE POLICY "Members view their classes" ON public.classes FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.class_members m WHERE m.class_id = classes.id AND m.user_id = auth.uid()));

-- Public form inserts: validate shape instead of accepting anything
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.agency_leads;
CREATE POLICY "Anyone can submit a valid lead" ON public.agency_leads FOR INSERT TO anon, authenticated
WITH CHECK (status = 'new' AND length(client_name) BETWEEN 1 AND 200 AND length(email) BETWEEN 3 AND 255
  AND length(phone) BETWEEN 3 AND 40 AND coalesce(length(notes),0) <= 5000);

DROP POLICY IF EXISTS "Anyone can submit a service request" ON public.service_requests;
CREATE POLICY "Anyone can submit a valid service request" ON public.service_requests FOR INSERT TO anon, authenticated
WITH CHECK (status = 'new' AND length(teacher_name) BETWEEN 1 AND 200 AND length(email) BETWEEN 3 AND 255
  AND length(phone) BETWEEN 3 AND 40 AND length(selected_package) <= 200 AND coalesce(length(special_requirements),0) <= 5000);

DROP POLICY IF EXISTS "Public submit research responses" ON public.research_survey_responses;
CREATE POLICY "Submit valid research responses" ON public.research_survey_responses FOR INSERT TO anon, authenticated
WITH CHECK (length(user_role) BETWEEN 1 AND 100 AND pg_column_size(answers) <= 20000
  AND EXISTS (SELECT 1 FROM public.research_projects p WHERE p.id = project_id));

DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_view_log;
CREATE POLICY "Insert own page views" ON public.page_view_log FOR INSERT TO anon, authenticated
WITH CHECK ((user_id IS NULL OR user_id = auth.uid()) AND length(path) BETWEEN 1 AND 500);

DROP POLICY IF EXISTS "Anyone can submit insight" ON public.edtech_research_insights;
CREATE POLICY "Submit own insight" ON public.edtech_research_insights FOR INSERT TO anon, authenticated
WITH CHECK ((user_id IS NULL OR user_id = auth.uid()) AND length(user_role) BETWEEN 1 AND 100
  AND coalesce(length(pain_points),0) <= 5000 AND coalesce(length(feedback),0) <= 5000);

-- Public buckets: files stay reachable by public URL; stop listing all files
DROP POLICY IF EXISTS "Vocab images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can view vocab images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view vocab images" ON storage.objects;
DROP POLICY IF EXISTS "Lesson illustrations are publicly readable" ON storage.objects;
DROP POLICY IF EXISTS "Public can view marketing images" ON storage.objects;
DROP POLICY IF EXISTS "Public read song-images" ON storage.objects;
CREATE POLICY "Staff list public asset buckets" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id IN ('vocab-images','lesson-illustrations','marketing-images','song-images') AND public.is_staff(auth.uid()));
CREATE POLICY "Users list own avatar and corner images" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'marketing-images' AND (storage.foldername(name))[1] IN ('avatars','your-corner')
  AND (storage.foldername(name))[2] = auth.uid()::text);
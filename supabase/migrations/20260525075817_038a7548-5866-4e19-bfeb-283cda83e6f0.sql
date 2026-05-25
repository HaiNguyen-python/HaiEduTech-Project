
CREATE TABLE public.course_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  program TEXT NOT NULL,
  level TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.course_registrations ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated) can submit a registration
CREATE POLICY "Anyone can submit registrations"
ON public.course_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) > 0 AND length(name) <= 100
  AND length(trim(phone)) > 0 AND length(phone) <= 20
  AND length(program) > 0 AND length(program) <= 100
  AND (email IS NULL OR length(email) <= 255)
  AND (level IS NULL OR length(level) <= 100)
  AND (message IS NULL OR length(message) <= 2000)
);

-- Only teachers can read
CREATE POLICY "Teachers can view registrations"
ON public.course_registrations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'teacher'));

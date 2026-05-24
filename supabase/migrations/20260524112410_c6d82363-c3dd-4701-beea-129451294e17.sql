
-- Lesson attendance tracking
CREATE TABLE public.lesson_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  lesson_title TEXT,
  lesson_type TEXT,
  subject TEXT,
  status TEXT NOT NULL CHECK (status IN ('present','absent')),
  attendance_date DATE NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lesson_attendance_user ON public.lesson_attendance(user_id);
CREATE INDEX idx_lesson_attendance_date ON public.lesson_attendance(attendance_date DESC);
CREATE UNIQUE INDEX uq_lesson_attendance_user_lesson_date
  ON public.lesson_attendance(user_id, lesson_id, attendance_date);

ALTER TABLE public.lesson_attendance ENABLE ROW LEVEL SECURITY;

-- Authenticated users can insert their own attendance
CREATE POLICY "Users insert own attendance"
ON public.lesson_attendance FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can view their own
CREATE POLICY "Users view own attendance"
ON public.lesson_attendance FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Teachers/Admins can view all (uses existing has_role function)
CREATE POLICY "Staff view all attendance"
ON public.lesson_attendance FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));

-- Allow students to update (re-check-in) their own attendance row; upsert on the
-- unique (user_id, lesson_id, attendance_date) index needs UPDATE permission.
CREATE POLICY "Users update own attendance"
ON public.lesson_attendance
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE ON public.lesson_attendance TO authenticated;
GRANT ALL ON public.lesson_attendance TO service_role;

-- Feedback: only signed-in users may insert, and only as themselves.
DROP POLICY IF EXISTS "Anyone can insert feedback" ON public.lesson_feedback;
CREATE POLICY "Users insert own feedback"
ON public.lesson_feedback
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

GRANT SELECT, INSERT ON public.lesson_feedback TO authenticated;
GRANT ALL ON public.lesson_feedback TO service_role;

-- Remove diagnostic rows created while testing.
DELETE FROM public.lesson_attendance WHERE lesson_id = '/__diag_attendance';
DELETE FROM public.lesson_feedback WHERE lesson_id = '/__diag_attendance';
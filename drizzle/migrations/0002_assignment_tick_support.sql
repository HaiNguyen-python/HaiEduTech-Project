-- One progress row per (assignment, student) so the notebook checkbox can upsert safely.
CREATE UNIQUE INDEX IF NOT EXISTS student_submissions_assignment_student_key
  ON public.student_submissions (assignment_id, student_id);

-- Live updates: student ticks reach the teacher dashboard, new assignments reach the notebook.
ALTER PUBLICATION supabase_realtime ADD TABLE public.student_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.assignments;
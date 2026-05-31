-- Assignment management tables
CREATE TABLE public.assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL CHECK (subject IN ('ai_academy','english','chinese','scratch','other')),
  level text,
  assignment_type text NOT NULL CHECK (assignment_type IN ('platform_exercise','custom_quiz','coding_project')),
  source_ref text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  teacher_id uuid NOT NULL,
  teacher_name text,
  target_class text,
  target_student_ids uuid[] NOT NULL DEFAULT '{}',
  assigned_at timestamptz NOT NULL DEFAULT now(),
  deadline timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.assignments TO authenticated;
GRANT ALL ON public.assignments TO service_role;

ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers manage all assignments" ON public.assignments
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Students view their assignments" ON public.assignments
  FOR SELECT TO authenticated
  USING (auth.uid() = ANY(target_student_ids));

CREATE INDEX idx_assignments_teacher ON public.assignments(teacher_id);
CREATE INDEX idx_assignments_deadline ON public.assignments(deadline);
CREATE INDEX idx_assignments_subject ON public.assignments(subject);

CREATE TRIGGER trg_assignments_updated_at
  BEFORE UPDATE ON public.assignments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Submissions
CREATE TABLE public.student_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned','in_progress','completed','overdue')),
  accuracy numeric,
  score numeric,
  time_spent_seconds integer NOT NULL DEFAULT 0,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (assignment_id, student_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_submissions TO authenticated;
GRANT ALL ON public.student_submissions TO service_role;

ALTER TABLE public.student_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers manage all submissions" ON public.student_submissions
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Students view own submissions" ON public.student_submissions
  FOR SELECT TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Students insert own submissions" ON public.student_submissions
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students update own submissions" ON public.student_submissions
  FOR UPDATE TO authenticated
  USING (auth.uid() = student_id);

CREATE INDEX idx_submissions_assignment ON public.student_submissions(assignment_id);
CREATE INDEX idx_submissions_student ON public.student_submissions(student_id);
CREATE INDEX idx_submissions_status ON public.student_submissions(status);

CREATE TRIGGER trg_submissions_updated_at
  BEFORE UPDATE ON public.student_submissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
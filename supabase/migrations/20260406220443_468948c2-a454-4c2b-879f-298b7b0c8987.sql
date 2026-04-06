
CREATE TABLE public.student_notebooks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL DEFAULT 'general',
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.student_notebooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notebooks"
  ON public.student_notebooks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own notebooks"
  ON public.student_notebooks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notebooks"
  ON public.student_notebooks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notebooks"
  ON public.student_notebooks FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view all notebooks"
  ON public.student_notebooks FOR SELECT
  USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_student_notebooks_user_id ON public.student_notebooks(user_id);
CREATE INDEX idx_student_notebooks_subject ON public.student_notebooks(subject);


CREATE TABLE public.generated_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid,
  subject text NOT NULL,
  category text NOT NULL,
  level text,
  title text NOT NULL,
  title_en text,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  tags text[] DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT true
);

ALTER TABLE public.generated_lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published lessons"
  ON public.generated_lessons FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can create lessons"
  ON public.generated_lessons FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Service role can insert lessons"
  ON public.generated_lessons FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Creators can update own lessons"
  ON public.generated_lessons FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Creators can delete own lessons"
  ON public.generated_lessons FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE INDEX idx_generated_lessons_subject ON public.generated_lessons(subject);
CREATE INDEX idx_generated_lessons_category ON public.generated_lessons(category);
CREATE INDEX idx_generated_lessons_subject_category ON public.generated_lessons(subject, category);

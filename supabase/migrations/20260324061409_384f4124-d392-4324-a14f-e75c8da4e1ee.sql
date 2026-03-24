CREATE TABLE public.writing_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_type integer NOT NULL,
  prompt text NOT NULL,
  essay text NOT NULL,
  word_count integer NOT NULL,
  result jsonb NOT NULL DEFAULT '{}'::jsonb,
  overall_score numeric(3,1)
);

ALTER TABLE public.writing_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attempts" ON public.writing_attempts
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts" ON public.writing_attempts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
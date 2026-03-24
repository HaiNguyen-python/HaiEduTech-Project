
CREATE TABLE public.lesson_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id text NOT NULL,
  lesson_type text NOT NULL,
  feedback_type text NOT NULL CHECK (feedback_type IN ('like', 'dislike')),
  module_id text,
  subject text
);

ALTER TABLE public.lesson_feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can insert feedback (even anonymous for engagement)
CREATE POLICY "Anyone can insert feedback" ON public.lesson_feedback
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Authenticated users can view own feedback
CREATE POLICY "Users can view own feedback" ON public.lesson_feedback
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Teachers can view all feedback for analytics
CREATE POLICY "Teachers can view all feedback" ON public.lesson_feedback
  FOR SELECT TO authenticated USING (
    public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin')
  );

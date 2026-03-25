
-- Student activity log: tracks all learning events (exams, writing, speaking)
CREATE TABLE public.student_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  activity_type text NOT NULL, -- 'thpt_exam', 'ielts_writing', 'ielts_speaking', 'python_challenge'
  activity_id text, -- exam id, essay id, etc.
  score numeric,
  max_score numeric DEFAULT 10,
  time_spent_seconds integer,
  metadata jsonb DEFAULT '{}'::jsonb, -- category breakdown, mistakes, vocab used, etc.
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.student_activity_log ENABLE ROW LEVEL SECURITY;

-- Students can insert their own activity
CREATE POLICY "Students can insert own activity"
  ON public.student_activity_log FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Students can view own activity
CREATE POLICY "Students can view own activity"
  ON public.student_activity_log FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Teachers/admins can view all activity
CREATE POLICY "Teachers can view all activity"
  ON public.student_activity_log FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

-- RL Interventions table: stores system recommendations per student
CREATE TABLE public.rl_interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  state jsonb NOT NULL DEFAULT '{}'::jsonb, -- student proficiency snapshot
  action text NOT NULL, -- recommended intervention
  action_details jsonb DEFAULT '{}'::jsonb, -- specific lesson/resource to push
  reward numeric, -- improvement after intervention (filled later)
  status text NOT NULL DEFAULT 'pending', -- 'pending', 'applied', 'completed', 'dismissed'
  created_by uuid, -- teacher who reviewed/applied
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.rl_interventions ENABLE ROW LEVEL SECURITY;

-- Teachers can manage interventions
CREATE POLICY "Teachers can manage interventions"
  ON public.rl_interventions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

-- Students can view their own interventions
CREATE POLICY "Students can view own interventions"
  ON public.rl_interventions FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

-- Create index for performance
CREATE INDEX idx_activity_user_type ON public.student_activity_log(user_id, activity_type);
CREATE INDEX idx_activity_created ON public.student_activity_log(created_at DESC);
CREATE INDEX idx_interventions_student ON public.rl_interventions(student_id, status);

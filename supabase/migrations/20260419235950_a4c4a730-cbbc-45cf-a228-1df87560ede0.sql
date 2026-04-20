-- Personal Teaching Diary: stores solved classroom situations
CREATE TABLE public.teaching_diary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  scenario_type TEXT NOT NULL DEFAULT 'general',
  student_context TEXT,
  challenge TEXT NOT NULL,
  ai_solution JSONB NOT NULL DEFAULT '{}'::jsonb,
  teacher_notes TEXT,
  tags TEXT[] DEFAULT '{}',
  outcome_rating INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.teaching_diary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can view own diary entries"
ON public.teaching_diary FOR SELECT TO authenticated
USING (auth.uid() = user_id AND (has_role(auth.uid(),'teacher'::app_role) OR has_role(auth.uid(),'admin'::app_role)));

CREATE POLICY "Teachers can insert own diary entries"
ON public.teaching_diary FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id AND (has_role(auth.uid(),'teacher'::app_role) OR has_role(auth.uid(),'admin'::app_role)));

CREATE POLICY "Teachers can update own diary entries"
ON public.teaching_diary FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can delete own diary entries"
ON public.teaching_diary FOR DELETE TO authenticated
USING (auth.uid() = user_id);

CREATE TRIGGER set_teaching_diary_updated_at
BEFORE UPDATE ON public.teaching_diary
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_teaching_diary_user ON public.teaching_diary(user_id, created_at DESC);

-- Lesson Plan Reviews: stores AI-optimized lesson plans
CREATE TABLE public.lesson_plan_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT 'general',
  level TEXT,
  original_plan TEXT NOT NULL,
  ai_feedback JSONB NOT NULL DEFAULT '{}'::jsonb,
  quality_score INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.lesson_plan_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can view own lesson reviews"
ON public.lesson_plan_reviews FOR SELECT TO authenticated
USING (auth.uid() = user_id AND (has_role(auth.uid(),'teacher'::app_role) OR has_role(auth.uid(),'admin'::app_role)));

CREATE POLICY "Teachers can insert own lesson reviews"
ON public.lesson_plan_reviews FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id AND (has_role(auth.uid(),'teacher'::app_role) OR has_role(auth.uid(),'admin'::app_role)));

CREATE POLICY "Teachers can update own lesson reviews"
ON public.lesson_plan_reviews FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can delete own lesson reviews"
ON public.lesson_plan_reviews FOR DELETE TO authenticated
USING (auth.uid() = user_id);

CREATE TRIGGER set_lesson_plan_reviews_updated_at
BEFORE UPDATE ON public.lesson_plan_reviews
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_lesson_plan_reviews_user ON public.lesson_plan_reviews(user_id, created_at DESC);
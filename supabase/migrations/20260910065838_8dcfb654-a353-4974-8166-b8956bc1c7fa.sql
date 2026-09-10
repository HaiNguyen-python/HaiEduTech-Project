CREATE TABLE public.lifestyle_lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  pillar TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  max_score INTEGER NOT NULL DEFAULT 4,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.lifestyle_lesson_progress TO authenticated;
GRANT ALL ON public.lifestyle_lesson_progress TO service_role;

ALTER TABLE public.lifestyle_lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own lifestyle progress"
ON public.lifestyle_lesson_progress FOR ALL TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER set_lifestyle_lesson_progress_updated_at
BEFORE UPDATE ON public.lifestyle_lesson_progress
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
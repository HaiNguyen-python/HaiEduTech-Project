ALTER TABLE public.placement_test_results
  ADD COLUMN IF NOT EXISTS subject TEXT,
  ADD COLUMN IF NOT EXISTS assigned_class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS teacher_notes TEXT,
  ADD COLUMN IF NOT EXISTS graded_by UUID,
  ADD COLUMN IF NOT EXISTS graded_at TIMESTAMPTZ;

UPDATE public.placement_test_results
  SET subject = COALESCE(NULLIF(answers->>'__subject', ''), 'english')
  WHERE subject IS NULL;

ALTER TABLE public.placement_test_results
  ALTER COLUMN subject SET DEFAULT 'english';

CREATE INDEX IF NOT EXISTS placement_results_subject_idx
  ON public.placement_test_results (subject, created_at DESC);
CREATE INDEX IF NOT EXISTS placement_results_user_subject_idx
  ON public.placement_test_results (user_id, subject, created_at DESC);
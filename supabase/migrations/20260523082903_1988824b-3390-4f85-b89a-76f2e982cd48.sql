
ALTER TABLE public.lesson_feedback
  ADD COLUMN IF NOT EXISTS rating_clarity smallint,
  ADD COLUMN IF NOT EXISTS rating_ai_tool smallint,
  ADD COLUMN IF NOT EXISTS rating_confidence smallint,
  ADD COLUMN IF NOT EXISTS suggestion text,
  ADD COLUMN IF NOT EXISTS lesson_title text;

ALTER TABLE public.lesson_feedback DROP CONSTRAINT IF EXISTS lesson_feedback_rating_clarity_chk;
ALTER TABLE public.lesson_feedback DROP CONSTRAINT IF EXISTS lesson_feedback_rating_ai_tool_chk;
ALTER TABLE public.lesson_feedback DROP CONSTRAINT IF EXISTS lesson_feedback_rating_confidence_chk;

ALTER TABLE public.lesson_feedback
  ADD CONSTRAINT lesson_feedback_rating_clarity_chk CHECK (rating_clarity IS NULL OR rating_clarity BETWEEN 1 AND 5),
  ADD CONSTRAINT lesson_feedback_rating_ai_tool_chk CHECK (rating_ai_tool IS NULL OR rating_ai_tool BETWEEN 1 AND 5),
  ADD CONSTRAINT lesson_feedback_rating_confidence_chk CHECK (rating_confidence IS NULL OR rating_confidence BETWEEN 1 AND 5);

CREATE INDEX IF NOT EXISTS idx_lesson_feedback_created_at ON public.lesson_feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lesson_feedback_lesson_id ON public.lesson_feedback(lesson_id);

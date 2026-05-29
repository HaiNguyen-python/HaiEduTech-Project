-- Add reviewed_at column to track last review timestamp for spaced repetition.
-- Defaults to created_at for existing rows, then to now() for new rows.
ALTER TABLE public.user_vocab_mastered
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz;

UPDATE public.user_vocab_mastered
SET reviewed_at = created_at
WHERE reviewed_at IS NULL;

ALTER TABLE public.user_vocab_mastered
  ALTER COLUMN reviewed_at SET DEFAULT now(),
  ALTER COLUMN reviewed_at SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_uvm_user_subject_reviewed
  ON public.user_vocab_mastered (user_id, subject, reviewed_at);
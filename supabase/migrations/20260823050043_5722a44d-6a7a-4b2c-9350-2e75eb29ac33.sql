ALTER TABLE public.user_vocab_mastered
  ADD COLUMN IF NOT EXISTS review_count integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS last_interval_days integer;
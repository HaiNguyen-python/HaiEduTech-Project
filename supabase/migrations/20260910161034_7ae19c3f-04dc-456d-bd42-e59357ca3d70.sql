ALTER TABLE public.user_vocab_mastered
  ADD COLUMN IF NOT EXISTS lapse_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ease numeric NOT NULL DEFAULT 2.5;
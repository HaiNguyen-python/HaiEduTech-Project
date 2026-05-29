ALTER TABLE public.hsk_mnemonics
  ADD COLUMN IF NOT EXISTS components jsonb,
  ADD COLUMN IF NOT EXISTS formula text;

TRUNCATE TABLE public.hsk_mnemonics;
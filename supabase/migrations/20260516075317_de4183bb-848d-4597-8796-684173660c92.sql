-- Table to persist mastered vocabulary per user per subject (cross-device sync)
CREATE TABLE IF NOT EXISTS public.user_vocab_mastered (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  word TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, subject, word)
);

ALTER TABLE public.user_vocab_mastered ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read mastered for leaderboard"
  ON public.user_vocab_mastered FOR SELECT USING (true);

CREATE POLICY "Users insert own mastered"
  ON public.user_vocab_mastered FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own mastered"
  ON public.user_vocab_mastered FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_uvm_subject ON public.user_vocab_mastered(subject);
CREATE INDEX IF NOT EXISTS idx_uvm_user_subject ON public.user_vocab_mastered(user_id, subject);

-- Leaderboard RPC: count of mastered words per user per subject
CREATE OR REPLACE FUNCTION public.get_mastery_leaderboard(_subject text)
RETURNS TABLE(user_id uuid, score bigint, display_name text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT
    p.id AS user_id,
    COALESCE(c.cnt, 0)::bigint AS score,
    COALESCE(p.full_name, 'Student')::text AS display_name
  FROM public.profiles p
  LEFT JOIN (
    SELECT uvm.user_id, COUNT(*) AS cnt
    FROM public.user_vocab_mastered uvm
    WHERE uvm.subject = _subject
    GROUP BY uvm.user_id
  ) c ON c.user_id = p.id
  ORDER BY COALESCE(c.cnt, 0) DESC, p.full_name
  LIMIT 200;
$$;

-- Cached translations for HSK example sentences (shared across users)
CREATE TABLE IF NOT EXISTS public.hsk_example_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_text TEXT NOT NULL UNIQUE,
  vi TEXT,
  en TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.hsk_example_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hsk translations" ON public.hsk_example_translations FOR SELECT USING (true);
CREATE POLICY "Public insert hsk translations" ON public.hsk_example_translations FOR INSERT WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_hsk_trans_source ON public.hsk_example_translations(source_text);
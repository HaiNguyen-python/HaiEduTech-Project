-- HSKK Speaking attempts
CREATE TABLE public.hskk_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  level TEXT NOT NULL,
  part SMALLINT NOT NULL,
  prompt_id TEXT NOT NULL,
  prompt_text TEXT,
  transcript TEXT,
  scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  feedback JSONB NOT NULL DEFAULT '{}'::jsonb,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.hskk_attempts TO authenticated;
GRANT ALL ON public.hskk_attempts TO service_role;

ALTER TABLE public.hskk_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own hskk attempts" ON public.hskk_attempts
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own hskk attempts" ON public.hskk_attempts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own hskk attempts" ON public.hskk_attempts
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Teachers can view all hskk attempts" ON public.hskk_attempts
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_hskk_attempts_user_created ON public.hskk_attempts(user_id, created_at DESC);

-- Vocab SRS state (FSRS algorithm)
CREATE TABLE public.vocab_srs_state (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  subject TEXT NOT NULL DEFAULT 'chinese',
  word_key TEXT NOT NULL,
  word_display TEXT,
  pinyin TEXT,
  meaning TEXT,
  level TEXT,
  stability NUMERIC NOT NULL DEFAULT 0,
  difficulty NUMERIC NOT NULL DEFAULT 5,
  last_review TIMESTAMPTZ,
  due_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  reps INTEGER NOT NULL DEFAULT 0,
  lapses INTEGER NOT NULL DEFAULT 0,
  state TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, subject, word_key)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.vocab_srs_state TO authenticated;
GRANT ALL ON public.vocab_srs_state TO service_role;

ALTER TABLE public.vocab_srs_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users full control own srs" ON public.vocab_srs_state
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_srs_due ON public.vocab_srs_state(user_id, subject, due_date);

CREATE TRIGGER srs_set_updated_at
  BEFORE UPDATE ON public.vocab_srs_state
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- HSK Writing attempts
CREATE TABLE public.hsk_writing_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  level TEXT NOT NULL,
  task_type TEXT NOT NULL,
  prompt_id TEXT,
  prompt_text TEXT,
  content TEXT NOT NULL,
  word_count INTEGER,
  grade JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.hsk_writing_attempts TO authenticated;
GRANT ALL ON public.hsk_writing_attempts TO service_role;

ALTER TABLE public.hsk_writing_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own writing" ON public.hsk_writing_attempts
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own writing" ON public.hsk_writing_attempts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own writing" ON public.hsk_writing_attempts
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Teachers view all writing" ON public.hsk_writing_attempts
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_writing_user_created ON public.hsk_writing_attempts(user_id, created_at DESC);
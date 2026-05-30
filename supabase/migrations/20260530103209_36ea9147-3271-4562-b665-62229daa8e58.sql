CREATE TABLE public.hsk_srs_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  word_id TEXT NOT NULL,
  hsk_level INTEGER,
  easiness NUMERIC NOT NULL DEFAULT 2.5,
  interval_days INTEGER NOT NULL DEFAULT 0,
  repetitions INTEGER NOT NULL DEFAULT 0,
  next_review TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_reviewed TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, word_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.hsk_srs_progress TO authenticated;
GRANT ALL ON public.hsk_srs_progress TO service_role;

ALTER TABLE public.hsk_srs_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own SRS" ON public.hsk_srs_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own SRS" ON public.hsk_srs_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own SRS" ON public.hsk_srs_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own SRS" ON public.hsk_srs_progress
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX idx_hsk_srs_user_next ON public.hsk_srs_progress(user_id, next_review);

CREATE TRIGGER trg_hsk_srs_updated_at
  BEFORE UPDATE ON public.hsk_srs_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
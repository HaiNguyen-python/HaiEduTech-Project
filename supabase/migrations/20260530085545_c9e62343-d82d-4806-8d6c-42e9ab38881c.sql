-- SAT Error Log (mistake notebook)
CREATE TABLE public.sat_mistakes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  source text NOT NULL DEFAULT 'lesson', -- lesson | exercise | mock | daily
  module_id text,
  lesson_id text,
  section text NOT NULL DEFAULT 'reading-writing', -- reading-writing | math
  question_type text, -- words-in-context, evidence, algebra, geometry, ...
  question text NOT NULL,
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  chosen_index integer,
  correct_index integer NOT NULL,
  explanation text,
  correct_streak integer NOT NULL DEFAULT 0,
  mastered_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sat_mistakes TO authenticated;
GRANT ALL ON public.sat_mistakes TO service_role;

ALTER TABLE public.sat_mistakes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own sat mistakes"
  ON public.sat_mistakes FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users insert own sat mistakes"
  ON public.sat_mistakes FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own sat mistakes"
  ON public.sat_mistakes FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own sat mistakes"
  ON public.sat_mistakes FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER sat_mistakes_updated_at
  BEFORE UPDATE ON public.sat_mistakes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_sat_mistakes_user ON public.sat_mistakes(user_id, created_at DESC);
CREATE INDEX idx_sat_mistakes_user_section ON public.sat_mistakes(user_id, section);

-- SAT Daily Warm-up log
CREATE TABLE public.sat_daily_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  day date NOT NULL DEFAULT ((now() AT TIME ZONE 'utc')::date),
  correct integer NOT NULL DEFAULT 0,
  total integer NOT NULL DEFAULT 5,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, day)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sat_daily_log TO authenticated;
GRANT ALL ON public.sat_daily_log TO service_role;

ALTER TABLE public.sat_daily_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own sat daily"
  ON public.sat_daily_log FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users insert own sat daily"
  ON public.sat_daily_log FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own sat daily"
  ON public.sat_daily_log FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.application_deadlines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  university TEXT NOT NULL,
  program TEXT,
  country TEXT,
  deadline_date DATE NOT NULL,
  application_type TEXT,
  status TEXT NOT NULL DEFAULT 'planned',
  priority TEXT NOT NULL DEFAULT 'normal',
  notes TEXT,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.application_deadlines TO authenticated;
GRANT ALL ON public.application_deadlines TO service_role;

ALTER TABLE public.application_deadlines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own deadlines" ON public.application_deadlines
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own deadlines" ON public.application_deadlines
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own deadlines" ON public.application_deadlines
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own deadlines" ON public.application_deadlines
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX idx_app_deadlines_user_date ON public.application_deadlines(user_id, deadline_date);

CREATE TRIGGER trg_app_deadlines_updated_at
  BEFORE UPDATE ON public.application_deadlines
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
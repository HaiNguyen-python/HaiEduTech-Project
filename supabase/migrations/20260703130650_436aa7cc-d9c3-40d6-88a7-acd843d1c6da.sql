
-- 1) vff_progress
CREATE TABLE public.vff_progress (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vff_progress TO authenticated;
GRANT ALL ON public.vff_progress TO service_role;
ALTER TABLE public.vff_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "vff_progress own read"   ON public.vff_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "vff_progress own insert" ON public.vff_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "vff_progress own update" ON public.vff_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "vff_progress own delete" ON public.vff_progress FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER trg_vff_progress_updated_at BEFORE UPDATE ON public.vff_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2) vff_writing_submissions
CREATE TABLE public.vff_writing_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt text NOT NULL,
  learner_text text NOT NULL,
  scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  feedback jsonb NOT NULL DEFAULT '{}'::jsonb,
  overall_score numeric(4,2),
  level text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX vff_writing_user_idx ON public.vff_writing_submissions (user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vff_writing_submissions TO authenticated;
GRANT ALL ON public.vff_writing_submissions TO service_role;
ALTER TABLE public.vff_writing_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "vff_writing own read"   ON public.vff_writing_submissions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "vff_writing own insert" ON public.vff_writing_submissions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "vff_writing own delete" ON public.vff_writing_submissions FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 3) vff_audio_clips
CREATE TABLE public.vff_audio_clips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clip_key text NOT NULL UNIQUE,
  level text NOT NULL,
  text_vi text NOT NULL,
  text_en text,
  region text NOT NULL DEFAULT 'north',
  speaker text,
  audio_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX vff_audio_level_idx ON public.vff_audio_clips (level, region);
GRANT SELECT ON public.vff_audio_clips TO anon, authenticated;
GRANT ALL ON public.vff_audio_clips TO service_role;
ALTER TABLE public.vff_audio_clips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "vff_audio public read"     ON public.vff_audio_clips FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "vff_audio staff manage"    ON public.vff_audio_clips FOR ALL   TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

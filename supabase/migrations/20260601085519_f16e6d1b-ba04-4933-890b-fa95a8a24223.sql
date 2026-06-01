
-- Placement test results storage
CREATE TABLE public.placement_test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  student_name text,
  listening_score numeric NOT NULL DEFAULT 0,
  reading_score numeric NOT NULL DEFAULT 0,
  writing_score numeric NOT NULL DEFAULT 0,
  speaking_score numeric NOT NULL DEFAULT 0,
  total_score numeric NOT NULL DEFAULT 0,
  cefr_band text,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  essays jsonb NOT NULL DEFAULT '{}'::jsonb,
  audio_urls jsonb NOT NULL DEFAULT '{}'::jsonb,
  assigned_class text,
  status text NOT NULL DEFAULT 'pending',
  duration_seconds integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.placement_test_results TO authenticated;
GRANT ALL ON public.placement_test_results TO service_role;

ALTER TABLE public.placement_test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert own placement result"
  ON public.placement_test_results FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own placement result"
  ON public.placement_test_results FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Teachers update placement results"
  ON public.placement_test_results FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_placement_updated
  BEFORE UPDATE ON public.placement_test_results
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_placement_user ON public.placement_test_results(user_id);
CREATE INDEX idx_placement_created ON public.placement_test_results(created_at DESC);

-- Public storage bucket for placement audio recordings
INSERT INTO storage.buckets (id, name, public)
VALUES ('placement-audio', 'placement-audio', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Placement audio public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'placement-audio');

CREATE POLICY "Users upload own placement audio"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'placement-audio' AND auth.uid()::text = (storage.foldername(name))[1]);

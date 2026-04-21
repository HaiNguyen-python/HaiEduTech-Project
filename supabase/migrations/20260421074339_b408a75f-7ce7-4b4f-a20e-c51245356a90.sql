-- Motivation letter drafts
CREATE TABLE public.motivation_letter_drafts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Draft',
  target_school TEXT,
  target_program TEXT,
  content TEXT NOT NULL DEFAULT '',
  word_count INTEGER NOT NULL DEFAULT 0,
  ai_suggestions JSONB NOT NULL DEFAULT '{}'::jsonb,
  ai_polished_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.motivation_letter_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users full control own drafts"
  ON public.motivation_letter_drafts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers view all drafts"
  ON public.motivation_letter_drafts FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_motivation_letter_drafts_updated_at
  BEFORE UPDATE ON public.motivation_letter_drafts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_mld_user_updated ON public.motivation_letter_drafts(user_id, updated_at DESC);

-- Profile strength assessments
CREATE TABLE public.profile_strength_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  overall_score INTEGER NOT NULL DEFAULT 0,
  academic_score INTEGER NOT NULL DEFAULT 0,
  language_score INTEGER NOT NULL DEFAULT 0,
  experience_score INTEGER NOT NULL DEFAULT 0,
  documents_score INTEGER NOT NULL DEFAULT 0,
  motivation_score INTEGER NOT NULL DEFAULT 0,
  strengths JSONB NOT NULL DEFAULT '[]'::jsonb,
  weaknesses JSONB NOT NULL DEFAULT '[]'::jsonb,
  recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
  summary TEXT NOT NULL DEFAULT '',
  context_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profile_strength_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users full control own assessments"
  ON public.profile_strength_assessments FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers view all assessments"
  ON public.profile_strength_assessments FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_psa_user_created ON public.profile_strength_assessments(user_id, created_at DESC);
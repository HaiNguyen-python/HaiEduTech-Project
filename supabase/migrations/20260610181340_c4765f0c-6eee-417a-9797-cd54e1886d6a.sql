
-- PhD Research (EdTech) Hub: notes + citations + literature searches
CREATE TABLE public.phd_research_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic text NOT NULL,
  title text NOT NULL,
  content text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  importance integer NOT NULL DEFAULT 3 CHECK (importance BETWEEN 1 AND 5),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.phd_research_notes TO authenticated;
GRANT ALL ON public.phd_research_notes TO service_role;
ALTER TABLE public.phd_research_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff manage own phd notes" ON public.phd_research_notes
  FOR ALL TO authenticated
  USING (auth.uid() = user_id AND public.is_staff(auth.uid()))
  WITH CHECK (auth.uid() = user_id AND public.is_staff(auth.uid()));
CREATE TRIGGER trg_phd_notes_updated BEFORE UPDATE ON public.phd_research_notes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX idx_phd_notes_user_topic ON public.phd_research_notes(user_id, topic);

CREATE TABLE public.phd_research_citations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic text NOT NULL DEFAULT 'general',
  title text NOT NULL,
  authors text,
  year integer,
  source_url text,
  summary text,
  tags text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.phd_research_citations TO authenticated;
GRANT ALL ON public.phd_research_citations TO service_role;
ALTER TABLE public.phd_research_citations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff manage own phd citations" ON public.phd_research_citations
  FOR ALL TO authenticated
  USING (auth.uid() = user_id AND public.is_staff(auth.uid()))
  WITH CHECK (auth.uid() = user_id AND public.is_staff(auth.uid()));
CREATE INDEX idx_phd_citations_user ON public.phd_research_citations(user_id, created_at DESC);

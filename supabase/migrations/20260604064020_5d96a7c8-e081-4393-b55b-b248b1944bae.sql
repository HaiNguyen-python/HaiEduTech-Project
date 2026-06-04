-- Create english_dictionary table for HaiEduTech curated dictionary
CREATE TABLE public.english_dictionary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  word TEXT NOT NULL,
  phonetic TEXT,
  part_of_speech TEXT,
  vietnamese_definition TEXT NOT NULL,
  english_definition TEXT,
  examples JSONB NOT NULL DEFAULT '[]'::jsonb,
  collocations_synonyms JSONB NOT NULL DEFAULT '[]'::jsonb,
  tag TEXT DEFAULT 'General',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Unique case-insensitive index on word for fast lookup and dedup
CREATE UNIQUE INDEX english_dictionary_word_lower_idx
  ON public.english_dictionary (LOWER(TRIM(word)));

CREATE INDEX english_dictionary_tag_idx ON public.english_dictionary (tag);

-- Grants
GRANT SELECT ON public.english_dictionary TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.english_dictionary TO authenticated;
GRANT ALL ON public.english_dictionary TO service_role;

-- RLS
ALTER TABLE public.english_dictionary ENABLE ROW LEVEL SECURITY;

-- Anyone can read
CREATE POLICY "Public can read english dictionary"
  ON public.english_dictionary FOR SELECT
  USING (true);

-- Only teachers/admins can insert
CREATE POLICY "Staff can insert english dictionary"
  ON public.english_dictionary FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'teacher'::app_role)
    OR public.has_role(auth.uid(), 'admin'::app_role)
  );

-- Only teachers/admins can update
CREATE POLICY "Staff can update english dictionary"
  ON public.english_dictionary FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'teacher'::app_role)
    OR public.has_role(auth.uid(), 'admin'::app_role)
  );

-- Only teachers/admins can delete
CREATE POLICY "Staff can delete english dictionary"
  ON public.english_dictionary FOR DELETE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'teacher'::app_role)
    OR public.has_role(auth.uid(), 'admin'::app_role)
  );

-- Auto-update updated_at
CREATE TRIGGER english_dictionary_set_updated_at
  BEFORE UPDATE ON public.english_dictionary
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
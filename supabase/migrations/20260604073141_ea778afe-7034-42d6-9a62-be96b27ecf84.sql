
-- Helper: shared updated_at trigger already exists (public.set_updated_at)

-- ============== CHINESE DICTIONARY (ZH) ==============
CREATE TABLE public.chinese_dictionary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  phonetic text,
  part_of_speech text,
  vietnamese_definition text NOT NULL,
  english_definition text,
  examples jsonb NOT NULL DEFAULT '[]'::jsonb,
  collocations_synonyms jsonb NOT NULL DEFAULT '[]'::jsonb,
  tag text DEFAULT 'General',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT chinese_dictionary_word_unique UNIQUE (word)
);
CREATE INDEX chinese_dictionary_word_lower_idx ON public.chinese_dictionary (lower(trim(word)));
CREATE INDEX chinese_dictionary_tag_idx ON public.chinese_dictionary (tag);

GRANT SELECT ON public.chinese_dictionary TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chinese_dictionary TO authenticated;
GRANT ALL ON public.chinese_dictionary TO service_role;

ALTER TABLE public.chinese_dictionary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read chinese dictionary"
  ON public.chinese_dictionary FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff can insert chinese dictionary"
  ON public.chinese_dictionary FOR INSERT TO authenticated
  WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff can update chinese dictionary"
  ON public.chinese_dictionary FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff can delete chinese dictionary"
  ON public.chinese_dictionary FOR DELETE TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE TRIGGER chinese_dictionary_set_updated_at
  BEFORE UPDATE ON public.chinese_dictionary
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============== FINNISH DICTIONARY (FI) ==============
CREATE TABLE public.finnish_dictionary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  phonetic text,
  part_of_speech text,
  vietnamese_definition text NOT NULL,
  english_definition text,
  examples jsonb NOT NULL DEFAULT '[]'::jsonb,
  collocations_synonyms jsonb NOT NULL DEFAULT '[]'::jsonb,
  tag text DEFAULT 'General',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT finnish_dictionary_word_unique UNIQUE (word)
);
CREATE INDEX finnish_dictionary_word_lower_idx ON public.finnish_dictionary (lower(trim(word)));
CREATE INDEX finnish_dictionary_tag_idx ON public.finnish_dictionary (tag);

GRANT SELECT ON public.finnish_dictionary TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.finnish_dictionary TO authenticated;
GRANT ALL ON public.finnish_dictionary TO service_role;

ALTER TABLE public.finnish_dictionary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read finnish dictionary"
  ON public.finnish_dictionary FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff can insert finnish dictionary"
  ON public.finnish_dictionary FOR INSERT TO authenticated
  WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff can update finnish dictionary"
  ON public.finnish_dictionary FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff can delete finnish dictionary"
  ON public.finnish_dictionary FOR DELETE TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE TRIGGER finnish_dictionary_set_updated_at
  BEFORE UPDATE ON public.finnish_dictionary
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============== VIETNAMESE DICTIONARY (VI) ==============
CREATE TABLE public.vietnamese_dictionary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  phonetic text,
  part_of_speech text,
  vietnamese_definition text NOT NULL,
  english_definition text,
  examples jsonb NOT NULL DEFAULT '[]'::jsonb,
  collocations_synonyms jsonb NOT NULL DEFAULT '[]'::jsonb,
  tag text DEFAULT 'General',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT vietnamese_dictionary_word_unique UNIQUE (word)
);
CREATE INDEX vietnamese_dictionary_word_lower_idx ON public.vietnamese_dictionary (lower(trim(word)));
CREATE INDEX vietnamese_dictionary_tag_idx ON public.vietnamese_dictionary (tag);

GRANT SELECT ON public.vietnamese_dictionary TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vietnamese_dictionary TO authenticated;
GRANT ALL ON public.vietnamese_dictionary TO service_role;

ALTER TABLE public.vietnamese_dictionary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read vietnamese dictionary"
  ON public.vietnamese_dictionary FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff can insert vietnamese dictionary"
  ON public.vietnamese_dictionary FOR INSERT TO authenticated
  WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff can update vietnamese dictionary"
  ON public.vietnamese_dictionary FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff can delete vietnamese dictionary"
  ON public.vietnamese_dictionary FOR DELETE TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE TRIGGER vietnamese_dictionary_set_updated_at
  BEFORE UPDATE ON public.vietnamese_dictionary
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Cache table for AI-enhanced programming theory content
CREATE TABLE IF NOT EXISTS public.programming_theory_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id text NOT NULL,
  lesson_id text NOT NULL,
  enhanced_markdown text NOT NULL,
  citations jsonb NOT NULL DEFAULT '[]'::jsonb,
  generated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (module_id, lesson_id)
);

ALTER TABLE public.programming_theory_cache ENABLE ROW LEVEL SECURITY;

-- Anyone can read cached theory (it's pedagogical content, no PII)
CREATE POLICY "Anyone can view theory cache"
  ON public.programming_theory_cache FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can request generation (insert/upsert via edge function with service role)
CREATE POLICY "Service role manages theory cache"
  ON public.programming_theory_cache FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- Authenticated users can also upsert their own enhancements
CREATE POLICY "Authenticated can upsert theory cache"
  ON public.programming_theory_cache FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = generated_by);

CREATE POLICY "Authenticated can update theory cache"
  ON public.programming_theory_cache FOR UPDATE
  TO authenticated
  USING (true);

CREATE TRIGGER programming_theory_cache_set_updated_at
  BEFORE UPDATE ON public.programming_theory_cache
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_programming_theory_cache_lookup
  ON public.programming_theory_cache (module_id, lesson_id);
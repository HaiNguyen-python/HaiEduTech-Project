CREATE TABLE public.dictionary_cache (
  cache_key TEXT PRIMARY KEY,
  kind TEXT NOT NULL,
  payload JSONB NOT NULL,
  hit_count INTEGER NOT NULL DEFAULT 1,
  last_hit_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_dictionary_cache_kind ON public.dictionary_cache(kind);
CREATE INDEX idx_dictionary_cache_last_hit ON public.dictionary_cache(last_hit_at DESC);
GRANT SELECT ON public.dictionary_cache TO anon, authenticated;
GRANT ALL ON public.dictionary_cache TO service_role;
ALTER TABLE public.dictionary_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read cache" ON public.dictionary_cache FOR SELECT USING (true);
CREATE TABLE public.dictionary_lookups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  lang text NOT NULL CHECK (lang IN ('en','zh','fi','vi')),
  user_id uuid NULL,
  source text NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_dict_lookups_lang_word ON public.dictionary_lookups (lang, lower(word));
CREATE INDEX idx_dict_lookups_created_at ON public.dictionary_lookups (created_at DESC);
CREATE INDEX idx_dict_lookups_user_id ON public.dictionary_lookups (user_id);

GRANT SELECT ON public.dictionary_lookups TO authenticated;
GRANT ALL ON public.dictionary_lookups TO service_role;

ALTER TABLE public.dictionary_lookups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can read dictionary lookups"
  ON public.dictionary_lookups FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()));

-- Aggregated top-words function (staff only) -------------------------------
CREATE OR REPLACE FUNCTION public.get_top_dictionary_lookups(
  _lang text DEFAULT NULL,
  _days integer DEFAULT 30,
  _limit integer DEFAULT 50
)
RETURNS TABLE(word text, lang text, lookup_count bigint, unique_users bigint, last_looked_up_at timestamptz)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    lower(dl.word) AS word,
    dl.lang AS lang,
    COUNT(*)::bigint AS lookup_count,
    COUNT(DISTINCT dl.user_id)::bigint AS unique_users,
    MAX(dl.created_at) AS last_looked_up_at
  FROM public.dictionary_lookups dl
  WHERE dl.created_at >= now() - make_interval(days => GREATEST(_days, 1))
    AND (_lang IS NULL OR dl.lang = _lang)
    AND public.is_staff(auth.uid())
  GROUP BY lower(dl.word), dl.lang
  ORDER BY lookup_count DESC, last_looked_up_at DESC
  LIMIT GREATEST(_limit, 1);
$$;

GRANT EXECUTE ON FUNCTION public.get_top_dictionary_lookups(text, integer, integer) TO authenticated;
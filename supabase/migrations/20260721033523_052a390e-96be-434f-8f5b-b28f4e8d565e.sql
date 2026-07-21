
CREATE TABLE public.country_visits (
  country_code text NOT NULL PRIMARY KEY,
  country_name text NOT NULL,
  visits integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.country_visits TO anon, authenticated;
GRANT ALL ON public.country_visits TO service_role;

ALTER TABLE public.country_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view country visits"
  ON public.country_visits FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.increment_country_visit(_code text, _name text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _code IS NULL OR length(_code) <> 2 THEN
    RETURN;
  END IF;
  INSERT INTO public.country_visits (country_code, country_name, visits, updated_at)
  VALUES (upper(_code), COALESCE(_name, upper(_code)), 1, now())
  ON CONFLICT (country_code) DO UPDATE
    SET visits = public.country_visits.visits + 1,
        country_name = COALESCE(EXCLUDED.country_name, public.country_visits.country_name),
        updated_at = now();
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_country_visit(text, text) TO anon, authenticated;

CREATE TABLE public.country_visit_hits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_hash text NOT NULL,
  country_code text NOT NULL,
  visit_day date NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')::date,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX country_visit_hits_unique ON public.country_visit_hits (visitor_hash, country_code, visit_day);

GRANT ALL ON public.country_visit_hits TO service_role;

ALTER TABLE public.country_visit_hits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view visit hits" ON public.country_visit_hits
FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.record_country_visit(_code text, _name text, _visitor_hash text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_code text;
  v_inserted integer;
BEGIN
  IF _code IS NULL OR length(trim(_code)) <> 2 OR _visitor_hash IS NULL OR length(_visitor_hash) < 16 THEN
    RETURN false;
  END IF;
  v_code := upper(trim(_code));

  INSERT INTO public.country_visit_hits (visitor_hash, country_code)
  VALUES (_visitor_hash, v_code)
  ON CONFLICT (visitor_hash, country_code, visit_day) DO NOTHING;

  GET DIAGNOSTICS v_inserted = ROW_COUNT;
  IF v_inserted = 0 THEN
    RETURN false;
  END IF;

  INSERT INTO public.country_visits (country_code, country_name, visits, updated_at)
  VALUES (v_code, COALESCE(NULLIF(trim(_name), ''), v_code), 1, now())
  ON CONFLICT (country_code) DO UPDATE
    SET visits = public.country_visits.visits + 1,
        country_name = COALESCE(NULLIF(trim(EXCLUDED.country_name), ''), public.country_visits.country_name),
        updated_at = now();

  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION public.record_country_visit(text, text, text) TO service_role;

CREATE OR REPLACE FUNCTION public.get_public_student_count()
RETURNS integer
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT count(*)::integer FROM public.profiles;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_student_count() TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.get_public_pageview_total()
RETURNS integer
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT count(*)::integer FROM public.page_view_log;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_pageview_total() TO anon, authenticated, service_role;
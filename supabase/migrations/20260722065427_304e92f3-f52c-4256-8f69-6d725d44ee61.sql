GRANT SELECT ON public.country_visits TO anon, authenticated;
GRANT ALL ON public.country_visits TO service_role;
GRANT EXECUTE ON FUNCTION public.increment_country_visit(text, text) TO anon, authenticated, service_role;
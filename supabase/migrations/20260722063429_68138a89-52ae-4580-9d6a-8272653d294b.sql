-- Ensure the Data API can reach country_visits for the public heat map.
GRANT SELECT ON public.country_visits TO anon, authenticated;
GRANT ALL ON public.country_visits TO service_role;

-- Allow anonymous visitors to invoke the visit counter RPC.
GRANT EXECUTE ON FUNCTION public.increment_country_visit(text, text) TO anon, authenticated;
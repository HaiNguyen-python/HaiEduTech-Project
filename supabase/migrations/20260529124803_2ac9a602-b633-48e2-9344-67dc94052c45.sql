
CREATE TABLE public.hsk_mnemonics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  character TEXT NOT NULL UNIQUE,
  radicals TEXT NOT NULL,
  story TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.hsk_mnemonics TO anon;
GRANT SELECT ON public.hsk_mnemonics TO authenticated;
GRANT ALL ON public.hsk_mnemonics TO service_role;
ALTER TABLE public.hsk_mnemonics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read mnemonics" ON public.hsk_mnemonics FOR SELECT TO anon, authenticated USING (true);

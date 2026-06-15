CREATE TABLE public.edtech_research_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  user_role text NOT NULL,
  preferred_tools jsonb NOT NULL DEFAULT '[]'::jsonb,
  pain_points text,
  feedback text,
  contact_email text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.edtech_research_insights TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.edtech_research_insights TO authenticated;
GRANT ALL ON public.edtech_research_insights TO service_role;

ALTER TABLE public.edtech_research_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit insight"
ON public.edtech_research_insights
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Staff can read all insights"
ON public.edtech_research_insights
FOR SELECT
TO authenticated
USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can delete insights"
ON public.edtech_research_insights
FOR DELETE
TO authenticated
USING (public.is_staff(auth.uid()));

CREATE INDEX idx_edtech_insights_created_at ON public.edtech_research_insights(created_at DESC);
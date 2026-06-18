
DO $$ BEGIN
  CREATE TYPE public.agency_lead_status AS ENUM ('new','in_discussion','won','lost');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.agency_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  organization_or_school text,
  selected_package text,
  notes text,
  status public.agency_lead_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.agency_leads TO authenticated;
GRANT INSERT ON public.agency_leads TO anon;
GRANT ALL ON public.agency_leads TO service_role;

ALTER TABLE public.agency_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.agency_leads;
CREATE POLICY "Anyone can submit a lead" ON public.agency_leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view leads" ON public.agency_leads;
CREATE POLICY "Staff can view leads" ON public.agency_leads
  FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff can update leads" ON public.agency_leads;
CREATE POLICY "Staff can update leads" ON public.agency_leads
  FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff can delete leads" ON public.agency_leads;
CREATE POLICY "Staff can delete leads" ON public.agency_leads
  FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

DROP TRIGGER IF EXISTS agency_leads_set_updated_at ON public.agency_leads;
CREATE TRIGGER agency_leads_set_updated_at
  BEFORE UPDATE ON public.agency_leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS agency_leads_created_at_idx ON public.agency_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS agency_leads_status_idx ON public.agency_leads (status);

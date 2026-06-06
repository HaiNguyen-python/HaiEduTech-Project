
DO $$ BEGIN
  CREATE TYPE public.service_request_status AS ENUM ('new','contacted','completed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE public.service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  subject_taught text,
  selected_package text NOT NULL,
  special_requirements text,
  status public.service_request_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.service_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_requests TO authenticated;
GRANT ALL ON public.service_requests TO service_role;

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated visitors) may submit a request
CREATE POLICY "Anyone can submit a service request"
ON public.service_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only staff (teacher / admin / assistant) can read all requests
CREATE POLICY "Staff can view service requests"
ON public.service_requests
FOR SELECT
TO authenticated
USING (public.is_staff(auth.uid()));

-- Only staff can update request status
CREATE POLICY "Staff can update service requests"
ON public.service_requests
FOR UPDATE
TO authenticated
USING (public.is_staff(auth.uid()))
WITH CHECK (public.is_staff(auth.uid()));

-- Only staff can delete service requests
CREATE POLICY "Staff can delete service requests"
ON public.service_requests
FOR DELETE
TO authenticated
USING (public.is_staff(auth.uid()));

CREATE TRIGGER set_service_requests_updated_at
BEFORE UPDATE ON public.service_requests
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

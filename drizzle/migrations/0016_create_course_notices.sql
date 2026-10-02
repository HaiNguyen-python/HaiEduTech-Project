CREATE TABLE public.course_notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notice_code text NOT NULL UNIQUE,
  student_id uuid NULL,
  recipient_name text NOT NULL,
  recipient_email text NOT NULL,
  recipient_phone text NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent')),
  snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by uuid NOT NULL,
  updated_by uuid NOT NULL,
  sent_at timestamptz NULL,
  sent_by uuid NULL,
  send_count integer NOT NULL DEFAULT 0 CHECK (send_count >= 0),
  last_send_status text NULL,
  last_send_error text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_notices TO authenticated;
GRANT ALL ON public.course_notices TO service_role;

ALTER TABLE public.course_notices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers manage course notices"
ON public.course_notices FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));

CREATE INDEX course_notices_created_at_idx ON public.course_notices (created_at DESC);
CREATE INDEX course_notices_student_id_idx ON public.course_notices (student_id) WHERE student_id IS NOT NULL;
CREATE INDEX course_notices_recipient_email_idx ON public.course_notices (lower(recipient_email));

CREATE TRIGGER set_course_notices_updated_at
BEFORE UPDATE ON public.course_notices
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_now();
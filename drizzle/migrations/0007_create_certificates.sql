CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  student_id uuid,
  student_name text NOT NULL,
  course_key text NOT NULL,
  course_label_en text,
  course_label_vi text,
  level text,
  score numeric,
  max_score numeric,
  note text,
  issued_at date NOT NULL DEFAULT current_date,
  issued_by uuid,
  revoked_at timestamptz,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX certificates_student_id_idx ON public.certificates (student_id);
CREATE INDEX certificates_issued_at_idx ON public.certificates (issued_at DESC);

GRANT SELECT, INSERT, UPDATE ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can read all certificates"
ON public.certificates FOR SELECT TO authenticated
USING (public.is_staff(auth.uid()));

CREATE POLICY "Students can read own certificates"
ON public.certificates FOR SELECT TO authenticated
USING (student_id = auth.uid());

CREATE POLICY "Staff can issue certificates"
ON public.certificates FOR INSERT TO authenticated
WITH CHECK (public.is_staff(auth.uid()) AND issued_by = auth.uid());

CREATE POLICY "Staff can update certificates"
ON public.certificates FOR UPDATE TO authenticated
USING (public.is_staff(auth.uid()))
WITH CHECK (public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.verify_certificate(_code text)
RETURNS TABLE(
  code text,
  student_name text,
  course_key text,
  course_label_en text,
  course_label_vi text,
  level text,
  issued_at date,
  revoked boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.code, c.student_name, c.course_key, c.course_label_en, c.course_label_vi,
         c.level, c.issued_at, (c.revoked_at IS NOT NULL) AS revoked
  FROM public.certificates c
  WHERE upper(c.code) = upper(trim(_code))
  LIMIT 1
$$;

GRANT EXECUTE ON FUNCTION public.verify_certificate(text) TO anon, authenticated;
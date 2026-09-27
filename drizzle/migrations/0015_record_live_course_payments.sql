CREATE TABLE public.course_payments (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, course_key text NOT NULL, class_type text NOT NULL CHECK (class_type IN ('group','private')), price_id text NOT NULL, amount_eur integer NOT NULL, environment text NOT NULL CHECK (environment IN ('sandbox','live')), stripe_session_id text NOT NULL UNIQUE, paid_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.course_payments TO authenticated;
GRANT ALL ON public.course_payments TO service_role;
ALTER TABLE public.course_payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students view own course payments" ON public.course_payments FOR SELECT TO authenticated USING (user_id = (select auth.uid()));
CREATE POLICY "Staff view course payments" ON public.course_payments FOR SELECT TO authenticated USING (public.is_staff((select auth.uid())));
CREATE INDEX course_payments_user_id_idx ON public.course_payments (user_id, paid_at DESC);
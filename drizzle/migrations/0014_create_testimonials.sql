CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  course text NOT NULL DEFAULT '',
  score text NOT NULL DEFAULT '',
  score_label text NOT NULL DEFAULT '',
  quote_vi text NOT NULL DEFAULT '',
  quote_en text NOT NULL DEFAULT '',
  avatar_url text,
  certificate_code text,
  display_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX testimonials_published_order_idx
  ON public.testimonials (is_published, display_order);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published testimonials are publicly readable"
  ON public.testimonials FOR SELECT
  TO anon, authenticated
  USING (is_published);

CREATE POLICY "Staff can manage testimonials"
  ON public.testimonials FOR ALL
  TO authenticated
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE TRIGGER set_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_now();

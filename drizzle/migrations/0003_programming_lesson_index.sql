CREATE TABLE IF NOT EXISTS public.programming_lesson_index (
  module_id text NOT NULL,
  lesson_id text NOT NULL,
  module_title text NOT NULL DEFAULT '',
  lesson_title text NOT NULL DEFAULT '',
  base_theory text NOT NULL DEFAULT '',
  code_language text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (module_id, lesson_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.programming_lesson_index TO authenticated;
GRANT ALL ON public.programming_lesson_index TO service_role;

ALTER TABLE public.programming_lesson_index ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff read programming lesson index"
ON public.programming_lesson_index FOR SELECT TO authenticated
USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff write programming lesson index"
ON public.programming_lesson_index FOR INSERT TO authenticated
WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff update programming lesson index"
ON public.programming_lesson_index FOR UPDATE TO authenticated
USING (public.is_staff(auth.uid()))
WITH CHECK (public.is_staff(auth.uid()));
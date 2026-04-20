-- Tighten UPDATE policy: only the generator OR teachers/admins can update
DROP POLICY IF EXISTS "Authenticated can update theory cache" ON public.programming_theory_cache;
DROP POLICY IF EXISTS "Service role manages theory cache" ON public.programming_theory_cache;

CREATE POLICY "Generator or staff can update theory cache"
  ON public.programming_theory_cache FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = generated_by
    OR public.has_role(auth.uid(), 'teacher'::app_role)
    OR public.has_role(auth.uid(), 'admin'::app_role)
  )
  WITH CHECK (
    auth.uid() = generated_by
    OR public.has_role(auth.uid(), 'teacher'::app_role)
    OR public.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Staff can delete theory cache"
  ON public.programming_theory_cache FOR DELETE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'teacher'::app_role)
    OR public.has_role(auth.uid(), 'admin'::app_role)
  );

-- Service role bypasses RLS by design; no explicit policy needed.
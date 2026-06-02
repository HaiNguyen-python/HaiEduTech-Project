-- Bonuses awarded to assistants by super admins
CREATE TABLE public.assistant_bonuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount numeric(12,2) NOT NULL CHECK (amount > 0),
  reason text NOT NULL,
  granted_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.assistant_bonuses TO authenticated;
GRANT ALL ON public.assistant_bonuses TO service_role;

ALTER TABLE public.assistant_bonuses ENABLE ROW LEVEL SECURITY;

-- Recipients can view their own bonuses
CREATE POLICY "Users view own bonuses"
ON public.assistant_bonuses
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Super admins (admin or teacher) can view all bonuses
CREATE POLICY "Super admins view all bonuses"
ON public.assistant_bonuses
FOR SELECT
TO authenticated
USING (public.is_super_admin(auth.uid()));

-- Super admins can grant bonuses
CREATE POLICY "Super admins grant bonuses"
ON public.assistant_bonuses
FOR INSERT
TO authenticated
WITH CHECK (public.is_super_admin(auth.uid()) AND granted_by = auth.uid());

-- Super admins can revoke / edit bonuses
CREATE POLICY "Super admins update bonuses"
ON public.assistant_bonuses
FOR UPDATE
TO authenticated
USING (public.is_super_admin(auth.uid()));

CREATE POLICY "Super admins delete bonuses"
ON public.assistant_bonuses
FOR DELETE
TO authenticated
USING (public.is_super_admin(auth.uid()));

CREATE INDEX idx_assistant_bonuses_user_created ON public.assistant_bonuses(user_id, created_at DESC);
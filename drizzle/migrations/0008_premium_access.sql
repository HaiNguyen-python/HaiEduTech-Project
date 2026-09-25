ALTER TABLE public.user_subscriptions
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'bank',
  ADD COLUMN IF NOT EXISTS expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS stripe_session_id text,
  ADD COLUMN IF NOT EXISTS environment text,
  ADD COLUMN IF NOT EXISTS code_redeemed_at timestamptz;

GRANT ALL ON public.user_subscriptions TO service_role;

CREATE OR REPLACE FUNCTION public.has_premium(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.is_staff(_user_id) OR EXISTS (
    SELECT 1 FROM public.user_subscriptions
    WHERE user_id = _user_id AND status = 'active'
      AND (expires_at IS NULL OR expires_at > now())
  )
$$;
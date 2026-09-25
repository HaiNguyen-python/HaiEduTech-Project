DROP POLICY IF EXISTS "Users create own subscription" ON public.user_subscriptions;
CREATE POLICY "Users create own subscription" ON public.user_subscriptions
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND status = 'pending_verification' AND expires_at IS NULL AND source = 'bank');
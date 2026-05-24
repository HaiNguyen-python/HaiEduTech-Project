
-- 1. user_subscriptions: restrict policies to authenticated role only
DROP POLICY IF EXISTS "Users create own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users update own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users view own subscription" ON public.user_subscriptions;

CREATE POLICY "Users create own subscription"
ON public.user_subscriptions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own subscription"
ON public.user_subscriptions
FOR UPDATE
TO authenticated
USING ((auth.uid() = user_id) OR has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role))
WITH CHECK ((auth.uid() = user_id) OR has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users view own subscription"
ON public.user_subscriptions
FOR SELECT
TO authenticated
USING ((auth.uid() = user_id) OR has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- 2. game_rooms: tighten duel room UPDATE to require ownership
DROP POLICY IF EXISTS "Anyone can update duel rooms" ON public.game_rooms;

CREATE POLICY "Creators can update own duel rooms"
ON public.game_rooms
FOR UPDATE
TO authenticated
USING (
  ((settings ->> 'type'::text) = 'duel'::text)
  AND (created_by = auth.uid())
)
WITH CHECK (
  ((settings ->> 'type'::text) = 'duel'::text)
  AND (created_by = auth.uid())
);

-- 3. programming_theory_cache: add explicit INSERT policy restricted to teachers/admins
CREATE POLICY "Teachers and admins can insert theory cache"
ON public.programming_theory_cache
FOR INSERT
TO authenticated
WITH CHECK (
  (auth.uid() = generated_by)
  AND (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role))
);

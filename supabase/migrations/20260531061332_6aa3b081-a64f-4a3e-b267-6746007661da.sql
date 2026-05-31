DROP POLICY IF EXISTS "Users can update own participant row" ON public.game_participants;

CREATE POLICY "Update own or guest participant row"
ON public.game_participants
FOR UPDATE
USING ((user_id IS NULL) OR (auth.uid() = user_id))
WITH CHECK ((user_id IS NULL) OR (auth.uid() = user_id));
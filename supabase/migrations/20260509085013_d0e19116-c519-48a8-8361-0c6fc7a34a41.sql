
ALTER TABLE public.game_rooms ALTER COLUMN created_by DROP NOT NULL;

DROP POLICY IF EXISTS "Anyone can create duel rooms" ON public.game_rooms;
CREATE POLICY "Anyone can create duel rooms"
ON public.game_rooms
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (settings->>'type') = 'duel'
);

DROP POLICY IF EXISTS "Anyone can update duel rooms" ON public.game_rooms;
CREATE POLICY "Anyone can update duel rooms"
ON public.game_rooms
FOR UPDATE
TO anon, authenticated
USING ((settings->>'type') = 'duel')
WITH CHECK ((settings->>'type') = 'duel');

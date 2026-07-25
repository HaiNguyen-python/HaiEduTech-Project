
-- Allow room creators (teachers) to see participants in their rooms
CREATE OR REPLACE FUNCTION public.is_room_creator(_room_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.game_rooms WHERE id = _room_id AND created_by = auth.uid());
$$;

DROP POLICY IF EXISTS "Participants view own or same room" ON public.game_participants;
CREATE POLICY "Participants view own room or creator"
ON public.game_participants FOR SELECT
TO authenticated, anon
USING (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  OR public.is_room_participant(room_id)
  OR public.is_room_creator(room_id)
);

-- Allow guest joins (user_id null) and authenticated joins into non-duel rooms
DROP POLICY IF EXISTS "Authenticated can join games" ON public.game_participants;
CREATE POLICY "Anyone can join classroom rooms"
ON public.game_participants FOR INSERT
TO authenticated, anon
WITH CHECK (
  (user_id IS NULL OR user_id = auth.uid())
  AND EXISTS (
    SELECT 1 FROM public.game_rooms r
    WHERE r.id = room_id
      AND r.status IN ('waiting','playing')
      AND COALESCE(r.settings->>'type','') <> 'duel'
  )
);

-- Guests need SELECT on game_rooms to look up by code
DROP POLICY IF EXISTS "Anyone authenticated can view rooms" ON public.game_rooms;
CREATE POLICY "Anyone can view rooms"
ON public.game_rooms FOR SELECT
TO authenticated, anon
USING (true);

GRANT SELECT ON public.game_rooms TO anon;
GRANT SELECT, INSERT, UPDATE ON public.game_participants TO anon;

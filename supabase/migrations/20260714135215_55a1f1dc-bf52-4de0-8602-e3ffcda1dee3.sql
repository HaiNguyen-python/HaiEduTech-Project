
-- Helper: check whether current user is in a given room (SECURITY DEFINER to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.is_room_participant(_room_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.game_participants
    WHERE room_id = _room_id AND user_id = auth.uid()
  );
$$;

-- game_rooms: remove public/anon access
DROP POLICY IF EXISTS "Public can view rooms" ON public.game_rooms;
DROP POLICY IF EXISTS "Anyone can create duel rooms" ON public.game_rooms;

CREATE POLICY "Authenticated can create duel rooms"
ON public.game_rooms
FOR INSERT
TO authenticated
WITH CHECK (
  ((settings ->> 'type') = 'duel')
  AND created_by = auth.uid()
);

-- game_participants: remove public/anon access, restrict SELECT and INSERT to authenticated
DROP POLICY IF EXISTS "Public can view participants" ON public.game_participants;
DROP POLICY IF EXISTS "Anyone can join games" ON public.game_participants;

CREATE POLICY "Participants view own or same room"
ON public.game_participants
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
  OR public.is_room_participant(room_id)
);

CREATE POLICY "Authenticated can join games"
ON public.game_participants
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

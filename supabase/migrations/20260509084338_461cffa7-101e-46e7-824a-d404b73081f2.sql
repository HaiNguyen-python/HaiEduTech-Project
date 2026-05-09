
-- Allow guests to join classroom battle without login
ALTER TABLE public.game_participants ALTER COLUMN user_id DROP NOT NULL;

-- Drop old restrictive policies
DROP POLICY IF EXISTS "Anyone can view participants in their room" ON public.game_participants;
DROP POLICY IF EXISTS "Users can join games" ON public.game_participants;
DROP POLICY IF EXISTS "Users can update own participant" ON public.game_participants;

-- New permissive policies for both authenticated and anonymous players
CREATE POLICY "Public can view participants"
ON public.game_participants
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can join games"
ON public.game_participants
FOR INSERT
TO anon, authenticated
WITH CHECK (
  user_id IS NULL OR auth.uid() = user_id
);

CREATE POLICY "Anyone can update participants"
ON public.game_participants
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Also allow anon to read game_rooms so they can find the room by code
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'game_rooms' AND policyname = 'Public can view rooms') THEN
    NULL;
  ELSE
    CREATE POLICY "Public can view rooms"
    ON public.game_rooms
    FOR SELECT
    TO anon, authenticated
    USING (true);
  END IF;
END $$;

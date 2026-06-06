-- Allow any authenticated user (teacher or student) to create a vocab arena game room.
-- Previously only teachers/admins could create rooms which caused silent RLS failures
-- when students or non-teacher accounts clicked "Create Room".
DROP POLICY IF EXISTS "Teachers can create rooms" ON public.game_rooms;
CREATE POLICY "Authenticated users can create rooms"
  ON public.game_rooms
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());
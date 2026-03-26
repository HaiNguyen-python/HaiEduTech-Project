
-- Game rooms for Classroom Battle mode
CREATE TABLE public.game_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code text NOT NULL UNIQUE,
  created_by uuid NOT NULL,
  status text NOT NULL DEFAULT 'waiting',
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  ended_at timestamptz
);

-- Game participants (both solo and classroom)
CREATE TABLE public.game_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES public.game_rooms(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  display_name text,
  score integer NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  lives integer NOT NULL DEFAULT 3,
  answers_correct integer NOT NULL DEFAULT 0,
  answers_total integer NOT NULL DEFAULT 0,
  word_results jsonb NOT NULL DEFAULT '[]'::jsonb,
  finished_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.game_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_participants ENABLE ROW LEVEL SECURITY;

-- RLS for game_rooms
CREATE POLICY "Anyone authenticated can view rooms" ON public.game_rooms
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Teachers can create rooms" ON public.game_rooms
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Teachers can update own rooms" ON public.game_rooms
  FOR UPDATE TO authenticated
  USING (created_by = auth.uid());

-- RLS for game_participants
CREATE POLICY "Anyone can view participants in their room" ON public.game_participants
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can join games" ON public.game_participants
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own participant" ON public.game_participants
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Enable realtime for live leaderboard
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_rooms;

-- Game scores for leaderboard
CREATE TABLE public.game_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  game_type text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  max_streak integer NOT NULL DEFAULT 0,
  accuracy numeric,
  time_spent_seconds integer,
  difficulty text DEFAULT 'normal',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view all scores" ON public.game_scores
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert own scores" ON public.game_scores
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Player badges
CREATE TABLE public.player_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  badge_id text NOT NULL,
  badge_name text NOT NULL,
  badge_icon text NOT NULL DEFAULT '🏆',
  earned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE public.player_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view all badges" ON public.player_badges
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert own badges" ON public.player_badges
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Enable realtime for game_scores for live leaderboard
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_scores;
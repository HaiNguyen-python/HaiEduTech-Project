
ALTER TABLE public.game_participants
  ADD COLUMN IF NOT EXISTS current_question integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS current_word text;

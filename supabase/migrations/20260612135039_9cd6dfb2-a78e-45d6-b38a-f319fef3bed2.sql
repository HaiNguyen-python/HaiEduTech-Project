
CREATE TABLE public.user_pet_xp (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp integer NOT NULL DEFAULT 0,
  last_source text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.user_pet_xp TO authenticated;
GRANT ALL ON public.user_pet_xp TO service_role;

ALTER TABLE public.user_pet_xp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_pet_xp_select" ON public.user_pet_xp
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own_pet_xp_insert" ON public.user_pet_xp
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own_pet_xp_update" ON public.user_pet_xp
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

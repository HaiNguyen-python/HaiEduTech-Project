CREATE TABLE public.word_quest_progress (
  user_id uuid NOT NULL,
  storage_key text NOT NULL,
  progress jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, storage_key)
);
GRANT SELECT, INSERT, UPDATE ON public.word_quest_progress TO authenticated;
GRANT ALL ON public.word_quest_progress TO service_role;
ALTER TABLE public.word_quest_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own word quest progress read" ON public.word_quest_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Own word quest progress insert" ON public.word_quest_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own word quest progress update" ON public.word_quest_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
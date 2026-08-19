CREATE TABLE public.speaking_srs_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  item_type text NOT NULL,
  content text NOT NULL,
  content_key text NOT NULL,
  target text,
  tip text,
  part integer,
  topic text,
  question_id text,
  stage integer NOT NULL DEFAULT 0,
  due_at timestamptz NOT NULL DEFAULT now(),
  last_reviewed_at timestamptz,
  attempts integer NOT NULL DEFAULT 0,
  mastered boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX speaking_srs_items_user_item_uidx
  ON public.speaking_srs_items (user_id, item_type, content_key);
CREATE INDEX speaking_srs_items_due_idx
  ON public.speaking_srs_items (user_id, mastered, due_at);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.speaking_srs_items TO authenticated;
GRANT ALL ON public.speaking_srs_items TO service_role;

ALTER TABLE public.speaking_srs_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own speaking SRS items"
  ON public.speaking_srs_items FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER speaking_srs_items_set_updated_at
  BEFORE UPDATE ON public.speaking_srs_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
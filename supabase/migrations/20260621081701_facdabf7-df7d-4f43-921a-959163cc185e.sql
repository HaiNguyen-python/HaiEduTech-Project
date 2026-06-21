CREATE TABLE public.your_corner_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL CHECK (char_length(content) BETWEEN 1 AND 2000),
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_ycm_pair ON public.your_corner_messages (sender_id, recipient_id, created_at DESC);
CREATE INDEX idx_ycm_recipient_unread ON public.your_corner_messages (recipient_id) WHERE read_at IS NULL;

GRANT SELECT, INSERT, UPDATE ON public.your_corner_messages TO authenticated;
GRANT ALL ON public.your_corner_messages TO service_role;

ALTER TABLE public.your_corner_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY ycm_select_own ON public.your_corner_messages
  FOR SELECT TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY ycm_insert_self ON public.your_corner_messages
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = sender_id AND sender_id <> recipient_id);

CREATE POLICY ycm_update_read ON public.your_corner_messages
  FOR UPDATE TO authenticated
  USING (auth.uid() = recipient_id)
  WITH CHECK (auth.uid() = recipient_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.your_corner_messages;
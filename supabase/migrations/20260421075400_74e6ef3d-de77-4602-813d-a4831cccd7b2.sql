CREATE OR REPLACE FUNCTION public.set_updated_at_now()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.writing_drafts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  task_type INTEGER NOT NULL CHECK (task_type IN (1, 2)),
  sub_type TEXT,
  prompt TEXT NOT NULL,
  prompt_meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  essay TEXT NOT NULL DEFAULT '',
  word_count INTEGER NOT NULL DEFAULT 0,
  title TEXT NOT NULL DEFAULT 'Untitled draft',
  time_left_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.writing_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own writing drafts"
ON public.writing_drafts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own writing drafts"
ON public.writing_drafts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own writing drafts"
ON public.writing_drafts FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own writing drafts"
ON public.writing_drafts FOR DELETE
USING (auth.uid() = user_id);

CREATE INDEX idx_writing_drafts_user_updated
ON public.writing_drafts(user_id, updated_at DESC);

CREATE TRIGGER trg_writing_drafts_updated_at
BEFORE UPDATE ON public.writing_drafts
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_now();
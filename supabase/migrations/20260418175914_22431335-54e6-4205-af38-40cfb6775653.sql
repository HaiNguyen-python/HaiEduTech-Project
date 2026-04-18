CREATE TABLE public.pte_vocab_mastery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  word TEXT NOT NULL,
  mastered BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, word)
);

ALTER TABLE public.pte_vocab_mastery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pte mastery"
  ON public.pte_vocab_mastery FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pte mastery"
  ON public.pte_vocab_mastery FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pte mastery"
  ON public.pte_vocab_mastery FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own pte mastery"
  ON public.pte_vocab_mastery FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view all pte mastery"
  ON public.pte_vocab_mastery FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_pte_vocab_mastery_user ON public.pte_vocab_mastery(user_id);

CREATE TABLE public.chatbot_student_memory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, key)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.chatbot_student_memory TO authenticated;
GRANT ALL ON public.chatbot_student_memory TO service_role;

ALTER TABLE public.chatbot_student_memory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students manage their own chatbot memory"
ON public.chatbot_student_memory FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER chatbot_student_memory_set_updated_at
BEFORE UPDATE ON public.chatbot_student_memory
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_chatbot_student_memory_user ON public.chatbot_student_memory(user_id);
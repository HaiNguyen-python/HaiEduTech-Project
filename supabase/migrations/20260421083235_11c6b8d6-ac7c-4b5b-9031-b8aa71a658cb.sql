-- Create pte_attempts table to log per-skill PTE practice attempts
CREATE TABLE public.pte_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  skill TEXT NOT NULL CHECK (skill IN ('speaking', 'writing', 'reading', 'listening')),
  task_type TEXT,
  score NUMERIC NOT NULL DEFAULT 0,
  max_score NUMERIC NOT NULL DEFAULT 90,
  accuracy NUMERIC,
  time_spent_seconds INTEGER DEFAULT 0,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indexes for fast aggregation
CREATE INDEX idx_pte_attempts_user_skill ON public.pte_attempts(user_id, skill);
CREATE INDEX idx_pte_attempts_created_at ON public.pte_attempts(created_at DESC);

-- Enable RLS
ALTER TABLE public.pte_attempts ENABLE ROW LEVEL SECURITY;

-- Users manage their own attempts
CREATE POLICY "Users can view own pte attempts"
ON public.pte_attempts FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pte attempts"
ON public.pte_attempts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own pte attempts"
ON public.pte_attempts FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Teachers can view all
CREATE POLICY "Teachers can view all pte attempts"
ON public.pte_attempts FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));
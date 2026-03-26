
-- Moderation logs table for tracking profanity/abuse warnings
CREATE TABLE public.moderation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  blocked_content text NOT NULL,
  reason text NOT NULL DEFAULT 'profanity',
  warning_count integer NOT NULL DEFAULT 1
);

-- Enable RLS
ALTER TABLE public.moderation_logs ENABLE ROW LEVEL SECURITY;

-- Admins/teachers can view all logs
CREATE POLICY "Teachers can view moderation logs"
  ON public.moderation_logs FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

-- Authenticated users can insert their own logs (from client)
CREATE POLICY "Users can insert own moderation logs"
  ON public.moderation_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Students can view own logs (for lockout check)
CREATE POLICY "Users can view own moderation logs"
  ON public.moderation_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

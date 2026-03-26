
-- Add domain column to student_activity_log for cross-domain analytics
ALTER TABLE public.student_activity_log ADD COLUMN IF NOT EXISTS domain text DEFAULT 'english';

-- Create index for fast domain-based queries
CREATE INDEX IF NOT EXISTS idx_student_activity_domain ON public.student_activity_log (domain);

-- Create index for fast user+domain queries
CREATE INDEX IF NOT EXISTS idx_student_activity_user_domain ON public.student_activity_log (user_id, domain);

-- Create index for time-based queries
CREATE INDEX IF NOT EXISTS idx_student_activity_created ON public.student_activity_log (created_at DESC);

-- Enable realtime for student_activity_log
ALTER PUBLICATION supabase_realtime ADD TABLE public.student_activity_log;

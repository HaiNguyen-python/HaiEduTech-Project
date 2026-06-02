CREATE TABLE public.monthly_report_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period_start date NOT NULL,
  period_end date NOT NULL,
  user_id uuid NOT NULL,
  recipient_email text NOT NULL,
  student_name text,
  status text NOT NULL DEFAULT 'pending',
  error_message text,
  metrics jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_monthly_report_logs_period ON public.monthly_report_logs(period_start DESC);
CREATE INDEX idx_monthly_report_logs_user ON public.monthly_report_logs(user_id);

GRANT SELECT ON public.monthly_report_logs TO authenticated;
GRANT ALL ON public.monthly_report_logs TO service_role;

ALTER TABLE public.monthly_report_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins and teachers can view report logs"
ON public.monthly_report_logs FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));
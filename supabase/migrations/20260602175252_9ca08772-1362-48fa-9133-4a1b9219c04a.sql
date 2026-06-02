
-- 1. Extend role enum with 'assistant'
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'assistant';

-- 2. Helper: super admin = admin OR teacher
CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin'::app_role, 'teacher'::app_role)
  );
$$;

-- 3. time_logs table
CREATE TABLE public.time_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  clock_in timestamptz NOT NULL DEFAULT now(),
  clock_out timestamptz,
  duration_hours numeric(10,4),
  calculated_salary numeric(12,2),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','completed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.time_logs TO authenticated;
GRANT ALL ON public.time_logs TO service_role;

ALTER TABLE public.time_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own time logs"
  ON public.time_logs FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Super admins view all time logs"
  ON public.time_logs FOR SELECT TO authenticated
  USING (public.is_super_admin(auth.uid()));

CREATE POLICY "Users insert own time logs"
  ON public.time_logs FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own time logs"
  ON public.time_logs FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Trigger: auto-compute duration & salary when clock_out is set; force rate
CREATE OR REPLACE FUNCTION public.compute_time_log_salary()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.clock_out IS NOT NULL THEN
    NEW.duration_hours := ROUND(EXTRACT(EPOCH FROM (NEW.clock_out - NEW.clock_in))::numeric / 3600, 4);
    NEW.calculated_salary := ROUND(NEW.duration_hours * 50000, 2);
    NEW.status := 'completed';
  ELSE
    NEW.status := 'active';
    NEW.duration_hours := NULL;
    NEW.calculated_salary := NULL;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_time_logs_compute
BEFORE INSERT OR UPDATE ON public.time_logs
FOR EACH ROW EXECUTE FUNCTION public.compute_time_log_salary();

CREATE INDEX idx_time_logs_user_created ON public.time_logs(user_id, created_at DESC);
CREATE INDEX idx_time_logs_user_status ON public.time_logs(user_id, status);

-- 4. daily_reports table
CREATE TABLE public.daily_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  work_summary text NOT NULL,
  feedback text,
  screenshot_urls text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.daily_reports TO authenticated;
GRANT ALL ON public.daily_reports TO service_role;

ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own reports"
  ON public.daily_reports FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Super admins view all reports"
  ON public.daily_reports FOR SELECT TO authenticated
  USING (public.is_super_admin(auth.uid()));

CREATE POLICY "Users insert own reports"
  ON public.daily_reports FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_daily_reports_user_created ON public.daily_reports(user_id, created_at DESC);
CREATE INDEX idx_daily_reports_created ON public.daily_reports(created_at DESC);

-- 5. Storage policies for report-attachments bucket (bucket created via tool)
CREATE POLICY "Users upload own report attachments"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'report-attachments'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users read own report attachments"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'report-attachments'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Super admins read all report attachments"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'report-attachments'
    AND public.is_super_admin(auth.uid())
  );

CREATE POLICY "Users delete own report attachments"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'report-attachments'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

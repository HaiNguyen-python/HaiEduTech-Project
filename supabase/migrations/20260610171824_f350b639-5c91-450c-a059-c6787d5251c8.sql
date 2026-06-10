
CREATE TABLE public.health_check_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  triggered_by TEXT NOT NULL DEFAULT 'cron',
  total INT NOT NULL DEFAULT 0,
  passed INT NOT NULL DEFAULT 0,
  failed INT NOT NULL DEFAULT 0,
  warned INT NOT NULL DEFAULT 0,
  duration_ms INT NOT NULL DEFAULT 0,
  results JSONB NOT NULL DEFAULT '[]'::jsonb
);

GRANT SELECT, INSERT ON public.health_check_runs TO authenticated;
GRANT ALL ON public.health_check_runs TO service_role;

ALTER TABLE public.health_check_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view health checks"
ON public.health_check_runs FOR SELECT
TO authenticated
USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can insert health checks"
ON public.health_check_runs FOR INSERT
TO authenticated
WITH CHECK (public.is_staff(auth.uid()));

CREATE INDEX idx_health_check_runs_created_at ON public.health_check_runs (created_at DESC);


CREATE TABLE public.page_view_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NULL,
  session_id text NULL,
  path text NOT NULL,
  title text NULL,
  referrer text NULL,
  time_on_page_seconds integer NULL,
  metadata jsonb NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_page_view_log_path ON public.page_view_log(path);
CREATE INDEX idx_page_view_log_user_id ON public.page_view_log(user_id);
CREATE INDEX idx_page_view_log_created_at ON public.page_view_log(created_at DESC);

ALTER TABLE public.page_view_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page views"
  ON public.page_view_log
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own page views"
  ON public.page_view_log
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view all page views"
  ON public.page_view_log
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

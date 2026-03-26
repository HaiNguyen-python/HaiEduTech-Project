
-- Table to log every Perplexity API call
CREATE TABLE public.api_usage_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  function_name text NOT NULL,
  model text NOT NULL DEFAULT 'sonar',
  domain text DEFAULT 'english',
  tokens_used integer DEFAULT 0,
  estimated_cost numeric(10,6) DEFAULT 0,
  status text DEFAULT 'success',
  error_message text,
  user_id uuid
);

-- Table for manual balance tracking
CREATE TABLE public.api_balance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  balance numeric(10,2) NOT NULL DEFAULT 0,
  updated_by uuid,
  note text
);

-- Enable RLS
ALTER TABLE public.api_usage_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_balance ENABLE ROW LEVEL SECURITY;

-- Only admins/teachers can view usage logs
CREATE POLICY "Teachers can view usage logs" ON public.api_usage_log
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

-- Edge functions (service_role) can insert usage logs
CREATE POLICY "Service role can insert usage logs" ON public.api_usage_log
  FOR INSERT TO service_role
  WITH CHECK (true);

-- Allow authenticated users to insert (edge functions use anon key sometimes)
CREATE POLICY "Authenticated can insert usage logs" ON public.api_usage_log
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Balance: only teachers/admins can view and manage
CREATE POLICY "Teachers can view balance" ON public.api_balance
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Teachers can insert balance" ON public.api_balance
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Teachers can update balance" ON public.api_balance
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.learning_paths (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  subject text NOT NULL,
  goal_label text,
  target_level text,
  target_date date,
  hours_per_week integer NOT NULL DEFAULT 5,
  available_days text[] NOT NULL DEFAULT '{}',
  start_level text,
  current_level text,
  status text NOT NULL DEFAULT 'active',
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, subject)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.learning_paths TO authenticated;
GRANT ALL ON public.learning_paths TO service_role;

ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own learning paths"
ON public.learning_paths FOR ALL TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Staff can view learning paths"
ON public.learning_paths FOR SELECT TO authenticated
USING (public.is_staff(auth.uid()));

CREATE TRIGGER trg_learning_paths_updated_at
BEFORE UPDATE ON public.learning_paths
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.learning_path_steps (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path_id uuid NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  week_start date NOT NULL,
  title_vi text NOT NULL,
  title_en text NOT NULL,
  route text,
  est_minutes integer NOT NULL DEFAULT 20,
  kind text NOT NULL DEFAULT 'lesson',
  priority integer NOT NULL DEFAULT 1,
  done_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_learning_path_steps_path_week ON public.learning_path_steps (path_id, week_start);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.learning_path_steps TO authenticated;
GRANT ALL ON public.learning_path_steps TO service_role;

ALTER TABLE public.learning_path_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own path steps"
ON public.learning_path_steps FOR ALL TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Staff can view path steps"
ON public.learning_path_steps FOR SELECT TO authenticated
USING (public.is_staff(auth.uid()));

CREATE TRIGGER trg_learning_path_steps_updated_at
BEFORE UPDATE ON public.learning_path_steps
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
-- 1) Student academic profile (one row per user)
CREATE TABLE public.student_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  gpa NUMERIC(3,2),
  ielts_score NUMERIC(3,1),
  toefl_score INTEGER,
  sat_score INTEGER,
  current_level TEXT,
  field_of_study TEXT,
  activities TEXT,
  work_experience_years INTEGER DEFAULT 0,
  target_country TEXT,
  target_level TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.student_profiles FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile"
  ON public.student_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile"
  ON public.student_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own profile"
  ON public.student_profiles FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Teachers can view all profiles"
  ON public.student_profiles FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_student_profiles_updated_at
  BEFORE UPDATE ON public.student_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2) Pre-departure checklist progress (one row per user+country+task)
CREATE TABLE public.pre_departure_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  country TEXT NOT NULL,
  task_key TEXT NOT NULL,
  is_done BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, country, task_key)
);

ALTER TABLE public.pre_departure_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own checklist"
  ON public.pre_departure_progress FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own checklist"
  ON public.pre_departure_progress FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own checklist"
  ON public.pre_departure_progress FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own checklist"
  ON public.pre_departure_progress FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Teachers can view all checklists"
  ON public.pre_departure_progress FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_pre_departure_progress_updated_at
  BEFORE UPDATE ON public.pre_departure_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3) Add expiry_date to existing student_documents for alerts
ALTER TABLE public.student_documents
  ADD COLUMN IF NOT EXISTS expiry_date DATE;
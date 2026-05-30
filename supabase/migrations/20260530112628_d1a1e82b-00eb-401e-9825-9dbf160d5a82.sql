
-- University shortlist
CREATE TABLE public.university_shortlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  university_name text NOT NULL,
  country text,
  program text,
  category text NOT NULL DEFAULT 'target', -- 'reach' | 'target' | 'safety'
  fit_score integer,
  tuition_usd numeric,
  scholarship_available boolean DEFAULT false,
  deadline_date date,
  notes text,
  ai_rationale text,
  url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_shortlist_user ON public.university_shortlist(user_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.university_shortlist TO authenticated;
GRANT ALL ON public.university_shortlist TO service_role;
ALTER TABLE public.university_shortlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "shortlist_select_own" ON public.university_shortlist FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "shortlist_insert_own" ON public.university_shortlist FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "shortlist_update_own" ON public.university_shortlist FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "shortlist_delete_own" ON public.university_shortlist FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER trg_shortlist_updated BEFORE UPDATE ON public.university_shortlist FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Study Journey milestones (high-level stages: profile, language, exam, docs, app, visa, departure)
CREATE TABLE public.study_journey_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  milestone_key text NOT NULL, -- e.g. 'profile_built','language_certified','sat_done','docs_ready','app_submitted','visa_approved','departed'
  status text NOT NULL DEFAULT 'pending', -- 'pending'|'in_progress'|'done'
  completed_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, milestone_key)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_journey_milestones TO authenticated;
GRANT ALL ON public.study_journey_milestones TO service_role;
ALTER TABLE public.study_journey_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "milestones_select_own" ON public.study_journey_milestones FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "milestones_insert_own" ON public.study_journey_milestones FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "milestones_update_own" ON public.study_journey_milestones FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "milestones_delete_own" ON public.study_journey_milestones FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER trg_milestones_updated BEFORE UPDATE ON public.study_journey_milestones FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Track sent deadline reminders to avoid duplicates
CREATE TABLE public.deadline_reminders_sent (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  deadline_id uuid NOT NULL,
  days_before integer NOT NULL,
  sent_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(deadline_id, days_before)
);
GRANT SELECT ON public.deadline_reminders_sent TO authenticated;
GRANT ALL ON public.deadline_reminders_sent TO service_role;
ALTER TABLE public.deadline_reminders_sent ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reminders_select_own" ON public.deadline_reminders_sent FOR SELECT TO authenticated USING (auth.uid() = user_id);

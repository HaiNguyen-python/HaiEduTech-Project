-- Counseling conversations: lưu lịch sử chat AI Counselor
CREATE TABLE public.counseling_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  mode text NOT NULL DEFAULT 'psychological', -- 'psychological' | 'career'
  title text NOT NULL DEFAULT 'New conversation',
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  distress_flagged boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.counseling_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own conversations" ON public.counseling_conversations
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own conversations" ON public.counseling_conversations
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own conversations" ON public.counseling_conversations
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own conversations" ON public.counseling_conversations
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER trg_counseling_conversations_updated_at
  BEFORE UPDATE ON public.counseling_conversations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Mood check-ins: theo dõi cảm xúc hằng ngày
CREATE TABLE public.mood_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  mood text NOT NULL, -- 'great' | 'good' | 'okay' | 'stressed' | 'sad'
  mood_score integer NOT NULL CHECK (mood_score BETWEEN 1 AND 5),
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.mood_checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own moods" ON public.mood_checkins
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own moods" ON public.mood_checkins
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own moods" ON public.mood_checkins
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Teachers view all moods" ON public.mood_checkins
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

CREATE INDEX idx_mood_checkins_user_date ON public.mood_checkins(user_id, created_at DESC);

-- Personal journal entries
CREATE TABLE public.counseling_journal (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  content text NOT NULL,
  tags text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.counseling_journal ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users full control journal" ON public.counseling_journal
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER trg_counseling_journal_updated_at
  BEFORE UPDATE ON public.counseling_journal
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- IKIGAI / Personality assessment results
CREATE TABLE public.career_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  assessment_type text NOT NULL, -- 'ikigai' | 'mbti' | 'holland'
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  result jsonb NOT NULL DEFAULT '{}'::jsonb,
  ai_insights text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.career_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users full control assessments" ON public.career_assessments
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER trg_career_assessments_updated_at
  BEFORE UPDATE ON public.career_assessments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Teacher contact requests (Talk to Teacher Hai)
CREATE TABLE public.teacher_contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  topic text NOT NULL,
  message text NOT NULL,
  urgency text NOT NULL DEFAULT 'normal', -- 'low' | 'normal' | 'high'
  conversation_excerpt text,
  status text NOT NULL DEFAULT 'pending', -- 'pending' | 'in_progress' | 'resolved'
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.teacher_contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert own requests" ON public.teacher_contact_requests
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users view own requests" ON public.teacher_contact_requests
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Teachers view all requests" ON public.teacher_contact_requests
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));
CREATE POLICY "Teachers update requests" ON public.teacher_contact_requests
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_teacher_contact_requests_updated_at
  BEFORE UPDATE ON public.teacher_contact_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_teacher_contact_requests_status ON public.teacher_contact_requests(status, created_at DESC);
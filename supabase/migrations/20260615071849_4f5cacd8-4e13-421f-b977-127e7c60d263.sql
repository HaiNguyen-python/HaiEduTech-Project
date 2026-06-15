
-- Research projects table: container for each EdTech research topic
CREATE TABLE public.research_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'General',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.research_projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.research_projects TO authenticated;
GRANT ALL ON public.research_projects TO service_role;

ALTER TABLE public.research_projects ENABLE ROW LEVEL SECURITY;

-- Anyone can read active projects
CREATE POLICY "Public read research_projects"
  ON public.research_projects FOR SELECT
  USING (true);

-- Only staff (teacher/admin) can create / update / delete
CREATE POLICY "Staff manage research_projects"
  ON public.research_projects FOR ALL
  TO authenticated
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE TRIGGER trg_research_projects_updated_at
  BEFORE UPDATE ON public.research_projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_now();

-- Project-specific survey responses
CREATE TABLE public.research_survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.research_projects(id) ON DELETE CASCADE,
  user_role text NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.research_survey_responses TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.research_survey_responses TO authenticated;
GRANT ALL ON public.research_survey_responses TO service_role;

ALTER TABLE public.research_survey_responses ENABLE ROW LEVEL SECURITY;

-- Public can submit (anonymous survey)
CREATE POLICY "Public submit research responses"
  ON public.research_survey_responses FOR INSERT
  WITH CHECK (true);

-- Staff can read all responses
CREATE POLICY "Staff read research responses"
  ON public.research_survey_responses FOR SELECT
  TO authenticated
  USING (public.is_staff(auth.uid()));

-- Staff can delete responses
CREATE POLICY "Staff delete research responses"
  ON public.research_survey_responses FOR DELETE
  TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE INDEX idx_research_survey_responses_project_id
  ON public.research_survey_responses(project_id, created_at DESC);

-- Seed two initial projects (only if table is empty)
INSERT INTO public.research_projects (title, description, category)
SELECT * FROM (VALUES
  (
    'Ứng dụng AI Chatbot trong việc tối ưu hóa phản hồi sư phạm khi học ngoại ngữ (English, Swedish, Chinese)',
    'Đề tài khảo sát mức độ tin cậy, chấp nhận và ưa thích ngôn ngữ giải thích của người học khi nhận phản hồi sửa lỗi ngữ pháp/phát âm từ AI Chatbot trong các khoá tiếng Anh, tiếng Thuỵ Điển và tiếng Trung.',
    'Language Learning'
  ),
  (
    'Phân tích hành vi và rào cản tâm lý của người học trực tuyến khi tương tác với các công cụ Data/AI hiện đại',
    'Nghiên cứu định tính & định lượng về rào cản tâm lý, niềm tin và hành vi sử dụng các công cụ dữ liệu/AI (dashboard, gợi ý cá nhân hoá, gamification) trên nền tảng học trực tuyến.',
    'AI Assistant'
  )
) AS v(title, description, category)
WHERE NOT EXISTS (SELECT 1 FROM public.research_projects);

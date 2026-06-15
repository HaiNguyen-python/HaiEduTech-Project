
-- Update existing projects to English, industry-wide phrasing
UPDATE public.research_projects SET
  title = 'Learning Analytics Dashboards: Behavioural Drivers & Psychological Barriers',
  description = 'How dashboard elements (leaderboards, progress, warnings) shape learner motivation and stress across K-12 and adult EdTech platforms worldwide.',
  category = 'Learning Analytics'
WHERE id = 'e1406fa5-aa00-4f5e-9ef5-244950a16920';

UPDATE public.research_projects SET
  title = 'Optimising LLM Feedback Loops in Language Pedagogy',
  description = 'A cross-platform study on how LLM tutors should deliver correction, scaffolding and explanation — informing a lightweight RLHF framework for language classrooms.',
  category = 'LLM Pedagogy'
WHERE id = '948481f1-c9ac-418b-825b-027fc287f2c3';

UPDATE public.research_projects SET
  title = 'Gamification & Retention in Programming / AI Cohorts',
  description = 'Industry-wide analysis of streaks, badges and code challenges as retention mechanics in coding bootcamps and online CS education.',
  category = 'Gamification'
WHERE id = '30255d52-1935-475b-91ea-72cc8b1c3932';

UPDATE public.research_projects SET
  title = 'Classroom Digitalisation & Teaching-Assistant Productivity',
  description = 'How automation of attendance, payroll and reporting affects teaching-assistant productivity and operational transparency across EdTech operators.',
  category = 'Operations'
WHERE id = '8490b4aa-9e3a-4666-b67a-be348a1d7726';

UPDATE public.research_projects SET
  title = 'Technology Acceptance (TAM) — Tailor-made EdTech vs Traditional LMS',
  description = 'TAM-based comparison of bespoke AI-native EdTech platforms vs generic LMS (Moodle, Teams, Google Classroom) across global education markets.',
  category = 'Technology Adoption'
WHERE id = 'd31a2abc-8a11-4032-ad7a-967935f885ea';

-- New ML/RL/AI projects (industry-wide, not HaiEduTech-specific)
INSERT INTO public.research_projects (title, description, category, is_active) VALUES
('Reinforcement Learning Tutors for Adaptive Learning Paths',
 'How RL agents (bandits, deep RL, offline RL) personalise next-lesson selection vs rule-based or BKT baselines across language, math and coding curricula.',
 'Reinforcement Learning', true),
('Early-Warning ML for At-Risk Learner Detection',
 'Benchmarking gradient-boosting and deep sequence models for predicting dropout and disengagement from click-stream and assessment data in MOOCs and K-12.',
 'Machine Learning', true),
('Generative AI & Academic Integrity in Higher Education',
 'How widespread access to LLMs reshapes assessment design, plagiarism detection, and learner self-regulation across universities globally.',
 'Generative AI', true),
('Multimodal AI Tutors (Vision + Speech + Text) for Language Acquisition',
 'Effectiveness of multimodal foundation models that combine OCR, ASR and TTS for pronunciation, handwriting and reading comprehension training.',
 'Multimodal AI', true),
('Federated & Privacy-Preserving ML for K-12 EdTech',
 'Feasibility of federated learning, differential privacy and on-device inference to enable personalisation without centralising minor-student data.',
 'AI Ethics & Privacy', true),
('Affective Computing & Emotion-Aware Tutoring Systems',
 'Using webcam, voice and interaction signals to detect frustration/boredom and trigger pedagogical interventions in intelligent tutoring systems.',
 'Affective Computing', true);

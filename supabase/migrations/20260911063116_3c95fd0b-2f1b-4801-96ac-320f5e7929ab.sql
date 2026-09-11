CREATE TABLE public.specialized_learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  language text NOT NULL CHECK (language IN ('english', 'chinese', 'vietnamese', 'finnish', 'swedish', 'japanese')),
  field text NOT NULL,
  job_role text NOT NULL,
  goal text NOT NULL,
  learner_level text NOT NULL DEFAULT 'elementary' CHECK (learner_level IN ('beginner', 'elementary', 'intermediate', 'advanced')),
  daily_minutes integer NOT NULL DEFAULT 20 CHECK (daily_minutes BETWEEN 5 AND 120),
  notes text NOT NULL DEFAULT '',
  curriculum jsonb NOT NULL DEFAULT '{}'::jsonb,
  progress jsonb NOT NULL DEFAULT '{"currentLesson":0,"bestScores":{},"completedLessons":[]}'::jsonb,
  citations text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.specialized_learning_paths TO authenticated;
GRANT ALL ON public.specialized_learning_paths TO service_role;

ALTER TABLE public.specialized_learning_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learners can view own specialized paths"
ON public.specialized_learning_paths FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Learners can create own specialized paths"
ON public.specialized_learning_paths FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Learners can update own specialized paths"
ON public.specialized_learning_paths FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Learners can delete own specialized paths"
ON public.specialized_learning_paths FOR DELETE TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX specialized_learning_paths_user_updated_idx
ON public.specialized_learning_paths (user_id, updated_at DESC);

CREATE TRIGGER specialized_learning_paths_set_updated_at
BEFORE UPDATE ON public.specialized_learning_paths
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.delete_user_data(_uid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NOT NULL AND auth.uid() <> _uid THEN
    RAISE EXCEPTION 'not_authorized';
  END IF;

  DELETE FROM public.specialized_learning_paths WHERE user_id = _uid;
  DELETE FROM public.your_corner_reactions WHERE user_id = _uid;
  DELETE FROM public.your_corner_poll_votes WHERE user_id = _uid;
  DELETE FROM public.your_corner_bookmarks WHERE user_id = _uid;
  DELETE FROM public.your_corner_comments WHERE user_id = _uid;
  DELETE FROM public.your_corner_messages WHERE sender_id = _uid OR recipient_id = _uid;
  DELETE FROM public.your_corner_posts WHERE user_id = _uid;
  DELETE FROM public.student_activity_log WHERE user_id = _uid;
  DELETE FROM public.student_submissions WHERE user_id = _uid;
  DELETE FROM public.student_notebooks WHERE user_id = _uid;
  DELETE FROM public.student_documents WHERE user_id = _uid;
  DELETE FROM public.writing_drafts WHERE user_id = _uid;
  DELETE FROM public.writing_attempts WHERE user_id = _uid;
  DELETE FROM public.user_vocab_mastered WHERE user_id = _uid;
  DELETE FROM public.hsk_srs_progress WHERE user_id = _uid;
  DELETE FROM public.hsk_writing_attempts WHERE user_id = _uid;
  DELETE FROM public.hskk_attempts WHERE user_id = _uid;
  DELETE FROM public.ielts_lecture_progress WHERE user_id = _uid;
  DELETE FROM public.toeic_lecture_progress WHERE user_id = _uid;
  DELETE FROM public.pte_attempts WHERE user_id = _uid;
  DELETE FROM public.pte_vocab_mastery WHERE user_id = _uid;
  DELETE FROM public.sat_daily_log WHERE user_id = _uid;
  DELETE FROM public.sat_mistakes WHERE user_id = _uid;
  DELETE FROM public.vff_progress WHERE user_id = _uid;
  DELETE FROM public.vff_writing_submissions WHERE user_id = _uid;
  DELETE FROM public.vff_audio_clips WHERE user_id = _uid;
  DELETE FROM public.vocab_srs_state WHERE user_id = _uid;
  DELETE FROM public.placement_test_results WHERE user_id = _uid;
  DELETE FROM public.study_journey_milestones WHERE user_id = _uid;
  DELETE FROM public.mood_checkins WHERE user_id = _uid;
  DELETE FROM public.player_badges WHERE user_id = _uid;
  DELETE FROM public.user_pet_xp WHERE user_id = _uid;
  DELETE FROM public.dictionary_lookups WHERE user_id = _uid;
  DELETE FROM public.chatbot_conversations WHERE user_id = _uid;
  DELETE FROM public.counseling_conversations WHERE user_id = _uid;
  DELETE FROM public.counseling_journal WHERE user_id = _uid;
  DELETE FROM public.career_assessments WHERE user_id = _uid;
  DELETE FROM public.profile_strength_assessments WHERE user_id = _uid;
  DELETE FROM public.motivation_letter_drafts WHERE user_id = _uid;
  DELETE FROM public.university_shortlist WHERE user_id = _uid;
  DELETE FROM public.application_deadlines WHERE user_id = _uid;
  DELETE FROM public.pre_departure_progress WHERE user_id = _uid;
  DELETE FROM public.article_interests WHERE user_id = _uid;
  DELETE FROM public.research_survey_responses WHERE user_id = _uid;
  DELETE FROM public.daily_reports WHERE user_id = _uid;
  DELETE FROM public.assignment_notifications WHERE user_id = _uid;
  DELETE FROM public.class_members WHERE user_id = _uid;
  DELETE FROM public.course_registrations WHERE user_id = _uid;
  DELETE FROM public.course_access WHERE user_id = _uid;
  DELETE FROM public.student_profiles WHERE user_id = _uid;
  DELETE FROM public.user_subscriptions WHERE user_id = _uid;
  DELETE FROM public.page_view_log WHERE user_id = _uid;
  DELETE FROM public.user_roles WHERE user_id = _uid;
  DELETE FROM public.profiles WHERE id = _uid;
END;
$function$;
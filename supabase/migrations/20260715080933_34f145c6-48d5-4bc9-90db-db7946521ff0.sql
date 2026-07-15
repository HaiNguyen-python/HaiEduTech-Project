
-- GDPR right-to-be-forgotten helper.
-- Deletes rows the caller owns across all user-scoped tables.
-- Called from the delete-my-account edge function after JWT validation.
CREATE OR REPLACE FUNCTION public.delete_user_data(_uid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Guard: must match auth.uid() or be invoked with service role.
  IF auth.uid() IS NOT NULL AND auth.uid() <> _uid THEN
    RAISE EXCEPTION 'not_authorized';
  END IF;

  -- Your Corner social data
  DELETE FROM public.your_corner_reactions WHERE user_id = _uid;
  DELETE FROM public.your_corner_poll_votes WHERE user_id = _uid;
  DELETE FROM public.your_corner_bookmarks WHERE user_id = _uid;
  DELETE FROM public.your_corner_comments WHERE user_id = _uid;
  DELETE FROM public.your_corner_messages WHERE sender_id = _uid OR recipient_id = _uid;
  DELETE FROM public.your_corner_posts WHERE user_id = _uid;

  -- Learning progress and submissions
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

  -- Roles + profile last so RLS lookups keep working above
  DELETE FROM public.user_roles WHERE user_id = _uid;
  DELETE FROM public.profiles WHERE id = _uid;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_user_data(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_user_data(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_user_data(uuid) TO service_role;

-- Function to award the Global Scholar badge to authenticated users
-- who have uploaded at least one document. Idempotent: skips if already earned.
CREATE OR REPLACE FUNCTION public.award_global_scholar_badge()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_doc_count integer;
  v_already_has boolean;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'reason', 'not_authenticated');
  END IF;

  -- Check if already earned
  SELECT EXISTS (
    SELECT 1 FROM public.player_badges
    WHERE user_id = v_user_id AND badge_id = 'global-scholar'
  ) INTO v_already_has;

  IF v_already_has THEN
    RETURN jsonb_build_object('success', true, 'already_earned', true);
  END IF;

  -- Criterion: at least 1 document uploaded
  SELECT COUNT(*) INTO v_doc_count
  FROM public.student_documents
  WHERE user_id = v_user_id;

  IF v_doc_count < 1 THEN
    RETURN jsonb_build_object('success', false, 'reason', 'criteria_not_met', 'doc_count', v_doc_count);
  END IF;

  -- Award the badge (bypasses RLS via SECURITY DEFINER)
  INSERT INTO public.player_badges (user_id, badge_id, badge_name, badge_icon)
  VALUES (v_user_id, 'global-scholar', 'Global Scholar', '🌍');

  RETURN jsonb_build_object('success', true, 'newly_earned', true);
END;
$$;
-- Allow assistants to notify super admins via a SECURITY DEFINER RPC
-- (RLS on user_roles prevents non-admins from listing admin ids directly).
CREATE OR REPLACE FUNCTION public.notify_super_admins(
  p_title text,
  p_body text,
  p_route text DEFAULT NULL
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer := 0;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN 0;
  END IF;

  INSERT INTO public.assignment_notifications (user_id, title, body, route)
  SELECT DISTINCT ur.user_id, p_title, p_body, p_route
  FROM public.user_roles ur
  WHERE ur.role IN ('teacher'::app_role, 'admin'::app_role);

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.notify_super_admins(text, text, text) TO authenticated;
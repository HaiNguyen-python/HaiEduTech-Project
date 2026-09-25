ALTER TABLE public.user_subscriptions ADD COLUMN IF NOT EXISTS bank_request_pending boolean NOT NULL DEFAULT false;

DROP TRIGGER IF EXISTS trg_notify_bank_transfer_pending ON public.user_subscriptions;

CREATE OR REPLACE FUNCTION public.request_bank_transfer(_ref text)
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _uid uuid := auth.uid();
  _email text;
  _row public.user_subscriptions%ROWTYPE;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not_authenticated'; END IF;
  IF _ref IS NULL OR length(_ref) > 120 THEN RAISE EXCEPTION 'invalid_ref'; END IF;
  SELECT email INTO _email FROM auth.users WHERE id = _uid;
  SELECT * INTO _row FROM public.user_subscriptions WHERE user_id = _uid;
  IF FOUND AND _row.bank_request_pending THEN RETURN 'already_pending'; END IF;
  IF NOT FOUND THEN
    INSERT INTO public.user_subscriptions (user_id, status, plan, source, transfer_reference, user_email, requested_at, bank_request_pending)
    VALUES (_uid, 'pending_verification', 'premium', 'bank', _ref, _email, now(), true);
  ELSE
    UPDATE public.user_subscriptions SET
      bank_request_pending = true,
      transfer_reference = _ref,
      requested_at = now(),
      user_email = coalesce(user_email, _email),
      status = CASE WHEN status = 'active' AND expires_at > now() THEN status ELSE 'pending_verification' END,
      updated_at = now()
    WHERE user_id = _uid;
  END IF;
  INSERT INTO public.assignment_notifications (user_id, title, body, route)
  SELECT DISTINCT ur.user_id,
    'Chuyển khoản Premium mới / New bank transfer',
    coalesce(_email, _uid::text) || ' - ' || _ref || '. Kiểm tra tài khoản ngân hàng và kích hoạt trong Admin.',
    '/admin#premium-members'
  FROM public.user_roles ur WHERE ur.role IN ('teacher'::app_role, 'admin'::app_role);
  RETURN 'ok';
END; $$;

REVOKE ALL ON FUNCTION public.request_bank_transfer(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.request_bank_transfer(text) TO authenticated;
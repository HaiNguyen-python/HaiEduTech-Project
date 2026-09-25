CREATE OR REPLACE FUNCTION public.notify_bank_transfer_pending()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status = 'pending_verification' THEN
    INSERT INTO public.assignment_notifications (user_id, title, body, route)
    SELECT DISTINCT ur.user_id,
      'Chuyển khoản Premium mới / New bank transfer',
      coalesce(NEW.user_email, NEW.user_id::text) || ' - ' || coalesce(NEW.transfer_reference, '') || '. Kiểm tra tài khoản và kích hoạt trong Admin.',
      '/admin?tab=overview#premium-members'
    FROM public.user_roles ur
    WHERE ur.role IN ('teacher'::app_role, 'admin'::app_role);
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_notify_bank_transfer_pending ON public.user_subscriptions;
CREATE TRIGGER trg_notify_bank_transfer_pending
AFTER INSERT ON public.user_subscriptions
FOR EACH ROW EXECUTE FUNCTION public.notify_bank_transfer_pending();
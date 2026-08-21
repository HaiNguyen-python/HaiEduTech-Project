ALTER TABLE public.notebook_shares ADD COLUMN IF NOT EXISTS can_edit boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.can_edit_shared_notebook(_notebook_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.notebook_shares ns
    WHERE ns.notebook_id = _notebook_id
      AND ns.recipient_id = auth.uid()
      AND ns.can_edit = true
  );
$$;

DROP POLICY IF EXISTS "Recipients can edit shared notebooks" ON public.student_notebooks;
CREATE POLICY "Recipients can edit shared notebooks"
ON public.student_notebooks
FOR UPDATE
TO authenticated
USING (public.can_edit_shared_notebook(id))
WITH CHECK (public.can_edit_shared_notebook(id));

CREATE OR REPLACE FUNCTION public.guard_shared_notebook_update()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NOT NULL AND auth.uid() <> OLD.user_id THEN
    NEW.user_id := OLD.user_id;
    NEW.is_public := OLD.is_public;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_shared_notebook_update ON public.student_notebooks;
CREATE TRIGGER trg_guard_shared_notebook_update
BEFORE UPDATE ON public.student_notebooks
FOR EACH ROW EXECUTE FUNCTION public.guard_shared_notebook_update();

CREATE OR REPLACE FUNCTION public.share_notebook(_notebook_id uuid, _recipient_ids uuid[], _can_edit boolean DEFAULT false)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_title text;
  v_count integer := 0;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not_authenticated';
  END IF;

  SELECT title INTO v_title
  FROM public.student_notebooks
  WHERE id = _notebook_id AND user_id = v_uid;

  IF v_title IS NULL THEN
    RAISE EXCEPTION 'notebook_not_found_or_not_owner';
  END IF;

  INSERT INTO public.notebook_shares (notebook_id, owner_id, recipient_id, can_edit)
  SELECT _notebook_id, v_uid, r, COALESCE(_can_edit, false)
  FROM unnest(_recipient_ids) AS r
  WHERE r <> v_uid
  ON CONFLICT (notebook_id, recipient_id)
  DO UPDATE SET hidden_by_recipient = false, can_edit = COALESCE(_can_edit, false), updated_at = now();

  GET DIAGNOSTICS v_count = ROW_COUNT;

  INSERT INTO public.assignment_notifications (user_id, title, body, route)
  SELECT r, 'Ghi chú mới được chia sẻ', COALESCE(NULLIF(TRIM(v_title), ''), 'Ghi chú'), '/notebook'
  FROM unnest(_recipient_ids) AS r
  WHERE r <> v_uid;

  RETURN v_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_notebook_share_permission(_share_id uuid, _can_edit boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not_authenticated';
  END IF;

  UPDATE public.notebook_shares
  SET can_edit = COALESCE(_can_edit, false), updated_at = now()
  WHERE id = _share_id AND owner_id = auth.uid();

  IF NOT FOUND THEN
    RAISE EXCEPTION 'share_not_found_or_not_owner';
  END IF;
END;
$$;

DROP FUNCTION IF EXISTS public.list_notebook_share_recipients(uuid);
CREATE FUNCTION public.list_notebook_share_recipients(_notebook_id uuid)
RETURNS TABLE(share_id uuid, recipient_id uuid, recipient_name text, recipient_avatar text, can_edit boolean)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    ns.id,
    ns.recipient_id,
    COALESCE(NULLIF(TRIM(p.full_name), ''), 'Học viên')::text,
    p.avatar_url,
    ns.can_edit
  FROM public.notebook_shares ns
  LEFT JOIN public.profiles p ON p.id = ns.recipient_id
  WHERE ns.notebook_id = _notebook_id
    AND ns.owner_id = auth.uid()
  ORDER BY p.full_name;
$$;

DROP FUNCTION IF EXISTS public.list_notebooks_shared_with_me();
CREATE FUNCTION public.list_notebooks_shared_with_me()
RETURNS TABLE(share_id uuid, notebook_id uuid, title text, content text, subject text, updated_at timestamptz, owner_id uuid, owner_name text, owner_avatar text, shared_at timestamptz, can_edit boolean)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    ns.id,
    sn.id,
    sn.title,
    sn.content,
    sn.subject,
    sn.updated_at,
    ns.owner_id,
    COALESCE(NULLIF(TRIM(p.full_name), ''), 'Giáo viên')::text,
    p.avatar_url,
    ns.created_at,
    ns.can_edit
  FROM public.notebook_shares ns
  JOIN public.student_notebooks sn ON sn.id = ns.notebook_id
  LEFT JOIN public.profiles p ON p.id = ns.owner_id
  WHERE ns.recipient_id = auth.uid()
    AND ns.hidden_by_recipient = false
  ORDER BY sn.updated_at DESC;
$$;

REVOKE ALL ON FUNCTION public.share_notebook(uuid, uuid[], boolean) FROM anon;
REVOKE ALL ON FUNCTION public.set_notebook_share_permission(uuid, boolean) FROM anon;
REVOKE ALL ON FUNCTION public.list_notebook_share_recipients(uuid) FROM anon;
REVOKE ALL ON FUNCTION public.list_notebooks_shared_with_me() FROM anon;
REVOKE ALL ON FUNCTION public.can_edit_shared_notebook(uuid) FROM anon;
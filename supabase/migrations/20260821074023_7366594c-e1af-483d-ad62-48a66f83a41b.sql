CREATE TABLE public.notebook_shares (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  notebook_id uuid NOT NULL REFERENCES public.student_notebooks(id) ON DELETE CASCADE,
  owner_id uuid NOT NULL,
  recipient_id uuid NOT NULL,
  hidden_by_recipient boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (notebook_id, recipient_id)
);

CREATE INDEX idx_notebook_shares_recipient ON public.notebook_shares(recipient_id);
CREATE INDEX idx_notebook_shares_notebook ON public.notebook_shares(notebook_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.notebook_shares TO authenticated;
GRANT ALL ON public.notebook_shares TO service_role;

ALTER TABLE public.notebook_shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners manage their notebook shares"
ON public.notebook_shares FOR ALL TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (
  owner_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.student_notebooks sn
    WHERE sn.id = notebook_shares.notebook_id AND sn.user_id = auth.uid()
  )
);

CREATE POLICY "Recipients can view shares for them"
ON public.notebook_shares FOR SELECT TO authenticated
USING (recipient_id = auth.uid());

CREATE POLICY "Recipients can hide shares for them"
ON public.notebook_shares FOR UPDATE TO authenticated
USING (recipient_id = auth.uid())
WITH CHECK (recipient_id = auth.uid());

CREATE TRIGGER trg_notebook_shares_updated_at
BEFORE UPDATE ON public.notebook_shares
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.can_read_shared_notebook(_notebook_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.notebook_shares ns
    WHERE ns.notebook_id = _notebook_id
      AND ns.recipient_id = auth.uid()
  );
$$;

CREATE POLICY "Recipients can view shared notebooks"
ON public.student_notebooks FOR SELECT TO authenticated
USING (public.can_read_shared_notebook(id));

CREATE OR REPLACE FUNCTION public.share_notebook(_notebook_id uuid, _recipient_ids uuid[])
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

  INSERT INTO public.notebook_shares (notebook_id, owner_id, recipient_id)
  SELECT _notebook_id, v_uid, r
  FROM unnest(_recipient_ids) AS r
  WHERE r <> v_uid
  ON CONFLICT (notebook_id, recipient_id)
  DO UPDATE SET hidden_by_recipient = false, updated_at = now();

  GET DIAGNOSTICS v_count = ROW_COUNT;

  INSERT INTO public.assignment_notifications (user_id, title, body, route)
  SELECT r, 'Ghi chú mới được chia sẻ', COALESCE(NULLIF(TRIM(v_title), ''), 'Ghi chú') , '/notebook'
  FROM unnest(_recipient_ids) AS r
  WHERE r <> v_uid;

  RETURN v_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.list_notebooks_shared_with_me()
RETURNS TABLE(
  share_id uuid,
  notebook_id uuid,
  title text,
  content text,
  subject text,
  updated_at timestamp with time zone,
  owner_id uuid,
  owner_name text,
  owner_avatar text,
  shared_at timestamp with time zone
)
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
    ns.created_at
  FROM public.notebook_shares ns
  JOIN public.student_notebooks sn ON sn.id = ns.notebook_id
  LEFT JOIN public.profiles p ON p.id = ns.owner_id
  WHERE ns.recipient_id = auth.uid()
    AND ns.hidden_by_recipient = false
  ORDER BY sn.updated_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.list_notebook_share_recipients(_notebook_id uuid)
RETURNS TABLE(share_id uuid, recipient_id uuid, recipient_name text, recipient_avatar text)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    ns.id,
    ns.recipient_id,
    COALESCE(NULLIF(TRIM(p.full_name), ''), 'Học viên')::text,
    p.avatar_url
  FROM public.notebook_shares ns
  LEFT JOIN public.profiles p ON p.id = ns.recipient_id
  WHERE ns.notebook_id = _notebook_id
    AND ns.owner_id = auth.uid()
  ORDER BY p.full_name;
$$;
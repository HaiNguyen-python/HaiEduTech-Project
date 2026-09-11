-- 1. content_items: signed-in users must respect visibility
DROP POLICY IF EXISTS "Signed in users read published content" ON public.content_items;
CREATE POLICY "Signed in users read published content"
ON public.content_items
FOR SELECT
TO authenticated
USING (
  status = 'published'
  AND visibility IN ('public', 'students')
);

-- 2. Storage: only objects attached to published content are readable
CREATE OR REPLACE FUNCTION public.content_object_visible(_name text, _require_public boolean)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.content_items i
    WHERE i.status = 'published'
      AND (NOT _require_public OR i.visibility = 'public')
      AND (
        (i.cover_url IS NOT NULL AND i.cover_url LIKE '%' || _name || '%')
        OR (i.body::text LIKE '%' || _name || '%')
        OR EXISTS (
          SELECT 1 FROM public.content_assets a
          WHERE a.content_id = i.id AND a.storage_path = _name
        )
      )
  );
$$;

GRANT EXECUTE ON FUNCTION public.content_object_visible(text, boolean) TO anon, authenticated;

DROP POLICY IF EXISTS "Anyone reads content media objects" ON storage.objects;
CREATE POLICY "Anyone reads published public content media"
ON storage.objects
FOR SELECT
TO anon
USING (
  bucket_id = 'content-media'
  AND public.content_object_visible(name, true)
);

DROP POLICY IF EXISTS "Signed in users read content media objects" ON storage.objects;
CREATE POLICY "Signed in users read published content media"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'content-media'
  AND (
    public.content_object_visible(name, false)
    OR owner = auth.uid()
    OR public.is_staff(auth.uid())
  )
);

DROP POLICY IF EXISTS "Signed in users read content files" ON storage.objects;
CREATE POLICY "Signed in users read published content files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'content-files'
  AND (
    public.content_object_visible(name, false)
    OR owner = auth.uid()
    OR public.is_staff(auth.uid())
  )
);

-- 3. hsk_example_translations: only staff may insert reference data
DROP POLICY IF EXISTS "Authenticated insert hsk translations" ON public.hsk_example_translations;
CREATE POLICY "Staff insert hsk translations"
ON public.hsk_example_translations
FOR INSERT
TO authenticated
WITH CHECK (public.is_staff(auth.uid()));
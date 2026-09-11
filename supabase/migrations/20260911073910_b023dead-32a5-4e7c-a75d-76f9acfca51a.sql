CREATE TABLE public.content_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by uuid,
  kind text NOT NULL CHECK (kind IN ('article','lesson','resource')),
  title text NOT NULL,
  title_en text,
  slug text NOT NULL UNIQUE,
  summary text,
  summary_en text,
  cover_url text,
  body jsonb NOT NULL DEFAULT '{}'::jsonb,
  subject text,
  level text,
  tags text[] NOT NULL DEFAULT '{}'::text[],
  visibility text NOT NULL DEFAULT 'public' CHECK (visibility IN ('public','students')),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_items TO authenticated;
GRANT SELECT ON public.content_items TO anon;
GRANT ALL ON public.content_items TO service_role;

ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff manage content items"
  ON public.content_items FOR ALL TO authenticated
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Anyone reads published public content"
  ON public.content_items FOR SELECT TO anon
  USING (status = 'published' AND visibility = 'public');

CREATE POLICY "Signed in users read published content"
  ON public.content_items FOR SELECT TO authenticated
  USING (status = 'published');

CREATE INDEX idx_content_items_status_kind ON public.content_items (status, kind, published_at DESC);
CREATE INDEX idx_content_items_created_by ON public.content_items (created_by);

CREATE TRIGGER trg_content_items_updated_at
  BEFORE UPDATE ON public.content_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.content_assets (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id uuid REFERENCES public.content_items(id) ON DELETE CASCADE,
  created_by uuid,
  bucket text NOT NULL,
  storage_path text NOT NULL,
  kind text NOT NULL DEFAULT 'image',
  file_name text,
  size_bytes bigint,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_assets TO authenticated;
GRANT ALL ON public.content_assets TO service_role;

ALTER TABLE public.content_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff manage content assets"
  ON public.content_assets FOR ALL TO authenticated
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE INDEX idx_content_assets_content ON public.content_assets (content_id);

CREATE POLICY "Staff manage content media objects"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id IN ('content-media','content-files') AND public.is_staff(auth.uid()))
  WITH CHECK (bucket_id IN ('content-media','content-files') AND public.is_staff(auth.uid()));

CREATE POLICY "Signed in users read content files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'content-files');
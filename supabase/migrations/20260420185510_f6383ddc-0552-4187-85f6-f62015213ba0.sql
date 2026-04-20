-- 1. Add illustrations column to existing cache table
ALTER TABLE public.programming_theory_cache
  ADD COLUMN IF NOT EXISTS illustrations jsonb NOT NULL DEFAULT '[]'::jsonb;

-- 2. Create public storage bucket for lesson illustrations
INSERT INTO storage.buckets (id, name, public)
VALUES ('lesson-illustrations', 'lesson-illustrations', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 3. Public read policy for the bucket
DROP POLICY IF EXISTS "Lesson illustrations are publicly readable" ON storage.objects;
CREATE POLICY "Lesson illustrations are publicly readable"
ON storage.objects
FOR SELECT
USING (bucket_id = 'lesson-illustrations');

-- 4. Teachers/admins can manage illustrations (service role bypasses RLS automatically)
DROP POLICY IF EXISTS "Teachers can upload lesson illustrations" ON storage.objects;
CREATE POLICY "Teachers can upload lesson illustrations"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'lesson-illustrations'
  AND (public.has_role(auth.uid(), 'teacher'::public.app_role)
    OR public.has_role(auth.uid(), 'admin'::public.app_role))
);

DROP POLICY IF EXISTS "Teachers can update lesson illustrations" ON storage.objects;
CREATE POLICY "Teachers can update lesson illustrations"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'lesson-illustrations'
  AND (public.has_role(auth.uid(), 'teacher'::public.app_role)
    OR public.has_role(auth.uid(), 'admin'::public.app_role))
);

DROP POLICY IF EXISTS "Teachers can delete lesson illustrations" ON storage.objects;
CREATE POLICY "Teachers can delete lesson illustrations"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'lesson-illustrations'
  AND (public.has_role(auth.uid(), 'teacher'::public.app_role)
    OR public.has_role(auth.uid(), 'admin'::public.app_role))
);

-- 1. Drop anon SELECT policy on profiles (keep authenticated-only access)
DROP POLICY IF EXISTS "Anon can view profile names" ON public.profiles;

-- 2. Drop overly permissive INSERT on api_usage_log for authenticated
DROP POLICY IF EXISTS "Authenticated can insert usage logs" ON public.api_usage_log;

-- 3. Tighten contact_messages INSERT (require name and email not empty)
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can insert contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0 AND length(trim(email)) > 3
  );

-- 4. Restrict vocab-images bucket SELECT to authenticated users
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Authenticated can view vocab images"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'vocab-images');

-- Also allow public read for vocab images (needed for rendering)
CREATE POLICY "Public can view vocab images"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'vocab-images');

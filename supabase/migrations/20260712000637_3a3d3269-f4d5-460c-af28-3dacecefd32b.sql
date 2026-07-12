
CREATE POLICY "Your Corner users upload own images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'marketing-images'
  AND (storage.foldername(name))[1] = 'your-corner'
  AND (storage.foldername(name))[2] = (auth.uid())::text
);

CREATE POLICY "Your Corner users delete own images"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'marketing-images'
  AND (storage.foldername(name))[1] = 'your-corner'
  AND (storage.foldername(name))[2] = (auth.uid())::text
);

CREATE POLICY "Your Corner users update own images"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'marketing-images'
  AND (storage.foldername(name))[1] = 'your-corner'
  AND (storage.foldername(name))[2] = (auth.uid())::text
);

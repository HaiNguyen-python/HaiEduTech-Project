CREATE POLICY "Anyone reads content media objects"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'content-media');

CREATE POLICY "Signed in users read content media objects"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'content-media');
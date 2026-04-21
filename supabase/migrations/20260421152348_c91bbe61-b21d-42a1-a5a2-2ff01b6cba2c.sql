
-- Create public bucket for song illustrations
INSERT INTO storage.buckets (id, name, public)
VALUES ('song-images', 'song-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access
CREATE POLICY "Public read song-images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'song-images');

-- Authenticated upload (admins/teachers manage via dashboard)
CREATE POLICY "Authenticated upload song-images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'song-images');

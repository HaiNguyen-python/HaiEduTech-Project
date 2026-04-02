-- Drop the overly permissive policy
DROP POLICY "Service role can upload vocab images" ON storage.objects;

-- Create a more restrictive policy - only authenticated users can upload
CREATE POLICY "Authenticated users can upload vocab images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'vocab-images');
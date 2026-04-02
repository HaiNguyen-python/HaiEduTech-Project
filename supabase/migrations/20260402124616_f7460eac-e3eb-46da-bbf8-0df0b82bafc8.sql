-- Create storage bucket for vocabulary illustrations
INSERT INTO storage.buckets (id, name, public) VALUES ('vocab-images', 'vocab-images', true);

-- Allow public read access
CREATE POLICY "Vocab images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'vocab-images');

-- Allow service role to insert (edge functions use service role)
CREATE POLICY "Service role can upload vocab images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'vocab-images');
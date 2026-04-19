-- Marketing campaigns storage for AI-generated ad kits
CREATE TABLE public.marketing_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID NOT NULL,
  campaign_label TEXT NOT NULL DEFAULT 'Campaign A',
  course TEXT NOT NULL,
  audience TEXT NOT NULL,
  platform TEXT NOT NULL,
  goal TEXT NOT NULL,
  copy_variations JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url TEXT,
  image_prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can view all campaigns"
  ON public.marketing_campaigns FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Teachers can insert campaigns"
  ON public.marketing_campaigns FOR INSERT
  TO authenticated
  WITH CHECK ((has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role)) AND auth.uid() = created_by);

CREATE POLICY "Teachers can delete own campaigns"
  ON public.marketing_campaigns FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE INDEX idx_marketing_campaigns_created_by ON public.marketing_campaigns(created_by, created_at DESC);

-- Storage bucket for generated marketing images
INSERT INTO storage.buckets (id, name, public) VALUES ('marketing-images', 'marketing-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view marketing images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'marketing-images');

CREATE POLICY "Teachers can upload marketing images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'marketing-images'
    AND (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role))
  );

CREATE POLICY "Teachers can delete own marketing images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'marketing-images'
    AND (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role))
  );

-- Table for Knowledge Hub articles with TTL support
CREATE TABLE public.knowledge_hub_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_vi text,
  summary text NOT NULL,
  summary_vi text,
  category text NOT NULL DEFAULT 'education',
  thumbnail_url text,
  source_url text,
  source_name text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '60 days'),
  engagement_score integer NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.knowledge_hub_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read posts (public content)
CREATE POLICY "Anyone can view knowledge hub posts"
ON public.knowledge_hub_posts FOR SELECT
TO anon, authenticated
USING (true);

-- Only service_role can insert (edge function)
CREATE POLICY "Service role can manage posts"
ON public.knowledge_hub_posts FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Teachers can manage posts
CREATE POLICY "Teachers can manage posts"
ON public.knowledge_hub_posts FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

-- Table for tracking student article interests
CREATE TABLE public.article_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  article_id uuid REFERENCES public.knowledge_hub_posts(id) ON DELETE CASCADE,
  category text NOT NULL,
  clicked_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.article_interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own interests"
ON public.article_interests FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own interests"
ON public.article_interests FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view all interests"
ON public.article_interests FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'teacher') OR has_role(auth.uid(), 'admin'));

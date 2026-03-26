
ALTER TABLE public.knowledge_hub_posts ALTER COLUMN expires_at SET DEFAULT (now() + interval '15 days');

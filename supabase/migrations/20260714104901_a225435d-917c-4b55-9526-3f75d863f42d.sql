
UPDATE public.your_corner_posts
SET content = regexp_replace(content, '\s*\[AutoPoll\]\s*', ' ', 'g')
WHERE content LIKE '%[AutoPoll]%';

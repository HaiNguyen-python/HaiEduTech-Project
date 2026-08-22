ALTER TABLE public.student_notebooks REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.student_notebooks;
ALTER TABLE public.notebook_shares REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notebook_shares;
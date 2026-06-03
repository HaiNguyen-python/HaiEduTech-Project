ALTER TABLE public.user_roles REPLICA IDENTITY FULL;
ALTER TABLE public.assistant_bonuses REPLICA IDENTITY FULL;
ALTER TABLE public.time_logs REPLICA IDENTITY FULL;
ALTER TABLE public.daily_reports REPLICA IDENTITY FULL;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='user_roles') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.user_roles';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='assistant_bonuses') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.assistant_bonuses';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='time_logs') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.time_logs';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='daily_reports') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.daily_reports';
  END IF;
END $$;
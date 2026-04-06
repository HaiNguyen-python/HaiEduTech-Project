
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'tuition_records'
  ) THEN
    ALTER PUBLICATION supabase_realtime DROP TABLE public.tuition_records;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'student_activity_log'
  ) THEN
    ALTER PUBLICATION supabase_realtime DROP TABLE public.student_activity_log;
  END IF;
END $$;

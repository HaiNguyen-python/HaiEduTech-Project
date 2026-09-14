SELECT cron.schedule(
  'warm-programming-deep-dives-nightly',
  '30 18 * * *',
  $$
  SELECT net.http_post(
    url := 'https://ldbrjxtqcnrbdimexrif.supabase.co/functions/v1/warm-programming-deep-dives',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object('batch_size', 20)
  );
  $$
);
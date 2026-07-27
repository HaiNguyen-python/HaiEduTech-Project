SELECT cron.alter_job(
  job_id := (SELECT jobid FROM cron.job WHERE jobname = 'process-email-queue'),
  schedule := '*/2 * * * *'
);
SELECT cron.alter_job(
  job_id := (SELECT jobid FROM cron.job WHERE jobname = 'auto-generate-daily-lessons'),
  active := false
);
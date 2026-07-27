
-- Reschedule the email queue processor from every 5 seconds to every 30 seconds.
-- The queue check itself is cheap, but running 17k times a day prevents Cloud
-- compute (micro) from ever going idle, which is the largest daily credit line
-- item. 30s is still snappy for signup confirmations / password resets.
SELECT cron.alter_job(
  job_id := (SELECT jobid FROM cron.job WHERE jobname = 'process-email-queue'),
  schedule := '30 seconds'
);

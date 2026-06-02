---
name: Monthly Progress Report
description: Automated monthly student learning report — pg_cron 1st of month, edge function aggregates 30-day metrics, branded transactional email, Report Logs admin tab
type: feature
---

## Monthly Progress Report System

**Trigger:** pg_cron `monthly-progress-report` at `0 0 1 * *` (00:00 UTC, 1st of month).
Calls Edge Function `monthly-progress-report` which can also be invoked manually from the admin "Báo cáo Email / Report Logs" tab (Operations group) with `{ dryRun: true|false }`.

**Aggregation (last 30 days, per student role only):**
- Total study hours (sum `time_spent_seconds`)
- Streak days (longest consecutive-day chain in window)
- Stars (≥70% accuracy → 5 + floor((acc-70)/5))
- Pet level/emoji derived from `user_vocab_mastered` count + stars
  (levels 1-10: 🥚🐣🐤🐥🐦🦅🐲🐉🦄🌟)
- Top 8 modules by attempts with avg accuracy %
- Smart Review queue ≈ total mastered words

**Email template:** `monthly-progress-report.tsx` — executive bright office style:
white body, charcoal text, slate borders, 3-column metrics table, bullet modules,
emerald accent CTA → `/placement-test`. All inline styles for Gmail/Outlook/Apple Mail.

**Sender:** `contact@haiedutech.com` as "HaiEduTech Smart Learning Platform"
(updated `SITE_NAME` + `FROM_LOCAL_PART` in `send-transactional-email/index.ts`).
Sender domain `notify.haiedutech.com`.

**Logging:** `monthly_report_logs` table (period_start, user_id, recipient_email,
status: queued|sent|failed|skipped|dry_run, metrics jsonb). Admin-only SELECT via RLS.

**Idempotency key:** `monthly-report-{user_id}-{YYYY-MM}` prevents duplicate sends.

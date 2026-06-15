---
name: RL Bell Dispatcher
description: Bi-weekly RL agent that classifies students from 14-day activity and sends bell notifications (praise/intervention) plus teacher summary
type: feature
---
- Edge function `rl-intervention-dispatcher`, scheduled via pg_cron `rl-intervention-bi-weekly` at `0 12 * * 1,4` (Mon & Thu 19:00 VN).
- Thresholds (balanced): TOP avg ≥80% OR trend +5% with ≥5 acts; STRUGGLE avg <65% (≥3 acts) OR >4 days inactive. STEADY = no notification.
- Writes to `assignment_notifications` (student + teacher mirror; no `assignment_id` so AssignmentReminderModal ignores them) and logs every decision to `rl_interventions` (state/action/reward).
- Reward loop on next run: struggle improvement → +1 rewarded; 2× struggle no improvement → -0.5 escalated + 🚨 teacher ping; top confirmed → +0.5.
- 72h dedup per (student, action). Admin tab `/admin?tab=rl-interventions` exposes Dry-run + Force-run + Recharts (daily bars, outcome pie, effectiveness %).

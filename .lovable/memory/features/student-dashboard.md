---
name: Student Dashboard
description: Personalized Overview tab — no leaderboard, 5 recent activities + View All, Skill Radar (4 programs), Active Course Cards, Weekly Hours, Daily Motivation, AI Insight
type: feature
---
Overview tab focuses strictly on individual progress.

- Removed: OverallLeaderboard, Domain Breakdown bar chart, Activity Trend line, Consistency Heatmap.
- Added: Daily Motivation card (deterministic by name+date, VI/EN pools), AI Insight summary, Active Course Cards (max 3, animated progress bars, Continue link), Skill Radar across 4 programs (English PTE / Finnish YKI / Chinese HSK / Programming), Weekly Study Hours bar (last 7 days minutes), Recent Activities (5 most recent + "View All" → /activity-log).
- New page: /activity-log (full history, filters by domain, relative time, lucide icons per type).
- Course progress derived from ielts_lecture_progress, toeic_lecture_progress, and student_activity_log domain counts.
- Counseling tab unchanged.

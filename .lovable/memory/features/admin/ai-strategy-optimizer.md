---
name: AI Strategy Optimizer
description: Perplexity sonar-pro AI consultant in admin Strategy tab — chat, forecaster, dynamic pricing, market intel, exec report, what-if slider, hot leads, weekly rate-limit
type: feature
---
AI Strategy Optimizer integrated below BusinessStrategyTab (admin only). Uses edge function `ai-strategy-optimizer` with Perplexity sonar-pro (live web search). 5 modes: forecaster (3-month enrollment calendar), pricing (dynamic adjustments), market_intel (Vietnam EdTech trends + competitor scan), executive_report (monthly plan), chat (Q&A consultant). Rate-limited to 1 deep run per mode per 7 days via localStorage `ai-optimizer-last-run` to save Perplexity credits. What-if slider simulates revenue per cohort by class size (5-30) with -5% group discount at 18+. Hot Leads detects users with 3+ page_view events in 14 days from student_activity_log and suggests 15% discount.

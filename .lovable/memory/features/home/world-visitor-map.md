---
name: World Visitor Map data rules
description: Country visit counting is deduplicated per visitor/day, no locale guessing, public aggregate student and page-view counts
type: feature
---
- `country_visits` is only updated through `record_country_visit(_code, _name, _visitor_hash)`; the hash is SHA-256 of IP + user agent + UTC day, stored in `country_visit_hits` with a unique index so each visitor counts once per country per day. IP addresses are never stored.
- Never guess the country from `navigator.language`; only real detected countries count. `WorldVisitorMap.tsx` skips tracking on localhost/preview/sandbox hosts.
- `increment_country_visit` stays in the database for compatibility but is no longer called from the client.
- KPIs use `get_public_student_count()` and `get_public_pageview_total()` (security definer, aggregate only, anon-executable). Call them with `.call(supabase, fn)` - an unbound `supabase.rpc` reference returns null.
- Sep 2026: legacy inflated country totals were rescaled to real session volume (US 179, VN 94, FI 27, GB 16, TH 12, UA 9, CA 1). Do not reset history.

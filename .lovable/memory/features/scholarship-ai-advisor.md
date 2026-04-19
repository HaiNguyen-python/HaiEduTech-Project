---
name: AI Scholarship Advisor
description: Perplexity-powered scholarship hub with consultation form, globe-scan loading, color-coded roadmap with checklists, AI-write buttons, and Teacher Hai review CTA
type: feature
---
On /global-scholarship the top section is now an AI Consultation Box (dream textarea + level/GPA/country/field/type) calling edge function `scholarship-advisor` (Perplexity sonar with `search_recency_filter: year`). Returns 5 scholarships with deadlineUrgency (tight/normal/rolling color codes), eligibilityMatch, document checklist (interactive checkboxes + progress bar), motivation letter outline, and apply URL. Each motivation/recommendation doc has "AI write" link to /ielts-writing-practice or /ai-grading. Each card has "Request Teacher Hai Review" → /contact. Loading state shows rotating globe + flying scholarship icons. Static curated list still browsable below a divider.

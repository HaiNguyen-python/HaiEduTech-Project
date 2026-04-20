---
name: AI Counseling & Career Hub
description: Tab "Counseling" in /dashboard with Compass AI (Perplexity sonar-pro), 7 sections — chat, mood, IKIGAI, MBTI/Holland, dilemmas, journal, daily quote
type: feature
---

Located at /dashboard via Tabs (Overview | Counseling).

Component: src/components/counseling/CounselingHub.tsx
Edge function: supabase/functions/counseling-ai/index.ts (Perplexity sonar-pro)
Data: src/data/ikigaiAndPersonality.ts

Modes (system prompts in edge function):
- psychological — empathetic study/burnout support, distress_high flag
- career — major/career suggestions linked to scholarship hub
- ikigai — 4-quadrant synthesis (love/good_at/world_needs/paid_for)
- personality — MBTI 4-letter code or Holland top-3 letter code interpretation
- quote — mood-based motivational quote
- mbti-career-map — map MBTI type to HaiEduTech courses + top 5 careers
- mbti-journey — analyze user's MBTI test history, return narrative + key_changes + growth_insight + next_step

MBTI Journey UI (src/components/counseling/MbtiJourney.tsx): auto-renders in MbtiFullTest intro phase when career_assessments has ≥2 'mbti-full' rows. Includes Timeline milestones with type-change badges, Recharts line chart for 4 dimensions (EI/SN/TF/JP %) with 50% reference line, and on-demand "Ask Compass AI" button.

Tables (RLS, user_id = auth.uid):
- counseling_conversations (mode, messages JSONB, distress_flagged)
- counseling_journal (content, tags)
- mood_checkins (mood, mood_score, note)
- career_assessments (assessment_type, answers, result, ai_insights)
- teacher_contact_requests (topic, message, urgency, status — admin-only view)

When AI returns distress_high=true, UI shows "Talk to Teacher Hai" dialog that inserts into teacher_contact_requests (status='pending'). No email — Teacher Hai checks Admin tab.

Language: payloads send `language: lang` from useLanguage(). System prompts respect VI/EN.

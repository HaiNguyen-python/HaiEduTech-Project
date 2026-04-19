---
name: Global Search & Global Scholar Badge
description: Cmd/Ctrl+K command palette indexes all main routes (Study Abroad prioritized). Global Scholar badge auto-awarded via SECURITY DEFINER RPC after first document upload.
type: feature
---
- `GlobalSearch` component (`src/components/GlobalSearch.tsx`) — `CommandDialog` palette opened via search icon (desktop+mobile in Navbar) or Cmd/Ctrl+K. Groups: Study Abroad, Learn, Practice, General.
- Badge: DB function `public.award_global_scholar_badge()` (SECURITY DEFINER) checks `student_documents` count >= 1 and inserts into `player_badges` with `badge_id='global-scholar'`, `badge_icon='🌍'`. Idempotent.
- `GlobalScholarBadge` component reads `player_badges` filtered by user_id + badge_id and shows emerald gradient pill.
- Triggered after successful upload in `StudentDocuments.tsx` via `supabase.rpc('award_global_scholar_badge')`. Toast on `newly_earned`.

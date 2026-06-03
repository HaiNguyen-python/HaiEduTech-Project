---
name: Finnish Speaking System
description: AI Speaking Coach Finnish — 42 themes / 385 sentences, A1/A2/B1 filter, IPA tips for vowel length, geminates, harmony
type: feature
---
Finnish Speaking Coach scope:
- 42 themes / 385 sentences across files: speakingCoachData (5 themes A1/A2), speakingCoachExpansion 1/2/3 (A2/A2/B1), and speakingCoachFinnishExpansion (12 themes, A1×4 + A2×4 + B1×4).
- SpeakingTheme has optional `level: "A1" | "A2" | "B1"`. UI shows a Finnish-only level filter chip (All/A1/A2/B1), persisted to localStorage `speaking-coach-level-finnish`.
- Pronunciation tips for Finnish include vowel length (`tuli/tuuli/tulli`), geminates (`kuka/kukka`), first-syllable stress rule, and vowel harmony (back vs front).
- Roleplay edge function (`supabase/functions/roleplay-chat/index.ts`) enforces strict Finnish reply format: bold Finnish + [rough IPA] + (Vietnamese:…) + optional Sanasto/Korjaus/Puhekieli tips. Adapts to A1/A2/B1.
- Theme & sentence IDs are deduplicated; no overlapping IDs across expansion files.

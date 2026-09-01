---
name: Vocabulary milestone badges
description: Score-derived badges (20/50/100/200/350/500/800/1200 words) next to names on vocab leaderboards, with full-screen celebration on unlock
type: feature
---

# Milestone badges
- Tiers in `src/lib/vocabBadges.ts`: 20 Seedling, 50 Spark, 100 Rising Star, 200 Word Hunter, 350 Scholar, 500 Master, 800 Legend, 1200 Immortal. Derived from the leaderboard score - no DB table.
- `VocabBadgePill` renders next to names in `VocabMasteryLeaderboard` and `OverallVocabLeaderboard` (icon-only under sm).
- `announceVocabBadges(subject, prev, next)` in `useMasteredVocab` fires the `vocab-badge-earned` window event; each tier celebrates once per subject via `vocab_badge_seen_<subject>` in localStorage.
- `VocabBadgeCelebration` is mounted once in `App.tsx`: full-screen overlay, badge flies up from the bottom, glow + side confetti, auto-closes after 3.6s, static card when prefers-reduced-motion.

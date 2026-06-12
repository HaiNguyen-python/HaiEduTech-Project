---
name: Unified Pet XP System
description: Single source of XP for AI Study Pet. awardPetXP() called from every learning hook
type: feature
---
# Unified Pet XP System

Replaces the old dual-source Pet XP (which only counted AI Academy + Programming).

## Architecture
- **Central hook**: `src/hooks/usePetXP.ts` — exports `awardPetXP(amount, source, opts?)` and `usePetXP()`.
- **Storage**: `localStorage["haiedu_pet_xp_v1"]` = `{ xp, log[50] }`, synced to Supabase `user_pet_xp` (PK user_id, total_xp, last_source).
- **Migration**: `migratePetXpFromLegacy()` seeds once from `ai_academy_xp_v1.xp + haiedu_programming_xp_v1.xp` (flag: `haiedu_pet_xp_migrated_v1`).
- **Events**: `pet:xp` (HUD/toast), `pet:star` (Pet celebrates 60s when `celebrate !== false`).

## XP table
| Action | XP | Source |
|---|---|---|
| Mastered vocab word | +5 | `vocab:{subject}` |
| Lecture completed (IELTS/TOEIC) | +20 | `lecture:{kind}` |
| HSK SRS review (Good/Easy) | +5 | `vocab:hsk` |
| Spaced-rep review marked | +5 | `vocab:{subject}` |
| SAT star toggled on | +10 | `quiz:sat` |
| AI Academy lesson/quiz/star | bridge | `ai-academy` |
| AI Academy daily quest claimed | +50 | `daily-quest` |
| Programming XP grant | bridge | `programming` |
| Programming Daily Challenge | +100 | `programming` |

## Integration points (call awardPetXP)
- `useMasteredVocab.toggle` — only when adding (not removing)
- `useIeltsLectureProgress.markCompleted`
- `useToeicLectureProgress.markCompleted`
- `useHskSRS.review` (rating ≥ 3 only)
- `useReviewQueue.markReviewed`
- `useSatStar.toggle` — only when adding
- `useAIAcademyXP.awardXP` + `claimDailyReward` (bridge)
- `useProgrammingXP.awardXP` + `completeDailyChallenge` (bridge)

## UI
- `PetXPToastListener` mounted in `App.tsx` (deferred) — shows debounced "+N XP 🐾" toast (800ms window).
- ChatBot Pet info panel (`showPetInfo`) lists the full XP table.

## Rules
- Never double-count un-mastering / un-starring (only reward additive actions).
- Old `useStudyPet` still owns happiness (overdue reviews) and stage thresholds.
- Old `ai_academy_xp_v1` and `haiedu_programming_xp_v1` keys remain for their own HUDs; bridge keeps them in sync with Pet.

---
name: Placement test to personalized path
description: Every language placement test ends with level + skill scores + a seeded My Path plan; Japanese/Swedish banks added
type: feature
---
- Banks in `src/data/placementBanks.ts`: english, chinese, vietnamese, finnish, programming, plus japanese (JLPT N5-N3, 18 Qs, IDs 501-518) and swedish (A1-B2, 18 Qs, IDs 601-618).
- `src/lib/personalization/placementBridge.ts` (pure, unit-tested in `src/test/placementBridge.test.ts`): `BANK_SUBJECTS`, `subjectsForBank`, `ladderLevelFrom` (band decides the rung, score only nudges inside it), `nextTarget`, `defaultTargetDate`, `weaknessLinks`, defaults 5 h/week and all 7 days.
- `useLearningPath.seedFromPlacement(bank, cefr, total)` creates or refreshes `learning_paths` for every subject the bank feeds. An existing path keeps its goal, target level/date and hours; only current level is refreshed, so retaking never wipes the plan. Guests use localStorage.
- `src/components/personalization/PlacementPathResult.tsx` is the result screen: level, weighted score, confidence, skill bars, suggested class, weak skills with practice links, weekly-hours slider, generated weekly tasks, links to `/my-path`, `/my-path/start` and the first task.
- `src/components/personalization/PlacementCta.tsx` sits above the footer on the six language hubs (`/english`, `/chinese`, `/japanese`, `/learn-vietnamese`, `/finnish`, `/swedish`) and links to `/placement-test?subject=<slug>`.
- `PathSubjectCard` shows a "Retake the placement test" link when the subject has a placement bank.
- No new tables: `placement_test_results`, `learning_paths`, `learning_path_steps` only.

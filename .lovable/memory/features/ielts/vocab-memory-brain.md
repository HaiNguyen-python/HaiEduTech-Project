---
name: IELTS Vocabulary Memory Brain
description: 3D WebGL brain at the bottom of IELTS Vocabulary; mastered words are neurons that fade with review recency
type: feature
---

Replaces the old vocabulary performance charts (VocabPerformanceCharts.tsx deleted).

- Components: `src/components/vocab/VocabBrainPanel.tsx` (stats, filters All/Fresh/Fading/Revise, legend, CTA), `VocabBrain3D.tsx` (react-three-fiber points + custom shader glow, OrbitControls), `VocabBrain2D.tsx` (Canvas-2D fallback), `vocabBrainModel.ts` (maths).
- Placement: deterministic per-word hash -> `brainPositionFromRandoms` (two cerebrum hemispheres with mid-line fissure + cerebellum lobe). A faint LCG-generated scaffold point cloud (1600 pts 3D / 900 pts 2D) keeps the brain silhouette readable with few words. Sequential hashed seeds must NOT be used for the scaffold - they draw visible spirals.
- Memory decay tiers by days since review: fresh <=1 emerald "Nhớ chắc", recent <=6 royal blue, fading <=20 amber, weak <=45 orange, forgotten >45 red - colour/opacity/size all decay, and each tier has a lighter `labelInk` for text. Legend chips are clickable tier filters.
- Brain volume is drawn with three point scaffolds (silhouette 9000 pts, mid 0.86x, core 0.62x via `buildScaffoldShell`) - no sphere meshes, they clashed with the gyri geometry.
- Label density: Few 40 / Some 90 / Many 180 / All; `pickLabelCandidates` takes a `minFacing` (-0.8) so back-side words still label at 0.4 opacity.
- Data: `user_vocab_mastered` (subject = 'ielts', reviewed_at/created_at) merged with localStorage set; `game_scores` for practice accuracy.
- Versions pinned for React 18: @react-three/fiber ^8, @react-three/drei ^9.
- Word labels are HTML (absolutely positioned over the canvas, projected in `LabelProjector`), NOT drei `Text`/troika - troika's blob worker fails in some environments and left the Suspense fallback stuck on "Building the 3D model...". Dim tiers get a lighter label ink (#cbd5e1) so text stays readable.


## Short-term vs long-term memory (2026-08-23)

- `user_vocab_mastered` gained `review_count` (default 1) and `last_interval_days`; `useReviewQueue.markReviewed` increments both.
- `vocabBrainModel.ts` adds `memoryStability` / `memoryStrength` / `retentionAfter` / `daysUntilRetention` / `memoryZone` / `consolidation` (Ebbinghaus `exp(-days/stability)`, stability = `2.2 * 1.85^(reps-1) * spacing`).
- Zones: `short` (surface), `consolidating`, `long` (reviews >= 4 and stability >= 20). Neuron radius = `1 - consolidation*0.58`, so long-term words sit in a green glowing core; `sx/sy/sz` keep the original surface spot for the replay animation.
- `replay` prop (0..1, null = off) on VocabBrain3D/2D lerps surface -> real depth; panel drives it over 6s via the "Xem quá trình" button.
- Panel adds memory-balance bar with zone filters (`zone:<zone>` filter keys), memory health %, at-risk-in-7-days, Daily Review Mission (10 weakest at-risk words), long-term badges 10/50/100/300, and a per-word SVG forgetting curve (now vs if reviewed today).

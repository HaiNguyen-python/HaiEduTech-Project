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


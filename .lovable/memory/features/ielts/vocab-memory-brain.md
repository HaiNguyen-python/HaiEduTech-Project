---
name: IELTS Vocabulary Memory Brain
description: 3D WebGL brain at the bottom of IELTS Vocabulary; mastered words are neurons that fade with review recency
type: feature
---

Replaces the old vocabulary performance charts (VocabPerformanceCharts.tsx deleted).

- Components: `src/components/vocab/VocabBrainPanel.tsx` (stats, filters All/Fresh/Fading/Revise, legend, CTA), `VocabBrain3D.tsx` (react-three-fiber points + custom shader glow, OrbitControls), `VocabBrain2D.tsx` (Canvas-2D fallback), `vocabBrainModel.ts` (maths).
- Placement: deterministic per-word hash -> `brainPositionFromRandoms` (two cerebrum hemispheres with mid-line fissure + cerebellum lobe). A faint LCG-generated scaffold point cloud (1600 pts 3D / 900 pts 2D) keeps the brain silhouette readable with few words. Sequential hashed seeds must NOT be used for the scaffold - they draw visible spirals.
- Memory decay tiers by days since review: fresh <=1 (green), recent <=6 (blue), fading <=20 (indigo), weak <=45 (slate), forgotten >45 - color, opacity and point size all decay.
- Data: `user_vocab_mastered` (subject = 'ielts', reviewed_at/created_at) merged with localStorage set; `game_scores` for practice accuracy.
- Versions pinned for React 18: @react-three/fiber ^8, @react-three/drei ^9.

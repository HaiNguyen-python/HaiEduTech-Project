---
name: Your IELTS Performance
description: /ielts-performance dashboard aggregating 4 skills + vocab/grammar, band prediction, readiness weeks, ranked weaknesses, AI coach
type: feature
---
- Route `/ielts-performance`, linked from the Cambridge IELTS menu under a "Đánh giá & Tiến độ / Progress & Analysis"
  header and from a banner on `/ielts-skills-practice`.
- `src/lib/ieltsPerformanceModel.ts` holds all pure math: `buildSkillStat`, `currentSkillBand`
  (recent 3 attempts weighted double), `predictOverall` (half-band rounded average + confidence),
  `improvementPerWeek`, `readiness` (fallback model 0.5 band per 7 weeks), `rankWeaknesses`, `studyPlan`.
- `src/hooks/useIeltsPerformance.ts` reads only existing sources: `ielts-listening-history-v1`,
  `ielts-reading-history-v1`, `ielts-speaking-score-history-v1`, `writing_attempts` (cloud),
  `user_vocab_mastered` subject `ielts`, `speaking_srs_items` (local fallback `ielts-speaking-srs-v1`).
- Grammar band = average of the Grammatical Range criteria from Writing + Speaking. Lexical band is
  derived from mastered word count. Target band stored in `ielts-performance-target-v1`.
- AI commentary edge function `ielts-performance-coach` (Perplexity sonar, VI then EN); the client
  falls back to a rule-based paragraph, so numbers never depend on the AI call.

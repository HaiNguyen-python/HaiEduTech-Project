---
name: English Grammar content standards
description: Every English Grammar lesson (67 lessons / 28 modules) must have >=120-word English theory in a fixed 6-section layout, pro tips, vocabulary and >=3 exercises; upgrades live in grammarUpgrade parts, not legacy files.
type: feature
---
Standard structure for each lesson `theoryEn` / `theory` (markdown, bilingual):
1. Rule - 2. Form - 3. When to use - 4. Model sentences - 5. Common mistakes - 6. Contrast box (table)

Hard requirements (validated by an audit script over `allGrammarModules`):
- `theoryEn` >= 120 words, no Vietnamese characters in the English version
- `proTipsEn` / `proTips`: at least 3 tips each
- `vocabulary`: at least 4 entries with ipa, meaning, meaningEn, example
- `exercises`: at least 3 per lesson

Architecture:
- Content upgrades live in `src/data/languageCurriculum/grammarUpgrade/part1..part5.ts`, keyed by lesson id, merged by `enhanceGrammarModulesWithTheoryUpgrade` (grammarUpgrade/index.ts). Legacy files (`englishGrammar.ts`, expansions) stay untouched.
- `src/lib/grammarExerciseBuilder.ts` (`enhanceGrammarModulesWithExercises`) tops every lesson up to 3 exercises, generating fill-in-blank from vocabulary examples plus deterministic sentence-reorder/dictation from model sentences.
- Pipeline order in `src/data/languageCurriculum/index.ts`: quiz depth -> theory upgrade -> exercise builder.

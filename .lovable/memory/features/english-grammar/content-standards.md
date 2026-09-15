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

## Practice-only mode (required)
- English Grammar lessons show ONLY interactive exercises + final quiz. Theory, overview, pro tips and vocabulary blocks are hidden in `LanguageLessonView.tsx`.
- Every lesson must have >= 7 exercises across >= 4 types (fill-in-blank, sentence-reorder, dictation, error-correction, transformation, multiple-choice, matching).
- Exercises are derived at runtime in `src/lib/grammarExerciseBuilder.ts`; thin lessons get hand-written items in `src/data/languageCurriculum/grammarExerciseSupplement.ts`.
- Validate with `bun scripts/audit_grammar_exercises.mjs` - must report zero issues (no Vietnamese leaks, no duplicate options/pairs, scramble word sets must match answers).

## Exercise banks and answer-key balance (2026-09)
- Hand-written practice lives in `src/data/languageCurriculum/grammarExercisesAuthored/part1..part7.ts`; `applyGrammarExerciseSupplement` also merges `${lessonId}-extra` and `-extra2` keys.
- MCQ options are rotated deterministically by `balanceMcqKeys` so the answer key is never always A.
- `bunx tsx scripts/audit_grammar_exercises.mjs` must report "All grammar exercises passed the audit" (min 7 exercises, min 4 types, no repeated items, no Vietnamese leaks, no identical mcq keys).

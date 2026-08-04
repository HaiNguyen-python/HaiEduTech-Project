# AI Academy: English-first content + full content review

Right now every AI Academy lesson is written in Vietnamese and translated to English at runtime by a translation layer inside the page. That is why text appears late, sometimes shifts while reading, and occasionally shows wrong wording. The fix is to make English the actual source language of the module and delete the translation layer.

Decisions confirmed: AI Academy becomes English-only (no Vietnamese translation path), and the rewrite covers everything - the 21 lesson tracks, all quizzes, and all interactive sandboxes.

## What changes for students

- All lesson text renders instantly in clear, native English. No waiting, no flicker, no mixed-language output.
- Every lesson follows the same predictable shape so it is easy to follow: what you will learn, a short vivid story, how it works step by step, a hands-on activity, a quiz with explanations, key terms, careers, and a homework task.
- Vietnam-based case studies stay (they are a strength) but are told in English with concrete numbers, places and outcomes.
- Quiz questions get short "why this answer" explanations so a wrong answer teaches something.
- Sandbox buttons, labels, hints, feedback and result messages are all in English and use consistent verbs (Start, Check, Reset, Next, Try again).

## Content quality bar applied to all 21 lessons

Each track must have:
- A one-line hook and 3-4 concrete learning objectives written as "You will be able to ...".
- Explanations in short sentences, plain words first, technical term introduced right after in brackets.
- At least one worked example with real numbers instead of vague description.
- Glossary of 5-6 terms, each defined in one student-friendly sentence.
- Careers list with realistic role names and where those jobs exist.
- A homework task that can be finished in 15-30 minutes with free tools, plus what to record/screenshot as proof.
- Working external demo links (dead or broken links replaced).
- Safety notes on sensitive tracks (Deepfake, Ethics, Digital Safety).

## Technical changes

Files to edit:

- `src/pages/AIAcademy.tsx` (~454 Vietnamese lines): rewrite the inline `TRACKS` array - titles, subtitles, story beats, drag-drop item labels and bucket names, section headings, buttons, toasts. Remove the `AutoTranslateBoundary` import and the wrapper at lines 1360/1833.
- `src/components/ai-academy/AutoTranslateBoundary.tsx`: delete (no longer used). The `translate-vi-en` edge function stays untouched because other modules may use it.
- `src/data/aiAcademyContent.ts` (~223 lines): rewrite `TRACK_EXTRAS` for all 21 tracks - `vietnamCase`, `goldenTip`, `glossary`, `careers`, `homework`, `externalDemo`, `safetyNote`.
- `src/data/aiAcademyQuizExtras.ts` (~236 lines): rewrite all questions, options and explanations in English; check that each question has exactly one defensible correct answer and that correct answers are spread across positions rather than clustered.
- All 25+ sandbox components under `src/components/ai-academy/` (NLPSandbox, PromptLabSandbox, StartupVNSandbox, DigitalSafetySandbox, StudySmartSandbox, RecsysSandbox, GraduationSandbox, EthicsSandbox, MLMagicSandbox, CapstoneSandbox, MathAISandbox, DataDetectiveSandbox, CareersMapSandbox, GenAISandbox, FactCheckSandbox, MiniCVChallenges, AgentWorkflowSandbox, DeepfakeSandbox, AIoTSandbox, RLSandbox, NeuralNetSandbox, SandboxBonusGames, GraduationCertificate, XPStreakHUD, ComputerVisionSandbox, ScenarioQuiz, SandboxMiniActivity, MultipleChoiceQuiz, DragDropQuiz): replace Vietnamese UI strings and data with English.

Notes:
- Comments in code stay English, per project convention.
- Since Vietnamese diacritics disappear from this module, the existing localStorage translation cache keys (`aiacad_tr_v5_*`) become dead; a small one-time cleanup removes them on load so they do not linger in student browsers.
- XP, streak, progress storage keys and quiz scoring logic are not touched - only display text and content data.

## Order of work

1. Remove the translation layer and the cache, so the page renders source text directly.
2. Rewrite `TRACKS` in `AIAcademy.tsx` (lesson spine: titles, stories, activities).
3. Rewrite `aiAcademyContent.ts` extras for all 21 tracks to the quality bar above.
4. Rewrite `aiAcademyQuizExtras.ts` with explanations and balanced answer positions.
5. Sweep the sandbox components, largest first, then verify with a scan that no Vietnamese diacritics remain in the module.
6. Load the page and click through several tracks and sandboxes to confirm nothing renders blank or breaks.

## Verification

- Automated scan: zero Vietnamese-diacritic strings left in `src/pages/AIAcademy.tsx`, the two data files, and `src/components/ai-academy/`.
- Typecheck and build pass.
- Manual pass through Computer Vision, NLP, Ethics, Prompt Lab and Graduation tracks: story reads cleanly, activity works, quiz scores and shows explanations, no console errors.

# Cambridge Test Prep - upgrade plan

## 1. Level grouping that is easy to scan
On the Test Prep page, replace the single flat grid of 25 cards with level sections in official order: Starters, Movers, Flyers, KET, PET.

- A sticky level filter bar at the top (All / Starters / Movers / Flyers / KET / PET) using each level's colour and emoji.
- Each level renders as its own titled band with a coloured header strip, a short "who it is for" line (age / CEFR: Starters A1 pre, Movers A1, Flyers A2, KET A2, PET B1) and its exam count.
- Cards keep best-score badges and grow in text size (title 16px+, meta 14px) so children can read them.

## 2. Five more papers per level (25 new exams, 50 total)
New file `src/data/cambridgeMockExamExpansion4.ts` (Starters 6-10, Movers 6-10, Flyers 6-10) and `cambridgeMockExamExpansion5.ts` (KET 6-10, PET 7-11), registered in `cambridgeMockExamData.ts` and run through the existing normalizer (balanced A-D keys, bilingual explanations).

Per paper, matching the official shape:
- Starters/Movers: 25 questions (15 Reading & Writing, 10 Listening), 20-25 min.
- Flyers: 30 questions, 30 min.
- KET: 35 questions, 40 min.
- PET: 45 questions, 45 min.
Themes stay distinct from existing papers (e.g. Starters: toys, weather, my day, body, house; PET: environment, media, health, travel, city life).

## 3. Real reading texts (the main content fix)
Today every Reading & Writing question is a standalone one-liner - there is no reading text at all, which is why the paper looks like it is missing the passage. Fix:

- Add a `passageGroup` label plus a shared `passage` to reading question sets (e.g. Q6-Q10 share one text). Level-appropriate lengths: Starters 25-40 words with picture cues, Movers 50-70, Flyers 90-120, KET 150-200, PET 250-320.
- In the exam screen, the text renders in a fixed "Reading text" panel above the question and stays visible for every question of that group, with a "Text 1 - questions 6-10" caption and a Listen button, so nobody has to navigate back to see it.
- On wide screens the text sits in a left column and the question in the right column; on mobile it becomes a collapsible card that is open by default.
- Sections are ordered Reading & Writing then Listening, and the answer grid shows small section dividers so the paper structure is clear.

## 4. Button / hover fix
The "Free" (and Timed) buttons blur on hover because the card animates `hover:shadow-lg transition-all` while the outline button sits on a translucent surface over blurred decorative blobs. Fix: give the outline button an opaque white background with a solid level-coloured border, an explicit hover state (light tint, no opacity change), and limit the card transition to `transition-shadow` plus a tiny lift instead of `transition-all`. Also remove the blur-inducing `animate-pulse` blobs from behind the cards.

## 5. Kid-friendly exam features
Added to the exam screen, all local and lightweight:

- Progress path: a row of stepping stones / footprints filling as questions are answered, with a mascot that moves along it.
- Answer feedback micro-animations: option card bounces and a sticker (star / rainbow) pops when tapped; small confetti burst every 5 answered questions.
- Encouragement bubbles: short bilingual cheers ("Giỏi lắm!" / "Great job!") after milestones, gentle and non-blocking.
- Sticker board on the result screen: earn 1-3 stars by score band, plus a badge for finishing a whole level.
- Optional sound toggle (chime on select, fanfare on submit) that remembers the choice in local storage, default on for Starters/Movers/Flyers and off for KET/PET.
- Softer, brighter exam palette per level (level colour on progress, header and answer grid) with large tap targets.

## Technical notes
- Files touched: `src/pages/CambridgeYleTestPrep.tsx`, `src/pages/CambridgeMockExam.tsx`, `src/data/cambridgeMockExamData.ts` (types + registry + reading groups), new `cambridgeMockExamExpansion4.ts` / `5.ts`, new `src/components/cambridge/ExamFunLayer.tsx` (progress path, stickers, cheers), new `src/data/cambridgeReadingTexts.ts` for shared texts.
- `CambridgeMockQuestion` gains optional `readingTextId`; a lookup keeps texts out of every question object.
- Existing progress keys (`cambridge-mock-best-*`, saved answers) stay unchanged.
- Answer-key balancing and bilingual explanations continue to run through `cambridgeMockExamNormalizer.ts`.

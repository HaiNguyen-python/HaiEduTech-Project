# Brain toolbar fit + Vocabulary Practice quality overhaul

## 1. "Find a word" box - no more horizontal scrolling

Today the toolbar keeps every control on one scrolling row with a fixed 128/176px search box pinned on the right, so on normal widths the button strip needs left/right scrolling.

Changes in the toolbar strip:
- Shrink the search field to an icon-only round button that expands into a small input when clicked (collapsed 32px, expanded 160px). No fixed width stealing space.
- Compact the button group: filters keep text, the rest (Labels, density, Pause, Replay, Reset view) become icon buttons with tooltips on desktop.
- On narrow screens the secondary controls collapse into one "View options" popover, so the row always fits and the scrollbar disappears.

## 2. Practice: fix questions where the answer is obvious

Confirmed leaks in the IELTS practice generator (`buildQuestions`):

- Collocation and "context" questions mask the target word with `_____` only in the correct option, so the option containing the blank is always right.
- Odd-one-out builds its prompt as target / same-topic / same-topic / odd, so the answer is always the last word listed, and the hint names the target's topic.
- Meaning / reverse / definition / listening / fill-in-blank distractors are drawn at random from all 1800 words, so they are usually from a different topic, word class or length and can be eliminated without knowing the word.
- The meaning card prints the word's own example sentence, which frequently paraphrases the correct definition (screenshot: "logistics ... timely delivery" -> "coordination of a complex operation").
- Fill-in-blank distractors ignore part of speech, so grammar alone reveals the answer.
- Unscramble shows the Vietnamese meaning as a hint while the options are the words themselves - two independent giveaways.
- IPA distractors come from random words with different syllable counts.

Fixes:
- Central distractor picker: prefer words with the same part of speech, then same topic, then similar CEFR/band level and similar length; fall back to random only if nothing matches.
- Mask the target word in every option of collocation/context questions (or mask none), so blanks are no longer a tell. Distractor collocations/examples get the same treatment.
- Shuffle the odd-one-out prompt list and drop the topic hint that points to the target.
- Hide the word's example on meaning questions until the answer is revealed; show it in the explanation instead.
- Fill-in-blank distractors must match the target's part of speech and fit the sentence slot.
- Unscramble: drop the multiple-choice options for this type and keep it as a typing question with the Vietnamese meaning as hint.
- IPA distractors: same syllable count and same first sound where possible.
- Post-answer feedback panel gains a short "why" line: definition, example and the reason wrong options do not fit.
- Add a build-time sanity guard that rejects a generated question when the correct option is the only one with a blank, the only long/short one, or a duplicate of a distractor - it regenerates with a different type instead.

Same generator patterns are also used on the HSK, Finnish, Swedish and Vietnamese vocabulary pages; the shared distractor/sanity helpers will live in one module so those pages get the fix too.

## 3. New question and exercise types

Added to the Practice tab (and the Focus dropdown):
- Word family: pick the correct derived form (analyse / analysis / analytical / analytically) inside a sentence.
- Collocation match: drag/tap to pair 4 verbs with 4 nouns in one screen.
- Two-word gap: a short paragraph with 3 blanks and a word bank, so learners choose in context.
- Synonym vs near-synonym: choose the better word for a given register (academic vs casual).
- Definition writing: type your own short definition, graded by keyword overlap with feedback.
- Speed round: 60-second rapid meaning-match with a combo streak counter.
- Spelling from audio with progressive letter reveal (existing dictation upgraded with a hint ladder).

Each new type logs through the existing scoring path so results still feed the memory brain, streak and leaderboards.

## Technical notes
- `src/components/vocab/VocabBrainPanel.tsx` - toolbar layout, collapsible search, view-options popover.
- `src/pages/IeltsVocabulary.tsx` - `buildQuestions`, question card rendering, Focus dropdown, new type renderers.
- New `src/lib/vocab/questionQuality.ts` - distractor selection, option masking, sanity guard; reused by HSK/Finnish/Swedish/Vietnamese vocabulary pages.
- No database changes.

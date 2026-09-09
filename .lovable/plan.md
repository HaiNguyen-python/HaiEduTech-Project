# Cambridge Speaking Practice: word help + pictures review

## What I checked

- 482 speaking cards (Starters 81, Movers 105, Flyers 93, KET 97, PET 106).
- The content check currently reports 0 problems: no repeated follow-up questions inside a topic, every card has at least 3 questions, 4 helper phrases and a sample answer.
- Pictures: 86 different pictures used on 184 cards, none reused more than 3 times.

## Problems found

1. **"Word bank for this question" is not actually per question.** The words are picked from the card's topic only, so every question inside the same topic (for example all "Food and meals" cards) shows the exact same 16 words. The label promises something the content does not do.
2. **Some topics get no real vocabulary at all.** The word list only knows about a fixed set of themes. Topics such as reading and books, weekend plans, feelings, art, and a few PET discussion themes match nothing and fall back to 9 generic filler words (like "big", "nice", "I think"), which is too thin for a full answer.
3. **Word banks are not graded by level.** A Starters child and a PET teenager on the same topic see the same word list; only the last few connector words differ.
4. **Helper phrases ("Useful words & sentence frames") repeat heavily across cards** and mix single words with sentence frames in one row, so students cannot see which ones are ready-made sentence openers.
5. **Pictures do not always belong to the card.** Several cards borrow a picture built for another level or another topic (for example a Movers card using a Starters park picture, a PET card using a KET jobs picture), so the picture and the question do not fully match.
6. **Only 184 of 482 cards show a picture**, while many describe-the-picture, spot-the-difference and tell-the-story tasks need one to be answerable.

## What I will do

**Word help**
- Make the word bank question-aware: words are chosen from the actual question text plus the topic, so different questions inside a topic get different, relevant words.
- Extend the vocabulary source to cover every topic in the bank (add the missing themes: books and reading, feelings, art and drawing, plans, and the remaining PET discussion themes), with a minimum of 12 usable words per card.
- Split word banks by level: concrete nouns and simple adjectives for Starters/Movers, collocations and opinion language for Flyers/KET/PET.
- Keep the tap-to-listen behaviour and the Vietnamese meaning under each word.

**Helper phrases**
- Separate the green box into two clear groups: single useful words, and sentence frames students can say as-is.
- Rewrite over-repeated frames so each card carries at least 2 frames that fit its own question, graded by level.

**Pictures**
- Rebuild the picture assignment so a card only receives a picture from its own level and topic; where none exists, generate a new one instead of borrowing.
- Extend picture coverage to every card whose task type needs a picture (describe the picture, spot the differences, tell the story).
- Visually check every picture again for the faults reported before (missing heads, broken panels, unreadable text) and redraw any that fail.

**Checks before I report back**
- Extend the content check to also verify word-bank size per card, level-appropriate frames, per-level picture matching and picture coverage by task type.
- Run the content check, the type check, and open the page on desktop and mobile to confirm every picture loads.

## Technical notes

- `src/data/cambridgeSpeakingWordBank.ts`: change `wordBankForTask(topic, level)` to accept the question/prompt too, add per-level pools and new topic buckets.
- `src/pages/CambridgeSpeakingPractice.tsx`: pass the active question into the word bank call; split the useful-language block into words vs frames (presentation only).
- `src/data/cambridgeSpeakingQuestionFix.ts`: add level-scoped frame pools; keep existing task ids and follow-up dedupe behaviour.
- `scripts/gen_cambridge_speaking_image_map.ts`: replace round-robin distribution with level+topic constrained assignment; regenerate `src/data/cambridgeSpeakingImageMap.ts`.
- New images go to `src/assets` and are registered in `src/data/cambridgeSpeakingImages.ts`.
- `scripts/audit_cambridge_speaking_content.ts`: add the new assertions above.
- Task ids, routes, progress keys, AI grading and backend stay unchanged.

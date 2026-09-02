# Chinese Pronunciation & Strokes: layout fix + content top-up

## 1. Fix the cramped left edge (layout)

In both sound tables the header cells use horizontal padding (`px-3`) while the body cells only pad on the right, so every first column (`b p m f`, stroke glyphs) sits flush against the card border and looks misaligned with the header.

Files: `src/pages/ChinesePronunciation.tsx` (SoundRow + table head), `src/pages/ChineseStrokeGuide.tsx` (basic-stroke table).

Changes:
- Give body cells the same horizontal padding as the header (`px-3`, first/last cell `pl-4`/`pr-4`) so columns line up.
- Add zebra striping and a subtle divider so long tables stay readable; keep the existing horizontal-scroll wrapper and `min-w` for mobile.
- Add column width hints (`w-[70px]` sound, `w-[110px]` stroke glyph) so the "Sound" column stops stretching.
- Group titles/notes get consistent spacing (`mb-2`) and sit on the same left gutter as the table content.
- Same padding treatment for the stroke-rule example cards and practice grids so cards share one gutter.

## 2. Review + top-up the pronunciation lessons

Current: 6 lessons (pinyin basics, initials, finals, tones, tone change, Vietnamese traps).

Add 3 lessons in `src/data/chinesePronunciation.ts` with the same bilingual shape (theory paragraphs, sound groups, teacher tip, quiz):
- **Pinyin spelling rules**: `ü` after j/q/x written as `u` (ju, qu, xu) vs `nü/lü`, `iou→iu`, `uei→ui`, `uen→un`, `y`/`w` at syllable start, apostrophe separator (`nü'er`).
- **Neutral tone & erhua**: unstressed syllables (妈妈, 谢谢, 了/的/吗), Beijing `-r` (这儿, 一点儿), when not to use it.
- **Rhythm & connected speech**: word stress in 2-syllable words, sentence intonation for questions, common learner-listening pitfalls.

Also review existing lessons: verify every example hanzi/pinyin/meaning triple, check quiz distractors are valid syllables, and raise each lesson to at least 10 quiz questions.

## 3. Review + top-up the stroke guide

In `src/data/chineseStrokes.ts`:
- Add a **combined-strokes** section (折/钩 family: 横折, 竖折, 横折钩, 竖弯钩, 撇折, 横撇) with names, how-to and examples - currently only the 8 basic strokes exist.
- Add 2 stroke-order rules often missed: 中间贯穿的竖最后写 (e.g. 中, 事) and 点在上先写、右下的点最后写 (e.g. 主, 犬).
- Add 2 practice sets: **HSK 2 characters** and **Family & people** (12 chars each) with verified stroke counts.
- Add a **common mistakes** panel (wrong direction on 撇/横, writing 口 counterclockwise, splitting 竖弯钩).
- Grow the quiz bank to ~20 questions covering the new rules and combined strokes.
- Re-verify every `strokes` count in existing data against standard counts.

## Technical notes
- Pure frontend/data work: no new dependencies, no database or edge-function changes.
- Stroke animations keep using the existing `HanziStrokeOrder` CDN lookup; new characters will be checked for CDN availability before shipping.
- Verify with a TypeScript check and a browser pass over `/chinese/pronunciation` and `/chinese/strokes` (column alignment, quiz flow, audio).

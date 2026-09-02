# Chinese: gaps in Stroke Order & Tones

## What is already there (verified)

Strokes (`/chinese/strokes`): 8 basic strokes, 6 combined strokes, 9 ordering rules, 5 common-mistake cards, 6 practice sets, 20 quiz questions, free character lookup with animated stroke order.

Tones: the `tones` and `tone-change` lessons in the pronunciation page (theory + sound tables + 10 quizzes each) and the Tone Drill Room with 3 modes (Identify, Minimal pair, Sandhi), 100 single-tone items, minimal pairs and sandhi cards, localStorage stats.

## Gaps found

1. Dead data: `TONE_PAIR_BANK` in `src/data/toneDrillBank.ts` is defined but never used anywhere - the two-syllable tone-combination drill (the hardest part for Vietnamese learners) is missing from the Drill Room.
2. No speaking feedback for tones: everything is listen-and-click. Learners never record themselves or get a "your tone contour vs target" check.
3. No tone-mark writing practice: rules for mark placement are taught (a > o > e > i/u/ü, iu/ui) but there is no exercise where the learner picks or types the correct marked pinyin.
4. No handwriting practice on the stroke page: characters can only be watched. The stroke library already supports trace/quiz mode, which is unused.
5. No radical (部首) lesson: the practice set is named "radicals" but there is no section explaining what radicals mean, how they hint at meaning, or the common 40-50 radicals with stroke order.
6. No printable 田字格 practice sheet for offline writing.
7. No progress/mastery tracking per character or per tone, so learners cannot see which tones or strokes they keep failing.

## Proposed work

### A. Tone Drill Room upgrade
- Add a 4th mode "Tone pairs / Kết hợp thanh" using the existing `TONE_PAIR_BANK`, expanded to cover the 20 common tone combinations (1-1 … 4-4 plus neutral), with audio, bilingual meaning and answer explanation.
- Add a "Say it" step: mic recording + Web Speech recognition on `zh-CN` to check whether the recognised syllable matches the target, plus the pitch contour drawn next to the target contour. Recording stays local, nothing uploaded.
- Add per-tone accuracy stats (tone 1/2/3/4/neutral) stored in localStorage, with a weakness banner ("Thanh 3 của bạn còn yếu") and a "drill my weak tones" button.

### B. Tone-mark placement exercise
- New drill inside the pronunciation lesson `tones`: given a syllable + tone number, pick the correctly marked pinyin (e.g. liù not lìu, huì not hùi), ~20 items with explanations.

### C. Stroke page upgrade
- Add a "Viết thử / Write it yourself" panel: the stroke library's quiz mode so learners trace the character with mouse or finger, with hint on mistake, success animation and a per-character mastery mark saved to localStorage.
- Add a Radicals section: ~40 common radicals with glyph, name, meaning (VI/EN), stroke count, animated stroke order and 2 example characters, plus 8 new quiz questions on radical meaning.
- Add a printable practice sheet: pick characters from a practice set, generate a 田字格 grid page with faded guide characters, print via browser.

### D. Cross-links
- Chinese overview and both pages get links to the new tone-pair mode and the write-it-yourself panel so learners find them.

## Technical notes

- Data: extend `src/data/toneDrillBank.ts` (tone pairs), add `src/data/chineseRadicals.ts`, add a tone-mark item list to `src/data/chinesePronunciation.ts`.
- UI: extend `src/pages/ToneDrillRoom.tsx` (new mode + mic + stats), `src/pages/ChineseStrokeGuide.tsx` (radicals, trace panel, print sheet), `src/pages/ChinesePronunciation.tsx` (tone-mark drill).
- New components: `src/components/chinese/HanziTracePanel.tsx` (HanziWriter quiz mode), `src/components/chinese/PracticeSheet.tsx` (print grid), `src/components/chinese/ToneRecorder.tsx` (mic + contour compare).
- All progress in localStorage (guest-friendly), bilingual VI/EN through `useLanguage`, semantic design tokens only, hyphens instead of em-dashes.
- Verify with a TypeScript check and a browser pass on `/chinese/tone-drill`, `/chinese/strokes`, `/chinese/pronunciation`.

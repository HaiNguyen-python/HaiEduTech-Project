# Word Quest button + a stronger Daily Mission

## 1. Word Quest: replace "Practice this word"

On the study card, the green button becomes a simple **Next** (Tiếp tục / Next) with the arrow, so the learner moves straight into the next practice step without extra wording. Same behaviour, shorter label, and the "5 exercises" wording stays only in the help text at the top of Word Quest.

## 2. Daily Mission: from 4 simple questions to a real daily trainer

Today a mission picks due + new words and asks one random question per word (meaning choice, listen-and-type, sentence gap, self-recall), then asks the learner to self-rate. Planned upgrades:

**More exercise variety (per word, chosen adaptively)**
- Meaning choice (keep) and reverse choice: meaning shown, pick the word.
- Listen and type (keep) plus **Say it back**: microphone repetition with an accuracy score, same engine as Word Quest.
- Sentence gap (keep) and **word building**: letters/characters scrambled back into the word.
- Collocation / usage choice: which sentence uses the word correctly.
- New words get gentler formats first; weak words get harder recall formats.

**Smarter scheduling and feedback**
- Automatic grading from the answer (right/wrong) with the Forgot/Hard/Easy rating kept as a quick adjustment, defaulting to the detected result.
- Words missed twice in a session are flagged as "sticky" and shown first in the next mission.
- End screen lists the words missed with a one-tap "review these now" round.

**Motivation**
- 14-day activity strip showing which days the mission was done, plus best streak.
- Daily goal met / not met indicator and session accuracy percentage.
- Mission stats feed the existing mastery counter as they do now.

**Fixes found while reviewing**
- Progress counter and end-of-session detection are computed from the live queue, so re-queued words no longer end the mission early or show a wrong x/y.
- Audio always stops when moving between questions.
- Empty-bank and zero-due cases show a clear bilingual message instead of a dead Start button.

All of this stays local to the device (guest friendly), keeps the per-subject review keys, and applies to every vocabulary subject that already uses Daily Mission (IELTS/English, Chinese, Japanese, Finnish, Swedish, Vietnamese, TOEIC/SAT/PTE where present).

## Technical notes
- `src/components/vocab/WordQuest.tsx`: study-phase CTA label only.
- `src/components/vocab/DailyWordMission.tsx`: new question builders (`reverse`, `speak`, `build`, `usage`), queue-driven index/progress, missed-words round, activity strip.
- `src/lib/vocab/srsEngine.ts`: add sticky/lapse counters and a small day-history array, written under the existing namespaced keys with backward-compatible defaults.
- Reuse `pickSmartDistractors` / `maskWord` from `questionQuality.ts` and the existing `useSpeechRecognizer` for Say it back.
- Verify with `bunx tsgo --noEmit` and desktop/mobile runs on IELTS, HSK and Japanese vocabulary.

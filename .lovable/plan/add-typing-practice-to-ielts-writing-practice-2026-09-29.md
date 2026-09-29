# Add Typing Practice to IELTS Writing Practice

## What students get
A new "Typing Practice" tab after Cohesion Lab, with the same Task 1 / Task 2 switch as the other tabs.

- Pick a Task (1 or 2), a category and a level (B2, C1, C2).
  - Task 1: overview, describing trends, comparisons, figures and proportions, process, map.
  - Task 2: introduction, thesis, arguments, concession and rebuttal, examples, conclusion.
- One model sentence at a time, with its Vietnamese meaning and the key structure highlighted.
- Students type the sentence into the box. Correct letters turn green, mistakes red, and a cursor shows the current position.
- Live speed (WPM), accuracy % and a timer. The timer starts on the first key press.
- A result card for each sentence (WPM, accuracy, mistyped words). Buttons for Next, Retry and Random. Modes: "Single sentence" or "Sprint 60s" (as many sentences as you can in one minute).
- Personal best WPM and average accuracy are saved in the browser, with a small progress summary for each Task.
- Copy and paste are blocked in the typing box, so students have to really type.

## Content
A new bank of about 240 original sentences: 120 for Task 1 and 120 for Task 2, spread across the categories and B2/C1/C2. They are written in academic IELTS style, with no em-dashes, and each has its Vietnamese meaning and the target structure.

## Checks
- An audit script checks for: duplicate ids or sentences, empty fields, the target structure missing from its sentence, em-dashes, fewer than 10 sentences per category, and invalid levels. It must report 0 issues.
- Typecheck, plus a browser check: open the tab, type a sentence and see WPM and accuracy update.

## Technical notes
- New: `src/data/ieltsTypingBank.ts`, `src/components/ielts/TypingPractice.tsx`, `scripts/audit_ielts_typing_bank.ts`.
- Edit: `src/pages/IeltsWritingPractice.tsx` (new `typing` TabsTrigger/TabsContent, Keyboard icon, passes the existing task type).
- localStorage `ielts-typing-progress`; logs `ielts_typing` through the existing activity logger. No backend or database changes, no AI calls.

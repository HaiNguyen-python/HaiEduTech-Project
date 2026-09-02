# Teleprompter Pacing + More Scenarios + Custom Script

## 1. Teleprompter starts too fast

Right now the auto-scroll begins on the same frame as Start Recording, and the default speed (38 px/s) is too quick for the first lines.

Changes in `src/pages/PresentationStudio.tsx`:
- Add a 3-second countdown lead-in after Start Recording: the teleprompter stays frozen at the top and shows a large "3 - 2 - 1 - Speak" overlay plus a bilingual hint ("Bắt đầu nói" / "Start speaking"), then scrolling begins.
- Add a further short "grace" hold (about 2s) at the top so the first sentence can be read fully before movement starts.
- Lower the default speed from 38 to 22 px/s, widen the slider range to 6-90 px/s with step 1, and label the recommended zone (18-30 px/s).
- Add a pause/resume teleprompter button next to Rewind, so the script can be stopped mid-run without stopping the recording.
- Add ease-in: ramp from 0 to the target speed over the first 1.5s instead of jumping to full speed.
- The countdown delay is skipped when the teleprompter is manually resumed.

## 2. More presentation scenarios

Add 10 new scenarios to `PRESENTATION_SCENARIOS` in `src/lib/presentationStudio.ts`, each with English + Vietnamese label, audience, mode support, prompt, a full 200-300 word script, and 2 Q&A seed questions:
- Job Interview: "Tell me about yourself"
- Scholarship / Visa Interview
- TED-style Idea Talk
- Product Demo / Sales Presentation
- Classroom Teaching Demo (teacher training)
- Team Stand-up & Sprint Review
- Wedding / Celebration Toast
- Debate Opening Statement
- Science Fair / Research Poster Pitch
- Crisis Communication Update

Scenario picker in the left column becomes grouped/scrollable so the longer list stays usable.

## 3. Custom external script

New card under "Presentation scenarios" in the left column:
- Textarea "Paste your own script" (bilingual label), word count and estimated speaking time at 140 WPM.
- "Use this script" button switches the studio to a virtual scenario `custom-script` that feeds the teleprompter, the stress-word highlighting, and the AI report exactly like a built-in scenario.
- Optional one-line "Audience / context" input so the AI report can tailor feedback.
- Saved to localStorage (`presentation-custom-script`) so it survives reload; "Clear" button returns to the selected built-in scenario.
- The AI report edge function payload carries the custom script and context - no backend change needed.

## Technical notes

- Files touched: `src/lib/presentationStudio.ts` (scenario bank + custom-scenario helper), `src/pages/PresentationStudio.tsx` (countdown, ease-in, pause, custom script card).
- No database or edge-function changes.

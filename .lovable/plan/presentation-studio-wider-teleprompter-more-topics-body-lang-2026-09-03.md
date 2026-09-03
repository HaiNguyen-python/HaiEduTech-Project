# Presentation Studio: wider teleprompter, more topics, body language

## 1. Wider teleprompter

The stage column is currently 2 of 4 columns, so the script box is narrow.

- Move the teleprompter out of the middle column into a full-width row directly under the stage, so it spans the whole page width on desktop.
- Taller reading box (about 300px instead of ~160px), larger text with a font-size control (S / M / L / XL), and a max reading width so lines stay comfortable.
- Add a "Focus mode" button: teleprompter goes fullscreen over the page (camera shrinks into a small corner PiP) for distraction-free reading. Escape exits.
- Keep the existing countdown, ease-in, pause/resume/rewind and speed slider.

## 2. More presentation topics

Add 12 more scenarios to `PRESENTATION_SCENARIOS` (currently 15), each with EN/VI label, audience, prompt, a full 200-300 word script and 2 Q&A seeds:

- University Class Presentation (group project)
- Conference Q&A Panel Answer
- Investor Follow-up / Fundraising Update
- Project Kick-off Briefing
- Training Workshop Opening
- Customer Success Story / Case Study
- Data & Report Walkthrough (chart commentary)
- Motivational / Graduation Speech
- Podcast or Media Interview
- Non-profit Fundraising Appeal
- Technical Architecture Review
- Elevator Pitch (60 seconds)

Scenario picker becomes a grouped, searchable dropdown (Academic / Business / Exam & Interview / Social & Inspiration / Custom) so the longer list stays usable.

## 3. Body language analysis

Reuse the existing local body-language scoring already built for IELTS Speaking (`src/lib/speakingBodyLanguage.ts`) - eye contact, framing, movement, expression, confidence, naturalness - and wire it into the studio:

- New "Body language" telemetry card in the right column with live confidence and naturalness meters, plus posture/framing hints while speaking.
- Samples every 500ms from the existing webcam canvas; nothing is uploaded or stored.
- Report modal gains a Body language section: 4 score bars, a confidence-over-time line, and the 2-3 bilingual coaching tips.
- Body-language summary is sent to the `analyze-presentation` function so the AI report can comment on delivery, not just words.

## 4. Rounding out the module

- Voice telemetry: volume/energy meter and a pause-quality reading (long silences vs. good rhetorical pauses) from the existing AnalyserNode.
- Session history: last 10 sessions saved locally with score, WPM, fillers and confidence, plus a small progress chart so improvement is visible.
- Structure checklist per scenario (hook / problem / evidence / call to action) that ticks off as the matching signposts appear in the transcript.
- Export: download the report as PDF and the transcript as text.
- Rehearsal timer targets: warn when going over the target duration, with a colour-coded remaining-time ring.

## Technical notes

- Files: `src/pages/PresentationStudio.tsx` (layout, focus mode, new cards, history), `src/lib/presentationStudio.ts` (12 scenarios + grouping), `src/lib/speakingBodyLanguage.ts` (reused as-is), small new components for the body-language card and history chart, `supabase/functions/analyze-presentation/index.ts` (accept body-language + pause fields in the prompt).
- No database changes; history stays in localStorage.

# Fix the Business / Academic English lesson screens

## 1. Titles disappearing on hover (roadmap list)

The stage headers and lesson rows on the roadmap are built as "ghost" buttons. That style forces the text colour to white on hover, so on the light card the stage title, description and lesson text all vanish. This is the cause of the blank titles.

Fix:
- Stop the hover from repainting the text: keep the text in the normal reading colour and use only a soft tinted background plus a coloured left edge as the hover cue.
- Give the stage header its own row layout (badge + stage number, title, description, skill chips, progress) with clear spacing instead of one dense block, so it reads as a card header, not a giant button.
- Lesson rows: number circle, title, one-line outcome, small meta line, arrow on the right, with a calm hover tint and a visible focus ring for keyboard users.
- Remove the sideways card shift on hover (it makes the timeline jitter) and replace it with a subtle shadow/tint.

## 2. Conversation screen (currently "Listen")

- Rename the tab and every related label/button from "Listen" to "Conversation" (Vietnamese: "Hội thoại"). The internal tab id stays the same so saved progress and links keep working.
- Redesign the dialogue as a proper chat: speaker avatar with initials, speaker name above the bubble, rounded bubbles with a small tail, learner lines aligned right in the brand tint, partner lines left on a light surface, tighter vertical rhythm and a per-line play button that only appears on hover/focus.
- Put the audio player in a compact sticky bar at the top of each dialogue card (play, restart, progress, speed) so it stays reachable while reading.
- Replace the generic "Speaker" name with the real conversation partner name where the data has one, and a friendly consistent fallback where it does not.
- Tone down the in-line keyword highlighting so sentences stay readable (subtle emphasis instead of coloured words everywhere).
- Add a short "who is talking / what to listen for" line above each dialogue.

## 3. Full review of both tracks

- Check every step of a Core lesson (Understand, Phrases, Model, Guided, Check) and every Lab tab (Learn, Conversation, Speak, Challenge) for spacing, contrast, overflow and mobile width.
- Sweep both components for any other place where hover or active state wipes out text.
- Re-run the existing Core and Lab content audits, plus the TypeScript check.
- Verify on desktop and mobile widths for both `/english/business` and `/english/academic`: no sideways scrolling, titles readable in normal and hover state, answers still only revealed after choosing, audio stops when leaving a lesson.

## Technical notes

- Files: `src/components/PurposeCoreLearningPath.tsx`, `src/components/PurposeCommunicationLab.tsx`; small shared helpers if needed.
- Root cause of the white titles: shadcn `ghost` button variant applies `hover:text-accent-foreground`, and `--accent-foreground` is `0 0% 100%` in `src/index.css`. Replace the ghost buttons in these two components with non-button clickable containers (or explicit `hover:text-foreground`) rather than editing the global token, so the rest of the app is unaffected.
- Keep all lesson IDs, routes, tab values and progress keys (`haiedu-business-english-v1`, `haiedu-academic-english-v1`, `conv-eng-progress`) unchanged. No backend or menu changes.
- Only semantic tokens for colour; no hard-coded colours.
- Remove the dead `sr-only` speaker index span while reworking the dialogue markup.
- Verification: `scripts/audit_purpose_english_core.ts`, `scripts/audit_purpose_english_lab.ts`, `bunx tsgo --noEmit -p tsconfig.app.json`, then Playwright checks at 1280px and 390px.

# Conversation polish: character faces, consistent bolding, tidier speaking helpers

## 1. Small character picture on every conversation line

Right now each line shows a grey circle with two letters ("CL", "LU"). Replace it with a small chibi character picture so the dialogue looks like two real people talking.

- One consistent character per speaker inside a lesson: the learner side always gets one chibi, the partner side another, chosen from the existing chibi art by a stable rule based on the speaker name, so the same person keeps the same face through the whole conversation and on every revisit.
- Small round frame (32-36px), tinted ring matching the side (learner tinted, partner neutral), name label stays above the bubble.
- Keeps working on mobile: picture shrinks, bubbles keep their current width behaviour.

## 2. Consistent bold key phrases (B1 and above)

Bold marking today comes from one fixed phrase bank written for the Interactive Curriculum dialogues, so many Business and Academic lab conversations end up with nothing bold at all.

- Expand the phrase bank with the B1+ functional language actually used in these two tracks: adding to a discussion, agreeing/disagreeing politely, hedging, asking for evidence, citing sources, seminar turn-taking, clarifying, summarising, chairing meetings, negotiating, reporting data, softening requests.
- Guarantee coverage: for any conversation where nothing from the bank matches, fall back to the lesson's own target phrases and useful-language items so every dialogue has visible bold chunks.
- Make emphasis calm and uniform: bold key chunks, keep the underline for lesson vocabulary, no clashing colours - so it reads the same in every lesson.
- Add a check that runs over all 43 lab lessons and reports any conversation with zero bold chunks, then fix the content or bank until the count is zero.

## 3. Handy Structures / Suggested Vocab, easier to use

The two panels above the speaking chat are a dense wall of chips.

- Group the chips into short labelled rows (for example Opening, Opinion, Agree / Disagree, Ask for detail, Close) instead of one long wrap.
- Fewer chips visible by default with a "Show more" toggle, so the panel no longer pushes the chat down.
- Each chip becomes tappable: tap to hear it, and tap-and-hold / second control to copy it into the message box for practice.
- Make both panels collapsible with one header row each, visible on mobile too (currently desktop only), and keep the same colour language as the rest of the lesson.

## Technical notes

- Files: `src/components/PurposeCommunicationLab.tsx` (avatar art + bubble markup), `src/lib/dialogueKeyPhrases.ts` (expanded B1+ bank), `src/lib/highlightKeywords.ts` (fallback terms, uniform styling), `src/components/ConversationalRoleplay.tsx` (`TopHelperPanel` restructure + `getHelperSets` grouping), plus a new `scripts/audit_dialogue_emphasis.ts`.
- Deterministic avatar pick: hash of `lessonId + speakerName` into the existing chibi asset list; no new image generation.
- Only semantic tokens for colour; no hard-coded colours.
- Keep lesson IDs, routes, tab values and progress keys unchanged; no backend, data-schema or menu changes.
- Verification: `scripts/audit_purpose_english_lab.ts`, the new emphasis audit, `bunx tsgo --noEmit -p tsconfig.app.json`, then Playwright checks at 1280px and 390px on `/english/business` and `/english/academic` Lab tabs and on a Speaking lesson.

---
name: Communication Lab conversation style
description: Chibi speaker avatars on every dialogue line, guaranteed B1+ bold key phrases, grouped collapsible speaking helper panel
type: feature
---
- Business/Academic Communication Lab conversations show a small chibi picture per speaker, chosen deterministically from `lesson.id + speaker name` (`src/lib/dialogueAvatars.ts`). Learner side and partner side use different face sets.
- Bold emphasis comes from `DIALOGUE_KEY_PHRASES` (B1+ functional chunks) via `resolveDialogueKeyPhrases`, which falls back to the lesson's own vocabulary terms when the bank matches fewer than 2 phrases. Lesson vocabulary stays underlined.
- `scripts/audit_dialogue_emphasis.ts` must report 0 issues: every lab conversation needs at least one bold chunk.
- Speaking helper (Handy structures / Suggested vocab) in `ConversationalRoleplay.tsx` is one collapsible panel, structures grouped by function (opinion, reasons, agree/disagree, ask & clarify, meetings), 4 chips per group + 10 vocab chips with Show more; chip tap inserts into the reply box, speaker icon reads it aloud. Visible on mobile too.

# Conversations: remove tip boxes, make key language stand out

## 1. Remove "Tips for this situation"

The tip box only appears in Conversational English lessons (each situation card gets 3 auto-generated tips from keyword rules, so many lessons repeat the same tips). Business English and Academic English lessons have no tip box.

- Remove the tip box from the Conversational English lesson view.
- Delete the tip generator file, since nothing else uses it.
- Nothing else on the card changes: title, description, dialogue, audio, vocabulary and quizzes stay exactly as they are.

## 2. Highlight key phrases and important vocabulary

Both lesson types already mark up dialogue lines, but differently: Business/Academic picks only the phrases that actually appear in that dialogue, while Conversational English tries the whole phrase bank, which over-marks lines.

Changes:
- Use the same "only phrases present in this dialogue" logic in Conversational English, so highlighting is precise instead of noisy.
- One consistent visual language everywhere: lesson vocabulary underlined in amber, functional key phrases in bold on a light brand tint.
- Add a small legend above each dialogue ("underline = vocabulary, bold = key phrase", bilingual) so learners know what the marks mean.
- Under each dialogue, add a compact "Key phrases in this conversation" list gathered from that dialogue, with a listen button per phrase, in both Conversational English and Business/Academic lessons.
- Bump contrast slightly so the marks stay readable on mobile and in dark mode.

## Technical notes

- `src/pages/ConversationalLessonView.tsx`: delete the `getSituationTips` block and import; switch `highlightKeywords` to `resolveDialogueKeyPhrases(lines, vocabTerms)`; add legend + key-phrase list.
- `src/components/PurposeCommunicationLab.tsx`: add the same legend + key-phrase list under each dialogue section.
- `src/lib/highlightKeywords.ts`: tune the two token styles only.
- Delete `src/lib/situationTips.ts`.
- No route, lesson id, data-file, progress or backend change. Verify with a TypeScript check and desktop/mobile browser passes on a Conversational English lesson plus a Business and an Academic lesson.

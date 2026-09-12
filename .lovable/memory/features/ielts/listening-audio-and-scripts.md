---
name: IELTS Listening scripts & AI voices
description: All 120 listening recordings are authored in src/data/ieltsListeningTranscripts.ts and read by cached AI voices via the listening-tts function
type: feature
---
- Source of truth for recordings: `src/data/ieltsListeningTranscripts.ts` (setId -> script, one speaker turn per line). `ieltsListeningDifficultyUpgrade.ts` only normalises questions, word limits and rate; its old generated transcripts are a fallback that must never be used for the 120 shipped sets.
- Quality rules: nothing in the audio announces an answer, distractors sound plausible, British English, natural corrections/hesitation. Lengths S1 ~625-813, S2 ~777-1013, S3 ~869-1080, S4 ~817-1086 words.
- Audio: edge function `listening-tts` (verify_jwt false) generates `openai/gpt-4o-mini-tts` mp3 per line and caches them in the private `listening-audio` bucket, returning 6h signed URLs. Voice per speaker comes from `src/lib/ieltsListeningVoices.ts`; browser speechSynthesis stays as fallback (badge "Giọng AI / Device voice").
- Validation: `node scripts/validate-listening.mjs` must report "no issues" (structure, keys supported by the script, leak phrases, matching balance, Section 4 allows fewer/longer turns).

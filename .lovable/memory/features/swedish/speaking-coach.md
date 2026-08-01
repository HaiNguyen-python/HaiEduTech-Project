---
name: Swedish Speaking Coach
description: Swedish AI Speaking Coach - 60 themes / 600 sentences A1-C1, sentence-level IPA and sound coaching tips
type: feature
---
Swedish Speaking Coach scope:
- 60 themes / 600 sentences: A1 160, A2 160, B1 130, B2 120, C1 30. Data files: speakingCoachSwedishExpansion 1-6.
- Every theme has exactly 10 sentences and a `level` (A1/A2/B1/B2/C1). CEFR filter chip in the UI covers All/A1/A2/B1/B2/C1.
- IPA: `src/lib/swedishSentenceIpa.ts` (`transcribeSwedishSentence`) tokenises the sentence, applies a curated high-frequency word dictionary, and falls back to `generateSwedishIpa` per word. Never render raw word-level regex IPA on full sentences.
- `swedishSoundTipsFor()` shows up to 2 pronunciation tips per sentence (sj-ljudet, tj-ljudet, u/y vowels, retroflex, pitch accent) in the coach card.
- IDs must be globally unique across all expansion files. Audit with `npx tsx scripts/audit_swedish_speaking.mjs` - it checks duplicate theme/sentence IDs, duplicate theme names, min 10 sentences, translations and IPA coverage. Must report "OK - no problems found."

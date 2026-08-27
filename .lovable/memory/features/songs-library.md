---
name: Learn through Songs library
description: language_songs data rules - live YouTube links, no duplicate titles, blanks must point at a line containing the answer
type: feature
---

# Learn through Songs (`/songs/:lang`)

Data lives in the `language_songs` table (EN/ZH/FI/VI), rendered by `src/components/songs/SongLibrary.tsx`.

Rules verified by audit (Aug 2026):
- Every `youtube_id` must be live AND be the correct song in the correct language. Verify with YouTube oEmbed (`/oembed?url=...`): empty response = deleted/private; compare returned title with the song title to catch wrong-video links.
- No duplicate songs per language (base title before " (").
- `blanks_quiz[].lineIndex` must point at a lyric line that actually contains the answer; `wordIndex` = index of the whitespace token containing the answer. For Chinese, the answer sits inside a token - the quiz component splits the token and shows the surrounding characters around the input.
- Chinese lyric lines always include pinyin in parentheses after the hanzi.
- Every lyric line needs a `translation`; every `core_vocab` entry needs `meaning` + `example` (plus pinyin for Chinese).
- The player always shows an "Open on YouTube" fallback link below the iframe in case a video blocks embedding.

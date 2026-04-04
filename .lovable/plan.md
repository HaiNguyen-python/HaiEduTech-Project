

## Plan: Eliminate Duplicate Images in Finnish Vocabulary Cards

### Problem
Many photo IDs in `VOCAB_IMAGES` (lines 221–505) are reused across multiple words, causing identical images on different vocabulary cards. For example:
- `photo-1529156069898` → used by `kutsua`, `ihminen`, `hei`, `kansalainen`, `serkku`, `näkemiin`, `sinä`, `kuka` (8 words!)
- `photo-1573497019418` → used by `puhua`, `jutella`, `pyytää`, `että`, `koska` (5 words)
- `photo-1557804506` → used by `mielipide`, `mikä`, `mutta`, `tai`, `jos` (5 words)
- `photo-1501139083538` → used by `odottaa`, `nyt`, `sitten`, `kun` (4 words)
- `photo-1506784983877` → used by `tulla`, `ajanvaraus`, `varata`, `olla` (4 words)
- Plus ~40 more duplicate groups

### Solution
Replace all duplicate photo IDs with unique Unsplash alternatives. For each duplicate group, keep the first/most fitting word and swap all others to new, contextually relevant photos.

### Technical approach
1. Scan all entries in `VOCAB_IMAGES` to identify every photo ID used more than once
2. For each duplicate group, keep the first occurrence and replace all subsequent uses with unique Unsplash photo IDs chosen for semantic relevance to each word
3. Verify zero photo ID appears more than once in the final object

### Estimated scope
~120 entries need new unique photo IDs across pronouns, function words, emotions, verbs, services, health, emergency, family, and abstract concepts.

### File to modify
- `src/pages/YkiDashboard.tsx` — replace duplicate photo IDs in `VOCAB_IMAGES` (lines 221–505)

### What stays the same
- `extractBaseWord`, `getVocabImageUrl`, `getWordIllustration`, `WORD_ILLUSTRATIONS`, `CATEGORY_IMAGES` — all unchanged
- No structural or component changes


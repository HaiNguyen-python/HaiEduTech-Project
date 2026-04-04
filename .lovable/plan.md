

## Plan: Eliminate Duplicate Images in Finnish Vocabulary Cards

### Problem
There are **50+ duplicate Unsplash photo IDs** shared across different words in `VOCAB_IMAGES`. For example, one photo (`photo-1529156069898`) is used for 9 different words (kutsua, ihminen, hei, kansalainen, serkku, näkemiin, sinä, te, kuka). This causes many vocabulary cards to display identical images.

### Solution
Replace all duplicate photo IDs with unique Unsplash photos so that **every word gets a visually distinct image**. Each word will keep the first occurrence of a photo ID, and all subsequent uses of the same photo will be swapped to a new, contextually relevant Unsplash image.

### Scope of changes
Approximately **120 duplicate entries** need new unique photo IDs across these categories:

| Category | Duplicates to fix |
|----------|------------------|
| Pronouns & function words (sinä, te, kuka, me, ja, he...) | ~15 |
| Emotions & social (kiitos, mielipide, mutta, tai, jos...) | ~12 |
| Verbs (puhua, pyytää, että, koska, tulla, varata...) | ~15 |
| Work & services (vakuutus, valitus, lasku, lomake...) | ~12 |
| Health & body (yskä, nuha, polvi, vatsa...) | ~8 |
| Emergency (onnettomuus, loukkaantua, verenvuoto...) | ~6 |
| Time & abstract (nyt, sitten, kun, odottaa...) | ~8 |
| Family (lapsi, poika, sisarus, he...) | ~6 |
| All other categories | ~38 |

### Technical approach
1. For each duplicate group, keep the **first/most fitting** word-photo pairing
2. Replace all other entries with new, semantically appropriate Unsplash photo IDs
3. Ensure zero photo ID appears more than once across the entire `VOCAB_IMAGES` object

### File to modify
- `src/pages/YkiDashboard.tsx` — replace ~120 duplicate photo IDs in `VOCAB_IMAGES` with unique alternatives

### What stays the same
- The `extractBaseWord` logic, `getVocabImageUrl` fallback chain, `WORD_ILLUSTRATIONS`, and `CATEGORY_IMAGES` all remain unchanged
- No structural changes to the VocabCard component


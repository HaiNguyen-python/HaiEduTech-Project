

## Plan: Fix Finnish Vocabulary Cards Showing Same Image

### Problem
When a vocabulary word contains compound forms like "minä → mä/mää", the image lookup in `getVocabImageUrl` searches for the full string "minä → mä/mää" in `VOCAB_IMAGES`, which has no match. All words in the same category (e.g. "Puhekieli") then fall back to the **same single category image** — resulting in identical photos on every card.

### Solution
Improve `getVocabImageUrl` to extract the **base word** before looking up the image. For example:
- "minä → mä/mää" → try "minä" first
- "me menemme → me mennään" → try "me menemme", then "menemme"
- "ei ole → ei oo" → try "ei ole", then "ole"

This way, existing entries in `VOCAB_IMAGES` (which already has `minä`, `mennä`, etc.) will be matched correctly instead of falling back to a generic category photo.

### Changes

**File: `src/pages/YkiDashboard.tsx`**

1. **Update `getVocabImageUrl`** — add logic to:
   - Strip the arrow part: `word.split("→")[0].trim()` to get the base form
   - Try the base form as a lookup key
   - If multi-word (e.g. "me menemme"), also try the last word alone
   - Keep existing fallback chain: exact word → base word → last word → category → null (gradient+emoji)

2. **Update `getWordIllustration`** with the same base-word extraction so emoji fallbacks also vary per word instead of all showing "📝"

### Example
```
"minä → mä/mää" 
  → try "minä → mä/mää" (miss)
  → try "minä" (miss in VOCAB_IMAGES... but wait, there's no "minä" either)
```

Since pronouns like "minä", "sinä" aren't in VOCAB_IMAGES, we also need to **add specific image entries** for common pronouns and verb phrases that appear in the Puhekieli module. These include:
- minä, sinä, hän, tämä, tuo — mapped to distinct people/gesture photos
- mennä (already exists), olla (missing) — add if missing

3. **Add missing VOCAB_IMAGES entries** for Puhekieli base words:
   - `minä` → person/portrait photo
   - `sinä` → people interacting photo  
   - `hän` → single person photo
   - `tämä` → pointing gesture photo
   - `tuo` → different pointing/showing photo
   - `nyt` → clock/urgency photo
   - `sitten` → timeline/sequence photo
   - `että` → speech/conversation photo

This ensures every card in the Puhekieli lesson gets a **unique, relevant image** instead of all sharing the same fallback.

### Files to modify
- `src/pages/YkiDashboard.tsx` — update `getVocabImageUrl`, `getWordIllustration`, and add missing `VOCAB_IMAGES` entries


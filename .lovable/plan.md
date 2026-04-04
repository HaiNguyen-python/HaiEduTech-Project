

## Plan: Fix Text Clipping in IELTS Vocabulary Cards

### Problem
The previous fix added `overflow-hidden` to the card container (line 403), which clips long text instead of wrapping it. Synonyms/collocations get cut off (e.g., "proficiency • co..." in the "literacy" card).

### Fix
In `src/pages/IeltsVocabulary.tsx`:

1. **Line 403**: Remove `overflow-hidden` from the card's `motion.div` — the card should expand to fit content, not clip it
2. **Line 446**: Remove `overflow-hidden` from the mint sub-container — same reason; `break-words` and `overflowWrap` already handle wrapping
3. Keep all the `break-words` and `overflowWrap: "break-word"` styles on text elements — those are correct and handle long word wrapping

### File to modify
- `src/pages/IeltsVocabulary.tsx` — remove `overflow-hidden` from card container (line 403) and mint sub-container (line 446)


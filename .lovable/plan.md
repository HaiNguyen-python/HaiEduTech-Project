

## Plan: Fix Text Overflow in IELTS Vocabulary Cards

### Problem
In the list view, long text (synonyms, collocations, definitions) overflows outside card boundaries, creating a messy layout.

### Fix
Add `overflow-hidden` and `break-words` to the card container and inner text elements in `src/pages/IeltsVocabulary.tsx` (lines 396–479):

1. **Card container** (line 403): Add `overflow-hidden` class to prevent any content from escaping
2. **Synonyms/Collocations text** (lines 450, 464): Add `break-words` and `overflow-wrap: break-word` to wrap long compound words
3. **Definition text** (lines 438-439): Add `break-words` class for safety
4. **Example sentence** (line 442): Add `break-words` class
5. **Mint sub-container** (line 446): Add `overflow-hidden` and `min-w-0` to constrain flex children

### File to modify
- `src/pages/IeltsVocabulary.tsx` — add overflow/word-break CSS to card elements in list view


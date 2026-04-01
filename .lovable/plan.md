

# Plan: Visual Vocab Cards + Toggle Mastered

## Changes

### 1. Enhanced Visual Illustrations for Vocab Cards (`src/pages/YkiDashboard.tsx`)

**Current**: Small 48x48 emoji box in corner of each card.

**New**: Full-width visual header section at top of each card featuring:
- Large gradient banner (category-specific colors: blue for work, green for nature, red for health, etc.)
- Oversized emoji (3rem+) centered in the banner
- Category label overlay on the banner
- This creates a visually rich, magazine-style card layout

Category-to-gradient mapping:
- Work → blue gradient
- Food → warm orange/red gradient  
- Health → green/teal gradient
- Nature → emerald/sky gradient
- Transport → indigo gradient
- Education → purple gradient
- etc.

### 2. Toggle "Mark as Mastered" / "Unmark" (`src/pages/YkiDashboard.tsx`)

**Current**: `handleMasterWord` has `if (masteredWords.includes(word)) return;` — prevents unmastering.

**Fix**: Remove the early return. Toggle logic:
- If word is mastered → remove from array, show "Unmarked" toast
- If word is not mastered → add to array, show motivational toast + confetti star

Update button text: `"Mastered! ✓"` → clicking again shows `"Unmarked"` toast and reverts to `"Mark as Mastered"`.

### Files Modified

| File | Change |
|------|--------|
| `src/pages/YkiDashboard.tsx` | Redesign VocabCard visual header with category gradients + large emoji; fix toggle mastered logic |


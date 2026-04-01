

# Plan: Real Illustrative Images for Finnish Vocabulary Cards

## Problem
The current `getVocabImageUrl` uses `https://source.unsplash.com/400x300/?keyword` which is **deprecated** and returns generic placeholder icons instead of real photos.

## Solution
Replace the broken Unsplash source URL approach with a **curated static mapping** of Finnish words to specific, high-quality Unsplash photo URLs (using direct photo IDs). This guarantees every word gets a vivid, relevant, real-world image.

## Changes

### File: `src/pages/YkiDashboard.tsx` (EDIT)

1. **Replace `getVocabImageUrl` function** with a new `VOCAB_IMAGES` mapping object containing ~150+ entries mapping Finnish words to specific Unsplash photo URLs with relevant real images:
   - `koti` → photo of a cozy home
   - `koulu` → photo of a school
   - `auto` → photo of a car
   - `ruoka` → photo of food
   - `sairaala` → photo of a hospital
   - etc.

2. **Fallback chain**: word → category keyword search → gradient+emoji
   - Primary: exact word match in `VOCAB_IMAGES`
   - Secondary: category-based default image (e.g., all "Food" words get a food photo if no specific match)
   - Tertiary: existing gradient + emoji fallback

3. Use format `https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=400&h=300&q=80` for optimized, cropped images that load fast.

### Coverage
- All vocabulary from `vocabularyData.ts`, `vocabularyExpansion.ts`, `vocabularyExpansion2.ts` (~400+ words)
- Category-level fallback images ensure 100% coverage even for unmapped words

| File | Change |
|------|--------|
| `src/pages/YkiDashboard.tsx` | Replace `getVocabImageUrl` with curated image mapping + category fallbacks |


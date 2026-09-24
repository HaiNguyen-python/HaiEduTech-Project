# Vietnamese Alphabet: hero banner + auto-sliding gallery

Route `/learn-vietnamese/alphabet` stays intact. Only the page header and the "The Beauty of Vietnam" section change. No audio, data, or progress changes.

## 1) Title background - Vietnamese landscape hero

Generate one wide banner image (photographic, realistic) of Vietnamese landscape: terraced rice fields at golden sunrise with limestone mountains and morning mist - iconic, meaningful for a language-learning page.

- Save as `public/vietnam-alphabet-hero.webp` (1920x640).
- Replace the plain text header with a rounded hero card:
  - Background: the landscape image, covered edge to edge.
  - Overlay: dark gradient (left-heavy) so text stays readable; brand accent (Royal Blue #3B82F6 -> Soft Emerald #10B981) kept via a subtle tint/border, no hardcoded colors outside tokens where possible.
  - Content on top: back arrow + "Bảng Chữ Cái Tiếng Việt / Vietnamese Alphabet" in white, plus the existing subtitle line, all centered vertically.
  - Mobile-first: hero shrinks gracefully, text uses fluid sizes (min 16px).

## 2) "The Beauty of Vietnam" - auto-sliding, more images

- Install `embla-carousel-autoplay` (companion of the already-used `embla-carousel-react`).
- Make the existing carousel auto-slide every ~4s, looping; pause while the user hovers/touches so reading captions is not cut short.
- Add 6 new generated photos (same 1200x800 style as the existing 9), saved as `vietnam-beauty-10..15.webp`:
  1. Hội An lantern street at night
  2. Sa Pa valley with Fansipan peak
  3. Mekong Delta floating market
  4. Hanoi Old Quarter, Hoan Kiem lake
  5. Trang An / Ninh Binh boats through caves
  6. Phu Quoc beach sunset
- Keep the existing 9 images and their bilingual titles/captions; add the 6 new ones with bilingual titles + one-sentence captions, interleaved by region (north -> center -> south).
- Keep Previous/Next arrows; images keep lazy loading and alt text.

## Files

- `public/vietnam-alphabet-hero.webp` (new, generated)
- `public/vietnam-beauty-10..15.webp` (new, generated)
- `src/pages/VietnameseAlphabet.tsx` (header hero + autoplay plugin + 6 new slides)
- `package.json` (add `embla-carousel-autoplay`)

## Checks

- `tsgo --noEmit`, audit script, and Playwright screenshots of the hero and the auto-sliding gallery (desktop + mobile).

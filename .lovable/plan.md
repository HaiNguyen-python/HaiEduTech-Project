# Home/About colors + rotating hero photos

## 1. Home and About get their own hover colors
Right now only the subject menus (English, Chinese, ...) light up in their own colour on hover. Home and About stay grey.

- Home: teal
- About: orange

They will behave exactly like the other menu items: soft coloured background on hover, coloured text and icon, small coloured bar on the left, and the same colour when that page is the active one. Applies to the desktop menu; the mobile menu stays as it is.

## 2. Hero photo box changes picture every 8 seconds
The square photo frame at the top of the home page keeps its exact size, rounded corners, green border and shadow. Instead of one fixed photo it will cycle through 5 photos:

1. the current portrait of Mr. Hai
2. speaking on stage with a microphone
3. teaching in the classroom
4. in front of University of Helsinki
5. walking in the old town of Stockholm

Details:
- Auto-advances every 8 seconds, loops forever, gentle cross-fade between photos.
- Small dots under/over the frame so a visitor can jump to a photo directly; clicking a dot restarts the 8s timer.
- Pauses while the mouse is over the frame, and does not animate for visitors who prefer reduced motion.
- First photo loads with priority (it is the main image of the page), the rest load lazily.
- Descriptive alt text on each photo for accessibility and search.

## Technical notes
- `src/components/Navbar.tsx`: add `key: "home"` and `key: "about"` entries to `baseLinks` and matching entries in `SUBJECT_COLORS` (full literal Tailwind classes, same shape as existing subjects).
- The 4 uploaded photos are pushed to CDN via `lovable-assets create` from `/mnt/user-uploads/`, each stored as a `.asset.json` pointer in `src/assets/hero/`; no binaries added to the repo.
- New `src/components/HeroPhotoRotator.tsx` holds the index/interval logic and cross-fade (framer-motion `AnimatePresence`), and is dropped into the existing frame markup in `src/components/HeroSection.tsx` — the wrapper div, aspect ratio and border classes are untouched.

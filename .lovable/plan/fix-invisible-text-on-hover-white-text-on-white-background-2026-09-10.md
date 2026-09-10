# Fix invisible text on hover (white text on white background)

## The problem

On some buttons and chips, the words disappear when you move the mouse over them: the text turns white while the box stays white. In the screenshot this happens on the Japanese page menu chips ("Vocabulary", "Kanji", "Word Quest", card counts, etc.).

Cause: the shared button style says "on hover, use the accent background with white text". Many pages then paint their own light/white background on top of that button, but the white hover text stays - so white on white.

## The fix

1. Change the shared button styles so hovering never forces white text:
   - `outline` and `ghost` buttons hover to a soft neutral background with normal dark text (readable in light and dark mode) instead of accent + white text.
   - Same treatment for the small toggle/chip styles that reuse the accent-plus-white-text hover.
2. Sweep the pages that repeat this pattern (light custom background + inherited white hover text) and make their hover text explicitly readable, using theme tokens - no hardcoded white/black.
3. Add a small check script that flags any element combining a light background with a white hover text class, so this cannot creep back in.
4. Verify by hovering real pages in both light and dark mode: Japanese menu chips and card-count chips, Chinese/HSK vocabulary, IELTS vocabulary, Cambridge lectures and arcade, TOEIC exams, Lifestyle Academy, Programming exercise workspace, and the floating notebook/dictionary widgets.

No wording, layout, routes, progress or backend behaviour changes - only hover colours.

## Technical notes

- `src/components/ui/button.tsx`: `outline` and `ghost` variants replace `hover:bg-accent hover:text-accent-foreground` with a muted-surface hover that keeps `text-foreground`.
- `src/components/ui/toggle.tsx`, `navigation-menu.tsx` and similar primitives get the same audit.
- Page-level offenders (files using `bg-white`/`bg-card` chips together with an accent hover) get an explicit `hover:text-*` token class; the current sweep list starts from the ~85 files that mix `bg-white` with a `hover:bg-*` class.
- New `scripts/audit_hover_contrast.mjs` greps `src/**/*.tsx` for light-background + white-hover-text combinations and exits non-zero on findings.
- Run `bunx tsgo --noEmit`, the new audit, and Playwright hover screenshots at 1280x1800 and 390x844.

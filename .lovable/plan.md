# Navbar dropdowns: fix clipping + per-subject hover colors

## 1. Problems (verified in `src/components/Navbar.tsx`)

1. **Dropdown panels can be clipped below the viewport.** Both the first-level panel (line ~606) and the nested flyout (line ~655) render with no `max-height` and no scrolling. The English menu has 12+ entries and the Cambridge IELTS flyout has 4 sections + ~10 links, so on shorter screens the bottom items render off-screen and cannot be reached (exactly the screenshot the user sent).
2. **Flyout vertical position is fixed at `top-0`.** A flyout opened from a low row (e.g. "Specialized English" at the bottom of the English menu) starts at the panel top and extends even further down, worsening the clipping.
3. **No subject color identity on hover.** Every item uses the same generic `hover:bg-secondary` / `hover:text-primary`, so nothing distinguishes English vs Chinese vs Programming etc.

## 2. Fixes to implement

### A. Never clip a dropdown again
- First-level panel: add `max-h-[calc(100vh-7rem)] overflow-y-auto` (plus a slim styled scrollbar) so tall menus scroll inside the panel instead of running off screen.
- Nested flyout: same `max-h-[calc(100vh-7rem)] overflow-y-auto`, and add smart vertical anchoring: when the flyout would overflow the bottom of the viewport, anchor it with `bottom-0` relative to the parent panel instead of `top-0` (measured once on open via `getBoundingClientRect`, cheap and no re-renders).
- Right-edge safety: if a flyout would overflow the right edge of the viewport, flip it to open to the left (`right-full pr-2` instead of `left-full pl-2`) - matters for menus near the right side (Lifestyle, Programming).
- Keep the existing hover-bridge and close-delay logic untouched so the menus do not flicker.

### B. Per-subject hover colors
Define a small color map keyed by top-level menu (`en`, `vi`, `cn`, `jp`, `fi`, `se`, `prog`, `life`, ...) in `Navbar.tsx`, e.g.:

```text
English      -> blue        Vietnamese -> amber
Chinese      -> red         Japanese   -> rose/pink
Finnish      -> cyan        Swedish    -> indigo/yellow
Programming  -> emerald     Lifestyle  -> violet
Your Corner  -> pink
```

Apply it as:
- Top-level trigger: hover tint + text in the subject color (Tailwind arbitrary-value classes driven by the map, all safelisted by being full literal class strings in the map - no dynamic class concatenation).
- Dropdown items: hover background at the subject color (10% opacity), icon and text shift to the subject color, plus the existing stagger fade-in.
- Flyout group headers: uppercase label already uses `text-primary` - switch to the subject color for consistency.
- A subtle 2px accent bar on the left edge of the hovered item in the subject color for extra polish.

### C. Small polish while in there
- `scrollbar-thin` styling for the scrollable panels (custom CSS in `index.css`, no new dependency).
- Active route inside a dropdown shows the subject color chip instead of plain text.

## 3. Verification

- Type-check.
- Browser-check desktop: open English -> Cambridge IELTS flyout (the clipped case in the screenshot) at a short viewport height and confirm the panel scrolls and all items are reachable; confirm Programming and Lifestyle flyouts near the right edge do not overflow horizontally.
- Confirm each subject menu shows its own hover color, and mobile drawer is unchanged.

## Technical notes

Files touched: `src/components/Navbar.tsx` (panel classes, color map, flyout anchoring), `src/index.css` (thin scrollbar utility). No routing, data, or backend changes. Mobile menu is separate code and stays as-is except it inherits nothing new.

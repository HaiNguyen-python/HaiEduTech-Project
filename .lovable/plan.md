

## Redesign Super Dictionary — bigger, smarter, easier to read

### Problem
Current dictionary is a bottom drawer with `max-h-[280px]` (450px expanded). On a 869px viewport that's only ~30% of the screen, with tiny `text-xs` (~12px) fonts, cramped padding, and an inner scroll area capped at 200px. Users have to scroll inside a scroll inside a tiny strip — hard to read while doing a writing task.

### New design: side panel + draggable + resizable

**Layout switch — side panel instead of bottom drawer**
- Slide in from the **right** as a vertical panel: width `400px` default, full height (`top-16` to `bottom-4`), rounded-2xl, soft shadow.
- Doesn't cover the bottom of the writing textarea (which is where the user is typing); leaves the left ~75% of the screen free for the essay.
- On mobile (`<lg`), fall back to full-width bottom sheet (`inset-x-0 bottom-0 h-[80vh]`) — much taller than today's 280px.

**Three size modes (toggle in header)**
1. **Compact** — 380px wide (default for first open).
2. **Wide** — 520px wide (for reading long definitions).
3. **Fullscreen** — centered modal `max-w-3xl` × `85vh` for deep study.

State persisted to `localStorage` (`super-dict-size`) so user's preference sticks.

**Typography & spacing upgrade**
- Headings → `text-base font-semibold` (was `text-sm`).
- Definitions → `text-sm leading-relaxed` (was `text-xs`).
- Examples → `text-sm italic` (was `text-[11px]`).
- Padding → `p-4` instead of `p-2.5`; result cards get breathing room.
- Vietnamese translation gets a soft `bg-emerald-50/50 border-l-2 border-emerald-400` callout block instead of inline gray text.

**Better content density**
- Show **all definitions** (currently capped at 2) — natural scroll inside the tall panel handles it.
- Word + IPA + audio button in a sticky header inside the result card, so it stays visible while scrolling long definitions.
- Each part-of-speech becomes a colored chip (noun=blue, verb=green, adj=purple, adv=amber) — easier to scan.
- Collocation chips get bigger tap targets (`px-2.5 py-1 text-sm`) and a subtle hover lift.
- Thesaurus synonyms rendered as clickable chips that **re-search the word** in the Dictionary tab in one click.

**Quality-of-life additions**
- **Recent searches**: last 5 lookups shown as small chips below the input (click to re-lookup). Stored in `localStorage`.
- **Clear button** (×) inside the input.
- **Empty state** with 3 example words ("ambiguous", "perspective", "significant") as clickable suggestions to onboard new users.
- **Keyboard shortcut**: `Ctrl/Cmd + K` toggles the panel open/closed from anywhere.

**Header controls (top-right of panel)**
`[ ⇲ Wide / ⛶ Fullscreen ] [ — Minimize ] [ × Close ]` — clearer icons with tooltips.

### Files touched
- **Modified**: `src/components/SuperDictionary.tsx` (full redesign — same 3 lookup handlers, new layout/styling/state). No edge function or data changes needed.

### Verification
Open `/ielts-writing-practice`, click 📖 Dictionary FAB:
- Panel opens on the right, full height, easy to read.
- Search "ambiguous" → all definitions visible, Vietnamese in a clear callout, audio plays.
- Toggle Wide/Fullscreen — panel resizes smoothly, choice persisted on reload.
- Click a Thesaurus synonym → switches to Dictionary tab and looks it up.
- `Cmd/Ctrl + K` opens/closes the panel.
- Resize browser to mobile → panel becomes a tall bottom sheet, not the cramped 280px strip.


# Teleprompter readability: narrower reading column

The teleprompter now spans the full page width, so each line is far too long and the eye cannot jump back fast enough while speaking.

## What changes

1. **Narrow reading column (main fix)**
   Text is capped at a comfortable reading measure (~52 characters per line at the current size) and centred inside the dark panel. The panel itself stays full width, so the layout is unchanged - only the text column narrows.

2. **Width control next to the size control**
   Three buttons: Narrow / Medium / Wide (about 42 / 52 / 68 characters). Default Narrow. The choice is remembered locally, the same way the text-size choice is.

3. **Better teleprompter typography**
   - Looser line height and a bit more space between lines for faster line-return.
   - Extra spacing between paragraphs so the script does not read as one block.
   - Text left-aligned inside the centred column (no justified/ragged jumps).

4. **Reading-focus band**
   A soft highlight band across the middle of the panel plus a faint fade at the top and bottom edges, so the eye stays on the line being read instead of scanning the whole box.

5. **Focus mode consistency**
   Fullscreen mode uses the same width setting and the same focus band, with a slightly wider measure since the text is larger there.

## Technical notes

- All changes in `src/pages/PresentationStudio.tsx`: a `promptWidth` state ("narrow" | "medium" | "wide") with `max-w-[42ch] / [52ch] / [68ch]` classes replacing the current `max-w-5xl`, persisted in localStorage next to the existing prompt-size preference.
- Auto-scroll logic, countdown, telemetry, camera PiP and the AI report are untouched.
- No database or edge-function changes.

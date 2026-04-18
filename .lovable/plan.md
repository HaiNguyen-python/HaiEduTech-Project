

## Replace PTE climber chibi with a PTE-themed character

### Goal
The current PtePeak uses `climber-character.png` (a generic mountaineer chibi shared with the IELTS Mountain Climber). For the PTE module we want a chibi that visually evokes the PTE Academic exam — a study-abroad / academic English test most often associated with Australia and computer-based testing.

### Concept for the new chibi
Generate a brand-new chibi character (single PNG, transparent background) with these PTE-friendly cues:
- Cheerful student chibi wearing a graduation cap (academic English)
- Holding a laptop / tablet showing a microphone icon (PTE is computer-based, heavy speaking component)
- Headset around the neck (Listening & Speaking modules)
- A small Australian-flag pin or PTE-blue scarf (#003580 to match PtePeak's palette)
- Same chibi proportions and ~512×512 PNG so it fits the existing 60px climber slot
- Friendly, climbing-ready pose (one foot forward) so it still reads as "climbing toward the summit"

This keeps the mountain-climb metaphor but signals "PTE" clearly and stops sharing assets with the IELTS climber.

### Implementation steps

1. **Generate the chibi** with the AI image gateway (`google/gemini-2.5-flash-image`) using a detailed prompt (graduation cap + laptop with mic icon + headset + PTE-blue scarf, transparent background, chibi style, climbing pose). Save to `src/assets/pte/pte-climber.png`.

2. **Wire it into `PtePeak.tsx`**:
   - Replace `import climberImg from "@/assets/climber-character.png"` with `import climberImg from "@/assets/pte/pte-climber.png"`.
   - Update `alt` text from "PTE Climber" to "PTE Academic student climber".
   - Keep size at 60×60 and the existing bobbing animation — no other layout changes.

3. **QA**: open `/pte` at viewport 1710×869 and verify the new chibi renders crisply on the mountain background, isn't clipped, and the badge `145/800 · Target Band 90` still sits cleanly underneath.

### Files touched
- `src/assets/pte/pte-climber.png` (new)
- `src/components/pte/PtePeak.tsx` (1 import line + 1 alt text)

`MountainClimber.tsx` (used by IELTS) is intentionally left untouched so the IELTS climber stays as-is.


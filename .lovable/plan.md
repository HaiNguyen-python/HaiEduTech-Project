
## Goal
Make the entire Learn Programming experience significantly clearer and more readable, especially in Cloud/Data/AI lessons where Mermaid diagrams and dense theory blocks are still rendering poorly.

## What is still causing the issue
The remaining display problems are broader than one Mermaid setting:

1. `MermaidDiagram.tsx` is currently optimized only at the global config level, but AI-generated diagrams vary a lot in size, direction, and label length. One fixed layout is not enough.
2. The AI Deep-Dive generator explicitly injects Mermaid blocks, so some diagrams are being generated with structures that are hard to read by default.
3. `ProgrammingLesson.tsx` packs several dense UI sections together inside similar “glass-card” panels, so even when diagrams render correctly, the lesson can still feel visually heavy.
4. `TheorySections.tsx` and `.theory-content` styling are good for text, but not yet tuned enough for diagram-heavy technical lessons and wide comparison tables.

## Implementation plan

### 1. Harden Mermaid rendering for readability, not just correctness
Update `src/components/lesson-visuals/MermaidDiagram.tsx` so diagrams adapt better to different lesson content:

- Detect diagram type (`flowchart`, `graph`, `sequenceDiagram`, `timeline`) and apply safer defaults per type.
- Add stronger SVG-side text rendering rules:
  - larger font size
  - clearer line-height behavior
  - explicit text anchoring/alignment
  - sharper text rendering where supported
- Increase node/cluster spacing further for technical diagrams with long labels.
- Add a centered inner stage wrapper so oversized diagrams scroll horizontally without shrinking or blurring.
- Constrain visual density:
  - cap maximum wrapping width
  - increase node padding
  - reduce “cramped” edge label placement
- Keep the existing protections:
  - `mermaid.parse`
  - `suppressErrorRendering`
  - orphan cleanup
  - graceful fallback state

### 2. Add post-render SVG cleanup for Mermaid output
Improve `MermaidDiagram.tsx` after `mermaid.render(...)` by normalizing the generated SVG before inserting it:

- remove inline width/height behavior that causes awkward scaling
- enforce `preserveAspectRatio` and stable viewBox-driven layout
- add readable defaults to generated text nodes and edge labels
- ensure long labels remain visible instead of being clipped by internal SVG bounds
- make diagrams align left on narrow/mobile layouts and center only when space allows

This is important because Mermaid’s generated SVG often needs a second pass for polished app UI.

### 3. Improve lesson-page layout hierarchy in Learn Programming
Refine `src/pages/ProgrammingLesson.tsx` so the lesson feels easier to scan:

- make the theory card more spacious and clearly separated from code / quiz / challenge sections
- reduce visual crowding between stacked cards
- improve heading hierarchy and section spacing
- give the theory area a slightly more document-like reading layout
- make the roadmap/sidebar visually lighter so it does not compete with the lesson body
- improve behavior when IDE is open so the reading column still feels comfortable, not compressed

### 4. Tune TheorySections for technical reading
Update `src/components/TheorySections.tsx` to better support diagram-heavy content:

- add stronger spacing before/after Mermaid blocks
- visually separate diagrams from surrounding paragraphs and callouts
- reduce header clutter around each theory section
- keep progress/read controls, but make them less dominant than the lesson content
- ensure markdown chunks with diagrams, deep dives, tables, and prose flow cleanly in a predictable order

### 5. Refine global programming lesson typography and table styling
Adjust the Learn Programming styles in `src/index.css`:

- increase readability for dense technical text:
  - slightly larger body size on desktop
  - stronger contrast for paragraph text
  - better spacing for lists and tables
- improve technical tables:
  - more padding
  - less cramped columns
  - clearer row separation
  - safer mobile overflow
- add dedicated spacing rules for diagram wrappers inside `.theory-content`
- ensure code blocks, diagrams, callouts, and tables all feel like distinct content types

### 6. Reduce future bad Mermaid output from AI Deep-Dive
Update `supabase/functions/enhance-programming-theory/index.ts` so AI-generated diagrams are easier to render well:

- instruct the model to prefer simple Mermaid structures
- avoid overly long node labels
- prefer short noun phrases over sentence-length labels
- prefer top-down or left-right layouts with limited branching
- avoid visually dense diagrams when a comparison table would communicate more clearly
- keep code comments in English as already required

This reduces future broken or cluttered diagrams at the source.

### 7. Verify across the whole Programming pillar, not just one lesson
After implementation, test multiple programming lessons that represent different content types:

- Cloud Fundamentals
- Compute & Storage
- SQL lessons with tables/diagrams
- ML lessons with built-in visual blocks
- AI Deep-Dive content with generated Mermaid diagrams

Verification should confirm:
- no clipped node text
- no blurry/scaled-down diagrams
- no cramped tables
- clearer section spacing
- better readability with and without the IDE open
- acceptable mobile behavior for wide technical content

## Files to update
- `src/components/lesson-visuals/MermaidDiagram.tsx`
- `src/components/TheorySections.tsx`
- `src/pages/ProgrammingLesson.tsx`
- `src/index.css`
- `supabase/functions/enhance-programming-theory/index.ts`

## Technical notes
- The biggest remaining issue is no longer just syntax or orphan SVG injection; it is layout quality after Mermaid renders.
- The fix should combine:
  - better Mermaid config
  - SVG post-processing
  - page-level spacing improvements
  - stricter AI prompt guidance for generated diagrams
- No database migration is required.
- No auth or RLS changes are required.

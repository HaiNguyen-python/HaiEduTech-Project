

## Goal
Fix the broken Mermaid diagrams across all Programming lessons (e.g., "Transform: Clean/Mask/Aggre" being clipped, narrow boxes cutting off text) so every diagram renders cleanly and legibly.

## Root cause
In `src/components/lesson-visuals/MermaidDiagram.tsx` we currently force `white-space: nowrap !important` on every label. But the AI-generated diagrams use `<br/>` line-breaks inside node labels (e.g., `Hidden Layer 1<br/>ReLU + BatchNorm`, `Transform: Clean/Mask/Aggregate`). The combination causes two visible bugs:

1. The HTML label `<div>` ignores `<br/>` width and stretches as one line, but Mermaid sizes the underlying SVG `<rect>` from the original (wrapped) text — so the rendered text overflows and gets clipped at the rect edge.
2. Long single-word labels still don't fit because node padding is too tight.

## Fix — overhaul `MermaidDiagram.tsx`

1. **Stop forcing `nowrap`.** Allow labels to wrap normally so `<br/>` works and long words break cleanly.
2. **Use SVG text labels (`htmlLabels: false`)** for flowcharts. SVG text is what Mermaid measures the rect against, so the rect always fits the text — no more "Aggre…" clipping.
3. **Increase per-diagram padding & spacing**: node padding 18, `nodeSpacing` 80, `rankSpacing` 90, font 15px so multi-line labels breathe.
4. **Keep contrast strong** in both light and dark themes (current blue palette is good — keep it but raise `primaryTextColor` weight to 600).
5. **Per-diagram-type tuning** for the few non-flowchart types we use (`timeline`, `sequenceDiagram`): keep their defaults, only inject font-size + colors via `themeCSS`.
6. **Preserve current safety nets**: `suppressErrorRendering`, `mermaid.parse` pre-validation, orphan `<svg>` cleanup, and the soft "Diagram could not be rendered" fallback.
7. **Container polish**: keep the gradient card, but add `min-h` so loading state doesn't jump, and ensure horizontal scroll only kicks in on truly oversized diagrams (mobile).

## Verification
After the change, the diagrams shown in the screenshots ("Source → Extract → Transform: Clean/Mask/Aggregate → Load → Warehouse" and the AI architecture flowcharts) should render with full text visible inside every node, no clipping, no blur, and consistent spacing across light/dark mode.

## Files touched
- `src/components/lesson-visuals/MermaidDiagram.tsx` (single file, full rewrite of `initMermaid` config + container)

No changes to cached content, no DB migration, no edge function changes.


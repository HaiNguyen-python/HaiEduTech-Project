# Vocab Brain: fix control bar + upgrade the 3D brain

## 1. Fix the display bug (Find a word)

Today all controls (filters, Labels, density, Pause, Replay, Reset view, search box) sit in one floating bar overlaid on top of the canvas with `flex-wrap`. When the viewport is narrow the search input wraps to a second line, so the translucent black bar grows into a two-row band that covers the top of the brain.

Fix:
- Move the control bar out of the canvas overlay and into a toolbar strip directly above the brain viewport, styled to match the dark panel. Nothing floats over the brain any more, so no rows can cover it.
- Keep the bar on a single line: horizontal scroll (`overflow-x-auto`, no wrap) for the button group, with the search field pinned on the right and shrinking instead of wrapping.
- On mobile: filters + search on the first row, secondary controls (Labels/density/Pause/Replay/Reset) collapsed into a compact "View options" popover.
- Keep the bottom-left hint and bottom-right legend as overlays (they don't grow), but make the legend collapsible so it never blocks the brain on small screens.

## 2. Upgrade the brain

Visual and rendering
- Depth cues: soft bloom on strong neurons, subtle fog so far-side words dim instead of cluttering, and size scaling by mastery so "solid" words read as bigger nodes.
- Synapse links: draw faint connecting lines between words in the same topic/lesson so the cloud looks like a network, not a dust cloud.
- Region shaping: keep left/right hemispheres but group words into lobes by tier (fresh / fading / forgotten) with gentle drift, so colour clusters are readable at a glance.
- Performance guard: cap rendered labels by density setting and fall back to the 2D view automatically on low-FPS devices.

Interaction
- Click a word -> side detail card: meaning, example, last review date, next review due, and a "Review now" button that opens that word in the review flow.
- Search now highlights and flies the camera to the matched word instead of only filtering.
- Hover tooltip with word + tier colour, and keyboard focus support for accessibility.

Learning value
- "Today's mission" wired to the brain: the mission words pulse in the cloud, and completing them animates their colour shift from red to green live.
- Consolidation replay upgrade: a timeline scrubber (7 / 30 / 90 days) so learners can drag through how their memory built up, with a word-count-over-time readout.
- Memory-decay forecast: a small chart showing how many words will slip to "needs revision" in the next 7 days if nothing is reviewed.
- Share/export: capture the current brain as an image with word count and badge, for sharing progress.

Prioritised order: (1) toolbar fix, (2) click-to-detail + search fly-to, (3) synapse links and depth cues, (4) mission pulse + decay forecast, (5) replay scrubber and share image.

## Technical notes
- Files: `src/components/vocab/VocabBrainPanel.tsx` (layout, toolbar, overlays), `src/components/vocab/VocabBrain3D.tsx` (rendering, links, camera fly-to, hover/click), `src/components/vocab/VocabBrain2D.tsx` (parity for fallback), `src/components/vocab/vocabBrainModel.ts` (tier/decay data, forecast helper).
- No database change needed for steps 1-3; the decay forecast and replay scrubber reuse existing review-date fields already loaded by the panel.

## Homepage elevation: interactive, cinematic, 60fps

Adds 5 new interactive layers to `/` (Index.tsx) without breaking existing sections. All comments in English. Full dark-mode. GPU-accelerated transforms only; no per-frame JS scroll handlers.

### 1. `AIPathSimulatorCard` (Hero overlay)
- New: `src/components/home/AIPathSimulatorCard.tsx`
- Glassmorphism card layered on the right side of `HeroSection` (desktop) / below headline (mobile).
- Local state: `activePath: "ielts" | "yki" | "python" | "abroad"`.
- Four pill buttons; clicking morphs the card via `AnimatePresence` + `layoutId` showing: badge, 3-step mini-roadmap, target metric, CTA linking to the matching route (`/ielts`, `/finnish/yki-a2`, `/programming`, `/study-abroad`).
- Mouse-follow 3D tilt using existing `useTilt(8)` hook (already disables on touch / reduced-motion / <1024px).
- Mount inside `HeroSection.tsx` (add without removing existing chibi/timeline).

### 2. `BentoOfferings` with cursor spotlight
- New: `src/components/home/BentoOfferings.tsx`
- 6-tile asymmetric bento grid (2 large + 4 small on md+, single column on mobile): AI Speaking Coach, Lifestyle Academy, To-Do Goal Engine, Python EdTech, IELTS/HSK, YKI Finnish.
- Each tile: icon, title, one-line pitch, `Link` to feature route, subtle gradient border.
- Spotlight: single wrapper listens to `pointermove` with rAF throttle, updates two CSS variables (`--mx`, `--my`) on the wrapper; each tile has `::before` using `radial-gradient(circle at var(--mx) var(--my), hsl(var(--primary)/0.18), transparent 60%)`. One listener total, no per-tile JS.
- `content-visibility: auto` + `contain-intrinsic-size` on each tile.

### 3. `ScrollRoadmap` (SVG stroke-dashoffset)
- New: `src/components/home/ScrollRoadmap.tsx`
- Vertical SVG path (~1400px tall, viewBox scales) with 6 milestones: Foundation → Skill Building → Assessment → Mastery → Global Exams → Study Abroad.
- Uses CSS scroll-driven animation where supported: `animation-timeline: view()` on the path controlling `stroke-dashoffset`. Fallback: single `IntersectionObserver` on the section that toggles a CSS var driving `--progress` via a `requestAnimationFrame` loop only while visible.
- Milestone dots use `IntersectionObserver` to add `.is-active` (scale + glow via CSS keyframes).

### 4. `TryItLivePlayground`
- New: `src/components/home/TryItLivePlayground.tsx`
- shadcn `Tabs`: "Language AI" and "Data / Python".
- Tab 1: static SVG waveform bars animated via CSS keyframes (staggered `animation-delay`); "Listen Sample" button plays a short existing Vietnamese/Finnish TTS clip via `SpeechSynthesisUtterance` (no new backend). Simulated tone-accuracy readout.
- Tab 2: two toggle buttons ("Ingest" / "Transform") swapping between two pre-highlighted Python snippets rendered in a `<pre>` with syntax-styled `<span>`s (no runtime highlighter dep). Copy button uses `navigator.clipboard`.

### 5. `AmbientOrbs` parallax layer
- New: `src/components/home/AmbientOrbs.tsx`
- 3 fixed-position blurred gradient divs (emerald / royal-blue / gold) with `will-change: transform`.
- Drift uses pure CSS `@keyframes` (no scroll JS). Optional CSS `animation-timeline: scroll(root)` where supported for real parallax; otherwise the ambient float keyframe is sufficient.
- Mounted once at the top of `Index.tsx` inside a `pointer-events-none fixed inset-0 -z-10` wrapper.

### Integration in `src/pages/Index.tsx`
Order after existing content:
```
AmbientOrbs (fixed layer)
HeroSection (+ AIPathSimulatorCard inside)
HomeChibiFunFacts
BentoOfferings                   ← new
ClassroomGallery
MonthlyTopStudents (lazy)
CoursesOverview
LearningRoadmaps (lazy)
ScrollRoadmap                    ← new
TryItLivePlayground              ← new
ModernTechTools (lazy)
SuccessMetrics (lazy)
WorldVisitorMap (lazy)
Footer
```
All new heavy sections wrapped in the existing `LazySection` pattern except `AmbientOrbs` (needed above the fold) and the Hero card (part of Hero).

### Technical section

- Comments in English only (per project rule + user directive).
- Semantic tokens only (`hsl(var(--primary))`, `hsl(var(--accent))`, no raw hex in components; extend `index.css` with `--emerald-glow` and `--gold-glow` if not present).
- Bilingual copy via `useLanguage().t(vi, en)` on every string.
- Reduced-motion: all new components check `prefers-reduced-motion` and disable tilt/parallax/waveform animation.
- Performance: `content-visibility: auto` on Bento tiles, ScrollRoadmap section, and Playground; single global `pointermove` listener for spotlight; no `onScroll` React handlers - all scroll effects use CSS timelines or a single `IntersectionObserver`.
- Types: no new deps. Uses existing `framer-motion`, `lucide-react`, shadcn `Tabs`, `useTilt`.
- Files touched: `src/pages/Index.tsx`, `src/components/HeroSection.tsx`, plus 5 new files under `src/components/home/`. No backend, no migrations.

### Out of scope
- No changes to Dashboard, courses, or backend.
- Not touching `LearningRoadmaps` (kept alongside new `ScrollRoadmap`).
- No new npm packages.

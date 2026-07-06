# Plan: version sync + AI Academy English rewrite

## 1) Force users onto the latest build (cache sync)

Root cause: browsers keep the old `index.html` / JS chunks in HTTP cache and Service Worker-style state, so returning students see stale UI after we ship.

Actions:
- **`index.html` no-cache headers** - add `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">`, `Pragma: no-cache`, `Expires: 0`. The HTML shell is tiny; hashed JS/CSS chunks stay long-cached (safe because filenames change per build).
- **Build version stamp** - inject `import.meta.env.VITE_BUILD_ID` (git sha or `Date.now()` at build) into `window.__APP_VERSION__` via a small Vite `define`. Write it into a `<meta name="app-version">` in `index.html`.
- **Runtime version checker** (`src/lib/versionCheck.ts`) - every 5 min and on `visibilitychange`, fetch `/index.html?ts=<now>` with `cache: 'no-store'`, read the `app-version` meta. If it differs from `window.__APP_VERSION__`, show a small toast "New version available - Reload" with a button that calls `location.reload()`. Auto-reload silently if no unsaved chatbot input.
- **Chunk-load error self-heal** - global handler for `window.addEventListener('error', ...)` catching `Loading chunk ... failed` / `Failed to fetch dynamically imported module` (common when old tabs load new chunk names). On match, `sessionStorage`-guard against loops and `location.reload()`.
- **Clear legacy caches once** - on first load with a new version, run `caches.keys().then(k => k.forEach(caches.delete))` to wipe any residual SW caches.

Mount the checker inside `src/App.tsx` so it runs on every route.

## 2) AI Academy: all-English + scroll perf fix

Root cause of Vietnamese leakage: page source in `src/pages/AIAcademy.tsx` (1888 lines) + sandbox components are still written in Vietnamese. The `AutoTranslateBoundary` patches text nodes at runtime via a `MutationObserver` + `TreeWalker` + edge-function calls - this is exactly why scrolling stutters (every scroll-triggered animation/mount fires the observer, walks the tree, and schedules rAF work).

Actions:
- **Rewrite the copy in English at source** - convert every Vietnamese string in `src/pages/AIAcademy.tsx` and the ~25 sandbox components under `src/components/ai-academy/` to English. Keep JSX/markup untouched; only string literals change. Use the existing English translations already cached in `AutoTranslateBoundary` as the starting draft where possible, then human-polish. (Big diff but mechanical.)
- **Remove `<AutoTranslateBoundary>` wrapper** from `AIAcademy.tsx` once source is English. Keep the file for now (marked deprecated) to avoid breaking imports elsewhere; delete after verification.
- **Kill runtime translation cost** - no more MutationObserver, no `translate-vi-en` edge-function batches, no per-node `nodeValue` writes on scroll. This alone should restore 60fps scrolling.
- **Additional scroll perf wins** in AI Academy:
  - Replace `FloatingAIIcons` continuous framer-motion loops on scroll-visible area with CSS `@keyframes` + `will-change: transform` (GPU only, no React re-renders).
  - Add `content-visibility: auto; contain-intrinsic-size: 600px;` to each sandbox card wrapper so off-screen sections skip layout/paint.
  - Convert the long section list to lazy render: use `IntersectionObserver` (or `react-intersection-observer`) so sandboxes below the fold mount only when near viewport.
  - Ensure images in the page use `loading="lazy"` and `decoding="async"`.
  - Debounce/disable heavy framer-motion `whileHover` scale animations behind `prefers-reduced-motion`.

## Files touched

- `index.html` - cache meta, version meta placeholder
- `vite.config.ts` - `define: { __APP_VERSION__: JSON.stringify(...) }`
- `src/App.tsx` - mount `useVersionCheck()`
- `src/lib/versionCheck.ts` (new) - polling + toast + chunk-error handler
- `src/pages/AIAcademy.tsx` - English rewrite + remove boundary + perf tweaks (content-visibility, lazy mount)
- `src/components/ai-academy/*.tsx` - translate source strings to English
- `src/components/ai-academy/AutoTranslateBoundary.tsx` - keep file, no-op export (deprecated) to avoid churn if imported elsewhere

## Out of scope

- Changing the app's global `vi/en` toggle behaviour (English stays selectable app-wide as today).
- Redesigning AI Academy visuals.

## Technical notes

- Cache strategy is HTML-no-cache + hashed-assets-long-cache; this is the standard Vite pattern and needs no server config changes on Lovable hosting.
- The version toast respects `useLanguage()` for its own label ("Phiên bản mới - Tải lại" / "New version - Reload").
- Rewriting ~26 files' Vietnamese strings is the bulk of the work; I'll batch parallel edits per file group (page, sandboxes A-M, sandboxes N-Z) to stay within a few credits.

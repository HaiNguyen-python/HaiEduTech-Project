---
name: 3D Classroom (Admin)
description: Interactive 3D classroom in Admin Dashboard Overview tab, seats ordered by academic rank, name tags above heads
type: feature
---
- `src/components/admin/Classroom3D.tsx` (lazy) at top of Overview tab in `AdminDashboard.tsx`; pure logic in `src/lib/classroom3d.ts`.
- Seating default = academic rank (`avgScore` -> `totalActivities` -> name; zero-activity students last). Toggle to "attention first" mode keeps red tier in the front rows. `seat.rank` is always the academic rank.
- Name tag above every head: `#rank · name · score/10`, colour-bordered by tier; auto-shortens name + font when >40 students (`shortName`).
- Tiers: red = needs attention, green = improving, blue = avg >= 7, amber = 5-7, grey = no activity. Avatar height = activity volume, floor ring = avg score, pulsing ring = active this week, gold crown = top 3.
- Whiteboard shows class average, active-this-week count, alert count, top 3. Stat chips (students / active week / below 5 / improving) double as filters; "Go to attention" flies the camera to the first alert student.
- Clicking an avatar focuses the camera and selects the student (jumps to Students tab).
- Do NOT use drei `<Text>` here: the troika default font is blocked by CSP and Suspense never resolves (blank canvas). Use `<Html>` panels instead.
- Perf: shared module-level geometries + per-tier materials, ONE `useFrame` in `Room` driving all avatars via a registered ref map, `frameloop` drops to "demand" when off-screen or tab hidden, antialias off above 40 students, dpr capped at 1.5.
- Flat 2D grid fallback auto-enabled on mobile / prefers-reduced-motion, same rank order.
- UI direction: Scandinavian "Spatial Management Hub" with Urbanist headings, Epilogue body, realistic classroom architecture, a large 3D stage, bottom camera HUD, and right management rail.
- Large-class label policy: all seats show compact rank markers; full name/score labels are reserved for top 3, alert-tier, search matches, hover, and selection to prevent visual overlap.
- Keep the classroom ceiling open so overhead cameras never hide students. Decorations must stay on perimeter walls, and Management Center controls must preserve high-contrast text/icons on hover and focus.

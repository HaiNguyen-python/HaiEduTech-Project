---
name: 3D Classroom (Admin)
description: Interactive 3D classroom in Admin Dashboard Overview tab, avatar colour = student status tier
type: feature
---
- `src/components/admin/Classroom3D.tsx` (lazy) at top of Overview tab in `AdminDashboard.tsx`; pure logic in `src/lib/classroom3d.ts`.
- Tiers: red = needs attention (intervention rule), green = improving, blue = avg >= 7, amber = 5-7, grey = no activity. Avatar height = activity volume, floor ring = avg score, pulsing ring = active this week.
- Attention students seated in the front rows. Camera presets: Whole class / Top view / Attention row. Legend chips filter, name search highlights.
- Clicking an avatar selects the student and jumps to the Students tab.
- Do NOT use drei `<Text>` here: the troika default font is blocked by CSP and Suspense never resolves (blank canvas). Use `<Html transform>` panels instead.
- Flat 2D grid fallback auto-enabled on mobile / prefers-reduced-motion.

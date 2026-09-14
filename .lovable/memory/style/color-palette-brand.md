---
name: Brand color palette
description: Royal Blue to Soft Emerald gradient; module cards must use soft /15 gradients
type: design
---
Primary gradient: Royal Blue (#3B82F6) to Soft Emerald (#10B981).

## Module card colors (languageCurriculum)
- Every `color` on modules in `src/data/languageCurriculum/*.ts` MUST be a soft gradient with opacity suffix, e.g. `from-blue-500/15 to-cyan-500/15`. Never saturated 100% gradients, never bare color words (`indigo`, `teal`...).
- **Why:** cards render dark text (foreground title, muted description, primary lesson link) - saturated backgrounds drown the text; bare tokens are not valid gradient classes and leave cards plain white.
- Cards also carry `border border-border/60 bg-card` + `font-semibold` on the lesson link (src/pages/English.tsx).

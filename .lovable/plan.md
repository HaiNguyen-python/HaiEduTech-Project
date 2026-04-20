

## Lesson Illustration Generator (AI-Powered Infographics)

Add cute, infographic-style illustrations (similar to your "Classic / Graph / Agentic RAG" reference image) inline in every Programming lesson's theory — making lessons feel visual and modern instead of text-heavy.

### What you'll get

Each enhanced theory will automatically include **1–2 inline AI-generated infographics** at the most pedagogically useful sections (typically "Detailed Breakdown" and "Comparative Table"). The Mermaid diagram system stays — these new images complement it with rich, illustrated visuals like the one you uploaded.

```text
##  4. Detailed Breakdown
... text ...
[ AI infographic: "Decision Tree Splits"  ← cute illustrated diagram ]
... more text ...

## 5. Comparative Table
| ... |
[ AI infographic: "Tree vs Random Forest vs XGBoost"  ← side-by-side cards ]
```

### How it works

1. **AI picks the visuals**: When `enhance-programming-theory` generates the Deep-Dive markdown, it now also outputs 1–2 image prompts (one per chosen section) describing exactly what to illustrate.
2. **Gemini Nano Banana renders them**: A new edge function `generate-lesson-illustrations` calls `google/gemini-2.5-flash-image` with a strict style guide ("flat infographic, soft pastels, rounded cards, 3-column comparison, friendly mascot, no text labels in image, white background…") that mimics the look of your reference image.
3. **Stored permanently**: Each PNG goes to a new public Supabase Storage bucket `lesson-illustrations`, and the URLs are cached in the DB so each lesson generates only **once ever**.
4. **Inline rendering**: Markdown gets `![caption](url)` tags that `TheorySections` already supports via `react-markdown` — they appear inline with rounded corners + caption styling.

### Pre-generation script (your choice — all 110 lessons in one batch)

A new admin button **"Generate All Lesson Illustrations"** appears in the Programming page (visible only to teacher/admin). Clicking it:
- Loops through all 110 lessons in the background
- Throttles to 1 lesson every 4 seconds (avoids 429 rate limits)
- Shows live progress: "47 / 110 lessons illustrated"
- Skips lessons already cached
- Total cost estimate: ~110 lessons × 2 images × ~$0.003 = **~$0.66 in Lovable AI credits, one time**

Once done, every learner just loads cached PNG URLs instantly.

### Style guide for images (replicates your reference)

The image prompt template enforces:
- Flat infographic illustration, soft pastel colors (blue / green / purple panels like your sample)
- Cute rounded mascot/character icons, NO text labels in image
- Centered composition, white/light background, drop shadow, rounded corners
- Pedagogical focus: concept comparison, flow, or "how it works" visualization
- Square 1024×1024 (Gemini default), displayed at max-width 720px

### Technical Details

**New Edge Function**: `supabase/functions/generate-lesson-illustrations/index.ts`
- Input: `{ module_id, lesson_id, lesson_title, sections: [{anchor, prompt}] }`
- Calls `https://ai.gateway.lovable.dev/v1/chat/completions` with `model: "google/gemini-2.5-flash-image"` and `modalities: ["image", "text"]` per section
- Decodes base64 → uploads to bucket `lesson-illustrations/{module_id}/{lesson_id}/{anchor}.png` via service role
- Returns `{ illustrations: [{anchor, url, caption}] }`
- Logs to `api_usage_log` (domain: "programming", model: "gemini-2.5-flash-image")

**Updated Edge Function**: `supabase/functions/enhance-programming-theory/index.ts`
- System prompt extended: also output a JSON block ` ```json\n{"illustrations":[{"anchor":"detailed-breakdown","prompt":"..."},{"anchor":"comparative-table","prompt":"..."}]}\n``` ` at the END of the markdown.
- Server parses + strips this JSON block, calls `generate-lesson-illustrations` with the prompts, then **inserts** `![caption](url)` markers under the matching `## N. ...` sections in the final markdown before caching.

**Database migration**:
```sql
-- New column on existing cache table
ALTER TABLE programming_theory_cache 
  ADD COLUMN illustrations jsonb NOT NULL DEFAULT '[]';

-- New public storage bucket for illustrations
INSERT INTO storage.buckets (id, name, public) 
VALUES ('lesson-illustrations', 'lesson-illustrations', true);

-- Public-read, service-role write policies on storage.objects for that bucket
```

**Frontend changes**:
- `src/pages/ProgrammingLesson.tsx`: add admin-only "🎨 Generate All Illustrations" button beside the existing "Open Interactive IDE" button. Driver loop calls the enhance function with `force_refresh=false` per lesson, sequentially.
- `src/components/TheorySections.tsx`: add custom `img` renderer in `markdownComponents` that wraps `<img>` in `<figure>` with rounded corners, soft border, drop shadow, `loading="lazy"`, `decoding="async"`, and renders an italic caption. Reserves height via `aspect-ratio: 1/1` to keep your scrollbar-stability fix intact.

**Style enforcement** (in image prompt builder):
```
A cute, modern flat infographic illustration explaining "{concept}".
Style: soft pastel colors (blue, mint green, lavender panels), rounded cards 
with subtle drop shadows, friendly cartoon mascot characters, isometric icons 
(database, gears, charts, brain). White background. NO text, NO letters, 
NO numbers in the image — visual only. Composition: centered, clean,
educational poster style. Suitable for a programming lesson.
```

### Files touched

- **NEW**: `supabase/functions/generate-lesson-illustrations/index.ts`
- **NEW**: `supabase/migrations/<timestamp>_add_lesson_illustrations.sql`
- **EDIT**: `supabase/functions/enhance-programming-theory/index.ts` (extract image prompts, call illustrations function, splice `![](url)` into markdown)
- **EDIT**: `src/components/TheorySections.tsx` (custom `img` renderer with figure/caption styling)
- **EDIT**: `src/pages/ProgrammingLesson.tsx` (admin batch-generate button + progress toast)

### Important note about your request

Perplexity API does **not** generate images — it's a text-search API. The reference image you shared is best replicated using **Gemini Nano Banana** (already wired into your project for vocab/marketing images via `LOVABLE_API_KEY`), which is cheap, fast, and well-tested for this exact "flat educational infographic" style. The plan uses Gemini for image generation but keeps Perplexity for the text Deep-Dive (as it is today).


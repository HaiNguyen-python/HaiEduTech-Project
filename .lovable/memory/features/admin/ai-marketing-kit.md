---
name: AI Marketing Kit
description: Studio in Admin Strategy tab generating 3 ad copy variations + matching illustration via Lovable AI (Gemini Pro + Nano Banana). A/B save, regenerate, mockup, export
type: feature
---

Component `AiMarketingKit.tsx` in Admin Strategy tab. Edge function `generate-marketing-kit` uses Lovable AI (LOVABLE_API_KEY): `google/gemini-2.5-pro` for 3 copy variations (Emotional/Rational/Urgency) and `google/gemini-2.5-flash-image` (Nano Banana) for illustration. Image uploaded to public `marketing-images` Supabase bucket. Inputs: course (12 options), audience (4), platform (FB/IG/Zalo/Google Ads), goal (Awareness/Lead/Flash). Modes: full, textOnly, imageOnly. Saves to `marketing_campaigns` table with A/B label. Image prompt avoids text-in-image (visual metaphors only), includes subtle HaiEduTech wordmark, royal blue + emerald palette. Platform-specific copy length tuning. Mockup preview shows simulated platform card. Export: copy text to clipboard, download PNG. Teacher/admin-only RLS.

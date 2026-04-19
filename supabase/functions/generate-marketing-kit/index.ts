// AI Marketing Kit Generator
// Generates 3 ad copy variations + matching illustration for HaiEduTech courses
// Uses Lovable AI Gateway: Gemini 2.5 Pro for copy, Gemini 2.5 Flash Image (Nano Banana) for image

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  course: string;
  audience: string;
  platform: string;
  goal: string;
  generateImage?: boolean;
  textOnly?: boolean;
  imageOnly?: boolean;
  videoOnly?: boolean;
  videoFormat?: "tiktok" | "reels" | "shorts";
  customImagePrompt?: string;
}

const COPY_SYSTEM = `You are a senior Vietnamese marketing copywriter for HaiEduTech (haiedutech.com), an online language & tech academy founded by Mr. Hai (Master's, 15 yrs exp, Data Engineer in Finland background).
Brand voice: trustworthy expert, modern, slightly aspirational, mixes Vietnamese with strategic English keywords (IELTS, PTE, YKI, AI, Python).
ALWAYS reply in Vietnamese. ALWAYS return STRICT JSON (no markdown fences).`;

function buildCopyPrompt(b: RequestBody): string {
  return `Generate 3 distinct ad copy variations for HaiEduTech.

Context:
- Course: ${b.course}
- Target Audience: ${b.audience}
- Platform: ${b.platform}
- Goal: ${b.goal}

Tailor length & tone to the platform:
- Facebook Post: 80-150 words, 2-3 emojis, line breaks
- Instagram Story: 30-50 words, punchy, vertical-friendly, 3-5 emojis
- Zalo Message: 50-80 words, friendly Vietnamese, no hashtags
- Google Ads: Headline ≤30 chars, body ≤90 chars, descriptive

Return STRICT JSON:
{
  "variations": [
    {
      "label": "Emotional",
      "headline": "string (catchy, ≤60 chars)",
      "body": "string (full ad copy)",
      "benefits": ["bullet 1", "bullet 2", "bullet 3"],
      "cta": "string (call to action)",
      "hashtags": ["#tag1", "#tag2"]
    },
    { "label": "Rational", ... same shape },
    { "label": "Urgency", ... same shape }
  ]
}

Variation rules:
1. Emotional: tap into dreams, identity, future self ("Du học Phần Lan không còn là mơ...")
2. Rational: features, AI grading, output guarantee, methodology proof
3. Urgency: scarcity, limited slots, flash discount, deadline`;
}

function buildImagePrompt(b: RequestBody): string {
  // Visual metaphor focused — avoid text inside the image
  const subjectMap: Record<string, string> = {
    english: "British landmarks (Big Ben silhouette), books, headphones",
    pte: "Australian Opera House silhouette, headphones, score chart",
    ielts: "Big Ben silhouette, certificate, books, score 8.0",
    chinese: "Great Wall silhouette, lantern, scroll, hanzi brush stroke",
    finnish: "northern lights, snow, Helsinki cathedral, sauna",
    programming: "laptop with abstract code symbols, Python logo, neural network",
    python: "laptop, abstract code symbols, gears, AI brain",
  };

  const courseLower = b.course.toLowerCase();
  let visualHints = "books, headphones, certificate, abstract academic icons";
  for (const [key, val] of Object.entries(subjectMap)) {
    if (courseLower.includes(key)) {
      visualHints = val;
      break;
    }
  }

  const audienceVisual = {
    Students: "cheerful young Vietnamese student smiling",
    Professionals: "confident young Vietnamese professional",
    "Study Abroad Aspirants": "Vietnamese student with backpack looking ahead",
    "Language Enthusiasts": "joyful Vietnamese learner with open book",
  }[b.audience] || "cheerful Vietnamese student";

  return `High-Definition modern educational digital illustration. ${audienceVisual}, ${visualHints}. 
Style: clean vector + subtle realism, royal blue (#3B82F6) and emerald green (#10B981) gradient background, soft golden accents.
Composition: minimalist, professional, centered subject, generous negative space.
Mood: optimistic, aspirational, trustworthy.
Brand: small subtle "HaiEduTech" wordmark in bottom-right corner.
NO complex text, NO words on screens, NO logos other than HaiEduTech, NO watermarks.
Visual metaphor only.`;
}

async function generateCopy(body: RequestBody, apiKey: string) {
  const response = await fetch(
    "https://ai.gateway.lovable.dev/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: COPY_SYSTEM },
          { role: "user", content: buildCopyPrompt(body) },
        ],
        response_format: { type: "json_object" },
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Copy gen ${response.status}: ${text}`);
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content ?? "{}";
  // Strip markdown fences if present
  const cleaned = raw.replace(/```json\n?/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned);
}

function buildVideoPrompt(b: RequestBody): string {
  const fmt = b.videoFormat || "tiktok";
  const platformLabel = fmt === "reels"
    ? "Instagram Reels"
    : fmt === "shorts"
    ? "YouTube Shorts"
    : "TikTok";
  return `Generate a 30-second ${platformLabel} video script for HaiEduTech course "${b.course}".
Audience: ${b.audience}. Goal: ${b.goal}.

Structure rules:
- Total duration: exactly 30 seconds
- Vertical 9:16 format
- 6 shots (≈5s each) with strong hook in first 3 seconds
- Vietnamese voiceover (natural spoken tone, NOT formal written)
- Each shot includes: timing range, visual description (camera + scene), on-screen text overlay (≤8 words), voiceover line, and a B-roll/SFX hint
- End with strong CTA shot (last 3-5s)

Return STRICT JSON (no markdown, no fences):
{
  "title": "Catchy video title (≤60 chars)",
  "hook": "First-3-second hook line (Vietnamese, ≤15 words)",
  "totalSeconds": 30,
  "format": "${fmt}",
  "aspectRatio": "9:16",
  "musicMood": "energetic | uplifting | cinematic | chill",
  "shots": [
    {
      "shotNumber": 1,
      "timing": "0:00 - 0:05",
      "visual": "Detailed camera angle + scene + subject (English, for video editor)",
      "onScreenText": "Bold overlay text (Vietnamese, ≤8 words)",
      "voiceover": "Spoken line in Vietnamese (≤20 words, natural tone)",
      "broll": "B-roll suggestion or SFX (e.g. whoosh, ding, ambient)"
    }
    // ... 6 shots total
  ],
  "cta": "Final spoken CTA line in Vietnamese",
  "captionForUpload": "Caption to paste when uploading the video (Vietnamese, includes 3-5 hashtags)",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
  "productionTips": ["tip 1 for the editor", "tip 2", "tip 3"]
}

Quality rules:
- Hook must stop the scroll (question, bold claim, or surprising visual)
- Voiceover lines should sound spoken, not written. Use contractions, short sentences.
- On-screen text must be readable in 1 second. Big, punchy.
- Always include HaiEduTech brand mention in shot 5 or 6.
- CTA must be specific (e.g. "Inbox 'PTE79' để nhận lộ trình miễn phí" not "Liên hệ ngay").`;
}

async function generateVideoScript(body: RequestBody, apiKey: string) {
  const response = await fetch(
    "https://ai.gateway.lovable.dev/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: COPY_SYSTEM },
          { role: "user", content: buildVideoPrompt(body) },
        ],
        response_format: { type: "json_object" },
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Video script gen ${response.status}: ${text}`);
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content ?? "{}";
  const cleaned = raw.replace(/```json\n?/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned);
}

async function generateImage(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch(
    "https://ai.gateway.lovable.dev/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Image gen ${response.status}: ${text}`);
  }

  const data = await response.json();
  const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (!imageUrl) throw new Error("No image returned by AI");
  return imageUrl;
}

async function uploadImageToStorage(
  base64DataUrl: string,
  userId: string,
): Promise<string> {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Strip "data:image/png;base64," prefix
  const match = base64DataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) throw new Error("Invalid base64 image format");
  const mimeType = match[1];
  const base64Data = match[2];
  const ext = mimeType.split("/")[1] || "png";

  const bytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
  const path = `${userId}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("marketing-images")
    .upload(path, bytes, { contentType: mimeType, upsert: false });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage
    .from("marketing-images")
    .getPublicUrl(path);
  return data.publicUrl;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    // JWT auth — admin only
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const { data: userRes } = await supabaseAuth.auth.getUser(
      authHeader.replace("Bearer ", ""),
    );
    if (!userRes?.user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = userRes.user.id;

    const body: RequestBody = await req.json();
    if (!body.course || !body.audience || !body.platform || !body.goal) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const result: any = {};

    // Image-only mode (regenerate image)
    if (body.imageOnly) {
      const imagePrompt = body.customImagePrompt || buildImagePrompt(body);
      const base64 = await generateImage(imagePrompt, apiKey);
      const publicUrl = await uploadImageToStorage(base64, userId);
      result.imageUrl = publicUrl;
      result.imagePrompt = imagePrompt;
    } else if (body.textOnly) {
      // Text-only mode (regenerate copy)
      const copy = await generateCopy(body, apiKey);
      result.variations = copy.variations;
    } else {
      // Full generation: copy + image in parallel
      const imagePrompt = buildImagePrompt(body);
      const [copy, base64] = await Promise.all([
        generateCopy(body, apiKey),
        body.generateImage !== false
          ? generateImage(imagePrompt, apiKey)
          : Promise.resolve(""),
      ]);

      result.variations = copy.variations;
      result.imagePrompt = imagePrompt;

      if (base64) {
        const publicUrl = await uploadImageToStorage(base64, userId);
        result.imageUrl = publicUrl;
      }
    }

    return new Response(JSON.stringify({ success: true, ...result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Marketing kit error:", msg);

    let status = 500;
    if (msg.includes("429")) status = 429;
    if (msg.includes("402")) status = 402;

    return new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

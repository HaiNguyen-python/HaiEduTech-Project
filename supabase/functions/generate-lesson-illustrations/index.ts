// Edge function: generate cute infographic illustrations for a programming
// lesson via Lovable AI Gateway (google/gemini-2.5-flash-image), upload PNGs to
// the public `lesson-illustrations` bucket, and return the public URLs.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface SectionPrompt {
  anchor: string;       // e.g. "detailed-breakdown" or "comparative-table"
  prompt: string;       // concept-only short phrase, no full sentence
  caption?: string;     // optional caption shown under the image
}

interface Body {
  module_id: string;
  lesson_id: string;
  lesson_title: string;
  sections: SectionPrompt[];
}

const STYLE_PREFIX = `A cute, modern flat infographic illustration explaining the following concept.
Style: soft pastel colors (light blue, mint green, lavender, peach panels), rounded cards
with subtle drop shadows, friendly cartoon mascot characters, isometric icons
(database, gears, charts, brain, cloud, code window). White background. Centered, clean,
educational poster style. Suitable for a programming lesson.
STRICT: NO text, NO letters, NO numbers, NO labels, NO captions in the image — visual only.

Concept to illustrate: `;

function buildPrompt(concept: string): string {
  return STYLE_PREFIX + concept.trim();
}

// Convert a base64 data URL or raw base64 string into a Uint8Array
function base64ToBytes(b64: string): Uint8Array {
  const cleaned = b64.includes(",") ? b64.split(",")[1] : b64;
  const binary = atob(cleaned);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function safeAnchor(s: string): string {
  return (s || "section")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "section";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as Body;
    if (!body.module_id || !body.lesson_id || !Array.isArray(body.sections) || body.sections.length === 0) {
      return new Response(JSON.stringify({ error: "Missing module_id, lesson_id, or sections" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceRoleKey);

    // Optional user attribution
    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
        global: { headers: { Authorization: authHeader } },
      });
      const { data: { user } } = await userClient.auth.getUser();
      if (user) userId = user.id;
    }

    const illustrations: { anchor: string; url: string; caption: string }[] = [];
    const sectionsToProcess = body.sections.slice(0, 2); // hard cap = 2 images per lesson

    for (const section of sectionsToProcess) {
      const anchor = safeAnchor(section.anchor);
      const concept = (section.prompt || "").trim();
      const caption = (section.caption || section.prompt || "").trim();
      if (!concept) continue;

      try {
        const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image",
            messages: [
              { role: "user", content: buildPrompt(concept) },
            ],
            modalities: ["image", "text"],
          }),
        });

        if (!aiResp.ok) {
          const txt = await aiResp.text();
          console.error("Image gen error:", aiResp.status, txt);
          // Surface upstream rate-limit / payment errors so the caller can react
          if (aiResp.status === 429 || aiResp.status === 402) {
            return new Response(JSON.stringify({
              error: aiResp.status === 429 ? "Rate limited" : "Payment required",
              status: aiResp.status,
            }), {
              status: aiResp.status,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          continue;
        }

        const aiData = await aiResp.json();
        const imageDataUrl: string | undefined =
          aiData?.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        if (!imageDataUrl) {
          console.warn("No image returned for anchor", anchor);
          continue;
        }

        const bytes = base64ToBytes(imageDataUrl);
        const path = `${body.module_id}/${body.lesson_id}/${anchor}.png`;

        const { error: uploadErr } = await admin.storage
          .from("lesson-illustrations")
          .upload(path, bytes, {
            contentType: "image/png",
            upsert: true,
            cacheControl: "31536000",
          });
        if (uploadErr) {
          console.error("Upload error:", uploadErr);
          continue;
        }

        const { data: pub } = admin.storage
          .from("lesson-illustrations")
          .getPublicUrl(path);

        if (pub?.publicUrl) {
          illustrations.push({ anchor, url: pub.publicUrl, caption });
        }

        // Best-effort usage logging
        admin.from("api_usage_log").insert({
          function_name: "generate-lesson-illustrations",
          model: "google/gemini-2.5-flash-image",
          domain: "programming",
          user_id: userId,
          tokens_used: 0,
          estimated_cost: 0.003,
          status: "success",
        }).then(() => {}).catch(() => {});
      } catch (innerErr) {
        console.error("Section generation failed:", anchor, innerErr);
      }
    }

    return new Response(
      JSON.stringify({ illustrations }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("generate-lesson-illustrations error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

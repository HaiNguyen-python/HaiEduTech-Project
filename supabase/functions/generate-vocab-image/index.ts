import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { character, pinyin, definition } = await req.json();
    if (!character || !definition) {
      return new Response(JSON.stringify({ error: "Missing character or definition" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Create a safe ASCII filename using hex encoding of character bytes
    const encoder = new TextEncoder();
    const bytes = encoder.encode(character);
    const hexKey = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    const filePath = `hsk/${hexKey}.png`;

    // Check if image already exists in storage
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: existing } = await supabase.storage
      .from("vocab-images")
      .createSignedUrl(filePath, 60);

    if (existing?.signedUrl) {
      // Verify the file actually exists by trying to download it
      const check = await fetch(existing.signedUrl, { method: "HEAD" });
      if (check.ok) {
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/vocab-images/${filePath}`;
        return new Response(JSON.stringify({ imageUrl: publicUrl }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Generate image using Lovable AI
    const prompt = `A simple, cute, flat illustration icon representing the Chinese word "${character}" (${pinyin}) which means "${definition}". Clean minimalist style, pastel colors, white background, no text, no characters, just a visual representation of the concept. Icon style, suitable for a vocabulary flashcard.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error("Failed to generate image");
    }

    const data = await response.json();
    const imageDataUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageDataUrl) {
      throw new Error("No image generated");
    }

    // Extract base64 data
    const base64Match = imageDataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!base64Match) throw new Error("Invalid image data format");

    const mimeType = `image/${base64Match[1]}`;
    const base64Data = base64Match[2];

    // Decode base64 to Uint8Array
    const binaryString = atob(base64Data);
    const imageBytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      imageBytes[i] = binaryString.charCodeAt(i);
    }

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("vocab-images")
      .upload(filePath, imageBytes, {
        contentType: mimeType,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("Failed to upload image");
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/vocab-images/${filePath}`;

    return new Response(JSON.stringify({ imageUrl: publicUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-vocab-image error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

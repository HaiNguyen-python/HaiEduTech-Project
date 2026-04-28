/**
 * @file translate-finnish-word/index.ts
 * @description Translate a single Finnish word (possibly inflected) to English
 *   using Lovable AI Gateway (Gemini). Returns base form + meaning.
 */
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.100.1/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { word } = await req.json();
    if (!word || typeof word !== "string" || word.length > 60) {
      return new Response(JSON.stringify({ error: "invalid word" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const prompt = `You are a Finnish-English dictionary. The user gives you a Finnish word that may be inflected (case, tense, possessive, etc.). 
Reply ONLY with valid JSON in this exact shape, no markdown, no extra text:
{"base":"<base/dictionary form in Finnish>","en":"<short English meaning, max 8 words>","pos":"<part of speech: noun|verb|adj|adv|pron|num|conj|prep|interj|other>"}

Word: "${word}"`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      return new Response(JSON.stringify({ error: `AI ${aiRes.status}`, details: errText }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiRes.json();
    const raw: string = aiData?.choices?.[0]?.message?.content ?? "";
    // Strip markdown fences if any
    const cleaned = raw.replace(/```json\s*|\s*```/g, "").trim();
    const match = cleaned.match(/\{[\s\S]*\}/);
    let parsed: { base?: string; en?: string; pos?: string } = {};
    if (match) {
      try {
        parsed = JSON.parse(match[0]);
      } catch {
        parsed = {};
      }
    }

    return new Response(
      JSON.stringify({
        base: parsed.base || word,
        en: parsed.en || "",
        pos: parsed.pos || "",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

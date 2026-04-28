/**
 * @file translate-finnish-word/index.ts
 * @description Translate a single Finnish word (possibly inflected) to English
 *   using Perplexity API. Returns base form + meaning + part of speech.
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) {
      return new Response(
        JSON.stringify({ error: "PERPLEXITY_API_KEY is not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const systemMsg =
      "You are a precise Finnish-English dictionary. Always reply with ONLY a single valid JSON object, no markdown, no commentary.";
    const userMsg = `The Finnish word is: "${word}". It may be inflected (case, tense, possessive, plural, etc.). Return JSON exactly in this shape:
{"base":"<dictionary form in Finnish>","en":"<short English meaning, max 8 words>","pos":"<noun|verb|adj|adv|pron|num|conj|prep|interj|other>"}`;

    const aiRes = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: systemMsg },
          { role: "user", content: userMsg },
        ],
        temperature: 0.1,
        max_tokens: 200,
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      return new Response(
        JSON.stringify({ error: `Perplexity ${aiRes.status}`, details: errText }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const aiData = await aiRes.json();
    const raw: string = aiData?.choices?.[0]?.message?.content ?? "";
    const cleaned = raw.replace(/```json\s*|\s*```/g, "").trim();
    const match = cleaned.match(/\{[\s\S]*\}/);
    let parsed: { base?: string; en?: string; pos?: string } = {};
    if (match) {
      try {
        parsed = JSON.parse(match[0]);
      } catch {
        // attempt simple repair: replace single quotes
        try {
          parsed = JSON.parse(match[0].replace(/'/g, '"'));
        } catch {
          parsed = {};
        }
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

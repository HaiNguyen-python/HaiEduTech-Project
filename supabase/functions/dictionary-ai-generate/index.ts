// Generate a structured English dictionary entry via Perplexity API.
// Used by Teacher Admin → English Dictionary form to auto-fill word details.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const word = String(body?.word || "").trim();
    if (!word || word.length > 100) {
      return Response.json({ error: "Invalid word" }, { status: 400, headers: corsHeaders });
    }

    const KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!KEY) {
      return Response.json({ error: "Service unavailable" }, { status: 503, headers: corsHeaders });
    }

    const system =
      "You are a professional English-Vietnamese lexicographer for an educational platform. " +
      "Given an English word or phrase, return ONLY a raw JSON object (no markdown, no prose, no citations like [1]) with exactly this shape: " +
      `{ "phonetic": "IPA in slashes", "part_of_speech": "noun|verb|adjective|adverb|...", "vietnamese_definition": "core accurate Vietnamese translation suitable for learners", "english_definition": "simple English definition", "examples": [ { "en": "natural example sentence", "vi": "Vietnamese translation" } ], "collocations_synonyms": ["collocation 1", "synonym 1"] }. ` +
      "Rules: provide 2-3 examples; provide 4-6 collocations or synonyms; Vietnamese must use correct diacritics; do NOT include any field other than the listed keys; output JSON only.";

    const resp = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        temperature: 0.1,
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Word: ${word}` },
        ],
      }),
    });

    if (resp.status === 429) {
      return Response.json({ error: "Rate limited" }, { status: 429, headers: corsHeaders });
    }
    if (!resp.ok) {
      const errTxt = await resp.text().catch(() => "");
      console.error("dictionary-ai-generate perplexity error", resp.status, errTxt);
      return Response.json({ error: "AI service error" }, { status: 502, headers: corsHeaders });
    }

    const data = await resp.json();
    let raw: string = data?.choices?.[0]?.message?.content || "";
    // Strip code fences and Perplexity citation markers
    raw = raw.replace(/```json|```/g, "").replace(/\[\d+\](?:\[\d+\])*/g, "").trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error("dictionary-ai-generate no JSON", raw.slice(0, 200));
      return Response.json({ error: "Bad AI response" }, { status: 502, headers: corsHeaders });
    }

    let parsed: any = null;
    try { parsed = JSON.parse(match[0]); } catch {
      // Repair trailing commas
      try { parsed = JSON.parse(match[0].replace(/,(\s*[}\]])/g, "$1")); } catch { parsed = null; }
    }
    if (!parsed || typeof parsed !== "object") {
      return Response.json({ error: "Parse error" }, { status: 502, headers: corsHeaders });
    }

    // Normalize/whitelist fields
    const result = {
      phonetic: String(parsed.phonetic || "").trim(),
      part_of_speech: String(parsed.part_of_speech || "").trim(),
      vietnamese_definition: String(parsed.vietnamese_definition || "").trim(),
      english_definition: String(parsed.english_definition || "").trim(),
      examples: Array.isArray(parsed.examples)
        ? parsed.examples
            .filter((x: any) => x && (x.en || x.english))
            .slice(0, 5)
            .map((x: any) => ({
              en: String(x.en || x.english || "").trim(),
              vi: String(x.vi || x.vietnamese || "").trim(),
            }))
        : [],
      collocations_synonyms: Array.isArray(parsed.collocations_synonyms)
        ? parsed.collocations_synonyms
            .filter((x: any) => typeof x === "string" && x.trim())
            .slice(0, 10)
            .map((x: string) => x.trim())
        : [],
    };

    return Response.json(result, { headers: corsHeaders });
  } catch (e) {
    console.error("dictionary-ai-generate error", e);
    return Response.json({ error: "Internal error" }, { status: 500, headers: corsHeaders });
  }
});

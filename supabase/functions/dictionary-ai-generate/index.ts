// Generate a structured dictionary entry (EN/ZH/FI/VI) via Perplexity API.
// Used by Teacher Admin → Dictionary forms to auto-fill word details.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Per-language system prompt tailored to lexicographic conventions
function buildSystemPrompt(lang: string): string {
  const base =
    "You are a professional lexicographer for an educational platform. " +
    "Return ONLY a raw JSON object (no markdown, no prose, no citations like [1]) with exactly this shape: " +
    `{ "phonetic": "...", "part_of_speech": "noun|verb|adjective|adverb|...", "vietnamese_definition": "...", "english_definition": "...", "examples": [ { "en": "...", "vi": "..." } ], "collocations_synonyms": ["..."] }. ` +
    "Rules: 2-3 examples; 4-6 collocations/synonyms; Vietnamese must use correct diacritics; no extra fields; JSON only.";

  switch (lang) {
    case "zh":
      return (
        "You are a Chinese-Vietnamese-English lexicographer. The input is a Chinese word (Hanzi). " +
        base +
        ' For Chinese: "phonetic" MUST be Pinyin with tone marks. ' +
        'Each example.en should be the Hanzi sentence (you may append Pinyin in parentheses); example.vi is the Vietnamese translation. ' +
        '"english_definition" is the English meaning of the Chinese word.'
      );
    case "fi":
      return (
        "You are a Finnish-Vietnamese-English lexicographer. The input is a Finnish word (give base dictionary form). " +
        base +
        ' For Finnish: "phonetic" MUST be IPA in slashes. ' +
        'example.en is the Finnish sentence; example.vi is the Vietnamese translation. ' +
        '"english_definition" is the English meaning of the Finnish word.'
      );
    case "vi":
      return (
        "You are a Vietnamese-English lexicographer. The input is a Vietnamese word or phrase. " +
        base +
        ' For Vietnamese: "phonetic" may be empty or rough IPA. ' +
        '"vietnamese_definition" is a clear Vietnamese explanation/synonym of the word. ' +
        '"english_definition" is the English translation. ' +
        'example.en is the Vietnamese sentence; example.vi is the English translation (we reuse the "vi" key for the translation pair).'
      );
    case "en":
    default:
      return (
        "You are an English-Vietnamese lexicographer. The input is an English word or phrase. " +
        base +
        ' For English: "phonetic" MUST be IPA in slashes. ' +
        'example.en is the English sentence; example.vi is the Vietnamese translation.'
      );
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const word = String(body?.word || "").trim();
    const lang = String(body?.lang || "en").toLowerCase();
    if (!word || word.length > 120) {
      return Response.json({ error: "Invalid word" }, { status: 400, headers: corsHeaders });
    }
    if (!["en", "zh", "fi", "vi"].includes(lang)) {
      return Response.json({ error: "Invalid language" }, { status: 400, headers: corsHeaders });
    }

    const KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!KEY) {
      return Response.json({ error: "Service unavailable" }, { status: 503, headers: corsHeaders });
    }

    const system = buildSystemPrompt(lang);

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

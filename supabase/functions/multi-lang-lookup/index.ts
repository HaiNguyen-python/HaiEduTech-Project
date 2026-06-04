// Multi-language word lookup (EN/ZH/FI/VI) powered by Perplexity API.
// Returns: phonetic/pinyin, part of speech, 1-3 definitions in English + Vietnamese, examples.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const LANG_NAMES: Record<string, string> = {
  en: "English",
  zh: "Simplified Chinese (Mandarin) — use Hanzi for the headword; provide Pinyin with tone marks",
  fi: "Finnish — provide the base dictionary form and IPA phonetic",
  vi: "Vietnamese — provide the diacritic spelling and rough IPA",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const word = String(body?.word || "").trim();
    const lang = String(body?.lang || "en").toLowerCase();

    if (!word) {
      return Response.json({ error: true, message: "Missing word" }, { headers: corsHeaders });
    }
    if (!LANG_NAMES[lang]) {
      return Response.json({ error: true, message: "Invalid language" }, { headers: corsHeaders });
    }

    const KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!KEY) {
      return Response.json({ error: true, message: "Lookup service unavailable" }, { headers: corsHeaders });
    }

    const system =
      `You are a multilingual dictionary. The user gives a word in ${LANG_NAMES[lang]}. ` +
      `Return ONLY a strict JSON object (no markdown, no prose, no citation markers like [1]) with this shape:\n` +
      `{ "word": string, "phonetic": string, "meanings": [ { "partOfSpeech": string, "definitions": [ { "definitionEn": string, "definitionVi": string, "example": string, "exampleVi": string } ] } ], "notFound": boolean }\n` +
      `Rules:\n` +
      `- If the word does not exist in that language, return {"notFound": true} and nothing else.\n` +
      `- Provide 1 to 3 partOfSpeech groups, each with 1 to 3 definitions.\n` +
      `- "definitionEn" is the English meaning. "definitionVi" is the Vietnamese meaning.\n` +
      `- Always include one short natural example sentence in the source language plus its Vietnamese translation in "exampleVi".\n` +
      `- For Chinese: "phonetic" must be Pinyin with tone marks; "word" must be the Hanzi.\n` +
      `- For Finnish/English: "phonetic" is IPA in slashes.\n` +
      `- For Vietnamese: "phonetic" may be empty or a rough IPA.\n` +
      `- Output ONLY the JSON object. No \`\`\`json fences, no extra text, no citation markers.`;

    const resp = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Look up the word: ${word}` },
        ],
        temperature: 0.1,
      }),
    });

    if (resp.status === 429) {
      return Response.json({ error: true, message: "Rate limit reached, please wait." }, { headers: corsHeaders });
    }
    if (resp.status === 401 || resp.status === 403) {
      return Response.json({ error: true, message: "Lookup auth error" }, { headers: corsHeaders });
    }
    if (!resp.ok) {
      const errTxt = await resp.text().catch(() => "");
      console.error("multi-lang-lookup perplexity error", resp.status, errTxt);
      return Response.json({ error: true, message: "Lookup service is busy" }, { headers: corsHeaders });
    }

    const data = await resp.json();
    let raw: string = data?.choices?.[0]?.message?.content || "";
    // Clean common wrappers and citation markers
    raw = raw.replace(/```json|```/g, "").replace(/\[\d+\](?:\[\d+\])*/g, "").trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error("multi-lang-lookup no JSON in response", raw.slice(0, 200));
      return Response.json({ notFound: true }, { headers: corsHeaders });
    }

    let parsed: any = null;
    try { parsed = JSON.parse(match[0]); } catch (e) {
      // JSON repair attempt: strip trailing commas
      try { parsed = JSON.parse(match[0].replace(/,(\s*[}\]])/g, "$1")); } catch { parsed = null; }
    }
    if (!parsed) {
      return Response.json({ notFound: true }, { headers: corsHeaders });
    }
    if (parsed.notFound) {
      return Response.json({ notFound: true }, { headers: corsHeaders });
    }

    return Response.json({ entry: parsed, lang }, { headers: corsHeaders });
  } catch (e) {
    console.error("multi-lang-lookup error", e);
    return Response.json({ error: true, message: "Internal error" }, { headers: corsHeaders });
  }
});

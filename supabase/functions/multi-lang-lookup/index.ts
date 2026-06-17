import "../_shared/ai-fallback.ts";
// Multi-language word lookup (EN/ZH/FI/VI) powered by Perplexity API.
// Cached in dictionary_cache by sha256(lang|word) for repeat-lookup speed.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const admin = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const word = String(body?.word || "").trim();
    const lang = String(body?.lang || "en").toLowerCase();

    if (!word) return Response.json({ error: true, message: "Missing word" }, { headers: corsHeaders });
    if (!LANG_NAMES[lang]) return Response.json({ error: true, message: "Invalid language" }, { headers: corsHeaders });

    const normalized = word.toLowerCase();

    // 1) Database-first lookup for ALL 4 languages from the matching official dictionary
    const DICT_TABLE: Record<string, string> = {
      en: "english_dictionary",
      zh: "chinese_dictionary",
      fi: "finnish_dictionary",
      vi: "vietnamese_dictionary",
    };
    const tableName = DICT_TABLE[lang];
    if (tableName) {
      const { data: official } = await admin
        .from(tableName)
        .select("word, phonetic, part_of_speech, vietnamese_definition, english_definition, examples, collocations_synonyms, tag")
        .ilike("word", normalized)
        .maybeSingle();
      if (official) {
        const examples = Array.isArray(official.examples) ? official.examples : [];
        const definitions = [{
          definitionEn: official.english_definition || "",
          definitionVi: official.vietnamese_definition || "",
          example: examples[0]?.en || examples[0]?.english || "",
          exampleVi: examples[0]?.vi || examples[0]?.vietnamese || "",
        }];
        const entry = {
          word: official.word,
          phonetic: official.phonetic || "",
          meanings: [{
            partOfSpeech: official.part_of_speech || "",
            definitions,
          }],
          extraExamples: examples.slice(1),
          collocations: official.collocations_synonyms || [],
          tag: official.tag || "General",
        };
        return Response.json({ entry, lang, source: "haiedutech_official" }, { headers: corsHeaders });
      }
    }


    const cacheKey = "lk:" + (await sha256Hex(`${lang}|${normalized}`));
    const { data: cached } = await admin
      .from("dictionary_cache")
      .select("payload")
      .eq("cache_key", cacheKey)
      .maybeSingle();
    if (cached?.payload) {
      admin.from("dictionary_cache")
        .update({ last_hit_at: new Date().toISOString() })
        .eq("cache_key", cacheKey).then(() => {});
      return Response.json({ ...cached.payload, cached: true }, { headers: corsHeaders });
    }


    const KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!KEY) return Response.json({ error: true, message: "Lookup service unavailable" }, { headers: corsHeaders });

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

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Look up the word: ${word}` },
        ],
        temperature: 0.1,
        max_tokens: 1200,
        response_format: { type: "json_object" },
      }),
    });

    if (resp.status === 429) return Response.json({ error: true, message: "Rate limit reached, please wait." }, { headers: corsHeaders });
    if (resp.status === 402) return Response.json({ error: true, message: "AI credits exhausted." }, { headers: corsHeaders });
    if (resp.status === 401 || resp.status === 403) return Response.json({ error: true, message: "Lookup auth error" }, { headers: corsHeaders });
    if (!resp.ok) {
      const errTxt = await resp.text().catch(() => "");
      console.error("multi-lang-lookup lovable AI error", resp.status, errTxt);
      return Response.json({ error: true, message: "Lookup service is busy" }, { headers: corsHeaders });
    }

    const data = await resp.json();
    let raw: string = data?.choices?.[0]?.message?.content || "";
    raw = raw.replace(/```json|```/g, "").replace(/\[\d+\](?:\[\d+\])*/g, "").trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error("multi-lang-lookup no JSON in response", raw.slice(0, 200));
      return Response.json({ notFound: true }, { headers: corsHeaders });
    }

    let parsed: any = null;
    try { parsed = JSON.parse(match[0]); } catch {
      try { parsed = JSON.parse(match[0].replace(/,(\s*[}\]])/g, "$1")); } catch { parsed = null; }
    }
    if (!parsed) return Response.json({ notFound: true }, { headers: corsHeaders });
    if (parsed.notFound) {
      // Cache "not found" too (short-lived not enforced; cheap entry)
      admin.from("dictionary_cache")
        .upsert({ cache_key: cacheKey, kind: "lookup", payload: { notFound: true }, last_hit_at: new Date().toISOString() })
        .then(() => {});
      return Response.json({ notFound: true }, { headers: corsHeaders });
    }

    const payload = { entry: parsed, lang };
    admin.from("dictionary_cache")
      .upsert({ cache_key: cacheKey, kind: "lookup", payload, last_hit_at: new Date().toISOString() })
      .then(() => {});

    // Auto-build the official dictionary for ALL 4 languages: persist Perplexity results
    // so future lookups hit the local database (sub-10ms) and the store grows organically.
    if (tableName && parsed && !parsed.notFound) {
      try {
        const firstMeaning = Array.isArray(parsed.meanings) ? parsed.meanings[0] : null;
        const firstDef = firstMeaning && Array.isArray(firstMeaning.definitions) ? firstMeaning.definitions[0] : null;
        const viDef = String(firstDef?.definitionVi || "").trim();
        if (viDef) {
          // Flatten all definitions into examples array for richer storage
          const examples: { en: string; vi: string }[] = [];
          if (Array.isArray(parsed.meanings)) {
            for (const m of parsed.meanings) {
              if (Array.isArray(m.definitions)) {
                for (const d of m.definitions) {
                  const en = String(d.example || "").trim();
                  const vi = String(d.exampleVi || "").trim();
                  if (en) examples.push({ en, vi });
                }
              }
            }
          }
          // For non-English dictionaries we keep the original headword (Hanzi, Finnish base form,
          // Vietnamese with diacritics). For English we lowercase to match manual entries.
          const wordToSave = lang === "en" ? normalized : word;
          admin.from(tableName).upsert({
            word: wordToSave,
            phonetic: String(parsed.phonetic || "").trim() || null,
            part_of_speech: String(firstMeaning?.partOfSpeech || "").trim() || null,
            vietnamese_definition: viDef,
            english_definition: String(firstDef?.definitionEn || "").trim() || null,
            examples,
            collocations_synonyms: [],
            tag: "AI-Generated",
          }, { onConflict: "word", ignoreDuplicates: true }).then(({ error }) => {
            if (error) console.warn(`${tableName} auto-save failed`, error.message);
          });
        }
      } catch (saveErr) {
        console.warn(`${tableName} auto-save threw`, saveErr);
      }
    }

    return Response.json(payload, { headers: corsHeaders });
  } catch (e) {
    console.error("multi-lang-lookup error", e);
    return Response.json({ error: true, message: "Internal error" }, { headers: corsHeaders });
  }
});


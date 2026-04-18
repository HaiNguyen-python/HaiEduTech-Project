// Proxy for dictionary, collocation, and thesaurus lookups.
// Avoids browser-side CORS/TLS flakiness with public APIs.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function fetchWithTimeout(url: string, timeoutMs = 6000): Promise<Response> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; HaiEduTechBot/1.0)" },
    });
  } finally {
    clearTimeout(t);
  }
}

async function fetchJSONWithRetry(url: string): Promise<{ ok: boolean; status: number; data: any }> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetchWithTimeout(url, 6000);
      const status = res.status;
      if (res.ok) {
        const data = await res.json();
        return { ok: true, status, data };
      }
      // 404 = legitimately not found, no retry
      if (status === 404) {
        try { await res.text(); } catch { /* ignore */ }
        return { ok: false, status, data: null };
      }
      try { await res.text(); } catch { /* ignore */ }
    } catch (_e) {
      // network/timeout - retry once
    }
  }
  return { ok: false, status: 0, data: null };
}

async function translateToVi(text: string): Promise<string> {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|vi`;
    const res = await fetchWithTimeout(url, 5000);
    if (!res.ok) {
      try { await res.text(); } catch { /* ignore */ }
      return "";
    }
    const data = await res.json();
    return data?.responseData?.translatedText || "";
  } catch {
    return "";
  }
}

async function handleDictionary(word: string) {
  const w = word.trim().toLowerCase();
  // Primary: dictionaryapi.dev
  const primary = await fetchJSONWithRetry(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`,
  );

  let entry: any = null;
  let notFound = false;

  if (primary.ok && Array.isArray(primary.data) && primary.data[0]) {
    entry = primary.data[0];
  } else if (primary.status === 404) {
    notFound = true;
  } else {
    // Fallback: build a minimal entry from Datamuse
    const fallback = await fetchJSONWithRetry(
      `https://api.datamuse.com/words?sp=${encodeURIComponent(w)}&md=dpr&max=1`,
    );
    if (fallback.ok && Array.isArray(fallback.data) && fallback.data[0]?.word === w) {
      const item = fallback.data[0];
      const defs: string[] = item.defs || [];
      const phonetic = (item.tags || []).find((t: string) => t.startsWith("ipa_pron:"))?.slice(9) || "";
      const meanings: any[] = [];
      const grouped: Record<string, string[]> = {};
      defs.forEach((d: string) => {
        const [posCode, ...rest] = d.split("\t");
        const posMap: Record<string, string> = { n: "noun", v: "verb", adj: "adjective", adv: "adverb" };
        const pos = posMap[posCode] || posCode || "other";
        if (!grouped[pos]) grouped[pos] = [];
        grouped[pos].push(rest.join("\t"));
      });
      Object.entries(grouped).forEach(([pos, list]) => {
        meanings.push({
          partOfSpeech: pos,
          definitions: list.slice(0, 3).map((d) => ({ definition: d })),
        });
      });
      if (meanings.length > 0) {
        entry = { word: w, phonetic, phonetics: [], meanings };
      } else {
        notFound = true;
      }
    } else if (fallback.status === 0 && primary.status === 0) {
      // Both upstream calls failed (network)
      return { error: true, message: "Lookup service is busy" };
    } else {
      notFound = true;
    }
  }

  if (!entry) {
    return { notFound: true };
  }

  // Build Vietnamese translations server-side (max 6 to stay under MyMemory limits)
  const toTranslate: { key: string; text: string }[] = [];
  entry.meanings?.forEach((m: any, mIdx: number) => {
    m.definitions?.slice(0, 2).forEach((def: any, dIdx: number) => {
      toTranslate.push({ key: `def-${mIdx}-${dIdx}`, text: def.definition });
      if (def.example) {
        toTranslate.push({ key: `ex-${mIdx}-${dIdx}`, text: def.example });
      }
    });
  });
  const limited = toTranslate.slice(0, 6);
  const viTranslations: Record<string, string> = {};
  try {
    const results = await Promise.allSettled(
      limited.map(async (item) => ({ key: item.key, vi: await translateToVi(item.text) })),
    );
    results.forEach((r) => {
      if (r.status === "fulfilled" && r.value.vi) {
        viTranslations[r.value.key] = r.value.vi;
      }
    });
  } catch {
    // Translation is best-effort; never break the lookup.
  }

  return { entry, viTranslations };
}

async function handleCollocation(word: string) {
  const w = word.trim().toLowerCase();
  const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
  if (!apiKey) {
    return { groups: [], error: true, message: "Collocation service unavailable" };
  }

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content:
              "You are an English collocation dictionary, modeled after Oxford Collocations Dictionary. Given an English word, return the most natural and frequently used collocations grouped by grammatical pattern. Each collocation MUST be a real, common multi-word phrase that native speakers actually use (e.g. 'eat out', 'eat breakfast', 'healthy eating'). Do NOT include single words, grammar fragments, or unnatural combinations. Return ONLY valid JSON, no prose.",
          },
          {
            role: "user",
            content:
              `Generate collocations for the word: "${w}".\n\n` +
              `Return JSON in this exact shape:\n` +
              `{\n` +
              `  "groups": [\n` +
              `    {\n` +
              `      "label": "Verb + Noun" | "Adjective + Noun" | "Adverb + Verb" | "Verb + Adverb" | "Phrasal Verbs" | "Common Phrases" | "Noun + Verb" | "Preposition Phrases",\n` +
              `      "items": [ { "phrase": "eat out", "vi": "đi ăn ngoài" }, ... ]\n` +
              `    }\n` +
              `  ]\n` +
              `}\n\n` +
              `Rules:\n` +
              `- Pick 3 to 5 grammatical groups that are most relevant for this word.\n` +
              `- 4 to 8 phrases per group.\n` +
              `- Every phrase MUST contain the target word "${w}" (in any inflected form).\n` +
              `- Provide a short, natural Vietnamese translation for each phrase.\n` +
              `- Order phrases from most common to less common.\n` +
              `- No duplicates across groups.`,
          },
        ],
        temperature: 0.2,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "collocations",
            schema: {
              type: "object",
              properties: {
                groups: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      label: { type: "string" },
                      items: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            phrase: { type: "string" },
                            vi: { type: "string" },
                          },
                          required: ["phrase", "vi"],
                        },
                      },
                    },
                    required: ["label", "items"],
                  },
                },
              },
              required: ["groups"],
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Collocation AI error", response.status, text);
      return { groups: [], error: true, message: "Lookup service is busy" };
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || "";
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) {
      return { groups: [] };
    }

    let parsed: any;
    try {
      parsed = JSON.parse(match[0]);
    } catch {
      return { groups: [] };
    }

    const groups = Array.isArray(parsed?.groups)
      ? parsed.groups
          .map((g: any) => ({
            label: typeof g?.label === "string" ? g.label : "Collocations",
            items: Array.isArray(g?.items)
              ? g.items
                  .filter((it: any) => it && typeof it.phrase === "string" && it.phrase.toLowerCase().includes(w))
                  .map((it: any) => ({
                    phrase: it.phrase.trim(),
                    vi: typeof it.vi === "string" ? it.vi.trim() : "",
                  }))
                  .slice(0, 8)
              : [],
          }))
          .filter((g: any) => g.items.length > 0)
          .slice(0, 6)
      : [];

    return { groups };
  } catch (e) {
    console.error("handleCollocation exception", e);
    return { groups: [], error: true, message: "Lookup service is busy" };
  }
}

async function handleThesaurus(word: string) {
  const w = word.trim().toLowerCase();
  const res = await fetchJSONWithRetry(
    `https://api.datamuse.com/words?rel_syn=${encodeURIComponent(w)}&max=20`,
  );
  if (!res.ok) {
    if (res.status === 0) return { error: true, message: "Lookup service is busy" };
    return { synonyms: [] };
  }
  const synonyms = (res.data || []).map((d: any) => ({ word: d.word, score: d.score || 0 }));
  return { synonyms };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const type = body?.type;
    const word = (body?.word ?? "").toString();

    if (!word.trim()) {
      return new Response(JSON.stringify({ error: true, message: "Missing word" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let result: any;
    if (type === "dictionary") {
      result = await handleDictionary(word);
    } else if (type === "collocation") {
      result = await handleCollocation(word);
    } else if (type === "thesaurus") {
      result = await handleThesaurus(word);
    } else {
      return new Response(JSON.stringify({ error: true, message: "Invalid type" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("dictionary-lookup error", e);
    return new Response(JSON.stringify({ error: true, message: "Internal error" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

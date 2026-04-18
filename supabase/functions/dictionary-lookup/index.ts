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

// Common English stopwords + punctuation that pollute bigram results
const COLLOCATION_STOPWORDS = new Set([
  "the", "a", "an", "to", "of", "in", "on", "at", "by", "for", "with", "from", "as", "into", "onto", "upon",
  "and", "or", "but", "nor", "so", "yet", "if", "that", "this", "these", "those", "it", "its", "his", "her",
  "their", "our", "your", "my", "me", "him", "them", "us", "we", "you", "they", "he", "she", "i",
  "is", "am", "are", "was", "were", "be", "been", "being", "do", "does", "did", "have", "has", "had",
  "will", "would", "shall", "should", "can", "could", "may", "might", "must", "ought",
  "not", "no", "yes", "very", "too", "also", "just", "only", "even", "still", "ever", "never",
  "any", "some", "all", "each", "every", "both", "few", "many", "much", "most", "more", "less",
  "what", "which", "who", "whom", "whose", "when", "where", "why", "how",
  "up", "down", "out", "over", "off", "back", "away", "around", "through", "across",
]);

async function handleCollocation(word: string) {
  const w = word.trim().toLowerCase();
  // Datamuse bigram queries return real co-occurrence data:
  // - rel_bga=W → words that frequently FOLLOW W (next word in bigram)
  // - rel_bgb=W → words that frequently PRECEDE W (previous word in bigram)
  // - rel_jja=W → adjectives that modify the noun W (PRECEDE W when W is a noun)
  // - rel_jjb=W → nouns often modified by the adjective W (FOLLOW W when W is an adjective)
  const [followers, preceders, adjMod, nounMod] = await Promise.all([
    fetchJSONWithRetry(`https://api.datamuse.com/words?rel_bga=${encodeURIComponent(w)}&max=30`),
    fetchJSONWithRetry(`https://api.datamuse.com/words?rel_bgb=${encodeURIComponent(w)}&max=30`),
    fetchJSONWithRetry(`https://api.datamuse.com/words?rel_jja=${encodeURIComponent(w)}&max=15`),
    fetchJSONWithRetry(`https://api.datamuse.com/words?rel_jjb=${encodeURIComponent(w)}&max=15`),
  ]);

  if (!followers.ok && !preceders.ok && !adjMod.ok && !nounMod.ok) {
    if (followers.status === 0 && preceders.status === 0 && adjMod.status === 0 && nounMod.status === 0) {
      return { error: true, message: "Lookup service is busy" };
    }
  }

  const clean = (res: any) =>
    (res.ok ? res.data : [])
      .map((d: any) => (d.word || "").toLowerCase().trim())
      .filter((x: string) =>
        x &&
        x !== w &&
        x.length > 1 &&
        !x.includes(" ") &&
        /^[a-z'-]+$/.test(x) &&
        !COLLOCATION_STOPWORDS.has(x),
      );

  // LEFT column "___ + W" → words that come BEFORE the search word
  // Prioritize adjective modifiers (cleanest collocations), then bigram preceders
  const left = [...new Set([...clean(adjMod), ...clean(preceders)])].slice(0, 12);
  // RIGHT column "W + ___" → words that come AFTER the search word
  const right = [...new Set([...clean(followers), ...clean(nounMod)])].slice(0, 12);

  return { left, right };
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

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

async function rerankCollocations(word: string, leftCandidates: string[], rightCandidates: string[]) {
  const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
  if (!apiKey) {
    return { left: leftCandidates.slice(0, 8), right: rightCandidates.slice(0, 8) };
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
              "You are a strict English collocation filter. Keep only natural, common English collocations. Remove noise, grammar words, semantically unrelated words, morphology artifacts, and awkward combinations. Return JSON only: {\"left\": string[], \"right\": string[]}. Max 8 items per side.",
          },
          {
            role: "user",
            content: JSON.stringify({
              word,
              leftMeaning: "words that naturally come before the target word",
              rightMeaning: "words that naturally come after the target word",
              leftCandidates,
              rightCandidates,
            }),
          },
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      return { left: leftCandidates.slice(0, 8), right: rightCandidates.slice(0, 8) };
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      return { left: leftCandidates.slice(0, 8), right: rightCandidates.slice(0, 8) };
    }

    const parsed = JSON.parse(match[0]);
    return {
      left: Array.isArray(parsed?.left) ? parsed.left.slice(0, 8) : leftCandidates.slice(0, 8),
      right: Array.isArray(parsed?.right) ? parsed.right.slice(0, 8) : rightCandidates.slice(0, 8),
    };
  } catch {
    return { left: leftCandidates.slice(0, 8), right: rightCandidates.slice(0, 8) };
  }
}

async function handleCollocation(word: string) {
  const w = word.trim().toLowerCase();
  const [afterBigram, beforeBigram, trigger, adjBeforeNoun, nounAfterAdj] = await Promise.all([
    fetchJSONWithRetry(`https://api.datamuse.com/words?rel_bga=${encodeURIComponent(w)}&max=30`),
    fetchJSONWithRetry(`https://api.datamuse.com/words?rel_bgb=${encodeURIComponent(w)}&max=30`),
    fetchJSONWithRetry(`https://api.datamuse.com/words?rel_trg=${encodeURIComponent(w)}&max=20`),
    fetchJSONWithRetry(`https://api.datamuse.com/words?rel_jjb=${encodeURIComponent(w)}&max=20`),
    fetchJSONWithRetry(`https://api.datamuse.com/words?rel_jja=${encodeURIComponent(w)}&max=20`),
  ]);

  if (!afterBigram.ok && !beforeBigram.ok && !trigger.ok && !adjBeforeNoun.ok && !nounAfterAdj.ok) {
    if (
      afterBigram.status === 0 &&
      beforeBigram.status === 0 &&
      trigger.status === 0 &&
      adjBeforeNoun.status === 0 &&
      nounAfterAdj.status === 0
    ) {
      return { error: true, message: "Lookup service is busy" };
    }
  }

  const stopwords = new Set([
    "the", "a", "an", "to", "of", "in", "on", "at", "by", "for", "with", "from", "as", "into",
    "and", "or", "but", "if", "that", "this", "these", "those", "it", "its", "his", "her", "their",
    "our", "your", "my", "me", "him", "them", "us", "we", "you", "they", "he", "she", "i",
    "is", "am", "are", "was", "were", "be", "been", "being", "do", "does", "did", "have", "has", "had",
    "will", "would", "shall", "should", "can", "could", "may", "might", "must", "not", "no", "yes",
    "very", "too", "also", "just", "only", "even", "still", "ever", "never", "any", "some", "all",
    "what", "which", "who", "when", "where", "why", "how", ".",
  ]);

  const clean = (res: { ok: boolean; data: any }) =>
    (res.ok ? res.data : [])
      .map((d: any) => (d.word || "").toLowerCase().trim())
      .filter((x: string) => x && x !== w && x.length > 1 && !x.includes(" ") && /^[a-z'-]+$/.test(x) && !stopwords.has(x));

  const leftCandidates = [...new Set([
    ...clean(adjBeforeNoun),
    ...clean(beforeBigram),
  ])].slice(0, 16);

  const rightCandidates = [...new Set([
    ...clean(trigger),
    ...clean(nounAfterAdj),
    ...clean(afterBigram),
  ])].slice(0, 20);

  const reranked = await rerankCollocations(w, leftCandidates, rightCandidates);
  return { left: reranked.left, right: reranked.right };
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

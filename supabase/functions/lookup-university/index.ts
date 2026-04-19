/**
 * Edge function: lookup-university
 * Uses Perplexity AI to fetch real-time data for universities not in the static dataset.
 * Returns JSON: { name, country, qsRanking, tuitionUsd, livingCostUsd, postStudyVisaMonths, programsHighlight, websiteUrl }
 */
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface UniversityResult {
  name: string;
  country: string;
  flag: string;
  city: string;
  qsRanking: number;
  tuitionUsd: number;
  livingCostUsd: number;
  postStudyVisaMonths: number;
  programsHighlight: string[];
  websiteUrl: string;
}

function extractJson(text: string): any {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) {
      return new Response(
        JSON.stringify({ error: "PERPLEXITY_API_KEY missing" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { query } = await req.json();
    if (!query || typeof query !== "string" || query.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: "query (string) required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const prompt = `You are a study abroad data assistant. Return ONLY a JSON object (no prose) with verified facts about the university "${query.trim()}".

Schema:
{
  "name": "official English name",
  "country": "country name",
  "flag": "country emoji flag",
  "city": "main campus city",
  "qsRanking": integer (QS World University Ranking 2025; use 9999 if unranked),
  "tuitionUsd": integer (avg international tuition USD/year),
  "livingCostUsd": integer (estimated living cost USD/year),
  "postStudyVisaMonths": integer (post-study work visa duration in months for that country),
  "programsHighlight": ["3 strongest fields"],
  "websiteUrl": "official website URL with https://"
}

If the university does not exist, return: {"error": "not found"}.`;

    const resp = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "Return only valid JSON. No prose, no markdown." },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Perplexity error:", resp.status, errText);
      return new Response(
        JSON.stringify({ error: `Lookup failed (${resp.status})` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content || "";
    const parsed = extractJson(content);
    if (!parsed) {
      return new Response(
        JSON.stringify({ error: "Could not parse university data" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (parsed.error) {
      return new Response(
        JSON.stringify({ error: parsed.error }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Defensive normalization
    const normalized: UniversityResult = {
      name: String(parsed.name || query.trim()),
      country: String(parsed.country || "Unknown"),
      flag: String(parsed.flag || "🌍"),
      city: String(parsed.city || ""),
      qsRanking: Number.isFinite(parsed.qsRanking) ? Math.round(parsed.qsRanking) : 9999,
      tuitionUsd: Number.isFinite(parsed.tuitionUsd) ? Math.round(parsed.tuitionUsd) : 0,
      livingCostUsd: Number.isFinite(parsed.livingCostUsd) ? Math.round(parsed.livingCostUsd) : 0,
      postStudyVisaMonths: Number.isFinite(parsed.postStudyVisaMonths) ? Math.round(parsed.postStudyVisaMonths) : 0,
      programsHighlight: Array.isArray(parsed.programsHighlight) ? parsed.programsHighlight.slice(0, 5).map(String) : [],
      websiteUrl: String(parsed.websiteUrl || ""),
    };

    return new Response(JSON.stringify(normalized), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("lookup-university error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

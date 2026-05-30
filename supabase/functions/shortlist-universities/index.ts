/**
 * shortlist-universities — Perplexity-powered university shortlist generator.
 * Input: student profile (gpa, test scores, field, budget, target country, level)
 * Output: 9 universities (3 reach, 3 target, 3 safety) with fit score & rationale.
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const schema = {
  type: "object",
  properties: {
    universities: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          country: { type: "string" },
          program: { type: "string" },
          category: { type: "string", enum: ["reach", "target", "safety"] },
          fit_score: { type: "integer", minimum: 0, maximum: 100 },
          tuition_usd_per_year: { type: "number" },
          scholarship_available: { type: "boolean" },
          deadline: { type: "string" },
          rationale: { type: "string" },
          url: { type: "string" },
        },
        required: ["name", "country", "program", "category", "fit_score", "rationale"],
      },
    },
  },
  required: ["universities"],
};

function repairJson(s: string): string {
  return s.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { field, level, country, gpa, testScore, testType, budgetUsd, language } = await req.json();

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY missing");

    const lang = language === "vi" ? "Vietnamese" : "English";

    const userPrompt = `Recommend exactly 9 universities for this student: 3 REACH (challenging admit), 3 TARGET (likely admit), 3 SAFETY (very likely admit). Use up-to-date 2026 admission data and program information.

Student profile:
- Field: ${field || "Computer Science"}
- Level: ${level || "Master's"}
- Target country/region: ${country || "Open"}
- GPA: ${gpa || "N/A"}
- Standardized test: ${testType || "N/A"} ${testScore || ""}
- Annual budget (USD incl. scholarship): ${budgetUsd || "Flexible"}

For each university provide: name, country, exact program name, category, fit_score (0-100), tuition_usd_per_year (number), scholarship_available (boolean), deadline (e.g. "Jan 15, 2026"), 2-3 sentence rationale in ${lang}, and official program URL.

Return ONLY valid JSON. No markdown fences. No commentary.`;

    const aiRes = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: "You are an expert admissions consultant with real-time access to global university data. Be accurate and cite current 2026 information." },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        response_format: { type: "json_schema", json_schema: { name: "shortlist", schema } },
      }),
    });

    if (aiRes.status === 429) return new Response(JSON.stringify({ error: "rate_limited" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("Perplexity err", aiRes.status, t);
      throw new Error(`AI error ${aiRes.status}`);
    }
    const data = await aiRes.json();
    const raw = data.choices?.[0]?.message?.content || "{}";
    let parsed;
    try {
      parsed = JSON.parse(repairJson(raw));
    } catch {
      const m = raw.match(/\{[\s\S]*\}/);
      parsed = m ? JSON.parse(m[0]) : { universities: [] };
    }

    return new Response(JSON.stringify({ ...parsed, citations: data.citations || [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("shortlist-universities error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

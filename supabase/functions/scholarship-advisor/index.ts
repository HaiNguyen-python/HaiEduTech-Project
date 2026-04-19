// AI Scholarship Advisor — Perplexity online search
// Returns structured JSON with personalized scholarships + checklists.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AdvisorInput {
  dream?: string;
  level?: string;
  gpa?: string;
  country?: string;
  field?: string;
  scholarshipType?: string;
  language?: "en" | "vi";
}

async function logUsage(
  fn: string,
  model: string,
  tokens: number,
  status: string,
  err?: string,
) {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    await supabase.from("api_usage_log").insert({
      function_name: fn,
      model,
      domain: "scholarship",
      tokens_used: tokens,
      status,
      error_message: err ?? null,
    });
  } catch (e) {
    console.error("logUsage failed", e);
  }
}

function extractJson(text: string): any {
  // Strip code fences and parse the first JSON object found.
  const cleaned = text.replace(/```json\s*|\s*```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e) {
        console.error("JSON repair failed", e);
      }
    }
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "PERPLEXITY_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body: AdvisorInput = await req.json();
    const {
      dream = "",
      level = "",
      gpa = "",
      country = "",
      field = "",
      scholarshipType = "",
      language = "en",
    } = body;

    const profile = `
- Current Study Level: ${level || "not specified"}
- GPA / Academic Performance: ${gpa || "not specified"}
- Target Country/Region: ${country || "open / any"}
- Target Field of Study: ${field || "not specified"}
- Preferred Scholarship Type: ${scholarshipType || "any"}
- Student's own description: ${dream || "(none provided)"}
`.trim();

    const langInstruction =
      language === "vi"
        ? "Respond in Vietnamese (Tiếng Việt) for all human-readable text fields."
        : "Respond in English for all human-readable text fields.";

    const systemPrompt = `You are an expert international education consultant. You search the live internet (year 2025-2026) to find ACTIVE, CURRENTLY OPEN scholarships. Avoid expired or generic well-known scholarships (Fulbright, Chevening, Erasmus Mundus) unless the student is from an underserved region or specifically asks for them. Prioritize lesser-known but high-value funded programs. ${langInstruction}

You MUST return ONLY a single JSON object — no prose, no markdown, no code fences. Schema:
{
  "summary": "2-3 sentence overview tailored to the student",
  "scholarships": [
    {
      "name": "Full official scholarship name",
      "host": "Host institution / Country",
      "deadline": "Specific deadline or rolling (with year)",
      "deadlineUrgency": "tight" | "normal" | "rolling",
      "fundingType": "Full" | "Partial" | "Research" | "Tuition only",
      "eligibility": "Concrete eligibility incl GPA, language, age",
      "eligibilityMatch": "high" | "medium" | "low",
      "documents": ["Doc 1", "Doc 2", "..."],
      "motivationLetterOutline": ["Para 1: ...", "Para 2: ...", "..."],
      "applyUrl": "Direct application URL if known",
      "whyMatch": "1-2 sentences why it fits this student"
    }
  ]
}
Return 5 scholarships. Keep entries factual; if unsure of a field, write "Verify on official site".`;

    const userPrompt = `Find 5 ACTIVE, NON-OBVIOUS, fully or substantially funded scholarships for this student. Search the live web for 2025-2026 cycles only.

STUDENT PROFILE:
${profile}

Return ONLY the JSON object per the schema. No commentary.`;

    const pplxRes = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 3000,
        return_citations: true,
        search_recency_filter: "year",
      }),
    });

    if (!pplxRes.ok) {
      const errText = await pplxRes.text();
      await logUsage("scholarship-advisor", "sonar", 0, "error", errText);
      const status = pplxRes.status === 429 ? 429 : pplxRes.status === 402 ? 402 : 500;
      return new Response(
        JSON.stringify({
          error:
            status === 429
              ? "Rate limit reached. Please try again in a moment."
              : status === 402
                ? "AI credits exhausted. Please contact support."
                : "AI service error. Please try again.",
        }),
        { status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const pplxData = await pplxRes.json();
    const content = pplxData?.choices?.[0]?.message?.content ?? "";
    const tokens = pplxData?.usage?.total_tokens ?? 0;
    const citations = pplxData?.citations ?? [];

    const parsed = extractJson(content);
    if (!parsed || !Array.isArray(parsed.scholarships)) {
      await logUsage(
        "scholarship-advisor",
        "sonar",
        tokens,
        "parse_error",
        content.slice(0, 500),
      );
      return new Response(
        JSON.stringify({
          error: "Could not parse AI response. Please rephrase and try again.",
          raw: content,
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    await logUsage("scholarship-advisor", "sonar", tokens, "success");

    return new Response(
      JSON.stringify({ ...parsed, citations }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("advisor error", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    await logUsage("scholarship-advisor", "sonar", 0, "exception", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

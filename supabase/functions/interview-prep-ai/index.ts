/**
 * interview-prep-ai — Perplexity-powered admission interview prep.
 * Modes:
 *   - "questions": generate N likely interview questions tailored to program & university
 *   - "feedback": evaluate a candidate's answer with score + improvements
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function repairJson(s: string): string {
  return s.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
}

const questionsSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          q: { type: "string" },
          category: { type: "string" },
          why: { type: "string" },
          model_answer_outline: { type: "string" },
        },
        required: ["q", "category", "why", "model_answer_outline"],
      },
    },
  },
  required: ["questions"],
};

const feedbackSchema = {
  type: "object",
  properties: {
    score: { type: "integer", minimum: 0, maximum: 100 },
    strengths: { type: "array", items: { type: "string" } },
    weaknesses: { type: "array", items: { type: "string" } },
    improved_answer: { type: "string" },
    follow_up_question: { type: "string" },
  },
  required: ["score", "strengths", "weaknesses", "improved_answer", "follow_up_question"],
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const body = await req.json();
    const { mode, university, program, level, language } = body;
    const lang = language === "vi" ? "Vietnamese" : "English";

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY missing");

    let systemPrompt = "";
    let userPrompt = "";
    let schema;

    if (mode === "feedback") {
      const { question, answer } = body;
      systemPrompt = `You are an admissions interviewer at top global universities. Evaluate candidate answers with realistic scoring. Return ONLY valid JSON.`;
      userPrompt = `Program: ${program || "N/A"} at ${university || "N/A"} (${level || "Master's"})
Question: ${question}
Candidate answer: ${answer}

Score 0-100 (be honest, most first attempts are 50-70). Give 2-3 strengths, 2-3 weaknesses, an improved answer (~120 words) in ${lang}, and one likely follow-up question. Return ONLY JSON.`;
      schema = feedbackSchema;
    } else {
      systemPrompt = `You are an admissions interview coach with current data on ${university || "top universities"}'s interview style. Generate realistic, program-specific questions. Return ONLY valid JSON.`;
      userPrompt = `Generate 10 likely admission interview questions for: ${program || "this program"} at ${university || "this university"} (${level || "Master's"}).
Mix categories: motivation, academic background, research/project, why-this-program, behavioral, technical/field-specific, future plans.
For each: q (question), category, why (why interviewer asks), model_answer_outline (3-5 bullet points in ${lang}). Return ONLY JSON.`;
      schema = questionsSchema;
    }

    const aiRes = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.4,
        response_format: { type: "json_schema", json_schema: { name: mode === "feedback" ? "feedback" : "questions", schema } },
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
      parsed = m ? JSON.parse(m[0]) : {};
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("interview-prep-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

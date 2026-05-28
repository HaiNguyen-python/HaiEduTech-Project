// Edge function: draft a single section of a PhD research proposal using Perplexity AI.
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SECTION_GUIDES: Record<string, { focus: string; words: string }> = {
  title: { focus: "Generate a single concise dissertation title (10–15 words) with independent variable, dependent variable, and scope. Output only the title, no commentary.", words: "10–15 words" },
  background: { focus: "Write a tight academic Background section. Explain why the topic matters NOW. Reference 2 recent real or plausible papers with author + year. No bullet points.", words: "180–250 words" },
  question: { focus: "Write 2–3 numbered Research Questions, each with a one-line testable hypothesis (H1, H2…). Clear, measurable, specific.", words: "120–180 words" },
  gap: { focus: "Identify 1–2 specific gaps in current literature that this PhD will address. Be concrete, not vague.", words: "120–180 words" },
  methodology: { focus: "Write a Methodology section: dataset, model/approach, baselines for comparison, evaluation metrics, experimental design. Use short paragraphs.", words: "200–280 words" },
  timeline: { focus: "Write a realistic 3–4 year PhD timeline broken down by year (Y1, Y2, Y3, Y4). Each year a paragraph or 2–3 bullets.", words: "150–220 words" },
  contribution: { focus: "Write Expected Contributions: concrete outputs (papers, datasets, frameworks, real-world applications) and impact for academia + industry.", words: "150–220 words" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { section, topic, context, language } = await req.json();
    if (!section || !topic) {
      return new Response(JSON.stringify({ error: "Missing section or topic" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY missing");

    const guide = SECTION_GUIDES[section] || SECTION_GUIDES.background;
    const lang = language === "vi" ? "Vietnamese" : "English";

    const userPrompt = `Write the "${section}" section of a PhD research proposal.

Topic: ${topic}

Previous sections (for context):
${context || "(none)"}

Instructions:
- ${guide.focus}
- Target length: ${guide.words}
- Language: ${lang}
- Academic tone, precise vocabulary
- Do NOT include section headers, just the content
- Do NOT include disclaimers like "Here is..." or "I suggest..."`;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "You are a senior PhD admissions consultant and academic editor. You write proposal sections that look like they were written by a strong PhD applicant — specific, defensible, and well-cited." },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.4,
        max_tokens: 900,
      }),
    });
    if (!response.ok) {
      const t = await response.text();
      console.error("Perplexity error:", response.status, t);
      throw new Error(`AI error ${response.status}`);
    }
    const data = await response.json();
    const suggestion = data.choices?.[0]?.message?.content?.trim() || "";
    return new Response(JSON.stringify({ suggestion }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("draft-research-proposal-section error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

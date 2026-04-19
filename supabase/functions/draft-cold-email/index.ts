// Edge function: draft a cold email to a PhD supervisor using Perplexity AI.
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { studentName, professorName, university, researchArea, paperOrProject, masterThesis, achievement, intakeYear, language } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY missing");

    const lang = language === "vi" ? "Vietnamese" : "English";

    const prompt = `Write a professional cold email to a PhD supervisor in ${lang}. Maximum 200 words. Output the Subject line on the first line, then a blank line, then the body. Use the student's profile below. Reference ONE specific paper or project. Be specific and quantitative.

Student: ${studentName || "[Name]"}
Professor: ${professorName || "[Professor]"} at ${university || "[University]"}
Research area: ${researchArea || "[area]"}
Specific paper/project to reference: ${paperOrProject || "[their recent work]"}
Student's Master thesis topic: ${masterThesis || "[thesis]"}
Quantitative achievement: ${achievement || "[result]"}
Intake year: ${intakeYear || "Fall 2026"}

The email must:
- Have a clear subject line
- Open with one specific reference to the professor's work
- Mention the student's most relevant achievement with a number
- Ask specifically if they are accepting PhD students
- Mention attached CV + research statement
- Sound human, not generic`;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "You are a senior PhD admissions consultant. You craft cold emails that get replies from professors." },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 700,
      }),
    });
    if (!response.ok) {
      const t = await response.text();
      console.error("Perplexity error:", response.status, t);
      throw new Error(`AI error ${response.status}`);
    }
    const data = await response.json();
    const email = data.choices?.[0]?.message?.content || "";
    return new Response(JSON.stringify({ email }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("draft-cold-email error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

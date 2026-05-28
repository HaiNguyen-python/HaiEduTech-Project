// Edge function: draft a cold email to a PhD supervisor using Perplexity AI.
// v2: supports tone, length, optional follow-up email.
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TONE_INSTRUCTION: Record<string, string> = {
  formal: "Use a formal, respectful academic tone. Address as 'Dear Professor X'.",
  friendly: "Use a warm, friendly but still professional tone. Address as 'Dear Prof. X'. Use natural, human phrasing.",
  concise: "Use a direct, concise tone. No filler. Address as 'Dear Prof. X'. Short sentences.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const body = await req.json();
    const {
      studentName, professorName, university, researchArea, paperOrProject,
      masterThesis, achievement, intakeYear, language,
      tone = "formal",
      length = 200,
      followUp = false,
    } = body;

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY missing");

    const lang = language === "vi" ? "Vietnamese" : "English";
    const toneInstr = TONE_INSTRUCTION[tone as string] || TONE_INSTRUCTION.formal;
    const targetWords = Number(length) || 200;

    const profile = `Student: ${studentName || "[Name]"}
Professor: ${professorName || "[Professor]"} at ${university || "[University]"}
Research area: ${researchArea || "[area]"}
Specific paper/project to reference: ${paperOrProject || "[their recent work]"}
Student's Master thesis topic: ${masterThesis || "[thesis]"}
Quantitative achievement: ${achievement || "[result]"}
Intake year: ${intakeYear || "Fall 2026"}`;

    const mainPrompt = `Write a professional cold email to a PhD supervisor in ${lang}. Target length ~${targetWords} words (±40). Output the Subject line on the first line, then a blank line, then the body. ${toneInstr}

${profile}

The email must:
- Have a clear subject line
- Open with one specific reference to the professor's work
- Mention the student's most relevant achievement with a number
- Ask specifically if they are accepting PhD students
- Mention attached CV + research statement
- Sound human, not generic`;

    const callAi = async (prompt: string, max_tokens: number) => {
      const r = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "sonar",
          messages: [
            { role: "system", content: "You are a senior PhD admissions consultant. You craft cold emails that get replies from professors." },
            { role: "user", content: prompt },
          ],
          temperature: 0.4,
          max_tokens,
        }),
      });
      if (!r.ok) {
        const t = await r.text();
        console.error("Perplexity error:", r.status, t);
        throw new Error(`AI error ${r.status}`);
      }
      const d = await r.json();
      return d.choices?.[0]?.message?.content?.trim() || "";
    };

    const email = await callAi(mainPrompt, Math.max(500, targetWords * 4));

    let followUpEmail = "";
    if (followUp) {
      const followUpPrompt = `Write a short polite follow-up email (in ${lang}, ~90 words) to be sent 7 days after the original email below received no reply. Output Subject line first, blank line, then body. Reference the original briefly. Keep it warm but not pushy. ${toneInstr}

Original email context:
${profile}

Original email (for reference):
${email}`;
      followUpEmail = await callAi(followUpPrompt, 500);
    }

    return new Response(JSON.stringify({ email, followUpEmail }), {
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

// Career Roadmap AI - Perplexity sonar-pro powered personalized IT career planning
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `You are a senior tech career mentor at HaiEduTech, with 15+ years of experience in Data Engineering, AI, and Software Engineering (background: Data Engineer in Finland).
You produce highly actionable, personalized career roadmaps for IT roles, with deep expertise in Data Engineer & AI specializations.
Your tone: friendly, direct, no fluff. Cite real-world tools, courses, certifications, and project ideas.
ALWAYS return STRICT JSON only - no markdown, no code fences, no explanations outside JSON.`;

function buildPrompt(input: any) {
  const { role, currentLevel, background, hoursPerWeek, targetMonths, language } = input;
  const lang = language === "vi" ? "Vietnamese" : "English";
  return `Create a detailed personalized learning & practice roadmap for someone aiming to become a **${role}**.

Student profile:
- Current level: ${currentLevel}
- Background: ${background || "none"}
- Available study time: ${hoursPerWeek} hours/week
- Target timeline: ${targetMonths} months

Output language: ${lang} (write all human-facing text in ${lang}, but keep tech names/tools in English).

Return STRICT JSON with this exact shape:
{
  "roleSummary": "2-3 sentences about this role: what they do, salary range in Vietnam (VND/month) and Europe (EUR/year), market demand 2026",
  "coreSkills": [
    { "skill": "string", "importance": "must-have | nice-to-have", "why": "1 short sentence" }
  ],
  "phases": [
    {
      "phase": "Phase 1: Foundation",
      "durationWeeks": number,
      "goals": ["3-5 concrete learning goals"],
      "topics": ["specific topics/concepts to master"],
      "resources": [
        { "name": "Course/book/site name", "type": "course | book | docs | youtube", "url": "real URL or empty string", "free": true }
      ],
      "practiceProjects": [
        { "title": "Project name", "description": "1-2 sentences", "difficulty": "easy | medium | hard", "skillsApplied": ["skill1", "skill2"] }
      ],
      "milestone": "What student should be able to do at end of this phase"
    }
  ],
  "certifications": [
    { "name": "string", "provider": "string", "priority": "high | medium | low", "costUsd": number, "whenToTake": "after which phase" }
  ],
  "portfolioProjects": [
    { "title": "string", "description": "2-3 sentences", "techStack": ["tool1", "tool2"], "showcaseTip": "what to highlight in CV/interview" }
  ],
  "interviewPrep": {
    "topicsToReview": ["topic1", "topic2"],
    "commonQuestions": ["3-5 frequently asked technical questions"],
    "behavioralTips": "1-2 sentences"
  },
  "jobSearchStrategy": {
    "targetCompanies": ["3-5 company types or names relevant to the role"],
    "platformsToUse": ["LinkedIn", "..."],
    "cvHighlights": ["what to put on CV"]
  },
  "weeklySchedule": {
    "weekdays": "What to do on weekdays (1-2 sentences)",
    "weekends": "What to do on weekends (1-2 sentences)",
    "dailyHabits": ["3-4 daily habits to build"]
  },
  "warningTraps": ["3-5 common mistakes beginners make in this path - be brutally honest"],
  "haiEduRecommendation": "1-2 sentences on which HaiEduTech modules (Python Pathway, SQL, ML, Data Eng, Cloud, Software Eng, AI Foundation) to start with based on this profile"
}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const input = await req.json();
    if (!input?.role) {
      return new Response(JSON.stringify({ success: false, error: "Missing role" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!apiKey) throw new Error("PERPLEXITY_API_KEY not configured");

    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: buildPrompt(input) },
        ],
        temperature: 0.2,
        max_tokens: 3500,
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("[career-roadmap-ai] perplexity err", res.status, txt);
      return new Response(
        JSON.stringify({ success: false, error: `Perplexity error ${res.status}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();
    let content = data.choices?.[0]?.message?.content || "{}";
    content = content.replace(/```json\n?/gi, "").replace(/```\n?/g, "").trim();
    const match = content.match(/\{[\s\S]*\}/);
    let raw = match ? match[0] : content;

    const tryParse = (s: string) => { try { return JSON.parse(s); } catch { return null; } };

    let parsed: any = tryParse(raw);
    if (!parsed) {
      // Repair: remove trailing commas
      parsed = tryParse(raw.replace(/,(\s*[\]\}])/g, "$1"));
    }
    if (!parsed) {
      // Repair: truncated JSON - close open strings/brackets
      let s = raw;
      // remove trailing comma
      s = s.replace(/,\s*$/, "");
      // count unmatched quotes (rough): if odd, append "
      const quoteCount = (s.match(/(?<!\\)"/g) || []).length;
      if (quoteCount % 2 === 1) s += '"';
      // strip dangling ", key:" or trailing comma
      s = s.replace(/,\s*"[^"]*"\s*:\s*$/, "");
      s = s.replace(/,\s*"[^"]*"?\s*$/, "");
      s = s.replace(/,(\s*[\]\}])/g, "$1");
      // close unmatched brackets
      const opens = (s.match(/[\{\[]/g) || []).length;
      const closes = (s.match(/[\}\]]/g) || []).length;
      const stack: string[] = [];
      for (const ch of s) {
        if (ch === '{') stack.push('}');
        else if (ch === '[') stack.push(']');
        else if (ch === '}' || ch === ']') stack.pop();
      }
      while (stack.length) s += stack.pop();
      parsed = tryParse(s);
    }
    if (!parsed) {
      console.error("[career-roadmap-ai] JSON repair failed, raw length:", raw.length);
      return new Response(
        JSON.stringify({ success: false, error: "AI returned malformed JSON, please try again" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }


    const citations = data.citations || [];

    return new Response(
      JSON.stringify({ success: true, roadmap: parsed, citations }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("[career-roadmap-ai] error:", e);
    return new Response(
      JSON.stringify({ success: false, error: e instanceof Error ? e.message : String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

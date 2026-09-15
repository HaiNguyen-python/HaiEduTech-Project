// Career Roadmap AI - Perplexity sonar-pro powered personalized IT career planning
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "npm:zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `You are a senior tech career mentor at HaiEduTech, with 15+ years of experience in Data Engineering, AI, and Software Engineering (background: Data Engineer in Finland).
You produce highly actionable, personalized career roadmaps for IT roles, with deep expertise in Data Engineer & AI specializations.
Your tone: friendly, direct, no fluff. Cite real-world tools, courses, certifications, and project ideas.
ALWAYS return STRICT JSON only - no markdown, no code fences, no explanations outside JSON.`;

const requestSchema = z.object({
  role: z.string().trim().min(1).max(80),
  currentLevel: z.string().trim().min(1).max(60),
  background: z.string().trim().max(800).default(""),
  hoursPerWeek: z.number().int().min(1).max(80),
  targetMonths: z.number().int().min(1).max(36),
  language: z.enum(["vi", "en"]),
});

const roadmapSchema = z.object({
  roleSummary: z.string().trim().min(1).max(2400),
  coreSkills: z.array(z.object({ skill: z.string().min(1).max(120), importance: z.enum(["must-have", "nice-to-have"]), why: z.string().max(500) })).max(30).default([]),
  phases: z.array(z.object({
    phase: z.string().trim().min(1).max(160),
    durationWeeks: z.number().int().min(1).max(260).optional(),
    goals: z.array(z.string().min(1).max(500)).max(20).default([]),
    topics: z.array(z.string().min(1).max(100)).max(30).default([]),
    resources: z.array(z.object({ name: z.string().min(1).max(160), type: z.enum(["course", "book", "docs", "youtube"]), url: z.string().max(500), free: z.boolean() })).max(20).default([]),
    practiceProjects: z.array(z.object({ title: z.string().min(1).max(160), description: z.string().max(800), difficulty: z.enum(["easy", "medium", "hard"]), skillsApplied: z.array(z.string().max(80)).max(20) })).max(20).default([]),
    milestone: z.string().max(800).default(""),
  })).min(1).max(16),
  certifications: z.array(z.object({ name: z.string().min(1).max(180), provider: z.string().max(120), priority: z.enum(["high", "medium", "low"]), costUsd: z.number().min(0).max(100000), whenToTake: z.string().max(300) })).max(20).default([]),
  portfolioProjects: z.array(z.object({ title: z.string().min(1).max(180), description: z.string().max(1200), techStack: z.array(z.string().max(80)).max(30), showcaseTip: z.string().max(800) })).max(20).default([]),
  interviewPrep: z.object({ topicsToReview: z.array(z.string().max(120)).max(30), commonQuestions: z.array(z.string().max(500)).max(20), behavioralTips: z.string().max(1200) }).optional(),
  jobSearchStrategy: z.object({ targetCompanies: z.array(z.string().max(160)).max(20), platformsToUse: z.array(z.string().max(120)).max(20), cvHighlights: z.array(z.string().max(500)).max(20) }).optional(),
  weeklySchedule: z.object({ weekdays: z.string().max(1000), weekends: z.string().max(1000), dailyHabits: z.array(z.string().max(300)).max(20) }).optional(),
  warningTraps: z.array(z.string().max(500)).max(20).default([]),
  haiEduRecommendation: z.string().max(1600).default(""),
});

const requestTimes = new Map<string, number[]>();
const isRateLimited = (key: string) => {
  const now = Date.now();
  const recent = (requestTimes.get(key) || []).filter((time) => now - time < 60_000);
  recent.push(now);
  requestTimes.set(key, recent);
  return recent.length > 5;
};

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
    const rateLimitKey = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
    if (isRateLimited(rateLimitKey)) {
      return new Response(JSON.stringify({ success: false, error: "rate_limited" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parsedInput = requestSchema.safeParse(await req.json());
    if (!parsedInput.success) {
      return new Response(JSON.stringify({ success: false, error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const input = parsedInput.data;

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
        max_tokens: 5000,
      }),
      signal: AbortSignal.timeout(35_000),
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


    const validated = roadmapSchema.safeParse(parsed);
    if (!validated.success) {
      console.error("[career-roadmap-ai] invalid roadmap shape");
      return new Response(
        JSON.stringify({ success: false, error: "AI returned an incomplete roadmap" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const citations = Array.isArray(data.citations)
      ? data.citations.filter((value: unknown) => typeof value === "string").slice(0, 8)
      : [];

    return new Response(
      JSON.stringify({ success: true, roadmap: validated.data, citations }),
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

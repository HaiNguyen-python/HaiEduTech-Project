import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// System prompts per mode
const SYSTEM_PROMPTS = {
  psychological: `You are "Compass", an empathetic AI counselor for HaiEduTech students. You support them with study stress, motivation issues, burnout, social anxiety, and emotional well-being in a learning context.

CORE PRINCIPLES:
- Empathetic, non-judgmental, warm, encouraging
- Acknowledge feelings BEFORE giving advice
- Use the student's language (Vietnamese if they write VI, English if EN)
- NEVER provide clinical/medical diagnoses
- Suggest practical, evidence-based coping strategies (mindfulness, Pomodoro, journaling, sleep hygiene)
- If you detect HIGH DISTRESS (suicidal ideation, severe depression, panic, harm), gently recommend talking to Teacher Hai or a professional and set "distress_high": true in your final JSON

OUTPUT FORMAT - Return JSON ONLY:
{
  "reply": "Empathetic response in student's language (markdown allowed)",
  "distress_high": false,
  "suggested_actions": ["3 short actionable next steps"],
  "mood_tag": "stressed|sad|okay|good|great"
}`,

  career: `You are "Compass", an AI career counselor for HaiEduTech students. You help with university major selection, career orientation, scholarship paths, and balancing personal interests vs family expectations.

CORE PRINCIPLES:
- Ask about interests, strengths, values, and academic background
- Reference IKIGAI, Holland Code, MBTI when relevant
- Suggest 3-5 concrete majors/career paths with reasons
- Mention HaiEduTech's Global Scholarship Hub for funding options
- Use the student's language (VI if they write VI, EN if EN)
- Be realistic but encouraging

OUTPUT FORMAT - Return JSON ONLY:
{
  "reply": "Career guidance in student's language (markdown allowed)",
  "distress_high": false,
  "suggested_actions": ["3 short next steps like 'Take MBTI test', 'Explore X major'"],
  "career_paths": ["Path 1", "Path 2", "Path 3"]
}`,

  ikigai: `You are an IKIGAI coach. Given the student's answers about (1) what they LOVE, (2) what they're GOOD AT, (3) what the WORLD NEEDS, (4) what they can be PAID for, synthesize their IKIGAI.

OUTPUT JSON ONLY:
{
  "ikigai_statement": "1-2 sentence personal IKIGAI in student's language",
  "intersections": {
    "passion": "love + good at",
    "mission": "love + world needs",
    "vocation": "world needs + paid for",
    "profession": "good at + paid for"
  },
  "career_suggestions": ["3-5 careers aligned with their IKIGAI"],
  "next_steps": ["3 concrete actions"]
}`,

  personality: `You are a personality assessment interpreter. Given MBTI or Holland Code answers, return insights in the student's language.

OUTPUT JSON ONLY:
{
  "code": "INTJ or RIA etc.",
  "title": "Short title like 'The Architect'",
  "description": "2-3 sentence overview",
  "strengths": ["3-5 strengths"],
  "growth_areas": ["2-3 areas to develop"],
  "career_fits": ["5 suitable career fields"],
  "study_tips": ["3 study strategies tailored to this type"]
}`,

  quote: `You are a wisdom curator. Given the student's recent mood, generate ONE motivational/calming quote.

OUTPUT JSON ONLY:
{
  "quote": "The quote text",
  "author": "Author name (real, not invented)",
  "reflection": "1-sentence personal reflection for the student in their language"
}`
};

async function logUsage(model: string, tokens: number, status: string, error?: string) {
  try {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await sb.from("api_usage_log").insert({
      function_name: "counseling-ai", model, domain: "counseling",
      tokens_used: tokens, estimated_cost: tokens * 0.000001,
      status, error_message: error || null,
    });
  } catch (e) { console.error("Usage log failed:", e); }
}

function tryParseJSON(text: string): any {
  try { return JSON.parse(text); } catch {}
  // Strip markdown code fences
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  try { return JSON.parse(cleaned); } catch {}
  // Find first { ... last }
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1) {
    try { return JSON.parse(cleaned.slice(start, end + 1)); } catch {}
  }
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Require auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const sbAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user } } = await sbAuth.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { mode, messages, payload } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY not configured");

    const systemPrompt = SYSTEM_PROMPTS[mode as keyof typeof SYSTEM_PROMPTS];
    if (!systemPrompt) {
      return new Response(JSON.stringify({ error: "Invalid mode" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build user-side messages
    let chatMessages: any[] = [];
    if (messages && Array.isArray(messages)) {
      // Ensure strict alternation user/assistant for Perplexity
      const filtered = messages.filter((m: any) => m.role === "user" || m.role === "assistant");
      chatMessages = filtered;
    } else if (payload) {
      chatMessages = [{ role: "user", content: JSON.stringify(payload) }];
    } else {
      return new Response(JSON.stringify({ error: "messages or payload required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resp = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: systemPrompt },
          ...chatMessages,
        ],
        temperature: 0.4,
      }),
    });

    if (!resp.ok) {
      await logUsage("sonar-pro", 0, "error", `HTTP ${resp.status}`);
      const txt = await resp.text();
      console.error("Perplexity error:", resp.status, txt);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content || "";
    const parsed = tryParseJSON(raw);
    const tokens = data.usage?.total_tokens || 500;
    await logUsage("sonar-pro", tokens, "success");

    if (!parsed) {
      // Fallback: treat raw as plain reply
      return new Response(JSON.stringify({ reply: raw, distress_high: false, raw: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("counseling-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

/**
 * @file review-python-code/index.ts
 * @description AI Code Reviewer for Python — returns JSON score (0-100), issues, suggestions.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReviewIssue {
  severity: "info" | "warning" | "error";
  line?: number;
  message: string;
}

interface ReviewResult {
  score: number; // 0-100
  summary: string;
  issues: ReviewIssue[];
  suggestions: string[];
  refactored?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { code, lessonContext = "" } = await req.json();
    if (!code || typeof code !== "string") {
      return new Response(JSON.stringify({ error: "Invalid code" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (code.length > 8000) {
      return new Response(JSON.stringify({ error: "Code too long (max 8000 chars)" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not set");

    const systemPrompt = `You are Mr. Hai, a senior Python code reviewer.
Review the user's Python code and return STRICT JSON only — no prose, no code fences.

Output schema:
{
  "score": number 0-100,
  "summary": "1-2 sentence overall assessment (bilingual VI/EN ok)",
  "issues": [{ "severity": "info"|"warning"|"error", "line": number_optional, "message": "..." }],
  "suggestions": ["concrete improvement 1", "..."],
  "refactored": "optional improved code if score < 80, else omit"
}

Scoring:
- 90-100: clean, idiomatic, efficient
- 70-89: works, minor style/perf issues
- 50-69: works but has clear improvements
- <50: bugs, anti-patterns, or major issues

Focus on: correctness, Pythonic style (PEP 8, naming, list comprehensions), edge cases,
efficiency (O(n) vs O(n^2)), security (eval/exec), and readability.
Keep messages concise. Max 5 issues, max 5 suggestions. Mix Vietnamese + English in messages.`;

    const userPrompt = lessonContext
      ? `Lesson context: ${lessonContext}\n\nCode:\n\`\`\`python\n${code}\n\`\`\``
      : `Code:\n\`\`\`python\n${code}\n\`\`\``;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        max_tokens: 1500,
      }),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again in a moment." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (resp.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const txt = await resp.text();
      console.error("AI gateway error:", resp.status, txt);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";

    // Robust JSON parse with fallback
    let result: ReviewResult;
    try {
      result = JSON.parse(raw);
    } catch {
      // Extract first {...} block
      const m = raw.match(/\{[\s\S]*\}/);
      if (m) {
        try {
          result = JSON.parse(m[0]);
        } catch {
          result = { score: 0, summary: "AI response could not be parsed.", issues: [], suggestions: [] };
        }
      } else {
        result = { score: 0, summary: "AI response could not be parsed.", issues: [], suggestions: [] };
      }
    }

    // Clamp
    result.score = Math.max(0, Math.min(100, Math.round(Number(result.score) || 0)));
    result.issues = Array.isArray(result.issues) ? result.issues.slice(0, 5) : [];
    result.suggestions = Array.isArray(result.suggestions) ? result.suggestions.slice(0, 5) : [];

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("review-python-code error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

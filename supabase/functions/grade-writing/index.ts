import "../_shared/ai-fallback.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function logUsage(functionName: string, model: string, domain: string, tokensUsed: number, status: string, errorMessage?: string) {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const sb = createClient(supabaseUrl, supabaseKey);
    const estimatedCost = tokensUsed * 0.000001;
    await sb.from("api_usage_log").insert({
      function_name: functionName, model, domain, tokens_used: tokensUsed,
      estimated_cost: estimatedCost, status, error_message: errorMessage || null,
    });
  } catch (e) { console.error("Usage logging failed:", e); }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Public endpoint (verify_jwt=false). Skip auth roundtrip to cut latency.
    const { essay } = await req.json();

    if (!essay || typeof essay !== "string" || essay.trim().length < 20) {
      return new Response(JSON.stringify({ error: "Essay too short to grade." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a Senior IELTS Examiner. Grade the Writing Task 2 essay and return STRICT JSON ONLY (no markdown). Schema:
{
  "overall": <number, e.g. 6.5>,
  "criteria": [
    { "score": <number>, "label": "Task Achievement", "strengths": [s1,s2,s3], "weaknesses": [w1,w2,w3], "suggestions": [g1,g2,g3] },
    { "score": <number>, "label": "Coherence & Cohesion", "strengths": [...], "weaknesses": [...], "suggestions": [...] },
    { "score": <number>, "label": "Lexical Resource", "strengths": [...], "weaknesses": [...], "suggestions": [...] },
    { "score": <number>, "label": "Grammatical Range & Accuracy", "strengths": [...], "weaknesses": [...], "suggestions": [...] }
  ],
  "errors": [ {"error":"<original text>","correction":"<fixed>","category":"Grammar|Vocab|Cohesion"} ],
  "advice": "<Specific actionable advice to reach the next 0.5 band>"
}

Rules:
1. Quote actual text from the essay in "errors". Provide at least 6 entries.
2. Scores must be varied and realistic.
3. Be concise — each strength/weakness/suggestion is 1 short phrase.
4. Do NOT include an "upgraded" rewrite — that is handled by a separate call.`;

    // Hard timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55_000);
    let response: Response;
    try {
      response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          temperature: 0.2,
          max_tokens: 1500,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Grade this IELTS Writing Task 2 essay:\n\n${essay}` },
          ],
        }),
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      const aborted = (fetchErr as any)?.name === "AbortError";
      await logUsage("grade-writing", "gemini-2.5-flash-lite", "english", 0, "error", aborted ? "timeout" : "network");
      return new Response(
        JSON.stringify({ error: aborted ? "Grading timed out. Please try again." : "AI service unreachable. Please try again." }),
        { status: 504, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const statusCode = response.status;
      const errText = await response.text();
      await logUsage("grade-writing", "gemini-2.5-flash-lite", "english", 0, "error", `HTTP ${statusCode}`);
      if (statusCode === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (statusCode === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please top up to continue grading." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("Lovable AI error:", statusCode, errText);
      throw new Error("AI API error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const tokensUsed = (data.usage?.total_tokens) || Math.ceil(content.length / 4);

    let parsed;
    try {
      let cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      const jsonStart = cleaned.search(/[\{\[]/);
      const jsonEnd = cleaned.lastIndexOf(jsonStart !== -1 && cleaned[jsonStart] === "[" ? "]" : "}");
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found");
      cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
      try { parsed = JSON.parse(cleaned); } catch {
        cleaned = cleaned.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/[\x00-\x1F\x7F]/g, "");
        parsed = JSON.parse(cleaned);
      }
    } catch {
      console.error("Failed to parse AI response:", content);
      await logUsage("grade-writing", "gemini-2.5-flash-lite", "english", tokensUsed, "parse_error");
      throw new Error("Failed to parse grading result");
    }

    await logUsage("grade-writing", "gemini-2.5-flash-lite", "english", tokensUsed, "success");

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("grade-writing error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

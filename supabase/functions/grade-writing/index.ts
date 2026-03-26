import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Log API usage to database (fire-and-forget)
async function logUsage(functionName: string, model: string, domain: string, tokensUsed: number, status: string, errorMessage?: string) {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const sb = createClient(supabaseUrl, supabaseKey);
    // Perplexity sonar pricing: ~$1 per 1M tokens (input+output combined estimate)
    const estimatedCost = tokensUsed * 0.000001;
    await sb.from("api_usage_log").insert({
      function_name: functionName,
      model,
      domain,
      tokens_used: tokensUsed,
      estimated_cost: estimatedCost,
      status,
      error_message: errorMessage || null,
    });
  } catch (e) {
    console.error("Usage logging failed:", e);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { essay } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY is not configured");

    const systemPrompt = `You are a Senior IELTS Examiner & Linguistic Data Analyst. Analyze the Writing Task 2 essay provided.

IMPORTANT: Your response MUST be valid JSON only. No markdown, no explanation outside JSON.

Return this exact JSON structure:
{
  "overall": <number like 6.5>,
  "criteria": [
    {
      "score": <number>,
      "label": "Task Achievement",
      "strengths": ["<strength1>", "<strength2>", "<strength3>"],
      "weaknesses": ["<weakness1>", "<weakness2>", "<weakness3>"],
      "suggestions": ["<suggestion1>", "<suggestion2>", "<suggestion3>"]
    },
    {
      "score": <number>,
      "label": "Coherence & Cohesion",
      "strengths": [...],
      "weaknesses": [...],
      "suggestions": [...]
    },
    {
      "score": <number>,
      "label": "Lexical Resource",
      "strengths": [...],
      "weaknesses": [...],
      "suggestions": [...]
    },
    {
      "score": <number>,
      "label": "Grammatical Range & Accuracy",
      "strengths": [...],
      "weaknesses": [...],
      "suggestions": [...]
    }
  ],
  "errors": [
    {"error": "<original text>", "correction": "<corrected text>", "category": "Grammar|Vocab|Cohesion"}
  ],
  "upgraded": "<A complete Band 8.0+ rewritten version of the essay IN ENGLISH. Use **bold** around advanced collocations, academic vocabulary, and high-level phrases so students can learn them. Keep the student's original arguments but elevate the language significantly.>",
  "advice": "<Specific actionable advice to reach the next 0.5 band>"
}

CRITICAL RULES:
1. The "upgraded" field MUST ALWAYS be in English regardless of what language the student wrote in.
2. Use **bold** markdown around advanced/high-level vocabulary and phrases in the upgraded version.
3. Be specific in errors - quote actual text from the essay.
4. Scores should be realistic and varied (not all the same).
5. Give at least 6-8 error highlights.`;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Grade this IELTS Writing Task 2 essay:\n\n${essay}` },
        ],
      }),
    });

    if (!response.ok) {
      const statusCode = response.status;
      const errText = await response.text();
      await logUsage("grade-writing", "sonar", "english", 0, "error", `HTTP ${statusCode}`);
      if (statusCode === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (statusCode === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("Perplexity API error:", statusCode, errText);
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
      await logUsage("grade-writing", "sonar", "english", tokensUsed, "parse_error");
      throw new Error("Failed to parse grading result");
    }

    // Log successful usage
    await logUsage("grade-writing", "sonar", "english", tokensUsed, "success");

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
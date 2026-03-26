import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function logUsage(fn: string, model: string, domain: string, tokens: number, status: string, err?: string) {
  try {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await sb.from("api_usage_log").insert({ function_name: fn, model, domain, tokens_used: tokens, estimated_cost: tokens * 0.000001, status, error_message: err || null });
  } catch (e) { console.error("Usage logging failed:", e); }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { taskType, essayType, chartType } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY is not configured");

    const taskDesc = taskType === 1 ? `Task 1 (${chartType || "bar chart"})` : `Task 2 (${essayType || "opinion"} essay)`;

    const systemPrompt = `You are a Senior IELTS Examiner creating authentic Writing prompts.

Generate ONE brand-new IELTS Writing ${taskDesc} question that has NEVER appeared in any Cambridge practice book. Make it current and relevant to 2024-2025 topics.

IMPORTANT: Your response MUST be valid JSON only. No markdown, no explanation outside JSON.

Return this exact JSON structure:
{
  "prompt": "<The full IELTS writing question/task>",
  "taskType": ${taskType},
  ${taskType === 1 ? `"chartType": "${chartType || "bar"}"` : `"essayType": "${essayType || "opinion"}"`},
  "writingGuide": ["<step1>", "<step2>", "<step3>", "<step4>"],
  "vocabularyBank": ["<word1>", "<word2>", ... at least 10 academic collocations],
  "brainstormingIdeas": ["<idea1>", "<idea2>", "<idea3>", "<idea4>", "<idea5>"]${taskType === 1 ? ',\n  "imageDescription": "<Detailed description of the chart/diagram for the question>"' : ''}
}

RULES:
1. The prompt must be realistic and exam-grade quality.
2. Writing guide must follow IELTS best practices (PEEL method for Task 2).
3. Vocabulary must be Band 7.0+ academic collocations.
4. Brainstorming ideas must be balanced and arguable.`;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate a fresh IELTS ${taskDesc} prompt with guide, vocabulary, and ideas.` },
        ],
      }),
    });

    if (!response.ok) {
      await logUsage("generate-writing-prompt", "sonar", "english", 0, "error", `HTTP ${response.status}`);
      if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "Payment required" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await response.text();
      console.error("Perplexity API error:", response.status, t);
      throw new Error("AI API error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const tokensUsed = data.usage?.total_tokens || Math.ceil(content.length / 4);

    let parsed;
    try {
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", content);
      await logUsage("generate-writing-prompt", "sonar", "english", tokensUsed, "parse_error");
      throw new Error("Failed to parse prompt result");
    }

    await logUsage("generate-writing-prompt", "sonar", "english", tokensUsed, "success");

    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("generate-writing-prompt error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
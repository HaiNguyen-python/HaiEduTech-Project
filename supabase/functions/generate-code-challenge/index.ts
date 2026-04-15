import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
    // JWT Authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const supabaseAuth = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: authHeader } } });
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { topic, language, codeLanguage } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY is not configured");

    const langLabel = language === "vi" ? "Vietnamese" : "English";
    const codeLang = codeLanguage || "python";

    const userPrompt = `Create a unique coding challenge about "${topic}" in ${codeLang}. Return JSON:
{
  "title": "Challenge title in ${langLabel}",
  "description": "Problem description in ${langLabel} (2-3 paragraphs, clear requirements)",
  "difficulty": "easy|medium|hard",
  "hints": ["Hint 1 in ${langLabel}", "Hint 2", "Hint 3"],
  "sampleInput": "Example input",
  "sampleOutput": "Expected output",
  "starterCode": "# Starter code template with function signature",
  "solution": "Complete solution code",
  "explanation": "Step-by-step explanation of the solution in ${langLabel}"
}
Make the challenge creative and educational. Focus on practical problem-solving skills.`;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "You are an expert programming teacher creating coding challenges. Always respond in valid JSON format." },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Perplexity error:", response.status, errText);
      await logUsage("generate-code-challenge", "sonar", "programming", 0, "error", `HTTP ${response.status}`);
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const tokensUsed = data.usage?.total_tokens || Math.ceil(content.length / 4);

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      await logUsage("generate-code-challenge", "sonar", "programming", tokensUsed, "parse_error");
      throw new Error("Could not parse challenge content");
    }

    const challenge = JSON.parse(jsonMatch[0]);
    await logUsage("generate-code-challenge", "sonar", "programming", tokensUsed, "success");

    return new Response(JSON.stringify(challenge), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-code-challenge error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

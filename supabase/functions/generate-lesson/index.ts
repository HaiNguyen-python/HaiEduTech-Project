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

    const { language, topic, lessonType } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY is not configured");

    const langLabel = language === "english" ? "English" : "Chinese";
    const isChineseLesson = language === "chinese";
    const domain = isChineseLesson ? "chinese" : "english";

    let systemPrompt = `You are an expert language teacher creating educational content. Always respond in valid JSON format.`;
    let userPrompt = "";

    if (lessonType === "grammar") {
      userPrompt = `Create a unique ${langLabel} grammar lesson about "${topic}". Return JSON:
{
  "title": "Lesson title",
  "points": [
    { "rule": "Grammar rule explanation in Vietnamese", "examples": ["example 1 with **bold** key parts", "example 2"] }
  ],
  ${isChineseLesson ? '"vocabulary": [{ "word": "字", "pinyin": "zì", "meaning": "Vietnamese meaning", "example": "Example sentence" }],' : ''}
  "tips": ["Memory tip 1", "Memory tip 2", "Memory tip 3"],
  "quiz": [
    { "question": "Question text", "options": ["A", "B", "C", "D"], "answer": 0, "explanation": "Why this is correct in Vietnamese" }
  ],
  "challenge": { "question": "Quick 1-minute challenge question", "options": ["A","B","C","D"], "answer": 1, "explanation": "Explanation" }
}
Provide 3 grammar points, 3 tips, and 3 quiz questions. Make content unique and engaging. Write explanations in Vietnamese.`;
    } else if (lessonType === "vocabulary") {
      userPrompt = `Create a unique ${langLabel} vocabulary lesson about "${topic}". Return JSON:
{
  "title": "Lesson title",
  "vocabulary": [
    { "word": "word", ${isChineseLesson ? '"pinyin": "pīnyīn",' : ''} "meaning": "Vietnamese meaning", "example": "Example with **bold** keyword" }
  ],
  "tips": ["Study tip 1", "Study tip 2", "Study tip 3"],
  "quiz": [
    { "question": "Question", "options": ["A","B","C","D"], "answer": 0, "explanation": "Explanation in Vietnamese" }
  ],
  "challenge": { "question": "Quick challenge", "options": ["A","B","C","D"], "answer": 0, "explanation": "Explanation" }
}
Provide 6 vocabulary items, 3 tips, 3 quiz questions. Write in Vietnamese.`;
    } else {
      userPrompt = `Create a unique ${langLabel} reading comprehension lesson about "${topic}". Return JSON:
{
  "title": "Lesson title",
  "passage": "A reading passage (150-200 words) ${isChineseLesson ? 'in Chinese with Vietnamese translation in parentheses after each sentence' : 'in English'}",
  "tips": ["Reading tip 1", "Reading tip 2"],
  "quiz": [
    { "question": "Comprehension question", "options": ["A","B","C","D"], "answer": 0, "explanation": "Explanation in Vietnamese" }
  ],
  "challenge": { "question": "Quick challenge based on the passage", "options": ["A","B","C","D"], "answer": 0, "explanation": "Explanation" }
}
Provide 3 quiz questions. Write explanations in Vietnamese.`;
    }

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Perplexity error:", response.status, errText);
      await logUsage("generate-lesson", "sonar", domain, 0, "error", `HTTP ${response.status}`);
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const tokensUsed = data.usage?.total_tokens || Math.ceil(content.length / 4);

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      await logUsage("generate-lesson", "sonar", domain, tokensUsed, "parse_error");
      throw new Error("Could not parse lesson content");
    }

    const lessonContent = JSON.parse(jsonMatch[0]);
    await logUsage("generate-lesson", "sonar", domain, tokensUsed, "success");

    return new Response(JSON.stringify(lessonContent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-lesson error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

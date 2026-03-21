import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { essay } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Grade this IELTS Writing Task 2 essay:\n\n${essay}` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse JSON from response
    let parsed;
    try {
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse grading result");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("grade-writing error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

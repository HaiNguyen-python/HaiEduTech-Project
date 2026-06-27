import "../_shared/ai-fallback.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { code, language = "python", lessonContext = "" } = await req.json();
    if (!code || typeof code !== "string" || code.length > 8000) {
      return new Response(JSON.stringify({ error: "Invalid code" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not set");

    const systemPrompt = `You are Mr. Hai, a concise programming tutor.
Given ${language} code, respond with STRICT JSON (no markdown fences) shaped:
{
  "explanation": string,  // <=120 words, short markdown bullets in ENGLISH only. Start with 1 summary sentence, then 3-5 bullets covering key lines/concepts. Use backticks for code tokens. No headings, no Vietnamese, no greetings.
  "quiz": [               // exactly 3 multiple-choice questions reviewing the meaning of specific parts of the code
    { "question": string, "options": [string, string, string, string], "answer": 0|1|2|3, "explanation": string }
  ]
}
Quiz rules: questions must reference concrete tokens/lines from the code (quote them with backticks). Options must be plausible, mutually exclusive, and short. The explanation field for each question is one short sentence.`;

    const userPrompt = lessonContext
      ? `Lesson context: ${lessonContext}\n\n\`\`\`${language}\n${code}\n\`\`\``
      : `\`\`\`${language}\n${code}\n\`\`\``;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        max_tokens: 900,
        response_format: { type: "json_object" },
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
      }),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again in a moment." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (resp.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in workspace settings." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";
    let explanation = "(No explanation)";
    let quiz: Array<{ question: string; options: string[]; answer: number; explanation?: string }> = [];
    try {
      const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
      const parsed = JSON.parse(cleaned);
      if (typeof parsed.explanation === "string") explanation = parsed.explanation;
      if (Array.isArray(parsed.quiz)) {
        quiz = parsed.quiz
          .filter((q: any) => q && typeof q.question === "string" && Array.isArray(q.options) && q.options.length === 4 && Number.isInteger(q.answer))
          .slice(0, 3)
          .map((q: any) => ({
            question: String(q.question),
            options: q.options.map((o: any) => String(o)),
            answer: Math.max(0, Math.min(3, q.answer)),
            explanation: typeof q.explanation === "string" ? q.explanation : "",
          }));
      }
    } catch (parseErr) {
      console.error("explain-code parse error:", parseErr, raw);
      explanation = raw;
    }
    return new Response(JSON.stringify({ explanation, quiz }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("explain-code error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

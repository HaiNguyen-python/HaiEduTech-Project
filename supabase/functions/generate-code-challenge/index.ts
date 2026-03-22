import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
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
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
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
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Could not parse challenge content");

    const challenge = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(challenge), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-code-challenge error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

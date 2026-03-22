import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, error, challenge } = await req.json();
    const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!apiKey) throw new Error("Missing PERPLEXITY_API_KEY");

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: `You are a friendly Python tutor for young students (ages 8-16). 
When given Python code and its error, explain the bug in simple Vietnamese and English. 
Be encouraging. Point to the exact line if possible. 
Keep your answer under 150 words. Use bullet points.
Format: first explain in Vietnamese, then English translation in parentheses.`,
          },
          {
            role: "user",
            content: `Challenge: ${challenge}\n\nStudent's code:\n\`\`\`python\n${code}\n\`\`\`\n\nError output:\n${error}\n\nExplain what's wrong and how to fix it.`,
          },
        ],
        max_tokens: 300,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Perplexity API error: ${response.status} ${errText}`);
    }

    const data = await response.json();
    const explanation = data.choices?.[0]?.message?.content || "Unable to analyze.";

    return new Response(JSON.stringify({ explanation }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

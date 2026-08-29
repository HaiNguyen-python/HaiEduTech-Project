// Learning Path Coach - short personalized commentary for "My Learning Path".
// Numbers are computed on the client; this only adds human-sounding advice.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const input = await req.json();
    if (!input?.subject) return json({ success: false, error: "Missing subject" }, 400);

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ success: false, error: "AI not configured" }, 500);

    const vi = input.language === "vi";
    const prompt = `Student study snapshot (JSON):
${JSON.stringify(input, null, 2)}

Write a coaching note of 4-6 sentences in ${vi ? "Vietnamese" : "English"}.
Rules:
- Do not invent numbers; only use the ones above.
- Name the single most important skill to work on this week and why.
- Give 2 concrete actions tied to the plan items listed.
- Say plainly whether the target timeline is realistic at this pace.
- Warm, direct, no bullet lists, no markdown, no em-dash characters.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Lovable-API-Key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        messages: [
          {
            role: "system",
            content:
              "You are Teacher Hai, an experienced language and programming coach at HaiEduTech. You give short, concrete, honest study advice.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[learning-path-coach] gateway error", res.status, text);
      if (res.status === 429) return json({ success: false, error: "Rate limited, please retry shortly" }, 429);
      if (res.status === 402) return json({ success: false, error: "AI credits exhausted" }, 402);
      return json({ success: false, error: `AI error ${res.status}` }, 500);
    }

    const data = await res.json();
    const note = String(data.choices?.[0]?.message?.content ?? "").replace(/—/g, "-").trim();
    if (!note) return json({ success: false, error: "Empty AI response" }, 500);

    return json({ success: true, note });
  } catch (e) {
    console.error("[learning-path-coach] error", e);
    return json({ success: false, error: e instanceof Error ? e.message : String(e) }, 500);
  }
});

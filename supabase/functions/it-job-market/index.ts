// Live IT job market insights via Perplexity (Finland focus)
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { role = "Data Engineer", location = "Finland" } = await req.json().catch(() => ({}));
    const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!apiKey) throw new Error("Missing PERPLEXITY_API_KEY");

    const systemPrompt =
      "You are an IT job-market analyst. Output STRICT JSON only, no prose, no markdown fences.";

    const userPrompt = `Search live job boards (LinkedIn, Indeed, TE-palvelut, Duunitori) and return the latest snapshot for "${role}" jobs in ${location}.
Return JSON exactly:
{
  "summary": "1 short sentence, max 22 words",
  "openRoles": number,
  "avgSalaryEur": "e.g. 55,000 - 78,000",
  "topJobs": [ { "title": "string", "company": "string", "city": "string" } ],  // 5 items
  "topSkills": ["string", ...],  // 6 items
  "remotePct": number,
  "trend": "up" | "flat" | "down"
}`;

    const r = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.2,
        search_recency_filter: "month",
      }),
    });
    if (!r.ok) throw new Error(`Perplexity ${r.status}: ${await r.text()}`);
    const data = await r.json();
    let text: string = data.choices?.[0]?.message?.content ?? "{}";
    // Strip markdown fences if any
    text = text.replace(/```json\s*|\s*```/g, "").trim();
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end > start) text = text.slice(start, end + 1);
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { raw: text };
    }

    return new Response(
      JSON.stringify({ ok: true, role, location, data: parsed, citations: data.citations ?? [] }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown error";
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import "../_shared/ai-fallback.ts";
// Live IT job market insights (Finland focus)
// Primary: Perplexity (live web). Fallback: Lovable AI when Perplexity is unavailable.
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT =
  "You are an IT job-market analyst. Output STRICT JSON only, no prose, no markdown fences.";

function buildUserPrompt(role: string, location: string) {
  return `Return the latest snapshot for "${role}" jobs in ${location} (LinkedIn, Indeed, TE-palvelut, Duunitori).
Return JSON exactly:
{
  "summary": "1 short sentence, max 22 words",
  "openRoles": number,
  "avgSalaryEur": "e.g. 55,000 - 78,000",
  "topJobs": [ { "title": "string", "company": "string", "city": "string" } ],
  "topSkills": ["string", ...],
  "remotePct": number,
  "trend": "up" | "flat" | "down"
}`;
}

function parseJsonish(raw: string) {
  let text = raw.replace(/```json\s*|\s*```/g, "").trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) text = text.slice(start, end + 1);
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

async function callPerplexity(role: string, location: string) {
  const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
  if (!apiKey) throw new Error("Missing PERPLEXITY_API_KEY");
  const r = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "sonar",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(role, location) },
      ],
      temperature: 0.2,
      search_recency_filter: "month",
    }),
  });
  if (!r.ok) throw new Error(`Perplexity ${r.status}: ${await r.text()}`);
  const data = await r.json();
  return {
    data: parseJsonish(data.choices?.[0]?.message?.content ?? "{}"),
    citations: data.citations ?? [],
    source: "perplexity" as const,
  };
}

async function callLovableAi(role: string, location: string) {
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Lovable-API-Key": key, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3.8-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(role, location) },
      ],
    }),
  });
  if (!r.ok) throw new Error(`Lovable AI ${r.status}: ${await r.text()}`);
  const data = await r.json();
  return {
    data: parseJsonish(data.choices?.[0]?.message?.content ?? "{}"),
    citations: [],
    source: "lovable-ai" as const,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const { role = "Data Engineer", location = "Finland" } = await req.json().catch(() => ({}));

  let result: Awaited<ReturnType<typeof callPerplexity>> | null = null;
  let primaryError = "";
  try {
    result = await callPerplexity(role, location);
  } catch (e) {
    primaryError = e instanceof Error ? e.message : "unknown error";
  }

  if (!result) {
    try {
      result = await callLovableAi(role, location);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown error";
      return new Response(
        JSON.stringify({ ok: false, error: `${primaryError} | fallback: ${msg}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
  }

  return new Response(
    JSON.stringify({
      ok: true,
      role,
      location,
      data: result.data,
      citations: result.citations,
      source: result.source,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});

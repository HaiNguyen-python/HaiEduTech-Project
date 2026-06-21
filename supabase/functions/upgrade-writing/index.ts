import "../_shared/ai-fallback.ts";
// Edge function: Rewrite a student's IELTS Writing Task essay to Band 8.0+
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function logUsage(functionName: string, model: string, domain: string, tokensUsed: number, status: string, errorMessage?: string) {
  try {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await sb.from("api_usage_log").insert({
      function_name: functionName, model, domain, tokens_used: tokensUsed,
      estimated_cost: tokensUsed * 0.000001, status, error_message: errorMessage || null,
    });
  } catch (e) { console.error("Usage logging failed:", e); }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabaseAuth = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: authHeader } } });
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(authHeader.replace("Bearer ", ""));
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { essay, taskType } = await req.json();
    if (!essay || typeof essay !== "string" || essay.trim().length < 20) {
      return new Response(JSON.stringify({ error: "Essay too short to upgrade." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const isTask1 = taskType === 1;
    const systemPrompt = `You are a Senior IELTS Examiner. Your ONLY task is to REWRITE the student's IELTS Writing ${isTask1 ? "Task 1" : "Task 2"} essay at Band 8.0+ level.

STRICT RULES:
- Preserve the student's OWN arguments, examples, and overall structure. Do NOT invent new ideas.
- Fix grammar, replace basic vocabulary with precise academic collocations, vary sentence structure, add natural cohesive devices.
- Output language: ENGLISH ONLY (regardless of student's original language).
- Length: ${isTask1 ? "~180-220 words" : "~280-330 words"}.
- Bold every upgraded word/phrase using **double asterisks** so the student sees what changed.
- Keep paragraph breaks (use \\n\\n between paragraphs).

OUTPUT JSON ONLY in this exact shape (no markdown fences):
{ "upgraded": "<the upgraded Band 8.0+ essay with **bolded** upgrades and \\n\\n paragraph breaks>" }`;

    const userPrompt = `Student's essay:\n\n${essay}\n\nRewrite at Band 8.0+. Return JSON only.`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45_000);
    let response: Response;
    try {
      response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          temperature: 0.2,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
        }),
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      const aborted = (fetchErr as any)?.name === "AbortError";
      await logUsage("upgrade-writing", "gemini-2.5-flash", "english", 0, "error", aborted ? "timeout" : "network");
      return new Response(
        JSON.stringify({ error: aborted ? "Upgrade timed out. Please try again." : "AI service unreachable. Please try again." }),
        { status: 504, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      await logUsage("upgrade-writing", "gemini-2.5-flash", "english", 0, "error", `HTTP ${status}`);
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds to your Lovable workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      throw new Error("AI API error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const tokensUsed = data.usage?.total_tokens || Math.ceil(content.length / 4);

    let upgraded = "";
    try {
      const { jsonrepair } = await import("https://esm.sh/jsonrepair@3.8.1");
      let cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      const jsonStart = cleaned.search(/[\{\[]/);
      const jsonEnd = cleaned.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
        let parsed: { upgraded?: string };
        try { parsed = JSON.parse(cleaned); } catch { parsed = JSON.parse(jsonrepair(cleaned)); }
        upgraded = (parsed.upgraded || "").trim();
      }
    } catch (e) {
      console.error("Parse error:", e);
    }

    if (!upgraded) upgraded = content.replace(/```[a-z]*\s*/gi, "").replace(/```/g, "").trim();

    if (!upgraded) {
      await logUsage("upgrade-writing", "gemini-2.5-flash", "english", tokensUsed, "empty");
      return new Response(JSON.stringify({ error: "Could not generate upgrade. Please try again." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    await logUsage("upgrade-writing", "gemini-2.5-flash", "english", tokensUsed, "success");

    return new Response(JSON.stringify({ upgraded }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("upgrade-writing error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

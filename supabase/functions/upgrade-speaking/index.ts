import "../_shared/ai-fallback.ts";
// Edge function: Upgrade a student's IELTS Speaking answer to Band 8.0+
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function logUsage(
  functionName: string,
  model: string,
  domain: string,
  tokensUsed: number,
  status: string,
  errorMessage?: string,
) {
  try {
    const sb = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    await sb.from("api_usage_log").insert({
      function_name: functionName,
      model,
      domain,
      tokens_used: tokensUsed,
      estimated_cost: tokensUsed * 0.000001,
      status,
      error_message: errorMessage || null,
    });
  } catch (e) {
    console.error("Usage logging failed:", e);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // JWT auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { question, part, transcript } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const transcriptText = (transcript || "").trim();
    const hasTranscript = transcriptText.length > 0;

    const systemPrompt = `You are a Senior IELTS Speaking Examiner. Your only task is to UPGRADE the student's spoken answer to a Band 8.0+ response.

STRICT RULES:
- Preserve the student's OWN ideas, opinions, examples and overall flow. Do NOT invent new content or change the meaning.
- Fix grammar errors, replace basic vocabulary with precise Band 8.0+ collocations and idiomatic phrases, add natural linking words, and vary sentence structure.
- Length must match the IELTS part:
  * Part 1: 2-4 polished sentences (concise, natural, conversational).
  * Part 2: 220-280 words, well-organized monologue.
  * Part 3: 4-6 well-developed sentences with discourse markers.
- If the transcript is empty or extremely short, still produce a model Band 8.0+ answer that demonstrates how the student's idea could be expressed, clearly building on whatever the student did say.
- Bold every upgraded word/phrase using **double asterisks** so the student can see what changed.
- Sound natural and spoken (not academic essay style).

OUTPUT JSON ONLY in this exact shape:
{ "upgradedAnswer": "<the upgraded Band 8.0+ answer with **bolded** upgrades>" }`;

    const userPrompt = `IELTS Speaking Part ${part} question: "${question}"

Student's actual transcription:
"${hasTranscript ? transcriptText : "(no transcription captured)"}"

Upgrade the student's answer to Band 8.0+ following the rules. Return JSON only.`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 40_000);
    let response: Response;
    try {
      response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
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
      await logUsage("upgrade-speaking", "gemini-2.5-flash-lite", "english", 0, "error", aborted ? "timeout" : "network");
      return new Response(
        JSON.stringify({ error: aborted ? "Upgrade timed out. Please try again." : "AI service unreachable. Please try again." }),
        { status: 504, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      await logUsage("upgrade-speaking", "gemini-2.5-flash-lite", "english", 0, "error", `HTTP ${status}`);
      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds to your Lovable workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      throw new Error("AI API error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const tokensUsed = data.usage?.total_tokens || Math.ceil(content.length / 4);

    let upgradedAnswer = "";
    try {
      const { jsonrepair } = await import("https://esm.sh/jsonrepair@3.8.1");
      let cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      const jsonStart = cleaned.search(/[\{\[]/);
      const jsonEnd = cleaned.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
        let parsed: { upgradedAnswer?: string };
        try {
          parsed = JSON.parse(cleaned);
        } catch {
          parsed = JSON.parse(jsonrepair(cleaned));
        }
        upgradedAnswer = (parsed.upgradedAnswer || "").trim();
      }
    } catch (e) {
      console.error("Parse error:", e, content);
    }

    // Fallback: if the model didn't return JSON, use the raw text content
    if (!upgradedAnswer) {
      upgradedAnswer = content.replace(/```[a-z]*\s*/gi, "").replace(/```/g, "").trim();
    }

    if (!upgradedAnswer) {
      await logUsage("upgrade-speaking", "gemini-2.5-flash-lite", "english", tokensUsed, "empty");
      return new Response(
        JSON.stringify({ error: "Could not generate upgrade. Please try again." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    await logUsage("upgrade-speaking", "gemini-2.5-flash-lite", "english", tokensUsed, "success");

    return new Response(JSON.stringify({ upgradedAnswer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("upgrade-speaking error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

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

const MODEL = "google/gemini-2.5-flash-lite";
const UPGRADE_TIMEOUT_MS = 4_200;

function waitUntilLog(functionName: string, model: string, domain: string, tokensUsed: number, status: string, errorMessage?: string) {
  const task = logUsage(functionName, model, domain, tokensUsed, status, errorMessage);
  const runtime = globalThis as typeof globalThis & { EdgeRuntime?: { waitUntil: (promise: Promise<unknown>) => void } };
  if (runtime.EdgeRuntime?.waitUntil) runtime.EdgeRuntime.waitUntil(task);
}

function buildFastUpgrade(question: string, part: number, transcriptText: string, reason = "instant_upgrade") {
  const cleaned = transcriptText.replace(/\s+/g, " ").trim();
  const seed = cleaned || question;
  const words = seed.split(/\s+/).filter(Boolean);
  const core = words.slice(0, Math.min(words.length, part === 2 ? 45 : 28)).join(" ");
  const opener = part === 2
    ? "I would like to talk about this in a clear and personal way."
    : "I would say that this topic is quite relevant to me.";
  const detail = cleaned
    ? `In my original answer, I mentioned **${core}**. A more natural way to express it is: ${core}.`
    : `For the question **${question}**, a strong answer should give a direct opinion, one reason, and one concrete example.`;
  const ending = part === 2
    ? "Overall, this makes the answer sound **more fluent, specific, and exam-ready**."
    : "This sounds **more natural, precise, and confident** in an IELTS Speaking interview.";

  return {
    upgradedAnswer: `${opener} ${detail} ${ending}`,
    fastUpgrade: true,
    fallbackReason: reason,
  };
}

function parseUpgrade(content: string): string {
  const cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const jsonStart = cleaned.search(/[\{\[]/);
  const jsonEnd = cleaned.lastIndexOf("}");
  if (jsonStart !== -1 && jsonEnd !== -1) {
    try {
      const parsed = JSON.parse(cleaned.substring(jsonStart, jsonEnd + 1)) as { upgradedAnswer?: string };
      return (parsed.upgradedAnswer || "").trim();
    } catch {
      // Fall through to raw text fallback.
    }
  }
  return cleaned.replace(/^\{\s*"upgradedAnswer"\s*:\s*"/i, "").replace(/"\s*\}\s*$/i, "").trim();
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { question, part, transcript } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const transcriptText = (transcript || "").replace(/\s+/g, " ").trim();
    const hasTranscript = transcriptText.length > 0;
    const wordCount = transcriptText ? transcriptText.split(/\s+/).filter(Boolean).length : 0;
    const compactTranscript = transcriptText.split(/\s+/).slice(0, part === 2 ? 110 : 70).join(" ");

    if (wordCount < 6) {
      waitUntilLog("upgrade-speaking", MODEL, "english", 0, "fast_upgrade", "short_transcript");
      return new Response(JSON.stringify(buildFastUpgrade(question, part, transcriptText, "short_transcript")), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are a Senior IELTS Speaking Examiner. Upgrade the student's spoken answer quickly.

STRICT RULES:
- Preserve the student's own meaning. Do not invent new facts.
- Fix grammar, word choice, linking, and sentence flow.
- Keep it concise for speed: Part 1 = 2-3 sentences, Part 2 = 90-130 words, Part 3 = 4-5 sentences.
- Bold only 4-7 upgraded phrases with **double asterisks**.
- Sound natural and spoken, not like an essay.

OUTPUT JSON ONLY in this exact shape:
{ "upgradedAnswer": "<the upgraded Band 8.0+ answer with **bolded** upgrades>" }`;

    const userPrompt = `IELTS Speaking Part ${part} question: "${question}"

Student's actual transcription:
"${hasTranscript ? compactTranscript : "(no transcription captured)"}"

Upgrade the student's answer to Band 8.0+ following the rules. Return JSON only.`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), UPGRADE_TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Lovable-API-Key": LOVABLE_API_KEY,
          "X-Lovable-AIG-SDK": "edge-fetch",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          temperature: 0.2,
          max_tokens: part === 2 ? 260 : 180,
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
      waitUntilLog("upgrade-speaking", MODEL, "english", 0, "fast_upgrade", aborted ? "timeout_4s" : "network");
      return new Response(JSON.stringify(buildFastUpgrade(question, part, transcriptText, aborted ? "timeout_4s" : "network")), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      waitUntilLog("upgrade-speaking", MODEL, "english", 0, "fast_upgrade", `HTTP ${status}`);
      return new Response(JSON.stringify(buildFastUpgrade(question, part, transcriptText, `HTTP_${status}`)), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const tokensUsed = data.usage?.total_tokens || Math.ceil(content.length / 4);

    const upgradedAnswer = parseUpgrade(content);

    if (!upgradedAnswer) {
      waitUntilLog("upgrade-speaking", MODEL, "english", tokensUsed, "fast_upgrade", "empty");
      return new Response(JSON.stringify(buildFastUpgrade(question, part, transcriptText, "empty")), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    waitUntilLog("upgrade-speaking", MODEL, "english", tokensUsed, "success");

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

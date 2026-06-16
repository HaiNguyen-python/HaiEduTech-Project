// Edge function: Grade IELTS Speaking based on actual student transcription
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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
    // JWT Authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const supabaseAuth = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: authHeader } } });
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { question, part, duration, transcript } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const hasTranscript = transcript && transcript.trim().length > 0;
    const transcriptText = hasTranscript ? transcript.trim() : "";
    const wordCount = transcriptText ? transcriptText.split(/\s+/).filter(Boolean).length : 0;

    const systemPrompt = `You are a Senior IELTS Speaking Examiner. Grade STRICTLY based on the student's actual spoken response.

RULES:
- Analyze ONLY the transcription. Do NOT hallucinate.
- If transcription is empty or <10 words, give Band 4.0-4.5 and explain the student must speak more.
- Reference SPECIFIC words/phrases from the transcript in feedback.
- Be concise but specific.

QUESTION (Part ${part}): "${question}"
DURATION: ${duration}s | WORD COUNT: ${wordCount}
${hasTranscript ? `TRANSCRIPTION:\n"${transcriptText}"` : "NO TRANSCRIPTION - grade as Band 4.0."}

Return ONLY valid JSON, no prose, no markdown fences:
{
  "overall": <4.0-9.0>,
  "criteria": [
    {"label":"Fluency & Coherence","score":<n>,"feedback":"<2-3 sentences referencing the transcript>"},
    {"label":"Lexical Resource","score":<n>,"feedback":"<2-3 sentences quoting words used; suggest Band 7+ alternatives>"},
    {"label":"Grammatical Range & Accuracy","score":<n>,"feedback":"<2-3 sentences quoting errors and corrections>"},
    {"label":"Pronunciation","score":<n>,"feedback":"<2-3 sentences on likely pronunciation issues>"}
  ],
  "transcript": "<the original transcript exactly>",
  "highlightedErrors": [
    {"text":"<exact substring from transcript>","type":"grammar|vocabulary|pronunciation","correction":"<fix>","explanation":"<short>"}
  ],
  "suggestions": ["<actionable tip>","<actionable tip>","<actionable tip>"],
  "upgradedAnswer": "<Upgrade to Band 7.5-8.0. Keep their ideas. Bold upgraded words with **markdown**. Part 1: 2-4 sentences. Part 2: 200-260 words. Part 3: 4-6 sentences.>"
}

highlightedErrors: include 2-3 items if any imperfections exist; each text MUST be an exact substring of the transcript.
Make scores realistic and varied.`;

    // Hard timeout to avoid UI spinner stalls.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45_000);
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
          model: "google/gemini-2.5-flash",
          temperature: 0.2,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Grade this IELTS Speaking Part ${part} answer. Question: "${question}". Transcript: "${transcriptText}". Duration: ${duration}s, ${wordCount} words. Return JSON only.` },
          ],
          response_format: { type: "json_object" },
        }),
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      const aborted = (fetchErr as any)?.name === "AbortError";
      await logUsage("grade-speaking", "gemini-2.5-flash", "english", 0, "error", aborted ? "timeout" : "network");
      return new Response(
        JSON.stringify({ error: aborted ? "Grading timed out. Please try again." : "AI service unreachable. Please try again." }),
        { status: 504, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      await logUsage("grade-speaking", "gemini-2.5-flash", "english", 0, "error", `HTTP ${status}`);
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds to your Lovable workspace." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI Gateway error:", status, t);
      throw new Error("AI API error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const tokensUsed = data.usage?.total_tokens || Math.ceil(content.length / 4);

    let parsed;
    try {
      const { jsonrepair } = await import("https://esm.sh/jsonrepair@3.8.1");
      let cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      const jsonStart = cleaned.search(/[\{\[]/);
      const jsonEnd = cleaned.lastIndexOf(jsonStart !== -1 && cleaned[jsonStart] === "[" ? "]" : "}");
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found");
      cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
      try { parsed = JSON.parse(cleaned); } catch {
        try {
          const repaired = jsonrepair(cleaned);
          parsed = JSON.parse(repaired);
        } catch {
          // Last-resort: strip trailing commas, control chars, then balance brackets
          let fix = cleaned.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/[\x00-\x1F\x7F]/g, "");
          const opens = (fix.match(/\{/g) || []).length;
          const closes = (fix.match(/\}/g) || []).length;
          const opensA = (fix.match(/\[/g) || []).length;
          const closesA = (fix.match(/\]/g) || []).length;
          fix += "]".repeat(Math.max(0, opensA - closesA)) + "}".repeat(Math.max(0, opens - closes));
          parsed = JSON.parse(jsonrepair(fix));
        }
      }
    } catch (e) {
      console.error("Parse error:", content);
      await logUsage("grade-speaking", "sonar", "english", tokensUsed, "parse_error");
      return new Response(JSON.stringify({ error: "Failed to parse speaking result. Please try again." }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (hasTranscript) {
      parsed.transcript = transcriptText;
    }

    await logUsage("grade-speaking", "sonar", "english", tokensUsed, "success");

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("grade-speaking error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

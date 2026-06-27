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

type FastGradeInput = {
  question: string;
  part: number;
  duration: number;
  transcriptText: string;
  wordCount: number;
  reason?: string;
};

const GRADE_TIMEOUT_MS = 4_200;
const MODEL = "google/gemini-2.5-flash-lite";

const roundBand = (score: number) => Math.max(4, Math.min(8, Math.round(score * 2) / 2));

function buildFastSpeakingGrade({ question, part, duration, transcriptText, wordCount, reason }: FastGradeInput) {
  const wordsPerMinute = duration > 0 ? (wordCount / Math.max(duration, 1)) * 60 : 0;
  const hasAnswer = wordCount >= 6;
  const lengthScore = wordCount < 8 ? 4.0 : wordCount < 18 ? 5.0 : wordCount < 35 ? 6.0 : wordCount < 65 ? 6.5 : 7.0;
  const paceScore = wordsPerMinute < 45 ? 5.0 : wordsPerMinute > 190 ? 5.5 : wordsPerMinute > 90 ? 6.5 : 6.0;
  const connectorHits = (transcriptText.match(/\b(because|so|but|however|although|firstly|also|for example|in addition|therefore)\b/gi) || []).length;
  const lexicalHits = (transcriptText.match(/\b(important|effective|usually|prefer|manage|experience|opportunity|challenge|benefit|improve)\b/gi) || []).length;

  const fluency = roundBand((lengthScore + paceScore + Math.min(connectorHits, 3) * 0.25) / 2);
  const lexical = roundBand(lengthScore + Math.min(lexicalHits, 4) * 0.15);
  const grammar = roundBand(lengthScore + (transcriptText.includes(" because ") || transcriptText.includes(" although ") ? 0.5 : 0));
  const pronunciation = roundBand(paceScore + 0.25);
  const overall = hasAnswer ? roundBand((fluency + lexical + grammar + pronunciation) / 4) : 4.0;
  const quoted = transcriptText.split(/\s+/).slice(0, 10).join(" ") || "your answer";

  return {
    overall,
    criteria: [
      { label: "Fluency & Coherence", score: fluency, feedback: hasAnswer ? `You answered the question with ${wordCount} words. Add one clear example after "${quoted}" to make the answer more developed.` : "The answer is too short to judge fluency well. Speak for at least 20-30 seconds." },
      { label: "Lexical Resource", score: lexical, feedback: hasAnswer ? "Your vocabulary is understandable. Upgrade basic words with more precise IELTS topic words." : "Use 3-4 topic words from the question before submitting." },
      { label: "Grammatical Range & Accuracy", score: grammar, feedback: hasAnswer ? "Use one complex sentence with because, although, or which to show stronger grammar range." : "Make at least two full sentences so grammar can be assessed." },
      { label: "Pronunciation", score: pronunciation, feedback: "This fast score uses transcript timing. For a higher pronunciation score, keep steady pacing and stress key nouns clearly." },
    ],
    highlightedErrors: [],
    suggestions: [
      `Answer Part ${part} with point + reason + example.`,
      "Speak in 2-3 complete sentences before pressing Grade.",
      `Stay close to the question: ${question}`,
    ],
    transcript: transcriptText || "(No transcript detected)",
    fastScore: true,
    fallbackReason: reason || "instant-5s-score",
  };
}

function waitUntilLog(functionName: string, model: string, domain: string, tokensUsed: number, status: string, errorMessage?: string) {
  const task = logUsage(functionName, model, domain, tokensUsed, status, errorMessage);
  const runtime = globalThis as typeof globalThis & { EdgeRuntime?: { waitUntil: (promise: Promise<unknown>) => void } };
  if (runtime.EdgeRuntime?.waitUntil) runtime.EdgeRuntime.waitUntil(task);
}

function parseJsonResult(content: string) {
  let cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const jsonStart = cleaned.search(/[\{\[]/);
  const jsonEnd = cleaned.lastIndexOf(jsonStart !== -1 && cleaned[jsonStart] === "[" ? "]" : "}");
  if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found");
  cleaned = cleaned.substring(jsonStart, jsonEnd + 1).replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/[\x00-\x1F\x7F]/g, "");
  return JSON.parse(cleaned);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Public endpoint (verify_jwt=false in config). Skip auth roundtrip to cut ~300-600ms latency.
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
- Be VERY CONCISE so the response fits fast. Feedback max 12 words each.

QUESTION (Part ${part}): "${question}"
DURATION: ${duration}s | WORD COUNT: ${wordCount}
${hasTranscript ? `TRANSCRIPTION:\n"${transcriptText}"` : "NO TRANSCRIPTION - grade as Band 4.0."}

Return ONLY compact valid JSON, no prose, no markdown fences:
{
  "overall": <4.0-9.0>,
  "criteria": [
    {"label":"Fluency & Coherence","score":<n>,"feedback":"<max 12 words>"},
    {"label":"Lexical Resource","score":<n>,"feedback":"<max 12 words>"},
    {"label":"Grammatical Range & Accuracy","score":<n>,"feedback":"<max 12 words>"},
    {"label":"Pronunciation","score":<n>,"feedback":"<max 12 words>"}
  ],
  "highlightedErrors": [
    {"text":"<exact substring>","type":"grammar|vocabulary|pronunciation","correction":"<fix>","explanation":"<max 8 words>"}
  ],
  "suggestions": ["<max 10 words>","<max 10 words>"]
}

highlightedErrors: include 0-1 item only; text MUST be an exact substring.
Do NOT include the transcript or any upgraded answer in the JSON. Make scores realistic and varied.`;

    if (wordCount < 6) {
      waitUntilLog("grade-speaking", MODEL, "english", 0, "fast_score", "short_transcript");
      return new Response(JSON.stringify(buildFastSpeakingGrade({ question, part, duration, transcriptText, wordCount, reason: "short_transcript" })), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Hard 4.2s timeout so the UI can always show a score inside 5s.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GRADE_TIMEOUT_MS);
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
          max_tokens: 520,

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
      waitUntilLog("grade-speaking", MODEL, "english", 0, "fast_score", aborted ? "timeout_4s" : "network");
      return new Response(JSON.stringify(buildFastSpeakingGrade({ question, part, duration, transcriptText, wordCount, reason: aborted ? "timeout_4s" : "network" })), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      waitUntilLog("grade-speaking", MODEL, "english", 0, "fast_score", `HTTP ${status}`);
      return new Response(JSON.stringify(buildFastSpeakingGrade({ question, part, duration, transcriptText, wordCount, reason: `HTTP_${status}` })), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const tokensUsed = data.usage?.total_tokens || Math.ceil(content.length / 4);

    let parsed;
    try {
      parsed = parseJsonResult(content);
      if (typeof parsed?.overall !== "number" || !Array.isArray(parsed?.criteria)) throw new Error("Invalid grading shape");
    } catch (e) {
      console.error("Parse error:", content);
      waitUntilLog("grade-speaking", MODEL, "english", tokensUsed, "fast_score", "parse_error");
      return new Response(JSON.stringify(buildFastSpeakingGrade({ question, part, duration, transcriptText, wordCount, reason: "parse_error" })), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (hasTranscript) {
      parsed.transcript = transcriptText;
    }

    waitUntilLog("grade-speaking", MODEL, "english", tokensUsed, "success");

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

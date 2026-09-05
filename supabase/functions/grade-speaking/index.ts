// Edge function: Grade IELTS Speaking using the official Public Band Descriptors.
// Accuracy-first: strong model, full rubric, generous timeout, multiple highlighted errors.
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

type FastGradeInput = {
  question: string;
  part: number;
  duration: number;
  transcriptText: string;
  wordCount: number;
  reason?: string;
};

// Accuracy over speed: allow the examiner model up to 14s to apply the full rubric.
const GRADE_TIMEOUT_MS = 14_000;
// Stronger reasoning model for IELTS band accuracy. Flash (not Flash-Lite) is required
// to weigh fluency, lexis, grammar, and pronunciation against the public band descriptors.
const MODEL = "google/gemini-2.5-flash";

const roundBand = (score: number) => Math.max(3, Math.min(9, Math.round(score * 2) / 2));

function buildFastSpeakingGrade({ question, part, duration, transcriptText, wordCount, reason }: FastGradeInput) {
  // Conservative heuristic only used when the AI is fully unreachable.
  const wordsPerMinute = duration > 0 ? (wordCount / Math.max(duration, 1)) * 60 : 0;
  const hasAnswer = wordCount >= 6;
  const lengthScore = wordCount < 8 ? 3.5 : wordCount < 18 ? 4.5 : wordCount < 35 ? 5.5 : wordCount < 65 ? 6.0 : 6.5;
  const paceScore = wordsPerMinute < 45 ? 4.5 : wordsPerMinute > 200 ? 5.0 : wordsPerMinute > 90 ? 6.0 : 5.5;
  const connectorHits = (transcriptText.match(/\b(because|so|but|however|although|firstly|also|for example|in addition|therefore|moreover|whereas)\b/gi) || []).length;
  const lexicalHits = (transcriptText.match(/\b(important|effective|usually|prefer|manage|experience|opportunity|challenge|benefit|improve|essential|significant|considerable)\b/gi) || []).length;
  const complexGrammar = /(although|because|which|that|while|whereas|despite|in order to)/i.test(transcriptText);

  const fluency = roundBand((lengthScore + paceScore + Math.min(connectorHits, 3) * 0.25) / 2);
  const lexical = roundBand(lengthScore + Math.min(lexicalHits, 4) * 0.2);
  const grammar = roundBand(lengthScore + (complexGrammar ? 0.5 : 0));
  const pronunciation = roundBand(paceScore);
  const overall = hasAnswer ? roundBand((fluency + lexical + grammar + pronunciation) / 4) : 3.5;
  const quoted = transcriptText.split(/\s+/).slice(0, 10).join(" ") || "your answer";

  return {
    overall,
    criteria: [
      { label: "Fluency & Coherence", score: fluency, feedback: hasAnswer ? `You spoke ${wordCount} words. Add an example after "${quoted}" to make the answer more developed.` : "Answer too short to assess fluency. Speak for at least 20-30 seconds." },
      { label: "Lexical Resource", score: lexical, feedback: hasAnswer ? "Vocabulary is functional. Replace basic words with precise IELTS topic vocabulary." : "Use 3-4 topic words from the question before submitting." },
      { label: "Grammatical Range & Accuracy", score: grammar, feedback: hasAnswer ? "Add one complex sentence with because, although or which to show grammar range." : "Make at least two full sentences so grammar can be assessed." },
      { label: "Pronunciation", score: pronunciation, feedback: "Heuristic score based on pacing only. AI examiner unavailable for full pronunciation analysis." },
    ],
    highlightedErrors: [],
    suggestions: [
      `Structure Part ${part}: point → reason → example.`,
      "Speak in 2-3 complete sentences before pressing Grade.",
      `Stay on topic: ${question}`,
    ],
    transcript: transcriptText || "(No transcript detected)",
    fastScore: true,
    fallbackReason: reason || "ai-unavailable",
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

// Full IELTS Speaking Public Band Descriptors compressed into examiner-actionable prose.
const RUBRIC = `OFFICIAL IELTS SPEAKING PUBLIC BAND DESCRIPTORS (apply strictly per criterion, then average):

FLUENCY & COHERENCE
- Band 9: fluent with rare hesitation, fully coherent, develops topics fully.
- Band 8: fluent with only occasional repetition/self-correction; develops topics coherently.
- Band 7: speaks at length without losing coherence; uses range of connectives flexibly though some over/under-use.
- Band 6: willing to speak at length though loses coherence at times due to hesitation, repetition, self-correction; uses connectives but not always appropriately.
- Band 5: usually maintains flow but uses repetition, self-correction, slow speech; overuses certain connectives; produces simple speech fluently but more complex speech causes hesitation.
- Band 4: noticeable pauses, slow speech with frequent repetition; links basic sentences with simple connectives but with breakdowns in coherence.
- Band 3: long pauses, limited ability to link simple sentences; gives only simple responses, frequently unable to convey basic message.

LEXICAL RESOURCE
- Band 9: full flexibility, precise idiomatic usage.
- Band 8: wide vocabulary, conveys precise meaning, uses uncommon and idiomatic items skilfully with occasional inaccuracy; effective paraphrase.
- Band 7: flexible vocabulary to discuss variety of topics; uses some less common and idiomatic items with awareness of style; uses paraphrase effectively.
- Band 6: wide enough vocabulary to discuss topics at length and make meaning clear despite inappropriacies; generally paraphrases successfully.
- Band 5: manages to talk about familiar and unfamiliar topics with limited flexibility; attempts paraphrase with mixed success.
- Band 4: able to talk about familiar topics but conveys only basic meaning on unfamiliar topics; frequent errors in word choice; rarely paraphrases.
- Band 3: uses simple vocabulary to convey personal information; insufficient vocabulary for less familiar topics.

GRAMMATICAL RANGE & ACCURACY
- Band 9: full range used naturally with full accuracy; rare slips only as native speakers.
- Band 8: wide range flexibly; majority of sentences error-free; occasional inappropriacies.
- Band 7: range of complex structures with some flexibility; frequently produces error-free sentences though some grammatical mistakes persist.
- Band 6: mix of simple and complex structures with limited flexibility; may make frequent mistakes with complex structures though these rarely cause comprehension problems.
- Band 5: produces basic sentence forms with reasonable accuracy; uses limited range of more complex structures usually with errors that cause some comprehension problems.
- Band 4: produces basic sentence forms and some correct simple sentences; subordinate structures rare; errors frequent and may lead to misunderstanding.
- Band 3: attempts basic sentence forms but with limited success; frequent errors except in memorised utterances.

PRONUNCIATION
- Band 9: full range of pronunciation features with precision and subtlety; sustains flexible use; effortless to understand.
- Band 8: wide range of pronunciation features; sustains flexible use with only occasional lapses; easy to understand throughout; L1 accent has minimal effect.
- Band 7: shows all positive features of Band 6 and some, but not all, positive features of Band 8 (uses range of features with mixed control; can be understood throughout with occasional lapses).
- Band 6: uses range of pronunciation features with mixed control; shows some effective use but not sustained; can generally be understood throughout though mispronunciation of individual words/sounds reduces clarity at times.
- Band 5: shows all positive features of Band 4 and some, but not all, positive features of Band 6 (limited range, mispronunciations are frequent and cause some difficulty for the listener).
- Band 4: uses limited range of pronunciation features; attempts to control features but lapses are frequent; mispronunciations are frequent and cause some difficulty for the listener.
- Band 3: shows some of the features of Band 2 and some, but not all, of the positive features of Band 4.

CALIBRATION (judge the LANGUAGE, not the length):
- There is NO word-count ceiling on any band. Score the quality of the language actually produced.
- Part 1: a 20-40 word answer is the expected, natural length. If it is accurate, well linked and uses precise or less common vocabulary, it can reach Band 7 or higher. Only penalise length when the answer is a bare one-clause reply that does not address the question.
- Part 2: expect a sustained long turn (roughly 60+ seconds of speech) with development; an under-developed long turn limits Fluency & Coherence, not the other criteria.
- Part 3: reward extended, developed, opinion-plus-reason answers; short undeveloped answers limit Fluency & Coherence.
- Reward what is present: one flexible complex structure or one well-used less common item is genuine evidence of Band 7 in that criterion.
- Band 8+ requires uncommon or idiomatic vocabulary AND flexible complex grammar AND sustained coherence, but do not withhold it when all three are clearly present.
- Genuinely penalise only: off-topic answers, memorised recitation, repeated breakdowns in coherence, and errors that impede understanding.

AUTOMATIC SPEECH RECOGNITION (ASR) TOLERANCE - IMPORTANT:
The transcript comes from browser speech recognition, not from a human. It has no punctuation, no capitalisation, and it drops or mis-hears words. Therefore:
- Ignore missing punctuation, sentence casing and paragraphing entirely - never treat them as errors.
- Ignore single missing articles, plural "s" or third-person "s" and mis-heard homophones or names when the intended meaning is clear; these are usually recognition artefacts.
- Infer sentence boundaries from meaning and connectives before judging grammar or coherence.
- Only report errors you are confident the speaker actually made.
- Pronunciation: estimate from pacing, rhythm, connective use and word clarity in the transcript. There is no artificial ceiling, but say in the feedback that it is an estimate from the transcript rather than from audio, and stay within Band 5-8 unless the evidence is unusually clear.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { question, part, duration, transcript } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const hasTranscript = transcript && transcript.trim().length > 0;
    const transcriptText = hasTranscript ? transcript.trim() : "";
    const wordCount = transcriptText ? transcriptText.split(/\s+/).filter(Boolean).length : 0;
    const wordsPerMinute = duration > 0 ? Math.round((wordCount / Math.max(duration, 1)) * 60) : 0;

    // Genuinely too short to grade -> instant honest low score, no AI call wasted.
    if (wordCount < 6) {
      waitUntilLog("grade-speaking", MODEL, "english", 0, "fast_score", "short_transcript");
      return new Response(JSON.stringify(buildFastSpeakingGrade({ question, part, duration, transcriptText, wordCount, reason: "short_transcript" })), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are a Senior Certified IELTS Speaking Examiner with 15+ years of experience.
Apply the OFFICIAL IELTS Public Band Descriptors below STRICTLY, criterion by criterion, then compute the overall band as the average of the four criteria rounded to the nearest 0.5 (per IELTS reporting rules, halves and whole bands only).

${RUBRIC}

NON-NEGOTIABLE RULES:
1. Base every score ONLY on the actual transcript. Do NOT invent content, but DO give full credit for every strength that is present. Be fair and accurate, not harsh.
2. Each criterion score is INDEPENDENT - they do NOT have to match. A learner can be Band 7 fluency and Band 5 grammar.
3. Reference SPECIFIC phrases from the transcript in feedback ("you said 'X', a higher-band version would be 'Y'").
4. Each criterion feedback must explain: (a) what the learner did, (b) why it sits at this band, (c) exactly what to do to reach the next half-band.
5. List 2-4 highlighted errors with the EXACT substring from the transcript, the correction, and a short explanation. Skip only if the transcript is genuinely error-free at that band.
6. Suggestions: 3 concrete next steps tied to the learner's actual weaknesses.
7. Overall band MUST equal round-to-nearest-0.5 of the average of the four criteria. Do not bump it up out of kindness.

ANSWER METADATA:
- Question (Part ${part}): "${question}"
- Duration: ${duration}s | Word count: ${wordCount} | Speaking pace: ~${wordsPerMinute} wpm
- Transcript:
"""
${transcriptText}
"""

Return ONLY valid compact JSON in this exact shape, no markdown fences, no prose outside the JSON:
{
  "overall": <number 3.0-9.0 in 0.5 steps>,
  "criteria": [
    {"label":"Fluency & Coherence","score":<n>,"feedback":"<25-45 words, reference specific phrases, name the band, give the next-step fix>"},
    {"label":"Lexical Resource","score":<n>,"feedback":"<same rules>"},
    {"label":"Grammatical Range & Accuracy","score":<n>,"feedback":"<same rules>"},
    {"label":"Pronunciation","score":<n>,"feedback":"<assess from pacing + transcript clues; be honest if limited>"}
  ],
  "highlightedErrors": [
    {"text":"<exact substring from transcript>","type":"grammar|vocabulary|pronunciation|coherence","correction":"<natural Band 7+ fix>","explanation":"<≤14 words>"}
  ],
  "suggestions": ["<concrete next step>","<concrete next step>","<concrete next step>"]
}`;

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
          temperature: 0.15,
          max_tokens: 1400,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Grade this IELTS Speaking Part ${part} response using the official Public Band Descriptors. Be strict and accurate. Return JSON only.` },
          ],
          response_format: { type: "json_object" },
        }),
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      const aborted = (fetchErr as any)?.name === "AbortError";
      waitUntilLog("grade-speaking", MODEL, "english", 0, "fast_score", aborted ? "timeout_14s" : "network");
      return new Response(JSON.stringify(buildFastSpeakingGrade({ question, part, duration, transcriptText, wordCount, reason: aborted ? "timeout_14s" : "network" })), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      const bodyText = await response.text().catch(() => "");
      console.error(`grade-speaking upstream ${status}:`, bodyText.slice(0, 400));
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
      if (typeof parsed?.overall !== "number" || !Array.isArray(parsed?.criteria) || parsed.criteria.length !== 4) {
        throw new Error("Invalid grading shape");
      }
      // Enforce the IELTS rule: overall = round-to-nearest-0.5 of the criterion average.
      const avg = parsed.criteria.reduce((s: number, c: any) => s + (Number(c.score) || 0), 0) / 4;
      const enforcedOverall = roundBand(avg);
      if (Math.abs(enforcedOverall - parsed.overall) >= 0.5) {
        parsed.overall = enforcedOverall;
      }
      parsed.criteria = parsed.criteria.map((c: any) => ({ ...c, score: roundBand(Number(c.score) || 0) }));
    } catch (e) {
      console.error("Parse error:", content.slice(0, 500));
      waitUntilLog("grade-speaking", MODEL, "english", tokensUsed, "fast_score", "parse_error");
      return new Response(JSON.stringify(buildFastSpeakingGrade({ question, part, duration, transcriptText, wordCount, reason: "parse_error" })), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (hasTranscript) parsed.transcript = transcriptText;

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

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
    const { question, part, duration, transcript } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Validate that we have a real transcript
    const hasTranscript = transcript && transcript.trim().length > 0;
    const transcriptText = hasTranscript ? transcript.trim() : "";
    const wordCount = transcriptText ? transcriptText.split(/\s+/).filter(Boolean).length : 0;

    const systemPrompt = `You are a Senior IELTS Speaking Examiner (former British Council/IDP examiner). You must grade STRICTLY based on the student's actual spoken response.

CRITICAL RULES:
- Analyze ONLY the provided transcription below. Do NOT hallucinate or assume the student said something else.
- If the transcription is empty or very short (< 10 words), give very low scores (4.0-4.5) and explain the student needs to speak more.
- If the student's answer is off-topic from the question, mark Fluency & Coherence as low but keep Lexical Resource and Grammatical feedback honest to what was actually said.
- Reference SPECIFIC words and phrases from the transcript in your feedback.
- Point out SPECIFIC grammatical errors found in the transcript.
- Identify words that are likely mispronounced based on common Vietnamese-English pronunciation patterns.

QUESTION (Part ${part}): "${question}"
RECORDING DURATION: ${duration} seconds
WORD COUNT: ${wordCount}
${hasTranscript ? `STUDENT'S TRANSCRIPTION:\n"${transcriptText}"` : "NO TRANSCRIPTION AVAILABLE - The speech recognition could not capture any words. Grade as Band 4.0 with feedback about speaking clearly into the microphone."}

Return ONLY valid JSON with this structure:
{
  "overall": <number 4.0-9.0>,
  "criteria": [
    {
      "label": "Fluency & Coherence",
      "score": <number>,
      "feedback": "<DETAILED feedback referencing specific parts of the transcript. Mention hesitations, repetitions, or good flow.>"
    },
    {
      "label": "Lexical Resource",
      "score": <number>,
      "feedback": "<DETAILED feedback. Quote specific words/phrases used and suggest Band 7+ alternatives.>"
    },
    {
      "label": "Grammatical Range & Accuracy",
      "score": <number>,
      "feedback": "<DETAILED feedback. Quote specific sentences with errors and provide corrections.>"
    },
    {
      "label": "Pronunciation",
      "score": <number>,
      "feedback": "<DETAILED feedback based on likely pronunciation of words in the transcript.>"
    }
  ],
  "transcript": "${hasTranscript ? "<<RETURN THE ORIGINAL TRANSCRIPT EXACTLY AS PROVIDED>>" : ""}",
  "highlightedErrors": [
    {"text": "<exact phrase from transcript>", "type": "grammar|vocabulary|pronunciation", "correction": "<corrected version>", "explanation": "<brief explanation>"}
  ],
  "suggestions": [
    "<Specific actionable suggestion referencing their actual performance>",
    "<Specific actionable suggestion>",
    "<Specific actionable suggestion>",
    "<Specific actionable suggestion>",
    "<Specific actionable suggestion>"
  ],
  "vocabularyUpgrades": [
    {"basic": "<word student actually used>", "advanced": "<band 7+ alternative>", "example": "<example sentence>"},
    {"basic": "<word student actually used>", "advanced": "<band 7+ alternative>", "example": "<example sentence>"},
    {"basic": "<word student actually used>", "advanced": "<band 7+ alternative>", "example": "<example sentence>"}
  ],
  "pronunciationFocus": [
    {"sound": "<IPA sound>", "words": ["<word from transcript>", "<word>"], "tip": "<how to practice>"},
    {"sound": "<IPA sound>", "words": ["<word from transcript>", "<word>"], "tip": "<how to practice>"}
  ],
  "upgradedAnswer": "<IMPORTANT: Take the student's ACTUAL answer and upgrade it to Band 7.5-8.0 level. Keep the same ideas, structure, and flow as the student's original answer. Fix all grammar errors, replace basic vocabulary with advanced alternatives, add appropriate linking words, and improve sentence structure. Do NOT create a completely new answer - this must clearly be the student's own answer but polished and elevated. Bold the upgraded words/phrases using **word** markdown.>"
}

IMPORTANT: The "highlightedErrors" array must contain errors found IN the actual transcript only. Each "text" field must be an exact substring from the transcript.
The "transcript" field must return the student's original transcription exactly as provided, do not modify it.
The "upgradedAnswer" must be based on the student's actual answer - same ideas and flow, just upgraded language. Bold upgraded parts with **word** markdown.
Make scores REALISTIC and VARIED based on the actual language quality in the transcript.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Grade this IELTS Speaking Part ${part} response to the question: "${question}"\n\nStudent's transcription:\n"${transcriptText}"\n\nDuration: ${duration} seconds, Word count: ${wordCount}` },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      await logUsage("grade-speaking", "gemini-2.5-flash", "english", 0, "error", `HTTP ${status}`);
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
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
      let cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      const jsonStart = cleaned.search(/[\{\[]/);
      const jsonEnd = cleaned.lastIndexOf(jsonStart !== -1 && cleaned[jsonStart] === "[" ? "]" : "}");
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found");
      cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
      try { parsed = JSON.parse(cleaned); } catch {
        cleaned = cleaned.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/[\x00-\x1F\x7F]/g, "");
        parsed = JSON.parse(cleaned);
      }
    } catch (e) {
      console.error("Parse error:", content);
      await logUsage("grade-speaking", "gemini-2.5-flash", "english", tokensUsed, "parse_error");
      throw new Error("Failed to parse speaking result");
    }

    // Ensure transcript is preserved from input
    if (hasTranscript) {
      parsed.transcript = transcriptText;
    }

    await logUsage("grade-speaking", "gemini-2.5-flash", "english", tokensUsed, "success");

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

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { question, part, duration } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY is not configured");

    const systemPrompt = `You are a Senior IELTS Speaking Examiner. A student just recorded an answer to an IELTS Speaking Part ${part} question.

Since we cannot actually hear the audio, simulate a realistic and VARIED grading based on:
- The question difficulty (Part ${part})
- Recording duration: ${duration} seconds
- Random realistic variation

IMPORTANT: Return ONLY valid JSON. The response must include VERY SPECIFIC and DETAILED feedback.

Return this JSON structure:
{
  "overall": <number 4.0-8.5, varied based on duration and randomness>,
  "criteria": [
    {
      "label": "Fluency & Coherence",
      "score": <number>,
      "feedback": "<DETAILED feedback: mention specific issues like 'You paused too long between sentences', 'Your linking between ideas about X topic was weak', 'Try using discourse markers like However, Furthermore'>"
    },
    {
      "label": "Lexical Resource",
      "score": <number>,
      "feedback": "<DETAILED feedback: suggest SPECIFIC vocabulary upgrades, e.g. 'Instead of good, use beneficial/advantageous', 'For this topic, learn collocations like: make progress, gain experience, broaden horizons'>"
    },
    {
      "label": "Grammatical Range & Accuracy",
      "score": <number>,
      "feedback": "<DETAILED feedback: point out specific grammar patterns to practice, e.g. 'Practice conditional sentences: If I had studied harder, I would have...', 'Use more passive voice for formal topics'>"
    },
    {
      "label": "Pronunciation",
      "score": <number>,
      "feedback": "<DETAILED feedback: mention specific sounds that Vietnamese speakers commonly mispronounce, e.g. 'Focus on /θ/ (th) sounds in words like think, through', 'Practice word stress in multi-syllable words like edu-CA-tion, tech-NO-lo-gy', 'Work on final consonant clusters: asked /æskt/, helped /hɛlpt/'>"
    }
  ],
  "transcript": "<A simulated sample response the student might have given for this question, about 100-150 words>",
  "suggestions": [
    "<Specific actionable suggestion 1>",
    "<Specific actionable suggestion 2>",
    "<Specific actionable suggestion 3>",
    "<Specific actionable suggestion 4>",
    "<Specific actionable suggestion 5>"
  ],
  "vocabularyUpgrades": [
    {"basic": "<common word>", "advanced": "<band 7+ alternative>", "example": "<example sentence>"},
    {"basic": "<common word>", "advanced": "<band 7+ alternative>", "example": "<example sentence>"},
    {"basic": "<common word>", "advanced": "<band 7+ alternative>", "example": "<example sentence>"}
  ],
  "pronunciationFocus": [
    {"sound": "<IPA sound>", "words": ["<word1>", "<word2>", "<word3>"], "tip": "<how to practice>"},
    {"sound": "<IPA sound>", "words": ["<word1>", "<word2>", "<word3>"], "tip": "<how to practice>"}
  ]
}

Make scores VARIED and REALISTIC. Not all criteria should have the same score. Duration affects scores: <30s = lower scores, 60-120s = mid range, >120s = potentially higher.`;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Grade this IELTS Speaking Part ${part} response to the question: "${question}"\nRecording duration: ${duration} seconds.` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("Perplexity API error:", response.status, t);
      throw new Error("AI API error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    let parsed;
    try {
      let cleaned = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      const jsonStart = cleaned.search(/[\{\[]/);
      const jsonEnd = cleaned.lastIndexOf(jsonStart !== -1 && cleaned[jsonStart] === "[" ? "]" : "}");
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found");
      cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
      try {
        parsed = JSON.parse(cleaned);
      } catch {
        cleaned = cleaned
          .replace(/,\s*}/g, "}")
          .replace(/,\s*]/g, "]")
          .replace(/[\x00-\x1F\x7F]/g, "")
          .replace(/(["\d\]\}])\s*\n\s*(")/g, "$1,$2")
          .replace(/\}\s*\]/g, "}]");
        parsed = JSON.parse(cleaned);
      }
    } catch (e) {
      console.error("Parse error:", content);
      throw new Error("Failed to parse speaking result");
    }

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

// Edge function: grade a single sentence using a target IELTS phrase
// Uses Perplexity API (sonar) — consistent with project's AI standards
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReqBody {
  phrase: string;
  phraseMeaning?: string;
  userSentence: string;
  taskType: 1 | 2;
}

function fallback(phrase: string, sentence: string) {
  return {
    score: 6,
    phraseUsedCorrectly: sentence.toLowerCase().includes(phrase.toLowerCase()),
    grammarFeedback: "Unable to evaluate at this moment. Please try again shortly.",
    phraseFeedback: "Make sure the phrase is integrated naturally into your sentence.",
    upgradedVersion: sentence,
    tips: ["Review subject-verb agreement", "Vary your sentence structure"],
  };
}

// Repair common JSON issues from LLM output
function tryParseJson(raw: string) {
  let cleaned = raw.trim();
  // Strip markdown fences
  cleaned = cleaned.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  // Extract first {...} block
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) cleaned = match[0];
  try {
    return JSON.parse(cleaned);
  } catch {
    // Try fixing trailing commas
    try {
      return JSON.parse(cleaned.replace(/,(\s*[}\]])/g, "$1"));
    } catch {
      return null;
    }
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json() as ReqBody;
    const { phrase, phraseMeaning, userSentence, taskType } = body;

    if (!phrase || !userSentence || typeof userSentence !== "string") {
      return new Response(
        JSON.stringify({ error: "phrase and userSentence are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (userSentence.length < 5 || userSentence.length > 800) {
      return new Response(
        JSON.stringify({ error: "Sentence must be between 5 and 800 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) {
      console.error("PERPLEXITY_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are an experienced IELTS Writing examiner specialised in Task ${taskType}. Your role is to grade a SINGLE practice sentence written by a learner using a target IELTS phrase. Be strict but constructive. Output ONLY valid JSON — no markdown, no commentary.`;

    const userPrompt = `Target IELTS phrase: "${phrase}"
${phraseMeaning ? `Phrase meaning (Vietnamese): ${phraseMeaning}` : ""}
Task type: IELTS Writing Task ${taskType}
Learner's sentence: "${userSentence}"

Evaluate the sentence on:
1. Whether the phrase is used correctly and naturally (collocation, register, grammar around it)
2. Overall grammar accuracy (tenses, agreement, articles, prepositions)
3. Lexical sophistication appropriate for IELTS Band 7+
4. Suitability for an IELTS Task ${taskType} response

Then rewrite the sentence as a Band 7.5+ version. Use **double asterisks** to highlight the target phrase and any other upgrades.

Return ONLY this JSON shape (no other text):
{
  "score": <integer 1-10>,
  "phraseUsedCorrectly": <true|false>,
  "grammarFeedback": "<concise grammar analysis, 1-2 sentences>",
  "phraseFeedback": "<feedback on how the phrase was used, 1-2 sentences>",
  "upgradedVersion": "<Band 7.5+ rewrite with **bold** highlights>",
  "tips": ["<short actionable tip 1>", "<short actionable tip 2>", "<short actionable tip 3>"]
}`;

    const aiResp = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 600,
      }),
    });

    if (aiResp.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment.", ...fallback(phrase, userSentence) }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (aiResp.status === 402) {
      return new Response(
        JSON.stringify({ error: "AI credits exhausted. Please contact admin.", ...fallback(phrase, userSentence) }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!aiResp.ok) {
      const errText = await aiResp.text();
      console.error("Perplexity error:", aiResp.status, errText);
      return new Response(
        JSON.stringify({ error: "AI grading failed", ...fallback(phrase, userSentence) }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResp.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    const parsed = tryParseJson(content);

    if (!parsed) {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify(fallback(phrase, userSentence)),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(parsed),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("grade-phrase-sentence error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

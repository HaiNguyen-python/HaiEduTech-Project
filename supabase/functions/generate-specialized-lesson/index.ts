// Specialized Language Lesson Generator
// Uses Perplexity API to create a personalized industry-focused language curriculum.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LessonInput {
  language: "english" | "chinese" | "vietnamese" | "finnish";
  field: string;
  jobRole: string;
  goal: string;
  notes?: string;
}

const LANG_LABEL: Record<string, string> = {
  english: "English",
  chinese: "Chinese (Mandarin, with Pinyin and Hanzi)",
  vietnamese: "Vietnamese",
  finnish: "Finnish",
};

async function logUsage(
  fn: string,
  model: string,
  tokens: number,
  status: string,
  err?: string,
) {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    await supabase.from("api_usage_log").insert({
      function_name: fn,
      model,
      domain: "specialized-language",
      tokens_used: tokens,
      status,
      error_message: err ?? null,
    });
  } catch (e) {
    console.error("logUsage failed", e);
  }
}

function extractJson(text: string): any {
  // Strip code fences, <think> tags, and parse the first JSON object found.
  let cleaned = text
    .replace(/<think>[\s\S]*?<\/think>/g, "")
    .replace(/```json\s*|\s*```/g, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e) {
        console.error("JSON repair failed", e);
      }
    }
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "PERPLEXITY_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body: LessonInput = await req.json();
    const { language, field, jobRole, goal, notes = "" } = body;

    // Basic validation
    if (!language || !field || !jobRole || !goal) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: language, field, jobRole, goal" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (field.length > 200 || jobRole.length > 200 || goal.length > 500 || notes.length > 1000) {
      return new Response(
        JSON.stringify({ error: "Input too long" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const targetLang = LANG_LABEL[language] ?? "English";
    const isChinese = language === "chinese";

    const systemPrompt =
      `You are a professional language teacher who creates rigorous, workplace-ready language curricula. ` +
      `Always respond with VALID JSON only, no commentary, no markdown fences, no <think> blocks. ` +
      `Search the web for the most up-to-date 2026 industry terminology.`;

    const userPrompt = `Create a structured ${targetLang} lesson for a ${jobRole} working in ${field}. Learning goal: ${goal}. ${
      notes ? `Special requirements: ${notes}.` : ""
    }

Return ONLY a JSON object with this exact shape:
{
  "title": "string - lesson title in ${targetLang}",
  "subtitle": "string - one-line summary in English",
  "overview": "string - 2-3 sentence intro in English explaining what the learner will gain",
  "vocabulary": [
    {
      "term": "string - the word/phrase in ${targetLang}",
      ${isChinese ? '"pinyin": "string - Pinyin with tone marks",' : ""}
      "translation": "string - English meaning",
      "partOfSpeech": "string - noun/verb/adjective/phrase",
      "example": "string - example sentence in ${targetLang}",
      "exampleTranslation": "string - English translation of the example"
    }
  ],
  "scenarios": [
    {
      "title": "string - scenario name in English",
      "context": "string - 1-2 sentences setting the scene",
      "dialogue": [
        { "speaker": "string", "line": "string in ${targetLang}", "translation": "string in English" }
      ],
      "keyPhrases": ["string in ${targetLang} - 2-3 reusable phrases"]
    }
  ],
  "grammar": [
    {
      "point": "string - grammar focus in English",
      "explanation": "string - clear explanation",
      "examples": ["string in ${targetLang}"]
    }
  ],
  "tutorTips": [
    "string - actionable tip in English (cultural, pronunciation, or practice strategy)"
  ],
  "culturalTip": "string - one paragraph cultural insight for the workplace in English",
  "practiceTask": "string - one concrete homework task the learner can do today"
}

REQUIREMENTS:
- vocabulary: exactly 10 entries, prioritizing 2026-current industry terms
- scenarios: exactly 5 entries, each with 4-6 dialogue turns
- grammar: 2-3 points relevant to ${jobRole}
- tutorTips: exactly 5 tips
- All ${targetLang} text must be authentic and native-sounding
${isChinese ? "- Always include both Hanzi and Pinyin for Chinese text" : ""}`;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.4,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Perplexity error", response.status, errText);
      await logUsage("generate-specialized-lesson", "sonar-pro", 0, "error", errText.slice(0, 500));
      const status = response.status === 429 ? 429 : response.status === 402 ? 402 : 500;
      const msg = status === 429
        ? "Rate limit reached. Please try again in a minute."
        : status === 402
          ? "AI credits exhausted. Please top up the Lovable AI workspace."
          : "AI service temporarily unavailable.";
      return new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "";
    const tokens = data?.usage?.total_tokens ?? 0;
    const citations: string[] = data?.citations ?? [];

    const parsed = extractJson(content);
    if (!parsed) {
      await logUsage("generate-specialized-lesson", "sonar-pro", tokens, "parse_error");
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response. Please refine your request and try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    await logUsage("generate-specialized-lesson", "sonar-pro", tokens, "success");

    return new Response(
      JSON.stringify({ lesson: parsed, citations, tokens }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("generate-specialized-lesson error", msg);
    await logUsage("generate-specialized-lesson", "sonar-pro", 0, "error", msg.slice(0, 500));
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

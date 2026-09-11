// Specialized Language Lesson Generator
// Uses Perplexity API to create a personalized industry-focused language curriculum.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LessonInput {
  language: "english" | "chinese" | "vietnamese" | "finnish" | "swedish" | "japanese";
  field: string;
  jobRole: string;
  goal: string;
  learnerLevel?: "beginner" | "elementary" | "intermediate" | "advanced";
  dailyMinutes?: number;
  notes?: string;
}

const LANG_LABEL: Record<string, string> = {
  english: "English",
  chinese: "Chinese (Mandarin, with Pinyin and Hanzi)",
  vietnamese: "Vietnamese",
  finnish: "Finnish",
  swedish: "Swedish",
  japanese: "Japanese (with Kana/Kanji and Romaji where useful)",
};

const ALLOWED_LANGUAGES = new Set(Object.keys(LANG_LABEL));
const ALLOWED_LEVELS = new Set(["beginner", "elementary", "intermediate", "advanced"]);

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

function repairTruncatedJson(s: string): string {
  // Close unterminated strings, then balance brackets/braces.
  let str = s;
  // Count unescaped quotes; if odd, close the string.
  let inString = false;
  let escape = false;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (escape) { escape = false; continue; }
    if (c === "\\") { escape = true; continue; }
    if (c === '"') inString = !inString;
  }
  if (inString) str += '"';

  // Strip trailing commas/whitespace before closing.
  str = str.replace(/,\s*$/g, "");

  // Balance brackets and braces by stacking.
  const stack: string[] = [];
  inString = false; escape = false;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (escape) { escape = false; continue; }
    if (c === "\\") { escape = true; continue; }
    if (c === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (c === "{" || c === "[") stack.push(c);
    else if (c === "}" && stack[stack.length - 1] === "{") stack.pop();
    else if (c === "]" && stack[stack.length - 1] === "[") stack.pop();
  }
  while (stack.length) {
    const open = stack.pop();
    str += open === "{" ? "}" : "]";
  }
  return str;
}

function extractJson(text: string): any {
  let cleaned = text
    .replace(/<think>[\s\S]*?<\/think>/g, "")
    .replace(/```json\s*|\s*```/g, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    const candidate = match ? match[0] : cleaned;
    try {
      return JSON.parse(candidate);
    } catch {
      try {
        return JSON.parse(repairTruncatedJson(candidate));
      } catch (e) {
        console.error("JSON repair failed", e);
      }
    }
  }
  return null;
}

function isValidCurriculum(value: any): boolean {
  if (!value || typeof value !== "object" || !Array.isArray(value.lessons) || value.lessons.length !== 5) return false;
  return value.lessons.every((lesson: any, index: number) =>
    lesson?.id === `lesson-${index + 1}` &&
    typeof lesson.title === "string" && lesson.title.trim().length > 0 &&
    typeof lesson.objective === "string" && lesson.objective.trim().length > 0 &&
    Array.isArray(lesson.vocabulary) && lesson.vocabulary.length >= 8 && lesson.vocabulary.length <= 10 &&
    Array.isArray(lesson.scenario?.dialogue) && lesson.scenario.dialogue.length >= 4 && lesson.scenario.dialogue.length <= 6 &&
    Array.isArray(lesson.practiceTasks) && lesson.practiceTasks.length === 2 &&
    Array.isArray(lesson.quiz) && lesson.quiz.length === 5 &&
    lesson.quiz.every((question: any) =>
      typeof question?.question === "string" &&
      Array.isArray(question.options) && question.options.length === 4 &&
      Number.isInteger(question.correctIndex) && question.correctIndex >= 0 && question.correctIndex < 4 &&
      typeof question.explanation === "string" && question.explanation.trim().length > 0
    )
  );
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
    const { language, field, jobRole, goal, notes = "", learnerLevel = "elementary", dailyMinutes = 20 } = body;

    // Basic validation
    if (!language || !field || !jobRole || !goal || !ALLOWED_LANGUAGES.has(language) || !ALLOWED_LEVELS.has(learnerLevel)) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: language, field, jobRole, goal" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (field.length > 200 || jobRole.length > 200 || goal.length > 500 || notes.length > 1000 || !Number.isInteger(dailyMinutes) || dailyMinutes < 5 || dailyMinutes > 120) {
      return new Response(
        JSON.stringify({ error: "Input too long" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const targetLang = LANG_LABEL[language] ?? "English";
    const isChinese = language === "chinese";
    const isJapanese = language === "japanese";
    const pronunciationRule = isChinese
      ? "Every vocabulary item must include Pinyin with tone marks in pronunciation. Every Chinese example and dialogue line must use natural Hanzi."
      : isJapanese
        ? "Every vocabulary item must include a useful Kana or Romaji reading in pronunciation. Use natural Kana/Kanji in examples and dialogue."
        : language === "swedish" || language === "finnish"
          ? "Pronunciation tips must cover stress, vowel length and the most relevant sound or inflection pattern."
          : "Give practical pronunciation guidance appropriate to this language.";

    const systemPrompt =
      `You are a professional language teacher who creates rigorous, workplace-ready language curricula. ` +
      `Always respond with VALID JSON only, no commentary, no markdown fences, no <think> blocks. ` +
      `Search the web for the most up-to-date 2026 industry terminology.`;

    const userPrompt = `Create a coherent five-lesson ${targetLang} professional language pathway for a ${learnerLevel} learner who is a ${jobRole} working in ${field}. Learning goal: ${goal}. The learner studies ${dailyMinutes} minutes per day. ${
      notes ? `Special requirements: ${notes}.` : ""
    }

Return ONLY a JSON object with this exact shape:
{
  "id": "specialized-pathway",
  "title": "pathway title in ${targetLang}",
  "subtitle": "one-line English summary",
  "overview": "2-3 sentence English overview",
  "language": "${language}",
  "level": "${learnerLevel}",
  "totalMinutes": ${dailyMinutes * 5},
  "lessons": [{
    "id": "lesson-1",
    "title": "lesson title in ${targetLang}",
    "subtitle": "short English label",
    "objective": "specific learning objective in English",
    "estimatedMinutes": ${dailyMinutes},
    "vocabulary": [{"term":"${targetLang} word or phrase","pronunciation":"reading or IPA","translation":"English meaning","partOfSpeech":"part of speech","example":"authentic ${targetLang} sentence","exampleTranslation":"English translation"}],
    "scenario": {"title":"English scenario title","context":"English setup","dialogue":[{"speaker":"role","line":"${targetLang} line","translation":"English translation","keyPhrases":["important multiword phrase appearing in line"]}]},
    "languageFocus": {"title":"English grammar or communication focus","explanation":"clear English explanation","examples":["${targetLang} example"]},
    "pronunciationTips": ["actionable English tip"],
    "culturalNote": "concise English workplace culture note",
    "practiceTasks": ["guided practice task", "independent practice task"],
    "quiz": [{"question":"clear question","options":["option A","option B","option C","option D"],"correctIndex":0,"explanation":"why the answer is correct"}],
    "takeaway": "English summary of what to retain"
  }]
}

REQUIREMENTS:
- Return exactly 5 lessons in this sequence: Core Vocabulary; Workplace Communication; Documents & Technical Language; Problem Solving & Cultural Communication; Performance Challenge.
- Each lesson has 8-10 distinct vocabulary entries, 4-6 dialogue turns, exactly 2 practice tasks, and exactly 5 quiz questions.
- Every quiz question has exactly four plausible options, exactly one correct answer, a zero-based correctIndex, and an explanation.
- Difficulty must progress across the five lessons while remaining appropriate for ${learnerLevel}.
- Avoid repeating vocabulary, scenarios, questions or examples across lessons.
- Important dialogue keyPhrases must be multiword phrases copied exactly from that line.
- All target-language text must be authentic and native-sounding. Explanations and translations are in English.
- ${pronunciationRule}`;

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
        temperature: 0.3,
        max_tokens: 16000,
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
    if (!parsed || !isValidCurriculum(parsed)) {
      await logUsage("generate-specialized-lesson", "sonar-pro", tokens, "parse_error");
      return new Response(
        JSON.stringify({ error: "The AI response did not contain a complete five-lesson pathway. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    await logUsage("generate-specialized-lesson", "sonar-pro", tokens, "success");

    return new Response(
      JSON.stringify({ curriculum: parsed, lesson: parsed.lessons[0], citations: [...new Set(citations)], tokens }),
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

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CATEGORIES: Record<string, string[]> = {
  english: ["grammar", "vocabulary", "reading", "fill-blank", "reorder", "dialogue"],
  chinese: ["grammar", "vocabulary", "reading", "fill-blank", "reorder", "dialogue"],
  programming: ["concept", "fix-bug", "mini-project"],
};

const LEVELS: Record<string, string[]> = {
  english: ["A1", "A2", "B1", "B2", "C1"],
  chinese: ["HSK1", "HSK2", "HSK3", "HSK4", "HSK5", "HSK6"],
  programming: ["beginner", "intermediate", "advanced"],
};

function buildPrompt(subject: string, category: string, level: string, index: number): string {
  const seed = `Variation seed: ${Date.now()}-${index}`;

  if (subject === "english") {
    const levelDesc = `CEFR ${level}`;
    switch (category) {
      case "fill-blank":
        return `${seed}\nCreate a unique English fill-in-the-blank exercise for ${levelDesc} students. Return JSON:
{
  "title": "Exercise title in Vietnamese",
  "title_en": "Exercise title in English",
  "instructions": "Instructions in Vietnamese",
  "sentences": [
    { "text": "I ___ (go) to school yesterday.", "answer": "went", "hint": "past tense of 'go'" }
  ],
  "tips": ["Tip 1", "Tip 2"],
  "quiz": [{ "question": "Question", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]
}
Provide 6 sentences, 2 tips, 2 quiz questions. Vietnamese explanations.`;
      case "reorder":
        return `${seed}\nCreate a unique English sentence reordering exercise for ${levelDesc}. Return JSON:
{
  "title": "Title in Vietnamese",
  "title_en": "Title in English",
  "instructions": "Instructions in Vietnamese",
  "sentences": [
    { "scrambled": ["school", "to", "I", "go", "every day"], "correct": "I go to school every day", "translation": "Vietnamese translation" }
  ],
  "tips": ["Tip"],
  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]
}
Provide 6 sentences, 2 tips, 2 quiz questions.`;
      case "dialogue":
        return `${seed}\nCreate a unique English real-life dialogue exercise for ${levelDesc}. Return JSON:
{
  "title": "Title in Vietnamese",
  "title_en": "Title in English",
  "scenario": "Scenario description in Vietnamese",
  "dialogue": [
    { "speaker": "A", "line": "English line", "translation": "Vietnamese" }
  ],
  "vocabulary": [{ "word": "word", "meaning": "Vietnamese meaning", "example": "Example sentence" }],
  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]
}
Provide 8+ dialogue lines, 4 vocab items, 3 quiz questions.`;
      default:
        return `${seed}\nCreate a unique English ${category} lesson for ${levelDesc}. Return JSON:
{
  "title": "Title in Vietnamese",
  "title_en": "Title in English",
  "passage": "Reading passage (if applicable)",
  "points": [{ "rule": "Grammar rule", "examples": ["ex1", "ex2"] }],
  "vocabulary": [{ "word": "w", "meaning": "m", "example": "e" }],
  "tips": ["tip1", "tip2"],
  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]
}
Provide rich content with 3+ quiz questions. Vietnamese explanations.`;
    }
  }

  if (subject === "chinese") {
    const levelDesc = level;
    switch (category) {
      case "fill-blank":
        return `${seed}\nCreate a unique Chinese fill-in-the-blank exercise for ${levelDesc} students. Return JSON:
{
  "title": "Title in Vietnamese",
  "title_en": "Title in English",
  "instructions": "Instructions in Vietnamese",
  "sentences": [
    { "text": "我___去学校。", "answer": "每天", "pinyin": "měitiān", "hint": "every day" }
  ],
  "tips": ["Tip"],
  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]
}
Provide 6 sentences, 2 tips, 2 quiz questions. Vietnamese explanations.`;
      case "reorder":
        return `${seed}\nCreate a unique Chinese sentence reordering exercise for ${levelDesc}. Return JSON:
{
  "title": "Title in Vietnamese",
  "title_en": "Title in English",
  "sentences": [
    { "scrambled": ["学校", "去", "我", "每天"], "correct": "我每天去学校", "pinyin": "wǒ měitiān qù xuéxiào", "translation": "Vietnamese" }
  ],
  "tips": ["Tip"],
  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]
}
Provide 6 sentences, 2 tips, 2 quiz.`;
      case "dialogue":
        return `${seed}\nCreate a unique Chinese dialogue exercise for ${levelDesc}. Return JSON:
{
  "title": "Title in Vietnamese",
  "title_en": "Title in English",
  "scenario": "Scenario in Vietnamese",
  "dialogue": [
    { "speaker": "A", "line": "Chinese line", "pinyin": "pīnyīn", "translation": "Vietnamese" }
  ],
  "vocabulary": [{ "word": "字", "pinyin": "zì", "meaning": "Vietnamese", "example": "Example" }],
  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]
}
Provide 8+ dialogue lines, 4 vocab, 3 quiz.`;
      default:
        return `${seed}\nCreate a unique Chinese ${category} lesson for ${levelDesc}. Return JSON:
{
  "title": "Title in Vietnamese",
  "title_en": "Title in English",
  "passage": "Chinese passage with pinyin",
  "points": [{ "rule": "Grammar rule in Vietnamese", "examples": ["ex with **bold**"] }],
  "vocabulary": [{ "word": "字", "pinyin": "zì", "meaning": "Vietnamese", "example": "Example" }],
  "tips": ["tip"],
  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]
}
Provide rich content. Vietnamese explanations.`;
    }
  }

  // Programming
  switch (category) {
    case "fix-bug":
      return `${seed}\nCreate a unique Python bug-fixing exercise for ${level} level. Return JSON:
{
  "title": "Title in Vietnamese",
  "title_en": "Title in English",
  "description": "Context in Vietnamese",
  "buggy_code": "Python code with 2-3 bugs",
  "bugs": [
    { "line": 3, "description": "Bug description in Vietnamese", "fix": "Corrected line" }
  ],
  "fixed_code": "Complete corrected code",
  "explanation": "Detailed explanation in Vietnamese",
  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]
}
Make bugs realistic and educational. 2 quiz questions.`;
    case "mini-project":
      return `${seed}\nCreate a unique Python mini-project for ${level} level. Return JSON:
{
  "title": "Project title in Vietnamese",
  "title_en": "Project title in English",
  "description": "Project description in Vietnamese (what it does, why it's useful)",
  "steps": [
    { "step": 1, "title": "Step title", "description": "What to do", "code": "Code for this step" }
  ],
  "full_code": "Complete working code",
  "extensions": ["Extension idea 1", "Extension idea 2"],
  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]
}
Provide 4-5 steps. Ideas: calculator, quiz game, turtle drawing, password generator, to-do list.`;
    default:
      return `${seed}\nCreate a unique Python ${category} lesson for ${level}. Return JSON:
{
  "title": "Title in Vietnamese",
  "title_en": "Title in English",
  "theory": "Theory explanation in Vietnamese",
  "code": "Python code example",
  "exercise": "Practice exercise in Vietnamese",
  "tips": ["tip1", "tip2"],
  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]
}
Provide rich content with 3 quiz questions.`;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { subject, category, level, userId } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    // Validate inputs
    const validCategories = CATEGORIES[subject];
    if (!validCategories) throw new Error(`Invalid subject: ${subject}`);
    if (!validCategories.includes(category)) throw new Error(`Invalid category: ${category}`);
    const validLevels = LEVELS[subject];
    const effectiveLevel = level && validLevels?.includes(level) ? level : validLevels?.[0] || "beginner";

    // Generate a random index for variety
    const index = Math.floor(Math.random() * 10000);
    const prompt = buildPrompt(subject, category, effectiveLevel, index);

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "You are an expert teacher creating educational content. Always respond in valid JSON format only, no markdown." },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Perplexity error:", response.status, errText);
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Could not parse lesson content");

    const content = JSON.parse(jsonMatch[0]);

    // Store in database
    const { data: inserted, error: dbError } = await supabaseAdmin
      .from("generated_lessons")
      .insert({
        subject,
        category,
        level: effectiveLevel,
        title: content.title || `${subject} ${category} lesson`,
        title_en: content.title_en || content.title,
        content,
        created_by: userId || null,
        tags: [subject, category, effectiveLevel],
        is_published: true,
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB insert error:", dbError);
      throw new Error("Failed to save lesson");
    }

    return new Response(JSON.stringify(inserted), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-and-store-lesson error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

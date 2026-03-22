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

// Topic rotation map to diversify content
const TOPIC_ROTATION: Record<string, Record<string, string[]>> = {
  english: {
    grammar: ["Present Simple", "Past Simple", "Present Continuous", "Past Continuous", "Present Perfect", "Future Simple", "Conditionals", "Passive Voice", "Reported Speech", "Modal Verbs", "Relative Clauses", "Articles", "Comparatives & Superlatives", "Gerunds & Infinitives", "Phrasal Verbs"],
    vocabulary: ["Family & Relationships", "Food & Cooking", "Travel & Tourism", "Health & Body", "Work & Career", "Technology", "Environment & Nature", "Shopping & Money", "Sports & Hobbies", "Education", "Weather & Seasons", "Emotions & Feelings", "City & Transport", "Clothing & Fashion", "Music & Entertainment"],
    reading: ["News Articles", "Short Stories", "Science & Technology", "Culture & Society", "Biography", "Travel Blog", "Business Report", "Health & Wellness", "Environment", "Education"],
    "fill-blank": ["Verb Tenses", "Prepositions", "Articles", "Conjunctions", "Pronouns", "Word Formation", "Collocations", "Idioms", "Phrasal Verbs", "Conditionals"],
    reorder: ["Simple Sentences", "Complex Sentences", "Questions", "Conditional Sentences", "Passive Voice", "Reported Speech", "Relative Clauses", "Compound Sentences"],
    dialogue: ["At a Restaurant", "At the Airport", "Job Interview", "Doctor Visit", "Shopping", "Asking for Directions", "Hotel Check-in", "Phone Call", "Meeting New People", "Complaining & Apologizing"],
  },
  chinese: {
    grammar: ["是字句", "有字句", "把字句", "被字句", "比较句", "存现句", "连动句", "兼语句", "补语", "了/过/着"],
    vocabulary: ["家庭", "食物", "交通", "购物", "天气", "身体健康", "工作", "学校", "旅游", "运动爱好"],
    reading: ["日常生活", "中国文化", "名人故事", "科技新闻", "社会话题", "旅游见闻", "商务交流", "历史故事"],
    "fill-blank": ["量词", "介词", "连词", "副词", "助词", "动词搭配", "成语", "固定短语"],
    reorder: ["简单句", "复杂句", "疑问句", "比较句", "因果句", "条件句"],
    dialogue: ["问路", "点餐", "看病", "买东西", "打电话", "交朋友", "预约", "投诉"],
  },
  programming: {
    concept: ["Variables & Types", "Control Flow", "Functions", "Data Structures", "OOP", "File I/O", "Error Handling", "Modules & Packages", "List Comprehensions", "Decorators"],
    "fix-bug": ["Syntax Errors", "Logic Errors", "Index Errors", "Type Errors", "Infinite Loops", "Scope Issues", "Off-by-one Errors", "File Handling Bugs"],
    "mini-project": ["Calculator", "To-do List", "Quiz Game", "Password Generator", "Weather App", "Expense Tracker", "Text Adventure", "Contact Book"],
  },
};

function buildPrompt(subject: string, category: string, level: string, index: number, existingTitles: string[], suggestedTopic: string): string {
  const seed = `Variation seed: ${Date.now()}-${index}`;

  // Build anti-duplicate instruction
  let antiDuplicateBlock = "";
  if (existingTitles.length > 0) {
    const titleList = existingTitles.slice(0, 30).map((t, i) => `${i + 1}. ${t}`).join("\n");
    antiDuplicateBlock = `\n\nIMPORTANT - DO NOT duplicate these existing lessons:\n${titleList}\n\nYou MUST create a COMPLETELY NEW and DIFFERENT lesson. Use a different topic, different examples, and different questions.\n`;
  }

  const topicInstruction = suggestedTopic ? `\nFocus this lesson on the topic: "${suggestedTopic}". Make sure the content is specifically about this topic.\n` : "";

  if (subject === "english") {
    const levelDesc = `CEFR ${level}`;
    switch (category) {
      case "fill-blank":
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique English fill-in-the-blank exercise for ${levelDesc} students. Return JSON:
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
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique English sentence reordering exercise for ${levelDesc}. Return JSON:
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
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique English real-life dialogue exercise for ${levelDesc}. Return JSON:
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
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique English ${category} lesson for ${levelDesc}. Return JSON:
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
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Chinese fill-in-the-blank exercise for ${levelDesc} students. Return JSON:
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
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Chinese sentence reordering exercise for ${levelDesc}. Return JSON:
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
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Chinese dialogue exercise for ${levelDesc}. Return JSON:
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
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Chinese ${category} lesson for ${levelDesc}. Return JSON:
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
      return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Python bug-fixing exercise for ${level} level. Return JSON:
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
      return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Python mini-project for ${level} level. Return JSON:
{
  "title": "Project title in Vietnamese",
  "title_en": "Project title in English",
  "description": "Project description in Vietnamese",
  "steps": [
    { "step": 1, "title": "Step title", "description": "What to do", "code": "Code for this step" }
  ],
  "full_code": "Complete working code",
  "extensions": ["Extension idea 1", "Extension idea 2"],
  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]
}
Provide 4-5 steps.`;
    default:
      return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Python ${category} lesson for ${level}. Return JSON:
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

// Simple similarity check using trigram overlap
function similarityScore(a: string, b: string): number {
  if (!a || !b) return 0;
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF\u4E00-\u9FFF\s]/g, "").trim();
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return 1;

  const trigrams = (s: string): Set<string> => {
    const t = new Set<string>();
    for (let i = 0; i <= s.length - 3; i++) t.add(s.substring(i, i + 3));
    return t;
  };

  const ta = trigrams(na);
  const tb = trigrams(nb);
  if (ta.size === 0 || tb.size === 0) return 0;

  let overlap = 0;
  for (const t of ta) if (tb.has(t)) overlap++;
  return (2 * overlap) / (ta.size + tb.size);
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

    // Fetch existing lesson titles for duplicate prevention
    const { data: existingLessons } = await supabaseAdmin
      .from("generated_lessons")
      .select("title, title_en")
      .eq("subject", subject)
      .eq("category", category)
      .eq("level", effectiveLevel)
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(50);

    const existingTitles = (existingLessons || []).map(l => l.title).filter(Boolean);

    // Topic rotation: pick a topic that hasn't been covered much
    const topicPool = TOPIC_ROTATION[subject]?.[category] || [];
    let suggestedTopic = "";
    if (topicPool.length > 0) {
      // Count how many times each topic appears in existing titles
      const topicCounts = topicPool.map(topic => {
        const count = existingTitles.filter(t =>
          t.toLowerCase().includes(topic.toLowerCase()) ||
          similarityScore(t, topic) > 0.3
        ).length;
        return { topic, count };
      });
      // Sort by least used, pick randomly from the 3 least used
      topicCounts.sort((a, b) => a.count - b.count);
      const candidates = topicCounts.slice(0, Math.min(3, topicCounts.length));
      suggestedTopic = candidates[Math.floor(Math.random() * candidates.length)].topic;
    }

    const index = Math.floor(Math.random() * 10000);
    const prompt = buildPrompt(subject, category, effectiveLevel, index, existingTitles, suggestedTopic);

    // Attempt up to 2 tries if similarity is too high
    let content: any = null;
    let attempts = 0;
    const MAX_ATTEMPTS = 2;

    while (attempts < MAX_ATTEMPTS) {
      attempts++;

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
          temperature: 0.9,
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

      content = JSON.parse(jsonMatch[0]);

      // Check similarity with existing titles
      const newTitle = content.title || "";
      const isDuplicate = existingTitles.some(t => similarityScore(t, newTitle) > 0.8);

      if (!isDuplicate || attempts >= MAX_ATTEMPTS) break;
      console.log(`Attempt ${attempts}: Title "${newTitle}" too similar, retrying...`);
    }

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

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

async function logUsage(fn: string, model: string, domain: string, tokens: number, status: string, err?: string) {
  try {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await sb.from("api_usage_log").insert({ function_name: fn, model, domain, tokens_used: tokens, estimated_cost: tokens * 0.000001, status, error_message: err || null });
  } catch (e) { console.error("Usage logging failed:", e); }
}

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
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique English fill-in-the-blank exercise for ${levelDesc} students. Return JSON:\n{\n  "title": "Exercise title in Vietnamese",\n  "title_en": "Exercise title in English",\n  "instructions": "Instructions in Vietnamese",\n  "sentences": [\n    { "text": "I ___ (go) to school yesterday.", "answer": "went", "hint": "past tense of 'go'" }\n  ],\n  "tips": ["Tip 1", "Tip 2"],\n  "quiz": [{ "question": "Question", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]\n}\nProvide 6 sentences, 2 tips, 2 quiz questions. Vietnamese explanations.`;
      case "reorder":
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique English sentence reordering exercise for ${levelDesc}. Return JSON:\n{\n  "title": "Title in Vietnamese",\n  "title_en": "Title in English",\n  "instructions": "Instructions in Vietnamese",\n  "sentences": [\n    { "scrambled": ["school", "to", "I", "go", "every day"], "correct": "I go to school every day", "translation": "Vietnamese translation" }\n  ],\n  "tips": ["Tip"],\n  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]\n}\nProvide 6 sentences, 2 tips, 2 quiz questions.`;
      case "dialogue":
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique English real-life dialogue exercise for ${levelDesc}. Return JSON:\n{\n  "title": "Title in Vietnamese",\n  "title_en": "Title in English",\n  "scenario": "Scenario description in Vietnamese",\n  "dialogue": [\n    { "speaker": "A", "line": "English line", "translation": "Vietnamese" }\n  ],\n  "vocabulary": [{ "word": "word", "meaning": "Vietnamese meaning", "example": "Example sentence" }],\n  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]\n}\nProvide 8+ dialogue lines, 4 vocab items, 3 quiz questions.`;
      default:
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique English ${category} lesson for ${levelDesc}. Return JSON:\n{\n  "title": "Title in Vietnamese",\n  "title_en": "Title in English",\n  "passage": "Reading passage (if applicable)",\n  "points": [{ "rule": "Grammar rule", "examples": ["ex1", "ex2"] }],\n  "vocabulary": [{ "word": "w", "meaning": "m", "example": "e" }],\n  "tips": ["tip1", "tip2"],\n  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]\n}\nProvide rich content with 3+ quiz questions. Vietnamese explanations.`;
    }
  }

  if (subject === "chinese") {
    const levelDesc = level;
    switch (category) {
      case "fill-blank":
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Chinese fill-in-the-blank exercise for ${levelDesc} students. Return JSON:\n{\n  "title": "Title in Vietnamese",\n  "title_en": "Title in English",\n  "instructions": "Instructions in Vietnamese",\n  "sentences": [\n    { "text": "我___去学校。", "answer": "每天", "pinyin": "měitiān", "hint": "every day" }\n  ],\n  "tips": ["Tip"],\n  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]\n}\nProvide 6 sentences, 2 tips, 2 quiz questions. Vietnamese explanations.`;
      case "reorder":
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Chinese sentence reordering exercise for ${levelDesc}. Return JSON:\n{\n  "title": "Title in Vietnamese",\n  "title_en": "Title in English",\n  "sentences": [\n    { "scrambled": ["学校", "去", "我", "每天"], "correct": "我每天去学校", "pinyin": "wǒ měitiān qù xuéxiào", "translation": "Vietnamese" }\n  ],\n  "tips": ["Tip"],\n  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]\n}\nProvide 6 sentences, 2 tips, 2 quiz.`;
      case "dialogue":
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Chinese dialogue exercise for ${levelDesc}. Return JSON:\n{\n  "title": "Title in Vietnamese",\n  "title_en": "Title in English",\n  "scenario": "Scenario in Vietnamese",\n  "dialogue": [\n    { "speaker": "A", "line": "Chinese line", "pinyin": "pīnyīn", "translation": "Vietnamese" }\n  ],\n  "vocabulary": [{ "word": "字", "pinyin": "zì", "meaning": "Vietnamese", "example": "Example" }],\n  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]\n}\nProvide 8+ dialogue lines, 4 vocab, 3 quiz.`;
      default:
        return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Chinese ${category} lesson for ${levelDesc}. Return JSON:\n{\n  "title": "Title in Vietnamese",\n  "title_en": "Title in English",\n  "passage": "Chinese passage with pinyin",\n  "points": [{ "rule": "Grammar rule in Vietnamese", "examples": ["ex with **bold**"] }],\n  "vocabulary": [{ "word": "字", "pinyin": "zì", "meaning": "Vietnamese", "example": "Example" }],\n  "tips": ["tip"],\n  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]\n}\nProvide rich content. Vietnamese explanations.`;
    }
  }

  switch (category) {
    case "fix-bug":
      return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Python bug-fixing exercise for ${level} level. Return JSON:\n{\n  "title": "Title in Vietnamese",\n  "title_en": "Title in English",\n  "description": "Context in Vietnamese",\n  "buggy_code": "Python code with 2-3 bugs",\n  "bugs": [\n    { "line": 3, "description": "Bug description in Vietnamese", "fix": "Corrected line" }\n  ],\n  "fixed_code": "Complete corrected code",\n  "explanation": "Detailed explanation in Vietnamese",\n  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]\n}\nMake bugs realistic and educational. 2 quiz questions.`;
    case "mini-project":
      return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Python mini-project for ${level} level. Return JSON:\n{\n  "title": "Project title in Vietnamese",\n  "title_en": "Project title in English",\n  "description": "Project description in Vietnamese",\n  "steps": [\n    { "step": 1, "title": "Step title", "description": "What to do", "code": "Code for this step" }\n  ],\n  "full_code": "Complete working code",\n  "extensions": ["Extension idea 1", "Extension idea 2"],\n  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]\n}\nProvide 4-5 steps.`;
    default:
      return `${seed}${antiDuplicateBlock}${topicInstruction}\nCreate a unique Python ${category} lesson for ${level}. Return JSON:\n{\n  "title": "Title in Vietnamese",\n  "title_en": "Title in English",\n  "theory": "Theory explanation in Vietnamese",\n  "code": "Python code example",\n  "exercise": "Practice exercise in Vietnamese",\n  "tips": ["tip1", "tip2"],\n  "quiz": [{ "question": "Q", "options": ["A","B","C","D"], "answer": 0, "explanation": "Why" }]\n}\nProvide rich content with 3 quiz questions.`;
  }
}

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
    // JWT Authentication - get userId from token
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
    const userId = claimsData.claims.sub;

    const { subject, category, level } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    const validCategories = CATEGORIES[subject];
    if (!validCategories) throw new Error(`Invalid subject: ${subject}`);
    if (!validCategories.includes(category)) throw new Error(`Invalid category: ${category}`);
    const validLevels = LEVELS[subject];
    const effectiveLevel = level && validLevels?.includes(level) ? level : validLevels?.[0] || "beginner";

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

    const topicPool = TOPIC_ROTATION[subject]?.[category] || [];
    let suggestedTopic = "";
    if (topicPool.length > 0) {
      const topicCounts = topicPool.map(topic => {
        const count = existingTitles.filter(t =>
          t.toLowerCase().includes(topic.toLowerCase()) ||
          similarityScore(t, topic) > 0.3
        ).length;
        return { topic, count };
      });
      topicCounts.sort((a, b) => a.count - b.count);
      const candidates = topicCounts.slice(0, Math.min(3, topicCounts.length));
      suggestedTopic = candidates[Math.floor(Math.random() * candidates.length)].topic;
    }

    const index = Math.floor(Math.random() * 10000);
    const prompt = buildPrompt(subject, category, effectiveLevel, index, existingTitles, suggestedTopic);

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
        await logUsage("generate-and-store-lesson", "sonar", subject, 0, "error", `HTTP ${response.status}`);
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const data = await response.json();
      const raw = data.choices?.[0]?.message?.content || "";
      const tokensUsed = data.usage?.total_tokens || Math.ceil(raw.length / 4);
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        await logUsage("generate-and-store-lesson", "sonar", subject, tokensUsed, "parse_error");
        throw new Error("Could not parse lesson content");
      }

      content = JSON.parse(jsonMatch[0]);
      await logUsage("generate-and-store-lesson", "sonar", subject, tokensUsed, "success");

      const newTitle = content.title || "";
      const isDuplicate = existingTitles.some(t => similarityScore(t, newTitle) > 0.8);
      if (!isDuplicate || attempts >= MAX_ATTEMPTS) break;
      console.log(`Attempt ${attempts}: Title "${newTitle}" too similar, retrying...`);
    }

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

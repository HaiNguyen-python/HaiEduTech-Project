import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { language, topic, lessonType } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY is not configured");

    const langLabel = language === "english" ? "English" : "Chinese";
    const isChineseLesson = language === "chinese";

    let systemPrompt = `You are an expert language teacher creating educational content. Always respond in valid JSON format.`;

    let userPrompt = "";

    if (lessonType === "grammar") {
      userPrompt = `Create a unique ${langLabel} grammar lesson about "${topic}". Return JSON:
{
  "title": "Lesson title",
  "points": [
    { "rule": "Grammar rule explanation in Vietnamese", "examples": ["example 1 with **bold** key parts", "example 2"] }
  ],
  ${isChineseLesson ? '"vocabulary": [{ "word": "字", "pinyin": "zì", "meaning": "Vietnamese meaning", "example": "Example sentence" }],' : ''}
  "tips": ["Memory tip 1", "Memory tip 2", "Memory tip 3"],
  "quiz": [
    { "question": "Question text", "options": ["A", "B", "C", "D"], "answer": 0, "explanation": "Why this is correct in Vietnamese" }
  ],
  "challenge": { "question": "Quick 1-minute challenge question", "options": ["A","B","C","D"], "answer": 1, "explanation": "Explanation" }
}
Provide 3 grammar points, 3 tips, and 3 quiz questions. Make content unique and engaging. Write explanations in Vietnamese.`;
    } else if (lessonType === "vocabulary") {
      userPrompt = `Create a unique ${langLabel} vocabulary lesson about "${topic}". Return JSON:
{
  "title": "Lesson title",
  "vocabulary": [
    { "word": "word", ${isChineseLesson ? '"pinyin": "pīnyīn",' : ''} "meaning": "Vietnamese meaning", "example": "Example with **bold** keyword" }
  ],
  "tips": ["Study tip 1", "Study tip 2", "Study tip 3"],
  "quiz": [
    { "question": "Question", "options": ["A","B","C","D"], "answer": 0, "explanation": "Explanation in Vietnamese" }
  ],
  "challenge": { "question": "Quick challenge", "options": ["A","B","C","D"], "answer": 0, "explanation": "Explanation" }
}
Provide 6 vocabulary items, 3 tips, 3 quiz questions. Write in Vietnamese.`;
    } else {
      userPrompt = `Create a unique ${langLabel} reading comprehension lesson about "${topic}". Return JSON:
{
  "title": "Lesson title",
  "passage": "A reading passage (150-200 words) ${isChineseLesson ? 'in Chinese with Vietnamese translation in parentheses after each sentence' : 'in English'}",
  "tips": ["Reading tip 1", "Reading tip 2"],
  "quiz": [
    { "question": "Comprehension question", "options": ["A","B","C","D"], "answer": 0, "explanation": "Explanation in Vietnamese" }
  ],
  "challenge": { "question": "Quick challenge based on the passage", "options": ["A","B","C","D"], "answer": 0, "explanation": "Explanation" }
}
Provide 3 quiz questions. Write explanations in Vietnamese.`;
    }

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
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Perplexity error:", response.status, errText);
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Could not parse lesson content");

    const lessonContent = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(lessonContent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-lesson error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

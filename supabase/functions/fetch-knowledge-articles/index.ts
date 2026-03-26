// Edge function: Fetch and store knowledge hub articles using Perplexity API
// Fetches 3-5 high-quality articles daily on AI, Education, and Language Learning

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

async function logUsage(fn: string, model: string, domain: string, tokens: number, status: string, err?: string) {
  try {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await sb.from("api_usage_log").insert({ function_name: fn, model, domain, tokens_used: tokens, estimated_cost: tokens * 0.000001, status, error_message: err || null });
  } catch (e) { console.error("Usage logging failed:", e); }
}

const CATEGORIES = [
  {
    key: "ai_education",
    labelEn: "AI & Education",
    labelVi: "AI & Giáo dục",
    query:
      "Most popular and highly-viewed articles this week about AI tools for education, such as ChatGPT for learning, AI tutoring breakthroughs, or personalized learning platforms. Focus on practical, viral content that students and teachers find useful.",
  },
  {
    key: "language_tech",
    labelEn: "Language Learning",
    labelVi: "Công nghệ Ngôn ngữ",
    query:
      "Trending and most-shared articles this week about language learning innovations — IELTS/TOEIC preparation tips, AI-powered language apps, spaced repetition research, or Chinese/English learning strategies. Prioritize content with high engagement and practical value for learners.",
  },
  {
    key: "data_edtech",
    labelEn: "Data & EdTech",
    labelVi: "Data & EdTech",
    query:
      "Most popular articles this week about data science career paths, Python/SQL learning resources, EdTech startup news, or learning analytics trends. Focus on content that would interest students learning programming and data engineering.",
  },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const perplexityKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!perplexityKey) {
      throw new Error("PERPLEXITY_API_KEY not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const allArticles: any[] = [];

    // Fetch articles for each category using Perplexity
    for (const cat of CATEGORIES) {
      const prompt = `You are a content curator for HaiEduTech — an education platform teaching IELTS English, HSK Chinese, and Python/SQL programming.

Find exactly 2 HIGH-QUALITY, TRENDING articles from this week about: ${cat.query}

STRICT SELECTION CRITERIA:
- Must be from reputable sources (major publications, popular tech blogs, well-known education sites)
- Must have high engagement (widely shared, many views, or from viral threads)
- Must be directly relevant to students learning languages or programming
- Must contain actionable insights, not just news announcements
- NO clickbait, NO opinion pieces without substance, NO press releases

For each article, provide:
1. An engaging English title (max 100 chars)
2. A natural Vietnamese translation of the title  
3. A compelling English summary (2-3 sentences, max 250 chars) that makes students want to read
4. A natural Vietnamese translation of the summary
5. The source website name
6. The source URL (must be a real, working URL)

Return ONLY valid JSON array:
[{"title":"...","title_vi":"...","summary":"...","summary_vi":"...","source_name":"...","source_url":"..."}]`;

      try {
        const response = await fetch(
          "https://api.perplexity.ai/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${perplexityKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "sonar",
              messages: [
                {
                  role: "system",
                  content:
                    "You are a research assistant. Return ONLY valid JSON arrays, no markdown, no extra text.",
                },
                { role: "user", content: prompt },
              ],
              temperature: 0.3,
            }),
          }
        );

        if (!response.ok) {
          console.error(`Perplexity API error for ${cat.key}: ${response.status}`);
          await logUsage("fetch-knowledge-articles", "sonar", "english", 0, "error", `HTTP ${response.status} for ${cat.key}`);
          continue;
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || "";

        // Extract JSON from response (handle markdown code blocks)
        const jsonMatch = content.match(/\[[\s\S]*?\]/);
        if (!jsonMatch) {
          console.error(`No JSON found in response for ${cat.key}`);
          continue;
        }

        const articles = JSON.parse(jsonMatch[0]);

        for (const article of articles) {
          allArticles.push({
            title: article.title,
            title_vi: article.title_vi || null,
            summary: article.summary,
            summary_vi: article.summary_vi || null,
            category: cat.key,
            source_url: article.source_url || null,
            source_name: article.source_name || null,
            thumbnail_url: null,
            engagement_score: 0,
            is_featured: false,
          });
        }
      } catch (parseError) {
        console.error(`Error processing ${cat.key}:`, parseError);
        continue;
      }
    }

    if (allArticles.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No articles fetched",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check for duplicate titles before inserting
    const { data: existing } = await supabase
      .from("knowledge_hub_posts")
      .select("title")
      .gte(
        "created_at",
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      );

    const existingTitles = new Set(
      (existing || []).map((e: any) => e.title.toLowerCase())
    );

    const uniqueArticles = allArticles.filter(
      (a) => !existingTitles.has(a.title.toLowerCase())
    );

    // Mark the first article as featured (Article of the Day)
    if (uniqueArticles.length > 0) {
      uniqueArticles[0].is_featured = true;
    }

    if (uniqueArticles.length > 0) {
      const { error: insertError } = await supabase
        .from("knowledge_hub_posts")
        .insert(uniqueArticles);

      if (insertError) {
        console.error("Insert error:", insertError);
        throw insertError;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        fetched: allArticles.length,
        inserted: uniqueArticles.length,
        skipped_duplicates: allArticles.length - uniqueArticles.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in fetch-knowledge-articles:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

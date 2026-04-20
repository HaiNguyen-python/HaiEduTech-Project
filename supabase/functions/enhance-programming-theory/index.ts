// Edge function: rewrite a programming lesson into a 1000-word Deep-Dive
// using Perplexity sonar-pro. Caches the result in programming_theory_cache.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a senior technical writer for HaiEduTech, an EdTech platform.
Your job: rewrite a programming/data/cloud lesson into a deep, modern, 2026-grade theory document.

OUTPUT RULES (STRICT):
- Output Markdown only. No prose around it. No "Here is..." preface.
- Length: 800-1100 words.
- All comments inside code blocks must be in English.
- Use this exact section structure with H2 (##) headings:

## 1. Executive Summary
2-3 punchy sentences explaining what the concept is and why it matters in 2026.

## 2. The "Why" & "When"
Real-world use cases. When to choose this over alternatives. Use a comparison sentence.

## 3. Key Concepts & Terminology
Define terms in **bold**. Use a bullet list.

## 4. Detailed Breakdown
Use ### sub-headings for each sub-topic. Include code snippets in fenced blocks with language tag.
Where a visual genuinely helps comprehension, embed AT MOST ONE simple Mermaid diagram. Diagram rules (STRICT):
- Prefer \`flowchart LR\` (left-right) or \`flowchart TD\` (top-down). Avoid complex graphs.
- Maximum 6 nodes. Maximum 7 edges. No nested subgraphs.
- Each node label MUST be 1-3 short words (a noun phrase). NEVER a sentence. NEVER more than 22 characters.
- Do NOT use \`<br>\` to stuff multi-line labels — keep labels short instead.
- If the relationship is better expressed as a comparison or list, SKIP the diagram and use a table or bullets instead.
Example of an acceptable diagram:
\`\`\`mermaid
flowchart LR
  A[Client] --> B[API]
  B --> C[Database]
\`\`\`

## 5. Comparative Table
A markdown table comparing this technology to 1-2 alternatives. Always include a table.

## 6. Best Practices & Anti-Patterns
Two short bullet lists labeled **Best practices** and **Anti-patterns**.

## 7. Pro Tips & Pitfalls
Use markdown blockquotes for highlights:
- "> 💡 Tip: ..." for optimization tips
- "> ⚠️ Warning: ..." for security/perf risks
- "> 📝 Note: ..." for important context

## 8. Deep Dive (Optional)
Wrap advanced material in a fenced \`:::deepdive title="..."\` block:
:::deepdive title="Under the hood: how the runtime schedules tasks"
Advanced explanation here.
:::

GROUND your content in current 2025-2026 industry standards (real frameworks, real services, real best practices).
NEVER invent fake APIs.`;

interface Body {
  module_id: string;
  lesson_id: string;
  lesson_title: string;
  module_title: string;
  base_theory: string;
  code_language?: string;
  force_refresh?: boolean;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) {
      return new Response(JSON.stringify({ error: "PERPLEXITY_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as Body;
    if (!body.module_id || !body.lesson_id || !body.lesson_title) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceRoleKey);

    // 1. Cache lookup unless force refresh
    if (!body.force_refresh) {
      const { data: cached } = await admin
        .from("programming_theory_cache")
        .select("enhanced_markdown, citations")
        .eq("module_id", body.module_id)
        .eq("lesson_id", body.lesson_id)
        .maybeSingle();
      if (cached?.enhanced_markdown) {
        return new Response(
          JSON.stringify({
            cached: true,
            markdown: cached.enhanced_markdown,
            citations: cached.citations || [],
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    // 2. Resolve user (optional — used to attribute the generation)
    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
        global: { headers: { Authorization: authHeader } },
      });
      const { data: { user } } = await userClient.auth.getUser();
      if (user) userId = user.id;
    }

    const userPrompt = `Lesson context:
- Module: ${body.module_title}
- Lesson: ${body.lesson_title}
- Code language: ${body.code_language || "text"}

Existing theory snippet (use as starting point but expand significantly with 2026 best practices):
"""
${(body.base_theory || "").slice(0, 3000)}
"""

Now produce the full Deep-Dive Markdown using the strict structure.`;

    // 3. Call Perplexity
    const ppxResp = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 2400,
      }),
    });

    if (!ppxResp.ok) {
      const txt = await ppxResp.text();
      console.error("Perplexity error:", ppxResp.status, txt);
      return new Response(JSON.stringify({ error: "AI provider error", status: ppxResp.status }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await ppxResp.json();
    const markdown: string = data?.choices?.[0]?.message?.content || "";
    const citations: string[] = data?.citations || [];

    if (!markdown.trim()) {
      return new Response(JSON.stringify({ error: "Empty AI response" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 4. Cache (upsert by module+lesson)
    await admin.from("programming_theory_cache").upsert(
      {
        module_id: body.module_id,
        lesson_id: body.lesson_id,
        enhanced_markdown: markdown,
        citations,
        generated_by: userId,
      },
      { onConflict: "module_id,lesson_id" },
    );

    // 5. Best-effort usage logging (non-blocking)
    admin.from("api_usage_log").insert({
      function_name: "enhance-programming-theory",
      model: "sonar-pro",
      domain: "programming",
      user_id: userId,
      tokens_used: data?.usage?.total_tokens || 0,
      estimated_cost: ((data?.usage?.total_tokens || 0) / 1000) * 0.005,
      status: "success",
    }).then(() => {}).catch(() => {});

    return new Response(
      JSON.stringify({ cached: false, markdown, citations }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("enhance-programming-theory error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

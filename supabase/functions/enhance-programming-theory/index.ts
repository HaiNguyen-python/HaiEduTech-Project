import "../_shared/ai-fallback.ts";
// Edge function: rewrite a programming lesson into a 1000-word Deep-Dive
// using Perplexity sonar-pro, plus generate 1-2 cute infographic illustrations
// via the generate-lesson-illustrations function. Caches everything in
// programming_theory_cache.
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
- WRITE EVERYTHING IN ENGLISH ONLY: headings, explanations, bullet lists, tables,
  diagram labels, image captions and all comments inside code blocks.
  Never output Vietnamese or any other language, even if the source lesson contains it.
- NEVER use em dashes or en dashes. Use the ASCII hyphen-minus character (-) instead.
- NEVER write literal "\\n" escape sequences. Use real line breaks.
- NEVER wrap math in backticks. Inline math is $...$ and display math is $$...$$ with no surrounding backticks.
- NEVER add a "Deep Dive", "Optional", "Bonus" or "Appendix" section, and never leave an empty heading.
- Bold the most important technical terms and key phrases with **...** when they first appear in EACH section.
- Prioritize the lesson's domain vocabulary (Python, SQL, data structures, web, cloud, cybersecurity, AI/ML/NLP, data engineering, software engineering, EdTech, or startup concepts) and terms defined under Key Concepts.
- Keep emphasis restrained: usually 1-3 bold phrases per paragraph. Never bold a whole sentence.
- Never add bold markers inside code, inline code, math, Mermaid diagrams, URLs, or link destinations.
- Indent Python with exactly 4 spaces per nesting level. Indent JavaScript, TypeScript, JSON, CSS, HTML, YAML, Bash, Java, HCL and Mermaid with exactly 2 spaces per nesting level. Never use tabs or one-space structural indentation.
- Use this exact section structure with H2 (##) headings:

## 1. Executive Summary
2-3 punchy prose sentences explaining what the concept is and why it matters in 2026. Do not use bullets here.

## 2. The "Why" & "When"
Use short prose paragraphs for real-world use cases and when to choose this over alternatives. Use a comparison sentence. Do not turn the whole section into a list.

## 3. Key Concepts & Terminology
Define terms in **bold**. Use bullets only for short, independent definitions. If a definition needs more than two sentences, use a short paragraph under a ### term heading.

## 4. Detailed Breakdown
Use ### sub-headings for each sub-topic. Include code snippets in fenced blocks with language tag.
Use numbered lists only for procedures where order matters. Use unordered bullets only for three or more short parallel items. Never use a bullet as a category heading with indented bullets beneath it; use a ### heading instead. Use prose paragraphs for explanation and a table for multi-criteria comparisons.
Where a visual genuinely helps comprehension, embed AT MOST ONE simple Mermaid diagram. Diagram rules (STRICT):
- Prefer \`flowchart LR\` (left-right) or \`flowchart TD\` (top-down). Avoid complex graphs.
- Maximum 6 nodes. Maximum 7 edges. No nested subgraphs.
- Each node label MUST be 1-3 short words (a noun phrase). NEVER a sentence. NEVER more than 22 characters.
- Do NOT use \`<br>\` to stuff multi-line labels — keep labels short instead.
- If the relationship is better expressed as a comparison or list, SKIP the diagram and use a table or bullets instead.

MATH RULES (STRICT):
- For ANY mathematical formula, use proper LaTeX delimiters that KaTeX can render:
  - Inline math: \`$...$\` (e.g., \`$R^2 = 1 - \\frac{SS_{res}}{SS_{tot}}$\`)
  - Display math: \`$$...$$\` on its own line.
- NEVER write formulas as raw parentheses like \`( \\frac{1}{n} \\sum (y - \\hat{y})^2 )\` — they will render as broken text.
- NEVER use \`\\(\` \`\\)\` or \`\\[\` \`\\]\` — only \`$\` and \`$$\`.
- Keep each display formula short (1 line). For multi-step derivations, use multiple \`$$...$$\` blocks.
- Norms: write \`$\\|\\beta\\|^2$\` (NEVER \`||\\beta||^2\`, NEVER \`((\\lambda ||\\beta||^2))\`).
- L2 penalty example: \`$\\lambda \\|\\beta\\|^2$\`
- Sum example: \`$\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2$\`
- ALWAYS wrap formulas in \`$...$\` — never leave bare LaTeX inside text parentheses.

Example of an acceptable diagram:
\`\`\`mermaid
flowchart LR
  A[Client] --> B[API]
  B --> C[Database]
\`\`\`

## 5. Comparative Table
A markdown table comparing this technology to 1-2 alternatives. Always include a table.

## 6. Best Practices & Anti-Patterns
Use two ### sub-headings named "Best practices" and "Anti-patterns", each followed by a short bullet list. Keep each bullet concise and focused on one actionable idea.

## 7. Pro Tips & Pitfalls
Use markdown blockquotes for highlights:
> 💡 Tip: ... for optimization tips
> ⚠️ Warning: ... for security/perf risks
> 📝 Note: ... for important context
Write each callout as a standalone blockquote, never as a bullet containing a blockquote.

Do not add optional, bonus, appendix, or \`:::deepdive\` sections. Keep the lesson focused on the required material only.

GROUND your content in current 2025-2026 industry standards (real frameworks, real services, real best practices).
NEVER invent fake APIs.

═══════════════════════════════════════════════════════════════
ILLUSTRATIONS (REQUIRED — APPENDED AFTER ALL MARKDOWN)

After the entire markdown above, on a new line, append EXACTLY ONE fenced JSON
block describing 1-2 cute infographic illustrations to generate. The first
illustration should illustrate "Detailed Breakdown" (anchor: "detailed-breakdown"),
the second should illustrate the comparison (anchor: "comparative-table").

Each "prompt" must be a SHORT visual concept phrase (max 14 words), describing
WHAT the illustration shows — not full instructions. NO style words (we add the style).
Example good prompts:
  - "decision tree branching into leaves with classification icons"
  - "three side-by-side cards comparing tree, random forest, gradient boosting"
  - "data flowing from source through ETL pipeline into warehouse"
Example bad prompts (DO NOT USE):
  - "create a beautiful illustration of..." (too instructional)
  - "a comprehensive overview showing many different aspects" (too vague)

Each "caption" is a short italic line (max 8 words) shown under the image.

Format EXACTLY (do not deviate):
\`\`\`json
{"illustrations":[{"anchor":"detailed-breakdown","prompt":"...","caption":"..."},{"anchor":"comparative-table","prompt":"...","caption":"..."}]}
\`\`\`
`;

interface Body {
  module_id: string;
  lesson_id: string;
  lesson_title: string;
  module_title: string;
  base_theory: string;
  /** base64 of base_theory; used for security lessons whose raw text trips the edge firewall */
  base_theory_b64?: string;
  code_language?: string;
  force_refresh?: boolean;
}

interface IllustrationSpec {
  anchor: string;
  prompt: string;
  caption?: string;
}

function isIllustrationSpec(value: unknown): value is IllustrationSpec {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.anchor === "string" && typeof candidate.prompt === "string";
}

function normalizeProseDashes(markdown: string): string {
  let inFence = false;

  return markdown
    .split("\n")
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;

      return line
        .split(/(`[^`]*`)/g)
        .map((segment, index) => (index % 2 === 0 ? segment.replace(/[—–]/g, "-") : segment))
        .join("");
    })
    .join("\n");
}

const FOUR_SPACE_LANGUAGES = new Set(["python", "py"]);
const TWO_SPACE_LANGUAGES = new Set([
  "javascript", "js", "typescript", "ts", "tsx", "jsx", "json", "css", "scss", "html", "xml",
  "yaml", "yml", "bash", "sh", "shell", "java", "hcl", "terraform", "mermaid",
]);

function normalizeCodeBlock(code: string, language: string): string {
  const lang = language.toLowerCase();
  const tabWidth = FOUR_SPACE_LANGUAGES.has(lang) ? 4 : 2;
  const lines = code.replace(/\r\n?/g, "\n").replace(/\t/g, " ".repeat(tabWidth)).split("\n");
  while (lines.length && !lines[0]?.trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1]?.trim()) lines.pop();
  const indent = (line: string) => line.match(/^ */)?.[0].length ?? 0;
  const nonBlank = lines.filter((line) => line.trim());
  const common = nonBlank.length ? Math.min(...nonBlank.map(indent)) : 0;
  const dedented = lines.map((line) => line.slice(Math.min(common, indent(line))).trimEnd());
  const target = FOUR_SPACE_LANGUAGES.has(lang) ? 4 : TWO_SPACE_LANGUAGES.has(lang) ? 2 : 0;
  const joined = dedented.join("\n");
  const sensitiveLiteral = FOUR_SPACE_LANGUAGES.has(lang)
    ? /'''|"""/.test(joined)
    : ["javascript", "js", "typescript", "ts", "tsx", "jsx"].includes(lang) && /(?:^|[^\\])`/.test(joined);
  if (!target || sensitiveLiteral) return joined;
  const widths = dedented.filter((line) => line.trim() && indent(line) > 0).map(indent);
  const shallowest = widths.length ? Math.min(...widths) : target;
  if (shallowest >= target) return joined;
  return dedented.map((line) => {
    const width = indent(line);
    return !line.trim() || width === 0
      ? line
      : `${" ".repeat(Math.round(width * target / shallowest))}${line.slice(width)}`;
  }).join("\n");
}

function normalizeFencedCode(markdown: string): string {
  return markdown.replace(/```([^\n`]*)\n([\s\S]*?)```/g, (_whole, info: string, code: string) => {
    const cleanInfo = info.trim();
    const language = cleanInfo.split(/\s+/)[0] || "text";
    return `\`\`\`${cleanInfo}\n${normalizeCodeBlock(code, language)}\n\`\`\``;
  });
}

function normalizeMarkdownStructure(markdown: string): string {
  let inFence = false;
  const output: string[] = [];
  const lines = markdown
    .replace(/:::deepdive\s+title=["'][^"']+["']\s*\n[\s\S]*?:::/g, "")
    .replace(/```deepdive[\s\S]*$/g, "")
    // Empty "8. Deep Dive" style stubs left with no body.
    .replace(/(?:^|\n)#{1,6}[ \t]*\d*\.?[ \t]*Deep[ -]?Dive[^\n]*(?=\s*(?:\n#{1,6}\s|$))/gi, "")
    // Literal "\\n" escapes and backtick-wrapped math break rendering.
    .replace(/\\n(?![a-zA-Z])/g, "\n")
    .replace(/`\s*(\$\$?[^`\n]+?\$\$?)\s*`/g, "$1")
    .split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      output.push(line);
      continue;
    }
    if (inFence) {
      output.push(line);
      continue;
    }

    const group = /^-\s+\*\*([^*\n]+)\*\*\s*:?\s*$/.exec(line);
    if (group && /^ - \S/.test(lines[index + 1] ?? "")) {
      if (output.length > 0 && output[output.length - 1]?.trim()) output.push("");
      output.push(`### ${group[1].trim()}`, "");
      while (index + 1 < lines.length && /^ - \S/.test(lines[index + 1] ?? "")) {
        index += 1;
        output.push((lines[index] ?? "").replace(/^ (?=-\s)/, ""));
      }
      continue;
    }
    output.push(line);
  }

  return normalizeFencedCode(output.join("\n").replace(/\n{3,}/g, "\n\n").trim());
}

// Extract and remove ALL ```json {...} ``` blocks containing illustration
// specs (anywhere in the doc, not just trailing). Returns { markdown, specs }.
function extractIllustrationSpecs(md: string): { markdown: string; specs: IllustrationSpec[] } {
  const re = /```json\s*(\{[\s\S]*?"illustrations"[\s\S]*?\})\s*```/gi;
  let cleaned = md;
  let specs: IllustrationSpec[] = [];
  let match: RegExpExecArray | null;
  const blocks: { full: string; json: string }[] = [];
  while ((match = re.exec(md)) !== null) {
    blocks.push({ full: match[0], json: match[1] });
  }
  for (const b of blocks) {
    try {
      const parsed = JSON.parse(b.json);
      const arr = Array.isArray(parsed?.illustrations) ? parsed.illustrations : [];
      specs = arr
        .filter(isIllustrationSpec)
        .map((s) => ({
          anchor: String(s.anchor),
          prompt: String(s.prompt),
          caption: typeof s.caption === "string" ? s.caption : "",
        }))
        .slice(0, 2);
      if (specs.length > 0) break;
    } catch (e) {
      console.warn("Failed to parse illustration JSON block:", e);
    }
  }
  // Strip ALL such blocks from the markdown so they never render as code
  for (const b of blocks) cleaned = cleaned.replace(b.full, "").trimEnd();
  return { markdown: cleaned, specs };
}

// Fallback: if AI did not provide specs, derive 2 sensible prompts from the
// lesson title so we always render at least one illustration per lesson.
function fallbackSpecs(lessonTitle: string, moduleTitle: string): IllustrationSpec[] {
  const concept = lessonTitle.replace(/^[\d.\s-]+/, "").trim();
  const ctx = moduleTitle.replace(/^[\d.\s-]+/, "").trim();
  return [
    {
      anchor: "detailed-breakdown",
      prompt: `${concept} concept diagram with isometric icons and arrows`,
      caption: concept,
    },
    {
      anchor: "comparative-table",
      prompt: `three side-by-side comparison cards about ${concept} in ${ctx}`,
      caption: `Comparing approaches: ${concept}`,
    },
  ];
}

// Insert each illustration as ![caption](url) at the end of the matching
// "## N. <Title>" section. Anchor matches the slug of the H2 title.
function injectIllustrations(
  md: string,
  illustrations: { anchor: string; url: string; caption: string }[],
): string {
  if (illustrations.length === 0) return md;

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  // Map anchor → tokens that should appear in the H2 title (handle the "1. " prefix)
  const anchorMatchers: Record<string, RegExp> = {
    "detailed-breakdown": /detailed[\s-]?breakdown/i,
    "comparative-table": /comparat|comparison|comparison[\s-]?table/i,
  };

  // Split markdown by H2 headers, preserving them
  const parts = md.split(/(^##\s+[^\n]+$)/m);
  // parts looks like: [pre, "## 1. Foo", body, "## 2. Bar", body, ...]

  for (const ill of illustrations) {
    const matcher = anchorMatchers[ill.anchor] ||
      new RegExp(slugify(ill.anchor).replace(/-/g, "[\\s-]?"), "i");

    // Find the H2 part matching this anchor
    let injected = false;
    for (let i = 1; i < parts.length; i += 2) {
      const heading = parts[i];
      if (matcher.test(heading)) {
        const body = parts[i + 1] || "";
        const safeAlt = (ill.caption || "Illustration").replace(/[[\]]/g, "");
        const imgMd = `\n\n![${safeAlt}](${ill.url})\n\n`;
        // Insert the image after the first paragraph of the section so it
        // appears inline with the explanation.
        const trimmedBody = body.replace(/^\n+/, "");
        const firstBreak = trimmedBody.indexOf("\n\n");
        if (firstBreak > 0) {
          parts[i + 1] = "\n" + trimmedBody.slice(0, firstBreak) + imgMd + trimmedBody.slice(firstBreak + 2);
        } else {
          parts[i + 1] = "\n" + trimmedBody + imgMd;
        }
        injected = true;
        break;
      }
    }
    // Fallback: append at the end if no matching section found
    if (!injected) {
      const safeAlt = (ill.caption || "Illustration").replace(/[[\]]/g, "");
      parts.push(`\n\n![${safeAlt}](${ill.url})\n`);
    }
  }

  return parts.join("");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY && !Deno.env.get("LOVABLE_API_KEY")) {
      return new Response(JSON.stringify({ error: "No AI provider configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as Body;
    if (!body.base_theory && body.base_theory_b64) {
      try {
        body.base_theory = new TextDecoder().decode(
          Uint8Array.from(atob(body.base_theory_b64), (c) => c.charCodeAt(0)),
        );
      } catch {
        body.base_theory = "";
      }
    }
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
        .select("enhanced_markdown, citations, illustrations")
        .eq("module_id", body.module_id)
        .eq("lesson_id", body.lesson_id)
        .maybeSingle();
      if (cached?.enhanced_markdown) {
        // Strip Perplexity citation markers from previously cached content (legacy data)
        const cleanedCached = normalizeMarkdownStructure(normalizeProseDashes(cached.enhanced_markdown
          .replace(/\s*\[\d+(?:\s*[,\s]\s*\d+)*\]/g, "")
          .replace(/\n#{1,6}\s*(References|Sources|Citations|Tham khảo|Nguồn)[\s\S]*$/i, "")
          .replace(/[ \t]+([.,;:!?])/g, "$1")
          .replace(/[ \t]{2,}/g, " ")));
        return new Response(
          JSON.stringify({
            cached: true,
            markdown: cleanedCached,
            citations: cached.citations || [],
            illustrations: cached.illustrations || [],
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

Now produce the full Deep-Dive Markdown using the strict structure, and append the illustrations JSON block at the very end.`;

    // 3. Call Perplexity, then fall back to Lovable AI when it is unavailable
    //    (out of quota, rate limited, provider outage) so pre-generation never stalls.
    let data: Record<string, unknown> | null = null;
    let ppxStatus = 0;

    if (PERPLEXITY_API_KEY) {
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
          max_tokens: 2600,
        }),
      });
      ppxStatus = ppxResp.status;
      if (ppxResp.ok) {
        data = await ppxResp.json();
      } else {
        console.error("Perplexity error:", ppxResp.status, await ppxResp.text());
      }
    }

    if (!data) {
      const lovableKey = Deno.env.get("LOVABLE_API_KEY");
      if (lovableKey) {
        const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Lovable-API-Key": lovableKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3.8-flash",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: userPrompt },
            ],
          }),
        });
        if (aiResp.ok) {
          data = await aiResp.json();
        } else {
          console.error("Lovable AI error:", aiResp.status, await aiResp.text());
        }
      }
    }

    if (!data) {
      return new Response(
        JSON.stringify({
          cached: false,
          fallback: true,
          error: "AI provider temporarily unavailable",
          status: ppxStatus || 503,
          markdown: "",
          citations: [],
          illustrations: [],
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const choices = (data as { choices?: Array<{ message?: { content?: string } }> }).choices;
    let markdown: string = choices?.[0]?.message?.content || "";
    const citations: string[] = ((data as { citations?: string[] }).citations) || [];


    // Some Perplexity responses wrap the whole output in a ```markdown ... ``` fence.
    markdown = markdown.trim();
    const outerFence = markdown.match(/^```(?:markdown|md)?\s*\n([\s\S]*?)\n?```\s*$/i);
    if (outerFence) markdown = outerFence[1].trim();

    if (!markdown.trim()) {
      return new Response(
        JSON.stringify({
          cached: false,
          fallback: true,
          error: "Empty AI response",
          markdown: "",
          citations: [],
          illustrations: [],
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 4. Extract & strip the trailing illustrations JSON block + remove Perplexity citation markers like [1][2][3]
    const stripCitations = (md: string): string =>
      md
        // Remove sequences of citation refs e.g. [1], [2][3], [1, 2, 5]
        .replace(/\s*\[\d+(?:\s*[,\s]\s*\d+)*\]/g, "")
        // Remove a trailing "References" / "Sources" / "Citations" section if present
        .replace(/\n#{1,6}\s*(References|Sources|Citations|Tham khảo|Nguồn)[\s\S]*$/i, "")
        // Collapse extra blank space left by removed markers
        .replace(/[ \t]+([.,;:!?])/g, "$1")
        .replace(/[ \t]{2,}/g, " ");
    const { markdown: rawCleaned, specs: aiSpecs } = extractIllustrationSpecs(markdown);
    const cleanedMarkdown = normalizeMarkdownStructure(normalizeProseDashes(stripCitations(rawCleaned)));
    const specs = aiSpecs.length > 0 ? aiSpecs : fallbackSpecs(body.lesson_title, body.module_title);
    let finalMarkdown = cleanedMarkdown;
    let illustrations: { anchor: string; url: string; caption: string }[] = [];

    // 5. Generate illustrations (best-effort, never blocks final response)
    if (specs.length > 0) {
      try {
        const illResp = await fetch(`${supabaseUrl}/functions/v1/generate-lesson-illustrations`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${serviceRoleKey}`,
            "Content-Type": "application/json",
            apikey: serviceRoleKey,
          },
          body: JSON.stringify({
            module_id: body.module_id,
            lesson_id: body.lesson_id,
            lesson_title: body.lesson_title,
            sections: specs,
          }),
        });
        if (illResp.ok) {
          const illData = await illResp.json();
          if (Array.isArray(illData?.illustrations)) {
            illustrations = illData.illustrations;
            finalMarkdown = normalizeMarkdownStructure(normalizeProseDashes(injectIllustrations(cleanedMarkdown, illustrations)));
          }
        } else {
          console.warn("Illustration sub-call failed:", illResp.status, await illResp.text());
        }
      } catch (illErr) {
        console.warn("Illustration sub-call error (non-fatal):", illErr);
      }
    }

    // 6. Cache (upsert by module+lesson)
    await admin.from("programming_theory_cache").upsert(
      {
        module_id: body.module_id,
        lesson_id: body.lesson_id,
        enhanced_markdown: finalMarkdown,
        citations,
        illustrations,
        generated_by: userId,
      },
      { onConflict: "module_id,lesson_id" },
    );

    // 7. Best-effort usage logging (non-blocking)
    admin.from("api_usage_log").insert({
      function_name: "enhance-programming-theory",
      model: "sonar-pro",
      domain: "programming",
      user_id: userId,
      tokens_used: (data as { usage?: { total_tokens?: number } })?.usage?.total_tokens || 0,
      estimated_cost:
        (((data as { usage?: { total_tokens?: number } })?.usage?.total_tokens || 0) / 1000) * 0.005,
      status: "success",
    }).then(() => {}).catch(() => {});

    return new Response(
      JSON.stringify({ cached: false, markdown: finalMarkdown, citations, illustrations }),
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

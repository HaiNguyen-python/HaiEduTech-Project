import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface Body {
  module_id: string;
  lesson_id: string;
  lesson_title: string;
  force?: boolean;
}

interface Illustration {
  anchor: string;
  url: string;
  caption: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const cleanConcept = (value: string) =>
  value
    .replace(/[*_`#[\]{}()]/g, " ")
    .replace(/[^A-Za-z0-9+/.[\] -]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 8)
    .join(" ");

function sectionSubtopics(markdown: string): string[] {
  const match = markdown.match(/^##\s+(?:\d+\.\s*)?Detailed Breakdown\s*$([\s\S]*?)(?=^##\s+|$)/im);
  if (!match) return [];
  return Array.from(match[1].matchAll(/^###\s+(?:\d+\.\s*)?([^\n]+)$/gm))
    .map((item) => cleanConcept(item[1]))
    .filter(Boolean)
    .slice(0, 3);
}

function buildSpecs(markdown: string, lessonTitle: string) {
  const subtopics = sectionSubtopics(markdown);
  const genericTitle = /^(executive summary|lesson overview|programming concept)$/i.test(cleanConcept(lessonTitle));
  const concept = (genericTitle ? subtopics[0] : cleanConcept(lessonTitle)) || "programming concept";
  const detail = subtopics.length > 0 ? subtopics.join(" with ") : `${concept} workflow and core components`;
  return [
    {
      anchor: "detailed-breakdown",
      prompt: cleanConcept(`${detail} connected learning diagram`),
      caption: `How ${concept} works`,
    },
    {
      anchor: "comparative-table",
      prompt: cleanConcept(`${concept} alternatives side by side comparison`),
      caption: `Comparing ${concept} approaches`,
    },
  ];
}

function injectIllustrations(markdown: string, illustrations: Illustration[]): string {
  let result = markdown;
  const matchers: Record<string, RegExp> = {
    "detailed-breakdown": /^##\s+(?:\d+\.\s*)?Detailed Breakdown\s*$/im,
    "comparative-table": /^##\s+(?:\d+\.\s*)?(?:Comparative Table|Comparison Table)\s*$/im,
  };

  for (const illustration of illustrations.slice(0, 2)) {
    if (!illustration.url || result.includes(`](${illustration.url})`)) continue;
    const headingMatch = matchers[illustration.anchor]?.exec(result);
    const alt = (illustration.caption || "Lesson illustration").replace(/\[|\]/g, "");
    const image = `\n\n![${alt}](${illustration.url})`;

    if (!headingMatch || headingMatch.index === undefined) {
      result += image;
      continue;
    }

    const bodyStart = headingMatch.index + headingMatch[0].length;
    const nextHeading = result.slice(bodyStart).search(/\n##\s+/);
    const sectionEnd = nextHeading >= 0 ? bodyStart + nextHeading : result.length;
    const section = result.slice(bodyStart, sectionEnd);
    const paragraphBreak = section.search(/\n\s*\n/);
    const insertAt = paragraphBreak >= 0 ? bodyStart + paragraphBreak : sectionEnd;
    result = result.slice(0, insertAt) + image + result.slice(insertAt);
  }

  return result.replace(/\n{3,}/g, "\n\n").trim();
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Authentication required" }, 401);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !anonKey || !serviceRoleKey) return json({ error: "Backend configuration unavailable" }, 500);

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) return json({ error: "Invalid session" }, 401);

    const admin = createClient(supabaseUrl, serviceRoleKey);
    const { data: allowed } = await admin.rpc("is_staff", { _user_id: user.id });
    if (!allowed) return json({ error: "Staff access required" }, 403);

    const body = (await req.json()) as Body;
    if (!body.module_id || !body.lesson_id || !body.lesson_title) {
      return json({ error: "Missing module_id, lesson_id, or lesson_title" }, 400);
    }

    const { data: cached, error: cacheError } = await admin
      .from("programming_theory_cache")
      .select("enhanced_markdown, illustrations")
      .eq("module_id", body.module_id)
      .eq("lesson_id", body.lesson_id)
      .maybeSingle();
    if (cacheError) return json({ error: cacheError.message }, 500);
    if (!cached?.enhanced_markdown) return json({ error: "Cached theory not found" }, 404);

    const existing = Array.isArray(cached.illustrations) ? cached.illustrations : [];
    if (!body.force && (existing.length > 0 || /!\[[^\]]*\]\([^)]+\)/.test(cached.enhanced_markdown))) {
      return json({ skipped: true, illustrations: existing });
    }

    const illustrationResponse = await fetch(`${supabaseUrl}/functions/v1/generate-lesson-illustrations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceRoleKey}`,
        apikey: serviceRoleKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        module_id: body.module_id,
        lesson_id: body.lesson_id,
        lesson_title: body.lesson_title,
        sections: buildSpecs(cached.enhanced_markdown, body.lesson_title),
      }),
    });

    const illustrationData = await illustrationResponse.json().catch(() => ({}));
    if (!illustrationResponse.ok) {
      return json({ error: illustrationData?.error || "Illustration generation failed" }, illustrationResponse.status);
    }
    const illustrations = Array.isArray(illustrationData?.illustrations)
      ? illustrationData.illustrations.filter((item: Illustration) => item?.url).slice(0, 2)
      : [];
    if (illustrations.length === 0) return json({ error: "Image provider returned no illustration" }, 502);

    const markdownWithoutManagedImages = body.force
      ? cached.enhanced_markdown.replace(/\n*!\[[^\]]*\]\([^)]*\/lesson-illustrations\/[^)]*\)\n*/g, "\n\n")
      : cached.enhanced_markdown;
    const enhancedMarkdown = injectIllustrations(markdownWithoutManagedImages, illustrations);
    const { error: updateError } = await admin
      .from("programming_theory_cache")
      .update({ enhanced_markdown: enhancedMarkdown, illustrations })
      .eq("module_id", body.module_id)
      .eq("lesson_id", body.lesson_id);
    if (updateError) return json({ error: updateError.message }, 500);

    return json({ ok: true, illustrations });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unknown error" }, 500);
  }
});
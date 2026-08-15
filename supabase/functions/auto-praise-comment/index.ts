// Auto-praise comment: after a student posts to Your Corner, Coach Hai leaves a
// short praise comment (and, if there are grammar/spelling issues, a corrected version).
// Uses the service role to insert the comment as Coach Hai's user account.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Coach Hai (teacher) user id — used as the commenter.
const COACH_USER_ID = "e9f302be-c5c5-47ad-a57b-2ba323ea8947";

function stripHtml(s: string) {
  return (s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Ensure each numbered item in a list starts on its own line with a blank line between items.
 * Converts patterns like "1. ... 2. ..." into clearly separated block text.
 */
function normalizeNumberedList(text: string): string {
  if (!text) return "";
  return text
    .replace(/\s*(\d+\.\s)/g, "\n$1") // put each "N. " on a new line
    .replace(/\n\n+/g, "\n") // collapse excess blank lines
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .join("\n\n"); // one blank line between items
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: claims } = await userClient.auth.getClaims(authHeader.replace("Bearer ", ""));
    if (!claims?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const authorId = claims.claims.sub as string;

    const body = await req.json().catch(() => ({}));
    const postId: string | undefined = body?.postId;
    const rawContent: string = stripHtml(body?.content ?? "");
    if (!postId) {
      return new Response(JSON.stringify({ error: "Missing postId" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(url, service);

    // Don't praise Coach Hai's own posts, and avoid duplicate praise on the same post.
    if (authorId === COACH_USER_ID) {
      return new Response(JSON.stringify({ skipped: "self" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const { data: existing } = await admin
      .from("your_corner_comments")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", COACH_USER_ID)
      .limit(1);
    if (existing && existing.length > 0) {
      return new Response(JSON.stringify({ skipped: "already-commented" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Look up the author's display name.
    const { data: profile } = await admin
      .from("profiles")
      .select("full_name")
      .eq("id", authorId)
      .maybeSingle();
    const studentName = (profile?.full_name || "bạn").split(/\s+/).slice(-1)[0] || "bạn";

    // Compose the praise (+ optional correction) via Lovable AI.
    const aiKey = Deno.env.get("LOVABLE_API_KEY");
    let commentText = `Well done ${studentName}! Keep up the great work! 🌟`;

    if (aiKey && rawContent.length >= 8) {
      const prompt = `You are Coach Hai, a warm English/Vietnamese tutor commenting on a student's post.
Student name: ${studentName}
Post caption: """${rawContent.slice(0, 600)}"""

Tasks:
1. Write a short 1-sentence praise that reflects the SPECIFIC topic/content of the post (not generic).
2. If the caption is in English and has grammar OR spelling mistakes, provide a corrected version.
   - Keep the same numbered items as the original post (1., 2., 3., etc.) if they exist.
   - Put each numbered item on its OWN line with a blank line between items.
   - If the caption is not English, or has no clear issues, set "corrected" to null.

Respond with ONLY compact JSON:
{"praise":"Well done ${studentName}! <specific 1 sentence praise>","corrected":"<full corrected caption, each numbered item on its own line, or null>"}

The praise MUST start exactly with: "Well done ${studentName}!"
If corrected is not null, the final comment will be formatted as:
"<praise>

I would like to give you a better version of your work:

<corrected, one item per line>"`;

      try {
        const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Lovable-API-Key": aiKey },
          body: JSON.stringify({
            model: "google/gemini-3.6-flash",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.5,
          }),
        });
        if (aiRes.ok) {
          const j = await aiRes.json();
          const text: string = j.choices?.[0]?.message?.content ?? "";
          const cleaned = text.replace(/```[a-zA-Z]*/g, "").replace(/```/g, "").trim();
          const first = cleaned.indexOf("{");
          const last = cleaned.lastIndexOf("}");
          if (first !== -1 && last !== -1) {
            const parsed = JSON.parse(cleaned.slice(first, last + 1));
            let praise: string = (parsed.praise || "").trim();
            const corrected: string | null = parsed.corrected && String(parsed.corrected).trim() ? String(parsed.corrected).trim() : null;
            if (!praise.toLowerCase().startsWith("well done")) {
              praise = `Well done ${studentName}! ${praise}`;
            }
            commentText = corrected
              ? `${praise} I would like to give you a better version of your work: ${corrected}`
              : praise;
          }
        }
      } catch (_e) { /* fall back to default praise */ }
    }

    const { error: insErr } = await admin
      .from("your_corner_comments")
      .insert({ post_id: postId, user_id: COACH_USER_ID, content: commentText.slice(0, 1000) });
    if (insErr) {
      return new Response(JSON.stringify({ error: insErr.message }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, comment: commentText }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("auto-praise-comment error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

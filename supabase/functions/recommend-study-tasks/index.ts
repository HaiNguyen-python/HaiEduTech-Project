// Recommend 2-3 high-impact micro tasks for today based on goal deadlines and recent velocity.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function extractJson(raw: string): any | null {
  if (!raw) return null;
  const s = raw.replace(/```[a-zA-Z]*/g, "").replace(/```/g, "").trim();
  const first = s.indexOf("[");
  const last = s.lastIndexOf("]");
  if (first === -1 || last === -1) return null;
  try { return JSON.parse(s.slice(first, last + 1)); } catch { return null; }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: claims } = await supabase.auth.getClaims(authHeader.replace("Bearer ", ""));
    if (!claims?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { goals, recentStats, lang } = await req.json();
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key || !Array.isArray(goals) || goals.length === 0) {
      return new Response(JSON.stringify({ tasks: [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const language = lang === "vi" ? "Vietnamese" : "English";
    const goalList = goals.map((g: any) =>
      `- [${g.id}] "${g.title}" (${g.category}) - progress ${g.progress_pct}% - target ${g.target_date ?? "no deadline"}`
    ).join("\n");
    const stats = recentStats ?? { completedLast14d: 0, avgDailyPct: 0 };

    const prompt = `You are an AI study coach. Suggest 2-3 concrete micro-tasks for today (each doable in 15-30 min) to help the user catch up or maintain progress.
Language for task titles: ${language}.

Active goals:
${goalList}

Recent 14-day stats: completed ${stats.completedLast14d} tasks, avg daily progress ${stats.avgDailyPct.toFixed(2)}%.

Rules:
- Focus on goals that are lagging (behind schedule) or approaching deadline.
- Each task must be actionable and specific (mention skill, subject, duration).
- goal_id must be one of the ids above.
- Respond with ONLY a JSON array, no prose:
[{"title":"...","priority":"high|medium|low","difficulty":1-5,"goal_id":"<id>","contribution_pct":0.3-1.5,"reason":"short why"}]`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
      }),
    });

    if (!aiRes.ok) {
      const txt = await aiRes.text();
      console.error("AI error", aiRes.status, txt);
      return new Response(JSON.stringify({ tasks: [], error: `AI ${aiRes.status}` }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const aiJson = await aiRes.json();
    const text = aiJson.choices?.[0]?.message?.content ?? "";
    const arr = extractJson(text) ?? [];
    const goalIds = new Set(goals.map((g: any) => g.id));
    const cleaned = (Array.isArray(arr) ? arr : []).slice(0, 3).map((t: any) => ({
      title: String(t.title ?? "").slice(0, 200),
      priority: ["high", "medium", "low"].includes(t.priority) ? t.priority : "medium",
      difficulty: Math.max(1, Math.min(5, Number(t.difficulty) || 3)),
      goal_id: goalIds.has(t.goal_id) ? t.goal_id : null,
      contribution_pct: Math.max(0, Math.min(2, Number(t.contribution_pct) || 0.5)),
      reason: String(t.reason ?? "").slice(0, 200),
    })).filter((t: any) => t.title.length > 0);

    return new Response(JSON.stringify({ tasks: cleaned }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("recommend-study-tasks error", err);
    return new Response(JSON.stringify({ tasks: [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

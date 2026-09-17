import "../_shared/ai-fallback.ts";
// Recommend 2-3 high-impact micro tasks for today. Uses Lovable AI when available,
// falls back to a deterministic heuristic engine when AI is unavailable (402/429/network).
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

interface GoalLite { id: string; title: string; category: string; target_date: string | null; progress_pct: number; }

// Domain-specific task templates for the heuristic engine. Titles are given
// in Vietnamese; the client already localizes if needed.
const TEMPLATES: Record<string, Array<{ title: string; difficulty: number; contribution: number }>> = {
  ielts: [
    { title: "Luyện 15 phút Speaking Coach chủ đề IELTS", difficulty: 3, contribution: 0.8 },
    { title: "Học 10 từ mới trong IELTS Vocab Bank", difficulty: 2, contribution: 0.7 },
    { title: "Làm 1 passage Reading Practice (20 phút)", difficulty: 4, contribution: 1.1 },
    { title: "Viết 1 đoạn Task 2 (150 từ) và tự chấm", difficulty: 4, contribution: 1.2 },
    { title: "Nghe 1 bài IELTS Listening Section 3", difficulty: 3, contribution: 0.9 },
  ],
  hsk: [
    { title: "Ôn 20 Hanzi với HSK Vocabulary Bank", difficulty: 2, contribution: 0.7 },
    { title: "Nghe 1 bài Chinese Listening + trả lời câu hỏi", difficulty: 3, contribution: 0.9 },
    { title: "Roleplay Chinese 10 phút với AI", difficulty: 3, contribution: 0.8 },
    { title: "Làm 1 đề HSK Test (chọn cấp độ hiện tại)", difficulty: 4, contribution: 1.2 },
  ],
  yki: [
    { title: "1 exercise YKI Finnish Listening A2/B1", difficulty: 3, contribution: 0.9 },
    { title: "Học 15 từ mới trong Finnish Vocab", difficulty: 2, contribution: 0.7 },
    { title: "Viết đoạn 50 từ Finnish + AI chấm", difficulty: 4, contribution: 1.1 },
    { title: "10 phút Speaking Coach Finnish", difficulty: 3, contribution: 0.8 },
  ],
  programming: [
    { title: "Giải 1 Python Challenge", difficulty: 4, contribution: 1.1 },
    { title: "Xem 1 lecture trong Programming Lab", difficulty: 2, contribution: 0.6 },
    { title: "Làm 1 SQL quiz ngắn", difficulty: 3, contribution: 0.8 },
    { title: "Đọc 1 case study Startup và ghi 3 bài học", difficulty: 2, contribution: 0.5 },
  ],
  other: [
    { title: "Học tập trung 25 phút (Pomodoro)", difficulty: 2, contribution: 0.6 },
    { title: "Ôn lại 20 flashcards đã học", difficulty: 2, contribution: 0.5 },
    { title: "Review lại nhật ký học tập tuần này", difficulty: 1, contribution: 0.4 },
  ],
};

function heuristicRecommend(goals: GoalLite[]): any[] {
  // Rank goals by "lag" - how far actual progress is below the linear expectation.
  const now = Date.now();
  const scored = goals.map((g) => {
    let lag = 0;
    if (g.target_date) {
      const created = now - 30 * 86400000; // approximate if no created ts
      const total = new Date(g.target_date).getTime() - created;
      const elapsed = now - created;
      const expected = total > 0 ? Math.min(100, (elapsed / total) * 100) : 0;
      lag = Math.max(0, expected - Number(g.progress_pct || 0));
    } else {
      lag = 100 - Number(g.progress_pct || 0);
    }
    return { g, lag };
  }).sort((a, b) => b.lag - a.lag);

  const picks: any[] = [];
  const used = new Set<string>();
  for (const { g, lag } of scored) {
    if (picks.length >= 3) break;
    const bank = TEMPLATES[g.category] ?? TEMPLATES.other;
    // Choose a template not yet used, prefer higher contribution if lag is big.
    const sorted = [...bank].sort((a, b) => (lag > 15 ? b.contribution - a.contribution : Math.random() - 0.5));
    const chosen = sorted.find((t) => !used.has(t.title));
    if (!chosen) continue;
    used.add(chosen.title);
    picks.push({
      title: chosen.title,
      priority: lag > 15 ? "high" : lag > 5 ? "medium" : "low",
      difficulty: chosen.difficulty,
      goal_id: g.id,
      contribution_pct: chosen.contribution,
      reason: lag > 15
        ? `Đang trễ tiến độ ${lag.toFixed(0)}% - task này giúp bạn bắt kịp.`
        : `Giữ nhịp học đều đặn cho mục tiêu "${g.title.slice(0, 30)}".`,
    });
  }
  return picks;
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
    if (!Array.isArray(goals) || goals.length === 0) {
      return new Response(JSON.stringify({ tasks: [], source: "empty" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const key = Deno.env.get("LOVABLE_API_KEY");
    const fallback = heuristicRecommend(goals);

    if (!key) {
      return new Response(JSON.stringify({ tasks: fallback, source: "fallback", reason: "no_key" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const language = lang === "vi" ? "Vietnamese" : "English";
    const goalList = goals.map((g: any) =>
      `- [${g.id}] "${g.title}" (${g.category}) - progress ${g.progress_pct}% - target ${g.target_date ?? "no deadline"}`
    ).join("\n");
    const stats = recentStats ?? { completedLast14d: 0, avgDailyPct: 0 };
    const seed = fallback.map((t) => `* ${t.title} -> goal ${t.goal_id}`).join("\n");

    const prompt = `You are an AI study coach. Suggest 2-3 concrete micro-tasks for today (each doable in 15-30 min) to help the user catch up or maintain progress.
Language for task titles: ${language}.

Active goals:
${goalList}

Recent 14-day stats: completed ${stats.completedLast14d} tasks, avg daily progress ${Number(stats.avgDailyPct).toFixed(2)}%.

Ideas you may refine (do not have to use verbatim):
${seed}

Rules:
- Focus on goals that are lagging (behind schedule) or approaching deadline.
- Each task must be actionable and specific (mention skill, subject, duration).
- goal_id must be one of the ids above.
- Respond with ONLY a JSON array, no prose:
[{"title":"...","priority":"high|medium|low","difficulty":1-5,"goal_id":"<id>","contribution_pct":0.3-1.5,"reason":"short why"}]`;

    let aiRes: Response;
    try {
      aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
        body: JSON.stringify({
          model: "google/gemini-3.6-flash",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.6,
        }),
      });
    } catch (e) {
      console.error("network error", e);
      return new Response(JSON.stringify({ tasks: fallback, source: "fallback", reason: "network" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (!aiRes.ok) {
      const txt = await aiRes.text();
      console.error("AI error", aiRes.status, txt);
      const reason = aiRes.status === 402 ? "credits" : aiRes.status === 429 ? "rate_limit" : `ai_${aiRes.status}`;
      return new Response(JSON.stringify({ tasks: fallback, source: "fallback", reason }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
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

    const finalTasks = cleaned.length > 0 ? cleaned : fallback;
    return new Response(JSON.stringify({ tasks: finalTasks, source: cleaned.length > 0 ? "ai" : "fallback" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("recommend-study-tasks error", err);
    return new Response(JSON.stringify({ tasks: [], source: "error" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

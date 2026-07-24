// Align a new study task to one of the user's active goals using Lovable AI.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function extractJson(raw: string): any | null {
  if (!raw) return null;
  const s = raw.replace(/```[a-zA-Z]*/g, "").replace(/```/g, "").trim();
  const first = s.indexOf("{");
  const last = s.lastIndexOf("}");
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

    const { taskTitle, goals } = await req.json();
    if (!taskTitle || !Array.isArray(goals)) {
      return new Response(JSON.stringify({ error: "Missing taskTitle or goals" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key || goals.length === 0) {
      return new Response(JSON.stringify({ goal_id: null, contribution_pct: 0, rationale: "" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const goalList = goals.map((g: any, i: number) => `${i + 1}. [${g.id}] ${g.title} (${g.category})`).join("\n");
    const prompt = `You are a study coach. A user just added the task: "${taskTitle}".
Their active study goals:
${goalList}

Pick the ONE goal id that this task most contributes to (or null if none fit).
Estimate the contribution as a percentage of overall goal progress (0-2.0, typical 0.3-1.0 for a single micro-task).
Respond with ONLY compact JSON: {"goal_id":"<id or null>","contribution_pct":<number>,"rationale":"<short reason under 15 words>"}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      }),
    });

    if (!aiRes.ok) {
      return new Response(JSON.stringify({ goal_id: null, contribution_pct: 0, rationale: "" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const aiJson = await aiRes.json();
    const text = aiJson.choices?.[0]?.message?.content ?? "";
    const parsed = extractJson(text) ?? { goal_id: null, contribution_pct: 0, rationale: "" };
    const goalIds = new Set(goals.map((g: any) => g.id));
    if (parsed.goal_id && !goalIds.has(parsed.goal_id)) parsed.goal_id = null;
    parsed.contribution_pct = Math.max(0, Math.min(2, Number(parsed.contribution_pct) || 0));

    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("align-study-task error", err);
    return new Response(JSON.stringify({ goal_id: null, contribution_pct: 0, rationale: "" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

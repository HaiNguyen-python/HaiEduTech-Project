import "../_shared/ai-fallback.ts";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";
import { premiumDenied } from "../_shared/premium.ts";

const Body = z.object({
  source: z.string().min(3).max(400),
  attempt: z.string().min(3).max(800),
  level: z.enum(["B2", "C1", "C2"]),
  taskType: z.union([z.literal(1), z.literal(2)]),
});

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

function parse(raw: string) {
  let s = raw.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const m = s.match(/\{[\s\S]*\}/);
  if (m) s = m[0];
  s = s.replace(/[\u201C\u201D]/g, '"').replace(/,(\s*[}\]])/g, "$1");
  try { return JSON.parse(s); } catch { return null; }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  { const denied = await premiumDenied(req, corsHeaders); if (denied) return denied; }
  const p = Body.safeParse(await req.json().catch(() => null));
  if (!p.success) return json({ error: "Invalid input" }, 400);
  const { source, attempt, level, taskType } = p.data;
  const key = Deno.env.get("LOVABLE_API_KEY");

  const prompt = `You are a strict IELTS Writing examiner. A learner paraphrased a simple sentence for Task ${taskType}, aiming for CEFR ${level}.
Original: "${source}"
Learner: "${attempt}"
Score each 0-10: meaning (same meaning kept), level (vocabulary/grammar reach ${level}), grammar (accuracy), naturalness (academic, natural collocations). overall = average rounded to 1 decimal.
Return ONLY JSON: {"overall":n,"meaning":n,"level":n,"grammar":n,"naturalness":n,"reachedLevel":"A2|B1|B2|C1|C2","improvements":["what the learner upgraded well"],"issues":["specific problem and fix"],"corrected":"learner's sentence corrected and polished to ${level}, keeping their idea","tipVi":"one short tip in Vietnamese"}
Never use em-dashes.`;

  const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "google/gemini-3-flash-preview", messages: [{ role: "user", content: prompt }] }),
  });
  if (r.status === 429) return json({ error: "Rate limit, please try again shortly." }, 429);
  if (r.status === 402) return json({ error: "AI credits exhausted." }, 402);
  if (!r.ok) return json({ error: "AI grading failed" }, 502);
  const d = await r.json();
  const out = parse(d.choices?.[0]?.message?.content || "");
  if (!out || typeof out.overall !== "number") return json({ error: "invalid_ai_json" }, 502);
  return json(out);
});

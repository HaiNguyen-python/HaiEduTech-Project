import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";
import { premiumDenied } from "../_shared/premium.ts";

const Body = z.object({
  mode: z.enum(["essay", "vocab", "grammar", "connector", "translation", "paraphrase"]),
  level: z.string().min(1).max(10),
  target: z.string().min(1).max(1200),
  reference: z.string().max(1200).optional(),
  attempt: z.string().min(1).max(4000),
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

const TASK: Record<string, (t: string, r?: string) => string> = {
  essay: (t) => `Write a short Chinese composition for this prompt: "${t}". Criteria: task (task completion), vocab (range and accuracy), grammar, coherence (linking, structure), hanzi (correct characters, no typos).`,
  vocab: (t) => `Write one Chinese sentence that correctly uses the word "${t}". Criteria: task (word used correctly and naturally), vocab, grammar, coherence (meaningful, logical), hanzi.`,
  grammar: (t) => `Write one Chinese sentence using the structure "${t}". Criteria: task (structure used correctly), vocab, grammar, coherence, hanzi.`,
  connector: (t) => `Write one Chinese sentence (or combine ideas) using the connector "${t}". Criteria: task (connector used with correct logic), vocab, grammar, coherence, hanzi.`,
  translation: (t, r) => `Translate the Vietnamese sentence "${t}" into Chinese. Reference translation: "${r ?? ""}" (other correct versions are fine). Criteria: task (meaning accuracy), vocab, grammar, coherence (natural word order), hanzi.`,
  paraphrase: (t, r) => `Rewrite the simple Chinese sentence "${t}" at a higher level with richer vocabulary and structures, keeping the meaning. Model upgrade: "${r ?? ""}". Criteria: task (meaning kept and level raised), vocab, grammar, coherence (natural), hanzi.`,
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  { const denied = await premiumDenied(req, corsHeaders); if (denied) return denied; }
  const p = Body.safeParse(await req.json().catch(() => null));
  if (!p.success) return json({ error: p.error.flatten().fieldErrors }, 400);
  const { mode, level, target, reference, attempt } = p.data;
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) return json({ error: "AI is not configured" }, 500);

  const prompt = `You are a strict but encouraging Chinese teacher for Vietnamese learners at HSK ${level}.
Task: ${TASK[mode](target, reference)}
Learner wrote: "${attempt}"
Score each criterion 0-10, overall = average rounded to 1 decimal.
Return ONLY JSON: {"overall":n,"scores":{"task":n,"vocab":n,"grammar":n,"coherence":n,"hanzi":n},"improvements":["what is good, in Vietnamese"],"issues":["specific error quoted in Chinese + fix, explained in Vietnamese"],"corrected":"learner's text corrected in Chinese, keeping their idea","correctedPinyin":"pinyin with tone marks for corrected","upgraded":"a more advanced natural version in Chinese","tipVi":"one short tip in Vietnamese"}
Never use em-dashes.`;

  const r = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    headers: { "Lovable-API-Key": key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", "X-Lovable-AIG-SDK": "fetch" },
    body: JSON.stringify({ model: "openai/gpt-6-astra", input: prompt, stream: true, store: false, reasoning: { effort: "low" } }),
  });
  if (r.status === 429) return json({ error: "Rate limit, please try again shortly." }, 429);
  if (r.status === 402) return json({ error: "AI credits exhausted." }, 402);
  if (r.status === 403) return json({ error: "AI access denied." }, 403);
  if (!r.ok || !r.body) return json({ error: "AI grading failed" }, 502);

  const reader = r.body.getReader();
  const dec = new TextDecoder();
  let buf = "", text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const d = line.slice(5).trim();
      if (!d || d === "[DONE]") continue;
      try {
        const ev = JSON.parse(d);
        if (ev.type === "response.output_text.delta") text += ev.delta ?? "";
      } catch { /* ignore */ }
    }
  }
  const out = parse(text);
  if (!out || typeof out.overall !== "number") return json({ error: "invalid_ai_json" }, 502);
  return json(out);
});

/**
 * grade-toeic-sw: grades TOEIC Speaking (from speech transcripts) and Writing
 * responses with an ETS-style rubric and returns per-task scores + feedback.
 */
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const MAX: Record<string, number> = {
  "read-aloud": 3, "describe-picture": 3, "respond-questions": 3, "propose-solution": 5,
  "express-opinion": 5, "write-sentence-picture": 3, "respond-email": 4, "write-essay": 5,
};

const Body = z.object({
  tasks: z.array(z.object({
    id: z.string().max(60),
    section: z.enum(["speaking", "writing"]),
    type: z.string().max(40),
    prompt: z.string().max(3000),
    context: z.string().max(2000).optional(),
    response: z.string().max(6000),
  })).min(1).max(25),
});

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) return json({ error: "Invalid request" }, 400);
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) return json({ error: "AI is not configured" }, 500);

    const tasks = parsed.data.tasks.filter((t) => t.response.trim().length > 0);
    if (!tasks.length) return json({ results: {} });

    const system =
      "You are a certified ETS TOEIC Speaking & Writing rater. Grade each response with the official TOEIC rubric. " +
      "Speaking responses are automatic speech-recognition transcripts: ignore punctuation/capitalisation and small recognition errors; for read-aloud judge accuracy, completeness and likely pronunciation from how closely the transcript matches the text. " +
      "Max scores: read-aloud 3, describe-picture 3, respond-questions 3, express-opinion 5, write-sentence-picture 3 (must use BOTH keywords correctly in ONE grammatical sentence that matches the picture task), respond-email 4 (must complete every required element of the task), write-essay 5 (opinion, reasons, examples, organisation, ~300 words). " +
      "Be fair and strict like a real rater. Feedback in simple English, max 2 sentences, plus one concrete tip and an improved version (short). " +
      'Return STRICT JSON only: {"results":[{"id":"...","score":<int>,"feedback":"...","tip":"...","improved":"..."}]}';

    const user = tasks.map((t) =>
      `id: ${t.id}\nsection: ${t.section}\ntype: ${t.type} (max ${MAX[t.type] ?? 3})\n` +
      (t.context ? `material: ${t.context}\n` : "") + `task: ${t.prompt}\nresponse: ${t.response}`
    ).join("\n\n---\n\n");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "fetch" },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        reasoning: { effort: "low" },
        store: false,
        stream: true,
        input: [
          { role: "system", content: [{ type: "input_text", text: system }] },
          { role: "user", content: [{ type: "input_text", text: user }] },
        ],
      }),
    });
    if (!res.ok || !res.body) {
      const detail = await res.text().catch(() => "");
      const status = res.status === 402 || res.status === 429 || res.status === 403 ? res.status : 502;
      return json({ error: `AI grading failed (${res.status})`, detail: detail.slice(0, 300) }, status);
    }

    const reader = res.body.getReader();
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
        const p = line.slice(5).trim();
        if (!p || p === "[DONE]") continue;
        try {
          const e = JSON.parse(p);
          if (e.type === "response.output_text.delta" && typeof e.delta === "string") text += e.delta;
        } catch { /* partial */ }
      }
    }
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) return json({ error: "AI returned no result" }, 502);
    const out = JSON.parse(m[0]) as { results?: { id: string; score: number; feedback?: string; tip?: string; improved?: string }[] };
    const byType = new Map(tasks.map((t) => [t.id, t.type]));
    const results: Record<string, unknown> = {};
    for (const r of out.results ?? []) {
      const type = byType.get(r.id);
      if (!type) continue;
      const max = MAX[type] ?? 3;
      results[r.id] = {
        score: Math.max(0, Math.min(max, Math.round(Number(r.score) || 0))),
        max,
        feedback: String(r.feedback ?? "").slice(0, 500),
        tip: String(r.tip ?? "").slice(0, 300),
        improved: String(r.improved ?? "").slice(0, 1500),
      };
    }
    return json({ results });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});

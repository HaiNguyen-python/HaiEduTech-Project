/**
 * @file grade-placement-writing/index.ts
 * @description Grades the open writing answers of a placement test with AI and
 *   returns a 0-1 credit per question, so placement bands reflect real writing
 *   quality instead of word count alone. The caller falls back to its own
 *   deterministic word-count scoring whenever this function fails.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EssayIn {
  id: number;
  prompt: string;
  minWords?: number;
  cefr?: string;
  text: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { essays, language } = await req.json() as {
      essays?: EssayIn[];
      language?: string;
    };
    const items = (essays ?? []).filter((e) => (e?.text ?? "").trim().length > 0);
    if (items.length === 0) return json({ scores: {} });

    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) return json({ error: "LOVABLE_API_KEY is not configured" }, 500);

    const lang = language && language !== "english" ? language : "English";
    const system =
      `You are a placement examiner for ${lang}. For each answer, give a credit from 0 to 1 ` +
      `(0 = no usable language, 0.5 = partially meets the task, 1 = fully meets the task with ` +
      `accurate grammar and range). Judge task completion, grammar, vocabulary and coherence - ` +
      `never length alone. Return STRICT JSON only: ` +
      `{"scores":[{"id":<number>,"credit":<0-1>,"comment":"<one short sentence>"}]}`;

    const user = items.map((e) =>
      `Question id ${e.id} (target level ${e.cefr ?? "n/a"}, min words ${e.minWords ?? "n/a"}).\n` +
      `Task: ${e.prompt}\nAnswer: ${e.text.slice(0, 4000)}`
    ).join("\n\n---\n\n");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-5.4-mini",
        input: [
          { role: "system", content: [{ type: "input_text", text: system }] },
          { role: "user", content: [{ type: "input_text", text: user }] },
        ],
        stream: true,
      }),
    });

    if (!res.ok || !res.body) {
      const detail = await res.text().catch(() => "");
      return json({ error: `AI grading failed (${res.status})`, detail }, res.status || 502);
    }

    // Read the SSE stream and accumulate the output text deltas.
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const evt = JSON.parse(payload);
          if (evt.type === "response.output_text.delta" && typeof evt.delta === "string") {
            text += evt.delta;
          } else if (evt.type === "response.completed" && evt.response?.output_text) {
            text = evt.response.output_text;
          }
        } catch { /* ignore partial events */ }
      }
    }

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return json({ error: "AI returned no JSON", raw: text.slice(0, 400) }, 502);

    const parsed = JSON.parse(match[0]) as {
      scores?: { id: number; credit: number; comment?: string }[];
    };
    const scores: Record<string, { credit: number; comment: string }> = {};
    for (const s of parsed.scores ?? []) {
      if (typeof s?.id !== "number" || typeof s?.credit !== "number") continue;
      scores[String(s.id)] = {
        credit: Math.max(0, Math.min(1, s.credit)),
        comment: String(s.comment ?? "").slice(0, 300),
      };
    }
    return json({ scores });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { buildTask, normalizeText, sanitizeMessages } from "./logic.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LANGUAGE_GUIDES: Record<string, string> = {
  english: "Use natural international English. Keep each reply to 1-2 short sentences.",
  chinese: "Use beginner-friendly Mandarin. Add one short Pinyin line and a concise Vietnamese meaning when useful.",
  japanese: "Use natural beginner-friendly Japanese. Add short romaji support when useful.",
  finnish: "Use natural learner-friendly Finnish. Keep vocabulary around A1-B1 unless the learner shows a higher level.",
  swedish: "Use natural learner-friendly Swedish. Keep vocabulary around A1-B1 unless the learner shows a higher level.",
  vietnamese: "Use natural Vietnamese appropriate to the learner's level.",
};

const outputSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    reply: { type: "string" },
    correction: { type: "string" },
    encouragement: { type: "string" },
    strengths: { type: "array", items: { type: "string" } },
    corrections: { type: "array", items: { type: "string" } },
    modelSentences: { type: "array", items: { type: "string" } },
  },
  required: ["reply", "correction", "encouragement", "strengths", "corrections", "modelSentences"],
};

async function readResponseText(response: Response): Promise<string> {
  if (!response.body) throw new Error("AI response stream was empty");
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  let output = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const event = JSON.parse(payload) as { type?: string; delta?: string };
        if (event.type === "response.output_text.delta" && typeof event.delta === "string") output += event.delta;
      } catch {
        // Ignore incomplete or non-data SSE frames.
      }
    }
  }
  return output.trim();
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) {
      return new Response(JSON.stringify({ error: "Lovable AI is not configured." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const language = normalizeText(body.language, 30).toLowerCase() || "english";
    const topic = normalizeText(body.topic, 160) || "Free conversation";
    const mode = body.mode === "summary" ? "summary" : "turn";
    const messages = sanitizeMessages(body.messages);
    const task = buildTask(mode, messages);

    const instructions = `You are Mr. Hai, a warm and concise language teacher at HaiEduTech, running a voice roleplay.
Topic: ${topic}.
${LANGUAGE_GUIDES[language] ?? LANGUAGE_GUIDES.english}
Stay in the chosen situation. Never abruptly change topics. Avoid lectures and long lists. Never use an em dash.
For a normal turn, reply is what Mr. Hai says aloud, correction is one optional brief correction, encouragement is a very short supportive phrase, and all three arrays must be empty.
For a summary, follow the user's summary instruction and keep reply under 35 words.`;

    const gatewayResponse = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions,
        input: task,
        stream: true,
        reasoning: { effort: "low", summary: "auto" },
        text: { format: { type: "json_schema", name: "mr_hai_voice_reply", strict: true, schema: outputSchema } },
      }),
    });

    if (!gatewayResponse.ok) {
      const details = await gatewayResponse.text().catch(() => "");
      console.error(`speak-with-mr-hai gateway error [${gatewayResponse.status}]: ${details}`);
      const message = gatewayResponse.status === 402
        ? "AI credits are unavailable. Please try again later."
        : gatewayResponse.status === 403
          ? "Lovable AI is currently unavailable for this workspace."
          : gatewayResponse.status === 429
            ? "Mr. Hai is busy right now. Please wait a moment and try again."
            : "Mr. Hai could not respond. Please try again.";
      return new Response(JSON.stringify({ error: message, status: gatewayResponse.status }), {
        status: gatewayResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const text = await readResponseText(gatewayResponse);
    let result: unknown;
    try { result = JSON.parse(text); }
    catch { throw new Error("Mr. Hai returned an invalid response"); }
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("speak-with-mr-hai error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
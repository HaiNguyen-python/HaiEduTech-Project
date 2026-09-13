import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createOpenAI } from "npm:@ai-sdk/openai";
import { NoObjectGeneratedError, Output, streamText } from "npm:ai";
import { z } from "npm:zod";
import { buildSentenceGradePrompt, clampGrade, parseSentenceGradeInput } from "./logic.ts";

const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

const GradeSchema = z.object({
  overall: z.number(),
  phraseUsedCorrectly: z.boolean(),
  criteria: z.array(z.object({
    label: z.string(),
    score: z.number(),
    feedback: z.string(),
  })),
  feedback: z.string(),
  correction: z.string(),
  upgradedSentence: z.string(),
});

type GradeOutput = z.infer<typeof GradeSchema>;

const normalizeOutput = (value: GradeOutput): GradeOutput => {
  const criteria = value.criteria.slice(0, 4).map((item) => ({
    label: item.label.trim().slice(0, 80),
    score: clampGrade(item.score),
    feedback: item.feedback.trim().slice(0, 600),
  }));
  const mean = criteria.length
    ? criteria.reduce((total, item) => total + item.score, 0) / criteria.length
    : clampGrade(value.overall);
  return {
    overall: clampGrade(mean),
    phraseUsedCorrectly: value.phraseUsedCorrectly,
    criteria,
    feedback: value.feedback.trim().slice(0, 600),
    correction: value.correction.trim().slice(0, 600),
    upgradedSentence: value.upgradedSentence.trim().slice(0, 600),
  };
};

const parseFallback = (raw: string): GradeOutput | null => {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    const parsed = GradeSchema.safeParse(JSON.parse(raw.slice(start, end + 1).replace(/,(\s*[}\]])/g, "$1")));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
};

const statusFromError = (error: unknown): number => {
  if (!error || typeof error !== "object") return 500;
  const candidate = error as { statusCode?: unknown; status?: unknown };
  const status = Number(candidate.statusCode ?? candidate.status);
  return [400, 401, 402, 403, 429].includes(status) || status >= 500 ? status : 500;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: jsonHeaders });

  try {
    const input = parseSentenceGradeInput(await req.json());
    if (!input) {
      return new Response(JSON.stringify({ error: "A valid phrase, topic, example, and spoken sentence are required." }), {
        status: 400,
        headers: jsonHeaders,
      });
    }

    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) return new Response(JSON.stringify({ error: "Lovable AI is not configured." }), { status: 401, headers: jsonHeaders });

    let runId = req.headers.get("X-Lovable-AIG-Run-ID");
    const trackedFetch: typeof fetch = async (request, init) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set("X-Lovable-AIG-Run-ID", runId);
      const response = await fetch(request, { ...init, headers });
      runId = response.headers.get("X-Lovable-AIG-Run-ID") ?? runId;
      return response;
    };
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: trackedFetch,
    });

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      instructions: "You are a precise and encouraging IELTS speaking coach. Return only the requested structured assessment. Never use an em dash.",
      prompt: buildSentenceGradePrompt(input),
      output: Output.object({ schema: GradeSchema }),
      maxRetries: 2,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    let output: GradeOutput;
    try {
      output = await result.output;
    } catch (error) {
      if (!NoObjectGeneratedError.isInstance(error)) throw error;
      const recovered = parseFallback(error.text);
      if (!recovered) throw error;
      output = recovered;
    }

    return new Response(JSON.stringify(normalizeOutput(output)), {
      headers: { ...jsonHeaders, ...(runId ? { "X-Lovable-AIG-Run-ID": runId } : {}) },
    });
  } catch (error) {
    const status = statusFromError(error);
    const rawMessage = error instanceof Error ? error.message : "AI grading failed.";
    const message = status === 402
      ? "AI credits are unavailable. The app owner needs to add credits before grading can continue."
      : status === 403
        ? "AI grading is blocked by the workspace policy. An administrator needs to enable it."
        : status === 429
          ? "The AI examiner is busy. Please wait a moment and try again."
          : status === 401
            ? "AI grading is not configured."
            : status === 400
              ? rawMessage
              : "The AI examiner could not grade this sentence. Please try again.";
    console.error("grade-speaking-sentence error:", rawMessage);
    return new Response(JSON.stringify({ error: message }), { status, headers: jsonHeaders });
  }
});

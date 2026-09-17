import "../_shared/ai-fallback.ts";
// Global fetch interceptor: when Lovable AI Gateway returns 402 (credits
// exhausted) or 429 (rate limited), transparently fall back to Perplexity AI.
//
// Import this file at the top of any edge function that calls
// https://ai.gateway.lovable.dev/v1/chat/completions — no other code change
// required. The response shape is normalized so existing parsers
// (data.choices[0].message.content and tool_calls[0].function.arguments)
// keep working.

const LOV_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const PPLX_URL = "https://api.perplexity.ai/chat/completions";

// Map any Lovable/Gemini/OpenAI model id → a Perplexity model.
function mapModel(model: string | undefined): string {
  if (!model) return "sonar";
  const m = model.toLowerCase();
  if (m.includes("pro") || m.includes("reasoning") || m.includes("gpt-5")) return "sonar-pro";
  return "sonar";
}

// Perplexity requires messages to strictly alternate user/assistant after
// the (optional) leading system. Merge adjacent same-role turns.
function normalizeMessages(messages: any[]): any[] {
  if (!Array.isArray(messages)) return messages;
  const out: any[] = [];
  for (const msg of messages) {
    if (!msg || typeof msg !== "object") continue;
    // Perplexity has no "tool" role — fold into assistant.
    const role = msg.role === "tool" ? "assistant" : msg.role;
    // Content may be string or array of parts; stringify parts.
    let content: string;
    if (typeof msg.content === "string") {
      content = msg.content;
    } else if (Array.isArray(msg.content)) {
      content = msg.content
        .map((p: any) => (typeof p === "string" ? p : p?.text ?? ""))
        .filter(Boolean)
        .join("\n");
    } else {
      content = String(msg.content ?? "");
    }
    if (out.length > 0 && out[out.length - 1].role === role) {
      out[out.length - 1].content += "\n\n" + content;
    } else {
      out.push({ role, content });
    }
  }
  return out;
}

function appendUser(messages: any[], text: string): any[] {
  const last = messages[messages.length - 1];
  if (last && last.role === "user") {
    last.content = (last.content ?? "") + "\n\n" + text;
    return messages;
  }
  messages.push({ role: "user", content: text });
  return messages;
}

function mapToPerplexity(body: any): { pBody: any; toolName?: string } {
  const pBody: any = {
    model: mapModel(body.model),
    messages: normalizeMessages(body.messages ?? []),
  };
  if (typeof body.temperature === "number") pBody.temperature = body.temperature;
  if (typeof body.max_tokens === "number") pBody.max_tokens = body.max_tokens;

  // If the original request uses tool calling, convert to Perplexity's
  // json_schema structured output using the first tool's parameters.
  let toolName: string | undefined;
  const firstTool = Array.isArray(body.tools) ? body.tools[0] : undefined;
  if (firstTool?.function?.parameters) {
    toolName = firstTool.function.name;
    appendUser(
      pBody.messages,
      "Return ONLY a valid JSON object matching the required schema. No prose, no markdown fences.",
    );
    pBody.response_format = {
      type: "json_schema",
      json_schema: {
        name: (toolName || "result").replace(/[^a-zA-Z0-9_-]/g, "_"),
        schema: firstTool.function.parameters,
      },
    };
  } else if (body.response_format) {
    const rf = body.response_format;
    if (rf?.type === "json_schema" && rf?.json_schema?.schema) {
      pBody.response_format = rf;
      appendUser(pBody.messages, "Return ONLY a valid JSON object. No prose, no markdown fences.");
    } else if (rf?.type === "json_object" || rf?.type === "json") {
      // Perplexity doesn't accept json_object; just instruct the model.
      appendUser(pBody.messages, "Return ONLY a valid JSON object. No prose, no markdown fences.");
    }
    // else: drop unknown response_format
  }

  // Final safety: ensure last message is user/tool, not assistant, and
  // collapse any adjacency violations introduced by appendUser.
  pBody.messages = normalizeMessages(pBody.messages);

  return { pBody, toolName };
}

function perplexityToLovable(pData: any, toolName?: string): any {
  const choice = pData?.choices?.[0];
  const content: string = choice?.message?.content ?? "";
  const out: any = {
    id: pData?.id,
    model: pData?.model,
    choices: [
      {
        index: 0,
        finish_reason: choice?.finish_reason ?? "stop",
        message: { role: "assistant", content },
      },
    ],
    usage: pData?.usage,
    _provider: "perplexity",
  };
  if (toolName) {
    // Mirror content into tool_calls[0].function.arguments so call sites
    // that parse tool_calls keep working unchanged.
    out.choices[0].message.tool_calls = [
      {
        id: "pplx_fallback",
        type: "function",
        function: { name: toolName, arguments: content },
      },
    ];
  }
  return out;
}

async function callPerplexity(
  originalFetch: typeof fetch,
  pKey: string,
  parsedBody: any,
  signal?: AbortSignal,
): Promise<Response | null> {
  const wantsStream = parsedBody?.stream === true;
  const { pBody, toolName } = mapToPerplexity(parsedBody);
  if (wantsStream) {
    pBody.stream = true;
    delete pBody.response_format;
  }
  const pResp = await originalFetch(PPLX_URL, {
    method: "POST",
    signal,
    headers: { Authorization: `Bearer ${pKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(pBody),
  });
  if (!pResp.ok) {
    const errText = await pResp.text().catch(() => "");
    console.error("[ai-provider] Perplexity failed", pResp.status, errText, pBody.model);
    return null;
  }
  if (wantsStream) {
    // Perplexity streams OpenAI-compatible SSE — pass it straight through.
    return new Response(pResp.body, {
      status: 200,
      headers: {
        "Content-Type": pResp.headers.get("Content-Type") ?? "text/event-stream",
        "x-ai-provider": "perplexity",
      },
    });
  }
  const pData = await pResp.json();
  return new Response(JSON.stringify(perplexityToLovable(pData, toolName)), {
    status: 200,
    headers: { "Content-Type": "application/json", "x-ai-provider": "perplexity" },
  });
}

// Install once per isolate.
const g = globalThis as any;
if (!g.__lovableAIFallbackInstalled) {
  g.__lovableAIFallbackInstalled = true;
  const originalFetch = g.fetch.bind(g);
  g.fetch = async (input: any, init?: any): Promise<Response> => {
    let url = "";
    try {
      url = typeof input === "string" ? input : (input?.url ?? "");
    } catch {
      // ignore
    }
    if (url !== LOV_URL || !init || init.method !== "POST") {
      return originalFetch(input, init);
    }

    const pKey = Deno.env.get("PERPLEXITY_API_KEY");
    // AI_PRIMARY=lovable restores the old behaviour (Lovable first, Perplexity fallback).
    const perplexityFirst = pKey && (Deno.env.get("AI_PRIMARY") ?? "perplexity") === "perplexity";

    let parsedBody: any;
    try {
      const raw = typeof init.body === "string" ? init.body : new TextDecoder().decode(init.body);
      parsedBody = JSON.parse(raw);
    } catch (e) {
      console.error("[ai-provider] Could not parse request body", e);
      parsedBody = undefined;
    }

    // Primary: Perplexity.
    if (perplexityFirst && parsedBody) {
      try {
        const pOk = await callPerplexity(originalFetch, pKey!, parsedBody, init.signal);
        if (pOk) return pOk;
      } catch (e) {
        console.error("[ai-provider] Perplexity error, trying Lovable AI", e);
      }
    }

    const lovResp: Response = await originalFetch(input, init);
    if (lovResp.status !== 402 && lovResp.status !== 429) return lovResp;

    if (!pKey || !parsedBody) {
      console.warn("[ai-provider] Lovable AI", lovResp.status, "and no Perplexity fallback available");
      return lovResp;
    }
    if (perplexityFirst) return lovResp; // already tried Perplexity above

    try {
      const pOk = await callPerplexity(originalFetch, pKey, parsedBody, init.signal);
      return pOk ?? lovResp;
    } catch (e) {
      console.error("[ai-provider] Unexpected error during fallback", e);
      return lovResp;
    }
  };
}

export {};

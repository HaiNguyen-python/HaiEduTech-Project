---
name: AI Provider Routing
description: Perplexity is the primary AI provider for all edge functions via _shared/ai-fallback.ts interceptor; Lovable AI is fallback
type: feature
---
`supabase/functions/_shared/ai-fallback.ts` installs a global fetch interceptor on
`https://ai.gateway.lovable.dev/v1/chat/completions`.

- Primary: Perplexity (`api.perplexity.ai/chat/completions`, key `PERPLEXITY_API_KEY`).
  Model mapping: ids containing pro/reasoning/gpt-5 -> `sonar-pro`, else `sonar`.
- Fallback: Lovable AI Gateway (used when Perplexity returns non-OK or throws).
- Env override: `AI_PRIMARY=lovable` restores Lovable-first + Perplexity fallback.
- Streaming (`stream: true`): mapped to Perplexity SSE and passed through unchanged
  (OpenAI-compatible), `response_format` dropped.
- Tool calling is converted to Perplexity `json_schema` and mirrored back into
  `choices[0].message.tool_calls[0].function.arguments` so call sites stay unchanged.
- Messages normalized to strict user/assistant alternation; `tool` role folded into assistant.

Every edge function calling the gateway must have `import "../_shared/ai-fallback.ts";`
as its first line (40 functions as of 2026-09-17).

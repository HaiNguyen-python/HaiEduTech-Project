import "../_shared/ai-fallback.ts";
// Edge function: grade-swedish-yki
// Grades Swedish YKI Ruotsi writing or speaking responses (A1/A2/B1).
// Uses Lovable AI Gateway (google/gemini-2.5-flash) and returns structured JSON.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function logUsage(model: string, tokens: number, status: string, err?: string) {
  try {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await sb.from("api_usage_log").insert({
      function_name: "grade-swedish-yki", model, domain: "swedish",
      tokens_used: tokens, estimated_cost: tokens * 0.000001, status,
      error_message: err || null,
    });
  } catch (e) { console.error("usage log failed", e); }
}

interface ReqBody {
  mode: "writing" | "speaking";
  level: "A1" | "A2" | "B1";
  prompt: string;
  text: string;
  durationSec?: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const sb = createClient(
      Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: claimsErr } = await sb.auth.getClaims(token);
    if (claimsErr || !claims?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as ReqBody;
    if (!body || !body.mode || !body.level || !body.prompt) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const text = (body.text || "").trim();
    const wc = text ? text.split(/\s+/).filter(Boolean).length : 0;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const skillLabel = body.mode === "writing" ? "Skriva (Writing)" : "Tala (Speaking)";
    const bandTarget =
      body.level === "A1" ? "YKI Cấp 1 (A1) — 1.0–2.0 thang YKI" :
      body.level === "A2" ? "YKI Cấp 2 (A2 / Perustaso) — 2.0–3.5 thang YKI" :
                            "YKI Cấp 3 (B1 / Keskitaso) — 3.0–4.5 thang YKI";

    const systemPrompt = `Bạn là Giám khảo YKI Ruotsi (tiếng Thụy Điển ở Phần Lan) cao cấp.
Bạn chấm bài ${skillLabel} cho cấp ${bandTarget}.

TIÊU CHÍ CHẤM (thang điểm 0–5 từng tiêu chí, tổng overall 0–5 với 1 chữ số thập phân):
1. Task Fulfilment — bài có trả lời đúng đề, đủ ý không
2. Vocabulary (Ordförråd) — từ vựng tự nhiên, đa dạng, đúng chủ đề
3. Grammar (Grammatik) — V2, BIFF, en/ett, thì, trật tự từ
4. ${body.mode === "writing" ? "Coherence (Sammanhang)" : "Fluency & Pronunciation"} — mạch lạc / trôi chảy

QUY TẮC:
- Chỉ phân tích VĂN BẢN dưới, không bịa.
- Nếu rỗng hoặc < 10 từ → mỗi tiêu chí ≤ 1.5 và overall ≤ 1.5.
- Lỗi cụ thể phải trích nguyên văn tiếng Thụy Điển + đề xuất sửa.
- Tất cả feedback bằng tiếng Việt thân thiện.
- TRẢ VỀ JSON THUẦN, không markdown.

ĐỀ BÀI: "${body.prompt}"
SỐ TỪ: ${wc}${body.durationSec ? ` · THỜI LƯỢNG NÓI: ${body.durationSec}s` : ""}
BÀI LÀM CỦA HỌC VIÊN:
"""
${text || "(trống)"}
"""

CẤU TRÚC JSON BẮT BUỘC:
{
  "overall": <number 0-5>,
  "ykiLevel": "${body.level}",
  "criteria": [
    {"label": "Task Fulfilment", "score": <0-5>, "feedback": "<tiếng Việt, trích dẫn cụ thể>"},
    {"label": "Vocabulary", "score": <0-5>, "feedback": "<...>"},
    {"label": "Grammar", "score": <0-5>, "feedback": "<...>"},
    {"label": "${body.mode === "writing" ? "Coherence" : "Fluency & Pronunciation"}", "score": <0-5>, "feedback": "<...>"}
  ],
  "errors": [
    {"original": "<câu/chữ sai trong bài>", "correction": "<câu sửa>", "note": "<giải thích ngắn tiếng Việt>"}
  ],
  "highlights": ["<điểm hay 1>", "<điểm hay 2>"],
  "nextSteps": ["<gợi ý luyện tập 1>", "<gợi ý luyện tập 2>", "<gợi ý luyện tập 3>"]
}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Chấm bài ${skillLabel} cấp ${body.level} và trả JSON.` },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
        max_tokens: 1500,
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      await logUsage("google/gemini-2.5-flash", 0, "error", errText.slice(0, 500));
      return new Response(JSON.stringify({ error: "AI gateway error", detail: errText.slice(0, 200) }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiRes.json();
    const raw = aiData?.choices?.[0]?.message?.content ?? "{}";
    const tokens = aiData?.usage?.total_tokens || 0;

    let parsed: unknown = null;
    try { parsed = JSON.parse(raw); }
    catch {
      const m = String(raw).match(/\{[\s\S]*\}/);
      if (m) { try { parsed = JSON.parse(m[0]); } catch { /* ignore */ } }
    }
    if (!parsed) {
      await logUsage("google/gemini-2.5-flash", tokens, "parse_error");
      return new Response(JSON.stringify({ error: "Parse error", raw }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await logUsage("google/gemini-2.5-flash", tokens, "success");
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("grade-swedish-yki failed:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

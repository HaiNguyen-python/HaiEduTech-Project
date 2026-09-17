import "../_shared/ai-fallback.ts";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { prompt = "", text = "", level = "A1" } = await req.json();
    if (!text.trim()) return new Response(JSON.stringify({ error: "empty" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return new Response(JSON.stringify({ error: "no_key" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const system = `Bạn là giáo viên tiếng Việt cho người nước ngoài (trình độ ${level}). Chấm bài viết theo 4 tiêu chí, mỗi tiêu chí 0-10:
- diacritics (dấu thanh & chính tả)
- grammar (ngữ pháp, trật tự từ, đại từ)
- vocabulary (dùng từ đúng ngữ cảnh)
- coherence (mạch lạc)
Trả về DUY NHẤT JSON hợp lệ theo schema:
{"scores":{"diacritics":n,"grammar":n,"vocabulary":n,"coherence":n},"overall":n,"summary_vi":"...","summary_en":"...","corrections":[{"original":"...","suggestion":"...","reason_en":"..."}]}
Không thêm markdown fence. Tối đa 6 corrections.`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${LOVABLE_API_KEY}` },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Đề bài: ${prompt}\n\nBài của học viên:\n${text}` },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    });
    if (r.status === 429) return new Response(JSON.stringify({ error: "rate_limit" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (r.status === 402) return new Response(JSON.stringify({ error: "credits" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!r.ok) return new Response(JSON.stringify({ error: "ai_error", detail: await r.text() }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const data = await r.json();
    const raw: string = data?.choices?.[0]?.message?.content ?? "{}";
    let parsed: Record<string, unknown> = {};
    try { parsed = JSON.parse(raw); } catch {
      const m = raw.match(/\{[\s\S]*\}/); if (m) { try { parsed = JSON.parse(m[0]); } catch { /* ignore */ } }
    }
    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: "server_error", detail: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

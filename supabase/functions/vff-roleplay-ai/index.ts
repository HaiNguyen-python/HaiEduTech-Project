import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SCENARIOS: Record<string, string> = {
  pho: "Bạn là cô bán phở thân thiện ở Hà Nội. Nói tiếng Việt đơn giản, dùng 'cô' xưng mình và 'cháu/em' với khách. Hỏi khách muốn ăn phở gì, thêm gì. Giữ câu ngắn (< 15 từ).",
  grab: "Bạn là anh tài xế Grab ở TP.HCM. Nói tiếng Việt thân thiện, xưng 'anh', gọi khách là 'em'. Xác nhận điểm đón, điểm đến, giá tiền. Câu ngắn (< 15 từ).",
  hotel: "Bạn là lễ tân khách sạn lịch sự. Xưng 'em' với khách. Hỏi về đặt phòng, hộ chiếu, số đêm, dịch vụ. Trang trọng nhưng dễ hiểu.",
  doctor: "Bạn là bác sĩ ân cần. Hỏi triệu chứng, thời gian bị bệnh. Xưng 'bác sĩ' hoặc 'tôi'. Nói chậm, câu ngắn.",
  police: "Bạn là cảnh sát giao thông. Lịch sự nhưng nghiêm túc. Kiểm tra giấy tờ, giải thích lỗi.",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { scenario = "pho", history = [], userMessage = "" } = await req.json();
    const system = SCENARIOS[scenario] || SCENARIOS.pho;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return new Response(JSON.stringify({ error: "no_key" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const messages = [
      { role: "system", content: `${system}\n\nSau khi trả lời, thêm dòng "[HINT_EN]: <bản dịch tiếng Anh câu trả lời của bạn>" ở cuối.` },
      ...history.slice(-8),
      { role: "user", content: userMessage || "Xin chào" },
    ];

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${LOVABLE_API_KEY}` },
      body: JSON.stringify({ model: "google/gemini-2.5-flash", messages, temperature: 0.7 }),
    });
    if (r.status === 429) return new Response(JSON.stringify({ error: "rate_limit" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (r.status === 402) return new Response(JSON.stringify({ error: "credits" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!r.ok) return new Response(JSON.stringify({ error: "ai_error", detail: await r.text() }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const data = await r.json();
    const raw: string = data?.choices?.[0]?.message?.content ?? "";
    const hintMatch = raw.match(/\[HINT_EN\]:\s*(.+)$/i);
    const hint = hintMatch ? hintMatch[1].trim() : "";
    const reply = raw.replace(/\[HINT_EN\]:.*$/i, "").trim();

    return new Response(JSON.stringify({ reply, hint }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: "server_error", detail: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

// Generate a radical-driven etymology mnemonic for an HSK Chinese word.
// Returns structured components, formula, and a short Vietnamese story.
// Results are cached in `hsk_mnemonics`.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const { character, pinyin, meaning } = await req.json();
    if (!character || typeof character !== "string") {
      return new Response(JSON.stringify({ error: "character required" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    const key = character.trim();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Cache lookup — return only if new structured fields are present.
    const { data: cached } = await supabase
      .from("hsk_mnemonics")
      .select("radicals,story,components,formula")
      .eq("character", key)
      .maybeSingle();
    if (cached?.components && cached?.formula && cached?.story) {
      return new Response(
        JSON.stringify({
          components: cached.components,
          formula: cached.formula,
          story: cached.story,
          radicals: cached.radicals,
          cached: true,
        }),
        { headers: { ...cors, "Content-Type": "application/json" } },
      );
    }

    const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Perplexity not configured" }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const userPrompt = `Hán tự cần phân tích: ${key}
Pinyin: ${pinyin || ""}
Nghĩa tiếng Việt: ${meaning || ""}

Hãy phân tích chữ này theo đúng các bộ thủ (radicals) thực sự cấu thành nó, rồi kể một câu chuyện bộ thủ ngắn gọn, dễ hình dung, đúng học thuật.`;

    const aiRes = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content:
              `Bạn là chuyên gia Hán tự học (etymology) dạy học sinh Việt Nam. Trả lời CHỈ bằng JSON hợp lệ, không markdown, không chữ thừa, theo đúng schema:
{
  "components": [ { "char": "亻", "hanviet": "nhân đứng", "meaning": "người" }, { "char": "木", "hanviet": "mộc", "meaning": "cây" } ],
  "formula": "亻 + 木 = 休",
  "story": "Hình dung một Người (亻) đi bộ mệt mỏi, liền ngồi tựa lưng vào gốc Cây (木) để Nghỉ ngơi. Đó chính là chữ 休!"
}

QUY TẮC BẮT BUỘC:
1. components: liệt kê CHÍNH XÁC các bộ thủ thực sự cấu thành chữ (2-4 bộ). Phải đúng học thuật, KHÔNG bịa. Mỗi bộ ghi rõ ký tự gốc, âm Hán-Việt, nghĩa tiếng Việt ngắn gọn.
2. formula: công thức ghép trực quan dạng "A + B = chữ" (dùng đúng ký tự bộ thủ và chữ đích).
3. story: 2-3 câu tiếng Việt, KỂ CHUYỆN BỘ THỦ theo lối etymology — giải thích logic vì sao ghép các bộ này lại ra NGHĨA của chữ. Phải:
   - Lồng tên từng bộ thủ (in nghĩa tiếng Việt + ký tự trong ngoặc, ví dụ "Người (亻)", "Cây (木)").
   - Kết bằng câu chốt: "Đó chính là chữ <chữ>!" hoặc "Thế nên <chữ> = <nghĩa>."
   - TUYỆT ĐỐI không bịa truyện ngụ ngôn vô nghĩa, không dùng nhân vật ngẫu nhiên (Gấu Nâu, Thỏ Trắng, bạn Nam...), không dùng vần phiên âm. Chỉ kể logic ghép bộ thủ.
4. Nếu chữ là chữ tượng hình đơn (không ghép), components vẫn liệt kê hình ảnh gốc (ví dụ 日 = mặt trời), formula ghi "象形 (tượng hình): <chữ>", story mô tả hình dáng gốc.

VÍ DỤ CHUẨN:
- 明: components [日 nhật mặt trời, 月 nguyệt mặt trăng], formula "日 + 月 = 明", story "Hai nguồn sáng mạnh nhất là Mặt trời (日) và Mặt trăng (月) đứng cạnh nhau, không gian chắc chắn cực kỳ Sáng. Đó chính là chữ 明!"
- 安: components [宀 miên mái nhà, 女 nữ người phụ nữ], formula "宀 + 女 = 安", story "Dưới Mái nhà (宀) có bàn tay chăm sóc của Người phụ nữ (女) thì gia đình lúc nào cũng bình An. Đó chính là chữ 安!"`,
          },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI gateway error", aiRes.status, t);
      return new Response(JSON.stringify({ error: "ai_failed" }), {
        status: 502,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    const aiJson = await aiRes.json();
    let content: string = aiJson.choices?.[0]?.message?.content || "";
    content = content.replace(/```json|```/g, "").trim();
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) {
      return new Response(JSON.stringify({ error: "parse_failed", raw: content }), {
        status: 502,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    const parsed = JSON.parse(match[0]);
    const components = Array.isArray(parsed.components) ? parsed.components : [];
    const formula = String(parsed.formula || "").trim();
    const story = String(parsed.story || "").trim();
    if (components.length === 0 || !formula || !story) {
      return new Response(JSON.stringify({ error: "empty" }), {
        status: 502,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // Legacy text-form radicals for backward compatibility.
    const radicals = components
      .map((c: any) => `${c.char || ""} - ${c.hanviet || ""} - ${c.meaning || ""}`)
      .join("\n");

    await supabase.from("hsk_mnemonics").upsert(
      { character: key, components, formula, story, radicals },
      { onConflict: "character" },
    );

    return new Response(
      JSON.stringify({ components, formula, story, radicals, cached: false }),
      { headers: { ...cors, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("hsk-mnemonic error", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});

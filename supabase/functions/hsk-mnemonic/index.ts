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
              `Bạn là chuyên gia Hán tự + copywriter mnemonic cho TRẺ EM 10 TUỔI. Trả lời CHỈ bằng JSON hợp lệ, không markdown, không chữ thừa, theo schema:
{
  "components": [ { "char": "亻", "hanviet": "nhân đứng", "meaning": "người" }, { "char": "木", "hanviet": "mộc", "meaning": "cây" } ],
  "formula": "亻 + 木 = 休",
  "story": "Một Người (亻) mệt lả tựa lưng vào gốc Cây (木) để NGHỈ ngơi. Dễ nhớ chưa!"
}

QUY TẮC BẮT BUỘC:
1. components: liệt kê CHÍNH XÁC bộ thủ thực sự cấu thành chữ (1-4 bộ). Đúng học thuật, KHÔNG bịa. Mỗi bộ: ký tự + âm Hán-Việt + nghĩa tiếng Việt ngắn.
2. formula: "A + B = chữ" với ký tự gốc. Nếu tượng hình đơn: "象形: <chữ>".
3. story — CỰC NGẮN, CỰC HÌNH ẢNH:
   - TỐI ĐA 2-3 câu, tổng dưới 40 từ. Cấm dài dòng.
   - CẤM dùng từ học thuật rỗng: "gợi cảm giác", "có cấu trúc từ", "gợi ra ý nghĩa", "biểu thị", "hàm ý", "tượng trưng cho".
   - PHẢI lồng từng bộ thủ dạng "Nghĩa Việt (ký tự)" ví dụ "hai buổi tối (夕 + 夕)", "Nhỏ bé (小)", "Người (人)".
   - Dùng hành động cụ thể, hài hước, đời thường (chồng lên nhau, cắt phăng, dang rộng tay, chấm nốt ruồi...).
   - Câu chốt PHẢI in HOA nghĩa tiếng Việt của chữ. Ví dụ kết: "...thì chỉ còn rất ÍT thôi!" / "...để diễn tả thứ cực kỳ TO LỚN." / "Đó chính là NHIỀU!"
   - CẤM nhân vật bịa (Gấu Nâu, bạn Nam...). Chỉ kể logic ghép bộ.

VÍ DỤ CHUẨN (BẮT CHƯỚC ĐÚNG GIỌNG NÀY):
- 多: "Hết đêm này lại đến đêm khác, hai buổi tối (夕 + 夕) chồng lên nhau tức là có NHIỀU đêm trôi qua. Thật dễ nhớ phải không nào!"
- 少: "Một vật vốn đã Nhỏ bé (小), lại bị một nét phẩy (丿) cắt phăng một miếng thì chỉ còn rất ÍT thôi!"
- 大: "Hình ảnh một Người (人) dang rộng cả hai tay hai chân hết cỡ để diễn tả thứ cực kỳ TO LỚN."
- 太: "Một người To lớn (大) mà còn có thêm nốt ruồi (、) chấm dưới thì trông QUÁ dị và nổi bật luôn!"
- 明: "Mặt trời (日) đứng cạnh Mặt trăng (月), hai nguồn sáng mạnh nhất gộp lại thì chắc chắn cực kỳ SÁNG!"
- 安: "Dưới Mái nhà (宀) có Người phụ nữ (女) chăm lo, cả nhà lúc nào cũng bình AN."`,
          },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.85,
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

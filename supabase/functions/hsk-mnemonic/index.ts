// Generate a mnemonic for an HSK Chinese word: radical breakdown + a short
// Vietnamese memory story. Results are cached in `hsk_mnemonics`.
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

    const { data: cached } = await supabase
      .from("hsk_mnemonics")
      .select("radicals,story")
      .eq("character", key)
      .maybeSingle();
    if (cached?.radicals && cached?.story) {
      return new Response(JSON.stringify({ radicals: cached.radicals, story: cached.story, cached: true }), {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Perplexity not configured" }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const userPrompt = `Hán tự: ${key}
Pinyin: ${pinyin || ""}
Nghĩa: ${meaning || ""}

Hãy giúp học sinh Việt Nam nhớ chữ này.`;

    const aiRes = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content:
              "Bạn là thầy dạy Hán ngữ kiêm nhà biên kịch truyện tranh, kể chuyện cực kỳ sinh động cho học sinh Việt Nam. Trả lời CHỈ bằng JSON hợp lệ dạng {\"radicals\":\"...\",\"story\":\"...\"}. Không markdown, không chữ thừa.\n\n- 'radicals': liệt kê các bộ thủ chính trong chữ, mỗi bộ ghi rõ ký tự, âm Hán-Việt và nghĩa, mỗi bộ trên 1 dòng (dùng \\n). Tối đa 4 bộ.\n\n- 'story': một mẩu truyện mini 3-4 câu bằng tiếng Việt, CỰC KỲ THÚ VỊ và DỄ NHỚ. Yêu cầu BẮT BUỘC:\n  + Có nhân vật cụ thể (đặt tên riêng, hoặc con vật/đồ vật được nhân hóa) và một tình huống bất ngờ, hài hước hoặc kịch tính.\n  + LỒNG GHÉP TỪNG BỘ THỦ vào cốt truyện như đạo cụ hoặc hành động (vd: bộ 氵 nước → trượt vào vũng nước; bộ 火 lửa → đốt cháy bếp).\n  + Dùng 2-3 emoji rải rác và hình ảnh giác quan (âm thanh 'rầm!', màu sắc, mùi vị) để khắc sâu trí nhớ.\n  + Kết thúc bằng câu chốt liên kết rõ ràng tới NGHĨA của chữ, kiểu: 'Thế nên chữ này = <nghĩa>'.\n  + TUYỆT ĐỐI không viết kiểu liệt kê khô khan ('Chữ này gồm bộ A và bộ B...'). Phải như đọc một mẩu truyện tranh ngắn.",
          },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.9,
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
    const radicals = String(parsed.radicals || "").trim();
    const story = String(parsed.story || "").trim();
    if (!radicals || !story) {
      return new Response(JSON.stringify({ error: "empty" }), {
        status: 502,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    await supabase.from("hsk_mnemonics").insert({ character: key, radicals, story });

    return new Response(JSON.stringify({ radicals, story, cached: false }), {
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("hsk-mnemonic error", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});

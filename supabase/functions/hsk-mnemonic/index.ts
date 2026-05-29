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
              "Bạn là thầy dạy Hán ngữ. Trả lời CHỈ bằng JSON hợp lệ dạng {\"radicals\":\"...\",\"story\":\"...\"}. Không markdown, không chữ thừa.\n- 'radicals': liệt kê các bộ thủ chính trong chữ, mỗi bộ ghi rõ ký tự, âm Hán-Việt và nghĩa, mỗi bộ trên 1 dòng (dùng \\n). Tối đa 4 bộ.\n- 'story': một câu chuyện ngắn 2-3 câu bằng tiếng Việt, kết nối các bộ thủ với nghĩa của chữ, sinh động, dễ nhớ.",
          },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.4,
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

// Translate a Chinese example sentence to Vietnamese + English.
// Uses Lovable AI Gateway (Gemini Flash) and caches in `hsk_example_translations`.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "text required" }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
    }
    const source = text.trim();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Cache lookup
    const { data: cached } = await supabase
      .from("hsk_example_translations")
      .select("vi,en")
      .eq("source_text", source)
      .maybeSingle();
    if (cached?.vi && cached?.en) {
      return new Response(JSON.stringify({ vi: cached.vi, en: cached.en, cached: true }), {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Perplexity not configured" }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
    }

    const aiRes = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "You translate Chinese sentences. Reply ONLY with strict JSON of the form {\"vi\":\"...\",\"en\":\"...\"} – no markdown, no extra text. 'vi' is natural Vietnamese, 'en' is natural English. Keep meaning faithful and concise." },
          { role: "user", content: `Translate this Chinese sentence:\n${source}` },
        ],
        temperature: 0.2,
      }),
    });

    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI gateway error", aiRes.status, t);
      return new Response(JSON.stringify({ error: "ai_failed" }), { status: 502, headers: { ...cors, "Content-Type": "application/json" } });
    }
    const aiJson = await aiRes.json();
    let content: string = aiJson.choices?.[0]?.message?.content || "";
    content = content.replace(/```json|```/g, "").trim();
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) {
      return new Response(JSON.stringify({ error: "parse_failed", raw: content }), { status: 502, headers: { ...cors, "Content-Type": "application/json" } });
    }
    const parsed = JSON.parse(match[0]);
    const vi = String(parsed.vi || "").trim();
    const en = String(parsed.en || "").trim();
    if (!vi || !en) {
      return new Response(JSON.stringify({ error: "empty_translation" }), { status: 502, headers: { ...cors, "Content-Type": "application/json" } });
    }

    // Persist cache (ignore conflicts)
    await supabase.from("hsk_example_translations").insert({ source_text: source, vi, en });

    return new Response(JSON.stringify({ vi, en, cached: false }), {
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("translate-example error", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
  }
});

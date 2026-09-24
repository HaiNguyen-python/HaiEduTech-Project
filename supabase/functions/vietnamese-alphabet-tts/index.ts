import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.25.76";

const MODEL = "google/gemini-3.1-flash-tts-preview";
const VOICE = "Kore";
const MAX_TEXT_LENGTH = 120;

const BodySchema = z.object({
  text: z.string().trim().min(1).max(MAX_TEXT_LENGTH),
  kind: z.enum(["letter-name", "letter-sound", "example", "tone"]),
});

const toBase64 = (bytes: Uint8Array) => {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
};

const delivery: Record<z.infer<typeof BodySchema>["kind"], string> = {
  "letter-name": "Đây là TÊN CHỮ theo bảng chữ cái tiếng Việt, không phải tên chữ tiếng Anh. Chỉ phát âm đúng chuỗi được cung cấp một lần.",
  "letter-sound": "Đây là ÂM DÙNG KHI HỌC VẦN lớp Một. Phát âm tự nhiên đúng chuỗi được cung cấp, không đọc tên chữ và không nói từ âm.",
  example: "Đọc từ tiếng Việt như trong lời nói tự nhiên của người Hà Nội. Giữ nguyên đầy đủ âm đầu, vần và dấu thanh. Chỉ đọc đúng từ được cung cấp một lần, không đánh vần, không tách âm, không đọc nghĩa.",
  tone: "Chỉ đọc âm tiết được cung cấp một lần, thể hiện chính xác đường nét thanh điệu.",
};

const phonicsAnchors: Record<string, string> = {
  a: "ba", "á": "ăn", "ớ": "ân", "bờ": "ba", "cờ": "cá", "ca": "ca", "dờ": "da",
  "đờ": "đi", e: "em", "ê": "mê", "gờ": "gà", "hờ": "hoa", i: "im",
  "lờ": "lá", "mờ": "mẹ", "nờ": "na", o: "ong", "ô": "ông", "ơ": "ơi",
  "pờ": "pin", "quy": "quả", "rờ": "rổ", "sờ": "sách", "tờ": "tay",
  u: "thu", "ư": "tư", "vờ": "vui", "xờ": "xanh",
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=86400" },
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const parsed = BodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: "Nội dung phát âm không hợp lệ." }, 400);

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "Dịch vụ phát âm chưa được cấu hình." }, 500);

  const { text, kind } = parsed.data;
  // "quờ" is not a stable standalone TTS input and the provider rejects it
  // with INVALID_ARGUMENT. Q is read "quy" in the Vietnamese alphabet.
  const speechText = kind === "letter-sound" && text.toLocaleLowerCase("vi-VN") === "quờ"
    ? "quy"
    : text;
  const phonicsAnchor = kind === "letter-sound" ? phonicsAnchors[speechText.toLocaleLowerCase("vi-VN")] : undefined;
  const prompt = [
    "Bạn là giáo viên lớp Một người Hà Nội, đang dạy âm và chữ tiếng Việt cho trẻ em.",
    "Giọng sáng, tự nhiên, rõ ràng, tốc độ vừa phải.",
    "Không đọc lời hướng dẫn, không giải thích, không thêm bất kỳ từ nào.",
    delivery[kind],
    phonicsAnchor
      ? `Dùng từ “${phonicsAnchor}” làm mốc khẩu hình, nhưng TUYỆT ĐỐI KHÔNG đọc từ mốc; chỉ đọc âm “${speechText}” một lần.`
      : "",
    kind === "example"
      ? `Từ duy nhất cần đọc là: “${speechText}”.`
      : `Nội dung cần phát âm: ${speechText}`,
  ].join(" ");

  try {
    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } },
        },
        stream_format: "audio",
      }),
    });

    if (!upstream.ok) {
      const details = await upstream.text().catch(() => "");
      console.error(`Vietnamese alphabet TTS failed [${upstream.status}]: ${details}`);
      let message = "Không thể tạo âm thanh lúc này.";
      try {
        const safe = JSON.parse(details) as { message?: string; error?: { message?: string } };
        message = safe.message || safe.error?.message || message;
      } catch { /* keep safe message */ }
      return json({ error: message }, upstream.status);
    }

    const buffer = await upstream.arrayBuffer();
    if (!buffer.byteLength) return json({ error: "Dịch vụ không trả về âm thanh." }, 502);
    return json({ audioBase64: toBase64(new Uint8Array(buffer)), mimeType: "audio/wav" });
  } catch (error) {
    console.error("Vietnamese alphabet TTS error", error);
    return json({ error: "Không thể kết nối dịch vụ phát âm." }, 502);
  }
});
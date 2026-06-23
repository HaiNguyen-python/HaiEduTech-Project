import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible";
import { generateText, Output } from "npm:ai";
import { z } from "npm:zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BodySchema = z.object({
  subject: z.string().min(1).max(40).optional().nullable(),
  topic: z.string().max(280).optional().nullable(),
  lang: z.enum(["vi", "en"]).optional().default("vi"),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  let body: any;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const { subject, topic, lang } = parsed.data;

  const subjectLabel = subject || "General study";
  const topicLine = topic?.trim() ? `Specific topic / hint: ${topic.trim()}` : "Pick a useful sub-topic the teacher would test.";

  const prompt = lang === "vi"
    ? `Bạn là giáo viên HaiEduTech tạo câu hỏi trắc nghiệm ÔN TẬP cho học viên.\nMôn: ${subjectLabel}\n${topicLine}\n\nYêu cầu:\n- Câu hỏi ngắn gọn, rõ ràng, mang tính ôn tập kiến thức.\n- Đúng 4 đáp án, CHỈ MỘT đáp án đúng.\n- Đáp án sai phải hợp lý.\n- Mỗi đáp án tối đa 80 ký tự. Câu hỏi tối đa 220 ký tự.\n- Trả về tiếng Việt (giữ thuật ngữ tiếng Anh nếu cần).\n- explanation: 1-2 câu ngắn.`
    : `You are a HaiEduTech teacher creating a REVIEW multiple-choice question.\nSubject: ${subjectLabel}\n${topicLine}\n\nRequirements:\n- Clear, concise review question.\n- EXACTLY 4 options, ONLY ONE correct.\n- Plausible distractors.\n- Each option <= 80 chars. Question <= 220 chars.\n- explanation: 1-2 short sentences.`;

  try {
    const provider = createOpenAICompatible({
      name: "lovable",
      baseURL: "https://ai.gateway.lovable.dev/v1",
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    const { experimental_output } = await generateText({
      model: provider("google/gemini-3-flash-preview"),
      prompt,
      experimental_output: Output.object({
        schema: z.object({
          question: z.string(),
          options: z.array(z.string()).length(4),
          correct_index: z.number().int().min(0).max(3),
          explanation: z.string(),
        }),
      }),
    });
    return new Response(JSON.stringify(experimental_output), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    const msg = String(e?.message || e);
    const status = msg.includes("429") ? 429 : msg.includes("402") ? 402 : 500;
    return new Response(JSON.stringify({ error: msg }), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

// AI Pedagogical Assistant - Lovable AI Gateway powered teacher coaching tool
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function logUsage(model: string, tokens: number, status: string, error?: string) {
  try {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await sb.from("api_usage_log").insert({
      function_name: "pedagogical-assistant",
      model,
      domain: "pedagogy",
      tokens_used: tokens,
      estimated_cost: tokens * 0.000001,
      status,
      error_message: error || null,
    });
  } catch (e) {
    console.error("Usage log fail:", e);
  }
}

const SYSTEM_PROMPTS = {
  situational: `You are a senior teacher trainer and educational psychologist with 25+ years of experience. You are advising Teacher Hai (a Vietnamese ICT/Language teacher at HaiEduTech).
Apply pedagogy frameworks: Active Learning, Bloom's Taxonomy, Constructivism, Vygotsky's ZPD, Carol Dweck's Growth Mindset, and Universal Design for Learning.
Reply in Vietnamese (use "thầy/cô" appropriately). Always return STRICT JSON with this exact shape:
{
  "diagnosis": "Brief root-cause analysis (2-3 sentences in Vietnamese)",
  "immediateAction": ["3-4 concrete steps the teacher can do RIGHT NOW in class"],
  "longTermStrategy": ["3-4 lesson-plan or psychological adjustments over weeks"],
  "sampleDialogue": [
    {"speaker": "Teacher", "line": "..."},
    {"speaker": "Student", "line": "..."},
    {"speaker": "Teacher", "line": "..."}
  ],
  "frameworkApplied": "Name the pedagogical framework used (e.g. ZPD, Growth Mindset)",
  "redFlags": ["Optional warning signs to watch for"]
}`,
  lessonPlan: `You are an expert curriculum designer. Review the teacher's draft lesson plan critically yet supportively.
Apply: 5E Model (Engage, Explore, Explain, Elaborate, Evaluate), Bloom's Taxonomy verbs, retrieval practice, dual coding.
Reply in Vietnamese. Return STRICT JSON:
{
  "qualityScore": 0-100,
  "strengths": ["3 things the plan does well"],
  "improvements": [
    {"section": "Section name", "issue": "What's wrong", "suggestion": "Concrete fix with timing"}
  ],
  "missingElements": ["e.g. Icebreaker, Exit Ticket, Differentiation"],
  "rewriteSnippet": "A 5-10 line improved version of the weakest section",
  "bloomLevels": ["Remember", "Apply", "Analyze"]
}`,
  learningStyle: `You are an instructional designer. Given a student's learning style and a topic, propose the optimal explanation strategy.
Reply in Vietnamese. Return STRICT JSON:
{
  "approach": "Overall strategy (2-3 sentences)",
  "activities": [
    {"name": "Activity name", "duration": "X mins", "description": "How to run it"}
  ],
  "materials": ["Specific materials/tools to prepare"],
  "exampleScript": "A 3-5 sentence opening the teacher can say to introduce the topic"
}`,
  weeklyChallenge: `You are a teaching coach. Generate ONE creative micro-challenge for Teacher Hai this week to push pedagogical growth.
Reply in Vietnamese. Return STRICT JSON:
{
  "title": "Catchy challenge name",
  "description": "What to do (2-3 sentences)",
  "subject": "Which course/class to apply it in",
  "difficulty": "Easy|Medium|Hard",
  "successMetric": "How to know it worked",
  "reflectionQuestions": ["3 questions to journal about afterward"]
}`,
};

function extractJson(text: string): any {
  // Strip code fences and extract first JSON object
  let cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1) cleaned = cleaned.slice(start, end + 1);
  try {
    return JSON.parse(cleaned);
  } catch {
    // JSON repair: remove trailing commas
    cleaned = cleaned.replace(/,(\s*[}\]])/g, "$1");
    return JSON.parse(cleaned);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Verify teacher/admin role
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sbAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: { user } } = await sbAuth.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check role
    const sbAdmin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: roles } = await sbAdmin.from("user_roles").select("role").eq("user_id", user.id);
    const isTeacher = roles?.some((r: any) => r.role === "teacher" || r.role === "admin");
    if (!isTeacher) {
      return new Response(JSON.stringify({ error: "Teachers only" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { mode, payload } = body as {
      mode: "situational" | "lessonPlan" | "learningStyle" | "weeklyChallenge";
      payload: Record<string, any>;
    };

    if (!mode || !SYSTEM_PROMPTS[mode]) {
      return new Response(JSON.stringify({ error: "Invalid mode" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build user prompt per mode
    let userPrompt = "";
    switch (mode) {
      case "situational":
        userPrompt = `Tình huống lớp học:\nLoại: ${payload.scenarioType || "general"}\nBối cảnh học sinh: ${payload.studentContext || "không rõ"}\nThách thức: ${payload.challenge}\n\nHãy phân tích và đưa ra giải pháp sư phạm hoàn chỉnh.`;
        break;
      case "lessonPlan":
        userPrompt = `Môn học: ${payload.subject}\nCấp độ: ${payload.level || "general"}\nTiêu đề bài: ${payload.title}\n\nGiáo án nháp:\n${payload.originalPlan}\n\nHãy review và tối ưu giáo án này.`;
        break;
      case "learningStyle":
        userPrompt = `Phong cách học: ${payload.style} (Visual/Auditory/Kinesthetic/Reading-Writing)\nChủ đề cần dạy: ${payload.topic}\nMôn: ${payload.subject || "general"}\nCấp độ: ${payload.level || "intermediate"}`;
        break;
      case "weeklyChallenge":
        userPrompt = `Tạo một thử thách giảng dạy mới cho tuần này. Các môn thầy đang dạy: ${(payload.subjects || ["English", "Chinese", "Finnish", "Programming"]).join(", ")}. Thử thách trước (nếu có): ${payload.previousChallenge || "không có"}. Hãy đảm bảo mới mẻ và sáng tạo.`;
        break;
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[mode] },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      await logUsage("gemini-2.5-pro", 0, "error", `${aiResponse.status}: ${errText.slice(0, 200)}`);
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds to Lovable AI workspace." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "{}";
    const tokens = aiData.usage?.total_tokens || 1500;

    let result: any;
    try {
      result = extractJson(rawContent);
    } catch (parseErr) {
      console.error("JSON parse failed:", parseErr, "Raw:", rawContent.slice(0, 500));
      result = { rawText: rawContent, parseError: true };
    }

    await logUsage("gemini-2.5-pro", tokens, "success");

    return new Response(JSON.stringify({ success: true, result, mode }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("pedagogical-assistant error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

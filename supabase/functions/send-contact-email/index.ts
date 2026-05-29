import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TEACHER_EMAIL = "hainguyen240195@gmail.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      type,
      program,
      level,
      submittedAt,
      idempotencyKey,
    } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const isAskTeacher = type === "ask_teacher";
    const isCourseRegistration =
      !isAskTeacher &&
      (type === "course_registration" ||
        (typeof subject === "string" && subject.includes("[Đăng ký khóa học]")) ||
        typeof program === "string");

    const sentAt = submittedAt || new Date().toLocaleString("vi-VN");

    if (isAskTeacher) {
      const key =
        idempotencyKey ||
        `ask-teacher-${email || phone || name || crypto.randomUUID()}-${Date.now()}`;

      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "ask-teacher",
          recipientEmail: TEACHER_EMAIL,
          idempotencyKey: key,
          templateData: {
            name: name || "Học viên",
            email: email || "",
            phone: phone || "",
            message: message || "",
            submittedAt: sentAt,
          },
        },
      });
      if (error) throw error;
    } else if (isCourseRegistration) {
      const programName =
        (typeof program === "string" && program.trim()) ||
        (typeof subject === "string"
          ? subject.replace(/^\[Đăng ký khóa học\]\s*/u, "").trim()
          : "") ||
        "Chưa rõ chương trình";

      const key =
        idempotencyKey ||
        `course-registration-${phone || email || name || crypto.randomUUID()}-${Date.now()}`;

      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "registration-notification",
          recipientEmail: TEACHER_EMAIL,
          idempotencyKey: key,
          templateData: {
            name: name || "",
            email: email || "",
            phone: phone || "",
            program: programName,
            level: level || "",
            message: message || "",
            submittedAt: sentAt,
          },
        },
      });
      if (error) throw error;
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("send-contact-email error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

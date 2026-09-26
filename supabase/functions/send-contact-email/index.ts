import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.25.76";
import { sendAndLog } from "../_shared/transactional-email-templates/send-and-log.ts";

const TEACHER_EMAIL = "hainguyen240195@gmail.com";

const ContactRequestSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(20).regex(/^[+()\d\s.-]+$/).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  type: z.enum(["ask_teacher", "course_registration"]).optional(),
  program: z.string().trim().max(100).optional().or(z.literal("")),
  level: z.string().trim().max(100).optional().or(z.literal("")),
  submittedAt: z.string().trim().max(100).optional(),
  idempotencyKey: z.string().trim().min(1).max(255).optional(),
}).superRefine((data, context) => {
  if (data.type === "course_registration" && (!data.phone || !data.program)) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Phone and program are required for course registration" });
  }
  if (data.type === "ask_teacher" && !data.message) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Message is required" });
  }
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const parsed = ContactRequestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

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
    } = parsed.data;


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

      await sendAndLog("ask-teacher", TEACHER_EMAIL, {
        idempotencyKey: key,
        templateData: {
            name: name || "Học viên",
            email: email || "",
            phone: phone || "",
            message: message || "",
            submittedAt: sentAt,
          },
      });
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

      await sendAndLog("registration-notification", TEACHER_EMAIL, {
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
      });
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

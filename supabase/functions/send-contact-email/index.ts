import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { sendLovableEmail } from "npm:@lovable.dev/email-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message, type, program, level, submittedAt, idempotencyKey } = await req.json();

    const emailBody = `
New Contact Form Submission from HaiEdu Platform

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Program of Interest: ${subject || "Not specified"}
Message: ${message || "No message"}

---
This message was sent from the HaiEdu contact form.
    `.trim();

    console.log("Contact form submission received:", { name, email, subject });
    console.log("Email content:", emailBody);

    const isCourseRegistration =
      type === "course_registration" ||
      typeof subject === "string" && subject.includes("[Đăng ký khóa học]") ||
      typeof program === "string";

    if (isCourseRegistration) {
      const programName =
        (typeof program === "string" && program.trim()) ||
        (typeof subject === "string" ? subject.replace(/^\[Đăng ký khóa học\]\s*/u, "").trim() : "") ||
        "Chưa rõ chương trình";

      const html = `
        <div style="background:#ffffff;padding:32px 20px;font-family:Inter,Arial,sans-serif;color:#0f172a;">
          <div style="max-width:640px;margin:0 auto;border:1px solid rgba(15,23,42,0.08);border-radius:18px;padding:32px;box-shadow:0 18px 40px rgba(15,23,42,0.08);">
            <div style="margin-bottom:12px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2fa39a;">HaiEduTech · Course Registration</div>
            <h1 style="margin:0 0 16px;font-size:28px;line-height:34px;">Có học viên mới đăng ký khóa học</h1>
            <p style="margin:0 0 24px;font-size:15px;line-height:25px;color:#475569;">Bạn vừa nhận được một đăng ký mới từ website. Thông tin chi tiết:</p>
            <div style="border:1px solid rgba(47,163,154,0.18);border-radius:16px;background:#f8fafc;padding:18px;">
              <p><strong>Họ và tên:</strong> ${name || "-"}</p>
              <p><strong>Email:</strong> ${email || "Không có"}</p>
              <p><strong>Số điện thoại:</strong> ${phone || "-"}</p>
              <p><strong>Chương trình:</strong> ${programName}</p>
              <p><strong>Trình độ hiện tại:</strong> ${level || "Chưa ghi"}</p>
              <p><strong>Ghi chú:</strong> ${message || "Không có"}</p>
              <p><strong>Thời gian gửi:</strong> ${submittedAt || "Vừa xong"}</p>
            </div>
          </div>
        </div>
      `.trim();

      await sendLovableEmail({
        to: "hainguyen240195@gmail.com",
        from: "HaiEduTech <noreply@notify.haiedutech.com>",
        sender_domain: "notify.haiedutech.com",
        subject: `[Đăng ký khóa học] ${programName}`,
        html,
        text: `Học viên mới đăng ký khóa học\n\nHọ và tên: ${name || "-"}\nEmail: ${email || "Không có"}\nSố điện thoại: ${phone || "-"}\nChương trình: ${programName}\nTrình độ hiện tại: ${level || "Chưa ghi"}\nGhi chú: ${message || "Không có"}\nThời gian gửi: ${submittedAt || "Vừa xong"}`,
        purpose: "transactional",
        label: "registration-notification",
        idempotency_key:
          idempotencyKey ||
          `course-registration-${phone || email || name || crypto.randomUUID()}-${Date.now()}`,
      });
    }

    const isAskTeacher = type === "ask_teacher";
    if (isAskTeacher) {
      const html = `
        <div style="background:#ffffff;padding:32px 20px;font-family:Inter,Arial,sans-serif;color:#0f172a;">
          <div style="max-width:640px;margin:0 auto;border:1px solid rgba(15,23,42,0.08);border-radius:18px;padding:32px;box-shadow:0 18px 40px rgba(15,23,42,0.08);">
            <div style="margin-bottom:12px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#3b82f6;">HaiEduTech · Câu hỏi từ chatbot</div>
            <h1 style="margin:0 0 16px;font-size:24px;line-height:32px;">Học viên gửi câu hỏi cho thầy Hải</h1>
            <p style="margin:0 0 20px;font-size:14px;line-height:22px;color:#475569;">Câu hỏi được gửi trực tiếp từ chatbot trên website.</p>
            <div style="border:1px solid rgba(59,130,246,0.18);border-radius:16px;background:#f8fafc;padding:18px;">
              <p><strong>Họ và tên:</strong> ${name || "-"}</p>
              <p><strong>Email:</strong> ${email || "Không có"}</p>
              <p><strong>Số điện thoại:</strong> ${phone || "Không có"}</p>
              <p><strong>Thời gian:</strong> ${submittedAt || "Vừa xong"}</p>
              <div style="margin-top:12px;padding-top:12px;border-top:1px dashed rgba(15,23,42,0.12);">
                <p style="margin:0 0 6px;font-weight:700;">Câu hỏi:</p>
                <p style="margin:0;white-space:pre-wrap;color:#0f172a;">${(message || "").replace(/</g, "&lt;")}</p>
              </div>
            </div>
          </div>
        </div>
      `.trim();

      await sendLovableEmail({
        to: "hainguyen240195@gmail.com",
        from: "HaiEduTech <noreply@notify.haiedutech.com>",
        sender_domain: "notify.haiedutech.com",
        reply_to: email || undefined,
        subject: `[Câu hỏi từ chatbot] ${name || "Học viên"}`,
        html,
        text: `Câu hỏi từ chatbot HaiEduTech\n\nHọ và tên: ${name || "-"}\nEmail: ${email || "Không có"}\nĐiện thoại: ${phone || "Không có"}\nThời gian: ${submittedAt || "Vừa xong"}\n\nCâu hỏi:\n${message || ""}`,
        purpose: "transactional",
        label: "chatbot-ask-teacher",
        idempotency_key: idempotencyKey || `ask-teacher-${email || phone || name || crypto.randomUUID()}-${Date.now()}`,
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Contact form submitted successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

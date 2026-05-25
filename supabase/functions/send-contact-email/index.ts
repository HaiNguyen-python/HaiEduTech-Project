import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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
      if (!supabaseUrl || !serviceRoleKey) {
        throw new Error("Missing email service configuration");
      }

      const programName =
        (typeof program === "string" && program.trim()) ||
        (typeof subject === "string" ? subject.replace(/^\[Đăng ký khóa học\]\s*/u, "").trim() : "") ||
        "Chưa rõ chương trình";

      const sendResponse = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
        body: JSON.stringify({
          templateName: "registration-notification",
          idempotencyKey:
            idempotencyKey ||
            `course-registration-${phone || email || name || crypto.randomUUID()}-${Date.now()}`,
          templateData: {
            name,
            email,
            phone,
            program: programName,
            level,
            message,
            submittedAt,
          },
        }),
      });

      if (!sendResponse.ok) {
        const errorText = await sendResponse.text();
        console.error("Registration email trigger failed:", errorText);
        throw new Error("Could not queue registration email");
      }
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

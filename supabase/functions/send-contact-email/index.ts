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
    const { name, email, phone, subject, message } = await req.json();

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

    // Store is handled by the client inserting into contact_messages table
    // For now, log the submission. Email delivery can be added with email domain setup.

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

/**
 * study-abroad-deadline-reminder
 * Runs daily via pg_cron. Finds users with deadlines in 7 or 3 days,
 * enqueues a "deadline-reminder" transactional email if not already sent.
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const REMINDER_OFFSETS = [7, 3, 1]; // days before deadline

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let enqueued = 0;
    const errors: string[] = [];

    for (const offset of REMINDER_OFFSETS) {
      const target = new Date(today);
      target.setUTCDate(target.getUTCDate() + offset);
      const dateStr = target.toISOString().slice(0, 10);

      const { data: deadlines, error } = await supabase
        .from("application_deadlines")
        .select("id, user_id, university, program, deadline_date, status")
        .eq("deadline_date", dateStr)
        .neq("status", "submitted");

      if (error) { errors.push(`offset ${offset}: ${error.message}`); continue; }
      if (!deadlines || deadlines.length === 0) continue;

      for (const d of deadlines) {
        // Skip if already sent for this offset
        const { data: existing } = await supabase
          .from("deadline_reminders_sent")
          .select("id")
          .eq("deadline_id", d.id)
          .eq("days_before", offset)
          .maybeSingle();
        if (existing) continue;

        // Get user profile + email
        const { data: { user } } = await supabase.auth.admin.getUserById(d.user_id);
        if (!user?.email) continue;
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", d.user_id)
          .maybeSingle();

        // Call send-transactional-email
        const sendRes = await fetch(`${SUPABASE_URL}/functions/v1/send-transactional-email`, {
          method: "POST",
          headers: { Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            template: "deadline-reminder",
            to: user.email,
            data: {
              studentName: profile?.full_name || "bạn",
              university: d.university,
              program: d.program,
              deadlineDate: d.deadline_date,
              daysRemaining: offset,
              dashboardUrl: "https://haiedutech.com/study-abroad/journey",
            },
            idempotency_key: `deadline-${d.id}-${offset}`,
            purpose: "transactional",
          }),
        });

        if (sendRes.ok) {
          await supabase.from("deadline_reminders_sent").insert({
            user_id: d.user_id, deadline_id: d.id, days_before: offset,
          });
          enqueued++;
        } else {
          const t = await sendRes.text();
          errors.push(`deadline ${d.id} offset ${offset}: ${sendRes.status} ${t}`);
        }
      }
    }

    return new Response(JSON.stringify({ ok: true, enqueued, errors }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("study-abroad-deadline-reminder error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

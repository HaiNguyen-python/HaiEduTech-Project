import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.25.76";
import { sendAndLog } from "../_shared/transactional-email-templates/send-and-log.ts";

const BodySchema = z.object({ noticeId: z.string().uuid() });
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const userClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: userData } = await userClient.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) return json({ error: "unauthorized" }, 401);
    const { data: staff } = await userClient.rpc("is_staff", { _user_id: uid });
    if (!staff) return json({ error: "forbidden" }, 403);
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) return json({ error: "invalid_request" }, 400);

    const db = createClient(url, service);
    const { data: notice, error } = await db.from("course_notices").select("*").eq("id", parsed.data.noticeId).single();
    if (error || !notice) return json({ error: "notice_not_found" }, 404);
    const d = notice.snapshot as Record<string, any>;
    const date = (v: string) => v ? new Date(`${v}T00:00:00`).toLocaleDateString("vi-VN") : "-";
    const num = (n: number) => new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(n || 0);
    const numEur = (n: number) => new Intl.NumberFormat("en-IE", { maximumFractionDigits: 2 }).format(n || 0);
    const cur = d.currency === "eur" ? "eur" : "vnd";
    const money = (n: number) => cur === "eur" ? `${numEur(n)} EUR` : `${num(n)}đ`;
    const toEur = (n: number) => Math.round((n || 0) / 31000 * 100) / 100;
    const extraAmount = cur === "eur" ? (Number(d.extraFeeEur) > 0 ? Number(d.extraFeeEur) : toEur(d.extraFeeVnd)) : Math.round(d.extraFeeVnd || 0);
    const payment = [d.paymentMethod !== "finland" ? "Vietcombank · 1025536199 · NGUYEN TRAN THANH HAI" : "", d.paymentMethod !== "vietnam" ? "Nordea · FI09 1040 3500 5258 23 · Nguyen Tran Thanh Hai" : ""].filter(Boolean).join(" | ");
    const result = await sendAndLog("course-notice", notice.recipient_email, { idempotencyKey: `course-notice-${notice.id}-${notice.send_count + 1}`, templateData: {
      recipientName: notice.recipient_name, noticeCode: notice.notice_code, courseNameVi: d.courseNameVi, courseNameEn: d.courseNameEn,
      classType: d.classType === "private" ? "Kèm 1-1 / One-to-one" : "Lớp nhóm / Group class", level: d.level || "Theo đánh giá đầu vào",
      duration: `${d.weeks} tuần · ${d.sessions} buổi · ${d.hours} giờ`, dates: `${date(d.startDate)} - ${date(d.endDate)}`, schedule: `${d.schedule} (${d.timezone})`, objective: d.objective,
      modules: d.modules, benefits: d.benefits, baseTuition: money(cur === "eur" ? d.baseEur : d.baseVnd),
      discount: d.discountType === "percent" ? `${d.discountValue}% ${d.discountReason || ""}` : `${money(d.discountValue)} ${d.discountReason || ""}`,
      finalTuition: money(cur === "eur" ? d.finalEur : d.finalVnd),
      extraFee: extraAmount > 0 ? `${d.extraFeeLabel || "Phí khác / Other fee"}: ${money(extraAmount)}` : undefined,
      totalDue: extraAmount > 0 ? money((cur === "eur" ? d.finalEur : d.finalVnd) + extraAmount) : undefined,
      paymentReference: d.paymentReference || undefined, paymentDetails: payment,
      instructorName: d.instructorName, instructorCredentials: d.instructorCredentials, instructorExpertise: d.instructorExpertise,
      instructorContact: `${d.instructorPhone} · ${d.instructorWebsite} · ${d.instructorEmail}`, note: d.note,
    }});
    await db.from("course_notices").update({ status: result.sent ? "sent" : notice.status, sent_at: result.sent ? new Date().toISOString() : notice.sent_at, sent_by: result.sent ? uid : notice.sent_by, send_count: notice.send_count + 1, last_send_status: result.sent ? "sent" : "suppressed", last_send_error: result.sent ? null : "recipient_suppressed", updated_by: uid }).eq("id", notice.id);
    return json({ success: result.sent, suppressed: !result.sent });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "send_failed" }, 500);
  }
});

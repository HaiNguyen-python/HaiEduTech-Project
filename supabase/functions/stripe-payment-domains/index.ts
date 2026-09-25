import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createStripeClient, type StripeEnv } from "../_shared/stripe.ts";
import { adminClient } from "../_shared/premium.ts";

const DOMAINS = ["haiedutech.com", "www.haiedutech.com", "haiedutech.lovable.app"];
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const admin = adminClient();
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return json({ error: "unauthorized" }, 401);
    const { data: isStaff } = await admin.rpc("is_staff", { _user_id: user.id });
    if (!isStaff) return json({ error: "forbidden" }, 403);

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const env: StripeEnv = body?.environment === "sandbox" ? "sandbox" : "live";
    const stripe = createStripeClient(env);

    const list = async () => (await stripe.paymentMethodDomains.list({ limit: 100 })).data;
    let existing = await list();

    if (body?.action === "register") {
      for (const d of DOMAINS) {
        const found = existing.find((x) => x.domain_name === d);
        try {
          if (!found) await stripe.paymentMethodDomains.create({ domain_name: d, enabled: true });
          else {
            if (!found.enabled) await stripe.paymentMethodDomains.update(found.id, { enabled: true });
            await stripe.paymentMethodDomains.validate(found.id);
          }
        } catch (e) {
          console.error("domain", d, e instanceof Error ? e.message : e);
        }
      }
      existing = await list();
    }

    return json({
      environment: env,
      domains: DOMAINS.map((d) => {
        const f = existing.find((x) => x.domain_name === d);
        return {
          domain: d,
          registered: !!f,
          enabled: f?.enabled ?? false,
          apple_pay: f?.apple_pay?.status ?? "missing",
          apple_pay_error: f?.apple_pay?.status_details?.error_message ?? null,
          google_pay: f?.google_pay?.status ?? "missing",
        };
      }),
    });
  } catch (e) {
    console.error(e);
    return json({ error: e instanceof Error ? e.message : "server_error" }, 500);
  }
});

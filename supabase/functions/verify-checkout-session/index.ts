import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";
import { adminClient, fulfillStripeSession } from "../_shared/premium.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const { data: { user } } = await adminClient().auth.getUser(token);
    if (!user) return json({ error: "unauthorized" }, 401);
    const body = await req.json().catch(() => ({}));
    const sessionId = body?.sessionId;
    const environment = body?.environment as StripeEnv;
    if (typeof sessionId !== "string" || !/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) return json({ error: "Invalid sessionId" }, 400);
    if (environment !== "sandbox" && environment !== "live") return json({ error: "Invalid environment" }, 400);
    const session = await createStripeClient(environment).checkout.sessions.retrieve(sessionId);
    if (session.metadata?.userId !== user.id) return json({ error: "forbidden" }, 403);
    if (session.payment_status === "unpaid") return json({ activated: false, pending: true });
    await fulfillStripeSession(session, environment);
    return json({ activated: true });
  } catch (e) {
    console.error(e);
    return json({ error: e instanceof Error ? e.message : "server_error" }, 500);
  }
});

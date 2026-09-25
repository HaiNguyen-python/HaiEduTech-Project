import { type StripeEnv, verifyWebhook } from "../_shared/stripe.ts";
import { adminClient, extendPremiumOneYear } from "../_shared/premium.ts";

async function fulfill(session: any, env: StripeEnv) {
  const userId = session.metadata?.userId;
  if (!userId) {
    console.error("No userId on session", session.id);
    return;
  }
  // Idempotency: skip if this session was already applied.
  const { data } = await adminClient()
    .from("user_subscriptions")
    .select("stripe_session_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (data?.stripe_session_id === session.id) return;
  await extendPremiumOneYear(userId, {
    source: "stripe",
    email: session.customer_details?.email ?? null,
    stripe_session_id: session.id,
    environment: env,
  });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), { status: 200 });
  }
  const env: StripeEnv = rawEnv;
  try {
    const event = await verifyWebhook(req, env);
    const obj = event.data.object;
    if (event.type === "checkout.session.completed" && obj.payment_status !== "unpaid") await fulfill(obj, env);
    else if (event.type === "checkout.session.async_payment_succeeded") await fulfill(obj, env);
    else console.log("Unhandled event:", event.type);
    return new Response(JSON.stringify({ received: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});

import { type StripeEnv, verifyWebhook } from "../_shared/stripe.ts";
import { fulfillStripeSession } from "../_shared/premium.ts";

const fulfill = fulfillStripeSession;

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

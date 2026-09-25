import { createClient } from "npm:@supabase/supabase-js@2";

export const adminClient = () =>
  createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

/** Adds one year of premium, starting from the later of now or current expiry. */
export async function extendPremiumOneYear(
  userId: string,
  fields: { source: string; email?: string | null; stripe_session_id?: string; environment?: string; transfer_reference?: string },
) {
  const db = adminClient();
  const { data: existing } = await db
    .from("user_subscriptions")
    .select("expires_at, status")
    .eq("user_id", userId)
    .maybeSingle();
  const now = new Date();
  const current = existing?.status === "active" && existing?.expires_at ? new Date(existing.expires_at) : now;
  const base = current > now ? current : now;
  const expires = new Date(base);
  expires.setFullYear(expires.getFullYear() + 1);
  const { error } = await db.from("user_subscriptions").upsert(
    {
      user_id: userId,
      status: "active",
      plan: "premium",
      source: fields.source,
      user_email: fields.email ?? null,
      expires_at: expires.toISOString(),
      verified_at: now.toISOString(),
      stripe_session_id: fields.stripe_session_id ?? null,
      environment: fields.environment ?? null,
      transfer_reference: fields.transfer_reference ?? null,
      ...(fields.source === "code" ? { code_redeemed_at: now.toISOString() } : {}),
      updated_at: now.toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) throw error;
  return expires.toISOString();
}

/** Grants premium for a paid Stripe checkout session. Idempotent per session id. */
export async function fulfillStripeSession(session: any, env: string) {
  const userId = session.metadata?.userId;
  if (!userId) {
    console.error("No userId on session", session.id);
    return false;
  }
  const { data } = await adminClient()
    .from("user_subscriptions")
    .select("stripe_session_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (data?.stripe_session_id === session.id) return true;
  await extendPremiumOneYear(userId, {
    source: "stripe",
    email: session.customer_details?.email ?? null,
    stripe_session_id: session.id,
    environment: env,
  });
  return true;
}

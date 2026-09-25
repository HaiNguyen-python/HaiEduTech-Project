import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { adminClient, extendPremiumOneYear } from "../_shared/premium.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const db = adminClient();
    const { data: { user } } = await db.auth.getUser(token);
    if (!user) return json({ error: "unauthorized" }, 401);

    const body = await req.json().catch(() => ({}));
    const code = typeof body?.code === "string" ? body.code.trim().toLowerCase() : "";
    if (!code || code.length > 64) return json({ error: "invalid_code" }, 400);
    const expected = (Deno.env.get("ACTIVATION_CODE") ?? "").trim().toLowerCase();
    if (!expected || code !== expected) return json({ error: "invalid_code" }, 400);

    const { data: existing } = await db
      .from("user_subscriptions")
      .select("code_redeemed_at")
      .eq("user_id", user.id)
      .maybeSingle();
    if (existing?.code_redeemed_at) return json({ error: "already_redeemed" }, 409);

    const expires_at = await extendPremiumOneYear(user.id, { source: "code", email: user.email });
    return json({ ok: true, expires_at });
  } catch (e) {
    console.error(e);
    return json({ error: "server_error" }, 500);
  }
});

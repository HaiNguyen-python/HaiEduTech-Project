// Delete-My-Account edge function.
// Verifies the caller's JWT, deletes all their app rows via the SECURITY DEFINER
// helper delete_user_data(uuid), scrubs their storage prefixes, and finally
// removes the auth user via the admin API.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return json({ ok: false, error: "missing_authorization" }, 401);
    }

    // 1) Validate JWT + get user id via the anon-scoped client.
    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });
    const { data: userRes, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userRes.user) return json({ ok: false, error: "invalid_jwt" }, 401);
    const uid = userRes.user.id;

    // 2) Parse + validate body.
    let body: unknown = {};
    try { body = await req.json(); } catch { /* empty body ok */ }
    const confirm = (body as { confirm?: unknown })?.confirm;
    if (confirm !== "DELETE") return json({ ok: false, error: "confirm_required" }, 400);

    // 3) Admin client for privileged deletes.
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

    // 4) Wipe rows across all user-scoped tables.
    const { error: rpcErr } = await admin.rpc("delete_user_data", { _uid: uid });
    if (rpcErr) return json({ ok: false, error: `db: ${rpcErr.message}` }, 500);

    // 5) Scrub storage prefixes the user owns.
    await scrubBucket(admin, "student-documents", `${uid}/`);
    await scrubBucket(admin, "report-attachments", `${uid}/`);
    await scrubBucket(admin, "marketing-images", `your-corner/${uid}/`);

    // 6) Finally, delete the auth user.
    const { error: delErr } = await admin.auth.admin.deleteUser(uid);
    if (delErr) return json({ ok: false, error: `auth: ${delErr.message}` }, 500);

    return json({ ok: true });
  } catch (e) {
    return json({ ok: false, error: e instanceof Error ? e.message : String(e) }, 500);
  }
});

// Recursively list + remove every object under a prefix.
async function scrubBucket(admin: ReturnType<typeof createClient>, bucket: string, prefix: string) {
  try {
    const { data, error } = await admin.storage.from(bucket).list(prefix, { limit: 1000 });
    if (error || !data?.length) return;
    const paths = data.map((f) => `${prefix}${f.name}`);
    await admin.storage.from(bucket).remove(paths);
  } catch { /* best-effort */ }
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

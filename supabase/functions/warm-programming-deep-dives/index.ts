// Nightly warmer: makes sure every Programming lesson has a cached English
// Deep-Dive so learners never wait for the AI on first open.
// Reads the lesson index (synced from the admin tool), finds lessons without a
// cached Deep-Dive and generates them in small batches.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DEFAULT_BATCH = 12;
const CONCURRENCY = 2;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceRoleKey);

    let batchSize = DEFAULT_BATCH;
    let syncLessons: Array<Record<string, unknown>> | null = null;
    let generateAfterSync = false;
    try {
      const body = await req.json();
      const n = Number(body?.batch_size);
      if (Number.isFinite(n) && n > 0 && n <= 60) batchSize = Math.floor(n);
      if (Array.isArray(body?.lessons)) syncLessons = body.lessons;
      generateAfterSync = body?.generate === true;
    } catch {
      // no body -> defaults (cron calls it without one)
    }

    // Optional index sync: refresh the lesson list the nightly job walks.
    if (syncLessons) {
      const rows = syncLessons
        .filter((l) => typeof l.module_id === "string" && typeof l.lesson_id === "string")
        .map((l) => ({
          module_id: String(l.module_id),
          lesson_id: String(l.lesson_id),
          module_title: String(l.module_title ?? ""),
          lesson_title: String(l.lesson_title ?? ""),
          base_theory: String(l.base_theory ?? "").slice(0, 4000),
          code_language: l.code_language ? String(l.code_language) : null,
          updated_at: new Date().toISOString(),
        }));
      for (let i = 0; i < rows.length; i += 100) {
        const { error } = await admin
          .from("programming_lesson_index")
          .upsert(rows.slice(i, i + 100), { onConflict: "module_id,lesson_id" });
        if (error) throw error;
      }
      if (!generateAfterSync) {
        return new Response(JSON.stringify({ indexed: rows.length, synced: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }


    const [{ data: index, error: indexError }, { data: cached }] = await Promise.all([
      admin
        .from("programming_lesson_index")
        .select("module_id, lesson_id, module_title, lesson_title, base_theory, code_language"),
      admin.from("programming_theory_cache").select("module_id, lesson_id"),
    ]);
    if (indexError) throw indexError;

    const have = new Set((cached || []).map((r) => `${r.module_id}::${r.lesson_id}`));
    const missing = (index || []).filter((r) => !have.has(`${r.module_id}::${r.lesson_id}`));
    const batch = missing.slice(0, batchSize);

    let ok = 0;
    let failed = 0;
    let cursor = 0;

    const runOne = async (row: typeof batch[number]) => {
      const resp = await fetch(`${supabaseUrl}/functions/v1/enhance-programming-theory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
        body: JSON.stringify({
          module_id: row.module_id,
          lesson_id: row.lesson_id,
          module_title: row.module_title,
          lesson_title: row.lesson_title,
          base_theory: row.base_theory,
          code_language: row.code_language || "text",
          force_refresh: false,
        }),
      });
      const json = await resp.json().catch(() => ({}));
      if (resp.ok && json?.markdown && !json?.fallback) ok++;
      else {
        failed++;
        console.warn("warm failed", row.module_id, row.lesson_id, resp.status);
      }
    };

    const worker = async () => {
      while (cursor < batch.length) {
        const row = batch[cursor++];
        try {
          await runOne(row);
        } catch (e) {
          failed++;
          console.warn("warm error", row.module_id, row.lesson_id, String(e));
        }
      }
    };

    await Promise.all(Array.from({ length: CONCURRENCY }, worker));

    return new Response(
      JSON.stringify({
        indexed: index?.length || 0,
        missing_before: missing.length,
        attempted: batch.length,
        generated: ok,
        failed,
        missing_after: missing.length - ok,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("warm-programming-deep-dives error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

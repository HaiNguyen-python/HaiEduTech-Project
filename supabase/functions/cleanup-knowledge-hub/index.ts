// Edge function: Daily cleanup of expired Knowledge Hub posts (60-day TTL)
// Designed to be called by a cron job

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const now = new Date().toISOString();

    // Delete posts where expires_at has passed
    const { data: deleted, error } = await supabase
      .from("knowledge_hub_posts")
      .delete()
      .lt("expires_at", now)
      .select("id");

    if (error) {
      console.error("Cleanup error:", error);
      throw error;
    }

    const deletedCount = deleted?.length || 0;
    console.log(`Cleaned up ${deletedCount} expired knowledge hub posts`);

    return new Response(
      JSON.stringify({
        success: true,
        deleted: deletedCount,
        timestamp: now,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in cleanup-knowledge-hub:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

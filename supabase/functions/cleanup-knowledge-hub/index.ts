// Edge function: Daily cleanup of expired Knowledge Hub posts (15-day TTL)
// Admin-only endpoint

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
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // JWT Authentication + Admin role check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, { global: { headers: { Authorization: authHeader } } });
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const userId = claimsData.claims.sub;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check teacher/admin role
    const { data: roleCheck } = await supabase.rpc('has_role', { _user_id: userId, _role: 'teacher' });
    const { data: adminCheck } = await supabase.rpc('has_role', { _user_id: userId, _role: 'admin' });
    if (!roleCheck && !adminCheck) {
      return new Response(JSON.stringify({ error: 'Forbidden: teacher/admin role required' }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const now = new Date().toISOString();

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

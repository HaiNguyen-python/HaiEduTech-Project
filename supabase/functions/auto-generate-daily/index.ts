// Automated Daily Content Generation Edge Function — Admin only
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DAILY_PLAN = [
  { subject: "english", category: "grammar", level: "B1" },
  { subject: "english", category: "vocabulary", level: "B2" },
  { subject: "chinese", category: "vocabulary", level: "HSK3" },
  { subject: "programming", category: "concept", level: "beginner" },
  { subject: "english", category: "dialogue", level: "A2" },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

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

    const sb = createClient(supabaseUrl, supabaseKey);

    // Check teacher/admin role
    const { data: roleCheck } = await sb.rpc('has_role', { _user_id: userId, _role: 'teacher' });
    const { data: adminCheck } = await sb.rpc('has_role', { _user_id: userId, _role: 'admin' });
    if (!roleCheck && !adminCheck) {
      return new Response(JSON.stringify({ error: 'Forbidden: teacher/admin role required' }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const { count: todayCount } = await sb
      .from("generated_lessons")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart.toISOString());

    if ((todayCount || 0) >= 5) {
      return new Response(JSON.stringify({ 
        message: "Daily quota reached", 
        generated_today: todayCount 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const remaining = 5 - (todayCount || 0);
    const plan = DAILY_PLAN.slice(0, remaining);

    const dayOfWeek = new Date().getDay();
    const categoryRotation: Record<string, string[]> = {
      english: ["grammar", "vocabulary", "reading", "fill-blank", "reorder", "dialogue"],
      chinese: ["grammar", "vocabulary", "reading", "fill-blank", "reorder", "dialogue"],
      programming: ["concept", "fix-bug", "mini-project"],
    };

    const adjustedPlan = plan.map((item, i) => {
      const cats = categoryRotation[item.subject];
      const rotatedIdx = (dayOfWeek + i) % cats.length;
      return { ...item, category: cats[rotatedIdx] };
    });

    const results: any[] = [];

    for (const item of adjustedPlan) {
      try {
        const response = await fetch(`${supabaseUrl}/functions/v1/generate-and-store-lesson`, {
          method: "POST",
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: item.subject,
            category: item.category,
            level: item.level,
          }),
        });

        if (response.ok) {
          const lesson = await response.json();
          results.push({ status: "success", title: lesson.title, subject: item.subject });
        } else {
          const errText = await response.text();
          results.push({ status: "error", subject: item.subject, error: errText });
        }

        await new Promise(r => setTimeout(r, 3000));
      } catch (e) {
        results.push({ status: "error", subject: item.subject, error: String(e) });
      }
    }

    return new Response(JSON.stringify({
      message: `Generated ${results.filter(r => r.status === "success").length} lessons`,
      results,
      generated_today: (todayCount || 0) + results.filter(r => r.status === "success").length,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("auto-generate-daily error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

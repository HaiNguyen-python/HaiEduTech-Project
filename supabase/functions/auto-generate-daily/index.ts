// Automated Daily Content Generation Edge Function
// Generates 3-5 new lessons across subjects daily to keep content fresh
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Daily generation plan: rotate subjects and categories
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
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const sb = createClient(supabaseUrl, supabaseKey);

    // Check how many lessons were generated today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const { count: todayCount } = await sb
      .from("generated_lessons")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart.toISOString());

    // Skip if we already generated 5+ lessons today
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

    // Rotate categories based on day of week to ensure diversity
    const dayOfWeek = new Date().getDay();
    const categoryRotation: Record<string, string[]> = {
      english: ["grammar", "vocabulary", "reading", "fill-blank", "reorder", "dialogue"],
      chinese: ["grammar", "vocabulary", "reading", "fill-blank", "reorder", "dialogue"],
      programming: ["concept", "fix-bug", "mini-project"],
    };

    // Adjust plan based on day rotation
    const adjustedPlan = plan.map((item, i) => {
      const cats = categoryRotation[item.subject];
      const rotatedIdx = (dayOfWeek + i) % cats.length;
      return { ...item, category: cats[rotatedIdx] };
    });

    const results: any[] = [];

    for (const item of adjustedPlan) {
      try {
        // Call the existing generate-and-store-lesson function
        const response = await fetch(`${supabaseUrl}/functions/v1/generate-and-store-lesson`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${supabaseKey}`,
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

        // Delay between generations to avoid rate limiting
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

// Edge function: drafts a Motivation Letter OR Letter of Recommendation via
// Lovable AI Gateway (Gemini Flash). Use docType: "motivation" (default) or "lor".
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Require an authenticated user — prevents anonymous spam of the AI gateway.
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const {
      docType, fullName, programName, university, country, fieldOfStudy,
      gpa, background, careerGoal, language,
    } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const lang = language === "vi" ? "Vietnamese" : "English";
    const isLor = docType === "lor";

    const systemPrompt = isLor
      ? "You are a senior professor and industry leader who writes outstanding, specific, credible Letters of Recommendation that win scholarships. You sound like a real recommender — never generic."
      : "You are an expert international education consultant who writes outstanding Motivation Letters that win scholarships.";

    const userPrompt = isLor
      ? `Write a complete, polished Letter of Recommendation in ${lang} (~450 words) for the following student. Sound like the recommender themselves — first-person voice, concrete examples, no clichés.

Student: ${fullName || "[Name]"}
Target program: ${programName || "[Program]"}
University: ${university || "[University]"}
Recommender + relationship + strengths + anecdote:
${background || "[describe]"}

Structure (no headings, flow as a real letter):
1. Opening: how/how long the recommender knows the student, in what capacity
2. 1-2 specific stories that prove the student's strengths (with numbers / outcomes when possible)
3. Comparative claim ("top X% of N students I have taught")
4. Why this program is a strong fit for the student
5. Strong closing with explicit recommendation and contact info placeholder

Avoid: vague praise ("hardworking", "team player") without proof. Be specific.`
      : `Write a complete, polished, 5-paragraph Master's Motivation Letter in ${lang} for the following student. Each paragraph clearly labeled. Word count target ~500.

Student profile:
- Name: ${fullName || "[Name]"}
- Program: ${programName || "[Program]"}
- University: ${university || "[University]"}
- Country: ${country || "[Country]"}
- Field of study: ${fieldOfStudy || "[Field]"}
- GPA: ${gpa || "N/A"}
- Academic background & achievements: ${background || "[describe]"}
- Career goals: ${careerGoal || "[describe]"}

Structure (use these exact bold headings):
1. Introduction & Hook
2. Academic Background
3. Why This Program & University (name 2-3 specific courses, professors, or labs if you know them)
4. Career Goals
5. Conclusion

Be specific, professional, never generic. Avoid clichés. Do not repeat the CV.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "rate_limited" }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "payment_required" }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!response.ok) {
      const t = await response.text();
      console.error("Lovable AI error:", response.status, t);
      throw new Error(`AI error ${response.status}`);
    }
    const data = await response.json();
    const letter = data.choices?.[0]?.message?.content || "";
    return new Response(JSON.stringify({ letter }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("draft-motivation-letter error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

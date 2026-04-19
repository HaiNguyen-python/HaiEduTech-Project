// Edge function: draft a Motivation Letter using Perplexity AI based on a student profile.
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { fullName, programName, university, country, fieldOfStudy, gpa, background, careerGoal, language } = await req.json();
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY missing");

    const lang = language === "vi" ? "Vietnamese" : "English";

    const userPrompt = `Write a complete, polished, 5-paragraph Master's Motivation Letter in ${lang} for the following student. Each paragraph clearly labeled. Word count target ~500.

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
3. Why This Program & University (research the program: name 2-3 specific courses, professors, or labs if found online)
4. Career Goals
5. Conclusion

Be specific, professional, never generic. Avoid clichés. Do not repeat the CV.`;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "You are an expert international education consultant who writes outstanding Motivation Letters that win scholarships." },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.5,
        max_tokens: 1800,
        search_recency_filter: "year",
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("Perplexity error:", response.status, t);
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
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

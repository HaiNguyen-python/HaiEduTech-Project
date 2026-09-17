import "../_shared/ai-fallback.ts";
/**
 * Edge function: Analyse a paragraph for Coherence & Cohesion (IELTS)
 * Uses Lovable AI Gateway (google/gemini-3-flash-preview)
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ReqBody {
  paragraph: string;
  taskType: 1 | 2;
}

function fallback() {
  return {
    score: 6,
    scoreLabel: "Band 6",
    linkersFound: [] as { device: string; usage: "good" | "overused" | "mechanical" | "missing" | "misused"; note: string }[],
    referenceAnalysis: "Unable to analyse at this moment. Please try again shortly.",
    paragraphStructure: {
      hasTopicSentence: false,
      hasSupporting: false,
      hasConcluding: false,
      note: "N/A",
    },
    strengths: [] as string[],
    weaknesses: [] as string[],
    rewrite: "",
    tips: [] as string[],
  };
}

function tryParseJson(raw: string) {
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const m = cleaned.match(/\{[\s\S]*\}/);
  if (m) cleaned = m[0];
  try {
    return JSON.parse(cleaned);
  } catch {
    try {
      return JSON.parse(cleaned.replace(/,(\s*[}\]])/g, "$1"));
    } catch {
      return null;
    }
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as ReqBody;
    const { paragraph, taskType } = body;

    if (!paragraph || typeof paragraph !== "string" || paragraph.trim().length < 40) {
      return new Response(
        JSON.stringify({ error: "Paragraph must be at least 40 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (paragraph.length > 3000) {
      return new Response(
        JSON.stringify({ error: "Paragraph too long (max 3000 chars)." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI gateway not configured", ...fallback() }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are a Senior IELTS Examiner specialising in the Coherence & Cohesion criterion.
Analyse a single paragraph from an IELTS Writing Task ${taskType} response.
Score strictly on the official IELTS Coherence & Cohesion band descriptors (0-9).
Return ONLY a valid JSON object matching the schema. No prose, no markdown fences.`;

    const userPrompt = `Task type: IELTS Writing Task ${taskType}
Learner's paragraph:
"""
${paragraph}
"""

Analyse this paragraph for Coherence & Cohesion ONLY (do not judge grammar or lexical resource):
1. Identify every cohesive device (linking words, referencing, substitution, ellipsis, conjunctions).
2. For each device, judge whether it is used "good", "overused", "mechanical", "misused", and note any critical MISSING linker slot.
3. Check reference chains (this, these, such, it, they) - do they point clearly to a referent?
4. Judge paragraph structure: topic sentence, supporting sentences, concluding/linking sentence.
5. Give a Band score 0-9 using the official IELTS descriptor.
6. Rewrite the paragraph at Band 8+ level, keeping the learner's ideas but upgrading cohesion. Bold each upgraded cohesive device with **double asterisks**.

Return ONLY this JSON shape:
{
  "score": <integer 0-9>,
  "scoreLabel": "Band <n>",
  "linkersFound": [
    { "device": "<the word/phrase>", "usage": "good|overused|mechanical|misused|missing", "note": "<one short sentence>" }
  ],
  "referenceAnalysis": "<1-2 sentences on referencing chain quality>",
  "paragraphStructure": {
    "hasTopicSentence": <true|false>,
    "hasSupporting": <true|false>,
    "hasConcluding": <true|false>,
    "note": "<one sentence explaining structure>"
  },
  "strengths": ["<point 1>", "<point 2>"],
  "weaknesses": ["<point 1>", "<point 2>"],
  "rewrite": "<Band 8+ rewrite with **bolded** cohesive upgrades>",
  "tips": ["<actionable tip 1>", "<actionable tip 2>", "<actionable tip 3>"]
}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45_000);

    let resp: Response;
    try {
      resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
        }),
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      const aborted = (fetchErr as any)?.name === "AbortError";
      return new Response(
        JSON.stringify({
          error: aborted ? "Analysis timed out. Please try again." : "AI service unreachable.",
          ...fallback(),
        }),
        { status: 504, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    clearTimeout(timeoutId);

    if (resp.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please retry shortly.", ...fallback() }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (resp.status === 402) {
      return new Response(
        JSON.stringify({ error: "AI credits exhausted. Please contact admin.", ...fallback() }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Lovable AI error:", resp.status, errText);
      return new Response(
        JSON.stringify({ error: "AI analysis failed", ...fallback() }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content || "";
    const parsed = tryParseJson(content);

    if (!parsed) {
      console.error("Failed to parse AI response:", content);
      return new Response(JSON.stringify(fallback()), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyse-cohesion error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error", ...fallback() }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

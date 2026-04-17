import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const jsonHeaders = {
  ...corsHeaders,
  "Content-Type": "application/json",
};

const ALLOWED_ROLES = [
  "ai-engineer",
  "data-engineer",
  "ml-engineer",
  "language-tech",
  "custom",
] as const;

type FallbackType =
  | "ai_credits_exhausted"
  | "rate_limited"
  | "temporary_unavailable";

const SYSTEM_PROMPT = `You are a senior technical recruiter specialised in the Nordic / Finnish tech market (Helsinki, Espoo, Tampere, Oulu) for Data Engineering, AI/ML Engineering and Language Technology roles. You evaluate CVs the way Finnish hiring managers and ATS systems do.

Apply these standards:
- Finnish CVs: 1–2 pages, no photo (legally optional), English is fine, focus on impact metrics, tech stack, and quantified achievements.
- ATS optimisation: keyword match against the target role and (if provided) the job description.
- Reject fluff. Reward concrete numbers, scale, ownership, and modern stack (cloud, IaC, MLOps, LLMs, streaming, etc.).
- Be honest. If the CV is mismatched, say so. Don't inflate scores.

You MUST call the function "return_cv_review" with the structured analysis. Do not return prose.`;

const TOOL_SCHEMA = {
  type: "function",
  function: {
    name: "return_cv_review",
    description: "Return a structured CV review for the candidate.",
    parameters: {
      type: "object",
      properties: {
        matchScore: {
          type: "number",
          description: "Overall match score 0-100",
        },
        verdict: {
          type: "string",
          enum: ["strong", "good", "needs-work", "mismatch"],
        },
        verdictSummary: {
          type: "string",
          description: "1-2 sentence honest verdict.",
        },
        breakdown: {
          type: "object",
          properties: {
            technicalSkills: { type: "number", description: "0-20" },
            experience: { type: "number", description: "0-20" },
            projectImpact: { type: "number", description: "0-20" },
            atsKeywords: { type: "number", description: "0-20" },
            structure: { type: "number", description: "0-20" },
          },
          required: [
            "technicalSkills",
            "experience",
            "projectImpact",
            "atsKeywords",
            "structure",
          ],
          additionalProperties: false,
        },
        strengths: {
          type: "array",
          items: { type: "string" },
          description: "3-5 concrete strengths",
        },
        gaps: {
          type: "array",
          items: {
            type: "object",
            properties: {
              skill: { type: "string" },
              why: { type: "string" },
              howToFix: { type: "string" },
            },
            required: ["skill", "why", "howToFix"],
            additionalProperties: false,
          },
          description: "3-6 missing or weak skills vs the target role",
        },
        improvements: {
          type: "array",
          items: {
            type: "object",
            properties: {
              original: { type: "string" },
              improved: { type: "string" },
              reason: { type: "string" },
            },
            required: ["original", "improved", "reason"],
            additionalProperties: false,
          },
          description:
            "3-5 concrete bullet rewrites (before -> after) found in the CV",
        },
        nordicTips: {
          type: "array",
          items: { type: "string" },
          description: "3-5 Finland/Nordic-specific CV tips for this candidate",
        },
      },
      required: [
        "matchScore",
        "verdict",
        "verdictSummary",
        "breakdown",
        "strengths",
        "gaps",
        "improvements",
        "nordicTips",
      ],
      additionalProperties: false,
    },
  },
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });

const fallbackResponse = (
  type: FallbackType,
  title: string,
  description: string,
) =>
  jsonResponse(
    {
      fallback: {
        type,
        title,
        description,
      },
    },
    200,
  );

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) {
      return jsonResponse({ error: "AI service not configured" }, 500);
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    const { cvText, targetRole, jobDescription } = body as {
      cvText?: string;
      targetRole?: string;
      jobDescription?: string;
    };

    if (typeof cvText !== "string" || cvText.trim().length < 100) {
      return jsonResponse({ error: "CV text must be at least 100 characters" }, 400);
    }
    if (cvText.length > 15000) {
      return jsonResponse({ error: "CV text too long (max 15,000 characters)" }, 400);
    }
    if (!targetRole || !ALLOWED_ROLES.includes(targetRole as typeof ALLOWED_ROLES[number])) {
      return jsonResponse({ error: "Invalid targetRole" }, 400);
    }
    if (jobDescription && typeof jobDescription === "string" && jobDescription.length > 8000) {
      return jsonResponse({ error: "Job description too long (max 8,000 characters)" }, 400);
    }

    const roleLabels: Record<string, string> = {
      "ai-engineer": "AI Engineer (LLMs, RAG, MLOps, model deployment)",
      "data-engineer": "Data Engineer (pipelines, warehousing, streaming, cloud)",
      "ml-engineer": "ML Engineer (training, productionising models, feature stores)",
      "language-tech": "Language Technology Engineer (NLP, multilingual systems, speech)",
      custom: "Custom role described in the job description",
    };

    const userPrompt = `Target role: ${roleLabels[targetRole]}

${jobDescription ? `Job description provided by candidate:\n"""\n${jobDescription.trim()}\n"""\n` : "No job description provided — evaluate against typical Nordic market expectations for the target role."}

Candidate CV (raw text):
"""
${cvText.trim()}
"""

Now call return_cv_review with your structured assessment.`;

    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          tools: [TOOL_SCHEMA],
          tool_choice: {
            type: "function",
            function: { name: "return_cv_review" },
          },
        }),
      },
    );

    if (!aiResp.ok) {
      const errText = await aiResp.text();

      if (aiResp.status === 402) {
        return fallbackResponse(
          "ai_credits_exhausted",
          "AI review is temporarily unavailable",
          "Your workspace AI balance is exhausted. Add funds in Settings → Cloud & AI balance, then run the analysis again.",
        );
      }

      if (aiResp.status === 429) {
        return fallbackResponse(
          "rate_limited",
          "Too many CV reviews right now",
          "The AI review service is busy. Please wait a moment and try again.",
        );
      }

      console.error("AI gateway error:", aiResp.status, errText);
      return fallbackResponse(
        "temporary_unavailable",
        "AI review is temporarily unavailable",
        "The analysis service could not complete your review right now. Please try again shortly.",
      );
    }

    const data = await aiResp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response", JSON.stringify(data).slice(0, 500));
      return fallbackResponse(
        "temporary_unavailable",
        "AI review is temporarily unavailable",
        "The analysis service returned an incomplete result. Please try again shortly.",
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(toolCall.function.arguments);
    } catch (e) {
      console.error("Failed to parse tool args", e);
      return fallbackResponse(
        "temporary_unavailable",
        "AI review is temporarily unavailable",
        "The analysis service returned an invalid result. Please try again shortly.",
      );
    }

    return jsonResponse({ review: parsed });
  } catch (e) {
    console.error("analyze-cv error:", e);
    return fallbackResponse(
      "temporary_unavailable",
      "AI review is temporarily unavailable",
      "The CV analysis service hit an unexpected error. Please try again shortly.",
    );
  }
});

/**
 * PhD Research (EdTech) AI helper.
 * Modes:
 *  - literature: Perplexity sonar-pro academic search → returns summary + citations.
 *  - rq: Generate research questions + hypotheses (H1/H0) for a topic.
 *  - note_polish: Rewrite a raw note into a clean academic-style note.
 */
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { mode, query, topic, content, language, step, status, note, context } = await req.json();
    if (!mode) {
      return new Response(JSON.stringify({ error: "Missing mode" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!KEY) throw new Error("PERPLEXITY_API_KEY missing");

    const lang = language === "en" ? "English" : "Vietnamese";

    let system = "";
    let userMsg = "";
    let searchMode: string | undefined;
    let recency: string | undefined;
    if (mode === "literature") {
      if (!query) throw new Error("Missing query");
      system =
        "You are a PhD research assistant for EdTech. Summarize the most relevant academic findings, cite real papers (author, year, venue). Be concise and structured.";
      userMsg = `Find and summarize 4-6 recent academic papers (2020+) relevant to:\n\n"${query}"\n\nFor each paper, output:\n- **Title** (Authors, Year, Venue)\n- 2-3 sentence summary of contribution\n- Why it matters for EdTech research\n\nEnd with a 3-sentence "Research gap" paragraph identifying what is NOT yet well-studied.\n\nLanguage: ${lang}.`;
      searchMode = "academic";
      recency = "year";
    } else if (mode === "rq") {
      if (!topic) throw new Error("Missing topic");
      system =
        "You are a senior PhD advisor in EdTech. You write research questions that are Feasible, Interesting, Novel, Ethical, and Relevant (FINER).";
      userMsg = `Generate THREE strong research questions for a PhD project on:\n\n"${topic}"\n\nFor each RQ:\n1. **RQ** (one sentence, specific, includes population + intervention + outcome)\n2. **H1** (alternative hypothesis, testable, with expected direction)\n3. **H0** (null hypothesis)\n4. **Suggested method** (e.g. RCT, DiD, qualitative, mixed-methods) - 1-2 sentences\n5. **Risk** (one feasibility risk to watch)\n\nUse Markdown headings. Language: ${lang}.`;
    } else if (mode === "note_polish") {
      if (!content) throw new Error("Missing content");
      system =
        "You are an academic editor. Rewrite raw research notes into clean, well-structured academic notes. Preserve all facts. Add bullets/headings where helpful.";
      userMsg = `Polish the following raw research notes. Keep all facts. Use Markdown headings + bullets. Add a 1-line TL;DR at the top. Language: ${lang}.\n\nRAW NOTES:\n${content}`;
    } else if (mode === "next_action") {
      if (!step) throw new Error("Missing step");
      system =
        "You are a senior PhD advisor in EdTech. Produce concrete, doable next actions tailored to the student's current progress. Be specific, time-boxed, and actionable. Avoid generic advice.";
      const statusLine = status ? `Current status: ${status}.` : "Current status: not started.";
      const noteLine = note ? `Student's own note about this step:\n"""${String(note).slice(0, 800)}"""` : "Student has not written a note for this step yet.";
      const ctxLine = context ? `Overall PhD context:\n"""${String(context).slice(0, 600)}"""` : "";
      userMsg = `The student is working on the PhD roadmap step: "${step}".\n${statusLine}\n${noteLine}\n${ctxLine}\n\nProduce in Markdown, in ${lang}:\n\n## 🎯 Mục tiêu tuần tới / Goal for next week\nOne sentence, measurable.\n\n## ✅ Checklist (5-8 tasks)\nA Markdown checklist using "- [ ]" items. Each task: specific, doable in 30-120 minutes, mentions a concrete deliverable (file, doc, count, link).\n\n## 🧰 Tài nguyên / Resources\n3-5 concrete resources (tools, papers, templates, websites) — link or name.\n\n## ⚠️ Rủi ro & cách giảm / Risks & mitigation\n2-3 risks specific to current status, each with a 1-line mitigation.\n\n## ⏭ Khi nào chuyển bước / When to move on\n2-3 exit criteria to mark this step as Done.\n\nKeep total under 350 words.`;
    } else {
      throw new Error("Invalid mode");
    }

    const body: Record<string, unknown> = {
      model: mode === "rq" ? "sonar-pro" : "sonar-pro",
      messages: [
        { role: "system", content: system },
        { role: "user", content: userMsg },
      ],
      temperature: mode === "note_polish" ? 0.2 : 0.4,
      max_tokens: 1400,
    };
    if (searchMode) body.search_mode = searchMode;
    if (recency) body.search_recency_filter = recency;

    const resp = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      const t = await resp.text();
      console.error("Perplexity err", resp.status, t);
      throw new Error(`AI error ${resp.status}`);
    }
    const data = await resp.json();
    const content_out = data.choices?.[0]?.message?.content?.trim() || "";
    const citations: string[] = Array.isArray(data.citations) ? data.citations : [];
    return new Response(JSON.stringify({ content: content_out, citations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("phd-research-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

---
name: PhD Research (EdTech) Hub
description: Teacher/admin-only PhD workspace in /admin — Literature, Notebook, RQ Generator, Citations, Proposal Builder
type: feature
---
Tab "🎓 PhD Research" in /admin (teacher/admin only).

Edge function: `phd-research-ai` (Perplexity sonar-pro) with 3 modes:
- `literature` (academic search_mode, recency=year) → summary + citations
- `rq` → 3 Research Questions with H1/H0/method/risk
- `note_polish` → clean academic-style rewrite

Tables (RLS: owner only, must be staff):
- `phd_research_notes` (topic, title, content, tags[], importance 1-5)
- `phd_research_citations` (topic, title, authors, year, source_url, summary, tags[])

Proposal Builder reuses `src/lib/phdProposalScore.ts` (scoreProposal + buildProposalDocxBlob).
Notebook supports export to Markdown; proposal exports to .doc.

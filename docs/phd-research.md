# PhD Research architecture
- Keep verified source records separate from AI synthesis drafts; evidence editing and AI outputs reuse user-scoped notes/citations to preserve traceability and privacy.
- Preserve the existing literature provider; new method/synthesis/review tools use server-only Lovable AI Responses without automatic retries to avoid duplicate billing.
- Browser roadmap drafts are user-scoped, explicitly saved as Roadmap State notes and restored from the account when no local draft exists; never migrate the old shared browser key because ownership is unknown.
- Retain the per-user staff RLS and validate teacher/admin roles server-side for every AI request; client navigation is not authorization.
- The personal research brief is a typed Research Brief note, not a source or notebook entry; supply topic, keywords, problem, population, objectives and constraints to guided actions and research tools. Keep it editable without resetting existing roadmap progress.
- Admin tool order uses dnd-kit pointer/keyboard sorting with a per-user browser preference; preserve canonical tab-group routing and role filtering regardless of the visual position.
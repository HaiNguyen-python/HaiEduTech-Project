# PhD Research architecture
- Keep verified source records separate from AI synthesis drafts; evidence editing and AI outputs reuse user-scoped notes/citations to preserve traceability and privacy.
- Preserve the existing literature provider; new method/synthesis/review tools use server-only Lovable AI Responses without automatic retries to avoid duplicate billing.
- Browser roadmap drafts are user-scoped, explicitly saved as Roadmap State notes and restored from the account when no local draft exists; never migrate the old shared browser key because ownership is unknown.
- Retain the per-user staff RLS and validate teacher/admin roles server-side for every AI request; client navigation is not authorization.
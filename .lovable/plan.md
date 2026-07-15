## Security & GDPR Compliance Implementation Plan

Comprehensive audit + GDPR features across 3 phases. All new code will use English-only comments and match the existing Royal Blue → Soft Emerald design system (light + dark mode ready).

---

### Phase 1 — Frontend Security & Data Minimization

**1.1 XSS / Input sanitization audit**
- Sweep every `dangerouslySetInnerHTML` usage (found in `PostCard.tsx`, `GeneratedLessonView.tsx`, `AIAcademy.tsx`, `Notebook.tsx`, `LessonDetail.tsx`, `LanguageLessonView.tsx`, `PhrasePractice.tsx`, etc.) and ensure each one routes through `sanitizeHtml()` in `src/lib/utils.ts` (DOMPurify).
- Extend `src/lib/utils.ts` with a `sanitizeText(input, maxLen)` helper that trims, strips control chars, and enforces length caps. Apply to: `Signup.tsx` (fullName), `DailyReportForm.tsx` (summary/feedback), Your Corner composer, essay/writing textareas, chatbot input.
- Add Zod schemas where forms currently rely on manual `if` checks (signup, contact, essay submissions).

**1.2 localStorage / sessionStorage audit**
- Create `src/lib/safeStorage.ts` — wrapper that (a) namespaces keys under `het:` , (b) refuses to write values matching PII regexes (email, VN phone, JWT-shaped strings), (c) logs a dev-only warning.
- Rewrite direct `localStorage.setItem` calls that store user info to go through this helper. Progress/XP/streak numeric caches are fine (no PII); focus is anywhere `email`, `full_name`, `phone`, or raw tokens might leak.
- Note: Supabase JS client already stores its session in localStorage — this is expected and cannot be changed; document it in the privacy policy instead.

**1.3 Secure API transport**
- Confirm `VITE_SUPABASE_URL` is `https://…` (it is). Add a runtime assert in `src/integrations/supabase/client.ts`? No — file is auto-generated, do NOT edit. Instead add the assert in `src/main.tsx` (throws in dev if URL is not https).
- Audit any `fetch(` calls in `src/` for hardcoded `http://` — replace or remove.

---

### Phase 2 — GDPR User-Facing Features

**2.1 Cookie Consent Banner**
- New component `src/components/gdpr/CookieConsentBanner.tsx`, mounted globally in `src/App.tsx`.
- Bottom-fixed, glass-card, brand gradient accent, slide-up animation via Framer Motion.
- Three actions: **Accept All**, **Reject Non-Essential**, **Manage Preferences** (opens a modal with two toggles: Functional, Analytical — Essential is always-on and disabled).
- Choice persisted to `localStorage` key `het:cookie-consent-v1` as `{ essential:true, functional, analytical, ts }`.
- Export `useCookieConsent()` hook. Analytics/tracking (`usePageViewTracker`, any third-party scripts) short-circuit if `analytical` is false.
- Bilingual (VI/EN) via `LanguageContext`.

**2.2 Privacy Policy & Terms pages**
- New routes: `/privacy` → `src/pages/PrivacyPolicy.tsx`, `/terms` → `src/pages/TermsOfService.tsx`. Wired in `src/App.tsx`.
- Sections in Privacy: data collected (name, email, learning progress, voice data for Speaking Coach, uploaded documents), lawful basis, purpose, processors (Supabase EU region, Lovable AI Gateway, Perplexity), retention, user rights under GDPR Art. 15–22, right-to-be-forgotten workflow, contact (contact@haiedutech.com).
- Terms: acceptable use, account rules, IP, disclaimers, governing law.
- Both bilingual, semantic HTML, single H1, proper meta description + canonical.
- Add footer links to both pages in `src/components/Footer.tsx`.

**2.3 Privacy & Data self-service tab**
- New tab "Privacy & Data" inside `src/pages/Dashboard.tsx` (Radix Tabs).
- **Export My Personal Data:** client-side fetch of the current user's rows across `profiles`, `student_profiles`, `student_activity_log` (last 12 months), `user_vocab_mastered`, `student_notebooks`, `student_submissions`, `writing_drafts`, `daily_reports`, `your_corner_posts/comments/reactions`. Package as JSON, trigger download `haiedutech-export-<uid>-<date>.json`.
- **Delete My Account:** double-confirm modal (type "DELETE" + password re-auth) → calls new edge function `delete-my-account` which:
  - verifies JWT
  - deletes rows from all user-owned tables (helper SQL function `public.delete_user_data(uuid)` with `security definer`, invoked via RPC)
  - deletes storage objects under the user's prefixes in `student-documents`, `report-attachments`, `marketing-images/your-corner/<uid>`
  - calls `supabase.auth.admin.deleteUser()` using `SUPABASE_SERVICE_ROLE_KEY` (server-only)
  - returns success → frontend signs out and redirects to `/`.

**Backend for 2.3 (single migration + edge function):**
- Migration creates `public.delete_user_data(_uid uuid)` `security definer` that deletes from every user-scoped table listed above, guarded so it can only delete rows where `user_id = _uid`. Grant execute to `authenticated`.
- Edge function `supabase/functions/delete-my-account/index.ts` with CORS + JWT validation + Zod body schema.

---

### Phase 3 — SUPABASE_SECURITY.md

New file at repo root documenting (developer-facing, not shown to users):
- RLS enforcement examples for `profiles`, `student_profiles`, `student_submissions`, `student_notebooks`, `writing_drafts`, `daily_reports`, `your_corner_*` — the `auth.uid() = user_id` pattern with SELECT/INSERT/UPDATE/DELETE templates.
- Public-schema GRANT rules (mirroring project standard).
- Roles pattern (`user_roles` + `has_role()` security definer, no roles column on profiles).
- Anon vs. service_role key handling: publishable/anon key is safe in the browser bundle (already in `.env` VITE_ vars), service role key stays server-side only inside edge functions, never in client code.
- Secret management via Lovable Cloud secrets tools; no `.env` for secrets.
- Signed URLs for private buckets (`student-documents`, `report-attachments`).
- Rate-limit + moderation hooks for user-generated content.

---

### Files summary

New:
- `src/lib/safeStorage.ts`
- `src/components/gdpr/CookieConsentBanner.tsx`, `CookiePreferencesModal.tsx`
- `src/hooks/useCookieConsent.ts`
- `src/pages/PrivacyPolicy.tsx`, `src/pages/TermsOfService.tsx`
- `src/components/dashboard/PrivacyDataTab.tsx`
- `supabase/functions/delete-my-account/index.ts`
- 1 migration: `delete_user_data()` function
- `SUPABASE_SECURITY.md`

Edited:
- `src/lib/utils.ts` (add `sanitizeText`)
- `src/App.tsx` (routes + mount banner)
- `src/components/Footer.tsx` (Privacy/Terms links)
- `src/pages/Dashboard.tsx` (Privacy & Data tab)
- `src/pages/Signup.tsx`, `src/components/assistant/DailyReportForm.tsx`, chatbot/essay inputs (apply `sanitizeText` + Zod)
- `src/hooks/usePageViewTracker.ts` (respect analytical consent)
- `src/main.tsx` (HTTPS runtime assert)

### Notes
- Account deletion is irreversible — modal will make that explicit. No 30-day grace.
- Voice recordings from Speaking Coach are processed in-browser (Web Speech API) and not persisted server-side today; the Privacy Policy will state this accurately.
- The Supabase auth session token in localStorage is a framework requirement; documented rather than removed.

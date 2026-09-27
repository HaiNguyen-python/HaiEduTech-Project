- Keep curated IELTS vocabulary imagery in an explicit one-word-to-one-photo mapping, separate from shared multilingual emoji resolution, so meaning-reviewed images cannot be replaced by unrelated cached art.
- Home page student results come only from the `testimonials` table (public reads published rows, staff manage all); never hardcode or auto-generate testimonial content - the section self-hides when the table is empty.
- Keep public course tuition in the shared `CourseTuitionSection` data so English, Chinese and Programming prices and the 3x one-to-one rule stay consistent.
- Keep the public course-list visual palette in semantic `--tuition-*` tokens and use the same responsive row layout across the three subject pages, so pricing remains legible and theme-aware.
- Derive course registration labels and displayed prices from the shared tuition catalog; validate checkout prices against a server-side EUR allowlist and record paid course tuition separately from Premium, so a course payment cannot unlock unrelated lessons.
- Keep only the exact `/english`, `/chinese`, `/programming`, and `/register` overview routes public; nested learning routes remain authentication and Premium protected.
- Keep Lovable auth emails in the shared six-template set, styled with HaiEduTech branding and deployed through the required auth email hook.

- Navbar shows only 5 subject areas: Home, About, English, Chinese, Programming, Lifestyle, Your Corner. Vietnamese/Japanese/Finnish/Swedish are hidden from all navigation (desktop + mobile) for every account incl. teacher; their pages remain reachable via direct URL. Do not re-add nav entries without user request.

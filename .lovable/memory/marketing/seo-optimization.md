---
name: SEO Optimization
description: Per-page SEO via react-helmet-async + sitemap.xml. SEO component at src/components/SEO.tsx, HelmetProvider in main.tsx, sitemap.xml + robots.txt with disallow private routes. 19 main pages have unique Vietnamese titles/descriptions, Course JSON-LD on language hubs.
type: feature
---
- Component: `src/components/SEO.tsx` — props: title, description, path, image, jsonLd, type, locale, noindex. Auto-appends "| HaiEduTech" if missing.
- Provider: `<HelmetProvider>` wraps `<App />` in `src/main.tsx`.
- Sitemap: `public/sitemap.xml` lists ~70 main routes; declared in `public/robots.txt` (which also disallows /dashboard, /login, /signup, /admin-dashboard, etc).
- index.html: Vietnamese title/description, EducationalOrganization + WebSite JSON-LD, max-image-preview:large.
- Pages with SEO: Index, English, Chinese, Finnish, Programming, IeltsLectures, IeltsWritingPractice, IeltsVocabulary, HskHub, HskVocabulary, ToeicLectures, StudyAbroadHub, Vietnamese, KnowledgeHubPage, Contact, About, EnglishGrammar, AIGrading.
- Course JSON-LD: English, Chinese, Finnish, Programming hubs use `const COURSE_LD = {...}` above return, passed as `jsonLd={COURSE_LD}`.
- TODO: Add SEO to PteHub (uses PteShell instead of Navbar), per-lesson dynamic SEO, Google Search Console verification file.

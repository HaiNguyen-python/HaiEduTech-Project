---
name: Admin certificate centre
description: Admin > Operations > Certificates issues certificates for any course, stores records in certificates table, public /verify/:code page
type: feature
---
Admin tab `certificates` (Operations group) in AdminDashboard.

- Courses: business, academic, vff (A1/A2/B1), ai-academy, custom (teacher types course name VI + EN).
- Teacher can ALWAYS issue; an amber warning explains progress cannot be verified server-side (local storage based) instead of blocking.
- Table `public.certificates` (code unique, student_id, student_name, course_key, course_label_en/vi, level, score, max_score, note, issued_at, issued_by, revoked_at). RLS: staff full read/insert/update, students read own. Insert requires `issued_by = auth.uid()`.
- `public.verify_certificate(_code)` SECURITY DEFINER returns only safe fields; granted to anon. Powers public `/verify/:code` (in PUBLIC_PREFIXES).
- `src/lib/certificateService.ts`: buildCertificateCode (deterministic, prefixes HET-BUS/ACA/VFF/AI/CRT), issueCertificate (upsert on code), listCertificates, revokeCertificate, verifyCertificate.
- Shared artwork `src/components/certificates/CertificateCanvas.tsx` used by admin tab and PurposeEnglishCertificate. PDF via html2canvas + jsPDF landscape.

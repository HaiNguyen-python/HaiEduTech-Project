# Kế hoạch: Thêm mục "Startup" vào menu Programming

## 1. Menu Navigation (Navbar.tsx)

Thêm nhóm mới `#prog-startup-group` trong `programmingSubs`, đặt ngay trước "Sự nghiệp / Career" (dòng 266):

```
🚀 Startup (Rocket icon, groupLabel: "prog-startup")
 ├─ Tổng quan Startup Tech        → /programming/startup
 ├─ Lộ trình Founder 0→1          → /programming/startup/roadmap
 ├─ Bài học Startup (12 modules)  → /programming/startup/lessons
 ├─ Case Studies VN & Global      → /programming/startup/case-studies
 ├─ Startup Toolkit               → /programming/startup/toolkit
 └─ Pitch Simulator (AI Investor) → /programming/startup/pitch-simulator
```

## 2. Cấu trúc nội dung: 6 Modules · 30 Lessons

Tạo module curriculum mới `src/data/curriculum/startupLessons.ts` (course key: `"startup"` — thêm vào `types.ts`) và gộp vào `expandedModules` qua `src/data/curriculum/index.ts`.

**Module 1 — Tư duy Founder (5 lessons)**
1. Startup là gì? Startup vs SME vs Corporate
2. Founder mindset: Growth, First-principles, Bias for action
3. Tìm ý tưởng: Pain point, Trend AI/EdTech/Fintech VN 2026
4. Kiểm chứng ý tưởng: 10 customer interviews rule
5. Co-founder & team: CTO/CEO/CPO, equity split, vesting

**Module 2 — Sản phẩm & MVP (5 lessons)**
6. Design Thinking & Jobs-To-Be-Done
7. Lean Canvas 9 ô (tương tác kéo-thả)
8. MVP: từ Figma → No-code (Lovable/Bubble) → Code
9. UX/UI cho founder không phải designer
10. Đo lường: North Star Metric, AARRR funnel

**Module 3 — Business Model & Market (5 lessons)**
11. Business Model Canvas & Revenue streams (SaaS, Marketplace, Freemium…)
12. TAM–SAM–SOM: tính thị trường VN/SEA
13. Định giá sản phẩm (Value-based, Cost-plus, Tiered)
14. Unit Economics: CAC, LTV, Payback period, Gross margin
15. Go-To-Market cho AI/EdTech tại VN (TikTok, Zalo OA, School B2B)

**Module 4 — Gọi vốn & Tài chính (5 lessons)**
16. Bootstrapping vs VC vs Angel vs Grant
17. Cap Table 101 & Dilution modeling
18. Pitch Deck 10 slide (template YC + Sequoia)
19. Term Sheet: SAFE, Convertible Note, Priced round
20. Tài chính startup: Burn rate, Runway, 3-statement forecast

**Module 5 — Vận hành & Tăng trưởng (5 lessons)**
21. Xây team đầu tiên: hire slow, fire fast
22. Growth Hacking: viral loops, referral, SEO/ASO
23. Product-Market Fit: dấu hiệu & cách đo (Sean Ellis test)
24. Culture, OKRs, và weekly rituals
25. Legal cho startup VN: LLC, IP, hợp đồng lao động, thuế

**Module 6 — AI Startup Playbook (5 lessons)**
26. Bối cảnh AI 2026: LLM wrapper vs Vertical AI vs Infra
27. Build AI product với API (OpenAI, Anthropic, Gemini, open-source)
28. Data moat & Fine-tuning: khi nào cần?
29. Case: ELSA Speak, Got It, VinAI, Misa AVA, Trusting Social
30. Từ VN ra thế giới: YC, Antler, 500 Global, Iterative

Mỗi lesson tuân thủ interface `ExtendedProgrammingLesson`: `theory` (VI, 400-600 từ, không em-dash), `theoryEn`, `code` (JSON/TS ví dụ Lean Canvas / cap table / metrics; hoặc pseudo-framework), `exercise`, `quiz` 5 câu, `difficulty`, `solutionExplanation`. Lesson số + code snippet dùng cho ví dụ tính CAC/LTV, runway calculator, pitch deck outline.

## 3. Trang & Component mới

- `src/pages/StartupHub.tsx` — landing với 6 module cards, roadmap timeline, CTA vào lessons + pitch simulator.
- `src/pages/StartupRoadmap.tsx` — timeline 0→1→10 với milestones (Idea · Interview · MVP · Beta · PMF · Seed · Series A).
- `src/pages/StartupCaseStudies.tsx` — 12 case: 6 VN (ELSA, VinAI, Misa AVA, Got It, Kiki, Trusting Social), 6 global (Airbnb, Notion, Figma, Duolingo, OpenAI, Perplexity). Mỗi case: Problem · Insight · GTM · Metrics · Lessons.
- `src/pages/StartupToolkit.tsx` — bộ công cụ tương tác:
  - Lean Canvas Builder (9 ô, lưu localStorage, export PNG/PDF)
  - Cap Table Simulator (founder %, ESOP, seed dilution)
  - Runway Calculator (burn, cash, hires)
  - Unit Economics Calculator (CAC, LTV, payback)
  - Pitch Deck Outline Generator
- `src/pages/StartupPitchSimulator.tsx` — AI Investor mô phỏng qua Lovable AI Gateway (`google/gemini-2.5-flash`). Học sinh nhập 10 slide → AI đóng vai investor hỏi khó, chấm điểm 5 tiêu chí (Problem, Solution, Market, Traction, Team) 0-100 và feedback.
- `src/components/startup/*` — LeanCanvas, CapTable, RunwayCalc, UnitEcon, PitchDeckOutline, CaseStudyCard.

Reuse pattern: giống `StartupVNSandbox` hiện có (đã trong AI Academy) — style, chip-filter, sandbox mini-activities.

## 4. Routing (src/App.tsx)

Thêm 6 route:
```
/programming/startup                     → StartupHub
/programming/startup/roadmap             → StartupRoadmap
/programming/startup/lessons             → redirect tới /programming/startup-foundations/<firstLesson>
/programming/startup/case-studies        → StartupCaseStudies
/programming/startup/toolkit             → StartupToolkit
/programming/startup/pitch-simulator     → StartupPitchSimulator
```

Các lessons dùng lại `ProgrammingLesson.tsx` qua `/programming/:moduleId/:lessonId` (đã hỗ trợ course mới nếu module gộp vào `expandedModules`).

## 5. Backend (Lovable Cloud)

Edge function `startup-pitch-critic` (Lovable AI Gateway, model mặc định `google/gemini-2.5-flash`, không cần API key mới) nhận pitch deck JSON, trả feedback + score. Rate-limit theo `auth.uid()`. Không cần bảng DB — dùng `programming_xp` và `useProgrammingXP` sẵn có để track lesson completion.

## 6. Catalog & Assignment

Thêm entries vào `src/lib/assignmentLessonCatalog.ts` dưới key mới `startup` (hoặc gộp `ai_academy`) để Teacher Hai giao bài.

## 7. Memory & SEO

- Ghi mem mới `mem://features/programming/startup-track.md` mô tả track (6 modules, 30 lessons, pitch simulator).
- SEO: `<title>` cho từng trang (dưới 60 ký tự), meta description dưới 160.

## 8. Kiểm thử

- Typecheck sạch sau khi thêm module & routes.
- Route smoke test qua `scripts/smoke-test-routes.mjs` (thêm 6 route mới).
- Playwright: mở `/programming/startup`, click vào lesson đầu, chạy quiz, mở Pitch Simulator, gửi 1 pitch giả.

## Technical Details

- Course key mới `"startup"` trong `ExtendedProgrammingModule["course"]` union → cập nhật `src/data/curriculum/types.ts`.
- Không dùng em-dash trong nội dung programming (dùng "-" theo Core memory).
- Icon Rocket (đã import trong Navbar).
- Toolkit dùng `localStorage` key `hai_startup_toolkit_v1` cho persistence khách vãng lai; đồng bộ Supabase khi đăng nhập (bảng `startup_canvas` với RLS `auth.uid() = user_id`, GRANT `authenticated`, ENABLE RLS + policy CRUD own row).
- Pitch simulator: streaming response, xử lý 429/402 theo chuẩn AI Gateway.

## Phạm vi KHÔNG làm ở lần này
- Không thay đổi các track Programming khác.
- Không tích hợp thanh toán / mentor booking (có thể mở rộng sau).

# Plan: Study Abroad portal cleanup + PhD Pathway v2

## Part 1 — Gỡ SAT Roadmap khỏi Study Abroad

SAT vẫn còn lộ trình trong khu vực English/SAT chính, nên chỉ cần gỡ entry "Lộ trình SAT" khỏi cổng du học (không xoá file/route để tránh vỡ link cũ).

- `src/pages/StudyAbroadHub.tsx` — xoá card "Lộ trình SAT".
- `src/components/Navbar.tsx` — xoá mục `/study-abroad/sat` trong nhóm Study Abroad.
- `src/components/GlobalSearch.tsx` — xoá entry "SAT Roadmap" thuộc group `abroad`.
- `src/components/DidYouKnow.tsx` — đổi CTA "Lộ trình SAT" → trỏ về `/study-abroad` (hub) thay vì xoá hẳn fact.
- Giữ `src/pages/SatRoadmap.tsx` + route `/study-abroad/sat` để không 404 với link đã chia sẻ; chỉ ẩn khỏi điều hướng.

## Part 2 — Nâng cấp PhD Global Pathway (trọng tâm)

Mục tiêu: biến hub PhD thành cockpit chiến lược đầy đủ hơn, không chỉ là "tài liệu + AI tools" rời rạc.

### 2.1 Supervisor Finder Studio (mới)
Component mới `src/components/phd/PhdSupervisorFinder.tsx` + data `src/data/phdSupervisorSearch.ts`.
- Form 3 trường: research keywords, target country, level (MSc/PhD/Postdoc).
- Sinh **deep-link tìm kiếm** tới Google Scholar, ORCID, ResearchGate, OpenReview, dblp, Semantic Scholar, university directories theo country (Aalto/Helsinki, TUM, ETH, MIT…).
- Checklist 8 bước "đánh giá supervisor" (h-index, funding hiện tại, alumni placement, last paper <12 tháng, lab size, English-friendly, complaint search, contact channel) — tick được, lưu `localStorage` `phd-supervisor-checklist`.
- Nút "Copy shortlist template" sinh bảng Markdown (Name / Uni / Topic / Email / Last paper / Notes).

### 2.2 Cold Email Studio v2.1 — Outreach Tracker
Bổ sung vào `src/components/phd/PhdColdEmailStudio.tsx`:
- Sau khi sinh email, thêm khối **Outreach Tracker** lưu localStorage `phd-outreach-log` với các cột: Professor, University, Sent date, Status (Sent / Replied / Interview / Rejected / Ghosted), Next action.
- Hành động: thêm dòng, đổi status (Select), xoá dòng, export CSV.
- Hiển thị mini-stats: tỉ lệ reply, ghosted, pipeline funnel.

### 2.3 Research Proposal Builder v2
Mở rộng `src/components/phd/PhdProposalBuilder.tsx`:
- Thêm bước 8 "References" với gợi ý 5 keyword cho Google Scholar (deep link).
- Thanh **Proposal Health Score** 0-100 chấm theo regex client-side: ≥1500 từ, có "research question", có "methodology", có ≥3 citations style `(Author, 2023)`, không lặp >3 lần cùng câu mở.
- Nút "Export .docx" (đơn giản: build HTML rồi `Blob` `.doc` mime `application/msword`) song song với `.md` hiện có.

### 2.4 Funding Database — Deadline Radar
Cập nhật `src/pages/PhdGlobalPathway.tsx` + `src/data/phdFundingDatabase.ts`:
- Thêm field `deadlineMonth: number` (1-12) cho từng học bổng (đa số đã có chuỗi mô tả; map về tháng chính).
- Thêm tab "🗓️ Deadline Radar" cạnh filter hiện tại — hiển thị heatmap 12 tháng (grid 12 ô) đếm số học bổng deadline trong tháng đó, click filter theo tháng.
- Sort default: gần deadline nhất tính từ `new Date()`.

### 2.5 Country Guides — Cost & Living panel
Mở rộng `src/data/phdCountryGuides.ts`: thêm `costOfLiving` (rent, food, transport USD/tháng) + `cultureNotesVi/En` (3-4 gạch đầu dòng). Render trong tab country dưới panel Funding hiện tại.

### 2.6 FAQ
`src/data/phdFaq.ts` mở rộng từ 10 → 18 câu (PI vs supervisor, dual-degree, gap year, work visa sau PhD, OPT/STEM US, family visa, mental health, publication-based PhD…).

### 2.7 Hero — Stats strip
Thêm strip 4 chỉ số nhỏ dưới hero: countries, funding, FAQ, timeline months — sync động từ data length.

## Part 3 — Nâng cấp các mục Study Abroad khác

### 3.1 Mentor Hub
- `src/data/mentorStories.ts`: bổ sung thêm 4-6 alumni mới (Mỹ STEM, Anh Chevening, Hàn KGSP, Singapore SINGA, Phần Lan, Trung Quốc CSC) — tổng ≥ hiện tại + 5.
- `src/pages/MentorHub.tsx`: thêm filter theo **scholarship type** (Government / University / Self-funded / Industry) và thanh search theo từ khoá tên/ngành.
- Mỗi card mentor thêm badge "🎓 GPA · IELTS · Scholarship amount" để học sinh so sánh nhanh.

### 3.2 Motivation Letter Master
- Bổ sung **Inspiration Gallery**: 6 đoạn mở bài mẫu được duyệt (Engineering, Public Health, Education, CS-AI, Business, Arts), mỗi đoạn có "Why it works" — data file mới `src/data/motivationLetterSamples.ts`.
- Thêm nút "Sanity Check" client-side trên textarea hiện tại: đếm từ (mục tiêu 500-650), cảnh báo cliché list ("Since I was a child", "passionate about", "dream came true"), gợi ý thay thế.

### 3.3 Pre-Departure Checklist
- `src/data/preDepartureChecklist.ts`: thêm quốc gia **Germany**, **Australia**, **Korea**, **Japan** (mỗi nước 18-25 mục, 6 categories).
- `src/pages/PreDepartureChecklist.tsx`: thêm **Currency converter mini** (input VND/USD, hiển thị EUR/GBP/AUD theo tỉ giá tĩnh có ghi rõ "cập nhật thủ công, tham khảo").
- Nút "Export checklist as PDF" (in-browser `window.print()` stylesheet `@media print`).

### 3.4 Study Abroad Hub landing
- Sau khi bỏ SAT, lưới còn 6 mục — giữ 3-col đẹp.
- Thêm khối "📅 Mốc deadline nóng" dưới hero, đọc từ `PHD_FUNDING` và lọc 6 deadline gần nhất (tận dụng cùng metadata mới ở 2.4).
- Thêm strip "🤝 Đã hỗ trợ 200+ học viên" + ảnh chibi đôi (tận dụng asset có sẵn) cho thân thiện.

## Technical notes

- Tất cả tính năng client-side, dùng `localStorage` cho guest, không tạo bảng mới (giữ rule "no new Supabase tables" cho PhD hub).
- Edge function: không cần thêm function mới — Supervisor Finder không gọi AI, chỉ deep-link; Outreach tracker chỉ lưu local.
- Mobile-first: bảng/heatmap dùng `min-w-[600px]` + horizontal scroll wrapper.
- Đa ngữ qua `useLanguage().t()`, UTF-8 NFC, `<div>/<p>` cho text VI.
- DOMPurify cho mọi HTML AI render.
- Theme: tiếp tục dải violet→fuchsia cho PhD, emerald cho Study Abroad chung.
- Không sửa file auto-generated (`supabase/client.ts`, `types.ts`, `.env`).

## Order of execution

1. Part 1 (gỡ SAT khỏi nav/hub/search) — nhanh, ít rủi ro.
2. Part 2.1 → 2.7 PhD upgrades.
3. Part 3 các mục còn lại theo thứ tự Mentor → Motivation → Pre-Departure → Hub landing.

## Out of scope

- Không động backend/RLS, không đổi route, không xoá `SatRoadmap.tsx`.
- Không thêm gating / paywall.
- Không thay đổi branding/typography toàn cục.

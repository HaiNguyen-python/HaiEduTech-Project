## Mục tiêu

Biến `/study-abroad/phd` từ trang 3-tab + 1 cold email generator thành **PhD Strategy Hub toàn diện**: dữ liệu sâu hơn, nhiều công cụ AI hơn, lộ trình rõ ràng từ 0 → nhập học.

## Hiện trạng (file `src/pages/PhdGlobalPathway.tsx`, 235 dòng)

- Header + 2 thẻ download (Research Proposal & Cold Email .docx)
- 3 tab quốc gia: Europe / US / Australia — mỗi tab chỉ ~5 bullet tips
- 1 form AI Cold Email (gọi edge function `draft-cold-email`)
- Không có lộ trình thời gian, không có funding database, không có kiểm tra Research Proposal, không có danh sách giáo sư mẫu

## Hướng nâng cấp (6 khối mới)

### 1. Hero + Progress Tracker

- Hero gradient violet→fuchsia với chibi PhD scholar
- Thanh **"Hành trình PhD của bạn"**: 5 mốc (Define → Find Supervisor → Proposal → Apply → Visa), lưu `localStorage` checkbox để học viên đánh dấu tiến độ

### 2. Mở rộng Country Strategy (3 → 8 quốc gia / khu vực)

Thêm: **UK, Nhật Bản (MEXT), Hàn Quốc (GKS), Phần Lan, Singapore (A*STAR)**.
Mỗi quốc gia mở rộng dữ liệu:

- `strategy`, `tips` (đã có)
- `funding`: tên học bổng chính + mức stipend/tháng + deadline điển hình
- `topUnis`: 5 trường gợi ý
- `requirements`: bảng IELTS/GRE/GPA tối thiểu
- `timeline`: khi nào nên bắt đầu (T-18 / T-12 / T-6 / T-3 tháng)
- `redFlags`: 2-3 sai lầm phổ biến
Tách dữ liệu sang file mới `src/data/phdCountryGuides.ts`.

### 3. PhD Funding Database (mới)

Component `PhdFundingDatabase`:

- 25-30 học bổng PhD lớn (Marie Curie, DAAD, MEXT, GKS, Vingroup, VEF, Fulbright, Chevening PhD, Australia Awards, RTP, NTU PhD…)
- Lọc theo: quốc gia, ngành (STEM/SocSci/Business…), mức tài trợ (full/partial), deadline gần
- Card hiển thị: name, country flag, stipend/năm, deadline, link chính thức
- Tận dụng pattern `ScholarshipCard` đã có để đồng bộ thẩm mỹ

### 4. Research Proposal Builder (mới — AI)

Thay thế chỉ download .docx bằng wizard 7 bước (Title → Background → Research Question → Literature Gap → Methodology → Timeline → Expected Contribution):

- Mỗi bước: input + ví dụ chuẩn + nút **"AI gợi ý cho tôi"** gọi edge function `draft-research-proposal-section` (tạo mới)
- Bước cuối: tổng hợp full proposal, nút **Copy** + **Download .md**
- Vẫn giữ nút download .docx template gốc cho ai muốn xài offline

### 5. Supervisor Finder + Cold Email v2 (nâng cấp)

- Trường mới: **Tone** (formal / friendly / concise), **Length** (short 120 từ / standard 200 / detailed 280), **Follow-up variant** (sinh sẵn email follow-up sau 7 ngày)
- Sau khi sinh email: hiển thị **Email Health Score** (độ dài, có tham chiếu paper cụ thể chưa, có CTA chưa, có quantitative achievement chưa) — chấm 0-100 với gợi ý cải thiện
- Sửa edge function `draft-cold-email` để nhận `tone`, `length`, `followUp` và trả về `{ email, followUpEmail, healthScore, suggestions[] }`

### 6. PhD Timeline 12 tháng + FAQ

- Timeline ngang (horizontal scroll trên mobile): 12 tháng với task mỗi tháng
- Accordion FAQ 10 câu phổ biến (lương PhD đủ sống không, có nên bỏ việc đi PhD, PhD vs Master, etc.) — tận dụng `Accordion` của shadcn

## Cấu trúc file

```text
src/pages/PhdGlobalPathway.tsx          (refactor → orchestrator, ~250 dòng)
src/components/phd/
  PhdProgressTracker.tsx                (mới)
  PhdCountryGuides.tsx                  (mới — tách Tabs ra)
  PhdFundingDatabase.tsx                (mới)
  PhdProposalBuilder.tsx                (mới — wizard 7 bước)
  PhdColdEmailStudio.tsx                (mới — nâng cấp form hiện tại)
  PhdTimeline12Months.tsx               (mới)
  PhdFaq.tsx                            (mới)
src/data/
  phdCountryGuides.ts                   (mới — 8 quốc gia)
  phdFundingDatabase.ts                 (mới — 25-30 học bổng)
  phdFaq.ts                             (mới)
  phdTimeline.ts                        (mới)
supabase/functions/
  draft-research-proposal-section/index.ts   (mới — Lovable AI Gateway, gemini-2.5-flash)
  draft-cold-email/index.ts             (cập nhật: tone/length/followUp/healthScore)
```

## Kỹ thuật

- AI dùng **Perplexity API** 
- Tất cả progress (checkbox tracker, proposal draft từng bước) lưu `localStorage` theo guest mode (key `phd-hub-*`)
- Theme: tiếp tục gradient violet→fuchsia của trang hiện tại, kết hợp brand Royal Blue → Soft Emerald cho phần mới để đồng bộ HaiEduTech
- Mobile-first: tabs cuộn ngang khi có 8 quốc gia, bảng requirements có `min-w-[600px]` + horizontal scroll theo chuẩn dự án
- Đa ngôn ngữ Vi/En qua `useLanguage().t()` — KHÔNG hard-code text
- Không thêm gated content (theo Core memory: mọi nội dung mở hoàn toàn)

## Phạm vi không làm

- Không đổi route hiện tại `/study-abroad/phd`
- Không động vào các module Master/Bachelor/Scholarship khác
- Không thêm bảng Supabase mới (chỉ dùng edge function + localStorage)
## Mục tiêu

Hoàn thiện các phần còn dang dở của PhD Strategy Hub theo `.lovable/plan.md`. 4 khối đã có data + country/funding/timeline, còn lại là tracker, proposal builder, cold email v2, và FAQ.

## Phạm vi đợt này

### 1. PhD Journey Progress Tracker
- Component `src/components/phd/PhdProgressTracker.tsx`
- 5 mốc: Define Niche → Find Supervisor → Proposal → Apply → Visa
- Mỗi mốc là 1 checkbox + mô tả ngắn (Vi/En qua `useLanguage().t()`)
- Lưu `localStorage` key `phd-hub-progress` (mảng boolean 5 phần tử)
- Hiển thị thanh `Progress` % hoàn thành + badge số bước đã xong
- Đặt ngay dưới Hero của `PhdGlobalPathway.tsx`

### 2. Research Proposal Builder (AI wizard 7 bước)
- Component `src/components/phd/PhdProposalBuilder.tsx`
- 7 step: Title → Background → Research Question → Literature Gap → Methodology → Timeline → Expected Contribution
- Mỗi step: textarea + ví dụ mẫu + nút "AI gợi ý" gọi edge function `draft-research-proposal-section`
- Auto-save từng step vào `localStorage` key `phd-hub-proposal-draft`
- Step cuối: ghép full proposal, nút Copy + Download .md
- Vẫn giữ nút download .docx template gốc đang có

- Edge function mới `supabase/functions/draft-research-proposal-section/index.ts`
  - Dùng Perplexity API (`sonar`) — đồng bộ với pattern hiện tại của project
  - Input: `{ section, topic, context, language }`
  - Output: `{ suggestion: string }`
  - `verify_jwt = false` trong `supabase/config.toml`
  - System prompt chuyên cho từng section (background = literature review style, methodology = research design style, v.v.)

### 3. Cold Email Studio v2 (nâng cấp form hiện tại)
- Component mới `src/components/phd/PhdColdEmailStudio.tsx` thay block cold email inline trong `PhdGlobalPathway.tsx`
- Thêm trường: `tone` (formal/friendly/concise), `length` (120/200/280 từ), `followUp` (checkbox sinh thêm email follow-up sau 7 ngày)
- Sau khi sinh: hiển thị **Email Health Score** 0–100 với 4 tiêu chí:
  - Có tham chiếu paper cụ thể (regex tìm tên paper / năm / "your paper on …")
  - Có CTA rõ ràng (regex "are you accepting", "would you be open", "could we schedule")
  - Có quantitative achievement (regex chứa số + %/GPA/score)
  - Độ dài nằm trong khoảng yêu cầu
- Mỗi tiêu chí thiếu → gợi ý cải thiện cụ thể
- Hiển thị tab Email chính + tab Follow-up

- Cập nhật edge function `draft-cold-email/index.ts`:
  - Nhận thêm `tone`, `length`, `followUp`
  - Trả về `{ email, followUpEmail?: string }`
  - Health score tính client-side (đơn giản, không tốn AI call)

### 4. PhD FAQ
- Component `src/components/phd/PhdFaq.tsx` dùng `Accordion` của shadcn
- Data file `src/data/phdFaq.ts` với 10 câu Vi/En:
  - Lương PhD có đủ sống không?
  - Có nên bỏ việc đi PhD?
  - PhD vs Master khác nhau ra sao?
  - Cần GRE không?
  - Bao lâu thì xong PhD?
  - Funding self vs sponsored?
  - Đổi supervisor giữa chừng được không?
  - PhD xong làm gì ngoài academia?
  - Bao nhiêu tuổi là quá muộn?
  - Cần publication trước khi apply không?

## Tích hợp vào `src/pages/PhdGlobalPathway.tsx`

Thứ tự section sau refactor:
```text
Hero
└─ PhdProgressTracker        (mới)
PhdCountryGuides              (đã có)
PhdFundingDatabase            (đã có)
PhdTimeline12Months           (đã có)
PhdProposalBuilder            (mới)   ← thay block download .docx hiện tại, vẫn giữ nút download template
PhdColdEmailStudio            (mới)   ← thay form cold email inline
PhdFaq                        (mới)
```

## Kỹ thuật

- Đa ngôn ngữ Vi/En qua `useLanguage().t()`, không hard-code
- Tất cả progress + draft lưu `localStorage` (guest mode), key prefix `phd-hub-`
- Giữ gradient violet → fuchsia cho khối AI, brand Royal Blue → Soft Emerald cho khối data
- Mobile-first: bảng có `min-w-[600px]` + horizontal scroll; tabs cuộn ngang nếu tràn
- Edge function dùng Perplexity (`sonar`) đồng bộ pattern dự án, không tạo bảng Supabase mới
- DOMPurify nếu render HTML từ AI (proposal section)

## Phạm vi không làm

- Không đổi route `/study-abroad/phd`
- Không động vào module Master/Bachelor/Scholarship khác
- Không tạo bảng Supabase mới
- Không gated content

# Kế hoạch: Hoàn tất nâng cấp Study Abroad Portal

Các phần đã làm xong (Part 1, 2.1–2.7, một số ý của 3) được giữ nguyên. Kế hoạch này tập trung vào những hạng mục còn nợ trong `.lovable/plan.md` và bổ sung thêm vài upgrade chất lượng.

## A. PhD Pathway — phần còn lại

### A1. Research Proposal Builder v2
File: `src/components/phd/PhdProposalBuilder.tsx` + helper mới `src/lib/phdProposalScore.ts`.
- Thêm bước 8 **References**: gợi ý 5 từ khoá Google Scholar deep-link (mở tab mới).
- **Proposal Health Score 0–100** (regex client-side, hiển thị thanh tiến trình + checklist mini):
  - ≥1500 từ (25đ)
  - chứa cụm "research question" / "câu hỏi nghiên cứu" (15đ)
  - chứa "methodology" / "phương pháp" (15đ)
  - ≥3 citation kiểu `(Author, 2023)` (25đ)
  - không lặp câu mở >3 lần (20đ)
- Nút **Export .docx**: build HTML rồi `Blob` mime `application/msword`, song song với `.md` hiện có.

### A2. Country Guides — Cost & Living panel
File: `src/data/phdCountryGuides.ts` + render trong `PhdGlobalPathway.tsx`.
- Thêm field `costOfLiving: { rentUsd, foodUsd, transportUsd, totalUsd }` cho từng nước.
- Thêm `cultureNotesVi/En`: 3–4 gạch đầu dòng (work culture, weather, English-friendliness, food).
- Panel mới "💰 Chi phí & Văn hoá" trong tab country, dưới Funding.

## B. Mentor Hub

File: `src/data/mentorStories.ts` + `src/pages/MentorHub.tsx`.
- Bổ sung **6 alumni mới**: US-STEM (OPT), UK-Chevening Cambridge, Korea-KGSP, Singapore-SINGA, Germany-DAAD, Japan-MEXT. Mỗi card có `gpa`, `ielts`, `scholarshipAmount`.
- Thêm filter **scholarship type** (Government / University / Self-funded / Industry) + ô search theo tên/ngành/quốc gia.
- Badge mới trên card: "🎓 GPA · IELTS · $X/năm".

## C. Motivation Letter Master

- Data mới `src/data/motivationLetterSamples.ts`: 6 đoạn mở bài mẫu (Engineering, Public Health, Education, CS-AI, Business, Arts), mỗi đoạn có `whyItWorksVi/En`.
- Component **Inspiration Gallery** trong `src/pages/MotivationLetterMaster.tsx` (carousel/grid).
- Nút **Sanity Check** client-side trên textarea: đếm từ (target 500–650), cảnh báo cliché ("Since I was a child", "passionate about", "dream came true", "ever since I can remember"), gợi ý thay thế. Hiển thị inline panel màu amber.

## D. Pre-Departure Checklist

File: `src/data/preDepartureChecklist.ts` + `src/pages/PreDepartureChecklist.tsx`.
- Thêm 4 nước: **Germany, Australia, Korea, Japan** (mỗi nước 18–25 mục × 6 categories: Visa, Tài chính, Hành lý, Y tế, Học vụ, Cuộc sống).
- **Currency converter mini**: input VND/USD → hiển thị EUR/GBP/AUD/SGD/JPY/KRW theo tỉ giá tĩnh, kèm chú thích "cập nhật thủ công, chỉ tham khảo" + ngày cập nhật.
- Nút **Export PDF**: `window.print()` + stylesheet `@media print` ẩn nav/footer, in checklist sạch sẽ.

## E. Study Abroad Hub landing

File: `src/pages/StudyAbroadHub.tsx`.
- Khối "📅 Mốc deadline nóng" dưới hero: 6 học bổng deadline gần nhất từ `PHD_FUNDING` (dùng `phdFundingHelpers.ts` đã có).
- Strip "🤝 Đã hỗ trợ 200+ học viên" + 2 ảnh chibi avatar (asset có sẵn) + CTA "Đăng ký tư vấn 1-1".
- Lưới chính: giữ 3-col, 6 card đã có (sau khi bỏ SAT) cân đối.

## Technical notes
- 100% client-side, `localStorage` cho guest, không tạo bảng/edge function mới.
- Mobile-first: bảng & heatmap `min-w-[600px]` + horizontal scroll.
- Đa ngữ qua `useLanguage().t()`, UTF-8 NFC, `<div>/<p>` cho text VI.
- DOMPurify cho mọi HTML AI render.
- Theme: violet→fuchsia (PhD), emerald (Study Abroad chung).
- Không sửa file auto-generated, không đổi route, không đụng backend/RLS.

## Thứ tự thực thi
1. A1 Proposal v2 → A2 Cost panel (đóng nốt PhD).
2. B Mentor Hub.
3. C Motivation Letter.
4. D Pre-Departure.
5. E Hub landing (cuối, vì cần data deadline ổn định).

## Out of scope
- Không thêm gating/paywall, không backend mới, không đổi branding/typography toàn cục, không xoá file cũ.

# Rà soát Study Abroad

Đã đọc toàn bộ 6 trang trong cụm `/study-abroad/*` + Global Scholarship + 4 edge functions + Navbar. Sản phẩm đã khá hoàn chỉnh (hồ sơ vault, Motivation Letter Master + AI draft + sample library + Sanity Check, PhD Pathway, SAT Roadmap, Mentor Hub, Pre-Departure Checklist, AI Scholarship Advisor, Compare Schools, Match Score). Dưới đây là những điểm cần fix và nâng cấp.

---

## A. Lỗi / thiếu sót cần fix (ưu tiên)

1. **Navbar dropdown thiếu 3 mục** — `Navbar.tsx:242-249` chỉ liệt kê 5 link, thiếu **Mentor Hub**, **Pre-Departure Checklist**, **SAT Roadmap**. Học sinh phải vào `/study-abroad` mới biết các trang này tồn tại → giảm discoverability.
2. **StudyAbroadHub thiếu card SAT Roadmap** — `StudyAbroadHub.tsx` hiển thị 6 card nhưng không có SAT (mặc dù route `/study-abroad/sat` đã tồn tại). Cần thêm card SAT với gradient + icon riêng.
3. **MotivationLetterGuide.tsx có 2 chỗ render Drafts trùng** — dòng 298 render `<MotivationLetterDrafts>` lần 2 trong khi `StudentDocuments.tsx:305` cũng render component này → user có 2 nơi quản lý cùng 1 danh sách drafts dễ nhầm. Nên giữ 1 nguồn (Documents tab) và ở Motivation Letter chỉ giữ phần draft AI mới + link "Xem tất cả bản nháp".
4. **Form draft AI gọi API mà không yêu cầu đăng nhập** — `MotivationLetterGuide.tsx:103-127` cho phép guest spam edge function (tốn Perplexity $). Cần guard `if (!userId)` redirect login hoặc rate-limit IP.
5. **`draft-motivation-letter` dùng Perplexity `sonar` cho task không cần search realtime** — tốn chi phí. Nên chuyển sang Lovable AI Gateway (`google/gemini-2.5-flash` hoặc `openai/gpt-5-mini`) → tiết kiệm ~80% chi phí và phản hồi nhanh hơn. Giữ Perplexity cho `scholarship-advisor` (cần realtime info).
6. **PreDepartureChecklist không có deadline timeline view** — hiện chỉ có badge "~X ngày trước bay" trên từng task nhưng không có cảnh báo trực quan. Học sinh dễ bỏ sót task gần deadline.

## B. Đề xuất nâng cấp (giúp học sinh apply tốt hơn)

7. **Application Deadline Tracker** (mới) — bảng quản lý deadline apply cho từng trường: trường, chương trình, deadline, trạng thái (researching / drafting / submitted / accepted / rejected), liên kết với Documents + Motivation Letter draft. Hiện học sinh đang quản lý bằng tay. Tích hợp ngay trong `/study-abroad/documents` thành 1 tab thứ 4 "🎯 Trường đang apply".
8. **CV / Resume Builder cho du học** (mới trang `/study-abroad/cv`) — template Europass + US academic CV + UK CV, đổ data từ profile, AI gợi ý bullet point, export PDF. Hiện chỉ có Motivation Letter mà thiếu CV - đây là thành phần bắt buộc của mọi bộ hồ sơ.
9. **Recommendation Letter (LoR) Toolkit** (mới mục trong Motivation Letter Guide hoặc trang riêng) — template email mời giáo sư viết LoR (EN + VI), 3 mẫu LoR theo lĩnh vực, AI viết draft LoR để gửi giáo sư review. Đây là điểm thiếu lớn cùng với Motivation Letter.
10. **Interview Prep cho học bổng** (mới `/study-abroad/interview`) — 30 câu hỏi phỏng vấn học bổng phổ biến (Chevening, Fulbright, DAAD, Erasmus) + AI mock interview voice (tận dụng Web Speech API + Perplexity feedback giống IELTS Speaking đã có).
11. **University Shortlister AI** — nâng cấp Scholarship Advisor: nhập GPA + IELTS + ngành + budget → AI gợi ý 5 trường Reach / 5 Target / 5 Safety kèm deadline + tỷ lệ accept. Hiện Advisor chỉ trả về roadmap chung, chưa phân loại Reach/Target/Safety.
12. **Visa Document Checker AI** (trong Documents vault) — sau khi upload visa documents, AI scan PDF (Perplexity / Gemini vision) check thiếu thông tin gì so với requirement của embassy quốc gia đó.
13. **Cost Calculator** (nâng cấp `CurrencyConverter`) — calculator tổng chi phí du học: học phí + sinh hoạt + visa + bảo hiểm + vé máy bay theo từng nước, so sánh với học bổng nhận được → ra số tiền cần tự lo. Hiện chỉ có converter đơn thuần.
14. **Mentor Hub: Booking 1-1** — hiện chỉ có form gửi inquiry email. Nâng cấp: cho phép book lịch 30 phút với mentor (Calendly-style hoặc lưu vào `mentor_bookings` table, mentor xác nhận qua email).

## C. Engagement / gamification

15. **Study Abroad Journey Tracker** — dashboard hiển thị tổng quan: % hồ sơ chuẩn bị, số trường đang apply, số draft Motivation Letter, deadline gần nhất, badge "Application Master" khi hoàn thành 1 bộ hồ sơ đầy đủ.
16. **Email reminder cho deadline** — pg_cron daily check `application_deadlines`, gửi email qua Resend nếu deadline còn 7/3/1 ngày.

---

## Phân nhóm thực hiện

**Đợt 1 — Fix (1 turn)**: mục 1-5 (Navbar, Hub card, dedupe drafts, auth guard, switch AI gateway).

**Đợt 2 — Hồ sơ thiếu (2 turn)**: mục 8 (CV Builder) + mục 9 (LoR Toolkit) + mục 7 (Deadline Tracker).

**Đợt 3 — AI upgrade (1-2 turn)**: mục 11 (Shortlister) + mục 10 (Interview Prep) + mục 13 (Cost Calculator).

**Đợt 4 — Engagement (1 turn)**: mục 15 (Journey Dashboard) + mục 16 (Email reminder) + mục 6 (Timeline view checklist).

**Defer**: mục 12 (Visa AI scanner — cần OCR, phức tạp) + mục 14 (Mentor booking — cần workflow xác nhận).

---

## Câu hỏi cho bạn

Bạn muốn tôi:
- (A) Làm **Đợt 1** trước (fix gọn, 1 turn)?
- (B) Làm **Đợt 1 + Đợt 2** (fix + thêm CV Builder + LoR + Deadline Tracker) — 3 turn?
- (C) Làm **toàn bộ Đợt 1-4** trừ defer — 5-6 turn?
- Hoặc bạn muốn cherry-pick mục nào cụ thể?

Trong 16 mục trên, mục nào bạn thấy KHÔNG cần thiết để tôi loại khỏi roadmap?

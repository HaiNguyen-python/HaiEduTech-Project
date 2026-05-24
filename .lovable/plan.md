## Review hiện trạng `/english/sat`

Trang đang dồn quá nhiều thứ vào 1 màn cuộn:
1. Hero + 4 nút CTA (SAT Curriculum / Vocabulary / Exercises / Exams)
2. `SatLandingExtras` (Digital SAT format · Band roadmap · Pain points · FAQ)
3. Khi bấm **SAT Curriculum**: toggle hiện `SatExamFormat` (30‑week curriculum chi tiết) + grid 30 bài học bên dưới → kéo dài thêm ~3–4 màn cuộn nữa → đây là phần khiến trang "rối và dài".

Trong khi đó SAT Vocabulary / Exercises / Exams **đã** là trang riêng (`/sat-vocabulary`, `/sat-exercises`, `/sat-exams`). Chỉ có SAT Curriculum là vẫn inline. Cần đồng bộ.

## Điểm cần cải thiện

1. **Tách SAT Curriculum ra trang riêng** `/sat-curriculum` (đúng yêu cầu).
2. **4 nút CTA** đang dàn ngang chiều rộng, gradient mỗi nút mỗi màu → loè loẹt, không phân cấp. Đổi thành **grid 4 ô card đồng bộ** (icon + tiêu đề + sub-label), cùng tông tím‑chàm, để 4 entry-points trông như "4 cánh cửa" rõ ràng.
3. **Bỏ logic toggle** `showSatCurriculum` + `scrollIntoView('sat-lessons')`. Trang `/english/sat` chỉ còn: Hero → 4 cánh cửa → `SatLandingExtras` (format/roadmap/pain/FAQ). Ngắn, gọn, "landing-style".

## Kế hoạch triển khai

### 1. Tạo trang mới `src/pages/SatCurriculum.tsx`
- Header nhỏ: nút Back về `/english/sat`, tiêu đề "📚 Chương trình SAT chi tiết" + mô tả.
- Section A: `<SatExamFormat />` (giữ nguyên component — 30‑week roadmap).
- Section B: Grid bài học SAT (copy block lines 478‑538 của `EnglishCourse.tsx` — `allEnglishModules.filter(m => m.category === "sat")`, modules collapsible, mỗi lesson click → `/english/learn/:modId/:lessonId`).
- SEO: `<Helmet>` với title "Chương trình SAT — HaiEduTech", description, canonical `/sat-curriculum`.

### 2. Đăng ký route trong `src/App.tsx`
```tsx
<Route path="/sat-curriculum" element={<LazyRoute><SatCurriculum /></LazyRoute>} />
```
(thêm lazy import gần các route `sat-*` khác, dòng ~257).

### 3. Sửa `src/pages/EnglishCourse.tsx`
- Xoá state `showSatCurriculum` + `setShowSatCurriculum` (kiểm tra & xoá hết tham chiếu).
- Đổi nút **SAT Curriculum** từ toggle → `navigate("/sat-curriculum")`.
- Refactor khối 4 nút (lines 338–376) thành **grid card 4 ô**:
  - 2 cột (mobile) / 4 cột (md+), `gap-3`.
  - Mỗi card: icon trong vòng tròn nhẹ, tiêu đề (Curriculum / Vocabulary / Exercises / Exams), 1 dòng phụ ("30 tuần · Bluebook" · "1000+ từ" · "Drills theo dạng" · "10 mock test"), `border border-border bg-background/60 hover:border-primary hover:shadow-md transition`, cùng tông tím‑chàm xuyên suốt (chỉ icon hơi khác màu để phân biệt).
- Xoá block render `SatExamFormat` (line 387) và block 30‑week lessons (lines 478–538) khỏi `EnglishCourse.tsx` — chúng giờ sống ở `/sat-curriculum`.

### 4. Không thay đổi
- `SatLandingExtras.tsx`, `SatExamFormat.tsx`, các trang `/sat-vocabulary`, `/sat-exercises`, `/sat-exams` — giữ nguyên.

## Kết quả người dùng nhận được
- `/english/sat` trở thành landing ngắn (~1.5 màn): hero · 4 cánh cửa · format · roadmap · pain · FAQ.
- Mỗi mục SAT (Curriculum / Vocabulary / Exercises / Exams) là 1 trang độc lập, navigate sạch, dễ chia sẻ link, dễ SEO.
- Thị giác bớt rối: 4 nút gradient sặc sỡ → 4 card thống nhất.
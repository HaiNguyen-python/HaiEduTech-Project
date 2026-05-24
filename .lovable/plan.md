## Hiện trạng

Trang `/english/sat` hiện chỉ có:
- 1 hero ảnh nền xám (placeholder `ieltsImg` dùng chung, không liên quan SAT)
- 1 đoạn mô tả ngắn
- 4 nút CTA gradient (Curriculum / Vocabulary / Exercises / Exams)
- Footer

So với trang IELTS/TOEIC vốn có `ExamBreakdown`, dashboard số liệu, testimonial, breakdown skill — trang SAT đang trống tới ~70% màn hình. Đây là lý do "đơn điệu".

## Gợi ý các block nên thêm (xếp theo mức ưu tiên)

### A · Bắt buộc nâng cấp (giá trị thị giác cao, tốn ít công)

1. **Hero ảnh riêng cho SAT** — thay `ieltsImg` bằng ảnh mới (sinh viên Mỹ / khuôn viên Ivy League / bảng điểm 1500+). Đặt overlay gradient tím-indigo (đúng tone `color: purple` đã khai báo). Thêm badge "Digital SAT 2026" + chip điểm mục tiêu "1100 → 1500+".

2. **Dải Trust Stats (4 ô)** — ngay dưới hero, dạng glass-card grid 4 cột:
   - Học viên đạt 1400+: **47 em**
   - Điểm trung bình tăng: **+280 điểm**
   - Trường ĐH Mỹ đã đỗ: **18 trường**
   - Giờ học cá nhân hóa: **120h/lộ trình**

3. **"Digital SAT 2026 ở mức nào?"** — bảng phá vỡ format SAT mới (Module 1 → Module 2 adaptive, Reading & Writing 64 phút, Math 70 phút, Desmos tích hợp). Trình bày dạng 2 card lớn (R&W và Math) với icon, thời lượng, số câu, dạng câu hỏi đặc trưng.

4. **Thang điểm Band Score Roadmap** — thanh ngang chia 4 cấp 1000-1199 / 1200-1349 / 1350-1499 / 1500-1600, mỗi cấp gắn icon + 1 dòng "Bạn cần làm gì để leo lên cấp tiếp theo". Thiết kế giống `IeltsExamBreakdown` đã có sẵn để tái sử dụng pattern.

### B · Nên có (tăng độ chuyên nghiệp và chuyển đổi)

5. **"Tại sao SAT khó với học sinh Việt"** — 3 thẻ pain-points (Reading dài & academic / Math wording bẫy / Time pressure 1 phút/câu), mỗi thẻ kèm 1 "Cách thầy Hải giải quyết".

6. **Mini Diagnostic CTA** — 1 widget rủ học sinh làm 5 câu test nhanh để ước lượng điểm hiện tại, link sang `/sat-exercises`. Tận dụng `AssessmentTool` đã có sẵn cho ngôn ngữ Anh, chỉ cần `preSelectedSubject="english"` + filter SAT.

7. **Lộ trình 10 tuần dạng timeline** — chuyển mảng `curriculum` 5 dòng hiện tại thành timeline dọc với gradient connector, icon mỗi giai đoạn (BookOpen / Target / Clock), thay vì chỉ liệt kê text khô như IELTS roadmap đã làm tốt.

8. **Testimonials carousel có ảnh + điểm số** — hiện đã có 2 testimonial dạng text. Nâng lên dạng card có avatar (initials gradient), điểm trước/sau (1100 → 1420), trường đã đỗ. Có thể marquee tự cuộn.

### C · Nice-to-have (làm trang "wow")

9. **Common SAT Words of the Day** (tái dùng `WordOfTheDay` đã có, lọc theo `sat-vocabulary`).

10. **Lộ trình du học Mỹ liên kết chéo** — banner nối sang `/study-abroad/sat` và `/global-scholarship` để khép vòng "SAT → học bổng → nộp ĐH Mỹ".

11. **FAQ accordion** — 6-8 câu (Digital SAT khác SAT cũ thế nào, có cho Desmos không, học bao lâu, học phí, đỗ trường top cần bao nhiêu, mất bao lâu lên 1500, etc).

12. **Sticky bottom CTA** chỉ hiện sau khi cuộn 50% — "Đăng ký tư vấn lộ trình SAT" gắn link `/contact`.

## Đề xuất scope build

Đề xuất build **mục A đầy đủ (1-4) + mục B (5, 7, 8) + FAQ (11)** trong một lần — đủ đậm để trang chuyên nghiệp, không sa đà. Mục 9-10-12 để vòng sau nếu muốn.

## Chi tiết kỹ thuật (cho người dev)

- File chính cần sửa: `src/pages/EnglishCourse.tsx` (block `courseId === "sat"`).
- Tách 2 component mới: `src/components/sat/SatDigitalFormat.tsx` (mục 3) và `src/components/sat/SatBandRoadmap.tsx` (mục 4) để tránh phình EnglishCourse.tsx.
- Hero image: dùng `imagegen` model `standard` — prompt "professional Vietnamese student studying at desk with SAT prep books, laptop showing Digital SAT Bluebook, soft purple/indigo lighting, study abroad mood", 1920×768.
- Tone màu: giữ purple-indigo gradient (đã khai báo `color: "purple"` trong `courseData.sat`), không phá brand Royal Blue → Soft Emerald.
- Stats có thể hardcode trong `courseData.sat.stats` thay vì query DB (chưa có bảng SAT enrollment).
- Tái sử dụng pattern từ `IeltsExamBreakdown.tsx` cho band score roadmap.

## Trước khi build

Vui lòng xác nhận:
- Có duyệt scope A+B+FAQ như trên không, hay muốn thu hẹp/mở rộng?
- Số liệu Trust Stats (mục 2) — dùng con số gợi ý ở trên hay anh muốn cung cấp số thật?
- Có muốn mình tạo ảnh hero SAT mới (mục 1) không, hay anh tự upload?
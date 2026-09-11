# Thu gọn menu: gộp bài kiểm tra xếp lớp vào TOEIC, PTE, SAT

## Mục tiêu
Menu thả xuống "Other English Exams" hiện có 6 dòng cho 3 kỳ thi (mỗi kỳ thi 1 dòng khóa học + 1 dòng bài kiểm tra xếp lớp). Sẽ giảm còn 3 dòng: TOEIC, PTE Academic, SAT. Bài kiểm tra xếp lớp chuyển vào ngay trong trang của từng kỳ thi.

## Sẽ làm

### 1. Menu (src/components/Navbar.tsx)
- Bỏ 3 dòng: TOEIC Placement Test, PTE Placement Test, SAT Placement Test.
- Giữ nguyên TOEIC, PTE Academic, SAT và nhóm kỳ thi THPT bên dưới.
- Menu điện thoại dùng cùng dữ liệu nên tự gọn theo.

### 2. Trang từng kỳ thi
Thêm một nút nổi bật "Placement Test" / "Bài kiểm tra xếp lớp" ở đầu trang, ngay cạnh phần giới thiệu:
- Trang TOEIC -> `/placement-test?subject=toeic`
- Trang PTE -> `/placement-test?subject=pte`
- Trang SAT -> `/placement-test?subject=sat`

Nút dùng đúng màu thương hiệu của từng trang, có nhãn hai ngôn ngữ, kèm mô tả ngắn "24 câu - biết trình độ và lớp phù hợp".

## Giữ nguyên
- Toàn bộ đường dẫn, dữ liệu, tiến độ học và phần bài kiểm tra xếp lớp hiện có.
- Các nhóm menu khác và dòng "Placement Test & Personalization" của tiếng Anh tổng quát.

## Chi tiết kỹ thuật
- `src/components/Navbar.tsx`: xóa 3 phần tử trong `children` của nhóm `en-other-exams`.
- Trang TOEIC: `src/pages/ToeicHub.tsx`; trang PTE: `src/pages/PteHub.tsx`; trang SAT hiển thị qua `src/pages/EnglishCourse.tsx` với `courseId = "sat"` - thêm CTA ở khối tiêu đề tương ứng.
- Kiểm tra: `bunx tsgo --noEmit`, `node scripts/audit_hover_contrast.mjs`, và mở thử menu English cùng 3 trang trên desktop/điện thoại.

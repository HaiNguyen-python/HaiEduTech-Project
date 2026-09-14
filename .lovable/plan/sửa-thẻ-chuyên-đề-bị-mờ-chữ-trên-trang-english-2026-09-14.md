# Sửa thẻ chuyên đề bị mờ chữ trên trang English

## Vấn đề
Trong mục "Hệ thống bài học tương tác" (trang English, các nhóm IELTS / TOEIC / Cambridge / THPT / Grammar / SAT), mỗi thẻ chuyên đề lấy màu nền từ trường `color` trong dữ liệu. Dữ liệu hiện lộn xộn:

- Khoảng 60 chuyên đề dùng gradient **đậm 100%** (ví dụ `from-blue-500 to-blue-600`, `from-emerald-500 to-teal-600`) - chữ mô tả xám nhạt và dòng "X lessons" màu xanh bị chìm vào nền, rất khó đọc.
- 10 chuyên đề dùng giá trị **không hợp lệ** (`indigo`, `purple`, `teal`...) - không phải lớp gradient nên thẻ trắng trơn, mất màu phân loại.
- Chỉ một số ít dùng đúng dạng nhạt `/20` nên nhìn rõ chữ.

Vì chữ trên thẻ luôn là màu tối (tiêu đề đậm, mô tả xám, link xanh dương), nền thẻ cần nhạt và đồng nhất.

## Cách sửa
1. Chuẩn hóa toàn bộ giá trị `color` trong `src/data/languageCurriculum/*.ts` bằng script một lần:
   - Gradient đậm -> cùng cặp màu nhưng giảm còn độ trong suốt `/15` (ví dụ `from-blue-500/15 to-blue-600/15`).
   - Giá trị không hợp lệ (`indigo`, `teal`...) -> thay bằng gradient nhạt tương ứng (ví dụ `from-indigo-500/15 to-violet-500/15`).
   - Giá trị đã nhạt sẵn (`/20`) giữ nguyên.
   - Không đổi id, tiêu đề, bài học hay bất kỳ dữ liệu nào khác.
2. Tăng độ đọc được ở khung hiển thị (`src/pages/English.tsx`):
   - Thẻ thêm nền trắng mỏng phía dưới lớp màu (hoặc viền nhẹ) để chữ luôn nổi, kể cả khi sau này dữ liệu mới lỡ dùng màu đậm.
   - Dòng "X lessons" giữ màu nhấn nhưng tăng độ đậm (`font-semibold`).
3. Kiểm tra các trang khác dùng chung dữ liệu (`EnglishCourse`, `SatCurriculum`, `SatExercises`, `SatDailyWarmup`, `Chinese`, trang chi tiết bài học) vẫn hiển thị đúng sau khi đổi màu - chỉ xác nhận, chỉ chỉnh nếu có chỗ nào giả định nền đậm (ví dụ chữ trắng trên nền gradient).

## Kiểm chứng
- Chạy typecheck.
- Mở trang English trên trình duyệt (máy tính + điện thoại), bung nhóm TOEIC và Cambridge: mọi thẻ đọc rõ tiêu đề, mô tả và số bài học; không thẻ nào nền đậm hoặc trắng trơn.
- Mở thử một trang chi tiết bài học và hub SAT để chắc không vỡ màu.

## Không thay đổi
- Không đổi route, id chuyên đề/bài học, nội dung bài học, tiến độ đã lưu, hay hợp đồng dữ liệu backend.

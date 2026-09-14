# Xóa việc tạo Deep Dive tự động mỗi đêm

## Mục tiêu
- Bỏ việc quét và tạo bản giảng sâu tự động mỗi đêm cho Programming, vì toàn bộ 309 bài đã có sẵn.
- Giữ nguyên công cụ thủ công trong trang quản trị: khi thêm bài mới, bạn bấm nút để tạo bản giảng sâu cho các bài còn thiếu.
- Trải nghiệm học viên không đổi: bài nào cũng mở ra thấy bản Deep Dive tiếng Anh ngay.

## Các bước thực hiện

### 1. Gỡ lịch chạy đêm
- Hủy cron job `warm-programming-deep-dives-nightly` trong cơ sở dữ liệu.

### 2. Dọn phần chỉ phục vụ việc chạy đêm
- Xóa edge function `warm-programming-deep-dives` (chỉ cron gọi nó).
- Xóa bảng `programming_lesson_index` (chỉ phục vụ cron), gồm cả policy/grants đi kèm.

### 3. Gọn lại công cụ quản trị
- Trong thẻ "Bản giảng sâu / Deep-Dives" của trang quản trị: bỏ nút "Đồng bộ danh sách cho việc chạy đêm" và câu giải thích về việc chạy đêm; giữ các nút "Tạo sẵn các bài còn thiếu", "Dừng", "Làm mới số liệu" và bộ đếm Tổng/Đã có/Còn thiếu.

### 4. Kiểm tra
- Xác nhận cron đã gỡ, bảng index đã xóa, `programming_theory_cache` vẫn đủ 309 bản.
- Mở trang quản trị tab Deep-Dives: các nút còn lại hoạt động, không còn nhắc tới việc chạy đêm.
- Mở thử 1-2 bài Programming: vẫn hiện bản Deep Dive ngay.

## Chi tiết kỹ thuật
- SQL: `select cron.unschedule('warm-programming-deep-dives-nightly');` và `drop table public.programming_lesson_index;`
- Xóa thư mục `supabase/functions/warm-programming-deep-dives`.
- Sửa `src/components/admin/ProgrammingDeepDiveWarmer.tsx`: bỏ `syncIndex`, nút Sync, đoạn mô tả cron; bỏ import không còn dùng.
- Không động vào `enhance-programming-theory`, `programming_theory_cache`, trang bài học, route, tiến độ hay XP.

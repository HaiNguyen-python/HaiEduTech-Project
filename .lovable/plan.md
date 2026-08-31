# Kết quả placement test trong trang admin của giáo viên

Đã kiểm tra: kết quả **có** được lưu và **có** hiện trong trang admin (`/admin/placement-test-results`). Bài làm lúc 07:46 hôm nay của Nguyen Hai đã có trong bảng kết quả (điểm 0/100, A1, trạng thái "pending"), và quyền truy cập cho giáo viên/admin đã đúng.

Nhưng có 3 điểm chưa hoàn thiện, xác nhận qua dữ liệu thật:

1. Phần phân tích mới của bài test (lớp đề xuất, độ tin cậy, tỉ lệ đúng theo từng bậc A1-C1, điểm yếu, thoát sớm) đã được lưu cùng bài làm nhưng trang admin **không hiển thị** - giáo viên chỉ thấy 4 điểm kỹ năng và CEFR.
2. **Bản ghi âm speaking không phát được**: file lưu trong kho riêng tư, trang admin lại dùng đường dẫn thô làm nguồn phát nên trình phát sẽ lỗi.
3. Không có bộ lọc/nhóm theo lớp đề xuất, nên xếp lớp cho nhiều em một lúc vẫn phải xem từng em.

## Việc sẽ làm

1. Thêm khối "Phân tích xếp lớp" vào trang admin cho học sinh đang chọn:
   - Lớp đề xuất + độ tin cậy (cao/vừa/thấp), bậc cao nhất đạt vững, ghi chú (kể cả trường hợp dừng sớm).
   - Bảng tỉ lệ đúng theo từng bậc A1-C1, đánh dấu rõ bậc "chưa làm tới".
   - 2-3 điểm yếu cần cải thiện.
   - Với bài cũ chưa có dữ liệu này thì hiện dòng "bài làm trước bản cập nhật".
2. Sửa phát audio speaking: tạo link tạm thời có hạn cho từng bản ghi trước khi phát, kèm trạng thái đang tải/lỗi và nút tải file về.
3. Nút "Dùng lớp đề xuất" ngay cạnh ô chọn lớp để duyệt nhanh, và ô chọn lớp lấy đúng danh sách lớp của hệ thống xếp lớp.
4. Danh sách bài làm: thêm bộ lọc theo trạng thái (chờ duyệt / đã duyệt) và nhóm theo lớp đề xuất, hiện huy hiệu CEFR + lớp đề xuất trên mỗi dòng.
5. Nút làm mới tự động: tự tải lại khi có bài mới nộp, để giáo viên không phải bấm Refresh.

## Chi tiết kỹ thuật

- `src/pages/AdminPlacementResults.tsx`: đọc `answers.__placement` (đã có sẵn: `recommended_class`, `confidence`, `highest_secure_band`, `weakest_areas`, `notes`, `bands`, `early_exit_band`); dùng `supabase.storage.from("placement-audio").createSignedUrl(path, 3600)` cho từng bản ghi; thêm filter/group ở cột danh sách; đăng ký realtime INSERT trên `placement_test_results`.
- Danh sách lớp lấy từ `src/lib/placement/placementModel.ts` để trùng với lớp đề xuất.
- Không cần đổi cơ sở dữ liệu: bảng, quyền và luồng lưu đã hoạt động đúng.

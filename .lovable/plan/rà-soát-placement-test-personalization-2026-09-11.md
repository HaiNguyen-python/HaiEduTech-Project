# Rà soát Placement Test & Personalization

## Hiện trạng đã kiểm chứng

Bài kiểm tra đầu vào tại `/placement-test` phục vụ 7 mảng: English/IELTS (40 câu), Chinese, Vietnamese, Finnish, Japanese, Swedish (mỗi bộ 24 câu, đủ 4 kỹ năng, bậc A1-C1) và Programming (24 câu logic/Python/SQL/AI). Cách tính điểm có trọng số theo bậc, có cơ chế dừng sớm khi học viên chưa đạt 40% một bậc, có "bậc chắc chắn nhất" để không đẩy học viên lên quá năng lực. Kết quả được lưu, sinh lộ trình 4 tuần và tự tạo mục tiêu trong "My Learning Path". Giáo viên xem kết quả tại `/admin/placement-test-results`, có biểu đồ 4 kỹ năng, nghe lại bản ghi âm, đọc bài viết và duyệt lớp.

Đó là phần chạy tốt. Những điểm sau đã được xác nhận là lỗi hoặc thiếu:

1. **Duyệt lớp không thực sự xếp lớp.** Nút duyệt chỉ ghi một dòng chữ tự do vào kết quả; học viên không được thêm vào lớp thật trong phần Quản lý lớp. Dữ liệu thực tế: 6 lượt thi, tất cả đang ở trạng thái "chờ", chưa lượt nào có lớp.
2. **Danh sách lớp trong ô chọn của giáo viên bị lệch** với danh sách lớp mà hệ thống gợi ý: thiếu hoàn toàn lớp tiếng Nhật và tiếng Thụy Điển, và không đọc từ danh sách lớp thật đang mở.
3. **Mảng Programming bị gợi ý sai lớp**: không có bậc lớp riêng nên rơi về tên lớp tiếng Anh/IELTS.
4. **Lộ trình cá nhân của Programming bị rỗng**: bậc trình độ trả về giá trị trống vì kết quả là Novice/Intermediate/Advanced chứ không phải bậc CEFR.
5. **Trang duyệt kết quả luôn dùng câu hỏi của bộ tiếng Anh** để hiển thị đề bài phần nói và phần viết, nên khi mở kết quả của tiếng Trung/Nhật/Thụy Điển, giáo viên thấy sai câu hỏi.
6. **Phần nói luôn được 0,5 điểm cố định, phần viết chỉ tính theo số từ.** Hệ thống đã có sẵn các hàm chấm nói và chấm viết bằng AI cho các môn khác, nhưng bài kiểm tra đầu vào chưa dùng, nên bậc trình độ có thể lệch và giáo viên không có cách ghi điểm lại sau khi nghe.
7. **Bài kiểm tra tiếng Việt cho người nước ngoài (VFF) không lưu gì cả** - không có kết quả, không lịch sử, giáo viên không thấy.
8. **TOEIC, SAT, PTE chưa có bài kiểm tra đầu vào riêng**, học viên phải dùng bộ tiếng Anh chung.
9. **Khách chưa đăng nhập làm hết bài rồi mất sạch câu trả lời** khi bấm gửi.
10. **Học viên không thấy lớp mà giáo viên đã duyệt**, cũng không có trang lịch sử các lần thi.

## Sẽ làm

### A. Xếp lớp theo năng lực thành luồng thật (ưu tiên cao)
- Ô chọn lớp của giáo viên đọc danh sách lớp thật đang mở, cộng thêm bậc lớp gợi ý theo môn (bổ sung tiếng Nhật, tiếng Thụy Điển, Programming).
- Khi duyệt: ngoài lưu lớp, hệ thống thêm học viên vào lớp thật, báo rõ nếu thêm không thành công, không cho trùng thành viên.
- Thêm nút tạo nhanh lớp theo bậc gợi ý khi lớp đó chưa tồn tại.
- Thêm trạng thái "cần phỏng vấn thêm" bên cạnh chờ/đã duyệt, kèm ghi chú của giáo viên.

### B. Chấm điểm chính xác hơn
- Phần viết và phần nói của bài kiểm tra đầu vào được chấm bằng AI khi gửi bài, dùng lại hạ tầng chấm đã có; nếu AI lỗi thì giữ cách tính hiện tại làm phương án dự phòng.
- Giáo viên có thể sửa điểm nói/viết trên trang duyệt; sửa xong hệ thống tính lại tổng điểm, bậc trình độ và lớp gợi ý.
- Sửa bậc lớp riêng cho Programming và sửa lỗi lộ trình rỗng của Programming.
- Trang duyệt hiển thị đúng câu hỏi của môn tương ứng.

### C. Học viên thấy kết quả và lộ trình rõ ràng
- Trang kết quả và Dashboard hiển thị lớp giáo viên đã duyệt cùng ghi chú.
- Thêm mục lịch sử các lần thi theo môn: bậc, điểm 4 kỹ năng, ngày thi, so sánh với lần trước.
- Khách chưa đăng nhập: lưu tạm câu trả lời trên máy, sau khi đăng nhập quay lại gửi được ngay.

### D. Bổ sung bài kiểm tra đầu vào còn thiếu
- Bài kiểm tra tiếng Việt cho người nước ngoài lưu kết quả như các môn khác và hiện trong trang duyệt của giáo viên.
- Thêm bộ đề đầu vào riêng cho TOEIC, SAT, PTE: mỗi bộ 24 câu, phân bậc theo thang điểm của từng kỳ thi, kèm lớp gợi ý tương ứng.

## Chi tiết kỹ thuật

- Thêm cột cho `placement_test_results`: `subject`, `assigned_class_id` (khóa ngoại tới `classes`), `teacher_notes`, `graded_by`, `graded_at`; điền `subject` cho các dòng cũ từ `answers->>'__subject'`; giữ nguyên `assigned_class` để không phá dữ liệu hiện có; cập nhật RLS/GRANT theo chuẩn hiện tại.
- `AdminPlacementResults.tsx`: đọc `classes` (phân trang), gộp với `CLASS_BY_SUBJECT`, ghi `class_members` khi duyệt, cho phép sửa điểm kỹ năng và gọi lại `buildOutcome`, hiển thị bank câu hỏi theo `subject` qua `getPlacementBank`.
- `placementModel.ts`: thêm `programming` vào `CLASS_BY_SUBJECT`; `RECOMMENDED_CLASSES` sinh từ `CLASS_BY_SUBJECT`.
- `placementBridge.ts`: `ladderLevelFrom` nhận cả bậc Novice/Intermediate/Advanced, không bao giờ trả về `undefined`.
- `PlacementTest.tsx`: gọi hàm chấm viết/nói khi gửi bài (có fallback), lưu nháp cho khách trong localStorage, ghi `subject` vào cột mới.
- VFF: ghi kết quả vào `placement_test_results` với `subject = "vietnamese-vff"` và nối vào `learning_paths`.
- Bộ đề mới cho TOEIC/SAT/PTE đặt trong `src/data/placementBanks*`, thêm vào `getPlacementBank`/`parseSubject`/`SUBJECT_META`/`BANK_SUBJECTS`, kèm liên kết trong menu từng môn.
- Kiểm tra: `bunx tsgo --noEmit`, audit hover, và chạy thử trên desktop/mobile các luồng thi, gửi bài, duyệt lớp, kiểm tra học viên đã vào lớp thật.

## Không làm trong lần này
- Không đổi route, không đổi ID câu hỏi hiện có, không xóa dữ liệu kết quả cũ.
- Không tự động xếp lớp mà không có giáo viên duyệt.

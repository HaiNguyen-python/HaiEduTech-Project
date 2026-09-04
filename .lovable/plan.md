# Placement Test & Personalization - rà soát và nâng cấp

## 1. Đổi tên trong menu (tất cả các môn)

Mỗi môn có một mục duy nhất tên "Placement Test & Personalization" (VI: "Kiểm tra trình độ & Lộ trình cá nhân"), trỏ tới bài kiểm tra của môn đó.

Hiện menu chỉ có 5 mục (English, Chinese, Vietnamese, Finnish, Programming) với tên khác nhau, và thiếu hoàn toàn Japanese, Swedish dù hai bài kiểm tra đã có. Sẽ:
- Đặt cùng một nhãn cho cả 7 môn.
- Thêm mục cho Japanese và Swedish.
- Ô "Kiểm tra trình độ" ở cuối mỗi trang môn cũng dùng đúng tên này.

## 2. Nội dung bài kiểm tra: những điểm cần sửa

Đã kiểm tra từng bộ đề:
- Chinese, Vietnamese, Finnish, Japanese, Swedish: 18 câu, đủ 4 kỹ năng (nghe 4, đọc 6, viết 4, nói 4), nhưng chỉ tới bậc B2 và chỉ 3-4 câu mỗi bậc, nên kết quả ở bậc cao còn thiếu chắc chắn.
- Programming: 18 câu nhưng **toàn bộ là dạng đọc**, không có kỹ năng nào khác, nên biểu đồ 4 kỹ năng và phần "điểm yếu" của môn này gần như vô nghĩa.
- Lớp gợi ý hiện lấy từ một bảng chỉ dành cho tiếng Anh, nên học sinh làm bài tiếng Trung/Nhật/Thụy Điển vẫn thấy tên lớp tiếng Anh.

Sẽ làm:
- Mỗi bộ đề ngôn ngữ tăng lên 24 câu, thêm bậc C1 và thêm câu cho B1/B2 (mỗi bậc tối thiểu 4 câu) để phân loại bậc cao đáng tin hơn.
- Đổi Programming sang 4 nhóm năng lực riêng (đọc hiểu code, gỡ lỗi/logic, dữ liệu & SQL, AI/khái niệm) thay vì 4 kỹ năng ngôn ngữ, và thêm câu viết code ngắn.
- Bảng lớp gợi ý theo từng môn, dùng đúng thang của môn (CEFR, HSK, JLPT, YKI, cấp lập trình) và tên lớp thật của HaiEduTech.
- Rà lại từng câu về chính tả, dấu, tính duy nhất của đáp án, và độ tự nhiên của câu (đặc biệt câu cloze tiếng Nhật đang hơi cứng).
- Thêm script kiểm tra tự động cho toàn bộ bộ đề: trùng id, số câu mỗi bậc/kỹ năng, đáp án nằm trong khoảng hợp lệ, câu scramble ghép lại đúng, không trùng lựa chọn.

## 3. Nâng cấp phần cá nhân hóa sau khi làm bài

Màn hình kết quả hiện đã có trình độ, điểm kỹ năng, lớp gợi ý, điểm yếu, kế hoạch tuần. Bổ sung:
- **So sánh với lần trước**: nếu học sinh đã từng làm, hiện mức tăng/giảm từng kỹ năng và trình độ cũ -> mới.
- **Dự đoán thời điểm đạt mục tiêu** ngay trên màn hình kết quả (dựa số giờ/tuần đã chọn), cập nhật khi kéo thanh giờ.
- **Chọn ngày mục tiêu và ngày rảnh** ngay tại đây thay vì phải sang trang khác.
- **Kế hoạch 4 tuần đầu** (không chỉ tuần này), mỗi tuần có trọng tâm theo kỹ năng yếu nhất.
- **Nhận xét của AI** riêng cho lần kiểm tra: giải thích trình độ, nên học gì trước, ngắn 4-6 câu, song ngữ; luôn có bản viết theo mẫu khi AI lỗi nên số liệu không phụ thuộc AI.
- **Xuất PDF kết quả + lộ trình** để phụ huynh/giáo viên xem.
- **Nhắc kiểm tra lại**: sau 8 tuần, thẻ môn trong "Lộ trình của tôi" nhắc làm lại bài kiểm tra và giữ lịch sử để vẽ biểu đồ tiến bộ.
- Nút "Học ngay" trên kết quả mở đúng việc đầu tiên của tuần và tick xong tự cập nhật tiến độ.

## Chi tiết kỹ thuật

- `src/components/Navbar.tsx`: gộp nhãn placement thành một hằng dùng chung, thêm entry `subject=japanese` và `subject=swedish`; `PlacementCta.tsx` dùng cùng nhãn.
- `src/data/placementBanks.ts`: mở rộng 5 bộ đề ngôn ngữ lên 24 câu (thêm C1), tái cấu trúc bank programming; giữ nguyên schema của `placementTest.ts` nên `QuestionRenderer` không đổi.
- `src/lib/placement/placementModel.ts`: `recommendedClass` nhận thêm tham số môn; thêm `CLASS_BY_SUBJECT`; giữ `BAND_WEIGHT`, `BLOCK_PASS_RATE`, early-exit như hiện tại.
- `src/lib/personalization/placementBridge.ts`: thêm `deltaVsPrevious`, `fourWeekOutline`; test bổ sung trong `src/test/placementBridge.test.ts`.
- `src/components/personalization/PlacementPathResult.tsx`: thêm khối so sánh, dự đoán, chọn ngày mục tiêu/ngày rảnh, kế hoạch 4 tuần, nhận xét AI, nút xuất PDF (dùng lại `pathReport.ts`).
- `src/hooks/useLearningPath.ts`: `seedFromPlacement` nhận thêm `hoursPerWeek`, `targetDate`, `availableDays`; xử lý riêng thang lập trình thay vì ép về CEFR.
- Edge function `learning-path-coach`: thêm chế độ "placement" cho nhận xét sau bài kiểm tra; không tạo function mới.
- Không migration mới: vẫn dùng `placement_test_results`, `learning_paths`, `learning_path_steps`.
- Script mới `scripts/audit_placement_banks.ts` chạy cùng typecheck.

## Thứ tự triển khai

1. Đổi tên menu + thêm Japanese/Swedish.
2. Script kiểm tra bộ đề, sửa lỗi nội dung hiện có.
3. Mở rộng 5 bộ đề ngôn ngữ + làm lại bank programming.
4. Lớp gợi ý theo môn.
5. Nâng cấp màn hình kết quả (so sánh, dự đoán, 4 tuần, mục tiêu, PDF).
6. Nhận xét AI cho lần kiểm tra + fallback.
7. Nhắc kiểm tra lại và biểu đồ lịch sử ở "Lộ trình của tôi".
8. Kiểm tra thật trên preview cho cả 7 môn, khách và tài khoản đã đăng nhập.

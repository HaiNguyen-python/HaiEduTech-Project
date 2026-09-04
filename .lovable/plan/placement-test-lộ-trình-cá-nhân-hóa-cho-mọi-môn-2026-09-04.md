# Placement test -> lộ trình cá nhân hóa cho mọi môn

Mục tiêu: học sinh làm placement test của môn nào thì ngay sau khi bấm nộp bài sẽ thấy trình độ hiện tại + lộ trình học cụ thể của môn đó, và lộ trình này được lưu vào "Lộ trình của tôi".

## 1. Đủ 6 môn có placement test

Hiện có bank cho English, Chinese, Vietnamese, Finnish, Programming. Thiếu Japanese và Swedish.

- Thêm bank Japanese (18 câu, N5 -> N3, có nghe/đọc/viết/nói, kana + kanji cơ bản) và Swedish (18 câu, A1 -> B2).
- Thêm hai môn này vào danh sách môn của trang placement (tiêu đề, phụ đề, giọng đọc ja-JP / sv-SE) và vào khai báo môn học của phần cá nhân hóa để chúng có placement như các môn khác.

## 2. Trang kết quả mới: trình độ + lộ trình

Thay màn hình kết quả hiện tại (chỉ có điểm, lớp gợi ý, 2 nút) bằng một màn hình đầy đủ:

- Trình độ hiện tại theo thang của môn (CEFR A1-C1, HSK 1-6, JLPT N5-N1, YKI A1-B2, IELTS band tương ứng, cấp lập trình).
- Điểm tổng, điểm từng kỹ năng, và mức độ tin cậy của kết quả.
- Lớp học gợi ý + ghi chú của giáo viên (giữ như hiện tại).
- 3 điểm yếu cần cải thiện, mỗi điểm kèm liên kết luyện tập tương ứng của môn.
- Lộ trình đề xuất: mục tiêu kế tiếp trên thang trình độ, thời lượng học mỗi tuần mặc định (5 giờ, có thể đổi bằng thanh trượt ngay tại đây) và danh sách 5-8 việc cần làm tuần này kèm liên kết.
- Nút "Xem lộ trình đầy đủ" -> `/my-path`, "Điều chỉnh mục tiêu" -> `/my-path/start`, và "Học ngay" nhảy vào bước đầu tiên.

## 3. Tự tạo lộ trình sau khi làm bài

- Khi nộp bài xong, hệ thống tạo (hoặc cập nhật) lộ trình cho các môn tương ứng với bank vừa làm: bank English gieo cho IELTS/Cambridge/TOEIC/SAT/PTE/English như logic đã có, các bank còn lại gieo cho đúng môn đó.
- Trình độ đầu vào và trình độ hiện tại được đặt theo kết quả; mục tiêu mặc định là bậc kế tiếp trên thang, ngày mục tiêu mặc định 3 tháng.
- Nếu học sinh đã có lộ trình môn đó: chỉ cập nhật trình độ hiện tại, không ghi đè mục tiêu/số giờ đã khai.
- Khách chưa đăng nhập: lưu tạm ở máy và đồng bộ khi đăng nhập (dùng đúng cơ chế hiện có).

## 4. Đường vào placement test ở từng môn

Thêm thẻ "Kiểm tra trình độ" ở trang chủ của 6 môn (English, Vietnamese, Chinese, Japanese, Finnish, Swedish) trỏ tới placement test của môn đó, và ở trang "Lộ trình của tôi" mỗi thẻ môn có nút "Làm lại kiểm tra trình độ".

## Chi tiết kỹ thuật

- `src/data/placementBanks.ts`: thêm `japanese`, `swedish` vào `PlacementSubject`, `SUBJECT_META`, `getPlacementBank`, `parseSubject`; bank mới tuân theo schema `placementTest.ts` nên `QuestionRenderer` không cần sửa.
- `src/lib/personalization/subjectRegistry.ts`: thêm `placement: "japanese" | "swedish"`; bổ sung track cho Japanese (vocab, listening) để kế hoạch tuần đủ mục.
- File mới `src/lib/personalization/placementBridge.ts` (thuần, có unit test): `subjectsForBank(bank)`, `ladderLevelFrom(subjectId, cefr, total)`, `nextTarget(subjectId, level)`, `weaknessRoutes(subjectId, skills)`.
- `src/hooks/useLearningPath.ts`: thêm `seedFromPlacement(bank, outcome)` dùng lại `savePath` + `buildWeeklyPlan`, không tạo bảng mới.
- `src/pages/PlacementTest.tsx`: màn hình kết quả tách thành `src/components/personalization/PlacementPathResult.tsx` (dùng `PathSubjectCard`, `WeeklyPlanList`, `WeaknessList` đã có).
- Không migration mới: vẫn ghi `placement_test_results` (subject nằm trong `answers.__subject`) và `learning_paths` / `learning_path_steps`.
- Giữ chuẩn dự án: mobile-first, chỉ dùng token màu brand, song ngữ VI/EN, không dùng dấu gạch ngang dài.

## Thứ tự triển khai

1. Bank Japanese + Swedish, khai báo môn.
2. `placementBridge` + test.
3. `seedFromPlacement` trong hook lộ trình.
4. Màn hình kết quả mới.
5. Đường vào placement ở 6 trang môn + nút làm lại ở `/my-path`.
6. Kiểm tra thật trên preview cho từng môn (khách và tài khoản đã đăng nhập).

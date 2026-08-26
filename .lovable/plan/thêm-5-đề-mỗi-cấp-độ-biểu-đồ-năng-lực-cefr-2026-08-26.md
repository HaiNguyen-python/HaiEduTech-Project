# Thêm 5 đề mỗi cấp độ + biểu đồ năng lực CEFR

## Hiện trạng đã kiểm tra

- `src/data/cambridgeMockExamData.ts` gom tất cả đề từ nhiều file rồi chạy qua chuỗi normalizer (reading sets, equalizer, clarity, normalize). Mỗi cấp độ hiện có: Starters 15, Movers 15, Flyers 15, KET 15, PET 16 (tổng 75).
- `src/components/cambridge/TestPrepBoard.tsx` là bảng đề dùng chung cho cả trang `/cambridge-yle-test-prep` và tab trong hub; đã có `CAMBRIDGE_LEVEL_META` với nhãn CEFR (Starters Pre-A1, Movers A1, Flyers A2, KET A2, PET B1).
- `src/pages/CambridgeMockExam.tsx` lưu điểm cao nhất mỗi đề vào localStorage `cambridge-mock-best-<examId>` (số câu đúng) và ghi `student_activity_log` với `activity_type = "cambridge_mock_exam"`, `activity_id = examId`, `score` là phần trăm.

## Sẽ làm

### 1. Thêm 25 đề mới (5 đề mỗi cấp độ)

- Starters #16-20, Movers #16-20, Flyers #16-20, KET #16-20, PET #17-21.
- Mỗi đề 25 câu (15 Reading & Writing + 10 Listening) đúng chuẩn hiện tại: có `passage` cho phần nghe/đọc, đáp án và giải thích song ngữ, đáp án phân bố đều A/B/C/D.
- Chủ đề mới, không lặp đề cũ (ví dụ Starters: đồ chơi, bữa ăn, thời tiết, gia đình, trường học; PET: môi trường, truyền thông, sức khoẻ, du lịch, công nghệ), độ khó tăng dần theo cấp.
- Đặt trong các file dữ liệu mới `src/data/cambridgeExamsStarters16to20.ts`, `...Movers16to20.ts`, `...Flyers16to20.ts`, `...Ket16to20.ts`, `...Pet17to21.ts` rồi merge vào mảng trong `cambridgeMockExamData.ts` để không phình file cũ.
- Sau khi thêm: chạy script audit hiện có (`scripts/audit_cambridge_exams.ts`) để đảm bảo không trùng ID, đủ 25 câu, `correctAnswer` hợp lệ, mọi câu có giải thích.

### 2. Biểu đồ năng lực CEFR ở đầu trang

Component mới `src/components/cambridge/CefrProgressChart.tsx`, đặt ngay dưới phần hero (trên thanh lọc cấp độ) của `TestPrepBoard`:

- **Thanh thang CEFR** từ Pre-A1 → A1 → A2 → B1 → B2 với một con trỏ (marker) chỉ vị trí hiện tại của học viên, kèm nhãn "Bạn đang ở đây".
- **Cách tính**: với mỗi cấp độ, lấy tỉ lệ % trung bình các đề đã làm (từ `cambridge-mock-best-*` hợp nhất với `student_activity_log` khi đã đăng nhập). Một cấp được coi là "đạt" khi trung bình >= 70% trên ít nhất 2 đề; vị trí trên thang là bậc CEFR cao nhất đã đạt, cộng phần lẻ theo % của bậc kế tiếp. B2 chỉ hiển thị là mục tiêu phía trước (chưa có đề B2 trên trang), có ghi chú rõ.
- **Biểu đồ cột (Recharts)**: mỗi cấp độ một cột = % trung bình, đường ngưỡng 70% dạng nét đứt, kèm số đề đã làm / tổng số đề của cấp đó.
- **Thẻ tóm tắt**: cấp CEFR hiện tại, cấp mục tiêu kế tiếp, cấp yếu nhất kèm nút "Luyện ngay" nhảy tới đúng nhóm đề (đặt filter cấp độ đó).
- **Trạng thái rỗng**: khi chưa làm đề nào, hiển thị thang CEFR mờ và lời nhắc chọn một đề để bắt đầu; khách chưa đăng nhập vẫn thấy dữ liệu local.

## Chi tiết kỹ thuật

- Toán tính CEFR đặt trong `src/lib/cambridgeCefrModel.ts` (hàm thuần: `levelStats`, `cefrPosition`, `nextTarget`) để tách khỏi UI.
- Hook nhỏ `src/hooks/useCambridgeCefr.ts` đọc localStorage + `student_activity_log` (khi có session), refresh khi focus lại tab và khi có `storage` event.
- Không đổi ID đề cũ nên tiến độ đã lưu của học viên giữ nguyên.
- Song ngữ VI/EN qua `useLanguage`, dùng design token, mobile-first, không dùng dấu gạch ngang dài.

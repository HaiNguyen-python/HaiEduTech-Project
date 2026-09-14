# Rà soát Speaking Coach - kết quả và kế hoạch ổn định hóa

## Kết quả kiểm tra hiện tại

Đã chạy audit dữ liệu, kiểm tra kiểu (typecheck) và bộ test cho Speaking Coach:

- Dữ liệu 6 ngôn ngữ đầy đủ, không lỗi chặn: English 59 chủ đề / 626 câu, Finnish 47/565, Swedish 59/600, Japanese 30/300, Chinese 27/348, Vietnamese 26/333.
- Không còn chủ đề trùng tên, không trùng mã câu, không trùng cặp âm.
- Typecheck sạch. 19/19 test của Speaking Coach và Mr. Hai đều đạt.
- 6 phần luyện tập (Sentences, Shadowing, Sound drill, Free Talk, Speak with Mr. Hai, Weak words) đều hoạt động.

Tức là phần này đang ổn định về chức năng. Còn 3 nhóm vấn đề nhỏ nên xử lý:

### 1. Câu luyện bị trùng nội dung giữa các chủ đề
Cùng một câu xuất hiện ở nhiều chủ đề khác nhau: tiếng Anh 7 cặp, tiếng Phần Lan 14 cặp, tiếng Trung 3 cặp. Học viên sẽ gặp lại câu đã luyện.

Cách xử lý: giữ câu ở chủ đề phù hợp nhất, viết lại câu trùng ở chủ đề còn lại theo đúng chủ đề và cấp độ (giữ nguyên mã câu để không mất tiến độ đã lưu).

### 2. Hai cảnh báo kỹ thuật trong bảng điều khiển
Có 2 cảnh báo React khi mở trang (nút cuộn trong hội thoại Mr. Hai và ô Weak words). Không gây lỗi hiển thị nhưng nên sửa cho sạch.

### 3. Chưa có kiểm tra tự động cho câu trùng nội dung
Audit hiện chỉ ghi cảnh báo. Nên nâng thành lỗi chặn sau khi làm sạch dữ liệu, để lần sau không lặp lại.

## Việc sẽ làm

1. Làm sạch 24 câu trùng ở tiếng Anh, Phần Lan, Trung - viết lại nội dung theo chủ đề, giữ mã câu.
2. Sửa 2 cảnh báo React.
3. Nâng cảnh báo trùng câu trong audit thành lỗi chặn, thêm test.
4. Chạy lại audit + typecheck + test, kiểm tra thực tế trên máy tính và điện thoại (một câu luyện, một buổi Mr. Hai, một lượt Sound drill).

## Chi tiết kỹ thuật

- Dữ liệu câu: `src/data/speakingCoach*` (theo từng ngôn ngữ) - chỉ đổi `text`/`textVi`, giữ `id`.
- `ConversationScrollButton` trong `src/components/ai-elements/conversation.tsx` và `WeakWordReview` trong `src/components/speaking/WeakWordReview.tsx`: bọc `React.forwardRef`.
- `scripts/audit_speaking_coach.ts`: chuyển nhánh `duplicate sentence text` từ `console.warn` sang lỗi chặn.
- Test: mở rộng `src/test/speakingCoach.test.ts` với kiểm tra không trùng nội dung câu trong cùng ngôn ngữ.
- Không đổi route `/speaking-coach/:language`, không đổi khóa lưu tiến độ, không đổi hợp đồng edge function `speak-with-mr-hai` và `mr-hai-voice`.

# Bổ sung phần Cơ bản và thu gọn từng trình độ ở Ngữ pháp tiếng Anh

## Hiện trạng đã kiểm tra

Trang `/english/grammar` có 24 chuyên đề, nhưng phần "Beginner" chỉ hiện 1 ô ("Question Forms & Tag Questions"). Nguyên nhân: trình độ của mỗi chuyên đề được tính bằng **điểm trung bình độ khó của các bài trong đó**. Vì hầu hết chuyên đề nền tảng (thì, mạo từ & giới từ, động từ khiếm khuyết, so sánh, dấu câu, mẫu câu) đều trộn cả bài trung cấp/nâng cao, điểm trung bình vượt ngưỡng nên bị đẩy hết sang "Intermediate" - dù bên trong vẫn có bài cơ bản.

Ngoài ra cả 3 khối trình độ luôn mở hết nên trang rất dài.

## Sẽ làm

### 1. Xếp trình độ theo lộ trình thay vì điểm trung bình

Mỗi chuyên đề được gán trình độ theo đúng vị trí trong lộ trình học, không phụ thuộc trung bình độ khó. Nhóm **Cơ bản** gồm 8 chuyên đề nền tảng:

- Câu hỏi & câu hỏi đuôi (giữ nguyên)
- Thì cơ bản
- Mạo từ & giới từ
- Động từ khiếm khuyết
- So sánh
- Mẫu câu cơ bản
- Dấu câu & ranh giới câu
- Cụm giới từ thường dùng

Các chuyên đề còn lại giữ ở Trung cấp / Nâng cao như hiện tại. Không đổi tên, đường dẫn hay thứ tự bài trong chuyên đề.

### 2. Thêm bài học cơ bản thật sự

Thêm 12 bài mới ở mức cơ bản, chia đều cho các chuyên đề nền tảng, ví dụ: to be và câu phủ định đơn giản, hiện tại đơn với chủ ngữ số ít/số nhiều, a/an/the trong đời sống, giới từ chỉ thời gian và địa điểm, can/can't diễn tả khả năng, so sánh hơn với tính từ ngắn, câu đơn - chủ ngữ + động từ + tân ngữ, dấu chấm và dấu phẩy cơ bản.

Mỗi bài mới đạt đúng chuẩn đang áp dụng: lý thuyết song ngữ 6 phần, mẹo học, 4 từ vựng có phiên âm, tối thiểu 7 bài tập thuộc ít nhất 4 dạng, quiz 10 câu. Câu luyện tập không lặp lại giữa các dạng.

Sau khi thêm: 24 chuyên đề, 97 bài, mỗi chuyên đề vẫn tối thiểu 3 bài.

### 3. Nút thả xuống cho từng trình độ

Mỗi khối trình độ trở thành một mục có thể mở/đóng:

- Tiêu đề khối có mũi tên và số chuyên đề, bấm vào là mở hoặc gập lại.
- Mặc định: **Cơ bản mở**, Trung cấp và Nâng cao gập lại cho trang gọn.
- Khi người học tìm kiếm hoặc chọn bộ lọc trình độ, các khối có kết quả tự mở.
- Có thể đọc được bằng bàn phím và trình đọc màn hình; hình minh họa chỉ tải khi khối được mở.

## Kiểm tra

- Kiểm tra tự động toàn bộ bài tập ngữ pháp phải báo 0 lỗi.
- Mở trang trên máy tính và điện thoại: đếm đúng số ô ở mỗi trình độ, mở/gập từng khối, tìm kiếm tự mở khối, các đường dẫn bài cũ vẫn vào được.
- Không đổi ID bài, đường dẫn hay tiến độ đã lưu của học viên.

## Chi tiết kỹ thuật

- `src/pages/EnglishGrammar.tsx`: thay `getModuleLevel` bằng bảng mapping `moduleId -> level` (fallback về logic trung bình cũ cho module chưa khai báo); thêm state `openLevels` (Set) + nút toggle với `aria-expanded`, `motion` collapse; auto-open khi `searchTerm` hoặc `activeLevel` thay đổi.
- Bài mới đặt trong `src/data/languageCurriculum/grammarLessonsNew/part4.ts`, export gộp qua `grammarLessonsNew/index.ts` (`applyNewGrammarLessons` đã append theo ID, không trùng).
- Bài tập viết tay bổ sung nếu cần: `grammarExercisesAuthored/part8.ts`, merge qua `applyGrammarExerciseSupplement`.
- Chạy `bunx tsx scripts/audit_grammar_exercises.mjs` (phải in "All grammar exercises passed the audit"), `bunx tsgo --noEmit -p tsconfig.app.json`, ESLint các file sửa, Vitest `src/test`.

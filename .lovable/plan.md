# Grammar: chỉ giữ bài tập, bỏ lý thuyết, thêm nhiều dạng bài tập mới

## Mục tiêu

Trang bài học English Grammar (`/english/grammar/...`, 28 module / 67 bài) chỉ còn phần luyện tập: **Interactive Exercises + Quiz cuối bài**. Mỗi bài có 7-8 bài tập, đa dạng dạng thức, nội dung được rà soát tự động để không còn lỗi.

## 1. Bỏ toàn bộ khối lý thuyết (chỉ áp dụng cho Grammar tiếng Anh)

Trong trang bài học, các khối sau sẽ bị ẩn khi bài thuộc Grammar tiếng Anh (các khoá khác như IELTS, SAT, tiếng Trung giữ nguyên):

- Khối "Theory"
- Grammar Lesson Overview (thẻ tóm tắt mục tiêu ở đầu bài)
- Grammar Lesson Companion (bảng quy tắc, ví dụ mẫu, checklist)
- Pro Tips
- Vocabulary

Giữ lại: điều hướng bài học ở sidebar, tiến độ, khối Interactive Exercises, Quiz, bảng kết quả, nút back.

Nội dung lý thuyết trong dữ liệu **không xoá** (vẫn dùng làm nguồn sinh bài tập), chỉ không hiển thị nữa. Câu gợi ý "hãy đọc lại lý thuyết" trong phần kết quả quiz sẽ đổi thành "làm lại các bài tập sai".

## 2. Thêm 4 dạng bài tập ngữ pháp mới

Hiện chỉ có 3 dạng: điền từ, sắp xếp câu, chính tả. Bổ sung:

| Dạng mới | Học viên làm gì |
| --- | --- |
| Error correction | Cho câu có 1 lỗi ngữ pháp, gạch chân/chọn phần sai rồi viết lại câu đúng |
| Sentence transformation | Viết lại câu theo từ gợi ý cho sẵn (ví dụ: chuyển sang bị động, câu điều kiện) |
| Multiple choice trong bài tập | Chọn dạng đúng trong 4 lựa chọn, có giải thích ngay khi chọn |
| Matching | Nối nửa câu / nối cấu trúc với chức năng dùng |

Mỗi dạng có component riêng, cùng phong cách với các bài tập hiện có: chấm điểm ngay, nút "Kiểm tra", nút "Làm lại", đánh dấu đúng/sai bằng màu, giải thích ngắn bằng tiếng Anh.

## 3. Nâng mỗi bài lên 7-8 bài tập

Bổ sung nội dung bài tập cho từng bài trong tệp dữ liệu mới, viết theo đúng chủ điểm của bài (không dùng câu chung chung). Ưu tiên nội dung viết tay theo chủ điểm; phần nào còn thiếu sẽ được sinh tự động từ câu mẫu và từ vựng có sẵn của chính bài đó (cơ chế này đã có, sẽ mở rộng để phủ các dạng mới).

Cơ cấu chuẩn mỗi bài: 2 điền từ, 1 sắp xếp câu, 1 error correction, 1 sentence transformation, 1 MCQ, 1 matching, 1 chính tả → 8 bài tập.

## 4. Rà soát nội dung bài tập

Viết script kiểm tra chạy trên toàn bộ 67 bài, báo lỗi nếu:

- Đáp án không xuất hiện được trong câu (điền từ), hoặc câu thiếu dấu `___`
- Câu sắp xếp có tập từ không khớp với câu đúng
- MCQ có đáp án trùng lặp, thiếu giải thích, hoặc lệch đáp án (tất cả đều là A/B)
- Có ký tự tiếng Việt lọt vào phần tiếng Anh
- Bài dưới 7 bài tập, hoặc bài tập trùng nội dung nhau
- Câu mẫu quá ngắn / thiếu dấu câu

Mục tiêu cuối: script báo 0 lỗi, và kiểm tra trực tiếp trên trình duyệt vài bài đại diện (beginner / intermediate / advanced) để chắc chắn không còn khối lý thuyết và các dạng bài tập mới chấm điểm đúng.

## Chi tiết kỹ thuật

- Thêm các kiểu `ErrorCorrectionExercise`, `TransformationExercise`, `MultipleChoiceExercise`, `MatchingExercise` vào `src/data/languageCurriculum/types.ts` và union `InteractiveExercise`.
- Component mới trong `src/components/exercises/`, export qua `index.ts`, thêm nhánh vào `renderExercise` của `src/pages/LanguageLessonView.tsx`.
- Ẩn khối lý thuyết bằng cờ `isEnglishGrammarLesson` đã có trong `LanguageLessonView.tsx`.
- Nội dung bài tập mới đặt ở `src/data/languageCurriculum/grammarExercises/part1..5.ts` + `index.ts`, merge vào `allGrammarModules` trong `src/data/languageCurriculum/index.ts` (cùng cách các enhancer hiện tại đang làm), giữ nguyên ID module/bài nên tiến độ học viên không bị mất.
- Mở rộng `src/lib/grammarExerciseBuilder.ts`: nâng `MIN_EXERCISES` lên 7 và sinh thêm các dạng mới từ dữ liệu bài học.
- Script kiểm tra: `scripts/audit_grammar_exercises.mjs`, chạy sau mỗi lô ~12 bài kèm `tsgo`.
- Các thành phần chỉ dùng cho lý thuyết Grammar (`GrammarLessonOverview`, `GrammarLessonCompanion`, `grammarTheoryEnhancer`) sẽ không còn được gọi ở trang bài học; giữ tệp lại để không ảnh hưởng nơi khác đang import.

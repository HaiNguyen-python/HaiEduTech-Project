# Rà soát và thiết kế lại bài tập English Grammar

## Vấn đề đã kiểm tra được (28 chuyên đề / 67 bài)

Chạy kiểm tra trên toàn bộ dữ liệu bài tập thực tế:

- **65/67 bài có câu bị lặp lại**. Nặng nhất: `relative-defining` và `prepositions-common` (11 câu lặp), `tenses-future` (10), `reported-commands` và `reported-questions` (8), `relative-reduced` (6).
- **Nguyên nhân gốc**: mọi dạng bài tập đều sinh ra từ **cùng một nhóm câu nhỏ** (câu mẫu trong lý thuyết + ví dụ từ vựng). Vì vậy một câu xuất hiện lại ở điền từ, rồi sắp xếp câu, rồi chính tả, rồi trắc nghiệm.
- **Câu giải thích bị dùng làm câu bài tập**. Ví dụ trong `tenses-future`: "Be going to expresses intention."; trong `reported-commands`: "Reporting instructions from a teacher, boss, doctor or official notice." Đây là dòng mô tả quy tắc, không phải câu để học viên sắp xếp hay chép chính tả.
- **Câu hỏi trắc nghiệm trùng đề bài 40 lần**: "Which sentence is grammatically correct?" xuất hiện ở 40 chỗ trong toàn bộ bộ bài tập.
- **Một câu bị lặp cả trong cùng một bài với hai kiểu chỗ trống khác nhau**: `relative-prepositions` có "The man ___ is our new tutor." và "The man ______ is our new tutor."
- Số lượng bài tập thì đủ (mỗi bài 7-8), nhưng **chất lượng bị pha loãng vì trùng lặp**: học viên làm 8 bài tập mà thực chất chỉ gặp 3-4 câu khác nhau.
- Bộ kiểm tra tự động hiện tại chỉ phát hiện trùng **cả khối bài tập**, không phát hiện trùng **từng câu** giữa các dạng.

## Sẽ làm

### 1. Chống trùng lặp trên toàn bài

Mỗi bài sẽ có một "sổ ghi" các câu đã dùng. Một câu chỉ được dùng cho **một dạng bài tập duy nhất**; các dạng sau phải lấy câu khác. Ưu tiên phân bổ: câu mẫu trọng tâm dành cho điền từ và trắc nghiệm, câu dài hơn dành cho sắp xếp câu, câu ngắn rõ ràng dành cho chính tả.

Nếu sau khi trừ trùng lặp mà không còn đủ câu, bài đó **không nhồi thêm bài tập lặp lại** mà lấy từ nội dung viết tay bổ sung (mục 3).

### 2. Lọc câu không phải câu luyện tập

Loại bỏ khỏi nguồn sinh bài tập các dòng mô tả quy tắc (dạng "X expresses intention.", "Reporting instructions from...", "A defining clause gives essential information."). Chỉ giữ câu tiếng Anh có chủ ngữ - động từ thật, dùng được để người học luyện. Chuẩn hóa mọi chỗ trống về cùng một dạng để không còn hai biến thể của cùng một câu.

### 3. Bổ sung nội dung bài tập viết tay theo chuyên đề

Ưu tiên các bài thiếu câu nhất (nhóm quan hệ, giới từ, câu tường thuật, thì tương lai): viết thêm câu luyện tập đúng chủ điểm để mỗi bài đạt **tối thiểu 8 bài tập với ít nhất 20 câu khác nhau**, phủ ít nhất 5 dạng.

### 4. Làm đề bài trắc nghiệm rõ và đa dạng

Thay câu hỏi chung "Which sentence is grammatically correct?" bằng đề bài gắn với chuyên đề (ví dụ: "Chọn câu dùng đúng thì hiện tại hoàn thành", "Chọn câu rút gọn mệnh đề quan hệ đúng"), mỗi câu có giải thích ngắn thay vì giải thích mẫu chung.

### 5. Kiểm tra tự động chặt hơn

Mở rộng bộ kiểm tra để **báo lỗi** khi: một câu xuất hiện ở hai dạng bài tập trong cùng bài, một câu bị lặp trong cùng dạng, đề bài trắc nghiệm trùng nhau trong một bài, câu bài tập thực chất là dòng giải thích quy tắc, hoặc bài có dưới 20 câu khác nhau. Mục tiêu: **0 lỗi**.

Cuối cùng kiểm tra trực tiếp trên trình duyệt vài bài đại diện (Beginner / Intermediate / Advanced), desktop và điện thoại, để chắc nội dung không còn lặp và chấm điểm vẫn đúng.

## Chi tiết kỹ thuật

- Sửa `src/lib/grammarExerciseBuilder.ts`: thêm registry câu đã dùng (normalize lowercase, chuẩn hóa `_{2,}` -> `___`) truyền qua tất cả generator; đổi thứ tự sinh thành pipeline có phân bổ nguồn thay vì mỗi generator tự đọc lại toàn bộ pool.
- Thêm bộ lọc "meta sentence" trong `extractPlainSentences` / `extractBoldSentences` (chặn các mẫu mô tả quy tắc, câu bắt đầu bằng V-ing mô tả tình huống, câu chứa tên cấu trúc làm chủ ngữ).
- `buildCorrectSentenceMcq` nhận `topicLabel` từ `lesson.title` để sinh đề bài riêng; bỏ đề bài cố định.
- Nội dung viết tay bổ sung vào `src/data/languageCurriculum/grammarExerciseSupplement.ts` (giữ nguyên cấu trúc hiện có, keyed theo lesson id).
- Không đổi ID module/bài, không đổi route, không ảnh hưởng tiến độ đã lưu của học viên.
- Mở rộng `scripts/audit_grammar_exercises.mjs` với các kiểm tra ở mục 5; chạy kèm `bunx tsgo --noEmit`, ESLint và Vitest sau mỗi lô sửa.

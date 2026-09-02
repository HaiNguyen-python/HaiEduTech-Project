# IELTS Vocabulary Practice - fix 2 bugs + add new exercise types

## 1. Bug: giải thích hiện sai từ

Trong dạng "Find the odd word out", đáp án đúng là từ lạc chủ đề (ví dụ `erode`), nhưng khung giải thích phía dưới luôn in `q.word` - tức là từ gốc đang được luyện (`exemplify`). Vì vậy học sinh chọn đúng nhưng lại đọc giải thích của một từ khác.

Cách sửa:
- Mỗi câu hỏi mang thêm một trường "từ để giải thích" trỏ đúng vào từ đứng sau đáp án đúng.
- Odd-one-out gán trường này bằng từ lạc chủ đề; các dạng khác giữ nguyên từ gốc.
- Khung giải thích đọc trường này thay vì `q.word`.
- Với odd-one-out, thêm một dòng lý do ngắn: từ này thuộc chủ đề X, ba từ còn lại thuộc chủ đề Y.
- Rà lại các dạng khác (synonym, collocation, register, wordFamily) để chắc chắn phần giải thích khớp với đáp án được chấm.

## 2. Bug: đổi tab là mất bài đang làm

Hai nguyên nhân:
- Tab Practice chỉ được render khi đang chọn tab đó, nên chuyển sang Vocabulary/Flashcard là component bị huỷ, toàn bộ tiến trình mất.
- Danh sách từ truyền vào được tạo mới mỗi lần render, khiến bộ sinh câu hỏi chạy lại và quay về câu 1.

Cách sửa:
- Giữ ba tab cùng tồn tại, tab không hoạt động chỉ bị ẩn, nên trạng thái bài làm được giữ nguyên.
- Ghi nhớ danh sách từ (memo) để bộ câu hỏi không tự sinh lại khi component render lại.
- Lưu tạm bộ câu hỏi, câu hiện tại, điểm và combo vào bộ nhớ phiên của trình duyệt, để nếu có tải lại trang thì học sinh vẫn tiếp tục được; kèm nút "Bắt đầu lại" rõ ràng.
- Chỉ sinh đề mới khi học sinh đổi số câu, đổi Focus, hoặc bấm New quiz.

## 3. Thêm dạng bài tập mới

Bổ sung vào Focus dropdown (mỗi dạng đều tính điểm, tính combo và ghi vào bộ não từ vựng như hiện nay):

- Sentence build: sắp xếp các mảnh câu thành một câu học thuật đúng chứa từ đang học.
- Word form table: điền dạng danh từ/động từ/tính từ còn thiếu của cùng một họ từ.
- Synonym vs antonym: cho một cặp từ, chọn quan hệ đồng nghĩa hay trái nghĩa.
- Error spotting: chọn câu dùng sai collocation của từ và sửa lại.
- Topic sort: kéo/chọn 6 từ vào đúng 2 chủ đề IELTS.
- Gap từ nghe: nghe câu, gõ từ còn thiếu (nâng cấp dictation lên mức câu).
- Paraphrase choice: chọn cách diễn đạt lại câu dùng từ học thuật vừa học.

Mỗi dạng vẫn đi qua bộ kiểm tra công bằng hiện có (không lộ đáp án qua độ dài, chỗ trống hay từ loại).

## Ghi chú kỹ thuật
- `src/pages/IeltsVocabulary.tsx`: thêm `answerWord` vào `ExQuestion`, sửa `buildQuestions` (odd-one-out và các dạng mới), sửa khung giải thích, memo danh sách từ, giữ tab luôn mounted, thêm lưu phiên.
- `src/lib/vocab/questionQuality.ts`: dùng lại cho distractor và kiểm tra công bằng của các dạng mới.
- Không thay đổi cơ sở dữ liệu.

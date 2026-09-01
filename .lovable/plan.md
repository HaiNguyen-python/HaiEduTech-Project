# Tổng rà soát Reading, Writing và Listening của Cambridge YLE

## Kết quả kiểm tra thực tế (100 đề, 2.780 câu)

Đã chạy `scripts/audit_cambridge_exams.ts` và các script dò riêng cho từng kỹ năng.

Phần đang **ổn**:
- Cấu trúc: 100 đề, số câu bằng nhau theo cấp (Starters/Movers 25, Flyers 28, KET 30, PET 31), `totalQuestions` khớp.
- Phân bố đáp án cân: A 22.6% / B 25.6% / C 26.5% / D 25.3%.
- Không có câu trùng trong cùng một đề, không có phương án trùng hoặc để trống, không có dấu gạch dài, mọi câu đều có giải thích Anh và Việt.
- Listening (1.000 câu): sau đợt sửa trước, 0 câu dùng giải thích dán sẵn, 0 câu lệch giới tính người nói, đáp án đều nghe được trong recording.
- Đã mở 4 câu Reading bị script gắn cờ "đáp án không có trong bài" (movers-2 q1, flyers-2 q9, ket-1 q1, ket-2 q18): thực tế đều đúng, đây là cảnh báo sai do so khớp theo từ nguyên văn, không phải lỗi nội dung.

Phần **chưa ổn**:

1. **579 câu Reading còn đuôi giải thích dán sẵn**: mọi câu đều bị nối thêm "In Reading & Writing, underline the words in the text that prove the answer; if you cannot point to them, you are guessing." nên phần Review không chỉ ra được dẫn chứng riêng của từng câu (Listening đã bỏ mẫu này, Reading thì chưa).
2. **Không có bài Writing thật**: cả 1.780 câu của mục "Reading & Writing" đều là trắc nghiệm. Đề YLE/KET/PET thật có phần viết (điền từ theo hình ở Starters/Movers, hoàn thành câu và viết truyện/ghi chú ở Flyers, viết email/ghi chú ở KET, viết thư và truyện ở PET). Học sinh hiện không có chỗ luyện viết trong Cambridge Test Prep.
3. **21 câu hỏi Reading trùng đề bài giữa các đề khác nhau** ("What is the weather like today?" xuất hiện ở 3 đề, "What colour is the cat?", "Ice cream is ___." ...), dễ tạo cảm giác lặp khi làm nhiều đề.
4. **Bài đọc Starters và Movers ngắn hơn chuẩn**: Starters 23-39 từ (trung bình 30), Movers 27-83 từ (trung bình 70). Flyers/KET/PET đã đạt 105-136 từ. Starters/Movers nên đạt tối thiểu 45 và 80 từ để có ngữ cảnh loại trừ.
5. **616 câu Reading không có bài đọc kèm**: đúng luật với Parts 1-3 (từ vựng/ngữ pháp lẻ), nhưng script hiện chỉ báo thông tin, chưa kiểm tra xem câu lẻ có đủ ngữ cảnh để chỉ có một đáp án đúng.

## Việc sẽ làm

### 1. Giải thích Reading theo dẫn chứng riêng
Bỏ đuôi dán sẵn ở 579 câu. Mỗi câu có giải thích trỏ đúng câu trong bài đọc chứng minh đáp án (dùng lại `src/lib/cambridgeEvidence.ts` như Listening), kèm một câu Việt riêng, không lặp mẫu. Câu từ vựng/ngữ pháp lẻ thì giải thích theo quy tắc ngôn ngữ cụ thể.

### 2. Thêm phần Writing thật cho từng cấp
Thêm mục Writing vào Cambridge Test Prep, bài tập theo đúng dạng của từng cấp:
- Starters/Movers: điền từ còn thiếu, viết lại câu theo mẫu, viết 1-2 câu tả tranh.
- Flyers: hoàn thành câu, viết ghi chú ngắn, viết truyện 3 câu theo 3 tranh.
- KET: viết email/ghi chú 25-35 từ theo tình huống.
- PET: viết email 100 từ và chọn viết truyện hoặc bài luận 100 từ.

Chấm điểm bằng AI theo tiêu chí Cambridge (Content, Communicative Achievement, Organisation, Language), phản hồi song ngữ, có bài mẫu để đối chiếu. Kết quả ghi vào cùng hệ thống tiến độ và thang CEFR đang có.

### 3. Bỏ trùng câu hỏi Reading
Viết lại 21 đề bài trùng thành ngữ cảnh khác nhau (đổi nhân vật, đồ vật, tình huống) và giữ nguyên đáp án đúng, để không ảnh hưởng tiến độ đã lưu.

### 4. Viết dài thêm bài đọc Starters và Movers
Mở rộng các bài dưới chuẩn lên tối thiểu 45 từ (Starters) và 80 từ (Movers), thêm chi tiết nhiễu tự nhiên để học sinh phải đọc mới loại trừ được, giữ nguyên vốn từ trong danh sách chính thức của từng cấp.

### 5. Siết lại script rà soát
Mở rộng `scripts/audit_cambridge_exams.ts`:
- Reading: không còn đuôi giải thích dán sẵn, độ dài bài đọc tối thiểu theo cấp, không trùng đề bài giữa các đề, đáp án phải truy được trong bài đọc theo cách so khớp có tính đến diễn đạt lại (tránh 229 cảnh báo sai như hiện nay).
- Câu lẻ không có bài đọc: kiểm tra chỉ có một phương án hợp ngữ pháp/ngữ nghĩa.
- Writing: mỗi đề đủ số bài viết theo cấp, có đề bài, có gợi ý, có bài mẫu.
Chạy tới khi `Issues: 0`, rồi mở 1 đề mỗi cấp trong preview để đọc lại bài đọc, làm thử phần viết và kiểm tra Review Answer.

## Ghi chú kỹ thuật
- Không đổi số câu, ID câu, đáp án đúng hay thứ tự của các câu trắc nghiệm hiện có, nên tiến độ và thang CEFR của học sinh không bị ảnh hưởng.
- File chính: `src/data/cambridgeMockExamData.ts` (và các file đề con), giải thích Reading gom vào lớp mới `src/data/cambridgeReadingExplanations.ts`, bài viết mới ở `src/data/cambridgeWritingTasks.ts`, UI ở `src/pages/CambridgeYleTestPrep.tsx` và `src/components/.../CambridgeMockExam.tsx`, chấm viết bằng edge function mới dùng Lovable AI.
- Nội dung mới không dùng dấu gạch dài, giữ giải thích song ngữ Anh - Việt.
- Khối lượng lớn nên chia đợt: đợt 1 giải thích Reading + script rà soát, đợt 2 phần Writing, đợt 3 viết lại bài đọc ngắn và bỏ trùng câu hỏi.

# Rà soát toàn bộ Listening của Cambridge YLE

## Kết quả kiểm tra thực tế (1.000 câu nghe / 100 đề)

Audit cấu trúc hiện tại báo `Issues: 0`, nhưng khi kiểm tra riêng phần ngữ nghĩa thì có 4 nhóm lỗi thật:

1. **57 câu bị chèn câu "chốt đáp án" sai ngữ pháp / vô nghĩa** do lớp `cambridgeListeningClarity.ts` ghép nguyên đáp án vào một khung câu cố định:
   - `pet-1 q31`: "The reason is health and environment."
   - `pet-5 q24`: "The reason is reads news online."
   - `flyers-1 q27`: "Yes, let's write in diary."
   - `movers-3 q16`: "Yes, maths & English."
   - `starters-3 q23`: "The plan is evening before bed."
   - `flyers-1 q19`: "That makes 1.5 hours altogether."
2. **100 câu lệch giới tính / lệch người nói**: câu hỏi nói về "she / the woman" nhưng script chỉ có `Boy`/`Man` nói, hoặc ngược lại (ví dụ `movers-3 q16` "What does she study..." nhưng câu chốt do `Boy` nói; `ket-4 q21` "How does the woman travel to work?" nhưng chỉ có `Man` nói "I take the underground").
3. **820 câu chỉ có 1 lượt nói duy nhất**, thường là một câu đọc đúng nguyên thông tin cần nghe, nên không có ngữ cảnh và không có phương án nhiễu tự nhiên - nghe như đọc đáp án.
4. **641 câu dùng chung một câu giải thích dán sẵn** ("In Listening, the answer is the exact word or number the speaker says...") nên phần Review không chỉ ra được dẫn chứng riêng của câu đó.

## Việc sẽ làm

### 1. Viết lại lớp "chốt đáp án" cho tự nhiên
Thay `cambridgeListeningClarity.ts` bằng bộ sinh câu theo *dạng câu hỏi + dạng đáp án*, có chia hoà nhịp ngữ pháp:
- Lý do (`why`): "That is because I read everything online now." thay vì "The reason is reads news online."
- Danh sách môn/vật: "We do maths and English first." (đổi `&` thành `and`, không dùng khung "Yes, X").
- Số/giờ/giá: chỉ chèn khi con số không nghe được trực tiếp, và phải khớp đơn vị ("The show lasts an hour and a half.").
- Hành động: "Yes, I write it in my diary."
- Nếu không sinh được câu tự nhiên thì **không chèn** mà sửa dữ liệu bằng lớp override (mục 3).

### 2. Nhất quán người nói và đại từ
Chọn vai người nói theo chính câu hỏi: câu hỏi có "she/woman/girl" thì người đưa thông tin phải là `Girl`/`Woman`, có "he/man/boy" thì là `Boy`/`Man`; câu hỏi trung tính giữ cách chọn theo hash như hiện nay. Áp dụng cho cả câu hỏi 2 lượt nói để lượt nói chứa đáp án đúng vai.

### 3. Thêm ngữ cảnh và phương án nhiễu hợp lý
Với các câu chỉ có 1 lượt nói, dựng hội thoại ngắn 2-4 lượt theo cấp độ (Starters ngắn nhất, PET dài nhất): một lượt mở tình huống theo chủ đề của đề, một lượt chứa đáp án, và khi hợp lý thì một lượt loại trừ tự nhiên ("The leaflet said seven o'clock, but they changed it."). Tuyệt đối không dùng mẫu "It is not X.", không loại trừ ở câu hỏi phủ định, không nói phương án sai như sự thật.

Các câu thực sự mơ hồ (mô tả đúng với nhiều đáp án, câu hỏi cảm xúc/ý muốn không có căn cứ) sẽ được sửa nội dung trong một file override riêng theo `examId:questionId`, không sửa rải rác trong các file đề gốc.

### 4. Giải thích và Review Answer
Bỏ câu giải thích dán sẵn; mỗi câu có giải thích song ngữ trỏ đúng câu dẫn chứng trong recording, dùng lại `src/lib/cambridgeEvidence.ts`.

### 5. Audit và xác nhận
Mở rộng `scripts/audit_cambridge_exams.ts`: đáp án phải nghe được (kèm bảng quy đổi số/giờ/giá), không có câu chốt gượng, không lệch giới tính, không còn câu giải thích dán sẵn, tối thiểu số lượt nói theo cấp. Chạy tới khi `Issues: 0`, rồi mở 1 đề mỗi cấp trong preview để nghe thử và đọc lại Review Answer.

## Ghi chú kỹ thuật
- Không đổi số câu, ID câu, đáp án đúng hay thứ tự, nên tiến độ và thang CEFR của học sinh không bị ảnh hưởng.
- File chính: `src/data/cambridgeListeningClarity.ts`, `src/data/cambridgeListeningUpgrade.ts`, `src/data/cambridgeListeningSupport.ts`, override mới `src/data/cambridgeListeningFixes.ts`, `scripts/audit_cambridge_exams.ts`.
- Nội dung mới không dùng dấu gạch dài, giữ giải thích song ngữ Anh - Việt.

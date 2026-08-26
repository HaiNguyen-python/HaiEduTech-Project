# Rà soát bài nghe Cambridge YLE: câu hỏi khớp nội dung

## Kết quả kiểm tra hiện tại (đã chạy audit)

Audit cấu trúc hiện tại báo `Issues: 0` (100 đề, 1000 câu nghe, đủ độ dài và số lượt hội thoại). Nhưng khi kiểm tra riêng phần "câu hỏi có khớp nội dung không", có 3 nhóm vấn đề thật:

1. **105 câu đáp án không được nói rõ trong script.** Một phần là suy luận hợp lệ ("half past three" -> đáp án `3:30`), nhưng nhiều câu thì mơ hồ hoặc lệch:
   - `starters-1 q16`: script chỉ nói "small and brown, likes to run in the garden", câu hỏi "What pet?" đáp án "A dog" - mèo cũng đúng.
   - `ket-3 q21` "What does she want?" -> "Postpone meeting"; `pet-3 q30` "How does he feel?" -> "Regretful": script không có căn cứ trực tiếp.
   - Số/giờ/giá (`27`, `8:00`, `£22.50`, `11:30`) chỉ suy ra được bằng cách cộng hoặc đổi cách nói, không nhất quán giữa các đề.
2. **Câu loại trừ (distractor) đôi khi vô lý.** Bộ sinh script chèn câu "It is not X" cho phương án sai, nên có chỗ thành "It is not 25." hoặc "not 9:00 any more" - nghe không tự nhiên và với câu hỏi số/giờ thì dễ gây nhầm đáp án (`movers-1 q19`, `flyers-1 q26`, `ket-3 q23`, `flyers-2 q24`).
3. **Nội dung hội thoại lặp lại.** 250 script mở đầu cùng một câu narrator, và các câu chat đệm ("Hello! How are you today?", "Thanks for coming in...") dùng lại y nguyên ở hàng trăm bài, khiến bài nghe thiếu ngữ cảnh riêng của chủ đề.

## Việc sẽ làm

### 1. Bổ sung audit ngữ nghĩa (script kiểm tra tự động)
Mở rộng `scripts/audit_cambridge_exams.ts` để kiểm thêm:
- Đáp án đúng phải được script hỗ trợ: khớp trực tiếp, hoặc khớp qua bảng quy đổi (số <-> chữ, "half past three" <-> 3:30, giá tiền, "a dog" <-> "dog").
- Không được có phương án sai nào bị nói như một sự thật (loại nhầm đáp án).
- Không loại trừ trần trụi bằng số/giờ/giá (phải diễn đạt tự nhiên: "the timetable used to say nine o'clock").
- Câu hỏi phủ định (NOT) không được loại trừ chính các phương án có trong script.
- Câu mở đầu narrator và câu chat đệm phải đa dạng theo chủ đề (giới hạn số lần lặp).

### 2. Sửa câu hỏi/đáp án mơ hồ
Với ~105 câu bị đánh dấu: sửa **script hoặc câu hỏi** để chỉ còn một đáp án đúng duy nhất, kèm giải thích song ngữ trỏ đúng câu dẫn chứng.
- Nếu là suy luận hợp lệ theo chuẩn Cambridge (đổi cách nói giờ, cộng số): thêm vào bảng quy đổi của audit, giữ nguyên nội dung, chỉ bổ sung câu dẫn chứng trong `explanation`.
- Nếu thật sự mơ hồ (dog/cat, cảm xúc, ý muốn): thêm 1 câu vào script để chốt đáp án (ví dụ "It barks when the postman comes.").
Các sửa đổi nội dung này đặt trong một lớp override dữ liệu riêng (theo đúng cách các file `cambridge*Upgrade/TopUp` hiện có), không sửa rải rác trong các file đề gốc.

### 3. Nâng chất lượng câu loại trừ và hội thoại
Trong `src/data/cambridgeListeningUpgrade.ts`:
- Câu loại trừ với số/giờ/giá dùng mẫu tự nhiên ("the old leaflet said nine o'clock, but that changed"), không dùng "It is not 25."
- Bỏ hẳn loại trừ khi câu hỏi ở dạng phủ định hoặc khi phương án sai đã xuất hiện trong câu chứa đáp án.
- Thêm bộ câu chat và câu mở đầu theo chủ đề của đề (school, food, travel, environment...) để mỗi script có ngữ cảnh riêng, vẫn deterministic theo hash để không đổi giữa các lần render.

### 4. Xác nhận
Chạy `scripts/audit_cambridge_exams.ts` cho tới khi `Issues: 0` với các luật mới, và mở 1 đề mỗi cấp (Starters, Movers, Flyers, KET, PET) trong preview để đọc lại script + câu hỏi + phần Review answer.

## Ghi chú kỹ thuật
- Không thay đổi số câu, thứ tự câu hay đáp án đúng, nên tiến độ và thang CEFR của học sinh không bị ảnh hưởng.
- Toàn bộ nội dung mới không dùng dấu gạch dài, giữ giải thích song ngữ Anh - Việt.

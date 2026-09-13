# Gộp các chủ đề trùng trong Speaking Coach

## Hiện trạng đã xác minh

Speaking Coach có 284 chủ đề cho 6 ngôn ngữ. Khi đối chiếu theo tên hiển thị, có nhiều chủ đề trùng tên:

- Tiếng Anh: 66 chủ đề, 5 nhóm trùng tên tiếng Việt (Công nghệ & Internet, Ẩm thực & Nấu ăn, Sức khỏe & Thể chất, Giáo dục & Học tập, Cảm xúc).
- Tiếng Phần Lan: 52 chủ đề, 5 nhóm trùng (Sức khỏe x3, Công việc x3, Ẩm thực, Gia đình, Công nghệ).
- Tiếng Thụy Điển: 60 chủ đề, 1 nhóm trùng (Cơ thể & cảm giác).
- Tiếng Trung: 39 chủ đề, 8 nhóm trùng (Sức khỏe x4, Mua sắm x3, Công nghệ x3, Du lịch, Công việc, Giáo dục, Môi trường, Gia đình).
- Tiếng Việt: 37 chủ đề, 9 nhóm trùng (Gia đình x3, Công nghệ x3, Ẩm thực, Du lịch, Công việc, Giáo dục, Sức khỏe, Mua sắm, Cảm xúc).
- Tiếng Nhật: 30 chủ đề, không trùng.

Tổng cộng 36 chủ đề dư thừa. Hiện hệ thống chỉ làm cho mã chủ đề khác nhau (thêm hậu tố -v2, -v3) chứ không gộp nội dung, nên người học thấy cùng một tên chủ đề nhiều lần với số câu khác nhau.

## Cách xử lý đã chốt

Gộp theo tên chủ đề trong cùng một cấp độ, và ghi rõ cấp độ trong tên khi cùng tên xuất hiện ở nhiều cấp độ.

- Các chủ đề cùng tên và cùng cấp độ được gộp thành một chủ đề duy nhất.
- Nếu sau khi gộp, một tên vẫn còn ở nhiều cấp độ (ví dụ Ẩm thực & Nấu ăn ở A1 và B1), tên hiển thị sẽ có thêm cấp độ: "Ẩm thực & Nấu ăn (A1)" và "Ẩm thực & Nấu ăn (B1)". Tên chỉ ở một cấp độ thì giữ nguyên, không thêm gì.
- Chủ đề gộp giữ mã, biểu tượng và thứ tự của bản xuất hiện đầu tiên, để tiến độ và điểm đã lưu không bị mất.
- Câu trong chủ đề gộp được xếp theo thứ tự gốc và loại bỏ câu lặp lại nội dung; mã câu giữ nguyên.
- Số câu, thanh tiến độ và huy hiệu của chủ đề gộp được tính lại trên toàn bộ câu sau khi gộp.
- Hình minh họa chủ đề vẫn khớp vì nhận diện theo từ khóa nội dung.

Sau khi gộp, mỗi ngôn ngữ giảm số thẻ nhưng tổng số câu luyện không giảm (trừ các câu trùng nội dung bị bỏ).

## Chi tiết kỹ thuật

- Thêm `src/data/speakingCoachMerge.ts`: `mergeSpeakingThemes(themes)` gộp theo khóa `normalize(name) + level`, giữ theme đầu tiên làm gốc, nối `sentences` và loại trùng theo `text` đã chuẩn hóa; sau đó với mỗi khóa tên còn nhiều cấp độ thì thêm hậu tố `(LEVEL)` vào `name` và `nameVi`.
- Áp dụng trong `src/data/speakingCoachData.ts` ngay sau `dedupeSpeakingThemes(...)` cho cả 6 ngôn ngữ, giữ nguyên `applyTopUps` và thứ tự hiện tại. Không đổi `SpeakingTheme` interface, route, hay khóa localStorage.
- Mở rộng `scripts/audit_speaking_coach.ts`: báo lỗi khi còn hai chủ đề cùng `name` hoặc cùng `nameVi` trong một ngôn ngữ, và in số chủ đề/câu sau khi gộp.
- Thêm test trong `src/test/speakingCoach.test.ts`: gộp cùng tên cùng cấp độ, giữ mã theme đầu tiên, loại câu trùng text, thêm hậu tố cấp độ khi tên nằm ở nhiều cấp độ.
- Nghiệm thu: `npx tsgo --noEmit`, `npx vitest run`, `npx tsx scripts/audit_speaking_coach.ts`, và kiểm tra trình duyệt `/speaking-coach/english`, `/speaking-coach/chinese`, `/speaking-coach/vietnamese` (desktop và 390x844) xem danh sách chủ đề không còn tên lặp.

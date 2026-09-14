# Nâng cấp "Speak with Mr. Hai"

## Vấn đề đang thấy
1. Ô hội thoại không tự cuộn xuống khi có câu mới, phải kéo tay.
2. Vẫn còn khung nhập chữ, học viên có thể gõ thay vì nói.
3. Câu nói bị cắt: phần chữ đang hiện dở dang khi bấm Dừng sẽ bị mất, và máy tự kết thúc lượt khi học viên ngập ngừng vài giây.
4. Giọng Mr. Hai là giọng nữ, không đúng nhân vật nam.

## Sẽ làm

### 1. Tự cuộn xuống câu mới
- Ô hội thoại luôn cuộn tới câu mới nhất khi Mr. Hai trả lời, khi câu của học viên được thêm vào, và khi hiện trạng thái "đang suy nghĩ".
- Nếu học viên đang cuộn lên đọc lại thì không giật xuống; hiện nút "Xuống câu mới nhất" để tự bấm.

### 2. Chỉ luyện nói, bỏ nhập chữ
- Bỏ hoàn toàn khung nhập chữ và nút gửi trong hoạt động này.
- Thay bằng thanh điều khiển nói: nút lớn "Nói"/"Dừng", đồng hồ giây, và ô hiển thị trực tiếp câu đang được nhận diện (hiện đầy đủ, không cắt một dòng như hiện nay).
- Có nút "Nói lại lượt này" để xoá bản nhận diện và nói lại trước khi gửi.
- Trên trình duyệt không hỗ trợ microphone: hiện thông báo rõ ràng và hướng dẫn dùng Chrome/Edge, không mở lại khung chữ.

### 3. Nhận diện đầy đủ hơn cả câu
- Không tự gửi lượt khi học viên ngừng nói giữa câu: lượt chỉ được gửi khi học viên bấm Dừng, hoặc sau một khoảng lặng dài hơn hiện nay.
- Giữ lại cả phần chữ chưa được chốt (đang hiện mờ) khi kết thúc lượt, nên câu cuối không bị mất.
- Tự khởi động lại nhận diện khi trình duyệt tự dừng giữa lượt, nối tiếp vào cùng một câu thay vì bắt đầu lại.
- Tăng thời lượng tối đa mỗi lượt để nói câu dài; thêm nhắc nhẹ khi gần hết thời lượng.
- Ghép các đoạn nhận diện thành câu sạch: bỏ chữ lặp ở chỗ nối, chuẩn hoá khoảng trắng và dấu câu.

### 4. Giọng nam cho Mr. Hai
- Mr. Hai dùng giọng đọc nam chất lượng cao qua AI của Lovable cho cả 6 ngôn ngữ (Anh, Trung, Nhật, Phần Lan, Thụy Điển, Việt).
- Nếu giọng AI lỗi hoặc hết lượt, quay về giọng đọc sẵn có của hệ thống nhưng ưu tiên chọn giọng nam của thiết bị.
- Vẫn giữ quy tắc mỗi câu chỉ phát một lần, đổi hoạt động hoặc rời trang là dừng tiếng ngay.

### 5. Nâng cấp thêm cho phần này
- Nhắc lượt rõ ràng: khi Mr. Hai nói xong sẽ hiện "Đến lượt bạn nói" thay vì học viên phải đoán.
- Hiện số lượt đã nói và số từ đã nói ngay trong phiên, không phải chờ tới tổng kết.
- Nút nghe lại từng câu của Mr. Hai và nghe chậm hơn một cấp cho câu khó.
- Thẻ trạng thái và avatar giữ nguyên nhưng đồng bộ đúng với trạng thái nghe/nói/suy nghĩ mới.
- Giao diện gọn trên điện thoại 390px: thanh nói cố định dưới ô hội thoại, không tràn ngang.

## Kỹ thuật
- `SpeakWithMrHaiMode.tsx`: bỏ `PromptInput`, thêm thanh nói riêng; thêm hiệu ứng cuộn tự động có phát hiện học viên đang cuộn tay.
- `useSpeechRecognizer.ts`: thêm tuỳ chọn không tự chốt lượt khi im lặng, gộp phần interim vào kết quả cuối, nối lại phiên khi `onend` xảy ra sớm; các chế độ nói khác giữ nguyên hành vi mặc định.
- Thêm hàm ghép transcript và làm sạch trong `src/lib/mrHaiVoicePractice.ts` kèm test.
- Thêm chức năng đọc giọng nam ở backend (Lovable AI text-to-speech, giọng nam) và bộ chọn giọng nam cho phương án dự phòng của trình duyệt; khoá riêng tư chỉ nằm ở backend.
- Giữ nguyên đường dẫn `/speaking-coach/:language`, khoá lưu tiến độ, ghi nhận hoạt động và hợp đồng của chức năng `speak-with-mr-hai`.

## Kiểm tra
- Chạy TypeScript, lint, test Speaking Coach và test mới cho phần ghép transcript.
- Kiểm tra thực tế: nói nhiều lượt tiếng Anh và một ngôn ngữ khác, xác nhận cuộn tự động, không còn ô nhập chữ, câu dài không bị cắt, giọng Mr. Hai là giọng nam.
- Kiểm tra desktop 1280px và mobile 390px, và xác nhận rời trang thì micro và tiếng đều tắt.

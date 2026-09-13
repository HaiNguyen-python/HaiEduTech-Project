# Nâng cấp Speaking Coach với hình nền và Speak with Mr. Hai

## Mục tiêu
- Làm phần đầu trang Speaking Coach trực quan hơn bằng hình minh họa giáo dục phù hợp ngôn ngữ đang học.
- Thêm hoạt động thứ sáu **Speak with Mr. Hai** cho cả 6 ngôn ngữ: Anh, Trung, Nhật, Phần Lan, Thụy Điển và Việt.
- Giữ nguyên Free Talk, các hoạt động, đường dẫn, dữ liệu tiến độ và chức năng chấm phát âm hiện có.

## Trải nghiệm mới

### 1. Hình minh họa ở đầu trang
- Thiết kế lại khu vực “Speaking Coach - [Language]” thành banner có hình nền minh họa, chữ luôn rõ trên cả sáng và tối.
- Dùng phong cách chibi giáo dục đồng bộ với bộ hình Speaking Coach hiện tại, có Mr. Hai và học viên đang luyện hội thoại.
- Thay đổi chi tiết phụ theo từng ngôn ngữ nhưng giữ nhận diện Royal Blue, Emerald và Warm Gold.
- Cố định tỷ lệ và điểm lấy nét ảnh để không che chữ hoặc bị cắt nhân vật trên điện thoại.

### 2. Hoạt động “Speak with Mr. Hai”
- Thêm thẻ mới trong Overview và nút chuyển nhanh trong Practice.
- Mở một phòng hội thoại riêng gồm avatar Mr. Hai, chủ đề, lịch sử trò chuyện và cụm điều khiển microphone.
- Học viên chọn tình huống gợi ý hoặc nhập tình huống tự do, sau đó nói trực tiếp với Mr. Hai.
- Hỗ trợ các tình huống như làm quen, trường học, du lịch, phỏng vấn, công việc, đời sống và hội thoại tự do.
- Có cấp độ A1-C1; Mr. Hai tự điều chỉnh độ dài câu, tốc độ và độ khó theo cấp độ.

### 3. Hội thoại voice mode hai chiều
- Luồng theo lượt rõ ràng: **Mr. Hai chào và hỏi → học viên nói → hệ thống nhận lời nói → Mr. Hai suy nghĩ → trả lời bằng giọng nói → tự sẵn sàng cho lượt tiếp theo**.
- Dùng nhận diện giọng nói theo đúng ngôn ngữ đang học và hiển thị transcript trực tiếp để học viên kiểm tra.
- Mr. Hai trả lời chủ yếu bằng ngôn ngữ mục tiêu, chỉ giải thích ngắn bằng ngôn ngữ giao diện khi học viên yêu cầu hoặc bị kẹt.
- Có nút bắt đầu, tạm dừng, nói lại, nghe lại câu của Mr. Hai, kết thúc phiên và xóa phiên.
- Không tự bật microphone khi chưa có thao tác đồng ý của học viên; lỗi quyền microphone có hướng dẫn rõ ràng.
- Chống phát âm thanh trùng, dừng giọng khi đổi hoạt động/rời trang và không gửi hai lượt đồng thời.

### 4. Avatar Mr. Hai có animation
- Dùng hình avatar Mr. Hai hiện có làm nhân vật chính, không thay đổi nhận diện khuôn mặt.
- Tạo các trạng thái trực quan: chờ, lắng nghe, đang suy nghĩ, đang nói và khích lệ.
- Khi đang nói, avatar có chuyển động nhẹ ở miệng/đầu, vòng âm thanh và waveform đồng bộ với trạng thái phát audio.
- Khi đang nghe, microphone và vòng sáng phản hồi rõ; animation nhẹ, không gây rối và tôn trọng chế độ giảm chuyển động.

### 5. AI hội thoại và giọng nói
- Thêm một chức năng AI chuyên cho hội thoại Mr. Hai, nhận toàn bộ lịch sử phiên hiện tại để trả lời đúng ngữ cảnh.
- Giữ vai trò giáo viên thân thiện, hỏi từng câu ngắn, không giảng dài, không đổi chủ đề đột ngột và luôn tạo cơ hội để học viên nói nhiều hơn.
- Dùng AI chat hiện hành của Lovable cho phản hồi và giọng đọc chất lượng cao hiện có cho cả 6 ngôn ngữ.
- Chuẩn hóa đầu vào, giới hạn độ dài lịch sử, xử lý phản hồi lỗi và trả thông báo có thể thử lại thay vì làm mất phiên.
- Không đưa khóa riêng tư ra trình duyệt.

### 6. Kết thúc phiên và tiến bộ
- Cuối phiên hiển thị tóm tắt gọn: thời lượng, số lượt nói, từ đã nói, điểm mạnh, 1-3 câu nên sửa và câu mẫu nâng cấp.
- Cho phép nghe lại câu sửa và luyện nói lại ngay.
- Lưu phiên gần đây trên thiết bị cho khách; đồng bộ theo tài khoản nếu luồng tiến độ hiện tại hỗ trợ, không làm thay đổi dữ liệu cũ.
- Ghi nhận hoạt động để phần Overview và quản trị tiếp tục phản ánh tần suất luyện nói.

## Kỹ thuật
- Mở rộng kiểu hoạt động Speaking Coach bằng khóa mới riêng, không đổi các khóa hiện hữu.
- Tách giao diện phòng nói, máy trạng thái hội thoại và bộ chuẩn hóa phản hồi thành các phần nhỏ có thể kiểm thử.
- Tận dụng `useSpeechRecognizer`, `chat-tts`, hệ thống ngôn ngữ và quy tắc dừng audio hiện có; bổ sung chức năng hội thoại riêng ở backend.
- Xử lý các trạng thái `idle`, `listening`, `thinking`, `speaking`, `paused`, `error`, `ended` để tránh vòng lặp microphone/audio.
- Hình nền và avatar có ảnh dự phòng, alt text song ngữ, tải tối ưu và kích thước ổn định.

## Kiểm tra nghiệm thu
- Kiểm thử logic chuyển trạng thái, lịch sử hội thoại, giới hạn lượt, phản hồi lỗi và đổi ngôn ngữ.
- Chạy kiểm tra TypeScript, lint và test Speaking Coach hiện có.
- Kiểm tra thực tế cả 6 đường dẫn Speaking Coach: mở hoạt động, cho phép/từ chối microphone, nói nhiều lượt, nghe lại và kết thúc phiên.
- Kiểm tra desktop 1280px và mobile 390px: banner không che chữ, avatar không tràn, transcript và nút không chồng lấn.
- Xác nhận đổi tab hoặc rời trang sẽ dừng microphone và giọng nói hoàn toàn.

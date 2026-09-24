# IELTS Listening: làm giọng sáng và tự nhiên hơn

## Hiện trạng đã kiểm tra
- Cả bốn Section hiện đã tạo bản thu ở tốc độ 1.0x, nên không cần đổi nhịp nói.
- Bộ giọng hiện chọn luân phiên từ 4 giọng nữ và 4 giọng nam; trong nhóm nam có các giọng thiên trầm.
- Hướng dẫn diễn giọng mới yêu cầu giọng Anh chuẩn, nối âm và nhấn ý, nhưng chưa yêu cầu âm sắc sáng, ấm, linh hoạt và có năng lượng.

## Việc sẽ làm
1. Giữ nguyên tốc độ thu và tốc độ phát 1.0x.
2. Điều chỉnh nhóm giọng ưu tiên sang những giọng rõ, sáng và gần hội thoại đời thật hơn; vẫn giữ nam/nữ khác nhau giữa các nhân vật.
3. Cập nhật hướng dẫn diễn giọng theo từng Section:
   - Section 1-2: thân thiện, tỉnh táo, phản hồi tự nhiên, ngữ điệu linh hoạt.
   - Section 3: học thuật nhưng có tương tác, tránh đều giọng.
   - Section 4: rõ ràng và có sức hút như giảng viên thật, không quá trầm hoặc ru ngủ.
4. Không nâng cao giọng một cách nhân tạo, không làm giọng chói, hoạt hình hoặc mất chất IELTS.
5. Tăng phiên bản bản thu để thay đổi âm sắc được áp dụng, rồi tạo sẵn lại Full Test 1.
6. Nghe thử đại diện đủ 4 Section, kiểm tra chuyển nhân vật, độ rõ, độ tự nhiên và xác nhận tốc độ vẫn là 1.0x.

## Phạm vi giữ nguyên
- Không đổi nội dung, câu hỏi, đáp án, mã bài, tiến độ hoặc lịch sử học viên.
- Không thay đổi thanh điều khiển, thao tác phát/tạm dừng hoặc cơ chế phát liền mạch hiện tại.

## Chi tiết kỹ thuật
- Điều chỉnh voice pool và hướng dẫn diễn giọng trong `ieltsListeningVoices.ts`.
- Tăng `AUDIO_PROFILE_VERSION` của chức năng tạo bản thu để không dùng lại file cũ.
- Chạy kiểm tra âm thanh và tạo trước bản thu Full Test 1 sau khi triển khai.

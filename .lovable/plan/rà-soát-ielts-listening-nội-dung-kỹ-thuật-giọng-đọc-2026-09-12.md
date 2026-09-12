# Rà soát IELTS Listening: nội dung, kỹ thuật, giọng đọc

## Đã kiểm tra

- Bộ kiểm tra nội dung `scripts/validate-listening.mjs` báo **no issues**: 120 bài, 30 full test, mỗi section 30 bài, mỗi bài 10 câu, độ dài S1 625-813 / S2 777-1013 / S3 869-1080 / S4 817-1086 từ, không có câu "đọc lộ đáp án", 710 câu điền từ đều có đáp án nằm trong lời nói.
- Đáp án trắc nghiệm phân bố khá đều (A 66 / B 68 / C 66 / D 55).
- Bài nghe không có bản dịch tiếng Việt riêng nên việc viết lại nội dung không gây lệch bản dịch.
- Phòng thi Full Test dùng lại đúng bộ phát của bài lẻ, nên mọi lỗi phát bên dưới ảnh hưởng cả hai nơi.

## Lỗi còn tồn tại (cần sửa)

### 1. Thanh thời gian và tiến độ không đúng với giọng AI
Thời lượng hiện được **ước lượng theo số từ**, không lấy từ file âm thanh thật. Với giọng AI, thanh tiến độ, tổng thời lượng và thao tác kéo tới một mốc đều lệch, và trạng thái "đã nghe xong" báo sai thời điểm.

### 2. Tạm dừng rồi phát lại bị nghe lại từ đầu câu
Khi bấm tạm dừng, hệ thống phát lại **từ đầu câu đang nghe** thay vì tiếp tục đúng chỗ đã dừng, nên người học nghe lặp một đoạn - trong chế độ thi càng gây nhiễu.

### 3. Giọng đọc có thể đổi giữa bài
Bài nghe chỉ cần tải xong nhóm câu đầu là bắt đầu phát, phần sau tải nền. Nếu phần sau chưa kịp tải hoặc lỗi, bài **tự chuyển sang giọng máy giữa bài**, nghe như hai bản thu ghép lại.

### 4. Lần phát đầu quá chậm và tốn tài nguyên
Bài nghe đang được cắt theo **từng câu**, nên một bài 900 từ tạo khoảng 50-60 file giọng riêng lẻ, tạo lần lượt. Lần đầu mở bài phải chờ rất lâu. Cắt theo **lượt lời của từng người** (khoảng 15-25 đoạn) sẽ nhanh gấp ba, giọng liền mạch tự nhiên hơn và tốn ít tài nguyên hơn.

### 5. Nút tốc độ đọc bị chồng hai lần
Tốc độ đã được đặt sẵn theo từng section khi tạo giọng, sau đó lại bị nhân thêm bởi thanh tốc độ của người học, và bị chặn trong khoảng hẹp. Kết quả: chọn chậm hơn hoặc nhanh hơn không đúng như mong đợi.

### 6. Lỗi âm thanh làm bài nghe dừng hẳn
Nếu một đoạn âm thanh lỗi (mạng kém, đường dẫn hết hạn sau 6 giờ), bài nghe **dừng luôn** thay vì tự chuyển sang giọng máy để học viên nghe tiếp.

### 7. Ghi âm chưa được tạo trước
Mỗi học viên mở một bài mới đều phải chờ tạo giọng lần đầu. Nên tạo sẵn (làm nóng) các bài của Full Test 1-5 để học viên vào là nghe ngay.

## Việc sẽ làm

1. Cắt bài nghe theo lượt lời từng nhân vật (thay vì từng câu) cho phần tạo giọng, giữ nguyên cách hiện chữ và làm nổi bật đáp án.
2. Lấy thời lượng thật từ file âm thanh: thanh tiến độ, tổng thời lượng, kéo tới mốc và trạng thái "nghe xong" đều chính xác; khi dùng giọng máy vẫn giữ cách ước lượng cũ.
3. Tạm dừng và phát lại đúng vị trí đang nghe.
4. Chờ tải xong toàn bộ bài trước khi phát (kèm chỉ báo "đang chuẩn bị bản thu"), để giọng không đổi giữa bài; nếu tải thất bại thì thông báo rõ và chuyển sang giọng máy ngay từ đầu bài.
5. Nếu một đoạn lỗi giữa bài, tự đọc tiếp đoạn đó bằng giọng máy rồi quay lại giọng AI, không dừng bài.
6. Chuẩn hoá tốc độ: một nguồn duy nhất, thanh tốc độ của học viên hoạt động đúng cho cả giọng AI và giọng máy.
7. Tự xin lại đường dẫn âm thanh khi hết hạn, để buổi học dài không bị gián đoạn.
8. Tạo sẵn giọng cho 20 bài của Full Test 1-5 để lần nghe đầu không phải chờ.
9. Bổ sung kiểm tra tự động: mỗi bài có ít nhất 2 nhân vật ở section 1-3, nhãn nhân vật viết thống nhất, số điện thoại/mã bưu chính/chính tả viết ở dạng đọc rõ ràng.
10. Kiểm tra lại trên máy tính và điện thoại: nghe hết một bài lẻ và một Full Test, thử tạm dừng, kéo thanh thời gian, nộp bài, xem đáp án, giải thích và band score.

## Ghi chú kỹ thuật

- Sửa chủ yếu ở `src/components/ielts/ListeningPracticeSetCard.tsx` (đồng hồ, tiến độ, tạm dừng, dự phòng), `src/hooks/useListeningAiAudio.ts` (gộp lượt lời, chờ tải đủ, xin lại đường dẫn), `src/lib/ieltsListeningVoices.ts` (tốc độ), `scripts/validate-listening.mjs` (kiểm tra mới).
- Nội dung 120 bài trong `src/data/ieltsListeningTranscripts.ts` giữ nguyên; toàn bộ mã bài, câu hỏi, tiến độ và lịch sử làm bài không thay đổi.
- Chạy `scripts/validate-listening.mjs` và kiểm tra TypeScript sau mỗi đợt sửa.

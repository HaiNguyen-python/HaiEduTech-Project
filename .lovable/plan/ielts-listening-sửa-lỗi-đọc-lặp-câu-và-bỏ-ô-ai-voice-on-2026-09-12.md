# IELTS Listening: sửa lỗi đọc lặp câu và bỏ ô "AI voice • ON"

## Nguyên nhân đã kiểm tra trong code phát audio

Bài nghe dùng một thẻ audio duy nhất cho cả bài (`ListeningPracticeSetCard.tsx`), mỗi lượt lời là một file riêng. Có 4 chỗ khiến một câu bị nghe lại:

1. Khi đổi sang file của lượt kế tiếp, lệnh phát của lượt trước bị hủy và trả về lỗi "bị ngắt". Code hiểu đó là lỗi thật nên cho **giọng máy đọc lại đúng lượt đó** trong khi file AI vẫn đang phát - nghe thành hai lần.
2. Thẻ audio được dùng lại nên các sự kiện "kết thúc"/"lỗi" của lượt cũ vẫn còn hiệu lực; khi chúng nổ muộn, bài nhảy sai lượt hoặc phát lại lượt vừa nghe.
3. Khi một lượt chuyển sang giọng máy dự phòng, thẻ audio vẫn giữ nguyên trạng thái cũ nên có thể phát chồng lên giọng máy.
4. Bấm Play/tua nhiều lần trong lúc đang tải sẽ tạo hai luồng phát song song (mỗi luồng đọc cùng nội dung).

Ngoài ra mỗi lượt lời còn bị tải thêm một lần nữa chỉ để đo thời lượng (tạo hàng chục kết nối trùng), làm lần đầu chậm hơn cần thiết.

## Việc sẽ làm

1. **Bỏ ô "Giọng AI • ON"**: bài nghe luôn dùng giọng AI chất lượng cao, không còn nút bật/tắt. Nếu chưa tạo được âm thanh thì tự dùng giọng máy kèm dòng thông báo nhỏ, không cần người học chọn.
2. **Chặn đọc lặp**: mỗi lượt lời dùng một thẻ audio riêng biệt, gỡ hết sự kiện cũ trước khi phát lượt mới; lỗi "bị ngắt" do chuyển bài không còn bị hiểu là lỗi thật nên giọng máy không đọc chồng.
3. **Một luồng phát duy nhất**: khóa nút Play/tua trong lúc đang chuẩn bị bản thu, mọi yêu cầu phát mới hủy sạch luồng cũ (cả audio và giọng máy) trước khi bắt đầu.
4. **Dự phòng đúng cách**: chỉ chuyển sang giọng máy khi file thật sự lỗi, và chỉ đọc phần chưa nghe của lượt đó, sau đó quay lại giọng AI.
5. **Đo thời lượng từ chính file đang phát** thay vì tải lại lần hai, giúp lần nghe đầu nhanh hơn và đồng hồ vẫn chính xác.
6. **Kiểm tra lại**: chạy kiểm tra nội dung 120 bài, kiểm tra TypeScript, và thử trên trình duyệt một bài lẻ và một Full Test - nghe liền mạch, không lặp câu, tạm dừng/tiếp tục và tua đúng vị trí.

## Ghi chú kỹ thuật

- `src/components/ielts/ListeningPracticeSetCard.tsx`: bỏ state/nút `useAiVoice` và khóa localStorage `ielts-listening-ai-voice`; `playTurns` tạo `Audio` mới mỗi lượt, gán `onended/onerror = null` khi rời lượt, phân biệt `AbortError`/`NotAllowedError` với lỗi tải thật; `speak()` chỉ tăng generation một lần và bỏ qua khi đang `preparing`; xóa effect probe metadata, lấy `duration` từ `onloadedmetadata` của phần tử đang phát.
- `src/hooks/useListeningAiAudio.ts`: bỏ tham số `enabled`, luôn tải; giữ nguyên cache theo lượt lời và cơ chế xin lại link hết hạn.
- Không đổi `src/data/ieltsListeningTranscripts.ts`, không đổi set id, câu hỏi, tiến độ, route hay edge function `listening-tts`.
- Chạy `node scripts/validate-listening.mjs` và `bunx tsgo --noEmit` sau khi sửa. Comment trong code bằng tiếng Anh, không dùng gạch dài.

# Practice: nút Next luôn trong tầm mắt + chế độ học từ thứ 3 "Word Quest"

## 1. Nút Next không phải kéo lên kéo xuống

Hiện nút "Câu tiếp" chỉ nằm ở cuối khung giải thích, nên sau khi trả lời học sinh phải cuộn xuống bấm rồi cuộn ngược lên đọc câu mới.

Thay đổi:
- Ngay sau khi có kết quả (đúng/sai), hiện một thanh trạng thái dính (sticky) ở đầu khu vực câu hỏi: biểu tượng đúng/sai + đáp án ngắn + nút "Câu tiếp / Xem kết quả".
- Trên mobile thêm thanh hành động dính ở đáy màn hình với cùng nút Next, để ngón cái bấm được ngay.
- Sau khi bấm Next, tự cuộn về đầu thẻ câu hỏi để câu mới hiện trọn vẹn.
- Giữ nút Next cũ ở cuối phần giải thích (ai đọc hết vẫn bấm được), thêm phím tắt Enter / mũi tên phải cho Next.
- Thanh tiến độ nhỏ (Câu 6/20) đi cùng thanh dính để luôn thấy mình đang ở đâu.

## 2. Chế độ học từ thứ 3: "Word Quest" (học từ kiểu trò chơi)

Thêm tab thứ 4 bên cạnh Từ vựng / Flashcard / Luyện tập, tên hiển thị "Word Quest" (Chinh phục từ). Đây là chế độ học nhẹ nhàng, vui, hợp cả trẻ nhỏ, khác với Practice (kiểm tra) và Flashcard (lật thẻ).

Cách chạy: học sinh chọn một "chặng" gồm 8 từ (theo chủ đề hoặc từ đang cần ôn). Mỗi từ đi qua 4 bước ngắn, mỗi bước đúng được 1 ngôi sao:

1. Gặp từ: hiện emoji/hình minh hoạ, từ, IPA, nghĩa Việt - Anh, nghe phát âm (bấm là đọc).
2. Nhận mặt từ: chọn 1 trong 4 emoji/nghĩa đúng với từ vừa gặp (câu dễ, có gợi ý).
3. Nghe và chọn: nghe từ rồi chọn đúng chữ viết.
4. Gõ lại từ: gõ với gợi ý bậc thang (hiện dần chữ cái đầu nếu sai 2 lần), không phạt điểm.

Yếu tố vui:
- Bản đồ chặng: 8 chấm nối nhau, đi tới đâu sáng tới đó, hoàn thành chặng thì mở khoá chặng sau.
- Thanh năng lượng combo, hiệu ứng ngôi sao bay và pháo hoa nhỏ khi xong chặng (dùng lại hiệu ứng ngôi sao đang có trong dự án).
- Huy hiệu chặng và số từ chinh phục cộng vào hệ thống huy hiệu từ vựng hiện có.
- Không có đồng hồ đếm ngược, không trừ điểm - trả lời sai thì được xem lại từ rồi thử lại, ưu tiên tự tin cho trẻ.

Ghi nhận kết quả:
- Từ đi hết 4 bước được đánh dấu đã học (cùng cơ chế ⭐ hiện tại) và tính vào bộ não từ vựng, chuỗi streak, bảng xếp hạng như các chế độ khác.
- Tiến độ chặng lưu cục bộ nên vào lại vẫn tiếp tục được, đổi tab không mất.

## Ghi chú kỹ thuật
- `src/pages/IeltsVocabulary.tsx`: thanh sticky kết quả + Next, auto-scroll, phím tắt, thêm tab thứ 4 (giữ mounted như Practice).
- Component mới `src/components/vocab/WordQuest.tsx` + `src/components/vocab/QuestMap.tsx`: vòng 4 bước, bản đồ chặng, hiệu ứng sao.
- Dùng lại `src/lib/vocab/questionQuality.ts` cho phương án nhiễu công bằng, `useMasteredVocab` cho đánh dấu từ, `vocabBadges.ts` cho huy hiệu, TTS tiếng Anh sẵn có cho phát âm.
- Lưu tiến độ trong localStorage; không thay đổi cơ sở dữ liệu.

# Word Quest+ và chế độ học mới: Daily Word Mission (SRS)

## Phần 1 - Củng cố Word Quest

Hiện tại mỗi từ đi qua 4 bước (gặp từ - chọn nghĩa - nghe chọn chính tả - gõ lại), có sao/combo, bản đồ chặng 8 từ, lưu tiến trình cục bộ.

Bổ sung:
1. **Bước thứ 5 - dùng từ trong câu**: điền từ vào chỗ trống trong chính câu ví dụ (từ bị che), có word bank 3 lựa chọn. Giúp học sinh nhớ ngữ cảnh chứ không chỉ nghĩa.
2. **Ôn lại từ sai trong chặng**: từ nào trả lời sai sẽ được xếp lại cuối hàng đợi của chặng, phải làm đúng mới hoàn thành chặng.
3. **Bản đồ chặng đẹp hơn**: hiện % hoàn thành, số sao, huy hiệu chặng (Bronze/Silver/Gold theo số lần sai), và nút "Ôn lại chặng".
4. **Thanh năng lượng combo**: combo x2/x3 khi trả lời đúng liên tiếp, hiệu ứng sao bay khi hoàn thành từ, overlay chúc mừng khi xong chặng (đã có, làm mạnh hơn).
5. **Tiếp tục nơi đang dở**: lưu cả vị trí từ/bước, khi quay lại có nút "Tiếp tục chặng X".
6. **Chống nhàm chán**: xáo thứ tự các bước 2-3 giữa các từ, phát âm tự động khi mở bước nghe (đã có), thêm nút nghe chậm.

## Phần 2 - Chức năng mới: Daily Word Mission

Một tab thứ 5 trong IELTS Vocabulary: nhiệm vụ từ vựng mỗi ngày dựa trên lặp lại ngắt quãng (spaced repetition).

Cách hoạt động:
- Mỗi từ học sinh chạm tới đều có "trạng thái nhớ": lần ôn gần nhất, số lần đúng liên tiếp, khoảng cách ôn tiếp theo (1 - 3 - 7 - 16 - 35 ngày).
- Mỗi ngày hệ thống chọn: các từ **đến hạn ôn** + một ít **từ mới** (mặc định 10 ôn + 5 mới, có thể chỉnh).
- Học sinh làm một vòng ngắn (5-10 phút), mỗi từ hỏi ngẫu nhiên 1 dạng: chọn nghĩa, nghe gõ từ, điền chỗ trống, hoặc nhắc lại nhanh.
- Sau mỗi từ học sinh tự đánh giá nhanh (Quên / Khó / Dễ) như Anki, kết hợp với đúng/sai để tính khoảng ôn tiếp theo.
- Kết thúc: màn hình tổng kết - số từ đã ôn, số từ lên cấp, chuỗi ngày (streak) học từ vựng, dự báo "ngày mai có N từ cần ôn".
- Hiển thị nhắc nhở nhẹ trên tab khi có từ đến hạn (badge số lượng).
- Từ nào đạt 4 lần đúng liên tiếp sẽ tự động được đánh dấu Mastered (nối vào hệ thống sao/huy hiệu/bảng xếp hạng hiện có).

## Chi tiết kỹ thuật

- `src/lib/vocab/srsEngine.ts` (mới): mô hình SM-2 rút gọn - `nextInterval(state, grade)`, `dueWords(states, bank, today)`, lưu ở localStorage key `ielts_vocab_srs_v1` qua `safeStorage`.
- `src/components/vocab/DailyWordMission.tsx` (mới): giao diện vòng ôn, tự đánh giá, tổng kết, streak.
- `src/components/vocab/WordQuest.tsx`: thêm bước 5, hàng đợi từ sai, huy hiệu chặng, tiếp tục nơi dở; mở rộng key `ielts_word_quest_v1` (giữ tương thích ngược với dữ liệu cũ).
- `src/pages/IeltsVocabulary.tsx`: thêm tab thứ 5, giữ component mounted khi đổi tab (như Practice/Word Quest hiện nay), truyền `toggleMastered` từ `useMasteredVocab("ielts")`.
- Dùng lại `pickSmartDistractors` / `maskWord` / `isQuestionFair` trong `src/lib/vocab/questionQuality.ts` để câu hỏi công bằng.
- Không thay đổi cơ sở dữ liệu; tiến trình lưu cục bộ, việc đánh dấu Mastered vẫn đi qua đường đồng bộ sẵn có.

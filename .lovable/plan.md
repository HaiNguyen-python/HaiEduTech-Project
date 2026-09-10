# Word Quest: bài tập chuyên sâu + gom chặng thành "Set" (tất cả các môn)

Áp dụng một lần cho component dùng chung `WordQuest`, nên IELTS, tiếng Việt, HSK, tiếng Nhật, tiếng Phần Lan, tiếng Thụy Điển đều được cập nhật cùng lúc. Không đổi dữ liệu từ vựng, không đổi cơ sở dữ liệu; tiến trình cũ vẫn giữ.

## 1. Gom 10 chặng thành 1 Set

Hiện mỗi chặng 8 từ nên 1800 từ tạo ra hơn 200 ô chặng xếp dọc, màn hình dài vô tận.

- Mỗi 10 chặng gộp thành một **Set** (80 từ): "Set 1 · Chặng 1-10".
- Trang bản đồ mặc định hiện danh sách Set gọn: tên Set, chủ đề chính, % hoàn thành, số huy hiệu, trạng thái mở/khoá.
- Bấm vào một Set mới mở ra 10 ô chặng bên trong (lưới 2/4/5 cột). Có nút quay lại danh sách Set.
- Set tiếp theo mở khi Set trước hoàn thành (giữ đúng luật mở khoá theo chặng như hiện nay).
- Ghi nhớ Set đang mở và nút "Tiếp tục chặng X" nhảy thẳng vào đúng Set + chặng.

## 2. Thêm dạng bài chuyên sâu (ghi nhớ sâu hơn)

Ngoài 5 bước hiện có (gặp từ - chọn nghĩa - nghe chọn chữ - gõ lại - điền vào câu), thêm:

- **Nói lại từ (Say it back)**: bấm mic, đọc to từ (hoặc câu ví dụ ngắn); hệ thống so khớp bằng nhận dạng giọng nói của đúng ngôn ngữ môn đó, hiện % chính xác, cho thử lại, không phạt điểm. Nếu thiết bị không hỗ trợ mic thì bước này tự chuyển thành "nghe và nhắc lại" tự đánh giá.
- **Nhớ chủ động (recall)**: chỉ hiện nghĩa + emoji, học sinh tự nhớ rồi bấm "Hiện từ" và tự đánh giá Quên / Khó / Dễ.
- **Ghép chữ (word build)**: sắp xếp các chữ cái/âm tiết bị xáo trộn thành từ đúng (với tiếng Trung/Nhật dùng âm tiết romanized).
- **Chọn câu dùng đúng**: 3 câu, chọn câu dùng từ đúng ngữ cảnh (câu sai lấy từ collocation của từ khác cùng chủ đề).
- **Ôn ngược**: cho nghĩa tiếng Anh, chọn nghĩa tiếng Việt tương ứng (hoặc ngược lại) để tránh học vẹt một chiều.

## 3. Sửa cảm giác "lặp lại quá nhiều"

Nguyên nhân: mọi từ đều đi qua đúng 5 bước theo cùng một thứ tự, và bước nghe/gõ hỏi lại cùng một từ liền nhau.

Thay đổi logic:
- **Chọn bước thông minh**: mỗi từ chỉ đi qua 3 bước (từ mới: gặp từ + 2 bước khác nhau) thay vì luôn 5 bước; thứ tự và loại bước được xáo trong bộ 8 dạng nói trên, không lặp lại cùng dạng cho hai từ liền nhau.
- **Từ đã thuộc / đã học ở môn đó** thì bỏ bước "gặp từ", đi thẳng vào bước kiểm tra khó hơn (nói lại, recall, ghép chữ).
- **Xen kẽ từ**: thay vì làm xong hết 5 bước của một từ mới sang từ kế tiếp, chặng chạy theo vòng: 3 từ một lượt rồi quay lại củng cố, tạo khoảng cách ôn ngắn (hiệu quả ghi nhớ tốt hơn nhiều).
- Từ trả lời sai vẫn quay lại cuối chặng, nhưng lần quay lại dùng **dạng bài khác** với lần trước.
- Bỏ việc tự động phát âm hai lần liên tiếp cho cùng một từ.

## 4. Kỹ thuật

- `src/components/vocab/WordQuest.tsx`: tách bước thành danh sách `StepKind` (`meet`, `meaning`, `listen`, `type`, `gap`, `speak`, `recall`, `build`, `usage`, `reverse`), bộ lập kế hoạch bước (`planSteps(item, isKnown, lastKinds)`), vòng học xen kẽ 3 từ, cùng UI mới cho các bước thêm.
- Bản đồ: thêm lớp `Set` (10 chặng) + state `setIdx`; mở rộng `Progress` với `openSet`/`resume` (tương thích ngược dữ liệu `ielts_word_quest_v1` và các key môn khác).
- Bước nói dùng `src/hooks/useSpeechRecognizer.ts`; mỗi trang truyền thêm prop `speechLang` (`en-US`, `vi-VN`, `zh-CN`, `ja-JP`, `fi-FI`, `sv-SE`). Bước nói ẩn khi trình duyệt không hỗ trợ.
- Cập nhật 6 trang gọi `WordQuest` chỉ để truyền `speechLang` (`IeltsVocabulary`, `VietnameseVocabulary`, `HskVocabulary`, `Japanese`, `FinnishVocabulary`, `SwedishVocabulary`).
- Dùng lại `maskWord` / `pickSmartDistractors` trong `src/lib/vocab/questionQuality.ts` cho phương án nhiễu công bằng.
- Kiểm tra: typecheck + chạy thử trình duyệt trên máy tính và điện thoại ở 2-3 trang (bản đồ Set gọn, làm 1 chặng, bước nói, tiến trình còn khi đổi tab).

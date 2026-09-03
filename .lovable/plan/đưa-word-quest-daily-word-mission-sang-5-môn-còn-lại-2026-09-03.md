# Đưa Word Quest + Daily Word Mission sang 5 môn còn lại

Hai chế độ học từ mới (Word Quest - bản đồ chặng 5 bước, và Daily Word Mission - ôn tập lặp lại ngắt quãng) hiện chỉ có ở IELTS Vocabulary. Kế hoạch này đưa cả hai sang: tiếng Việt, tiếng Trung (HSK), tiếng Nhật, tiếng Phần Lan, tiếng Thụy Điển.

## Nguyên tắc
- Không tạo bản sao component cho từng môn. Hai component hiện tại được tổng quát hoá một lần, mỗi trang chỉ truyền "bộ chuyển đổi" (adapter) của môn mình.
- Mỗi môn có tiến trình riêng biệt (chặng, chuỗi ngày, thẻ ôn tập) - lưu cục bộ trong máy học sinh, không thay đổi cơ sở dữ liệu.
- Giọng đọc đúng ngôn ngữ: tiếng Việt, tiếng Trung, tiếng Nhật, tiếng Phần Lan, tiếng Thụy Điển đều dùng bộ đọc riêng đã có sẵn.
- Đánh dấu "đã thuộc" vẫn đi qua hệ thống hiện tại của từng môn nên bảng xếp hạng, huy hiệu và bộ não từ vựng tự cập nhật.
- Giữ nguyên các tab đang có; hai tab mới được thêm cạnh Flashcard/Practice của từng trang, và luôn giữ trạng thái khi chuyển tab.

## Nội dung câu hỏi theo từng môn
- Tiếng Việt: nghĩa, nghe - chọn chữ, điền vào câu ví dụ, gõ lại từ (có dấu).
- Tiếng Trung: hiện Hán tự + pinyin, nghe chọn Hán tự, chọn nghĩa; bước gõ chữ chuyển thành gõ pinyin (không bắt học sinh gõ Hán tự).
- Tiếng Nhật: hiện kana/kanji + romaji, nghe chọn từ, chọn nghĩa; bước gõ dùng romaji.
- Tiếng Phần Lan / Thụy Điển: nghĩa, nghe - gõ từ, điền vào câu ví dụ (dùng câu ví dụ bản ngữ đã có).

## Kỹ thuật
1. `src/lib/vocab/vocabAdapter.ts` (mới): kiểu `QuestItem` chuẩn hoá (`key`, `display`, `phonetic`, `meaningVi`, `meaningEn`, `example`, `exampleTranslation`, `level`, `category`, `pos`) + hàm `toQuestItems` cho từng nguồn dữ liệu: `VietnameseBankWord`, `HskWord`, phrase tiếng Nhật (`JA_WORD_INDEX`), `FinnishVocabWord`, `SwedishWord`, `IeltsWord`.
2. `src/components/vocab/WordQuest.tsx`: đổi sang nhận `items: QuestItem[]`, props mới `storageKey`, `speak(text, slow)`, `typingMode: "word" | "romanized" | "off"`, `t`, `onWordLearned(key)`. Logic chặng/medal/retry/resume giữ nguyên.
3. `src/components/vocab/DailyWordMission.tsx`: nhận `items`/`allItems` + `storagePrefix`, `speak`, `t`, `onWordMastered`. Bộ sinh câu hỏi dùng `QuestItem`.
4. `src/lib/vocab/srsEngine.ts`: khoá lưu trữ nhận tiền tố theo môn (`<subject>_vocab_srs_v1`, `<subject>_vocab_srs_streak_v1`) thay vì cố định IELTS; giữ tương thích khoá IELTS cũ để không mất tiến trình.
5. Cập nhật `src/pages/IeltsVocabulary.tsx` sang API mới (không đổi hành vi), rồi thêm 2 tab tương tự vào: `VietnameseVocabulary.tsx`, `HskVocabulary.tsx`, `FinnishVocabulary.tsx`, `SwedishVocabulary.tsx`, và tab Vocab của `Japanese.tsx` (kèm nhãn số từ đến hạn ôn).
6. Kiểm tra: typecheck, rồi chạy thử trình duyệt trên cả 5 trang - vào từng tab, làm 1 câu, xác nhận không có lỗi console và tiến trình còn khi chuyển tab.

## Ngoài phạm vi
- Không thêm bảng/cột cơ sở dữ liệu, không đồng bộ tiến trình SRS giữa các thiết bị (có thể làm ở bước sau nếu muốn).
- Không đổi nội dung dữ liệu từ vựng hiện có.

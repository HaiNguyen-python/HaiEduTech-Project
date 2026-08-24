# Bộ não từ vựng 3D cho tiếng Trung, Nhật, Phần Lan, Thụy Điển

Mục tiêu: mỗi trang từ vựng của 4 ngôn ngữ này có phần "Bộ não ghi nhớ" 3D ở cuối trang, giống IELTS Vocabulary: từ đã đánh dấu ⭐ là một neuron, từ mới ôn thì sáng, từ lâu không ôn thì mờ dần, từ ôn nhiều lần chìm dần vào lõi long-term.

## Những gì sẽ thấy trên giao diện

Ở cuối mỗi trang từ vựng (HSK, tiếng Nhật, tiếng Phần Lan, tiếng Thụy Điển):

- Bộ não 3D xoay được, có phiên bản 2D dự phòng nếu máy không hỗ trợ WebGL.
- Nhãn chữ hiện đúng dạng của từng ngôn ngữ: chữ Hán + pinyin (HSK), kanji/kana + romaji (Nhật), từ + IPA (Phần Lan, Thụy Điển).
- Thẻ số liệu: tổng từ đã thuộc, long-term / short-term, sắp quên trong 7 ngày, sức khỏe bộ nhớ, chuỗi ngày học.
- Bộ lọc theo mức nhớ và vùng nhớ, nút "Xem quá trình", Nhiệm vụ ôn tập hằng ngày, huy hiệu 10/50/100/300 từ long-term.
- Nút "Luyện lại ngay" chuyển sang tab Practice của chính trang đó và ưu tiên các từ sắp quên (ở những trang có bài tập trên từ đã ⭐).

## Ghi chú theo từng ngôn ngữ

- **Tiếng Trung (HSK Vocabulary)**: dùng dữ liệu ⭐ hiện có (subject `hsk`), nhãn hiển thị chữ Hán, tooltip có pinyin và nghĩa.
- **Tiếng Phần Lan (Finnish Vocabulary)**: subject `finnish-vocab` đã có sẵn ⭐, chỉ cần gắn bộ não vào cuối trang.
- **Tiếng Thụy Điển (Swedish Vocabulary)**: subject `swedish` đang lưu **id của từ** chứ không phải chính từ đó, nên nhãn sẽ được tra ngược từ id sang từ Thụy Điển để bộ não hiện chữ đúng.
- **Tiếng Nhật (trang Japanese, tab Từ vựng)**: hiện chưa có hệ thống ⭐. Sẽ thêm nút ⭐ cho từng từ trong tab Từ vựng (subject `japanese`) rồi mới gắn bộ não - không có ⭐ thì bộ não sẽ luôn trống.

Không đổi logic tính điểm bảng xếp hạng hay streak; bộ não chỉ đọc thêm dữ liệu và ghi lần ôn như IELTS đang làm.

## Chi tiết kỹ thuật

- Tái sử dụng `src/components/vocab/VocabBrainPanel.tsx` (đã nhận prop `subject`, `localWords`, `t`, `lookupWord`, `onPractice`) cùng `VocabBrain3D` / `VocabBrain2D` / `vocabBrainModel.ts`. Không tạo bản sao component.
- Panel hiện truy vấn `game_scores` với `game_type = vocab-<subject>`; các trang đã ghi `vocab-hsk`, `vocab-finnish`, nên độ chính xác Practice sẽ được map đúng bằng một prop `accuracyGameType` tùy chọn (mặc định giữ nguyên hành vi cũ) để Finnish/Swedish/Japanese không bị lệch.
- Thêm prop tùy chọn `labelOf?: (word: string) => string` để hiển thị nhãn (Swedish: id -> từ; Nhật: key -> kanji/kana), mặc định vẫn dùng chính `word`.
- Gắn panel vào: `src/pages/HskVocabulary.tsx`, `src/pages/FinnishVocabulary.tsx`, `src/pages/SwedishVocabulary.tsx`, `src/pages/Japanese.tsx` (tab Từ vựng), mỗi nơi truyền `lookupWord` từ dataset tương ứng.
- Tiếng Nhật: dùng `useMasteredVocab("japanese")` + `useMasteredMotivation` cho nút ⭐ trong danh sách từ, khớp cách HSK/Finnish đang làm. Không cần migration - `user_vocab_mastered` đã có cột `subject`.
- Ghi lần ôn: dùng `src/lib/vocabReview.ts` khi học sinh trả lời đúng trong bài tập của các trang có quiz trên từ ⭐ (HSK, Finnish, Swedish), giống IELTS.
- Bộ não được `React.lazy` + `Suspense` ở mỗi trang để không tăng bundle ban đầu.

# Rà soát 100 đề Cambridge + CEFR scale lấy thêm dữ liệu từ vựng

## Kết quả kiểm tra hiện trạng (đã chạy audit)

`bun run scripts/audit_cambridge_exams.ts` trên 100 đề cho kết quả:

- Đủ 20 đề mỗi cấp (Starters/Movers/Flyers/KET/PET), tổng 100.
- Phân bố đáp án tốt: A 22.7% · B 25.5% · C 26.6% · D 25.2%.
- Không có câu trùng, không lỗi index đáp án, đủ giải thích song ngữ, không có dấu gạch ngang dài, không lộ script nghe.
- 3 lỗi thật sự: số câu trong cùng một cấp không đều
  - flyers: 28 và 25 câu
  - ket: 30 và 25 câu
  - pet: 31 và 25 câu

Nguyên nhân: 15 đề mới (Flyers/KET/PET #16-20) chỉ có 15 câu Reading & Writing, trong khi
`CAMBRIDGE_LEVEL_TARGETS` đặt chuẩn 18 (Flyers), 20 (KET), 21 (PET). Vì % điểm dùng để tính CEFR,
đề ít câu hơn khiến điểm giữa các đề cùng cấp không so sánh được.

## Sẽ làm

### 1. Chuẩn hoá nội dung 100 đề

- Viết thêm câu Reading & Writing cho 15 đề mới để khớp chuẩn cấp độ:
  Flyers #16-20 thêm 3 câu/đề, KET #16-20 thêm 5 câu/đề, PET #17-21 thêm 6 câu/đề (tổng 70 câu mới).
- Câu mới cùng chủ đề với đề đang có, dạng chuẩn thi thật (gap-fill, chọn từ theo nghĩa, câu hỏi
  theo bài đọc đã có), đáp án A-D rải đều, giải thích song ngữ Việt/Anh.
- Rà soát lại nội dung từng cấp: chính tả, tính hợp lý của phương án nhiễu, mỗi câu chỉ có một đáp án
  đúng, script nghe khớp câu hỏi.
- Chạy lại script audit đến khi báo `Issues: 0`.

### 2. CEFR scale tính thêm dữ liệu từ vựng Cambridge YLE

Hiện biểu đồ chỉ dựa trên điểm đề thi. Sẽ bổ sung dữ liệu từ vựng:

- Nguồn: các từ học viên đã đánh dấu "mastered" ở trang Cambridge YLE Vocabulary
  (đã lưu cả local và trên cloud), gom theo cấp độ của từ (Starters → PET).
- Mỗi cấp có thêm chỉ số: số từ đã thuộc / tổng số từ của cấp đó → "vocab coverage %".
- Điểm năng lực mỗi cấp = 70% điểm đề thi + 30% vocab coverage. Nhờ vậy học viên chưa làm đề
  nhưng đã học từ vựng vẫn thấy thanh CEFR nhích lên.
- Điều kiện "đạt" một cấp: trung bình đề >= 70% trên ít nhất 2 đề **và** vocab coverage >= 50%.
- Thẻ mỗi cấp hiển thị 2 dòng: điểm đề (avg / best / số đề) và từ vựng (x/y từ).
- Câu gợi ý bước tiếp theo chỉ rõ đang thiếu phần nào: "cần luyện thêm đề" hoặc "cần học thêm N từ".
- Trạng thái rỗng: chưa có dữ liệu nào thì hiện thang CEFR mờ như hiện tại.

## Chi tiết kỹ thuật

- `src/lib/cambridgeCefrModel.ts`: thêm `vocabMastered`/`vocabTotal` vào `CefrLevelStat`,
  hằng số `EXAM_WEIGHT = 0.7`, `VOCAB_WEIGHT = 0.3`, `VOCAB_MASTERY_MIN = 50`, và tính
  `competency` dùng cho thanh thang CEFR. Giữ module thuần, không import UI.
- `src/hooks/useCambridgeCefr.ts`: đọc thêm tập từ đã thuộc của subject `cambridge-yle`
  (localStorage `vocab_mastered_cambridge-yle`, hợp nhất với `user_vocab_mastered` khi đã đăng nhập),
  map từ → cấp độ bằng `CAMBRIDGE_KIDS_WORDS_CURATED`, refresh thêm khi có event
  `vocab-mastery-updated`.
- `src/components/cambridge/CefrProgressChart.tsx`: bổ sung dòng từ vựng trên mỗi thẻ cấp độ và
  cập nhật câu gợi ý; giữ song ngữ qua `useLanguage`, dùng design token, mobile-first.
- Đề mới đặt trong đúng file dữ liệu hiện có của từng batch (`cambridgeExamsFlyers16to20.ts`,
  `cambridgeExamsKet16to20.ts`, `cambridgeExamsPet17to21.ts`), không đổi ID đề nên tiến độ đã lưu
  của học viên giữ nguyên.

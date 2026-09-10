# Rà soát luồng dữ liệu Vocabulary -> Bộ não & tính khoa học của mô hình nhớ/quên

## 1) Luồng dữ liệu hiện có (đã kiểm tra code + dữ liệu thật)

Đang ghi được vào bộ não (qua `recordVocabReviewTracked`):
- Smart Review (hàng đợi 14 ngày) - mọi môn dùng `useReviewQueue`.
- Trả lời đúng trong tab Practice của IELTS Vocabulary, và lật flashcard đã gắn sao (IELTS, HSK, Finnish, Japanese, Swedish).
- Vocab Arena (chỉ IELTS).

Chưa ghi gì cả (đây là lỗ hổng lớn nhất):
- **Word Quest** - vòng học 1 từ + 5 bài tập của cả 6 môn. Không hề gọi hàm ghi ôn tập, tiến độ chỉ nằm trong localStorage.
- **Daily Word Mission** - có lịch SRS riêng (`ielts_vocab_srs_v1`, chỉ localStorage, kèm cả `lapses`), nhưng **không** cập nhật `user_vocab_mastered`. Kết quả: web đang chạy **hai mô hình bộ nhớ song song, không nói chuyện với nhau** - lịch của Daily Mission và độ nhớ của bộ não có thể trái ngược nhau.
- Các quiz/practice của HSK, Finnish, Japanese, Swedish (chỉ flashcard mới tính).

Số liệu thật (bảng `user_vocab_mastered`):
- IELTS 4.025 từ: 2.279 từ chưa hề được ôn lần nào (trung bình 54,5 ngày không ôn), chỉ 195 từ đạt 4+ lần ôn.
- `cambridge-yle` 2.644 từ, `finnish-vocab` 244, `sat` 65, `japanese` 1 -> **0 lượt ôn** trên toàn bộ dữ liệu.
- TOEIC và Vietnamese **có** dữ liệu ôn tập nhưng trang của các môn đó **không có bộ não** để hiển thị (bộ não chỉ có ở IELTS, HSK, Finnish, Swedish, Japanese).

## 2) Mô hình khoa học: chỗ đúng và chỗ chưa ổn

Đúng: đường quên Ebbinghaus `exp(-days/stability)`, độ bền tăng theo số lần ôn và theo khoảng cách ôn (spacing effect), vùng long-term yêu cầu cả số lần lẫn độ bền.

Chưa ổn:
1. **Không ghi lần trả lời sai.** Chỉ câu đúng mới ghi ôn tập, nên độ bền chỉ tăng, không bao giờ giảm. Trong khoa học, một lần quên (lapse) phải kéo độ bền tụt xuống.
2. **Không có độ khó riêng từng từ.** Từ dễ và từ khó cùng quên với tốc độ như nhau vì công thức chỉ dùng số lần ôn.
3. **Nhồi nhét vẫn được thưởng.** 2.279 từ IELTS có khoảng cách ôn = 0 ngày; ôn 3 lần trong cùng một ngày vẫn đẩy từ sang "Đang chuyển" dù không hề có hiệu ứng giãn cách.
4. **Màu neuron không khớp với chính mô hình.** Màu 5 mức tính theo **số ngày thô** (>45 ngày = đỏ "Đã quên"), trong khi cùng panel lại hiện độ nhớ % tính theo độ bền. Một từ ôn 6 lần vẫn còn nhớ ~85% nhưng bị tô đỏ - phản khoa học và gây hoang mang.
5. **Từ của khách chưa đăng nhập luôn coi là học hôm nay** (days = 0) -> "Sức khỏe bộ nhớ" cao ảo.

## 3) Sẽ sửa những gì

### A. Nối mọi luồng học về bộ não
- Word Quest: mỗi từ hoàn thành vòng 5 bài tập -> ghi 1 lượt ôn cho đúng môn (`ielts`, `hsk`, `finnish-vocab`, `swedish`, `japanese`, `vietnamese`).
- Daily Word Mission: mỗi lần chấm điểm 1 thẻ -> ghi lượt ôn kèm kết quả đúng/sai, dùng đúng subject của môn.
- Quiz/practice của HSK, Finnish, Japanese, Swedish: trả lời đúng -> ghi lượt ôn (giống IELTS đang làm).
- Một nguồn sự thật duy nhất: mọi nơi đi qua `recordVocabReviewTracked`, không tự update bảng.

### B. Ghi cả lần sai và độ khó (sửa gốc tính khoa học)
- Thêm cột `lapse_count` và `ease` (hệ số dễ, mặc định 2.5) vào bảng từ đã thuộc; hàm ghi ôn nhận thêm `correct`.
- Sai -> `lapse_count` +1, `ease` giảm, độ bền tụt về mức thấp (từ quay lại vùng ngắn hạn). Đúng -> `ease` nhích lên theo mức tự đánh giá.
- Công thức độ bền dùng thêm `ease` và trừ theo số lần quên; ôn lại trong cùng ngày (gap 0) chỉ tính là củng cố nhẹ, không nhân độ bền.

### C. Màu sắc phản ánh đúng độ nhớ
- 5 mức màu tính theo **độ nhớ % (retention)** thay vì số ngày thô, giữ nguyên bảng màu và tên mức. Số ngày vẫn hiện trong tooltip.

### D. Đồng bộ Daily Mission với bộ não
- Lịch SRS localStorage và dữ liệu bộ não dùng cùng số lần ôn/khoảng cách: khi đăng nhập, hàng đợi "đến hạn" lấy theo `daysUntilRetention` của bộ não thay vì một lịch riêng.

### E. Bộ não cho các môn còn thiếu
- Thêm panel bộ não vào TOEIC, SAT, Vietnamese, Cambridge YLE, PTE (dùng lại component chung, chỉ truyền subject/labelOf/speak/milestones).
- Ghi chú nhỏ cho khách chưa đăng nhập: từ đánh dấu offline được tính là học hôm nay.

## Chi tiết kỹ thuật

- Migration: `alter table public.user_vocab_mastered add column lapse_count integer not null default 0, add column ease numeric not null default 2.5;` (GRANT/RLS không đổi, bảng đã có).
- `src/lib/vocabReview.ts`: `recordVocabReviewTracked(subject, words, { correct?, grade? })`, cập nhật `lapse_count`/`ease`, giữ nguyên event `vocab-review-recorded`.
- `src/components/vocab/vocabBrainModel.ts`: `memoryStability` dùng `ease`, `lapses`, bỏ thưởng gap 0; `tierForStrength(strength)` thay `tierForDays` (giữ hàm cũ cho tương thích).
- `WordQuest.tsx`, `DailyWordMission.tsx` (+ `srsEngine` khi đồng bộ), quiz của `HskVocabulary`, `FinnishVocabulary`, `Japanese`, `SwedishVocabReviewModes`.
- `VocabBrainPanel.tsx` + 3D/2D: nhận `lapses`/`ease`, tô màu theo retention.
- Không đổi route, khóa localStorage, logic ⭐ hay bảng xếp hạng.

# Vocabulary Brain: trực quan hóa Short-term vs Long-term Memory

Mục tiêu: học sinh nhìn vào bộ não là hiểu ngay "từ này đã vào bộ nhớ dài hạn chưa", "học thoáng qua thì quên nhanh thế nào", và có động lực ôn lại mỗi ngày.

## 1) Chia bộ não thành 2 vùng nhớ

- Vùng ngoài (vỏ não, sáng, gần bề mặt) = **Short-term memory**: từ mới học 1-2 lần, chưa ôn lại.
- Vùng trong (lõi sâu, hippocampus/long-term core) = **Long-term memory**: từ đã ôn nhiều lần, cách nhau nhiều ngày.
- Một từ sẽ **di chuyển dần từ ngoài vào trong** mỗi lần được ôn đúng cách. Có hiệu ứng neuron trôi vào lõi + tia sáng khi một từ "tốt nghiệp" sang long-term.
- Bộ lọc mới: Tất cả / Short-term / Đang chuyển / Long-term, kèm số lượng từ ở mỗi vùng.

## 2) Chỉ số "Memory Strength" cho từng từ

Mỗi từ có độ mạnh 0-100% tính theo đường quên Ebbinghaus:
- Số lần ôn càng nhiều và khoảng cách ôn càng dài -> độ bền càng cao (khó quên).
- Số ngày kể từ lần ôn cuối càng lớn -> độ mạnh tụt dần.
- Từ chỉ học 1 lần: tụt rất nhanh (vài ngày là dưới 40%) - đúng cảm giác "học thoáng qua thì quên".
- Từ đã ôn 5+ lần: tụt rất chậm (giữ được hàng tháng).

Khi bấm vào một neuron, panel chi tiết hiện:
- Vùng nhớ hiện tại (Short-term / Long-term), số lần ôn, lần ôn cuối.
- Độ mạnh % + **biểu đồ đường quên nhỏ**: đường cong hiện tại vs đường cong nếu ôn lại hôm nay (cho thấy lợi ích của việc ôn ngay).
- Ngày nên ôn lại tiếp theo + nút "Ôn ngay" (nhảy sang tab Practice và tính là 1 lần ôn).

## 3) Thẻ tổng quan phía trên bộ não

- Long-term words / Short-term words / Sắp quên trong 7 ngày tới.
- "Sức khỏe bộ nhớ" (memory health) = độ mạnh trung bình, dạng vòng tròn tiến độ.
- Dòng khuyến khích: "Ôn 8 từ hôm nay để giữ 92% bộ nhớ".

## 4) Tính năng thu hút học sinh

- **Daily Review Mission**: mỗi ngày hệ thống chọn các từ sắp rơi khỏi bộ nhớ, hiện dạng nhiệm vụ "Ôn 10 từ - giữ bộ não sáng". Hoàn thành -> confetti + neuron sáng bùng.
- **Consolidation streak**: chuỗi ngày ôn tập liên tục (dùng dữ liệu streak hiện có), hiện ngay trên bộ não.
- **Huy hiệu bộ nhớ**: 10 / 50 / 100 / 300 từ đã vào long-term.
- **Chế độ "Xem quá trình"**: nút play chạy hoạt ảnh 30 giây tái hiện quá trình từ vựng của học sinh di chuyển từ vỏ não vào lõi theo thời gian.
- Ngôn ngữ VI/EN theo hàm `t()` đang dùng, không dùng dấu gạch ngang dài.

## Chi tiết kỹ thuật

- Migration: thêm `review_count integer not null default 1` và `last_interval_days integer` vào `public.user_vocab_mastered` (bảng hiện chỉ có `created_at` / `reviewed_at`, không đủ để tính độ bền). Cập nhật GRANT không đổi (bảng đã có). Chỗ nào đang `update reviewed_at` (ví dụ `src/hooks/useReviewQueue.ts`, hook mastered vocab) sẽ tăng `review_count` và ghi khoảng cách ngày.
- `src/components/vocab/vocabBrainModel.ts`: thêm `memoryStrength({ days, reviews, lastInterval })` (Ebbinghaus `exp(-days/stability)`), `memoryZone()` trả về `short | consolidating | long`, và tham số bán kính trong `brainPositionFromRandoms` để neuron long-term nằm sâu hơn (radiusScale theo strength/reviews). Giữ nguyên bảng màu 5 tier hiện có.
- `VocabBrain3D.tsx` / `VocabBrain2D.tsx`: nội suy vị trí neuron theo vùng nhớ, thêm lõi long-term phát sáng, hoạt ảnh chuyển vùng, và chế độ timeline (scrub theo ngày).
- `VocabBrainPanel.tsx`: thẻ chỉ số mới, bộ lọc vùng nhớ, panel chi tiết từ với biểu đồ đường quên (SVG nhẹ, không thêm thư viện), Daily Review Mission, huy hiệu.
- Không thay đổi logic ⭐ hay bảng xếp hạng; chỉ đọc thêm dữ liệu và ghi `review_count`.

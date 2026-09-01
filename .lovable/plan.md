# Huy hiệu cột mốc từ vựng + hiệu ứng toàn màn hình

Thêm hệ thống huy hiệu theo số từ đã "mastered", hiển thị ngay cạnh tên học viên trên các bảng xếp hạng, và khi vượt mốc sẽ có hiệu ứng chúc mừng phủ toàn màn hình.

## Các mốc huy hiệu

| Mốc | Tên | Biểu tượng | Màu |
|---|---|---|---|
| 20 | Seedling | 🌱 | xanh lá nhạt |
| 50 | Spark | ✨ | vàng |
| 100 | Rising Star | ⭐ | hổ phách |
| 200 | Word Hunter | 🏹 | xanh ngọc |
| 350 | Scholar | 📚 | xanh dương |
| 500 | Master | 🔥 | cam |
| 800 | Legend | 👑 | tím gradient |
| 1200 | Immortal | 💎 | cầu vồng có ánh sáng chạy |

Huy hiệu là **tự suy ra từ điểm số** (không cần bảng mới trong database), nên tất cả học viên hiện tại có điểm sẽ thấy huy hiệu ngay lập tức.

## Hiển thị trên bảng xếp hạng

- Một pill nhỏ (icon + tên bậc) đặt ngay sau tên học viên, có tooltip "Đã thuộc N từ - còn X từ nữa lên bậc …".
- Bậc cao nhất có viền phát sáng nhẹ để nổi bật.
- Áp dụng cho: BXH từ vựng theo môn, BXH tổng từ vựng, và thẻ "You mastered N words".
- Trên mobile chỉ hiện icon để không tràn dòng.

## Hiệu ứng khi đạt mốc

Khi số từ vừa vượt một mốc:
1. Overlay toàn màn hình tối nhẹ, huy hiệu bay lên từ đáy màn hình, phóng to, xoay nhẹ rồi phát sáng.
2. Vòng sáng lan tỏa + confetti bắn từ hai bên, màu theo bậc huy hiệu.
3. Dòng chữ song ngữ: "Bạn vừa đạt huy hiệu <tên>! N từ đã thuộc".
4. Tự đóng sau ~3.5 giây hoặc khi bấm ra ngoài; tôn trọng chế độ giảm chuyển động (chỉ hiện thẻ tĩnh).
5. Mỗi mốc chỉ ăn mừng một lần cho mỗi môn (ghi nhớ trong localStorage).

## Chi tiết kỹ thuật

- `src/lib/vocabBadges.ts` (mới): danh sách mốc, `getBadgeForScore(score)`, `getNextBadge(score)`, `crossedBadges(prev, next)`.
- `src/components/VocabBadgePill.tsx` (mới): pill hiển thị cạnh tên, dùng token màu semantic của design system.
- `src/components/VocabBadgeCelebration.tsx` (mới): overlay framer-motion + `canvas-confetti`, gắn một lần ở `App.tsx`, lắng nghe sự kiện `window` `vocab-badge-earned`.
- `src/hooks/useMasteredVocab.ts`: sau khi đánh dấu từ mới, so sánh kích thước tập trước/sau, nếu vượt mốc thì `dispatchEvent("vocab-badge-earned")` và ghi khóa `vocab_badge_seen_<subject>` để không lặp lại.
- Cắm `VocabBadgePill` vào `VocabMasteryLeaderboard.tsx`, `OverallVocabLeaderboard.tsx` (dùng `score` sẵn có trong mỗi dòng).
- Không thay đổi schema, RPC hay chính sách bảo mật.

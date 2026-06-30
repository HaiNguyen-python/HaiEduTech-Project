## Vấn đề

Dữ liệu hiện tại cho thấy có hành vi "spam sao" rõ ràng:
- 1 học viên đánh dấu **1.206 từ "đã thuộc" trong 1 phút** (24/06)
- Nhiều phiên 200-400 từ/phút - không thể là học thật
- Top tháng trước có người đạt 770 từ chỉ trong vài ngày

Nguyên nhân: `useMasteredVocab.ts` và `SatStarToggle` ghi `user_vocab_mastered` / `awardPetXP` ngay khi click sao, không kiểm tra thời gian xem từ, không có cooldown, không có xác thực hiểu nghĩa.

## Giải pháp - 3 lớp bảo vệ

### Lớp 1: Chống spam ở nguồn (client + DB)

- **Cooldown 3 giây/từ**: trong `useMasteredVocab.ts`, trước khi insert kiểm tra `lastMarkedAt` - nếu < 3s từ lần đánh dấu trước thì chỉ lưu localStorage, không ghi DB và không award XP.
- **Trigger DB chặn burst**: tạo trigger trên `user_vocab_mastered` BEFORE INSERT - nếu user đã có >= 8 row trong 60 giây gần nhất thì raise exception. Đây là rào cuối cùng kể cả khi client bị bypass.
- Áp dụng tương tự cho `SatStarToggle` (chỉ award XP nếu lần toggle trước cách >= 3s).

### Lớp 2: Đếm từ "hợp lệ" thay vì đếm thô (fair count)

Tạo function `get_fair_mastered_count(user_id, start, end)`:
- Group theo `date_trunc('minute', reviewed_at)`
- **Cap tối đa 8 từ/phút** mỗi user (học thật ~5-8 từ/phút là rất nhanh rồi)
- **Cap 200 từ/ngày** mỗi user
- Trả về `valid_count` (đã cap) + `raw_count` để admin so sánh

### Lớp 3: Công thức Student of the Month công bằng hơn

Cập nhật `get_monthly_top_students` với:

```text
fair_words   = fair_mastered_count (đã cap ở Lớp 2)
fair_acts    = activities có time_spent_seconds >= 15s
                (loại bỏ click qua loa, mỗi loại activity cap 50/ngày)
fair_minutes = online_minutes nhưng cap 240 phút/ngày
                (chống mở tab cả ngày để cộng dồn)
fair_days    = login_days (giữ nguyên - khó gian lận)

Quality bonus (×1.0 - 1.3):
  + 0.10 nếu có >= 3 loại activity khác nhau trong tháng
  + 0.10 nếu có ielts/toeic/speaking scored activity với score >= 5
  + 0.10 nếu fair_days >= 10

total_score = (fair_words×1 + fair_acts×2 + fair_minutes×3 + fair_days×4) × bonus
```

### Lớp 4: Minh bạch & giám sát

- Thêm cột **"Fairness"** trong admin UI (`MonthlyTopStudents` admin view) hiển thị `raw_words / fair_words` để phát hiện chênh lệch lớn.
- Tab **"Suspicious Activity"** trong admin: list user có raw_words / fair_words > 3 (tức bị cap đáng kể).
- Trên trang chủ vẫn chỉ hiện Top 3 nhưng dùng `fair_score`.

## Kỹ thuật triển khai

**Migration:**
1. Trigger `prevent_vocab_mastered_burst` trên `user_vocab_mastered`
2. Function `get_fair_mastered_count(_uid uuid, _start ts, _end ts)` - dùng subquery với LEAST(count_per_minute, 8) rồi SUM
3. Rewrite `get_monthly_top_students` dùng các CTE fair_words / fair_acts / fair_minutes + quality bonus
4. Function `get_user_fairness_breakdown(_uid)` cho admin

**Frontend:**
5. `src/hooks/useMasteredVocab.ts` - thêm 3s cooldown + dedup queue
6. `src/components/sat/SatStarToggle.tsx` - thêm cooldown trước `awardPetXP`
7. Tạo `src/components/admin/SuspiciousActivityTab.tsx` - hiện chênh lệch raw vs fair
8. Cập nhật `MonthlySummaryCard` ghi chú "Điểm công bằng (đã loại spam)"

**Recompute:** Sau khi deploy, gọi `get_monthly_top_students(10)` để xem bảng xếp hạng mới và so sánh với hiện tại - dự kiến học viên 1.206 từ/phút sẽ tụt khỏi top.

## Không thay đổi

- Không xóa data cũ trong `user_vocab_mastered` (chỉ thay đổi cách đếm)
- Không thay đổi UX cho học viên học thật - cooldown 3s không cảm nhận được khi học bình thường
- Không động vào pet XP đã tích lũy
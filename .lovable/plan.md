

## Plan: Điều chỉnh timestamp lời bài hát khớp với video YouTube SK6rHXlKC0A

### Vấn đề
Video YouTube "Tiến Quân Ca" (ID: SK6rHXlKC0A) có phần intro nhạc trước khi lời bắt đầu. Hiện tại delay cố định 3s và timestamp ước lượng chưa chính xác, cần tinh chỉnh để lời highlight đúng lúc ca sĩ hát.

### Thay đổi (file: `src/pages/NationalAnthem.tsx`)

**1. Cập nhật `LYRICS_DELAY_MS`** từ 3000ms lên giá trị chính xác hơn dựa trên thời điểm lời bắt đầu trong video (khoảng 5-6 giây intro nhạc).

**2. Điều chỉnh timestamp từng dòng** theo thời gian thực tế trong video:

```
Dòng                                          | Cũ (s)    | Mới (s)
----------------------------------------------|-----------|----------
Đoàn quân Việt Nam đi                         | 0–4       | 0–3.5
Chung lòng cứu quốc                           | 4–7       | 3.5–6
Bước chân dồn vang trên đường gập ghềnh xa    | 7–12      | 6–11
Cờ in máu chiến thắng mang hồn nước           | 12–17     | 11–16
Súng ngoài xa chen khúc quân hành ca           | 17–22     | 16–21
Đường vinh quang xây xác quân thù             | 22–27     | 21–25
Thắng gian lao cùng nhau lập chiến khu        | 27–32     | 25–30
Vì nhân dân chiến đấu không ngừng             | 32–37     | 30–35
Tiến mau ra sa trường                          | 37–40     | 35–38
Tiến lên! Cùng tiến lên!                      | 40–44     | 38–43
Nước non Việt Nam ta vững bền.                 | 44–50     | 43–50
```

**3. Tăng `LYRICS_DELAY_MS`** lên ~5500ms (5.5 giây) để khớp phần intro nhạc trong video trước khi lời bắt đầu.

**4. Cập nhật điều kiện kết thúc** trong `startLyricsTimer` từ `prev >= 50` thành `prev >= 50` (giữ nguyên vì dòng cuối end=50).

### Phạm vi
- Chỉ sửa 1 file: `src/pages/NationalAnthem.tsx`
- Chỉ thay đổi dữ liệu timestamp và hằng số delay
- Không thay đổi logic hay UI


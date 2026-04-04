

## Plan: Chỉnh timestamp 4 câu đầu cho lời chạy sớm hơn (trước nhạc)

### Vấn đề
4 dòng đầu tiên hiện highlight **chậm hơn** so với nhạc — chữ đi sau tiếng hát. Cần đẩy timestamp sớm hơn khoảng 1-2 giây để lời xuất hiện đúng lúc hoặc hơi trước khi ca sĩ hát.

### Thay đổi (file: `src/pages/NationalAnthem.tsx`)

Chỉ cập nhật timestamp 4 dòng đầu trong mảng `lyricsLines`:

| Dòng | Cũ (s) | Mới (s) |
|------|--------|---------|
| Đoàn quân Việt Nam đi | 0–3.5 | 0–2.5 |
| Chung lòng cứu quốc | 3.5–6 | 2.5–4.5 |
| Bước chân dồn vang trên đường gập ghềnh xa | 6–11 | 4.5–9 |
| Cờ in máu chiến thắng mang hồn nước | 11–16 | 9–14 |

Đồng thời điều chỉnh dòng 5 để nối tiếp mượt: start từ 14 thay vì 16.

Các dòng 6-11 giữ nguyên hoặc dịch nhẹ tương ứng.

### Phạm vi
- 1 file duy nhất: `src/pages/NationalAnthem.tsx`
- Chỉ thay đổi giá trị `start`/`end` trong mảng `lyricsLines`
- Không thay đổi `LYRICS_DELAY_MS` hay logic khác




## Hai vấn đề cần fix

### 1. Hán tự không hiển thị nét bút (List view)
**Nguyên nhân**: Cả 2 CDN tải dữ liệu nét bút (`cdn.jsdelivr.net` và `unpkg.com` cho `hanzi-writer-data`) đều bị fail (xác nhận qua network logs — tất cả request đều "Failed to fetch", có thể do CORS/blocked). Component `HanziStrokeOrder` rơi vào nhánh fallback → chỉ render chữ tĩnh, không có hoạt ảnh.

### 2. Flashcard bị chữ chồng chữ
**Nguyên nhân**: Trong `HskFlashcard`, mặt trước render đồng thời:
- `<HanziStrokeOrder character={word.character} size={80} />` (hiển thị 1 ký tự lớn)
- `<h3 className="text-4xl font-bold">{word.character}</h3>` (hiển thị lại y hệt)

→ Hai chữ giống nhau xếp chồng dọc → trông rối.

---

## Giải pháp

### Fix 1: Stroke order — đổi nguồn data + tự động animate

**File**: `src/components/HanziStrokeOrder.tsx`
- Thêm CDN dự phòng đáng tin cậy hơn (`cdnjs.cloudflare.com` và `esm.sh`) trước 2 CDN hiện tại.
- **Tự động chạy animation** sau khi load xong (delay nhẹ ~400ms), thay vì chờ user click — vì hiện tại user không hề biết phải click. Sau khi chạy xong, vẫn cho click để xem lại.
- Thêm `loop` tùy chọn (mặc định false) — chỉ chạy 1 lần auto rồi dừng ở trạng thái đầy đủ chữ, click để xem lại.
- Giữ fallback (chữ tĩnh) nếu mọi CDN đều fail.
- Cập nhật label hint: "Click để xem lại nét bút" sau lần auto-play.

### Fix 2: Flashcard — bỏ chữ trùng

**File**: `src/pages/HskVocabulary.tsx`, component `HskFlashcard` (mặt trước)
- **Xóa** dòng `<h3 className="text-4xl font-bold text-foreground">{word.character}</h3>` (chữ Hán lớn thừa ở trên).
- Giữ lại `HanziStrokeOrder` (nguồn hiển thị chữ + nét bút chính), Pinyin, badge HSK level, nút loa.
- Tăng `size` của `HanziStrokeOrder` từ `80` lên `120` để chữ vẫn nổi bật trên thẻ.

### Kết quả mong đợi
- List view & Flashcard: hiển thị chữ Hán có nét bút tự động chạy 1 lần khi load (nhờ CDN mới hoạt động + auto-animate), click để xem lại.
- Flashcard: chỉ còn 1 chữ Hán duy nhất ở giữa thẻ, không còn cảnh "chữ chồng chữ".

### Files thay đổi
- `src/components/HanziStrokeOrder.tsx` (mở rộng CDN list, auto-animate sau load)
- `src/pages/HskVocabulary.tsx` (xóa `<h3>` chữ Hán trùng trong `HskFlashcard`, tăng size stroke writer)




## Plan: Gộp chữ cái & dấu thanh, bỏ Writing Guide, thêm ảnh minh họa & hiệu ứng chúc mừng

### Thay đổi chính (file: `src/pages/VietnameseAlphabet.tsx`)

**1. Bỏ Tabs — gộp Letters và Tones vào 1 màn hình**
- Xóa component `Tabs`/`TabsList`/`TabsContent`
- Hiển thị lần lượt: grid 29 chữ cái → panel chi tiết → phần 6 dấu thanh (tone cards + tone comparison) trên cùng 1 trang cuộn

**2. Bỏ phần Writing Guide (DashedGuide)**
- Xóa component `DashedGuide` hoàn toàn
- Trong detail panel của letter, xóa block "Hướng dẫn nét viết" (lines 291-305)
- Giữ nguyên: tên chữ, IPA, nút phát âm, ví dụ từ, và nút "Luyện viết" + WritingCanvas

**3. Thêm ảnh minh họa cuối trang**
- Đặt ảnh user upload (image-118.png) vào cuối trang, trước Footer
- Hiển thị dạng full-width với rounded corners, caption mô tả "Nét đẹp giản dị của Việt Nam"

**4. Hiệu ứng chúc mừng khi viết đúng**
- Trong `WritingCanvas`, sau khi người dùng dừng vẽ (stopDraw), so sánh canvas pixel coverage với vùng ghost letter để đánh giá mức độ khớp (tỷ lệ % pixel trùng)
- Nếu coverage vượt ngưỡng (~40-50% pixel của ghost letter được tô), trigger:
  - `canvas-confetti` effect (đã có trong project qua `useMasteredMotivation`)
  - Dialog/popup chúc mừng với message ngẫu nhiên kiểu "Tuyệt vời! 🎉", "Giỏi lắm!", "Viết đẹp quá!"
- Thêm nút "Kiểm tra" trong WritingCanvas để trigger đánh giá thay vì tự động

### Layout mới (1 trang cuộn)

```text
┌─────────────────────────────────┐
│ Header + Breadcrumb             │
├─────────────────────────────────┤
│ Letter Grid (29)  │ Detail Panel│
│                   │ (no guide)  │
│                   │ + Practice  │
├─────────────────────────────────┤
│ Tones Section (6 cards)         │
│ Tone Comparison ("ma" grid)     │
├─────────────────────────────────┤
│ Illustration Image              │
│ "Nét đẹp giản dị của Việt Nam"  │
├─────────────────────────────────┤
│ Footer                          │
└─────────────────────────────────┘
```

### Chi tiết kỹ thuật

- Dùng `canvas-confetti` (đã có) cho hiệu ứng pháo hoa
- Đánh giá viết đúng: lấy pixel data từ canvas, tính overlap với ghost letter region — đây là heuristic đơn giản, không cần AI
- Ảnh minh họa sẽ được copy vào `public/` và reference bằng thẻ `<img>`
- Xóa import `Tabs`, `DashedGuide`, `Badge` nếu không còn dùng


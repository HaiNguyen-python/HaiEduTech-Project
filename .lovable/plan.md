

## Plan: Thêm mục "Bảng chữ cái tiếng Việt" vào chương trình Học tiếng Việt

### Tổng quan

Tạo trang mới `/learn-vietnamese/alphabet` hiển thị bảng chữ cái tiếng Việt đầy đủ (29 chữ cái + dấu thanh) với hình minh họa cách viết nét, phát âm TTS, và bài tập tương tác. Thêm link vào tab Language của trang Vietnamese.

### Files thay đổi

| File | Nội dung |
|------|----------|
| `src/pages/VietnameseAlphabet.tsx` | **Tạo mới** — Trang bảng chữ cái với grid 29 chữ, hướng dẫn viết nét, phát âm |
| `src/data/vietnamese/alphabetData.ts` | **Tạo mới** — Data cho 29 chữ cái + 6 dấu thanh + hướng dẫn nét viết |
| `src/pages/Vietnamese.tsx` | Thêm link card đến `/learn-vietnamese/alphabet` trong grid dưới tab Language |
| `src/App.tsx` | Thêm route `/learn-vietnamese/alphabet` |

### Chi tiết kỹ thuật

**1. Data (`alphabetData.ts`):**
- 29 chữ cái tiếng Việt: A, Ă, Â, B, C, D, Đ, E, Ê, G, H, I, K, L, M, N, O, Ô, Ơ, P, Q, R, S, T, U, Ư, V, X, Y
- Mỗi chữ gồm: `letter`, `name` (tên chữ), `ipa` (phiên âm), `exampleWord`, `exampleMeaning`, `strokeDescription` (mô tả nét viết), `strokeOrder` (số nét)
- 6 dấu thanh: sắc, huyền, hỏi, ngã, nặng, ngang — với mô tả cách viết và ví dụ

**2. Trang chính (`VietnameseAlphabet.tsx`):**
- Grid chữ cái dạng thẻ (card grid 4-6 cột), click vào để xem chi tiết
- Mỗi thẻ hiển thị: chữ cái lớn (font 4xl), tên, IPA, nút nghe phát âm (Web Speech API `vi-VN`)
- Panel chi tiết khi click: hướng dẫn nét viết bằng SVG animation (mũi tên chỉ thứ tự nét), từ ví dụ, hình minh họa Unsplash
- Section riêng cho 6 dấu thanh với biểu đồ pitch contour đơn giản (SVG)
- Nút "Luyện viết" mở canvas vẽ tay (HTML5 Canvas) để người dùng tập viết chữ

**3. Hình minh họa nét viết:**
- Sử dụng SVG inline vẽ các nét cơ bản (nét sổ, nét ngang, nét cong, nét móc) với animation `stroke-dasharray` + `stroke-dashoffset` để tạo hiệu ứng viết từng nét
- Mỗi chữ có mô tả text kèm SVG minh họa hướng viết (mũi tên nhỏ)

**4. Link từ trang Vietnamese.tsx:**
- Thêm 1 card mới vào grid 3 cột (cùng hàng với Speaking Coach, Dictation, Poetry) với icon `Pen` và gradient `from-rose-500/10`




## Plan: Thêm hình minh họa & bài thơ mới vào module Thơ Việt Nam

### 1. Thêm hình minh họa cho các bài thơ

**Cách tiếp cận:** Sử dụng AI image generation (Nano banana) để tạo hình minh họa watercolor cho mỗi bài thơ, lưu vào Lovable Cloud storage. Thêm trường `imageUrl` vào interface `VietnamesePoem`.

**File:** `src/data/vietnamese/poetryData.ts`
- Thêm `imageUrl?: string` vào interface `VietnamesePoem`
- Gán URL hình cho mỗi bài thơ sau khi generate

**File:** `src/pages/VietnamesePoetry.tsx`
- Hiển thị hình minh họa ở đầu bài thơ (trong poem detail view) với rounded corners, aspect-ratio 16:9
- Hiển thị thumbnail nhỏ trong card danh sách bài thơ

**Phong cách hình:** Watercolor Vietnamese art — phù hợp với chủ đề từng bài (sông núi cho Nam Quốc Sơn Hà, đèo núi cho Qua Đèo Ngang, sóng biển cho Sóng, v.v.)

### 2. Thêm 5 bài thơ Việt Nam mới

Các bài thơ kinh điển còn thiếu:

| Bài thơ | Tác giả | Thời kỳ |
|---------|---------|---------|
| Tây Tiến | Quang Dũng | 1948 |
| Việt Bắc | Tố Hữu | 1954 |
| Đồng chí | Chính Hữu | 1948 |
| Tự tình (II) | Hồ Xuân Hương | TK 18-19 |
| Nhớ rừng | Thế Lữ | 1934 |

Mỗi bài gồm đầy đủ: text, translation, analysis, cultural note, vocabulary (4+ từ), exercises (3 câu hỏi), và imageUrl.

### 3. Cập nhật UI hiển thị

**File:** `src/pages/VietnamesePoetry.tsx`
- **Card danh sách:** Thêm thumbnail hình minh họa phía trên mỗi card (aspect-ratio 3:2, object-cover)
- **Chi tiết bài thơ:** Hình minh họa lớn ở đầu trang, trước tiêu đề, với gradient overlay nhẹ

### Files thay đổi

| File | Action |
|------|--------|
| `src/data/vietnamese/poetryData.ts` | Thêm `imageUrl` field, thêm 5 bài thơ mới |
| `src/pages/VietnamesePoetry.tsx` | Hiển thị hình minh họa trong card + detail view |


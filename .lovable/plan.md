
Người dùng phản ánh phần Theory hiển thị format không đồng nhất: heading H2/H3 quá to so với nội dung, các đoạn text ngắn (1 dòng) bị ngắt thành nhiều "section" với heading riêng → trông rời rạc, "chữ to chữ nhỏ".

## Phân tích nguyên nhân

Nhìn ảnh chụp `/programming/cloud-strategy-cost` lesson 5:
- Mọi cụm 1-2 dòng (CAP Theorem, DBs, Networking, Spotify, Stripe, Cost…) đều render thành **H2 cực to** → mất cân đối với body text
- Đây là vì:
  1. Trong `cloudExpansion.ts`, theory dùng quá nhiều `## Heading` cho các mục ngắn lẽ ra chỉ cần **bold inline** hoặc danh sách
  2. `prose` Tailwind mặc định cho `h2 ~ 1.5em`, `h3 ~ 1.25em` → quá lớn so với `prose-sm/base` body
  3. Không có style giới hạn cho heading nhỏ, không có spacing hợp lý

## Kế hoạch sửa

### 1. Tinh chỉnh CSS Markdown trong `src/pages/ProgrammingLesson.tsx`
- Override prose heading để **đồng bộ kích thước hợp lý**:
  - `h1`: text-2xl (chỉ tiêu đề lesson, hiếm dùng)
  - `h2`: text-xl, font-bold, mt-6 mb-2, border-b nhẹ
  - `h3`: text-lg, font-semibold, mt-4 mb-2
  - `h4`: text-base, font-semibold, mt-3 mb-1
- Thêm spacing rõ ràng cho `p`, `ul`, `ol`, `table`
- Giảm gap giữa heading nhỏ và content tiếp theo
- Đảm bảo `strong` đậm rõ, `code` inline có nền nhẹ
- Bảng: viền mỏng, padding gọn, header nhạt

### 2. Chuẩn hóa cấu trúc Markdown trong data
- **`src/data/curriculum/cloudExpansion.ts`**: rà soát toàn bộ 10 lessons, đổi các `## Mục ngắn` (1-2 dòng) thành **`**Bold inline:**` hoặc gom vào danh sách bullet** để tránh mỗi câu thành 1 H2 khổng lồ
- **`src/data/curriculum/cloudLessons.ts`**: rà soát 15 lessons, áp dụng cùng nguyên tắc:
  - H2 chỉ cho các "phần lớn" (Overview, Architecture, Best Practices, Pitfalls…)
  - H3 cho subsection thực sự
  - Phần nhỏ → bold + danh sách

### 3. Quy ước chuẩn cho Theory (áp dụng đồng bộ)
```
## Section Title (large topic)
Paragraph...

### Subsection (if needed)
- bullet
- bullet

**Inline label:** short content here
```

### 4. Files chỉnh sửa
- `src/pages/ProgrammingLesson.tsx` — thêm CSS prose override
- `src/data/curriculum/cloudExpansion.ts` — chuẩn hóa heading levels
- `src/data/curriculum/cloudLessons.ts` — chuẩn hóa heading levels

Không tạo file mới, không thay đổi schema/UI khác.

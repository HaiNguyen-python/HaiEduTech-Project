

# Tách "Learn Finnish" thành 4 mục riêng biệt

Hiện tại menu **Learn Finnish** chỉ hiển thị 3 mục (Overview, YKI A2 Dashboard, AI Speaking Coach), và các mục Beginner / YKI B1 / Life in Finland chỉ xuất hiện dưới dạng nút trên hero của trang `/finnish`. Cần tách rõ thành 4 chương trình riêng và đảm bảo cả 4 đều xuất hiện trong menu Navbar.

## 1. Cập nhật Navbar (`src/components/Navbar.tsx`)

Mở rộng `finnishSubs` thành các nhóm rõ ràng, mỗi chương trình một mục riêng có icon:

```text
Learn Finnish ▾
├── 📚 Overview                 → /finnish
├── ──────────── (divider)
├── 🌱 Beginner (A1–A2)         → /finnish/beginner
├── ❄️ YKI A2 Dashboard         → /finnish/yki-dashboard
├── 🎯 YKI B1 Dashboard         → /finnish/yki-b1
├── 🇫🇮 Life in Finland          → /finnish/life-in-finland
├── ──────────── (divider)
└── 🎙️ AI Speaking Coach        → /speaking-coach/finnish
```

Dùng cùng pattern `divider` đã có trong `ieltsChildren` để nhóm trực quan.

## 2. Tái cấu trúc trang `/finnish` (`src/pages/Finnish.tsx`)

Biến trang Overview thành **landing hub** với 4 thẻ chương trình lớn, thay cho việc gom hết vào tabs YKI A2:

- **Hero** giữ nguyên ảnh Nordic, đổi tiêu đề thành "Learn Finnish — 4 Programs" và bỏ 4 nút lộn xộn hiện tại.
- **Khu vực chính**: grid 2×2 gồm 4 ProgramCard:
  1. 🌱 **Beginner (A1–A2)** — Pronunciation, Verb types, KPT, Pitfalls → `/finnish/beginner`
  2. ❄️ **YKI A2 Prep** — Vocabulary, Lessons, Mock Exams (4 skills) → `/finnish/yki-dashboard`
  3. 🎯 **YKI B1 Dashboard** — Reading, Listening, Writing, Speaking B1 → `/finnish/yki-b1`
  4. 🇫🇮 **Life in Finland** — Admin, Daily life, Tax, Healthcare → `/finnish/life-in-finland`

  Mỗi card hiển thị: icon lớn, tên chương trình (VI/EN), 3–4 bullet điểm chính, badge level, nút "Bắt đầu →".

- **Bonus row**: 1 thẻ ngang nhỏ cho 🎙️ AI Speaking Coach (Finnish) → `/speaking-coach/finnish`.

- **Loại bỏ** Tabs `Overview / Modules` hiện tại + 3 thẻ pillar YKI A2 + danh sách module Vocabulary/Lessons/Mock — các nội dung này đã thuộc trang `/finnish/yki-dashboard` rồi nên không lặp lại ở landing.

## 3. Bảo toàn route hiện có

Tất cả 4 route đã được wire trong `App.tsx` (`/finnish/beginner`, `/finnish/yki-dashboard`, `/finnish/yki-b1`, `/finnish/life-in-finland`) → không cần đổi routing, chỉ cập nhật điểm vào.

## Technical notes

- Navbar dùng `SubItem[]` với `divider: true` để chia nhóm — đã có sẵn pattern.
- ProgramCard: dùng `Card` shadcn + Framer Motion stagger (delay 0.1s mỗi card), icon emoji 4xl + Lucide phụ.
- Màu sắc: dùng semantic tokens (`bg-card`, `border-primary/20`) thay cho `#003580` hardcode để tuân thủ design tokens.
- File ảnh hero giữ nguyên `finnish-nordic-bg.jpg`.
- Bilingual VI/EN qua `useLanguage().t()`.

## Files cần sửa

- `src/components/Navbar.tsx` — mở rộng `finnishSubs` thành 6 mục có divider.
- `src/pages/Finnish.tsx` — viết lại nội dung dưới hero thành grid 4 ProgramCard, bỏ tabs cũ.

Không tạo file mới, không đụng dữ liệu curriculum.


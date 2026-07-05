# Kế hoạch – Menu Navbar + Japanese cơ bản

Mục tiêu tiết kiệm credits: tất cả thay đổi tập trung trong 2 file (`src/components/Navbar.tsx` + 1 trang Japanese mới nhỏ gọn), không tạo backend, không sinh ảnh AI.

## 1. Ẩn "EdTech Research & Design" khỏi thanh menu chính
- Trong `src/components/Navbar.tsx`, xóa mục top-level `edtech` (dòng 297–300).

## 2. Gộp vào mục **EdTech** trong Programming
- Đổi dòng 260 (`/programming/edtech`) thành một nhóm có `children` (giống pattern `prog-ai-data-group`), hover sẽ hiện 3 lựa chọn:
  - **📚 EdTech Lessons** → `/programming/edtech` (các bài học EdTech hiện có)
  - **🔬 EdTech Research** → `/edtech-research`
  - **🎨 EdTech Design** → `/dich-vu-web`

## 3. Thêm mục **Japanese** (Tiếng Nhật) + sắp xếp lại thứ tự menu
Thứ tự mới trong `baseLinks`:
`Home – About – English – Vietnamese – Chinese – Japanese – Finnish – Swedish – Programming – Your Corner`

Thêm `japaneseSubs` với các mục cơ bản trỏ tới trang `/japanese` (dạng tab):
- 🌸 Tổng quan Tiếng Nhật (`/japanese`)
- 🈶 Hiragana & Katakana (`/japanese?tab=kana`)
- 💬 Chào hỏi & Giao tiếp cơ bản (`/japanese?tab=greetings`)
- 🔢 Số đếm & Thời gian (`/japanese?tab=numbers`)
- 📖 Từ vựng N5 (`/japanese?tab=vocab`)
- ✍️ Ngữ pháp N5 cơ bản (`/japanese?tab=grammar`)

## 4. Tạo trang Japanese cơ bản
Tạo 1 file duy nhất `src/pages/Japanese.tsx` (self-contained, không cần data files riêng, để tiết kiệm credits):
- Layout: banner hồng-đỏ (sakura theme) + Tabs shadcn cho 5 chuyên mục nói trên.
- **Kana tab**: bảng Hiragana + Katakana (46 ký tự mỗi bảng) với romaji, click để nghe TTS (dùng browser `speechSynthesis` với `ja-JP` — không tốn edge function).
- **Greetings tab**: ~15 câu chào hỏi (Kanji/Kana – Romaji – Nghĩa VI/EN – nút phát âm).
- **Numbers tab**: 1–10, 11–100, cách đọc giờ/ngày.
- **Vocab tab**: ~40 từ N5 theo chủ đề (gia đình, đồ vật, động từ), có nút phát âm.
- **Grammar tab**: 6 điểm ngữ pháp N5 (は/が, です/だ, を, に/へ, ます-form, thì hiện tại/quá khứ) — mỗi điểm 1 giải thích ngắn + 2 ví dụ.
- Đăng ký route `/japanese` trong `src/App.tsx` (lazy import).

## 5. Chi tiết kỹ thuật
- Không thêm dependency, không tạo bảng DB, không dùng AI Gateway.
- TTS phát âm dùng `window.speechSynthesis` với `lang="ja-JP"` (native browser, miễn phí).
- Không đụng logic khác của navbar; chỉ 2 files thay đổi + 1 file mới:
  - `src/components/Navbar.tsx` (chỉnh mảng subs + baseLinks)
  - `src/pages/Japanese.tsx` (mới)
  - `src/App.tsx` (thêm 1 route)

## Ước tính credits
Rất nhỏ — 1 trang tự chứa + 2 edit navbar/route. Nằm gọn trong 5 daily credits.

Bạn duyệt để mình build nhé?

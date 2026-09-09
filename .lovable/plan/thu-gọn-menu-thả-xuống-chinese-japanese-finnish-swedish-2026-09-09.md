# Thu gọn menu thả xuống: Chinese, Japanese, Finnish, Swedish

## Mục tiêu
Gom các mục cùng chủ đề trong 4 menu ngôn ngữ, giống cách đã làm với Programming. Giữ nguyên toàn bộ đường dẫn, nội dung, quyền truy cập và hiệu ứng hover/màu sắc hiện có. Chỉ sửa `src/components/Navbar.tsx`.

## 1. Chinese: từ 11 mục xuống 7 mục

- Giữ riêng: Overview, Placement Test & Personalization, HSK Program (giữ nguyên nhóm con hiện tại).
- **Gom mới "🈶 Foundation Skills / 🈶 Kỹ năng nền tảng"** (groupLabel `cn-foundation-skills`):
  - Pinyin Pronunciation (`/chinese/pronunciation`)
  - Stroke Order Guide (`/chinese/strokes`)
  - Tone Drill 四声训练 (chuyển từ nhóm HSK sang, vì thuộc kỹ năng nền tảng)
- Giữ nhóm Communication Program như hiện tại.
- **Gom mới "🎯 Practice & Fun / 🎯 Luyện tập & Giải trí"** (groupLabel `cn-practice`):
  - Chinese Arcade Hub
  - Learn through Songs
  - Speaking Coach
  - Specialized Chinese

## 2. Finnish: từ 10 mục xuống 7 mục

- Giữ riêng: Overview, Placement Test & Personalization.
- **Gom mới "🎓 Study Path A1-B1 / 🎓 Lộ trình A1-B1"** (groupLabel `fi-path`):
  - Beginner (A1-A2)
  - YKI A2 Dashboard
  - YKI B1 Dashboard
- Giữ riêng: Finnish Vocabulary A1-B1, Life in Finland.
- **Gom mới "🎯 Practice & Fun / 🎯 Luyện tập & Giải trí"** (groupLabel `fi-practice`):
  - Finnish Arcade Hub
  - Learn through Songs
  - Speaking Coach
  - Specialized Finnish

## 3. Swedish: từ 9 mục xuống 6 mục

- Giữ riêng: Overview, Placement Test & Personalization.
- **Gom mới "🎓 Study Path A1-B1 / 🎓 Lộ trình A1-B1"** (groupLabel `sv-path`):
  - Swedish Beginner A1
  - Swedish YKI A2
  - Swedish YKI B1
- Giữ riêng: Svenskfinland / Life in Sweden.
- **Gom mới "📚 Learning & Skills / 📚 Học tập & Kỹ năng"** (groupLabel `sv-learning`):
  - Swedish Vocabulary A1-B1
  - Interactive Curriculum
  - Skills Lab
  - Speaking Coach

## 4. Japanese: từ 6 mục xuống 5 mục (đã có nhóm sẵn)

- Gộp 2 nhóm "Foundation" và "N5 - N4 Knowledge" thành một nhóm **"📚 Learning Program / 📚 Chương trình học"** (groupLabel `ja-learning`) gồm 6 con: Hiragana & Katakana, Greetings & Conversation, Numbers & Time, Vocabulary by Topic, Kanji by Group, N5 Grammar.
- Giữ nguyên: Overview, Placement Test & Personalization, nhóm Practice & Output (3 con).

## 5. Cập nhật phụ trong Navbar.tsx

- Thêm nhãn flyout header cho các groupLabel mới (`cn-foundation-skills`, `cn-practice`, `fi-path`, `fi-practice`, `sv-path`, `sv-learning`, `ja-learning`) trong khối mapping ở dòng ~872.
- Bỏ các divider không còn cần thiết; sửa lại nhãn Swedish "Life in Sweden" hiện đang lệch (bỏ dấu gạch dài, khoảng trắng thừa).
- Menu mobile render từ cùng mảng nên tự động theo cấu trúc mới, kiểm tra lại accordion mobile.

## Kiểm tra

- TypeScript (`bunx tsgo --noEmit -p tsconfig.app.json`).
- Browser desktop: mở từng menu, mở từng nhóm mới, xác nhận mọi đường dẫn cũ vẫn hiện và bấm được; flyout không bị khuất ở màn hình thấp.
- Browser mobile: accordion của 4 menu mở/đóng đúng.
- Không đổi route, dữ liệu, backend hay nội dung bài học.

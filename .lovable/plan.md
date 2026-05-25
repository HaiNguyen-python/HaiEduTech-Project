## Mục tiêu

Đưa **AI Academy** thành một điểm nhấn ở Home, đồng thời **tinh giản Home chỉ còn 2 trụ chính**:

1. Các **chương trình học** (English, Chinese, Programming, AI Academy)
2. Các **công cụ công nghệ hiện đại** của web (AI Grading, AI Speaking Coach, Mr. Hai Chatbot, Game Center, Skill Assessment, Student Dashboard…)

Loại bỏ các section "rời rạc" (KnowledgeHub/Scholarship, Roadmaps độc lập, SuccessMetrics dài) để Home gọn, đúng trọng tâm.

---

## Thay đổi cụ thể

### 1) Mở rộng `CoursesOverview` — thêm AI Academy thành trụ cột thứ 4

Đổi grid từ 3 cột → 4 cột (lg) / 2 cột (md) / 1 cột (mobile). Thêm card mới:

- **Icon**: `Brain` hoặc `Sparkles` (lucide)
- **Title**: "AI Academy" — "Học AI cho học sinh cấp 2–3"
- **Description**: "12 chủ đề AI thực hành với sandbox tương tác — từ Machine Learning, Computer Vision đến NLP và Capstone."
- **Tags**: `ML` · `Vision` · `NLP` · `Sandbox`
- **to**: `/programming/ai-academy`
- **Color**: gradient tím–xanh nổi bật so với 3 card hiện có
- Thêm **badge "MỚI"** góc card

### 2) Tạo section mới `ModernTechTools` (thay cho KnowledgeHub + AssessmentTool + AIGradingPreview + DashboardPreview)

Section này showcase **6 công cụ công nghệ** của web dưới dạng bento grid (2 hàng × 3 ô, responsive):


| Ô   | Công cụ                   | Link                      | Mô tả ngắn                                             |
| --- | ------------------------- | ------------------------- | ------------------------------------------------------ |
| 1   | 🎯 **AI Grading**         | `/english/ielts/writing`  | Chấm IELTS Writing tức thì, có feedback chi tiết & PDF |
| 2   | 🎙️ **AI Speaking Coach** | `/english/ielts/speaking` | Nhận diện giọng nói, đánh giá phát âm theo IPA         |
| 3   | 🤖 **Mr. Hai Chatbot**    | mở ChatBot                | Trợ lý AI 24/7, đa ngôn ngữ                            |
| 4   | 🎮 **Game Center**        | `/games`                  | Vocab Arena, Duel Battle, leaderboard công khai        |
| 5   | 📊 **Skill Assessment**   | `/assessment`             | Test 10 câu sinh Skill Profile cá nhân                 |
| 6   | 📈 **Student Dashboard**  | `/dashboard`              | Study Streak, Skill Radar, theo dõi tiến độ            |


Mỗi ô là card có icon lớn, gradient riêng theo brand (Royal Blue → Soft Emerald), hover lift, link điều hướng. Không nhúng UI thật → trang nhẹ.

### 3) Thứ tự Home mới (gọn từ 8 → 5 section)

```
1. Hero (giữ nguyên)
2. CoursesOverview (4 trụ: English / Chinese / Programming / AI Academy)
3. LearningRoadmaps (giữ — kể chuyện lộ trình từng chương trình)
4. ModernTechTools (MỚI — 6 công cụ công nghệ)
5. SuccessMetrics (rút gọn — số liệu credibility)
6. Footer
```

### 4) Bỏ khỏi Home (vẫn truy cập qua nav)

- `KnowledgeHub` (scholarship) — đã có ở nav riêng `/scholarship`
- `AssessmentTool` (giữ ở route riêng) — được giới thiệu qua ô trong `ModernTechTools`
- `AIGradingPreview` — được giới thiệu qua ô trong `ModernTechTools`
- `DashboardPreview` — được giới thiệu qua ô trong `ModernTechTools`

→ Bốn section bị bỏ này gộp lại thành **1 bento grid duy nhất** → trang ngắn hơn ~40%, mỗi tính năng vẫn có "cửa sổ" giới thiệu.

---

## Chi tiết kỹ thuật

- **File tạo mới**: `src/components/ModernTechTools.tsx` (lazy load qua `LazySection` đã có).
- **File sửa**:
  - `src/components/CoursesOverview.tsx` — thêm card AI Academy + đổi grid `md:grid-cols-3` → `md:grid-cols-2 lg:grid-cols-4`.
  - `src/pages/Index.tsx` — bỏ import & render của 4 section cũ, thêm `ModernTechTools`.
- **Design tokens**: tuân thủ semantic tokens (`bg-card`, `text-foreground`, `text-gradient`); gradient brand HSL trong `index.css`.
- **i18n**: dùng `useLanguage().t(vi, en)` cho mọi label.
- **SEO**: cập nhật JSON-LD `ItemList` trong `Index.tsx` thêm AI Academy.
- **Không động backend / migration**.

---

## Xác nhận trước khi build

- OK với việc **bỏ hẳn** KnowledgeHub/Scholarship khỏi Home (chỉ còn ở nav)?
- Giữ hay bỏ `SuccessMetrics`?
- Có muốn **trial widget nhỏ** (chấm thử 1 câu) nhúng trong ô AI Grading không, hay chỉ link sang trang riêng?

Trả lời 3 câu trên là mình bắt tay làm luôn.

&nbsp;

ok 
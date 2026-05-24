## Thay đổi tại `src/pages/AIAcademy.tsx`

### 1. Đổi tiêu đề hero
- Dòng 1237-1239: thay `"Học AI siêu vui 🚀"` → `"Chương trình khám phá AI tài năng trẻ Việt Nam 🇻🇳"`.
- Giảm size text một chút (`text-2xl sm:text-4xl`) để tiêu đề dài hiển thị đẹp trên mobile, và tăng `pr-` cho đoạn mô tả để không đè lên chibi robot.

### 2. Thêm "Cây kinh nghiệm AI" (AI Skill Tree)
Component mới `AISkillTree.tsx` đặt ngay dưới `<XPStreakHUD />` (sau dòng 1264), trước grid Track cards.

**Cấu trúc trực quan:**
```text
        🌱 Mầm AI (Lv 1)
            │
        🤖 Khám phá (Lv 2-3) ── ⭐ Bonus: Quiz Master
            │
        🧠 Tư duy máy (Lv 4-5) ── 🎨 Bonus: Sáng tạo
            │
        🚀 Kiến tạo (Lv 6-7) ── 🏆 Bonus: AI Builder
            │
        👑 AI Sensei (Lv 8) ── 💎 Bonus: Tài năng VN
```

**Hành vi & UI:**
- Render dạng cây dọc với SVG đường nối (gradient primary→emerald), mỗi nút là 1 chặng (milestone) có icon, tên, mô tả ngắn, XP yêu cầu.
- Đọc state từ `useAIAcademyXP` (đã có sẵn) — so sánh `xp` & `level` để bật trạng thái: `locked` (xám + 🔒), `current` (glow pulse + ring primary), `unlocked` (gradient + ✓).
- Nhánh phụ ("Bonus quests") gắn bên phải mỗi milestone — kích hoạt khi đạt huy hiệu/quiz tương ứng (đọc từ `progress`/`totalBadges`).
- Animation: framer-motion stagger fade-in, nút `current` có animation pulse, đường nối "fill" theo % XP đến milestone tiếp theo.
- Có header: "🌳 Cây kinh nghiệm AI — Hành trình từ Mầm non đến AI Sensei" + progress tổng (current XP / next milestone XP).
- Responsive: desktop dạng cây dọc trung tâm có nhánh, mobile dạng timeline dọc đơn giản (ẩn nhánh phụ, chuyển thành chip bên dưới).

**Dữ liệu milestone** (8 chặng, khớp 8 level của `useAIAcademyXP`):
```ts
const MILESTONES = [
  { lv: 1, xp: 0,    title: "Mầm AI",        icon: "🌱", desc: "Bắt đầu hành trình", bonus: null },
  { lv: 2, xp: 100,  title: "Khám phá",      icon: "🤖", desc: "Học khái niệm cốt lõi", bonus: { icon: "⭐", title: "Quiz Master", req: "Đạt 3 sao 3 bài" } },
  { lv: 3, xp: 250,  title: "Thực hành",     icon: "🛠️", desc: "Thử lab AI đầu tiên", bonus: null },
  { lv: 4, xp: 450,  title: "Tư duy máy",    icon: "🧠", desc: "Hiểu neural network", bonus: { icon: "🎨", title: "Sáng tạo", req: "Hoàn thành GenAI" } },
  { lv: 5, xp: 700,  title: "Ứng dụng",      icon: "⚡", desc: "Vận dụng AI thực tế", bonus: null },
  { lv: 6, xp: 1000, title: "Kiến tạo",      icon: "🚀", desc: "Tự build dự án mini", bonus: { icon: "🏆", title: "AI Builder", req: "Đạt 8 huy hiệu" } },
  { lv: 7, xp: 1400, title: "Chuyên gia trẻ",icon: "🎓", desc: "Hoàn thành Capstone", bonus: null },
  { lv: 8, xp: 2000, title: "AI Sensei",     icon: "👑", desc: "Bậc thầy AI tương lai", bonus: { icon: "💎", title: "Tài năng VN", req: "Tốt nghiệp 16 bài" } },
];
```
(XP threshold sẽ đối chiếu với hằng số sẵn có trong `useAIAcademyXP.ts` để khớp.)

### 3. File mới
- `src/components/ai-academy/AISkillTree.tsx` (~180 dòng, framer-motion + SVG inline, dùng semantic tokens `primary`/`emerald`/`muted`).

Không đụng business logic XP hiện có — chỉ là lớp visualization mới đọc từ hook.
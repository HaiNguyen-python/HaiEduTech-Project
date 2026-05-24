## AI Academy — Hero & Background Visual Upgrade

### Goals
Thay banner gradient tím phẳng bằng nền AI sống động, thêm robot chibi animate ở góc phải hero, và lớp icon AI lơ lửng nền toàn trang `/programming/ai-academy`.

### 1. Generate 2 assets (imagegen)
- `src/assets/ai-academy-hero-bg.jpg` — fast tier 1920×768: bảng mạch neon tím-fuchsia-cyan, neural nodes phát sáng, particle, không chữ.
- `src/assets/ai-chibi-robot.png` — premium tier 768×768, transparent background: chibi robot Pixar-style, mắt LED cyan to tròn, ăng-ten phát sáng, tay vẫy chào.

### 2. Refactor hero banner (`src/pages/AIAcademy.tsx`)
- Thay `bg-gradient-to-br from-purple-600 via-fuchsia-500 to-cyan-500` bằng `<img>` nền absolute + overlay gradient `from-purple-900/65 via-fuchsia-700/45 to-cyan-700/55` (giữ contrast text trắng).
- Thêm chibi robot ở `absolute right-4 bottom-2 lg:right-8` (~160px desktop, 90px mobile) wrap trong `motion.div`:
  - Float: `animate={{ y: [0,-12,0], rotate: [-3,3,-3] }}` loop 3.5s easeInOut.
  - Hover: scale 1.08.
- Giữ nguyên progress strip, breadcrumb, mọi text/contrast.

### 3. New component `src/components/ai-academy/FloatingAIIcons.tsx`
- 16 phần tử random: lucide icons (`Bot, Cpu, Brain, Sparkles, Zap, Binary, Network, CircuitBoard, Atom, Radio, Code2, Database, Wand2`) + emoji 🤖 🧠 ⚡ ✨ 🚀 🔮.
- Mỗi item: vị trí top/left % cố định seed, size 22–44px, opacity 15–28%, màu rotate trong palette `text-cyan-400 / text-fuchsia-400 / text-purple-400 / text-emerald-400`.
- Animation framer-motion: `y` drift ±18, `x` ±10, `rotate` 360, duration 9–16s random, `repeat: Infinity`, ease `easeInOut`, `delay` stagger.
- Container: `fixed inset-0 pointer-events-none z-0 overflow-hidden`.
- Render 1 lần ở đầu `<AIAcademy>` page (dưới Navbar logic).

### 4. Layering tweaks
- Wrap nội dung chính trong wrapper `relative z-10` để icon nền không che click.
- Hero `relative z-10`, ảnh nền & overlay `absolute inset-0`.
- Robot chibi có `alt="Robot trợ lý AI Academy"` cho a11y.

### 5. Constraints
- Không sửa logic quiz / progress / Supabase / TRACKS data.
- Không phá responsive grid hay semantic tokens hiện có.
- Mobile: floating icons giảm còn ~8 (qua slice), robot chibi nhỏ 80px để không che tiêu đề.
- Tôn trọng `prefers-reduced-motion` (framer-motion mặc định).

### Files touched
- ✏️ `src/pages/AIAcademy.tsx` (hero markup + import assets + mount FloatingAIIcons)
- ➕ `src/components/ai-academy/FloatingAIIcons.tsx`
- ➕ `src/assets/ai-academy-hero-bg.jpg`
- ➕ `src/assets/ai-chibi-robot.png`

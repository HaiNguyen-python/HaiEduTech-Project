## Mục tiêu
Nâng cấp trang chủ với 4 gói hiệu ứng EduTech theo phong cách **Apple-style tinh tế** — chuyển động mượt, nhẹ, không gây nhiễu, chạy 60fps và tự giảm tải trên mobile / `prefers-reduced-motion`.

---

## 1. Gói Hero Tech (`src/components/Hero.tsx`)
- **TechParticles layer**: canvas background nhẹ với ký hiệu `</>`, `{}`, `AI`, `α`, `中`, `Suomi`, `π` bay chậm, opacity 10–15%, blend `screen`. Tắt trên mobile.
- **Aurora Blob**: 2 vệt gradient `--primary` → `--accent` blur-3xl di chuyển chậm (CSS keyframes, 20s loop).
- **Typing Effect** cho 1 từ trong headline luân phiên: `AI | IELTS | Lập trình | Tiếng Trung | YKI` — dùng hook nhỏ tự viết, 1 từ duy nhất, headline còn lại tĩnh để giữ ổn định layout.
- **Spotlight follow cursor**: lớp `radial-gradient` mờ theo `mousemove` (throttled), chỉ desktop.

## 2. Gói Card Interactions
**`CoursesOverview.tsx` & `ModernTechTools.tsx`:**
- **3D Tilt nhẹ** (max ±6°) qua hook `useTilt` thuần (mousemove → CSS transform), không cần thư viện.
- **Shine sweep**: pseudo-element `::before` gradient trắng nghiêng 20°, translate khi hover (700ms ease-out).
- **Magnetic CTA**: nút "Khám phá" hút nhẹ về phía chuột (max 6px), spring transition.
- **Soft glow**: `box-shadow` theo màu gradient của card khi hover.

Tạo file dùng chung: `src/hooks/useTilt.ts`, `src/hooks/useMagnetic.ts`, `src/components/ShineCard.tsx` (wrapper áp dụng shine + tilt).

## 3. Gói Scroll & Numbers
- **Reveal stagger**: tạo `src/components/RevealOnScroll.tsx` (IntersectionObserver + framer-motion variants). Áp dụng cho `CoursesOverview`, `LearningRoadmaps`, `ModernTechTools`, `SuccessMetrics` — children fade-up lệch 80ms.
- **CountUp** cho `SuccessMetrics`: hook `useCountUp` tự viết (requestAnimationFrame, 1.5s ease-out), kích hoạt khi vào viewport.
- **SVG path draw** trong `LearningRoadmaps`: `strokeDasharray` + `strokeDashoffset` animate khi visible.
- **Section wave dividers**: thêm SVG wave/blob mềm giữa các section trong `Index.tsx` thay vì padding cứng — `src/components/SectionDivider.tsx` với 2 biến thể (wave, blob).
- **Scroll progress bar**: thanh gradient brand `fixed top-0` cao 2px theo `scrollY/scrollHeight`.

## 4. Gói Social Proof
- **Live toast giả** (sonner): `src/components/LiveActivityToasts.tsx` mount ở `Index.tsx`. Mảng tin nhắn xoay vòng mỗi 25–40s (random): "🎉 Minh vừa đạt IELTS 7.5", "🔥 Lan hoàn thành HSK 3", "✨ Khoa nhận chứng chỉ YKI A2"... Tự dừng khi tab ẩn (`document.hidden`).
- **Mr. Hai wave**: trong `ChatBot.tsx`, thêm animation `wave` (rotate -10° → 14° → 0, 1.2s) cho icon mỗi 12s khi widget đóng.
- **🔴 Live badge** trên card "Game Center" trong `ModernTechTools.tsx`: chấm đỏ pulse + text "Live".

---

## Chi tiết kỹ thuật
- **Hiệu năng**: tất cả animation dùng `transform`/`opacity`, kèm `will-change`. Particles canvas giới hạn ~30 hạt, tự huỷ khi unmount.
- **Accessibility**: bọc bằng `@media (prefers-reduced-motion: reduce)` để tắt typing, tilt, particles, aurora.
- **Mobile**: tắt particles + spotlight + tilt khi `window.innerWidth < 1024`.
- **Không thêm dependency mới** — dùng framer-motion (đã có), sonner (đã có), CSS thuần.

## Files
**Tạo mới:**
- `src/hooks/useTilt.ts`
- `src/hooks/useMagnetic.ts`
- `src/hooks/useCountUp.ts`
- `src/components/RevealOnScroll.tsx`
- `src/components/SectionDivider.tsx`
- `src/components/ShineCard.tsx`
- `src/components/TechParticles.tsx`
- `src/components/TypingHeadline.tsx`
- `src/components/ScrollProgressBar.tsx`
- `src/components/LiveActivityToasts.tsx`

**Sửa:**
- `src/components/Hero.tsx` (particles + aurora + typing + spotlight)
- `src/components/CoursesOverview.tsx` (ShineCard wrapper + magnetic CTA + reveal)
- `src/components/ModernTechTools.tsx` (ShineCard + Live badge + reveal)
- `src/components/LearningRoadmaps.tsx` (SVG path draw + reveal)
- `src/components/SuccessMetrics.tsx` (CountUp + reveal)
- `src/components/ChatBot.tsx` (wave animation cho icon đóng)
- `src/pages/Index.tsx` (SectionDivider giữa các section + ScrollProgressBar + LiveActivityToasts)
- `tailwind.config.ts` / `src/index.css` (thêm keyframes `wave`, `aurora-float`, `shine-sweep` nếu cần)

Không động backend, không thay đổi business logic.

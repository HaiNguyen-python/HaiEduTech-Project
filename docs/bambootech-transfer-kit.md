# BambooTech Transfer Kit

Tài liệu này hướng dẫn agent của project **BambooTech 🎋 Design** copy toàn bộ nội dung **EdTech Software Design** từ project nguồn **HaiEduTech** và rebrand sang BambooTech (Nordic bamboo green).

---

## 1. Cách sử dụng (dành cho user)

Trong project **BambooTech 🎋 Design**, mở chat và gõ:

> @HaiEduTech hãy đọc file `docs/bambootech-transfer-kit.md` và thực hiện đầy đủ các bước trong đó để dựng website BambooTech.

Agent BambooTech sẽ dùng cross-project tools để đọc file/asset từ HaiEduTech.

---

## 2. Files cần copy từ HaiEduTech

### 2.1 Pages
- `src/pages/EdTechWebService.tsx` (~5177 dòng) → copy thành `src/pages/Index.tsx` của BambooTech (đây sẽ là trang chủ duy nhất).

### 2.2 Components
- `src/components/edtech/CofoundersTeam.tsx` (~233 dòng)
- `src/components/edtech/AgencyLeadModal.tsx` (~157 dòng)
- Các UI components shadcn được import (button, card, dialog, tabs, accordion, badge, input, textarea, label, separator, sonner...) — cài shadcn các component đó trong BambooTech.

### 2.3 Hooks / utils dùng kèm
- `src/hooks/use-toast.ts` (nếu có import)
- `src/lib/utils.ts` (cn helper)
- Bất kỳ i18n hook nào (`useLanguage`, `LanguageContext`) nếu trang EdTech có dùng — kiểm tra import trong `EdTechWebService.tsx`.

### 2.4 Assets
Liệt kê toàn bộ `src/assets/*` được `import` bởi `EdTechWebService.tsx` và `CofoundersTeam.tsx`. Dùng:
```
rg "from ['\"]@/assets" src/pages/EdTechWebService.tsx src/components/edtech/
```
Copy từng asset bằng cross_project--copy_project_asset.

---

## 3. Loại bỏ (KHÔNG copy)

Project BambooTech chỉ là landing giới thiệu dịch vụ, nên BỎ:
- Toàn bộ auth / Supabase / Lovable Cloud (trừ khi cần form liên hệ → có thể giữ AgencyLeadModal nhưng đổi backend thành mailto: hoặc Supabase mới của BambooTech).
- Student dashboard, courses, IELTS/TOEIC/HSK/Finnish/Vietnamese modules.
- Chatbot, Notebook, Game Center, Leaderboards, Skill Assessment.
- Admin pages, Health Monitor, API Monitoring, Income Management.
- React Router routes ngoài `/` (Index).
- `App.tsx` chỉ cần render `<Index />`.

---

## 4. Nội dung chính cần giữ nguyên (từ EdTechWebService.tsx)

1. **Hero** + CTA "View service packages" / "Book consultation"
2. **Service Packages** (Starter / Growth / Enterprise hoặc các tier hiện tại)
3. **Quy trình & Công nghệ** (Process & Tech stack section đã thêm gần đây)
4. **Co-founders Team** (Mr. Hai + Trần Thanh Phúc + thành viên khác)
5. Bất kỳ section nào hiện đang nằm trên trang `/edtech-web-service`

---

## 5. Rebrand sang BambooTech Nordic

### 5.1 Brand identity
- **Tên thương hiệu:** BambooTech
- **Domain:** bambootech.fi
- **Tagline gợi ý (EN):** "Nordic-crafted EdTech & software design"
- **Tagline gợi ý (VI):** "Thiết kế phần mềm giáo dục theo chuẩn Bắc Âu"
- **Logo:** emoji 🎋 (bamboo) làm placeholder, hoặc đặt user upload sau.

### 5.2 Color palette (HSL — thay vào `src/index.css`)

```css
:root {
  /* Nordic Bamboo */
  --background: 150 30% 98%;          /* off-white with green tint */
  --foreground: 160 25% 12%;          /* deep forest */

  --primary: 142 55% 32%;             /* bamboo green #2D7A4F */
  --primary-foreground: 0 0% 100%;
  --primary-glow: 142 60% 45%;

  --secondary: 35 40% 92%;            /* warm birch */
  --secondary-foreground: 160 25% 15%;

  --accent: 168 70% 38%;              /* nordic teal */
  --accent-foreground: 0 0% 100%;

  --muted: 150 15% 94%;
  --muted-foreground: 160 10% 40%;

  --border: 150 20% 88%;
  --ring: 142 55% 32%;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, hsl(142 55% 32%), hsl(168 70% 38%));
  --gradient-soft: linear-gradient(180deg, hsl(150 30% 98%), hsl(150 25% 95%));

  /* Shadows */
  --shadow-elegant: 0 10px 30px -10px hsl(142 55% 32% / 0.25);
}

.dark {
  --background: 160 30% 6%;
  --foreground: 150 20% 95%;
  --primary: 142 60% 50%;
  --primary-foreground: 160 30% 8%;
  --accent: 168 70% 50%;
  /* ... tinh chỉnh dark mode tương tự */
}
```

### 5.3 Typography (Nordic minimal)
- **Headings:** `"Fraunces"` (serif optical, mang chất Bắc Âu) hoặc `"Space Grotesk"`
- **Body:** `"Inter"` hoặc `"DM Sans"`
- Import qua Google Fonts trong `index.html`, khai báo trong `tailwind.config.ts` (`fontFamily.heading`, `fontFamily.sans`).

### 5.4 Tone & content tweaks
- Đổi mọi reference "HaiEduTech" → "BambooTech".
- Đổi "haiedutech.com" / email cũ → `hello@bambootech.fi` (placeholder).
- Thay địa chỉ VN → thêm Finland (vd: "Tampere, Finland · Da Nang, Vietnam").
- Giữ nguyên thông tin Co-founders (Mr. Hai, Trần Thanh Phúc) — họ là team chung.
- Thay emoji branding 🇻🇳/🎓 → 🎋/❄️/🌲 cho mood Nordic.

### 5.5 Visual style
- Generous whitespace, max-width container hẹp hơn (max-w-6xl thay vì max-w-7xl).
- Subtle bamboo leaf SVG decorations (có thể generate bằng imagegen).
- Particles: thay symbols sang `{ "🎋", "🌿", "❄️", "{ }", "</>", "λ" }`.
- Card style: `border` mỏng 1px + `shadow-elegant`, hover lift nhẹ.

---

## 6. Checklist triển khai (BambooTech agent)

- [ ] Tạo `src/index.css` với palette Nordic Bamboo ở mục 5.2
- [ ] Cấu hình `tailwind.config.ts` với fonts + colors semantic
- [ ] Copy `EdTechWebService.tsx` → `src/pages/Index.tsx`, đổi tên component
- [ ] Copy `CofoundersTeam.tsx`, `AgencyLeadModal.tsx` sang `src/components/`
- [ ] Copy mọi asset từ HaiEduTech (dùng cross_project--copy_project_asset)
- [ ] Cài shadcn components cần thiết (button, card, dialog, tabs, accordion, badge, sonner, ...)
- [ ] Strip auth/dashboard/router routes thừa — `App.tsx` chỉ route `/` → Index
- [ ] Replace tất cả text "HaiEduTech" → "BambooTech"
- [ ] Update SEO: `<title>BambooTech — Nordic EdTech & Software Design</title>`, meta description, OG, JSON-LD `Organization`
- [ ] Update favicon (placeholder 🎋, user sẽ cung cấp logo sau)
- [ ] Test build, sửa lỗi import còn sót
- [ ] Verify trang load không lỗi console

---

## 7. Liên hệ / nguồn

- Project nguồn: **HaiEduTech** (chứa file gốc `src/pages/EdTechWebService.tsx`)
- Người sở hữu: Mr. Hai — hainguyen240195@gmail.com
- Mục tiêu: launch website `bambootech.fi` chuyên giới thiệu dịch vụ EdTech & software design theo phong cách Bắc Âu.

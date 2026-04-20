// Web Development curriculum — 6 industry-standard lessons (HTML, CSS, JS)
// Author: HaiEduTech · Bilingual VI/EN, paired with the Software Engineering pillar
import type { ExtendedProgrammingModule } from "./types";

export const webDevModules: ExtendedProgrammingModule[] = [
  {
    id: "web-dev-foundations",
    title: "Phát triển Web (HTML · CSS · JavaScript)",
    titleEn: "Web Development (HTML · CSS · JavaScript)",
    icon: "🌐",
    color: "from-orange-500 to-pink-600",
    description: "6 bài học từ HTML semantic, CSS hiện đại đến JavaScript & DOM — chuẩn Frontend 2026",
    descriptionEn: "6 lessons from semantic HTML, modern CSS to JavaScript & the DOM — Frontend 2026 standards",
    course: "data-ai",
    lessons: [
      // ──────────────────────────── LESSON 1: HTML ────────────────────────────
      {
        id: "web-html-semantic",
        title: "HTML Semantic — Bộ xương của trang web",
        titleEn: "Semantic HTML — The Skeleton of the Web",
        level: 1,
        difficulty: "beginner",
        codeLanguage: "html",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn vào một trang tin tức, dùng phím Tab để di chuyển — và bị "lạc" giữa hàng trăm \`<div>\` không tên. Đó là website **không semantic**: trình duyệt, Google bot và người khiếm thị đều bối rối. HTML semantic giải quyết bằng cách **đặt tên đúng cho từng vùng**.

## 2. 💡 Khái niệm chính

**HTML Semantic** = dùng thẻ HTML5 mang **ý nghĩa** thay vì \`<div>\` chung chung.

| Vùng | Thẻ semantic | Thay vì |
|---|---|---|
| Đầu trang | \`<header>\` | \`<div class="header">\` |
| Menu chính | \`<nav>\` | \`<div class="nav">\` |
| Nội dung chính | \`<main>\` | \`<div id="content">\` |
| Bài viết độc lập | \`<article>\` | \`<div class="post">\` |
| Khu vực phụ | \`<aside>\` | \`<div class="sidebar">\` |
| Cuối trang | \`<footer>\` | \`<div class="footer">\` |

## 3. 🧰 Cấu trúc một trang chuẩn

\`\`\`html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Blog Thầy Hải</title>
  </head>
  <body>
    <header><h1>HaiEduTech</h1></header>
    <nav>...</nav>
    <main>
      <article>
        <h2>Học IELTS trong 90 ngày</h2>
        <p>...</p>
      </article>
    </main>
    <footer>© 2026</footer>
  </body>
</html>
\`\`\`

## 4. 🎯 Ví dụ thực tế

Một bài blog có 3 phần: tiêu đề, nội dung, comment. Cách viết **tốt**:

\`\`\`html
<article>
  <header><h1>Tiêu đề</h1><time datetime="2026-01-20">20/01/2026</time></header>
  <section><p>Nội dung chính...</p></section>
  <section aria-label="Bình luận">...</section>
</article>
\`\`\`

Google đọc được "đây là bài viết, đây là ngày đăng" → ranking tốt hơn. Screen reader nói được "Bài viết: Tiêu đề".

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "Dùng \`<div>\` cũng được, CSS giống nhau" — đúng về hình thức, **sai** về SEO + accessibility.
> - "Mỗi trang phải có nhiều \`<h1>\`" — sai, **chỉ 1** \`<h1>\` cho toàn trang.
> - "\`<b>\` = \`<strong>\`" — sai, \`<strong>\` mang ý nghĩa "quan trọng", \`<b>\` chỉ là in đậm trang trí.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - Luôn có \`alt\` cho \`<img>\` — bắt buộc cho người khiếm thị + SEO.
> - Dùng \`<button>\` cho hành động, \`<a>\` cho điều hướng. KHÔNG dùng \`<div onclick>\`.
> - Form luôn có \`<label for="...">\` gắn với \`id\` của input.
> - **2026 trend:** Web Components + \`<dialog>\` native cho modal — không cần thư viện.

## 7. 🤔 Áp dụng

Khi viết HTML, tự hỏi: "Nếu tắt CSS, người ta vẫn hiểu cấu trúc trang không?" Nếu có → semantic tốt.

## 8. 📌 Tóm tắt 30 giây

HTML semantic = đặt **tên đúng** cho từng vùng. Lợi ích: SEO, accessibility, code dễ bảo trì.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

Open a news site, press Tab to navigate — and get lost in hundreds of nameless \`<div>\` blocks. That's a **non-semantic** site: browsers, Googlebot, and visually impaired users are all confused. Semantic HTML fixes it by **giving every region a meaningful name**.

## 2. 💡 Core Concepts

**Semantic HTML** = use HTML5 tags that carry **meaning** instead of generic \`<div>\`.

| Region | Semantic tag | Instead of |
|---|---|---|
| Page header | \`<header>\` | \`<div class="header">\` |
| Main nav | \`<nav>\` | \`<div class="nav">\` |
| Main content | \`<main>\` | \`<div id="content">\` |
| Standalone post | \`<article>\` | \`<div class="post">\` |
| Side content | \`<aside>\` | \`<div class="sidebar">\` |
| Page footer | \`<footer>\` | \`<div class="footer">\` |

## 3. 🧰 A standard page skeleton

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Teacher Hai's Blog</title>
  </head>
  <body>
    <header><h1>HaiEduTech</h1></header>
    <nav>...</nav>
    <main>
      <article>
        <h2>Master IELTS in 90 days</h2>
        <p>...</p>
      </article>
    </main>
    <footer>© 2026</footer>
  </body>
</html>
\`\`\`

## 4. 🎯 Real Example

A blog post has 3 parts: title, body, comments. The **good** way:

\`\`\`html
<article>
  <header><h1>Title</h1><time datetime="2026-01-20">Jan 20, 2026</time></header>
  <section><p>Main content...</p></section>
  <section aria-label="Comments">...</section>
</article>
\`\`\`

Google reads "this is an article, this is its date" → better ranking. Screen readers say "Article: Title".

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "Using \`<div>\` is fine, CSS is the same" — visually yes, but **wrong** for SEO and a11y.
> - "Each page can have many \`<h1>\`" — false, **only one** \`<h1>\` per page.
> - "\`<b>\` = \`<strong>\`" — false. \`<strong>\` carries semantic importance; \`<b>\` is decorative bold only.

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - Always set \`alt\` on \`<img>\` — mandatory for a11y + SEO.
> - Use \`<button>\` for actions, \`<a>\` for navigation. NEVER \`<div onclick>\`.
> - Forms always pair \`<label for="...">\` with input \`id\`.
> - **2026 trend:** Web Components + native \`<dialog>\` for modals — no library needed.

## 7. 🤔 Apply

When writing HTML, ask yourself: "If CSS is disabled, is the structure still understandable?" If yes → semantic is good.

## 8. 📌 30-Second Summary

Semantic HTML = give every region a **meaningful name**. Benefits: SEO, accessibility, maintainable code.
`,
        code: `<!-- A semantic landing page skeleton — 2026 best practices -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>HaiEduTech — Learn Smarter</title>
    <meta name="description" content="Modern learning platform for Vietnamese students." />
  </head>
  <body>
    <header role="banner">
      <h1>HaiEduTech</h1>
      <nav aria-label="Primary">
        <a href="/courses">Courses</a>
        <a href="/about">About</a>
      </nav>
    </header>

    <main id="main-content">
      <article>
        <header>
          <h2>Master IELTS in 90 Days</h2>
          <time datetime="2026-01-20">January 20, 2026</time>
        </header>
        <p>Practical tactics from a 15-year tutor.</p>
      </article>

      <aside aria-label="Related posts">
        <h3>Related</h3>
        <ul><li><a href="/post/2">SAT essay tips</a></li></ul>
      </aside>
    </main>

    <footer>
      <small>© 2026 HaiEduTech</small>
    </footer>
  </body>
</html>`,
        exercise: "Viết lại trang chủ blog cá nhân của bạn dùng đúng 6 thẻ semantic: header, nav, main, article, aside, footer.",
        exerciseEn: "Rewrite your personal blog homepage using exactly six semantic tags: header, nav, main, article, aside, footer.",
        quiz: [
          { question: "Mỗi trang HTML chuẩn nên có bao nhiêu thẻ <h1>?", options: ["0", "1", "2-3", "Bao nhiêu cũng được"], answer: 1, explanation: "Chỉ 1 <h1> duy nhất biểu thị tiêu đề chính của trang — tốt cho SEO và screen reader." },
          { question: "Thẻ nào dùng cho menu chính của site?", options: ["<menu>", "<nav>", "<ul>", "<div role='nav'>"], answer: 1, explanation: "<nav> là thẻ semantic chuẩn cho khu vực điều hướng chính." },
          { question: "Thuộc tính nào BẮT BUỘC cho thẻ <img>?", options: ["src", "alt", "title", "width"], answer: 1, explanation: "src để tải ảnh, nhưng alt là yêu cầu accessibility — bắt buộc theo WCAG." },
          { question: "Để gắn nhãn cho input, dùng cách nào?", options: ["<p>Tên</p><input>", "<label for='name'>Tên</label><input id='name'>", "<div>Tên<input></div>", "placeholder='Tên'"], answer: 1, explanation: "<label for> + input id giúp screen reader đọc đúng và tăng vùng click." },
          { question: "Phát biểu nào ĐÚNG về <strong> vs <b>?", options: ["Giống nhau", "<b> mang ý nghĩa quan trọng", "<strong> mang ý nghĩa quan trọng, <b> chỉ in đậm", "<strong> đã lỗi thời"], answer: 2, explanation: "<strong> có ý nghĩa ngữ nghĩa, <b> chỉ trang trí — screen reader nhấn mạnh <strong>." }
        ]
      },
      // ──────────────────────────── LESSON 2: CSS ────────────────────────────
      {
        id: "web-css-modern",
        title: "CSS Hiện Đại — Cascade, Selector & Custom Properties",
        titleEn: "Modern CSS — Cascade, Selectors & Custom Properties",
        level: 1,
        difficulty: "beginner",
        codeLanguage: "css",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn đổi màu nút bấm thành xanh, nhưng nó vẫn đỏ. Bạn thêm \`!important\` — vẫn đỏ. CSS tưởng đơn giản nhưng "đè" nhau theo quy tắc rất chặt: **Cascade + Specificity**. Hiểu nó = hết khổ.

## 2. 💡 Khái niệm chính

CSS = **C**ascading **S**tyle **S**heets. 3 trụ cột:

1. **Cascade**: thứ tự khai báo, nguồn (browser → user → author).
2. **Specificity** (độ ưu tiên): \`inline > #id > .class > tag\`.
3. **Inheritance** (kế thừa): \`color\`, \`font\` lan từ cha xuống con.

## 3. 🧰 Specificity tính như thế nào

\`\`\`text
inline style:  1000
#id:            100
.class / [attr] / :hover:   10
tag (div, p):    1
\`\`\`

Ví dụ: \`#header .btn\` = 100 + 10 = **110**, thắng \`.btn.primary\` = 10 + 10 = 20.

## 4. 🎯 Ví dụ thực tế — CSS Custom Properties (Variables)

\`\`\`css
:root {
  --brand-primary: hsl(217 91% 60%);
  --space-md: 1rem;
  --radius: 12px;
}

.btn {
  background: var(--brand-primary);
  padding: var(--space-md);
  border-radius: var(--radius);
}

[data-theme="dark"] {
  --brand-primary: hsl(217 91% 70%);
}
\`\`\`

Đổi 1 dòng \`--brand-primary\` → toàn site đổi màu. Đây là cách design system 2026 hoạt động.

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "\`!important\` luôn thắng" — đúng, nhưng dùng = code khó bảo trì. Tránh tối đa.
> - "\`px\` chính xác hơn \`rem\`" — sai cho responsive. \`rem\` co theo zoom của user.
> - "Float là cách layout chuẩn" — lỗi thời. Dùng Flexbox/Grid (bài sau).

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - Đặt token màu/spacing trong \`:root\` → dễ đổi theme.
> - Dùng \`hsl()\` thay \`hex\` — dễ tinh chỉnh độ sáng.
> - BEM hoặc utility-first (Tailwind) cho dự án lớn.
> - **2026 trend:** \`@layer\` để kiểm soát cascade rõ ràng, container queries (\`@container\`) thay media queries cho component độc lập.

## 7. 🤔 Áp dụng

Trước khi thêm \`!important\`, hỏi: "Selector của tôi có specificity thấp hơn cái đang đè không?" Tăng cụ thể đúng cách thay vì dùng búa tạ.

## 8. 📌 Tóm tắt 30 giây

CSS không "ngẫu nhiên" — Cascade + Specificity quyết định ai thắng. Dùng custom properties để có design system co giãn.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

You change a button to blue, but it stays red. You add \`!important\` — still red. CSS feels simple but layers strictly via **Cascade + Specificity**. Understand it = no more pain.

## 2. 💡 Core Concepts

CSS = **C**ascading **S**tyle **S**heets. Three pillars:

1. **Cascade**: declaration order and origin (browser → user → author).
2. **Specificity**: \`inline > #id > .class > tag\`.
3. **Inheritance**: \`color\`, \`font\` flow from parent to child.

## 3. 🧰 How specificity is computed

\`\`\`text
inline style:  1000
#id:            100
.class / [attr] / :hover:   10
tag (div, p):    1
\`\`\`

Example: \`#header .btn\` = 100 + 10 = **110**, beats \`.btn.primary\` = 10 + 10 = 20.

## 4. 🎯 Real Example — CSS Custom Properties (Variables)

\`\`\`css
:root {
  --brand-primary: hsl(217 91% 60%);
  --space-md: 1rem;
  --radius: 12px;
}

.btn {
  background: var(--brand-primary);
  padding: var(--space-md);
  border-radius: var(--radius);
}

[data-theme="dark"] {
  --brand-primary: hsl(217 91% 70%);
}
\`\`\`

Change one \`--brand-primary\` line → the whole site retints. This is how 2026 design systems work.

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "\`!important\` always wins" — true, but it ruins maintainability. Avoid.
> - "\`px\` is more accurate than \`rem\`" — wrong for responsive. \`rem\` scales with user zoom.
> - "Float is the standard layout tool" — outdated. Use Flexbox/Grid (next lesson).

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - Put color/spacing tokens in \`:root\` → easy theming.
> - Prefer \`hsl()\` over \`hex\` — easy lightness tweaks.
> - BEM or utility-first (Tailwind) for large projects.
> - **2026 trend:** \`@layer\` to govern cascade explicitly; container queries (\`@container\`) replace media queries for self-contained components.

## 7. 🤔 Apply

Before reaching for \`!important\`, ask: "Is my selector less specific than what's overriding it?" Raise specificity correctly instead of swinging a hammer.

## 8. 📌 30-Second Summary

CSS isn't random — Cascade + Specificity decide the winner. Use custom properties for a flexible design system.
`,
        code: `/* Modern CSS design tokens + dark mode + container query */
:root {
  /* Color tokens — HSL for easy lightness control */
  --brand: hsl(217 91% 60%);
  --brand-fg: hsl(0 0% 100%);
  --surface: hsl(0 0% 100%);
  --text: hsl(220 13% 18%);

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --radius: 12px;
}

[data-theme="dark"] {
  --surface: hsl(220 13% 12%);
  --text: hsl(0 0% 95%);
  --brand: hsl(217 91% 70%);
}

@layer reset, base, components, utilities;

@layer base {
  body {
    background: var(--surface);
    color: var(--text);
    font-family: system-ui, sans-serif;
  }
}

@layer components {
  .btn {
    background: var(--brand);
    color: var(--brand-fg);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius);
    border: 0;
    cursor: pointer;
    transition: filter 0.2s;
  }
  .btn:hover { filter: brightness(1.1); }
}

/* Container query — adapts based on parent width, not viewport */
.card { container-type: inline-size; }
@container (min-width: 400px) {
  .card__title { font-size: 1.5rem; }
}`,
        exercise: "Tạo file CSS dùng custom properties cho 4 màu, 3 spacing, và 1 dark mode. Áp dụng vào 1 thẻ button.",
        exerciseEn: "Build a CSS file using custom properties for 4 colors, 3 spacings, and 1 dark mode. Apply to a button.",
        quiz: [
          { question: "Selector nào có specificity CAO NHẤT?", options: [".btn.primary", "#header .btn", "div.btn", "button:hover"], answer: 1, explanation: "#header (100) + .btn (10) = 110, cao nhất trong các lựa chọn." },
          { question: "Đơn vị nào tốt nhất cho responsive font?", options: ["px", "pt", "rem", "cm"], answer: 2, explanation: "rem co giãn theo font-size gốc, tôn trọng zoom của user." },
          { question: "CSS Custom Property khai báo đúng cú pháp?", options: ["$brand: blue;", "@brand: blue;", "--brand: blue;", "var brand = blue;"], answer: 2, explanation: "CSS variables dùng tiền tố --, ví dụ --brand: blue; và dùng var(--brand)." },
          { question: "Khi nào nên dùng !important?", options: ["Luôn luôn để chắc ăn", "Chỉ trong utility class hoặc override 3rd party", "Khi quên specificity", "Trong mọi animation"], answer: 1, explanation: "Chỉ dùng !important hợp pháp trong utility classes (như Tailwind) hoặc khi cần đè CSS từ thư viện không kiểm soát được." },
          { question: "@container query khác @media ở điểm nào?", options: ["Không khác gì", "Dựa trên kích thước container cha thay vì viewport", "Chỉ dùng cho print", "Đã bị deprecate"], answer: 1, explanation: "Container queries cho phép component tự thích nghi theo parent — lý tưởng cho design system độc lập viewport." }
        ]
      },
      // ──────────────────────────── LESSON 3: Layout ────────────────────────────
      {
        id: "web-css-layout",
        title: "Flexbox & Grid — Bố cục hiện đại",
        titleEn: "Flexbox & Grid — Modern Layouts",
        level: 2,
        difficulty: "beginner",
        codeLanguage: "css",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn muốn căn 1 nút giữa màn hình. Cách cũ: 5 dòng \`position: absolute; top: 50%; transform: translate(-50%, -50%)\`. Cách mới: 2 dòng Flexbox. Năm 2026 không ai dùng float để layout nữa.

## 2. 💡 Khái niệm chính

| Công cụ | Hướng | Khi dùng |
|---|---|---|
| **Flexbox** | 1 chiều (hàng hoặc cột) | Navbar, card list, căn giữa |
| **Grid** | 2 chiều (hàng + cột) | Layout trang, dashboard |

Quy tắc nhớ: "Nội dung sắp xếp 1 chiều → Flex. 2 chiều → Grid."

## 3. 🧰 Flexbox cơ bản

\`\`\`css
.parent {
  display: flex;
  justify-content: center;  /* trục chính */
  align-items: center;      /* trục phụ */
  gap: 1rem;
}
\`\`\`

3 trục cần nhớ: \`flex-direction\` (row|column), \`justify-content\` (trục chính), \`align-items\` (trục phụ).

## 4. 🎯 Ví dụ thực tế — Grid layout dashboard

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;     /* sidebar + main */
  grid-template-rows: 64px 1fr 48px;    /* header + body + footer */
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
}
.sidebar { grid-area: sidebar; }
.header  { grid-area: header; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
\`\`\`

Đổi layout = đổi \`grid-template-areas\`. Không cần đụng HTML.

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "Grid thay thế Flexbox" — sai, **bổ sung** nhau.
> - "Phải dùng \`width: 100%\` trong Flex item" — sai, dùng \`flex: 1\`.
> - "Không cần media query nữa với Grid" — vẫn cần cho mobile (đổi columns).

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - \`gap\` thay \`margin\` — sạch hơn, không bị margin collapse.
> - \`minmax(200px, 1fr)\` cho responsive grid không cần media query.
> - \`auto-fit\` + \`minmax\` = grid tự đổi số cột theo viewport.
> - **2026 trend:** \`subgrid\` cho phép card con thẳng hàng với grid cha — Safari & Chrome đã hỗ trợ.

## 7. 🤔 Áp dụng

Khi layout: 1 hàng nav, 1 cột sidebar → **Flex**. Cả trang web có header/sidebar/main/footer → **Grid**.

## 8. 📌 Tóm tắt 30 giây

Flex cho 1 chiều, Grid cho 2 chiều. Cả 2 đều có \`gap\`. Quên float đi.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

You want to center a button on screen. Old way: 5 lines of \`position: absolute; top: 50%; transform: translate(-50%, -50%)\`. New way: 2 lines of Flexbox. Nobody floats for layout in 2026.

## 2. 💡 Core Concepts

| Tool | Direction | When to use |
|---|---|---|
| **Flexbox** | 1D (row OR column) | Navbar, card list, centering |
| **Grid** | 2D (rows + columns) | Page layout, dashboard |

Mnemonic: "Lay out in one direction → Flex. Two directions → Grid."

## 3. 🧰 Flexbox basics

\`\`\`css
.parent {
  display: flex;
  justify-content: center;  /* main axis */
  align-items: center;      /* cross axis */
  gap: 1rem;
}
\`\`\`

Three axes to remember: \`flex-direction\` (row|column), \`justify-content\` (main), \`align-items\` (cross).

## 4. 🎯 Real Example — Grid dashboard layout

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr 48px;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
}
.sidebar { grid-area: sidebar; }
.header  { grid-area: header; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
\`\`\`

Changing layout = changing \`grid-template-areas\`. No HTML changes.

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "Grid replaces Flexbox" — wrong, they **complement** each other.
> - "Use \`width: 100%\` on Flex items" — wrong, use \`flex: 1\`.
> - "No need for media queries with Grid" — still needed for mobile (column changes).

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - Use \`gap\` instead of \`margin\` — cleaner, no margin collapse.
> - \`minmax(200px, 1fr)\` for responsive grid without media queries.
> - \`auto-fit\` + \`minmax\` = grid auto-adjusts columns to viewport.
> - **2026 trend:** \`subgrid\` aligns nested grids with parent — Safari & Chrome already support it.

## 7. 🤔 Apply

For layout: one row of nav, one sidebar column → **Flex**. Whole page with header/sidebar/main/footer → **Grid**.

## 8. 📌 30-Second Summary

Flex for 1D, Grid for 2D. Both have \`gap\`. Forget float.
`,
        code: `/* Responsive card grid that auto-fits — no media queries needed */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 12px;
  background: hsl(0 0% 100%);
  box-shadow: 0 2px 8px hsl(220 13% 18% / 0.08);
}

.card__actions {
  margin-top: auto;       /* push actions to the bottom */
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* Center a hero CTA — 2 lines instead of absolute positioning */
.hero {
  min-height: 60vh;
  display: grid;
  place-items: center;    /* shorthand for justify + align center */
}`,
        exercise: "Dựng layout 'Holy Grail' (header trên, footer dưới, sidebar trái + main phải) bằng CSS Grid với 5 dòng grid-template-areas.",
        exerciseEn: "Build the 'Holy Grail' layout (header top, footer bottom, sidebar left + main right) using CSS Grid in 5 lines of grid-template-areas.",
        quiz: [
          { question: "Để căn giữa cả 2 chiều bằng Flexbox, cần khai báo gì?", options: ["text-align: center", "margin: auto", "justify-content: center; align-items: center", "place-content: middle"], answer: 2, explanation: "justify-content căn trục chính, align-items căn trục phụ. Cả 2 = center → căn giữa hoàn toàn." },
          { question: "Khi nào nên dùng Grid thay vì Flexbox?", options: ["Khi xếp navbar 1 hàng", "Khi cần layout 2 chiều (rows + columns)", "Khi muốn responsive", "Khi dùng dark mode"], answer: 1, explanation: "Grid mạnh ở layout 2 chiều, Flex tối ưu cho 1 chiều." },
          { question: "repeat(auto-fit, minmax(260px, 1fr)) có tác dụng gì?", options: ["Tạo đúng 3 cột", "Tự điều chỉnh số cột theo viewport, mỗi cột tối thiểu 260px", "Chỉ chạy trên mobile", "Lỗi cú pháp"], answer: 1, explanation: "auto-fit + minmax = responsive grid không cần media query." },
          { question: "Để các Flex items cách nhau 16px, dùng gì?", options: ["margin-right: 16px", "padding: 16px", "gap: 16px", "spacing: 16px"], answer: 2, explanation: "gap là cách hiện đại, không bị thừa margin ở item cuối." },
          { question: "Kỹ thuật nào ĐÃ LỖI THỜI để layout trang?", options: ["Flexbox", "Grid", "Float", "Container queries"], answer: 2, explanation: "Float từng dùng layout 2010s, nay chỉ còn dùng cho text wrap quanh ảnh." }
        ]
      },
      // ──────────────────────────── LESSON 4: JS Basics ────────────────────────────
      {
        id: "web-js-basics",
        title: "JavaScript Cơ Bản — Biến, Hàm & Async/Await",
        titleEn: "JavaScript Essentials — Variables, Functions & Async/Await",
        level: 2,
        difficulty: "beginner",
        codeLanguage: "javascript",
        theory: `## 1. 🚦 Vấn đề đời thường

Trang web bạn click nút "Tải dữ liệu" — nó đứng hình 3 giây rồi mới hiện. JavaScript đang **chờ đồng bộ**. Modern JS dùng **async/await** để chạy nền, UI vẫn mượt.

## 2. 💡 Khái niệm chính

3 cách khai báo biến:

| Từ khóa | Có thể gán lại? | Scope | Khuyến nghị |
|---|---|---|---|
| \`var\` | ✅ | Function | ❌ Tránh |
| \`let\` | ✅ | Block | ✅ Khi cần đổi |
| \`const\` | ❌ | Block | ✅ Mặc định |

**Quy tắc 2026:** Mặc định \`const\`, đổi sang \`let\` khi cần.

## 3. 🧰 Hàm hiện đại — Arrow function

\`\`\`js
// Cũ
function add(a, b) { return a + b; }

// Mới (arrow)
const add = (a, b) => a + b;

// Một tham số → bỏ ngoặc
const double = n => n * 2;
\`\`\`

## 4. 🎯 Ví dụ thực tế — Fetch API với async/await

\`\`\`js
async function loadUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed:", err);
    return null;
  }
}

// Sử dụng
const user = await loadUser(42);
console.log(user?.name ?? "Not found");
\`\`\`

\`async/await\` đọc như code đồng bộ nhưng chạy bất đồng bộ. Trình duyệt không bị block.

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "\`==\` giống \`===\`" — sai. Luôn dùng \`===\` (so sánh nghiêm ngặt).
> - "\`null\` và \`undefined\` giống nhau" — không. \`undefined\` = chưa gán, \`null\` = gán rỗng có chủ đích.
> - "Arrow function thay thế hoàn toàn function" — sai. Arrow KHÔNG có \`this\` riêng → không dùng làm method của object.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - \`const\` mặc định → giảm bug.
> - Luôn \`try/catch\` quanh \`await fetch\`.
> - Optional chaining \`?.\` và nullish coalescing \`??\` thay cho hàng dài \`if\`.
> - **2026 trend:** Top-level await trong ES modules, \`AbortController\` để hủy request.

## 7. 🤔 Áp dụng

Mọi tương tác I/O (network, file, timer) → dùng \`async/await\`. Đừng quên \`try/catch\`.

## 8. 📌 Tóm tắt 30 giây

\`const\` mặc định, arrow function ngắn gọn, \`async/await\` cho I/O. Luôn \`===\` thay \`==\`.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

You click "Load data" — the page freezes for 3 seconds. JavaScript is **blocking synchronously**. Modern JS uses **async/await** to run in the background while the UI stays smooth.

## 2. 💡 Core Concepts

Three variable declarations:

| Keyword | Reassignable? | Scope | Recommendation |
|---|---|---|---|
| \`var\` | ✅ | Function | ❌ Avoid |
| \`let\` | ✅ | Block | ✅ When mutating |
| \`const\` | ❌ | Block | ✅ Default |

**2026 rule:** Default to \`const\`, switch to \`let\` only when needed.

## 3. 🧰 Modern functions — Arrow syntax

\`\`\`js
// Old
function add(a, b) { return a + b; }

// New (arrow)
const add = (a, b) => a + b;

// Single arg → drop parens
const double = n => n * 2;
\`\`\`

## 4. 🎯 Real Example — Fetch API with async/await

\`\`\`js
async function loadUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed:", err);
    return null;
  }
}

// Usage
const user = await loadUser(42);
console.log(user?.name ?? "Not found");
\`\`\`

\`async/await\` reads like synchronous code but runs asynchronously. The browser doesn't block.

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "\`==\` is the same as \`===\`" — wrong. Always use \`===\` (strict).
> - "\`null\` and \`undefined\` are the same" — no. \`undefined\` = unassigned, \`null\` = intentionally empty.
> - "Arrow functions fully replace functions" — wrong. Arrows have NO own \`this\` → bad as object methods.

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - Default to \`const\` → fewer bugs.
> - Always wrap \`await fetch\` in \`try/catch\`.
> - Optional chaining \`?.\` and nullish coalescing \`??\` replace long \`if\` chains.
> - **2026 trend:** Top-level await in ES modules, \`AbortController\` to cancel requests.

## 7. 🤔 Apply

Any I/O (network, file, timer) → use \`async/await\`. Never skip \`try/catch\`.

## 8. 📌 30-Second Summary

Default \`const\`, arrows for brevity, \`async/await\` for I/O. Always \`===\` over \`==\`.
`,
        code: `// Modern JS essentials — fetch with cancellation, error handling, modern syntax
const controller = new AbortController();

async function fetchPosts(userId) {
  try {
    const res = await fetch(\`/api/users/\${userId}/posts\`, {
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const posts = await res.json();
    // Return only published posts, latest first
    return posts
      .filter(p => p.status === "published")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Request cancelled");
      return [];
    }
    console.error("Fetch failed:", err);
    return [];
  }
}

// Optional chaining + nullish coalescing
const author = post?.author?.name ?? "Anonymous";

// Destructuring + spread
const { title, body, ...meta } = post;
const updated = { ...post, title: title.toUpperCase() };

// Cancel in-flight request after 5 seconds
setTimeout(() => controller.abort(), 5000);

const posts = await fetchPosts(42);
console.log(\`Loaded \${posts.length} posts by \${author}\`);`,
        exercise: "Viết hàm async getWeather(city) gọi API thời tiết bất kỳ, trả về object {temp, desc} hoặc null nếu lỗi. Bắt buộc try/catch.",
        exerciseEn: "Write an async function getWeather(city) that calls any weather API and returns {temp, desc} or null on error. Must use try/catch.",
        quiz: [
          { question: "Khai báo nào KHÔNG thể gán lại giá trị?", options: ["var x = 1", "let x = 1", "const x = 1", "x = 1"], answer: 2, explanation: "const tạo binding bất biến — gán lại sẽ báo TypeError." },
          { question: "So sánh nào nên dùng MẶC ĐỊNH?", options: ["==", "===", "!=", "<="], answer: 1, explanation: "=== so sánh cả giá trị và kiểu, tránh ép kiểu ngầm gây bug." },
          { question: "Async function trả về gì?", options: ["Giá trị thông thường", "Promise", "Callback", "null"], answer: 1, explanation: "Mọi async function luôn trả về Promise, kể cả khi return giá trị tĩnh." },
          { question: "user?.address?.city ?? 'N/A' nghĩa là gì?", options: ["Lỗi cú pháp", "Lấy city, nếu null/undefined thì 'N/A'", "Luôn trả 'N/A'", "Chỉ hoạt động trên array"], answer: 1, explanation: "Optional chaining (?.) + nullish coalescing (??) — an toàn khi truy cập chuỗi thuộc tính." },
          { question: "Cách hủy 1 fetch đang chạy là gì?", options: ["fetch.cancel()", "AbortController", "clearTimeout", "Không thể hủy"], answer: 1, explanation: "AbortController.signal truyền vào fetch, gọi controller.abort() để hủy." }
        ]
      },
      // ──────────────────────────── LESSON 5: DOM ────────────────────────────
      {
        id: "web-js-dom",
        title: "DOM & Sự Kiện — Tương tác với trang web",
        titleEn: "DOM & Events — Interacting with the Page",
        level: 3,
        difficulty: "intermediate",
        codeLanguage: "javascript",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn muốn bấm nút và trang đổi màu, hiện modal, validate form. Đó chính là **DOM manipulation** — JavaScript đọc/ghi cấu trúc HTML đang chạy.

## 2. 💡 Khái niệm chính

**DOM** (Document Object Model) = cây các node biểu diễn HTML trong bộ nhớ. Mỗi thẻ HTML = 1 node.

API quan trọng:
- \`document.querySelector(selector)\` — tìm 1 element.
- \`document.querySelectorAll(selector)\` — tìm tất cả.
- \`element.addEventListener(event, handler)\` — lắng nghe sự kiện.
- \`element.classList.toggle/add/remove\` — đổi class.
- \`element.textContent / innerHTML\` — đổi nội dung.

## 3. 🧰 Sự kiện thường gặp

| Event | Khi nào |
|---|---|
| \`click\` | Click chuột/tap |
| \`input\` | Input value đổi (mỗi ký tự) |
| \`submit\` | Form submit |
| \`keydown\` | Bấm phím |
| \`scroll\` | Cuộn trang |
| \`DOMContentLoaded\` | HTML đã parse xong |

## 4. 🎯 Ví dụ thực tế — Event delegation

\`\`\`js
// ❌ Cách kém: gắn listener cho mỗi nút (100 nút = 100 listener)
document.querySelectorAll(".delete-btn").forEach(btn => {
  btn.addEventListener("click", handleDelete);
});

// ✅ Cách đúng: gắn 1 listener trên cha
document.querySelector(".todo-list").addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    handleDelete(e);
  }
});
\`\`\`

Lợi ích: 1 listener cho cả nghìn item, hoạt động cả với item thêm sau.

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "\`innerHTML\` luôn an toàn" — **SAI**. Cho phép XSS nếu đưa user input. Dùng \`textContent\` cho text.
> - "Tìm element bằng id phải dùng \`getElementById\`" — không. \`querySelector('#id')\` cũng được.
> - "Quên \`removeEventListener\` không sao" — sai, gây memory leak trong SPA.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - \`textContent\` cho text, \`innerHTML\` chỉ cho HTML đã sanitize (DOMPurify).
> - Event delegation cho list dài → ít listener, hiệu năng tốt.
> - Gắn listener trong \`DOMContentLoaded\` hoặc cuối \`<body>\`.
> - **2026 trend:** Web Components + \`<template>\` cho component tái sử dụng không cần framework.

## 7. 🤔 Áp dụng

Khi code trang tĩnh interactive: 1) Chọn element bằng \`querySelector\`. 2) Lắng nghe event. 3) Đổi class hoặc textContent. Đủ cho 80% nhu cầu.

## 8. 📌 Tóm tắt 30 giây

DOM = cây HTML trong bộ nhớ. \`querySelector\` để tìm, \`addEventListener\` để nghe, \`classList\` để đổi style. Tránh \`innerHTML\` với user input.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

You want a button click to change colors, open a modal, or validate a form. That's **DOM manipulation** — JavaScript reading and writing the live HTML.

## 2. 💡 Core Concepts

**DOM** (Document Object Model) = a tree of nodes representing HTML in memory. Every HTML tag = one node.

Key APIs:
- \`document.querySelector(selector)\` — find one element.
- \`document.querySelectorAll(selector)\` — find all.
- \`element.addEventListener(event, handler)\` — listen for an event.
- \`element.classList.toggle/add/remove\` — change classes.
- \`element.textContent / innerHTML\` — change content.

## 3. 🧰 Common events

| Event | When |
|---|---|
| \`click\` | Mouse click / tap |
| \`input\` | Input value changes (per keystroke) |
| \`submit\` | Form submit |
| \`keydown\` | Key pressed |
| \`scroll\` | Page scroll |
| \`DOMContentLoaded\` | HTML parsed |

## 4. 🎯 Real Example — Event delegation

\`\`\`js
// ❌ Bad: one listener per button (100 buttons = 100 listeners)
document.querySelectorAll(".delete-btn").forEach(btn => {
  btn.addEventListener("click", handleDelete);
});

// ✅ Good: one listener on the parent
document.querySelector(".todo-list").addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    handleDelete(e);
  }
});
\`\`\`

Benefit: one listener for thousands of items, works for items added later too.

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "\`innerHTML\` is always safe" — **FALSE**. Allows XSS if you inject user input. Use \`textContent\` for text.
> - "ID lookups need \`getElementById\`" — no. \`querySelector('#id')\` works too.
> - "Forgetting \`removeEventListener\` is harmless" — wrong, causes memory leaks in SPAs.

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - \`textContent\` for text; \`innerHTML\` only for already-sanitized HTML (DOMPurify).
> - Event delegation for long lists → fewer listeners, better perf.
> - Attach listeners inside \`DOMContentLoaded\` or at the end of \`<body>\`.
> - **2026 trend:** Web Components + \`<template>\` for reusable components without a framework.

## 7. 🤔 Apply

For interactive static pages: 1) Pick elements via \`querySelector\`. 2) Listen for events. 3) Toggle classes or text. Covers 80% of needs.

## 8. 📌 30-Second Summary

DOM = HTML tree in memory. \`querySelector\` to find, \`addEventListener\` to listen, \`classList\` to style. Avoid \`innerHTML\` with user input.
`,
        code: `// A complete to-do widget — semantic HTML + delegated events + safe text
// HTML: <ul class="todos"></ul><form id="add"><input name="text"/></form>

const list = document.querySelector(".todos");
const form = document.querySelector("#add");

let todos = JSON.parse(localStorage.getItem("todos") ?? "[]");

function render() {
  list.innerHTML = "";
  for (const todo of todos) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    li.classList.toggle("done", todo.done);
    li.textContent = todo.text;          // safe — no XSS
    const btn = document.createElement("button");
    btn.className = "delete-btn";
    btn.textContent = "✕";
    li.appendChild(btn);
    list.appendChild(li);
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add new todo
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = new FormData(form).get("text")?.toString().trim();
  if (!text) return;
  todos.push({ id: crypto.randomUUID(), text, done: false });
  form.reset();
  render();
});

// Delegated click — toggle or delete
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  if (e.target.matches(".delete-btn")) {
    todos = todos.filter(t => t.id !== li.dataset.id);
  } else {
    const todo = todos.find(t => t.id === li.dataset.id);
    if (todo) todo.done = !todo.done;
  }
  render();
});

document.addEventListener("DOMContentLoaded", render);`,
        exercise: "Tạo widget đếm số ký tự còn lại của 1 textarea (giới hạn 280 ký tự, đổi màu đỏ khi <20). Dùng event 'input'.",
        exerciseEn: "Build a textarea character counter (280-char limit, turns red when <20 left). Use the 'input' event.",
        quiz: [
          { question: "API nào tìm element theo CSS selector?", options: ["document.find()", "document.querySelector()", "document.getElement()", "document.search()"], answer: 1, explanation: "querySelector chấp nhận mọi CSS selector hợp lệ." },
          { question: "Cách nào AN TOÀN nhất để hiển thị text từ user?", options: ["innerHTML", "textContent", "outerHTML", "insertAdjacentHTML"], answer: 1, explanation: "textContent chỉ gán plain text, ngăn XSS hoàn toàn." },
          { question: "Event delegation nghĩa là gì?", options: ["Hủy event", "Gắn listener trên cha thay vì từng con", "Tự động gắn lại listener", "Chuyển event sang server"], answer: 1, explanation: "1 listener trên parent xử lý event nổi bọt từ con — ít memory, hoạt động cả với child thêm sau." },
          { question: "e.preventDefault() trong handler 'submit' để làm gì?", options: ["Gửi form ngay", "Chặn hành vi mặc định (reload trang)", "Xóa form", "Bỏ qua validation"], answer: 1, explanation: "Form submit mặc định reload trang — preventDefault giữ trang để xử lý JS." },
          { question: "Phát biểu nào ĐÚNG về innerHTML?", options: ["Luôn an toàn", "Có thể gây XSS nếu nhận user input", "Nhanh hơn textContent", "Đã bị xóa"], answer: 1, explanation: "innerHTML parse HTML — chèn <script> hoặc onerror= từ input có thể chạy code độc hại." }
        ]
      },
      // ──────────────────────────── LESSON 6: Project ────────────────────────────
      {
        id: "web-fullstack-project",
        title: "Dự án Full-Stack Mini — Ráp HTML + CSS + JS",
        titleEn: "Mini Full-Stack Project — HTML + CSS + JS Together",
        level: 4,
        difficulty: "intermediate",
        codeLanguage: "javascript",
        theory: `## 1. 🚦 Vấn đề đời thường

Học từng bài riêng dễ. Nhưng khi sếp nói "làm cho tôi trang tracker chi tiêu" → bạn đứng hình. Bài này ráp 3 ngôn ngữ thành 1 sản phẩm hoàn chỉnh.

## 2. 💡 Khái niệm chính — Phân lớp

| Lớp | Trách nhiệm |
|---|---|
| **HTML** | Cấu trúc + ngữ nghĩa |
| **CSS** | Trình bày + responsive |
| **JS** | Hành vi + dữ liệu |

**Quy tắc vàng:** Mỗi lớp **không** giả định lớp khác. CSS không phụ thuộc class do JS thêm; HTML phải dùng được kể cả khi JS lỗi (progressive enhancement).

## 3. 🧰 Cấu trúc thư mục dự án nhỏ

\`\`\`text
expense-tracker/
├── index.html
├── styles/
│   ├── tokens.css     # design tokens
│   └── main.css       # layout + components
├── scripts/
│   ├── storage.js     # localStorage helpers
│   ├── ui.js          # render functions
│   └── main.js        # event wiring
└── README.md
\`\`\`

## 4. 🎯 Ví dụ thực tế — Expense Tracker

Yêu cầu: thêm chi tiêu, xem tổng tháng, xóa item, lưu offline.

\`\`\`js
// scripts/main.js
import { getAll, add, remove } from "./storage.js";
import { renderList, renderTotal } from "./ui.js";

function refresh() {
  const items = getAll();
  renderList(items);
  renderTotal(items.reduce((s, i) => s + i.amount, 0));
}

document.querySelector("#add-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  add({ label: fd.get("label"), amount: Number(fd.get("amount")) });
  e.target.reset();
  refresh();
});

document.querySelector("#list").addEventListener("click", (e) => {
  const id = e.target.closest("li")?.dataset.id;
  if (id && e.target.matches(".del")) { remove(id); refresh(); }
});

refresh();
\`\`\`

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "Gộp tất cả vào 1 file cho gọn" — sai khi >200 dòng. Tách module dễ test.
> - "Chỉ test trên máy mình là đủ" — sai. Mở DevTools > Mobile + Lighthouse.
> - "Không cần README" — sai, dù chỉ cho chính bạn 6 tháng sau.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - Bắt đầu với HTML semantic + CSS mặc định trước, JS thêm sau.
> - Lưu state vào \`localStorage\` để không mất khi refresh.
> - Test trên mobile thật, không chỉ DevTools.
> - **2026 trend:** Vite cho dev server siêu nhanh, deploy lên Vercel/Netlify miễn phí.

## 7. 🤔 Áp dụng

Quy trình build 1 dự án nhỏ:
1. Viết HTML (cấu trúc + form + list rỗng).
2. Style với CSS Grid/Flex.
3. Thêm JS: load → render → wire event → save.
4. Test responsive, push lên GitHub Pages.

## 8. 📌 Tóm tắt 30 giây

Tách lớp rõ ràng (HTML cấu trúc / CSS hình thức / JS hành vi), chia file theo trách nhiệm, lưu state, test mobile. Đó là một developer thực thụ.
`,
        theoryEn: `## 1. 🚦 Real-world Problem

Learning lessons in isolation is easy. But when your boss says "build me an expense tracker" → you freeze. This lesson assembles all three languages into one shippable product.

## 2. 💡 Core Concepts — Layering

| Layer | Responsibility |
|---|---|
| **HTML** | Structure + semantics |
| **CSS** | Presentation + responsive |
| **JS** | Behavior + data |

**Golden rule:** Each layer should **not** assume the others exist. CSS doesn't depend on JS-added classes; HTML must remain usable even if JS fails (progressive enhancement).

## 3. 🧰 Small project folder layout

\`\`\`text
expense-tracker/
├── index.html
├── styles/
│   ├── tokens.css
│   └── main.css
├── scripts/
│   ├── storage.js
│   ├── ui.js
│   └── main.js
└── README.md
\`\`\`

## 4. 🎯 Real Example — Expense Tracker

Requirements: add expense, view monthly total, delete items, work offline.

\`\`\`js
// scripts/main.js
import { getAll, add, remove } from "./storage.js";
import { renderList, renderTotal } from "./ui.js";

function refresh() {
  const items = getAll();
  renderList(items);
  renderTotal(items.reduce((s, i) => s + i.amount, 0));
}

document.querySelector("#add-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  add({ label: fd.get("label"), amount: Number(fd.get("amount")) });
  e.target.reset();
  refresh();
});

document.querySelector("#list").addEventListener("click", (e) => {
  const id = e.target.closest("li")?.dataset.id;
  if (id && e.target.matches(".del")) { remove(id); refresh(); }
});

refresh();
\`\`\`

## 5. ⚠️ Common Misconceptions

> ⚠️ **Warning:**
> - "Cram everything in one file for simplicity" — fails past 200 lines. Modules are testable.
> - "It works on my machine — ship it" — wrong. Open DevTools > Mobile + Lighthouse.
> - "Skip the README" — wrong, even for your future self in 6 months.

## 6. ✅ Best Practice from Teacher Hai

> 💡 **Tips:**
> - Start with semantic HTML + default CSS; add JS last.
> - Persist state to \`localStorage\` so refresh doesn't wipe it.
> - Test on a real phone, not just DevTools emulation.
> - **2026 trend:** Vite for blazing dev server, deploy free to Vercel/Netlify.

## 7. 🤔 Apply

Workflow for a small project:
1. Write HTML (structure + form + empty list).
2. Style with CSS Grid/Flex.
3. Add JS: load → render → wire events → save.
4. Test responsive, push to GitHub Pages.

## 8. 📌 30-Second Summary

Layer cleanly (HTML structure / CSS presentation / JS behavior), split files by concern, persist state, test mobile. That's a real developer.
`,
        code: `// scripts/storage.js — localStorage with safe defaults
const KEY = "expenses-v1";

export function getAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function add(item) {
  const items = getAll();
  items.push({ id: crypto.randomUUID(), ts: Date.now(), ...item });
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function remove(id) {
  const items = getAll().filter(i => i.id !== id);
  localStorage.setItem(KEY, JSON.stringify(items));
}

// scripts/ui.js — pure render helpers, no business logic
const fmt = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });

export function renderList(items) {
  const list = document.querySelector("#list");
  list.innerHTML = "";
  for (const it of items) {
    const li = document.createElement("li");
    li.dataset.id = it.id;
    li.innerHTML = \`
      <span class="label"></span>
      <span class="amount"></span>
      <button class="del" aria-label="Delete">✕</button>
    \`;
    li.querySelector(".label").textContent = it.label;     // safe text
    li.querySelector(".amount").textContent = fmt.format(it.amount);
    list.appendChild(li);
  }
}

export function renderTotal(total) {
  document.querySelector("#total").textContent = fmt.format(total);
}`,
        exercise: "Mở rộng Expense Tracker: thêm filter theo tháng, biểu đồ cột bằng SVG inline, export JSON. Deploy lên GitHub Pages.",
        exerciseEn: "Extend the Expense Tracker: add month filter, SVG bar chart, and JSON export. Deploy to GitHub Pages.",
        quiz: [
          { question: "Lớp nào chịu trách nhiệm CẤU TRÚC trang web?", options: ["CSS", "HTML", "JS", "JSON"], answer: 1, explanation: "HTML định nghĩa cấu trúc và ngữ nghĩa, CSS lo trình bày, JS lo hành vi." },
          { question: "Progressive enhancement nghĩa là gì?", options: ["Trang chỉ chạy nếu có JS", "Trang dùng được kể cả khi JS lỗi/tắt", "Chỉ build cho desktop trước", "Tăng kích thước font dần"], answer: 1, explanation: "Bắt đầu với HTML có nội dung dùng được, lớp CSS và JS chỉ tăng cường trải nghiệm." },
          { question: "API nào lưu dữ liệu offline trong trình duyệt?", options: ["sessionStorage", "localStorage", "Cookies", "Tất cả đều có thể"], answer: 3, explanation: "Cả 3 đều lưu được; localStorage là phổ biến nhất cho data nhỏ, không hết hạn." },
          { question: "Vì sao nên tách JS thành nhiều module?", options: ["Trình duyệt yêu cầu", "Dễ test, dễ tái sử dụng, dễ đọc", "Tăng tốc độ runtime", "Bắt buộc bởi ESLint"], answer: 1, explanation: "Module hóa = single responsibility, test riêng được, tái dùng dễ — nguyên tắc Clean Code." },
          { question: "Bước nào THƯỜNG bị bỏ qua khi build dự án cá nhân?", options: ["Viết HTML", "Test trên mobile thật", "Code JS", "Mở DevTools"], answer: 1, explanation: "Test mobile thật phát hiện vấn đề mà DevTools mô phỏng bỏ sót: keyboard, touch lag, viewport." }
        ]
      },
    ]
  },
];

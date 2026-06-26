// Web Development - Beginner Primer (3 ultra-beginner lessons)
// Author: HaiEduTech · Đặt ở đầu module Web Development để người mới có nền tảng dễ hiểu
import type { ExtendedProgrammingLesson } from "./types";

export const webDevBeginnerPrimer: ExtendedProgrammingLesson[] = [
  {
    id: "web-primer-how-web-works",
    title: "Web hoạt động thế nào? (Bài cho người mới)",
    titleEn: "How the Web Works (Beginner)",
    level: 1,
    difficulty: "beginner",
    codeLanguage: "html",
    theory: `## 1. 🌐 Hình dung đơn giản

Khi bạn gõ \`google.com\` trên trình duyệt:

\`\`\`text
1. Trình duyệt hỏi DNS:  "google.com ở IP nào?"
2. DNS trả lời:         "142.250.x.x"
3. Trình duyệt gửi HTTP request đến IP đó
4. Server Google trả về HTML + CSS + JS + ảnh
5. Trình duyệt vẽ ra trang bạn nhìn thấy
\`\`\`

> 💡 **Frontend** = phần chạy trong trình duyệt (HTML/CSS/JS). **Backend** = phần chạy trên server (Node, Python, Go...). **Database** = nơi lưu dữ liệu lâu dài.

## 2. 🧱 3 ngôn ngữ làm nên 1 trang web

| Ngôn ngữ | Vai trò | Ví dụ đời thường |
|---|---|---|
| **HTML** | Cấu trúc - "bộ xương" | Khung nhà |
| **CSS** | Trang trí - "lớp sơn" | Sơn, gạch lát |
| **JavaScript** | Hành vi - "điện nước" | Đèn bật/tắt, nước chảy |

## 3. 🎯 Ví dụ siêu nhỏ

\`\`\`html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Trang đầu tiên của tôi</title>
  </head>
  <body>
    <h1>Xin chào, Hải!</h1>
    <p>Đây là trang web đầu tiên do tôi viết.</p>
    <button onclick="alert('Bạn vừa bấm nút!')">Bấm tôi</button>
  </body>
</html>
\`\`\`

Lưu file thành \`index.html\` → mở bằng trình duyệt → bạn vừa có web.

## 4. 🔑 4 thuật ngữ cần thuộc

- **URL** = địa chỉ của 1 trang (\`https://haiedutech.com/about\`).
- **HTTP** = ngôn ngữ trình duyệt nói chuyện với server (GET = lấy, POST = gửi).
- **Status code:** 200 OK, 301 chuyển hướng, 404 không thấy, 500 server lỗi.
- **Responsive** = trang hiển thị tốt trên cả điện thoại và máy tính.

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ Cảnh báo:
> - "HTML là ngôn ngữ lập trình" - sai. HTML là **ngôn ngữ đánh dấu** (markup).
> - "JavaScript = Java" - sai. Hai ngôn ngữ khác nhau hoàn toàn.
> - "Cần học backend thì mới có web" - sai. Trang tĩnh (HTML+CSS) đã là web rồi.

## 6. ✅ Best practice cho người mới

> 💡 Mẹo:
> - Học HTML 3 ngày → CSS 1 tuần → JavaScript 2-3 tuần → mới động đến framework.
> - Mở DevTools (F12) trên trang yêu thích và xem họ viết HTML như thế nào.
> - Mỗi project nhỏ deploy ngay lên **GitHub Pages** hoặc **Netlify** để có link khoe.
`,
    theoryEn: `## 1. 🌐 The big picture

When you type \`google.com\`, your browser asks DNS for the IP, sends an HTTP request, the server responds with HTML/CSS/JS/images, and the browser renders the page.

> 💡 Frontend = runs in the browser. Backend = runs on the server. Database = persistent storage.

## 2. 🧱 The three web languages

HTML = structure (skeleton). CSS = style (paint). JavaScript = behaviour (electricity).

## 3. 🎯 Tiny example

Save the snippet as \`index.html\` and open in a browser. That is already a website.

## 4. 🔑 Four terms to remember

URL, HTTP verbs (GET/POST), status codes (200/301/404/500), and responsive design.

## 5. ⚠️ Common myths

HTML is not a programming language. JavaScript is not Java. A static HTML+CSS page is already a website.

## 6. ✅ Best practice

3 days HTML → 1 week CSS → 2-3 weeks JS → only then a framework. Inspect real sites with DevTools. Deploy small projects on GitHub Pages or Netlify.
`,
    code: `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Trang đầu tiên</title>
    <style>
      body { font-family: sans-serif; padding: 24px; background: #f8fafc; }
      h1 { color: #2563eb; }
      button { padding: 10px 16px; border-radius: 8px; border: 0; background: #10b981; color: white; }
    </style>
  </head>
  <body>
    <h1>Xin chào, Hải!</h1>
    <p>Đây là trang web đầu tiên do tôi viết.</p>
    <button onclick="alert('Bạn vừa bấm nút!')">Bấm tôi</button>
  </body>
</html>
`,
    exercise: "Tạo 1 file `about.html` giới thiệu bản thân: tên, sở thích, 1 nút bấm hiện lời chào bằng alert().",
    exerciseEn: "Create an `about.html` introducing yourself with name, hobbies, and a button that triggers an alert greeting.",
    quiz: [
      {
        question: "Vai trò của CSS trong trang web?",
        options: ["Tạo cấu trúc dữ liệu", "Trang trí và bố cục", "Xử lý logic", "Kết nối database"],
        answer: 1,
        explanation: "CSS lo phần hình thức: màu sắc, font, bố cục.",
        questionEn: "What does CSS do?",
        optionsEn: ["Structure", "Styling and layout", "Logic", "Database"],
        explanationEn: "CSS handles look and layout."
      },
      {
        question: "Status code 404 nghĩa là gì?",
        options: ["Thành công", "Chuyển hướng", "Không tìm thấy tài nguyên", "Server lỗi"],
        answer: 2,
        explanation: "404 = Not Found.",
        questionEn: "What does 404 mean?",
        optionsEn: ["Success", "Redirect", "Resource not found", "Server error"],
        explanationEn: "404 means the resource was not found."
      },
      {
        question: "Khẳng định nào ĐÚNG?",
        options: [
          "JavaScript chính là Java",
          "HTML là ngôn ngữ lập trình",
          "Một trang HTML + CSS không có JS vẫn là một website",
          "Backend bắt buộc với mọi trang web"
        ],
        answer: 2,
        explanation: "Trang tĩnh hoàn toàn có thể chạy mà không cần backend hay JavaScript.",
        questionEn: "Which statement is correct?",
        optionsEn: ["JS is Java", "HTML is a programming language", "An HTML+CSS-only page is still a website", "Backend is mandatory"],
        explanationEn: "Static pages count as websites."
      }
    ]
  },
  {
    id: "web-primer-html-css-essentials",
    title: "HTML + CSS căn bản: dựng trang trong 30 phút",
    titleEn: "HTML + CSS Essentials in 30 Minutes",
    level: 1,
    difficulty: "beginner",
    codeLanguage: "html",
    theory: `## 1. 🧱 Cấu trúc 1 file HTML

\`\`\`html
<!DOCTYPE html>          <!-- Khai báo HTML5 -->
<html lang="vi">
  <head>                 <!-- Thông tin meta, không hiện ra -->
    <meta charset="UTF-8" />
    <title>Tên tab</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>                 <!-- Nội dung hiển thị -->
    <h1>Tiêu đề lớn</h1>
    <p>Đoạn văn</p>
  </body>
</html>
\`\`\`

## 2. 🏷️ 10 thẻ HTML hay dùng

| Thẻ | Dùng để |
|---|---|
| \`<h1>\`-\`<h6>\` | Tiêu đề (h1 lớn nhất) |
| \`<p>\` | Đoạn văn |
| \`<a href="...">\` | Liên kết |
| \`<img src="..." alt="..." />\` | Ảnh (luôn có \`alt\`) |
| \`<ul><li>\` | Danh sách không thứ tự |
| \`<ol><li>\` | Danh sách có số |
| \`<button>\` | Nút bấm |
| \`<input>\` | Ô nhập |
| \`<form>\` | Form gửi dữ liệu |
| \`<div>\`, \`<section>\` | Khối chứa nội dung |

## 3. 🎨 CSS 5 thuộc tính sống còn

\`\`\`css
.card {
  color: #1e293b;         /* màu chữ */
  background: #ffffff;    /* màu nền */
  padding: 16px;          /* khoảng đệm trong */
  margin: 12px;           /* khoảng cách ngoài */
  border-radius: 12px;    /* bo góc */
}
\`\`\`

## 4. 📐 Flexbox - căn chỉnh không đau đầu

\`\`\`css
.row {
  display: flex;
  gap: 12px;              /* khoảng cách giữa các con */
  justify-content: center;/* căn ngang */
  align-items: center;    /* căn dọc */
}
\`\`\`

> 💡 90% layout hằng ngày chỉ cần \`flex\` + \`gap\`.

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ Cảnh báo:
> - Dùng \`<div>\` cho mọi thứ → khó đọc + xấu SEO. Hãy dùng \`<header>\`, \`<main>\`, \`<footer>\`, \`<article>\` khi phù hợp.
> - Bỏ \`alt\` cho \`<img>\` → mất điểm SEO + người khiếm thị không đọc được.
> - Set kích thước bằng \`px\` mọi nơi → không responsive. Dùng \`rem\`, \`%\`, \`vw\` khi cần.

## 6. ✅ Best practice

> 💡 Mẹo:
> - Mỗi file CSS bắt đầu với \`* { box-sizing: border-box; }\` để chiều rộng dễ tính.
> - Luôn thêm \`<meta name="viewport" content="width=device-width, initial-scale=1" />\` để responsive.
> - Học **mobile-first**: viết CSS cho điện thoại trước, mở rộng lên desktop bằng media query.
`,
    theoryEn: `## 1. 🧱 HTML file structure

Standard skeleton with \`<!DOCTYPE html>\`, \`<head>\`, and \`<body>\`.

## 2. 🏷️ Ten common tags

Headings h1-h6, p, a, img (always with alt), ul/ol/li, button, input, form, div/section.

## 3. 🎨 CSS five must-know properties

color, background, padding, margin, border-radius.

## 4. 📐 Flexbox layout

\`display: flex; gap: 12px; justify-content: center; align-items: center;\` covers most cases.

## 5. ⚠️ Common myths

Avoid div-soup, never skip alt on images, prefer rem/%/vw over hard-coded px.

## 6. ✅ Best practice

Reset with box-sizing border-box, always include the responsive viewport meta tag, code mobile-first.
`,
    code: `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Profile card</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: system-ui, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
      .card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); width: min(320px, 90vw); text-align: center; }
      .card img { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; margin-bottom: 12px; }
      .card h2 { color: #1e293b; margin-bottom: 4px; }
      .card p { color: #64748b; }
    </style>
  </head>
  <body>
    <article class="card">
      <img src="https://i.pravatar.cc/200" alt="Ảnh đại diện" />
      <h2>Nguyễn Văn Hải</h2>
      <p>Học viên HaiEduTech</p>
    </article>
  </body>
</html>
`,
    exercise: "Tạo 1 trang HTML gồm: tiêu đề, ảnh đại diện, 3 thẻ social link (Facebook, GitHub, Email) dùng flexbox để xếp ngang, có hover đổi màu.",
    exerciseEn: "Build a small HTML page with a heading, avatar, and 3 social links laid out horizontally with flexbox and a hover colour change.",
    quiz: [
      {
        question: "Thuộc tính nào tạo khoảng cách BÊN TRONG khung của 1 phần tử?",
        options: ["margin", "padding", "gap", "border"],
        answer: 1,
        explanation: "padding = đệm trong, margin = lề ngoài.",
        questionEn: "Which property adds space INSIDE an element?",
        optionsEn: ["margin", "padding", "gap", "border"],
        explanationEn: "padding is inside; margin is outside."
      },
      {
        question: "Để căn nội dung GIỮA theo cả ngang và dọc bằng flex?",
        options: [
          "text-align: center; vertical-align: middle;",
          "display: flex; justify-content: center; align-items: center;",
          "position: center;",
          "margin: auto; padding: auto;"
        ],
        answer: 1,
        explanation: "Flexbox chuẩn: justify-content (trục chính), align-items (trục phụ).",
        questionEn: "Center content both axes with flex?",
        optionsEn: ["text-align center", "display flex + justify-content center + align-items center", "position center", "margin auto padding auto"],
        explanationEn: "Flexbox uses justify-content + align-items."
      },
      {
        question: "Tại sao luôn thêm thuộc tính `alt` cho thẻ `<img>`?",
        options: [
          "Bắt buộc để ảnh hiển thị",
          "Tăng tốc tải trang",
          "Giúp SEO và người khiếm thị (screen reader) hiểu nội dung",
          "Đổi màu ảnh"
        ],
        answer: 2,
        explanation: "alt mô tả ảnh cho SEO + screen reader, và hiện ra khi ảnh lỗi.",
        questionEn: "Why always add alt to <img>?",
        optionsEn: ["Required to show", "Speeds up loading", "Helps SEO and screen readers", "Changes colour"],
        explanationEn: "alt aids accessibility and SEO."
      }
    ]
  },
  {
    id: "web-primer-js-first-steps",
    title: "JavaScript bước đầu: làm trang web 'sống'",
    titleEn: "JavaScript First Steps: Make Pages Interactive",
    level: 1,
    difficulty: "beginner",
    codeLanguage: "javascript",
    theory: `## 1. ⚡ JavaScript làm gì?

HTML là khung, CSS là sơn, **JavaScript** là điện - cho phép trang web **phản ứng** khi người dùng bấm, gõ, cuộn.

## 2. 🧠 5 khái niệm nền tảng

| Khái niệm | Ví dụ |
|---|---|
| **Biến** | \`let name = "Hải";\` |
| **Hàm** | \`function greet(n) { return "Hi " + n; }\` |
| **Điều kiện** | \`if (age >= 18) { ... } else { ... }\` |
| **Vòng lặp** | \`for (let i = 0; i < 5; i++) { ... }\` |
| **Mảng** | \`const fruits = ["táo", "cam"];\` |

\`const\` (không đổi) ưu tiên hơn \`let\` (đổi được). **Đừng dùng** \`var\`.

## 3. 🖱️ Bắt sự kiện bấm

\`\`\`html
<button id="btn">Bấm tôi</button>
<p id="msg"></p>
<script>
  const btn = document.getElementById("btn");
  const msg = document.getElementById("msg");
  let count = 0;
  btn.addEventListener("click", () => {
    count += 1;
    msg.textContent = "Bạn đã bấm " + count + " lần";
  });
</script>
\`\`\`

## 4. 🎯 Ví dụ thực tế: kiểm tra form

\`\`\`html
<input id="email" placeholder="Nhập email" />
<button id="check">Kiểm tra</button>
<p id="result"></p>
<script>
  document.getElementById("check").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const ok = email.includes("@") && email.includes(".");
    document.getElementById("result").textContent =
      ok ? "✅ Email hợp lệ" : "❌ Email không hợp lệ";
  });
</script>
\`\`\`

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ Cảnh báo:
> - \`==\` so sánh lỏng (\`"3" == 3\` đúng). Luôn dùng \`===\`.
> - \`null\` ≠ \`undefined\`. \`null\` là "rỗng có chủ ý", \`undefined\` là "chưa gán".
> - Quên \`addEventListener\` chạy sau khi DOM load → đặt \`<script>\` cuối \`<body>\` hoặc dùng \`defer\`.

## 6. ✅ Best practice

> 💡 Mẹo:
> - 1 hàm = 1 việc.
> - Tránh logic dài trong inline \`onclick=""\`. Dùng \`addEventListener\`.
> - Dùng template string: \`\\\`Xin chào \${name}\\\`\` đẹp hơn nối + chuỗi.
> - Mở DevTools → tab Console → gõ thử lệnh JS để học nhanh.
`,
    theoryEn: `## 1. ⚡ What JavaScript does

HTML = skeleton, CSS = paint, JavaScript = electricity, making pages react to clicks, typing, scrolling.

## 2. 🧠 Five basics

Variables, functions, conditions, loops, arrays. Prefer \`const\` over \`let\`, never use \`var\`.

## 3. 🖱️ Listening to events

Use \`addEventListener\` instead of inline handlers.

## 4. 🎯 Real-world snippet

Form check that validates an email string contains \`@\` and \`.\`.

## 5. ⚠️ Common myths

Always use \`===\` not \`==\`. \`null\` and \`undefined\` differ. Place \`<script>\` at the end of body or use \`defer\`.

## 6. ✅ Best practice

One function, one job. Prefer \`addEventListener\` over inline \`onclick\`. Use template strings. Practise in DevTools Console.
`,
    code: `// Đếm số lần bấm và hiện ra màn hình
const btn = document.getElementById("btn");
const msg = document.getElementById("msg");
let count = 0;

btn.addEventListener("click", () => {
  count += 1;
  msg.textContent = \`Bạn đã bấm \${count} lần\`;
});
`,
    exercise: "Xây 1 trang có ô nhập số và nút 'Kiểm tra'. Nếu số chẵn → hiện 'Số chẵn ✅', nếu lẻ → 'Số lẻ ❌'. Dùng addEventListener.",
    exerciseEn: "Build a page with a number input and a Check button. Show 'Even ✅' or 'Odd ❌' using addEventListener.",
    quiz: [
      {
        question: "Nên dùng cái nào để khai báo biến không thay đổi?",
        options: ["var", "let", "const", "function"],
        answer: 2,
        explanation: "`const` cho giá trị không gán lại. `let` cho giá trị thay đổi.",
        questionEn: "Which keyword for a non-reassigned variable?",
        optionsEn: ["var", "let", "const", "function"],
        explanationEn: "Use const for constants."
      },
      {
        question: "Toán tử so sánh nào nên dùng để tránh ép kiểu ngầm?",
        options: ["==", "===", "=", "!="],
        answer: 1,
        explanation: "`===` so sánh cả giá trị lẫn kiểu.",
        questionEn: "Which comparison avoids type coercion?",
        optionsEn: ["==", "===", "=", "!="],
        explanationEn: "=== checks value and type."
      },
      {
        question: "Cách 'sạch' để gắn hành vi cho nút?",
        options: [
          "<button onclick=\"...10 dòng JS...\">",
          "Dùng addEventListener trong file JS riêng",
          "Viết JS trong attribute style",
          "Không thể gắn được"
        ],
        answer: 1,
        explanation: "Tách HTML và JS giúp dễ bảo trì, test, tái sử dụng.",
        questionEn: "Cleanest way to bind a click handler?",
        optionsEn: ["Inline 10-line onclick", "addEventListener in a JS file", "JS in style attribute", "Impossible"],
        explanationEn: "Separating concerns aids maintainability."
      }
    ]
  }
];

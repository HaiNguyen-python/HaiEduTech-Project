/**
 * @file englishSatExpansion5.ts
 * @description Deep-dive SAT Math expansion - Algebra/Functions, Statistics & Data Analysis,
 *              and Geometry & Trigonometry with detailed bilingual theory and inline SVG
 *              diagrams (function graphs, geometric figures, distribution charts).
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { LanguageModule } from "./types";

/* ---------- Reusable inline SVG diagrams (kept tiny, theme-aware via currentColor) ---------- */

const SVG_PARABOLA = `
<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parabola y = (x-2)^2 - 3" style="width:100%;max-width:420px;display:block;margin:12px 0;background:hsl(var(--muted));border-radius:8px">
  <g stroke="currentColor" stroke-width="1" opacity="0.25">
    ${Array.from({ length: 9 }).map((_, i) => `<line x1="${20 + i * 35}" y1="10" x2="${20 + i * 35}" y2="200"/>`).join("")}
    ${Array.from({ length: 6 }).map((_, i) => `<line x1="20" y1="${20 + i * 35}" x2="300" y2="${20 + i * 35}"/>`).join("")}
  </g>
  <line x1="20" y1="120" x2="300" y2="120" stroke="currentColor" stroke-width="1.5"/>
  <line x1="160" y1="10" x2="160" y2="210" stroke="currentColor" stroke-width="1.5"/>
  <text x="295" y="115" font-size="11" fill="currentColor">x</text>
  <text x="165" y="18" font-size="11" fill="currentColor">y</text>
  <path d="M 40 35 Q 160 320 280 35" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2.5"/>
  <circle cx="230" cy="155" r="4" fill="hsl(160 84% 39%)"/>
  <text x="238" y="160" font-size="11" fill="currentColor">vertex (2,-3)</text>
  <circle cx="160" cy="85" r="3" fill="hsl(0 84% 60%)"/>
  <text x="100" y="80" font-size="11" fill="currentColor">y-intercept (0,1)</text>
</svg>
`.trim();

const SVG_LINEAR_SYSTEM = `
<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Linear system intersection" style="width:100%;max-width:420px;display:block;margin:12px 0;background:hsl(var(--muted));border-radius:8px">
  <g stroke="currentColor" stroke-width="1" opacity="0.25">
    ${Array.from({ length: 9 }).map((_, i) => `<line x1="${20 + i * 35}" y1="10" x2="${20 + i * 35}" y2="200"/>`).join("")}
    ${Array.from({ length: 6 }).map((_, i) => `<line x1="20" y1="${20 + i * 35}" x2="300" y2="${20 + i * 35}"/>`).join("")}
  </g>
  <line x1="20" y1="120" x2="300" y2="120" stroke="currentColor" stroke-width="1.5"/>
  <line x1="160" y1="10" x2="160" y2="210" stroke="currentColor" stroke-width="1.5"/>
  <line x1="30" y1="40" x2="290" y2="190" stroke="hsl(217 91% 60%)" stroke-width="2.5"/>
  <line x1="30" y1="200" x2="290" y2="30" stroke="hsl(160 84% 39%)" stroke-width="2.5"/>
  <circle cx="160" cy="115" r="5" fill="hsl(0 84% 60%)"/>
  <text x="170" y="110" font-size="11" fill="currentColor">solution (x,y)</text>
  <text x="270" y="195" font-size="11" fill="hsl(217 91% 60%)">y = x - 1</text>
  <text x="35" y="195" font-size="11" fill="hsl(160 84% 39%)">y = -x + 5</text>
</svg>
`.trim();

const SVG_TRIANGLE_RIGHT = `
<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right triangle 3-4-5" style="width:100%;max-width:380px;display:block;margin:12px 0;background:hsl(var(--muted));border-radius:8px">
  <polygon points="60,180 60,40 260,180" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)" stroke-width="2"/>
  <rect x="60" y="165" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="35" y="115" font-size="13" fill="currentColor" font-weight="600">a = 3</text>
  <text x="150" y="200" font-size="13" fill="currentColor" font-weight="600">b = 4</text>
  <text x="160" y="100" font-size="13" fill="hsl(0 84% 60%)" font-weight="700">c = 5</text>
  <text x="160" y="118" font-size="11" fill="currentColor">(hypotenuse)</text>
  <text x="65" y="35" font-size="11" fill="currentColor">90°</text>
</svg>
`.trim();

const SVG_CIRCLE = `
<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle with radius and chord" style="width:100%;max-width:380px;display:block;margin:12px 0;background:hsl(var(--muted));border-radius:8px">
  <circle cx="160" cy="120" r="80" fill="hsl(160 84% 39% / 0.12)" stroke="hsl(160 84% 39%)" stroke-width="2"/>
  <circle cx="160" cy="120" r="3" fill="currentColor"/>
  <line x1="160" y1="120" x2="160" y2="40" stroke="hsl(217 91% 60%)" stroke-width="2"/>
  <text x="165" y="80" font-size="12" fill="hsl(217 91% 60%)" font-weight="600">r</text>
  <line x1="100" y1="170" x2="220" y2="170" stroke="hsl(0 84% 60%)" stroke-width="2"/>
  <text x="225" y="175" font-size="12" fill="hsl(0 84% 60%)" font-weight="600">chord</text>
  <text x="155" y="135" font-size="11" fill="currentColor">center</text>
  <text x="20" y="20" font-size="11" fill="currentColor">Area = πr²   |   Circumference = 2πr</text>
</svg>
`.trim();

const SVG_NORMAL_DIST = `
<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Normal distribution 68-95-99.7" style="width:100%;max-width:480px;display:block;margin:12px 0;background:hsl(var(--muted));border-radius:8px">
  <line x1="20" y1="180" x2="340" y2="180" stroke="currentColor" stroke-width="1.5"/>
  <path d="M 20 180 Q 90 180 130 130 Q 160 50 180 50 Q 200 50 230 130 Q 270 180 340 180" fill="hsl(217 91% 60% / 0.25)" stroke="hsl(217 91% 60%)" stroke-width="2"/>
  ${[60, 100, 140, 180, 220, 260, 300].map((x, i) => `<line x1="${x}" y1="180" x2="${x}" y2="187" stroke="currentColor"/><text x="${x - 8}" y="200" font-size="10" fill="currentColor">${i - 3}σ</text>`).join("")}
  <text x="155" y="115" font-size="11" fill="currentColor" font-weight="600">68%</text>
  <text x="120" y="150" font-size="10" fill="currentColor">95%</text>
  <text x="80" y="170" font-size="10" fill="currentColor">99.7%</text>
  <text x="160" y="215" font-size="10" fill="currentColor">μ (mean)</text>
</svg>
`.trim();

const SVG_BOXPLOT = `
<svg viewBox="0 0 360 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Box plot with quartiles" style="width:100%;max-width:480px;display:block;margin:12px 0;background:hsl(var(--muted));border-radius:8px">
  <line x1="20" y1="130" x2="340" y2="130" stroke="currentColor" stroke-width="1.5"/>
  ${[40, 100, 160, 220, 280, 340].map((x, i) => `<line x1="${x}" y1="130" x2="${x}" y2="136" stroke="currentColor"/><text x="${x - 5}" y="150" font-size="10" fill="currentColor">${i * 10}</text>`).join("")}
  <line x1="60" y1="80" x2="100" y2="80" stroke="currentColor" stroke-width="2"/>
  <line x1="60" y1="65" x2="60" y2="95" stroke="currentColor" stroke-width="2"/>
  <rect x="100" y="55" width="160" height="50" fill="hsl(160 84% 39% / 0.25)" stroke="hsl(160 84% 39%)" stroke-width="2"/>
  <line x1="180" y1="55" x2="180" y2="105" stroke="hsl(0 84% 60%)" stroke-width="3"/>
  <line x1="260" y1="80" x2="300" y2="80" stroke="currentColor" stroke-width="2"/>
  <line x1="300" y1="65" x2="300" y2="95" stroke="currentColor" stroke-width="2"/>
  <text x="50" y="50" font-size="10" fill="currentColor">min</text>
  <text x="92" y="50" font-size="10" fill="currentColor">Q1</text>
  <text x="170" y="48" font-size="10" fill="hsl(0 84% 60%)" font-weight="700">median</text>
  <text x="252" y="50" font-size="10" fill="currentColor">Q3</text>
  <text x="290" y="50" font-size="10" fill="currentColor">max</text>
  <text x="120" y="125" font-size="10" fill="currentColor">IQR = Q3 - Q1</text>
</svg>
`.trim();

const SVG_SCATTER = `
<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scatter plot with line of best fit" style="width:100%;max-width:420px;display:block;margin:12px 0;background:hsl(var(--muted));border-radius:8px">
  <line x1="40" y1="180" x2="300" y2="180" stroke="currentColor" stroke-width="1.5"/>
  <line x1="40" y1="20" x2="40" y2="180" stroke="currentColor" stroke-width="1.5"/>
  ${[[60,160],[80,150],[100,140],[120,135],[140,120],[160,110],[180,105],[200,90],[220,80],[240,70],[260,60],[150,128],[190,98],[110,148]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="4" fill="hsl(217 91% 60%)"/>`).join("")}
  <line x1="50" y1="170" x2="290" y2="55" stroke="hsl(0 84% 60%)" stroke-width="2.5" stroke-dasharray="0"/>
  <text x="200" y="50" font-size="11" fill="hsl(0 84% 60%)" font-weight="600">y = mx + b</text>
  <text x="295" y="195" font-size="11" fill="currentColor">x</text>
  <text x="25" y="25" font-size="11" fill="currentColor">y</text>
  <text x="50" y="200" font-size="10" fill="currentColor">positive correlation</text>
</svg>
`.trim();

const SVG_HISTOGRAM = `
<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Histogram of test scores" style="width:100%;max-width:480px;display:block;margin:12px 0;background:hsl(var(--muted));border-radius:8px">
  <line x1="40" y1="180" x2="340" y2="180" stroke="currentColor" stroke-width="1.5"/>
  <line x1="40" y1="20" x2="40" y2="180" stroke="currentColor" stroke-width="1.5"/>
  ${[[50,8],[95,18],[140,38],[185,55],[230,40],[275,22],[320,10]].map(([x, h], i) => `<rect x="${x}" y="${180 - h * 2.5}" width="40" height="${h * 2.5}" fill="hsl(217 91% 60% / 0.7)" stroke="hsl(217 91% 60%)" stroke-width="1.5"/><text x="${x + 12}" y="195" font-size="9" fill="currentColor">${50 + i * 10}</text><text x="${x + 14}" y="${175 - h * 2.5}" font-size="9" fill="currentColor">${h}</text>`).join("")}
  <text x="150" y="215" font-size="10" fill="currentColor">Score range (frequency)</text>
  <text x="25" y="25" font-size="10" fill="currentColor">freq</text>
</svg>
`.trim();

const SVG_UNIT_CIRCLE = `
<svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Unit circle with key angles" style="width:100%;max-width:380px;display:block;margin:12px 0;background:hsl(var(--muted));border-radius:8px">
  <circle cx="140" cy="140" r="100" fill="none" stroke="hsl(217 91% 60%)" stroke-width="2"/>
  <line x1="20" y1="140" x2="260" y2="140" stroke="currentColor" stroke-width="1"/>
  <line x1="140" y1="20" x2="140" y2="260" stroke="currentColor" stroke-width="1"/>
  <line x1="140" y1="140" x2="220" y2="80" stroke="hsl(0 84% 60%)" stroke-width="2"/>
  <circle cx="220" cy="80" r="3" fill="hsl(0 84% 60%)"/>
  <text x="225" y="78" font-size="11" fill="currentColor">(cos θ, sin θ)</text>
  <path d="M 180 140 A 40 40 0 0 0 196 110" fill="none" stroke="hsl(160 84% 39%)" stroke-width="2"/>
  <text x="190" y="135" font-size="11" fill="hsl(160 84% 39%)">θ</text>
  <text x="245" y="155" font-size="10" fill="currentColor">0°</text>
  <text x="135" y="18" font-size="10" fill="currentColor">90°</text>
  <text x="10" y="155" font-size="10" fill="currentColor">180°</text>
  <text x="135" y="275" font-size="10" fill="currentColor">270°</text>
  <text x="60" y="270" font-size="10" fill="currentColor">tan θ = sin θ / cos θ</text>
</svg>
`.trim();

const SVG_SIMILAR_TRIANGLES = `
<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Similar triangles" style="width:100%;max-width:480px;display:block;margin:12px 0;background:hsl(var(--muted));border-radius:8px">
  <polygon points="40,180 40,120 120,180" fill="hsl(217 91% 60% / 0.2)" stroke="hsl(217 91% 60%)" stroke-width="2"/>
  <text x="20" y="150" font-size="11" fill="currentColor">3</text>
  <text x="70" y="200" font-size="11" fill="currentColor">4</text>
  <text x="80" y="145" font-size="11" fill="currentColor">5</text>
  <polygon points="180,200 180,80 340,200" fill="hsl(160 84% 39% / 0.2)" stroke="hsl(160 84% 39%)" stroke-width="2"/>
  <text x="160" y="145" font-size="11" fill="currentColor">6</text>
  <text x="250" y="220" font-size="11" fill="currentColor">8</text>
  <text x="260" y="135" font-size="11" fill="currentColor">10</text>
  <text x="60" y="40" font-size="12" fill="currentColor" font-weight="600">△ABC ~ △DEF (ratio 1:2)</text>
  <text x="60" y="60" font-size="11" fill="currentColor">Corresponding sides proportional, angles equal</text>
</svg>
`.trim();

/* ============================================================
 * SAT Math Expansion 5 - Detailed bilingual theory + SVG visuals
 * ============================================================ */
export const satExpansionModules5: LanguageModule[] = [
  /* ============= ALGEBRA & FUNCTIONS ============= */
  {
    id: "sat-math-functions-deepdive",
    title: "Hàm số chuyên sâu cho Digital SAT",
    titleEn: "SAT Functions Deep Dive",
    icon: "📈",
    color: "from-blue-500 to-indigo-600",
    description: "Hàm tuyến tính, bậc 2 và hệ phương trình với biểu đồ trực quan.",
    descriptionEn: "Linear, quadratic functions and systems with visual graphs.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-quadratic-graph",
        title: "Đọc đồ thị hàm bậc 2 (Parabola)",
        titleEn: "Reading Quadratic Function Graphs",
        level: 4,
        difficulty: "intermediate",
        theory: `## Đồ thị Parabola - Đọc & Giải bằng tiếng Anh

Khoảng **15-20% câu Math** trên Digital SAT yêu cầu đọc hoặc phân tích parabola. Hãy nhớ ba dạng phổ biến:

### Ba dạng phương trình bậc 2
| Dạng | Công thức | Cho biết |
|------|-----------|----------|
| **Standard** | y = ax² + bx + c | y-intercept = c |
| **Vertex** | y = a(x − h)² + k | đỉnh (h, k) |
| **Factored** | y = a(x − r₁)(x − r₂) | x-intercepts r₁, r₂ |

### Ví dụ minh họa: y = (x − 2)² − 3

${SVG_PARABOLA}

- **Vertex** (đỉnh): điểm (2, −3) - vì h = 2, k = −3
- **Axis of symmetry**: đường thẳng x = 2
- **Direction**: parabola mở lên vì a = 1 > 0
- **y-intercept**: thay x = 0 → y = (0 − 2)² − 3 = 4 − 3 = 1

### Discriminant (biệt thức) - Δ = b² − 4ac
- Δ > 0 → 2 nghiệm thực phân biệt (cắt trục x tại 2 điểm)
- Δ = 0 → 1 nghiệm kép (tiếp xúc trục x)
- Δ < 0 → vô nghiệm thực (không cắt trục x)

### Cụm từ tiếng Anh thường gặp
- "The parabola opens upward/downward" → a > 0 hoặc a < 0
- "The minimum/maximum value" → giá trị y tại đỉnh
- "The graph is symmetric about the line x = h" → trục đối xứng`,
        theoryEn: `## Parabola Graphs - Reading & Solving in English

Roughly **15-20% of Digital SAT Math** asks you to read or analyse a parabola. Master three common forms:

### Three quadratic forms
| Form | Formula | Reveals |
|------|---------|---------|
| **Standard** | y = ax² + bx + c | y-intercept = c |
| **Vertex** | y = a(x − h)² + k | vertex (h, k) |
| **Factored** | y = a(x − r₁)(x − r₂) | x-intercepts r₁, r₂ |

### Worked example: y = (x − 2)² − 3

${SVG_PARABOLA}

- **Vertex**: point (2, −3) since h = 2, k = −3
- **Axis of symmetry**: vertical line x = 2
- **Direction**: opens upward because a = 1 > 0
- **y-intercept**: substitute x = 0 → y = (0 − 2)² − 3 = 4 − 3 = 1

### Discriminant - Δ = b² − 4ac
- Δ > 0 → 2 distinct real roots (parabola crosses x-axis twice)
- Δ = 0 → 1 double root (tangent to x-axis)
- Δ < 0 → no real roots (does not touch x-axis)

### Common SAT phrases
- "The parabola opens upward/downward" → sign of a
- "The minimum/maximum value" → y-coordinate of vertex
- "The graph is symmetric about the line x = h" → axis of symmetry`,
        proTips: [
          "Vertex form chuyển nhanh: y = a(x − h)² + k → đỉnh là (h, k), nhớ dấu trừ trong ngoặc.",
          "Biệt thức Δ = b² − 4ac quyết định số nghiệm - đừng cần giải hết!",
          "Nếu đề hỏi 'minimum value of y', câu trả lời chính là k của vertex form.",
        ],
        proTipsEn: [
          "Convert quickly to vertex form: y = a(x − h)² + k → vertex (h, k); mind the minus sign.",
          "The discriminant Δ = b² − 4ac decides the number of roots - no need to solve fully.",
          "If asked for 'minimum value of y', the answer is k from vertex form.",
        ],
        vocabulary: [
          { word: "parabola", partOfSpeech: "noun", meaning: "đường parabol", meaningEn: "U-shaped curve of a quadratic function", example: "The parabola opens upward when a is positive.", exampleEn: "The parabola opens upward when a is positive." },
          { word: "vertex", partOfSpeech: "noun", meaning: "đỉnh parabol", meaningEn: "highest or lowest point of a parabola", example: "The vertex of y = (x-3)² + 1 is (3, 1).", exampleEn: "The vertex of y = (x-3)² + 1 is (3, 1)." },
          { word: "axis of symmetry", partOfSpeech: "noun", meaning: "trục đối xứng", meaningEn: "vertical line dividing a parabola in half", example: "The axis of symmetry passes through the vertex.", exampleEn: "The axis of symmetry passes through the vertex." },
          { word: "discriminant", partOfSpeech: "noun", meaning: "biệt thức", meaningEn: "expression b² − 4ac that determines roots", example: "A negative discriminant means no real solutions.", exampleEn: "A negative discriminant means no real solutions." },
          { word: "x-intercept", partOfSpeech: "noun", meaning: "giao điểm trục hoành", meaningEn: "point where graph crosses the x-axis", example: "Set y = 0 to find the x-intercepts.", exampleEn: "Set y = 0 to find the x-intercepts." },
          { word: "y-intercept", partOfSpeech: "noun", meaning: "giao điểm trục tung", meaningEn: "point where graph crosses the y-axis", example: "The y-intercept of y = 2x + 5 is 5.", exampleEn: "The y-intercept of y = 2x + 5 is 5." },
          { word: "minimum value", partOfSpeech: "noun", meaning: "giá trị nhỏ nhất", meaningEn: "the smallest output of a function", example: "The minimum value of y = x² + 2 is 2.", exampleEn: "The minimum value of y = x² + 2 is 2." },
          { word: "maximum value", partOfSpeech: "noun", meaning: "giá trị lớn nhất", meaningEn: "the greatest output of a function", example: "When a < 0, the parabola has a maximum value.", exampleEn: "When a < 0, the parabola has a maximum value." },
          { word: "factored form", partOfSpeech: "noun", meaning: "dạng nhân tử", meaningEn: "y = a(x − r₁)(x − r₂)", example: "Factored form reveals the roots directly.", exampleEn: "Factored form reveals the roots directly." },
          { word: "symmetric", partOfSpeech: "adjective", meaning: "đối xứng", meaningEn: "balanced about a central line", example: "A parabola is symmetric about its axis.", exampleEn: "A parabola is symmetric about its axis." },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "The lowest point of an upward-opening parabola is called the ___.", textEn: "The lowest point of an upward-opening parabola is called the ___.", answer: "vertex" },
              { text: "If the discriminant is zero, the parabola has exactly ___ x-intercept.", textEn: "If the discriminant is zero, the parabola has exactly ___ x-intercept.", answer: "one" },
              { text: "In y = a(x − h)² + k, the parabola opens downward when a is ___.", textEn: "In y = a(x − h)² + k, the parabola opens downward when a is ___.", answer: "negative" },
              { text: "The y-intercept of y = x² − 4x + 7 is ___.", textEn: "The y-intercept of y = x² − 4x + 7 is ___.", answer: "7" },
            ],
          },
        ],
        quiz: [
          { question: "What is the vertex of y = (x + 3)² − 5?", options: ["(3, −5)", "(−3, −5)", "(−3, 5)", "(3, 5)"], answer: 1, explanation: "Vertex form: h = −3, k = −5 → (−3, −5)." },
          { question: "If b² − 4ac = 0, how many real solutions does ax² + bx + c = 0 have?", options: ["0", "1", "2", "infinitely many"], answer: 1, explanation: "A discriminant of zero gives exactly one repeated real root." },
          { question: "The parabola y = −2(x − 4)² + 9 has a:", options: ["minimum value of 9", "maximum value of 9", "minimum value of 4", "maximum value of 4"], answer: 1, explanation: "Since a = −2 < 0, parabola opens downward → maximum y = k = 9." },
          { question: "What is the axis of symmetry of y = x² − 6x + 8?", options: ["x = 3", "x = −3", "x = 6", "x = 8"], answer: 0, explanation: "Axis = −b/(2a) = 6/2 = 3." },
        ],
      },
      {
        id: "sat-linear-systems-graph",
        title: "Hệ phương trình tuyến tính & Đồ thị giao điểm",
        titleEn: "Linear Systems & Intersection Graphs",
        level: 4,
        difficulty: "intermediate",
        theory: `## Hệ phương trình tuyến tính

Một hệ hai phương trình tuyến tính với hai ẩn x và y có thể có **một**, **không**, hoặc **vô số** nghiệm - tùy thuộc vào quan hệ hình học giữa hai đường thẳng.

### Ba trường hợp
| Trường hợp | Đồ thị | Slope | Intercept |
|------------|--------|-------|-----------|
| **One solution** | hai đường cắt nhau | khác nhau | bất kỳ |
| **No solution** | hai đường song song | giống nhau | khác nhau |
| **Infinite** | trùng nhau | giống nhau | giống nhau |

### Ví dụ giao điểm

${SVG_LINEAR_SYSTEM}

Hệ: \`y = x − 1\` và \`y = −x + 5\`. Giao điểm: cộng hai phương trình → 2y = 4 → y = 2; thế lại → x = 3. Vậy nghiệm duy nhất là **(3, 2)**.

### Phương pháp giải nhanh
1. **Substitution** (thế): khi một biến đã cô lập (vd: y = 2x − 1).
2. **Elimination** (cộng/trừ): khi hệ số đối xứng (vd: 3x + 2y = 7 và 3x − 2y = 1).
3. **Graphing** (đồ thị): tốt cho hình dung nhưng không chính xác bằng đại số.

### Bẫy phổ biến trên SAT
- "The system has no solution" → so sánh slope của hai phương trình. Phải bằng nhau, intercept khác nhau.
- "Infinitely many solutions" → một phương trình là bội của phương trình kia.`,
        theoryEn: `## Linear Systems of Equations

A two-variable linear system can have **one**, **no**, or **infinitely many** solutions depending on the geometric relationship between the lines.

### Three cases
| Case | Graph | Slope | Intercept |
|------|-------|-------|-----------|
| **One solution** | lines intersect | different | any |
| **No solution** | parallel lines | equal | different |
| **Infinite** | coincident lines | equal | equal |

### Intersection example

${SVG_LINEAR_SYSTEM}

System: \`y = x − 1\` and \`y = −x + 5\`. Add the two equations → 2y = 4 → y = 2; back-substitute → x = 3. The unique solution is **(3, 2)**.

### Solving methods
1. **Substitution**: when one variable is already isolated (e.g., y = 2x − 1).
2. **Elimination**: when coefficients are symmetric (e.g., 3x + 2y = 7 and 3x − 2y = 1).
3. **Graphing**: useful for visualisation but less precise than algebra.

### Common SAT traps
- "The system has no solution" → compare slopes. They must be equal with different intercepts.
- "Infinitely many solutions" → one equation is a multiple of the other.`,
        proTips: [
          "Đưa cả hai phương trình về dạng y = mx + b để so sánh slope nhanh.",
          "Nếu đề có 'k' là tham số, giải bằng cách đặt slope/intercept bằng nhau.",
          "Khi cộng/trừ, mục tiêu là triệt tiêu một biến - chọn hệ số có cùng giá trị tuyệt đối.",
        ],
        proTipsEn: [
          "Rewrite both equations as y = mx + b to compare slopes quickly.",
          "If the prompt has parameter 'k', set slopes/intercepts equal to solve.",
          "When eliminating, your goal is to cancel one variable - pick coefficients with equal absolute value.",
        ],
        vocabulary: [
          { word: "system of equations", partOfSpeech: "noun", meaning: "hệ phương trình", meaningEn: "two or more equations solved together", example: "Solve the system to find x and y.", exampleEn: "Solve the system to find x and y." },
          { word: "substitution", partOfSpeech: "noun", meaning: "phương pháp thế", meaningEn: "replacing one variable with an expression", example: "Use substitution when y is already isolated.", exampleEn: "Use substitution when y is already isolated." },
          { word: "elimination", partOfSpeech: "noun", meaning: "phương pháp khử", meaningEn: "adding/subtracting to cancel a variable", example: "Elimination works when coefficients align.", exampleEn: "Elimination works when coefficients align." },
          { word: "intersection", partOfSpeech: "noun", meaning: "giao điểm", meaningEn: "point where two lines meet", example: "The intersection is the solution to the system.", exampleEn: "The intersection is the solution to the system." },
          { word: "parallel", partOfSpeech: "adjective", meaning: "song song", meaningEn: "lines that never meet", example: "Parallel lines have equal slopes.", exampleEn: "Parallel lines have equal slopes." },
          { word: "coincident", partOfSpeech: "adjective", meaning: "trùng nhau", meaningEn: "two lines that overlap completely", example: "Coincident lines yield infinite solutions.", exampleEn: "Coincident lines yield infinite solutions." },
          { word: "slope", partOfSpeech: "noun", meaning: "độ dốc", meaningEn: "rate of change of a line", example: "The slope of y = 4x + 1 is 4.", exampleEn: "The slope of y = 4x + 1 is 4." },
          { word: "isolate", partOfSpeech: "verb", meaning: "cô lập", meaningEn: "solve for one variable in terms of others", example: "Isolate y before substituting.", exampleEn: "Isolate y before substituting." },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "Two lines with the same slope and different y-intercepts are ___.", textEn: "Two lines with the same slope and different y-intercepts are ___.", answer: "parallel" },
              { text: "The point where two lines meet is the ___ of the system.", textEn: "The point where two lines meet is the ___ of the system.", answer: "intersection" },
              { text: "If one equation is 2y = 4x + 6 and the other is y = 2x + 3, the system has ___ solutions.", textEn: "If one equation is 2y = 4x + 6 and the other is y = 2x + 3, the system has ___ solutions.", answer: "infinitely many" },
            ],
          },
        ],
        quiz: [
          { question: "Solve: y = 2x + 1 and y = −x + 7. What is x?", options: ["2", "3", "4", "5"], answer: 0, explanation: "2x + 1 = −x + 7 → 3x = 6 → x = 2." },
          { question: "For what value of k does the system y = 3x + 2 and y = kx + 5 have no solution?", options: ["k = 2", "k = 3", "k = −3", "k = 5"], answer: 1, explanation: "Parallel lines have equal slopes → k = 3 (different intercepts ensures no solution)." },
          { question: "Which method is best when both equations are in standard form Ax + By = C?", options: ["graphing", "substitution", "elimination", "guessing"], answer: 2, explanation: "Elimination works best when both equations share standard form." },
        ],
      },
    ],
  },

  /* ============= STATISTICS & DATA ANALYSIS ============= */
  {
    id: "sat-stats-data-deepdive",
    title: "Thống kê & Phân tích dữ liệu chuyên sâu",
    titleEn: "SAT Statistics & Data Analysis Deep Dive",
    icon: "📊",
    color: "from-emerald-500 to-teal-600",
    description: "Trung bình, trung vị, độ lệch chuẩn, phân phối chuẩn và biểu đồ.",
    descriptionEn: "Mean, median, standard deviation, normal distribution, and charts.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-stats-center-spread",
        title: "Số đo trung tâm, độ phân tán & Box Plot",
        titleEn: "Measures of Center, Spread & Box Plots",
        level: 4,
        difficulty: "intermediate",
        theory: `## Số đo trung tâm & độ phân tán

Phần Statistics chiếm khoảng **15% Digital SAT Math**. Hai họ khái niệm quan trọng:

### Measures of center (trung tâm)
- **Mean** (trung bình cộng): tổng / số phần tử
- **Median** (trung vị): giá trị giữa khi sắp xếp tăng dần
- **Mode** (yếu vị): giá trị xuất hiện nhiều nhất

### Measures of spread (độ phân tán)
- **Range**: max − min
- **Interquartile range (IQR)**: Q3 − Q1
- **Standard deviation** (độ lệch chuẩn): mức độ dữ liệu lệch khỏi mean

### Box plot - đọc nhanh 5 con số

${SVG_BOXPLOT}

Boxplot hiển thị **5-number summary**: min, Q1, median, Q3, max. Hộp giữa chứa 50% dữ liệu (IQR). Đường đỏ trong hộp là median. "Whiskers" (râu) kéo đến min và max.

### Tác động của outliers
Outlier (giá trị bất thường) ảnh hưởng **mạnh** đến mean nhưng **rất ít** đến median.

> Ví dụ: dữ liệu {2, 3, 4, 5, 100}
> - Mean = 22.8 (bị kéo lệch bởi 100)
> - Median = 4 (vẫn ổn định)

Vì vậy nếu đề nói "the data set has an outlier", median thường là measure đáng tin cậy hơn.

### Bẫy SAT thường gặp
- "Adding a value greater than the current max" → mean tăng, median có thể không đổi.
- "Removing the smallest value" → cả mean và median có thể tăng.`,
        theoryEn: `## Measures of Center & Spread

Statistics is roughly **15% of Digital SAT Math**. Two essential concept families:

### Measures of center
- **Mean** (arithmetic average): total / count
- **Median**: middle value when sorted ascending
- **Mode**: most frequently occurring value

### Measures of spread
- **Range**: max − min
- **Interquartile range (IQR)**: Q3 − Q1
- **Standard deviation**: how far data deviate from the mean

### Box plot - reading the 5-number summary

${SVG_BOXPLOT}

A box plot displays the **5-number summary**: min, Q1, median, Q3, max. The middle box contains 50% of the data (IQR). The red line inside is the median. "Whiskers" extend to min and max.

### Impact of outliers
An outlier strongly affects the mean but barely touches the median.

> Example: data {2, 3, 4, 5, 100}
> - Mean = 22.8 (pulled by 100)
> - Median = 4 (stable)

If a prompt mentions "the data set has an outlier", the median is usually the more reliable measure.

### Common SAT traps
- "Adding a value greater than the current max" → mean rises, median may stay the same.
- "Removing the smallest value" → both mean and median may rise.`,
        proTips: [
          "Mean nhạy cảm với outliers - median thì không. Đề thi rất thích bẫy này.",
          "Để tìm median của n số: nếu n lẻ → giá trị thứ (n+1)/2; nếu n chẵn → trung bình của hai giá trị giữa.",
          "Standard deviation lớn nghĩa là dữ liệu phân tán rộng quanh mean.",
        ],
        proTipsEn: [
          "Mean is sensitive to outliers; median is not. SAT loves this trap.",
          "For n values: odd n → median is the (n+1)/2-th value; even n → average the two middle values.",
          "A larger standard deviation means data are more spread around the mean.",
        ],
        vocabulary: [
          { word: "mean", partOfSpeech: "noun", meaning: "trung bình cộng", meaningEn: "the arithmetic average of a data set", example: "The mean of 2, 4, 6 is 4.", exampleEn: "The mean of 2, 4, 6 is 4." },
          { word: "median", partOfSpeech: "noun", meaning: "trung vị", meaningEn: "the middle value of an ordered data set", example: "The median of 1, 3, 5, 7, 9 is 5.", exampleEn: "The median of 1, 3, 5, 7, 9 is 5." },
          { word: "mode", partOfSpeech: "noun", meaning: "yếu vị", meaningEn: "the value that occurs most often", example: "The mode of 2, 2, 3, 4 is 2.", exampleEn: "The mode of 2, 2, 3, 4 is 2." },
          { word: "range", partOfSpeech: "noun", meaning: "khoảng biến thiên", meaningEn: "max minus min", example: "The range of 1 to 10 is 9.", exampleEn: "The range of 1 to 10 is 9." },
          { word: "interquartile range", partOfSpeech: "noun", meaning: "khoảng tứ phân vị", meaningEn: "Q3 minus Q1", example: "IQR measures the middle 50% of data.", exampleEn: "IQR measures the middle 50% of data." },
          { word: "standard deviation", partOfSpeech: "noun", meaning: "độ lệch chuẩn", meaningEn: "average distance from the mean", example: "A high standard deviation means more variability.", exampleEn: "A high standard deviation means more variability." },
          { word: "outlier", partOfSpeech: "noun", meaning: "giá trị ngoại lai", meaningEn: "a value far from the others", example: "100 is an outlier in {2, 3, 4, 5, 100}.", exampleEn: "100 is an outlier in {2, 3, 4, 5, 100}." },
          { word: "quartile", partOfSpeech: "noun", meaning: "tứ phân vị", meaningEn: "values dividing data into four equal parts", example: "Q1 is the 25th percentile.", exampleEn: "Q1 is the 25th percentile." },
          { word: "box plot", partOfSpeech: "noun", meaning: "biểu đồ hộp", meaningEn: "chart showing 5-number summary", example: "A box plot quickly reveals data spread.", exampleEn: "A box plot quickly reveals data spread." },
          { word: "skewed", partOfSpeech: "adjective", meaning: "lệch", meaningEn: "asymmetric distribution", example: "The data are skewed to the right.", exampleEn: "The data are skewed to the right." },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "The middle value of an ordered list is the ___.", textEn: "The middle value of an ordered list is the ___.", answer: "median" },
              { text: "The difference between Q3 and Q1 is the ___.", textEn: "The difference between Q3 and Q1 is the ___.", answer: "IQR" },
              { text: "An extremely large value that pulls the mean up is called an ___.", textEn: "An extremely large value that pulls the mean up is called an ___.", answer: "outlier" },
              { text: "The ___ deviation measures how spread out data are from the mean.", textEn: "The ___ deviation measures how spread out data are from the mean.", answer: "standard" },
            ],
          },
        ],
        quiz: [
          { question: "What is the median of {3, 7, 2, 8, 5}?", options: ["3", "5", "7", "8"], answer: 1, explanation: "Sorted: 2, 3, 5, 7, 8 → middle value is 5." },
          { question: "Which measure is LEAST affected by outliers?", options: ["mean", "median", "range", "standard deviation"], answer: 1, explanation: "Median ignores extreme values; the others are pulled by them." },
          { question: "If IQR = 12, Q1 = 18, what is Q3?", options: ["6", "24", "30", "36"], answer: 2, explanation: "Q3 = Q1 + IQR = 18 + 12 = 30." },
          { question: "Adding the value 200 to {2, 3, 4, 5} mostly affects:", options: ["median", "mean", "mode", "Q1"], answer: 1, explanation: "Mean is pulled up by extreme values; median stays near the middle." },
        ],
      },
      {
        id: "sat-stats-normal-scatter",
        title: "Phân phối chuẩn, Histogram & Scatter Plot",
        titleEn: "Normal Distribution, Histograms & Scatter Plots",
        level: 4,
        difficulty: "advanced",
        theory: `## Phân phối chuẩn (Normal Distribution)

Phân phối chuẩn là đường cong hình chuông đối xứng quanh mean μ với độ lệch chuẩn σ.

${SVG_NORMAL_DIST}

### Quy tắc 68-95-99.7 (Empirical Rule)
- **68%** dữ liệu nằm trong khoảng μ ± 1σ
- **95%** trong khoảng μ ± 2σ
- **99.7%** trong khoảng μ ± 3σ

> Ví dụ: điểm SAT có μ = 1050, σ = 200. Khoảng [850, 1250] chứa 68% học sinh; [650, 1450] chứa 95%.

### Histogram

${SVG_HISTOGRAM}

Histogram thể hiện **phân bố tần số** (frequency distribution). Trục x là khoảng giá trị, trục y là số lần xuất hiện. Hình dáng cho biết:
- **Symmetric** (đối xứng): mean ≈ median
- **Right-skewed** (lệch phải): có đuôi dài về phải, mean > median
- **Left-skewed** (lệch trái): có đuôi dài về trái, mean < median

### Scatter Plot & Đường hồi quy

${SVG_SCATTER}

Scatter plot biểu diễn quan hệ giữa hai biến. Đường **line of best fit** (đường khớp nhất) y = mx + b mô tả xu hướng tuyến tính:
- **Positive correlation**: x tăng → y tăng (slope dương)
- **Negative correlation**: x tăng → y giảm (slope âm)
- **No correlation**: không có xu hướng rõ ràng

### Cụm từ tiếng Anh quan trọng
- "Approximately what percent of the data lies between..." → áp dụng quy tắc 68-95-99.7
- "Based on the line of best fit, predict y when x = ..." → thay x vào phương trình
- "Which equation best models the data?" → chọn phương trình có slope và intercept phù hợp`,
        theoryEn: `## Normal Distribution

The normal distribution is a symmetric bell curve centred on mean μ with standard deviation σ.

${SVG_NORMAL_DIST}

### The 68-95-99.7 (Empirical) Rule
- **68%** of data lies within μ ± 1σ
- **95%** within μ ± 2σ
- **99.7%** within μ ± 3σ

> Example: SAT scores have μ = 1050, σ = 200. The interval [850, 1250] holds 68% of students; [650, 1450] holds 95%.

### Histograms

${SVG_HISTOGRAM}

A histogram shows a **frequency distribution**. The x-axis is value bins; the y-axis is count. Shape tells you:
- **Symmetric**: mean ≈ median
- **Right-skewed**: long right tail, mean > median
- **Left-skewed**: long left tail, mean < median

### Scatter plots & line of best fit

${SVG_SCATTER}

A scatter plot shows the relationship between two variables. The **line of best fit** y = mx + b summarises the linear trend:
- **Positive correlation**: x ↑ → y ↑ (positive slope)
- **Negative correlation**: x ↑ → y ↓ (negative slope)
- **No correlation**: no clear trend

### Key SAT phrases
- "Approximately what percent of the data lies between..." → use the 68-95-99.7 rule
- "Based on the line of best fit, predict y when x = ..." → plug x into the equation
- "Which equation best models the data?" → match slope and intercept`,
        proTips: [
          "Quy tắc 68-95-99.7 là cứu cánh - học thuộc và biết áp dụng đối xứng (vd: 34% mỗi bên trong ±1σ).",
          "Right-skewed: mean > median; Left-skewed: mean < median. Đây là bẫy SAT cực kỳ phổ biến.",
          "Khi đề cho line of best fit, đáp án thường là số nguyên gần - không cần tính chính xác đến hàng thập phân.",
        ],
        proTipsEn: [
          "Memorise 68-95-99.7 and apply symmetry (e.g., 34% on each side within ±1σ).",
          "Right-skewed: mean > median; Left-skewed: mean < median. A very common SAT trap.",
          "When given a line of best fit, the answer is usually a clean integer - no need for exact decimals.",
        ],
        vocabulary: [
          { word: "normal distribution", partOfSpeech: "noun", meaning: "phân phối chuẩn", meaningEn: "symmetric bell-shaped distribution", example: "Test scores often follow a normal distribution.", exampleEn: "Test scores often follow a normal distribution." },
          { word: "bell curve", partOfSpeech: "noun", meaning: "đường cong hình chuông", meaningEn: "graph of the normal distribution", example: "The bell curve is symmetric about the mean.", exampleEn: "The bell curve is symmetric about the mean." },
          { word: "histogram", partOfSpeech: "noun", meaning: "biểu đồ tần số", meaningEn: "bar chart of frequency distribution", example: "The histogram shows test score frequencies.", exampleEn: "The histogram shows test score frequencies." },
          { word: "frequency", partOfSpeech: "noun", meaning: "tần số", meaningEn: "count of occurrences", example: "The frequency of score 80 is 12.", exampleEn: "The frequency of score 80 is 12." },
          { word: "scatter plot", partOfSpeech: "noun", meaning: "biểu đồ phân tán", meaningEn: "graph of paired data", example: "The scatter plot shows weight vs. height.", exampleEn: "The scatter plot shows weight vs. height." },
          { word: "line of best fit", partOfSpeech: "noun", meaning: "đường khớp nhất", meaningEn: "line that best summarises a trend", example: "The line of best fit predicts y from x.", exampleEn: "The line of best fit predicts y from x." },
          { word: "correlation", partOfSpeech: "noun", meaning: "tương quan", meaningEn: "statistical relationship between variables", example: "Height and weight have positive correlation.", exampleEn: "Height and weight have positive correlation." },
          { word: "skewed", partOfSpeech: "adjective", meaning: "lệch", meaningEn: "asymmetric distribution", example: "Income data are typically right-skewed.", exampleEn: "Income data are typically right-skewed." },
          { word: "empirical rule", partOfSpeech: "noun", meaning: "quy tắc thực nghiệm", meaningEn: "the 68-95-99.7 rule for normal data", example: "The empirical rule estimates probabilities quickly.", exampleEn: "The empirical rule estimates probabilities quickly." },
          { word: "predict", partOfSpeech: "verb", meaning: "dự đoán", meaningEn: "estimate a value based on a model", example: "Use the line of best fit to predict sales.", exampleEn: "Use the line of best fit to predict sales." },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "About 68% of data lies within ___ standard deviation of the mean.", textEn: "About 68% of data lies within ___ standard deviation of the mean.", answer: "one" },
              { text: "A bar chart of frequencies is called a ___.", textEn: "A bar chart of frequencies is called a ___.", answer: "histogram" },
              { text: "When x increases and y also increases, the correlation is ___.", textEn: "When x increases and y also increases, the correlation is ___.", answer: "positive" },
              { text: "A distribution with a long right tail is ___-skewed.", textEn: "A distribution with a long right tail is ___-skewed.", answer: "right" },
            ],
          },
        ],
        quiz: [
          { question: "If μ = 100 and σ = 15, approximately what percent of data lies between 85 and 115?", options: ["50%", "68%", "95%", "99.7%"], answer: 1, explanation: "85 to 115 is μ ± 1σ → 68%." },
          { question: "A line of best fit is y = 3x + 5. Predict y when x = 10.", options: ["15", "30", "35", "50"], answer: 2, explanation: "y = 3(10) + 5 = 35." },
          { question: "A right-skewed distribution typically has:", options: ["mean = median", "mean < median", "mean > median", "no median"], answer: 2, explanation: "Right tail pulls mean above median." },
          { question: "Which suggests no linear correlation in a scatter plot?", options: ["points form a clear upward line", "points form a clear downward line", "points are randomly scattered", "all points are at the origin"], answer: 2, explanation: "Random scatter indicates no linear pattern." },
        ],
      },
    ],
  },

  /* ============= GEOMETRY & TRIGONOMETRY ============= */
  {
    id: "sat-geometry-deepdive",
    title: "Hình học & Lượng giác chuyên sâu",
    titleEn: "SAT Geometry & Trigonometry Deep Dive",
    icon: "📐",
    color: "from-amber-500 to-orange-600",
    description: "Tam giác, đường tròn, tam giác đồng dạng và lượng giác cơ bản.",
    descriptionEn: "Triangles, circles, similarity and basic trigonometry.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-geom-triangles-circles",
        title: "Tam giác vuông, Đường tròn & Định lý Pythagoras",
        titleEn: "Right Triangles, Circles & the Pythagorean Theorem",
        level: 4,
        difficulty: "intermediate",
        theory: `## Tam giác vuông & Định lý Pythagoras

Định lý Pythagoras là **công cụ số một** trong phần Geometry của SAT. Với tam giác vuông cạnh a, b và cạnh huyền (hypotenuse) c:

$$a^2 + b^2 = c^2$$

${SVG_TRIANGLE_RIGHT}

### Bộ ba số Pythagoras hay gặp
| Bộ ba | Kiểm tra |
|-------|----------|
| **3-4-5** | 9 + 16 = 25 ✓ |
| **5-12-13** | 25 + 144 = 169 ✓ |
| **8-15-17** | 64 + 225 = 289 ✓ |
| **7-24-25** | 49 + 576 = 625 ✓ |

Nhớ các bộ này giúp tiết kiệm thời gian - không cần tính căn bậc hai!

### Tam giác đặc biệt
- **45-45-90**: cạnh : cạnh : cạnh huyền = 1 : 1 : √2
- **30-60-90**: cạnh đối 30° : cạnh đối 60° : cạnh huyền = 1 : √3 : 2

### Đường tròn - công thức cốt lõi

${SVG_CIRCLE}

- **Diameter** (đường kính) = 2r
- **Circumference** (chu vi) = 2πr = πd
- **Area** (diện tích) = πr²
- **Arc length** (độ dài cung) = (θ/360°) × 2πr
- **Sector area** (diện tích quạt) = (θ/360°) × πr²
- **Chord** (dây cung): đoạn nối hai điểm trên đường tròn

### Phương trình đường tròn (chuẩn)
$$(x - h)^2 + (y - k)^2 = r^2$$
với (h, k) là tâm và r là bán kính.

### Cụm từ SAT thường gặp
- "The hypotenuse of a right triangle" → cạnh đối diện góc vuông
- "An inscribed angle" → góc nội tiếp = ½ cung bị chắn
- "A tangent line" → đường tiếp tuyến vuông góc với bán kính tại tiếp điểm`,
        theoryEn: `## Right Triangles & the Pythagorean Theorem

The Pythagorean theorem is the **number-one tool** in SAT Geometry. For a right triangle with legs a, b and hypotenuse c:

$$a^2 + b^2 = c^2$$

${SVG_TRIANGLE_RIGHT}

### Common Pythagorean triples
| Triple | Verify |
|--------|--------|
| **3-4-5** | 9 + 16 = 25 ✓ |
| **5-12-13** | 25 + 144 = 169 ✓ |
| **8-15-17** | 64 + 225 = 289 ✓ |
| **7-24-25** | 49 + 576 = 625 ✓ |

Memorising these saves time - no square roots needed!

### Special right triangles
- **45-45-90**: leg : leg : hypotenuse = 1 : 1 : √2
- **30-60-90**: side opposite 30° : 60° : hypotenuse = 1 : √3 : 2

### Circles - core formulas

${SVG_CIRCLE}

- **Diameter** = 2r
- **Circumference** = 2πr = πd
- **Area** = πr²
- **Arc length** = (θ/360°) × 2πr
- **Sector area** = (θ/360°) × πr²
- **Chord**: a segment joining two points on the circle

### Standard equation of a circle
$$(x - h)^2 + (y - k)^2 = r^2$$
where (h, k) is the centre and r is the radius.

### Common SAT phrases
- "The hypotenuse of a right triangle" → side opposite the right angle
- "An inscribed angle" → half the intercepted arc
- "A tangent line" → perpendicular to the radius at the point of tangency`,
        proTips: [
          "Học thuộc bộ ba 3-4-5, 5-12-13 - tiết kiệm hàng phút trên đề thi.",
          "Khi đề cho phương trình đường tròn không ở dạng chuẩn, dùng 'completing the square'.",
          "Inscribed angle = ½ central angle khi cùng chắn một cung.",
        ],
        proTipsEn: [
          "Memorise 3-4-5 and 5-12-13 triples - saves minutes on test day.",
          "If the circle equation isn't in standard form, complete the square.",
          "Inscribed angle = ½ central angle subtending the same arc.",
        ],
        vocabulary: [
          { word: "hypotenuse", partOfSpeech: "noun", meaning: "cạnh huyền", meaningEn: "longest side of a right triangle", example: "The hypotenuse is opposite the right angle.", exampleEn: "The hypotenuse is opposite the right angle." },
          { word: "leg", partOfSpeech: "noun", meaning: "cạnh góc vuông", meaningEn: "either of the two shorter sides of a right triangle", example: "The legs of a 3-4-5 triangle are 3 and 4.", exampleEn: "The legs of a 3-4-5 triangle are 3 and 4." },
          { word: "Pythagorean theorem", partOfSpeech: "noun", meaning: "định lý Pythagoras", meaningEn: "a² + b² = c² for right triangles", example: "Use the Pythagorean theorem to find the missing side.", exampleEn: "Use the Pythagorean theorem to find the missing side." },
          { word: "radius", partOfSpeech: "noun", meaning: "bán kính", meaningEn: "distance from center to circle", example: "The radius equals half the diameter.", exampleEn: "The radius equals half the diameter." },
          { word: "diameter", partOfSpeech: "noun", meaning: "đường kính", meaningEn: "twice the radius", example: "The diameter passes through the center.", exampleEn: "The diameter passes through the center." },
          { word: "circumference", partOfSpeech: "noun", meaning: "chu vi đường tròn", meaningEn: "perimeter of a circle = 2πr", example: "The circumference of a circle with r = 5 is 10π.", exampleEn: "The circumference of a circle with r = 5 is 10π." },
          { word: "arc", partOfSpeech: "noun", meaning: "cung tròn", meaningEn: "portion of a circle's circumference", example: "An arc subtends a central angle.", exampleEn: "An arc subtends a central angle." },
          { word: "chord", partOfSpeech: "noun", meaning: "dây cung", meaningEn: "segment with endpoints on a circle", example: "The longest chord is the diameter.", exampleEn: "The longest chord is the diameter." },
          { word: "tangent", partOfSpeech: "noun", meaning: "tiếp tuyến", meaningEn: "line touching a circle at exactly one point", example: "A tangent is perpendicular to the radius at the point of contact.", exampleEn: "A tangent is perpendicular to the radius at the point of contact." },
          { word: "inscribed", partOfSpeech: "adjective", meaning: "nội tiếp", meaningEn: "drawn inside a circle with vertices on it", example: "An inscribed angle is half the central angle.", exampleEn: "An inscribed angle is half the central angle." },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ hoặc số thích hợp:",
            instructionEn: "Fill in the word or number:",
            sentences: [
              { text: "In a 3-4-5 right triangle, the ___ is 5.", textEn: "In a 3-4-5 right triangle, the ___ is 5.", answer: "hypotenuse" },
              { text: "The circumference of a circle with radius 7 is ___π.", textEn: "The circumference of a circle with radius 7 is ___π.", answer: "14" },
              { text: "A line that touches a circle at exactly one point is a ___.", textEn: "A line that touches a circle at exactly one point is a ___.", answer: "tangent" },
              { text: "In a 45-45-90 triangle with legs of length 1, the hypotenuse is √___.", textEn: "In a 45-45-90 triangle with legs of length 1, the hypotenuse is √___.", answer: "2" },
            ],
          },
        ],
        quiz: [
          { question: "A right triangle has legs 6 and 8. What is the hypotenuse?", options: ["10", "12", "14", "√100"], answer: 0, explanation: "6² + 8² = 36 + 64 = 100 → c = 10 (a 6-8-10 = 2× 3-4-5 triple)." },
          { question: "What is the area of a circle with diameter 10?", options: ["10π", "25π", "50π", "100π"], answer: 1, explanation: "r = 5, Area = πr² = 25π." },
          { question: "The equation (x − 3)² + (y + 4)² = 25 describes a circle with center:", options: ["(3, 4)", "(−3, 4)", "(3, −4)", "(−3, −4)"], answer: 2, explanation: "Standard form: center (h, k) = (3, −4), radius 5." },
          { question: "In a 30-60-90 triangle, if the side opposite 30° is 4, the hypotenuse is:", options: ["4√3", "8", "4√2", "12"], answer: 1, explanation: "Hypotenuse = 2 × (side opposite 30°) = 2(4) = 8." },
        ],
      },
      {
        id: "sat-geom-similarity-trig",
        title: "Tam giác đồng dạng & Lượng giác cơ bản",
        titleEn: "Similar Triangles & Basic Trigonometry",
        level: 4,
        difficulty: "advanced",
        theory: `## Tam giác đồng dạng (Similar Triangles)

Hai tam giác **đồng dạng** khi các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ.

${SVG_SIMILAR_TRIANGLES}

### Ba tiêu chí đồng dạng
- **AA** (Angle-Angle): hai cặp góc bằng nhau
- **SAS** (Side-Angle-Side): hai cặp cạnh tỉ lệ và góc xen giữa bằng nhau
- **SSS** (Side-Side-Side): cả ba cặp cạnh tỉ lệ

### Tỉ lệ đồng dạng
Nếu △ABC ~ △DEF với tỉ lệ k:
- Tỉ lệ cạnh = **k**
- Tỉ lệ chu vi = **k**
- Tỉ lệ diện tích = **k²**

> Ví dụ: hai tam giác đồng dạng có tỉ lệ cạnh 1:2 → tỉ lệ diện tích 1:4.

## Lượng giác cơ bản - SOH CAH TOA

Trong tam giác vuông với góc nhọn θ:

$$\\sin θ = \\frac{\\text{opposite}}{\\text{hypotenuse}}, \\quad \\cos θ = \\frac{\\text{adjacent}}{\\text{hypotenuse}}, \\quad \\tan θ = \\frac{\\text{opposite}}{\\text{adjacent}}$$

### Đường tròn đơn vị

${SVG_UNIT_CIRCLE}

Đường tròn đơn vị (bán kính 1) đặt tại gốc tọa độ. Mỗi điểm trên đường tròn có tọa độ (cos θ, sin θ).

### Giá trị đặc biệt cần thuộc
| θ | sin θ | cos θ | tan θ |
|---|-------|-------|-------|
| 0° | 0 | 1 | 0 |
| 30° | 1/2 | √3/2 | √3/3 |
| 45° | √2/2 | √2/2 | 1 |
| 60° | √3/2 | 1/2 | √3 |
| 90° | 1 | 0 | undefined |

### Quan hệ phụ-bù
- **Phụ nhau** (complementary, tổng = 90°): sin(90° − θ) = cos θ
- **Pythagorean identity**: sin²θ + cos²θ = 1

### Cụm từ SAT thường gặp
- "Sin of the angle equals cos of its complement" → 90° − θ
- "Find the angle whose tangent is..." → dùng arctan
- "If sin A = cos B, then A + B = ?" → 90°`,
        theoryEn: `## Similar Triangles

Two triangles are **similar** when corresponding angles are equal and corresponding sides are proportional.

${SVG_SIMILAR_TRIANGLES}

### Three similarity criteria
- **AA** (Angle-Angle): two pairs of equal angles
- **SAS** (Side-Angle-Side): two proportional sides and an equal included angle
- **SSS** (Side-Side-Side): all three pairs of sides proportional

### Similarity ratios
If △ABC ~ △DEF with ratio k:
- Side ratio = **k**
- Perimeter ratio = **k**
- Area ratio = **k²**

> Example: two similar triangles with side ratio 1:2 → area ratio 1:4.

## Basic Trigonometry - SOH CAH TOA

In a right triangle with acute angle θ:

$$\\sin θ = \\frac{\\text{opposite}}{\\text{hypotenuse}}, \\quad \\cos θ = \\frac{\\text{adjacent}}{\\text{hypotenuse}}, \\quad \\tan θ = \\frac{\\text{opposite}}{\\text{adjacent}}$$

### The unit circle

${SVG_UNIT_CIRCLE}

The unit circle (radius 1) is centred at the origin. Each point on the circle has coordinates (cos θ, sin θ).

### Special values to memorise
| θ | sin θ | cos θ | tan θ |
|---|-------|-------|-------|
| 0° | 0 | 1 | 0 |
| 30° | 1/2 | √3/2 | √3/3 |
| 45° | √2/2 | √2/2 | 1 |
| 60° | √3/2 | 1/2 | √3 |
| 90° | 1 | 0 | undefined |

### Complement & identity
- **Complementary** (sum = 90°): sin(90° − θ) = cos θ
- **Pythagorean identity**: sin²θ + cos²θ = 1

### Common SAT phrases
- "Sin of the angle equals cos of its complement" → 90° − θ
- "Find the angle whose tangent is..." → use arctan
- "If sin A = cos B, then A + B = ?" → 90°`,
        proTips: [
          "Tỉ lệ diện tích = bình phương tỉ lệ cạnh - bẫy SAT cực kỳ phổ biến.",
          "SOH CAH TOA: Sin = Opp/Hyp, Cos = Adj/Hyp, Tan = Opp/Adj.",
          "Nếu sin A = cos B trong cùng tam giác vuông → A và B phụ nhau (A + B = 90°).",
        ],
        proTipsEn: [
          "Area ratio = (side ratio)² - a very common SAT trap.",
          "SOH CAH TOA: Sin = Opp/Hyp, Cos = Adj/Hyp, Tan = Opp/Adj.",
          "If sin A = cos B in the same right triangle → A and B are complementary (A + B = 90°).",
        ],
        vocabulary: [
          { word: "similar", partOfSpeech: "adjective", meaning: "đồng dạng", meaningEn: "same shape, proportional sides", example: "Similar triangles have equal corresponding angles.", exampleEn: "Similar triangles have equal corresponding angles." },
          { word: "congruent", partOfSpeech: "adjective", meaning: "bằng nhau", meaningEn: "identical in shape and size", example: "Congruent triangles are also similar.", exampleEn: "Congruent triangles are also similar." },
          { word: "proportional", partOfSpeech: "adjective", meaning: "tỉ lệ", meaningEn: "having a constant ratio", example: "Corresponding sides of similar triangles are proportional.", exampleEn: "Corresponding sides of similar triangles are proportional." },
          { word: "ratio", partOfSpeech: "noun", meaning: "tỉ số", meaningEn: "comparison of two quantities", example: "The ratio of sides 3:4 means 3 to 4.", exampleEn: "The ratio of sides 3:4 means 3 to 4." },
          { word: "sine", partOfSpeech: "noun", meaning: "sin", meaningEn: "opposite over hypotenuse in a right triangle", example: "Sine of 30° equals 1/2.", exampleEn: "Sine of 30° equals 1/2." },
          { word: "cosine", partOfSpeech: "noun", meaning: "cos", meaningEn: "adjacent over hypotenuse", example: "Cosine of 60° equals 1/2.", exampleEn: "Cosine of 60° equals 1/2." },
          { word: "tangent", partOfSpeech: "noun", meaning: "tan (lượng giác)", meaningEn: "opposite over adjacent", example: "Tangent of 45° equals 1.", exampleEn: "Tangent of 45° equals 1." },
          { word: "opposite side", partOfSpeech: "noun", meaning: "cạnh đối", meaningEn: "side across from a given angle", example: "The opposite side to angle A is BC.", exampleEn: "The opposite side to angle A is BC." },
          { word: "adjacent side", partOfSpeech: "noun", meaning: "cạnh kề", meaningEn: "non-hypotenuse side touching the angle", example: "The adjacent side touches the angle but is not the hypotenuse.", exampleEn: "The adjacent side touches the angle but is not the hypotenuse." },
          { word: "complementary", partOfSpeech: "adjective", meaning: "phụ nhau", meaningEn: "two angles summing to 90°", example: "30° and 60° are complementary angles.", exampleEn: "30° and 60° are complementary angles." },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ hoặc số thích hợp:",
            instructionEn: "Fill in the word or number:",
            sentences: [
              { text: "If two triangles are similar with side ratio 1:3, their area ratio is 1:___.", textEn: "If two triangles are similar with side ratio 1:3, their area ratio is 1:___.", answer: "9" },
              { text: "Sin equals opposite over ___.", textEn: "Sin equals opposite over ___.", answer: "hypotenuse" },
              { text: "Two angles that sum to 90° are called ___.", textEn: "Two angles that sum to 90° are called ___.", answer: "complementary" },
              { text: "If sin A = cos B in a right triangle, then A + B = ___ degrees.", textEn: "If sin A = cos B in a right triangle, then A + B = ___ degrees.", answer: "90" },
            ],
          },
        ],
        quiz: [
          { question: "Two similar triangles have sides in ratio 2:5. What is the area ratio?", options: ["2:5", "4:25", "4:10", "10:25"], answer: 1, explanation: "Area ratio = (side ratio)² = 2² : 5² = 4 : 25." },
          { question: "In a right triangle, sin θ = 3/5. What is cos θ?", options: ["3/5", "4/5", "5/3", "5/4"], answer: 1, explanation: "By the 3-4-5 triple: opposite = 3, hyp = 5, so adjacent = 4 → cos θ = 4/5." },
          { question: "If sin(2x) = cos(x + 15°), what is x?", options: ["15°", "25°", "45°", "75°"], answer: 1, explanation: "Complementary angles: 2x + (x + 15) = 90 → 3x = 75 → x = 25°." },
          { question: "What is tan 45°?", options: ["0", "1/2", "1", "√3"], answer: 2, explanation: "In a 45-45-90 triangle, opposite = adjacent → tan 45° = 1." },
        ],
      },
    ],
  },
];

import type { LanguageModule } from "./types";

export const satModules: LanguageModule[] = [
  {
    id: "sat-reading-writing",
    title: "SAT Reading & Writing",
    titleEn: "SAT Reading & Writing",
    icon: "📖",
    color: "purple",
    description: "Chiến lược đọc hiểu và viết cho bài thi SAT Digital",
    descriptionEn: "Reading comprehension and writing strategies for the Digital SAT",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-rw-evidence-reading",
        title: "Evidence-Based Reading",
        titleEn: "Evidence-Based Reading",
        level: 3,
        difficulty: "intermediate",
        theory: `## Đọc hiểu dựa trên bằng chứng (Evidence-Based Reading)

Phần Reading của Digital SAT (chiếm **~54%** tổng điểm Verbal) đòi hỏi bạn đọc đoạn văn ngắn (25-150 từ) và trả lời **MỘT** câu hỏi duy nhất dựa trên **bằng chứng** trong bài. Quy tắc bất di bất dịch: **không suy đoán** - mọi đáp án đúng đều phải được "chống lưng" bởi câu chữ trong đoạn.

<figure>
<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quy trình 4 bước đọc bằng chứng">
  <defs>
    <linearGradient id="evGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="hsl(217 91% 60%)"/>
      <stop offset="100%" stop-color="hsl(160 84% 39%)"/>
    </linearGradient>
  </defs>
  <rect width="600" height="200" fill="hsl(217 91% 60% / 0.04)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="13" text-anchor="middle">
    <g>
      <circle cx="80" cy="100" r="42" fill="url(#evGrad)" opacity="0.85"/>
      <text x="80" y="96" fill="white" font-weight="700" font-size="22">1</text>
      <text x="80" y="160" fill="hsl(220 9% 30%)">Read Q first</text>
      <text x="80" y="178" fill="hsl(220 9% 50%)" font-size="11">Đọc câu hỏi</text>
    </g>
    <path d="M125 100 L195 100" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#arr)"/>
    <g>
      <circle cx="240" cy="100" r="42" fill="url(#evGrad)" opacity="0.85"/>
      <text x="240" y="96" fill="white" font-weight="700" font-size="22">2</text>
      <text x="240" y="160" fill="hsl(220 9% 30%)">Find keywords</text>
      <text x="240" y="178" fill="hsl(220 9% 50%)" font-size="11">Tìm từ khóa</text>
    </g>
    <path d="M285 100 L355 100" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#arr)"/>
    <g>
      <circle cx="400" cy="100" r="42" fill="url(#evGrad)" opacity="0.85"/>
      <text x="400" y="96" fill="white" font-weight="700" font-size="22">3</text>
      <text x="400" y="160" fill="hsl(220 9% 30%)">Eliminate traps</text>
      <text x="400" y="178" fill="hsl(220 9% 50%)" font-size="11">Loại bẫy</text>
    </g>
    <path d="M445 100 L515 100" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#arr)"/>
    <g>
      <circle cx="560" cy="100" r="42" fill="url(#evGrad)"/>
      <text x="560" y="96" fill="white" font-weight="700" font-size="22">4</text>
      <text x="560" y="160" fill="hsl(220 9% 30%)">Verify in text</text>
      <text x="560" y="178" fill="hsl(220 9% 50%)" font-size="11">Kiểm chứng</text>
    </g>
  </g>
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="hsl(217 91% 60%)"/>
    </marker>
  </defs>
</svg>
<figcaption>Quy trình 4 bước "Evidence Loop" - chiến thuật chuẩn của thầy Hải</figcaption>
</figure>

### 🎯 4 dạng câu hỏi PHỔ BIẾN nhất

| Dạng | Tỉ lệ | Cách nhận diện | Bẫy thường gặp |
|------|-------|----------------|----------------|
| **Main Idea** | ~25% | "central idea", "main purpose" | Chọn chi tiết hẹp thay vì ý bao trùm |
| **Detail** | ~30% | "according to the text" | Đáp án "gần đúng" - sai 1 từ |
| **Inference** | ~20% | "most strongly suggests" | Suy luận quá xa, dùng kiến thức ngoài |
| **Purpose** | ~15% | "primary purpose of the passage" | Nhầm chủ đề (topic) với mục đích (purpose) |

### 📝 Ví dụ minh họa thực chiến

> *"Although early critics dismissed Hopper's paintings as overly austere, modern scholars have come to see this very simplicity as the source of their emotional power."*

**Câu hỏi**: What does the passage suggest about Hopper's paintings?

- ❌ (A) They are universally admired today. → quá tuyệt đối
- ✅ (B) Their simplicity is now considered a strength. → khớp **"this very simplicity as the source of their emotional power"**
- ❌ (C) They were never criticized. → trái với "early critics dismissed"
- ❌ (D) Hopper rejected austerity. → sai hoàn toàn

### ⚠️ 5 loại "bẫy" SAT điển hình
1. **Extreme language**: always, never, all, none, must
2. **Out of scope**: thông tin ngoài đoạn văn
3. **Half-right**: đúng một nửa, sai một nửa
4. **Reverse**: đảo ngược ý của tác giả
5. **Right answer, wrong question**: đúng nhưng không trả lời câu hỏi`,
        theoryEn: `## Evidence-Based Reading

The Digital SAT Reading section (~54% of Verbal score) requires you to read short passages (25-150 words) and answer **ONE** question based purely on **evidence in the text**. The rule is absolute: **no guessing** - every correct answer must be backed by words in the passage.

<figure>
<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="4-step evidence reading process">
  <defs>
    <linearGradient id="evGradEn" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="hsl(217 91% 60%)"/>
      <stop offset="100%" stop-color="hsl(160 84% 39%)"/>
    </linearGradient>
    <marker id="arrEn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="hsl(217 91% 60%)"/>
    </marker>
  </defs>
  <rect width="600" height="200" fill="hsl(217 91% 60% / 0.04)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="13" text-anchor="middle">
    <circle cx="80" cy="100" r="42" fill="url(#evGradEn)"/>
    <text x="80" y="106" fill="white" font-weight="700" font-size="22">1</text>
    <text x="80" y="160" fill="hsl(220 9% 30%)">Read Q first</text>
    <path d="M125 100 L195 100" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#arrEn)"/>
    <circle cx="240" cy="100" r="42" fill="url(#evGradEn)"/>
    <text x="240" y="106" fill="white" font-weight="700" font-size="22">2</text>
    <text x="240" y="160" fill="hsl(220 9% 30%)">Find keywords</text>
    <path d="M285 100 L355 100" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#arrEn)"/>
    <circle cx="400" cy="100" r="42" fill="url(#evGradEn)"/>
    <text x="400" y="106" fill="white" font-weight="700" font-size="22">3</text>
    <text x="400" y="160" fill="hsl(220 9% 30%)">Eliminate traps</text>
    <path d="M445 100 L515 100" stroke="hsl(217 91% 60%)" stroke-width="2" marker-end="url(#arrEn)"/>
    <circle cx="560" cy="100" r="42" fill="url(#evGradEn)"/>
    <text x="560" y="106" fill="white" font-weight="700" font-size="22">4</text>
    <text x="560" y="160" fill="hsl(220 9% 30%)">Verify in text</text>
  </g>
</svg>
<figcaption>The 4-step "Evidence Loop" - Teacher Hai's signature method</figcaption>
</figure>

### 🎯 The 4 Most Common Question Types

| Type | Frequency | How to Spot | Common Trap |
|------|-----------|-------------|-------------|
| **Main Idea** | ~25% | "central idea", "main purpose" | Picking a narrow detail instead of the umbrella idea |
| **Detail** | ~30% | "according to the text" | "Almost right" - one word off |
| **Inference** | ~20% | "most strongly suggests" | Inferring too far, using outside knowledge |
| **Purpose** | ~15% | "primary purpose of the passage" | Confusing topic with purpose |

### 📝 Real-World Example

> *"Although early critics dismissed Hopper's paintings as overly austere, modern scholars have come to see this very simplicity as the source of their emotional power."*

**Question**: What does the passage suggest about Hopper's paintings?

- ❌ (A) They are universally admired today. → too absolute
- ✅ (B) Their simplicity is now considered a strength. → matches **"this very simplicity as the source of their emotional power"**
- ❌ (C) They were never criticized. → contradicts "early critics dismissed"
- ❌ (D) Hopper rejected austerity. → completely wrong

### ⚠️ 5 Classic SAT Trap Types
1. **Extreme language**: always, never, all, none, must
2. **Out of scope**: information outside the passage
3. **Half-right**: half correct, half wrong
4. **Reverse**: opposite of the author's view
5. **Right answer, wrong question**: correct fact but doesn't answer the question`,
        proTips: [
          "Đừng bao giờ chọn đáp án chỉ vì nó 'nghe đúng' - phải có bằng chứng từ đoạn văn",
          "Đáp án đúng thường là paraphrase (diễn đạt lại) chứ không copy nguyên văn",
          "Nếu phân vân giữa 2 đáp án, chọn đáp án cụ thể hơn, ít cực đoan hơn",
          "Câu hỏi 'most strongly suggests' luôn yêu cầu suy luận GẦN - đừng đi xa khỏi đoạn văn",
          "Mỗi câu hỏi chỉ có 1 đoạn văn riêng - không liên kết các đoạn với nhau",
        ],
        proTipsEn: [
          "Never choose an answer just because it 'sounds right' - evidence from the passage is required",
          "Correct answers are often paraphrases, not direct quotes",
          "When torn between 2 answers, choose the more specific, less extreme one",
          "'Most strongly suggests' questions always need a CLOSE inference - don't drift from the text",
          "Each question has its own standalone passage - don't link multiple passages together",
        ],
        vocabulary: [
          { word: "evidence", meaning: "bằng chứng", example: "The evidence in the passage supports this conclusion.", partOfSpeech: "noun" },
          { word: "inference", meaning: "suy luận", example: "What inference can be drawn from paragraph 2?", partOfSpeech: "noun" },
          { word: "imply", meaning: "ngụ ý, ám chỉ", example: "The author implies that technology has both benefits and drawbacks.", partOfSpeech: "verb" },
          { word: "excerpt", meaning: "đoạn trích", example: "Read the following excerpt from the passage.", partOfSpeech: "noun" },
          { word: "undermine", meaning: "làm suy yếu", example: "This evidence undermines the opposing argument.", partOfSpeech: "verb" },
          { word: "substantiate", meaning: "chứng minh, chứng thực", example: "The data substantiates the researcher's hypothesis.", partOfSpeech: "verb" },
          { word: "corroborate", meaning: "xác nhận, củng cố", example: "Multiple sources corroborate this finding.", partOfSpeech: "verb" },
          { word: "assertion", meaning: "khẳng định", example: "The author's central assertion is supported by evidence.", partOfSpeech: "noun" },
          { word: "compelling", meaning: "thuyết phục", example: "She presented a compelling argument for reform.", partOfSpeech: "adjective" },
          { word: "nuance", meaning: "sắc thái", example: "The passage explores the nuances of the debate.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp vào chỗ trống:",
            instructionEn: "Fill in the blanks with the appropriate word:",
            sentences: [
              { text: "The scientist needed more ___ before publishing the results.", textEn: "The scientist needed more ___ before publishing the results.", answer: "evidence", hint: "bằng chứng" },
              { text: "We can ___ from the data that the trend is declining.", textEn: "We can ___ from the data that the trend is declining.", answer: "infer", hint: "suy luận" },
              { text: "The author's ___ that education improves society is well-supported.", textEn: "The author's ___ that education improves society is well-supported.", answer: "assertion", hint: "khẳng định" },
              { text: "Her argument was so ___ that everyone agreed.", textEn: "Her argument was so ___ that everyone agreed.", answer: "compelling", hint: "thuyết phục" },
              { text: "The article explores the ___ of modern technology.", textEn: "The article explores the ___ of modern technology.", answer: "nuances", hint: "sắc thái" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp các từ thành câu hoàn chỉnh:",
            instructionEn: "Reorder the words to form a complete sentence:",
            items: [
              { scrambled: ["evidence", "The", "supports", "the", "conclusion", "clearly"], correct: "The evidence clearly supports the conclusion.", correctEn: "The evidence clearly supports the conclusion." },
              { scrambled: ["can", "from", "What", "passage", "be", "inferred", "the", "?"], correct: "What can be inferred from the passage?", correctEn: "What can be inferred from the passage?" },
              { scrambled: ["undermines", "argument", "This", "the", "data", "opposing"], correct: "This data undermines the opposing argument.", correctEn: "This data undermines the opposing argument." },
            ],
          },
        ],
        quiz: [
          { question: "What is the most important strategy for SAT Reading?", options: ["Skim the entire passage quickly", "Find evidence in the passage for each answer", "Choose the longest answer", "Rely on background knowledge"], answer: 1, explanation: "SAT Reading requires every answer to be supported by evidence found in the passage." },
          { question: "What does an 'Inference' question require?", options: ["Find directly stated information", "Draw logical conclusions from given information", "Guess the author's intent", "Summarize the passage"], answer: 1, explanation: "Inference questions require you to draw logical conclusions from information in the passage." },
          { question: "What does 'corroborate' mean?", options: ["Deny", "Confirm or strengthen", "Analyze", "Compare"], answer: 1, explanation: "'Corroborate' means to confirm or strengthen with additional evidence." },
          { question: "When torn between 2 answers, which should you choose?", options: ["The longer answer", "The more extreme answer", "The more specific, less extreme answer", "The first one that comes to mind"], answer: 2, explanation: "Correct SAT answers tend to be specific and moderate, avoiding extreme words like 'always' or 'never'." },
          { question: "What is a common feature of correct SAT answers?", options: ["They copy text verbatim from the passage", "They paraphrase information from the passage", "They contain the most difficult vocabulary", "They are always the longest option"], answer: 1, explanation: "Correct SAT answers typically paraphrase original information using different wording." },
        ],
      },
      {
        id: "sat-rw-command-evidence",
        title: "Command of Evidence",
        titleEn: "Command of Evidence",
        level: 3,
        difficulty: "intermediate",
        theory: `## Kỹ năng Sử dụng Bằng chứng (Command of Evidence)

Dạng bài **Command of Evidence** chiếm khoảng **12-14%** Reading & Writing trên Digital SAT. Bạn sẽ được cho một **giả thuyết / kết luận** và phải chọn dữ liệu (text hoặc số) hỗ trợ tốt nhất cho nó.

<figure>
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hai dạng Command of Evidence">
  <rect width="600" height="240" fill="hsl(160 84% 39% / 0.04)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="13">
    <rect x="30" y="30" width="250" height="180" rx="14" fill="hsl(217 91% 60% / 0.12)" stroke="hsl(217 91% 60%)" stroke-width="2"/>
    <text x="155" y="58" text-anchor="middle" font-weight="700" font-size="15" fill="hsl(217 91% 35%)">📄 Textual Evidence</text>
    <text x="50" y="88" fill="hsl(220 9% 25%)">• Quote from passage</text>
    <text x="50" y="112" fill="hsl(220 9% 25%)">• Author's exact wording</text>
    <text x="50" y="136" fill="hsl(220 9% 25%)">• Direct logical link</text>
    <text x="50" y="170" fill="hsl(220 9% 50%)" font-style="italic" font-size="11">Hỏi: "Which quotation</text>
    <text x="50" y="186" fill="hsl(220 9% 50%)" font-style="italic" font-size="11">best supports the claim?"</text>

    <rect x="320" y="30" width="250" height="180" rx="14" fill="hsl(160 84% 39% / 0.12)" stroke="hsl(160 84% 39%)" stroke-width="2"/>
    <text x="445" y="58" text-anchor="middle" font-weight="700" font-size="15" fill="hsl(160 84% 25%)">📊 Quantitative Evidence</text>
    <text x="340" y="88" fill="hsl(220 9% 25%)">• Table / bar chart</text>
    <text x="340" y="112" fill="hsl(220 9% 25%)">• Numerical data</text>
    <text x="340" y="136" fill="hsl(220 9% 25%)">• Trend analysis</text>
    <text x="340" y="170" fill="hsl(220 9% 50%)" font-style="italic" font-size="11">Hỏi: "Which choice uses</text>
    <text x="340" y="186" fill="hsl(220 9% 50%)" font-style="italic" font-size="11">data from the table to..."</text>
  </g>
</svg>
<figcaption>Hai dạng Command of Evidence trên Digital SAT</figcaption>
</figure>

### 🔍 Kỹ thuật làm bài "5 giây loại trừ"

1. **Đọc kết luận** trước, **gạch chân từ khóa** (claim words)
2. **Đọc đáp án** dưới góc nhìn của claim - đáp án phải **trực tiếp** support
3. **Loại 3 bẫy phổ biến**:
   - 🚫 **Tangent**: liên quan chủ đề nhưng không support claim
   - 🚫 **Reverse**: support kết luận **ngược lại**
   - 🚫 **Half-support**: chỉ support 1 phần claim

### 📊 Ví dụ Quantitative Evidence

> **Claim**: *"Schools that adopted the new curriculum showed faster reading progress."*
>
> **Bảng dữ liệu**:
> | School | Old (words/min) | New (words/min) | Change |
> |--------|----------------|-----------------|--------|
> | A (new) | 145 | 178 | +33 |
> | B (old) | 152 | 158 | +6 |
> | C (new) | 138 | 172 | +34 |

Đáp án đúng phải **so sánh trực tiếp** trường mới (A, C: +33, +34) với trường cũ (B: +6) → support "faster". Đáp án sai sẽ chỉ trích 1 con số đơn lẻ hoặc đề cập trường không liên quan.`,
        theoryEn: `## Command of Evidence

**Command of Evidence** questions make up about **12-14%** of Digital SAT Reading & Writing. You're given a **hypothesis / conclusion** and must choose the data (text or numbers) that best supports it.

<figure>
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two types of Command of Evidence">
  <rect width="600" height="240" fill="hsl(160 84% 39% / 0.04)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="13">
    <rect x="30" y="30" width="250" height="180" rx="14" fill="hsl(217 91% 60% / 0.12)" stroke="hsl(217 91% 60%)" stroke-width="2"/>
    <text x="155" y="58" text-anchor="middle" font-weight="700" font-size="15" fill="hsl(217 91% 35%)">📄 Textual Evidence</text>
    <text x="50" y="88" fill="hsl(220 9% 25%)">• Quote from passage</text>
    <text x="50" y="112" fill="hsl(220 9% 25%)">• Author's exact wording</text>
    <text x="50" y="136" fill="hsl(220 9% 25%)">• Direct logical link</text>
    <text x="50" y="170" fill="hsl(220 9% 50%)" font-style="italic" font-size="11">Asks: "Which quotation</text>
    <text x="50" y="186" fill="hsl(220 9% 50%)" font-style="italic" font-size="11">best supports the claim?"</text>

    <rect x="320" y="30" width="250" height="180" rx="14" fill="hsl(160 84% 39% / 0.12)" stroke="hsl(160 84% 39%)" stroke-width="2"/>
    <text x="445" y="58" text-anchor="middle" font-weight="700" font-size="15" fill="hsl(160 84% 25%)">📊 Quantitative Evidence</text>
    <text x="340" y="88" fill="hsl(220 9% 25%)">• Table / bar chart</text>
    <text x="340" y="112" fill="hsl(220 9% 25%)">• Numerical data</text>
    <text x="340" y="136" fill="hsl(220 9% 25%)">• Trend analysis</text>
    <text x="340" y="170" fill="hsl(220 9% 50%)" font-style="italic" font-size="11">Asks: "Which choice uses</text>
    <text x="340" y="186" fill="hsl(220 9% 50%)" font-style="italic" font-size="11">data from the table to..."</text>
  </g>
</svg>
<figcaption>The two flavors of Command of Evidence on the Digital SAT</figcaption>
</figure>

### 🔍 The "5-Second Elimination" Technique

1. **Read the claim** first; **underline keywords** (claim words)
2. **Read each answer** through the lens of the claim - must **directly** support it
3. **Eliminate the 3 common traps**:
   - 🚫 **Tangent**: related to the topic but doesn't support the claim
   - 🚫 **Reverse**: supports the **opposite** conclusion
   - 🚫 **Half-support**: only addresses part of the claim

### 📊 Quantitative Evidence Example

> **Claim**: *"Schools that adopted the new curriculum showed faster reading progress."*
>
> **Data table**:
> | School | Old (words/min) | New (words/min) | Change |
> |--------|----------------|-----------------|--------|
> | A (new) | 145 | 178 | +33 |
> | B (old) | 152 | 158 | +6 |
> | C (new) | 138 | 172 | +34 |

The right answer must **directly compare** new-curriculum schools (A, C: +33, +34) with old (B: +6) → supports "faster". Wrong answers will cite a single isolated number or mention an irrelevant school.`,
        proTips: [
          "Paired questions: trả lời câu hỏi chính trước, sau đó tìm bằng chứng",
          "Bằng chứng tốt nhất là bằng chứng TRỰC TIẾP hỗ trợ - không gián tiếp",
          "Với bảng dữ liệu: kiểm tra cả ROW (hàng) lẫn COLUMN (cột) trước khi chọn",
          "Đề cập 'most directly' = chọn đáp án ngắn gọn, đi thẳng vào vấn đề",
        ],
        proTipsEn: [
          "Paired questions: answer the main question first, then find evidence",
          "Best evidence DIRECTLY supports the claim - not indirectly",
          "For data tables: check both ROWS and COLUMNS before answering",
          "When you see 'most directly', pick the most concise, on-point answer",
        ],
        vocabulary: [
          { word: "cite", meaning: "trích dẫn", example: "The student cited evidence from paragraph 3.", partOfSpeech: "verb" },
          { word: "bolster", meaning: "củng cố, tăng cường", example: "New data bolsters the original claim.", partOfSpeech: "verb" },
          { word: "refute", meaning: "bác bỏ", example: "The study refutes earlier findings about climate patterns.", partOfSpeech: "verb" },
          { word: "empirical", meaning: "thực nghiệm", example: "Empirical evidence is gathered through observation.", partOfSpeech: "adjective" },
          { word: "quantitative", meaning: "định lượng", example: "Quantitative data includes numbers and statistics.", partOfSpeech: "adjective" },
          { word: "qualitative", meaning: "định tính", example: "Qualitative research explores people's experiences.", partOfSpeech: "adjective" },
          { word: "hypothesis", meaning: "giả thuyết", example: "The hypothesis was tested through experiments.", partOfSpeech: "noun" },
          { word: "methodology", meaning: "phương pháp luận", example: "The research methodology was rigorous.", partOfSpeech: "noun" },
          { word: "credible", meaning: "đáng tin cậy", example: "Only credible sources should be used in academic work.", partOfSpeech: "adjective" },
          { word: "paradigm", meaning: "mô hình, khuôn mẫu", example: "This represents a paradigm shift in scientific thinking.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp vào chỗ trống:",
            instructionEn: "Fill in the blanks:",
            sentences: [
              { text: "Please ___ the source of your information.", textEn: "Please ___ the source of your information.", answer: "cite", hint: "trích dẫn" },
              { text: "The new findings ___ the original theory.", textEn: "The new findings ___ the original theory.", answer: "bolster", hint: "củng cố" },
              { text: "The researcher's ___ was tested over three years.", textEn: "The researcher's ___ was tested over three years.", answer: "hypothesis", hint: "giả thuyết" },
              { text: "___ evidence relies on measurable data.", textEn: "___ evidence relies on measurable data.", answer: "Empirical", hint: "thực nghiệm" },
              { text: "The source must be ___ to be accepted.", textEn: "The source must be ___ to be accepted.", answer: "credible", hint: "đáng tin" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp lại câu:",
            instructionEn: "Reorder the sentence:",
            items: [
              { scrambled: ["evidence", "claim", "Which", "the", "best", "supports", "?"], correct: "Which evidence best supports the claim?", correctEn: "Which evidence best supports the claim?" },
              { scrambled: ["refuted", "was", "The", "by", "hypothesis", "data", "new"], correct: "The hypothesis was refuted by new data.", correctEn: "The hypothesis was refuted by new data." },
            ],
          },
        ],
        quiz: [
          { question: "What does 'Command of Evidence' require?", options: ["Summarize the passage", "Select evidence supporting your answer", "Write a new paragraph", "Analyze grammar"], answer: 1, explanation: "Command of Evidence requires identifying the specific excerpt that supports your answer." },
          { question: "What does 'refute' mean?", options: ["Agree", "Disprove", "Summarize", "Expand"], answer: 1, explanation: "'Refute' means to disprove or prove something wrong." },
          { question: "How should you approach paired questions?", options: ["Skip the first question", "Answer the main question first, then find evidence", "Only answer the last question", "Guess both"], answer: 1, explanation: "Answering the main question first helps you know what evidence to look for." },
          { question: "What type of evidence is 'empirical evidence'?", options: ["Based on personal opinion", "Gathered through observation and experiments", "Only from textbooks", "Does not need verification"], answer: 1, explanation: "Empirical evidence is gathered through direct observation or experimentation." },
          { question: "What characterizes the best evidence on the SAT?", options: ["Indirectly related", "Directly supports the argument", "Contains difficult vocabulary", "Located at the end of the passage"], answer: 1, explanation: "The best evidence must directly support the claim - not indirectly or vaguely." },
        ],
      },
      {
        id: "sat-rw-words-context",
        title: "Words in Context",
        titleEn: "Words in Context",
        level: 4,
        difficulty: "advanced",
        theory: `## Từ vựng trong Ngữ cảnh (Words in Context)

SAT KHÔNG kiểm tra từ vựng đơn lẻ - mà kiểm tra **nghĩa của từ trong ngữ cảnh cụ thể**. Phần lớn từ trong câu hỏi này là **từ quen thuộc** dùng với **nghĩa ít phổ biến**, hoặc từ học thuật mà bạn cần hiểu sắc thái.

<figure>
<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quy trình Words in Context">
  <rect width="600" height="220" fill="hsl(280 70% 60% / 0.05)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="15">
    <rect x="30" y="30" width="160" height="160" rx="14" fill="white" stroke="hsl(280 70% 60%)" stroke-width="2"/>
    <text x="110" y="62" text-anchor="middle" font-weight="700" font-size="16" fill="hsl(280 70% 35%)">📖 Che từ</text>
    <text x="110" y="105" text-anchor="middle" font-weight="600" fill="hsl(220 15% 20%)">Che từ gốc,</text>
    <text x="110" y="130" text-anchor="middle" font-weight="600" fill="hsl(220 15% 20%)">đọc 1–2 câu</text>
    <text x="110" y="155" text-anchor="middle" font-weight="600" fill="hsl(220 15% 20%)">trước &amp; sau</text>

    <path d="M195 110 L225 110" stroke="hsl(280 70% 60%)" stroke-width="2" marker-end="url(#arrW)"/>

    <rect x="230" y="30" width="160" height="160" rx="14" fill="white" stroke="hsl(280 70% 60%)" stroke-width="2"/>
    <text x="310" y="62" text-anchor="middle" font-weight="700" font-size="16" fill="hsl(280 70% 35%)">💭 Đoán nghĩa</text>
    <text x="310" y="105" text-anchor="middle" font-weight="600" fill="hsl(220 15% 20%)">Đoán nghĩa</text>
    <text x="310" y="130" text-anchor="middle" font-weight="600" fill="hsl(220 15% 20%)">bằng từ ngữ</text>
    <text x="310" y="155" text-anchor="middle" font-weight="600" fill="hsl(220 15% 20%)">của riêng bạn</text>

    <path d="M395 110 L425 110" stroke="hsl(280 70% 60%)" stroke-width="2" marker-end="url(#arrW)"/>

    <rect x="430" y="30" width="160" height="160" rx="14" fill="white" stroke="hsl(280 70% 60%)" stroke-width="2"/>
    <text x="510" y="62" text-anchor="middle" font-weight="700" font-size="16" fill="hsl(280 70% 35%)">✓ Khớp đáp án</text>
    <text x="510" y="105" text-anchor="middle" font-weight="600" fill="hsl(220 15% 20%)">Tìm đáp án</text>
    <text x="510" y="130" text-anchor="middle" font-weight="600" fill="hsl(220 15% 20%)">gần nhất với</text>
    <text x="510" y="155" text-anchor="middle" font-weight="600" fill="hsl(220 15% 20%)">dự đoán</text>
  </g>
  <defs>
    <marker id="arrW" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="hsl(280 70% 60%)"/>
    </marker>
  </defs>
</svg>
<figcaption>Quy trình "Cover-Predict-Match" - chiến thuật vàng cho Words in Context</figcaption>
</figure>

### 🎯 Phân loại từ đa nghĩa thường gặp

| Từ | Nghĩa thông thường | Nghĩa SAT thường dùng |
|----|---------------------|------------------------|
| **address** | địa chỉ (n) | giải quyết, đối phó (v) |
| **novel** | tiểu thuyết (n) | mới lạ, độc đáo (adj) |
| **check** | kiểm tra (v) | kiềm chế, ngăn cản (v) |
| **acute** | nhọn (adj) | nhạy bén, sắc sảo (adj) |
| **fashion** | thời trang (n) | tạo nên, hình thành (v) |
| **gravity** | trọng lực (n) | tính nghiêm trọng (n) |
| **qualify** | đạt chuẩn (v) | hạn chế, điều chỉnh (v) |
| **currency** | tiền tệ (n) | sự phổ biến (n) |

### 📝 Ví dụ thực chiến

> *"The committee chose to **table** the proposal until next month."*

❌ Nghĩa thông thường: "đặt lên bàn" → vô nghĩa  
✅ Nghĩa SAT: "**hoãn lại, gác lại**" → hợp lý với "until next month"

### ⚠️ Bẫy thường gặp
- **Đáp án "đẹp" nhất** thường là bẫy - chọn đáp án **chính xác về sắc thái**, không phải đáp án nghe sang
- **Connotation matters**: "thrifty" (tiết kiệm - tích cực) ≠ "stingy" (keo kiệt - tiêu cực)`,
        theoryEn: `## Words in Context

The SAT does NOT test vocabulary in isolation - it tests **meaning in specific context**. Most words in these questions are **familiar words with less-common meanings**, or academic words where you need to grasp the nuance.

<figure>
<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Words in Context process">
  <rect width="600" height="220" fill="hsl(280 70% 60% / 0.05)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="13">
    <rect x="30" y="30" width="160" height="160" rx="14" fill="white" stroke="hsl(280 70% 60%)" stroke-width="2"/>
    <text x="110" y="60" text-anchor="middle" font-weight="700" fill="hsl(280 70% 40%)">📖 Cover the word</text>
    <text x="110" y="100" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">Hide original</text>
    <text x="110" y="130" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">read 1-2 lines</text>
    <text x="110" y="160" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">around it</text>

    <path d="M195 110 L225 110" stroke="hsl(280 70% 60%)" stroke-width="2" marker-end="url(#arrWE)"/>

    <rect x="230" y="30" width="160" height="160" rx="14" fill="white" stroke="hsl(280 70% 60%)" stroke-width="2"/>
    <text x="310" y="60" text-anchor="middle" font-weight="700" fill="hsl(280 70% 40%)">💭 Predict meaning</text>
    <text x="310" y="100" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">Guess in</text>
    <text x="310" y="130" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">your own</text>
    <text x="310" y="160" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">simple words</text>

    <path d="M395 110 L425 110" stroke="hsl(280 70% 60%)" stroke-width="2" marker-end="url(#arrWE)"/>

    <rect x="430" y="30" width="160" height="160" rx="14" fill="white" stroke="hsl(280 70% 60%)" stroke-width="2"/>
    <text x="510" y="60" text-anchor="middle" font-weight="700" fill="hsl(280 70% 40%)">✓ Match answer</text>
    <text x="510" y="100" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">Find option</text>
    <text x="510" y="130" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">closest to</text>
    <text x="510" y="160" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">your prediction</text>
  </g>
  <defs>
    <marker id="arrWE" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="hsl(280 70% 60%)"/>
    </marker>
  </defs>
</svg>
<figcaption>The "Cover-Predict-Match" workflow - gold-standard for Words in Context</figcaption>
</figure>

### 🎯 Common Polysemous Words

| Word | Common Meaning | SAT Meaning |
|------|----------------|--------------|
| **address** | location (n) | deal with, tackle (v) |
| **novel** | book (n) | new, original (adj) |
| **check** | inspect (v) | restrain, limit (v) |
| **acute** | sharp angle (adj) | keen, perceptive (adj) |
| **fashion** | clothing trend (n) | shape, create (v) |
| **gravity** | physical force (n) | seriousness (n) |
| **qualify** | meet criteria (v) | limit, modify (v) |
| **currency** | money (n) | widespread acceptance (n) |

### 📝 Real Example

> *"The committee chose to **table** the proposal until next month."*

❌ Common meaning: "place on a table" → makes no sense  
✅ SAT meaning: "**postpone, set aside**" → logical with "until next month"

### ⚠️ Common Trap
- The "fanciest" answer is usually a trap - choose the option that **fits the nuance**, not the impressive-sounding word
- **Connotation matters**: "thrifty" (frugal - positive) ≠ "stingy" (cheap - negative)`,
        proTips: [
          "Thay thế từ gốc bằng từng đáp án - đáp án đúng không thay đổi ý nghĩa câu",
          "Từ quen thuộc thường được dùng với nghĩa ít phổ biến hơn trong SAT",
          "Connotation (sắc thái) là chìa khóa: tích cực vs trung tính vs tiêu cực",
          "Đừng chọn từ 'sang' nhất - chọn từ ĐÚNG sắc thái nhất",
        ],
        proTipsEn: [
          "Replace the original word with each option - the correct one doesn't change sentence meaning",
          "Familiar words are often used with less common meanings on the SAT",
          "Connotation is key: positive vs neutral vs negative",
          "Don't pick the fanciest word - pick the one with the right tone",
        ],
        vocabulary: [
          { word: "acute", meaning: "nhạy bén / cấp tính / nghiêm trọng", example: "She has an acute sense of observation.", partOfSpeech: "adjective" },
          { word: "address", meaning: "giải quyết (ngoài nghĩa 'địa chỉ')", example: "The committee will address the issue tomorrow.", partOfSpeech: "verb" },
          { word: "appreciate", meaning: "nhận thức, hiểu rõ (ngoài 'đánh giá cao')", example: "Few people appreciate the complexity of the problem.", partOfSpeech: "verb" },
          { word: "channel", meaning: "hướng, chuyển (ngoài 'kênh')", example: "She channeled her energy into creative work.", partOfSpeech: "verb" },
          { word: "check", meaning: "kiềm chế, ngăn cản (ngoài 'kiểm tra')", example: "The policy was designed to check inflation.", partOfSpeech: "verb" },
          { word: "currency", meaning: "sự phổ biến (ngoài 'tiền tệ')", example: "The idea gained currency among intellectuals.", partOfSpeech: "noun" },
          { word: "entertain", meaning: "xem xét (ngoài 'giải trí')", example: "She refused to entertain the possibility of failure.", partOfSpeech: "verb" },
          { word: "fashion", meaning: "tạo nên, hình thành (ngoài 'thời trang')", example: "He fashioned a solution from limited resources.", partOfSpeech: "verb" },
          { word: "gravity", meaning: "tính nghiêm trọng (ngoài 'trọng lực')", example: "The gravity of the situation was clear to everyone.", partOfSpeech: "noun" },
          { word: "qualify", meaning: "hạn chế, điều chỉnh (ngoài 'đạt chuẩn')", example: "She qualified her earlier statement with new data.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn nghĩa phù hợp nhất trong ngữ cảnh:",
            instructionEn: "Choose the most appropriate meaning in context:",
            sentences: [
              { text: "The doctor described the patient's condition as ___. (nghiêm trọng)", textEn: "The doctor described the patient's condition as ___.", answer: "acute", hint: "nhạy bén / cấp tính" },
              { text: "The government must ___ the rising cost of living. (giải quyết)", textEn: "The government must ___ the rising cost of living.", answer: "address", hint: "giải quyết" },
              { text: "He ___ his frustration into productive work. (chuyển hướng)", textEn: "He ___ his frustration into productive work.", answer: "channeled", hint: "hướng, chuyển" },
              { text: "The leader refused to ___ any objections. (xem xét)", textEn: "The leader refused to ___ any objections.", answer: "entertain", hint: "xem xét" },
              { text: "She ___ her statement after receiving new evidence. (điều chỉnh)", textEn: "She ___ her statement after receiving new evidence.", answer: "qualified", hint: "hạn chế, điều chỉnh" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp lại câu:",
            instructionEn: "Reorder the sentence:",
            items: [
              { scrambled: ["the", "appreciated", "Few", "complexity", "of", "problem", "the"], correct: "Few appreciated the complexity of the problem.", correctEn: "Few appreciated the complexity of the problem." },
              { scrambled: ["the", "gravity", "understood", "Everyone", "situation", "of", "the"], correct: "Everyone understood the gravity of the situation.", correctEn: "Everyone understood the gravity of the situation." },
            ],
          },
        ],
        quiz: [
          { question: "What does 'address' mean in 'The mayor will address the concerns'?", options: ["Send mail to", "Deal with", "Provide a location", "Greet"], answer: 1, explanation: "'Address' here means to deal with or attend to (not a physical location)." },
          { question: "What is the most effective strategy for Words in Context?", options: ["Memorize the dictionary", "Substitute each option into the sentence and check logic", "Choose the most common meaning", "Ignore the context"], answer: 1, explanation: "Substitution helps you check which meaning fits best in the given context." },
          { question: "What does 'entertain' mean in 'entertain the idea'?", options: ["Amuse", "Consider or contemplate", "Reject", "Present"], answer: 1, explanation: "'Entertain an idea' means to consider or contemplate a possibility." },
          { question: "What does 'currency' mean in 'the idea gained currency'?", options: ["Money", "Widespread acceptance", "Value", "Speed"], answer: 1, explanation: "'Gain currency' means to become widely accepted or popular." },
          { question: "Why does the SAT use familiar words with uncommon meanings?", options: ["To trick students", "To test real contextual understanding", "Because there aren't enough new words", "To save time"], answer: 1, explanation: "The SAT tests the ability to infer meaning from context - a core reading comprehension skill." },
        ],
      },
      {
        id: "sat-rw-conventions",
        title: "Standard English Conventions",
        titleEn: "Standard English Conventions",
        level: 3,
        difficulty: "intermediate",
        theory: `## Quy tắc Tiếng Anh Chuẩn (Standard English Conventions)

Phần này chiếm **~26%** của Reading & Writing (~14 câu / 54 câu). Chủ yếu kiểm tra: ngữ pháp, dấu câu, parallel structure. Tin vui: nhóm chủ đề **HẸP** và lặp đi lặp lại - nắm vững 6 chủ đề dưới đây = "ăn" trọn phần này.

<figure>
<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tần suất các chủ đề Standard English Conventions">
  <rect width="600" height="280" fill="hsl(160 84% 39% / 0.04)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="12">
    <text x="300" y="28" text-anchor="middle" font-weight="700" font-size="14" fill="hsl(220 9% 25%)">Tần suất chủ đề Conventions trên Digital SAT</text>
    <g transform="translate(40, 50)">
      <rect x="0" y="0" width="280" height="22" fill="hsl(217 91% 60%)" rx="4"/>
      <text x="290" y="16" fill="hsl(220 9% 25%)">Punctuation · 28%</text>
      <rect x="0" y="32" width="220" height="22" fill="hsl(217 91% 65%)" rx="4"/>
      <text x="230" y="48" fill="hsl(220 9% 25%)">Subject-Verb Agreement · 22%</text>
      <rect x="0" y="64" width="170" height="22" fill="hsl(160 84% 50%)" rx="4"/>
      <text x="180" y="80" fill="hsl(220 9% 25%)">Pronoun-Antecedent · 17%</text>
      <rect x="0" y="96" width="140" height="22" fill="hsl(160 84% 55%)" rx="4"/>
      <text x="150" y="112" fill="hsl(220 9% 25%)">Verb Tense · 14%</text>
      <rect x="0" y="128" width="110" height="22" fill="hsl(280 70% 60%)" rx="4"/>
      <text x="120" y="144" fill="hsl(220 9% 25%)">Parallel Structure · 11%</text>
      <rect x="0" y="160" width="80" height="22" fill="hsl(280 70% 65%)" rx="4"/>
      <text x="90" y="176" fill="hsl(220 9% 25%)">Modifiers · 8%</text>
    </g>
  </g>
</svg>
<figcaption>Tần suất các chủ đề ngữ pháp trong phần Conventions (số liệu từ College Board 2024-2025)</figcaption>
</figure>

### 6 Chủ đề CỐT LÕI

#### 1️⃣ Subject-Verb Agreement
- Tìm chủ ngữ THẬT, bỏ qua các cụm chèn giữa
- **The box** of chocolates **is** (không phải "are")
- "Each / every / either / neither" → luôn số ít
- **Data** is số nhiều trong SAT (theo chuẩn academic)

#### 2️⃣ Punctuation Quy tắc 4 dấu
| Dấu | Dùng khi | Ví dụ |
|-----|----------|-------|
| **,** (comma) | Tách item, mệnh đề phụ | I read a book, drank tea, and slept. |
| **;** (semicolon) | Nối 2 IC* mà không dùng FANBOYS | She studied hard; she passed. |
| **:** (colon) | Giới thiệu list/giải thích | I love three things: art, music, math. |
| **-** (em dash) | Chèn giải thích mạnh | Her solution-elegant and bold-worked. |

*IC = Independent Clause (mệnh đề độc lập)

#### 3️⃣ Pronoun-Antecedent
- **Everyone / each / nobody** → đại từ số ít (his/her, không "their" trong SAT)
- Tránh **ambiguous reference**: "Tom told Jim **he** was wrong" → ai? → cần viết lại

#### 4️⃣ Verb Tense Consistency
- Toàn đoạn cùng một thì trừ khi có lý do rõ ràng
- **Past + Past Perfect** khi có 2 hành động trong quá khứ

#### 5️⃣ Parallel Structure
- Cùng dạng từ trong list/comparison
- ✅ "running, swimming, **and** **cycling**"
- ❌ "running, swimming, and **to cycle**"

#### 6️⃣ Modifiers
- Tránh **dangling modifier**: "Walking down the street, the trees were beautiful." → ai walking?
- Tính từ đứng cạnh danh từ nó bổ nghĩa`,
        theoryEn: `## Standard English Conventions

This section is **~26%** of Reading & Writing (~14/54 questions). It tests: grammar, punctuation, parallel structure. Good news: the topic pool is **NARROW** and repetitive - master the 6 topics below and you'll ace this section.

<figure>
<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Frequency of Standard English Conventions topics">
  <rect width="600" height="280" fill="hsl(160 84% 39% / 0.04)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="12">
    <text x="300" y="28" text-anchor="middle" font-weight="700" font-size="14" fill="hsl(220 9% 25%)">Conventions Topic Frequency on Digital SAT</text>
    <g transform="translate(40, 50)">
      <rect x="0" y="0" width="280" height="22" fill="hsl(217 91% 60%)" rx="4"/>
      <text x="290" y="16" fill="hsl(220 9% 25%)">Punctuation · 28%</text>
      <rect x="0" y="32" width="220" height="22" fill="hsl(217 91% 65%)" rx="4"/>
      <text x="230" y="48" fill="hsl(220 9% 25%)">Subject-Verb Agreement · 22%</text>
      <rect x="0" y="64" width="170" height="22" fill="hsl(160 84% 50%)" rx="4"/>
      <text x="180" y="80" fill="hsl(220 9% 25%)">Pronoun-Antecedent · 17%</text>
      <rect x="0" y="96" width="140" height="22" fill="hsl(160 84% 55%)" rx="4"/>
      <text x="150" y="112" fill="hsl(220 9% 25%)">Verb Tense · 14%</text>
      <rect x="0" y="128" width="110" height="22" fill="hsl(280 70% 60%)" rx="4"/>
      <text x="120" y="144" fill="hsl(220 9% 25%)">Parallel Structure · 11%</text>
      <rect x="0" y="160" width="80" height="22" fill="hsl(280 70% 65%)" rx="4"/>
      <text x="90" y="176" fill="hsl(220 9% 25%)">Modifiers · 8%</text>
    </g>
  </g>
</svg>
<figcaption>Frequency of grammar topics in the Conventions section (College Board 2024-2025)</figcaption>
</figure>

### The 6 CORE Topics

#### 1️⃣ Subject-Verb Agreement
- Find the REAL subject; ignore intervening phrases
- **The box** of chocolates **is** (not "are")
- "Each / every / either / neither" → always singular
- **Data** is plural in SAT (academic standard)

#### 2️⃣ Punctuation: The 4-Mark Rule
| Mark | Use When | Example |
|------|----------|---------|
| **,** (comma) | Separate items, dependent clauses | I read a book, drank tea, and slept. |
| **;** (semicolon) | Joins 2 ICs* without FANBOYS | She studied hard; she passed. |
| **:** (colon) | Introduces list/explanation | I love three things: art, music, math. |
| **-** (em dash) | Strong parenthetical insertion | Her solution-elegant and bold-worked. |

*IC = Independent Clause

#### 3️⃣ Pronoun-Antecedent
- **Everyone / each / nobody** → singular pronouns (his/her, not "their" in formal SAT)
- Avoid **ambiguous reference**: "Tom told Jim **he** was wrong" → who? → must rewrite

#### 4️⃣ Verb Tense Consistency
- Stay in one tense unless there's a clear reason
- **Past + Past Perfect** when two actions in the past

#### 5️⃣ Parallel Structure
- Same form across list/comparison
- ✅ "running, swimming, **and** **cycling**"
- ❌ "running, swimming, and **to cycle**"

#### 6️⃣ Modifiers
- Avoid **dangling modifier**: "Walking down the street, the trees were beautiful." → who's walking?
- Adjectives sit next to the noun they modify`,
        proTips: [
          "Tìm chủ ngữ thật - bỏ qua các cụm chèn giữa để tránh lỗi agreement",
          "Semicolon (;) chỉ nối 2 mệnh đề độc lập - không dùng trước 'because', 'although'",
          "Parallel structure: running, swimming, AND cycling (không phải 'to cycle')",
          "Khi thấy ; trong đáp án, kiểm tra cả 2 vế đều có thể đứng độc lập",
          "Dấu : luôn theo sau IC (mệnh đề độc lập), KHÔNG theo sau verb hoặc preposition",
        ],
        proTipsEn: [
          "Find the real subject - skip intervening phrases to avoid agreement errors",
          "Semicolons (;) only join 2 independent clauses - not before 'because', 'although'",
          "Parallel structure: running, swimming, AND cycling (not 'to cycle')",
          "When you see ; in an answer, check both sides could stand alone",
          "Colons (:) always follow an IC - never after a verb or preposition",
        ],
        vocabulary: [
          { word: "modifier", meaning: "bổ ngữ, từ bổ nghĩa", example: "A dangling modifier creates confusion in a sentence.", partOfSpeech: "noun" },
          { word: "clause", meaning: "mệnh đề", example: "An independent clause can stand alone as a sentence.", partOfSpeech: "noun" },
          { word: "antecedent", meaning: "tiền ngữ (từ được đại từ thay thế)", example: "The pronoun must agree with its antecedent.", partOfSpeech: "noun" },
          { word: "conjunction", meaning: "liên từ", example: "Coordinating conjunctions include and, but, or.", partOfSpeech: "noun" },
          { word: "semicolon", meaning: "dấu chấm phẩy", example: "Use a semicolon to join related independent clauses.", partOfSpeech: "noun" },
          { word: "appositive", meaning: "đồng vị ngữ", example: "An appositive renames a nearby noun.", partOfSpeech: "noun" },
          { word: "subordinate", meaning: "phụ thuộc", example: "A subordinate clause cannot stand alone.", partOfSpeech: "adjective" },
          { word: "concise", meaning: "ngắn gọn, súc tích", example: "Good writing is concise and clear.", partOfSpeech: "adjective" },
          { word: "redundant", meaning: "thừa, lặp lại", example: "'Free gift' is redundant because gifts are always free.", partOfSpeech: "adjective" },
          { word: "syntax", meaning: "cú pháp", example: "Proper syntax ensures sentences are grammatically correct.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn dạng đúng của động từ:",
            instructionEn: "Choose the correct verb form:",
            sentences: [
              { text: "The group of students ___ working on the project.", textEn: "The group of students ___ working on the project.", answer: "is", hint: "chủ ngữ là 'group' (số ít)" },
              { text: "Neither the teacher nor the students ___ the answer.", textEn: "Neither the teacher nor the students ___ the answer.", answer: "know", hint: "gần nhất là 'students' (số nhiều)" },
              { text: "Each of the candidates ___ prepared a speech.", textEn: "Each of the candidates ___ prepared a speech.", answer: "has", hint: "'each' luôn số ít" },
              { text: "The data from the experiments ___ the hypothesis.", textEn: "The data from the experiments ___ the hypothesis.", answer: "support", hint: "'data' là số nhiều" },
              { text: "Running, swimming, and ___ are great exercises.", textEn: "Running, swimming, and ___ are great exercises.", answer: "cycling", hint: "parallel structure" },
            ],
          },
        ],
        quiz: [
          { question: "Which sentence is grammatically correct?", options: ["The team are ready.", "The team is ready.", "The team were ready.", "The team have been ready."], answer: 1, explanation: "'Team' is a collective noun treated as singular in American English → use 'is'." },
          { question: "What is the purpose of a semicolon (;)?", options: ["Join a dependent clause to a main clause", "Join 2 related independent clauses", "Replace a comma", "End a question"], answer: 1, explanation: "A semicolon joins two related independent clauses without a conjunction." },
          { question: "When does a 'dangling modifier' error occur?", options: ["Using the wrong verb tense", "The modifier doesn't clearly refer to a noun", "Missing a comma", "Using the wrong pronoun"], answer: 1, explanation: "A dangling modifier occurs when it's unclear which noun the modifier is describing." },
          { question: "What does 'redundant' mean?", options: ["Lacking information", "Unnecessarily repetitive", "Grammatically incorrect", "Too short"], answer: 1, explanation: "'Redundant' means repeating information that is already clear or unnecessary." },
          { question: "What does parallel structure require?", options: ["Sentences must be equal in length", "Coordinate elements must use the same grammatical form", "Always use gerunds", "Sentences must have 3 parts"], answer: 1, explanation: "Parallel structure requires listed or compared elements to share the same grammatical form." },
        ],
      },
    ],
  },
  {
    id: "sat-advanced-vocab",
    title: "SAT Advanced Vocabulary",
    titleEn: "SAT Advanced Vocabulary",
    icon: "🎯",
    color: "indigo",
    description: "Từ vựng nâng cao thường xuất hiện trong bài thi SAT",
    descriptionEn: "Advanced vocabulary frequently appearing on the SAT",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-vocab-set1",
        title: "High-Frequency SAT Words – Set 1",
        titleEn: "High-Frequency SAT Words – Set 1",
        level: 3,
        difficulty: "intermediate",
        theory: `## Từ Vựng SAT Tần Suất Cao – Phần 1

Theo phân tích **3000+ câu SAT** (2017-2025), nhóm 100 từ "Tier-1" này xuất hiện trung bình **8-12 lần** mỗi đề. Nắm vững Set 1 (10 từ) = trả lời được **15-20%** câu Words in Context dễ hơn.

<figure>
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Đường cong ghi nhớ Spaced Repetition">
  <rect width="600" height="240" fill="hsl(217 91% 60% / 0.04)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="11">
    <text x="300" y="24" text-anchor="middle" font-weight="700" font-size="14" fill="hsl(220 9% 25%)">Spaced Repetition Curve - Đường cong ghi nhớ</text>
    <line x1="60" y1="200" x2="560" y2="200" stroke="hsl(220 9% 60%)" stroke-width="1.5"/>
    <line x1="60" y1="60" x2="60" y2="200" stroke="hsl(220 9% 60%)" stroke-width="1.5"/>
    <text x="40" y="70" text-anchor="end" fill="hsl(220 9% 50%)">100%</text>
    <text x="40" y="135" text-anchor="end" fill="hsl(220 9% 50%)">50%</text>
    <text x="40" y="205" text-anchor="end" fill="hsl(220 9% 50%)">0%</text>
    <text x="60" y="220" text-anchor="middle" fill="hsl(220 9% 50%)">D1</text>
    <text x="185" y="220" text-anchor="middle" fill="hsl(220 9% 50%)">D3</text>
    <text x="310" y="220" text-anchor="middle" fill="hsl(220 9% 50%)">D7</text>
    <text x="435" y="220" text-anchor="middle" fill="hsl(220 9% 50%)">D14</text>
    <text x="560" y="220" text-anchor="middle" fill="hsl(220 9% 50%)">D30</text>
    <path d="M60 70 Q 90 100 185 80 Q 220 100 310 75 Q 360 95 435 72 Q 490 90 560 70" stroke="hsl(160 84% 39%)" stroke-width="3" fill="none"/>
    <path d="M60 70 Q 90 130 185 175 Q 280 195 560 198" stroke="hsl(0 80% 60%)" stroke-width="2.5" fill="none" stroke-dasharray="6 4"/>
    <g font-size="11">
      <circle cx="500" cy="70" r="5" fill="hsl(160 84% 39%)"/>
      <text x="510" y="75" fill="hsl(220 9% 25%)">Có Spaced Repetition</text>
      <circle cx="500" cy="195" r="5" fill="hsl(0 80% 60%)"/>
      <text x="510" y="200" fill="hsl(220 9% 25%)">Học 1 lần rồi quên</text>
    </g>
  </g>
</svg>
<figcaption>Học từ theo chu kỳ D1-D3-D7-D14-D30 giữ được 90%+ từ vựng (vs 20% nếu học 1 lần)</figcaption>
</figure>

### 🧠 Mẹo học từ vựng SAT
- Học theo **ngữ cảnh**, không học đơn lẻ → ghi nhớ sâu gấp 3 lần
- Tạo **flashcards** với câu ví dụ thực
- Sử dụng từ mới trong **viết và nói** hàng ngày
- Tìm **word families**: ambiguous → ambiguity → unambiguously
- **Anki / Quizlet** với chu kỳ Spaced Repetition

### 📊 Mức độ hiệu quả các phương pháp
| Phương pháp | Tỉ lệ nhớ sau 30 ngày |
|-------------|------------------------|
| Học từ + dịch nghĩa | 20% |
| Học + câu ví dụ | 40% |
| Học + Spaced Repetition | 75% |
| Học + dùng trong viết/nói | **90%+** |`,
        theoryEn: `## High-Frequency SAT Words – Set 1

Based on analysis of **3000+ SAT questions** (2017-2025), this "Tier-1" 100-word group appears on average **8-12 times** per test. Mastering Set 1 (10 words) = makes **15-20%** of Words in Context questions easier.

<figure>
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Spaced Repetition memory curve">
  <rect width="600" height="240" fill="hsl(217 91% 60% / 0.04)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="11">
    <text x="300" y="24" text-anchor="middle" font-weight="700" font-size="14" fill="hsl(220 9% 25%)">Spaced Repetition Memory Curve</text>
    <line x1="60" y1="200" x2="560" y2="200" stroke="hsl(220 9% 60%)" stroke-width="1.5"/>
    <line x1="60" y1="60" x2="60" y2="200" stroke="hsl(220 9% 60%)" stroke-width="1.5"/>
    <text x="40" y="70" text-anchor="end" fill="hsl(220 9% 50%)">100%</text>
    <text x="40" y="135" text-anchor="end" fill="hsl(220 9% 50%)">50%</text>
    <text x="40" y="205" text-anchor="end" fill="hsl(220 9% 50%)">0%</text>
    <text x="60" y="220" text-anchor="middle" fill="hsl(220 9% 50%)">D1</text>
    <text x="185" y="220" text-anchor="middle" fill="hsl(220 9% 50%)">D3</text>
    <text x="310" y="220" text-anchor="middle" fill="hsl(220 9% 50%)">D7</text>
    <text x="435" y="220" text-anchor="middle" fill="hsl(220 9% 50%)">D14</text>
    <text x="560" y="220" text-anchor="middle" fill="hsl(220 9% 50%)">D30</text>
    <path d="M60 70 Q 90 100 185 80 Q 220 100 310 75 Q 360 95 435 72 Q 490 90 560 70" stroke="hsl(160 84% 39%)" stroke-width="3" fill="none"/>
    <path d="M60 70 Q 90 130 185 175 Q 280 195 560 198" stroke="hsl(0 80% 60%)" stroke-width="2.5" fill="none" stroke-dasharray="6 4"/>
    <g font-size="11">
      <circle cx="500" cy="70" r="5" fill="hsl(160 84% 39%)"/>
      <text x="510" y="75" fill="hsl(220 9% 25%)">With Spaced Repetition</text>
      <circle cx="500" cy="195" r="5" fill="hsl(0 80% 60%)"/>
      <text x="510" y="200" fill="hsl(220 9% 25%)">Learned once, forgotten</text>
    </g>
  </g>
</svg>
<figcaption>Studying on a D1-D3-D7-D14-D30 cycle retains 90%+ of vocabulary (vs 20% if learned once)</figcaption>
</figure>

### 🧠 SAT Vocabulary Tips
- Learn in **context**, not isolation → 3x deeper retention
- Build **flashcards** with real example sentences
- Use new words in daily **writing and speaking**
- Find **word families**: ambiguous → ambiguity → unambiguously
- **Anki / Quizlet** with Spaced Repetition

### 📊 Method Effectiveness
| Method | Retention after 30 days |
|--------|--------------------------|
| Word + translation only | 20% |
| Word + example sentence | 40% |
| Word + Spaced Repetition | 75% |
| Word + active writing/speaking | **90%+** |`,
        proTips: [
          "Mỗi ngày học 5 từ mới + ôn lại 10 từ cũ = 150 từ/tháng",
          "Dùng từ mới trong câu tự tạo - ghi nhớ sâu hơn 3 lần",
          "Học word families giúp \"ăn\" được 4-5 từ với 1 lần học gốc",
        ],
        proTipsEn: [
          "Learn 5 new words + review 10 old ones daily = 150 words/month",
          "Use new words in self-created sentences - 3x deeper retention",
          "Studying word families gets you 4-5 words for the effort of 1 root",
        ],
        vocabulary: [
          { word: "ubiquitous", meaning: "có mặt khắp nơi", example: "Smartphones have become ubiquitous in modern society.", partOfSpeech: "adjective" },
          { word: "pragmatic", meaning: "thực dụng, thực tế", example: "She took a pragmatic approach to solving the problem.", partOfSpeech: "adjective" },
          { word: "ambiguous", meaning: "mơ hồ, không rõ ràng", example: "The instructions were ambiguous and confused everyone.", partOfSpeech: "adjective" },
          { word: "eloquent", meaning: "hùng biện, lưu loát", example: "Her eloquent speech moved the entire audience.", partOfSpeech: "adjective" },
          { word: "meticulous", meaning: "tỉ mỉ, cẩn thận", example: "He is meticulous about every detail in his work.", partOfSpeech: "adjective" },
          { word: "resilient", meaning: "kiên cường, có sức bật", example: "The community proved resilient after the natural disaster.", partOfSpeech: "adjective" },
          { word: "disparity", meaning: "sự chênh lệch", example: "There is a growing disparity between rich and poor.", partOfSpeech: "noun" },
          { word: "scrutinize", meaning: "xem xét kỹ lưỡng", example: "The committee scrutinized every proposal carefully.", partOfSpeech: "verb" },
          { word: "proliferate", meaning: "sinh sôi, lan rộng", example: "Social media platforms have proliferated over the past decade.", partOfSpeech: "verb" },
          { word: "advocate", meaning: "ủng hộ, vận động (v); người ủng hộ (n)", example: "She advocates for equal access to education.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ SAT phù hợp:",
            instructionEn: "Fill in with the appropriate SAT word:",
            sentences: [
              { text: "Wi-Fi has become ___ in coffee shops and airports.", textEn: "Wi-Fi has become ___ in coffee shops and airports.", answer: "ubiquitous", hint: "có mặt khắp nơi" },
              { text: "A ___ leader focuses on what works, not just ideals.", textEn: "A ___ leader focuses on what works, not just ideals.", answer: "pragmatic", hint: "thực dụng" },
              { text: "The ___ between urban and rural education needs attention.", textEn: "The ___ between urban and rural education needs attention.", answer: "disparity", hint: "sự chênh lệch" },
              { text: "Scientists ___ the data before publishing their findings.", textEn: "Scientists ___ the data before publishing their findings.", answer: "scrutinize", hint: "xem xét kỹ" },
              { text: "The ___ speaker received a standing ovation.", textEn: "The ___ speaker received a standing ovation.", answer: "eloquent", hint: "hùng biện" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp lại câu:",
            instructionEn: "Reorder the sentence:",
            items: [
              { scrambled: ["proved", "community", "after", "The", "resilient", "the", "disaster"], correct: "The community proved resilient after the disaster.", correctEn: "The community proved resilient after the disaster." },
              { scrambled: ["for", "advocates", "She", "equal", "education", "access", "to"], correct: "She advocates for equal access to education.", correctEn: "She advocates for equal access to education." },
            ],
          },
        ],
        quiz: [
          { question: "What does 'ubiquitous' mean?", options: ["Rare", "Found everywhere", "Expensive", "Complex"], answer: 1, explanation: "'Ubiquitous' means found everywhere, extremely widespread." },
          { question: "What kind of person does 'meticulous' describe?", options: ["Lazy", "Extremely careful and detail-oriented", "Short-tempered", "Indifferent"], answer: 1, explanation: "'Meticulous' describes someone who pays great attention to every small detail." },
          { question: "What does 'proliferate' mean?", options: ["Gradually decrease", "Disappear", "Spread or increase rapidly", "Be prohibited"], answer: 2, explanation: "'Proliferate' means to increase rapidly in number or spread widely." },
          { question: "Which word is a noun?", options: ["Pragmatic", "Eloquent", "Disparity", "Resilient"], answer: 2, explanation: "'Disparity' is a noun meaning a gap or difference. The others are adjectives." },
          { question: "What does 'scrutinize' mean?", options: ["Overlook", "Examine closely and thoroughly", "Destroy", "Create"], answer: 1, explanation: "'Scrutinize' means to examine or inspect something carefully and in detail." },
        ],
      },
      {
        id: "sat-vocab-set2",
        title: "High-Frequency SAT Words – Set 2",
        titleEn: "High-Frequency SAT Words – Set 2",
        level: 4,
        difficulty: "advanced",
        theory: `## Từ Vựng SAT Tần Suất Cao – Phần 2

Set 2 gồm các từ **tier 2-3**: thường xuất hiện trong đoạn văn về **khoa học tự nhiên** và **lịch sử/triết học** - hai chủ đề chiếm 50% Reading.

<figure>
<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cặp từ trái nghĩa SAT">
  <rect width="600" height="200" fill="hsl(280 70% 60% / 0.05)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="13">
    <text x="300" y="28" text-anchor="middle" font-weight="700" font-size="14" fill="hsl(280 70% 35%)">⚖️ Cặp từ trái nghĩa quan trọng</text>
    <g transform="translate(40, 50)">
      <rect x="0" y="0" width="220" height="40" rx="8" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/>
      <text x="110" y="25" text-anchor="middle" font-weight="700" fill="hsl(217 91% 35%)">exacerbate (làm tệ)</text>
      <text x="280" y="28" text-anchor="middle" font-size="20" fill="hsl(220 9% 50%)">⇄</text>
      <rect x="300" y="0" width="220" height="40" rx="8" fill="hsl(160 84% 39% / 0.15)" stroke="hsl(160 84% 39%)"/>
      <text x="410" y="25" text-anchor="middle" font-weight="700" fill="hsl(160 84% 25%)">mitigate (giảm nhẹ)</text>

      <rect x="0" y="50" width="220" height="40" rx="8" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/>
      <text x="110" y="75" text-anchor="middle" font-weight="700" fill="hsl(217 91% 35%)">candid (thẳng thắn)</text>
      <text x="280" y="78" text-anchor="middle" font-size="20" fill="hsl(220 9% 50%)">⇄</text>
      <rect x="300" y="50" width="220" height="40" rx="8" fill="hsl(160 84% 39% / 0.15)" stroke="hsl(160 84% 39%)"/>
      <text x="410" y="75" text-anchor="middle" font-weight="700" fill="hsl(160 84% 25%)">evasive (lảng tránh)</text>

      <rect x="0" y="100" width="220" height="40" rx="8" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/>
      <text x="110" y="125" text-anchor="middle" font-weight="700" fill="hsl(217 91% 35%)">ephemeral (phù du)</text>
      <text x="280" y="128" text-anchor="middle" font-size="20" fill="hsl(220 9% 50%)">⇄</text>
      <rect x="300" y="100" width="220" height="40" rx="8" fill="hsl(160 84% 39% / 0.15)" stroke="hsl(160 84% 39%)"/>
      <text x="410" y="125" text-anchor="middle" font-weight="700" fill="hsl(160 84% 25%)">enduring (bền lâu)</text>
    </g>
  </g>
</svg>
<figcaption>Học từ theo cặp trái nghĩa giúp ghi nhớ gấp đôi với cùng thời gian</figcaption>
</figure>

### 🎯 Kỹ thuật ghi nhớ nâng cao
- **Etymology (gốc từ)**: Biết gốc Latin/Greek giúp đoán nghĩa từ mới (xem bài "Roots & Prefixes")
- **Visual Association**: "ephemeral" → tưởng tượng bong bóng xà phòng vỡ
- **Story Method**: Tạo câu chuyện ngắn dùng 5-7 từ liên tiếp
- **Spaced Repetition**: Ôn theo chu kỳ 1-3-7-14 ngày

### 💡 Ứng dụng thực chiến
Khi gặp từ chưa biết trong bài Reading:
1. **Đoán nghĩa qua context** (đủ ý chính)
2. **Note lại từ + câu chứa nó** vào sổ
3. **Tối hôm đó**: tra từ điển, ghi nghĩa + 1 câu mới
4. **3 ngày sau**: ôn lại - nếu nhớ → bỏ vào "deck Long-term"`,
        theoryEn: `## High-Frequency SAT Words – Set 2

Set 2 contains **tier 2-3** words: frequently appearing in passages about **natural sciences** and **history/philosophy** - the two topics making up 50% of Reading content.

<figure>
<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SAT antonym pairs">
  <rect width="600" height="200" fill="hsl(280 70% 60% / 0.05)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="13">
    <text x="300" y="28" text-anchor="middle" font-weight="700" font-size="14" fill="hsl(280 70% 35%)">⚖️ Critical Antonym Pairs</text>
    <g transform="translate(40, 50)">
      <rect x="0" y="0" width="220" height="40" rx="8" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/>
      <text x="110" y="25" text-anchor="middle" font-weight="700" fill="hsl(217 91% 35%)">exacerbate (worsen)</text>
      <text x="280" y="28" text-anchor="middle" font-size="20" fill="hsl(220 9% 50%)">⇄</text>
      <rect x="300" y="0" width="220" height="40" rx="8" fill="hsl(160 84% 39% / 0.15)" stroke="hsl(160 84% 39%)"/>
      <text x="410" y="25" text-anchor="middle" font-weight="700" fill="hsl(160 84% 25%)">mitigate (lessen)</text>

      <rect x="0" y="50" width="220" height="40" rx="8" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/>
      <text x="110" y="75" text-anchor="middle" font-weight="700" fill="hsl(217 91% 35%)">candid (frank)</text>
      <text x="280" y="78" text-anchor="middle" font-size="20" fill="hsl(220 9% 50%)">⇄</text>
      <rect x="300" y="50" width="220" height="40" rx="8" fill="hsl(160 84% 39% / 0.15)" stroke="hsl(160 84% 39%)"/>
      <text x="410" y="75" text-anchor="middle" font-weight="700" fill="hsl(160 84% 25%)">evasive (dodging)</text>

      <rect x="0" y="100" width="220" height="40" rx="8" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)"/>
      <text x="110" y="125" text-anchor="middle" font-weight="700" fill="hsl(217 91% 35%)">ephemeral (fleeting)</text>
      <text x="280" y="128" text-anchor="middle" font-size="20" fill="hsl(220 9% 50%)">⇄</text>
      <rect x="300" y="100" width="220" height="40" rx="8" fill="hsl(160 84% 39% / 0.15)" stroke="hsl(160 84% 39%)"/>
      <text x="410" y="125" text-anchor="middle" font-weight="700" fill="hsl(160 84% 25%)">enduring (lasting)</text>
    </g>
  </g>
</svg>
<figcaption>Studying words in antonym pairs doubles retention for the same time investment</figcaption>
</figure>

### 🎯 Advanced Memorization Techniques
- **Etymology**: Knowing Latin/Greek roots helps predict new word meanings (see "Roots & Prefixes" lesson)
- **Visual Association**: "ephemeral" → picture a soap bubble bursting
- **Story Method**: Create a short story using 5-7 words in sequence
- **Spaced Repetition**: Review on a 1-3-7-14 day cycle

### 💡 Real-World Application
When you encounter an unknown word in Reading:
1. **Guess meaning from context** (just enough for the gist)
2. **Note the word + its sentence** in your notebook
3. **That evening**: dictionary lookup, write meaning + new sentence
4. **3 days later**: review - if remembered → move to "Long-term deck"`,
        vocabulary: [
          { word: "ephemeral", meaning: "phù du, thoáng qua", example: "Social media fame is often ephemeral.", partOfSpeech: "adjective" },
          { word: "juxtapose", meaning: "đặt cạnh nhau để so sánh", example: "The artist juxtaposed old and new techniques.", partOfSpeech: "verb" },
          { word: "paradox", meaning: "nghịch lý", example: "It's a paradox that we have more information but less understanding.", partOfSpeech: "noun" },
          { word: "exacerbate", meaning: "làm trầm trọng hơn", example: "The drought exacerbated the food crisis.", partOfSpeech: "verb" },
          { word: "mitigate", meaning: "giảm nhẹ, xoa dịu", example: "New policies aim to mitigate the effects of climate change.", partOfSpeech: "verb" },
          { word: "unprecedented", meaning: "chưa từng có tiền lệ", example: "The pandemic caused unprecedented disruption.", partOfSpeech: "adjective" },
          { word: "candid", meaning: "thẳng thắn, bộc trực", example: "She gave a candid assessment of the situation.", partOfSpeech: "adjective" },
          { word: "catalyst", meaning: "chất xúc tác, tác nhân thúc đẩy", example: "The discovery was a catalyst for further research.", partOfSpeech: "noun" },
          { word: "digress", meaning: "lạc đề", example: "The speaker tended to digress from the main topic.", partOfSpeech: "verb" },
          { word: "vindicate", meaning: "minh oan, chứng minh đúng", example: "New evidence vindicated the accused scientist.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ SAT phù hợp:",
            instructionEn: "Fill in with the appropriate SAT word:",
            sentences: [
              { text: "Beauty is ___; it fades with time.", textEn: "Beauty is ___; it fades with time.", answer: "ephemeral", hint: "phù du" },
              { text: "Pollution will ___ the health problems in the city.", textEn: "Pollution will ___ the health problems in the city.", answer: "exacerbate", hint: "làm trầm trọng" },
              { text: "The government seeks to ___ the impact of inflation.", textEn: "The government seeks to ___ the impact of inflation.", answer: "mitigate", hint: "giảm nhẹ" },
              { text: "The invention served as a ___ for the industrial revolution.", textEn: "The invention served as a ___ for the industrial revolution.", answer: "catalyst", hint: "chất xúc tác" },
              { text: "The DNA evidence ___ the wrongly convicted man.", textEn: "The DNA evidence ___ the wrongly convicted man.", answer: "vindicated", hint: "minh oan" },
            ],
          },
        ],
        quiz: [
          { question: "What does 'ephemeral' describe?", options: ["Eternal", "Short-lived, fleeting", "Important", "Complex"], answer: 1, explanation: "'Ephemeral' means lasting only for a very short time." },
          { question: "What does 'juxtapose' mean?", options: ["Separate", "Place side by side for comparison", "Combine", "Oppose"], answer: 1, explanation: "'Juxtapose' means to place two things close together to highlight contrast or comparison." },
          { question: "What is the relationship between 'exacerbate' and 'mitigate'?", options: ["Synonyms", "Antonyms", "Unrelated", "Same part of speech but different meaning"], answer: 1, explanation: "'Exacerbate' (make worse) and 'mitigate' (make less severe) are antonyms." },
          { question: "What does 'unprecedented' mean?", options: ["Has happened before", "Never done or known before", "Predicted in advance", "Ordinary"], answer: 1, explanation: "'Unprecedented' means never having happened or existed before." },
          { question: "Which word means 'honest and straightforward'?", options: ["Digress", "Candid", "Ephemeral", "Paradox"], answer: 1, explanation: "'Candid' means truthful and straightforward; frank." },
        ],
      },
      {
        id: "sat-vocab-roots",
        title: "Roots, Prefixes & Suffixes",
        titleEn: "Roots, Prefixes & Suffixes",
        level: 3,
        difficulty: "intermediate",
        theory: `## Gốc từ, Tiền tố & Hậu tố (Roots, Prefixes & Suffixes)

Đây là **siêu vũ khí** ghi nhớ từ vựng SAT. ~60% từ tiếng Anh có gốc Latin/Greek. Biết 30 root + 20 prefix = đoán được nghĩa của **hàng ngàn** từ chưa gặp.

<figure>
<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cấu trúc 1 từ tiếng Anh">
  <rect width="600" height="200" fill="hsl(217 91% 60% / 0.04)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="13">
    <text x="300" y="30" text-anchor="middle" font-weight="700" font-size="15" fill="hsl(220 9% 25%)">Cấu trúc của một từ: trans + port + ation</text>
    <rect x="80" y="60" width="130" height="60" rx="10" fill="hsl(280 70% 60% / 0.2)" stroke="hsl(280 70% 60%)" stroke-width="2"/>
    <text x="145" y="85" text-anchor="middle" font-weight="700" fill="hsl(280 70% 35%)" font-size="18">trans-</text>
    <text x="145" y="105" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">PREFIX (qua)</text>

    <rect x="235" y="60" width="130" height="60" rx="10" fill="hsl(217 91% 60% / 0.2)" stroke="hsl(217 91% 60%)" stroke-width="2"/>
    <text x="300" y="85" text-anchor="middle" font-weight="700" fill="hsl(217 91% 35%)" font-size="18">port</text>
    <text x="300" y="105" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">ROOT (mang)</text>

    <rect x="390" y="60" width="130" height="60" rx="10" fill="hsl(160 84% 39% / 0.2)" stroke="hsl(160 84% 39%)" stroke-width="2"/>
    <text x="455" y="85" text-anchor="middle" font-weight="700" fill="hsl(160 84% 25%)" font-size="18">-ation</text>
    <text x="455" y="105" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">SUFFIX (n.)</text>

    <text x="300" y="155" text-anchor="middle" font-size="13" fill="hsl(220 9% 25%)">→ <tspan font-weight="700" fill="hsl(217 91% 50%)">transportation</tspan> = sự MANG (qua) → vận chuyển</text>
    <text x="300" y="180" text-anchor="middle" font-size="11" fill="hsl(220 9% 50%)" font-style="italic">Phương pháp 'phá từ' để đoán nghĩa</text>
  </g>
</svg>
<figcaption>Phân tích cấu trúc giúp đoán nghĩa từ chưa biết trong 5 giây</figcaption>
</figure>

### 🔤 Tiền tố phổ biến (Top 12)
| Prefix | Nghĩa | Ví dụ |
|--------|--------|-------|
| **anti-** | chống | antisocial, antibiotic |
| **bene-** | tốt | beneficial, benevolent |
| **mal-** | xấu | malfunction, malevolent |
| **mis-** | sai | mislead, misjudge |
| **pre-** | trước | predict, premeditate |
| **re-** | lại | reconsider, retract |
| **trans-** | qua | transport, transcend |
| **circum-** | xung quanh | circumscribe, circumvent |
| **dis-** | không | dislike, disprove |
| **in- / im-** | không | invisible, impossible |
| **sub-** | dưới | submarine, subordinate |
| **super-** | trên | supervise, superficial |

### 🌱 Gốc từ phổ biến (Top 15)
| Root | Nghĩa | Ví dụ |
|------|--------|-------|
| **aud** | nghe | audience, audible |
| **dict** | nói | predict, dictate |
| **graph** | viết | biography, autograph |
| **port** | mang | transport, portable |
| **scrib/script** | viết | describe, manuscript |
| **spec/spect** | nhìn | inspect, spectacle |
| **vid/vis** | thấy | video, evident |
| **bene** | tốt | benefit, beneficiary |
| **mal** | xấu | malice, malign |
| **path** | cảm xúc | sympathy, apathy |
| **chron** | thời gian | chronological, synchronize |
| **bio** | sự sống | biology, biography |
| **geo** | đất | geography, geology |
| **luc** | ánh sáng | elucidate, lucid |
| **anim** | tâm hồn | animated, magnanimous |

### 💡 Áp dụng thực tế: 1 root → 5 từ
Root **"spec/spect"** (nhìn):
1. **Inspect** = nhìn kỹ vào trong
2. **Retrospect** = nhìn lại
3. **Prospect** = nhìn về phía trước
4. **Spectator** = người nhìn → khán giả
5. **Spectrum** = phổ (cái nhìn dải)`,
        theoryEn: `## Roots, Prefixes & Suffixes

This is your **secret weapon** for SAT vocabulary. ~60% of English words have Latin/Greek origins. Knowing 30 roots + 20 prefixes = predicting the meaning of **thousands** of unfamiliar words.

<figure>
<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="English word structure">
  <rect width="600" height="200" fill="hsl(217 91% 60% / 0.04)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="13">
    <text x="300" y="30" text-anchor="middle" font-weight="700" font-size="15" fill="hsl(220 9% 25%)">Word structure: trans + port + ation</text>
    <rect x="80" y="60" width="130" height="60" rx="10" fill="hsl(280 70% 60% / 0.2)" stroke="hsl(280 70% 60%)" stroke-width="2"/>
    <text x="145" y="85" text-anchor="middle" font-weight="700" fill="hsl(280 70% 35%)" font-size="18">trans-</text>
    <text x="145" y="105" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">PREFIX (across)</text>

    <rect x="235" y="60" width="130" height="60" rx="10" fill="hsl(217 91% 60% / 0.2)" stroke="hsl(217 91% 60%)" stroke-width="2"/>
    <text x="300" y="85" text-anchor="middle" font-weight="700" fill="hsl(217 91% 35%)" font-size="18">port</text>
    <text x="300" y="105" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">ROOT (carry)</text>

    <rect x="390" y="60" width="130" height="60" rx="10" fill="hsl(160 84% 39% / 0.2)" stroke="hsl(160 84% 39%)" stroke-width="2"/>
    <text x="455" y="85" text-anchor="middle" font-weight="700" fill="hsl(160 84% 25%)" font-size="18">-ation</text>
    <text x="455" y="105" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">SUFFIX (n.)</text>

    <text x="300" y="155" text-anchor="middle" font-size="13" fill="hsl(220 9% 25%)">→ <tspan font-weight="700" fill="hsl(217 91% 50%)">transportation</tspan> = the act of CARRYING (across) → moving things</text>
    <text x="300" y="180" text-anchor="middle" font-size="11" fill="hsl(220 9% 50%)" font-style="italic">Word-breaking technique = guess meaning in 5 seconds</text>
  </g>
</svg>
<figcaption>Breaking down word structure helps you guess unfamiliar word meanings in 5 seconds</figcaption>
</figure>

### 🔤 Common Prefixes (Top 12)
| Prefix | Meaning | Example |
|--------|---------|---------|
| **anti-** | against | antisocial, antibiotic |
| **bene-** | good | beneficial, benevolent |
| **mal-** | bad | malfunction, malevolent |
| **mis-** | wrong | mislead, misjudge |
| **pre-** | before | predict, premeditate |
| **re-** | again | reconsider, retract |
| **trans-** | across | transport, transcend |
| **circum-** | around | circumscribe, circumvent |
| **dis-** | not | dislike, disprove |
| **in- / im-** | not | invisible, impossible |
| **sub-** | under | submarine, subordinate |
| **super-** | above | supervise, superficial |

### 🌱 Common Roots (Top 15)
| Root | Meaning | Example |
|------|---------|---------|
| **aud** | hear | audience, audible |
| **dict** | say | predict, dictate |
| **graph** | write | biography, autograph |
| **port** | carry | transport, portable |
| **scrib/script** | write | describe, manuscript |
| **spec/spect** | look | inspect, spectacle |
| **vid/vis** | see | video, evident |
| **bene** | good | benefit, beneficiary |
| **mal** | bad | malice, malign |
| **path** | feeling | sympathy, apathy |
| **chron** | time | chronological, synchronize |
| **bio** | life | biology, biography |
| **geo** | earth | geography, geology |
| **luc** | light | elucidate, lucid |
| **anim** | soul/mind | animated, magnanimous |

### 💡 Real Application: 1 root → 5 words
Root **"spec/spect"** (look):
1. **Inspect** = look into closely
2. **Retrospect** = look back
3. **Prospect** = look forward
4. **Spectator** = one who looks → audience member
5. **Spectrum** = a range of "looks" (light)`,
        vocabulary: [
          { word: "benevolent", meaning: "nhân từ (bene = tốt)", example: "The benevolent donor supported many charities.", partOfSpeech: "adjective" },
          { word: "malevolent", meaning: "ác ý (mal = xấu)", example: "The villain's malevolent plan was foiled.", partOfSpeech: "adjective" },
          { word: "circumscribe", meaning: "giới hạn (circum = xung quanh + scrib = viết)", example: "Laws circumscribe individual freedoms for the common good.", partOfSpeech: "verb" },
          { word: "retrospect", meaning: "nhìn lại (retro = quay lại + spec = nhìn)", example: "In retrospect, the decision was unwise.", partOfSpeech: "noun" },
          { word: "preclude", meaning: "ngăn cản trước (pre = trước + clud = đóng)", example: "Lack of funds precluded further research.", partOfSpeech: "verb" },
          { word: "transcend", meaning: "vượt qua (trans = qua + scend = leo)", example: "Great art transcends cultural boundaries.", partOfSpeech: "verb" },
          { word: "antipathy", meaning: "ác cảm (anti = chống + path = cảm xúc)", example: "He felt deep antipathy toward dishonesty.", partOfSpeech: "noun" },
          { word: "ambivalent", meaning: "mâu thuẫn (ambi = cả hai + val = giá trị)", example: "She felt ambivalent about moving abroad.", partOfSpeech: "adjective" },
          { word: "elucidate", meaning: "làm sáng tỏ (e = ra + luc = ánh sáng)", example: "The professor elucidated the complex theory.", partOfSpeech: "verb" },
          { word: "magnanimous", meaning: "rộng lượng (magn = lớn + anim = tâm hồn)", example: "The magnanimous leader forgave his opponents.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Dựa vào gốc từ, điền từ phù hợp:",
            instructionEn: "Based on word roots, fill in the appropriate word:",
            sentences: [
              { text: "The ___ queen was loved by all her people. (bene = tốt)", textEn: "The ___ queen was loved by all her people.", answer: "benevolent", hint: "nhân từ" },
              { text: "In ___, I should have studied harder. (retro = quay lại, spec = nhìn)", textEn: "In ___, I should have studied harder.", answer: "retrospect", hint: "nhìn lại" },
              { text: "Music can ___ language barriers. (trans = qua)", textEn: "Music can ___ language barriers.", answer: "transcend", hint: "vượt qua" },
              { text: "She was ___ about accepting the job offer. (ambi = cả hai)", textEn: "She was ___ about accepting the job offer.", answer: "ambivalent", hint: "mâu thuẫn" },
              { text: "The teacher ___ the difficult concept for students. (luc = ánh sáng)", textEn: "The teacher ___ the difficult concept for students.", answer: "elucidated", hint: "làm sáng tỏ" },
            ],
          },
        ],
        quiz: [
          { question: "What does the prefix 'mal-' mean?", options: ["Good", "Bad", "Many", "Before"], answer: 1, explanation: "'Mal-' means bad or evil. Examples: malfunction, malevolent." },
          { question: "What does the root 'spec' mean?", options: ["Hear", "Write", "Look/See", "Carry"], answer: 2, explanation: "'Spec' means to look or see. Examples: inspect, spectacle, retrospect." },
          { question: "How do 'benevolent' and 'malevolent' differ?", options: ["Prefix: bene (good) vs mal (bad)", "Different suffixes", "Different roots", "Unrelated"], answer: 0, explanation: "Both share the root 'vol' (will) but differ in prefix: bene (good) → kind, mal (bad) → evil." },
          { question: "What does 'preclude' mean?", options: ["Include", "Prevent from happening", "Conclude", "Predict"], answer: 1, explanation: "'Pre-' (before) + 'clud' (close) → to prevent something from happening." },
          { question: "Why is learning word roots important for the SAT?", options: ["To write more beautifully", "To guess meanings of unknown words in passages", "To speak better", "It's not important"], answer: 1, explanation: "Knowing word roots helps you guess meanings of unfamiliar words - an essential SAT Reading skill." },
        ],
      },
    ],
  },
  {
    id: "sat-writing-language",
    title: "SAT Writing & Language",
    titleEn: "SAT Writing & Language",
    icon: "✍️",
    color: "teal",
    description: "Kỹ năng viết và ngôn ngữ cho bài thi SAT",
    descriptionEn: "Writing and language skills for the SAT exam",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-wl-expression-ideas",
        title: "Expression of Ideas",
        titleEn: "Expression of Ideas",
        level: 4,
        difficulty: "advanced",
        theory: `## Diễn đạt Ý tưởng (Expression of Ideas)

Phần Expression of Ideas chiếm **~20%** Reading & Writing. Đề kiểm tra khả năng **xây dựng đoạn văn hiệu quả** - chọn câu/cụm từ giúp đoạn văn LOGIC, MẠCH LẠC và SÚC TÍCH hơn.

<figure>
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3 nhánh Expression of Ideas">
  <rect width="600" height="240" fill="hsl(180 60% 50% / 0.05)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="13">
    <circle cx="300" cy="55" r="35" fill="hsl(180 60% 50%)"/>
    <text x="300" y="60" text-anchor="middle" fill="white" font-weight="700">Goals</text>

    <line x1="300" y1="90" x2="120" y2="140" stroke="hsl(180 60% 50%)" stroke-width="2"/>
    <line x1="300" y1="90" x2="300" y2="140" stroke="hsl(180 60% 50%)" stroke-width="2"/>
    <line x1="300" y1="90" x2="480" y2="140" stroke="hsl(180 60% 50%)" stroke-width="2"/>

    <rect x="30" y="140" width="180" height="80" rx="10" fill="white" stroke="hsl(217 91% 60%)" stroke-width="2"/>
    <text x="120" y="165" text-anchor="middle" font-weight="700" fill="hsl(217 91% 35%)">Development</text>
    <text x="120" y="185" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">Thêm câu hỗ trợ</text>
    <text x="120" y="200" text-anchor="middle" fill="hsl(220 9% 50%)" font-size="11">"Add a sentence that..."</text>

    <rect x="210" y="140" width="180" height="80" rx="10" fill="white" stroke="hsl(160 84% 39%)" stroke-width="2"/>
    <text x="300" y="165" text-anchor="middle" font-weight="700" fill="hsl(160 84% 25%)">Organization</text>
    <text x="300" y="185" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">Sắp xếp logic</text>
    <text x="300" y="200" text-anchor="middle" fill="hsl(220 9% 50%)" font-size="11">"Where should..."</text>

    <rect x="390" y="140" width="180" height="80" rx="10" fill="white" stroke="hsl(280 70% 60%)" stroke-width="2"/>
    <text x="480" y="165" text-anchor="middle" font-weight="700" fill="hsl(280 70% 40%)">Effective Use</text>
    <text x="480" y="185" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">Súc tích, chính xác</text>
    <text x="480" y="200" text-anchor="middle" fill="hsl(220 9% 50%)" font-size="11">"Most concise..."</text>
  </g>
</svg>
<figcaption>3 mục tiêu chính của Expression of Ideas trên Digital SAT</figcaption>
</figure>

### 🎯 Quy tắc vàng: "BRIDGE TEST"
Câu được thêm vào phải tạo **cây cầu logic** giữa câu trước và câu sau.

> Câu trước: *"Many cities are facing housing shortages."*
> [BLANK]
> Câu sau: *"As a result, rent prices in urban areas have risen sharply."*

✅ Đáp án đúng: *"This shortage drives demand higher than supply can match."* (cầu nối nguyên nhân → kết quả)
❌ Đáp án sai: *"Cities also face traffic problems."* (lạc đề, không tạo cầu)

### 📏 Nguyên tắc CONCISENESS
SAT **luôn luôn** ưu tiên đáp án **NGẮN NHẤT** mà vẫn đủ ý.

| ❌ Wordy | ✅ Concise |
|----------|------------|
| due to the fact that | because |
| in spite of the fact that | although |
| at this point in time | now |
| in the event that | if |
| has the ability to | can |

### 🔄 Câu hỏi điển hình
1. **"Which choice most logically completes the text?"** → Bridge test
2. **"Which choice most effectively uses the data from the table?"** → Quantitative
3. **"Which choice best emphasizes/contrasts/synthesizes...?"** → Đọc kỹ purpose
4. **"Which choice most logically transitions...?"** → Transitions (xem bài Transitions)`,
        theoryEn: `## Expression of Ideas

Expression of Ideas is ~20% of Reading & Writing. It tests your ability to **build effective paragraphs** - choosing the sentence/phrase that makes the paragraph more LOGICAL, COHERENT, and CONCISE.

<figure>
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3 branches of Expression of Ideas">
  <rect width="600" height="240" fill="hsl(180 60% 50% / 0.05)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="13">
    <circle cx="300" cy="55" r="35" fill="hsl(180 60% 50%)"/>
    <text x="300" y="60" text-anchor="middle" fill="white" font-weight="700">Goals</text>
    <line x1="300" y1="90" x2="120" y2="140" stroke="hsl(180 60% 50%)" stroke-width="2"/>
    <line x1="300" y1="90" x2="300" y2="140" stroke="hsl(180 60% 50%)" stroke-width="2"/>
    <line x1="300" y1="90" x2="480" y2="140" stroke="hsl(180 60% 50%)" stroke-width="2"/>
    <rect x="30" y="140" width="180" height="80" rx="10" fill="white" stroke="hsl(217 91% 60%)" stroke-width="2"/>
    <text x="120" y="165" text-anchor="middle" font-weight="700" fill="hsl(217 91% 35%)">Development</text>
    <text x="120" y="185" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">Add support</text>
    <text x="120" y="200" text-anchor="middle" fill="hsl(220 9% 50%)" font-size="11">"Add a sentence that..."</text>
    <rect x="210" y="140" width="180" height="80" rx="10" fill="white" stroke="hsl(160 84% 39%)" stroke-width="2"/>
    <text x="300" y="165" text-anchor="middle" font-weight="700" fill="hsl(160 84% 25%)">Organization</text>
    <text x="300" y="185" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">Logical order</text>
    <text x="300" y="200" text-anchor="middle" fill="hsl(220 9% 50%)" font-size="11">"Where should..."</text>
    <rect x="390" y="140" width="180" height="80" rx="10" fill="white" stroke="hsl(280 70% 60%)" stroke-width="2"/>
    <text x="480" y="165" text-anchor="middle" font-weight="700" fill="hsl(280 70% 40%)">Effective Use</text>
    <text x="480" y="185" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">Concise & precise</text>
    <text x="480" y="200" text-anchor="middle" fill="hsl(220 9% 50%)" font-size="11">"Most concise..."</text>
  </g>
</svg>
<figcaption>3 main goals of Expression of Ideas on the Digital SAT</figcaption>
</figure>

### 🎯 Golden Rule: "BRIDGE TEST"
The sentence to be added must build a **logical bridge** between the preceding and following sentences.

> Before: *"Many cities are facing housing shortages."*
> [BLANK]
> After: *"As a result, rent prices in urban areas have risen sharply."*

✅ Correct: *"This shortage drives demand higher than supply can match."* (bridges cause → effect)
❌ Wrong: *"Cities also face traffic problems."* (off-topic, no bridge)

### 📏 The CONCISENESS Principle
The SAT **always** prefers the **SHORTEST** option that fully expresses the idea.

| ❌ Wordy | ✅ Concise |
|----------|------------|
| due to the fact that | because |
| in spite of the fact that | although |
| at this point in time | now |
| in the event that | if |
| has the ability to | can |

### 🔄 Typical Question Types
1. **"Which choice most logically completes the text?"** → Bridge test
2. **"Which choice most effectively uses the data from the table?"** → Quantitative
3. **"Which choice best emphasizes/contrasts/synthesizes...?"** → Read the purpose carefully
4. **"Which choice most logically transitions...?"** → Transitions (see Transitions lesson)`,
        proTips: [
          "Đọc cả đoạn văn trước khi trả lời - hiểu big picture",
          "Câu thêm vào phải liên kết với câu trước VÀ câu sau",
          "Chọn đáp án ngắn gọn nhất mà vẫn đủ nghĩa - SAT ưu tiên conciseness",
          "Loại ngay đáp án có \"due to the fact that\", \"in spite of\" - luôn có cách viết ngắn hơn",
          "Câu hỏi 'most logically' = áp dụng Bridge Test (cây cầu giữa câu trước và sau)",
        ],
        proTipsEn: [
          "Read the full paragraph before answering - understand the big picture",
          "Added sentences must connect to BOTH the preceding and following sentences",
          "Choose the most concise option that conveys full meaning - SAT values conciseness",
          "Immediately reject options with \"due to the fact that\" or \"in spite of\" - there's always a shorter version",
          "'Most logically' = apply the Bridge Test (bridge between before and after)",
        ],
        vocabulary: [
          { word: "cohesion", meaning: "sự liên kết", example: "Good writing has strong cohesion between paragraphs.", partOfSpeech: "noun" },
          { word: "coherence", meaning: "sự mạch lạc", example: "The essay lacked coherence and was difficult to follow.", partOfSpeech: "noun" },
          { word: "transition", meaning: "sự chuyển tiếp", example: "Use transitions to connect your ideas smoothly.", partOfSpeech: "noun" },
          { word: "elaborate", meaning: "giải thích chi tiết", example: "Could you elaborate on your main argument?", partOfSpeech: "verb" },
          { word: "succinct", meaning: "ngắn gọn, súc tích", example: "Her presentation was succinct yet informative.", partOfSpeech: "adjective" },
          { word: "verbose", meaning: "dài dòng", example: "Avoid verbose writing; be concise instead.", partOfSpeech: "adjective" },
          { word: "synthesize", meaning: "tổng hợp", example: "The essay synthesizes ideas from multiple sources.", partOfSpeech: "verb" },
          { word: "articulate", meaning: "diễn đạt rõ ràng", example: "She articulated her position clearly.", partOfSpeech: "verb" },
          { word: "judiciously", meaning: "khôn ngoan, thận trọng", example: "Use evidence judiciously to support your claims.", partOfSpeech: "adverb" },
          { word: "pertinent", meaning: "thích hợp, liên quan", example: "Only include pertinent information in your essay.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blanks:",
            sentences: [
              { text: "The essay needs better ___ between paragraphs.", textEn: "The essay needs better ___ between paragraphs.", answer: "transitions", hint: "chuyển tiếp" },
              { text: "Your answer is too ___; please be more concise.", textEn: "Your answer is too ___; please be more concise.", answer: "verbose", hint: "dài dòng" },
              { text: "She ___ her argument with clear examples.", textEn: "She ___ her argument with clear examples.", answer: "articulated", hint: "diễn đạt rõ" },
              { text: "Only include ___ details in your response.", textEn: "Only include ___ details in your response.", answer: "pertinent", hint: "thích hợp" },
              { text: "The conclusion should ___ all the key points.", textEn: "The conclusion should ___ all the key points.", answer: "synthesize", hint: "tổng hợp" },
            ],
          },
        ],
        quiz: [
          { question: "What type of writing does the SAT favor?", options: ["Verbose and complex", "Concise yet complete in meaning", "Using many difficult words", "The longer the sentence, the better"], answer: 1, explanation: "The SAT always favors conciseness - expressing ideas fully with the fewest words possible." },
          { question: "How do 'cohesion' and 'coherence' differ?", options: ["They mean the same thing", "Cohesion = sentence/paragraph links; Coherence = overall logical flow", "Coherence = correct grammar", "No difference"], answer: 1, explanation: "Cohesion is the linking between sentences/paragraphs (micro); coherence is overall logical flow (macro)." },
          { question: "Which word is the opposite of 'verbose'?", options: ["Eloquent", "Succinct", "Elaborate", "Articulate"], answer: 1, explanation: "'Verbose' (wordy) is the opposite of 'succinct' (brief and clear)." },
          { question: "When adding a sentence to a paragraph, what should you check?", options: ["Whether the sentence is long", "Whether it connects to both the preceding AND following sentences", "Whether it has difficult words", "Whether it contains examples"], answer: 1, explanation: "An added sentence must create a logical bridge between the sentence before and after it." },
          { question: "What does 'pertinent' mean?", options: ["Unimportant", "Relevant and directly applicable", "Complex", "Easy to understand"], answer: 1, explanation: "'Pertinent' means directly relevant or applicable to the matter at hand." },
        ],
      },
      {
        id: "sat-wl-rhetorical-synthesis",
        title: "Rhetorical Synthesis",
        titleEn: "Rhetorical Synthesis",
        level: 4,
        difficulty: "advanced",
        theory: `## Tổng hợp Tu từ (Rhetorical Synthesis)

Đây là dạng câu hỏi **mới** và **đặc trưng** của Digital SAT - chiếm khoảng **6-8 câu** mỗi đề. Đề cho **4-6 ghi chú (notes)** về một chủ đề và yêu cầu chọn câu **tổng hợp** thông tin theo một **mục đích cụ thể**.

<figure>
<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quy trình Rhetorical Synthesis">
  <rect width="600" height="280" fill="hsl(45 90% 55% / 0.05)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="12">
    <text x="300" y="28" text-anchor="middle" font-weight="700" font-size="14" fill="hsl(220 9% 25%)">3 Bước "Purpose-First" Strategy</text>
    <rect x="30" y="50" width="540" height="60" rx="10" fill="white" stroke="hsl(45 90% 55%)" stroke-width="2"/>
    <text x="60" y="78" font-weight="700" fill="hsl(45 90% 35%)" font-size="14">STEP 1</text>
    <text x="60" y="98" fill="hsl(220 9% 25%)">Đọc PURPOSE / GOAL trước (in nghiêng dưới notes)</text>
    <text x="450" y="88" font-size="11" fill="hsl(220 9% 50%)" font-style="italic">"emphasize", "compare", "introduce"</text>

    <rect x="30" y="125" width="540" height="60" rx="10" fill="white" stroke="hsl(217 91% 60%)" stroke-width="2"/>
    <text x="60" y="153" font-weight="700" fill="hsl(217 91% 40%)" font-size="14">STEP 2</text>
    <text x="60" y="173" fill="hsl(220 9% 25%)">Scan notes, gạch chân ý LIÊN QUAN đến purpose</text>
    <text x="450" y="163" font-size="11" fill="hsl(220 9% 50%)" font-style="italic">Bỏ qua note không cần thiết</text>

    <rect x="30" y="200" width="540" height="60" rx="10" fill="white" stroke="hsl(160 84% 39%)" stroke-width="2"/>
    <text x="60" y="228" font-weight="700" fill="hsl(160 84% 25%)" font-size="14">STEP 3</text>
    <text x="60" y="248" fill="hsl(220 9% 25%)">Loại đáp án: thiếu thông tin / sai sự thật / sai purpose</text>
    <text x="450" y="238" font-size="11" fill="hsl(220 9% 50%)" font-style="italic">Chỉ 1 đáp án thoả CẢ 3</text>
  </g>
</svg>
<figcaption>Quy trình "Purpose-First" giúp tăng tốc độ làm bài 30-50%</figcaption>
</figure>

### 📋 Ví dụ thực chiến

> **Notes**:
> - Marie Curie was born in 1867 in Warsaw, Poland.
> - She discovered the elements polonium and radium.
> - She was the first woman to win a Nobel Prize.
> - She won Nobel Prizes in both Physics (1903) and Chemistry (1911).
>
> **Goal**: *Emphasize Marie Curie's groundbreaking achievements in science.*

❌ A. *"Marie Curie was born in 1867 in Warsaw."* - không emphasize achievements
❌ B. *"Marie Curie discovered polonium and radium."* - chỉ 1 thành tựu, chưa đủ "groundbreaking"
✅ C. *"Marie Curie not only discovered polonium and radium but also became the first person to win Nobel Prizes in two different sciences."* - TỔNG HỢP nhiều thành tựu + nhấn mạnh tính tiên phong
❌ D. *"Marie Curie's birthplace was Warsaw, Poland."* - sai purpose hoàn toàn

### 🚫 4 loại bẫy phổ biến
1. **Sai sự thật** (factual error) - đáp án viết khác note
2. **Thiếu purpose** - đúng nhưng không emphasize/compare như đề yêu cầu
3. **Quá chi tiết** - đáp án chỉ trích 1 fact nhỏ
4. **Quá chung chung** - đáp án bay xa, không có data từ notes`,
        theoryEn: `## Rhetorical Synthesis

This is a **new** and **signature** Digital SAT question type - about **6-8 questions** per test. You're given **4-6 notes** about a topic and must choose the sentence that **synthesizes** the information for a **specific purpose**.

<figure>
<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rhetorical Synthesis workflow">
  <rect width="600" height="280" fill="hsl(45 90% 55% / 0.05)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="12">
    <text x="300" y="28" text-anchor="middle" font-weight="700" font-size="14" fill="hsl(220 9% 25%)">3-Step "Purpose-First" Strategy</text>
    <rect x="30" y="50" width="540" height="60" rx="10" fill="white" stroke="hsl(45 90% 55%)" stroke-width="2"/>
    <text x="60" y="78" font-weight="700" fill="hsl(45 90% 35%)" font-size="14">STEP 1</text>
    <text x="60" y="98" fill="hsl(220 9% 25%)">Read the PURPOSE / GOAL first (italicized below notes)</text>
    <text x="450" y="88" font-size="11" fill="hsl(220 9% 50%)" font-style="italic">"emphasize", "compare", "introduce"</text>
    <rect x="30" y="125" width="540" height="60" rx="10" fill="white" stroke="hsl(217 91% 60%)" stroke-width="2"/>
    <text x="60" y="153" font-weight="700" fill="hsl(217 91% 40%)" font-size="14">STEP 2</text>
    <text x="60" y="173" fill="hsl(220 9% 25%)">Scan notes, underline ideas RELATED to the purpose</text>
    <text x="450" y="163" font-size="11" fill="hsl(220 9% 50%)" font-style="italic">Skip irrelevant notes</text>
    <rect x="30" y="200" width="540" height="60" rx="10" fill="white" stroke="hsl(160 84% 39%)" stroke-width="2"/>
    <text x="60" y="228" font-weight="700" fill="hsl(160 84% 25%)" font-size="14">STEP 3</text>
    <text x="60" y="248" fill="hsl(220 9% 25%)">Eliminate: missing info / factually wrong / wrong purpose</text>
    <text x="450" y="238" font-size="11" fill="hsl(220 9% 50%)" font-style="italic">Only 1 option satisfies ALL 3</text>
  </g>
</svg>
<figcaption>The "Purpose-First" workflow boosts working speed by 30-50%</figcaption>
</figure>

### 📋 Real Example

> **Notes**:
> - Marie Curie was born in 1867 in Warsaw, Poland.
> - She discovered the elements polonium and radium.
> - She was the first woman to win a Nobel Prize.
> - She won Nobel Prizes in both Physics (1903) and Chemistry (1911).
>
> **Goal**: *Emphasize Marie Curie's groundbreaking achievements in science.*

❌ A. *"Marie Curie was born in 1867 in Warsaw."* - doesn't emphasize achievements
❌ B. *"Marie Curie discovered polonium and radium."* - only one achievement, not "groundbreaking" enough
✅ C. *"Marie Curie not only discovered polonium and radium but also became the first person to win Nobel Prizes in two different sciences."* - SYNTHESIZES multiple achievements + highlights pioneering nature
❌ D. *"Marie Curie's birthplace was Warsaw, Poland."* - completely wrong purpose

### 🚫 4 Common Trap Types
1. **Factual error** - answer contradicts the notes
2. **Missing purpose** - correct but doesn't emphasize/compare as required
3. **Too narrow** - answer cites just one minor fact
4. **Too vague** - answer drifts away, no data from notes`,
        vocabulary: [
          { word: "rhetorical", meaning: "tu từ, liên quan đến nghệ thuật diễn đạt", example: "The rhetorical question was meant to provoke thought.", partOfSpeech: "adjective" },
          { word: "synthesis", meaning: "sự tổng hợp", example: "The paper is a synthesis of several research studies.", partOfSpeech: "noun" },
          { word: "emphasize", meaning: "nhấn mạnh", example: "The report emphasizes the need for immediate action.", partOfSpeech: "verb" },
          { word: "contrast", meaning: "tương phản", example: "The essay contrasts urban and rural lifestyles.", partOfSpeech: "verb" },
          { word: "convey", meaning: "truyền đạt", example: "The graph conveys the declining trend clearly.", partOfSpeech: "verb" },
          { word: "premise", meaning: "tiền đề", example: "The argument is based on a false premise.", partOfSpeech: "noun" },
          { word: "concession", meaning: "sự nhượng bộ", example: "The author makes a concession before presenting the main argument.", partOfSpeech: "noun" },
          { word: "rebut", meaning: "phản bác", example: "She rebutted every point in the opposing argument.", partOfSpeech: "verb" },
          { word: "substantive", meaning: "có thực chất, quan trọng", example: "We need substantive changes, not superficial ones.", partOfSpeech: "adjective" },
          { word: "pivotal", meaning: "then chốt, quan trọng", example: "This was a pivotal moment in the debate.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blanks:",
            sentences: [
              { text: "The essay is a ___ of ideas from three different authors.", textEn: "The essay is a ___ of ideas from three different authors.", answer: "synthesis", hint: "tổng hợp" },
              { text: "The speaker wanted to ___ the importance of education.", textEn: "The speaker wanted to ___ the importance of education.", answer: "emphasize", hint: "nhấn mạnh" },
              { text: "Her argument was based on a flawed ___.", textEn: "Her argument was based on a flawed ___.", answer: "premise", hint: "tiền đề" },
              { text: "This decision was ___ in shaping the company's future.", textEn: "This decision was ___ in shaping the company's future.", answer: "pivotal", hint: "then chốt" },
              { text: "Charts and graphs help ___ complex data visually.", textEn: "Charts and graphs help ___ complex data visually.", answer: "convey", hint: "truyền đạt" },
            ],
          },
        ],
        quiz: [
          { question: "What type of question is Rhetorical Synthesis?", options: ["Essay writing", "Combining information from notes to meet a specific purpose", "Grammar analysis", "Translation"], answer: 1, explanation: "Rhetorical Synthesis requires combining information from given notes to fulfill a specific communicative purpose." },
          { question: "What does 'premise' mean?", options: ["Conclusion", "A foundational assumption", "Evidence", "Rebuttal"], answer: 1, explanation: "'Premise' is a foundational assumption on which an argument is based." },
          { question: "What is the first step when tackling Rhetorical Synthesis?", options: ["Read the answer choices first", "Carefully read the purpose/prompt", "Guess the answer", "Skip the notes"], answer: 1, explanation: "Understanding the purpose helps you know which information to synthesize and how." },
          { question: "Which word is closest in meaning to 'pivotal'?", options: ["Minor", "Crucial", "Optional", "Ordinary"], answer: 1, explanation: "'Pivotal' (extremely important) is closest in meaning to 'crucial'." },
          { question: "What is a 'concession' in argumentation?", options: ["Full agreement", "Acknowledging a point before countering", "Rejecting everything", "Final conclusion"], answer: 1, explanation: "A concession is acknowledging an opponent's point before presenting your main argument." },
        ],
      },
      {
        id: "sat-wl-transitions",
        title: "Transitions & Flow",
        titleEn: "Transitions & Flow",
        level: 3,
        difficulty: "intermediate",
        theory: `## Từ nối & Mạch văn (Transitions & Flow)

Transitions chiếm khoảng **5-7 câu** mỗi đề SAT - và là dạng câu **dễ ghi điểm nhất** nếu bạn nhớ bảng phân loại bên dưới.

<figure>
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Phân loại transitions theo mối quan hệ">
  <rect width="600" height="320" fill="hsl(217 91% 60% / 0.04)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="12">
    <text x="300" y="28" text-anchor="middle" font-weight="700" font-size="14" fill="hsl(220 9% 25%)">6 Mối quan hệ Logic của Transitions</text>

    <g transform="translate(30, 55)">
      <rect width="170" height="80" rx="10" fill="hsl(160 84% 39% / 0.15)" stroke="hsl(160 84% 39%)" stroke-width="2"/>
      <text x="85" y="22" text-anchor="middle" font-weight="700" fill="hsl(160 84% 25%)">➕ Addition</text>
      <text x="85" y="42" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">moreover</text>
      <text x="85" y="58" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">furthermore</text>
      <text x="85" y="74" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">in addition</text>
    </g>
    <g transform="translate(215, 55)">
      <rect width="170" height="80" rx="10" fill="hsl(0 80% 60% / 0.15)" stroke="hsl(0 80% 60%)" stroke-width="2"/>
      <text x="85" y="22" text-anchor="middle" font-weight="700" fill="hsl(0 80% 35%)">⇄ Contrast</text>
      <text x="85" y="42" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">however</text>
      <text x="85" y="58" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">nevertheless</text>
      <text x="85" y="74" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">on the other hand</text>
    </g>
    <g transform="translate(400, 55)">
      <rect width="170" height="80" rx="10" fill="hsl(280 70% 60% / 0.15)" stroke="hsl(280 70% 60%)" stroke-width="2"/>
      <text x="85" y="22" text-anchor="middle" font-weight="700" fill="hsl(280 70% 40%)">⚡ Cause/Effect</text>
      <text x="85" y="42" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">therefore</text>
      <text x="85" y="58" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">consequently</text>
      <text x="85" y="74" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">as a result</text>
    </g>
    <g transform="translate(30, 150)">
      <rect width="170" height="80" rx="10" fill="hsl(45 90% 55% / 0.15)" stroke="hsl(45 90% 55%)" stroke-width="2"/>
      <text x="85" y="22" text-anchor="middle" font-weight="700" fill="hsl(45 90% 35%)">💡 Example</text>
      <text x="85" y="42" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">for instance</text>
      <text x="85" y="58" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">specifically</text>
      <text x="85" y="74" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">in particular</text>
    </g>
    <g transform="translate(215, 150)">
      <rect width="170" height="80" rx="10" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)" stroke-width="2"/>
      <text x="85" y="22" text-anchor="middle" font-weight="700" fill="hsl(217 91% 35%)">🏁 Conclusion</text>
      <text x="85" y="42" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">ultimately</text>
      <text x="85" y="58" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">in conclusion</text>
      <text x="85" y="74" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">to sum up</text>
    </g>
    <g transform="translate(400, 150)">
      <rect width="170" height="80" rx="10" fill="hsl(180 60% 50% / 0.15)" stroke="hsl(180 60% 50%)" stroke-width="2"/>
      <text x="85" y="22" text-anchor="middle" font-weight="700" fill="hsl(180 60% 30%)">⏱️ Sequence</text>
      <text x="85" y="42" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">subsequently</text>
      <text x="85" y="58" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">meanwhile</text>
      <text x="85" y="74" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">previously</text>
    </g>

    <text x="300" y="270" text-anchor="middle" font-weight="700" fill="hsl(220 9% 25%)">⚠️ Quy tắc 2-câu: ĐỌC câu trước &amp; sau, XÁC ĐỊNH mối quan hệ</text>
    <text x="300" y="290" text-anchor="middle" font-size="11" fill="hsl(220 9% 50%)" font-style="italic">→ Chọn transition đúng nhóm. Đừng bao giờ chọn dựa vào "nghe hay"</text>
  </g>
</svg>
<figcaption>Bản đồ 6 nhóm transitions - học thuộc 18 từ này = trả lời được mọi câu transition</figcaption>
</figure>

### 🎯 Quy trình 3 bước
1. Đọc câu **TRƯỚC** chỗ trống - nắm ý
2. Đọc câu **SAU** chỗ trống - nắm ý
3. Hỏi: "Mối quan hệ giữa 2 câu là gì?" → Chọn nhóm transition phù hợp

### 📝 Ví dụ phân tích
> *"Solar panels are expensive to install. ___, they save significant money over their 20-year lifespan."*

- Câu 1: tiêu cực (expensive)
- Câu 2: tích cực (save money)
- Mối quan hệ: **CONTRAST** → "However" / "Nevertheless"

> *"The team trained for six months. ___, they easily won the championship."*

- Câu 1: nguyên nhân (chuẩn bị kỹ)
- Câu 2: kết quả (chiến thắng)
- Mối quan hệ: **CAUSE/EFFECT** → "Consequently" / "As a result"

### ⚠️ Lưu ý khi gặp đáp án "tricky"
- "Likewise" và "similarly" → CHỈ dùng khi 2 ý GIỐNG NHAU
- "Conversely" → đảo ngược hoàn toàn (mạnh hơn "however")
- "Indeed" / "in fact" → KHẲNG ĐỊNH lại + làm sâu hơn (không phải contrast)`,
        theoryEn: `## Transitions & Flow

Transitions account for **5-7 questions** per SAT test - and they're the **easiest points** to grab if you memorize the table below.

<figure>
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Transition categories by relationship">
  <rect width="600" height="320" fill="hsl(217 91% 60% / 0.04)" rx="12"/>
  <g font-family="ui-sans-serif, system-ui" font-size="12">
    <text x="300" y="28" text-anchor="middle" font-weight="700" font-size="14" fill="hsl(220 9% 25%)">6 Logical Relationships of Transitions</text>
    <g transform="translate(30, 55)">
      <rect width="170" height="80" rx="10" fill="hsl(160 84% 39% / 0.15)" stroke="hsl(160 84% 39%)" stroke-width="2"/>
      <text x="85" y="22" text-anchor="middle" font-weight="700" fill="hsl(160 84% 25%)">➕ Addition</text>
      <text x="85" y="42" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">moreover</text>
      <text x="85" y="58" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">furthermore</text>
      <text x="85" y="74" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">in addition</text>
    </g>
    <g transform="translate(215, 55)">
      <rect width="170" height="80" rx="10" fill="hsl(0 80% 60% / 0.15)" stroke="hsl(0 80% 60%)" stroke-width="2"/>
      <text x="85" y="22" text-anchor="middle" font-weight="700" fill="hsl(0 80% 35%)">⇄ Contrast</text>
      <text x="85" y="42" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">however</text>
      <text x="85" y="58" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">nevertheless</text>
      <text x="85" y="74" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">on the other hand</text>
    </g>
    <g transform="translate(400, 55)">
      <rect width="170" height="80" rx="10" fill="hsl(280 70% 60% / 0.15)" stroke="hsl(280 70% 60%)" stroke-width="2"/>
      <text x="85" y="22" text-anchor="middle" font-weight="700" fill="hsl(280 70% 40%)">⚡ Cause/Effect</text>
      <text x="85" y="42" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">therefore</text>
      <text x="85" y="58" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">consequently</text>
      <text x="85" y="74" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">as a result</text>
    </g>
    <g transform="translate(30, 150)">
      <rect width="170" height="80" rx="10" fill="hsl(45 90% 55% / 0.15)" stroke="hsl(45 90% 55%)" stroke-width="2"/>
      <text x="85" y="22" text-anchor="middle" font-weight="700" fill="hsl(45 90% 35%)">💡 Example</text>
      <text x="85" y="42" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">for instance</text>
      <text x="85" y="58" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">specifically</text>
      <text x="85" y="74" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">in particular</text>
    </g>
    <g transform="translate(215, 150)">
      <rect width="170" height="80" rx="10" fill="hsl(217 91% 60% / 0.15)" stroke="hsl(217 91% 60%)" stroke-width="2"/>
      <text x="85" y="22" text-anchor="middle" font-weight="700" fill="hsl(217 91% 35%)">🏁 Conclusion</text>
      <text x="85" y="42" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">ultimately</text>
      <text x="85" y="58" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">in conclusion</text>
      <text x="85" y="74" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">to sum up</text>
    </g>
    <g transform="translate(400, 150)">
      <rect width="170" height="80" rx="10" fill="hsl(180 60% 50% / 0.15)" stroke="hsl(180 60% 50%)" stroke-width="2"/>
      <text x="85" y="22" text-anchor="middle" font-weight="700" fill="hsl(180 60% 30%)">⏱️ Sequence</text>
      <text x="85" y="42" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">subsequently</text>
      <text x="85" y="58" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">meanwhile</text>
      <text x="85" y="74" text-anchor="middle" fill="hsl(220 9% 30%)" font-size="11">previously</text>
    </g>
    <text x="300" y="270" text-anchor="middle" font-weight="700" fill="hsl(220 9% 25%)">⚠️ The 2-Sentence Rule: READ before &amp; after, IDENTIFY the relationship</text>
    <text x="300" y="290" text-anchor="middle" font-size="11" fill="hsl(220 9% 50%)" font-style="italic">→ Pick the right group. Never pick based on what "sounds nice"</text>
  </g>
</svg>
<figcaption>Map of 6 transition groups - memorize these 18 words to nail every transition question</figcaption>
</figure>

### 🎯 The 3-Step Process
1. Read the **BEFORE** sentence - get the idea
2. Read the **AFTER** sentence - get the idea
3. Ask: "What's the relationship?" → Pick the matching transition group

### 📝 Worked Examples
> *"Solar panels are expensive to install. ___, they save significant money over their 20-year lifespan."*

- Sentence 1: negative (expensive)
- Sentence 2: positive (save money)
- Relationship: **CONTRAST** → "However" / "Nevertheless"

> *"The team trained for six months. ___, they easily won the championship."*

- Sentence 1: cause (well-prepared)
- Sentence 2: effect (won)
- Relationship: **CAUSE/EFFECT** → "Consequently" / "As a result"

### ⚠️ Tricky Options to Watch
- "Likewise" / "similarly" → ONLY when two ideas are SIMILAR
- "Conversely" → completely opposite (stronger than "however")
- "Indeed" / "in fact" → REINFORCES + deepens (not a contrast)`,
        vocabulary: [
          { word: "moreover", meaning: "hơn nữa", example: "The plan is effective; moreover, it is cost-efficient.", partOfSpeech: "adverb" },
          { word: "nevertheless", meaning: "tuy nhiên, dù vậy", example: "The experiment failed; nevertheless, it provided valuable data.", partOfSpeech: "adverb" },
          { word: "consequently", meaning: "do đó, kết quả là", example: "He didn't study; consequently, he failed the exam.", partOfSpeech: "adverb" },
          { word: "conversely", meaning: "ngược lại", example: "In summer, days are long; conversely, in winter, they are short.", partOfSpeech: "adverb" },
          { word: "notwithstanding", meaning: "bất chấp, mặc dù", example: "Notwithstanding the challenges, the team succeeded.", partOfSpeech: "adverb" },
          { word: "subsequently", meaning: "sau đó", example: "She graduated in 2020 and subsequently joined a tech company.", partOfSpeech: "adverb" },
          { word: "likewise", meaning: "tương tự", example: "The first study showed positive results; likewise, the second confirmed them.", partOfSpeech: "adverb" },
          { word: "in light of", meaning: "dựa trên, xét đến", example: "In light of new evidence, the theory was revised.", partOfSpeech: "phrase" },
          { word: "albeit", meaning: "mặc dù", example: "The progress was slow, albeit steady.", partOfSpeech: "conjunction" },
          { word: "accordingly", meaning: "theo đó, phù hợp", example: "The budget was cut; accordingly, the project scope was reduced.", partOfSpeech: "adverb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn từ nối phù hợp:",
            instructionEn: "Choose the appropriate transition:",
            sentences: [
              { text: "The research was inconclusive; ___, more studies are needed.", textEn: "The research was inconclusive; ___, more studies are needed.", answer: "consequently", hint: "do đó" },
              { text: "The economy grew rapidly; ___, poverty rates decreased.", textEn: "The economy grew rapidly; ___, poverty rates decreased.", answer: "accordingly", hint: "theo đó" },
              { text: "Sales dropped in Q1; ___, they recovered strongly in Q2.", textEn: "Sales dropped in Q1; ___, they recovered strongly in Q2.", answer: "nevertheless", hint: "tuy nhiên" },
              { text: "The plan is affordable; ___, it can be implemented quickly.", textEn: "The plan is affordable; ___, it can be implemented quickly.", answer: "moreover", hint: "hơn nữa" },
              { text: "She resigned in June and ___ moved to another city.", textEn: "She resigned in June and ___ moved to another city.", answer: "subsequently", hint: "sau đó" },
            ],
          },
        ],
        quiz: [
          { question: "Which transition word is used to add information?", options: ["However", "Nevertheless", "Moreover", "Consequently"], answer: 2, explanation: "'Moreover' is used to add supplementary information to the previous point." },
          { question: "When two sentences have a contrasting relationship, which word should you use?", options: ["Furthermore", "Therefore", "However", "Similarly"], answer: 2, explanation: "'However' is used when the following idea contrasts or surprises compared to the previous one." },
          { question: "What relationship does 'consequently' express?", options: ["Addition", "Contrast", "Cause and effect", "Example"], answer: 2, explanation: "'Consequently' expresses a cause-and-effect relationship." },
          { question: "Which word is closest in meaning to 'albeit'?", options: ["Therefore", "Although", "Moreover", "Instead"], answer: 1, explanation: "'Albeit' means 'although', typically used before adjectives or adverbs." },
          { question: "What is the first step when choosing a transition?", options: ["Read the answer choices first", "Identify the logical relationship between the two ideas", "Choose the longest word", "Pick the most familiar word"], answer: 1, explanation: "You must understand the logical relationship between the preceding and following sentences to choose the right transition." },
        ],
      },
    ],
  },
];

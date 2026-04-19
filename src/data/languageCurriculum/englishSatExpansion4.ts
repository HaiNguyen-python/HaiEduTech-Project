// SAT Expansion 4 — Algebra, Advanced Math, Transitions, Rhetorical Synthesis
import type { LanguageModule } from "./types";

export const satExpansionModules4: LanguageModule[] = [
  {
    id: "sat-algebra-vocab",
    title: "SAT Đại số: Từ vựng & Khái niệm",
    titleEn: "SAT Algebra Vocabulary & Concepts",
    icon: "🧮",
    color: "from-indigo-500 to-blue-600",
    description: "Biến số, phương trình tuyến tính, hệ phương trình, bất phương trình.",
    descriptionEn: "Variables, linear equations, systems, and inequalities.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-algebra-core",
        title: "Đại số cốt lõi cho Digital SAT",
        titleEn: "Core Algebra for the Digital SAT",
        level: 4,
        difficulty: "intermediate",
        theory: "Đại số chiếm khoảng 35% phần Math của Digital SAT. Bạn cần đọc nhanh đề bằng tiếng Anh, dịch sang phương trình, rồi giải. Các từ khóa quan trọng: 'sum' (tổng), 'difference' (hiệu), 'product' (tích), 'quotient' (thương), 'twice' (gấp đôi), 'exceeds' (vượt quá). Khi đề nói 'A is x more than B' → A = B + x. 'For every increase of 1 in x, y increases by 3' → slope = 3.\n\nVới hệ hai phương trình, hãy ưu tiên phương pháp thay thế khi một biến đã cô lập, và phép cộng/trừ khi hệ số đối xứng. Nhớ rằng 'no solution' nghĩa là hai đường thẳng song song (cùng slope, khác intercept), còn 'infinitely many solutions' nghĩa là hai phương trình tương đương.",
        theoryEn: "Algebra is roughly 35% of the Digital SAT Math section. You must read English prompts quickly, translate them into equations, and solve. Key terms: 'sum', 'difference', 'product', 'quotient', 'twice', 'exceeds'. When the prompt says 'A is x more than B' → A = B + x. 'For every increase of 1 in x, y increases by 3' → slope = 3.\n\nFor systems of two equations, use substitution when one variable is already isolated, and elimination when coefficients are symmetric. Remember 'no solution' means parallel lines (same slope, different intercept), and 'infinitely many solutions' means equivalent equations.",
        proTips: [
          "Khi gặp 'at least' (ít nhất) dùng dấu ≥, 'at most' (nhiều nhất) dùng ≤.",
          "Slope-intercept form y = mx + b: m là độ dốc, b là tung độ gốc.",
          "Với bài word problem, luôn đặt biến rõ ràng: 'Let x = ...' trước khi viết phương trình."
        ],
        proTipsEn: [
          "'At least' → ≥, 'at most' → ≤.",
          "In y = mx + b, m is slope, b is y-intercept.",
          "For word problems, always declare your variable: 'Let x = ...' before writing the equation."
        ],
        vocabulary: [
          { word: "variable", partOfSpeech: "noun", meaning: "biến số", meaningEn: "a symbol representing an unknown number", example: "Let x be the variable representing hours worked.", exampleEn: "Let x be the variable representing hours worked." },
          { word: "coefficient", partOfSpeech: "noun", meaning: "hệ số", meaningEn: "a number multiplying a variable", example: "In 4x, the coefficient is 4.", exampleEn: "In 4x, the coefficient is 4." },
          { word: "linear equation", partOfSpeech: "noun", meaning: "phương trình tuyến tính", meaningEn: "an equation whose graph is a straight line", example: "y = 2x + 5 is a linear equation.", exampleEn: "y = 2x + 5 is a linear equation." },
          { word: "slope", partOfSpeech: "noun", meaning: "độ dốc", meaningEn: "the steepness of a line", example: "The slope of y = 3x + 1 is 3.", exampleEn: "The slope of y = 3x + 1 is 3." },
          { word: "intercept", partOfSpeech: "noun", meaning: "giao điểm với trục", meaningEn: "where a graph meets an axis", example: "The y-intercept is the point where x = 0.", exampleEn: "The y-intercept is the point where x = 0." },
          { word: "system of equations", partOfSpeech: "noun", meaning: "hệ phương trình", meaningEn: "two or more equations solved together", example: "Solve the system to find both x and y.", exampleEn: "Solve the system to find both x and y." },
          { word: "inequality", partOfSpeech: "noun", meaning: "bất phương trình", meaningEn: "a math statement using <, >, ≤, or ≥", example: "The inequality x > 5 has infinite solutions.", exampleEn: "The inequality x > 5 has infinite solutions." },
          { word: "constant", partOfSpeech: "noun", meaning: "hằng số", meaningEn: "a fixed numerical value", example: "In y = 2x + 7, the constant is 7.", exampleEn: "In y = 2x + 7, the constant is 7." },
          { word: "expression", partOfSpeech: "noun", meaning: "biểu thức", meaningEn: "math symbols without an equals sign", example: "3x + 2 is an expression, not an equation.", exampleEn: "3x + 2 is an expression, not an equation." },
          { word: "equivalent", partOfSpeech: "adjective", meaning: "tương đương", meaningEn: "having the same value", example: "2(x + 3) is equivalent to 2x + 6.", exampleEn: "2(x + 3) is equivalent to 2x + 6." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "In the equation y = 5x + 2, the number 5 is the ___.", textEn: "In the equation y = 5x + 2, the number 5 is the ___.", answer: "slope" },
              { text: "A ___ has infinitely many solutions when both equations describe the same line.", textEn: "A ___ has infinitely many solutions when both equations describe the same line.", answer: "system" },
              { text: "The symbol ≥ is used in an ___.", textEn: "The symbol ≥ is used in an ___.", answer: "inequality" },
              { text: "In 7x + 3, the ___ is 3.", textEn: "In 7x + 3, the ___ is 3.", answer: "constant" }
            ]
          }
        ],
        quiz: [
          { question: "If 3x + 2 = 14, what is x?", options: ["3", "4", "5", "6"], answer: 1, explanation: "3x = 12, so x = 4." },
          { question: "Two lines have the same slope but different y-intercepts. The system has:", options: ["one solution", "no solution", "infinitely many", "two solutions"], answer: 1, explanation: "Parallel lines never meet → no solution." },
          { question: "Which phrase translates to x ≥ 10?", options: ["x is less than 10", "x is at most 10", "x is at least 10", "x equals 10"], answer: 2, explanation: "'At least' means greater than or equal to." }
        ]
      }
    ]
  },
  {
    id: "sat-quadratics-functions",
    title: "Toán nâng cao: Hàm bậc 2 & Đồ thị",
    titleEn: "Advanced Math: Quadratics & Functions",
    icon: "📈",
    color: "from-purple-500 to-pink-600",
    description: "Parabola, đỉnh, biệt thức và đồ thị hàm số.",
    descriptionEn: "Parabolas, vertex form, discriminant, and function graphs.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-quadratics",
        title: "Hàm bậc 2 trong Digital SAT",
        titleEn: "Quadratic Functions on the Digital SAT",
        level: 5,
        difficulty: "advanced",
        theory: "Hàm bậc 2 dạng chuẩn: f(x) = ax² + bx + c. Đồ thị là một parabola. Nếu a > 0, parabola mở lên (vertex là minimum). Nếu a < 0, mở xuống (vertex là maximum). Tọa độ đỉnh: x = -b/(2a).\n\nDạng vertex form: f(x) = a(x − h)² + k với (h, k) là đỉnh. Dạng factored form: f(x) = a(x − r₁)(x − r₂) cho biết hai nghiệm (zeros). Discriminant Δ = b² − 4ac quyết định số nghiệm: Δ > 0 (hai nghiệm), Δ = 0 (một nghiệm kép), Δ < 0 (vô nghiệm thực).",
        theoryEn: "Standard form: f(x) = ax² + bx + c. The graph is a parabola. If a > 0, it opens upward (vertex is a minimum). If a < 0, it opens downward (vertex is a maximum). Vertex x-coordinate: x = -b/(2a).\n\nVertex form: f(x) = a(x − h)² + k where (h, k) is the vertex. Factored form: f(x) = a(x − r₁)(x − r₂) shows the two zeros. The discriminant Δ = b² − 4ac determines the number of real solutions: Δ > 0 (two), Δ = 0 (one repeated), Δ < 0 (none).",
        proTips: [
          "Nếu đề hỏi 'maximum value of f', trước hết check dấu của a và tính y tại vertex.",
          "Khi đề cho parabola và yêu cầu zeros, factored form là form thuận tiện nhất.",
          "Discriminant âm ⇒ không cắt trục x."
        ],
        proTipsEn: [
          "If asked 'maximum value of f', check sign of a then evaluate y at the vertex.",
          "When asked for zeros, factored form is the most convenient.",
          "Negative discriminant ⇒ does not cross the x-axis."
        ],
        vocabulary: [
          { word: "parabola", partOfSpeech: "noun", meaning: "đường parabol", meaningEn: "U-shaped curve of a quadratic", example: "The graph of y = x² is a parabola.", exampleEn: "The graph of y = x² is a parabola." },
          { word: "vertex", partOfSpeech: "noun", meaning: "đỉnh parabola", meaningEn: "the highest or lowest point of a parabola", example: "The vertex of y = (x−2)² + 3 is (2, 3).", exampleEn: "The vertex of y = (x−2)² + 3 is (2, 3)." },
          { word: "discriminant", partOfSpeech: "noun", meaning: "biệt thức", meaningEn: "b² − 4ac, decides number of real roots", example: "If the discriminant is negative, there are no real solutions.", exampleEn: "If the discriminant is negative, there are no real solutions." },
          { word: "axis of symmetry", partOfSpeech: "noun", meaning: "trục đối xứng", meaningEn: "vertical line dividing parabola in half", example: "The axis of symmetry passes through the vertex.", exampleEn: "The axis of symmetry passes through the vertex." },
          { word: "zero", partOfSpeech: "noun", meaning: "nghiệm hàm số", meaningEn: "x-value where f(x) = 0", example: "The zeros of (x−1)(x+4) are 1 and −4.", exampleEn: "The zeros of (x−1)(x+4) are 1 and −4." },
          { word: "factor", partOfSpeech: "verb", meaning: "phân tích thành nhân tử", meaningEn: "to rewrite as a product", example: "Factor x² − 9 as (x−3)(x+3).", exampleEn: "Factor x² − 9 as (x−3)(x+3)." },
          { word: "quadratic", partOfSpeech: "adjective", meaning: "bậc 2", meaningEn: "of degree 2", example: "y = x² + 5 is a quadratic function.", exampleEn: "y = x² + 5 is a quadratic function." },
          { word: "maximum", partOfSpeech: "noun", meaning: "giá trị lớn nhất", meaningEn: "highest value of a function", example: "The parabola opens downward, so the vertex is a maximum.", exampleEn: "The parabola opens downward, so the vertex is a maximum." },
          { word: "minimum", partOfSpeech: "noun", meaning: "giá trị nhỏ nhất", meaningEn: "lowest value of a function", example: "y = x² has a minimum of 0 at x = 0.", exampleEn: "y = x² has a minimum of 0 at x = 0." },
          { word: "domain", partOfSpeech: "noun", meaning: "miền xác định", meaningEn: "set of valid x values", example: "The domain of f(x) = √x is x ≥ 0.", exampleEn: "The domain of f(x) = √x is x ≥ 0." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ phù hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "The U-shaped graph of a quadratic is called a ___.", textEn: "The U-shaped graph of a quadratic is called a ___.", answer: "parabola" },
              { text: "The highest or lowest point of a parabola is its ___.", textEn: "The highest or lowest point of a parabola is its ___.", answer: "vertex" },
              { text: "If the ___ is negative, the equation has no real solutions.", textEn: "If the ___ is negative, the equation has no real solutions.", answer: "discriminant" },
              { text: "The values where f(x) = 0 are called ___.", textEn: "The values where f(x) = 0 are called ___.", answer: "zeros" }
            ]
          }
        ],
        quiz: [
          { question: "Which form clearly shows the vertex?", options: ["ax² + bx + c", "a(x−h)² + k", "a(x−r₁)(x−r₂)", "y = mx + b"], answer: 1, explanation: "Vertex form a(x−h)² + k displays vertex (h, k)." },
          { question: "If a > 0 in f(x) = ax² + bx + c, the vertex is a:", options: ["maximum", "minimum", "saddle point", "zero"], answer: 1, explanation: "Positive a opens upward → vertex is a minimum." },
          { question: "What is the discriminant of x² − 4x + 4?", options: ["0", "4", "−4", "16"], answer: 0, explanation: "b² − 4ac = 16 − 16 = 0 (one repeated root)." }
        ]
      }
    ]
  },
  {
    id: "sat-transitions",
    title: "Transition Words & Liên kết logic",
    titleEn: "Transition Words & Logical Connectors",
    icon: "🔗",
    color: "from-amber-500 to-orange-600",
    description: "Chuyên trị câu hỏi 'Which choice best transitions...' của Digital SAT.",
    descriptionEn: "Mastering the Digital SAT 'best transition' question.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-transitions-mastery",
        title: "Chọn từ nối chuẩn xác",
        titleEn: "Choosing the Right Transition Word",
        level: 4,
        difficulty: "intermediate",
        theory: "Câu hỏi 'Which choice most logically completes the transition?' xuất hiện ~3 lần trong mỗi bài Digital SAT R&W. Bí quyết: KHÔNG đọc các đáp án trước. Đọc câu trước và câu sau khoảng trống, tự xác định mối quan hệ logic, rồi mới chọn.\n\nCác nhóm transition thường gặp:\n• Bổ sung (Addition): moreover, furthermore, in addition, similarly\n• Tương phản (Contrast): however, nevertheless, on the other hand, conversely\n• Nguyên nhân–Kết quả: therefore, consequently, as a result, thus\n• Ví dụ: for example, for instance, specifically\n• Nhấn mạnh: indeed, in fact\n• Trình tự: subsequently, meanwhile, finally",
        theoryEn: "The 'Which choice most logically completes the transition?' question appears ~3 times per Digital SAT R&W module. Strategy: do NOT read the options first. Read the sentence before and after the blank, identify the logical relationship in your own words, then choose.\n\nCommon transition groups:\n• Addition: moreover, furthermore, in addition, similarly\n• Contrast: however, nevertheless, on the other hand, conversely\n• Cause–effect: therefore, consequently, as a result, thus\n• Example: for example, for instance, specifically\n• Emphasis: indeed, in fact\n• Sequence: subsequently, meanwhile, finally",
        proTips: [
          "Cẩn thận với 'however' — chỉ dùng khi có sự ĐỐI LẬP rõ ràng giữa hai câu.",
          "'Therefore' chỉ dùng khi câu sau là HỆ QUẢ logic của câu trước.",
          "Dùng 'in fact' để củng cố/nhấn mạnh ý vừa nêu chứ không phải chuyển ý."
        ],
        proTipsEn: [
          "Use 'however' only when there is a clear CONTRAST.",
          "Use 'therefore' only when the next sentence is a logical CONSEQUENCE.",
          "Use 'in fact' to REINFORCE the previous idea, not to switch ideas."
        ],
        vocabulary: [
          { word: "however", partOfSpeech: "transition", meaning: "tuy nhiên (đối lập)", meaningEn: "introduces a contrast", example: "The plan was bold; however, it lacked funding.", exampleEn: "The plan was bold; however, it lacked funding." },
          { word: "moreover", partOfSpeech: "transition", meaning: "hơn nữa (bổ sung)", meaningEn: "adds supporting information", example: "The report was thorough; moreover, it was timely.", exampleEn: "The report was thorough; moreover, it was timely." },
          { word: "consequently", partOfSpeech: "transition", meaning: "hậu quả là", meaningEn: "as a logical result", example: "Costs rose; consequently, profits fell.", exampleEn: "Costs rose; consequently, profits fell." },
          { word: "nevertheless", partOfSpeech: "transition", meaning: "tuy thế", meaningEn: "in spite of that", example: "The route was risky; nevertheless, they pressed on.", exampleEn: "The route was risky; nevertheless, they pressed on." },
          { word: "furthermore", partOfSpeech: "transition", meaning: "ngoài ra", meaningEn: "additionally", example: "Furthermore, the data confirms the trend.", exampleEn: "Furthermore, the data confirms the trend." },
          { word: "indeed", partOfSpeech: "transition", meaning: "thực vậy", meaningEn: "emphasises a previous claim", example: "The experiment worked; indeed, results exceeded expectations.", exampleEn: "The experiment worked; indeed, results exceeded expectations." },
          { word: "in contrast", partOfSpeech: "transition", meaning: "ngược lại", meaningEn: "shows opposite point", example: "Northern soils are rocky; in contrast, southern soils are sandy.", exampleEn: "Northern soils are rocky; in contrast, southern soils are sandy." },
          { word: "for instance", partOfSpeech: "transition", meaning: "ví dụ", meaningEn: "introduces an example", example: "Many fruits are tropical; mangoes, for instance, grow well in heat.", exampleEn: "Many fruits are tropical; mangoes, for instance, grow well in heat." },
          { word: "subsequently", partOfSpeech: "transition", meaning: "tiếp theo", meaningEn: "after that in time", example: "She published a paper; subsequently, she gave a lecture.", exampleEn: "She published a paper; subsequently, she gave a lecture." },
          { word: "specifically", partOfSpeech: "transition", meaning: "cụ thể là", meaningEn: "narrows from general to specific", example: "Sales rose; specifically, online orders doubled.", exampleEn: "Sales rose; specifically, online orders doubled." },
          { word: "thus", partOfSpeech: "transition", meaning: "do đó", meaningEn: "for this reason", example: "The bridge failed inspection; thus, it was closed.", exampleEn: "The bridge failed inspection; thus, it was closed." },
          { word: "conversely", partOfSpeech: "transition", meaning: "trái lại", meaningEn: "from the opposite point of view", example: "He thrived on solitude; conversely, she preferred crowds.", exampleEn: "He thrived on solitude; conversely, she preferred crowds." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn transition phù hợp với logic của hai câu:",
            instructionEn: "Choose the transition that fits the logic:",
            sentences: [
              { text: "The product launched on time. ___, it sold out within hours.", textEn: "The product launched on time. ___, it sold out within hours.", answer: "Furthermore", hint: "thêm thông tin tích cực" },
              { text: "Funding was approved. ___, the project began the following week.", textEn: "Funding was approved. ___, the project began the following week.", answer: "Consequently", hint: "kết quả" },
              { text: "The software is powerful. ___, it is also free.", textEn: "The software is powerful. ___, it is also free.", answer: "Moreover", hint: "bổ sung điểm mạnh" },
              { text: "The forecast predicted rain. ___, the day stayed dry.", textEn: "The forecast predicted rain. ___, the day stayed dry.", answer: "However", hint: "đối lập" }
            ]
          }
        ],
        quiz: [
          { question: "Which transition signals a logical CONSEQUENCE?", options: ["However", "Moreover", "Therefore", "For instance"], answer: 2, explanation: "'Therefore' signals consequence." },
          { question: "Which transition adds supporting information?", options: ["Nevertheless", "Furthermore", "Conversely", "However"], answer: 1, explanation: "'Furthermore' adds related information." },
          { question: "'In fact' is used to:", options: ["contrast", "introduce an example", "reinforce a point", "show sequence"], answer: 2, explanation: "'In fact' emphasises and reinforces the previous claim." }
        ]
      }
    ]
  },
  {
    id: "sat-rhetorical-synthesis",
    title: "Rhetorical Synthesis (Digital SAT)",
    titleEn: "Rhetorical Synthesis Mastery",
    icon: "🎯",
    color: "from-emerald-500 to-teal-600",
    description: "Dạng câu hỏi mới: chọn câu kết hợp các bullet notes theo mục đích.",
    descriptionEn: "The new SAT question: combine bullet notes to fit a stated goal.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-synthesis-strategy",
        title: "Chiến lược Rhetorical Synthesis",
        titleEn: "Rhetorical Synthesis Strategy",
        level: 5,
        difficulty: "advanced",
        theory: "Rhetorical Synthesis là dạng câu hỏi MỚI và xuất hiện 6 lần trong mỗi bài Digital SAT R&W. Đề cho 4–6 bullet notes cùng một mục tiêu (goal), rồi yêu cầu chọn câu thực hiện đúng goal đó.\n\nQUY TRÌNH 4 BƯỚC:\n1. Đọc GOAL trước tiên (in italic ở trên các bullets).\n2. Highlight từ khóa của goal: 'compare', 'introduce', 'emphasise difference', 'present main finding'…\n3. Loại đáp án sai: bất kỳ câu nào THIẾU yếu tố mà goal yêu cầu (vd. yêu cầu 'compare' nhưng câu chỉ mô tả một bên).\n4. Trong các đáp án còn lại, chọn câu nêu DỮ LIỆU CỤ THỂ thay vì khái quát mơ hồ.",
        theoryEn: "Rhetorical Synthesis is a NEW question type appearing 6 times per Digital SAT R&W module. You receive 4–6 bullet notes plus a stated goal, and you must pick the sentence that best fulfills that goal.\n\n4-STEP PROCESS:\n1. Read the GOAL first (italicised above the bullets).\n2. Highlight goal keywords: 'compare', 'introduce', 'emphasise difference', 'present main finding'…\n3. Eliminate options that MISS what the goal requires (e.g., 'compare' but the option only describes one side).\n4. Among remaining options, choose the one that uses CONCRETE DATA over vague generalities.",
        proTips: [
          "Goal yêu cầu 'compare' → đáp án phải nhắc cả hai đối tượng.",
          "Goal 'introduce X to an audience unfamiliar with X' → ưu tiên câu có định nghĩa nền.",
          "Đáp án mô tả đẹp nhưng lệch goal vẫn SAI."
        ],
        proTipsEn: [
          "If the goal asks to 'compare', the answer must mention both items.",
          "If the goal asks to 'introduce X to unfamiliar readers', prefer the option that defines X.",
          "An eloquent but off-goal sentence is still WRONG."
        ],
        vocabulary: [
          { word: "synthesise", partOfSpeech: "verb", meaning: "tổng hợp", meaningEn: "combine information from sources", example: "Students must synthesise the bullets into one sentence.", exampleEn: "Students must synthesise the bullets into one sentence." },
          { word: "goal", partOfSpeech: "noun", meaning: "mục tiêu", meaningEn: "the writer's purpose", example: "Read the goal before the bullet notes.", exampleEn: "Read the goal before the bullet notes." },
          { word: "emphasise", partOfSpeech: "verb", meaning: "nhấn mạnh", meaningEn: "give special importance", example: "The goal is to emphasise the contrast.", exampleEn: "The goal is to emphasise the contrast." },
          { word: "introduce", partOfSpeech: "verb", meaning: "giới thiệu", meaningEn: "present for the first time", example: "The sentence must introduce a key term.", exampleEn: "The sentence must introduce a key term." },
          { word: "compare", partOfSpeech: "verb", meaning: "so sánh", meaningEn: "examine similarities and differences", example: "Compare the two studies' methods.", exampleEn: "Compare the two studies' methods." },
          { word: "concise", partOfSpeech: "adjective", meaning: "súc tích", meaningEn: "saying much in few words", example: "SAT answers reward concise statements.", exampleEn: "SAT answers reward concise statements." },
          { word: "audience", partOfSpeech: "noun", meaning: "đối tượng đọc", meaningEn: "the readers addressed", example: "Tailor the sentence to the intended audience.", exampleEn: "Tailor the sentence to the intended audience." },
          { word: "concrete", partOfSpeech: "adjective", meaning: "cụ thể", meaningEn: "specific and definite", example: "Concrete details outperform vague claims.", exampleEn: "Concrete details outperform vague claims." },
          { word: "purpose", partOfSpeech: "noun", meaning: "mục đích", meaningEn: "intended aim", example: "Identify the writer's purpose first.", exampleEn: "Identify the writer's purpose first." },
          { word: "summarise", partOfSpeech: "verb", meaning: "tóm tắt", meaningEn: "give a short version", example: "Sometimes the goal is to summarise findings.", exampleEn: "Sometimes the goal is to summarise findings." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ phù hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "The first thing to read in a synthesis question is the ___.", textEn: "The first thing to read in a synthesis question is the ___.", answer: "goal" },
              { text: "If the goal asks to ___ two studies, the answer must mention both.", textEn: "If the goal asks to ___ two studies, the answer must mention both.", answer: "compare" },
              { text: "Prefer answers that include ___ data instead of vague claims.", textEn: "Prefer answers that include ___ data instead of vague claims.", answer: "concrete" },
              { text: "Goal verbs include 'introduce', 'emphasise', 'compare', and ___.", textEn: "Goal verbs include 'introduce', 'emphasise', 'compare', and ___.", answer: "summarise" }
            ]
          }
        ],
        quiz: [
          { question: "What should you read FIRST in a Rhetorical Synthesis question?", options: ["The bullet notes", "The answer choices", "The goal", "The passage source"], answer: 2, explanation: "Always start with the goal so you know what to filter for." },
          { question: "If the goal is 'introduce X to readers unfamiliar with X', the best answer:", options: ["Uses technical jargon", "Defines X clearly", "Compares X with Y", "Lists statistics only"], answer: 1, explanation: "Unfamiliar audiences need a clear definition." },
          { question: "An eloquent answer that ignores the goal is:", options: ["Often correct", "Sometimes correct", "Always wrong", "A safe guess"], answer: 2, explanation: "On Rhetorical Synthesis, off-goal = wrong." }
        ]
      }
    ]
  }
];

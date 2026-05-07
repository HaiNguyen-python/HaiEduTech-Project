// SAT Expansion 10 - Massive practice expansion: extra Math drills + Reading/Writing drills.
// Adds many more exercises to /sat-exercises (auto-grouped by Math vs Reading keywords).
import type { LanguageModule } from "./types";

export const satExpansionModules10: LanguageModule[] = [
  // ════════════════════════════ MATH ════════════════════════════
  {
    id: "sat-math-drill-algebra",
    title: "SAT Math Drill · Algebra Practice",
    titleEn: "SAT Math Drill · Algebra Practice",
    icon: "🧮",
    color: "from-sky-500 to-indigo-600",
    description: "Bộ bài tập đại số tuyến tính, hệ phương trình và bất phương trình bám sát Digital SAT.",
    descriptionEn: "Linear equations, systems and inequalities drills aligned with the Digital SAT.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-math-linear-equations-drill",
        title: "Drill 1 · Linear Equations",
        titleEn: "Drill 1 · Linear Equations",
        level: 3,
        difficulty: "intermediate",
        theory: "Phần đại số tuyến tính của Digital SAT yêu cầu bạn thao tác phương trình bậc nhất nhanh và chính xác. Hãy luôn rút gọn hai vế trước, gom biến về một vế và hằng số về vế còn lại.",
        theoryEn: "The linear algebra portion of the Digital SAT rewards quick, clean manipulation. Always simplify both sides first, then collect variables on one side and constants on the other.",
        proTips: [
          "Khi cả hai vế có phân số, nhân chéo bằng mẫu số chung trước.",
          "Nếu đề hỏi giá trị biểu thức (vd 2x+5), thử thay trực tiếp thay vì giải x.",
        ],
        proTipsEn: [
          "If both sides have fractions, multiply through by the LCD first.",
          "If the question asks for an expression like 2x+5, try substitution before solving for x.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền giá trị của x:",
            instructionEn: "Fill in the value of x:",
            sentences: [
              { text: "If 4x − 7 = 17, then x = ___.", textEn: "If 4x − 7 = 17, then x = ___.", answer: "6" },
              { text: "If 2(x + 3) = 18, then x = ___.", textEn: "If 2(x + 3) = 18, then x = ___.", answer: "6" },
              { text: "If 3x/2 = 9, then x = ___.", textEn: "If 3x/2 = 9, then x = ___.", answer: "6" },
              { text: "If 5x + 4 = 2x + 19, then x = ___.", textEn: "If 5x + 4 = 2x + 19, then x = ___.", answer: "5" },
              { text: "If (x − 1)/3 = 4, then x = ___.", textEn: "If (x − 1)/3 = 4, then x = ___.", answer: "13" },
            ],
          },
        ],
        quiz: [
          { question: "If 7x − 5 = 4x + 16, what is x?", options: ["3", "5", "7", "9"], answer: 2, explanation: "3x = 21 → x = 7." },
          { question: "Solve: 2(3x − 4) = 4x + 6", options: ["5", "6", "7", "8"], answer: 2, explanation: "6x − 8 = 4x + 6 → 2x = 14 → x = 7." },
          { question: "If 5 − 2x = 11, what is x?", options: ["−3", "−2", "2", "3"], answer: 0, explanation: "−2x = 6 → x = −3." },
          { question: "If x/4 + 3 = 8, what is x?", options: ["10", "16", "20", "24"], answer: 2, explanation: "x/4 = 5 → x = 20." },
          { question: "What value of x makes 3(x + 2) − 5 = 2x + 7?", options: ["4", "5", "6", "7"], answer: 2, explanation: "3x + 1 = 2x + 7 → x = 6." },
        ],
      },
      {
        id: "sat-math-systems-drill",
        title: "Drill 2 · Systems of Equations",
        titleEn: "Drill 2 · Systems of Equations",
        level: 4,
        difficulty: "intermediate",
        theory: "Hệ hai phương trình tuyến tính có thể giải bằng thay thế (substitution) hoặc cộng/trừ (elimination). Đề SAT thường ưu tiên elimination khi hệ số biến đối nhau hoặc có thể nhân nhanh.",
        theoryEn: "Linear systems can be solved by substitution or elimination. The SAT usually rewards elimination when coefficients line up nicely.",
        proTips: [
          "Khi đề có 'no solution' → hai đường thẳng cùng slope, khác intercept.",
          "Khi đề có 'infinitely many solutions' → hai phương trình tỉ lệ với nhau.",
        ],
        proTipsEn: [
          "'No solution' → same slope, different intercept.",
          "'Infinitely many' → equations are proportional.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền giá trị x hoặc y:",
            instructionEn: "Fill in x or y:",
            sentences: [
              { text: "If x + y = 10 and x − y = 2, then x = ___.", textEn: "If x + y = 10 and x − y = 2, then x = ___.", answer: "6" },
              { text: "If 2x + y = 11 and y = x + 2, then x = ___.", textEn: "If 2x + y = 11 and y = x + 2, then x = ___.", answer: "3" },
              { text: "If 3x − 2y = 4 and x = 4, then y = ___.", textEn: "If 3x − 2y = 4 and x = 4, then y = ___.", answer: "4" },
              { text: "If x + 2y = 9 and x = 3, then y = ___.", textEn: "If x + 2y = 9 and x = 3, then y = ___.", answer: "3" },
            ],
          },
        ],
        quiz: [
          { question: "If x + y = 12 and x − y = 4, what is y?", options: ["2", "4", "6", "8"], answer: 1, explanation: "Adding: 2x = 16 → x = 8 → y = 4." },
          { question: "For what value of k does the system 2x + 3y = 6 and 4x + 6y = k have infinitely many solutions?", options: ["6", "9", "12", "18"], answer: 2, explanation: "Multiply first by 2: k = 12." },
          { question: "If 5x − 2y = 1 and y = 2x − 1, what is x?", options: ["−1", "1", "2", "3"], answer: 1, explanation: "5x − 2(2x−1)=1 → x + 2 = 1 → x = −1. Wait check: 5x−4x+2=1 → x=−1. Recompute: x+2=1→x=−1." },
          { question: "If 2x + y = 7 and 3x − y = 8, what is x?", options: ["1", "2", "3", "4"], answer: 2, explanation: "Add: 5x = 15 → x = 3." },
        ],
      },
      {
        id: "sat-math-inequalities-drill",
        title: "Drill 3 · Inequalities & Word Problems",
        titleEn: "Drill 3 · Inequalities & Word Problems",
        level: 3,
        difficulty: "intermediate",
        theory: "Đọc kỹ tín hiệu ngôn ngữ: 'at least' = ≥, 'at most' = ≤, 'more than' = >, 'less than' = <. Khi nhân/chia hai vế với một số âm, đảo dấu bất phương trình.",
        theoryEn: "Watch the language: 'at least' = ≥, 'at most' = ≤, 'more than' = >, 'less than' = <. Flip the sign when multiplying or dividing by a negative.",
        proTips: ["Vẽ trục số nhanh để tránh nhầm dấu.", "Khi thấy 'no fewer than', đó cũng là ≥."],
        proTipsEn: ["Sketch a number line to avoid sign mistakes.", "'No fewer than' also means ≥."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền số nguyên nhỏ nhất hoặc lớn nhất:",
            instructionEn: "Fill in the smallest or largest integer:",
            sentences: [
              { text: "Smallest integer x such that 2x + 3 ≥ 11 is ___.", textEn: "Smallest integer x such that 2x + 3 ≥ 11 is ___.", answer: "4" },
              { text: "Largest integer x such that 5 − x > 1 is ___.", textEn: "Largest integer x such that 5 − x > 1 is ___.", answer: "3" },
              { text: "If x is at least 7 more than 4, the smallest x is ___.", textEn: "If x is at least 7 more than 4, the smallest x is ___.", answer: "11" },
            ],
          },
        ],
        quiz: [
          { question: "Solve: −3x ≤ 12", options: ["x ≤ −4", "x ≥ −4", "x ≤ 4", "x ≥ 4"], answer: 1, explanation: "Divide by −3 and flip: x ≥ −4." },
          { question: "A taxi charges $3 plus $2 per mile. For what number of miles m is the fare at most $20?", options: ["m ≤ 7", "m ≤ 8", "m ≤ 8.5", "m ≤ 10"], answer: 2, explanation: "3 + 2m ≤ 20 → m ≤ 8.5." },
          { question: "Which inequality represents 'x is no more than 9'?", options: ["x < 9", "x ≤ 9", "x > 9", "x ≥ 9"], answer: 1, explanation: "'No more than' = ≤." },
        ],
      },
    ],
  },
  {
    id: "sat-math-drill-advanced",
    title: "SAT Math Drill · Advanced & Functions",
    titleEn: "SAT Math Drill · Advanced & Functions",
    icon: "📈",
    color: "from-violet-500 to-fuchsia-600",
    description: "Hàm số, parabola, hệ số góc và đại lượng tỉ lệ trong Digital SAT.",
    descriptionEn: "Functions, parabolas, slope, and proportional reasoning in the Digital SAT.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-math-quadratic-drill",
        title: "Drill 4 · Quadratic Equations",
        titleEn: "Drill 4 · Quadratic Equations",
        level: 4,
        difficulty: "advanced",
        theory: "Hàm bậc hai có ba dạng chính: standard ax²+bx+c, factored a(x−p)(x−q), và vertex a(x−h)²+k. Trục đối xứng x = −b/(2a). Discriminant b²−4ac quyết định số nghiệm.",
        theoryEn: "Quadratics live in three forms: standard, factored, and vertex. Axis of symmetry x = −b/(2a). The discriminant b²−4ac controls how many real solutions exist.",
        proTips: [
          "Discriminant > 0: 2 nghiệm, = 0: nghiệm kép, < 0: vô nghiệm thực.",
          "Sum of roots = −b/a, product = c/a. Rất hữu ích khi đề hỏi tổng/tích nghiệm.",
        ],
        proTipsEn: [
          "Discriminant > 0: two real roots; = 0: one; < 0: none.",
          "Sum of roots = −b/a, product = c/a — handy on the SAT.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền nghiệm hoặc giá trị:",
            instructionEn: "Fill in the root or value:",
            sentences: [
              { text: "Solutions of x² − 5x + 6 = 0 are x = 2 and x = ___.", textEn: "Solutions of x² − 5x + 6 = 0 are x = 2 and x = ___.", answer: "3" },
              { text: "Vertex of y = (x − 4)² + 1 has x-coordinate ___.", textEn: "Vertex of y = (x − 4)² + 1 has x-coordinate ___.", answer: "4" },
              { text: "Sum of roots of 2x² − 8x + 3 = 0 equals ___.", textEn: "Sum of roots of 2x² − 8x + 3 = 0 equals ___.", answer: "4" },
            ],
          },
        ],
        quiz: [
          { question: "How many real solutions does x² + 4x + 5 = 0 have?", options: ["0", "1", "2", "Infinite"], answer: 0, explanation: "Discriminant = 16 − 20 = −4 < 0 → no real solutions." },
          { question: "What is the vertex of y = x² − 6x + 11?", options: ["(3, 2)", "(−3, 2)", "(3, −2)", "(6, 11)"], answer: 0, explanation: "Complete the square: (x−3)² + 2 → vertex (3, 2)." },
          { question: "If x² − 7x + k = 0 has equal roots, k = ?", options: ["49/4", "7/2", "14", "49"], answer: 0, explanation: "Discriminant 49 − 4k = 0 → k = 49/4." },
          { question: "Roots of (x + 2)(x − 5) = 0 are:", options: ["−2 and 5", "2 and −5", "2 and 5", "−2 and −5"], answer: 0, explanation: "Set each factor to zero." },
        ],
      },
      {
        id: "sat-math-functions-drill",
        title: "Drill 5 · Functions & Graphs",
        titleEn: "Drill 5 · Functions & Graphs",
        level: 4,
        difficulty: "intermediate",
        theory: "f(a) nghĩa là thay x = a vào f. Đồ thị f(x) + k dịch lên k đơn vị, f(x − h) dịch sang phải h. Hàm tăng/giảm phụ thuộc vào dấu hệ số dẫn đầu.",
        theoryEn: "f(a) means substitute x = a into f. The graph of f(x) + k shifts up by k; f(x − h) shifts right by h. Increasing/decreasing depends on the leading coefficient.",
        proTips: ["Khi đề cho bảng giá trị, kiểm tra slope giữa các cặp điểm.", "Đọc 'f(g(x))' từ trong ra ngoài."],
        proTipsEn: ["Given a table, check slope between consecutive pairs.", "Read 'f(g(x))' from the inside out."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Tính giá trị hàm:",
            instructionEn: "Evaluate the function:",
            sentences: [
              { text: "If f(x) = 2x + 3, then f(4) = ___.", textEn: "If f(x) = 2x + 3, then f(4) = ___.", answer: "11" },
              { text: "If g(x) = x² − 1, then g(−3) = ___.", textEn: "If g(x) = x² − 1, then g(−3) = ___.", answer: "8" },
              { text: "If h(x) = 3x − 5, then h(0) = ___.", textEn: "If h(x) = 3x − 5, then h(0) = ___.", answer: "-5" },
            ],
          },
        ],
        quiz: [
          { question: "If f(x) = 2x + 1 and g(x) = x − 3, what is f(g(5))?", options: ["3", "5", "7", "9"], answer: 1, explanation: "g(5) = 2; f(2) = 5." },
          { question: "Graph of y = f(x) is shifted 2 units down. New equation:", options: ["y = f(x) + 2", "y = f(x) − 2", "y = f(x − 2)", "y = f(x + 2)"], answer: 1, explanation: "Adding −2 outside shifts the graph down 2." },
          { question: "If f(x) = x² and the graph is shifted 3 right and 4 up, the new function is:", options: ["(x+3)² + 4", "(x−3)² + 4", "(x−3)² − 4", "(x+3)² − 4"], answer: 1, explanation: "Right shift = (x − h); up shift = +k." },
        ],
      },
      {
        id: "sat-math-data-drill",
        title: "Drill 6 · Statistics, Ratios & Percentages",
        titleEn: "Drill 6 · Statistics, Ratios & Percentages",
        level: 3,
        difficulty: "intermediate",
        theory: "Mean = tổng/số phần tử. Median là giá trị giữa khi đã sắp xếp. Phần trăm thay đổi = (mới − cũ)/cũ × 100%. Tỉ lệ thuận: y = kx; tỉ lệ nghịch: y = k/x.",
        theoryEn: "Mean = sum/count. Median is the middle value when sorted. Percent change = (new − old)/old × 100%. Direct variation: y = kx; inverse variation: y = k/x.",
        proTips: [
          "Khi đề cho bảng, đếm tổng cột/hàng trước khi tính phần trăm.",
          "Phần trăm tăng rồi giảm cùng % không trở về số gốc.",
        ],
        proTipsEn: [
          "When given a table, total rows/columns before computing percentages.",
          "A percent increase then equal-percent decrease does not return to the original.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Tính giá trị thống kê:",
            instructionEn: "Compute the statistic:",
            sentences: [
              { text: "Mean of 4, 6, 8, 10, 12 is ___.", textEn: "Mean of 4, 6, 8, 10, 12 is ___.", answer: "8" },
              { text: "Median of 3, 7, 9, 11, 15 is ___.", textEn: "Median of 3, 7, 9, 11, 15 is ___.", answer: "9" },
              { text: "20% of 250 equals ___.", textEn: "20% of 250 equals ___.", answer: "50" },
              { text: "If price rises from $80 to $100, the percent increase is ___%.", textEn: "If price rises from $80 to $100, the percent increase is ___%.", answer: "25" },
            ],
          },
        ],
        quiz: [
          { question: "A shirt costs $40 after a 20% discount. Original price?", options: ["$48", "$50", "$52", "$60"], answer: 1, explanation: "40 = 0.8x → x = 50." },
          { question: "If y is directly proportional to x and y = 12 when x = 4, then y when x = 9 is:", options: ["18", "24", "27", "36"], answer: 2, explanation: "k = 3 → y = 3·9 = 27." },
          { question: "Median of 5, 9, 12, 14, 21, 30:", options: ["12", "13", "14", "15"], answer: 1, explanation: "Average of two middle values: (12+14)/2 = 13." },
          { question: "If a population grew 10% then dropped 10%, the net change is:", options: ["0%", "−1%", "+1%", "−10%"], answer: 1, explanation: "1.10 × 0.90 = 0.99 → −1%." },
        ],
      },
      {
        id: "sat-math-geometry-drill",
        title: "Drill 7 · Geometry & Trigonometry",
        titleEn: "Drill 7 · Geometry & Trigonometry",
        level: 4,
        difficulty: "advanced",
        theory: "Tam giác vuông: a² + b² = c². Tỉ số lượng giác: sin = đối/huyền, cos = kề/huyền, tan = đối/kề. Diện tích hình tròn = πr², chu vi = 2πr. Góc nội tiếp bằng nửa cung chắn.",
        theoryEn: "Right triangles: a² + b² = c². sin = opp/hyp, cos = adj/hyp, tan = opp/adj. Circle area = πr²; circumference = 2πr. Inscribed angle = half the intercepted arc.",
        proTips: [
          "Bộ ba Pythagore quen thuộc: 3-4-5, 5-12-13, 8-15-17.",
          "30-60-90: cạnh tỉ lệ 1 : √3 : 2; 45-45-90: 1 : 1 : √2.",
        ],
        proTipsEn: [
          "Common Pythagorean triples: 3-4-5, 5-12-13, 8-15-17.",
          "30-60-90: 1 : √3 : 2; 45-45-90: 1 : 1 : √2.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền giá trị:",
            instructionEn: "Fill in the value:",
            sentences: [
              { text: "Hypotenuse of a 6-8 right triangle is ___.", textEn: "Hypotenuse of a 6-8 right triangle is ___.", answer: "10" },
              { text: "Area of a circle with radius 5 is ___π.", textEn: "Area of a circle with radius 5 is ___π.", answer: "25" },
              { text: "sin(30°) = ___ (decimal).", textEn: "sin(30°) = ___ (decimal).", answer: "0.5" },
            ],
          },
        ],
        quiz: [
          { question: "In a right triangle, legs 9 and 12. Hypotenuse?", options: ["13", "14", "15", "16"], answer: 2, explanation: "9² + 12² = 81 + 144 = 225 → 15." },
          { question: "Circumference of a circle with diameter 10 is:", options: ["5π", "10π", "20π", "100π"], answer: 1, explanation: "C = πd = 10π." },
          { question: "tan(45°) equals:", options: ["0", "0.5", "1", "√2"], answer: 2, explanation: "Opposite = adjacent in a 45-45-90 triangle." },
          { question: "Sum of interior angles of a hexagon:", options: ["360°", "540°", "720°", "900°"], answer: 2, explanation: "(6 − 2) × 180 = 720." },
        ],
      },
    ],
  },

  // ════════════════════════ READING & WRITING ════════════════════════
  {
    id: "sat-rw-drill-vocab-context",
    title: "SAT R&W Drill · Words in Context",
    titleEn: "SAT R&W Drill · Words in Context",
    icon: "📖",
    color: "from-emerald-500 to-teal-600",
    description: "Bài tập chọn từ thay thế phù hợp ngữ cảnh học thuật.",
    descriptionEn: "Drills for choosing the best word that matches academic context.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-rw-context-drill-1",
        title: "Drill 8 · Best-Word Substitution",
        titleEn: "Drill 8 · Best-Word Substitution",
        level: 4,
        difficulty: "intermediate",
        theory: "Trong dạng Words in Context, hãy đọc cả câu trước và sau từ cần thay, dự đoán từ trong đầu rồi so với 4 đáp án. Tránh từ 'gần đúng' nhưng sai sắc thái (positive/negative tone, formal/informal).",
        theoryEn: "For Words in Context, read the surrounding sentences, predict the word in your head, then match against the four options. Avoid words that are 'close but off' in tone (positive/negative, formal/informal).",
        proTips: [
          "Tự đoán trước khi nhìn đáp án.",
          "Đánh dấu các từ nối as, however, because — chúng tiết lộ sắc thái.",
        ],
        proTipsEn: [
          "Predict before peeking at answer choices.",
          "Note transitions like 'however', 'because' — they reveal tone.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn từ phù hợp nhất (gõ chính xác):",
            instructionEn: "Type the best-fit word:",
            sentences: [
              { text: "The data ___ the hypothesis that early intervention improves outcomes. (supports / refutes / ignores / mocks)", textEn: "The data ___ the hypothesis that early intervention improves outcomes.", answer: "supports" },
              { text: "Her argument was ___, leaving no doubt about the conclusion. (compelling / dubious / lazy / random)", textEn: "Her argument was ___, leaving no doubt about the conclusion.", answer: "compelling" },
              { text: "The committee ___ the proposal after lengthy debate. (endorsed / scolded / wrote / hid)", textEn: "The committee ___ the proposal after lengthy debate.", answer: "endorsed" },
              { text: "Although the methodology was ___, the findings were still cited widely. (flawed / perfect / loud / wet)", textEn: "Although the methodology was ___, the findings were still cited widely.", answer: "flawed" },
            ],
          },
        ],
        quiz: [
          { question: "Choose the best word: 'The author's tone is ____; she rarely commits to a position.'", options: ["decisive", "noncommittal", "joyful", "violent"], answer: 1, explanation: "'Rarely commits' signals noncommittal." },
          { question: "Choose the best word: 'The results were ____ with prior studies.'", options: ["congruent", "contrary", "indifferent", "remote"], answer: 0, explanation: "'With prior studies' suggests agreement → congruent." },
          { question: "Choose the best word: 'Her explanation was ____; even beginners understood.'", options: ["lucid", "opaque", "harsh", "verbose"], answer: 0, explanation: "Beginners understood → clear/lucid." },
          { question: "Choose the best word: 'The senator ____ the new bill, calling it dangerous.'", options: ["denounced", "praised", "ignored", "drafted"], answer: 0, explanation: "Negative description → denounced." },
          { question: "Choose the best word: 'A ____ summary captures the essential ideas in few words.'", options: ["concise", "rambling", "trivial", "ornate"], answer: 0, explanation: "Few words = concise." },
        ],
      },
      {
        id: "sat-rw-context-drill-2",
        title: "Drill 9 · Tone & Connotation",
        titleEn: "Drill 9 · Tone & Connotation",
        level: 4,
        difficulty: "advanced",
        theory: "SAT thường dùng các cặp từ có nghĩa gần nhau nhưng sắc thái khác (vd: thrifty/stingy, confident/arrogant). Chọn từ trung lập hơn nếu đoạn văn có giọng học thuật.",
        theoryEn: "The SAT loves near-synonyms with different connotation (thrifty/stingy, confident/arrogant). Pick the more neutral word in academic passages.",
        proTips: ["Đoạn văn học thuật → ưu tiên từ trung tính.", "Đoạn phê phán → có thể chấp nhận từ mang sắc thái mạnh."],
        proTipsEn: ["Academic passages favor neutral diction.", "Critical passages may allow stronger connotation."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn từ trung lập phù hợp văn học thuật:",
            instructionEn: "Pick the academic-neutral choice:",
            sentences: [
              { text: "The economist was ___ in her predictions. (cautious / paranoid)", textEn: "The economist was ___ in her predictions.", answer: "cautious" },
              { text: "The novel offers a ___ view of urban life. (nuanced / preachy)", textEn: "The novel offers a ___ view of urban life.", answer: "nuanced" },
              { text: "The data show a ___ improvement over the baseline. (modest / pathetic)", textEn: "The data show a ___ improvement over the baseline.", answer: "modest" },
            ],
          },
        ],
        quiz: [
          { question: "Best fit: 'The candidate was ____ rather than aggressive.'", options: ["assertive", "violent", "passive", "shy"], answer: 0, explanation: "Assertive is the neutral middle ground." },
          { question: "Best fit: 'Her arguments were ____ but never insulting.'", options: ["pointed", "venomous", "sweet", "bland"], answer: 0, explanation: "'But never insulting' implies firm yet civil → pointed." },
          { question: "Best fit: 'The professor's lecture was ____, giving credit to opposing views.'", options: ["balanced", "biased", "boring", "brash"], answer: 0, explanation: "Giving credit to others → balanced." },
        ],
      },
    ],
  },
  {
    id: "sat-rw-drill-grammar",
    title: "SAT R&W Drill · Grammar Conventions",
    titleEn: "SAT R&W Drill · Grammar Conventions",
    icon: "✍️",
    color: "from-rose-500 to-pink-600",
    description: "Bài tập dấu câu, hòa hợp chủ-vị, đại từ, modifier — Standard English Conventions.",
    descriptionEn: "Punctuation, subject-verb agreement, pronouns and modifiers — Standard English Conventions.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-rw-punctuation-drill",
        title: "Drill 10 · Commas, Semicolons, Colons",
        titleEn: "Drill 10 · Commas, Semicolons, Colons",
        level: 3,
        difficulty: "intermediate",
        theory: "Dùng dấu phẩy để tách mệnh đề phụ và liệt kê. Dấu chấm phẩy nối hai mệnh đề độc lập có liên quan. Dấu hai chấm đứng sau một mệnh đề độc lập, giới thiệu danh sách hoặc giải thích.",
        theoryEn: "Use commas for dependent clauses and lists. A semicolon links two independent clauses. A colon follows an independent clause and introduces a list or explanation.",
        proTips: ["Trước semicolon phải là mệnh đề độc lập đầy đủ.", "Không dùng colon ngay sau verb hoặc preposition."],
        proTipsEn: ["What's before a semicolon must be a full independent clause.", "Never put a colon right after a verb or preposition."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền dấu thích hợp (, hoặc ; hoặc :):",
            instructionEn: "Insert the correct punctuation (, or ; or :):",
            sentences: [
              { text: "She loves three subjects ___ math, biology, and history.", textEn: "She loves three subjects ___ math, biology, and history.", answer: ":" },
              { text: "The lab was crowded ___ however, we found seats near the window.", textEn: "The lab was crowded ___ however, we found seats near the window.", answer: ";" },
              { text: "After the lecture ___ students lined up to ask questions.", textEn: "After the lecture ___ students lined up to ask questions.", answer: "," },
              { text: "He missed the bus ___ so he walked to school.", textEn: "He missed the bus ___ so he walked to school.", answer: "," },
            ],
          },
        ],
        quiz: [
          { question: "Which is correct?", options: ["I love hiking, swimming is fun too.", "I love hiking; swimming is fun too.", "I love hiking: swimming is fun too.", "I love hiking swimming is fun too."], answer: 1, explanation: "Two independent clauses joined → semicolon." },
          { question: "Which is correct?", options: ["She brought: a tent, a stove, and snacks.", "She brought, a tent, a stove, and snacks.", "She brought a tent, a stove, and snacks.", "She brought; a tent, a stove, and snacks."], answer: 2, explanation: "Don't use a colon directly after a verb." },
          { question: "Which is correct?", options: ["The result was clear; the hypothesis held.", "The result was clear, the hypothesis held.", "The result was clear: the hypothesis held.", "Both A and C"], answer: 3, explanation: "Both semicolon and colon work here." },
        ],
      },
      {
        id: "sat-rw-sva-drill",
        title: "Drill 11 · Subject-Verb Agreement Traps",
        titleEn: "Drill 11 · Subject-Verb Agreement Traps",
        level: 4,
        difficulty: "advanced",
        theory: "SAT giấu chủ ngữ thật bằng cụm giới từ dài (vd 'one of the boys who…'). Hãy luôn xác định chủ ngữ chính trước khi chọn động từ.",
        theoryEn: "The SAT hides the real subject behind long prepositional phrases ('one of the boys who…'). Always isolate the head subject first.",
        proTips: ["Bỏ qua cụm 'of …' để tìm chủ ngữ thật.", "'Either/or' và 'neither/nor' lấy động từ theo chủ ngữ gần nhất."],
        proTipsEn: ["Strike out 'of …' phrases to find the head subject.", "With 'either/or' and 'neither/nor', the verb agrees with the closest noun."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền is/are hoặc has/have:",
            instructionEn: "Fill in is/are or has/have:",
            sentences: [
              { text: "The list of approved candidates ___ on the board.", textEn: "The list of approved candidates ___ on the board.", answer: "is" },
              { text: "Each of the students ___ submitted the form.", textEn: "Each of the students ___ submitted the form.", answer: "has" },
              { text: "Neither the teacher nor the students ___ ready.", textEn: "Neither the teacher nor the students ___ ready.", answer: "are" },
              { text: "The collection of paintings ___ on display until June.", textEn: "The collection of paintings ___ on display until June.", answer: "is" },
            ],
          },
        ],
        quiz: [
          { question: "Choose the correct verb: 'A box of letters ____ on the desk.'", options: ["sit", "sits", "are sitting", "have sat"], answer: 1, explanation: "Subject = 'A box', singular → sits." },
          { question: "Choose the correct verb: 'Neither the manager nor the employees ____ aware of the change.'", options: ["was", "were", "is", "has been"], answer: 1, explanation: "Closest subject 'employees' is plural → were." },
          { question: "Choose the correct verb: 'The data ____ inconclusive.'", options: ["is", "are", "was", "Both A and B accepted"], answer: 3, explanation: "On the SAT, 'data' as a collective is usually plural; both forms accepted." },
        ],
      },
      {
        id: "sat-rw-pronoun-modifier-drill",
        title: "Drill 12 · Pronouns & Modifier Placement",
        titleEn: "Drill 12 · Pronouns & Modifier Placement",
        level: 4,
        difficulty: "advanced",
        theory: "Mỗi đại từ phải có một danh từ rõ ràng đứng trước. Modifier (cụm bổ nghĩa) phải ở càng gần danh từ nó bổ nghĩa càng tốt — sai vị trí sẽ tạo dangling modifier.",
        theoryEn: "Every pronoun needs one clear antecedent. Modifiers must sit next to the noun they describe; misplacement creates dangling modifiers.",
        proTips: ["Khi gặp 'it/they/this', tìm xem nó thay cho danh từ nào.", "Cụm phân từ mở đầu câu phải bổ nghĩa cho chủ ngữ ngay sau dấu phẩy."],
        proTipsEn: ["With 'it/they/this', find the antecedent.", "An opening participial phrase must modify the subject right after the comma."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền đại từ đúng (he/she/it/they):",
            instructionEn: "Fill in the right pronoun:",
            sentences: [
              { text: "When the dog saw the cat, ___ ran across the street. (rewrite as 'the dog')", textEn: "When the dog saw the cat, ___ ran across the street.", answer: "it" },
              { text: "Every student must bring ___ own laptop.", textEn: "Every student must bring ___ own laptop.", answer: "their" },
            ],
          },
        ],
        quiz: [
          { question: "Which sentence is correctly modified?", options: [
            "Walking down the street, the building looked massive.",
            "Walking down the street, I noticed the massive building.",
            "Walking down the street, the building, I noticed, looked massive.",
            "I walked down the street, the building looked massive."
          ], answer: 1, explanation: "The opener 'walking' should modify 'I'." },
          { question: "Which is best?", options: [
            "Each scientist must record their data.",
            "Each scientist must record his data.",
            "Each scientist must record there data.",
            "Each scientist must record they data."
          ], answer: 0, explanation: "Modern SAT accepts singular 'their' for gender-neutral antecedents." },
          { question: "Fix: 'Running quickly, the finish line came into view.'", options: [
            "No change",
            "Running quickly, I saw the finish line come into view.",
            "Running quickly the finish line came into view.",
            "Running, quickly the finish line came into view."
          ], answer: 1, explanation: "Subject must be 'I' so the modifier attaches correctly." },
        ],
      },
    ],
  },
  {
    id: "sat-rw-drill-evidence-synthesis",
    title: "SAT R&W Drill · Evidence & Synthesis",
    titleEn: "SAT R&W Drill · Evidence & Synthesis",
    icon: "🧠",
    color: "from-amber-500 to-orange-600",
    description: "Command of Evidence, Rhetorical Synthesis, transitions — đọc hiểu và viết tổng hợp.",
    descriptionEn: "Command of Evidence, Rhetorical Synthesis, transitions — comprehension and synthesis.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-rw-evidence-drill",
        title: "Drill 13 · Command of Evidence",
        titleEn: "Drill 13 · Command of Evidence",
        level: 4,
        difficulty: "advanced",
        theory: "Câu hỏi dạng 'Which finding, if true, would most directly support/weaken…' yêu cầu đáp án phải khớp đúng claim. Tránh đáp án mở rộng phạm vi (overreach) hoặc lệch chủ đề.",
        theoryEn: "'Which finding, if true, would most directly support/weaken…' questions need answers that match the claim exactly. Avoid overreach or off-topic options.",
        proTips: ["Khoanh keyword chính của claim, rồi tìm đáp án dùng đúng keyword đó.", "Đáp án quá tổng quát hoặc quá hẹp đều thường sai."],
        proTipsEn: ["Underline the claim's keyword and match it.", "Answers that are too broad or too narrow are usually wrong."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền 'support' hoặc 'weaken':",
            instructionEn: "Fill in 'support' or 'weaken':",
            sentences: [
              { text: "Claim: Sleep improves memory. Finding: Students who slept 8h scored 20% higher on recall tests. → ___", textEn: "Claim: Sleep improves memory. Finding: Students who slept 8h scored 20% higher on recall tests. → ___", answer: "support" },
              { text: "Claim: Exercise reduces stress. Finding: People who exercised daily reported higher stress levels. → ___", textEn: "Claim: Exercise reduces stress. Finding: People who exercised daily reported higher stress levels. → ___", answer: "weaken" },
            ],
          },
        ],
        quiz: [
          { question: "Claim: 'Reading fiction improves empathy.' Which finding most directly supports it?", options: [
            "Fiction sales rose 5% last year.",
            "Adults who read literary fiction scored higher on empathy tests than those who read non-fiction.",
            "Children prefer picture books to chapter books.",
            "Empathy is partly genetic."
          ], answer: 1, explanation: "Direct comparison linking fiction to empathy." },
          { question: "Claim: 'Remote work increases productivity.' Which finding most directly weakens it?", options: [
            "Most workers prefer remote work.",
            "A study found remote workers completed 15% fewer tasks per week than office workers.",
            "Companies save on office rent.",
            "Office attendance dropped during the pandemic."
          ], answer: 1, explanation: "Counters the productivity claim with measurable evidence." },
          { question: "Claim: 'High coffee intake harms sleep.' Best supporting finding:", options: [
            "Coffee drinkers report being more alert in the morning.",
            "People who drank 4+ cups daily fell asleep 30 minutes later than non-drinkers.",
            "Coffee shops are popular.",
            "Tea contains caffeine too."
          ], answer: 1, explanation: "Quantified link between coffee and sleep latency." },
        ],
      },
      {
        id: "sat-rw-transition-drill",
        title: "Drill 14 · Transitions & Logical Flow",
        titleEn: "Drill 14 · Transitions & Logical Flow",
        level: 3,
        difficulty: "intermediate",
        theory: "Transitions phải khớp logic giữa hai câu: bổ sung (furthermore), tương phản (however), nguyên nhân (therefore), ví dụ (for instance), kết luận (in short).",
        theoryEn: "Transitions must match the logic between sentences: addition (furthermore), contrast (however), cause (therefore), example (for instance), conclusion (in short).",
        proTips: ["Đọc cả hai câu, hỏi 'Câu 2 thêm, đối lập, hay giải thích câu 1?'", "Đừng chọn transition chỉ vì nghe trang trọng."],
        proTipsEn: ["Read both sentences and ask: does sentence 2 add, contrast, or explain sentence 1?", "Don't pick a transition just because it sounds formal."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền transition phù hợp (however / therefore / for example / in addition):",
            instructionEn: "Fill in the best transition:",
            sentences: [
              { text: "Solar panels are expensive to install. ___, they save money over time.", textEn: "Solar panels are expensive to install. ___, they save money over time.", answer: "However" },
              { text: "The author cites many studies. ___, she discusses a 2019 trial in Berlin.", textEn: "The author cites many studies. ___, she discusses a 2019 trial in Berlin.", answer: "For example" },
              { text: "Sales dropped sharply. ___, the company cut its workforce.", textEn: "Sales dropped sharply. ___, the company cut its workforce.", answer: "Therefore" },
              { text: "The team won the regional title. ___, they advanced to nationals.", textEn: "The team won the regional title. ___, they advanced to nationals.", answer: "In addition" },
            ],
          },
        ],
        quiz: [
          { question: "Choose the best transition: 'The recipe calls for butter; ____, margarine works in a pinch.'", options: ["furthermore", "however", "therefore", "in conclusion"], answer: 1, explanation: "Contrast → however." },
          { question: "Choose the best transition: 'Wind energy is renewable. ____, solar energy is also renewable.'", options: ["However", "Likewise", "Therefore", "Nonetheless"], answer: 1, explanation: "Adding a similar idea → likewise." },
          { question: "Choose the best transition: 'She studied for weeks. ____, she aced the test.'", options: ["Nevertheless", "Otherwise", "As a result", "On the contrary"], answer: 2, explanation: "Cause-effect → as a result." },
          { question: "Choose the best transition: 'The bridge is structurally sound. ____, engineers recommend annual inspections.'", options: ["Therefore", "Still", "For example", "Finally"], answer: 1, explanation: "Concession/contrast in same direction → still." },
        ],
      },
      {
        id: "sat-rw-synthesis-drill",
        title: "Drill 15 · Rhetorical Synthesis",
        titleEn: "Drill 15 · Rhetorical Synthesis",
        level: 5,
        difficulty: "advanced",
        theory: "Bài Rhetorical Synthesis cho danh sách bullet và yêu cầu kết hợp thành câu phục vụ một mục đích. Đọc câu mục đích trước, gạch chân từ khóa, rồi chọn đáp án dùng đúng các bullet liên quan.",
        theoryEn: "Rhetorical Synthesis gives bullets and asks for a sentence that achieves a goal. Read the goal first, underline keywords, then pick the option that uses only relevant bullets.",
        proTips: [
          "Đáp án đúng dùng tối thiểu các bullet, không 'nhồi' bullet thừa.",
          "Cẩn thận với đáp án nghe học thuật nhưng lệch mục đích.",
        ],
        proTipsEn: [
          "Correct answers use the fewest necessary bullets — no padding.",
          "Beware academic-sounding answers that miss the stated goal.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền keyword cho mục đích:",
            instructionEn: "Fill in the goal keyword:",
            sentences: [
              { text: "Goal: 'introduce the artist to a new audience' → focus on ___ details.", textEn: "Goal: 'introduce the artist to a new audience' → focus on ___ details.", answer: "background" },
              { text: "Goal: 'compare two studies' → choose a sentence using ___.", textEn: "Goal: 'compare two studies' → choose a sentence using ___.", answer: "both" },
              { text: "Goal: 'explain a finding to readers unfamiliar with the field' → use ___ language.", textEn: "Goal: 'explain a finding to readers unfamiliar with the field' → use ___ language.", answer: "simple" },
            ],
          },
        ],
        quiz: [
          { question: "Bullets: (a) Study A found 30% improvement. (b) Study B found 28% improvement. (c) Study C used different metrics. Goal: emphasize how A and B agree. Best:", options: [
            "Studies A, B, and C measured improvement using different scales.",
            "Studies A and B reported nearly identical improvements (~30%).",
            "Study C used different metrics than the others.",
            "Three studies examined improvement."
          ], answer: 1, explanation: "Only A and B; emphasizes agreement." },
          { question: "Bullets: (a) Mozart composed 600+ works. (b) Mozart began at age 5. (c) He toured Europe. Goal: introduce Mozart's prolific output. Best:", options: [
            "Mozart toured Europe extensively as a child.",
            "Mozart, who started composing at 5, eventually wrote more than 600 works.",
            "Mozart was a famous Austrian composer.",
            "Mozart toured and composed."
          ], answer: 1, explanation: "Highlights his prolific output." },
          { question: "Bullets: (a) Whales communicate via songs. (b) Songs travel hundreds of miles. (c) Whale songs evolve over years. Goal: emphasize how songs change over time. Best:", options: [
            "Whales sing complex songs that change over years.",
            "Whale songs travel hundreds of miles underwater.",
            "Whales communicate by singing.",
            "Whales live in oceans."
          ], answer: 0, explanation: "Specifically about evolution over time." },
        ],
      },
    ],
  },
];

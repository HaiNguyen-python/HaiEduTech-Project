// SAT Expansion 7 - Test-day pacing, error-log methodology, and Bluebook tooling mastery.
// Designed to match the new 30-week curriculum (Weeks 24–30).
import type { LanguageModule } from "./types";

export const satExpansionModules7: LanguageModule[] = [
  {
    id: "sat-pacing-and-skip",
    title: "Pacing & Skip Strategy (Digital SAT)",
    titleEn: "Pacing & Skip Strategy (Digital SAT)",
    icon: "⏱️",
    color: "from-cyan-500 to-blue-600",
    description: "Phân bổ thời gian từng module và quy tắc bỏ qua câu khó hiệu quả.",
    descriptionEn: "Per-module pacing and how to skip hard questions efficiently.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-pacing-rw-module",
        title: "Pacing 32 phút cho R&W Module",
        titleEn: "Pacing 32 Minutes per R&W Module",
        level: 4,
        difficulty: "intermediate",
        theory:
          "Mỗi R&W module có 27 câu / 32 phút → khoảng 71 giây/câu. Thực chiến: chia module thành 3 đợt 9 câu × ~10 phút, để dành 2 phút review.\n\nPhân loại độ khó (do thuật toán xếp): câu 1–5 thường dễ, 6–20 trung bình, 21–27 khó (hoặc Cross-Text). Quy tắc 90 giây: nếu câu vượt 90 giây mà chưa loại được 2 đáp án, BẤM Mark for Review và sang câu tiếp.\n\nMột học sinh điểm 700+ thường: trả lời chắc 22–24 câu, mark 3–5 câu, quay lại sau khi hoàn thành đợt 3.",
        theoryEn:
          "Each R&W module is 27 questions in 32 minutes → about 71 seconds/question. In practice: split the module into three 9-question waves of ~10 minutes each, leaving 2 minutes to review.\n\nDifficulty grouping (algorithm-sorted): Q1–5 usually easy, Q6–20 medium, Q21–27 hard (often Cross-Text). The 90-second rule: if you spend more than 90 seconds without eliminating at least 2 choices, hit Mark for Review and move on.\n\nA 700+ scorer typically nails 22–24 confidently, marks 3–5, and returns to them after wave 3.",
        proTips: [
          "Đặt mục tiêu ngầm: hết 10 phút phải xong câu 9; hết 20 phút phải xong câu 18.",
          "Mark for Review KHÔNG trừ điểm - đừng ngại bấm.",
          "Khi quay lại, đọc lại CÂU HỎI trước rồi mới nhìn lựa chọn - tránh ‘mỏi mắt’ chọn sai."
        ],
        proTipsEn: [
          "Silent checkpoints: by minute 10 finish Q9; by minute 20 finish Q18.",
          "Mark for Review carries NO penalty - use it freely.",
          "When you return, reread the QUESTION first, then the choices - avoid tired-eye misclicks."
        ],
        vocabulary: [
          { word: "pacing", partOfSpeech: "noun", meaning: "phân bổ tốc độ", meaningEn: "timing across a task", example: "Good pacing wins on the SAT.", exampleEn: "Good pacing wins on the SAT." },
          { word: "checkpoint", partOfSpeech: "noun", meaning: "điểm kiểm tra", meaningEn: "an intermediate target", example: "Set checkpoints every 10 minutes.", exampleEn: "Set checkpoints every 10 minutes." },
          { word: "mark for review", partOfSpeech: "noun", meaning: "đánh dấu xem lại", meaningEn: "Bluebook flag tool", example: "Use Mark for Review without hesitation.", exampleEn: "Use Mark for Review without hesitation." },
          { word: "elimination", partOfSpeech: "noun", meaning: "loại trừ đáp án", meaningEn: "removing wrong choices", example: "Elimination beats guessing.", exampleEn: "Elimination beats guessing." },
          { word: "wave", partOfSpeech: "noun", meaning: "đợt", meaningEn: "a batch of questions", example: "Plan three waves per module.", exampleEn: "Plan three waves per module." },
          { word: "stamina", partOfSpeech: "noun", meaning: "sức bền", meaningEn: "mental endurance", example: "Build test stamina with full mocks.", exampleEn: "Build test stamina with full mocks." },
          { word: "skip", partOfSpeech: "verb", meaning: "bỏ qua tạm", meaningEn: "to defer to later", example: "Skip and return - don't stall.", exampleEn: "Skip and return - don't stall." },
          { word: "buffer", partOfSpeech: "noun", meaning: "thời gian dự phòng", meaningEn: "spare time held in reserve", example: "Keep a 2-minute buffer for review.", exampleEn: "Keep a 2-minute buffer for review." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "Each R&W module gives you about ___ seconds per question.", textEn: "Each R&W module gives you about ___ seconds per question.", answer: "71" },
              { text: "If a question takes more than 90 seconds, use Mark for ___.", textEn: "If a question takes more than 90 seconds, use Mark for ___.", answer: "Review" },
              { text: "Plan three ___ of nine questions to stay on pace.", textEn: "Plan three ___ of nine questions to stay on pace.", answer: "waves" },
              { text: "Always reserve a 2-minute ___ at the end for review.", textEn: "Always reserve a 2-minute ___ at the end for review.", answer: "buffer" }
            ]
          }
        ],
        quiz: [
          { question: "By minute 20 of an R&W module, you should have finished about question:", options: ["6", "12", "18", "24"], answer: 2, explanation: "Three waves of 9 means Q9 by minute 10 and Q18 by minute 20." },
          { question: "Which is TRUE about Mark for Review?", options: ["It deducts points", "It locks the answer", "It carries no penalty", "It pauses the timer"], answer: 2, explanation: "It is purely a navigation flag with no scoring impact." },
          { question: "The 90-second rule says you should:", options: ["Always finish in 90 seconds", "Skip if you cannot eliminate 2 choices in 90s", "Check the timer every 90s", "Take 90s breaks"], answer: 1, explanation: "Skipping prevents one hard question from costing 2–3 easier ones." }
        ]
      },
      {
        id: "sat-pacing-math-module",
        title: "Pacing 35 phút cho Math Module",
        titleEn: "Pacing 35 Minutes per Math Module",
        level: 4,
        difficulty: "intermediate",
        theory:
          "Math module có 22 câu / 35 phút → ~95 giây/câu. Chia làm 2 đợt: 11 câu đầu trong 15 phút, 11 câu sau trong 17 phút, dành 3 phút cuối kiểm tra Desmos cho 2–3 câu khó.\n\nDùng Desmos cho: hệ phương trình, đồ thị parabola, scatter plot, table function. Đừng dùng Desmos cho: số học đơn giản, %, tỉ lệ - viết tay nhanh hơn.\n\nCâu Student-Produced Response (điền số) chiếm ~25%. Quy tắc: nếu kết quả là phân số, gõ trực tiếp ‘1/2’; nếu là số thập phân vô hạn, gõ tối thiểu 4 chữ số (vd 0.6667).",
        theoryEn:
          "Math module has 22 questions in 35 minutes → ~95s/question. Split into two waves: first 11 in 15 minutes, last 11 in 17 minutes, leaving 3 minutes to recheck Desmos work on 2–3 hard items.\n\nUse Desmos for: systems of equations, parabolas, scatter plots, table functions. Avoid Desmos for: simple arithmetic, %, ratios - handwriting is faster.\n\nStudent-Produced Response (grid-in) items make up ~25%. Rule: if your answer is a fraction, type ‘1/2’ directly; if a repeating decimal, enter at least 4 digits (e.g. 0.6667).",
        proTips: [
          "Mở Desmos một lần đầu module và để ở tab góc - không mở lại nhiều lần.",
          "Gõ phân số trực tiếp như 3/8 thay vì 0.375 - tránh sai số làm tròn.",
          "Câu word problem dài: viết ‘Let x = …’ ra giấy nháp trước khi đụng vào số."
        ],
        proTipsEn: [
          "Open Desmos once at the start of the module and keep it docked - don't toggle repeatedly.",
          "Type fractions directly (3/8) instead of 0.375 - avoids rounding errors.",
          "Long word problems: write 'Let x = …' on scratch paper before touching numbers."
        ],
        vocabulary: [
          { word: "grid-in", partOfSpeech: "noun", meaning: "câu điền số", meaningEn: "Student-Produced Response", example: "Grid-ins are about 25% of Math.", exampleEn: "Grid-ins are about 25% of Math." },
          { word: "Desmos", partOfSpeech: "noun", meaning: "máy tính đồ thị Desmos", meaningEn: "the built-in graphing calculator", example: "Desmos lives inside Bluebook.", exampleEn: "Desmos lives inside Bluebook." },
          { word: "parabola", partOfSpeech: "noun", meaning: "parabol", meaningEn: "graph of a quadratic", example: "Quadratics graph as parabolas.", exampleEn: "Quadratics graph as parabolas." },
          { word: "scatter plot", partOfSpeech: "noun", meaning: "biểu đồ phân tán", meaningEn: "data points on x-y axes", example: "Scatter plots show correlation.", exampleEn: "Scatter plots show correlation." },
          { word: "rounding error", partOfSpeech: "noun", meaning: "lỗi làm tròn", meaningEn: "loss from truncating decimals", example: "Fractions avoid rounding error.", exampleEn: "Fractions avoid rounding error." },
          { word: "scratch work", partOfSpeech: "noun", meaning: "ghi chú nháp", meaningEn: "rough work on paper", example: "Show scratch work for word problems.", exampleEn: "Show scratch work for word problems." },
          { word: "system", partOfSpeech: "noun", meaning: "hệ phương trình", meaningEn: "set of simultaneous equations", example: "Solve the system with Desmos.", exampleEn: "Solve the system with Desmos." },
          { word: "translate", partOfSpeech: "verb", meaning: "chuyển sang phương trình", meaningEn: "convert words to math", example: "Translate the sentence into an equation.", exampleEn: "Translate the sentence into an equation." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền số / từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "Each Math module gives ___ seconds per question.", textEn: "Each Math module gives ___ seconds per question.", answer: "95" },
              { text: "Grid-ins make up about ___% of Math.", textEn: "Grid-ins make up about ___% of Math.", answer: "25" },
              { text: "For repeating decimals, enter at least ___ digits.", textEn: "For repeating decimals, enter at least ___ digits.", answer: "4" },
              { text: "Open ___ once at the start and dock it.", textEn: "Open ___ once at the start and dock it.", answer: "Desmos" }
            ]
          }
        ],
        quiz: [
          { question: "Best Desmos use case:", options: ["3 + 4", "20% of 50", "Solving a 2-variable system", "Average of 4 numbers"], answer: 2, explanation: "Desmos shines on graphical/algebraic systems, not basic arithmetic." },
          { question: "If your answer is 2/3, the safest entry is:", options: ["0.66", "0.6", "2/3", "0.7"], answer: 2, explanation: "Direct fraction entry avoids rounding loss in repeating decimals." },
          { question: "By minute 15 of a Math module you should have done about question:", options: ["5", "11", "15", "20"], answer: 1, explanation: "First wave targets 11 questions in the first 15 minutes." }
        ]
      }
    ]
  },
  {
    id: "sat-error-log-method",
    title: "Phương pháp Error Log",
    titleEn: "Error Log Methodology",
    icon: "🧾",
    color: "from-emerald-500 to-teal-600",
    description: "Phân loại lỗi 3 nhóm và cách re-do để bứt phá 50–100 điểm.",
    descriptionEn: "3-bucket error classification and re-do system for a 50–100 point jump.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-error-log-three-buckets",
        title: "3 nhóm lỗi: Không biết / Biết-sai / Bất cẩn",
        titleEn: "3 Error Buckets: Don't-Know / Knew-Missed / Careless",
        level: 4,
        difficulty: "intermediate",
        theory:
          "Mọi câu sai trong mock test phải được phân loại trong 24h vào 1 trong 3 nhóm:\n\n1) DON'T-KNOW: thiếu kiến thức (vd: chưa biết quy tắc semicolon). Hành động: học lại bài lý thuyết tương ứng.\n\n2) KNEW-MISSED: biết kiến thức nhưng đọc nhầm hoặc chọn sai logic. Hành động: viết lại reasoning đúng và làm 5 câu cùng dạng.\n\n3) CARELESS: hiểu, làm đúng, nhưng bấm nhầm hoặc vội. Hành động: ghi vào ‘checklist 30 giây cuối’ trước khi nộp module.\n\nMục tiêu: sau 4 tuần, nhóm 3 phải về < 1 câu/mock; nhóm 2 < 3 câu/mock. Đó là lúc điểm bứt phá.",
        theoryEn:
          "Every miss in a mock must be classified within 24 hours into one of 3 buckets:\n\n1) DON'T-KNOW: missing knowledge (e.g. you didn't know the semicolon rule). Action: re-study the matching lesson.\n\n2) KNEW-MISSED: you knew it but misread or chose wrong logic. Action: rewrite the correct reasoning and drill 5 same-type items.\n\n3) CARELESS: you understood, solved correctly, but misclicked or rushed. Action: add to your 'final 30-second checklist' before submitting the module.\n\nTarget: after 4 weeks, bucket 3 should be < 1/mock and bucket 2 < 3/mock. That's when the score jumps.",
        proTips: [
          "Dùng Google Sheet với 6 cột: # / Question type / Bucket / WHY wrong / CORRECT reasoning / Re-do date.",
          "Đặt lịch re-do mỗi câu sau đúng 7 ngày - kiểm tra long-term memory.",
          "Đếm tỉ lệ 3 nhóm mỗi tuần và vẽ biểu đồ - visual giúp duy trì kỷ luật."
        ],
        proTipsEn: [
          "Use a 6-column Google Sheet: # / Question type / Bucket / WHY wrong / CORRECT reasoning / Re-do date.",
          "Schedule a re-do exactly 7 days later to test long-term retention.",
          "Track the 3-bucket ratio weekly on a chart - visualization sustains discipline."
        ],
        vocabulary: [
          { word: "error log", partOfSpeech: "noun", meaning: "nhật ký lỗi", meaningEn: "structured record of mistakes", example: "An error log is a top-scorer's secret.", exampleEn: "An error log is a top-scorer's secret." },
          { word: "bucket", partOfSpeech: "noun", meaning: "nhóm phân loại", meaningEn: "category", example: "Sort each miss into a bucket.", exampleEn: "Sort each miss into a bucket." },
          { word: "reasoning", partOfSpeech: "noun", meaning: "lập luận", meaningEn: "the logic behind an answer", example: "Write the correct reasoning, not just the answer.", exampleEn: "Write the correct reasoning, not just the answer." },
          { word: "careless", partOfSpeech: "adjective", meaning: "bất cẩn", meaningEn: "lacking attention", example: "A careless miss costs the same as a hard one.", exampleEn: "A careless miss costs the same as a hard one." },
          { word: "retention", partOfSpeech: "noun", meaning: "khả năng nhớ lâu", meaningEn: "long-term memory of material", example: "Spaced re-dos build retention.", exampleEn: "Spaced re-dos build retention." },
          { word: "drill", partOfSpeech: "verb", meaning: "luyện đi luyện lại", meaningEn: "to practice intensively", example: "Drill 5 same-type items after a miss.", exampleEn: "Drill 5 same-type items after a miss." },
          { word: "discipline", partOfSpeech: "noun", meaning: "kỷ luật", meaningEn: "consistent practice habits", example: "Score gains follow discipline.", exampleEn: "Score gains follow discipline." },
          { word: "checklist", partOfSpeech: "noun", meaning: "danh mục kiểm tra", meaningEn: "list of items to verify", example: "Run a 30-second checklist before submitting.", exampleEn: "Run a 30-second checklist before submitting." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "Errors caused by missing knowledge belong to the ___ bucket.", textEn: "Errors caused by missing knowledge belong to the ___ bucket.", answer: "don't-know" },
              { text: "Misclicks and rushed mistakes belong to the ___ bucket.", textEn: "Misclicks and rushed mistakes belong to the ___ bucket.", answer: "careless" },
              { text: "After 4 weeks, careless misses should drop below ___ per mock.", textEn: "After 4 weeks, careless misses should drop below ___ per mock.", answer: "1" },
              { text: "Re-do every missed item exactly ___ days later.", textEn: "Re-do every missed item exactly ___ days later.", answer: "7" }
            ]
          }
        ],
        quiz: [
          { question: "Which bucket gets fixed by re-studying a lesson?", options: ["Don't-know", "Careless", "Knew-missed", "Lucky guess"], answer: 0, explanation: "Don't-know misses signal a knowledge gap that requires re-learning." },
          { question: "The fastest score jump usually comes from eliminating which bucket?", options: ["Don't-know", "Careless", "Knew-missed", "All equal"], answer: 1, explanation: "Careless misses are 'free points' - easiest to claw back." },
          { question: "A useful column in the error-log sheet is:", options: ["Favourite color", "WHY wrong", "Test-day outfit", "Snack list"], answer: 1, explanation: "Articulating WHY you were wrong cements the correction." }
        ]
      }
    ]
  },
  {
    id: "sat-bluebook-tooling",
    title: "Bluebook Tooling Mastery",
    titleEn: "Bluebook Tooling Mastery",
    icon: "🛠️",
    color: "from-violet-500 to-indigo-600",
    description: "Annotate, Mark for Review, Reference Sheet, Desmos - 4 công cụ then chốt.",
    descriptionEn: "Annotate, Mark for Review, Reference Sheet, Desmos - the 4 critical tools.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-bluebook-four-tools",
        title: "4 công cụ Bluebook bạn phải thuộc",
        titleEn: "4 Bluebook Tools You Must Master",
        level: 3,
        difficulty: "beginner",
        theory:
          "Bluebook là phần mềm thi của College Board (laptop/iPad). 4 công cụ then chốt:\n\n1) ANNOTATE: bôi đậm + ghi chú trên đoạn văn (R&W). Dùng để khoanh vùng evidence và chống ‘mất chỗ’.\n\n2) MARK FOR REVIEW: gắn cờ câu khó để quay lại. Đèn flag không trừ điểm.\n\n3) REFERENCE SHEET (Math): chứa diện tích, thể tích, công thức tam giác đặc biệt. Bạn cần thuộc thêm 5 công thức KHÔNG có (vd discriminant, distance formula).\n\n4) DESMOS: máy tính đồ thị tích hợp. Dock ngay từ câu 1 và để mở suốt module.\n\nMẹo navigation: phím tắt ‘N’ = next, ‘B’ = back, ‘M’ = mark. Học thuộc → tiết kiệm 30–60 giây/module.",
        theoryEn:
          "Bluebook is the College Board's testing app (laptop/iPad). 4 critical tools:\n\n1) ANNOTATE: highlight + add notes on R&W passages. Use it to bracket evidence and never 'lose your place'.\n\n2) MARK FOR REVIEW: flag a hard question for return. The flag does NOT cost points.\n\n3) REFERENCE SHEET (Math): contains area, volume, special-triangle formulas. You must memorize 5 formulas it does NOT include (e.g. discriminant, distance formula).\n\n4) DESMOS: built-in graphing calculator. Dock it from Q1 and leave it open all module.\n\nNavigation tip: shortcuts 'N' = next, 'B' = back, 'M' = mark. Memorize them → save 30–60 seconds per module.",
        proTips: [
          "Chỉ highlight ≤ 5 từ mỗi câu - nhiều quá thành nhiễu.",
          "Tuyệt đối không dùng giấy nháp cho R&W - Annotate nhanh hơn.",
          "5 công thức nên thuộc: discriminant, quadratic formula, distance, midpoint, slope."
        ],
        proTipsEn: [
          "Highlight ≤ 5 words per question - more becomes noise.",
          "Never use scratch paper for R&W - Annotate is faster.",
          "5 must-memorize formulas: discriminant, quadratic formula, distance, midpoint, slope."
        ],
        vocabulary: [
          { word: "Bluebook", partOfSpeech: "noun", meaning: "phần mềm thi SAT", meaningEn: "College Board's official test app", example: "All Digital SATs run on Bluebook.", exampleEn: "All Digital SATs run on Bluebook." },
          { word: "annotate", partOfSpeech: "verb", meaning: "bôi đậm/ghi chú", meaningEn: "to highlight or add notes", example: "Annotate evidence as you read.", exampleEn: "Annotate evidence as you read." },
          { word: "discriminant", partOfSpeech: "noun", meaning: "biệt thức (b²-4ac)", meaningEn: "the quadratic discriminant", example: "The discriminant tells you root count.", exampleEn: "The discriminant tells you root count." },
          { word: "midpoint", partOfSpeech: "noun", meaning: "trung điểm", meaningEn: "average of two coordinates", example: "Use the midpoint formula.", exampleEn: "Use the midpoint formula." },
          { word: "shortcut", partOfSpeech: "noun", meaning: "phím tắt", meaningEn: "keyboard hotkey", example: "Bluebook shortcuts save time.", exampleEn: "Bluebook shortcuts save time." },
          { word: "dock", partOfSpeech: "verb", meaning: "neo cố định", meaningEn: "fix a window in place", example: "Dock Desmos to the right side.", exampleEn: "Dock Desmos to the right side." },
          { word: "flag", partOfSpeech: "noun", meaning: "cờ đánh dấu", meaningEn: "review marker", example: "A flag costs no points.", exampleEn: "A flag costs no points." },
          { word: "navigation", partOfSpeech: "noun", meaning: "điều hướng", meaningEn: "moving between questions", example: "Master Bluebook navigation.", exampleEn: "Master Bluebook navigation." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "Use ___ to highlight evidence in R&W passages.", textEn: "Use ___ to highlight evidence in R&W passages.", answer: "Annotate" },
              { text: "The Bluebook shortcut for next question is ___.", textEn: "The Bluebook shortcut for next question is ___.", answer: "N" },
              { text: "The reference sheet does NOT include the ___ formula.", textEn: "The reference sheet does NOT include the ___ formula.", answer: "discriminant" },
              { text: "Open Desmos at Q1 and ___ it for the whole module.", textEn: "Open Desmos at Q1 and ___ it for the whole module.", answer: "dock" }
            ]
          }
        ],
        quiz: [
          { question: "Mark for Review:", options: ["Subtracts 1 point", "Locks the answer", "Carries no penalty", "Pauses the module"], answer: 2, explanation: "Flagging is a free navigation aid." },
          { question: "Best place to do Math scratch work:", options: ["Inside Annotate", "On scratch paper", "On the Desmos screen", "In the question text"], answer: 1, explanation: "Math allows scratch paper; R&W relies on Annotate instead." },
          { question: "Which formula must you memorize (NOT on the sheet)?", options: ["Area of a circle", "Volume of a cylinder", "Distance formula", "Pythagorean theorem"], answer: 2, explanation: "The reference sheet omits distance, midpoint, slope, discriminant, and quadratic formula." }
        ]
      }
    ]
  }
];

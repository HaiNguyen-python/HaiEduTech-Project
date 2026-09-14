// SAT Expansion 12 - adds 3 thematic modules × 5 lessons each (15 new lessons).
// Focus: high-yield Digital SAT topics that prior expansions did not cover deeply.
//   1) R&W · Cross-text Connections & Dual-Passage strategy
//   2) Math · Word Problems & Data Interpretation
//   3) Test-Day Strategy · Pacing, Guessing, Calculator Use
import type { LanguageModule } from "./types";

export const satExpansionModules12: LanguageModule[] = [
  // ════════════════ 1. R&W · Cross-text Connections & Dual-Passage
  {
    id: "sat-rw-cross-text-pack",
    title: "SAT R&W · Cross-text Connections & Dual-Passage",
    titleEn: "SAT R&W · Cross-text Connections & Dual-Passage",
    icon: "🔗",
    color: "from-indigo-500/15 to-purple-600/15",
    description: "Gói 5 bài luyện so sánh hai đoạn văn - dạng câu hỏi 'điểm chung / khác biệt' xuất hiện thường xuyên trong Digital SAT.",
    descriptionEn: "Five lessons drilling the dual-passage / cross-text comparison questions that appear in every Digital SAT module.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-ct-1-warmup",
        title: "Bài 1 · Làm quen với câu hỏi 'cross-text'",
        titleEn: "Lesson 1 · Meet the Cross-text Question",
        level: 2,
        difficulty: "beginner",
        theory: "Câu hỏi cross-text cho HAI đoạn ngắn (Text 1 & Text 2) và hỏi tác giả Text 2 sẽ phản ứng thế nào với Text 1. Bước 1: tóm tắt mỗi đoạn bằng 1 câu. Bước 2: xác định MỐI QUAN HỆ - đồng tình, phản bác, bổ sung, hay trung lập.",
        theoryEn: "Cross-text items give TWO short passages and ask how the author of Text 2 would respond to Text 1. Step 1: one-sentence summary of each. Step 2: name the RELATIONSHIP - agree, rebut, extend, or neutral.",
        proTips: [
          "Luôn đọc Text 2 trước câu hỏi - ý kiến của tác giả 2 là chìa khóa.",
          "Đáp án đúng thường KHÔNG nói 'hoàn toàn đồng ý' hoặc 'phản bác hoàn toàn' - sắc thái mới đúng SAT.",
        ],
        proTipsEn: [
          "Read Text 2 with the question in mind - its author's stance is the key.",
          "Correct answers are rarely 'totally agree' or 'totally reject' - nuanced is SAT-correct.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền mối quan hệ phù hợp (agree / rebut / extend / neutral):",
            instructionEn: "Fill in the relationship (agree / rebut / extend / neutral):",
            sentences: [
              { text: "Text 1: 'Phones harm focus.' Text 2: 'Phones harm focus AND sleep.' → ___", textEn: "Text 1: 'Phones harm focus.' Text 2: 'Phones harm focus AND sleep.' → ___", answer: "extend" },
              { text: "Text 1: 'AI replaces jobs.' Text 2: 'AI creates more jobs than it removes.' → ___", textEn: "Text 1: 'AI replaces jobs.' Text 2: 'AI creates more jobs than it removes.' → ___", answer: "rebut" },
              { text: "Text 1: 'Coffee boosts memory.' Text 2: 'Coffee boosts memory in adults.' → ___", textEn: "Text 1: 'Coffee boosts memory.' Text 2: 'Coffee boosts memory in adults.' → ___", answer: "agree" },
            ],
          },
        ],
        quiz: [
          { question: "Step 1 of a cross-text question is to…", options: ["Pick the longest option", "Summarise each text in one sentence", "Re-read Text 1 only", "Skip Text 2"], answer: 1, explanation: "Always begin with a one-sentence summary of BOTH texts." },
          { question: "Nuanced SAT answers usually…", options: ["use 'always' and 'never'", "qualify with 'partly' or 'while accepting…, would object…'", "ignore Text 2", "copy Text 1 verbatim"], answer: 1, explanation: "SAT prefers qualified, nuanced phrasings." },
          { question: "If Text 2 adds new evidence supporting Text 1, the relationship is…", options: ["rebut", "extend", "neutral", "contradict"], answer: 1, explanation: "Adding supporting evidence = extend." },
          { question: "Author of Text 2 'would most likely respond by…' - what to look for?", options: ["Their tone and key claim", "Their vocabulary", "How long Text 2 is", "Their job title"], answer: 0, explanation: "Tone + central claim drive the predicted reaction." },
        ],
      },
      {
        id: "sat-ct-2-agree-disagree",
        title: "Bài 2 · Đồng tình hay phản bác? - Phân biệt nhanh",
        titleEn: "Lesson 2 · Agree vs Disagree - Quick Telltales",
        level: 3,
        difficulty: "intermediate",
        theory: "Tín hiệu PHẢN BÁC: 'however', 'in contrast', 'overlooks', 'fails to account for'. Tín hiệu ĐỒNG TÌNH: 'similarly', 'echoes', 'reinforces'. Hãy gạch chân tín hiệu đầu tiên xuất hiện trong Text 2.",
        theoryEn: "Disagreement signals: 'however', 'in contrast', 'overlooks', 'fails to account for'. Agreement signals: 'similarly', 'echoes', 'reinforces'. Underline the FIRST such signal in Text 2.",
        proTips: ["Tín hiệu 'yet', 'still', 'nevertheless' thường báo phản bác nhẹ - chọn đáp án có 'qualified disagreement'."],
        proTipsEn: ["'yet', 'still', 'nevertheless' usually flag a mild rebuttal - pick a 'qualified disagreement' answer."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Tín hiệu này báo hiệu mối quan hệ gì? (agree / disagree)",
            instructionEn: "What relationship does each signal flag? (agree / disagree)",
            sentences: [
              { text: "'However, the study overlooks…' → ___", textEn: "'However, the study overlooks…' → ___", answer: "disagree" },
              { text: "'Similarly, recent data show…' → ___", textEn: "'Similarly, recent data show…' → ___", answer: "agree" },
              { text: "'Such a view fails to account for…' → ___", textEn: "'Such a view fails to account for…' → ___", answer: "disagree" },
              { text: "'This finding reinforces the earlier claim that…' → ___", textEn: "'This finding reinforces the earlier claim that…' → ___", answer: "agree" },
            ],
          },
        ],
        quiz: [
          { question: "'Nevertheless' most likely signals…", options: ["full agreement", "qualified disagreement", "neutral tone", "topic change"], answer: 1, explanation: "'Nevertheless' = 'despite that' → mild rebuttal." },
          { question: "Which option fits 'qualified disagreement'?", options: ["'completely refutes Text 1'", "'while accepting X, would argue Y'", "'echoes Text 1 perfectly'", "'ignores Text 1'"], answer: 1, explanation: "Qualified = accepts something, pushes back on the rest." },
          { question: "'Echoes' best maps to…", options: ["disagree", "agree", "extend", "neutral"], answer: 1, explanation: "Echo = repeats / agrees with." },
          { question: "Best first action on a cross-text question is to…", options: ["read every option twice", "underline the first signal word in Text 2", "translate every word", "skip Text 1"], answer: 1, explanation: "The first signal word usually fixes the relationship." },
        ],
      },
      {
        id: "sat-ct-3-evidence-pairs",
        title: "Bài 3 · Cặp bằng chứng - đoạn nào hỗ trợ đoạn nào?",
        titleEn: "Lesson 3 · Evidence Pairs - Which Text Supports Which?",
        level: 3,
        difficulty: "intermediate",
        theory: "Một số câu hỏi đưa MỘT TUYÊN BỐ và bốn câu trích từ hai đoạn. Bạn phải chọn câu nào HỖ TRỢ TRỰC TIẾP tuyên bố. Quy tắc: đáp án đúng phải dùng đúng KEYWORDS của tuyên bố, không suy diễn.",
        theoryEn: "Some items give ONE claim and four quotes drawn from two texts. Pick the quote that DIRECTLY supports the claim. Rule: the correct quote must hit the EXACT keywords of the claim - no inference.",
        proTips: ["Loại ngay đáp án 'đúng nhưng lệch chủ đề' - bẫy phổ biến nhất trong SAT."],
        proTipsEn: ["Eliminate options that are 'true but off-topic' - the SAT's favourite trap."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền 'supports' hoặc 'off-topic':",
            instructionEn: "Fill 'supports' or 'off-topic':",
            sentences: [
              { text: "Claim: bees navigate by polarised light. Quote: 'Bees orient by polarised light patterns.' → ___", textEn: "Claim: bees navigate by polarised light. Quote: 'Bees orient by polarised light patterns.' → ___", answer: "supports" },
              { text: "Claim: bees navigate by polarised light. Quote: 'Bees pollinate crops worldwide.' → ___", textEn: "Claim: bees navigate by polarised light. Quote: 'Bees pollinate crops worldwide.' → ___", answer: "off-topic" },
            ],
          },
        ],
        quiz: [
          { question: "Best evidence = quote that…", options: ["sounds smartest", "uses the claim's exact keywords", "is the longest", "is from Text 1"], answer: 1, explanation: "Direct keyword overlap beats inference." },
          { question: "The classic SAT trap is a quote that is…", options: ["false but on-topic", "true but off-topic", "non-English", "too short"], answer: 1, explanation: "True but off-topic answers are the most common decoy." },
          { question: "If two quotes both touch the keywords, pick the one that is…", options: ["shorter", "more specific to the claim", "from Text 2", "with a number"], answer: 1, explanation: "Specificity to the claim wins." },
          { question: "Inference-based 'best evidence' answers are usually…", options: ["correct", "wrong on SAT", "neutral", "ambiguous"], answer: 1, explanation: "SAT 'best evidence' favours direct support, not inference." },
        ],
      },
      {
        id: "sat-ct-4-perspective-shift",
        title: "Bài 4 · Quan điểm dịch chuyển - 'most likely respond'",
        titleEn: "Lesson 4 · Perspective Shift - 'Most Likely Respond'",
        level: 4,
        difficulty: "advanced",
        theory: "Câu hỏi 'most likely respond' đòi bạn DỰ ĐOÁN phản ứng của tác giả Text 2 với tuyên bố trong Text 1. Phương pháp 3 bước: (1) đọc lập trường Text 2, (2) ánh xạ lập trường đó vào tuyên bố Text 1, (3) chọn đáp án có sắc thái khớp nhất.",
        theoryEn: "'Most likely respond' items ask you to PREDICT how Text 2's author would react to a claim in Text 1. Three steps: (1) read Text 2's stance, (2) map that stance onto the Text 1 claim, (3) pick the option with the matching nuance.",
        proTips: ["Đáp án đúng thường bắt đầu bằng 'argue that', 'suggest that' + nội dung Text 2 - không lặp lại Text 1."],
        proTipsEn: ["Correct answers usually start with 'argue that' / 'suggest that' + Text 2's content - never just paraphrase Text 1."],
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp lại quy trình 3 bước cho dạng 'most likely respond':",
            instructionEn: "Re-order the 3 steps:",
            items: [
              { scrambled: ["Pick the option with matching nuance", "Map Text 2's stance onto Text 1's claim", "Read Text 2's stance"], correct: "Read Text 2's stance, Map Text 2's stance onto Text 1's claim, Pick the option with matching nuance" },
            ],
          },
        ],
        quiz: [
          { question: "First thing to read on a 'most likely respond' item?", options: ["Text 1 only", "Text 2's stance", "All four options", "The question stem only"], answer: 1, explanation: "Text 2's stance drives the predicted response." },
          { question: "The correct answer usually paraphrases…", options: ["Text 1", "Text 2", "neither", "the question stem"], answer: 1, explanation: "Predicted response = author of Text 2 → paraphrase Text 2." },
          { question: "Trap option for this dataset?", options: ["A view neither text supports", "An exact echo of Text 1", "A nuanced disagreement", "A qualified agreement"], answer: 1, explanation: "Echoing Text 1 ignores Text 2's perspective - classic trap." },
          { question: "Nuanced answers usually contain…", options: ["'always' / 'never'", "'while', 'although', 'partly'", "no qualifiers", "rhetorical questions"], answer: 1, explanation: "Qualifiers = SAT's preferred nuance." },
        ],
      },
      {
        id: "sat-ct-5-timed-set",
        title: "Bài 5 · Cross-text - Bộ luyện bấm giờ 60 giây/câu",
        titleEn: "Lesson 5 · Cross-text - 60-Second Timed Drill",
        level: 5,
        difficulty: "advanced",
        theory: "Mục tiêu: 60 giây/câu cross-text. Phân bổ: 20s đọc Text 1, 20s đọc Text 2, 20s chọn đáp án. Nếu chưa chắc sau 50s, loại 2 đáp án yếu nhất rồi chọn - đừng bỏ trống (Digital SAT không trừ điểm sai).",
        theoryEn: "Target: 60s per cross-text item. Budget: 20s on Text 1, 20s on Text 2, 20s on options. Unsure at 50s? Eliminate the two weakest options and pick - never leave blank (Digital SAT has no wrong-answer penalty).",
        proTips: ["Đánh dấu (mark for review) và quay lại sau nếu còn thời gian."],
        proTipsEn: ["Use 'Mark for Review' and return later if time allows."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành chiến thuật:",
            instructionEn: "Complete the strategy:",
            sentences: [
              { text: "Budget per cross-text item: ___ seconds.", textEn: "Budget per cross-text item: ___ seconds.", answer: "60" },
              { text: "Never leave a Digital SAT question ___.", textEn: "Never leave a Digital SAT question ___.", answer: "blank" },
            ],
          },
        ],
        quiz: [
          { question: "Best time budget for cross-text?", options: ["30s", "60s", "120s", "180s"], answer: 1, explanation: "60s keeps pace for the R&W module." },
          { question: "If you're unsure at 50s, you should…", options: ["leave blank", "guess randomly", "eliminate weakest + pick", "skip whole section"], answer: 2, explanation: "Eliminate then guess - Digital SAT has no penalty." },
          { question: "On Digital SAT, blank answers earn…", options: ["+1", "0 (and lose chance)", "−0.25", "+0.5"], answer: 1, explanation: "Always answer - no penalty for wrong, but blanks earn nothing." },
          { question: "'Mark for Review' lets you…", options: ["skip permanently", "return later in the module", "remove the question", "auto-answer"], answer: 1, explanation: "Mark + return is a built-in pacing tool." },
        ],
      },
    ],
  },

  // ════════════════ 2. MATH · Word Problems & Data Interpretation
  {
    id: "sat-math-word-problems-pack",
    title: "SAT Math · Word Problems & Data Interpretation",
    titleEn: "SAT Math · Word Problems & Data Interpretation",
    icon: "🧮",
    color: "from-amber-500/15 to-orange-600/15",
    description: "5 bài luyện chuyển bài toán đố sang phương trình và đọc bảng / biểu đồ - dạng chiếm ~30% Math.",
    descriptionEn: "Five lessons converting word problems into equations and decoding tables / charts - ~30% of the Math section.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-mwp-1-translate",
        title: "Bài 1 · Dịch câu chữ thành phương trình",
        titleEn: "Lesson 1 · Translating Words into Equations",
        level: 2,
        difficulty: "beginner",
        theory: "Bảng dịch nhanh: 'is/equals' → =, 'of' → ×, 'more than' → +, 'less than' → − (chú ý đảo chiều: 'x less than y' = y − x), 'per' → ÷, 'twice' → 2×.",
        theoryEn: "Quick map: 'is/equals' → =, 'of' → ×, 'more than' → +, 'less than' → − (mind reversal: 'x less than y' = y − x), 'per' → ÷, 'twice' → 2×.",
        proTips: ["Đặt biến rõ ràng ngay câu đầu: 'Let x = number of pens'."],
        proTipsEn: ["Define your variable first: 'Let x = number of pens'."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Viết phương trình:",
            instructionEn: "Write the equation:",
            sentences: [
              { text: "5 less than twice x equals 17 → ___", textEn: "5 less than twice x equals 17 → ___", answer: "2x-5=17" },
              { text: "30% of y is 12 → ___", textEn: "30% of y is 12 → ___", answer: "0.3y=12" },
              { text: "The sum of x and 3y is 20 → ___", textEn: "The sum of x and 3y is 20 → ___", answer: "x+3y=20" },
            ],
          },
        ],
        quiz: [
          { question: "'7 less than x' equals…", options: ["7-x", "x-7", "x+7", "-x-7"], answer: 1, explanation: "'A less than B' = B − A." },
          { question: "'25% of n is 10' →", options: ["0.25n=10", "n/25=10", "25n=10", "n+0.25=10"], answer: 0, explanation: "Percent → decimal × variable." },
          { question: "'Twice the difference of x and 4' =", options: ["2x-4", "2(x-4)", "x-8", "2x+4"], answer: 1, explanation: "Parentheses preserve 'difference' before doubling." },
          { question: "Step 1 of any word problem:", options: ["Solve immediately", "Define the variable", "Guess and check", "Plug answers in"], answer: 1, explanation: "Naming the variable prevents 80% of mistakes." },
        ],
      },
      {
        id: "sat-mwp-2-rates",
        title: "Bài 2 · Tỉ lệ, tốc độ & đơn vị",
        titleEn: "Lesson 2 · Rates, Speeds & Units",
        level: 3,
        difficulty: "intermediate",
        theory: "Công thức gốc: distance = rate × time. Luôn ép đơn vị về cùng hệ (km/h ↔ m/s: ×1000/3600). Khi gặp 'how long', cô lập time = distance / rate.",
        theoryEn: "Master formula: distance = rate × time. Always reconcile units (km/h ↔ m/s: ×1000/3600). For 'how long', isolate time = distance / rate.",
        proTips: ["Gạch chân ĐƠN VỊ trong câu hỏi trước khi tính."],
        proTipsEn: ["Underline the requested UNIT before computing."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền giá trị:",
            instructionEn: "Fill in the value:",
            sentences: [
              { text: "A car drives 120 km in 2 h. Speed = ___ km/h.", textEn: "A car drives 120 km in 2 h. Speed = ___ km/h.", answer: "60" },
              { text: "Convert 72 km/h to m/s → ___ m/s.", textEn: "Convert 72 km/h to m/s → ___ m/s.", answer: "20" },
              { text: "Time to walk 6 km at 4 km/h = ___ hours.", textEn: "Time to walk 6 km at 4 km/h = ___ hours.", answer: "1.5" },
            ],
          },
        ],
        quiz: [
          { question: "If r = 30 mph and t = 2.5 h, d = ?", options: ["12", "32.5", "75", "60"], answer: 2, explanation: "30 × 2.5 = 75 mi." },
          { question: "54 km/h in m/s?", options: ["10", "15", "20", "5"], answer: 1, explanation: "54 × 1000 / 3600 = 15." },
          { question: "Asked 'minutes' but rate is per hour - first step?", options: ["Solve in hours, ignore unit", "Convert hours to minutes (×60)", "Convert km to miles", "Use rate × rate"], answer: 1, explanation: "Match the answer's unit." },
          { question: "If a printer prints 5 pages/min, 200 pages takes…", options: ["20 min", "40 min", "100 min", "1000 min"], answer: 1, explanation: "200 ÷ 5 = 40 min." },
        ],
      },
      {
        id: "sat-mwp-3-percent-change",
        title: "Bài 3 · Phần trăm & tăng / giảm",
        titleEn: "Lesson 3 · Percent & Percent Change",
        level: 3,
        difficulty: "intermediate",
        theory: "Tăng x% → ×(1 + x/100). Giảm x% → ×(1 − x/100). 'Percent change' = (new − old)/old × 100. CẢNH BÁO: tăng 20% rồi giảm 20% KHÔNG về số ban đầu (1.2 × 0.8 = 0.96).",
        theoryEn: "Increase by x% → ×(1 + x/100). Decrease by x% → ×(1 − x/100). Percent change = (new − old)/old × 100. WARNING: +20% then −20% does NOT return the original (1.2 × 0.8 = 0.96).",
        proTips: ["Sau khi tính xong, hỏi: 'Đây là phần trăm OF gì?' Cơ sở (base) là gốc của lỗi sai."],
        proTipsEn: ["After computing, ask 'percent OF what?' The base is the #1 trap."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Tính:",
            instructionEn: "Compute:",
            sentences: [
              { text: "200 increased by 15% = ___", textEn: "200 increased by 15% = ___", answer: "230" },
              { text: "Price drops from 80 to 60. Percent change = ___ %.", textEn: "Price drops from 80 to 60. Percent change = ___ %.", answer: "-25" },
              { text: "1.2 × 0.8 = ___", textEn: "1.2 × 0.8 = ___", answer: "0.96" },
            ],
          },
        ],
        quiz: [
          { question: "Item costs $50; raised by 40%. New price?", options: ["$70", "$90", "$20", "$54"], answer: 0, explanation: "50 × 1.4 = 70." },
          { question: "From 250 to 200, percent change?", options: ["−25%", "−20%", "+20%", "−50%"], answer: 1, explanation: "(200−250)/250 = −0.2 = −20%." },
          { question: "+50% then −50% returns…", options: ["100% original", "75% original", "125% original", "0"], answer: 1, explanation: "1.5 × 0.5 = 0.75 → lose 25%." },
          { question: "'12 is what percent of 80?' →", options: ["15%", "12%", "20%", "8%"], answer: 0, explanation: "12/80 = 0.15 = 15%." },
        ],
      },
      {
        id: "sat-mwp-4-tables",
        title: "Bài 4 · Đọc bảng & biểu đồ - quy trình 4 bước",
        titleEn: "Lesson 4 · Reading Tables & Charts - 4-Step Routine",
        level: 4,
        difficulty: "advanced",
        theory: "Quy trình: (1) Đọc TIÊU ĐỀ bảng / trục, (2) Xác định ĐƠN VỊ, (3) Khoanh hàng / cột câu hỏi nhắc đến, (4) Chỉ tính sau khi cô lập số liệu. Sai số phổ biến: nhầm 'thousands' với đơn vị, hoặc đọc nhầm cột.",
        theoryEn: "Routine: (1) Read TITLE & axis labels, (2) Check the UNITS, (3) Circle the row/column the question mentions, (4) Only compute after isolating the figure. Common errors: missing 'in thousands' suffix, mis-reading the column.",
        proTips: ["Câu hỏi 'best supports' về dữ liệu - chọn ô có giá trị EXTREME (cao/thấp nhất) khớp tuyên bố."],
        proTipsEn: ["For 'best supports' data questions - pick the EXTREME value cell that matches the claim."],
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp lại quy trình 4 bước:",
            instructionEn: "Re-order the 4 steps:",
            items: [
              { scrambled: ["Compute after isolating the figure", "Read TITLE and axis labels", "Circle the row/column", "Check UNITS"], correct: "Read TITLE and axis labels, Check UNITS, Circle the row/column, Compute after isolating the figure" },
            ],
          },
        ],
        quiz: [
          { question: "First step on any table / chart question:", options: ["Compute", "Read title & axis labels", "Skip to options", "Estimate"], answer: 1, explanation: "Title + axes anchor the data." },
          { question: "'Values in thousands' means the number 4 represents…", options: ["4", "40", "400", "4,000"], answer: 3, explanation: "Always multiply by the suffix." },
          { question: "'Best supports claim X' - pick the cell that…", options: ["matches X's keywords + extreme value", "is closest to the average", "is the smallest", "is in the first row"], answer: 0, explanation: "Match keywords + magnitude." },
          { question: "Step 3 of the routine is to…", options: ["Compute", "Read title", "Circle the row/column", "Check units"], answer: 2, explanation: "Circle isolates the right data point." },
        ],
      },
      {
        id: "sat-mwp-5-mixed-set",
        title: "Bài 5 · Bộ câu hỏi hỗn hợp bấm giờ 90 giây/câu",
        titleEn: "Lesson 5 · Mixed Word-Problem Set (90s/item)",
        level: 5,
        difficulty: "advanced",
        theory: "Mục tiêu: 90 giây / câu Math word problem. Chiến thuật: 30s đọc + đặt biến, 30s lập phương trình, 30s giải. Quá 90s mà chưa xong: 'Mark for Review' + đoán có loại trừ.",
        theoryEn: "Target: 90s per Math word problem. Plan: 30s read + define variable, 30s set up, 30s solve. Over 90s? Mark for Review + eliminate-then-guess.",
        proTips: ["Câu khó dài quá → thử PLUG IN answer choices, nhanh hơn lập phương trình."],
        proTipsEn: ["Stuck on a long item? Try PLUGGING IN answer choices - often faster than algebra."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành chiến thuật:",
            instructionEn: "Complete the plan:",
            sentences: [
              { text: "Budget per Math word problem: ___ seconds.", textEn: "Budget per Math word problem: ___ seconds.", answer: "90" },
              { text: "Stuck on a long item? Try ___ the answer choices.", textEn: "Stuck on a long item? Try ___ the answer choices.", answer: "plugging in" },
            ],
          },
        ],
        quiz: [
          { question: "Best time budget per word problem?", options: ["30s", "60s", "90s", "180s"], answer: 2, explanation: "90s averages well across the 22-question module." },
          { question: "Plugging in answer choices is fastest when…", options: ["the question is short", "the equation is hard to set up", "no variables given", "options are very large"], answer: 1, explanation: "Plug-in skips the algebra entirely." },
          { question: "If 90s pass with no progress, you should…", options: ["keep grinding", "Mark + eliminate + guess", "leave blank", "redo every step"], answer: 1, explanation: "Never blank - eliminate then guess." },
          { question: "30 / 30 / 30 stands for…", options: ["read / set up / solve", "guess / skip / check", "read / read / read", "always 30 seconds total"], answer: 0, explanation: "Read + setup + solve = 30 each." },
        ],
      },
    ],
  },

  // ════════════════ 3. TEST-DAY STRATEGY · Pacing, Guessing, Calculator
  {
    id: "sat-test-day-strategy-pack",
    title: "SAT Test-Day Strategy · Pacing & Calculator",
    titleEn: "SAT Test-Day Strategy · Pacing & Calculator",
    icon: "⏱️",
    color: "from-rose-500/15 to-pink-600/15",
    description: "5 bài chiến thuật ngày thi: phân bổ thời gian Digital SAT, dùng Bluebook calculator (Desmos), khi nào đoán và khi nào bỏ qua.",
    descriptionEn: "Five test-day strategy lessons: Digital SAT pacing, using the Bluebook calculator (Desmos), when to guess vs skip.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-td-1-format",
        title: "Bài 1 · Tổng quan Digital SAT 2026",
        titleEn: "Lesson 1 · Digital SAT 2026 - The Format",
        level: 1,
        difficulty: "beginner",
        theory: "Digital SAT có 2 phần (R&W và Math), mỗi phần 2 module ADAPTIVE. Module 1 quyết định độ khó Module 2. Tổng: 98 câu / 2h14min. R&W: 64 phút (32 câu × 2). Math: 70 phút (22 câu × 2). KHÔNG trừ điểm sai.",
        theoryEn: "Digital SAT has 2 sections (R&W and Math), each split into 2 ADAPTIVE modules. Module 1 sets the difficulty of Module 2. Total: 98 questions / 2h14min. R&W: 64 min (32 Qs × 2). Math: 70 min (22 Qs × 2). NO wrong-answer penalty.",
        proTips: ["Adaptive: ưu tiên làm tốt Module 1 để lên 'hard module' với trần điểm cao hơn."],
        proTipsEn: ["Adaptive: nail Module 1 to unlock the 'hard module' with a higher score cap."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền số liệu:",
            instructionEn: "Fill in the numbers:",
            sentences: [
              { text: "Total Digital SAT questions: ___", textEn: "Total Digital SAT questions: ___", answer: "98" },
              { text: "R&W time per module: ___ minutes.", textEn: "R&W time per module: ___ minutes.", answer: "32" },
              { text: "Math time per module: ___ minutes.", textEn: "Math time per module: ___ minutes.", answer: "35" },
            ],
          },
        ],
        quiz: [
          { question: "Digital SAT total length:", options: ["1h", "2h14min", "3h", "4h"], answer: 1, explanation: "2 hours 14 minutes including break." },
          { question: "Each section has how many modules?", options: ["1", "2", "3", "4"], answer: 1, explanation: "Two adaptive modules per section." },
          { question: "Module 1 performance determines…", options: ["nothing", "Module 2 difficulty (and score cap)", "raw score only", "section order"], answer: 1, explanation: "Adaptive = M1 routes you to easy or hard M2." },
          { question: "Wrong answers cost…", options: ["−0.25", "−1", "0 (no penalty)", "−0.5"], answer: 2, explanation: "Always guess; no penalty." },
        ],
      },
      {
        id: "sat-td-2-pacing",
        title: "Bài 2 · Phân bổ thời gian từng module",
        titleEn: "Lesson 2 · Per-Module Pacing Budgets",
        level: 2,
        difficulty: "beginner",
        theory: "R&W: 32 câu / 32 phút → 60s/câu. Math: 22 câu / 35 phút → 95s/câu. Chia 3 vùng: câu dễ ≤45s, trung bình ≤90s, khó/'Mark for Review' rồi quay lại ở cuối module.",
        theoryEn: "R&W: 32 items / 32 min → 60s each. Math: 22 items / 35 min → 95s each. 3-tier plan: easy ≤45s, medium ≤90s, hard → 'Mark for Review' and return at module end.",
        proTips: ["Đừng tiếc 1 câu khó: 60s lãng phí = mất 1 câu dễ ở cuối."],
        proTipsEn: ["Never sink time into one hard item: 60s lost = one easy item missed at the end."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành ngân sách thời gian:",
            instructionEn: "Complete the time budget:",
            sentences: [
              { text: "R&W: ___ seconds per question.", textEn: "R&W: ___ seconds per question.", answer: "60" },
              { text: "Math: ___ seconds per question.", textEn: "Math: ___ seconds per question.", answer: "95" },
              { text: "Easy question ceiling: ___ seconds.", textEn: "Easy question ceiling: ___ seconds.", answer: "45" },
            ],
          },
        ],
        quiz: [
          { question: "R&W time-per-item budget?", options: ["30s", "45s", "60s", "90s"], answer: 2, explanation: "60s = 32 min / 32 items." },
          { question: "Math budget per question?", options: ["45s", "60s", "95s", "180s"], answer: 2, explanation: "95s ≈ 35 min / 22 items." },
          { question: "Best move on a tough question after the soft cap?", options: ["push through", "Mark + move on", "leave blank", "redo previous"], answer: 1, explanation: "Mark + come back protects pace." },
          { question: "Lose 60s = lose…", options: ["nothing", "≈ 1 easy item at the end", "the whole module", "the section"], answer: 1, explanation: "Pace debt steals from later easy items." },
        ],
      },
      {
        id: "sat-td-3-desmos",
        title: "Bài 3 · Tận dụng Desmos calculator trên Bluebook",
        titleEn: "Lesson 3 · Mastering the Bluebook (Desmos) Calculator",
        level: 3,
        difficulty: "intermediate",
        theory: "Desmos đồ thị: gõ y = ... để vẽ; gõ phương trình hệ để tìm GIAO ĐIỂM (chấm xanh). Mẹo: chuyển bài toán đại số thành GIAO ĐIỂM hai đồ thị - nhanh và ít sai. Bảng giá trị: thêm 'Table' để duyệt đáp án.",
        theoryEn: "Desmos graphing: type y = … to plot; enter a system to find INTERSECTIONS (blue dots). Tip: convert algebra problems into intersections of two graphs - faster and less error-prone. Use 'Table' to brute-force answer choices.",
        proTips: ["Ẩn / tắt từng phương trình bằng vòng tròn màu để so sánh nhanh."],
        proTipsEn: ["Toggle each equation off via the coloured circle to compare quickly."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền chiến thuật Desmos:",
            instructionEn: "Fill in Desmos strategy:",
            sentences: [
              { text: "To solve a system, find the ___ of the two graphs.", textEn: "To solve a system, find the ___ of the two graphs.", answer: "intersection" },
              { text: "To brute-force answer choices, use a ___ in Desmos.", textEn: "To brute-force answer choices, use a ___ in Desmos.", answer: "table" },
            ],
          },
        ],
        quiz: [
          { question: "Fastest way to solve a 2-equation system in Desmos?", options: ["substitution", "graph and find intersection", "matrix", "guess"], answer: 1, explanation: "Intersection = instant + visual check." },
          { question: "Desmos 'Table' is best for…", options: ["plotting", "brute-forcing answer choices", "drawing axes", "rotating shapes"], answer: 1, explanation: "Plug values in a table column." },
          { question: "Blue dot in Desmos marks…", options: ["origin", "intersection / x-intercept", "max only", "label"], answer: 1, explanation: "Click the curve → blue dot = intersection." },
          { question: "Hiding an equation is done via…", options: ["delete", "the coloured circle toggle", "Ctrl+Z", "menu only"], answer: 1, explanation: "Click the colour dot to toggle visibility." },
        ],
      },
      {
        id: "sat-td-4-guess-skip",
        title: "Bài 4 · Khi nào đoán, khi nào quay lại",
        titleEn: "Lesson 4 · When to Guess, When to Return",
        level: 3,
        difficulty: "intermediate",
        theory: "Không trừ điểm → KHÔNG BAO GIỜ bỏ trống. Quy tắc 3 mức: (A) chắc chắn → đáp ngay; (B) loại được ít nhất 2 đáp án → đoán có chọn lọc; (C) hoàn toàn không hiểu → đoán 1 letter cố định (vd 'C') và Mark.",
        theoryEn: "No penalty → NEVER leave blank. 3-tier rule: (A) sure → answer; (B) eliminated 2+ options → educated guess; (C) clueless → pick one consistent letter (e.g. 'C') and Mark.",
        proTips: ["Đoán cùng 1 letter cho mọi câu C giúp tăng xác suất trúng cluster (≈25%)."],
        proTipsEn: ["Picking ONE consistent letter on C-tier items keeps your blind-guess rate ≈25%."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành quy tắc 3 mức:",
            instructionEn: "Complete the 3-tier rule:",
            sentences: [
              { text: "On Digital SAT, never leave any question ___.", textEn: "On Digital SAT, never leave any question ___.", answer: "blank" },
              { text: "If you can eliminate 2+ options, this is an ___ guess.", textEn: "If you can eliminate 2+ options, this is an ___ guess.", answer: "educated" },
            ],
          },
        ],
        quiz: [
          { question: "Blank answer earns…", options: ["−1", "0", "+1", "+0.5"], answer: 1, explanation: "0 - and you waste the free guess." },
          { question: "Eliminating 2 of 4 options raises guess accuracy to…", options: ["25%", "33%", "50%", "100%"], answer: 2, explanation: "1 of remaining 2 = 50%." },
          { question: "Blind-guess strategy?", options: ["random letter each time", "always the same letter", "skip the question", "ask the proctor"], answer: 1, explanation: "Same letter avoids accidental over-distribution." },
          { question: "'Mark for Review' on a hard item lets you…", options: ["delete the question", "return when easier ones are done", "auto-answer", "report it"], answer: 1, explanation: "Triage tool to protect pace." },
        ],
      },
      {
        id: "sat-td-5-day-of-checklist",
        title: "Bài 5 · Checklist ngày thi (Bluebook · giấy tờ · sức khỏe)",
        titleEn: "Lesson 5 · Test-Day Checklist (Bluebook · ID · Health)",
        level: 2,
        difficulty: "beginner",
        theory: "Tối hôm trước: nạp đầy laptop / tablet, cài Bluebook bản mới nhất, in giấy admission ticket + ID. Sáng thi: ăn no, mang chai nước, đến sớm 30 phút. Không mang phone vào phòng. Đeo đồng hồ analog (Bluebook có timer nội bộ, nhưng đồng hồ giúp pacing tâm lý).",
        theoryEn: "Night before: charge laptop / tablet, update Bluebook to latest build, print admission ticket + ID. Morning: eat well, bring water, arrive 30 min early. No phones in the room. Wear an analog watch (Bluebook has its own timer, but an external watch helps psychological pacing).",
        proTips: ["Chạy 'Exam Setup' trên Bluebook 1–2 ngày trước để tránh bug login."],
        proTipsEn: ["Run Bluebook's 'Exam Setup' 1-2 days before to avoid login bugs."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền checklist:",
            instructionEn: "Fill in the checklist:",
            sentences: [
              { text: "Arrive ___ minutes early.", textEn: "Arrive ___ minutes early.", answer: "30" },
              { text: "Run Bluebook ___ Setup before test day.", textEn: "Run Bluebook ___ Setup before test day.", answer: "Exam" },
              { text: "Phones are ___ during the test.", textEn: "Phones are ___ during the test.", answer: "not allowed" },
            ],
          },
        ],
        quiz: [
          { question: "Earliest you should run Bluebook Exam Setup?", options: ["minute before", "morning of", "1-2 days before", "1 month before"], answer: 2, explanation: "1-2 days = updates + login check without lag." },
          { question: "Recommended arrival buffer?", options: ["5 min", "15 min", "30 min", "60 min"], answer: 2, explanation: "30 min absorbs traffic + check-in." },
          { question: "Phones in the test room are…", options: ["allowed if silent", "not allowed", "allowed for calculator", "checked by proctor"], answer: 1, explanation: "Strictly prohibited." },
          { question: "Why wear an analog watch?", options: ["it's required", "external psychological pacing aid", "Bluebook needs it", "for style"], answer: 1, explanation: "Bluebook times itself; the watch helps you feel pace." },
        ],
      },
    ],
  },
];

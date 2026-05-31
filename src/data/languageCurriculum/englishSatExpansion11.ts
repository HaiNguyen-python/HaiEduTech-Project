// SAT Expansion 11 - Adds 4 thematic modules × 6 lessons each (24 lessons total).
// Balanced 2 beginner + 2 intermediate + 2 advanced per module.
// Groups: Reading & Writing (Inference/Evidence/Words-in-Context),
// Writing & Language (Rhetorical Synthesis / Transitions / Punctuation),
// Math (Algebra / Quadratics / Geometry / Stats),
// Advanced Reading (Science / Social / Literary / Dual-passage).
import type { LanguageModule } from "./types";

export const satExpansionModules11: LanguageModule[] = [
  // ════════════════ 1. READING & WRITING - Inference / Evidence / Words in Context
  {
    id: "sat-rw-inference-evidence-pack",
    title: "SAT R&W · Inference · Evidence · Words-in-Context",
    titleEn: "SAT R&W · Inference · Evidence · Words-in-Context",
    icon: "🔎",
    color: "from-emerald-500 to-teal-600",
    description: "Gói 6 bài luyện ba dạng câu hỏi quan trọng nhất của phần Reading & Writing: Inference, Command of Evidence, và Words in Context.",
    descriptionEn: "Six lessons covering the three highest-yield R&W question types: Inference, Command of Evidence, and Words in Context.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-rw-inf-1-warmup",
        title: "Bài 1 · Đoán nghĩa từ ngữ cảnh (Warm-up)",
        titleEn: "Lesson 1 · Words in Context – Warm-up",
        level: 2,
        difficulty: "beginner",
        theory: "Khi gặp từ in đậm trong đoạn, đừng dịch ngay - hãy thay đáp án vào chỗ trống rồi đọc lại cả câu. Đáp án đúng phải hợp với 'thái độ' của tác giả (khen / chê / trung lập).",
        theoryEn: "When the prompt highlights a word, never translate first - plug each option back in and re-read the full sentence. The right answer must match the author's tone (positive / negative / neutral).",
        proTips: [
          "Đọc câu trước và câu sau để bắt 'tone' của đoạn.",
          "Nếu lưỡng lự, loại 2 đáp án trái cực (opposite) trước.",
        ],
        proTipsEn: [
          "Read one sentence before and after to capture the tone.",
          "If unsure, eliminate the two opposite-tone choices first.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn từ phù hợp nhất điền vào chỗ trống:",
            instructionEn: "Pick the best word for each blank:",
            sentences: [
              { text: "The professor's tone was unexpectedly ___; she praised every answer.", textEn: "The professor's tone was unexpectedly ___; she praised every answer.", answer: "warm" },
              { text: "Despite the criticism, the artist remained ___ about her vision.", textEn: "Despite the criticism, the artist remained ___ about her vision.", answer: "confident" },
              { text: "The results were ___ - not great, not bad, just average.", textEn: "The results were ___ - not great, not bad, just average.", answer: "mediocre" },
              { text: "His ___ apology made it clear he was not truly sorry.", textEn: "His ___ apology made it clear he was not truly sorry.", answer: "halfhearted" },
            ],
          },
        ],
        quiz: [
          { question: "In the passage, 'novel' most nearly means…", options: ["fictional", "new", "famous", "lengthy"], answer: 1, explanation: "'Novel' in SAT context usually means 'new / original', not the book." },
          { question: "Which word would BEST replace 'meticulous' in a positive review?", options: ["lazy", "careless", "precise", "rushed"], answer: 2, explanation: "'Meticulous' = very careful / precise - positive tone." },
          { question: "If the author is criticizing a study, 'flawed' most nearly means…", options: ["perfect", "imperfect", "popular", "expensive"], answer: 1, explanation: "'Flawed' = having weaknesses → matches the critical tone." },
          { question: "Which word completes: 'Her ___ smile reassured the nervous students.'", options: ["smug", "gentle", "mocking", "absent"], answer: 1, explanation: "Only 'gentle' fits a reassuring action." },
        ],
      },
      {
        id: "sat-rw-inf-2-evidence-basics",
        title: "Bài 2 · Command of Evidence – Bằng chứng cơ bản",
        titleEn: "Lesson 2 · Command of Evidence – Basics",
        level: 2,
        difficulty: "beginner",
        theory: "Dạng Evidence yêu cầu chọn câu / dữ liệu HỖ TRỢ TRỰC TIẾP một kết luận. Quy tắc vàng: đáp án đúng phải 'chạm' đúng từ khóa của kết luận, không thêm không bớt.",
        theoryEn: "Evidence questions ask you to pick the sentence (or data point) that DIRECTLY supports a claim. Rule of thumb: the correct option must touch the exact key terms of the claim - no more, no less.",
        proTips: [
          "Gạch chân kết luận trước, sau đó so sánh từng đáp án.",
          "Loại đáp án 'đúng nhưng lệch chủ đề' - đó là bẫy phổ biến nhất.",
        ],
        proTipsEn: [
          "Underline the claim first, then test each option against it.",
          "Eliminate options that are true but off-topic - the classic trap.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền 'support' hoặc 'not support' cho câu bằng chứng:",
            instructionEn: "Fill 'support' or 'not support':",
            sentences: [
              { text: "Claim: Coffee improves memory. Evidence: 'Subjects recalled 18% more words after coffee.' → ___", textEn: "Claim: Coffee improves memory. Evidence: 'Subjects recalled 18% more words after coffee.' → ___", answer: "support" },
              { text: "Claim: Coffee improves memory. Evidence: 'Coffee is popular in 80% of offices.' → ___", textEn: "Claim: Coffee improves memory. Evidence: 'Coffee is popular in 80% of offices.' → ___", answer: "not support" },
              { text: "Claim: The drug reduces fever. Evidence: 'Average temperature dropped 1.2°C in 30 minutes.' → ___", textEn: "Claim: The drug reduces fever. Evidence: 'Average temperature dropped 1.2°C in 30 minutes.' → ___", answer: "support" },
            ],
          },
        ],
        quiz: [
          { question: "Claim: 'Reading aloud helps language learners.' Which best supports it?", options: ["Most learners own books.", "Learners who read aloud daily scored 22% higher on pronunciation tests.", "Reading aloud is a tradition in many schools.", "Most languages have an alphabet."], answer: 1, explanation: "Only option B ties an outcome (higher score) to the action (reading aloud)." },
          { question: "Which choice would weaken - NOT support - a claim that 'exercise reduces stress'?", options: ["A study showed lower cortisol after workouts.", "Athletes report higher anxiety than non-athletes.", "Walking 20 minutes lowers heart rate.", "Yoga is widely used in therapy."], answer: 1, explanation: "Higher anxiety in athletes contradicts the claim." },
          { question: "Best evidence for 'Sleep improves test scores'?", options: ["Most students like sleep.", "Schools start early.", "Students who slept 8+ hrs scored 12% higher on exams.", "Sleep is studied by scientists."], answer: 2, explanation: "Option C links sleep amount to a measurable score gain." },
        ],
      },
      {
        id: "sat-rw-inf-3-inference-core",
        title: "Bài 3 · Inference – Suy luận có kiểm soát",
        titleEn: "Lesson 3 · Inference – Controlled Reasoning",
        level: 3,
        difficulty: "intermediate",
        theory: "Inference KHÔNG phải đoán. Đáp án đúng luôn được suy ra TRỰC TIẾP từ thông tin có sẵn - không cần thêm giả định bên ngoài. Hãy hỏi: 'Câu này có chắc đúng dựa trên đoạn không?'",
        theoryEn: "Inference is NOT guessing. The right answer is one step away from explicit text - no outside assumptions. Ask: 'Is this guaranteed by the passage?'",
        proTips: [
          "Loại đáp án có từ tuyệt đối (always, never, all, only) nếu đoạn không nói tuyệt đối.",
          "Đáp án đúng thường dùng từ 'soft': may, suggests, likely.",
        ],
        proTipsEn: [
          "Eliminate absolute-language options (always, never, all, only) unless the text is absolute.",
          "Correct answers often use soft hedges: may, suggests, likely.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền 'valid' hoặc 'invalid' cho mỗi suy luận:",
            instructionEn: "Mark each inference 'valid' or 'invalid':",
            sentences: [
              { text: "Text: 'Most students passed.' Inference: 'All students passed.' → ___", textEn: "Text: 'Most students passed.' Inference: 'All students passed.' → ___", answer: "invalid" },
              { text: "Text: 'Sales rose every quarter in 2023.' Inference: 'Sales rose in Q3 2023.' → ___", textEn: "Text: 'Sales rose every quarter in 2023.' Inference: 'Sales rose in Q3 2023.' → ___", answer: "valid" },
              { text: "Text: 'Some birds migrate at night.' Inference: 'All birds migrate at night.' → ___", textEn: "Text: 'Some birds migrate at night.' Inference: 'All birds migrate at night.' → ___", answer: "invalid" },
            ],
          },
        ],
        quiz: [
          { question: "Passage: 'The drug reduced symptoms in 7 of 10 patients.' Best inference?", options: ["The drug always works.", "The drug never works.", "The drug may benefit most patients.", "The drug is dangerous."], answer: 2, explanation: "'May benefit most' is soft and supported by 7/10." },
          { question: "Passage: 'The chef refused every shortcut.' Inference?", options: ["The chef is lazy.", "The chef values quality.", "The chef hates cooking.", "The chef is new."], answer: 1, explanation: "Refusing shortcuts implies care/quality." },
          { question: "Which inference is INVALID from 'Library hours were extended; visits rose 40%'?", options: ["Longer hours correlated with more visits.", "Extending hours guarantees a 40% rise everywhere.", "More people came after the change.", "The change had a measurable effect."], answer: 1, explanation: "Generalising to 'everywhere' is unsupported." },
        ],
      },
      {
        id: "sat-rw-inf-4-quant-evidence",
        title: "Bài 4 · Quantitative Evidence – Đọc bảng & biểu đồ",
        titleEn: "Lesson 4 · Quantitative Evidence – Tables & Graphs",
        level: 3,
        difficulty: "intermediate",
        theory: "Dạng này cho một bảng/biểu đồ + một kết luận. Bạn chọn dòng dữ liệu hỗ trợ kết luận đó. Quy trình: (1) đọc tiêu đề & đơn vị, (2) khoanh giá trị cần so sánh, (3) loại đáp án sai đơn vị hoặc sai hướng.",
        theoryEn: "These items pair a table/graph with a claim. You pick the row that supports it. Process: (1) read title & units, (2) circle the values being compared, (3) eliminate options with wrong unit or wrong direction.",
        proTips: [
          "Đáp án đúng phải khớp CẢ con số lẫn chiều (tăng/giảm).",
          "Bẫy phổ biến: hoán đổi cột hoặc đơn vị (% vs số tuyệt đối).",
        ],
        proTipsEn: [
          "Correct answer must match both the number AND the direction.",
          "Common trap: swapping columns or units (% vs absolute count).",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền số phù hợp dựa trên dữ liệu giả định trong câu:",
            instructionEn: "Fill in the number that matches the cue:",
            sentences: [
              { text: "If Group A scored 78 and Group B scored 64, the gap is ___ points.", textEn: "If Group A scored 78 and Group B scored 64, the gap is ___ points.", answer: "14" },
              { text: "Sales rose from 200 to 260 units → percentage increase ≈ ___%.", textEn: "Sales rose from 200 to 260 units → percentage increase ≈ ___%.", answer: "30" },
              { text: "If 45% of 200 respondents agreed, that is ___ people.", textEn: "If 45% of 200 respondents agreed, that is ___ people.", answer: "90" },
            ],
          },
        ],
        quiz: [
          { question: "Claim: 'Region X grew fastest.' What MUST the data show?", options: ["X had the highest population.", "X had the highest growth rate.", "X had the lowest cost.", "X had the most cities."], answer: 1, explanation: "'Fastest' = highest growth rate, not size." },
          { question: "A graph shows tree cover at 30% (1990) and 22% (2020). Which conclusion fits?", options: ["Tree cover increased.", "Tree cover stayed equal.", "Tree cover fell ~8 percentage points.", "Tree cover doubled."], answer: 2, explanation: "30 − 22 = 8 percentage-point drop." },
          { question: "Common trap when reading SAT data tables?", options: ["Skipping the title", "Confusing % change vs absolute change", "Both A and B", "Neither"], answer: 2, explanation: "Both pitfalls appear frequently on test day." },
        ],
      },
      {
        id: "sat-rw-inf-5-evidence-advanced",
        title: "Bài 5 · Evidence nâng cao – Bẫy gần đúng",
        titleEn: "Lesson 5 · Advanced Evidence – Near-Miss Traps",
        level: 4,
        difficulty: "advanced",
        theory: "Ở độ khó cao, hai đáp án thường gần như đúng. Cách tách: đáp án đúng phải vừa ĐÚNG SỰ THẬT trong đoạn, vừa LIÊN QUAN ĐẾN ĐÚNG kết luận. Một đáp án có thể đúng nhưng không hỗ trợ chính xác câu hỏi - đó là 'true but irrelevant'.",
        theoryEn: "At high difficulty, two options are nearly correct. The right answer must be BOTH factually true AND directly relevant to the specific claim. A statement can be true but irrelevant - the classic 'true but off-topic' trap.",
        proTips: [
          "Viết kết luận bằng 1 câu của bạn rồi so từng đáp án.",
          "Cảnh giác đáp án 'big-picture' khi câu hỏi chỉ về 1 chi tiết.",
        ],
        proTipsEn: [
          "Restate the claim in your own words, then test each option.",
          "Beware big-picture options when the claim is a narrow detail.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền 'on-topic' hoặc 'off-topic':",
            instructionEn: "Fill 'on-topic' or 'off-topic':",
            sentences: [
              { text: "Claim: Vaccine X reduces infection. Evidence: 'Infection rate fell 60% in vaccinated group.' → ___", textEn: "Claim: Vaccine X reduces infection. Evidence: 'Infection rate fell 60% in vaccinated group.' → ___", answer: "on-topic" },
              { text: "Claim: Vaccine X reduces infection. Evidence: 'Vaccine X is cheap to produce.' → ___", textEn: "Claim: Vaccine X reduces infection. Evidence: 'Vaccine X is cheap to produce.' → ___", answer: "off-topic" },
              { text: "Claim: Method Y improves recall. Evidence: 'Students using Y enjoyed lessons more.' → ___", textEn: "Claim: Method Y improves recall. Evidence: 'Students using Y enjoyed lessons more.' → ___", answer: "off-topic" },
            ],
          },
        ],
        quiz: [
          { question: "Claim: 'Solar panels lower household electricity bills.' Best evidence?", options: ["Solar panels are eco-friendly.", "Solar panels last 20+ years.", "Households with panels paid 35% less on average.", "Solar tech is improving."], answer: 2, explanation: "Only C ties panels to a bill reduction." },
          { question: "Which is a 'true but irrelevant' trap for 'Program X boosts literacy'?", options: ["Children in X read 2 more books/month.", "Program X is funded by donors.", "X students improved reading scores 18%.", "X teachers are trained yearly."], answer: 1, explanation: "Funding source doesn't show literacy impact." },
          { question: "Strongest evidence pattern for an SAT claim?", options: ["Anecdote", "Opinion", "Measured outcome tied to the cause", "Tradition"], answer: 2, explanation: "Measured outcome + cause = SAT-strong." },
        ],
      },
      {
        id: "sat-rw-inf-6-mixed-mastery",
        title: "Bài 6 · Trộn dạng – Inference + Evidence + Tone",
        titleEn: "Lesson 6 · Mixed Mastery – Inference + Evidence + Tone",
        level: 5,
        difficulty: "advanced",
        theory: "Bài mix tổng hợp: phân biệt nhanh 3 dạng. Hỏi 'most likely to agree' → inference. Hỏi 'best supports' → evidence. Hỏi 'most nearly means' → words-in-context. Đọc câu hỏi trước, rồi mới quay lại đoạn.",
        theoryEn: "A mixed-format set. Identify the type quickly: 'most likely to agree' → inference; 'best supports' → evidence; 'most nearly means' → words-in-context. Read the stem first, then return to the passage.",
        proTips: [
          "Đánh dấu loại câu hỏi ngay bên cạnh số đề.",
          "Đừng đọc kỹ đoạn trước - đọc câu hỏi trước tiết kiệm 15s/câu.",
        ],
        proTipsEn: [
          "Tag each question with its type next to the number.",
          "Don't deep-read the passage first - reading the stem first saves ~15s/question.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Xác định dạng câu (INF / EVI / WIC):",
            instructionEn: "Tag each stem (INF / EVI / WIC):",
            sentences: [
              { text: "'Which choice best supports the student's claim?' → ___", textEn: "'Which choice best supports the student's claim?' → ___", answer: "EVI" },
              { text: "'As used in line 12, 'measured' most nearly means…' → ___", textEn: "'As used in line 12, 'measured' most nearly means…' → ___", answer: "WIC" },
              { text: "'Based on the passage, the author would most likely agree that…' → ___", textEn: "'Based on the passage, the author would most likely agree that…' → ___", answer: "INF" },
              { text: "'Which finding, if true, would best illustrate the principle?' → ___", textEn: "'Which finding, if true, would best illustrate the principle?' → ___", answer: "EVI" },
            ],
          },
        ],
        quiz: [
          { question: "Fastest sequence on R&W?", options: ["Read passage → read stem → answer.", "Read stem → predict → scan passage → answer.", "Answer randomly first.", "Read all options first."], answer: 1, explanation: "Stem-first prediction is the standard pro routine." },
          { question: "If two answers look correct, the tiebreaker is usually…", options: ["Length of option", "Specificity to the claim's keywords", "Whether it 'sounds smart'", "Position in the list"], answer: 1, explanation: "Specificity to keywords wins on the SAT." },
          { question: "Soft-language answers (may, suggests) tend to be correct for which type?", options: ["Words in Context", "Inference", "Punctuation", "Synthesis"], answer: 1, explanation: "Inference rewards hedged, careful claims." },
        ],
      },
    ],
  },

  // ════════════════ 2. WRITING & LANGUAGE - Rhetorical Synthesis / Transitions / Punctuation
  {
    id: "sat-wl-synthesis-transitions-pack",
    title: "SAT W&L · Synthesis · Transitions · Punctuation",
    titleEn: "SAT W&L · Synthesis · Transitions · Punctuation",
    icon: "✍️",
    color: "from-indigo-500 to-purple-600",
    description: "6 bài bám đề chú trọng 3 dạng quyết định điểm Writing: Rhetorical Synthesis, Transitions, và dấu câu nâng cao.",
    descriptionEn: "Six exam-aligned lessons on the three highest-impact Writing items: Rhetorical Synthesis, Transitions, and advanced punctuation.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-wl-syn-1-purpose-warmup",
        title: "Bài 1 · Bắt đúng 'Goal' của câu hỏi Synthesis",
        titleEn: "Lesson 1 · Nailing the 'Goal' in Synthesis",
        level: 2,
        difficulty: "beginner",
        theory: "Synthesis cho bullet notes + một câu hỏi nêu MỤC TIÊU ('to introduce…', 'to emphasize…'). Đáp án đúng phải làm đúng việc đó, không phải câu hay nhất.",
        theoryEn: "Synthesis gives you bullet notes + a stem stating a GOAL ('to introduce…', 'to emphasize…'). The right answer fulfills that goal - not the prettiest sentence.",
        proTips: [
          "Gạch chân động từ trong goal (introduce, compare, emphasize).",
          "Loại đáp án 'true nhưng không đúng goal'.",
        ],
        proTipsEn: [
          "Underline the goal verb (introduce, compare, emphasize).",
          "Eliminate options that are true but off-goal.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền động từ goal phù hợp (introduce / compare / emphasize / explain):",
            instructionEn: "Fill the matching goal verb:",
            sentences: [
              { text: "'…to ___ the painting to a wider audience.' → first-time mention", textEn: "'…to ___ the painting to a wider audience.' → first-time mention", answer: "introduce" },
              { text: "'…to ___ two artists' techniques.' → highlight differences", textEn: "'…to ___ two artists' techniques.' → highlight differences", answer: "compare" },
              { text: "'…to ___ the importance of daily practice.' → stress a point", textEn: "'…to ___ the importance of daily practice.' → stress a point", answer: "emphasize" },
            ],
          },
        ],
        quiz: [
          { question: "Goal: 'introduce the artist to readers unfamiliar with her work.' Best opener?", options: ["Her 2019 retrospective won three awards.", "Maya Lin is an American sculptor known for site-specific works.", "Lin's process involves community interviews.", "Lin grew up in Ohio."], answer: 1, explanation: "Option B names + identifies her - perfect intro." },
          { question: "Goal: 'emphasize the speed of the change'. Best?", options: ["Sales doubled within six months.", "Sales were strong.", "Sales involved many products.", "Sales were tracked weekly."], answer: 0, explanation: "Concrete time + magnitude = emphasis." },
          { question: "What kills a Synthesis answer most often?", options: ["Wrong fact", "Wrong goal", "Wrong tone", "Too short"], answer: 1, explanation: "Goal mismatch is the #1 trap." },
        ],
      },
      {
        id: "sat-wl-syn-2-transitions-warmup",
        title: "Bài 2 · Transitions cơ bản – 5 nhóm cần nhớ",
        titleEn: "Lesson 2 · Transition Basics – 5 Core Buckets",
        level: 2,
        difficulty: "beginner",
        theory: "Học transitions theo 5 nhóm: ADD (also, furthermore), CONTRAST (however, yet), CAUSE (therefore, thus), EXAMPLE (for instance), TIME (meanwhile, subsequently). Đầu tiên xác định QUAN HỆ giữa 2 câu trước/sau, rồi chọn từ.",
        theoryEn: "Learn transitions in 5 buckets: ADD, CONTRAST, CAUSE, EXAMPLE, TIME. First name the RELATION between the two sentences, then pick the word.",
        proTips: [
          "Đừng chọn từ 'kêu' - chọn từ đúng quan hệ.",
          "'However' ≠ 'therefore'. Đổi sai một từ = mất điểm.",
        ],
        proTipsEn: [
          "Don't pick the fanciest word - pick the right relation.",
          "'However' ≠ 'therefore'. One swap = one lost point.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền transition phù hợp:",
            instructionEn: "Fill in the proper transition:",
            sentences: [
              { text: "She studied hard; ___, she passed.", textEn: "She studied hard; ___, she passed.", answer: "therefore" },
              { text: "The plan was cheap; ___, it was risky.", textEn: "The plan was cheap; ___, it was risky.", answer: "however" },
              { text: "Many fruits are sweet - ___, mangoes and grapes.", textEn: "Many fruits are sweet - ___, mangoes and grapes.", answer: "for example" },
              { text: "First, mix the batter; ___, bake for 30 minutes.", textEn: "First, mix the batter; ___, bake for 30 minutes.", answer: "next" },
            ],
          },
        ],
        quiz: [
          { question: "'The data was incomplete; ___, the team published it anyway.' Best?", options: ["therefore", "however", "for example", "next"], answer: 1, explanation: "Contrast between incomplete data and publishing." },
          { question: "'Sales rose 30%; ___, profits also doubled.' Best?", options: ["however", "moreover", "for instance", "in contrast"], answer: 1, explanation: "Adding a second positive fact = MOREOVER." },
          { question: "Which is a CAUSE transition?", options: ["meanwhile", "thus", "for example", "however"], answer: 1, explanation: "THUS = cause/effect." },
        ],
      },
      {
        id: "sat-wl-syn-3-transitions-trap",
        title: "Bài 3 · Transitions nâng cao – Bẫy 'However' vs 'Therefore'",
        titleEn: "Lesson 3 · Advanced Transitions – 'However' vs 'Therefore' Traps",
        level: 3,
        difficulty: "intermediate",
        theory: "Bẫy phổ biến: nhầm CONTRAST với CAUSE. Mẹo: đọc câu sau, hỏi 'Cái này NGƯỢC với câu trước (HOWEVER) hay là HỆ QUẢ của câu trước (THEREFORE)?'",
        theoryEn: "Common trap: confusing CONTRAST with CAUSE. Trick: read the next sentence and ask 'Is this OPPOSITE to the previous (HOWEVER) or a RESULT of it (THEREFORE)?'",
        proTips: [
          "Thay 'because of that' vào → nếu xuôi nghĩa = THEREFORE.",
          "Thay 'but' vào → nếu xuôi nghĩa = HOWEVER.",
        ],
        proTipsEn: [
          "Plug in 'because of that' → if it fits = THEREFORE.",
          "Plug in 'but' → if it fits = HOWEVER.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn 'however' hoặc 'therefore':",
            instructionEn: "Pick 'however' or 'therefore':",
            sentences: [
              { text: "The drug worked in mice; ___, human trials are next.", textEn: "The drug worked in mice; ___, human trials are next.", answer: "therefore" },
              { text: "The drug worked in mice; ___, it failed in humans.", textEn: "The drug worked in mice; ___, it failed in humans.", answer: "however" },
              { text: "The bridge passed inspection; ___, traffic can resume.", textEn: "The bridge passed inspection; ___, traffic can resume.", answer: "therefore" },
              { text: "The bridge passed inspection; ___, locals still worry.", textEn: "The bridge passed inspection; ___, locals still worry.", answer: "however" },
            ],
          },
        ],
        quiz: [
          { question: "Best in: 'Critics praised the film; ___, it lost money at the box office.'", options: ["therefore", "however", "for example", "meanwhile"], answer: 1, explanation: "Praise vs losing money = contrast." },
          { question: "Best in: 'The path was icy; ___, the hike was canceled.'", options: ["however", "therefore", "for instance", "in contrast"], answer: 1, explanation: "Icy → canceled = cause/effect." },
          { question: "Plug-in test for HOWEVER uses which word?", options: ["because", "but", "and", "so"], answer: 1, explanation: "If 'but' fits, HOWEVER fits." },
        ],
      },
      {
        id: "sat-wl-syn-4-punct-core",
        title: "Bài 4 · Punctuation – 4 dấu chốt SAT",
        titleEn: "Lesson 4 · Punctuation – 4 Marks SAT Tests Most",
        level: 3,
        difficulty: "intermediate",
        theory: "SAT chỉ kiểm tra 4 dấu: comma, semicolon, colon, dash. Quy tắc gọn: SEMICOLON nối 2 mệnh đề độc lập; COLON giới thiệu danh sách/giải thích sau mệnh đề độc lập; DASH cách nhau như comma; COMMA tách thông tin không thiết yếu.",
        theoryEn: "SAT only tests 4 marks: comma, semicolon, colon, dash. Quick rules: SEMICOLON joins two independent clauses; COLON introduces a list/explanation after an independent clause; DASHES work like commas (in pairs); COMMAS set off non-essential info.",
        proTips: [
          "Sau dấu hai chấm (:), phần trước phải là CÂU HOÀN CHỈNH.",
          "Khi không chắc dùng comma, hãy bỏ phần giữa hai dấu - câu còn nghĩa = comma đúng.",
        ],
        proTipsEn: [
          "What precedes a colon (:) must be a complete sentence.",
          "If unsure about commas, delete the middle phrase - sentence still works = commas are correct.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền dấu thích hợp (, ; : -):",
            instructionEn: "Insert the proper punctuation (, ; : -):",
            sentences: [
              { text: "She loves three sports ___ tennis, soccer, and chess.", textEn: "She loves three sports ___ tennis, soccer, and chess.", answer: ":" },
              { text: "He ran fast ___ he still missed the bus.", textEn: "He ran fast ___ he still missed the bus.", answer: ";" },
              { text: "The teacher, Ms. Lan ___ greeted the students warmly.", textEn: "The teacher, Ms. Lan ___ greeted the students warmly.", answer: "," },
              { text: "The result ___ a stunning, last-minute goal ___ shocked the crowd.", textEn: "The result ___ a stunning, last-minute goal ___ shocked the crowd.", answer: "-" },
            ],
          },
        ],
        quiz: [
          { question: "Which is CORRECT?", options: ["She left early; because she felt tired.", "She left early because she felt tired.", "She left early, because; she felt tired.", "She left early - because, she felt tired."], answer: 1, explanation: "No punctuation needed before subordinator 'because'." },
          { question: "Best version: 'The recipe needs three things ___ flour, sugar, eggs.'", options: [",", ";", ":", "-"], answer: 2, explanation: "Colon introduces a list after a complete clause." },
          { question: "Pair-of-dashes work like…", options: ["semicolons", "pair of commas", "colons", "periods"], answer: 1, explanation: "Dashes can replace pair-commas around a non-essential phrase." },
        ],
      },
      {
        id: "sat-wl-syn-5-synthesis-advanced",
        title: "Bài 5 · Synthesis nâng cao – Chọn câu chốt cuối đoạn",
        titleEn: "Lesson 5 · Advanced Synthesis – End-Note Conclusions",
        level: 4,
        difficulty: "advanced",
        theory: "Câu chốt cuối phải LIÊN KẾT bullet đầu tiên với bullet cuối cùng. Đáp án đúng thường gói lại 2 ý chính (cause + effect, problem + solution) trong 1 câu gọn.",
        theoryEn: "End-note conclusions must LINK the first and last bullets - usually packaging two key ideas (cause + effect or problem + solution) into one tight sentence.",
        proTips: [
          "Tránh câu dài, hoa mỹ - SAT thưởng câu trực diện.",
          "Loại đáp án chỉ lặp lại 1 bullet - đó không phải synthesis.",
        ],
        proTipsEn: [
          "Avoid flowery sentences - SAT rewards directness.",
          "Eliminate options that only echo one bullet - that isn't synthesis.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền 'synthesis' hoặc 'echo' cho mỗi câu:",
            instructionEn: "Mark each option 'synthesis' or 'echo':",
            sentences: [
              { text: "'The reform was popular AND cut costs by 12%.' → ___", textEn: "'The reform was popular AND cut costs by 12%.' → ___", answer: "synthesis" },
              { text: "'The reform was popular.' (only the first bullet) → ___", textEn: "'The reform was popular.' (only the first bullet) → ___", answer: "echo" },
              { text: "'The reform cut costs by 12%.' (only the last bullet) → ___", textEn: "'The reform cut costs by 12%.' (only the last bullet) → ___", answer: "echo" },
            ],
          },
        ],
        quiz: [
          { question: "Bullets: (1) program is free, (2) attendance is rising. Best synthesis?", options: ["The program is free.", "Attendance is rising.", "The free program has driven rising attendance.", "Programs vary in cost."], answer: 2, explanation: "Links cost (free) with effect (attendance)." },
          { question: "Synthesis sentences usually contain how many key ideas?", options: ["0", "1", "2", "5+"], answer: 2, explanation: "Two - that is the essence of synthesis." },
          { question: "Worst synthesis sign?", options: ["Short and clear", "Names a result", "Only repeats one bullet", "Uses 'because'"], answer: 2, explanation: "Repeating one bullet = NOT synthesis." },
        ],
      },
      {
        id: "sat-wl-syn-6-punct-edge",
        title: "Bài 6 · Punctuation nâng cao – Splice & Fragment",
        titleEn: "Lesson 6 · Advanced Punctuation – Splices & Fragments",
        level: 5,
        difficulty: "advanced",
        theory: "Comma splice = 2 mệnh đề độc lập nối bằng dấu phẩy → SAI. Sửa bằng (1) period, (2) semicolon, (3) thêm conjunction (and, but, so), hoặc (4) biến 1 mệnh đề thành phụ. Fragment = thiếu chủ ngữ hoặc động từ chính.",
        theoryEn: "Comma splice = two independent clauses joined by only a comma → WRONG. Fix with (1) period, (2) semicolon, (3) coordinating conjunction (and, but, so), or (4) subordinating one clause. Fragment = missing subject or main verb.",
        proTips: [
          "Khi thấy 'It is ___ing' không có chủ ngữ thật → có thể là fragment.",
          "Nhớ FANBOYS (for, and, nor, but, or, yet, so) cần comma TRƯỚC để nối 2 mệnh đề.",
        ],
        proTipsEn: [
          "An '-ing' phrase without a true subject can be a fragment.",
          "Use FANBOYS (for, and, nor, but, or, yet, so) with a comma BEFORE to join two clauses.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền 'splice', 'fragment', hoặc 'OK':",
            instructionEn: "Mark each as 'splice', 'fragment', or 'OK':",
            sentences: [
              { text: "She likes coffee, he likes tea. → ___", textEn: "She likes coffee, he likes tea. → ___", answer: "splice" },
              { text: "Running quickly through the rain. → ___", textEn: "Running quickly through the rain. → ___", answer: "fragment" },
              { text: "She likes coffee, but he likes tea. → ___", textEn: "She likes coffee, but he likes tea. → ___", answer: "OK" },
              { text: "Because the sky was dark. → ___", textEn: "Because the sky was dark. → ___", answer: "fragment" },
            ],
          },
        ],
        quiz: [
          { question: "Which fixes the splice 'I was tired, I went home'?", options: ["I was tired I went home.", "I was tired; I went home.", "I was tired, I; went home.", "I was tired: I went home."], answer: 1, explanation: "Semicolon legally joins two independent clauses." },
          { question: "Which is a FRAGMENT?", options: ["The cat slept.", "Sleeping on the warm rug.", "The cat slept on the rug.", "Although tired, the cat slept."], answer: 1, explanation: "No subject + no main verb = fragment." },
          { question: "FANBOYS rule: insert a comma…", options: ["after FANBOYS", "before FANBOYS (joining two clauses)", "never", "only if list of 3+ items"], answer: 1, explanation: "Comma goes BEFORE FANBOYS joining two clauses." },
        ],
      },
    ],
  },

  // ════════════════ 3. MATH - Algebra / Quadratics / Geometry / Stats
  {
    id: "sat-math-foundations-stretch-pack",
    title: "SAT Math · Foundations → Stretch",
    titleEn: "SAT Math · Foundations → Stretch",
    icon: "📐",
    color: "from-sky-500 to-indigo-600",
    description: "6 bài Math gói gọn 4 mảng: Algebra, Quadratics, Geometry, Statistics - từ căn bản đến nâng band 1500+.",
    descriptionEn: "Six lessons across Algebra, Quadratics, Geometry, and Statistics - from foundations to 1500+ stretch.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-math-alg-basics",
        title: "Bài 1 · Algebra – Phương trình bậc nhất nền tảng",
        titleEn: "Lesson 1 · Algebra – Linear Equation Foundations",
        level: 2,
        difficulty: "beginner",
        theory: "Bước chuẩn: (1) khai triển ngoặc, (2) gom biến về 1 vế, (3) chia cho hệ số. Khi đề hỏi giá trị biểu thức (vd 3x+2), thử thay nhanh thay vì giải x.",
        theoryEn: "Standard flow: (1) expand brackets, (2) gather variables on one side, (3) divide by the coefficient. If asked for an expression like 3x+2, try substitution before solving for x.",
        proTips: ["Đổi dấu khi chuyển vế.", "Nhân chéo phân số để khử mẫu."],
        proTipsEn: ["Flip the sign when moving terms.", "Cross-multiply to clear fractions."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Tìm x:",
            instructionEn: "Solve for x:",
            sentences: [
              { text: "If 3x + 4 = 19, x = ___.", textEn: "If 3x + 4 = 19, x = ___.", answer: "5" },
              { text: "If 2(x − 3) = 10, x = ___.", textEn: "If 2(x − 3) = 10, x = ___.", answer: "8" },
              { text: "If 5x = 2x + 12, x = ___.", textEn: "If 5x = 2x + 12, x = ___.", answer: "4" },
              { text: "If (x + 1)/2 = 6, x = ___.", textEn: "If (x + 1)/2 = 6, x = ___.", answer: "11" },
            ],
          },
        ],
        quiz: [
          { question: "If 4x − 5 = 11, x = ?", options: ["3", "4", "5", "6"], answer: 1, explanation: "4x = 16 → x = 4." },
          { question: "If 2x + 3 = x + 10, x = ?", options: ["6", "7", "8", "9"], answer: 1, explanation: "x = 7." },
          { question: "What is 3x + 2 if x = 5?", options: ["15", "17", "18", "20"], answer: 1, explanation: "3(5)+2 = 17." },
        ],
      },
      {
        id: "sat-math-geo-basics",
        title: "Bài 2 · Geometry – Góc, tam giác, đường tròn cơ bản",
        titleEn: "Lesson 2 · Geometry – Angles, Triangles, Circles Basics",
        level: 2,
        difficulty: "beginner",
        theory: "Cần thuộc 4 công thức: tổng góc tam giác = 180°, tổng góc tứ giác = 360°, chu vi đường tròn C = 2πr, diện tích đường tròn A = πr². Nhớ tam giác đặc biệt 30-60-90 và 45-45-90.",
        theoryEn: "Memorize four formulas: triangle angle sum = 180°, quadrilateral = 360°, circumference C = 2πr, circle area A = πr². Know the 30-60-90 and 45-45-90 special triangles.",
        proTips: ["Đánh dấu các góc bằng nhau.", "Vẽ thêm đường phụ khi cần."],
        proTipsEn: ["Tag equal angles on the figure.", "Add an auxiliary line when stuck."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền giá trị:",
            instructionEn: "Fill in the value:",
            sentences: [
              { text: "Two angles of a triangle are 60° and 70°. The third is ___°.", textEn: "Two angles of a triangle are 60° and 70°. The third is ___°.", answer: "50" },
              { text: "A circle with r = 3 has area ___π.", textEn: "A circle with r = 3 has area ___π.", answer: "9" },
              { text: "A circle with r = 5 has circumference ___π.", textEn: "A circle with r = 5 has circumference ___π.", answer: "10" },
            ],
          },
        ],
        quiz: [
          { question: "Sum of interior angles of any triangle?", options: ["90°", "180°", "270°", "360°"], answer: 1, explanation: "Triangle sum = 180°." },
          { question: "Area of a circle with r = 4?", options: ["8π", "12π", "16π", "20π"], answer: 2, explanation: "π·4² = 16π." },
          { question: "In a 45-45-90 triangle, hypotenuse = leg × ___", options: ["√2", "√3", "2", "3"], answer: 0, explanation: "Hypotenuse = leg·√2." },
        ],
      },
      {
        id: "sat-math-quad-intermediate",
        title: "Bài 3 · Quadratics – Vertex form & nghiệm",
        titleEn: "Lesson 3 · Quadratics – Vertex Form & Roots",
        level: 3,
        difficulty: "intermediate",
        theory: "Parabola y = a(x − h)² + k có đỉnh (h, k). Phương trình ax² + bx + c = 0 có nghiệm x = (−b ± √(b² − 4ac))/(2a). Discriminant Δ = b² − 4ac quyết định số nghiệm: Δ>0 (2 nghiệm), Δ=0 (1), Δ<0 (vô nghiệm thực).",
        theoryEn: "y = a(x − h)² + k has vertex (h, k). Quadratic formula: x = (−b ± √(b² − 4ac))/(2a). Discriminant Δ = b² − 4ac: Δ>0 (two roots), Δ=0 (one), Δ<0 (no real roots).",
        proTips: ["Đỉnh = trục đối xứng x = −b/(2a).", "Khi a>0 parabola mở lên."],
        proTipsEn: ["Axis of symmetry: x = −b/(2a).", "If a>0 the parabola opens up."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Tìm nghiệm / đỉnh:",
            instructionEn: "Solve for roots/vertex:",
            sentences: [
              { text: "x² − 5x + 6 = 0 → x = 2 or x = ___.", textEn: "x² − 5x + 6 = 0 → x = 2 or x = ___.", answer: "3" },
              { text: "Vertex of y = (x − 4)² + 1 is (___, 1).", textEn: "Vertex of y = (x − 4)² + 1 is (___, 1).", answer: "4" },
              { text: "Δ of x² + 2x + 1: ___.", textEn: "Δ of x² + 2x + 1: ___.", answer: "0" },
            ],
          },
        ],
        quiz: [
          { question: "Roots of x² − 7x + 12 = 0?", options: ["3 and 4", "2 and 6", "−3 and −4", "1 and 12"], answer: 0, explanation: "(x−3)(x−4)=0." },
          { question: "Vertex of y = x² − 6x + 5 (use x = −b/2a)?", options: ["(3, −4)", "(−3, 14)", "(6, 5)", "(0, 5)"], answer: 0, explanation: "x=3, y=9−18+5=−4." },
          { question: "If Δ < 0 the parabola…", options: ["touches x-axis once", "cuts x-axis twice", "does not cross x-axis", "is a line"], answer: 2, explanation: "Negative discriminant → no real roots." },
        ],
      },
      {
        id: "sat-math-stats-intermediate",
        title: "Bài 4 · Statistics – Mean, Median, Spread",
        titleEn: "Lesson 4 · Statistics – Mean, Median, Spread",
        level: 3,
        difficulty: "intermediate",
        theory: "Mean nhạy với outlier, median ổn định hơn. Range = max − min. Standard deviation đo độ phân tán - dữ liệu càng tập trung, SD càng nhỏ. Khi outlier xuất hiện, mean dịch theo outlier, median ít đổi.",
        theoryEn: "Mean is sensitive to outliers; median is more stable. Range = max − min. Standard deviation measures spread - tighter data → smaller SD. With an outlier, mean shifts; median barely moves.",
        proTips: ["Sắp xếp dữ liệu trước khi tìm median.", "SD giảm = dữ liệu nén lại gần mean."],
        proTipsEn: ["Sort data before finding the median.", "Smaller SD means data is tighter around the mean."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Tính giá trị:",
            instructionEn: "Compute:",
            sentences: [
              { text: "Data {2, 4, 4, 6, 9}. Mean = ___.", textEn: "Data {2, 4, 4, 6, 9}. Mean = ___.", answer: "5" },
              { text: "Data {3, 5, 7, 9, 11}. Median = ___.", textEn: "Data {3, 5, 7, 9, 11}. Median = ___.", answer: "7" },
              { text: "Data {1, 2, 3, 100}. The number most affected by 100 is the ___.", textEn: "Data {1, 2, 3, 100}. The number most affected by 100 is the ___.", answer: "mean" },
            ],
          },
        ],
        quiz: [
          { question: "Median of {5, 7, 9, 11, 13}?", options: ["7", "8", "9", "10"], answer: 2, explanation: "Middle value of sorted list = 9." },
          { question: "Adding an outlier 1000 to a dataset affects which most?", options: ["mean", "median", "mode", "range stays equal"], answer: 0, explanation: "Mean shifts dramatically." },
          { question: "Tighter data → SD is…", options: ["larger", "smaller", "negative", "zero only"], answer: 1, explanation: "SD shrinks as data clusters." },
        ],
      },
      {
        id: "sat-math-algebra-advanced",
        title: "Bài 5 · Algebra nâng cao – Hệ phương trình & no/infinite solutions",
        titleEn: "Lesson 5 · Advanced Algebra – Systems & No/Infinite Solutions",
        level: 4,
        difficulty: "advanced",
        theory: "Cho hệ ax + by = c và dx + ey = f: NO SOLUTION ↔ tỉ lệ a/d = b/e ≠ c/f (cùng slope, khác intercept). INFINITELY MANY ↔ a/d = b/e = c/f (cùng đường thẳng). ONE SOLUTION ↔ a/d ≠ b/e.",
        theoryEn: "For ax + by = c and dx + ey = f: NO SOLUTION ↔ a/d = b/e ≠ c/f (same slope, different intercept). INFINITE ↔ a/d = b/e = c/f. ONE SOLUTION ↔ a/d ≠ b/e.",
        proTips: [
          "Đổi cả hai phương trình về dạng y = mx + b để so slope nhanh.",
          "Câu hỏi 'For what value of k…' luôn dùng quy tắc tỉ lệ.",
        ],
        proTipsEn: [
          "Convert both to y = mx + b to compare slopes fast.",
          "'For what value of k…' questions always use the ratio rule.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền giá trị k:",
            instructionEn: "Find k:",
            sentences: [
              { text: "2x + 3y = 6 and 4x + 6y = k has infinitely many → k = ___.", textEn: "2x + 3y = 6 and 4x + 6y = k has infinitely many → k = ___.", answer: "12" },
              { text: "x + y = 4 and 2x + 2y = k has NO solution if k ≠ ___.", textEn: "x + y = 4 and 2x + 2y = k has NO solution if k ≠ ___.", answer: "8" },
              { text: "y = 3x + 2 and y = kx + 2 has ONE solution if k ≠ ___.", textEn: "y = 3x + 2 and y = kx + 2 has ONE solution if k ≠ ___.", answer: "3" },
            ],
          },
        ],
        quiz: [
          { question: "When does ax + by = c and 2ax + 2by = c+1 have NO solution?", options: ["always", "never", "for all a,b", "only if a=b=0"], answer: 0, explanation: "Same slope, different intercept → always no solution." },
          { question: "Slope of 3x + 2y = 8?", options: ["3", "−3/2", "2/3", "−2/3"], answer: 1, explanation: "y = (−3/2)x + 4 → slope −3/2." },
          { question: "Two lines coincide when…", options: ["slopes differ", "all coefficients are proportional", "intercepts differ", "they meet at one point"], answer: 1, explanation: "Proportional coefficients = same line = infinite solutions." },
        ],
      },
      {
        id: "sat-math-geometry-advanced",
        title: "Bài 6 · Geometry nâng cao – Similarity & Trig căn bản",
        titleEn: "Lesson 6 · Advanced Geometry – Similarity & Basic Trig",
        level: 5,
        difficulty: "advanced",
        theory: "Tam giác đồng dạng: tỉ lệ cạnh tương ứng bằng nhau, tỉ lệ diện tích = (tỉ lệ cạnh)². Trig căn bản: sin = đối/huyền, cos = kề/huyền, tan = đối/kề. SAT thường hỏi sin(θ) = cos(90°−θ).",
        theoryEn: "Similar triangles share equal ratios of corresponding sides; area ratio = (side ratio)². Basic trig: sin = opp/hyp, cos = adj/hyp, tan = opp/adj. SAT loves sin(θ) = cos(90°−θ).",
        proTips: [
          "Vẽ 2 tam giác cạnh nhau để so cạnh tương ứng.",
          "Nhớ sin(30°)=1/2, cos(60°)=1/2 (cùng giá trị).",
        ],
        proTipsEn: [
          "Sketch the two triangles side-by-side to align sides.",
          "Remember sin(30°)=1/2, cos(60°)=1/2 (identical).",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền giá trị:",
            instructionEn: "Fill in:",
            sentences: [
              { text: "If two similar triangles have side ratio 1:3, their area ratio is 1:___.", textEn: "If two similar triangles have side ratio 1:3, their area ratio is 1:___.", answer: "9" },
              { text: "sin(30°) = ___.", textEn: "sin(30°) = ___.", answer: "0.5" },
              { text: "If sin(θ) = 0.6 then cos(90° − θ) = ___.", textEn: "If sin(θ) = 0.6 then cos(90° − θ) = ___.", answer: "0.6" },
            ],
          },
        ],
        quiz: [
          { question: "Two similar triangles with side ratio 2:5 have area ratio…", options: ["2:5", "4:25", "5:2", "25:4"], answer: 1, explanation: "(2:5)² = 4:25." },
          { question: "cos(60°) = ?", options: ["√3/2", "1/2", "1", "0"], answer: 1, explanation: "Special angle value." },
          { question: "sin(θ) = cos(?)", options: ["θ", "90°+θ", "90°−θ", "180°−θ"], answer: 2, explanation: "Cofunction identity." },
        ],
      },
    ],
  },

  // ════════════════ 4. ADVANCED READING - Science / Social / Literary / Dual-passage
  {
    id: "sat-adv-reading-pack-2",
    title: "SAT Advanced Reading · Genre Pack",
    titleEn: "SAT Advanced Reading · Genre Pack",
    icon: "📚",
    color: "from-rose-500 to-orange-500",
    description: "6 bài đọc nâng cao theo thể loại: Science, Social Studies, Literary Fiction và Dual-Passage.",
    descriptionEn: "Six advanced-reading lessons by genre: Science, Social Studies, Literary Fiction, and Dual-Passage.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-adv-rd-1-science-warmup",
        title: "Bài 1 · Science Reading – Warm-up từ vựng STEM",
        titleEn: "Lesson 1 · Science Reading – STEM Vocabulary Warm-up",
        level: 2,
        difficulty: "beginner",
        theory: "Đọc khoa học SAT không yêu cầu kiến thức nền. Tập trung: (1) đối tượng nghiên cứu, (2) phương pháp, (3) kết quả. Từ vựng cần thuộc: hypothesis, control, variable, correlation, significant.",
        theoryEn: "SAT science passages don't require background knowledge. Focus on (1) subject of study, (2) method, (3) result. Must-know vocab: hypothesis, control, variable, correlation, significant.",
        proTips: ["Bỏ qua các con số chi tiết khi đọc lần 1.", "Gạch dưới động từ chính trong mỗi đoạn."],
        proTipsEn: ["Skip detailed numbers in first read.", "Underline the main verb in each paragraph."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền thuật ngữ phù hợp:",
            instructionEn: "Fill in the term:",
            sentences: [
              { text: "An untested prediction is called a ___.", textEn: "An untested prediction is called a ___.", answer: "hypothesis" },
              { text: "The group that receives no treatment is the ___ group.", textEn: "The group that receives no treatment is the ___ group.", answer: "control" },
              { text: "A factor that can change in an experiment is a ___.", textEn: "A factor that can change in an experiment is a ___.", answer: "variable" },
            ],
          },
        ],
        quiz: [
          { question: "'Statistically significant' most nearly means…", options: ["large in size", "unlikely due to chance", "easy to read", "very expensive"], answer: 1, explanation: "Significance = unlikely random." },
          { question: "A correlation describes…", options: ["a cause", "a relationship", "a fact", "a opinion"], answer: 1, explanation: "Correlation = relationship, not cause." },
          { question: "First thing to identify in a science passage?", options: ["author bias", "subject of study", "publication date", "page count"], answer: 1, explanation: "Identify the subject of study first." },
        ],
      },
      {
        id: "sat-adv-rd-2-social-warmup",
        title: "Bài 2 · Social Studies – Đọc lịch sử & lập luận",
        titleEn: "Lesson 2 · Social Studies – History & Argument",
        level: 2,
        difficulty: "beginner",
        theory: "Đoạn xã hội học/lịch sử SAT thường có 1 claim + 2-3 evidence. Đọc claim trước → khoanh evidence. Câu hỏi 'main purpose' luôn liên quan tới claim, không phải example.",
        theoryEn: "SAT social/history passages have one claim + 2–3 evidence. Read claim first → bracket evidence. 'Main purpose' questions tie to the claim - not the example.",
        proTips: ["Đề thường chọn passage từ Founding Documents - ngôn ngữ trang trọng.", "Cảnh giác từ cổ: thence, hither, whence."],
        proTipsEn: ["Many passages come from Founding Documents - formal language.", "Watch archaic words: thence, hither, whence."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ phù hợp:",
            instructionEn: "Fill in the term:",
            sentences: [
              { text: "A point an author tries to prove is a ___.", textEn: "A point an author tries to prove is a ___.", answer: "claim" },
              { text: "Facts that back up a claim are called ___.", textEn: "Facts that back up a claim are called ___.", answer: "evidence" },
              { text: "An author's overall reason for writing is the main ___.", textEn: "An author's overall reason for writing is the main ___.", answer: "purpose" },
            ],
          },
        ],
        quiz: [
          { question: "'Main purpose' answers usually mention…", options: ["the example", "the claim", "the title", "the publisher"], answer: 1, explanation: "Purpose = claim-level." },
          { question: "Archaic word 'whence' means…", options: ["where to", "where from", "when", "why"], answer: 1, explanation: "Whence = from where." },
          { question: "Founding Document passages often use…", options: ["slang", "formal/old English", "emoji", "headings"], answer: 1, explanation: "Expect formal register." },
        ],
      },
      {
        id: "sat-adv-rd-3-literary-intermediate",
        title: "Bài 3 · Literary Fiction – Đọc nhân vật & tâm trạng",
        titleEn: "Lesson 3 · Literary Fiction – Character & Mood",
        level: 3,
        difficulty: "intermediate",
        theory: "Đọc văn học cần bám động từ + tính từ mô tả tâm trạng (sigh, hesitate, beam, scowl). Nhân vật 'reluctant', 'wistful', 'resigned' đều có sắc thái khác - phân biệt qua hành động đi kèm.",
        theoryEn: "For fiction, follow verbs + adjectives that signal mood (sigh, hesitate, beam, scowl). Words like 'reluctant', 'wistful', 'resigned' differ in tone - disambiguate via accompanying actions.",
        proTips: ["Tự tóm tắt cảnh trong 1 câu.", "Tránh áp suy nghĩ cá nhân vào nhân vật."],
        proTipsEn: ["Summarize the scene in one sentence.", "Don't project your own feelings onto the character."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền tâm trạng phù hợp (reluctant / wistful / resigned / eager):",
            instructionEn: "Fill in the mood:",
            sentences: [
              { text: "He stared at the old photo, smiling faintly. → ___", textEn: "He stared at the old photo, smiling faintly. → ___", answer: "wistful" },
              { text: "She agreed slowly, with a small sigh. → ___", textEn: "She agreed slowly, with a small sigh. → ___", answer: "reluctant" },
              { text: "He nodded, accepting that nothing more could be done. → ___", textEn: "He nodded, accepting that nothing more could be done. → ___", answer: "resigned" },
              { text: "She bounded into the room, beaming. → ___", textEn: "She bounded into the room, beaming. → ___", answer: "eager" },
            ],
          },
        ],
        quiz: [
          { question: "A 'wistful' character usually feels…", options: ["angry", "longing/nostalgic", "confident", "amused"], answer: 1, explanation: "Wistful = gentle longing." },
          { question: "'Resigned' suggests…", options: ["fighting back", "acceptance of bad outcome", "joyful agreement", "confusion"], answer: 1, explanation: "Resigned = accepting reluctantly." },
          { question: "Best clue for mood?", options: ["punctuation", "verbs + adjectives", "page numbers", "speaker tags"], answer: 1, explanation: "Verbs/adjectives reveal mood." },
        ],
      },
      {
        id: "sat-adv-rd-4-science-intermediate",
        title: "Bài 4 · Science – Đọc thí nghiệm 2 biến",
        titleEn: "Lesson 4 · Science – Two-Variable Experiments",
        level: 3,
        difficulty: "intermediate",
        theory: "Khi passage mô tả thí nghiệm với 2 biến (control + treatment), câu hỏi thường yêu cầu so sánh outcome. Tìm: BIẾN GÌ thay đổi, ĐO bằng gì, KẾT QUẢ khác bao nhiêu giữa hai nhóm.",
        theoryEn: "When the passage describes an experiment with two variables (control + treatment), the question usually asks you to compare outcomes. Identify: which variable changed, how it was measured, and the gap between groups.",
        proTips: ["Vẽ bảng nhỏ: nhóm | điều kiện | kết quả.", "Đừng nhầm 'increase' với 'higher than control'."],
        proTipsEn: ["Sketch a mini table: group | condition | result.", "Don't confuse 'increase' with 'higher than control'."],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền giá trị / từ:",
            instructionEn: "Fill in:",
            sentences: [
              { text: "If control = 40 and treatment = 55, treatment is ___ higher than control.", textEn: "If control = 40 and treatment = 55, treatment is ___ higher than control.", answer: "15" },
              { text: "The factor the experimenter changes is the ___ variable.", textEn: "The factor the experimenter changes is the ___ variable.", answer: "independent" },
              { text: "The factor that is measured is the ___ variable.", textEn: "The factor that is measured is the ___ variable.", answer: "dependent" },
            ],
          },
        ],
        quiz: [
          { question: "Independent variable = ?", options: ["the measured outcome", "what the scientist changes", "random noise", "control group"], answer: 1, explanation: "Independent = changed by the experimenter." },
          { question: "If treatment shows 25% lift over control, the result is…", options: ["lower", "higher", "equal", "negative"], answer: 1, explanation: "Lift = increase above control." },
          { question: "Best evidence a treatment WORKS?", options: ["Anecdote", "Higher outcome vs control with significance", "Author opinion", "Sample size only"], answer: 1, explanation: "Outcome + control + significance." },
        ],
      },
      {
        id: "sat-adv-rd-5-dual-passage",
        title: "Bài 5 · Dual-Passage – So sánh quan điểm",
        titleEn: "Lesson 5 · Dual-Passage – Comparing Viewpoints",
        level: 4,
        difficulty: "advanced",
        theory: "Dual-passage có 2 đoạn ngắn về cùng chủ đề. Câu hỏi điển hình: (1) tác giả nào sẽ đồng ý/không đồng ý với điều X, (2) hai tác giả khác nhau ở điểm nào. Tự tóm tắt mỗi đoạn 1 câu trước khi vào câu hỏi.",
        theoryEn: "Dual passages give two short pieces on the same topic. Typical stems: (1) which author would agree/disagree with X, (2) where they differ. Summarize each passage in one sentence before tackling questions.",
        proTips: [
          "Viết 'A=…, B=…' bên lề.",
          "Đáp án đúng thường nhẹ nhàng - tránh 'completely opposite'.",
        ],
        proTipsEn: [
          "Note 'A=…, B=…' in the margin.",
          "Right answers are usually nuanced - avoid 'completely opposite' options.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền 'agree' hoặc 'disagree' giả định A ủng hộ AI, B nghi ngại AI:",
            instructionEn: "Assume A supports AI, B is skeptical. Fill 'agree' or 'disagree':",
            sentences: [
              { text: "Statement: 'AI tools help students learn faster.' A → ___", textEn: "Statement: 'AI tools help students learn faster.' A → ___", answer: "agree" },
              { text: "Statement: 'AI tools should be banned in classrooms.' A → ___", textEn: "Statement: 'AI tools should be banned in classrooms.' A → ___", answer: "disagree" },
              { text: "Statement: 'AI tools may reduce critical thinking.' B → ___", textEn: "Statement: 'AI tools may reduce critical thinking.' B → ___", answer: "agree" },
            ],
          },
        ],
        quiz: [
          { question: "What's the FIRST step on a dual-passage set?", options: ["Read all questions", "Summarize each passage in one sentence", "Compare line-by-line", "Skip to evidence questions"], answer: 1, explanation: "Quick one-line summaries anchor every later question." },
          { question: "Best stem clue that you need both passages?", options: ["'In Passage 1, the author…'", "'Both authors would most likely agree that…'", "'As used in line 4…'", "'According to Passage 2…'"], answer: 1, explanation: "'Both authors' = dual-passage compare item." },
          { question: "Common trap on dual-passage compare items?", options: ["Picking 'completely opposite' when they only differ in emphasis", "Picking the longer answer", "Picking the first answer", "Picking the shortest"], answer: 0, explanation: "Nuance > extremes." },
        ],
      },
      {
        id: "sat-adv-rd-6-mixed-stretch",
        title: "Bài 6 · Mixed Stretch – Tốc độ đọc 1500+",
        titleEn: "Lesson 6 · Mixed Stretch – 1500+ Reading Pace",
        level: 5,
        difficulty: "advanced",
        theory: "Ở level 1500+, mục tiêu là <60 giây/câu R&W. Cách: đọc 1 lần, không quay lại, dự đoán đáp án trước khi nhìn 4 lựa chọn. Loại đáp án bằng quy tắc 'extreme language' và 'off-topic'.",
        theoryEn: "At 1500+, target <60 seconds per R&W item. Read once, don't backtrack, and predict the answer before reading the four options. Eliminate via 'extreme language' and 'off-topic' rules.",
        proTips: [
          "Nếu kẹt > 75s, đánh dấu và quay lại cuối.",
          "Câu paired evidence - luôn xác định câu chủ trước rồi tìm evidence.",
        ],
        proTipsEn: [
          "If you stall >75s, flag and return at the end.",
          "On paired-evidence items, lock the main claim first, then find the evidence.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền 'keep' hoặc 'eliminate' cho từng đáp án:",
            instructionEn: "Mark 'keep' or 'eliminate':",
            sentences: [
              { text: "Answer says 'always proves' but passage says 'often suggests'. → ___", textEn: "Answer says 'always proves' but passage says 'often suggests'. → ___", answer: "eliminate" },
              { text: "Answer matches both keyword and tone of the claim. → ___", textEn: "Answer matches both keyword and tone of the claim. → ___", answer: "keep" },
              { text: "Answer is true but talks about a different topic. → ___", textEn: "Answer is true but talks about a different topic. → ___", answer: "eliminate" },
            ],
          },
        ],
        quiz: [
          { question: "Pace target on R&W for 1500+?", options: ["~30s/Q", "~60s/Q", "~120s/Q", "~180s/Q"], answer: 1, explanation: "~60s/Q hits the section timing." },
          { question: "Top reason to ELIMINATE an option?", options: ["It is too short", "It contains extreme language unsupported by the text", "It uses a comma", "It begins with 'The'"], answer: 1, explanation: "Extreme + unsupported = trap." },
          { question: "If two answers feel correct…", options: ["Pick the longer one", "Pick the one matching keyword AND scope", "Pick the first", "Skip"], answer: 1, explanation: "Keyword + scope match wins." },
        ],
      },
    ],
  },
];

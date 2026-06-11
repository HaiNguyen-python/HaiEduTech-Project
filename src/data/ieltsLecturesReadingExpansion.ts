/**
 * @file ieltsLecturesReadingExpansion.ts
 * @description Reading-focused lectures: tips, techniques, time-management,
 * paraphrase decoding, skimming/scanning drills, vocabulary in context.
 * Each lecture follows the IeltsLecture schema with 6+ quiz questions.
 */
import type { IeltsLecture } from "./ieltsLecturesData";

export const readingExpansion: IeltsLecture[] = [
  // ===================== 1. SKIM-SCAN-DEEP =====================
  {
    id: "reading-skim-scan-deep",
    title: "Reading — The 3-Speed Engine (Skim • Scan • Deep)",
    titleVi: "Reading — Cỗ máy 3 tốc độ (Skim • Scan • Deep)",
    pillar: "skill-based",
    skill: "reading",
    icon: "🏎️",
    duration: "20 min",
    level: "intermediate",
    description:
      "60 minutes, 3 passages, 40 questions. The only way to finish on time is to switch deliberately between three reading speeds — never read every word.",
    descriptionVi:
      "60 phút, 3 bài, 40 câu. Cách duy nhất kịp giờ là chuyển đổi có chủ đích giữa 3 tốc độ đọc — đừng bao giờ đọc từng từ.",
    strategySteps: [
      {
        step: 1,
        title: "SKIM — 90 seconds per passage",
        titleVi: "SKIM — 90 giây mỗi bài",
        description:
          "Read the title, sub-heading, first sentence of each paragraph, last sentence of the final paragraph. Goal: know the TOPIC and the STRUCTURE, not the details.",
        descriptionVi:
          "Đọc tiêu đề, phụ đề, câu đầu mỗi đoạn, câu cuối đoạn cuối. Mục tiêu: nắm CHỦ ĐỀ và CẤU TRÚC, không phải chi tiết.",
        example: "After skim: 'This passage is about urban bees — paragraph 2 is the problem, 4 is the solution.'",
      },
      {
        step: 2,
        title: "SCAN — locate keywords in <15 seconds",
        titleVi: "SCAN — định vị từ khóa dưới 15 giây",
        description:
          "Run your eyes vertically down the page hunting for unique markers: dates, names, CAPITALS, numbers, italicised words. Ignore everything else.",
        descriptionVi:
          "Quét mắt dọc trang, săn các 'mỏ neo' duy nhất: ngày tháng, tên riêng, CHỮ HOA, số, từ in nghiêng. Bỏ qua tất cả phần còn lại.",
        example: "Question mentions '1987' → scan only for the digit shape '1987'.",
      },
      {
        step: 3,
        title: "DEEP — read 2-3 sentences around the anchor",
        titleVi: "DEEP — đọc kỹ 2-3 câu quanh mỏ neo",
        description:
          "Now slow down. Read the sentence containing the anchor PLUS one sentence before and one after. The answer almost always sits here.",
        descriptionVi:
          "Giờ chậm lại. Đọc câu chứa mỏ neo CỘNG 1 câu trước và 1 câu sau. Đáp án gần như luôn nằm ở đây.",
      },
      {
        step: 4,
        title: "BUDGET — 20 minutes per passage, hard stop",
        titleVi: "BUDGET — 20 phút/bài, dừng cứng",
        description:
          "Set a mental timer. At minute 20, transfer answers and move on — even if 1-2 questions are blank. You can't afford to sacrifice Passage 3.",
        descriptionVi:
          "Đặt báo giờ trong đầu. Phút 20 — chuyển đáp án và sang bài mới, kể cả còn 1-2 câu trống. Đừng bao giờ hy sinh Passage 3.",
      },
    ],
    practicalExamples: [
      {
        context: "You see the question: 'In which year did the EU ban neonicotinoid pesticides?'",
        contextVi: "Câu hỏi: 'Năm nào EU cấm thuốc trừ sâu neonicotinoid?'",
        example:
          "Step: Scan ONLY for 4-digit numbers in the passage. Found '2018' next to 'Brussels imposed a full ban'. → Answer: 2018.",
        explanation: "You did not read the passage — you hunted for the unique number shape.",
      },
      {
        context: "Passage 3 is densely academic and you have 18 minutes left.",
        contextVi: "Passage 3 học thuật dày đặc, còn 18 phút.",
        example:
          "Strategy: Skip the True/False/Not Given block (slow), tackle Matching Headings first (rewards skimming), then loop back.",
        explanation: "Choose question type by speed, not by order on the paper.",
      },
      {
        context: "You re-read the same paragraph three times and still don't understand.",
        contextVi: "Bạn đọc đi đọc lại 1 đoạn 3 lần vẫn không hiểu.",
        example:
          "Move on. Mark a guess (B is statistically safe), star the question, return only if time remains. One stuck question can cost you five.",
        explanation: "Sunk-cost trap. Protect Passage 3 at all costs.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Reading the full passage first, then doing questions",
        mistakeVi: "Đọc hết bài trước, rồi mới làm câu hỏi",
        why: "Eats 8-10 minutes per passage. You will not finish Passage 3.",
        whyVi: "Ngốn 8-10 phút mỗi bài. Bạn chắc chắn không kịp Passage 3.",
      },
      {
        mistake: "Translating unknown words mentally to Vietnamese",
        mistakeVi: "Dịch từng từ lạ sang tiếng Việt trong đầu",
        why: "Doubles reading time. Most answers come from context, not exact translation.",
        whyVi: "Tăng gấp đôi thời gian đọc. Đa số đáp án đến từ ngữ cảnh, không phải dịch từng chữ.",
      },
      {
        mistake: "Leaving questions blank",
        mistakeVi: "Bỏ trống câu hỏi",
        why: "No penalty for wrong answers. Always guess (B is the statistically safest MCQ letter).",
        whyVi: "Không trừ điểm khi sai. Luôn đoán (chữ B là an toàn nhất ở MCQ về mặt thống kê).",
      },
    ],
    goldenSecret:
      "Switch speeds like a driver: SKIM (1st gear, broad), SCAN (5th gear, fast), DEEP (2nd gear, careful). Reading at one single speed is the #1 reason students stall at Band 6.0.",
    goldenSecretVi:
      "Chuyển tốc độ như lái xe: SKIM (số 1, bao quát), SCAN (số 5, nhanh), DEEP (số 2, kỹ). Đọc 1 tốc độ duy nhất là lý do số 1 khiến học viên kẹt ở Band 6.0.",
    vocabHighlights: [
      { word: "skim", definition: "read quickly for main idea", definitionVi: "đọc lướt tìm ý chính", example: "Skim the first sentence of each paragraph.", band: "6.5" },
      { word: "scan", definition: "search for specific information", definitionVi: "đọc quét tìm thông tin", example: "Scan for dates and names.", band: "6.5" },
      { word: "anchor word", definition: "unique keyword that locks position in text", definitionVi: "từ neo định vị trong văn bản", example: "Use proper nouns as anchor words.", band: "7.0" },
      { word: "sunk cost", definition: "time already spent that cannot be recovered", definitionVi: "chi phí đã mất", example: "Don't fall into the sunk-cost trap on one hard question.", band: "7.5" },
      { word: "paraphrase", definition: "say the same thing in different words", definitionVi: "diễn đạt lại", example: "IELTS questions always paraphrase the passage.", band: "7.0" },
    ],
    quiz: [
      {
        question: "What are the three reading speeds in this framework?",
        options: ["Read, re-read, translate", "Skim, Scan, Deep", "Slow, Medium, Fast", "Preview, Read, Review"],
        answer: 1,
        explanation: "Skim (broad), Scan (locate), Deep (verify).",
      },
      {
        question: "How long should skimming a passage take?",
        options: ["~30 seconds", "~90 seconds", "~3 minutes", "~5 minutes"],
        answer: 1,
        explanation: "Around 90 seconds — title, sub-heading, first/last sentences.",
      },
      {
        question: "Best technique when you can't find an answer after 90 seconds?",
        options: ["Re-read the paragraph carefully", "Guess and move on, star the question", "Skip the rest of the passage", "Restart from question 1"],
        answer: 1,
        explanation: "Protect the remaining time; come back if any is left.",
      },
      {
        question: "Which anchor is fastest to scan for?",
        options: ["Adjectives", "Numbers and capital letters", "Verbs in past tense", "Conjunctions"],
        answer: 1,
        explanation: "Numbers and capitals jump off the page visually.",
      },
      {
        question: "Maximum time you should spend on one passage?",
        options: ["10 minutes", "15 minutes", "20 minutes", "25 minutes"],
        answer: 2,
        explanation: "20 minutes maximum, then transfer and move on.",
      },
      {
        question: "Why is translating each unknown word a mistake?",
        options: ["It improves vocabulary", "It doubles reading time without raising accuracy", "It is required by the test", "It increases band score"],
        answer: 1,
        explanation: "Translation eats time; answers come from context.",
      },
    ],
    cheatSheetPoints: [
      "Skim 90s → Scan keywords → Deep 2-3 sentences",
      "20-minute hard stop per passage",
      "Guess (B) any blank — no penalty",
      "Anchor on numbers, dates, capitals first",
      "Match question type to speed, not paper order",
    ],
  },

  // ===================== 2. PARAPHRASE DECODER =====================
  {
    id: "reading-paraphrase-decoder",
    title: "Reading — The Paraphrase Decoder",
    titleVi: "Reading — Giải mã Paraphrase",
    pillar: "tips-hacks",
    skill: "reading",
    icon: "🔓",
    duration: "18 min",
    level: "intermediate",
    description:
      "100% of IELTS Reading answers are HIDDEN behind paraphrase. If you can decode the 4 paraphrase patterns, you unlock the entire test.",
    descriptionVi:
      "100% đáp án IELTS Reading ẨN sau paraphrase. Nếu giải mã được 4 kiểu paraphrase, bạn mở khóa toàn bộ bài thi.",
    strategySteps: [
      {
        step: 1,
        title: "Pattern 1 — Synonym swap",
        titleVi: "Kiểu 1 — Hoán đổi từ đồng nghĩa",
        description: "Single content words replaced. e.g. 'children' → 'youngsters', 'difficult' → 'challenging'.",
        descriptionVi: "Đổi từ nội dung đơn lẻ. VD: 'children' → 'youngsters', 'difficult' → 'challenging'.",
        example: "Q: 'Studying abroad is difficult.' Passage: 'Overseas education is challenging.'",
      },
      {
        step: 2,
        title: "Pattern 2 — Word-class shift",
        titleVi: "Kiểu 2 — Đổi loại từ",
        description: "Verb becomes noun, adjective becomes adverb. Same root meaning, different grammar.",
        descriptionVi: "Động từ thành danh từ, tính từ thành trạng từ. Cùng gốc nghĩa, khác ngữ pháp.",
        example: "Q: 'The drug reduces inflammation.' Passage: 'A reduction in inflammation was observed.'",
      },
      {
        step: 3,
        title: "Pattern 3 — Voice / structure flip",
        titleVi: "Kiểu 3 — Đảo cấu trúc / thể",
        description: "Active becomes passive, cause-effect order reverses, relative clauses appear.",
        descriptionVi: "Chủ động thành bị động, đảo nhân-quả, xuất hiện mệnh đề quan hệ.",
        example: "Q: 'Scientists discovered the gene in 1998.' Passage: 'The gene was discovered in 1998.'",
      },
      {
        step: 4,
        title: "Pattern 4 — Generalisation / specification",
        titleVi: "Kiểu 4 — Khái quát / cụ thể hóa",
        description: "Specific examples in the passage → general category in the question (or vice versa).",
        descriptionVi: "Ví dụ cụ thể trong bài → danh từ chung trong câu hỏi (hoặc ngược lại).",
        example: "Q: 'transport problems' → Passage: 'traffic jams, late buses, expensive fuel'.",
      },
    ],
    practicalExamples: [
      {
        context: "Question: 'The new policy was unpopular with residents.'",
        contextVi: "Câu hỏi: 'Chính sách mới không được người dân ủng hộ.'",
        example:
          "Passage: 'Locals voiced strong opposition to the recently introduced rules.' → Match: 'residents'='locals', 'unpopular with'='voiced strong opposition to', 'new policy'='recently introduced rules'. Answer: TRUE.",
        explanation: "Three paraphrase swaps in one sentence — a Band 7 reader spots all three in under 8 seconds.",
      },
      {
        context: "Question: 'Most students prefer online classes.'",
        contextVi: "Câu hỏi: 'Đa số học sinh thích lớp online hơn.'",
        example:
          "Passage: 'Surveys reveal that learners overwhelmingly favour remote instruction.' → 'students'='learners', 'most…prefer'='overwhelmingly favour', 'online classes'='remote instruction'. Answer: TRUE.",
        explanation: "Generalisation ('most') is paraphrased by the adverb 'overwhelmingly'.",
      },
      {
        context: "Question: 'The factory damages the environment.'",
        contextVi: "Câu hỏi: 'Nhà máy gây hại môi trường.'",
        example:
          "Passage: 'Environmental degradation has been caused by the plant.' → Voice flip (active→passive) + 'damages'→'degradation' (noun form). Answer: TRUE.",
        explanation: "Pattern 2 (word-class) + Pattern 3 (passive) combined.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Searching for the exact words from the question",
        mistakeVi: "Tìm y nguyên từ trong câu hỏi",
        why: "Exact-word matches are almost always traps planted by the examiner.",
        whyVi: "Khớp y nguyên từ thường là bẫy do người ra đề cài.",
      },
      {
        mistake: "Trusting only one paraphrase clue",
        mistakeVi: "Chỉ tin một dấu hiệu paraphrase",
        why: "Confirm with 2 of 3 keywords paraphrased before locking the answer.",
        whyVi: "Xác nhận ít nhất 2/3 từ khóa được paraphrase trước khi chốt đáp án.",
      },
    ],
    goldenSecret:
      "Train your eye on Pattern 4 (generalisation). It is the #1 cause of NOT GIVEN wrong answers among Vietnamese learners.",
    goldenSecretVi:
      "Luyện mắt nhận Pattern 4 (khái quát hóa). Đây là lý do số 1 khiến học viên Việt sai NOT GIVEN.",
    vocabHighlights: [
      { word: "decode", definition: "convert hidden meaning to clear meaning", definitionVi: "giải mã", example: "Decode the question before scanning.", band: "7.0" },
      { word: "synonym", definition: "word with the same meaning", definitionVi: "từ đồng nghĩa", example: "Build a synonym bank weekly.", band: "6.5" },
      { word: "voice flip", definition: "active-passive transformation", definitionVi: "đảo thể chủ động/bị động", example: "Voice flips disguise easy answers.", band: "7.5" },
      { word: "generalisation", definition: "broader category covering examples", definitionVi: "sự khái quát hóa", example: "'Transport' is a generalisation of 'buses, trains'.", band: "7.5" },
      { word: "lock the answer", definition: "commit to a final choice", definitionVi: "chốt đáp án", example: "Don't lock the answer on one clue alone.", band: "7.0" },
    ],
    quiz: [
      {
        question: "How many paraphrase patterns are introduced?",
        options: ["2", "3", "4", "5"],
        answer: 2,
        explanation: "Synonym, Word-class, Voice/structure, Generalisation.",
      },
      {
        question: "'Children' → 'youngsters' is which pattern?",
        options: ["Voice flip", "Synonym swap", "Word-class shift", "Generalisation"],
        answer: 1,
        explanation: "Direct synonym replacement of a content word.",
      },
      {
        question: "'reduce' → 'a reduction in' is which pattern?",
        options: ["Synonym swap", "Word-class shift", "Generalisation", "Voice flip"],
        answer: 1,
        explanation: "Verb to noun is a word-class shift.",
      },
      {
        question: "Why are exact-word matches dangerous?",
        options: ["They never appear", "They are usually examiner traps", "They are too long", "They are graded harder"],
        answer: 1,
        explanation: "Exact matches are usually decoys.",
      },
      {
        question: "Before locking an answer, you should confirm at least…",
        options: ["1 clue", "2 of 3 paraphrased keywords", "all 4 patterns", "the entire paragraph meaning"],
        answer: 1,
        explanation: "Two confirmations protect against trap matches.",
      },
      {
        question: "Which pattern most often causes NOT GIVEN errors?",
        options: ["Synonym swap", "Word-class shift", "Voice flip", "Generalisation"],
        answer: 3,
        explanation: "Students misread broad categories as 'mentioned'.",
      },
    ],
    cheatSheetPoints: [
      "4 patterns: Synonym / Word-class / Voice / Generalisation",
      "Confirm 2 of 3 paraphrased keywords before locking",
      "Exact word match = likely trap",
      "Generalisation = #1 NOT GIVEN error source",
    ],
  },

  // ===================== 3. MATCHING HEADINGS =====================
  {
    id: "reading-matching-headings-mastery",
    title: "Reading — Matching Headings the Smart Way",
    titleVi: "Reading — Nối Tiêu đề thông minh",
    pillar: "skill-based",
    skill: "reading",
    icon: "🧩",
    duration: "16 min",
    level: "intermediate",
    description:
      "Matching Headings is feared because students attack it linearly. The smart route: process of elimination + topic-sentence triangulation.",
    descriptionVi:
      "Học sinh sợ Matching Headings vì làm tuần tự. Cách thông minh: loại trừ + tam giác câu chủ đề.",
    strategySteps: [
      {
        step: 1,
        title: "Read all headings FIRST",
        titleVi: "Đọc TẤT CẢ tiêu đề trước",
        description: "Underline the key noun in each heading. Group similar ones — they are the traps.",
        descriptionVi: "Gạch chân danh từ chính ở mỗi tiêu đề. Gom các tiêu đề giống nhau — đó chính là bẫy.",
        example: "Heading iv 'Economic impact' vs vi 'Financial consequences' — likely paraphrases, only one fits.",
      },
      {
        step: 2,
        title: "Read 1st + last sentence of each paragraph",
        titleVi: "Đọc câu đầu + câu cuối mỗi đoạn",
        description: "75% of headings match the topic sentence; 20% the concluding sentence; 5% the middle.",
        descriptionVi: "75% tiêu đề khớp câu chủ đề; 20% câu kết; 5% nằm ở giữa đoạn.",
      },
      {
        step: 3,
        title: "Eliminate the impossible",
        titleVi: "Loại bỏ tiêu đề bất khả",
        description: "Strike through any heading you have already used. Strike obvious mismatches. The pool shrinks fast.",
        descriptionVi: "Gạch những tiêu đề đã dùng. Gạch những tiêu đề rõ ràng lệch chủ đề. Số lựa chọn co lại nhanh.",
      },
      {
        step: 4,
        title: "Do the EASIEST paragraph first",
        titleVi: "Làm đoạn DỄ NHẤT trước",
        description: "Lock in 2-3 confident answers, then the remaining headings narrow themselves down.",
        descriptionVi: "Chốt 2-3 đáp án chắc chắn, các tiêu đề còn lại tự khoanh vùng.",
      },
    ],
    practicalExamples: [
      {
        context: "Paragraph starts: 'In 1995, only 4% of households owned a mobile phone…' then ends: '…by 2020 the figure had reached 96%.'",
        contextVi: "Đoạn mở: 'Năm 1995 chỉ 4% hộ gia đình có điện thoại di động…' kết: '…đến 2020 đã đạt 96%.'",
        example: "Heading 'The rapid spread of mobile technology' — matches both topic + conclusion. Lock it.",
        explanation: "Two ends of the paragraph point to the same idea = highest confidence.",
      },
      {
        context: "Paragraph discusses bee colony collapse with vivid examples but the topic sentence is generic.",
        contextVi: "Đoạn nói về sụp đổ đàn ong với ví dụ sinh động nhưng câu chủ đề chung chung.",
        example: "Don't lock yet. Skim the middle for the controlling noun — 'colony collapse' → match heading 'A growing ecological threat'.",
        explanation: "The 5% rule: when topic + last sentence fail, the middle holds the key noun.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Matching by single word overlap",
        mistakeVi: "Nối dựa trên 1 từ trùng",
        why: "Headings are paraphrased — one shared word usually = trap.",
        whyVi: "Tiêu đề đều được paraphrase — 1 từ trùng thường là bẫy.",
      },
      {
        mistake: "Doing paragraphs in order",
        mistakeVi: "Làm theo thứ tự đoạn",
        why: "You miss the chance to eliminate easy ones first.",
        whyVi: "Mất cơ hội loại trừ những đoạn dễ trước.",
      },
    ],
    goldenSecret:
      "Tiêu đề là PARAPHRASE của câu chủ đề. Headings = topic sentences in disguise. Train this match and Matching Headings drops from 'hardest' to 'fastest' question type.",
    goldenSecretVi:
      "Tiêu đề chính là CÂU CHỦ ĐỀ được paraphrase. Luyện kỹ năng này và dạng Matching Headings từ 'khó nhất' biến thành 'nhanh nhất'.",
    vocabHighlights: [
      { word: "triangulate", definition: "confirm from multiple points", definitionVi: "tam giác hóa, đối chiếu nhiều điểm", example: "Triangulate topic + conclusion.", band: "7.5" },
      { word: "controlling noun", definition: "main subject noun of a paragraph", definitionVi: "danh từ chủ đạo của đoạn", example: "Find the controlling noun first.", band: "7.5" },
      { word: "process of elimination", definition: "narrow choices by removing wrong ones", definitionVi: "phương pháp loại trừ", example: "Use process of elimination on headings.", band: "7.0" },
      { word: "in disguise", definition: "hidden under different appearance", definitionVi: "núp dưới vẻ ngoài khác", example: "Headings are topic sentences in disguise.", band: "7.5" },
    ],
    quiz: [
      {
        question: "What should you read FIRST in Matching Headings?",
        options: ["The whole passage", "All headings together", "Only paragraph A", "The instructions only"],
        answer: 1,
        explanation: "Read all headings first to spot paraphrase trap pairs.",
      },
      {
        question: "Where do most heading answers come from?",
        options: ["Middle of paragraph", "Topic sentence", "Last word", "Title of the passage"],
        answer: 1,
        explanation: "About 75% match the topic sentence.",
      },
      {
        question: "Doing the EASIEST paragraph first is useful because…",
        options: ["It looks neater", "It eliminates options for the rest", "Examiners reward it", "It saves ink"],
        answer: 1,
        explanation: "Eliminated headings narrow the remaining choices.",
      },
      {
        question: "If one word in the heading matches one word in the paragraph, you should…",
        options: ["Lock the answer", "Treat it as a likely trap and verify", "Skip the question", "Pick the next heading"],
        answer: 1,
        explanation: "Single-word overlaps are usually decoys.",
      },
      {
        question: "Two headings sound similar (e.g. 'economic' vs 'financial'). This means…",
        options: ["Both are wrong", "One is the answer, one is a trap", "They both apply", "Pick alphabetically"],
        answer: 1,
        explanation: "Paraphrase pairs are deliberate traps; only one fits.",
      },
      {
        question: "If topic + last sentence don't help, where do you look next?",
        options: ["Title", "Middle of paragraph for controlling noun", "Next paragraph", "Previous heading"],
        answer: 1,
        explanation: "5% of headings hinge on a controlling noun mid-paragraph.",
      },
    ],
    cheatSheetPoints: [
      "Read all headings first; mark paraphrase pairs",
      "75% match topic sentence; 20% conclusion; 5% middle noun",
      "Lock easiest paragraphs first → eliminate options",
      "Single-word match = trap until proven otherwise",
    ],
  },

  // ===================== 4. TIME RESCUE =====================
  {
    id: "reading-time-rescue",
    title: "Reading — 60-Minute Battle Plan & Rescue Tactics",
    titleVi: "Reading — Sơ đồ 60 phút & cứu nguy thời gian",
    pillar: "tips-hacks",
    skill: "reading",
    icon: "⏱️",
    duration: "15 min",
    level: "intermediate",
    description:
      "A minute-by-minute battle plan for the 60-minute Reading test, plus rescue tactics when time slips away.",
    descriptionVi:
      "Kế hoạch tác chiến từng phút cho bài Reading 60 phút, kèm chiến thuật cứu nguy khi thời gian trượt.",
    strategySteps: [
      {
        step: 1,
        title: "Minutes 0-2 — Pre-flight",
        titleVi: "Phút 0-2 — Tiền bay",
        description: "Write '20 / 40 / 60' on the answer sheet — your hard checkpoints for each passage.",
        descriptionVi: "Ghi '20 / 40 / 60' lên phiếu trả lời — mốc cứng cho từng passage.",
      },
      {
        step: 2,
        title: "Passages in difficulty order",
        titleVi: "Làm passage theo độ khó",
        description: "Open all 3 passages. Choose the EASIEST first — often Passage 2 in Academic. Confidence builds speed.",
        descriptionVi: "Mở cả 3 bài. Chọn bài DỄ NHẤT làm trước — thường là Passage 2 (Academic). Tự tin → tốc độ.",
      },
      {
        step: 3,
        title: "Transfer in BATCHES of 13",
        titleVi: "Chuyển đáp án theo CỤM 13",
        description: "Transfer all answers from a passage at once when you finish it — never one-by-one.",
        descriptionVi: "Chuyển toàn bộ đáp án 1 passage ngay khi xong — không chuyển từng câu.",
      },
      {
        step: 4,
        title: "Last 5 minutes — Sweep mode",
        titleVi: "5 phút cuối — Quét sạch",
        description: "Fill every blank with a guess. B for MCQ, NOT GIVEN for T/F/NG, the most common word-length answer for fill-in.",
        descriptionVi: "Lấp mọi ô trống bằng đoán. MCQ chọn B, T/F/NG chọn NOT GIVEN, fill-in chọn câu trả lời ngắn phổ biến nhất.",
      },
    ],
    practicalExamples: [
      {
        context: "It is minute 38 and you are still on Passage 2.",
        contextVi: "Đã phút thứ 38 mà bạn vẫn ở Passage 2.",
        example: "Rescue: transfer current answers, jump to Passage 3 immediately. You will earn more marks from 15 fresh minutes on P3 than 7 stuck on P2.",
        explanation: "Marginal value of a new passage > finishing a stuck one.",
      },
      {
        context: "You have 3 questions left and 90 seconds.",
        contextVi: "Còn 3 câu mà chỉ còn 90 giây.",
        example: "Guess all 3 instantly. Use the 90 seconds to RECHECK the 2 questions you were least sure about.",
        explanation: "Verified upgrades > new attempts in the final minute.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Transferring answers one by one",
        mistakeVi: "Chuyển đáp án từng câu một",
        why: "Wastes ~5 minutes over the whole test and breaks scanning rhythm.",
        whyVi: "Phí ~5 phút cả bài và phá nhịp scan.",
      },
      {
        mistake: "Doing passages in order out of habit",
        mistakeVi: "Làm theo thứ tự bài vì thói quen",
        why: "Passage 3 is the hardest — leaving it last with low energy costs 4-6 marks.",
        whyVi: "Passage 3 khó nhất — để cuối khi đã mệt, mất 4-6 điểm.",
      },
    ],
    goldenSecret:
      "The student who FINISHES the test beats the student who 'understands every passage'. Speed > comprehension in IELTS Reading.",
    goldenSecretVi:
      "Học sinh HOÀN THÀNH bài luôn thắng học sinh 'hiểu trọn vẹn'. Trong IELTS Reading, tốc độ thắng độ hiểu sâu.",
    vocabHighlights: [
      { word: "checkpoint", definition: "fixed time marker", definitionVi: "mốc thời gian cố định", example: "Mark a checkpoint every 20 minutes.", band: "7.0" },
      { word: "rescue tactic", definition: "emergency plan when time is short", definitionVi: "chiến thuật cứu nguy", example: "Have a rescue tactic ready.", band: "7.5" },
      { word: "marginal value", definition: "extra benefit per extra unit", definitionVi: "giá trị biên", example: "Marginal value of a new passage is high.", band: "8.0" },
      { word: "sweep mode", definition: "fast clean-up phase", definitionVi: "chế độ quét cuối", example: "Enter sweep mode at minute 55.", band: "7.5" },
    ],
    quiz: [
      {
        question: "What should you write on the answer sheet in the first 2 minutes?",
        options: ["Your name twice", "Time checkpoints '20 / 40 / 60'", "All headings", "A summary"],
        answer: 1,
        explanation: "Visible checkpoints stop time slippage.",
      },
      {
        question: "Why transfer answers in batches?",
        options: ["Examiner prefers it", "Saves ~5 minutes total and protects scanning rhythm", "It looks neater", "Required by the rules"],
        answer: 1,
        explanation: "Batch transfer is faster and less distracting.",
      },
      {
        question: "Best statistically safe MCQ guess letter?",
        options: ["A", "B", "C", "D"],
        answer: 1,
        explanation: "Across IELTS exams, B is marginally the safest blind pick.",
      },
      {
        question: "If you reach minute 38 still on Passage 2 you should…",
        options: ["Keep going to finish P2", "Jump to Passage 3 immediately", "Skip to questions 35-40", "Give up"],
        answer: 1,
        explanation: "Marginal value of a fresh passage > finishing a stuck one.",
      },
      {
        question: "Best use of the last 90 seconds with 3 blanks?",
        options: ["Try to answer all 3 properly", "Guess all 3, then recheck 2 uncertain answers", "Leave blank for honesty", "Start a 4th passage"],
        answer: 1,
        explanation: "Guess first, then verify upgrades.",
      },
      {
        question: "Which passage do most candidates wrongly leave for last?",
        options: ["Passage 1", "Passage 2", "Passage 3", "It doesn't matter"],
        answer: 2,
        explanation: "Passage 3 is hardest; doing it last with low energy is costly.",
      },
    ],
    cheatSheetPoints: [
      "Write 20/40/60 checkpoints in minute 1",
      "Easiest passage first; never order by paper",
      "Transfer answers in batches of 13",
      "Last 5 minutes = sweep mode (B / NOT GIVEN / common length)",
    ],
  },
];

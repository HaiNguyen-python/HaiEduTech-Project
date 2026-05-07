/**
 * @file englishSatExpansion9.ts
 * @description Beginner-friendly "soft start" SAT lessons (level 1–2) - designed
 * so learners don't feel overwhelmed at the start of the 30-week roadmap.
 * Each module begins with very gentle warm-ups, then adds 1–2 mid-level lessons
 * that bridge into existing intermediate/advanced content.
 *
 * Design principles
 * ─────────────────
 * • Short theory blocks, lots of mini-examples
 * • 4–6 simple fill-in-blank items per exercise
 * • 2–3 quiz Qs with friendly explanations
 * • All bilingual (vi / en) - keeps parity with the rest of SAT data
 *
 * @author HaiEduTech
 */
import type { LanguageModule } from "./types";

const v = (
  word: string,
  meaning: string,
  meaningEn: string,
  example: string,
  exampleEn?: string,
) => ({
  word,
  partOfSpeech: "noun",
  meaning,
  meaningEn,
  example,
  exampleEn: exampleEn ?? example,
});

export const satExpansionModules9: LanguageModule[] = [
  // ───────────────────────────────────────────────────────────────────
  // Module 1 · SAT Starter Kit (Week 0 - before diagnostic)
  // ───────────────────────────────────────────────────────────────────
  {
    id: "sat-starter-kit",
    title: "SAT Khởi Động - Tuần 0 nhẹ nhàng",
    titleEn: "SAT Starter Kit - A Gentle Week 0",
    icon: "🌱",
    color: "from-emerald-400 to-teal-500",
    description:
      "Bộ bài đầu tiên dành cho học sinh chưa từng học SAT. Mỗi bài chỉ ~10 phút, không áp lực, giúp làm quen format và thuật ngữ trước khi bước vào Tuần 1.",
    descriptionEn:
      "The very first lessons for absolute beginners. ~10 min each, zero pressure - get comfortable with SAT format and vocabulary before Week 1.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-meet-the-test",
        title: "Bài 1 · Làm quen với Digital SAT",
        titleEn: "Lesson 1 · Meet the Digital SAT",
        level: 1,
        difficulty: "beginner",
        theory:
          "Digital SAT là bài thi trên máy tính, gồm 2 phần: Reading & Writing (R&W) và Math.\n\nMỗi phần có 2 module nhỏ. Bạn làm xong module 1 rồi mới sang module 2 - không quay lại được.\n\nThời gian tổng: khoảng 2 giờ 14 phút (gồm 10 phút giải lao). Điểm tổng: 400–1600.\n\nKhông cần học hết mọi thứ trong tuần đầu - bạn chỉ cần biết bài thi 'trông' như thế nào.",
        theoryEn:
          "The Digital SAT is taken on a laptop. It has 2 sections: Reading & Writing (R&W) and Math.\n\nEach section has 2 smaller modules. You finish module 1 before module 2 - you cannot go back.\n\nTotal time: ~2 h 14 min (including a 10-min break). Total score: 400–1600.\n\nYou don't need to master anything in week 1 - just see what the test looks like.",
        proTips: [
          "Cài Bluebook ngay hôm nay - chỉ vài phút.",
          "Không lo điểm số ở bước này. Mục tiêu là 'không sợ' bài thi.",
          "Xem 1 video tour Bluebook trên YouTube (5 phút) là đủ.",
        ],
        proTipsEn: [
          "Install Bluebook today - it takes minutes.",
          "Don't worry about scores yet. The goal is to 'not fear' the test.",
          "Watch one 5-minute Bluebook tour on YouTube - that's plenty.",
        ],
        vocabulary: [
          v("module", "phần nhỏ trong section", "a small part within a section", "Each section has 2 modules."),
          v("adaptive", "điều chỉnh theo năng lực", "adjusting to your performance", "The SAT is adaptive."),
          v("section", "phần lớn của bài thi", "a major part of the test", "There are 2 sections."),
          v("digital", "kỹ thuật số", "on a computer", "The SAT is fully digital."),
          v("Bluebook", "phần mềm thi SAT", "the SAT testing app", "Download Bluebook from College Board."),
          v("score", "điểm số", "the result you get", "Your score ranges 400–1600."),
          v("break", "giờ giải lao", "rest time between sections", "There's a 10-minute break."),
          v("pacing", "quản lý tốc độ", "managing your time", "Pacing is a skill, not luck."),
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền vào chỗ trống dựa trên bài đọc:",
            instructionEn: "Fill in the blanks based on the lesson:",
            sentences: [
              { text: "The Digital SAT has ___ sections.", textEn: "The Digital SAT has ___ sections.", answer: "2" },
              { text: "Each section is split into ___ modules.", textEn: "Each section is split into ___ modules.", answer: "2" },
              { text: "The total score range is 400 to ___.", textEn: "The total score range is 400 to ___.", answer: "1600" },
              { text: "You take the test using a software called ___.", textEn: "You take the test using a software called ___.", answer: "Bluebook" },
            ],
          },
        ],
        quiz: [
          {
            question: "Can you go back to module 1 after starting module 2?",
            options: ["Yes, anytime", "No, never", "Only in Math", "Only with permission"],
            answer: 1,
            explanation: "Once you submit module 1, it locks. Plan your time inside each module.",
          },
          {
            question: "What is the total testing time (with break)?",
            options: ["~1 hour", "~2 h 14 min", "~3 hours", "~4 hours"],
            answer: 1,
            explanation: "Roughly 2 hours 14 minutes total, including the 10-minute break.",
          },
        ],
      },
      {
        id: "sat-test-mindset-101",
        title: "Bài 2 · Tâm lý học thi nhẹ nhàng",
        titleEn: "Lesson 2 · A Gentle Test Mindset",
        level: 1,
        difficulty: "beginner",
        theory:
          "Học SAT là một hành trình 6 tháng - không phải sprint 1 tuần. Hãy đặt 3 luật vàng cho bản thân:\n\n1) **Mỗi ngày 30–45 phút** là đủ trong 4 tuần đầu.\n2) **Sai = học.** Mỗi câu sai là 1 'data point', không phải lỗi cá nhân.\n3) **Ngủ đủ giấc** quan trọng hơn 1 giờ luyện thêm.\n\nNếu cảm thấy ngộp, hãy dừng, đi bộ 10 phút, rồi quay lại. Não cần nghỉ để hấp thụ.",
        theoryEn:
          "Studying for the SAT is a 6-month journey - not a 1-week sprint. Set yourself 3 golden rules:\n\n1) **30–45 minutes a day** is enough for the first 4 weeks.\n2) **Mistakes = learning.** Every miss is a 'data point', not a personal flaw.\n3) **Sleep matters** more than an extra hour of study.\n\nIf you feel overwhelmed, stop, walk for 10 minutes, then come back. Your brain needs rest to absorb.",
        proTips: [
          "Lịch học cố định mỗi ngày dễ hơn cố gắng học '2 giờ vào cuối tuần'.",
          "Báo gia đình lịch học để tránh bị làm phiền.",
          "Đặt mục tiêu nhỏ tuần 1: chỉ cần 'biết tên 4 phần kiến thức R&W'.",
        ],
        proTipsEn: [
          "A fixed daily slot beats trying to cram '2 hours on the weekend'.",
          "Tell your family your schedule to avoid interruptions.",
          "Set a tiny week-1 goal: just 'name the 4 R&W content domains'.",
        ],
        vocabulary: [
          v("mindset", "tư duy", "the way you think", "Growth mindset wins SAT prep."),
          v("consistency", "sự đều đặn", "doing it regularly", "Consistency beats intensity."),
          v("burnout", "kiệt sức", "running out of energy", "Avoid burnout with rest days."),
          v("goal", "mục tiêu", "what you aim for", "Set tiny weekly goals."),
          v("habit", "thói quen", "automatic behavior", "Build study habits early."),
          v("focus", "sự tập trung", "directed attention", "Focus beats hours."),
          v("reflection", "sự tự nhìn lại", "thinking about your work", "End each session with reflection."),
          v("growth", "sự tiến bộ", "improvement over time", "Track growth, not perfection."),
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành câu theo nguyên tắc đã học:",
            instructionEn: "Complete the sentence based on the rules:",
            sentences: [
              { text: "In the first 4 weeks, ___ minutes a day is enough.", textEn: "In the first 4 weeks, ___ minutes a day is enough.", answer: "30" },
              { text: "A mistake should be treated as a ___ point.", textEn: "A mistake should be treated as a ___ point.", answer: "data" },
              { text: "Sleep is ___ important than one extra hour of study.", textEn: "Sleep is ___ important than one extra hour of study.", answer: "more" },
              { text: "If overwhelmed, stop and ___ for 10 minutes.", textEn: "If overwhelmed, stop and ___ for 10 minutes.", answer: "walk" },
            ],
          },
        ],
        quiz: [
          {
            question: "Which mindset best matches this lesson?",
            options: [
              "Cram everything in 1 week.",
              "Daily small effort + rest beats sprints.",
              "Skip sleep to study more.",
              "Hide your schedule from family.",
            ],
            answer: 1,
            explanation: "SAT prep rewards consistency and recovery, not heroic cram sessions.",
          },
        ],
      },
      {
        id: "sat-vocab-warmup-30",
        title: "Bài 3 · 30 từ SAT 'cực dễ' đầu tiên",
        titleEn: "Lesson 3 · Your First 30 'Easy' SAT Words",
        level: 1,
        difficulty: "beginner",
        theory:
          "Trước khi vào 80 từ Set 1 (Tuần 2), hãy làm quen 30 từ 'cực dễ' nhưng cực hay xuất hiện. Mỗi từ chỉ cần học 1 nghĩa cốt lõi + 1 ví dụ ngắn.\n\nMẹo: đọc to 3 lần, tự đặt 1 câu - vậy là từ đã 'vào tay' bạn. Đừng học bằng cách nhìn list im lặng.",
        theoryEn:
          "Before you tackle 80 Set-1 words (Week 2), warm up with 30 'easy' words that show up constantly. Learn just one core meaning + one short example each.\n\nTip: read aloud 3 times, write your own sentence - that's how a word truly sticks. Don't 'learn' by silently staring at a list.",
        proTips: [
          "Mỗi ngày 6 từ × 5 ngày = 30 từ - không nhồi 30 từ trong 1 buổi.",
          "Ghi từ ra giấy, không gõ điện thoại - tay viết giúp nhớ lâu hơn.",
          "Tự đặt câu liên quan đến cuộc sống của bạn (gia đình, trường, sở thích).",
        ],
        proTipsEn: [
          "6 words × 5 days = 30 - don't cram all 30 in one sitting.",
          "Hand-write the words; typing is weaker for retention.",
          "Write personal sentences (family, school, hobbies).",
        ],
        vocabulary: [
          v("benefit", "lợi ích", "a positive outcome", "Exercise has many benefits."),
          v("require", "yêu cầu", "to need or demand", "This job requires patience."),
          v("reveal", "tiết lộ", "to show what was hidden", "The data reveal a clear trend."),
          v("suggest", "gợi ý", "to hint or recommend", "The chart suggests growth."),
          v("ensure", "đảm bảo", "to make sure", "Ensure you sleep well."),
          v("decline", "giảm sút", "to go down", "Sales declined last quarter."),
          v("expand", "mở rộng", "to grow larger", "The city is expanding fast."),
          v("contain", "chứa", "to hold inside", "The book contains 12 chapters."),
          v("influence", "ảnh hưởng", "to affect", "Music influences mood."),
          v("emerge", "xuất hiện", "to come into view", "A new pattern emerged."),
          v("conclude", "kết luận", "to decide after thinking", "The author concludes that…"),
          v("argue", "lập luận", "to give reasons for a view", "She argues for change."),
          v("describe", "mô tả", "to tell about", "Describe what you see."),
          v("compare", "so sánh", "to look for similarities", "Compare the two graphs."),
          v("contrast", "đối chiếu", "to look for differences", "Contrast the two views."),
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn từ phù hợp nhất:",
            instructionEn: "Pick the best word:",
            sentences: [
              { text: "The study ___ that early sleep improves memory.", textEn: "The study ___ that early sleep improves memory.", answer: "suggests" },
              { text: "Please ___ that the door is locked.", textEn: "Please ___ that the door is locked.", answer: "ensure" },
              { text: "Sales began to ___ after the price rose.", textEn: "Sales began to ___ after the price rose.", answer: "decline" },
              { text: "A new theory began to ___ in the 1990s.", textEn: "A new theory began to ___ in the 1990s.", answer: "emerge" },
              { text: "The author ___ that more research is needed.", textEn: "The author ___ that more research is needed.", answer: "concludes" },
            ],
          },
        ],
        quiz: [
          {
            question: "‘Reveal’ is closest in meaning to…",
            options: ["hide", "show", "ask", "ignore"],
            answer: 1,
            explanation: "‘Reveal’ means to show what was previously hidden.",
          },
          {
            question: "Which word means ‘to make larger’?",
            options: ["contain", "decline", "expand", "describe"],
            answer: 2,
            explanation: "‘Expand’ = grow larger or wider.",
          },
        ],
      },
      {
        id: "sat-question-types-tour",
        title: "Bài 4 · Tour 5 phút qua các dạng câu hỏi",
        titleEn: "Lesson 4 · A 5-Minute Tour of Question Types",
        level: 1,
        difficulty: "beginner",
        theory:
          "R&W có 4 nhóm câu hỏi chính:\n• Information & Ideas (ý chính, dẫn chứng, suy luận)\n• Craft & Structure (từ vựng theo ngữ cảnh, mục đích, cấu trúc)\n• Standard English Conventions (ngữ pháp & dấu câu)\n• Expression of Ideas (chuyển ý, tổng hợp ý)\n\nMath có 4 nhóm: Algebra · Advanced Math · Problem-Solving & Data · Geometry & Trig.\n\nTuần 1 chỉ cần biết TÊN 4 nhóm - chưa cần luyện sâu.",
        theoryEn:
          "R&W has 4 question groups:\n• Information & Ideas (main idea, evidence, inference)\n• Craft & Structure (words in context, purpose, structure)\n• Standard English Conventions (grammar & punctuation)\n• Expression of Ideas (transitions, synthesis)\n\nMath has 4 groups: Algebra · Advanced Math · Problem-Solving & Data · Geometry & Trig.\n\nIn week 1, you only need to NAME the 4 groups - no deep practice yet.",
        proTips: [
          "Vẽ sơ đồ tư duy 4 nhóm R&W + 4 nhóm Math vào sổ tay.",
          "Khi gặp 1 câu, tập tự hỏi 'câu này thuộc nhóm nào?' trước khi giải.",
          "Phân loại đúng dạng câu = đã giải xong 30% bài toán.",
        ],
        proTipsEn: [
          "Draw a mind map of the 4 R&W + 4 Math groups in your notebook.",
          "Before solving, ask: 'which group is this?'",
          "Naming the type correctly is already 30% of the work.",
        ],
        vocabulary: [
          v("inference", "suy luận", "a reasoned guess", "Inference questions are common."),
          v("evidence", "dẫn chứng", "support from text", "Always cite evidence."),
          v("convention", "quy ước", "standard rule", "Conventions test grammar."),
          v("transition", "chuyển ý", "a connecting word", "Transitions guide the reader."),
          v("algebra", "đại số", "branch of math with variables", "Algebra is ~35% of Math."),
          v("geometry", "hình học", "branch of math with shapes", "Geometry tests triangles often."),
          v("synthesis", "tổng hợp", "combining ideas", "Synthesis writes one sentence."),
          v("structure", "cấu trúc", "how a passage is built", "Structure questions ask 'how is this organized?'."),
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền tên nhóm câu hỏi:",
            instructionEn: "Fill in the question-group name:",
            sentences: [
              { text: "Questions about commas and semicolons belong to ___ English Conventions.", textEn: "Questions about commas and semicolons belong to ___ English Conventions.", answer: "Standard" },
              { text: "Questions about line graphs and ratios are part of ___-Solving and Data Analysis.", textEn: "Questions about line graphs and ratios are part of ___-Solving and Data Analysis.", answer: "Problem" },
              { text: "Questions asking ‘what does the underlined word mean’ are Words in ___.", textEn: "Questions asking ‘what does the underlined word mean’ are Words in ___.", answer: "Context" },
              { text: "Quadratics belong to ___ Math.", textEn: "Quadratics belong to ___ Math.", answer: "Advanced" },
            ],
          },
        ],
        quiz: [
          {
            question: "How many R&W question groups are there?",
            options: ["2", "3", "4", "5"],
            answer: 2,
            explanation: "Information & Ideas · Craft & Structure · Conventions · Expression of Ideas - that's 4.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  // Module 2 · Reading Soft Start (before Words-in-Context Set 1)
  // ───────────────────────────────────────────────────────────────────
  {
    id: "sat-reading-soft-start",
    title: "Reading Khởi Động - Trước Tuần 2",
    titleEn: "Reading Soft Start - Before Week 2",
    icon: "📖",
    color: "from-sky-400 to-blue-500",
    description:
      "Ba bài đọc rất ngắn (80–120 từ) để học sinh quen cảm giác đọc-rồi-trả-lời mà không bị nản với passage SAT thật.",
    descriptionEn:
      "Three very short passages (80–120 words) to get learners comfortable with the read-then-answer rhythm - without the intimidation of full SAT passages.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-reading-mini-1",
        title: "Bài đọc nhỏ #1 · Ý chính cơ bản",
        titleEn: "Mini-Reading #1 · Basic Main Idea",
        level: 1,
        difficulty: "beginner",
        theory:
          "Trước khi đọc một đoạn dài, hãy luyện 'trả lời 1 câu hỏi 1 đoạn 80 từ'. Mục tiêu duy nhất: tìm 'câu chủ đề' (thường là câu đầu hoặc câu cuối).\n\nĐoạn mẫu: 'Bees are essential pollinators. Without them, many crops would fail. Yet bee populations are shrinking due to pesticides and habitat loss. Protecting bees is therefore protecting our food supply.'\n\nÝ chính: Bảo vệ ong = bảo vệ nguồn thực phẩm.",
        theoryEn:
          "Before tackling long passages, practice '1 question per 80-word paragraph'. Your only goal: find the topic sentence (usually first or last).\n\nSample: 'Bees are essential pollinators. Without them, many crops would fail. Yet bee populations are shrinking due to pesticides and habitat loss. Protecting bees is therefore protecting our food supply.'\n\nMain idea: Protecting bees = protecting our food.",
        proTips: [
          "Đọc 1 lần thật chậm hơn là đọc 3 lần lướt qua.",
          "Câu đầu + câu cuối thường nắm 70% ý chính.",
          "Tự nói lại đoạn bằng 1 câu của bạn - nếu nói được, bạn đã hiểu.",
        ],
        proTipsEn: [
          "One slow read beats three skims.",
          "First + last sentences often hold 70% of the meaning.",
          "Restate the passage in your own one sentence - that proves you understood.",
        ],
        vocabulary: [
          v("pollinator", "loài thụ phấn", "an animal that spreads pollen", "Bees are key pollinators."),
          v("crop", "vụ mùa", "a plant grown for food", "Crops depend on bees."),
          v("pesticide", "thuốc trừ sâu", "chemical that kills pests", "Pesticides harm bees."),
          v("habitat", "môi trường sống", "where a species lives", "Habitat loss hurts wildlife."),
          v("supply", "nguồn cung", "available amount", "Our food supply is fragile."),
          v("essential", "thiết yếu", "absolutely needed", "Bees are essential."),
          v("shrink", "thu hẹp", "to become smaller", "Populations are shrinking."),
          v("protect", "bảo vệ", "to keep safe", "We must protect them."),
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Trả lời câu hỏi về đoạn 'bees':",
            instructionEn: "Answer questions about the bees passage:",
            sentences: [
              { text: "The main idea is: protecting bees protects our ___.", textEn: "The main idea is: protecting bees protects our ___.", answer: "food" },
              { text: "Two reasons bees are shrinking: pesticides and ___ loss.", textEn: "Two reasons bees are shrinking: pesticides and ___ loss.", answer: "habitat" },
              { text: "Bees help crops by acting as ___.", textEn: "Bees help crops by acting as ___.", answer: "pollinators" },
            ],
          },
        ],
        quiz: [
          {
            question: "Which sentence best states the passage's main idea?",
            options: [
              "Bees produce honey for humans.",
              "Pesticides are dangerous chemicals.",
              "Protecting bees protects our food supply.",
              "Many crops fail every year.",
            ],
            answer: 2,
            explanation: "The closing sentence frames the whole paragraph's purpose.",
          },
        ],
      },
      {
        id: "sat-reading-mini-2",
        title: "Bài đọc nhỏ #2 · Tìm dẫn chứng",
        titleEn: "Mini-Reading #2 · Spotting Evidence",
        level: 2,
        difficulty: "beginner",
        theory:
          "Một câu hỏi 'evidence' yêu cầu bạn chỉ vào DÒNG cụ thể. Đừng đoán - hãy tìm.\n\nMẫu: 'In 2010, the city built 12 new bike lanes. Within 3 years, cycling commutes doubled. Air quality also improved measurably.'\n\nNếu hỏi 'điều gì cho thấy chính sách hiệu quả?' → dòng 'cycling commutes doubled' và 'air quality improved' chính là dẫn chứng.",
        theoryEn:
          "An 'evidence' question wants you to point to a specific LINE. Don't guess - find it.\n\nSample: 'In 2010, the city built 12 new bike lanes. Within 3 years, cycling commutes doubled. Air quality also improved measurably.'\n\nIf asked 'what shows the policy worked?' → the lines 'cycling commutes doubled' and 'air quality improved' are the evidence.",
        proTips: [
          "Đặt ngón tay vào dòng dẫn chứng trước khi nhìn 4 đáp án.",
          "Đáp án đúng hầu như là 'dịch lại' câu trong đoạn - không phải lời mới.",
          "Nếu 4 đáp án đều 'có vẻ đúng', đáp án có dòng cụ thể nhất thường thắng.",
        ],
        proTipsEn: [
          "Point your finger at the evidence line before looking at the 4 choices.",
          "The right answer is usually a 'paraphrase' of the line - not new info.",
          "If all 4 choices look right, the most specifically cited one usually wins.",
        ],
        vocabulary: [
          v("evidence", "dẫn chứng", "proof from the text", "Cite evidence for every claim."),
          v("commute", "việc đi lại hàng ngày", "daily travel to work", "Cycling commutes doubled."),
          v("policy", "chính sách", "an official plan", "The bike-lane policy worked."),
          v("measure", "đo lường", "to find a value", "Air quality is measurable."),
          v("improve", "cải thiện", "get better", "Air quality improved."),
          v("double", "gấp đôi", "become twice as much", "Commutes doubled."),
          v("lane", "làn đường", "a marked road strip", "12 bike lanes were built."),
          v("citation", "trích dẫn", "a referenced quote", "Use a direct citation."),
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền dẫn chứng từ đoạn:",
            instructionEn: "Fill in the evidence from the passage:",
            sentences: [
              { text: "The city built ___ new bike lanes in 2010.", textEn: "The city built ___ new bike lanes in 2010.", answer: "12" },
              { text: "Within 3 years, cycling commutes ___.", textEn: "Within 3 years, cycling commutes ___.", answer: "doubled" },
              { text: "Air quality improved ___.", textEn: "Air quality improved ___.", answer: "measurably" },
            ],
          },
        ],
        quiz: [
          {
            question: "Which line best supports 'the policy was effective'?",
            options: [
              "‘In 2010, the city built 12 new bike lanes.’",
              "‘Cycling commutes doubled and air quality improved.’",
              "‘The city is large.’",
              "‘Bike lanes are made of paint.’",
            ],
            answer: 1,
            explanation: "Effectiveness is shown by results (commutes + air), not the action itself.",
          },
        ],
      },
      {
        id: "sat-reading-mini-3",
        title: "Bài đọc nhỏ #3 · Đoán nghĩa từ ngữ cảnh",
        titleEn: "Mini-Reading #3 · Guessing Words from Context",
        level: 2,
        difficulty: "beginner",
        theory:
          "Khi gặp từ lạ, đừng dừng lại - đọc tiếp 1 câu trước và 1 câu sau. 90% thời gian, ngữ cảnh sẽ 'mở khoá' nghĩa.\n\nMẫu: 'The lecture was so prolix that half the audience left early - every point seemed to take forever.'\n\nDù chưa biết 'prolix', bạn đoán được = dài dòng (vì 'take forever' + 'left early' là dấu hiệu).",
        theoryEn:
          "When you hit a strange word, don't stop - read one sentence before and one after. 90% of the time, context unlocks the meaning.\n\nSample: 'The lecture was so prolix that half the audience left early - every point seemed to take forever.'\n\nEven without knowing 'prolix', you can guess = long-winded (because 'take forever' + 'left early' are clues).",
        proTips: [
          "Tìm 'tín hiệu cảm xúc' (positive / negative / neutral) trước khi tìm nghĩa chi tiết.",
          "Dấu '-' và ',' thường giới thiệu cách giải thích từ khó ngay sau đó.",
          "Đừng dịch từng từ - dịch 'cảm giác' của câu.",
        ],
        proTipsEn: [
          "Find the 'emotional signal' (positive / negative / neutral) before the precise meaning.",
          "Dashes '-' and commas often introduce a definition right after the hard word.",
          "Don't translate word-by-word - translate the 'feel' of the sentence.",
        ],
        vocabulary: [
          v("context", "ngữ cảnh", "surrounding text", "Use context to guess words."),
          v("clue", "manh mối", "a hint", "Look for clues nearby."),
          v("prolix", "dài dòng", "using too many words", "His speech was prolix."),
          v("audience", "khán giả", "the listeners", "The audience grew tired."),
          v("guess", "đoán", "to make a smart estimate", "Guess from context."),
          v("signal", "tín hiệu", "an indicator", "‘But’ signals contrast."),
          v("tone", "giọng điệu", "feel of the writing", "Tone tells you positive or negative."),
          v("definition", "định nghĩa", "the exact meaning", "A definition often follows a dash."),
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Đoán từ dựa trên ngữ cảnh:",
            instructionEn: "Guess the word from context:",
            sentences: [
              { text: "‘Prolix’ in the passage most nearly means ___ (one word).", textEn: "‘Prolix’ in the passage most nearly means ___ (one word).", answer: "long-winded" },
              { text: "Two clues that helped: ‘take forever’ and ‘left ___’.", textEn: "Two clues that helped: ‘take forever’ and ‘left ___’.", answer: "early" },
              { text: "The dash often introduces a ___.", textEn: "The dash often introduces a ___.", answer: "definition" },
            ],
          },
        ],
        quiz: [
          {
            question: "‘Prolix’ in the lecture passage most nearly means…",
            options: ["short and sharp", "exciting", "long-winded", "silent"],
            answer: 2,
            explanation: "Audience left early + 'take forever' = the lecture was overly long.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  // Module 3 · Math Soft Start (before Algebra Week 6)
  // ───────────────────────────────────────────────────────────────────
  {
    id: "sat-math-soft-start",
    title: "Math Khởi Động - Ôn nền tảng lớp 8–9",
    titleEn: "Math Soft Start - Grade 8–9 Refresh",
    icon: "🧮",
    color: "from-amber-400 to-orange-500",
    description:
      "Ba bài Math 'không sợ' giúp ôn lại số hữu tỷ, % và phương trình bậc 1 - nền tảng vững trước khi vào Algebra Tuần 6.",
    descriptionEn:
      "Three 'no-fear' Math lessons reviewing rationals, percents, and 1-step linear equations - solid ground before Algebra in Week 6.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-math-numbers-refresh",
        title: "Math nền tảng #1 · Phân số, số thập phân, %",
        titleEn: "Foundation #1 · Fractions, Decimals, Percents",
        level: 1,
        difficulty: "beginner",
        theory:
          "Mọi đề SAT Math đều ngầm giả định bạn 'mượt' với 3 dạng số: phân số (1/4), thập phân (0.25), phần trăm (25%). Cả 3 đều bằng nhau.\n\nQuy tắc nhanh:\n• % → thập phân: chia 100 (35% = 0.35).\n• Thập phân → phân số: viết trên mẫu 10/100/1000 rồi rút gọn.\n• Phân số → %: chia tử cho mẫu rồi nhân 100.\n\nDùng Desmos để kiểm chứng - đừng tính nhẩm nếu chưa chắc.",
        theoryEn:
          "Every SAT Math problem assumes you're fluent with 3 number forms: fraction (1/4), decimal (0.25), percent (25%). All three are equal.\n\nQuick rules:\n• % → decimal: divide by 100 (35% = 0.35).\n• Decimal → fraction: put over 10/100/1000 then simplify.\n• Fraction → %: divide top by bottom, multiply by 100.\n\nUse Desmos to verify - don't risk mental math if unsure.",
        proTips: [
          "Học thuộc 6 cặp tương đương: 1/2=50%, 1/4=25%, 3/4=75%, 1/5=20%, 1/10=10%, 1/3≈33.3%.",
          "Trong SAT, viết phân số trực tiếp vào ô trả lời thường nhanh hơn thập phân.",
          "Đừng làm tròn quá sớm - lỗi rounding cướp điểm rất nhiều.",
        ],
        proTipsEn: [
          "Memorize 6 equivalences: 1/2=50%, 1/4=25%, 3/4=75%, 1/5=20%, 1/10=10%, 1/3≈33.3%.",
          "On the SAT, typing a fraction is often faster than a decimal.",
          "Don't round early - rounding errors steal many points.",
        ],
        vocabulary: [
          v("fraction", "phân số", "a part of a whole", "1/4 is a fraction."),
          v("decimal", "số thập phân", "a base-10 number", "0.25 is a decimal."),
          v("percent", "phần trăm", "out of 100", "25% means 25/100."),
          v("equivalent", "tương đương", "equal in value", "1/4 and 0.25 are equivalent."),
          v("simplify", "rút gọn", "reduce to lowest form", "Simplify 50/100 to 1/2."),
          v("convert", "chuyển đổi", "change form", "Convert 0.5 to a fraction."),
          v("ratio", "tỉ số", "a:b comparison", "Ratios compare two amounts."),
          v("approximate", "xấp xỉ", "close to but not exact", "1/3 ≈ 0.333."),
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chuyển đổi giữa các dạng số (viết kết quả gọn nhất):",
            instructionEn: "Convert between forms (give the simplest result):",
            sentences: [
              { text: "0.4 as a fraction in lowest terms = ___ /5.", textEn: "0.4 as a fraction in lowest terms = ___ /5.", answer: "2" },
              { text: "3/4 as a percent = ___ %.", textEn: "3/4 as a percent = ___ %.", answer: "75" },
              { text: "60% as a decimal = ___.", textEn: "60% as a decimal = ___.", answer: "0.6" },
              { text: "1/8 as a decimal = ___.", textEn: "1/8 as a decimal = ___.", answer: "0.125" },
            ],
          },
        ],
        quiz: [
          {
            question: "Which value is LARGEST?",
            options: ["0.6", "3/5", "55%", "5/9"],
            answer: 0,
            explanation: "0.6 = 60% > 55%. 3/5 = 0.6 (tie with A but A appears first). 5/9 ≈ 0.555.",
          },
          {
            question: "20% of 250 = ?",
            options: ["25", "50", "75", "100"],
            answer: 1,
            explanation: "0.2 × 250 = 50.",
          },
        ],
      },
      {
        id: "sat-math-linear-1step",
        title: "Math nền tảng #2 · Phương trình bậc 1 cơ bản",
        titleEn: "Foundation #2 · Basic 1-Step Linear Equations",
        level: 1,
        difficulty: "beginner",
        theory:
          "Trước khi học hệ phương trình (Tuần 6), hãy mượt với phương trình 1 bước.\n\nNguyên tắc 'cân bằng': mọi thứ làm bên trái phải làm bên phải.\n\nVí dụ: 3x = 12 → chia 2 vế cho 3 → x = 4.\nx + 7 = 10 → trừ 7 cả 2 vế → x = 3.\n\nMẹo SAT: luôn thay nghiệm vào để kiểm tra trong 5 giây - nếu sai thì sửa ngay.",
        theoryEn:
          "Before systems of equations (Week 6), be fluent with 1-step equations.\n\n'Balance' rule: whatever you do to one side, do to the other.\n\nExamples: 3x = 12 → divide both sides by 3 → x = 4.\nx + 7 = 10 → subtract 7 from both sides → x = 3.\n\nSAT tip: always plug your answer back in for a 5-second check - catch errors early.",
        proTips: [
          "Viết bước nào ra giấy nháp - đừng nhảy bước trong đầu.",
          "Khi gặp số âm, khoanh dấu trước, đừng để mất.",
          "Plug-in check là 'bảo hiểm rẻ nhất' của SAT Math.",
        ],
        proTipsEn: [
          "Write each step on scratch paper - don't skip steps mentally.",
          "When negatives appear, circle the sign so you don't lose it.",
          "The plug-in check is the cheapest insurance in SAT Math.",
        ],
        vocabulary: [
          v("equation", "phương trình", "two expressions set equal", "Solve the equation for x."),
          v("variable", "biến", "an unknown letter", "x is a variable."),
          v("solution", "nghiệm", "a value that makes it true", "Check your solution."),
          v("isolate", "tách riêng", "get the variable alone", "Isolate x on one side."),
          v("inverse", "phép ngược", "the opposite operation", "Subtraction is the inverse of addition."),
          v("balance", "cân bằng", "do the same to both sides", "Keep the equation balanced."),
          v("substitute", "thay vào", "plug a number in for a variable", "Substitute x = 4 to check."),
          v("verify", "kiểm chứng", "confirm correctness", "Always verify."),
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Giải các phương trình:",
            instructionEn: "Solve the equations:",
            sentences: [
              { text: "If 5x = 35, then x = ___.", textEn: "If 5x = 35, then x = ___.", answer: "7" },
              { text: "If x − 4 = 11, then x = ___.", textEn: "If x − 4 = 11, then x = ___.", answer: "15" },
              { text: "If 2x = −10, then x = ___.", textEn: "If 2x = −10, then x = ___.", answer: "-5" },
              { text: "If x/3 = 6, then x = ___.", textEn: "If x/3 = 6, then x = ___.", answer: "18" },
            ],
          },
        ],
        quiz: [
          {
            question: "What is the inverse of multiplying by 4?",
            options: ["adding 4", "subtracting 4", "dividing by 4", "squaring"],
            answer: 2,
            explanation: "Division undoes multiplication.",
          },
          {
            question: "Solve: 7 + x = 2",
            options: ["−5", "5", "9", "−9"],
            answer: 0,
            explanation: "Subtract 7 from both sides: x = −5.",
          },
        ],
      },
      {
        id: "sat-math-desmos-tour",
        title: "Math nền tảng #3 · Tour Desmos cho người mới",
        titleEn: "Foundation #3 · Desmos Tour for Beginners",
        level: 2,
        difficulty: "beginner",
        theory:
          "Desmos đã được tích hợp sẵn trong Bluebook - đó là 'siêu vũ khí' miễn phí của bạn.\n\n3 thao tác cốt lõi cho người mới:\n• Gõ 'y = 2x + 3' để xem đường thẳng.\n• Gõ 2 phương trình để xem điểm giao (= nghiệm hệ).\n• Gõ 'x^2 + 3x − 4 = 0' để xem nghiệm dưới đáy đồ thị.\n\nKhông cần học công thức nâng cao trong tuần 1. Chỉ cần biết 'cái gì gõ ra cái gì'.",
        theoryEn:
          "Desmos is built into Bluebook - your free super-weapon.\n\nThe 3 beginner moves:\n• Type 'y = 2x + 3' to see the line.\n• Type 2 equations to see the intersection (= the system's solution).\n• Type 'x^2 + 3x − 4 = 0' to read the roots at the bottom of the graph.\n\nNo advanced formulas needed in week 1 - just know which input produces which output.",
        proTips: [
          "Tập 10 phút Desmos mỗi ngày - chỉ thử nhập 5 biểu thức.",
          "Phím tắt zoom: dùng cuộn chuột hoặc 2 ngón trên trackpad.",
          "Lưu sẵn template ‘y = ax + b, y = cx + d’ trong đầu để mọi hệ phương trình giải bằng 1 click.",
        ],
        proTipsEn: [
          "Spend 10 min a day in Desmos - just type 5 expressions.",
          "Zoom shortcut: scroll wheel or 2-finger pinch.",
          "Memorize the template ‘y = ax + b, y = cx + d’ so any system is one click away.",
        ],
        vocabulary: [
          v("graph", "đồ thị", "visual of an equation", "Desmos draws the graph."),
          v("intersection", "điểm giao", "where two graphs meet", "Intersection = system's solution."),
          v("root", "nghiệm", "where graph hits y = 0", "Roots appear at the x-axis."),
          v("slope", "độ dốc", "rise over run", "The slope of y=2x+3 is 2."),
          v("intercept", "giao điểm trục", "where graph hits an axis", "y-intercept is 3 here."),
          v("zoom", "phóng to/thu nhỏ", "change view scale", "Zoom out to see all roots."),
          v("expression", "biểu thức", "math written symbolically", "Type the expression to graph it."),
          v("calculator", "máy tính", "computing tool", "Desmos is a graphing calculator."),
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Dự đoán Desmos sẽ trả lời gì:",
            instructionEn: "Predict what Desmos will show:",
            sentences: [
              { text: "Type ‘y = 2x + 3’: the line crosses the y-axis at y = ___.", textEn: "Type ‘y = 2x + 3’: the line crosses the y-axis at y = ___.", answer: "3" },
              { text: "Type ‘y = x’ AND ‘y = 4’: they intersect at x = ___.", textEn: "Type ‘y = x’ AND ‘y = 4’: they intersect at x = ___.", answer: "4" },
              { text: "Type ‘x^2 − 9 = 0’: the two roots are ___ and 3.", textEn: "Type ‘x^2 − 9 = 0’: the two roots are ___ and 3.", answer: "-3" },
            ],
          },
        ],
        quiz: [
          {
            question: "Which Desmos command shows where two lines meet?",
            options: [
              "Type only one equation.",
              "Type both equations on separate lines and click the dot at intersection.",
              "Type ‘intersect()’.",
              "It's impossible in Desmos.",
            ],
            answer: 1,
            explanation: "Two equations → Desmos auto-marks the intersection point.",
          },
        ],
      },
    ],
  },
];

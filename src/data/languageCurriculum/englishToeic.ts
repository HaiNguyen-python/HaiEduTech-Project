// TOEIC Curriculum: Listening, Reading, Business Vocabulary, Grammar
import type { LanguageModule } from "./types";

export const toeicModules: LanguageModule[] = [
  {
    id: "toeic-listening",
    title: "TOEIC Listening Comprehension",
    titleEn: "TOEIC Listening Comprehension",
    icon: "🎧",
    color: "from-blue-500/20 to-cyan-500/20",
    description: "Chiến lược nghe hiểu Part 1-4 TOEIC",
    descriptionEn: "Listening strategies for TOEIC Parts 1-4",
    category: "toeic",
    language: "english",
    lessons: [
      {
        id: "toeic-listen-1",
        title: "Part 1: Photographs",
        titleEn: "Part 1: Photographs",
        level: 1,
        difficulty: "beginner",
        theory: "**Part 1 - Photographs** (6 câu): Nghe 4 mô tả, chọn mô tả đúng nhất với hình ảnh.\n\n**Chiến lược:**\n1. Quan sát kỹ hình TRƯỚC khi nghe\n2. Chú ý: người, hành động, vị trí, đồ vật\n3. Cẩn thận với **distractor** — từ phát âm gần giống\n4. Loại trừ đáp án sai ngay khi nghe\n\n**Bẫy thường gặp:**\n- Dùng từ có trong hình nhưng mô tả SAI hành động\n- Dùng từ phát âm giống nhau (homophones)\n- Mô tả quá chi tiết hoặc suy luận\n\n**Ví dụ:**\nHình: Một người đang ngồi đọc sách ở công viên\n(A) A woman is reading in a library. ❌ (sai địa điểm)\n(B) A woman is sitting on a bench reading. ✅\n(C) A woman is buying a book. ❌ (sai hành động)\n(D) A woman is sleeping on a bench. ❌ (sai hành động)",
        theoryEn: "**Part 1 - Photographs** (6 questions): Listen to 4 descriptions, choose the best match.\n\n**Strategy:**\n1. Observe the photo carefully BEFORE listening\n2. Focus on: people, actions, locations, objects\n3. Watch for distractors\n4. Eliminate wrong answers immediately",
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Dựa trên mô tả hình ảnh, xác định đáp án đúng (A, B, C, hoặc D):\n\nHình: Hai người đang bắt tay trong văn phòng\n(A) They are shaking hands.\n(B) They are eating lunch.\n(C) They are leaving the office.\n(D) They are typing on computers.",
            instructionEn: "Based on the photo description, identify the correct answer",
            sentences: [
              { text: "Đáp án đúng là: ___", textEn: "Correct answer: ___", answer: "A" },
            ],
          },
        ],
        quiz: [
          { question: "Part 1 có bao nhiêu câu hỏi?", options: ["4 câu", "6 câu", "10 câu", "30 câu"], answer: 1, explanation: "TOEIC Part 1 có 6 câu hỏi mô tả hình ảnh." },
          { question: "Bẫy phổ biến nhất trong Part 1 là gì?", options: ["Nói quá nhanh", "Dùng từ có trong hình nhưng mô tả sai", "Âm thanh nhỏ", "Quá nhiều đáp án đúng"], answer: 1, explanation: "Bẫy phổ biến nhất: dùng đúng từ liên quan đến hình nhưng mô tả SAI hành động/trạng thái." },
        ],
      },
      {
        id: "toeic-listen-2",
        title: "Part 2: Question-Response",
        titleEn: "Part 2: Question-Response",
        level: 1,
        difficulty: "beginner",
        theory: "**Part 2 - Question-Response** (25 câu): Nghe câu hỏi, chọn câu trả lời phù hợp nhất.\n\n**Dạng câu hỏi phổ biến:**\n- **Wh-questions:** Where, When, Who, What, Why, How\n- **Yes/No questions:** Do you...? Is it...? Can we...?\n- **Tag questions:** ..., isn't it? ..., don't you?\n- **Statements/Offers:** Would you like...? Let me...\n\n**Chiến lược:**\n1. Nghe rõ **từ đầu tiên** — xác định loại câu hỏi\n2. Loại trừ đáp án **lặp lại từ** trong câu hỏi (thường là bẫy)\n3. Cẩn thận với câu trả lời **gián tiếp**\n\n**Ví dụ:**\nQ: 'Where is the meeting room?'\n(A) At 3 o'clock. ❌ (trả lời When)\n(B) On the second floor. ✅\n(C) Yes, we had a meeting. ❌ (lặp từ 'meeting')",
        theoryEn: "**Part 2 - Question-Response** (25 questions): Listen to a question, choose the best response.\n\n**Strategy:**\n1. Focus on the FIRST WORD to identify question type\n2. Eliminate answers that repeat words from the question\n3. Watch for indirect answers",
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Xác định loại câu hỏi và chọn đáp án phù hợp:\n\n1. 'When does the train leave?' → Loại: ___\n2. 'Could you help me with this report?' → Loại: ___",
            instructionEn: "Identify question types",
            sentences: [
              { text: "'When does the train leave?' → Loại câu hỏi: ___", textEn: "'When does the train leave?' → Type: ___", answer: "Wh-question" },
              { text: "'Could you help me?' → Loại câu hỏi: ___", textEn: "'Could you help me?' → Type: ___", answer: "Request" },
            ],
          },
        ],
        quiz: [
          { question: "Trong Part 2, điều quan trọng nhất khi nghe là gì?", options: ["Nghe toàn bộ câu", "Nghe rõ từ ĐẦU TIÊN", "Nghe từ cuối cùng", "Đoán trước đáp án"], answer: 1, explanation: "Từ đầu tiên xác định loại câu hỏi (Where → địa điểm, When → thời gian, Who → người)." },
          { question: "Khi đáp án lặp lại từ trong câu hỏi, nên?", options: ["Chọn ngay", "Cẩn thận — thường là bẫy", "Bỏ qua", "Chọn nếu nghe rõ"], answer: 1, explanation: "Đáp án lặp từ từ câu hỏi thường là DISTRACTOR — cần nghe kỹ ý nghĩa." },
        ],
      },
    ],
  },
  {
    id: "toeic-reading",
    title: "TOEIC Reading Comprehension",
    titleEn: "TOEIC Reading Comprehension",
    icon: "📑",
    color: "from-emerald-500/20 to-green-500/20",
    description: "Chiến lược đọc hiểu Part 5-7 TOEIC",
    descriptionEn: "Reading strategies for TOEIC Parts 5-7",
    category: "toeic",
    language: "english",
    lessons: [
      {
        id: "toeic-read-1",
        title: "Part 5: Incomplete Sentences",
        titleEn: "Part 5: Incomplete Sentences",
        level: 2,
        difficulty: "intermediate",
        theory: "**Part 5** (30 câu, ~10 phút): Chọn từ/cụm từ điền vào câu.\n\n**3 dạng chính:**\n\n**1. Vocabulary (từ vựng):**\nChọn từ có nghĩa phù hợp nhất.\n→ Tip: Đọc cả câu, hiểu ngữ cảnh\n\n**2. Grammar (ngữ pháp):**\nChọn dạng đúng của từ (thì, giới từ, liên từ).\n→ Tip: Xem cấu trúc câu, xác định chủ-vị\n\n**3. Word form (dạng từ):**\nChọn danh từ/động từ/tính từ/trạng từ phù hợp.\n→ Tip: Xem vị trí trong câu\n  - Trước danh từ → tính từ\n  - Sau 'be' → tính từ\n  - Trước tính từ → trạng từ\n  - Sau mạo từ → danh từ",
        theoryEn: "**Part 5** (30 questions, ~10 min): Choose word/phrase to complete sentence.\n\n**3 main types:**\n1. Vocabulary: meaning-based\n2. Grammar: tense, preposition, conjunction\n3. Word form: noun/verb/adj/adv position",
        vocabulary: [
          { word: "submit", ipa: "/səbˈmɪt/", meaning: "nộp, gửi", example: "Please submit the report by Friday.", partOfSpeech: "verb" },
          { word: "submission", ipa: "/səbˈmɪʃən/", meaning: "bài nộp, sự nộp", example: "The submission deadline is March 15.", partOfSpeech: "noun" },
          { word: "quarterly", ipa: "/ˈkwɔːtəli/", meaning: "hàng quý", example: "The quarterly report shows strong growth.", partOfSpeech: "adjective" },
          { word: "promptly", ipa: "/ˈprɒmptli/", meaning: "nhanh chóng, đúng giờ", example: "Please reply promptly to all client emails.", partOfSpeech: "adverb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn từ phù hợp điền vào chỗ trống (Part 5 practice)",
            instructionEn: "Choose the appropriate word (Part 5 practice)",
            sentences: [
              { text: "All employees must ___ their timesheets by Friday. (submit / submission / submissive / submitting)", textEn: "All employees must ___ their timesheets.", answer: "submit", hint: "Sau 'must' cần ___?" },
              { text: "The company has seen ___ growth this year. (remark / remarkable / remarkably / remarking)", textEn: "The company has seen ___ growth.", answer: "remarkable", hint: "Trước danh từ 'growth' cần ___?" },
              { text: "Ms. Chen handled the situation very ___. (profession / professional / professionally / professions)", textEn: "Ms. Chen handled the situation ___.", answer: "professionally", hint: "Bổ nghĩa cho động từ 'handled' cần ___?" },
            ],
          },
        ],
        quiz: [
          { question: "Vị trí trước danh từ thường cần loại từ nào?", options: ["Verb", "Adverb", "Adjective", "Preposition"], answer: 2, explanation: "Trước danh từ = tính từ (adjective). Ví dụ: 'remarkable growth'." },
          { question: "Part 5 nên dành bao nhiêu phút?", options: ["5 phút", "10 phút", "20 phút", "30 phút"], answer: 1, explanation: "Part 5 nên làm trong ~10 phút (30 giây/câu) để dành thời gian cho Part 7." },
        ],
      },
    ],
  },
  {
    id: "toeic-business-vocab",
    title: "TOEIC Business Vocabulary",
    titleEn: "TOEIC Business Vocabulary",
    icon: "💼",
    color: "from-amber-500/20 to-orange-500/20",
    description: "Từ vựng kinh doanh thiết yếu cho TOEIC",
    descriptionEn: "Essential business vocabulary for TOEIC",
    category: "toeic",
    language: "english",
    lessons: [
      {
        id: "toeic-biz-1",
        title: "Office & Workplace",
        titleEn: "Office & Workplace",
        level: 1,
        difficulty: "beginner",
        theory: "**Từ vựng văn phòng** xuất hiện trong hầu hết các phần TOEIC.\n\n**Nhóm từ quan trọng:**\n\n**Meetings & Schedules:**\n- agenda: chương trình họp\n- minutes: biên bản cuộc họp\n- postpone: hoãn lại\n- reschedule: đổi lịch\n- conference call: cuộc họp qua điện thoại\n\n**Office Equipment:**\n- projector: máy chiếu\n- photocopier: máy photocopy\n- filing cabinet: tủ hồ sơ\n- stationery: văn phòng phẩm\n\n**Common Phrases:**\n- be in charge of: phụ trách\n- report to (someone): báo cáo cho\n- work overtime: làm thêm giờ\n- take a day off: nghỉ một ngày\n- meet a deadline: hoàn thành đúng hạn",
        theoryEn: "**Office vocabulary** appears in most TOEIC sections.\n\n**Key groups:**\n- Meetings: agenda, minutes, postpone, reschedule\n- Equipment: projector, photocopier, filing cabinet\n- Phrases: be in charge of, report to, work overtime",
        vocabulary: [
          { word: "agenda", ipa: "/əˈdʒendə/", meaning: "chương trình họp", example: "The first item on the agenda is the budget review.", partOfSpeech: "noun" },
          { word: "minutes", ipa: "/ˈmɪnɪts/", meaning: "biên bản họp", example: "Could you take the minutes during the meeting?", partOfSpeech: "noun" },
          { word: "postpone", ipa: "/pəʊstˈpəʊn/", meaning: "hoãn lại", example: "We need to postpone the meeting until next week.", partOfSpeech: "verb" },
          { word: "deadline", ipa: "/ˈdedlaɪn/", meaning: "hạn chót", example: "The project deadline is Friday at 5 PM.", partOfSpeech: "noun" },
          { word: "stationery", ipa: "/ˈsteɪʃənəri/", meaning: "văn phòng phẩm", example: "Please order more stationery for the office.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ vựng văn phòng phù hợp",
            instructionEn: "Fill in appropriate office vocabulary",
            sentences: [
              { text: "Could you take the ___ during today's meeting?", textEn: "Could you take the ___ during the meeting?", answer: "minutes", hint: "m______s" },
              { text: "We need to ___ the presentation until Thursday.", textEn: "We need to ___ the presentation.", answer: "postpone", hint: "p_______e" },
              { text: "Sarah is ___ the marketing department.", textEn: "Sarah is ___ the marketing department.", answer: "in charge of", hint: "i_ c____e o_" },
              { text: "Make sure to ___ the deadline for this project.", textEn: "Make sure to ___ the deadline.", answer: "meet", hint: "m__t" },
            ],
          },
        ],
        quiz: [
          { question: "'Minutes' trong ngữ cảnh họp hành nghĩa là?", options: ["Phút", "Biên bản họp", "Lịch họp", "Thời gian"], answer: 1, explanation: "'Minutes' trong cuộc họp = biên bản ghi chép nội dung cuộc họp." },
          { question: "'Be in charge of' nghĩa là?", options: ["Bị phạt", "Phụ trách", "Rời khỏi", "Tham gia"], answer: 1, explanation: "'Be in charge of' = phụ trách, chịu trách nhiệm về." },
        ],
      },
      {
        id: "toeic-biz-2",
        title: "Finance & Banking",
        titleEn: "Finance & Banking",
        level: 2,
        difficulty: "intermediate",
        theory: "**Từ vựng tài chính** phổ biến trong TOEIC Reading Part 7.\n\n**Banking:**\n- account balance: số dư tài khoản\n- transaction: giao dịch\n- deposit: tiền gửi / gửi tiền\n- withdrawal: rút tiền\n- interest rate: lãi suất\n- mortgage: thế chấp\n\n**Finance:**\n- revenue: doanh thu\n- expenditure: chi tiêu\n- profit margin: biên lợi nhuận\n- fiscal year: năm tài chính\n- budget allocation: phân bổ ngân sách\n- invoice: hóa đơn\n- reimbursement: hoàn trả chi phí",
        theoryEn: "**Financial vocabulary** is common in TOEIC Reading Part 7.\n\n**Banking:** account balance, transaction, deposit, withdrawal, interest rate\n**Finance:** revenue, expenditure, profit margin, fiscal year, invoice",
        vocabulary: [
          { word: "revenue", ipa: "/ˈrevənjuː/", meaning: "doanh thu", example: "Annual revenue exceeded $10 million.", partOfSpeech: "noun" },
          { word: "expenditure", ipa: "/ɪkˈspendɪtʃər/", meaning: "chi tiêu", example: "We need to reduce unnecessary expenditure.", partOfSpeech: "noun" },
          { word: "reimbursement", ipa: "/ˌriːɪmˈbɜːsmənt/", meaning: "hoàn trả chi phí", example: "Submit your receipts for travel reimbursement.", partOfSpeech: "noun" },
          { word: "invoice", ipa: "/ˈɪnvɔɪs/", meaning: "hóa đơn", example: "Please send the invoice to the accounting department.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ tài chính phù hợp",
            instructionEn: "Fill in appropriate financial terms",
            sentences: [
              { text: "The company's annual ___ increased by 15% this year.", textEn: "Annual ___ increased by 15%.", answer: "revenue", hint: "r______e" },
              { text: "Please submit your receipts for ___.", textEn: "Submit receipts for ___.", answer: "reimbursement", hint: "r_____________t" },
              { text: "The ___ for the services has been sent to the client.", textEn: "The ___ has been sent.", answer: "invoice", hint: "i______e" },
            ],
          },
        ],
        quiz: [
          { question: "'Revenue' khác 'profit' thế nào?", options: ["Giống nhau", "Revenue = tổng doanh thu, Profit = lợi nhuận sau chi phí", "Revenue = lợi nhuận, Profit = doanh thu", "Không liên quan"], answer: 1, explanation: "Revenue = tổng doanh thu (trước trừ chi phí). Profit = lợi nhuận (sau trừ chi phí)." },
          { question: "'Reimbursement' nghĩa là?", options: ["Tiền lương", "Hoàn trả chi phí", "Tiền thưởng", "Tiền phạt"], answer: 1, explanation: "'Reimbursement' = hoàn trả chi phí đã bỏ ra (ví dụ: đi công tác)." },
        ],
      },
    ],
  },
];

/**
 * @file toeicLecturesExpansion.ts
 * @description Bổ sung 10 bài giảng TOEIC mới (2026): Part 1 advanced,
 *              Part 2 Wh-questions, Part 3 intent, Part 4 announcements,
 *              Part 5 word forms, Part 6 cohesion, Part 7 NOT/scanning,
 *              Email business writing, Meeting/Negotiation vocab,
 *              Score 900+ mindset.
 * @author HaiEduTech
 */

import type { ToeicLecture } from "./toeicLecturesData";

// ============================================================
// 1. Part 1 Advanced – State vs. Action verbs
// ============================================================
const part1StateAction: ToeicLecture = {
  id: "toeic-part1-state-action",
  title: "Part 1 Advanced: State vs. Action Verbs",
  titleVi: "Part 1 nâng cao: Động từ trạng thái vs. hành động",
  category: "listening",
  parts: ["Part 1"],
  icon: "🧍",
  duration: "20 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Distinguish between 'is being done' (action in progress) and 'has been done' (state/result) — the #1 trap in advanced Part 1.",
  descriptionVi: "Phân biệt 'is being done' (đang xảy ra) và 'has been done' (đã xong/trạng thái) — bẫy lớn nhất Part 1 nâng cao.",
  trapAlerts: [
    {
      trap: "'The car is being washed' when no one is in the photo",
      trapVi: "'Xe đang được rửa' nhưng trong ảnh không có ai",
      why: "'Is being + V3' requires a visible person performing the action right now.",
      whyVi: "'Is being + V3' yêu cầu phải thấy người đang thực hiện hành động.",
    },
    {
      trap: "'Has been parked' when a car is moving",
      trapVi: "'Has been parked' khi xe đang chạy",
      why: "'Has been + V3' = result state, not motion.",
      whyVi: "'Has been + V3' = trạng thái đã hoàn thành, không phải đang chuyển động.",
    },
  ],
  coreTechnique: [
    { step: 1, title: "Scan for people", titleVi: "Quét xem có người không", description: "If NO person → eliminate all 'is being + V3' choices.", descriptionVi: "Nếu KHÔNG có người → loại tất cả 'is being + V3'." },
    { step: 2, title: "Check motion vs. stillness", titleVi: "Xem chuyển động hay đứng yên", description: "Moving objects → use present continuous active. Still objects → 'has been + V3'.", descriptionVi: "Vật chuyển động → dùng tiếp diễn chủ động. Vật đứng yên → 'has been + V3'." },
    { step: 3, title: "Match exact location prepositions", titleVi: "Khớp chính xác giới từ vị trí", description: "'On' (touching surface) ≠ 'above' (no contact) ≠ 'next to' (beside).", descriptionVi: "'On' (chạm) ≠ 'above' (không chạm) ≠ 'next to' (cạnh)." },
  ],
  practiceSet: [
    {
      context: "An empty meeting room with chairs around a table.",
      contextVi: "Phòng họp trống có ghế quanh bàn.",
      question: "Which sentence is TRUE?",
      options: ["The chairs are being arranged.", "The chairs have been arranged.", "People are sitting on the chairs.", "Someone is moving the chairs."],
      answer: 1,
      explanation: "No people visible → 'have been arranged' (result state) is correct.",
      explanationVi: "Không có người → 'have been arranged' (trạng thái đã xong) đúng.",
    },
  ],
  businessContext: "Office and workplace photos dominate Part 1. Knowing passive states helps describe environments.",
  businessContextVi: "Ảnh văn phòng chiếm đa số Part 1. Hiểu thể bị động giúp mô tả môi trường chính xác.",
  proSpeedTip: "💡 If you hear 'is being' but see no person, eliminate immediately — saves 3 seconds per question.",
  proSpeedTipVi: "💡 Nghe 'is being' mà không thấy người → loại ngay, tiết kiệm 3 giây/câu.",
  vocabHighlights: [
    { word: "stacked", definition: "piled on top of each other", definitionVi: "xếp chồng", example: "Boxes are stacked in the corner.", businessContext: "warehouse/office" },
    { word: "displayed", definition: "shown for viewing", definitionVi: "trưng bày", example: "Products are displayed on shelves." },
    { word: "occupied", definition: "in use / taken", definitionVi: "đang được sử dụng", example: "All seats are occupied." },
  ],
  quiz: [
    { question: "When can you use 'is being painted'?", options: ["Painter is visible", "Wall looks fresh", "Paint can is on floor", "Room is empty"], answer: 0, explanation: "Action in progress requires a visible agent." },
    { question: "'The boxes ___ on the shelves' (no person in photo)", options: ["are being placed", "have been placed", "are placing", "place"], answer: 1, explanation: "Static state, no agent → 'have been placed'." },
  ],
  cheatSheetPoints: [
    "🚫 No person + 'is being V3' = WRONG",
    "✅ Empty result scene = 'has/have been V3'",
    "👁️ Match prepositions to physical contact",
  ],
  isNew: true,
};

// ============================================================
// 2. Part 2 Wh-Questions Decoder
// ============================================================
const part2WhDecoder: ToeicLecture = {
  id: "toeic-part2-wh-decoder",
  title: "Part 2 Wh-Question Decoder: First Word Wins",
  titleVi: "Part 2: Giải mã câu hỏi Wh — chữ đầu là chìa khóa",
  category: "listening",
  parts: ["Part 2"],
  icon: "❓",
  duration: "18 min",
  level: "foundation",
  targetScore: "450+",
  description: "Master the 7 Wh-words (Who/What/When/Where/Why/Which/How) — each demands a SPECIFIC answer type.",
  descriptionVi: "Làm chủ 7 từ Wh — mỗi từ yêu cầu một loại trả lời CỤ THỂ.",
  trapAlerts: [
    { trap: "Answering 'Where' question with 'Yes/No'", trapVi: "Trả lời câu 'Where' bằng 'Yes/No'", why: "Wh-questions NEVER take Yes/No.", whyVi: "Câu Wh KHÔNG BAO GIỜ trả lời Yes/No." },
    { trap: "Repeating words from the question", trapVi: "Lặp từ trong câu hỏi", why: "Repeated words = 90% wrong (distractor trap).", whyVi: "Từ lặp = 90% sai (bẫy)." },
  ],
  coreTechnique: [
    { step: 1, title: "Lock the first word", titleVi: "Khóa chữ đầu tiên", description: "Who→person, When→time, Where→place, Why→reason, How→method, How much/many→quantity.", descriptionVi: "Who→người, When→thời gian, Where→nơi chốn, Why→lý do, How→cách thức, How much/many→số lượng." },
    { step: 2, title: "Reject Yes/No answers", titleVi: "Loại đáp án Yes/No", description: "If you hear 'Yes' or 'No' for a Wh-question → automatic eliminate.", descriptionVi: "Nghe Yes/No cho câu Wh → loại ngay." },
    { step: 3, title: "Watch for indirect answers", titleVi: "Cảnh giác trả lời gián tiếp", description: "'I don't know', 'Let me check', 'Ask Mark' are often correct.", descriptionVi: "'I don't know', 'Let me check', 'Ask Mark' thường ĐÚNG." },
  ],
  practiceSet: [
    {
      context: "Question: 'When is the report due?'",
      contextVi: "Câu hỏi: 'Khi nào báo cáo phải nộp?'",
      question: "Best answer:",
      options: ["In the conference room.", "By Friday afternoon.", "Yes, it is.", "The marketing report."],
      answer: 1,
      explanation: "When → time answer. 'By Friday afternoon' is correct.",
      explanationVi: "When → câu trả lời thời gian. 'By Friday afternoon' đúng.",
    },
  ],
  businessContext: "Workplace dialogues constantly use Wh-questions for scheduling, location, responsibility.",
  businessContextVi: "Hội thoại công sở liên tục dùng câu Wh để hỏi lịch, địa điểm, trách nhiệm.",
  proSpeedTip: "💡 If you miss the first word → guess C and move on. Don't lose the next 2 questions trying to recover.",
  proSpeedTipVi: "💡 Nếu lỡ chữ đầu → đoán C và đi tiếp. Đừng mất 2 câu sau vì cố cứu.",
  vocabHighlights: [
    { word: "due", definition: "expected to be ready/paid", definitionVi: "đến hạn", example: "The invoice is due tomorrow.", businessContext: "deadlines" },
    { word: "in charge", definition: "responsible for", definitionVi: "phụ trách", example: "Who's in charge of marketing?" },
  ],
  quiz: [
    { question: "Q: 'Who handles customer complaints?' Best answer:", options: ["At 3 pm.", "Sarah does.", "Yes, often.", "In the office."], answer: 1, explanation: "Who → person → 'Sarah does'." },
    { question: "Indirect answer pattern most likely correct:", options: ["Yes, definitely", "No, never", "I'll have to check", "Same as before"], answer: 2, explanation: "'I'll have to check' is a classic correct indirect answer." },
  ],
  cheatSheetPoints: [
    "🔑 First word = answer category",
    "❌ Yes/No NEVER answers Wh",
    "✅ 'Let me check' / 'Ask X' = often correct",
  ],
  isNew: true,
};

// ============================================================
// 3. Part 3 Intent Questions
// ============================================================
const part3Intent: ToeicLecture = {
  id: "toeic-part3-intent",
  title: "Part 3 Intent Questions: Why Did the Speaker Say...?",
  titleVi: "Part 3: Câu hỏi ý định — Vì sao người nói nói câu đó?",
  category: "listening",
  parts: ["Part 3"],
  icon: "💭",
  duration: "22 min",
  level: "advanced",
  targetScore: "750+",
  description: "Decode 'What does the speaker mean when she says...?' — the hardest question type in Part 3.",
  descriptionVi: "Giải mã 'Người nói có ý gì khi nói...?' — dạng khó nhất Part 3.",
  trapAlerts: [
    { trap: "Choosing the LITERAL meaning", trapVi: "Chọn nghĩa ĐEN", why: "Intent questions test implication, not surface meaning.", whyVi: "Câu hỏi ý định kiểm tra hàm ý, không phải nghĩa đen." },
    { trap: "Ignoring tone of voice", trapVi: "Bỏ qua giọng điệu", why: "Sarcasm, hesitation, surprise change the meaning entirely.", whyVi: "Mỉa mai, ngập ngừng, ngạc nhiên đổi hoàn toàn nghĩa." },
  ],
  coreTechnique: [
    { step: 1, title: "Read the quoted line BEFORE listening", titleVi: "Đọc câu trích trước khi nghe", description: "Get context for what to listen for.", descriptionVi: "Lấy bối cảnh trước." },
    { step: 2, title: "Listen to 2 sentences before + after", titleVi: "Nghe 2 câu trước + sau", description: "Intent always comes from surrounding context, not the line itself.", descriptionVi: "Ý định luôn từ ngữ cảnh, không phải câu được trích." },
    { step: 3, title: "Pick the implication, not the words", titleVi: "Chọn hàm ý, không chọn từ", description: "If she says 'It's late' after a colleague stays at office, intent = 'You should go home', not 'time'.", descriptionVi: "Đồng nghiệp ở lại muộn, cô nói 'Trễ rồi' → ý: 'Nên về', không phải 'thời gian'." },
  ],
  practiceSet: [
    {
      context: "After hearing a long complaint, the manager says 'Well, that's certainly… interesting.'",
      contextVi: "Sau khi nghe than phiền dài, quản lý nói 'Ờ, thú vị nhỉ…'",
      question: "What does the manager mean?",
      options: ["She finds it fascinating.", "She wants more details.", "She doesn't agree but stays polite.", "She will fix it."],
      answer: 2,
      explanation: "Hesitation + 'certainly… interesting' = polite disagreement.",
      explanationVi: "Ngập ngừng + 'thú vị nhỉ' = bất đồng lịch sự.",
    },
  ],
  businessContext: "Indirect speech is essential in workplace politeness; intent questions reflect real boardroom dynamics.",
  businessContextVi: "Lời nói gián tiếp quan trọng trong giao tiếp công sở lịch sự.",
  proSpeedTip: "💡 If quoted line is short and casual ('Sure', 'Right'), 80% chance the intent is sarcasm or doubt.",
  proSpeedTipVi: "💡 Câu trích ngắn ('Sure', 'Right') → 80% là mỉa mai hoặc nghi ngờ.",
  vocabHighlights: [
    { word: "imply", definition: "suggest indirectly", definitionVi: "ngụ ý", example: "She implied that we should leave." },
    { word: "hesitate", definition: "pause before speaking", definitionVi: "do dự", example: "He hesitated before answering." },
  ],
  quiz: [
    { question: "Speaker says 'I guess that's one way to do it.' Likely intent:", options: ["Strong agreement", "Polite disapproval", "Asking for clarification", "Praise"], answer: 1, explanation: "'I guess' + 'one way' = polite criticism." },
    { question: "Best strategy for intent questions:", options: ["Pick the literal meaning", "Pick the most polite option", "Listen to surrounding context", "Pick the longest option"], answer: 2, explanation: "Surrounding 2 sentences reveal real intent." },
  ],
  cheatSheetPoints: [
    "🎯 Read quote BEFORE audio",
    "📍 Context = ±2 sentences",
    "🎭 Tone > Literal meaning",
  ],
  isNew: true,
};

// ============================================================
// 4. Part 4 Announcement Patterns
// ============================================================
const part4Announcements: ToeicLecture = {
  id: "toeic-part4-announcements",
  title: "Part 4 Announcement Patterns: Airport, Store, Office",
  titleVi: "Part 4: Mẫu thông báo công cộng — Sân bay, cửa hàng, văn phòng",
  category: "listening",
  parts: ["Part 4"],
  icon: "📢",
  duration: "20 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Recognize 5 announcement templates so you predict the answer before it's spoken.",
  descriptionVi: "Nhận diện 5 mẫu thông báo để đoán đáp án trước khi nghe.",
  trapAlerts: [
    { trap: "Confusing 'gate change' with 'flight delay'", trapVi: "Nhầm 'đổi cổng' với 'chuyến bay trễ'", why: "Both use similar vocabulary but answer different questions.", whyVi: "Cùng từ vựng nhưng trả lời câu khác nhau." },
  ],
  coreTechnique: [
    { step: 1, title: "Identify the announcement type from first 5 seconds", titleVi: "Nhận diện loại thông báo trong 5 giây đầu", description: "Airport/Train station, Store/Sale, Office meeting, Building maintenance, Weather alert.", descriptionVi: "Sân bay/ga, cửa hàng/giảm giá, họp văn phòng, bảo trì tòa nhà, cảnh báo thời tiết." },
    { step: 2, title: "Listen for the 'action verb'", titleVi: "Nghe động từ hành động", description: "'Please proceed', 'kindly visit', 'do not forget' = next answer cue.", descriptionVi: "'Please proceed', 'kindly visit' = gợi ý đáp án tiếp theo." },
    { step: 3, title: "Predict 'why', 'what to do', 'where to go'", titleVi: "Đoán 'vì sao', 'làm gì', 'đi đâu'", description: "These 3 questions appear in 90% of announcements.", descriptionVi: "3 câu này xuất hiện trong 90% thông báo." },
  ],
  practiceSet: [
    {
      context: "'Attention shoppers, our electronics department is offering 30% off today only…'",
      contextVi: "'Quý khách lưu ý, khu điện tử giảm 30% hôm nay…'",
      question: "Where should listeners go?",
      options: ["Customer service", "Electronics department", "Parking lot", "Food court"],
      answer: 1,
      explanation: "Direct cue: 'electronics department'.",
      explanationVi: "Gợi ý trực tiếp: 'khu điện tử'.",
    },
  ],
  businessContext: "Announcements are everyday business communication — shoppers, employees, travelers all hear them.",
  businessContextVi: "Thông báo là giao tiếp công sở hằng ngày.",
  proSpeedTip: "💡 First 10 words = location & purpose. Skip the rest if running out of time.",
  proSpeedTipVi: "💡 10 từ đầu = địa điểm + mục đích. Bỏ phần còn lại nếu hết giờ.",
  vocabHighlights: [
    { word: "proceed", definition: "go forward", definitionVi: "tiến tới", example: "Please proceed to gate B12.", businessContext: "airport" },
    { word: "complimentary", definition: "free", definitionVi: "miễn phí", example: "Enjoy complimentary refreshments." },
  ],
  quiz: [
    { question: "'Due to weather, flight 482 will depart from gate C7 instead of B3.' Question type:", options: ["Why was the flight cancelled?", "What is the new gate?", "When will it land?", "Who is the pilot?"], answer: 1, explanation: "Gate change announcement → 'new gate' is the key fact." },
  ],
  cheatSheetPoints: [
    "📍 First 10 words = location + purpose",
    "🎬 Action verbs cue answers",
    "❓ Why / What / Where = 90% of Qs",
  ],
  isNew: true,
};

// ============================================================
// 5. Part 5 Word Forms — Suffixes Decoded
// ============================================================
const part5WordForms: ToeicLecture = {
  id: "toeic-part5-word-forms",
  title: "Part 5 Word Forms: Suffixes Decode Position",
  titleVi: "Part 5: Hình thức từ — Hậu tố giải mã vị trí",
  category: "grammar",
  parts: ["Part 5"],
  icon: "🔤",
  duration: "25 min",
  level: "foundation",
  targetScore: "450+",
  description: "Identify noun/verb/adjective/adverb instantly from suffixes — answer Part 5 word-form questions in 5 seconds.",
  descriptionVi: "Nhận diện danh/động/tính/trạng từ tức thì qua hậu tố — trả lời Part 5 trong 5 giây.",
  trapAlerts: [
    { trap: "Confusing -ly adjectives with adverbs", trapVi: "Nhầm tính từ -ly với trạng từ", why: "'Friendly', 'lovely', 'lonely' are ADJECTIVES despite -ly ending.", whyVi: "'Friendly', 'lovely', 'lonely' là TÍNH TỪ dù có -ly." },
  ],
  coreTechnique: [
    { step: 1, title: "Memorize suffix → part of speech map", titleVi: "Thuộc bảng hậu tố → từ loại", description: "Noun: -tion, -ment, -ness, -ity. Verb: -ize, -ate, -ify. Adj: -ful, -ous, -ive, -al. Adv: -ly (most cases).", descriptionVi: "DT: -tion, -ment, -ness, -ity. ĐT: -ize, -ate, -ify. TT: -ful, -ous, -ive, -al. TrT: -ly." },
    { step: 2, title: "Identify the blank's role", titleVi: "Xác định vai trò của chỗ trống", description: "Subject/object → noun. Modifies noun → adjective. Modifies verb/adj → adverb.", descriptionVi: "Chủ ngữ/tân ngữ → DT. Bổ nghĩa DT → TT. Bổ nghĩa ĐT/TT → TrT." },
    { step: 3, title: "Match form to slot — 5-sec rule", titleVi: "Khớp dạng từ với vị trí — quy tắc 5 giây", description: "If sure within 5s, mark and move on. Don't re-read.", descriptionVi: "Chắc chắn trong 5 giây, chọn và đi. Đừng đọc lại." },
  ],
  practiceSet: [
    {
      context: "The new policy provides ___ for all employees.",
      contextVi: "Chính sách mới cung cấp ___ cho mọi nhân viên.",
      question: "Best word form:",
      options: ["protect", "protective", "protection", "protectively"],
      answer: 2,
      explanation: "After 'provides' (verb) we need an OBJECT (noun) → 'protection'.",
      explanationVi: "Sau 'provides' cần TÂN NGỮ (DT) → 'protection'.",
    },
  ],
  businessContext: "Word-form questions = ~10 of 30 Part 5 questions. Mastering this alone adds 30+ points.",
  businessContextVi: "Câu word-form = ~10/30 câu Part 5. Chỉ luyện cái này đã +30 điểm.",
  proSpeedTip: "💡 Cover the 4 options. Predict the part of speech FIRST, then match — 2× faster.",
  proSpeedTipVi: "💡 Che 4 đáp án, đoán từ loại TRƯỚC, rồi khớp — nhanh gấp 2.",
  vocabHighlights: [
    { word: "implement (V) → implementation (N)", definition: "to put into effect", definitionVi: "triển khai", example: "We will implement the new system. The implementation took 3 months." },
    { word: "compete (V) → competition (N) → competitive (Adj)", definition: "rivalry", definitionVi: "cạnh tranh", example: "The competitive market demands competition." },
  ],
  quiz: [
    { question: "'The presentation was extremely ___.' Best:", options: ["inform", "information", "informative", "informatively"], answer: 2, explanation: "After linking verb 'was' + 'extremely' (adv) → adjective 'informative'." },
    { question: "Which is an adjective?", options: ["happily", "happiness", "happy", "happen"], answer: 2, explanation: "'happy' = adjective; -ly = adverb; -ness = noun; -en = verb." },
  ],
  cheatSheetPoints: [
    "🏷️ Suffix → Part of speech",
    "🎯 Predict POS BEFORE looking at options",
    "⚠️ -ly ≠ always adverb (friendly!)",
  ],
  isNew: true,
};

// ============================================================
// 6. Part 6 Cohesion: Sentence Insertion
// ============================================================
const part6Cohesion: ToeicLecture = {
  id: "toeic-part6-cohesion",
  title: "Part 6 Cohesion: The Sentence Insertion Trap",
  titleVi: "Part 6: Mạch văn — Bẫy chèn câu",
  category: "reading",
  parts: ["Part 6"],
  icon: "🧩",
  duration: "22 min",
  level: "advanced",
  targetScore: "750+",
  description: "Solve the dreaded 'Which sentence best fits?' question by tracking pronouns, transitions, and topic flow.",
  descriptionVi: "Giải dạng 'Câu nào phù hợp nhất?' bằng cách bám đại từ, từ nối, mạch chủ đề.",
  trapAlerts: [
    { trap: "Picking the sentence with the most overlapping words", trapVi: "Chọn câu có nhiều từ trùng nhất", why: "Distractors copy keywords but break logic flow.", whyVi: "Bẫy lặp từ khóa nhưng phá mạch logic." },
  ],
  coreTechnique: [
    { step: 1, title: "Read the sentence BEFORE and AFTER the blank", titleVi: "Đọc câu TRƯỚC và SAU chỗ trống", description: "These define the topic the missing sentence must connect.", descriptionVi: "Hai câu này định nghĩa chủ đề cần nối." },
    { step: 2, title: "Track pronouns and demonstratives", titleVi: "Bám đại từ", description: "'It', 'they', 'this issue' must refer back to something concrete.", descriptionVi: "'It', 'they', 'this issue' phải nối với cái gì cụ thể." },
    { step: 3, title: "Match transition logic", titleVi: "Khớp logic từ nối", description: "However = contrast. Therefore = result. Additionally = add same-direction info.", descriptionVi: "However = đối lập. Therefore = kết quả. Additionally = thêm cùng chiều." },
  ],
  practiceSet: [
    {
      context: "Before blank: 'We received many complaints about parking.' After blank: 'For this reason, we will expand the lot next month.'",
      contextVi: "Trước: 'Chúng tôi nhận nhiều phàn nàn về bãi đậu xe.' Sau: 'Vì vậy, chúng tôi sẽ mở rộng bãi tháng sau.'",
      question: "Best fit sentence:",
      options: ["The cafeteria is closed Sundays.", "Most issues mention insufficient spaces.", "Our office hours have changed.", "Annual review is in March."],
      answer: 1,
      explanation: "Bridges the complaints (before) and expansion (after).",
      explanationVi: "Nối phàn nàn (trước) và mở rộng (sau).",
    },
  ],
  businessContext: "Memos, emails, notices — all require coherent flow. This skill transfers directly to writing tasks.",
  businessContextVi: "Memo, email, thông báo — đều cần mạch văn logic.",
  proSpeedTip: "💡 If 3 options share a topic word and 1 doesn't — the odd one out is usually wrong; among the 3, pick the one with a connecting transition.",
  proSpeedTipVi: "💡 3 đáp án cùng từ chủ đề, 1 khác → đáp án khác thường sai; chọn câu có từ nối.",
  vocabHighlights: [
    { word: "moreover", definition: "in addition", definitionVi: "hơn nữa", example: "Moreover, sales increased 20%." },
    { word: "consequently", definition: "as a result", definitionVi: "do đó", example: "Costs rose; consequently, prices increased." },
  ],
  quiz: [
    { question: "Which transition signals contrast?", options: ["Furthermore", "However", "Therefore", "Additionally"], answer: 1, explanation: "However = contrast." },
    { question: "Best clue for sentence-insertion answer:", options: ["Longest sentence", "Most repeated nouns", "Pronoun reference + transition logic", "First option"], answer: 2, explanation: "Pronouns + transitions reveal correct flow." },
  ],
  cheatSheetPoints: [
    "🔗 Read before AND after the blank",
    "🧷 Track pronouns",
    "↔️ Match transition logic to context",
  ],
  isNew: true,
};

// ============================================================
// 7. Part 7 NOT-Questions Strategy
// ============================================================
const part7Not: ToeicLecture = {
  id: "toeic-part7-not-questions",
  title: "Part 7 NOT-Questions: Eliminate, Don't Confirm",
  titleVi: "Part 7: Câu hỏi NOT — Loại trừ chứ không xác nhận",
  category: "reading",
  parts: ["Part 7"],
  icon: "❌",
  duration: "20 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Master 'Which is NOT mentioned?' questions — the time-sink that derails 30% of test takers.",
  descriptionVi: "Làm chủ 'Câu nào KHÔNG được đề cập?' — bẫy thời gian khiến 30% thí sinh lệch giờ.",
  trapAlerts: [
    { trap: "Trying to confirm the NOT-mentioned option directly", trapVi: "Cố tìm đáp án KHÔNG có", why: "You can't search for what's absent. You must verify what IS present.", whyVi: "Không thể tìm cái không có. Phải xác minh cái CÓ." },
  ],
  coreTechnique: [
    { step: 1, title: "Convert to 3 elimination tasks", titleVi: "Chuyển thành 3 nhiệm vụ loại trừ", description: "For each of A, B, C, find evidence in passage. Whichever has NO evidence = answer.", descriptionVi: "Với A, B, C — tìm bằng chứng. Cái KHÔNG có = đáp án." },
    { step: 2, title: "Scan for keywords, not synonyms", titleVi: "Quét từ khóa, không quét từ đồng nghĩa", description: "TOEIC paraphrases — the 'mentioned' options will appear as synonyms.", descriptionVi: "TOEIC dùng từ đồng nghĩa — đáp án 'có' sẽ là từ tương đương." },
    { step: 3, title: "Set 90-second timer", titleVi: "Đặt timer 90 giây", description: "If not solved in 90s, mark B and move on. NOT questions are the slowest type.", descriptionVi: "Quá 90 giây → đánh B và đi. Câu NOT là dạng chậm nhất." },
  ],
  practiceSet: [
    {
      context: "Job ad lists: full health insurance, paid vacation, gym membership, flexible hours.",
      contextVi: "Tin tuyển dụng: bảo hiểm sức khỏe, nghỉ có lương, thẻ gym, giờ giấc linh hoạt.",
      question: "Which benefit is NOT mentioned?",
      options: ["Health insurance", "Free meals", "Gym access", "Flexible scheduling"],
      answer: 1,
      explanation: "'Free meals' has no synonym in passage.",
      explanationVi: "'Bữa ăn miễn phí' không có từ tương đương trong bài.",
    },
  ],
  businessContext: "Job ads, product descriptions, policy memos all use lists — NOT questions probe attention to detail.",
  businessContextVi: "Tin tuyển dụng, mô tả sản phẩm, memo chính sách dùng danh sách.",
  proSpeedTip: "💡 NOT-questions take 2× longer. Do them LAST in each passage to protect your time on easier questions.",
  proSpeedTipVi: "💡 Câu NOT mất gấp đôi. Làm CUỐI trong mỗi bài để bảo vệ thời gian.",
  vocabHighlights: [
    { word: "perks", definition: "additional job benefits", definitionVi: "phúc lợi thêm", example: "Free coffee is a nice perk." },
    { word: "stipend", definition: "fixed regular allowance", definitionVi: "trợ cấp", example: "Interns receive a monthly stipend." },
  ],
  quiz: [
    { question: "Strategy for NOT questions:", options: ["Find what's missing", "Eliminate options that ARE in the passage", "Pick the longest option", "Always pick C"], answer: 1, explanation: "Eliminate-the-present is the only reliable method." },
    { question: "Time budget per NOT question:", options: ["30 seconds", "60 seconds", "90 seconds max", "Unlimited"], answer: 2, explanation: "Hard cap 90s — guess and move on." },
  ],
  cheatSheetPoints: [
    "🔍 Verify what IS, not what isn't",
    "📝 Watch synonyms, not exact words",
    "⏱️ 90s hard cap, then guess",
  ],
  isNew: true,
};

// ============================================================
// 8. Business Email Vocabulary & Tone
// ============================================================
const businessEmailVocab: ToeicLecture = {
  id: "toeic-business-email-vocab",
  title: "Business Email Vocabulary: From Formal to Friendly",
  titleVi: "Từ vựng email công sở: Trang trọng đến thân mật",
  category: "business-vocab",
  parts: ["Part 6", "Part 7"],
  icon: "✉️",
  duration: "25 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Learn the 50 most-tested email phrases — opening lines, requests, closings, and tone-matching.",
  descriptionVi: "Học 50 cụm email được test nhiều nhất — câu mở, đề nghị, kết thư, khớp tông giọng.",
  trapAlerts: [
    { trap: "Using 'Dear Sir/Madam' in an internal email", trapVi: "Dùng 'Dear Sir/Madam' trong email nội bộ", why: "Too formal — TOEIC tests register-matching.", whyVi: "Quá trang trọng — TOEIC kiểm tra mức độ phù hợp." },
  ],
  coreTechnique: [
    { step: 1, title: "Identify email type from subject + greeting", titleVi: "Nhận diện loại email từ chủ đề + lời chào", description: "External (formal), internal team (semi-formal), close colleague (informal).", descriptionVi: "Đối ngoại (trang trọng), nội bộ (bán trang trọng), đồng nghiệp thân (thân mật)." },
    { step: 2, title: "Match opening, body, closing tone", titleVi: "Khớp tông mở-thân-kết", description: "Mismatch = wrong answer in word-fill or sentence insertion.", descriptionVi: "Lệch tông = sai trong điền từ/chèn câu." },
    { step: 3, title: "Memorize 5 'safe' closings", titleVi: "Thuộc 5 câu kết thư an toàn", description: "'Best regards', 'Sincerely', 'Thanks', 'Kind regards', 'Cheers' (informal only).", descriptionVi: "'Best regards', 'Sincerely', 'Thanks', 'Kind regards', 'Cheers' (chỉ thân mật)." },
  ],
  practiceSet: [
    {
      context: "Email to a new client: 'I hope this email finds you well. ___ to introduce our services.'",
      contextVi: "Email gửi khách mới: 'Hy vọng email đến với anh/chị tốt lành. ___ giới thiệu dịch vụ của chúng tôi.'",
      question: "Best phrase:",
      options: ["I want", "I'd like to take this opportunity", "Gonna", "Just dropping by"],
      answer: 1,
      explanation: "'I'd like to take this opportunity' = formal & polite.",
      explanationVi: "'I'd like to take this opportunity' = trang trọng & lịch sự.",
    },
  ],
  businessContext: "Part 6 & 7 emails account for ~35% of Reading section. Tone-matching is critical.",
  businessContextVi: "Email Part 6 & 7 chiếm ~35% Reading.",
  proSpeedTip: "💡 If a sentence sounds 'too casual' → it's likely wrong. TOEIC favors slight over-formality.",
  proSpeedTipVi: "💡 Câu nghe 'quá xuề xòa' → thường sai. TOEIC ưu ái hơi trang trọng.",
  vocabHighlights: [
    { word: "I am writing to inquire about…", definition: "polite request opener", definitionVi: "câu mở đề nghị lịch sự", example: "I am writing to inquire about your products.", businessContext: "external email" },
    { word: "Please find attached…", definition: "send a file", definitionVi: "đính kèm tệp", example: "Please find attached the report." },
    { word: "At your earliest convenience", definition: "ASAP politely", definitionVi: "khi tiện sớm nhất", example: "Please reply at your earliest convenience." },
    { word: "Looking forward to your reply", definition: "expect a response", definitionVi: "mong hồi âm", example: "Looking forward to your reply." },
    { word: "Should you have any questions", definition: "if you have questions (formal)", definitionVi: "nếu có câu hỏi", example: "Should you have any questions, contact me." },
  ],
  quiz: [
    { question: "Most appropriate closing for email to a CEO:", options: ["Cheers!", "Bye", "Best regards", "TTYL"], answer: 2, explanation: "'Best regards' = formal-safe closing." },
    { question: "'Please ___ attached the invoice for your review.' Fill:", options: ["see", "find", "look", "check"], answer: 1, explanation: "Fixed phrase: 'Please find attached'." },
  ],
  cheatSheetPoints: [
    "🎩 Formality ladder: External > Internal > Close colleague",
    "📎 'Please find attached' is fixed",
    "✅ Slight over-formality > under-formality on TOEIC",
  ],
  isNew: true,
};

// ============================================================
// 9. Meeting & Negotiation Vocabulary
// ============================================================
const meetingNegotiationVocab: ToeicLecture = {
  id: "toeic-meeting-negotiation",
  title: "Meeting & Negotiation Vocabulary",
  titleVi: "Từ vựng họp hành & đàm phán",
  category: "business-vocab",
  parts: ["Part 3", "Part 4", "Part 7"],
  icon: "🤝",
  duration: "25 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Master 40 high-frequency meeting phrases: agenda-setting, agreement, disagreement, postponement.",
  descriptionVi: "Làm chủ 40 cụm họp/đàm phán tần suất cao.",
  trapAlerts: [
    { trap: "'Table the discussion' (US) vs (UK)", trapVi: "'Table the discussion' (Mỹ) vs (Anh)", why: "US = postpone. UK = bring up for discussion. TOEIC uses US meaning.", whyVi: "Mỹ = hoãn. Anh = đưa ra bàn. TOEIC dùng nghĩa Mỹ." },
  ],
  coreTechnique: [
    { step: 1, title: "Group vocab by meeting phase", titleVi: "Nhóm từ theo giai đoạn họp", description: "Opening, presenting, debating, deciding, closing.", descriptionVi: "Mở đầu, trình bày, tranh luận, quyết định, kết thúc." },
    { step: 2, title: "Learn agreement vs. soft disagreement", titleVi: "Phân biệt đồng ý vs. bất đồng nhẹ", description: "'I see your point, but…' = polite disagreement (very common in TOEIC).", descriptionVi: "'I see your point, but…' = bất đồng lịch sự." },
    { step: 3, title: "Practice with audio", titleVi: "Luyện cùng audio", description: "Tone reveals real intent in Part 3 conversations.", descriptionVi: "Tông giọng tiết lộ ý định trong Part 3." },
  ],
  practiceSet: [
    {
      context: "Manager: 'Let's ___ this proposal until the next quarter.'",
      contextVi: "Sếp: 'Hãy ___ đề xuất này đến quý sau.'",
      question: "Best fill:",
      options: ["table", "destroy", "celebrate", "approve"],
      answer: 0,
      explanation: "'Table' (US) = postpone, fits 'until next quarter'.",
      explanationVi: "'Table' (Mỹ) = hoãn, hợp với 'đến quý sau'.",
    },
  ],
  businessContext: "Meeting dialogues are 30% of Part 3/4 content.",
  businessContextVi: "Hội thoại họp chiếm 30% Part 3/4.",
  proSpeedTip: "💡 'Let's circle back' = revisit later. 'Touch base' = brief check-in. Memorize the 10 idioms — they're tested every test.",
  proSpeedTipVi: "💡 'Let's circle back' = quay lại sau. 'Touch base' = trao đổi nhanh. Học 10 thành ngữ — luôn xuất hiện.",
  vocabHighlights: [
    { word: "agenda", definition: "list of meeting topics", definitionVi: "chương trình họp", example: "Today's agenda has 5 items." },
    { word: "minutes", definition: "written meeting record", definitionVi: "biên bản họp", example: "Sarah will take the minutes." },
    { word: "circle back", definition: "return to a topic", definitionVi: "quay lại sau", example: "Let's circle back on this next week." },
    { word: "consensus", definition: "general agreement", definitionVi: "sự đồng thuận", example: "We reached a consensus on pricing." },
    { word: "stakeholder", definition: "person with interest in outcome", definitionVi: "bên liên quan", example: "All stakeholders must approve." },
    { word: "leverage", definition: "use to maximum advantage", definitionVi: "tận dụng", example: "We can leverage our network." },
  ],
  quiz: [
    { question: "'Let's table this' on TOEIC means:", options: ["Discuss now", "Postpone", "Vote", "Cancel"], answer: 1, explanation: "US English: postpone." },
    { question: "Polite disagreement phrase:", options: ["You're wrong!", "I see your point, but…", "No way", "Whatever"], answer: 1, explanation: "Standard polite formula." },
  ],
  cheatSheetPoints: [
    "📋 Agenda → Minutes → Action items",
    "🤝 'Circle back', 'touch base' = revisit",
    "⚖️ 'Consensus', 'stakeholder', 'leverage' = TOEIC favorites",
  ],
  isNew: true,
};

// ============================================================
// 10. The 900+ Mindset
// ============================================================
const score900Mindset: ToeicLecture = {
  id: "toeic-900-mindset",
  title: "The 900+ Mindset: Pacing, Triage, Confidence",
  titleVi: "Tư duy 900+: Nhịp độ, phân loại, tự tin",
  category: "speed-hacks",
  parts: ["All Parts"],
  icon: "🏆",
  duration: "20 min",
  level: "advanced",
  targetScore: "900+",
  description: "Beyond skills — the test-day strategy used by 990 scorers: pacing per part, triage rules, confidence anchors.",
  descriptionVi: "Vượt kỹ năng — chiến lược ngày thi của thí sinh 990: nhịp độ/phần, quy tắc phân loại, neo tự tin.",
  trapAlerts: [
    { trap: "Re-checking answers when finishing early", trapVi: "Xem lại bài khi xong sớm", why: "Statistics show 60% of changes go from RIGHT to WRONG.", whyVi: "Thống kê: 60% sửa đổi đi từ ĐÚNG sang SAI." },
    { trap: "Spending >75 sec on a single Part 5 question", trapVi: "Mất >75 giây cho một câu Part 5", why: "Breaks pacing for the entire Reading section.", whyVi: "Phá nhịp cả phần Reading." },
  ],
  coreTechnique: [
    { step: 1, title: "Lock pacing per part", titleVi: "Khóa nhịp mỗi phần", description: "P5: 12 min for 30 Qs. P6: 8 min. P7: 55 min for 54 Qs (≈1 min each).", descriptionVi: "P5: 12 phút/30 câu. P6: 8 phút. P7: 55 phút/54 câu (~1 phút/câu)." },
    { step: 2, title: "Apply 3-skip rule", titleVi: "Áp dụng quy tắc bỏ 3", description: "If 3 consecutive questions feel hard, you misjudged a passage. Move to next set, return last.", descriptionVi: "3 câu liên tiếp khó → bạn đánh giá sai bài. Sang bộ tiếp, quay lại sau." },
    { step: 3, title: "Confidence anchor: 'Mark + Move'", titleVi: "Neo tự tin: 'Đánh dấu + Đi tiếp'", description: "Never leave blank. Mark best guess, flag, move on. Return only if time allows.", descriptionVi: "KHÔNG để trống. Đánh dấu đoán tốt nhất, gắn cờ, đi tiếp. Chỉ quay lại nếu còn giờ." },
  ],
  practiceSet: [
    {
      context: "You have 8 minutes left and 12 Part 7 questions remaining.",
      contextVi: "Còn 8 phút và 12 câu Part 7.",
      question: "Best strategy?",
      options: ["Read every passage carefully", "Skip the longest passage and answer questions from skim", "Leave them blank", "Mark all 'B'"],
      answer: 1,
      explanation: "Skim + best-guess on hardest passage maximizes total correct.",
      explanationVi: "Skim + đoán tốt cho bài khó nhất → tối đa câu đúng.",
    },
  ],
  businessContext: "Test-day execution accounts for ~50 points of difference between 850 and 950 scorers.",
  businessContextVi: "Chiến lược ngày thi tạo khác biệt ~50 điểm giữa 850 và 950.",
  proSpeedTip: "💡 Eat carbs 90 min before test. Caffeine 30 min before. Drink minimal water (no breaks!).",
  proSpeedTipVi: "💡 Ăn carb 90 phút trước thi. Caffeine 30 phút. Uống nước tối thiểu (không có giải lao!).",
  vocabHighlights: [
    { word: "triage", definition: "prioritize tasks by urgency", definitionVi: "phân loại ưu tiên", example: "Triage your weak spots before test day." },
    { word: "pacing", definition: "controlling speed", definitionVi: "kiểm soát tốc độ", example: "Pacing is everything in TOEIC Reading." },
  ],
  quiz: [
    { question: "Best response when you don't know an answer:", options: ["Leave blank", "Re-read until clear", "Mark best guess + move on", "Skip the rest"], answer: 2, explanation: "Mark + move protects pacing and total score." },
    { question: "Time budget for Part 7:", options: ["75 min", "55 min", "30 min", "Unlimited"], answer: 1, explanation: "55 min for 54 Qs ≈ 1 min each." },
  ],
  cheatSheetPoints: [
    "⏱️ P5:12 / P6:8 / P7:55 minutes",
    "🚫 NEVER leave blank",
    "🔄 Don't change answers when reviewing",
    "🍞 Carbs + caffeine, minimal water",
  ],
  isNew: true,
};

// ============================================================
// EXPORT
// ============================================================
export const toeicExpansionLectures: ToeicLecture[] = [
  part1StateAction,
  part2WhDecoder,
  part3Intent,
  part4Announcements,
  part5WordForms,
  part6Cohesion,
  part7Not,
  businessEmailVocab,
  meetingNegotiationVocab,
  score900Mindset,
];

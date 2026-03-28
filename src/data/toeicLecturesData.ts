// TOEIC Lectures for Skills - 10 high-impact lessons for New Economy format

export interface ToeicQuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface ToeicStrategyStep {
  step: number;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  example?: string;
}

export interface ToeicTrap {
  trap: string;
  trapVi: string;
  why: string;
  whyVi: string;
}

export interface ToeicVocabHighlight {
  word: string;
  definition: string;
  definitionVi: string;
  example: string;
  businessContext?: string;
}

export interface ToeicPracticeQuestion {
  context: string;
  contextVi: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  explanationVi: string;
}

export interface ToeicLecture {
  id: string;
  title: string;
  titleVi: string;
  category: "listening" | "reading" | "grammar" | "business-vocab" | "speed-hacks";
  parts: string[];
  icon: string;
  duration: string;
  level: "foundation" | "intermediate" | "advanced";
  targetScore: "450+" | "600+" | "750+" | "900+";
  description: string;
  descriptionVi: string;
  trapAlerts: ToeicTrap[];
  coreTechnique: ToeicStrategyStep[];
  practiceSet: ToeicPracticeQuestion[];
  businessContext: string;
  businessContextVi: string;
  proSpeedTip: string;
  proSpeedTipVi: string;
  vocabHighlights: ToeicVocabHighlight[];
  quiz: ToeicQuizQuestion[];
  cheatSheetPoints: string[];
  isNew?: boolean;
}

// === LESSON 1: Part 1 Photos - Sound Distractors ===
const part1Photos: ToeicLecture = {
  id: "toeic-part1-distractors",
  title: "Common Distractors: Being Careful with Similar Sounds",
  titleVi: "Bẫy âm thanh tương tự trong Part 1",
  category: "listening",
  parts: ["Part 1"],
  icon: "📸",
  duration: "20 min",
  level: "foundation",
  targetScore: "450+",
  description: "Learn to identify and avoid the most common sound-based traps in TOEIC Part 1 Photograph questions.",
  descriptionVi: "Học cách nhận diện và tránh các bẫy âm thanh phổ biến nhất trong câu hỏi mô tả hình ảnh Part 1.",
  trapAlerts: [
    {
      trap: "Homophones like 'copy' vs 'coffee', 'desk' vs 'disk'",
      trapVi: "Từ đồng âm như 'copy' vs 'coffee', 'desk' vs 'disk'",
      why: "ETS uses words that SOUND similar to objects in the photo to trick you into choosing the wrong answer.",
      whyVi: "ETS dùng từ PHÁT ÂM giống đồ vật trong hình để đánh lừa bạn chọn sai."
    },
    {
      trap: "Correct object, wrong action — e.g., 'The woman is HOLDING a phone' vs 'TALKING on a phone'",
      trapVi: "Đúng đồ vật, sai hành động — vd: 'CẦM điện thoại' vs 'ĐANG NÓI điện thoại'",
      why: "The distractor mentions something visible in the photo but describes an incorrect action.",
      whyVi: "Đáp án bẫy đề cập vật thể có trong hình nhưng mô tả sai hành động."
    },
    {
      trap: "Using present continuous for a completed action",
      trapVi: "Dùng thì hiện tại tiếp diễn cho hành động đã hoàn thành",
      why: "'Books are being read' implies actively reading, not just books sitting on a shelf.",
      whyVi: "'Books are being read' ngụ ý đang đọc, không phải sách nằm trên kệ."
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Pre-scan the Photo (5 seconds)",
      titleVi: "Quét nhanh hình ảnh (5 giây)",
      description: "Before audio plays, identify: WHO (people/no people), WHAT (objects), WHERE (location), ACTION (what's happening).",
      descriptionVi: "Trước khi nghe, xác định: AI (người/không người), CÁI GÌ (đồ vật), Ở ĐÂU (địa điểm), HÀNH ĐỘNG (đang làm gì).",
    },
    {
      step: 2,
      title: "Listen for the Verb",
      titleVi: "Nghe động từ chính",
      description: "The verb determines the answer. Focus on whether the action described MATCHES what you see in the photo.",
      descriptionVi: "Động từ quyết định đáp án. Tập trung vào hành động mô tả có KHỚP với hình không.",
      example: "Photo: Man at desk with laptop → 'working on' ✅ vs 'repairing' ❌",
    },
    {
      step: 3,
      title: "Eliminate by Voice (Active vs Passive)",
      titleVi: "Loại trừ theo thể (Chủ động vs Bị động)",
      description: "'A man is loading boxes' (active) vs 'Boxes are being loaded' (passive). Both can be correct — check if the AGENT matches.",
      descriptionVi: "'Người đàn ông đang xếp hộp' (chủ động) vs 'Hộp đang được xếp' (bị động). Cả hai đều có thể đúng — kiểm tra CHỦ THỂ.",
    },
  ],
  practiceSet: [
    {
      context: "Photo: A woman is standing next to a photocopier in an office.",
      contextVi: "Hình: Một phụ nữ đang đứng cạnh máy photocopy trong văn phòng.",
      question: "Choose the best description:",
      options: [
        "A woman is making copies of a document.",
        "A woman is standing near a machine.",
        "A woman is repairing office equipment.",
        "A woman is sitting at her desk.",
      ],
      answer: 1,
      explanation: "We can only confirm she is STANDING NEAR A MACHINE. We cannot assume she is making copies or repairing it.",
      explanationVi: "Chỉ xác nhận được cô ấy ĐANG ĐỨNG GẦN MÁY. Không thể suy luận cô ấy đang photocopy hay sửa máy.",
    },
    {
      context: "Photo: Two men shaking hands in a conference room.",
      contextVi: "Hình: Hai người đàn ông bắt tay trong phòng họp.",
      question: "Choose the best description:",
      options: [
        "They are signing a contract.",
        "They are greeting each other.",
        "They are leaving the room.",
        "They are arguing about a deal.",
      ],
      answer: 1,
      explanation: "Shaking hands = greeting. We cannot infer signing a contract or arguing.",
      explanationVi: "Bắt tay = chào hỏi. Không thể suy luận đang ký hợp đồng hay tranh luận.",
    },
    {
      context: "Photo: An empty parking lot with a few cars.",
      contextVi: "Hình: Bãi đỗ xe trống với vài chiếc ô tô.",
      question: "Choose the best description:",
      options: [
        "Cars are being parked by drivers.",
        "The parking lot is nearly empty.",
        "People are walking to their vehicles.",
        "Cars are being washed.",
      ],
      answer: 1,
      explanation: "No people visible, so only the state of the lot can be described. 'Nearly empty' is factual.",
      explanationVi: "Không thấy người, chỉ có thể mô tả trạng thái bãi đỗ. 'Gần như trống' là khách quan.",
    },
  ],
  businessContext: "Part 1 photos often depict real workplace scenarios: offices, factories, retail stores, and outdoor business settings. Understanding these visual contexts helps you anticipate vocabulary.",
  businessContextVi: "Hình Part 1 thường miêu tả cảnh thực tế: văn phòng, nhà máy, cửa hàng, ngoài trời. Hiểu bối cảnh giúp bạn dự đoán từ vựng.",
  proSpeedTip: "Mark your answer AS SOON as you're sure — don't wait for all 4 options. Use the remaining time to pre-scan the NEXT photo.",
  proSpeedTipVi: "Đánh dấu đáp án NGAY khi chắc chắn — đừng chờ nghe hết 4 lựa chọn. Dùng thời gian còn lại để quét hình TIẾP THEO.",
  vocabHighlights: [
    { word: "adjacent to", definition: "next to, beside", definitionVi: "bên cạnh, kề bên", example: "The printer is adjacent to the filing cabinet.", businessContext: "Office layout descriptions" },
    { word: "pedestrian", definition: "a person walking", definitionVi: "người đi bộ", example: "Pedestrians are crossing the street.", businessContext: "Urban/outdoor photos" },
    { word: "merchandise", definition: "goods for sale", definitionVi: "hàng hóa", example: "Merchandise is displayed on shelves.", businessContext: "Retail store scenes" },
    { word: "stack", definition: "a pile of items", definitionVi: "chồng, đống", example: "A stack of boxes is in the warehouse.", businessContext: "Warehouse/storage" },
  ],
  quiz: [
    { question: "What should you do BEFORE the audio plays in Part 1?", options: ["Close your eyes and focus", "Pre-scan the photo for WHO, WHAT, WHERE, ACTION", "Read the next question", "Write notes"], answer: 1, explanation: "Pre-scanning gives you a mental framework to evaluate each description." },
    { question: "Which is the most common trap in Part 1?", options: ["Speaking too fast", "Using homophones (similar-sounding words)", "Complex grammar", "Long sentences"], answer: 1, explanation: "ETS frequently uses words that sound like objects in the photo." },
    { question: "'Boxes are being loaded onto a truck' — this is:", options: ["Active voice", "Passive voice", "Past tense", "Future tense"], answer: 1, explanation: "'are being loaded' is present continuous passive." },
    { question: "If no people are in the photo, you should eliminate options that:", options: ["Describe weather", "Mention a person doing an action", "Describe objects", "Use passive voice"], answer: 1, explanation: "No people = no human actions. Eliminate 'A man is...' or 'Workers are...'." },
  ],
  cheatSheetPoints: [
    "Pre-scan: WHO + WHAT + WHERE + ACTION before audio",
    "Focus on the VERB — it decides the answer",
    "No people in photo = eliminate all human-action answers",
    "Homophone trap: copy ≠ coffee, desk ≠ disk",
    "Don't infer — only describe what you SEE",
  ],
  isNew: true,
};

// === LESSON 2: Part 2 - 5W1H Strategy ===
const part2Strategy: ToeicLecture = {
  id: "toeic-part2-5w1h",
  title: "The 5W1H Strategy: Focusing on the First Word",
  titleVi: "Chiến thuật 5W1H: Nghe từ để hỏi đầu tiên",
  category: "listening",
  parts: ["Part 2"],
  icon: "🎯",
  duration: "22 min",
  level: "foundation",
  targetScore: "450+",
  description: "Master the critical skill of catching the first word in Part 2 questions to instantly identify the correct response type.",
  descriptionVi: "Làm chủ kỹ năng nghe từ đầu tiên trong Part 2 để xác định ngay loại câu trả lời đúng.",
  trapAlerts: [
    {
      trap: "Answers that repeat words from the question",
      trapVi: "Đáp án lặp lại từ trong câu hỏi",
      why: "If you hear the same word in the answer, it's usually a TRAP. The correct answer uses synonyms.",
      whyVi: "Nếu nghe thấy cùng từ trong đáp án, thường đó là BẪY. Đáp án đúng dùng từ đồng nghĩa."
    },
    {
      trap: "Indirect answers that seem unrelated",
      trapVi: "Đáp án gián tiếp có vẻ không liên quan",
      why: "'When is the meeting?' → 'Ask Ms. Johnson' is a valid indirect answer.",
      whyVi: "'Cuộc họp khi nào?' → 'Hỏi chị Johnson' là đáp án gián tiếp hợp lệ."
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Catch the First Word",
      titleVi: "Bắt từ đầu tiên",
      description: "The first word tells you EVERYTHING: Where → location, When → time, Who → person, What → thing, Why → reason, How → method.",
      descriptionVi: "Từ đầu tiên cho biết TẤT CẢ: Where → địa điểm, When → thời gian, Who → người, What → vật, Why → lý do, How → cách thức.",
      example: "'WHERE is the meeting room?' → Answer must contain a LOCATION.",
    },
    {
      step: 2,
      title: "Identify Yes/No vs Wh-Questions",
      titleVi: "Phân biệt Yes/No vs Wh-Question",
      description: "Do/Does/Did/Is/Are/Will/Can → Yes/No type. But TOEIC rarely uses 'Yes' or 'No' directly!",
      descriptionVi: "Do/Does/Did/Is/Are/Will/Can → dạng Yes/No. Nhưng TOEIC hiếm khi dùng 'Yes' hoặc 'No' trực tiếp!",
    },
    {
      step: 3,
      title: "Watch for Tag Questions & Offers",
      titleVi: "Chú ý Tag Questions & Lời đề nghị",
      description: "Tag questions (...isn't it?) and offers (Would you like...?) need agreeing/declining responses.",
      descriptionVi: "Tag question (...phải không?) và lời đề nghị (Bạn có muốn...?) cần câu trả lời đồng ý/từ chối.",
    },
  ],
  practiceSet: [
    {
      context: "Office conversation",
      contextVi: "Hội thoại văn phòng",
      question: "WHERE is the new printer located?",
      options: ["It was delivered yesterday.", "On the third floor, near the elevator.", "It prints very quickly."],
      answer: 1,
      explanation: "WHERE requires a LOCATION answer. 'On the third floor' is the only location.",
      explanationVi: "WHERE yêu cầu ĐỊA ĐIỂM. 'Tầng 3' là đáp án duy nhất chỉ vị trí.",
    },
    {
      context: "Business meeting",
      contextVi: "Cuộc họp kinh doanh",
      question: "WHEN will the contract be finalized?",
      options: ["The legal department is reviewing it.", "By the end of this week.", "It's a very important contract."],
      answer: 1,
      explanation: "WHEN requires a TIME answer. 'By the end of this week' gives a specific timeframe.",
      explanationVi: "WHEN yêu cầu THỜI GIAN. 'Cuối tuần này' cho khung thời gian cụ thể.",
    },
    {
      context: "Email discussion",
      contextVi: "Trao đổi email",
      question: "Could you send me the quarterly report?",
      options: ["I already emailed it to you.", "The report was very detailed.", "Yes, the quarter ended last month."],
      answer: 0,
      explanation: "This is a REQUEST. 'I already emailed it' is a natural response to the request.",
      explanationVi: "Đây là LỜI YÊU CẦU. 'Tôi đã gửi email rồi' là phản hồi tự nhiên.",
    },
  ],
  businessContext: "Part 2 simulates real office conversations: asking for directions, scheduling meetings, making requests, and discussing deadlines — all essential workplace communication skills.",
  businessContextVi: "Part 2 mô phỏng hội thoại văn phòng: hỏi đường, xếp lịch, yêu cầu, thảo luận deadline — đều là kỹ năng giao tiếp công sở thiết yếu.",
  proSpeedTip: "If you miss the first word, don't panic. Eliminate the option that repeats words from the question — it's almost always wrong.",
  proSpeedTipVi: "Nếu nghe lỡ từ đầu, đừng hoảng. Loại đáp án lặp từ trong câu hỏi — gần như luôn sai.",
  vocabHighlights: [
    { word: "finalize", definition: "to complete, to make final", definitionVi: "hoàn tất, chốt", example: "We need to finalize the agreement by Friday.", businessContext: "Contracts & deals" },
    { word: "reschedule", definition: "to change the time of a meeting", definitionVi: "đổi lịch", example: "Can we reschedule the appointment to next Monday?", businessContext: "Calendar management" },
    { word: "forward", definition: "to send to another person", definitionVi: "chuyển tiếp", example: "Please forward the email to the team.", businessContext: "Email communication" },
  ],
  quiz: [
    { question: "What's the MOST important thing to listen for in Part 2?", options: ["The last word", "The first word (question word)", "The speaker's tone", "Background noise"], answer: 1, explanation: "The first word (Where/When/Who/What/Why/How) determines the answer type." },
    { question: "If an answer repeats a key word from the question, it's usually:", options: ["Correct", "A distractor (trap)", "The best choice", "An indirect answer"], answer: 1, explanation: "ETS uses word repetition as a trap. Correct answers use paraphrasing." },
    { question: "'Could you help me with this report?' is a:", options: ["Wh-question", "Yes/No question", "Request", "Tag question"], answer: 2, explanation: "'Could you...' is a polite request, not a yes/no question." },
    { question: "An indirect answer to 'When is the deadline?' could be:", options: ["Next Friday.", "Check with the project manager.", "The deadline is important.", "Yes, there is a deadline."], answer: 1, explanation: "'Check with the project manager' is a valid indirect response — it redirects the question." },
  ],
  cheatSheetPoints: [
    "First word = answer type (Where→place, When→time, Who→person)",
    "Word repetition in answers = usually a TRAP",
    "Indirect answers are VALID in TOEIC (e.g., 'Ask Ms. Kim')",
    "Yes/No questions rarely get a direct 'Yes' or 'No'",
    "Offers & requests need accept/decline responses",
  ],
  isNew: true,
};

// === LESSON 3: Part 3 & 4 - Graphic-Based Questions ===
const part34Graphic: ToeicLecture = {
  id: "toeic-part34-graphic",
  title: "Graphic-Based Questions: Look and Listen Simultaneously",
  titleVi: "Câu hỏi kết hợp biểu đồ: Vừa nhìn vừa nghe",
  category: "listening",
  parts: ["Part 3", "Part 4"],
  icon: "📊",
  duration: "25 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Master the technique of combining visual information from graphics with audio to answer Part 3 & 4 questions accurately.",
  descriptionVi: "Làm chủ kỹ thuật kết hợp thông tin hình ảnh từ biểu đồ với âm thanh để trả lời chính xác Part 3 & 4.",
  trapAlerts: [
    {
      trap: "The graphic shows 4 options but the audio mentions ALL of them — only ONE matches the question",
      trapVi: "Biểu đồ hiện 4 lựa chọn nhưng audio đề cập TẤT CẢ — chỉ MỘT khớp câu hỏi",
      why: "You must listen for the SPECIFIC detail the question asks about, not just any mentioned item.",
      whyVi: "Phải nghe CHI TIẾT CỤ THỂ câu hỏi hỏi, không phải bất kỳ mục nào được nhắc."
    },
    {
      trap: "Numbers/prices change during the conversation",
      trapVi: "Số/giá thay đổi trong hội thoại",
      why: "'The original price was $50 but we got a 20% discount' — the answer is $40, not $50.",
      whyVi: "'Giá gốc $50 nhưng giảm 20%' — đáp án là $40, không phải $50."
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Pre-read the Graphic (15 seconds)",
      titleVi: "Đọc trước biểu đồ (15 giây)",
      description: "During direction time, study the graphic: What type? (schedule, map, price list, chart). Note all options.",
      descriptionVi: "Trong lúc nghe hướng dẫn, nghiên cứu biểu đồ: Loại gì? (lịch, bản đồ, bảng giá, biểu đồ). Ghi nhớ tất cả lựa chọn.",
    },
    {
      step: 2,
      title: "Read Question + Predict Answer Type",
      titleVi: "Đọc câu hỏi + Dự đoán loại đáp án",
      description: "'Look at the graphic. What time will...' → Listen for TIME references that match the graphic options.",
      descriptionVi: "'Nhìn biểu đồ. Mấy giờ sẽ...' → Nghe từ chỉ THỜI GIAN khớp lựa chọn trong biểu đồ.",
    },
    {
      step: 3,
      title: "Listen for the Correction/Final Decision",
      titleVi: "Nghe phần SỬA ĐỔI / Quyết định cuối",
      description: "Conversations often mention an initial choice, then CHANGE it. The LAST decision is usually the answer.",
      descriptionVi: "Hội thoại thường đề cập lựa chọn ban đầu, rồi THAY ĐỔI. Quyết định CUỐI thường là đáp án.",
      example: "'Let's meet at 2... actually, 3 would be better.' → Answer: 3 PM",
    },
  ],
  practiceSet: [
    {
      context: "Graphic: A meeting room schedule showing Room A (9AM), Room B (10AM), Room C (11AM), Room D (2PM)",
      contextVi: "Biểu đồ: Lịch phòng họp — Phòng A (9h), Phòng B (10h), Phòng C (11h), Phòng D (14h)",
      question: "Look at the graphic. Which room will the speakers use?",
      options: ["Room A", "Room B", "Room C", "Room D"],
      answer: 2,
      explanation: "The speakers say: 'Room A is booked, and we can't do morning... Let's take the 11 o'clock slot.' → Room C.",
      explanationVi: "Họ nói: 'Phòng A đã đặt, sáng không được... Lấy slot 11 giờ.' → Phòng C.",
    },
    {
      context: "Graphic: Product price list — Basic ($29), Standard ($49), Premium ($79), Enterprise ($149)",
      contextVi: "Biểu đồ: Bảng giá sản phẩm — Basic ($29), Standard ($49), Premium ($79), Enterprise ($149)",
      question: "Look at the graphic. Which plan will the company purchase?",
      options: ["Basic", "Standard", "Premium", "Enterprise"],
      answer: 2,
      explanation: "Speaker: 'We need team features but not the full Enterprise. Premium has everything we need.'",
      explanationVi: "Người nói: 'Cần tính năng nhóm nhưng không cần Enterprise. Premium có đủ thứ mình cần.'",
    },
  ],
  businessContext: "Graphic-based questions mirror real business tasks: reading schedules, comparing price plans, analyzing sales charts, and navigating office floor plans during phone calls.",
  businessContextVi: "Câu hỏi biểu đồ mô phỏng công việc thực: đọc lịch, so sánh bảng giá, phân tích biểu đồ doanh số, xem sơ đồ văn phòng khi nghe điện thoại.",
  proSpeedTip: "Circle the graphic question number before audio starts. When you hear the key detail, mark it IMMEDIATELY on the graphic.",
  proSpeedTipVi: "Khoanh số câu hỏi biểu đồ trước khi audio bắt đầu. Khi nghe chi tiết quan trọng, đánh dấu NGAY trên biểu đồ.",
  vocabHighlights: [
    { word: "itinerary", definition: "travel plan with schedule", definitionVi: "lịch trình", example: "Check the itinerary for departure times.", businessContext: "Business travel" },
    { word: "invoice", definition: "a bill for services", definitionVi: "hóa đơn", example: "The invoice shows the total amount due.", businessContext: "Accounting" },
    { word: "extension", definition: "phone number within a company", definitionVi: "số nội bộ", example: "You can reach me at extension 305.", businessContext: "Office phone systems" },
  ],
  quiz: [
    { question: "When should you study the graphic?", options: ["During the conversation", "Before the audio plays", "After answering", "Only if confused"], answer: 1, explanation: "Use direction time (15+ seconds) to pre-read the graphic and all its options." },
    { question: "If the speakers mention multiple numbers, the answer is usually:", options: ["The first number", "The biggest number", "The LAST/corrected number", "The smallest number"], answer: 2, explanation: "Conversations often correct or change initial choices. The final decision is the answer." },
    { question: "What type of graphic is MOST common in TOEIC?", options: ["Pie charts", "Schedules and price lists", "Complex scientific graphs", "Maps of cities"], answer: 1, explanation: "TOEIC focuses on business-relevant graphics: schedules, price lists, order forms." },
  ],
  cheatSheetPoints: [
    "Pre-read graphic during direction time (15 sec)",
    "Question tells you WHAT to listen for in the audio",
    "Listen for corrections — the LAST answer is usually right",
    "Numbers/prices often change during conversation",
    "Mark answer on graphic immediately when you hear it",
  ],
  isNew: true,
};

// === LESSON 4: Part 5 - 3-Second Grammar Rule ===
const part5Grammar: ToeicLecture = {
  id: "toeic-part5-word-forms",
  title: "The 3-Second Grammar Rule: Identifying Word Forms",
  titleVi: "Quy tắc 3 giây: Nhận diện loại từ Part 5",
  category: "grammar",
  parts: ["Part 5"],
  icon: "⚡",
  duration: "20 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Learn to identify the correct word form (noun, verb, adjective, adverb) in 3 seconds by analyzing word position.",
  descriptionVi: "Học cách nhận diện dạng từ đúng (danh từ, động từ, tính từ, trạng từ) trong 3 giây bằng phân tích vị trí từ.",
  trapAlerts: [
    {
      trap: "All 4 options look similar (employ, employee, employment, employer)",
      trapVi: "Cả 4 đáp án trông giống nhau (employ, employee, employment, employer)",
      why: "Word form questions test your knowledge of word POSITION, not meaning. The blank's position tells you the answer.",
      whyVi: "Câu hỏi dạng từ kiểm tra VỊ TRÍ từ, không phải nghĩa. Vị trí chỗ trống cho biết đáp án."
    },
    {
      trap: "Confusing adjective vs adverb: 'The report was completed ___' (quick/quickly)",
      trapVi: "Nhầm tính từ vs trạng từ: 'Báo cáo hoàn thành ___' (nhanh/một cách nhanh)",
      why: "After a verb → adverb. After 'be' → adjective. This rule covers 80% of cases.",
      whyVi: "Sau động từ → trạng từ. Sau 'be' → tính từ. Quy tắc này phủ 80% trường hợp."
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Look at the Options First",
      titleVi: "Nhìn đáp án TRƯỚC",
      description: "If all 4 options are different forms of the SAME word, it's a word form question. Don't read the full sentence — use position rules.",
      descriptionVi: "Nếu 4 đáp án là dạng khác nhau của CÙNG MỘT từ → câu hỏi dạng từ. Không cần đọc cả câu — dùng quy tắc vị trí.",
    },
    {
      step: 2,
      title: "Apply the Position Rules",
      titleVi: "Áp dụng quy tắc vị trí",
      description: "Article/Adj + ___ → NOUN | ___ + noun → ADJECTIVE | ___ + adj/verb → ADVERB | Subject + ___ → VERB",
      descriptionVi: "Mạo từ/Tính từ + ___ → DANH TỪ | ___ + danh từ → TÍNH TỪ | ___ + tính từ/động từ → TRẠNG TỪ | Chủ ngữ + ___ → ĐỘNG TỪ",
      example: "'The ___ growth exceeded expectations' → Article 'The' + ___ + noun 'growth' = ADJECTIVE needed → 'remarkable'",
    },
    {
      step: 3,
      title: "Common Suffix Shortcuts",
      titleVi: "Phím tắt hậu tố",
      description: "Nouns: -tion, -ment, -ness, -ity | Adjectives: -ive, -ous, -ful, -able | Adverbs: -ly | Verbs: -ize, -ify, -en",
      descriptionVi: "Danh từ: -tion, -ment, -ness, -ity | Tính từ: -ive, -ous, -ful, -able | Trạng từ: -ly | Động từ: -ize, -ify, -en",
    },
  ],
  practiceSet: [
    {
      context: "Part 5 sentence completion",
      contextVi: "Hoàn thành câu Part 5",
      question: "The company's annual revenue showed ___ improvement this quarter.",
      options: ["significance", "significant", "significantly", "signify"],
      answer: 1,
      explanation: "Position: ___ + noun 'improvement' → need ADJECTIVE. 'significant' is the adjective.",
      explanationVi: "Vị trí: ___ + danh từ 'improvement' → cần TÍNH TỪ. 'significant' là tính từ.",
    },
    {
      context: "Part 5 sentence completion",
      contextVi: "Hoàn thành câu Part 5",
      question: "All employees must submit their reports ___.",
      options: ["prompt", "promptly", "promptness", "prompting"],
      answer: 1,
      explanation: "After verb 'submit' + object → adverb to modify the verb. 'promptly' = adverb.",
      explanationVi: "Sau động từ 'submit' + tân ngữ → trạng từ bổ nghĩa động từ. 'promptly' = trạng từ.",
    },
    {
      context: "Part 5 sentence completion",
      contextVi: "Hoàn thành câu Part 5",
      question: "The ___ of the new policy was announced at the meeting.",
      options: ["implement", "implementation", "implementing", "implemented"],
      answer: 1,
      explanation: "'The ___' → Article + blank = NOUN needed. 'implementation' (-tion suffix = noun).",
      explanationVi: "'The ___' → Mạo từ + chỗ trống = cần DANH TỪ. 'implementation' (hậu tố -tion = danh từ).",
    },
  ],
  businessContext: "Word form questions test vocabulary you'll use in business writing: reports, emails, contracts, and presentations. Mastering these forms improves both your TOEIC score and professional English.",
  businessContextVi: "Câu hỏi dạng từ kiểm tra từ vựng dùng trong viết văn phòng: báo cáo, email, hợp đồng, thuyết trình. Thành thạo giúp cải thiện cả điểm TOEIC và tiếng Anh chuyên nghiệp.",
  proSpeedTip: "For word form questions, you should spend MAX 10 seconds: 3 sec to identify the type, 5 sec to check position, 2 sec to mark. Save time for Part 7!",
  proSpeedTipVi: "Câu hỏi dạng từ nên dành TỐI ĐA 10 giây: 3 giây nhận loại, 5 giây kiểm vị trí, 2 giây đánh dấu. Dành thời gian cho Part 7!",
  vocabHighlights: [
    { word: "significant / significance / significantly", definition: "important / importance / in an important way", definitionVi: "quan trọng / tầm quan trọng / một cách quan trọng", example: "Revenue increased significantly.", businessContext: "Reports & analysis" },
    { word: "comply / compliance / compliant", definition: "to follow rules / following rules / following rules (adj)", definitionVi: "tuân thủ / sự tuân thủ / tuân thủ (tt)", example: "All branches must be compliant with regulations.", businessContext: "Legal & regulatory" },
  ],
  quiz: [
    { question: "If all 4 options are forms of the same word, it's a ___ question.", options: ["Vocabulary", "Word form", "Grammar", "Reading comprehension"], answer: 1, explanation: "Same root word + different suffixes = word form question. Use position rules." },
    { question: "Article + ___ → what part of speech?", options: ["Verb", "Adverb", "Noun", "Adjective"], answer: 2, explanation: "'The ___' or 'a ___' always requires a NOUN (or adjective + noun)." },
    { question: "After a verb, you usually need a(n):", options: ["Noun", "Adjective", "Adverb", "Article"], answer: 2, explanation: "Adverbs modify verbs: 'worked efficiently', 'completed promptly'." },
    { question: "Which suffix indicates a NOUN?", options: ["-ly", "-ous", "-tion", "-ful"], answer: 2, explanation: "-tion (implementation), -ment (management), -ness (effectiveness), -ity (productivity) = noun suffixes." },
  ],
  cheatSheetPoints: [
    "Look at OPTIONS first — same root word = word form question",
    "Article/Adj + ___ = NOUN | ___ + Noun = ADJECTIVE",
    "___ + Adj/Verb = ADVERB | Subject + ___ = VERB",
    "Suffixes: -tion/-ment = noun, -ive/-ful = adj, -ly = adverb",
    "Max 10 seconds per word form question",
  ],
};

// === LESSON 5: Part 5 & 6 - Conjunctions vs Prepositions ===
const part56Conjunctions: ToeicLecture = {
  id: "toeic-part56-conjunctions",
  title: "Mastering Conjunctions vs. Prepositions",
  titleVi: "Phân biệt Liên từ và Giới từ",
  category: "grammar",
  parts: ["Part 5", "Part 6"],
  icon: "🔗",
  duration: "22 min",
  level: "intermediate",
  targetScore: "600+",
  description: "The definitive guide to choosing between conjunctions and prepositions — one of the most tested grammar points in TOEIC.",
  descriptionVi: "Hướng dẫn toàn diện để phân biệt liên từ và giới từ — một trong những điểm ngữ pháp được kiểm tra nhiều nhất trong TOEIC.",
  trapAlerts: [
    {
      trap: "'Despite' vs 'Although' — both mean contrast but different grammar",
      trapVi: "'Despite' vs 'Although' — cả hai đều nghĩa tương phản nhưng ngữ pháp khác",
      why: "Despite + NOUN/V-ing | Although + S + V. Wrong structure = wrong answer.",
      whyVi: "Despite + DANH TỪ/V-ing | Although + S + V. Sai cấu trúc = sai đáp án."
    },
    {
      trap: "'Because' vs 'Because of' — students always confuse these",
      trapVi: "'Because' vs 'Because of' — học sinh luôn nhầm hai cái này",
      why: "Because + clause (S+V) | Because of + noun phrase. Check what follows the blank!",
      whyVi: "Because + mệnh đề (S+V) | Because of + cụm danh từ. Kiểm tra cái gì theo sau chỗ trống!"
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Check What Follows the Blank",
      titleVi: "Kiểm tra cái gì SAU chỗ trống",
      description: "Subject + Verb after blank → CONJUNCTION (although, because, while, if). Noun/V-ing after blank → PREPOSITION (despite, because of, during).",
      descriptionVi: "Chủ ngữ + Động từ sau chỗ trống → LIÊN TỪ (although, because, while, if). Danh từ/V-ing sau chỗ trống → GIỚI TỪ (despite, because of, during).",
      example: "___ the heavy rain, the event continued. → 'the heavy rain' = noun phrase → DESPITE",
    },
    {
      step: 2,
      title: "Memorize the Key Pairs",
      titleVi: "Ghi nhớ các cặp quan trọng",
      description: "Although ↔ Despite | Because ↔ Because of | While ↔ During | Even though ↔ In spite of",
      descriptionVi: "Although ↔ Despite | Because ↔ Because of | While ↔ During | Even though ↔ In spite of",
    },
    {
      step: 3,
      title: "The 'Sentence or Phrase?' Test",
      titleVi: "Bài test 'Mệnh đề hay Cụm từ?'",
      description: "Does the part after the blank have its own SUBJECT and VERB? YES → conjunction. NO → preposition.",
      descriptionVi: "Phần sau chỗ trống có CHỦ NGỮ và ĐỘNG TỪ riêng không? CÓ → liên từ. KHÔNG → giới từ.",
    },
  ],
  practiceSet: [
    {
      context: "Part 5 sentence completion",
      contextVi: "Hoàn thành câu Part 5",
      question: "___ the bad weather, the outdoor event was well attended.",
      options: ["Although", "Despite", "Because", "While"],
      answer: 1,
      explanation: "'the bad weather' is a NOUN PHRASE (no subject+verb). → Need PREPOSITION → 'Despite'.",
      explanationVi: "'the bad weather' là CỤM DANH TỪ (không có chủ ngữ+động từ). → Cần GIỚI TỪ → 'Despite'.",
    },
    {
      context: "Part 5 sentence completion",
      contextVi: "Hoàn thành câu Part 5",
      question: "___ the CEO was traveling, the VP chaired the meeting.",
      options: ["During", "Despite", "While", "Because of"],
      answer: 2,
      explanation: "'the CEO was traveling' has S+V → Need CONJUNCTION → 'While'.",
      explanationVi: "'the CEO was traveling' có S+V → Cần LIÊN TỪ → 'While'.",
    },
    {
      context: "Part 6 text completion",
      contextVi: "Hoàn thành đoạn văn Part 6",
      question: "The project was delayed ___ unexpected supply chain issues.",
      options: ["because", "although", "due to", "even though"],
      answer: 2,
      explanation: "'unexpected supply chain issues' = noun phrase → preposition needed → 'due to'.",
      explanationVi: "'unexpected supply chain issues' = cụm danh từ → cần giới từ → 'due to'.",
    },
  ],
  businessContext: "Conjunctions and prepositions are essential in business writing: contracts ('In the event that...'), reports ('Due to increased demand...'), and emails ('Although we appreciate your interest...').",
  businessContextVi: "Liên từ và giới từ thiết yếu trong viết văn phòng: hợp đồng ('Trong trường hợp...'), báo cáo ('Do nhu cầu tăng...'), email ('Mặc dù chúng tôi trân trọng...').",
  proSpeedTip: "Don't read the whole sentence. Just look at what comes AFTER the blank: S+V = conjunction, Noun = preposition. 5 seconds max!",
  proSpeedTipVi: "Không cần đọc cả câu. Chỉ nhìn SAU chỗ trống: S+V = liên từ, Danh từ = giới từ. Tối đa 5 giây!",
  vocabHighlights: [
    { word: "notwithstanding", definition: "despite, in spite of (formal)", definitionVi: "bất chấp, mặc dù (trang trọng)", example: "Notwithstanding the risks, the company proceeded.", businessContext: "Legal/formal documents" },
    { word: "provided that", definition: "on condition that, if", definitionVi: "với điều kiện là, nếu", example: "The deal will proceed provided that terms are met.", businessContext: "Contracts & agreements" },
  ],
  quiz: [
    { question: "After a PREPOSITION, you need:", options: ["Subject + Verb", "A noun or V-ing", "An adjective", "Another preposition"], answer: 1, explanation: "Prepositions are followed by nouns or gerunds (V-ing): 'Despite the delay', 'Before leaving'." },
    { question: "'Although' requires what after it?", options: ["A noun phrase", "A full clause (S+V)", "An adjective", "A preposition"], answer: 1, explanation: "'Although' is a conjunction and must be followed by a subject + verb." },
    { question: "'___ the meeting, please turn off your phones.' → Answer?", options: ["While", "During", "Although", "Because"], answer: 1, explanation: "'the meeting' is a noun phrase → need preposition → 'During'." },
  ],
  cheatSheetPoints: [
    "S+V after blank = CONJUNCTION (although, because, while)",
    "Noun/V-ing after blank = PREPOSITION (despite, due to, during)",
    "Key pairs: Although↔Despite, Because↔Because of, While↔During",
    "5 seconds max — just check what follows the blank",
    "Formal: notwithstanding, provided that, in the event that",
  ],
};

// === LESSON 6: Part 7 - Skimming Business Emails ===
const part7Skimming: ToeicLecture = {
  id: "toeic-part7-skimming",
  title: "Skimming Business Emails: Finding the Purpose in 10 Seconds",
  titleVi: "Đọc lướt Email: Tìm mục đích trong 10 giây",
  category: "reading",
  parts: ["Part 7"],
  icon: "📧",
  duration: "25 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Master the art of quickly identifying the main purpose, key details, and implied information in TOEIC business emails.",
  descriptionVi: "Làm chủ nghệ thuật nhanh chóng xác định mục đích chính, chi tiết quan trọng và thông tin ngụ ý trong email TOEIC.",
  trapAlerts: [
    {
      trap: "The PURPOSE question — students confuse 'topic' with 'purpose'",
      trapVi: "Câu hỏi MỤC ĐÍCH — học sinh nhầm 'chủ đề' với 'mục đích'",
      why: "'What is the purpose of this email?' asks WHY it was written, not WHAT it's about.",
      whyVi: "'Mục đích email này là gì?' hỏi TẠI SAO viết, không phải NỘI DUNG là gì."
    },
    {
      trap: "Information in the LAST paragraph is often the answer",
      trapVi: "Thông tin ở đoạn CUỐI thường là đáp án",
      why: "Many students only read the first paragraph. TOEIC often places key actions/requests at the end.",
      whyVi: "Nhiều học sinh chỉ đọc đoạn đầu. TOEIC thường đặt hành động/yêu cầu chính ở cuối."
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Read Questions FIRST",
      titleVi: "Đọc câu hỏi TRƯỚC",
      description: "Spend 15 seconds reading ALL questions for this passage. This tells you exactly what to look for.",
      descriptionVi: "Dành 15 giây đọc TẤT CẢ câu hỏi của bài đọc. Điều này cho biết chính xác cần tìm gì.",
    },
    {
      step: 2,
      title: "The 'SOFA' Method for Emails",
      titleVi: "Phương pháp 'SOFA' cho Email",
      description: "S = Sender (who?), O = Opening line (why?), F = Facts/details (what?), A = Action requested (do what?).",
      descriptionVi: "S = Sender (ai gửi?), O = Opening line (tại sao?), F = Facts/chi tiết (cái gì?), A = Action requested (yêu cầu gì?).",
    },
    {
      step: 3,
      title: "Scan for Signal Words",
      titleVi: "Quét tìm từ tín hiệu",
      description: "Purpose signals: 'I am writing to...', 'Please be advised that...', 'We would like to inform you...'. These reveal the email's purpose instantly.",
      descriptionVi: "Tín hiệu mục đích: 'I am writing to...', 'Please be advised...', 'We would like to inform...'. Chúng tiết lộ mục đích email ngay lập tức.",
      example: "'I am writing to inquire about...' → Purpose: To ask for information",
    },
  ],
  practiceSet: [
    {
      context: "Email from HR department to all employees about a new parking policy",
      contextVi: "Email từ phòng Nhân sự gửi toàn bộ nhân viên về chính sách đỗ xe mới",
      question: "What is the purpose of this email?",
      options: ["To announce a new parking policy", "To complain about parking", "To request a meeting", "To introduce a new employee"],
      answer: 0,
      explanation: "HR → all employees + new policy = announcement purpose.",
      explanationVi: "HR → toàn nhân viên + chính sách mới = mục đích thông báo.",
    },
    {
      context: "Email from a supplier confirming an order shipment date",
      contextVi: "Email từ nhà cung cấp xác nhận ngày giao hàng",
      question: "What is the email mainly about?",
      options: ["A price negotiation", "A shipment confirmation", "A product complaint", "A meeting request"],
      answer: 1,
      explanation: "Supplier + confirming + shipment date = shipment confirmation.",
      explanationVi: "Nhà cung cấp + xác nhận + ngày giao = xác nhận giao hàng.",
    },
  ],
  businessContext: "Email reading is the most practical TOEIC skill. In real offices, you'll read 50+ emails daily — quickly identifying purpose, action items, and deadlines is essential for productivity.",
  businessContextVi: "Đọc email là kỹ năng TOEIC thực tế nhất. Trong văn phòng thực, bạn đọc 50+ email/ngày — nhanh chóng xác định mục đích, việc cần làm và deadline là thiết yếu.",
  proSpeedTip: "For 'purpose' questions: ONLY read the first sentence of the email. 90% of the time, it contains 'I am writing to...' or 'This is to inform you that...'.",
  proSpeedTipVi: "Câu hỏi 'mục đích': CHỈ đọc câu đầu tiên email. 90% trường hợp có 'I am writing to...' hoặc 'This is to inform you that...'.",
  vocabHighlights: [
    { word: "regarding", definition: "about, concerning", definitionVi: "về, liên quan đến", example: "I am writing regarding your recent order.", businessContext: "Email openings" },
    { word: "enclosed/attached", definition: "included with this message", definitionVi: "đính kèm", example: "Please find enclosed the contract for your review.", businessContext: "Document sharing" },
    { word: "at your earliest convenience", definition: "as soon as you can", definitionVi: "sớm nhất khi thuận tiện", example: "Please respond at your earliest convenience.", businessContext: "Polite requests" },
  ],
  quiz: [
    { question: "The SOFA method stands for:", options: ["Send, Open, Find, Ask", "Sender, Opening, Facts, Action", "Start, Organize, Finish, Answer", "Scan, Observe, Focus, Analyze"], answer: 1, explanation: "SOFA = Sender, Opening line, Facts/details, Action requested." },
    { question: "'What is the purpose of this email?' asks:", options: ["What the email is about", "WHY the email was written", "Who wrote it", "When it was sent"], answer: 1, explanation: "'Purpose' = WHY it was written (to inform, to request, to complain, etc.)." },
    { question: "Where do you usually find the email's purpose?", options: ["Subject line only", "Last paragraph", "First sentence/opening line", "Signature block"], answer: 2, explanation: "The opening line usually states: 'I am writing to...' or 'This email is to inform you...'." },
  ],
  cheatSheetPoints: [
    "Read QUESTIONS before the passage",
    "SOFA: Sender + Opening + Facts + Action",
    "Purpose = WHY written (not what it's about)",
    "First sentence reveals purpose 90% of the time",
    "Check LAST paragraph for action items/deadlines",
  ],
};

// === LESSON 7: Part 7 - Double/Triple Passages ===
const part7DoubleTriple: ToeicLecture = {
  id: "toeic-part7-double-triple",
  title: "The Connection Strategy: Linking Information Between Texts",
  titleVi: "Chiến lược kết nối: Liên kết thông tin giữa các bài đọc",
  category: "reading",
  parts: ["Part 7"],
  icon: "🔀",
  duration: "30 min",
  level: "advanced",
  targetScore: "750+",
  description: "Conquer the most challenging TOEIC question type: finding connections between two or three related passages.",
  descriptionVi: "Chinh phục dạng câu hỏi TOEIC khó nhất: tìm liên kết giữa hai hoặc ba bài đọc liên quan.",
  trapAlerts: [
    {
      trap: "Answer appears in only ONE passage but the question requires BOTH",
      trapVi: "Đáp án chỉ xuất hiện ở MỘT bài nhưng câu hỏi yêu cầu CẢ HAI",
      why: "Cross-reference questions require combining information from multiple texts to arrive at the correct answer.",
      whyVi: "Câu hỏi tham chiếu chéo yêu cầu kết hợp thông tin từ nhiều bài để tìm đáp án đúng."
    },
    {
      trap: "Information that CONTRADICTS between passages",
      trapVi: "Thông tin MÂU THUẪN giữa các bài",
      why: "One text may state a price/date, and another may show it's changed. The UPDATED information is usually the answer.",
      whyVi: "Một bài có thể nêu giá/ngày, bài khác cho thấy đã thay đổi. Thông tin CẬP NHẬT thường là đáp án."
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Identify the Relationship Between Texts",
      titleVi: "Xác định mối quan hệ giữa các bài",
      description: "Common pairs: Email + Reply, Ad + Order Form, Article + Comment, Notice + Schedule. Knowing the relationship helps you predict questions.",
      descriptionVi: "Các cặp phổ biến: Email + Trả lời, Quảng cáo + Đơn đặt hàng, Bài viết + Bình luận, Thông báo + Lịch trình.",
    },
    {
      step: 2,
      title: "Answer Single-Passage Questions First",
      titleVi: "Trả lời câu hỏi 1 bài đọc TRƯỚC",
      description: "In a set of 5 questions, usually 3 can be answered from a single text. Do these FIRST, then tackle cross-reference questions.",
      descriptionVi: "Trong 5 câu hỏi, thường 3 câu trả lời được từ 1 bài. Làm chúng TRƯỚC, rồi mới đến câu tham chiếu chéo.",
    },
    {
      step: 3,
      title: "Use Names, Dates, Numbers as Bridges",
      titleVi: "Dùng Tên, Ngày, Số làm cầu nối",
      description: "Cross-reference clues: A person's name appears in both texts, a date matches, a product code links an ad to an order.",
      descriptionVi: "Manh mối tham chiếu chéo: Tên người xuất hiện ở cả hai bài, ngày khớp nhau, mã sản phẩm nối quảng cáo với đơn hàng.",
      example: "Text 1: 'Ms. Park ordered item #A204' + Text 2: Price list shows A204 = $85 → Ms. Park paid $85",
    },
  ],
  practiceSet: [
    {
      context: "Text 1: Job advertisement for a Marketing Manager. Text 2: Application email from a candidate.",
      contextVi: "Bài 1: Quảng cáo tuyển dụng Marketing Manager. Bài 2: Email ứng tuyển từ ứng viên.",
      question: "What qualification does the candidate have that matches the job requirements?",
      options: ["5 years of marketing experience", "A degree in computer science", "Fluency in Japanese", "A previous job at the same company"],
      answer: 0,
      explanation: "Cross-reference: Job ad requires '5+ years marketing experience' + Candidate's email mentions '6 years in digital marketing'.",
      explanationVi: "Tham chiếu chéo: Quảng cáo yêu cầu '5+ năm kinh nghiệm marketing' + Email ứng viên đề cập '6 năm digital marketing'.",
    },
  ],
  businessContext: "Double/triple passages mirror real business reading: matching purchase orders to invoices, comparing job requirements to résumés, cross-referencing schedules with meeting agendas.",
  businessContextVi: "Bài đọc đôi/ba mô phỏng đọc hiểu kinh doanh thực tế: đối chiếu đơn hàng với hóa đơn, so sánh yêu cầu tuyển dụng với CV, tham chiếu lịch trình với chương trình họp.",
  proSpeedTip: "For cross-reference questions, use your finger/pen to physically point at Text 1 detail, then scan Text 2 for the matching information. This prevents re-reading.",
  proSpeedTipVi: "Câu hỏi tham chiếu chéo: dùng ngón tay/bút CHỈ vào chi tiết Bài 1, rồi quét Bài 2 tìm thông tin khớp. Tránh đọc lại.",
  vocabHighlights: [
    { word: "cross-reference", definition: "to compare information from two sources", definitionVi: "tham chiếu chéo", example: "Please cross-reference the invoice with the purchase order.", businessContext: "Data verification" },
    { word: "discrepancy", definition: "a difference between two things that should match", definitionVi: "sự khác biệt, sai lệch", example: "There is a discrepancy between the order and the delivery.", businessContext: "Quality control" },
  ],
  quiz: [
    { question: "In a double passage set of 5 questions, how many are usually cross-reference?", options: ["All 5", "Usually 2", "Only 1", "None"], answer: 1, explanation: "Typically 2-3 questions can be answered from a single text, and 2 require cross-referencing." },
    { question: "What's the best 'bridge' between two texts?", options: ["The topic", "Names, dates, and numbers", "The writing style", "The length"], answer: 1, explanation: "Specific details like names, dates, product codes, and numbers link texts together." },
    { question: "When information conflicts between texts, the answer is usually:", options: ["From the first text", "From the second/updated text", "Neither", "Both combined"], answer: 1, explanation: "The second text often contains updated/corrected information (e.g., revised prices, new dates)." },
  ],
  cheatSheetPoints: [
    "Identify text relationship: Email↔Reply, Ad↔Order, etc.",
    "Do single-passage questions FIRST (3 out of 5)",
    "Names + Dates + Numbers = bridges between texts",
    "Updated info in text 2 usually overrides text 1",
    "Point at Text 1, scan Text 2 — prevent re-reading",
  ],
};

// === LESSON 8: Vocabulary - Top 50 Business Verbs ===
const businessVerbs: ToeicLecture = {
  id: "toeic-business-verbs",
  title: "Top 50 Essential Business Verbs",
  titleVi: "50 Động từ Kinh doanh thiết yếu nhất",
  category: "business-vocab",
  parts: ["All Parts"],
  icon: "💼",
  duration: "28 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Master the 50 most frequently tested business verbs in TOEIC, organized by workplace themes: Hiring, Contracts, and Shipping.",
  descriptionVi: "Làm chủ 50 động từ kinh doanh xuất hiện nhiều nhất trong TOEIC, theo chủ đề: Tuyển dụng, Hợp đồng, Giao hàng.",
  trapAlerts: [
    {
      trap: "'Resign' vs 'Re-sign' — completely opposite meanings!",
      trapVi: "'Resign' vs 'Re-sign' — nghĩa hoàn toàn ngược nhau!",
      why: "Resign = quit your job. Re-sign = sign a contract again. One hyphen changes everything.",
      whyVi: "Resign = nghỉ việc. Re-sign = ký lại hợp đồng. Một dấu gạch ngang thay đổi mọi thứ."
    },
    {
      trap: "'Affect' vs 'Effect' — verb vs noun",
      trapVi: "'Affect' vs 'Effect' — động từ vs danh từ",
      why: "Affect (verb) = to influence. Effect (noun) = result. 'The change will affect profits' vs 'The effect of the change'.",
      whyVi: "Affect (động từ) = ảnh hưởng. Effect (danh từ) = kết quả. 'Thay đổi sẽ ảnh hưởng lợi nhuận' vs 'Kết quả của thay đổi'."
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Learn Verbs in Context Groups",
      titleVi: "Học động từ theo nhóm ngữ cảnh",
      description: "Hiring: recruit, interview, hire, train, promote, transfer, resign, retire. Learning in groups creates mental associations.",
      descriptionVi: "Tuyển dụng: tuyển mộ, phỏng vấn, thuê, đào tạo, thăng chức, chuyển, nghỉ việc, về hưu. Học theo nhóm tạo liên kết.",
    },
    {
      step: 2,
      title: "Learn the Collocations",
      titleVi: "Học các kết hợp từ",
      description: "Don't just learn 'submit'. Learn 'submit a proposal', 'submit a report', 'submit an application'. TOEIC tests collocations!",
      descriptionVi: "Không chỉ học 'submit'. Học 'submit a proposal', 'submit a report', 'submit an application'. TOEIC kiểm tra kết hợp từ!",
    },
    {
      step: 3,
      title: "Master Verb + Preposition Pairs",
      titleVi: "Thành thạo cặp Động từ + Giới từ",
      description: "Comply WITH, account FOR, result IN, respond TO, apply FOR, refer TO. Wrong preposition = wrong answer in Part 5.",
      descriptionVi: "Comply WITH, account FOR, result IN, respond TO, apply FOR, refer TO. Sai giới từ = sai đáp án Part 5.",
    },
  ],
  practiceSet: [
    {
      context: "HR email about staffing changes",
      contextVi: "Email Nhân sự về thay đổi nhân sự",
      question: "Ms. Lee has been ___ to the Seoul branch effective next month.",
      options: ["resigned", "transferred", "retired", "recruited"],
      answer: 1,
      explanation: "'Transferred TO [location]' means moved to another branch/office.",
      explanationVi: "'Transferred TO [địa điểm]' nghĩa là chuyển sang chi nhánh/văn phòng khác.",
    },
    {
      context: "Contract negotiation email",
      contextVi: "Email đàm phán hợp đồng",
      question: "Both parties must ___ the terms before the contract takes effect.",
      options: ["comply", "agree to", "submit", "refer"],
      answer: 1,
      explanation: "'Agree to the terms' is the standard collocation for contract negotiations.",
      explanationVi: "'Agree to the terms' là kết hợp chuẩn trong đàm phán hợp đồng.",
    },
    {
      context: "Shipping notification",
      contextVi: "Thông báo giao hàng",
      question: "Your order has been ___ and will arrive within 3 business days.",
      options: ["dispatched", "purchased", "invoiced", "audited"],
      answer: 0,
      explanation: "'Dispatched' means sent out for delivery — the correct shipping verb.",
      explanationVi: "'Dispatched' nghĩa là đã gửi đi — động từ giao hàng chính xác.",
    },
  ],
  businessContext: "These 50 verbs appear in real workplace communication daily: recruitment emails, contract discussions, shipping updates, and performance reviews. Mastering them improves both your score and career English.",
  businessContextVi: "50 động từ này xuất hiện hàng ngày: email tuyển dụng, thảo luận hợp đồng, cập nhật giao hàng, đánh giá hiệu suất. Thành thạo giúp cải thiện điểm và tiếng Anh sự nghiệp.",
  proSpeedTip: "For vocab questions in Part 5: if you know the word's meaning AND its common collocation, you can answer in 5 seconds without reading the full sentence.",
  proSpeedTipVi: "Câu hỏi từ vựng Part 5: nếu biết nghĩa VÀ kết hợp từ phổ biến, trả lời trong 5 giây không cần đọc cả câu.",
  vocabHighlights: [
    { word: "recruit", definition: "to find and hire new employees", definitionVi: "tuyển mộ", example: "We need to recruit three new engineers.", businessContext: "HR / Hiring" },
    { word: "dispatch", definition: "to send out goods for delivery", definitionVi: "gửi đi, phát hàng", example: "Orders are dispatched within 24 hours.", businessContext: "Logistics / Shipping" },
    { word: "negotiate", definition: "to discuss terms to reach agreement", definitionVi: "đàm phán", example: "We are negotiating a new supplier contract.", businessContext: "Contracts / Purchasing" },
    { word: "reimburse", definition: "to pay back money spent", definitionVi: "hoàn trả chi phí", example: "The company will reimburse your travel expenses.", businessContext: "Finance / Accounting" },
    { word: "comply", definition: "to follow rules or regulations", definitionVi: "tuân thủ", example: "All branches must comply with safety regulations.", businessContext: "Legal / Compliance" },
  ],
  quiz: [
    { question: "'Resign' means:", options: ["To sign again", "To quit a job", "To be promoted", "To apply for a position"], answer: 1, explanation: "Resign = quit voluntarily. Re-sign (with hyphen) = sign again." },
    { question: "Which preposition follows 'comply'?", options: ["to", "for", "with", "in"], answer: 2, explanation: "'Comply WITH' regulations/rules — always WITH." },
    { question: "'The order has been dispatched' means:", options: ["The order is cancelled", "The order has been sent for delivery", "The order is being prepared", "The order is delayed"], answer: 1, explanation: "Dispatched = sent out from warehouse for delivery." },
    { question: "Which verb group is about shipping?", options: ["recruit, hire, train", "negotiate, agree, sign", "dispatch, deliver, track", "audit, review, assess"], answer: 2, explanation: "Shipping verbs: dispatch, deliver, track, ship, receive, return." },
  ],
  cheatSheetPoints: [
    "Learn verbs in GROUPS: Hiring, Contracts, Shipping, Finance",
    "Resign ≠ Re-sign | Affect (v) ≠ Effect (n)",
    "Key collocations: submit a proposal, meet a deadline",
    "Verb + Prep: comply WITH, apply FOR, respond TO",
    "Know the verb → answer in 5 seconds",
  ],
  isNew: true,
};

// === LESSON 9: Time Management - The 75-Minute Sprint ===
const timeManagement: ToeicLecture = {
  id: "toeic-time-management",
  title: "The 75-Minute Sprint: Time Distribution for Reading",
  titleVi: "Chạy nước rút 75 phút: Phân bổ thời gian Reading",
  category: "speed-hacks",
  parts: ["Part 5", "Part 6", "Part 7"],
  icon: "⏱️",
  duration: "18 min",
  level: "intermediate",
  targetScore: "600+",
  description: "The optimal time allocation strategy for the 75-minute TOEIC Reading section that maximizes your score.",
  descriptionVi: "Chiến lược phân bổ thời gian tối ưu cho phần Reading 75 phút để tối đa hóa điểm số.",
  trapAlerts: [
    {
      trap: "Spending too much time on Part 5 (30 questions)",
      trapVi: "Dành quá nhiều thời gian cho Part 5 (30 câu)",
      why: "Students average 20 min on Part 5, leaving only 55 min for Parts 6+7 (70 questions!). Part 5 should take MAX 10 minutes.",
      whyVi: "Học sinh trung bình 20 phút cho Part 5, chỉ còn 55 phút cho Part 6+7 (70 câu!). Part 5 nên tối đa 10 phút."
    },
    {
      trap: "Trying to read every word in Part 7 passages",
      trapVi: "Cố đọc từng chữ trong bài đọc Part 7",
      why: "There's not enough time. You must SKIM for answers, not read for comprehension.",
      whyVi: "Không đủ thời gian. Phải ĐỌC LƯỚT tìm đáp án, không phải đọc hiểu từng câu."
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "The Golden Time Split",
      titleVi: "Công thức phân chia vàng",
      description: "Part 5: 10 min (20 sec/question) | Part 6: 10 min (2.5 min/passage) | Part 7: 55 min (single: 3-4 min, double: 5 min, triple: 6-7 min).",
      descriptionVi: "Part 5: 10 phút (20 giây/câu) | Part 6: 10 phút (2,5 phút/đoạn) | Part 7: 55 phút (đơn: 3-4 phút, đôi: 5 phút, ba: 6-7 phút).",
    },
    {
      step: 2,
      title: "The 'Skip and Return' Rule",
      titleVi: "Quy tắc 'Bỏ qua và Quay lại'",
      description: "If ANY question takes more than 30 seconds in Part 5 or 1 minute in Part 7, mark your best guess and MOVE ON. Return only if time remains.",
      descriptionVi: "Nếu BẤT KỲ câu nào mất hơn 30 giây ở Part 5 hoặc 1 phút ở Part 7, đánh dấu đáp án tốt nhất và ĐI TIẾP. Quay lại chỉ nếu còn thời gian.",
    },
    {
      step: 3,
      title: "Reverse Order Strategy (for 750+ target)",
      titleVi: "Chiến lược làm ngược (cho mục tiêu 750+)",
      description: "Advanced: Do Part 7 → Part 6 → Part 5. Part 7 has more points per question and harder questions. Doing it first when fresh gives more points.",
      descriptionVi: "Nâng cao: Làm Part 7 → Part 6 → Part 5. Part 7 có nhiều điểm/câu hơn và câu hỏi khó hơn. Làm đầu khi tỉnh táo cho nhiều điểm hơn.",
    },
  ],
  practiceSet: [
    {
      context: "Time calculation exercise",
      contextVi: "Bài tập tính thời gian",
      question: "If Part 5 takes you 15 minutes, how much time is left for Part 7?",
      options: ["60 minutes", "50 minutes", "55 minutes", "45 minutes"],
      answer: 1,
      explanation: "75 min total - 15 min (Part 5) - 10 min (Part 6) = 50 min for Part 7. That's 5 min less than optimal!",
      explanationVi: "75 phút tổng - 15 phút (Part 5) - 10 phút (Part 6) = 50 phút cho Part 7. Ít hơn tối ưu 5 phút!",
    },
    {
      context: "Pace calculation",
      contextVi: "Tính tốc độ",
      question: "Part 7 has 15 passages and 54 questions. At 55 minutes, how long per passage on average?",
      options: ["2 minutes", "3.5 minutes", "5 minutes", "1 minute"],
      answer: 1,
      explanation: "55 min ÷ 15 passages ≈ 3.5 min/passage average (but singles need less, doubles/triples need more).",
      explanationVi: "55 phút ÷ 15 bài ≈ 3,5 phút/bài trung bình (bài đơn ít hơn, đôi/ba nhiều hơn).",
    },
  ],
  businessContext: "Time management in TOEIC directly mirrors workplace skills: prioritizing tasks, meeting deadlines, and making quick decisions under pressure — all valued by employers.",
  businessContextVi: "Quản lý thời gian TOEIC trực tiếp phản ánh kỹ năng công sở: ưu tiên công việc, hoàn thành deadline, quyết định nhanh dưới áp lực — được nhà tuyển dụng đánh giá cao.",
  proSpeedTip: "Write the TARGET TIME for each section on the first page: Part 5 finish by XX:10, Part 6 finish by XX:20, Part 7 all remaining time. Check your watch at each milestone!",
  proSpeedTipVi: "Ghi THỜI GIAN MỤC TIÊU trên trang đầu: Xong Part 5 lúc XX:10, Part 6 lúc XX:20, Part 7 tất cả thời gian còn lại. Kiểm tra đồng hồ ở mỗi mốc!",
  vocabHighlights: [],
  quiz: [
    { question: "How much time should Part 5 take (30 questions)?", options: ["20 minutes", "15 minutes", "10 minutes", "5 minutes"], answer: 2, explanation: "10 minutes = 20 seconds per question. Fast enough to save time for Part 7." },
    { question: "If a Part 5 question takes more than 30 seconds, you should:", options: ["Keep trying", "Skip it entirely", "Mark best guess and move on", "Ask the proctor"], answer: 2, explanation: "Mark your best guess and return later if time permits. Don't get stuck!" },
    { question: "The 'Reverse Order Strategy' means:", options: ["Answer in random order", "Do Part 7 first, then Part 6, then Part 5", "Start from the last question", "Skip all difficult questions"], answer: 1, explanation: "Doing Part 7 first ensures you tackle the highest-value questions while mentally fresh." },
  ],
  cheatSheetPoints: [
    "Part 5: 10 min | Part 6: 10 min | Part 7: 55 min",
    "Max 20 sec/question in Part 5, skip if stuck",
    "Part 7: single 3-4 min, double 5 min, triple 6-7 min",
    "Advanced: try Part 7 → Part 6 → Part 5 order",
    "Write target times on your paper before starting",
  ],
};

// === LESSON 10: Exam Hack - Paraphrasing Secrets ===
const paraphrasingSecrets: ToeicLecture = {
  id: "toeic-paraphrasing-secrets",
  title: "Paraphrasing Secrets: How TOEIC Hides Answers with Synonyms",
  titleVi: "Bí quyết Paraphrasing: Cách TOEIC giấu đáp án bằng từ đồng nghĩa",
  category: "speed-hacks",
  parts: ["All Parts"],
  icon: "🔍",
  duration: "25 min",
  level: "advanced",
  targetScore: "750+",
  description: "Uncover the #1 technique ETS uses to make questions difficult: paraphrasing. Learn to spot synonyms and restated ideas instantly.",
  descriptionVi: "Khám phá kỹ thuật #1 ETS dùng để tăng độ khó: paraphrasing. Học cách nhận diện từ đồng nghĩa và ý diễn đạt lại ngay lập tức.",
  trapAlerts: [
    {
      trap: "The correct answer NEVER uses the exact same words as the passage",
      trapVi: "Đáp án đúng KHÔNG BAO GIỜ dùng đúng từ như bài đọc",
      why: "If you find the exact phrase from the passage in an answer choice, it's usually a TRAP. The correct answer paraphrases.",
      whyVi: "Nếu tìm thấy cụm từ giống hệt bài đọc trong đáp án, thường đó là BẪY. Đáp án đúng diễn đạt lại."
    },
    {
      trap: "Opposite meaning words disguised as synonyms",
      trapVi: "Từ nghĩa ngược giả dạng từ đồng nghĩa",
      why: "'Increase' vs 'Decrease', 'Accept' vs 'Except' — one letter difference, opposite meaning.",
      whyVi: "'Tăng' vs 'Giảm', 'Chấp nhận' vs 'Ngoại trừ' — khác một chữ, nghĩa ngược."
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Learn the Top 30 TOEIC Synonym Pairs",
      titleVi: "Học 30 cặp đồng nghĩa TOEIC phổ biến nhất",
      description: "purchase = buy | prior to = before | adjacent to = next to | additional = extra | mandatory = required | complimentary = free",
      descriptionVi: "purchase = mua | prior to = trước | adjacent to = bên cạnh | additional = thêm | mandatory = bắt buộc | complimentary = miễn phí",
    },
    {
      step: 2,
      title: "Recognize Structural Paraphrasing",
      titleVi: "Nhận diện Paraphrasing cấu trúc",
      description: "Active → Passive: 'The manager approved it' → 'It was approved by the manager'. Same meaning, different structure.",
      descriptionVi: "Chủ động → Bị động: 'Quản lý phê duyệt' → 'Được quản lý phê duyệt'. Cùng nghĩa, khác cấu trúc.",
      example: "Passage: 'Employees should arrive by 9 AM.' Answer: 'Staff are expected to be present before nine o'clock.'",
    },
    {
      step: 3,
      title: "The '3 Levels of Paraphrasing' Framework",
      titleVi: "Khung '3 cấp độ Paraphrasing'",
      description: "Level 1: Synonym swap (buy→purchase). Level 2: Structure change (active→passive). Level 3: Complete rewording (keeping only the concept).",
      descriptionVi: "Cấp 1: Thay từ đồng nghĩa (mua→purchase). Cấp 2: Đổi cấu trúc (chủ động→bị động). Cấp 3: Viết lại hoàn toàn (giữ ý).",
    },
  ],
  practiceSet: [
    {
      context: "Reading passage states: 'All visitors must register at the front desk upon arrival.'",
      contextVi: "Bài đọc: 'Tất cả khách phải đăng ký tại quầy lễ tân khi đến.'",
      question: "According to the passage, what should visitors do?",
      options: [
        "Register at the front desk when they arrive.",
        "Sign in at the reception area before entering.",
        "Show their ID to security.",
        "Call the receptionist beforehand.",
      ],
      answer: 1,
      explanation: "'Sign in at the reception area before entering' = paraphrase of 'register at the front desk upon arrival'. Option A uses exact words = usually a trap in real TOEIC.",
      explanationVi: "'Đăng ký ở quầy tiếp tân trước khi vào' = diễn đạt lại 'đăng ký tại quầy lễ tân khi đến'. Lựa chọn A dùng đúng từ = thường là bẫy trong TOEIC thật.",
    },
    {
      context: "Listening: 'The meeting has been postponed until next week due to the director's absence.'",
      contextVi: "Nghe: 'Cuộc họp đã hoãn đến tuần sau vì giám đốc vắng mặt.'",
      question: "What happened to the meeting?",
      options: [
        "It was cancelled permanently.",
        "It was rescheduled for a later date.",
        "It started early.",
        "It was moved to a different room.",
      ],
      answer: 1,
      explanation: "'Rescheduled for a later date' = paraphrase of 'postponed until next week'. Not cancelled, just delayed.",
      explanationVi: "'Lên lịch lại cho ngày muộn hơn' = diễn đạt lại 'hoãn đến tuần sau'. Không hủy, chỉ trì hoãn.",
    },
  ],
  businessContext: "Paraphrasing is the foundation of professional communication: summarizing meetings, writing executive briefs, and restating client requirements. It's tested in TOEIC because it's used daily in business.",
  businessContextVi: "Paraphrasing là nền tảng giao tiếp chuyên nghiệp: tóm tắt cuộc họp, viết báo cáo điều hành, diễn đạt lại yêu cầu khách hàng. TOEIC kiểm tra vì dùng hàng ngày trong kinh doanh.",
  proSpeedTip: "When stuck between 2 answers, eliminate the one that uses EXACT WORDS from the passage. The paraphrased version is almost always correct.",
  proSpeedTipVi: "Khi phân vân giữa 2 đáp án, loại cái dùng ĐÚNG TỪ từ bài đọc. Bản diễn đạt lại gần như luôn đúng.",
  vocabHighlights: [
    { word: "purchase → buy", definition: "Both mean 'to acquire by payment'", definitionVi: "Cả hai nghĩa 'mua'", example: "Employees may purchase supplies online.", businessContext: "Procurement" },
    { word: "mandatory → required", definition: "Both mean 'must be done'", definitionVi: "Cả hai nghĩa 'bắt buộc'", example: "Attendance at the training is mandatory.", businessContext: "Company policies" },
    { word: "complimentary → free", definition: "Both mean 'no charge'", definitionVi: "Cả hai nghĩa 'miễn phí'", example: "Complimentary breakfast is included.", businessContext: "Hotels & events" },
    { word: "prior to → before", definition: "Both mean 'earlier than'", definitionVi: "Cả hai nghĩa 'trước khi'", example: "Submit forms prior to the deadline.", businessContext: "Scheduling" },
  ],
  quiz: [
    { question: "If an answer uses the EXACT same words as the passage, it's usually:", options: ["Correct", "A trap / distractor", "The best choice", "Partially correct"], answer: 1, explanation: "TOEIC correct answers paraphrase the passage. Exact word matches are usually traps." },
    { question: "'Mandatory' is a synonym of:", options: ["Optional", "Required", "Preferred", "Suggested"], answer: 1, explanation: "Mandatory = required = must be done. Not optional or preferred." },
    { question: "Level 2 paraphrasing involves:", options: ["Synonym swapping", "Structural changes (active↔passive)", "Adding new information", "Translating to another language"], answer: 1, explanation: "Level 2 = changing sentence structure while keeping meaning: active↔passive, noun↔verb forms." },
    { question: "'Postpone' can be paraphrased as:", options: ["Cancel", "Reschedule for later", "Start early", "Approve"], answer: 1, explanation: "Postpone = delay = reschedule for a later time. NOT cancel." },
  ],
  cheatSheetPoints: [
    "Correct answer = PARAPHRASED version, not exact words",
    "Exact word match from passage = usually a TRAP",
    "Top pairs: purchase↔buy, mandatory↔required, prior to↔before",
    "3 levels: synonym swap → structure change → complete reword",
    "When stuck: eliminate the answer using exact passage words",
  ],
  isNew: true,
};

// Export all TOEIC lectures
export const allToeicLectures: ToeicLecture[] = [
  part1Photos,
  part2Strategy,
  part34Graphic,
  part5Grammar,
  part56Conjunctions,
  part7Skimming,
  part7DoubleTriple,
  businessVerbs,
  timeManagement,
  paraphrasingSecrets,
];

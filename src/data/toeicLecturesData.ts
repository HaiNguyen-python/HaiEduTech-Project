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
      trap: "Similar-sounding words like 'copy' vs 'coffee', 'desk' vs 'disk'",
      trapVi: "Từ gần âm như 'copy' vs 'coffee', 'desk' vs 'disk'",
      why: "ETS uses words that SOUND similar to objects in the photo to trick you into choosing the wrong answer.",
      whyVi: "ETS dùng từ PHÁT ÂM giống đồ vật trong hình để đánh lừa bạn chọn sai."
    },
    {
      trap: "Correct object, wrong action - e.g., 'The woman is HOLDING a phone' vs 'TALKING on a phone'",
      trapVi: "Đúng đồ vật, sai hành động - vd: 'CẦM điện thoại' vs 'ĐANG NÓI điện thoại'",
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
      description: "'A man is loading boxes' (active) vs 'Boxes are being loaded' (passive). Both can be correct - check if the AGENT matches.",
      descriptionVi: "'Người đàn ông đang xếp hộp' (chủ động) vs 'Hộp đang được xếp' (bị động). Cả hai đều có thể đúng - kiểm tra CHỦ THỂ.",
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
  proSpeedTip: "Mark your answer AS SOON as you're sure - don't wait for all 4 options. Use the remaining time to pre-scan the NEXT photo.",
  proSpeedTipVi: "Đánh dấu đáp án NGAY khi chắc chắn - đừng chờ nghe hết 4 lựa chọn. Dùng thời gian còn lại để quét hình TIẾP THEO.",
  vocabHighlights: [
    { word: "adjacent to", definition: "next to, beside", definitionVi: "bên cạnh, kề bên", example: "The printer is adjacent to the filing cabinet.", businessContext: "Office layout descriptions" },
    { word: "pedestrian", definition: "a person walking", definitionVi: "người đi bộ", example: "Pedestrians are crossing the street.", businessContext: "Urban/outdoor photos" },
    { word: "merchandise", definition: "goods for sale", definitionVi: "hàng hóa", example: "Merchandise is displayed on shelves.", businessContext: "Retail store scenes" },
    { word: "stack", definition: "a pile of items", definitionVi: "chồng, đống", example: "A stack of boxes is in the warehouse.", businessContext: "Warehouse/storage" },
  ],
  quiz: [
    { question: "What should you do BEFORE the audio plays in Part 1?", options: ["Close your eyes and focus", "Pre-scan the photo for WHO, WHAT, WHERE, ACTION", "Read the next question", "Write notes"], answer: 1, explanation: "Pre-scanning gives you a mental framework to evaluate each description." },
    { question: "Which is the most common trap in Part 1?", options: ["Speaking too fast", "Using similar-sounding words", "Complex grammar", "Long sentences"], answer: 1, explanation: "ETS frequently uses words that sound like objects in the photo." },
    { question: "'Boxes are being loaded onto a truck' - this is:", options: ["Active voice", "Passive voice", "Past tense", "Future tense"], answer: 1, explanation: "'are being loaded' is present continuous passive." },
    { question: "If no people are in the photo, you should eliminate options that:", options: ["Describe weather", "Mention a person doing an action", "Describe objects", "Use passive voice"], answer: 1, explanation: "No people = no human actions. Eliminate 'A man is...' or 'Workers are...'." },
  ],
  cheatSheetPoints: [
    "Pre-scan: WHO + WHAT + WHERE + ACTION before audio",
    "Focus on the VERB - it decides the answer",
    "No people in photo = eliminate all human-action answers",
    "Similar-sound trap: copy ≠ coffee, desk ≠ disk",
    "Don't infer - only describe what you SEE",
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
      why: "Repeated words are not proof of a wrong answer. Check whether the response addresses the question's intention. 'Where is the printer?' → 'The printer is beside the window' is correct despite repetition; 'It prints quickly' does not answer the location question.",
      whyVi: "Từ lặp không chứng minh đáp án sai. Kiểm tra câu đáp có trả lời đúng ý hỏi không. 'Máy in ở đâu?' → 'Máy in cạnh cửa sổ' vẫn đúng dù lặp từ; 'Máy in rất nhanh' không trả lời nơi chốn."
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
      description: "Use the opening to predict the information needed: Where → place, When → time, Who → person, Why → reason. Listen to the whole question: How many asks quantity, How long asks duration, and How often asks frequency. Indirect replies can also be appropriate.",
      descriptionVi: "Dùng phần đầu để dự đoán thông tin cần tìm: Where → nơi chốn, When → thời gian, Who → người, Why → lý do. Nghe hết câu: How many hỏi số lượng, How long hỏi thời lượng, How often hỏi tần suất. Câu đáp gián tiếp vẫn có thể phù hợp.",
      example: "'Where is the meeting room?' → 'On the third floor' is direct; 'Ask the receptionist' is an appropriate indirect reply.",
    },
    {
      step: 2,
      title: "Identify Yes/No vs Wh-Questions",
      titleVi: "Phân biệt Yes/No vs Wh-Question",
      description: "Auxiliaries can introduce yes/no questions, but identify the intention too: 'Can you send the file?' is usually a request. Both direct replies ('Yes, I can') and relevant indirect replies ('I sent it this morning') may be valid.",
      descriptionVi: "Trợ động từ có thể mở câu hỏi Yes/No, nhưng cần nhận ra ý định: 'Can you send the file?' thường là lời yêu cầu. Câu trực tiếp ('Có, tôi gửi được') và câu gián tiếp phù hợp ('Tôi gửi sáng nay rồi') đều có thể đúng.",
    },
    {
      step: 3,
      title: "Watch for Tag Questions & Offers",
      titleVi: "Chú ý Tag Questions & Lời đề nghị",
      description: "Tag questions seek confirmation; offers invite acceptance or refusal. Relevant corrections, explanations or alternatives can also answer them: 'Would you like coffee?' → 'Tea would be better, thanks.'",
      descriptionVi: "Câu hỏi đuôi xin xác nhận; lời mời cho phép nhận hoặc từ chối. Câu sửa thông tin, giải thích hay đề xuất khác cũng phù hợp: 'Bạn uống cà phê không?' → 'Cho tôi trà thì tốt hơn, cảm ơn.'",
    },
  ],
  practiceSet: [
    {
      context: "Office conversation",
      contextVi: "Hội thoại văn phòng",
      question: "WHERE is the new printer located?",
      options: ["It was delivered yesterday.", "On the third floor, near the elevator.", "It prints very quickly."],
      answer: 1,
      explanation: "Among these options, 'On the third floor, near the elevator' answers where the printer is. A gives delivery time, while C describes speed. Other questions may allow an indirect reply.",
      explanationVi: "Trong ba lựa chọn này, 'Tầng 3, gần thang máy' trả lời vị trí máy in. A nói thời điểm giao, C nói tốc độ. Ở câu khác, đáp gián tiếp có thể đúng.",
    },
    {
      context: "Business meeting",
      contextVi: "Cuộc họp kinh doanh",
      question: "WHEN will the contract be finalized?",
      options: ["The legal department is on the second floor.", "By the end of this week.", "It's a very important contract."],
      answer: 1,
      explanation: "'By the end of this week' gives the requested deadline. A gives a department's location and C describes importance; neither says when the contract will be finalized.",
      explanationVi: "'Chậm nhất cuối tuần này' nêu hạn hoàn tất. A nói vị trí phòng pháp lý, C nói mức quan trọng; cả hai không trả lời khi nào hợp đồng hoàn tất.",
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
  businessContext: "Part 2 simulates real office conversations: asking for directions, scheduling meetings, making requests, and discussing deadlines - all essential workplace communication skills.",
  businessContextVi: "Part 2 mô phỏng hội thoại văn phòng: hỏi đường, xếp lịch, yêu cầu, thảo luận deadline - đều là kỹ năng giao tiếp công sở thiết yếu.",
  proSpeedTip: "If you miss the opening, use the remaining words to identify the topic and intention. Compare all three responses for relevance; never eliminate a response solely because it repeats a word.",
  proSpeedTipVi: "Nếu bỏ lỡ phần đầu, dùng các từ còn lại để xác định chủ đề và ý định. So sánh cả ba câu đáp theo mức phù hợp; không loại chỉ vì lặp từ.",
  vocabHighlights: [
    { word: "finalize", definition: "to complete, to make final", definitionVi: "hoàn tất, chốt", example: "We need to finalize the agreement by Friday.", businessContext: "Contracts & deals" },
    { word: "reschedule", definition: "to change the time of a meeting", definitionVi: "đổi lịch", example: "Can we reschedule the appointment to next Monday?", businessContext: "Calendar management" },
    { word: "forward", definition: "to send to another person", definitionVi: "chuyển tiếp", example: "Please forward the email to the team.", businessContext: "Email communication" },
  ],
  quiz: [
    { question: "What's the MOST important thing to listen for in Part 2?", options: ["The last word", "The first word (question word)", "The speaker's tone", "Background noise"], answer: 1, explanation: "The first word (Where/When/Who/What/Why/How) determines the answer type." },
    { question: "How should you evaluate a response that repeats a question word?", options: ["Always accept it", "Check whether it answers the intention", "Always reject it", "Choose it if it is longest"], answer: 1, explanation: "Repetition alone tells you nothing decisive. Correct replies can repeat words; distractors fail because their meaning does not fit." },
    { question: "'Could you help me with this report?' is a:", options: ["Wh-question", "Yes/No question", "Request", "Tag question"], answer: 2, explanation: "'Could you...' is a polite request, not a yes/no question." },
    { question: "An indirect answer to 'When is the deadline?' could be:", options: ["Next Friday.", "Check with the project manager.", "The deadline is important.", "Yes, there is a deadline."], answer: 1, explanation: "'Check with the project manager' is a valid indirect response - it redirects the question." },
  ],
  cheatSheetPoints: [
    "First word = answer type (Where→place, When→time, Who→person)",
    "Word repetition alone does not decide correctness; check conversational relevance",
    "Indirect answers are VALID in TOEIC (e.g., 'Ask Ms. Kim')",
    "Yes/no questions allow direct or relevant indirect replies",
    "Offers and requests allow acceptance, refusal, explanations or alternatives",
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
      trap: "The graphic shows 4 options but the audio mentions ALL of them - only ONE matches the question",
      trapVi: "Biểu đồ hiện 4 lựa chọn nhưng audio đề cập TẤT CẢ - chỉ MỘT khớp câu hỏi",
      why: "You must listen for the SPECIFIC detail the question asks about, not just any mentioned item.",
      whyVi: "Phải nghe CHI TIẾT CỤ THỂ câu hỏi hỏi, không phải bất kỳ mục nào được nhắc."
    },
    {
      trap: "Numbers/prices change during the conversation",
      trapVi: "Số/giá thay đổi trong hội thoại",
      why: "'The original price was $50 but we got a 20% discount' - the answer is $40, not $50.",
      whyVi: "'Giá gốc $50 nhưng giảm 20%' - đáp án là $40, không phải $50."
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
      context: "Graphic: Room A (9 a.m.), Room B (10 a.m.), Room C (11 a.m.), Room D (2 p.m.).\nWoman: 'Room A is booked.' Man: 'Ten is too early for me. Let us use the eleven o'clock slot.'",
      contextVi: "Bảng: Phòng A (9h), B (10h), C (11h), D (14h).\nNữ: 'Phòng A đã đặt.' Nam: '10 giờ quá sớm. Chọn khung 11 giờ nhé.'",
      question: "Look at the graphic. Which room will the speakers use?",
      options: ["Room A", "Room B", "Room C", "Room D"],
      answer: 2,
      explanation: "The speakers say: 'Room A is booked, and 10 is too early. Let us take the 11 o’clock slot.' → Room C.",
      explanationVi: "Họ nói: 'Phòng A đã đặt, 10 giờ quá sớm. Chọn khung 11 giờ nhé.' → Phòng C.",
    },
    {
      context: "Price list: Basic ($29), Standard ($49), Premium ($79), Enterprise ($149).\nSpeaker: 'We need team features but not the full Enterprise plan. Premium has everything we need, so let us buy that.'",
      contextVi: "Bảng giá: Basic ($29), Standard ($49), Premium ($79), Enterprise ($149).\nNgười nói: 'Cần tính năng nhóm nhưng không cần Enterprise. Premium có đủ, nên mua gói đó.'",
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
    "Listen for corrections - the LAST answer is usually right",
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
      why: "Identify the blank's grammatical role, not just the preceding word. 'The report was completed quickly' uses an adverb modifying completed; 'The report is complete' uses an adjective after a linking verb. Verbs can also take noun objects.",
      whyVi: "Xác định vai trò của chỗ trống, không chỉ từ đứng trước. 'The report was completed quickly' dùng trạng từ bổ nghĩa completed; 'The report is complete' dùng tính từ sau động từ nối. Động từ còn có thể có tân ngữ là danh từ."
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Look at the Options First",
      titleVi: "Nhìn đáp án TRƯỚC",
      description: "Related forms suggest a word-form item. Identify the blank's role, then read the complete sentence to confirm meaning. Employee, employer and employment are all nouns, so position alone cannot distinguish them.",
      descriptionVi: "Các dạng cùng gốc gợi ý câu hỏi dạng từ. Xác định vai trò chỗ trống, rồi đọc toàn câu để kiểm tra nghĩa. Employee, employer và employment đều là danh từ nên vị trí không đủ để phân biệt.",
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
    "Look at OPTIONS first - same root word = word form question",
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
  description: "The definitive guide to choosing between conjunctions and prepositions - one of the most tested grammar points in TOEIC.",
  descriptionVi: "Hướng dẫn toàn diện để phân biệt liên từ và giới từ - một trong những điểm ngữ pháp được kiểm tra nhiều nhất trong TOEIC.",
  trapAlerts: [
    {
      trap: "'Despite' vs 'Although' - both mean contrast but different grammar",
      trapVi: "'Despite' vs 'Although' - cả hai đều nghĩa tương phản nhưng ngữ pháp khác",
      why: "Despite + NOUN/V-ing | Although + S + V. Wrong structure = wrong answer.",
      whyVi: "Despite + DANH TỪ/V-ing | Although + S + V. Sai cấu trúc = sai đáp án."
    },
    {
      trap: "'Because' vs 'Because of' - students always confuse these",
      trapVi: "'Because' vs 'Because of' - học sinh luôn nhầm hai cái này",
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
    "5 seconds max - just check what follows the blank",
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
      trap: "The PURPOSE question - students confuse 'topic' with 'purpose'",
      trapVi: "Câu hỏi MỤC ĐÍCH - học sinh nhầm 'chủ đề' với 'mục đích'",
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
      context: "From: HR. To: All staff. Subject: Parking update.\nFrom Monday, staff must display a parking permit in the north lot. Please collect your permit at reception by Friday. The visitor parking area will remain unchanged.",
      contextVi: "Từ: Nhân sự. Đến: Toàn bộ nhân viên. Chủ đề: Cập nhật đỗ xe.\nTừ thứ Hai, nhân viên phải trưng giấy phép tại bãi phía bắc. Nhận giấy ở lễ tân trước thứ Sáu. Bãi khách không thay đổi.",
      question: "What is the purpose of this email?",
      options: ["To announce a new parking policy", "To complain about parking", "To request a meeting", "To introduce a new employee"],
      answer: 0,
      explanation: "HR → all employees + new policy = announcement purpose.",
      explanationVi: "HR → toàn nhân viên + chính sách mới = mục đích thông báo.",
    },
    {
      context: "From: Bright Supplies. Subject: Order 1842.\nThank you for your order. Your items will leave our warehouse on Tuesday and should reach your office on Thursday. The tracking link will be sent after dispatch.",
      contextVi: "Từ: Bright Supplies. Chủ đề: Đơn 1842.\nCảm ơn đã đặt hàng. Hàng rời kho thứ Ba và dự kiến đến văn phòng thứ Năm. Đường dẫn theo dõi gửi sau khi xuất hàng.",
      question: "What is the email mainly about?",
      options: ["A price negotiation", "A shipment confirmation", "A product complaint", "A meeting request"],
      answer: 1,
      explanation: "Supplier + confirming + shipment date = shipment confirmation.",
      explanationVi: "Nhà cung cấp + xác nhận + ngày giao = xác nhận giao hàng.",
    },
  ],
  businessContext: "Email reading is the most practical TOEIC skill. In real offices, you'll read 50+ emails daily - quickly identifying purpose, action items, and deadlines is essential for productivity.",
  businessContextVi: "Đọc email là kỹ năng TOEIC thực tế nhất. Trong văn phòng thực, bạn đọc 50+ email/ngày - nhanh chóng xác định mục đích, việc cần làm và deadline là thiết yếu.",
  proSpeedTip: "For purpose questions, start with the opening and subject line, then confirm the main request or announcement in the body and closing. A greeting or background sentence may not state the purpose.",
  proSpeedTipVi: "Với câu mục đích, bắt đầu ở tiêu đề và phần mở đầu, rồi xác nhận yêu cầu hay thông báo chính trong thân thư và phần cuối. Lời chào hoặc câu dẫn nhập chưa chắc nêu mục đích.",
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
    "Opening suggests purpose; confirm with the main message and closing request",
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
      context: "Text 1 - Job ad: Marketing Manager. Applicants need at least five years of marketing experience and a business-related degree.\nText 2 - Application: I hold a business degree and have six years of digital marketing experience. I have not worked for your company before.",
      contextVi: "Bài 1 - Tuyển Marketing Manager: Ít nhất năm năm marketing và bằng liên quan kinh doanh.\nBài 2 - Ứng tuyển: Tôi có bằng kinh doanh và sáu năm digital marketing. Tôi chưa làm tại công ty anh/chị.",
      question: "What qualification does the candidate have that matches the job requirements?",
      options: ["At least five years of marketing experience", "A degree in computer science", "Fluency in Japanese", "A previous job at the same company"],
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
    "Point at Text 1, scan Text 2 - prevent re-reading",
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
      trap: "'Resign' vs 'Re-sign' - completely opposite meanings!",
      trapVi: "'Resign' vs 'Re-sign' - nghĩa hoàn toàn ngược nhau!",
      why: "Resign = quit your job. Re-sign = sign a contract again. One hyphen changes everything.",
      whyVi: "Resign = nghỉ việc. Re-sign = ký lại hợp đồng. Một dấu gạch ngang thay đổi mọi thứ."
    },
    {
      trap: "'Affect' vs 'Effect' - verb vs noun",
      trapVi: "'Affect' vs 'Effect' - động từ vs danh từ",
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
      explanation: "'Dispatched' means sent out for delivery - the correct shipping verb.",
      explanationVi: "'Dispatched' nghĩa là đã gửi đi - động từ giao hàng chính xác.",
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
    { question: "Which preposition follows 'comply'?", options: ["to", "for", "with", "in"], answer: 2, explanation: "'Comply WITH' regulations/rules - always WITH." },
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
      description: "In paper-based practice, you may compare the usual order with Part 7 → Part 6 → Part 5, if local test rules allow it. No Part 7 question has a guaranteed higher point value; scaled scores depend on the test. Choose the order that improves your timed accuracy without leaving easy items unanswered.",
      descriptionVi: "Khi luyện đề giấy, có thể so sánh thứ tự thường với Part 7 → Part 6 → Part 5 nếu quy định nơi thi cho phép. Không có bảo đảm mỗi câu Part 7 nhiều điểm hơn; điểm được quy đổi theo đề. Chọn thứ tự giúp làm đúng trong giờ mà không bỏ các câu dễ.",
    },
  ],
  practiceSet: [
    {
      context: "Time calculation exercise",
      contextVi: "Bài tập tính thời gian",
      question: "If Part 5 takes 15 minutes and Part 6 takes 10 minutes, how much of the 75-minute Reading section remains for Part 7?",
      options: ["60 minutes", "50 minutes", "55 minutes", "45 minutes"],
      answer: 1,
      explanation: "75 min total - 15 min (Part 5) - 10 min (Part 6) = 50 min for Part 7. That's 5 min less than optimal!",
      explanationVi: "75 phút tổng - 15 phút (Part 5) - 10 phút (Part 6) = 50 phút cho Part 7. Ít hơn tối ưu 5 phút!",
    },
    {
      context: "Pace calculation",
      contextVi: "Tính tốc độ",
      question: "You allocate 55 minutes to 54 Part 7 questions. Approximately how much time is available per question, including reading the documents?",
      options: ["30 seconds", "61 seconds", "120 seconds", "180 seconds"],
      answer: 1,
      explanation: "55 × 60 ÷ 54 ≈ 61 seconds per question, including passage reading. This is an average, not a hard limit; longer sets share reading time across several questions.",
      explanationVi: "55 × 60 ÷ 54 ≈ 61 giây mỗi câu, gồm đọc bài. Đây là trung bình, không phải giới hạn cứng; nhiều câu cùng dùng thời gian đọc một bộ.",
    },
  ],
  businessContext: "Time management in TOEIC directly mirrors workplace skills: prioritizing tasks, meeting deadlines, and making quick decisions under pressure - all valued by employers.",
  businessContextVi: "Quản lý thời gian TOEIC trực tiếp phản ánh kỹ năng công sở: ưu tiên công việc, hoàn thành deadline, quyết định nhanh dưới áp lực - được nhà tuyển dụng đánh giá cao.",
  proSpeedTip: "Write the TARGET TIME for each section on the first page: Part 5 finish by XX:10, Part 6 finish by XX:20, Part 7 all remaining time. Check your watch at each milestone!",
  proSpeedTipVi: "Ghi THỜI GIAN MỤC TIÊU trên trang đầu: Xong Part 5 lúc XX:10, Part 6 lúc XX:20, Part 7 tất cả thời gian còn lại. Kiểm tra đồng hồ ở mỗi mốc!",
  vocabHighlights: [],
  quiz: [
    { question: "How much time should Part 5 take (30 questions)?", options: ["20 minutes", "15 minutes", "10 minutes", "5 minutes"], answer: 2, explanation: "10 minutes = 20 seconds per question. Fast enough to save time for Part 7." },
    { question: "If a Part 5 question takes more than 30 seconds, you should:", options: ["Keep trying", "Skip it entirely", "Mark best guess and move on", "Ask the proctor"], answer: 2, explanation: "Mark your best guess and return later if time permits. Don't get stuck!" },
    { question: "The 'Reverse Order Strategy' means:", options: ["Answer in random order", "Do Part 7 first, then Part 6, then Part 5", "Start from the last question", "Skip all difficult questions"], answer: 1, explanation: "This alternative order can be tested in timed practice where navigation is allowed. It is not evidence that Part 7 questions carry more points." },
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
      trap: "Reject meaning changes, not repeated words",
      trapVi: "Loại ý nghĩa bị thay đổi, không loại chỉ vì lặp từ",
      why: "Correct answers can repeat or paraphrase the passage. Check who does what, when, where and under which conditions. A synonym does not rescue an option that changes a deadline, negation or obligation.",
      whyVi: "Đáp án đúng có thể lặp từ hoặc diễn đạt lại. Kiểm tra ai làm gì, khi nào, ở đâu và với điều kiện nào. Từ đồng nghĩa không làm đáp án đúng nếu nó đổi hạn, phủ định hay nghĩa bắt buộc."
    },
    {
      trap: "Opposite meaning words disguised as synonyms",
      trapVi: "Từ nghĩa ngược giả dạng từ đồng nghĩa",
      why: "'Increase' vs 'Decrease', 'Accept' vs 'Except' - one letter difference, opposite meaning.",
      whyVi: "'Tăng' vs 'Giảm', 'Chấp nhận' vs 'Ngoại trừ' - khác một chữ, nghĩa ngược."
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
      example: "Passage: 'Employees should arrive by 9 AM.' Answer: 'Staff should be present no later than nine o'clock.'",
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
        "Register at the front desk before their visit.",
        "Show their ID to security.",
        "Call the receptionist beforehand.",
      ],
      answer: 0,
      explanation: "A is correct: 'when they arrive' preserves 'upon arrival'. B changes the timing to before the visit. C adds an ID requirement and D adds a prior phone call; neither is stated. Repeated wording does not make A wrong.",
      explanationVi: "A đúng: 'khi đến' giữ nguyên nghĩa upon arrival. B đổi thời điểm thành trước chuyến thăm. C thêm yêu cầu giấy tờ, D thêm gọi điện trước; bài không nêu hai việc này. Lặp từ không làm A sai.",
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
  proSpeedTip: "When two options seem possible, compare their meaning against the evidence: subject, action, timing, quantity and conditions. Reject any changed or unsupported detail, whether the wording is repeated or paraphrased.",
  proSpeedTipVi: "Khi hai đáp án có vẻ hợp lý, đối chiếu chủ thể, hành động, thời gian, số lượng và điều kiện với căn cứ. Loại chi tiết bị đổi hoặc thiếu căn cứ, dù lặp từ hay diễn đạt lại.",
  vocabHighlights: [
    { word: "purchase → buy", definition: "Both mean 'to acquire by payment'", definitionVi: "Cả hai nghĩa 'mua'", example: "Employees may purchase supplies online.", businessContext: "Procurement" },
    { word: "mandatory → required", definition: "Both mean 'must be done'", definitionVi: "Cả hai nghĩa 'bắt buộc'", example: "Attendance at the training is mandatory.", businessContext: "Company policies" },
    { word: "complimentary → free", definition: "Both mean 'no charge'", definitionVi: "Cả hai nghĩa 'miễn phí'", example: "Complimentary breakfast is included.", businessContext: "Hotels & events" },
    { word: "prior to → before", definition: "Both mean 'earlier than'", definitionVi: "Cả hai nghĩa 'trước khi'", example: "Submit forms prior to the deadline.", businessContext: "Scheduling" },
  ],
  quiz: [
    { question: "If an answer repeats wording from the passage, what should you do?", options: ["Always choose it", "Check its meaning against the evidence", "Always reject it", "Ignore the question"], answer: 1, explanation: "Both repeated wording and paraphrases can be correct. The answer must match the question and preserve the passage meaning." },
    { question: "'Mandatory' is a synonym of:", options: ["Optional", "Required", "Preferred", "Suggested"], answer: 1, explanation: "Mandatory = required = must be done. Not optional or preferred." },
    { question: "Level 2 paraphrasing involves:", options: ["Synonym swapping", "Structural changes (active↔passive)", "Adding new information", "Translating to another language"], answer: 1, explanation: "Level 2 = changing sentence structure while keeping meaning: active↔passive, noun↔verb forms." },
    { question: "'Postpone' can be paraphrased as:", options: ["Cancel", "Reschedule for later", "Start early", "Approve"], answer: 1, explanation: "Postpone = delay = reschedule for a later time. NOT cancel." },
  ],
  cheatSheetPoints: [
    "Correct answer preserves the evidence, whether repeated or paraphrased",
    "Word overlap is not a reason to reject an answer",
    "Top pairs: purchase↔buy, mandatory↔required, prior to↔before",
    "3 levels: synonym swap → structure change → complete reword",
    "When stuck: compare every meaning detail against the passage",
  ],
  isNew: true,
};

// === LESSON 11: Part 2 - Indirect Answers ===
const part2Indirect: ToeicLecture = {
  id: "toeic-part2-indirect",
  title: "Indirect Answers: The Most Difficult Trap in Q&A",
  titleVi: "Câu trả lời gián tiếp: Bẫy khó nhất Part 2",
  category: "listening",
  parts: ["Part 2"],
  icon: "🔀",
  duration: "20 min",
  level: "advanced",
  targetScore: "750+",
  description: "Master indirect responses - the #1 reason high-level students lose points in Part 2.",
  descriptionVi: "Làm chủ câu trả lời gián tiếp - lý do #1 khiến học viên trình độ cao mất điểm Part 2.",
  trapAlerts: [
    { trap: "Expecting a direct answer when TOEIC gives an indirect one", trapVi: "Kỳ vọng câu trả lời trực tiếp khi TOEIC cho gián tiếp", why: "Indirect responses occur in Part 2, but there is no fixed percentage tied to your target score. Learn to recognize redirection, uncertainty, conditions and counter-questions.", whyVi: "Part 2 có câu đáp gián tiếp nhưng không có tỷ lệ cố định theo điểm mục tiêu. Luyện nhận ra chuyển hướng, chưa chắc chắn, điều kiện và hỏi ngược." },
    { trap: "Choosing the answer that SOUNDS most logical", trapVi: "Chọn đáp án NGHE có vẻ logic nhất", why: "Indirect answers sound unrelated but are contextually appropriate.", whyVi: "Đáp án gián tiếp nghe không liên quan nhưng phù hợp ngữ cảnh." },
  ],
  coreTechnique: [
    { step: 1, title: "Recognize Indirect Patterns", titleVi: "Nhận diện mẫu gián tiếp", description: "3 types: Redirect ('Ask Ms. Kim'), Conditional ('It depends on the budget'), Counter-question ('Why do you ask?').", descriptionVi: "3 dạng: Chuyển hướng ('Hỏi chị Kim'), Điều kiện ('Tùy ngân sách'), Hỏi ngược ('Sao bạn hỏi?')." },
    { step: 2, title: "Don't Eliminate Too Fast", titleVi: "Đừng loại trừ quá nhanh", description: "If no answer sounds 'perfect', the indirect one is likely correct.", descriptionVi: "Nếu không đáp án nào nghe 'hoàn hảo', đáp án gián tiếp có thể đúng." },
    { step: 3, title: "Think Conversation, Not Grammar", titleVi: "Nghĩ như hội thoại, không phải ngữ pháp", description: "Would this response make sense in a real office conversation?", descriptionVi: "Câu trả lời này có hợp lý trong hội thoại văn phòng thực tế không?" },
  ],
  practiceSet: [
    { context: "Office", contextVi: "Văn phòng", question: "When will the new software be installed?", options: ["The IT department hasn't confirmed yet.", "Yes, it's new software.", "I installed it yesterday."], answer: 0, explanation: "Redirect - the speaker doesn't know and points to IT.", explanationVi: "Chuyển hướng - người nói không biết và chỉ sang bộ phận IT." },
    { context: "Meeting", contextVi: "Cuộc họp", question: "Who's leading the presentation tomorrow?", options: ["It was a great presentation.", "Hasn't the schedule been sent out?", "Tomorrow at 3 PM."], answer: 1, explanation: "Counter-question - implies 'check the schedule yourself'.", explanationVi: "Hỏi ngược - ngụ ý 'tự kiểm tra lịch đi'." },
    { context: "Email", contextVi: "Email", question: "Should we order more supplies?", options: ["Let me check the inventory first.", "The supplies arrived yesterday.", "The order form is on the website."], answer: 0, explanation: "Conditional - needs to verify before deciding.", explanationVi: "Điều kiện - cần kiểm tra trước khi quyết định." },
  ],
  businessContext: "Indirect communication is standard in professional settings - especially in hierarchical workplaces where people defer to managers or redirect to the right department.",
  businessContextVi: "Giao tiếp gián tiếp là chuẩn mực trong môi trường chuyên nghiệp - đặc biệt nơi nhân viên chuyển hướng lên quản lý hoặc sang bộ phận phù hợp.",
  proSpeedTip: "If you hear 'I'm not sure', 'Let me check', or 'You should ask...' - that's likely the correct indirect answer.",
  proSpeedTipVi: "Nếu nghe 'I'm not sure', 'Let me check', hoặc 'You should ask...' - đó có thể là đáp án gián tiếp đúng.",
  vocabHighlights: [
    { word: "defer to", definition: "to let someone else decide", definitionVi: "nhường quyết định cho", example: "I'll defer to the manager on this.", businessContext: "Decision-making" },
    { word: "get back to you", definition: "to respond later", definitionVi: "phản hồi sau", example: "Let me get back to you on that.", businessContext: "Communication" },
  ],
  quiz: [
    { question: "Which response appropriately expresses uncertainty about a deadline?", options: ["The desk is new.", "Yes, it is blue.", "The manager has not confirmed the date yet.", "The file contains ten pages."], answer: 2, explanation: "The manager has not confirmed the date yet explains why the speaker cannot provide the deadline; no fixed percentage of indirect responses is needed." },
    { question: "'Hasn't the memo been sent?' is what type of indirect answer?", options: ["Redirect", "Counter-question", "Conditional", "Direct"], answer: 1, explanation: "It's a counter-question - answering a question with a question." },
    { question: "Which is an indirect answer to 'Where's the report?'", options: ["On my desk.", "Ms. Lee was working on it.", "It's 10 pages.", "Yes, there is a report."], answer: 1, explanation: "'Ms. Lee was working on it' redirects - ask her." },
    { question: "Indirect answers work because they:", options: ["Avoid the question", "Are contextually appropriate in conversation", "Use big vocabulary", "Repeat question words"], answer: 1, explanation: "They're natural conversational responses, just not direct ones." },
  ],
  cheatSheetPoints: [
    "Indirect replies are tested; there is no fixed score-based percentage",
    "3 types: Redirect, Conditional, Counter-question",
    "'I'm not sure / Let me check / Ask Mr. X' = likely correct",
    "If no answer sounds perfect → indirect is the one",
    "Think conversation, not grammar test",
  ],
  isNew: true,
};

// === LESSON 12: Part 3 - Pre-reading Questions ===
const part3PreRead: ToeicLecture = {
  id: "toeic-part3-preread",
  title: "Pre-reading Questions: The 5-Second Golden Window",
  titleVi: "Đọc trước câu hỏi: 5 giây vàng quyết định điểm số",
  category: "listening",
  parts: ["Part 3"],
  icon: "⏱️",
  duration: "18 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Preview each three-question set during available instructions and pauses. Identify the information requested before listening; there is no guaranteed five-second preparation window.",
  descriptionVi: "Đọc trước bộ ba câu trong thời gian hướng dẫn và khoảng nghỉ có sẵn. Xác định thông tin cần nghe; không có bảo đảm luôn đủ năm giây chuẩn bị.",
  trapAlerts: [
    { trap: "Spending too long on previous questions", trapVi: "Dành quá lâu cho câu trước", why: "If you're still thinking about Q1, you'll miss the 5-second window for Q2-Q4.", whyVi: "Nếu còn nghĩ Q1, bạn sẽ lỡ 5 giây vàng cho Q2-Q4." },
    { trap: "Reading all 4 answer choices instead of just the question stem", trapVi: "Đọc cả 4 đáp án thay vì chỉ đọc câu hỏi", why: "You only have time to scan questions, not answers.", whyVi: "Chỉ đủ thời gian quét câu hỏi, không phải đáp án." },
  ],
  coreTechnique: [
    { step: 1, title: "Read Questions 1-3 During Direction Time", titleVi: "Đọc câu hỏi 1-3 khi nghe hướng dẫn", description: "The 30-second direction intro is FREE TIME - use it to pre-read the first set.", descriptionVi: "30 giây hướng dẫn là THỜI GIAN MIỄN PHÍ - dùng để đọc trước bộ đầu tiên." },
    { step: 2, title: "Focus on WHO, WHAT, WHERE Keywords", titleVi: "Tập trung vào từ khóa AI, CÁI GÌ, Ở ĐÂU", description: "Underline keywords mentally: 'What does the man suggest?' → listen for the MAN's SUGGESTION.", descriptionVi: "Gạch chân từ khóa trong đầu: 'What does the man suggest?' → nghe GỢI Ý của NGƯỜI ĐÀN ÔNG." },
    { step: 3, title: "Mark and Move - Never Look Back", titleVi: "Đánh dấu và đi tiếp - Không bao giờ quay lại", description: "Answer immediately, move to pre-read the NEXT set. Going back wastes the golden window.", descriptionVi: "Trả lời ngay, chuyển sang đọc trước bộ TIẾP THEO. Quay lại sẽ lãng phí 5 giây vàng." },
  ],
  practiceSet: [
    { context: "Woman: 'We cannot review the figures before today's meeting.' Man: 'What should we do?' Woman: 'Let us postpone the meeting until tomorrow so everyone can prepare.'", contextVi: "Nữ: 'Chưa kịp xem số liệu trước cuộc họp hôm nay.' Nam: 'Vậy làm sao?' Nữ: 'Dời cuộc họp sang ngày mai để mọi người chuẩn bị nhé.'", question: "What does the woman suggest?", options: ["Hiring more staff", "Postponing the meeting", "Ordering new equipment", "Changing the deadline"], answer: 1, explanation: "The woman proposes moving the meeting to tomorrow: B. She does not suggest changing staff, equipment or the project deadline.", explanationVi: "Người nữ đề xuất dời cuộc họp đến mai: B. Không đề cập thêm nhân sự, đổi thiết bị hay hạn dự án." },
    { context: "Woman: 'Could you explain the charge on my account?' Man: 'Certainly. I can check your transactions and help with your savings account at our branch.'", contextVi: "Nữ: 'Anh giải thích khoản phí trong tài khoản được không?' Nam: 'Được. Tôi kiểm tra giao dịch và hỗ trợ tài khoản tiết kiệm tại chi nhánh.'", question: "Where does the man most likely work?", options: ["A hospital", "A bank", "A restaurant", "A school"], answer: 1, explanation: "Transactions, savings account and branch together support a bank: B. The other workplaces do not fit these combined clues.", explanationVi: "Giao dịch, tài khoản tiết kiệm và chi nhánh cùng cho thấy ngân hàng: B. Các nơi khác không khớp bộ manh mối này." },
  ],
  businessContext: "Pre-reading is a real-world skill used in meetings (scanning agendas before discussion) and email management (reading subject lines to prioritize).",
  businessContextVi: "Đọc trước là kỹ năng thực tế: xem nhanh chương trình họp trước buổi họp, đọc tiêu đề email để ưu tiên.",
  proSpeedTip: "Never read answer choices during the 5-second window. Questions only. You'll hear the answers in the audio.",
  proSpeedTipVi: "Không bao giờ đọc đáp án trong 5 giây vàng. Chỉ đọc câu hỏi. Bạn sẽ nghe đáp án trong audio.",
  vocabHighlights: [
    { word: "imply", definition: "to suggest indirectly", definitionVi: "ngụ ý", example: "What does the speaker imply?", businessContext: "Inference questions" },
    { word: "intend", definition: "to plan to do", definitionVi: "có ý định", example: "What does the woman intend to do?", businessContext: "Action questions" },
  ],
  quiz: [
    { question: "How long is the 'golden window' between sets?", options: ["3 seconds", "5 seconds", "10 seconds", "15 seconds"], answer: 1, explanation: "About 5 seconds between sets - enough to scan 3 question stems." },
    { question: "During the 30-second direction time, you should:", options: ["Relax", "Pre-read the first question set", "Read all answers", "Close your eyes"], answer: 1, explanation: "The direction audio is free time to get ahead." },
    { question: "If you're unsure about an answer, you should:", options: ["Go back and re-read", "Mark your best guess and move on", "Skip it entirely", "Wait for the next audio"], answer: 1, explanation: "Mark and move - going back wastes the golden window for the next set." },
    { question: "Pre-reading questions helps because:", options: ["You can guess the audio topic", "You know WHAT to listen for", "The answers are in the questions", "It saves reading time later"], answer: 1, explanation: "Knowing what to listen for makes you a targeted listener, not a passive one." },
  ],
  cheatSheetPoints: [
    "30-second intro = FREE pre-reading time for Set 1",
    "5-second golden window: read QUESTIONS only, not answers",
    "Focus on WHO + WHAT + WHERE keywords",
    "Mark best guess immediately → move to next set",
    "Never look back - forward momentum is key",
  ],
  isNew: true,
};

// === LESSON 13: Part 5 - Relative Clauses ===
const part5RelativeClauses: ToeicLecture = {
  id: "toeic-part5-relative-clauses",
  title: "Mastering Relative Clauses: Who, Whom, Which, and That",
  titleVi: "Làm chủ Mệnh đề Quan hệ: Who, Whom, Which, That",
  category: "grammar",
  parts: ["Part 5"],
  icon: "🔗",
  duration: "22 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Solve relative pronoun questions in under 10 seconds with the Subject/Object rule.",
  descriptionVi: "Giải câu hỏi đại từ quan hệ dưới 10 giây với quy tắc Chủ ngữ/Tân ngữ.",
  trapAlerts: [
    { trap: "Confusing WHO (subject) with WHOM (object)", trapVi: "Nhầm WHO (chủ ngữ) với WHOM (tân ngữ)", why: "'The manager who leads...' (subject) vs 'The manager whom we hired...' (object after verb).", whyVi: "'Manager who leads...' (chủ ngữ) vs 'Manager whom we hired...' (tân ngữ sau động từ)." },
    { trap: "Using WHICH for people", trapVi: "Dùng WHICH cho người", why: "WHICH = things only. WHO/WHOM = people. THAT = both but not after commas.", whyVi: "WHICH = vật. WHO/WHOM = người. THAT = cả hai nhưng không dùng sau dấu phẩy." },
  ],
  coreTechnique: [
    { step: 1, title: "Check: Person or Thing?", titleVi: "Kiểm tra: Người hay Vật?", description: "Person → who/whom/that. Thing → which/that. This eliminates 50% of options instantly.", descriptionVi: "Người → who/whom/that. Vật → which/that. Loại ngay 50% đáp án." },
    { step: 2, title: "Check: Subject or Object?", titleVi: "Kiểm tra: Chủ ngữ hay Tân ngữ?", description: "If the relative pronoun is followed by a VERB → Subject (who). If followed by Subject+Verb → Object (whom).", descriptionVi: "Nếu đại từ QH theo sau là ĐỘNG TỪ → Chủ ngữ (who). Nếu theo sau là Chủ ngữ+ĐT → Tân ngữ (whom)." },
    { step: 3, title: "Comma Rule: No THAT after commas", titleVi: "Quy tắc dấu phẩy: Không THAT sau dấu phẩy", description: "Non-restrictive clauses (with commas) use WHICH or WHO, never THAT.", descriptionVi: "Mệnh đề không giới hạn (có dấu phẩy) dùng WHICH hoặc WHO, không bao giờ dùng THAT." },
  ],
  practiceSet: [
    { context: "Part 5", contextVi: "Part 5", question: "The employee _____ was promoted has been with the company for 10 years.", options: ["who", "whom", "which", "whose"], answer: 0, explanation: "'who' is subject of 'was promoted' - a person doing an action.", explanationVi: "'who' là chủ ngữ của 'was promoted' - người thực hiện hành động." },
    { context: "Part 5", contextVi: "Part 5", question: "The report, _____ was submitted yesterday, contains errors.", options: ["that", "which", "who", "whom"], answer: 1, explanation: "After a comma → WHICH (not THAT). Report = thing.", explanationVi: "Sau dấu phẩy → WHICH (không THAT). Report = vật." },
    { context: "Part 5", contextVi: "Part 5", question: "The client to _____ we sent the proposal has signed the contract.", options: ["who", "whom", "which", "whose"], answer: 1, explanation: "After the fronted preposition to, formal relative clauses use whom for a person. Who is common as an object without a fronted preposition, so the original who/whom distinction alone would not give a unique answer.", explanationVi: "Sau giới từ to đưa lên trước, mệnh đề quan hệ trang trọng dùng whom cho người. Who thường được dùng làm tân ngữ khi không có giới từ đưa trước; chỉ phân biệt who/whom theo tân ngữ là chưa đủ." },
  ],
  businessContext: "Relative clauses are essential in business writing: job descriptions, contracts, and reports frequently use who/which/that to define roles and specifications.",
  businessContextVi: "Mệnh đề quan hệ thiết yếu trong văn bản kinh doanh: mô tả công việc, hợp đồng, báo cáo thường xuyên dùng who/which/that.",
  proSpeedTip: "Person + verb after blank → WHO. Person + subject after blank → WHOM. Thing after comma → WHICH. Done in 5 seconds.",
  proSpeedTipVi: "Người + ĐT sau chỗ trống → WHO. Người + CN sau chỗ trống → WHOM. Vật sau dấu phẩy → WHICH. Xong trong 5 giây.",
  vocabHighlights: [
    { word: "restrictive clause", definition: "essential info, no commas", definitionVi: "mệnh đề giới hạn, không dấu phẩy", example: "The man who called is here.", businessContext: "Grammar terminology" },
    { word: "non-restrictive clause", definition: "extra info, with commas", definitionVi: "mệnh đề không giới hạn, có dấu phẩy", example: "Mr. Kim, who is our CEO, will attend.", businessContext: "Grammar terminology" },
  ],
  quiz: [
    { question: "'The package _____ arrived today is damaged.' Fill in:", options: ["whom", "which", "who", "whose"], answer: 1, explanation: "Package = thing → which/that. Subject position (arrived) → which." },
    { question: "After a comma, you should NEVER use:", options: ["which", "who", "that", "whom"], answer: 2, explanation: "THAT cannot be used in non-restrictive (comma) clauses." },
    { question: "'The candidate whom we interviewed...' - 'whom' is:", options: ["Subject", "Object", "Possessive", "Adjective"], answer: 1, explanation: "'we interviewed whom' - whom is the object of 'interviewed'." },
    { question: "Quick rule: Person + verb after blank =", options: ["whom", "which", "who", "that"], answer: 2, explanation: "Person + verb = subject position = WHO." },
  ],
  cheatSheetPoints: [
    "Person → who/whom. Thing → which. Both → that (no comma)",
    "Blank + VERB = Subject → WHO",
    "Blank + Subject+Verb = Object → WHOM",
    "After comma → WHICH or WHO, never THAT",
    "5-second solve: check Person/Thing → Subject/Object",
  ],
  isNew: true,
};

// === LESSON 14: Part 5 - Subjunctive Mood ===
const part5Subjunctive: ToeicLecture = {
  id: "toeic-part5-subjunctive",
  title: "Subjunctive Mood in Business English",
  titleVi: "Câu giả định trong Tiếng Anh thương mại",
  category: "grammar",
  parts: ["Part 5"],
  icon: "📜",
  duration: "20 min",
  level: "advanced",
  targetScore: "750+",
  description: "Use the mandative subjunctive for formal recommendations, requirements and necessary actions; distinguish these from statements of fact.",
  descriptionVi: "Dùng giả định cho đề xuất, yêu cầu và hành động cần thiết trong văn bản trang trọng; phân biệt với câu khẳng định sự thật.",
  trapAlerts: [
    { trap: "Using 'should' or conjugated forms after demand/require/suggest", trapVi: "Dùng 'should' hoặc chia động từ sau demand/require/suggest", why: "For recommendations or demands, the mandative subjunctive uses the base form: 'suggest that he go'. 'Should go' is also a valid construction, especially in British English. Do not treat it as universally wrong.", whyVi: "Với đề xuất hay yêu cầu, giả định dùng nguyên thể: 'suggest that he go'. 'Should go' cũng đúng, nhất là tiếng Anh Anh. Không coi cấu trúc này luôn sai." },
    { trap: "Not recognizing subjunctive trigger words", trapVi: "Không nhận ra từ kích hoạt giả định", why: "Key triggers: recommend, suggest, insist, demand, require, request, propose, essential, vital, important.", whyVi: "Từ kích hoạt: recommend, suggest, insist, demand, require, request, propose, essential, vital, important." },
  ],
  coreTechnique: [
    { step: 1, title: "Spot the Trigger Word", titleVi: "Phát hiện từ kích hoạt", description: "Check the meaning: 'insist that he attend' demands attendance, but 'insist that he attended' asserts a past fact. A trigger word alone does not always require the subjunctive.", descriptionVi: "Kiểm tra nghĩa: 'insist that he attend' yêu cầu tham dự; 'insist that he attended' khẳng định việc đã xảy ra. Không phải cứ có từ kích hoạt là bắt buộc giả định." },
    { step: 2, title: "Use BASE FORM (no -s, no -ed)", titleVi: "Dùng NGUYÊN THỂ (không -s, không -ed)", description: "'It is essential that every employee ATTEND the meeting' (not attends).", descriptionVi: "'It is essential that every employee ATTEND the meeting' (không phải attends)." },
    { step: 3, title: "Adjective Triggers: It is + adj + that", titleVi: "Tính từ kích hoạt: It is + adj + that", description: "essential/vital/important/necessary/imperative + that + S + BASE FORM.", descriptionVi: "essential/vital/important/necessary/imperative + that + S + NGUYÊN THỂ." },
  ],
  practiceSet: [
    { context: "Part 5", contextVi: "Part 5", question: "The manager recommended that the report _____ submitted by Friday.", options: ["is", "be", "was", "will be"], answer: 1, explanation: "Subjunctive: recommend + that + S + BASE FORM. 'be' is the base form of 'to be'.", explanationVi: "Giả định: recommend + that + S + NGUYÊN THỂ. 'be' là nguyên thể của 'to be'." },
    { context: "Part 5", contextVi: "Part 5", question: "It is essential that all staff _____ the safety training.", options: ["complete", "completes", "completed", "completing"], answer: 0, explanation: "'Essential that' triggers subjunctive → base form 'complete'.", explanationVi: "'Essential that' kích hoạt giả định → nguyên thể 'complete'." },
    { context: "Part 5", contextVi: "Part 5", question: "The board insisted that the CEO _____ the decision.", options: ["reconsiders", "reconsider", "reconsidered", "will reconsider"], answer: 1, explanation: "'Insisted that' → subjunctive → base form 'reconsider'.", explanationVi: "'Insisted that' → giả định → nguyên thể 'reconsider'." },
  ],
  businessContext: "The subjunctive is used extensively in formal business communication: board resolutions, legal requirements, company policies, and official recommendations.",
  businessContextVi: "Câu giả định dùng nhiều trong giao tiếp kinh doanh chính thức: nghị quyết hội đồng, yêu cầu pháp lý, chính sách công ty.",
  proSpeedTip: "See trigger word + 'that'? → Pick the BASE FORM answer. It's always the uninflected verb (no -s, no -ed, no -ing).",
  proSpeedTipVi: "Thấy từ kích hoạt + 'that'? → Chọn NGUYÊN THỂ. Luôn là động từ không chia (không -s, -ed, -ing).",
  vocabHighlights: [
    { word: "mandate", definition: "to officially require", definitionVi: "bắt buộc chính thức", example: "The policy mandates that all employees undergo training.", businessContext: "Company policies" },
    { word: "imperative", definition: "absolutely necessary", definitionVi: "bắt buộc, cấp thiết", example: "It is imperative that the deadline be met.", businessContext: "Urgent business decisions" },
  ],
  quiz: [
    { question: "After 'suggest that', the verb should be in:", options: ["Present tense", "Base form (subjunctive)", "Past tense", "Future tense"], answer: 1, explanation: "Subjunctive: suggest/recommend/insist + that + S + base form." },
    { question: "'It is vital that he ___ on time.' Choose:", options: ["arrives", "arrive", "arrived", "arriving"], answer: 1, explanation: "'Vital that' triggers subjunctive → base form 'arrive'." },
    { question: "Which is NOT a subjunctive trigger?", options: ["recommend", "suggest", "hope", "insist"], answer: 2, explanation: "'Hope' does NOT trigger subjunctive. 'I hope he comes' uses normal tense." },
    { question: "Which sentence expresses a formal recommendation?", options: ["I hope he comes.", "I recommend that he attend.", "He attended yesterday.", "He will arrive tomorrow."], answer: 1, explanation: "Recommend introduces a proposed action; attend is the base-form subjunctive. The other sentences express hope or facts, not a recommendation." },
  ],
  cheatSheetPoints: ["Trigger words in requests: recommend, suggest, insist, demand, require, request", "Meaning matters: demand an action, not assert a fact", "Mandative form: that + subject + base verb; should + base verb is also valid", "Passive subjunctive: that the report be submitted", "Practise real examples; frequency is not fixed per test"],
  isNew: true,
};

// === LESSON 15: Part 6 - Text Completion ===
const part6TextCompletion: ToeicLecture = {
  id: "toeic-part6-text-completion",
  title: "Text Completion: Choosing the Right Sentence in Context",
  titleVi: "Hoàn thành đoạn văn: Chọn câu phù hợp ngữ cảnh",
  category: "reading",
  parts: ["Part 6"],
  icon: "📝",
  duration: "22 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Master Part 6's unique 'sentence insertion' questions - the question type most students struggle with.",
  descriptionVi: "Làm chủ câu hỏi 'chèn câu' đặc trưng Part 6 - dạng câu hỏi đa số học viên gặp khó.",
  trapAlerts: [
    { trap: "Choosing a grammatically correct sentence that doesn't fit the context", trapVi: "Chọn câu đúng ngữ pháp nhưng không khớp ngữ cảnh", why: "All 4 options are grammatically correct. The key is LOGICAL FLOW.", whyVi: "Cả 4 đáp án đều đúng ngữ pháp. Chìa khóa là LOGIC MẠCH VĂN." },
    { trap: "Ignoring the sentences BEFORE and AFTER the blank", trapVi: "Bỏ qua câu TRƯỚC và SAU chỗ trống", why: "The inserted sentence must connect to both - it's a bridge.", whyVi: "Câu chèn phải nối với cả hai - nó là cầu nối." },
  ],
  coreTechnique: [
    { step: 1, title: "Read the Full Passage First", titleVi: "Đọc toàn bộ đoạn văn trước", description: "Unlike Part 5, Part 6 requires context. Skim the entire passage to understand the topic and tone.", descriptionVi: "Khác Part 5, Part 6 cần ngữ cảnh. Đọc lướt toàn bộ đoạn để hiểu chủ đề và giọng văn." },
    { step: 2, title: "Check the Bridge: Before ↔ Blank ↔ After", titleVi: "Kiểm tra cầu nối: Trước ↔ Trống ↔ Sau", description: "The correct sentence must logically flow FROM the previous sentence and INTO the next one.", descriptionVi: "Câu đúng phải chảy logic TỪ câu trước VÀO câu sau." },
    { step: 3, title: "Look for Transition Signals", titleVi: "Tìm tín hiệu chuyển tiếp", description: "However, Therefore, In addition, For example - these words in the answer choices hint at the relationship.", descriptionVi: "However, Therefore, In addition, For example - các từ này trong đáp án gợi ý mối quan hệ." },
  ],
  practiceSet: [
    { context: "To all staff: Renovation work will block the main entrance for the next two weeks. Please use the side entrance and allow extra time to reach your desk. ____ We will notify you when the main entrance reopens.", contextVi: "Gửi nhân viên: Sửa chữa làm lối chính bị chặn hai tuần tới. Dùng lối bên và dành thêm thời gian đến chỗ làm. ____ Chúng tôi thông báo khi lối chính mở lại.", question: "Which sentence best fits in the blank?", options: ["However, the renovation will be completed ahead of schedule.", "The company was founded in 2010.", "We appreciate your patience during this time.", "The new printer has been installed."], answer: 2, explanation: "Email about renovation → acknowledging inconvenience → 'appreciate patience' fits the context.", explanationVi: "Email về sửa chữa → nhận biết bất tiện → 'appreciate patience' phù hợp ngữ cảnh." },
  ],
  businessContext: "Part 6 simulates real business documents: emails, memos, notices, and advertisements. The skill of inserting appropriate sentences is used daily in drafting professional communications.",
  businessContextVi: "Part 6 mô phỏng tài liệu kinh doanh thực: email, bản ghi nhớ, thông báo, quảng cáo. Kỹ năng chèn câu phù hợp dùng hàng ngày trong soạn thảo văn bản.",
  proSpeedTip: "For sentence insertion questions, read the sentence AFTER the blank first - it often contains the biggest clue.",
  proSpeedTipVi: "Với câu chèn câu, đọc câu SAU chỗ trống trước - thường chứa manh mối lớn nhất.",
  vocabHighlights: [
    { word: "transition signal", definition: "word/phrase connecting ideas", definitionVi: "tín hiệu chuyển tiếp", example: "However, the meeting has been postponed.", businessContext: "Writing flow" },
    { word: "coherence", definition: "logical connection between sentences", definitionVi: "sự mạch lạc", example: "The paragraph lacks coherence.", businessContext: "Document review" },
  ],
  quiz: [
    { question: "Part 6 'sentence insertion' questions require you to:", options: ["Find grammar errors", "Choose a sentence that fits the context", "Fill in a single word", "Correct spelling"], answer: 1, explanation: "Sentence insertion = choosing a full sentence that logically fits the passage." },
    { question: "The BEST strategy for Part 6 is:", options: ["Read only the blank line", "Read the full passage first", "Guess and move on", "Read only answer choices"], answer: 1, explanation: "Part 6 needs context - always read the full passage first." },
    { question: "'However' in an answer choice signals:", options: ["Addition", "Contrast", "Example", "Conclusion"], answer: 1, explanation: "'However' = contrast/opposition to the previous idea." },
    { question: "All 4 answer choices in Part 6 sentence insertion are:", options: ["Grammatically incorrect", "Grammatically correct", "Incomplete sentences", "Questions"], answer: 1, explanation: "All options are valid sentences - the difference is contextual fit." },
  ],
  cheatSheetPoints: [
    "Read FULL passage first - context is king in Part 6",
    "Check bridge: Previous sentence → Blank → Next sentence",
    "Transition signals: However(contrast), Therefore(result), In addition(extra)",
    "Read sentence AFTER blank first for biggest clue",
    "All options are grammatically correct - choose by LOGIC",
  ],
  isNew: true,
};

// === LESSON 16: Part 7 - Inference Questions ===
const part7Inference: ToeicLecture = {
  id: "toeic-part7-inference",
  title: "Inference Questions: Reading Between the Lines",
  titleVi: "Câu hỏi suy luận: Đọc giữa hai dòng chữ",
  category: "reading",
  parts: ["Part 7"],
  icon: "🔍",
  duration: "25 min",
  level: "advanced",
  targetScore: "750+",
  description: "Crack the hardest Part 7 question type - inference questions that ask 'What is implied/suggested?'",
  descriptionVi: "Giải mã dạng câu hỏi khó nhất Part 7 - câu hỏi suy luận 'What is implied/suggested?'",
  trapAlerts: [
    { trap: "Choosing an answer stated directly in the text", trapVi: "Chọn đáp án ghi trực tiếp trong bài", why: "Inference = NOT directly stated. If you can point to the exact sentence, it's NOT an inference.", whyVi: "Suy luận = KHÔNG ghi trực tiếp. Nếu chỉ được đúng câu, đó KHÔNG phải suy luận." },
    { trap: "Over-inferring beyond what the text supports", trapVi: "Suy luận quá xa so với bài", why: "The correct inference is supported by evidence in the text, just not stated explicitly.", whyVi: "Suy luận đúng được hỗ trợ bởi bằng chứng trong bài, chỉ không nêu rõ ràng." },
  ],
  coreTechnique: [
    { step: 1, title: "Identify Inference Keywords", titleVi: "Nhận diện từ khóa suy luận", description: "'What is implied?', 'What is suggested?', 'What can be inferred?', 'What is most likely true?'", descriptionVi: "'What is implied?', 'What is suggested?', 'What can be inferred?', 'What is most likely true?'" },
    { step: 2, title: "Find the Evidence, Then Go One Step Further", titleVi: "Tìm bằng chứng, rồi tiến thêm một bước", description: "Text says 'The store will close at 6 PM on December 24' → Inference: It's near Christmas.", descriptionVi: "Bài nói 'Cửa hàng đóng lúc 6 PM ngày 24/12' → Suy luận: Gần Giáng sinh." },
    { step: 3, title: "Eliminate Direct Statements", titleVi: "Loại đáp án trực tiếp", description: "If the answer is a copy-paste from the text, it's NOT an inference. Look for the paraphrased logical conclusion.", descriptionVi: "Nếu đáp án copy từ bài, đó KHÔNG phải suy luận. Tìm kết luận logic được diễn đạt lại." },
  ],
  practiceSet: [
    { context: "Email: 'We are currently experiencing higher than usual call volumes. Please try our online chat support for faster service.'", contextVi: "Email: 'Chúng tôi đang nhận nhiều cuộc gọi hơn bình thường. Vui lòng thử chat online để được phục vụ nhanh hơn.'", question: "What can be inferred about the company?", options: ["They are closing their call center.", "Phone support may take longer than online chat.", "They don't offer phone support.", "They prefer email communication."], answer: 1, explanation: "The message recommends chat for faster service, so callers may wait longer by phone. High call volume alone does not prove understaffing, closure or removal of phone support.", explanationVi: "Thông báo khuyên dùng chat để nhanh hơn nên gọi điện có thể phải chờ lâu hơn. Nhiều cuộc gọi không tự chứng minh thiếu nhân viên, đóng cửa hay bỏ hỗ trợ điện thoại." },
  ],
  businessContext: "Inference skills are critical in business: reading between the lines of competitor announcements, client emails, and market reports to understand unstated implications.",
  businessContextVi: "Kỹ năng suy luận quan trọng trong kinh doanh: đọc giữa dòng thông báo đối thủ, email khách hàng, báo cáo thị trường để hiểu ẩn ý.",
  proSpeedTip: "For inference questions, eliminate the 2 extreme answers first (too obvious or too wild), then choose between the remaining 2.",
  proSpeedTipVi: "Với câu suy luận, loại 2 đáp án cực đoan trước (quá rõ ràng hoặc quá xa), rồi chọn giữa 2 còn lại.",
  vocabHighlights: [
    { word: "imply", definition: "to suggest without stating directly", definitionVi: "ngụ ý", example: "The memo implies budget cuts are coming.", businessContext: "Corporate communication" },
    { word: "infer", definition: "to conclude from evidence", definitionVi: "suy luận", example: "We can infer from the data that sales declined.", businessContext: "Data analysis" },
  ],
  quiz: [
    { question: "An inference question asks you to:", options: ["Find exact words in the text", "Draw a logical conclusion not directly stated", "Guess randomly", "Translate the passage"], answer: 1, explanation: "Inference = logical conclusion supported by text evidence but not explicitly stated." },
    { question: "If an answer is copy-pasted from the text, it's:", options: ["Always correct", "NOT an inference", "The best choice", "Partially correct"], answer: 1, explanation: "Inferences are conclusions BEYOND what's directly written." },
    { question: "'Higher than usual call volumes' implies:", options: ["The company is closing", "The company is very busy", "Calls are free", "The company is new"], answer: 1, explanation: "More calls than usual = busy/high demand." },
    { question: "The best elimination strategy for inference is:", options: ["Remove longest answers", "Remove extreme answers (too obvious/too wild)", "Always pick C", "Skip the question"], answer: 1, explanation: "Extreme answers are easy to eliminate, narrowing to 2 reasonable options." },
  ],
  cheatSheetPoints: [
    "Inference = NOT directly stated, but supported by evidence",
    "Keywords: implied, suggested, inferred, most likely true",
    "Find evidence → go ONE step further logically",
    "If you can point to the exact sentence → NOT an inference",
    "Eliminate extremes first, then choose between remaining 2",
  ],
  isNew: true,
};

// === LESSON 17: Part 7 - Online Chat Discussions ===
const part7OnlineChat: ToeicLecture = {
  id: "toeic-part7-online-chat",
  title: "Online Chat Discussions: Tracking Multiple Speakers",
  titleVi: "Thảo luận chat online: Theo dõi nhiều người nói",
  category: "reading",
  parts: ["Part 7"],
  icon: "💬",
  duration: "20 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Navigate multi-speaker online chat passages - a newer TOEIC format that confuses many test-takers.",
  descriptionVi: "Xử lý đoạn chat online nhiều người nói - định dạng TOEIC mới khiến nhiều thí sinh bối rối.",
  trapAlerts: [
    { trap: "Mixing up who said what", trapVi: "Nhầm ai nói gì", why: "With 3-4 speakers, it's easy to attribute a statement to the wrong person.", whyVi: "Với 3-4 người nói, dễ gán phát biểu cho sai người." },
    { trap: "Missing time stamps that indicate sequence", trapVi: "Bỏ qua mốc thời gian chỉ thứ tự", why: "Chat messages have timestamps - they show the ORDER of events.", whyVi: "Tin nhắn chat có mốc thời gian - chúng cho biết THỨ TỰ sự kiện." },
  ],
  coreTechnique: [
    { step: 1, title: "Note the Speaker Names", titleVi: "Ghi nhận tên người nói", description: "Before reading content, note how many speakers and their names. Usually 3-4 people.", descriptionVi: "Trước khi đọc nội dung, ghi nhận bao nhiêu người và tên họ. Thường 3-4 người." },
    { step: 2, title: "Track Who Responds to Whom", titleVi: "Theo dõi ai trả lời ai", description: "In chat, people respond to the message above. Follow the conversation thread.", descriptionVi: "Trong chat, mọi người trả lời tin nhắn phía trên. Theo dõi luồng hội thoại." },
    { step: 3, title: "Use Timestamps for Sequence Questions", titleVi: "Dùng mốc thời gian cho câu hỏi thứ tự", description: "'At 2:15 PM, what does Ms. Park mean?' → find the 2:15 PM message by Ms. Park.", descriptionVi: "'Lúc 2:15 PM, Ms. Park có ý gì?' → tìm tin nhắn 2:15 PM của Ms. Park." },
  ],
  practiceSet: [
    { context: "3:25 - Park: Two suppliers still have not sent their figures.\n3:28 - Lee: Should we hire a freelancer?\n3:30 - Kim: That will not solve the missing data. Let us extend the deadline by one week.\n3:31 - Park: Agreed. I will update the calendar.", contextVi: "3:25 - Park: Hai nhà cung cấp chưa gửi số liệu.\n3:28 - Lee: Thuê freelancer nhé?\n3:30 - Kim: Không giải quyết dữ liệu thiếu. Gia hạn một tuần nhé.\n3:31 - Park: Đồng ý. Tôi cập nhật lịch.", question: "What does Ms. Kim suggest at 3:30 PM?", options: ["Canceling the project", "Extending the deadline by one week", "Hiring a freelancer", "Having a meeting"], answer: 1, explanation: "Find Ms. Kim's message at 3:30 PM specifically - don't confuse with other speakers.", explanationVi: "Tìm tin nhắn của Ms. Kim lúc 3:30 PM cụ thể - đừng nhầm với người khác." },
  ],
  businessContext: "Online chat (Slack, Teams, etc.) is now the primary communication tool in modern offices. TOEIC reflects this real-world shift in its Part 7 passages.",
  businessContextVi: "Chat online (Slack, Teams, v.v.) là công cụ giao tiếp chính trong văn phòng hiện đại. TOEIC phản ánh xu hướng thực tế này trong Part 7.",
  proSpeedTip: "For 'What does X mean when writing Y?' questions - read the message BEFORE and AFTER to understand context, not just the quoted message.",
  proSpeedTipVi: "Với câu 'X có ý gì khi viết Y?' - đọc tin nhắn TRƯỚC và SAU để hiểu ngữ cảnh, không chỉ tin nhắn được trích.",
  vocabHighlights: [
    { word: "thread", definition: "a chain of related messages", definitionVi: "chuỗi tin nhắn liên quan", example: "Check the email thread for context.", businessContext: "Digital communication" },
    { word: "follow up", definition: "to continue or check on something", definitionVi: "theo dõi tiếp", example: "I'll follow up with the client tomorrow.", businessContext: "Project management" },
  ],
  quiz: [
    { question: "In online chat passages, the first thing to note is:", options: ["The chat platform name", "Speaker names and count", "Message length", "Emoji usage"], answer: 1, explanation: "Knowing WHO is speaking is the foundation for tracking the conversation." },
    { question: "Timestamps in chat passages help with:", options: ["Grammar questions", "Sequence/timing questions", "Vocabulary questions", "Spelling checks"], answer: 1, explanation: "Timestamps show the ORDER of events - critical for 'When did X happen?' questions." },
    { question: "'What does X mean when writing Y?' requires reading:", options: ["Only the quoted message", "Messages before AND after", "The first message only", "The last message only"], answer: 1, explanation: "Context from surrounding messages is needed to interpret meaning." },
    { question: "Online chat passages typically have:", options: ["1 speaker", "2 speakers", "3-4 speakers", "10+ speakers"], answer: 2, explanation: "TOEIC chat passages usually feature 3-4 speakers in a group discussion." },
  ],
  cheatSheetPoints: [
    "Note speaker names FIRST before reading content",
    "Track who responds to whom in the thread",
    "Timestamps = key for sequence questions",
    "'What does X mean?' → read messages BEFORE and AFTER",
    "3-4 speakers is standard - don't mix up attributions",
  ],
  isNew: true,
};

// === LESSON 18: Vocabulary - Common Synonyms ===
const vocabSynonyms: ToeicLecture = {
  id: "toeic-vocab-synonyms",
  title: "Common Synonyms in TOEIC (Paraphrasing Power-up)",
  titleVi: "Từ đồng nghĩa thường gặp (Nâng cấp kỹ năng Paraphrasing)",
  category: "business-vocab",
  parts: ["All Parts"],
  icon: "🔄",
  duration: "25 min",
  level: "intermediate",
  targetScore: "600+",
  description: "Build your synonym bank - the single most important skill for scoring high across ALL TOEIC parts.",
  descriptionVi: "Xây dựng ngân hàng từ đồng nghĩa - kỹ năng quan trọng nhất để đạt điểm cao TẤT CẢ parts.",
  trapAlerts: [
    { trap: "Thinking synonyms are always interchangeable", trapVi: "Nghĩ từ đồng nghĩa luôn thay thế được", why: "'Big' and 'large' are synonyms, but you say 'big sister' not 'large sister'.", whyVi: "'Big' và 'large' đồng nghĩa, nhưng nói 'big sister' không phải 'large sister'." },
    { trap: "Only knowing one synonym per word", trapVi: "Chỉ biết một từ đồng nghĩa cho mỗi từ", why: "TOEIC uses CHAINS: purchase → buy → acquire → obtain → get.", whyVi: "TOEIC dùng CHUỖI: purchase → buy → acquire → obtain → get." },
  ],
  coreTechnique: [
    { step: 1, title: "Learn Synonym Chains, Not Pairs", titleVi: "Học chuỗi đồng nghĩa, không phải cặp", description: "Instead of just 'big=large', learn: substantial, considerable, significant, sizeable.", descriptionVi: "Thay vì chỉ 'big=large', học: substantial, considerable, significant, sizeable." },
    { step: 2, title: "Group by Business Theme", titleVi: "Nhóm theo chủ đề kinh doanh", description: "Money: cost/price/fee/charge/rate. Meeting: discuss/address/review/go over.", descriptionVi: "Tiền: cost/price/fee/charge/rate. Họp: discuss/address/review/go over." },
    { step: 3, title: "Practice Reverse Paraphrasing", titleVi: "Luyện paraphrasing ngược", description: "Read a sentence, then rewrite it using ALL synonyms. This builds active recall.", descriptionVi: "Đọc một câu, rồi viết lại dùng TẤT CẢ từ đồng nghĩa. Xây dựng trí nhớ chủ động." },
  ],
  practiceSet: [
    { context: "Part 7 passage", contextVi: "Đoạn văn Part 7", question: "'The company will ACQUIRE a new subsidiary.' Which is closest in meaning?", options: ["sell", "purchase", "lose", "donate"], answer: 1, explanation: "acquire = purchase = buy. In business context, acquiring a company means buying it.", explanationVi: "acquire = purchase = buy. Trong kinh doanh, acquire a company nghĩa là mua công ty." },
    { context: "Part 5", contextVi: "Part 5", question: "'Employees must _____ to the new policy.' Which fits?", options: ["comply", "agree", "accept", "follow"], answer: 0, explanation: "'Comply with' is the correct collocation for policies/regulations.", explanationVi: "'Comply with' là kết hợp đúng cho policies/regulations." },
  ],
  businessContext: "Synonym knowledge is the foundation of professional communication: drafting emails without repetition, understanding legal contracts with formal language, and interpreting reports.",
  businessContextVi: "Kiến thức từ đồng nghĩa là nền tảng giao tiếp chuyên nghiệp: viết email không lặp từ, hiểu hợp đồng pháp lý, diễn giải báo cáo.",
  proSpeedTip: "In Part 7, if the answer uses the EXACT same word as the passage, it's usually wrong. The correct answer paraphrases.",
  proSpeedTipVi: "Trong Part 7, nếu đáp án dùng ĐÚNG từ trong bài, thường sai. Đáp án đúng paraphrase.",
  vocabHighlights: [
    { word: "obtain → get → acquire → procure", definition: "all mean 'to receive/get'", definitionVi: "đều nghĩa 'nhận/lấy'", example: "Please obtain approval before proceeding.", businessContext: "Procurement" },
    { word: "postpone → delay → defer → put off", definition: "all mean 'to do later'", definitionVi: "đều nghĩa 'làm sau'", example: "The meeting has been postponed.", businessContext: "Scheduling" },
    { word: "notify → inform → advise → let know", definition: "all mean 'to tell'", definitionVi: "đều nghĩa 'thông báo'", example: "Please notify all staff of the change.", businessContext: "Communication" },
    { word: "sufficient → enough → adequate → ample", definition: "all mean 'enough quantity'", definitionVi: "đều nghĩa 'đủ'", example: "We have sufficient inventory.", businessContext: "Supply chain" },
  ],
  quiz: [
    { question: "'Acquire' in business most commonly means:", options: ["To lose", "To purchase/obtain", "To sell", "To destroy"], answer: 1, explanation: "Acquire = purchase/obtain, especially for companies or assets." },
    { question: "Which synonym chain is correct?", options: ["big → small → medium", "postpone → delay → defer", "buy → sell → return", "open → close → lock"], answer: 1, explanation: "Postpone/delay/defer all mean 'to do later'." },
    { question: "In TOEIC, correct answers usually:", options: ["Copy exact words from the passage", "Paraphrase using synonyms", "Add new information", "Contradict the passage"], answer: 1, explanation: "TOEIC correct answers paraphrase - this is why synonyms are crucial." },
    { question: "'Comply with' is used with:", options: ["People", "Policies and regulations", "Food", "Weather"], answer: 1, explanation: "'Comply with' collocates with rules, policies, regulations, requirements." },
  ],
  cheatSheetPoints: [
    "Learn synonym CHAINS not pairs: obtain→get→acquire→procure",
    "Group by theme: Money, Meetings, Communication, Time",
    "TOEIC correct answers = paraphrased, not copied",
    "Know collocations: comply WITH, adhere TO, abide BY",
    "Practice reverse paraphrasing for active recall",
  ],
  isNew: true,
};

// === LESSON 19: Vocabulary - Office Equipment & Supply Chain ===
const vocabOfficeSupply: ToeicLecture = {
  id: "toeic-vocab-office-supply",
  title: "Office Equipment & Supply Chain Vocabulary",
  titleVi: "Từ vựng Thiết bị Văn phòng & Chuỗi Cung ứng",
  category: "business-vocab",
  parts: ["Part 1", "Part 3", "Part 7"],
  icon: "🏢",
  duration: "20 min",
  level: "foundation",
  targetScore: "450+",
  description: "Essential vocabulary for TOEIC's most common setting: the modern office and supply chain operations.",
  descriptionVi: "Từ vựng thiết yếu cho bối cảnh phổ biến nhất TOEIC: văn phòng hiện đại và vận hành chuỗi cung ứng.",
  trapAlerts: [
    { trap: "Confusing 'stationery' (office supplies) with 'stationary' (not moving)", trapVi: "Nhầm 'stationery' (văn phòng phẩm) với 'stationary' (đứng yên)", why: "These homophones are classic TOEIC traps, especially in Part 1.", whyVi: "Từ đồng âm này là bẫy TOEIC kinh điển, đặc biệt Part 1." },
    { trap: "Not knowing supply chain verbs: dispatch, warehouse, invoice", trapVi: "Không biết động từ chuỗi cung ứng: dispatch, warehouse, invoice", why: "Supply chain vocab appears in Part 3/4 conversations and Part 7 passages.", whyVi: "Từ vựng chuỗi cung ứng xuất hiện trong hội thoại Part 3/4 và bài đọc Part 7." },
  ],
  coreTechnique: [
    { step: 1, title: "Learn by Zone: Office → Warehouse → Delivery", titleVi: "Học theo khu vực: Văn phòng → Kho → Giao hàng", description: "Office: copier, filing cabinet, cubicle. Warehouse: forklift, pallet, loading dock. Delivery: shipment, courier, tracking number.", descriptionVi: "VP: máy photocopy, tủ hồ sơ, ngăn làm việc. Kho: xe nâng, pallet, bến xếp hàng. Giao hàng: lô hàng, chuyển phát, mã theo dõi." },
    { step: 2, title: "Learn Verbs + Nouns Together", titleVi: "Học Động từ + Danh từ cùng nhau", description: "place an ORDER, process a SHIPMENT, issue an INVOICE, file a REPORT.", descriptionVi: "đặt ĐƠN HÀNG, xử lý LÔ HÀNG, xuất HÓA ĐƠN, nộp BÁO CÁO." },
    { step: 3, title: "Visualize the Supply Chain Flow", titleVi: "Hình dung dòng chảy chuỗi cung ứng", description: "Order → Manufacture → Warehouse → Ship → Deliver → Invoice → Payment.", descriptionVi: "Đặt hàng → Sản xuất → Lưu kho → Vận chuyển → Giao hàng → Hóa đơn → Thanh toán." },
  ],
  practiceSet: [
    { context: "Part 1 photo", contextVi: "Hình Part 1", question: "A woman is organizing _____ in the supply room.", options: ["stationery", "stationary", "machinery", "furniture"], answer: 0, explanation: "Stationery (with -ery) = office supplies. Stationary (with -ary) = not moving.", explanationVi: "Stationery (với -ery) = văn phòng phẩm. Stationary (với -ary) = đứng yên." },
    { context: "Part 7 email", contextVi: "Email Part 7", question: "The shipment was _____ due to customs delays.", options: ["placed", "held up", "invoiced", "manufactured"], answer: 1, explanation: "'Held up' = delayed. Shipments are commonly held up at customs.", explanationVi: "'Held up' = bị trì hoãn. Lô hàng thường bị giữ lại ở hải quan." },
  ],
  businessContext: "Office and supply chain vocabulary is the backbone of TOEIC - these words appear in every section because they reflect daily business operations globally.",
  businessContextVi: "Từ vựng văn phòng và chuỗi cung ứng là xương sống TOEIC - xuất hiện mọi phần vì phản ánh hoạt động kinh doanh hàng ngày toàn cầu.",
  proSpeedTip: "In Part 1, if you see a photo of shelves/boxes/equipment - immediately think supply chain vocabulary.",
  proSpeedTipVi: "Trong Part 1, nếu thấy hình kệ/hộp/thiết bị - nghĩ ngay từ vựng chuỗi cung ứng.",
  vocabHighlights: [
    { word: "inventory", definition: "stock of goods", definitionVi: "hàng tồn kho", example: "We need to check the inventory.", businessContext: "Warehouse management" },
    { word: "invoice", definition: "a bill for goods/services", definitionVi: "hóa đơn", example: "The invoice was sent to the client.", businessContext: "Accounting" },
    { word: "dispatch", definition: "to send out", definitionVi: "gửi đi, điều phối", example: "The order was dispatched yesterday.", businessContext: "Logistics" },
    { word: "procurement", definition: "the process of buying supplies", definitionVi: "mua sắm, thu mua", example: "The procurement department handles all purchases.", businessContext: "Purchasing" },
  ],
  quiz: [
    { question: "'Stationery' refers to:", options: ["Not moving", "Office supplies (pens, paper)", "A train station", "A standing desk"], answer: 1, explanation: "Stationery (-ery) = office supplies. Stationary (-ary) = not moving." },
    { question: "The correct order in supply chain is:", options: ["Ship→Order→Invoice", "Order→Ship→Invoice", "Invoice→Order→Ship", "Ship→Invoice→Order"], answer: 1, explanation: "Order first, then ship the goods, then send the invoice for payment." },
    { question: "'Held up at customs' means:", options: ["Celebrated", "Delayed", "Lost", "Returned"], answer: 1, explanation: "'Held up' = delayed/stopped. Common in international shipping." },
    { question: "'Procurement' is related to:", options: ["Selling", "Buying/purchasing", "Marketing", "Hiring"], answer: 1, explanation: "Procurement = the process of acquiring/purchasing goods and services." },
  ],
  cheatSheetPoints: [
    "stationERY = supplies, stationARY = not moving",
    "Supply chain flow: Order→Manufacture→Warehouse→Ship→Deliver→Invoice→Pay",
    "Key verbs: place(order), process(shipment), issue(invoice), file(report)",
    "3 zones: Office(copier,cubicle) + Warehouse(forklift,pallet) + Delivery(courier,tracking)",
    "Part 1 shelves/boxes photo = supply chain vocab alert",
  ],
  isNew: true,
};

// === LESSON 20: Exam Strategy - The No-Wait Method ===
const noWaitMethod: ToeicLecture = {
  id: "toeic-no-wait-method",
  title: "The 'No-Wait' Method: Part 4 to Part 5 Seamless Transition",
  titleVi: "Phương pháp 'Không Chờ': Chuyển từ Part 4 sang Part 5 mượt mà",
  category: "speed-hacks",
  parts: ["Part 4", "Part 5"],
  icon: "⚡",
  duration: "15 min",
  level: "intermediate",
  targetScore: "600+",
  description: "The critical 30-second transition from Listening to Reading that determines your final score.",
  descriptionVi: "30 giây chuyển tiếp quan trọng từ Nghe sang Đọc quyết định điểm số cuối cùng.",
  trapAlerts: [
    { trap: "Spending time reviewing Listening answers after Part 4 ends", trapVi: "Dành thời gian xem lại đáp án Listening sau khi Part 4 kết thúc", why: "You CANNOT change Listening answers. Every second spent reviewing is stolen from Reading.", whyVi: "KHÔNG THỂ đổi đáp án Listening. Mỗi giây xem lại là mất từ Reading." },
    { trap: "Starting Part 5 slowly because you're mentally tired", trapVi: "Bắt đầu Part 5 chậm vì mệt tinh thần", why: "Part 5 is your FASTEST section - aim for 30 questions in 10 minutes.", whyVi: "Part 5 là phần NHANH NHẤT - mục tiêu 30 câu trong 10 phút." },
  ],
  coreTechnique: [
    { step: 1, title: "Finish Listening Before Starting Reading", titleVi: "Hoàn thành Listening trước khi bắt đầu Reading", description: "Keep listening to the final Part 4 talk and answer its questions. Begin Reading only when the proctor or test interface authorizes it; do not work on another section early.", descriptionVi: "Tiếp tục nghe bài nói cuối Part 4 và trả lời đủ câu hỏi. Chỉ bắt đầu Reading khi giám thị hoặc hệ thống cho phép; không làm phần khác trước giờ." },
    { step: 2, title: "The 20-Second Rule for Part 5", titleVi: "Quy tắc 20 giây cho Part 5", description: "Each Part 5 question should take max 20 seconds. If stuck, eliminate unsupported options, mark your best remaining choice and move on; C has no special advantage.", descriptionVi: "Mỗi câu Part 5 tối đa 20 giây. Nếu kẹt, loại phương án thiếu căn cứ, chọn đáp án tốt nhất còn lại rồi đi tiếp; C không có lợi thế đặc biệt." },
    { step: 3, title: "Save 35+ Minutes for Part 7", titleVi: "Dành 35+ phút cho Part 7", description: "Part 5: 10 min. Part 6: 10 min. Part 7: 55 min. This is the winning distribution.", descriptionVi: "Part 5: 10 phút. Part 6: 10 phút. Part 7: 55 phút. Đây là phân bổ chiến thắng." },
  ],
  practiceSet: [
    { context: "Time management", contextVi: "Quản lý thời gian", question: "If Part 4 ends at minute 45 and Reading starts, how should you allocate 75 minutes?", options: ["Part 5: 25min, Part 6: 25min, Part 7: 25min", "Part 5: 10min, Part 6: 10min, Part 7: 55min", "Part 5: 5min, Part 6: 5min, Part 7: 65min", "Spend equal time on each question"], answer: 1, explanation: "10-10-55 is optimal: Part 5 is fast grammar, Part 7 needs the most time for reading.", explanationVi: "10-10-55 là tối ưu: Part 5 là ngữ pháp nhanh, Part 7 cần nhiều thời gian nhất để đọc." },
  ],
  businessContext: "Time management and seamless transitions are essential business skills - moving between tasks efficiently, prioritizing high-value work, and not dwelling on past decisions.",
  businessContextVi: "Quản lý thời gian và chuyển tiếp mượt mà là kỹ năng kinh doanh thiết yếu - chuyển giữa công việc hiệu quả, ưu tiên việc giá trị cao.",
  proSpeedTip: "The moment Part 4 audio ends, IMMEDIATELY flip to Part 5. Don't look back. Your Listening answers are locked.",
  proSpeedTipVi: "Ngay khi audio Part 4 kết thúc, LẬP TỨC lật sang Part 5. Đừng nhìn lại. Đáp án Listening đã khóa.",
  vocabHighlights: [
    { word: "allocate", definition: "to distribute/assign", definitionVi: "phân bổ", example: "Allocate more time to Part 7.", businessContext: "Resource management" },
    { word: "prioritize", definition: "to rank by importance", definitionVi: "ưu tiên", example: "Prioritize difficult questions.", businessContext: "Time management" },
  ],
  quiz: [
    { question: "After Part 4 ends, you should:", options: ["Review Listening answers", "Immediately start Part 5", "Take a break", "Read the instructions"], answer: 1, explanation: "Listening answers are locked. Every second counts for Reading." },
    { question: "Optimal Reading time distribution:", options: ["Equal across parts", "Part 5: 10, Part 6: 10, Part 7: 55", "All time on Part 7", "Part 5: 30, Part 6: 30, Part 7: 15"], answer: 1, explanation: "10-10-55 gives Part 7 the most time since it has the most passages." },
    { question: "Max time per Part 5 question:", options: ["5 seconds", "20 seconds", "1 minute", "2 minutes"], answer: 1, explanation: "20 seconds max. Part 5 is grammar - you either know it or you don't." },
    { question: "If stuck on a Part 5 question:", options: ["Spend 2 minutes thinking", "Mark best guess and move on", "Skip entirely", "Ask the proctor"], answer: 1, explanation: "Mark and move - time saved goes to Part 7 where it's more valuable." },
  ],
  cheatSheetPoints: [
    "Part 4 ends → IMMEDIATELY flip to Part 5. No looking back.",
    "Time budget: Part 5 (10min) + Part 6 (10min) + Part 7 (55min)",
    "Part 5: max 20 seconds per question",
    "If stuck → eliminate distractors → best guess → move on",
    "Finish Part 4; begin Reading only when authorized",
  ],
  isNew: true,
};

// Export all TOEIC lectures
import { toeicExpansionLectures } from "./toeicLecturesExpansion";
import { toeicExpansion2Lectures } from "./toeicLecturesExpansion2";
import { toeicLecturesExpansion3 } from "./toeicLecturesExpansion3";
import { toeicLecturesExpansion4 } from "./toeicLecturesExpansion4";

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
  part2Indirect,
  part3PreRead,
  part5RelativeClauses,
  part5Subjunctive,
  part6TextCompletion,
  part7Inference,
  part7OnlineChat,
  vocabSynonyms,
  vocabOfficeSupply,
  noWaitMethod,
  ...toeicExpansionLectures,
  ...toeicExpansion2Lectures,
  ...toeicLecturesExpansion3,
  ...toeicLecturesExpansion4,
];

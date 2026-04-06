import type { LanguageModule } from "./types";

// TOEIC Expansion modules
const toeicExpansionModules: LanguageModule[] = [
  {
    id: "toeic-listening-exp",
    title: "TOEIC Nghe — Nâng cao",
    titleEn: "TOEIC Listening — Advanced",
    icon: "🎧",
    color: "from-blue-500 to-cyan-500",
    description: "Luyện nghe Part 3 & Part 4 nâng cao",
    descriptionEn: "Advanced listening practice for Part 3 & Part 4",
    category: "toeic",
    language: "english",
    lessons: [
      {
        id: "toeic-listen-part3",
        title: "Part 3: Hội thoại ngắn",
        titleEn: "Part 3: Short Conversations",
        level: 3,
        difficulty: "intermediate",
        theory: `## Part 3: Short Conversations\n\nPart 3 gồm 13 đoạn hội thoại, mỗi đoạn có 3 câu hỏi. Bạn nghe 2-3 người nói chuyện trong môi trường công sở, cửa hàng, hoặc đời thường.\n\n### Chiến lược:\n1. **Đọc câu hỏi trước** khi audio bắt đầu\n2. **Xác định context**: Ai nói? Ở đâu? Về vấn đề gì?\n3. **Nghe keywords**: thời gian, địa điểm, lý do\n4. **Loại trừ đáp án sai** ngay khi nghe\n\n### Dạng câu hỏi phổ biến:\n- What does the man suggest?\n- Where does this conversation take place?\n- What will the woman probably do next?`,
        theoryEn: `## Part 3: Short Conversations\n\nPart 3 has 13 conversations, each with 3 questions. You listen to 2-3 people talking in office, store, or everyday settings.\n\n### Strategies:\n1. **Read questions first** before audio starts\n2. **Identify context**: Who's talking? Where? About what?\n3. **Listen for keywords**: time, place, reason\n4. **Eliminate wrong answers** while listening\n\n### Common question types:\n- What does the man suggest?\n- Where does this conversation take place?\n- What will the woman probably do next?`,
        proTips: [
          "Đọc nhanh 3 câu hỏi trong 8 giây pause giữa các đoạn",
          "Chú ý giọng điệu để đoán thái độ người nói"
        ],
        proTipsEn: [
          "Quickly read 3 questions during the 8-second pause between conversations",
          "Pay attention to tone to guess speaker attitudes"
        ],
        vocabulary: [
          { word: "reschedule", meaning: "dời lịch", meaningEn: "to change the time of", example: "We need to reschedule the meeting.", exampleEn: "We need to reschedule the meeting.", partOfSpeech: "verb" },
          { word: "in charge of", meaning: "phụ trách", meaningEn: "responsible for", example: "She is in charge of the project.", exampleEn: "She is in charge of the project.", partOfSpeech: "phrase" },
          { word: "deadline", meaning: "hạn chót", meaningEn: "the latest time for completion", example: "The deadline is next Friday.", exampleEn: "The deadline is next Friday.", partOfSpeech: "noun" },
          { word: "postpone", meaning: "hoãn lại", meaningEn: "to delay", example: "They decided to postpone the event.", exampleEn: "They decided to postpone the event.", partOfSpeech: "verb" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền từ đúng vào chỗ trống:",
            instructionEn: "Fill in the correct word:",
            sentences: [
              { text: "Can we ___ the appointment to next week?", textEn: "Can we ___ the appointment to next week?", answer: "reschedule", hint: "dời lịch" },
              { text: "Who is ___ ___ ___ the new marketing campaign?", textEn: "Who is ___ ___ ___ the new marketing campaign?", answer: "in charge of", hint: "phụ trách" },
              { text: "The ___ for submissions is March 15th.", textEn: "The ___ for submissions is March 15th.", answer: "deadline", hint: "hạn chót" }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp lại câu:",
            instructionEn: "Reorder the sentence:",
            items: [
              { scrambled: ["meeting", "the", "postpone", "to", "decided", "they"], correct: "They decided to postpone the meeting." },
              { scrambled: ["charge", "is", "she", "in", "of", "sales"], correct: "She is in charge of sales." }
            ]
          }
        ],
        quiz: [
          { question: "What does 'reschedule' mean?", options: ["Hủy bỏ", "Dời lịch", "Xác nhận", "Từ chối"], answer: 1, explanation: "'Reschedule' = dời lịch, sắp xếp lại thời gian." },
          { question: "In Part 3, how many questions per conversation?", options: ["2", "3", "4", "5"], answer: 1, explanation: "Mỗi đoạn hội thoại Part 3 có 3 câu hỏi." },
          { question: "'The deadline is approaching' means:", options: ["Hạn chót đã qua", "Hạn chót sắp đến", "Không có hạn chót", "Hạn chót bị hủy"], answer: 1, explanation: "'Approaching' = đang đến gần." }
        ]
      },
      {
        id: "toeic-listen-part4",
        title: "Part 4: Bài nói ngắn",
        titleEn: "Part 4: Short Talks",
        level: 4,
        difficulty: "advanced",
        theory: `## Part 4: Short Talks\n\nPart 4 gồm 10 bài nói đơn (monologue), mỗi bài có 3 câu hỏi. Các dạng phổ biến:\n- **Announcement**: thông báo tại sân bay, công ty\n- **Advertisement**: quảng cáo sản phẩm/dịch vụ\n- **News report**: bản tin\n- **Voicemail**: tin nhắn thoại\n- **Introduction**: giới thiệu diễn giả\n\n### Chiến lược:\n1. Xác định **dạng bài nói** từ câu đầu tiên\n2. Ghi nhớ **chi tiết số liệu**: giá, thời gian, số điện thoại\n3. Chú ý **câu cuối** — thường chứa đáp án "What will happen next?"`,
        theoryEn: `## Part 4: Short Talks\n\nPart 4 has 10 monologues, each with 3 questions. Common types:\n- **Announcement**: airport, company announcements\n- **Advertisement**: product/service ads\n- **News report**: news bulletins\n- **Voicemail**: voice messages\n- **Introduction**: speaker introductions\n\n### Strategies:\n1. Identify the **talk type** from the first sentence\n2. Remember **numerical details**: prices, times, phone numbers\n3. Pay attention to **the last sentence** — often contains "What will happen next?" answers`,
        proTips: [
          "Câu hỏi 'What is the purpose of this talk?' — nghe 2 câu đầu tiên",
          "Câu hỏi graphic: đọc bảng/biểu đồ trước khi nghe"
        ],
        proTipsEn: [
          "'What is the purpose of this talk?' — listen to the first 2 sentences",
          "Graphic questions: read the table/chart before listening"
        ],
        vocabulary: [
          { word: "complimentary", meaning: "miễn phí (kèm theo)", meaningEn: "free, given as a courtesy", example: "Complimentary breakfast is included.", exampleEn: "Complimentary breakfast is included.", partOfSpeech: "adjective" },
          { word: "warranty", meaning: "bảo hành", meaningEn: "guarantee", example: "The product comes with a two-year warranty.", exampleEn: "The product comes with a two-year warranty.", partOfSpeech: "noun" },
          { word: "eligible", meaning: "đủ điều kiện", meaningEn: "qualified, entitled", example: "All employees are eligible for the discount.", exampleEn: "All employees are eligible for the discount.", partOfSpeech: "adjective" },
          { word: "upcoming", meaning: "sắp tới", meaningEn: "about to happen", example: "The upcoming conference will be in Seoul.", exampleEn: "The upcoming conference will be in Seoul.", partOfSpeech: "adjective" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền từ phù hợp:",
            instructionEn: "Fill in the appropriate word:",
            sentences: [
              { text: "All guests receive a ___ parking pass.", textEn: "All guests receive a ___ parking pass.", answer: "complimentary", hint: "miễn phí" },
              { text: "Only full-time staff are ___ for the bonus.", textEn: "Only full-time staff are ___ for the bonus.", answer: "eligible", hint: "đủ điều kiện" },
              { text: "Don't miss our ___ sale this weekend!", textEn: "Don't miss our ___ sale this weekend!", answer: "upcoming", hint: "sắp tới" }
            ]
          }
        ],
        quiz: [
          { question: "'Complimentary' in TOEIC usually means:", options: ["Khen ngợi", "Miễn phí", "Bắt buộc", "Đắt tiền"], answer: 1, explanation: "Trong ngữ cảnh TOEIC, 'complimentary' thường = miễn phí." },
          { question: "Part 4 is different from Part 3 because:", options: ["Có nhiều người nói hơn", "Chỉ có một người nói", "Không có câu hỏi", "Ngắn hơn Part 3"], answer: 1, explanation: "Part 4 là monologue (một người nói), Part 3 là dialogue." },
          { question: "What does 'warranty' mean?", options: ["Cảnh báo", "Bảo hành", "Hóa đơn", "Chiết khấu"], answer: 1, explanation: "'Warranty' = bảo hành sản phẩm." }
        ]
      }
    ]
  },
  {
    id: "toeic-reading-exp",
    title: "TOEIC Đọc — Nâng cao",
    titleEn: "TOEIC Reading — Advanced",
    icon: "📖",
    color: "from-indigo-500 to-blue-500",
    description: "Luyện đọc Part 6 & Part 7 chuyên sâu",
    descriptionEn: "Advanced reading practice for Part 6 & Part 7",
    category: "toeic",
    language: "english",
    lessons: [
      {
        id: "toeic-read-part6",
        title: "Part 6: Hoàn thành đoạn văn",
        titleEn: "Part 6: Text Completion",
        level: 3,
        difficulty: "intermediate",
        theory: `## Part 6: Text Completion\n\nPart 6 có 4 đoạn văn, mỗi đoạn 4 câu hỏi. Bạn chọn từ/cụm từ/câu phù hợp để hoàn thành đoạn.\n\n### Dạng câu hỏi:\n1. **Vocabulary**: chọn từ đúng nghĩa trong ngữ cảnh\n2. **Grammar**: chia động từ, giới từ, liên từ\n3. **Sentence insertion**: chèn câu phù hợp vào đoạn văn\n\n### Chiến lược:\n- Đọc **toàn bộ đoạn** trước khi trả lời\n- Chú ý **thì của các câu xung quanh**\n- Câu chèn: tìm **liên kết logic** (however, therefore, in addition)`,
        theoryEn: `## Part 6: Text Completion\n\nPart 6 has 4 passages, each with 4 questions. You choose words/phrases/sentences to complete the text.\n\n### Question types:\n1. **Vocabulary**: context-appropriate word choice\n2. **Grammar**: verb forms, prepositions, conjunctions\n3. **Sentence insertion**: insert an appropriate sentence\n\n### Strategies:\n- Read the **entire passage** before answering\n- Note the **tense of surrounding sentences**\n- For insertion: find **logical connectors** (however, therefore, in addition)`,
        vocabulary: [
          { word: "furthermore", meaning: "hơn nữa", meaningEn: "in addition, moreover", example: "Furthermore, we will provide free shipping.", exampleEn: "Furthermore, we will provide free shipping.", partOfSpeech: "adverb" },
          { word: "nevertheless", meaning: "tuy nhiên", meaningEn: "despite that", example: "The weather was bad. Nevertheless, we continued.", exampleEn: "The weather was bad. Nevertheless, we continued.", partOfSpeech: "adverb" },
          { word: "implement", meaning: "thực hiện, triển khai", meaningEn: "to put into effect", example: "We will implement the new policy next month.", exampleEn: "We will implement the new policy next month.", partOfSpeech: "verb" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chọn từ nối phù hợp:",
            instructionEn: "Choose the appropriate connector:",
            sentences: [
              { text: "Sales dropped last quarter. ___, we remain optimistic.", textEn: "Sales dropped last quarter. ___, we remain optimistic.", answer: "Nevertheless", hint: "tuy nhiên" },
              { text: "The plan was approved. ___, a budget was allocated.", textEn: "The plan was approved. ___, a budget was allocated.", answer: "Furthermore", hint: "hơn nữa" }
            ]
          }
        ],
        quiz: [
          { question: "Part 6 câu 'sentence insertion' yêu cầu:", options: ["Dịch câu sang tiếng Việt", "Chèn câu phù hợp vào đoạn văn", "Viết lại câu", "Tìm lỗi sai"], answer: 1, explanation: "Sentence insertion = chọn câu phù hợp nhất để chèn vào chỗ trống trong đoạn." },
          { question: "'Nevertheless' is closest in meaning to:", options: ["Therefore", "However", "Because", "Finally"], answer: 1, explanation: "'Nevertheless' = 'however' = tuy nhiên, mặc dù vậy." },
          { question: "Best strategy for Part 6:", options: ["Chỉ đọc câu có chỗ trống", "Đọc toàn bộ đoạn trước", "Đọc câu hỏi trước", "Bỏ qua phần đọc"], answer: 1, explanation: "Cần đọc toàn bộ đoạn để hiểu ngữ cảnh." }
        ]
      },
      {
        id: "toeic-read-part7",
        title: "Part 7: Đọc hiểu đoạn văn",
        titleEn: "Part 7: Reading Comprehension",
        level: 4,
        difficulty: "advanced",
        theory: `## Part 7: Reading Comprehension\n\nPart 7 gồm các bài đọc đơn, đôi và ba, với tổng 54 câu hỏi.\n\n### Dạng bài:\n- **Email/Letter**: thư tín công việc\n- **Advertisement**: quảng cáo\n- **Article**: bài báo\n- **Chat messages**: tin nhắn\n- **Multiple passages**: 2-3 bài liên quan\n\n### Kỹ năng cần:\n1. **Skimming**: đọc lướt tìm ý chính\n2. **Scanning**: tìm thông tin cụ thể\n3. **Inference**: suy luận từ ngữ cảnh\n4. **Cross-referencing**: đối chiếu giữa các bài đọc`,
        theoryEn: `## Part 7: Reading Comprehension\n\nPart 7 has single, double, and triple passages with 54 questions total.\n\n### Text types:\n- **Email/Letter**: business correspondence\n- **Advertisement**: ads\n- **Article**: news articles\n- **Chat messages**: text messages\n- **Multiple passages**: 2-3 related texts\n\n### Key skills:\n1. **Skimming**: quick reading for main ideas\n2. **Scanning**: finding specific information\n3. **Inference**: deducing from context\n4. **Cross-referencing**: comparing between passages`,
        vocabulary: [
          { word: "inquire", meaning: "hỏi thăm", meaningEn: "to ask for information", example: "I am writing to inquire about the position.", exampleEn: "I am writing to inquire about the position.", partOfSpeech: "verb" },
          { word: "attachment", meaning: "tệp đính kèm", meaningEn: "a file sent with an email", example: "Please see the attachment for details.", exampleEn: "Please see the attachment for details.", partOfSpeech: "noun" },
          { word: "approximately", meaning: "khoảng, xấp xỉ", meaningEn: "roughly, about", example: "The trip takes approximately two hours.", exampleEn: "The trip takes approximately two hours.", partOfSpeech: "adverb" }
        ],
        exercises: [
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp lại câu email:",
            instructionEn: "Reorder the email sentence:",
            items: [
              { scrambled: ["writing", "I", "am", "inquire", "to", "about", "the", "vacancy"], correct: "I am writing to inquire about the vacancy." },
              { scrambled: ["find", "please", "the", "attached", "document"], correct: "Please find the attached document." }
            ]
          }
        ],
        quiz: [
          { question: "'Skimming' means:", options: ["Đọc từng từ", "Đọc lướt tìm ý chính", "Đọc to lên", "Dịch sang tiếng Việt"], answer: 1, explanation: "Skimming = đọc lướt nhanh để nắm ý chính." },
          { question: "Part 7 triple passages require:", options: ["Chỉ đọc bài đầu", "Đối chiếu thông tin giữa 3 bài", "Viết tóm tắt", "Nghe audio"], answer: 1, explanation: "Triple passages yêu cầu cross-referencing giữa 3 bài đọc." },
          { question: "'Please see the attachment' is common in:", options: ["Quảng cáo", "Tin nhắn chat", "Email công việc", "Bài báo"], answer: 2, explanation: "Đây là cụm từ phổ biến trong email công việc." }
        ]
      }
    ]
  }
];

// IELTS Expansion modules
const ieltsExpansionModules: LanguageModule[] = [
  {
    id: "ielts-speaking-exp",
    title: "IELTS Nói — Nâng cao",
    titleEn: "IELTS Speaking — Advanced",
    icon: "🎙️",
    color: "from-purple-500 to-pink-500",
    description: "Luyện Speaking Part 2 Cue Cards & Part 3 Discussion",
    descriptionEn: "Practice Speaking Part 2 Cue Cards & Part 3 Discussion",
    category: "ielts",
    language: "english",
    lessons: [
      {
        id: "ielts-speak-part2",
        title: "Part 2: Cue Cards",
        titleEn: "Part 2: Cue Cards",
        level: 3,
        difficulty: "intermediate",
        theory: `## IELTS Speaking Part 2: Cue Cards\n\nBạn có 1 phút chuẩn bị và 1-2 phút nói về chủ đề trên thẻ.\n\n### Cấu trúc trả lời:\n1. **Introduction**: Giới thiệu chủ đề (1-2 câu)\n2. **Description**: Mô tả chi tiết theo các bullet points\n3. **Feelings/Opinion**: Cảm nhận, ý kiến cá nhân\n4. **Conclusion**: Kết luận ngắn\n\n### Mẹo:\n- Ghi **keywords** trong 1 phút chuẩn bị, KHÔNG ghi câu đầy đủ\n- Dùng **linking words**: First of all, Moreover, What I found interesting was...\n- Nói **tự nhiên**, không cần hoàn hảo\n- Kể **câu chuyện cá nhân** để dễ nói hơn`,
        theoryEn: `## IELTS Speaking Part 2: Cue Cards\n\nYou have 1 minute to prepare and 1-2 minutes to speak about the topic on the card.\n\n### Answer structure:\n1. **Introduction**: Introduce the topic (1-2 sentences)\n2. **Description**: Describe in detail following the bullet points\n3. **Feelings/Opinion**: Personal feelings and opinions\n4. **Conclusion**: Brief conclusion\n\n### Tips:\n- Write **keywords** during the 1-minute preparation, NOT full sentences\n- Use **linking words**: First of all, Moreover, What I found interesting was...\n- Speak **naturally**, perfection isn't required\n- Tell **personal stories** to make it easier`,
        proTips: ["Luôn kể thêm chi tiết: Ai? Ở đâu? Khi nào? Tại sao?", "Nếu hết ý, nói về cảm xúc và so sánh với trải nghiệm khác"],
        proTipsEn: ["Always add details: Who? Where? When? Why?", "If you run out of ideas, talk about feelings and compare with other experiences"],
        vocabulary: [
          { word: "vividly", meaning: "sinh động", meaningEn: "in a very clear way", example: "I remember it vividly.", exampleEn: "I remember it vividly.", partOfSpeech: "adverb" },
          { word: "memorable", meaning: "đáng nhớ", meaningEn: "worth remembering", example: "It was a truly memorable experience.", exampleEn: "It was a truly memorable experience.", partOfSpeech: "adjective" },
          { word: "fascinating", meaning: "hấp dẫn, thú vị", meaningEn: "extremely interesting", example: "The museum was absolutely fascinating.", exampleEn: "The museum was absolutely fascinating.", partOfSpeech: "adjective" }
        ],
        exercises: [
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp thành câu mở đầu Part 2:",
            instructionEn: "Reorder into a Part 2 opening sentence:",
            items: [
              { scrambled: ["like", "I'd", "about", "talk", "to", "a", "memorable", "trip"], correct: "I'd like to talk about a memorable trip." },
              { scrambled: ["vividly", "remember", "I", "the", "experience", "quite"], correct: "I remember the experience quite vividly." }
            ]
          }
        ],
        quiz: [
          { question: "Thời gian chuẩn bị cho Part 2:", options: ["30 giây", "1 phút", "2 phút", "Không có"], answer: 1, explanation: "Bạn có đúng 1 phút để chuẩn bị." },
          { question: "Trong 1 phút chuẩn bị, nên:", options: ["Viết câu đầy đủ", "Ghi keywords", "Không ghi gì", "Hỏi giám khảo"], answer: 1, explanation: "Ghi keywords giúp nhớ ý mà không bị đọc." },
          { question: "'Memorable' means:", options: ["Thường xuyên", "Đáng nhớ", "Buồn chán", "Bình thường"], answer: 1, explanation: "'Memorable' = đáng nhớ, ấn tượng." }
        ]
      },
      {
        id: "ielts-speak-part3",
        title: "Part 3: Thảo luận",
        titleEn: "Part 3: Discussion",
        level: 4,
        difficulty: "advanced",
        theory: `## IELTS Speaking Part 3: Discussion\n\nGiám khảo hỏi các câu hỏi trừu tượng, mang tính xã hội liên quan đến chủ đề Part 2.\n\n### Kỹ năng cần:\n1. **Mở rộng ý kiến**: Đưa ra lý do + ví dụ\n2. **So sánh**: past vs present, country vs country\n3. **Đề xuất giải pháp**: cho vấn đề xã hội\n4. **Phản biện**: In my view... / On the other hand...\n\n### Cấu trúc trả lời:\n- **State opinion**: I believe / In my view...\n- **Explain**: This is because... / The reason is...\n- **Example**: For instance... / Take X as an example...\n- **Conclude**: So overall... / That's why I think...`,
        theoryEn: `## IELTS Speaking Part 3: Discussion\n\nThe examiner asks abstract, society-level questions related to the Part 2 topic.\n\n### Skills needed:\n1. **Expanding opinions**: Give reasons + examples\n2. **Comparing**: past vs present, country vs country\n3. **Suggesting solutions**: for social issues\n4. **Contrasting views**: In my view... / On the other hand...\n\n### Answer structure:\n- **State opinion**: I believe / In my view...\n- **Explain**: This is because... / The reason is...\n- **Example**: For instance... / Take X as an example...\n- **Conclude**: So overall... / That's why I think...`,
        vocabulary: [
          { word: "undeniably", meaning: "không thể phủ nhận", meaningEn: "without doubt", example: "Technology has undeniably changed education.", exampleEn: "Technology has undeniably changed education.", partOfSpeech: "adverb" },
          { word: "controversial", meaning: "gây tranh cãi", meaningEn: "causing disagreement", example: "This is a controversial issue.", exampleEn: "This is a controversial issue.", partOfSpeech: "adjective" },
          { word: "perspective", meaning: "góc nhìn", meaningEn: "point of view", example: "From my perspective, education is key.", exampleEn: "From my perspective, education is key.", partOfSpeech: "noun" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Hoàn thành câu trả lời Part 3:",
            instructionEn: "Complete the Part 3 answer:",
            sentences: [
              { text: "From my ___, technology has more benefits than drawbacks.", textEn: "From my ___, technology has more benefits than drawbacks.", answer: "perspective", hint: "góc nhìn" },
              { text: "It is ___ that climate change affects everyone.", textEn: "It is ___ that climate change affects everyone.", answer: "undeniably", hint: "không thể phủ nhận" }
            ]
          }
        ],
        quiz: [
          { question: "Part 3 khác Part 1 ở chỗ:", options: ["Câu hỏi cá nhân", "Câu hỏi trừu tượng, xã hội", "Dùng thẻ cue card", "Chỉ nói 30 giây"], answer: 1, explanation: "Part 3 hỏi về các vấn đề trừu tượng, mang tính xã hội." },
          { question: "'Controversial' means:", options: ["Đồng ý", "Gây tranh cãi", "Đơn giản", "Rõ ràng"], answer: 1, explanation: "'Controversial' = gây tranh cãi, nhiều ý kiến khác nhau." },
          { question: "Best way to answer Part 3:", options: ["Nói ngắn gọn Yes/No", "Opinion + Reason + Example", "Đọc thuộc lòng", "Hỏi lại giám khảo"], answer: 1, explanation: "Cấu trúc Opinion + Reason + Example giúp câu trả lời đầy đủ." }
        ]
      }
    ]
  },
  {
    id: "ielts-writing-exp2",
    title: "IELTS Viết — Mở rộng",
    titleEn: "IELTS Writing — Expansion",
    icon: "✍️",
    color: "from-orange-500 to-red-500",
    description: "Task 1 Charts/Maps & Task 2 Agree/Disagree",
    descriptionEn: "Task 1 Charts/Maps & Task 2 Agree/Disagree essays",
    category: "ielts",
    language: "english",
    lessons: [
      {
        id: "ielts-write-charts",
        title: "Task 1: Biểu đồ & Bản đồ",
        titleEn: "Task 1: Charts & Maps",
        level: 3,
        difficulty: "intermediate",
        theory: `## Task 1: Charts & Maps\n\n### Biểu đồ (Charts/Graphs)\nMô tả xu hướng, so sánh dữ liệu:\n- **Introduction**: Paraphrase đề bài\n- **Overview**: 2 xu hướng chính\n- **Body 1**: Mô tả chi tiết nhóm 1\n- **Body 2**: Mô tả chi tiết nhóm 2\n\n### Bản đồ (Maps)\nMô tả thay đổi theo thời gian:\n- Dùng **passive voice**: A park was built...\n- Dùng **compare**: Previously... Now...\n- Nêu **hướng**: north, south, east, west`,
        theoryEn: `## Task 1: Charts & Maps\n\n### Charts/Graphs\nDescribe trends and compare data:\n- **Introduction**: Paraphrase the question\n- **Overview**: 2 key trends\n- **Body 1**: Detailed description of group 1\n- **Body 2**: Detailed description of group 2\n\n### Maps\nDescribe changes over time:\n- Use **passive voice**: A park was built...\n- Use **compare**: Previously... Now...\n- State **directions**: north, south, east, west`,
        vocabulary: [
          { word: "fluctuate", meaning: "dao động", meaningEn: "to rise and fall", example: "Prices fluctuated throughout the year.", exampleEn: "Prices fluctuated throughout the year.", partOfSpeech: "verb" },
          { word: "plateau", meaning: "ổn định ở mức cao", meaningEn: "to level off at a high point", example: "Sales plateaued at around 50,000.", exampleEn: "Sales plateaued at around 50,000.", partOfSpeech: "verb" },
          { word: "surge", meaning: "tăng vọt", meaningEn: "to increase sharply", example: "There was a surge in demand.", exampleEn: "There was a surge in demand.", partOfSpeech: "noun/verb" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Hoàn thành câu mô tả biểu đồ:",
            instructionEn: "Complete the chart description:",
            sentences: [
              { text: "The number of visitors ___ between 2010 and 2015.", textEn: "The number of visitors ___ between 2010 and 2015.", answer: "fluctuated", hint: "dao động" },
              { text: "After reaching a peak, the figure ___ at 200.", textEn: "After reaching a peak, the figure ___ at 200.", answer: "plateaued", hint: "ổn định" },
              { text: "There was a significant ___ in sales in Q4.", textEn: "There was a significant ___ in sales in Q4.", answer: "surge", hint: "tăng vọt" }
            ]
          }
        ],
        quiz: [
          { question: "Overview trong Task 1 nên nêu:", options: ["Tất cả số liệu", "2 xu hướng chính", "Ý kiến cá nhân", "Kết luận"], answer: 1, explanation: "Overview nêu 2 xu hướng/đặc điểm nổi bật nhất." },
          { question: "'Fluctuate' means:", options: ["Tăng mạnh", "Giảm mạnh", "Dao động lên xuống", "Ổn định"], answer: 2, explanation: "'Fluctuate' = dao động, lên xuống không đều." },
          { question: "Khi mô tả Maps, nên dùng:", options: ["Active voice", "Passive voice", "Imperative", "Question form"], answer: 1, explanation: "Maps thường dùng passive voice: A road was constructed." }
        ]
      },
      {
        id: "ielts-write-agree",
        title: "Task 2: Đồng ý / Không đồng ý",
        titleEn: "Task 2: Agree or Disagree",
        level: 4,
        difficulty: "advanced",
        theory: `## Task 2: Agree or Disagree\n\n### Cấu trúc bài viết:\n1. **Introduction** (2-3 câu): Paraphrase + nêu quan điểm rõ ràng\n2. **Body 1**: Lý do 1 + giải thích + ví dụ\n3. **Body 2**: Lý do 2 + giải thích + ví dụ\n4. **Conclusion**: Nhắc lại quan điểm + tóm tắt\n\n### Cụm từ hữu ích:\n- I strongly agree/disagree with this statement.\n- From my perspective, ...\n- A compelling argument for this is...\n- To illustrate, ...`,
        theoryEn: `## Task 2: Agree or Disagree\n\n### Essay structure:\n1. **Introduction** (2-3 sentences): Paraphrase + clear stance\n2. **Body 1**: Reason 1 + explanation + example\n3. **Body 2**: Reason 2 + explanation + example\n4. **Conclusion**: Restate position + summary\n\n### Useful phrases:\n- I strongly agree/disagree with this statement.\n- From my perspective, ...\n- A compelling argument for this is...\n- To illustrate, ...`,
        vocabulary: [
          { word: "compelling", meaning: "thuyết phục", meaningEn: "convincing", example: "She made a compelling argument.", exampleEn: "She made a compelling argument.", partOfSpeech: "adjective" },
          { word: "outweigh", meaning: "vượt trội hơn", meaningEn: "to be greater than", example: "The benefits outweigh the drawbacks.", exampleEn: "The benefits outweigh the drawbacks.", partOfSpeech: "verb" },
          { word: "detrimental", meaning: "có hại", meaningEn: "harmful, damaging", example: "Smoking is detrimental to health.", exampleEn: "Smoking is detrimental to health.", partOfSpeech: "adjective" }
        ],
        exercises: [
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu introduction:",
            instructionEn: "Reorder the introduction sentence:",
            items: [
              { scrambled: ["believe", "I", "strongly", "that", "benefits", "the", "outweigh", "drawbacks", "the"], correct: "I strongly believe that the benefits outweigh the drawbacks." },
              { scrambled: ["compelling", "a", "argument", "is", "this", "for"], correct: "A compelling argument for this is." }
            ]
          }
        ],
        quiz: [
          { question: "Trong bài Agree/Disagree, Introduction cần:", options: ["Chỉ paraphrase", "Paraphrase + nêu quan điểm", "Nêu ví dụ", "Tóm tắt body"], answer: 1, explanation: "Introduction cần paraphrase đề bài VÀ nêu rõ quan điểm." },
          { question: "'Outweigh' means:", options: ["Bằng nhau", "Ít hơn", "Vượt trội hơn", "Không liên quan"], answer: 2, explanation: "'Outweigh' = vượt trội, nhiều hơn." },
          { question: "'Detrimental' is closest to:", options: ["Beneficial", "Harmful", "Neutral", "Important"], answer: 1, explanation: "'Detrimental' = có hại, gây tổn thương." }
        ]
      }
    ]
  },
  {
    id: "ielts-vocab-exp2",
    title: "IELTS Từ vựng — Chủ đề mới",
    titleEn: "IELTS Vocabulary — New Topics",
    icon: "📚",
    color: "from-teal-500 to-green-500",
    description: "Từ vựng chủ đề Health & Technology",
    descriptionEn: "Vocabulary for Health & Technology topics",
    category: "ielts",
    language: "english",
    lessons: [
      {
        id: "ielts-vocab-health",
        title: "Chủ đề: Sức khỏe",
        titleEn: "Topic: Health",
        level: 3,
        difficulty: "intermediate",
        theory: `## IELTS Vocabulary: Health\n\nChủ đề Health xuất hiện thường xuyên trong cả 4 kỹ năng IELTS.\n\n### Từ vựng theo nhóm:\n- **Diseases & conditions**: obesity, diabetes, mental health\n- **Treatment**: therapy, medication, surgery\n- **Prevention**: vaccination, hygiene, diet\n- **Healthcare system**: public health, insurance, clinic\n\n### Collocations:\n- maintain good health\n- lead a sedentary lifestyle\n- raise awareness about...`,
        theoryEn: `## IELTS Vocabulary: Health\n\nThe Health topic appears frequently across all 4 IELTS skills.\n\n### Vocabulary groups:\n- **Diseases & conditions**: obesity, diabetes, mental health\n- **Treatment**: therapy, medication, surgery\n- **Prevention**: vaccination, hygiene, diet\n- **Healthcare system**: public health, insurance, clinic\n\n### Collocations:\n- maintain good health\n- lead a sedentary lifestyle\n- raise awareness about...`,
        vocabulary: [
          { word: "sedentary", meaning: "ít vận động", meaningEn: "involving little physical activity", example: "A sedentary lifestyle leads to health problems.", exampleEn: "A sedentary lifestyle leads to health problems.", partOfSpeech: "adjective" },
          { word: "obesity", meaning: "béo phì", meaningEn: "the condition of being very overweight", example: "Obesity rates have risen dramatically.", exampleEn: "Obesity rates have risen dramatically.", partOfSpeech: "noun" },
          { word: "vaccination", meaning: "tiêm chủng", meaningEn: "immunization by vaccine", example: "Vaccination has saved millions of lives.", exampleEn: "Vaccination has saved millions of lives.", partOfSpeech: "noun" },
          { word: "well-being", meaning: "sức khỏe tổng thể", meaningEn: "the state of being comfortable and healthy", example: "Exercise improves mental well-being.", exampleEn: "Exercise improves mental well-being.", partOfSpeech: "noun" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền từ vựng chủ đề Health:",
            instructionEn: "Fill in Health vocabulary:",
            sentences: [
              { text: "A ___ lifestyle can lead to many health issues.", textEn: "A ___ lifestyle can lead to many health issues.", answer: "sedentary", hint: "ít vận động" },
              { text: "___ is a growing concern worldwide.", textEn: "___ is a growing concern worldwide.", answer: "Obesity", hint: "béo phì" },
              { text: "Regular exercise improves overall ___.", textEn: "Regular exercise improves overall ___.", answer: "well-being", hint: "sức khỏe tổng thể" }
            ]
          }
        ],
        quiz: [
          { question: "'Sedentary' lifestyle means:", options: ["Năng động", "Ít vận động", "Mạo hiểm", "Bận rộn"], answer: 1, explanation: "'Sedentary' = ngồi nhiều, ít vận động." },
          { question: "'Vaccination' is related to:", options: ["Phẫu thuật", "Tiêm phòng", "Dinh dưỡng", "Tập thể dục"], answer: 1, explanation: "'Vaccination' = tiêm chủng, tiêm phòng." },
          { question: "Collocation đúng:", options: ["do good health", "maintain good health", "make good health", "build good health"], answer: 1, explanation: "'Maintain good health' là collocation tự nhiên." }
        ]
      },
      {
        id: "ielts-vocab-tech",
        title: "Chủ đề: Công nghệ",
        titleEn: "Topic: Technology",
        level: 3,
        difficulty: "intermediate",
        theory: `## IELTS Vocabulary: Technology\n\nCông nghệ là chủ đề hot trong IELTS, đặc biệt Writing Task 2 và Speaking Part 3.\n\n### Từ vựng chính:\n- **Innovation**: breakthrough, cutting-edge, state-of-the-art\n- **Impact**: revolutionize, transform, disrupt\n- **Concerns**: privacy, addiction, cybersecurity\n- **Digital life**: social media, artificial intelligence, automation`,
        theoryEn: `## IELTS Vocabulary: Technology\n\nTechnology is a hot topic in IELTS, especially Writing Task 2 and Speaking Part 3.\n\n### Key vocabulary:\n- **Innovation**: breakthrough, cutting-edge, state-of-the-art\n- **Impact**: revolutionize, transform, disrupt\n- **Concerns**: privacy, addiction, cybersecurity\n- **Digital life**: social media, artificial intelligence, automation`,
        vocabulary: [
          { word: "cutting-edge", meaning: "tiên tiến nhất", meaningEn: "the most advanced", example: "They use cutting-edge technology.", exampleEn: "They use cutting-edge technology.", partOfSpeech: "adjective" },
          { word: "revolutionize", meaning: "cách mạng hóa", meaningEn: "to completely change", example: "AI has revolutionized many industries.", exampleEn: "AI has revolutionized many industries.", partOfSpeech: "verb" },
          { word: "cybersecurity", meaning: "an ninh mạng", meaningEn: "protection of computer systems", example: "Cybersecurity is a growing concern.", exampleEn: "Cybersecurity is a growing concern.", partOfSpeech: "noun" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền từ vựng Technology:",
            instructionEn: "Fill in Technology vocabulary:",
            sentences: [
              { text: "This company uses ___ technology in their products.", textEn: "This company uses ___ technology in their products.", answer: "cutting-edge", hint: "tiên tiến nhất" },
              { text: "Smartphones have ___ the way we communicate.", textEn: "Smartphones have ___ the way we communicate.", answer: "revolutionized", hint: "cách mạng hóa" }
            ]
          }
        ],
        quiz: [
          { question: "'Cutting-edge' means:", options: ["Lỗi thời", "Tiên tiến nhất", "Nguy hiểm", "Rẻ tiền"], answer: 1, explanation: "'Cutting-edge' = tiên tiến, hiện đại nhất." },
          { question: "'Revolutionize' means:", options: ["Phá hủy", "Cách mạng hóa", "Sao chép", "Thu nhỏ"], answer: 1, explanation: "'Revolutionize' = thay đổi hoàn toàn, cách mạng hóa." },
          { question: "'Cybersecurity' liên quan đến:", options: ["Thể thao điện tử", "Bảo vệ hệ thống máy tính", "Mạng xã hội", "Thiết kế web"], answer: 1, explanation: "'Cybersecurity' = an ninh mạng, bảo vệ hệ thống." }
        ]
      }
    ]
  }
];

// Cambridge Expansion modules
const cambridgeExpansionModules: LanguageModule[] = [
  {
    id: "cambridge-movers-exp",
    title: "Cambridge Movers — Mở rộng",
    titleEn: "Cambridge Movers — Expansion",
    icon: "🏃",
    color: "from-green-500 to-emerald-500",
    description: "Luyện Reading, Writing & Speaking cho Movers",
    descriptionEn: "Practice Reading, Writing & Speaking for Movers",
    category: "cambridge",
    language: "english",
    lessons: [
      {
        id: "movers-rw",
        title: "Movers: Đọc & Viết",
        titleEn: "Movers: Reading & Writing",
        level: 2,
        difficulty: "beginner",
        theory: `## Movers Reading & Writing\n\n### Part 1: Matching\nĐọc định nghĩa và chọn từ đúng.\n\n### Part 2: Gap-fill\nĐiền từ vào chỗ trống trong đoạn văn ngắn.\n\n### Part 3: Picture story\nViết câu trả lời dựa trên tranh.\n\n### Tips:\n- Đọc **toàn bộ câu** trước khi điền\n- Chú ý **ngữ pháp**: a/an/the, thì hiện tại/quá khứ\n- Kiểm tra **chính tả** sau khi viết`,
        theoryEn: `## Movers Reading & Writing\n\n### Part 1: Matching\nRead definitions and choose the correct word.\n\n### Part 2: Gap-fill\nFill in blanks in short passages.\n\n### Part 3: Picture story\nWrite answers based on pictures.\n\n### Tips:\n- Read the **whole sentence** before filling\n- Pay attention to **grammar**: a/an/the, present/past tense\n- Check **spelling** after writing`,
        vocabulary: [
          { word: "playground", meaning: "sân chơi", meaningEn: "area for children to play", example: "The children are in the playground.", exampleEn: "The children are in the playground.", partOfSpeech: "noun" },
          { word: "exciting", meaning: "thú vị, hào hứng", meaningEn: "causing excitement", example: "The trip was very exciting!", exampleEn: "The trip was very exciting!", partOfSpeech: "adjective" },
          { word: "carefully", meaning: "cẩn thận", meaningEn: "with great attention", example: "She read the instructions carefully.", exampleEn: "She read the instructions carefully.", partOfSpeech: "adverb" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền từ đúng:",
            instructionEn: "Fill in the correct word:",
            sentences: [
              { text: "The children played ___ in the park.", textEn: "The children played ___ in the park.", answer: "carefully", hint: "cẩn thận" },
              { text: "It was an ___ adventure!", textEn: "It was an ___ adventure!", answer: "exciting", hint: "thú vị" }
            ]
          }
        ],
        quiz: [
          { question: "'Playground' is a place for:", options: ["Cooking", "Playing", "Shopping", "Sleeping"], answer: 1, explanation: "'Playground' = sân chơi cho trẻ em." },
          { question: "'Carefully' means:", options: ["Nhanh chóng", "Cẩn thận", "Lười biếng", "Vui vẻ"], answer: 1, explanation: "'Carefully' = một cách cẩn thận." }
        ]
      },
      {
        id: "movers-speaking",
        title: "Movers: Nói",
        titleEn: "Movers: Speaking",
        level: 2,
        difficulty: "beginner",
        theory: `## Movers Speaking\n\n### Part 1: Find the differences\nSo sánh 2 bức tranh và tìm điểm khác biệt.\n- "In this picture... but in that picture..."\n\n### Part 2: Picture story\nKể chuyện dựa trên 4 bức tranh theo thứ tự.\n\n### Part 3: Odd one out\nChọn từ/tranh khác biệt và giải thích tại sao.\n\n### Cấu trúc hữu ích:\n- There is/are...\n- I can see...\n- The boy/girl is...ing`,
        theoryEn: `## Movers Speaking\n\n### Part 1: Find the differences\nCompare 2 pictures and find differences.\n- "In this picture... but in that picture..."\n\n### Part 2: Picture story\nTell a story based on 4 pictures in order.\n\n### Part 3: Odd one out\nChoose the different word/picture and explain why.\n\n### Useful structures:\n- There is/are...\n- I can see...\n- The boy/girl is...ing`,
        vocabulary: [
          { word: "different", meaning: "khác nhau", meaningEn: "not the same", example: "These two pictures are different.", exampleEn: "These two pictures are different.", partOfSpeech: "adjective" },
          { word: "similar", meaning: "giống nhau", meaningEn: "almost the same", example: "The dresses look similar.", exampleEn: "The dresses look similar.", partOfSpeech: "adjective" }
        ],
        exercises: [
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu so sánh tranh:",
            instructionEn: "Reorder the comparison sentence:",
            items: [
              { scrambled: ["this", "in", "picture", "a", "there", "is", "cat"], correct: "In this picture there is a cat." },
              { scrambled: ["different", "two", "are", "the", "pictures"], correct: "The two pictures are different." }
            ]
          }
        ],
        quiz: [
          { question: "Movers Speaking Part 1 yêu cầu:", options: ["Kể chuyện", "Tìm điểm khác biệt giữa 2 tranh", "Hát một bài", "Đọc to đoạn văn"], answer: 1, explanation: "Part 1 = Find the differences between two pictures." },
          { question: "'There is' dùng với:", options: ["Danh từ số nhiều", "Danh từ số ít", "Động từ", "Tính từ"], answer: 1, explanation: "'There is' + danh từ số ít/không đếm được." }
        ]
      }
    ]
  },
  {
    id: "cambridge-flyers-exp",
    title: "Cambridge Flyers — Mở rộng",
    titleEn: "Cambridge Flyers — Expansion",
    icon: "✈️",
    color: "from-sky-500 to-blue-600",
    description: "Ngữ pháp & Đọc hiểu cho Flyers",
    descriptionEn: "Grammar & Reading for Flyers",
    category: "cambridge",
    language: "english",
    lessons: [
      {
        id: "flyers-grammar",
        title: "Flyers: Ngữ pháp nâng cao",
        titleEn: "Flyers: Advanced Grammar",
        level: 3,
        difficulty: "intermediate",
        theory: `## Flyers Grammar\n\n### Present Perfect\n- have/has + past participle\n- "I have visited London twice."\n- Dùng cho: trải nghiệm, hành động vừa xảy ra\n\n### Comparatives & Superlatives\n- Short adj: -er / the -est\n- Long adj: more / the most\n- Irregular: good → better → the best\n\n### Modals\n- must / mustn't (bắt buộc / cấm)\n- should / shouldn't (lời khuyên)\n- could (khả năng, xin phép)`,
        theoryEn: `## Flyers Grammar\n\n### Present Perfect\n- have/has + past participle\n- "I have visited London twice."\n- Used for: experiences, recent actions\n\n### Comparatives & Superlatives\n- Short adj: -er / the -est\n- Long adj: more / the most\n- Irregular: good → better → the best\n\n### Modals\n- must / mustn't (obligation / prohibition)\n- should / shouldn't (advice)\n- could (possibility, permission)`,
        vocabulary: [
          { word: "experience", meaning: "trải nghiệm", meaningEn: "an event you participated in", example: "It was a wonderful experience.", exampleEn: "It was a wonderful experience.", partOfSpeech: "noun" },
          { word: "unfortunately", meaning: "thật không may", meaningEn: "sadly", example: "Unfortunately, the shop was closed.", exampleEn: "Unfortunately, the shop was closed.", partOfSpeech: "adverb" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chia động từ đúng dạng:",
            instructionEn: "Use the correct verb form:",
            sentences: [
              { text: "I ___ (visit) Paris three times.", textEn: "I ___ (visit) Paris three times.", answer: "have visited", hint: "present perfect" },
              { text: "You ___ (should / bring) an umbrella.", textEn: "You ___ (should / bring) an umbrella.", answer: "should bring", hint: "lời khuyên" }
            ]
          }
        ],
        quiz: [
          { question: "Present Perfect dùng cho:", options: ["Hành động trong quá khứ cụ thể", "Trải nghiệm (không rõ thời gian)", "Kế hoạch tương lai", "Thói quen hàng ngày"], answer: 1, explanation: "Present Perfect dùng cho trải nghiệm, không nêu thời gian cụ thể." },
          { question: "Superlative của 'good':", options: ["gooder", "more good", "the best", "the goodest"], answer: 2, explanation: "good → better → the best (bất quy tắc)." }
        ]
      },
      {
        id: "flyers-reading",
        title: "Flyers: Đọc hiểu",
        titleEn: "Flyers: Reading Comprehension",
        level: 3,
        difficulty: "intermediate",
        theory: `## Flyers Reading\n\n### Dạng bài:\n1. **True/False**: Đọc đoạn văn, xác định câu đúng/sai\n2. **Gap-fill story**: Chọn từ điền vào truyện ngắn\n3. **Matching**: Nối thông tin giữa 2 cột\n\n### Chiến lược:\n- **Gạch chân keywords** trong câu hỏi\n- Tìm **paraphrase** (cách nói khác) trong đoạn văn\n- Đọc **toàn bộ đoạn** trước khi trả lời\n- Chú ý **từ phủ định**: not, never, don't`,
        theoryEn: `## Flyers Reading\n\n### Question types:\n1. **True/False**: Read a passage and determine true/false\n2. **Gap-fill story**: Choose words to fill in a short story\n3. **Matching**: Match information between two columns\n\n### Strategies:\n- **Underline keywords** in the question\n- Find **paraphrases** in the passage\n- Read the **entire passage** before answering\n- Watch for **negative words**: not, never, don't`,
        vocabulary: [
          { word: "passage", meaning: "đoạn văn", meaningEn: "a section of text", example: "Read the passage carefully.", exampleEn: "Read the passage carefully.", partOfSpeech: "noun" },
          { word: "identify", meaning: "nhận diện", meaningEn: "to recognize", example: "Can you identify the main idea?", exampleEn: "Can you identify the main idea?", partOfSpeech: "verb" }
        ],
        exercises: [
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu:",
            instructionEn: "Reorder the sentence:",
            items: [
              { scrambled: ["the", "read", "passage", "carefully", "before", "answering"], correct: "Read the passage carefully before answering." },
              { scrambled: ["main", "the", "identify", "idea", "can", "you"], correct: "Can you identify the main idea?" }
            ]
          }
        ],
        quiz: [
          { question: "Flyers Reading Part 1 là dạng:", options: ["Viết tự do", "True / False", "Nghe và viết", "Vẽ tranh"], answer: 1, explanation: "Part 1 Flyers Reading = True/False dựa trên đoạn văn." },
          { question: "'Paraphrase' means:", options: ["Dịch từng từ", "Nói lại bằng cách khác", "Đọc to lên", "Học thuộc lòng"], answer: 1, explanation: "'Paraphrase' = diễn đạt lại ý bằng từ khác." }
        ]
      }
    ]
  }
];

// National Exam Expansion
const nationalExamExpansionModules: LanguageModule[] = [
  {
    id: "national-exam-exp",
    title: "Thi THPT QG — Mở rộng",
    titleEn: "National Exam — Expansion",
    icon: "🎓",
    color: "from-red-500 to-orange-500",
    description: "Từ vựng & Viết cho thi THPT Quốc gia",
    descriptionEn: "Vocabulary & Writing for National High School Exam",
    category: "national-exam",
    language: "english",
    lessons: [
      {
        id: "natexam-vocab",
        title: "Từ vựng theo chủ đề thi",
        titleEn: "Exam Topic Vocabulary",
        level: 3,
        difficulty: "intermediate",
        theory: `## Từ vựng theo chủ đề thi THPT QG\n\n### Các chủ đề thường gặp:\n1. **Education**: scholarship, curriculum, literacy\n2. **Environment**: conservation, deforestation, renewable\n3. **Culture**: heritage, tradition, diverse\n4. **Social issues**: poverty, inequality, globalization\n\n### Cách học hiệu quả:\n- Học theo **word family**: employ → employer → employee → employment\n- Nhớ **collocations**: raise awareness, take measures\n- Luyện **synonyms**: important = crucial = essential = vital`,
        theoryEn: `## Exam Topic Vocabulary\n\n### Common topics:\n1. **Education**: scholarship, curriculum, literacy\n2. **Environment**: conservation, deforestation, renewable\n3. **Culture**: heritage, tradition, diverse\n4. **Social issues**: poverty, inequality, globalization\n\n### Effective learning:\n- Learn by **word family**: employ → employer → employee → employment\n- Remember **collocations**: raise awareness, take measures\n- Practice **synonyms**: important = crucial = essential = vital`,
        vocabulary: [
          { word: "conservation", meaning: "bảo tồn", meaningEn: "protection of natural things", example: "Wildlife conservation is important.", exampleEn: "Wildlife conservation is important.", partOfSpeech: "noun" },
          { word: "heritage", meaning: "di sản", meaningEn: "valued traditions passed down", example: "We must protect our cultural heritage.", exampleEn: "We must protect our cultural heritage.", partOfSpeech: "noun" },
          { word: "renewable", meaning: "tái tạo được", meaningEn: "able to be replaced naturally", example: "Solar power is a renewable energy source.", exampleEn: "Solar power is a renewable energy source.", partOfSpeech: "adjective" },
          { word: "globalization", meaning: "toàn cầu hóa", meaningEn: "worldwide integration", example: "Globalization has connected economies.", exampleEn: "Globalization has connected economies.", partOfSpeech: "noun" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền từ phù hợp:",
            instructionEn: "Fill in the appropriate word:",
            sentences: [
              { text: "Wildlife ___ helps protect endangered species.", textEn: "Wildlife ___ helps protect endangered species.", answer: "conservation", hint: "bảo tồn" },
              { text: "Solar energy is a ___ resource.", textEn: "Solar energy is a ___ resource.", answer: "renewable", hint: "tái tạo" },
              { text: "Cultural ___ should be preserved for future generations.", textEn: "Cultural ___ should be preserved for future generations.", answer: "heritage", hint: "di sản" }
            ]
          }
        ],
        quiz: [
          { question: "'Conservation' means:", options: ["Xây dựng", "Bảo tồn", "Phá hủy", "Mua bán"], answer: 1, explanation: "'Conservation' = bảo tồn, bảo vệ." },
          { question: "'Renewable energy' là:", options: ["Năng lượng hạt nhân", "Năng lượng tái tạo", "Năng lượng hóa thạch", "Năng lượng điện"], answer: 1, explanation: "'Renewable' = có thể tái tạo được (gió, mặt trời)." },
          { question: "Word family của 'employ':", options: ["employee, employer, employment", "employ, employs, employed", "employ, replay, display", "employ, enjoy, destroy"], answer: 0, explanation: "employ → employee (nhân viên), employer (chủ), employment (việc làm)." }
        ]
      },
      {
        id: "natexam-writing",
        title: "Viết đoạn văn",
        titleEn: "Paragraph Writing",
        level: 4,
        difficulty: "advanced",
        theory: `## Viết đoạn văn — Thi THPT QG\n\n### Dạng 1: Viết lại câu (Sentence transformation)\n- Giữ nguyên nghĩa, dùng từ/cấu trúc cho trước\n- Ví dụ: Active → Passive, Direct → Reported speech\n\n### Dạng 2: Viết đoạn văn 120-150 từ\n- **Topic sentence**: Câu chủ đề\n- **Supporting sentences**: 2-3 ý + ví dụ\n- **Concluding sentence**: Kết luận\n\n### Lưu ý:\n- Dùng **linking words**: Firstly, Moreover, In conclusion\n- Tránh **lặp từ**: dùng synonyms\n- Chú ý **grammar**: thì, số ít/nhiều, articles`,
        theoryEn: `## Paragraph Writing — National Exam\n\n### Type 1: Sentence transformation\n- Keep the same meaning using given word/structure\n- Examples: Active → Passive, Direct → Reported speech\n\n### Type 2: Write a 120-150 word paragraph\n- **Topic sentence**: Main idea\n- **Supporting sentences**: 2-3 points + examples\n- **Concluding sentence**: Conclusion\n\n### Notes:\n- Use **linking words**: Firstly, Moreover, In conclusion\n- Avoid **repetition**: use synonyms\n- Watch **grammar**: tenses, singular/plural, articles`,
        vocabulary: [
          { word: "moreover", meaning: "hơn nữa", meaningEn: "in addition", example: "Moreover, exercise reduces stress.", exampleEn: "Moreover, exercise reduces stress.", partOfSpeech: "adverb" },
          { word: "consequently", meaning: "do đó", meaningEn: "as a result", example: "He didn't study. Consequently, he failed.", exampleEn: "He didn't study. Consequently, he failed.", partOfSpeech: "adverb" }
        ],
        exercises: [
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu đoạn văn:",
            instructionEn: "Reorder the paragraph sentence:",
            items: [
              { scrambled: ["conclusion", "in", "is", "education", "essential", "for", "development"], correct: "In conclusion, education is essential for development." },
              { scrambled: ["moreover", "improves", "reading", "critical", "thinking"], correct: "Moreover, reading improves critical thinking." }
            ]
          }
        ],
        quiz: [
          { question: "Topic sentence nằm ở:", options: ["Cuối đoạn", "Đầu đoạn", "Giữa đoạn", "Không có"], answer: 1, explanation: "Topic sentence thường ở đầu đoạn, nêu ý chính." },
          { question: "'Consequently' means:", options: ["Tuy nhiên", "Do đó", "Ví dụ", "Cuối cùng"], answer: 1, explanation: "'Consequently' = do đó, kết quả là." },
          { question: "Đoạn văn thi THPT QG thường yêu cầu:", options: ["50-80 từ", "120-150 từ", "300-500 từ", "Không giới hạn"], answer: 1, explanation: "Đoạn văn phần writing thường yêu cầu 120-150 từ." }
        ]
      }
    ]
  }
];

// Grammar Expansion
const grammarExpansion3Modules: LanguageModule[] = [
  {
    id: "grammar-phrasal-collocations",
    title: "Cụm động từ & Kết hợp từ",
    titleEn: "Phrasal Verbs & Collocations",
    icon: "🔗",
    color: "from-violet-500 to-purple-600",
    description: "Phrasal verbs phổ biến và collocations quan trọng",
    descriptionEn: "Common phrasal verbs and important collocations",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "phrasal-verbs-adv",
        title: "Phrasal Verbs nâng cao",
        titleEn: "Advanced Phrasal Verbs",
        level: 4,
        difficulty: "advanced",
        theory: `## Phrasal Verbs nâng cao\n\nPhrasal verb = verb + particle (preposition/adverb). Nghĩa thường khác hoàn toàn nghĩa gốc.\n\n### Business:\n- **carry out** = thực hiện (carry out a plan)\n- **come up with** = nghĩ ra (come up with an idea)\n- **turn down** = từ chối (turn down an offer)\n- **put off** = trì hoãn (put off the meeting)\n\n### Communication:\n- **bring up** = đề cập (bring up a topic)\n- **point out** = chỉ ra (point out a mistake)\n- **figure out** = tìm ra (figure out the answer)\n\n### Separable vs Inseparable:\n- Separable: turn down → turn the offer down ✓\n- Inseparable: come up with → come up with an idea ✓ (không tách được)`,
        theoryEn: `## Advanced Phrasal Verbs\n\nPhrasal verb = verb + particle. Meaning often differs completely from the original verb.\n\n### Business:\n- **carry out** = to perform (carry out a plan)\n- **come up with** = to think of (come up with an idea)\n- **turn down** = to reject (turn down an offer)\n- **put off** = to postpone (put off the meeting)\n\n### Communication:\n- **bring up** = to mention (bring up a topic)\n- **point out** = to indicate (point out a mistake)\n- **figure out** = to solve (figure out the answer)\n\n### Separable vs Inseparable:\n- Separable: turn down → turn the offer down ✓\n- Inseparable: come up with → come up with an idea ✓`,
        vocabulary: [
          { word: "carry out", meaning: "thực hiện", meaningEn: "to perform, execute", example: "We need to carry out the experiment.", exampleEn: "We need to carry out the experiment.", partOfSpeech: "phrasal verb" },
          { word: "come up with", meaning: "nghĩ ra", meaningEn: "to think of, produce", example: "She came up with a brilliant idea.", exampleEn: "She came up with a brilliant idea.", partOfSpeech: "phrasal verb" },
          { word: "turn down", meaning: "từ chối", meaningEn: "to reject", example: "He turned down the job offer.", exampleEn: "He turned down the job offer.", partOfSpeech: "phrasal verb" },
          { word: "figure out", meaning: "tìm ra, hiểu", meaningEn: "to solve or understand", example: "I can't figure out this problem.", exampleEn: "I can't figure out this problem.", partOfSpeech: "phrasal verb" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền phrasal verb phù hợp:",
            instructionEn: "Fill in the correct phrasal verb:",
            sentences: [
              { text: "The team ___ ___ ___ a creative solution.", textEn: "The team ___ ___ ___ a creative solution.", answer: "came up with", hint: "nghĩ ra" },
              { text: "She ___ ___ the invitation politely.", textEn: "She ___ ___ the invitation politely.", answer: "turned down", hint: "từ chối" },
              { text: "We need to ___ ___ more research.", textEn: "We need to ___ ___ more research.", answer: "carry out", hint: "thực hiện" }
            ]
          }
        ],
        quiz: [
          { question: "'Turn down' means:", options: ["Bật lên", "Từ chối", "Tìm kiếm", "Bỏ đi"], answer: 1, explanation: "'Turn down' = từ chối (an offer, invitation)." },
          { question: "'Come up with' is:", options: ["Separable", "Inseparable", "Intransitive", "Linking verb"], answer: 1, explanation: "'Come up with' là inseparable — không thể tách particle." },
          { question: "'Carry out an experiment' means:", options: ["Hủy thí nghiệm", "Thực hiện thí nghiệm", "Thiết kế thí nghiệm", "Mang thí nghiệm đi"], answer: 1, explanation: "'Carry out' = thực hiện, tiến hành." }
        ]
      },
      {
        id: "collocations-essential",
        title: "Collocations thiết yếu",
        titleEn: "Essential Collocations",
        level: 3,
        difficulty: "intermediate",
        theory: `## Collocations thiết yếu\n\nCollocation = cụm từ thường đi cùng nhau một cách tự nhiên.\n\n### Make vs Do:\n- **make**: a decision, a mistake, progress, an effort, a suggestion\n- **do**: homework, research, business, damage, a favor\n\n### Have/Take/Get:\n- **have**: an argument, a conversation, an impact\n- **take**: action, responsibility, a break, into account\n- **get**: permission, a promotion, rid of\n\n### Strong collocations:\n- **pay** attention, a compliment, a visit\n- **raise** awareness, concerns, funds\n- **meet** requirements, expectations, a deadline`,
        theoryEn: `## Essential Collocations\n\nCollocation = words that naturally go together.\n\n### Make vs Do:\n- **make**: a decision, a mistake, progress, an effort, a suggestion\n- **do**: homework, research, business, damage, a favor\n\n### Have/Take/Get:\n- **have**: an argument, a conversation, an impact\n- **take**: action, responsibility, a break, into account\n- **get**: permission, a promotion, rid of\n\n### Strong collocations:\n- **pay** attention, a compliment, a visit\n- **raise** awareness, concerns, funds\n- **meet** requirements, expectations, a deadline`,
        vocabulary: [
          { word: "make progress", meaning: "tiến bộ", meaningEn: "to improve", example: "She has made great progress in English.", exampleEn: "She has made great progress in English.", partOfSpeech: "collocation" },
          { word: "take into account", meaning: "xem xét, cân nhắc", meaningEn: "to consider", example: "We should take this into account.", exampleEn: "We should take this into account.", partOfSpeech: "collocation" },
          { word: "raise awareness", meaning: "nâng cao nhận thức", meaningEn: "to increase understanding", example: "The campaign aims to raise awareness.", exampleEn: "The campaign aims to raise awareness.", partOfSpeech: "collocation" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chọn make hoặc do:",
            instructionEn: "Choose make or do:",
            sentences: [
              { text: "She ___ a terrible mistake.", textEn: "She ___ a terrible mistake.", answer: "made", hint: "make a mistake" },
              { text: "He ___ his homework every evening.", textEn: "He ___ his homework every evening.", answer: "does", hint: "do homework" },
              { text: "We need to ___ more research on this topic.", textEn: "We need to ___ more research on this topic.", answer: "do", hint: "do research" }
            ]
          }
        ],
        quiz: [
          { question: "Collocation đúng:", options: ["make homework", "do homework", "have homework", "take homework"], answer: 1, explanation: "'Do homework' là collocation đúng." },
          { question: "'Raise awareness' means:", options: ["Tăng giá", "Nâng cao nhận thức", "Giơ tay", "Tăng lương"], answer: 1, explanation: "'Raise awareness' = nâng cao nhận thức, hiểu biết." },
          { question: "'Take into account' means:", options: ["Gửi tiền", "Cân nhắc, xem xét", "Rút tiền", "Tính toán"], answer: 1, explanation: "'Take into account' = xem xét, cân nhắc." }
        ]
      }
    ]
  }
];

export const englishExpansion3Modules: LanguageModule[] = [
  ...toeicExpansionModules,
  ...ieltsExpansionModules,
  ...cambridgeExpansionModules,
  ...nationalExamExpansionModules,
  ...grammarExpansion3Modules,
];

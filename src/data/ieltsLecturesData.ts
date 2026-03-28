// IELTS Lectures for Skills - Comprehensive lecture data organized into 4 pillars

export interface LectureQuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface StrategyStep {
  step: number;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  example?: string;
}

export interface MistakeToAvoid {
  mistake: string;
  mistakeVi: string;
  why: string;
  whyVi: string;
}

export interface VocabHighlight {
  word: string;
  definition: string;
  definitionVi: string;
  example: string;
  band: string;
}

export interface IeltsLecture {
  id: string;
  title: string;
  titleVi: string;
  pillar: "skill-based" | "tips-hacks" | "thematic-vocab" | "applied-grammar";
  skill?: "listening" | "reading" | "writing" | "speaking";
  icon: string;
  duration: string;
  level: "foundation" | "intermediate" | "advanced";
  description: string;
  descriptionVi: string;
  strategySteps: StrategyStep[];
  practicalExamples: {
    context: string;
    contextVi: string;
    example: string;
    answer?: string;
    explanation?: string;
  }[];
  mistakesToAvoid: MistakeToAvoid[];
  goldenSecret: string;
  goldenSecretVi: string;
  vocabHighlights: VocabHighlight[];
  quiz: LectureQuizQuestion[];
  cheatSheetPoints: string[];
}

// === PILLAR 1: SKILL-BASED LECTURES ===

const skillBasedLectures: IeltsLecture[] = [
  {
    id: "mastering-tfng",
    title: "Mastering True/False/Not Given",
    titleVi: "Chinh phục True/False/Not Given",
    pillar: "skill-based",
    skill: "reading",
    icon: "📖",
    duration: "25 min",
    level: "intermediate",
    description: "The definitive strategy to ace T/F/NG questions — the most feared question type in IELTS Reading.",
    descriptionVi: "Chiến lược tối ưu để chinh phục câu hỏi T/F/NG — dạng câu hỏi đáng sợ nhất trong IELTS Reading.",
    strategySteps: [
      {
        step: 1,
        title: "Read the Statement First",
        titleVi: "Đọc câu hỏi trước",
        description: "Underline the keywords in the statement. Identify the SUBJECT and the CLAIM being made.",
        descriptionVi: "Gạch chân từ khóa trong câu hỏi. Xác định CHỦ THỂ và NHẬN ĐỊNH được đưa ra.",
        example: "Statement: 'Children who play video games develop better problem-solving skills.' → Keywords: children, video games, problem-solving skills"
      },
      {
        step: 2,
        title: "Locate the Information in the Passage",
        titleVi: "Tìm thông tin trong bài đọc",
        description: "Scan for synonyms or paraphrases of your keywords. The passage will NEVER use the exact same words.",
        descriptionVi: "Quét tìm từ đồng nghĩa hoặc cách diễn đạt khác của từ khóa. Bài đọc sẽ KHÔNG BAO GIỜ dùng y nguyên từ ngữ.",
        example: "'video games' → 'digital entertainment', 'electronic gaming'; 'problem-solving' → 'analytical thinking'"
      },
      {
        step: 3,
        title: "Compare & Decide",
        titleVi: "So sánh & Quyết định",
        description: "TRUE = same meaning. FALSE = opposite/contradicts. NOT GIVEN = information simply not mentioned or not enough to decide.",
        descriptionVi: "TRUE = cùng ý nghĩa. FALSE = ngược lại/mâu thuẫn. NOT GIVEN = thông tin không được đề cập hoặc không đủ để kết luận.",
      }
    ],
    practicalExamples: [
      {
        context: "Passage says: 'Research has shown that moderate gaming can enhance cognitive flexibility in young people.'",
        contextVi: "Bài đọc viết: 'Nghiên cứu cho thấy chơi game ở mức vừa phải có thể nâng cao tính linh hoạt nhận thức ở người trẻ.'",
        example: "Statement: 'Video games improve cognitive abilities in children.' → Answer: TRUE",
        answer: "TRUE",
        explanation: "'enhance cognitive flexibility' = 'improve cognitive abilities'; 'young people' includes 'children'"
      },
      {
        context: "Passage says: 'The study focused exclusively on adults aged 25-40.'",
        contextVi: "Bài đọc viết: 'Nghiên cứu tập trung hoàn toàn vào người lớn từ 25-40 tuổi.'",
        example: "Statement: 'The study included participants of all ages.' → Answer: FALSE",
        answer: "FALSE",
        explanation: "'exclusively on adults aged 25-40' directly contradicts 'participants of all ages'"
      },
      {
        context: "Passage discusses gaming benefits but never mentions physical health.",
        contextVi: "Bài đọc thảo luận về lợi ích của chơi game nhưng không bao giờ đề cập sức khỏe thể chất.",
        example: "Statement: 'Playing video games can lead to physical health issues.' → Answer: NOT GIVEN",
        answer: "NOT GIVEN",
        explanation: "Physical health is never discussed in the passage — we cannot say it's true or false."
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Using your own knowledge to answer",
        mistakeVi: "Dùng kiến thức cá nhân để trả lời",
        why: "Even if you KNOW something is true in real life, if the passage doesn't say it, the answer is NOT GIVEN.",
        whyVi: "Dù bạn BIẾT điều gì đó đúng ngoài đời, nếu bài đọc không nói, đáp án là NOT GIVEN."
      },
      {
        mistake: "Confusing FALSE with NOT GIVEN",
        mistakeVi: "Nhầm lẫn FALSE với NOT GIVEN",
        why: "FALSE = the passage says the OPPOSITE. NOT GIVEN = the passage says NOTHING about it.",
        whyVi: "FALSE = bài đọc nói NGƯỢC LẠI. NOT GIVEN = bài đọc KHÔNG NÓI GÌ về nó."
      },
      {
        mistake: "Spending too long on one question",
        mistakeVi: "Dành quá nhiều thời gian cho một câu",
        why: "If you can't find the information within 2 minutes, mark NOT GIVEN and move on.",
        whyVi: "Nếu không tìm thấy thông tin trong 2 phút, đánh NOT GIVEN và tiếp tục."
      }
    ],
    goldenSecret: "The order of T/F/NG questions follows the order of the passage. If Q3's answer is in paragraph 2, Q4's answer will be in paragraph 2 or later — NEVER earlier!",
    goldenSecretVi: "Thứ tự câu hỏi T/F/NG theo thứ tự bài đọc. Nếu đáp án Q3 ở đoạn 2, đáp án Q4 sẽ ở đoạn 2 hoặc sau — KHÔNG BAO GIỜ ở trước!",
    vocabHighlights: [
      { word: "cognitive flexibility", definition: "The ability to switch thinking between different concepts", definitionVi: "Khả năng chuyển đổi tư duy giữa các khái niệm khác nhau", example: "Gaming enhances cognitive flexibility in young learners.", band: "7.0+" },
      { word: "exclusively", definition: "Only; limited to one thing", definitionVi: "Chỉ; giới hạn trong một thứ", example: "The course is designed exclusively for advanced students.", band: "6.5+" },
      { word: "contradicts", definition: "Says the opposite of", definitionVi: "Nói ngược lại với", example: "His actions contradict his words.", band: "7.0+" },
    ],
    quiz: [
      {
        question: "What should you do FIRST when answering a T/F/NG question?",
        options: ["Read the entire passage", "Read the statement and underline keywords", "Look at the title", "Read the last paragraph"],
        answer: 1,
        explanation: "Always read the statement first and identify keywords before scanning the passage."
      },
      {
        question: "The passage says: 'Most students prefer online learning.' The statement says: 'All students prefer online learning.' What is the answer?",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        answer: 1,
        explanation: "'Most' ≠ 'All'. The passage says MOST, but the statement says ALL — this is a contradiction."
      },
      {
        question: "When should you choose NOT GIVEN?",
        options: ["When the statement is probably true", "When the passage says the opposite", "When the information is not mentioned in the passage", "When you're unsure"],
        answer: 2,
        explanation: "NOT GIVEN means the passage simply does not provide enough information to determine if the statement is true or false."
      }
    ],
    cheatSheetPoints: [
      "TRUE = passage agrees with statement (possibly using synonyms)",
      "FALSE = passage directly contradicts the statement",
      "NOT GIVEN = information not in the passage at all",
      "Questions follow passage order — use this to locate answers faster",
      "Never use personal knowledge — only use what the passage says",
      "Watch for qualifiers: all, some, most, always, never, often"
    ]
  },
  {
    id: "writing-task2-opinion",
    title: "Writing Task 2: Opinion Essays",
    titleVi: "Writing Task 2: Bài luận quan điểm",
    pillar: "skill-based",
    skill: "writing",
    icon: "✍️",
    duration: "30 min",
    level: "intermediate",
    description: "Master the art of writing a compelling opinion essay that impresses IELTS examiners.",
    descriptionVi: "Thành thạo nghệ thuật viết bài luận quan điểm thuyết phục, ghi điểm với giám khảo IELTS.",
    strategySteps: [
      {
        step: 1,
        title: "Analyze the Question (2 minutes)",
        titleVi: "Phân tích đề bài (2 phút)",
        description: "Identify the topic, the specific question, and what is being asked: 'To what extent do you agree or disagree?'",
        descriptionVi: "Xác định chủ đề, câu hỏi cụ thể, và yêu cầu: 'Bạn đồng ý hay không đồng ý đến mức nào?'",
        example: "'Some people believe that technology has made our lives more complicated. To what extent do you agree or disagree?'"
      },
      {
        step: 2,
        title: "Plan Your Essay (3 minutes)",
        titleVi: "Lập dàn ý (3 phút)",
        description: "Decide your position (agree/disagree/partially agree). Brainstorm 2-3 main ideas with supporting examples.",
        descriptionVi: "Quyết định lập trường (đồng ý/không đồng ý/đồng ý một phần). Nghĩ 2-3 ý chính kèm ví dụ minh họa.",
      },
      {
        step: 3,
        title: "Write the Introduction (5 minutes)",
        titleVi: "Viết mở bài (5 phút)",
        description: "Paraphrase the question + state your thesis. Never copy the question word-for-word!",
        descriptionVi: "Diễn đạt lại câu hỏi + nêu luận điểm. Không bao giờ chép nguyên câu hỏi!",
        example: "It is often argued that technological advancements have increased the complexity of modern life. I strongly agree with this viewpoint, as technology has introduced new challenges in both the workplace and personal relationships."
      },
      {
        step: 4,
        title: "Write Body Paragraphs (20 minutes)",
        titleVi: "Viết thân bài (20 phút)",
        description: "Each paragraph: Topic sentence → Explanation → Example → Link back to thesis. Use the T.E.E.L structure.",
        descriptionVi: "Mỗi đoạn: Câu chủ đề → Giải thích → Ví dụ → Liên kết lại luận điểm. Dùng cấu trúc T.E.E.L.",
      },
      {
        step: 5,
        title: "Write the Conclusion (5 minutes)",
        titleVi: "Viết kết bài (5 phút)",
        description: "Restate your opinion using different words. Add a final thought or prediction. Never introduce NEW ideas!",
        descriptionVi: "Nhắc lại quan điểm bằng từ ngữ khác. Thêm suy nghĩ cuối hoặc dự đoán. Không bao giờ đưa ra ý MỚI!",
      }
    ],
    practicalExamples: [
      {
        context: "Band 8.0 Introduction Example",
        contextVi: "Ví dụ mở bài Band 8.0",
        example: "It is frequently contended that modern technology, rather than simplifying human existence, has rendered it more convoluted. I wholeheartedly concur with this perspective, as the proliferation of digital devices has fundamentally altered work-life balance and interpersonal dynamics.",
      },
      {
        context: "Strong Topic Sentence Example",
        contextVi: "Ví dụ câu chủ đề mạnh",
        example: "One of the most compelling arguments supporting this view is that the omnipresence of smartphones has blurred the boundaries between professional and personal life.",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Copying the question word-for-word in the introduction",
        mistakeVi: "Chép y nguyên câu hỏi trong mở bài",
        why: "This shows you cannot paraphrase and will lower your Lexical Resource score.",
        whyVi: "Điều này cho thấy bạn không biết diễn đạt lại và sẽ giảm điểm Lexical Resource."
      },
      {
        mistake: "Writing a one-sided essay when you partially agree",
        mistakeVi: "Viết bài một chiều khi bạn chỉ đồng ý một phần",
        why: "If you partially agree, acknowledge both sides but make your position clear.",
        whyVi: "Nếu đồng ý một phần, thừa nhận cả hai mặt nhưng rõ ràng lập trường."
      },
      {
        mistake: "Introducing new ideas in the conclusion",
        mistakeVi: "Đưa ý mới trong kết bài",
        why: "The conclusion should summarize, not introduce. New ideas belong in body paragraphs.",
        whyVi: "Kết bài chỉ tóm tắt, không đưa ý mới. Ý mới thuộc về thân bài."
      }
    ],
    goldenSecret: "The Band 8.0 Introduction Formula: Background statement (paraphrase the question) + Thesis statement (your clear position) + Preview (mention your 2 main points). This can be done in exactly 2 sentences!",
    goldenSecretVi: "Công thức mở bài Band 8.0: Câu nền (diễn đạt lại câu hỏi) + Luận đề (quan điểm rõ ràng) + Giới thiệu (đề cập 2 ý chính). Chỉ cần đúng 2 câu!",
    vocabHighlights: [
      { word: "contended", definition: "Argued or claimed", definitionVi: "Tranh luận hoặc khẳng định", example: "It is widely contended that education is key to success.", band: "7.5+" },
      { word: "proliferation", definition: "Rapid increase in number", definitionVi: "Sự gia tăng nhanh chóng", example: "The proliferation of social media has transformed communication.", band: "8.0+" },
      { word: "omnipresence", definition: "The state of being everywhere at once", definitionVi: "Sự hiện diện khắp nơi", example: "The omnipresence of technology in classrooms raises concerns.", band: "8.0+" },
    ],
    quiz: [
      {
        question: "How many sentences should a Band 8.0 introduction have?",
        options: ["1 sentence", "2 sentences", "3-4 sentences", "5+ sentences"],
        answer: 1,
        explanation: "A Band 8.0 introduction needs exactly 2 sentences: background + thesis with preview."
      },
      {
        question: "What does T.E.E.L stand for in body paragraph structure?",
        options: ["Topic, Evidence, Explanation, Link", "Think, Express, Elaborate, List", "Theme, Example, Evidence, Logic", "Topic, Example, Explain, Locate"],
        answer: 0,
        explanation: "T.E.E.L = Topic sentence, Evidence, Explanation, Link back to thesis."
      },
      {
        question: "What should you NEVER do in a conclusion?",
        options: ["Restate your opinion", "Summarize main points", "Introduce new arguments", "Make a prediction"],
        answer: 2,
        explanation: "Never introduce new arguments in the conclusion — it should only summarize and restate."
      }
    ],
    cheatSheetPoints: [
      "Introduction: 2 sentences — paraphrase + thesis",
      "Body 1: Main argument + example + explanation",
      "Body 2: Second argument + example + explanation",
      "Conclusion: Restate position + final thought",
      "Use T.E.E.L for every body paragraph",
      "Never copy the question — always paraphrase"
    ]
  },
  {
    id: "listening-section-strategies",
    title: "Listening: Avoiding Distractors",
    titleVi: "Listening: Tránh bẫy gây nhiễu",
    pillar: "skill-based",
    skill: "listening",
    icon: "🎧",
    duration: "20 min",
    level: "intermediate",
    description: "Learn how to identify and avoid distractors — the sneaky wrong answers designed to trick you in IELTS Listening.",
    descriptionVi: "Học cách nhận diện và tránh bẫy gây nhiễu — những đáp án sai được thiết kế tinh vi trong IELTS Listening.",
    strategySteps: [
      {
        step: 1,
        title: "Pre-read Questions During Preview Time",
        titleVi: "Đọc trước câu hỏi trong thời gian xem trước",
        description: "Use every second of the 30-second preview to underline keywords and predict answer types (number, name, date).",
        descriptionVi: "Tận dụng mọi giây trong 30 giây xem trước để gạch chân từ khóa và dự đoán loại đáp án (số, tên, ngày).",
      },
      {
        step: 2,
        title: "Listen for Self-Corrections",
        titleVi: "Nghe các lần tự sửa lỗi",
        description: "Speakers often say one thing then correct themselves: 'The meeting is on Tuesday... sorry, I mean Wednesday.' The answer is WEDNESDAY!",
        descriptionVi: "Người nói thường nói một thứ rồi sửa: 'Buổi họp vào thứ Ba... xin lỗi, ý tôi là thứ Tư.' Đáp án là THỨ TƯ!",
      },
      {
        step: 3,
        title: "Don't Write the First Answer You Hear",
        titleVi: "Đừng viết đáp án đầu tiên bạn nghe",
        description: "The first piece of information is often a distractor. Wait for confirmation or contrast words like 'but', 'however', 'actually'.",
        descriptionVi: "Thông tin đầu tiên thường là bẫy. Chờ từ xác nhận hoặc từ tương phản như 'but', 'however', 'actually'.",
      }
    ],
    practicalExamples: [
      {
        context: "Audio transcript: 'I thought the deadline was March 15th, but it's actually been moved to March 22nd.'",
        contextVi: "Bản ghi âm: 'Tôi nghĩ hạn chót là 15 tháng 3, nhưng thực ra đã dời sang 22 tháng 3.'",
        example: "Question: What is the deadline? → Many students write 'March 15th' but the correct answer is 'March 22nd'",
        answer: "March 22nd",
        explanation: "The speaker self-corrects using 'actually' — always choose the corrected information."
      },
      {
        context: "Audio: 'The ticket costs $45 for adults, or $30 if you're a student.'",
        contextVi: "Bản ghi: 'Vé giá $45 cho người lớn, hoặc $30 nếu bạn là sinh viên.'",
        example: "Question: How much does a student ticket cost? → Answer: $30 (not $45)",
        answer: "$30",
        explanation: "You must listen for the SPECIFIC detail asked — student price, not adult price."
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Writing the first number or name you hear",
        mistakeVi: "Viết số hoặc tên đầu tiên bạn nghe",
        why: "Distractors are placed BEFORE the correct answer to trap careless listeners.",
        whyVi: "Bẫy gây nhiễu được đặt TRƯỚC đáp án đúng để bẫy người nghe bất cẩn."
      },
      {
        mistake: "Ignoring signal words like 'but', 'however', 'actually'",
        mistakeVi: "Bỏ qua các từ tín hiệu như 'but', 'however', 'actually'",
        why: "These words indicate a change — the REAL answer comes after them.",
        whyVi: "Các từ này báo hiệu sự thay đổi — đáp án THỰC SỰ đến sau chúng."
      }
    ],
    goldenSecret: "In IELTS Listening Section 3 & 4, if two speakers discuss options, the answer is almost always the option they AGREE on, not the one mentioned first. Listen for phrases like 'That sounds good', 'Let's go with that', 'I think that's the best option.'",
    goldenSecretVi: "Trong IELTS Listening Section 3 & 4, nếu hai người thảo luận các lựa chọn, đáp án gần như luôn là lựa chọn họ ĐỒNG Ý, không phải cái được nhắc đầu tiên. Nghe cụm 'That sounds good', 'Let's go with that', 'I think that's the best option.'",
    vocabHighlights: [
      { word: "distractor", definition: "A wrong answer designed to mislead", definitionVi: "Đáp án sai được thiết kế để đánh lạc hướng", example: "The first price mentioned was a distractor.", band: "7.0+" },
      { word: "self-correction", definition: "When a speaker fixes their own mistake", definitionVi: "Khi người nói sửa lỗi của chính mình", example: "Pay attention to self-corrections in the audio.", band: "6.5+" },
    ],
    quiz: [
      {
        question: "Audio says: 'The library closes at 9pm... no wait, it's 8pm on weekdays.' What time does the library close on weekdays?",
        options: ["9pm", "8pm", "10pm", "7pm"],
        answer: 1,
        explanation: "The speaker self-corrects with 'no wait' — the corrected answer (8pm) is correct."
      },
      {
        question: "Which signal word tells you the REAL answer is coming?",
        options: ["and", "also", "however", "then"],
        answer: 2,
        explanation: "'However' signals a contrast — the correct answer typically follows contrast words."
      },
      {
        question: "In Section 3, when two speakers discuss options, the answer is usually:",
        options: ["The first option mentioned", "The cheapest option", "The option they agree on", "The last option mentioned"],
        answer: 2,
        explanation: "The answer is the option both speakers agree on — listen for agreement phrases."
      }
    ],
    cheatSheetPoints: [
      "Use preview time to underline keywords and predict answer types",
      "Never write the first answer you hear — wait for confirmation",
      "Signal words (but, however, actually) = answer change incoming",
      "Self-corrections always lead to the REAL answer",
      "In discussions, the agreed-upon option is the answer",
      "Spelling matters! Double-check names and places"
    ]
  },
  {
    id: "speaking-part2-technique",
    title: "Speaking Part 2: The 2-Minute Monologue",
    titleVi: "Speaking Part 2: Độc thoại 2 phút",
    pillar: "skill-based",
    skill: "speaking",
    icon: "🎤",
    duration: "20 min",
    level: "intermediate",
    description: "Never run out of things to say in Part 2. Master the art of speaking fluently for exactly 2 minutes.",
    descriptionVi: "Không bao giờ hết ý trong Part 2. Thành thạo nghệ thuật nói trôi chảy đúng 2 phút.",
    strategySteps: [
      {
        step: 1,
        title: "Use the 1-Minute Preparation Wisely",
        titleVi: "Dùng 1 phút chuẩn bị thông minh",
        description: "Write KEYWORDS only, not full sentences. Use the bullet points on the card as your framework.",
        descriptionVi: "Chỉ viết TỪ KHÓA, không viết câu đầy đủ. Dùng các gạch đầu dòng trên thẻ làm khung.",
      },
      {
        step: 2,
        title: "The W.H.E.N Framework",
        titleVi: "Khung W.H.E.N",
        description: "What (describe it) → How (how you experienced it) → Emotion (how you felt) → Now (why it matters now). This covers any topic!",
        descriptionVi: "What (mô tả) → How (bạn trải nghiệm thế nào) → Emotion (cảm xúc) → Now (tại sao quan trọng hiện tại). Áp dụng mọi chủ đề!",
      },
      {
        step: 3,
        title: "Extend with Details and Stories",
        titleVi: "Mở rộng bằng chi tiết và câu chuyện",
        description: "Add sensory details, comparisons, and mini-stories. 'I remember the smell of the ocean' is better than 'The beach was nice.'",
        descriptionVi: "Thêm chi tiết giác quan, so sánh, và câu chuyện nhỏ. 'Tôi nhớ mùi biển' hay hơn 'Bãi biển đẹp.'",
      }
    ],
    practicalExamples: [
      {
        context: "Topic Card: 'Describe a book you recently read'",
        contextVi: "Thẻ chủ đề: 'Mô tả một cuốn sách bạn đọc gần đây'",
        example: "W: 'It was a novel called Sapiens by Yuval Harari — a fascinating exploration of human history.' H: 'I actually discovered it through a friend's recommendation last summer.' E: 'What struck me most was this overwhelming sense of perspective — it made me feel both humble and inspired.' N: 'To this day, I still find myself referencing ideas from that book in everyday conversations.'",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Writing full sentences during preparation",
        mistakeVi: "Viết câu đầy đủ trong lúc chuẩn bị",
        why: "You'll waste time and end up reading instead of speaking naturally.",
        whyVi: "Bạn sẽ lãng phí thời gian và đọc thay vì nói tự nhiên."
      },
      {
        mistake: "Speaking too fast to fill 2 minutes",
        mistakeVi: "Nói quá nhanh để lấp đầy 2 phút",
        why: "Speed ≠ fluency. Speak at a natural pace with purposeful pauses.",
        whyVi: "Tốc độ ≠ trôi chảy. Nói nhịp tự nhiên với khoảng dừng có chủ đích."
      }
    ],
    goldenSecret: "If you go blank, use the 'Comparison Technique': compare your topic to something else. 'Unlike most books I've read, this one...' or 'Compared to my previous experience...' — this buys you 20-30 extra seconds every time!",
    goldenSecretVi: "Nếu quên ý, dùng 'Kỹ thuật So sánh': so sánh chủ đề với thứ khác. 'Không giống hầu hết sách tôi đọc, cuốn này...' hoặc 'So với trải nghiệm trước...' — kỹ thuật này giúp bạn thêm 20-30 giây mỗi lần!",
    vocabHighlights: [
      { word: "fascinating", definition: "Extremely interesting", definitionVi: "Cực kỳ thú vị", example: "The documentary was absolutely fascinating.", band: "6.5+" },
      { word: "struck me", definition: "Made a strong impression on me", definitionVi: "Gây ấn tượng mạnh với tôi", example: "What struck me most was her resilience.", band: "7.0+" },
      { word: "referencing", definition: "Mentioning or citing", definitionVi: "Nhắc đến hoặc trích dẫn", example: "I keep referencing that article in discussions.", band: "7.0+" },
    ],
    quiz: [
      {
        question: "What does the W in the W.H.E.N framework stand for?",
        options: ["Why", "What", "When", "Where"],
        answer: 1,
        explanation: "W = What — start by describing WHAT the topic is about."
      },
      {
        question: "During the 1-minute preparation, you should write:",
        options: ["Full sentences", "Keywords only", "A complete script", "Nothing — just think"],
        answer: 1,
        explanation: "Write keywords only — full sentences waste time and make you sound rehearsed."
      },
      {
        question: "What should you do if you go blank during Part 2?",
        options: ["Stop talking", "Ask the examiner for help", "Use the comparison technique", "Start over from the beginning"],
        answer: 2,
        explanation: "Compare your topic to something else — this naturally generates more content."
      }
    ],
    cheatSheetPoints: [
      "Use W.H.E.N: What → How → Emotion → Now",
      "Write KEYWORDS only during preparation",
      "Add sensory details: sights, sounds, smells, textures",
      "Use comparison technique if you go blank",
      "Speak naturally — don't rush to fill 2 minutes",
      "End with a strong concluding statement about why it matters"
    ]
  },
  {
    id: "reading-matching-headings",
    title: "Reading: Matching Headings Strategy",
    titleVi: "Reading: Chiến lược nối tiêu đề",
    pillar: "skill-based",
    skill: "reading",
    icon: "🧩",
    duration: "25 min",
    level: "advanced",
    description: "Crack the hardest IELTS Reading question type — Matching Headings — with a bulletproof 3-pass technique.",
    descriptionVi: "Giải mã dạng câu hỏi khó nhất IELTS Reading — Matching Headings — với kỹ thuật 3 lượt không thể sai.",
    strategySteps: [
      {
        step: 1,
        title: "Read ALL Headings First (The Menu Scan)",
        titleVi: "Đọc TẤT CẢ tiêu đề trước (Quét menu)",
        description: "Read every heading option BEFORE looking at the paragraphs. Underline the KEY CONCEPT in each heading — usually 2-3 words that capture the main idea.",
        descriptionVi: "Đọc mọi lựa chọn tiêu đề TRƯỚC KHI nhìn đoạn văn. Gạch chân Ý CHÍNH trong mỗi tiêu đề — thường 2-3 từ nắm bắt ý chính.",
        example: "Heading: 'The unexpected__(benefits)__ of __urban__(farming)__' → Key concept = unexpected benefits + urban farming"
      },
      {
        step: 2,
        title: "Read ONLY the First & Last Sentence of Each Paragraph",
        titleVi: "Chỉ đọc câu ĐẦU & CUỐI mỗi đoạn",
        description: "80% of the time, the main idea is in the FIRST sentence (topic sentence) or the LAST sentence (concluding thought). Don't read the middle yet!",
        descriptionVi: "80% trường hợp, ý chính nằm ở câu ĐẦU (câu chủ đề) hoặc câu CUỐI (kết luận). Chưa cần đọc phần giữa!",
      },
      {
        step: 3,
        title: "Match Easy Ones First, Then Eliminate",
        titleVi: "Nối cái dễ trước, rồi loại trừ",
        description: "Some paragraphs clearly match ONE heading. Do those first, cross out used headings, then tackle the tricky ones with fewer options.",
        descriptionVi: "Một số đoạn rõ ràng khớp MỘT tiêu đề. Làm trước, gạch bỏ tiêu đề đã dùng, rồi xử lý cái khó với ít lựa chọn hơn.",
      },
      {
        step: 4,
        title: "Beware of 'Detail Traps'",
        titleVi: "Cẩn thận 'Bẫy chi tiết'",
        description: "A heading that matches ONE detail but not the WHOLE paragraph is WRONG. The heading must capture the OVERALL theme, not a single example.",
        descriptionVi: "Tiêu đề khớp MỘT chi tiết nhưng không khớp CẢ đoạn là SAI. Tiêu đề phải nắm TOÀN BỘ chủ đề, không phải một ví dụ đơn lẻ.",
      }
    ],
    practicalExamples: [
      {
        context: "Paragraph starts: 'While traditional farming has long been associated with rural areas, a growing movement is bringing agriculture into the heart of cities. Community gardens, rooftop farms, and vertical growing systems are transforming unused urban spaces...'",
        contextVi: "Đoạn bắt đầu: 'Trong khi nông nghiệp truyền thống từ lâu gắn liền với vùng nông thôn, một phong trào đang mang nông nghiệp vào trung tâm thành phố...'",
        example: "Available headings:\nA. The decline of traditional farming\nB. Urban agriculture: A growing trend\nC. The nutritional value of organic food\n→ Answer: B (The paragraph's OVERALL theme is urban farming as a trend, not decline or nutrition)",
        answer: "B",
        explanation: "The first sentence introduces the key idea: farming moving into cities = 'urban agriculture: a growing trend'. Heading A is a detail trap — decline is mentioned but is NOT the main point."
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Reading every paragraph word by word",
        mistakeVi: "Đọc từng từ trong mỗi đoạn",
        why: "This wastes 15+ minutes. First & last sentences give you the main idea 80% of the time.",
        whyVi: "Điều này lãng phí 15+ phút. Câu đầu & cuối cho bạn ý chính 80% trường hợp."
      },
      {
        mistake: "Choosing a heading because ONE word matches",
        mistakeVi: "Chọn tiêu đề vì MỘT từ trùng khớp",
        why: "The heading must match the OVERALL idea, not just a single keyword. This is the most common trap!",
        whyVi: "Tiêu đề phải khớp Ý TỔNG THỂ, không chỉ một từ khóa đơn lẻ. Đây là bẫy phổ biến nhất!"
      },
      {
        mistake: "Not eliminating used headings",
        mistakeVi: "Không loại bỏ tiêu đề đã dùng",
        why: "Each heading is used ONCE (unless stated otherwise). Cross out matched headings to narrow down options.",
        whyVi: "Mỗi tiêu đề dùng MỘT LẦN (trừ khi đề nói khác). Gạch bỏ tiêu đề đã nối để thu hẹp lựa chọn."
      }
    ],
    goldenSecret: "There are ALWAYS more headings than paragraphs — usually 2-3 extra 'distractor' headings. These distractors often contain words that appear in the passage but DON'T represent the main idea of any paragraph. If a heading sounds too specific (focusing on one example rather than the theme), it's probably a distractor!",
    goldenSecretVi: "LUÔN có nhiều tiêu đề hơn đoạn văn — thường 2-3 tiêu đề 'bẫy' thừa. Các bẫy này thường chứa từ xuất hiện trong bài đọc nhưng KHÔNG đại diện cho ý chính đoạn nào. Nếu tiêu đề nghe quá cụ thể (tập trung vào một ví dụ thay vì chủ đề), nó có thể là bẫy!",
    vocabHighlights: [
      { word: "overarching", definition: "Comprehensive; covering everything", definitionVi: "Bao quát; bao trùm tất cả", example: "The overarching theme of the passage is climate change.", band: "8.0+" },
      { word: "nuance", definition: "A subtle difference in meaning", definitionVi: "Sắc thái; sự khác biệt tinh tế", example: "Understanding nuance is key to matching headings correctly.", band: "7.5+" },
      { word: "encapsulate", definition: "To express the essential features of", definitionVi: "Tóm gọn các đặc điểm thiết yếu", example: "The heading should encapsulate the paragraph's main idea.", band: "8.0+" },
    ],
    quiz: [
      {
        question: "What should you read FIRST in a Matching Headings question?",
        options: ["The paragraphs", "All the headings", "The introduction only", "The last paragraph"],
        answer: 1,
        explanation: "Read ALL headings first and underline key concepts before looking at any paragraph."
      },
      {
        question: "Which parts of a paragraph reveal the main idea 80% of the time?",
        options: ["The middle sentences", "The first and last sentences", "Only the first sentence", "Random sentences"],
        answer: 1,
        explanation: "The first (topic) and last (concluding) sentences usually contain the paragraph's main idea."
      },
      {
        question: "Why are there more headings than paragraphs?",
        options: ["It's a mistake", "Extra headings are distractors", "You need to use some twice", "They're for another section"],
        answer: 1,
        explanation: "Extra headings are deliberate distractors — they contain passage words but don't match any paragraph's MAIN idea."
      },
      {
        question: "A heading matches ONE detail in a paragraph but not the overall theme. You should:",
        options: ["Choose it — any match counts", "Reject it — it must match the overall theme", "Ask the examiner", "Skip the question"],
        answer: 1,
        explanation: "The heading must capture the OVERALL theme of the paragraph, not just one detail or example."
      }
    ],
    cheatSheetPoints: [
      "Step 1: Read ALL headings first → underline key concepts",
      "Step 2: Read ONLY first & last sentence of each paragraph",
      "Step 3: Match easy ones first → cross out used headings",
      "Step 4: Detail trap = heading matches ONE detail, not the whole paragraph",
      "There are always 2-3 extra distractor headings",
      "Heading must match OVERALL theme, not a single keyword"
    ]
  },
  {
    id: "writing-task1-describe-process",
    title: "Writing Task 1: Describing a Process",
    titleVi: "Writing Task 1: Mô tả quy trình",
    pillar: "skill-based",
    skill: "writing",
    icon: "🔄",
    duration: "22 min",
    level: "intermediate",
    description: "Master the art of describing processes, diagrams, and flow charts — the most overlooked Task 1 question type.",
    descriptionVi: "Thành thạo nghệ thuật mô tả quy trình, sơ đồ và lưu đồ — dạng Task 1 bị xem nhẹ nhất.",
    strategySteps: [
      {
        step: 1,
        title: "Identify the Type: Natural vs Man-Made",
        titleVi: "Xác định loại: Tự nhiên vs Nhân tạo",
        description: "Natural processes (water cycle, butterfly lifecycle) use PASSIVE voice. Man-made processes (manufacturing, recycling) can use ACTIVE or PASSIVE.",
        descriptionVi: "Quy trình tự nhiên (vòng tuần hoàn nước, vòng đời bướm) dùng CÂU BỊ ĐỘNG. Quy trình nhân tạo (sản xuất, tái chế) có thể dùng CHỦ ĐỘNG hoặc BỊ ĐỘNG.",
      },
      {
        step: 2,
        title: "Count the Stages & Group Them",
        titleVi: "Đếm các giai đoạn & Nhóm lại",
        description: "Count total stages. Group into 2-3 body paragraphs: Beginning stages, Middle stages, Final stages.",
        descriptionVi: "Đếm tổng số giai đoạn. Nhóm thành 2-3 đoạn thân bài: Giai đoạn đầu, Giai đoạn giữa, Giai đoạn cuối.",
        example: "8-stage process → Body 1: stages 1-3 (initial phase), Body 2: stages 4-6 (processing), Body 3: stages 7-8 (final output)"
      },
      {
        step: 3,
        title: "Use Sequencing Language",
        titleVi: "Dùng ngôn ngữ trình tự",
        description: "Link stages with: 'Initially,...', 'Subsequently,...', 'Following this,...', 'At the final stage,...'. NEVER use 'firstly, secondly, thirdly' — that's for essays, not processes.",
        descriptionVi: "Liên kết giai đoạn bằng: 'Initially,...', 'Subsequently,...', 'Following this,...', 'At the final stage,...'. KHÔNG dùng 'firstly, secondly, thirdly' — đó dành cho bài luận, không phải quy trình.",
      }
    ],
    practicalExamples: [
      {
        context: "Band 8.0 overview for a process diagram",
        contextVi: "Tổng quan Band 8.0 cho sơ đồ quy trình",
        example: "'Overall, the production of chocolate involves a multi-stage process, beginning with the harvesting of cocoa beans and culminating in the packaging of the finished product. The entire process comprises approximately eight distinct stages.'",
      },
      {
        context: "Sequencing language in action",
        contextVi: "Ngôn ngữ trình tự trong thực tế",
        example: "'Initially, cocoa pods are harvested from trees. Once collected, the beans are extracted and left to ferment for several days. Subsequently, they are dried in the sun before being transported to the factory, where they undergo roasting at high temperatures.'",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Forgetting the overview paragraph",
        mistakeVi: "Quên đoạn tổng quan",
        why: "The overview is worth up to 25% of your Task Achievement score. State: how many stages, what the process begins and ends with.",
        whyVi: "Tổng quan chiếm đến 25% điểm Task Achievement. Nêu: bao nhiêu giai đoạn, quy trình bắt đầu và kết thúc bằng gì."
      },
      {
        mistake: "Adding your opinion about the process",
        mistakeVi: "Thêm ý kiến cá nhân về quy trình",
        why: "Task 1 is OBJECTIVE. Never say 'I think this process is interesting' or 'This is an efficient method.'",
        whyVi: "Task 1 mang tính KHÁCH QUAN. Không bao giờ nói 'Tôi nghĩ quy trình này thú vị' hoặc 'Đây là phương pháp hiệu quả.'"
      }
    ],
    goldenSecret: "The passive voice is your BEST FRIEND in process descriptions. Instead of 'Workers harvest the cocoa beans', write 'The cocoa beans are harvested.' This sounds more academic AND you don't need to know WHO does each step!",
    goldenSecretVi: "Câu bị động là BẠN THÂN NHẤT trong mô tả quy trình. Thay vì 'Workers harvest the cocoa beans', viết 'The cocoa beans are harvested.' Nghe học thuật hơn VÀ bạn không cần biết AI làm mỗi bước!",
    vocabHighlights: [
      { word: "culminating", definition: "Reaching the highest point or final stage", definitionVi: "Đạt đến điểm cao nhất hoặc giai đoạn cuối", example: "The process culminates in the final inspection.", band: "8.0+" },
      { word: "subsequently", definition: "After that; next in sequence", definitionVi: "Sau đó; tiếp theo", example: "The beans are dried. Subsequently, they are roasted.", band: "7.0+" },
      { word: "comprises", definition: "Consists of; is made up of", definitionVi: "Bao gồm; được tạo thành từ", example: "The process comprises six main stages.", band: "7.5+" },
    ],
    quiz: [
      {
        question: "What voice should you primarily use when describing a natural process?",
        options: ["Active voice", "Passive voice", "Imperative", "First person"],
        answer: 1,
        explanation: "Natural processes use passive voice because we don't know or need to state WHO performs the action."
      },
      {
        question: "What must you include that many students forget?",
        options: ["Your opinion", "An overview paragraph", "A conclusion with recommendation", "Personal experience"],
        answer: 1,
        explanation: "The overview paragraph states the total stages and what the process begins/ends with — worth 25% of Task Achievement."
      },
      {
        question: "Which sequencing phrase is WRONG for a process description?",
        options: ["Subsequently", "Following this", "Firstly, secondly, thirdly", "At the final stage"],
        answer: 2,
        explanation: "'Firstly, secondly, thirdly' is for essay arguments, not process descriptions. Use 'initially', 'subsequently', etc."
      }
    ],
    cheatSheetPoints: [
      "Natural process = passive voice | Man-made = active or passive",
      "Always include an OVERVIEW: stages count + start/end summary",
      "Sequencing: Initially → Subsequently → Following this → Finally",
      "NEVER use firstly/secondly/thirdly for processes",
      "NEVER add opinions in Task 1",
      "Group stages into 2-3 body paragraphs logically"
    ]
  },
  // --- Listening Section 3-4 Strategies ---
  {
    id: "listening-section-3-4",
    title: "Listening Sections 3 & 4: Academic Mastery",
    titleVi: "Listening Phần 3 & 4: Chinh phục phần học thuật",
    pillar: "skill-based",
    skill: "listening",
    icon: "🎧",
    duration: "25 min",
    level: "advanced",
    description: "Conquer the hardest Listening sections with strategies for academic discussions (S3) and lectures (S4).",
    descriptionVi: "Chinh phục phần Listening khó nhất với chiến lược cho thảo luận học thuật (S3) và bài giảng (S4).",
    strategySteps: [
      {
        step: 1,
        title: "Read Ahead Aggressively",
        titleVi: "Đọc trước thật nhanh",
        description: "Use every second of reading time. Underline keywords in questions. For Section 4, you get 30 seconds — predict content from headings and blanks.",
        descriptionVi: "Tận dụng mọi giây đọc trước. Gạch chân từ khóa trong câu hỏi. Phần 4 có 30 giây — dự đoán nội dung từ tiêu đề và chỗ trống.",
        example: "Q: The professor argues that urban farming can reduce ___. → Predict: pollution / costs / food miles"
      },
      {
        step: 2,
        title: "Track Speaker Roles (Section 3)",
        titleVi: "Theo dõi vai trò người nói (Phần 3)",
        description: "Section 3 has 2-4 speakers in a discussion. Identify WHO says WHAT. Questions often test whether you can distinguish opinions between speakers.",
        descriptionVi: "Phần 3 có 2-4 người nói trong thảo luận. Xác định AI nói CÁI GÌ. Câu hỏi thường kiểm tra bạn phân biệt ý kiến giữa các người nói.",
        example: "Student A: 'I think surveys are best.' Student B: 'Actually, interviews give richer data.' → Q asks about Student B's preference."
      },
      {
        step: 3,
        title: "Listen for Signpost Language",
        titleVi: "Nghe từ chỉ dẫn (signpost)",
        description: "Academic speakers use signpost phrases to structure their talk: 'Moving on to...', 'What's particularly interesting is...', 'The key finding was...' These signal that the answer is coming.",
        descriptionVi: "Người nói học thuật dùng cụm từ chỉ dẫn: 'Moving on to...', 'What's particularly interesting is...', 'The key finding was...' Chúng báo hiệu đáp án sắp đến.",
        example: "'The most significant result was...' → The next phrase is likely the answer."
      },
      {
        step: 4,
        title: "Handle Distractors in Discussions",
        titleVi: "Xử lý bẫy trong thảo luận",
        description: "Speakers often mention an idea then REJECT it. Listen for: 'Well, actually...', 'On second thought...', 'That's not quite right...'. The FINAL opinion is the answer.",
        descriptionVi: "Người nói thường đề cập ý rồi BÁC BỎ. Nghe: 'Well, actually...', 'On second thought...', 'That's not quite right...'. Ý kiến CUỐI CÙNG mới là đáp án.",
        example: "'I was going to use questionnaires, but actually interviews would be more effective.' → Answer: interviews"
      }
    ],
    practicalExamples: [
      {
        context: "Section 3 — Multiple Choice",
        contextVi: "Phần 3 — Trắc nghiệm",
        example: "Q: What does Sarah think about the research method?\nA) It's too time-consuming  B) It produces reliable data  C) It needs more participants\nAudio: 'I know some people say surveys take too long, but I actually found them quite efficient and the data was really reliable.'\n→ Answer: B",
        explanation: "Sarah rejects 'too time-consuming' (distractor) and confirms 'reliable data'."
      },
      {
        context: "Section 4 — Note Completion",
        contextVi: "Phần 4 — Hoàn thành ghi chú",
        example: "Notes: Urban farming benefits:\n- Reduces food ___\n- Creates community ___\nAudio: 'One major advantage is reducing food miles... and it builds a real sense of community cohesion.'\n→ Answers: miles, cohesion",
        explanation: "Section 4 answers are heard in order — follow the notes sequentially."
      },
      {
        context: "Section 3 — Matching",
        contextVi: "Phần 3 — Nối",
        example: "Match each student with their research topic:\nStudents: Tom, Lisa, Ahmed\nTopics: A) Climate, B) Migration, C) Technology\nListen for each student's final confirmed choice, not initial suggestions.",
        explanation: "Students may discuss multiple topics but confirm only one each."
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Writing the first thing you hear",
        mistakeVi: "Viết điều đầu tiên bạn nghe",
        why: "Section 3-4 speakers often self-correct or change opinions. Wait for the final answer.",
        whyVi: "Người nói Phần 3-4 thường tự sửa hoặc đổi ý. Đợi đáp án cuối cùng."
      },
      {
        mistake: "Losing your place in Section 4",
        mistakeVi: "Bị lạc vị trí trong Phần 4",
        why: "Section 4 has no pause in the middle. If you miss one answer, skip it immediately and move to the next question.",
        whyVi: "Phần 4 không có khoảng dừng giữa chừng. Nếu lỡ một đáp án, bỏ qua ngay và chuyển câu tiếp."
      },
      {
        mistake: "Ignoring word limit",
        mistakeVi: "Bỏ qua giới hạn từ",
        why: "'No more than TWO words' means exactly that. 'Community cohesion' ✓ but 'strong community cohesion' ✗ (3 words).",
        whyVi: "'Không quá HAI từ' nghĩa là đúng vậy. 'Community cohesion' ✓ nhưng 'strong community cohesion' ✗ (3 từ)."
      }
    ],
    goldenSecret: "In Section 4, the speaker ALWAYS follows the order of the questions. If you're on Q35, the answer comes AFTER Q34's answer. Never jump ahead — trust the sequence!",
    goldenSecretVi: "Trong Phần 4, người nói LUÔN theo thứ tự câu hỏi. Nếu bạn ở Q35, đáp án đến SAU đáp án Q34. Đừng nhảy cóc — tin vào trình tự!",
    vocabHighlights: [
      { word: "cohesion", definition: "The action of forming a united whole", definitionVi: "Sự gắn kết, liên kết thành một thể thống nhất", example: "Social cohesion is vital for community development.", band: "7.0+" },
      { word: "methodology", definition: "A system of methods used in a particular area", definitionVi: "Phương pháp luận, hệ thống phương pháp", example: "The research methodology needs to be clearly explained.", band: "7.0+" },
      { word: "correlation", definition: "A mutual relationship between two things", definitionVi: "Mối tương quan giữa hai sự vật", example: "There is a strong correlation between diet and health.", band: "7.5+" },
      { word: "implications", definition: "The possible effects or results of an action", definitionVi: "Hàm ý, tác động có thể xảy ra", example: "The findings have significant implications for policy.", band: "7.0+" }
    ],
    quiz: [
      {
        question: "In Section 3, when a speaker says 'Well, actually...' after stating an opinion, you should:",
        options: ["Write the first opinion as the answer", "Wait for the corrected/final opinion", "Choose neither opinion", "Ask for clarification"],
        answer: 1,
        explanation: "'Well, actually...' signals a correction. The opinion AFTER this phrase is the real answer."
      },
      {
        question: "What is unique about Section 4 compared to other sections?",
        options: ["It has two speakers", "There is no pause in the middle", "Questions are easier", "You hear it twice"],
        answer: 1,
        explanation: "Section 4 plays straight through with no break. You must follow along without stopping."
      },
      {
        question: "If the instruction says 'Write NO MORE THAN TWO WORDS', which answer is correct?",
        options: ["'very high temperature'", "'high temperature'", "'the high temperature'", "'temperatures are high'"],
        answer: 1,
        explanation: "'high temperature' is exactly 2 words. The others exceed the word limit or include articles."
      }
    ],
    cheatSheetPoints: [
      "S3: Track WHO says WHAT — multiple speakers = opinion traps",
      "S4: No pause — if you miss one, MOVE ON immediately",
      "Signpost phrases signal answers: 'The key point is...', 'What matters most...'",
      "Self-corrections: 'Actually...' / 'On second thought...' = real answer follows",
      "ALWAYS check word limit before writing",
      "Answers in S4 come in ORDER — trust the sequence"
    ]
  },

  // --- Speaking Part 3 Discussion Techniques ---
  {
    id: "speaking-part3-discussion",
    title: "Speaking Part 3: Discussion & Abstract Thinking",
    titleVi: "Speaking Phần 3: Thảo luận & Tư duy trừu tượng",
    pillar: "skill-based",
    skill: "speaking",
    icon: "🗣️",
    duration: "22 min",
    level: "advanced",
    description: "Master the most challenging part of IELTS Speaking: giving extended, well-structured answers on abstract topics.",
    descriptionVi: "Thành thạo phần khó nhất của IELTS Speaking: đưa ra câu trả lời mở rộng, có cấu trúc về chủ đề trừu tượng.",
    strategySteps: [
      {
        step: 1,
        title: "Use the PEEL Framework",
        titleVi: "Dùng khung PEEL",
        description: "Point → Explain → Example → Link back. State your opinion clearly, explain WHY, give a real-world example, then connect back to the question.",
        descriptionVi: "Point (Luận điểm) → Explain (Giải thích) → Example (Ví dụ) → Link (Liên kết). Nêu ý kiến rõ ràng, giải thích TẠI SAO, cho ví dụ thực tế, rồi liên hệ lại câu hỏi.",
        example: "Q: Do you think technology has changed education?\nP: Absolutely, technology has revolutionized how we learn.\nE: Students now have access to unlimited resources online.\nEx: For instance, platforms like Coursera offer university-level courses for free.\nL: So yes, the impact on education has been transformative."
      },
      {
        step: 2,
        title: "Show Both Sides (Even If You Agree)",
        titleVi: "Trình bày hai mặt (dù bạn đồng ý)",
        description: "Examiners reward balanced thinking. Use: 'On one hand... on the other hand...', 'While some argue... others believe...', 'It's a double-edged sword because...'",
        descriptionVi: "Giám khảo đánh giá cao tư duy cân bằng. Dùng: 'On one hand... on the other hand...', 'While some argue... others believe...', 'It's a double-edged sword because...'",
        example: "'While technology has made education more accessible, there's also a concern that it reduces face-to-face interaction between students and teachers.'"
      },
      {
        step: 3,
        title: "Speculate and Hypothesize",
        titleVi: "Suy đoán và giả định",
        description: "Part 3 often asks about the future or hypothetical situations. Use: 'I would imagine that...', 'It's quite likely that...', 'If current trends continue...', 'There's a possibility that...'",
        descriptionVi: "Phần 3 thường hỏi về tương lai hoặc tình huống giả định. Dùng: 'I would imagine that...', 'It's quite likely that...', 'If current trends continue...', 'There's a possibility that...'",
        example: "'If current trends continue, I would imagine that most traditional classrooms will be replaced by hybrid learning environments within the next decade.'"
      },
      {
        step: 4,
        title: "Upgrade Your Vocabulary Live",
        titleVi: "Nâng cấp từ vựng ngay lúc nói",
        description: "Self-correct to show range: 'It's important — or rather, it's absolutely crucial...'. Use topic-specific collocations instead of basic words.",
        descriptionVi: "Tự sửa để thể hiện vốn từ: 'It's important — or rather, it's absolutely crucial...'. Dùng collocation theo chủ đề thay vì từ cơ bản.",
        example: "Instead of 'People should help the environment' → 'Citizens have a collective responsibility to mitigate environmental degradation.'"
      }
    ],
    practicalExamples: [
      {
        context: "Abstract Question — Society",
        contextVi: "Câu hỏi trừu tượng — Xã hội",
        example: "Q: 'Why do some people prefer to live in cities rather than rural areas?'\n\nWeak: 'Because cities have more jobs and things to do.'\n\nStrong: 'I think the primary draw of urban living is the abundance of professional opportunities. Cities tend to be economic hubs where industries cluster, offering a wider range of career prospects. Additionally, the cultural amenities — museums, theatres, diverse cuisine — provide a lifestyle that many find appealing. Having said that, there's a growing counter-trend of people seeking the tranquility of rural life, especially after the pandemic normalized remote work.'",
        explanation: "The strong answer uses PEEL, shows both sides, and includes advanced vocabulary."
      },
      {
        context: "Future Prediction Question",
        contextVi: "Câu hỏi dự đoán tương lai",
        example: "Q: 'How do you think education will change in the future?'\n\n'That's an interesting question. I would imagine that education will become increasingly personalized through AI-driven platforms. It's quite likely that traditional one-size-fits-all curricula will give way to adaptive learning paths. For instance, students might have AI tutors that identify their weak areas and tailor content accordingly. However, I think the human element — the mentor-student relationship — will remain irreplaceable.'",
        explanation: "Uses speculation language, gives a concrete example, and adds a balanced counterpoint."
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Giving one-sentence answers",
        mistakeVi: "Trả lời chỉ một câu",
        why: "Part 3 requires extended responses (4-6 sentences). Short answers cap your score at Band 5.0.",
        whyVi: "Phần 3 yêu cầu trả lời mở rộng (4-6 câu). Trả lời ngắn giới hạn điểm ở Band 5.0."
      },
      {
        mistake: "Using only personal examples",
        mistakeVi: "Chỉ dùng ví dụ cá nhân",
        why: "Part 3 tests abstract thinking. Mix personal anecdotes with societal observations and data references.",
        whyVi: "Phần 3 kiểm tra tư duy trừu tượng. Kết hợp chuyện cá nhân với quan sát xã hội và tham chiếu dữ liệu."
      },
      {
        mistake: "Repeating the question words in your answer",
        mistakeVi: "Lặp lại từ trong câu hỏi",
        why: "Paraphrase the question: 'Why is education important?' → 'The significance of learning cannot be overstated...'",
        whyVi: "Diễn đạt lại câu hỏi: 'Why is education important?' → 'The significance of learning cannot be overstated...'"
      }
    ],
    goldenSecret: "When you don't know what to say, use the TIME TRAVEL technique: talk about the PAST ('Traditionally...'), the PRESENT ('Nowadays...'), and the FUTURE ('Going forward...'). This instantly gives you a 3-part structure for ANY topic!",
    goldenSecretVi: "Khi không biết nói gì, dùng kỹ thuật DU HÀNH THỜI GIAN: nói về QUÁ KHỨ ('Traditionally...'), HIỆN TẠI ('Nowadays...'), và TƯƠNG LAI ('Going forward...'). Điều này ngay lập tức cho bạn cấu trúc 3 phần cho BẤT KỲ chủ đề nào!",
    vocabHighlights: [
      { word: "double-edged sword", definition: "Something that has both advantages and disadvantages", definitionVi: "Con dao hai lưỡi — có cả ưu và nhược điểm", example: "Social media is a double-edged sword for teenagers.", band: "7.0+" },
      { word: "paradigm shift", definition: "A fundamental change in approach or thinking", definitionVi: "Sự thay đổi mô hình tư duy căn bản", example: "Remote work has caused a paradigm shift in business culture.", band: "8.0+" },
      { word: "mitigate", definition: "To make something less severe or serious", definitionVi: "Giảm thiểu, làm giảm mức độ nghiêm trọng", example: "Governments must mitigate the effects of climate change.", band: "7.5+" },
      { word: "collective responsibility", definition: "Shared duty among all members of a group", definitionVi: "Trách nhiệm chung của tất cả thành viên", example: "Environmental protection is a collective responsibility.", band: "7.0+" },
      { word: "counter-trend", definition: "A trend that moves in the opposite direction", definitionVi: "Xu hướng ngược lại", example: "There's a counter-trend of people leaving cities for rural areas.", band: "7.5+" }
    ],
    quiz: [
      {
        question: "What does the PEEL framework stand for?",
        options: ["Point, Explain, Example, Link", "Practice, Evaluate, Examine, Learn", "Present, Elaborate, Evidence, Logic", "Plan, Execute, Edit, Launch"],
        answer: 0,
        explanation: "PEEL = Point (state opinion) → Explain (give reason) → Example (real-world) → Link (connect back to question)."
      },
      {
        question: "Which phrase best shows balanced thinking in Part 3?",
        options: ["'I totally agree because...'", "'It's a double-edged sword because...'", "'I don't know much about this...'", "'My friend told me that...'"],
        answer: 1,
        explanation: "'Double-edged sword' shows you can see both advantages and disadvantages — exactly what examiners want."
      },
      {
        question: "What is the TIME TRAVEL technique?",
        options: ["Talking about your childhood memories", "Discussing past, present, and future of a topic", "Asking the examiner to repeat the question", "Speaking as fast as possible"],
        answer: 1,
        explanation: "Past ('Traditionally...') → Present ('Nowadays...') → Future ('Going forward...') gives instant structure for any abstract topic."
      },
      {
        question: "In Part 3, how long should your answers typically be?",
        options: ["1 sentence", "2-3 sentences", "4-6 sentences", "10+ sentences"],
        answer: 2,
        explanation: "4-6 sentences is the sweet spot — enough to demonstrate depth without rambling."
      }
    ],
    cheatSheetPoints: [
      "PEEL: Point → Explain → Example → Link back",
      "Show BOTH sides: 'On one hand... on the other hand...'",
      "Speculate: 'I would imagine...', 'It's quite likely that...'",
      "TIME TRAVEL: Past → Present → Future for any topic",
      "Self-correct to show range: 'important — or rather, crucial'",
      "4-6 sentences per answer — never just one sentence"
    ]
  },

  // --- Reading Matching Information ---
  {
    id: "reading-matching-information",
    title: "Reading: Matching Information to Paragraphs",
    titleVi: "Reading: Nối thông tin với đoạn văn",
    pillar: "skill-based",
    skill: "reading",
    icon: "📖",
    duration: "20 min",
    level: "advanced",
    description: "Master the trickiest Reading question type: finding which paragraph contains specific information.",
    descriptionVi: "Thành thạo dạng câu hỏi Reading khó nhất: tìm đoạn văn chứa thông tin cụ thể.",
    strategySteps: [
      {
        step: 1,
        title: "Understand the Difference: Matching Headings vs. Matching Information",
        titleVi: "Phân biệt: Matching Headings vs. Matching Information",
        description: "Matching Headings = find the MAIN IDEA of each paragraph. Matching Information = find a SPECIFIC DETAIL mentioned somewhere in a paragraph. They test completely different skills.",
        descriptionVi: "Matching Headings = tìm Ý CHÍNH mỗi đoạn. Matching Information = tìm CHI TIẾT CỤ THỂ trong một đoạn. Hai kỹ năng hoàn toàn khác nhau.",
        example: "Heading: 'The economic impact of tourism' (main idea) vs. Information: 'a reference to the cost of maintaining heritage sites' (specific detail)"
      },
      {
        step: 2,
        title: "Analyze the Statements First",
        titleVi: "Phân tích câu hỏi trước",
        description: "Read ALL statements before scanning the text. Underline the key content words (nouns, verbs, adjectives). These are your search terms.",
        descriptionVi: "Đọc TẤT CẢ câu hỏi trước khi quét bài đọc. Gạch chân từ khóa nội dung (danh từ, động từ, tính từ). Đây là từ tìm kiếm của bạn.",
        example: "Statement: 'a comparison between two methods of transport' => Key words: comparison, two methods, transport"
      },
      {
        step: 3,
        title: "Scan for Paraphrases, Not Exact Words",
        titleVi: "Quét tìm cách diễn đạt khác, không phải từ giống hệt",
        description: "The text will NEVER use the exact same words as the statement. Look for synonyms: 'a negative effect' = 'detrimental impact', 'drawback', 'downside'.",
        descriptionVi: "Bài đọc SẼ KHÔNG BAO GIỜ dùng đúng từ trong câu hỏi. Tìm từ đồng nghĩa: 'a negative effect' = 'detrimental impact', 'drawback', 'downside'.",
        example: "Statement: 'an explanation of why a particular approach was unsuccessful' => Text: 'This strategy ultimately failed due to insufficient funding.' => Match!"
      },
      {
        step: 4,
        title: "Accept That Paragraphs Can Be Used More Than Once",
        titleVi: "Chấp nhận rằng đoạn văn có thể dùng nhiều lần",
        description: "Unlike Matching Headings, the SAME paragraph can match MULTIPLE statements. Do not eliminate a paragraph after using it once.",
        descriptionVi: "Khác Matching Headings, CÙNG MỘT đoạn có thể khớp NHIỀU câu hỏi. Đừng loại bỏ đoạn sau khi dùng một lần.",
        example: "Paragraph C might contain both 'a reference to cost savings' AND 'an example of international cooperation'."
      }
    ],
    practicalExamples: [
      {
        context: "Matching Information - Science Passage",
        contextVi: "Matching Information - Bài đọc Khoa học",
        example: "Statements:\n1. 'a reference to the speed at which results were obtained'\n2. 'an unexpected finding'\n\nParagraph D: 'The data was collected remarkably quickly, within just three weeks. Surprisingly, the control group showed higher improvement than the test group.'\n=> Statement 1 matches 'remarkably quickly' | Statement 2 matches 'Surprisingly'",
        explanation: "Both statements match Paragraph D - the same paragraph can appear twice."
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Looking for exact word matches",
        mistakeVi: "Tìm từ giống hệt nhau",
        why: "IELTS always paraphrases. 'Cost' might appear as 'expenditure', 'financial burden', or 'expense'.",
        whyVi: "IELTS luôn diễn đạt khác. 'Cost' có thể xuất hiện là 'expenditure', 'financial burden', hoặc 'expense'."
      },
      {
        mistake: "Reading the entire passage word by word",
        mistakeVi: "Đọc cả bài từng từ một",
        why: "This wastes time. Scan for your keywords and their synonyms. Focus on the first and last sentences of each paragraph first.",
        whyVi: "Điều này lãng phí thời gian. Quét tìm từ khóa và từ đồng nghĩa. Tập trung câu đầu và câu cuối mỗi đoạn trước."
      },
      {
        mistake: "Assuming each paragraph matches only one statement",
        mistakeVi: "Giả định mỗi đoạn chỉ khớp một câu hỏi",
        why: "One paragraph can match 2-3 statements. Some paragraphs may not match any. Read the instructions carefully.",
        whyVi: "Một đoạn có thể khớp 2-3 câu. Một số đoạn có thể không khớp câu nào. Đọc kỹ hướng dẫn."
      }
    ],
    goldenSecret: "Start with the MOST SPECIFIC statement - the one with names, numbers, dates, or unique terms. These are easiest to locate because they are harder to paraphrase. Save vague statements for last!",
    goldenSecretVi: "Bắt đầu với câu CỤ THỂ NHẤT - câu có tên riêng, con số, ngày tháng. Chúng dễ tìm nhất vì khó diễn đạt lại. Để câu mơ hồ sau cùng!",
    vocabHighlights: [
      { word: "paraphrase", definition: "Express the same meaning using different words", definitionVi: "Diễn đạt lại cùng ý nghĩa bằng từ khác", example: "IELTS questions always paraphrase the passage text.", band: "7.0+" },
      { word: "detrimental", definition: "Causing harm or damage", definitionVi: "Gây hại, có tác hại", example: "Pollution has a detrimental effect on public health.", band: "7.5+" },
      { word: "expenditure", definition: "The amount of money spent", definitionVi: "Chi tiêu, khoản chi", example: "Government expenditure on education has increased.", band: "7.0+" },
      { word: "unprecedented", definition: "Never done or known before", definitionVi: "Chưa từng có tiền lệ", example: "The pandemic caused unprecedented disruption to education.", band: "7.5+" }
    ],
    quiz: [
      {
        question: "How is Matching Information different from Matching Headings?",
        options: ["They are the same thing", "Matching Information finds specific details, Matching Headings finds main ideas", "Matching Information is easier", "Matching Headings allows repeated paragraphs"],
        answer: 1,
        explanation: "Matching Headings = main idea per paragraph. Matching Information = locating specific details within paragraphs."
      },
      {
        question: "Can the same paragraph match more than one statement?",
        options: ["Never", "Yes, frequently", "Only in Academic IELTS", "Only if the instructions say so"],
        answer: 1,
        explanation: "Unlike Matching Headings, the same paragraph CAN be the answer for multiple statements."
      },
      {
        question: "What should you do FIRST when approaching Matching Information?",
        options: ["Read the full passage carefully", "Underline key content words in the statements", "Answer other question types first", "Count the paragraphs"],
        answer: 1,
        explanation: "Analyze all statements first, underline keywords, then scan the passage for synonyms of those keywords."
      }
    ],
    cheatSheetPoints: [
      "Matching Information != Matching Headings (details vs. main ideas)",
      "Read ALL statements first, underline key content words",
      "Look for PARAPHRASES - never exact word matches",
      "Same paragraph CAN match multiple statements",
      "Start with the MOST SPECIFIC statement (names, numbers, dates)",
      "First + last sentences of paragraphs = quickest scan targets"
    ]
  },

  // --- Writing Task 1: Maps & Diagrams ---
  {
    id: "writing-task1-maps-diagrams",
    title: "Writing Task 1: Maps & Diagrams",
    titleVi: "Writing Task 1: Bản đồ & Sơ đồ",
    pillar: "skill-based",
    skill: "writing",
    icon: "✍️",
    duration: "22 min",
    level: "intermediate",
    description: "Conquer the least practiced Task 1 type: describing changes on maps and spatial diagrams with confidence.",
    descriptionVi: "Chinh phục dạng Task 1 ít được luyện nhất: mô tả thay đổi trên bản đồ và sơ đồ không gian.",
    strategySteps: [
      {
        step: 1,
        title: "Identify the Map Type",
        titleVi: "Xác định loại bản đồ",
        description: "There are 2 types: (A) Before-and-After maps showing changes over time, (B) A single map showing a planned development. Your language changes depending on the type.",
        descriptionVi: "Có 2 loại: (A) Bản đồ Trước-và-Sau thể hiện thay đổi theo thời gian, (B) Bản đồ đơn thể hiện kế hoạch phát triển. Ngôn ngữ thay đổi tùy loại.",
        example: "Type A (past changes): 'was replaced by', 'was converted into'\nType B (future plans): 'is proposed to be', 'will be constructed'"
      },
      {
        step: 2,
        title: "Use Directional & Positional Language",
        titleVi: "Dùng ngôn ngữ chỉ hướng & vị trí",
        description: "Master spatial vocabulary: 'to the north/south/east/west of', 'in the north-eastern corner', 'adjacent to', 'in the vicinity of', 'in close proximity to', 'on the outskirts of'.",
        descriptionVi: "Thành thạo từ vựng không gian: 'to the north/south/east/west of', 'in the north-eastern corner', 'adjacent to', 'in the vicinity of', 'in close proximity to', 'on the outskirts of'.",
        example: "'A new shopping centre was constructed to the south of the river, adjacent to the existing residential area.'"
      },
      {
        step: 3,
        title: "Describe Changes with Transformation Verbs",
        titleVi: "Mô tả thay đổi bằng động từ chuyển đổi",
        description: "Use precise verbs: 'was demolished/removed/knocked down', 'was replaced by/converted into/transformed into', 'was extended/expanded/relocated', 'was newly constructed/erected/established'.",
        descriptionVi: "Dùng động từ chính xác: 'was demolished/removed', 'was replaced by/converted into', 'was extended/expanded', 'was newly constructed/erected'.",
        example: "'The farmland in the south was converted into a residential development, while the old factory was demolished and replaced by a modern sports complex.'"
      },
      {
        step: 4,
        title: "Structure Your Essay: Overview is KING",
        titleVi: "Cấu trúc bài viết: Overview là VUA",
        description: "Paragraph 1: Paraphrase the question. Paragraph 2: OVERVIEW — state the 2 most significant changes. Paragraphs 3-4: Detailed descriptions organized by area or time period.",
        descriptionVi: "Đoạn 1: Viết lại đề bài. Đoạn 2: TỔNG QUAN — nêu 2 thay đổi đáng kể nhất. Đoạn 3-4: Mô tả chi tiết theo khu vực hoặc giai đoạn.",
        example: "Overview: 'Overall, the town underwent significant urbanization between 1990 and 2020, with agricultural land being replaced by residential and commercial developments, particularly in the southern and eastern areas.'"
      }
    ],
    practicalExamples: [
      {
        context: "Before-and-After Map",
        contextVi: "Bản đồ Trước-và-Sau",
        example: "The maps show a coastal town in 1980 and 2020.\n\nSample paragraph: 'The most striking change was the transformation of the northern farmland into a large housing estate comprising approximately 200 units. The original fishing port, which occupied the eastern shoreline, was demolished and replaced by a marina and tourist facilities. Meanwhile, the town centre was pedestrianized, with the main road being diverted to the west.'",
        explanation: "Uses transformation verbs (demolished, replaced, diverted), positional language (northern, eastern shoreline), and passive voice throughout."
      },
      {
        context: "Planned Development Map",
        contextVi: "Bản đồ Kế hoạch Phát triển",
        example: "The map shows proposed changes to a university campus.\n\nSample: 'According to the plan, a new science building is to be erected in the north-eastern corner of the campus, adjacent to the existing library. The current car park will be relocated to the southern perimeter to make way for a landscaped garden. Additionally, a pedestrian pathway is proposed to connect the main entrance to the new student accommodation block.'",
        explanation: "Uses future/proposed language: 'is to be erected', 'will be relocated', 'is proposed to connect'."
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Describing every single detail on the map",
        mistakeVi: "Mô tả mọi chi tiết trên bản đồ",
        why: "Select the most significant changes. Minor details (like a bench being moved) waste words. Focus on major transformations.",
        whyVi: "Chọn thay đổi đáng kể nhất. Chi tiết nhỏ (như ghế bị di chuyển) lãng phí từ. Tập trung vào biến đổi lớn."
      },
      {
        mistake: "Using 'left/right' instead of compass directions",
        mistakeVi: "Dùng 'trái/phải' thay vì hướng la bàn",
        why: "'Left' and 'right' are informal and ambiguous. Always use 'north/south/east/west' or 'north-eastern corner'.",
        whyVi: "'Left' và 'right' không trang trọng và mơ hồ. Luôn dùng 'north/south/east/west' hoặc 'north-eastern corner'."
      },
      {
        mistake: "Forgetting the overview paragraph",
        mistakeVi: "Quên đoạn tổng quan",
        why: "Without an overview, you CANNOT score above Band 5.0 for Task Achievement. It's the most important paragraph.",
        whyVi: "Không có tổng quan, bạn KHÔNG THỂ được trên Band 5.0 cho Task Achievement. Đây là đoạn quan trọng nhất."
      }
    ],
    goldenSecret: "For maps, the Overview almost writes itself. Just answer: 'What GREW?' and 'What SHRANK or DISAPPEARED?' Those two observations are your entire overview!",
    goldenSecretVi: "Với bản đồ, Tổng quan gần như tự viết. Chỉ cần trả lời: 'Cái gì MỞ RỘNG?' và 'Cái gì THU HẸP hoặc BIẾN MẤT?' Hai nhận xét đó là toàn bộ tổng quan!",
    vocabHighlights: [
      { word: "adjacent to", definition: "Next to or very close to something", definitionVi: "Kề bên, liền kề", example: "The park is adjacent to the school.", band: "7.0+" },
      { word: "in the vicinity of", definition: "In the area near a particular place", definitionVi: "Trong khu vực lân cận", example: "Several restaurants are located in the vicinity of the station.", band: "7.5+" },
      { word: "underwent", definition: "Experienced or was subjected to (a change)", definitionVi: "Trải qua (sự thay đổi)", example: "The area underwent significant redevelopment.", band: "7.0+" },
      { word: "pedestrianized", definition: "Converted to an area for walking only, with no vehicles", definitionVi: "Chuyển thành khu vực chỉ dành cho người đi bộ", example: "The main street was pedestrianized in 2015.", band: "7.5+" },
      { word: "on the outskirts of", definition: "On the outer edges of a town or city", definitionVi: "Ở ngoại ô, rìa thành phố", example: "New housing was built on the outskirts of the town.", band: "7.0+" }
    ],
    quiz: [
      {
        question: "What are the two main types of IELTS map questions?",
        options: ["World maps and city maps", "Before-and-After maps and Planned Development maps", "Political maps and physical maps", "Indoor maps and outdoor maps"],
        answer: 1,
        explanation: "Type A shows changes over time (past tense). Type B shows proposed changes (future/passive constructions)."
      },
      {
        question: "Which spatial phrase should you AVOID in formal map descriptions?",
        options: ["'to the north of'", "'adjacent to'", "'on the left side'", "'in the north-eastern corner'"],
        answer: 2,
        explanation: "'Left' and 'right' are informal. Use compass directions: north, south, east, west."
      },
      {
        question: "What is Teacher Hai's shortcut for writing the Overview?",
        options: ["Describe every building", "Answer: What GREW? What SHRANK/DISAPPEARED?", "Copy the question", "Write about colors on the map"],
        answer: 1,
        explanation: "The overview = What expanded + What was removed/reduced. Two observations, done!"
      }
    ],
    cheatSheetPoints: [
      "2 types: Before-After (past tense) vs. Planned (future/proposed)",
      "Compass directions ONLY — never 'left/right'",
      "Transformation verbs: demolished, replaced by, converted into, relocated",
      "Positional: adjacent to, in the vicinity of, on the outskirts of",
      "OVERVIEW is mandatory: What GREW? What SHRANK/DISAPPEARED?",
      "Don't describe every detail — select the most significant changes"
    ]
  },
];

// === PILLAR 2: IELTS TIPS & HACKS ===

const tipsAndHacks: IeltsLecture[] = [
  {
    id: "band8-intro-3min",
    title: "Write a Band 8.0 Introduction in 3 Minutes",
    titleVi: "Viết mở bài Band 8.0 trong 3 phút",
    pillar: "tips-hacks",
    skill: "writing",
    icon: "⚡",
    duration: "12 min",
    level: "advanced",
    description: "The fastest proven method to write a Band 8.0 introduction that impresses any examiner.",
    descriptionVi: "Phương pháp nhanh nhất đã được chứng minh để viết mở bài Band 8.0 gây ấn tượng với mọi giám khảo.",
    strategySteps: [
      {
        step: 1,
        title: "Sentence 1: Paraphrase + Background",
        titleVi: "Câu 1: Diễn đạt lại + Nền tảng",
        description: "Take the question and rewrite it using synonyms and different grammar. This is your background statement.",
        descriptionVi: "Lấy câu hỏi và viết lại dùng từ đồng nghĩa và ngữ pháp khác. Đây là câu nền.",
        example: "Q: 'Some people think universities should focus on practical skills.' → 'It is increasingly argued that higher education institutions should prioritize vocational competencies over theoretical knowledge.'"
      },
      {
        step: 2,
        title: "Sentence 2: Thesis + Preview",
        titleVi: "Câu 2: Luận đề + Giới thiệu",
        description: "State your clear position AND preview your 2 main arguments in one sentence.",
        descriptionVi: "Nêu lập trường rõ ràng VÀ giới thiệu 2 luận điểm chính trong một câu.",
        example: "I strongly agree with this perspective, as practical training enhances employability and bridges the gap between academia and industry demands."
      }
    ],
    practicalExamples: [
      {
        context: "Question: 'Some people believe that social media has more negative effects than positive ones on society.'",
        contextVi: "Đề bài: 'Một số người tin rằng mạng xã hội có nhiều tác động tiêu cực hơn tích cực đối với xã hội.'",
        example: "Band 8.0 Introduction: 'In recent years, the pervasive influence of online networking platforms on society has become a subject of considerable debate. I firmly believe that while social media offers some benefits, its detrimental impact on mental health and the spread of misinformation outweigh the advantages.'",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Writing more than 2 sentences in the introduction",
        mistakeVi: "Viết quá 2 câu trong mở bài",
        why: "A concise intro shows confidence. Over-writing wastes time for body paragraphs.",
        whyVi: "Mở bài ngắn gọn thể hiện sự tự tin. Viết dài lãng phí thời gian cho thân bài."
      },
      {
        mistake: "Using 'I think' or 'In my opinion' at Band 8.0",
        mistakeVi: "Dùng 'I think' hoặc 'In my opinion' ở Band 8.0",
        why: "Use stronger alternatives: 'I firmly believe', 'I am convinced that', 'I wholeheartedly concur'.",
        whyVi: "Dùng cách diễn đạt mạnh hơn: 'I firmly believe', 'I am convinced that', 'I wholeheartedly concur'."
      }
    ],
    goldenSecret: "Memorize 5 power paraphrasing templates and you'll never struggle with introductions again: 'It is increasingly argued that...', 'In contemporary society,...', 'The notion that... has become a subject of heated debate.', 'There is a growing consensus that...', 'It is undeniable that...'",
    goldenSecretVi: "Ghi nhớ 5 mẫu diễn đạt lại và bạn sẽ không bao giờ vật lộn với mở bài: 'It is increasingly argued that...', 'In contemporary society,...', 'The notion that... has become a subject of heated debate.', 'There is a growing consensus that...', 'It is undeniable that...'",
    vocabHighlights: [
      { word: "pervasive", definition: "Spreading widely throughout", definitionVi: "Lan rộng khắp nơi", example: "The pervasive use of smartphones has changed daily life.", band: "8.0+" },
      { word: "detrimental", definition: "Causing harm or damage", definitionVi: "Gây hại hoặc tổn thương", example: "Excessive screen time can be detrimental to children's development.", band: "7.5+" },
    ],
    quiz: [
      {
        question: "How many sentences should a Band 8.0 introduction contain?",
        options: ["1", "2", "3", "4"],
        answer: 1,
        explanation: "Exactly 2 sentences: one for background/paraphrase, one for thesis + preview."
      },
      {
        question: "Which phrase is stronger for Band 8.0?",
        options: ["I think", "In my opinion", "I firmly believe", "Maybe"],
        answer: 2,
        explanation: "'I firmly believe' shows confident, academic language suitable for Band 8.0+."
      },
      {
        question: "What is the FIRST thing you should do with the question?",
        options: ["Copy it", "Paraphrase it using synonyms", "Ignore it", "Translate it"],
        answer: 1,
        explanation: "Always paraphrase the question — never copy it word for word."
      }
    ],
    cheatSheetPoints: [
      "Sentence 1: Paraphrase the question (synonyms + grammar change)",
      "Sentence 2: Thesis (your position) + Preview (2 main ideas)",
      "Never copy the question word-for-word",
      "Use strong opinion phrases: 'I firmly believe', 'I am convinced'",
      "Keep it under 40 words total",
      "Practice 5 power templates until automatic"
    ]
  },
  {
    id: "natural-fillers-speaking",
    title: "The Art of Hesitation: Natural Fillers",
    titleVi: "Nghệ thuật do dự: Từ đệm tự nhiên",
    pillar: "tips-hacks",
    skill: "speaking",
    icon: "💬",
    duration: "10 min",
    level: "foundation",
    description: "Sound like a native speaker by using natural fillers and hesitation devices that actually BOOST your fluency score.",
    descriptionVi: "Nói như người bản xứ bằng cách dùng từ đệm và cách do dự tự nhiên thực sự TĂNG điểm trôi chảy.",
    strategySteps: [
      {
        step: 1,
        title: "Learn the 'Thinking' Fillers",
        titleVi: "Học các từ đệm 'suy nghĩ'",
        description: "Use 'Well,...', 'Let me think...', 'That's an interesting question...' to buy thinking time WITHOUT awkward silence.",
        descriptionVi: "Dùng 'Well,...', 'Let me think...', 'That's an interesting question...' để có thời gian suy nghĩ MÀ KHÔNG im lặng gượng gạo.",
      },
      {
        step: 2,
        title: "Master 'Reformulation' Phrases",
        titleVi: "Thành thạo cụm 'diễn đạt lại'",
        description: "If you make a grammar mistake or say something unclear: 'What I mean is...', 'In other words...', 'To put it another way...'",
        descriptionVi: "Nếu mắc lỗi ngữ pháp hoặc nói không rõ: 'What I mean is...', 'In other words...', 'To put it another way...'",
      },
      {
        step: 3,
        title: "Use 'Elaboration' Connectors",
        titleVi: "Dùng liên từ 'mở rộng'",
        description: "Extend answers naturally: 'As a matter of fact,...', 'Come to think of it,...', 'Now that I think about it,...'",
        descriptionVi: "Mở rộng câu trả lời tự nhiên: 'As a matter of fact,...', 'Come to think of it,...', 'Now that I think about it,...'",
      }
    ],
    practicalExamples: [
      {
        context: "Examiner asks: 'Do you like cooking?'",
        contextVi: "Giám khảo hỏi: 'Bạn có thích nấu ăn không?'",
        example: "❌ 'Yes I do.' (too short) ✅ 'Well, to be perfectly honest, I wouldn't say I'm passionate about cooking, but I do enjoy experimenting with new recipes from time to time. As a matter of fact, just last weekend I tried making Thai green curry for the first time.'",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Using 'um' and 'uh' repeatedly",
        mistakeVi: "Dùng 'um' và 'uh' liên tục",
        why: "These are non-lexical fillers that reduce your fluency score. Replace with phrases.",
        whyVi: "Đây là từ đệm phi ngôn ngữ làm giảm điểm trôi chảy. Thay bằng cụm từ."
      },
      {
        mistake: "Long pauses with no filler at all",
        mistakeVi: "Dừng lâu mà không dùng từ đệm nào",
        why: "Silence > 3 seconds hurts your fluency score. Use a thinking filler to bridge the gap.",
        whyVi: "Im lặng > 3 giây ảnh hưởng điểm trôi chảy. Dùng từ đệm để lấp khoảng trống."
      }
    ],
    goldenSecret: "The examiner doesn't expect perfection — they expect NATURAL speech. A well-placed 'Well, that's actually a great question...' followed by a 2-second pause sounds more natural and confident than rushing into an answer immediately!",
    goldenSecretVi: "Giám khảo không kỳ vọng hoàn hảo — họ kỳ vọng lời nói TỰ NHIÊN. Một câu 'Well, that's actually a great question...' đúng lúc kèm 2 giây dừng nghe tự nhiên và tự tin hơn là vội vàng trả lời ngay!",
    vocabHighlights: [
      { word: "to be perfectly honest", definition: "Used to introduce a candid opinion", definitionVi: "Dùng để giới thiệu ý kiến thẳng thắn", example: "To be perfectly honest, I find grammar quite challenging.", band: "7.0+" },
      { word: "experimenting with", definition: "Trying new things", definitionVi: "Thử nghiệm những điều mới", example: "I enjoy experimenting with different cooking styles.", band: "6.5+" },
    ],
    quiz: [
      {
        question: "Which is a GOOD filler for thinking time?",
        options: ["Um...", "Uh...", "Well, let me think...", "I don't know..."],
        answer: 2,
        explanation: "'Well, let me think...' is a lexical filler that shows control and buys thinking time."
      },
      {
        question: "How long can you pause without it hurting your score?",
        options: ["1 second", "2-3 seconds with a filler", "5 seconds", "10 seconds"],
        answer: 1,
        explanation: "2-3 seconds with a thinking filler is perfectly natural and acceptable."
      },
      {
        question: "What should you say when you make a grammar mistake?",
        options: ["Sorry", "I mean...", "Nothing, just continue", "Start over"],
        answer: 1,
        explanation: "'What I mean is...' or 'I mean...' naturally corrects without drawing too much attention."
      }
    ],
    cheatSheetPoints: [
      "Thinking fillers: Well... / Let me think... / That's a good question...",
      "Reformulation: What I mean is... / In other words... / To put it differently...",
      "Elaboration: As a matter of fact... / Come to think of it...",
      "Replace 'um/uh' with proper lexical fillers",
      "2-3 second pauses with fillers are NATURAL",
      "Practice until these phrases become automatic"
    ]
  },
  {
    id: "keyword-transformation-reading",
    title: "Keyword Transformation Table",
    titleVi: "Bảng biến đổi từ khóa",
    pillar: "tips-hacks",
    skill: "reading",
    icon: "🔑",
    duration: "15 min",
    level: "advanced",
    description: "The secret weapon for finding answers faster in IELTS Reading — master how the test transforms keywords.",
    descriptionVi: "Vũ khí bí mật để tìm đáp án nhanh hơn trong IELTS Reading — thành thạo cách đề thi biến đổi từ khóa.",
    strategySteps: [
      {
        step: 1,
        title: "Build Your Transformation Table",
        titleVi: "Xây dựng bảng biến đổi",
        description: "For each keyword in the question, write 3-4 possible synonyms or paraphrases the passage might use.",
        descriptionVi: "Với mỗi từ khóa trong câu hỏi, viết 3-4 từ đồng nghĩa hoặc cách diễn đạt khác mà bài đọc có thể dùng.",
        example: "'children' → young people, minors, youth, the younger generation; 'important' → crucial, vital, essential, significant"
      },
      {
        step: 2,
        title: "Scan for Transformations, Not Exact Words",
        titleVi: "Quét tìm biến đổi, không tìm từ gốc",
        description: "IELTS passages almost NEVER use the same words as the questions. Look for your predicted synonyms.",
        descriptionVi: "Bài đọc IELTS hầu như KHÔNG BAO GIỜ dùng cùng từ với câu hỏi. Tìm các từ đồng nghĩa bạn đã dự đoán.",
      },
      {
        step: 3,
        title: "Watch for Grammar Transformations",
        titleVi: "Chú ý biến đổi ngữ pháp",
        description: "Questions may change the grammar: active → passive, noun → verb, positive → negative. 'The government banned...' → 'A prohibition was imposed by authorities...'",
        descriptionVi: "Câu hỏi có thể đổi ngữ pháp: chủ động → bị động, danh từ → động từ, khẳng định → phủ định.",
      }
    ],
    practicalExamples: [
      {
        context: "Common keyword transformations in IELTS",
        contextVi: "Các biến đổi từ khóa phổ biến trong IELTS",
        example: "increase → rise, grow, expand, surge | reduce → decrease, decline, diminish, drop | important → crucial, vital, essential, paramount | difficult → challenging, demanding, arduous, formidable",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Searching for exact keywords from the question",
        mistakeVi: "Tìm từ khóa y nguyên từ câu hỏi",
        why: "IELTS uses paraphrasing extensively. You'll waste time looking for words that don't exist in the passage.",
        whyVi: "IELTS sử dụng diễn đạt lại rộng rãi. Bạn sẽ lãng phí thời gian tìm từ không có trong bài."
      }
    ],
    goldenSecret: "Numbers, dates, and proper nouns are NEVER paraphrased. If the question mentions '2019' or 'Professor Smith', these exact words WILL appear in the passage. Use these as anchor points to locate the answer area quickly!",
    goldenSecretVi: "Số, ngày tháng, và danh từ riêng KHÔNG BAO GIỜ bị diễn đạt lại. Nếu câu hỏi nhắc '2019' hoặc 'Professor Smith', những từ này SẼ xuất hiện y nguyên. Dùng chúng làm điểm neo để xác định vùng đáp án nhanh chóng!",
    vocabHighlights: [
      { word: "paramount", definition: "Of supreme importance", definitionVi: "Có tầm quan trọng tối cao", example: "Safety is paramount in any construction project.", band: "8.0+" },
      { word: "arduous", definition: "Extremely difficult and tiring", definitionVi: "Cực kỳ khó khăn và mệt mỏi", example: "The arduous journey lasted three weeks.", band: "8.0+" },
    ],
    quiz: [
      {
        question: "Which type of word is NEVER paraphrased in IELTS?",
        options: ["Adjectives", "Verbs", "Proper nouns and numbers", "Adverbs"],
        answer: 2,
        explanation: "Numbers, dates, and proper nouns always appear exactly as written — use them as anchor points."
      },
      {
        question: "What is a synonym for 'important' in IELTS?",
        options: ["Nice", "Crucial", "Big", "Fast"],
        answer: 1,
        explanation: "'Crucial' is a common Band 7.0+ synonym for 'important' used in IELTS passages."
      },
      {
        question: "Grammar transformations can change:",
        options: ["Only vocabulary", "Active to passive voice", "Only spelling", "Only meaning"],
        answer: 1,
        explanation: "Grammar transformations include active↔passive, noun↔verb, positive↔negative."
      }
    ],
    cheatSheetPoints: [
      "Build a synonym table BEFORE reading the passage",
      "Numbers, dates, proper nouns = NEVER paraphrased (use as anchors)",
      "increase = rise, grow, expand, surge",
      "important = crucial, vital, essential, paramount",
      "difficult = challenging, demanding, arduous",
      "Watch for grammar changes: active ↔ passive, noun ↔ verb"
    ]
  },
];

// === PILLAR 3: THEMATIC VOCABULARY ===

const thematicVocab: IeltsLecture[] = [
  {
    id: "vocab-environment",
    title: "Environment & Climate Change",
    titleVi: "Môi trường & Biến đổi khí hậu",
    pillar: "thematic-vocab",
    icon: "🌍",
    duration: "20 min",
    level: "intermediate",
    description: "Master 25+ essential Band 7.0+ vocabulary words for the most common IELTS topic: Environment.",
    descriptionVi: "Thành thạo 25+ từ vựng Band 7.0+ thiết yếu cho chủ đề IELTS phổ biến nhất: Môi trường.",
    strategySteps: [
      {
        step: 1,
        title: "Learn Words in Context, Not Isolation",
        titleVi: "Học từ trong ngữ cảnh, không đơn lẻ",
        description: "Don't memorize word lists. Learn each word inside a sentence that you can reuse in your essay or speaking test.",
        descriptionVi: "Đừng học thuộc danh sách từ. Học mỗi từ trong một câu bạn có thể tái sử dụng trong bài viết hoặc thi nói.",
      },
      {
        step: 2,
        title: "Group by Sub-Topic",
        titleVi: "Phân nhóm theo chủ đề phụ",
        description: "Environment vocabulary falls into: Pollution, Conservation, Climate Change, Sustainability, Wildlife.",
        descriptionVi: "Từ vựng môi trường chia thành: Ô nhiễm, Bảo tồn, Biến đổi khí hậu, Phát triển bền vững, Động vật hoang dã.",
      },
      {
        step: 3,
        title: "Practice Collocations",
        titleVi: "Thực hành collocation",
        description: "Learn which words go TOGETHER: 'carbon footprint' (not 'carbon mark'), 'renewable energy' (not 'new energy').",
        descriptionVi: "Học các từ đi CÙNG NHAU: 'carbon footprint' (không phải 'carbon mark'), 'renewable energy' (không phải 'new energy').",
      }
    ],
    practicalExamples: [
      {
        context: "Using environment vocabulary in Writing Task 2",
        contextVi: "Dùng từ vựng môi trường trong Writing Task 2",
        example: "'The proliferation of fossil fuel consumption has exacerbated global warming, leading to an unprecedented rise in sea levels. Consequently, governments must prioritize the transition to renewable energy sources to mitigate these detrimental effects.'",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Using informal language for academic topics",
        mistakeVi: "Dùng ngôn ngữ không trang trọng cho chủ đề học thuật",
        why: "'pollution is bad' → 'pollution poses a significant threat to public health' sounds much more academic.",
        whyVi: "'pollution is bad' → 'pollution poses a significant threat to public health' nghe học thuật hơn nhiều."
      }
    ],
    goldenSecret: "For any environment essay, memorize these 3 'power sentences' that can fit almost ANY prompt: (1) 'The degradation of natural habitats has reached alarming proportions.' (2) 'Sustainable development must be at the forefront of governmental policy.' (3) 'Individual and collective action is imperative to combat environmental deterioration.'",
    goldenSecretVi: "Cho bất kỳ bài luận môi trường nào, ghi nhớ 3 'câu quyền lực' phù hợp HẦU HẾT mọi đề: (1) 'The degradation of natural habitats has reached alarming proportions.' (2) 'Sustainable development must be at the forefront of governmental policy.' (3) 'Individual and collective action is imperative to combat environmental deterioration.'",
    vocabHighlights: [
      { word: "exacerbate", definition: "To make a problem worse", definitionVi: "Làm trầm trọng thêm vấn đề", example: "Deforestation exacerbates climate change.", band: "8.0+" },
      { word: "mitigate", definition: "To reduce the severity of", definitionVi: "Giảm thiểu mức độ nghiêm trọng", example: "Planting trees can help mitigate air pollution.", band: "7.5+" },
      { word: "sustainable", definition: "Able to continue without depleting resources", definitionVi: "Có thể tiếp tục mà không cạn kiệt tài nguyên", example: "We need sustainable energy solutions.", band: "7.0+" },
      { word: "biodiversity", definition: "The variety of life in an ecosystem", definitionVi: "Sự đa dạng sinh học trong hệ sinh thái", example: "Biodiversity loss threatens food security.", band: "7.5+" },
      { word: "carbon footprint", definition: "Total greenhouse gases produced by activities", definitionVi: "Tổng lượng khí nhà kính do hoạt động tạo ra", example: "Everyone should aim to reduce their carbon footprint.", band: "7.0+" },
      { word: "deforestation", definition: "Clearing of forests", definitionVi: "Phá rừng", example: "Deforestation in the Amazon has accelerated.", band: "6.5+" },
      { word: "renewable energy", definition: "Energy from sources that are naturally replenished", definitionVi: "Năng lượng từ nguồn tái tạo tự nhiên", example: "Solar and wind are forms of renewable energy.", band: "6.5+" },
      { word: "ecosystem", definition: "A community of living organisms and their environment", definitionVi: "Cộng đồng sinh vật sống và môi trường", example: "Coral reefs are delicate ecosystems.", band: "7.0+" },
    ],
    quiz: [
      {
        question: "Which word means 'to make a problem worse'?",
        options: ["Mitigate", "Exacerbate", "Sustain", "Conserve"],
        answer: 1,
        explanation: "'Exacerbate' means to make worse. 'Mitigate' is the opposite — to reduce."
      },
      {
        question: "What is the correct collocation?",
        options: ["Carbon mark", "Carbon footprint", "Carbon step", "Carbon track"],
        answer: 1,
        explanation: "'Carbon footprint' is the correct collocation for total greenhouse gas emissions."
      },
      {
        question: "Which sentence sounds most academic?",
        options: ["Pollution is really bad for people", "Pollution poses a significant threat to public health", "Pollution makes people sick", "Pollution is not good"],
        answer: 1,
        explanation: "'Poses a significant threat to public health' uses academic language appropriate for IELTS."
      }
    ],
    cheatSheetPoints: [
      "exacerbate = make worse | mitigate = reduce severity",
      "carbon footprint, renewable energy, sustainable development",
      "biodiversity, ecosystem, deforestation, conservation",
      "Power phrase: 'poses a significant threat to...'",
      "Power phrase: 'at the forefront of governmental policy'",
      "Always use collocations, not individual words"
    ]
  },
  {
    id: "vocab-technology",
    title: "Technology & Innovation",
    titleVi: "Công nghệ & Đổi mới sáng tạo",
    pillar: "thematic-vocab",
    icon: "💻",
    duration: "18 min",
    level: "intermediate",
    description: "Essential Band 7.0+ technology vocabulary for IELTS Writing and Speaking.",
    descriptionVi: "Từ vựng công nghệ Band 7.0+ thiết yếu cho IELTS Writing và Speaking.",
    strategySteps: [
      {
        step: 1,
        title: "Categorize Technology Vocabulary",
        titleVi: "Phân loại từ vựng công nghệ",
        description: "Group into: Digital Life, AI & Automation, Privacy & Security, Communication, Education Technology.",
        descriptionVi: "Phân nhóm: Cuộc sống số, AI & Tự động hóa, Quyền riêng tư & Bảo mật, Truyền thông, Công nghệ giáo dục.",
      },
      {
        step: 2,
        title: "Learn Positive & Negative Expressions",
        titleVi: "Học cách diễn đạt tích cực & tiêu cực",
        description: "For balanced essays, you need vocabulary for BOTH sides: 'revolutionize' (positive) vs 'displace workers' (negative).",
        descriptionVi: "Cho bài luận cân bằng, bạn cần từ vựng CẢ HAI phía: 'revolutionize' (tích cực) vs 'displace workers' (tiêu cực).",
      }
    ],
    practicalExamples: [
      {
        context: "Technology paragraph in a Writing Task 2 essay",
        contextVi: "Đoạn văn công nghệ trong bài Writing Task 2",
        example: "'The advent of artificial intelligence has fundamentally transformed the employment landscape. While automation has streamlined manufacturing processes, it has simultaneously rendered numerous low-skilled positions obsolete, thereby exacerbating socioeconomic inequality.'",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Using 'technology' too many times",
        mistakeVi: "Dùng từ 'technology' quá nhiều lần",
        why: "Use alternatives: 'innovation', 'digital advancement', 'technological breakthrough', 'cutting-edge tools'.",
        whyVi: "Dùng từ thay thế: 'innovation', 'digital advancement', 'technological breakthrough', 'cutting-edge tools'."
      }
    ],
    goldenSecret: "The word 'unprecedented' is the Swiss Army knife of IELTS technology essays. 'Unprecedented access to information', 'unprecedented rate of change', 'unprecedented challenges' — it works for almost any technology argument!",
    goldenSecretVi: "Từ 'unprecedented' là con dao Thụy Sĩ của bài luận công nghệ IELTS. 'Unprecedented access to information', 'unprecedented rate of change', 'unprecedented challenges' — nó hoạt động cho hầu hết mọi luận điểm công nghệ!",
    vocabHighlights: [
      { word: "advent", definition: "The arrival or emergence of something notable", definitionVi: "Sự xuất hiện của điều đáng chú ý", example: "The advent of the internet changed everything.", band: "7.5+" },
      { word: "streamline", definition: "To make more efficient", definitionVi: "Làm hiệu quả hơn", example: "AI has streamlined customer service operations.", band: "7.0+" },
      { word: "obsolete", definition: "No longer in use; outdated", definitionVi: "Không còn sử dụng; lỗi thời", example: "Many traditional skills have become obsolete.", band: "7.0+" },
      { word: "unprecedented", definition: "Never done or known before", definitionVi: "Chưa từng có tiền lệ", example: "We face unprecedented technological challenges.", band: "7.5+" },
      { word: "cutting-edge", definition: "The most advanced", definitionVi: "Tiên tiến nhất", example: "The company uses cutting-edge AI technology.", band: "7.0+" },
    ],
    quiz: [
      {
        question: "What does 'obsolete' mean?",
        options: ["Very modern", "No longer in use", "Expensive", "Popular"],
        answer: 1,
        explanation: "'Obsolete' means outdated or no longer in use — a key word for technology essays."
      },
      {
        question: "Which is a good alternative for 'technology'?",
        options: ["Stuff", "Digital advancement", "Thing", "Machine"],
        answer: 1,
        explanation: "'Digital advancement' is an academic synonym for 'technology' that boosts your lexical score."
      },
      {
        question: "'The ___ of AI has transformed education.' Fill in the blank.",
        options: ["come", "advent", "start", "begin"],
        answer: 1,
        explanation: "'The advent of AI' is the correct academic collocation meaning 'the arrival/emergence of AI'."
      }
    ],
    cheatSheetPoints: [
      "advent = arrival | streamline = make efficient | obsolete = outdated",
      "unprecedented = never before | cutting-edge = most advanced",
      "Alternatives for 'technology': innovation, digital advancement, breakthrough",
      "Positive: revolutionize, enhance, facilitate, optimize",
      "Negative: displace, render obsolete, exacerbate, undermine",
      "Power phrase: 'has fundamentally transformed the... landscape'"
    ]
  },
  {
    id: "vocab-education",
    title: "Education & Learning",
    titleVi: "Giáo dục & Học tập",
    pillar: "thematic-vocab",
    icon: "🎓",
    duration: "20 min",
    level: "intermediate",
    description: "Master 25+ essential Band 7.0+ vocabulary for the most frequently tested IELTS topic: Education.",
    descriptionVi: "Thành thạo 25+ từ vựng Band 7.0+ thiết yếu cho chủ đề IELTS được thi nhiều nhất: Giáo dục.",
    strategySteps: [
      {
        step: 1,
        title: "Group by Sub-Theme",
        titleVi: "Phân nhóm theo chủ đề phụ",
        description: "Education vocabulary falls into: School Systems, Higher Education, Teaching Methods, Skills & Development, Educational Policy.",
        descriptionVi: "Từ vựng giáo dục chia thành: Hệ thống trường học, Giáo dục đại học, Phương pháp giảng dạy, Kỹ năng & Phát triển, Chính sách giáo dục.",
      },
      {
        step: 2,
        title: "Learn Debate Vocabulary",
        titleVi: "Học từ vựng tranh luận",
        description: "Education essays often ask you to debate: 'Some believe university should be free...' You need words for BOTH sides.",
        descriptionVi: "Bài luận giáo dục thường yêu cầu tranh luận: 'Một số người tin đại học nên miễn phí...' Bạn cần từ cho CẢ HAI bên.",
      },
      {
        step: 3,
        title: "Master Collocations",
        titleVi: "Thành thạo Collocation",
        description: "Learn which words go TOGETHER: 'acquire knowledge' (not 'get knowledge'), 'foster creativity' (not 'make creativity').",
        descriptionVi: "Học các từ đi CÙNG NHAU: 'acquire knowledge' (không phải 'get knowledge'), 'foster creativity' (không phải 'make creativity').",
      }
    ],
    practicalExamples: [
      {
        context: "Using education vocabulary in a Writing Task 2 essay about university funding",
        contextVi: "Dùng từ vựng giáo dục trong bài Writing Task 2 về tài trợ đại học",
        example: "'The pursuit of higher education should be accessible to all, regardless of socioeconomic background. When tuition fees are prohibitively high, they inadvertently perpetuate inequality by denying underprivileged students the opportunity to acquire the qualifications necessary for upward social mobility.'",
      },
      {
        context: "Discussing teaching methods",
        contextVi: "Thảo luận phương pháp giảng dạy",
        example: "'Progressive educators advocate for a student-centred pedagogy that fosters critical thinking and nurtures intellectual curiosity, rather than relying on rote memorization and didactic instruction.'",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Using 'learn' and 'study' for everything",
        mistakeVi: "Dùng 'learn' và 'study' cho mọi thứ",
        why: "Use alternatives: 'acquire knowledge', 'develop competencies', 'hone skills', 'cultivate understanding'.",
        whyVi: "Dùng thay thế: 'acquire knowledge', 'develop competencies', 'hone skills', 'cultivate understanding'."
      },
      {
        mistake: "Confusing 'education' with 'training'",
        mistakeVi: "Nhầm lẫn 'education' với 'training'",
        why: "'Education' = broad intellectual development. 'Training' = specific practical skills. Using them interchangeably loses marks.",
        whyVi: "'Education' = phát triển trí tuệ rộng. 'Training' = kỹ năng thực hành cụ thể. Dùng thay thế nhau bị trừ điểm."
      }
    ],
    goldenSecret: "For ANY education essay, these 3 power collocations work in almost every paragraph: (1) 'foster critical thinking' (2) 'equip students with practical skills' (3) 'bridge the gap between academia and the job market'. Memorize them and you'll never run out of ideas!",
    goldenSecretVi: "Cho BẤT KỲ bài luận giáo dục nào, 3 collocation quyền lực này hoạt động trong hầu hết mọi đoạn: (1) 'foster critical thinking' (2) 'equip students with practical skills' (3) 'bridge the gap between academia and the job market'. Ghi nhớ và bạn sẽ không bao giờ hết ý!",
    vocabHighlights: [
      { word: "pedagogy", definition: "The method and practice of teaching", definitionVi: "Phương pháp và thực hành giảng dạy", example: "Modern pedagogy emphasizes active learning.", band: "8.0+" },
      { word: "curriculum", definition: "The subjects and content taught in a school", definitionVi: "Các môn học và nội dung giảng dạy trong trường", example: "The national curriculum should include financial literacy.", band: "7.0+" },
      { word: "rote memorization", definition: "Learning by repetition without understanding", definitionVi: "Học thuộc lòng bằng lặp lại mà không hiểu", example: "Rote memorization fails to develop critical thinking.", band: "7.5+" },
      { word: "socioeconomic", definition: "Related to social and economic factors", definitionVi: "Liên quan đến yếu tố xã hội và kinh tế", example: "Socioeconomic background should not limit educational access.", band: "7.5+" },
      { word: "foster", definition: "To encourage the development of", definitionVi: "Khuyến khích sự phát triển", example: "Schools should foster creativity and innovation.", band: "7.0+" },
      { word: "vocational", definition: "Related to a specific career or trade", definitionVi: "Liên quan đến nghề nghiệp hoặc ngành cụ thể", example: "Vocational training prepares students for the workforce.", band: "7.0+" },
      { word: "tuition fees", definition: "Money paid for instruction at school/university", definitionVi: "Học phí", example: "Rising tuition fees discourage students from pursuing higher education.", band: "6.5+" },
      { word: "intellectual curiosity", definition: "A desire to learn and understand new things", definitionVi: "Sự tò mò tri thức", example: "Great teachers nurture intellectual curiosity.", band: "7.5+" },
    ],
    quiz: [
      {
        question: "What is the correct collocation?",
        options: ["Make creativity", "Foster creativity", "Do creativity", "Give creativity"],
        answer: 1,
        explanation: "'Foster creativity' is the correct collocation — meaning to encourage its development."
      },
      {
        question: "What does 'pedagogy' mean?",
        options: ["A type of school", "The method of teaching", "A student's grade", "A textbook"],
        answer: 1,
        explanation: "'Pedagogy' refers to the method and practice of teaching — a Band 8.0 word."
      },
      {
        question: "Which sentence uses 'rote memorization' correctly?",
        options: [
          "Students enjoy rote memorization because it's creative.",
          "Rote memorization develops critical thinking effectively.",
          "Over-reliance on rote memorization hinders deeper understanding.",
          "Rote memorization is the best teaching method."
        ],
        answer: 2,
        explanation: "Rote memorization = learning by repetition without understanding — it HINDERS (not helps) deeper comprehension."
      }
    ],
    cheatSheetPoints: [
      "foster creativity | acquire knowledge | cultivate understanding",
      "equip students with | bridge the gap between | hone skills",
      "pedagogy = teaching method | curriculum = subjects taught",
      "rote memorization (negative) vs. critical thinking (positive)",
      "vocational = career-specific | academic = theoretical",
      "Power phrase: 'bridge the gap between academia and the job market'"
    ]
  },
  {
    id: "vocab-crime-justice",
    title: "Crime & Justice",
    titleVi: "Tội phạm & Công lý",
    pillar: "thematic-vocab",
    icon: "⚖️",
    duration: "20 min",
    level: "intermediate",
    description: "Essential Band 7.0+ vocabulary for Crime & Punishment — one of the trickiest IELTS topics to write about.",
    descriptionVi: "Từ vựng Band 7.0+ thiết yếu cho Tội phạm & Hình phạt — một trong những chủ đề IELTS khó viết nhất.",
    strategySteps: [
      {
        step: 1,
        title: "Categorize Crime Vocabulary",
        titleVi: "Phân loại từ vựng tội phạm",
        description: "Group into: Types of Crime, Causes of Crime, Punishment & Rehabilitation, Law Enforcement, Prevention.",
        descriptionVi: "Phân nhóm: Các loại tội phạm, Nguyên nhân, Hình phạt & Tái hòa nhập, Thực thi pháp luật, Phòng ngừa.",
      },
      {
        step: 2,
        title: "Learn the Debate Framework",
        titleVi: "Học khung tranh luận",
        description: "Crime essays often ask: punishment vs rehabilitation, causes of crime, how to reduce crime. Prepare vocabulary for BOTH sides of each debate.",
        descriptionVi: "Bài luận tội phạm thường hỏi: trừng phạt vs tái hòa nhập, nguyên nhân tội phạm, cách giảm tội phạm. Chuẩn bị từ vựng cho CẢ HAI phía.",
      },
      {
        step: 3,
        title: "Avoid Emotional Language",
        titleVi: "Tránh ngôn ngữ cảm tính",
        description: "'Bad people should go to jail' → 'Offenders should face incarceration.' Academic tone is crucial for this sensitive topic.",
        descriptionVi: "'Người xấu nên vào tù' → 'Offenders should face incarceration.' Giọng văn học thuật rất quan trọng cho chủ đề nhạy cảm này.",
      }
    ],
    practicalExamples: [
      {
        context: "Writing about causes of crime",
        contextVi: "Viết về nguyên nhân tội phạm",
        example: "'Socioeconomic deprivation is widely regarded as a primary catalyst for criminal behaviour. When individuals lack access to education and employment opportunities, they may resort to illicit activities as a means of survival. Furthermore, the erosion of community cohesion in urban areas has been shown to correlate with rising crime rates.'",
      },
      {
        context: "Arguing for rehabilitation over punishment",
        contextVi: "Lập luận tái hòa nhập thay vì trừng phạt",
        example: "'Rather than merely imposing punitive measures, governments should invest in comprehensive rehabilitation programmes that address the root causes of criminal behaviour. Recidivism rates demonstrate that incarceration alone fails to deter reoffending.'",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Using 'crime' and 'criminal' too often",
        mistakeVi: "Dùng 'crime' và 'criminal' quá nhiều",
        why: "Alternatives: 'offence/offender', 'illicit activity', 'transgression', 'wrongdoing', 'perpetrator', 'delinquent'.",
        whyVi: "Thay thế: 'offence/offender', 'illicit activity', 'transgression', 'wrongdoing', 'perpetrator', 'delinquent'."
      },
      {
        mistake: "Being too emotional or opinionated",
        mistakeVi: "Quá cảm xúc hoặc thiên kiến",
        why: "'Criminals deserve to suffer' is subjective. 'The justice system should balance deterrence with rehabilitation' is academic.",
        whyVi: "'Criminals deserve to suffer' mang tính chủ quan. 'The justice system should balance deterrence with rehabilitation' mang tính học thuật."
      }
    ],
    goldenSecret: "The word 'recidivism' (tái phạm) is the ultimate Band 8.0 weapon for ANY crime essay. 'High recidivism rates suggest that current punitive approaches are ineffective at preventing reoffending.' — This one sentence alone shows lexical range and critical thinking!",
    goldenSecretVi: "Từ 'recidivism' (tái phạm) là vũ khí Band 8.0 tối thượng cho BẤT KỲ bài luận tội phạm nào. 'High recidivism rates suggest that current punitive approaches are ineffective at preventing reoffending.' — Riêng câu này đã thể hiện vốn từ và tư duy phản biện!",
    vocabHighlights: [
      { word: "recidivism", definition: "The tendency to reoffend after punishment", definitionVi: "Xu hướng tái phạm sau hình phạt", example: "High recidivism rates prove prison alone doesn't work.", band: "8.0+" },
      { word: "rehabilitation", definition: "The process of reintegrating offenders into society", definitionVi: "Quá trình tái hòa nhập người phạm tội vào xã hội", example: "Rehabilitation reduces long-term crime rates.", band: "7.0+" },
      { word: "deterrent", definition: "Something that discourages someone from acting", definitionVi: "Điều ngăn cản ai đó hành động", example: "Harsh sentences serve as a deterrent to potential offenders.", band: "7.5+" },
      { word: "incarceration", definition: "Imprisonment", definitionVi: "Giam giữ; bỏ tù", example: "Mass incarceration has failed to reduce crime significantly.", band: "7.5+" },
      { word: "perpetrator", definition: "A person who commits a crime", definitionVi: "Người thực hiện tội phạm", example: "The perpetrator was apprehended within hours.", band: "7.5+" },
      { word: "punitive", definition: "Relating to punishment", definitionVi: "Liên quan đến hình phạt", example: "Punitive measures alone are insufficient to address crime.", band: "8.0+" },
      { word: "illicit", definition: "Illegal; not permitted by law", definitionVi: "Bất hợp pháp", example: "The trade in illicit drugs fuels organized crime.", band: "7.5+" },
      { word: "socioeconomic deprivation", definition: "Lack of basic resources and opportunities", definitionVi: "Thiếu thốn tài nguyên và cơ hội cơ bản", example: "Socioeconomic deprivation is a root cause of crime.", band: "8.0+" },
    ],
    quiz: [
      {
        question: "What does 'recidivism' mean?",
        options: ["First-time offending", "The tendency to reoffend", "Rehabilitation", "Crime prevention"],
        answer: 1,
        explanation: "'Recidivism' = the tendency to reoffend after serving a sentence — a powerful Band 8.0 word."
      },
      {
        question: "Which is the more academic way to express 'put bad people in jail'?",
        options: ["Lock up criminals", "Incarcerate offenders", "Punish the bad guys", "Jail the wrongdoers"],
        answer: 1,
        explanation: "'Incarcerate offenders' uses formal, academic language appropriate for IELTS."
      },
      {
        question: "Which collocation is CORRECT?",
        options: ["Do a crime", "Make a crime", "Commit an offence", "Take a crime"],
        answer: 2,
        explanation: "'Commit an offence' is the correct academic collocation — never 'do' or 'make' a crime."
      }
    ],
    cheatSheetPoints: [
      "recidivism = reoffending | incarceration = imprisonment",
      "deterrent = discourages crime | punitive = relating to punishment",
      "perpetrator = criminal | offence = crime (formal)",
      "commit an offence (NOT do/make a crime)",
      "rehabilitation > punishment (common IELTS argument)",
      "Power phrase: 'address the root causes of criminal behaviour'"
    ]
  },
  // --- Health & Society Vocabulary ---
  {
    id: "vocab-health-society",
    title: "Health & Society",
    titleVi: "Sức khỏe & Xã hội",
    pillar: "thematic-vocab",
    icon: "🏥",
    duration: "22 min",
    level: "intermediate",
    description: "Essential Band 7.0+ vocabulary for Health, Well-being, and Social Issues — two of the most frequent IELTS topics.",
    descriptionVi: "Từ vựng Band 7.0+ thiết yếu cho Sức khỏe, Hạnh phúc và Vấn đề Xã hội — hai chủ đề IELTS phổ biến nhất.",
    strategySteps: [
      {
        step: 1,
        title: "Learn Collocations, Not Isolated Words",
        titleVi: "Học cụm từ, không phải từ đơn lẻ",
        description: "Don't just learn 'health' — learn 'public health crisis', 'mental health awareness', 'preventive healthcare'. Collocations score higher than individual words.",
        descriptionVi: "Đừng chỉ học 'health' — học 'public health crisis', 'mental health awareness', 'preventive healthcare'. Cụm từ cho điểm cao hơn từ đơn lẻ.",
        example: "'The government should invest in preventive healthcare rather than reactive treatment.'"
      },
      {
        step: 2,
        title: "Master Cause-Effect Language",
        titleVi: "Thành thạo ngôn ngữ nhân-quả",
        description: "Health & Society topics often require discussing causes and effects. Use: 'stem from', 'give rise to', 'be attributed to', 'result in', 'be exacerbated by'.",
        descriptionVi: "Chủ đề Sức khỏe & Xã hội thường yêu cầu thảo luận nguyên nhân-kết quả. Dùng: 'stem from', 'give rise to', 'be attributed to', 'result in', 'be exacerbated by'.",
        example: "'Obesity often stems from sedentary lifestyles and is exacerbated by the prevalence of processed food.'"
      },
      {
        step: 3,
        title: "Use Formal Register for Social Issues",
        titleVi: "Dùng ngôn ngữ trang trọng cho vấn đề xã hội",
        description: "Replace basic words: 'poor people' → 'disadvantaged communities', 'old people' → 'the elderly/aging population', 'help' → 'alleviate/address/tackle'.",
        descriptionVi: "Thay từ cơ bản: 'poor people' → 'disadvantaged communities', 'old people' → 'the elderly/aging population', 'help' → 'alleviate/address/tackle'.",
        example: "'Governments should address socioeconomic disparities to improve public health outcomes.'"
      },
      {
        step: 4,
        title: "Build Topic-Specific Sentence Templates",
        titleVi: "Xây dựng mẫu câu theo chủ đề",
        description: "Prepare flexible templates: 'The prevalence of [issue] can be attributed to [cause], which in turn leads to [effect].' Fill in with any health/society topic.",
        descriptionVi: "Chuẩn bị mẫu linh hoạt: 'The prevalence of [vấn đề] can be attributed to [nguyên nhân], which in turn leads to [hệ quả].' Điền bất kỳ chủ đề sức khỏe/xã hội nào.",
        example: "'The prevalence of mental health disorders can be attributed to increasing work pressure, which in turn leads to reduced productivity.'"
      }
    ],
    practicalExamples: [
      {
        context: "Writing Task 2 — Health Topic",
        contextVi: "Writing Task 2 — Chủ đề Sức khỏe",
        example: "Prompt: 'Some people think that governments should ban junk food. To what extent do you agree?'\n\nSample: 'The proliferation of fast food outlets has contributed to a public health crisis, with obesity rates reaching epidemic proportions in many developed nations. While an outright ban may seem draconian, implementing stringent regulations — such as mandatory nutritional labelling and restricting advertising to minors — could be a more pragmatic approach to tackling this issue.'",
        explanation: "Uses 'proliferation', 'epidemic proportions', 'draconian', 'stringent regulations' — all Band 7.5+ vocabulary."
      },
      {
        context: "Speaking Part 3 — Society",
        contextVi: "Speaking Phần 3 — Xã hội",
        example: "Q: 'What are the biggest challenges facing society today?'\n\n'I think one of the most pressing issues is the widening wealth gap between the affluent and the underprivileged. This socioeconomic disparity manifests in unequal access to healthcare, education, and housing. If left unaddressed, it could undermine social cohesion and lead to civil unrest.'",
        explanation: "Demonstrates abstract thinking with precise vocabulary: 'wealth gap', 'underprivileged', 'socioeconomic disparity', 'social cohesion'."
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Using informal language for serious topics",
        mistakeVi: "Dùng ngôn ngữ thân mật cho chủ đề nghiêm túc",
        why: "'Lots of people get sick' → 'A significant proportion of the population suffers from chronic illnesses.' Academic register is essential.",
        whyVi: "'Lots of people get sick' → 'A significant proportion of the population suffers from chronic illnesses.' Ngôn ngữ học thuật là bắt buộc."
      },
      {
        mistake: "Confusing 'health' vocabulary with 'medicine' vocabulary",
        mistakeVi: "Nhầm lẫn từ vựng 'sức khỏe' với 'y học'",
        why: "IELTS tests public health and lifestyle vocabulary, not medical terminology. Focus on 'well-being', 'lifestyle diseases', 'preventive care' — not 'stethoscope' or 'MRI'.",
        whyVi: "IELTS kiểm tra từ vựng sức khỏe cộng đồng và lối sống, không phải thuật ngữ y khoa. Tập trung 'well-being', 'lifestyle diseases', 'preventive care'."
      },
      {
        mistake: "Overgeneralizing social issues",
        mistakeVi: "Khái quát hóa quá mức vấn đề xã hội",
        why: "'All poor people are unhealthy' is too broad. Use hedging: 'tend to', 'are more likely to', 'disproportionately affects'.",
        whyVi: "'All poor people are unhealthy' quá rộng. Dùng từ giảm nhẹ: 'tend to', 'are more likely to', 'disproportionately affects'."
      }
    ],
    goldenSecret: "The IELTS loves the word 'well-being' — it covers physical, mental, and social health in one elegant term. Use it as your anchor word and build collocations around it: 'psychological well-being', 'overall well-being', 'a sense of well-being'. It's Band 7.0+ every time!",
    goldenSecretVi: "IELTS rất thích từ 'well-being' — nó bao gồm sức khỏe thể chất, tinh thần và xã hội trong một từ thanh lịch. Dùng nó làm từ neo và xây cụm từ: 'psychological well-being', 'overall well-being', 'a sense of well-being'. Luôn đạt Band 7.0+!",
    vocabHighlights: [
      { word: "sedentary lifestyle", definition: "A way of living with little physical activity", definitionVi: "Lối sống ít vận động", example: "A sedentary lifestyle increases the risk of cardiovascular disease.", band: "7.0+" },
      { word: "epidemic proportions", definition: "Affecting a very large number of people", definitionVi: "Đạt mức độ dịch bệnh, lan rộng", example: "Diabetes has reached epidemic proportions in developed countries.", band: "7.5+" },
      { word: "socioeconomic disparity", definition: "Differences in wealth, income, and social status", definitionVi: "Chênh lệch kinh tế-xã hội", example: "Socioeconomic disparity leads to unequal access to healthcare.", band: "8.0+" },
      { word: "preventive healthcare", definition: "Medical care focused on preventing illness rather than treating it", definitionVi: "Chăm sóc sức khỏe phòng ngừa", example: "Investing in preventive healthcare reduces long-term medical costs.", band: "7.0+" },
      { word: "well-being", definition: "The state of being comfortable, healthy, and happy", definitionVi: "Sự khỏe mạnh, hạnh phúc toàn diện", example: "Exercise contributes significantly to psychological well-being.", band: "7.0+" },
      { word: "alleviate", definition: "To make suffering or a problem less severe", definitionVi: "Giảm bớt, làm dịu", example: "The charity aims to alleviate poverty in rural communities.", band: "7.5+" }
    ],
    quiz: [
      {
        question: "Which phrase is the most academic way to say 'help poor people'?",
        options: ["'give money to poor people'", "'alleviate poverty among disadvantaged communities'", "'help people who don't have money'", "'make poor people less poor'"],
        answer: 1,
        explanation: "'Alleviate poverty among disadvantaged communities' uses Band 7.5+ vocabulary with proper academic register."
      },
      {
        question: "What does 'sedentary lifestyle' mean?",
        options: ["An active, sporty way of living", "A lifestyle with little physical activity", "Living alone without social contact", "A temporary way of living"],
        answer: 1,
        explanation: "'Sedentary' means sitting/inactive. A sedentary lifestyle involves minimal physical movement."
      },
      {
        question: "Which cause-effect phrase is most appropriate for academic writing?",
        options: ["'because of'", "'stems from'", "'is caused by the fact that'", "'happens when'"],
        answer: 1,
        explanation: "'Stems from' is a sophisticated cause-effect phrase that scores higher than basic alternatives."
      },
      {
        question: "What is Teacher Hai's 'anchor word' for Health topics?",
        options: ["'healthcare'", "'well-being'", "'disease'", "'fitness'"],
        answer: 1,
        explanation: "'Well-being' covers physical, mental, and social health — versatile and always Band 7.0+."
      }
    ],
    cheatSheetPoints: [
      "Learn COLLOCATIONS: 'public health crisis', 'mental health awareness', 'preventive healthcare'",
      "Cause-effect: 'stem from', 'give rise to', 'be exacerbated by', 'result in'",
      "Formal upgrades: 'poor people' → 'disadvantaged communities', 'help' → 'alleviate/address'",
      "Anchor word: 'well-being' (psychological/overall/a sense of)",
      "Hedging: 'tend to', 'are more likely to', 'disproportionately affects'",
      "Template: 'The prevalence of [X] can be attributed to [Y], which leads to [Z]'"
    ]
  },
];

// === PILLAR 4: APPLIED GRAMMAR ===

const appliedGrammar: IeltsLecture[] = [
  {
    id: "grammar-inversion",
    title: "Inversion for Band 8.0+",
    titleVi: "Đảo ngữ cho Band 8.0+",
    pillar: "applied-grammar",
    icon: "🔄",
    duration: "22 min",
    level: "advanced",
    description: "Master inversion — the secret grammar weapon that instantly signals Band 8.0+ to the examiner.",
    descriptionVi: "Thành thạo đảo ngữ — vũ khí ngữ pháp bí mật báo hiệu Band 8.0+ ngay lập tức với giám khảo.",
    strategySteps: [
      {
        step: 1,
        title: "Understand When to Use Inversion",
        titleVi: "Hiểu khi nào dùng đảo ngữ",
        description: "Inversion is used after negative adverbials at the beginning of a sentence: Never, Rarely, Seldom, Not only, Hardly, No sooner.",
        descriptionVi: "Đảo ngữ được dùng sau trạng từ phủ định ở đầu câu: Never, Rarely, Seldom, Not only, Hardly, No sooner.",
        example: "'Never have I seen such a compelling argument for environmental protection.'"
      },
      {
        step: 2,
        title: "Learn the Structure",
        titleVi: "Học cấu trúc",
        description: "Negative adverbial + auxiliary verb + subject + main verb. 'Rarely DO students REALIZE the importance of...'",
        descriptionVi: "Trạng từ phủ định + trợ động từ + chủ ngữ + động từ chính. 'Rarely DO students REALIZE the importance of...'",
      },
      {
        step: 3,
        title: "Practice with Common Templates",
        titleVi: "Thực hành với mẫu câu thông dụng",
        description: "Memorize 3-4 inversion templates you can use in ANY essay. Place them in body paragraphs for maximum impact.",
        descriptionVi: "Ghi nhớ 3-4 mẫu đảo ngữ bạn dùng được trong BẤT KỲ bài luận nào. Đặt trong thân bài để tạo tác động tối đa.",
      }
    ],
    practicalExamples: [
      {
        context: "Inversion templates for IELTS Writing",
        contextVi: "Mẫu đảo ngữ cho IELTS Writing",
        example: "1. 'Not only does technology enhance productivity, but it also fosters creativity.'\n2. 'Rarely has a single invention had such a profound impact on society.'\n3. 'Under no circumstances should governments neglect environmental policies.'\n4. 'Only by investing in education can a nation truly prosper.'",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Overusing inversion (more than 2 per essay)",
        mistakeVi: "Lạm dụng đảo ngữ (hơn 2 lần mỗi bài)",
        why: "1-2 inversions show mastery. More than that looks unnatural and forced.",
        whyVi: "1-2 câu đảo ngữ thể hiện sự thành thạo. Nhiều hơn trông không tự nhiên."
      },
      {
        mistake: "Wrong auxiliary verb after inversion",
        mistakeVi: "Dùng sai trợ động từ sau đảo ngữ",
        why: "'Never has he went' is WRONG. 'Never has he gone' is CORRECT. The main verb stays in past participle.",
        whyVi: "'Never has he went' là SAI. 'Never has he gone' là ĐÚNG. Động từ chính ở dạng phân từ quá khứ."
      }
    ],
    goldenSecret: "The easiest inversion to use in ANY essay is 'Not only... but also...'. It works for EVERY topic: 'Not only does social media connect people, but it also serves as a powerful educational tool.' Use it once per essay — guaranteed Band 8.0 grammar boost!",
    goldenSecretVi: "Đảo ngữ dễ nhất dùng trong BẤT KỲ bài luận nào là 'Not only... but also...'. Nó phù hợp MỌI chủ đề: 'Not only does social media connect people, but it also serves as a powerful educational tool.' Dùng 1 lần mỗi bài — đảm bảo tăng điểm ngữ pháp Band 8.0!",
    vocabHighlights: [
      { word: "seldom", definition: "Rarely; not often", definitionVi: "Hiếm khi; không thường xuyên", example: "Seldom do we appreciate what we have.", band: "7.0+" },
      { word: "profound", definition: "Very deep or intense", definitionVi: "Rất sâu sắc hoặc mạnh mẽ", example: "Technology has had a profound impact on education.", band: "7.5+" },
    ],
    quiz: [
      {
        question: "Which sentence uses correct inversion?",
        options: ["Never I have seen this.", "Never have I seen this.", "Never I seen this have.", "Never seen I have this."],
        answer: 1,
        explanation: "Correct: Negative adverb + auxiliary + subject + past participle."
      },
      {
        question: "How many inversions should you use per essay?",
        options: ["0", "1-2", "5+", "As many as possible"],
        answer: 1,
        explanation: "1-2 inversions show mastery without sounding forced or unnatural."
      },
      {
        question: "Complete: 'Not only ___ technology improve efficiency, but it also...'",
        options: ["do", "does", "did", "is"],
        answer: 1,
        explanation: "'Not only does technology improve...' — 'does' is the correct auxiliary for third-person singular."
      }
    ],
    cheatSheetPoints: [
      "Structure: Negative adverb + AUX + SUBJECT + MAIN VERB",
      "Not only does... but it also...",
      "Rarely/Seldom + has/have + subject + past participle",
      "Under no circumstances should...",
      "Only by + gerund + can + subject + verb",
      "Use 1-2 per essay — no more!"
    ]
  },
  {
    id: "grammar-conditionals-advanced",
    title: "Advanced Conditionals for Writing",
    titleVi: "Câu điều kiện nâng cao cho Writing",
    pillar: "applied-grammar",
    icon: "🔀",
    duration: "18 min",
    level: "advanced",
    description: "Go beyond basic if-clauses. Master mixed conditionals and inverted conditionals for Band 7.5+.",
    descriptionVi: "Vượt qua mệnh đề if cơ bản. Thành thạo điều kiện hỗn hợp và điều kiện đảo cho Band 7.5+.",
    strategySteps: [
      {
        step: 1,
        title: "Review the 4 Basic Conditionals",
        titleVi: "Ôn 4 loại câu điều kiện cơ bản",
        description: "Zero (fact), First (real future), Second (unreal present), Third (unreal past). Make sure these are solid first.",
        descriptionVi: "Loại 0 (sự thật), 1 (tương lai thực), 2 (hiện tại không thực), 3 (quá khứ không thực). Đảm bảo nắm vững trước.",
      },
      {
        step: 2,
        title: "Master Mixed Conditionals",
        titleVi: "Thành thạo câu điều kiện hỗn hợp",
        description: "Mix Type 2 + Type 3: 'If I had studied harder (past), I would be a doctor now (present).' Past condition → present result.",
        descriptionVi: "Kết hợp loại 2 + 3: 'If I had studied harder (quá khứ), I would be a doctor now (hiện tại).' Điều kiện quá khứ → kết quả hiện tại.",
        example: "'If governments had invested in renewable energy decades ago, we would not be facing such severe climate change today.'"
      },
      {
        step: 3,
        title: "Use Inverted Conditionals (No 'If')",
        titleVi: "Dùng câu điều kiện đảo (Không có 'If')",
        description: "Remove 'if' and invert: 'Had the government acted sooner...' = 'If the government had acted sooner...'",
        descriptionVi: "Bỏ 'if' và đảo: 'Had the government acted sooner...' = 'If the government had acted sooner...'",
      }
    ],
    practicalExamples: [
      {
        context: "Using advanced conditionals in IELTS essays",
        contextVi: "Dùng câu điều kiện nâng cao trong bài luận IELTS",
        example: "1. Mixed: 'If society had prioritized education in the past, fewer people would be unemployed today.'\n2. Inverted: 'Had governments implemented stricter regulations, the environmental crisis would not have reached its current magnitude.'\n3. Unless: 'Unless drastic measures are taken, the situation will continue to deteriorate.'",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Only using Type 1 and Type 2 conditionals",
        mistakeVi: "Chỉ dùng câu điều kiện loại 1 và 2",
        why: "These are Band 5-6 level. Mixed and inverted conditionals show Band 7.5+ grammar range.",
        whyVi: "Đây là mức Band 5-6. Điều kiện hỗn hợp và đảo thể hiện ngữ pháp Band 7.5+."
      }
    ],
    goldenSecret: "In any essay about problems and solutions, use this template: 'Had [past action been taken], [present result would be different]. Unless [future action], [negative consequence].' This naturally uses BOTH mixed conditional AND 'unless' in two sentences — instant grammar range boost!",
    goldenSecretVi: "Trong bất kỳ bài luận vấn đề - giải pháp nào, dùng mẫu: 'Had [hành động quá khứ], [kết quả hiện tại sẽ khác]. Unless [hành động tương lai], [hậu quả tiêu cực].' Điều này tự nhiên dùng CẢ điều kiện hỗn hợp VÀ 'unless' trong hai câu — tăng ngữ pháp ngay!",
    vocabHighlights: [
      { word: "deteriorate", definition: "To become progressively worse", definitionVi: "Trở nên tồi tệ hơn dần dần", example: "Air quality continues to deteriorate in urban areas.", band: "7.5+" },
      { word: "magnitude", definition: "The great size or importance of something", definitionVi: "Quy mô hoặc tầm quan trọng lớn", example: "The magnitude of the problem cannot be overstated.", band: "8.0+" },
    ],
    quiz: [
      {
        question: "Which is a correct mixed conditional?",
        options: [
          "If I study hard, I will pass.",
          "If I had studied harder, I would be a doctor now.",
          "If I study, I pass.",
          "If I studied, I would pass."
        ],
        answer: 1,
        explanation: "Mixed conditional: past condition (had studied) + present result (would be now)."
      },
      {
        question: "How do you create an inverted conditional?",
        options: ["Add 'if'", "Remove 'if' and invert subject/auxiliary", "Use 'when' instead", "Use present tense"],
        answer: 1,
        explanation: "'Had the government acted...' removes 'if' and inverts 'the government had' to 'had the government'."
      },
      {
        question: "Complete: '___ the government invested earlier, the crisis would be less severe.'",
        options: ["If", "Had", "When", "Should"],
        answer: 1,
        explanation: "'Had the government invested...' is the inverted form of 'If the government had invested...'."
      }
    ],
    cheatSheetPoints: [
      "Mixed: If + had + PP, would + V (past cause → present result)",
      "Inverted: Had + S + PP, S + would + V (no 'if' needed)",
      "Unless = If not (use for warnings about consequences)",
      "Use 1 mixed/inverted conditional per essay for Band 7.5+",
      "Template: Had [past]..., [present]. Unless [future]..., [negative].",
      "Don't mix up tenses within one conditional clause"
    ]
  },
  {
    id: "grammar-relative-clauses",
    title: "Relative Clauses for Band 7.0+",
    titleVi: "Mệnh đề quan hệ cho Band 7.0+",
    pillar: "applied-grammar",
    icon: "🔗",
    duration: "20 min",
    level: "intermediate",
    description: "Master defining and non-defining relative clauses — the most reliable way to boost your Grammatical Range score.",
    descriptionVi: "Thành thạo mệnh đề quan hệ xác định và không xác định — cách đáng tin cậy nhất để tăng điểm Grammatical Range.",
    strategySteps: [
      {
        step: 1,
        title: "Defining vs Non-Defining: Know the Difference",
        titleVi: "Xác định vs Không xác định: Biết sự khác biệt",
        description: "DEFINING: identifies which one (no commas). 'Students who study hard get better grades.' NON-DEFINING: adds extra info (with commas). 'My teacher, who is from England, speaks three languages.'",
        descriptionVi: "XÁC ĐỊNH: xác định cái nào (không có dấu phẩy). 'Students who study hard get better grades.' KHÔNG XÁC ĐỊNH: thêm thông tin (có dấu phẩy). 'My teacher, who is from England, speaks three languages.'",
        example: "Defining: 'The book that I read last week was fascinating.' (Which book? The one I read.)\nNon-defining: 'The book, which was published in 2020, has become a bestseller.' (Extra info — remove it and the sentence still makes sense.)"
      },
      {
        step: 2,
        title: "Choose the Right Pronoun",
        titleVi: "Chọn đại từ đúng",
        description: "WHO = people | WHICH = things | WHERE = places | WHOSE = possession | WHEN = time. In defining clauses, THAT can replace WHO/WHICH.",
        descriptionVi: "WHO = người | WHICH = vật | WHERE = nơi chốn | WHOSE = sở hữu | WHEN = thời gian. Trong mệnh đề xác định, THAT thay thế WHO/WHICH.",
      },
      {
        step: 3,
        title: "Use Non-Defining Clauses to Add Academic Detail",
        titleVi: "Dùng mệnh đề không xác định để thêm chi tiết học thuật",
        description: "Non-defining relative clauses let you pack MORE information into a single complex sentence — this is exactly what examiners want to see for Band 7.0+.",
        descriptionVi: "Mệnh đề quan hệ không xác định cho phép bạn nhồi NHIỀU thông tin hơn vào một câu phức — đây chính xác là điều giám khảo muốn thấy cho Band 7.0+.",
        example: "'Social media, which has become an integral part of modern life, presents both opportunities and challenges for young people.'"
      },
      {
        step: 4,
        title: "Reduced Relative Clauses (Band 7.5+ Bonus)",
        titleVi: "Mệnh đề quan hệ rút gọn (Bonus Band 7.5+)",
        description: "Remove who/which + be: 'Students (who are) struggling with grammar...' → 'Students struggling with grammar...' This shows advanced grammar range.",
        descriptionVi: "Bỏ who/which + be: 'Students (who are) struggling with grammar...' → 'Students struggling with grammar...' Điều này thể hiện ngữ pháp nâng cao.",
      }
    ],
    practicalExamples: [
      {
        context: "Using relative clauses in IELTS Writing",
        contextVi: "Dùng mệnh đề quan hệ trong IELTS Writing",
        example: "1. Defining: 'People who live in urban areas tend to have higher stress levels.'\n2. Non-defining: 'Air pollution, which has reached alarming levels in many cities, poses a significant threat to respiratory health.'\n3. Reduced: 'Countries investing heavily in renewable energy are seeing economic growth.'\n4. Whose: 'Students whose parents are supportive tend to perform better academically.'",
      },
      {
        context: "Combining multiple clause types in one paragraph",
        contextVi: "Kết hợp nhiều loại mệnh đề trong một đoạn",
        example: "'Young people who grow up in disadvantaged communities, where educational opportunities are limited, often face significant barriers to social mobility. These individuals, whose potential remains untapped, could benefit enormously from targeted government programmes designed to level the playing field.'",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Using 'that' in non-defining clauses",
        mistakeVi: "Dùng 'that' trong mệnh đề không xác định",
        why: "'My teacher, that is from England...' is WRONG. Use 'who' or 'which' in non-defining clauses — NEVER 'that'.",
        whyVi: "'My teacher, that is from England...' là SAI. Dùng 'who' hoặc 'which' trong mệnh đề không xác định — KHÔNG BAO GIỜ dùng 'that'."
      },
      {
        mistake: "Forgetting commas in non-defining clauses",
        mistakeVi: "Quên dấu phẩy trong mệnh đề không xác định",
        why: "Without commas, a non-defining clause becomes a defining one — completely changing the meaning!",
        whyVi: "Không có dấu phẩy, mệnh đề không xác định trở thành xác định — hoàn toàn thay đổi nghĩa!"
      },
      {
        mistake: "Only using 'who' and 'which'",
        mistakeVi: "Chỉ dùng 'who' và 'which'",
        why: "Show range! Use 'where', 'whose', 'when', and reduced clauses too. Variety impresses examiners.",
        whyVi: "Thể hiện đa dạng! Dùng cả 'where', 'whose', 'when', và mệnh đề rút gọn. Sự đa dạng gây ấn tượng giám khảo."
      }
    ],
    goldenSecret: "The easiest way to use a non-defining relative clause in ANY essay: take your topic and add a 'which' clause after it. 'Social media → Social media, which has transformed modern communication, ...' 'Education → Education, which is widely regarded as the foundation of social progress, ...' — instant grammatical complexity!",
    goldenSecretVi: "Cách dễ nhất dùng mệnh đề quan hệ không xác định trong BẤT KỲ bài luận nào: lấy chủ đề và thêm mệnh đề 'which' sau nó. 'Social media → Social media, which has transformed modern communication, ...' 'Education → Education, which is widely regarded as the foundation of social progress, ...' — phức tạp ngữ pháp ngay lập tức!",
    vocabHighlights: [
      { word: "integral", definition: "Essential; necessary for completeness", definitionVi: "Thiết yếu; cần thiết cho sự hoàn chỉnh", example: "Technology has become an integral part of education.", band: "7.5+" },
      { word: "untapped", definition: "Not yet used or exploited", definitionVi: "Chưa được khai thác", example: "Many students have untapped potential.", band: "7.5+" },
      { word: "targeted", definition: "Aimed at a specific group", definitionVi: "Nhắm vào một nhóm cụ thể", example: "Targeted interventions can reduce crime.", band: "7.0+" },
    ],
    quiz: [
      {
        question: "Which sentence has CORRECT non-defining clause usage?",
        options: [
          "My brother, that lives in London, is a doctor.",
          "My brother, who lives in London, is a doctor.",
          "My brother who lives in London is a doctor.",
          "My brother where lives in London is a doctor."
        ],
        answer: 1,
        explanation: "Non-defining clauses use WHO (not THAT) and require commas before and after."
      },
      {
        question: "What is a 'reduced relative clause'?",
        options: [
          "A very short sentence",
          "Removing who/which + be from the clause",
          "Using 'that' instead of 'who'",
          "A clause without a verb"
        ],
        answer: 1,
        explanation: "Reduced = remove who/which + be: 'People (who are) living in cities...' → 'People living in cities...'"
      },
      {
        question: "Can you use 'that' in a non-defining relative clause?",
        options: ["Yes, always", "No, never", "Only with things", "Only with people"],
        answer: 1,
        explanation: "NEVER use 'that' in non-defining clauses. Always use 'who' (people) or 'which' (things)."
      },
      {
        question: "'Students ___ work part-time often develop better time management.' Choose the best option:",
        options: ["which", "where", "who", "whose"],
        answer: 2,
        explanation: "'Who' is correct because it refers to 'students' (people) in a defining clause."
      }
    ],
    cheatSheetPoints: [
      "Defining: no commas, identifies WHICH one (who/which/that)",
      "Non-defining: WITH commas, adds extra info (who/which — NEVER 'that')",
      "Reduced: remove who/which + be (Band 7.5+ technique)",
      "WHO = people | WHICH = things | WHERE = places | WHOSE = possession",
      "Trick: add a 'which' clause after your essay topic for instant complexity",
      "Use at least 2 relative clauses per essay for grammar range"
    ]
  },
  {
    id: "grammar-passive-voice",
    title: "Passive Voice Mastery",
    titleVi: "Thành thạo câu bị động",
    pillar: "applied-grammar",
    icon: "🔀",
    duration: "18 min",
    level: "intermediate",
    description: "Learn when and how to use passive voice effectively — essential for both Writing Task 1 and Task 2.",
    descriptionVi: "Học khi nào và cách dùng câu bị động hiệu quả — thiết yếu cho cả Writing Task 1 và Task 2.",
    strategySteps: [
      {
        step: 1,
        title: "Understand When Passive is Better",
        titleVi: "Hiểu khi nào bị động tốt hơn",
        description: "Use passive when: (1) the action is more important than who does it, (2) the doer is unknown, (3) you want to sound more formal/academic.",
        descriptionVi: "Dùng bị động khi: (1) hành động quan trọng hơn người thực hiện, (2) không biết ai làm, (3) muốn nghe trang trọng/học thuật hơn.",
        example: "Active: 'The government built a new hospital.' → Passive: 'A new hospital was built (by the government).' — Focus shifts to the hospital."
      },
      {
        step: 2,
        title: "Master All Tenses in Passive",
        titleVi: "Thành thạo mọi thì ở bị động",
        description: "Present Simple: 'is/are done' | Past Simple: 'was/were done' | Present Perfect: 'has/have been done' | Future: 'will be done' | Modal: 'can/should be done'.",
        descriptionVi: "Hiện tại đơn: 'is/are done' | Quá khứ đơn: 'was/were done' | Hiện tại hoàn thành: 'has/have been done' | Tương lai: 'will be done' | Modal: 'can/should be done'.",
      },
      {
        step: 3,
        title: "Use 'It is + Past Participle' for Academic Writing",
        titleVi: "Dùng 'It is + Phân từ quá khứ' cho văn học thuật",
        description: "This impersonal structure is pure gold for IELTS: 'It is widely believed that...', 'It has been suggested that...', 'It can be argued that...'",
        descriptionVi: "Cấu trúc phi cá nhân này là vàng ròng cho IELTS: 'It is widely believed that...', 'It has been suggested that...', 'It can be argued that...'",
        example: "'It is generally acknowledged that education plays a pivotal role in economic development.'"
      }
    ],
    practicalExamples: [
      {
        context: "Passive in Task 1 (describing a chart)",
        contextVi: "Bị động trong Task 1 (mô tả biểu đồ)",
        example: "'As can be seen from the chart, the percentage of renewable energy usage was approximately 15% in 2010. By 2020, this figure had been doubled, reaching 30%. It is predicted that this trend will be maintained over the next decade.'",
      },
      {
        context: "Passive in Task 2 (opinion essay)",
        contextVi: "Bị động trong Task 2 (bài luận quan điểm)",
        example: "'It is often argued that traditional teaching methods should be replaced by technology-based approaches. However, it must be acknowledged that the effectiveness of digital learning has not been conclusively demonstrated in all contexts.'",
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Overusing passive voice (every sentence)",
        mistakeVi: "Lạm dụng bị động (mọi câu)",
        why: "Mix active and passive. All-passive writing sounds unnatural. Aim for 30-40% passive in Task 1, 20-30% in Task 2.",
        whyVi: "Trộn chủ động và bị động. Viết toàn bị động nghe không tự nhiên. Mục tiêu 30-40% bị động trong Task 1, 20-30% trong Task 2."
      },
      {
        mistake: "Using passive when active is clearer",
        mistakeVi: "Dùng bị động khi chủ động rõ ràng hơn",
        why: "'The ball was kicked by the boy' is weaker than 'The boy kicked the ball' when the doer matters.",
        whyVi: "'The ball was kicked by the boy' yếu hơn 'The boy kicked the ball' khi người thực hiện quan trọng."
      }
    ],
    goldenSecret: "Memorize these 5 academic passive starters and you can begin ANY body paragraph: 'It is widely acknowledged that...', 'It has been demonstrated that...', 'It is often contended that...', 'It should be noted that...', 'It can be observed that...' — examiners LOVE this structure!",
    goldenSecretVi: "Ghi nhớ 5 mẫu mở đầu bị động học thuật và bạn có thể bắt đầu BẤT KỲ đoạn thân bài nào: 'It is widely acknowledged that...', 'It has been demonstrated that...', 'It is often contended that...', 'It should be noted that...', 'It can be observed that...' — giám khảo RẤT THÍCH cấu trúc này!",
    vocabHighlights: [
      { word: "acknowledged", definition: "Recognized or accepted as true", definitionVi: "Được thừa nhận hoặc chấp nhận là đúng", example: "It is widely acknowledged that exercise improves health.", band: "7.0+" },
      { word: "demonstrated", definition: "Shown or proven clearly", definitionVi: "Được chỉ ra hoặc chứng minh rõ ràng", example: "Research has demonstrated the benefits of early education.", band: "7.0+" },
      { word: "pivotal", definition: "Of crucial importance", definitionVi: "Có tầm quan trọng then chốt", example: "Technology plays a pivotal role in modern education.", band: "7.5+" },
    ],
    quiz: [
      {
        question: "Which sentence uses the correct academic passive structure?",
        options: [
          "People believe that education is important.",
          "It is widely believed that education is important.",
          "Education is important people believe.",
          "Believing education is important."
        ],
        answer: 1,
        explanation: "'It is widely believed that...' is the correct impersonal passive structure for academic writing."
      },
      {
        question: "What percentage of passive voice is ideal for Task 2?",
        options: ["100%", "0%", "20-30%", "80-90%"],
        answer: 2,
        explanation: "20-30% passive in Task 2 provides good variety. Too much sounds unnatural."
      },
      {
        question: "Convert to passive: 'Researchers conducted the study in 2023.'",
        options: [
          "The study was conducted in 2023.",
          "The study is conducted in 2023.",
          "The study has been conducted in 2023.",
          "The study will be conducted in 2023."
        ],
        answer: 0,
        explanation: "Past simple active → Past simple passive: 'was conducted' (matching the original tense)."
      }
    ],
    cheatSheetPoints: [
      "Use passive when the ACTION matters more than the DOER",
      "Task 1: 30-40% passive | Task 2: 20-30% passive",
      "'It is + PP + that...' = gold for academic writing",
      "acknowledged / believed / argued / demonstrated / noted",
      "Don't overuse — mix with active for natural flow",
      "All tenses work: is done, was done, has been done, will be done"
    ]
  },

  // --- Conditionals for Band 7.0+ ---
  {
    id: "grammar-conditionals",
    title: "Conditionals for Band 7.0+",
    titleVi: "Câu điều kiện cho Band 7.0+",
    pillar: "applied-grammar",
    icon: "🔗",
    duration: "20 min",
    level: "intermediate",
    description: "Go beyond basic if-clauses: master mixed conditionals, inverted conditionals, and alternative conditional structures for top band scores.",
    descriptionVi: "Vượt qua câu điều kiện cơ bản: thành thạo điều kiện hỗn hợp, đảo ngữ điều kiện, và cấu trúc điều kiện thay thế để đạt Band cao.",
    strategySteps: [
      {
        step: 1,
        title: "Know ALL Conditional Types",
        titleVi: "Nắm TẤT CẢ các loại điều kiện",
        description: "Zero (general truth), First (real future), Second (unreal present), Third (unreal past). Most students stop at First Conditional — Band 7.0+ requires Second and Third.",
        descriptionVi: "Zero (sự thật chung), First (tương lai thực), Second (hiện tại không thực), Third (quá khứ không thực). Hầu hết học sinh dừng ở First — Band 7.0+ cần Second và Third.",
        example: "Zero: 'If you heat water to 100°C, it boils.'\nFirst: 'If the government invests more, education will improve.'\nSecond: 'If I were the president, I would prioritize healthcare.'\nThird: 'If they had acted sooner, the crisis could have been averted.'"
      },
      {
        step: 2,
        title: "Master Mixed Conditionals",
        titleVi: "Thành thạo điều kiện hỗn hợp",
        description: "Mix Second + Third conditionals to show past cause with present result (or vice versa). This is a Band 8.0 power move that very few candidates use.",
        descriptionVi: "Kết hợp điều kiện 2 + 3 để thể hiện nguyên nhân quá khứ với kết quả hiện tại (hoặc ngược lại). Đây là chiêu Band 8.0 rất ít thí sinh dùng.",
        example: "Past cause → Present result: 'If the government had invested in renewable energy 20 years ago, we would not be facing this climate crisis today.'\nPresent cause → Past result: 'If she were more diligent, she would have passed the exam.'"
      },
      {
        step: 3,
        title: "Use Inverted Conditionals (No 'If')",
        titleVi: "Dùng điều kiện đảo ngữ (không có 'If')",
        description: "Remove 'if' and invert the subject-verb order. This creates a formal, sophisticated tone perfect for Writing Task 2.",
        descriptionVi: "Bỏ 'if' và đảo trật tự chủ-vị. Điều này tạo giọng trang trọng, tinh tế hoàn hảo cho Writing Task 2.",
        example: "'If the government had acted...' → 'Had the government acted...'\n'If this trend should continue...' → 'Should this trend continue...'\n'If it were not for education...' → 'Were it not for education...'"
      },
      {
        step: 4,
        title: "Alternative Conditional Structures",
        titleVi: "Cấu trúc điều kiện thay thế",
        description: "Replace 'if' with: 'provided that', 'on condition that', 'assuming that', 'as long as', 'unless'. These show lexical range and boost your Grammatical Range score.",
        descriptionVi: "Thay 'if' bằng: 'provided that', 'on condition that', 'assuming that', 'as long as', 'unless'. Chúng thể hiện vốn từ phong phú và tăng điểm Grammatical Range.",
        example: "'Provided that governments allocate sufficient funds, universal healthcare is achievable.'\n'Unless immediate action is taken, environmental degradation will accelerate.'"
      }
    ],
    practicalExamples: [
      {
        context: "Writing Task 2 — Using Mixed Conditional",
        contextVi: "Writing Task 2 — Dùng điều kiện hỗn hợp",
        example: "Topic: Environmental problems\n\n'Had industrialized nations prioritized sustainable development decades ago, we would not be witnessing the devastating effects of climate change today. This mixed conditional highlights how past inaction has led to present consequences — a powerful argument structure.'",
        explanation: "Mixed conditional (Third → Second) connects past decisions to current problems — very impressive for examiners."
      },
      {
        context: "Speaking Part 3 — Hypothetical",
        contextVi: "Speaking Phần 3 — Giả định",
        example: "Q: 'What would happen if all education became online?'\n\n'Were all education to shift online, I believe social skills among young people would deteriorate significantly. Students would miss out on the interpersonal interactions that are crucial for personal development. Having said that, provided that schools implement hybrid models, the negative effects could be mitigated.'",
        explanation: "Uses inverted conditional ('Were all education to shift...') + alternative conditional ('provided that') in one natural answer."
      }
    ],
    mistakesToAvoid: [
      {
        mistake: "Using 'would' in the 'if' clause",
        mistakeVi: "Dùng 'would' trong mệnh đề 'if'",
        why: "'If I would study...' is WRONG. The correct form is 'If I studied...' (Second) or 'If I had studied...' (Third). 'Would' goes in the RESULT clause only.",
        whyVi: "'If I would study...' SAI. Dạng đúng: 'If I studied...' (loại 2) hoặc 'If I had studied...' (loại 3). 'Would' chỉ dùng trong mệnh đề KẾT QUẢ."
      },
      {
        mistake: "Only using First Conditional throughout your essay",
        mistakeVi: "Chỉ dùng điều kiện loại 1 trong cả bài",
        why: "First Conditional is Band 5.0-6.0 level. Mix in Second, Third, and Mixed Conditionals to demonstrate grammatical range.",
        whyVi: "Điều kiện loại 1 ở mức Band 5.0-6.0. Kết hợp loại 2, 3, và hỗn hợp để thể hiện phạm vi ngữ pháp."
      },
      {
        mistake: "Overcomplicating with too many conditionals",
        mistakeVi: "Phức tạp hóa quá mức với quá nhiều câu điều kiện",
        why: "Use 2-3 conditionals per essay strategically. Quality over quantity — one well-placed mixed conditional is worth more than five basic ones.",
        whyVi: "Dùng 2-3 câu điều kiện mỗi bài một cách chiến lược. Chất lượng hơn số lượng — một câu hỗn hợp đúng chỗ giá trị hơn năm câu cơ bản."
      }
    ],
    goldenSecret: "The INVERTED THIRD CONDITIONAL is the single most impressive grammar structure in IELTS Writing: 'Had the government invested in education earlier, literacy rates would be significantly higher today.' It combines inversion + mixed conditional + formal register. Use it ONCE in your conclusion for maximum impact!",
    goldenSecretVi: "ĐIỀU KIỆN LOẠI 3 ĐẢO NGỮ là cấu trúc ngữ pháp ấn tượng nhất trong IELTS Writing: 'Had the government invested in education earlier, literacy rates would be significantly higher today.' Nó kết hợp đảo ngữ + điều kiện hỗn hợp + phong cách trang trọng. Dùng MỘT LẦN trong kết luận để đạt tác động tối đa!",
    vocabHighlights: [
      { word: "provided that", definition: "On the condition that; only if", definitionVi: "Với điều kiện là; chỉ nếu", example: "Provided that funding is secured, the project will proceed.", band: "7.0+" },
      { word: "avert", definition: "To prevent or turn away something undesirable", definitionVi: "Ngăn chặn, tránh điều không mong muốn", example: "The crisis could have been averted with better planning.", band: "7.5+" },
      { word: "deteriorate", definition: "To become progressively worse", definitionVi: "Xấu đi, suy thoái", example: "Air quality continues to deteriorate in major cities.", band: "7.0+" },
      { word: "mitigate", definition: "To make less severe or serious", definitionVi: "Giảm thiểu, giảm bớt", example: "Steps must be taken to mitigate the impact of flooding.", band: "7.5+" },
      { word: "on condition that", definition: "Only if a particular thing happens", definitionVi: "Với điều kiện rằng", example: "The loan was approved on condition that collateral was provided.", band: "7.0+" }
    ],
    quiz: [
      {
        question: "Which sentence uses a MIXED conditional correctly?",
        options: ["'If I study hard, I will pass.'", "'If they had invested earlier, we would not face this crisis today.'", "'If I am rich, I will travel.'", "'If it rains, I stay home.'"],
        answer: 1,
        explanation: "Mixed conditional: Third (past unreal 'had invested') + Second (present result 'would not face today')."
      },
      {
        question: "How do you form an INVERTED conditional?",
        options: ["Add 'not' to the sentence", "Remove 'if' and invert subject-verb order", "Use 'would' in both clauses", "Change to passive voice"],
        answer: 1,
        explanation: "'If they had known' → 'Had they known' — remove 'if', put auxiliary before subject."
      },
      {
        question: "Which is a correct alternative to 'if'?",
        options: ["'because'", "'provided that'", "'therefore'", "'however'"],
        answer: 1,
        explanation: "'Provided that' = 'on the condition that' = formal alternative to 'if'."
      },
      {
        question: "Where should 'would' appear in a conditional sentence?",
        options: ["In the 'if' clause", "In the result clause only", "In both clauses", "It should never be used"],
        answer: 1,
        explanation: "'Would' belongs in the RESULT clause: 'If I studied (if-clause), I would pass (result).' Never in the if-clause."
      }
    ],
    cheatSheetPoints: [
      "Band 7.0+ needs Second & Third Conditionals — not just First",
      "Mixed: 'Had they acted sooner, we would not be suffering today'",
      "Inverted: Remove 'if' + invert → 'Had...', 'Were...', 'Should...'",
      "Alternatives to 'if': provided that, on condition that, assuming that, unless",
      "NEVER put 'would' in the 'if' clause",
      "Use 2-3 conditionals per essay — quality over quantity"
    ]
  },
];

// === EXPORT ALL LECTURES ===

export const allIeltsLectures: IeltsLecture[] = [
  ...skillBasedLectures,
  ...tipsAndHacks,
  ...thematicVocab,
  ...appliedGrammar,
];

export const PILLAR_META = {
  "skill-based": {
    label: "Skill-Based Lectures",
    labelVi: "Bài giảng theo kỹ năng",
    icon: "📚",
    color: "from-blue-500 to-indigo-600",
    description: "Deep-dive strategies for Listening, Reading, Writing & Speaking",
    descriptionVi: "Chiến lược chuyên sâu cho Listening, Reading, Writing & Speaking",
  },
  "tips-hacks": {
    label: "Tips & Hacks",
    labelVi: "Mẹo & Thủ thuật",
    icon: "⚡",
    color: "from-amber-500 to-orange-600",
    description: "Quick, actionable techniques for instant score improvement",
    descriptionVi: "Kỹ thuật nhanh, thực tế để cải thiện điểm ngay lập tức",
  },
  "thematic-vocab": {
    label: "Thematic Vocabulary",
    labelVi: "Từ vựng theo chủ đề",
    icon: "📖",
    color: "from-emerald-500 to-teal-600",
    description: "Band 7.0+ vocabulary grouped by common IELTS topics",
    descriptionVi: "Từ vựng Band 7.0+ phân nhóm theo chủ đề IELTS phổ biến",
  },
  "applied-grammar": {
    label: "Applied Grammar",
    labelVi: "Ngữ pháp ứng dụng",
    icon: "🔧",
    color: "from-purple-500 to-violet-600",
    description: "Complex structures that signal high band scores to examiners",
    descriptionVi: "Cấu trúc phức tạp báo hiệu Band cao với giám khảo",
  },
} as const;

export type PillarKey = keyof typeof PILLAR_META;

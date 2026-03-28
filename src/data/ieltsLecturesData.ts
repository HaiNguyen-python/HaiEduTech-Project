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

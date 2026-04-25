/**
 * @file toeicLecturesExpansion2.ts
 * @description Bộ 8 bài giảng TOEIC mới (2026 Series II): nội dung đào sâu hơn,
 *              mỗi bài có ≥3 trapAlerts, ≥4 coreTechnique steps, ≥3 practiceSet,
 *              ≥6 vocabHighlights và ≥6 quiz questions, kèm SVG diagram riêng.
 *
 * Topics:
 *   1. Part 1 - People & Action focus
 *   2. Part 2 - Tag questions & negative questions
 *   3. Part 3 - Speaker's tone & implication
 *   4. Part 4 - Talks & broadcasts (announcements decoder)
 *   5. Part 5 - Verb tense matrix
 *   6. Part 6 - Sentence insertion
 *   7. Part 7 - Triple passages cross-reference
 *   8. Business Vocabulary - HR & Recruitment
 *
 * @copyright 2026 HaiEduTech
 */

import type { ToeicLecture } from "./toeicLecturesData";

// ============================================================
// 1. Part 1 - People & Action focus
// ============================================================
const part1PeopleAction: ToeicLecture = {
  id: "toeic-part1-people-action",
  title: "Part 1 Mastery: People-Centered Photos",
  titleVi: "Làm chủ Part 1: Ảnh có người và hành động",
  category: "listening",
  parts: ["Part 1"],
  icon: "🧑‍💼",
  duration: "22 min",
  level: "foundation",
  targetScore: "450+",
  description:
    "Master the most common Part 1 photo type - people performing workplace actions. Learn to lock onto the subject, the verb, and the object in 4 seconds.",
  descriptionVi:
    "Làm chủ dạng ảnh Part 1 phổ biến nhất - người đang làm việc. Học cách 'khóa' chủ ngữ, động từ và tân ngữ trong 4 giây.",
  trapAlerts: [
    {
      trap: "Multiple people but only one is the subject of the verb",
      trapVi: "Nhiều người trong ảnh nhưng chỉ một là chủ ngữ của động từ",
      why: "ETS uses 'A man is...' when the photo has many people. You must identify which man matches the action.",
      whyVi: "ETS dùng 'A man is...' khi ảnh có nhiều người. Bạn phải xác định người nào khớp với hành động.",
    },
    {
      trap: "Group action vs. individual action",
      trapVi: "Hành động tập thể vs. cá nhân",
      why: "'They are shaking hands' requires at least 2 people contacting hands; 'A woman is waving' = solo gesture.",
      whyVi: "'They are shaking hands' cần ít nhất 2 người đang chạm tay; 'A woman is waving' = hành động một người.",
    },
    {
      trap: "Looking AT vs. looking FOR vs. looking AROUND",
      trapVi: "Looking AT vs. FOR vs. AROUND",
      why: "Tiny preposition changes meaning: 'looking at the screen' (gaze fixed) ≠ 'looking for keys' (searching).",
      whyVi: "Giới từ nhỏ đổi nghĩa hoàn toàn: 'looking at the screen' (nhìn vào) ≠ 'looking for keys' (đang tìm).",
    },
    {
      trap: "Action verbs that LOOK similar but aren't",
      trapVi: "Động từ trông giống nhưng khác hẳn",
      why: "'Pouring' (rót xuống) vs. 'sipping' (nhấp ngụm) vs. 'serving' (phục vụ) - all coffee-related.",
      whyVi: "'Pouring' (rót) vs. 'sipping' (nhấp) vs. 'serving' (phục vụ) - đều liên quan cà phê.",
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Identify the FOCAL PERSON",
      titleVi: "Xác định nhân vật trung tâm",
      description:
        "Find the person taking up most space or in clearest focus. Choices usually describe THIS person.",
      descriptionVi:
        "Tìm người chiếm diện tích lớn nhất hoặc rõ nét nhất. Đáp án thường mô tả NGƯỜI NÀY.",
      example: "Photo: 1 cashier + 3 blurry customers → focus = cashier",
    },
    {
      step: 2,
      title: "Lock the VERB-OBJECT pair",
      titleVi: "Khóa cặp Động từ – Tân ngữ",
      description:
        "Mentally tag: WHO + does WHAT + with WHAT. Eliminate any choice that breaks this triplet.",
      descriptionVi:
        "Ghi tag tinh thần: AI + làm GÌ + với CÁI GÌ. Loại đáp án nào phá vỡ bộ ba này.",
      example: "Cashier + scanning + barcode ✅ vs. cashier + paying + cash ❌",
    },
    {
      step: 3,
      title: "Watch HANDS and EYES",
      titleVi: "Quan sát TAY và MẮT",
      description:
        "Hands reveal the action; eyes reveal the focus. If hands are empty, no 'holding' answers.",
      descriptionVi:
        "Tay tiết lộ hành động; mắt tiết lộ điểm nhìn. Nếu tay trống → loại 'holding'.",
    },
    {
      step: 4,
      title: "Eliminate impossible verbs first",
      titleVi: "Loại các động từ bất khả thi trước",
      description:
        "If you don't see water → no 'pouring'. If no document → no 'signing'. Speed wins through elimination.",
      descriptionVi:
        "Không thấy nước → loại 'pouring'. Không thấy tài liệu → loại 'signing'. Loại trừ giúp tăng tốc.",
    },
    {
      step: 5,
      title: "Confirm with prepositions",
      titleVi: "Xác nhận bằng giới từ",
      description:
        "'Sitting at a table' (chair pulled in) vs. 'sitting next to a table' (beside it). Match exact spatial relation.",
      descriptionVi:
        "'Sitting at a table' (ghế kéo sát) vs. 'sitting next to a table' (cạnh bàn). Khớp đúng vị trí không gian.",
    },
  ],
  practiceSet: [
    {
      context: "Photo: A woman in a kitchen holding a knife above a cutting board with vegetables.",
      contextVi: "Ảnh: Người phụ nữ trong bếp, cầm dao trên thớt có rau củ.",
      question: "Which sentence best describes the photo?",
      options: [
        "She is washing dishes.",
        "She is preparing food.",
        "She is eating a meal.",
        "She is opening a refrigerator.",
      ],
      answer: 1,
      explanation: "'Preparing food' is general enough to cover cutting vegetables - safe correct choice.",
      explanationVi: "'Preparing food' đủ tổng quát để bao gồm thái rau - đáp án an toàn nhất.",
    },
    {
      context: "Photo: Two men in suits standing face to face, hands joined.",
      contextVi: "Ảnh: Hai người đàn ông mặc vest đứng đối diện, tay nắm tay.",
      question: "Which option is correct?",
      options: [
        "They are signing a contract.",
        "They are shaking hands.",
        "They are arguing loudly.",
        "They are walking together.",
      ],
      answer: 1,
      explanation: "Hands joined + face to face = classic 'shaking hands' visual.",
      explanationVi: "Tay nắm + mặt đối mặt = hình ảnh kinh điển của 'shaking hands'.",
    },
    {
      context: "Photo: A barista pouring milk into a cup of espresso, customer waiting at counter.",
      contextVi: "Ảnh: Nhân viên pha chế đang rót sữa vào ly espresso, khách chờ ở quầy.",
      question: "Best description?",
      options: [
        "A customer is drinking coffee.",
        "The barista is preparing a beverage.",
        "Cups are being washed.",
        "Money is being exchanged.",
      ],
      answer: 1,
      explanation: "Focus = barista; action = pouring milk = preparing a beverage.",
      explanationVi: "Trung tâm = barista; hành động = rót sữa = pha đồ uống.",
    },
  ],
  businessContext:
    "People-centered photos appear in 5/6 Part 1 questions. Office, retail, restaurant, and warehouse settings dominate.",
  businessContextVi:
    "Ảnh có người chiếm 5/6 câu Part 1. Bối cảnh phổ biến: văn phòng, bán lẻ, nhà hàng, kho bãi.",
  proSpeedTip:
    "💡 In 4 seconds, ask yourself: WHO + VERB + OBJECT? Lock these 3 words mentally before audio plays.",
  proSpeedTipVi:
    "💡 Trong 4 giây, tự hỏi: AI + ĐỘNG TỪ + TÂN NGỮ? Khóa 3 từ này trong đầu trước khi audio bắt đầu.",
  vocabHighlights: [
    { word: "preparing", definition: "getting something ready", definitionVi: "chuẩn bị", example: "She is preparing a presentation.", businessContext: "office" },
    { word: "examining", definition: "looking at carefully", definitionVi: "kiểm tra kỹ", example: "He is examining the document.", businessContext: "office" },
    { word: "assembling", definition: "putting parts together", definitionVi: "lắp ráp", example: "Workers are assembling the machine.", businessContext: "factory" },
    { word: "loading", definition: "putting things into a vehicle", definitionVi: "chất hàng", example: "They are loading boxes onto a truck.", businessContext: "warehouse" },
    { word: "greeting", definition: "saying hello to someone", definitionVi: "chào hỏi", example: "The host is greeting guests.", businessContext: "hospitality" },
    { word: "browsing", definition: "looking through items casually", definitionVi: "xem lướt", example: "Customers are browsing the shelves.", businessContext: "retail" },
  ],
  quiz: [
    {
      question: "Best verb for: A man with hands on a steering wheel, eyes on road.",
      options: ["riding a bike", "driving a vehicle", "fixing a car", "parking"],
      answer: 1,
      explanation: "Steering wheel + eyes on road = actively driving.",
    },
    {
      question: "Photo: empty conference room with chairs around a table. Correct?",
      options: ["People are meeting.", "The room has been arranged.", "Someone is speaking.", "Chairs are being moved."],
      answer: 1,
      explanation: "No people → use result state 'has been arranged'.",
    },
    {
      question: "If you don't see any document, eliminate which verb?",
      options: ["smiling", "signing", "standing", "talking"],
      answer: 1,
      explanation: "'Signing' requires a visible document.",
    },
    {
      question: "'They are shaking hands' requires:",
      options: ["1 person waving", "2+ people with joined hands", "Anyone clapping", "A handshake icon"],
      answer: 1,
      explanation: "Mutual action needs at least 2 people in contact.",
    },
    {
      question: "Safest answer style on Part 1:",
      options: ["Very specific verbs", "General verbs that match obvious actions", "Long sentences", "Verbs you don't know"],
      answer: 1,
      explanation: "General + obviously matching verbs are usually correct.",
    },
    {
      question: "If focal person's hands are empty:",
      options: ["Pick 'holding'", "Eliminate 'holding'", "Pick 'carrying'", "Pick 'lifting'"],
      answer: 1,
      explanation: "No object in hand → eliminate hold/carry/lift.",
    },
  ],
  cheatSheetPoints: [
    "👥 Find the FOCAL person first",
    "🎯 Lock WHO + VERB + OBJECT in 4 seconds",
    "✋ Empty hands = no holding/carrying",
    "📷 Many people in photo? Match the verb to the right one",
    "✅ General verbs ('preparing', 'examining') = often correct",
  ],
  isNew: true,
};

// ============================================================
// 2. Part 2 - Tag & Negative questions
// ============================================================
const part2TagNegative: ToeicLecture = {
  id: "toeic-part2-tag-negative",
  title: "Part 2: Tag Questions & Negative Questions",
  titleVi: "Part 2: Câu hỏi đuôi và câu hỏi phủ định",
  category: "listening",
  parts: ["Part 2"],
  icon: "🔁",
  duration: "18 min",
  level: "intermediate",
  targetScore: "600+",
  description:
    "Crack the toughest Part 2 forms: tag questions ('isn't it?', 'don't you?') and negative questions ('Aren't you...?'). Learn the 'Strip & Treat' method.",
  descriptionVi:
    "Phá đảo dạng Part 2 khó nhất: câu hỏi đuôi và câu hỏi phủ định. Học phương pháp 'Bỏ đuôi & Trả lời thường'.",
  trapAlerts: [
    {
      trap: "Treating tag question literally",
      trapVi: "Hiểu câu hỏi đuôi theo nghĩa đen",
      why: "'You're going, aren't you?' is just 'Are you going?' - answer with Yes/No about going, not about the tag.",
      whyVi: "'You're going, aren't you?' chính là 'Are you going?' - trả lời Yes/No về việc đi, không phải về đuôi.",
    },
    {
      trap: "Reversing logic on negative questions",
      trapVi: "Lật ngược logic câu phủ định",
      why: "'Aren't you tired?' - if you ARE tired, say 'Yes (I am tired)'. The negative form doesn't flip the answer.",
      whyVi: "'Aren't you tired?' - nếu bạn MỆT, trả lời 'Yes (I am tired)'. Phủ định không đảo đáp án.",
    },
    {
      trap: "Distractor with same tag word",
      trapVi: "Đáp án bẫy chứa từ trong đuôi",
      why: "Question: 'It is hot, isn't it?' Trap: 'No, it isn't morning.' - uses 'isn't' to confuse you.",
      whyVi: "Câu hỏi: 'It is hot, isn't it?' Bẫy: 'No, it isn't morning.' - dùng 'isn't' để gây nhầm.",
    },
    {
      trap: "Indirect agreement responses",
      trapVi: "Đáp án đồng ý gián tiếp",
      why: "Tag answers may skip Yes/No: 'It sure is.' / 'Definitely.' / 'I think so.' - all valid agreements.",
      whyVi: "Đáp tag có thể bỏ Yes/No: 'It sure is.' / 'Definitely.' / 'I think so.' - đều đồng ý.",
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Strip the tag",
      titleVi: "Bỏ phần đuôi",
      description:
        "Mentally remove the tag. 'You finished, didn't you?' becomes simply 'Did you finish?'",
      descriptionVi:
        "Bỏ đuôi trong đầu. 'You finished, didn't you?' thành 'Did you finish?'",
    },
    {
      step: 2,
      title: "Strip the 'not'",
      titleVi: "Bỏ chữ 'not'",
      description:
        "Negative questions: remove 'n't'. 'Isn't this cold?' = 'Is this cold?' Then answer based on truth.",
      descriptionVi:
        "Câu phủ định: bỏ 'n't'. 'Isn't this cold?' = 'Is this cold?' Trả lời theo sự thật.",
    },
    {
      step: 3,
      title: "Listen for indirect agreement",
      titleVi: "Nghe đáp án đồng ý gián tiếp",
      description:
        "'Sure is', 'I think so', 'Of course', 'Probably' all work as Yes. 'Not really', 'I doubt it' = No.",
      descriptionVi:
        "'Sure is', 'I think so', 'Of course', 'Probably' đều = Yes. 'Not really', 'I doubt it' = No.",
    },
    {
      step: 4,
      title: "Eliminate echo-words",
      titleVi: "Loại đáp án 'lặp từ'",
      description:
        "Distractors recycle words from the tag. If 'isn't' appears in 2 choices, both are likely traps.",
      descriptionVi:
        "Đáp án bẫy lặp lại từ trong đuôi. Nếu 'isn't' xuất hiện ở 2 lựa chọn, cả 2 thường là bẫy.",
    },
  ],
  practiceSet: [
    {
      context: "Q: 'You're attending the workshop tomorrow, aren't you?'",
      contextVi: "Q: 'You're attending the workshop tomorrow, aren't you?'",
      question: "Best response:",
      options: [
        "No, the workshop isn't long.",
        "Yes, I signed up last week.",
        "Aren't you coming?",
        "Tomorrow is Tuesday.",
      ],
      answer: 1,
      explanation: "Stripped: 'Are you attending?' → 'Yes, I signed up' confirms attendance.",
      explanationVi: "Bỏ đuôi: 'Are you attending?' → 'Yes, I signed up' xác nhận tham dự.",
    },
    {
      context: "Q: 'Isn't this report due today?'",
      contextVi: "Q: 'Isn't this report due today?'",
      question: "Best response:",
      options: [
        "No, we don't have a report.",
        "Actually, it's due tomorrow.",
        "Isn't it Monday?",
        "Today is sunny.",
      ],
      answer: 1,
      explanation: "Stripped: 'Is this report due today?' → 'Actually, tomorrow' clarifies the deadline.",
      explanationVi: "Bỏ phủ định: 'Is this report due today?' → 'Actually, tomorrow' điều chỉnh hạn nộp.",
    },
    {
      context: "Q: 'They've finished the renovation, haven't they?'",
      contextVi: "Q: 'They've finished the renovation, haven't they?'",
      question: "Best response:",
      options: [
        "Sure they have.",
        "Haven't you been there?",
        "The renovation hasn't started.",
        "Yes, the building is tall.",
      ],
      answer: 0,
      explanation: "'Sure they have' = strong agreement (= Yes, they finished).",
      explanationVi: "'Sure they have' = đồng ý mạnh (= Yes, đã xong).",
    },
  ],
  businessContext:
    "Tag and negative questions test confirmations during business conversations: meetings, schedules, deadlines.",
  businessContextVi:
    "Câu đuôi và phủ định kiểm tra xác nhận trong hội thoại công việc: họp, lịch, hạn nộp.",
  proSpeedTip:
    "💡 The moment you hear a tag, mentally turn it into a Yes/No question. Don't translate - STRIP.",
  proSpeedTipVi:
    "💡 Vừa nghe đuôi → ngay lập tức biến thành câu Yes/No trong đầu. Đừng dịch - BỎ ĐUÔI.",
  vocabHighlights: [
    { word: "definitely", definition: "without doubt", definitionVi: "chắc chắn", example: "Definitely, I'll be there." },
    { word: "I doubt it", definition: "I don't think so", definitionVi: "tôi nghi vậy", example: "I doubt it - they're closed." },
    { word: "sure is", definition: "strong yes", definitionVi: "đúng vậy", example: "It sure is hot today." },
    { word: "not really", definition: "softer no", definitionVi: "không hẳn", example: "Not really, only a few." },
    { word: "of course", definition: "obviously yes", definitionVi: "tất nhiên", example: "Of course, I can help." },
    { word: "I'm afraid not", definition: "polite no", definitionVi: "e là không", example: "I'm afraid not, the deadline passed." },
  ],
  quiz: [
    {
      question: "'Aren't you ready?' - you ARE ready. Best answer:",
      options: ["No, I'm ready.", "Yes, I'm ready.", "Yes, I'm not.", "No, I'm not ready."],
      answer: 1,
      explanation: "Truth = ready → Yes (regardless of negative question form).",
    },
    {
      question: "'You signed the form, didn't you?' - you didn't. Best answer:",
      options: ["Yes, I did.", "No, not yet.", "Didn't I?", "Sure I did."],
      answer: 1,
      explanation: "Truth = not signed → 'No, not yet'.",
    },
    {
      question: "Strip the tag: 'It's raining, isn't it?'",
      options: ["Is it raining?", "Isn't it raining?", "Was it raining?", "Will it rain?"],
      answer: 0,
      explanation: "Tag stripped → simple Yes/No question 'Is it raining?'",
    },
    {
      question: "Which is NOT a way to say Yes?",
      options: ["Sure is.", "Definitely.", "I doubt it.", "Of course."],
      answer: 2,
      explanation: "'I doubt it' = No / disagreement.",
    },
    {
      question: "Most Part 2 traps recycle ___ from the question.",
      options: ["meaning", "words/sounds", "grammar", "tone"],
      answer: 1,
      explanation: "Echo-word distractors are the #1 trap.",
    },
    {
      question: "Negative question logic:",
      options: ["Flip Yes/No", "Same as positive", "Always answer Yes", "Always answer No"],
      answer: 1,
      explanation: "Negative form doesn't flip the truth-based answer.",
    },
  ],
  cheatSheetPoints: [
    "✂️ STRIP the tag → answer like normal Y/N",
    "🚫 IGNORE 'not' in negative questions",
    "🪞 Beware echo-word distractors",
    "✅ 'Sure is', 'Definitely', 'I think so' = Yes",
    "❌ 'Not really', 'I doubt it', 'I'm afraid not' = No",
  ],
  isNew: true,
};

// ============================================================
// 3. Part 3 - Speaker tone & implication
// ============================================================
const part3Tone: ToeicLecture = {
  id: "toeic-part3-tone",
  title: "Part 3: Reading Speaker Tone & Hidden Meaning",
  titleVi: "Part 3: Đọc giọng điệu và ý ẩn của người nói",
  category: "listening",
  parts: ["Part 3"],
  icon: "🎭",
  duration: "20 min",
  level: "intermediate",
  targetScore: "750+",
  description:
    "Some Part 3 questions ask 'What does the woman mean?' or 'Why does the man say...?'. Master the tone-decoding technique to score these traps.",
  descriptionVi:
    "Một số câu Part 3 hỏi 'Ý của người phụ nữ là gì?' hoặc 'Tại sao người nói nói vậy?'. Làm chủ kỹ thuật giải mã giọng điệu để ăn điểm.",
  trapAlerts: [
    {
      trap: "Sarcasm vs. literal meaning",
      trapVi: "Châm biếm vs. nghĩa đen",
      why: "'Oh, that's just great...' (heavy sigh) = frustration, NOT happiness.",
      whyVi: "'Oh, that's just great...' (thở dài) = thất vọng, KHÔNG vui.",
    },
    {
      trap: "Polite refusal phrases",
      trapVi: "Cụm từ chối lịch sự",
      why: "'I'd love to, but...' / 'Maybe another time' = NO disguised as politeness.",
      whyVi: "'I'd love to, but...' / 'Maybe another time' = TỪ CHỐI núp dưới sự lịch sự.",
    },
    {
      trap: "Hesitation words signal disagreement",
      trapVi: "Từ ngập ngừng = bất đồng ý",
      why: "'Well... I'm not sure if...' starts a soft disagreement, not curiosity.",
      whyVi: "'Well... I'm not sure if...' báo hiệu bất đồng nhẹ nhàng, không phải tò mò.",
    },
    {
      trap: "Implied requests",
      trapVi: "Yêu cầu ngầm",
      why: "'It's getting cold in here.' actually means 'Please close the window.'",
      whyVi: "'It's getting cold in here.' thực ra = 'Hãy đóng cửa sổ giúp tôi.'",
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Pre-read the implication question",
      titleVi: "Đọc trước câu hỏi 'ý ẩn'",
      description:
        "If you see 'What does X mean?' or 'Why does X say...?', flag it. The answer is contextual, not literal.",
      descriptionVi:
        "Thấy 'What does X mean?' hoặc 'Why does X say...?' → đánh dấu. Đáp án là theo ngữ cảnh, không nghĩa đen.",
    },
    {
      step: 2,
      title: "Listen to the BEFORE line",
      titleVi: "Nghe câu TRƯỚC",
      description:
        "The implied meaning comes from what was said RIGHT BEFORE the quoted line. Anchor on context.",
      descriptionVi:
        "Ý ẩn đến từ câu nói NGAY TRƯỚC câu được trích. Bám vào ngữ cảnh trước.",
    },
    {
      step: 3,
      title: "Decode tone words",
      titleVi: "Giải mã từ chỉ giọng điệu",
      description:
        "'Actually...' = correction. 'Well...' = hesitation. 'Honestly...' = blunt truth. 'Sure!' = enthusiastic yes.",
      descriptionVi:
        "'Actually...' = chỉnh sửa. 'Well...' = ngập ngừng. 'Honestly...' = thẳng thắn. 'Sure!' = đồng ý nhiệt tình.",
    },
    {
      step: 4,
      title: "Eliminate literal-only choices",
      titleVi: "Loại đáp án nghĩa đen thuần",
      description:
        "If a choice just repeats the words verbatim, it's likely the trap. Look for the inferred meaning.",
      descriptionVi:
        "Đáp án chỉ lặp lại nguyên văn → bẫy. Tìm đáp án mang ý suy luận.",
    },
    {
      step: 5,
      title: "Match emotion to action",
      titleVi: "Ghép cảm xúc với hành động",
      description:
        "Frustrated tone → likely a complaint. Excited tone → an offer. Hesitant tone → polite refusal.",
      descriptionVi:
        "Giọng bực → than phiền. Giọng hào hứng → đề nghị. Giọng ngập ngừng → từ chối lịch sự.",
    },
  ],
  practiceSet: [
    {
      context:
        "Man: 'I sent the report 3 hours ago.' Woman: 'Oh… that's interesting.' Why does the woman say this?",
      contextVi:
        "Nam: 'Tôi gửi báo cáo 3 tiếng trước.' Nữ: 'Oh… that's interesting.' Tại sao nữ nói vậy?",
      question: "What is implied?",
      options: [
        "She finds the report fascinating.",
        "She didn't receive it and is suspicious.",
        "She wants to read it later.",
        "She thinks it took too long.",
      ],
      answer: 1,
      explanation: "'Oh… that's interesting' with hesitation = polite skepticism.",
      explanationVi: "'Oh… that's interesting' kèm ngập ngừng = nghi ngờ lịch sự.",
    },
    {
      context: "Woman: 'Want to grab lunch?' Man: 'I'd love to, but I have a deadline.'",
      contextVi: "Nữ: 'Đi ăn trưa không?' Nam: 'I'd love to, but I have a deadline.'",
      question: "The man means:",
      options: [
        "He will eat later.",
        "He's politely declining.",
        "He wants to reschedule.",
        "He's hungry.",
      ],
      answer: 1,
      explanation: "'I'd love to, but...' is a textbook polite refusal.",
      explanationVi: "'I'd love to, but...' là kiểu từ chối lịch sự chuẩn mực.",
    },
    {
      context: "Woman: 'It's freezing in here.' Man: 'I'll get the heater.'",
      contextVi: "Nữ: 'Lạnh quá!' Nam: 'Để tôi lấy máy sưởi.'",
      question: "What was the woman implying?",
      options: [
        "She wants the temperature raised.",
        "She likes cold weather.",
        "She wants to leave.",
        "She is making small talk.",
      ],
      answer: 0,
      explanation: "Implicit request to fix the cold → man's response confirms.",
      explanationVi: "Ngầm yêu cầu khắc phục cái lạnh → phản hồi của nam xác nhận.",
    },
  ],
  businessContext:
    "Implication questions appear in 3-4 Part 3 conversations per test, often in client/colleague exchanges.",
  businessContextVi:
    "Câu hỏi ý ẩn xuất hiện 3-4 lần trong Part 3, thường trong hội thoại với khách hàng hoặc đồng nghiệp.",
  proSpeedTip:
    "💡 Implication questions are CONTEXT questions. Listen to what came BEFORE the line, not the line alone.",
  proSpeedTipVi:
    "💡 Câu hỏi ý ẩn là câu hỏi NGỮ CẢNH. Nghe phần TRƯỚC câu được hỏi, đừng chỉ nghe mình câu đó.",
  vocabHighlights: [
    { word: "I'd love to, but...", definition: "polite refusal", definitionVi: "từ chối lịch sự", example: "I'd love to, but I'm busy." },
    { word: "Maybe another time", definition: "polite no", definitionVi: "có thể lúc khác", example: "Maybe another time - I have plans." },
    { word: "Actually...", definition: "introducing correction", definitionVi: "thật ra", example: "Actually, the meeting is at 3." },
    { word: "Honestly...", definition: "stating blunt truth", definitionVi: "thành thật mà nói", example: "Honestly, I disagree." },
    { word: "fair enough", definition: "I accept that", definitionVi: "cũng hợp lý", example: "Fair enough, let's move on." },
    { word: "no kidding", definition: "expression of surprise", definitionVi: "thật á", example: "No kidding! That's huge." },
  ],
  quiz: [
    {
      question: "'I'll think about it' usually means:",
      options: ["Strong yes", "Likely no", "Definitely later", "I'm confused"],
      answer: 1,
      explanation: "Soft refusal phrase.",
    },
    {
      question: "Tone of 'Honestly, I'm not sure':",
      options: ["Confident", "Hesitant", "Excited", "Angry"],
      answer: 1,
      explanation: "Hesitation marker.",
    },
    {
      question: "'It's chilly in here' as an implied request means:",
      options: ["Open the window", "Adjust temperature/heat", "Leave the room", "Wear a coat"],
      answer: 1,
      explanation: "Implied request to make it warmer.",
    },
    {
      question: "When pre-reading, flag questions that contain:",
      options: ["'What time...'", "'What does X mean?'", "'Where is...'", "'Who...'"],
      answer: 1,
      explanation: "Implication questions need context-listening.",
    },
    {
      question: "Sarcastic 'Oh, great' usually expresses:",
      options: ["Joy", "Frustration", "Surprise", "Curiosity"],
      answer: 1,
      explanation: "Sarcasm flips the literal meaning.",
    },
    {
      question: "'Sure!' (enthusiastic) signals:",
      options: ["Reluctant yes", "Definite no", "Enthusiastic agreement", "Confusion"],
      answer: 2,
      explanation: "Strong, willing agreement.",
    },
  ],
  cheatSheetPoints: [
    "🎯 Flag 'What does X mean?' / 'Why does X say...?'",
    "🔊 Listen to the line RIGHT BEFORE the quote",
    "🎭 'I'd love to, but...' = polite NO",
    "🔥 Sarcastic tone flips literal meaning",
    "🌡️ Implied requests sound like complaints",
  ],
  isNew: true,
};

// ============================================================
// 4. Part 4 - Talks & Broadcast (Announcements decoder)
// ============================================================
const part4Talks: ToeicLecture = {
  id: "toeic-part4-talks",
  title: "Part 4: Decoding Talks, Ads & Broadcasts",
  titleVi: "Part 4: Giải mã bài nói, quảng cáo & thông báo",
  category: "listening",
  parts: ["Part 4"],
  icon: "📢",
  duration: "22 min",
  level: "intermediate",
  targetScore: "750+",
  description:
    "Part 4 talks follow predictable structures. Learn the 6 talk types and the signal words that unlock answers.",
  descriptionVi:
    "Bài nói Part 4 tuân theo cấu trúc dễ đoán. Học 6 dạng bài nói và từ tín hiệu để giải mã đáp án.",
  trapAlerts: [
    {
      trap: "Topic appears in opening line",
      trapVi: "Chủ đề thường ở câu mở đầu",
      why: "Q1 'What is the talk about?' → answered in first 5 seconds. If you miss it, you lose all 3 questions.",
      whyVi: "Q1 'Bài nói về gì?' → trả lời trong 5 giây đầu. Bỏ lỡ → mất cả 3 câu.",
    },
    {
      trap: "Future action signal: 'will', 'next', 'after this'",
      trapVi: "Tín hiệu hành động tương lai",
      why: "'What will the speaker do next?' → listen for 'will', 'next', or 'after this'.",
      whyVi: "'Người nói sẽ làm gì tiếp theo?' → nghe 'will', 'next', 'after this'.",
    },
    {
      trap: "Numbers that don't match the question",
      trapVi: "Con số không khớp câu hỏi",
      why: "Talk mentions $50, $20, 30%, 1990. Question asks 'discount?' → only 30% matches. Don't pick the loudest number.",
      whyVi: "Bài nói có $50, $20, 30%, 1990. Câu hỏi về 'giảm giá?' → chỉ 30% đúng. Đừng chọn số to nhất.",
    },
    {
      trap: "Audience identity in the greeting",
      trapVi: "Đối tượng thính giả nằm trong lời chào",
      why: "'Welcome, shareholders…' → audience = investors. 'Attention, passengers…' → travelers.",
      whyVi: "'Welcome, shareholders…' → khán giả = nhà đầu tư. 'Attention, passengers…' → hành khách.",
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Identify the TALK TYPE first",
      titleVi: "Xác định dạng bài nói trước",
      description:
        "6 types: announcement, advertisement, news, voicemail, tour, instructions. Each has a signature opening.",
      descriptionVi:
        "6 dạng: thông báo, quảng cáo, tin tức, voicemail, tour du lịch, hướng dẫn. Mỗi dạng có mở đầu đặc trưng.",
      example: "'Attention all shoppers...' = store announcement",
    },
    {
      step: 2,
      title: "Pre-read all 3 questions",
      titleVi: "Đọc trước cả 3 câu hỏi",
      description:
        "Before audio: skim Q1 (topic), Q2 (detail), Q3 (next action / inference). Predict listening order.",
      descriptionVi:
        "Trước audio: lướt Q1 (chủ đề), Q2 (chi tiết), Q3 (hành động kế tiếp). Đoán thứ tự nghe.",
    },
    {
      step: 3,
      title: "Map info zones (1/3 - 1/3 - 1/3)",
      titleVi: "Chia vùng thông tin (1/3 - 1/3 - 1/3)",
      description:
        "Q1 answer = first third. Q2 = middle. Q3 = last third (often after 'finally', 'next', 'before we close').",
      descriptionVi:
        "Đáp án Q1 = đầu. Q2 = giữa. Q3 = cuối (sau 'finally', 'next', 'before we close').",
    },
    {
      step: 4,
      title: "Anchor on signal words",
      titleVi: "Bám vào từ tín hiệu",
      description:
        "'However' = contrast. 'Therefore' = result. 'Please' = request. 'Don't forget' = reminder = often Q3.",
      descriptionVi:
        "'However' = đối lập. 'Therefore' = kết quả. 'Please' = yêu cầu. 'Don't forget' = nhắc nhở = thường là Q3.",
    },
    {
      step: 5,
      title: "Don't be fooled by graphic distractors",
      titleVi: "Đừng bị lừa bởi biểu đồ",
      description:
        "Graphic Qs require matching audio numbers to chart values. Pre-read the chart axis labels.",
      descriptionVi:
        "Câu có biểu đồ cần khớp số liệu nói với biểu đồ. Đọc nhãn trục biểu đồ trước.",
    },
  ],
  practiceSet: [
    {
      context:
        "Talk opening: 'Good morning, passengers. Due to weather, our flight to Boston is delayed by 90 minutes…'",
      contextVi:
        "Mở đầu: 'Chào quý khách. Do thời tiết, chuyến bay đến Boston bị hoãn 90 phút…'",
      question: "Where is this talk taking place?",
      options: ["At a train station", "At an airport", "On a ship", "At a hotel"],
      answer: 1,
      explanation: "'Passengers' + 'flight' = airport.",
      explanationVi: "'Passengers' + 'flight' = sân bay.",
    },
    {
      context:
        "Ad: 'Buy any 2 jackets and get the third FREE this weekend at GreenStyle stores.'",
      contextVi:
        "QC: 'Mua 2 áo jacket tặng 1 cuối tuần tại GreenStyle.'",
      question: "What is being promoted?",
      options: ["A grocery sale", "A clothing promotion", "A car deal", "A travel package"],
      answer: 1,
      explanation: "'Jackets' = clothing.",
      explanationVi: "'Jackets' = quần áo.",
    },
    {
      context:
        "Voicemail: 'Hi, this is Dr. Lee. Please call back to confirm your Tuesday appointment.'",
      contextVi:
        "Voicemail: 'Chào, đây là bác sĩ Lee. Vui lòng gọi lại để xác nhận hẹn thứ Ba.'",
      question: "What should the listener do?",
      options: ["Pay a bill", "Call back to confirm", "Reschedule online", "Visit immediately"],
      answer: 1,
      explanation: "'Please call back to confirm' is the explicit request.",
      explanationVi: "'Please call back to confirm' là yêu cầu rõ ràng.",
    },
  ],
  businessContext:
    "Part 4 talks reflect real workplace announcements: PA systems, ads, training intros, and voicemails.",
  businessContextVi:
    "Bài nói Part 4 mô phỏng thực tế: loa thông báo, quảng cáo, mở đầu khoá học, voicemail.",
  proSpeedTip:
    "💡 Decide the TALK TYPE in 5 seconds - it tells you what vocabulary and structure to expect.",
  proSpeedTipVi:
    "💡 Quyết định DẠNG BÀI NÓI trong 5 giây - nó báo trước từ vựng và cấu trúc cần nghe.",
  vocabHighlights: [
    { word: "attention", definition: "request to listen", definitionVi: "chú ý", example: "Attention all staff…", businessContext: "PA announcement" },
    { word: "delayed", definition: "postponed", definitionVi: "trễ/hoãn", example: "The flight is delayed.", businessContext: "travel" },
    { word: "promotion", definition: "special offer", definitionVi: "khuyến mãi", example: "Today's promotion ends at 5.", businessContext: "retail" },
    { word: "voicemail", definition: "recorded phone message", definitionVi: "tin nhắn thoại", example: "Leave a voicemail after the tone." },
    { word: "agenda", definition: "list of topics", definitionVi: "chương trình họp", example: "First on the agenda is the budget.", businessContext: "meeting" },
    { word: "remind", definition: "to make someone remember", definitionVi: "nhắc nhở", example: "I'd like to remind everyone…" },
  ],
  quiz: [
    {
      question: "Phrase 'Attention shoppers' signals:",
      options: ["A weather report", "A store announcement", "A flight delay", "A voicemail"],
      answer: 1,
      explanation: "Classic store opener.",
    },
    {
      question: "Where is Q3 answer usually found?",
      options: ["First sentence", "Middle", "Last third / closing line", "Background music"],
      answer: 2,
      explanation: "Q3 = next action, mostly in the closing.",
    },
    {
      question: "'Don't forget...' signals:",
      options: ["Greeting", "Reminder (often Q3)", "Apology", "Joke"],
      answer: 1,
      explanation: "Reminder phrase = high-probability Q3 anchor.",
    },
    {
      question: "Best Part 4 prep:",
      options: ["Listen first, read later", "Pre-read all 3 questions before audio", "Skip questions", "Memorize numbers"],
      answer: 1,
      explanation: "Pre-read sets your listening targets.",
    },
    {
      question: "'However' signals:",
      options: ["Agreement", "Contrast", "Result", "Question"],
      answer: 1,
      explanation: "Contrast marker.",
    },
    {
      question: "Best response when multiple numbers appear:",
      options: ["Pick the loudest", "Match number to question keyword", "Pick the first", "Pick the last"],
      answer: 1,
      explanation: "Each number has a label - match to the right one.",
    },
  ],
  cheatSheetPoints: [
    "🎙️ ID talk type in 5s",
    "📋 Pre-read all 3 Qs",
    "🗺️ 1/3-1/3-1/3 info map",
    "📍 'Don't forget' / 'Finally' = Q3 anchor",
    "🔢 Match numbers to question keywords",
  ],
  isNew: true,
};

// ============================================================
// 5. Part 5 - Verb Tense Matrix
// ============================================================
const part5VerbTense: ToeicLecture = {
  id: "toeic-part5-verb-tense",
  title: "Part 5: The Verb Tense Decision Matrix",
  titleVi: "Part 5: Ma trận quyết định thì động từ",
  category: "grammar",
  parts: ["Part 5"],
  icon: "⏳",
  duration: "25 min",
  level: "intermediate",
  targetScore: "600+",
  description:
    "30% of Part 5 tests verb tense. Learn the 5 time-signal categories that instantly reveal the correct tense in 4 seconds.",
  descriptionVi:
    "30% Part 5 kiểm tra thì động từ. Học 5 nhóm tín hiệu thời gian giúp xác định thì đúng trong 4 giây.",
  trapAlerts: [
    {
      trap: "Time signal hidden at end of sentence",
      trapVi: "Tín hiệu thời gian ẩn cuối câu",
      why: "'Mr. Lee ___ the report yesterday.' - 'yesterday' at the end forces past simple. Don't rush.",
      whyVi: "'Mr. Lee ___ the report yesterday.' - 'yesterday' cuối câu ép thì quá khứ đơn. Đừng vội.",
    },
    {
      trap: "Confusing 'for' (duration) with 'since' (start point)",
      trapVi: "Nhầm 'for' (khoảng) với 'since' (mốc)",
      why: "'For 3 years' + 'since 2020' both signal present perfect, but mean different things.",
      whyVi: "'For 3 years' + 'since 2020' đều báo hiện tại hoàn thành, nhưng nghĩa khác nhau.",
    },
    {
      trap: "Future-in-past trap",
      trapVi: "Bẫy tương lai trong quá khứ",
      why: "'She said she ___ call.' → 'would' (not 'will'). Past reporting needs past forms.",
      whyVi: "'She said she ___ call.' → 'would' (không 'will'). Tường thuật quá khứ cần dạng quá khứ.",
    },
    {
      trap: "By + future date = future perfect",
      trapVi: "By + thời gian tương lai = tương lai hoàn thành",
      why: "'By next month, the team ___ finished.' → 'will have finished'. Memorize this.",
      whyVi: "'By next month, the team ___ finished.' → 'will have finished'. Học thuộc.",
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Scan for TIME WORDS first",
      titleVi: "Quét từ chỉ thời gian trước",
      description:
        "Before reading the sentence, hunt: yesterday, last, ago, since, for, by, when, while, now.",
      descriptionVi:
        "Trước khi đọc câu, săn: yesterday, last, ago, since, for, by, when, while, now.",
    },
    {
      step: 2,
      title: "Apply the 5 categories",
      titleVi: "Áp dụng 5 nhóm",
      description:
        "Past clue → past tense. 'Have/has' clue → present perfect. 'Will/be going' → future. 'Now/right now' → present continuous.",
      descriptionVi:
        "Manh mối quá khứ → thì quá khứ. 'Have/has' → hiện tại hoàn thành. 'Will' → tương lai. 'Now' → hiện tại tiếp diễn.",
    },
    {
      step: 3,
      title: "Sequence rule: 2 actions, 1 sentence",
      titleVi: "Quy tắc trình tự: 2 hành động, 1 câu",
      description:
        "Earlier action = past perfect. Later = past simple. 'When she arrived, he had already left.'",
      descriptionVi:
        "Hành động trước = quá khứ hoàn thành. Sau = quá khứ đơn. 'When she arrived, he had already left.'",
    },
    {
      step: 4,
      title: "Subject-Verb agreement check",
      titleVi: "Kiểm tra hợp chủ-vị",
      description:
        "Singular subject + 's' verb. Plural + base verb. Don't choose tense without checking subject first.",
      descriptionVi:
        "Chủ ngữ số ít + động từ thêm 's'. Số nhiều + động từ nguyên. Phải kiểm tra chủ ngữ trước khi chọn thì.",
    },
    {
      step: 5,
      title: "Eliminate non-finite forms in main clauses",
      titleVi: "Loại dạng không chia ở mệnh đề chính",
      description:
        "Main clause needs a finite verb. 'To do' / '-ing' / 'V3' alone can't be the main verb without auxiliary.",
      descriptionVi:
        "Mệnh đề chính cần động từ chia. 'To do' / '-ing' / 'V3' đứng một mình không phải động từ chính.",
    },
  ],
  practiceSet: [
    {
      context: "Sentence: 'The board ___ the proposal last Friday.'",
      contextVi: "Câu: 'The board ___ the proposal last Friday.'",
      question: "Choose the verb form:",
      options: ["approves", "approved", "has approved", "will approve"],
      answer: 1,
      explanation: "'Last Friday' = past simple → 'approved'.",
      explanationVi: "'Last Friday' = quá khứ đơn → 'approved'.",
    },
    {
      context: "Sentence: 'By the end of this year, our company ___ a new branch.'",
      contextVi: "Câu: 'By the end of this year, our company ___ a new branch.'",
      question: "Choose the verb form:",
      options: ["opens", "opened", "will have opened", "is opening"],
      answer: 2,
      explanation: "'By + future' = future perfect → 'will have opened'.",
      explanationVi: "'By + tương lai' = tương lai hoàn thành.",
    },
    {
      context: "Sentence: 'Ms. Park ___ for this firm since 2018.'",
      contextVi: "Câu: 'Ms. Park ___ for this firm since 2018.'",
      question: "Choose the verb form:",
      options: ["worked", "works", "has worked", "is working"],
      answer: 2,
      explanation: "'Since + year' = present perfect → 'has worked'.",
      explanationVi: "'Since + năm' = hiện tại hoàn thành.",
    },
  ],
  businessContext:
    "Part 5 verb tense questions appear 8-12 times per test. Mastering tense signals saves seconds and boosts accuracy.",
  businessContextVi:
    "Câu thì Part 5 xuất hiện 8-12 lần/đề. Làm chủ tín hiệu giúp tiết kiệm thời gian và tăng độ chính xác.",
  proSpeedTip:
    "💡 The TIME WORD usually decides the tense - find it FIRST, before reading anything else.",
  proSpeedTipVi:
    "💡 TỪ CHỈ THỜI GIAN thường quyết định thì - tìm nó TRƯỚC khi đọc bất cứ gì khác.",
  vocabHighlights: [
    { word: "since", definition: "from a starting time", definitionVi: "kể từ", example: "Since 2020, prices have risen." },
    { word: "for", definition: "duration of time", definitionVi: "trong khoảng", example: "For 5 hours straight." },
    { word: "by", definition: "no later than (with future perfect)", definitionVi: "trước khi", example: "By Monday, we'll have finished." },
    { word: "ago", definition: "in the past from now", definitionVi: "trước đây", example: "Two days ago." },
    { word: "currently", definition: "at present", definitionVi: "hiện tại", example: "We are currently hiring." },
    { word: "previously", definition: "before now / earlier", definitionVi: "trước đó", example: "Previously, she worked at HSBC." },
  ],
  quiz: [
    {
      question: "'Ago' signals:",
      options: ["Future", "Past simple", "Present perfect", "Present continuous"],
      answer: 1,
      explanation: "'X ago' = past simple.",
    },
    {
      question: "Future perfect needs:",
      options: ["will + V", "will have + V3", "have + V3", "going to + V"],
      answer: 1,
      explanation: "Form: will have + past participle.",
    },
    {
      question: "'Currently' pairs with:",
      options: ["Past simple", "Present continuous", "Past perfect", "Future"],
      answer: 1,
      explanation: "'Currently' = right now → present continuous.",
    },
    {
      question: "'When she arrived, he ___ already left.'",
      options: ["has", "had", "will have", "is having"],
      answer: 1,
      explanation: "Earlier action = past perfect 'had left'.",
    },
    {
      question: "Best first step on Part 5 tense Qs:",
      options: ["Read the whole sentence", "Find the time word", "Check punctuation", "Eliminate options"],
      answer: 1,
      explanation: "Time word usually decides the tense.",
    },
    {
      question: "Reported speech 'She said she ___ help.':",
      options: ["will", "would", "is", "has"],
      answer: 1,
      explanation: "Past reporting verb → 'would'.",
    },
  ],
  cheatSheetPoints: [
    "🔍 Find TIME WORD first",
    "📅 'yesterday/ago/last' → past simple",
    "🔁 'since/for' → present perfect",
    "🚀 'by + future' → future perfect",
    "🕒 'currently/now' → present continuous",
    "👥 Always check subject-verb agreement",
  ],
  isNew: true,
};

// ============================================================
// 6. Part 6 - Sentence insertion
// ============================================================
const part6Insertion: ToeicLecture = {
  id: "toeic-part6-insertion",
  title: "Part 6: Mastering the Sentence Insertion Question",
  titleVi: "Part 6: Làm chủ câu hỏi chèn câu vào đoạn",
  category: "reading",
  parts: ["Part 6"],
  icon: "🧩",
  duration: "20 min",
  level: "intermediate",
  targetScore: "750+",
  description:
    "Each Part 6 passage has 1 sentence-insertion question. Learn the 4-test framework to nail it every time.",
  descriptionVi:
    "Mỗi đoạn Part 6 có 1 câu hỏi chèn câu. Học khung 4 bước để luôn chọn đúng.",
  trapAlerts: [
    {
      trap: "Choosing the prettiest-sounding sentence",
      trapVi: "Chọn câu nghe 'hay nhất'",
      why: "Beautiful prose isn't the goal - COHESION is. The right sentence MUST connect to surrounding ideas.",
      whyVi: "Câu hay không phải mục tiêu - LIÊN KẾT mới quan trọng. Câu đúng PHẢI nối với ý xung quanh.",
    },
    {
      trap: "Repeating info already stated",
      trapVi: "Lặp lại thông tin đã có",
      why: "If the sentence rephrases what was just said, it's a trap. New info is preferred.",
      whyVi: "Câu chỉ nhắc lại ý vừa nói = bẫy. Câu mang thông tin mới được ưu tiên.",
    },
    {
      trap: "Pronoun without antecedent",
      trapVi: "Đại từ không có danh từ chỉ về",
      why: "If 'he' or 'this' has no clear referent in the previous sentence, the choice is wrong.",
      whyVi: "'He' hay 'this' không có danh từ chỉ về rõ ràng → lựa chọn sai.",
    },
    {
      trap: "Wrong tense / topic shift",
      trapVi: "Sai thì hoặc đổi chủ đề",
      why: "Inserted sentence must match the verb tense AND topic of the surrounding paragraph.",
      whyVi: "Câu chèn phải khớp thì VÀ chủ đề với đoạn xung quanh.",
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Read sentence BEFORE the blank",
      titleVi: "Đọc câu TRƯỚC chỗ trống",
      description:
        "Identify the topic, key noun, and verb tense. The insertion must continue this thread.",
      descriptionVi:
        "Xác định chủ đề, danh từ chính, thì động từ. Câu chèn phải tiếp nối mạch này.",
    },
    {
      step: 2,
      title: "Read sentence AFTER the blank",
      titleVi: "Đọc câu SAU chỗ trống",
      description:
        "If the after-sentence starts with 'However', 'Therefore', or 'In addition', the insertion must set up that logic.",
      descriptionVi:
        "Câu sau bắt đầu bằng 'However', 'Therefore', 'In addition' → câu chèn phải tạo tiền đề cho logic đó.",
    },
    {
      step: 3,
      title: "Test pronoun reference",
      titleVi: "Kiểm tra đại từ chỉ về",
      description:
        "Any 'he/she/it/this/these' must point to a noun in the previous sentence. Eliminate orphans.",
      descriptionVi:
        "Mọi 'he/she/it/this/these' phải chỉ về danh từ trong câu trước. Loại đáp án mồ côi.",
    },
    {
      step: 4,
      title: "Eliminate topic-jumpers",
      titleVi: "Loại câu nhảy chủ đề",
      description:
        "If 4 surrounding sentences are about pricing, but a choice talks about hiring, eliminate it.",
      descriptionVi:
        "Đoạn xoay quanh giá, mà đáp án nói về tuyển dụng → loại.",
    },
  ],
  practiceSet: [
    {
      context:
        "Paragraph: 'We are pleased to announce our new flexible work policy. ___ Employees may now choose 2 days per week to work remotely.'",
      contextVi:
        "Đoạn: 'Chúng tôi vui mừng công bố chính sách làm việc linh hoạt mới. ___ Nhân viên có thể chọn 2 ngày/tuần làm từ xa.'",
      question: "Best inserted sentence:",
      options: [
        "The cafeteria menu has been updated.",
        "This new policy aims to improve work-life balance.",
        "Quarterly profits have increased by 12%.",
        "Please return your laptops by Friday.",
      ],
      answer: 1,
      explanation: "Connects 'new policy' to surrounding sentences and introduces purpose.",
      explanationVi: "Nối 'chính sách mới' với các câu xung quanh và nêu mục đích.",
    },
    {
      context:
        "Paragraph: '___ However, we are committed to delivering on time despite the supply delays.'",
      contextVi:
        "Đoạn: '___ However, we are committed to delivering on time despite the supply delays.'",
      question: "Best inserted sentence:",
      options: [
        "The market has been slow this quarter.",
        "Recent supplier issues have created challenges for our timelines.",
        "We hired 5 new managers last month.",
        "Our office is closed on Sundays.",
      ],
      answer: 1,
      explanation: "'However' contrasts the difficulty with commitment - sentence must set up the difficulty.",
      explanationVi: "'However' đối lập khó khăn với cam kết - câu chèn phải nêu khó khăn.",
    },
    {
      context:
        "Paragraph: 'Our annual sale begins June 1st. ___ All clearance items will be 50% off.'",
      contextVi:
        "Đoạn: 'Đợt sale thường niên bắt đầu 1/6. ___ Tất cả hàng dọn kho giảm 50%.'",
      question: "Best inserted sentence:",
      options: [
        "We will announce a new CEO soon.",
        "Customers can expect significant savings storewide.",
        "The HR team will hire 10 interns.",
        "Returns must be processed within 30 days.",
      ],
      answer: 1,
      explanation: "Bridges 'sale begins' and 'clearance 50% off' with savings theme.",
      explanationVi: "Cầu nối giữa 'sale bắt đầu' và 'giảm 50%' bằng chủ đề tiết kiệm.",
    },
  ],
  businessContext:
    "Part 6 insertion questions appear in business memos, emails, and product announcements.",
  businessContextVi:
    "Câu chèn Part 6 thường gặp trong memo, email công việc và thông báo sản phẩm.",
  proSpeedTip:
    "💡 Read 1 sentence BEFORE + 1 sentence AFTER the blank. The right answer bridges them.",
  proSpeedTipVi:
    "💡 Đọc 1 câu TRƯỚC + 1 câu SAU chỗ trống. Đáp án đúng là cầu nối giữa hai câu.",
  vocabHighlights: [
    { word: "however", definition: "introduces contrast", definitionVi: "tuy nhiên", example: "However, costs rose." },
    { word: "therefore", definition: "introduces conclusion", definitionVi: "do đó", example: "Therefore, we adjusted prices." },
    { word: "in addition", definition: "adds info", definitionVi: "ngoài ra", example: "In addition, free shipping is offered." },
    { word: "specifically", definition: "particular detail", definitionVi: "cụ thể", example: "Specifically, the 5pm slot." },
    { word: "as a result", definition: "consequence", definitionVi: "kết quả là", example: "As a result, sales dropped." },
    { word: "in contrast", definition: "showing difference", definitionVi: "trái lại", example: "In contrast, our rivals lost share." },
  ],
  quiz: [
    {
      question: "Best test for the right inserted sentence:",
      options: ["Sounds nice", "Connects before & after sentences", "Has a long verb", "Contains a number"],
      answer: 1,
      explanation: "Cohesion (before + after) is the gold test.",
    },
    {
      question: "If the next sentence starts with 'However':",
      options: ["Insertion must contrast it", "Insertion must agree with it", "Insertion must set up the contrast", "Skip the question"],
      answer: 2,
      explanation: "'However' contrasts with what came BEFORE, so insertion = pre-contrast info.",
    },
    {
      question: "Pronoun without clear referent =",
      options: ["Acceptable", "Wrong", "Neutral", "Better choice"],
      answer: 1,
      explanation: "Pronouns must have antecedents.",
    },
    {
      question: "Inserted sentences must match:",
      options: ["Verb tense + topic", "Word count", "Letter count", "Author voice"],
      answer: 0,
      explanation: "Tense + topic alignment is crucial.",
    },
    {
      question: "Eliminate any choice that:",
      options: ["Repeats info already given", "Adds new related info", "Bridges ideas", "Sets up next sentence"],
      answer: 0,
      explanation: "Repetition is a Part 6 trap.",
    },
    {
      question: "Smart Part 6 reading order:",
      options: ["Read all 4 paragraphs first", "Read sentence before + after each blank", "Only read questions", "Skip the passage"],
      answer: 1,
      explanation: "Local context (1 before + 1 after) is enough.",
    },
  ],
  cheatSheetPoints: [
    "🪡 Read 1 sentence BEFORE + 1 AFTER the blank",
    "🔗 Inserted sentence MUST bridge them",
    "👀 Pronouns need clear antecedents",
    "📍 Match topic + verb tense",
    "🚫 Beware repeats and topic-jumpers",
  ],
  isNew: true,
};

// ============================================================
// 7. Part 7 - Triple passages cross-reference
// ============================================================
const part7TripleCrossRef: ToeicLecture = {
  id: "toeic-part7-triple-cross",
  title: "Part 7: Triple Passages - Cross-Reference Mastery",
  titleVi: "Part 7: Bài 3 đoạn - Làm chủ kỹ thuật đối chiếu",
  category: "reading",
  parts: ["Part 7"],
  icon: "🔗",
  duration: "28 min",
  level: "advanced",
  targetScore: "900+",
  description:
    "Triple passages are the highest-scoring Part 7 questions. Master the 'Bridge Read' technique to connect info across 3 documents.",
  descriptionVi:
    "Bài 3 đoạn là câu khó nhất Part 7. Làm chủ kỹ thuật 'Đọc cầu nối' để liên kết thông tin xuyên 3 tài liệu.",
  trapAlerts: [
    {
      trap: "Answering from 1 passage when 2 are needed",
      trapVi: "Trả lời từ 1 đoạn khi cần 2",
      why: "Cross-reference questions require info from at least 2 documents. Single-source answers are usually wrong.",
      whyVi: "Câu đối chiếu cần thông tin từ ít nhất 2 tài liệu. Đáp án 1 nguồn thường sai.",
    },
    {
      trap: "Date / time / price MISMATCH",
      trapVi: "Ngày / giờ / giá KHÔNG khớp",
      why: "Email says 'May 5', schedule says 'May 8'. Question 'when did Ms. Lee leave?' needs the schedule, not email.",
      whyVi: "Email ghi 'May 5', lịch ghi 'May 8'. Hỏi 'Bà Lee đi khi nào?' cần xem lịch chứ không phải email.",
    },
    {
      trap: "Document type confusion",
      trapVi: "Nhầm loại tài liệu",
      why: "3 docs may include: web ad + email + form. Identify which doc holds the question's clue.",
      whyVi: "3 tài liệu có thể là: quảng cáo web + email + biểu mẫu. Xác định tài liệu chứa manh mối.",
    },
    {
      trap: "Name traps across documents",
      trapVi: "Bẫy tên giữa các tài liệu",
      why: "Mr. Kim writes the email; Mr. Park is the recipient. Question asks about RECIPIENT - find the right name.",
      whyVi: "Ông Kim viết email; ông Park nhận. Câu hỏi về NGƯỜI NHẬN - tìm đúng tên.",
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Identify the 3 document TYPES",
      titleVi: "Xác định LOẠI 3 tài liệu",
      description:
        "Common combos: ad + email + reply. OR schedule + memo + form. Knowing types speeds skimming.",
      descriptionVi:
        "Bộ hay gặp: quảng cáo + email + email phản hồi. HOẶC lịch + memo + biểu mẫu. Biết loại = skim nhanh.",
    },
    {
      step: 2,
      title: "Tag each doc with a 1-word PURPOSE",
      titleVi: "Gắn 1 từ MỤC ĐÍCH cho mỗi tài liệu",
      description:
        "Doc1 = OFFER, Doc2 = REQUEST, Doc3 = APPROVAL. This map tells you which doc answers each question type.",
      descriptionVi:
        "Doc1 = ƯU ĐÃI, Doc2 = YÊU CẦU, Doc3 = DUYỆT. Bản đồ này cho biết tài liệu nào trả lời câu nào.",
    },
    {
      step: 3,
      title: "Spot the cross-reference question (1-2 per set)",
      titleVi: "Nhận diện câu đối chiếu (1-2 câu/bộ)",
      description:
        "Look for: 'How much did X actually pay?' or 'Why was the request rejected?' These need 2+ docs.",
      descriptionVi:
        "Tìm: 'X đã trả thực sự bao nhiêu?' hoặc 'Vì sao yêu cầu bị từ chối?' Cần 2+ tài liệu.",
    },
    {
      step: 4,
      title: "Bridge Read: Doc A keyword → Doc B/C confirmation",
      titleVi: "Đọc cầu nối: từ khoá Doc A → xác nhận Doc B/C",
      description:
        "Find the keyword in Doc A. Carry it mentally to Doc B/C. The answer lives where they intersect.",
      descriptionVi:
        "Tìm từ khoá ở Doc A. Mang nó qua Doc B/C trong đầu. Đáp án nằm ở giao điểm.",
    },
    {
      step: 5,
      title: "Eliminate single-source choices",
      titleVi: "Loại đáp án 1 nguồn",
      description:
        "If a choice is fully visible in only 1 document, it's likely a trap on cross-reference questions.",
      descriptionVi:
        "Đáp án thấy đủ ở 1 tài liệu duy nhất = bẫy trên câu đối chiếu.",
    },
  ],
  practiceSet: [
    {
      context:
        "Doc1 (Ad): 'Spring sale: 20% off jackets, 15% off shoes.' Doc2 (Email): 'I'd like to order 2 jackets and 1 pair of shoes.' Doc3 (Receipt): 'Subtotal $400. Discount: $80.'",
      contextVi:
        "Doc1 (QC): 'Sale xuân: jacket 20%, giày 15%.' Doc2 (Email): 'Mua 2 jacket và 1 đôi giày.' Doc3 (Hóa đơn): 'Tạm tính $400. Giảm: $80.'",
      question: "What discount rate did the customer apply?",
      options: ["10%", "15%", "20%", "25%"],
      answer: 2,
      explanation: "Discount $80 on $400 = 20% (jacket rate). Cross-ref ad + receipt.",
      explanationVi: "Giảm $80 trên $400 = 20% (rate jacket). Đối chiếu QC + hóa đơn.",
    },
    {
      context:
        "Doc1 (Schedule): 'Workshop A: Mon 10am.' Doc2 (Email to Kim): 'Please attend Workshop A.' Doc3 (Reply): 'I have a conflict on Monday morning.'",
      contextVi:
        "Doc1 (Lịch): 'Workshop A: thứ Hai 10h.' Doc2 (Email cho Kim): 'Vui lòng tham dự Workshop A.' Doc3 (Trả lời): 'Tôi bận sáng thứ Hai.'",
      question: "Why can't Kim attend?",
      options: [
        "He's on vacation.",
        "He has a conflict at the workshop time.",
        "He moved offices.",
        "The workshop was cancelled.",
      ],
      answer: 1,
      explanation: "Schedule (Mon 10am) + reply (busy Mon morning) → time conflict.",
      explanationVi: "Lịch (T2 10h) + trả lời (bận sáng T2) → trùng giờ.",
    },
    {
      context:
        "Doc1 (Job ad): 'Min 3 yrs experience.' Doc2 (Resume): 'Worked 2018-2022 at Acme.' Doc3 (Application date): 'Submitted June 2025.'",
      contextVi:
        "Doc1 (Tin tuyển): 'Tối thiểu 3 năm KN.' Doc2 (CV): 'Làm 2018-2022 tại Acme.' Doc3 (Ngày nộp): 'Tháng 6/2025.'",
      question: "Does the candidate meet experience requirements?",
      options: ["No, only 2 years", "Yes, 4 years", "Yes, but unrelated", "Not enough info"],
      answer: 1,
      explanation: "2018-2022 = 4 years experience ≥ 3 → meets.",
      explanationVi: "2018-2022 = 4 năm ≥ 3 → đạt.",
    },
  ],
  businessContext:
    "Triple passage sets simulate real workplace tasks: matching job postings with applications, comparing quotes, reconciling invoices.",
  businessContextVi:
    "Bài 3 đoạn mô phỏng công việc thực tế: ghép tin tuyển với đơn ứng tuyển, so sánh báo giá, đối chiếu hoá đơn.",
  proSpeedTip:
    "💡 The cross-ref question is usually Q4 or Q5 in the set. Save it for last after you've absorbed all 3 docs.",
  proSpeedTipVi:
    "💡 Câu đối chiếu thường là Q4 hoặc Q5. Để cuối cùng, sau khi đã nắm cả 3 tài liệu.",
  vocabHighlights: [
    { word: "discrepancy", definition: "a difference between two things", definitionVi: "sự khác biệt", example: "There's a discrepancy in the invoice." },
    { word: "reconcile", definition: "make consistent", definitionVi: "đối chiếu", example: "Reconcile bank statements monthly." },
    { word: "amend", definition: "to change formally", definitionVi: "sửa đổi", example: "Amend the contract." },
    { word: "voucher", definition: "ticket for discount", definitionVi: "phiếu giảm giá", example: "Use a voucher at checkout." },
    { word: "itinerary", definition: "travel schedule", definitionVi: "lịch trình", example: "Send me your itinerary." },
    { word: "quotation", definition: "price estimate", definitionVi: "báo giá", example: "Request a quotation first." },
  ],
  quiz: [
    {
      question: "Cross-ref Qs need info from:",
      options: ["1 doc", "2+ docs", "Outside the set", "Random doc"],
      answer: 1,
      explanation: "By definition, cross-reference = 2+ sources.",
    },
    {
      question: "Ad: 20% off jackets. Email orders 2 jackets. Receipt: $80 saved on $400. Discount?",
      options: ["10%", "15%", "20%", "25%"],
      answer: 2,
      explanation: "$80/$400 = 20%.",
    },
    {
      question: "Best Part 7 triple-passage strategy:",
      options: ["Read all 3 fully first", "Skim doc types + tag purposes", "Read questions only", "Skip"],
      answer: 1,
      explanation: "Skim + purpose-tag = fast and accurate.",
    },
    {
      question: "If the schedule says 10am Mon and email says 'busy Mon morning':",
      options: ["No conflict", "Time conflict", "Day conflict", "Insufficient info"],
      answer: 1,
      explanation: "10am Monday is morning → conflict.",
    },
    {
      question: "Single-source answer on cross-ref Qs is usually:",
      options: ["Correct", "A trap", "Acceptable", "Bonus"],
      answer: 1,
      explanation: "Cross-ref questions REQUIRE multi-source synthesis.",
    },
    {
      question: "Order to tackle 5 Qs in a triple passage:",
      options: ["1-2-3-4-5", "Easy single-source first, cross-ref last", "5-4-3-2-1", "Skip Q1"],
      answer: 1,
      explanation: "Single-source first builds context for cross-ref.",
    },
  ],
  cheatSheetPoints: [
    "🏷️ Tag each doc with a 1-word PURPOSE",
    "🔍 Spot the cross-reference Qs (usually Q4/Q5)",
    "🌉 Bridge Read: keyword in Doc A → confirm in Doc B/C",
    "🚫 Eliminate single-source answers on cross-ref",
    "⏱️ Single-source Qs first, cross-ref last",
  ],
  isNew: true,
};

// ============================================================
// 8. Business Vocabulary - HR & Recruitment
// ============================================================
const hrRecruitVocab: ToeicLecture = {
  id: "toeic-hr-recruitment-vocab",
  title: "Business Vocabulary: HR & Recruitment Essentials",
  titleVi: "Từ vựng kinh doanh: HR & tuyển dụng",
  category: "business-vocab",
  parts: ["Part 5", "Part 6", "Part 7"],
  icon: "👔",
  duration: "20 min",
  level: "intermediate",
  targetScore: "600+",
  description:
    "30+ HR & recruitment terms that appear repeatedly in TOEIC: job ads, application emails, interview schedules, onboarding memos.",
  descriptionVi:
    "30+ thuật ngữ HR & tuyển dụng xuất hiện liên tục trong TOEIC: tin tuyển dụng, email ứng tuyển, lịch phỏng vấn, memo onboarding.",
  trapAlerts: [
    {
      trap: "'Apply for' (job) vs. 'apply to' (company)",
      trapVi: "'Apply for' (việc) vs. 'apply to' (công ty)",
      why: "TOEIC tests this preposition. 'Apply FOR a position', 'apply TO a firm'.",
      whyVi: "TOEIC kiểm tra giới từ này. 'Apply FOR vị trí', 'apply TO công ty'.",
    },
    {
      trap: "'Hire' vs. 'fire' vs. 'lay off'",
      trapVi: "'Hire' vs. 'fire' vs. 'lay off'",
      why: "Hire = employ; fire = dismiss for cause; lay off = let go due to business reasons.",
      whyVi: "Hire = thuê; fire = đuổi vì lỗi; lay off = cho nghỉ vì lý do kinh doanh.",
    },
    {
      trap: "'Resume' vs. 'CV' vs. 'cover letter'",
      trapVi: "'Resume' vs. 'CV' vs. 'cover letter'",
      why: "Resume (US) = CV (UK), 1-2 pages of experience. Cover letter = intro letter to employer.",
      whyVi: "Resume (Mỹ) = CV (Anh), 1-2 trang KN. Cover letter = thư giới thiệu gửi nhà tuyển dụng.",
    },
    {
      trap: "'Promote' vs. 'demote' vs. 'transfer'",
      trapVi: "'Promote' vs. 'demote' vs. 'transfer'",
      why: "Promote = move up; demote = move down; transfer = move sideways/elsewhere.",
      whyVi: "Promote = thăng chức; demote = giáng chức; transfer = thuyên chuyển.",
    },
  ],
  coreTechnique: [
    {
      step: 1,
      title: "Group HR words by stage",
      titleVi: "Nhóm từ HR theo giai đoạn",
      description:
        "Recruiting → Interview → Hire → Onboarding → Performance → Exit. Memorize 5 keywords per stage.",
      descriptionVi:
        "Tuyển → Phỏng vấn → Tuyển → Onboarding → Hiệu suất → Thôi việc. Học 5 từ khoá mỗi giai đoạn.",
    },
    {
      step: 2,
      title: "Learn collocations, not just words",
      titleVi: "Học cụm từ, không chỉ từ riêng",
      description:
        "'Submit a resume', 'attend an interview', 'extend an offer', 'accept a position'. These are tested as units.",
      descriptionVi:
        "'Submit a resume', 'attend an interview', 'extend an offer', 'accept a position'. Được kiểm tra như cụm.",
    },
    {
      step: 3,
      title: "Watch verb-noun pairs",
      titleVi: "Để ý cặp Động từ – Danh từ",
      description:
        "'Conduct an interview', 'screen candidates', 'review applications'. Verb decides the noun.",
      descriptionVi:
        "'Conduct an interview', 'screen candidates', 'review applications'. Động từ quyết định danh từ.",
    },
    {
      step: 4,
      title: "Recognize abbreviations",
      titleVi: "Nhận diện viết tắt",
      description:
        "HR (Human Resources), CV, PTO (Paid Time Off), FT/PT (Full-Time/Part-Time), Q&A.",
      descriptionVi:
        "HR (nhân sự), CV, PTO (nghỉ có lương), FT/PT (toàn/bán thời gian), Q&A.",
    },
  ],
  practiceSet: [
    {
      context: "Email: 'Mr. Lee will ___ the candidates next week.'",
      contextVi: "Email: 'Mr. Lee will ___ the candidates next week.'",
      question: "Choose the verb:",
      options: ["promote", "interview", "fire", "transfer"],
      answer: 1,
      explanation: "'Interview the candidates' = standard collocation.",
      explanationVi: "'Interview the candidates' = cụm chuẩn.",
    },
    {
      context: "Job ad: 'We offer competitive ___ and 20 days of paid leave.'",
      contextVi: "Tin tuyển: 'We offer competitive ___ and 20 days of paid leave.'",
      question: "Choose the noun:",
      options: ["resume", "salary", "interview", "hire"],
      answer: 1,
      explanation: "'Competitive salary' is a fixed collocation.",
      explanationVi: "'Competitive salary' là cụm cố định.",
    },
    {
      context: "Memo: 'Due to budget cuts, the company will ___ 50 employees.'",
      contextVi: "Memo: 'Do cắt giảm ngân sách, công ty sẽ ___ 50 nhân viên.'",
      question: "Best verb:",
      options: ["hire", "promote", "lay off", "interview"],
      answer: 2,
      explanation: "'Lay off' = let go due to business reasons (not personal fault).",
      explanationVi: "'Lay off' = cho nghỉ vì lý do kinh doanh.",
    },
  ],
  businessContext:
    "HR vocabulary appears across all reading parts: ads, emails, internal memos. Mastering it boosts Part 5-7 scores significantly.",
  businessContextVi:
    "Từ vựng HR xuất hiện khắp các phần Reading: quảng cáo, email, memo nội bộ. Làm chủ giúp tăng điểm Part 5-7 đáng kể.",
  proSpeedTip:
    "💡 Memorize HR collocations as 2-word UNITS, not single words. 'Conduct interview' is one chunk, not two.",
  proSpeedTipVi:
    "💡 Học cụm HR theo BỘ 2 TỪ, không phải từng từ. 'Conduct interview' là một khối, không tách rời.",
  vocabHighlights: [
    { word: "applicant", definition: "person applying for a job", definitionVi: "người ứng tuyển", example: "We received 200 applicants.", businessContext: "recruiting" },
    { word: "recruit", definition: "find new employees", definitionVi: "tuyển dụng", example: "We're recruiting 5 engineers.", businessContext: "HR" },
    { word: "candidate", definition: "person being considered", definitionVi: "ứng viên", example: "The top candidate accepted the offer." },
    { word: "compensation", definition: "salary + benefits", definitionVi: "lương thưởng", example: "Competitive compensation package.", businessContext: "HR" },
    { word: "onboarding", definition: "new-hire orientation", definitionVi: "định hướng nhân viên mới", example: "Onboarding takes 2 weeks." },
    { word: "vacancy", definition: "open position", definitionVi: "vị trí trống", example: "We have a vacancy in Marketing." },
    { word: "promote", definition: "give a higher rank", definitionVi: "thăng chức", example: "She was promoted to manager." },
    { word: "resign", definition: "voluntarily leave a job", definitionVi: "từ chức", example: "He resigned last month." },
  ],
  quiz: [
    {
      question: "'Apply ___ a position' uses:",
      options: ["to", "for", "in", "on"],
      answer: 1,
      explanation: "'Apply FOR a position' is the standard collocation.",
    },
    {
      question: "'Lay off' means:",
      options: ["Promote", "Hire", "Dismiss for business reasons", "Train"],
      answer: 2,
      explanation: "Lay off = let go due to business, not personal fault.",
    },
    {
      question: "'Cover letter' is sent with:",
      options: ["A resume", "A salary", "An interview", "An exit form"],
      answer: 0,
      explanation: "Cover letter accompanies a resume in applications.",
    },
    {
      question: "Standard verb-noun for 'interview':",
      options: ["make an interview", "conduct an interview", "give an interview", "do an interview"],
      answer: 1,
      explanation: "'Conduct an interview' is the formal collocation.",
    },
    {
      question: "'Onboarding' refers to:",
      options: ["Boarding a plane", "New-hire orientation", "Quarterly review", "Exit interview"],
      answer: 1,
      explanation: "Onboarding = the initial training/orientation process.",
    },
    {
      question: "'PTO' stands for:",
      options: ["Public Tax Office", "Paid Time Off", "Personal Travel Order", "Position Transfer Office"],
      answer: 1,
      explanation: "PTO = Paid Time Off (vacation/sick days).",
    },
  ],
  cheatSheetPoints: [
    "📝 Apply FOR job, TO company",
    "🔁 Hire ↔ Fire ↔ Lay off (different reasons)",
    "📄 Resume = CV ≠ cover letter",
    "🎯 Memorize collocations: 'conduct interview', 'submit resume'",
    "🏢 5 stages: Recruit → Interview → Hire → Onboard → Exit",
  ],
  isNew: true,
};

// ============================================================
// EXPORT
// ============================================================
export const toeicExpansion2Lectures: ToeicLecture[] = [
  part1PeopleAction,
  part2TagNegative,
  part3Tone,
  part4Talks,
  part5VerbTense,
  part6Insertion,
  part7TripleCrossRef,
  hrRecruitVocab,
];

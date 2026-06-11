/**
 * @file ieltsLecturesSpeakingExpansion6.ts
 * @description Sixth wave of IELTS Speaking lectures — vivid storytelling
 * scaffolds, sensory detail drills, and "examiner-favourite" hooks.
 * Every lecture ships with 6 quiz questions, 4-5 prompts with model answers
 * (Band 7.0 → 8.5), 7 bilingual vocab highlights and a 6-point cheat sheet.
 */
import type { IeltsLecture } from "./ieltsLecturesData";

const speakingExpansion6: IeltsLecture[] = [
  {
    id: "speaking-sensory-storytelling",
    title: "Sensory Storytelling — Paint With 5 Senses",
    titleVi: "Kể chuyện đa giác quan — Vẽ bằng 5 giác quan",
    pillar: "skill-based",
    skill: "speaking",
    icon: "🎨",
    duration: "18 min",
    level: "intermediate",
    description:
      "Examiners remember candidates who SHOW, not TELL. Train the SIGHT-SOUND-SMELL-TOUCH-TASTE loop so any Part 2 cue card becomes a mini short film.",
    descriptionVi:
      "Giám khảo nhớ thí sinh biết KỂ HÌNH, không nói suông. Luyện vòng lặp THẤY-NGHE-NGỬI-CHẠM-NẾM để mọi đề Part 2 hóa thành phim ngắn.",
    strategySteps: [
      {
        step: 1,
        title: "Anchor the scene with SIGHT",
        titleVi: "Neo cảnh bằng THỊ GIÁC",
        description:
          "Open with what your eyes saw first: lighting, colours, distance, motion. One specific visual locks the examiner in.",
        descriptionVi:
          "Mở bằng thứ mắt thấy đầu tiên: ánh sáng, màu sắc, khoảng cách, chuyển động. Một chi tiết thị giác cụ thể giữ giám khảo lại.",
        example: "The whole street was bathed in amber light from the paper lanterns hanging in pairs.",
      },
      {
        step: 2,
        title: "Layer SOUND + SMELL",
        titleVi: "Phủ thêm ÂM THANH + MÙI HƯƠNG",
        description:
          "Add one sound and one smell back-to-back. This jumps you straight to Band 7 imagery without complex grammar.",
        descriptionVi:
          "Thêm 1 âm thanh và 1 mùi liền nhau. Cú này đẩy bạn lên Band 7 imagery mà không cần ngữ pháp khó.",
        example: "I could hear distant drums and smell sticky-rice grilling over charcoal.",
      },
      {
        step: 3,
        title: "Plant ONE tactile or taste detail",
        titleVi: "Cài MỘT chi tiết xúc giác/vị giác",
        description:
          "Pick ONE — never both. Overload sounds artificial. A single 'crisp' or 'salty' word does the trick.",
        descriptionVi:
          "Chỉ chọn MỘT — đừng cả hai. Nhồi nhét nghe giả tạo. Một từ 'giòn' hay 'mặn' là đủ.",
      },
      {
        step: 4,
        title: "Close with EMOTION + reflection",
        titleVi: "Kết bằng CẢM XÚC + suy ngẫm",
        description:
          "End by linking the sensory snapshot to how it made you feel and why it still matters. That's a Band 8 closer.",
        descriptionVi:
          "Kết bằng cách nối ảnh chụp giác quan với cảm xúc và lý do nó vẫn còn ý nghĩa. Đó là cú chốt Band 8.",
      },
    ],
    practicalExamples: [
      {
        context: "Cue card: Describe a market you visited",
        contextVi: "Cue card: Tả một khu chợ bạn từng ghé",
        example:
          "Band 7.5: 'It was Bến Thành market on a humid Saturday morning. The stalls were a riot of red dragon fruit and emerald limes. I could hear vendors shouting prices and smell phở broth bubbling from a corner stall. The salty-sweet taste of a banh mi I bought still reminds me of that bustling, slightly chaotic energy I love about Saigon.'",
        explanation:
          "Sight (riot of colour) → Sound (shouting) → Smell (phở) → Taste (banh mi) → Emotion (chaotic energy I love). All 5 senses + reflection in 6 sentences.",
      },
      {
        context: "Cue card: Describe a memorable meal",
        contextVi: "Cue card: Tả bữa ăn đáng nhớ",
        example:
          "Band 8.0: 'Picture a tiny rooftop in Helsinki with snow drifting past the windows. The candles flickered, jazz hummed in the background and the smell of cinnamon buns filled the room. I remember the crunch of the sugar crust on my first bite. What stayed with me was the feeling of warmth — both literal and emotional — on the coldest night of the year.'",
        explanation:
          "Notice 'picture a…' = invites examiner into the scene. The 'literal and emotional warmth' line is the Band 8 reflection.",
      },
      {
        context: "Cue card: Describe a festival",
        contextVi: "Cue card: Tả một lễ hội",
        example:
          "Band 7.0: 'The streets were packed with people in red and gold áo dài. Drums thundered nearby, and I could smell incense drifting from the temple. I held a sticky rice cake in my hand and felt the warm steam rise. Honestly, that festival made me realise how much I missed home.'",
        explanation:
          "Even at Band 7, hitting 4 senses + 1 emotion sentence keeps Fluency and Lexical Resource solid.",
      },
      {
        context: "Cue card: Describe a beach",
        contextVi: "Cue card: Tả một bãi biển",
        example:
          "Band 8.5: 'It was Mỹ Khê at dawn — the horizon glowing peach and the sand still cool underfoot. Waves hissed onto the shore in a steady rhythm and the air carried a faint salty tang. I tasted a fresh mango from a vendor whose voice cut through the quiet. That stillness, broken only by life waking up, felt like the most honest version of Vietnam I'd ever seen.'",
        explanation:
          "Advanced markers: 'cool underfoot', 'hissed onto the shore', 'salty tang', 'honest version of Vietnam'. Sense + emotion + cultural insight.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Dumping all 5 senses in 1 long sentence",
        mistakeVi: "Dồn cả 5 giác quan vào 1 câu dài",
        why: "Long lists sound rehearsed. Spread senses across 4-5 short sentences for natural rhythm.",
        whyVi: "Danh sách dài nghe như học thuộc. Rải giác quan qua 4-5 câu ngắn để nhịp tự nhiên.",
      },
      {
        mistake: "Using vague colours like 'beautiful' or 'nice'",
        mistakeVi: "Dùng màu sắc/tính từ chung chung 'beautiful', 'nice'",
        why: "Empty adjectives cap Lexical Resource at Band 6. Replace with concrete imagery: 'amber', 'emerald', 'peach-coloured'.",
        whyVi: "Tính từ rỗng giới hạn Lexical Resource ở Band 6. Thay bằng hình ảnh cụ thể: 'amber', 'emerald', 'peach-coloured'.",
      },
    ],
    goldenSecret:
      "The 'Smell Rule': smell is the most underused sense by IELTS candidates. If you add ONE specific smell (cinnamon, incense, wet earth, charcoal) you instantly sound 0.5 band higher because almost no candidate does it.",
    goldenSecretVi:
      "Quy tắc 'Mùi hương': khứu giác là giác quan ít thí sinh dùng nhất. Chỉ cần thêm MỘT mùi cụ thể (quế, nhang, đất ẩm, than) bạn nghe cao hơn 0.5 band ngay vì gần như không ai làm.",
    vocabHighlights: [
      { word: "bustling", definition: "full of energetic activity", definitionVi: "nhộn nhịp, tấp nập", example: "The bustling market was alive with vendors.", band: "7.0" },
      { word: "amber light", definition: "warm orange-yellow glow", definitionVi: "ánh sáng vàng cam ấm", example: "The street glowed under amber lanterns.", band: "7.5" },
      { word: "hiss onto the shore", definition: "make a soft rushing sound on sand", definitionVi: "rì rào trên bờ", example: "Waves hissed onto the shore at dawn.", band: "8.0" },
      { word: "salty tang", definition: "sharp salty smell/taste", definitionVi: "vị/mùi mặn nồng", example: "A salty tang hit me as I stepped out.", band: "7.5" },
      { word: "drift past", definition: "move slowly across", definitionVi: "trôi ngang qua", example: "Snow drifted past the window.", band: "7.0" },
      { word: "linger", definition: "remain for a long time", definitionVi: "nán lại, vương vấn", example: "The smell of incense lingered in the hall.", band: "7.5" },
      { word: "evoke", definition: "bring a feeling/memory to mind", definitionVi: "gợi nhớ", example: "That song evokes my childhood summers.", band: "8.0" },
    ],
    quiz: [
      {
        question: "Which sentence opens a Part 2 answer with the strongest SIGHT anchor?",
        options: [
          "It was a nice place with a lot of people there.",
          "The whole street was bathed in amber light from paper lanterns hanging in pairs.",
          "There were many things happening at the same time.",
          "I think it was beautiful, really.",
        ],
        answer: 1,
        explanation: "Concrete colour + specific object + spatial detail = high Lexical Resource and vivid imagery.",
      },
      {
        question: "Why is the smell sense considered the 'secret weapon' in IELTS Speaking?",
        options: [
          "Examiners are trained to count smells.",
          "Most candidates ignore it, so one specific smell instantly lifts your perceived band.",
          "It carries double marks officially.",
          "It is required by the Band 9 descriptor.",
        ],
        answer: 1,
        explanation: "Differentiation principle — almost no candidates add smell. Doing it sounds noticeably more natural and rich.",
      },
      {
        question: "What's the recommended structure for sensory storytelling?",
        options: [
          "Pack all 5 senses into one long sentence.",
          "Mention only the senses the examiner asks about.",
          "Spread 4-5 senses across short sentences + close with emotion.",
          "Repeat the same sense 3 times for emphasis.",
        ],
        answer: 2,
        explanation: "Short sentences create rhythm, and the emotion closer triggers a Band 8 reflection.",
      },
      {
        question: "Which of these is a Band 8-level descriptive phrase?",
        options: ["A very nice market", "A really beautiful place", "A riot of red dragon fruit and emerald limes", "Lots of nice food everywhere"],
        answer: 2,
        explanation: "'Riot of…' is a strong collocation showing vivid imagery and lexical control.",
      },
      {
        question: "Why should you avoid 'beautiful' or 'nice' in your descriptions?",
        options: [
          "They are slang.",
          "They are vague adjectives that cap Lexical Resource at Band 6.",
          "They are grammatically incorrect.",
          "They cannot be used in Part 2.",
        ],
        answer: 1,
        explanation: "Empty adjectives don't show range. Replace with concrete sensory or colour words.",
      },
      {
        question: "Which closer lifts a sensory story to Band 8?",
        options: [
          "That's all I want to say.",
          "I don't really remember anything else.",
          "That stillness, broken only by life waking up, felt like the most honest version of Vietnam I'd ever seen.",
          "It was nice but I forgot the rest.",
        ],
        answer: 2,
        explanation: "Reflection + cultural insight + figurative language = clear Band 8 marker.",
      },
    ],
    cheatSheetPoints: [
      "Open with ONE specific visual (colour + object + space)",
      "Layer 1 sound + 1 smell next",
      "Add ONE taste OR touch — never both",
      "Use 'I could hear / smell / feel…' frame for fluency",
      "Close with how it made you feel and why it matters",
      "Spread senses across 4-5 short sentences, not one long one",
    ],
  },

  {
    id: "speaking-part3-debate-frame-claims",
    title: "Part 3 — The CLAIM-PROOF-PIVOT Debate Frame",
    titleVi: "Part 3 — Khung tranh luận CLAIM-PROOF-PIVOT",
    pillar: "skill-based",
    skill: "speaking",
    icon: "⚖️",
    duration: "20 min",
    level: "advanced",
    description:
      "Examiner asks 'Do you think…?' — replace 'yes/no + because' with the CLAIM (your stance) → PROOF (evidence/example) → PIVOT (acknowledge the other side, then re-anchor). Sounds like a TED-talk soundbite.",
    descriptionVi:
      "Giám khảo hỏi 'Bạn có nghĩ…?' — thay 'có/không + vì' bằng CLAIM (lập trường) → PROOF (dẫn chứng/ví dụ) → PIVOT (thừa nhận phía kia, rồi neo lại). Nghe như một câu trích TED-talk.",
    strategySteps: [
      {
        step: 1,
        title: "CLAIM — declare with confidence",
        titleVi: "CLAIM — tuyên bố tự tin",
        description:
          "Use a strong stance opener: 'I'd argue that…', 'For me, the evidence points to…', 'My honest take is…'.",
        descriptionVi:
          "Dùng mở câu mạnh: 'I'd argue that…', 'For me, the evidence points to…', 'My honest take is…'.",
      },
      {
        step: 2,
        title: "PROOF — anchor in a concrete example",
        titleVi: "PROOF — neo bằng ví dụ cụ thể",
        description:
          "One real anecdote, statistic, or trend. Vague generalities kill credibility.",
        descriptionVi:
          "Một câu chuyện thực, số liệu, hoặc xu hướng. Khái quát mơ hồ giết uy tín.",
      },
      {
        step: 3,
        title: "PIVOT — concede then re-anchor",
        titleVi: "PIVOT — nhượng bộ rồi neo lại",
        description:
          "'That said,…' or 'Granted, some would argue… but…' — Band 8 candidates always show they've considered the counterargument.",
        descriptionVi:
          "'That said,…' hoặc 'Granted, some would argue… but…' — Band 8 luôn thể hiện đã cân nhắc phía đối lập.",
      },
      {
        step: 4,
        title: "STICK — restate the claim in 1 line",
        titleVi: "STICK — chốt lại quan điểm 1 câu",
        description:
          "Close by re-anchoring your stance in a different paraphrase. This is the 'soundbite' that sticks in the examiner's mind.",
        descriptionVi:
          "Kết bằng cách neo lại quan điểm theo cách diễn đạt khác. Đây là 'soundbite' đọng lại trong đầu giám khảo.",
      },
    ],
    practicalExamples: [
      {
        context: "Q: Do you think technology has improved family life?",
        contextVi: "Hỏi: Bạn có nghĩ công nghệ cải thiện đời sống gia đình?",
        example:
          "Band 8.0: 'Honestly, my take is that it cuts both ways. On one hand, video calls have kept my family in Vietnam close to my cousins in Finland — we celebrate Tết together on Zoom every year. That said, I do see kids glued to screens at dinner tables, which clearly erodes real conversation. So all in all, technology is a tool — its impact depends entirely on how families choose to use it.'",
        explanation:
          "CLAIM (cuts both ways) → PROOF (Tết on Zoom) → PIVOT (kids glued to screens) → STICK (it's a tool, depends on use).",
      },
      {
        context: "Q: Should governments invest more in public transport?",
        contextVi: "Hỏi: Chính phủ có nên đầu tư nhiều hơn vào giao thông công cộng?",
        example:
          "Band 7.5: 'I'd argue absolutely yes. Cities like Helsinki cut congestion dramatically by expanding metros — air quality improved within a decade. Granted, the upfront cost is enormous, and not every country can afford it. But long-term, investing in transit pays back through cleaner air and time saved. So yes, it's a non-negotiable priority for any modern city.'",
        explanation:
          "Strong CLAIM, concrete PROOF (Helsinki metro), honest PIVOT (cost), confident STICK (non-negotiable).",
      },
      {
        context: "Q: Is celebrity culture harmful to young people?",
        contextVi: "Hỏi: Văn hóa thần tượng có hại cho giới trẻ không?",
        example:
          "Band 8.5: 'My honest take is that it's a double-edged sword. Influencers can inspire teens to pursue creative careers — I've seen students in Hanoi take up photography because of TikTok. However, the relentless comparison culture clearly drives anxiety, and studies in the UK link Instagram use to teen depression. So while celebrities can spark passion, unchecked exposure quietly damages self-esteem.'",
        explanation:
          "Notice 'double-edged sword' as opener, real anecdote + study, balanced close — classic Band 8.5 soundbite.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Just saying 'Yes, because…' then trailing off",
        mistakeVi: "Chỉ trả lời 'Có, vì…' rồi lặng đi",
        why: "Bare reasoning shows no critical thinking. Examiners reward acknowledging the counterargument under Lexical Resource AND Fluency.",
        whyVi: "Lý do trần trụi không thể hiện tư duy phản biện. Giám khảo cho điểm phần thừa nhận đối lập ở cả Lexical Resource lẫn Fluency.",
      },
      {
        mistake: "Sitting on the fence: 'It depends'",
        mistakeVi: "Lập lờ: 'It depends'",
        why: "'It depends' alone is Band 5. You must DECLARE a stance, then show nuance with PIVOT.",
        whyVi: "'It depends' đứng một mình là Band 5. Phải TUYÊN BỐ lập trường rồi mới khéo léo PIVOT.",
      },
    ],
    goldenSecret:
      "Memorise 3 PIVOT phrases: 'That said,…', 'Granted, some would argue…', 'Having said that,…'. Drop one in EVERY Part 3 answer and you'll jump from Band 6.5 → 7.5 in a week.",
    goldenSecretVi:
      "Học thuộc 3 cụm PIVOT: 'That said,…', 'Granted, some would argue…', 'Having said that,…'. Cài một cụm vào MỌI câu Part 3, bạn nhảy từ 6.5 → 7.5 trong 1 tuần.",
    vocabHighlights: [
      { word: "cuts both ways", definition: "has positive and negative effects", definitionVi: "có cả mặt tốt lẫn xấu", example: "Social media cuts both ways.", band: "7.5" },
      { word: "double-edged sword", definition: "something with mixed consequences", definitionVi: "con dao hai lưỡi", example: "Globalisation is a double-edged sword.", band: "8.0" },
      { word: "granted", definition: "I admit (concession)", definitionVi: "phải công nhận rằng", example: "Granted, the cost is high.", band: "7.5" },
      { word: "non-negotiable", definition: "essential, no compromise", definitionVi: "không thể nhượng bộ", example: "Clean air is non-negotiable.", band: "8.0" },
      { word: "relentless", definition: "constant, harsh", definitionVi: "không ngừng nghỉ, khắc nghiệt", example: "Relentless pressure damages mental health.", band: "8.0" },
      { word: "spark passion", definition: "ignite enthusiasm", definitionVi: "thắp lên đam mê", example: "Mentors can spark passion in students.", band: "7.5" },
      { word: "erode", definition: "wear away gradually", definitionVi: "xói mòn", example: "Screen time erodes face-to-face conversation.", band: "8.0" },
    ],
    quiz: [
      {
        question: "What does CLAIM-PROOF-PIVOT stand for in this lecture?",
        options: [
          "Cliché, Pause, Pretend",
          "Claim, Proof, Pivot (then Stick)",
          "Comparison, Praise, Prediction",
          "Cue, Pause, Position",
        ],
        answer: 1,
        explanation: "CLAIM = stance, PROOF = example, PIVOT = concession, STICK = restate the claim.",
      },
      {
        question: "Which is a Band 8-style CLAIM opener?",
        options: ["I don't really know.", "My honest take is that…", "Maybe yes maybe no.", "Whatever you say."],
        answer: 1,
        explanation: "Confident, personal, signals an opinion is coming.",
      },
      {
        question: "Why is 'It depends' alone scored at Band 5?",
        options: [
          "It's grammatically wrong.",
          "It's slang.",
          "It avoids declaring a stance — no critical thinking shown.",
          "It is too long.",
        ],
        answer: 2,
        explanation: "You must take a position, then nuance it with PIVOT. 'It depends' alone is fence-sitting.",
      },
      {
        question: "Which PIVOT phrase signals 'concession + counter'?",
        options: ["I think so.", "That's all.", "Granted, some would argue… but…", "Maybe."],
        answer: 2,
        explanation: "'Granted,…' admits the other side; 'but…' re-anchors your stance.",
      },
      {
        question: "What is the role of the STICK step?",
        options: [
          "Introduce a new topic",
          "Restate the claim in a fresh paraphrase as a memorable soundbite",
          "Ask the examiner a question",
          "Apologise for the length",
        ],
        answer: 1,
        explanation: "STICK leaves the examiner with a clean, paraphrased restatement of your stance.",
      },
      {
        question: "Which sentence uses the best Band 8 PROOF?",
        options: [
          "Many people think so I guess.",
          "Cities like Helsinki cut congestion dramatically by expanding metros — air quality improved within a decade.",
          "Everyone knows it's good.",
          "It's just better, obviously.",
        ],
        answer: 1,
        explanation: "Specific city + measurable outcome + timeframe = strong evidence.",
      },
    ],
    cheatSheetPoints: [
      "CLAIM with confidence — 'My honest take is…'",
      "PROOF with ONE specific example, anecdote or stat",
      "PIVOT using 'That said,…' / 'Granted,…'",
      "STICK — restate the stance in a fresh paraphrase",
      "Never say 'It depends' alone — always declare first",
      "Drop ONE pivot phrase in EVERY Part 3 answer",
    ],
  },

  {
    id: "speaking-part1-emotion-colours",
    title: "Part 1 — The Emotion-Colours Trick",
    titleVi: "Part 1 — Mẹo 'Màu cảm xúc'",
    pillar: "skill-based",
    skill: "speaking",
    icon: "🌈",
    duration: "14 min",
    level: "foundation",
    description:
      "Most candidates answer Part 1 with bland feelings: 'I like it', 'It's nice'. Replace these with a 'colour' word (a precise emotion adjective) and you instantly sound 1 band higher.",
    descriptionVi:
      "Đa số thí sinh trả lời Part 1 cảm xúc trơ: 'I like it', 'It's nice'. Thay bằng một 'màu cảm xúc' (tính từ cảm xúc chính xác) và bạn lập tức nghe cao hơn 1 band.",
    strategySteps: [
      {
        step: 1,
        title: "Spot the emotion question",
        titleVi: "Nhận diện câu hỏi cảm xúc",
        description:
          "If the prompt has 'like', 'enjoy', 'feel', 'favourite' — it's an emotion question. Activate the colour bank.",
        descriptionVi:
          "Nếu đề có 'like', 'enjoy', 'feel', 'favourite' — đó là câu cảm xúc. Kích hoạt kho 'màu cảm xúc'.",
      },
      {
        step: 2,
        title: "Pick a colour from the bank",
        titleVi: "Chọn 1 màu từ kho",
        description:
          "Positive: thrilled, fascinated, hooked, captivated. Mild: pleasant, soothing, refreshing. Negative: drained, overwhelmed, lukewarm.",
        descriptionVi:
          "Tích cực: thrilled, fascinated, hooked, captivated. Vừa phải: pleasant, soothing, refreshing. Tiêu cực: drained, overwhelmed, lukewarm.",
      },
      {
        step: 3,
        title: "Anchor with WHY in 1 line",
        titleVi: "Neo bằng LÝ DO 1 câu",
        description:
          "Add a single because-clause to ground the emotion in a real reason.",
        descriptionVi:
          "Thêm 1 mệnh đề because để neo cảm xúc vào lý do thực.",
      },
      {
        step: 4,
        title: "Close with a contrast or twist",
        titleVi: "Kết bằng tương phản hoặc twist",
        description:
          "'…though I have to admit…' / '…even if my friends disagree…'. This is the Band 7.5 closer.",
        descriptionVi:
          "'…though I have to admit…' / '…even if my friends disagree…'. Đây là cú chốt 7.5.",
      },
    ],
    practicalExamples: [
      {
        context: "Q: Do you like cooking?",
        contextVi: "Hỏi: Bạn có thích nấu ăn?",
        example:
          "Band 7.5: 'I'm absolutely hooked on it, to be honest. There's something therapeutic about slicing vegetables after a long day — though I have to admit my pasta still turns into a mystery dish half the time.'",
        explanation:
          "Colour (hooked) + because (therapeutic slicing) + twist (mystery pasta). Natural, vivid, scoring.",
      },
      {
        context: "Q: How do you feel about Mondays?",
        contextVi: "Hỏi: Bạn cảm thấy thế nào về thứ Hai?",
        example:
          "Band 7.0: 'Honestly, slightly drained at first. The weekend always flies by too fast. That said, once I have my first coffee, the day usually picks up.'",
        explanation:
          "'Slightly drained' is more precise than 'tired'. The twist (coffee → day picks up) shows balance.",
      },
      {
        context: "Q: Do you enjoy long phone calls?",
        contextVi: "Hỏi: Bạn có thích gọi điện dài không?",
        example:
          "Band 7.5: 'I'm pretty lukewarm about them. Texting feels less invasive — but with my grandparents, a slow phone call is exactly what they love, so I happily make exceptions.'",
        explanation:
          "Negative colour (lukewarm) + reason + warm exception. Shows nuance — Band 7+ trait.",
      },
      {
        context: "Q: What kind of music do you like?",
        contextVi: "Hỏi: Bạn thích loại nhạc gì?",
        example:
          "Band 8.0: 'I'm captivated by lo-fi hip hop, oddly enough. It's the perfect soundtrack to studying because it's mellow without being boring. Though when I'm with friends, I switch to upbeat V-pop in a heartbeat.'",
        explanation:
          "'Captivated' + 'mellow without being boring' + contrast = Band 8 fluency and lexis.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Repeating 'I like / I love / It's nice'",
        mistakeVi: "Lặp lại 'I like / I love / It's nice'",
        why: "Examiners hear these 50 times a day. Repetition caps Lexical Resource at Band 5-6.",
        whyVi: "Giám khảo nghe câu này 50 lần/ngày. Lặp lại giới hạn Lexical Resource ở Band 5-6.",
      },
      {
        mistake: "Using emotion words without a reason",
        mistakeVi: "Dùng từ cảm xúc nhưng không kèm lý do",
        why: "An emotion without context sounds memorised. Always anchor with WHY in one short clause.",
        whyVi: "Cảm xúc không có ngữ cảnh nghe học vẹt. Luôn neo bằng LÝ DO trong 1 mệnh đề ngắn.",
      },
    ],
    goldenSecret:
      "Build a 12-word EMOTION BANK in 3 columns (Positive / Mild / Negative). Drill them aloud for 2 minutes daily. Within a week, your Part 1 emotion answers will autopilot at Band 7+.",
    goldenSecretVi:
      "Xây kho 12 từ CẢM XÚC theo 3 cột (Tích cực / Vừa / Tiêu cực). Luyện đọc to 2 phút/ngày. Sau 1 tuần, câu cảm xúc Part 1 sẽ tự động ở mức 7+.",
    vocabHighlights: [
      { word: "hooked on", definition: "extremely interested in", definitionVi: "nghiện, mê", example: "I'm hooked on Korean dramas.", band: "7.0" },
      { word: "captivated", definition: "completely absorbed", definitionVi: "bị cuốn hút hoàn toàn", example: "I was captivated by the film.", band: "7.5" },
      { word: "lukewarm", definition: "not enthusiastic", definitionVi: "hờ hững, nhạt nhẽo", example: "I'm lukewarm about reality shows.", band: "7.5" },
      { word: "drained", definition: "emotionally exhausted", definitionVi: "kiệt sức về cảm xúc", example: "Mondays leave me a bit drained.", band: "7.5" },
      { word: "therapeutic", definition: "having a healing/calming effect", definitionVi: "có tác dụng chữa lành", example: "Cooking is therapeutic for me.", band: "7.5" },
      { word: "mellow", definition: "soft and pleasant", definitionVi: "êm dịu, dịu dàng", example: "Jazz feels mellow at night.", band: "7.0" },
      { word: "in a heartbeat", definition: "immediately, without hesitation", definitionVi: "ngay lập tức", example: "I'd move to Helsinki in a heartbeat.", band: "8.0" },
    ],
    quiz: [
      {
        question: "Which of these replaces 'I like it' with the highest band?",
        options: ["It is nice.", "I love it so much.", "I'm absolutely hooked on it.", "It is good."],
        answer: 2,
        explanation: "'Hooked on' is a Band 7 collocation showing precise feeling.",
      },
      {
        question: "Why does the emotion need a WHY clause?",
        options: [
          "To make sentences longer",
          "Because feelings without reasons sound memorised",
          "Because examiners require 50 words",
          "Because grammar rules demand it",
        ],
        answer: 1,
        explanation: "Anchoring the emotion with a reason makes the answer authentic and scoring.",
      },
      {
        question: "Which is a Band 7.5 negative colour word?",
        options: ["Bad", "Lukewarm", "Not good", "So-so"],
        answer: 1,
        explanation: "'Lukewarm' = precise, nuanced negative emotion.",
      },
      {
        question: "What does the 'twist closer' achieve?",
        options: [
          "Adds another topic",
          "Shows balance and nuance — a Band 7.5 marker",
          "Wastes time",
          "Confuses the examiner",
        ],
        answer: 1,
        explanation: "A contrast/twist demonstrates flexibility, which IELTS rewards under Fluency and LR.",
      },
      {
        question: "Pick the strongest Band 8 emotion answer:",
        options: [
          "Yes I like music a lot.",
          "I'm captivated by lo-fi hip hop, oddly enough — it's mellow without being boring.",
          "Music is good.",
          "I sometimes listen to music.",
        ],
        answer: 1,
        explanation: "Precise colour + paradox phrase + natural fluency = Band 8 instantly.",
      },
      {
        question: "What's the recommended daily drill for the Emotion Bank?",
        options: ["30 minutes silent reading", "2 minutes aloud daily", "Once a week", "Only before the exam"],
        answer: 1,
        explanation: "Daily 2-minute aloud drilling builds autopilot recall under exam pressure.",
      },
    ],
    cheatSheetPoints: [
      "Ban 'I like / love / nice' — replace with a precise colour word",
      "Positive: thrilled, hooked, fascinated, captivated",
      "Mild: pleasant, soothing, refreshing, mellow",
      "Negative: drained, overwhelmed, lukewarm",
      "Always add 1 WHY clause after the colour word",
      "Close with a twist: 'though I have to admit…'",
    ],
  },

  {
    id: "speaking-part2-time-pressure-rescue",
    title: "Part 2 — The 30-Second Rescue Plan",
    titleVi: "Part 2 — Kế hoạch cứu nguy 30 giây",
    pillar: "skill-based",
    skill: "speaking",
    icon: "🆘",
    duration: "16 min",
    level: "intermediate",
    description:
      "What if your mind goes blank halfway through Part 2? This lecture teaches a 4-step RESCUE PLAN that buys you 30 extra seconds without sounding lost.",
    descriptionVi:
      "Phải làm gì nếu giữa Part 2 đầu óc trống rỗng? Bài này dạy KẾ HOẠCH CỨU NGUY 4 bước, mua thêm 30 giây mà không nghe lạc lối.",
    strategySteps: [
      {
        step: 1,
        title: "Buy time with a thinking phrase",
        titleVi: "Mua thời gian bằng cụm suy nghĩ",
        description:
          "'Let me think for a second…', 'Now that you mention it…' — natural fillers worth 3-4 seconds each.",
        descriptionVi:
          "'Let me think for a second…', 'Now that you mention it…' — filler tự nhiên mỗi cụm 3-4 giây.",
      },
      {
        step: 2,
        title: "Pivot to a comparison",
        titleVi: "Chuyển sang so sánh",
        description:
          "'Unlike most X I've experienced, this one…' — comparisons unlock 20+ seconds of fresh content.",
        descriptionVi:
          "'Unlike most X I've experienced, this one…' — so sánh mở khóa 20+ giây nội dung mới.",
      },
      {
        step: 3,
        title: "Inject a hypothetical",
        titleVi: "Thêm tình huống giả định",
        description:
          "'If I had the chance to do it again, I'd probably…' — instantly gives 15-20 seconds + scoring conditional grammar.",
        descriptionVi:
          "'If I had the chance to do it again, I'd probably…' — cho ngay 15-20 giây + ngữ pháp điều kiện ăn điểm.",
      },
      {
        step: 4,
        title: "Land with a feeling + lesson",
        titleVi: "Kết bằng cảm xúc + bài học",
        description:
          "'What stays with me is… and I think it taught me…' — strong ending = Band 7.5 finisher.",
        descriptionVi:
          "'What stays with me is… and I think it taught me…' — kết mạnh = chốt 7.5.",
      },
    ],
    practicalExamples: [
      {
        context: "Cue card: Describe a teacher who influenced you (running out at 90s)",
        contextVi: "Cue card: Tả thầy/cô ảnh hưởng đến bạn (sắp hết ý ở 90s)",
        example:
          "Band 7.5 rescue: 'Now that you mention it, unlike most teachers I had, Ms. Linh never followed the textbook. If I had to compare her to my high school teachers, she felt more like a coach than an instructor. If I could go back, I'd probably tell her how much that mattered. What stays with me is the realisation that the best teachers don't teach subjects — they teach you to question.'",
        explanation:
          "Filler → comparison → hypothetical → feeling+lesson. Each step bought 10-15 seconds.",
      },
      {
        context: "Cue card: Describe a gift you received",
        contextVi: "Cue card: Tả món quà bạn từng nhận",
        example:
          "Band 7.0: 'Let me think for a second… unlike most gifts I've received, this one was unwrapped — a handwritten letter from my dad. If I had the chance to thank him properly back then, I would have. What stays with me is how a piece of paper can hold more love than anything store-bought.'",
        explanation:
          "Pure rescue plan template applied to a sentimental cue card — sounds authentic, not panicked.",
      },
      {
        context: "Cue card: Describe a place you'd like to visit",
        contextVi: "Cue card: Tả nơi bạn muốn ghé thăm",
        example:
          "Band 8.0: 'Now that you mention it, unlike the typical European cities most people dream of, I'd love to visit Lapland. If I had the chance, I'd probably go in midwinter just to see the auroras dance overhead. What stays with me from documentaries is the eerie quiet of snow — and the idea that silence can feel cinematic.'",
        explanation:
          "Sophisticated: 'eerie quiet', 'cinematic silence' — vocabulary plus the full rescue structure.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Saying 'umm… I don't know what to say'",
        mistakeVi: "Nói 'umm… tôi không biết nói gì'",
        why: "Verbal panic drops Fluency to Band 5. Use rescue fillers instead — they sound thoughtful.",
        whyVi: "Hoảng loạn bằng lời kéo Fluency xuống 5. Thay bằng filler cứu nguy — nghe suy tư.",
      },
      {
        mistake: "Repeating the cue card prompt to fill time",
        mistakeVi: "Đọc lại đề cue card để câu giờ",
        why: "Examiners detect this immediately. It signals empty content and caps Task Response.",
        whyVi: "Giám khảo nhận ra ngay. Cho thấy nội dung rỗng và giới hạn Task Response.",
      },
    ],
    goldenSecret:
      "Memorise just THREE rescue phrases: 'Now that you mention it…', 'If I had the chance to do it again…', 'What stays with me is…'. With these three, you can rescue any cue card under 30 seconds.",
    goldenSecretVi:
      "Học thuộc đúng BA cụm cứu nguy: 'Now that you mention it…', 'If I had the chance to do it again…', 'What stays with me is…'. Chỉ ba cụm này cứu được mọi cue card trong 30 giây.",
    vocabHighlights: [
      { word: "now that you mention it", definition: "thinking aloud phrase", definitionVi: "nghĩ kỹ thì", example: "Now that you mention it, it was unforgettable.", band: "7.0" },
      { word: "stays with me", definition: "remains in memory", definitionVi: "còn đọng lại", example: "That moment stays with me.", band: "7.5" },
      { word: "eerie", definition: "strange, slightly frightening", definitionVi: "kỳ dị, hơi rợn", example: "An eerie silence filled the forest.", band: "8.0" },
      { word: "cinematic", definition: "like a film scene", definitionVi: "như cảnh phim", example: "The view was cinematic.", band: "8.0" },
      { word: "auroras", definition: "northern lights", definitionVi: "cực quang", example: "Auroras danced above the cabin.", band: "7.5" },
      { word: "if I had the chance", definition: "hypothetical past", definitionVi: "nếu có cơ hội", example: "If I had the chance, I'd live abroad.", band: "7.5" },
      { word: "instructor vs coach", definition: "teaching vs mentoring", definitionVi: "người dạy vs người dẫn dắt", example: "She was more coach than instructor.", band: "7.5" },
    ],
    quiz: [
      {
        question: "Why are 'Now that you mention it…' phrases useful?",
        options: [
          "They sound thoughtful and buy 3-4 seconds of thinking time.",
          "Examiners must add 1 point for them.",
          "They are required by Band 9.",
          "They confuse the examiner.",
        ],
        answer: 0,
        explanation: "Natural fillers stretch fluency without sounding panicked.",
      },
      {
        question: "Which rescue step uses scoring conditional grammar?",
        options: [
          "Thinking filler",
          "Comparison",
          "Hypothetical ('If I had the chance to…')",
          "Restating the cue card",
        ],
        answer: 2,
        explanation: "Conditionals show Grammar Range — Band 7+ marker.",
      },
      {
        question: "What should you NEVER do when stuck in Part 2?",
        options: [
          "Use a comparison.",
          "Insert a hypothetical.",
          "Say 'umm… I don't know what to say'.",
          "End with a lesson.",
        ],
        answer: 2,
        explanation: "Verbal panic instantly drops Fluency.",
      },
      {
        question: "Which is the 'lesson closer' style?",
        options: [
          "I think that's all.",
          "What stays with me is the realisation that…",
          "Sorry, I can't continue.",
          "I forgot what to say.",
        ],
        answer: 1,
        explanation: "Reflection sentences are Band 7.5+ closers.",
      },
      {
        question: "Why is repeating the cue card prompt risky?",
        options: [
          "It's grammatically wrong.",
          "Examiners detect it as time-filler and lower Task Response.",
          "It uses too much energy.",
          "It is forbidden by the rules.",
        ],
        answer: 1,
        explanation: "Empty repetition signals lack of content.",
      },
      {
        question: "Which sentence shows the highest band rescue?",
        options: [
          "Umm I don't really remember.",
          "Now that you mention it, unlike most cities I've visited, I'd love to see Lapland — the silence there feels cinematic.",
          "I think it's a nice place.",
          "Sorry can you repeat?",
        ],
        answer: 1,
        explanation: "Filler + comparison + sensory imagery — Band 7.5–8 immediately.",
      },
    ],
    cheatSheetPoints: [
      "Filler: 'Now that you mention it…' (buys 3-4s)",
      "Comparison: 'Unlike most X I've experienced…' (20s)",
      "Hypothetical: 'If I had the chance…' (15s + conditional grammar)",
      "Closer: 'What stays with me is…' (reflection = Band 7.5)",
      "Never: 'umm I don't know' or repeating the cue card",
      "Master just 3 phrases to rescue ANY Part 2",
    ],
  },
];

export { speakingExpansion6 };

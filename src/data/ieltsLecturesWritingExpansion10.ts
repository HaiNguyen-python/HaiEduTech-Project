/**
 * @file ieltsLecturesWritingExpansion10.ts
 * @description Tenth wave of IELTS Writing lectures. Focus: vivid, concrete
 * coaching with full-length sample paragraphs, common Vietnamese-learner
 * mistakes and 6-question quizzes per lecture.
 */
import type { IeltsLecture } from "./ieltsLecturesData";

const writingExpansion10: IeltsLecture[] = [
  {
    id: "writing-task2-3-layer-paragraph",
    title: "Task 2 - The 3-Layer Paragraph (Idea • Evidence • Echo)",
    titleVi: "Task 2 - Đoạn văn 3 lớp (Ý • Bằng chứng • Vọng lại)",
    pillar: "skill-based",
    skill: "writing",
    icon: "🧱",
    duration: "18 min",
    level: "intermediate",
    description:
      "Most Band 6 essays die in the body paragraphs. The 3-Layer formula - Idea (topic sentence) + Evidence (real example) + Echo (link back to thesis) - is the simplest path from Band 6.5 to Band 7.5.",
    descriptionVi:
      "Đa số bài Band 6 chết ở đoạn thân. Công thức 3 LỚP - Ý (câu chủ đề) + Bằng chứng (ví dụ thực) + Vọng lại (móc nối luận đề) - là đường ngắn nhất từ 6.5 lên 7.5.",
    strategySteps: [
      {
        step: 1,
        title: "IDEA - write a fortune-cookie topic sentence",
        titleVi: "IDEA - viết câu chủ đề kiểu 'fortune cookie'",
        description:
          "One sentence, one big idea, no examples yet. Punchy. 15-22 words max.",
        descriptionVi:
          "Một câu, một ý lớn, chưa có ví dụ. Súc tích. Tối đa 15-22 từ.",
        example: "Affordable public transport is the single most effective tool to cut urban air pollution.",
      },
      {
        step: 2,
        title: "EVIDENCE - anchor with a concrete case",
        titleVi: "EVIDENCE - neo bằng ví dụ cụ thể",
        description:
          "Real city, year, or statistic. Vague 'many studies show' = Band 5.",
        descriptionVi:
          "Thành phố thật, năm, hoặc số liệu. 'Many studies show' chung chung là Band 5.",
        example:
          "When Helsinki expanded its tram network in 2017, the city centre saw a 22% drop in NO₂ within three years.",
      },
      {
        step: 3,
        title: "EXPLAIN - connect cause-effect in 1 sentence",
        titleVi: "EXPLAIN - nối nguyên nhân-kết quả 1 câu",
        description:
          "Why does this evidence prove your point? One because/which/so clause.",
        descriptionVi:
          "Vì sao bằng chứng này chứng minh ý? Một mệnh đề because/which/so.",
      },
      {
        step: 4,
        title: "ECHO - restate the thesis in fresh words",
        titleVi: "ECHO - nhắc lại luận đề bằng cách diễn đạt khác",
        description:
          "End the paragraph by 'echoing' your thesis from a new angle. This is the Coherence sealant.",
        descriptionVi:
          "Kết đoạn bằng cách 'vọng' lại luận đề từ góc mới. Đây là chất gắn Coherence.",
      },
    ],
    practicalExamples: [
      {
        context: "Prompt: Some say universities should focus only on academic subjects, others on practical skills.",
        contextVi: "Đề: Có ý kiến cho rằng đại học nên dạy lý thuyết, ý kiến khác cho rằng nên dạy kỹ năng thực tiễn.",
        example:
          "Body 1 (Band 7.5 model):\n[IDEA] A purely academic curriculum risks producing graduates who cannot apply what they know.\n[EVIDENCE] A 2022 LinkedIn report found that 49% of new hires in Vietnam needed retraining within six months because their degrees lacked applied components.\n[EXPLAIN] This skills gap forces companies to absorb training costs that universities should have addressed.\n[ECHO] In short, ignoring practical skills weakens not only the graduate, but the wider economy.",
        explanation: "All four layers visible. Echo restates the thesis (economy) from a fresh angle.",
      },
      {
        context: "Prompt: Online shopping is replacing physical stores. Discuss.",
        contextVi: "Đề: Mua sắm online đang thay thế cửa hàng truyền thống. Thảo luận.",
        example:
          "Body 1:\n[IDEA] Convenience is the single biggest driver of the shift to online retail.\n[EVIDENCE] In 2023, Shopee Vietnam recorded a 38% year-on-year sales jump despite physical stores reopening fully after the pandemic.\n[EXPLAIN] Shoppers continue to choose 24/7 access and price comparison over the limited hours of brick-and-mortar outlets.\n[ECHO] Clearly, modern retail is reorganising itself around speed, not space.",
        explanation: "Concrete platform + percentage + reasoning + a fresh Echo line referencing the thesis.",
      },
      {
        context: "Prompt: Governments should ban smoking in public places. To what extent do you agree?",
        contextVi: "Đề: Chính phủ nên cấm hút thuốc ở nơi công cộng. Bạn đồng ý ở mức nào?",
        example:
          "Body 1:\n[IDEA] A public smoking ban is the most effective way to protect non-smokers from involuntary harm.\n[EVIDENCE] After Finland banned smoking in restaurants in 2007, hospital admissions for childhood asthma dropped by 14% within five years.\n[EXPLAIN] Children are biologically more vulnerable to passive smoke, making the policy a direct child-health intervention.\n[ECHO] Ultimately, the case for a ban rests on a simple truth - one person's habit must not become another's health risk.",
        explanation: "Notice the ECHO line works almost as a stand-alone tweet - that's Band 8 style.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Two ideas in one topic sentence ('… and also …')",
        mistakeVi: "Nhồi 2 ý vào 1 câu chủ đề ('… and also …')",
        why: "Two ideas split the paragraph's focus and collapse Coherence. One paragraph = one idea.",
        whyVi: "Hai ý chia tách tiêu điểm và sập Coherence. Một đoạn = một ý.",
      },
      {
        mistake: "Skipping the EVIDENCE layer",
        mistakeVi: "Bỏ qua lớp EVIDENCE",
        why: "Without a concrete case, the argument stays abstract - Task Response caps at Band 6.",
        whyVi: "Không có ví dụ cụ thể, lập luận vẫn trừu tượng - Task Response giới hạn Band 6.",
      },
    ],
    goldenSecret:
      "The ECHO line is the single biggest 'Band 7 unlock' in Task 2. Add it to EVERY body paragraph for a week and your overall band will visibly rise.",
    goldenSecretVi:
      "Câu ECHO là cú 'mở khóa Band 7' lớn nhất trong Task 2. Thêm vào MỌI đoạn thân suốt 1 tuần và band tổng sẽ tăng thấy rõ.",
    vocabHighlights: [
      { word: "skills gap", definition: "mismatch between needed and available skills", definitionVi: "khoảng chênh kỹ năng", example: "The skills gap costs employers billions.", band: "7.0" },
      { word: "absorb costs", definition: "take on expenses", definitionVi: "gánh chi phí", example: "Firms absorb training costs.", band: "7.0" },
      { word: "drive a shift", definition: "cause a change", definitionVi: "tạo ra thay đổi", example: "Convenience drives the shift online.", band: "7.5" },
      { word: "brick-and-mortar", definition: "physical store", definitionVi: "cửa hàng truyền thống", example: "Brick-and-mortar stores struggle online.", band: "7.5" },
      { word: "involuntary harm", definition: "unwanted damage", definitionVi: "tổn hại ngoài ý muốn", example: "Smoking causes involuntary harm.", band: "8.0" },
      { word: "rest on", definition: "depend on", definitionVi: "dựa trên", example: "The case rests on data.", band: "7.0" },
      { word: "biologically vulnerable", definition: "weaker by nature", definitionVi: "yếu về mặt sinh học", example: "Infants are biologically vulnerable.", band: "8.0" },
    ],
    quiz: [
      {
        question: "What does the 3-Layer formula stand for?",
        options: ["Idea, Example, End", "Idea, Evidence, Echo (+ Explain)", "Intro, Evidence, Excerpt", "Idea, Explain, Exclaim"],
        answer: 1,
        explanation: "IDEA → EVIDENCE → EXPLAIN → ECHO is the full paragraph spine.",
      },
      {
        question: "Why is 'many studies show' Band 5 evidence?",
        options: [
          "It's grammatically wrong.",
          "It's vague - no specific source, city, or stat to verify.",
          "It's too long.",
          "It's slang.",
        ],
        answer: 1,
        explanation: "IELTS rewards specificity - a real city, year, or figure scores higher.",
      },
      {
        question: "What is the role of the ECHO line?",
        options: [
          "Repeat the prompt",
          "Restate the thesis in fresh words to seal coherence",
          "Introduce a new topic",
          "Ask the reader a question",
        ],
        answer: 1,
        explanation: "Echo reinforces the paragraph's link to the thesis from a fresh angle.",
      },
      {
        question: "How many ideas should one paragraph contain?",
        options: ["At least 3", "Exactly 1 main idea", "As many as possible", "0 - leave it open"],
        answer: 1,
        explanation: "One paragraph = one idea = Coherence Band 7+.",
      },
      {
        question: "Which is the strongest EVIDENCE sentence?",
        options: [
          "Many people agree.",
          "Studies show it is true.",
          "When Helsinki expanded its tram network in 2017, NO₂ fell 22% in three years.",
          "Everyone knows this is correct.",
        ],
        answer: 2,
        explanation: "Specific city + year + measurable outcome = concrete evidence.",
      },
      {
        question: "Why is a long topic sentence with 'and also' a problem?",
        options: [
          "It's too short.",
          "It introduces two ideas, splitting paragraph focus and collapsing Coherence.",
          "It's grammatically wrong.",
          "It is required by Band 5.",
        ],
        answer: 1,
        explanation: "Two ideas = two paragraphs. One paragraph must stay on one focused idea.",
      },
    ],
    cheatSheetPoints: [
      "IDEA = 1 punchy 15-22 word topic sentence",
      "EVIDENCE = real city/year/% - no vague 'many studies'",
      "EXPLAIN = one because/which/so clause",
      "ECHO = restate the thesis in fresh words",
      "One paragraph = one idea (no 'and also')",
      "Add ECHO to EVERY body paragraph for 1 week → Band jump",
    ],
  },

  {
    id: "writing-task1-storytelling-numbers",
    title: "Task 1 - Storytelling With Numbers",
    titleVi: "Task 1 - Kể chuyện bằng con số",
    pillar: "skill-based",
    skill: "writing",
    icon: "📊",
    duration: "16 min",
    level: "intermediate",
    description:
      "Stop describing every data point as 'increased by X'. Treat the chart as a STORY with a hero (the biggest mover), a sidekick (the runner-up) and a twist (an unexpected outlier). Same numbers, much higher band.",
    descriptionVi:
      "Đừng mô tả mọi điểm dữ liệu kiểu 'tăng X'. Coi biểu đồ là CÂU CHUYỆN có nhân vật chính (cú nhảy lớn nhất), phụ (xếp nhì) và twist (số ngoại lệ). Cùng số liệu, band cao hơn nhiều.",
    strategySteps: [
      {
        step: 1,
        title: "Cast the chart in 30 seconds",
        titleVi: "Phân vai biểu đồ trong 30 giây",
        description:
          "Hero = biggest change. Sidekick = second biggest or supporting trend. Twist = the anomaly.",
        descriptionVi:
          "Hero = thay đổi lớn nhất. Sidekick = thay đổi nhì hoặc xu hướng phụ. Twist = số ngoại lệ.",
      },
      {
        step: 2,
        title: "Overview = name the hero and twist",
        titleVi: "Overview = nêu hero và twist",
        description:
          "Two sentences: 'Overall, X dominated the period, while Y bucked the trend.' No numbers here.",
        descriptionVi:
          "Hai câu: 'Tổng quan, X chiếm ưu thế, trong khi Y đi ngược xu hướng.' Không số liệu.",
      },
      {
        step: 3,
        title: "Body 1 = hero's arc with figures",
        titleVi: "Body 1 = vòng cung của hero kèm số",
        description:
          "Open → peak → close, with 3-4 numbers. Use rounded figures and one superlative.",
        descriptionVi:
          "Mở → đỉnh → kết, kèm 3-4 số. Số làm tròn và 1 từ so sánh nhất.",
      },
      {
        step: 4,
        title: "Body 2 = sidekick + twist with contrast",
        titleVi: "Body 2 = sidekick + twist tương phản",
        description:
          "Use 'In contrast,…' / 'However,…' to set up the twist. End with a 'whereas' comparison.",
        descriptionVi:
          "Dùng 'In contrast,…' / 'However,…' để giới thiệu twist. Kết bằng so sánh 'whereas'.",
      },
    ],
    practicalExamples: [
      {
        context: "Line chart: sales of e-books, paperbacks and hardcovers 2010-2023",
        contextVi: "Biểu đồ đường: doanh số e-book, sách bìa mềm và bìa cứng 2010-2023",
        example:
          "Overview: 'Overall, e-book sales surged to become the dominant format, while hardcovers bucked the trend by remaining surprisingly stable.'\nBody 1 (hero): 'E-books rose almost five-fold, climbing from 12 million in 2010 to a peak of 58 million in 2020, before settling at around 54 million by 2023.'\nBody 2 (sidekick + twist): 'In contrast, paperbacks slid steadily from 70 to 42 million. Hardcovers, however, defied the digital shift and ended the period at 21 million - almost identical to their 2010 figure.'",
        explanation: "Hero (e-books) gets the arc, sidekick (paperbacks) the decline, twist (hardcovers) closes the report.",
      },
      {
        context: "Bar chart: percentage of households owning smart devices in 4 countries (2015 vs 2023)",
        contextVi: "Biểu đồ cột: % hộ gia đình sở hữu thiết bị thông minh ở 4 nước (2015 vs 2023)",
        example:
          "Overview: 'Overall, smart device ownership grew in every country, yet Vietnam saw the most dramatic leap, whereas Japan barely moved.'\nBody (twist): 'Most strikingly, Vietnamese households nearly tripled their ownership, jumping from 18% to 53%. By contrast, Japan, already at 71% in 2015, edged up only 4 points, hinting at market saturation.'",
        explanation:
          "'Market saturation' is a Band 8 inference - interpreting the twist, not just describing it.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Listing every number in chronological order",
        mistakeVi: "Liệt kê mọi con số theo thứ tự thời gian",
        why: "Listing = Band 6. Examiners want COMPARISON and STORY, not narration.",
        whyVi: "Liệt kê = Band 6. Giám khảo muốn SO SÁNH và CÂU CHUYỆN, không phải kể chuyện.",
      },
      {
        mistake: "Using identical verbs ('rose, rose, rose')",
        mistakeVi: "Lặp đi lặp lại 1 động từ ('rose, rose, rose')",
        why: "Repetition flatlines Lexical Resource. Rotate: surged, climbed, edged up, soared, plateaued.",
        whyVi: "Lặp từ khiến Lexical Resource phẳng. Xoay: surged, climbed, edged up, soared, plateaued.",
      },
    ],
    goldenSecret:
      "Spend ONE minute casting hero/sidekick/twist BEFORE you write. That single planning minute is worth a full half-band in Task 1.",
    goldenSecretVi:
      "Dành MỘT phút phân vai hero/sidekick/twist TRƯỚC khi viết. Phút lên kế hoạch đó đáng giá nửa band Task 1.",
    vocabHighlights: [
      { word: "buck the trend", definition: "go against the general direction", definitionVi: "đi ngược xu hướng", example: "Hardcovers bucked the trend.", band: "8.0" },
      { word: "five-fold", definition: "five times as much", definitionVi: "gấp 5 lần", example: "Sales rose almost five-fold.", band: "7.5" },
      { word: "edge up", definition: "rise slightly", definitionVi: "tăng nhẹ", example: "Prices edged up 2%.", band: "7.0" },
      { word: "plateau", definition: "level off", definitionVi: "chững lại", example: "Growth plateaued in 2021.", band: "7.5" },
      { word: "market saturation", definition: "no room left to grow", definitionVi: "bão hòa thị trường", example: "Smartphone sales hit market saturation.", band: "8.0" },
      { word: "dramatic leap", definition: "huge increase", definitionVi: "bước nhảy ngoạn mục", example: "Vietnam saw a dramatic leap.", band: "7.5" },
      { word: "defy", definition: "go against", definitionVi: "bất chấp, đi ngược", example: "Hardcovers defied digital trends.", band: "8.0" },
    ],
    quiz: [
      {
        question: "What does the 'hero / sidekick / twist' casting mean?",
        options: [
          "Three different essays",
          "Biggest mover / second mover / outlier - used to structure the report",
          "Three writing styles",
          "Three different fonts",
        ],
        answer: 1,
        explanation: "Casting roles in 30 seconds turns numbers into a structured story.",
      },
      {
        question: "Should the overview include exact numbers?",
        options: ["Yes always", "No - keep numbers for body paragraphs", "Only in line charts", "Only percentages"],
        answer: 1,
        explanation: "Overview names the biggest trends; figures go in body paragraphs.",
      },
      {
        question: "Why is 'rose, rose, rose' a problem?",
        options: [
          "Wrong tense",
          "Repetition flatlines Lexical Resource",
          "Wrong vocabulary",
          "It is grammatically incorrect",
        ],
        answer: 1,
        explanation: "Rotate verbs: surged, climbed, edged up, soared, plateaued.",
      },
      {
        question: "Which is a 'twist' interpretation, not just description?",
        options: [
          "Sales went up.",
          "Japan edged up only 4 points, hinting at market saturation.",
          "Numbers rose every year.",
          "The chart shows growth.",
        ],
        answer: 1,
        explanation: "Adding 'hinting at market saturation' interprets the data - Band 8 move.",
      },
      {
        question: "What is the recommended planning time before writing?",
        options: ["0 minutes - just write", "1 minute to cast roles", "5 minutes outlining each number", "10 minutes drafting in your head"],
        answer: 1,
        explanation: "One minute of role casting saves time and lifts the band by half.",
      },
      {
        question: "Which is the cleanest 'sidekick + twist' sentence?",
        options: [
          "In contrast, paperbacks slid steadily from 70 to 42 million. Hardcovers, however, defied the digital shift.",
          "Many things changed in the chart.",
          "The numbers were going up and down.",
          "Hardcovers were also there.",
        ],
        answer: 0,
        explanation: "Clear contrast linker + concrete numbers + interpretation of the twist.",
      },
    ],
    cheatSheetPoints: [
      "Cast hero (biggest mover), sidekick (runner-up), twist (outlier)",
      "Overview = name hero + twist, NO numbers",
      "Body 1 = hero arc with 3-4 figures + 1 superlative",
      "Body 2 = sidekick decline + twist contrast",
      "Rotate verbs: surged, climbed, edged up, plateaued, defied",
      "Spend 1 minute planning - worth half a band",
    ],
  },

  {
    id: "writing-task2-vn-learner-traps",
    title: "Task 2 - 7 Traps Vietnamese Learners Fall Into",
    titleVi: "Task 2 - 7 cái bẫy người học Việt hay mắc",
    pillar: "skill-based",
    skill: "writing",
    icon: "🪤",
    duration: "20 min",
    level: "intermediate",
    description:
      "A diagnostic lecture: the seven most common Band 6.0 ceilings for Vietnamese learners - direct translation, overusing 'in my opinion', plural mistakes, missing articles, and more. Each trap comes with the upgrade.",
    descriptionVi:
      "Bài giảng chẩn đoán: 7 trần Band 6.0 phổ biến nhất của người Việt - dịch trực tiếp, lạm dụng 'in my opinion', sai số nhiều, thiếu mạo từ, và hơn thế. Mỗi bẫy có sẵn cách nâng cấp.",
    strategySteps: [
      {
        step: 1,
        title: "Trap 1 - Direct translation from Vietnamese",
        titleVi: "Bẫy 1 - Dịch trực tiếp từ tiếng Việt",
        description:
          "'Tôi nghĩ rằng…' → 'I think that…' lặp lại 5 lần. Upgrade: 'From my perspective,…', 'My view is that,…', 'It seems to me that,…'.",
        descriptionVi:
          "'Tôi nghĩ rằng…' → 'I think that…' lặp 5 lần. Nâng cấp: 'From my perspective,…', 'My view is that,…', 'It seems to me that,…'.",
      },
      {
        step: 2,
        title: "Trap 2 - Missing articles (a/an/the)",
        titleVi: "Bẫy 2 - Thiếu mạo từ (a/an/the)",
        description:
          "Vietnamese has no articles. Audit every noun: 'Government should…' → 'The government should…'.",
        descriptionVi:
          "Tiếng Việt không có mạo từ. Soát mọi danh từ: 'Government should…' → 'The government should…'.",
      },
      {
        step: 3,
        title: "Trap 3 - Plural slips with uncountable nouns",
        titleVi: "Bẫy 3 - Sai số nhiều ở danh từ không đếm được",
        description:
          "'Informations', 'advices', 'researches', 'equipments' - all WRONG. Memorise the top 10 uncountables.",
        descriptionVi:
          "'Informations', 'advices', 'researches', 'equipments' - đều SAI. Học thuộc top 10 từ không đếm được.",
      },
      {
        step: 4,
        title: "Trap 4 - 'Very' and 'so' instead of strong adjectives",
        titleVi: "Bẫy 4 - 'Very/so' thay vì tính từ mạnh",
        description:
          "'Very important' → 'crucial'. 'Very bad' → 'detrimental'. 'So big' → 'substantial'.",
        descriptionVi:
          "'Very important' → 'crucial'. 'Very bad' → 'detrimental'. 'So big' → 'substantial'.",
      },
      {
        step: 5,
        title: "Trap 5 - Robotic 'Firstly, Secondly, Thirdly'",
        titleVi: "Bẫy 5 - 'Firstly/Secondly/Thirdly' máy móc",
        description:
          "Replace with 'To begin with,…', 'Equally important,…', 'Most crucially,…'.",
        descriptionVi:
          "Thay bằng 'To begin with,…', 'Equally important,…', 'Most crucially,…'.",
      },
      {
        step: 6,
        title: "Trap 6 - Subject-verb agreement under long noun phrases",
        titleVi: "Bẫy 6 - Hợp số chủ-động khi danh từ dài",
        description:
          "'The number of students are…' → 'The number of students IS…'. Always identify the head noun.",
        descriptionVi:
          "'The number of students are…' → 'The number of students IS…'. Luôn xác định danh từ trung tâm.",
      },
      {
        step: 7,
        title: "Trap 7 - Word-by-word collocation",
        titleVi: "Bẫy 7 - Dịch collocation từng từ",
        description:
          "'Make a research' → 'conduct research'. 'Take a decision' → 'make a decision'. Learn 20 academic collocations.",
        descriptionVi:
          "'Make a research' → 'conduct research'. 'Take a decision' → 'make a decision'. Học 20 collocation học thuật.",
      },
    ],
    practicalExamples: [
      {
        context: "Before-after sentence rewrite",
        contextVi: "Sửa câu trước-sau",
        example:
          "BEFORE (Band 6): 'In my opinion, government should give more informations to people about effect of pollution.'\nAFTER (Band 7.5): 'From my perspective, the government should provide more information about the effects of pollution.'",
        explanation: "Three upgrades: opener, article, uncountable noun. Same idea, one full band higher.",
      },
      {
        context: "Common collocation upgrade",
        contextVi: "Nâng cấp collocation phổ biến",
        example:
          "BEFORE: 'We need to make researches about this problem.'\nAFTER: 'Further research must be conducted into this issue.'",
        explanation: "'Conduct research' is the academic collocation, plus passive voice adds register.",
      },
      {
        context: "Linker upgrade",
        contextVi: "Nâng cấp từ nối",
        example:
          "BEFORE: 'Firstly, pollution is bad. Secondly, traffic is bad. Thirdly, noise is bad.'\nAFTER: 'To begin with, air pollution is harmful. Equally important is the strain placed on public transport. Most crucially, noise pollution erodes quality of life.'",
        explanation: "Linker variety + topic precision lifts both Coherence and Lexical Resource.",
      },
    ],
    mistakesToAvoid: [
      {
        mistake: "Editing only at the end (no time left)",
        mistakeVi: "Chỉ sửa ở cuối (không kịp giờ)",
        why: "By the time you finish drafting, all 7 traps are already in your essay. Audit AS you write.",
        whyVi: "Lúc viết xong, cả 7 bẫy đã nằm trong bài. Soát NGAY khi viết.",
      },
      {
        mistake: "Memorising fixed phrases word-for-word",
        mistakeVi: "Học thuộc cụm cố định nguyên văn",
        why: "Examiners detect memorisation. Learn the PATTERN, then adapt to the topic.",
        whyVi: "Giám khảo phát hiện học vẹt. Học MẪU, sau đó tùy biến theo đề.",
      },
    ],
    goldenSecret:
      "Print these 7 traps and stick them on your wall. Tick one off per practice essay until you've cleared all 7 - usually 2 weeks. Your band will jump from 6.0 to 7.0 just by removing leaks.",
    goldenSecretVi:
      "In 7 cái bẫy này và dán lên tường. Tick từng bẫy sau mỗi bài luyện tới khi loại xong cả 7 - thường 2 tuần. Band sẽ nhảy từ 6.0 lên 7.0 chỉ bằng việc bịt lỗ rò.",
    vocabHighlights: [
      { word: "from my perspective", definition: "stating opinion academically", definitionVi: "theo quan điểm của tôi", example: "From my perspective, the policy is flawed.", band: "7.0" },
      { word: "crucial", definition: "extremely important", definitionVi: "thiết yếu", example: "Public transport is crucial.", band: "7.0" },
      { word: "detrimental", definition: "harmful", definitionVi: "có hại", example: "Smoking is detrimental to health.", band: "7.5" },
      { word: "substantial", definition: "large in size or importance", definitionVi: "đáng kể", example: "There is substantial evidence.", band: "7.0" },
      { word: "conduct research", definition: "do research", definitionVi: "tiến hành nghiên cứu", example: "Researchers conduct studies on…", band: "7.0" },
      { word: "the strain on", definition: "pressure put on", definitionVi: "áp lực đặt lên", example: "The strain on public transport is rising.", band: "7.5" },
      { word: "erode quality of life", definition: "wear down living standards", definitionVi: "bào mòn chất lượng sống", example: "Noise pollution erodes quality of life.", band: "8.0" },
    ],
    quiz: [
      {
        question: "Which is the upgrade for 'very important'?",
        options: ["So important", "Really important", "Crucial", "Very very important"],
        answer: 2,
        explanation: "'Crucial' is a strong, scoring single-word replacement.",
      },
      {
        question: "Which of these is the correct uncountable form?",
        options: ["Informations", "Advices", "Equipments", "Research"],
        answer: 3,
        explanation: "'Research' is uncountable - no -s. Same with information, advice, equipment.",
      },
      {
        question: "Fix this sentence: 'The number of students are increasing.'",
        options: [
          "The number of students is increasing.",
          "The numbers of students are increasing.",
          "Number of students are increasing.",
          "The student number are increasing.",
        ],
        answer: 0,
        explanation: "'The number' is the singular head noun → 'is'.",
      },
      {
        question: "Which collocation is correct?",
        options: ["Make a research", "Do a research", "Take a research", "Conduct research"],
        answer: 3,
        explanation: "'Conduct research' is the academic collocation.",
      },
      {
        question: "Why must you audit AS you write, not only at the end?",
        options: [
          "Examiners watch you",
          "Because you'll run out of time and the 7 traps will all sit in your essay",
          "Because the keyboard is slow",
          "Because rules require it",
        ],
        answer: 1,
        explanation: "Real exam timing rarely leaves more than 2 minutes for editing.",
      },
      {
        question: "Which is the best linker variety set?",
        options: [
          "Firstly, Secondly, Thirdly",
          "To begin with, Equally important, Most crucially",
          "1, 2, 3",
          "Also, also, also",
        ],
        answer: 1,
        explanation: "Variety + nuance = Coherence Band 7+.",
      },
    ],
    cheatSheetPoints: [
      "Audit articles (a/an/the) on EVERY noun",
      "Uncountables: information, advice, research, equipment (no -s)",
      "Replace 'very + adj' with one strong word (crucial, detrimental)",
      "Rotate linkers - never 'Firstly/Secondly/Thirdly' twice",
      "Use 'conduct research', 'make a decision', 'pose a threat'",
      "Identify the head noun for subject-verb agreement",
      "Tick off one trap per practice essay - clear all 7 in 2 weeks",
    ],
  },
];

export { writingExpansion10 };

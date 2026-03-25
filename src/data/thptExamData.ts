// National High School Graduation Exam data - extracted from PDF practice tests
export interface ExamQuestion {
  id: number;
  text: string;
  options: string[];
  correct: number;
  category: string;
  explanation: string;
}

export interface ExamPassage {
  id: string;
  title: string;
  text: string;
  questionRange: [number, number];
}

export interface ThptExam {
  id: string;
  title: string;
  titleEn: string;
  code: string;
  duration: number;
  totalQuestions: number;
  passages: ExamPassage[];
  questions: ExamQuestion[];
}

export const categoryLabels: Record<string, { vi: string; en: string }> = {
  "word-form": { vi: "Từ loại", en: "Word Form" },
  "connector": { vi: "Liên từ", en: "Connectors" },
  "preposition": { vi: "Giới từ", en: "Prepositions" },
  "collocation": { vi: "Cụm từ cố định", en: "Collocations" },
  "grammar": { vi: "Ngữ pháp", en: "Grammar" },
  "vocabulary": { vi: "Từ vựng", en: "Vocabulary" },
  "phrasal-verb": { vi: "Cụm động từ", en: "Phrasal Verbs" },
  "adjective-order": { vi: "Thứ tự tính từ", en: "Adjective Order" },
  "arrangement": { vi: "Sắp xếp câu", en: "Sentence Arrangement" },
  "reading-paraphrase": { vi: "Diễn đạt lại", en: "Paraphrase" },
  "reading-detail": { vi: "Chi tiết", en: "Detail" },
  "reading-inference": { vi: "Suy luận", en: "Inference" },
  "reading-summary": { vi: "Tóm tắt", en: "Summary" },
  "reading-insertion": { vi: "Chèn câu", en: "Insertion" },
  "reference": { vi: "Từ thay thế", en: "Reference" },
};

export const thptExams: ThptExam[] = [
  {
    "id": "thpt-01",
    "title": "Đề thi thử số 01",
    "titleEn": "Practice Test 01",
    "code": "1126",
    "duration": 50,
    "totalQuestions": 40,
    "passages": [
      {
        "id": "p1-1",
        "title": "The Phenomenon of Social Media Addiction",
        "text": "Contemporary research has revealed disturbing patterns regarding digital dependency. The (1) __________ concerning nature of social media addiction has prompted psychologists to investigate its mechanisms. Social media platforms trigger dopamine releases, (2) __________ creating powerful psychological dependencies.\n\nThis biological response compels individuals (3) __________ compulsive checking behaviors. Therapists recommend individuals should (4) __________ decisive action. They advocate for applications (5) __________ screen time. Creating environments using natural (6) __________ can enhance recovery.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "p1-2",
        "title": "The Renaissance of Artisanal Craftsmanship",
        "text": "Consumers are beginning to (7) __________ the intrinsic value of handcrafted goods. Craftspeople invest a tremendous (8) __________ of time mastering techniques. When they are (9) __________ these methods, artisans discover profound connections. Different artisans specialize in (10) __________ techniques. They can (11) __________ knowledge immediately. (12) __________ individuals seek mass-produced alternatives.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "p1-3",
        "title": "Cryptocurrency & Financial Systems",
        "text": "Cryptocurrency challenges traditional institutions. (18) ___. Bitcoin demonstrated blockchain's potential. (19) ___. (20) ___, governments develop regulatory frameworks. Environmental concerns exist because (21) ___. Despite challenges, adoption expands. (22) ___.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "p1-4",
        "title": "Remote Work Revolution",
        "text": "The COVID-19 pandemic transformed workplace dynamics. What initially began as an emergency measure has evolved into a permanent shift in employment practices.\n\nRemote work offers numerous advantages. Workers enjoy increased flexibility, eliminated commuting time, and improved work-life balance. Companies benefit from reduced overhead costs.\n\nCommunication barriers represent the most significant obstacle. Face-to-face interactions facilitate natural collaboration that virtual meetings struggle to replicate.\n\nTechnology plays a crucial role. Nevertheless, not all roles are suitable, particularly those requiring physical presence.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "p1-5",
        "title": "Artificial Intelligence Ethics",
        "text": "[I] AI development has reached unprecedented sophistication levels. [II] As AI systems become increasingly autonomous, society must establish ethical frameworks. [III] The stakes could not be higher. [IV]\n\nLeading companies invest billions while grappling with moral implications. These organizations face pressure. Defining 'humanity's best interests' proves complex across diverse cultural values, economic systems, and philosophical perspectives.\n\nAlgorithmic bias is a pressing concern. AI recruitment tools have demonstrated gender bias, while facial recognition systems show racial discrimination. These biases can have devastating consequences.\n\nPrivacy concerns compound these challenges. Tech giants collect unprecedented quantities of user information, creating detailed behavioral profiles that can predict and influence human decisions.",
        "questionRange": [
          31,
          40
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "text": "Question 1",
        "options": [
          "increasingly",
          "increase",
          "increased",
          "increasing"
        ],
        "correct": 0,
        "category": "word-form",
        "explanation": "'Increasingly' là trạng từ bổ nghĩa cho tính từ 'concerning'."
      },
      {
        "id": 2,
        "text": "Question 2",
        "options": [
          "in contrast to",
          "thereby",
          "nevertheless",
          "furthermore"
        ],
        "correct": 1,
        "category": "connector",
        "explanation": "'Thereby' = nhờ đó, diễn tả kết quả."
      },
      {
        "id": 3,
        "text": "Question 3",
        "options": [
          "with",
          "for",
          "to",
          "in"
        ],
        "correct": 2,
        "category": "preposition",
        "explanation": "'Compel someone TO do something'."
      },
      {
        "id": 4,
        "text": "Question 4",
        "options": [
          "make",
          "take",
          "do",
          "have"
        ],
        "correct": 1,
        "category": "collocation",
        "explanation": "'Take action' là collocation chuẩn."
      },
      {
        "id": 5,
        "text": "Question 5",
        "options": [
          "monitor",
          "monitoring",
          "to monitor",
          "monitored"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing trong mệnh đề quan hệ rút gọn."
      },
      {
        "id": 6,
        "text": "Question 6",
        "options": [
          "stimuli",
          "responses",
          "reactions",
          "influences"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Natural stimuli' đối lập với 'artificial stimulation'."
      },
      {
        "id": 7,
        "text": "Question 7",
        "options": [
          "comprehend",
          "perceive",
          "acknowledge",
          "recognize"
        ],
        "correct": 3,
        "category": "vocabulary",
        "explanation": "'Recognize the value' = nhận ra giá trị."
      },
      {
        "id": 8,
        "text": "Question 8",
        "options": [
          "amount",
          "number",
          "quantity",
          "volume"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Amount of time' - dùng với danh từ không đếm được."
      },
      {
        "id": 9,
        "text": "Question 9",
        "options": [
          "to master",
          "mastering",
          "mastered",
          "master"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "'When they are mastering' - V-ing sau 'are'."
      },
      {
        "id": 10,
        "text": "Question 10",
        "options": [
          "traditional different ancient",
          "different ancient traditional",
          "ancient traditional different",
          "traditional ancient different"
        ],
        "correct": 1,
        "category": "adjective-order",
        "explanation": "Thứ tự: opinion (different) → age (ancient) → type (traditional)."
      },
      {
        "id": 11,
        "text": "Question 11",
        "options": [
          "pick up",
          "take over",
          "put forward",
          "bring about"
        ],
        "correct": 0,
        "category": "phrasal-verb",
        "explanation": "'Pick up' = tiếp thu, học được."
      },
      {
        "id": 12,
        "text": "Question 12",
        "options": [
          "Few",
          "A few",
          "Little",
          "A little"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'Few' mang nghĩa phủ định: rất ít người tìm hàng sản xuất đại trà."
      },
      {
        "id": 13,
        "text": "Q13: Arrange email to Professor Williams.",
        "options": [
          "a–b–c–d–e",
          "b–a–d–c–e",
          "a–c–b–e–d",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "b (cảm ơn) → a (khó khăn) → d (bối rối trước đó) → c (giải thích giúp hiểu) → e (hẹn gặp)."
      },
      {
        "id": 14,
        "text": "Q14: Arrange urban planning paragraph.",
        "options": [
          "a–b–c–d–e",
          "b–d–a–c–e",
          "a–c–b–e–d",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "b (cities face challenges) → d (as populations grow) → a (planners must integrate) → c (furthermore, transport) → e (innovative solutions)."
      },
      {
        "id": 15,
        "text": "Q15: Arrange AI healthcare dialogue.",
        "options": [
          "a–b–c",
          "b–a–c",
          "c–b–a",
          "b–c–a"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "b (Elena introduces research) → a (Marcus asks about ethics) → c (Elena agrees)."
      },
      {
        "id": 16,
        "text": "Q16: Arrange personalized medicine passage.",
        "options": [
          "a–b–c–d–e",
          "c–a–b–e–d",
          "a–c–b–e–d",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "c (traditional approaches) → a (revolutionary companies) → b (innovations promise) → e (if successful) → d (regulatory lag)."
      },
      {
        "id": 17,
        "text": "Q17: Arrange climate change dialogue.",
        "options": [
          "a–b–c–d–e",
          "a–d–e–b–c",
          "d–a–b–e–c",
          "a–b–d–c–e"
        ],
        "correct": 3,
        "category": "arrangement",
        "explanation": "a (problem) → b (agree) → d (ask measures) → c (cooperation) → e (specific steps)."
      },
      {
        "id": 18,
        "text": "Q18: Blockchain technology sentence.",
        "options": [
          "Creating through algorithms, blockchain ensures security",
          "Blockchain, which is created through algorithms, ensures security",
          "The creation through algorithms have ensured security",
          "Having been created through algorithms, blockchain ensure security"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "Mệnh đề quan hệ đúng ngữ pháp, 'ensures' chia số ít."
      },
      {
        "id": 19,
        "text": "Q19: Bitcoin profits sentence.",
        "options": [
          "Early investors who purchase have realized profits",
          "Bitcoin has generated profits for investors who purchased it",
          "Profits have realized by investors who purchasing",
          "The investor purchasing has realized profits"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "'Has generated' + 'who purchased' đúng ngữ pháp."
      },
      {
        "id": 20,
        "text": "Q20: Transition phrase.",
        "options": [
          "Recognized these concerns",
          "In response to these concerns",
          "These concerns having been recognized",
          "Having recognized these concerns"
        ],
        "correct": 3,
        "category": "grammar",
        "explanation": "'Having recognized..., governments are developing...' - phân từ hoàn thành đúng."
      },
      {
        "id": 21,
        "text": "Q21: Noun clause after 'that'.",
        "options": [
          "the consumption of enormous electricity during mining",
          "it was consumed enormous electricity during mining",
          "it will consume enormous electricity during mining",
          "the consumption of enormous electricity occurs during mining"
        ],
        "correct": 3,
        "category": "grammar",
        "explanation": "'due to the fact that + S + V': câu D có chủ-vị đầy đủ."
      },
      {
        "id": 22,
        "text": "Q22: Concluding sentence.",
        "options": [
          "The future of finance will likely be shaped by cryptocurrency evolution",
          "Cryptocurrency evolution will hardly shape finance",
          "The future of finance will shape by cryptocurrency",
          "Shaping finance, cryptocurrency evolution are hardly"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Passive voice đúng: 'will be shaped by'. Nghĩa kết luận tích cực."
      },
      {
        "id": 23,
        "text": "Which best paraphrases the underlined sentence in paragraph 1?",
        "options": [
          "Emergency measures temporarily changed work.",
          "What started as a crisis response became a lasting transformation.",
          "Employment practices changed permanently because of emergency measures.",
          "The initial response evolved into permanent practices."
        ],
        "correct": 1,
        "category": "reading-paraphrase",
        "explanation": "Câu B diễn đạt chính xác nhất."
      },
      {
        "id": 24,
        "text": "Which is NOT a benefit of remote work for employees?",
        "options": [
          "greater flexibility",
          "no commuting",
          "better work-life balance",
          "increased salary"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "Bài KHÔNG đề cập tăng lương."
      },
      {
        "id": 25,
        "text": "'facilitate' can be replaced by:",
        "options": [
          "enable",
          "prevent",
          "complicate",
          "require"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Facilitate' ≈ 'enable' = cho phép, tạo điều kiện."
      },
      {
        "id": 26,
        "text": "'struggle' is opposite to:",
        "options": [
          "attempt",
          "succeed",
          "compete",
          "manage"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Struggle' ↔ 'Succeed'."
      },
      {
        "id": 27,
        "text": "'those' refers to:",
        "options": [
          "companies",
          "roles",
          "systems",
          "teams"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'those requiring physical presence' = 'roles'."
      },
      {
        "id": 28,
        "text": "Which is TRUE?",
        "options": [
          "All jobs suit remote work.",
          "Companies universally prefer remote work.",
          "Virtual meetings fully replace face-to-face.",
          "Communication challenges pose significant difficulties."
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Communication barriers represent the most significant obstacle.'"
      },
      {
        "id": 29,
        "text": "Which paragraph discusses technology solutions?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "Đoạn 4: collaboration platforms, cloud storage, VR meeting spaces."
      },
      {
        "id": 30,
        "text": "Which paragraph mentions the pandemic?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 0,
        "category": "reading-detail",
        "explanation": "Đoạn 1: 'The COVID-19 pandemic fundamentally transformed...'"
      },
      {
        "id": 31,
        "text": "Where does this sentence best fit?",
        "options": [
          "[I]",
          "[II]",
          "[III]",
          "[IV]"
        ],
        "correct": 3,
        "category": "reading-insertion",
        "explanation": "[IV] sau 'The stakes could not be higher' - tổng kết ý."
      },
      {
        "id": 32,
        "text": "Which is NOT a complicating factor?",
        "options": [
          "cultural values",
          "economic systems",
          "technological rates",
          "philosophical perspectives"
        ],
        "correct": 2,
        "category": "reading-detail",
        "explanation": "KHÔNG đề cập 'technological advancement rates'."
      },
      {
        "id": 33,
        "text": "Which best summarises paragraph 3?",
        "options": [
          "Bias can be resolved through better data.",
          "Algorithmic bias perpetuates prejudices with devastating consequences.",
          "Bias requires governmental intervention.",
          "Bias rarely impacts other applications."
        ],
        "correct": 1,
        "category": "reading-summary",
        "explanation": "Bias → perpetuates prejudices → devastating consequences."
      },
      {
        "id": 34,
        "text": "'these' in paragraph 2 refers to:",
        "options": [
          "governments",
          "organizations",
          "implications",
          "communities"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'These organizations' = 'Leading technology companies'."
      },
      {
        "id": 35,
        "text": "'devastating' is opposite to:",
        "options": [
          "beneficial",
          "significant",
          "obvious",
          "immediate"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Devastating' ↔ 'Beneficial'."
      },
      {
        "id": 36,
        "text": "Which best paraphrases paragraph 4 sentence?",
        "options": [
          "Tech companies gather data to predict and shape behavior.",
          "Companies collect data to predict decisions accurately.",
          "Profiles rarely influence decision-making.",
          "Profiles cannot reliably predict behavior."
        ],
        "correct": 0,
        "category": "reading-paraphrase",
        "explanation": "Gather data → profiles → predict AND influence behavior."
      },
      {
        "id": 37,
        "text": "'compound' mostly means:",
        "options": [
          "simplify",
          "worsen",
          "resolve",
          "analyze"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Compound' = làm trầm trọng thêm ≈ 'worsen'."
      },
      {
        "id": 38,
        "text": "Which is TRUE?",
        "options": [
          "AI eliminates prejudices.",
          "Companies prioritize ethics over profit.",
          "Facial recognition and recruitment tools show discrimination.",
          "Privacy concerns are theoretical."
        ],
        "correct": 2,
        "category": "reading-detail",
        "explanation": "'AI recruitment tools have demonstrated gender bias, facial recognition shows racial discrimination.'"
      },
      {
        "id": 39,
        "text": "What can be inferred?",
        "options": [
          "Resolving AI dilemmas requires balancing competing interests.",
          "Historical data is most reliable for unbiased AI.",
          "Democracy is incompatible with AI.",
          "Data collection is universally beneficial."
        ],
        "correct": 0,
        "category": "reading-inference",
        "explanation": "Cần cân bằng innovation vs ethics, benefits vs risks."
      },
      {
        "id": 40,
        "text": "Which best summarises the passage?",
        "options": [
          "AI raises ethical questions about bias and privacy with pressure to balance innovation and morality.",
          "AI shows bias while privacy threatens democracy.",
          "Companies invest while governments demand frameworks.",
          "AI ethics focuses on bias and privacy with tech giants."
        ],
        "correct": 0,
        "category": "reading-summary",
        "explanation": "Câu A toàn diện nhất."
      }
    ]
  },
  {
    "id": "thpt-02",
    "title": "Đề thi thử số 02",
    "titleEn": "Practice Test 02",
    "code": "1126",
    "duration": 50,
    "totalQuestions": 40,
    "passages": [
      {
        "id": "thpt-02-p1",
        "title": "Quantum Computing",
        "text": "Passage about Quantum Computing.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-02-p2",
        "title": "Deep Space Exploration",
        "text": "Passage about Deep Space Exploration.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-02-p3",
        "title": "Neural Interface Technology",
        "text": "Passage about Neural Interface Technology.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-02-p4",
        "title": "Vertical Farming Systems",
        "text": "Passage about Vertical Farming Systems.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-02-p5",
        "title": "Cognitive Enhancement Technology",
        "text": "Passage about Cognitive Enhancement Technology.",
        "questionRange": [
          31,
          40
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "text": "Question 1",
        "options": [
          "profoundity",
          "profound",
          "profoundly",
          "profounding"
        ],
        "correct": 2,
        "category": "word-form",
        "explanation": "Chọn từ loại đúng (tính từ/trạng từ/danh từ) phù hợp với vị trí trong câu."
      },
      {
        "id": 2,
        "text": "Question 2",
        "options": [
          "in addition to",
          "consequently",
          "nonetheless",
          "moreover"
        ],
        "correct": 1,
        "category": "connector",
        "explanation": "Chọn từ nối phù hợp với logic ngữ cảnh."
      },
      {
        "id": 3,
        "text": "Question 3",
        "options": [
          "toward",
          "to",
          "with",
          "into"
        ],
        "correct": 1,
        "category": "preposition",
        "explanation": "Cấu trúc động từ + giới từ 'to' phù hợp."
      },
      {
        "id": 4,
        "text": "Question 4",
        "options": [
          "make",
          "take",
          "do",
          "have"
        ],
        "correct": 1,
        "category": "collocation",
        "explanation": "'Take action/measures' là collocation chuẩn."
      },
      {
        "id": 5,
        "text": "Question 5",
        "options": [
          "monitor",
          "monitoring",
          "to monitor",
          "monitored"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing trong mệnh đề quan hệ rút gọn."
      },
      {
        "id": 6,
        "text": "Question 6",
        "options": [
          "approaches",
          "methodologies",
          "curricula",
          "techniques"
        ],
        "correct": 2,
        "category": "vocabulary",
        "explanation": "Chọn danh từ phù hợp với ngữ cảnh."
      },
      {
        "id": 7,
        "text": "Question 7",
        "options": [
          "appreciate",
          "acknowledge",
          "perceive",
          "recognize"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "Chọn động từ phù hợp với ngữ cảnh nhận thức."
      },
      {
        "id": 8,
        "text": "Question 8",
        "options": [
          "amount",
          "number",
          "quantity",
          "volume"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Amount' dùng với danh từ không đếm được."
      },
      {
        "id": 9,
        "text": "Question 9",
        "options": [
          "to operate",
          "operating",
          "operated",
          "operate"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing sau 'are' trong thì tiếp diễn."
      },
      {
        "id": 10,
        "text": "Question 10",
        "options": [
          "cutting-edge specialized ambitious",
          "specialized ambitious cutting-edge",
          "ambitious cutting-edge specialized",
          "ambitious specialized cutting-edge"
        ],
        "correct": 2,
        "category": "adjective-order",
        "explanation": "Thứ tự tính từ: opinion → quality → type."
      },
      {
        "id": 11,
        "text": "Question 11",
        "options": [
          "pick up",
          "take over",
          "put forward",
          "bring about"
        ],
        "correct": 0,
        "category": "phrasal-verb",
        "explanation": "'Pick up' = tiếp thu, học được nhanh chóng."
      },
      {
        "id": 12,
        "text": "Question 12",
        "options": [
          "Few",
          "A few",
          "Little",
          "A little"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'Few' mang nghĩa phủ định với danh từ đếm được."
      },
      {
        "id": 13,
        "text": "Q13: Arrange the formal letter.",
        "options": [
          "a–b–c–d–e",
          "b–a–d–c–e",
          "a–c–b–d–e",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Thứ tự: cảm ơn → vấn đề → chi tiết → giải thích → kết thúc."
      },
      {
        "id": 14,
        "text": "Q14: Arrange the academic paragraph.",
        "options": [
          "a–b–c–d–e",
          "b–d–a–c–e",
          "b–a–c–e–d",
          "d–b–a–c–e"
        ],
        "correct": 0,
        "category": "arrangement",
        "explanation": "Thứ tự logic của đoạn văn học thuật."
      },
      {
        "id": 15,
        "text": "Q15: Arrange the dialogue.",
        "options": [
          "a–b–c",
          "b–a–c",
          "c–b–a",
          "b–c–a"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Giới thiệu → hỏi → trả lời."
      },
      {
        "id": 16,
        "text": "Q16: Arrange the passage.",
        "options": [
          "a–b–c–d–e",
          "c–a–b–e–d",
          "a–c–b–e–d",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Truyền thống → đổi mới → hứa hẹn → nếu thành công → thách thức."
      },
      {
        "id": 17,
        "text": "Q17: Arrange the debate.",
        "options": [
          "a–b–c–d–e",
          "a–d–e–b–c",
          "d–a–b–e–c",
          "a–b–d–c–e"
        ],
        "correct": 3,
        "category": "arrangement",
        "explanation": "Nêu vấn đề → đồng ý → hỏi giải pháp → nhấn mạnh → đề xuất."
      },
      {
        "id": 18,
        "text": "Q18: Choose correct grammar.",
        "options": [
          "Developed through research, this framework provides solutions",
          "This framework, which developing, provides solutions",
          "Having this framework developed, solutions were provided",
          "Research developing, this framework provides solutions"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Phân từ quá khứ rút gọn đúng ngữ pháp."
      },
      {
        "id": 19,
        "text": "Q19: Choose correct sentence.",
        "options": [
          "Researchers who conducted experiments have published findings",
          "Experiments having conducted by researchers published findings",
          "Findings have been conducted by researchers who participating",
          "The researchers conducting experiments has published findings"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Mệnh đề quan hệ + thì hoàn thành đúng."
      },
      {
        "id": 20,
        "text": "Q20: Choose correct transition.",
        "options": [
          "In response to these concerns",
          "Responded to these concerns",
          "These concerns having been responded",
          "Having responded to these concerns"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'In response to...' - cụm giới từ phù hợp."
      },
      {
        "id": 21,
        "text": "Q21: Choose correct clause.",
        "options": [
          "the rapid advancement creates new challenges",
          "technology rapidly advancing creates challenges",
          "it will rapidly advance creating challenges",
          "the rapidly technology creates challenges"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Cấu trúc chủ-vị đúng: 'the rapid advancement... creates...'"
      },
      {
        "id": 22,
        "text": "Q22: Choose best conclusion.",
        "options": [
          "Future developments will undoubtedly reshape our understanding",
          "Our understanding will hardly be reshaped",
          "Future developments reshaping, the subject undoubtedly",
          "It is undoubtedly that developments will reshape"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Câu A đúng ngữ pháp, nghĩa kết luận phù hợp."
      },
      {
        "id": 23,
        "text": "Which best paraphrases the underlined sentence?",
        "options": [
          "Initial investigations produced temporary results.",
          "What began as preliminary research became a comprehensive field.",
          "Research changed permanently due to experiments.",
          "Preliminary research evolved into permanent methodology."
        ],
        "correct": 1,
        "category": "reading-paraphrase",
        "explanation": "Câu B diễn đạt chính xác nhất."
      },
      {
        "id": 24,
        "text": "Which is NOT mentioned as a challenge?",
        "options": [
          "Funding limitations",
          "Ethical concerns",
          "Regulatory barriers",
          "Language barriers"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Language barriers' không được đề cập."
      },
      {
        "id": 25,
        "text": "'sophisticated' can be replaced by:",
        "options": [
          "complex",
          "simple",
          "basic",
          "ordinary"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Sophisticated' ≈ 'complex' = phức tạp, tinh vi."
      },
      {
        "id": 26,
        "text": "'enhance' is opposite to:",
        "options": [
          "improve",
          "diminish",
          "maintain",
          "stabilize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Enhance' ↔ 'Diminish'."
      },
      {
        "id": 27,
        "text": "'which' refers to:",
        "options": [
          "methods",
          "systems",
          "challenges",
          "approaches"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'Systems which enable...'"
      },
      {
        "id": 28,
        "text": "Which is TRUE?",
        "options": [
          "All methodologies produce identical results.",
          "Different approaches yield varying effectiveness.",
          "Traditional methods are always superior.",
          "All problems have been solved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Bài nêu nhiều cách tiếp cận khác nhau với hiệu quả khác nhau."
      },
      {
        "id": 29,
        "text": "Which paragraph discusses applications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 2,
        "category": "reading-detail",
        "explanation": "Đoạn 3 bàn về ứng dụng thực tiễn."
      },
      {
        "id": 30,
        "text": "Which paragraph mentions future implications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "Đoạn 4 bàn về tương lai và hàm ý."
      },
      {
        "id": 31,
        "text": "Where does the sentence best fit?",
        "options": [
          "[I]",
          "[II]",
          "[III]",
          "[IV]"
        ],
        "correct": 3,
        "category": "reading-insertion",
        "explanation": "[IV] - tổng kết ý chính của đoạn mở đầu."
      },
      {
        "id": 32,
        "text": "Which is NOT mentioned in paragraph 2?",
        "options": [
          "Economic factors",
          "Social implications",
          "Political considerations",
          "Military applications"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Military applications' không được đề cập."
      },
      {
        "id": 33,
        "text": "Which best summarises the main argument?",
        "options": [
          "A single perspective dominates.",
          "Multiple factors contribute to a complex phenomenon.",
          "Historical approaches are most effective.",
          "Technology solved all problems."
        ],
        "correct": 1,
        "category": "reading-summary",
        "explanation": "Multiple factors + complex + evolving."
      },
      {
        "id": 34,
        "text": "'these' refers to:",
        "options": [
          "organizations",
          "challenges",
          "methods",
          "frameworks"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'These challenges' chỉ các thách thức trước đó."
      },
      {
        "id": 35,
        "text": "'facilitate' is opposite to:",
        "options": [
          "enable",
          "impede",
          "accelerate",
          "promote"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Facilitate' ↔ 'Impede'."
      },
      {
        "id": 36,
        "text": "Which best paraphrases the highlighted sentence?",
        "options": [
          "Current approaches must adapt to address emerging challenges.",
          "Traditional methods remain sufficient.",
          "Adaptation is unnecessary.",
          "Challenges have been fully addressed."
        ],
        "correct": 0,
        "category": "reading-paraphrase",
        "explanation": "Must adapt → emerging challenges."
      },
      {
        "id": 37,
        "text": "'integral' mostly means:",
        "options": [
          "optional",
          "essential",
          "peripheral",
          "minimal"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Integral' = thiết yếu ≈ 'essential'."
      },
      {
        "id": 38,
        "text": "Which is TRUE?",
        "options": [
          "Only one approach works.",
          "Multiple perspectives contribute to understanding.",
          "Historical research is irrelevant.",
          "The topic is fully resolved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Nhiều quan điểm và cách tiếp cận khác nhau."
      },
      {
        "id": 39,
        "text": "What can be inferred?",
        "options": [
          "The field will remain unchanged.",
          "Continued research and collaboration are necessary.",
          "Individual efforts are sufficient.",
          "Past achievements eliminated further study need."
        ],
        "correct": 1,
        "category": "reading-inference",
        "explanation": "Cần nghiên cứu + hợp tác → tiến bộ."
      },
      {
        "id": 40,
        "text": "Which best summarises the passage?",
        "options": [
          "Complex phenomenon examined through multiple perspectives with ongoing challenges requiring collaborative solutions.",
          "Focuses exclusively on technological solutions.",
          "Argues for superiority of traditional approaches.",
          "Topic fully resolved by contemporary research."
        ],
        "correct": 0,
        "category": "reading-summary",
        "explanation": "Câu A toàn diện nhất."
      }
    ]
  },
  {
    "id": "thpt-03",
    "title": "Đề thi thử số 03",
    "titleEn": "Practice Test 03",
    "code": "1126",
    "duration": 50,
    "totalQuestions": 40,
    "passages": [
      {
        "id": "thpt-03-p1",
        "title": "Neuroplasticity",
        "text": "Passage about Neuroplasticity.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-03-p2",
        "title": "Sustainable Architecture",
        "text": "Passage about Sustainable Architecture.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-03-p3",
        "title": "Quantum Computing Principles",
        "text": "Passage about Quantum Computing Principles.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-03-p4",
        "title": "Epigenetics Research",
        "text": "Passage about Epigenetics Research.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-03-p5",
        "title": "Dark Matter Cosmology",
        "text": "Passage about Dark Matter Cosmology.",
        "questionRange": [
          31,
          40
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "text": "Question 1",
        "options": [
          "transformative",
          "transformation",
          "transformed",
          "transformatively"
        ],
        "correct": 0,
        "category": "word-form",
        "explanation": "Chọn từ loại đúng (tính từ/trạng từ/danh từ) phù hợp với vị trí trong câu."
      },
      {
        "id": 2,
        "text": "Question 2",
        "options": [
          "however",
          "therefore",
          "conversely",
          "similarly"
        ],
        "correct": 1,
        "category": "connector",
        "explanation": "Chọn từ nối phù hợp với logic ngữ cảnh."
      },
      {
        "id": 3,
        "text": "Question 3",
        "options": [
          "toward",
          "to",
          "with",
          "into"
        ],
        "correct": 1,
        "category": "preposition",
        "explanation": "Cấu trúc động từ + giới từ 'to' phù hợp."
      },
      {
        "id": 4,
        "text": "Question 4",
        "options": [
          "make",
          "take",
          "do",
          "have"
        ],
        "correct": 1,
        "category": "collocation",
        "explanation": "'Take action/measures' là collocation chuẩn."
      },
      {
        "id": 5,
        "text": "Question 5",
        "options": [
          "monitor",
          "monitoring",
          "to monitor",
          "monitored"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing trong mệnh đề quan hệ rút gọn."
      },
      {
        "id": 6,
        "text": "Question 6",
        "options": [
          "approaches",
          "methodologies",
          "curricula",
          "techniques"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "Chọn danh từ phù hợp với ngữ cảnh."
      },
      {
        "id": 7,
        "text": "Question 7",
        "options": [
          "appreciate",
          "acknowledge",
          "perceive",
          "recognize"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "Chọn động từ phù hợp với ngữ cảnh nhận thức."
      },
      {
        "id": 8,
        "text": "Question 8",
        "options": [
          "amount",
          "number",
          "quantity",
          "volume"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Amount' dùng với danh từ không đếm được."
      },
      {
        "id": 9,
        "text": "Question 9",
        "options": [
          "to operate",
          "operating",
          "operated",
          "operate"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing sau 'are' trong thì tiếp diễn."
      },
      {
        "id": 10,
        "text": "Question 10",
        "options": [
          "cutting-edge specialized ambitious",
          "specialized ambitious cutting-edge",
          "ambitious cutting-edge specialized",
          "ambitious specialized cutting-edge"
        ],
        "correct": 2,
        "category": "adjective-order",
        "explanation": "Thứ tự tính từ: opinion → quality → type."
      },
      {
        "id": 11,
        "text": "Question 11",
        "options": [
          "pick up",
          "take over",
          "put forward",
          "bring about"
        ],
        "correct": 0,
        "category": "phrasal-verb",
        "explanation": "'Pick up' = tiếp thu, học được nhanh chóng."
      },
      {
        "id": 12,
        "text": "Question 12",
        "options": [
          "Few",
          "A few",
          "Little",
          "A little"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'Few' mang nghĩa phủ định với danh từ đếm được."
      },
      {
        "id": 13,
        "text": "Q13: Arrange the formal letter.",
        "options": [
          "a–b–c–d–e",
          "b–a–d–c–e",
          "a–c–b–d–e",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Thứ tự: cảm ơn → vấn đề → chi tiết → giải thích → kết thúc."
      },
      {
        "id": 14,
        "text": "Q14: Arrange the academic paragraph.",
        "options": [
          "a–b–c–d–e",
          "b–d–a–c–e",
          "b–a–c–e–d",
          "d–b–a–c–e"
        ],
        "correct": 0,
        "category": "arrangement",
        "explanation": "Thứ tự logic của đoạn văn học thuật."
      },
      {
        "id": 15,
        "text": "Q15: Arrange the dialogue.",
        "options": [
          "a–b–c",
          "b–a–c",
          "c–b–a",
          "b–c–a"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Giới thiệu → hỏi → trả lời."
      },
      {
        "id": 16,
        "text": "Q16: Arrange the passage.",
        "options": [
          "a–b–c–d–e",
          "c–a–b–e–d",
          "a–c–b–e–d",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Truyền thống → đổi mới → hứa hẹn → nếu thành công → thách thức."
      },
      {
        "id": 17,
        "text": "Q17: Arrange the debate.",
        "options": [
          "a–b–c–d–e",
          "a–d–e–b–c",
          "d–a–b–e–c",
          "a–b–d–c–e"
        ],
        "correct": 3,
        "category": "arrangement",
        "explanation": "Nêu vấn đề → đồng ý → hỏi giải pháp → nhấn mạnh → đề xuất."
      },
      {
        "id": 18,
        "text": "Q18: Choose correct grammar.",
        "options": [
          "Developed through research, this framework provides solutions",
          "This framework, which developing, provides solutions",
          "Having this framework developed, solutions were provided",
          "Research developing, this framework provides solutions"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Phân từ quá khứ rút gọn đúng ngữ pháp."
      },
      {
        "id": 19,
        "text": "Q19: Choose correct sentence.",
        "options": [
          "Researchers who conducted experiments have published findings",
          "Experiments having conducted by researchers published findings",
          "Findings have been conducted by researchers who participating",
          "The researchers conducting experiments has published findings"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Mệnh đề quan hệ + thì hoàn thành đúng."
      },
      {
        "id": 20,
        "text": "Q20: Choose correct transition.",
        "options": [
          "In response to these concerns",
          "Responded to these concerns",
          "These concerns having been responded",
          "Having responded to these concerns"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'In response to...' - cụm giới từ phù hợp."
      },
      {
        "id": 21,
        "text": "Q21: Choose correct clause.",
        "options": [
          "the rapid advancement creates new challenges",
          "technology rapidly advancing creates challenges",
          "it will rapidly advance creating challenges",
          "the rapidly technology creates challenges"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Cấu trúc chủ-vị đúng: 'the rapid advancement... creates...'"
      },
      {
        "id": 22,
        "text": "Q22: Choose best conclusion.",
        "options": [
          "Future developments will undoubtedly reshape our understanding",
          "Our understanding will hardly be reshaped",
          "Future developments reshaping, the subject undoubtedly",
          "It is undoubtedly that developments will reshape"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Câu A đúng ngữ pháp, nghĩa kết luận phù hợp."
      },
      {
        "id": 23,
        "text": "Which best paraphrases the underlined sentence?",
        "options": [
          "Initial investigations produced temporary results.",
          "What began as preliminary research became a comprehensive field.",
          "Research changed permanently due to experiments.",
          "Preliminary research evolved into permanent methodology."
        ],
        "correct": 1,
        "category": "reading-paraphrase",
        "explanation": "Câu B diễn đạt chính xác nhất."
      },
      {
        "id": 24,
        "text": "Which is NOT mentioned as a challenge?",
        "options": [
          "Funding limitations",
          "Ethical concerns",
          "Regulatory barriers",
          "Language barriers"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Language barriers' không được đề cập."
      },
      {
        "id": 25,
        "text": "'sophisticated' can be replaced by:",
        "options": [
          "complex",
          "simple",
          "basic",
          "ordinary"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Sophisticated' ≈ 'complex' = phức tạp, tinh vi."
      },
      {
        "id": 26,
        "text": "'enhance' is opposite to:",
        "options": [
          "improve",
          "diminish",
          "maintain",
          "stabilize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Enhance' ↔ 'Diminish'."
      },
      {
        "id": 27,
        "text": "'which' refers to:",
        "options": [
          "methods",
          "systems",
          "challenges",
          "approaches"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'Systems which enable...'"
      },
      {
        "id": 28,
        "text": "Which is TRUE?",
        "options": [
          "All methodologies produce identical results.",
          "Different approaches yield varying effectiveness.",
          "Traditional methods are always superior.",
          "All problems have been solved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Bài nêu nhiều cách tiếp cận khác nhau với hiệu quả khác nhau."
      },
      {
        "id": 29,
        "text": "Which paragraph discusses applications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 2,
        "category": "reading-detail",
        "explanation": "Đoạn 3 bàn về ứng dụng thực tiễn."
      },
      {
        "id": 30,
        "text": "Which paragraph mentions future implications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "Đoạn 4 bàn về tương lai và hàm ý."
      },
      {
        "id": 31,
        "text": "Where does the sentence best fit?",
        "options": [
          "[I]",
          "[II]",
          "[III]",
          "[IV]"
        ],
        "correct": 3,
        "category": "reading-insertion",
        "explanation": "[IV] - tổng kết ý chính của đoạn mở đầu."
      },
      {
        "id": 32,
        "text": "Which is NOT mentioned in paragraph 2?",
        "options": [
          "Economic factors",
          "Social implications",
          "Political considerations",
          "Military applications"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Military applications' không được đề cập."
      },
      {
        "id": 33,
        "text": "Which best summarises the main argument?",
        "options": [
          "A single perspective dominates.",
          "Multiple factors contribute to a complex phenomenon.",
          "Historical approaches are most effective.",
          "Technology solved all problems."
        ],
        "correct": 1,
        "category": "reading-summary",
        "explanation": "Multiple factors + complex + evolving."
      },
      {
        "id": 34,
        "text": "'these' refers to:",
        "options": [
          "organizations",
          "challenges",
          "methods",
          "frameworks"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'These challenges' chỉ các thách thức trước đó."
      },
      {
        "id": 35,
        "text": "'facilitate' is opposite to:",
        "options": [
          "enable",
          "impede",
          "accelerate",
          "promote"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Facilitate' ↔ 'Impede'."
      },
      {
        "id": 36,
        "text": "Which best paraphrases the highlighted sentence?",
        "options": [
          "Current approaches must adapt to address emerging challenges.",
          "Traditional methods remain sufficient.",
          "Adaptation is unnecessary.",
          "Challenges have been fully addressed."
        ],
        "correct": 0,
        "category": "reading-paraphrase",
        "explanation": "Must adapt → emerging challenges."
      },
      {
        "id": 37,
        "text": "'integral' mostly means:",
        "options": [
          "optional",
          "essential",
          "peripheral",
          "minimal"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Integral' = thiết yếu ≈ 'essential'."
      },
      {
        "id": 38,
        "text": "Which is TRUE?",
        "options": [
          "Only one approach works.",
          "Multiple perspectives contribute to understanding.",
          "Historical research is irrelevant.",
          "The topic is fully resolved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Nhiều quan điểm và cách tiếp cận khác nhau."
      },
      {
        "id": 39,
        "text": "What can be inferred?",
        "options": [
          "The field will remain unchanged.",
          "Continued research and collaboration are necessary.",
          "Individual efforts are sufficient.",
          "Past achievements eliminated further study need."
        ],
        "correct": 1,
        "category": "reading-inference",
        "explanation": "Cần nghiên cứu + hợp tác → tiến bộ."
      },
      {
        "id": 40,
        "text": "Which best summarises the passage?",
        "options": [
          "Complex phenomenon examined through multiple perspectives with ongoing challenges requiring collaborative solutions.",
          "Focuses exclusively on technological solutions.",
          "Argues for superiority of traditional approaches.",
          "Topic fully resolved by contemporary research."
        ],
        "correct": 0,
        "category": "reading-summary",
        "explanation": "Câu A toàn diện nhất."
      }
    ]
  },
  {
    "id": "thpt-04",
    "title": "Đề thi thử số 04",
    "titleEn": "Practice Test 04",
    "code": "1126",
    "duration": 50,
    "totalQuestions": 40,
    "passages": [
      {
        "id": "thpt-04-p1",
        "title": "Island Tourism",
        "text": "Passage about Island Tourism.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-04-p2",
        "title": "Plastic Recycling",
        "text": "Passage about Plastic Recycling.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-04-p3",
        "title": "Environmental Policy",
        "text": "Passage about Environmental Policy.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-04-p4",
        "title": "Ocean Conservation",
        "text": "Passage about Ocean Conservation.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-04-p5",
        "title": "Genetic Engineering",
        "text": "Passage about Genetic Engineering.",
        "questionRange": [
          31,
          40
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "text": "Question 1",
        "options": [
          "remarkably",
          "remarkable",
          "remarked",
          "remarking"
        ],
        "correct": 1,
        "category": "word-form",
        "explanation": "Chọn từ loại đúng (tính từ/trạng từ/danh từ) phù hợp với vị trí trong câu."
      },
      {
        "id": 2,
        "text": "Question 2",
        "options": [
          "In addition to this",
          "Furthermore",
          "Nevertheless",
          "In contrast"
        ],
        "correct": 1,
        "category": "connector",
        "explanation": "Chọn từ nối phù hợp với logic ngữ cảnh."
      },
      {
        "id": 3,
        "text": "Question 3",
        "options": [
          "toward",
          "to",
          "with",
          "into"
        ],
        "correct": 1,
        "category": "preposition",
        "explanation": "Cấu trúc động từ + giới từ 'to' phù hợp."
      },
      {
        "id": 4,
        "text": "Question 4",
        "options": [
          "make",
          "take",
          "do",
          "have"
        ],
        "correct": 1,
        "category": "collocation",
        "explanation": "'Take action/measures' là collocation chuẩn."
      },
      {
        "id": 5,
        "text": "Question 5",
        "options": [
          "monitor",
          "monitoring",
          "to monitor",
          "monitored"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing trong mệnh đề quan hệ rút gọn."
      },
      {
        "id": 6,
        "text": "Question 6",
        "options": [
          "approaches",
          "methodologies",
          "curricula",
          "techniques"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "Chọn danh từ phù hợp với ngữ cảnh."
      },
      {
        "id": 7,
        "text": "Question 7",
        "options": [
          "appreciate",
          "acknowledge",
          "perceive",
          "recognize"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "Chọn động từ phù hợp với ngữ cảnh nhận thức."
      },
      {
        "id": 8,
        "text": "Question 8",
        "options": [
          "amount",
          "number",
          "quantity",
          "volume"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Amount' dùng với danh từ không đếm được."
      },
      {
        "id": 9,
        "text": "Question 9",
        "options": [
          "to operate",
          "operating",
          "operated",
          "operate"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing sau 'are' trong thì tiếp diễn."
      },
      {
        "id": 10,
        "text": "Question 10",
        "options": [
          "cutting-edge specialized ambitious",
          "specialized ambitious cutting-edge",
          "ambitious cutting-edge specialized",
          "ambitious specialized cutting-edge"
        ],
        "correct": 2,
        "category": "adjective-order",
        "explanation": "Thứ tự tính từ: opinion → quality → type."
      },
      {
        "id": 11,
        "text": "Question 11",
        "options": [
          "pick up",
          "take over",
          "put forward",
          "bring about"
        ],
        "correct": 0,
        "category": "phrasal-verb",
        "explanation": "'Pick up' = tiếp thu, học được nhanh chóng."
      },
      {
        "id": 12,
        "text": "Question 12",
        "options": [
          "Few",
          "A few",
          "Little",
          "A little"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'Few' mang nghĩa phủ định với danh từ đếm được."
      },
      {
        "id": 13,
        "text": "Q13: Arrange the formal letter.",
        "options": [
          "a–b–c–d–e",
          "b–a–d–c–e",
          "a–c–b–d–e",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Thứ tự: cảm ơn → vấn đề → chi tiết → giải thích → kết thúc."
      },
      {
        "id": 14,
        "text": "Q14: Arrange the academic paragraph.",
        "options": [
          "a–b–c–d–e",
          "b–d–a–c–e",
          "b–a–c–e–d",
          "d–b–a–c–e"
        ],
        "correct": 0,
        "category": "arrangement",
        "explanation": "Thứ tự logic của đoạn văn học thuật."
      },
      {
        "id": 15,
        "text": "Q15: Arrange the dialogue.",
        "options": [
          "a–b–c",
          "b–a–c",
          "c–b–a",
          "b–c–a"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Giới thiệu → hỏi → trả lời."
      },
      {
        "id": 16,
        "text": "Q16: Arrange the passage.",
        "options": [
          "a–b–c–d–e",
          "c–a–b–e–d",
          "a–c–b–e–d",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Truyền thống → đổi mới → hứa hẹn → nếu thành công → thách thức."
      },
      {
        "id": 17,
        "text": "Q17: Arrange the debate.",
        "options": [
          "a–b–c–d–e",
          "a–d–e–b–c",
          "d–a–b–e–c",
          "a–b–d–c–e"
        ],
        "correct": 3,
        "category": "arrangement",
        "explanation": "Nêu vấn đề → đồng ý → hỏi giải pháp → nhấn mạnh → đề xuất."
      },
      {
        "id": 18,
        "text": "Q18: Choose correct grammar.",
        "options": [
          "Developed through research, this framework provides solutions",
          "This framework, which developing, provides solutions",
          "Having this framework developed, solutions were provided",
          "Research developing, this framework provides solutions"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Phân từ quá khứ rút gọn đúng ngữ pháp."
      },
      {
        "id": 19,
        "text": "Q19: Choose correct sentence.",
        "options": [
          "Researchers who conducted experiments have published findings",
          "Experiments having conducted by researchers published findings",
          "Findings have been conducted by researchers who participating",
          "The researchers conducting experiments has published findings"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Mệnh đề quan hệ + thì hoàn thành đúng."
      },
      {
        "id": 20,
        "text": "Q20: Choose correct transition.",
        "options": [
          "In response to these concerns",
          "Responded to these concerns",
          "These concerns having been responded",
          "Having responded to these concerns"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'In response to...' - cụm giới từ phù hợp."
      },
      {
        "id": 21,
        "text": "Q21: Choose correct clause.",
        "options": [
          "the rapid advancement creates new challenges",
          "technology rapidly advancing creates challenges",
          "it will rapidly advance creating challenges",
          "the rapidly technology creates challenges"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Cấu trúc chủ-vị đúng: 'the rapid advancement... creates...'"
      },
      {
        "id": 22,
        "text": "Q22: Choose best conclusion.",
        "options": [
          "Future developments will undoubtedly reshape our understanding",
          "Our understanding will hardly be reshaped",
          "Future developments reshaping, the subject undoubtedly",
          "It is undoubtedly that developments will reshape"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Câu A đúng ngữ pháp, nghĩa kết luận phù hợp."
      },
      {
        "id": 23,
        "text": "Which best paraphrases the underlined sentence?",
        "options": [
          "Initial investigations produced temporary results.",
          "What began as preliminary research became a comprehensive field.",
          "Research changed permanently due to experiments.",
          "Preliminary research evolved into permanent methodology."
        ],
        "correct": 1,
        "category": "reading-paraphrase",
        "explanation": "Câu B diễn đạt chính xác nhất."
      },
      {
        "id": 24,
        "text": "Which is NOT mentioned as a challenge?",
        "options": [
          "Funding limitations",
          "Ethical concerns",
          "Regulatory barriers",
          "Language barriers"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Language barriers' không được đề cập."
      },
      {
        "id": 25,
        "text": "'sophisticated' can be replaced by:",
        "options": [
          "complex",
          "simple",
          "basic",
          "ordinary"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Sophisticated' ≈ 'complex' = phức tạp, tinh vi."
      },
      {
        "id": 26,
        "text": "'enhance' is opposite to:",
        "options": [
          "improve",
          "diminish",
          "maintain",
          "stabilize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Enhance' ↔ 'Diminish'."
      },
      {
        "id": 27,
        "text": "'which' refers to:",
        "options": [
          "methods",
          "systems",
          "challenges",
          "approaches"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'Systems which enable...'"
      },
      {
        "id": 28,
        "text": "Which is TRUE?",
        "options": [
          "All methodologies produce identical results.",
          "Different approaches yield varying effectiveness.",
          "Traditional methods are always superior.",
          "All problems have been solved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Bài nêu nhiều cách tiếp cận khác nhau với hiệu quả khác nhau."
      },
      {
        "id": 29,
        "text": "Which paragraph discusses applications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 2,
        "category": "reading-detail",
        "explanation": "Đoạn 3 bàn về ứng dụng thực tiễn."
      },
      {
        "id": 30,
        "text": "Which paragraph mentions future implications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "Đoạn 4 bàn về tương lai và hàm ý."
      },
      {
        "id": 31,
        "text": "Where does the sentence best fit?",
        "options": [
          "[I]",
          "[II]",
          "[III]",
          "[IV]"
        ],
        "correct": 3,
        "category": "reading-insertion",
        "explanation": "[IV] - tổng kết ý chính của đoạn mở đầu."
      },
      {
        "id": 32,
        "text": "Which is NOT mentioned in paragraph 2?",
        "options": [
          "Economic factors",
          "Social implications",
          "Political considerations",
          "Military applications"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Military applications' không được đề cập."
      },
      {
        "id": 33,
        "text": "Which best summarises the main argument?",
        "options": [
          "A single perspective dominates.",
          "Multiple factors contribute to a complex phenomenon.",
          "Historical approaches are most effective.",
          "Technology solved all problems."
        ],
        "correct": 1,
        "category": "reading-summary",
        "explanation": "Multiple factors + complex + evolving."
      },
      {
        "id": 34,
        "text": "'these' refers to:",
        "options": [
          "organizations",
          "challenges",
          "methods",
          "frameworks"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'These challenges' chỉ các thách thức trước đó."
      },
      {
        "id": 35,
        "text": "'facilitate' is opposite to:",
        "options": [
          "enable",
          "impede",
          "accelerate",
          "promote"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Facilitate' ↔ 'Impede'."
      },
      {
        "id": 36,
        "text": "Which best paraphrases the highlighted sentence?",
        "options": [
          "Current approaches must adapt to address emerging challenges.",
          "Traditional methods remain sufficient.",
          "Adaptation is unnecessary.",
          "Challenges have been fully addressed."
        ],
        "correct": 0,
        "category": "reading-paraphrase",
        "explanation": "Must adapt → emerging challenges."
      },
      {
        "id": 37,
        "text": "'integral' mostly means:",
        "options": [
          "optional",
          "essential",
          "peripheral",
          "minimal"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Integral' = thiết yếu ≈ 'essential'."
      },
      {
        "id": 38,
        "text": "Which is TRUE?",
        "options": [
          "Only one approach works.",
          "Multiple perspectives contribute to understanding.",
          "Historical research is irrelevant.",
          "The topic is fully resolved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Nhiều quan điểm và cách tiếp cận khác nhau."
      },
      {
        "id": 39,
        "text": "What can be inferred?",
        "options": [
          "The field will remain unchanged.",
          "Continued research and collaboration are necessary.",
          "Individual efforts are sufficient.",
          "Past achievements eliminated further study need."
        ],
        "correct": 1,
        "category": "reading-inference",
        "explanation": "Cần nghiên cứu + hợp tác → tiến bộ."
      },
      {
        "id": 40,
        "text": "Which best summarises the passage?",
        "options": [
          "Complex phenomenon examined through multiple perspectives with ongoing challenges requiring collaborative solutions.",
          "Focuses exclusively on technological solutions.",
          "Argues for superiority of traditional approaches.",
          "Topic fully resolved by contemporary research."
        ],
        "correct": 0,
        "category": "reading-summary",
        "explanation": "Câu A toàn diện nhất."
      }
    ]
  },
  {
    "id": "thpt-05",
    "title": "Đề thi thử số 05",
    "titleEn": "Practice Test 05",
    "code": "1126",
    "duration": 50,
    "totalQuestions": 40,
    "passages": [
      {
        "id": "thpt-05-p1",
        "title": "Rural Revitalization",
        "text": "Passage about Rural Revitalization.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-05-p2",
        "title": "Lifelong Learning",
        "text": "Passage about Lifelong Learning.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-05-p3",
        "title": "Agricultural Innovation",
        "text": "Passage about Agricultural Innovation.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-05-p4",
        "title": "Digital Education",
        "text": "Passage about Digital Education.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-05-p5",
        "title": "Economic Development",
        "text": "Passage about Economic Development.",
        "questionRange": [
          31,
          40
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "text": "Question 1",
        "options": [
          "credible",
          "credibility",
          "credibly",
          "credence"
        ],
        "correct": 0,
        "category": "word-form",
        "explanation": "Chọn từ loại đúng (tính từ/trạng từ/danh từ) phù hợp với vị trí trong câu."
      },
      {
        "id": 2,
        "text": "Question 2",
        "options": [
          "thereby",
          "despite",
          "accordingly",
          "whereas"
        ],
        "correct": 0,
        "category": "connector",
        "explanation": "Chọn từ nối phù hợp với logic ngữ cảnh."
      },
      {
        "id": 3,
        "text": "Question 3",
        "options": [
          "toward",
          "to",
          "with",
          "into"
        ],
        "correct": 1,
        "category": "preposition",
        "explanation": "Cấu trúc động từ + giới từ 'to' phù hợp."
      },
      {
        "id": 4,
        "text": "Question 4",
        "options": [
          "make",
          "take",
          "do",
          "have"
        ],
        "correct": 1,
        "category": "collocation",
        "explanation": "'Take action/measures' là collocation chuẩn."
      },
      {
        "id": 5,
        "text": "Question 5",
        "options": [
          "monitor",
          "monitoring",
          "to monitor",
          "monitored"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing trong mệnh đề quan hệ rút gọn."
      },
      {
        "id": 6,
        "text": "Question 6",
        "options": [
          "approaches",
          "methodologies",
          "curricula",
          "techniques"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "Chọn danh từ phù hợp với ngữ cảnh."
      },
      {
        "id": 7,
        "text": "Question 7",
        "options": [
          "appreciate",
          "acknowledge",
          "perceive",
          "recognize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "Chọn động từ phù hợp với ngữ cảnh nhận thức."
      },
      {
        "id": 8,
        "text": "Question 8",
        "options": [
          "amount",
          "number",
          "quantity",
          "volume"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Amount' dùng với danh từ không đếm được."
      },
      {
        "id": 9,
        "text": "Question 9",
        "options": [
          "to operate",
          "operating",
          "operated",
          "operate"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing sau 'are' trong thì tiếp diễn."
      },
      {
        "id": 10,
        "text": "Question 10",
        "options": [
          "cutting-edge specialized ambitious",
          "specialized ambitious cutting-edge",
          "ambitious cutting-edge specialized",
          "ambitious specialized cutting-edge"
        ],
        "correct": 2,
        "category": "adjective-order",
        "explanation": "Thứ tự tính từ: opinion → quality → type."
      },
      {
        "id": 11,
        "text": "Question 11",
        "options": [
          "pick up",
          "take over",
          "put forward",
          "bring about"
        ],
        "correct": 0,
        "category": "phrasal-verb",
        "explanation": "'Pick up' = tiếp thu, học được nhanh chóng."
      },
      {
        "id": 12,
        "text": "Question 12",
        "options": [
          "Few",
          "A few",
          "Little",
          "A little"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'Few' mang nghĩa phủ định với danh từ đếm được."
      },
      {
        "id": 13,
        "text": "Q13: Arrange the formal letter.",
        "options": [
          "a–b–c–d–e",
          "b–a–d–c–e",
          "a–c–b–d–e",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Thứ tự: cảm ơn → vấn đề → chi tiết → giải thích → kết thúc."
      },
      {
        "id": 14,
        "text": "Q14: Arrange the academic paragraph.",
        "options": [
          "a–b–c–d–e",
          "b–d–a–c–e",
          "b–a–c–e–d",
          "d–b–a–c–e"
        ],
        "correct": 0,
        "category": "arrangement",
        "explanation": "Thứ tự logic của đoạn văn học thuật."
      },
      {
        "id": 15,
        "text": "Q15: Arrange the dialogue.",
        "options": [
          "a–b–c",
          "b–a–c",
          "c–b–a",
          "b–c–a"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Giới thiệu → hỏi → trả lời."
      },
      {
        "id": 16,
        "text": "Q16: Arrange the passage.",
        "options": [
          "a–b–c–d–e",
          "c–a–b–e–d",
          "a–c–b–e–d",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Truyền thống → đổi mới → hứa hẹn → nếu thành công → thách thức."
      },
      {
        "id": 17,
        "text": "Q17: Arrange the debate.",
        "options": [
          "a–b–c–d–e",
          "a–d–e–b–c",
          "d–a–b–e–c",
          "a–b–d–c–e"
        ],
        "correct": 3,
        "category": "arrangement",
        "explanation": "Nêu vấn đề → đồng ý → hỏi giải pháp → nhấn mạnh → đề xuất."
      },
      {
        "id": 18,
        "text": "Q18: Choose correct grammar.",
        "options": [
          "Developed through research, this framework provides solutions",
          "This framework, which developing, provides solutions",
          "Having this framework developed, solutions were provided",
          "Research developing, this framework provides solutions"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Phân từ quá khứ rút gọn đúng ngữ pháp."
      },
      {
        "id": 19,
        "text": "Q19: Choose correct sentence.",
        "options": [
          "Researchers who conducted experiments have published findings",
          "Experiments having conducted by researchers published findings",
          "Findings have been conducted by researchers who participating",
          "The researchers conducting experiments has published findings"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Mệnh đề quan hệ + thì hoàn thành đúng."
      },
      {
        "id": 20,
        "text": "Q20: Choose correct transition.",
        "options": [
          "In response to these concerns",
          "Responded to these concerns",
          "These concerns having been responded",
          "Having responded to these concerns"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'In response to...' - cụm giới từ phù hợp."
      },
      {
        "id": 21,
        "text": "Q21: Choose correct clause.",
        "options": [
          "the rapid advancement creates new challenges",
          "technology rapidly advancing creates challenges",
          "it will rapidly advance creating challenges",
          "the rapidly technology creates challenges"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Cấu trúc chủ-vị đúng: 'the rapid advancement... creates...'"
      },
      {
        "id": 22,
        "text": "Q22: Choose best conclusion.",
        "options": [
          "Future developments will undoubtedly reshape our understanding",
          "Our understanding will hardly be reshaped",
          "Future developments reshaping, the subject undoubtedly",
          "It is undoubtedly that developments will reshape"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Câu A đúng ngữ pháp, nghĩa kết luận phù hợp."
      },
      {
        "id": 23,
        "text": "Which best paraphrases the underlined sentence?",
        "options": [
          "Initial investigations produced temporary results.",
          "What began as preliminary research became a comprehensive field.",
          "Research changed permanently due to experiments.",
          "Preliminary research evolved into permanent methodology."
        ],
        "correct": 1,
        "category": "reading-paraphrase",
        "explanation": "Câu B diễn đạt chính xác nhất."
      },
      {
        "id": 24,
        "text": "Which is NOT mentioned as a challenge?",
        "options": [
          "Funding limitations",
          "Ethical concerns",
          "Regulatory barriers",
          "Language barriers"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Language barriers' không được đề cập."
      },
      {
        "id": 25,
        "text": "'sophisticated' can be replaced by:",
        "options": [
          "complex",
          "simple",
          "basic",
          "ordinary"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Sophisticated' ≈ 'complex' = phức tạp, tinh vi."
      },
      {
        "id": 26,
        "text": "'enhance' is opposite to:",
        "options": [
          "improve",
          "diminish",
          "maintain",
          "stabilize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Enhance' ↔ 'Diminish'."
      },
      {
        "id": 27,
        "text": "'which' refers to:",
        "options": [
          "methods",
          "systems",
          "challenges",
          "approaches"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'Systems which enable...'"
      },
      {
        "id": 28,
        "text": "Which is TRUE?",
        "options": [
          "All methodologies produce identical results.",
          "Different approaches yield varying effectiveness.",
          "Traditional methods are always superior.",
          "All problems have been solved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Bài nêu nhiều cách tiếp cận khác nhau với hiệu quả khác nhau."
      },
      {
        "id": 29,
        "text": "Which paragraph discusses applications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 2,
        "category": "reading-detail",
        "explanation": "Đoạn 3 bàn về ứng dụng thực tiễn."
      },
      {
        "id": 30,
        "text": "Which paragraph mentions future implications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "Đoạn 4 bàn về tương lai và hàm ý."
      },
      {
        "id": 31,
        "text": "Where does the sentence best fit?",
        "options": [
          "[I]",
          "[II]",
          "[III]",
          "[IV]"
        ],
        "correct": 3,
        "category": "reading-insertion",
        "explanation": "[IV] - tổng kết ý chính của đoạn mở đầu."
      },
      {
        "id": 32,
        "text": "Which is NOT mentioned in paragraph 2?",
        "options": [
          "Economic factors",
          "Social implications",
          "Political considerations",
          "Military applications"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Military applications' không được đề cập."
      },
      {
        "id": 33,
        "text": "Which best summarises the main argument?",
        "options": [
          "A single perspective dominates.",
          "Multiple factors contribute to a complex phenomenon.",
          "Historical approaches are most effective.",
          "Technology solved all problems."
        ],
        "correct": 1,
        "category": "reading-summary",
        "explanation": "Multiple factors + complex + evolving."
      },
      {
        "id": 34,
        "text": "'these' refers to:",
        "options": [
          "organizations",
          "challenges",
          "methods",
          "frameworks"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'These challenges' chỉ các thách thức trước đó."
      },
      {
        "id": 35,
        "text": "'facilitate' is opposite to:",
        "options": [
          "enable",
          "impede",
          "accelerate",
          "promote"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Facilitate' ↔ 'Impede'."
      },
      {
        "id": 36,
        "text": "Which best paraphrases the highlighted sentence?",
        "options": [
          "Current approaches must adapt to address emerging challenges.",
          "Traditional methods remain sufficient.",
          "Adaptation is unnecessary.",
          "Challenges have been fully addressed."
        ],
        "correct": 0,
        "category": "reading-paraphrase",
        "explanation": "Must adapt → emerging challenges."
      },
      {
        "id": 37,
        "text": "'integral' mostly means:",
        "options": [
          "optional",
          "essential",
          "peripheral",
          "minimal"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Integral' = thiết yếu ≈ 'essential'."
      },
      {
        "id": 38,
        "text": "Which is TRUE?",
        "options": [
          "Only one approach works.",
          "Multiple perspectives contribute to understanding.",
          "Historical research is irrelevant.",
          "The topic is fully resolved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Nhiều quan điểm và cách tiếp cận khác nhau."
      },
      {
        "id": 39,
        "text": "What can be inferred?",
        "options": [
          "The field will remain unchanged.",
          "Continued research and collaboration are necessary.",
          "Individual efforts are sufficient.",
          "Past achievements eliminated further study need."
        ],
        "correct": 1,
        "category": "reading-inference",
        "explanation": "Cần nghiên cứu + hợp tác → tiến bộ."
      },
      {
        "id": 40,
        "text": "Which best summarises the passage?",
        "options": [
          "Complex phenomenon examined through multiple perspectives with ongoing challenges requiring collaborative solutions.",
          "Focuses exclusively on technological solutions.",
          "Argues for superiority of traditional approaches.",
          "Topic fully resolved by contemporary research."
        ],
        "correct": 0,
        "category": "reading-summary",
        "explanation": "Câu A toàn diện nhất."
      }
    ]
  },
  {
    "id": "thpt-06",
    "title": "Đề thi thử số 06",
    "titleEn": "Practice Test 06",
    "code": "1126",
    "duration": 50,
    "totalQuestions": 40,
    "passages": [
      {
        "id": "thpt-06-p1",
        "title": "Genome Editing Ethics",
        "text": "Passage about Genome Editing Ethics.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-06-p2",
        "title": "Free Will & Neuroscience",
        "text": "Passage about Free Will & Neuroscience.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-06-p3",
        "title": "Bioethics",
        "text": "Passage about Bioethics.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-06-p4",
        "title": "Climate Policy",
        "text": "Passage about Climate Policy.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-06-p5",
        "title": "Space Governance",
        "text": "Passage about Space Governance.",
        "questionRange": [
          31,
          40
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "text": "Question 1",
        "options": [
          "profoundly",
          "profound",
          "profoundness",
          "profounding"
        ],
        "correct": 0,
        "category": "word-form",
        "explanation": "Chọn từ loại đúng (tính từ/trạng từ/danh từ) phù hợp với vị trí trong câu."
      },
      {
        "id": 2,
        "text": "Question 2",
        "options": [
          "consequently",
          "nevertheless",
          "moreover",
          "conversely"
        ],
        "correct": 0,
        "category": "connector",
        "explanation": "Chọn từ nối phù hợp với logic ngữ cảnh."
      },
      {
        "id": 3,
        "text": "Question 3",
        "options": [
          "toward",
          "to",
          "with",
          "into"
        ],
        "correct": 1,
        "category": "preposition",
        "explanation": "Cấu trúc động từ + giới từ 'to' phù hợp."
      },
      {
        "id": 4,
        "text": "Question 4",
        "options": [
          "make",
          "take",
          "do",
          "have"
        ],
        "correct": 1,
        "category": "collocation",
        "explanation": "'Take action/measures' là collocation chuẩn."
      },
      {
        "id": 5,
        "text": "Question 5",
        "options": [
          "monitor",
          "monitoring",
          "to monitor",
          "monitored"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing trong mệnh đề quan hệ rút gọn."
      },
      {
        "id": 6,
        "text": "Question 6",
        "options": [
          "approaches",
          "methodologies",
          "curricula",
          "techniques"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "Chọn danh từ phù hợp với ngữ cảnh."
      },
      {
        "id": 7,
        "text": "Question 7",
        "options": [
          "appreciate",
          "acknowledge",
          "perceive",
          "recognize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "Chọn động từ phù hợp với ngữ cảnh nhận thức."
      },
      {
        "id": 8,
        "text": "Question 8",
        "options": [
          "amount",
          "number",
          "quantity",
          "volume"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Amount' dùng với danh từ không đếm được."
      },
      {
        "id": 9,
        "text": "Question 9",
        "options": [
          "to operate",
          "operating",
          "operated",
          "operate"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing sau 'are' trong thì tiếp diễn."
      },
      {
        "id": 10,
        "text": "Question 10",
        "options": [
          "cutting-edge specialized ambitious",
          "specialized ambitious cutting-edge",
          "ambitious cutting-edge specialized",
          "ambitious specialized cutting-edge"
        ],
        "correct": 2,
        "category": "adjective-order",
        "explanation": "Thứ tự tính từ: opinion → quality → type."
      },
      {
        "id": 11,
        "text": "Question 11",
        "options": [
          "pick up",
          "take over",
          "put forward",
          "bring about"
        ],
        "correct": 0,
        "category": "phrasal-verb",
        "explanation": "'Pick up' = tiếp thu, học được nhanh chóng."
      },
      {
        "id": 12,
        "text": "Question 12",
        "options": [
          "Few",
          "A few",
          "Little",
          "A little"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'Few' mang nghĩa phủ định với danh từ đếm được."
      },
      {
        "id": 13,
        "text": "Q13: Arrange the formal letter.",
        "options": [
          "a–b–c–d–e",
          "b–a–d–c–e",
          "a–c–b–d–e",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Thứ tự: cảm ơn → vấn đề → chi tiết → giải thích → kết thúc."
      },
      {
        "id": 14,
        "text": "Q14: Arrange the academic paragraph.",
        "options": [
          "a–b–c–d–e",
          "b–d–a–c–e",
          "b–a–c–e–d",
          "d–b–a–c–e"
        ],
        "correct": 0,
        "category": "arrangement",
        "explanation": "Thứ tự logic của đoạn văn học thuật."
      },
      {
        "id": 15,
        "text": "Q15: Arrange the dialogue.",
        "options": [
          "a–b–c",
          "b–a–c",
          "c–b–a",
          "b–c–a"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Giới thiệu → hỏi → trả lời."
      },
      {
        "id": 16,
        "text": "Q16: Arrange the passage.",
        "options": [
          "a–b–c–d–e",
          "c–a–b–e–d",
          "a–c–b–e–d",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Truyền thống → đổi mới → hứa hẹn → nếu thành công → thách thức."
      },
      {
        "id": 17,
        "text": "Q17: Arrange the debate.",
        "options": [
          "a–b–c–d–e",
          "a–d–e–b–c",
          "d–a–b–e–c",
          "a–b–d–c–e"
        ],
        "correct": 3,
        "category": "arrangement",
        "explanation": "Nêu vấn đề → đồng ý → hỏi giải pháp → nhấn mạnh → đề xuất."
      },
      {
        "id": 18,
        "text": "Q18: Choose correct grammar.",
        "options": [
          "Developed through research, this framework provides solutions",
          "This framework, which developing, provides solutions",
          "Having this framework developed, solutions were provided",
          "Research developing, this framework provides solutions"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Phân từ quá khứ rút gọn đúng ngữ pháp."
      },
      {
        "id": 19,
        "text": "Q19: Choose correct sentence.",
        "options": [
          "Researchers who conducted experiments have published findings",
          "Experiments having conducted by researchers published findings",
          "Findings have been conducted by researchers who participating",
          "The researchers conducting experiments has published findings"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Mệnh đề quan hệ + thì hoàn thành đúng."
      },
      {
        "id": 20,
        "text": "Q20: Choose correct transition.",
        "options": [
          "In response to these concerns",
          "Responded to these concerns",
          "These concerns having been responded",
          "Having responded to these concerns"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'In response to...' - cụm giới từ phù hợp."
      },
      {
        "id": 21,
        "text": "Q21: Choose correct clause.",
        "options": [
          "the rapid advancement creates new challenges",
          "technology rapidly advancing creates challenges",
          "it will rapidly advance creating challenges",
          "the rapidly technology creates challenges"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Cấu trúc chủ-vị đúng: 'the rapid advancement... creates...'"
      },
      {
        "id": 22,
        "text": "Q22: Choose best conclusion.",
        "options": [
          "Future developments will undoubtedly reshape our understanding",
          "Our understanding will hardly be reshaped",
          "Future developments reshaping, the subject undoubtedly",
          "It is undoubtedly that developments will reshape"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Câu A đúng ngữ pháp, nghĩa kết luận phù hợp."
      },
      {
        "id": 23,
        "text": "Which best paraphrases the underlined sentence?",
        "options": [
          "Initial investigations produced temporary results.",
          "What began as preliminary research became a comprehensive field.",
          "Research changed permanently due to experiments.",
          "Preliminary research evolved into permanent methodology."
        ],
        "correct": 1,
        "category": "reading-paraphrase",
        "explanation": "Câu B diễn đạt chính xác nhất."
      },
      {
        "id": 24,
        "text": "Which is NOT mentioned as a challenge?",
        "options": [
          "Funding limitations",
          "Ethical concerns",
          "Regulatory barriers",
          "Language barriers"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Language barriers' không được đề cập."
      },
      {
        "id": 25,
        "text": "'sophisticated' can be replaced by:",
        "options": [
          "complex",
          "simple",
          "basic",
          "ordinary"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Sophisticated' ≈ 'complex' = phức tạp, tinh vi."
      },
      {
        "id": 26,
        "text": "'enhance' is opposite to:",
        "options": [
          "improve",
          "diminish",
          "maintain",
          "stabilize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Enhance' ↔ 'Diminish'."
      },
      {
        "id": 27,
        "text": "'which' refers to:",
        "options": [
          "methods",
          "systems",
          "challenges",
          "approaches"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'Systems which enable...'"
      },
      {
        "id": 28,
        "text": "Which is TRUE?",
        "options": [
          "All methodologies produce identical results.",
          "Different approaches yield varying effectiveness.",
          "Traditional methods are always superior.",
          "All problems have been solved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Bài nêu nhiều cách tiếp cận khác nhau với hiệu quả khác nhau."
      },
      {
        "id": 29,
        "text": "Which paragraph discusses applications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 2,
        "category": "reading-detail",
        "explanation": "Đoạn 3 bàn về ứng dụng thực tiễn."
      },
      {
        "id": 30,
        "text": "Which paragraph mentions future implications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "Đoạn 4 bàn về tương lai và hàm ý."
      },
      {
        "id": 31,
        "text": "Where does the sentence best fit?",
        "options": [
          "[I]",
          "[II]",
          "[III]",
          "[IV]"
        ],
        "correct": 3,
        "category": "reading-insertion",
        "explanation": "[IV] - tổng kết ý chính của đoạn mở đầu."
      },
      {
        "id": 32,
        "text": "Which is NOT mentioned in paragraph 2?",
        "options": [
          "Economic factors",
          "Social implications",
          "Political considerations",
          "Military applications"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Military applications' không được đề cập."
      },
      {
        "id": 33,
        "text": "Which best summarises the main argument?",
        "options": [
          "A single perspective dominates.",
          "Multiple factors contribute to a complex phenomenon.",
          "Historical approaches are most effective.",
          "Technology solved all problems."
        ],
        "correct": 1,
        "category": "reading-summary",
        "explanation": "Multiple factors + complex + evolving."
      },
      {
        "id": 34,
        "text": "'these' refers to:",
        "options": [
          "organizations",
          "challenges",
          "methods",
          "frameworks"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'These challenges' chỉ các thách thức trước đó."
      },
      {
        "id": 35,
        "text": "'facilitate' is opposite to:",
        "options": [
          "enable",
          "impede",
          "accelerate",
          "promote"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Facilitate' ↔ 'Impede'."
      },
      {
        "id": 36,
        "text": "Which best paraphrases the highlighted sentence?",
        "options": [
          "Current approaches must adapt to address emerging challenges.",
          "Traditional methods remain sufficient.",
          "Adaptation is unnecessary.",
          "Challenges have been fully addressed."
        ],
        "correct": 0,
        "category": "reading-paraphrase",
        "explanation": "Must adapt → emerging challenges."
      },
      {
        "id": 37,
        "text": "'integral' mostly means:",
        "options": [
          "optional",
          "essential",
          "peripheral",
          "minimal"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Integral' = thiết yếu ≈ 'essential'."
      },
      {
        "id": 38,
        "text": "Which is TRUE?",
        "options": [
          "Only one approach works.",
          "Multiple perspectives contribute to understanding.",
          "Historical research is irrelevant.",
          "The topic is fully resolved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Nhiều quan điểm và cách tiếp cận khác nhau."
      },
      {
        "id": 39,
        "text": "What can be inferred?",
        "options": [
          "The field will remain unchanged.",
          "Continued research and collaboration are necessary.",
          "Individual efforts are sufficient.",
          "Past achievements eliminated further study need."
        ],
        "correct": 1,
        "category": "reading-inference",
        "explanation": "Cần nghiên cứu + hợp tác → tiến bộ."
      },
      {
        "id": 40,
        "text": "Which best summarises the passage?",
        "options": [
          "Complex phenomenon examined through multiple perspectives with ongoing challenges requiring collaborative solutions.",
          "Focuses exclusively on technological solutions.",
          "Argues for superiority of traditional approaches.",
          "Topic fully resolved by contemporary research."
        ],
        "correct": 0,
        "category": "reading-summary",
        "explanation": "Câu A toàn diện nhất."
      }
    ]
  },
  {
    "id": "thpt-07",
    "title": "Đề thi thử số 07",
    "titleEn": "Practice Test 07",
    "code": "1126",
    "duration": 50,
    "totalQuestions": 40,
    "passages": [
      {
        "id": "thpt-07-p1",
        "title": "Cultural Authenticity",
        "text": "Passage about Cultural Authenticity.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-07-p2",
        "title": "Nuclear Family Structures",
        "text": "Passage about Nuclear Family Structures.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-07-p3",
        "title": "Cultural Preservation",
        "text": "Passage about Cultural Preservation.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-07-p4",
        "title": "Migration Studies",
        "text": "Passage about Migration Studies.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-07-p5",
        "title": "Social Anthropology",
        "text": "Passage about Social Anthropology.",
        "questionRange": [
          31,
          40
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "text": "Question 1",
        "options": [
          "pervasive",
          "pervade",
          "pervaded",
          "pervading"
        ],
        "correct": 0,
        "category": "word-form",
        "explanation": "Chọn từ loại đúng (tính từ/trạng từ/danh từ) phù hợp với vị trí trong câu."
      },
      {
        "id": 2,
        "text": "Question 2",
        "options": [
          "consequently",
          "however",
          "nonetheless",
          "meanwhile"
        ],
        "correct": 0,
        "category": "connector",
        "explanation": "Chọn từ nối phù hợp với logic ngữ cảnh."
      },
      {
        "id": 3,
        "text": "Question 3",
        "options": [
          "toward",
          "to",
          "with",
          "into"
        ],
        "correct": 1,
        "category": "preposition",
        "explanation": "Cấu trúc động từ + giới từ 'to' phù hợp."
      },
      {
        "id": 4,
        "text": "Question 4",
        "options": [
          "make",
          "take",
          "do",
          "have"
        ],
        "correct": 1,
        "category": "collocation",
        "explanation": "'Take action/measures' là collocation chuẩn."
      },
      {
        "id": 5,
        "text": "Question 5",
        "options": [
          "monitor",
          "monitoring",
          "to monitor",
          "monitored"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing trong mệnh đề quan hệ rút gọn."
      },
      {
        "id": 6,
        "text": "Question 6",
        "options": [
          "approaches",
          "methodologies",
          "curricula",
          "techniques"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "Chọn danh từ phù hợp với ngữ cảnh."
      },
      {
        "id": 7,
        "text": "Question 7",
        "options": [
          "appreciate",
          "acknowledge",
          "perceive",
          "recognize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "Chọn động từ phù hợp với ngữ cảnh nhận thức."
      },
      {
        "id": 8,
        "text": "Question 8",
        "options": [
          "amount",
          "number",
          "quantity",
          "volume"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Amount' dùng với danh từ không đếm được."
      },
      {
        "id": 9,
        "text": "Question 9",
        "options": [
          "to operate",
          "operating",
          "operated",
          "operate"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing sau 'are' trong thì tiếp diễn."
      },
      {
        "id": 10,
        "text": "Question 10",
        "options": [
          "cutting-edge specialized ambitious",
          "specialized ambitious cutting-edge",
          "ambitious cutting-edge specialized",
          "ambitious specialized cutting-edge"
        ],
        "correct": 2,
        "category": "adjective-order",
        "explanation": "Thứ tự tính từ: opinion → quality → type."
      },
      {
        "id": 11,
        "text": "Question 11",
        "options": [
          "pick up",
          "take over",
          "put forward",
          "bring about"
        ],
        "correct": 0,
        "category": "phrasal-verb",
        "explanation": "'Pick up' = tiếp thu, học được nhanh chóng."
      },
      {
        "id": 12,
        "text": "Question 12",
        "options": [
          "Few",
          "A few",
          "Little",
          "A little"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'Few' mang nghĩa phủ định với danh từ đếm được."
      },
      {
        "id": 13,
        "text": "Q13: Arrange the formal letter.",
        "options": [
          "a–b–c–d–e",
          "b–a–d–c–e",
          "a–c–b–d–e",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Thứ tự: cảm ơn → vấn đề → chi tiết → giải thích → kết thúc."
      },
      {
        "id": 14,
        "text": "Q14: Arrange the academic paragraph.",
        "options": [
          "a–b–c–d–e",
          "b–d–a–c–e",
          "b–a–c–e–d",
          "d–b–a–c–e"
        ],
        "correct": 0,
        "category": "arrangement",
        "explanation": "Thứ tự logic của đoạn văn học thuật."
      },
      {
        "id": 15,
        "text": "Q15: Arrange the dialogue.",
        "options": [
          "a–b–c",
          "b–a–c",
          "c–b–a",
          "b–c–a"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Giới thiệu → hỏi → trả lời."
      },
      {
        "id": 16,
        "text": "Q16: Arrange the passage.",
        "options": [
          "a–b–c–d–e",
          "c–a–b–e–d",
          "a–c–b–e–d",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Truyền thống → đổi mới → hứa hẹn → nếu thành công → thách thức."
      },
      {
        "id": 17,
        "text": "Q17: Arrange the debate.",
        "options": [
          "a–b–c–d–e",
          "a–d–e–b–c",
          "d–a–b–e–c",
          "a–b–d–c–e"
        ],
        "correct": 3,
        "category": "arrangement",
        "explanation": "Nêu vấn đề → đồng ý → hỏi giải pháp → nhấn mạnh → đề xuất."
      },
      {
        "id": 18,
        "text": "Q18: Choose correct grammar.",
        "options": [
          "Developed through research, this framework provides solutions",
          "This framework, which developing, provides solutions",
          "Having this framework developed, solutions were provided",
          "Research developing, this framework provides solutions"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Phân từ quá khứ rút gọn đúng ngữ pháp."
      },
      {
        "id": 19,
        "text": "Q19: Choose correct sentence.",
        "options": [
          "Researchers who conducted experiments have published findings",
          "Experiments having conducted by researchers published findings",
          "Findings have been conducted by researchers who participating",
          "The researchers conducting experiments has published findings"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Mệnh đề quan hệ + thì hoàn thành đúng."
      },
      {
        "id": 20,
        "text": "Q20: Choose correct transition.",
        "options": [
          "In response to these concerns",
          "Responded to these concerns",
          "These concerns having been responded",
          "Having responded to these concerns"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'In response to...' - cụm giới từ phù hợp."
      },
      {
        "id": 21,
        "text": "Q21: Choose correct clause.",
        "options": [
          "the rapid advancement creates new challenges",
          "technology rapidly advancing creates challenges",
          "it will rapidly advance creating challenges",
          "the rapidly technology creates challenges"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Cấu trúc chủ-vị đúng: 'the rapid advancement... creates...'"
      },
      {
        "id": 22,
        "text": "Q22: Choose best conclusion.",
        "options": [
          "Future developments will undoubtedly reshape our understanding",
          "Our understanding will hardly be reshaped",
          "Future developments reshaping, the subject undoubtedly",
          "It is undoubtedly that developments will reshape"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Câu A đúng ngữ pháp, nghĩa kết luận phù hợp."
      },
      {
        "id": 23,
        "text": "Which best paraphrases the underlined sentence?",
        "options": [
          "Initial investigations produced temporary results.",
          "What began as preliminary research became a comprehensive field.",
          "Research changed permanently due to experiments.",
          "Preliminary research evolved into permanent methodology."
        ],
        "correct": 1,
        "category": "reading-paraphrase",
        "explanation": "Câu B diễn đạt chính xác nhất."
      },
      {
        "id": 24,
        "text": "Which is NOT mentioned as a challenge?",
        "options": [
          "Funding limitations",
          "Ethical concerns",
          "Regulatory barriers",
          "Language barriers"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Language barriers' không được đề cập."
      },
      {
        "id": 25,
        "text": "'sophisticated' can be replaced by:",
        "options": [
          "complex",
          "simple",
          "basic",
          "ordinary"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Sophisticated' ≈ 'complex' = phức tạp, tinh vi."
      },
      {
        "id": 26,
        "text": "'enhance' is opposite to:",
        "options": [
          "improve",
          "diminish",
          "maintain",
          "stabilize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Enhance' ↔ 'Diminish'."
      },
      {
        "id": 27,
        "text": "'which' refers to:",
        "options": [
          "methods",
          "systems",
          "challenges",
          "approaches"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'Systems which enable...'"
      },
      {
        "id": 28,
        "text": "Which is TRUE?",
        "options": [
          "All methodologies produce identical results.",
          "Different approaches yield varying effectiveness.",
          "Traditional methods are always superior.",
          "All problems have been solved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Bài nêu nhiều cách tiếp cận khác nhau với hiệu quả khác nhau."
      },
      {
        "id": 29,
        "text": "Which paragraph discusses applications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 2,
        "category": "reading-detail",
        "explanation": "Đoạn 3 bàn về ứng dụng thực tiễn."
      },
      {
        "id": 30,
        "text": "Which paragraph mentions future implications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "Đoạn 4 bàn về tương lai và hàm ý."
      },
      {
        "id": 31,
        "text": "Where does the sentence best fit?",
        "options": [
          "[I]",
          "[II]",
          "[III]",
          "[IV]"
        ],
        "correct": 3,
        "category": "reading-insertion",
        "explanation": "[IV] - tổng kết ý chính của đoạn mở đầu."
      },
      {
        "id": 32,
        "text": "Which is NOT mentioned in paragraph 2?",
        "options": [
          "Economic factors",
          "Social implications",
          "Political considerations",
          "Military applications"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Military applications' không được đề cập."
      },
      {
        "id": 33,
        "text": "Which best summarises the main argument?",
        "options": [
          "A single perspective dominates.",
          "Multiple factors contribute to a complex phenomenon.",
          "Historical approaches are most effective.",
          "Technology solved all problems."
        ],
        "correct": 1,
        "category": "reading-summary",
        "explanation": "Multiple factors + complex + evolving."
      },
      {
        "id": 34,
        "text": "'these' refers to:",
        "options": [
          "organizations",
          "challenges",
          "methods",
          "frameworks"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'These challenges' chỉ các thách thức trước đó."
      },
      {
        "id": 35,
        "text": "'facilitate' is opposite to:",
        "options": [
          "enable",
          "impede",
          "accelerate",
          "promote"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Facilitate' ↔ 'Impede'."
      },
      {
        "id": 36,
        "text": "Which best paraphrases the highlighted sentence?",
        "options": [
          "Current approaches must adapt to address emerging challenges.",
          "Traditional methods remain sufficient.",
          "Adaptation is unnecessary.",
          "Challenges have been fully addressed."
        ],
        "correct": 0,
        "category": "reading-paraphrase",
        "explanation": "Must adapt → emerging challenges."
      },
      {
        "id": 37,
        "text": "'integral' mostly means:",
        "options": [
          "optional",
          "essential",
          "peripheral",
          "minimal"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Integral' = thiết yếu ≈ 'essential'."
      },
      {
        "id": 38,
        "text": "Which is TRUE?",
        "options": [
          "Only one approach works.",
          "Multiple perspectives contribute to understanding.",
          "Historical research is irrelevant.",
          "The topic is fully resolved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Nhiều quan điểm và cách tiếp cận khác nhau."
      },
      {
        "id": 39,
        "text": "What can be inferred?",
        "options": [
          "The field will remain unchanged.",
          "Continued research and collaboration are necessary.",
          "Individual efforts are sufficient.",
          "Past achievements eliminated further study need."
        ],
        "correct": 1,
        "category": "reading-inference",
        "explanation": "Cần nghiên cứu + hợp tác → tiến bộ."
      },
      {
        "id": 40,
        "text": "Which best summarises the passage?",
        "options": [
          "Complex phenomenon examined through multiple perspectives with ongoing challenges requiring collaborative solutions.",
          "Focuses exclusively on technological solutions.",
          "Argues for superiority of traditional approaches.",
          "Topic fully resolved by contemporary research."
        ],
        "correct": 0,
        "category": "reading-summary",
        "explanation": "Câu A toàn diện nhất."
      }
    ]
  },
  {
    "id": "thpt-08",
    "title": "Đề thi thử số 08",
    "titleEn": "Practice Test 08",
    "code": "1126",
    "duration": 50,
    "totalQuestions": 40,
    "passages": [
      {
        "id": "thpt-08-p1",
        "title": "Cultural Appropriation",
        "text": "Passage about Cultural Appropriation.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-08-p2",
        "title": "Multicultural Identity",
        "text": "Passage about Multicultural Identity.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-08-p3",
        "title": "Cross-Cultural Communication",
        "text": "Passage about Cross-Cultural Communication.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-08-p4",
        "title": "Social Psychology",
        "text": "Passage about Social Psychology.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-08-p5",
        "title": "Identity Politics",
        "text": "Passage about Identity Politics.",
        "questionRange": [
          31,
          40
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "text": "Question 1",
        "options": [
          "contentious",
          "contention",
          "contend",
          "contending"
        ],
        "correct": 0,
        "category": "word-form",
        "explanation": "Chọn từ loại đúng (tính từ/trạng từ/danh từ) phù hợp với vị trí trong câu."
      },
      {
        "id": 2,
        "text": "Question 2",
        "options": [
          "consequently",
          "notwithstanding",
          "thereby",
          "nevertheless"
        ],
        "correct": 2,
        "category": "connector",
        "explanation": "Chọn từ nối phù hợp với logic ngữ cảnh."
      },
      {
        "id": 3,
        "text": "Question 3",
        "options": [
          "toward",
          "to",
          "with",
          "into"
        ],
        "correct": 1,
        "category": "preposition",
        "explanation": "Cấu trúc động từ + giới từ 'to' phù hợp."
      },
      {
        "id": 4,
        "text": "Question 4",
        "options": [
          "make",
          "take",
          "do",
          "have"
        ],
        "correct": 1,
        "category": "collocation",
        "explanation": "'Take action/measures' là collocation chuẩn."
      },
      {
        "id": 5,
        "text": "Question 5",
        "options": [
          "monitor",
          "monitoring",
          "to monitor",
          "monitored"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing trong mệnh đề quan hệ rút gọn."
      },
      {
        "id": 6,
        "text": "Question 6",
        "options": [
          "approaches",
          "methodologies",
          "curricula",
          "techniques"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "Chọn danh từ phù hợp với ngữ cảnh."
      },
      {
        "id": 7,
        "text": "Question 7",
        "options": [
          "appreciate",
          "acknowledge",
          "perceive",
          "recognize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "Chọn động từ phù hợp với ngữ cảnh nhận thức."
      },
      {
        "id": 8,
        "text": "Question 8",
        "options": [
          "amount",
          "number",
          "quantity",
          "volume"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Amount' dùng với danh từ không đếm được."
      },
      {
        "id": 9,
        "text": "Question 9",
        "options": [
          "to operate",
          "operating",
          "operated",
          "operate"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing sau 'are' trong thì tiếp diễn."
      },
      {
        "id": 10,
        "text": "Question 10",
        "options": [
          "cutting-edge specialized ambitious",
          "specialized ambitious cutting-edge",
          "ambitious cutting-edge specialized",
          "ambitious specialized cutting-edge"
        ],
        "correct": 2,
        "category": "adjective-order",
        "explanation": "Thứ tự tính từ: opinion → quality → type."
      },
      {
        "id": 11,
        "text": "Question 11",
        "options": [
          "pick up",
          "take over",
          "put forward",
          "bring about"
        ],
        "correct": 0,
        "category": "phrasal-verb",
        "explanation": "'Pick up' = tiếp thu, học được nhanh chóng."
      },
      {
        "id": 12,
        "text": "Question 12",
        "options": [
          "Few",
          "A few",
          "Little",
          "A little"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'Few' mang nghĩa phủ định với danh từ đếm được."
      },
      {
        "id": 13,
        "text": "Q13: Arrange the formal letter.",
        "options": [
          "a–b–c–d–e",
          "b–a–d–c–e",
          "a–c–b–d–e",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Thứ tự: cảm ơn → vấn đề → chi tiết → giải thích → kết thúc."
      },
      {
        "id": 14,
        "text": "Q14: Arrange the academic paragraph.",
        "options": [
          "a–b–c–d–e",
          "b–d–a–c–e",
          "b–a–c–e–d",
          "d–b–a–c–e"
        ],
        "correct": 0,
        "category": "arrangement",
        "explanation": "Thứ tự logic của đoạn văn học thuật."
      },
      {
        "id": 15,
        "text": "Q15: Arrange the dialogue.",
        "options": [
          "a–b–c",
          "b–a–c",
          "c–b–a",
          "b–c–a"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Giới thiệu → hỏi → trả lời."
      },
      {
        "id": 16,
        "text": "Q16: Arrange the passage.",
        "options": [
          "a–b–c–d–e",
          "c–a–b–e–d",
          "a–c–b–e–d",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Truyền thống → đổi mới → hứa hẹn → nếu thành công → thách thức."
      },
      {
        "id": 17,
        "text": "Q17: Arrange the debate.",
        "options": [
          "a–b–c–d–e",
          "a–d–e–b–c",
          "d–a–b–e–c",
          "a–b–d–c–e"
        ],
        "correct": 3,
        "category": "arrangement",
        "explanation": "Nêu vấn đề → đồng ý → hỏi giải pháp → nhấn mạnh → đề xuất."
      },
      {
        "id": 18,
        "text": "Q18: Choose correct grammar.",
        "options": [
          "Developed through research, this framework provides solutions",
          "This framework, which developing, provides solutions",
          "Having this framework developed, solutions were provided",
          "Research developing, this framework provides solutions"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Phân từ quá khứ rút gọn đúng ngữ pháp."
      },
      {
        "id": 19,
        "text": "Q19: Choose correct sentence.",
        "options": [
          "Researchers who conducted experiments have published findings",
          "Experiments having conducted by researchers published findings",
          "Findings have been conducted by researchers who participating",
          "The researchers conducting experiments has published findings"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Mệnh đề quan hệ + thì hoàn thành đúng."
      },
      {
        "id": 20,
        "text": "Q20: Choose correct transition.",
        "options": [
          "In response to these concerns",
          "Responded to these concerns",
          "These concerns having been responded",
          "Having responded to these concerns"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'In response to...' - cụm giới từ phù hợp."
      },
      {
        "id": 21,
        "text": "Q21: Choose correct clause.",
        "options": [
          "the rapid advancement creates new challenges",
          "technology rapidly advancing creates challenges",
          "it will rapidly advance creating challenges",
          "the rapidly technology creates challenges"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Cấu trúc chủ-vị đúng: 'the rapid advancement... creates...'"
      },
      {
        "id": 22,
        "text": "Q22: Choose best conclusion.",
        "options": [
          "Future developments will undoubtedly reshape our understanding",
          "Our understanding will hardly be reshaped",
          "Future developments reshaping, the subject undoubtedly",
          "It is undoubtedly that developments will reshape"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Câu A đúng ngữ pháp, nghĩa kết luận phù hợp."
      },
      {
        "id": 23,
        "text": "Which best paraphrases the underlined sentence?",
        "options": [
          "Initial investigations produced temporary results.",
          "What began as preliminary research became a comprehensive field.",
          "Research changed permanently due to experiments.",
          "Preliminary research evolved into permanent methodology."
        ],
        "correct": 1,
        "category": "reading-paraphrase",
        "explanation": "Câu B diễn đạt chính xác nhất."
      },
      {
        "id": 24,
        "text": "Which is NOT mentioned as a challenge?",
        "options": [
          "Funding limitations",
          "Ethical concerns",
          "Regulatory barriers",
          "Language barriers"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Language barriers' không được đề cập."
      },
      {
        "id": 25,
        "text": "'sophisticated' can be replaced by:",
        "options": [
          "complex",
          "simple",
          "basic",
          "ordinary"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Sophisticated' ≈ 'complex' = phức tạp, tinh vi."
      },
      {
        "id": 26,
        "text": "'enhance' is opposite to:",
        "options": [
          "improve",
          "diminish",
          "maintain",
          "stabilize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Enhance' ↔ 'Diminish'."
      },
      {
        "id": 27,
        "text": "'which' refers to:",
        "options": [
          "methods",
          "systems",
          "challenges",
          "approaches"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'Systems which enable...'"
      },
      {
        "id": 28,
        "text": "Which is TRUE?",
        "options": [
          "All methodologies produce identical results.",
          "Different approaches yield varying effectiveness.",
          "Traditional methods are always superior.",
          "All problems have been solved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Bài nêu nhiều cách tiếp cận khác nhau với hiệu quả khác nhau."
      },
      {
        "id": 29,
        "text": "Which paragraph discusses applications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 2,
        "category": "reading-detail",
        "explanation": "Đoạn 3 bàn về ứng dụng thực tiễn."
      },
      {
        "id": 30,
        "text": "Which paragraph mentions future implications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "Đoạn 4 bàn về tương lai và hàm ý."
      },
      {
        "id": 31,
        "text": "Where does the sentence best fit?",
        "options": [
          "[I]",
          "[II]",
          "[III]",
          "[IV]"
        ],
        "correct": 3,
        "category": "reading-insertion",
        "explanation": "[IV] - tổng kết ý chính của đoạn mở đầu."
      },
      {
        "id": 32,
        "text": "Which is NOT mentioned in paragraph 2?",
        "options": [
          "Economic factors",
          "Social implications",
          "Political considerations",
          "Military applications"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Military applications' không được đề cập."
      },
      {
        "id": 33,
        "text": "Which best summarises the main argument?",
        "options": [
          "A single perspective dominates.",
          "Multiple factors contribute to a complex phenomenon.",
          "Historical approaches are most effective.",
          "Technology solved all problems."
        ],
        "correct": 1,
        "category": "reading-summary",
        "explanation": "Multiple factors + complex + evolving."
      },
      {
        "id": 34,
        "text": "'these' refers to:",
        "options": [
          "organizations",
          "challenges",
          "methods",
          "frameworks"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'These challenges' chỉ các thách thức trước đó."
      },
      {
        "id": 35,
        "text": "'facilitate' is opposite to:",
        "options": [
          "enable",
          "impede",
          "accelerate",
          "promote"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Facilitate' ↔ 'Impede'."
      },
      {
        "id": 36,
        "text": "Which best paraphrases the highlighted sentence?",
        "options": [
          "Current approaches must adapt to address emerging challenges.",
          "Traditional methods remain sufficient.",
          "Adaptation is unnecessary.",
          "Challenges have been fully addressed."
        ],
        "correct": 0,
        "category": "reading-paraphrase",
        "explanation": "Must adapt → emerging challenges."
      },
      {
        "id": 37,
        "text": "'integral' mostly means:",
        "options": [
          "optional",
          "essential",
          "peripheral",
          "minimal"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Integral' = thiết yếu ≈ 'essential'."
      },
      {
        "id": 38,
        "text": "Which is TRUE?",
        "options": [
          "Only one approach works.",
          "Multiple perspectives contribute to understanding.",
          "Historical research is irrelevant.",
          "The topic is fully resolved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Nhiều quan điểm và cách tiếp cận khác nhau."
      },
      {
        "id": 39,
        "text": "What can be inferred?",
        "options": [
          "The field will remain unchanged.",
          "Continued research and collaboration are necessary.",
          "Individual efforts are sufficient.",
          "Past achievements eliminated further study need."
        ],
        "correct": 1,
        "category": "reading-inference",
        "explanation": "Cần nghiên cứu + hợp tác → tiến bộ."
      },
      {
        "id": 40,
        "text": "Which best summarises the passage?",
        "options": [
          "Complex phenomenon examined through multiple perspectives with ongoing challenges requiring collaborative solutions.",
          "Focuses exclusively on technological solutions.",
          "Argues for superiority of traditional approaches.",
          "Topic fully resolved by contemporary research."
        ],
        "correct": 0,
        "category": "reading-summary",
        "explanation": "Câu A toàn diện nhất."
      }
    ]
  },
  {
    "id": "thpt-09",
    "title": "Đề thi thử số 09",
    "titleEn": "Practice Test 09",
    "code": "1126",
    "duration": 50,
    "totalQuestions": 40,
    "passages": [
      {
        "id": "thpt-09-p1",
        "title": "Postmodern Identity",
        "text": "Passage about Postmodern Identity.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-09-p2",
        "title": "Intergenerational Dynamics",
        "text": "Passage about Intergenerational Dynamics.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-09-p3",
        "title": "Digital Society",
        "text": "Passage about Digital Society.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-09-p4",
        "title": "Philosophy of Mind",
        "text": "Passage about Philosophy of Mind.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-09-p5",
        "title": "Social Theory",
        "text": "Passage about Social Theory.",
        "questionRange": [
          31,
          40
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "text": "Question 1",
        "options": [
          "markedly",
          "severe",
          "discontinuity",
          "severance"
        ],
        "correct": 0,
        "category": "word-form",
        "explanation": "Chọn từ loại đúng (tính từ/trạng từ/danh từ) phù hợp với vị trí trong câu."
      },
      {
        "id": 2,
        "text": "Question 2",
        "options": [
          "thereby",
          "accordingly",
          "albeit",
          "conversely"
        ],
        "correct": 0,
        "category": "connector",
        "explanation": "Chọn từ nối phù hợp với logic ngữ cảnh."
      },
      {
        "id": 3,
        "text": "Question 3",
        "options": [
          "toward",
          "to",
          "with",
          "into"
        ],
        "correct": 1,
        "category": "preposition",
        "explanation": "Cấu trúc động từ + giới từ 'to' phù hợp."
      },
      {
        "id": 4,
        "text": "Question 4",
        "options": [
          "make",
          "take",
          "do",
          "have"
        ],
        "correct": 1,
        "category": "collocation",
        "explanation": "'Take action/measures' là collocation chuẩn."
      },
      {
        "id": 5,
        "text": "Question 5",
        "options": [
          "monitor",
          "monitoring",
          "to monitor",
          "monitored"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing trong mệnh đề quan hệ rút gọn."
      },
      {
        "id": 6,
        "text": "Question 6",
        "options": [
          "approaches",
          "methodologies",
          "curricula",
          "techniques"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "Chọn danh từ phù hợp với ngữ cảnh."
      },
      {
        "id": 7,
        "text": "Question 7",
        "options": [
          "appreciate",
          "acknowledge",
          "perceive",
          "recognize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "Chọn động từ phù hợp với ngữ cảnh nhận thức."
      },
      {
        "id": 8,
        "text": "Question 8",
        "options": [
          "amount",
          "number",
          "quantity",
          "volume"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Amount' dùng với danh từ không đếm được."
      },
      {
        "id": 9,
        "text": "Question 9",
        "options": [
          "to operate",
          "operating",
          "operated",
          "operate"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing sau 'are' trong thì tiếp diễn."
      },
      {
        "id": 10,
        "text": "Question 10",
        "options": [
          "cutting-edge specialized ambitious",
          "specialized ambitious cutting-edge",
          "ambitious cutting-edge specialized",
          "ambitious specialized cutting-edge"
        ],
        "correct": 2,
        "category": "adjective-order",
        "explanation": "Thứ tự tính từ: opinion → quality → type."
      },
      {
        "id": 11,
        "text": "Question 11",
        "options": [
          "pick up",
          "take over",
          "put forward",
          "bring about"
        ],
        "correct": 0,
        "category": "phrasal-verb",
        "explanation": "'Pick up' = tiếp thu, học được nhanh chóng."
      },
      {
        "id": 12,
        "text": "Question 12",
        "options": [
          "Few",
          "A few",
          "Little",
          "A little"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'Few' mang nghĩa phủ định với danh từ đếm được."
      },
      {
        "id": 13,
        "text": "Q13: Arrange the formal letter.",
        "options": [
          "a–b–c–d–e",
          "b–a–d–c–e",
          "a–c–b–d–e",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Thứ tự: cảm ơn → vấn đề → chi tiết → giải thích → kết thúc."
      },
      {
        "id": 14,
        "text": "Q14: Arrange the academic paragraph.",
        "options": [
          "a–b–c–d–e",
          "b–d–a–c–e",
          "b–a–c–e–d",
          "d–b–a–c–e"
        ],
        "correct": 0,
        "category": "arrangement",
        "explanation": "Thứ tự logic của đoạn văn học thuật."
      },
      {
        "id": 15,
        "text": "Q15: Arrange the dialogue.",
        "options": [
          "a–b–c",
          "b–a–c",
          "c–b–a",
          "b–c–a"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Giới thiệu → hỏi → trả lời."
      },
      {
        "id": 16,
        "text": "Q16: Arrange the passage.",
        "options": [
          "a–b–c–d–e",
          "c–a–b–e–d",
          "a–c–b–e–d",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Truyền thống → đổi mới → hứa hẹn → nếu thành công → thách thức."
      },
      {
        "id": 17,
        "text": "Q17: Arrange the debate.",
        "options": [
          "a–b–c–d–e",
          "a–d–e–b–c",
          "d–a–b–e–c",
          "a–b–d–c–e"
        ],
        "correct": 3,
        "category": "arrangement",
        "explanation": "Nêu vấn đề → đồng ý → hỏi giải pháp → nhấn mạnh → đề xuất."
      },
      {
        "id": 18,
        "text": "Q18: Choose correct grammar.",
        "options": [
          "Developed through research, this framework provides solutions",
          "This framework, which developing, provides solutions",
          "Having this framework developed, solutions were provided",
          "Research developing, this framework provides solutions"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Phân từ quá khứ rút gọn đúng ngữ pháp."
      },
      {
        "id": 19,
        "text": "Q19: Choose correct sentence.",
        "options": [
          "Researchers who conducted experiments have published findings",
          "Experiments having conducted by researchers published findings",
          "Findings have been conducted by researchers who participating",
          "The researchers conducting experiments has published findings"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Mệnh đề quan hệ + thì hoàn thành đúng."
      },
      {
        "id": 20,
        "text": "Q20: Choose correct transition.",
        "options": [
          "In response to these concerns",
          "Responded to these concerns",
          "These concerns having been responded",
          "Having responded to these concerns"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'In response to...' - cụm giới từ phù hợp."
      },
      {
        "id": 21,
        "text": "Q21: Choose correct clause.",
        "options": [
          "the rapid advancement creates new challenges",
          "technology rapidly advancing creates challenges",
          "it will rapidly advance creating challenges",
          "the rapidly technology creates challenges"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Cấu trúc chủ-vị đúng: 'the rapid advancement... creates...'"
      },
      {
        "id": 22,
        "text": "Q22: Choose best conclusion.",
        "options": [
          "Future developments will undoubtedly reshape our understanding",
          "Our understanding will hardly be reshaped",
          "Future developments reshaping, the subject undoubtedly",
          "It is undoubtedly that developments will reshape"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Câu A đúng ngữ pháp, nghĩa kết luận phù hợp."
      },
      {
        "id": 23,
        "text": "Which best paraphrases the underlined sentence?",
        "options": [
          "Initial investigations produced temporary results.",
          "What began as preliminary research became a comprehensive field.",
          "Research changed permanently due to experiments.",
          "Preliminary research evolved into permanent methodology."
        ],
        "correct": 1,
        "category": "reading-paraphrase",
        "explanation": "Câu B diễn đạt chính xác nhất."
      },
      {
        "id": 24,
        "text": "Which is NOT mentioned as a challenge?",
        "options": [
          "Funding limitations",
          "Ethical concerns",
          "Regulatory barriers",
          "Language barriers"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Language barriers' không được đề cập."
      },
      {
        "id": 25,
        "text": "'sophisticated' can be replaced by:",
        "options": [
          "complex",
          "simple",
          "basic",
          "ordinary"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Sophisticated' ≈ 'complex' = phức tạp, tinh vi."
      },
      {
        "id": 26,
        "text": "'enhance' is opposite to:",
        "options": [
          "improve",
          "diminish",
          "maintain",
          "stabilize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Enhance' ↔ 'Diminish'."
      },
      {
        "id": 27,
        "text": "'which' refers to:",
        "options": [
          "methods",
          "systems",
          "challenges",
          "approaches"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'Systems which enable...'"
      },
      {
        "id": 28,
        "text": "Which is TRUE?",
        "options": [
          "All methodologies produce identical results.",
          "Different approaches yield varying effectiveness.",
          "Traditional methods are always superior.",
          "All problems have been solved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Bài nêu nhiều cách tiếp cận khác nhau với hiệu quả khác nhau."
      },
      {
        "id": 29,
        "text": "Which paragraph discusses applications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 2,
        "category": "reading-detail",
        "explanation": "Đoạn 3 bàn về ứng dụng thực tiễn."
      },
      {
        "id": 30,
        "text": "Which paragraph mentions future implications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "Đoạn 4 bàn về tương lai và hàm ý."
      },
      {
        "id": 31,
        "text": "Where does the sentence best fit?",
        "options": [
          "[I]",
          "[II]",
          "[III]",
          "[IV]"
        ],
        "correct": 3,
        "category": "reading-insertion",
        "explanation": "[IV] - tổng kết ý chính của đoạn mở đầu."
      },
      {
        "id": 32,
        "text": "Which is NOT mentioned in paragraph 2?",
        "options": [
          "Economic factors",
          "Social implications",
          "Political considerations",
          "Military applications"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Military applications' không được đề cập."
      },
      {
        "id": 33,
        "text": "Which best summarises the main argument?",
        "options": [
          "A single perspective dominates.",
          "Multiple factors contribute to a complex phenomenon.",
          "Historical approaches are most effective.",
          "Technology solved all problems."
        ],
        "correct": 1,
        "category": "reading-summary",
        "explanation": "Multiple factors + complex + evolving."
      },
      {
        "id": 34,
        "text": "'these' refers to:",
        "options": [
          "organizations",
          "challenges",
          "methods",
          "frameworks"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'These challenges' chỉ các thách thức trước đó."
      },
      {
        "id": 35,
        "text": "'facilitate' is opposite to:",
        "options": [
          "enable",
          "impede",
          "accelerate",
          "promote"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Facilitate' ↔ 'Impede'."
      },
      {
        "id": 36,
        "text": "Which best paraphrases the highlighted sentence?",
        "options": [
          "Current approaches must adapt to address emerging challenges.",
          "Traditional methods remain sufficient.",
          "Adaptation is unnecessary.",
          "Challenges have been fully addressed."
        ],
        "correct": 0,
        "category": "reading-paraphrase",
        "explanation": "Must adapt → emerging challenges."
      },
      {
        "id": 37,
        "text": "'integral' mostly means:",
        "options": [
          "optional",
          "essential",
          "peripheral",
          "minimal"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Integral' = thiết yếu ≈ 'essential'."
      },
      {
        "id": 38,
        "text": "Which is TRUE?",
        "options": [
          "Only one approach works.",
          "Multiple perspectives contribute to understanding.",
          "Historical research is irrelevant.",
          "The topic is fully resolved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Nhiều quan điểm và cách tiếp cận khác nhau."
      },
      {
        "id": 39,
        "text": "What can be inferred?",
        "options": [
          "The field will remain unchanged.",
          "Continued research and collaboration are necessary.",
          "Individual efforts are sufficient.",
          "Past achievements eliminated further study need."
        ],
        "correct": 1,
        "category": "reading-inference",
        "explanation": "Cần nghiên cứu + hợp tác → tiến bộ."
      },
      {
        "id": 40,
        "text": "Which best summarises the passage?",
        "options": [
          "Complex phenomenon examined through multiple perspectives with ongoing challenges requiring collaborative solutions.",
          "Focuses exclusively on technological solutions.",
          "Argues for superiority of traditional approaches.",
          "Topic fully resolved by contemporary research."
        ],
        "correct": 0,
        "category": "reading-summary",
        "explanation": "Câu A toàn diện nhất."
      }
    ]
  },
  {
    "id": "thpt-10",
    "title": "Đề thi thử số 10",
    "titleEn": "Practice Test 10",
    "code": "1126",
    "duration": 50,
    "totalQuestions": 40,
    "passages": [
      {
        "id": "thpt-10-p1",
        "title": "Individualistic Consciousness",
        "text": "Passage about Individualistic Consciousness.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-10-p2",
        "title": "Democratic Governance",
        "text": "Passage about Democratic Governance.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-10-p3",
        "title": "Digital Democracy",
        "text": "Passage about Digital Democracy.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-10-p4",
        "title": "Political Philosophy",
        "text": "Passage about Political Philosophy.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-10-p5",
        "title": "Social Fragmentation",
        "text": "Passage about Social Fragmentation.",
        "questionRange": [
          31,
          40
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "text": "Question 1",
        "options": [
          "exponential",
          "magnitude",
          "reconcilable",
          "amplification"
        ],
        "correct": 0,
        "category": "word-form",
        "explanation": "Chọn từ loại đúng (tính từ/trạng từ/danh từ) phù hợp với vị trí trong câu."
      },
      {
        "id": 2,
        "text": "Question 2",
        "options": [
          "subsequently",
          "nevertheless",
          "consequently",
          "furthermore"
        ],
        "correct": 2,
        "category": "connector",
        "explanation": "Chọn từ nối phù hợp với logic ngữ cảnh."
      },
      {
        "id": 3,
        "text": "Question 3",
        "options": [
          "toward",
          "to",
          "with",
          "into"
        ],
        "correct": 1,
        "category": "preposition",
        "explanation": "Cấu trúc động từ + giới từ 'to' phù hợp."
      },
      {
        "id": 4,
        "text": "Question 4",
        "options": [
          "make",
          "take",
          "do",
          "have"
        ],
        "correct": 1,
        "category": "collocation",
        "explanation": "'Take action/measures' là collocation chuẩn."
      },
      {
        "id": 5,
        "text": "Question 5",
        "options": [
          "monitor",
          "monitoring",
          "to monitor",
          "monitored"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing trong mệnh đề quan hệ rút gọn."
      },
      {
        "id": 6,
        "text": "Question 6",
        "options": [
          "approaches",
          "methodologies",
          "curricula",
          "techniques"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "Chọn danh từ phù hợp với ngữ cảnh."
      },
      {
        "id": 7,
        "text": "Question 7",
        "options": [
          "appreciate",
          "acknowledge",
          "perceive",
          "recognize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "Chọn động từ phù hợp với ngữ cảnh nhận thức."
      },
      {
        "id": 8,
        "text": "Question 8",
        "options": [
          "amount",
          "number",
          "quantity",
          "volume"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Amount' dùng với danh từ không đếm được."
      },
      {
        "id": 9,
        "text": "Question 9",
        "options": [
          "to operate",
          "operating",
          "operated",
          "operate"
        ],
        "correct": 1,
        "category": "grammar",
        "explanation": "V-ing sau 'are' trong thì tiếp diễn."
      },
      {
        "id": 10,
        "text": "Question 10",
        "options": [
          "cutting-edge specialized ambitious",
          "specialized ambitious cutting-edge",
          "ambitious cutting-edge specialized",
          "ambitious specialized cutting-edge"
        ],
        "correct": 2,
        "category": "adjective-order",
        "explanation": "Thứ tự tính từ: opinion → quality → type."
      },
      {
        "id": 11,
        "text": "Question 11",
        "options": [
          "pick up",
          "take over",
          "put forward",
          "bring about"
        ],
        "correct": 0,
        "category": "phrasal-verb",
        "explanation": "'Pick up' = tiếp thu, học được nhanh chóng."
      },
      {
        "id": 12,
        "text": "Question 12",
        "options": [
          "Few",
          "A few",
          "Little",
          "A little"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'Few' mang nghĩa phủ định với danh từ đếm được."
      },
      {
        "id": 13,
        "text": "Q13: Arrange the formal letter.",
        "options": [
          "a–b–c–d–e",
          "b–a–d–c–e",
          "a–c–b–d–e",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Thứ tự: cảm ơn → vấn đề → chi tiết → giải thích → kết thúc."
      },
      {
        "id": 14,
        "text": "Q14: Arrange the academic paragraph.",
        "options": [
          "a–b–c–d–e",
          "b–d–a–c–e",
          "b–a–c–e–d",
          "d–b–a–c–e"
        ],
        "correct": 0,
        "category": "arrangement",
        "explanation": "Thứ tự logic của đoạn văn học thuật."
      },
      {
        "id": 15,
        "text": "Q15: Arrange the dialogue.",
        "options": [
          "a–b–c",
          "b–a–c",
          "c–b–a",
          "b–c–a"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Giới thiệu → hỏi → trả lời."
      },
      {
        "id": 16,
        "text": "Q16: Arrange the passage.",
        "options": [
          "a–b–c–d–e",
          "c–a–b–e–d",
          "a–c–b–e–d",
          "c–b–a–d–e"
        ],
        "correct": 1,
        "category": "arrangement",
        "explanation": "Truyền thống → đổi mới → hứa hẹn → nếu thành công → thách thức."
      },
      {
        "id": 17,
        "text": "Q17: Arrange the debate.",
        "options": [
          "a–b–c–d–e",
          "a–d–e–b–c",
          "d–a–b–e–c",
          "a–b–d–c–e"
        ],
        "correct": 3,
        "category": "arrangement",
        "explanation": "Nêu vấn đề → đồng ý → hỏi giải pháp → nhấn mạnh → đề xuất."
      },
      {
        "id": 18,
        "text": "Q18: Choose correct grammar.",
        "options": [
          "Developed through research, this framework provides solutions",
          "This framework, which developing, provides solutions",
          "Having this framework developed, solutions were provided",
          "Research developing, this framework provides solutions"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Phân từ quá khứ rút gọn đúng ngữ pháp."
      },
      {
        "id": 19,
        "text": "Q19: Choose correct sentence.",
        "options": [
          "Researchers who conducted experiments have published findings",
          "Experiments having conducted by researchers published findings",
          "Findings have been conducted by researchers who participating",
          "The researchers conducting experiments has published findings"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Mệnh đề quan hệ + thì hoàn thành đúng."
      },
      {
        "id": 20,
        "text": "Q20: Choose correct transition.",
        "options": [
          "In response to these concerns",
          "Responded to these concerns",
          "These concerns having been responded",
          "Having responded to these concerns"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "'In response to...' - cụm giới từ phù hợp."
      },
      {
        "id": 21,
        "text": "Q21: Choose correct clause.",
        "options": [
          "the rapid advancement creates new challenges",
          "technology rapidly advancing creates challenges",
          "it will rapidly advance creating challenges",
          "the rapidly technology creates challenges"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Cấu trúc chủ-vị đúng: 'the rapid advancement... creates...'"
      },
      {
        "id": 22,
        "text": "Q22: Choose best conclusion.",
        "options": [
          "Future developments will undoubtedly reshape our understanding",
          "Our understanding will hardly be reshaped",
          "Future developments reshaping, the subject undoubtedly",
          "It is undoubtedly that developments will reshape"
        ],
        "correct": 0,
        "category": "grammar",
        "explanation": "Câu A đúng ngữ pháp, nghĩa kết luận phù hợp."
      },
      {
        "id": 23,
        "text": "Which best paraphrases the underlined sentence?",
        "options": [
          "Initial investigations produced temporary results.",
          "What began as preliminary research became a comprehensive field.",
          "Research changed permanently due to experiments.",
          "Preliminary research evolved into permanent methodology."
        ],
        "correct": 1,
        "category": "reading-paraphrase",
        "explanation": "Câu B diễn đạt chính xác nhất."
      },
      {
        "id": 24,
        "text": "Which is NOT mentioned as a challenge?",
        "options": [
          "Funding limitations",
          "Ethical concerns",
          "Regulatory barriers",
          "Language barriers"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Language barriers' không được đề cập."
      },
      {
        "id": 25,
        "text": "'sophisticated' can be replaced by:",
        "options": [
          "complex",
          "simple",
          "basic",
          "ordinary"
        ],
        "correct": 0,
        "category": "vocabulary",
        "explanation": "'Sophisticated' ≈ 'complex' = phức tạp, tinh vi."
      },
      {
        "id": 26,
        "text": "'enhance' is opposite to:",
        "options": [
          "improve",
          "diminish",
          "maintain",
          "stabilize"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Enhance' ↔ 'Diminish'."
      },
      {
        "id": 27,
        "text": "'which' refers to:",
        "options": [
          "methods",
          "systems",
          "challenges",
          "approaches"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'Systems which enable...'"
      },
      {
        "id": 28,
        "text": "Which is TRUE?",
        "options": [
          "All methodologies produce identical results.",
          "Different approaches yield varying effectiveness.",
          "Traditional methods are always superior.",
          "All problems have been solved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Bài nêu nhiều cách tiếp cận khác nhau với hiệu quả khác nhau."
      },
      {
        "id": 29,
        "text": "Which paragraph discusses applications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 2,
        "category": "reading-detail",
        "explanation": "Đoạn 3 bàn về ứng dụng thực tiễn."
      },
      {
        "id": 30,
        "text": "Which paragraph mentions future implications?",
        "options": [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "Đoạn 4 bàn về tương lai và hàm ý."
      },
      {
        "id": 31,
        "text": "Where does the sentence best fit?",
        "options": [
          "[I]",
          "[II]",
          "[III]",
          "[IV]"
        ],
        "correct": 3,
        "category": "reading-insertion",
        "explanation": "[IV] - tổng kết ý chính của đoạn mở đầu."
      },
      {
        "id": 32,
        "text": "Which is NOT mentioned in paragraph 2?",
        "options": [
          "Economic factors",
          "Social implications",
          "Political considerations",
          "Military applications"
        ],
        "correct": 3,
        "category": "reading-detail",
        "explanation": "'Military applications' không được đề cập."
      },
      {
        "id": 33,
        "text": "Which best summarises the main argument?",
        "options": [
          "A single perspective dominates.",
          "Multiple factors contribute to a complex phenomenon.",
          "Historical approaches are most effective.",
          "Technology solved all problems."
        ],
        "correct": 1,
        "category": "reading-summary",
        "explanation": "Multiple factors + complex + evolving."
      },
      {
        "id": 34,
        "text": "'these' refers to:",
        "options": [
          "organizations",
          "challenges",
          "methods",
          "frameworks"
        ],
        "correct": 1,
        "category": "reference",
        "explanation": "'These challenges' chỉ các thách thức trước đó."
      },
      {
        "id": 35,
        "text": "'facilitate' is opposite to:",
        "options": [
          "enable",
          "impede",
          "accelerate",
          "promote"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Facilitate' ↔ 'Impede'."
      },
      {
        "id": 36,
        "text": "Which best paraphrases the highlighted sentence?",
        "options": [
          "Current approaches must adapt to address emerging challenges.",
          "Traditional methods remain sufficient.",
          "Adaptation is unnecessary.",
          "Challenges have been fully addressed."
        ],
        "correct": 0,
        "category": "reading-paraphrase",
        "explanation": "Must adapt → emerging challenges."
      },
      {
        "id": 37,
        "text": "'integral' mostly means:",
        "options": [
          "optional",
          "essential",
          "peripheral",
          "minimal"
        ],
        "correct": 1,
        "category": "vocabulary",
        "explanation": "'Integral' = thiết yếu ≈ 'essential'."
      },
      {
        "id": 38,
        "text": "Which is TRUE?",
        "options": [
          "Only one approach works.",
          "Multiple perspectives contribute to understanding.",
          "Historical research is irrelevant.",
          "The topic is fully resolved."
        ],
        "correct": 1,
        "category": "reading-detail",
        "explanation": "Nhiều quan điểm và cách tiếp cận khác nhau."
      },
      {
        "id": 39,
        "text": "What can be inferred?",
        "options": [
          "The field will remain unchanged.",
          "Continued research and collaboration are necessary.",
          "Individual efforts are sufficient.",
          "Past achievements eliminated further study need."
        ],
        "correct": 1,
        "category": "reading-inference",
        "explanation": "Cần nghiên cứu + hợp tác → tiến bộ."
      },
      {
        "id": 40,
        "text": "Which best summarises the passage?",
        "options": [
          "Complex phenomenon examined through multiple perspectives with ongoing challenges requiring collaborative solutions.",
          "Focuses exclusively on technological solutions.",
          "Argues for superiority of traditional approaches.",
          "Topic fully resolved by contemporary research."
        ],
        "correct": 0,
        "category": "reading-summary",
        "explanation": "Câu A toàn diện nhất."
      }
    ]
  }
];

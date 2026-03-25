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
        "text": "Quantum computing has (1) __________ revolutionized our understanding of computational science. The development of quantum processors, (2) __________, has opened new frontiers in data encryption and molecular simulation.\n\nResearchers have dedicated themselves (3) __________ solving problems that classical computers cannot handle. Major technology firms (4) __________ significant steps toward achieving quantum supremacy. New quantum algorithms are now (5) __________ performance in real-time. Traditional computing (6) __________ may soon be supplemented by quantum approaches.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-02-p2",
        "title": "Deep Space Exploration",
        "text": "Scientists are beginning to (7) __________ the vast potential of deep space exploration. Enormous (8) __________ of funding have been directed toward interstellar research programs. Engineers are currently (9) __________ next-generation propulsion systems in advanced laboratories.\n\nSpace agencies deploy (10) __________ telescopes to scan distant galaxies. Astronauts can quickly (11) __________ new survival techniques during extended missions. (12) __________ missions have successfully reached beyond our solar system.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-02-p3",
        "title": "Neural Interface Technology",
        "text": "Neural interface technology represents a breakthrough in human-computer interaction. (18) ___. Brain-computer interfaces translate neural signals into digital commands. (19) ___. (20) ___, scientists are developing safety protocols. The technology raises ethical questions because (21) ___. Despite uncertainties, clinical trials are expanding. (22) ___.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-02-p4",
        "title": "Vertical Farming Systems",
        "text": "Vertical farming has emerged as a revolutionary approach to sustainable agriculture. What initially began as experimental research has evolved into a comprehensive field of study.\n\nVertical farms offer numerous advantages. Sophisticated hydroponic systems enable year-round crop production regardless of external weather conditions. These controlled environments reduce water usage by up to 95 percent compared to traditional farming.\n\nPractical applications of vertical farming extend beyond food production. Pharmaceutical companies have begun cultivating medicinal plants in vertical systems, which enable precise control over growing conditions. Different approaches yield varying effectiveness depending on the crop type.\n\nFunding limitations and ethical concerns remain significant challenges. Nevertheless, future developments will undoubtedly reshape our understanding of food security. Current approaches must adapt to address emerging challenges in global nutrition.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-02-p5",
        "title": "Cognitive Enhancement Technology",
        "text": "[I] Cognitive enhancement technology has reached an unprecedented level of sophistication. [II] As these systems become increasingly integral to educational and professional settings, society must establish regulatory frameworks. [III] These challenges demand collaborative solutions. [IV]\n\nResearchers examine economic factors, social implications, and political considerations surrounding cognitive enhancement. These organizations face mounting pressure to balance innovation with accessibility.\n\nAlgorithmic bias in cognitive assessment tools is a pressing concern. Intelligence measurement systems have demonstrated cultural bias, while adaptive learning platforms show socioeconomic discrimination. These challenges can undermine the fundamental purpose of cognitive enhancement.\n\nPrivacy concerns compound these ethical dilemmas. Companies developing cognitive enhancement technologies collect unprecedented quantities of neurological data, creating detailed cognitive profiles that can predict and influence human performance.",
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
        "text": "Recent neuroscience has revealed (1) __________ insights into the brain's capacity for reorganization. New neural pathways form throughout life; (2) __________, targeted interventions can accelerate recovery after injury.\n\nTherapists have dedicated themselves (3) __________ helping patients regain lost cognitive functions. Clinicians (4) __________ decisive action when early symptoms appear. Rehabilitation programs are now (5) __________ patients' progress through advanced brain imaging. Various therapeutic (6) __________ have proven effective in promoting neural recovery.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-03-p2",
        "title": "Sustainable Architecture",
        "text": "Communities are beginning to (7) __________ the environmental benefits of green building design. A remarkable (8) __________ of energy can be saved through passive solar techniques. Architects are currently (9) __________ innovative insulation systems in prototype buildings.\n\nDesigners create (10) __________ structures that minimize carbon footprints. Students can easily (11) __________ sustainable design principles from experienced mentors. (12) __________ buildings achieve true carbon neutrality without significant investment.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-03-p3",
        "title": "Quantum Computing Principles",
        "text": "Quantum computing principles challenge classical assumptions about information processing. (18) ___. Superposition allows qubits to exist in multiple states simultaneously. (19) ___. (20) ___, engineers are developing error-correction protocols. The technology faces obstacles because (21) ___. Despite limitations, breakthroughs continue. (22) ___.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-03-p4",
        "title": "Epigenetics Research",
        "text": "Epigenetics has emerged as a transformative field in modern biology. What initially began as preliminary research has evolved into a comprehensive discipline.\n\nEpigenetic mechanisms offer new explanations for inherited traits. Sophisticated molecular tools enable researchers to track how environmental factors alter gene expression without changing DNA sequences.\n\nPractical applications extend beyond basic science. Pharmaceutical companies have begun developing epigenetic therapies, which enable targeted treatment of complex diseases. Different approaches yield varying effectiveness depending on the genetic background.\n\nFunding limitations and ethical concerns present ongoing challenges. Nevertheless, future developments will undoubtedly reshape our understanding of heredity. Current approaches must adapt to address emerging challenges in personalized medicine.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-03-p5",
        "title": "Dark Matter Cosmology",
        "text": "[I] Dark matter research has reached an unprecedented level of sophistication. [II] As detection methods become increasingly integral to astrophysics, the scientific community must establish new theoretical frameworks. [III] These challenges require interdisciplinary collaboration. [IV]\n\nPhysicists examine economic factors, social implications, and political considerations surrounding large-scale particle detectors. These organizations face pressure to justify enormous research expenditures.\n\nMethodological bias in dark matter detection is a pressing concern. Certain experimental designs have demonstrated systematic bias, while observational techniques show calibration limitations. These challenges can compromise the validity of cosmological models.\n\nTechnological constraints compound these scientific difficulties. Research teams developing next-generation detectors collect unprecedented quantities of cosmic data, creating detailed maps of gravitational anomalies that can predict and illuminate the structure of the universe.",
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
        "text": "Island tourism has become an (1) __________ important sector of the global economy. Coastal communities benefit enormously; (2) __________, sustainable practices are essential to preserve fragile ecosystems.\n\nGovernments have committed themselves (3) __________ protecting marine biodiversity while promoting tourism. Tour operators must (4) __________ decisive action to reduce environmental impact. Agencies are now (5) __________ visitor numbers at popular sites. Innovative management (6) __________ balance conservation with economic growth.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-04-p2",
        "title": "Plastic Recycling",
        "text": "Environmentalists are learning to (7) __________ the complexity of modern waste management. A significant (8) __________ of plastic waste remains unrecycled globally. Scientists are currently (9) __________ biodegradable alternatives in research facilities.\n\nCompanies develop (10) __________ solutions for plastic reduction. Communities can quickly (11) __________ recycling habits through education programs. (12) __________ municipalities have achieved zero-waste targets without substantial investment.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-04-p3",
        "title": "Environmental Policy",
        "text": "Environmental policy debates have intensified in recent decades. (18) ___. International agreements set binding emission targets for participating nations. (19) ___. (20) ___, governments are implementing carbon taxation. Environmental protection requires trade-offs because (21) ___. Despite political resistance, progress continues. (22) ___.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-04-p4",
        "title": "Ocean Conservation",
        "text": "Ocean conservation has emerged as one of the most critical environmental challenges. What initially began as local coastal protection has evolved into a global movement.\n\nMarine protected areas offer significant ecological benefits. Sophisticated monitoring systems enable scientists to track endangered species populations and coral reef health across vast ocean territories.\n\nPractical applications of marine technology extend beyond conservation. Biotechnology firms have begun harvesting marine organisms for pharmaceutical research, which enable development of novel antibiotics. Different approaches yield varying effectiveness depending on the marine ecosystem.\n\nFunding limitations and regulatory barriers remain significant challenges. Nevertheless, future developments will undoubtedly reshape our understanding of marine biodiversity. Current approaches must adapt to address emerging challenges in ocean governance.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-04-p5",
        "title": "Genetic Engineering",
        "text": "[I] Genetic engineering has reached an unprecedented level of sophistication. [II] As gene-editing tools become increasingly integral to agriculture and medicine, society must establish comprehensive ethical guidelines. [III] These challenges demand urgent attention. [IV]\n\nBioethicists examine economic factors, social implications, and political considerations surrounding genetic modification. These organizations face mounting pressure to balance scientific progress with public safety.\n\nMethodological bias in genetic research is a pressing concern. Clinical trials have demonstrated selection bias, while gene therapy protocols show unequal access across socioeconomic groups. These challenges can undermine public trust in genetic technologies.\n\nPrivacy concerns compound these ethical complexities. Companies developing genetic therapies collect unprecedented quantities of genomic data, creating detailed genetic profiles that can predict and influence individual health outcomes.",
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
        "text": "Rural communities are undergoing (1) __________ remarkable transformations across developing nations. Government subsidies help struggling villages; (2) __________, sustainable agriculture programs are essential for long-term prosperity.\n\nPolicymakers have dedicated themselves (3) __________ bridging the urban-rural divide. Local authorities must (4) __________ decisive action to attract investment. Organizations are now (5) __________ economic indicators in remote areas. Creative development (6) __________ revitalize declining agricultural communities.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-05-p2",
        "title": "Lifelong Learning",
        "text": "Educators are beginning to (7) __________ the transformative power of continuous education. An extraordinary (8) __________ of knowledge becomes obsolete within a decade. Adults are currently (9) __________ new digital literacy skills through online platforms.\n\nUniversities offer (10) __________ programs for working professionals. Learners can readily (11) __________ complex concepts through interactive simulations. (12) __________ institutions have successfully implemented fully flexible curricula.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-05-p3",
        "title": "Agricultural Innovation",
        "text": "Agricultural innovation promises to address global food security. (18) ___. Precision farming uses sensors and AI to optimize crop yields. (19) ___. (20) ___, researchers are developing drought-resistant varieties. Food production must increase because (21) ___. Despite resource constraints, innovations accelerate. (22) ___.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-05-p4",
        "title": "Digital Education",
        "text": "Digital education has emerged as a transformative force in global learning. What initially began as supplementary online courses has evolved into a comprehensive educational paradigm.\n\nVirtual classrooms offer unprecedented accessibility. Sophisticated learning management systems enable students from remote regions to access world-class instruction regardless of geographical limitations.\n\nPractical applications extend beyond traditional subjects. Technology companies have begun developing immersive virtual reality curricula, which enable experiential learning in sciences and engineering. Different approaches yield varying effectiveness depending on the subject matter.\n\nFunding limitations and digital equity concerns remain significant challenges. Nevertheless, future developments will undoubtedly reshape our understanding of education delivery. Current approaches must adapt to address emerging challenges in technological accessibility.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-05-p5",
        "title": "Economic Development",
        "text": "[I] Economic development theory has reached an unprecedented level of sophistication. [II] As globalization becomes increasingly integral to national prosperity, policymakers must establish adaptive regulatory frameworks. [III] These challenges require balanced strategies. [IV]\n\nEconomists examine structural factors, social implications, and political considerations surrounding trade liberalization. These organizations face pressure to balance growth with environmental sustainability.\n\nInequality in economic distribution is a pressing concern. Trade agreements have demonstrated bias toward developed nations, while development programs show limited effectiveness in the poorest regions. These challenges can perpetuate cycles of poverty.\n\nResource scarcity compounds these developmental obstacles. Nations pursuing rapid industrialization consume unprecedented quantities of natural resources, creating detailed economic profiles that can predict and influence global market dynamics.",
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
        "text": "The ethical implications of genome editing have become (1) __________ controversial in scientific circles. CRISPR technology enables precise genetic modifications; (2) __________, regulatory frameworks struggle to keep pace with innovation.\n\nBioethicists have committed themselves (3) __________ establishing guidelines for responsible gene therapy. Research institutions must (4) __________ decisive action to prevent misuse. Committees are now (5) __________ clinical trial protocols worldwide. Established ethical (6) __________ guide responsible scientific advancement.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-06-p2",
        "title": "Free Will & Neuroscience",
        "text": "Philosophers are starting to (7) __________ how neuroscience challenges traditional concepts of free will. A remarkable (8) __________ of evidence suggests that unconscious brain processes precede conscious decisions. Researchers are currently (9) __________ brain activity patterns during decision-making experiments.\n\nLaboratories employ (10) __________ techniques to study neural determinism. Students can rapidly (11) __________ philosophical arguments through structured debates. (12) __________ scholars accept a purely deterministic view of human behavior.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-06-p3",
        "title": "Bioethics",
        "text": "Bioethical dilemmas have multiplied with medical advances. (18) ___. Organ transplantation raises questions about consent and allocation fairness. (19) ___. (20) ___, hospitals are developing ethics committees. Medical progress creates moral tension because (21) ___. Despite disagreements, ethical frameworks evolve. (22) ___.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-06-p4",
        "title": "Climate Policy",
        "text": "Climate policy has emerged as the defining challenge of contemporary governance. What initially began as scientific warnings has evolved into a comprehensive political movement.\n\nInternational climate agreements offer binding emission reduction targets. Sophisticated atmospheric monitoring systems enable scientists to track greenhouse gas concentrations with unprecedented precision.\n\nPractical applications extend beyond environmental protection. Renewable energy companies have begun developing hydrogen fuel infrastructure, which enables decarbonization of heavy industries. Different approaches yield varying effectiveness depending on national energy profiles.\n\nFunding limitations and geopolitical tensions remain significant challenges. Nevertheless, future developments will undoubtedly reshape our understanding of environmental governance. Current approaches must adapt to address emerging challenges in climate justice.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-06-p5",
        "title": "Space Governance",
        "text": "[I] Space governance has reached an unprecedented level of complexity. [II] As commercial space activities become increasingly integral to global telecommunications, the international community must establish updated legal frameworks. [III] These challenges require multinational cooperation. [IV]\n\nLegal scholars examine economic factors, social implications, and political considerations surrounding space resource exploitation. These organizations face pressure to balance commercial interests with peaceful use of outer space.\n\nJurisdictional ambiguity in space law is a pressing concern. National space agencies have demonstrated conflicting territorial claims, while private companies show disregard for existing treaties. These challenges can escalate into international disputes.\n\nEnvironmental concerns compound these legal complexities. Corporations launching satellite constellations create unprecedented quantities of orbital debris, creating detailed risk profiles that can predict and influence future space exploration safety.",
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
        "text": "The preservation of cultural authenticity has become (1) __________ challenging in an era of rapid globalization. Traditional practices face erosion; (2) __________, communities are developing innovative preservation strategies.\n\nAnthropologists have dedicated themselves (3) __________ documenting endangered cultural traditions. Cultural institutions must (4) __________ decisive action to safeguard intangible heritage. Museums are now (5) __________ visitor engagement with indigenous artifacts. Traditional preservation (6) __________ combine technology with community participation.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-07-p2",
        "title": "Nuclear Family Structures",
        "text": "Sociologists are beginning to (7) __________ how family structures have transformed across generations. A significant (8) __________ of research focuses on single-parent households and blended families. Researchers are currently (9) __________ demographic shifts in family composition across cultures.\n\nUniversities conduct (10) __________ studies on modern family dynamics. Students can effectively (11) __________ sociological theories through case-study analysis. (12) __________ families conform to the traditional nuclear model in contemporary society.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-07-p3",
        "title": "Cultural Preservation",
        "text": "Cultural preservation efforts face unprecedented challenges in the digital age. (18) ___. UNESCO maintains a list of intangible cultural heritage requiring protection. (19) ___. (20) ___, governments are funding archival digitization projects. Heritage sites deteriorate because (21) ___. Despite limited budgets, preservation advances. (22) ___.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-07-p4",
        "title": "Migration Studies",
        "text": "Migration studies have emerged as a vital interdisciplinary field. What initially began as demographic record-keeping has evolved into a comprehensive analysis of human mobility.\n\nMigration research offers critical insights into population dynamics. Sophisticated tracking systems enable demographers to analyze movement patterns and their socioeconomic consequences across national borders.\n\nPractical applications extend beyond academic research. International organizations have begun developing predictive migration models, which enable governments to prepare adequate infrastructure and social services. Different approaches yield varying effectiveness depending on regional contexts.\n\nFunding limitations and political sensitivities remain significant challenges. Nevertheless, future developments will undoubtedly reshape our understanding of global mobility. Current approaches must adapt to address emerging challenges in refugee protection and integration.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-07-p5",
        "title": "Social Anthropology",
        "text": "[I] Social anthropology has reached an unprecedented level of methodological sophistication. [II] As ethnographic research becomes increasingly integral to policy development, academic institutions must establish rigorous ethical standards. [III] These challenges demand reflexive scholarship. [IV]\n\nResearchers examine economic factors, social implications, and political considerations surrounding fieldwork in vulnerable communities. These organizations face pressure to balance knowledge production with community welfare.\n\nPower dynamics in ethnographic research are a pressing concern. Western academic institutions have demonstrated neo-colonial bias, while research methodologies show limited representation of indigenous perspectives. These challenges can perpetuate epistemic inequality.\n\nConsent issues compound these methodological complexities. Anthropologists conducting long-term fieldwork collect unprecedented quantities of cultural data, creating detailed community profiles that can predict and influence development interventions.",
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
        "text": "Debates surrounding cultural appropriation have become (1) __________ heated in contemporary discourse. Fashion industries borrow from indigenous traditions; (2) __________, marginalized communities rarely receive acknowledgment or compensation.\n\nActivists have committed themselves (3) __________ raising awareness about exploitative practices. Cultural organizations must (4) __________ decisive action to establish fair attribution. Advocates are now (5) __________ corporate behavior regarding cultural borrowing. Established attribution (6) __________ promote respectful cross-cultural exchange.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-08-p2",
        "title": "Multicultural Identity",
        "text": "Young people are learning to (7) __________ the complexity of navigating multiple cultural identities. A growing (8) __________ of research explores bicultural and multicultural self-concepts. Psychologists are currently (9) __________ identity formation in children of immigrant families.\n\nResearch centers employ (10) __________ methods to study cultural identity. Individuals can successfully (11) __________ coping strategies from community support networks. (12) __________ people experience identity conflict when balancing multiple cultural affiliations.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-08-p3",
        "title": "Cross-Cultural Communication",
        "text": "Cross-cultural communication barriers persist in globalized workplaces. (18) ___. Non-verbal cues carry vastly different meanings across cultures. (19) ___. (20) ___, multinational corporations are investing in cultural intelligence training. Miscommunication occurs frequently because (21) ___. Despite awareness programs, challenges remain. (22) ___.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-08-p4",
        "title": "Social Psychology",
        "text": "Social psychology has emerged as a crucial field for understanding group behavior. What initially began as laboratory experiments has evolved into a comprehensive discipline examining real-world social phenomena.\n\nSocial psychology offers powerful explanatory frameworks. Sophisticated experimental designs enable researchers to isolate variables influencing conformity, obedience, and prejudice in controlled and naturalistic settings.\n\nPractical applications extend beyond academic inquiry. Corporate human resources departments have begun implementing behavioral nudge programs, which enable organizations to improve workplace culture. Different approaches yield varying effectiveness depending on organizational context.\n\nFunding limitations and replication concerns remain significant challenges. Nevertheless, future developments will undoubtedly reshape our understanding of collective human behavior. Current approaches must adapt to address emerging challenges in digital social interaction.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-08-p5",
        "title": "Identity Politics",
        "text": "[I] Identity politics has reached an unprecedented level of influence in democratic societies. [II] As intersectional frameworks become increasingly integral to social movements, political theorists must establish nuanced analytical models. [III] These challenges require careful deliberation. [IV]\n\nScholars examine economic factors, social implications, and political considerations surrounding identity-based advocacy. These organizations face pressure to balance group solidarity with universal democratic principles.\n\nRepresentation gaps in political institutions are a pressing concern. Electoral systems have demonstrated structural bias against minority candidates, while media coverage shows disproportionate negative framing. These challenges can deepen social polarization.\n\nAlgorithmic amplification compounds these political dynamics. Social media platforms generating unprecedented quantities of ideological content create detailed behavioral profiles that can predict and influence voter preferences and political mobilization.",
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
        "text": "Postmodern conceptions of identity have become (1) __________ influential in contemporary social sciences. Traditional categories are deconstructed; (2) __________, new theoretical frameworks emerge to explain fluid self-concepts.\n\nScholar have dedicated themselves (3) __________ exploring how identity is performed rather than fixed. Cultural theorists must (4) __________ decisive action to bridge academic theory with lived experience. Researchers are now (5) __________ narrative identity construction across digital platforms. Interdisciplinary (6) __________ enrich understanding of selfhood in late modernity.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-09-p2",
        "title": "Intergenerational Dynamics",
        "text": "Social scientists are starting to (7) __________ the profound impact of generational differences on workplace culture. A substantial (8) __________ of tension arises from divergent communication styles between Baby Boomers and Generation Z. Organizations are currently (9) __________ mentorship programs that bridge generational gaps.\n\nCompanies design (10) __________ initiatives to foster intergenerational collaboration. Younger employees can rapidly (11) __________ institutional knowledge from senior colleagues. (12) __________ organizations successfully integrate five distinct generations in the workplace.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-09-p3",
        "title": "Digital Society",
        "text": "Digital society fundamentally transforms human relationships and institutions. (18) ___. Social media algorithms curate personalized information environments. (19) ___. (20) ___, governments are drafting digital rights legislation. Online echo chambers intensify polarization because (21) ___. Despite regulatory efforts, digital disruption accelerates. (22) ___.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-09-p4",
        "title": "Philosophy of Mind",
        "text": "Philosophy of mind has emerged as an essential bridge between neuroscience and humanistic inquiry. What initially began as metaphysical speculation has evolved into a comprehensive interdisciplinary field.\n\nConsciousness studies offer provocative theoretical frameworks. Sophisticated neuroimaging technologies enable researchers to correlate subjective experience with measurable brain activity patterns.\n\nPractical applications extend beyond philosophical debate. Artificial intelligence developers have begun incorporating theories of consciousness into machine learning architectures, which enable more adaptive and context-sensitive algorithms. Different approaches yield varying effectiveness depending on the computational model.\n\nFunding limitations and methodological disputes remain significant challenges. Nevertheless, future developments will undoubtedly reshape our understanding of human consciousness. Current approaches must adapt to address emerging challenges in artificial general intelligence.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-09-p5",
        "title": "Social Theory",
        "text": "[I] Social theory has reached an unprecedented level of analytical depth. [II] As sociological frameworks become increasingly integral to public policy, research institutions must establish robust empirical methodologies. [III] These challenges necessitate interdisciplinary collaboration. [IV]\n\nTheorists examine economic factors, social implications, and political considerations surrounding structural inequality. These organizations face pressure to balance theoretical abstraction with practical relevance.\n\nEthnocentric bias in sociological research is a pressing concern. Western-centric theoretical models have demonstrated limited applicability in non-Western contexts, while quantitative methodologies show reductionist tendencies. These challenges can distort our understanding of global social phenomena.\n\nData accessibility issues compound these analytical obstacles. Research institutions collecting unprecedented quantities of demographic data create detailed social profiles that can predict and influence policy interventions and community outcomes.",
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
        "text": "The evolution of individualistic consciousness has become (1) __________ significant in understanding modern social behavior. Western societies emphasize personal autonomy; (2) __________, collective responsibility remains paramount in many Eastern cultures.\n\nPsychologists have dedicated themselves (3) __________ investigating how cultural values shape individual decision-making. Public health campaigns must (4) __________ decisive action to address the loneliness epidemic. Researchers are now (5) __________ self-reliance patterns across demographic groups. Holistic well-being (6) __________ integrate individual fulfillment with communal engagement.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-10-p2",
        "title": "Democratic Governance",
        "text": "Citizens are beginning to (7) __________ the fragility of democratic institutions in an era of populism. A growing (8) __________ of evidence suggests that voter disengagement threatens representative government. Political scientists are currently (9) __________ the effectiveness of civic education programs in strengthening democratic participation.\n\nResearch institutes employ (10) __________ analytical frameworks to study democratic resilience. Voters can effectively (11) __________ media literacy skills through structured civic programs. (12) __________ democracies maintain high voter turnout without compulsory voting laws.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-10-p3",
        "title": "Digital Democracy",
        "text": "Digital democracy redefines citizen participation in governance. (18) ___. E-government platforms enable direct consultation between policymakers and constituents. (19) ___. (20) ___, municipalities are piloting digital voting systems. Cybersecurity threatens democratic processes because (21) ___. Despite technological risks, digital civic engagement expands. (22) ___.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-10-p4",
        "title": "Political Philosophy",
        "text": "Political philosophy has emerged as an indispensable guide to contemporary governance challenges. What initially began as ancient Greek deliberation has evolved into a comprehensive analytical framework for modern democracies.\n\nPolitical theory offers sophisticated interpretive tools. Advanced computational models enable scholars to simulate policy outcomes and their societal consequences across diverse political systems.\n\nPractical applications extend beyond academic discourse. Government think tanks have begun deploying predictive governance models, which enable evidence-based policymaking on complex issues. Different approaches yield varying effectiveness depending on the institutional context.\n\nFunding limitations and ideological polarization remain significant challenges. Nevertheless, future developments will undoubtedly reshape our understanding of democratic governance. Current approaches must adapt to address emerging challenges in participatory democracy.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-10-p5",
        "title": "Social Fragmentation",
        "text": "[I] Social fragmentation has reached an unprecedented level in post-industrial democracies. [II] As community bonds become increasingly integral to mental health outcomes, sociologists must establish evidence-based intervention strategies. [III] These challenges demand immediate collective action. [IV]\n\nResearchers examine economic factors, social implications, and political considerations surrounding declining civic participation. These organizations face pressure to balance individual privacy with community cohesion.\n\nDigital isolation in modern societies is a pressing concern. Social media platforms have demonstrated paradoxical effects on social connection, while urban planning models show neglect of communal gathering spaces. These challenges can erode the social fabric of democratic societies.\n\nAlgorithmic personalization compounds these social divisions. Technology companies collecting unprecedented quantities of behavioral data create detailed individual profiles that can predict and influence patterns of social interaction and community engagement.",
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

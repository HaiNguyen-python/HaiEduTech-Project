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
        "text": "Quantum computing represents a (1) __________ paradigmatic breakthrough in computational science, fundamentally challenging conventional information processing methodologies. Leading physicists worldwide recognize quantum mechanics' extraordinary potential for solving previously intractable computational problems, (2) __________ revolutionizing fields from cryptography to pharmaceutical research through unprecedented processing capabilities.\n\nThe underlying quantum mechanical principles operate through superposition and entanglement phenomena. Quantum bits, or qubits, can exist in multiple states simultaneously, enabling exponential computational advantages. This quantum behavior enables scientists to (3) __________ complex molecular simulations and optimization problems that would require classical computers millennia to solve. Quantum researchers emphasize that breakthrough applications are imminent across numerous scientific disciplines.\n\nImplementation requires extraordinary technological precision. Engineers recommend that research institutions should (4) __________ immediate investments in cryogenic infrastructure and specialized quantum hardware development. Moreover, they propose developing sophisticated algorithms (5) __________ quantum decoherence while maximizing computational efficiency. Ultimately, establishing quantum-ready educational (6) __________ rather than traditional programming frameworks will accelerate widespread technological adoption.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-02-p2",
        "title": "Deep Space Exploration",
        "text": "In our technologically advancing era, space agencies are beginning to (7) __________ the extraordinary potential of interplanetary missions for scientific discovery and human expansion. This astronomical renaissance represents a fundamental departure from Earth-centered research paradigms toward comprehensive cosmic exploration initiatives. Mission commanders report experiencing unprecedented international collaboration for ambitious deep space endeavors.\n\nContemporary space missions require an enormous (8) __________ of financial investment to develop sophisticated propulsion systems that have been perfected through decades of aerospace engineering. When astronauts are (9) __________ these revolutionary spacecraft technologies, they frequently encounter remarkable opportunities for conducting groundbreaking scientific experiments in zero-gravity environments. This endeavor demands exceptional psychological resilience and technical expertise.\n\nDifferent space programs specialize in (10) __________ missions and exploration objectives. For example, one agency might focus on Mars colonization while another prioritizes asteroid mining operations. Meanwhile, researchers can (11) __________ crucial scientific data instantaneously when monitoring deep space communications. The discovery process varies dramatically across different cosmic exploration initiatives.\n\nInternational stakeholders increasingly recognize the significance that space exploration represents for humanity's future. (12) __________ nations still prioritize terrestrial concerns exclusively, but most governments now emphasize cosmic research, technological innovation, and the unprecedented opportunities embedded within interplanetary exploration programs.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-02-p3",
        "title": "Neural Interface Technology",
        "text": "Neural interface technology represents a groundbreaking advancement in human-computer interaction, fundamentally altering how humans process and exchange information with digital systems. (18) ___________. Neuroscientists debate whether brain-computer interfaces will eventually enhance human cognitive capabilities or create unprecedented dependencies on technological augmentation.\n\nImplantable neural chips, the most sophisticated interface components, demonstrate extraordinary potential for treating neurological disorders and cognitive impairments. (19) ___________. However, surgical complications and long-term biocompatibility concerns continue discouraging widespread clinical adoption among conservative medical practitioners and regulatory authorities.\n\n(20) ___________, international medical organizations are establishing comprehensive neural interface guidelines to address ethical and safety considerations. These protocols aim to prevent exploitation while encouraging therapeutic innovation. Some medical institutions embrace neural augmentation enthusiastically, while others maintain traditional treatment preferences.\n\nPhilosophical questions surrounding neural interface implementation have generated intense academic discourse because (21) ___________. Identity preservation theories are being examined to address these consciousness-related implications.\n\nDespite philosophical challenges, neural interface development continues progressing rapidly. Major medical centers now conduct experimental procedures, and technology corporations are investing substantially in brain-computer interface research. (22) ___________.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-02-p4",
        "title": "Vertical Farming Systems",
        "text": "The agricultural revolution has entered a new phase with the emergence of vertical farming systems, transforming traditional crop cultivation methods across urban environments globally. What originally developed as experimental greenhouse projects has evolved into comprehensive indoor agriculture solutions, with farming enterprises discovering remarkable opportunities for sustainable food production in metropolitan areas.\n\nVertical farming provides substantial benefits for both agricultural producers and urban communities. Farmers achieve year-round crop production, eliminated weather dependency, and significantly increased yield per square meter. Cities benefit from reduced food transportation costs, access to fresh produce regardless of climate, and often decreased environmental impact from agricultural activities. However, these agricultural innovations present considerable obstacles requiring advanced technological infrastructure and substantial energy investments.\n\nEnergy consumption represents the most significant challenge in vertical farming operations. LED lighting systems enable controlled photosynthesis, precise nutrient delivery, and optimized growing conditions that soil-based agriculture cannot achieve consistently. Additionally, maintaining sterile growing environments becomes increasingly complex when scaling production to commercial levels. Many vertical farms report struggling with profitability while competing against traditional outdoor agriculture without adequate economic incentives.\n\nAutomation plays a fundamental role in vertical farming viability. Robotic harvesting systems, AI-controlled environmental monitoring, and automated nutrient distribution networks are transforming how indoor agricultural operations function efficiently. Facilities investing in comprehensive automation infrastructure often achieve superior crop quality and operational sustainability. Nevertheless, not all crops are economically viable for vertical cultivation, particularly those requiring extensive growing space or producing relatively low market values.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-02-p5",
        "title": "Cognitive Enhancement Technology",
        "text": "[I] Cognitive enhancement technology has emerged as a transformative field addressing the fundamental limitations of human intellectual capacity and memory retention. [II] As neuroscientific understanding advances and brain-computer interfaces become increasingly sophisticated, researchers are developing unprecedented methods for augmenting human cognitive performance. [III] The implications of cognitive enhancement extend far beyond individual improvement. [IV]\n\nPharmaceutical cognitive enhancers require extensive clinical validation while navigating complex ethical considerations regarding human enhancement versus therapeutic intervention. These biochemical interventions face scrutiny from bioethicists, regulatory agencies, and philosophical communities concerned about fairness, authenticity, and long-term neurological consequences. However, distinguishing between legitimate medical treatment and elective enhancement proves extraordinarily challenging when examining cognitive disorders, age-related decline, and performance optimization across diverse neurological conditions.\n\nNeuroplasticity manipulation represents one of the most promising yet controversial approaches in cognitive enhancement research. Transcranial stimulation techniques, pharmaceutical nootropics, and neural feedback systems can potentially alter brain structure and function permanently. For instance, memory consolidation drugs have demonstrated remarkable efficacy in laboratory settings, while attention enhancement protocols show significant improvements in cognitive processing speed. These interventions raise profound questions about personal identity when fundamental thinking patterns undergo artificial modification.\n\nSocial inequality concerns amplify these ethical complexities through differential access to cognitive enhancement technologies. Modern enhancement methods require substantial financial investment, creating potential cognitive disparities between socioeconomic classes. Wealthy individuals may access cutting-edge cognitive augmentation while disadvantaged populations remain cognitively unenhanced, potentially exacerbating existing educational and professional inequalities. Critics contend that cognitive enhancement threatens meritocratic principles and social justice, while proponents argue that enhancement technologies could democratize intellectual capabilities and eliminate cognitive disabilities entirely.",
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
        "text": "Recent breakthroughs in neuroscience have illuminated the brain's extraordinary adaptability, fundamentally altering therapeutic approaches to cognitive impairment. The (1) __________ understanding of neuroplasticity demonstrates that neural networks can reorganize following injury or disease. This capability, (2) __________, offers unprecedented hope for recovery in patients with traumatic brain injuries.\n\nAdvanced rehabilitation techniques leverage this adaptability by engaging patients in targeted exercises. Therapists encourage consistent practice (3) __________ neural pathways to strengthen. Consequently, individuals who once faced permanent disability now achieve remarkable functional improvements.\n\nHowever, harnessing neuroplasticity requires precision. Interventions must (4) __________ the delicate balance between stimulation and overexertion. Cutting-edge technology, such as AI-driven diagnostics, assists clinicians in designing (5) __________ protocols. Success ultimately depends on the brain's inherent capacity to rewire itself, a phenomenon (6) __________ as \"cortical remapping.\"",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-03-p2",
        "title": "Sustainable Architecture",
        "text": "Innovative architects are redefining urban landscapes by integrating ancient wisdom with modern technology to combat desertification. These pioneers (7) __________ passive cooling techniques, drastically reducing energy consumption in scorching environments. A (8) __________ of research confirms that such designs can lower indoor temperatures by 10\u201315\u00b0C.\n\nWhen (9) __________ vernacular materials like adobe and rammed earth, architects prioritize thermal mass and evaporative cooling. These (10) __________ resilient sustainable solutions outperform conventional alternatives. Moreover, designers can (11) __________ local cultural heritage while implementing these innovations.\n\n(12) __________ remain skeptical, but empirical data validates the efficacy of bioclimatic architecture. As climate change intensifies, these strategies will become indispensable.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-03-p3",
        "title": "Quantum Computing Principles",
        "text": "Quantum computing harnesses quantum-mechanical phenomena to process information exponentially faster than classical systems. (18) __________, traditional binary bits are superseded by quantum bits (qubits), which exist in superposition states. This paradigm shift enables parallel computation of vast solution spaces.\n\n(19) __________, maintaining qubit coherence remains the foremost engineering challenge. Environmental decoherence disrupts quantum states within microseconds. Consequently, quantum computers operate near absolute zero temperatures. (20) __________, error rates would render calculations meaningless.\n\nTheoretical breakthroughs suggest topological qubits could circumvent this limitation. (21) __________, quantum systems achieve fault tolerance through braided anyons in two-dimensional fields. (22) __________, scalable quantum computers might solve currently intractable problems in cryptography and drug discovery.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-03-p4",
        "title": "Epigenetics Research",
        "text": "Epigenetics \u2013 the study of heritable phenotype changes not involving DNA sequence alterations \u2013 has overturned deterministic views of genetic inheritance. Environmental factors like diet, stress, and toxins can activate methyl groups or histone modifications, silencing or expressing genes across generations. Famine survivors' descendants exhibiting metabolic disorders exemplify transgenerational epigenetic inheritance.\n\nClinical applications are revolutionary. Epigenetic biomarkers enable early cancer detection when tumors are undetectable by conventional imaging. Demethylating agents reactivate tumor-suppressor genes in leukemia, achieving remission where chemotherapy fails. Paradoxically, these therapies risk destabilizing the genome by indiscriminately reversing epigenetic silencing.\n\nMethodological challenges persist. Current sequencing techniques cannot simultaneously map all epigenetic modifications in single cells. Moreover, distinguishing causal epigenetic changes from correlative ones requires longitudinal studies spanning decades. Machine learning algorithms now predict modification patterns by analyzing chromatin accessibility data, accelerating discovery.\n\nEthical quandaries emerge. Epigenetic editing tools like CRISPR-Cas9 could potentially \"reset\" harmful environmental legacies but might inadvertently erase adaptive responses. Legal frameworks struggle to classify non-sequence-based inheritance, challenging patent laws and bioethics guidelines. As epigenetic therapies near commercialization, equitable access debates intensify.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-03-p5",
        "title": "Dark Matter Cosmology",
        "text": "[I] Dark matter \u2013 the invisible substance governing cosmic structure formation \u2013 comprises 85% of the universe's mass, yet defies direct detection. [II] Its gravitational effects are irrefutable: galaxies rotate faster than visible mass allows, and light bends around cosmic voids. [III] Weakly Interacting Massive Particles (WIMPs) remain the favored theoretical candidate, despite decades of null detection experiments. [IV] Alternative theories proliferate. Modified Newtonian Dynamics (MoND) proposes adjusted gravitational laws but fails to explain cluster collisions like the Bullet Cluster. Axion-like particles, detectable via quantum interference in strong magnetic fields, gained traction when XENON1T reported anomalous electronic recoils. Simultaneously, primordial black holes formed in the early universe reemerged as contenders after LIGO detected unexpected merger events.\n\nCosmological simulations face computational hurdles. Modeling dark matter halos requires solving n-body problems with 10\u00b2\u2076 particles \u2013 a task demanding exascale computing. Machine learning now approximates small-scale structure formation using neural networks trained on hydrodynamical simulations. Still, the \"cuspy halo\" problem persists: simulated halos exhibit density spikes absent in observed galaxies.\n\nPhilosophical implications are profound. If dark matter is undetectable, does it signify epistemological limits? String theory posits dark matter exists in folded Calabi-Yau dimensions, inaccessible to current instruments. Others argue it reflects incomplete quantum gravity frameworks. Future gravitational-wave observatories could distinguish between particle-based and geometric dark matter paradigms.",
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
        "text": "Contemporary travel trends demonstrate an (1) __________ surge in interest toward archipelagic destinations, particularly among affluent millennials seeking authentic experiences. Island tourism represents more than mere escapism; it embodies humanity's primordial connection to pristine natural environments. (2) __________, these destinations offer unparalleled opportunities for cultural immersion and ecological discovery.\n\nThe socioeconomic implications of island tourism extend far beyond individual satisfaction. Local communities benefit substantially from tourism revenue, which enables them to preserve indigenous traditions while modernizing essential infrastructure. This economic symbiosis compels governments (3) __________ sustainable development policies that balance environmental conservation with commercial viability. Tourism boards emphasize the critical importance of responsible travel practices.\n\nSustainable island tourism requires comprehensive planning strategies. Travel agencies recommend that visitors should (4) __________ proactive measures by researching local customs and supporting community-based enterprises. Furthermore, they advocate for the utilization of eco-friendly accommodations (5) __________ carbon footprints while promoting environmental awareness. Ultimately, creating harmonious relationships between tourists and local (6) __________ ensures long-term destination viability.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-04-p2",
        "title": "Plastic Recycling",
        "text": "Environmental consciousness has prompted consumers to (7) __________ the paramount significance of plastic waste recycling in combating ecological degradation. This paradigmatic transformation represents a fundamental rejection of linear consumption models in favor of circular economy principles. Recycling facilities report experiencing unprecedented increases in plastic waste processing demands.\n\nModern-day recycling operations require a substantial (8) __________ of sophisticated equipment to efficiently process diverse polymer materials. When technicians are (9) __________ advanced sorting technologies, they often achieve remarkable improvements in material recovery rates. This technological integration demands considerable financial investment and specialized expertise.\n\nDifferent recycling facilities specialize in various (10) __________ plastic polymer types. For instance, one facility might excel at processing polyethylene while struggling with polystyrene materials. Meanwhile, operators can (11) __________ new processing techniques immediately when observing innovative methodologies at industry conferences.\n\nEnvironmental advocates increasingly emphasize recycling's transformative potential for ecosystem restoration. (12) __________ individuals dismiss recycling initiatives as ineffective, but the overwhelming majority now recognize their crucial role in environmental preservation.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-04-p3",
        "title": "Environmental Policy",
        "text": "Biodiversity constitutes Earth's most invaluable evolutionary patrimony, yet myriad taxonomic entities confront unprecedented extirpation perils attributable to anthropocentric interventions. (18) ___________. Conservation biologists underscore that instantaneous remediation remains imperative to forestall irreversible ecological disintegration and safeguard phylogenetic heterogeneity for posterity.\n\nThe critically endangered Pongo abelii epitomizes the catastrophic ramifications of habitat fragmentation and anthropogenic territorial incursions. (19) ___________. Nevertheless, systematic deforestation for monocultural palm oil cultivation persists in decimating their indigenous biotopes despite multilateral conservation protocols and regenerative agricultural paradigms.\n\n(20) ___________, sovereign administrations globally are instituting protected wildlife corridors and promulgating more stringent anti-poaching jurisprudence. These preservationist stratagems endeavor to fortify pivotal ecosystemic refugia whilst simultaneously fostering ecologically sustainable economic proliferation. Certain nation-states wholeheartedly embrace comprehensive biodiversity stewardship programs, whilst others accord precedence to ephemeral fiscal imperatives.\n\nPelagic ecosystems encounter particularly acute vulnerabilities owing to (21) ___________. Climatic perturbations, oceanic acidification, and polymeric contamination exacerbate these predicaments exponentially.\n\nNotwithstanding conservational impediments, faunal protection endeavors perpetually expand internationally. Supranational organizations now orchestrate transfrontier conservation collaborations, whilst corporate benefactors subsidize pioneering investigational undertakings. (22) ___________.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-04-p4",
        "title": "Ocean Conservation",
        "text": "The proliferation of ephemeral digital phenomena has fundamentally metamorphosed contemporary cyberculture, engendering unprecedented prospects for transnational interconnectivity whilst concomitantly exposing participants to profound psychological and corporeal jeopardies. What initially manifested as innocuous recreational diversions has transmuted into an intricate sociological paradigm with comprehensive ramifications for adolescent maturation and communal behavioral modalities.\n\nViral phenomena proffer ostensible advantageous attributes for digital participation and innovative articulation. Participants encounter ephemeral notoriety, amplified social corroboration, and affiliation with cosmopolitan communities harboring analogous proclivities. Content architects derive exponential follower proliferation, latent monetization prospects, and enhanced personal brandification. Nonetheless, these perceived merits frequently obfuscate underlying psychological dependencies and perilous behavioral configurations necessitating judicious contemplation.\n\nPeer coercion epitomizes the most pernicious facet of viral phenomenon participation. Social media algorithms magnify trending content, fabricating spurious urgency and trepidation regarding exclusion among susceptible users. Numerous adolescents articulate experiencing compulsion to participate in hazardous phenomena to sustain social pertinence, notwithstanding acknowledging prospective repercussions. The psychological manipulation inherent within these platforms exploits fundamental anthropological necessities for acceptance and communal integration.\n\nPsychological wellness implications of viral phenomenon culture manifest increasingly disconcerting. Empirical investigations indicate that excessive social media engagement correlates with heightened anxiety manifestations, depressive symptomatology, and somatic perception distortions. Juveniles juxtaposing themselves against curated digital personas frequently cultivate unrealistic expectations and attenuated self-valorization. Additionally, the habituating nature of social validation through approbation metrics engenders pathological dependencies on extrinsic endorsement for ego-reinforcement.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-04-p5",
        "title": "Genetic Engineering",
        "text": "[I] Climatic perturbations constitute humanity's most formidable ecological adversity, fundamentally transmuting atmospheric compositional parameters whilst simultaneously disrupting photosynthetic mechanisms that perpetuate terrestrial biotopes. [II] As planetary thermal indices escalate and carbon dioxide concentrations attain unprecedented thresholds, botanical physiology undergoes multifaceted adaptations that permeate throughout trophic hierarchies. [III] The labyrinthine correlation between climatic variables and photosynthetic efficacy determines planetary oxygen synthesis and carbon sequestration capabilities. [IV]\n\nPhotosynthesis, the biochemical cornerstone of terrestrial vitality, exhibits extraordinary susceptibility to environmental oscillations. Elevated atmospheric carbon dioxide initially augments photosynthetic velocities through enhanced substrate bioavailability, a phenomenon scientists denominate the \"CO\u2082 fertilization paradigm.\" Nevertheless, this ostensible advantageous outcome attenuates expeditiously as constraining parameters including nitrogen bioavailability, hydric stress, and thermal extremes circumscribe botanical proliferation. The sanguine prognostications of enhanced botanical productivity under elevated CO\u2082 scenarios have proven predominantly chimerical when contemplating authentic ecological limitations.\n\nThermal extremities impose particularly acute menaces to photosynthetic apparatus. Hyperthermia compromises pivotal enzymes implicated in carbon sequestration, whilst excessive temperatures disrupt chloroplast architecture and diminish photosystem operational capacity. Conversely, protracted hypothermic periods inhibit enzymatic catalysis and constrain metabolic processes indispensable for botanical survival. These thermal disruptions precipitate cascading ramifications throughout ecosystems, affecting primary productivity whilst subsequently influencing herbivorous demographics and predator-prey equilibriums.\n\nHydric accessibility increasingly governs photosynthetic processes under fluctuating climatic parameters. Drought-induced stress compels botanical organisms to occlude stomatal apertures for water conservation, concurrently restricting carbon dioxide assimilation requisite for photosynthesis. This physiological dichotomy between hydric preservation and carbon incorporation becomes progressively problematic as precipitation configurations become increasingly capricious and meteorological extremities intensify. Furthermore, modified precipitation regimes influence pedological nutrient cycling, subsequently constraining photosynthetic capacity and ecosystemic productivity.",
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
        "text": "The ongoing metamorphosis of agri-food production frameworks has precipitated a profound resurgence across pastoral communities, redefining long-held narratives of rural existence. The (1) __________ body of research indicates that synergizing advanced agrotechnology with eco-centric cultivation methods is rejuvenating once-declining agricultural heartlands. The proliferation of telecommuting has facilitated the permanent relocation of urban professionals to idyllic countryside locales without sacrificing their cosmopolitan career pathways.\n\nRural innovation now thrives through diversified agribusiness initiatives and heritage craft industries. Emerging generations of farmers exhibit notable expertise in deploying climate-smart cultivation systems, (2) __________ enhancing productivity while curbing ecological degradation. While these approaches necessitate considerable upfront capital, they yield substantial socio-economic dividends over extended periods.\n\nProgressive land management schemes encourage cultivators (3) __________ embrace regenerative techniques that replenish ecosystems and bolster biodiversity. Fiscal incentives are directed toward projects that demonstrate quantifiable environmental restoration. Agroecologists assert that local authorities must (4) __________ resolute actions to mitigate climate-induced disruptions affecting crop viability and livestock welfare.\n\nIn addition, digital platforms (5) __________ microclimatic trends and geospatial soil analytics have transformed operational precision in agriculture. These cutting-edge tools deliver instantaneous insights, enabling farmers to fine-tune water usage and nutrient distribution. Ultimately, fostering resilient rural economies hinges upon establishing enduring (6) __________ among growers, market stakeholders, and cross-regional supply chains.",
        "questionRange": [
          1,
          6
        ]
      },
      {
        "id": "thpt-05-p2",
        "title": "Lifelong Learning",
        "text": "The architecture of corporate knowledge ecosystems has been fundamentally reimagined as organizations actively (7) __________ the necessity of cultivating adaptive expertise to navigate volatile market landscapes. This strategic realignment diverges sharply from antiquated paradigms in which professional growth was perceived as episodic rather than continuous. Global think tanks note a dramatic escalation in demand for executive education programs and specialized industry certifications.\n\nForward-looking employees now allocate a substantial (8) __________ of their annual budgets to acquiring advanced analytical proficiencies and sector-specific innovations. When individuals are (9) __________ transformative skill sets, they often uncover synergies between technological fluency and creative problem-solving, amplifying their strategic value. This synthesis of disciplines demands sustained mental dexterity and resilience under pressure.\n\nA spectrum of instructional formats caters to heterogeneous learner profiles. While some professionals thrive in collaborative workshops, others prefer asynchronous self-directed study. Digital immersion tools enable participants to (10) __________ constructs at an accelerated pace, especially through gamified simulations and augmented reality environments. The didactic methodologies, however, differ considerably across delivery channels.\n\nRecruiters now place exceptional emphasis on applicants who manifest a demonstrable trajectory of skill evolution. (11) __________ practitioners remain skeptical of perpetual learning models, the prevailing consensus within competitive industries is that adaptability constitutes a non-negotiable criterion for advancement. Enterprises embedding lifelong learning into their operational ethos consistently secure leadership positions in innovation indices and global market share rankings, leaving (12) __________ room for complacency in a rapidly evolving economy.",
        "questionRange": [
          7,
          12
        ]
      },
      {
        "id": "thpt-05-p3",
        "title": "Endangered Species Conservation",
        "text": "Imperiled fauna confront unprecedented existential exigencies precipitated by inexorable habitat obliteration, climatological vicissitudes, and multifarious anthropogenic perturbations globally. (18) ___________. Conservation biologists postulate that contemporary extirpation rates exponentially supersede primordial background rates, portending an imminent sixth mass extinction cataclysm.\\n\\nThe Sumatran orangutan epitomizes the precarious predicament besetting myriad endangered hominoids across biogeographical realms. (19) ___________. Nevertheless, surreptitious timber harvesting operations, oleaginous palm plantation proliferation, and demographic encroachment perpetuate survival jeopardy despite supranational conservation endeavors.\\n\\n(20) ___________, governmental entities globally are promulgating comprehensive species preservation statutes and instituting transnational conservation confederations. These stratagems endeavor to safeguard quintessential biotopes whilst fostering ecologically sustainable developmental paradigms.\\n\\nEx-situ breeding initiatives constitute contentious yet potentially indispensable methodologies for forestalling species obliteration, considering that (21) ___________. These programs necessitate prodigious monetary allocations and specialized veterinary acumen to perpetuate genetic heterogeneity within artificially regulated populations.\\n\\nDespite escalating adversities, conservation triumph narratives furnish sanguinity for endangered species recuperation. Numerous taxa have resurged from near-extirpation through assiduous conservation exertions and habitat reconstitution enterprises. (22) ___________.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-05-p4",
        "title": "Multiculturalism Paradigms",
        "text": "Multiculturalism paradigms have fundamentally metamorphosed contemporary societal architectures, necessitating unprecedented acclimatizations in governance methodologies, pedagogical frameworks, and social cohesion mechanisms. What initially manifested as demographic heterogeneity has transmogrified into labyrinthine cultural amalgamations requiring sophisticated integration stratagems and nuanced comprehension of intercultural dynamics.\\n\\nPluralistic societies proffer profound advantageous ramifications for both autochthonous populations and expatriate communities. Indigenous inhabitants derive enhanced cultural edification, amplified economic opportunities, and innovative problem-resolution approaches emanating from heterogeneous perspectives. Newcomers procure ameliorated socioeconomic ascendancy, scholastic advancement, and democratic participation whilst contributing specialized competencies and entrepreneurial dynamism. Nevertheless, these beneficiations necessitate deliberate cultivation and comprehensive policy frameworks addressing inherent integration conundrums.\\n\\nCultural fragmentation constitutes the most formidable impediment within multicultural milieus. Authentic intercultural communication mandates sophisticated linguistic competencies, cultural literacy, and empathetic perspicacity that superficial diversity initiatives fail to cultivate adequately. Additionally, perpetuating social cohesion becomes increasingly labyrinthine when communities maintain distinctive cultural identities whilst participating in communal civic institutions. Numerous immigrant populations experience marginalization and ostracism despite ostensible inclusion policies.\\n\\nTechnological innovation expedites multicultural integration through digital platforms, translation applications, and virtual cultural exchange programs that transcend geographical and linguistic barriers. Organizations implementing comprehensive multicultural competency training and inclusive communication protocols demonstrate superior adaptation to demographic diversity. Nonetheless, certain cultural practices remain incongruous with predominant societal values, particularly regarding gender parity, religious liberties, and secular governance principles.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-05-p5",
        "title": "Ethnic Identity Preservation",
        "text": "[I] Ethnographic identity preservation has assumed paramount significance in contemporary globalized societies, wherein homogenizing cultural hegemonies menace indigenous traditions and ancestral patrimony systems. [II] As technological interconnectivity facilitates unprecedented cultural interchange, communities worldwide confront existential quandaries regarding authentic identity perpetuation versus adaptive modernization. [III] The ramifications of these determinations will ascertain cultural survival trajectories for innumerable ethnic minorities. [IV]\\n\\nTransnational conglomerates and predominant cultural hegemonies exert immense pressure on minoritarian communities to assimilate mainstream ideologies whilst simultaneously commodifying traditional practices for mercantile exploitation. These entities capitalize on ethnic authenticity through cultural misappropriation, transmogrifying sanctified traditions into marketable commodities divested of spiritual gravitas and historical contextualization. Nevertheless, defining authentic cultural preservation proves extraordinarily labyrinthine when considering dynamic cultural metamorphosis, intergenerational transmission vicissitudes, and exogenous influence assimilation across diverse ethnic constituencies.\\n\\nCultural revitalization movements epitomize increasingly sophisticated stratagems for perpetuating ethnic distinctiveness whilst engaging contemporary realities. Indigenous communities devise innovative methodologies amalgamating traditional epistemological systems with contemporary pedagogical frameworks and technological applications. For instance, digital archival enterprises preserve moribund languages, whilst cultural immersion curricula transmit ancestral practices to nascent generations.\\n\\nGlobalization paradoxically menaces and fortifies ethnic identity concomitantly. Contemporary communication technologies enable diaspora communities to perpetuate connections with ancestral homelands, preserving cultural continuity across geographical expanses. Ethnic minorities leverage social media platforms to document traditions, disseminate cultural narratives, and mobilize political advocacy for indigenous prerogatives.",
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
        "title": "Human Reproductive Cloning Ethics",
        "text": "Human reproductive cloning represents one of biotechnology's most contentious frontiers, challenging fundamental conceptions of human identity and procreation. (18) ___________. Bioethicists worldwide grapple with unprecedented moral dilemmas surrounding genetic replication and its implications for human dignity.\\n\\nSomatic cell nuclear transfer, the primary cloning methodology, involves transferring genetic material from donor cells into enucleated oocytes. (19) ___________. However, technical limitations and extraordinarily high failure rates continue hampering successful human reproductive cloning attempts among scientific communities.\\n\\n(20) ___________, religious organizations and humanitarian groups have mobilized extensive opposition campaigns. These advocacy movements emphasize concerns about commodifying human life and exploiting vulnerable populations for genetic material harvesting. Some nations embrace therapeutic cloning research enthusiastically, while others impose absolute prohibitions.\\n\\nEmbryonic development complications arising from cloning procedures have generated significant apprehension regarding (21) ___________. Epigenetic abnormalities and premature aging phenomena observed in cloned animals raise serious questions about human applications. Despite technological obstacles, cloning research continues advancing inexorably. Pharmaceutical corporations invest substantial resources in therapeutic applications, while reproductive medicine clinics explore fertility treatment possibilities. (22) ___________.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-06-p4",
        "title": "AI in Healthcare",
        "text": "The integration of artificial intelligence into healthcare systems has precipitated unprecedented transformations in diagnostic precision, therapeutic interventions, and patient outcomes. What initially emerged as experimental computational tools has evolved into indispensable medical infrastructure, with algorithmic decision-making systems now influencing critical treatment protocols across diverse clinical specialties.\\n\\nAI-powered diagnostic platforms demonstrate remarkable capabilities in pattern recognition, anomaly detection, and prognostic modeling. Machine learning algorithms analyze vast datasets encompassing radiological images, laboratory results, and electronic health records with superhuman accuracy. Healthcare providers benefit from enhanced diagnostic confidence, personalized treatment recommendations, and optimized resource allocation strategies. However, these innovations generate considerable controversy regarding long-term ecological consequences and food safety implications.\\n\\nAlgorithmic opacity represents the most formidable obstacle in AI healthcare implementation. Deep learning networks operate through incomprehensible mathematical processes, making clinical decision-making rationales virtually indecipherable to human practitioners. Additionally, maintaining patient trust becomes increasingly precarious when treatment decisions originate from inscrutable computational systems. Many physicians express apprehension about relinquishing diagnostic authority to artificial entities while patients question the reliability of algorithmically-generated medical recommendations.\\n\\nCybersecurity vulnerabilities constitute another critical concern in AI healthcare deployment. Sophisticated neural networks require extensive patient data access, creating attractive targets for malicious cyberattacks and data breaches. Healthcare institutions investing in robust cybersecurity infrastructure often experience more secure AI implementation processes. Nevertheless, certain medical specialties remain inherently unsuitable for comprehensive AI integration, particularly those demanding empathetic human interaction and complex ethical decision-making capabilities.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-06-p5",
        "title": "Human-Animal Chimeric Research",
        "text": "[I] Human-animal chimeric research has transcended scientific fiction to become tangible biotechnological reality, generating unprecedented ethical quandaries about species boundaries and moral consideration. [II] As researchers successfully cultivate organisms containing genetic material from multiple species, humanity confronts profound philosophical questions about consciousness, personhood, and the sanctity of natural order. [III] The ramifications of these biotechnological innovations extend far beyond laboratory confines. [IV]\\n\\nLeading biomedical institutions are pioneering chimeric technologies while simultaneously wrestling with the moral complexities inherent in creating hybrid organisms. These research facilities face mounting scrutiny from religious authorities, animal rights advocates, and bioethics committees demanding transparent protocols and rigorous oversight mechanisms. However, defining acceptable parameters for interspecies genetic integration proves extraordinarily challenging when considering diverse theological doctrines, philosophical frameworks, and cultural sensitivities across global research communities.\\n\\nXenotransplantation applications represent the most promising therapeutic avenue for chimeric research. Scientists engineer porcine organs containing human cellular components to address critical organ shortage crises affecting millions of patients worldwide. These innovative procedures could revolutionize transplantation medicine by eliminating immunological rejection responses while providing unlimited organ availability. Nevertheless, introducing animal-derived pathogens into human recipients raises serious zoonotic transmission concerns that could precipitate devastating pandemic scenarios.\\n\\nConsciousness attribution dilemmas compound these ethical challenges significantly. Advanced chimeric organisms possessing enhanced cognitive capabilities blur traditional distinctions between human and non-human entities, raising questions about moral status, rights attribution, and experimentation ethics. Neurobiological chimeras containing substantial human neural tissue might experience subjective consciousness, pain perception, and emotional suffering comparable to human experience.",
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
        "title": "Cybersecurity and National Sovereignty",
        "text": "Digital warfare constitutes a paradigm-shifting menace to national sovereignty, eroding conventional notions of territorial inviolability and undermining strategic defense doctrines that once appeared immutable. (18) ___________. Intelligence services across continents grapple with the epistemological difficulty of attributing cyber intrusions while simultaneously attempting to engineer multidimensional deterrence strategies against adversaries whose technological sophistication continues to evolve at an exponential pace.\\n\\nState-sponsored hacking operations have repeatedly demonstrated the susceptibility of critical infrastructure systems—ranging from electrical grids to financial networks—to covert manipulation and systemic sabotage. (19) ___________. Yet codifying universally accepted norms and legally binding conventions for cyber warfare proves immensely elusive, largely because jurisdictional ambiguity and attributional opacity render accountability almost unattainable in practice.\\n\\n(20) ___________, sovereign states are allocating unprecedented fiscal and intellectual capital toward the construction of cyber fortifications, national firewalls, and resilient digital ecosystems. These initiatives are intended not merely to shield sensitive data but also to safeguard economic vitality and maintain competitive parity in the global digital hierarchy.\\n\\nEnvironmental ramifications of cyber conflict transcend immediate geopolitical concerns, insofar as (21) ___________. Massive data-processing requirements, continuous surveillance infrastructures, and ever-expanding server farms collectively intensify the carbon footprint of the digital age, thereby interlinking cybersecurity with planetary sustainability debates.\\n\\nDespite the labyrinthine challenges, collaborative frameworks in cybersecurity are undergoing rapid institutionalization. Prominent geopolitical actors increasingly negotiate bilateral accords concerning digital sovereignty, while multilateral entities labor to draft enforceable conventions that regulate hostile cyber operations. (22) ___________.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-07-p4",
        "title": "Deforestation and Biodiversity Loss",
        "text": "Anthropogenic deforestation has precipitated an ecological catastrophe of unprecedented magnitude, threatening the planet's biodiversity equilibrium and climate stability. What commenced as localized resource extraction has metastasized into systematic habitat destruction that imperils countless species and disrupts intricate ecosystem interdependencies.\\n\\nCommercial logging operations and agricultural expansion provide substantial economic incentives for continued forest clearance. Corporations benefit from timber harvests, agricultural land conversion, and mineral extraction opportunities. Meanwhile, local communities often depend on these activities for subsistence and employment. However, these short-term economic gains frequently obscure the profound long-term environmental consequences that threaten global sustainability.\\n\\nBiodiversity loss represents the most catastrophic ramification of widespread deforestation. Complex forest ecosystems harbor extraordinary species richness that has evolved over millennia. When pristine habitats undergo fragmentation or complete destruction, endemic species face immediate extinction threats. Additionally, disrupted ecological networks compromise pollination cycles, seed dispersal mechanisms, and predator-prey relationships that maintain natural equilibrium.\\n\\nScientific research demonstrates that intact forests provide crucial ecosystem services including carbon sequestration, water cycle regulation, and soil preservation. Advanced satellite monitoring systems and ground-based research stations now enable scientists to quantify deforestation rates with unprecedented accuracy. Nevertheless, translating scientific knowledge into effective conservation policies requires overcoming significant political and economic obstacles that prioritize immediate profits over environmental sustainability.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-07-p5",
        "title": "Post-Humanist Philosophy",
        "text": "[I] Post-humanist philosophy challenges anthropocentric worldviews that have dominated Western intellectual traditions for centuries, questioning fundamental assumptions about human exceptionalism and consciousness. [II] As technological advancement enables unprecedented modifications to human biology and cognition, philosophers must reconsider what constitutes authentic humanity in an era of enhancement possibilities. [III] The implications of these inquiries extend far beyond academic discourse. [IV]\\n\\nContemporary transhumanist movements advocate for deliberate human enhancement through genetic engineering, cybernetic implants, and consciousness uploading technologies. These proponents argue that overcoming biological limitations represents humanity's natural evolutionary trajectory, potentially eliminating aging, disease, and cognitive constraints. However, critics contend that such transformations threaten essential human characteristics including vulnerability, mortality, and embodied experience that define authentic existence.\\n\\nTechnological singularity theories postulate an imminent convergence between human and artificial intelligence that will fundamentally transform civilization. Machine learning algorithms already demonstrate capabilities that surpass human performance in specific domains, while neural interface technologies enable direct brain-computer communication. These developments raise profound questions about consciousness, identity, and the boundaries between organic and artificial cognition.\\n\\nEthical considerations surrounding post-humanist aspirations prove extraordinarily complex and contentious. Enhancement technologies could exacerbate existing inequalities by creating distinct classes of enhanced and unmodified humans. Furthermore, irreversible modifications raise concerns about informed consent, particularly regarding future generations who inherit genetic alterations. Philosophers debate whether embracing post-humanist possibilities represents liberation from biological constraints or betrayal of fundamental human values and dignity.",
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
        "title": "Surveillance Technology and Privacy",
        "text": "Digital surveillance systems have fundamentally transformed contemporary society's relationship with privacy, creating unprecedented opportunities for governmental oversight and corporate data harvesting. (18) ___________. Privacy advocates argue that ubiquitous monitoring threatens democratic foundations while security proponents emphasize public safety benefits.\\n\\nFacial recognition algorithms, deployed extensively in urban environments, demonstrate remarkable accuracy in identifying individuals within crowded spaces. (19) ___________. However, civil liberties organizations raise concerns about potential misuse and discriminatory enforcement targeting marginalized populations.\\n\\n(20) ___________, legislative bodies worldwide are drafting comprehensive privacy protection statutes. These regulations attempt to balance technological innovation with fundamental human rights preservation. Some democracies embrace strict data protection measures, while authoritarian regimes exploit surveillance capabilities.\\n\\nEnvironmental activists express particular concern regarding the fact that (21) ___________. Sustainable technology solutions are being developed to address these ecological implications.\\n\\nDespite mounting opposition, surveillance technology adoption continues accelerating globally. Law enforcement agencies increasingly rely on predictive policing algorithms, and corporations utilize behavioral analytics for targeted marketing. (22) ___________.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-08-p4",
        "title": "Biotechnology in Agriculture",
        "text": "Agricultural biotechnology represents a paradigmatic shift in humanity's approach to food production, introducing genetically modified organisms that challenge traditional farming methodologies while promising solutions to global hunger crises. Revolutionary CRISPR gene-editing technologies enable precise modifications to crop genomes, enhancing nutritional content, drought resistance, and pest immunity.\\n\\nGenetically modified crops offer substantial advantages for farmers and consumers alike. Producers benefit from increased yields, reduced pesticide dependency, and enhanced climate resilience. Consumers potentially access more nutritious foods with extended shelf life and reduced environmental footprint. However, these innovations generate considerable controversy regarding long-term ecological consequences and food safety implications.\\n\\nOpponents raise legitimate concerns about genetic modification's unforeseen ramifications on biodiversity and ecosystem stability. Cross-pollination between modified and wild plant species could potentially create invasive hybrid organisms with unpredictable characteristics. Furthermore, corporate monopolization of seed patents threatens traditional farming communities' autonomy and food sovereignty principles.\\n\\nRegulatory oversight varies dramatically across global jurisdictions. The European Union implements stringent approval processes requiring extensive safety testing, while developing nations often lack adequate regulatory infrastructure. International coordination becomes increasingly crucial as agricultural biotechnology continues expanding, demanding comprehensive scientific assessment protocols and transparent public discourse regarding acceptable risk thresholds.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-08-p5",
        "title": "Pandemic Economics",
        "text": "[I] Global pandemics precipitate cascading economic disruptions that transcend geographical boundaries, fundamentally restructuring international trade relationships and exposing vulnerabilities in interconnected supply chains. The delicate equilibrium between epidemic containment and economic preservation presents policymakers with virtually impossible choices. The ramifications extend far beyond immediate health concerns, reshaping civilization's economic trajectory.\\n\\nMultinational corporations confront extraordinary challenges as pandemic-induced restrictions disrupt established business models and consumer behavior patterns. Tourism, hospitality, and entertainment industries experience catastrophic revenue losses, while technology and pharmaceutical sectors witness unprecedented growth opportunities. These dramatic sectoral disparities exacerbate existing economic inequalities, concentrating wealth among already privileged corporations while devastating small enterprises and vulnerable employment sectors.\\n\\n[II] Labor markets undergo profound transformations during pandemic periods, with remote work arrangements becoming normalized across numerous professional domains. Healthcare systems strain under overwhelming patient volumes while simultaneously creating massive employment opportunities for medical professionals. [III] Conversely, service industries dependent on physical proximity suffer devastating job losses, disproportionately affecting marginalized communities with limited financial reserves.\\n\\nGovernmental fiscal responses vary considerably across different political economies, reflecting diverse ideological approaches to crisis management and resource allocation. [IV] Developed nations deploy massive stimulus packages and unemployment benefits, while developing countries struggle with limited fiscal capacity and inadequate social safety nets. Central banks implement aggressive monetary policies, including quantitative easing and interest rate reductions, though these measures often benefit wealthy asset holders more than economically vulnerable populations.",
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
        "title": "Climate Change Politics",
        "text": "The politics of climate change has evolved into an inexorable fulcrum of global deliberation, simultaneously reframing diplomatic alliances and reshaping the contours of domestic governance.\\n\\n(18) ______. Confronted with escalating ecological crises, governments must negotiate a precarious balance between environmental imperatives and entrenched economic dependencies – a balancing act that frequently produces ideological fragmentation and populist resistance.\\n\\nConventional governance paradigms, long dominated by the primacy of industrial expansion over ecological prudence, increasingly reveal their inadequacy when societies face the compounded effects of climate-induced catastrophes.\\n\\n(19) ______. Nevertheless, despite emphatic declarations of intent, entrenched lobbying networks financed by carbon-intensive conglomerates routinely derail ambitious legislation, thereby eroding confidence in both democratic credibility and institutional accountability.\\n\\n(20) ______, legislators in reform-oriented states are formulating comprehensive climate statutes that combine market-based instruments such as carbon pricing with interventionist measures including renewable-energy incentives and legally binding emissions ceilings. Yet the divergence in progress remains stark: while certain nations accelerate transformative reforms, others remain immobilized by geopolitical antagonisms, structural inequities, and technological asymmetries that fragment the architecture of global climate governance. Fiscal controversies surrounding adaptation and mitigation proliferate to the extent that (21) ______. This unresolved dilemma perpetuates contentious disputes over distributive justice, as affluent economies and historically high-emission states are confronted with increasingly urgent demands from climate-vulnerable nations for restitution and reparative funding.\\n\\nDespite these persistent impediments, the momentum toward systemic transformation has not dissipated. Grassroots coalitions, intergenerational movements, and transnational advocacy networks continue to exert escalating pressure on policymakers to embrace radical interventions.\\n\\n(22) ______.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-09-p4",
        "title": "Ocean Pollution and Marine Conservation",
        "text": "Ocean pollution and marine conservation have evolved into some of the most urgent and divisive issues within modern global governance. What initially appeared as a scientific consensus about the devastating impact of plastic debris and chemical effluents has now expanded into a multifaceted arena where ecological preservation collides with industrial priorities, geopolitical rivalries, and competing moral frameworks that stretch far beyond conventional environmental policy debates.\\n\\nCrafting effective marine protection policies presents formidable challenges for governments struggling to reconcile ecological imperatives with commercial imperatives such as shipping, fisheries, and tourism. Policymakers must navigate antagonistic demands from petrochemical corporations, maritime trade associations, and activist networks advocating for ecological justice. The temporal disjunction between immediate economic sacrifices and delayed environmental recovery creates profound political friction that steadily erodes sustained commitment to ambitious conservation agendas.\\n\\nEmpirical research overwhelmingly confirms the urgency of reducing pollutants across all maritime sectors. However, translating such imperatives into enforceable regulatory frameworks remains notoriously elusive. Powerful lobbies routinely sabotage comprehensive marine legislation by orchestrating misinformation campaigns, litigating procedural loopholes, and manipulating international arbitration systems that were originally designed to ensure maritime cooperation but now frequently serve corporate interests.\\n\\nInternational negotiations over ocean governance illustrate these obstacles on a planetary scale. Despite decades of global summits and treaties, levels of marine contamination continue to escalate as nations prioritize export competitiveness and strategic naval presence over collective ecological stewardship. Landmark agreements, such as the United Nations Convention on the Law of the Sea, signify progress in articulating governance frameworks, yet enforcement remains fragmented due to limited monitoring capacity and persistent free-rider behavior among member states.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-09-p5",
        "title": "Lifelong Learning as Socio-Economic Imperative",
        "text": "[I] Lifelong learning has ceased to be a voluntary enrichment activity and has instead crystallized into an indispensable survival strategy in economies defined by automation, digitalization, and relentless globalization. Early in the twenty-first century, the notion was often romanticized as intellectual curiosity for its own sake. The magnitude of this educational reconfiguration surpasses earlier reforms in both scale and urgency. However, current analyses underscore its status as an unavoidable socio-economic mandate.\\n\\nThe institutional challenge arises when educational systems, historically designed to deliver front-loaded knowledge in youth, are compelled to reorient themselves toward perpetual re-skilling. Higher education institutions are pressured to expand modular programs that respond to industry disruption, while corporations cultivate internal academies to retrain employees continuously. Yet, the temporal asymmetry between immediate costs and deferred benefits corrodes political enthusiasm, leaving policymakers vulnerable to electoral short-termism and fiscal conservatism that dilute bold reform.\\n\\nEmpirical studies consistently demonstrate that societies investing heavily in lifelong learning secure greater social mobility, stronger democratic participation, and heightened resilience against economic shocks. Nonetheless, operationalizing such models remains elusive: powerful professional guilds defend monopolistic credentialing systems, and transnational corporations lobby aggressively against regulation that would redistribute training costs more equitably. [II] Although adaptive technologies such as algorithmic learning platforms and AI-driven mentorship hold remarkable potential, critics contend that without radical restructuring of socio-economic incentives, such tools will remain cosmetic innovations incapable of addressing structural inequality.\\n\\nAt the international level, negotiations over educational equity reflect these dilemmas in amplified form. [III] Although multilateral declarations abound, actual implementation falters due to insufficient monitoring mechanisms, conflicting cultural paradigms, and the enduring temptation of free-rider behavior. Thus, the future of lifelong learning will be determined not merely by pedagogical ingenuity but by whether societies possess the political imagination to align technological innovation with justice-oriented policy design. [IV]",
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
        "title": "Mass Media and Public Opinion",
        "text": "The proliferation of mass media platforms has fundamentally reconstituted the mechanisms through which public opinion crystallizes, simultaneously expanding democratic participation while introducing unprecedented vulnerabilities to manipulation and disinformation. (18) ______. Confronted with exponentially expanding information flows, citizens must navigate complex mediascapes where authentic journalism intersects with propaganda, entertainment, and commercial messaging – a navigation process that frequently produces cognitive overload and epistemic fragmentation.\\n\\nTraditional gatekeeping functions, historically exercised by professional journalists and editorial institutions, increasingly prove inadequate when societies confront the democratized yet chaotic information environments characteristic of digital media ecosystems. (19) ______. However, despite widespread acknowledgment of media literacy's importance, entrenched commercial interests and algorithmic optimization systems routinely prioritize engagement over accuracy, thereby undermining public discourse quality and institutional credibility.\\n\\n(20) ______, progressive media organizations are developing innovative journalistic practices that integrate fact-checking protocols with participatory reporting methodologies and transparent editorial processes. Yet the disparity in implementation remains pronounced: while certain media outlets embrace transformative accountability standards, others remain constrained by commercial pressures, ideological polarization, and technological limitations that fragment the architecture of public information systems. Regulatory debates surrounding platform responsibility proliferate to the extent that (21) ______. This unresolved tension perpetuates contentious disputes over free speech boundaries, as democratic societies grapple with balancing information freedom against the protection of democratic discourse from systematic manipulation.\\n\\nDespite these persistent obstacles, the momentum toward media reform has not diminished. Citizen journalism initiatives, media literacy movements, and regulatory advocacy networks continue to exert increasing pressure on policymakers and platform corporations to embrace accountability mechanisms. (22) ______.",
        "questionRange": [
          18,
          22
        ]
      },
      {
        "id": "thpt-10-p4",
        "title": "Climate Change and Global Migration",
        "text": "Climate change and global migration have converged into one of the most complex and contentious challenges within contemporary international relations. What initially emerged as distinct environmental and demographic phenomena has evolved into an interconnected crisis where ecological displacement intersects with geopolitical tensions, economic inequalities, and competing humanitarian frameworks that extend far beyond traditional refugee protection paradigms.\\n\\nFormulating comprehensive climate migration policies presents extraordinary challenges for governments attempting to balance humanitarian obligations with national security concerns, economic capacity, and domestic political pressures. Policymakers must reconcile conflicting demands from international humanitarian organizations, national security agencies, and anti-immigration constituencies advocating for restrictive border policies. The temporal disconnect between immediate humanitarian needs and long-term adaptation strategies creates sustained political tension that progressively weakens commitment to expansive climate migration assistance programs.\\n\\nEmpirical evidence unambiguously validates the necessity of establishing proactive climate displacement frameworks across all governmental levels. Nevertheless, operationalizing such comprehensive approaches remains extraordinarily challenging: powerful national sovereignty advocates systematically undermine multilateral climate migration agreements by mobilizing nationalist rhetoric, exploiting legal technicalities, and manipulating international arbitration mechanisms that were originally conceived to facilitate humanitarian cooperation but now frequently serve exclusionary political agendas.\\n\\nInternational negotiations concerning climate-induced displacement exemplify these contradictions on a global scale. Despite extensive multilateral declarations and humanitarian commitments, climate migration continues to escalate as nations prioritize border security and economic competitiveness over collective humanitarian responsibility. Landmark frameworks, such as the Global Compact for Migration, represent progress in articulating governance principles, yet implementation remains fragmented due to insufficient funding mechanisms and persistent reluctance among developed nations to accept proportional responsibility.",
        "questionRange": [
          23,
          30
        ]
      },
      {
        "id": "thpt-10-p5",
        "title": "Musical Activism and Political Mobilization",
        "text": "[I] Musical expression has transcended its traditional aesthetic boundaries to become an increasingly sophisticated instrument of political mobilization and social transformation within contemporary activist movements. Historically conceptualized primarily as entertainment or cultural preservation, music now functions as a multifaceted communication medium capable of articulating complex ideological positions, fostering collective identity formation, and catalyzing mass political engagement across diverse demographic constituencies. The revolutionary potential of musical activism surpasses previous forms of cultural resistance in both its technological reach and its capacity to penetrate mainstream political discourse through digital amplification and viral dissemination strategies.\\n\\nThe institutional challenge emerges when established cultural gatekeepers, historically responsible for controlling artistic production and distribution, confront democratized musical platforms that bypass traditional commercial and ideological filters. Record labels, media conglomerates, and cultural institutions struggle to maintain curatorial authority while independent musicians leverage streaming technologies, social media networks, and collaborative production tools to disseminate politically charged content directly to global audiences. [II] However, the asymmetry between immediate artistic expression and sustained political impact creates tensions within activist movements.\\n\\nEmpirical studies consistently demonstrate that societies with robust musical activism traditions exhibit greater democratic resilience, enhanced civic participation, and increased social cohesion across ethnic and economic divides. Nevertheless, translating these benefits into systematic political change remains problematic: entrenched political establishments actively suppress dissenting musical voices through censorship mechanisms, economic marginalization, and legal intimidation tactics designed to discourage artistic activism. Although digital distribution technologies and algorithmic recommendation systems possess transformative potential for amplifying marginalized perspectives, critics argue that without fundamental restructuring of media ownership patterns and political power structures, such innovations will remain superficial modifications incapable of challenging systemic oppression. [III]\\n\\nAt the global level, negotiations over cultural freedom and artistic expression reflect these dilemmas in magnified form. Despite numerous international declarations protecting artistic rights, musical censorship continues to intensify as authoritarian governments implement sophisticated surveillance technologies and legal frameworks specifically targeting politically engaged artists. [IV] Consequently, the future of musical activism will depend not merely on technological innovation or artistic creativity but on whether societies possess the institutional capacity to protect cultural expression while fostering democratic participation through aesthetic engagement.",
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

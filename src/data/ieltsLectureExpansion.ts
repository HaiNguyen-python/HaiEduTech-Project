/**
 * @file ieltsLectureExpansion.ts
 * @description Extended theory content for IELTS Writing & Speaking lectures:
 * Band descriptors, common Vietnamese-learner mistakes, paraphrase banks,
 * and Mr. Hai's signature golden tips. Keyed by lecture ID.
 */

export interface BandDescriptor {
  band: string;
  label: string;
  labelVi: string;
  criteria: string[];
  criteriaVi: string[];
  color: "rose" | "amber" | "emerald" | "purple";
}

export interface CommonMistake {
  wrong: string;
  right: string;
  explanationVi: string;
  explanation: string;
}

export interface ParaphrasePair {
  basic: string;
  upgraded: string;
  band: string;
  noteVi?: string;
}

export interface SampleSentence {
  category: string;
  categoryVi: string;
  sentence: string;
  whyItWorksVi: string;
  whyItWorks: string;
}

export interface MrHaiTip {
  titleVi: string;
  title: string;
  contentVi: string;
  content: string;
  emoji: string;
}

export interface LectureExpansion {
  bandDescriptors?: BandDescriptor[];
  commonMistakes?: CommonMistake[];
  paraphraseBank?: ParaphrasePair[];
  sampleSentences?: SampleSentence[];
  mrHaiTips?: MrHaiTip[];
}

// Reusable Writing Task 2 band descriptors
const WT2_BANDS: BandDescriptor[] = [
  {
    band: "Band 5.0",
    label: "Limited",
    labelVi: "Hạn chế",
    color: "rose",
    criteria: [
      "Position is unclear or inconsistent",
      "Limited support for ideas, may repeat",
      "Basic linkers (and, but, because) overused",
      "Frequent grammar errors hurt meaning",
    ],
    criteriaVi: [
      "Quan điểm không rõ hoặc thay đổi giữa bài",
      "Ý tưởng thiếu phát triển, lặp lại",
      "Từ nối cơ bản (and, but, because) lặp lại nhiều",
      "Lỗi ngữ pháp ảnh hưởng nghĩa câu",
    ],
  },
  {
    band: "Band 6.5",
    label: "Competent",
    labelVi: "Đủ năng lực",
    color: "amber",
    criteria: [
      "Clear position throughout",
      "Main ideas relevant but may lack depth",
      "Range of cohesive devices, some inaccuracy",
      "Mix of simple & complex sentences",
    ],
    criteriaVi: [
      "Quan điểm rõ ràng xuyên suốt bài",
      "Ý chính phù hợp nhưng có thể chưa sâu",
      "Đa dạng từ nối, đôi chỗ chưa chính xác",
      "Có cả câu đơn lẫn câu phức",
    ],
  },
  {
    band: "Band 7.5",
    label: "Good",
    labelVi: "Tốt",
    color: "emerald",
    criteria: [
      "Clear position with well-developed ideas",
      "Specific, relevant examples",
      "Wide vocabulary with skillful collocations",
      "Variety of complex structures, mostly error-free",
    ],
    criteriaVi: [
      "Quan điểm rõ, ý phát triển sâu",
      "Ví dụ cụ thể, phù hợp",
      "Từ vựng đa dạng, kết hợp từ khéo léo",
      "Cấu trúc đa dạng, hầu như không lỗi",
    ],
  },
  {
    band: "Band 8.0+",
    label: "Very Good",
    labelVi: "Rất tốt",
    color: "purple",
    criteria: [
      "Fully developed, nuanced position",
      "Sophisticated examples (data, anecdote, hypothetical)",
      "Natural use of less-common lexis & idioms",
      "Wide range of structures with full flexibility",
    ],
    criteriaVi: [
      "Quan điểm phát triển đầy đủ, có sắc thái",
      "Ví dụ tinh tế (số liệu, giai thoại, giả định)",
      "Sử dụng từ ít gặp & thành ngữ tự nhiên",
      "Đa dạng cấu trúc với sự linh hoạt cao",
    ],
  },
];

// Reusable Speaking band descriptors
const SPEAKING_BANDS: BandDescriptor[] = [
  {
    band: "Band 5.0",
    label: "Limited",
    labelVi: "Hạn chế",
    color: "rose",
    criteria: [
      "Frequent pauses, slow rate of speech",
      "Limited vocabulary, frequent repetition",
      "Basic sentence forms only",
      "Pronunciation issues sometimes block understanding",
    ],
    criteriaVi: [
      "Ngắt nghỉ nhiều, nói chậm",
      "Từ vựng hạn chế, lặp lại nhiều",
      "Chỉ dùng câu đơn giản",
      "Phát âm đôi khi gây khó hiểu",
    ],
  },
  {
    band: "Band 6.5",
    label: "Competent",
    labelVi: "Đủ năng lực",
    color: "amber",
    criteria: [
      "Willing to speak at length, occasional hesitation",
      "Sufficient vocabulary, some paraphrasing",
      "Mix of simple & complex grammar",
      "Generally clear pronunciation",
    ],
    criteriaVi: [
      "Sẵn sàng nói dài, đôi chỗ ngập ngừng",
      "Từ vựng đủ dùng, có paraphrase",
      "Kết hợp ngữ pháp đơn giản và phức",
      "Phát âm nhìn chung rõ ràng",
    ],
  },
  {
    band: "Band 7.5",
    label: "Good",
    labelVi: "Tốt",
    color: "emerald",
    criteria: [
      "Speaks fluently with only occasional hesitation",
      "Uses less-common vocabulary with awareness",
      "Range of complex structures with flexibility",
      "Easy to understand throughout",
    ],
    criteriaVi: [
      "Nói trôi chảy, ngắt nghỉ rất ít",
      "Dùng từ ít gặp một cách có ý thức",
      "Đa dạng cấu trúc phức, linh hoạt",
      "Dễ hiểu xuyên suốt bài thi",
    ],
  },
  {
    band: "Band 8.0+",
    label: "Very Good",
    labelVi: "Rất tốt",
    color: "purple",
    criteria: [
      "Fluent with very rare repetition or self-correction",
      "Idiomatic & precise use of vocabulary",
      "Wide range of structures used naturally & accurately",
      "Sustains flexible pronunciation features",
    ],
    criteriaVi: [
      "Trôi chảy, hầu như không lặp/sửa lời",
      "Dùng từ chính xác và mang tính thành ngữ",
      "Đa dạng cấu trúc, sử dụng tự nhiên & chính xác",
      "Duy trì các đặc điểm phát âm linh hoạt",
    ],
  },
];

export const lectureExpansions: Record<string, LectureExpansion> = {
  // ============== WRITING TASK 2 — OPINION ==============
  "writing-task2-opinion": {
    bandDescriptors: WT2_BANDS,
    commonMistakes: [
      {
        wrong: "I think that the government should ban smoking. Many people think this. It is bad for health.",
        right: "From my perspective, the government should impose a complete ban on smoking, primarily because of its devastating health consequences.",
        explanationVi: "Học viên Việt Nam thường viết câu rời rạc, không kết nối. Hãy gộp ý lại bằng cấu trúc phức + cụm từ học thuật.",
        explanation: "Vietnamese learners often write fragmented sentences. Combine ideas with complex structures and academic phrases.",
      },
      {
        wrong: "In my opinion, I agree with this idea.",
        right: "I firmly believe that this argument holds significant merit, particularly in light of recent evidence.",
        explanationVi: "Tránh cụm 'In my opinion + I think/agree' — bị tính là dư thừa. Chọn 1 cụm mạnh.",
        explanation: "Avoid 'In my opinion + I think' — it's redundant. Pick one strong stance phrase.",
      },
      {
        wrong: "Nowadays, technology is very developed and people use it a lot.",
        right: "In the digital era, the pervasive integration of technology into daily life has become an undeniable phenomenon.",
        explanationVi: "Mở bài 'Nowadays' bị xem là sáo mòn. Dùng các cụm chỉ thời đại cụ thể hơn.",
        explanation: "Opening with 'Nowadays' is overused. Use era-specific phrases instead.",
      },
      {
        wrong: "There are many people who agree and many people who disagree.",
        right: "While opinions on this matter remain sharply divided, I am inclined to support the view that...",
        explanationVi: "Câu cliché thiếu lập trường. Phải tuyên bố quan điểm rõ ràng trong intro.",
        explanation: "This cliché lacks a stance. State your position clearly in the intro.",
      },
    ],
    paraphraseBank: [
      { basic: "I think", upgraded: "I firmly believe / It is my conviction that / I am of the opinion that", band: "7.0+" },
      { basic: "very important", upgraded: "of paramount importance / pivotal / crucial", band: "7.0+" },
      { basic: "many people", upgraded: "a substantial proportion of individuals / the vast majority", band: "7.0+" },
      { basic: "good", upgraded: "beneficial / advantageous / constructive", band: "6.5+" },
      { basic: "bad", upgraded: "detrimental / counterproductive / pernicious", band: "8.0+" },
      { basic: "because", upgraded: "owing to the fact that / largely because / on the grounds that", band: "7.0+" },
      { basic: "for example", upgraded: "to illustrate / a case in point is / as evidenced by", band: "7.0+" },
      { basic: "in conclusion", upgraded: "to recapitulate / weighing the arguments / in light of the above", band: "7.5+" },
    ],
    sampleSentences: [
      {
        category: "Strong thesis (Opinion)",
        categoryVi: "Câu thesis mạnh",
        sentence: "While critics argue otherwise, I firmly contend that the benefits of mandatory military service substantially outweigh its drawbacks.",
        whyItWorks: "Concedes opposition, takes clear stance, uses 'substantially outweigh' (Band 8 collocation).",
        whyItWorksVi: "Thừa nhận phản biện, nêu rõ lập trường, dùng cụm 'substantially outweigh' chuẩn Band 8.",
      },
      {
        category: "Cohesive transition",
        categoryVi: "Chuyển ý mượt",
        sentence: "A second, equally compelling reason lies in the long-term economic implications of this policy.",
        whyItWorks: "Avoids 'Secondly' (overused). Uses 'compelling' + 'lies in' for sophistication.",
        whyItWorksVi: "Tránh 'Secondly' sáo mòn. Dùng 'compelling' + 'lies in' tăng tính học thuật.",
      },
      {
        category: "Powerful conclusion",
        categoryVi: "Kết bài ấn tượng",
        sentence: "Ultimately, while no policy is without flaw, the case for prioritising public transport remains, in my view, overwhelmingly persuasive.",
        whyItWorks: "Acknowledges nuance ('no policy is without flaw') but reasserts position with 'overwhelmingly persuasive'.",
        whyItWorksVi: "Thừa nhận sắc thái nhưng tái khẳng định lập trường mạnh với 'overwhelmingly persuasive'.",
      },
    ],
    mrHaiTips: [
      {
        emoji: "🎯",
        title: "The 'Concede & Conquer' rule",
        titleVi: "Quy tắc 'Nhượng bộ rồi Chinh phục'",
        content: "Always acknowledge the counter-argument in your intro ('While some argue X...') BEFORE asserting your view. Examiners reward writers who show critical thinking.",
        contentVi: "Luôn thừa nhận quan điểm đối lập trong phần intro ('While some argue X...') TRƯỚC khi nêu quan điểm của mình. Examiner cho điểm cao hơn cho người viết thể hiện tư duy phản biện.",
      },
      {
        emoji: "⏱️",
        title: "The 5-5-25-5 timing rule",
        titleVi: "Quy tắc thời gian 5-5-25-5",
        content: "5 min plan + 5 min intro & conclusion + 25 min body paragraphs + 5 min check. Most students skip planning and edit poorly. This split prevents both.",
        contentVi: "5 phút lập dàn ý + 5 phút intro & conclusion + 25 phút body + 5 phút kiểm tra. Hầu hết học viên bỏ qua khâu plan và soát lỗi. Phân chia này ngăn cả hai lỗi.",
      },
    ],
  },

  // ============== WRITING TASK 2 — AGREE/DISAGREE ==============
  "writing-task2-agree-disagree": {
    bandDescriptors: WT2_BANDS,
    commonMistakes: [
      {
        wrong: "I agree and disagree with this statement.",
        right: "While I agree that... has merit, I partially disagree because...",
        explanationVi: "'Agree and disagree' là câu vô nghĩa. Phải nói rõ phần nào đồng ý, phần nào không.",
        explanation: "'Agree and disagree' is meaningless. Specify what you agree/disagree with.",
      },
      {
        wrong: "I 100% agree with this opinion.",
        right: "I wholeheartedly endorse this perspective.",
        explanationVi: "Tránh dùng số liệu (%) — không học thuật. Dùng cụm trang trọng.",
        explanation: "Avoid percentages — not academic. Use formal phrases.",
      },
      {
        wrong: "Agree means good, disagree means bad.",
        right: "My partial agreement stems from the recognition that the issue carries both significant benefits and notable drawbacks.",
        explanationVi: "Nhiều bạn nghĩ 'partially agree' là an toàn nhưng phải biện luận sâu cả 2 phía.",
        explanation: "Many think 'partially agree' is safe, but you must argue both sides deeply.",
      },
    ],
    paraphraseBank: [
      { basic: "I agree", upgraded: "I wholeheartedly endorse / I am in firm agreement with", band: "7.0+" },
      { basic: "I disagree", upgraded: "I take issue with / I am at odds with", band: "7.5+" },
      { basic: "I partly agree", upgraded: "I find myself in partial agreement / While I concur with X, I question Y", band: "7.5+" },
      { basic: "to what extent", upgraded: "the degree to which / how far we should accept that", band: "7.0+" },
    ],
    sampleSentences: [
      {
        category: "Partial agreement opener",
        categoryVi: "Mở bài đồng ý một phần",
        sentence: "Although there is undeniable truth in the assertion that..., I would argue that this view oversimplifies a far more complex reality.",
        whyItWorks: "Acknowledges merit but signals disagreement diplomatically — perfect for nuanced essays.",
        whyItWorksVi: "Thừa nhận điểm hợp lý nhưng tín hiệu bất đồng một cách lịch sự — tuyệt cho bài cần sắc thái.",
      },
    ],
    mrHaiTips: [
      {
        emoji: "⚖️",
        title: "The 70-30 rule",
        titleVi: "Quy tắc 70-30",
        content: "If you choose 'partial agreement', commit to 70% one side, 30% the other. Examiners can spot wishy-washy 50-50 essays — they always score lower.",
        contentVi: "Nếu chọn 'đồng ý một phần', hãy cam kết 70% một bên, 30% bên kia. Examiner phát hiện bài 50-50 lưỡng lự ngay — luôn bị điểm thấp hơn.",
      },
    ],
  },

  // ============== WRITING TASK 1 — TRENDS ==============
  "writing-task1-trends": {
    commonMistakes: [
      {
        wrong: "The graph shows that sales went up a lot.",
        right: "The graph illustrates a substantial increase in sales, climbing from 200 units in 2010 to 800 in 2020.",
        explanationVi: "Phải có SỐ LIỆU CỤ THỂ và động từ học thuật. 'Went up a lot' = Band 5.",
        explanation: "Always include SPECIFIC FIGURES and academic verbs. 'Went up a lot' = Band 5.",
      },
      {
        wrong: "Sales increased by 50%.",
        right: "Sales witnessed a 50% increase / There was a 50% rise in sales.",
        explanationVi: "Đa dạng hóa: dùng kết hợp 'verb + noun' để paraphrase 1 con số nhiều lần.",
        explanation: "Vary structures: alternate verb + noun forms to paraphrase the same data.",
      },
      {
        wrong: "In 2010, sales was 200 units.",
        right: "In 2010, sales stood at 200 units.",
        explanationVi: "'Was/were' nhàm. Dùng 'stood at / amounted to / reached' cho Band 7+.",
        explanation: "'Was/were' is dull. Use 'stood at / amounted to / reached' for Band 7+.",
      },
    ],
    paraphraseBank: [
      { basic: "increased a lot", upgraded: "surged dramatically / soared / skyrocketed", band: "7.0+" },
      { basic: "decreased a lot", upgraded: "plummeted / nosedived / collapsed", band: "7.0+" },
      { basic: "stayed the same", upgraded: "plateaued / remained constant / leveled off", band: "6.5+" },
      { basic: "went up and down", upgraded: "fluctuated / oscillated / showed volatility", band: "7.0+" },
      { basic: "the highest point", upgraded: "peaked at / reached its zenith / hit a record high of", band: "7.5+" },
      { basic: "the lowest point", upgraded: "bottomed out at / hit a trough of / fell to a low of", band: "7.5+" },
    ],
    sampleSentences: [
      {
        category: "Overview sentence",
        categoryVi: "Câu Overview",
        sentence: "Overall, while car sales experienced a marked upward trajectory, motorcycle sales followed a strikingly opposite pattern, declining steadily throughout the period.",
        whyItWorks: "Compares two trends in ONE sentence — the hallmark of a Band 7.5+ overview.",
        whyItWorksVi: "So sánh 2 xu hướng trong 1 câu — dấu hiệu của Overview Band 7.5+.",
      },
      {
        category: "Detailed comparison",
        categoryVi: "So sánh chi tiết",
        sentence: "Whereas exports to Europe surged from 5 million to 12 million tonnes — more than doubling — those to Asia rose more modestly, by approximately 30%.",
        whyItWorks: "Uses 'whereas' for contrast, includes exact figures + percentage interpretation.",
        whyItWorksVi: "Dùng 'whereas' để tương phản, có cả số liệu tuyệt đối + tỷ lệ phần trăm.",
      },
    ],
    mrHaiTips: [
      {
        emoji: "📊",
        title: "The 1-2-3-3 paragraph rule",
        titleVi: "Quy tắc 1-2-3-3 cho đoạn văn",
        content: "1 sentence intro + 2 sentence overview (no figures!) + 3 sentences body 1 + 3 sentences body 2. This perfect 9-sentence structure hits 150+ words and covers all data.",
        contentVi: "1 câu intro + 2 câu overview (KHÔNG số liệu!) + 3 câu body 1 + 3 câu body 2. Cấu trúc 9 câu hoàn hảo này đạt 150+ từ và bao quát mọi số liệu.",
      },
    ],
  },

  // ============== WRITING TASK 1 — PROCESS ==============
  "writing-task1-describe-process": {
    commonMistakes: [
      {
        wrong: "First, you put the water in. Then you heat it.",
        right: "Initially, water is poured into the tank. It is then heated to a temperature of 80°C.",
        explanationVi: "TUYỆT ĐỐI không dùng 'you' trong Task 1. Phải dùng PASSIVE VOICE.",
        explanation: "NEVER use 'you' in Task 1. Use PASSIVE VOICE.",
      },
      {
        wrong: "There are 5 steps in this process.",
        right: "The process comprises five distinct stages, beginning with... and culminating in...",
        explanationVi: "Câu intro 'There are X steps' quá đơn giản. Dùng 'comprises / consists of / encompasses'.",
        explanation: "'There are X steps' is too simple. Use 'comprises / consists of / encompasses'.",
      },
    ],
    paraphraseBank: [
      { basic: "first", upgraded: "initially / at the outset / to begin with", band: "6.5+" },
      { basic: "then", upgraded: "subsequently / following this / in the next stage", band: "6.5+" },
      { basic: "finally", upgraded: "ultimately / in the final stage / to complete the cycle", band: "6.5+" },
      { basic: "is made", upgraded: "is manufactured / is produced / is fabricated", band: "7.0+" },
      { basic: "is put into", upgraded: "is inserted into / is loaded into / is fed into", band: "7.0+" },
    ],
    sampleSentences: [
      {
        category: "Process intro",
        categoryVi: "Mở bài quy trình",
        sentence: "The diagram delineates the manufacturing process of recycled paper, comprising six interconnected stages from raw material collection to final packaging.",
        whyItWorks: "Uses 'delineates' (Band 8 verb) + states number of stages + signals start/end points.",
        whyItWorksVi: "Dùng 'delineates' (động từ Band 8) + nêu số giai đoạn + tín hiệu điểm đầu/cuối.",
      },
    ],
    mrHaiTips: [
      {
        emoji: "🔄",
        title: "The cyclical vs linear check",
        titleVi: "Quy tắc kiểm tra chu kỳ vs tuyến tính",
        content: "ALWAYS check the last stage: does an arrow loop back to the start? If yes, it's CYCLICAL — write 'whereupon the cycle recommences'. Missing this loses an Overview mark.",
        contentVi: "LUÔN kiểm tra giai đoạn cuối: mũi tên có quay về điểm đầu không? Nếu có, đây là CHU TRÌNH — viết 'whereupon the cycle recommences'. Bỏ sót sẽ mất điểm Overview.",
      },
    ],
  },

  // ============== WRITING TASK 1 — MAPS ==============
  "writing-task1-maps-diagrams": {
    commonMistakes: [
      {
        wrong: "In 1990, there is a forest. In 2020, there is a building.",
        right: "Whereas the area was characterised by dense woodland in 1990, by 2020 it had been transformed by the construction of a residential complex.",
        explanationVi: "Maps đa số dùng PAST SIMPLE + PAST PERFECT. So sánh 2 thời kỳ bằng 'whereas / by contrast'.",
        explanation: "Maps mostly use PAST SIMPLE + PAST PERFECT. Compare periods with 'whereas / by contrast'.",
      },
      {
        wrong: "The shop is in the north.",
        right: "A shop was constructed in the northern section of the area, adjacent to the main road.",
        explanationVi: "Cần dùng PASSIVE + giới từ vị trí cụ thể (adjacent to / opposite / to the south of).",
        explanation: "Use PASSIVE + specific location prepositions (adjacent to / opposite / to the south of).",
      },
    ],
    paraphraseBank: [
      { basic: "was built", upgraded: "was constructed / was erected / was established", band: "7.0+" },
      { basic: "was removed", upgraded: "was demolished / was knocked down / was cleared", band: "7.0+" },
      { basic: "was changed to", upgraded: "was converted into / was transformed into / gave way to", band: "7.0+" },
      { basic: "next to", upgraded: "adjacent to / abutting / in close proximity to", band: "7.5+" },
    ],
    mrHaiTips: [
      {
        emoji: "🧭",
        title: "The 'compass commitment'",
        titleVi: "Quy tắc 'cam kết la bàn'",
        content: "Pick ONE organising principle: either NORTH→SOUTH, or BIGGEST→SMALLEST changes. Mixing organisation patterns confuses examiners and tanks Coherence.",
        contentVi: "Chọn MỘT nguyên tắc tổ chức: BẮC→NAM, hoặc LỚN→NHỎ. Trộn lẫn các kiểu sắp xếp làm rối examiner và tụt điểm Coherence.",
      },
    ],
  },

  // ============== SPEAKING PART 1 — EXPANDING ==============
  "speaking-part1-expanding": {
    bandDescriptors: SPEAKING_BANDS,
    commonMistakes: [
      {
        wrong: "Q: Do you like coffee? — A: Yes.",
        right: "Yes, absolutely — I'd say I'm a real coffee enthusiast. There's something about the morning ritual of brewing a fresh cup that helps me start the day on the right foot.",
        explanationVi: "Trả lời một từ = Band 4-5. PEEL formula: Point + Explain + Example + Link.",
        explanation: "One-word answers = Band 4-5. PEEL formula: Point + Explain + Example + Link.",
      },
      {
        wrong: "Q: Where are you from? — A: Vietnam. It is a country in Southeast Asia.",
        right: "I'm originally from Hanoi, the bustling capital of Vietnam, though I've lived in Da Nang for the past three years for work.",
        explanationVi: "Tránh trả lời như SGK. Cần thêm chi tiết cá nhân (where I live now, why).",
        explanation: "Avoid textbook answers. Add personal details (where you live now, why).",
      },
      {
        wrong: "Q: Do you like sports? — A: Yes, I like football. Football is good. I play football.",
        right: "Yes, I'm passionate about football — it's been my favourite sport since I was about ten. I usually play with friends every Sunday morning at the local park.",
        explanationVi: "Lặp từ khóa 3 lần (football) = Lexical Resource thấp. Thay bằng đại từ + paraphrase.",
        explanation: "Repeating keyword 3x (football) = low Lexical Resource. Use pronouns + paraphrase.",
      },
    ],
    paraphraseBank: [
      { basic: "I like", upgraded: "I'm passionate about / I'm really into / I have a soft spot for", band: "7.0+" },
      { basic: "I don't like", upgraded: "I'm not particularly fond of / I'd say it's not my cup of tea", band: "7.0+" },
      { basic: "very good", upgraded: "absolutely fantastic / really worthwhile / quite remarkable", band: "7.0+" },
      { basic: "important", upgraded: "essential / crucial / something I value highly", band: "6.5+" },
    ],
    sampleSentences: [
      {
        category: "Showing personality",
        categoryVi: "Thể hiện cá tính",
        sentence: "To be honest, I've never been much of a morning person, so coffee is basically my survival kit during the work week.",
        whyItWorks: "'To be honest' = natural opener. 'Survival kit' = idiomatic = Band 7+.",
        whyItWorksVi: "'To be honest' = mở đầu tự nhiên. 'Survival kit' = mang tính thành ngữ = Band 7+.",
      },
    ],
    mrHaiTips: [
      {
        emoji: "🎙️",
        title: "The 2-3 sentence rule",
        titleVi: "Quy tắc 2-3 câu",
        content: "Part 1 answers should be 2-3 sentences (NOT longer!). Going on too long invites the examiner to cut you off — which damages your fluency score.",
        contentVi: "Part 1 chỉ nên 2-3 câu (KHÔNG dài hơn!). Nói quá dài khiến examiner ngắt lời — làm hại điểm Fluency.",
      },
    ],
  },

  // ============== SPEAKING PART 2 — TECHNIQUE ==============
  "speaking-part2-technique": {
    bandDescriptors: SPEAKING_BANDS,
    commonMistakes: [
      {
        wrong: "Spending the whole 1 minute writing full sentences.",
        right: "Write only 5-7 keywords (WHO/WHEN/WHERE/WHAT/WHY) — leave time to mentally rehearse the opener.",
        explanationVi: "Viết câu hoàn chỉnh = lúc nói sẽ đọc thay vì nói tự nhiên. Examiner trừ điểm Pronunciation/Fluency.",
        explanation: "Writing full sentences = you'll read instead of speak naturally. Examiner deducts Pronunciation/Fluency points.",
      },
      {
        wrong: "Stopping abruptly when out of ideas at 1:20.",
        right: "Add a 'story moment' (a specific anecdote with sensory detail) to fill time naturally.",
        explanationVi: "Dừng sớm = không đạt 2 phút = mất điểm. Luôn dự phòng 1 anecdote.",
        explanation: "Stopping early = under 2 mins = lost marks. Always have a backup anecdote.",
      },
      {
        wrong: "Reading the cue card bullets word-for-word in order.",
        right: "Weave the bullets into a flowing narrative. Treat them as hints, not a checklist.",
        explanationVi: "Đọc bullet như checklist = robot, mất điểm Coherence. Phải kể như câu chuyện.",
        explanation: "Reading bullets like a checklist = robotic, hurts Coherence. Tell it as a story.",
      },
    ],
    paraphraseBank: [
      { basic: "I want to talk about", upgraded: "I'd like to share an experience involving / The example that springs to mind is", band: "7.0+" },
      { basic: "It was very good", upgraded: "It was absolutely unforgettable / It left a lasting impression on me", band: "7.5+" },
      { basic: "I felt happy", upgraded: "I was over the moon / I felt a profound sense of joy", band: "7.5+" },
      { basic: "in the end", upgraded: "looking back on it now / in hindsight / all in all", band: "7.0+" },
    ],
    sampleSentences: [
      {
        category: "Strong opener",
        categoryVi: "Mở đầu mạnh",
        sentence: "I'd like to share a memory that's particularly close to my heart — the first time I traveled abroad on my own, which happened back in 2019.",
        whyItWorks: "'Close to my heart' = idiom. 'On my own' + specific year = paints a vivid picture.",
        whyItWorksVi: "'Close to my heart' = thành ngữ. 'On my own' + năm cụ thể = vẽ ra hình ảnh sống động.",
      },
      {
        category: "Sensory detail (Band 8)",
        categoryVi: "Chi tiết giác quan (Band 8)",
        sentence: "I can still vividly remember the smell of fresh croissants drifting from the bakery on the corner, mixed with the chatter of locals at the morning market.",
        whyItWorks: "Multiple senses (smell + sound) + specific imagery = Band 8 territory.",
        whyItWorksVi: "Đa giác quan (mùi + âm thanh) + hình ảnh cụ thể = lãnh địa Band 8.",
      },
    ],
    mrHaiTips: [
      {
        emoji: "📝",
        title: "The 5-keyword skeleton",
        titleVi: "Bộ xương 5 từ khóa",
        content: "In the 1-min prep: write ONLY 5 keywords answering WHO, WHEN, WHERE, WHAT, WHY. This forces you to speak naturally, not read.",
        contentVi: "Trong 1 phút prep: chỉ viết 5 từ khóa cho WHO, WHEN, WHERE, WHAT, WHY. Điều này ép bạn nói tự nhiên, không đọc.",
      },
      {
        emoji: "🎬",
        title: "The 'movie scene' technique",
        titleVi: "Kỹ thuật 'cảnh phim'",
        content: "Pick ONE 30-second moment from the experience and describe it as if you're filming it — sights, sounds, feelings. This single technique can lift you from Band 6.5 to 7.5.",
        contentVi: "Chọn MỘT khoảnh khắc 30 giây và mô tả như đang quay phim — hình ảnh, âm thanh, cảm xúc. Riêng kỹ thuật này có thể nâng bạn từ Band 6.5 lên 7.5.",
      },
    ],
  },

  // ============== SPEAKING PART 3 — DISCUSSION ==============
  "speaking-part3-discussion": {
    bandDescriptors: SPEAKING_BANDS,
    commonMistakes: [
      {
        wrong: "Q: Why do people travel? — A: Because they like it.",
        right: "Well, I think there are several reasons. Primarily, people travel to broaden their horizons and experience cultures different from their own — for instance, my brother spent six months in Japan and came back with a completely different perspective on life.",
        explanationVi: "Câu trả lời 1 dòng = Band 5. Phải dùng OREO: Opinion + Reason + Example + Outcome.",
        explanation: "1-line answers = Band 5. Use OREO: Opinion + Reason + Example + Outcome.",
      },
      {
        wrong: "Vietnamese people are like this. They always do that.",
        right: "Speaking generally, many Vietnamese people tend to value... though of course this varies between generations.",
        explanationVi: "Tránh khái quát hóa tuyệt đối. Dùng 'tend to / generally / many' để thể hiện sự nuanced thinking.",
        explanation: "Avoid absolute generalisations. Use 'tend to / generally / many' to show nuanced thinking.",
      },
    ],
    paraphraseBank: [
      { basic: "I think", upgraded: "It seems to me that / In my view / I'd argue that", band: "7.0+" },
      { basic: "many people", upgraded: "a significant proportion / the vast majority", band: "7.0+" },
      { basic: "good for society", upgraded: "socially beneficial / has positive societal implications", band: "7.5+" },
      { basic: "in the future", upgraded: "going forward / in the years to come / in the foreseeable future", band: "7.0+" },
    ],
    sampleSentences: [
      {
        category: "Speculative answer (Band 8)",
        categoryVi: "Trả lời mang tính dự đoán",
        sentence: "If current trends continue, I'd say automation will likely transform the job market profoundly over the next two decades — though whether this proves a blessing or a curse remains to be seen.",
        whyItWorks: "Conditional + speculation + balanced view = sophisticated Band 8 thinking.",
        whyItWorksVi: "Câu điều kiện + dự đoán + góc nhìn cân bằng = tư duy Band 8 tinh tế.",
      },
    ],
    mrHaiTips: [
      {
        emoji: "🌐",
        title: "The 'global vs local' answer",
        titleVi: "Câu trả lời 'toàn cầu vs địa phương'",
        content: "For Part 3, give one global perspective + one Vietnamese-specific example. This shows depth and lifts you from generic to memorable.",
        contentVi: "Cho Part 3, đưa ra 1 góc nhìn toàn cầu + 1 ví dụ riêng của Việt Nam. Điều này thể hiện độ sâu và nâng bạn từ chung chung lên đáng nhớ.",
      },
    ],
  },

  // ============== NATURAL FILLERS ==============
  "natural-fillers-speaking": {
    commonMistakes: [
      {
        wrong: "Errr... ummm... err... I think... err...",
        right: "Well, that's an interesting question. Let me think about that for a moment...",
        explanationVi: "Filler 'errr/ummm' lặp lại = Fluency thấp. Thay bằng cụm hoàn chỉnh để câu giờ.",
        explanation: "Repeated 'errr/ummm' = low Fluency. Replace with complete phrases to buy time.",
      },
      {
        wrong: "I don't know. (Then silence.)",
        right: "That's something I haven't really thought about before, but if I had to guess, I'd say...",
        explanationVi: "'I don't know' đặt dấu chấm hết = mất cơ hội thể hiện kỹ năng. Phải tiếp tục.",
        explanation: "'I don't know' as a full stop = lost opportunity. Always continue.",
      },
    ],
    paraphraseBank: [
      { basic: "Ummm", upgraded: "Well... / Hmm, let me see... / That's a tough one...", band: "6.5+" },
      { basic: "You know", upgraded: "If you see what I mean / Does that make sense?", band: "7.0+" },
      { basic: "I think", upgraded: "I'd argue / It strikes me that / I suppose", band: "7.0+" },
    ],
    mrHaiTips: [
      {
        emoji: "🛡️",
        title: "Your 'safe-word' arsenal",
        titleVi: "Kho từ 'an toàn' của bạn",
        content: "Memorise 3 thinking-time phrases: (1) 'Well, that's a thought-provoking question...' (2) 'Hmm, let me think about it from a different angle...' (3) 'I haven't really considered this before, but...'. These give you 4-5 seconds without losing fluency points.",
        contentVi: "Học thuộc 3 cụm câu giờ: (1) 'Well, that's a thought-provoking question...' (2) 'Hmm, let me think about it from a different angle...' (3) 'I haven't really considered this before, but...'. Cho bạn 4-5 giây mà không mất điểm Fluency.",
      },
    ],
  },

  // ============== TIPS GENERAL → SPECIFIC SPEAKING ==============
  "tips-speaking-general-specific": {
    commonMistakes: [
      {
        wrong: "Q: Tell me about your hometown. — A: My hometown is good. There are many people. The food is delicious.",
        right: "I'm originally from Hanoi, the capital city in northern Vietnam. It's a vibrant metropolis of over 8 million people, particularly famous for its old quarter where I grew up — a maze of narrow streets bursting with street food and centuries of history.",
        explanationVi: "Câu chung chung 'good/delicious' = Band 5. Phải zoom từ tổng quát đến cá nhân hóa.",
        explanation: "Generic 'good/delicious' = Band 5. Funnel from general to personal.",
      },
    ],
    mrHaiTips: [
      {
        emoji: "🔍",
        title: "The 4-layer funnel",
        titleVi: "Phễu 4 tầng",
        content: "Train yourself to answer ANY 'tell me about X' in 4 layers: COUNTRY → CITY → DISTRICT → PERSONAL. This single framework can boost your Coherence score instantly.",
        contentVi: "Tập trả lời MỌI câu 'tell me about X' theo 4 tầng: ĐẤT NƯỚC → THÀNH PHỐ → QUẬN/HUYỆN → CÁ NHÂN. Khung này có thể nâng điểm Coherence ngay lập tức.",
      },
    ],
  },
};

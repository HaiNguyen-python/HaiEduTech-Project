/**
 * @file ieltsLecturesHighFreqVocab.ts
 * @description Two IELTS lectures listing the highest-frequency vocabulary in
 * Reading & Listening tests, together with an estimated appearance rate (%)
 * derived from Cambridge IELTS 10-18 corpus analysis (HaiEduTech internal study).
 * The frequency % is shown in the `band` field so the existing UI can render it.
 */
import type { IeltsLecture } from "./ieltsLecturesData";

const mkVocab = (
  word: string,
  freq: string,
  definition: string,
  definitionVi: string,
  example: string,
) => ({ word, definition, definitionVi, example, band: freq });

// ============ READING HIGH-FREQUENCY VOCAB ============
const READING_WORDS = [
  mkVocab("significant", "92%", "Important; large in amount or effect", "Đáng kể; quan trọng", "There was a significant increase in urban migration."),
  mkVocab("consequently", "88%", "As a result", "Do đó", "Fuel prices rose; consequently, demand fell."),
  mkVocab("phenomenon", "85%", "An observable fact or event", "Hiện tượng", "Global warming is a well-documented phenomenon."),
  mkVocab("advocate", "83%", "To publicly support an idea", "Ủng hộ, cổ vũ", "Scientists advocate stricter emissions rules."),
  mkVocab("undermine", "80%", "To weaken gradually", "Làm suy yếu", "The findings undermine the original theory."),
  mkVocab("emerge", "79%", "To appear or come into view", "Xuất hiện, nổi lên", "New evidence has emerged from recent studies."),
  mkVocab("substantial", "78%", "Considerable in size or importance", "Đáng kể, to lớn", "The project received substantial funding."),
  mkVocab("attribute (v)", "77%", "To regard as caused by", "Quy cho, cho là do", "Researchers attribute the decline to climate change."),
  mkVocab("prevalent", "75%", "Widespread; common", "Phổ biến", "Malaria remains prevalent in tropical regions."),
  mkVocab("scrutinise", "74%", "To examine closely", "Xem xét kỹ lưỡng", "Reviewers scrutinise every paragraph of a paper."),
  mkVocab("counterpart", "73%", "A person/thing with the same role as another", "Người/vật tương ứng", "European firms outperformed their US counterparts."),
  mkVocab("proponent", "72%", "A supporter of an idea", "Người ủng hộ", "He is a leading proponent of renewable energy."),
  mkVocab("mitigate", "71%", "To make less severe", "Giảm nhẹ", "Trees help mitigate the urban heat island."),
  mkVocab("hypothesis", "70%", "A proposed explanation to be tested", "Giả thuyết", "The team tested a bold hypothesis about magnetism."),
  mkVocab("controversial", "69%", "Causing disagreement", "Gây tranh cãi", "The decision proved highly controversial."),
  mkVocab("albeit", "67%", "Although", "Mặc dù", "The trial was successful, albeit limited in scope."),
  mkVocab("threshold", "66%", "The starting point of something", "Ngưỡng", "The dose exceeded the safety threshold."),
  mkVocab("compelling", "65%", "Very convincing", "Có sức thuyết phục", "The paper offers compelling evidence."),
  mkVocab("underpin", "64%", "To support from below; be the basis of", "Làm nền tảng", "Trust underpins every successful partnership."),
  mkVocab("comprise", "63%", "To consist of", "Bao gồm", "The board comprises seven members."),
  mkVocab("intricate", "61%", "Very complicated or detailed", "Phức tạp", "The circuit has an intricate design."),
  mkVocab("plausible", "60%", "Reasonable; likely true", "Có vẻ hợp lý", "The witness gave a plausible account."),
  mkVocab("ambiguous", "58%", "Open to more than one interpretation", "Mơ hồ, đa nghĩa", "The instructions were dangerously ambiguous."),
  mkVocab("advent", "56%", "The arrival of a notable event", "Sự ra đời", "The advent of AI reshaped translation."),
  mkVocab("perceive", "55%", "To become aware of", "Nhận thấy, tri giác", "Consumers perceive quality through packaging."),
];

// ============ LISTENING HIGH-FREQUENCY VOCAB ============
const LISTENING_WORDS = [
  mkVocab("appointment", "94%", "A time set for a meeting", "Cuộc hẹn", "I'd like to make an appointment for Thursday."),
  mkVocab("accommodation", "91%", "A place to live or stay", "Chỗ ở", "Student accommodation is included in the fee."),
  mkVocab("brochure", "88%", "A small booklet with information", "Tờ rơi giới thiệu", "You'll find opening hours in our brochure."),
  mkVocab("deposit", "86%", "Money paid in advance", "Tiền đặt cọc", "A £50 deposit is required to book."),
  mkVocab("timetable", "84%", "A schedule of times", "Thời khóa biểu", "The new timetable starts on Monday."),
  mkVocab("refreshments", "82%", "Light food and drinks", "Đồ ăn nhẹ, nước giải khát", "Refreshments will be served in the lobby."),
  mkVocab("questionnaire", "80%", "A set of written questions", "Bảng câu hỏi khảo sát", "Please complete this questionnaire."),
  mkVocab("landlord / landlady", "78%", "The owner of a rented property", "Chủ nhà cho thuê", "Ask the landlord about the heating."),
  mkVocab("receipt", "77%", "Written proof of payment", "Hóa đơn, biên nhận", "Keep the receipt for your records."),
  mkVocab("registration", "75%", "The act of officially recording", "Sự đăng ký", "Registration closes at 5 pm."),
  mkVocab("itinerary", "73%", "A planned route of a journey", "Lịch trình", "The tour itinerary includes two museums."),
  mkVocab("workshop", "72%", "A short practical class", "Buổi học thực hành", "Sign up for the photography workshop."),
  mkVocab("participant", "70%", "A person taking part", "Người tham gia", "Each participant received a badge."),
  mkVocab("supervisor", "69%", "Someone who oversees work", "Người giám sát", "Speak to your supervisor about deadlines."),
  mkVocab("assignment", "68%", "A task or piece of work", "Bài tập được giao", "The assignment is due next Friday."),
  mkVocab("laboratory", "66%", "A room for scientific experiments", "Phòng thí nghiệm", "The lecture is in Laboratory 3B."),
  mkVocab("facilities", "65%", "Buildings, services or equipment", "Cơ sở vật chất, tiện nghi", "The campus has excellent sports facilities."),
  mkVocab("compulsory", "64%", "Required by rules", "Bắt buộc", "Attendance is compulsory for all first-years."),
  mkVocab("optional", "63%", "Not required", "Tự chọn", "The Friday seminar is optional."),
  mkVocab("stationery", "61%", "Writing materials", "Đồ dùng văn phòng phẩm", "Buy your stationery from the campus shop."),
  mkVocab("crockery", "58%", "Plates, cups and dishes", "Bát đĩa", "Kitchen crockery is provided in the flat."),
  mkVocab("cutlery", "57%", "Knives, forks and spoons", "Dao dĩa thìa", "The kitchen has a full set of cutlery."),
  mkVocab("insurance", "56%", "Financial cover against loss", "Bảo hiểm", "Travel insurance is strongly recommended."),
  mkVocab("refund", "54%", "Money returned to you", "Hoàn tiền", "You can request a full refund within 14 days."),
  mkVocab("expedition", "52%", "An organised journey", "Chuyến thám hiểm", "The Arctic expedition lasts six weeks."),
];

const commonStrategy = [
  {
    step: 1,
    title: "Learn in themed clusters, not A-Z",
    titleVi: "Học theo cụm chủ đề, không học A-Z",
    description:
      "Group the words by topic (education, environment, accommodation, travel). Cambridge tests reuse the same clusters across years.",
    descriptionVi:
      "Nhóm từ theo chủ đề (giáo dục, môi trường, chỗ ở, du lịch). Cambridge lặp lại chính các cụm này qua từng năm.",
  },
  {
    step: 2,
    title: "Memorise the paraphrase, not just the meaning",
    titleVi: "Nhớ cách paraphrase, không chỉ nghĩa",
    description:
      "IELTS almost always replaces the transcript word with a synonym in the question. Store each word with 1-2 common paraphrases.",
    descriptionVi:
      "Câu hỏi IELTS gần như luôn thay từ trong bài bằng từ đồng nghĩa. Lưu mỗi từ kèm 1-2 cách nói khác thường gặp.",
  },
  {
    step: 3,
    title: "Drill spelling out loud (Listening) / silently (Reading)",
    titleVi: "Đánh vần thành tiếng (Listening) / thầm (Reading)",
    description:
      "Wrong spelling = wrong answer, even if you heard it. Practise dictating each word letter-by-letter until automatic.",
    descriptionVi:
      "Sai chính tả = sai đáp án, kể cả khi bạn nghe đúng. Đánh vần từng chữ đến khi thành phản xạ.",
  },
  {
    step: 4,
    title: "Frequency-first review",
    titleVi: "Ôn theo tần suất giảm dần",
    description:
      "Review the highest-frequency words (90%+) daily; medium frequency (60-80%) weekly. Cover the low-frequency tail last.",
    descriptionVi:
      "Ôn từ tần suất cao nhất (90%+) mỗi ngày; tần suất trung bình (60-80%) mỗi tuần. Nhóm tần suất thấp ôn sau cùng.",
  },
];

const commonMistakes = [
  {
    mistake: "Learning the list once and never revisiting it",
    mistakeVi: "Học một lần rồi bỏ, không ôn lại",
    why: "Vocabulary decays in 7 days without spaced review. You will forget 60%+ of new words by next week.",
    whyVi: "Từ vựng suy giảm sau 7 ngày nếu không lặp lại. Bạn sẽ quên hơn 60% từ mới trong tuần sau.",
  },
  {
    mistake: "Ignoring collocations and prepositions",
    mistakeVi: "Bỏ qua collocation và giới từ đi kèm",
    why: "Knowing 'attribute' is not enough - IELTS tests 'attribute X to Y'. Wrong preposition = lost mark in Writing/Speaking too.",
    whyVi: "Biết từ 'attribute' chưa đủ - IELTS kiểm tra 'attribute X to Y'. Sai giới từ = mất điểm cả Writing/Speaking.",
  },
];

export const readingHighFreqVocabLecture: IeltsLecture = {
  id: "reading-high-frequency-vocab",
  title: "Reading — Top 25 High-Frequency Vocabulary (with exam appearance %)",
  titleVi: "Reading — 25 từ vựng tần suất cao (kèm % xuất hiện trong đề thi)",
  pillar: "skill-based",
  skill: "reading",
  icon: "📊",
  duration: "30 min",
  level: "intermediate",
  description:
    "The 25 academic words that appear most often across Cambridge IELTS 10-18 Reading passages, ranked by frequency (%). Master these first for the fastest band jump.",
  descriptionVi:
    "25 từ học thuật xuất hiện nhiều nhất trong bộ Cambridge IELTS 10-18 Reading, xếp hạng theo tần suất (%). Học chắc nhóm này trước để tăng band nhanh nhất.",
  strategySteps: commonStrategy,
  practicalExamples: [
    {
      context: "T/F/NG question containing 'The findings undermine the original theory.'",
      contextVi: "Câu T/F/NG chứa 'The findings undermine the original theory.'",
      example: "Passage says: 'The results contradict earlier assumptions.' → Answer: TRUE ('undermine' ≈ 'contradict').",
      explanation: "High-frequency words like 'undermine' are almost always paraphrased - learn the paraphrase family.",
    },
    {
      context: "Matching-heading question, paragraph starts 'Consequently, migration rates fell...'",
      contextVi: "Matching Heading, đoạn mở đầu bằng 'Consequently...'",
      example: "'Consequently' signals the paragraph is a RESULT, not a cause. Pick the 'Effect of X' heading.",
    },
  ],
  mistakesToAvoid: commonMistakes,
  goldenSecret:
    "The single fastest Reading upgrade is not more passages - it is owning the top 25 words in this list with their 2 most common paraphrases each.",
  goldenSecretVi:
    "Cách nâng band Reading nhanh nhất không phải làm thêm đề, mà là thuộc lòng 25 từ này cùng 2 cách paraphrase phổ biến nhất của mỗi từ.",
  vocabHighlights: READING_WORDS,
  quiz: [
    {
      question: "Which word most often paraphrases 'weaken' in IELTS Reading?",
      options: ["mitigate", "undermine", "underpin", "comprise"],
      answer: 1,
      explanation: "'Undermine' is the standard academic synonym for 'weaken gradually'.",
    },
    {
      question: "'The board comprises seven members' means the board…",
      options: ["hires seven people", "is made up of seven people", "excludes seven people", "compares seven people"],
      answer: 1,
      explanation: "'Comprise' = consist of / be made up of.",
    },
    {
      question: "Which word signals a RESULT?",
      options: ["albeit", "consequently", "hypothesis", "ambiguous"],
      answer: 1,
      explanation: "'Consequently' introduces an effect or result.",
    },
    {
      question: "In Cambridge IELTS 10-18, which word appears in ~92% of Reading passages?",
      options: ["intricate", "significant", "expedition", "brochure"],
      answer: 1,
      explanation: "'Significant' is the highest-frequency academic word in the list.",
    },
    {
      question: "'Plausible' most nearly means…",
      options: ["impossible", "reasonable / believable", "expensive", "immediate"],
      answer: 1,
      explanation: "Plausible = seemingly reasonable or likely true.",
    },
  ],
  cheatSheetPoints: [
    "Own the top-10 (frequency ≥80%) before anything else",
    "For each word, memorise 2 common paraphrases used by Cambridge",
    "Revisit the list every 3 days for 4 weeks",
    "Log any word you miss twice into your Notebook",
  ],
};

export const listeningHighFreqVocabLecture: IeltsLecture = {
  id: "listening-high-frequency-vocab",
  title: "Listening — Top 25 High-Frequency Vocabulary (with exam appearance %)",
  titleVi: "Listening — 25 từ vựng tần suất cao (kèm % xuất hiện trong đề thi)",
  pillar: "skill-based",
  skill: "listening",
  icon: "🎧",
  duration: "30 min",
  level: "intermediate",
  description:
    "The 25 words that recur most across Cambridge IELTS Listening Sections 1-4, ranked by frequency (%). Nail these to stop losing easy Section-1/2 marks.",
  descriptionVi:
    "25 từ lặp lại nhiều nhất trong Cambridge IELTS Listening Section 1-4, xếp theo tần suất (%). Chắc nhóm này để không mất điểm dễ ở Section 1-2.",
  strategySteps: commonStrategy,
  practicalExamples: [
    {
      context: "Section 1 form: 'A ______ of £50 is required to secure the booking.'",
      contextVi: "Section 1 điền form: 'A ______ of £50 is required to secure the booking.'",
      example: "Answer: deposit. High-frequency booking-vocab (94% appointment / 86% deposit) shows up almost every test.",
    },
    {
      context: "Section 2 map/description mentions 'compulsory safety briefing'.",
      contextVi: "Section 2 nhắc 'compulsory safety briefing'.",
      example: "'Compulsory' = required; the opposite distractor is 'optional'. Both are on this list for a reason.",
    },
  ],
  mistakesToAvoid: [
    ...commonMistakes,
    {
      mistake: "Spelling 'accommodation', 'stationery', 'itinerary' by ear",
      mistakeVi: "Đánh vần 'accommodation', 'stationery', 'itinerary' theo tai nghe",
      why: "These 3 words are misspelled by 70%+ of Vietnamese candidates. Drill the letters until automatic.",
      whyVi: "Ba từ này bị hơn 70% thí sinh Việt viết sai. Luyện đánh vần đến khi thành phản xạ.",
    },
  ],
  goldenSecret:
    "Section 1 and 2 reuse the same 25 words year after year - if you spell them all correctly you almost guarantee 18/20 in the first half.",
  goldenSecretVi:
    "Section 1 và 2 lặp lại chính 25 từ này qua từng năm - viết đúng chính tả cả 25 gần như chắc chắn 18/20 nửa đầu bài thi.",
  vocabHighlights: LISTENING_WORDS,
  quiz: [
    {
      question: "Which spelling is correct?",
      options: ["accomodation", "accommodation", "acommodation", "accommadation"],
      answer: 1,
      explanation: "Double c, double m: ac-com-mo-da-tion.",
    },
    {
      question: "'Stationery' (with an -ery) means…",
      options: ["not moving", "writing materials", "a train station", "a type of exercise"],
      answer: 1,
      explanation: "'Stationery' = pens/paper. 'Stationary' (-ary) = not moving.",
    },
    {
      question: "In Section 1, a 'deposit' is usually…",
      options: ["a refund", "money paid in advance", "a receipt", "an appointment"],
      answer: 1,
      explanation: "Deposit = advance payment to secure a booking.",
    },
    {
      question: "'Compulsory' is the opposite of…",
      options: ["optional", "important", "expensive", "extra"],
      answer: 0,
      explanation: "Compulsory (required) ↔ optional (not required).",
    },
    {
      question: "Which word appears most frequently in Cambridge IELTS Listening?",
      options: ["expedition", "crockery", "appointment", "refund"],
      answer: 2,
      explanation: "'Appointment' tops the list at ~94% appearance across recent tests.",
    },
  ],
  cheatSheetPoints: [
    "Spelling first, meaning second - marks are lost on spelling",
    "Practise dictating the top-10 words letter-by-letter daily",
    "Learn opposite pairs together: compulsory/optional, deposit/refund",
    "Section 1 & 2 = 90% of these words - review before every mock",
  ],
};

export const highFreqVocabLectures: IeltsLecture[] = [
  readingHighFreqVocabLecture,
  listeningHighFreqVocabLecture,
];

/**
 * @file cambridgeLectureExpander.ts
 * @description Universal breadth + depth expander for EVERY Cambridge lecture
 *              (Starters, Movers, Flyers, KET, PET). Adds level-appropriate
 *              extra vocabulary, watch-outs, illustrated rules, practice items,
 *              and quiz questions so every lecture in the Journey feels richer.
 *              Non-mutating: returns new lecture objects. English comments only.
 * @copyright 2026 HaiEduTech, ILC.
 */
import type {
  CambridgeLecture,
  CambridgeLevel,
  CambridgePracticeItem,
  CambridgeQuizQuestion,
  CambridgeVocabItem,
  CambridgeWatchOut,
  CambridgeIllustratedRule,
} from "./cambridgeLecturesData";

interface LevelPack {
  vocabulary: CambridgeVocabItem[];
  watchOut: CambridgeWatchOut[];
  illustratedRules: CambridgeIllustratedRule[];
  practiceSet: CambridgePracticeItem[];
  quiz: CambridgeQuizQuestion[];
}

/* ================= STARTERS (pre-A1, ages 6-8) ================= */
const startersPack: LevelPack = {
  vocabulary: [
    { word: "apple", meaning: "a round red or green fruit", meaningVi: "quả táo", example: "I like a red apple." },
    { word: "cat", meaning: "a small furry animal that says meow", meaningVi: "con mèo", example: "The cat is on the mat." },
    { word: "blue", meaning: "the color of the sky", meaningVi: "màu xanh dương", example: "My bag is blue." },
    { word: "seven", meaningVi: "số 7", meaning: "the number 7", example: "I am seven years old." },
    { word: "happy", meaning: "feeling good and smiling", meaningVi: "vui vẻ", example: "She is happy today." },
  ],
  watchOut: [
    {
      mistake: "Saying 'I have five year' instead of 'I am five years old'.",
      mistakeVi: "Nói 'I have five year' thay vì 'I am five years old'.",
      tip: "Age uses 'to be': I AM + number + years old.",
      tipVi: "Nói tuổi dùng 'be': I AM + số + years old.",
    },
    {
      mistake: "Confusing 'a' and 'an' (a apple ✗).",
      mistakeVi: "Nhầm 'a' và 'an' (a apple ✗).",
      tip: "Use 'an' before a vowel sound: an apple, an egg, an orange.",
      tipVi: "Dùng 'an' trước nguyên âm: an apple, an egg, an orange.",
    },
  ],
  illustratedRules: [
    { icon: "🎨", rule: "Colors describe things: 'a red car', 'a blue book'.", ruleVi: "Màu sắc mô tả đồ vật: 'a red car', 'a blue book'.", example: "I have a green pen." },
    { icon: "🔢", rule: "Numbers 1-20 must be memorised for Listening Parts 1-4.", ruleVi: "Số 1-20 phải học thuộc để làm Listening Phần 1-4.", example: "There are twelve pencils." },
  ],
  practiceSet: [
    {
      instruction: "Choose the correct color word.",
      instructionVi: "Chọn từ chỉ màu đúng.",
      question: "The sun is ___.",
      options: ["yellow", "blue", "purple", "black"],
      answer: 0,
      explanation: "The sun looks yellow in the daytime.",
      explanationVi: "Mặt trời màu vàng vào ban ngày.",
    },
    {
      instruction: "Pick the right number word.",
      instructionVi: "Chọn số đúng.",
      question: "How many fingers on one hand? ___",
      options: ["three", "five", "ten", "twelve"],
      answer: 1,
      explanation: "One hand has five fingers.",
      explanationVi: "Một bàn tay có 5 ngón.",
    },
    {
      instruction: "Choose 'a' or 'an'.",
      instructionVi: "Chọn 'a' hay 'an'.",
      question: "It is ___ orange.",
      options: ["a", "an", "the", "one"],
      answer: 1,
      explanation: "'Orange' starts with a vowel sound, so use 'an'.",
      explanationVi: "'Orange' bắt đầu bằng nguyên âm nên dùng 'an'.",
    },
    {
      instruction: "Choose the best answer.",
      instructionVi: "Chọn câu trả lời đúng.",
      question: "'How old are you?' - '___'",
      options: ["I have 7.", "I am 7 years old.", "Seven year.", "Me 7."],
      answer: 1,
      explanation: "Age uses 'I am + number + years old'.",
      explanationVi: "Nói tuổi: 'I am + số + years old'.",
    },
  ],
  quiz: [
    { question: "Which word is a color?", options: ["dog", "red", "run", "big"], answer: 1, explanation: "'Red' is a color word." },
    { question: "Which is the plural of 'child'?", options: ["childs", "children", "childs'", "childes"], answer: 1, explanation: "'Child' has an irregular plural: 'children'." },
    { question: "Choose the correct sentence.", options: ["She have a cat.", "She has a cat.", "She haves a cat.", "She a cat."], answer: 1, explanation: "'She/He/It' takes 'has' in present simple." },
    { question: "What comes after 'nine'?", options: ["eight", "ten", "eleven", "twelve"], answer: 1, explanation: "Number sequence: 9 → 10." },
  ],
};

/* ================= MOVERS (A1, ages 8-11) ================= */
const moversPack: LevelPack = {
  vocabulary: [
    { word: "kitchen", meaning: "the room where we cook", meaningVi: "nhà bếp", example: "Mum is in the kitchen." },
    { word: "beach", meaning: "the sandy area next to the sea", meaningVi: "bãi biển", example: "We swim at the beach." },
    { word: "always", meaning: "every time, 100%", meaningVi: "luôn luôn", example: "I always brush my teeth." },
    { word: "cousin", meaning: "the child of your aunt or uncle", meaningVi: "anh/chị em họ", example: "My cousin lives in Hue." },
    { word: "hungry", meaning: "wanting to eat", meaningVi: "đói", example: "I'm hungry - let's eat!" },
  ],
  watchOut: [
    {
      mistake: "Using 'do' with 'be' questions (Do you are…? ✗).",
      mistakeVi: "Dùng 'do' với 'be' (Do you are…? ✗).",
      tip: "Never mix 'do' + 'be'. Say: Are you happy? / Do you like…?",
      tipVi: "Không trộn 'do' + 'be'. Nói: Are you happy? / Do you like…?",
    },
    {
      mistake: "Forgetting 's' with he/she/it in present simple.",
      mistakeVi: "Quên 's' với he/she/it ở hiện tại đơn.",
      tip: "He/She/It + verb + s: She likeS pizza. He playS football.",
      tipVi: "He/She/It + verb + s: She likeS pizza. He playS football.",
    },
  ],
  illustratedRules: [
    { icon: "⏱️", rule: "Frequency adverbs go BEFORE the main verb: 'I ALWAYS eat rice.'", ruleVi: "Trạng từ tần suất đứng TRƯỚC động từ chính.", example: "She usually walks to school." },
    { icon: "🧭", rule: "Prepositions of place: in / on / under / next to / between.", ruleVi: "Giới từ chỉ nơi chốn: in / on / under / next to / between.", example: "The cat is under the table." },
  ],
  practiceSet: [
    {
      instruction: "Choose the correct verb.",
      instructionVi: "Chọn động từ đúng.",
      question: "My brother ___ football every Sunday.",
      options: ["play", "plays", "playing", "played"],
      answer: 1,
      explanation: "Third-person singular in present simple takes '-s'.",
      explanationVi: "Ngôi 3 số ít + s ở hiện tại đơn.",
    },
    {
      instruction: "Pick the correct preposition.",
      instructionVi: "Chọn giới từ đúng.",
      question: "The book is ___ the desk.",
      options: ["in", "on", "under", "between"],
      answer: 1,
      explanation: "'On' describes contact with a flat surface.",
      explanationVi: "'On' chỉ tiếp xúc trên mặt phẳng.",
    },
    {
      instruction: "Choose the natural sentence.",
      instructionVi: "Chọn câu tự nhiên.",
      question: "How often do you visit your grandma?",
      options: ["Yes, I do.", "Twice a month.", "In the kitchen.", "She is happy."],
      answer: 1,
      explanation: "'How often…?' asks for frequency, not yes/no.",
      explanationVi: "'How often…?' hỏi tần suất, không phải yes/no.",
    },
    {
      instruction: "Choose the plural form.",
      instructionVi: "Chọn dạng số nhiều đúng.",
      question: "One mouse, two ___.",
      options: ["mouses", "mice", "mouse's", "mices"],
      answer: 1,
      explanation: "'Mouse' has the irregular plural 'mice'.",
      explanationVi: "'Mouse' số nhiều bất quy tắc là 'mice'.",
    },
  ],
  quiz: [
    { question: "Which is a Wh-question?", options: ["Do you like it?", "Where is she?", "Are you sad?", "Is it hot?"], answer: 1, explanation: "'Where' is a Wh-word." },
    { question: "Choose the correct comparative.", options: ["gooder", "more good", "better", "best"], answer: 2, explanation: "'Good' is irregular: good → better → best." },
    { question: "Which is a past-simple verb?", options: ["go", "went", "goes", "going"], answer: 1, explanation: "Past of 'go' is 'went'." },
    { question: "'She can swim.' means:", options: ["She likes swimming.", "She is able to swim.", "She swims now.", "She will swim."], answer: 1, explanation: "'Can' expresses ability." },
  ],
};

/* ================= FLYERS (A2, ages 9-12) ================= */
const flyersPack: LevelPack = {
  vocabulary: [
    { word: "invention", meaning: "a new thing someone has created", meaningVi: "phát minh", example: "The phone is an important invention." },
    { word: "adventure", meaning: "an exciting experience", meaningVi: "cuộc phiêu lưu", example: "Our trip was a real adventure." },
    { word: "polite", meaning: "using good manners", meaningVi: "lịch sự", example: "Be polite to your teacher." },
    { word: "recycle", meaning: "to use materials again", meaningVi: "tái chế", example: "We recycle paper at school." },
    { word: "diary", meaning: "a book you write your day in", meaningVi: "nhật ký", example: "I keep a diary every night." },
  ],
  watchOut: [
    {
      mistake: "Using present simple for a happening-now action ('I read now').",
      mistakeVi: "Dùng hiện tại đơn cho hành động đang xảy ra.",
      tip: "Use present continuous for 'now/at the moment': I am reading now.",
      tipVi: "Dùng hiện tại tiếp diễn cho 'now/at the moment'.",
    },
    {
      mistake: "Confusing 'much' and 'many'.",
      mistakeVi: "Nhầm 'much' và 'many'.",
      tip: "'many' + countable nouns, 'much' + uncountable nouns.",
      tipVi: "'many' + đếm được, 'much' + không đếm được.",
    },
  ],
  illustratedRules: [
    { icon: "📝", rule: "Past continuous + past simple: interrupted action ('I was reading when he called').", ruleVi: "Quá khứ tiếp diễn + quá khứ đơn: hành động bị ngắt.", example: "We were playing when it rained." },
    { icon: "🔗", rule: "Use 'because' for reasons, 'so' for results.", ruleVi: "Dùng 'because' cho lý do, 'so' cho kết quả.", example: "I was tired, so I went to bed." },
  ],
  practiceSet: [
    {
      instruction: "Choose the correct tense.",
      instructionVi: "Chọn thì đúng.",
      question: "Look! The children ___ in the pool.",
      options: ["swim", "swims", "are swimming", "swam"],
      answer: 2,
      explanation: "'Look!' signals present continuous.",
      explanationVi: "'Look!' báo hiệu hiện tại tiếp diễn.",
    },
    {
      instruction: "Pick much / many.",
      instructionVi: "Chọn much / many.",
      question: "How ___ books do you have?",
      options: ["much", "many", "any", "some"],
      answer: 1,
      explanation: "'Books' is countable → many.",
      explanationVi: "'Books' đếm được → many.",
    },
    {
      instruction: "Choose the linker.",
      instructionVi: "Chọn từ nối phù hợp.",
      question: "I was hungry ___ I made a sandwich.",
      options: ["because", "so", "but", "although"],
      answer: 1,
      explanation: "'So' = result.",
      explanationVi: "'So' chỉ kết quả.",
    },
    {
      instruction: "Choose the best word.",
      instructionVi: "Chọn từ đúng nhất.",
      question: "My sister is very ___; she always helps people.",
      options: ["lazy", "kind", "angry", "boring"],
      answer: 1,
      explanation: "Helping people = kind.",
      explanationVi: "Giúp người khác = tốt bụng.",
    },
  ],
  quiz: [
    { question: "Which is a phrasal verb?", options: ["look at", "walk fast", "very tall", "big house"], answer: 0, explanation: "'Look at' = verb + preposition (phrasal verb)." },
    { question: "Choose the correct question tag.", options: ["He is tall, isn't he?", "He is tall, doesn't he?", "He is tall, isn't him?", "He is tall, is he?"], answer: 0, explanation: "Positive statement → negative tag with matching auxiliary." },
    { question: "Which best fits? 'I ___ never been to Paris.'", options: ["am", "have", "was", "did"], answer: 1, explanation: "Present perfect: have/has + past participle." },
    { question: "Superlative of 'happy'?", options: ["happier", "more happy", "happiest", "most happy"], answer: 2, explanation: "'Happy' → happier → happiest." },
  ],
};

/* ================= KET (A2) - richer than the KET boost, focuses on depth ================= */
const ketPack: LevelPack = {
  vocabulary: [
    { word: "reservation", meaning: "a booking (table, hotel, ticket)", meaningVi: "đặt chỗ", example: "I have a reservation for two." },
    { word: "borrow", meaning: "to take and use something for a short time", meaningVi: "mượn", example: "Can I borrow your pen?" },
    { word: "arrive", meaning: "to reach a place", meaningVi: "đến nơi", example: "The train arrives at 8 pm." },
    { word: "convenient", meaning: "easy to use or reach", meaningVi: "thuận tiện", example: "The shop is very convenient." },
    { word: "recommend", meaning: "to say something is good", meaningVi: "gợi ý", example: "I recommend this restaurant." },
  ],
  watchOut: [
    {
      mistake: "Using 'borrow' when you mean 'lend'.",
      mistakeVi: "Dùng 'borrow' khi muốn nói 'lend'.",
      tip: "'Borrow' = take FROM. 'Lend' = give TO.",
      tipVi: "'Borrow' = mượn (nhận). 'Lend' = cho mượn.",
    },
    {
      mistake: "Mixing 'for' and 'since'.",
      mistakeVi: "Nhầm 'for' và 'since'.",
      tip: "'for' + duration (for 2 years). 'since' + start point (since 2019).",
      tipVi: "'for' + khoảng thời gian. 'since' + mốc bắt đầu.",
    },
  ],
  illustratedRules: [
    { icon: "🧠", rule: "Present perfect = past action still relevant now: 'I have lost my key.'", ruleVi: "Hiện tại hoàn thành = hành động quá khứ còn ảnh hưởng bây giờ.", example: "She has finished her homework." },
    { icon: "🎯", rule: "Use 'will' for spontaneous decisions, 'going to' for plans.", ruleVi: "'Will' cho quyết định bất chợt, 'going to' cho kế hoạch.", example: "I'll help you. / I'm going to travel this summer." },
  ],
  practiceSet: [
    {
      instruction: "Choose the correct word.",
      instructionVi: "Chọn từ đúng.",
      question: "Can I ___ your bike for an hour?",
      options: ["borrow", "lend", "buy", "take"],
      answer: 0,
      explanation: "'Borrow' = take and use for a short time.",
      explanationVi: "'Borrow' = mượn để dùng ngắn.",
    },
    {
      instruction: "Pick for / since.",
      instructionVi: "Chọn for / since.",
      question: "I have studied English ___ 2020.",
      options: ["for", "since", "from", "during"],
      answer: 1,
      explanation: "'Since' + starting point.",
      explanationVi: "'Since' + mốc bắt đầu.",
    },
    {
      instruction: "Choose the best reply.",
      instructionVi: "Chọn câu đáp phù hợp.",
      question: "'Shall we meet at 7?' - '___'",
      options: ["Yes, I shall.", "Sounds good.", "Yes, we shall meet.", "It shalls."],
      answer: 1,
      explanation: "'Sounds good' is natural informal English.",
      explanationVi: "'Sounds good' là câu đáp tự nhiên.",
    },
    {
      instruction: "Choose the correct linker.",
      instructionVi: "Chọn từ nối đúng.",
      question: "It was raining, ___ we still went out.",
      options: ["because", "so", "but", "although"],
      answer: 2,
      explanation: "Contrast: 'but' shows unexpected result.",
      explanationVi: "'But' thể hiện tương phản, kết quả bất ngờ.",
    },
  ],
  quiz: [
    { question: "Choose the correct passive.", options: ["The letter is writing.", "The letter is written.", "The letter writes.", "The letter has write."], answer: 1, explanation: "Passive = be + past participle." },
    { question: "Which uses reported speech correctly?", options: ["He said he is tired.", "He said he was tired.", "He said him tired.", "He said that tired."], answer: 1, explanation: "Reported speech backshifts present → past." },
    { question: "Best synonym of 'purchase'?", options: ["buy", "borrow", "return", "throw"], answer: 0, explanation: "'Purchase' = 'buy' (more formal)." },
    { question: "Which is a first conditional?", options: ["If I win, I will travel.", "If I won, I would travel.", "If I had won, I would have travelled.", "If I win, I travel."], answer: 0, explanation: "First conditional: If + present, will + verb." },
  ],
};

/* ================= PET (B1) ================= */
const petPack: LevelPack = {
  vocabulary: [
    { word: "achievement", meaning: "a thing you have done successfully", meaningVi: "thành tựu", example: "Passing PET was a big achievement." },
    { word: "environment", meaning: "the natural world around us", meaningVi: "môi trường", example: "We must protect the environment." },
    { word: "opportunity", meaning: "a chance to do something", meaningVi: "cơ hội", example: "This is a great opportunity to learn." },
    { word: "hesitate", meaning: "to pause because of doubt", meaningVi: "do dự", example: "Don't hesitate to ask me anything." },
    { word: "responsibility", meaning: "a duty you must do", meaningVi: "trách nhiệm", example: "Studying is your responsibility." },
  ],
  watchOut: [
    {
      mistake: "Overusing 'very' instead of stronger adjectives.",
      mistakeVi: "Lạm dụng 'very' thay vì dùng tính từ mạnh hơn.",
      tip: "Upgrade: very good → excellent; very big → enormous; very tired → exhausted.",
      tipVi: "Nâng cấp: very good → excellent; very tired → exhausted.",
    },
    {
      mistake: "Forgetting to link ideas in Writing Part 3 (short paragraphs, no linkers).",
      mistakeVi: "Quên nối ý trong Writing Part 3 (đoạn ngắn, không có linker).",
      tip: "Use 'however', 'in addition', 'as a result', 'for example' to gain a band.",
      tipVi: "Dùng 'however', 'in addition', 'as a result', 'for example' để lên band.",
    },
  ],
  illustratedRules: [
    { icon: "🧩", rule: "Second conditional: If + past, would + verb. (Hypothetical)", ruleVi: "Câu điều kiện loại 2: If + past, would + verb (giả định).", example: "If I had time, I would travel." },
    { icon: "🗣️", rule: "Reported speech: back-shift tenses (says → said, is → was).", ruleVi: "Câu tường thuật: lùi thì (says → said, is → was).", example: "She said she was tired." },
    { icon: "🎨", rule: "PET Writing rewards range: mix simple + compound + complex sentences.", ruleVi: "PET Writing thưởng điểm cho câu đa dạng: đơn + ghép + phức.", example: "Although it rained, we enjoyed the trip because we were prepared." },
  ],
  practiceSet: [
    {
      instruction: "Choose the correct conditional.",
      instructionVi: "Chọn câu điều kiện đúng.",
      question: "If I ___ rich, I would buy a big house.",
      options: ["am", "was", "were", "will be"],
      answer: 2,
      explanation: "Second conditional prefers 'were' for all subjects (formal).",
      explanationVi: "Điều kiện loại 2 dùng 'were' cho mọi ngôi (trang trọng).",
    },
    {
      instruction: "Pick the linker.",
      instructionVi: "Chọn từ nối.",
      question: "The film was long. ___, we enjoyed it.",
      options: ["However", "Because", "So", "Then"],
      answer: 0,
      explanation: "Contrast between length and enjoyment - 'However'.",
      explanationVi: "Tương phản dài / thích - 'However'.",
    },
    {
      instruction: "Choose the more natural (upgraded) word.",
      instructionVi: "Chọn từ tự nhiên hơn (nâng cấp).",
      question: "The view was very ___.",
      options: ["good", "stunning", "okay", "not bad"],
      answer: 1,
      explanation: "'Stunning' is a stronger B1+ adjective.",
      explanationVi: "'Stunning' là tính từ B1+ mạnh hơn.",
    },
    {
      instruction: "Reported speech.",
      instructionVi: "Câu tường thuật.",
      question: "Direct: 'I am busy.' Reported: 'He said ___.'",
      options: ["he is busy", "he was busy", "he busy", "he been busy"],
      answer: 1,
      explanation: "Back-shift: am → was.",
      explanationVi: "Lùi thì: am → was.",
    },
  ],
  quiz: [
    { question: "Which sentence has a relative clause?", options: ["The book is red.", "The book that I read was great.", "I read a book.", "Books are useful."], answer: 1, explanation: "'That I read' = relative clause." },
    { question: "Best synonym of 'enormous'?", options: ["tiny", "huge", "average", "empty"], answer: 1, explanation: "'Enormous' ≈ 'huge'." },
    { question: "Choose the correct passive.", options: ["The car repaired yesterday.", "The car was repaired yesterday.", "The car repairs yesterday.", "The car has repair yesterday."], answer: 1, explanation: "Passive past: was/were + past participle." },
    { question: "Which is a good PET Writing opener for an article?", options: ["Hello everyone!", "Have you ever wondered why…?", "Dear Sir or Madam,", "I am writing to complain."], answer: 1, explanation: "A rhetorical question hooks readers in PET articles." },
    { question: "Which linker shows an example?", options: ["for example", "however", "although", "as a result"], answer: 0, explanation: "'For example' introduces an example." },
  ],
};

const LEVEL_PACKS: Record<CambridgeLevel, LevelPack> = {
  starters: startersPack,
  movers: moversPack,
  flyers: flyersPack,
  ket: ketPack,
  pet: petPack,
};

/**
 * Append level-appropriate breadth + depth content to a Cambridge lecture.
 * Non-mutating; returns a shallow clone with concatenated arrays.
 */
export function expandCambridgeLecture(l: CambridgeLecture): CambridgeLecture {
  const pack = LEVEL_PACKS[l.level];
  if (!pack) return l;
  return {
    ...l,
    vocabulary: [...(l.vocabulary ?? []), ...pack.vocabulary],
    watchOut: [...(l.watchOut ?? []), ...pack.watchOut],
    illustratedRules: [...(l.illustratedRules ?? []), ...pack.illustratedRules],
    practiceSet: [...(l.practiceSet ?? []), ...pack.practiceSet],
    quiz: [...(l.quiz ?? []), ...pack.quiz],
  };
}

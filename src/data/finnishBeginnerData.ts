/**
 * @file finnishBeginnerData.ts
 * @description Beginner Finnish (A1-A2) data: alphabet, KPT, verb types, partitive,
 *   daily phrases and Vietnamese-learner pitfalls.
 * @author Teacher Hai (HaiEduTech)
 */

export interface AlphabetSound {
  letter: string;
  ipa: string;
  example: string;
  exampleEn: string;
  exampleVi: string;
  group: "vowel-front" | "vowel-back" | "consonant" | "double-consonant";
  tip: string;
  tipVi: string;
}

export interface VerbType {
  type: 1 | 2 | 3 | 4 | 5 | 6;
  ending: string;
  rule: string;
  ruleVi: string;
  examples: { infinitive: string; minä: string; sinä: string; hän: string; meaning: string; meaningVi: string }[];
}

export interface KptPair {
  strong: string;
  weak: string;
  example: string;
  meaning: string;
  meaningVi: string;
}

export interface PartitiveCase {
  ending: string;
  trigger: string;
  triggerVi: string;
  examples: { fi: string; en: string; vi: string }[];
}

export interface DailyPhrase {
  fi: string;
  en: string;
  vi: string;
  category: "greeting" | "shopping" | "intro" | "asking" | "polite";
  illustration: string; // emoji
}

export interface BeginnerVocab {
  fi: string;
  en: string;
  vi: string;
  illustration: string; // emoji
  category: string;
}

export interface VietnamesePitfall {
  mistake: string;
  why: string;
  correct: string;
  tip: string;
}

export interface BeginnerQuiz {
  question: string;
  questionVi: string;
  options: string[];
  answer: number;
  explanation: string;
  explanationVi: string;
}

/* ============================================================
 * ALPHABET & SOUNDS
 * ============================================================ */
export const ALPHABET_SOUNDS: AlphabetSound[] = [
  // Back vowels
  { letter: "A", ipa: "/ɑ/", example: "auto", exampleEn: "car", exampleVi: "xe hơi", group: "vowel-back", tip: "Open back, like 'a' in 'father'", tipVi: "Mở rộng, giống 'a' trong 'ba'" },
  { letter: "O", ipa: "/o/", example: "ovi", exampleEn: "door", exampleVi: "cánh cửa", group: "vowel-back", tip: "Pure 'o', no glide", tipVi: "Âm 'o' thuần, không trượt" },
  { letter: "U", ipa: "/u/", example: "uusi", exampleEn: "new", exampleVi: "mới", group: "vowel-back", tip: "Round lips, like 'oo' in 'food'", tipVi: "Tròn môi, giống 'u' dài" },
  // Front vowels (the umlaut trio)
  { letter: "Ä", ipa: "/æ/", example: "äiti", exampleEn: "mother", exampleVi: "mẹ", group: "vowel-front", tip: "Like 'a' in 'cat' - flat & front", tipVi: "Giống 'e' trong 'em' nhưng mở hơn" },
  { letter: "Ö", ipa: "/ø/", example: "öljy", exampleEn: "oil", exampleVi: "dầu", group: "vowel-front", tip: "Round lips while saying 'e'", tipVi: "Tròn môi khi phát âm 'ê'" },
  { letter: "Y", ipa: "/y/", example: "yö", exampleEn: "night", exampleVi: "đêm", group: "vowel-front", tip: "Round lips while saying 'i' - like German ü", tipVi: "Tròn môi khi phát âm 'i' - như 'ü' trong tiếng Đức" },
  // Other vowels
  { letter: "E", ipa: "/e/", example: "elämä", exampleEn: "life", exampleVi: "cuộc sống", group: "vowel-front", tip: "Like 'e' in 'bed'", tipVi: "Giống 'ê' tiếng Việt" },
  { letter: "I", ipa: "/i/", example: "isä", exampleEn: "father", exampleVi: "bố", group: "vowel-front", tip: "Sharp 'ee'", tipVi: "Âm 'i' rõ và ngắn" },
  // Double consonants
  { letter: "KK", ipa: "/kː/", example: "kukka", exampleEn: "flower", exampleVi: "bông hoa", group: "double-consonant", tip: "Hold the K - clear silence between syllables", tipVi: "Giữ âm K - có khoảng nghỉ rõ giữa hai âm tiết" },
  { letter: "PP", ipa: "/pː/", example: "kauppa", exampleEn: "shop", exampleVi: "cửa hàng", group: "double-consonant", tip: "Two-beat P", tipVi: "Âm P kéo dài 2 nhịp" },
  { letter: "TT", ipa: "/tː/", example: "kissa", exampleEn: "cat (with SS)", exampleVi: "con mèo (với SS)", group: "double-consonant", tip: "Same logic for SS, LL, MM, NN, RR", tipVi: "Tương tự với SS, LL, MM, NN, RR" },
  { letter: "NG", ipa: "/ŋː/", example: "kengät", exampleEn: "shoes", exampleVi: "đôi giày", group: "double-consonant", tip: "Like 'ng' in 'singing', held longer", tipVi: "Giống 'ng' trong 'song', kéo dài hơn" },
  // Long vowels (length contrast - critical for meaning)
  { letter: "AA", ipa: "/ɑː/", example: "maa", exampleEn: "land", exampleVi: "đất nước", group: "vowel-back", tip: "Hold 'a' for 2 beats - meaning changes!", tipVi: "Giữ 'a' 2 nhịp - nghĩa thay đổi hoàn toàn!" },
  { letter: "OO", ipa: "/oː/", example: "koodi", exampleEn: "code", exampleVi: "mã", group: "vowel-back", tip: "Long 'o' - different word from 'kodi'", tipVi: "Âm 'o' dài - khác hẳn 'kodi'" },
  { letter: "UU", ipa: "/uː/", example: "kuu", exampleEn: "moon", exampleVi: "mặt trăng", group: "vowel-back", tip: "Long 'u' - vs 'ku' (no meaning)", tipVi: "Âm 'u' dài - vs 'ku' (vô nghĩa)" },
  { letter: "II", ipa: "/iː/", example: "kiitos", exampleEn: "thank you", exampleVi: "cảm ơn", group: "vowel-front", tip: "Hold 'i' clearly", tipVi: "Giữ 'i' rõ ràng" },
  // Tricky consonants
  { letter: "H", ipa: "/h/", example: "hyvä", exampleEn: "good", exampleVi: "tốt", group: "consonant", tip: "Soft, breathy 'h'", tipVi: "Âm 'h' nhẹ, hơi thở" },
  { letter: "J", ipa: "/j/", example: "joki", exampleEn: "river", exampleVi: "con sông", group: "consonant", tip: "Like 'y' in 'yes' - never like English J", tipVi: "Như 'y' trong 'yes' - không bao giờ như 'j' tiếng Anh" },
  { letter: "R", ipa: "/r/", example: "rakas", exampleEn: "dear", exampleVi: "thân yêu", group: "consonant", tip: "Trilled R - flick the tongue", tipVi: "Âm R rung - búng đầu lưỡi" },
  { letter: "S", ipa: "/s/", example: "sininen", exampleEn: "blue", exampleVi: "màu xanh", group: "consonant", tip: "Sharp 's' - never voiced like 'z'", tipVi: "Âm 's' sắc - không bao giờ thành 'z'" },
  { letter: "V", ipa: "/ʋ/", example: "vesi", exampleEn: "water", exampleVi: "nước", group: "consonant", tip: "Soft V, between English V and W", tipVi: "Âm V nhẹ, giữa V và W tiếng Anh" },
];

/* ============================================================
 * VERB TYPES (1-6)
 * ============================================================ */
export const VERB_TYPES: VerbType[] = [
  {
    type: 1, ending: "-aa / -ää / -oa / -ya …",
    rule: "Drop final vowel, add personal ending",
    ruleVi: "Bỏ nguyên âm cuối, thêm đuôi nhân xưng",
    examples: [
      { infinitive: "puhua", minä: "puhun", sinä: "puhut", hän: "puhuu", meaning: "to speak", meaningVi: "nói" },
      { infinitive: "asua", minä: "asun", sinä: "asut", hän: "asuu", meaning: "to live (reside)", meaningVi: "sống/ở" },
    ],
  },
  {
    type: 2, ending: "-da / -dä",
    rule: "Drop -da/-dä, add ending (no consonant change)",
    ruleVi: "Bỏ -da/-dä, thêm đuôi (không đổi phụ âm)",
    examples: [
      { infinitive: "syödä", minä: "syön", sinä: "syöt", hän: "syö", meaning: "to eat", meaningVi: "ăn" },
      { infinitive: "juoda", minä: "juon", sinä: "juot", hän: "juo", meaning: "to drink", meaningVi: "uống" },
    ],
  },
  {
    type: 3, ending: "-la / -na / -ra / -sta",
    rule: "Drop -la/-na/-ra etc., add 'e' + ending",
    ruleVi: "Bỏ -la/-na/-ra, thêm 'e' + đuôi",
    examples: [
      { infinitive: "tulla", minä: "tulen", sinä: "tulet", hän: "tulee", meaning: "to come", meaningVi: "đến" },
      { infinitive: "mennä", minä: "menen", sinä: "menet", hän: "menee", meaning: "to go", meaningVi: "đi" },
    ],
  },
  {
    type: 4, ending: "-ata / -ätä",
    rule: "Drop -ta/-tä, vowel doubles in 3rd person",
    ruleVi: "Bỏ -ta/-tä, nguyên âm gấp đôi ở ngôi thứ 3",
    examples: [
      { infinitive: "tavata", minä: "tapaan", sinä: "tapaat", hän: "tapaa", meaning: "to meet", meaningVi: "gặp" },
      { infinitive: "haluta", minä: "haluan", sinä: "haluat", hän: "haluaa", meaning: "to want", meaningVi: "muốn" },
    ],
  },
  {
    type: 5, ending: "-ita / -itä",
    rule: "Drop -ta/-tä, add -tse + ending",
    ruleVi: "Bỏ -ta/-tä, thêm -tse + đuôi",
    examples: [
      { infinitive: "tarvita", minä: "tarvitsen", sinä: "tarvitset", hän: "tarvitsee", meaning: "to need", meaningVi: "cần" },
      { infinitive: "valita", minä: "valitsen", sinä: "valitset", hän: "valitsee", meaning: "to choose", meaningVi: "chọn" },
    ],
  },
  {
    type: 6, ending: "-eta / -etä",
    rule: "Drop -ta/-tä, add -ne + ending",
    ruleVi: "Bỏ -ta/-tä, thêm -ne + đuôi",
    examples: [
      { infinitive: "vanheta", minä: "vanhenen", sinä: "vanhenet", hän: "vanhenee", meaning: "to grow old", meaningVi: "già đi" },
      { infinitive: "lämmetä", minä: "lämpenen", sinä: "lämpenet", hän: "lämpenee", meaning: "to warm up", meaningVi: "ấm lên" },
    ],
  },
];

/* ============================================================
 * KPT - Consonant Gradation
 * ============================================================ */
export const KPT_PAIRS: KptPair[] = [
  { strong: "kk", weak: "k", example: "kukka → kukan", meaning: "flower → of the flower", meaningVi: "bông hoa → của bông hoa" },
  { strong: "pp", weak: "p", example: "kauppa → kaupan", meaning: "shop → of the shop", meaningVi: "cửa hàng → của cửa hàng" },
  { strong: "tt", weak: "t", example: "tyttö → tytön", meaning: "girl → of the girl", meaningVi: "cô gái → của cô gái" },
  { strong: "k", weak: "-", example: "jalka → jalan", meaning: "leg → of the leg (k disappears)", meaningVi: "chân → của chân (k biến mất)" },
  { strong: "p", weak: "v", example: "leipä → leivän", meaning: "bread → of bread", meaningVi: "bánh mì → của bánh mì" },
  { strong: "t", weak: "d", example: "katu → kadun", meaning: "street → of the street", meaningVi: "đường phố → của đường phố" },
  { strong: "nt", weak: "nn", example: "ranta → rannan", meaning: "shore → of the shore", meaningVi: "bờ biển → của bờ biển" },
  { strong: "mp", weak: "mm", example: "kampa → kamman", meaning: "comb → of the comb", meaningVi: "lược → của cái lược" },
  { strong: "lt", weak: "ll", example: "ilta → illan", meaning: "evening → of the evening", meaningVi: "buổi tối → của buổi tối" },
  { strong: "rt", weak: "rr", example: "parta → parran", meaning: "beard → of the beard", meaningVi: "râu → của bộ râu" },
  { strong: "nk", weak: "ng", example: "Helsinki → Helsingissä", meaning: "Helsinki → in Helsinki", meaningVi: "Helsinki → ở Helsinki" },
  { strong: "lke", weak: "lje", example: "kulkea → kuljen", meaning: "to walk → I walk", meaningVi: "đi bộ → tôi đi bộ" },
  { strong: "rke", weak: "rje", example: "särkeä → särjen", meaning: "to break → I break", meaningVi: "làm vỡ → tôi làm vỡ" },
];

/* ============================================================
 * PARTITIVE BASICS
 * ============================================================ */
export const PARTITIVE_CASES: PartitiveCase[] = [
  {
    ending: "-a / -ä",
    trigger: "After a single consonant + vowel stem",
    triggerVi: "Sau gốc kết thúc bằng phụ âm đơn + nguyên âm",
    examples: [
      { fi: "Juon kahvia.", en: "I drink coffee.", vi: "Tôi uống cà phê." },
      { fi: "Syön leipää.", en: "I eat bread.", vi: "Tôi ăn bánh mì." },
    ],
  },
  {
    ending: "-ta / -tä",
    trigger: "After two vowels or special endings",
    triggerVi: "Sau hai nguyên âm hoặc đuôi đặc biệt",
    examples: [
      { fi: "Maa → maata", en: "land → some land", vi: "đất → một ít đất" },
      { fi: "Työ → työtä", en: "work → some work", vi: "công việc → một ít công việc" },
    ],
  },
  {
    ending: "-tta / -ttä",
    trigger: "After -e ending in nominative",
    triggerVi: "Sau danh từ kết thúc bằng -e ở dạng nguyên",
    examples: [
      { fi: "Perhe → perhettä", en: "family → some family", vi: "gia đình → một phần gia đình" },
      { fi: "Huone → huonetta", en: "room → some room", vi: "căn phòng → một phần căn phòng" },
    ],
  },
];

/* ============================================================
 * DAILY PHRASES
 * ============================================================ */
export const DAILY_PHRASES: DailyPhrase[] = [
  // Greetings
  { fi: "Hei!", en: "Hi!", vi: "Chào!", category: "greeting", illustration: "👋" },
  { fi: "Hyvää huomenta", en: "Good morning", vi: "Chào buổi sáng", category: "greeting", illustration: "🌅" },
  { fi: "Hyvää iltaa", en: "Good evening", vi: "Chào buổi tối", category: "greeting", illustration: "🌆" },
  { fi: "Mitä kuuluu?", en: "How are you?", vi: "Bạn khoẻ không?", category: "greeting", illustration: "😊" },
  { fi: "Kiitos hyvää", en: "Thanks, fine", vi: "Cảm ơn, tôi khoẻ", category: "greeting", illustration: "🙏" },
  // Intro
  { fi: "Minun nimeni on…", en: "My name is…", vi: "Tên tôi là…", category: "intro", illustration: "🪪" },
  { fi: "Olen suomalainen", en: "I am Finnish", vi: "Tôi là người Phần Lan", category: "intro", illustration: "🇫🇮" },
  { fi: "Olen vietnamilainen", en: "I am Vietnamese", vi: "Tôi là người Việt Nam", category: "intro", illustration: "🇻🇳" },
  { fi: "Asun Helsingissä", en: "I live in Helsinki", vi: "Tôi sống ở Helsinki", category: "intro", illustration: "🏙️" },
  { fi: "Opiskelen suomea", en: "I study Finnish", vi: "Tôi học tiếng Phần Lan", category: "intro", illustration: "📚" },
  // Shopping
  { fi: "Paljonko se maksaa?", en: "How much does it cost?", vi: "Cái này giá bao nhiêu?", category: "shopping", illustration: "💶" },
  { fi: "Saanko tämän?", en: "Can I have this?", vi: "Tôi lấy cái này được không?", category: "shopping", illustration: "🛒" },
  { fi: "Maksan kortilla", en: "I'll pay by card", vi: "Tôi trả bằng thẻ", category: "shopping", illustration: "💳" },
  { fi: "Onko teillä…?", en: "Do you have…?", vi: "Bạn có… không?", category: "shopping", illustration: "🛍️" },
  { fi: "Kiitos paljon!", en: "Thanks a lot!", vi: "Cảm ơn nhiều!", category: "shopping", illustration: "💐" },
  // Asking
  { fi: "Anteeksi, missä on…?", en: "Excuse me, where is…?", vi: "Xin lỗi, … ở đâu?", category: "asking", illustration: "🗺️" },
  { fi: "Puhutko englantia?", en: "Do you speak English?", vi: "Bạn nói tiếng Anh không?", category: "asking", illustration: "🗣️" },
  { fi: "En ymmärrä", en: "I don't understand", vi: "Tôi không hiểu", category: "asking", illustration: "🤔" },
  // Polite
  { fi: "Kiitos", en: "Thank you", vi: "Cảm ơn", category: "polite", illustration: "🙏" },
  { fi: "Ole hyvä", en: "You're welcome", vi: "Không có gì", category: "polite", illustration: "🤗" },
  { fi: "Anteeksi", en: "Sorry / Excuse me", vi: "Xin lỗi", category: "polite", illustration: "🙇" },
  { fi: "Nähdään!", en: "See you!", vi: "Hẹn gặp lại!", category: "polite", illustration: "👋" },
  // More greetings
  { fi: "Hyvää päivää", en: "Good day", vi: "Chào buổi trưa", category: "greeting", illustration: "☀️" },
  { fi: "Hyvää yötä", en: "Good night", vi: "Chúc ngủ ngon", category: "greeting", illustration: "🌙" },
  { fi: "Tervetuloa!", en: "Welcome!", vi: "Chào mừng!", category: "greeting", illustration: "🎉" },
  { fi: "Hauska tavata", en: "Nice to meet you", vi: "Rất vui được gặp bạn", category: "greeting", illustration: "🤝" },
  // More intro
  { fi: "Olen 25-vuotias", en: "I am 25 years old", vi: "Tôi 25 tuổi", category: "intro", illustration: "🎂" },
  { fi: "Mistä olet kotoisin?", en: "Where are you from?", vi: "Bạn đến từ đâu?", category: "intro", illustration: "🌍" },
  { fi: "Olen kotoisin Hanoista", en: "I am from Hanoi", vi: "Tôi đến từ Hà Nội", category: "intro", illustration: "🏯" },
  { fi: "Työskentelen opettajana", en: "I work as a teacher", vi: "Tôi làm giáo viên", category: "intro", illustration: "👩‍🏫" },
  // More shopping
  { fi: "Yksi kahvi, kiitos", en: "One coffee, please", vi: "Một ly cà phê, làm ơn", category: "shopping", illustration: "☕" },
  { fi: "Voinko maksaa käteisellä?", en: "Can I pay in cash?", vi: "Tôi trả tiền mặt được không?", category: "shopping", illustration: "💵" },
  { fi: "Haluaisin tämän", en: "I would like this one", vi: "Tôi muốn lấy cái này", category: "shopping", illustration: "👉" },
  { fi: "Onko alennusta?", en: "Is there a discount?", vi: "Có giảm giá không?", category: "shopping", illustration: "🏷️" },
  // More asking
  { fi: "Kuinka mennä keskustaan?", en: "How to get to the centre?", vi: "Đi tới trung tâm thế nào?", category: "asking", illustration: "🚶" },
  { fi: "Mihin aikaan juna lähtee?", en: "What time does the train leave?", vi: "Tàu hỏa khởi hành lúc mấy giờ?", category: "asking", illustration: "🚆" },
  { fi: "Mikä tämä on?", en: "What is this?", vi: "Đây là cái gì?", category: "asking", illustration: "❓" },
  { fi: "Voitko auttaa minua?", en: "Can you help me?", vi: "Bạn có thể giúp tôi không?", category: "asking", illustration: "🆘" },
  { fi: "Puhutko hitaammin?", en: "Can you speak slower?", vi: "Bạn nói chậm hơn được không?", category: "asking", illustration: "🐢" },
  // More polite
  { fi: "Ei kestä", en: "No problem", vi: "Không sao đâu", category: "polite", illustration: "😊" },
  { fi: "Toivottavasti pian!", en: "Hope to see you soon!", vi: "Mong gặp lại sớm!", category: "polite", illustration: "💫" },
  { fi: "Onnea!", en: "Good luck!", vi: "Chúc may mắn!", category: "polite", illustration: "🍀" },
];

/* ============================================================
 * VISUAL VOCAB (right-illustration layout)
 * ============================================================ */
export const BEGINNER_VOCAB: BeginnerVocab[] = [
  { fi: "talo", en: "house", vi: "ngôi nhà", illustration: "🏠", category: "Home" },
  { fi: "auto", en: "car", vi: "xe hơi", illustration: "🚗", category: "Transport" },
  { fi: "kahvi", en: "coffee", vi: "cà phê", illustration: "☕", category: "Food" },
  { fi: "leipä", en: "bread", vi: "bánh mì", illustration: "🍞", category: "Food" },
  { fi: "vesi", en: "water", vi: "nước", illustration: "💧", category: "Food" },
  { fi: "koira", en: "dog", vi: "con chó", illustration: "🐕", category: "Animals" },
  { fi: "kissa", en: "cat", vi: "con mèo", illustration: "🐈", category: "Animals" },
  { fi: "kirja", en: "book", vi: "quyển sách", illustration: "📖", category: "Study" },
  { fi: "koulu", en: "school", vi: "trường học", illustration: "🏫", category: "Study" },
  { fi: "ystävä", en: "friend", vi: "bạn", illustration: "🧑‍🤝‍🧑", category: "People" },
  { fi: "perhe", en: "family", vi: "gia đình", illustration: "👨‍👩‍👧", category: "People" },
  { fi: "lumi", en: "snow", vi: "tuyết", illustration: "❄️", category: "Nature" },
  { fi: "metsä", en: "forest", vi: "khu rừng", illustration: "🌲", category: "Nature" },
  { fi: "järvi", en: "lake", vi: "hồ", illustration: "🏞️", category: "Nature" },
  { fi: "aurinko", en: "sun", vi: "mặt trời", illustration: "☀️", category: "Nature" },
  // Home & rooms
  { fi: "keittiö", en: "kitchen", vi: "nhà bếp", illustration: "🍳", category: "Home" },
  { fi: "makuuhuone", en: "bedroom", vi: "phòng ngủ", illustration: "🛏️", category: "Home" },
  { fi: "kylpyhuone", en: "bathroom", vi: "phòng tắm", illustration: "🛁", category: "Home" },
  { fi: "tuoli", en: "chair", vi: "cái ghế", illustration: "🪑", category: "Home" },
  { fi: "pöytä", en: "table", vi: "cái bàn", illustration: "🪟", category: "Home" },
  // Food
  { fi: "omena", en: "apple", vi: "quả táo", illustration: "🍎", category: "Food" },
  { fi: "maito", en: "milk", vi: "sữa", illustration: "🥛", category: "Food" },
  { fi: "juusto", en: "cheese", vi: "phô mai", illustration: "🧀", category: "Food" },
  { fi: "kala", en: "fish", vi: "con cá", illustration: "🐟", category: "Food" },
  { fi: "peruna", en: "potato", vi: "khoai tây", illustration: "🥔", category: "Food" },
  // Transport
  { fi: "juna", en: "train", vi: "tàu hỏa", illustration: "🚆", category: "Transport" },
  { fi: "bussi", en: "bus", vi: "xe buýt", illustration: "🚌", category: "Transport" },
  { fi: "polkupyörä", en: "bicycle", vi: "xe đạp", illustration: "🚲", category: "Transport" },
  { fi: "lentokone", en: "airplane", vi: "máy bay", illustration: "✈️", category: "Transport" },
  // Body
  { fi: "pää", en: "head", vi: "cái đầu", illustration: "🧠", category: "Body" },
  { fi: "silmä", en: "eye", vi: "mắt", illustration: "👁️", category: "Body" },
  { fi: "käsi", en: "hand", vi: "bàn tay", illustration: "✋", category: "Body" },
  { fi: "jalka", en: "leg", vi: "chân", illustration: "🦵", category: "Body" },
  // Weather/seasons
  { fi: "sade", en: "rain", vi: "mưa", illustration: "🌧️", category: "Nature" },
  { fi: "tuuli", en: "wind", vi: "gió", illustration: "🌬️", category: "Nature" },
  { fi: "kesä", en: "summer", vi: "mùa hè", illustration: "🌞", category: "Nature" },
  { fi: "talvi", en: "winter", vi: "mùa đông", illustration: "🌨️", category: "Nature" },
  { fi: "syksy", en: "autumn", vi: "mùa thu", illustration: "🍂", category: "Nature" },
  { fi: "kevät", en: "spring", vi: "mùa xuân", illustration: "🌸", category: "Nature" },
  // Numbers
  { fi: "yksi", en: "one", vi: "một", illustration: "1️⃣", category: "Numbers" },
  { fi: "kaksi", en: "two", vi: "hai", illustration: "2️⃣", category: "Numbers" },
  { fi: "kolme", en: "three", vi: "ba", illustration: "3️⃣", category: "Numbers" },
  { fi: "kymmenen", en: "ten", vi: "mười", illustration: "🔟", category: "Numbers" },
  { fi: "sata", en: "hundred", vi: "trăm", illustration: "💯", category: "Numbers" },
];

/* ============================================================
 * COMMON PITFALLS FOR VIETNAMESE LEARNERS
 * ============================================================ */
export const VIETNAMESE_PITFALLS: VietnamesePitfall[] = [
  {
    mistake: "Bỏ qua nguyên âm dài (kuusi vs kusi)",
    why: "Tiếng Việt không phân biệt nguyên âm dài/ngắn, nhưng trong tiếng Phần Lan ý nghĩa thay đổi hoàn toàn - kuusi = 'sáu/cây vân sam', kusi = từ thô tục.",
    correct: "Phải kéo dài rõ rệt nguyên âm đôi: 'kuu-si', không phải 'ku-si'.",
    tip: "Đếm nhịp khi luyện: nguyên âm đơn = 1 nhịp, đôi = 2 nhịp.",
  },
  {
    mistake: "Phát âm Ä, Ö, Y giống A, O, U",
    why: "Người Việt thường lờ đi dấu trên các nguyên âm trước (front vowels) vì không có trong bảng chữ cái Việt.",
    correct: "Ä = 'e' mở rộng, Ö = tròn môi nói 'ê', Y = tròn môi nói 'i'.",
    tip: "Luyện cặp tối thiểu: tuli (lửa) vs tyli (cùn) - 'u' tròn môi sau, 'y' tròn môi trước.",
  },
  {
    mistake: "Bỏ phụ âm đôi (kk, pp, tt)",
    why: "Tiếng Việt không có phụ âm đôi, người học hay nói 'kuka' thay vì 'kukka' (hoa).",
    correct: "Giữ một khoảng tĩnh ngắn giữa hai âm tiết - như khi bạn nói 'mít-tinh'.",
    tip: "Vỗ tay 2 lần khi gặp KK/PP/TT để tạo phản xạ.",
  },
  {
    mistake: "Dịch trực tiếp 'có/là' (on)",
    why: "Tiếng Việt thường lược bỏ động từ 'là', người Việt hay quên 'on' trong câu kiểu 'Hän on opettaja'.",
    correct: "Trong câu khẳng định luôn cần động từ 'olla' (là/có): 'Minä OLEN suomalainen'.",
    tip: "Học thuộc 'olen, olet, on, olemme, olette, ovat' như bảng cửu chương.",
  },
  {
    mistake: "Dùng sai cách đối với động từ 'thích' (tykätä, pitää)",
    why: "Người Việt nói 'thích cà phê' = chủ ngữ + động từ + tân ngữ, nhưng tiếng Phần Lan dùng cách Elatiivi: 'Pidän kahvista' (Tôi thích từ-cà-phê).",
    correct: "'Pidän + kahvi + STA' (-sta/-stä).",
    tip: "Học mẫu: 'Pidän _____sta/stä'. Luôn thêm đuôi -sta/-stä sau từ thích.",
  },
  {
    mistake: "Nhầm partitive (-a/-ä) với nominative",
    why: "Tiếng Việt không có cách (case), nên người học hay nói 'Juon kahvi' thay vì 'Juon kahvia' (uống một-ít cà phê).",
    correct: "Khi nói về một phần/lượng không xác định → dùng partitive.",
    tip: "Cứ thấy động từ 'syödä, juoda, ostaa, rakastaa' → tân ngữ thường ở partitive.",
  },
  {
    mistake: "Quên hoà âm nguyên âm (vokaaliharmonia)",
    why: "Trong tiếng Phần Lan, đuôi phải hoà với nguyên âm gốc: từ có a/o/u → đuôi a, từ có ä/ö/y → đuôi ä.",
    correct: "talossa (trong nhà) - không phải talossä; metsässä (trong rừng) - không phải metsassa.",
    tip: "Quy tắc vàng: nhìn nguyên âm cuối của gốc → chọn đuôi cùng nhóm.",
  },
];

/* ============================================================
 * BEGINNER QUIZ
 * ============================================================ */
export const BEGINNER_QUIZ: BeginnerQuiz[] = [
  {
    question: "Which sentence correctly uses partitive after 'juoda'?",
    questionVi: "Câu nào dùng đúng partitive sau 'juoda' (uống)?",
    options: ["Juon kahvi", "Juon kahvia", "Juon kahville", "Juon kahvissa"],
    answer: 1,
    explanation: "After verbs like juoda/syödä, the object takes partitive: kahvi → kahvia.",
    explanationVi: "Sau động từ juoda/syödä, tân ngữ ở partitive: kahvi → kahvia.",
  },
  {
    question: "Choose the correct present-tense form of 'puhua' (to speak) for 'minä':",
    questionVi: "Chọn dạng hiện tại đúng của 'puhua' với 'minä':",
    options: ["puhua", "puhun", "puhuu", "puhumme"],
    answer: 1,
    explanation: "Type 1 verb: drop final -a, add -n for minä → puhun.",
    explanationVi: "Động từ loại 1: bỏ -a cuối, thêm -n cho minä → puhun.",
  },
  {
    question: "Which is the correct KPT-graded form for 'kauppa' (genitive)?",
    questionVi: "Dạng KPT đúng cho 'kauppa' ở cách sở hữu (genitive) là?",
    options: ["kauppan", "kaupan", "kaupin", "kauppaan"],
    answer: 1,
    explanation: "pp → p, then add -n: kauppa → kaupan.",
    explanationVi: "pp → p, sau đó thêm -n: kauppa → kaupan.",
  },
  {
    question: "How do you say 'My name is Mai' in Finnish?",
    questionVi: "Nói 'Tên tôi là Mai' bằng tiếng Phần Lan thế nào?",
    options: ["Minä Mai", "Minun nimeni on Mai", "Olen nimeni Mai", "Mai minun"],
    answer: 1,
    explanation: "Standard pattern: Minun nimeni on + name.",
    explanationVi: "Mẫu chuẩn: Minun nimeni on + tên.",
  },
  {
    question: "Which vowel pair is a true 'minimal pair' showing length contrast?",
    questionVi: "Cặp nguyên âm nào thể hiện đối lập độ dài thật sự?",
    options: ["tuli / tyli", "tuli / tuuli", "tuli / tale", "tuli / kuli"],
    answer: 1,
    explanation: "tuli (fire) vs tuuli (wind) - single u vs long uu.",
    explanationVi: "tuli (lửa) vs tuuli (gió) - u đơn vs uu dài.",
  },
  {
    question: "Pick the polite way to ask 'Do you speak English?'",
    questionVi: "Cách lịch sự hỏi 'Bạn có nói tiếng Anh không?'",
    options: ["Englanti?", "Puhutko englantia?", "Sinä englanti", "Onko englanti?"],
    answer: 1,
    explanation: "Verb + ko/kö makes a yes/no question; partitive 'englantia' after puhua.",
    explanationVi: "Động từ + ko/kö tạo câu hỏi yes/no; partitive 'englantia' sau puhua.",
  },
  {
    question: "Vowel harmony: which ending fits 'metsä' (forest) for 'in the forest'?",
    questionVi: "Hoà âm: đuôi nào hợp với 'metsä' (rừng) để nói 'trong rừng'?",
    options: ["metsassa", "metsässä", "metsossa", "metsussa"],
    answer: 1,
    explanation: "Front vowels (ä,ö,y) in stem → front-vowel ending -ssä.",
    explanationVi: "Gốc có nguyên âm trước (ä,ö,y) → đuôi nguyên âm trước -ssä.",
  },
  {
    question: "How do you say 'I would like a coffee'?",
    questionVi: "'Tôi muốn một ly cà phê' nói thế nào?",
    options: ["Haluan kahvi", "Haluaisin kahvia", "Haluatte kahvia", "Kahvi haluan"],
    answer: 1,
    explanation: "Conditional 'haluaisin' is more polite; partitive 'kahvia' after.",
    explanationVi: "Dạng điều kiện 'haluaisin' lịch sự hơn; partitive 'kahvia' theo sau.",
  },
  {
    question: "Verb type 3 (mennä) - 'we go' is:",
    questionVi: "Động từ loại 3 (mennä) - 'chúng tôi đi' là:",
    options: ["mennämme", "menemme", "mennemme", "menemmen"],
    answer: 1,
    explanation: "mennä → drop -nä, add e + mme: menemme.",
    explanationVi: "mennä → bỏ -nä, thêm e + mme: menemme.",
  },
  {
    question: "Choose the correct way to say 'I don't speak Finnish':",
    questionVi: "Chọn cách đúng nói 'Tôi không nói tiếng Phần Lan':",
    options: ["Minä ei puhu suomea", "En puhu suomea", "Minä en suomea", "En suomi"],
    answer: 1,
    explanation: "Negation: en + verb stem (no personal ending) + partitive object.",
    explanationVi: "Phủ định: en + thân động từ (không đuôi) + tân ngữ partitive.",
  },
  {
    question: "Which is the genitive of 'koira' (dog)?",
    questionVi: "Cách sở hữu (genitive) của 'koira' (chó) là gì?",
    options: ["koiran", "koirassa", "koiraa", "koirat"],
    answer: 0,
    explanation: "Genitive = stem + n: koira → koiran (of the dog).",
    explanationVi: "Genitive = thân + n: koira → koiran (của con chó).",
  },
];

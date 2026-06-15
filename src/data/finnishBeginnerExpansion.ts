/**
 * @file finnishBeginnerExpansion.ts
 * @description Bổ sung Beginner A1-A2: số đếm, thời gian/ngày tháng, gia đình,
 *              đồ ăn, thời tiết, mua sắm, phòng học, thêm KPT/partitive/pitfalls/quiz.
 * @author Teacher Hai (HaiEduTech)
 */

import type {
  AlphabetSound, KptPair, PartitiveCase, DailyPhrase, BeginnerVocab,
  VietnamesePitfall, BeginnerQuiz, VerbType,
} from "./finnishBeginnerData";

// =============================================================
// PHÁT ÂM MỞ RỘNG - diphthong & nguyên âm dài
// =============================================================
export const ALPHABET_SOUNDS_EXTRA: AlphabetSound[] = [
  { letter: "AA", ipa: "/ɑː/", example: "maa", exampleEn: "land", exampleVi: "đất, đất nước", group: "vowel-back", tip: "Long 'a' - hold twice as long", tipVi: "Âm 'a' dài, kéo dài gấp đôi" },
  { letter: "ÄÄ", ipa: "/æː/", example: "pää", exampleEn: "head", exampleVi: "đầu", group: "vowel-front", tip: "Long bright 'ä', smile while saying it", tipVi: "Âm 'ä' dài, cười khi phát âm" },
  { letter: "OO", ipa: "/oː/", example: "koo", exampleEn: "size", exampleVi: "kích cỡ", group: "vowel-back", tip: "Long 'o', tense lips", tipVi: "'o' dài, môi tròn căng" },
  { letter: "UU", ipa: "/uː/", example: "puu", exampleEn: "tree", exampleVi: "cây", group: "vowel-back", tip: "Long 'u', round lips firmly", tipVi: "'u' dài, môi tròn mạnh" },
  { letter: "II", ipa: "/iː/", example: "kissa", exampleEn: "cat", exampleVi: "con mèo", group: "vowel-front", tip: "Tense, smiley 'i'", tipVi: "'i' căng, miệng cười" },
  { letter: "AI", ipa: "/ɑi/", example: "aika", exampleEn: "time", exampleVi: "thời gian", group: "vowel-back", tip: "Diphthong a→i", tipVi: "Nguyên âm đôi a→i" },
  { letter: "EI", ipa: "/ei/", example: "ei", exampleEn: "no", exampleVi: "không", group: "vowel-front", tip: "Diphthong e→i, like English 'ay'", tipVi: "Nguyên âm đôi e→i, như 'ây'" },
  { letter: "OI", ipa: "/oi/", example: "voi", exampleEn: "butter", exampleVi: "bơ", group: "vowel-back", tip: "Diphthong o→i", tipVi: "Nguyên âm đôi o→i" },
  { letter: "UO", ipa: "/uo/", example: "tuoli", exampleEn: "chair", exampleVi: "ghế", group: "vowel-back", tip: "Glide u→o, very Finnish", tipVi: "Lướt u→o, rất Phần Lan" },
  { letter: "YÖ", ipa: "/yø/", example: "työ", exampleEn: "work", exampleVi: "công việc", group: "vowel-front", tip: "Front diphthong y→ö", tipVi: "Đôi nguyên âm trước y→ö" },
  { letter: "IE", ipa: "/ie/", example: "tie", exampleEn: "road", exampleVi: "con đường", group: "vowel-front", tip: "Glide i→e", tipVi: "Lướt i→e" },
  { letter: "NG", ipa: "/ŋː/", example: "kengät", exampleEn: "shoes", exampleVi: "giày", group: "double-consonant", tip: "Long nasal 'ng' - never 'n+g'", tipVi: "Âm mũi 'ng' kéo dài, không phải 'n+g'" },
];

// =============================================================
// VERB TYPE BÀI TẬP CHIA
// =============================================================
export const VERB_CONJUGATION_DRILLS: { fi: string; en: string; vi: string; type: number }[] = [
  { fi: "Minä puhun suomea joka päivä.", en: "I speak Finnish every day.", vi: "Tôi nói tiếng Phần Lan mỗi ngày.", type: 1 },
  { fi: "Sinä asut Helsingissä.", en: "You live in Helsinki.", vi: "Bạn sống ở Helsinki.", type: 1 },
  { fi: "Hän juo kahvia aamulla.", en: "He/she drinks coffee in the morning.", vi: "Anh/cô ấy uống cà phê buổi sáng.", type: 2 },
  { fi: "Me syömme yhdessä.", en: "We eat together.", vi: "Chúng tôi ăn cùng nhau.", type: 2 },
  { fi: "Te menette kouluun.", en: "You (pl.) go to school.", vi: "Các bạn đi đến trường.", type: 3 },
  { fi: "He nousevat kello seitsemän.", en: "They get up at seven.", vi: "Họ thức dậy lúc 7 giờ.", type: 4 },
  { fi: "Minä haluan oppia suomea.", en: "I want to learn Finnish.", vi: "Tôi muốn học tiếng Phần Lan.", type: 4 },
  { fi: "Hän tarvitsee uuden tietokoneen.", en: "He/she needs a new computer.", vi: "Anh/cô ấy cần một chiếc máy tính mới.", type: 5 },
  { fi: "Lapset leikkivät puistossa.", en: "The kids play in the park.", vi: "Bọn trẻ chơi trong công viên.", type: 1 },
  { fi: "En tiedä vastausta.", en: "I don't know the answer.", vi: "Tôi không biết câu trả lời.", type: 4 },
];

// =============================================================
// SỐ ĐẾM, NGÀY THÁNG, THỜI GIAN
// =============================================================
export interface NumberEntry {
  digit: string;
  fi: string;
  vi: string;
  en: string;
}

export const NUMBERS_0_20: NumberEntry[] = [
  { digit: "0", fi: "nolla", vi: "không", en: "zero" },
  { digit: "1", fi: "yksi", vi: "một", en: "one" },
  { digit: "2", fi: "kaksi", vi: "hai", en: "two" },
  { digit: "3", fi: "kolme", vi: "ba", en: "three" },
  { digit: "4", fi: "neljä", vi: "bốn", en: "four" },
  { digit: "5", fi: "viisi", vi: "năm", en: "five" },
  { digit: "6", fi: "kuusi", vi: "sáu", en: "six" },
  { digit: "7", fi: "seitsemän", vi: "bảy", en: "seven" },
  { digit: "8", fi: "kahdeksan", vi: "tám", en: "eight" },
  { digit: "9", fi: "yhdeksän", vi: "chín", en: "nine" },
  { digit: "10", fi: "kymmenen", vi: "mười", en: "ten" },
  { digit: "11", fi: "yksitoista", vi: "mười một", en: "eleven" },
  { digit: "12", fi: "kaksitoista", vi: "mười hai", en: "twelve" },
  { digit: "15", fi: "viisitoista", vi: "mười lăm", en: "fifteen" },
  { digit: "20", fi: "kaksikymmentä", vi: "hai mươi", en: "twenty" },
  { digit: "30", fi: "kolmekymmentä", vi: "ba mươi", en: "thirty" },
  { digit: "50", fi: "viisikymmentä", vi: "năm mươi", en: "fifty" },
  { digit: "100", fi: "sata", vi: "một trăm", en: "one hundred" },
  { digit: "1000", fi: "tuhat", vi: "một nghìn", en: "one thousand" },
];

export const WEEKDAYS: { fi: string; vi: string; en: string; emoji: string }[] = [
  { fi: "maanantai", vi: "Thứ Hai", en: "Monday", emoji: "🌑" },
  { fi: "tiistai", vi: "Thứ Ba", en: "Tuesday", emoji: "🔥" },
  { fi: "keskiviikko", vi: "Thứ Tư", en: "Wednesday", emoji: "⛰️" },
  { fi: "torstai", vi: "Thứ Năm", en: "Thursday", emoji: "⚡" },
  { fi: "perjantai", vi: "Thứ Sáu", en: "Friday", emoji: "🍻" },
  { fi: "lauantai", vi: "Thứ Bảy", en: "Saturday", emoji: "🧖" },
  { fi: "sunnuntai", vi: "Chủ Nhật", en: "Sunday", emoji: "☀️" },
];

export const MONTHS: { fi: string; vi: string; en: string }[] = [
  { fi: "tammikuu", vi: "Tháng 1", en: "January" },
  { fi: "helmikuu", vi: "Tháng 2", en: "February" },
  { fi: "maaliskuu", vi: "Tháng 3", en: "March" },
  { fi: "huhtikuu", vi: "Tháng 4", en: "April" },
  { fi: "toukokuu", vi: "Tháng 5", en: "May" },
  { fi: "kesäkuu", vi: "Tháng 6", en: "June" },
  { fi: "heinäkuu", vi: "Tháng 7", en: "July" },
  { fi: "elokuu", vi: "Tháng 8", en: "August" },
  { fi: "syyskuu", vi: "Tháng 9", en: "September" },
  { fi: "lokakuu", vi: "Tháng 10", en: "October" },
  { fi: "marraskuu", vi: "Tháng 11", en: "November" },
  { fi: "joulukuu", vi: "Tháng 12", en: "December" },
];

export const TIME_PHRASES: { fi: string; vi: string; en: string }[] = [
  { fi: "Mitä kello on?", vi: "Mấy giờ rồi?", en: "What time is it?" },
  { fi: "Kello on viisi.", vi: "5 giờ.", en: "It's five o'clock." },
  { fi: "Kello on puoli kahdeksan.", vi: "7 rưỡi (7:30).", en: "It's half past seven." },
  { fi: "Vartin yli kymmenen.", vi: "10 giờ 15.", en: "Quarter past ten." },
  { fi: "Vartin vaille kuusi.", vi: "5 giờ 45 (kém 15 phút 6 giờ).", en: "Quarter to six." },
  { fi: "Aamulla / Iltapäivällä / Illalla / Yöllä", vi: "Buổi sáng / chiều / tối / đêm.", en: "Morning / afternoon / evening / night." },
  { fi: "Tänään on maanantai 26. huhtikuuta 2026.", vi: "Hôm nay là Thứ Hai 26 tháng 4, 2026.", en: "Today is Monday April 26, 2026." },
];

// =============================================================
// KPT MỞ RỘNG
// =============================================================
export const KPT_PAIRS_EXTRA: KptPair[] = [
  { strong: "tt", weak: "t", example: "matto → maton", meaning: "carpet (gen.)", meaningVi: "tấm thảm (sở hữu)" },
  { strong: "kk", weak: "k", example: "pankki → pankin", meaning: "bank (gen.)", meaningVi: "ngân hàng (sở hữu)" },
  { strong: "lt", weak: "ll", example: "ilta → illan", meaning: "evening (gen.)", meaningVi: "buổi tối (sở hữu)" },
  { strong: "rt", weak: "rr", example: "parta → parran", meaning: "beard (gen.)", meaningVi: "râu (sở hữu)" },
  { strong: "nt", weak: "nn", example: "ranta → rannan", meaning: "shore (gen.)", meaningVi: "bờ biển (sở hữu)" },
  { strong: "mp", weak: "mm", example: "kampa → kamman", meaning: "comb (gen.)", meaningVi: "lược (sở hữu)" },
  { strong: "nk", weak: "ng", example: "Helsinki → Helsingin", meaning: "Helsinki (of)", meaningVi: "của Helsinki" },
  { strong: "k (between vowels)", weak: "- (drops)", example: "lukea → luen", meaning: "to read → I read", meaningVi: "đọc → tôi đọc" },
];

// =============================================================
// PARTITIVE MỞ RỘNG
// =============================================================
export const PARTITIVE_CASES_EXTRA: PartitiveCase[] = [
  {
    ending: "-a / -ä (after numbers > 1)",
    trigger: "After numerals greater than 1, the counted noun goes in partitive singular.",
    triggerVi: "Sau số đếm lớn hơn 1, danh từ được đếm chia partitive số ít.",
    examples: [
      { fi: "Kaksi kahvia, kiitos.", en: "Two coffees, please.", vi: "Cho 2 ly cà phê." },
      { fi: "Kolme omenaa.", en: "Three apples.", vi: "Ba quả táo." },
      { fi: "Viisi euroa.", en: "Five euros.", vi: "Năm euro." },
    ],
  },
  {
    ending: "-aa / -ää (with feeling/learning verbs)",
    trigger: "Verbs of feeling, learning, studying take partitive object.",
    triggerVi: "Động từ chỉ cảm xúc/học tập đi với tân ngữ partitive.",
    examples: [
      { fi: "Rakastan sinua.", en: "I love you.", vi: "Anh yêu em." },
      { fi: "Opiskelen suomea.", en: "I study Finnish.", vi: "Tôi học tiếng Phần Lan." },
      { fi: "Pidän kahvista.", en: "I like coffee.", vi: "Tôi thích cà phê." },
    ],
  },
  {
    ending: "-ta / -tä (mass nouns / uncountable)",
    trigger: "Uncountable nouns and partial quantities use partitive.",
    triggerVi: "Danh từ không đếm được hoặc một phần dùng partitive.",
    examples: [
      { fi: "Otan vettä.", en: "I'll have water.", vi: "Tôi xin nước." },
      { fi: "Syön leipää.", en: "I eat (some) bread.", vi: "Tôi ăn bánh mì." },
      { fi: "Ostan maitoa.", en: "I buy milk.", vi: "Tôi mua sữa." },
    ],
  },
];

// =============================================================
// PHRASE MỞ RỘNG
// =============================================================
export const DAILY_PHRASES_EXTRA: DailyPhrase[] = [
  { fi: "Anteeksi, en ymmärrä.", en: "Sorry, I don't understand.", vi: "Xin lỗi, tôi không hiểu.", category: "polite", illustration: "🙏" },
  { fi: "Voitko puhua hitaammin?", en: "Can you speak more slowly?", vi: "Bạn nói chậm hơn được không?", category: "polite", illustration: "🐢" },
  { fi: "Paljonko tämä maksaa?", en: "How much does this cost?", vi: "Cái này giá bao nhiêu?", category: "shopping", illustration: "💰" },
  { fi: "Otan tämän, kiitos.", en: "I'll take this, please.", vi: "Tôi lấy cái này, cảm ơn.", category: "shopping", illustration: "🛍️" },
  { fi: "Onko teillä gluteenitonta leipää?", en: "Do you have gluten-free bread?", vi: "Bạn có bánh mì không gluten không?", category: "shopping", illustration: "🍞" },
  { fi: "Missä on lähin apteekki?", en: "Where is the nearest pharmacy?", vi: "Hiệu thuốc gần nhất ở đâu?", category: "asking", illustration: "💊" },
  { fi: "Voinko maksaa kortilla?", en: "Can I pay by card?", vi: "Tôi trả bằng thẻ được không?", category: "shopping", illustration: "💳" },
  { fi: "Hauska tutustua.", en: "Nice to meet you.", vi: "Rất vui được làm quen.", category: "intro", illustration: "🤝" },
  { fi: "Mistä sinä olet kotoisin?", en: "Where are you from?", vi: "Bạn đến từ đâu?", category: "intro", illustration: "🌍" },
  { fi: "Olen Vietnamista.", en: "I'm from Vietnam.", vi: "Tôi đến từ Việt Nam.", category: "intro", illustration: "🇻🇳" },
  { fi: "Hyvää viikonloppua!", en: "Have a good weekend!", vi: "Chúc cuối tuần vui vẻ!", category: "polite", illustration: "🎉" },
  { fi: "Ole hyvä.", en: "Here you go / You're welcome.", vi: "Đây / Không có gì.", category: "polite", illustration: "🙌" },
];

// =============================================================
// VOCAB MỞ RỘNG (gia đình, thực phẩm, thời tiết, lớp học, cơ thể)
// =============================================================
export const BEGINNER_VOCAB_EXTRA: BeginnerVocab[] = [
  // Gia đình
  { fi: "perhe", vi: "gia đình", en: "family", illustration: "👪", category: "family" },
  { fi: "äiti", vi: "mẹ", en: "mother", illustration: "👩", category: "family" },
  { fi: "isä", vi: "bố", en: "father", illustration: "👨", category: "family" },
  { fi: "sisko", vi: "chị/em gái", en: "sister", illustration: "👧", category: "family" },
  { fi: "veli", vi: "anh/em trai", en: "brother", illustration: "👦", category: "family" },
  { fi: "isovanhemmat", vi: "ông bà", en: "grandparents", illustration: "👴👵", category: "family" },
  { fi: "ystävä", vi: "bạn", en: "friend", illustration: "🧑‍🤝‍🧑", category: "family" },
  // Thức ăn
  { fi: "leipä", vi: "bánh mì", en: "bread", illustration: "🍞", category: "food" },
  { fi: "maito", vi: "sữa", en: "milk", illustration: "🥛", category: "food" },
  { fi: "kahvi", vi: "cà phê", en: "coffee", illustration: "☕", category: "food" },
  { fi: "vesi", vi: "nước", en: "water", illustration: "💧", category: "food" },
  { fi: "omena", vi: "táo", en: "apple", illustration: "🍎", category: "food" },
  { fi: "kala", vi: "cá", en: "fish", illustration: "🐟", category: "food" },
  { fi: "kana", vi: "gà", en: "chicken", illustration: "🐔", category: "food" },
  { fi: "riisi", vi: "cơm/gạo", en: "rice", illustration: "🍚", category: "food" },
  // Thời tiết
  { fi: "sää", vi: "thời tiết", en: "weather", illustration: "🌦️", category: "weather" },
  { fi: "lumi", vi: "tuyết", en: "snow", illustration: "❄️", category: "weather" },
  { fi: "sade", vi: "mưa", en: "rain", illustration: "🌧️", category: "weather" },
  { fi: "aurinko", vi: "mặt trời", en: "sun", illustration: "☀️", category: "weather" },
  { fi: "tuuli", vi: "gió", en: "wind", illustration: "💨", category: "weather" },
  { fi: "kylmä", vi: "lạnh", en: "cold", illustration: "🥶", category: "weather" },
  // Lớp học / phòng
  { fi: "kirja", vi: "quyển sách", en: "book", illustration: "📖", category: "classroom" },
  { fi: "kynä", vi: "cây bút", en: "pen", illustration: "🖊️", category: "classroom" },
  { fi: "tietokone", vi: "máy tính", en: "computer", illustration: "💻", category: "classroom" },
  { fi: "opettaja", vi: "giáo viên", en: "teacher", illustration: "🧑‍🏫", category: "classroom" },
  { fi: "oppilas", vi: "học sinh", en: "student", illustration: "🧑‍🎓", category: "classroom" },
  // Cơ thể
  { fi: "pää", vi: "đầu", en: "head", illustration: "🗣️", category: "body" },
  { fi: "käsi", vi: "tay", en: "hand", illustration: "✋", category: "body" },
  { fi: "jalka", vi: "chân", en: "leg/foot", illustration: "🦵", category: "body" },
  { fi: "silmä", vi: "mắt", en: "eye", illustration: "👁️", category: "body" },
  { fi: "sydän", vi: "tim", en: "heart", illustration: "❤️", category: "body" },
  // Số đếm & màu sắc
  { fi: "punainen", vi: "đỏ", en: "red", illustration: "🔴", category: "color" },
  { fi: "sininen", vi: "xanh dương", en: "blue", illustration: "🔵", category: "color" },
  { fi: "vihreä", vi: "xanh lá", en: "green", illustration: "🟢", category: "color" },
  { fi: "keltainen", vi: "vàng", en: "yellow", illustration: "🟡", category: "color" },
  { fi: "musta", vi: "đen", en: "black", illustration: "⚫", category: "color" },
  { fi: "valkoinen", vi: "trắng", en: "white", illustration: "⚪", category: "color" },
  // Đồ vật trong nhà
  { fi: "talo", vi: "ngôi nhà", en: "house", illustration: "🏠", category: "home" },
  { fi: "huone", vi: "căn phòng", en: "room", illustration: "🚪", category: "home" },
  { fi: "sänky", vi: "cái giường", en: "bed", illustration: "🛏️", category: "home" },
  { fi: "tuoli", vi: "cái ghế", en: "chair", illustration: "🪑", category: "home" },
  { fi: "pöytä", vi: "cái bàn", en: "table", illustration: "🪟", category: "home" },
  { fi: "ikkuna", vi: "cửa sổ", en: "window", illustration: "🪟", category: "home" },
  { fi: "ovi", vi: "cửa ra vào", en: "door", illustration: "🚪", category: "home" },
  // Phương tiện & đi lại
  { fi: "auto", vi: "ô tô", en: "car", illustration: "🚗", category: "transport" },
  { fi: "bussi", vi: "xe buýt", en: "bus", illustration: "🚌", category: "transport" },
  { fi: "juna", vi: "tàu hỏa", en: "train", illustration: "🚆", category: "transport" },
  { fi: "polkupyörä", vi: "xe đạp", en: "bicycle", illustration: "🚲", category: "transport" },
  { fi: "lentokone", vi: "máy bay", en: "airplane", illustration: "✈️", category: "transport" },
  // Động vật
  { fi: "koira", vi: "con chó", en: "dog", illustration: "🐕", category: "animal" },
  { fi: "kissa", vi: "con mèo", en: "cat", illustration: "🐈", category: "animal" },
  { fi: "lintu", vi: "con chim", en: "bird", illustration: "🐦", category: "animal" },
  { fi: "hevonen", vi: "con ngựa", en: "horse", illustration: "🐴", category: "animal" },
  { fi: "karhu", vi: "con gấu", en: "bear", illustration: "🐻", category: "animal" },
  { fi: "poro", vi: "tuần lộc", en: "reindeer", illustration: "🦌", category: "animal" },
  // Cảm xúc
  { fi: "iloinen", vi: "vui", en: "happy", illustration: "😊", category: "emotion" },
  { fi: "surullinen", vi: "buồn", en: "sad", illustration: "😢", category: "emotion" },
  { fi: "vihainen", vi: "giận", en: "angry", illustration: "😡", category: "emotion" },
  { fi: "väsynyt", vi: "mệt", en: "tired", illustration: "😴", category: "emotion" },
  { fi: "innoissaan", vi: "phấn khích", en: "excited", illustration: "🤩", category: "emotion" },
  // Nghề nghiệp
  { fi: "lääkäri", vi: "bác sĩ", en: "doctor", illustration: "🧑‍⚕️", category: "job" },
  { fi: "insinööri", vi: "kỹ sư", en: "engineer", illustration: "👷", category: "job" },
  { fi: "kokki", vi: "đầu bếp", en: "cook", illustration: "🧑‍🍳", category: "job" },
  { fi: "ohjelmoija", vi: "lập trình viên", en: "programmer", illustration: "💻", category: "job" },
  { fi: "hoitaja", vi: "y tá", en: "nurse", illustration: "🩺", category: "job" },
  // Mở rộng A1-A2 cho YKI: hành chính, dịch vụ, thời gian
  { fi: "passi", vi: "hộ chiếu", en: "passport", illustration: "🛂", category: "office" },
  { fi: "henkilökortti", vi: "thẻ căn cước", en: "ID card", illustration: "🪪", category: "office" },
  { fi: "kortti", vi: "thẻ", en: "card", illustration: "💳", category: "office" },
  { fi: "kauppa", vi: "cửa hàng", en: "shop", illustration: "🏬", category: "place" },
  { fi: "tori", vi: "quảng trường chợ", en: "market square", illustration: "🛍️", category: "place" },
  { fi: "kirjasto", vi: "thư viện", en: "library", illustration: "📚", category: "place" },
  { fi: "posti", vi: "bưu điện", en: "post office", illustration: "📮", category: "place" },
  { fi: "sairaala", vi: "bệnh viện", en: "hospital", illustration: "🏥", category: "place" },
  { fi: "apteekki", vi: "hiệu thuốc", en: "pharmacy", illustration: "💊", category: "place" },
  { fi: "tänään", vi: "hôm nay", en: "today", illustration: "📅", category: "time" },
  { fi: "huomenna", vi: "ngày mai", en: "tomorrow", illustration: "📆", category: "time" },
  { fi: "eilen", vi: "hôm qua", en: "yesterday", illustration: "🕰️", category: "time" },
  { fi: "viikko", vi: "tuần", en: "week", illustration: "📅", category: "time" },
  { fi: "kuukausi", vi: "tháng", en: "month", illustration: "📆", category: "time" },
  { fi: "vuosi", vi: "năm", en: "year", illustration: "🗓️", category: "time" },
];

// =============================================================
// DAILY PHRASES MỞ RỘNG SET 2 - giao tiếp dài hơn
// =============================================================
export const DAILY_PHRASES_EXTRA_2: DailyPhrase[] = [
  { fi: "Mitä kuuluu?", en: "How are you?", vi: "Bạn khỏe không?", category: "greeting", illustration: "😊" },
  { fi: "Kiitos, hyvää. Entä sinulle?", en: "Thanks, good. And you?", vi: "Cảm ơn, tôi khỏe. Còn bạn?", category: "greeting", illustration: "👋" },
  { fi: "Nähdään huomenna!", en: "See you tomorrow!", vi: "Hẹn gặp ngày mai!", category: "polite", illustration: "👋" },
  { fi: "Onnea uudelle vuodelle!", en: "Happy New Year!", vi: "Chúc mừng năm mới!", category: "polite", illustration: "🎊" },
  { fi: "Olen pahoillani.", en: "I'm sorry.", vi: "Tôi xin lỗi.", category: "polite", illustration: "🙇" },
  { fi: "Voitko auttaa minua?", en: "Can you help me?", vi: "Bạn có thể giúp tôi không?", category: "asking", illustration: "🙋" },
  { fi: "Mihin aikaan juna lähtee?", en: "What time does the train leave?", vi: "Tàu mấy giờ chạy?", category: "asking", illustration: "🕒" },
  { fi: "Onko lähellä ravintolaa?", en: "Is there a restaurant nearby?", vi: "Gần đây có nhà hàng không?", category: "asking", illustration: "🍽️" },
  { fi: "Voinko saada veden, kiitos?", en: "Can I have water, please?", vi: "Cho tôi xin nước với?", category: "shopping", illustration: "💧" },
  { fi: "Olen opiskelija.", en: "I am a student.", vi: "Tôi là sinh viên.", category: "intro", illustration: "🎓" },
  { fi: "Asun Helsingissä.", en: "I live in Helsinki.", vi: "Tôi sống ở Helsinki.", category: "intro", illustration: "🏙️" },
  { fi: "Opin suomea, koska rakastan Suomea.", en: "I'm learning Finnish because I love Finland.", vi: "Tôi học tiếng Phần Lan vì tôi yêu nước Phần Lan.", category: "intro", illustration: "❤️" },
  // Câu hỏi & tình huống YKI A2 thường gặp
  { fi: "Anteeksi, voitteko puhua hitaammin?", en: "Excuse me, could you speak more slowly?", vi: "Xin lỗi, ông/bà có thể nói chậm hơn không?", category: "polite", illustration: "🐢" },
  { fi: "En ymmärrä. Voitko toistaa?", en: "I don't understand. Can you repeat?", vi: "Tôi không hiểu, bạn lặp lại được không?", category: "polite", illustration: "🤔" },
  { fi: "Mistä tämä juna lähtee?", en: "Where does this train leave from?", vi: "Tàu này khởi hành từ đâu?", category: "asking", illustration: "🚆" },
  { fi: "Haluaisin varata ajan lääkärille.", en: "I'd like to book a doctor's appointment.", vi: "Tôi muốn đặt lịch khám bác sĩ.", category: "asking", illustration: "🩺" },
  { fi: "Saanko kuitin, kiitos?", en: "Can I have the receipt, please?", vi: "Cho tôi xin biên lai với?", category: "shopping", illustration: "🧾" },
  { fi: "Onko teillä kasvisruokaa?", en: "Do you have vegetarian food?", vi: "Quán có món chay không?", category: "shopping", illustration: "🥗" },
  { fi: "Mistä löydän lähimmän pankkiautomaatin?", en: "Where can I find the nearest ATM?", vi: "Máy ATM gần nhất ở đâu?", category: "asking", illustration: "🏧" },
  { fi: "Tarvitsen apua. Soitatteko 112?", en: "I need help. Could you call 112?", vi: "Tôi cần giúp đỡ. Ông/bà gọi 112 giúp với?", category: "asking", illustration: "🚨" },
];
// Re-export merged phrases for convenience
export const DAILY_PHRASES_EXTRA_FULL = [...DAILY_PHRASES_EXTRA, ...DAILY_PHRASES_EXTRA_2];

// =============================================================
// PITFALLS MỞ RỘNG
// =============================================================
export const VIETNAMESE_PITFALLS_EXTRA: VietnamesePitfall[] = [
  {
    mistake: "Nói 'Minä rakastan sinä' để nói 'Anh yêu em'.",
    why: "Tân ngữ sau động từ cảm xúc phải chia partitive - không dùng dạng nguyên (nominative).",
    correct: "Minä rakastan sinua.",
    tip: "Mọi động từ cảm xúc (rakastaa, vihata, pitää) đều ép tân ngữ vào partitive: -a / -ä / -ta / -tä.",
  },
  {
    mistake: "Đọc 'tuli' và 'tuuli' giống nhau.",
    why: "Người Việt không quen độ dài âm. Trong tiếng Phần Lan, độ dài làm thay đổi nghĩa hoàn toàn (tuli = lửa, tuuli = gió).",
    correct: "Kéo dài uu gấp đôi: tuu-u-li.",
    tip: "Luyện minimal pairs: tuli/tuuli, kuka/kukka, tapa/tappaa - đếm nhịp khi luyện.",
  },
  {
    mistake: "Quên dùng -ko/-kö để hỏi yes/no, chỉ lên giọng cuối câu.",
    why: "Tiếng Phần Lan không 'lên giọng' để hỏi như tiếng Việt. Phải gắn -ko/-kö vào động từ và đảo lên đầu.",
    correct: "Puhutko sinä englantia?",
    tip: "Công thức: [Verb-ko/kö] + [chủ ngữ] + [bổ ngữ]. Hoà âm: ko (a/o/u), kö (ä/ö/y).",
  },
  {
    mistake: "Dùng 'kiitos' khi đưa đồ cho ai đó.",
    why: "Kiitos = cảm ơn. Khi ĐƯA đồ phải nói 'Ole hyvä' (xin mời / đây).",
    correct: "Ole hyvä!",
    tip: "Kiitos = nhận ơn (Việt: cảm ơn). Ole hyvä = trao ơn (Việt: dạ đây / xin mời).",
  },
  {
    mistake: "Phát âm 'h' câm như tiếng Pháp.",
    why: "Người Việt thường bỏ /h/. Tiếng Phần Lan luôn phát âm /h/ rõ ràng, kể cả giữa từ.",
    correct: "Hyvää huomenta - nói rõ cả 3 chữ h.",
    tip: "Tập thở mạnh ra khi gặp 'h': hää, hyvä, hauska.",
  },
  {
    mistake: "Dùng 'sinä' (bạn) với người lớn tuổi mới gặp.",
    why: "Phần Lan rất bình đẳng nên 'sinä' OK trong hầu hết trường hợp, nhưng trong môi trường formal (khám bệnh, cơ quan) vẫn nên dùng 'te' (ông/bà).",
    correct: "Voitteko auttaa minua? (Ông/bà có thể giúp tôi không?)",
    tip: "Mặc định dùng 'sinä' trong giao tiếp hằng ngày, dùng 'te' khi nói chuyện với người trên 60 hoặc trong văn bản chính thức.",
  },
  {
    mistake: "Phát âm 'r' yếu như 'r' Hà Nội.",
    why: "'R' tiếng Phần Lan là rung lưỡi mạnh (rolled R) như tiếng Tây Ban Nha.",
    correct: "Rakastan sinua - rung lưỡi đầu chữ.",
    tip: "Tập rrr với 1 ly nước: ngậm nước rồi rung lưỡi 5 giây/ngày.",
  },
  {
    mistake: "Dịch 'I am hungry' thành 'Minä olen nälkä'.",
    why: "Tiếng Phần Lan dùng cấu trúc 'minulla on' với cảm giác cơ thể.",
    correct: "Minulla on nälkä. (Tôi đang đói.)",
    tip: "Học thuộc combo: minulla on nälkä / jano / kuuma / kylmä / kiire.",
  },
  {
    mistake: "Dùng 'mä' và 'sä' trong bài thi YKI viết.",
    why: "'mä, sä' là khẩu ngữ (puhekieli). Bài viết YKI bắt buộc dùng 'minä, sinä'.",
    correct: "Minä asun Helsingissä. Sinä olet ystäväni.",
    tip: "Khi viết bài YKI: luôn dùng dạng đầy đủ. Khi nói: có thể dùng dạng rút gọn.",
  },
  {
    mistake: "Đặt động từ ở cuối câu như tiếng Đức.",
    why: "Tiếng Phần Lan dùng thứ tự SVO giống tiếng Anh: chủ ngữ + động từ + bổ ngữ.",
    correct: "Minä syön omenan. (Tôi ăn quả táo.)",
    tip: "Chỉ trong câu hỏi yes/no với -ko/-kö thì động từ mới lên đầu.",
  },
  {
    mistake: "Quên hài hoà nguyên âm (a/o/u vs ä/ö/y).",
    why: "Một từ thuần Phần Lan chỉ chứa nhóm sau hoặc trước, không trộn lẫn (trừ e/i trung tính).",
    correct: "talo + -ssa → talossa | metsä + -ssä → metsässä.",
    tip: "Nhìn nguyên âm gốc rồi chọn đuôi: a/o/u → -ssa, -lla, -sta; ä/ö/y → -ssä, -llä, -stä.",
  },
];

// =============================================================
// QUIZ MỞ RỘNG (10 câu mới)
// =============================================================
export const BEGINNER_QUIZ_EXTRA: BeginnerQuiz[] = [
  {
    question: "How do you say '7' in Finnish?",
    questionVi: "'Bảy' tiếng Phần Lan là gì?",
    options: ["kuusi", "seitsemän", "kahdeksan", "yhdeksän"],
    answer: 1,
    explanation: "seitsemän = seven; kuusi = 6, kahdeksan = 8, yhdeksän = 9.",
    explanationVi: "seitsemän = bảy; kuusi = 6, kahdeksan = 8, yhdeksän = 9.",
  },
  {
    question: "Which day is 'Wednesday'?",
    questionVi: "Ngày 'Thứ Tư' là?",
    options: ["maanantai", "tiistai", "keskiviikko", "torstai"],
    answer: 2,
    explanation: "keski = middle, viikko = week → keskiviikko = mid-week (Wednesday).",
    explanationVi: "keski = giữa, viikko = tuần → keskiviikko = giữa tuần (Thứ Tư).",
  },
  {
    question: "Choose the correct partitive after a number: 'Three apples'.",
    questionVi: "Chọn dạng partitive đúng sau số đếm: 'Ba quả táo'.",
    options: ["Kolme omena", "Kolme omenaa", "Kolme omenat", "Kolmet omena"],
    answer: 1,
    explanation: "Numbers > 1 take partitive singular: omena → omenaa.",
    explanationVi: "Số > 1 đi với partitive số ít: omena → omenaa.",
  },
  {
    question: "When you receive a gift, you say…",
    questionVi: "Khi nhận quà, bạn nói…",
    options: ["Ole hyvä", "Anteeksi", "Kiitos", "Hei hei"],
    answer: 2,
    explanation: "Kiitos = thank you. Ole hyvä is what the giver says.",
    explanationVi: "Kiitos = cảm ơn. 'Ole hyvä' là câu người trao quà nói.",
  },
  {
    question: "Pick the correct form: 'I love you'.",
    questionVi: "Chọn dạng đúng: 'Tôi yêu bạn'.",
    options: ["Rakastan sinä", "Rakastan sinun", "Rakastan sinua", "Rakastan sinut"],
    answer: 2,
    explanation: "Verbs of emotion take partitive object → sinua.",
    explanationVi: "Động từ cảm xúc dùng tân ngữ partitive → sinua.",
  },
  {
    question: "Which is the correct way to ask 'How much does this cost?'",
    questionVi: "Cách hỏi đúng 'Cái này giá bao nhiêu?'",
    options: ["Mitä tämä?", "Paljonko tämä maksaa?", "Kuinka tämä?", "Missä tämä maksaa?"],
    answer: 1,
    explanation: "Paljonko = how much, maksaa = costs.",
    explanationVi: "Paljonko = bao nhiêu, maksaa = trị giá.",
  },
  {
    question: "KPT gradation: 'pankki' in genitive (of the bank) is…",
    questionVi: "Biến KPT: 'pankki' ở genitive (của ngân hàng) là…",
    options: ["pankin", "pankkin", "pankkii", "pangin"],
    answer: 0,
    explanation: "kk → k, then add -in: pankki → pankin.",
    explanationVi: "kk → k, thêm -in: pankki → pankin.",
  },
  {
    question: "Choose the correct month: 'tháng 6'.",
    questionVi: "Chọn tháng đúng: 'June' (tháng 6).",
    options: ["toukokuu", "kesäkuu", "heinäkuu", "elokuu"],
    answer: 1,
    explanation: "kesä = summer, kuu = month → kesäkuu (June).",
    explanationVi: "kesä = mùa hè, kuu = tháng → kesäkuu (tháng 6).",
  },
  {
    question: "Ask 'Can you speak more slowly?' politely.",
    questionVi: "Hỏi lịch sự 'Bạn có thể nói chậm hơn không?'",
    options: ["Puhu hitaasti!", "Voitko puhua hitaammin?", "Sinä puhua hidas", "Hidas puhu"],
    answer: 1,
    explanation: "Voitko = can you (polite), hitaammin = more slowly.",
    explanationVi: "Voitko = bạn có thể (lịch sự), hitaammin = chậm hơn.",
  },
  {
    question: "What is 'cold' in Finnish?",
    questionVi: "'Lạnh' tiếng Phần Lan là gì?",
    options: ["kuuma", "lämmin", "kylmä", "viileä"],
    answer: 2,
    explanation: "kylmä = cold; kuuma = hot, lämmin = warm, viileä = cool.",
    explanationVi: "kylmä = lạnh; kuuma = nóng, lämmin = ấm, viileä = mát.",
  },
];

// =============================================================
// QUIZ MỞ RỘNG SET 2 - 10 câu nữa (A1-A2)
// =============================================================
const BEGINNER_QUIZ_EXTRA_2: BeginnerQuiz[] = [
  { question: "What does 'koira' mean?", questionVi: "'koira' nghĩa là gì?", options: ["mèo", "chó", "ngựa", "chim"], answer: 1, explanation: "koira = dog.", explanationVi: "koira = con chó." },
  { question: "How do you say 'red' in Finnish?", questionVi: "'Đỏ' tiếng Phần Lan là gì?", options: ["sininen", "vihreä", "punainen", "keltainen"], answer: 2, explanation: "punainen = red.", explanationVi: "punainen = đỏ." },
  { question: "Negative present of 'puhua' (he speaks) is…", questionVi: "Phủ định hiện tại 'hän puhuu' là…", options: ["hän ei puhuu", "hän ei puhu", "hän en puhu", "hän ole puhu"], answer: 1, explanation: "Negation uses ei + verb stem without ending: ei puhu.", explanationVi: "Phủ định: 'ei' + thân động từ không đuôi → ei puhu." },
  { question: "Pick the correct: 'I have a cat'.", questionVi: "Chọn đúng: 'Tôi có một con mèo'.", options: ["Minulla on kissa", "Minä on kissa", "Minä omistan kissan", "Minä olen kissa"], answer: 0, explanation: "Possession uses 'minulla on' = 'on me is'.", explanationVi: "Sở hữu dùng 'minulla on' = 'tôi có'." },
  { question: "Plural of 'kirja' (book) is…", questionVi: "Số nhiều của 'kirja' là…", options: ["kirjat", "kirjas", "kirjoja", "kirjojen"], answer: 0, explanation: "Nominative plural: kirja → kirjat.", explanationVi: "Số nhiều cách 1: kirja → kirjat." },
  { question: "'Talo' means…", questionVi: "'Talo' nghĩa là…", options: ["xe", "trường", "nhà", "đường"], answer: 2, explanation: "talo = house.", explanationVi: "talo = nhà." },
  { question: "Correct partitive of 'vesi' (water)?", questionVi: "Partitive đúng của 'vesi'?", options: ["vesi", "vetta", "vettä", "vesiä"], answer: 2, explanation: "vesi → vettä (consonant gradation t→tt + ä).", explanationVi: "vesi → vettä (biến đổi t→tt + ä)." },
  { question: "How to ask 'What is your name?'", questionVi: "Hỏi 'Bạn tên gì?'", options: ["Mikä on nimesi?", "Mistä olet?", "Kuka sinä?", "Missä asut?"], answer: 0, explanation: "Mikä on nimesi? literally 'What is your name?'", explanationVi: "Mikä on nimesi? nghĩa đen 'Tên bạn là gì?'" },
  { question: "Translate 'Anteeksi'.", questionVi: "Dịch 'Anteeksi'.", options: ["Cảm ơn", "Xin chào", "Xin lỗi", "Tạm biệt"], answer: 2, explanation: "Anteeksi = sorry / excuse me.", explanationVi: "Anteeksi = xin lỗi." },
  { question: "Which verb means 'to eat'?", questionVi: "Động từ nào nghĩa 'ăn'?", options: ["juoda", "syödä", "nukkua", "mennä"], answer: 1, explanation: "syödä = to eat (Type 2).", explanationVi: "syödä = ăn (Loại 2)." },
  { question: "Translate 'Minulla on nälkä.'", questionVi: "Dịch 'Minulla on nälkä.'", options: ["Tôi mệt", "Tôi buồn", "Tôi đói", "Tôi vui"], answer: 2, explanation: "minulla on nälkä = I'm hungry.", explanationVi: "Cấu trúc 'minulla on' + cảm giác cơ thể." },
  { question: "Imperfekti of 'asua' (minä)?", questionVi: "Imperfekti của 'asua' (minä)?", options: ["asun", "asuin", "asunut", "asuisin"], answer: 1, explanation: "asua → asuin (I lived).", explanationVi: "Quá khứ đơn: asua → asuin." },
  { question: "Adessive of 'minä'?", questionVi: "Dạng adessive của 'minä'?", options: ["minua", "minussa", "minulla", "minulle"], answer: 2, explanation: "minä → minulla (on me).", explanationVi: "Sở hữu dùng minulla." },
  { question: "How do you say 'pharmacy' in Finnish?", questionVi: "'Hiệu thuốc' tiếng Phần Lan?", options: ["apteekki", "sairaala", "kauppa", "posti"], answer: 0, explanation: "apteekki = pharmacy.", explanationVi: "apteekki = hiệu thuốc." },
  { question: "Choose the right partitive after a negative verb: 'En halua kahvia/kahvi/kahvin'.", questionVi: "Sau động từ phủ định dùng dạng nào?", options: ["kahvi", "kahvin", "kahvia", "kahville"], answer: 2, explanation: "Negation + object → partitive.", explanationVi: "Sau động từ phủ định, tân ngữ phải ở partitive." },
];

// Re-export merged quiz
export const BEGINNER_QUIZ_EXTRA_FULL = [...BEGINNER_QUIZ_EXTRA, ...BEGINNER_QUIZ_EXTRA_2];

// Optional: re-export verb examples helper
export const _verbTypesPlaceholder = (v: VerbType) => v.type;

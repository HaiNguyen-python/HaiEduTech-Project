/**
 * @file swedishLessonGrammarExtra.ts
 * @description Mở rộng phần ngữ pháp cho mỗi bài LessonDeep của tiếng Thụy Điển
 *              (A1). Mỗi bài có thêm phần giải thích chuyên sâu + 3-4 bài tập
 *              điền từ ngắn để học viên tự kiểm tra ngay sau khi đọc bảng
 *              ngữ pháp. Khớp key với LESSON_DEEP trong swedishLessonDeep.ts.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface LessonGrammarExercise {
  qVi: string;
  qEn: string;
  /** Main expected answer (shown to the learner when they miss it). */
  answer: string;
  /** Extra accepted spellings / translations (English + Swedish variants). */
  answers?: string[];
  hintVi?: string;
  hintEn?: string;
}

export interface LessonGrammarExtra {
  /** Giải thích sâu hơn về điểm ngữ pháp trong bảng chính. */
  deepVi: string;
  deepEn: string;
  /** 2-3 ví dụ minh hoạ bổ sung. */
  examples: { sv: string; vi: string; en: string }[];
  /** 3-4 bài tập nhanh (điền/chuyển) để củng cố. */
  exercises: LessonGrammarExercise[];
}

const E = (
  qVi: string,
  qEn: string,
  answer: string,
  hintVi?: string,
  hintEn?: string,
  answers?: string[],
): LessonGrammarExercise => ({ qVi, qEn, answer, hintVi, hintEn, answers });

export const LESSON_GRAMMAR_EXTRA: Record<string, LessonGrammarExtra> = {
  "a1-pron": {
    deepVi:
      "Tiếng Thụy Điển có 9 nguyên âm (a, e, i, o, u, y, å, ä, ö) và chiều dài nguyên âm quyết định nghĩa: 1 phụ âm sau nguyên âm → nguyên âm DÀI; 2 phụ âm (kể cả nhân đôi) → nguyên âm NGẮN. Ví dụ 'mat' (thức ăn) vs 'matt' (mờ). Nhấn trọng âm thường ở âm tiết đầu, ngoại trừ từ mượn.",
    deepEn:
      "Swedish has 9 vowels and vowel length carries meaning: 1 consonant after the vowel → LONG; 2 consonants (including doubled) → SHORT. Stress usually falls on the first syllable except loanwords.",
    examples: [
      { sv: "vit / vitt", vi: "trắng / thắt chặt (dài vs ngắn)", en: "white / tightly (long vs short)" },
      { sv: "hus / hund", vi: "ngôi nhà (u dài) / con chó (u ngắn)", en: "house (long u) / dog (short u)" },
    ],
    exercises: [
      E("Từ nào có nguyên âm DÀI: 'mat' hay 'matt'?", "Which has a LONG vowel: 'mat' or 'matt'?", "mat"),
      E("Điền: 'Solen är ___.' (nóng)", "Fill: 'The sun is ___.' (hot)", "het"),
      E("Đoán chiều dài: 'kall' - nguyên âm dài hay ngắn?", "Vowel length in 'kall'?", "kort", undefined, undefined, [
        "kort",
        "short",
        "ngắn",
      ]),
    ],
  },
  "a1-self": {
    deepVi:
      "Câu tự giới thiệu cơ bản dùng 4 động từ vàng: heta (tên), vara (là), komma (đến), bo (ở). Không chia theo ngôi, chỉ 1 dạng động từ cho tất cả jag/du/han/hon. Thứ tự V2: động từ luôn ở vị trí 2. 'Jag heter Anna.' 'I Stockholm bor jag.'",
    deepEn:
      "Self-intro uses 4 core verbs: heta, vara, komma, bo. Same verb form for all persons. V2 rule: verb always in position 2.",
    examples: [
      { sv: "Jag heter Nam och jag är från Vietnam.", vi: "Tôi tên Nam và tôi đến từ Việt Nam.", en: "I'm Nam and I'm from Vietnam." },
      { sv: "I Helsingfors bor jag sedan tre år.", vi: "Tôi sống ở Helsinki đã ba năm.", en: "I've lived in Helsinki for three years." },
    ],
    exercises: [
      E("Viết: 'Tôi tên Linh.'", "Write: 'My name is Linh.'", "Jag heter Linh."),
      E("Điền: 'Han ___ från Norge.' (đến từ)", "Fill: 'He ___ from Norway.'", "kommer"),
      E("Sắp xếp V2: jag / i Åbo / bor", "Reorder V2: jag / i Åbo / bor", "I Åbo bor jag."),
    ],
  },
  "a1-num": {
    deepVi:
      "Số 1-20 học thuộc. Số 21-99 = chục + đơn vị viết liền: tjugoett (21), trettiofem (35). Hàng trăm: etthundra (100). Số thứ tự: första (1st), andra (2nd), tredje (3rd), fjärde, femte. Nói tuổi: 'Jag är [số] år (gammal).'",
    deepEn:
      "Numbers 1-20 memorised. 21-99 = tens + ones joined (tjugoett). Ordinals: första, andra, tredje. Age: 'Jag är X år (gammal).'",
    examples: [
      { sv: "Jag är trettiofem år gammal.", vi: "Tôi 35 tuổi.", en: "I'm 35 years old." },
      { sv: "Det är min andra kopp kaffe.", vi: "Đây là tách cà phê thứ hai của tôi.", en: "This is my second cup of coffee." },
    ],
    exercises: [
      E("Viết bằng chữ: 42", "Write as word: 42", "fyrtiotvå"),
      E("Số thứ tự '3rd' = ?", "Ordinal '3rd' = ?", "tredje"),
      E("Viết: 'Tôi 28 tuổi.'", "Write: 'I am 28 years old.'", "Jag är 28 år gammal."),
    ],
  },
  "a1-alphabet": {
    deepVi:
      "Bảng chữ cái Thuỵ Điển 29 chữ = 26 chữ tiếng Anh + 3 chữ ở CUỐI: å, ä, ö. Đây là 3 chữ RIÊNG, không phải biến thể có dấu. Trong từ điển 'Åbo' xếp SAU 'Zorn'. Å đọc /oː/ (như 'oh'), Ä đọc /ɛː/ (như 'ai' trong 'air'), Ö đọc /øː/ (như 'eu' trong tiếng Pháp).",
    deepEn:
      "Swedish alphabet has 29 letters = English 26 + å, ä, ö at the END. They are separate letters, not diacritics. Å = 'oh', Ä = 'air', Ö = French 'eu'.",
    examples: [
      { sv: "å – år, båt, hål", vi: "å – năm, thuyền, cái lỗ", en: "å – year, boat, hole" },
      { sv: "ö – öl, sjö, öga", vi: "ö – bia, hồ, mắt", en: "ö – beer, lake, eye" },
    ],
    exercises: [
      E("Thứ tự bảng chữ cái Thụy Điển kết thúc bằng chữ nào?", "Which letter ends the Swedish alphabet?", "ö"),
      E("Chữ 'å' phát âm giống nguyên âm nào tiếng Anh?", "'å' sounds like which English vowel?", "oh"),
      E("Sắp xếp theo bảng chữ cái Thụy Điển: äpple / apple / öl", "Alphabetise: äpple / apple / öl", "apple, äpple, öl"),
    ],
  },
  "a1-greetings": {
    deepVi:
      "Chào theo thời gian: 'God morgon' (5-10h), 'God dag' (10-17h trang trọng), 'God kväll' (17-22h), 'God natt' (đi ngủ). Thân mật cả ngày: 'Hej!' 'Hejsan!' 'Tja!'. Tạm biệt: 'Hej då!' (bye), 'Vi ses!' (see you), 'Ha det bra!' (take care).",
    deepEn:
      "Time-based greetings: God morgon (5-10), God dag (10-17), God kväll (17-22), God natt (bedtime). Casual: Hej!. Goodbye: Hej då!, Vi ses!, Ha det bra!.",
    examples: [
      { sv: "God morgon! Hur har du sovit?", vi: "Chào buổi sáng! Bạn ngủ sao?", en: "Good morning! How did you sleep?" },
      { sv: "Ha det bra! Vi ses i morgon.", vi: "Bảo trọng nhé! Mai gặp lại.", en: "Take care! See you tomorrow." },
    ],
    exercises: [
      E("Chào trang trọng buổi tối = ?", "Formal evening greeting = ?", "God kväll"),
      E("Tạm biệt thân mật = ?", "Casual goodbye = ?", "Hej då"),
      E("Điền: '___ natt, sov gott.'", "Fill: '___ natt, sleep well.'", "God"),
    ],
  },
  "a1-pronouns": {
    deepVi:
      "Đại từ chủ ngữ: jag, du, han, hon, den (en-ord), det (ett-ord), vi, ni, de. Tân ngữ (object): mig, dig, honom, henne, den, det, oss, er, dem. Sở hữu: min/mitt/mina, din/ditt/dina, hans, hennes, dess, vår/vårt/våra, er/ert/era, deras. 'hen' = đại từ trung tính, dùng khi giới tính không xác định.",
    deepEn:
      "Subjects: jag/du/han/hon/den/det/vi/ni/de. Objects: mig/dig/honom/henne/oss/er/dem. Possessives agree with gender/number. 'hen' = gender-neutral.",
    examples: [
      { sv: "Hon ger mig sin bok.", vi: "Cô ấy đưa tôi cuốn sách của cô ấy.", en: "She gives me her book." },
      { sv: "Vi hjälper dem varje vecka.", vi: "Chúng tôi giúp họ mỗi tuần.", en: "We help them every week." },
    ],
    exercises: [
      E("Tân ngữ của 'han' = ?", "Object form of 'han' = ?", "honom"),
      E("Điền: 'Läraren hjälper ___.' (chúng tôi)", "Fill: 'The teacher helps ___.' (us)", "oss"),
      E("Điền sở hữu ett: '___ hus är stort.' (của tôi)", "Fill possessive ett: '___ house is big.' (my)", "Mitt"),
    ],
  },
  "a1-en-ett": {
    deepVi:
      "Danh từ có 2 giống: en-ord (~75%) và ett-ord (~25%). KHÔNG có quy tắc chắc chắn - học thuộc mạo từ cùng từ. Dạng xác định: gắn hậu tố. en bok → boken; ett hus → huset. Kết thúc nguyên âm chỉ thêm -n/-t: flicka → flickan, äpple → äpplet. Số nhiều 5 nhóm: -or, -ar, -er, -n, ∅.",
    deepEn:
      "Two genders: en (~75%) / ett (~25%). Definite = suffix -en/-et; vowel endings +n/+t. Plurals: 5 groups (-or, -ar, -er, -n, ∅).",
    examples: [
      { sv: "En bil är dyr. Bilen är röd.", vi: "Một chiếc xe thì đắt. Chiếc xe đó màu đỏ.", en: "A car is expensive. The car is red." },
      { sv: "Ett äpple är gott. Äpplet är rött.", vi: "Một quả táo thì ngon. Quả táo đó màu đỏ.", en: "An apple is tasty. The apple is red." },
    ],
    exercises: [
      E("Dạng xác định của 'en stol'?", "Definite of 'en stol'?", "stolen"),
      E("Dạng xác định của 'ett bord'?", "Definite of 'ett bord'?", "bordet"),
      E("Điền mạo từ: '___ hus.' (nhà)", "Fill article: '___ hus.'", "ett"),
      E("Điền mạo từ: '___ katt.' (mèo)", "Fill article: '___ katt.'", "en"),
    ],
  },
  "a1-questions": {
    deepVi:
      "Câu hỏi Yes/No = đảo động từ lên đầu: 'Bor du i Åbo?'. Câu hỏi Wh: từ hỏi + động từ + chủ ngữ. Từ hỏi: vad (gì), var (ở đâu), vart (đến đâu), när (khi nào), hur (thế nào), varför (tại sao), vem (ai), vilken/vilket/vilka (nào). Trả lời câu phủ định bằng 'jo': 'Bor du inte här?' → 'Jo, jag bor här.'",
    deepEn:
      "Yes/No: invert verb. Wh: word + verb + subject. Use 'jo' to answer 'yes' to a negative question.",
    examples: [
      { sv: "Varför pratar du så snabbt?", vi: "Tại sao bạn nói nhanh vậy?", en: "Why are you speaking so fast?" },
      { sv: "Vilken bok läser du?", vi: "Bạn đang đọc cuốn nào?", en: "Which book are you reading?" },
    ],
    exercises: [
      E("Đổi thành câu hỏi: 'Hon läser en bok.'", "Turn into question: 'Hon läser en bok.'", "Läser hon en bok?"),
      E("Điền từ hỏi: '___ heter du?' (tên gì)", "Fill: '___ is your name?'", "Vad"),
      E("Trả lời: 'Är du inte trött?' – có, mệt", "Answer: 'Aren't you tired?' – yes, I am", "Jo, jag är trött."),
    ],
  },
  "a1-colors-clothes": {
    deepVi:
      "Tính từ màu sắc khớp giống & số: en röd bil (đỏ, en-ord) / ett rött hus (đỏ, ett-ord) / röda skor (nhiều/định). Bất quy tắc: blå → blått → blå(a); grå → grått → grå(a); ny → nytt → nya. Trang phục dùng 'ha på sig' (mặc) hoặc 'sätta på sig' (mặc vào).",
    deepEn:
      "Colour adjectives agree with gender/number: röd/rött/röda. Irregular: blå/blått, grå/grått, ny/nytt. Wearing: 'ha på sig'.",
    examples: [
      { sv: "Hon har på sig en blå tröja idag.", vi: "Hôm nay cô ấy mặc một chiếc áo len xanh.", en: "She is wearing a blue jumper today." },
      { sv: "Ett rött äpple och två gröna päron.", vi: "Một quả táo đỏ và hai quả lê xanh.", en: "A red apple and two green pears." },
    ],
    exercises: [
      E("Chia: 'ett ___ hus' (röd)", "Inflect: 'ett ___ hus' (red)", "rött"),
      E("Chia: 'två ___ katter' (svart)", "Inflect: 'two ___ cats' (black)", "svarta"),
      E("Điền: 'Han har ___ ___ en grön jacka.' (đang mặc)", "Fill: 'He is wearing a green jacket.'", "på sig"),
    ],
  },
  "a1-body-health": {
    deepVi:
      "Nói đau: 'Jag har ont i [bộ phận cơ thể + dạng xác định]': 'Jag har ont i huvudet / magen / ryggen / halsen.' Hoặc dùng danh từ ghép: huvudvärk (đau đầu), tandvärk (đau răng), magvärk (đau bụng). Ở phòng khám: 'Jag är förkyld' (tôi bị cảm), 'Jag har feber' (tôi bị sốt).",
    deepEn:
      "Talking about pain: 'Jag har ont i [body part + definite]'. Compounds: huvudvärk, tandvärk, magvärk. At the clinic: 'Jag är förkyld', 'Jag har feber'.",
    examples: [
      { sv: "Jag har ont i halsen och feber.", vi: "Tôi đau họng và bị sốt.", en: "I have a sore throat and a fever." },
      { sv: "Han går till läkaren för att han är sjuk.", vi: "Anh ấy đi bác sĩ vì bị ốm.", en: "He is going to the doctor because he is sick." },
    ],
    exercises: [
      E("Điền: 'Jag har ont i ___.' (đầu, dạng xác định)", "Fill: 'I have a pain in my ___.' (head, definite)", "huvudet"),
      E("Đau răng = ?", "Toothache = ?", "tandvärk"),
      E("Điền: 'Jag har ___.' (sốt)", "Fill: 'I have a ___.' (fever)", "feber"),
    ],
  },
  "a1-daily-routine": {
    deepVi:
      "Kể một ngày dùng thời gian + V2. Trình tự: 'Klockan sju vaknar jag. Sedan äter jag frukost. Klockan åtta åker jag till jobbet…' Trạng từ thời gian phổ biến: sedan (sau đó), efter det (sau đó), på morgonen/eftermiddagen/kvällen. Nhớ đảo ngữ khi mở đầu bằng trạng từ.",
    deepEn:
      "Describe a day using time + V2: 'Klockan sju vaknar jag.' Time adverbs: sedan, efter det, på morgonen/kvällen. Always invert after a fronted adverb.",
    examples: [
      { sv: "På morgonen dricker jag kaffe och läser tidningen.", vi: "Buổi sáng tôi uống cà phê và đọc báo.", en: "In the morning I drink coffee and read the newspaper." },
      { sv: "Klockan sex slutar jag jobbet.", vi: "6 giờ tôi tan làm.", en: "At six I finish work." },
    ],
    exercises: [
      E("Sắp xếp: klockan sex / äter / middag / jag", "Reorder: klockan sex / äter / middag / jag", "Klockan sex äter jag middag."),
      E("Điền động từ: 'På morgonen ___ jag frukost.' (ăn)", "Fill verb: 'On morning I ___ breakfast.'", "äter"),
      E("Sửa V2: 'Ikväll jag tittar på tv.'", "Fix V2: 'Ikväll jag tittar på tv.'", "Ikväll tittar jag på tv."),
    ],
  },
  "a1-hobbies": {
    deepVi:
      "Nói sở thích: 'Jag tycker om att + infinitive' (tôi thích làm gì) hoặc 'Jag gillar + noun/gerund'. Ví dụ: 'Jag tycker om att läsa böcker.' 'Jag gillar musik.' 'Vad gör du på fritiden?' = Bạn làm gì lúc rảnh? Tần suất: alltid > ofta > ibland > sällan > aldrig.",
    deepEn:
      "Hobbies: 'Jag tycker om att + infinitive' or 'Jag gillar + noun'. Ask: 'Vad gör du på fritiden?'. Frequency: alltid > ofta > ibland > sällan > aldrig.",
    examples: [
      { sv: "Jag tycker om att spela gitarr på kvällen.", vi: "Tôi thích chơi guitar vào buổi tối.", en: "I like playing guitar in the evening." },
      { sv: "På fritiden går vi ofta i skogen.", vi: "Lúc rảnh chúng tôi hay đi rừng.", en: "In our free time we often walk in the forest." },
    ],
    exercises: [
      E("Điền: 'Jag ___ om att simma.' (thích)", "Fill: 'I like to swim.'", "tycker"),
      E("Điền tần suất: 'Han läser ___ på kvällen.' (thường xuyên)", "Fill frequency: 'He often reads.'", "ofta"),
      E("Viết: 'Tôi không bao giờ chơi bóng đá.'", "Write: 'I never play football.'", "Jag spelar aldrig fotboll."),
    ],
  },
  "a1-doctor": {
    deepVi:
      "Đặt lịch: 'Jag vill boka en tid hos läkaren.' Nói triệu chứng: 'Jag har feber/hosta/snuva/ont i halsen.' Nghe hỏi thời gian: 'Sedan när?' (Từ khi nào?) → trả lời 'Sedan i går' (Từ hôm qua). Nhận đơn: 'Ta en tablett tre gånger om dagen med mat.'",
    deepEn:
      "Booking: 'Jag vill boka en tid hos läkaren.' Symptoms: 'Jag har feber/hosta/snuva.' 'Sedan när?' = Since when? Prescription instructions: 'Ta en tablett tre gånger om dagen med mat.'",
    examples: [
      { sv: "Jag vill boka en tid hos allmänläkaren.", vi: "Tôi muốn đặt lịch với bác sĩ đa khoa.", en: "I'd like to book an appointment with the GP." },
      { sv: "Ta medicinen två gånger om dagen.", vi: "Uống thuốc hai lần mỗi ngày.", en: "Take the medicine twice a day." },
    ],
    exercises: [
      E("Viết: 'Tôi bị sốt và ho.'", "Write: 'I have a fever and cough.'", "Jag har feber och hosta."),
      E("Điền: 'Jag vill ___ en tid.' (đặt)", "Fill: 'I want to ___ a time.' (book)", "boka"),
      E("Điền: 'Ta tabletten ___ gånger om dagen.' (2)", "Fill: 'Take the tablet ___ times a day.' (2)", "två"),
    ],
  },
  "a1-shopping": {
    deepVi:
      "Ở cửa hàng: 'Kan jag hjälpa dig?' (Tôi giúp gì được?) → 'Jag letar efter…' (Tôi tìm…) hoặc 'Jag skulle vilja ha…' (Tôi muốn có…). Giá: 'Vad kostar det?' → 'Det kostar 199 kronor.'. Thanh toán: 'Kan jag betala med kort?'. Túi: 'Vill du ha en påse?' → 'Ja tack / Nej tack.'",
    deepEn:
      "Shop dialogue: 'Kan jag hjälpa dig?' → 'Jag letar efter…' or 'Jag skulle vilja ha…'. Prices: 'Vad kostar det?' → '… kronor.' Card: 'Kan jag betala med kort?'.",
    examples: [
      { sv: "Jag skulle vilja ha två kilo äpplen, tack.", vi: "Cho tôi hai ký táo, cảm ơn.", en: "I'd like two kilos of apples, please." },
      { sv: "Kan jag betala med kort? – Ja, det går bra.", vi: "Tôi trả bằng thẻ được không? – Được ạ.", en: "Can I pay by card? – Yes, that's fine." },
    ],
    exercises: [
      E("Hỏi giá: 'Cái này bao nhiêu tiền?'", "Ask price: 'How much is this?'", "Vad kostar det?"),
      E("Điền: 'Jag ___ efter en tröja.' (tìm)", "Fill: 'I'm looking for a jumper.'", "letar"),
      E("Trả lời có, cảm ơn:", "Answer 'yes, thank you':", "Ja tack"),
    ],
  },
};

/**
 * @file swedishA1GrammarExpansion.ts
 * @description Nội dung mở rộng ngữ pháp + bài tập ngắn (3-4 câu) cho từng
 *              ngày trong lộ trình A1 Thuỵ Điển. Hiển thị ngay dưới phần
 *              "Grammar focus" trong `SwedishA1DailyPlan` để học viên có thể
 *              vừa học lý thuyết vừa luyện tập cố định kiến thức.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface GrammarExercise {
  /** Câu hỏi (điền vào ô trống ___ hoặc chọn đáp án) */
  qVi: string;
  qEn: string;
  /** Đáp án chuẩn */
  answer: string;
  /** Gợi ý ngắn (không bắt buộc) */
  hintVi?: string;
  hintEn?: string;
}

export interface GrammarExpansion {
  /** Phần giải thích sâu hơn về điểm ngữ pháp trọng tâm của ngày */
  deepVi: string;
  deepEn: string;
  /** Ví dụ mẫu bổ sung (sv → vi) */
  examples: { sv: string; vi: string; en: string }[];
  /** 3-4 bài tập nhanh để củng cố */
  exercises: GrammarExercise[];
}

const E = (qVi: string, qEn: string, answer: string, hintVi?: string, hintEn?: string): GrammarExercise =>
  ({ qVi, qEn, answer, hintVi, hintEn });

export const SWEDISH_A1_GRAMMAR_EXPANSION: Record<number, GrammarExpansion> = {
  1: {
    deepVi: "Nguyên âm dài/ngắn quyết định nghĩa: 'mat' (thức ăn) vs 'matt' (mờ nhạt); 'vit' (trắng) vs 'vitt' (thắt). Quy tắc vàng: nhìn số phụ âm ngay SAU nguyên âm. 1 phụ âm → nguyên âm DÀI + hơi kéo (~2× thời gian). ≥2 phụ âm (kể cả phụ âm đôi) → nguyên âm NGẮN + gọn. Đây là ranh giới quan trọng nhất, sai là mất nghĩa.",
    deepEn: "Vowel length in Swedish carries meaning: 'mat' (food) vs 'matt' (dull); 'vit' (white) vs 'vitt' (tightly). Rule: look at how many consonants follow the vowel. 1 → LONG vowel (~2× duration). 2+ (including doubled) → SHORT.",
    examples: [
      { sv: "hat / hatt", vi: "sự căm ghét / cái mũ (a dài vs a ngắn)", en: "hate / hat (long a vs short a)" },
      { sv: "väg / vägg", vi: "con đường / bức tường (ä dài vs ngắn)", en: "road / wall (long ä vs short ä)" },
    ],
    exercises: [
      E("Điền: 'Jag äter ___ till lunch.' (thức ăn)", "Fill in: 'Jag äter ___ till lunch.' (food)", "mat", "1 phụ âm sau nguyên âm", "1 consonant after the vowel"),
      E("Từ nào có nguyên âm NGẮN: 'vit' hay 'vitt'?", "Which has a SHORT vowel: 'vit' or 'vitt'?", "vitt"),
      E("Điền: 'Solen är ___.' (nóng)", "Fill in: 'Solen är ___.' (hot)", "het", "hot = het (dài)", "hot = het (long)"),
    ],
  },
  2: {
    deepVi: "Đại từ nhân xưng KHÔNG đổi theo ngôi khi chia động từ: 'jag/du/han/hon/vi/ni/de HETER Anna'. Chỉ 1 dạng động từ cho mọi ngôi (khác tiếng Pháp/Đức). Dạng khách quan (tân ngữ): mig / dig / honom / henne / oss / er / dem. Ví dụ: 'Han ser mig.' (Anh ấy nhìn tôi).",
    deepEn: "Pronouns don't change the verb form: 'jag/du/han/hon/vi/ni/de HETER Anna'. One verb form for all persons. Object forms: mig / dig / honom / henne / oss / er / dem. 'Han ser mig.' = He sees me.",
    examples: [
      { sv: "Hon ringer honom varje kväll.", vi: "Cô ấy gọi cho anh ấy mỗi tối.", en: "She calls him every evening." },
      { sv: "Vi hjälper dem med läxor.", vi: "Chúng tôi giúp họ làm bài tập.", en: "We help them with homework." },
    ],
    exercises: [
      E("Điền chủ ngữ: '___ heter Erik.' (anh ấy)", "Fill subject: '___ heter Erik.' (he)", "Han"),
      E("Điền tân ngữ: 'Jag ser ___.' (cô ấy)", "Fill object: 'Jag ser ___.' (her)", "henne"),
      E("Điền tân ngữ: 'Läraren hjälper ___.' (chúng tôi)", "Fill object: 'Läraren hjälper ___.' (us)", "oss"),
    ],
  },
  3: {
    deepVi: "Số 0-20 học thuộc lòng. Số ghép 21-99 = chục + đơn vị: 21 = tjugoett, 35 = trettiofem, 99 = nittionio. Hàng trăm: etthundra (100), tvåhundra (200). Số thứ tự: första (1st), andra (2nd), tredje (3rd), fjärde (4th), femte (5th)... thêm '-e' hoặc '-de' tuỳ số.",
    deepEn: "Numbers 0-20 memorised. Compound 21-99 = tens + ones (tjugoett=21, trettiofem=35). Hundreds: etthundra (100). Ordinals: första (1st), andra (2nd), tredje (3rd), fjärde (4th)...",
    examples: [
      { sv: "Jag är trettiofem år gammal.", vi: "Tôi 35 tuổi.", en: "I am thirty-five years old." },
      { sv: "Det är min andra kopp kaffe.", vi: "Đây là tách cà phê thứ hai của tôi.", en: "This is my second cup of coffee." },
    ],
    exercises: [
      E("Viết bằng chữ: 47", "Write as word: 47", "fyrtiosju"),
      E("Số thứ tự '3rd' = ?", "Ordinal '3rd' = ?", "tredje"),
      E("Điền: 'Han bor på våning ___.' (5)", "Fill in: 'He lives on floor ___.' (5)", "fem"),
    ],
  },
  4: {
    deepVi: "Câu hỏi Yes/No = đảo động từ lên đầu: 'Du bor i Malmö.' → 'Bor du i Malmö?'. Câu hỏi Wh-: từ hỏi + động từ + chủ ngữ: 'Vad heter du?' 'Var bor du?' 'När kommer bussen?'. Trả lời phủ định 'nej' cho câu khẳng, 'jo' cho câu phủ định: 'Bor du inte här?' → 'Jo, jag bor här.'",
    deepEn: "Yes/No questions invert verb: 'Bor du i Malmö?'. Wh-questions: question word + verb + subject. Use 'jo' to say 'yes' to a negative question.",
    examples: [
      { sv: "Talar du svenska?", vi: "Bạn nói tiếng Thụy Điển không?", en: "Do you speak Swedish?" },
      { sv: "Vad gör du nu?", vi: "Bây giờ bạn đang làm gì?", en: "What are you doing now?" },
    ],
    exercises: [
      E("Đổi thành câu hỏi: 'Hon läser en bok.'", "Turn into question: 'Hon läser en bok.'", "Läser hon en bok?"),
      E("Điền từ hỏi: '___ bor du?' (ở đâu)", "Fill: '___ bor du?' (where)", "Var"),
      E("Trả lời: 'Är du inte trött?' – Có, tôi mệt.", "Answer: 'Är du inte trött?' – Yes, I am tired.", "Jo, jag är trött."),
    ],
  },
  5: {
    deepVi: "Nói quốc tịch/ngôn ngữ: quốc gia thường viết hoa (Sverige, Vietnam), tính từ quốc tịch viết thường (svensk, vietnamesisk). Ngôn ngữ = tính từ + '-a': svensk → svenska, vietnamesisk → vietnamesiska. 'Jag är svensk / Jag pratar svenska.' Nhóm dân: en svensk (một người TĐ), svenskar (những người TĐ).",
    deepEn: "Nationality: countries capitalised, adjectives lowercase. Language = adjective + '-a' (svenska, vietnamesiska). 'Jag är svensk / Jag pratar svenska.'",
    examples: [
      { sv: "Hon är vietnamesisk och pratar vietnamesiska.", vi: "Cô ấy là người Việt và nói tiếng Việt.", en: "She is Vietnamese and speaks Vietnamese." },
    ],
    exercises: [
      E("Điền ngôn ngữ: 'Jag lär mig ___.' (tiếng Thụy Điển)", "Fill language: 'Jag lär mig ___.'", "svenska"),
      E("Tính từ quốc tịch 'người Nhật' = ?", "Adjective 'Japanese' = ?", "japansk"),
      E("Điền: 'Han kommer ___ Norge.' (từ)", "Fill: 'Han kommer ___ Norge.' (from)", "från"),
    ],
  },
  6: {
    deepVi: "Danh từ Thuỵ Điển có 2 giống: en-ord (~75%) và ett-ord (~25%). Không quy tắc tuyệt đối - PHẢI học thuộc mạo từ cùng danh từ. Dạng xác định (definite) = ghép hậu tố: en bok → boken (cuốn sách đó); ett hus → huset (ngôi nhà đó). Nếu danh từ kết thúc bằng nguyên âm, chỉ thêm -n/-t: en flicka → flickan, ett äpple → äpplet.",
    deepEn: "Nouns have 2 genders: en (~75%) and ett (~25%). Definite form suffixes: en bok → boken; ett hus → huset. Vowel endings just add -n/-t: flicka → flickan.",
    examples: [
      { sv: "En bil är dyr. Bilen är röd.", vi: "Một chiếc xe thì đắt. Chiếc xe đó màu đỏ.", en: "A car is expensive. The car is red." },
    ],
    exercises: [
      E("Dạng xác định của 'en stol'?", "Definite form of 'en stol'?", "stolen"),
      E("Dạng xác định của 'ett bord'?", "Definite form of 'ett bord'?", "bordet"),
      E("Điền: '___ hund är söt.' (mạo từ 'en/ett')", "Fill article: '___ hund är söt.'", "En"),
    ],
  },
  7: {
    deepVi: "Ôn tập tuần 1: 4 câu tự giới thiệu chuẩn: (1) Hej, jag heter [tên]. (2) Jag är [tuổi] år gammal. (3) Jag kommer från [nước]. (4) Jag pratar [ngôn ngữ]. Thêm câu 5-6 để nâng cấp: 'Jag bor i [thành phố].' 'Jag jobbar som [nghề].'",
    deepEn: "Week 1 review: 4-sentence self-intro. Upgrade with 'Jag bor i…' and 'Jag jobbar som…'.",
    examples: [
      { sv: "Hej, jag heter Linh. Jag är 25 år. Jag kommer från Vietnam och pratar vietnamesiska och engelska.", vi: "Chào, tôi tên Linh. Tôi 25 tuổi. Tôi đến từ Việt Nam và nói tiếng Việt và tiếng Anh.", en: "Hi, I'm Linh. I'm 25. I'm from Vietnam and speak Vietnamese and English." },
    ],
    exercises: [
      E("Viết câu 'Tôi 30 tuổi' bằng tiếng Thụy Điển.", "Write 'I am 30 years old' in Swedish.", "Jag är 30 år gammal."),
      E("Viết câu 'Tôi sống ở Hà Nội.'", "Write 'I live in Hanoi.'", "Jag bor i Hanoi."),
      E("Viết câu 'Tôi làm giáo viên.'", "Write 'I work as a teacher.'", "Jag jobbar som lärare."),
    ],
  },
  8: {
    deepVi: "Chia hiện tại: nhóm 1 (-ar): tala → talar, jobba → jobbar. Nhóm 2 (-er): läsa → läser, ringa → ringer. Nhóm 3 (-r): bo → bor, tro → tror, må → mår. Nhóm 4 (bất quy tắc): vara → är, ha → har, göra → gör. KHÔNG chia theo ngôi.",
    deepEn: "Present tense groups: -ar (talar), -er (läser), -r (bor), irregular (är/har/gör). Same form for all persons.",
    examples: [
      { sv: "Jag arbetar och du studerar.", vi: "Tôi làm việc và bạn học.", en: "I work and you study." },
    ],
    exercises: [
      E("Chia hiện tại: 'läsa' → ?", "Present of 'läsa'?", "läser"),
      E("Chia hiện tại: 'bo' → ?", "Present of 'bo'?", "bor"),
      E("Chia hiện tại: 'ha' → ?", "Present of 'ha'?", "har"),
    ],
  },
  9: {
    deepVi: "Quy tắc V2 (Verb-second): trong câu khẳng định, ĐỘNG TỪ chia luôn ở vị trí thứ 2. Vị trí 1 có thể là chủ ngữ HOẶC trạng từ/tân ngữ. Nếu vị trí 1 KHÔNG phải chủ ngữ → chủ ngữ chuyển ra sau động từ (đảo ngữ). 'Igår läste jag en bok.' (Hôm qua tôi đọc sách).",
    deepEn: "V2 rule: main verb in position 2. If position 1 is not the subject, the subject moves after the verb.",
    examples: [
      { sv: "På måndag börjar jag jobbet.", vi: "Thứ hai tôi bắt đầu công việc.", en: "On Monday I start work." },
    ],
    exercises: [
      E("Sắp xếp lại: jag / kaffe / på morgonen / dricker", "Reorder: jag / kaffe / på morgonen / dricker", "På morgonen dricker jag kaffe."),
      E("Sắp xếp: bio / vi / ikväll / går / på", "Reorder: bio / vi / ikväll / går / på", "Ikväll går vi på bio."),
      E("Đúng/Sai V2: 'Idag jag är trött.'", "True/False V2: 'Idag jag är trött.'", "Sai (Fel) – 'Idag är jag trött.'"),
    ],
  },
  10: {
    deepVi: "Hỏi giờ: 'Vad är klockan?' / 'Hur mycket är klockan?'. Trả lời: 'Klockan är [giờ].' Giờ tròn: 'Klockan är tre.' Giờ 30: 'halv [giờ tiếp theo]' – 'halv fyra' = 3:30 (chú ý: nửa TỚI 4, không phải nửa QUA 3!). 15: 'kvart över tre' (3:15). 45: 'kvart i fyra' (3:45).",
    deepEn: "Telling time: 'Klockan är tre.' halv fyra = 3:30 (half TO 4, not past 3!). kvart över = quarter past; kvart i = quarter to.",
    examples: [
      { sv: "Klockan är halv sju.", vi: "Bây giờ là 6:30.", en: "It is half past six (6:30)." },
    ],
    exercises: [
      E("Đọc: 4:30", "Say: 4:30", "halv fem"),
      E("Đọc: 8:15", "Say: 8:15", "kvart över åtta"),
      E("Đọc: 9:45", "Say: 9:45", "kvart i tio"),
    ],
  },
  11: {
    deepVi: "Phủ định 'inte' đứng SAU động từ chia trong mệnh đề chính: 'Jag pratar inte svenska.' 'Han kommer inte idag.' Nhưng trong mệnh đề PHỤ (bắt đầu bằng att, om, när, eftersom...) → 'inte' đứng TRƯỚC động từ: 'Jag vet att han inte kommer.'",
    deepEn: "Negation 'inte' after finite verb in main clauses, BEFORE the verb in subordinate clauses: 'Jag vet att han inte kommer.'",
    examples: [
      { sv: "Hon dricker inte kaffe.", vi: "Cô ấy không uống cà phê.", en: "She doesn't drink coffee." },
    ],
    exercises: [
      E("Phủ định: 'Jag förstår.'", "Negate: 'Jag förstår.'", "Jag förstår inte."),
      E("Điền vị trí 'inte': 'Han säger att han ___ kommer.'", "Place 'inte': 'Han säger att han ___ kommer.'", "inte"),
      E("Phủ định: 'Vi äter kött.'", "Negate: 'Vi äter kött.'", "Vi äter inte kött."),
    ],
  },
  12: {
    deepVi: "Chỉ định gần/xa: 'den här / det här / de här' (this / these) - dùng nhiều trong giao tiếp. 'den där / det där / de där' (that / those). Dạng trang trọng: 'denna / detta / dessa'. Khớp giống & số: en bok → den här boken; ett hus → det här huset; böcker → de här böckerna.",
    deepEn: "Demonstratives: den här/det här/de här (this/these), den där/det där/de där (that/those). Formal: denna/detta/dessa. Note the noun stays DEFINITE.",
    examples: [
      { sv: "Den här bilen är min.", vi: "Chiếc xe này là của tôi.", en: "This car is mine." },
    ],
    exercises: [
      E("Điền: '___ hus är stort.' (ngôi nhà này)", "Fill: '___ hus är stort.' (this house)", "Det här"),
      E("Điền: '___ böckerna är dyra.' (những cuốn kia)", "Fill: '___ böckerna are expensive.'", "De där"),
      E("Trang trọng của 'det här hus'?", "Formal of 'det här hus'?", "detta hus"),
    ],
  },
  13: {
    deepVi: "Sở hữu -s: gắn -s cuối danh từ (KHÔNG có dấu '): Annas bok, Eriks bil. Đại từ sở hữu khớp giống/số: min/mitt/mina (của tôi), din/ditt/dina (của bạn), hans (của anh ấy - không đổi), hennes (của cô ấy - không đổi), vår/vårt/våra (của chúng tôi), er/ert/era (của các bạn), deras (của họ).",
    deepEn: "Possessive -s (no apostrophe): Annas bok. Possessive pronouns agree in gender/number: min/mitt/mina, din/ditt/dina; hans/hennes/deras unchanged.",
    examples: [
      { sv: "Det är mitt hus och mina bilar.", vi: "Đây là nhà của tôi và những chiếc xe của tôi.", en: "That is my house and my cars." },
    ],
    exercises: [
      E("Điền: '___ hus.' (của tôi, ett-ord)", "Fill: '___ hus.' (my, ett)", "mitt"),
      E("Điền: '___ böcker.' (của bạn, số nhiều)", "Fill: '___ böcker.' (your, plural)", "dina"),
      E("Viết: 'sách của Erik'", "Write: 'Erik's book'", "Eriks bok"),
    ],
  },
  14: {
    deepVi: "Ôn tuần 2: Kể về một ngày điển hình dùng 8+ động từ + V2 + đồng hồ. Cấu trúc: [Thời gian] + [động từ] + [chủ ngữ] + [phần còn lại]. Ví dụ mẫu: 'Klockan sju vaknar jag. Sedan dricker jag kaffe. Klockan åtta åker jag till jobbet…'",
    deepEn: "Week 2 review: describe a typical day using V2 + clock + 8 verbs.",
    examples: [
      { sv: "På eftermiddagen tränar jag på gymmet.", vi: "Buổi chiều tôi tập ở phòng gym.", en: "In the afternoon I train at the gym." },
    ],
    exercises: [
      E("Sắp xếp: klockan sex / äter / middag / jag", "Reorder: klockan sex / äter / middag / jag", "Klockan sex äter jag middag."),
      E("Viết câu: '7 giờ tối tôi xem tivi.'", "Write: 'At 7pm I watch TV.'", "Klockan sju på kvällen tittar jag på tv."),
      E("Điền động từ: 'På morgonen ___ jag frukost.' (ăn)", "Fill verb: 'På morgonen ___ jag frukost.' (eat)", "äter"),
    ],
  },
  15: {
    deepVi: "Tính từ khớp giống & số: dạng cơ bản dùng cho en-ord (en snäll pojke). Thêm -t cho ett-ord (ett snällt barn). Thêm -a cho số nhiều & dạng xác định (snälla pojkar; den snälla pojken). Bất quy tắc: liten → litet → små/lilla; gammal → gammalt → gamla.",
    deepEn: "Adjective agreement: base (en snäll), +t (ett snällt), +a (plural/definite). Irregulars: liten/litet/små, gammal/gammalt/gamla.",
    examples: [
      { sv: "En stor bil, ett stort hus, stora bilar.", vi: "Một xe lớn, một nhà lớn, những xe lớn.", en: "A big car, a big house, big cars." },
    ],
    exercises: [
      E("Chia: 'ett ___ hus' (rød=röd)", "Inflect: 'ett ___ hus' (red)", "rött"),
      E("Chia: 'två ___ katter' (svart)", "Inflect: 'två ___ katter' (black)", "svarta"),
      E("Chia bất quy tắc: 'ett ___ barn' (liten)", "Irreg: 'ett ___ barn' (little)", "litet"),
    ],
  },
  16: {
    deepVi: "Thì quá khứ (preteritum): nhóm 1 → -ade (talade); nhóm 2a → -de (ringde); nhóm 2b → -te (köpte); nhóm 3 → -dde (bodde); nhóm 4 bất quy tắc (var, hade, gjorde, gick, kom, såg, tog…). Học thuộc 30 động từ bất quy tắc.",
    deepEn: "Past tense (preteritum): -ade / -de / -te / -dde + irregulars (var, hade, gjorde, gick…).",
    examples: [
      { sv: "Igår gick jag på bio och åt popcorn.", vi: "Hôm qua tôi đi xem phim và ăn bỏng ngô.", en: "Yesterday I went to the cinema and ate popcorn." },
    ],
    exercises: [
      E("Quá khứ của 'tala'?", "Past of 'tala'?", "talade"),
      E("Quá khứ của 'köpa'?", "Past of 'köpa'?", "köpte"),
      E("Quá khứ của 'gå'?", "Past of 'gå'?", "gick"),
    ],
  },
  17: {
    deepVi: "Hiện tại hoàn thành (perfekt): 'har' + supinum. Supinum khác preteritum: nhóm 1 → -at (talat), nhóm 2 → -t (ringt/köpt), nhóm 3 → -tt (bott), nhóm 4 bất quy tắc (varit, haft, gjort, gått, kommit). Dùng khi hành động vẫn ảnh hưởng hiện tại: 'Jag har bott här i 5 år.'",
    deepEn: "Perfect tense: 'har' + supine (-at/-t/-tt/irreg). Used when the action still affects the present.",
    examples: [
      { sv: "Har du ätit lunch?", vi: "Bạn đã ăn trưa chưa?", en: "Have you eaten lunch?" },
    ],
    exercises: [
      E("Supinum của 'köpa'?", "Supine of 'köpa'?", "köpt"),
      E("Điền: 'Jag har ___ i Sverige i 3 år.' (bo)", "Fill: 'Jag har ___ i Sverige i 3 år.' (live)", "bott"),
      E("Điền: 'Vi har ___ många länder.' (besöka)", "Fill: 'Vi har ___ many countries.' (visit)", "besökt"),
    ],
  },
  18: {
    deepVi: "Động từ khiếm khuyết + INFINITIVE (không 'att'): kan, ska, vill, får, måste, bör. 'Jag kan simma.' 'Han vill äta pizza.' 'Vi måste gå nu.' KHÔNG dùng 'att' sau các động từ này.",
    deepEn: "Modal verbs + bare infinitive (no 'att'): kan (can), ska (will), vill (want), får (may), måste (must), bör (should).",
    examples: [
      { sv: "Du får inte röka här.", vi: "Bạn không được hút thuốc ở đây.", en: "You may not smoke here." },
    ],
    exercises: [
      E("Điền: 'Jag ___ prata svenska lite.' (có thể)", "Fill: 'Jag ___ speak Swedish a little.'", "kan"),
      E("Điền: 'Vi ___ åka imorgon.' (sẽ)", "Fill: 'Vi ___ leave tomorrow.'", "ska"),
      E("Điền: 'Barnen ___ sova nu.' (phải)", "Fill: 'Barnen ___ sleep now.'", "måste"),
    ],
  },
  19: {
    deepVi: "Giới từ nơi chốn: i (trong: 'i Sverige'), på (trên/tại: 'på gatan', 'på jobbet'), till (đến: 'till skolan'), från (từ: 'från Vietnam'), hos (ở nhà ai: 'hos mormor'), vid (bên cạnh: 'vid sjön'). Lưu ý: 'i' cho đất nước/thành phố, 'på' cho địa điểm chức năng như restaurang, kontor, universitet.",
    deepEn: "Location prepositions: i (in country/city), på (on/at functional places), till (to), från (from), hos (at someone's home), vid (by/beside).",
    examples: [
      { sv: "Jag jobbar på kontoret i Stockholm.", vi: "Tôi làm việc tại văn phòng ở Stockholm.", en: "I work at the office in Stockholm." },
    ],
    exercises: [
      E("Điền: 'Han bor ___ Norge.'", "Fill: 'Han bor ___ Norge.' (in)", "i"),
      E("Điền: 'Vi äter ___ restaurang.'", "Fill: 'Vi äter ___ restaurang.' (at)", "på"),
      E("Điền: 'Barnet är ___ mormor.'", "Fill: 'Barnet är ___ mormor.' (at grandma's)", "hos"),
    ],
  },
  20: {
    deepVi: "So sánh tính từ: -are (hơn) và -ast (nhất): stor → större → störst; snäll → snällare → snällast. Bất quy tắc: bra → bättre → bäst; dålig → sämre → sämst; gammal → äldre → äldst; ung → yngre → yngst. Cấu trúc: 'X är [comparative] än Y' – 'Anna är äldre än Erik.'",
    deepEn: "Comparatives -are/-ast: stor → större → störst. Irregular: bra/bättre/bäst, dålig/sämre/sämst.",
    examples: [
      { sv: "Min bror är längre än jag.", vi: "Anh trai tôi cao hơn tôi.", en: "My brother is taller than me." },
    ],
    exercises: [
      E("So sánh hơn của 'bra'?", "Comparative of 'bra'?", "bättre"),
      E("So sánh nhất của 'stor'?", "Superlative of 'stor'?", "störst"),
      E("Điền: 'Sommaren är ___ än vintern.' (varm)", "Fill: 'Sommaren är ___ än vintern.' (warm)", "varmare"),
    ],
  },
  21: {
    deepVi: "Ôn tuần 3: Kể về hôm qua/tuần trước dùng thì quá khứ + preteritum + perfekt. Mẫu: 'Igår gick jag på jobbet. På kvällen träffade jag vänner. Vi har inte ätit på den restaurangen förut.'",
    deepEn: "Week 3 review: recount yesterday/last week using preteritum + perfekt.",
    examples: [
      { sv: "I helgen åkte vi till Göteborg och åt goda räkor.", vi: "Cuối tuần chúng tôi đi Göteborg và ăn tôm ngon.", en: "This weekend we went to Gothenburg and ate delicious shrimp." },
    ],
    exercises: [
      E("Chuyển sang quá khứ: 'Jag går på bio.'", "Past: 'Jag går på bio.'", "Jag gick på bio."),
      E("Chuyển perfekt: 'Vi ser filmen.'", "Perfect: 'Vi ser filmen.'", "Vi har sett filmen."),
      E("Điền: 'Förra veckan ___ jag till Malmö.' (åka)", "Fill: 'Last week I ___ to Malmö.' (go)", "åkte"),
    ],
  },
  22: {
    deepVi: "Câu điều kiện loại 1 (thực tế): 'om' + hiện tại, [så] + hiện tại/tương lai. 'Om det regnar, stannar vi hemma.' Loại 2 (giả định hiện tại): 'om' + preteritum, [så] + skulle + infinitive. 'Om jag hade tid, skulle jag resa.' Chú ý: sau 'om' → thứ tự SVO (không đảo).",
    deepEn: "Conditional 1: om + present, present. Conditional 2: om + past, skulle + infinitive.",
    examples: [
      { sv: "Om du vill, kan vi gå ut.", vi: "Nếu bạn muốn, chúng ta có thể ra ngoài.", en: "If you want, we can go out." },
    ],
    exercises: [
      E("Điền: 'Om det ___ (snöa), stannar vi inne.'", "Fill: 'If it ___ (snow), we stay inside.'", "snöar"),
      E("Điền: 'Om jag ___ (vara) rik, skulle jag köpa hus.'", "Fill: 'If I ___ (be) rich, I'd buy a house.'", "var"),
      E("Đúng/Sai: 'Om jag har tid, jag hjälper dig.'", "True/False: 'Om jag har tid, jag hjälper dig.'", "Sai – 'Om jag har tid, hjälper jag dig.' (V2)"),
    ],
  },
  23: {
    deepVi: "Mệnh đề phụ (bisatser) bắt đầu bằng: att, om, när, eftersom, medan, som, innan, efter att. QUY TẮC: trong mệnh đề phụ, 'inte' và trạng từ đứng TRƯỚC động từ (BIFF: Bisats-Inte-Före-Finita). 'Jag vet att han inte kommer.' 'Hon säger att hon alltid arbetar hemma.'",
    deepEn: "Subordinate clauses: 'inte' and adverbs come BEFORE the finite verb (BIFF rule).",
    examples: [
      { sv: "Jag hoppas att du snart mår bättre.", vi: "Tôi hy vọng bạn sớm khoẻ lại.", en: "I hope that you feel better soon." },
    ],
    exercises: [
      E("Điền: 'Jag vet att hon ___ kommer.' (inte)", "Fill: 'Jag vet att hon ___ kommer.'", "inte"),
      E("Sắp xếp: att / alltid / han / jobbar / sent", "Reorder: att / alltid / han / jobbar / sent", "att han alltid jobbar sent"),
      E("Đúng/Sai: 'Han säger att hon kommer inte.'", "True/False: 'Han säger att hon kommer inte.'", "Sai – 'att hon inte kommer.'"),
    ],
  },
  24: {
    deepVi: "Đại từ quan hệ 'som' = who/which/that. Dùng cho cả người và vật. 'Mannen som bor bredvid är lärare.' 'Boken som jag läser är intressant.' KHÔNG bỏ 'som' khi nó là chủ ngữ. Có thể bỏ khi 'som' là tân ngữ trong văn nói.",
    deepEn: "Relative 'som' = who/which/that. Cannot omit when subject; can omit when object in speech.",
    examples: [
      { sv: "Kvinnan som talar är min chef.", vi: "Người phụ nữ đang nói là sếp của tôi.", en: "The woman who is speaking is my boss." },
    ],
    exercises: [
      E("Nối 2 câu: 'Jag har en vän. Han bor i Malmö.'", "Join: 'Jag har en vän. Han bor i Malmö.'", "Jag har en vän som bor i Malmö."),
      E("Điền: 'Filmen ___ vi såg var bra.'", "Fill: 'Filmen ___ vi såg var bra.'", "som"),
      E("Nối: 'Det är boken. Jag köpte den igår.'", "Join: 'Det är boken. Jag köpte den igår.'", "Det är boken som jag köpte igår."),
    ],
  },
  25: {
    deepVi: "Động từ phản thân (reflexiva verb): dùng 'mig/dig/sig/oss/er/sig' làm tân ngữ khớp với chủ ngữ. Ví dụ: 'tvätta sig' (tự tắm), 'känna sig' (cảm thấy), 'sätta sig' (ngồi xuống). 'Jag tvättar mig.' 'Han känner sig trött.' 'Vi sätter oss vid bordet.'",
    deepEn: "Reflexive verbs use mig/dig/sig/oss/er/sig: tvätta sig, känna sig, sätta sig.",
    examples: [
      { sv: "Hon klär på sig snabbt.", vi: "Cô ấy mặc đồ nhanh chóng.", en: "She dresses quickly." },
    ],
    exercises: [
      E("Điền: 'Jag känner ___ glad idag.'", "Fill: 'Jag känner ___ glad idag.'", "mig"),
      E("Điền: 'De sätter ___ ner.'", "Fill: 'De sätter ___ ner.'", "sig"),
      E("Điền: 'Vi tvättar ___ på morgonen.'", "Fill: 'Vi tvättar ___ på morgonen.'", "oss"),
    ],
  },
  26: {
    deepVi: "Cụm động từ tách rời (partikelverb): động từ + tiểu từ tạo nghĩa mới. Trọng âm rơi vào TIỂU TỪ. 'tycka OM' (thích), 'tänka PÅ' (nghĩ về), 'gå UT' (đi ra), 'komma TILLBAKA' (trở lại). Trong câu tách: 'Jag tycker om kaffe.' – tiểu từ đứng SAU động từ + tân ngữ ngắn.",
    deepEn: "Particle verbs: verb + particle with stress on particle. tycka om (like), tänka på (think of), gå ut (go out).",
    examples: [
      { sv: "Han tänker på sin familj varje dag.", vi: "Anh ấy nghĩ về gia đình mỗi ngày.", en: "He thinks about his family every day." },
    ],
    exercises: [
      E("Điền tiểu từ: 'Jag tycker ___ musik.'", "Fill particle: 'Jag tycker ___ musik.'", "om"),
      E("Điền: 'Vi går ___ ikväll.' (ra ngoài)", "Fill: 'Vi går ___ ikväll.' (out)", "ut"),
      E("Điền: 'Han kommer ___ imorgon.' (trở lại)", "Fill: 'Han kommer ___ imorgon.' (back)", "tillbaka"),
    ],
  },
  27: {
    deepVi: "Câu mệnh lệnh: dùng nguyên gốc động từ (nhóm 1) hoặc bỏ '-a' (nhóm 2, 3): 'Tala långsamt!' 'Läs boken!' 'Kom hit!'. Lịch sự: thêm 'tack' hoặc 'snälla' – 'Öppna dörren, tack.' Phủ định mệnh lệnh: 'Prata inte så högt!'",
    deepEn: "Imperative: base form for group 1, drop -a for groups 2-3. Add 'tack' or 'snälla' for politeness.",
    examples: [
      { sv: "Kom in och sätt dig!", vi: "Vào đi và ngồi xuống!", en: "Come in and sit down!" },
    ],
    exercises: [
      E("Mệnh lệnh của 'öppna dörren'.", "Imperative 'open the door'.", "Öppna dörren!"),
      E("Mệnh lệnh của 'läsa boken'.", "Imperative 'read the book'.", "Läs boken!"),
      E("Phủ định mệnh lệnh: 'prata högt'", "Negative imperative: 'prata högt'", "Prata inte högt!"),
    ],
  },
  28: {
    deepVi: "Câu bị động (passiv): 2 cách phổ biến. (1) '-s' passive: gắn -s vào động từ – 'Boken läses av barnet.' (Sách được đọc bởi đứa trẻ). (2) 'bli' + supinum – 'Han blev vald.' (Anh ấy đã được chọn). Cách 1 hay dùng cho quá trình lặp lại; cách 2 nhấn vào biến cố cụ thể.",
    deepEn: "Passive: -s passive (Boken läses…) or bli + supine (Han blev vald). -s for habitual, bli for events.",
    examples: [
      { sv: "Middagen serveras klockan sju.", vi: "Bữa tối được phục vụ lúc bảy giờ.", en: "Dinner is served at seven." },
    ],
    exercises: [
      E("Chuyển bị động '-s': 'Läraren rättar proven.'", "Passive -s: 'Läraren rättar proven.'", "Proven rättas av läraren."),
      E("Chuyển bị động 'bli': 'De valde Erik.'", "Passive bli: 'De valde Erik.'", "Erik blev vald."),
      E("Điền -s: 'Kaffet drick___ varmt.'", "Fill -s: 'Kaffet drick___ varmt.'", "dricks"),
    ],
  },
  29: {
    deepVi: "Từ nối chuyển tiếp trong bài viết: dessutom (hơn nữa), däremot (ngược lại), därför (vì vậy), emellertid (tuy nhiên), till exempel (ví dụ), å ena sidan… å andra sidan (một mặt… mặt khác). Dùng để nâng band viết YKI A2/B1.",
    deepEn: "Written connectors: dessutom (moreover), däremot (however), därför (therefore), till exempel (for example), å ena sidan…å andra sidan.",
    examples: [
      { sv: "Jag gillar Stockholm. Däremot är det dyrt.", vi: "Tôi thích Stockholm. Ngược lại nó đắt đỏ.", en: "I like Stockholm. However, it is expensive." },
    ],
    exercises: [
      E("Điền: 'Jag vill åka. ___ har jag inte pengar.' (tuy nhiên)", "Fill: 'I want to go. ___ I have no money.'", "Däremot"),
      E("Điền: 'Det regnar. ___ stannar vi hemma.' (vì vậy)", "Fill: 'It's raining. ___ we stay home.'", "Därför"),
      E("Điền: 'Jag studerar svenska, ___ läser jag böcker.' (hơn nữa)", "Fill: 'I study Swedish, ___ I read books.' (moreover)", "dessutom"),
    ],
  },
  30: {
    deepVi: "Ôn tổng kết A1: viết bài văn 6-8 câu 'Min vardag' dùng: V2, thì hiện tại + quá khứ + perfekt, giới từ nơi chốn, sở hữu, đồng hồ, từ nối. Đây là mức TỐI THIỂU để vượt YKI A1 và tiếp cận A2. Nói được 60 giây liên tục không vấp về bản thân.",
    deepEn: "A1 wrap-up: write 6-8 sentences 'Min vardag' using V2, present/past/perfect, prepositions, possessives, clock, connectors.",
    examples: [
      { sv: "Jag heter Nam. Jag bor i Helsingfors sedan två år. På vardagar jobbar jag på ett IT-företag. Klockan sju äter jag middag. Efter jobbet studerar jag svenska. I helgen har jag besökt Åbo.", vi: "Tôi tên Nam. Tôi sống ở Helsinki hai năm rồi. Ngày thường tôi làm việc ở một công ty IT. 7 giờ tôi ăn tối. Sau giờ làm tôi học tiếng Thụy Điển. Cuối tuần tôi đã đến Turku.", en: "I'm Nam. I've lived in Helsinki for 2 years. On weekdays I work at an IT company. At 7 I eat dinner. After work I study Swedish. On the weekend I visited Turku." },
    ],
    exercises: [
      E("Viết 2 câu về bản thân dùng V2 và perfekt.", "Write 2 sentences about yourself using V2 and perfect.", "Ví dụ: 'På morgonen dricker jag kaffe. Jag har bott i Sverige i tre år.'"),
      E("Sửa lỗi V2: 'Igår jag åt pizza.'", "Fix V2: 'Igår jag åt pizza.'", "Igår åt jag pizza."),
      E("Sửa lỗi BIFF: 'Jag vet att han kommer inte.'", "Fix BIFF: 'Jag vet att han kommer inte.'", "Jag vet att han inte kommer."),
    ],
  },
};

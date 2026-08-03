/**
 * @file swedishLessonDeep.ts
 * @description Deep-dive content for each Swedish lesson - grammar tables,
 *              dialogues, model texts, culture notes and self-check quizzes.
 *              Designed to make every lesson self-contained for absolute
 *              beginners. Keyed by the same lesson id used in SwedishTierView.
 *              All Vietnamese copy uses hyphens (no em-dash) per project rules.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface DeepGrammarTable {
  titleVi: string;
  titleEn: string;
  headers: string[];
  rows: string[][];
  noteVi?: string;
  noteEn?: string;
}

export interface DeepDialogueLine {
  speaker: string;
  sv: string;
  vi: string;
  en: string;
}

export interface DeepDialogue {
  titleVi: string;
  titleEn: string;
  settingVi: string;
  settingEn: string;
  lines: DeepDialogueLine[];
}

export interface DeepModelText {
  titleVi: string;
  titleEn: string;
  sv: string;
  vi: string;
  en: string;
  /** 3-6 từ khoá rút ra để học viên ghi nhớ. */
  highlights?: string[];
}

export interface DeepQuizItem {
  q: string;
  /** English mirror of the question (optional; see swedishLessonQuizEn.ts). */
  qEn?: string;
  options: string[];
  /** English mirror of the options, same order. */
  optionsEn?: string[];
  answer: number;
  explainVi: string;
  explainEn: string;
}

export interface LessonDeepDive {
  grammar?: DeepGrammarTable;
  dialogue?: DeepDialogue;
  model?: DeepModelText;
  cultureVi?: string;
  cultureEn?: string;
  quiz?: DeepQuizItem[];
}

export const LESSON_DEEP: Record<string, LessonDeepDive> = {
  /* ============================ A1 - BATCH A ============================ */

  "a1-pron": {
    grammar: {
      titleVi: "Quy tắc phát âm 3 nhóm âm lõi",
      titleEn: "Three core Swedish sound rules",
      headers: ["Nhóm âm", "Cách đọc", "Ví dụ", "Tiếng Việt"],
      rows: [
        ["sj-, skj-, stj-, sk(e/i/y)", "Thổi gió tròn môi giống 'huýt sáo'", "sju, skjorta, station", "bảy, áo sơ mi, ga"],
        ["tj-, k(e/i/y)", "Lưỡi sát răng trên, giống 'sh' nhẹ", "tjugo, kyla, köpa", "hai mươi, lạnh, mua"],
        ["Nguyên âm dài (1 phụ âm)", "Kéo dài 1.5 nhịp", "vit, mat, hus", "trắng, thức ăn, nhà"],
        ["Nguyên âm ngắn (2 phụ âm)", "Cắt gọn 0.5 nhịp", "vitt, matt, hund", "trắng (ett), mệt, chó"],
        ["å / ä / ö", "å = 'o', ä = 'e mở', ö = 'ơ tròn môi'", "år, äpple, öl", "năm, táo, bia"],
      ],
      noteVi: "Quy tắc dài/ngắn quan trọng hơn 90% bạn nghĩ - giám khảo YKI nghe được ngay.",
      noteEn: "The long/short rule matters more than 90% of learners think - YKI examiners notice instantly.",
    },
    dialogue: {
      titleVi: "Mini hội thoại: tập đọc số đếm",
      titleEn: "Mini dialogue: practicing numbers aloud",
      settingVi: "Hai bạn cùng phòng kiểm tra phát âm cho nhau.",
      settingEn: "Two flatmates check each other's pronunciation.",
      lines: [
        { speaker: "Anna", sv: "Säg 'sju' för mig.", vi: "Đọc 'sju' (bảy) cho tớ nghe.", en: "Say 'sju' for me." },
        { speaker: "Lin", sv: "Sju... sjuksköterska.", vi: "Bảy... y tá.", en: "Seven... nurse." },
        { speaker: "Anna", sv: "Bra! Och nu 'tjugo'?", vi: "Hay! Còn 'tjugo' (20)?", en: "Nice! Now 'tjugo'?" },
        { speaker: "Lin", sv: "Tjugo, tjugoett, tjugotvå.", vi: "Hai mươi, hai mốt, hai hai.", en: "Twenty, twenty-one, twenty-two." },
        { speaker: "Anna", sv: "Försök 'vit' och 'vitt'.", vi: "Thử 'vit' và 'vitt' xem.", en: "Try 'vit' and 'vitt'." },
        { speaker: "Lin", sv: "Viiit... vitt. Långt och kort!", vi: "Viiit... vitt. Dài và ngắn!", en: "Viiit... vitt. Long and short!" },
        { speaker: "Anna", sv: "Perfekt. Du är redo för YKI.", vi: "Hoàn hảo. Bạn sẵn sàng thi YKI rồi.", en: "Perfect. You're ready for YKI." },
      ],
    },
    model: {
      titleVi: "Đoạn văn mẫu: 30 giây tự giới thiệu có chú ý phát âm",
      titleEn: "Model paragraph: 30s self-intro with pronunciation focus",
      sv: "Hej! Jag heter Lin. Jag är tjugoåtta år gammal. Jag bor i Helsingfors. Jag arbetar som sjuksköterska på ett sjukhus. På fritiden tycker jag om att läsa och att lyssna på musik. Jag pratar vietnamesiska, engelska och lite svenska. Jag vill bli bättre på uttalet, särskilt sj- och tj-ljudet.",
      vi: "Xin chào! Tôi tên là Lin. Tôi 28 tuổi. Tôi sống ở Helsinki. Tôi làm y tá tại một bệnh viện. Lúc rảnh tôi thích đọc sách và nghe nhạc. Tôi nói tiếng Việt, tiếng Anh và một chút tiếng Thụy Điển. Tôi muốn cải thiện phát âm, nhất là âm sj- và tj-.",
      en: "Hi! My name is Lin. I am 28 years old. I live in Helsinki. I work as a nurse at a hospital. In my free time I like reading and listening to music. I speak Vietnamese, English and a bit of Swedish. I want to improve my pronunciation, especially the sj- and tj- sounds.",
      highlights: ["sjuksköterska", "tjugoåtta", "Helsingfors", "sjukhus", "uttalet"],
    },
    cultureVi:
      "Người Phần Lan nói tiếng Thụy Điển (finlandssvensk) phát âm dễ nghe hơn người Stockholm: âm sj- ít gió hơn và nhịp đều như tiếng Phần Lan. Khi học YKI Ruotsi, hãy chọn audio Yle Vega thay vì SVT để quen tai trước.",
    cultureEn:
      "Finland-Swedes (finlandssvensk) pronounce sj- with less air and a steadier rhythm than Stockholm speakers, making them easier for YKI Ruotsi candidates. Train with Yle Vega audio before SVT.",
    quiz: [
      {
        q: "Từ 'sjuksköterska' bắt đầu bằng âm nào?",
        options: ["s như tiếng Anh", "sh nhẹ", "âm gió tròn môi (sj-)", "ch của tiếng Trung"],
        answer: 2,
        explainVi: "Âm sj- là âm gió đặc trưng nhất của tiếng Thụy Điển, môi tròn và thổi nhẹ.",
        explainEn: "Sj- is the iconic Swedish fricative: round lips, soft airflow.",
      },
      {
        q: "Từ nào có nguyên âm NGẮN?",
        options: ["vit", "mat", "vitt", "hus"],
        answer: 2,
        explainVi: "Hai phụ âm sau nguyên âm (tt) báo hiệu nguyên âm ngắn.",
        explainEn: "Doubled consonant (tt) marks a short vowel.",
      },
      {
        q: "Trọng âm của 'hej-då' rơi vào âm tiết nào?",
        options: ["Âm tiết đầu", "Âm tiết cuối", "Không có trọng âm", "Cả hai bằng nhau"],
        answer: 0,
        explainVi: "Từ 2 âm tiết tiếng Thụy Điển thường nhấn âm đầu.",
        explainEn: "Two-syllable Swedish words usually stress the first syllable.",
      },
    ],
  },

  "a1-self": {
    grammar: {
      titleVi: "4 khung câu cốt lõi để tự giới thiệu",
      titleEn: "Four core self-intro frames",
      headers: ["Khung", "Mẫu", "Ví dụ", "Tiếng Việt"],
      rows: [
        ["Tên", "Jag heter ___.", "Jag heter Mai.", "Tôi tên là Mai."],
        ["Tuổi", "Jag är ___ år.", "Jag är 32 år.", "Tôi 32 tuổi."],
        ["Quốc tịch", "Jag kommer från ___.", "Jag kommer från Vietnam.", "Tôi đến từ Việt Nam."],
        ["Nghề", "Jag jobbar som ___.", "Jag jobbar som lärare.", "Tôi làm giáo viên."],
        ["Sinh viên", "Jag studerar ___.", "Jag studerar svenska.", "Tôi học tiếng Thụy Điển."],
        ["Gia đình", "Jag har ___ barn.", "Jag har två barn.", "Tôi có 2 con."],
      ],
      noteVi: "Học thuộc 6 khung này là đã có đủ đoạn 40-50 giây cho phần Tala A1.",
      noteEn: "Memorising these 6 frames already gives a 40-50s monologue for Tala A1.",
    },
    dialogue: {
      titleVi: "Hội thoại: ngày đầu lớp SFI",
      titleEn: "Dialogue: first day of an SFI class",
      settingVi: "Cô giáo Eva hỏi học viên mới tự giới thiệu.",
      settingEn: "Teacher Eva asks a new student to introduce herself.",
      lines: [
        { speaker: "Eva", sv: "Hej! Vad heter du?", vi: "Xin chào! Bạn tên gì?", en: "Hi! What's your name?" },
        { speaker: "Mai", sv: "Jag heter Mai. Och du?", vi: "Tôi tên là Mai. Còn cô?", en: "I'm Mai. And you?" },
        { speaker: "Eva", sv: "Jag heter Eva. Var kommer du ifrån?", vi: "Tôi tên là Eva. Bạn đến từ đâu?", en: "I'm Eva. Where are you from?" },
        { speaker: "Mai", sv: "Jag kommer från Vietnam, från Hanoi.", vi: "Tôi đến từ Việt Nam, từ Hà Nội.", en: "I'm from Vietnam, from Hanoi." },
        { speaker: "Eva", sv: "Vad jobbar du med?", vi: "Bạn làm nghề gì?", en: "What do you do for work?" },
        { speaker: "Mai", sv: "Jag jobbar som ingenjör hos Nokia.", vi: "Tôi làm kỹ sư ở Nokia.", en: "I work as an engineer at Nokia." },
        { speaker: "Eva", sv: "Vad bra! Har du familj här?", vi: "Tốt quá! Bạn có gia đình ở đây không?", en: "Great! Do you have family here?" },
        { speaker: "Mai", sv: "Ja, jag har en man och två barn.", vi: "Có, tôi có một chồng và hai con.", en: "Yes, a husband and two kids." },
        { speaker: "Eva", sv: "Välkommen till klassen!", vi: "Chào mừng bạn đến lớp!", en: "Welcome to the class!" },
      ],
    },
    model: {
      titleVi: "Đoạn văn mẫu: tự giới thiệu chuẩn YKI Tala A1",
      titleEn: "Model paragraph: YKI Tala A1 standard self-intro",
      sv: "Hej, jag heter Mai Nguyen. Jag är trettiotvå år gammal. Jag kommer från Vietnam men nu bor jag i Vasa. Jag har bott i Finland i tre år. Jag är gift och har två barn, en flicka och en pojke. Jag jobbar som mjukvaruingenjör på ett finskt företag. På fritiden lagar jag vietnamesisk mat och promenerar vid havet. Jag lär mig svenska eftersom jag vill jobba med svenskspråkiga kollegor.",
      vi: "Xin chào, tôi tên là Mai Nguyễn. Tôi 32 tuổi. Tôi đến từ Việt Nam nhưng hiện sống ở Vasa. Tôi đã sống ở Phần Lan được 3 năm. Tôi đã kết hôn và có 2 con, một bé gái và một bé trai. Tôi làm kỹ sư phần mềm tại một công ty Phần Lan. Lúc rảnh tôi nấu món Việt và đi dạo bờ biển. Tôi học tiếng Thụy Điển vì muốn làm việc với đồng nghiệp nói tiếng Thụy Điển.",
      en: "Hi, my name is Mai Nguyen. I am 32 years old. I come from Vietnam but now I live in Vasa. I have lived in Finland for three years. I am married and have two children, a girl and a boy. I work as a software engineer at a Finnish company. In my free time I cook Vietnamese food and walk by the sea. I'm learning Swedish because I want to work with Swedish-speaking colleagues.",
      highlights: ["mjukvaruingenjör", "svenskspråkiga", "Vasa", "trettiotvå", "har bott i"],
    },
    cultureVi:
      "Ở Phần Lan, người tự giới thiệu hiếm khi nói chức danh dài dòng. Hãy nói tên + nghề ngắn gọn, sau đó kể 1 sở thích để mở không khí. Người Vasa rất quý nếu bạn thêm 'Jag bor i Vasa' kèm nụ cười.",
    cultureEn:
      "Finns rarely use long titles when introducing themselves. Say your name + a short job, then add a hobby to break the ice. Vasa locals appreciate hearing 'Jag bor i Vasa' with a smile.",
    quiz: [
      {
        q: "Câu nào ĐÚNG cho 'Tôi 28 tuổi'?",
        options: ["Jag 28 år.", "Jag har 28 år.", "Jag är 28 år.", "Jag är 28 år gammal det."],
        answer: 2,
        explainVi: "Tiếng Thụy Điển dùng động từ 'är' (là) cho tuổi, không dùng 'har' như tiếng Pháp.",
        explainEn: "Swedish uses 'är' (to be) for age, not 'har' like French.",
      },
      {
        q: "Mạo từ sở hữu nào dùng cho danh từ 'ett namn'?",
        options: ["min", "mitt", "mina", "min eller mitt"],
        answer: 1,
        explainVi: "Danh từ ett dùng 'mitt' (mitt namn). Danh từ en dùng 'min' (min bil).",
        explainEn: "Ett-nouns take 'mitt' (mitt namn). En-nouns take 'min' (min bil).",
      },
      {
        q: "Cách hỏi 'Bạn làm nghề gì?' tự nhiên nhất là?",
        options: ["Vad är ditt jobb?", "Vad gör du för jobb?", "Vad jobbar du med?", "Hur jobbar du?"],
        answer: 2,
        explainVi: "'Vad jobbar du med?' là câu hỏi nghề nghiệp phổ biến nhất ở SFI/YKI A1.",
        explainEn: "'Vad jobbar du med?' is the most common job question at SFI/YKI A1 level.",
      },
    ],
  },

  "a1-num": {
    grammar: {
      titleVi: "Số đếm 0-100 và cách ghép số có hàng chục",
      titleEn: "Numbers 0-100 and how to combine tens",
      headers: ["Số", "Tiếng Thụy Điển", "Phát âm gợi ý", "Ghi chú"],
      rows: [
        ["0-5", "noll, ett, två, tre, fyra, fem", "nol, et, tvoa, tre, fyra, fem", "Học theo nhóm 5"],
        ["6-10", "sex, sju, åtta, nio, tio", "seks, fu, ot-ta, ni-u, ti-u", "'sju' là âm sj- gió"],
        ["11-20", "elva, tolv, tretton, ..., tjugo", "el-va, tol, tre-ton, ..., chu-go", "'tjugo' = âm tj-"],
        ["21-29", "tjugoett, tjugotvå, ...", "chu-go-et, chu-go-tvoa", "Ghép hàng chục + số"],
        ["30-90", "trettio, fyrtio, femtio, sextio, sjuttio, åttio, nittio", "tret-tiu, fyr-tiu, fem-tiu, ...", "Đều kết thúc -tio"],
        ["100", "(ett)hundra", "hun-dra", "Có thể bỏ 'ett'"],
      ],
      noteVi: "Lưu ý số đếm Thụy Điển khác đếm tiếng Đức: 21 nói 'tjugoett' (20-1) chứ KHÔNG đảo.",
      noteEn: "Unlike German, Swedish doesn't invert: 21 = 'tjugoett' (twenty-one), not 'oneandtwenty'.",
    },
    dialogue: {
      titleVi: "Mua vé xe buýt và đọc số",
      titleEn: "Buying a bus ticket and reading numbers",
      settingVi: "Quầy bán vé ở bến xe Helsinki.",
      settingEn: "Ticket counter at Helsinki bus station.",
      lines: [
        { speaker: "Mai", sv: "Hej, hur mycket kostar en biljett till Tammerfors?", vi: "Chào, vé đi Tampere bao nhiêu?", en: "Hi, how much is a ticket to Tampere?" },
        { speaker: "Säljare", sv: "Tjugosju euro och femtio cent.", vi: "27 euro 50 cent.", en: "Twenty-seven euros fifty cents." },
        { speaker: "Mai", sv: "När går nästa buss?", vi: "Khi nào chuyến xe tiếp theo khởi hành?", en: "When does the next bus leave?" },
        { speaker: "Säljare", sv: "Klockan fjorton och fyrtiofem.", vi: "14h45.", en: "At 14:45." },
        { speaker: "Mai", sv: "Jag tar två biljetter, tack.", vi: "Tôi lấy 2 vé.", en: "I'll take two tickets, please." },
        { speaker: "Säljare", sv: "Det blir femtiofem euro jämnt.", vi: "Tổng là 55 euro chẵn.", en: "That's fifty-five euros even." },
        { speaker: "Mai", sv: "Här är hundra euro.", vi: "Đây là 100 euro.", en: "Here's a hundred euros." },
        { speaker: "Säljare", sv: "Och fyrtiofem tillbaka. Trevlig resa!", vi: "Và 45 euro trả lại. Chúc đi vui!", en: "And 45 back. Have a nice trip!" },
      ],
    },
    model: {
      titleVi: "Đoạn văn: thông tin cá nhân bằng con số",
      titleEn: "Paragraph: personal info in numbers",
      sv: "Jag heter Hai. Jag är fyrtiotre år gammal. Jag bor på Storgatan tjugoett, lägenhet sju. Mitt telefonnummer är noll-fyrtio-ett-två-tre-fyra-fem-sex-sju-åtta. Min postkod är sextusen-ett-hundra. Jag har tre barn: en flicka på nio år och två pojkar på tolv och femton år. Jag arbetar trettiosju och en halv timme i veckan.",
      vi: "Tôi tên là Hải. Tôi 43 tuổi. Tôi sống ở phố Storgatan 21, căn hộ số 7. Số điện thoại là 040-1234567. Mã bưu chính 6100. Tôi có 3 con: một bé gái 9 tuổi và hai bé trai 12 và 15 tuổi. Tôi làm 37.5 giờ một tuần.",
      en: "I'm Hai. I'm 43. I live at Storgatan 21, apartment 7. My phone is 040-1234-5678. Postcode 6100. I have three kids: a girl aged 9, and two boys aged 12 and 15. I work 37.5 hours a week.",
      highlights: ["tjugoett", "trettiosju och en halv", "fyrtiotre", "lägenhet", "postkod"],
    },
    cultureVi:
      "Người Bắc Âu đọc số điện thoại theo từng đôi: '040-12-34-56-78' chứ không đọc từng chữ số rời. Ở YKI khi viết số phải dùng dấu phẩy thập phân (3,5) chứ không dùng dấu chấm.",
    cultureEn:
      "Nordics read phone numbers in pairs: '040-12-34-56-78'. Use a comma as the decimal separator (3,5) in YKI writing, not a dot.",
    quiz: [
      {
        q: "Số 27 viết bằng chữ là?",
        options: ["tjugoseven", "tjugosju", "tjugiseven", "tjugesju"],
        answer: 1,
        explainVi: "20 + 7 = tjugo + sju, viết liền không gạch nối.",
        explainEn: "20 + 7 = tjugo + sju, written as one word.",
      },
      {
        q: "Cách đọc 'klockan 14:45' chuẩn YKI?",
        options: ["Klockan fjorton fyrtiofem", "Klockan fjorton och fyrtiofem", "Kvart i tre på eftermiddagen", "Cả B và C đều đúng"],
        answer: 3,
        explainVi: "Cả 'fjorton och fyrtiofem' (kiểu chính thức) và 'kvart i tre på eftermiddagen' (kiểu nói) đều đúng.",
        explainEn: "Both the formal 'fjorton och fyrtiofem' and conversational 'kvart i tre' are correct.",
      },
      {
        q: "Số thập phân 3,5 đọc là?",
        options: ["tre punkt fem", "tre komma fem", "tre och en halv", "Cả B và C"],
        answer: 3,
        explainVi: "'tre komma fem' (chính thức) hoặc 'tre och en halv' (đời thường), không dùng 'punkt'.",
        explainEn: "Use 'tre komma fem' (formal) or 'tre och en halv' (informal), never 'punkt'.",
      },
    ],
  },

  "a1-alphabet": {
    grammar: {
      titleVi: "29 chữ cái bảng chữ Thụy Điển",
      titleEn: "29 letters of the Swedish alphabet",
      headers: ["Chữ", "Tên gọi", "Âm phát", "Từ ví dụ"],
      rows: [
        ["A a", "aa", "/aː/ dài, /a/ ngắn", "apa (con khỉ)"],
        ["E e", "ee", "/eː/, /ɛ/", "ek (cây sồi)"],
        ["I i", "ii", "/iː/, /ɪ/", "is (đá)"],
        ["O o", "uu", "/uː/, /ʊ/ - đọc giống 'u'", "ost (phô mai)"],
        ["U u", "uu (môi tròn)", "/ʉː/ độc nhất", "hus (nhà)"],
        ["Y y", "yy", "/yː/ - 'i' tròn môi", "by (làng)"],
        ["Å å", "oo", "/oː/ - giống 'o' dài", "år (năm)"],
        ["Ä ä", "ää", "/ɛː/ - 'e' mở", "äpple (táo)"],
        ["Ö ö", "öö", "/øː/ - 'ơ' tròn môi", "öl (bia)"],
      ],
      noteVi: "Bảng chữ Thụy Điển có 29 chữ, thêm Å Ä Ö ở cuối (sau Z). Khi tra từ điển nhớ kéo cuối danh sách.",
      noteEn: "29 letters - Å Ä Ö come after Z. Remember to scroll to the end when using a dictionary.",
    },
    dialogue: {
      titleVi: "Đánh vần tên qua điện thoại",
      titleEn: "Spelling your name on the phone",
      settingVi: "Gọi đặt lịch khám tại trung tâm y tế.",
      settingEn: "Calling a health centre to book an appointment.",
      lines: [
        { speaker: "Receptionist", sv: "Vad heter du?", vi: "Bạn tên gì?", en: "What's your name?" },
        { speaker: "Mai", sv: "Mai Nguyen.", vi: "Mai Nguyễn.", en: "Mai Nguyen." },
        { speaker: "Receptionist", sv: "Kan du bokstavera efternamnet?", vi: "Bạn đánh vần họ giúp tôi nhé?", en: "Can you spell the last name?" },
        { speaker: "Mai", sv: "N som i Niklas, G som i Gustav, U som i Ulf, Y som i Yvonne, E som i Erik, N som i Niklas.", vi: "N như Niklas, G như Gustav, U như Ulf, Y như Yvonne, E như Erik, N như Niklas.", en: "N as in Niklas, G as in Gustav, U as in Ulf, Y as in Yvonne, E as in Erik, N as in Niklas." },
        { speaker: "Receptionist", sv: "Tack. Och förnamnet?", vi: "Cảm ơn. Còn tên?", en: "Thanks. And first name?" },
        { speaker: "Mai", sv: "M som i Martin, A som i Adam, I som i Ivar.", vi: "M như Martin, A như Adam, I như Ivar.", en: "M as in Martin, A as in Adam, I as in Ivar." },
        { speaker: "Receptionist", sv: "Perfekt, då har jag det.", vi: "Hoàn hảo, tôi đã ghi xong.", en: "Perfect, got it." },
      ],
    },
    model: {
      titleVi: "Đoạn văn ngắn: tại sao alphabet là bài đầu tiên",
      titleEn: "Short paragraph: why the alphabet is lesson one",
      sv: "Det svenska alfabetet har tjugonio bokstäver. De tre sista är å, ä och ö. När jag bokar tid hos läkaren eller på banken behöver jag ofta bokstavera mitt namn. Då säger jag 'M som i Martin, A som i Adam'. Det här systemet kallas bokstaveringsalfabetet. Om jag inte kan alfabetet är det svårt att fylla i blanketter, slå upp ord och stava rätt på YKI-provet.",
      vi: "Bảng chữ Thụy Điển có 29 chữ cái. Ba chữ cuối là å, ä và ö. Khi đặt lịch khám bác sĩ hoặc làm việc ngân hàng tôi thường phải đánh vần tên. Tôi sẽ nói 'M như Martin, A như Adam'. Hệ thống này gọi là bokstaveringsalfabetet. Nếu không thuộc bảng chữ sẽ khó điền mẫu, tra từ và viết đúng chính tả ở kỳ thi YKI.",
      en: "The Swedish alphabet has 29 letters. The last three are å, ä and ö. When booking with a doctor or bank, I often have to spell my name like 'M as in Martin, A as in Adam'. This is called the spelling alphabet. Without it, filling forms, looking up words and writing correctly on YKI become very hard.",
      highlights: ["tjugonio bokstäver", "bokstavera", "bokstaveringsalfabetet", "blanketter", "stava rätt"],
    },
    cultureVi:
      "Khi xếp danh sách (ví dụ tên học sinh), Å Ä Ö xếp SAU Z. Đừng nhầm với tiếng Đức (xếp như A, O). Người Thụy Điển sẽ ngạc nhiên nếu bạn xếp sai.",
    cultureEn:
      "When sorting names, Å Ä Ö come AFTER Z, unlike German where they sort like A, O. Sorting them wrongly will surprise locals.",
    quiz: [
      {
        q: "Tổng số chữ cái trong bảng chữ Thụy Điển là?",
        options: ["26", "27", "28", "29"],
        answer: 3,
        explainVi: "26 chữ Latin + å, ä, ö = 29 chữ cái.",
        explainEn: "26 Latin letters + å, ä, ö = 29 letters total.",
      },
      {
        q: "Chữ Y trong tiếng Thụy Điển phát âm ra sao?",
        options: ["Y như tiếng Việt", "I tròn môi", "U dài", "J ngắn"],
        answer: 1,
        explainVi: "Y phát âm là 'i' tròn môi, khác hẳn tiếng Việt.",
        explainEn: "Y sounds like 'i' with rounded lips, unlike English/Vietnamese.",
      },
      {
        q: "Khi tra từ điển, từ 'år' nằm ở đâu?",
        options: ["Đầu danh sách (sau A)", "Giữa danh sách (gần O)", "Cuối danh sách (sau Z)", "Không có trong từ điển"],
        answer: 2,
        explainVi: "Å được xếp cuối bảng chữ, ngay sau Z.",
        explainEn: "Å is sorted at the end, right after Z.",
      },
    ],
  },

  "a1-greetings": {
    grammar: {
      titleVi: "10 mẫu chào hỏi theo thời gian và bối cảnh",
      titleEn: "10 greetings by time and context",
      headers: ["Bối cảnh", "Câu Thụy Điển", "Khi nào dùng", "Tiếng Việt"],
      rows: [
        ["Đời thường", "Hej / Hejsan", "Mọi lúc, mọi đối tượng", "Chào"],
        ["Trang trọng", "God morgon / God dag", "Sáng / từ 10h-17h", "Chào buổi sáng / chào ngày"],
        ["Tối", "God kväll", "Sau 17h", "Chào buổi tối"],
        ["Đêm khuya", "God natt", "Chỉ khi đi ngủ", "Chúc ngủ ngon"],
        ["Hỏi thăm", "Hur mår du? / Hur är det?", "Sau lời chào", "Bạn khoẻ không?"],
        ["Trả lời", "Bra, tack! Och du?", "Đáp lại lịch sự", "Khoẻ, cảm ơn! Còn bạn?"],
        ["Tạm biệt", "Hej då / Vi ses", "Khi rời đi", "Tạm biệt / hẹn gặp lại"],
        ["Cảm ơn", "Tack / Tack så mycket", "Mọi lúc", "Cảm ơn / cảm ơn nhiều"],
        ["Xin lỗi", "Förlåt / Ursäkta", "Förlåt: lỗi sai, Ursäkta: chen ngang", "Xin lỗi"],
        ["Mời", "Varsågod", "Khi đưa đồ / mời", "Mời bạn"],
      ],
      noteVi: "Người Phần Lan-Thụy Điển hay dùng 'Moi' thay 'Hej' khi nói tiếng Thụy Điển, đặc biệt ở Vasa và Helsinki.",
      noteEn: "Finland-Swedes often use 'Moi' instead of 'Hej', especially in Vasa and Helsinki.",
    },
    dialogue: {
      titleVi: "Gặp đồng nghiệp buổi sáng",
      titleEn: "Meeting a colleague in the morning",
      settingVi: "Tại văn phòng ở Helsinki, 8h30 sáng.",
      settingEn: "At an office in Helsinki, 8:30 AM.",
      lines: [
        { speaker: "Erik", sv: "God morgon, Mai!", vi: "Chào buổi sáng, Mai!", en: "Good morning, Mai!" },
        { speaker: "Mai", sv: "God morgon, Erik! Hur mår du?", vi: "Chào buổi sáng, Erik! Bạn khoẻ không?", en: "Morning, Erik! How are you?" },
        { speaker: "Erik", sv: "Bra, tack! Och du?", vi: "Khoẻ, cảm ơn! Còn bạn?", en: "Good, thanks! And you?" },
        { speaker: "Mai", sv: "Trött men glad. Mycket att göra idag.", vi: "Mệt nhưng vui. Hôm nay nhiều việc lắm.", en: "Tired but happy. A lot to do today." },
        { speaker: "Erik", sv: "Vill du ha kaffe?", vi: "Bạn uống cà phê không?", en: "Want some coffee?" },
        { speaker: "Mai", sv: "Ja tack, gärna!", vi: "Vâng, có chứ!", en: "Yes please!" },
        { speaker: "Erik", sv: "Varsågod.", vi: "Mời bạn.", en: "Here you go." },
        { speaker: "Mai", sv: "Tack så mycket.", vi: "Cảm ơn nhiều.", en: "Thanks a lot." },
      ],
    },
    model: {
      titleVi: "Đoạn văn: cách chào hỏi trong ngày",
      titleEn: "Paragraph: greetings throughout the day",
      sv: "På morgonen säger jag 'God morgon' till mina kollegor. Klockan tio byter jag till 'Hej' eller bara 'Hejsan' eftersom morgonen är slut. På eftermiddagen frågar jag alltid 'Hur är det?' när jag möter någon. På kvällen, när jag lämnar kontoret, säger jag 'Hej då' och 'Trevlig kväll'. Hemma innan jag sover säger jag 'God natt' till barnen. Att hälsa rätt visar att jag respekterar svensk kultur.",
      vi: "Buổi sáng tôi nói 'God morgon' với đồng nghiệp. 10h tôi đổi thành 'Hej' hoặc 'Hejsan' vì buổi sáng đã hết. Chiều tôi luôn hỏi 'Hur är det?' khi gặp ai đó. Tối khi rời văn phòng tôi nói 'Hej då' và 'Trevlig kväll'. Ở nhà trước khi ngủ tôi nói 'God natt' với các con. Chào đúng lúc thể hiện sự tôn trọng văn hoá Thụy Điển.",
      en: "In the morning I say 'God morgon' to colleagues. At 10 I switch to 'Hej' or 'Hejsan' since the morning is over. In the afternoon I always ask 'Hur är det?'. In the evening, when leaving the office, I say 'Hej då' and 'Trevlig kväll'. At home before bed I say 'God natt' to the kids. Greeting correctly shows respect for Swedish culture.",
      highlights: ["God morgon", "Hejsan", "Hur är det?", "Trevlig kväll", "God natt"],
    },
    cultureVi:
      "Người Bắc Âu không ôm hôn khi chào. Một cái gật đầu + 'Hej' kèm nụ cười là đủ. Bắt tay chỉ dùng trong môi trường công sở rất trang trọng.",
    cultureEn:
      "Nordics don't hug or kiss when greeting. A nod + 'Hej' with a smile is enough. Handshakes are reserved for very formal business contexts.",
    quiz: [
      {
        q: "Khi nào dùng 'God natt'?",
        options: ["7h tối", "9h tối", "Trước khi đi ngủ", "Khi gặp ai buổi tối"],
        answer: 2,
        explainVi: "'God natt' chỉ dùng khi sắp đi ngủ. Buổi tối gặp người ta dùng 'God kväll'.",
        explainEn: "'God natt' is only said before bed. Use 'God kväll' to greet someone in the evening.",
      },
      {
        q: "'Ursäkta' khác 'Förlåt' ở chỗ nào?",
        options: ["Cùng nghĩa", "Ursäkta dùng khi chen ngang, Förlåt khi xin lỗi lỗi sai", "Ngược lại", "Ursäkta trang trọng hơn Förlåt"],
        answer: 1,
        explainVi: "Ursäkta = excuse me (chen ngang), Förlåt = sorry (lỗi sai). Đừng nhầm!",
        explainEn: "Ursäkta = excuse me (interrupting), Förlåt = sorry (apologising for a mistake).",
      },
      {
        q: "Đáp lại 'Tack så mycket' lịch sự nhất là?",
        options: ["Inget problem", "Varsågod", "Ja tack", "Hej då"],
        answer: 1,
        explainVi: "'Varsågod' nghĩa 'không có gì / mời bạn' - đáp lễ tự nhiên nhất.",
        explainEn: "'Varsågod' means 'you're welcome / here you go' - the most natural reply.",
      },
    ],
  },

  "a1-pronouns": {
    grammar: {
      titleVi: "Đại từ nhân xưng và sở hữu",
      titleEn: "Personal and possessive pronouns",
      headers: ["Chủ ngữ", "Tân ngữ", "Sở hữu (en)", "Sở hữu (ett)", "Sở hữu (số nhiều)"],
      rows: [
        ["jag (tôi)", "mig (tôi)", "min", "mitt", "mina"],
        ["du (bạn)", "dig", "din", "ditt", "dina"],
        ["han (anh ấy)", "honom", "hans", "hans", "hans"],
        ["hon (cô ấy)", "henne", "hennes", "hennes", "hennes"],
        ["hen (trung tính)", "hen / henom", "hens", "hens", "hens"],
        ["den (en, vật)", "den", "dess", "dess", "dess"],
        ["det (ett, vật)", "det", "dess", "dess", "dess"],
        ["vi (chúng tôi)", "oss", "vår", "vårt", "våra"],
        ["ni (các bạn)", "er", "er", "ert", "era"],
        ["de (họ)", "dem", "deras", "deras", "deras"],
      ],
      noteVi: "'Hen' là đại từ trung tính giới tính, dùng phổ biến từ 2015 và xuất hiện trong SAOL chính thức.",
      noteEn: "'Hen' is the gender-neutral pronoun, widely used since 2015 and now in the official SAOL dictionary.",
    },
    dialogue: {
      titleVi: "Giới thiệu gia đình bằng đại từ",
      titleEn: "Introducing family with pronouns",
      settingVi: "Đang xem ảnh gia đình.",
      settingEn: "Looking at family photos.",
      lines: [
        { speaker: "Lin", sv: "Vem är det?", vi: "Đó là ai?", en: "Who is that?" },
        { speaker: "Mai", sv: "Det är min man. Han heter Hai.", vi: "Đó là chồng tôi. Anh ấy tên Hải.", en: "That's my husband. His name is Hai." },
        { speaker: "Lin", sv: "Och hon? Är hon din syster?", vi: "Còn cô ấy? Là chị bạn à?", en: "And her? Is she your sister?" },
        { speaker: "Mai", sv: "Ja, hennes namn är Lan. Hon bor i Hanoi.", vi: "Vâng, cô ấy tên là Lan. Sống ở Hà Nội.", en: "Yes, her name is Lan. She lives in Hanoi." },
        { speaker: "Lin", sv: "Vad gör de tillsammans?", vi: "Họ làm gì cùng nhau?", en: "What do they do together?" },
        { speaker: "Mai", sv: "De lagar mat. Deras specialitet är phở.", vi: "Họ nấu ăn. Đặc sản của họ là phở.", en: "They cook. Their specialty is pho." },
        { speaker: "Lin", sv: "Får jag prova en gång?", vi: "Tôi có thể thử một lần không?", en: "May I try sometime?" },
        { speaker: "Mai", sv: "Självklart! Jag bjuder dig nästa helg.", vi: "Tất nhiên! Cuối tuần sau tôi mời bạn.", en: "Of course! I'll invite you next weekend." },
      ],
    },
    model: {
      titleVi: "Đoạn văn: gia đình tôi qua các đại từ",
      titleEn: "Paragraph: my family through pronouns",
      sv: "Min familj är liten. Vi är fyra personer: jag, min man och våra två barn. Min man heter Hai. Han är ingenjör och hans favoritmat är pho. Vår dotter heter Linh och hennes lillebror heter Minh. De tycker om att leka tillsammans. Min syster bor i Vietnam. Hennes barn är våra kusiner. Vi pratar med dem på telefon varje söndag.",
      vi: "Gia đình tôi nhỏ. Chúng tôi gồm 4 người: tôi, chồng tôi và hai con. Chồng tôi tên là Hải. Anh ấy là kỹ sư và món yêu thích của anh là phở. Con gái tôi tên Linh và em trai bé tên Minh. Hai bé thích chơi cùng nhau. Chị tôi sống ở Việt Nam. Các con của chị là anh chị em họ của chúng tôi. Mỗi Chủ nhật chúng tôi gọi điện cho họ.",
      en: "My family is small. We are four: me, my husband and our two kids. My husband is Hai. He is an engineer and his favourite food is pho. Our daughter is Linh and her little brother is Minh. They love playing together. My sister lives in Vietnam. Her kids are our cousins. We call them every Sunday.",
      highlights: ["min man", "våra två barn", "hennes lillebror", "deras", "vår dotter"],
    },
    cultureVi:
      "Người Bắc Âu gọi 'du' (mày/cậu) cho mọi đối tượng - cả sếp, giáo sư, người già. Dùng 'ni' chỉ khi viết thư trang trọng cho khách hàng. Học sinh Việt thường ngại điều này, hãy quen dần.",
    cultureEn:
      "Nordics use 'du' for everyone - boss, professor, elderly. 'Ni' only appears in formal letters to clients. Vietnamese learners often hesitate; get used to it.",
    quiz: [
      {
        q: "Đại từ sở hữu cho 'ett namn' (một cái tên) là?",
        options: ["min", "mitt", "mina", "mig"],
        answer: 1,
        explainVi: "Ett-nouns dùng 'mitt' (mitt namn = tên tôi).",
        explainEn: "Ett-nouns take 'mitt' (mitt namn = my name).",
      },
      {
        q: "Câu nào ĐÚNG: 'Tôi thấy anh ấy'?",
        options: ["Jag ser han.", "Jag ser honom.", "Jag ser hans.", "Jag ser hen."],
        answer: 1,
        explainVi: "'Han' chỉ làm chủ ngữ. Khi làm tân ngữ phải đổi thành 'honom'.",
        explainEn: "'Han' is subject only. As object it becomes 'honom'.",
      },
      {
        q: "'Hen' được dùng khi nào?",
        options: ["Chỉ trẻ con", "Đại từ giới tính trung lập", "Chỉ phụ nữ", "Số nhiều"],
        answer: 1,
        explainVi: "'Hen' là đại từ trung tính, dùng khi không biết hoặc không muốn xác định giới tính.",
        explainEn: "'Hen' is gender-neutral, used when gender is unknown or irrelevant.",
      },
    ],
  },

  "a1-en-ett": {
    grammar: {
      titleVi: "Mạo từ en / ett: quy tắc và mẹo đoán",
      titleEn: "Articles en / ett: rules and guessing tricks",
      headers: ["Loại", "Mạo từ", "Đặc điểm", "Ví dụ", "Tiếng Việt"],
      rows: [
        ["en-words (~75%)", "en", "Người, động vật, đa số đồ vật", "en bil, en hund, en man", "xe, chó, đàn ông"],
        ["ett-words (~25%)", "ett", "Vật vô tri, danh từ nhỏ, trừu tượng", "ett barn, ett hus, ett namn", "đứa trẻ, nhà, tên"],
        ["Xác định en", "-en thêm vào cuối", "bilen, hunden, mannen", "bilen = chiếc xe đó", "Có '-en' đuôi"],
        ["Xác định ett", "-et thêm vào cuối", "barnet, huset, namnet", "barnet = đứa trẻ đó", "Có '-et' đuôi"],
        ["Số nhiều en", "-ar / -er / -or", "bilar, hundar, flickor", "Nhiều đuôi", "Học theo nhóm"],
        ["Số nhiều ett", "thường không đổi hoặc -n", "barn, hus, äpplen", "Hay giữ nguyên", "Mẹo: 'barn' đếm bằng số"],
      ],
      noteVi: "Mẹo vàng: học từ vựng luôn LUÔN đi kèm mạo từ. Đừng học 'bil', học 'EN bil'. Sai en/ett mất điểm grammar A1 ngay lập tức.",
      noteEn: "Golden tip: always learn nouns WITH the article. Don't learn 'bil', learn 'EN bil'. Wrong gender = instant A1 grammar deduction.",
    },
    dialogue: {
      titleVi: "Mô tả phòng khách bằng mạo từ xác định",
      titleEn: "Describing a living room with definite articles",
      settingVi: "Khoe căn hộ mới với bạn.",
      settingEn: "Showing a new flat to a friend.",
      lines: [
        { speaker: "Lin", sv: "Wow, lägenheten är fin!", vi: "Wow, căn hộ đẹp quá!", en: "Wow, the flat is nice!" },
        { speaker: "Mai", sv: "Tack! Här är vardagsrummet.", vi: "Cảm ơn! Đây là phòng khách.", en: "Thanks! Here's the living room." },
        { speaker: "Lin", sv: "Soffan är jättestor.", vi: "Cái sofa to ghê.", en: "The sofa is huge." },
        { speaker: "Mai", sv: "Ja, och bordet är från IKEA.", vi: "Đúng, và cái bàn là từ IKEA.", en: "Yes, and the table is from IKEA." },
        { speaker: "Lin", sv: "Vad har du för fönster!", vi: "Cửa sổ nhà bạn đẹp ghê!", en: "What windows you have!" },
        { speaker: "Mai", sv: "Det är tre fönster i rummet.", vi: "Có 3 cửa sổ trong phòng.", en: "There are three windows in the room." },
        { speaker: "Lin", sv: "Var är badrummet?", vi: "Phòng tắm ở đâu?", en: "Where's the bathroom?" },
        { speaker: "Mai", sv: "Det ligger bredvid köket.", vi: "Nằm cạnh nhà bếp.", en: "Right next to the kitchen." },
      ],
    },
    model: {
      titleVi: "Đoạn văn: căn hộ của tôi",
      titleEn: "Paragraph: my flat",
      sv: "Jag bor i en lägenhet i Vasa. Lägenheten har tre rum: ett vardagsrum, ett sovrum och ett kök. Vardagsrummet är stort och ljust. I rummet finns en soffa, ett bord och en TV. Soffan är blå och bordet är vitt. Köket är litet men praktiskt. Det finns en spis, ett kylskåp och en diskmaskin. Badrummet ligger bredvid sovrummet. Jag tycker om min lägenhet eftersom det är nära havet.",
      vi: "Tôi sống trong một căn hộ ở Vasa. Căn hộ có 3 phòng: một phòng khách, một phòng ngủ và một bếp. Phòng khách rộng và sáng. Trong phòng có một cái sofa, một cái bàn và một TV. Sofa màu xanh và bàn màu trắng. Bếp nhỏ nhưng tiện. Có một bếp nấu, một tủ lạnh và một máy rửa bát. Phòng tắm nằm cạnh phòng ngủ. Tôi thích căn hộ này vì gần biển.",
      en: "I live in a flat in Vasa. The flat has three rooms: a living room, a bedroom and a kitchen. The living room is big and bright. In the room there is a sofa, a table and a TV. The sofa is blue and the table is white. The kitchen is small but practical. There's a stove, a fridge and a dishwasher. The bathroom is next to the bedroom. I like my flat because it's near the sea.",
      highlights: ["en lägenhet → lägenheten", "ett vardagsrum → vardagsrummet", "ett kök → köket", "en soffa → soffan", "ett bord → bordet"],
    },
    cultureVi:
      "Ở Phần Lan-Thụy Điển, người ta nói 'lägenhet' (căn hộ) chứ ít dùng 'våning' như ở Stockholm. Khi đăng quảng cáo cho thuê hãy ghi đúng số phòng (3:a, 4:a) cùng với mạo từ.",
    cultureEn:
      "In Finland-Swedish, 'lägenhet' is used over 'våning' (common in Stockholm). Rental ads use room numbers like '3:a, 4:a' alongside the article.",
    quiz: [
      {
        q: "Từ nào là ett-word?",
        options: ["bil (xe)", "hund (chó)", "barn (đứa trẻ)", "kvinna (phụ nữ)"],
        answer: 2,
        explainVi: "'Barn' là ett-word duy nhất trong nhóm - vật/người nhỏ hay là ett.",
        explainEn: "'Barn' is the only ett-word here - small things/beings often take ett.",
      },
      {
        q: "Dạng xác định của 'en bok' (một quyển sách) là?",
        options: ["boket", "boken", "böker", "bok"],
        answer: 1,
        explainVi: "En-words thêm '-en' để thành dạng xác định: bok → boken.",
        explainEn: "En-words add '-en' for the definite: bok → boken.",
      },
      {
        q: "'Đứa trẻ đó' viết là?",
        options: ["barnen", "barnet", "ett barn", "barna"],
        answer: 1,
        explainVi: "Ett barn (số ít, không xác định) → barnet (xác định, có -et).",
        explainEn: "Ett barn (indefinite) → barnet (definite, with -et).",
      },
    ],
  },

  "a1-questions": {
    grammar: {
      titleVi: "8 từ để hỏi cơ bản",
      titleEn: "8 essential question words",
      headers: ["Từ hỏi", "Nghĩa", "Câu mẫu", "Tiếng Việt"],
      rows: [
        ["Vad?", "Gì / Cái gì?", "Vad heter du?", "Bạn tên gì?"],
        ["Vem?", "Ai?", "Vem är det?", "Đó là ai?"],
        ["Var?", "Ở đâu?", "Var bor du?", "Bạn sống ở đâu?"],
        ["Vart?", "Đi đâu? (chuyển động)", "Vart går du?", "Bạn đi đâu?"],
        ["När?", "Khi nào?", "När kommer du?", "Khi nào bạn đến?"],
        ["Varför?", "Vì sao?", "Varför lär du dig svenska?", "Vì sao bạn học tiếng Thụy Điển?"],
        ["Hur?", "Như thế nào?", "Hur mår du?", "Bạn khoẻ thế nào?"],
        ["Hur mycket?", "Bao nhiêu (không đếm)?", "Hur mycket kostar det?", "Cái này bao nhiêu?"],
      ],
      noteVi: "Phân biệt 'Var' (vị trí đứng yên) và 'Vart' (chuyển động đến) - lỗi hay gặp ở YKI Tala.",
      noteEn: "Distinguish 'Var' (static location) and 'Vart' (movement to) - frequent YKI Tala mistake.",
    },
    dialogue: {
      titleVi: "Phỏng vấn nhanh học viên mới",
      titleEn: "Quick interview with a new student",
      settingVi: "Cố vấn học tập hỏi thông tin học viên.",
      settingEn: "Student advisor interviewing a new learner.",
      lines: [
        { speaker: "Eva", sv: "Vad heter du?", vi: "Bạn tên gì?", en: "What's your name?" },
        { speaker: "Mai", sv: "Mai Nguyen.", vi: "Mai Nguyễn.", en: "Mai Nguyen." },
        { speaker: "Eva", sv: "Var kommer du ifrån?", vi: "Bạn đến từ đâu?", en: "Where are you from?" },
        { speaker: "Mai", sv: "Från Vietnam.", vi: "Từ Việt Nam.", en: "From Vietnam." },
        { speaker: "Eva", sv: "När kom du till Finland?", vi: "Khi nào bạn đến Phần Lan?", en: "When did you come to Finland?" },
        { speaker: "Mai", sv: "För tre år sedan.", vi: "Cách đây 3 năm.", en: "Three years ago." },
        { speaker: "Eva", sv: "Varför vill du lära dig svenska?", vi: "Vì sao bạn muốn học tiếng Thụy Điển?", en: "Why do you want to learn Swedish?" },
        { speaker: "Mai", sv: "För att jobba med kollegor på finlandssvenska.", vi: "Để làm việc với đồng nghiệp nói tiếng Thụy Điển Phần Lan.", en: "To work with Finland-Swedish colleagues." },
        { speaker: "Eva", sv: "Hur många timmar studerar du i veckan?", vi: "Bạn học bao nhiêu giờ mỗi tuần?", en: "How many hours do you study per week?" },
        { speaker: "Mai", sv: "Cirka tio timmar.", vi: "Khoảng 10 giờ.", en: "About ten hours." },
      ],
    },
    model: {
      titleVi: "Đoạn văn: tự đặt câu hỏi cho chính mình",
      titleEn: "Paragraph: questioning yourself",
      sv: "Varje söndag skriver jag svar på fem frågor: Vad har jag lärt mig den här veckan? Vem har jag pratat svenska med? Var har jag använt språket? När har jag känt mig osäker? Hur kan jag bli bättre nästa vecka? Den här rutinen hjälper mig att se mina framsteg. Att ställa rätt frågor är viktigare än att kunna alla svar.",
      vi: "Mỗi Chủ nhật tôi viết trả lời 5 câu: Tuần này tôi học được gì? Tôi đã nói tiếng Thụy Điển với ai? Tôi dùng tiếng đó ở đâu? Khi nào tôi cảm thấy không tự tin? Tuần sau tôi có thể tiến bộ thế nào? Thói quen này giúp tôi thấy tiến bộ. Đặt câu hỏi đúng quan trọng hơn biết mọi câu trả lời.",
      en: "Every Sunday I answer five questions: What did I learn this week? Who did I speak Swedish with? Where did I use the language? When did I feel unsure? How can I improve next week? This routine shows my progress. Asking the right questions matters more than knowing every answer.",
      highlights: ["Vad", "Vem", "Var", "När", "Hur"],
    },
    cultureVi:
      "Người Thụy Điển coi câu hỏi 'Hur mår du?' chỉ là lời chào, không cần kể bệnh tình. Trả lời 'Bra, tack!' rồi hỏi lại là đủ lịch sự.",
    cultureEn:
      "Swedes treat 'Hur mår du?' as just a greeting, not a real health check. Replying 'Bra, tack!' and asking back is polite enough.",
    quiz: [
      {
        q: "'Bạn đi đâu?' viết đúng là?",
        options: ["Var går du?", "Vart går du?", "När går du?", "Hur går du?"],
        answer: 1,
        explainVi: "Có chuyển động → dùng 'Vart'. 'Var' chỉ vị trí đứng yên.",
        explainEn: "Movement → 'Vart'. 'Var' is for static location.",
      },
      {
        q: "Hỏi giá tiền hợp lý nhất?",
        options: ["Hur många pengar?", "Hur mycket kostar det?", "Vad pris?", "Vem betalar?"],
        answer: 1,
        explainVi: "'Hur mycket kostar det?' = bao nhiêu tiền - câu hỏi giá chuẩn.",
        explainEn: "'Hur mycket kostar det?' is the standard price question.",
      },
      {
        q: "Câu hỏi nào yêu cầu trả lời TÊN?",
        options: ["Vad?", "Vem?", "Var?", "Varför?"],
        answer: 1,
        explainVi: "'Vem?' (ai) yêu cầu trả lời tên người.",
        explainEn: "'Vem?' (who) expects a name as answer.",
      },
    ],
  },

  "a1-colors-clothes": {
    grammar: {
      titleVi: "Tính từ chỉ màu và sự hợp en/ett/nhiều",
      titleEn: "Colour adjectives and en/ett/plural agreement",
      headers: ["Màu", "en-form", "ett-form", "Plural", "Tiếng Việt"],
      rows: [
        ["đỏ", "en röd bil", "ett rött hus", "röda bilar", "đỏ"],
        ["xanh dương", "en blå tröja", "ett blått bord", "blå/blåa bord", "xanh dương"],
        ["xanh lá", "en grön väska", "ett grönt äpple", "gröna äpplen", "xanh lá"],
        ["vàng", "en gul cykel", "ett gult ljus", "gula cyklar", "vàng"],
        ["trắng", "en vit skjorta", "ett vitt papper", "vita skjortor", "trắng"],
        ["đen", "en svart byxa", "ett svart bord", "svarta byxor", "đen"],
        ["xám", "en grå mössa", "ett grått bord", "grå/gråa bord", "xám"],
        ["nâu", "en brun rock", "ett brunt bord", "bruna rockar", "nâu"],
      ],
      noteVi: "Quy tắc: tính từ thêm -t khi danh từ là ett, thêm -a khi số nhiều. Một số tính từ ngắn (blå, grå) giữ nguyên cũng được.",
      noteEn: "Rule: add -t for ett, -a for plural. Short adjectives like blå, grå can stay unchanged in plural.",
    },
    dialogue: {
      titleVi: "Đi mua áo ở H&M",
      titleEn: "Shopping for clothes at H&M",
      settingVi: "Tại cửa hàng H&M Forum Helsinki.",
      settingEn: "At the H&M Forum store in Helsinki.",
      lines: [
        { speaker: "Mai", sv: "Hej, har ni den här tröjan i röd?", vi: "Chào, các bạn có chiếc áo này màu đỏ không?", en: "Hi, do you have this top in red?" },
        { speaker: "Säljare", sv: "Ja, vilken storlek?", vi: "Có, cỡ nào?", en: "Yes, what size?" },
        { speaker: "Mai", sv: "Storlek M, tack.", vi: "Cỡ M, cảm ơn.", en: "Size M, please." },
        { speaker: "Säljare", sv: "Varsågod. Vill du prova?", vi: "Mời bạn. Muốn thử không?", en: "Here you go. Want to try it?" },
        { speaker: "Mai", sv: "Ja, var ligger provrummet?", vi: "Có, phòng thử ở đâu?", en: "Yes, where's the fitting room?" },
        { speaker: "Säljare", sv: "Där borta till höger.", vi: "Bên kia, bên phải.", en: "Over there to the right." },
        { speaker: "Mai", sv: "Tröjan är fin men för stor. Har ni S?", vi: "Áo đẹp nhưng to quá. Có cỡ S không?", en: "It's nice but too big. Got an S?" },
        { speaker: "Säljare", sv: "Tyvärr, bara M och L kvar i den röda färgen.", vi: "Tiếc là chỉ còn M và L màu đỏ.", en: "Sorry, only M and L left in red." },
        { speaker: "Mai", sv: "Då tar jag den svarta i S istället.", vi: "Vậy tôi lấy màu đen cỡ S.", en: "Then I'll take the black one in S." },
      ],
    },
    model: {
      titleVi: "Đoạn văn: mô tả tủ quần áo",
      titleEn: "Paragraph: describing my wardrobe",
      sv: "I min garderob har jag många kläder. Jag har tre vita skjortor, två svarta byxor och en blå klänning. Min favorittröja är röd och mjuk. Till jobbet bär jag oftast en vit skjorta och en grå kavaj. På fritiden tycker jag om gröna och bruna färger. Mina barn har också många färgglada kläder: en gul jacka, ett rött par stövlar och en blå halsduk. Vintern i Finland kräver varma kläder, så vi har också tjocka rockar och ulliga mössor.",
      vi: "Trong tủ tôi có nhiều quần áo. Tôi có 3 áo sơ mi trắng, 2 quần đen và một váy xanh. Áo yêu thích của tôi màu đỏ và mềm. Đi làm tôi thường mặc sơ mi trắng và áo blazer xám. Lúc rảnh tôi thích màu xanh lá và nâu. Các con tôi cũng có nhiều đồ sặc sỡ: áo khoác vàng, đôi ủng đỏ và khăn quàng xanh. Mùa đông Phần Lan cần đồ ấm nên chúng tôi cũng có áo khoác dày và mũ len.",
      en: "In my wardrobe I have many clothes. I have three white shirts, two black trousers and a blue dress. My favourite top is red and soft. For work I usually wear a white shirt and a grey blazer. In my free time I like green and brown. My kids also have colourful clothes: a yellow jacket, red boots and a blue scarf. Finnish winters demand warm clothing, so we also have thick coats and woolly hats.",
      highlights: ["vita skjortor", "ett rött par", "tjocka rockar", "färgglada", "ulliga mössor"],
    },
    cultureVi:
      "Người Phần Lan ăn mặc tối giản và thực tế. Đến văn phòng mặc jeans + áo sơ mi cũng ổn. Mùa đông luôn có 'välikerros' (lớp giữa) như áo len mỏng - đừng quên!",
    cultureEn:
      "Finns dress minimalist and practical. Jeans + shirt at the office is fine. In winter, the 'välikerros' (mid-layer fleece) is non-negotiable.",
    quiz: [
      {
        q: "Tính từ 'röd' với 'ett hus' viết thế nào?",
        options: ["röd hus", "rött hus", "röda hus", "röden hus"],
        answer: 1,
        explainVi: "Ett-noun + tính từ → thêm -t: rött hus.",
        explainEn: "Ett-noun + adjective → add -t: rött hus.",
      },
      {
        q: "Số nhiều của 'en blå tröja' (áo xanh) là?",
        options: ["blå tröjor", "blåa tröjor", "Cả A và B đều được", "blått tröjor"],
        answer: 2,
        explainVi: "Tính từ ngắn như 'blå' có thể giữ nguyên hoặc thêm -a khi số nhiều.",
        explainEn: "Short adjectives like 'blå' can stay unchanged or take -a in plural.",
      },
      {
        q: "Khi đi mua đồ, câu nào lịch sự nhất khi hỏi cỡ khác?",
        options: ["Har ni mindre?", "Jag vill ha mindre.", "Har ni den här i en mindre storlek?", "Mindre, tack."],
        answer: 2,
        explainVi: "Câu C đầy đủ ngữ pháp + lịch sự, đúng chuẩn Tala A1.",
        explainEn: "Option C is fully formed and polite, matching A1 Tala standards.",
      },
    ],
  },

  "a1-body-health": {
    grammar: {
      titleVi: "Bộ phận cơ thể và câu nói về sức khoẻ",
      titleEn: "Body parts and health phrases",
      headers: ["Bộ phận", "Số ít", "Số nhiều", "Tiếng Việt"],
      rows: [
        ["đầu", "ett huvud", "huvuden", "đầu"],
        ["mắt", "ett öga", "ögon", "mắt"],
        ["tai", "ett öra", "öron", "tai"],
        ["mũi", "en näsa", "näsor", "mũi"],
        ["miệng", "en mun", "munnar", "miệng"],
        ["răng", "en tand", "tänder", "răng"],
        ["tay", "en hand", "händer", "tay"],
        ["chân", "en fot", "fötter", "chân"],
        ["bụng", "en mage", "magar", "bụng"],
        ["lưng", "en rygg", "ryggar", "lưng"],
      ],
      noteVi: "Mẫu nói bệnh: 'Jag har ont i + bộ phận'. Ví dụ: 'Jag har ont i huvudet' = Tôi đau đầu.",
      noteEn: "Pain template: 'Jag har ont i + body part'. e.g. 'Jag har ont i huvudet' = I have a headache.",
    },
    dialogue: {
      titleVi: "Gọi điện đặt lịch khám",
      titleEn: "Calling to book a doctor's appointment",
      settingVi: "Gọi đến trung tâm y tế Vasa.",
      settingEn: "Calling Vasa health centre.",
      lines: [
        { speaker: "Receptionist", sv: "Hej, Vasa hälsocentral.", vi: "Chào, trung tâm y tế Vasa.", en: "Hi, Vasa health centre." },
        { speaker: "Mai", sv: "Hej, jag mår dåligt och behöver träffa en läkare.", vi: "Chào, tôi không khoẻ và cần gặp bác sĩ.", en: "Hi, I'm unwell and need to see a doctor." },
        { speaker: "Receptionist", sv: "Vad är det för fel?", vi: "Bạn bị làm sao?", en: "What's wrong?" },
        { speaker: "Mai", sv: "Jag har ont i halsen och hostar mycket.", vi: "Tôi đau họng và ho nhiều.", en: "I have a sore throat and a bad cough." },
        { speaker: "Receptionist", sv: "Har du feber?", vi: "Bạn có sốt không?", en: "Do you have a fever?" },
        { speaker: "Mai", sv: "Ja, 38,5 grader sedan i går.", vi: "Có, 38,5 độ từ hôm qua.", en: "Yes, 38.5 since yesterday." },
        { speaker: "Receptionist", sv: "Kan du komma klockan tre i eftermiddag?", vi: "Bạn đến lúc 3h chiều được không?", en: "Can you come at 3 PM today?" },
        { speaker: "Mai", sv: "Ja, tack. Vart ska jag gå?", vi: "Vâng, cảm ơn. Tôi đi đâu?", en: "Yes, thanks. Where do I go?" },
        { speaker: "Receptionist", sv: "Anmäl dig i receptionen på första våningen.", vi: "Đăng ký tại quầy lễ tân tầng 1.", en: "Check in at reception on the first floor." },
      ],
    },
    model: {
      titleVi: "Đoạn văn: kể bệnh ngắn với bác sĩ",
      titleEn: "Paragraph: short symptom report to a doctor",
      sv: "God morgon doktorn. Jag mår inte bra. Sedan tre dagar har jag ont i huvudet och i halsen. Jag hostar på natten och har svårt att sova. I morse var min temperatur 38,5 grader. Jag har också ont i magen efter att jag äter. Jag tar paracetamol men det hjälper inte mycket. Jag är inte allergisk mot någon medicin. Jag vill veta vad jag har och om jag behöver vara hemma från jobbet.",
      vi: "Chào bác sĩ. Tôi không khoẻ. Ba ngày nay tôi đau đầu và đau họng. Tôi ho ban đêm và khó ngủ. Sáng nay nhiệt độ là 38,5. Tôi cũng đau bụng sau khi ăn. Tôi đang uống paracetamol nhưng không đỡ. Tôi không bị dị ứng thuốc. Tôi muốn biết mình bị gì và có cần nghỉ làm không.",
      en: "Good morning doctor. I'm not feeling well. For three days I've had a headache and sore throat. I cough at night and can't sleep. This morning my temperature was 38.5. I also have stomach pain after eating. I take paracetamol but it doesn't help much. I'm not allergic to any medicine. I want to know what I have and whether I need sick leave.",
      highlights: ["mår inte bra", "har ont i", "feber", "paracetamol", "sjukledig"],
    },
    cultureVi:
      "Ở Phần Lan, gọi 116 117 (Päivystysapu) trước khi đến phòng cấp cứu. Họ sẽ hướng dẫn nên đến đâu. Đừng đến thẳng trừ trường hợp nguy cấp.",
    cultureEn:
      "In Finland, call 116 117 (Päivystysapu) before showing up at the ER. They triage and direct you. Walking in is only for emergencies.",
    quiz: [
      {
        q: "Số nhiều của 'ett öga' (con mắt) là?",
        options: ["ögor", "ögon", "ögen", "ögat"],
        answer: 1,
        explainVi: "Bất quy tắc: öga → ögon. Học thuộc, không suy luận.",
        explainEn: "Irregular: öga → ögon. Memorise, don't guess.",
      },
      {
        q: "'Tôi đau đầu' viết đúng?",
        options: ["Jag har huvud ont.", "Jag är ont huvud.", "Jag har ont i huvudet.", "Mitt huvud är ont."],
        answer: 2,
        explainVi: "Mẫu chuẩn: 'Jag har ont i + dạng xác định của bộ phận' (huvudet).",
        explainEn: "Standard: 'Jag har ont i + definite form' (huvudet).",
      },
      {
        q: "Khi gọi 116 117 ở Phần Lan, đó là số gì?",
        options: ["Cảnh sát", "Cứu hoả", "Tư vấn y tế ngoài giờ", "Báo cháy"],
        answer: 2,
        explainVi: "116 117 là số tư vấn y tế ngoài giờ (Päivystysapu).",
        explainEn: "116 117 is the after-hours medical advice line (Päivystysapu).",
      },
    ],
  },

  "a1-daily-routine": {
    grammar: {
      titleVi: "Khung thời gian trong ngày + động từ thường dùng",
      titleEn: "Time-of-day expressions + frequent verbs",
      headers: ["Thời gian", "Tiếng Thụy Điển", "Động từ điển hình", "Câu mẫu"],
      rows: [
        ["sáng sớm", "tidigt på morgonen", "vakna, gå upp", "Jag vaknar klockan sex."],
        ["sáng", "på morgonen", "äta frukost, åka", "Jag äter frukost klockan halv åtta."],
        ["trưa", "vid lunchtid / klockan tolv", "äta lunch", "Vi äter lunch klockan ett."],
        ["chiều", "på eftermiddagen", "jobba, plugga", "På eftermiddagen jobbar jag."],
        ["tối", "på kvällen", "laga middag, titta på TV", "Jag lagar middag klockan sju."],
        ["đêm", "på natten", "sova", "Jag sover klockan elva."],
        ["cuối tuần", "på helgen", "vila, träffa vänner", "På helgen träffar jag vänner."],
      ],
      noteVi: "Quan trọng: 'klockan' (lúc) đặt TRƯỚC giờ, không phải sau như tiếng Anh. 'klockan sju' = lúc 7 giờ.",
      noteEn: "Important: 'klockan' (at) goes BEFORE the time, unlike English. 'klockan sju' = at seven.",
    },
    dialogue: {
      titleVi: "Bạn cùng phòng so lịch sinh hoạt",
      titleEn: "Flatmates comparing daily schedules",
      settingVi: "Buổi sáng cuối tuần, vừa pha cà phê.",
      settingEn: "Weekend morning, just made coffee.",
      lines: [
        { speaker: "Lin", sv: "Vad gör du på morgonen?", vi: "Sáng bạn làm gì?", en: "What do you do in the morning?" },
        { speaker: "Mai", sv: "Jag vaknar klockan sex och tar en dusch.", vi: "Tôi dậy lúc 6h và tắm.", en: "I wake up at six and shower." },
        { speaker: "Lin", sv: "Och sedan?", vi: "Rồi sao?", en: "And then?" },
        { speaker: "Mai", sv: "Jag äter frukost och åker till jobbet med spårvagnen.", vi: "Tôi ăn sáng rồi đi làm bằng tàu điện.", en: "I eat breakfast and take the tram to work." },
        { speaker: "Lin", sv: "När börjar du jobba?", vi: "Bạn bắt đầu làm khi nào?", en: "When do you start work?" },
        { speaker: "Mai", sv: "Klockan halv nio. Jag jobbar till sjutton.", vi: "Lúc 8:30. Tôi làm đến 17h.", en: "At 8:30. I work until 5 PM." },
        { speaker: "Lin", sv: "Vad gör du på kvällen?", vi: "Buổi tối bạn làm gì?", en: "What do you do in the evening?" },
        { speaker: "Mai", sv: "Jag lagar middag, läser och pluggar svenska.", vi: "Tôi nấu cơm tối, đọc sách và học tiếng Thụy Điển.", en: "I cook dinner, read and study Swedish." },
        { speaker: "Lin", sv: "Disciplinerad! Och jag som bara streamar Netflix.", vi: "Kỷ luật ghê! Còn tớ chỉ xem Netflix thôi.", en: "Disciplined! And I just stream Netflix." },
      ],
    },
    model: {
      titleVi: "Đoạn văn 100 từ: một ngày thường của tôi",
      titleEn: "100-word paragraph: my typical day",
      sv: "En vanlig vardag börjar klockan sex. Jag vaknar, tar en dusch och äter frukost: havregryn, kaffe och en frukt. Klockan halv åtta åker jag till jobbet med tåget. På jobbet svarar jag på mejl och har möten på engelska och lite på svenska. Klockan tolv äter jag lunch med kollegor i personalmatsalen. Efter jobbet handlar jag på K-Market och cyklar hem. Hemma lagar jag middag, leker med barnen och läser en bok. Innan jag sover repeterar jag tio nya svenska ord. Klockan elva släcker jag lampan.",
      vi: "Một ngày thường bắt đầu lúc 6h. Tôi dậy, tắm và ăn sáng: yến mạch, cà phê và một quả trái cây. 7:30 tôi đi làm bằng tàu. Ở công ty tôi trả lời email và họp bằng tiếng Anh và một chút tiếng Thụy Điển. 12h tôi ăn trưa với đồng nghiệp ở canteen. Sau giờ làm tôi mua đồ ở K-Market rồi đạp xe về. Ở nhà tôi nấu tối, chơi với con và đọc sách. Trước khi ngủ tôi ôn 10 từ Thụy Điển mới. 11h tôi tắt đèn.",
      en: "A typical weekday starts at six. I wake up, shower and eat breakfast: oats, coffee and a fruit. At 7:30 I take the train to work. At the office I answer emails and have meetings in English and some Swedish. At noon I have lunch with colleagues in the staff canteen. After work I shop at K-Market and cycle home. At home I cook dinner, play with the kids and read. Before bed I revise ten new Swedish words. At eleven I turn off the lamp.",
      highlights: ["En vanlig vardag", "klockan halv åtta", "personalmatsalen", "släcker jag lampan", "repeterar"],
    },
    cultureVi:
      "Người Phần Lan ăn trưa rất sớm (11h-12h) và ăn tối cũng sớm (17h-18h). Sau 20h cửa hàng đóng cửa nhiều, hãy tranh thủ mua sắm sớm.",
    cultureEn:
      "Finns eat lunch early (11-12) and dinner early (17-18). Many shops close after 20:00 - plan ahead.",
    quiz: [
      {
        q: "'Lúc 7 giờ tối' viết là?",
        options: ["sju på morgonen", "klockan sju på kvällen", "klockan sju på natten", "sjukvällen"],
        answer: 1,
        explainVi: "Sau 17h dùng 'på kvällen', 'klockan' đặt trước số giờ.",
        explainEn: "After 17h use 'på kvällen'; 'klockan' precedes the number.",
      },
      {
        q: "Động từ chia ở 'jag äter' là dạng nào?",
        options: ["Infinitiv", "Presens", "Preteritum", "Imperativ"],
        answer: 1,
        explainVi: "'Äter' là dạng presens (hiện tại) của 'att äta'.",
        explainEn: "'Äter' is the presens (present) form of 'att äta'.",
      },
      {
        q: "Tự sự lịch trình giúp Tala A1 thế nào?",
        options: ["Không cần", "Là dạng đề phổ biến", "Chỉ cho Writing", "Chỉ cho Reading"],
        answer: 1,
        explainVi: "'Berätta om en vanlig dag' là đề Tala A1 quen thuộc - học thuộc khung này rất lợi.",
        explainEn: "'Tell me about a typical day' is a frequent A1 Tala prompt - this template pays off.",
      },
    ],
  },

  "a1-hobbies": {
    grammar: {
      titleVi: "Động từ 'tycka om' / 'gilla' và cấu trúc nói sở thích",
      titleEn: "'Tycka om' / 'gilla' and hobby structures",
      headers: ["Mẫu", "Cấu trúc", "Ví dụ", "Tiếng Việt"],
      rows: [
        ["Thích + danh từ", "Jag tycker om + danh từ", "Jag tycker om musik.", "Tôi thích âm nhạc."],
        ["Thích làm gì", "Jag tycker om att + infinitiv", "Jag tycker om att läsa.", "Tôi thích đọc sách."],
        ["Gilla (đời thường)", "Jag gillar + N / att V", "Jag gillar att dansa.", "Tôi thích nhảy."],
        ["Không thích", "Jag tycker inte om + N", "Jag tycker inte om kaffe.", "Tôi không thích cà phê."],
        ["Yêu thích", "Min favorit + N + är", "Min favoritmat är phở.", "Món yêu thích của tôi là phở."],
        ["Thường xuyên", "Jag + V + ofta / sällan", "Jag spelar tennis ofta.", "Tôi hay chơi tennis."],
      ],
      noteVi: "Mẹo: dùng 'att + infinitiv' luôn an toàn (att läsa, att laga, att resa). Bỏ 'att' chỉ với 'kan/vill/ska/måste'.",
      noteEn: "Trick: 'att + infinitive' is always safe. Drop 'att' only after 'kan/vill/ska/måste'.",
    },
    dialogue: {
      titleVi: "Hỏi nhau cuối tuần làm gì",
      titleEn: "Asking about weekend plans",
      settingVi: "Thứ Sáu tan làm, đứng đợi tàu.",
      settingEn: "Friday after work, waiting for the train.",
      lines: [
        { speaker: "Erik", sv: "Vad ska du göra i helgen?", vi: "Cuối tuần bạn làm gì?", en: "What are you doing this weekend?" },
        { speaker: "Mai", sv: "Jag ska träffa min man och våra barn.", vi: "Tôi sẽ gặp chồng và các con.", en: "I'll meet my husband and kids." },
        { speaker: "Erik", sv: "Vad gillar ni att göra tillsammans?", vi: "Cả nhà thích làm gì cùng nhau?", en: "What do you all like to do together?" },
        { speaker: "Mai", sv: "Vi gillar att cykla och att laga mat. Och du?", vi: "Chúng tôi thích đạp xe và nấu ăn. Còn bạn?", en: "We like cycling and cooking. You?" },
        { speaker: "Erik", sv: "Jag tycker om att läsa och spelar fotboll på söndagar.", vi: "Tôi thích đọc sách và chơi bóng đá Chủ nhật.", en: "I like reading and play football on Sundays." },
        { speaker: "Mai", sv: "Var spelar du?", vi: "Bạn chơi ở đâu?", en: "Where do you play?" },
        { speaker: "Erik", sv: "I parken bredvid Sandviken.", vi: "Ở công viên cạnh Sandviken.", en: "In the park next to Sandviken." },
        { speaker: "Mai", sv: "Kul! Vi kanske kommer och hejar.", vi: "Vui đấy! Có khi chúng tôi qua cổ vũ.", en: "Fun! Maybe we'll drop by to cheer." },
      ],
    },
    model: {
      titleVi: "Đoạn văn: sở thích và lý do",
      titleEn: "Paragraph: hobbies and reasons",
      sv: "Jag har tre stora intressen: matlagning, fotografi och språk. Jag tycker om att laga vietnamesisk mat eftersom det påminner mig om Hanoi. Min favoritmat är phở bò. Jag fotograferar gärna när vi reser i Finland - särskilt skärgården och norrskenet. På fritiden lyssnar jag på finlandssvenska poddar för att bli bättre på språket. Jag gillar inte att titta på TV länge, men jag tycker om att läsa böcker på svenska. På helgen tränar jag yoga och cyklar med min familj.",
      vi: "Tôi có 3 đam mê lớn: nấu ăn, chụp ảnh và ngôn ngữ. Tôi thích nấu món Việt vì gợi nhớ Hà Nội. Món tôi mê nhất là phở bò. Tôi hay chụp ảnh khi đi Phần Lan, nhất là quần đảo và cực quang. Lúc rảnh tôi nghe podcast tiếng Thụy Điển Phần Lan để nâng trình. Tôi không thích xem TV lâu nhưng thích đọc sách tiếng Thụy Điển. Cuối tuần tôi tập yoga và đạp xe cùng gia đình.",
      en: "I have three main interests: cooking, photography and languages. I like cooking Vietnamese food because it reminds me of Hanoi. My favourite is phở bò. I love photographing Finland - especially the archipelago and northern lights. In my free time I listen to Finland-Swedish podcasts to improve. I dislike long TV sessions but enjoy reading Swedish books. On weekends I do yoga and cycle with my family.",
      highlights: ["tre stora intressen", "tycker om att", "skärgården", "norrskenet", "finlandssvenska poddar"],
    },
    cultureVi:
      "Người Phần Lan rất quý nếu bạn nói thích 'mökki' (nhà gỗ ven hồ), 'sauna' (xông hơi) hay 'marjastus' (đi hái dâu rừng). Đây là 3 sở thích quốc dân.",
    cultureEn:
      "Finns love hearing you enjoy 'mökki' (lakeside cabin), 'sauna' or 'marjastus' (berry-picking). These are the three national pastimes.",
    quiz: [
      {
        q: "'Tôi thích nấu ăn' viết đúng?",
        options: ["Jag tycker om laga.", "Jag tycker om att laga.", "Jag tycker om lagar.", "Jag tycker att laga."],
        answer: 1,
        explainVi: "Sau 'tycker om' khi đi với động từ phải có 'att + infinitiv'.",
        explainEn: "After 'tycker om' + verb, use 'att + infinitive'.",
      },
      {
        q: "Bỏ 'att' đúng trong câu nào?",
        options: ["Jag vill att resa.", "Jag vill resa.", "Jag gillar resa.", "Jag tycker om resa."],
        answer: 1,
        explainVi: "Sau modal verbs (vill, kan, ska, måste) bỏ 'att'.",
        explainEn: "Drop 'att' after modal verbs (vill, kan, ska, måste).",
      },
      {
        q: "Nói 'Tôi không thích cà phê' đúng?",
        options: ["Jag inte tycker om kaffe.", "Jag tycker om inte kaffe.", "Jag tycker inte om kaffe.", "Jag tycker om kaffe inte."],
        answer: 2,
        explainVi: "'Inte' đặt sau động từ chính: tycker INTE om.",
        explainEn: "'Inte' goes after the main verb: tycker INTE om.",
      },
    ],
  },

  "a1-doctor": {
    grammar: {
      titleVi: "Khung câu mô tả triệu chứng cho bác sĩ",
      titleEn: "Symptom description frames for the doctor",
      headers: ["Mục đích", "Mẫu câu", "Tiếng Việt"],
      rows: [
        ["Báo cảm giác chung", "Jag mår dåligt / Jag är sjuk.", "Tôi không khoẻ / tôi bị ốm."],
        ["Đau bộ phận", "Jag har ont i + bộ phận xác định.", "Jag har ont i magen = đau bụng."],
        ["Sốt", "Jag har feber, 38,5 grader.", "Tôi sốt 38,5 độ."],
        ["Thời gian", "Sedan + thời gian.", "Sedan tre dagar = từ 3 ngày trước."],
        ["Dị ứng", "Jag är allergisk mot + chất.", "Jag är allergisk mot penicillin."],
        ["Yêu cầu", "Kan jag få + đơn thuốc?", "Kan jag få ett recept?"],
        ["Xin nghỉ ốm", "Jag behöver ett sjukintyg.", "Tôi cần giấy nghỉ ốm."],
      ],
      noteVi: "Ở Phần Lan giấy nghỉ ốm gọi là 'sjukintyg' (Sv) / 'sairauslomatodistus' (Fi). Thường được cấp khi nghỉ trên 3 ngày.",
      noteEn: "In Finland, the sick note is 'sjukintyg'/'sairauslomatodistus', usually issued for absences over 3 days.",
    },
    dialogue: {
      titleVi: "Khám bác sĩ tổng quát",
      titleEn: "Visit to the GP",
      settingVi: "Phòng khám trung tâm y tế Vasa.",
      settingEn: "Vasa health centre consultation room.",
      lines: [
        { speaker: "Läkare", sv: "Hej, vad är det för fel?", vi: "Chào, bạn bị gì?", en: "Hi, what's wrong?" },
        { speaker: "Mai", sv: "Jag har ont i halsen och hostar mycket.", vi: "Tôi đau họng và ho nhiều.", en: "I have a sore throat and bad cough." },
        { speaker: "Läkare", sv: "Hur länge har du varit sjuk?", vi: "Bạn ốm bao lâu rồi?", en: "How long have you been sick?" },
        { speaker: "Mai", sv: "Sedan fyra dagar.", vi: "Từ 4 ngày trước.", en: "For four days." },
        { speaker: "Läkare", sv: "Har du feber?", vi: "Có sốt không?", en: "Any fever?" },
        { speaker: "Mai", sv: "Ja, 38,2 grader i morse.", vi: "Có, 38,2 độ sáng nay.", en: "Yes, 38.2 this morning." },
        { speaker: "Läkare", sv: "Öppna munnen, jag ska titta.", vi: "Mở miệng nào, tôi xem nhé.", en: "Open your mouth, I'll have a look." },
        { speaker: "Mai", sv: "Är det allvarligt?", vi: "Có nghiêm trọng không?", en: "Is it serious?" },
        { speaker: "Läkare", sv: "Nej, det är en virusinfektion. Vila och drick mycket vatten.", vi: "Không, là nhiễm virus. Hãy nghỉ và uống nhiều nước.", en: "No, just a virus. Rest and drink plenty of water." },
        { speaker: "Mai", sv: "Kan jag få ett sjukintyg för tre dagar?", vi: "Tôi có thể xin giấy nghỉ 3 ngày không?", en: "May I get a sick note for three days?" },
        { speaker: "Läkare", sv: "Absolut. Du får det vid receptionen.", vi: "Chắc chắn. Bạn nhận ở lễ tân.", en: "Of course. You'll get it at reception." },
      ],
    },
    model: {
      titleVi: "Đoạn văn: kể lại buổi khám với gia đình",
      titleEn: "Paragraph: telling family about the visit",
      sv: "Igår var jag hos läkaren på Vasa hälsocentral. Jag har varit sjuk sedan fyra dagar. Jag berättade att jag har ont i halsen, hostar och har feber. Läkaren tittade i halsen och lyssnade på mina lungor. Hon sa att det är en virusinfektion. Jag fick inte antibiotika men hon skrev ett sjukintyg för tre dagar. Hon rekommenderade att jag dricker mycket vatten, vilar och tar paracetamol mot febern. Nu mår jag lite bättre och hoppas att jag kan jobba igen på måndag.",
      vi: "Hôm qua tôi đi khám tại trung tâm y tế Vasa. Tôi ốm 4 ngày rồi. Tôi kể với bác sĩ là đau họng, ho và sốt. Bác sĩ xem họng và nghe phổi. Cô ấy nói là nhiễm virus. Tôi không cần kháng sinh nhưng được cấp giấy nghỉ 3 ngày. Cô ấy khuyên uống nhiều nước, nghỉ ngơi và uống paracetamol hạ sốt. Giờ tôi đỡ hơn và mong thứ Hai đi làm lại được.",
      en: "Yesterday I saw a doctor at Vasa health centre. I've been sick for four days. I explained I have a sore throat, cough and fever. The doctor checked my throat and lungs. She said it's a viral infection. I wasn't prescribed antibiotics but got a 3-day sick note. She recommended water, rest and paracetamol. I feel a bit better and hope to work again on Monday.",
      highlights: ["virusinfektion", "antibiotika", "sjukintyg", "rekommenderade", "lyssnade på mina lungor"],
    },
    cultureVi:
      "Bác sĩ Phần Lan hiếm khi kê kháng sinh cho viêm họng do virus - đây là khác biệt lớn với Việt Nam. Đừng đòi kháng sinh, hãy tin chỉ định 'vila + vätska'.",
    cultureEn:
      "Finnish doctors rarely prescribe antibiotics for viral sore throats - a big difference from Vietnam. Don't demand antibiotics, trust the 'rest + fluids' advice.",
    quiz: [
      {
        q: "Bạn đau bụng 5 ngày, câu nào đúng nhất?",
        options: ["Jag har ont mage 5 dagar.", "Jag har ont i magen sedan fem dagar.", "Min mage gör ont 5 dagar.", "Jag är ont mage."],
        answer: 1,
        explainVi: "'Sedan' báo điểm bắt đầu thời gian; bộ phận luôn ở dạng xác định (magen).",
        explainEn: "'Sedan' marks the start of duration; the body part takes definite form (magen).",
      },
      {
        q: "Giấy nghỉ ốm gọi là gì?",
        options: ["sjukrecept", "sjukintyg", "sjuksköterska", "sjuktagare"],
        answer: 1,
        explainVi: "'Sjukintyg' = giấy chứng nhận ốm. Sjuksköterska = y tá.",
        explainEn: "'Sjukintyg' = sick certificate. Sjuksköterska = nurse.",
      },
      {
        q: "Cách nói 'Tôi bị dị ứng penicillin' đúng?",
        options: ["Jag har allergi mot penicillin.", "Jag är allergisk mot penicillin.", "Jag allergisk penicillin.", "Min allergi är penicillin."],
        answer: 1,
        explainVi: "Cấu trúc chuẩn: Jag är allergisk MOT + chất.",
        explainEn: "Standard: Jag är allergisk MOT + substance.",
      },
    ],
  },

  "a1-shopping": {
    grammar: {
      titleVi: "Mẫu câu mua sắm chuẩn YKI",
      titleEn: "Standard shopping phrases for YKI",
      headers: ["Mục đích", "Mẫu Thụy Điển", "Tiếng Việt"],
      rows: [
        ["Bắt chuyện", "Hej, kan du hjälpa mig?", "Chào, bạn giúp tôi được không?"],
        ["Hỏi giá", "Hur mycket kostar det?", "Cái này bao nhiêu?"],
        ["Hỏi sản phẩm", "Har ni + N + i + màu/kích cỡ?", "Cửa hàng có + N + màu/cỡ...?"],
        ["Yêu cầu thử", "Kan jag prova den?", "Tôi thử được không?"],
        ["Khuyến mãi", "Är det rea / nedsatt pris?", "Đang giảm giá à?"],
        ["Trả tiền", "Jag betalar med kort / kontant.", "Tôi trả thẻ / tiền mặt."],
        ["Túi", "Vill du ha en påse?", "Bạn lấy túi không?"],
        ["Hoàn hàng", "Kan jag byta/lämna tillbaka det här?", "Tôi đổi/trả lại được không?"],
      ],
      noteVi: "Đa số siêu thị Phần Lan KHÔNG cho túi miễn phí. Câu hỏi 'Vill du ha en påse?' luôn xuất hiện - hãy đáp gọn 'Ja, en stor tack' hoặc 'Nej tack'.",
      noteEn: "Most Finnish shops don't give free bags. Expect 'Vill du ha en påse?' - reply briefly: 'Ja, en stor tack' or 'Nej tack'.",
    },
    dialogue: {
      titleVi: "Mua đồ ở K-Market",
      titleEn: "Shopping at K-Market",
      settingVi: "Quầy thanh toán K-Market.",
      settingEn: "K-Market checkout.",
      lines: [
        { speaker: "Kassör", sv: "Hej, har du stamkundskort?", vi: "Chào, bạn có thẻ khách quen không?", en: "Hi, do you have a loyalty card?" },
        { speaker: "Mai", sv: "Nej, jag har inte.", vi: "Không, tôi không có.", en: "No, I don't." },
        { speaker: "Kassör", sv: "Det blir tjugotvå euro och femtio cent.", vi: "Tổng 22 euro 50 cent.", en: "That's 22.50." },
        { speaker: "Mai", sv: "Kan jag betala med kort?", vi: "Tôi trả thẻ được không?", en: "Can I pay by card?" },
        { speaker: "Kassör", sv: "Självklart. Knappa in koden.", vi: "Tất nhiên. Nhập mã PIN nhé.", en: "Sure, enter your PIN." },
        { speaker: "Mai", sv: "Klart.", vi: "Xong.", en: "Done." },
        { speaker: "Kassör", sv: "Vill du ha en påse?", vi: "Bạn lấy túi không?", en: "Want a bag?" },
        { speaker: "Mai", sv: "Ja tack, en stor.", vi: "Có, một túi to.", en: "Yes please, a big one." },
        { speaker: "Kassör", sv: "Den kostar trettio cent extra. Här är kvittot. Trevlig dag!", vi: "Túi 30 cent. Đây là hoá đơn. Chúc một ngày vui!", en: "It's 30 cents extra. Here's the receipt. Have a nice day!" },
      ],
    },
    model: {
      titleVi: "Đoạn văn: kế hoạch đi chợ cuối tuần",
      titleEn: "Paragraph: weekend grocery plan",
      sv: "Varje lördag morgon går jag och min man till K-Market i centrum. Vi skriver en inköpslista först: bröd, mjölk, ägg, kyckling, ris och grönsaker. Vi tittar också på reaerbjudanden eftersom det sparar pengar. Jag älskar att jämföra priser per kilo. Vid kassan betalar jag med kort och tar alltid med en återanvändbar tygpåse. Efter affären köper vi kanelbullar på Robert's Coffee och dricker kaffe tillsammans. Det är vårt favoritrutin för helgen.",
      vi: "Mỗi sáng thứ Bảy tôi và chồng đi K-Market trung tâm. Trước tiên chúng tôi viết danh sách mua: bánh mì, sữa, trứng, gà, gạo và rau. Chúng tôi cũng xem khuyến mãi để tiết kiệm. Tôi thích so giá theo kg. Ở quầy tôi trả thẻ và luôn mang túi vải tái sử dụng. Sau đó hai vợ chồng mua bánh quế Robert's Coffee và uống cà phê cùng nhau. Đó là thói quen cuối tuần yêu thích.",
      en: "Every Saturday morning my husband and I go to K-Market in the centre. We first write a shopping list: bread, milk, eggs, chicken, rice and veggies. We also check for promotions to save money. I love comparing prices per kilo. At the till I pay by card and always bring a reusable cloth bag. After shopping we get cinnamon buns at Robert's Coffee and have coffee together. It's our favourite weekend ritual.",
      highlights: ["inköpslista", "reaerbjudanden", "återanvändbar tygpåse", "per kilo", "kanelbullar"],
    },
    cultureVi:
      "Người Bắc Âu cực kỳ quen với việc tự đóng đồ vào túi tại quầy - đừng chờ kassör đóng giúp. Họ cũng dùng app S-mobiili hoặc K-Plussa để tích điểm.",
    cultureEn:
      "Nordics expect customers to bag their own groceries - don't wait for the cashier. They also use S-mobiili or K-Plussa apps for loyalty points.",
    quiz: [
      {
        q: "Hỏi 'Cái áo này bao nhiêu?' đúng nhất?",
        options: ["Hur många kostar tröjan?", "Hur mycket är tröjan kostar?", "Hur mycket kostar tröjan?", "Vad mycket är tröjan?"],
        answer: 2,
        explainVi: "'Hur mycket kostar + chủ ngữ' là mẫu câu giá tiêu chuẩn.",
        explainEn: "'Hur mycket kostar + subject' is the standard price question.",
      },
      {
        q: "Khi nhân viên hỏi 'Vill du ha en påse?', đáp lịch sự nhất?",
        options: ["Ja.", "Nej.", "Ja tack, en stor.", "Påse, ja."],
        answer: 2,
        explainVi: "Thêm 'tack' và mô tả kích cỡ là cách trả lời chuẩn YKI A1.",
        explainEn: "Adding 'tack' + size is the YKI A1 standard reply.",
      },
      {
        q: "Thẻ khách quen ở K-Market gọi là?",
        options: ["S-mobiili", "K-Plussa", "Bonuskort", "Stamkund"],
        answer: 1,
        explainVi: "K-Plussa của K-Market; S-mobiili của S-ryhmä.",
        explainEn: "K-Plussa for K-Market; S-mobiili for S-Group.",
      },
    ],
  },
};

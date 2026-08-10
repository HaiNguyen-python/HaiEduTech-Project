/**
 * @file swedishReadingPassagesExpansion6.ts
 * @description Sixth Läsförståelse pack - more A1, A2 and B1 passages for the
 *              Swedish Reading Lab. Every question carries a native sv-SE
 *              prompt (questionSv) and Swedish-only options.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishReadingPassage, SwedishReadingQuestion } from "./swedishReadingPassages";

const tf = (
  id: string,
  questionSv: string,
  questionVi: string,
  questionEn: string,
  correct: 0 | 1,
  explanationVi: string,
): SwedishReadingQuestion => ({
  id,
  kind: "truefalse",
  questionSv,
  questionVi,
  questionEn,
  options: [
    { sv: "Sant", vi: "Đúng" },
    { sv: "Falskt", vi: "Sai" },
  ],
  correctIndex: correct,
  explanationVi,
});

export const SWEDISH_READING_PASSAGES_EXPANSION_6: SwedishReadingPassage[] = [
  // ═══════════════════════════ A1 ═══════════════════════════
  {
    id: "rd6-a1-bibliotek",
    level: "A1",
    type: "notice",
    titleSv: "Anslag: Biblioteket",
    titleVi: "Thông báo: Thư viện",
    titleEn: "Notice: The library",
    contextVi: "Bảng thông báo ở cửa thư viện thành phố.",
    textSv:
      "STADSBIBLIOTEKET\n\n" +
      "Öppet måndag till fredag 10.00-19.00. Lördag 11.00-15.00. Söndag stängt.\n\n" +
      "Lånekortet är gratis. Ta med legitimation när du skaffar kort.\n" +
      "Du får låna böcker i fyra veckor. Filmer får du låna i en vecka.\n\n" +
      "Var tyst i läsesalen. Mat och dryck är inte tillåtet bland böckerna.\n" +
      "Datorer finns på plan två. Wifi är gratis för alla besökare.",
    textVi:
      "THƯ VIỆN THÀNH PHỐ\n\n" +
      "Mở cửa thứ Hai đến thứ Sáu 10.00-19.00. Thứ Bảy 11.00-15.00. Chủ nhật đóng cửa.\n\n" +
      "Thẻ mượn miễn phí. Mang theo giấy tờ tùy thân khi làm thẻ.\n" +
      "Bạn được mượn sách trong bốn tuần. Phim được mượn một tuần.\n\n" +
      "Hãy giữ yên lặng trong phòng đọc. Không được mang đồ ăn thức uống vào khu sách.\n" +
      "Máy tính ở tầng hai. Wifi miễn phí cho mọi khách.",
    keyVocab: [
      { sv: "lånekort", vi: "thẻ mượn sách" },
      { sv: "legitimation", vi: "giấy tờ tùy thân" },
      { sv: "läsesal", vi: "phòng đọc" },
      { sv: "stängt", vi: "đóng cửa" },
    ],
    estimatedMinutes: 3,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Vilken dag är biblioteket stängt?",
        questionVi: "Thư viện đóng cửa ngày nào?",
        questionEn: "Which day is the library closed?",
        options: [
          { sv: "Måndag", vi: "Thứ Hai" },
          { sv: "Lördag", vi: "Thứ Bảy" },
          { sv: "Söndag", vi: "Chủ nhật" },
          { sv: "Fredag", vi: "Thứ Sáu" },
        ],
        correctIndex: 2,
        explanationVi: "'Söndag stängt'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Hur länge får man låna en bok?",
        questionVi: "Được mượn sách bao lâu?",
        questionEn: "How long can you borrow a book?",
        options: [
          { sv: "En vecka", vi: "1 tuần" },
          { sv: "Två veckor", vi: "2 tuần" },
          { sv: "Fyra veckor", vi: "4 tuần" },
          { sv: "En månad och en vecka", vi: "5 tuần" },
        ],
        correctIndex: 2,
        explanationVi: "'låna böcker i fyra veckor'.",
      },
      tf("q3", "Lånekortet kostar pengar.", "Thẻ mượn mất phí.", "The library card costs money.", 1, "'Lånekortet är gratis'."),
      tf("q4", "Datorerna finns på plan två.", "Máy tính ở tầng hai.", "The computers are on floor two.", 0, "'Datorer finns på plan två'."),
      {
        id: "q5",
        kind: "vocab",
        questionSv: "Vad betyder 'läsesal'?",
        questionVi: "'läsesal' nghĩa là gì?",
        questionEn: "What does 'läsesal' mean?",
        options: [
          { sv: "Ett tyst rum där man läser", vi: "Phòng yên tĩnh để đọc" },
          { sv: "Ett kafé i biblioteket", vi: "Quán cà phê" },
          { sv: "En hylla med filmer", vi: "Kệ phim" },
          { sv: "En dator på plan två", vi: "Máy tính tầng hai" },
        ],
        correctIndex: 0,
        explanationVi: "'läsesal' = phòng đọc yên tĩnh.",
      },
    ],
  },
  {
    id: "rd6-a1-vaderprognos",
    level: "A1",
    type: "notice",
    titleSv: "Vädret i veckan",
    titleVi: "Thời tiết trong tuần",
    titleEn: "The weather this week",
    contextVi: "Bản tin thời tiết ngắn trên điện thoại.",
    textSv:
      "VÄDRET I VECKAN\n\n" +
      "Måndag: sol och tio grader. En bra dag för en promenad.\n" +
      "Tisdag: moln, sju grader. Ta med en jacka.\n" +
      "Onsdag: regn hela dagen. Glöm inte paraplyet.\n" +
      "Torsdag: blåst och fem grader.\n" +
      "Fredag: sol igen, tolv grader. Den varmaste dagen i veckan.\n\n" +
      "På helgen kommer mer regn. Kör försiktigt på vägarna.",
    textVi:
      "THỜI TIẾT TRONG TUẦN\n\n" +
      "Thứ Hai: nắng và 10 độ. Ngày đẹp để đi dạo.\n" +
      "Thứ Ba: nhiều mây, 7 độ. Nhớ mang áo khoác.\n" +
      "Thứ Tư: mưa cả ngày. Đừng quên ô.\n" +
      "Thứ Năm: gió và 5 độ.\n" +
      "Thứ Sáu: nắng trở lại, 12 độ. Ngày ấm nhất tuần.\n\n" +
      "Cuối tuần sẽ mưa nhiều hơn. Lái xe cẩn thận.",
    keyVocab: [
      { sv: "moln", vi: "mây" },
      { sv: "paraply", vi: "cái ô" },
      { sv: "blåst", vi: "gió mạnh" },
      { sv: "grader", vi: "độ (nhiệt độ)" },
    ],
    estimatedMinutes: 3,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Vilken dag regnar det hela dagen?",
        questionVi: "Ngày nào mưa cả ngày?",
        questionEn: "Which day does it rain all day?",
        options: [
          { sv: "Måndag", vi: "Thứ Hai" },
          { sv: "Onsdag", vi: "Thứ Tư" },
          { sv: "Torsdag", vi: "Thứ Năm" },
          { sv: "Fredag", vi: "Thứ Sáu" },
        ],
        correctIndex: 1,
        explanationVi: "'Onsdag: regn hela dagen'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Vilken dag är varmast?",
        questionVi: "Ngày nào ấm nhất?",
        questionEn: "Which day is warmest?",
        options: [
          { sv: "Tisdag", vi: "Thứ Ba" },
          { sv: "Onsdag", vi: "Thứ Tư" },
          { sv: "Fredag", vi: "Thứ Sáu" },
          { sv: "Torsdag", vi: "Thứ Năm" },
        ],
        correctIndex: 2,
        explanationVi: "'Fredag: ... tolv grader. Den varmaste dagen'.",
      },
      tf("q3", "På torsdag blåser det.", "Thứ Năm có gió.", "It is windy on Thursday.", 0, "'Torsdag: blåst och fem grader'."),
      tf("q4", "Helgen blir helt torr.", "Cuối tuần hoàn toàn khô ráo.", "The weekend will be dry.", 1, "'På helgen kommer mer regn'."),
      {
        id: "q5",
        kind: "vocab",
        questionSv: "När behöver du ett paraply?",
        questionVi: "Khi nào bạn cần ô?",
        questionEn: "When do you need an umbrella?",
        options: [
          { sv: "När det regnar", vi: "Khi trời mưa" },
          { sv: "När solen skiner", vi: "Khi trời nắng" },
          { sv: "När det är varmt", vi: "Khi trời nóng" },
          { sv: "När du sover", vi: "Khi ngủ" },
        ],
        correctIndex: 0,
        explanationVi: "'regn ... Glöm inte paraplyet'.",
      },
    ],
  },
  {
    id: "rd6-a1-lakartid",
    level: "A1",
    type: "email",
    titleSv: "SMS: Tid hos vårdcentralen",
    titleVi: "Tin nhắn: Lịch hẹn trạm y tế",
    titleEn: "SMS: Appointment at the health centre",
    contextVi: "Tin nhắn xác nhận lịch khám từ trạm y tế.",
    textSv:
      "Hej Linh!\n\n" +
      "Du har en tid hos sjuksköterskan Anna på tisdag den 12 maj klockan 09.30.\n" +
      "Kom tio minuter tidigare och ta med ditt id-kort.\n\n" +
      "Besöket kostar 20 euro. Du kan betala med kort.\n" +
      "Om du inte kan komma, ring oss senast en dag före på 09 555 200. Annars får du betala ändå.\n\n" +
      "Hälsningar,\nVårdcentralen Norra",
    textVi:
      "Chào Linh!\n\n" +
      "Bạn có hẹn với y tá Anna vào thứ Ba ngày 12 tháng Năm lúc 09.30.\n" +
      "Hãy đến sớm 10 phút và mang theo thẻ căn cước.\n\n" +
      "Lần khám tốn 20 euro. Bạn có thể trả bằng thẻ.\n" +
      "Nếu không đến được, hãy gọi trước ít nhất một ngày, số 09 555 200. Nếu không bạn vẫn phải trả tiền.\n\n" +
      "Trân trọng,\nTrạm y tế Norra",
    keyVocab: [
      { sv: "vårdcentral", vi: "trạm y tế" },
      { sv: "sjuksköterska", vi: "y tá" },
      { sv: "besök", vi: "lần khám" },
      { sv: "senast", vi: "chậm nhất" },
    ],
    estimatedMinutes: 3,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Vilken tid är besöket?",
        questionVi: "Cuộc hẹn lúc mấy giờ?",
        questionEn: "What time is the appointment?",
        options: [
          { sv: "09.30", vi: "09.30" },
          { sv: "10.30", vi: "10.30" },
          { sv: "12.00", vi: "12.00" },
          { sv: "19.30", vi: "19.30" },
        ],
        correctIndex: 0,
        explanationVi: "'klockan 09.30'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Vad ska Linh ta med sig?",
        questionVi: "Linh cần mang gì?",
        questionEn: "What should Linh bring?",
        options: [
          { sv: "Ett id-kort", vi: "Thẻ căn cước" },
          { sv: "En bok", vi: "Một quyển sách" },
          { sv: "Mat", vi: "Đồ ăn" },
          { sv: "Ett paraply", vi: "Cái ô" },
        ],
        correctIndex: 0,
        explanationVi: "'ta med ditt id-kort'.",
      },
      tf("q3", "Linh ska komma tio minuter tidigare.", "Linh nên đến sớm 10 phút.", "Linh should arrive ten minutes early.", 0, "'Kom tio minuter tidigare'."),
      tf("q4", "Besöket är gratis.", "Buổi khám miễn phí.", "The visit is free.", 1, "'Besöket kostar 20 euro'."),
      {
        id: "q5",
        kind: "mcq",
        questionSv: "Vad måste Linh göra om hon inte kan komma?",
        questionVi: "Nếu không đến được thì Linh phải làm gì?",
        questionEn: "What must Linh do if she cannot come?",
        options: [
          { sv: "Ringa senast en dag före", vi: "Gọi trước ít nhất một ngày" },
          { sv: "Skicka ett brev", vi: "Gửi thư" },
          { sv: "Komma en annan tid utan att säga något", vi: "Tự đến giờ khác" },
          { sv: "Betala 40 euro", vi: "Trả 40 euro" },
        ],
        correctIndex: 0,
        explanationVi: "'ring oss senast en dag före'.",
      },
    ],
  },

  // ═══════════════════════════ A2 ═══════════════════════════
  {
    id: "rd6-a2-jobbannons",
    level: "A2",
    type: "ad",
    titleSv: "Platsannons: Kafébiträde sökes",
    titleVi: "Tin tuyển dụng: Nhân viên quán cà phê",
    titleEn: "Job ad: Café assistant wanted",
    contextVi: "Tin tuyển dụng bán thời gian ở một quán cà phê nhỏ.",
    textSv:
      "KAFÉ SOLSIDAN SÖKER KAFÉBITRÄDE\n\n" +
      "Vi är ett litet kafé nära torget och söker en ny kollega på deltid, cirka 20 timmar i veckan. " +
      "Arbetet består av att ta emot beställningar, brygga kaffe, baka enkla bullar och hålla rent i lokalen.\n\n" +
      "Vi söker dig som är glad, punktlig och tycker om att prata med kunder. " +
      "Du behöver kunna svenska på grundnivå. Erfarenhet av kafé eller restaurang är en fördel, men vi lär dig gärna allt du behöver.\n\n" +
      "Arbetstiderna är vardagar 07.00-12.00 och varannan lördag. Lönen följer kollektivavtalet.\n\n" +
      "Skicka din ansökan till jobb@kafesolsidan.fi senast den 30 april. Skriv kort om dig själv och när du kan börja. " +
      "Vi intervjuar löpande, så vänta inte för länge.",
    textVi:
      "QUÁN CÀ PHÊ SOLSIDAN TUYỂN NHÂN VIÊN\n\n" +
      "Chúng tôi là quán nhỏ gần quảng trường, cần tuyển đồng nghiệp làm bán thời gian khoảng 20 giờ/tuần. " +
      "Công việc gồm nhận đơn, pha cà phê, nướng bánh đơn giản và giữ vệ sinh quán.\n\n" +
      "Chúng tôi tìm người vui vẻ, đúng giờ và thích trò chuyện với khách. " +
      "Bạn cần biết tiếng Thụy Điển cơ bản. Có kinh nghiệm quán cà phê/nhà hàng là lợi thế, nhưng chúng tôi sẵn sàng đào tạo.\n\n" +
      "Giờ làm: ngày thường 07.00-12.00 và cách tuần làm thứ Bảy. Lương theo thỏa ước lao động.\n\n" +
      "Gửi đơn tới jobb@kafesolsidan.fi chậm nhất ngày 30 tháng Tư. Viết ngắn về bản thân và thời gian có thể bắt đầu. " +
      "Chúng tôi phỏng vấn liên tục nên đừng chờ lâu.",
    keyVocab: [
      { sv: "deltid", vi: "bán thời gian" },
      { sv: "punktlig", vi: "đúng giờ" },
      { sv: "erfarenhet", vi: "kinh nghiệm" },
      { sv: "ansökan", vi: "đơn xin việc" },
      { sv: "löpande", vi: "liên tục" },
    ],
    estimatedMinutes: 5,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Hur många timmar i veckan gäller tjänsten?",
        questionVi: "Công việc bao nhiêu giờ mỗi tuần?",
        questionEn: "How many hours per week is the job?",
        options: [
          { sv: "Cirka 10 timmar", vi: "Khoảng 10 giờ" },
          { sv: "Cirka 20 timmar", vi: "Khoảng 20 giờ" },
          { sv: "Cirka 30 timmar", vi: "Khoảng 30 giờ" },
          { sv: "Heltid, 40 timmar", vi: "Toàn thời gian 40 giờ" },
        ],
        correctIndex: 1,
        explanationVi: "'deltid, cirka 20 timmar i veckan'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Vad ingår INTE i arbetsuppgifterna?",
        questionVi: "Việc nào KHÔNG thuộc nhiệm vụ?",
        questionEn: "Which task is NOT included?",
        options: [
          { sv: "Att brygga kaffe", vi: "Pha cà phê" },
          { sv: "Att baka enkla bullar", vi: "Nướng bánh đơn giản" },
          { sv: "Att sköta kaféets bokföring", vi: "Làm kế toán cho quán" },
          { sv: "Att hålla rent i lokalen", vi: "Giữ vệ sinh quán" },
        ],
        correctIndex: 2,
        explanationVi: "Trong tin không nhắc đến kế toán (bokföring).",
      },
      tf("q3", "Man måste ha lång erfarenhet för att söka jobbet.", "Phải có nhiều kinh nghiệm mới được ứng tuyển.", "You must have long experience to apply.", 1, "'Erfarenhet ... är en fördel, men vi lär dig gärna allt'."),
      tf("q4", "Ansökan skickas med e-post.", "Đơn được gửi qua email.", "The application is sent by email.", 0, "'Skicka din ansökan till jobb@kafesolsidan.fi'."),
      {
        id: "q5",
        kind: "vocab",
        questionSv: "Vad betyder 'punktlig'?",
        questionVi: "'punktlig' nghĩa là gì?",
        questionEn: "What does 'punktlig' mean?",
        options: [
          { sv: "Att alltid komma i tid", vi: "Luôn đến đúng giờ" },
          { sv: "Att vara mycket stark", vi: "Rất khỏe" },
          { sv: "Att arbeta snabbt", vi: "Làm nhanh" },
          { sv: "Att kunna många språk", vi: "Biết nhiều thứ tiếng" },
        ],
        correctIndex: 0,
        explanationVi: "'punktlig' = đúng giờ.",
      },
      {
        id: "q6",
        kind: "mcq",
        questionSv: "Varför ska man ansöka snabbt?",
        questionVi: "Vì sao nên nộp đơn sớm?",
        questionEn: "Why should you apply quickly?",
        options: [
          { sv: "För att lönen sjunker senare", vi: "Vì lương sẽ giảm" },
          { sv: "För att de intervjuar löpande", vi: "Vì họ phỏng vấn liên tục" },
          { sv: "För att kaféet stänger i maj", vi: "Vì quán đóng cửa tháng Năm" },
          { sv: "För att jobbet börjar i dag", vi: "Vì việc bắt đầu hôm nay" },
        ],
        correctIndex: 1,
        explanationVi: "'Vi intervjuar löpande, så vänta inte för länge'.",
      },
    ],
  },
  {
    id: "rd6-a2-hyresavtal",
    level: "A2",
    type: "notice",
    titleSv: "Information till nya hyresgäster",
    titleVi: "Thông tin cho người thuê nhà mới",
    titleEn: "Information for new tenants",
    contextVi: "Tờ hướng dẫn bạn nhận khi ký hợp đồng thuê căn hộ.",
    textSv:
      "VÄLKOMMEN TILL DITT NYA HEM\n\n" +
      "Hyran ska betalas senast den femte varje månad. Använd alltid referensnumret på fakturan, annars hittar vi inte din betalning.\n\n" +
      "I hyran ingår vatten och värme. El betalar du själv till elbolaget. Kom ihåg att teckna elavtal innan du flyttar in, annars är lägenheten utan ström.\n\n" +
      "Efter klockan 22.00 gäller nattro. Spela inte hög musik och undvik att tvätta eller borra på natten.\n\n" +
      "Sopor sorteras i soprummet på gården: papper, kartong, glas, metall, bioavfall och blandavfall. Möbler och elektronik får inte lämnas där utan körs till återvinningscentralen.\n\n" +
      "Vid fel i lägenheten gör du en felanmälan på vår webbplats. Akuta problem, till exempel vattenläckage, ringer du in direkt dygnet runt.",
    textVi:
      "CHÀO MỪNG ĐẾN NHÀ MỚI\n\n" +
      "Tiền thuê phải trả chậm nhất ngày mùng 5 hằng tháng. Luôn dùng mã tham chiếu trên hóa đơn, nếu không chúng tôi không tìm ra khoản thanh toán.\n\n" +
      "Tiền thuê đã gồm nước và sưởi. Tiền điện bạn tự trả cho công ty điện. Nhớ ký hợp đồng điện trước khi dọn vào, nếu không căn hộ sẽ không có điện.\n\n" +
      "Sau 22.00 là giờ yên tĩnh ban đêm. Không mở nhạc to, tránh giặt đồ hay khoan tường ban đêm.\n\n" +
      "Rác được phân loại trong phòng rác ở sân: giấy, bìa, thủy tinh, kim loại, rác hữu cơ và rác hỗn hợp. Đồ nội thất và đồ điện tử không được để đó mà phải mang tới trung tâm tái chế.\n\n" +
      "Khi có hỏng hóc, hãy báo lỗi trên trang web. Sự cố khẩn cấp như rò nước thì gọi trực tiếp, phục vụ 24/7.",
    keyVocab: [
      { sv: "hyra", vi: "tiền thuê" },
      { sv: "referensnummer", vi: "mã tham chiếu" },
      { sv: "nattro", vi: "giờ yên tĩnh ban đêm" },
      { sv: "felanmälan", vi: "báo hỏng" },
      { sv: "återvinningscentral", vi: "trung tâm tái chế" },
    ],
    estimatedMinutes: 5,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "När senast ska hyran betalas?",
        questionVi: "Hạn chót trả tiền thuê?",
        questionEn: "When at the latest must the rent be paid?",
        options: [
          { sv: "Den första varje månad", vi: "Ngày 1 hằng tháng" },
          { sv: "Den femte varje månad", vi: "Ngày 5 hằng tháng" },
          { sv: "Den femtonde varje månad", vi: "Ngày 15 hằng tháng" },
          { sv: "Den sista varje månad", vi: "Ngày cuối tháng" },
        ],
        correctIndex: 1,
        explanationVi: "'senast den femte varje månad'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Vad ingår i hyran?",
        questionVi: "Tiền thuê bao gồm gì?",
        questionEn: "What is included in the rent?",
        options: [
          { sv: "El och internet", vi: "Điện và internet" },
          { sv: "Vatten och värme", vi: "Nước và sưởi" },
          { sv: "Parkering och el", vi: "Đỗ xe và điện" },
          { sv: "Möbler", vi: "Nội thất" },
        ],
        correctIndex: 1,
        explanationVi: "'I hyran ingår vatten och värme'.",
      },
      tf("q3", "Man får borra i väggen klockan 23.00.", "Được khoan tường lúc 23.00.", "You may drill at 23:00.", 1, "Sau 22.00 là 'nattro'."),
      tf("q4", "Gamla möbler får lämnas i soprummet.", "Được để nội thất cũ ở phòng rác.", "Old furniture may be left in the waste room.", 1, "'Möbler och elektronik får inte lämnas där'."),
      {
        id: "q5",
        kind: "mcq",
        questionSv: "Vad gör du om ett rör läcker mitt i natten?",
        questionVi: "Nếu ống nước rò giữa đêm thì làm gì?",
        questionEn: "What do you do if a pipe leaks at night?",
        options: [
          { sv: "Ringer direkt, jouren finns dygnet runt", vi: "Gọi ngay, trực 24/7" },
          { sv: "Väntar till nästa månad", vi: "Chờ tháng sau" },
          { sv: "Skriver ett brev", vi: "Viết thư" },
          { sv: "Frågar grannen om hjälp", vi: "Nhờ hàng xóm" },
        ],
        correctIndex: 0,
        explanationVi: "'Akuta problem ... ringer du in direkt dygnet runt'.",
      },
      {
        id: "q6",
        kind: "vocab",
        questionSv: "Vad betyder 'felanmälan'?",
        questionVi: "'felanmälan' nghĩa là gì?",
        questionEn: "What does 'felanmälan' mean?",
        options: [
          { sv: "Att rapportera något som är trasigt", vi: "Báo hỏng hóc" },
          { sv: "Att betala hyran", vi: "Trả tiền thuê" },
          { sv: "Att flytta ut", vi: "Chuyển đi" },
          { sv: "Att sortera sopor", vi: "Phân loại rác" },
        ],
        correctIndex: 0,
        explanationVi: "'felanmälan' = báo lỗi/hỏng.",
      },
    ],
  },

  // ═══════════════════════════ B1 ═══════════════════════════
  {
    id: "rd6-b1-kollektivtrafik",
    level: "B1",
    type: "article",
    titleSv: "Debatt: Gratis kollektivtrafik i staden?",
    titleVi: "Tranh luận: Giao thông công cộng miễn phí?",
    titleEn: "Debate: Free public transport in the city?",
    contextVi: "Bài báo địa phương về đề xuất miễn phí xe buýt.",
    textSv:
      "Ska bussarna vara gratis? Frågan diskuteras just nu i stadsfullmäktige, och åsikterna går isär.\n\n" +
      "De som är för menar att gratis kollektivtrafik skulle minska antalet bilar i centrum. Färre bilar ger renare luft, tystare gator och fler platser för cyklister och fotgängare. " +
      "Dessutom skulle familjer med låg inkomst spara flera hundra euro om året, vilket gör det lättare att ta sig till jobb och skola.\n\n" +
      "Kritikerna påpekar att ingenting är gratis i verkligheten. Om biljettintäkterna försvinner måste pengarna tas någon annanstans ifrån, till exempel från skolor eller äldreomsorg. " +
      "De varnar också för att bussarna blir så fulla att de som verkligen behöver dem får stå.\n\n" +
      "Erfarenheter från andra städer visar en blandad bild. I några städer ökade resandet snabbt, men de flesta nya resenärerna gick tidigare till fots eller cyklade. Antalet bilister minskade bara lite.\n\n" +
      "En möjlig medelväg är att sänka priset i stället för att ta bort det, och samtidigt köra bussarna oftare. Många experter menar nämligen att turtätheten spelar större roll än priset: den som måste vänta en halvtimme i regnet tar hellre bilen, även om resan är gratis.",
    textVi:
      "Xe buýt có nên miễn phí? Câu hỏi này đang được hội đồng thành phố bàn luận, và các ý kiến rất khác nhau.\n\n" +
      "Người ủng hộ cho rằng giao thông công cộng miễn phí sẽ giảm số ô tô trong trung tâm. Ít xe hơn nghĩa là không khí sạch hơn, đường phố yên tĩnh hơn và nhiều chỗ hơn cho người đi xe đạp và đi bộ. " +
      "Ngoài ra, gia đình thu nhập thấp tiết kiệm được vài trăm euro mỗi năm, giúp việc đi làm và đi học dễ hơn.\n\n" +
      "Người phản đối chỉ ra rằng thực tế không có gì miễn phí. Nếu mất doanh thu vé, tiền phải lấy từ nơi khác, ví dụ trường học hay chăm sóc người già. " +
      "Họ cũng cảnh báo xe buýt sẽ quá đông, khiến người thực sự cần phải đứng.\n\n" +
      "Kinh nghiệm từ các thành phố khác cho thấy bức tranh lẫn lộn. Ở vài nơi lượng khách tăng nhanh, nhưng phần lớn khách mới trước đó đi bộ hoặc đạp xe. Số người lái ô tô chỉ giảm nhẹ.\n\n" +
      "Một hướng trung gian là giảm giá thay vì bỏ hẳn, đồng thời tăng tần suất chạy. Nhiều chuyên gia cho rằng tần suất quan trọng hơn giá vé: ai phải đợi nửa tiếng dưới mưa thì thà lái ô tô, dù chuyến đi miễn phí.",
    keyVocab: [
      { sv: "åsikterna går isär", vi: "ý kiến trái chiều" },
      { sv: "biljettintäkter", vi: "doanh thu vé" },
      { sv: "äldreomsorg", vi: "chăm sóc người cao tuổi" },
      { sv: "turtäthet", vi: "tần suất chuyến" },
      { sv: "medelväg", vi: "giải pháp trung gian" },
    ],
    estimatedMinutes: 8,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Vilket argument använder de som är för gratis bussar?",
        questionVi: "Người ủng hộ dùng lập luận nào?",
        questionEn: "Which argument do supporters use?",
        options: [
          { sv: "Att staden tjänar mer pengar på biljetter", vi: "Thành phố thu nhiều tiền vé hơn" },
          { sv: "Att luften blir renare när bilarna blir färre", vi: "Không khí sạch hơn khi ít ô tô" },
          { sv: "Att bussarna behöver färre chaufförer", vi: "Cần ít tài xế hơn" },
          { sv: "Att cyklar blir billigare", vi: "Xe đạp rẻ hơn" },
        ],
        correctIndex: 1,
        explanationVi: "'Färre bilar ger renare luft'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Vad oroar kritikerna sig för?",
        questionVi: "Người phản đối lo điều gì?",
        questionEn: "What worries the critics?",
        options: [
          { sv: "Att pengarna måste tas från annan service", vi: "Tiền phải lấy từ dịch vụ khác" },
          { sv: "Att ingen vill åka buss", vi: "Không ai muốn đi buýt" },
          { sv: "Att bussarna kör för fort", vi: "Xe buýt chạy quá nhanh" },
          { sv: "Att biljetterna blir dyrare", vi: "Vé đắt hơn" },
        ],
        correctIndex: 0,
        explanationVi: "'måste pengarna tas någon annanstans ifrån ... skolor eller äldreomsorg'.",
      },
      {
        id: "q3",
        kind: "mcq",
        questionSv: "Vad visar erfarenheterna från andra städer?",
        questionVi: "Kinh nghiệm các thành phố khác cho thấy gì?",
        questionEn: "What do experiences from other cities show?",
        options: [
          { sv: "Att alla bilister slutade köra bil", vi: "Mọi tài xế bỏ ô tô" },
          { sv: "Att många nya resenärer tidigare gick eller cyklade", vi: "Nhiều khách mới trước đó đi bộ hoặc đạp xe" },
          { sv: "Att resandet minskade kraftigt", vi: "Lượng khách giảm mạnh" },
          { sv: "Att bussarna blev dyrare att driva än tåg", vi: "Buýt tốn hơn tàu" },
        ],
        correctIndex: 1,
        explanationVi: "'de flesta nya resenärerna gick tidigare till fots eller cyklade'.",
      },
      tf("q4", "Enligt texten är turtätheten viktigare än priset för många experter.", "Theo bài, tần suất quan trọng hơn giá với nhiều chuyên gia.", "According to the text, frequency matters more than price for many experts.", 0, "'turtätheten spelar större roll än priset'."),
      {
        id: "q5",
        kind: "vocab",
        questionSv: "Vad betyder uttrycket 'åsikterna går isär'?",
        questionVi: "'åsikterna går isär' nghĩa là gì?",
        questionEn: "What does 'åsikterna går isär' mean?",
        options: [
          { sv: "Alla tycker likadant", vi: "Mọi người cùng ý kiến" },
          { sv: "Man har olika uppfattningar", vi: "Ý kiến khác nhau" },
          { sv: "Ingen vill uttala sig", vi: "Không ai muốn nói" },
          { sv: "Beslutet är redan taget", vi: "Đã quyết xong" },
        ],
        correctIndex: 1,
        explanationVi: "Cách nói này = quan điểm chia rẽ, khác nhau.",
      },
      {
        id: "q6",
        kind: "mcq",
        questionSv: "Vilken medelväg föreslås i texten?",
        questionVi: "Bài đề xuất hướng trung gian nào?",
        questionEn: "Which middle way is proposed?",
        options: [
          { sv: "Att sänka priset och köra bussarna oftare", vi: "Giảm giá vé và tăng chuyến" },
          { sv: "Att stänga centrum för alla fordon", vi: "Cấm mọi xe vào trung tâm" },
          { sv: "Att höja bensinskatten kraftigt", vi: "Tăng mạnh thuế xăng" },
          { sv: "Att bygga fler parkeringshus", vi: "Xây thêm bãi đỗ" },
        ],
        correctIndex: 0,
        explanationVi: "'sänka priset i stället för att ta bort det, och samtidigt köra bussarna oftare'.",
      },
    ],
  },
  {
    id: "rd6-b1-distansarbete",
    level: "B1",
    type: "blog",
    titleSv: "Blogg: Ett år på distans",
    titleVi: "Blog: Một năm làm việc từ xa",
    titleEn: "Blog: A year of remote work",
    contextVi: "Một kỹ sư viết blog về trải nghiệm làm việc từ xa.",
    textSv:
      "För ett år sedan flyttade mitt kontor hem till köksbordet. I början kändes det som en lyx: inga resor, inget kaffesorl, inga möten som avbröt koncentrationen.\n\n" +
      "Efter några månader märkte jag baksidorna. Arbetsdagen fick inget tydligt slut, och jag svarade på meddelanden långt in på kvällen. Ryggen protesterade mot en stol som inte var gjord för åtta timmar. " +
      "Värst var ändå tystnaden: de korta samtalen i korridoren, där man löser små problem på trettio sekunder, försvann helt.\n\n" +
      "Nu har vi hittat en rytm som fungerar. Tre dagar hemma, två dagar på kontoret. De dagar vi ses använder vi till möten, planering och sådant som kräver diskussion. Hemmadagarna sparar vi till uppgifter som kräver djup koncentration.\n\n" +
      "Jag har också ändrat mina egna vanor. Jag börjar med en promenad runt kvarteret, som ersätter resan till jobbet och signalerar att dagen startar. Klockan fem stänger jag datorn och lägger den i en låda. Låter det överdrivet? Kanske, men hjärnan behöver en gräns.\n\n" +
      "Min slutsats är att distansarbete varken är räddningen eller katastrofen som många påstod. Det är ett verktyg. Fungerar det bra beror mindre på tekniken och mer på hur tydligt teamet kommer överens om förväntningar.",
    textVi:
      "Một năm trước, văn phòng của tôi chuyển về bàn bếp. Ban đầu nó như xa xỉ: không phải đi lại, không tiếng ồn quán cà phê, không cuộc họp cắt ngang sự tập trung.\n\n" +
      "Sau vài tháng tôi thấy mặt trái. Ngày làm việc không có điểm kết thúc rõ ràng, tôi trả lời tin nhắn tới tận khuya. Lưng tôi phản đối chiếc ghế không dành cho tám tiếng. " +
      "Tệ nhất là sự im lặng: những cuộc trò chuyện ngắn ngoài hành lang, nơi ta giải quyết vấn đề nhỏ trong ba mươi giây, biến mất hoàn toàn.\n\n" +
      "Giờ chúng tôi đã tìm được nhịp phù hợp. Ba ngày ở nhà, hai ngày lên văn phòng. Ngày gặp nhau dùng cho họp, lập kế hoạch và những việc cần thảo luận. Ngày ở nhà để dành cho việc cần tập trung sâu.\n\n" +
      "Tôi cũng đổi thói quen. Tôi bắt đầu bằng việc đi bộ quanh khu phố, thay cho chuyến đi làm và báo hiệu ngày mới bắt đầu. Năm giờ chiều tôi tắt máy tính và cất vào ngăn kéo. Nghe hơi quá? Có thể, nhưng não cần một ranh giới.\n\n" +
      "Kết luận của tôi: làm việc từ xa không phải cứu cánh cũng chẳng phải thảm họa như nhiều người nói. Nó là một công cụ. Nó hiệu quả hay không phụ thuộc ít vào công nghệ và nhiều vào việc cả nhóm thống nhất kỳ vọng rõ ràng đến đâu.",
    keyVocab: [
      { sv: "baksidor", vi: "mặt trái" },
      { sv: "koncentration", vi: "sự tập trung" },
      { sv: "rytm", vi: "nhịp làm việc" },
      { sv: "förväntningar", vi: "kỳ vọng" },
      { sv: "slutsats", vi: "kết luận" },
    ],
    estimatedMinutes: 8,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Vad tyckte skribenten om distansarbetet i början?",
        questionVi: "Ban đầu tác giả nghĩ gì?",
        questionEn: "What did the writer think at first?",
        options: [
          { sv: "Att det kändes som en lyx", vi: "Cảm thấy như xa xỉ" },
          { sv: "Att det var omöjligt", vi: "Bất khả thi" },
          { sv: "Att tekniken var för dålig", vi: "Công nghệ quá tệ" },
          { sv: "Att chefen var emot det", vi: "Sếp phản đối" },
        ],
        correctIndex: 0,
        explanationVi: "'I början kändes det som en lyx'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Vilket problem beskriver skribenten som värst?",
        questionVi: "Vấn đề tệ nhất là gì?",
        questionEn: "Which problem was the worst?",
        options: [
          { sv: "Dålig internetuppkoppling", vi: "Mạng kém" },
          { sv: "Tystnaden och de förlorade korta samtalen", vi: "Sự im lặng, mất các trò chuyện ngắn" },
          { sv: "För många resor", vi: "Đi lại quá nhiều" },
          { sv: "Att lönen sänktes", vi: "Bị giảm lương" },
        ],
        correctIndex: 1,
        explanationVi: "'Värst var ändå tystnaden ...'.",
      },
      {
        id: "q3",
        kind: "mcq",
        questionSv: "Hur ser skribentens nya arbetsvecka ut?",
        questionVi: "Tuần làm việc mới thế nào?",
        questionEn: "What does the new work week look like?",
        options: [
          { sv: "Fem dagar hemma", vi: "5 ngày ở nhà" },
          { sv: "Tre dagar hemma och två på kontoret", vi: "3 ngày ở nhà, 2 ngày văn phòng" },
          { sv: "Bara kvällsarbete", vi: "Chỉ làm buổi tối" },
          { sv: "Fyra dagar på kontoret", vi: "4 ngày ở văn phòng" },
        ],
        correctIndex: 1,
        explanationVi: "'Tre dagar hemma, två dagar på kontoret'.",
      },
      tf("q4", "Skribenten börjar dagen med en promenad.", "Tác giả bắt đầu ngày bằng đi bộ.", "The writer starts the day with a walk.", 0, "'Jag börjar med en promenad runt kvarteret'."),
      tf("q5", "Enligt texten beror framgången mest på tekniken.", "Theo bài, thành công phụ thuộc chủ yếu vào công nghệ.", "According to the text, success depends mostly on technology.", 1, "'beror mindre på tekniken och mer på ... förväntningar'."),
      {
        id: "q6",
        kind: "vocab",
        questionSv: "Vad betyder 'baksidor' i texten?",
        questionVi: "'baksidor' trong bài nghĩa là gì?",
        questionEn: "What does 'baksidor' mean here?",
        options: [
          { sv: "Negativa sidor av något", vi: "Mặt tiêu cực" },
          { sv: "Sidorna i en bok", vi: "Trang sách" },
          { sv: "Rummet bakom köket", vi: "Phòng sau bếp" },
          { sv: "Extra pengar", vi: "Tiền thêm" },
        ],
        correctIndex: 0,
        explanationVi: "'baksidor' = nhược điểm, mặt trái.",
      },
    ],
  },
];

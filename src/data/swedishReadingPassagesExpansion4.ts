/**
 * @file swedishReadingPassagesExpansion4.ts
 * @description Fourth Läsförståelse pack (A1-B1) for the Swedish Reading Lab.
 *              Every question carries a native sv-SE prompt (questionSv) and
 *              uses the full YKI question mix: mcq, truefalse, vocab, gapfill,
 *              heading and shortanswer.
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

export const SWEDISH_READING_PASSAGES_EXPANSION_4: SwedishReadingPassage[] = [
  // ═══════════════════════════ A1 ═══════════════════════════
  {
    id: "rd4-a1-sms-forsening",
    level: "A1",
    type: "email",
    titleSv: "SMS: Jag blir sen",
    titleVi: "Tin nhắn: Tôi sẽ đến muộn",
    titleEn: "Text message: I'll be late",
    contextVi: "Bạn nhận được tin nhắn từ Anna trước buổi hẹn ăn tối.",
    textSv:
      "Hej! Jag blir tyvärr lite sen i kväll. Tåget står stilla i Sollentuna och de säger att vi väntar i tjugo minuter.\n\n" +
      "Jag kommer alltså vid halv åtta i stället för sju. Kan du beställa ett bord åt oss?\n\n" +
      "Jag är hungrig, så beställ gärna bröd också. Vi ses snart! /Anna",
    textVi:
      "Chào! Tiếc là tối nay mình sẽ đến muộn một chút. Tàu đang dừng ở Sollentuna và họ nói phải đợi 20 phút.\n\n" +
      "Vậy mình đến lúc 7 rưỡi thay vì 7 giờ. Bạn đặt bàn giúp nhé?\n\n" +
      "Mình đói lắm, gọi thêm bánh mì nhé. Hẹn gặp! /Anna",
    keyVocab: [
      { sv: "bli sen", vi: "đến muộn" },
      { sv: "står stilla", vi: "đứng yên, không chạy" },
      { sv: "i stället för", vi: "thay vì" },
      { sv: "beställa ett bord", vi: "đặt bàn" },
    ],
    estimatedMinutes: 3,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "När kommer Anna?",
        questionVi: "Anna đến lúc mấy giờ?",
        questionEn: "When will Anna arrive?",
        options: [
          { sv: "Klockan sju", vi: "7 giờ" },
          { sv: "Klockan halv åtta", vi: "7 rưỡi" },
          { sv: "Klockan åtta", vi: "8 giờ" },
          { sv: "Klockan halv nio", vi: "8 rưỡi" },
        ],
        correctIndex: 1,
        explanationVi: "'Jag kommer alltså vid halv åtta i stället för sju'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Varför blir Anna sen?",
        questionVi: "Vì sao Anna đến muộn?",
        questionEn: "Why is Anna late?",
        options: [
          { sv: "Hon jobbar länge", vi: "Cô ấy làm việc muộn" },
          { sv: "Tåget står stilla", vi: "Tàu đang dừng" },
          { sv: "Hon har glömt tiden", vi: "Cô ấy quên giờ" },
          { sv: "Bussen är full", vi: "Xe buýt đầy" },
        ],
        correctIndex: 1,
        explanationVi: "'Tåget står stilla i Sollentuna'.",
      },
      tf(
        "q3",
        "Anna vill att du beställer ett bord.",
        "Anna muốn bạn đặt bàn.",
        "Anna wants you to book a table.",
        0,
        "'Kan du beställa ett bord åt oss?' - đúng.",
      ),
      {
        id: "q4",
        kind: "gapfill",
        questionSv: "Fyll i: Tåget väntar i ___ minuter.",
        questionVi: "Điền vào: Tàu đợi ___ phút.",
        questionEn: "Fill the gap: The train waits for ___ minutes.",
        options: [
          { sv: "tio", vi: "10" },
          { sv: "femton", vi: "15" },
          { sv: "tjugo", vi: "20" },
          { sv: "trettio", vi: "30" },
        ],
        correctIndex: 2,
        explanationVi: "'vi väntar i tjugo minuter'.",
      },
    ],
  },
  {
    id: "rd4-a1-anslag-apotek",
    level: "A1",
    type: "notice",
    titleSv: "Öppettider på apoteket",
    titleVi: "Giờ mở cửa hiệu thuốc",
    titleEn: "Pharmacy opening hours",
    contextVi: "Bảng giờ mở cửa dán trên cửa kính hiệu thuốc.",
    textSv:
      "APOTEKET CENTRUM\n\nÖppettider\nMåndag - fredag: 09.00 - 18.00\nLördag: 10.00 - 15.00\nSöndag: stängt\n\n" +
      "Röda dagar har vi stängt.\n\nDu kan hämta ditt recept i kassan. Ta en kölapp när du kommer in.\n" +
      "Har du frågor om medicin? Ring 0771-45 00 00 varje dag mellan 08.00 och 20.00.",
    textVi:
      "HIỆU THUỐC TRUNG TÂM\n\nGiờ mở cửa\nThứ Hai - thứ Sáu: 9:00 - 18:00\nThứ Bảy: 10:00 - 15:00\nChủ nhật: đóng cửa\n\n" +
      "Ngày lễ chúng tôi đóng cửa.\n\nBạn lấy thuốc theo đơn ở quầy thu ngân. Hãy lấy số thứ tự khi vào.\n" +
      "Có câu hỏi về thuốc? Gọi 0771-45 00 00 hàng ngày từ 8:00 đến 20:00.",
    keyVocab: [
      { sv: "öppettider", vi: "giờ mở cửa" },
      { sv: "stängt", vi: "đóng cửa" },
      { sv: "recept", vi: "đơn thuốc" },
      { sv: "kölapp", vi: "phiếu số thứ tự" },
    ],
    estimatedMinutes: 3,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Hur länge är apoteket öppet på lördag?",
        questionVi: "Thứ Bảy hiệu thuốc mở bao lâu?",
        questionEn: "How long is the pharmacy open on Saturday?",
        options: [
          { sv: "Tre timmar", vi: "3 tiếng" },
          { sv: "Fem timmar", vi: "5 tiếng" },
          { sv: "Nio timmar", vi: "9 tiếng" },
          { sv: "Det är stängt", vi: "Đóng cửa" },
        ],
        correctIndex: 1,
        explanationVi: "10.00 - 15.00 = 5 tiếng.",
      },
      tf(
        "q2",
        "Apoteket är öppet på söndag.",
        "Chủ nhật hiệu thuốc mở cửa.",
        "The pharmacy is open on Sunday.",
        1,
        "'Söndag: stängt'.",
      ),
      {
        id: "q3",
        kind: "vocab",
        questionSv: "Vad betyder 'kölapp'?",
        questionVi: "'kölapp' nghĩa là gì?",
        questionEn: "What does 'kölapp' mean?",
        options: [
          { sv: "en biljett till bussen", vi: "vé xe buýt" },
          { sv: "en lapp med ett nummer i kön", vi: "phiếu ghi số thứ tự" },
          { sv: "ett recept från läkaren", vi: "đơn thuốc" },
          { sv: "ett kvitto", vi: "hóa đơn" },
        ],
        correctIndex: 1,
        explanationVi: "'kö' = hàng đợi, 'lapp' = mảnh giấy.",
      },
      {
        id: "q4",
        kind: "shortanswer",
        questionSv: "Mellan vilka klockslag kan man ringa och fråga om medicin?",
        questionVi: "Có thể gọi hỏi về thuốc trong khung giờ nào?",
        questionEn: "Between which hours can you call about medicine?",
        options: [
          { sv: "09.00 - 18.00", vi: "9:00 - 18:00" },
          { sv: "08.00 - 20.00", vi: "8:00 - 20:00" },
          { sv: "10.00 - 15.00", vi: "10:00 - 15:00" },
          { sv: "Endast vardagar", vi: "Chỉ ngày thường" },
        ],
        correctIndex: 1,
        explanationVi: "'varje dag mellan 08.00 och 20.00'.",
      },
    ],
  },
  {
    id: "rd4-a1-anslag-atervinning",
    level: "A1",
    type: "notice",
    titleSv: "Sopsortering i huset",
    titleVi: "Hướng dẫn phân loại rác",
    titleEn: "Waste sorting in the building",
    contextVi: "Thông báo dán trong phòng rác của chung cư.",
    textSv:
      "SOPRUM - SÅ HÄR SORTERAR DU\n\nGrön tunna: matavfall. Använd bara de bruna påsarna.\n" +
      "Blå tunna: tidningar och papper.\nGul tunna: plast.\nGrå tunna: vanliga sopor.\n\n" +
      "Glas och metall lämnar du på återvinningsstationen vid parkeringen.\n" +
      "Möbler och elektronik får inte stå i soprummet. Kör dem till Återbruket på Industrivägen 5.\n\n" +
      "Soprummet är öppet dygnet runt med din nyckelbricka.",
    textVi:
      "PHÒNG RÁC - CÁCH PHÂN LOẠI\n\nThùng xanh lá: rác thực phẩm. Chỉ dùng túi nâu.\n" +
      "Thùng xanh dương: báo và giấy.\nThùng vàng: nhựa.\nThùng xám: rác thường.\n\n" +
      "Thủy tinh và kim loại mang ra trạm tái chế cạnh bãi đỗ xe.\n" +
      "Đồ nội thất và đồ điện tử không được để trong phòng rác. Hãy mang tới Återbruket ở Industrivägen 5.\n\n" +
      "Phòng rác mở 24/24 bằng thẻ chìa khóa của bạn.",
    keyVocab: [
      { sv: "sopsortering", vi: "phân loại rác" },
      { sv: "matavfall", vi: "rác thực phẩm" },
      { sv: "återvinningsstation", vi: "trạm tái chế" },
      { sv: "dygnet runt", vi: "suốt ngày đêm" },
    ],
    estimatedMinutes: 3,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "I vilken tunna lägger du plast?",
        questionVi: "Nhựa bỏ vào thùng nào?",
        questionEn: "Which bin is for plastic?",
        options: [
          { sv: "Den gröna", vi: "Xanh lá" },
          { sv: "Den blå", vi: "Xanh dương" },
          { sv: "Den gula", vi: "Vàng" },
          { sv: "Den grå", vi: "Xám" },
        ],
        correctIndex: 2,
        explanationVi: "'Gul tunna: plast'.",
      },
      tf(
        "q2",
        "Du får ställa gamla möbler i soprummet.",
        "Bạn được để đồ nội thất cũ trong phòng rác.",
        "You may leave old furniture in the waste room.",
        1,
        "'Möbler och elektronik får inte stå i soprummet'.",
      ),
      {
        id: "q3",
        kind: "mcq",
        questionSv: "Var lämnar man glas?",
        questionVi: "Thủy tinh bỏ ở đâu?",
        questionEn: "Where do you leave glass?",
        options: [
          { sv: "I den blå tunnan", vi: "Thùng xanh dương" },
          { sv: "På återvinningsstationen", vi: "Trạm tái chế" },
          { sv: "På Industrivägen 5", vi: "Industrivägen 5" },
          { sv: "I den grå tunnan", vi: "Thùng xám" },
        ],
        correctIndex: 1,
        explanationVi: "'Glas och metall lämnar du på återvinningsstationen'.",
      },
      {
        id: "q4",
        kind: "vocab",
        questionSv: "Vad betyder 'dygnet runt'?",
        questionVi: "'dygnet runt' nghĩa là gì?",
        questionEn: "What does 'dygnet runt' mean?",
        options: [
          { sv: "bara på dagen", vi: "chỉ ban ngày" },
          { sv: "hela dagen och natten", vi: "cả ngày lẫn đêm" },
          { sv: "en gång i veckan", vi: "mỗi tuần một lần" },
          { sv: "på helgen", vi: "vào cuối tuần" },
        ],
        correctIndex: 1,
        explanationVi: "'dygn' = 24 tiếng, nên 'dygnet runt' = 24/24.",
      },
    ],
  },

  // ═══════════════════════════ A2 ═══════════════════════════
  {
    id: "rd4-a2-mejl-forskola",
    level: "A2",
    type: "email",
    titleSv: "Mejl från förskolan",
    titleVi: "Email từ trường mầm non",
    titleEn: "Email from the preschool",
    contextVi: "Bạn là phụ huynh và nhận email này từ trường mầm non của con.",
    textSv:
      "Hej alla föräldrar!\n\nNästa vecka har vi utflykt till Skansen med avdelning Solen. Vi åker buss från förskolan " +
      "på onsdag klockan nio och är tillbaka senast klockan halv tre.\n\n" +
      "Ditt barn behöver ha regnkläder, stövlar och en extra tröja i ryggsäcken. Vi ordnar matsäck, " +
      "men skicka gärna med en vattenflaska märkt med barnets namn.\n\n" +
      "Om ditt barn är sjukt på onsdagen, ring oss före klockan åtta så vi inte väntar.\n\n" +
      "Kostnaden för bussen är hundra kronor och betalas via Swish till 123 456 78 90 senast måndag.\n\n" +
      "Vänliga hälsningar,\nPersonalen på avdelning Solen",
    textVi:
      "Chào các phụ huynh!\n\nTuần tới lớp Solen sẽ đi tham quan Skansen. Chúng tôi đi xe buýt từ trường " +
      "vào thứ Tư lúc 9 giờ và về chậm nhất 2 rưỡi chiều.\n\n" +
      "Bé cần mang áo mưa, ủng và một áo dự phòng trong ba lô. Nhà trường lo đồ ăn, " +
      "nhưng phụ huynh gửi thêm bình nước có ghi tên bé.\n\n" +
      "Nếu bé ốm vào thứ Tư, xin gọi trước 8 giờ để chúng tôi không phải chờ.\n\n" +
      "Chi phí xe buýt là 100 kr, chuyển Swish tới 123 456 78 90 chậm nhất thứ Hai.\n\n" +
      "Trân trọng,\nGiáo viên lớp Solen",
    keyVocab: [
      { sv: "utflykt", vi: "chuyến đi chơi" },
      { sv: "matsäck", vi: "đồ ăn mang theo" },
      { sv: "märkt med namn", vi: "có ghi tên" },
      { sv: "senast", vi: "chậm nhất" },
    ],
    estimatedMinutes: 5,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Vilken dag är utflykten?",
        questionVi: "Chuyến đi vào ngày nào?",
        questionEn: "Which day is the trip?",
        options: [
          { sv: "Måndag", vi: "Thứ Hai" },
          { sv: "Tisdag", vi: "Thứ Ba" },
          { sv: "Onsdag", vi: "Thứ Tư" },
          { sv: "Fredag", vi: "Thứ Sáu" },
        ],
        correctIndex: 2,
        explanationVi: "'Vi åker buss från förskolan på onsdag klockan nio'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Vad behöver föräldrarna INTE skicka med?",
        questionVi: "Phụ huynh KHÔNG cần gửi theo thứ gì?",
        questionEn: "What do parents NOT need to send?",
        options: [
          { sv: "Regnkläder", vi: "Áo mưa" },
          { sv: "Matsäck", vi: "Đồ ăn" },
          { sv: "Vattenflaska", vi: "Bình nước" },
          { sv: "Extra tröja", vi: "Áo dự phòng" },
        ],
        correctIndex: 1,
        explanationVi: "'Vi ordnar matsäck' - trường lo đồ ăn.",
      },
      tf(
        "q3",
        "Bussresan kostar hundra kronor.",
        "Chuyến xe buýt tốn 100 kr.",
        "The bus trip costs one hundred kronor.",
        0,
        "'Kostnaden för bussen är hundra kronor'.",
      ),
      {
        id: "q4",
        kind: "gapfill",
        questionSv: "Fyll i: Om barnet är sjukt ska man ringa före klockan ___.",
        questionVi: "Điền vào: Nếu bé ốm thì gọi trước ___ giờ.",
        questionEn: "Fill the gap: If the child is ill, call before ___.",
        options: [
          { sv: "sju", vi: "7" },
          { sv: "åtta", vi: "8" },
          { sv: "nio", vi: "9" },
          { sv: "tio", vi: "10" },
        ],
        correctIndex: 1,
        explanationVi: "'ring oss före klockan åtta'.",
      },
      {
        id: "q5",
        kind: "heading",
        questionSv: "Vilken rubrik passar mejlet bäst?",
        questionVi: "Tiêu đề nào hợp email nhất?",
        questionEn: "Which heading fits the email best?",
        options: [
          { sv: "Nya öppettider på förskolan", vi: "Giờ mở cửa mới của trường" },
          { sv: "Information inför utflykten på onsdag", vi: "Thông tin cho chuyến đi thứ Tư" },
          { sv: "Föräldramöte i nästa månad", vi: "Họp phụ huynh tháng sau" },
          { sv: "Nya regler för sjukanmälan", vi: "Quy định mới khi báo ốm" },
        ],
        correctIndex: 1,
        explanationVi: "Toàn bộ email nói về chuyến tham quan thứ Tư.",
      },
    ],
  },
  {
    id: "rd4-a2-artikel-fritidsbanken",
    level: "A2",
    type: "article",
    titleSv: "Fritidsbanken - låna sportutrustning gratis",
    titleVi: "Fritidsbanken - mượn đồ thể thao miễn phí",
    titleEn: "Fritidsbanken - borrow sports gear for free",
    contextVi: "Bài báo địa phương giới thiệu dịch vụ cho mượn đồ thể thao miễn phí.",
    textSv:
      "I många svenska kommuner finns i dag en Fritidsbank. Det fungerar ungefär som ett bibliotek, " +
      "men i stället för böcker lånar man skidor, skridskor, cyklar, hjälmar och flytvästar - helt gratis.\n\n" +
      "Allt som finns i hyllorna är skänkt av privatpersoner och företag. Personalen kontrollerar utrustningen " +
      "innan den lånas ut, så att den är hel och säker. Man får låna i fjorton dagar och behöver inget medlemskort.\n\n" +
      "Syftet är dubbelt. Dels ska barn kunna prova en sport även om familjen har dålig ekonomi, " +
      "dels minskar man konsumtionen: en begagnad hjälm som används av tio barn är bättre för miljön än tio nya.\n\n" +
      "Maria Ek, som arbetar på Fritidsbanken i Örebro, berättar att skridskor och slalomutrustning lånas mest på vintern. " +
      "\"Många nyanlända familjer kommer hit i december. Barnen vill åka skridskor med sina klasskamrater, " +
      "och då ska pengar inte vara ett hinder\", säger hon.",
    textVi:
      "Ở nhiều thành phố Thụy Điển ngày nay có 'Fritidsbanken'. Nó hoạt động gần như thư viện, " +
      "nhưng thay vì sách thì người ta mượn ván trượt, giày trượt băng, xe đạp, mũ bảo hiểm và áo phao - hoàn toàn miễn phí.\n\n" +
      "Mọi thứ trên kệ đều do cá nhân và doanh nghiệp tặng. Nhân viên kiểm tra đồ trước khi cho mượn để đảm bảo còn nguyên và an toàn. " +
      "Được mượn 14 ngày và không cần thẻ thành viên.\n\n" +
      "Mục đích có hai. Một mặt để trẻ được thử một môn thể thao dù gia đình khó khăn, " +
      "mặt khác giảm tiêu dùng: một chiếc mũ bảo hiểm cũ mà 10 đứa trẻ dùng thì tốt cho môi trường hơn 10 chiếc mới.\n\n" +
      "Maria Ek làm việc ở Fritidsbanken tại Örebro kể rằng mùa đông giày trượt băng và đồ trượt tuyết được mượn nhiều nhất. " +
      "\"Nhiều gia đình mới nhập cư đến đây vào tháng 12. Bọn trẻ muốn trượt băng cùng bạn cùng lớp, " +
      "và khi đó tiền bạc không nên là rào cản\", bà nói.",
    keyVocab: [
      { sv: "låna ut", vi: "cho mượn" },
      { sv: "skänkt", vi: "được tặng" },
      { sv: "begagnad", vi: "đã qua sử dụng" },
      { sv: "ett hinder", vi: "rào cản" },
      { sv: "syftet", vi: "mục đích" },
    ],
    estimatedMinutes: 6,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Vad kostar det att låna på Fritidsbanken?",
        questionVi: "Mượn đồ ở Fritidsbanken tốn bao nhiêu?",
        questionEn: "What does borrowing cost?",
        options: [
          { sv: "Ingenting", vi: "Miễn phí" },
          { sv: "Hundra kronor per vecka", vi: "100 kr/tuần" },
          { sv: "En medlemsavgift per år", vi: "Phí thành viên hàng năm" },
          { sv: "Det beror på utrustningen", vi: "Tùy loại đồ" },
        ],
        correctIndex: 0,
        explanationVi: "'helt gratis' - hoàn toàn miễn phí.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Hur länge får man låna utrustningen?",
        questionVi: "Được mượn bao lâu?",
        questionEn: "How long may you borrow the gear?",
        options: [
          { sv: "Tre dagar", vi: "3 ngày" },
          { sv: "En vecka", vi: "1 tuần" },
          { sv: "Fjorton dagar", vi: "14 ngày" },
          { sv: "En hel säsong", vi: "Cả mùa" },
        ],
        correctIndex: 2,
        explanationVi: "'Man får låna i fjorton dagar'.",
      },
      tf(
        "q3",
        "Utrustningen är köpt ny av kommunen.",
        "Đồ dùng do thành phố mua mới.",
        "The equipment is bought new by the municipality.",
        1,
        "'Allt ... är skänkt av privatpersoner och företag' - do được tặng.",
      ),
      {
        id: "q4",
        kind: "vocab",
        questionSv: "Vad betyder 'ett hinder' i texten?",
        questionVi: "'ett hinder' trong bài nghĩa là gì?",
        questionEn: "What does 'ett hinder' mean here?",
        options: [
          { sv: "en hjälp", vi: "sự giúp đỡ" },
          { sv: "något som stoppar en", vi: "thứ cản trở" },
          { sv: "en sport", vi: "một môn thể thao" },
          { sv: "en avgift", vi: "một khoản phí" },
        ],
        correctIndex: 1,
        explanationVi: "'pengar ska inte vara ett hinder' = tiền không nên cản trở.",
      },
      {
        id: "q5",
        kind: "shortanswer",
        questionSv: "Vilka två syften har Fritidsbanken enligt texten?",
        questionVi: "Theo bài, Fritidsbanken có hai mục đích nào?",
        questionEn: "What two purposes does Fritidsbanken have?",
        options: [
          { sv: "Tjäna pengar och sälja begagnat", vi: "Kiếm tiền và bán đồ cũ" },
          { sv: "Ge barn chansen att idrotta och minska konsumtionen", vi: "Cho trẻ cơ hội chơi thể thao và giảm tiêu dùng" },
          { sv: "Utbilda tränare och bygga hallar", vi: "Đào tạo HLV và xây nhà thi đấu" },
          { sv: "Locka turister och ordna tävlingar", vi: "Hút du khách và tổ chức thi đấu" },
        ],
        correctIndex: 1,
        explanationVi: "'Dels ska barn kunna prova en sport ... dels minskar man konsumtionen'.",
      },
    ],
  },

  // ═══════════════════════════ B1 ═══════════════════════════
  {
    id: "rd4-b1-nyhet-fyra-dagar",
    level: "B1",
    type: "news",
    titleSv: "Försök med fyradagarsvecka i Sundsvall",
    titleVi: "Thử nghiệm tuần làm việc 4 ngày ở Sundsvall",
    titleEn: "Four-day week trial in Sundsvall",
    contextVi: "Bản tin về thử nghiệm tuần làm việc 4 ngày tại một cơ quan thành phố.",
    textSv:
      "Sundsvalls kommun har under ett år låtit sextio anställda inom hemtjänsten arbeta fyra dagar i veckan " +
      "med bibehållen lön. Nu har försöket utvärderats av forskare vid Mittuniversitetet.\n\n" +
      "Resultatet visar att sjukfrånvaron minskade med nästan en fjärdedel och att personalomsättningen halverades. " +
      "De anställda uppger att de hinner återhämta sig, träna och umgås med familjen på ett sätt som tidigare inte var möjligt.\n\n" +
      "Samtidigt lyfter rapporten fram problem. För att täcka samma antal besök hos brukarna behövde kommunen anställa " +
      "nio extra medarbetare, vilket ökade kostnaderna med drygt sex miljoner kronor. En del av kostnaden vägs upp " +
      "av minskade utgifter för vikarier och rekrytering, men inte hela.\n\n" +
      "\"Frågan är inte om personalen mår bättre - det gör de - utan om skattebetalarna anser att förbättringen är värd priset\", " +
      "säger forskaren Karin Löfgren.\n\n" +
      "Kommunfullmäktige ska ta ställning till om försöket ska permanentas i november. Oppositionen menar att pengarna " +
      "hellre bör användas till fler platser på äldreboenden, medan facket kräver att modellen införs i hela kommunen.",
    textVi:
      "Chính quyền Sundsvall trong một năm đã cho 60 nhân viên chăm sóc tại nhà làm 4 ngày/tuần " +
      "mà vẫn giữ nguyên lương. Nay thử nghiệm đã được các nhà nghiên cứu ở Đại học Mittuniversitetet đánh giá.\n\n" +
      "Kết quả cho thấy nghỉ ốm giảm gần một phần tư và tỷ lệ nghỉ việc giảm một nửa. " +
      "Nhân viên nói họ kịp phục hồi, tập luyện và ở bên gia đình theo cách trước đây không thể.\n\n" +
      "Đồng thời báo cáo nêu vấn đề. Để đảm bảo cùng số lượt thăm khách hàng, thành phố phải tuyển thêm " +
      "9 người, làm chi phí tăng hơn 6 triệu kr. Một phần chi phí được bù nhờ giảm chi cho người làm thay và tuyển dụng, nhưng không hết.\n\n" +
      "\"Câu hỏi không phải nhân viên có khỏe hơn không - họ có - mà là người đóng thuế có thấy cải thiện đó đáng giá không\", " +
      "nhà nghiên cứu Karin Löfgren nói.\n\n" +
      "Hội đồng thành phố sẽ quyết định có duy trì mô hình hay không vào tháng 11. Phe đối lập cho rằng tiền nên dùng " +
      "để tăng chỗ ở viện dưỡng lão, còn công đoàn yêu cầu áp dụng mô hình cho toàn thành phố.",
    keyVocab: [
      { sv: "bibehållen lön", vi: "giữ nguyên lương" },
      { sv: "sjukfrånvaro", vi: "nghỉ ốm" },
      { sv: "personalomsättning", vi: "tỷ lệ nghỉ việc" },
      { sv: "vägas upp av", vi: "được bù lại bởi" },
      { sv: "ta ställning till", vi: "quyết định về" },
    ],
    estimatedMinutes: 8,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Vad hände med sjukfrånvaron under försöket?",
        questionVi: "Nghỉ ốm thay đổi thế nào trong thử nghiệm?",
        questionEn: "What happened to sick leave?",
        options: [
          { sv: "Den ökade något", vi: "Tăng nhẹ" },
          { sv: "Den var oförändrad", vi: "Không đổi" },
          { sv: "Den minskade med nästan en fjärdedel", vi: "Giảm gần 1/4" },
          { sv: "Den halverades", vi: "Giảm một nửa" },
        ],
        correctIndex: 2,
        explanationVi: "'sjukfrånvaron minskade med nästan en fjärdedel'. Một nửa là 'personalomsättningen'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Varför ökade kommunens kostnader?",
        questionVi: "Vì sao chi phí của thành phố tăng?",
        questionEn: "Why did costs increase?",
        options: [
          { sv: "Lönerna höjdes", vi: "Lương được nâng" },
          { sv: "Nio extra medarbetare behövde anställas", vi: "Phải tuyển thêm 9 người" },
          { sv: "Forskningen var dyr", vi: "Nghiên cứu tốn kém" },
          { sv: "Brukarna blev fler", vi: "Số khách hàng tăng" },
        ],
        correctIndex: 1,
        explanationVi: "'behövde kommunen anställa nio extra medarbetare, vilket ökade kostnaderna'.",
      },
      tf(
        "q3",
        "Hela kostnadsökningen täcks av lägre utgifter för vikarier.",
        "Toàn bộ phần chi phí tăng được bù bằng việc giảm chi cho người làm thay.",
        "The whole cost increase is covered by lower substitute costs.",
        1,
        "'En del av kostnaden vägs upp ... men inte hela'.",
      ),
      {
        id: "q4",
        kind: "vocab",
        questionSv: "Vad betyder 'ta ställning till' i texten?",
        questionVi: "'ta ställning till' trong bài nghĩa là gì?",
        questionEn: "What does 'ta ställning till' mean?",
        options: [
          { sv: "att glömma bort något", vi: "quên đi" },
          { sv: "att bestämma sig i en fråga", vi: "quyết định về một vấn đề" },
          { sv: "att betala för något", vi: "trả tiền" },
          { sv: "att skjuta upp ett beslut", vi: "hoãn quyết định" },
        ],
        correctIndex: 1,
        explanationVi: "'ska ta ställning till om försöket ska permanentas' = sẽ quyết định.",
      },
      {
        id: "q5",
        kind: "heading",
        questionSv: "Vilken rubrik sammanfattar artikeln bäst?",
        questionVi: "Tiêu đề nào tóm tắt bài tốt nhất?",
        questionEn: "Which heading best summarises the article?",
        options: [
          { sv: "Friskare personal - men dyrare för kommunen", vi: "Nhân viên khỏe hơn - nhưng thành phố tốn hơn" },
          { sv: "Facket kräver högre löner i hemtjänsten", vi: "Công đoàn đòi tăng lương" },
          { sv: "Fler platser på äldreboenden i Sundsvall", vi: "Thêm chỗ ở viện dưỡng lão" },
          { sv: "Mittuniversitetet startar ny utbildning", vi: "Đại học mở ngành mới" },
        ],
        correctIndex: 0,
        explanationVi: "Bài cân bằng giữa lợi ích sức khỏe và chi phí tăng.",
      },
      {
        id: "q6",
        kind: "shortanswer",
        questionSv: "Vad tycker oppositionen att pengarna borde användas till?",
        questionVi: "Phe đối lập cho rằng tiền nên dùng vào việc gì?",
        questionEn: "What does the opposition want the money used for?",
        options: [
          { sv: "Fler platser på äldreboenden", vi: "Thêm chỗ ở viện dưỡng lão" },
          { sv: "Högre löner till hemtjänsten", vi: "Tăng lương cho chăm sóc tại nhà" },
          { sv: "Fyradagarsvecka i hela kommunen", vi: "4 ngày/tuần toàn thành phố" },
          { sv: "Mer forskning vid universitetet", vi: "Thêm nghiên cứu ở đại học" },
        ],
        correctIndex: 0,
        explanationVi: "'Oppositionen menar att pengarna hellre bör användas till fler platser på äldreboenden'.",
      },
    ],
  },
  {
    id: "rd4-b1-kronika-tystnad",
    level: "B1",
    type: "blog",
    titleSv: "Krönika: Tystnaden på bussen",
    titleVi: "Tản văn: Sự im lặng trên xe buýt",
    titleEn: "Column: The silence on the bus",
    contextVi: "Bài tản văn của một người nhập cư viết cho báo địa phương.",
    textSv:
      "Under mitt första år i Sverige tolkade jag tystnaden som ointresse. På bussen satt trettio personer " +
      "och ingen sa ett ord. I Hanoi, där jag växte upp, skulle någon redan ha frågat vart jag skulle och " +
      "erbjudit mig en påse frukt.\n\n" +
      "Med tiden förstod jag att tystnaden hade en annan betydelse. Att inte störa är här ett sätt att visa respekt. " +
      "Man utgår från att den andra personen har rätt till sina egna tankar, och det gäller både i kollektivtrafiken " +
      "och i trapphuset.\n\n" +
      "Det tog längre tid att lära sig var samtalen faktiskt äger rum. Svaret visade sig vara i sammanhang med en tydlig ram: " +
      "på fikarasten, i kören, i föreningen, i tvättstugan. Där kan samma person som teg på bussen prata i en timme " +
      "om sitt sommarhus.\n\n" +
      "I dag saknar jag ibland spontaniteten från Hanoi, men jag har också börjat uppskatta att ingen kräver något av mig " +
      "på vägen till jobbet. Kanske är det så integration fungerar i praktiken: man byter inte ut sina gamla vanor, " +
      "man lägger nya bredvid dem.",
    textVi:
      "Năm đầu ở Thụy Điển, tôi hiểu sự im lặng là thờ ơ. Trên xe buýt có 30 người " +
      "mà không ai nói một lời. Ở Hà Nội nơi tôi lớn lên, hẳn đã có người hỏi tôi đi đâu " +
      "và mời tôi một túi trái cây.\n\n" +
      "Dần dần tôi hiểu sự im lặng mang ý nghĩa khác. Không làm phiền ở đây là cách thể hiện tôn trọng. " +
      "Người ta mặc định người kia có quyền với suy nghĩ riêng, điều đó đúng cả trên phương tiện công cộng " +
      "lẫn ở cầu thang chung cư.\n\n" +
      "Mất lâu hơn để biết các cuộc trò chuyện thật sự diễn ra ở đâu. Hóa ra là trong những bối cảnh có khuôn khổ rõ ràng: " +
      "giờ fika, dàn hợp xướng, câu lạc bộ, phòng giặt. Ở đó chính người im lặng trên xe buýt có thể nói cả tiếng " +
      "về ngôi nhà nghỉ hè của mình.\n\n" +
      "Nay đôi khi tôi vẫn nhớ sự tự nhiên của Hà Nội, nhưng cũng bắt đầu quý việc không ai đòi hỏi gì ở tôi " +
      "trên đường đi làm. Có lẽ hội nhập thực tế là vậy: ta không thay thế thói quen cũ, " +
      "ta đặt thói quen mới bên cạnh chúng.",
    keyVocab: [
      { sv: "tolka", vi: "diễn giải, hiểu là" },
      { sv: "utgå från", vi: "mặc định, xuất phát từ" },
      { sv: "äga rum", vi: "diễn ra" },
      { sv: "spontanitet", vi: "sự tự nhiên, ngẫu hứng" },
      { sv: "i praktiken", vi: "trên thực tế" },
    ],
    estimatedMinutes: 8,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Hur tolkade skribenten tystnaden i början?",
        questionVi: "Ban đầu tác giả hiểu sự im lặng thế nào?",
        questionEn: "How did the writer first interpret the silence?",
        options: [
          { sv: "Som respekt", vi: "Là sự tôn trọng" },
          { sv: "Som ointresse", vi: "Là sự thờ ơ" },
          { sv: "Som blyghet", vi: "Là sự nhút nhát" },
          { sv: "Som trötthet", vi: "Là sự mệt mỏi" },
        ],
        correctIndex: 1,
        explanationVi: "'tolkade jag tystnaden som ointresse'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Var sker samtalen enligt texten?",
        questionVi: "Theo bài, các cuộc trò chuyện diễn ra ở đâu?",
        questionEn: "Where do conversations take place?",
        options: [
          { sv: "På bussen och i tunnelbanan", vi: "Trên xe buýt và tàu điện" },
          { sv: "I sammanhang med en tydlig ram, som fikarasten och föreningen", vi: "Trong bối cảnh có khuôn khổ, như giờ fika và câu lạc bộ" },
          { sv: "Bara hemma hos familjen", vi: "Chỉ ở nhà với gia đình" },
          { sv: "På gatan mellan främlingar", vi: "Ngoài phố giữa người lạ" },
        ],
        correctIndex: 1,
        explanationVi: "'på fikarasten, i kören, i föreningen, i tvättstugan'.",
      },
      tf(
        "q3",
        "Skribenten menar att man måste byta ut sina gamla vanor för att integreras.",
        "Tác giả cho rằng phải thay thế thói quen cũ mới hội nhập được.",
        "The writer thinks you must replace your old habits.",
        1,
        "'man byter inte ut sina gamla vanor, man lägger nya bredvid dem'.",
      ),
      {
        id: "q4",
        kind: "vocab",
        questionSv: "Vad betyder 'utgå från' i texten?",
        questionVi: "'utgå från' trong bài nghĩa là gì?",
        questionEn: "What does 'utgå från' mean?",
        options: [
          { sv: "att gå ut ur något", vi: "đi ra khỏi" },
          { sv: "att anta som självklart", vi: "mặc định, coi là hiển nhiên" },
          { sv: "att vägra", vi: "từ chối" },
          { sv: "att fråga om lov", vi: "xin phép" },
        ],
        correctIndex: 1,
        explanationVi: "'Man utgår från att den andra personen har rätt till sina egna tankar'.",
      },
      {
        id: "q5",
        kind: "heading",
        questionSv: "Vilken rubrik passar sista stycket bäst?",
        questionVi: "Tiêu đề nào hợp đoạn cuối nhất?",
        questionEn: "Which heading fits the last paragraph best?",
        options: [
          { sv: "Att lägga nya vanor bredvid de gamla", vi: "Đặt thói quen mới bên cạnh cái cũ" },
          { sv: "Varför bussar borde vara tystare", vi: "Vì sao xe buýt nên yên hơn" },
          { sv: "Livet i Hanoi är alltid bättre", vi: "Sống ở Hà Nội luôn tốt hơn" },
          { sv: "Svenskar saknar vänlighet", vi: "Người Thụy Điển thiếu thân thiện" },
        ],
        correctIndex: 0,
        explanationVi: "Đoạn cuối kết bằng chính hình ảnh 'lägger nya bredvid dem'.",
      },
    ],
  },
];

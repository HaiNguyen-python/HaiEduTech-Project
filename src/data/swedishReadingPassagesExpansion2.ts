/**
 * @file swedishReadingPassagesExpansion2.ts
 * @description Second batch of Läsförståelse passages across A1–B1.
 *              Extends the reading bank with everyday texts (notice, ad,
 *              blog, email, news) plus MCQ, T/F and vocab-in-context items.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishReadingPassage, SwedishReadingQuestion } from "./swedishReadingPassages";

const tf = (
  id: string,
  questionVi: string,
  questionEn: string,
  correct: 0 | 1,
  explanationVi: string,
): SwedishReadingQuestion => ({
  id,
  kind: "truefalse",
  questionVi,
  questionEn,
  options: [
    { sv: "Sant", vi: "Đúng" },
    { sv: "Falskt", vi: "Sai" },
  ],
  correctIndex: correct,
  explanationVi,
});

export const SWEDISH_READING_PASSAGES_EXPANSION_2: SwedishReadingPassage[] = [
  // ══════════════════════ A1 ══════════════════════
  {
    id: "read-a1-affisch-bio",
    level: "A1",
    type: "ad",
    titleSv: "Bioaffisch: Familjefilm",
    titleVi: "Áp phích rạp phim - Phim gia đình",
    titleEn: "Cinema poster: family film",
    contextVi: "Đọc áp phích quảng cáo phim ở rạp Filmstaden.",
    textSv:
      "FILMSTADEN STOCKHOLM\n\nDen magiska skogen — En äventyrsfilm för hela familjen!\n\nSpeltid: 1 timme och 30 minuter\nÅlder: Från 7 år\nSpråk: Svenska\n\nVisningar:\nMåndag–fredag klockan 17:00 och 19:30\nLördag och söndag klockan 14:00, 17:00 och 19:30\n\nBiljettpris:\nVuxen: 130 kr\nBarn (under 12 år): 80 kr\nStudent: 100 kr\n\nBoka biljetter på filmstaden.se eller i kassan.",
    textVi:
      "FILMSTADEN STOCKHOLM\n\nKhu rừng ma thuật — Phim phiêu lưu cho cả gia đình!\n\nThời lượng: 1 giờ 30 phút\nĐộ tuổi: Từ 7 tuổi\nNgôn ngữ: Tiếng Thụy Điển\n\nSuất chiếu:\nThứ Hai đến thứ Sáu lúc 17:00 và 19:30\nThứ Bảy và Chủ nhật lúc 14:00, 17:00 và 19:30\n\nGiá vé:\nNgười lớn: 130 kr\nTrẻ em (dưới 12 tuổi): 80 kr\nSinh viên: 100 kr\n\nĐặt vé trên filmstaden.se hoặc tại quầy.",
    keyVocab: [
      { sv: "speltid", vi: "thời lượng" },
      { sv: "visningar", vi: "suất chiếu" },
      { sv: "biljettpris", vi: "giá vé" },
      { sv: "kassan", vi: "quầy vé" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Phim dài bao lâu?",
        questionEn: "How long is the film?",
        options: [
          { sv: "1 timme", vi: "1 giờ" },
          { sv: "1 timme och 30 minuter", vi: "1 giờ 30 phút" },
          { sv: "2 timmar", vi: "2 giờ" },
          { sv: "45 minuter", vi: "45 phút" },
        ],
        correctIndex: 1,
        explanationVi: "'Speltid: 1 timme och 30 minuter'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Giá vé sinh viên bao nhiêu?",
        questionEn: "What is the student ticket price?",
        options: [
          { sv: "80 kr", vi: "80 kr" },
          { sv: "100 kr", vi: "100 kr" },
          { sv: "130 kr", vi: "130 kr" },
          { sv: "150 kr", vi: "150 kr" },
        ],
        correctIndex: 1,
        explanationVi: "'Student: 100 kr'.",
      },
      tf("q3", "Có suất chiếu 14:00 vào thứ Hai.", "There is a 14:00 show on Monday.", 1, "Suất 14:00 chỉ vào Thứ Bảy và Chủ nhật."),
    ],
    estimatedMinutes: 3,
  },
  {
    id: "read-a1-lapp-bibliotek",
    level: "A1",
    type: "notice",
    titleSv: "Meddelande på biblioteket",
    titleVi: "Thông báo tại thư viện",
    titleEn: "Notice at the library",
    contextVi: "Thông báo dán trên cửa thư viện thành phố.",
    textSv:
      "STOCKHOLMS STADSBIBLIOTEK\n\nÖppettider:\nMåndag–fredag: 10:00–19:00\nLördag: 11:00–16:00\nSöndag: Stängt\n\nRegler:\n1. Var tyst inne på biblioteket.\n2. Ät och drick inte i läsesalen.\n3. Låna böcker gratis med ditt lånekort.\n4. Lämna tillbaka böcker inom fyra veckor.\n\nKontakt: 08-123 45 67",
    textVi:
      "THƯ VIỆN THÀNH PHỐ STOCKHOLM\n\nGiờ mở cửa:\nThứ Hai đến thứ Sáu: 10:00–19:00\nThứ Bảy: 11:00–16:00\nChủ nhật: Đóng cửa\n\nQuy định:\n1. Giữ yên lặng trong thư viện.\n2. Không ăn uống trong phòng đọc.\n3. Mượn sách miễn phí với thẻ mượn.\n4. Trả sách trong vòng 4 tuần.\n\nLiên hệ: 08-123 45 67",
    keyVocab: [
      { sv: "öppettider", vi: "giờ mở cửa" },
      { sv: "läsesalen", vi: "phòng đọc" },
      { sv: "lånekort", vi: "thẻ mượn" },
      { sv: "lämna tillbaka", vi: "trả lại" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Chủ nhật thư viện mở cửa không?",
        questionEn: "Is the library open on Sunday?",
        options: [
          { sv: "Ja", vi: "Có" },
          { sv: "Nej, det är stängt", vi: "Không, đóng cửa" },
          { sv: "Bara på morgonen", vi: "Chỉ buổi sáng" },
          { sv: "Bara för studenter", vi: "Chỉ cho sinh viên" },
        ],
        correctIndex: 1,
        explanationVi: "'Söndag: Stängt'.",
      },
      tf("q2", "Được ăn uống trong phòng đọc.", "Eating is allowed in the reading room.", 1, "Quy định 2: không được ăn uống."),
      tf("q3", "Phải trả sách trong 4 tuần.", "Books must be returned within 4 weeks.", 0, "'inom fyra veckor' = trong 4 tuần."),
    ],
    estimatedMinutes: 3,
  },

  // ══════════════════════ A2 ══════════════════════
  {
    id: "read-a2-email-hyresvard",
    level: "A2",
    type: "email",
    titleSv: "Mejl till hyresvärden",
    titleVi: "Email gửi chủ nhà",
    titleEn: "Email to the landlord",
    contextVi: "Anna gửi email khiếu nại về máy giặt bị hỏng.",
    textSv:
      "Från: anna.lindqvist@mejl.se\nTill: info@bostadab.se\nÄmne: Trasig tvättmaskin — lägenhet 3B\n\nHej,\n\nJag heter Anna och bor på Storgatan 12, lägenhet 3B. Jag skriver för att anmäla att tvättmaskinen i tvättstugan har varit trasig i över en vecka. När jag försöker starta den lyser en röd lampa och maskinen stannar direkt.\n\nEftersom det är svårt att tvätta kläder undrar jag om ni kan skicka en reparatör så snart som möjligt. Om det inte går att laga maskinen kan ni kanske ordna en annan lösning tillfälligt?\n\nJag är hemma efter klockan 16 varje vardag.\n\nMed vänliga hälsningar,\nAnna Lindqvist\nTel: 070-123 45 67",
    textVi:
      "Từ: anna.lindqvist@mejl.se\nĐến: info@bostadab.se\nChủ đề: Máy giặt hỏng — căn hộ 3B\n\nChào,\n\nTôi là Anna, sống ở Storgatan 12, căn 3B. Tôi viết để báo máy giặt trong phòng giặt bị hỏng hơn 1 tuần. Khi tôi thử bật, đèn đỏ sáng và máy dừng ngay.\n\nVì khó giặt quần áo, tôi mong quý vị cử thợ đến sửa sớm nhất có thể. Nếu không sửa được, có thể sắp xếp giải pháp tạm thời?\n\nTôi ở nhà sau 16h các ngày trong tuần.\n\nTrân trọng,\nAnna Lindqvist\nĐT: 070-123 45 67",
    keyVocab: [
      { sv: "anmäla", vi: "báo cáo, khai báo" },
      { sv: "trasig", vi: "hỏng" },
      { sv: "tvättstugan", vi: "phòng giặt chung" },
      { sv: "reparatör", vi: "thợ sửa" },
      { sv: "tillfälligt", vi: "tạm thời" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Vấn đề Anna muốn báo là gì?",
        questionEn: "What is Anna reporting?",
        options: [
          { sv: "Höga hyror", vi: "Tiền thuê cao" },
          { sv: "Trasig tvättmaskin", vi: "Máy giặt hỏng" },
          { sv: "Ljud från grannar", vi: "Tiếng ồn từ hàng xóm" },
          { sv: "Kall lägenhet", vi: "Căn hộ lạnh" },
        ],
        correctIndex: 1,
        explanationVi: "Chủ đề email: 'Trasig tvättmaskin'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Máy giặt hỏng bao lâu rồi?",
        questionEn: "How long has the machine been broken?",
        options: [
          { sv: "En dag", vi: "1 ngày" },
          { sv: "Tre dagar", vi: "3 ngày" },
          { sv: "Över en vecka", vi: "Hơn 1 tuần" },
          { sv: "En månad", vi: "1 tháng" },
        ],
        correctIndex: 2,
        explanationVi: "'trasig i över en vecka'.",
      },
      {
        id: "q3",
        kind: "vocab",
        questionVi: "'Trasig' trong bài có nghĩa gần nhất với?",
        questionEn: "'Trasig' is closest in meaning to?",
        options: [
          { sv: "ny", vi: "mới" },
          { sv: "fungerar inte", vi: "không hoạt động" },
          { sv: "dyr", vi: "đắt" },
          { sv: "stor", vi: "to" },
        ],
        correctIndex: 1,
        explanationVi: "'Trasig' = hỏng, không hoạt động.",
      },
      tf("q4", "Anna ở nhà buổi sáng các ngày trong tuần.", "Anna is home in the morning on weekdays.", 1, "Cô ấy ở nhà sau 16 giờ."),
    ],
    estimatedMinutes: 5,
  },
  {
    id: "read-a2-blogg-hobby",
    level: "A2",
    type: "blog",
    titleSv: "Min nya hobby",
    titleVi: "Sở thích mới của tôi",
    titleEn: "My new hobby",
    contextVi: "Bài blog cá nhân về việc bắt đầu học nhiếp ảnh.",
    textSv:
      "För tre månader sedan köpte jag min första kamera. Sedan dess har jag blivit helt fast i fotografering. Varje helg går jag ut i naturen och tar bilder på fåglar, träd och gamla hus.\n\nI början var det svårt eftersom jag inte visste hur kameran fungerade. Jag såg många videor på YouTube och gick också en kurs på ABF. Efter några veckor började mina bilder bli riktigt bra.\n\nDet bästa med fotografering är att man lär sig att se världen på ett nytt sätt. Man märker små detaljer som man annars skulle ha missat. Nästa månad ska jag ha min första utställning i ett litet café. Jag är både nervös och glad!",
    textVi:
      "Ba tháng trước tôi mua chiếc máy ảnh đầu tiên. Từ đó tôi đâm mê nhiếp ảnh. Cuối tuần nào tôi cũng ra thiên nhiên chụp chim, cây và nhà cổ.\n\nBan đầu rất khó vì tôi không biết dùng máy ảnh. Tôi xem nhiều video trên YouTube và tham gia một khóa ở ABF. Sau vài tuần, ảnh tôi bắt đầu đẹp thật sự.\n\nĐiều tuyệt nhất khi chụp ảnh là ta học cách nhìn thế giới theo cách mới. Ta để ý những chi tiết nhỏ mà bình thường sẽ bỏ qua. Tháng tới tôi sẽ có buổi triển lãm đầu tiên ở một quán cà phê nhỏ. Vừa hồi hộp vừa vui!",
    keyVocab: [
      { sv: "fast i", vi: "đâm mê" },
      { sv: "fotografering", vi: "nhiếp ảnh" },
      { sv: "utställning", vi: "triển lãm" },
      { sv: "detaljer", vi: "chi tiết" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Người viết chụp ảnh bao lâu rồi?",
        questionEn: "How long has the writer been photographing?",
        options: [
          { sv: "En månad", vi: "1 tháng" },
          { sv: "Tre månader", vi: "3 tháng" },
          { sv: "Ett år", vi: "1 năm" },
          { sv: "Fem år", vi: "5 năm" },
        ],
        correctIndex: 1,
        explanationVi: "'För tre månader sedan köpte jag min första kamera'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Người viết học nhiếp ảnh như thế nào?",
        questionEn: "How did the writer learn photography?",
        options: [
          { sv: "Bara böcker", vi: "Chỉ đọc sách" },
          { sv: "YouTube och en kurs", vi: "YouTube và một khóa học" },
          { sv: "En privatlärare", vi: "Gia sư riêng" },
          { sv: "Universitet", vi: "Đại học" },
        ],
        correctIndex: 1,
        explanationVi: "'Jag såg videor på YouTube och gick en kurs på ABF'.",
      },
      tf("q3", "Người viết sẽ có triển lãm tháng tới.", "The writer will have an exhibition next month.", 0, "'Nästa månad ska jag ha min första utställning'."),
    ],
    estimatedMinutes: 5,
  },

  // ══════════════════════ B1 ══════════════════════
  {
    id: "read-b1-artikel-cykel",
    level: "B1",
    type: "article",
    titleSv: "Cykelstaden Malmö",
    titleVi: "Malmö - Thành phố xe đạp",
    titleEn: "Malmö the cycling city",
    contextVi: "Bài báo về việc Malmö trở thành thành phố xe đạp hàng đầu Bắc Âu.",
    textSv:
      "Malmö har på bara tio år förvandlats till en av Nordens ledande cykelstäder. Idag används cykel för mer än en fjärdedel av alla resor inom staden, en siffra som är dubbelt så hög som i Stockholm. Bakom framgången ligger flera medvetna politiska beslut.\n\nFör det första har staden byggt över femhundra kilometer säkra cykelvägar, ofta helt skilda från biltrafiken. För det andra har hastighetsgränsen på många gator sänkts till trettio kilometer i timmen, vilket gör det tryggare att cykla. Dessutom har det byggts stora cykelparkeringar vid stationer och köpcentrum.\n\nInte alla är nöjda med utvecklingen. Bilister klagar över minskade körfält och färre parkeringsplatser. Kommunen menar dock att fördelarna — mindre luftföroreningar, bättre folkhälsa och mindre trafikstockningar — väger tyngre. Staden planerar nu att fördubbla antalet cykelbanor till år 2030.",
    textVi:
      "Malmö chỉ trong 10 năm đã trở thành một trong những thành phố xe đạp hàng đầu Bắc Âu. Ngày nay hơn 1/4 số chuyến đi trong thành phố dùng xe đạp, gấp đôi Stockholm. Đằng sau thành công là nhiều quyết định chính trị có chủ đích.\n\nThứ nhất, thành phố đã xây hơn 500 km đường xe đạp an toàn, thường tách biệt với xe hơi. Thứ hai, giới hạn tốc độ nhiều đường bị giảm xuống 30 km/h, giúp đi xe đạp an toàn hơn. Ngoài ra, các bãi gửi xe đạp lớn được xây tại ga và trung tâm mua sắm.\n\nKhông phải ai cũng hài lòng. Người lái xe hơi phàn nàn vì bớt làn và ít chỗ đậu. Nhưng thành phố cho rằng lợi ích - giảm ô nhiễm, sức khỏe tốt hơn, ít kẹt xe - quan trọng hơn. Thành phố dự định gấp đôi số làn xe đạp đến năm 2030.",
    keyVocab: [
      { sv: "cykelväg", vi: "làn xe đạp" },
      { sv: "hastighetsgräns", vi: "giới hạn tốc độ" },
      { sv: "luftföroreningar", vi: "ô nhiễm không khí" },
      { sv: "trafikstockningar", vi: "kẹt xe" },
      { sv: "fördubbla", vi: "gấp đôi" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Tỷ lệ chuyến đi bằng xe đạp ở Malmö bao nhiêu?",
        questionEn: "What share of trips are made by bicycle?",
        options: [
          { sv: "En tiondel", vi: "1/10" },
          { sv: "En femtedel", vi: "1/5" },
          { sv: "Mer än en fjärdedel", vi: "Hơn 1/4" },
          { sv: "Hälften", vi: "Một nửa" },
        ],
        correctIndex: 2,
        explanationVi: "'mer än en fjärdedel av alla resor'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Ai chỉ trích sự thay đổi này?",
        questionEn: "Who is critical of the change?",
        options: [
          { sv: "Cyklister", vi: "Người đi xe đạp" },
          { sv: "Bilister", vi: "Người lái xe hơi" },
          { sv: "Studenter", vi: "Sinh viên" },
          { sv: "Turister", vi: "Du khách" },
        ],
        correctIndex: 1,
        explanationVi: "'Bilister klagar över minskade körfält'.",
      },
      {
        id: "q3",
        kind: "vocab",
        questionVi: "'Fördubbla' có nghĩa gần nhất với?",
        questionEn: "'Fördubbla' is closest to?",
        options: [
          { sv: "halvera", vi: "cắt một nửa" },
          { sv: "dubbelt så mycket", vi: "gấp đôi" },
          { sv: "minska", vi: "giảm" },
          { sv: "ta bort", vi: "loại bỏ" },
        ],
        correctIndex: 1,
        explanationVi: "'fördubbla' = làm gấp đôi.",
      },
      tf("q4", "Kế hoạch đến năm 2030 là gấp đôi số làn xe đạp.", "By 2030 they plan to double bicycle lanes.", 0, "'fördubbla antalet cykelbanor till år 2030'."),
    ],
    estimatedMinutes: 7,
  },
  {
    id: "read-b1-nyheter-utbildning",
    level: "B1",
    type: "news",
    titleSv: "Studenter kräver bättre bostäder",
    titleVi: "Sinh viên đòi nhà ở tốt hơn",
    titleEn: "Students demand better housing",
    contextVi: "Bản tin về cuộc biểu tình của sinh viên đòi nhà ở giá rẻ.",
    textSv:
      "Igår samlades tusentals studenter i centrala Göteborg för att protestera mot bostadsbristen. Enligt en färsk undersökning står över tjugotusen studenter i kö för studentbostad i Göteborg, och väntetiden är i genomsnitt två år.\n\nDemonstranterna krävde att staten och universiteten gemensamt bygger fler bostäder till rimliga priser. \"Utan bostad blir det omöjligt att fokusera på studierna,\" sa en av arrangörerna, en språkstuderande vid Göteborgs universitet.\n\nRegeringens talesperson svarade att man tar frågan på allvar och att en ny satsning på fem tusen nya studentbostäder ska presenteras nästa månad. Kritiker anser dock att detta är otillräckligt eftersom bristen är mycket större i verkligheten.",
    textVi:
      "Hôm qua hàng ngàn sinh viên tụ tập ở trung tâm Göteborg biểu tình vì thiếu nhà. Theo khảo sát mới, hơn 20.000 sinh viên đang xếp hàng chờ nhà ở sinh viên tại Göteborg, thời gian chờ trung bình là 2 năm.\n\nNgười biểu tình yêu cầu nhà nước và các trường đại học cùng xây thêm nhà ở giá hợp lý. \"Không có nhà thì không thể tập trung học,\" một người tổ chức - sinh viên ngôn ngữ tại ĐH Göteborg - nói.\n\nPhát ngôn viên chính phủ trả lời rằng họ xem xét vấn đề nghiêm túc và một dự án 5.000 nhà ở sinh viên mới sẽ được công bố tháng tới. Nhưng giới phê bình cho rằng con số này chưa đủ vì thực tế thiếu nhiều hơn.",
    keyVocab: [
      { sv: "bostadsbrist", vi: "thiếu nhà ở" },
      { sv: "kö", vi: "hàng đợi" },
      { sv: "väntetid", vi: "thời gian chờ" },
      { sv: "arrangör", vi: "người tổ chức" },
      { sv: "otillräckligt", vi: "không đủ" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Thời gian chờ trung bình cho nhà ở sinh viên là?",
        questionEn: "What is the average waiting time?",
        options: [
          { sv: "Sex månader", vi: "6 tháng" },
          { sv: "Ett år", vi: "1 năm" },
          { sv: "Två år", vi: "2 năm" },
          { sv: "Fem år", vi: "5 năm" },
        ],
        correctIndex: 2,
        explanationVi: "'väntetiden är i genomsnitt två år'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Chính phủ hứa xây bao nhiêu nhà ở?",
        questionEn: "How many homes does the government promise?",
        options: [
          { sv: "1000", vi: "1000" },
          { sv: "3000", vi: "3000" },
          { sv: "5000", vi: "5000" },
          { sv: "20000", vi: "20000" },
        ],
        correctIndex: 2,
        explanationVi: "'fem tusen nya studentbostäder'.",
      },
      {
        id: "q3",
        kind: "vocab",
        questionVi: "'Otillräckligt' có nghĩa?",
        questionEn: "'Otillräckligt' means?",
        options: [
          { sv: "för mycket", vi: "quá nhiều" },
          { sv: "inte tillräckligt", vi: "không đủ" },
          { sv: "perfekt", vi: "hoàn hảo" },
          { sv: "billigt", vi: "rẻ" },
        ],
        correctIndex: 1,
        explanationVi: "'o-' là tiền tố phủ định + 'tillräckligt' (đủ) = không đủ.",
      },
      tf("q4", "Giới phê bình hài lòng với kế hoạch của chính phủ.", "Critics are satisfied with the plan.", 1, "'Kritiker anser dock att detta är otillräckligt'."),
    ],
    estimatedMinutes: 7,
  },
];

/**
 * @file swedishListeningExercisesExpansion2.ts
 * @description Second batch of Hörförståelse practice items (A1–B1) — extends
 *              the Swedish Skills Lab listening bank with additional dialogues,
 *              announcements and news monologues across all levels.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishListeningExercise } from "./swedishListeningExercises";

export const SWEDISH_LISTENING_EXERCISES_EXPANSION_2: SwedishListeningExercise[] = [
  // ═════════════════════ A1 ═════════════════════
  {
    id: "lis-a1-fraga-vagen",
    level: "A1",
    titleVi: "Hỏi đường đến ga tàu",
    titleEn: "Asking the way to the station",
    type: "dialogue",
    contextVi: "Một du khách hỏi đường đến ga trung tâm. Nghe hướng dẫn cơ bản.",
    scriptSv:
      "Ursäkta, hur kommer jag till Centralstationen? — Du går rakt fram, sedan svänger du till höger vid trafikljuset. Stationen ligger på vänster sida. — Är det långt? — Nej, det tar bara fem minuter till fots. — Tack så mycket! — Ingen orsak.",
    scriptVi:
      "Xin lỗi, tôi đi đến Ga Trung tâm như thế nào? — Bạn đi thẳng, sau đó rẽ phải ở đèn giao thông. Ga ở bên trái. — Có xa không? — Không, chỉ 5 phút đi bộ. — Cảm ơn nhiều! — Không có gì.",
    keyVocab: [
      { sv: "rakt fram", vi: "đi thẳng" },
      { sv: "sväng till höger", vi: "rẽ phải" },
      { sv: "till fots", vi: "đi bộ" },
      { sv: "Ingen orsak", vi: "Không có gì" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Đi bộ đến ga mất bao lâu?",
        questionEn: "How long does it take on foot?",
        options: [
          { sv: "Två minuter", vi: "2 phút" },
          { sv: "Fem minuter", vi: "5 phút" },
          { sv: "Tio minuter", vi: "10 phút" },
          { sv: "En halvtimme", vi: "Nửa giờ" },
        ],
        correctIndex: 1,
        explanationVi: "'Det tar bara fem minuter till fots' = 5 phút đi bộ.",
      },
      {
        id: "q2",
        questionVi: "Ga ở bên nào?",
        questionEn: "Which side is the station on?",
        options: [
          { sv: "Höger sida", vi: "Bên phải" },
          { sv: "Vänster sida", vi: "Bên trái" },
          { sv: "Rakt fram", vi: "Phía trước" },
          { sv: "Bakom", vi: "Phía sau" },
        ],
        correctIndex: 1,
        explanationVi: "'Stationen ligger på vänster sida' = ga ở bên trái.",
      },
    ],
    recommendedRate: 0.9,
  },
  {
    id: "lis-a1-vader-idag",
    level: "A1",
    titleVi: "Dự báo thời tiết ngắn",
    titleEn: "Short weather forecast",
    type: "announcement",
    contextVi: "Bản tin thời tiết trên radio buổi sáng.",
    scriptSv:
      "God morgon och välkomna till väderrapporten. Idag blir det soligt i södra Sverige med temperaturer runt tjugo grader. I norr regnar det och temperaturen ligger på tio grader. I morgon förväntas molnigt väder över hela landet.",
    scriptVi:
      "Chào buổi sáng và chào mừng đến với bản tin thời tiết. Hôm nay miền nam Thụy Điển sẽ nắng với nhiệt độ khoảng 20 độ. Miền bắc có mưa, nhiệt độ 10 độ. Ngày mai dự báo cả nước nhiều mây.",
    keyVocab: [
      { sv: "soligt", vi: "nắng" },
      { sv: "molnigt", vi: "nhiều mây" },
      { sv: "regnar", vi: "mưa" },
      { sv: "grader", vi: "độ (nhiệt độ)" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Miền nam Thụy Điển hôm nay thế nào?",
        questionEn: "What is the weather like in southern Sweden today?",
        options: [
          { sv: "Regnigt", vi: "Có mưa" },
          { sv: "Soligt", vi: "Nắng" },
          { sv: "Snöigt", vi: "Có tuyết" },
          { sv: "Blåsigt", vi: "Nhiều gió" },
        ],
        correctIndex: 1,
        explanationVi: "'Idag blir det soligt i södra Sverige' = miền nam có nắng.",
      },
      {
        id: "q2",
        questionVi: "Ngày mai thời tiết ra sao?",
        questionEn: "What will tomorrow's weather be like?",
        options: [
          { sv: "Soligt", vi: "Nắng" },
          { sv: "Molnigt", vi: "Nhiều mây" },
          { sv: "Regnigt", vi: "Mưa" },
          { sv: "Klart", vi: "Trong xanh" },
        ],
        correctIndex: 1,
        explanationVi: "'I morgon förväntas molnigt väder' = ngày mai nhiều mây.",
      },
    ],
    recommendedRate: 0.9,
  },
  {
    id: "lis-a1-familjen",
    level: "A1",
    titleVi: "Nói về gia đình",
    titleEn: "Talking about family",
    type: "monologue",
    contextVi: "Erik giới thiệu về gia đình mình.",
    scriptSv:
      "Jag heter Erik och jag har en stor familj. Min mamma heter Karin och hon är lärare. Min pappa heter Björn och han jobbar som ingenjör. Jag har en syster som heter Emma. Hon är arton år och studerar på gymnasiet. Vi bor tillsammans i ett hus i Uppsala.",
    scriptVi:
      "Tôi tên Erik và tôi có một gia đình lớn. Mẹ tôi tên Karin và bà là giáo viên. Bố tôi tên Björn và ông làm kỹ sư. Tôi có một em gái tên Emma. Em ấy 18 tuổi và học trung học phổ thông. Chúng tôi sống cùng nhau trong một ngôi nhà ở Uppsala.",
    keyVocab: [
      { sv: "lärare", vi: "giáo viên" },
      { sv: "ingenjör", vi: "kỹ sư" },
      { sv: "syster", vi: "chị/em gái" },
      { sv: "gymnasiet", vi: "trung học phổ thông" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Mẹ của Erik làm nghề gì?",
        questionEn: "What is Erik's mother's job?",
        options: [
          { sv: "Ingenjör", vi: "Kỹ sư" },
          { sv: "Lärare", vi: "Giáo viên" },
          { sv: "Läkare", vi: "Bác sĩ" },
          { sv: "Student", vi: "Sinh viên" },
        ],
        correctIndex: 1,
        explanationVi: "'Min mamma ... är lärare' = mẹ là giáo viên.",
      },
      {
        id: "q2",
        questionVi: "Erik có mấy anh chị em?",
        questionEn: "How many siblings does Erik have?",
        options: [
          { sv: "En bror", vi: "Một anh trai" },
          { sv: "En syster", vi: "Một em gái" },
          { sv: "Två systrar", vi: "Hai chị em gái" },
          { sv: "Ingen", vi: "Không có" },
        ],
        correctIndex: 1,
        explanationVi: "'Jag har en syster' = có một chị/em gái.",
      },
    ],
    recommendedRate: 0.9,
  },

  // ═════════════════════ A2 ═════════════════════
  {
    id: "lis-a2-lakarbesok",
    level: "A2",
    titleVi: "Đi khám bác sĩ",
    titleEn: "Doctor visit",
    type: "dialogue",
    contextVi: "Anna đến phòng khám vì bị cảm cúm. Nghe cuộc trao đổi với bác sĩ.",
    scriptSv:
      "Hej, vad kan jag hjälpa dig med? — Jag känner mig sjuk. Jag har hosta och feber sedan tre dagar. — Har du ont i halsen också? — Ja, det gör ont när jag sväljer. — Jag tror att du har en förkylning. Du behöver vila och dricka mycket vatten. Här är ett recept på hostmedicin. — Tack, doktorn. Hur länge ska jag stanna hemma? — Minst tre dagar.",
    scriptVi:
      "Chào, tôi có thể giúp gì cho bạn? — Tôi thấy không khỏe. Tôi bị ho và sốt 3 ngày rồi. — Có đau họng không? — Có, nuốt bị đau. — Tôi nghĩ bạn bị cảm. Bạn cần nghỉ ngơi và uống nhiều nước. Đây là toa thuốc ho. — Cảm ơn bác sĩ. Tôi phải ở nhà bao lâu? — Ít nhất 3 ngày.",
    keyVocab: [
      { sv: "hosta", vi: "ho" },
      { sv: "feber", vi: "sốt" },
      { sv: "svälja", vi: "nuốt" },
      { sv: "recept", vi: "toa thuốc" },
      { sv: "förkylning", vi: "cảm lạnh" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Anna bị sốt bao lâu?",
        questionEn: "How long has Anna had a fever?",
        options: [
          { sv: "En dag", vi: "1 ngày" },
          { sv: "Två dagar", vi: "2 ngày" },
          { sv: "Tre dagar", vi: "3 ngày" },
          { sv: "En vecka", vi: "1 tuần" },
        ],
        correctIndex: 2,
        explanationVi: "'sedan tre dagar' = từ 3 ngày trước.",
      },
      {
        id: "q2",
        questionVi: "Bác sĩ khuyên Anna làm gì?",
        questionEn: "What does the doctor recommend?",
        options: [
          { sv: "Springa mycket", vi: "Chạy nhiều" },
          { sv: "Vila och dricka vatten", vi: "Nghỉ và uống nước" },
          { sv: "Åka på semester", vi: "Đi nghỉ mát" },
          { sv: "Arbeta hemifrån", vi: "Làm việc tại nhà" },
        ],
        correctIndex: 1,
        explanationVi: "'Du behöver vila och dricka mycket vatten'.",
      },
      {
        id: "q3",
        questionVi: "Anna phải ở nhà ít nhất bao lâu?",
        questionEn: "How long must Anna stay home?",
        options: [
          { sv: "En dag", vi: "1 ngày" },
          { sv: "Två dagar", vi: "2 ngày" },
          { sv: "Tre dagar", vi: "3 ngày" },
          { sv: "En vecka", vi: "1 tuần" },
        ],
        correctIndex: 2,
        explanationVi: "'Minst tre dagar' = ít nhất 3 ngày.",
      },
    ],
    recommendedRate: 1.0,
  },
  {
    id: "lis-a2-tag-annons",
    level: "A2",
    titleVi: "Thông báo trên tàu",
    titleEn: "Train announcement",
    type: "announcement",
    contextVi: "Thông báo trên tàu tốc hành từ Stockholm đến Göteborg.",
    scriptSv:
      "Bästa resenärer, välkomna ombord på SJ:s snabbtåg 421 med destination Göteborg. Nästa stopp är Södertälje syd om cirka tio minuter. Bistrovagnen är öppen i vagn fyra där ni kan köpa kaffe, smörgåsar och varm mat. Vi beklagar en försening på fem minuter på grund av signalfel. Tack för att ni reser med SJ.",
    scriptVi:
      "Kính chào hành khách, chào mừng lên chuyến tàu tốc hành SJ số 421 đi Göteborg. Ga tiếp theo là Södertälje syd trong khoảng 10 phút. Toa ăn mở ở toa số 4, có bán cà phê, bánh mì kẹp và đồ nóng. Chúng tôi xin lỗi vì trễ 5 phút do sự cố tín hiệu. Cảm ơn quý khách đã đi tàu SJ.",
    keyVocab: [
      { sv: "resenärer", vi: "hành khách" },
      { sv: "destination", vi: "điểm đến" },
      { sv: "bistrovagnen", vi: "toa ăn" },
      { sv: "försening", vi: "trễ giờ" },
      { sv: "signalfel", vi: "lỗi tín hiệu" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Tàu đi đâu?",
        questionEn: "Where is the train going?",
        options: [
          { sv: "Stockholm", vi: "Stockholm" },
          { sv: "Göteborg", vi: "Göteborg" },
          { sv: "Malmö", vi: "Malmö" },
          { sv: "Uppsala", vi: "Uppsala" },
        ],
        correctIndex: 1,
        explanationVi: "'med destination Göteborg' = điểm đến Göteborg.",
      },
      {
        id: "q2",
        questionVi: "Toa ăn ở toa số mấy?",
        questionEn: "Which car has the bistro?",
        options: [
          { sv: "Två", vi: "2" },
          { sv: "Tre", vi: "3" },
          { sv: "Fyra", vi: "4" },
          { sv: "Fem", vi: "5" },
        ],
        correctIndex: 2,
        explanationVi: "'Bistrovagnen är öppen i vagn fyra'.",
      },
      {
        id: "q3",
        questionVi: "Tại sao tàu trễ?",
        questionEn: "Why is the train delayed?",
        options: [
          { sv: "Dåligt väder", vi: "Thời tiết xấu" },
          { sv: "Signalfel", vi: "Lỗi tín hiệu" },
          { sv: "Många passagerare", vi: "Đông khách" },
          { sv: "Strejk", vi: "Đình công" },
        ],
        correctIndex: 1,
        explanationVi: "'på grund av signalfel' = do lỗi tín hiệu.",
      },
    ],
    recommendedRate: 1.0,
  },
  {
    id: "lis-a2-jobbintervju",
    level: "A2",
    titleVi: "Phỏng vấn xin việc bán thời gian",
    titleEn: "Part-time job interview",
    type: "dialogue",
    contextVi: "Sara phỏng vấn cho công việc phục vụ bàn.",
    scriptSv:
      "Berätta lite om dig själv. — Jag heter Sara och jag studerar ekonomi. Jag söker ett extrajobb för att tjäna lite pengar. — Har du någon erfarenhet av restaurangarbete? — Ja, jag jobbade som servitör i ett halvår förra sommaren. — Bra. Kan du jobba på kvällar och helger? — Ja, det passar mig bra. — När kan du börja? — Jag kan börja nästa måndag.",
    scriptVi:
      "Hãy nói sơ về bản thân. — Tôi tên Sara và đang học kinh tế. Tôi tìm việc làm thêm để kiếm ít tiền. — Bạn có kinh nghiệm làm nhà hàng không? — Có, tôi làm phục vụ nửa năm mùa hè trước. — Tốt. Bạn có thể làm tối và cuối tuần không? — Có, phù hợp với tôi. — Khi nào bạn bắt đầu được? — Thứ Hai tới.",
    keyVocab: [
      { sv: "extrajobb", vi: "việc làm thêm" },
      { sv: "erfarenhet", vi: "kinh nghiệm" },
      { sv: "servitör", vi: "phục vụ bàn" },
      { sv: "helger", vi: "cuối tuần" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Sara học ngành gì?",
        questionEn: "What does Sara study?",
        options: [
          { sv: "Medicin", vi: "Y" },
          { sv: "Ekonomi", vi: "Kinh tế" },
          { sv: "Juridik", vi: "Luật" },
          { sv: "Konst", vi: "Nghệ thuật" },
        ],
        correctIndex: 1,
        explanationVi: "'jag studerar ekonomi' = học kinh tế.",
      },
      {
        id: "q2",
        questionVi: "Sara đã làm phục vụ bao lâu?",
        questionEn: "How long did Sara work as a waitress?",
        options: [
          { sv: "Ett år", vi: "1 năm" },
          { sv: "Ett halvår", vi: "Nửa năm" },
          { sv: "Två månader", vi: "2 tháng" },
          { sv: "En vecka", vi: "1 tuần" },
        ],
        correctIndex: 1,
        explanationVi: "'jag jobbade som servitör i ett halvår'.",
      },
    ],
    recommendedRate: 1.0,
  },

  // ═════════════════════ B1 ═════════════════════
  {
    id: "lis-b1-klimat-nyheter",
    level: "B1",
    titleVi: "Tin tức về biến đổi khí hậu",
    titleEn: "Climate change news",
    type: "news",
    contextVi: "Bản tin ngắn về biện pháp giảm khí thải ở Thụy Điển.",
    scriptSv:
      "Sveriges regering presenterade idag ett nytt förslag för att minska utsläppen av koldioxid. Enligt förslaget ska alla nya bilar vara elektriska senast år 2030. Dessutom kommer staten att investera fyrtio miljarder kronor i förnybar energi under de kommande tio åren. Miljöministern betonade att målet är att Sverige ska vara klimatneutralt år 2045. Kritiker menar dock att förslaget inte är tillräckligt ambitiöst.",
    scriptVi:
      "Chính phủ Thụy Điển hôm nay công bố đề xuất mới nhằm giảm khí thải CO2. Theo đề xuất, mọi ô tô mới phải là xe điện chậm nhất năm 2030. Ngoài ra, nhà nước sẽ đầu tư 40 tỷ krona vào năng lượng tái tạo trong 10 năm tới. Bộ trưởng Môi trường nhấn mạnh mục tiêu Thụy Điển trung hòa khí hậu vào năm 2045. Tuy nhiên, giới phê bình cho rằng đề xuất chưa đủ tham vọng.",
    keyVocab: [
      { sv: "utsläpp", vi: "khí thải" },
      { sv: "koldioxid", vi: "CO2" },
      { sv: "förnybar energi", vi: "năng lượng tái tạo" },
      { sv: "klimatneutralt", vi: "trung hòa khí hậu" },
      { sv: "ambitiöst", vi: "tham vọng" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Đến năm nào ô tô mới phải là xe điện?",
        questionEn: "By what year must new cars be electric?",
        options: [
          { sv: "2025", vi: "2025" },
          { sv: "2030", vi: "2030" },
          { sv: "2040", vi: "2040" },
          { sv: "2045", vi: "2045" },
        ],
        correctIndex: 1,
        explanationVi: "'alla nya bilar vara elektriska senast år 2030'.",
      },
      {
        id: "q2",
        questionVi: "Nhà nước đầu tư bao nhiêu?",
        questionEn: "How much will the state invest?",
        options: [
          { sv: "10 miljarder", vi: "10 tỷ" },
          { sv: "20 miljarder", vi: "20 tỷ" },
          { sv: "40 miljarder", vi: "40 tỷ" },
          { sv: "100 miljarder", vi: "100 tỷ" },
        ],
        correctIndex: 2,
        explanationVi: "'fyrtio miljarder kronor i förnybar energi'.",
      },
      {
        id: "q3",
        questionVi: "Giới phê bình nghĩ gì về đề xuất?",
        questionEn: "What do critics think of the proposal?",
        options: [
          { sv: "För ambitiöst", vi: "Quá tham vọng" },
          { sv: "Inte tillräckligt ambitiöst", vi: "Chưa đủ tham vọng" },
          { sv: "Perfekt", vi: "Hoàn hảo" },
          { sv: "För dyrt", vi: "Quá đắt" },
        ],
        correctIndex: 1,
        explanationVi: "'förslaget inte är tillräckligt ambitiöst'.",
      },
    ],
    recommendedRate: 1.0,
  },
  {
    id: "lis-b1-bostadsmarknad",
    level: "B1",
    titleVi: "Thảo luận về thị trường nhà ở",
    titleEn: "Housing market discussion",
    type: "dialogue",
    contextVi: "Hai người bạn nói về khó khăn tìm nhà ở Stockholm.",
    scriptSv:
      "Har du hittat en lägenhet än? — Nej, det är verkligen svårt. Hyresmarknaden i Stockholm är extremt tuff. Man kan behöva vänta i tio år för en förstahandskontrakt. — Har du tänkt på att köpa istället? — Jo, men priserna har stigit så mycket att jag inte har råd. En etta i innerstan kostar över tre miljoner nu. — Vad gör du då? — Jag hyr i andrahand tills vidare, men det är osäkert och dyrt.",
    scriptVi:
      "Cậu tìm được căn hộ chưa? — Chưa, khó thật. Thị trường thuê ở Stockholm cực kỳ khắc nghiệt. Có thể chờ 10 năm mới có hợp đồng chính. — Cậu tính mua thay vì thuê không? — Có, nhưng giá tăng quá cao, tớ không kham nổi. Một căn studio trung tâm giờ hơn 3 triệu. — Vậy giờ làm sao? — Tớ thuê lại tạm, nhưng không ổn định và đắt.",
    keyVocab: [
      { sv: "hyresmarknad", vi: "thị trường thuê" },
      { sv: "förstahandskontrakt", vi: "hợp đồng thuê chính" },
      { sv: "andrahand", vi: "thuê lại (từ người thuê chính)" },
      { sv: "ha råd", vi: "kham nổi tài chính" },
      { sv: "osäkert", vi: "không ổn định" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Có thể phải chờ bao lâu để có hợp đồng thuê chính?",
        questionEn: "How long can one wait for a first-hand contract?",
        options: [
          { sv: "Ett år", vi: "1 năm" },
          { sv: "Fem år", vi: "5 năm" },
          { sv: "Tio år", vi: "10 năm" },
          { sv: "Tjugo år", vi: "20 năm" },
        ],
        correctIndex: 2,
        explanationVi: "'vänta i tio år för en förstahandskontrakt'.",
      },
      {
        id: "q2",
        questionVi: "Tại sao người này không mua nhà?",
        questionEn: "Why doesn't the speaker buy?",
        options: [
          { sv: "Han vill inte", vi: "Không muốn" },
          { sv: "Han har inte råd", vi: "Không đủ tiền" },
          { sv: "Han ska flytta", vi: "Sắp chuyển đi" },
          { sv: "Hans familj bor där", vi: "Gia đình đang ở đó" },
        ],
        correctIndex: 1,
        explanationVi: "'jag inte har råd' = không kham nổi.",
      },
      {
        id: "q3",
        questionVi: "Người đó đang ở đâu?",
        questionEn: "How is the speaker currently housed?",
        options: [
          { sv: "Han äger en lägenhet", vi: "Sở hữu căn hộ" },
          { sv: "Han hyr i andrahand", vi: "Thuê lại" },
          { sv: "Han bor med föräldrar", vi: "Ở với bố mẹ" },
          { sv: "Han bor på hotell", vi: "Ở khách sạn" },
        ],
        correctIndex: 1,
        explanationVi: "'Jag hyr i andrahand tills vidare'.",
      },
    ],
    recommendedRate: 1.0,
  },
  {
    id: "lis-b1-digitalisering",
    level: "B1",
    titleVi: "Số hóa nơi làm việc",
    titleEn: "Digitalisation at work",
    type: "monologue",
    contextVi: "Bài phát biểu ngắn về ảnh hưởng của số hóa đến công việc.",
    scriptSv:
      "Digitaliseringen har förändrat arbetslivet i grunden. För tio år sedan hade få människor möjlighet att jobba hemifrån, men idag är distansarbete en självklarhet i många yrken. Å ena sidan ger detta större flexibilitet och bättre balans mellan arbete och fritid. Å andra sidan kan gränsen mellan arbete och privatliv suddas ut, vilket kan leda till stress och utbrändhet. Enligt en ny studie uppger var tredje anställd att de känner sig mer stressade nu än före pandemin.",
    scriptVi:
      "Số hóa đã thay đổi công việc tận gốc. 10 năm trước ít ai có thể làm việc tại nhà, nhưng nay làm từ xa là chuyện đương nhiên ở nhiều ngành. Một mặt, điều này cho sự linh hoạt lớn hơn và cân bằng công việc-đời sống tốt hơn. Mặt khác, ranh giới giữa công việc và đời sống riêng có thể bị xóa nhòa, dẫn tới stress và kiệt sức. Theo một nghiên cứu mới, cứ 3 người thì có 1 nói họ căng thẳng hơn so với trước đại dịch.",
    keyVocab: [
      { sv: "digitalisering", vi: "số hóa" },
      { sv: "distansarbete", vi: "làm việc từ xa" },
      { sv: "flexibilitet", vi: "sự linh hoạt" },
      { sv: "utbrändhet", vi: "kiệt sức" },
      { sv: "å ena sidan / å andra sidan", vi: "một mặt / mặt khác" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Ý chính của bài là gì?",
        questionEn: "What is the main idea?",
        options: [
          { sv: "Distansarbete är alltid dåligt", vi: "Làm từ xa luôn tệ" },
          { sv: "Digitalisering har både för- och nackdelar", vi: "Số hóa có cả lợi và hại" },
          { sv: "Alla borde jobba på kontor", vi: "Tất cả nên làm văn phòng" },
          { sv: "Pandemin var positiv", vi: "Đại dịch là tích cực" },
        ],
        correctIndex: 1,
        explanationVi: "Cấu trúc 'å ena sidan / å andra sidan' cho thấy cả 2 mặt.",
      },
      {
        id: "q2",
        questionVi: "Một hệ quả tiêu cực nào được nêu?",
        questionEn: "What negative consequence is mentioned?",
        options: [
          { sv: "Bättre lön", vi: "Lương tốt hơn" },
          { sv: "Mer stress och utbrändhet", vi: "Căng thẳng và kiệt sức" },
          { sv: "Färre möten", vi: "Ít họp hơn" },
          { sv: "Kortare arbetsdagar", vi: "Ngày làm ngắn hơn" },
        ],
        correctIndex: 1,
        explanationVi: "'leda till stress och utbrändhet'.",
      },
      {
        id: "q3",
        questionVi: "Bao nhiêu người cảm thấy stress hơn trước đại dịch?",
        questionEn: "How many feel more stressed than before the pandemic?",
        options: [
          { sv: "Var femte", vi: "1 trong 5" },
          { sv: "Var tredje", vi: "1 trong 3" },
          { sv: "Hälften", vi: "Một nửa" },
          { sv: "Alla", vi: "Tất cả" },
        ],
        correctIndex: 1,
        explanationVi: "'var tredje anställd' = cứ 3 người có 1.",
      },
    ],
    recommendedRate: 1.0,
  },
];

/**
 * @file swedishListeningExercisesExpansion3.ts
 * @description Additional A1 listening exercises for the Swedish Listening Lab.
 *              All scripts are short, use natural " — " speaker separators for
 *              multi-voice playback, and target CEFR A1 vocabulary.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishListeningExercise } from "./swedishListeningExercises";

export const SWEDISH_LISTENING_EXERCISES_EXPANSION_3: SwedishListeningExercise[] = [
  {
    id: "lis-a1-hej-hej",
    level: "A1",
    titleVi: "Chào hỏi buổi sáng",
    titleEn: "Morning greeting",
    type: "dialogue",
    contextVi: "Hai người bạn gặp nhau ở trường buổi sáng.",
    scriptSv:
      "Hej Erik, hur mår du idag? — Hej Anna! Jag mår bra, tack. Och du? — Jag mår också bra. Vad ska du göra efter skolan? — Jag ska spela fotboll med min bror. Vi ses i morgon! — Hej då, ha det bra!",
    scriptVi:
      "Chào Erik, hôm nay bạn khoẻ không? — Chào Anna! Mình khoẻ, cảm ơn. Còn bạn? — Mình cũng khoẻ. Sau giờ học bạn làm gì? — Mình sẽ chơi bóng với em trai. Mai gặp nhé! — Tạm biệt, chúc khoẻ!",
    keyVocab: [
      { sv: "Hur mår du?", vi: "Bạn khoẻ không?" },
      { sv: "Jag mår bra", vi: "Tôi khoẻ" },
      { sv: "efter skolan", vi: "sau giờ học" },
      { sv: "spela fotboll", vi: "chơi bóng đá" },
      { sv: "Hej då", vi: "Tạm biệt" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Erik sẽ làm gì sau giờ học?",
        questionEn: "What will Erik do after school?",
        options: [
          { sv: "Han ska läsa läxor", vi: "Học bài" },
          { sv: "Han ska spela fotboll", vi: "Chơi bóng đá" },
          { sv: "Han ska handla mat", vi: "Đi mua đồ ăn" },
          { sv: "Han ska sova", vi: "Đi ngủ" },
        ],
        correctIndex: 1,
        explanationVi: "'Jag ska spela fotboll med min bror.'",
      },
      {
        id: "q2",
        questionVi: "Anh ấy chơi với ai?",
        questionEn: "Who does he play with?",
        options: [
          { sv: "Med sin syster", vi: "Với chị/em gái" },
          { sv: "Med sin bror", vi: "Với anh/em trai" },
          { sv: "Med sin pappa", vi: "Với bố" },
          { sv: "Ensam", vi: "Một mình" },
        ],
        correctIndex: 1,
        explanationVi: "'med min bror' = với anh/em trai.",
      },
    ],
    recommendedRate: 0.85,
  },
  {
    id: "lis-a1-familj",
    level: "A1",
    titleVi: "Giới thiệu gia đình",
    titleEn: "Introducing the family",
    type: "monologue",
    contextVi: "Maria kể về gia đình mình.",
    scriptSv:
      "Hej, jag heter Maria och jag är tjugofem år gammal. Jag bor i Stockholm med min familj. Min mamma heter Eva och hon arbetar som lärare. Min pappa heter Johan och han är läkare. Jag har en lillebror. Han heter Oskar och han är tio år. På fritiden tycker vi om att laga mat tillsammans.",
    scriptVi:
      "Chào, tôi tên Maria, 25 tuổi. Tôi sống ở Stockholm với gia đình. Mẹ tôi tên Eva, làm giáo viên. Bố tôi tên Johan, làm bác sĩ. Tôi có một em trai. Em tên Oskar, 10 tuổi. Lúc rảnh chúng tôi thích nấu ăn cùng nhau.",
    keyVocab: [
      { sv: "jag heter", vi: "tôi tên là" },
      { sv: "bor i", vi: "sống ở" },
      { sv: "lärare", vi: "giáo viên" },
      { sv: "läkare", vi: "bác sĩ" },
      { sv: "lillebror", vi: "em trai" },
      { sv: "på fritiden", vi: "lúc rảnh" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Mẹ Maria làm nghề gì?",
        questionEn: "What is Maria's mother's job?",
        options: [
          { sv: "Läkare", vi: "Bác sĩ" },
          { sv: "Lärare", vi: "Giáo viên" },
          { sv: "Sjuksköterska", vi: "Y tá" },
          { sv: "Kock", vi: "Đầu bếp" },
        ],
        correctIndex: 1,
        explanationVi: "'Min mamma... arbetar som lärare'.",
      },
      {
        id: "q2",
        questionVi: "Em trai Maria bao nhiêu tuổi?",
        questionEn: "How old is Maria's little brother?",
        options: [
          { sv: "Åtta år", vi: "8 tuổi" },
          { sv: "Tio år", vi: "10 tuổi" },
          { sv: "Tolv år", vi: "12 tuổi" },
          { sv: "Femton år", vi: "15 tuổi" },
        ],
        correctIndex: 1,
        explanationVi: "'han är tio år'.",
      },
      {
        id: "q3",
        questionVi: "Cả nhà thích làm gì cùng nhau?",
        questionEn: "What does the family enjoy doing together?",
        options: [
          { sv: "Titta på TV", vi: "Xem TV" },
          { sv: "Laga mat", vi: "Nấu ăn" },
          { sv: "Spela spel", vi: "Chơi game" },
          { sv: "Sjunga", vi: "Hát" },
        ],
        correctIndex: 1,
        explanationVi: "'tycker vi om att laga mat tillsammans'.",
      },
    ],
    recommendedRate: 0.85,
  },
  {
    id: "lis-a1-affar",
    level: "A1",
    titleVi: "Mua sắm ở siêu thị",
    titleEn: "Grocery shopping",
    type: "dialogue",
    contextVi: "Peter mua đồ ở ICA.",
    scriptSv:
      "Hej! Kan jag hjälpa dig? — Ja tack, jag letar efter mjölk. Var finns den? — Mjölken står i kylen längst bak i affären. — Tack! Och har ni färskt bröd idag? — Ja, brödet är där borta till höger. — Tack så mycket för hjälpen! — Varsågod, ha en trevlig dag!",
    scriptVi:
      "Chào! Tôi giúp gì được ạ? — Cho hỏi sữa ở đâu? — Sữa nằm trong tủ lạnh cuối cửa hàng. — Cảm ơn! Hôm nay có bánh mì mới không? — Có, bánh mì ở kia bên phải. — Cảm ơn nhiều! — Không có gì, chúc bạn một ngày vui!",
    keyVocab: [
      { sv: "letar efter", vi: "đang tìm" },
      { sv: "kylen", vi: "tủ lạnh" },
      { sv: "längst bak", vi: "phía cuối" },
      { sv: "färskt bröd", vi: "bánh mì mới" },
      { sv: "till höger", vi: "bên phải" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Peter tìm gì đầu tiên?",
        questionEn: "What is Peter looking for first?",
        options: [
          { sv: "Ost", vi: "Phô mai" },
          { sv: "Mjölk", vi: "Sữa" },
          { sv: "Ägg", vi: "Trứng" },
          { sv: "Kaffe", vi: "Cà phê" },
        ],
        correctIndex: 1,
        explanationVi: "'jag letar efter mjölk'.",
      },
      {
        id: "q2",
        questionVi: "Bánh mì ở đâu?",
        questionEn: "Where is the bread?",
        options: [
          { sv: "Till vänster", vi: "Bên trái" },
          { sv: "Till höger", vi: "Bên phải" },
          { sv: "Vid kassan", vi: "Ở quầy tính tiền" },
          { sv: "I kylen", vi: "Trong tủ lạnh" },
        ],
        correctIndex: 1,
        explanationVi: "'brödet är där borta till höger'.",
      },
    ],
    recommendedRate: 0.85,
  },
  {
    id: "lis-a1-veckodag",
    level: "A1",
    titleVi: "Lịch trong tuần",
    titleEn: "Weekly schedule",
    type: "monologue",
    contextVi: "Lisa kể lịch trong tuần của mình.",
    scriptSv:
      "På måndag jobbar jag från åtta till fyra. På tisdag har jag svenskkurs på kvällen. På onsdag går jag till gymmet efter jobbet. På torsdag träffar jag min kompis Sara. På fredag går vi ofta på bio. På lördag och söndag är jag ledig och sover länge.",
    scriptVi:
      "Thứ Hai tôi làm từ 8 đến 4 giờ. Thứ Ba tối tôi có lớp tiếng Thuỵ Điển. Thứ Tư sau giờ làm tôi đến phòng gym. Thứ Năm tôi gặp bạn Sara. Thứ Sáu chúng tôi thường đi xem phim. Thứ Bảy và Chủ Nhật tôi nghỉ và ngủ dậy muộn.",
    keyVocab: [
      { sv: "på måndag", vi: "vào thứ Hai" },
      { sv: "svenskkurs", vi: "lớp tiếng Thuỵ Điển" },
      { sv: "gymmet", vi: "phòng gym" },
      { sv: "gå på bio", vi: "đi xem phim" },
      { sv: "vara ledig", vi: "được nghỉ" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Thứ Ba Lisa làm gì?",
        questionEn: "What does Lisa do on Tuesday?",
        options: [
          { sv: "Går till gymmet", vi: "Đến phòng gym" },
          { sv: "Har svenskkurs", vi: "Học tiếng Thuỵ Điển" },
          { sv: "Träffar Sara", vi: "Gặp Sara" },
          { sv: "Sover länge", vi: "Ngủ nướng" },
        ],
        correctIndex: 1,
        explanationVi: "'På tisdag har jag svenskkurs'.",
      },
      {
        id: "q2",
        questionVi: "Cuối tuần Lisa làm gì?",
        questionEn: "What does Lisa do at the weekend?",
        options: [
          { sv: "Hon jobbar", vi: "Đi làm" },
          { sv: "Hon är ledig och sover länge", vi: "Nghỉ và ngủ nướng" },
          { sv: "Hon reser bort", vi: "Đi xa" },
          { sv: "Hon lagar mat hela dagen", vi: "Nấu ăn cả ngày" },
        ],
        correctIndex: 1,
        explanationVi: "'är jag ledig och sover länge'.",
      },
    ],
    recommendedRate: 0.85,
  },
  {
    id: "lis-a1-buss",
    level: "A1",
    titleVi: "Hỏi đường xe buýt",
    titleEn: "Asking about the bus",
    type: "dialogue",
    contextVi: "Ở trạm xe buýt trung tâm Uppsala.",
    scriptSv:
      "Ursäkta, går den här bussen till centralstationen? — Ja, den gör det. — Vad bra! Hur lång tid tar det? — Ungefär femton minuter. — Och vad kostar biljetten? — Trettiofem kronor för en enkel resa. — Tack för hjälpen! — Ingen orsak.",
    scriptVi:
      "Xin lỗi, xe này có đi ga trung tâm không? — Có ạ. — Tốt quá! Mất bao lâu? — Khoảng 15 phút. — Vé bao nhiêu? — 35 kronor một lượt. — Cảm ơn! — Không có gì.",
    keyVocab: [
      { sv: "Ursäkta", vi: "Xin lỗi" },
      { sv: "centralstationen", vi: "ga trung tâm" },
      { sv: "hur lång tid", vi: "bao lâu" },
      { sv: "enkel resa", vi: "một lượt" },
      { sv: "Ingen orsak", vi: "Không có gì" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Đi ga trung tâm mất bao lâu?",
        questionEn: "How long does the ride take?",
        options: [
          { sv: "Fem minuter", vi: "5 phút" },
          { sv: "Ungefär femton minuter", vi: "Khoảng 15 phút" },
          { sv: "En timme", vi: "1 tiếng" },
          { sv: "Trettio minuter", vi: "30 phút" },
        ],
        correctIndex: 1,
        explanationVi: "'Ungefär femton minuter'.",
      },
      {
        id: "q2",
        questionVi: "Vé một lượt giá bao nhiêu?",
        questionEn: "How much is a single ticket?",
        options: [
          { sv: "Tjugofem kronor", vi: "25 kronor" },
          { sv: "Trettiofem kronor", vi: "35 kronor" },
          { sv: "Femtio kronor", vi: "50 kronor" },
          { sv: "Etthundra kronor", vi: "100 kronor" },
        ],
        correctIndex: 1,
        explanationVi: "'Trettiofem kronor för en enkel resa'.",
      },
    ],
    recommendedRate: 0.85,
  },
  {
    id: "lis-a1-vaderprognos-dagen",
    level: "A1",
    titleVi: "Thời tiết hôm nay",
    titleEn: "Today's weather",
    type: "announcement",
    contextVi: "Bản tin thời tiết ngắn trên đài SR.",
    scriptSv:
      "Godmorgon och välkommen till vädret. Idag blir det mestadels soligt i hela Sverige. I Stockholm blir det arton grader och lite blåsigt. I Göteborg blir det tjugo grader och sol. I Malmö kan det komma en kort regnskur på eftermiddagen. Ha en fin dag!",
    scriptVi:
      "Chào buổi sáng và chào mừng đến bản tin thời tiết. Hôm nay khắp Thuỵ Điển chủ yếu có nắng. Stockholm 18 độ và hơi gió. Göteborg 20 độ và có nắng. Malmö chiều có thể có mưa rào ngắn. Chúc ngày tốt lành!",
    keyVocab: [
      { sv: "mestadels soligt", vi: "chủ yếu có nắng" },
      { sv: "arton grader", vi: "18 độ" },
      { sv: "lite blåsigt", vi: "hơi gió" },
      { sv: "regnskur", vi: "cơn mưa rào" },
      { sv: "på eftermiddagen", vi: "vào buổi chiều" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Nhiệt độ ở Stockholm hôm nay?",
        questionEn: "Temperature in Stockholm today?",
        options: [
          { sv: "Femton grader", vi: "15 độ" },
          { sv: "Arton grader", vi: "18 độ" },
          { sv: "Tjugo grader", vi: "20 độ" },
          { sv: "Tjugofem grader", vi: "25 độ" },
        ],
        correctIndex: 1,
        explanationVi: "'I Stockholm blir det arton grader'.",
      },
      {
        id: "q2",
        questionVi: "Ở Malmö có gì vào buổi chiều?",
        questionEn: "What happens in Malmö in the afternoon?",
        options: [
          { sv: "Snö", vi: "Tuyết" },
          { sv: "En kort regnskur", vi: "Mưa rào ngắn" },
          { sv: "Åska", vi: "Sấm sét" },
          { sv: "Dimma", vi: "Sương mù" },
        ],
        correctIndex: 1,
        explanationVi: "'en kort regnskur på eftermiddagen'.",
      },
    ],
    recommendedRate: 0.9,
  },
];

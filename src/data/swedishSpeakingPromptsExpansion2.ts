/**
 * @file swedishSpeakingPromptsExpansion2.ts
 * @description Second batch of Tala monologue prompts for Swedish Skills Lab.
 *              Extends the speaking bank with practical situations across
 *              A1–B1 (self-description, opinions, discussion).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishSpeakingPrompt } from "./swedishSpeakingPrompts";

export const SWEDISH_SPEAKING_PROMPTS_EXPANSION_2: SwedishSpeakingPrompt[] = [
  // ───── A1 ─────
  {
    id: "s-a1-mat",
    level: "A1",
    titleVi: "Món ăn yêu thích",
    titleEn: "Favourite food",
    promptSv: "Berätta om din favoritmat: vad heter den, varifrån kommer den och när äter du den? Tala i 30–45 sekunder.",
    promptVi: "Kể về món ăn yêu thích: tên món, xuất xứ, khi nào bạn ăn. Nói 30-45 giây.",
    minSec: 30, maxSec: 60,
    skeletonSv: [
      "Min favoritmat heter ___.",
      "Den kommer från ___.",
      "Jag äter den ofta på ___.",
      "Jag gillar den för att ___.",
    ],
    tipVi: "A1: 4 câu đơn giản. Dùng 'gillar den för att' để đưa lý do.",
  },
  {
    id: "s-a1-stad",
    level: "A1",
    titleVi: "Thành phố của tôi",
    titleEn: "My city",
    promptSv: "Berätta om staden där du bor: namn, storlek, vad man kan göra där. Tala i 30–45 sekunder.",
    promptVi: "Kể về thành phố nơi bạn ở: tên, quy mô, có thể làm gì ở đó. Nói 30-45 giây.",
    minSec: 30, maxSec: 60,
    skeletonSv: [
      "Jag bor i ___.",
      "Staden är ___ (stor/liten).",
      "Här kan man ___.",
      "Det jag gillar mest är ___.",
    ],
    tipVi: "A1: 'Här kan man ___' là câu vạn năng khi mô tả nơi chốn.",
  },

  // ───── A2 ─────
  {
    id: "s-a2-arbete",
    level: "A2",
    titleVi: "Công việc mơ ước",
    titleEn: "Dream job",
    promptSv: "Berätta om ditt drömjobb: vilket yrke är det, varför lockar det dig och vad behöver du för att lyckas? Tala i 45–60 sekunder.",
    promptVi: "Kể về công việc mơ ước: nghề gì, vì sao hấp dẫn, cần gì để đạt được. Nói 45-60 giây.",
    minSec: 45, maxSec: 90,
    skeletonSv: [
      "Mitt drömjobb är att bli ___.",
      "Jag är intresserad av det för att ___.",
      "För att lyckas behöver jag ___.",
      "På lång sikt hoppas jag att ___.",
    ],
    tipVi: "A2: dùng 'är intresserad av' + noun/gerund. Mở rộng lý do bằng 'för att'.",
  },
  {
    id: "s-a2-teknik",
    level: "A2",
    titleVi: "Công nghệ trong cuộc sống hàng ngày",
    titleEn: "Technology in daily life",
    promptSv: "Berätta hur du använder teknik i vardagen: telefon, dator, appar. Ge exempel och säg om du tycker det är positivt eller negativt. Tala i 45–60 sekunder.",
    promptVi: "Kể bạn dùng công nghệ trong đời sống ra sao: điện thoại, máy tính, ứng dụng. Đưa ví dụ và cho biết tích cực hay tiêu cực. Nói 45-60 giây.",
    minSec: 45, maxSec: 90,
    skeletonSv: [
      "Jag använder min telefon flera timmar om dagen, till exempel för att ___.",
      "En app jag inte klarar mig utan är ___.",
      "Det bästa med teknik är ___, men samtidigt ___.",
      "På det hela taget tycker jag att teknik är ___.",
    ],
    tipVi: "A2: 'inte klarar mig utan' = không thể thiếu. 'på det hela taget' = tổng thể.",
  },
  {
    id: "s-a2-fritid-plan",
    level: "A2",
    titleVi: "Kế hoạch cuối tuần",
    titleEn: "Weekend plans",
    promptSv: "Berätta vad du planerar att göra i helgen: när, var, med vem och varför. Tala i 45–60 sekunder.",
    promptVi: "Kể kế hoạch cuối tuần: khi nào, ở đâu, với ai, vì sao. Nói 45-60 giây.",
    minSec: 45, maxSec: 90,
    skeletonSv: [
      "På lördag ska jag ___.",
      "Jag ska göra det tillsammans med ___.",
      "Vi valde det för att ___.",
      "På söndag planerar jag att ___.",
    ],
    tipVi: "A2: 'ska + verb' cho kế hoạch. Dùng trạng ngữ đầu câu để tránh lặp chủ ngữ.",
  },

  // ───── B1 ─────
  {
    id: "s-b1-utbildning-vs-arbete",
    level: "B1",
    titleVi: "Học đại học hay đi làm sớm?",
    titleEn: "University vs. early career?",
    promptSv: "Är det bättre att studera på universitet eller att börja jobba direkt efter gymnasiet? Diskutera fördelar och nackdelar och ge din åsikt. Tala i 60–90 sekunder.",
    promptVi: "Học đại học hay đi làm ngay sau THPT thì tốt hơn? Bàn về lợi hại và đưa quan điểm. Nói 60-90 giây.",
    minSec: 60, maxSec: 120,
    skeletonSv: [
      "Detta är en fråga som många unga funderar över.",
      "Å ena sidan ger universitetsstudier ___.",
      "Å andra sidan kan man börja tjäna pengar och få erfarenhet genom att ___.",
      "Enligt min åsikt beror svaret på ___ och därför tycker jag att ___.",
    ],
    tipVi: "B1: dùng 'å ena sidan / å andra sidan' + 'enligt min åsikt'. Đóng kết bằng 'beror på + noun'.",
  },
  {
    id: "s-b1-miljovanlig-livsstil",
    level: "B1",
    titleVi: "Lối sống thân thiện với môi trường",
    titleEn: "Eco-friendly lifestyle",
    promptSv: "Vad kan en enskild person göra för att leva mer miljövänligt? Beskriv minst tre konkreta åtgärder och förklara varför de är viktiga. Tala i 60–90 sekunder.",
    promptVi: "Cá nhân có thể làm gì để sống thân thiện môi trường? Nêu ít nhất 3 hành động cụ thể và giải thích. Nói 60-90 giây.",
    minSec: 60, maxSec: 120,
    skeletonSv: [
      "Klimatfrågan är en av vår tids största utmaningar.",
      "För det första kan man ___, eftersom ___.",
      "För det andra är det viktigt att ___.",
      "Slutligen bör vi ___ för att ___.",
      "Sammanfattningsvis krävs det både individuella och kollektiva insatser.",
    ],
    tipVi: "B1: dùng 'för det första / för det andra / slutligen' để cấu trúc + 'sammanfattningsvis' để kết. Từ nối tăng band.",
  },
  {
    id: "s-b1-storstad-vs-landsbygd",
    level: "B1",
    titleVi: "Sống ở thành phố hay nông thôn?",
    titleEn: "City vs. countryside living?",
    promptSv: "Vilka är fördelarna och nackdelarna med att bo i en storstad jämfört med på landet? Ge exempel och säg vilket du själv skulle välja och varför. Tala i 60–90 sekunder.",
    promptVi: "Ưu và nhược điểm khi sống ở đô thị so với nông thôn là gì? Đưa ví dụ và cho biết bạn chọn nơi nào, vì sao. Nói 60-90 giây.",
    minSec: 60, maxSec: 120,
    skeletonSv: [
      "Att bo i en storstad har både för- och nackdelar jämfört med livet på landet.",
      "En stor fördel med storstaden är ___, medan landet däremot erbjuder ___.",
      "Nackdelen med staden är ___, till exempel ___.",
      "Personligen skulle jag välja att bo ___ eftersom ___.",
    ],
    tipVi: "B1: 'jämfört med' (so với), 'däremot' (ngược lại), 'personligen' (cá nhân tôi). Đưa lý do cụ thể.",
  },
];

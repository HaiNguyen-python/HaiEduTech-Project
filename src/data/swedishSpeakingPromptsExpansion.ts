/**
 * @file swedishSpeakingPromptsExpansion.ts
 * @description Extra Tala monologue prompts (A1-B1) appended to
 *              SWEDISH_SPEAKING_PROMPTS to broaden Speaking Lab coverage.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishSpeakingPrompt } from "./swedishSpeakingPrompts";

export const SWEDISH_SPEAKING_PROMPTS_EXPANSION: SwedishSpeakingPrompt[] = [
  // ───── A1 ─────
  {
    id: "s-a1-family",
    level: "A1",
    titleVi: "Kể về gia đình",
    titleEn: "Talk about your family",
    promptSv: "Berätta om din familj. Vem bor du med? Hur många är ni? Vad gör de? Tala 30-45 sekunder.",
    promptVi: "Kể về gia đình: sống với ai, mấy người, họ làm gì. 30-45 giây.",
    minSec: 30, maxSec: 60,
    skeletonSv: [
      "I min familj är vi ___ personer.",
      "Jag bor med min ___ och min ___.",
      "Min mamma arbetar som ___.",
      "Vi tycker om att ___ tillsammans.",
    ],
    tipVi: "A1: 4-5 câu ngắn. Tránh đại từ 'de' phức tạp, dùng danh từ rõ ràng.",
  },
  {
    id: "s-a1-food-i-like",
    level: "A1",
    titleVi: "Món ăn bạn thích",
    titleEn: "Food you like",
    promptSv: "Vilken mat tycker du om? Berätta tre rätter du gillar och en du inte gillar.",
    promptVi: "Bạn thích món gì? Kể 3 món thích và 1 món không thích.",
    minSec: 25, maxSec: 50,
    skeletonSv: [
      "Jag tycker mycket om ___.",
      "Jag äter också gärna ___.",
      "På helgen brukar jag laga ___.",
      "Men jag tycker inte om ___.",
    ],
    tipVi: "A1: 'tycker om' + danh từ. Đừng chia sai: 'jag tycker' (không tyckar).",
  },

  // ───── A2 ─────
  {
    id: "s-a2-hometown",
    level: "A2",
    titleVi: "Quê hương của bạn",
    titleEn: "Your hometown",
    promptSv: "Beskriv din hemstad i Vietnam. Var ligger den? Hur många bor där? Vad är typiskt? Vad tycker du är bäst med staden? Tala 45-70 sekunder.",
    promptVi: "Mô tả quê bạn ở Việt Nam: ở đâu, dân số, đặc trưng, điều bạn thích nhất. 45-70 giây.",
    minSec: 45, maxSec: 75,
    skeletonSv: [
      "Min hemstad heter ___ och ligger i ___.",
      "Där bor ungefär ___ människor.",
      "Staden är känd för ___.",
      "Det bästa med staden tycker jag är ___.",
    ],
    tipVi: "A2: dùng 'ungefär' (khoảng), 'känd för' (nổi tiếng vì). Trạng ngữ đầu câu → V2 sau đó.",
  },
  {
    id: "s-a2-transport",
    level: "A2",
    titleVi: "Bạn đi lại thế nào?",
    titleEn: "How do you get around?",
    promptSv: "Hur reser du till jobbet eller skolan? Hur lång tid tar det? Vad är bra och dåligt med det sättet?",
    promptVi: "Bạn đi làm/học bằng gì? Mất bao lâu? Ưu nhược điểm?",
    minSec: 40, maxSec: 70,
    skeletonSv: [
      "Jag åker ___ till ___ varje dag.",
      "Resan tar ungefär ___ minuter.",
      "Det bra med ___ är att ___.",
      "Men ibland är det dåligt eftersom ___.",
    ],
    tipVi: "A2: 'åka' + phương tiện (åka buss, åka tåg). 'gå' chỉ dùng cho đi bộ.",
  },

  // ───── B1 ─────
  {
    id: "s-b1-technology-daily",
    level: "B1",
    titleVi: "Công nghệ trong đời sống hàng ngày",
    titleEn: "Technology in daily life",
    promptSv: "Hur påverkar tekniken din vardag? Ge både positiva och negativa exempel och avsluta med din åsikt. Tala 60-90 sekunder.",
    promptVi: "Công nghệ ảnh hưởng đời sống bạn thế nào? Nêu ví dụ tích cực và tiêu cực, kết bằng ý kiến. 60-90 giây.",
    minSec: 60, maxSec: 100,
    skeletonSv: [
      "Tekniken påverkar min vardag på många sätt.",
      "En positiv sida är att ___.",
      "Å andra sidan finns det nackdelar. Till exempel ___.",
      "Enligt min åsikt måste vi ___.",
      "Sammanfattningsvis tycker jag att ___.",
    ],
    tipVi: "B1: 'å andra sidan', 'enligt min åsikt', 'sammanfattningsvis' - collocation quan trọng để đạt Band 4-5.",
  },
  {
    id: "s-b1-environment",
    level: "B1",
    titleVi: "Bạn làm gì cho môi trường?",
    titleEn: "What do you do for the environment?",
    promptSv: "Vad gör du personligen för miljön? Berätta minst tre saker och förklara varför de är viktiga. Ge också ett förslag på vad samhället borde göra.",
    promptVi: "Bản thân bạn làm gì cho môi trường? ≥3 việc + giải thích. Đề xuất xã hội nên làm gì.",
    minSec: 60, maxSec: 100,
    skeletonSv: [
      "Jag försöker göra flera saker för miljön.",
      "För det första ___ eftersom ___.",
      "För det andra ___.",
      "Dessutom brukar jag ___.",
      "Jag tycker att samhället borde ___ för att ___.",
    ],
    tipVi: "B1: chuỗi 'för det första / för det andra / dessutom' + 'borde' (nên) + 'för att' (để).",
  },
];

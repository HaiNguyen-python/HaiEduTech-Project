/**
 * @file swedishWritingPrompts.ts
 * @description YKI Ruotsi (Swedish) writing prompts per level. Each prompt
 *              includes Swedish task text, Vietnamese gloss, suggested
 *              word-count window and 3 starter phrases learners can re-use.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type SwedishLevel = "A1" | "A2" | "B1";

export interface SwedishWritingPrompt {
  id: string;
  level: SwedishLevel;
  titleVi: string;
  titleEn: string;
  taskSv: string;
  taskVi: string;
  minWords: number;
  maxWords: number;
  starters: string[];
  tipVi: string;
}

export const SWEDISH_WRITING_PROMPTS: SwedishWritingPrompt[] = [
  // ───── A1 ─────
  {
    id: "w-a1-presentation",
    level: "A1",
    titleVi: "Tự giới thiệu (Presentation)",
    titleEn: "Self-introduction",
    taskSv: "Skriv en kort presentation om dig själv: namn, ålder, familj, var du bor, vad du gör och dina intressen.",
    taskVi: "Viết đoạn giới thiệu ngắn về bản thân: tên, tuổi, gia đình, nơi ở, công việc và sở thích.",
    minWords: 40, maxWords: 80,
    starters: ["Hej, jag heter ___ och jag är ___ år gammal.", "Jag bor i ___ med min familj.", "På fritiden gillar jag att ___."],
    tipVi: "Mục tiêu A1: 5–6 câu đơn, mỗi câu một ý. Tránh nối dài.",
  },
  {
    id: "w-a1-postcard",
    level: "A1",
    titleVi: "Viết bưu thiếp từ chuyến đi",
    titleEn: "Postcard from a trip",
    taskSv: "Skriv ett vykort till en vän. Berätta var du är, hur vädret är, vad du gör och när du kommer hem.",
    taskVi: "Viết bưu thiếp cho một người bạn: bạn đang ở đâu, thời tiết thế nào, đang làm gì và khi nào về.",
    minWords: 35, maxWords: 70,
    starters: ["Hej från ___! Vädret är ___.", "Idag åker vi till ___.", "Jag kommer hem på ___."],
    tipVi: "A1: dùng thì hiện tại + 'ska' cho tương lai gần. Đừng dùng quá khứ.",
  },
  // ───── A2 ─────
  {
    id: "w-a2-leave-email",
    level: "A2",
    titleVi: "Email xin nghỉ phép gửi sếp",
    titleEn: "Leave-of-absence email",
    taskSv: "Skriv ett mejl till din chef Anna. Du behöver vara ledig på fredag eftersom du måste till läkaren. Förklara, föreslå en lösning och be om svar.",
    taskVi: "Gửi email cho sếp Anna. Bạn cần nghỉ thứ sáu vì phải đi khám. Giải thích, đề xuất giải pháp và đợi phản hồi.",
    minWords: 60, maxWords: 100,
    starters: ["Hej Anna,", "Jag måste tyvärr vara ledig på fredag eftersom ___.", "Jag föreslår att ___."],
    tipVi: "A2: dùng kính ngữ 'Hej Anna,' / 'Med vänliga hälsningar' + 'eftersom' kích hoạt BIFF.",
  },
  {
    id: "w-a2-housing",
    level: "A2",
    titleVi: "Trả lời quảng cáo cho thuê căn hộ",
    titleEn: "Replying to a flat ad",
    taskSv: "Du har sett en annons om en lägenhet i Vasa. Skriv ett mejl till hyresvärden. Presentera dig, fråga om hyran, datum för inflyttning och om husdjur är tillåtna.",
    taskVi: "Viết email cho chủ trọ ở Vasa: giới thiệu bản thân, hỏi giá thuê, ngày vào ở và có cho nuôi thú không.",
    minWords: 60, maxWords: 100,
    starters: ["Hej,", "Jag heter ___ och jag är intresserad av lägenheten i Vasa.", "Kan jag fråga om ___?"],
    tipVi: "Hỏi 3 thứ cụ thể (giá, ngày, thú cưng) — tiêu chí Task Fulfilment A2.",
  },
  // ───── B1 ─────
  {
    id: "w-b1-opinion-climate",
    level: "B1",
    titleVi: "Thư kiến nghị: hạn chế ô tô trong thành phố",
    titleEn: "Opinion letter: car restrictions downtown",
    taskSv: "Skriv en insändare till Hufvudstadsbladet. Argumentera för eller emot förslaget att förbjuda privatbilar i centrala Helsingfors. Använd minst två argument och en motargument.",
    taskVi: "Viết thư bạn đọc gửi báo Hufvudstadsbladet — đồng tình hoặc phản đối việc cấm ô tô tư nhân ở trung tâm Helsinki. Ít nhất 2 luận điểm + 1 phản biện.",
    minWords: 120, maxWords: 200,
    starters: ["Jag vill kommentera förslaget om ___.", "Å ena sidan ___, å andra sidan ___.", "Sammanfattningsvis tycker jag att ___."],
    tipVi: "B1: cấu trúc 'å ena sidan / å andra sidan / sammanfattningsvis' đảm bảo đủ 3 đoạn opinion.",
  },
  {
    id: "w-b1-digital-life",
    level: "B1",
    titleVi: "Tiểu luận: Mạng xã hội và giới trẻ",
    titleEn: "Essay: social media and youth",
    taskSv: "Skriv en kort uppsats: 'Sociala medier — fördelar och nackdelar för ungdomar'. Ge minst tre exempel och en rekommendation.",
    taskVi: "Viết tiểu luận ngắn: 'Mạng xã hội — lợi và hại đối với giới trẻ'. Ít nhất 3 ví dụ và 1 khuyến nghị.",
    minWords: 130, maxWords: 220,
    starters: ["Sociala medier är en stor del av ungdomars liv.", "En fördel är att ___ men en nackdel är att ___.", "Jag rekommenderar att ___."],
    tipVi: "Dùng 'trots att' / 'eftersom' để chứng minh khả năng BIFF — tiêu chí Grammar B1.",
  },
];

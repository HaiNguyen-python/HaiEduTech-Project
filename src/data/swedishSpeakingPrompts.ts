/**
 * @file swedishSpeakingPrompts.ts
 * @description YKI Ruotsi (Swedish) Tala monologue prompts per level.
 *              Each prompt includes a Swedish question, Vietnamese gloss,
 *              suggested duration window and a sample answer skeleton.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishLevel } from "./swedishWritingPrompts";

export interface SwedishSpeakingPrompt {
  id: string;
  level: SwedishLevel;
  titleVi: string;
  titleEn: string;
  promptSv: string;
  promptVi: string;
  minSec: number;
  maxSec: number;
  skeletonSv: string[];
  tipVi: string;
}

export const SWEDISH_SPEAKING_PROMPTS: SwedishSpeakingPrompt[] = [
  // ───── A1 ─────
  {
    id: "s-a1-self",
    level: "A1",
    titleVi: "Nói về bản thân",
    titleEn: "Talk about yourself",
    promptSv: "Berätta om dig själv på svenska: namn, ålder, var du bor och din familj. Tala i 30–45 sekunder.",
    promptVi: "Tự giới thiệu bằng tiếng Thụy Điển: tên, tuổi, nơi ở, gia đình. Nói 30–45 giây.",
    minSec: 30, maxSec: 60,
    skeletonSv: [
      "Hej, jag heter ___.",
      "Jag är ___ år gammal och kommer från Vietnam.",
      "Jag bor i ___ med ___.",
      "I min familj är vi ___ personer.",
    ],
    tipVi: "Mục tiêu A1: 4–5 câu rõ ràng. Nói chậm, ngắt câu giữa các ý.",
  },
  {
    id: "s-a1-weekend",
    level: "A1",
    titleVi: "Cuối tuần của bạn",
    titleEn: "Your weekend",
    promptSv: "Vad gör du på helgen? Berätta tre saker du tycker om att göra.",
    promptVi: "Cuối tuần bạn làm gì? Kể 3 việc bạn thích làm.",
    minSec: 25, maxSec: 50,
    skeletonSv: [
      "På helgen ___.",
      "På lördag brukar jag ___.",
      "På söndag tycker jag om att ___.",
    ],
    tipVi: "Dùng 'brukar' để chỉ thói quen — gây ấn tượng A1 cao.",
  },
  // ───── A2 ─────
  {
    id: "s-a2-restaurant",
    level: "A2",
    titleVi: "Phàn nàn ở nhà hàng",
    titleEn: "Complaining at a restaurant",
    promptSv: "Du är på en restaurang och maten är kall. Förklara problemet för servitören och be om en lösning.",
    promptVi: "Bạn đang ở nhà hàng và món ăn bị lạnh. Trình bày vấn đề với người phục vụ và đề nghị giải pháp.",
    minSec: 40, maxSec: 70,
    skeletonSv: [
      "Ursäkta mig, jag har ett problem.",
      "Min ___ är kall.",
      "Kan jag få ___ istället?",
      "Tack så mycket.",
    ],
    tipVi: "A2 Tala chuộng lịch sự: bắt đầu bằng 'Ursäkta', kết bằng 'Tack'.",
  },
  {
    id: "s-a2-job-day",
    level: "A2",
    titleVi: "Một ngày làm việc",
    titleEn: "A typical workday",
    promptSv: "Berätta om en typisk dag på jobbet eller i skolan: vad gör du på morgonen, eftermiddagen och kvällen?",
    promptVi: "Kể về một ngày làm việc/đi học điển hình: bạn làm gì sáng, chiều, tối.",
    minSec: 45, maxSec: 75,
    skeletonSv: [
      "På morgonen vaknar jag klockan ___ och ___.",
      "På eftermiddagen brukar jag ___.",
      "På kvällen ___ innan jag går och lägger mig.",
    ],
    tipVi: "Dùng trạng từ thời gian ở đầu câu để kích hoạt V2 inversion: 'På morgonen vaknar jag…'.",
  },
  // ───── B1 ─────
  {
    id: "s-b1-environment",
    level: "B1",
    titleVi: "Quan điểm: bảo vệ môi trường",
    titleEn: "Opinion: protecting the environment",
    promptSv: "Vad kan vanliga människor göra för att skydda miljön? Ge minst tre konkreta exempel och förklara varför.",
    promptVi: "Người dân bình thường có thể làm gì để bảo vệ môi trường? Đưa ít nhất 3 ví dụ cụ thể và giải thích lý do.",
    minSec: 60, maxSec: 120,
    skeletonSv: [
      "Jag tycker att vi alla har ett ansvar för miljön.",
      "För det första kan vi ___ eftersom ___.",
      "För det andra ___, och för det tredje ___.",
      "Sammanfattningsvis tror jag att ___.",
    ],
    tipVi: "B1: chuỗi 'För det första / andra / tredje + sammanfattningsvis' giúp đạt criteria Coherence cao.",
  },
  {
    id: "s-b1-interview",
    level: "B1",
    titleVi: "Phỏng vấn việc làm",
    titleEn: "Job interview",
    promptSv: "Du har en arbetsintervju. Berätta om din utbildning, dina arbetserfarenheter och varför du passar för jobbet.",
    promptVi: "Bạn đang phỏng vấn xin việc. Nói về học vấn, kinh nghiệm làm việc và lý do bạn phù hợp.",
    minSec: 60, maxSec: 120,
    skeletonSv: [
      "Tack för att jag fick komma hit.",
      "Jag har en examen i ___ från ___.",
      "Jag har arbetat som ___ i ___ år och har lärt mig att ___.",
      "Jag tror att jag passar för jobbet eftersom ___.",
    ],
    tipVi: "B1: dùng 'eftersom' / 'trots att' để chứng minh BIFF trong nói — điểm Grammar B1.",
  },
];

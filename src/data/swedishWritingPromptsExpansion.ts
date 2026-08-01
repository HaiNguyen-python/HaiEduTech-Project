/**
 * @file swedishWritingPromptsExpansion.ts
 * @description Extra writing prompts (A1-B1) appended to SWEDISH_WRITING_PROMPTS
 *              to broaden Writing Lab task coverage.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishWritingPrompt } from "./swedishWritingPrompts";

export const SWEDISH_WRITING_PROMPTS_EXPANSION: SwedishWritingPrompt[] = [
  // ───── A1 ─────
  {
    id: "w-a1-daily-routine",
    level: "A1",
    titleVi: "Một ngày điển hình của bạn",
    titleEn: "A typical day",
    taskSv: "Berätta om en vanlig dag: när du går upp, vad du äter, vad du gör på arbetet eller i skolan och när du går och lägger dig.",
    taskVi: "Kể một ngày bình thường: dậy lúc nào, ăn gì, làm gì ở nơi làm/trường, ngủ lúc nào.",
    minWords: 40, maxWords: 80,
    starters: [
      "Jag går upp klockan ___ på morgonen.",
      "Till frukost äter jag ___.",
      "På eftermiddagen ___.",
      "På kvällen brukar jag ___.",
    ],
    tipVi: "A1: dùng 'brukar' + động từ nguyên mẫu để nói thói quen. Mỗi câu 1 mốc thời gian.",
  },
  {
    id: "w-a1-lapp-rumskamrat",
    level: "A1",
    titleVi: "Ghi chú mua sắm cho bạn cùng phòng",
    titleEn: "Shopping note for a roommate",
    taskSv: "Skriv en kort lapp till din rumskamrat. Be henne köpa fyra saker på ICA och skriv varför du behöver dem.",
    taskVi: "Viết mẩu giấy cho bạn cùng phòng: nhờ mua 4 món ở ICA và giải thích lý do.",
    minWords: 30, maxWords: 60,
    starters: [
      "Hej ___! Kan du köpa några saker?",
      "Vi behöver ___ eftersom ___.",
      "Tack, jag Swishar dig pengarna sen.",
    ],
    tipVi: "A1: từ nối 'eftersom' (vì) + 'och' (và). Không cần quá khứ.",
  },

  // ───── A2 ─────
  {
    id: "w-a2-klagomal-hyresvard",
    level: "A2",
    titleVi: "Email phàn nàn với chủ nhà",
    titleEn: "Complaint email to landlord",
    taskSv: "Skriv ett mejl till din hyresvärd. Diskmaskinen i ditt kök har varit trasig i två veckor. Beskriv problemet, förklara varför det är viktigt och be om en tid för reparation.",
    taskVi: "Gửi mail cho chủ nhà: máy rửa bát trong bếp đã hỏng 2 tuần. Mô tả sự cố, giải thích vì sao quan trọng, xin lịch sửa.",
    minWords: 70, maxWords: 110,
    starters: [
      "Hej,",
      "Jag skriver eftersom diskmaskinen har varit trasig sedan ___.",
      "Det är ett problem eftersom ___.",
      "Kan ni skicka en reparatör nästa vecka?",
    ],
    tipVi: "A2: dùng 'eftersom' + 'därför' để nối lý do và kết quả. Kết thư bằng 'Med vänliga hälsningar'.",
  },
  {
    id: "w-a2-invite-friend",
    level: "A2",
    titleVi: "Thư mời bạn tới sinh nhật",
    titleEn: "Birthday invitation letter",
    taskSv: "Skriv en inbjudan till din vän. Bjud in hen till din trettioårsfest. Berätta datum, tid, plats, vad ni ska göra och om något ska tas med.",
    taskVi: "Mời bạn dự sinh nhật 30 tuổi. Nêu ngày, giờ, địa điểm, hoạt động và có cần mang gì không.",
    minWords: 55, maxWords: 90,
    starters: [
      "Hej ___! Snart fyller jag trettio och vill fira med dig.",
      "Festen är den ___ klockan ___ hemma hos mig.",
      "Vi ska ___.",
      "Ta med ___ om du vill.",
    ],
    tipVi: "A2: 'Ta med' (mang theo), 'hemma hos' (ở nhà của). Trạng ngữ thời gian đầu câu → V2 sau đó.",
  },

  // ───── B1 ─────
  {
    id: "w-b1-opinion-remote-work",
    level: "B1",
    titleVi: "Bài luận: làm việc từ xa",
    titleEn: "Opinion essay: remote work",
    taskSv: "Skriv ett åsiktsinlägg (150-220 ord) om hemarbete i Sverige. Ge minst två fördelar, två nackdelar och din egen slutsats. Använd exempel från arbetslivet.",
    taskVi: "Bài ý kiến (150-220 từ) về làm việc tại nhà ở Sverige. Nêu ≥2 lợi ích, ≥2 hạn chế và kết luận riêng. Dùng ví dụ thực tế.",
    minWords: 150, maxWords: 220,
    starters: [
      "Under pandemin blev hemarbete allt vanligare i Sverige.",
      "En fördel är att ___, medan en nackdel är att ___.",
      "Å ena sidan ___, å andra sidan ___.",
      "Sammanfattningsvis anser jag att ___.",
    ],
    tipVi: "B1: cấu trúc 'å ena sidan / å andra sidan' + 'sammanfattningsvis' cho kết luận. Dùng số liệu/ví dụ cụ thể.",
  },
  {
    id: "w-b1-blog-culture-shock",
    level: "B1",
    titleVi: "Blog: Sốc văn hoá khi mới đến",
    titleEn: "Blog: culture shock arriving",
    taskSv: "Skriv ett blogginlägg (140-200 ord). Beskriv en kulturkrock du upplevde när du kom till Sverige eller Finland. Förklara vad som hände, hur du kände dig och vad du lärde dig.",
    taskVi: "Viết bài blog (140-200 từ) về một cú sốc văn hoá khi mới đến Sverige/Suomi. Kể chuyện gì xảy ra, cảm xúc và bài học.",
    minWords: 140, maxWords: 200,
    starters: [
      "När jag flyttade hit för ___ år sedan blev jag förvånad över ___.",
      "En dag hände det att ___.",
      "Jag kände mig ___ eftersom ___.",
      "Nu förstår jag att ___.",
    ],
    tipVi: "B1: mix thì quá khứ (preteritum) + hiện tại. Từ nối 'däremot', 'trots att' để tăng band.",
  },
];

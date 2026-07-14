/**
 * @file swedishWritingPromptsExpansion2.ts
 * @description Second batch of writing prompts for Swedish Skills Lab.
 *              Adds practical scenario prompts (A1–B1) covering daily life,
 *              formal letters and opinion essays.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishWritingPrompt } from "./swedishWritingPrompts";

export const SWEDISH_WRITING_PROMPTS_EXPANSION_2: SwedishWritingPrompt[] = [
  // ───── A1 ─────
  {
    id: "w-a1-inkopslista",
    level: "A1",
    titleVi: "Danh sách mua sắm và kế hoạch bữa tối",
    titleEn: "Shopping list and dinner plan",
    taskSv: "Skriv en kort text där du berättar vad du ska köpa på ICA idag och vad du ska laga till middag. Nämn minst fem varor.",
    taskVi: "Viết đoạn ngắn kể bạn định mua gì ở ICA hôm nay và nấu gì cho bữa tối. Nêu ít nhất 5 món hàng.",
    minWords: 35, maxWords: 70,
    starters: [
      "Idag ska jag gå till ICA och köpa ___.",
      "Jag behöver också ___ och ___.",
      "Till middag lagar jag ___.",
      "Efter middagen ska jag ___.",
    ],
    tipVi: "A1: dùng 'ska + verb' cho tương lai gần. Liệt kê hàng bằng dấu phẩy, câu ngắn.",
  },
  {
    id: "w-a1-vecka",
    level: "A1",
    titleVi: "Một ngày trong tuần của tôi",
    titleEn: "A weekday in my life",
    taskSv: "Beskriv en vanlig vardag: när du går upp, vad du gör på morgonen, dagen och kvällen.",
    taskVi: "Mô tả một ngày thường trong tuần: giờ dậy, làm gì buổi sáng, ban ngày và tối.",
    minWords: 40, maxWords: 80,
    starters: [
      "Jag stiger upp klockan ___ varje morgon.",
      "På morgonen ___.",
      "Under dagen ___.",
      "På kvällen brukar jag ___.",
    ],
    tipVi: "A1: dùng 'brukar + infinitiv' để nói thói quen. Trạng từ thời gian đứng đầu câu.",
  },

  // ───── A2 ─────
  {
    id: "w-a2-boka-tid",
    level: "A2",
    titleVi: "Email đặt lịch với bác sĩ",
    titleEn: "Email to book a doctor's appointment",
    taskSv: "Skriv ett mejl till en vårdcentral och boka en tid. Förklara vad du har för besvär, när du kan komma och lämna dina kontaktuppgifter.",
    taskVi: "Viết email tới trung tâm y tế đặt lịch. Nêu triệu chứng, thời gian có thể đến và thông tin liên lạc.",
    minWords: 60, maxWords: 100,
    starters: [
      "Hej, jag heter ___ och skulle vilja boka en tid.",
      "Sedan några dagar har jag ___.",
      "Jag kan komma ___.",
      "Ni kan nå mig på telefon ___.",
    ],
    tipVi: "A2: chào lịch sự + đi thẳng vấn đề. Dùng 'skulle vilja' (muốn - lịch sự) thay cho 'vill'.",
  },
  {
    id: "w-a2-berattelse-resa",
    level: "A2",
    titleVi: "Kể về chuyến du lịch gần nhất",
    titleEn: "Story about your last trip",
    taskSv: "Berätta om din senaste resa: vart du åkte, med vem, vad du gjorde och vad du tyckte om resan.",
    taskVi: "Kể chuyến du lịch gần nhất: đi đâu, với ai, làm gì, cảm nghĩ ra sao.",
    minWords: 70, maxWords: 120,
    starters: [
      "I somras åkte jag till ___ tillsammans med ___.",
      "Vi bodde på ___ i ___ dagar.",
      "Under resan ___.",
      "Det bästa med resan var ___.",
    ],
    tipVi: "A2: dùng thì quá khứ (åkte, bodde, gjorde). Mở đoạn bằng trạng ngữ thời gian.",
  },
  {
    id: "w-a2-svar-inbjudan",
    level: "A2",
    titleVi: "Trả lời lời mời sinh nhật",
    titleEn: "Reply to a birthday invitation",
    taskSv: "Din vän Erik har bjudit dig till sin födelsedag. Skriv ett svar där du tackar för inbjudan, bekräftar att du kommer och frågar om något (t.ex. present, klädkod).",
    taskVi: "Bạn Erik mời sinh nhật. Viết thư trả lời: cảm ơn, xác nhận đến và hỏi một điều (quà, trang phục).",
    minWords: 50, maxWords: 90,
    starters: [
      "Hej Erik, tack så mycket för inbjudan!",
      "Självklart kommer jag på din födelsedag ___.",
      "Jag undrar om ___.",
      "Vi ses snart! Hälsningar, ___.",
    ],
    tipVi: "A2: lời cảm ơn mở đầu + xác nhận + câu hỏi lịch sự. Kết thúc bằng 'Vi ses' hoặc 'Hälsningar'.",
  },

  // ───── B1 ─────
  {
    id: "w-b1-argumentera-teknologi",
    level: "B1",
    titleVi: "Trẻ em có nên dùng điện thoại thông minh?",
    titleEn: "Should children use smartphones?",
    taskSv: "Skriv en argumenterande text där du diskuterar om barn under tolv år bör få egna smartphones. Ge minst två argument för och två emot och avsluta med din egen åsikt.",
    taskVi: "Viết bài lập luận: trẻ dưới 12 tuổi có nên dùng smartphone riêng không? Nêu ít nhất 2 lý lẽ ủng hộ và 2 phản đối, kết bằng ý kiến của bạn.",
    minWords: 130, maxWords: 200,
    starters: [
      "Frågan om barn ska ha smartphones är omdiskuterad i dagens samhälle.",
      "Å ena sidan kan man argumentera att ___.",
      "Å andra sidan finns det nackdelar, till exempel ___.",
      "Sammanfattningsvis anser jag att ___ eftersom ___.",
    ],
    tipVi: "B1: dùng cặp 'å ena sidan / å andra sidan' + 'sammanfattningsvis' để cấu trúc mạch lạc. Câu kết nêu quan điểm rõ ràng.",
  },
  {
    id: "w-b1-formellt-brev",
    level: "B1",
    titleVi: "Thư khiếu nại chính thức tới công ty",
    titleEn: "Formal complaint letter to a company",
    taskSv: "Du har köpt en produkt online som visade sig vara defekt och företaget svarar inte. Skriv ett formellt klagobrev där du beskriver problemet, hänvisar till konsumentköplagen och kräver återbetalning.",
    taskVi: "Bạn mua sản phẩm online bị lỗi và công ty không phản hồi. Viết thư khiếu nại chính thức: mô tả vấn đề, tham chiếu luật tiêu dùng, yêu cầu hoàn tiền.",
    minWords: 120, maxWords: 200,
    starters: [
      "Ärende: Klagomål gällande orderNr ___.",
      "Jag vänder mig till er med anledning av ett problem med ___.",
      "Enligt konsumentköplagen har jag rätt att ___.",
      "Jag förväntar mig ett skriftligt svar inom fjorton dagar.",
    ],
    tipVi: "B1: giọng văn trang trọng - dùng 'Ärende:', 'Jag vänder mig till er', 'Enligt lagen'. Kết bằng deadline cụ thể.",
  },
  {
    id: "w-b1-recension",
    level: "B1",
    titleVi: "Đánh giá một cuốn sách hoặc bộ phim",
    titleEn: "Review of a book or film",
    taskSv: "Skriv en recension av en bok eller film du nyligen läst/sett. Beskriv handlingen kort, ta upp både positiva och negativa aspekter och ge en rekommendation.",
    taskVi: "Viết bài đánh giá cuốn sách hoặc bộ phim vừa xem. Tóm tắt nội dung, nêu mặt hay và dở, đưa khuyến nghị.",
    minWords: 130, maxWords: 200,
    starters: [
      "Nyligen läste/såg jag ___ av ___.",
      "Handlingen kretsar kring ___.",
      "Det som var särskilt bra var ___, medan ___ kunde ha varit bättre.",
      "Sammantaget rekommenderar jag ___ till dem som ___.",
    ],
    tipVi: "B1: cấu trúc 4 đoạn - mở đầu, tóm tắt, đánh giá, khuyến nghị. Dùng 'kretsar kring', 'sammantaget'.",
  },
];

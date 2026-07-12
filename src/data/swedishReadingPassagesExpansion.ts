/**
 * @file swedishReadingPassagesExpansion.ts
 * @description Extra Läsförståelse passages (A1–B1) appended to
 *              SWEDISH_READING_PASSAGES to broaden Reading Lab coverage.
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
  id, kind: "truefalse", questionVi, questionEn,
  options: [{ sv: "Sant", vi: "Đúng" }, { sv: "Falskt", vi: "Sai" }],
  correctIndex: correct, explanationVi,
});

export const SWEDISH_READING_PASSAGES_EXPANSION: SwedishReadingPassage[] = [
  // ═════════════════════ A1 ═════════════════════
  {
    id: "rd-a1-notice-tvattstuga",
    level: "A1",
    type: "notice",
    titleVi: "Nội quy phòng giặt chung cư",
    titleEn: "Laundry room notice",
    titleSv: "Tvättstugan - Regler",
    contextVi: "Bảng thông báo dán trên cửa tvättstuga trong chung cư của bạn.",
    textSv:
      "Välkommen till tvättstugan!\n\nBoka en tid på tavlan i trapphuset. Tvättiden är två timmar. Städa efter dig: torka maskinen och ta med dina kläder. Öppettider: 07.00 - 22.00. Barn får inte vara ensamma här. Om något går sönder, ring vaktmästaren på 070-123 45 67.\n\nTack för att du håller rent!",
    textVi:
      "Chào mừng bạn đến phòng giặt!\n\nĐặt giờ trên bảng ở cầu thang. Mỗi lượt 2 tiếng. Dọn sạch sau khi dùng: lau máy và mang quần áo đi. Giờ mở: 7h-22h. Trẻ em không được ở một mình. Nếu hỏng gì, gọi vaktmästaren số 070-123 45 67.\n\nCảm ơn bạn giữ sạch!",
    keyVocab: [
      { sv: "tvättstuga", vi: "phòng giặt chung" },
      { sv: "boka en tid", vi: "đặt giờ" },
      { sv: "vaktmästare", vi: "quản lý toà nhà" },
      { sv: "gå sönder", vi: "hỏng" },
    ],
    questions: [
      {
        id: "q1", kind: "mcq",
        questionVi: "Mỗi lượt giặt kéo dài bao lâu?",
        questionEn: "How long is each laundry slot?",
        options: [
          { sv: "En timme", vi: "1 tiếng" },
          { sv: "Två timmar", vi: "2 tiếng" },
          { sv: "Tre timmar", vi: "3 tiếng" },
          { sv: "Fyra timmar", vi: "4 tiếng" },
        ],
        correctIndex: 1,
        explanationVi: "'Tvättiden är två timmar' = 2 tiếng.",
      },
      tf("q2", "Trẻ em được ở phòng giặt một mình.", "Children may stay alone.", 1, "'Barn får inte vara ensamma här' = không được ở một mình."),
      tf("q3", "Phòng giặt mở đến 22h.", "Open until 22:00.", 0, "'Öppettider: 07.00-22.00'."),
    ],
    estimatedMinutes: 3,
  },

  // ═════════════════════ A2 ═════════════════════
  {
    id: "rd-a2-blocket-cykel",
    level: "A2",
    type: "ad",
    titleVi: "Rao bán xe đạp trên Blocket",
    titleEn: "Blocket bike listing",
    titleSv: "Cykel säljes - endast använd en säsong",
    contextVi: "Bạn đang tìm mua xe đạp cũ và thấy quảng cáo này trên Blocket.",
    textSv:
      "Säljer min hybridcykel av märket Crescent. Storlek 54, silverfärgad, sju växlar. Köpt ny våren 2025 för 4 500 kronor på Stadium. Använd endast en säsong och står nu i förrådet. Cykeln är i mycket bra skick, inga rostfläckar. Nya däck monterades i augusti.\n\nPris: 2 200 kronor. Kan hämtas i Solna helgen 15-16 november. Betalning med Swish. Ring eller sms:a 070-987 65 43. Frågor besvaras samma dag.",
    textVi:
      "Bán xe đạp lai hiệu Crescent. Cỡ 54, màu bạc, 7 số. Mua mới xuân 2025 giá 4 500kr ở Stadium. Chỉ dùng 1 mùa và đang cất kho. Xe rất tốt, không rỉ sét. Lốp mới thay tháng 8.\n\nGiá: 2 200 kr. Nhận ở Solna cuối tuần 15-16/11. Thanh toán Swish. Gọi hoặc nhắn 070-987 65 43. Trả lời trong ngày.",
    keyVocab: [
      { sv: "säljes", vi: "được rao bán" },
      { sv: "växlar", vi: "số (xe đạp)" },
      { sv: "i mycket bra skick", vi: "tình trạng rất tốt" },
      { sv: "hämtas", vi: "được nhận" },
      { sv: "Swish", vi: "app chuyển khoản" },
    ],
    questions: [
      {
        id: "q1", kind: "mcq",
        questionVi: "Xe được bán với giá bao nhiêu?",
        questionEn: "Selling price?",
        options: [
          { sv: "4 500 kr", vi: "4 500 kr" },
          { sv: "2 200 kr", vi: "2 200 kr" },
          { sv: "1 500 kr", vi: "1 500 kr" },
          { sv: "3 000 kr", vi: "3 000 kr" },
        ],
        correctIndex: 1,
        explanationVi: "'Pris: 2 200 kronor'.",
      },
      {
        id: "q2", kind: "mcq",
        questionVi: "Xe đã được sử dụng bao lâu?",
        questionEn: "How long has it been used?",
        options: [
          { sv: "Aldrig", vi: "Chưa bao giờ" },
          { sv: "En säsong", vi: "Một mùa" },
          { sv: "Ett år", vi: "Một năm" },
          { sv: "Tre år", vi: "Ba năm" },
        ],
        correctIndex: 1,
        explanationVi: "'Använd endast en säsong'.",
      },
      tf("q3", "Người mua có thể trả bằng Swish.", "Buyer can pay via Swish.", 0, "'Betalning med Swish' = đúng."),
      {
        id: "q4", kind: "vocab",
        questionVi: "'i mycket bra skick' có nghĩa gần nhất là?",
        questionEn: "Closest meaning of 'i mycket bra skick'?",
        options: [
          { sv: "trasig", vi: "hỏng" },
          { sv: "gammal", vi: "cũ" },
          { sv: "i utmärkt kondition", vi: "trong tình trạng xuất sắc" },
          { sv: "billig", vi: "rẻ" },
        ],
        correctIndex: 2,
        explanationVi: "'skick' = tình trạng; 'i mycket bra skick' = rất tốt.",
      },
    ],
    estimatedMinutes: 5,
  },

  // ═════════════════════ B1 ═════════════════════
  {
    id: "rd-b1-blog-sisu",
    level: "B1",
    type: "blog",
    titleVi: "Blog: Sisu áp dụng vào việc học",
    titleEn: "Blog: applying sisu to studying",
    titleSv: "Sisu i vardagen - min studietrick",
    contextVi: "Một sinh viên Việt Nam ở Sverige viết blog về cách anh dùng khái niệm 'sisu' để vượt qua áp lực học tập.",
    textSv:
      "När jag flyttade till Sverige för tre år sedan visste jag inte vad sisu betydde. En finsk kompis förklarade att det handlar om att fortsätta även när det känns hopplöst. I dag använder jag begreppet varje dag under min utbildning.\n\nStudierna på universitetet är krävande. Föreläsningarna är på engelska, men gruppdiskussionerna sker ofta på svenska. I början förstod jag bara hälften och ville ge upp. Då tänkte jag på sisu: att sätta sig ner tjugofem minuter i taget, göra en sak klart och sedan ta en paus.\n\nMitt bästa knep är att dela upp stora uppgifter i små steg. En hel bok blir tre kapitel i veckan. En uppsats blir en disposition, sedan tre stycken per dag. På det sättet slipper jag känna panik inför deadline. Sisu betyder inte att man aldrig blir trött - det betyder att man reser sig upp igen.",
    textVi:
      "Khi mình chuyển đến Sverige 3 năm trước, mình không biết sisu là gì. Một người bạn Phần Lan giải thích rằng nó có nghĩa là tiếp tục ngay cả khi cảm thấy vô vọng. Hôm nay mình dùng khái niệm này hàng ngày trong việc học.\n\nHọc đại học rất áp lực. Bài giảng bằng tiếng Anh, nhưng thảo luận nhóm thường bằng tiếng Thụy Điển. Ban đầu mình chỉ hiểu một nửa và muốn bỏ cuộc. Rồi mình nghĩ đến sisu: ngồi xuống 25 phút mỗi lần, làm xong một việc rồi nghỉ.\n\nMẹo hay nhất của mình là chia nhiệm vụ lớn thành bước nhỏ. Một cuốn sách = 3 chương/tuần. Một bài luận = một dàn ý, rồi 3 đoạn/ngày. Nhờ vậy mình không hoảng loạn trước deadline. Sisu không có nghĩa là không mệt - nó có nghĩa là mình đứng dậy được.",
    keyVocab: [
      { sv: "krävande", vi: "đòi hỏi cao" },
      { sv: "ge upp", vi: "bỏ cuộc" },
      { sv: "i taget", vi: "mỗi lần" },
      { sv: "dela upp", vi: "chia nhỏ" },
      { sv: "resa sig upp", vi: "đứng dậy" },
    ],
    questions: [
      {
        id: "q1", kind: "mcq",
        questionVi: "Ai đã giải thích sisu cho tác giả?",
        questionEn: "Who explained sisu?",
        options: [
          { sv: "En lärare", vi: "Giáo viên" },
          { sv: "En finsk kompis", vi: "Bạn người Phần Lan" },
          { sv: "En förälder", vi: "Cha mẹ" },
          { sv: "En handledare", vi: "Người hướng dẫn" },
        ],
        correctIndex: 1,
        explanationVi: "'En finsk kompis förklarade...'.",
      },
      {
        id: "q2", kind: "mcq",
        questionVi: "Kỹ thuật học của tác giả dựa trên gì?",
        questionEn: "His study technique is based on?",
        options: [
          { sv: "Att plugga hela natten", vi: "Học suốt đêm" },
          { sv: "Att dela upp uppgifter i små steg", vi: "Chia nhiệm vụ thành bước nhỏ" },
          { sv: "Att bara läsa på engelska", vi: "Chỉ đọc tiếng Anh" },
          { sv: "Att aldrig ta paus", vi: "Không bao giờ nghỉ" },
        ],
        correctIndex: 1,
        explanationVi: "'dela upp stora uppgifter i små steg'.",
      },
      tf("q3", "Tác giả nói sisu nghĩa là không bao giờ mệt.", "Sisu means never getting tired.", 1, "'Sisu betyder inte att man aldrig blir trött'."),
      {
        id: "q4", kind: "vocab",
        questionVi: "'krävande' gần nghĩa với?",
        questionEn: "Closest to 'krävande'?",
        options: [
          { sv: "lätt", vi: "dễ" },
          { sv: "svår och intensiv", vi: "khó và cường độ cao" },
          { sv: "billig", vi: "rẻ" },
          { sv: "rolig", vi: "vui" },
        ],
        correctIndex: 1,
        explanationVi: "'krävande' = đòi hỏi nhiều công sức.",
      },
    ],
    estimatedMinutes: 8,
  },
];

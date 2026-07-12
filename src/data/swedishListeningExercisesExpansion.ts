/**
 * @file swedishListeningExercisesExpansion.ts
 * @description Extra Hörförståelse practice items (A1–B1) appended to the
 *              main SWEDISH_LISTENING_EXERCISES array to broaden lab coverage.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishListeningExercise } from "./swedishListeningExercises";

export const SWEDISH_LISTENING_EXERCISES_EXPANSION: SwedishListeningExercise[] = [
  // ═════════════════════ A1 ═════════════════════
  {
    id: "lis-a1-vardagshalsningar",
    level: "A1",
    titleVi: "Chào hỏi buổi sáng ở nhà",
    titleEn: "Morning greetings at home",
    type: "dialogue",
    contextVi: "Lisa và bố cùng ăn sáng. Lắng nghe cách chào hỏi và hỏi thăm cơ bản.",
    scriptSv:
      "God morgon, pappa! — God morgon, Lisa. Har du sovit bra? — Ja tack, jag mår bra. Vill du ha kaffe? — Ja, gärna. Klockan är redan halv åtta. Vi måste skynda oss.",
    scriptVi:
      "Chào buổi sáng bố! — Chào buổi sáng, Lisa. Con ngủ ngon không? — Vâng, con khỏe. Bố uống cà phê không? — Có, cảm ơn con. Đã 7 rưỡi rồi, mình phải nhanh lên.",
    keyVocab: [
      { sv: "God morgon", vi: "Chào buổi sáng" },
      { sv: "Har du sovit bra?", vi: "Bạn ngủ ngon không?" },
      { sv: "halv åtta", vi: "7 rưỡi" },
      { sv: "skynda sig", vi: "vội vàng" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Bây giờ là mấy giờ?",
        questionEn: "What time is it?",
        options: [
          { sv: "Halv sju", vi: "6 rưỡi" },
          { sv: "Halv åtta", vi: "7 rưỡi" },
          { sv: "Åtta", vi: "8 giờ" },
          { sv: "Kvart över åtta", vi: "8h15" },
        ],
        correctIndex: 1,
        explanationVi: "'Klockan är redan halv åtta' = đã 7 rưỡi.",
      },
      {
        id: "q2",
        questionVi: "Lisa muốn mời bố uống gì?",
        questionEn: "What does Lisa offer her dad?",
        options: [
          { sv: "Te", vi: "Trà" },
          { sv: "Juice", vi: "Nước ép" },
          { sv: "Kaffe", vi: "Cà phê" },
          { sv: "Vatten", vi: "Nước" },
        ],
        correctIndex: 2,
        explanationVi: "'Vill du ha kaffe?' — Cô ấy mời bố cà phê.",
      },
      {
        id: "q3",
        questionVi: "Lisa ngủ thế nào?",
        questionEn: "How did Lisa sleep?",
        options: [
          { sv: "Dåligt", vi: "Không tốt" },
          { sv: "Bra", vi: "Tốt" },
          { sv: "Hon vet inte", vi: "Không biết" },
          { sv: "Hon sov inte alls", vi: "Không ngủ chút nào" },
        ],
        correctIndex: 1,
        explanationVi: "'Ja tack, jag mår bra' + 'Har du sovit bra?' → Cô trả lời tích cực.",
      },
    ],
    recommendedRate: 0.85,
  },

  // ═════════════════════ A2 ═════════════════════
  {
    id: "lis-a2-lakartid",
    level: "A2",
    titleVi: "Đặt lịch khám bác sĩ",
    titleEn: "Booking a doctor's appointment",
    type: "dialogue",
    contextVi: "Peter gọi vårdcentralen để đặt lịch khám vì bị đau họng.",
    scriptSv:
      "Vårdcentralen, hej. — Hej, jag heter Peter Nguyen. Jag skulle vilja boka en tid. Jag har ont i halsen och feber sedan i går. — Okej. Har du varit hos oss förut? — Ja, mitt personnummer är åtta noll ett två två tre bindestreck fyra fem sex sju. — Bra. Kan du komma i morgon klockan tio och trettio? — Ja, det passar bra. Tack så mycket.",
    scriptVi:
      "Trung tâm y tế xin nghe. — Chào, tôi là Peter Nguyen. Tôi muốn đặt lịch. Tôi bị đau họng và sốt từ hôm qua. — Được. Anh đã khám ở đây trước chưa? — Rồi, personnummer của tôi là 801223-4567. — Tốt. Anh đến ngày mai lúc 10h30 được không? — Được, cảm ơn nhiều.",
    keyVocab: [
      { sv: "boka en tid", vi: "đặt lịch hẹn" },
      { sv: "ont i halsen", vi: "đau họng" },
      { sv: "feber", vi: "sốt" },
      { sv: "personnummer", vi: "mã cá nhân" },
      { sv: "det passar bra", vi: "giờ đó phù hợp" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Peter đau ở đâu?",
        questionEn: "What hurts?",
        options: [
          { sv: "Ryggen", vi: "Lưng" },
          { sv: "Huvudet", vi: "Đầu" },
          { sv: "Halsen", vi: "Họng" },
          { sv: "Magen", vi: "Bụng" },
        ],
        correctIndex: 2,
        explanationVi: "'ont i halsen' = đau họng.",
      },
      {
        id: "q2",
        questionVi: "Lịch khám vào lúc nào?",
        questionEn: "When is the appointment?",
        options: [
          { sv: "I dag klockan tio", vi: "Hôm nay 10h" },
          { sv: "I morgon klockan tio och trettio", vi: "Ngày mai 10h30" },
          { sv: "I morgon klockan tretton", vi: "Ngày mai 13h" },
          { sv: "På fredag klockan nio", vi: "Thứ Sáu 9h" },
        ],
        correctIndex: 1,
        explanationVi: "'i morgon klockan tio och trettio' = ngày mai 10:30.",
      },
      {
        id: "q3",
        questionVi: "Peter đã bị bệnh bao lâu?",
        questionEn: "How long has he been sick?",
        options: [
          { sv: "En vecka", vi: "Một tuần" },
          { sv: "Sedan i går", vi: "Từ hôm qua" },
          { sv: "Två dagar", vi: "Hai ngày" },
          { sv: "Sedan i morse", vi: "Từ sáng nay" },
        ],
        correctIndex: 1,
        explanationVi: "'feber sedan i går' = sốt từ hôm qua.",
      },
    ],
    recommendedRate: 0.9,
  },

  {
    id: "lis-a2-tunnelbana",
    level: "A2",
    titleVi: "Thông báo trên tàu điện ngầm",
    titleEn: "Subway announcement",
    type: "announcement",
    contextVi: "Bạn đang trên tàu SL đi hướng Ropsten. Nghe thông báo về hành trình.",
    scriptSv:
      "Nästa station är T-Centralen. Byte till pendeltåg, blå linje och alla busslinjer. Tänk på avståndet mellan vagn och plattform när ni stiger av. Tåget slutar i Ropsten.",
    scriptVi:
      "Ga tiếp theo là T-Centralen. Đổi sang tàu ngoại ô, tuyến xanh dương và tất cả xe buýt. Chú ý khoảng cách giữa toa và sân ga khi xuống. Tàu kết thúc tại Ropsten.",
    keyVocab: [
      { sv: "nästa station", vi: "ga kế tiếp" },
      { sv: "byte till", vi: "đổi sang" },
      { sv: "avståndet", vi: "khoảng cách" },
      { sv: "stiga av", vi: "xuống tàu" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Ga tiếp theo là ga nào?",
        questionEn: "What is the next station?",
        options: [
          { sv: "Ropsten", vi: "Ropsten" },
          { sv: "T-Centralen", vi: "T-Centralen" },
          { sv: "Slussen", vi: "Slussen" },
          { sv: "Odenplan", vi: "Odenplan" },
        ],
        correctIndex: 1,
        explanationVi: "'Nästa station är T-Centralen'.",
      },
      {
        id: "q2",
        questionVi: "Ga cuối của tàu?",
        questionEn: "Terminal station?",
        options: [
          { sv: "Fridhemsplan", vi: "Fridhemsplan" },
          { sv: "Kungsträdgården", vi: "Kungsträdgården" },
          { sv: "Ropsten", vi: "Ropsten" },
          { sv: "Gamla stan", vi: "Gamla stan" },
        ],
        correctIndex: 2,
        explanationVi: "'Tåget slutar i Ropsten'.",
      },
      {
        id: "q3",
        questionVi: "Hành khách được nhắc chú ý điều gì?",
        questionEn: "What are passengers warned about?",
        options: [
          { sv: "Hala trappor", vi: "Cầu thang trơn" },
          { sv: "Avståndet mellan vagn och plattform", vi: "Khoảng cách toa và sân ga" },
          { sv: "Att ta med biljett", vi: "Mang theo vé" },
          { sv: "Att inte prata högt", vi: "Không nói to" },
        ],
        correctIndex: 1,
        explanationVi: "'Tänk på avståndet mellan vagn och plattform'.",
      },
    ],
    recommendedRate: 1.0,
  },

  // ═════════════════════ B1 ═════════════════════
  {
    id: "lis-b1-jobbintervju",
    level: "B1",
    titleVi: "Phỏng vấn xin việc bán thời gian",
    titleEn: "Part-time job interview",
    type: "dialogue",
    contextVi: "Amina phỏng vấn vị trí thu ngân bán thời gian tại ICA.",
    scriptSv:
      "Hej Amina, välkommen. Berätta lite om dig själv. — Tack. Jag studerar ekonomi på universitetet och söker ett extraarbete på kvällar och helger. Jag har jobbat två år som servitör så jag är van att möta kunder. — Vad tycker du är viktigast i kundservice? — Jag tycker att tålamod och tydlig kommunikation är viktigast. Man ska lyssna innan man svarar. — Bra svar. När kan du börja? — Jag kan börja nästa måndag om det passar.",
    scriptVi:
      "Chào Amina, chào mừng bạn. Kể chút về bản thân. — Cảm ơn. Em học kinh tế đại học và tìm việc thêm buổi tối và cuối tuần. Em đã làm phục vụ hai năm nên quen tiếp khách. — Theo bạn điều gì quan trọng nhất trong dịch vụ khách hàng? — Em nghĩ kiên nhẫn và giao tiếp rõ ràng là quan trọng nhất. Nên lắng nghe trước khi trả lời. — Câu trả lời hay. Khi nào bạn có thể bắt đầu? — Em có thể bắt đầu thứ Hai tới nếu phù hợp.",
    keyVocab: [
      { sv: "extraarbete", vi: "việc làm thêm" },
      { sv: "van att", vi: "quen với" },
      { sv: "tålamod", vi: "kiên nhẫn" },
      { sv: "tydlig kommunikation", vi: "giao tiếp rõ ràng" },
      { sv: "om det passar", vi: "nếu phù hợp" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Amina học ngành gì?",
        questionEn: "What does Amina study?",
        options: [
          { sv: "Juridik", vi: "Luật" },
          { sv: "Medicin", vi: "Y" },
          { sv: "Ekonomi", vi: "Kinh tế" },
          { sv: "Design", vi: "Thiết kế" },
        ],
        correctIndex: 2,
        explanationVi: "'Jag studerar ekonomi på universitetet'.",
      },
      {
        id: "q2",
        questionVi: "Kinh nghiệm làm việc trước đó của Amina?",
        questionEn: "Her previous work experience?",
        options: [
          { sv: "Kassör i tre år", vi: "Thu ngân 3 năm" },
          { sv: "Servitör i två år", vi: "Phục vụ 2 năm" },
          { sv: "Ingen erfarenhet", vi: "Không kinh nghiệm" },
          { sv: "Lärare i ett år", vi: "Giáo viên 1 năm" },
        ],
        correctIndex: 1,
        explanationVi: "'jobbat två år som servitör'.",
      },
      {
        id: "q3",
        questionVi: "Theo Amina, điều gì quan trọng nhất trong kundservice?",
        questionEn: "What is most important in customer service?",
        options: [
          { sv: "Snabbhet och styrka", vi: "Nhanh và mạnh" },
          { sv: "Tålamod och tydlig kommunikation", vi: "Kiên nhẫn và giao tiếp rõ" },
          { sv: "Bra utseende", vi: "Ngoại hình tốt" },
          { sv: "Låg lön", vi: "Lương thấp" },
        ],
        correctIndex: 1,
        explanationVi: "'tålamod och tydlig kommunikation är viktigast'.",
      },
      {
        id: "q4",
        questionVi: "Khi nào Amina có thể bắt đầu?",
        questionEn: "When can she start?",
        options: [
          { sv: "I morgon", vi: "Ngày mai" },
          { sv: "I dag", vi: "Hôm nay" },
          { sv: "Nästa måndag", vi: "Thứ Hai tới" },
          { sv: "Nästa månad", vi: "Tháng sau" },
        ],
        correctIndex: 2,
        explanationVi: "'Jag kan börja nästa måndag'.",
      },
    ],
    recommendedRate: 1.0,
  },
];

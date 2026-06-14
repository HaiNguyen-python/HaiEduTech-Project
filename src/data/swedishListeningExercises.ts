/**
 * @file swedishListeningExercises.ts
 * @description YKI Ruotsi (Swedish) listening exercises A1–B1.
 *              Each exercise contains a sv-SE script (played via TTS),
 *              VI translation, and 3–4 multiple choice comprehension questions.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishLevel } from "./swedishWritingPrompts";

export interface SwedishListeningQuestion {
  id: string;
  questionVi: string;
  questionEn: string;
  options: { sv: string; vi: string }[];
  correctIndex: number;
  explanationVi: string;
}

export interface SwedishListeningExercise {
  id: string;
  level: SwedishLevel;
  titleVi: string;
  titleEn: string;
  type: "dialogue" | "monologue" | "announcement" | "news";
  contextVi: string;
  scriptSv: string;          // full sv-SE script for TTS playback
  scriptVi: string;          // Vietnamese translation
  keyVocab: { sv: string; vi: string }[];
  questions: SwedishListeningQuestion[];
  recommendedRate: number;   // 0.8–1.0 for slow learners
}

export const SWEDISH_LISTENING_EXERCISES: SwedishListeningExercise[] = [
  // ═══════════════════ A1 ═══════════════════
  {
    id: "lis-a1-cafe",
    level: "A1",
    titleVi: "Gọi đồ ở quán cà phê",
    titleEn: "Ordering at a café",
    type: "dialogue",
    contextVi: "Anna đến quán cà phê Espresso House và gọi đồ uống. Hãy nghe và trả lời.",
    scriptSv:
      "Hej! Vad får det vara? — Hej, jag skulle vilja ha en kaffe latte och en kanelbulle, tack. — Ska det vara här eller med? — Här, tack. — Det blir sextiofem kronor. Kortet, tack. — Varsågod. Här är ditt kvitto. — Tack så mycket!",
    scriptVi:
      "Xin chào! Quý khách dùng gì? — Chào, cho tôi một caffe latte và một bánh quế, cảm ơn. — Dùng tại quán hay mang đi ạ? — Tại quán, cảm ơn. — Tổng cộng 65 kronor. Vui lòng đưa thẻ. — Đây ạ. Hoá đơn của bạn đây. — Cảm ơn nhiều!",
    keyVocab: [
      { sv: "Vad får det vara?", vi: "Bạn dùng gì?" },
      { sv: "skulle vilja ha", vi: "tôi muốn (lịch sự)" },
      { sv: "kanelbulle", vi: "bánh quế" },
      { sv: "Här eller med?", vi: "Tại quán hay mang đi?" },
      { sv: "kvitto", vi: "hoá đơn" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Anna gọi món gì?",
        questionEn: "What does Anna order?",
        options: [
          { sv: "En te och en smörgås", vi: "Một trà và bánh sandwich" },
          { sv: "En kaffe latte och en kanelbulle", vi: "Một latte và bánh quế" },
          { sv: "En cappuccino och en muffin", vi: "Một cappuccino và bánh muffin" },
          { sv: "En juice och en macka", vi: "Nước ép và bánh mì kẹp" },
        ],
        correctIndex: 1,
        explanationVi: "Anna nói rõ: 'en kaffe latte och en kanelbulle'.",
      },
      {
        id: "q2",
        questionVi: "Cô ấy uống tại quán hay mang đi?",
        questionEn: "Does she eat in or take away?",
        options: [
          { sv: "Med (mang đi)", vi: "Mang đi" },
          { sv: "Här (tại quán)", vi: "Tại quán" },
          { sv: "Hon vet inte", vi: "Cô ấy không biết" },
          { sv: "Hon tar bara kaffe", vi: "Chỉ lấy cà phê" },
        ],
        correctIndex: 1,
        explanationVi: "'Här, tack' = tại đây, cảm ơn.",
      },
      {
        id: "q3",
        questionVi: "Tổng hoá đơn là bao nhiêu?",
        questionEn: "Total bill?",
        options: [
          { sv: "55 kr", vi: "55 kronor" },
          { sv: "60 kr", vi: "60 kronor" },
          { sv: "65 kr", vi: "65 kronor" },
          { sv: "75 kr", vi: "75 kronor" },
        ],
        correctIndex: 2,
        explanationVi: "'sextiofem' = 65.",
      },
    ],
    recommendedRate: 0.9,
  },
  {
    id: "lis-a1-clock",
    level: "A1",
    titleVi: "Hỏi giờ và sắp xếp gặp",
    titleEn: "Asking time & arranging a meet",
    type: "dialogue",
    contextVi: "Erik gọi điện cho bạn Lisa để sắp xếp đi xem phim.",
    scriptSv:
      "Hej Lisa, det är Erik. Vad gör du i kväll? — Hej Erik! Inget speciellt. Hur så? — Vill du gå på bio? Filmen börjar klockan halv åtta. — Gärna! Var ska vi mötas? — Vi ses utanför biografen klockan sju och en kvart. — Perfekt, vi ses då!",
    scriptVi:
      "Chào Lisa, Erik đây. Tối nay bạn làm gì? — Chào Erik! Không có gì đặc biệt. Sao vậy? — Đi xem phim không? Phim bắt đầu lúc 7:30. — Tuyệt! Mình gặp ở đâu? — Gặp trước rạp lúc 7:15 nhé. — Hoàn hảo, hẹn gặp!",
    keyVocab: [
      { sv: "halv åtta", vi: "7:30" },
      { sv: "sju och en kvart", vi: "7:15" },
      { sv: "biografen", vi: "rạp chiếu phim" },
      { sv: "mötas / ses", vi: "gặp nhau" },
      { sv: "gärna", vi: "rất sẵn lòng" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Phim bắt đầu lúc mấy giờ?",
        questionEn: "When does the film start?",
        options: [
          { sv: "07:00", vi: "7:00" },
          { sv: "07:15", vi: "7:15" },
          { sv: "07:30", vi: "7:30" },
          { sv: "08:00", vi: "8:00" },
        ],
        correctIndex: 2,
        explanationVi: "'halv åtta' theo tiếng Thụy Điển = nửa tiếng trước 8, tức 7:30.",
      },
      {
        id: "q2",
        questionVi: "Họ hẹn gặp ở đâu?",
        questionEn: "Where do they meet?",
        options: [
          { sv: "Inne i biografen", vi: "Bên trong rạp" },
          { sv: "Utanför biografen", vi: "Trước cửa rạp" },
          { sv: "Hemma hos Lisa", vi: "Nhà Lisa" },
          { sv: "På caféet", vi: "Ở quán cà phê" },
        ],
        correctIndex: 1,
        explanationVi: "'utanför biografen' = bên ngoài rạp.",
      },
      {
        id: "q3",
        questionVi: "Họ gặp lúc mấy giờ?",
        questionEn: "Meet at what time?",
        options: [
          { sv: "07:00", vi: "7:00" },
          { sv: "07:15", vi: "7:15" },
          { sv: "07:30", vi: "7:30" },
          { sv: "07:45", vi: "7:45" },
        ],
        correctIndex: 1,
        explanationVi: "'sju och en kvart' = 7 giờ 15.",
      },
    ],
    recommendedRate: 0.9,
  },
  {
    id: "lis-a1-weather",
    level: "A1",
    titleVi: "Dự báo thời tiết Stockholm",
    titleEn: "Stockholm weather forecast",
    type: "announcement",
    contextVi: "Phát thanh viên SVT đọc dự báo thời tiết ngày mai cho Stockholm.",
    scriptSv:
      "Och nu till väderleksrapporten. I morgon blir det mest molnigt i Stockholm. På morgonen kan det regna lite, men på eftermiddagen kommer solen fram. Temperaturen blir cirka tolv grader. På kvällen blir det kallare, runt sex grader. Glöm inte paraplyet!",
    scriptVi:
      "Và giờ là bản tin thời tiết. Ngày mai Stockholm chủ yếu nhiều mây. Sáng có thể có mưa nhẹ, nhưng chiều thì nắng lên. Nhiệt độ khoảng 12 độ. Tối lạnh hơn, khoảng 6 độ. Đừng quên mang ô!",
    keyVocab: [
      { sv: "molnigt", vi: "nhiều mây" },
      { sv: "regna", vi: "mưa" },
      { sv: "solen kommer fram", vi: "mặt trời ló dạng" },
      { sv: "grader", vi: "độ (nhiệt độ)" },
      { sv: "paraply", vi: "cái ô" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Buổi sáng thời tiết thế nào?",
        questionEn: "Morning weather?",
        options: [
          { sv: "Soligt", vi: "Nắng" },
          { sv: "Lite regn", vi: "Mưa nhẹ" },
          { sv: "Snö", vi: "Tuyết" },
          { sv: "Storm", vi: "Bão" },
        ],
        correctIndex: 1,
        explanationVi: "'På morgonen kan det regna lite'.",
      },
      {
        id: "q2",
        questionVi: "Nhiệt độ ban ngày khoảng bao nhiêu?",
        questionEn: "Daytime temperature?",
        options: [
          { sv: "6 grader", vi: "6 độ" },
          { sv: "12 grader", vi: "12 độ" },
          { sv: "16 grader", vi: "16 độ" },
          { sv: "20 grader", vi: "20 độ" },
        ],
        correctIndex: 1,
        explanationVi: "'cirka tolv grader' = khoảng 12 độ.",
      },
      {
        id: "q3",
        questionVi: "Phát thanh viên khuyên mang theo gì?",
        questionEn: "What should you bring?",
        options: [
          { sv: "Solglasögon", vi: "Kính mát" },
          { sv: "Paraply", vi: "Ô" },
          { sv: "Vante", vi: "Găng tay" },
          { sv: "Sjal", vi: "Khăn quàng" },
        ],
        correctIndex: 1,
        explanationVi: "'Glöm inte paraplyet!' = đừng quên ô.",
      },
    ],
    recommendedRate: 0.9,
  },
  {
    id: "lis-a1-station",
    level: "A1",
    titleVi: "Thông báo tại ga tàu",
    titleEn: "Announcement at the train station",
    type: "announcement",
    contextVi: "Bạn đang ở ga trung tâm Stockholm Centralstation và nghe thông báo qua loa.",
    scriptSv:
      "Information från SJ. Tåget mot Göteborg avgår från spår fyra klockan tio och tjugo. Vi ber resenärerna att gå till spår fyra. Glöm inte att stämpla biljetten. Tack för att ni reser med SJ.",
    scriptVi:
      "Thông báo từ SJ. Tàu đi Göteborg khởi hành từ đường ray số 4 lúc 10:20. Đề nghị hành khách đi đến đường ray số 4. Đừng quên đóng dấu vé. Cảm ơn quý khách đã đi cùng SJ.",
    keyVocab: [
      { sv: "tåget", vi: "chuyến tàu" },
      { sv: "avgår", vi: "khởi hành" },
      { sv: "spår", vi: "đường ray" },
      { sv: "resenärerna", vi: "hành khách" },
      { sv: "stämpla biljetten", vi: "đóng dấu vé" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Tàu đi đâu?",
        questionEn: "Train to where?",
        options: [
          { sv: "Malmö", vi: "Malmö" },
          { sv: "Göteborg", vi: "Göteborg" },
          { sv: "Uppsala", vi: "Uppsala" },
          { sv: "Lund", vi: "Lund" },
        ],
        correctIndex: 1,
        explanationVi: "'Tåget mot Göteborg'.",
      },
      {
        id: "q2",
        questionVi: "Tàu khởi hành từ đường ray số mấy?",
        questionEn: "Departs from which track?",
        options: [
          { sv: "2", vi: "2" },
          { sv: "3", vi: "3" },
          { sv: "4", vi: "4" },
          { sv: "10", vi: "10" },
        ],
        correctIndex: 2,
        explanationVi: "'spår fyra' = đường ray 4.",
      },
      {
        id: "q3",
        questionVi: "Mấy giờ tàu chạy?",
        questionEn: "Departure time?",
        options: [
          { sv: "10:02", vi: "10:02" },
          { sv: "10:20", vi: "10:20" },
          { sv: "11:20", vi: "11:20" },
          { sv: "12:00", vi: "12:00" },
        ],
        correctIndex: 1,
        explanationVi: "'tio och tjugo' = 10 giờ 20.",
      },
    ],
    recommendedRate: 0.9,
  },

  // ═══════════════════ A2 ═══════════════════
  {
    id: "lis-a2-doctor",
    level: "A2",
    titleVi: "Đặt lịch khám bác sĩ",
    titleEn: "Booking a doctor's appointment",
    type: "dialogue",
    contextVi: "Maria gọi điện đến Vårdcentralen để đặt lịch khám.",
    scriptSv:
      "Vårdcentralen, det är Karin. — Hej, jag heter Maria Nguyen och jag har ont i halsen sedan tre dagar. Jag skulle vilja boka en tid. — Har du feber? — Ja, trettioåtta och en halv. — Då kan du komma i morgon klockan kvart över nio. Du behöver ta med dig ditt personnummer och legitimation. — Tack, då kommer jag. Hej då!",
    scriptVi:
      "Trạm y tế xin nghe, Karin đây. — Chào, tôi là Maria Nguyen, đau họng đã 3 ngày. Tôi muốn đặt lịch khám. — Bạn có sốt không? — Có, 38.5 độ. — Vậy ngày mai 9:15 đến nhé. Mang theo mã số cá nhân và giấy tờ tuỳ thân. — Cảm ơn, tôi sẽ đến. Tạm biệt!",
    keyVocab: [
      { sv: "ont i halsen", vi: "đau họng" },
      { sv: "boka en tid", vi: "đặt lịch" },
      { sv: "feber", vi: "sốt" },
      { sv: "personnummer", vi: "mã số cá nhân" },
      { sv: "legitimation (leg.)", vi: "giấy tờ tuỳ thân" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Maria bị triệu chứng gì?",
        questionEn: "What symptom does Maria have?",
        options: [
          { sv: "Huvudvärk", vi: "Đau đầu" },
          { sv: "Ont i halsen", vi: "Đau họng" },
          { sv: "Magont", vi: "Đau bụng" },
          { sv: "Hosta", vi: "Ho" },
        ],
        correctIndex: 1,
        explanationVi: "'Jag har ont i halsen sedan tre dagar.'",
      },
      {
        id: "q2",
        questionVi: "Cô được hẹn lúc mấy giờ?",
        questionEn: "What time is her appointment?",
        options: [
          { sv: "09:00", vi: "9:00" },
          { sv: "09:15", vi: "9:15" },
          { sv: "09:30", vi: "9:30" },
          { sv: "09:45", vi: "9:45" },
        ],
        correctIndex: 1,
        explanationVi: "'kvart över nio' = 9 giờ 15.",
      },
      {
        id: "q3",
        questionVi: "Cần mang gì khi đi khám?",
        questionEn: "What must she bring?",
        options: [
          { sv: "Recept", vi: "Đơn thuốc" },
          { sv: "Personnummer + legitimation", vi: "Mã số cá nhân + giấy tờ" },
          { sv: "Pengar", vi: "Tiền mặt" },
          { sv: "Familjemedlem", vi: "Người thân" },
        ],
        correctIndex: 1,
        explanationVi: "Đặc trưng Thụy Điển: luôn cần personnummer + leg.",
      },
    ],
    recommendedRate: 0.95,
  },
  {
    id: "lis-a2-apartment",
    level: "A2",
    titleVi: "Hỏi thuê căn hộ",
    titleEn: "Apartment viewing call",
    type: "dialogue",
    contextVi: "Anh David gọi điện hỏi căn hộ đăng trên Blocket.",
    scriptSv:
      "Hej, jag ringer angående lägenheten på Sveavägen som ni har lagt ut på Blocket. Är den fortfarande ledig? — Ja, den är ledig från och med första juni. Hyran är åtta tusen kronor i månaden, inklusive el och värme. — Hur stor är lägenheten? — Det är en tvåa på fyrtiofem kvadratmeter, med balkong. — Får man husdjur? — Tyvärr, inga husdjur. Vill du komma och titta på onsdag klockan sex?",
    scriptVi:
      "Chào, tôi gọi về căn hộ trên Sveavägen các bạn đăng trên Blocket. Còn trống không? — Còn, từ ngày 1/6. Tiền thuê 8.000 kronor/tháng, đã gồm điện và sưởi. — Diện tích bao nhiêu? — Căn 2 phòng, 45 m², có ban công. — Cho nuôi thú cưng không? — Rất tiếc, không. Bạn muốn xem nhà thứ tư lúc 6 giờ chứ?",
    keyVocab: [
      { sv: "ledig", vi: "còn trống" },
      { sv: "hyra", vi: "tiền thuê" },
      { sv: "inklusive el och värme", vi: "đã gồm điện + sưởi" },
      { sv: "en tvåa", vi: "căn 2 phòng" },
      { sv: "husdjur", vi: "thú cưng" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Tiền thuê hàng tháng là bao nhiêu?",
        questionEn: "Monthly rent?",
        options: [
          { sv: "6 000 kr", vi: "6.000 kr" },
          { sv: "7 500 kr", vi: "7.500 kr" },
          { sv: "8 000 kr", vi: "8.000 kr" },
          { sv: "10 000 kr", vi: "10.000 kr" },
        ],
        correctIndex: 2,
        explanationVi: "'åtta tusen kronor' = 8.000 kr.",
      },
      {
        id: "q2",
        questionVi: "Diện tích căn hộ?",
        questionEn: "Apartment size?",
        options: [
          { sv: "35 m²", vi: "35 m²" },
          { sv: "40 m²", vi: "40 m²" },
          { sv: "45 m²", vi: "45 m²" },
          { sv: "55 m²", vi: "55 m²" },
        ],
        correctIndex: 2,
        explanationVi: "'fyrtiofem kvadratmeter' = 45 m².",
      },
      {
        id: "q3",
        questionVi: "Có cho nuôi thú cưng không?",
        questionEn: "Are pets allowed?",
        options: [
          { sv: "Ja", vi: "Có" },
          { sv: "Bara katter", vi: "Chỉ mèo" },
          { sv: "Bara små hundar", vi: "Chỉ chó nhỏ" },
          { sv: "Nej", vi: "Không" },
        ],
        correctIndex: 3,
        explanationVi: "'Tyvärr, inga husdjur.'",
      },
    ],
    recommendedRate: 0.95,
  },
  {
    id: "lis-a2-bank",
    level: "A2",
    titleVi: "Mở tài khoản BankID",
    titleEn: "Opening a bank account & BankID",
    type: "dialogue",
    contextVi: "Khách hàng đến Handelsbanken để mở tài khoản và xin BankID.",
    scriptSv:
      "Välkommen till Handelsbanken, hur kan jag hjälpa dig? — Hej, jag skulle vilja öppna ett konto och få mobilt BankID. — Har du svenskt personnummer? — Ja, jag fick det i förra månaden. — Bra. Då behöver jag se ditt pass och uppehållstillstånd. Sedan kan vi göra allt på ungefär en halvtimme.",
    scriptVi:
      "Chào mừng đến Handelsbanken, tôi giúp gì được? — Chào, tôi muốn mở tài khoản và xin BankID di động. — Bạn có mã số cá nhân Thụy Điển chưa? — Có, tháng trước tôi nhận. — Tốt. Cho tôi xem hộ chiếu và giấy phép cư trú. Sau đó chúng ta hoàn tất khoảng 30 phút.",
    keyVocab: [
      { sv: "öppna ett konto", vi: "mở tài khoản" },
      { sv: "mobilt BankID", vi: "BankID di động" },
      { sv: "personnummer", vi: "mã cá nhân" },
      { sv: "uppehållstillstånd", vi: "giấy phép cư trú" },
      { sv: "en halvtimme", vi: "nửa giờ" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Khách hàng muốn làm gì?",
        questionEn: "What does the customer want?",
        options: [
          { sv: "Ta ut pengar", vi: "Rút tiền" },
          { sv: "Öppna konto + BankID", vi: "Mở TK + BankID" },
          { sv: "Stänga konto", vi: "Đóng TK" },
          { sv: "Byta bank", vi: "Chuyển ngân hàng" },
        ],
        correctIndex: 1,
        explanationVi: "Câu mở đầu của khách.",
      },
      {
        id: "q2",
        questionVi: "Cần giấy tờ gì?",
        questionEn: "Required documents?",
        options: [
          { sv: "Bara körkort", vi: "Chỉ bằng lái" },
          { sv: "Pass + uppehållstillstånd", vi: "Hộ chiếu + giấy cư trú" },
          { sv: "ID-kort + visum", vi: "ID + visa" },
          { sv: "Inget alls", vi: "Không cần gì" },
        ],
        correctIndex: 1,
        explanationVi: "Quy định ngân hàng Thụy Điển.",
      },
      {
        id: "q3",
        questionVi: "Quá trình mất bao lâu?",
        questionEn: "How long does it take?",
        options: [
          { sv: "10 minuter", vi: "10 phút" },
          { sv: "30 minuter", vi: "30 phút" },
          { sv: "1 timme", vi: "1 giờ" },
          { sv: "2 timmar", vi: "2 giờ" },
        ],
        correctIndex: 1,
        explanationVi: "'en halvtimme' = 30 phút.",
      },
    ],
    recommendedRate: 0.95,
  },
  {
    id: "lis-a2-recipe",
    level: "A2",
    titleVi: "Công thức bánh quế (kanelbullar)",
    titleEn: "Cinnamon bun recipe monologue",
    type: "monologue",
    contextVi: "Đầu bếp Astrid hướng dẫn nướng kanelbullar trong chương trình podcast.",
    scriptSv:
      "Idag ska jag visa hur man bakar klassiska kanelbullar. Du behöver femhundra gram vetemjöl, etthundra gram smör, två deciliter mjölk, ett ägg, en tesked kanel och två matskedar socker. Först värmer du mjölken till trettiosju grader. Sedan blandar du jäst, mjöl och smör. Knåda degen i tio minuter och låt den jäsa i en timme. Slutligen rullar du ut degen, strö på kanel och socker, och grädda i ugnen i tjugo minuter på tvåhundra grader.",
    scriptVi:
      "Hôm nay tôi sẽ hướng dẫn nướng bánh kanelbullar truyền thống. Bạn cần 500g bột mì, 100g bơ, 200ml sữa, 1 quả trứng, 1 thìa cà phê quế, 2 thìa canh đường. Đầu tiên làm ấm sữa đến 37 độ. Sau đó trộn men, bột và bơ. Nhồi bột 10 phút, ủ 1 giờ. Cuối cùng cán bột, rắc quế và đường, nướng 20 phút ở 200 độ.",
    keyVocab: [
      { sv: "vetemjöl", vi: "bột mì" },
      { sv: "smör", vi: "bơ" },
      { sv: "jäst", vi: "men nở" },
      { sv: "knåda", vi: "nhồi" },
      { sv: "grädda", vi: "nướng" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Cần bao nhiêu gram bột mì?",
        questionEn: "How much flour?",
        options: [
          { sv: "300 g", vi: "300g" },
          { sv: "400 g", vi: "400g" },
          { sv: "500 g", vi: "500g" },
          { sv: "1 kg", vi: "1kg" },
        ],
        correctIndex: 2,
        explanationVi: "'femhundra gram vetemjöl' = 500g.",
      },
      {
        id: "q2",
        questionVi: "Ủ bột bao lâu?",
        questionEn: "Rising time?",
        options: [
          { sv: "10 minuter", vi: "10 phút" },
          { sv: "30 minuter", vi: "30 phút" },
          { sv: "1 timme", vi: "1 giờ" },
          { sv: "2 timmar", vi: "2 giờ" },
        ],
        correctIndex: 2,
        explanationVi: "'jäsa i en timme'.",
      },
      {
        id: "q3",
        questionVi: "Nướng ở nhiệt độ bao nhiêu?",
        questionEn: "Oven temperature?",
        options: [
          { sv: "150°C", vi: "150°C" },
          { sv: "180°C", vi: "180°C" },
          { sv: "200°C", vi: "200°C" },
          { sv: "220°C", vi: "220°C" },
        ],
        correctIndex: 2,
        explanationVi: "'på tvåhundra grader'.",
      },
    ],
    recommendedRate: 0.95,
  },

  // ═══════════════════ B1 ═══════════════════
  {
    id: "lis-b1-interview",
    level: "B1",
    titleVi: "Phỏng vấn nghề nghiệp trên SR P1",
    titleEn: "Career interview on SR P1",
    type: "news",
    contextVi: "Một đoạn phỏng vấn ngắn với kỹ sư phần mềm trẻ trên đài Sveriges Radio.",
    scriptSv:
      "Vi har träffat Sofia Lindberg, en mjukvaruingenjör som flyttade från Vietnam till Sverige för fem år sedan. Sofia, vad var den största utmaningen i början? — Den största utmaningen var nog språket. Trots att jag pratade engelska på jobbet, märkte jag att kollegorna pratade svenska under lunchen och fikat. Därför började jag läsa SFI på kvällarna. Efter ungefär två år kände jag mig bekväm i alla situationer. Mitt råd till nya invandrare är att inte vara rädd för att göra fel — svenskar är väldigt tålmodiga och uppskattar att man försöker.",
    scriptVi:
      "Chúng tôi gặp Sofia Lindberg, kỹ sư phần mềm chuyển từ Việt Nam sang Thụy Điển 5 năm trước. Sofia, thách thức lớn nhất ban đầu là gì? — Lớn nhất là ngôn ngữ. Dù tôi nói tiếng Anh tại công ty, đồng nghiệp nói tiếng Thụy Điển giờ ăn trưa và fika. Vì vậy tôi học SFI buổi tối. Sau khoảng 2 năm tôi thoải mái trong mọi tình huống. Lời khuyên của tôi cho người mới: đừng sợ sai — người Thụy Điển rất kiên nhẫn và quý người chịu khó học.",
    keyVocab: [
      { sv: "mjukvaruingenjör", vi: "kỹ sư phần mềm" },
      { sv: "den största utmaningen", vi: "thách thức lớn nhất" },
      { sv: "trots att", vi: "mặc dù" },
      { sv: "fika", vi: "giờ giải lao cà phê (văn hoá Thụy Điển)" },
      { sv: "uppskattar", vi: "trân trọng" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Sofia làm nghề gì?",
        questionEn: "Sofia's profession?",
        options: [
          { sv: "Lärare", vi: "Giáo viên" },
          { sv: "Läkare", vi: "Bác sĩ" },
          { sv: "Mjukvaruingenjör", vi: "Kỹ sư phần mềm" },
          { sv: "Designer", vi: "Nhà thiết kế" },
        ],
        correctIndex: 2,
        explanationVi: "Người dẫn giới thiệu rõ.",
      },
      {
        id: "q2",
        questionVi: "Thử thách lớn nhất khi mới đến là gì?",
        questionEn: "Biggest challenge?",
        options: [
          { sv: "Vädret", vi: "Thời tiết" },
          { sv: "Språket", vi: "Ngôn ngữ" },
          { sv: "Maten", vi: "Đồ ăn" },
          { sv: "Boendet", vi: "Nhà ở" },
        ],
        correctIndex: 1,
        explanationVi: "'Den största utmaningen var nog språket.'",
      },
      {
        id: "q3",
        questionVi: "Lời khuyên của Sofia cho người mới?",
        questionEn: "Sofia's advice?",
        options: [
          { sv: "Lär dig engelska först", vi: "Học tiếng Anh trước" },
          { sv: "Var inte rädd för att göra fel", vi: "Đừng sợ sai" },
          { sv: "Flytta till en stor stad", vi: "Chuyển đến thành phố lớn" },
          { sv: "Jobba hemifrån", vi: "Làm việc từ xa" },
        ],
        correctIndex: 1,
        explanationVi: "Câu cuối: 'inte vara rädd för att göra fel'.",
      },
      {
        id: "q4",
        questionVi: "Sofia đã đến Thụy Điển bao nhiêu năm?",
        questionEn: "Years in Sweden?",
        options: [
          { sv: "2 år", vi: "2 năm" },
          { sv: "3 år", vi: "3 năm" },
          { sv: "5 år", vi: "5 năm" },
          { sv: "10 år", vi: "10 năm" },
        ],
        correctIndex: 2,
        explanationVi: "'flyttade … för fem år sedan'.",
      },
    ],
    recommendedRate: 1.0,
  },
  {
    id: "lis-b1-climate",
    level: "B1",
    titleVi: "Bản tin biến đổi khí hậu",
    titleEn: "Climate change news bulletin",
    type: "news",
    contextVi: "Phát thanh viên SVT đọc bản tin về biến đổi khí hậu ở Bắc Âu.",
    scriptSv:
      "En ny rapport från SMHI visar att medeltemperaturen i Sverige har stigit med nästan två grader sedan nittonhundratalets början. Vintrarna blir kortare och somrarna varmare. Forskare varnar för att skogsbränder kan bli vanligare i framtiden. Regeringen har därför beslutat att satsa fyra miljarder kronor på förnybar energi och bättre kollektivtrafik. Många experter anser dock att åtgärderna inte räcker, eftersom utsläppen från transport och industri fortfarande är höga.",
    scriptVi:
      "Báo cáo mới của SMHI cho thấy nhiệt độ trung bình ở Thụy Điển tăng gần 2 độ kể từ đầu thế kỷ 20. Mùa đông ngắn hơn, mùa hè ấm hơn. Các nhà khoa học cảnh báo cháy rừng sẽ phổ biến hơn trong tương lai. Chính phủ vì vậy đã quyết định đầu tư 4 tỷ kronor vào năng lượng tái tạo và giao thông công cộng. Nhiều chuyên gia cho rằng biện pháp này chưa đủ, vì khí thải từ giao thông và công nghiệp vẫn cao.",
    keyVocab: [
      { sv: "medeltemperaturen", vi: "nhiệt độ trung bình" },
      { sv: "skogsbränder", vi: "cháy rừng" },
      { sv: "förnybar energi", vi: "năng lượng tái tạo" },
      { sv: "kollektivtrafik", vi: "giao thông công cộng" },
      { sv: "utsläpp", vi: "khí thải" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Nhiệt độ trung bình tăng bao nhiêu?",
        questionEn: "Temperature rise?",
        options: [
          { sv: "0,5 grader", vi: "0,5°C" },
          { sv: "1 grad", vi: "1°C" },
          { sv: "nästan 2 grader", vi: "gần 2°C" },
          { sv: "5 grader", vi: "5°C" },
        ],
        correctIndex: 2,
        explanationVi: "'stigit med nästan två grader'.",
      },
      {
        id: "q2",
        questionVi: "Chính phủ đầu tư bao nhiêu?",
        questionEn: "Government investment?",
        options: [
          { sv: "1 miljard kr", vi: "1 tỷ kronor" },
          { sv: "2 miljarder kr", vi: "2 tỷ kronor" },
          { sv: "4 miljarder kr", vi: "4 tỷ kronor" },
          { sv: "10 miljarder kr", vi: "10 tỷ kronor" },
        ],
        correctIndex: 2,
        explanationVi: "'fyra miljarder kronor'.",
      },
      {
        id: "q3",
        questionVi: "Đầu tư vào lĩnh vực gì?",
        questionEn: "Investment area?",
        options: [
          { sv: "Skola", vi: "Trường học" },
          { sv: "Försvar", vi: "Quốc phòng" },
          { sv: "Förnybar energi + kollektivtrafik", vi: "Năng lượng tái tạo + giao thông công cộng" },
          { sv: "Sjukvård", vi: "Y tế" },
        ],
        correctIndex: 2,
        explanationVi: "Đề cập rõ trong bản tin.",
      },
      {
        id: "q4",
        questionVi: "Tại sao chuyên gia cho rằng chưa đủ?",
        questionEn: "Why insufficient?",
        options: [
          { sv: "Pengarna är för få", vi: "Tiền quá ít" },
          { sv: "Utsläppen från transport och industri är fortfarande höga", vi: "Khí thải từ giao thông & công nghiệp vẫn cao" },
          { sv: "Vintrarna är för kalla", vi: "Mùa đông quá lạnh" },
          { sv: "Befolkningen växer", vi: "Dân số tăng" },
        ],
        correctIndex: 1,
        explanationVi: "Câu cuối nêu lý do.",
      },
    ],
    recommendedRate: 1.0,
  },
  {
    id: "lis-b1-allemansratt",
    level: "B1",
    titleVi: "Quyền tự do đi lại Allemansrätten",
    titleEn: "Allemansrätten explained",
    type: "monologue",
    contextVi: "Hướng dẫn viên du lịch giải thích Allemansrätten cho khách nước ngoài.",
    scriptSv:
      "Allemansrätten är en unik svensk tradition som ger alla rätten att vistas i naturen. Det betyder att du får vandra, plocka bär och svamp, simma i sjöar och även tälta i högst två nätter, även om marken ägs av någon annan. Men med rättigheter kommer också ansvar: du måste respektera djurlivet, inte störa hemfriden och alltid ta med dig allt skräp hem. Allemansrätten är inte skriven i lagen, utan bygger på sedvänja och ömsesidig respekt.",
    scriptVi:
      "Allemansrätten là truyền thống độc đáo của Thụy Điển, trao cho mọi người quyền tiếp cận thiên nhiên. Bạn được đi bộ, hái quả mọng và nấm, bơi trong hồ và cắm trại tối đa 2 đêm, dù đất thuộc sở hữu người khác. Nhưng quyền đi cùng trách nhiệm: tôn trọng động vật, không quấy rầy sự riêng tư, luôn mang rác về. Allemansrätten không được viết thành luật, mà dựa trên phong tục và tôn trọng lẫn nhau.",
    keyVocab: [
      { sv: "vistas i naturen", vi: "lưu trú trong thiên nhiên" },
      { sv: "tälta", vi: "cắm trại" },
      { sv: "hemfrid", vi: "sự riêng tư của nhà" },
      { sv: "skräp", vi: "rác" },
      { sv: "sedvänja", vi: "phong tục" },
    ],
    questions: [
      {
        id: "q1",
        questionVi: "Được cắm trại tối đa bao nhiêu đêm?",
        questionEn: "Max camping nights?",
        options: [
          { sv: "1 natt", vi: "1 đêm" },
          { sv: "2 nätter", vi: "2 đêm" },
          { sv: "3 nätter", vi: "3 đêm" },
          { sv: "7 nätter", vi: "7 đêm" },
        ],
        correctIndex: 1,
        explanationVi: "'tälta i högst två nätter'.",
      },
      {
        id: "q2",
        questionVi: "Allemansrätten có được viết thành luật không?",
        questionEn: "Is it a written law?",
        options: [
          { sv: "Ja, sedan 1700-talet", vi: "Có, từ TK 18" },
          { sv: "Nej, det är en sedvänja", vi: "Không, là phong tục" },
          { sv: "Bara i norra Sverige", vi: "Chỉ ở Bắc Thụy Điển" },
          { sv: "Bara för svenska medborgare", vi: "Chỉ công dân Thụy Điển" },
        ],
        correctIndex: 1,
        explanationVi: "'inte skriven i lagen, utan bygger på sedvänja'.",
      },
      {
        id: "q3",
        questionVi: "Trách nhiệm chính của người sử dụng quyền này?",
        questionEn: "Key responsibility?",
        options: [
          { sv: "Betala en avgift", vi: "Trả phí" },
          { sv: "Ta med sig allt skräp hem", vi: "Mang rác về" },
          { sv: "Berätta för ägaren", vi: "Báo chủ đất" },
          { sv: "Bara gå med guide", vi: "Đi cùng HDV" },
        ],
        correctIndex: 1,
        explanationVi: "Trách nhiệm quan trọng nhất.",
      },
    ],
    recommendedRate: 1.0,
  },
];

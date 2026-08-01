/**
 * @file swedishSpeakingModelAnswers.ts
 * @description Full model (sample) answers for every YKI Ruotsi Tala prompt,
 *              so learners can read a Band 4–5 example before recording.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface SwedishSpeakingModelAnswer {
  sv: string;       // full sample answer in Swedish
  vi: string;       // Vietnamese translation
  bandNote: string; // why this answer reaches the target band
}

import { SWEDISH_SPEAKING_MODEL_ANSWERS_EXPANSION } from "./swedishSpeakingModelAnswersExpansion";

/** Keyed by SwedishSpeakingPrompt.id */
export const SWEDISH_SPEAKING_MODEL_ANSWERS: Record<string, SwedishSpeakingModelAnswer> = {
  // ─── A1 ───
  "s-a1-self": {
    sv: "Hej! Jag heter Linh och jag är tjugofem år gammal. Jag kommer från Vietnam, men nu bor jag i Stockholm. I min familj är vi fyra personer: mamma, pappa, min lillebror och jag. Jag arbetar som sjuksköterska och på fritiden tycker jag om att laga vietnamesisk mat och promenera vid vattnet.",
    vi: "Chào! Tôi tên Linh, 25 tuổi. Tôi đến từ Việt Nam, hiện sống ở Stockholm. Gia đình tôi có 4 người: mẹ, bố, em trai và tôi. Tôi làm y tá, lúc rảnh tôi thích nấu món Việt và đi dạo ven nước.",
    bandNote: "Band 4 A1: chia động từ đúng, dùng 'men', 'och', mở rộng sở thích (fritiden).",
  },
  "s-a1-weekend": {
    sv: "På helgen brukar jag vakna sent. På lördag handlar jag mat på ICA och städar lägenheten. Sedan möter jag mina vänner på ett kafé och vi fikar tillsammans. På söndag tycker jag om att titta på film hemma och förbereda lunchen för veckan.",
    vi: "Cuối tuần tôi thường dậy muộn. Thứ Bảy mua thực phẩm ở ICA và dọn căn hộ. Sau đó gặp bạn ở quán cà phê và fika. Chủ nhật tôi thích xem phim ở nhà và chuẩn bị bữa trưa cho tuần.",
    bandNote: "A1+: 'brukar' (thói quen), 'sedan' (sau đó) — tốt cho điểm Coherence.",
  },
  "s-a1-home": {
    sv: "Jag bor i en tvåa med två rum och kök. I vardagsrummet finns en soffa, ett bord och en stor TV. I köket finns ett kylskåp, en spis och en mikro. Jag har också en liten balkong där jag dricker kaffe på morgonen. Jag tycker att min lägenhet är mysig och ljus.",
    vi: "Tôi sống trong căn 2 phòng cộng bếp. Phòng khách có sofa, bàn và TV lớn. Bếp có tủ lạnh, bếp lò và lò vi sóng. Còn có ban công nhỏ tôi uống cà phê buổi sáng. Căn hộ của tôi ấm cúng và sáng sủa.",
    bandNote: "A1: 'det finns' lặp lại an toàn, kết bằng đánh giá cá nhân ('mysig och ljus').",
  },
  "s-a1-food": {
    sv: "Min favoritmat är phở, en vietnamesisk nudelsoppa. Jag brukar äta den hemma eller på en vietnamesisk restaurang i Södermalm. För att laga phở behöver man nudlar, kött, lök, ingefära och färska örter. Den är varm, smakrik och perfekt på vintern i Sverige.",
    vi: "Món tôi yêu thích là phở, súp mì Việt Nam. Tôi thường ăn ở nhà hoặc tại nhà hàng Việt ở Södermalm. Để nấu phở cần mì, thịt, hành, gừng và rau thơm. Món ấm, đậm đà, hoàn hảo cho mùa đông Thụy Điển.",
    bandNote: "A1: 'Man behöver' rất an toàn; thêm tính từ + bối cảnh Thụy Điển.",
  },

  // ─── A2 ───
  "s-a2-restaurant": {
    sv: "Ursäkta mig, jag har ett litet problem. Min lax är tyvärr kall och potatisen är också ljum. Skulle jag kunna få den uppvärmd, eller kanske en ny portion? Jag vill inte klaga, men det smakar inte bra. Tack så mycket för din hjälp.",
    vi: "Xin lỗi, tôi gặp vấn đề nhỏ. Cá hồi của tôi tiếc thay đã nguội, khoai cũng âm ấm. Có thể hâm lại hoặc đổi suất mới không? Tôi không muốn phàn nàn nhưng món không ngon. Cảm ơn bạn đã giúp.",
    bandNote: "A2: 'Skulle jag kunna' (modal lịch sự) + cấu trúc 'inte … utan' — tăng Vocabulary.",
  },
  "s-a2-job-day": {
    sv: "På morgonen vaknar jag klockan sex och tar en kopp kaffe innan jag åker tunnelbana till jobbet. Jag arbetar som projektledare på ett IT-företag. På eftermiddagen har jag möten med mitt team och svarar på mejl. På kvällen lagar jag middag, läser en bok och brukar lägga mig vid elva.",
    vi: "Buổi sáng tôi dậy 6 giờ, uống cà phê rồi đi tàu điện ngầm đến công ty. Tôi làm quản lý dự án IT. Chiều họp nhóm, trả lời email. Tối nấu ăn, đọc sách và thường đi ngủ lúc 11 giờ.",
    bandNote: "A2: V2 inversion sau trạng từ thời gian (På morgonen vaknar jag…) là 'must-have'.",
  },
  "s-a2-holiday": {
    sv: "I somras åkte jag och min familj till Gotland under en vecka. Vi bodde i en stuga nära havet i Visby. Vi besökte gamla ringmuren, badade i Östersjön och åt glass varje kväll. Vädret var fantastiskt — nästan tjugofem grader — så vi tillbringade mest tid utomhus. Jag tyckte att resan var underbar eftersom vi kopplade av tillsammans.",
    vi: "Hè vừa rồi gia đình tôi đi Gotland 1 tuần. Ở nhà gỗ gần biển ở Visby. Tham quan tường thành cổ, tắm biển Baltic và ăn kem mỗi tối. Thời tiết tuyệt vời — gần 25 độ — nên hầu hết ở ngoài trời. Chuyến đi rất tuyệt vì cả nhà cùng thư giãn.",
    bandNote: "A2: thì quá khứ đều, 'eftersom' giải thích — tốt cho Grammar.",
  },
  "s-a2-cooking": {
    sv: "Min favoriträtt är vietnamesiska vårrullar. För att laga dem behöver man riskakor, glasnudlar, fläskfärs, morötter och färsk koriander. Först blötlägger man riskakorna i ljummet vatten. Sedan blandar man fyllningen och rullar ihop allt. Till sist friterar man rullarna i tre minuter och serverar med söt chilisås.",
    vi: "Món yêu thích là nem cuốn Việt Nam. Cần bánh đa nem, miến, thịt heo bằm, cà rốt và rau mùi. Đầu tiên nhúng bánh trong nước ấm. Sau đó trộn nhân và cuốn. Cuối cùng rán 3 phút, ăn cùng tương ớt ngọt.",
    bandNote: "A2: 'Först / Sedan / Till sist' tạo trình tự rõ ràng.",
  },

  // ─── B1 ───
  "s-b1-environment": {
    sv: "Jag tycker att vi alla har ett gemensamt ansvar för miljön. För det första kan vi åka kollektivt eller cykla istället för att ta bilen, eftersom transport står för en stor del av utsläppen. För det andra borde vi minska köttkonsumtionen och välja säsongens grönsaker. För det tredje är det viktigt att sortera sopor och återvinna plast. Sammanfattningsvis tror jag att även små förändringar i vardagen kan göra stor skillnad om vi gör dem tillsammans.",
    vi: "Tôi nghĩ chúng ta có trách nhiệm chung với môi trường. Thứ nhất, đi phương tiện công cộng hoặc xe đạp thay vì ô tô, vì giao thông chiếm phần lớn khí thải. Thứ hai, giảm thịt và chọn rau theo mùa. Thứ ba, phân loại rác và tái chế nhựa. Tóm lại, ngay cả thay đổi nhỏ hàng ngày cũng tạo khác biệt nếu chúng ta cùng làm.",
    bandNote: "B1: 'För det första/andra/tredje + sammanfattningsvis' = cấu trúc band 4–5.",
  },
  "s-b1-interview": {
    sv: "Tack så mycket för att jag fick komma hit idag. Jag har en kandidatexamen i datavetenskap från Stockholms universitet. De senaste tre åren har jag arbetat som backend-utvecklare på ett fintech-företag, där jag har byggt mikrotjänster i Java och Python. Jag tror att jag passar för det här jobbet eftersom jag är van vid att arbeta i agila team och trots att kraven är höga, levererar jag alltid i tid.",
    vi: "Cảm ơn đã cho tôi đến đây. Tôi có cử nhân Khoa học máy tính tại ĐH Stockholm. Ba năm qua tôi làm dev backend ở công ty fintech, xây microservices bằng Java và Python. Tôi nghĩ phù hợp vì quen làm việc agile và dù yêu cầu cao, tôi luôn giao đúng hạn.",
    bandNote: "B1: 'trots att' + 'eftersom' kết hợp — đạt Grammar B1 cao.",
  },
  "s-b1-city-country": {
    sv: "Å ena sidan är det bra att bo i en storstad eftersom man har bättre tillgång till jobb, kultur och kollektivtrafik. Men en nackdel är att hyran är dyr och luften ofta är dålig. På landsbygden däremot kan man njuta av lugn, frisk luft och billigare boende, samtidigt som man kanske känner sig isolerad utan goda kommunikationer. Personligen föredrar jag att bo i en mindre stad nära naturen, eftersom jag då får både ett aktivt liv och tystnad på kvällarna.",
    vi: "Một mặt, sống ở thành phố lớn tốt vì có nhiều việc, văn hoá, giao thông công cộng. Nhưng bất lợi là tiền thuê đắt và không khí thường xấu. Ở nông thôn, ta tận hưởng yên tĩnh, không khí trong lành, nhà rẻ, nhưng có thể thấy cô lập do giao thông kém. Cá nhân tôi thích sống ở thị trấn nhỏ gần thiên nhiên — vừa năng động vừa yên tĩnh.",
    bandNote: "B1: 'å ena sidan…däremot…samtidigt som' = liên từ tương phản band 5.",
  },
  "s-b1-online-education": {
    sv: "Jag tycker att distansundervisning har både fördelar och nackdelar. En fördel är att eleverna kan studera när och var de vill, medan en nackdel är att det sociala samspelet med klasskamrater försvinner. Dessutom kan eleverna lätt tappa motivationen om de inte har tydliga rutiner och stöd hemifrån. Därför rekommenderar jag att skolorna kombinerar fysiska och digitala lektioner, så att eleverna får både flexibilitet och gemenskap.",
    vi: "Tôi nghĩ học từ xa có cả ưu và nhược. Ưu là học sinh học mọi lúc mọi nơi, nhược là mất tương tác xã hội với bạn. Hơn nữa dễ mất động lực nếu không có lịch rõ và hỗ trợ ở nhà. Vì vậy tôi đề xuất trường kết hợp lớp trực tiếp và số — vừa linh hoạt vừa có cộng đồng.",
    bandNote: "B1: 'medan / dessutom / därför' chuỗi liên từ logic — Coherence cao.",
  },
  ...SWEDISH_SPEAKING_MODEL_ANSWERS_EXPANSION,
};

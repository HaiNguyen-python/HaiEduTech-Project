/**
 * @file swedishReadingPassages.ts
 * @description YKI Ruotsi (Swedish) Läsförståelse passages A1–B1.
 *              Each passage has a sv text, VI translation, key vocab and
 *              3–5 multiple choice / true-false / vocab-in-context questions.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishLevel } from "./swedishWritingPrompts";

export type SwedishReadingType =
  | "email"
  | "article"
  | "ad"
  | "notice"
  | "story"
  | "news"
  | "blog";

export interface SwedishReadingQuestion {
  id: string;
  kind: "mcq" | "truefalse" | "vocab";
  questionVi: string;
  questionEn: string;
  /** For MCQ/vocab: 2–4 options. For T/F: omit (use ["Sant","Falskt"] auto). */
  options?: { sv: string; vi: string }[];
  correctIndex: number;
  explanationVi: string;
}

export interface SwedishReadingPassage {
  id: string;
  level: SwedishLevel;
  type: SwedishReadingType;
  titleVi: string;
  titleEn: string;
  titleSv: string;
  contextVi: string;
  textSv: string;            // full sv-SE passage
  textVi: string;            // Vietnamese translation
  keyVocab: { sv: string; vi: string }[];
  questions: SwedishReadingQuestion[];
  estimatedMinutes: number;
}

const tf = (
  id: string,
  questionVi: string,
  questionEn: string,
  correct: 0 | 1,
  explanationVi: string,
): SwedishReadingQuestion => ({
  id,
  kind: "truefalse",
  questionVi,
  questionEn,
  options: [
    { sv: "Sant", vi: "Đúng" },
    { sv: "Falskt", vi: "Sai" },
  ],
  correctIndex: correct,
  explanationVi,
});

export const SWEDISH_READING_PASSAGES: SwedishReadingPassage[] = [
  // ═════════════════════ A1 ═════════════════════
  {
    id: "rd-a1-email",
    level: "A1",
    type: "email",
    titleVi: "Email từ bạn mới",
    titleEn: "Email from a new friend",
    titleSv: "Hej från Erik!",
    contextVi: "Bạn nhận một email từ Erik, người bạn mới gặp tại lớp tiếng Thụy Điển SFI.",
    textSv:
      "Hej!\n\nJag heter Erik och jag är trettiotvå år gammal. Jag bor i en lägenhet i Malmö med min sambo Anna och vår katt Måns. Jag arbetar som lärare på en grundskola. På fritiden tycker jag om att cykla, läsa böcker och laga thaimat.\n\nPå lördag ska jag och Anna gå på bio. Vill du följa med oss? Filmen börjar klockan sju på kvällen. Vi kan äta middag tillsammans innan, kanske på en pizzeria nära stationen.\n\nSkriv tillbaka snart!\n\nHälsningar,\nErik",
    textVi:
      "Chào!\n\nMình là Erik, 32 tuổi. Mình sống trong một căn hộ ở Malmö với bạn đời Anna và chú mèo Måns. Mình làm giáo viên ở trường tiểu học. Lúc rảnh mình thích đạp xe, đọc sách và nấu món Thái.\n\nThứ Bảy này mình và Anna sẽ đi xem phim. Bạn đi cùng nhé? Phim bắt đầu 7 giờ tối. Trước đó có thể ăn tối cùng nhau, có lẽ ở quán pizza gần ga.\n\nNhớ trả lời sớm nhé!\n\nThân,\nErik",
    keyVocab: [
      { sv: "sambo", vi: "bạn đời sống chung" },
      { sv: "grundskola", vi: "trường tiểu học" },
      { sv: "på fritiden", vi: "lúc rảnh" },
      { sv: "följa med", vi: "đi cùng" },
      { sv: "skriv tillbaka", vi: "trả lời thư" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Erik bao nhiêu tuổi?",
        questionEn: "How old is Erik?",
        options: [
          { sv: "23 år", vi: "23" },
          { sv: "30 år", vi: "30" },
          { sv: "32 år", vi: "32" },
          { sv: "42 år", vi: "42" },
        ],
        correctIndex: 2,
        explanationVi: "'Jag är trettiotvå år gammal.'",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Erik làm nghề gì?",
        questionEn: "What is Erik's job?",
        options: [
          { sv: "Läkare", vi: "Bác sĩ" },
          { sv: "Lärare", vi: "Giáo viên" },
          { sv: "Kock", vi: "Đầu bếp" },
          { sv: "Chaufför", vi: "Tài xế" },
        ],
        correctIndex: 1,
        explanationVi: "'Jag arbetar som lärare.'",
      },
      tf("q3", "Erik có nuôi chó.", "Erik has a dog.", 1, "Anh ấy nuôi mèo Måns, không phải chó."),
      tf("q4", "Phim bắt đầu lúc 7 giờ tối.", "The film starts at 7 PM.", 0, "'klockan sju på kvällen' = 19:00."),
      {
        id: "q5",
        kind: "vocab",
        questionVi: "Từ 'fritiden' nghĩa là gì?",
        questionEn: "What does 'fritiden' mean?",
        options: [
          { sv: "Arbete", vi: "Công việc" },
          { sv: "Den fria tiden", vi: "Thời gian rảnh" },
          { sv: "Skolan", vi: "Trường học" },
          { sv: "Resa", vi: "Du lịch" },
        ],
        correctIndex: 1,
        explanationVi: "'Fritid' = thời gian rảnh / nhàn rỗi.",
      },
    ],
    estimatedMinutes: 3,
  },
  {
    id: "rd-a1-ad",
    level: "A1",
    type: "ad",
    titleVi: "Quảng cáo căn hộ trên Blocket",
    titleEn: "Blocket apartment ad",
    titleSv: "Mysig tvåa uthyres i Solna",
    contextVi: "Bạn đang tìm thuê căn hộ ở Stockholm và thấy mẩu rao này trên Blocket.",
    textSv:
      "Mysig tvåa på 48 kvm uthyres i Solna, nära tunnelbanan. Lägenheten har två rum, kök, badrum med tvättmaskin och en liten balkong mot söder. Hyran är 9 500 kronor i månaden, inklusive el, värme och internet. Möblerad. Inga husdjur. Inflyttning den första juni. Kontrakt på minst sex månader. Kontakta Lisa på 070-123 45 67 eller via e-post lisa@email.se. Endast seriösa svar tack!",
    textVi:
      "Cho thuê căn 2 phòng ấm cúng 48m² ở Solna, gần tàu điện ngầm. Căn hộ có 2 phòng, bếp, phòng tắm có máy giặt và ban công nhỏ hướng nam. Tiền thuê 9.500 kronor/tháng, gồm điện, sưởi và internet. Đã có nội thất. Không cho thú cưng. Dọn vào 1/6. Hợp đồng tối thiểu 6 tháng. Liên hệ Lisa 070-123 45 67 hoặc email lisa@email.se. Chỉ nhận trả lời nghiêm túc!",
    keyVocab: [
      { sv: "uthyres", vi: "cho thuê" },
      { sv: "kvm (kvadratmeter)", vi: "mét vuông" },
      { sv: "inklusive", vi: "đã bao gồm" },
      { sv: "möblerad", vi: "có nội thất" },
      { sv: "inflyttning", vi: "ngày dọn vào" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Diện tích căn hộ?",
        questionEn: "Apartment size?",
        options: [
          { sv: "38 m²", vi: "38 m²" },
          { sv: "48 m²", vi: "48 m²" },
          { sv: "58 m²", vi: "58 m²" },
          { sv: "84 m²", vi: "84 m²" },
        ],
        correctIndex: 1,
        explanationVi: "'tvåa på 48 kvm'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Tiền thuê hàng tháng?",
        questionEn: "Monthly rent?",
        options: [
          { sv: "5 900 kr", vi: "5 900 kr" },
          { sv: "7 500 kr", vi: "7 500 kr" },
          { sv: "9 500 kr", vi: "9 500 kr" },
          { sv: "12 000 kr", vi: "12 000 kr" },
        ],
        correctIndex: 2,
        explanationVi: "'9 500 kronor i månaden'.",
      },
      tf("q3", "Tiền thuê đã gồm internet.", "Rent includes internet.", 0, "'inklusive el, värme och internet'."),
      tf("q4", "Cho phép nuôi thú cưng.", "Pets allowed.", 1, "'Inga husdjur' = không thú cưng."),
      {
        id: "q5",
        kind: "mcq",
        questionVi: "Hợp đồng tối thiểu bao lâu?",
        questionEn: "Minimum contract length?",
        options: [
          { sv: "3 månader", vi: "3 tháng" },
          { sv: "6 månader", vi: "6 tháng" },
          { sv: "12 månader", vi: "12 tháng" },
          { sv: "24 månader", vi: "24 tháng" },
        ],
        correctIndex: 1,
        explanationVi: "'Kontrakt på minst sex månader'.",
      },
    ],
    estimatedMinutes: 3,
  },
  {
    id: "rd-a1-notice",
    level: "A1",
    type: "notice",
    titleVi: "Thông báo trong toà nhà chung cư",
    titleEn: "Apartment building notice",
    titleSv: "Information till alla hyresgäster",
    contextVi: "Một mảnh giấy dán ở hành lang chung cư bạn đang sống.",
    textSv:
      "Hej grannar!\n\nNästa tisdag den 12 mars mellan klockan 09:00 och 14:00 kommer vi att stänga av vattnet i hela huset. Detta beror på underhåll av rören. Vi ber er att fylla på vatten i förväg och inte använda diskmaskinen under tiden.\n\nOm ni har frågor, ring fastighetsskötaren på 08-123 456.\n\nTack för er förståelse!\nFastighetsbolaget",
    textVi:
      "Chào hàng xóm!\n\nThứ Ba tới 12/3, từ 9h đến 14h, chúng tôi sẽ ngắt nước toàn toà nhà do bảo trì đường ống. Đề nghị quý vị trữ nước trước và không dùng máy rửa bát trong thời gian này.\n\nNếu có câu hỏi, gọi nhân viên kỹ thuật toà nhà số 08-123 456.\n\nCảm ơn sự thông cảm!\nCông ty quản lý",
    keyVocab: [
      { sv: "hyresgäster", vi: "người thuê nhà" },
      { sv: "stänga av vattnet", vi: "ngắt nước" },
      { sv: "underhåll", vi: "bảo trì" },
      { sv: "rören", vi: "các đường ống" },
      { sv: "fastighetsskötare", vi: "kỹ thuật viên toà nhà" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Ngày nào bị ngắt nước?",
        questionEn: "Which day no water?",
        options: [
          { sv: "11/3", vi: "11/3" },
          { sv: "12/3", vi: "12/3" },
          { sv: "13/3", vi: "13/3" },
          { sv: "14/3", vi: "14/3" },
        ],
        correctIndex: 1,
        explanationVi: "'tisdag den 12 mars'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Khung giờ ngắt nước?",
        questionEn: "Time window?",
        options: [
          { sv: "08–13", vi: "08–13" },
          { sv: "09–14", vi: "09–14" },
          { sv: "10–15", vi: "10–15" },
          { sv: "12–17", vi: "12–17" },
        ],
        correctIndex: 1,
        explanationVi: "'09:00 och 14:00'.",
      },
      tf("q3", "Có thể dùng máy rửa bát trong thời gian này.", "Dishwasher allowed during.", 1, "Không nên — 'inte använda diskmaskinen'."),
    ],
    estimatedMinutes: 2,
  },

  // ═════════════════════ A2 ═════════════════════
  {
    id: "rd-a2-blog",
    level: "A2",
    type: "blog",
    titleVi: "Blog: Năm đầu ở Thụy Điển",
    titleEn: "Blog: My first year in Sweden",
    titleSv: "Mitt första år i Sverige",
    contextVi: "Linh, sinh viên Việt Nam tại Lund, viết blog về năm đầu sống tại Thụy Điển.",
    textSv:
      "När jag flyttade till Sverige förra hösten var allt nytt och annorlunda. Vädret var det första som överraskade mig. I oktober blev det redan mörkt klockan fyra på eftermiddagen, och i december snöade det nästan varje dag. Jag hade aldrig sett så mycket snö i hela mitt liv!\n\nDet svåraste i början var att förstå hur svenskar tänker. De pratar inte mycket i bussen eller på tunnelbanan, och de står alltid på avstånd från varandra. Först trodde jag att de var oartiga, men sedan förstod jag att det är ett sätt att respektera andras integritet.\n\nDet bästa med Sverige är fika. Varje dag på jobbet stannar vi i en halvtimme för kaffe och bullar. Det är då jag lär känna mina kollegor på riktigt. Nu efter ett år känner jag mig nästan som hemma, även om jag fortfarande saknar vietnamesisk mat och min familj.",
    textVi:
      "Khi tôi chuyển đến Thụy Điển mùa thu năm ngoái, mọi thứ đều mới lạ. Thời tiết là điều khiến tôi ngạc nhiên đầu tiên. Tháng 10 đã tối lúc 4 giờ chiều, và tháng 12 gần như ngày nào cũng có tuyết. Tôi chưa từng thấy nhiều tuyết như vậy trong đời!\n\nKhó khăn lớn nhất ban đầu là hiểu cách người Thụy Điển suy nghĩ. Họ ít nói trên xe bus hay tàu điện, và luôn giữ khoảng cách với người khác. Ban đầu tôi tưởng họ thô lỗ, nhưng sau hiểu đó là cách tôn trọng sự riêng tư.\n\nĐiều tuyệt nhất ở Thụy Điển là fika. Mỗi ngày ở công ty chúng tôi nghỉ nửa tiếng uống cà phê ăn bánh. Đó là lúc tôi thực sự hiểu đồng nghiệp. Sau một năm tôi gần như thấy như ở nhà, dù vẫn nhớ món Việt và gia đình.",
    keyVocab: [
      { sv: "annorlunda", vi: "khác biệt" },
      { sv: "överraskade", vi: "khiến ngạc nhiên" },
      { sv: "på avstånd", vi: "ở khoảng cách" },
      { sv: "integritet", vi: "sự riêng tư" },
      { sv: "saknar", vi: "nhớ / thiếu" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Điều gì khiến Linh ngạc nhiên đầu tiên?",
        questionEn: "First surprise?",
        options: [
          { sv: "Maten", vi: "Đồ ăn" },
          { sv: "Vädret", vi: "Thời tiết" },
          { sv: "Människorna", vi: "Con người" },
          { sv: "Språket", vi: "Ngôn ngữ" },
        ],
        correctIndex: 1,
        explanationVi: "'Vädret var det första som överraskade mig.'",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Tháng 10, trời tối lúc mấy giờ?",
        questionEn: "Sunset in October?",
        options: [
          { sv: "02:00", vi: "2h" },
          { sv: "16:00", vi: "16h" },
          { sv: "18:00", vi: "18h" },
          { sv: "20:00", vi: "20h" },
        ],
        correctIndex: 1,
        explanationVi: "'mörkt klockan fyra på eftermiddagen' = 16:00.",
      },
      tf("q3", "Linh nghĩ người Thụy Điển thô lỗ ngay từ đầu nhưng sau hiểu họ tôn trọng sự riêng tư.", "Linh first thought Swedes were rude but later understood.", 0, "Đúng — 'Först trodde jag att de var oartiga, men sedan förstod jag…'."),
      tf("q4", "Linh không thích fika.", "Linh dislikes fika.", 1, "'Det bästa med Sverige är fika.'"),
      {
        id: "q5",
        kind: "vocab",
        questionVi: "'integritet' trong văn cảnh này nghĩa là?",
        questionEn: "'integritet' here means?",
        options: [
          { sv: "Ärlighet", vi: "Sự trung thực" },
          { sv: "Personlig sfär", vi: "Không gian cá nhân / riêng tư" },
          { sv: "Politik", vi: "Chính trị" },
          { sv: "Arbete", vi: "Công việc" },
        ],
        correctIndex: 1,
        explanationVi: "Trong tiếng Thụy Điển 'integritet' thường = privacy / không gian riêng.",
      },
    ],
    estimatedMinutes: 5,
  },
  {
    id: "rd-a2-article",
    level: "A2",
    type: "article",
    titleVi: "Bài báo: Fika — văn hoá Thụy Điển",
    titleEn: "Article: Fika — Swedish culture",
    titleSv: "Fika — mer än bara kaffe",
    contextVi: "Bài báo trên SVT giải thích phong tục fika cho người nước ngoài.",
    textSv:
      "Fika är ett unikt svenskt begrepp som inte har någon direkt motsvarighet på andra språk. Det är mer än bara att dricka kaffe — det är en social paus där man tar sig tid att prata med kollegor, vänner eller familj. Många svenska företag har fika två gånger om dagen, en gång på förmiddagen och en gång på eftermiddagen.\n\nTill fika hör oftast kaffe eller te, samt något sött som en kanelbulle, en kaka eller en bit kaka. På fredagar är det vanligt med fredagsfika, då man tar något extra gott som tårta. Forskning visar att korta pauser med kollegor faktiskt gör människor mer produktiva, så fika är inte slöseri med tid — tvärtom.\n\nFör många nya svenskar är fika ett bra sätt att lära känna kollegor och bygga relationer. Glöm bara inte att vänta tills alla har fått sin kopp innan du börjar dricka — det är god svensk fikaetikett.",
    textVi:
      "Fika là khái niệm độc đáo của Thụy Điển, không có tương đương trực tiếp ở ngôn ngữ khác. Nó không chỉ là uống cà phê — đó là khoảng nghỉ xã hội, dành thời gian trò chuyện với đồng nghiệp, bạn, gia đình. Nhiều công ty Thụy Điển có fika 2 lần/ngày: sáng và chiều.\n\nFika thường có cà phê hoặc trà cùng đồ ngọt như bánh quế, bánh quy hoặc một miếng bánh. Thứ Sáu thường có 'fredagsfika' với bánh kem đặc biệt. Nghiên cứu cho thấy nghỉ ngắn với đồng nghiệp thực sự giúp năng suất tốt hơn, nên fika không phải lãng phí thời gian — trái lại.\n\nVới nhiều người mới đến, fika là cách hay để hiểu đồng nghiệp và xây quan hệ. Chỉ nhớ đợi mọi người có cốc trước khi bắt đầu uống — đó là phép lịch sự fika Thụy Điển.",
    keyVocab: [
      { sv: "begrepp", vi: "khái niệm" },
      { sv: "motsvarighet", vi: "sự tương đương" },
      { sv: "produktiva", vi: "năng suất" },
      { sv: "slöseri med tid", vi: "lãng phí thời gian" },
      { sv: "etikett", vi: "phép lịch sự" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Nhiều công ty Thụy Điển có fika mấy lần/ngày?",
        questionEn: "Fika per day at companies?",
        options: [
          { sv: "1 gång", vi: "1" },
          { sv: "2 gånger", vi: "2" },
          { sv: "3 gånger", vi: "3" },
          { sv: "Aldrig", vi: "Không bao giờ" },
        ],
        correctIndex: 1,
        explanationVi: "'två gånger om dagen'.",
      },
      tf("q2", "Fika luôn phải dùng cà phê đen, không gì khác.", "Fika must always be black coffee.", 1, "Có thể là trà + đồ ngọt."),
      tf("q3", "Nghiên cứu cho thấy fika làm giảm năng suất.", "Research shows fika lowers productivity.", 1, "Ngược lại — 'gör människor mer produktiva'."),
      {
        id: "q4",
        kind: "mcq",
        questionVi: "Phép lịch sự fika là gì?",
        questionEn: "Fika etiquette is?",
        options: [
          { sv: "Dricka först", vi: "Uống trước" },
          { sv: "Vänta tills alla har fått sin kopp", vi: "Đợi mọi người có cốc" },
          { sv: "Inte prata", vi: "Không nói chuyện" },
          { sv: "Stå upp", vi: "Đứng" },
        ],
        correctIndex: 1,
        explanationVi: "Câu cuối nêu rõ.",
      },
      {
        id: "q5",
        kind: "vocab",
        questionVi: "'tvärtom' nghĩa là?",
        questionEn: "'tvärtom' means?",
        options: [
          { sv: "Likadant", vi: "Giống vậy" },
          { sv: "Tvärtom (motsatsen)", vi: "Trái lại / ngược lại" },
          { sv: "Snart", vi: "Sớm" },
          { sv: "Aldrig", vi: "Không bao giờ" },
        ],
        correctIndex: 1,
        explanationVi: "'tvärtom' = on the contrary.",
      },
    ],
    estimatedMinutes: 5,
  },

  // ═════════════════════ B1 ═════════════════════
  {
    id: "rd-b1-news",
    level: "B1",
    type: "news",
    titleVi: "Bản tin: Stockholm cấm xe xăng năm 2030",
    titleEn: "News: Stockholm bans petrol cars by 2030",
    titleSv: "Stockholm planerar att förbjuda bensinbilar år 2030",
    contextVi: "Bài báo trên Dagens Nyheter (DN) về kế hoạch khí hậu của Stockholm.",
    textSv:
      "Stockholms stad har presenterat ett ambitiöst förslag som innebär att alla bensin- och dieselbilar förbjuds i innerstaden från och med år 2030. Förslaget syftar till att minska luftföroreningarna och klimatgaserna med upp till sextio procent inom tio år.\n\nMiljöborgarrådet, Klara Lindh, säger att åtgärden är nödvändig för att Stockholm ska kunna nå sina klimatmål. \"Vi måste våga ta steget, även om det innebär stora förändringar i vardagen för många människor,\" förklarar hon.\n\nKritikerna hävdar dock att förbudet kommer att drabba låginkomsttagare hårdast, eftersom det är de som har svårast att byta till elbilar. Dessutom är kollektivtrafiken i ytterstaden fortfarande otillräcklig. Lindh svarar att staden samtidigt kommer att investera fyra miljarder kronor i nya tunnelbanelinjer och billigare elbilssubventioner för dem som behöver mest.\n\nFörslaget ska röstas igenom i kommunfullmäktige nästa månad. Om det går igenom kommer Stockholm att bli en av de första huvudstäderna i Europa med ett totalförbud mot fossilbilar i centrum.",
    textVi:
      "Thành phố Stockholm vừa trình bày một đề xuất tham vọng: cấm toàn bộ xe xăng và dầu trong nội thành từ năm 2030. Đề xuất nhằm giảm ô nhiễm không khí và khí thải nhà kính tới 60% trong 10 năm.\n\nUỷ viên môi trường Klara Lindh cho rằng biện pháp này cần thiết để Stockholm đạt mục tiêu khí hậu. 'Chúng ta phải dám hành động, dù điều này thay đổi lớn cuộc sống nhiều người.'\n\nGiới phê bình cho rằng lệnh cấm sẽ ảnh hưởng nặng nhất tới người thu nhập thấp vì họ khó đổi sang xe điện. Hơn nữa, giao thông công cộng ở ngoại ô vẫn chưa đủ. Lindh đáp rằng thành phố sẽ đồng thời đầu tư 4 tỷ kronor cho tuyến metro mới và trợ cấp xe điện rẻ hơn cho người cần nhất.\n\nĐề xuất sẽ được biểu quyết tại hội đồng thành phố tháng tới. Nếu thông qua, Stockholm sẽ là một trong những thủ đô châu Âu đầu tiên cấm hoàn toàn xe nhiên liệu hoá thạch ở trung tâm.",
    keyVocab: [
      { sv: "förbjuda", vi: "cấm" },
      { sv: "luftföroreningar", vi: "ô nhiễm không khí" },
      { sv: "klimatgaser", vi: "khí thải nhà kính" },
      { sv: "låginkomsttagare", vi: "người thu nhập thấp" },
      { sv: "subventioner", vi: "trợ cấp" },
      { sv: "kommunfullmäktige", vi: "hội đồng thành phố" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Lệnh cấm bắt đầu từ năm nào?",
        questionEn: "Ban starts which year?",
        options: [
          { sv: "2025", vi: "2025" },
          { sv: "2028", vi: "2028" },
          { sv: "2030", vi: "2030" },
          { sv: "2040", vi: "2040" },
        ],
        correctIndex: 2,
        explanationVi: "'från och med år 2030'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Mục tiêu giảm khí thải bao nhiêu %?",
        questionEn: "Emission cut target?",
        options: [
          { sv: "30 %", vi: "30%" },
          { sv: "45 %", vi: "45%" },
          { sv: "60 %", vi: "60%" },
          { sv: "80 %", vi: "80%" },
        ],
        correctIndex: 2,
        explanationVi: "'upp till sextio procent'.",
      },
      tf("q3", "Người thu nhập thấp được giới phê bình cho là sẽ bị ảnh hưởng nặng nhất.", "Critics say low-income hit hardest.", 0, "Đúng theo bài."),
      tf("q4", "Thành phố sẽ đầu tư 2 tỷ kronor vào tàu điện ngầm.", "City invests 2 billion in metro.", 1, "'fyra miljarder kronor' = 4 tỷ."),
      {
        id: "q5",
        kind: "mcq",
        questionVi: "Đề xuất sẽ được quyết định ở đâu?",
        questionEn: "Where decided?",
        options: [
          { sv: "Riksdagen", vi: "Quốc hội" },
          { sv: "Kommunfullmäktige", vi: "Hội đồng thành phố" },
          { sv: "EU-parlamentet", vi: "Nghị viện EU" },
          { sv: "Folkomröstning", vi: "Trưng cầu dân ý" },
        ],
        correctIndex: 1,
        explanationVi: "'röstas igenom i kommunfullmäktige'.",
      },
      {
        id: "q6",
        kind: "vocab",
        questionVi: "'hävdar' nghĩa là?",
        questionEn: "'hävdar' means?",
        options: [
          { sv: "Säger på ett bestämt sätt", vi: "Khẳng định / lập luận" },
          { sv: "Glömmer", vi: "Quên" },
          { sv: "Lyssnar", vi: "Nghe" },
          { sv: "Köper", vi: "Mua" },
        ],
        correctIndex: 0,
        explanationVi: "'hävda' = claim / assert.",
      },
    ],
    estimatedMinutes: 7,
  },
  {
    id: "rd-b1-story",
    level: "B1",
    type: "story",
    titleVi: "Truyện ngắn: Đêm hè Bắc Cực",
    titleEn: "Short story: An Arctic summer night",
    titleSv: "Midnattssolen i Kiruna",
    contextVi: "Một truyện ngắn về trải nghiệm 'midnattssolen' (mặt trời lúc nửa đêm) ở vùng Lapland.",
    textSv:
      "Det var min första sommar i Kiruna, längst upp i norra Sverige. Klockan var elva på kvällen och solen stod fortfarande högt på himlen. Jag satt vid en sjö med min farmor och drack te.\n\n\"När jag var liten,\" sa farmor leende, \"trodde jag att solen aldrig skulle gå ner. Min mor brukade säga att vi måste sova ändå, annars skulle vi bli trötta nästa dag.\"\n\nJag förstod henne nu. Det var konstigt att gå och lägga sig när det var ljust ute. Men det fanns något magiskt med tystnaden — bara fågelsången och vinden i björkarna. Inga bilar, inga människor, bara naturen.\n\nFarmor pekade på vattnet. \"Titta, en älg!\" viskade hon. På andra sidan sjön stod en stor älg och drack. Vi satt helt tysta tills den försvann in i skogen igen.\n\nDen natten förstod jag varför min familj alltid kommit hit på somrarna. Det var inte bara semester — det var ett sätt att andas, att stanna upp och känna att man levde.",
    textVi:
      "Đó là mùa hè đầu tiên của tôi ở Kiruna, cực bắc Thụy Điển. Đã 11 giờ tối mà mặt trời vẫn cao trên bầu trời. Tôi ngồi bên hồ với bà nội, uống trà.\n\n'Hồi nhỏ,' bà cười nói, 'tôi tưởng mặt trời sẽ không bao giờ lặn. Mẹ tôi thường bảo phải đi ngủ dù vậy, không thì mai sẽ mệt.'\n\nGiờ tôi hiểu bà. Lạ lùng khi đi ngủ lúc bên ngoài còn sáng. Nhưng có điều gì kỳ diệu ở sự yên tĩnh — chỉ tiếng chim và gió trong rặng bạch dương. Không xe cộ, không người, chỉ thiên nhiên.\n\nBà chỉ tay xuống nước. 'Nhìn kìa, một con nai sừng tấm!' bà thì thầm. Bên kia hồ có một con älg lớn đang uống nước. Chúng tôi ngồi im đến khi nó biến vào rừng.\n\nĐêm đó tôi hiểu vì sao gia đình tôi luôn lên đây mỗi hè. Đó không chỉ là kỳ nghỉ — đó là cách hít thở, dừng lại và cảm thấy mình đang sống.",
    keyVocab: [
      { sv: "midnattssol", vi: "mặt trời lúc nửa đêm" },
      { sv: "viskade", vi: "thì thầm" },
      { sv: "älg", vi: "nai sừng tấm" },
      { sv: "björkar", vi: "cây bạch dương" },
      { sv: "stanna upp", vi: "dừng lại" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Câu chuyện diễn ra ở đâu?",
        questionEn: "Where?",
        options: [
          { sv: "Stockholm", vi: "Stockholm" },
          { sv: "Göteborg", vi: "Göteborg" },
          { sv: "Kiruna", vi: "Kiruna" },
          { sv: "Malmö", vi: "Malmö" },
        ],
        correctIndex: 2,
        explanationVi: "'min första sommar i Kiruna'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Mấy giờ mặt trời vẫn cao?",
        questionEn: "Sun still high at?",
        options: [
          { sv: "20:00", vi: "20h" },
          { sv: "22:00", vi: "22h" },
          { sv: "23:00", vi: "23h" },
          { sv: "01:00", vi: "1h sáng" },
        ],
        correctIndex: 2,
        explanationVi: "'Klockan var elva på kvällen' = 23h.",
      },
      tf("q3", "Người kể nhìn thấy một con älg uống nước bên hồ.", "Narrator saw an älg drinking by the lake.", 0, "Đúng — bà chỉ tay và thấy älg."),
      tf("q4", "Bà nội không thích yên tĩnh của thiên nhiên.", "Grandma dislikes quiet.", 1, "Ngược lại — cả hai tận hưởng."),
      {
        id: "q5",
        kind: "vocab",
        questionVi: "'stanna upp' trong văn cảnh này nghĩa là?",
        questionEn: "'stanna upp' here?",
        options: [
          { sv: "Springa fort", vi: "Chạy nhanh" },
          { sv: "Pausa och reflektera", vi: "Dừng lại và suy ngẫm" },
          { sv: "Resa hem", vi: "Về nhà" },
          { sv: "Ringa någon", vi: "Gọi điện" },
        ],
        correctIndex: 1,
        explanationVi: "'stanna upp' = pause and reflect.",
      },
      {
        id: "q6",
        kind: "mcq",
        questionVi: "Thông điệp chính của câu chuyện?",
        questionEn: "Main message?",
        options: [
          { sv: "Naturen i norr ger en känsla av att leva", vi: "Thiên nhiên miền bắc mang cảm giác đang sống" },
          { sv: "Det är farligt att åka till Kiruna", vi: "Đến Kiruna là nguy hiểm" },
          { sv: "Älgar är aggressiva djur", vi: "Älg là thú dữ" },
          { sv: "Solen går aldrig ner någonstans", vi: "Mặt trời không bao giờ lặn ở đâu cả" },
        ],
        correctIndex: 0,
        explanationVi: "Câu kết: 'ett sätt att andas… känna att man levde'.",
      },
    ],
    estimatedMinutes: 7,
  },
  // ═════════════════════ A2 extra v2 ═════════════════════
  {
    id: "rd-a2-recipe",
    level: "A2",
    type: "blog",
    titleVi: "Công thức bánh quế Thụy Điển",
    titleEn: "Swedish cinnamon-bun recipe",
    titleSv: "Klassiska kanelbullar — så lyckas du varje gång",
    contextVi: "Bài blog ngắn hướng dẫn làm bánh quế truyền thống, dùng tại Fika.",
    textSv:
      "Kanelbullar är kanske Sveriges mest älskade bakverk. Du behöver fem deciliter mjölk, hundra gram smör, en jäst, sju deciliter mjöl, lite socker och salt. Till fyllningen behöver du mjukt smör, socker och mycket kanel.\n\nFörst värmer du mjölken till trettiosju grader och smular ner jästen. Blanda sedan med smör, mjöl, socker och salt. Knåda degen i tio minuter och låt den jäsa under en ren handduk i fyrtio minuter.\n\nKavla ut degen till en stor rektangel. Bred på fyllningen, rulla ihop och skär i tjugofyra bitar. Lägg bullarna i pappersformar och låt jäsa i trettio minuter till. Pensla med uppvispat ägg och strö pärlsocker över. Grädda i ugn på tvåhundratjugofem grader i åtta till tio minuter.\n\nServera ljumma med kaffe — då blir det en riktig svensk fika.",
    textVi:
      "Kanelbullar có lẽ là loại bánh được yêu thích nhất ở Thụy Điển. Bạn cần 5 dl sữa, 100 g bơ, 1 gói men, 7 dl bột, ít đường và muối. Phần nhân cần bơ mềm, đường và nhiều bột quế.\n\nTrước tiên đun sữa đến 37°C rồi bóp men vào. Trộn cùng bơ, bột, đường và muối. Nhồi bột 10 phút và để bột nở dưới khăn sạch 40 phút.\n\nCán bột thành hình chữ nhật lớn. Phết nhân lên, cuộn lại và cắt thành 24 miếng. Đặt vào khuôn giấy và để nở thêm 30 phút. Quét trứng đánh và rắc đường hạt. Nướng 225°C trong 8–10 phút.\n\nDùng nóng cùng cà phê — đó mới là fika Thụy Điển chuẩn vị.",
    keyVocab: [
      { sv: "bakverk", vi: "đồ nướng" },
      { sv: "deciliter", vi: "100 ml" },
      { sv: "jäsa", vi: "ủ / nở" },
      { sv: "kavla ut", vi: "cán mỏng" },
      { sv: "grädda", vi: "nướng" },
      { sv: "pärlsocker", vi: "đường hạt to" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Cần bao nhiêu sữa?",
        questionEn: "How much milk is needed?",
        options: [
          { sv: "3 dl", vi: "3 dl" },
          { sv: "5 dl", vi: "5 dl" },
          { sv: "7 dl", vi: "7 dl" },
          { sv: "10 dl", vi: "10 dl" },
        ],
        correctIndex: 1,
        explanationVi: "'fem deciliter mjölk' = 5 dl.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Nhiệt độ làm ấm sữa?",
        questionEn: "Temperature to warm the milk?",
        options: [
          { sv: "25°C", vi: "25°C" },
          { sv: "37°C", vi: "37°C" },
          { sv: "50°C", vi: "50°C" },
          { sv: "100°C", vi: "100°C" },
        ],
        correctIndex: 1,
        explanationVi: "'värmer du mjölken till trettiosju grader' = 37°C.",
      },
      tf("q3", "Bột nở lần đầu trong 60 phút.", "First proofing is 60 minutes.", 1, "Bài nói 40 phút, không phải 60."),
      tf("q4", "Cắt thành 24 miếng.", "Cut into 24 pieces.", 0, "'skär i tjugofyra bitar' = 24."),
      {
        id: "q5",
        kind: "vocab",
        questionVi: "Từ 'grädda' nghĩa là?",
        questionEn: "Meaning of 'grädda'?",
        options: [
          { sv: "Att vispa", vi: "Đánh trộn" },
          { sv: "Att baka i ugn", vi: "Nướng trong lò" },
          { sv: "Att frysa", vi: "Đông lạnh" },
          { sv: "Att stek på spis", vi: "Áp chảo" },
        ],
        correctIndex: 1,
        explanationVi: "'grädda' = nướng trong lò ovn.",
      },
    ],
    estimatedMinutes: 5,
  },
  // ═════════════════════ B1 extra v2 ═════════════════════
  {
    id: "rd-b1-fika-culture",
    level: "B1",
    type: "article",
    titleVi: "Fika — văn hoá cà phê Thụy Điển",
    titleEn: "Fika — Swedish coffee culture",
    titleSv: "Fika — mer än bara kaffe",
    contextVi: "Bài báo văn hoá giải thích vì sao 'fika' lại quan trọng với người Thụy Điển.",
    textSv:
      "För många utlänningar låter ordet 'fika' bara som en kaffepaus, men för svenskar är det mycket mer än så. Fika är ett socialt ritual som binder ihop arbetslivet, vänskap och familjeliv. På de flesta arbetsplatser tar kollegorna en gemensam paus klockan tio och igen klockan tre. Då dricker man kaffe eller te, äter en kanelbulle eller en kaka och pratar om allt utom jobbet.\n\nForskning från Lunds universitet visar att regelbundna fika-pauser ökar både trivseln och produktiviteten på kontoret. När människor sätter sig ner tillsammans utan dator och telefon skapas en lugn miljö där nya idéer kan växa fram. Många chefer säger att de bästa besluten fattas vid fika-bordet, inte i mötesrummet.\n\nDet finns också en social sida som inte alltid är synlig. Den som aldrig är med på fikat kan snabbt bli betraktad som distanserad eller stressad. Att tacka nej till fika kan därför skapa frågor: 'Är allt bra?' eller 'Har du för mycket att göra?'.\n\nMen fika handlar inte bara om jobbet. Familjer fikar tillsammans på söndagar med ljus och hembakade kakor. Pensionärer träffas på stadens café för att läsa tidningen. Studenter pluggar med en stor kopp kaffe framför sig. Fika är, kort sagt, ett sätt att markera att livet inte bara handlar om att producera — utan också om att vara närvarande.",
    textVi:
      "Với nhiều người nước ngoài, từ 'fika' nghe như chỉ là giờ nghỉ uống cà phê, nhưng với người Thụy Điển nó nhiều hơn thế. Fika là một nghi thức xã hội gắn kết công việc, tình bạn và gia đình. Hầu hết công sở đều có giờ fika chung lúc 10 giờ và 15 giờ. Khi ấy người ta uống cà phê hoặc trà, ăn một chiếc kanelbulle hoặc bánh ngọt, và nói về mọi thứ trừ công việc.\n\nNghiên cứu của Đại học Lund cho thấy giờ fika đều đặn tăng sự hài lòng và năng suất ở văn phòng. Khi mọi người ngồi xuống cùng nhau không máy tính, không điện thoại, một không gian yên tĩnh được tạo ra để ý tưởng nảy sinh. Nhiều sếp nói quyết định tốt nhất được đưa ra tại bàn fika, không phải phòng họp.\n\nCó một mặt xã hội không phải lúc nào cũng thấy. Người không bao giờ tham gia fika dễ bị xem là xa cách hoặc căng thẳng. Từ chối fika có thể khơi ra câu hỏi: 'Mọi việc ổn chứ?' hay 'Cậu đang quá tải à?'.\n\nNhưng fika không chỉ là công việc. Các gia đình fika cùng nhau Chủ nhật với nến và bánh tự nướng. Người về hưu gặp nhau ở quán để đọc báo. Sinh viên ôn bài bên ly cà phê lớn. Tóm lại, fika là cách đánh dấu rằng cuộc sống không chỉ là sản xuất — mà còn là hiện diện.",
    keyVocab: [
      { sv: "ritual", vi: "nghi thức" },
      { sv: "binda ihop", vi: "gắn kết" },
      { sv: "trivsel", vi: "sự hài lòng" },
      { sv: "fatta beslut", vi: "đưa ra quyết định" },
      { sv: "betrakta som", vi: "bị coi là" },
      { sv: "närvarande", vi: "hiện diện" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Fika thường diễn ra khi nào ở nơi làm việc?",
        questionEn: "When does workplace fika usually happen?",
        options: [
          { sv: "Endast på morgonen", vi: "Chỉ buổi sáng" },
          { sv: "Klockan 10 och 15", vi: "10h và 15h" },
          { sv: "Bara vid lunch", vi: "Chỉ giờ trưa" },
          { sv: "Efter klockan 18", vi: "Sau 18h" },
        ],
        correctIndex: 1,
        explanationVi: "'gemensam paus klockan tio och igen klockan tre'.",
      },
      tf("q2", "Đại học Lund tìm thấy fika làm giảm năng suất.", "Lund found fika reduces productivity.", 1, "Ngược lại: tăng trivsel và produktivitet."),
      {
        id: "q3",
        kind: "mcq",
        questionVi: "Hệ quả nếu thường từ chối fika ở công sở?",
        questionEn: "Consequence of often skipping fika?",
        options: [
          { sv: "Man får mer lön", vi: "Được tăng lương" },
          { sv: "Man kan ses som distanserad", vi: "Bị xem là xa cách" },
          { sv: "Man måste betala böter", vi: "Bị phạt tiền" },
          { sv: "Man får byta jobb", vi: "Phải đổi việc" },
        ],
        correctIndex: 1,
        explanationVi: "'kan snabbt bli betraktad som distanserad eller stressad'.",
      },
      tf("q4", "Sinh viên cũng dùng fika để ôn bài.", "Students also fika while studying.", 0, "'Studenter pluggar med en stor kopp kaffe'."),
      {
        id: "q5",
        kind: "vocab",
        questionVi: "Từ 'fatta beslut' nghĩa là?",
        questionEn: "Meaning of 'fatta beslut'?",
        options: [
          { sv: "Att glömma", vi: "Quên" },
          { sv: "Att ta beslut", vi: "Đưa ra quyết định" },
          { sv: "Att förlora", vi: "Mất" },
          { sv: "Att hitta", vi: "Tìm thấy" },
        ],
        correctIndex: 1,
        explanationVi: "'fatta beslut' = 'ta beslut' = đưa ra quyết định.",
      },
      {
        id: "q6",
        kind: "mcq",
        questionVi: "Thông điệp chính của bài?",
        questionEn: "Main idea of the article?",
        options: [
          { sv: "Fika är skadligt för arbetslivet", vi: "Fika có hại cho công việc" },
          { sv: "Fika är ett sätt att vara närvarande, inte bara producera", vi: "Fika là cách để hiện diện, không chỉ sản xuất" },
          { sv: "Bara studenter dricker fika", vi: "Chỉ sinh viên dùng fika" },
          { sv: "Fika är ett finansiellt problem", vi: "Fika là vấn đề tài chính" },
        ],
        correctIndex: 1,
        explanationVi: "Câu kết: 'ett sätt att markera att livet… också om att vara närvarande'.",
      },
    ],
    estimatedMinutes: 8,
  },
  // ═════════════════════ A1 extra v3 ═════════════════════
  {
    id: "rd-a1-bus-schedule",
    level: "A1",
    type: "notice",
    titleVi: "Lịch xe buýt mới",
    titleEn: "New bus schedule notice",
    titleSv: "Nya tider för buss 4",
    contextVi: "Thông báo dán ở bến xe buýt số 4 ở Uppsala.",
    textSv:
      "Hej resenär! Från och med den första september ändrar vi tiderna för buss nummer fyra. På vardagar går bussen var tionde minut mellan klockan sex på morgonen och nio på kvällen. På helger går bussen var tjugonde minut mellan klockan åtta och tjugotre. Nattbussen går klockan tjugotre, ett och tre. Tack för att du reser med oss!",
    textVi:
      "Chào hành khách! Từ ngày 1 tháng 9 chúng tôi đổi giờ xe buýt số 4. Ngày thường xe chạy 10 phút/chuyến từ 6h sáng đến 9h tối. Cuối tuần chạy 20 phút/chuyến từ 8h đến 23h. Xe buýt đêm chạy lúc 23h, 1h và 3h. Cảm ơn bạn đã đi cùng chúng tôi!",
    keyVocab: [
      { sv: "från och med", vi: "kể từ" },
      { sv: "vardagar", vi: "ngày thường" },
      { sv: "var tionde minut", vi: "10 phút/chuyến" },
      { sv: "nattbuss", vi: "xe buýt đêm" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Đổi lịch từ ngày nào?",
        questionEn: "From which date?",
        options: [
          { sv: "1 augusti", vi: "1 tháng 8" },
          { sv: "1 september", vi: "1 tháng 9" },
          { sv: "1 oktober", vi: "1 tháng 10" },
          { sv: "1 november", vi: "1 tháng 11" },
        ],
        correctIndex: 1,
        explanationVi: "'från och med den första september'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Ngày thường xe chạy bao lâu/chuyến?",
        questionEn: "Weekday frequency?",
        options: [
          { sv: "Var 5:e minut", vi: "5 phút" },
          { sv: "Var 10:e minut", vi: "10 phút" },
          { sv: "Var 20:e minut", vi: "20 phút" },
          { sv: "Var 30:e minut", vi: "30 phút" },
        ],
        correctIndex: 1,
        explanationVi: "'var tionde minut' = 10 phút.",
      },
      tf("q3", "Xe buýt đêm chạy lúc 2h.", "Night bus runs at 2 AM.", 1, "Lịch nói 23h, 1h và 3h."),
      tf("q4", "Cuối tuần xe chạy 20 phút/chuyến.", "Weekend buses run every 20 minutes.", 0, "'var tjugonde minut'."),
    ],
    estimatedMinutes: 3,
  },
  // ═════════════════════ A2 extra v3 ═════════════════════
  {
    id: "rd-a2-blocket-couch",
    level: "A2",
    type: "ad",
    titleVi: "Rao bán ghế sofa Ikea trên Blocket",
    titleEn: "Blocket ad: Ikea sofa for sale",
    titleSv: "Säljes: Ikea Kivik 3-sits, ljusgrå",
    contextVi: "Rao trên Blocket khu Södermalm, Stockholm.",
    textSv:
      "Vi säljer vår fina Ikea Kivik 3-sitssoffa i ljusgrått tyg. Köpt för två år sedan och i mycket bra skick — inga fläckar, inga rivor. Längd tvåhundratio centimeter, sittdjup nittiofem centimeter. Anledning till försäljning är att vi flyttar till en mindre lägenhet och soffan inte får plats. Nypris fyratusen kronor, säljes för tusenfemhundra. Hämtas på Södermalm med egen bil eller transport — vi hjälper gärna bära ner till porten. Endast kontant eller Swish. Vid intresse, skicka ett meddelande via Blocket så svarar jag inom samma dag.",
    textVi:
      "Bán sofa Ikea Kivik 3 chỗ vải xám nhạt rất đẹp. Mua 2 năm trước, tình trạng rất tốt — không vết bẩn, không rách. Dài 210 cm, sâu chỗ ngồi 95 cm. Lý do bán: chuyển sang căn hộ nhỏ hơn, không vừa. Giá gốc 4 000 kr, bán 1 500 kr. Tự đến lấy ở Södermalm — chúng tôi giúp khiêng xuống cổng. Chỉ tiền mặt hoặc Swish. Quan tâm thì nhắn qua Blocket, trả lời trong ngày.",
    keyVocab: [
      { sv: "i bra skick", vi: "tình trạng tốt" },
      { sv: "fläckar", vi: "vết bẩn" },
      { sv: "nypris", vi: "giá gốc" },
      { sv: "hämtas", vi: "tự đến lấy" },
      { sv: "Swish", vi: "ứng dụng chuyển tiền" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Giá bán hiện tại?",
        questionEn: "Current selling price?",
        options: [
          { sv: "500 kr", vi: "500 kr" },
          { sv: "1 500 kr", vi: "1 500 kr" },
          { sv: "4 000 kr", vi: "4 000 kr" },
          { sv: "10 000 kr", vi: "10 000 kr" },
        ],
        correctIndex: 1,
        explanationVi: "'säljes för tusenfemhundra' = 1 500 kr.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Lý do bán?",
        questionEn: "Reason for selling?",
        options: [
          { sv: "Soffan är trasig", vi: "Sofa bị hỏng" },
          { sv: "De flyttar till mindre lägenhet", vi: "Chuyển sang căn hộ nhỏ hơn" },
          { sv: "De behöver pengar snabbt", vi: "Cần tiền gấp" },
          { sv: "Färgen är ful", vi: "Màu xấu" },
        ],
        correctIndex: 1,
        explanationVi: "'vi flyttar till en mindre lägenhet'.",
      },
      tf("q3", "Người bán không giúp khiêng đồ.", "Seller refuses to help carry.", 1, "Bài nói 'vi hjälper gärna bära ner till porten'."),
      tf("q4", "Chỉ nhận tiền mặt hoặc Swish.", "Only cash or Swish accepted.", 0, "'Endast kontant eller Swish'."),
      {
        id: "q5",
        kind: "vocab",
        questionVi: "Từ 'nypris' nghĩa là?",
        questionEn: "Meaning of 'nypris'?",
        options: [
          { sv: "Det nya priset efter rabatt", vi: "Giá mới sau giảm" },
          { sv: "Priset när det var nytt i butik", vi: "Giá khi mới mua trong cửa hàng" },
          { sv: "Rea-pris", vi: "Giá sale" },
          { sv: "Hyresnivå", vi: "Mức thuê" },
        ],
        correctIndex: 1,
        explanationVi: "'nypris' = giá gốc khi còn mới.",
      },
    ],
    estimatedMinutes: 5,
  },
  // ═════════════════════ B1 extra v3 ═════════════════════
  {
    id: "rd-b1-friluftsliv",
    level: "B1",
    type: "article",
    titleVi: "Friluftsliv — sống ngoài trời kiểu Bắc Âu",
    titleEn: "Friluftsliv — outdoor life Nordic-style",
    titleSv: "Friluftsliv — varför naturen är en del av identiteten",
    contextVi: "Bài báo trên Dagens Nyheter giải thích vì sao 'friluftsliv' lại là một phần bản sắc Thụy Điển.",
    textSv:
      "Ordet friluftsliv myntades av norske författaren Henrik Ibsen redan på artonhundratalet, men det är i Sverige som begreppet har blivit en del av vardagen. För svenskar handlar friluftsliv inte om extrem sport, utan om regelbunden kontakt med naturen — en söndagspromenad, en svampplockning på hösten eller ett dopp i sjön på sommaren.\n\nAllemansrätten gör detta möjligt. Den ger varje människa rätten att vistas i naturen, även på privat mark, så länge man inte stör och inte förstör. Det är en princip som överraskar många utländska besökare, men för svenskar är den självklar. Man kan slå upp tältet, plocka bär och svamp eller paddla kanot nästan var som helst.\n\nForskare vid Mittuniversitetet menar att friluftsliv har tydliga effekter på hälsan. Regelbundna naturvistelser sänker blodtryck, minskar stress och förbättrar sömnen. Skolor i Sverige har därför infört 'utomhuspedagogik' där lektioner i biologi och matematik delvis hålls i skogen.\n\nMen friluftsliv är också en fråga om jämlikhet. Många nya svenskar växer upp i miljonprogrammets förorter där skogen kan kännas långt borta. Föreningar som Friluftsfrämjandet jobbar därför med integrationsprojekt: nybörjarkurser i skidåkning, guidade vandringar och utlåning av utrustning. Tanken är enkel — om naturen är en del av identiteten, bör alla få ta del av den.",
    textVi:
      "Từ 'friluftsliv' do nhà văn Na Uy Henrik Ibsen đặt ra từ thế kỷ XIX, nhưng chính ở Thụy Điển khái niệm này đã thành một phần đời thường. Với người Thụy Điển, friluftsliv không phải thể thao mạo hiểm, mà là tiếp xúc đều đặn với thiên nhiên — đi bộ Chủ nhật, hái nấm mùa thu hay tắm hồ mùa hè.\n\nAllemansrätten khiến điều đó khả thi. Nó cho mỗi người quyền lui tới thiên nhiên, kể cả đất tư nhân, miễn không quấy rầy và không phá hoại. Là nguyên tắc khiến nhiều khách nước ngoài ngạc nhiên, nhưng với người Thụy Điển là điều hiển nhiên. Bạn có thể cắm trại, hái dâu nấm hay chèo canô gần như bất cứ đâu.\n\nCác nhà nghiên cứu Đại học Mittuniversitetet cho rằng friluftsliv có hiệu ứng rõ rệt với sức khoẻ. Tiếp xúc thiên nhiên đều đặn hạ huyết áp, giảm stress, cải thiện giấc ngủ. Vì vậy trường học Thụy Điển đã đưa vào 'utomhuspedagogik' — bài sinh học, toán học một phần dạy trong rừng.\n\nNhưng friluftsliv cũng là chuyện công bằng. Nhiều người Thụy Điển mới lớn lên ở các khu ngoại ô 'miljonprogrammet' nơi rừng có vẻ xa. Các hội như Friluftsfrämjandet làm dự án hội nhập: lớp trượt tuyết cho người mới, dẫn đoàn đi bộ, cho mượn thiết bị. Ý tưởng đơn giản — nếu thiên nhiên là một phần bản sắc, thì mọi người đều nên được hưởng.",
    keyVocab: [
      { sv: "mynta", vi: "đặt ra (từ mới)" },
      { sv: "vistas i naturen", vi: "lui tới thiên nhiên" },
      { sv: "självklar", vi: "hiển nhiên" },
      { sv: "blodtryck", vi: "huyết áp" },
      { sv: "utomhuspedagogik", vi: "giáo dục ngoài trời" },
      { sv: "jämlikhet", vi: "bình đẳng" },
      { sv: "integration", vi: "hội nhập" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Ai đặt ra từ 'friluftsliv'?",
        questionEn: "Who coined the word 'friluftsliv'?",
        options: [
          { sv: "August Strindberg", vi: "August Strindberg" },
          { sv: "Henrik Ibsen", vi: "Henrik Ibsen" },
          { sv: "Selma Lagerlöf", vi: "Selma Lagerlöf" },
          { sv: "Astrid Lindgren", vi: "Astrid Lindgren" },
        ],
        correctIndex: 1,
        explanationVi: "'myntades av norske författaren Henrik Ibsen'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Allemansrätten cho phép gì?",
        questionEn: "What does Allemansrätten allow?",
        options: [
          { sv: "Jaga utan tillstånd", vi: "Săn không phép" },
          { sv: "Vistas i naturen även på privat mark", vi: "Lui tới thiên nhiên kể cả đất tư" },
          { sv: "Bygga hus var som helst", vi: "Xây nhà bất cứ đâu" },
          { sv: "Fiska gratis i privata sjöar", vi: "Câu cá miễn phí hồ tư" },
        ],
        correctIndex: 1,
        explanationVi: "'rätten att vistas i naturen, även på privat mark'.",
      },
      tf("q3", "Friluftsliv hiểu là thể thao mạo hiểm.", "Friluftsliv means extreme sport.", 1, "Bài nói 'inte om extrem sport, utan om regelbunden kontakt'."),
      {
        id: "q4",
        kind: "mcq",
        questionVi: "Theo nhà nghiên cứu, lợi ích sức khoẻ nào KHÔNG được đề cập?",
        questionEn: "Which health benefit is NOT mentioned?",
        options: [
          { sv: "Sänkt blodtryck", vi: "Giảm huyết áp" },
          { sv: "Bättre sömn", vi: "Ngủ tốt hơn" },
          { sv: "Mindre stress", vi: "Giảm stress" },
          { sv: "Snabbare ämnesomsättning", vi: "Trao đổi chất nhanh hơn" },
        ],
        correctIndex: 3,
        explanationVi: "Bài chỉ nhắc blodtryck, stress, sömn — không có trao đổi chất.",
      },
      tf("q5", "Friluftsfrämjandet làm dự án hội nhập.", "Friluftsfrämjandet runs integration projects.", 0, "'jobbar därför med integrationsprojekt'."),
      {
        id: "q6",
        kind: "vocab",
        questionVi: "Từ 'jämlikhet' nghĩa là?",
        questionEn: "Meaning of 'jämlikhet'?",
        options: [
          { sv: "Olikhet", vi: "Sự khác biệt" },
          { sv: "Lika rättigheter och möjligheter", vi: "Quyền và cơ hội bình đẳng" },
          { sv: "Frihet", vi: "Tự do" },
          { sv: "Säkerhet", vi: "An toàn" },
        ],
        correctIndex: 1,
        explanationVi: "'jämlikhet' = bình đẳng (equal rights/opportunities).",
      },
    ],
    estimatedMinutes: 9,
  },
  // ═════════════════════ A2 - Doctor visit ═════════════════════
  {
    id: "rd-a2-vardcentralen",
    level: "A2",
    type: "story",
    titleVi: "Đi khám ở trung tâm y tế",
    titleEn: "A visit to the health centre",
    titleSv: "På vårdcentralen",
    contextVi: "Maria bị cảm và đặt lịch khám ở vårdcentral (trung tâm y tế địa phương).",
    textSv:
      "Maria vaknade på måndagen med ont i halsen och feber. Hon kände sig trött och hade huvudvärk. På förmiddagen ringde hon till vårdcentralen och bokade en tid klockan halv tre samma dag.\n\nNär hon kom fram tog hon en kölapp och satte sig i väntrummet. Efter tio minuter kom sjuksköterskan och mätte hennes temperatur. Maria hade trettionio grader. Sedan fick hon träffa doktor Lindberg. Läkaren lyssnade på hennes lungor och tittade i halsen. Han sa att det troligen var en vanlig influensa.\n\nDoktorn skrev ut febernedsättande medicin och rekommenderade vila i minst tre dagar. Maria fick också ett sjukintyg för arbetet. På vägen hem stannade hon på apoteket och hämtade sin medicin. Sedan gick hon direkt hem och la sig i sängen med en varm kopp te.",
    textVi:
      "Maria thức dậy sáng thứ Hai với cổ họng đau và sốt. Cô thấy mệt và đau đầu. Buổi sáng cô gọi trung tâm y tế và đặt lịch lúc 2 giờ rưỡi chiều cùng ngày.\n\nKhi đến nơi, cô lấy số và ngồi phòng chờ. Sau 10 phút, y tá đến đo nhiệt độ. Maria sốt 39 độ. Sau đó cô gặp bác sĩ Lindberg. Bác sĩ nghe phổi và khám họng, nói có thể chỉ là cúm thường.\n\nBác sĩ kê thuốc hạ sốt và khuyên nghỉ ít nhất 3 ngày. Maria cũng được giấy nghỉ ốm cho công ty. Trên đường về cô ghé nhà thuốc lấy thuốc, rồi về nhà nằm nghỉ với một tách trà nóng.",
    keyVocab: [
      { sv: "vårdcentral", vi: "trung tâm y tế địa phương" },
      { sv: "boka en tid", vi: "đặt lịch hẹn" },
      { sv: "kölapp", vi: "phiếu xếp hàng" },
      { sv: "sjuksköterska", vi: "y tá" },
      { sv: "febernedsättande", vi: "hạ sốt" },
      { sv: "sjukintyg", vi: "giấy nghỉ ốm" },
      { sv: "apotek", vi: "nhà thuốc" },
    ],
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionVi: "Maria bị gì khi thức dậy?",
        questionEn: "What was wrong with Maria when she woke up?",
        options: [
          { sv: "Ont i magen och yrsel", vi: "Đau bụng và chóng mặt" },
          { sv: "Ont i halsen och feber", vi: "Đau họng và sốt" },
          { sv: "Ryggont och trötthet", vi: "Đau lưng và mệt" },
          { sv: "Tandvärk", vi: "Đau răng" },
        ],
        correctIndex: 1,
        explanationVi: "'ont i halsen och feber' - đau họng và sốt.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionVi: "Lịch hẹn của Maria vào lúc nào?",
        questionEn: "When was Maria's appointment?",
        options: [
          { sv: "Klockan halv två", vi: "1 giờ rưỡi" },
          { sv: "Klockan halv tre", vi: "2 giờ rưỡi" },
          { sv: "Klockan tre", vi: "3 giờ" },
          { sv: "Klockan halv fyra", vi: "3 giờ rưỡi" },
        ],
        correctIndex: 1,
        explanationVi: "'bokade en tid klockan halv tre' - halv tre = 14:30.",
      },
      tf("q3", "Maria có sốt 39 độ.", "Maria had a fever of 39 degrees.", 0, "'Maria hade trettionio grader' - đúng."),
      tf("q4", "Bác sĩ cho rằng cô bị viêm phổi.", "The doctor thought she had pneumonia.", 1, "Bác sĩ nói 'vanlig influensa' - cúm thường."),
      {
        id: "q5",
        kind: "vocab",
        questionVi: "'sjukintyg' nghĩa là gì?",
        questionEn: "What does 'sjukintyg' mean?",
        options: [
          { sv: "Recept", vi: "Đơn thuốc" },
          { sv: "Sjukförsäkring", vi: "Bảo hiểm y tế" },
          { sv: "Intyg om sjukdom för arbetet", vi: "Giấy chứng nhận nghỉ ốm cho công việc" },
          { sv: "Sjukhusräkning", vi: "Hoá đơn bệnh viện" },
        ],
        correctIndex: 2,
        explanationVi: "'sjukintyg' = giấy nghỉ ốm nộp cho chỗ làm.",
      },
    ],
    estimatedMinutes: 7,
  },
];

// ─── Expansion: additional passages pulled from expansion file ───
import { SWEDISH_READING_PASSAGES_EXPANSION } from "./swedishReadingPassagesExpansion";
SWEDISH_READING_PASSAGES.push(...SWEDISH_READING_PASSAGES_EXPANSION);

// ─── Expansion 2: additional passages ───
import { SWEDISH_READING_PASSAGES_EXPANSION_2 } from "./swedishReadingPassagesExpansion2";
SWEDISH_READING_PASSAGES.push(...SWEDISH_READING_PASSAGES_EXPANSION_2);

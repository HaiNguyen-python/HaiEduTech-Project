/**
 * @file swedishReadingPassagesExpansion5.ts
 * @description Fifth Läsförståelse pack - extra A1 and A2 passages for the
 *              Swedish Reading Lab. Every question carries a native sv-SE
 *              prompt (questionSv) and Swedish-only options.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishReadingPassage, SwedishReadingQuestion } from "./swedishReadingPassages";

const tf = (
  id: string,
  questionSv: string,
  questionVi: string,
  questionEn: string,
  correct: 0 | 1,
  explanationVi: string,
): SwedishReadingQuestion => ({
  id,
  kind: "truefalse",
  questionSv,
  questionVi,
  questionEn,
  options: [
    { sv: "Sant", vi: "Đúng" },
    { sv: "Falskt", vi: "Sai" },
  ],
  correctIndex: correct,
  explanationVi,
});

export const SWEDISH_READING_PASSAGES_EXPANSION_5: SwedishReadingPassage[] = [
  // ═══════════════════════════ A1 ═══════════════════════════
  {
    id: "rd5-a1-tvattstuga",
    level: "A1",
    type: "notice",
    titleSv: "Anslag: Tvättstugan",
    titleVi: "Thông báo: Phòng giặt chung",
    titleEn: "Notice: The laundry room",
    contextVi: "Thông báo dán ở cửa phòng giặt trong chung cư.",
    textSv:
      "TVÄTTSTUGAN\n\n" +
      "Tvättstugan är öppen varje dag mellan 07.00 och 22.00.\n" +
      "Du bokar en tid på tavlan i trapphuset. En tid är tre timmar.\n\n" +
      "Kom i tid. Om du är mer än 30 minuter sen kan en annan granne ta din tid.\n" +
      "Städa maskinerna efter dig och ta bort ludd ur torktumlaren.\n\n" +
      "Frågor? Ring vaktmästaren Pekka, telefon 040 123 456.",
    textVi:
      "PHÒNG GIẶT\n\n" +
      "Phòng giặt mở cửa hằng ngày từ 07.00 đến 22.00.\n" +
      "Bạn đặt giờ trên bảng ở cầu thang. Mỗi lượt là ba tiếng.\n\n" +
      "Hãy đến đúng giờ. Nếu bạn muộn hơn 30 phút, hàng xóm khác có thể lấy giờ của bạn.\n" +
      "Lau dọn máy sau khi dùng và lấy xơ vải ra khỏi máy sấy.\n\n" +
      "Có câu hỏi? Gọi bác quản lý Pekka, điện thoại 040 123 456.",
    keyVocab: [
      { sv: "tvättstuga", vi: "phòng giặt chung" },
      { sv: "boka en tid", vi: "đặt giờ" },
      { sv: "granne", vi: "hàng xóm" },
      { sv: "torktumlare", vi: "máy sấy" },
    ],
    estimatedMinutes: 3,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "När öppnar tvättstugan?",
        questionVi: "Phòng giặt mở lúc mấy giờ?",
        questionEn: "When does the laundry room open?",
        options: [
          { sv: "Klockan sex", vi: "6 giờ" },
          { sv: "Klockan sju", vi: "7 giờ" },
          { sv: "Klockan tio", vi: "10 giờ" },
          { sv: "Klockan tjugotvå", vi: "22 giờ" },
        ],
        correctIndex: 1,
        explanationVi: "'öppen varje dag mellan 07.00 och 22.00'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Hur lång är en bokad tid?",
        questionVi: "Mỗi lượt đặt kéo dài bao lâu?",
        questionEn: "How long is one booked slot?",
        options: [
          { sv: "En timme", vi: "1 tiếng" },
          { sv: "Två timmar", vi: "2 tiếng" },
          { sv: "Tre timmar", vi: "3 tiếng" },
          { sv: "Hela dagen", vi: "Cả ngày" },
        ],
        correctIndex: 2,
        explanationVi: "'En tid är tre timmar'.",
      },
      tf("q3", "Du bokar tvättid på tavlan i trapphuset.", "Bạn đặt giờ giặt trên bảng ở cầu thang.", "You book laundry time on the board in the stairwell.", 0, "'Du bokar en tid på tavlan i trapphuset'."),
      tf("q4", "Du får vara en timme sen utan problem.", "Bạn có thể đến muộn một tiếng mà không sao.", "You may be one hour late without problems.", 1, "Sau 30 phút, hàng xóm khác có thể lấy giờ của bạn."),
      {
        id: "q5",
        kind: "vocab",
        questionSv: "Vad betyder ordet 'granne' i texten?",
        questionVi: "Từ 'granne' nghĩa là gì?",
        questionEn: "What does 'granne' mean?",
        options: [
          { sv: "En person som bor nära dig", vi: "Người sống gần bạn" },
          { sv: "En maskin i tvättstugan", vi: "Một cái máy" },
          { sv: "En tid på tavlan", vi: "Một khung giờ" },
          { sv: "En vaktmästare", vi: "Người quản lý" },
        ],
        correctIndex: 0,
        explanationVi: "'granne' = hàng xóm.",
      },
    ],
  },
  {
    id: "rd5-a1-matlista",
    level: "A1",
    type: "email",
    titleSv: "Inköpslista till helgen",
    titleVi: "Danh sách mua sắm cuối tuần",
    titleEn: "Shopping list for the weekend",
    contextVi: "Tin nhắn của bạn cùng phòng gửi trước khi bạn đi siêu thị.",
    textSv:
      "Hej Linh!\n\n" +
      "Kan du handla på vägen hem? Vi behöver mjölk, bröd, ägg och kaffe.\n" +
      "Köp gärna äpplen också, men bara om de kostar mindre än två euro kilot.\n\n" +
      "Vi har redan smör och ost i kylen, så det behöver du inte köpa.\n" +
      "Jag lagar soppa i kväll klockan sex. Vi ses hemma!\n\n" +
      "Hälsningar, Sara",
    textVi:
      "Chào Linh!\n\n" +
      "Bạn mua đồ trên đường về nhé? Chúng ta cần sữa, bánh mì, trứng và cà phê.\n" +
      "Mua thêm táo nếu giá dưới hai euro một cân.\n\n" +
      "Trong tủ lạnh đã có bơ và phô mai rồi nên không cần mua.\n" +
      "Tối nay 6 giờ mình nấu súp. Gặp ở nhà nhé!\n\n" +
      "Thân mến, Sara",
    keyVocab: [
      { sv: "handla", vi: "đi mua đồ" },
      { sv: "kylen", vi: "tủ lạnh" },
      { sv: "laga mat", vi: "nấu ăn" },
      { sv: "kosta", vi: "có giá" },
    ],
    estimatedMinutes: 3,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Vad ska Linh köpa?",
        questionVi: "Linh cần mua gì?",
        questionEn: "What should Linh buy?",
        options: [
          { sv: "Smör och ost", vi: "Bơ và phô mai" },
          { sv: "Mjölk, bröd, ägg och kaffe", vi: "Sữa, bánh mì, trứng, cà phê" },
          { sv: "Bara soppa", vi: "Chỉ súp" },
          { sv: "Ingenting", vi: "Không gì cả" },
        ],
        correctIndex: 1,
        explanationVi: "'Vi behöver mjölk, bröd, ägg och kaffe'.",
      },
      tf("q2", "Linh ska köpa äpplen även om de kostar tre euro kilot.", "Linh phải mua táo kể cả khi giá 3 euro/kg.", "Linh must buy apples even at three euros a kilo.", 1, "Chỉ mua nếu dưới 2 euro/kg."),
      tf("q3", "Det finns redan ost hemma.", "Ở nhà đã có phô mai.", "There is already cheese at home.", 0, "'Vi har redan smör och ost i kylen'."),
      {
        id: "q4",
        kind: "mcq",
        questionSv: "Vad gör Sara klockan sex?",
        questionVi: "Sara làm gì lúc 6 giờ?",
        questionEn: "What does Sara do at six?",
        options: [
          { sv: "Hon handlar", vi: "Đi chợ" },
          { sv: "Hon lagar soppa", vi: "Nấu súp" },
          { sv: "Hon jobbar", vi: "Đi làm" },
          { sv: "Hon sover", vi: "Ngủ" },
        ],
        correctIndex: 1,
        explanationVi: "'Jag lagar soppa i kväll klockan sex'.",
      },
      {
        id: "q5",
        kind: "gapfill",
        questionSv: "Sara skriver: 'Vi har redan smör och ost i ___.'",
        questionVi: "Điền từ còn thiếu.",
        questionEn: "Fill in the missing word.",
        options: [
          { sv: "kylen", vi: "tủ lạnh" },
          { sv: "bussen", vi: "xe buýt" },
          { sv: "skolan", vi: "trường học" },
          { sv: "affären", vi: "cửa hàng" },
        ],
        correctIndex: 0,
        explanationVi: "'i kylen' = trong tủ lạnh.",
      },
    ],
  },
  {
    id: "rd5-a1-bussen",
    level: "A1",
    type: "notice",
    titleSv: "Information: Buss 55",
    titleVi: "Thông tin: Xe buýt 55",
    titleEn: "Information: Bus 55",
    contextVi: "Bảng thông tin ở bến xe buýt.",
    textSv:
      "BUSS 55 - CENTRUM - SJUKHUSET\n\n" +
      "Bussen går var tjugonde minut på vardagar och varje halvtimme på lördagar.\n" +
      "På söndagar går bussen bara en gång i timmen.\n\n" +
      "En enkel biljett kostar 3,20 euro. Barn under sju år åker gratis.\n" +
      "Du kan betala med kort i bussen, men inte med sedlar.\n\n" +
      "Sista bussen från centrum går 23.10.",
    textVi:
      "XE BUÝT 55 - TRUNG TÂM - BỆNH VIỆN\n\n" +
      "Xe chạy 20 phút một chuyến vào ngày thường và nửa tiếng một chuyến vào thứ Bảy.\n" +
      "Chủ nhật xe chỉ chạy một tiếng một chuyến.\n\n" +
      "Vé lượt giá 3,20 euro. Trẻ dưới 7 tuổi đi miễn phí.\n" +
      "Bạn có thể trả bằng thẻ trên xe, nhưng không nhận tiền giấy.\n\n" +
      "Chuyến cuối từ trung tâm lúc 23.10.",
    keyVocab: [
      { sv: "vardag", vi: "ngày trong tuần" },
      { sv: "enkel biljett", vi: "vé một lượt" },
      { sv: "gratis", vi: "miễn phí" },
      { sv: "sedel", vi: "tờ tiền giấy" },
    ],
    estimatedMinutes: 3,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Hur ofta går bussen på söndagar?",
        questionVi: "Chủ nhật xe chạy bao lâu một chuyến?",
        questionEn: "How often does the bus run on Sundays?",
        options: [
          { sv: "Var tjugonde minut", vi: "20 phút" },
          { sv: "Varje halvtimme", vi: "30 phút" },
          { sv: "En gång i timmen", vi: "1 tiếng" },
          { sv: "Två gånger om dagen", vi: "2 lần mỗi ngày" },
        ],
        correctIndex: 2,
        explanationVi: "'På söndagar går bussen bara en gång i timmen'.",
      },
      tf("q2", "Barn under sju år betalar ingenting.", "Trẻ dưới 7 tuổi không phải trả tiền.", "Children under seven pay nothing.", 0, "'Barn under sju år åker gratis'."),
      tf("q3", "Du kan betala med sedlar i bussen.", "Có thể trả bằng tiền giấy trên xe.", "You can pay with banknotes on the bus.", 1, "'men inte med sedlar'."),
      {
        id: "q4",
        kind: "mcq",
        questionSv: "Vad kostar en enkel biljett?",
        questionVi: "Vé một lượt giá bao nhiêu?",
        questionEn: "What does a single ticket cost?",
        options: [
          { sv: "2,20 euro", vi: "2,20 euro" },
          { sv: "3,20 euro", vi: "3,20 euro" },
          { sv: "5,50 euro", vi: "5,50 euro" },
          { sv: "Den är gratis", vi: "Miễn phí" },
        ],
        correctIndex: 1,
        explanationVi: "'En enkel biljett kostar 3,20 euro'.",
      },
      {
        id: "q5",
        kind: "heading",
        questionSv: "Vilken rubrik passar bäst till texten?",
        questionVi: "Tiêu đề nào hợp nhất?",
        questionEn: "Which heading fits the text best?",
        options: [
          { sv: "Tider och priser för buss 55", vi: "Giờ chạy và giá vé xe 55" },
          { sv: "Nya cykelvägar i staden", vi: "Đường xe đạp mới" },
          { sv: "Öppettider på sjukhuset", vi: "Giờ mở cửa bệnh viện" },
          { sv: "Regler i tvättstugan", vi: "Nội quy phòng giặt" },
        ],
        correctIndex: 0,
        explanationVi: "Văn bản nói về giờ chạy và giá vé.",
      },
    ],
  },
  {
    id: "rd5-a1-vaderprognos",
    level: "A1",
    type: "news",
    titleSv: "Vädret i veckan",
    titleVi: "Thời tiết trong tuần",
    titleEn: "The weather this week",
    contextVi: "Bản tin thời tiết ngắn trên đài địa phương.",
    textSv:
      "God morgon! Här kommer vädret.\n\n" +
      "I dag är det molnigt och kallt, bara två grader. Det blåser lite på kusten.\n" +
      "I morgon kommer snö på eftermiddagen. Ta med varma kläder och mössa.\n\n" +
      "På torsdag blir det soligt men fortfarande kallt, minus tre grader på morgonen.\n" +
      "På helgen blir det varmare, ungefär fem grader och regn.",
    textVi:
      "Chào buổi sáng! Đây là bản tin thời tiết.\n\n" +
      "Hôm nay trời nhiều mây và lạnh, chỉ 2 độ. Vùng ven biển có gió nhẹ.\n" +
      "Ngày mai buổi chiều có tuyết. Hãy mặc ấm và đội mũ.\n\n" +
      "Thứ Năm trời nắng nhưng vẫn lạnh, sáng âm 3 độ.\n" +
      "Cuối tuần ấm hơn, khoảng 5 độ và có mưa.",
    keyVocab: [
      { sv: "molnigt", vi: "nhiều mây" },
      { sv: "blåsa", vi: "có gió" },
      { sv: "mössa", vi: "mũ len" },
      { sv: "grader", vi: "độ (nhiệt độ)" },
    ],
    estimatedMinutes: 3,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Hur är vädret i dag?",
        questionVi: "Hôm nay thời tiết thế nào?",
        questionEn: "What is the weather like today?",
        options: [
          { sv: "Soligt och varmt", vi: "Nắng và ấm" },
          { sv: "Molnigt och kallt", vi: "Nhiều mây và lạnh" },
          { sv: "Snö hela dagen", vi: "Tuyết cả ngày" },
          { sv: "Regn och åska", vi: "Mưa và sấm" },
        ],
        correctIndex: 1,
        explanationVi: "'I dag är det molnigt och kallt'.",
      },
      tf("q2", "Det snöar på eftermiddagen i morgon.", "Chiều mai có tuyết.", "It will snow tomorrow afternoon.", 0, "'I morgon kommer snö på eftermiddagen'."),
      {
        id: "q3",
        kind: "mcq",
        questionSv: "Hur kallt är det på torsdag morgon?",
        questionVi: "Sáng thứ Năm lạnh bao nhiêu?",
        questionEn: "How cold is Thursday morning?",
        options: [
          { sv: "Två grader", vi: "2 độ" },
          { sv: "Fem grader", vi: "5 độ" },
          { sv: "Minus tre grader", vi: "Âm 3 độ" },
          { sv: "Minus tio grader", vi: "Âm 10 độ" },
        ],
        correctIndex: 2,
        explanationVi: "'minus tre grader på morgonen'.",
      },
      tf("q4", "På helgen blir det varmare än på torsdag.", "Cuối tuần ấm hơn thứ Năm.", "The weekend is warmer than Thursday.", 0, "Cuối tuần khoảng 5 độ."),
      {
        id: "q5",
        kind: "vocab",
        questionSv: "Vad ska du ta med i morgon enligt texten?",
        questionVi: "Theo bài, mai bạn nên mang gì?",
        questionEn: "What should you bring tomorrow?",
        options: [
          { sv: "Varma kläder och mössa", vi: "Đồ ấm và mũ len" },
          { sv: "Solglasögon", vi: "Kính râm" },
          { sv: "Badkläder", vi: "Đồ bơi" },
          { sv: "En cykel", vi: "Xe đạp" },
        ],
        correctIndex: 0,
        explanationVi: "'Ta med varma kläder och mössa'.",
      },
    ],
  },
  {
    id: "rd5-a1-biblioteket",
    level: "A1",
    type: "ad",
    titleSv: "Biblioteket - språkkafé",
    titleVi: "Thư viện - Quán cà phê ngôn ngữ",
    titleEn: "The library - language café",
    contextVi: "Tờ rơi ở thư viện thành phố.",
    textSv:
      "SPRÅKKAFÉ PÅ BIBLIOTEKET\n\n" +
      "Vill du prata svenska? Kom till vårt språkkafé varje onsdag klockan 17-19.\n" +
      "Vi sitter i rum 2 på andra våningen. Det är gratis och du behöver inte anmäla dig.\n\n" +
      "Vi dricker kaffe och te och pratar om enkla ämnen: familjen, jobbet, maten och resor.\n" +
      "Alla nivåer är välkomna, också nybörjare.\n\n" +
      "Välkommen! Frågor: sprakkafe@bibliotek.fi",
    textVi:
      "QUÁN CÀ PHÊ NGÔN NGỮ Ở THƯ VIỆN\n\n" +
      "Bạn muốn nói tiếng Thụy Điển? Hãy đến quán cà phê ngôn ngữ mỗi thứ Tư 17-19 giờ.\n" +
      "Chúng tôi ngồi ở phòng 2, tầng hai. Miễn phí và không cần đăng ký.\n\n" +
      "Chúng tôi uống cà phê, trà và nói về các chủ đề đơn giản: gia đình, công việc, đồ ăn, du lịch.\n" +
      "Mọi trình độ đều được chào đón, kể cả người mới bắt đầu.\n\n" +
      "Chào mừng bạn! Câu hỏi: sprakkafe@bibliotek.fi",
    keyVocab: [
      { sv: "anmäla sig", vi: "đăng ký" },
      { sv: "nybörjare", vi: "người mới bắt đầu" },
      { sv: "våning", vi: "tầng" },
      { sv: "ämne", vi: "chủ đề" },
    ],
    estimatedMinutes: 3,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Vilken dag är språkkaféet?",
        questionVi: "Quán cà phê ngôn ngữ vào thứ mấy?",
        questionEn: "Which day is the language café?",
        options: [
          { sv: "Måndag", vi: "Thứ Hai" },
          { sv: "Onsdag", vi: "Thứ Tư" },
          { sv: "Fredag", vi: "Thứ Sáu" },
          { sv: "Söndag", vi: "Chủ nhật" },
        ],
        correctIndex: 1,
        explanationVi: "'varje onsdag klockan 17-19'.",
      },
      tf("q2", "Du måste anmäla dig innan du kommer.", "Bạn phải đăng ký trước khi đến.", "You must register before coming.", 1, "'du behöver inte anmäla dig'."),
      tf("q3", "Språkkaféet kostar ingenting.", "Tham gia miễn phí.", "The café is free.", 0, "'Det är gratis'."),
      {
        id: "q4",
        kind: "mcq",
        questionSv: "Var träffas gruppen?",
        questionVi: "Nhóm gặp nhau ở đâu?",
        questionEn: "Where does the group meet?",
        options: [
          { sv: "I rum 2 på andra våningen", vi: "Phòng 2, tầng hai" },
          { sv: "I caféet på gatan", vi: "Quán cà phê ngoài phố" },
          { sv: "På skolan", vi: "Ở trường" },
          { sv: "Hemma hos läraren", vi: "Nhà giáo viên" },
        ],
        correctIndex: 0,
        explanationVi: "'Vi sitter i rum 2 på andra våningen'.",
      },
      {
        id: "q5",
        kind: "vocab",
        questionSv: "Vad betyder 'nybörjare'?",
        questionVi: "'nybörjare' nghĩa là gì?",
        questionEn: "What does 'nybörjare' mean?",
        options: [
          { sv: "En person som just har börjat lära sig", vi: "Người mới bắt đầu học" },
          { sv: "En lärare", vi: "Giáo viên" },
          { sv: "En bibliotekarie", vi: "Thủ thư" },
          { sv: "En person som talar perfekt", vi: "Người nói rất giỏi" },
        ],
        correctIndex: 0,
        explanationVi: "'nybörjare' = người mới học.",
      },
    ],
  },

  // ═══════════════════════════ A2 ═══════════════════════════
  {
    id: "rd5-a2-jobbannons",
    level: "A2",
    type: "ad",
    titleSv: "Jobbannons: Butiksbiträde sökes",
    titleVi: "Tin tuyển dụng: Cần nhân viên bán hàng",
    titleEn: "Job ad: Shop assistant wanted",
    contextVi: "Tin tuyển dụng trên bảng tin của siêu thị.",
    textSv:
      "BUTIKSBITRÄDE SÖKES\n\n" +
      "Vi är en liten livsmedelsbutik i Vasa och söker ett butiksbiträde på deltid, cirka 20 timmar i veckan.\n\n" +
      "Arbetsuppgifterna är att fylla på hyllorna, sitta i kassan och hjälpa kunder. Du jobbar mest på eftermiddagar och varannan lördag.\n\n" +
      "Vi önskar att du talar svenska på minst A2-nivå, är punktlig och trivs med att möta människor. Erfarenhet är en fördel men inte ett krav - vi lär dig allt du behöver.\n\n" +
      "Lönen följer kollektivavtalet. Skicka din ansökan och ditt CV till jobb@butiken.fi senast den 15 mars. Vi intervjuar löpande, så vänta inte för länge.",
    textVi:
      "CẦN TUYỂN NHÂN VIÊN BÁN HÀNG\n\n" +
      "Chúng tôi là một cửa hàng thực phẩm nhỏ ở Vaasa, cần một nhân viên bán hàng bán thời gian, khoảng 20 giờ/tuần.\n\n" +
      "Công việc gồm xếp hàng lên kệ, ngồi quầy thu ngân và giúp khách. Bạn làm chủ yếu buổi chiều và cách một thứ Bảy.\n\n" +
      "Chúng tôi mong bạn nói tiếng Thụy Điển tối thiểu trình độ A2, đúng giờ và thích giao tiếp. Có kinh nghiệm là lợi thế nhưng không bắt buộc - chúng tôi sẽ đào tạo.\n\n" +
      "Lương theo thỏa ước tập thể. Gửi đơn và CV tới jobb@butiken.fi trước ngày 15 tháng 3. Chúng tôi phỏng vấn liên tục nên đừng chờ lâu.",
    keyVocab: [
      { sv: "deltid", vi: "bán thời gian" },
      { sv: "arbetsuppgift", vi: "nhiệm vụ công việc" },
      { sv: "punktlig", vi: "đúng giờ" },
      { sv: "krav", vi: "yêu cầu bắt buộc" },
      { sv: "kollektivavtal", vi: "thỏa ước lao động tập thể" },
    ],
    estimatedMinutes: 4,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Hur många timmar i veckan gäller jobbet?",
        questionVi: "Công việc bao nhiêu giờ mỗi tuần?",
        questionEn: "How many hours per week is the job?",
        options: [
          { sv: "Cirka 10 timmar", vi: "Khoảng 10 giờ" },
          { sv: "Cirka 20 timmar", vi: "Khoảng 20 giờ" },
          { sv: "Cirka 38 timmar", vi: "Khoảng 38 giờ" },
          { sv: "Det står inte i annonsen", vi: "Không ghi" },
        ],
        correctIndex: 1,
        explanationVi: "'på deltid, cirka 20 timmar i veckan'.",
      },
      tf("q2", "Erfarenhet är ett absolut krav för jobbet.", "Kinh nghiệm là bắt buộc.", "Experience is required.", 1, "'Erfarenhet är en fördel men inte ett krav'."),
      {
        id: "q3",
        kind: "mcq",
        questionSv: "Vilken språknivå önskar arbetsgivaren?",
        questionVi: "Nhà tuyển dụng yêu cầu trình độ nào?",
        questionEn: "Which language level is wanted?",
        options: [
          { sv: "Minst A2", vi: "Tối thiểu A2" },
          { sv: "Minst B2", vi: "Tối thiểu B2" },
          { sv: "Modersmål", vi: "Tiếng mẹ đẻ" },
          { sv: "Ingen svenska alls", vi: "Không cần tiếng Thụy Điển" },
        ],
        correctIndex: 0,
        explanationVi: "'talar svenska på minst A2-nivå'.",
      },
      {
        id: "q4",
        kind: "gapfill",
        questionSv: "Skicka ansökan senast den ___ mars.",
        questionVi: "Hạn nộp đơn ngày bao nhiêu?",
        questionEn: "Deadline day in March?",
        options: [
          { sv: "5", vi: "5" },
          { sv: "10", vi: "10" },
          { sv: "15", vi: "15" },
          { sv: "25", vi: "25" },
        ],
        correctIndex: 2,
        explanationVi: "'senast den 15 mars'.",
      },
      {
        id: "q5",
        kind: "vocab",
        questionSv: "Vad betyder 'punktlig' i annonsen?",
        questionVi: "'punktlig' nghĩa là gì?",
        questionEn: "What does 'punktlig' mean?",
        options: [
          { sv: "Att alltid komma i tid", vi: "Luôn đến đúng giờ" },
          { sv: "Att prata mycket", vi: "Nói nhiều" },
          { sv: "Att vara stark", vi: "Khỏe mạnh" },
          { sv: "Att ha lång erfarenhet", vi: "Nhiều kinh nghiệm" },
        ],
        correctIndex: 0,
        explanationVi: "'punktlig' = đúng giờ.",
      },
      tf("q6", "Butiken intervjuar kandidater löpande.", "Cửa hàng phỏng vấn liên tục.", "The shop interviews continuously.", 0, "'Vi intervjuar löpande'."),
    ],
  },
  {
    id: "rd5-a2-forsakringskassan",
    level: "A2",
    type: "email",
    titleSv: "Brev från FPA om barnbidrag",
    titleVi: "Thư từ FPA về trợ cấp trẻ em",
    titleEn: "Letter from FPA about child benefit",
    contextVi: "Thư hành chính bạn nhận được sau khi nộp đơn xin trợ cấp.",
    textSv:
      "Hej!\n\n" +
      "Vi har fått din ansökan om barnbidrag den 3 februari. Tack för att du skickade den i tid.\n\n" +
      "Tyvärr saknas en bilaga i din ansökan: ett intyg från barnets skola. Utan intyget kan vi inte fatta ett beslut.\n\n" +
      "Skicka intyget till oss inom två veckor, antingen med posten eller via e-tjänsten på vår webbplats. Om du loggar in med bankkoder går det snabbast.\n\n" +
      "När vi har fått alla papper behandlar vi din ansökan inom en månad. Du får sedan ett skriftligt beslut hem i brevlådan.\n\n" +
      "Om du har frågor kan du ringa vår kundtjänst på vardagar mellan 9 och 15.\n\n" +
      "Med vänlig hälsning, FPA",
    textVi:
      "Chào bạn!\n\n" +
      "Chúng tôi đã nhận đơn xin trợ cấp trẻ em của bạn ngày 3 tháng 2. Cảm ơn bạn đã gửi đúng hạn.\n\n" +
      "Tiếc là đơn còn thiếu một phụ lục: giấy xác nhận từ trường của con bạn. Không có giấy này chúng tôi không thể ra quyết định.\n\n" +
      "Hãy gửi giấy xác nhận trong vòng hai tuần, qua bưu điện hoặc qua dịch vụ điện tử trên trang web. Đăng nhập bằng mã ngân hàng là nhanh nhất.\n\n" +
      "Khi đã nhận đủ giấy tờ, chúng tôi xử lý đơn trong vòng một tháng. Bạn sẽ nhận quyết định bằng văn bản gửi về nhà.\n\n" +
      "Nếu có câu hỏi, hãy gọi tổng đài các ngày trong tuần từ 9 đến 15 giờ.\n\n" +
      "Trân trọng, FPA",
    keyVocab: [
      { sv: "ansökan", vi: "đơn xin" },
      { sv: "bilaga", vi: "phụ lục, giấy kèm" },
      { sv: "intyg", vi: "giấy xác nhận" },
      { sv: "beslut", vi: "quyết định" },
      { sv: "e-tjänst", vi: "dịch vụ điện tử" },
    ],
    estimatedMinutes: 4,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Vad saknas i ansökan?",
        questionVi: "Đơn còn thiếu gì?",
        questionEn: "What is missing from the application?",
        options: [
          { sv: "Ett intyg från skolan", vi: "Giấy xác nhận của trường" },
          { sv: "En kopia av passet", vi: "Bản sao hộ chiếu" },
          { sv: "Ett foto", vi: "Ảnh" },
          { sv: "Ett kontonummer", vi: "Số tài khoản" },
        ],
        correctIndex: 0,
        explanationVi: "'ett intyg från barnets skola'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Hur lång tid har du på dig att skicka intyget?",
        questionVi: "Bạn có bao lâu để gửi giấy?",
        questionEn: "How long do you have to send the certificate?",
        options: [
          { sv: "Tre dagar", vi: "3 ngày" },
          { sv: "Två veckor", vi: "2 tuần" },
          { sv: "En månad", vi: "1 tháng" },
          { sv: "Tre månader", vi: "3 tháng" },
        ],
        correctIndex: 1,
        explanationVi: "'inom två veckor'.",
      },
      tf("q3", "Det går snabbast att logga in med bankkoder.", "Đăng nhập bằng mã ngân hàng là nhanh nhất.", "Logging in with bank codes is fastest.", 0, "'Om du loggar in med bankkoder går det snabbast'."),
      tf("q4", "Beslutet kommer per telefon.", "Quyết định được báo qua điện thoại.", "The decision comes by phone.", 1, "'ett skriftligt beslut hem i brevlådan'."),
      {
        id: "q5",
        kind: "mcq",
        questionSv: "När kan du ringa kundtjänsten?",
        questionVi: "Khi nào có thể gọi tổng đài?",
        questionEn: "When can you call customer service?",
        options: [
          { sv: "Varje dag dygnet runt", vi: "24/7" },
          { sv: "På vardagar mellan 9 och 15", vi: "Ngày thường 9-15 giờ" },
          { sv: "Bara på lördagar", vi: "Chỉ thứ Bảy" },
          { sv: "Aldrig, bara e-post", vi: "Không, chỉ email" },
        ],
        correctIndex: 1,
        explanationVi: "'på vardagar mellan 9 och 15'.",
      },
      {
        id: "q6",
        kind: "vocab",
        questionSv: "Vad betyder 'behandla en ansökan'?",
        questionVi: "'behandla en ansökan' nghĩa là gì?",
        questionEn: "What does 'behandla en ansökan' mean?",
        options: [
          { sv: "Att gå igenom och avgöra ärendet", vi: "Xem xét và giải quyết hồ sơ" },
          { sv: "Att kasta bort ansökan", vi: "Vứt bỏ đơn" },
          { sv: "Att skriva en ny ansökan", vi: "Viết đơn mới" },
          { sv: "Att skicka ansökan vidare till skolan", vi: "Chuyển đơn cho trường" },
        ],
        correctIndex: 0,
        explanationVi: "'behandla' = xử lý hồ sơ.",
      },
    ],
  },
  {
    id: "rd5-a2-atervinning",
    level: "A2",
    type: "notice",
    titleSv: "Så sorterar vi soporna",
    titleVi: "Cách phân loại rác",
    titleEn: "How we sort our waste",
    contextVi: "Hướng dẫn dán trong nhà chứa rác của chung cư.",
    textSv:
      "SORTERING I SOPRUMMET\n\n" +
      "I vårt soprum finns fem kärl: bioavfall, kartong, glas, metall och blandavfall.\n\n" +
      "Bioavfall är matrester, kaffesump och skal från frukt. Lägg bioavfallet i en papperspåse, inte i en plastpåse.\n\n" +
      "Kartong ska vikas ihop så att den tar mindre plats. Skölj glasburkar och konservburkar innan du slänger dem, annars börjar det lukta.\n\n" +
      "Batterier och elektronik hör inte hemma här. Dem lämnar du på affären eller på återvinningscentralen på Industrigatan, som är öppen lördagar 9-14.\n\n" +
      "Om alla sorterar rätt sparar huset pengar och miljön mår bättre. Tack för hjälpen!",
    textVi:
      "PHÂN LOẠI RÁC TRONG NHÀ RÁC\n\n" +
      "Nhà rác của chúng ta có năm thùng: rác hữu cơ, bìa carton, thủy tinh, kim loại và rác hỗn hợp.\n\n" +
      "Rác hữu cơ là thức ăn thừa, bã cà phê và vỏ hoa quả. Hãy bỏ vào túi giấy, không dùng túi nhựa.\n\n" +
      "Bìa carton phải gấp lại cho đỡ chiếm chỗ. Rửa lọ thủy tinh và hộp kim loại trước khi bỏ, nếu không sẽ bốc mùi.\n\n" +
      "Pin và đồ điện tử không thuộc về đây. Bạn mang tới cửa hàng hoặc trung tâm tái chế ở phố Industrigatan, mở thứ Bảy 9-14 giờ.\n\n" +
      "Nếu mọi người phân loại đúng, toà nhà tiết kiệm tiền và môi trường tốt hơn. Cảm ơn bạn!",
    keyVocab: [
      { sv: "sortera", vi: "phân loại" },
      { sv: "bioavfall", vi: "rác hữu cơ" },
      { sv: "skölja", vi: "rửa, tráng" },
      { sv: "återvinningscentral", vi: "trung tâm tái chế" },
      { sv: "kärl", vi: "thùng chứa" },
    ],
    estimatedMinutes: 4,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Hur många kärl finns i soprummet?",
        questionVi: "Nhà rác có mấy thùng?",
        questionEn: "How many bins are in the waste room?",
        options: [
          { sv: "Tre", vi: "Ba" },
          { sv: "Fyra", vi: "Bốn" },
          { sv: "Fem", vi: "Năm" },
          { sv: "Sex", vi: "Sáu" },
        ],
        correctIndex: 2,
        explanationVi: "'finns fem kärl'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Vilken påse ska du använda till bioavfall?",
        questionVi: "Rác hữu cơ dùng túi gì?",
        questionEn: "Which bag for bio waste?",
        options: [
          { sv: "En papperspåse", vi: "Túi giấy" },
          { sv: "En plastpåse", vi: "Túi nhựa" },
          { sv: "Ingen påse alls", vi: "Không dùng túi" },
          { sv: "En tygpåse", vi: "Túi vải" },
        ],
        correctIndex: 0,
        explanationVi: "'Lägg bioavfallet i en papperspåse, inte i en plastpåse'.",
      },
      tf("q3", "Batterier får läggas i blandavfallet.", "Pin có thể bỏ vào rác hỗn hợp.", "Batteries may go in mixed waste.", 1, "'Batterier och elektronik hör inte hemma här'."),
      {
        id: "q4",
        kind: "mcq",
        questionSv: "Varför ska man skölja burkarna?",
        questionVi: "Vì sao phải rửa lọ/hộp?",
        questionEn: "Why rinse the jars and cans?",
        options: [
          { sv: "För att de annars börjar lukta", vi: "Vì nếu không sẽ bốc mùi" },
          { sv: "För att de ska bli mindre", vi: "Để chúng nhỏ lại" },
          { sv: "För att de kostar pengar", vi: "Vì chúng tốn tiền" },
          { sv: "För att grannen vill det", vi: "Vì hàng xóm muốn thế" },
        ],
        correctIndex: 0,
        explanationVi: "'annars börjar det lukta'.",
      },
      {
        id: "q5",
        kind: "gapfill",
        questionSv: "Återvinningscentralen är öppen lördagar klockan ___.",
        questionVi: "Trung tâm tái chế mở thứ Bảy lúc mấy giờ?",
        questionEn: "Recycling centre Saturday hours?",
        options: [
          { sv: "7-12", vi: "7-12" },
          { sv: "9-14", vi: "9-14" },
          { sv: "10-18", vi: "10-18" },
          { sv: "12-20", vi: "12-20" },
        ],
        correctIndex: 1,
        explanationVi: "'öppen lördagar 9-14'.",
      },
      {
        id: "q6",
        kind: "heading",
        questionSv: "Vilken rubrik passar bäst?",
        questionVi: "Tiêu đề nào phù hợp nhất?",
        questionEn: "Which heading fits best?",
        options: [
          { sv: "Regler för sopsortering i huset", vi: "Quy định phân loại rác trong toà nhà" },
          { sv: "Nya öppettider på biblioteket", vi: "Giờ mở cửa thư viện" },
          { sv: "Hyreshöjning från januari", vi: "Tăng tiền thuê nhà" },
          { sv: "Information om parkering", vi: "Thông tin đỗ xe" },
        ],
        correctIndex: 0,
        explanationVi: "Toàn bài nói về phân loại rác.",
      },
    ],
  },
  {
    id: "rd5-a2-halsoblogg",
    level: "A2",
    type: "blog",
    titleSv: "Min väg tillbaka till träningen",
    titleVi: "Hành trình quay lại tập luyện của tôi",
    titleEn: "My way back to exercise",
    contextVi: "Bài blog cá nhân về việc tập luyện lại sau chấn thương.",
    textSv:
      "För ett år sedan skadade jag knäet när jag spelade fotboll. Läkaren sa att jag måste vila i tre månader, och det kändes länge.\n\n" +
      "I början var jag ganska ledsen. Jag brukade träna fyra gånger i veckan, och plötsligt kunde jag inte göra någonting. Men fysioterapeuten gav mig enkla övningar som jag kunde göra hemma på golvet, bara tio minuter om dagen.\n\n" +
      "Efter två månader började jag promenera igen. Först gick jag bara till affären, sedan runt sjön. Nu simmar jag två gånger i veckan och cyklar till jobbet när det inte är halt.\n\n" +
      "Det viktigaste jag lärde mig är att man inte ska ha bråttom. Om jag hade tränat för hårt i mars hade knäet blivit sämre igen. Lite varje dag är bättre än mycket en gång i månaden.\n\n" +
      "I höst ska jag springa mitt första lopp på fem kilometer. Jag tror att jag klarar det.",
    textVi:
      "Một năm trước tôi bị chấn thương đầu gối khi chơi bóng đá. Bác sĩ nói tôi phải nghỉ ba tháng, và thời gian đó thấy rất dài.\n\n" +
      "Ban đầu tôi khá buồn. Trước đó tôi tập bốn buổi mỗi tuần, rồi đột nhiên không làm được gì. Nhưng chuyên viên vật lý trị liệu cho tôi những bài tập đơn giản tập ở nhà, chỉ mười phút mỗi ngày.\n\n" +
      "Sau hai tháng tôi bắt đầu đi bộ lại. Đầu tiên chỉ ra cửa hàng, sau đó đi vòng quanh hồ. Giờ tôi bơi hai buổi một tuần và đạp xe đi làm khi đường không trơn.\n\n" +
      "Điều quan trọng nhất tôi học được là không nên vội. Nếu tháng Ba tôi tập quá nặng thì đầu gối đã tệ hơn. Mỗi ngày một chút tốt hơn là tập nhiều một lần mỗi tháng.\n\n" +
      "Mùa thu này tôi sẽ chạy giải 5 km đầu tiên. Tôi tin mình làm được.",
    keyVocab: [
      { sv: "skada sig", vi: "bị chấn thương" },
      { sv: "vila", vi: "nghỉ ngơi" },
      { sv: "övning", vi: "bài tập" },
      { sv: "halt", vi: "trơn trượt" },
      { sv: "ha bråttom", vi: "vội vàng" },
    ],
    estimatedMinutes: 5,
    questions: [
      {
        id: "q1",
        kind: "mcq",
        questionSv: "Hur skadade skribenten knäet?",
        questionVi: "Tác giả bị chấn thương gối thế nào?",
        questionEn: "How did the writer hurt the knee?",
        options: [
          { sv: "När hen cyklade", vi: "Khi đạp xe" },
          { sv: "När hen spelade fotboll", vi: "Khi chơi bóng đá" },
          { sv: "När hen simmade", vi: "Khi bơi" },
          { sv: "På jobbet", vi: "Ở chỗ làm" },
        ],
        correctIndex: 1,
        explanationVi: "'skadade jag knäet när jag spelade fotboll'.",
      },
      {
        id: "q2",
        kind: "mcq",
        questionSv: "Vad gav fysioterapeuten för hjälp?",
        questionVi: "Chuyên viên trị liệu giúp gì?",
        questionEn: "What help did the physiotherapist give?",
        options: [
          { sv: "Enkla övningar hemma tio minuter om dagen", vi: "Bài tập đơn giản 10 phút/ngày" },
          { sv: "Ett medlemskap på gymmet", vi: "Thẻ tập gym" },
          { sv: "Nya fotbollsskor", vi: "Giày bóng đá mới" },
          { sv: "En operation", vi: "Phẫu thuật" },
        ],
        correctIndex: 0,
        explanationVi: "'enkla övningar ... bara tio minuter om dagen'.",
      },
      tf("q3", "Skribenten simmar två gånger i veckan nu.", "Hiện tác giả bơi 2 buổi/tuần.", "The writer swims twice a week now.", 0, "'Nu simmar jag två gånger i veckan'."),
      tf("q4", "Skribenten tycker att man ska träna hårt direkt efter en skada.", "Tác giả cho rằng nên tập nặng ngay sau chấn thương.", "The writer thinks you should train hard right after an injury.", 1, "'man inte ska ha bråttom'."),
      {
        id: "q5",
        kind: "vocab",
        questionSv: "Vad betyder 'halt' i texten?",
        questionVi: "'halt' nghĩa là gì?",
        questionEn: "What does 'halt' mean?",
        options: [
          { sv: "Att vägen är hal och man kan ramla", vi: "Đường trơn, dễ ngã" },
          { sv: "Att det är mörkt ute", vi: "Trời tối" },
          { sv: "Att det regnar mycket", vi: "Mưa to" },
          { sv: "Att vägen är stängd", vi: "Đường bị đóng" },
        ],
        correctIndex: 0,
        explanationVi: "'halt' = trơn trượt.",
      },
      {
        id: "q6",
        kind: "mcq",
        questionSv: "Vad är skribentens mål i höst?",
        questionVi: "Mục tiêu mùa thu của tác giả?",
        questionEn: "What is the writer's goal this autumn?",
        options: [
          { sv: "Att spela fotboll igen", vi: "Chơi bóng lại" },
          { sv: "Att springa fem kilometer", vi: "Chạy 5 km" },
          { sv: "Att cykla till Stockholm", vi: "Đạp xe tới Stockholm" },
          { sv: "Att sluta träna", vi: "Ngừng tập" },
        ],
        correctIndex: 1,
        explanationVi: "'springa mitt första lopp på fem kilometer'.",
      },
    ],
  },
];

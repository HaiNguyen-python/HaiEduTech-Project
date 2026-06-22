/**
 * @file swedishA1DailyDeepPlus.ts
 * @description Lớp MỞ RỘNG SÂU HƠN cho 30 ngày A1 Thuỵ Điển. Mỗi ngày bổ sung:
 *              - pitfalls: 3 lỗi người Việt hay mắc + cách sửa.
 *              - examples: 3 câu mẫu/mini-dialogue gắn ngữ cảnh thật ở Sverige.
 *              - extraFill / extraTranslate / extraMatch: 3-4 bài tập nâng cấp.
 *              File này được SwedishA1DeepTheory.tsx render sau lớp cơ bản.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { FillBlank, TranslatePair, MatchPair } from "@/data/swedishA1DailyExpansion";

export interface DailyDeepPlus {
  pitfallsVi: string[];
  pitfallsEn: string[];
  examplesVi: string[];
  examplesEn: string[];
  /** Câu Thuỵ Điển tương ứng từng example (để đọc audio + bold). */
  examplesSv: string[];
  extraFill: FillBlank[];
  extraTranslate: TranslatePair[];
  extraMatch: MatchPair[];
}

const fb = (sv: string, a: string, vi: string, en: string): FillBlank => ({ sv, a, vi, en });
const tr = (vi: string, en: string, sv: string): TranslatePair => ({ vi, en, sv });
const mp = (sv: string, vi: string): MatchPair => ({ sv, vi });

export const SWEDISH_A1_DEEP_PLUS: Record<number, DailyDeepPlus> = {
  /* =============== TUẦN 1 =============== */
  1: {
    pitfallsVi: [
      "Đọc 'sju' (7) thành 'shu'. Đúng: thổi hơi /ɧ/ - giống huýt sáo nhẹ, môi tròn.",
      "Bỏ dấu hai chấm trên 'ä, ö'. Đổi nghĩa hoàn toàn: 'far' (cha) ≠ 'får' (cừu).",
      "Đọc 'tj-' giống 'tj-' tiếng Anh. Đúng: /ɕ/ - giống 'xi' tiếng Trung mềm.",
    ],
    pitfallsEn: [
      "Saying 'sju' (7) as 'shu'. Correct: airy /ɧ/ with rounded lips.",
      "Dropping umlauts on ä/ö. 'far' (father) ≠ 'får' (sheep).",
      "Pronouncing 'tj-' like English 'tj-'. Correct: soft /ɕ/, like Mandarin 'xi'.",
    ],
    examplesVi: [
      "Bài kiểm môi: thổi nến mà không tắt - đó là âm sj/skj.",
      "Cặp nguyên âm dài/ngắn: 'vi' (chúng tôi) dài >< 'vill' (muốn) ngắn.",
      "Mẹo huyền tích: 'å' = 'ô', 'ä' = 'e', 'ö' = 'ơ' với người Việt.",
    ],
    examplesEn: [
      "Lip test: blow a candle WITHOUT putting it out - that's /ɧ/.",
      "Long vs short: 'vi' (we, long) vs 'vill' (want, short).",
      "Vietnamese shortcut: å≈ô, ä≈e, ö≈ơ.",
    ],
    examplesSv: ["sju, sjö, skjorta", "vi - vill, du - dum", "år, här, för"],
    extraFill: [
      fb("Hon ___ Anna.", "heter", "Cô ấy tên Anna.", "She is called Anna."),
      fb("Jag är ___ år gammal.", "trettio", "Tôi 30 tuổi.", "I'm 30 years old."),
      fb("___ , jag är Linh!", "Hej", "Chào, tôi là Linh!", "Hi, I'm Linh!"),
    ],
    extraTranslate: [
      tr("Tôi đến từ Hà Nội.", "I'm from Hanoi.", "Jag kommer från Hanoi."),
      tr("Hẹn gặp lại ngày mai.", "See you tomorrow.", "Vi ses i morgon."),
      tr("Xin lỗi, bạn nói gì cơ?", "Sorry, what did you say?", "Förlåt, vad sa du?"),
    ],
    extraMatch: [
      mp("förlåt", "xin lỗi"),
      mp("ursäkta", "xin lỗi (làm phiền)"),
      mp("varsågod", "xin mời / không có gì"),
      mp("vi ses", "hẹn gặp"),
    ],
  },

  2: {
    pitfallsVi: [
      "Chia 'är' theo ngôi như tiếng Anh. SAI: 'jag am'. Đúng: 'jag är, du är, han är'.",
      "Dùng 'a/an' trước nghề: 'Jag är en lärare'. ĐÚNG: 'Jag är lärare' (không mạo từ).",
      "Đặt 'inte' SAI vị trí. Đúng: 'Jag är inte trött' (sau động từ).",
    ],
    pitfallsEn: [
      "Conjugating 'är' per person. WRONG 'jag am'. All persons use 'är'.",
      "Adding 'en' before profession: WRONG 'Jag är en lärare'. CORRECT 'Jag är lärare'.",
      "Misplacing 'inte'. Correct: 'Jag är inte trött' (after verb).",
    ],
    examplesVi: [
      "'Är du okej?' - câu hỏi quan tâm dùng hằng ngày.",
      "'De är från Kiruna' - giới thiệu nhóm bạn.",
      "'Vi är inte hungriga än' - cách nói lịch sự từ chối ăn.",
    ],
    examplesEn: [
      "'Är du okej?' - everyday concern phrase.",
      "'De är från Kiruna' - introducing a group.",
      "'Vi är inte hungriga än' - politely declining food.",
    ],
    examplesSv: ["Är du okej?", "De är från Kiruna.", "Vi är inte hungriga än."],
    extraFill: [
      fb("___ är trött.", "Han", "Anh ấy mệt.", "He is tired."),
      fb("De ___ från Norge.", "är", "Họ đến từ Na Uy.", "They are from Norway."),
      fb("Är ___ läkare?", "du", "Bạn là bác sĩ?", "Are you a doctor?"),
    ],
    extraTranslate: [
      tr("Chúng tôi không phải sinh viên.", "We aren't students.", "Vi är inte studenter."),
      tr("Cô ấy là kỹ sư.", "She is an engineer.", "Hon är ingenjör."),
      tr("Các bạn có mệt không?", "Are you (pl) tired?", "Är ni trötta?"),
    ],
    extraMatch: [
      mp("läkare", "bác sĩ"),
      mp("lärare", "giáo viên"),
      mp("ingenjör", "kỹ sư"),
      mp("student", "sinh viên"),
    ],
  },

  3: {
    pitfallsVi: [
      "Phát âm 'sju' (7) thành 'shu'. Phải thổi hơi /ɧ/ rõ.",
      "Nhầm 'tio' (10) và 'tjugo' (20). Mẹo: 'tj' = /ɕ/ mềm.",
      "Quên 'och' giữa số ghép: 'tjugotvå' (22) là 'tjugo + två', viết liền.",
    ],
    pitfallsEn: [
      "Saying 'sju' as 'shu'. Use airy /ɧ/.",
      "Confusing 'tio' (10) and 'tjugo' (20). 'tj' = soft /ɕ/.",
      "Compound numbers like 'tjugotvå' (22) are written as one word.",
    ],
    examplesVi: [
      "Số điện thoại Sverige đọc theo cặp: 070-123 45 67 = 'noll-sju-noll, ett-två-tre, fyrtiofem, sextiosju'.",
      "Tuổi: 'Jag fyller 26 i juli' (Tôi tròn 26 vào tháng 7).",
      "Đếm tiền: '99 kronor' viết '99 kr' nhưng đọc 'nittionio kronor'.",
    ],
    examplesEn: [
      "Phone numbers are read in pairs: 070-123 45 67.",
      "Age: 'Jag fyller 26 i juli' (I turn 26 in July).",
      "Money: '99 kr' is read 'nittionio kronor'.",
    ],
    examplesSv: ["noll-sju-noll, ett-två-tre", "Jag fyller 26 i juli.", "nittionio kronor"],
    extraFill: [
      fb("Hon är ___ år.", "femton", "Cô ấy 15 tuổi.", "She is 15."),
      fb("Det kostar ___ kronor.", "femtio", "Giá 50 kronor.", "It costs 50 SEK."),
      fb("Mitt nummer är noll sju noll, ett ___ tre.", "två", "Số tôi là 070-123.", "My number is 070-123."),
    ],
    extraTranslate: [
      tr("Cô ấy 40 tuổi.", "She is 40.", "Hon är fyrtio år."),
      tr("Giá 250 kronor.", "It costs 250 SEK.", "Det kostar tvåhundrafemtio kronor."),
      tr("Tôi tròn 18 tuổi tháng sau.", "I turn 18 next month.", "Jag fyller arton nästa månad."),
    ],
    extraMatch: [
      mp("tjugofem", "25"),
      mp("trettiotre", "33"),
      mp("åttio", "80"),
      mp("hundra", "100"),
    ],
  },

  4: {
    pitfallsVi: [
      "Đoán bừa en/ett. Mẹo: ~75% danh từ là 'en'; 'ett' thường cho vật vô tri (ett hus, ett bord, ett barn).",
      "Quên đổi dạng xác định: 'en bok' → 'boken' (cuốn sách đó), 'ett hus' → 'huset'.",
      "Số nhiều khác nhau theo nhóm (-or, -ar, -er, -n, ø). Học DANH TỪ + dạng nhiều cùng lúc.",
    ],
    pitfallsEn: [
      "Guessing en/ett. ~75% nouns are 'en'; 'ett' for inanimate (hus, bord, barn).",
      "Forgetting the definite form: 'en bok' → 'boken'; 'ett hus' → 'huset'.",
      "Plural varies by group. Learn the noun WITH its plural.",
    ],
    examplesVi: [
      "'en bok - boken - böcker - böckerna' (sách / cuốn sách đó / những sách / những sách đó).",
      "'ett barn - barnet - barn - barnen' (con / đứa con / mấy đứa / những đứa con).",
      "'en katt - katten - katter - katterna' (mèo).",
    ],
    examplesEn: [
      "'en bok - boken - böcker - böckerna' (book chain).",
      "'ett barn - barnet - barn - barnen' (child chain, no plural ending).",
      "'en katt - katten - katter - katterna'.",
    ],
    examplesSv: ["en bok - boken - böcker - böckerna", "ett barn - barnet - barn - barnen", "en katt - katten - katter - katterna"],
    extraFill: [
      fb("Jag har ___ hund.", "en", "Tôi có 1 con chó.", "I have a dog."),
      fb("Det är ___ stort hus.", "ett", "Đó là 1 ngôi nhà lớn.", "It's a big house."),
      fb("Boken ligger på ___ .", "bordet", "Sách nằm trên bàn.", "The book is on the table."),
    ],
    extraTranslate: [
      tr("Tôi có một con mèo.", "I have a cat.", "Jag har en katt."),
      tr("Cái bàn này màu trắng.", "This table is white.", "Det här bordet är vitt."),
      tr("Những đứa trẻ đang ngủ.", "The children are sleeping.", "Barnen sover."),
    ],
    extraMatch: [
      mp("en stol - stolen", "ghế - cái ghế"),
      mp("ett äpple - äpplet", "táo - quả táo"),
      mp("en bil - bilen", "ô tô - cái ô tô"),
      mp("ett rum - rummet", "phòng - căn phòng"),
    ],
  },

  5: {
    pitfallsVi: [
      "Quên đảo động từ trong câu hỏi y/n. Sai: 'Du är glad?'. Đúng: 'Är du glad?'.",
      "Dùng 'do/does' kiểu Anh. Tiếng Thuỵ Điển KHÔNG có trợ động từ do.",
      "Trộn 'vad' (gì) và 'vilken/vilket' (cái nào). 'vilken' đi với en-noun, 'vilket' với ett-noun.",
    ],
    pitfallsEn: [
      "Forgetting verb inversion in yes/no questions.",
      "Using 'do/does'. Swedish has no auxiliary 'do'.",
      "Mixing 'vad' vs 'vilken/vilket'. 'vilken' for en-noun, 'vilket' for ett-noun.",
    ],
    examplesVi: [
      "'Var bor du?' (Bạn sống ở đâu?) - câu hỏi mở đầu khi gặp người mới.",
      "'Vilken färg gillar du?' (Màu nào bạn thích?) - 'färg' là en-noun.",
      "'Hur mår du i dag?' - chào hỏi lịch sự buổi sáng.",
    ],
    examplesEn: [
      "'Var bor du?' - small talk opener.",
      "'Vilken färg gillar du?' - 'färg' is en-noun.",
      "'Hur mår du i dag?' - morning greeting.",
    ],
    examplesSv: ["Var bor du?", "Vilken färg gillar du?", "Hur mår du i dag?"],
    extraFill: [
      fb("___ kostar det?", "Vad", "Nó giá bao nhiêu?", "How much does it cost?"),
      fb("___ är klockan?", "Vad", "Mấy giờ rồi?", "What time is it?"),
      fb("___ bok läser du?", "Vilken", "Bạn đọc sách nào?", "Which book are you reading?"),
    ],
    extraTranslate: [
      tr("Bạn sống ở đâu?", "Where do you live?", "Var bor du?"),
      tr("Khi nào bạn đến?", "When are you coming?", "När kommer du?"),
      tr("Tại sao bạn học tiếng Thuỵ Điển?", "Why are you learning Swedish?", "Varför lär du dig svenska?"),
    ],
    extraMatch: [
      mp("vem", "ai"),
      mp("var", "ở đâu"),
      mp("när", "khi nào"),
      mp("hur", "thế nào"),
    ],
  },

  6: {
    pitfallsVi: [
      "Dùng 'my/your' tiếng Anh. Đúng: min (en-noun), mitt (ett-noun), mina (số nhiều).",
      "Quên đổi sở hữu theo giống/số: 'min bok' nhưng 'mitt hus', 'mina böcker'.",
      "'Han' chỉ dùng cho NAM cụ thể. Vật trung lập dùng 'den/det' tuỳ giống.",
    ],
    pitfallsEn: [
      "Using English 'my/your'. Match noun: min/mitt/mina.",
      "Forgetting agreement: 'min bok', 'mitt hus', 'mina böcker'.",
      "'Han' is for male people. For things use 'den/det'.",
    ],
    examplesVi: [
      "'Det här är min familj' khi giới thiệu album ảnh.",
      "'Vår mamma lagar mat varje söndag' - vai trò ngày Chủ Nhật ở Sverige.",
      "'Mina syskon bor i Göteborg' (Anh chị em tôi sống ở Göteborg).",
    ],
    examplesEn: [
      "'Det här är min familj' when showing a photo.",
      "'Vår mamma lagar mat varje söndag' - typical Swedish Sunday.",
      "'Mina syskon bor i Göteborg'.",
    ],
    examplesSv: ["Det här är min familj.", "Vår mamma lagar mat varje söndag.", "Mina syskon bor i Göteborg."],
    extraFill: [
      fb("Det här är ___ bror.", "min", "Đây là anh trai tôi.", "This is my brother."),
      fb("___ hus är stort.", "Vårt", "Nhà chúng tôi to.", "Our house is big."),
      fb("___ föräldrar bor i Hanoi.", "Mina", "Bố mẹ tôi sống ở Hà Nội.", "My parents live in Hanoi."),
    ],
    extraTranslate: [
      tr("Mẹ tôi là giáo viên.", "My mother is a teacher.", "Min mamma är lärare."),
      tr("Anh trai của bạn tên gì?", "What is your brother's name?", "Vad heter din bror?"),
      tr("Các con của họ rất giỏi.", "Their children are great.", "Deras barn är jätteduktiga."),
    ],
    extraMatch: [
      mp("morfar", "ông ngoại"),
      mp("farmor", "bà nội"),
      mp("kusin", "anh/chị họ"),
      mp("syskon", "anh chị em"),
    ],
  },

  7: {
    pitfallsVi: [
      "Quên thêm '-r' ở hiện tại nhóm 1: 'jag prata' SAI → 'jag pratar'.",
      "Nhầm dạng nguyên thể (att prata) với hiện tại (pratar).",
      "Bỏ 'att' khi cần: 'Jag vill lära mig att prata' - 'att' bắt buộc sau động từ chính khác.",
    ],
    pitfallsEn: [
      "Forgetting present '-r' for group 1: 'jag pratar', not 'jag prata'.",
      "Confusing infinitive (att prata) and present (pratar).",
      "Dropping 'att' where needed after a main verb.",
    ],
    examplesVi: [
      "'Jag pratar lite svenska' - câu khiêm tốn khi gặp người Thuỵ Điển.",
      "'Vi tränar fotboll på onsdagar' - thói quen tập luyện.",
      "'De bor i en lägenhet i Stockholm' - giới thiệu nơi ở.",
    ],
    examplesEn: [
      "'Jag pratar lite svenska' - humble first sentence.",
      "'Vi tränar fotboll på onsdagar' - weekly habit.",
      "'De bor i en lägenhet i Stockholm'.",
    ],
    examplesSv: ["Jag pratar lite svenska.", "Vi tränar fotboll på onsdagar.", "De bor i en lägenhet i Stockholm."],
    extraFill: [
      fb("Jag ___ svenska varje dag.", "studerar", "Tôi học TĐ mỗi ngày.", "I study Swedish every day."),
      fb("Hon ___ kaffe på morgonen.", "dricker", "Cô ấy uống cà phê buổi sáng.", "She drinks coffee in the morning."),
      fb("Vi ___ i Stockholm.", "bor", "Chúng tôi sống ở Stockholm.", "We live in Stockholm."),
    ],
    extraTranslate: [
      tr("Anh ấy làm việc tại bệnh viện.", "He works at the hospital.", "Han jobbar på sjukhuset."),
      tr("Họ chơi tennis vào thứ Bảy.", "They play tennis on Saturdays.", "De spelar tennis på lördagar."),
      tr("Tôi muốn học tiếng Thuỵ Điển.", "I want to learn Swedish.", "Jag vill lära mig svenska."),
    ],
    extraMatch: [
      mp("jobba", "làm việc"),
      mp("bo", "sống"),
      mp("studera", "học"),
      mp("träna", "tập luyện"),
    ],
  },

  /* =============== TUẦN 2 =============== */
  8: {
    pitfallsVi: [
      "Đọc giờ kiểu Anh '7:30'. Thuỵ Điển nói 'halv åtta' (nửa tới 8) - LƯU Ý: là nửa TỚI giờ tiếp theo!",
      "Quên 'i' trước ngày trong tuần: 'i måndags' (thứ 2 vừa rồi) ≠ 'på måndag' (thứ 2 sắp tới).",
      "Viết hoa thứ/tháng kiểu Anh. Thuỵ Điển VIẾT THƯỜNG: måndag, januari.",
    ],
    pitfallsEn: [
      "Saying '7:30'. Swedes say 'halv åtta' - half TO 8, not half past 7.",
      "Mixing 'i måndags' (last Mon) vs 'på måndag' (next Mon).",
      "Days/months are lowercase: måndag, januari.",
    ],
    examplesVi: [
      "'Klockan är kvart i tre' = 14:45 (kém 15 phút tới 3).",
      "'Vi ses på fredag kl. 18' - hẹn cà phê chiều Sáu.",
      "'I lördags var jag på IKEA' - kể chuyện cuối tuần trước.",
    ],
    examplesEn: [
      "'Klockan är kvart i tre' = 2:45.",
      "'Vi ses på fredag kl. 18' - Friday coffee plan.",
      "'I lördags var jag på IKEA' - last Saturday story.",
    ],
    examplesSv: ["Klockan är kvart i tre.", "Vi ses på fredag kl. 18.", "I lördags var jag på IKEA."],
    extraFill: [
      fb("Klockan är ___ åtta.", "halv", "7:30.", "It's 7:30."),
      fb("Vi ses på ___ .", "måndag", "Hẹn thứ Hai.", "See you Monday."),
      fb("I ___ var jag hemma.", "söndags", "CN vừa rồi tôi ở nhà.", "Last Sunday I was home."),
    ],
    extraTranslate: [
      tr("Mấy giờ rồi?", "What time is it?", "Vad är klockan?"),
      tr("Tôi làm việc từ thứ 2 đến thứ 6.", "I work Mon to Fri.", "Jag jobbar måndag till fredag."),
      tr("Hôm nay là thứ tư.", "Today is Wednesday.", "I dag är det onsdag."),
    ],
    extraMatch: [
      mp("kvart över", "+15 phút"),
      mp("kvart i", "−15 phút"),
      mp("halv", "−30 phút (nửa tới)"),
      mp("midnatt", "nửa đêm"),
    ],
  },

  9: {
    pitfallsVi: [
      "Dùng 'I want' kiểu Anh. Thuỵ Điển dùng 'jag vill ha' (muốn có) khi gọi món.",
      "Quên 'tack' cuối câu gọi món - nghe thô lỗ.",
      "Nhầm 'äter' (ăn) và 'är' (là). Phát âm khác hẳn: ä-ter vs ä-r.",
    ],
    pitfallsEn: [
      "Saying 'I want X' directly. Use 'Jag vill ha X' when ordering.",
      "Forgetting 'tack' at the end - sounds rude.",
      "Confusing 'äter' (eats) and 'är' (is).",
    ],
    examplesVi: [
      "'Jag vill ha en kaffe, tack' - mẫu gọi đồ chuẩn.",
      "'Kan jag få notan, tack?' - xin hoá đơn lịch sự.",
      "'Smaklig måltid!' - chúc ngon miệng trước khi ăn.",
    ],
    examplesEn: [
      "'Jag vill ha en kaffe, tack' - standard café order.",
      "'Kan jag få notan, tack?' - asking for the bill.",
      "'Smaklig måltid!' - bon appétit.",
    ],
    examplesSv: ["Jag vill ha en kaffe, tack.", "Kan jag få notan, tack?", "Smaklig måltid!"],
    extraFill: [
      fb("Jag ___ ha en kanelbulle.", "vill", "Tôi muốn 1 bánh quế.", "I'd like a cinnamon bun."),
      fb("Vi ___ middag klockan sju.", "äter", "Chúng tôi ăn tối lúc 7.", "We eat dinner at 7."),
      fb("Han ___ inte mjölk.", "dricker", "Anh ấy không uống sữa.", "He doesn't drink milk."),
    ],
    extraTranslate: [
      tr("Tôi muốn nước, làm ơn.", "I'd like water, please.", "Jag vill ha vatten, tack."),
      tr("Bạn có đói không?", "Are you hungry?", "Är du hungrig?"),
      tr("Ngon quá!", "It's delicious!", "Det är jättegott!"),
    ],
    extraMatch: [
      mp("frukost", "bữa sáng"),
      mp("lunch", "bữa trưa"),
      mp("middag", "bữa tối"),
      mp("mellanmål", "bữa nhẹ"),
    ],
  },

  10: {
    pitfallsVi: [
      "Nói 'How much?' kiểu Anh. Thuỵ Điển: 'Vad kostar det?' hoặc 'Hur mycket kostar det?'.",
      "Quên 'kr' = 'kronor', số nhiều luôn 'kronor' dù 1 hay nhiều.",
      "Không hiểu 'pant' trên chai - đó là phí gửi vỏ, được trả lại ở máy panta.",
    ],
    pitfallsEn: [
      "Saying 'How much?' literally. Use 'Vad kostar det?'.",
      "Forget 'kr' = 'kronor', always plural form.",
      "'Pant' on bottles = bottle deposit returned at recycling machine.",
    ],
    examplesVi: [
      "'Kan jag betala med kort?' - hỏi quẹt thẻ (Sverige gần như không xài tiền mặt).",
      "'Var är mjölken?' - hỏi nhân viên ICA.",
      "'Tack, det var allt' - kết thúc thanh toán.",
    ],
    examplesEn: [
      "'Kan jag betala med kort?' - cashless Sweden norm.",
      "'Var är mjölken?' - asking an ICA clerk.",
      "'Tack, det var allt' - finishing at checkout.",
    ],
    examplesSv: ["Kan jag betala med kort?", "Var är mjölken?", "Tack, det var allt."],
    extraFill: [
      fb("Vad ___ det?", "kostar", "Nó giá bao nhiêu?", "How much is it?"),
      fb("Jag betalar med ___ .", "kort", "Tôi trả bằng thẻ.", "I pay by card."),
      fb("Var ligger ___ ?", "kassan", "Quầy thu ngân ở đâu?", "Where's the checkout?"),
    ],
    extraTranslate: [
      tr("Có giảm giá hôm nay không?", "Any discount today?", "Är det rea i dag?"),
      tr("Tôi cần một túi.", "I need a bag.", "Jag behöver en påse."),
      tr("Cái này bao nhiêu?", "How much is this?", "Hur mycket kostar den här?"),
    ],
    extraMatch: [
      mp("kvitto", "hoá đơn"),
      mp("rea", "giảm giá"),
      mp("kassa", "quầy thanh toán"),
      mp("varukorg", "giỏ hàng"),
    ],
  },

  11: {
    pitfallsVi: [
      "Hiểu 'fika' chỉ là 'uống cà phê'. Thực ra là VĂN HOÁ ngừng việc 15-20 phút để kết nối.",
      "Từ chối lời mời fika - người Thuỵ Điển coi đó là cách kết bạn quan trọng.",
      "Quên 'tack för fikat' khi rời bàn - phép lịch sự cơ bản.",
    ],
    pitfallsEn: [
      "Treating fika as 'a coffee'. It's a CULTURAL pause for connection.",
      "Declining fika invitations - locals see it as a friendship signal.",
      "Forgetting 'tack för fikat' when leaving the table.",
    ],
    examplesVi: [
      "'Ska vi ta en fika?' - lời mời đi cà phê tan sở.",
      "'Kanelbullen är världsbäst!' - khen bánh quế.",
      "'Tack för fikat, det var mysigt.' - lời cảm ơn ấm áp.",
    ],
    examplesEn: [
      "'Ska vi ta en fika?' - common after-work invite.",
      "'Kanelbullen är världsbäst!' - praising cinnamon buns.",
      "'Tack för fikat, det var mysigt.' - warm thanks.",
    ],
    examplesSv: ["Ska vi ta en fika?", "Kanelbullen är världsbäst!", "Tack för fikat, det var mysigt."],
    extraFill: [
      fb("___ vi ta en fika?", "Ska", "Đi cà phê không?", "Shall we fika?"),
      fb("Jag tar en ___ tack.", "kaffe", "Cho tôi 1 cà phê.", "I'll have a coffee, please."),
      fb("Det var ___ .", "mysigt", "Thật ấm cúng.", "It was cosy."),
    ],
    extraTranslate: [
      tr("Bạn thích bánh quế không?", "Do you like cinnamon buns?", "Gillar du kanelbullar?"),
      tr("Cho tôi 2 cà phê.", "Two coffees, please.", "Två kaffe, tack."),
      tr("Cảm ơn buổi fika hôm nay.", "Thanks for today's fika.", "Tack för fikat i dag."),
    ],
    extraMatch: [
      mp("kanelbulle", "bánh quế"),
      mp("kardemumma", "bạch đậu khấu"),
      mp("bryggkaffe", "cà phê pha thường"),
      mp("kafferast", "giờ giải lao cà phê"),
    ],
  },

  12: {
    pitfallsVi: [
      "Nhầm 'till' (đến nơi) và 'i' (ở trong). 'Jag går till skolan' (đi tới trường) ≠ 'Jag är i skolan' (đang ở trường).",
      "Quên 'höger/vänster' đảo chiều theo người đối diện - luôn dùng theo HƯỚNG ĐI.",
      "Phát âm 'vägen' sai. 'v' không phải 'w', và 'g' giữa nguyên âm mềm như /j/.",
    ],
    pitfallsEn: [
      "Mixing 'till' (to) and 'i' (in). 'Jag går till skolan' vs 'Jag är i skolan'.",
      "Right/left should be from the walker's POV.",
      "'Vägen' - 'v' isn't 'w'; soft 'g' between vowels.",
    ],
    examplesVi: [
      "'Ursäkta, var ligger Centralstationen?' - hỏi ga tàu.",
      "'Sväng höger vid Konsum' - rẽ phải tại Konsum.",
      "'Det är rakt fram, ungefär 200 meter.' - 200m thẳng tới.",
    ],
    examplesEn: [
      "'Ursäkta, var ligger Centralstationen?' - asking station.",
      "'Sväng höger vid Konsum' - turn right at Konsum.",
      "'Det är rakt fram, ungefär 200 meter.'",
    ],
    examplesSv: ["Ursäkta, var ligger Centralstationen?", "Sväng höger vid Konsum.", "Det är rakt fram, ungefär 200 meter."],
    extraFill: [
      fb("Gå ___ fram.", "rakt", "Đi thẳng.", "Go straight."),
      fb("Sväng ___ vid kyrkan.", "vänster", "Rẽ trái ở nhà thờ.", "Turn left at the church."),
      fb("Det ligger ___ apoteket.", "bredvid", "Nó nằm cạnh hiệu thuốc.", "It's next to the pharmacy."),
    ],
    extraTranslate: [
      tr("Bệnh viện ở đâu?", "Where's the hospital?", "Var ligger sjukhuset?"),
      tr("Đi bộ mất bao lâu?", "How long is the walk?", "Hur lång tid tar det att gå?"),
      tr("Cảm ơn rất nhiều!", "Thanks a lot!", "Tack så mycket!"),
    ],
    extraMatch: [
      mp("rakt fram", "thẳng tới"),
      mp("till höger", "bên phải"),
      mp("till vänster", "bên trái"),
      mp("mittemot", "đối diện"),
    ],
  },

  13: {
    pitfallsVi: [
      "Nói 'It's cold' = 'Det är kall'. SAI - dùng 'Det är kallt' (trung tính).",
      "Quên đổi mùa với giới từ 'på': 'på sommaren', 'på vintern'.",
      "Phát âm 'snö' (tuyết) thành 'sno'. ö = ơ mềm, môi tròn.",
    ],
    pitfallsEn: [
      "Saying 'Det är kall'. CORRECT: 'Det är kallt' (neuter).",
      "Use 'på sommaren', 'på vintern' for seasons.",
      "'Snö' uses rounded 'ö', not English 'o'.",
    ],
    examplesVi: [
      "'Det snöar i Kiruna i november' - tuyết bắt đầu sớm.",
      "'I dag är det 25 grader, jätteskönt!' - hè đẹp ở Skåne.",
      "'Det blåser mycket vid kusten.' - gió mạnh ven biển.",
    ],
    examplesEn: [
      "'Det snöar i Kiruna i november' - early snow.",
      "'I dag är det 25 grader, jätteskönt!' - warm Skåne summer.",
      "'Det blåser mycket vid kusten.'",
    ],
    examplesSv: ["Det snöar i Kiruna i november.", "I dag är det 25 grader, jätteskönt!", "Det blåser mycket vid kusten."],
    extraFill: [
      fb("Det är ___ i dag.", "soligt", "Hôm nay nắng.", "It's sunny today."),
      fb("På vintern är det ___ .", "kallt", "Mùa đông lạnh.", "Winter is cold."),
      fb("Det ___ ute.", "regnar", "Trời đang mưa.", "It's raining."),
    ],
    extraTranslate: [
      tr("Hôm nay -5 độ.", "Today is -5°.", "I dag är det minus fem grader."),
      tr("Tôi yêu mùa hè ở Sverige.", "I love Swedish summer.", "Jag älskar svensk sommar."),
      tr("Trời sẽ có tuyết tối nay.", "It will snow tonight.", "Det kommer att snöa i kväll."),
    ],
    extraMatch: [
      mp("vår", "mùa xuân"),
      mp("sommar", "mùa hè"),
      mp("höst", "mùa thu"),
      mp("vinter", "mùa đông"),
    ],
  },

  14: {
    pitfallsVi: [
      "Quên đổi 'liten' bất quy tắc: liten/litet/små - 'små' cho số nhiều và xác định.",
      "So sánh hơn: hầu hết thêm '-are', NHƯNG 'gammal → äldre', 'bra → bättre' (bất quy tắc).",
      "Quên đảo dạng tính từ theo en/ett: 'en stor bil', 'ett stort hus', 'stora bilar'.",
    ],
    pitfallsEn: [
      "Irregular 'liten': liten/litet/små.",
      "Comparatives: 'gammal → äldre', 'bra → bättre' (irregular).",
      "Adjective agrees: 'en stor bil', 'ett stort hus', 'stora bilar'.",
    ],
    examplesVi: [
      "'Min lillebror är yngre än jag.' - so sánh tuổi.",
      "'Det här kaffet är bättre än det där.' - khen cà phê.",
      "'Stockholm är större än Uppsala.' - so sánh thành phố.",
    ],
    examplesEn: [
      "'Min lillebror är yngre än jag.'",
      "'Det här kaffet är bättre än det där.'",
      "'Stockholm är större än Uppsala.'",
    ],
    examplesSv: ["Min lillebror är yngre än jag.", "Det här kaffet är bättre än det där.", "Stockholm är större än Uppsala."],
    extraFill: [
      fb("Han är ___ än mig.", "äldre", "Anh ấy lớn tuổi hơn tôi.", "He's older than me."),
      fb("Det är ___ i dag än i går.", "kallare", "Hôm nay lạnh hơn hôm qua.", "Colder today than yesterday."),
      fb("Min bil är ___ än din.", "snabbare", "Xe tôi nhanh hơn xe bạn.", "My car is faster than yours."),
    ],
    extraTranslate: [
      tr("Quyển sách này hay hơn.", "This book is better.", "Den här boken är bättre."),
      tr("Đây là nhà to nhất.", "This is the biggest house.", "Det här är det största huset."),
      tr("Cô ấy chạy nhanh hơn tôi.", "She runs faster than me.", "Hon springer snabbare än jag."),
    ],
    extraMatch: [
      mp("liten - mindre - minst", "nhỏ - hơn - nhất"),
      mp("stor - större - störst", "to - hơn - nhất"),
      mp("bra - bättre - bäst", "tốt - hơn - nhất"),
      mp("gammal - äldre - äldst", "già - hơn - nhất"),
    ],
  },

  /* =============== TUẦN 3 =============== */
  15: {
    pitfallsVi: [
      "Dịch 'I have a headache' thành 'Jag har en huvudvärk'. ĐÚNG: 'Jag har huvudvärk' (không 'en').",
      "Nói 'Jag är sjuk' khi mới hơi mệt - người TĐ phân biệt 'trött' (mệt) và 'sjuk' (ốm) rõ ràng.",
      "Quên đặt lịch '1177' trước khi tới vårdcentral - hệ thống y tế dùng triage qua điện thoại.",
    ],
    pitfallsEn: [
      "'Jag har huvudvärk' (no article).",
      "'Sjuk' = sick. 'Trött' = tired. Don't mix.",
      "Always call 1177 first before walking into a vårdcentral.",
    ],
    examplesVi: [
      "'Jag har feber och ont i halsen' - mô tả triệu chứng cảm.",
      "'Kan jag boka en tid hos läkaren?' - đặt lịch khám.",
      "'Det gör ont här.' - chỉ vị trí đau khi khám.",
    ],
    examplesEn: [
      "'Jag har feber och ont i halsen' - flu symptoms.",
      "'Kan jag boka en tid hos läkaren?' - booking.",
      "'Det gör ont här.' - pointing to pain.",
    ],
    examplesSv: ["Jag har feber och ont i halsen.", "Kan jag boka en tid hos läkaren?", "Det gör ont här."],
    extraFill: [
      fb("Jag har ont i ___ .", "magen", "Tôi đau bụng.", "I have a stomach ache."),
      fb("Hon är ___ i dag.", "sjuk", "Cô ấy ốm hôm nay.", "She's sick today."),
      fb("Jag behöver ___ .", "medicin", "Tôi cần thuốc.", "I need medicine."),
    ],
    extraTranslate: [
      tr("Tôi bị cảm.", "I have a cold.", "Jag är förkyld."),
      tr("Cánh tay tôi đau.", "My arm hurts.", "Det gör ont i armen."),
      tr("Tôi cần gặp bác sĩ.", "I need to see a doctor.", "Jag behöver träffa en läkare."),
    ],
    extraMatch: [
      mp("huvud", "đầu"),
      mp("mage", "bụng"),
      mp("rygg", "lưng"),
      mp("hals", "cổ họng"),
    ],
  },

  16: {
    pitfallsVi: [
      "Dùng 'in' thay vì 'i' với phòng: 'i köket', 'i sovrummet'.",
      "Quên 'på' với tầng/sàn: 'på första våningen' (tầng 1).",
      "Hiểu 'andra våningen' = tầng 3 (vì tầng trệt = 'bottenvåningen').",
    ],
    pitfallsEn: [
      "Use 'i' for rooms: 'i köket'.",
      "Use 'på' for floors: 'på första våningen'.",
      "Ground floor = bottenvåningen, so 'andra våningen' = 3rd floor.",
    ],
    examplesVi: [
      "'Mitt sovrum är på andra våningen.' - tầng 3.",
      "'Köket ligger till vänster om vardagsrummet.' - mô tả layout.",
      "'Det finns en balkong utanför vardagsrummet.' - tả thêm chi tiết.",
    ],
    examplesEn: [
      "'Mitt sovrum är på andra våningen.'",
      "'Köket ligger till vänster om vardagsrummet.'",
      "'Det finns en balkong utanför vardagsrummet.'",
    ],
    examplesSv: ["Mitt sovrum är på andra våningen.", "Köket ligger till vänster om vardagsrummet.", "Det finns en balkong utanför vardagsrummet."],
    extraFill: [
      fb("Soffan står i ___ .", "vardagsrummet", "Sofa trong phòng khách.", "Sofa in the living room."),
      fb("Jag lagar mat i ___ .", "köket", "Tôi nấu trong bếp.", "I cook in the kitchen."),
      fb("Mitt skrivbord står ___ fönstret.", "vid", "Bàn tôi cạnh cửa sổ.", "Desk by the window."),
    ],
    extraTranslate: [
      tr("Có 3 phòng ngủ.", "There are 3 bedrooms.", "Det finns tre sovrum."),
      tr("Tủ lạnh trong bếp.", "The fridge is in the kitchen.", "Kylskåpet är i köket."),
      tr("Phòng tắm trên tầng 2.", "The bathroom is on floor 2.", "Badrummet är på första våningen."),
    ],
    extraMatch: [
      mp("kök", "bếp"),
      mp("sovrum", "phòng ngủ"),
      mp("badrum", "phòng tắm"),
      mp("vardagsrum", "phòng khách"),
    ],
  },

  17: {
    pitfallsVi: [
      "Quên 'klä på sig' là động từ phản thân: phải có 'mig/dig/sig'.",
      "Dùng 'have' kiểu Anh cho mặc quần áo. Thuỵ Điển: 'ha på sig' (đang mặc).",
      "Tính từ màu phải đổi: 'en röd tröja', 'ett rött hus', 'röda byxor'.",
    ],
    pitfallsEn: [
      "'Klä på sig' is reflexive: needs mig/dig/sig.",
      "'Be wearing' = 'ha på sig'.",
      "Colour adjectives agree: 'en röd tröja', 'ett rött hus', 'röda byxor'.",
    ],
    examplesVi: [
      "'Jag klär på mig en varm jacka.' - mặc áo khoác ấm.",
      "'Hon har på sig en blå klänning.' - cô ấy đang mặc váy xanh.",
      "'Det är kallt - glöm inte mössan!' - dặn đội mũ len.",
    ],
    examplesEn: [
      "'Jag klär på mig en varm jacka.'",
      "'Hon har på sig en blå klänning.'",
      "'Det är kallt - glöm inte mössan!'",
    ],
    examplesSv: ["Jag klär på mig en varm jacka.", "Hon har på sig en blå klänning.", "Det är kallt - glöm inte mössan!"],
    extraFill: [
      fb("Hon har ___ sig en röd tröja.", "på", "Cô ấy mặc áo đỏ.", "She wears a red sweater."),
      fb("Det är en ___ jacka.", "svart", "Áo khoác đen.", "A black jacket."),
      fb("Jag ___ på mig vintern.", "klär", "Tôi mặc đồ mùa đông.", "I dress for winter."),
    ],
    extraTranslate: [
      tr("Bạn có giày màu trắng không?", "Do you have white shoes?", "Har du vita skor?"),
      tr("Tôi cần mua áo khoác mới.", "I need a new jacket.", "Jag behöver en ny jacka."),
      tr("Trời lạnh, hãy mặc ấm.", "It's cold, dress warm.", "Det är kallt, klä på dig varmt."),
    ],
    extraMatch: [
      mp("tröja", "áo len"),
      mp("byxor", "quần dài"),
      mp("jacka", "áo khoác"),
      mp("mössa", "mũ len"),
    ],
  },

  18: {
    pitfallsVi: [
      "Nhầm 'SL kort' (Stockholm) với hệ thống Västtrafik (Göteborg) hay Skånetrafiken (Malmö) - mỗi vùng app khác nhau.",
      "Quên 'plattform' số khi bắt pendeltåg - dễ lên nhầm tàu ngược chiều.",
      "Mua vé bằng 'enkelbiljett' (1 lượt) thay vì 'periodbiljett' (tháng) - đắt hơn nhiều.",
    ],
    pitfallsEn: [
      "Each region has its own card app: SL, Västtrafik, Skånetrafiken.",
      "Always check the platform number for pendeltåg.",
      "Daily commuters should use 'periodbiljett', not 'enkelbiljett'.",
    ],
    examplesVi: [
      "'En enkelbiljett till Uppsala, tack.' - mua 1 vé tới Uppsala.",
      "'Vilket spår går tåget från?' - hỏi sân ga.",
      "'Är detta tåget till Malmö?' - xác nhận trước khi lên.",
    ],
    examplesEn: [
      "'En enkelbiljett till Uppsala, tack.'",
      "'Vilket spår går tåget från?'",
      "'Är detta tåget till Malmö?'",
    ],
    examplesSv: ["En enkelbiljett till Uppsala, tack.", "Vilket spår går tåget från?", "Är detta tåget till Malmö?"],
    extraFill: [
      fb("Tåget går från ___ tre.", "spår", "Tàu chạy từ sân 3.", "Train from platform 3."),
      fb("Jag tar ___ till jobbet.", "bussen", "Tôi đi bus tới chỗ làm.", "I take the bus to work."),
      fb("En ___ till Lund, tack.", "biljett", "Một vé tới Lund.", "One ticket to Lund."),
    ],
    extraTranslate: [
      tr("Vé bao nhiêu tiền?", "How much is the ticket?", "Vad kostar biljetten?"),
      tr("Khi nào tàu rời ga?", "When does the train leave?", "När går tåget?"),
      tr("Tàu này dừng ở Solna không?", "Does this train stop at Solna?", "Stannar tåget i Solna?"),
    ],
    extraMatch: [
      mp("tåg", "tàu hoả"),
      mp("buss", "xe buýt"),
      mp("tunnelbana", "tàu điện ngầm"),
      mp("spårvagn", "tàu điện mặt đất"),
    ],
  },

  19: {
    pitfallsVi: [
      "Dùng 'Hi' bằng 'Hej' trong email công việc - quá thân. Hãy dùng 'Hej XXX' + xuống dòng.",
      "Kết email kiểu Anh 'Best regards'. Thuỵ Điển: 'Med vänliga hälsningar' viết tắt 'Mvh'.",
      "Nói 'Jag jobbar för Volvo'. ĐÚNG: 'Jag jobbar PÅ Volvo' (giới từ 'på').",
    ],
    pitfallsEn: [
      "'Hej XXX' is fine even in work emails, but use newline after.",
      "Sign off with 'Med vänliga hälsningar' (Mvh).",
      "Use 'jobba PÅ' (at) not 'för' (for).",
    ],
    examplesVi: [
      "'Hej Anna, jag heter Linh och jobbar som ekonom.' - tự giới thiệu.",
      "'Kan vi boka ett möte nästa vecka?' - đề xuất họp.",
      "'Mvh, Linh' - đóng email.",
    ],
    examplesEn: [
      "'Hej Anna, jag heter Linh och jobbar som ekonom.'",
      "'Kan vi boka ett möte nästa vecka?'",
      "'Mvh, Linh'",
    ],
    examplesSv: ["Hej Anna, jag heter Linh och jobbar som ekonom.", "Kan vi boka ett möte nästa vecka?", "Med vänliga hälsningar, Linh."],
    extraFill: [
      fb("Jag jobbar ___ Volvo.", "på", "Tôi làm ở Volvo.", "I work at Volvo."),
      fb("Hon är ___ av yrket.", "lärare", "Cô ấy là giáo viên.", "She's a teacher by profession."),
      fb("Vi har ett ___ på onsdag.", "möte", "Có cuộc họp thứ 4.", "We have a meeting Wed."),
    ],
    extraTranslate: [
      tr("Tôi làm việc từ 9 đến 5.", "I work 9-5.", "Jag jobbar från nio till fem."),
      tr("Bạn làm nghề gì?", "What do you do?", "Vad jobbar du med?"),
      tr("Tôi xin nghỉ thứ Sáu.", "I'm off on Friday.", "Jag är ledig på fredag."),
    ],
    extraMatch: [
      mp("möte", "cuộc họp"),
      mp("chef", "sếp"),
      mp("kollega", "đồng nghiệp"),
      mp("kontor", "văn phòng"),
    ],
  },

  20: {
    pitfallsVi: [
      "Nhầm 'gilla' (thích) và 'tycka om' (cảm thấy thích). 'Tycka om' lịch sự hơn trong văn viết.",
      "Dùng 'mycket' khi nói 'rất' với động từ. ĐÚNG: 'mycket' + tính từ; với động từ dùng 'väldigt'/'jätte-'.",
      "Quên 'att' trước nguyên thể: 'Jag älskar att läsa' (không bỏ 'att').",
    ],
    pitfallsEn: [
      "'Gilla' vs 'tycka om' - latter is more formal.",
      "Use 'mycket' with adj; 'väldigt' or 'jätte-' with verbs.",
      "Don't drop 'att' before infinitive: 'Jag älskar att läsa'.",
    ],
    examplesVi: [
      "'Jag älskar att vandra i fjällen.' - đam mê leo núi.",
      "'Vad gör du på fritiden?' - hỏi về sở thích.",
      "'Jag tycker att svenska är ett vackert språk.' - đánh giá tiếng TĐ.",
    ],
    examplesEn: [
      "'Jag älskar att vandra i fjällen.'",
      "'Vad gör du på fritiden?'",
      "'Jag tycker att svenska är ett vackert språk.'",
    ],
    examplesSv: ["Jag älskar att vandra i fjällen.", "Vad gör du på fritiden?", "Jag tycker att svenska är ett vackert språk."],
    extraFill: [
      fb("Jag ___ läsa böcker.", "gillar", "Tôi thích đọc sách.", "I like to read."),
      fb("Han ___ inte fotboll.", "tycker om", "Anh ấy không thích bóng đá.", "He doesn't like football."),
      fb("Vad gör du på ___ ?", "fritiden", "Bạn làm gì rảnh?", "Free time?"),
    ],
    extraTranslate: [
      tr("Tôi thích bơi.", "I like swimming.", "Jag gillar att simma."),
      tr("Cô ấy yêu nhạc cổ điển.", "She loves classical music.", "Hon älskar klassisk musik."),
      tr("Chúng tôi thường đi bộ đường dài.", "We often hike.", "Vi vandrar ofta."),
    ],
    extraMatch: [
      mp("läsa", "đọc"),
      mp("simma", "bơi"),
      mp("vandra", "đi bộ đường dài"),
      mp("måla", "vẽ"),
    ],
  },

  21: {
    pitfallsVi: [
      "Quên 'i' trước tháng/năm: 'i januari', 'år 2026'.",
      "Nhầm 'för ... sedan' (X trước đây) và 'om ...' (X nữa). 'för tre dagar sedan' vs 'om tre dagar'.",
      "Dùng 'när' (khi nào) trong câu hỏi nhưng quên 'då' khi tường thuật trong quá khứ.",
    ],
    pitfallsEn: [
      "Use 'i januari', 'år 2026'.",
      "'för X sedan' (X ago) vs 'om X' (in X).",
      "Use 'när' for questions; 'då' for narrative past.",
    ],
    examplesVi: [
      "'Vi reser till Lappland om en månad.' - đi Lappland 1 tháng nữa.",
      "'För två år sedan flyttade jag till Sverige.' - mốc 2 năm trước.",
      "'På midsommar dansar vi runt majstången.' - lễ Midsummer.",
    ],
    examplesEn: [
      "'Vi reser till Lappland om en månad.'",
      "'För två år sedan flyttade jag till Sverige.'",
      "'På midsommar dansar vi runt majstången.'",
    ],
    examplesSv: ["Vi reser till Lappland om en månad.", "För två år sedan flyttade jag till Sverige.", "På midsommar dansar vi runt majstången."],
    extraFill: [
      fb("Jag kom hit ___ tre månader sedan.", "för", "Tôi đến đây 3 tháng trước.", "I arrived 3 months ago."),
      fb("Vi ses ___ en vecka.", "om", "Hẹn 1 tuần nữa.", "See you in a week."),
      fb("Jag är född ___ 1995.", "år", "Tôi sinh năm 1995.", "I was born in 1995."),
    ],
    extraTranslate: [
      tr("Tôi đến Sverige năm ngoái.", "I came last year.", "Jag kom till Sverige förra året."),
      tr("Cuộc họp sẽ diễn ra ngày mai.", "The meeting is tomorrow.", "Mötet är i morgon."),
      tr("Tôi nghỉ lễ vào tháng 7.", "I'm off in July.", "Jag är ledig i juli."),
    ],
    extraMatch: [
      mp("i morgon", "ngày mai"),
      mp("i går", "hôm qua"),
      mp("i förrgår", "hôm kia"),
      mp("i övermorgon", "ngày kia"),
    ],
  },

  /* =============== TUẦN 4 =============== */
  22: {
    pitfallsVi: [
      "Coi 'allemansrätten' = đi đâu cũng được. SAI - không vào đất tư, không hái lan/cây quý, không cắm lửa mùa khô.",
      "Nhầm Midsommar (cuối 6) với Sankt Hans (Đan Mạch). Sverige LUÔN tổ chức thứ 6 gần nhất 21/6.",
      "Quên giày dép thoải mái khi đi 'midsommarafton' - dance vài tiếng quanh majstången.",
    ],
    pitfallsEn: [
      "Allemansrätten ≠ go anywhere. No private land, no rare plants, no fire in dry season.",
      "Midsommar is the Friday nearest 21 June.",
      "Wear comfy shoes - dancing around the majstång lasts hours.",
    ],
    examplesVi: [
      "'Vi grillar korv på midsommarafton.' - nướng xúc xích chiều Midsummer.",
      "'I Sverige har vi allemansrätten - friheten att vara i naturen.' - giới thiệu quyền này.",
      "'Lucia firas den 13 december.' - lễ Lucia 13/12.",
    ],
    examplesEn: [
      "'Vi grillar korv på midsommarafton.'",
      "'I Sverige har vi allemansrätten.'",
      "'Lucia firas den 13 december.'",
    ],
    examplesSv: ["Vi grillar korv på midsommarafton.", "I Sverige har vi allemansrätten.", "Lucia firas den 13 december."],
    extraFill: [
      fb("Vi dansar runt ___ .", "majstången", "Múa quanh cột mùa hè.", "Dance around the maypole."),
      fb("___ är Sveriges nationaldag.", "Sjätte juni", "6/6 là quốc khánh.", "6 June is Sweden's national day."),
      fb("På ___ äter vi semlor.", "fettisdagen", "Ngày béo ăn semla.", "Fat Tuesday."),
    ],
    extraTranslate: [
      tr("Giáng sinh tôi về nhà.", "I go home for Christmas.", "Jag åker hem till jul."),
      tr("Lucia là lễ hội ánh sáng.", "Lucia is a festival of light.", "Lucia är en ljusfest."),
      tr("Chúng tôi hái dâu rừng vào tháng 7.", "We pick wild berries in July.", "Vi plockar bär i juli."),
    ],
    extraMatch: [
      mp("midsommar", "lễ giữa hè"),
      mp("Lucia", "lễ Lucia"),
      mp("jul", "Giáng sinh"),
      mp("påsk", "Phục sinh"),
    ],
  },

  23: {
    pitfallsVi: [
      "Để lại tin nhắn voice mail - người TĐ ít nghe. Hãy gửi SMS.",
      "Quên 'kan jag' (tôi có thể) mở đầu yêu cầu - tránh nghe ra lệnh.",
      "Đọc số điện thoại từng số một như tiếng Anh. TĐ đọc theo cặp/nhóm 2-3 số.",
    ],
    pitfallsEn: [
      "Voicemail is rarely checked - send SMS instead.",
      "Start requests with 'kan jag' (can I).",
      "Read phone numbers in pairs, not digit-by-digit.",
    ],
    examplesVi: [
      "'Kan jag boka en tid på torsdag klockan tre?' - đặt lịch khám tóc.",
      "'Mitt nummer är noll-sju-noll, etthundra-tjugotre, fyrtiofem, sextiosju.' - đọc số.",
      "'Jag ringer tillbaka senare.' - sẽ gọi lại sau.",
    ],
    examplesEn: [
      "'Kan jag boka en tid på torsdag klockan tre?'",
      "'Mitt nummer är 070-123 45 67.'",
      "'Jag ringer tillbaka senare.'",
    ],
    examplesSv: ["Kan jag boka en tid på torsdag klockan tre?", "Mitt nummer är 070-123 45 67.", "Jag ringer tillbaka senare."],
    extraFill: [
      fb("Kan jag ___ med Anna?", "tala", "Cho tôi gặp Anna.", "May I speak with Anna?"),
      fb("Jag vill ___ en tid.", "boka", "Tôi muốn đặt lịch.", "I'd like to book."),
      fb("Ett ___ tack - jag kollar kalendern.", "ögonblick", "Đợi chút.", "One moment."),
    ],
    extraTranslate: [
      tr("Tôi gọi sau nhé.", "I'll call later.", "Jag ringer senare."),
      tr("Vui lòng để lại tin nhắn.", "Please leave a message.", "Lämna gärna ett meddelande."),
      tr("Bạn đang bận?", "Are you busy?", "Är du upptagen?"),
    ],
    extraMatch: [
      mp("ringa", "gọi điện"),
      mp("sms", "tin nhắn"),
      mp("meddelande", "thông báo"),
      mp("upptagen", "đang bận"),
    ],
  },

  24: {
    pitfallsVi: [
      "Trả lời 'jag mår bra' kiểu robot. Mở rộng: 'Jag mår bra, tack - lite trött bara.'",
      "Nhầm 'glad' (vui) và 'snäll' (tốt bụng) - 2 nghĩa khác hẳn.",
      "Dùng 'I feel that...' kiểu Anh. TĐ: 'Jag tycker att...' (ý kiến) hoặc 'Jag känner att...' (cảm xúc).",
    ],
    pitfallsEn: [
      "Add a bit: 'Jag mår bra, tack - lite trött bara.'",
      "'Glad' = happy; 'snäll' = kind. Different!",
      "Opinion: 'Jag tycker att...' Feeling: 'Jag känner att...'.",
    ],
    examplesVi: [
      "'Jag mår jättebra i dag, tack!' - tâm trạng cực tốt.",
      "'Hon är ledsen för att hennes katt är sjuk.' - giải thích lý do buồn.",
      "'Vi är stolta över dig.' - khen ai đó.",
    ],
    examplesEn: [
      "'Jag mår jättebra i dag, tack!'",
      "'Hon är ledsen för att hennes katt är sjuk.'",
      "'Vi är stolta över dig.'",
    ],
    examplesSv: ["Jag mår jättebra i dag, tack!", "Hon är ledsen för att hennes katt är sjuk.", "Vi är stolta över dig."],
    extraFill: [
      fb("Jag är ___ för att vi vann.", "glad", "Tôi vui vì thắng.", "I'm happy we won."),
      fb("Han är ___ i dag.", "trött", "Anh ấy mệt hôm nay.", "He's tired."),
      fb("Hon känner sig ___ .", "ensam", "Cô ấy cô đơn.", "She feels lonely."),
    ],
    extraTranslate: [
      tr("Tôi yêu bạn.", "I love you.", "Jag älskar dig."),
      tr("Đừng buồn.", "Don't be sad.", "Var inte ledsen."),
      tr("Tôi tự hào về con.", "I'm proud of you.", "Jag är stolt över dig."),
    ],
    extraMatch: [
      mp("glad", "vui"),
      mp("ledsen", "buồn"),
      mp("arg", "giận"),
      mp("rädd", "sợ"),
    ],
  },

  25: {
    pitfallsVi: [
      "Dùng 'will' kiểu Anh = ý chí. TĐ 'ska' = đã quyết định; 'kommer att' = dự báo trung tính.",
      "Nhầm 'måste' (phải) và 'borde' (nên). 'Måste' mạnh hơn, 'borde' khuyên lịch sự.",
      "Sau modal KHÔNG có 'att': 'Jag vill äta' (không phải 'jag vill att äta').",
    ],
    pitfallsEn: [
      "'Ska' = planned; 'kommer att' = neutral forecast.",
      "'Måste' (must) vs 'borde' (should).",
      "No 'att' after modals: 'Jag vill äta'.",
    ],
    examplesVi: [
      "'I morgon ska jag träffa mina vänner.' - kế hoạch chắc chắn.",
      "'Det kommer att regna i kväll.' - dự báo thời tiết.",
      "'Du borde sova mer.' - lời khuyên.",
    ],
    examplesEn: [
      "'I morgon ska jag träffa mina vänner.'",
      "'Det kommer att regna i kväll.'",
      "'Du borde sova mer.'",
    ],
    examplesSv: ["I morgon ska jag träffa mina vänner.", "Det kommer att regna i kväll.", "Du borde sova mer."],
    extraFill: [
      fb("Jag ___ åka till Lappland.", "ska", "Tôi sẽ đi Lappland.", "I will go to Lappland."),
      fb("Du ___ vila mer.", "borde", "Bạn nên nghỉ.", "You should rest."),
      fb("Vi ___ åka nu.", "måste", "Phải đi ngay.", "We must leave now."),
    ],
    extraTranslate: [
      tr("Tôi muốn học thêm.", "I want to study more.", "Jag vill plugga mer."),
      tr("Cô ấy có thể nói TĐ.", "She can speak Swedish.", "Hon kan prata svenska."),
      tr("Họ phải làm bài tập.", "They must do homework.", "De måste göra läxor."),
    ],
    extraMatch: [
      mp("ska", "sẽ (kế hoạch)"),
      mp("vill", "muốn"),
      mp("kan", "có thể"),
      mp("måste", "phải"),
    ],
  },

  26: {
    pitfallsVi: [
      "Quên 'kvitto' khi mua - không có kvitto thì không đổi/trả được.",
      "Trả hàng quá 30 ngày - đa số shop chỉ đổi trong 14-30 ngày, kiểm tra trước.",
      "Nói 'I want refund' thô. TĐ: 'Jag skulle vilja byta/återlämna...' (lịch sự).",
    ],
    pitfallsEn: [
      "Always keep kvitto.",
      "Most return windows are 14-30 days.",
      "Use 'Jag skulle vilja byta/återlämna' for politeness.",
    ],
    examplesVi: [
      "'Jag skulle vilja byta den här tröjan, den är för liten.' - đổi size.",
      "'Kan jag få pengarna tillbaka?' - xin hoàn tiền.",
      "'Här är kvittot.' - đưa hoá đơn.",
    ],
    examplesEn: [
      "'Jag skulle vilja byta den här tröjan, den är för liten.'",
      "'Kan jag få pengarna tillbaka?'",
      "'Här är kvittot.'",
    ],
    examplesSv: ["Jag skulle vilja byta den här tröjan, den är för liten.", "Kan jag få pengarna tillbaka?", "Här är kvittot."],
    extraFill: [
      fb("Den är ___ liten.", "för", "Nó nhỏ quá.", "It's too small."),
      fb("Jag vill ___ den här.", "byta", "Tôi muốn đổi.", "I want to exchange."),
      fb("Här är ___ .", "kvittot", "Đây là hoá đơn.", "Here's the receipt."),
    ],
    extraTranslate: [
      tr("Có size lớn hơn không?", "Bigger size available?", "Finns det en större storlek?"),
      tr("Tôi muốn hoàn tiền.", "I'd like a refund.", "Jag vill ha pengarna tillbaka."),
      tr("Cái này bị lỗi.", "This is defective.", "Den här är trasig."),
    ],
    extraMatch: [
      mp("byta", "đổi"),
      mp("återlämna", "trả lại"),
      mp("storlek", "kích cỡ"),
      mp("trasig", "bị hỏng"),
    ],
  },

  27: {
    pitfallsVi: [
      "Coi nhẹ BankID - đây là 'chìa khoá số' bắt buộc cho mọi việc: ngân hàng, bưu điện, y tế.",
      "Đăng nhập Mobiilivarmenne sai app (Finnland). Sverige dùng BankID-app trên điện thoại.",
      "Quên cập nhật BankID khi đổi điện thoại - mất 1-2 tuần để cấp lại qua ngân hàng.",
    ],
    pitfallsEn: [
      "BankID is mandatory for bank, post, healthcare.",
      "Sweden uses BankID-app, not Finland's Mobiilivarmenne.",
      "Renew BankID before switching phones.",
    ],
    examplesVi: [
      "'Logga in med BankID, tack.' - hướng dẫn đăng nhập.",
      "'Jag har glömt min kod.' - quên mã PIN.",
      "'Skanna QR-koden för att fortsätta.' - bước xác thực.",
    ],
    examplesEn: [
      "'Logga in med BankID, tack.'",
      "'Jag har glömt min kod.'",
      "'Skanna QR-koden för att fortsätta.'",
    ],
    examplesSv: ["Logga in med BankID, tack.", "Jag har glömt min kod.", "Skanna QR-koden för att fortsätta."],
    extraFill: [
      fb("Logga in med ___ .", "BankID", "Đăng nhập BankID.", "Log in with BankID."),
      fb("Jag har glömt mitt ___ .", "lösenord", "Tôi quên mật khẩu.", "I forgot password."),
      fb("Skanna ___ .", "QR-koden", "Quét mã QR.", "Scan QR."),
    ],
    extraTranslate: [
      tr("Tôi cần mở tài khoản.", "I need to open an account.", "Jag behöver öppna ett konto."),
      tr("Wifi mật khẩu là gì?", "What's the wifi password?", "Vad är wifi-lösenordet?"),
      tr("Internet chậm quá.", "Internet is slow.", "Internet är långsamt."),
    ],
    extraMatch: [
      mp("konto", "tài khoản"),
      mp("lösenord", "mật khẩu"),
      mp("inloggning", "đăng nhập"),
      mp("säkerhet", "bảo mật"),
    ],
  },

  28: {
    pitfallsVi: [
      "Bỏ 'sig' của động từ phản thân: 'Han tvättar' (anh ấy rửa cái gì đó) ≠ 'Han tvättar sig' (anh ấy tự tắm).",
      "Dùng 'mig/dig/sig' SAI ngôi: nhớ jag→mig, du→dig, han/hon→sig, vi→oss, ni→er, de→sig.",
      "Hiểu 'sätta sig' = ngồi xuống (động tác), 'sitta' = đang ngồi (trạng thái).",
    ],
    pitfallsEn: [
      "'Sig' makes verb reflexive: 'tvätta sig' = wash oneself.",
      "Match pronoun: mig/dig/sig/oss/er/sig.",
      "'Sätta sig' (sit down, action) vs 'sitta' (be seated).",
    ],
    examplesVi: [
      "'Jag tvättar mig varje morgon.' - tắm sáng.",
      "'Han känner sig sjuk.' - cảm thấy không khoẻ.",
      "'Vi sätter oss vid bordet.' - ngồi vào bàn.",
    ],
    examplesEn: [
      "'Jag tvättar mig varje morgon.'",
      "'Han känner sig sjuk.'",
      "'Vi sätter oss vid bordet.'",
    ],
    examplesSv: ["Jag tvättar mig varje morgon.", "Han känner sig sjuk.", "Vi sätter oss vid bordet."],
    extraFill: [
      fb("Jag klär ___ snabbt.", "mig", "Tôi mặc đồ nhanh.", "I dress quickly."),
      fb("Hon känner ___ trött.", "sig", "Cô ấy mệt.", "She feels tired."),
      fb("Vi tvättar ___ .", "oss", "Chúng tôi tự tắm.", "We wash ourselves."),
    ],
    extraTranslate: [
      tr("Tôi đang chuẩn bị.", "I'm getting ready.", "Jag gör mig i ordning."),
      tr("Cô ấy ngồi xuống ghế.", "She sits down.", "Hon sätter sig på stolen."),
      tr("Chúng ta giới thiệu nhé.", "Let's introduce ourselves.", "Vi presenterar oss."),
    ],
    extraMatch: [
      mp("tvätta sig", "tự tắm/rửa"),
      mp("klä på sig", "mặc đồ"),
      mp("känna sig", "cảm thấy"),
      mp("sätta sig", "ngồi xuống"),
    ],
  },

  29: {
    pitfallsVi: [
      "Vào phòng thi vội mở đề - hãy đọc kỹ HƯỚNG DẪN (instruktioner) trước.",
      "Bỏ qua câu khó. SAI - YKI A1 không trừ điểm câu sai, đoán còn hơn để trống.",
      "Phần nghe chỉ phát 1 LẦN cho A1 short text - ghi chú ngay, đừng đợi nghe lần 2.",
    ],
    pitfallsEn: [
      "Read the instructions first.",
      "No penalty - guess everything.",
      "A1 short listening plays ONCE. Take notes immediately.",
    ],
    examplesVi: [
      "'Läs texten och svara på frågorna.' - mẫu hướng dẫn đọc.",
      "'Lyssna och välj rätt svar.' - mẫu hướng dẫn nghe.",
      "'Skriv ett kort meddelande till en vän.' - đề viết tin nhắn.",
    ],
    examplesEn: [
      "'Läs texten och svara på frågorna.'",
      "'Lyssna och välj rätt svar.'",
      "'Skriv ett kort meddelande till en vän.'",
    ],
    examplesSv: ["Läs texten och svara på frågorna.", "Lyssna och välj rätt svar.", "Skriv ett kort meddelande till en vän."],
    extraFill: [
      fb("Läs ___ noggrant.", "instruktionerna", "Đọc hướng dẫn kỹ.", "Read instructions carefully."),
      fb("Du har ___ minuter.", "trettio", "Bạn có 30 phút.", "You have 30 minutes."),
      fb("Skriv ___ ord.", "femtio", "Viết 50 từ.", "Write 50 words."),
    ],
    extraTranslate: [
      tr("Tôi đã hoàn thành bài.", "I'm done.", "Jag är klar."),
      tr("Câu này khó quá.", "This question is hard.", "Den här frågan är svår."),
      tr("Tôi cần thêm thời gian.", "I need more time.", "Jag behöver mer tid."),
    ],
    extraMatch: [
      mp("läsa", "đọc"),
      mp("lyssna", "nghe"),
      mp("skriva", "viết"),
      mp("tala", "nói"),
    ],
  },

  30: {
    pitfallsVi: [
      "Dừng học sau YKI A1 - quên kiến thức sau 4-6 tuần. Hãy duy trì 15 phút/ngày SVT Play.",
      "Coi A2 chỉ là 'A1 mở rộng'. A2 đòi hỏi kể chuyện ở quá khứ (preteritum) và viết đoạn 80-120 từ.",
      "Bỏ luyện nói. Ghi danh 'språkkafé' miễn phí ở thư viện - đây là vũ khí bí mật để lên A2.",
    ],
    pitfallsEn: [
      "Keep 15 min/day SVT Play.",
      "A2 needs past tense narrative + 80-120 word writing.",
      "Join free språkkafé at the library.",
    ],
    examplesVi: [
      "'Jag pluggar svenska 15 minuter varje dag.' - cam kết duy trì.",
      "'Nu ska jag börja med A2-kursen.' - bước tiếp theo.",
      "'Tack för att jag fick lära mig med dig!' - lời cảm ơn thầy/cô.",
    ],
    examplesEn: [
      "'Jag pluggar svenska 15 minuter varje dag.'",
      "'Nu ska jag börja med A2-kursen.'",
      "'Tack för att jag fick lära mig med dig!'",
    ],
    examplesSv: ["Jag pluggar svenska 15 minuter varje dag.", "Nu ska jag börja med A2-kursen.", "Tack för att jag fick lära mig med dig!"],
    extraFill: [
      fb("Jag har ___ svenska i 30 dagar.", "studerat", "Tôi học 30 ngày rồi.", "I've studied 30 days."),
      fb("Nästa steg är ___ .", "A2", "Bước tiếp là A2.", "Next is A2."),
      fb("Tack ___ allt!", "för", "Cảm ơn vì tất cả.", "Thanks for everything!"),
    ],
    extraTranslate: [
      tr("Tôi sẵn sàng cho A2.", "I'm ready for A2.", "Jag är redo för A2."),
      tr("Tôi sẽ tiếp tục học.", "I'll keep learning.", "Jag fortsätter att plugga."),
      tr("Hẹn gặp ở khoá tiếp.", "See you at the next course.", "Vi ses på nästa kurs."),
    ],
    extraMatch: [
      mp("fortsätta", "tiếp tục"),
      mp("nivå", "trình độ"),
      mp("kurs", "khoá học"),
      mp("framsteg", "tiến bộ"),
    ],
  },
};

export const getDailyDeepPlus = (day: number): DailyDeepPlus | undefined =>
  SWEDISH_A1_DEEP_PLUS[day];
